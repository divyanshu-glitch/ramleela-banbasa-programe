import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, Users, Landmark, Wallet, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  computeDayWiseSummaries,
  formatIndianCurrency,
  paiseToRupees,
} from '../utils/calculations';

type ChartMetricMode = 'DAILY' | 'CUMULATIVE' | 'ACTOR' | 'COMMITTEE' | 'COMBINED';

export const Dashboard: React.FC<{ onStartNewEntry: () => void }> = ({
  onStartNewEntry,
}) => {
  const { transactions, sessions, t } = useApp();
  const [chartMode, setChartMode] = useState<ChartMetricMode>('COMBINED');

  const daySummaries = useMemo(
    () => computeDayWiseSummaries(transactions, sessions),
    [transactions, sessions]
  );

  const totals = useMemo(() => {
    const actor = daySummaries.reduce((s, d) => s + d.actorTotalPaise, 0);
    const committee = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);
    const combined = actor + committee;
    const txCount = transactions.length;
    return { actor, committee, combined, txCount };
  }, [daySummaries, transactions.length]);

  const chartData = useMemo(() => {
    let runningActor = 0;
    let runningCommittee = 0;
    let runningCombined = 0;

    return daySummaries.map((d) => {
      const actorR = paiseToRupees(d.actorTotalPaise);
      const commR = paiseToRupees(d.committeeTotalPaise);
      const combR = paiseToRupees(d.combinedTotalPaise);
      runningActor += actorR;
      runningCommittee += commR;
      runningCombined += combR;

      return {
        // Use Sanskrit performance day for the chart X-Axis
        dayLabel: d.performanceDay,
        ordinal: d.dayOrdinal,
        actorDaily: actorR,
        committeeDaily: commR,
        combinedDaily: combR,
        actorCumulative: runningActor,
        committeeCumulative: runningCommittee,
        combinedCumulative: runningCombined,
      };
    });
  }, [daySummaries]);

  return (
    <div className="space-y-4">
      {/* Top KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600">{t('totalCombined')}</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {formatIndianCurrency(totals.combined)}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600">{t('totalActorSide')}</p>
            <p className="text-xl sm:text-2xl font-bold text-rose-900 mt-1">
              {formatIndianCurrency(totals.actor)}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-800">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600">{t('totalCommitteeSide')}</p>
            <p className="text-xl sm:text-2xl font-bold text-sky-900 mt-1">
              {formatIndianCurrency(totals.committee)}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-800">
            <Landmark className="w-5 h-5" />
          </div>
        </div>

        <div className="liquid-glass rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600">{t('totalTransactions')}</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {totals.txCount}
            </p>
          </div>
          <button
            type="button"
            onClick={onStartNewEntry}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t('quickNewEntry')}</span>
          </button>
        </div>
      </div>

      {/* Main Split View: 30% Persistent Line Graph + 70% Independently Scrollable Day-Wise Collection */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* A. Persistent Line Graph — 30% of Main View on Desktop */}
        <section
          aria-label="Persistent Collection Line Chart"
          className="w-full lg:w-[30%] lg:sticky lg:top-20 liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <h2 className="text-sm font-bold text-slate-900">{t('chartTitle')}</h2>
              </div>
            </div>

            {/* Chart Mode Switcher */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(
                [
                  { id: 'DAILY', label: t('chartDaily') },
                  { id: 'CUMULATIVE', label: t('chartCumulative') },
                  { id: 'ACTOR', label: t('chartActor') },
                  { id: 'COMMITTEE', label: t('chartCommittee') },
                  { id: 'COMBINED', label: t('chartCombined') },
                ] as { id: ChartMetricMode; label: string }[]
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setChartMode(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    chartMode === m.id
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-white/80 text-slate-700 hover:bg-orange-50 border border-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                <XAxis
                  dataKey="dayLabel"
                  tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                  interval={0}
                  angle={-30}
                  textAnchor="end"
                  height={45}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#334155' }}
                  tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                  width={45}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `₹${Number(value).toLocaleString('en-IN')}`,
                    '',
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />

                {chartMode === 'DAILY' && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="actorDaily"
                      name="पात्र (Actor)"
                      stroke="#9f1239"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="committeeDaily"
                      name="कमेटी (Committee)"
                      stroke="#0284c7"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                    />
                  </>
                )}

                {chartMode === 'CUMULATIVE' && (
                  <Line
                    type="monotone"
                    dataKey="combinedCumulative"
                    name="संचयी योग (Cumulative ₹)"
                    stroke="#ea580c"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}

                {chartMode === 'ACTOR' && (
                  <Line
                    type="monotone"
                    dataKey="actorDaily"
                    name="पात्र संग्रह (Actor ₹)"
                    stroke="#9f1239"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}

                {chartMode === 'COMMITTEE' && (
                  <Line
                    type="monotone"
                    dataKey="committeeDaily"
                    name="कमेटी संग्रह (Committee ₹)"
                    stroke="#0284c7"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}

                {chartMode === 'COMBINED' && (
                  <Line
                    type="monotone"
                    dataKey="combinedDaily"
                    name="संयुक्त संग्रह (Combined ₹)"
                    stroke="#ea580c"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
            <span>{t('totalCombined')}:</span>
            <span className="font-bold text-slate-900">
              {formatIndianCurrency(totals.combined)}
            </span>
          </div>
        </section>

        {/* B. Independently Scrollable Day-Wise Collection — 70% of Main View */}
        <section
          aria-label="Scrollable Day-Wise Collection List"
          className="w-full lg:w-[70%] liquid-glass rounded-3xl p-4 sm:p-5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {t('dayListTitle')}
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              1st – 10th Sessions
            </span>
          </div>

          {/* Independently Scrollable Container */}
          <div className="max-h-[480px] overflow-y-auto pr-1 space-y-2.5">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 text-xs font-bold text-slate-700">
                <tr>
                  <th className="py-2.5 px-3">{t('dayColumn')}</th>
                  <th className="py-2.5 px-3">{t('dateColumn')}</th>
                  <th className="py-2.5 px-3 text-right">{t('actorCollectionCol')}</th>
                  <th className="py-2.5 px-3 text-right">
                    {t('committeeCollectionCol')}
                  </th>
                  <th className="py-2.5 px-3 text-right">{t('combinedCollectionCol')}</th>
                  <th className="py-2.5 px-3 text-center">{t('txCountCol')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-xs sm:text-sm">
                {daySummaries.map((d) => (
                  <tr
                    key={d.dayIndex}
                    className="hover:bg-orange-50/50 transition-colors"
                  >
                    {/* Kept free of weekday and Sanskrit day label clutter in the main day-wise collection row label as instructed */}
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-orange-100/90 text-orange-950 font-bold text-xs">
                        {d.dayOrdinal}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {d.performanceDate || '—'}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-rose-900">
                      {formatIndianCurrency(d.actorTotalPaise)}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-sky-900">
                      <div>{formatIndianCurrency(d.committeeTotalPaise)}</div>
                      {d.committeeTotalPaise > 0 && (
                        <div className="text-[10px] text-slate-500">
                          Off: {formatIndianCurrency(d.committeeOfflinePaise)} | On:{' '}
                          {formatIndianCurrency(d.committeeOnlinePaise)} | आरती:{' '}
                          {formatIndianCurrency(d.committeeAartiPaise)}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      {formatIndianCurrency(d.combinedTotalPaise)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                        {d.transactionCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 bg-orange-50/95 backdrop-blur-sm border-t-2 border-orange-300 font-bold text-xs sm:text-sm text-slate-900">
                <tr>
                  <td className="py-3 px-3" colSpan={2}>
                    कुल योग (Grand Total)
                  </td>
                  <td className="py-3 px-3 text-right text-rose-900">
                    {formatIndianCurrency(totals.actor)}
                  </td>
                  <td className="py-3 px-3 text-right text-sky-900">
                    {formatIndianCurrency(totals.committee)}
                  </td>
                  <td className="py-3 px-3 text-right text-orange-950">
                    {formatIndianCurrency(totals.combined)}
                  </td>
                  <td className="py-3 px-3 text-center">{totals.txCount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};