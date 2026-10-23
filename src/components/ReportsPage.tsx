import React, { useMemo, useState } from 'react';
import { FileSpreadsheet, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  computeCharacterMatrix,
  computeDayWiseSummaries,
  formatIndianCurrency,
  paiseToRupees,
} from '../utils/calculations';
import {
  exportActorCollectionWorkbook,
  exportCombinedCollectionWorkbook,
  exportCommitteeCollectionWorkbook,
  exportDetailedTransactionsWorkbook,
} from '../utils/excelExport';

export const ReportsPage: React.FC = () => {
  const { characters, transactions, sessions, settings, t } = useApp();
  const [previewTab, setPreviewTab] = useState<'ACTOR' | 'COMMITTEE'>('ACTOR');

  const actorMatrix = useMemo(
    () => computeCharacterMatrix(characters, transactions),
    [characters, transactions]
  );

  const daySummaries = useMemo(
    () => computeDayWiseSummaries(transactions, sessions),
    [transactions, sessions]
  );

  return (
    <div className="space-y-5">
      {/* 4 Required Excel Export Controls */}
      <div className="liquid-glass rounded-3xl p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-bold text-slate-900">
            Excel वर्कबुक निर्यात (.xlsx — संदर्भ स्क्रीनशॉट के समरूप)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={() => exportActorCollectionWorkbook(characters, transactions)}
            className="p-4 rounded-2xl bg-rose-900 hover:bg-rose-950 text-white text-left transition shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Workbook A
              </span>
              <Download className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold">{t('exportActorBtn')}</div>
            <div className="text-[11px] opacity-85 mt-1">
              पात्र का नाम | अभिनयकर्ता | 1st–10th | Total ({formatIndianCurrency(actorMatrix.grandTotalPaise)})
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              exportCommitteeCollectionWorkbook(
                transactions,
                sessions,
                settings.committeeCategories
              )
            }
            className="p-4 rounded-2xl bg-sky-800 hover:bg-sky-900 text-white text-left transition shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Workbook B
              </span>
              <Download className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold">{t('exportCommitteeBtn')}</div>
            <div className="text-[11px] opacity-85 mt-1">
              धनराशि (Offline), Online, आरती | 1st–10th | Total
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              exportCombinedCollectionWorkbook(
                characters,
                transactions,
                sessions,
                settings.committeeCategories
              )
            }
            className="p-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-left transition shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Workbook C
              </span>
              <Download className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold">{t('exportCombinedBtn')}</div>
            <div className="text-[11px] opacity-85 mt-1">
              पात्र + कमेटी + दिवस-वार संयुक्त योग + विस्तृत लेजर
            </div>
          </button>

          <button
            type="button"
            onClick={() => exportDetailedTransactionsWorkbook(transactions)}
            className="p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-left transition shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                Workbook D
              </span>
              <Download className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold">{t('exportDetailedBtn')}</div>
            <div className="text-[11px] opacity-85 mt-1">
              दिनांक-वार व रसीद-वार पूर्ण ऑडिट विवरण (.xlsx)
            </div>
          </button>
        </div>
      </div>

      {/* Live Interactive Preview Matching the Attached Excel Screenshots */}
      <div className="liquid-glass rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewTab('ACTOR')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                previewTab === 'ACTOR'
                  ? 'bg-rose-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              पात्र संग्रह तालिका (Actor Sheet Preview)
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab('COMMITTEE')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                previewTab === 'COMMITTEE'
                  ? 'bg-sky-800 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              कमेटी संग्रह तालिका (Committee Sheet Preview)
            </button>
          </div>
        </div>

        {previewTab === 'ACTOR' ? (
          <div className="max-h-[540px] overflow-auto border border-slate-300 rounded-xl bg-white">
            <table className="w-full text-xs border-collapse">
              <thead className="sticky top-0 bg-slate-100 border-b border-slate-400 font-bold text-slate-900">
                <tr>
                  <th className="border border-slate-300 px-2.5 py-2 text-left">
                    पात्र का नाम
                  </th>
                  <th className="border border-slate-300 px-2.5 py-2 text-left">
                    अभिनयकर्ता का नाम
                  </th>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(
                    (d) => (
                      <th key={d} className="border border-slate-300 px-2 py-2 text-center">
                        {d}
                      </th>
                    )
                  )}
                  <th className="border border-slate-300 px-2.5 py-2 text-center">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {actorMatrix.rows.map((r) => (
                  <tr key={r.character.id} className="hover:bg-orange-50/40 font-semibold">
                    <td className="border border-slate-300 px-2.5 py-1.5 font-bold">
                      {r.character.characterNameHi}
                    </td>
                    <td className="border border-slate-300 px-2.5 py-1.5">
                      {r.character.actorNameHi}
                    </td>
                    {r.dayAmountsPaise.map((p, idx) => (
                      <td
                        key={idx}
                        className="border border-slate-300 px-2 py-1.5 text-center"
                      >
                        {paiseToRupees(p)}
                      </td>
                    ))}
                    <td className="border border-slate-300 px-2.5 py-1.5 text-center font-bold bg-slate-50">
                      {paiseToRupees(r.rowTotalPaise)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="sticky bottom-0 font-bold">
                <tr>
                  <td
                    colSpan={2}
                    className="border border-slate-400 px-2.5 py-2 bg-white text-right"
                  >
                    Total
                  </td>
                  {actorMatrix.columnTotalsPaise.map((colP, idx) => (
                    <td
                      key={idx}
                      className="border border-slate-400 px-2 py-2 text-center bg-[#70AD47] text-white"
                    >
                      {paiseToRupees(colP)}
                    </td>
                  ))}
                  <td className="border border-slate-400 px-2.5 py-2 text-center bg-white text-slate-950 font-extrabold">
                    {paiseToRupees(actorMatrix.grandTotalPaise)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-300 rounded-xl bg-white">
            <table className="w-full text-xs border-collapse">
              <thead className="bg-slate-100 font-bold text-slate-900">
                <tr>
                  <th className="border border-slate-400 px-3 py-2 text-center">कमेटी</th>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'].map(
                    (d) => (
                      <th key={d} className="border border-slate-400 px-2.5 py-2 text-center">
                        {d}
                      </th>
                    )
                  )}
                  <th className="border border-slate-400 px-3 py-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    {
                      label: 'धनराशि (Offline)',
                      getter: (d: (typeof daySummaries)[number]) =>
                        d.committeeOfflinePaise,
                    },
                    {
                      label: 'धनराशि (Online)',
                      getter: (d: (typeof daySummaries)[number]) =>
                        d.committeeOnlinePaise,
                    },
                    {
                      label: 'आरती',
                      getter: (d: (typeof daySummaries)[number]) => d.committeeAartiPaise,
                    },
                  ] as const
                ).map((rowSpec) => {
                  const rowSumPaise = daySummaries.reduce(
                    (s, d) => s + rowSpec.getter(d),
                    0
                  );
                  return (
                    <tr key={rowSpec.label} className="text-center font-medium">
                      <td className="border border-slate-400 px-3 py-2 font-semibold">
                        {rowSpec.label}
                      </td>
                      {daySummaries.map((d) => (
                        <td key={d.dayIndex} className="border border-slate-400 px-2 py-2">
                          {paiseToRupees(rowSpec.getter(d))}
                        </td>
                      ))}
                      <td className="border border-slate-400 px-3 py-2 font-bold">
                        {paiseToRupees(rowSumPaise)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="text-center font-bold bg-slate-50">
                  <td className="border border-slate-400 px-3 py-2">Total</td>
                  {daySummaries.map((d) => (
                    <td key={d.dayIndex} className="border border-slate-400 px-2 py-2">
                      {paiseToRupees(d.committeeTotalPaise)}
                    </td>
                  ))}
                  <td className="border border-slate-400 px-3 py-2 font-extrabold">
                    {paiseToRupees(
                      daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};