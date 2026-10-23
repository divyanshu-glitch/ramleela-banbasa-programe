import React, { useMemo, useState } from 'react';
import {
  Edit3,
  Printer,
  RotateCcw,
  Search,
  Trash2,
  History,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';
import { formatIndianCurrency } from '../utils/calculations';
import { SANSKRIT_PERFORMANCE_DAYS } from '../data/seedCharacters';

export const TransactionsPage: React.FC<{
  onEditTransaction: (tx: Transaction) => void;
}> = ({ onEditTransaction }) => {
  const { transactions, characters, deleteTransaction, saveTransaction, auditLogs } =
    useApp();

  const [searchName, setSearchName] = useState('');
  const [filterDay, setFilterDay] = useState('ALL');
  const [filterDate, setFilterDate] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterCharId, setFilterCharId] = useState('ALL');
  const [sortBy, setSortBy] = useState<'DATE_DESC' | 'AMOUNT_DESC' | 'AMOUNT_ASC'>(
    'DATE_DESC'
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletedUndoTx, setDeletedUndoTx] = useState<Transaction | null>(null);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const filteredList = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (
          searchName.trim() &&
          !tx.contributor.fullName
            .toLowerCase()
            .includes(searchName.trim().toLowerCase()) &&
          !tx.contributor.location
            .toLowerCase()
            .includes(searchName.trim().toLowerCase())
        ) {
          return false;
        }
        if (filterDay !== 'ALL' && tx.performanceDay !== filterDay) return false;
        if (filterDate && tx.performanceDate !== filterDate) return false;
        if (filterCategory !== 'ALL' && tx.category !== filterCategory) return false;
        if (filterCharId !== 'ALL') {
          if (tx.category !== 'ACTOR') return false;
          if (!tx.lineItems.some((li) => li.characterId === filterCharId)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'AMOUNT_DESC') return b.totalAmountPaise - a.totalAmountPaise;
        if (sortBy === 'AMOUNT_ASC') return a.totalAmountPaise - b.totalAmountPaise;
        return b.createdAt.localeCompare(a.createdAt);
      });
  }, [
    transactions,
    searchName,
    filterDay,
    filterDate,
    filterCategory,
    filterCharId,
    sortBy,
  ]);

  const handleConfirmDelete = async (id: string) => {
    const removed = await deleteTransaction(id);
    setConfirmDeleteId(null);
    if (removed) {
      setDeletedUndoTx(removed);
    }
  };

  const handleUndoDelete = async () => {
    if (!deletedUndoTx) return;
    await saveTransaction(deletedUndoTx, false);
    setDeletedUndoTx(null);
  };

  const handlePrintReceipt = (tx: Transaction) => {
    const win = window.open('', '_blank', 'width=640,height=520');
    if (!win) return;
    const allocationHtml =
      tx.category === 'COMMITTEE'
        ? `<p><strong>मद:</strong> श्री रामलीला कमेटी, बनबसा (${tx.committeeSubCategory})</p>`
        : `<ul>${tx.lineItems
            .map(
              (li) =>
                `<li>${li.characterNameHi} (${li.actorNameHi || '-'}): ${formatIndianCurrency(
                  li.amountPaise
                )}</li>`
            )
            .join('')}</ul>`;

    win.document.write(`
      <html lang="hi">
        <head>
          <title>Receipt ${tx.receiptNumber}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #0f172a; }
            .box { border: 2px solid #ea580c; border-radius: 12px; padding: 20px; }
            h2 { margin: 0 0 4px 0; color: #9a3412; }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>श्री रामलीला कमेटी, बनबसा</h2>
            <p><strong>रसीद क्र.:</strong> ${tx.receiptNumber} | <strong>दिनांक:</strong> ${tx.performanceDate} (${tx.performanceDay})</p>
            <hr/>
            <p><strong>सहयोगकर्ता:</strong> ${tx.contributor.fullName} (${tx.contributor.location})</p>
            ${allocationHtml}
            <h3>कुल राशि: ${formatIndianCurrency(tx.totalAmountPaise)}</h3>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <div className="space-y-4">
      {deletedUndoTx && (
        <div className="liquid-glass rounded-2xl p-3.5 border border-amber-300 bg-amber-50/95 flex items-center justify-between text-xs font-bold text-amber-950">
          <span>
            प्रविष्टि &ldquo;{deletedUndoTx.contributor.fullName}&rdquo; (
            {formatIndianCurrency(deletedUndoTx.totalAmountPaise)}) हटाई गई।
          </span>
          <button
            type="button"
            onClick={handleUndoDelete}
            className="px-3 py-1.5 rounded-xl bg-amber-700 text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>पुनः स्थापित करें (Undo)</span>
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="liquid-glass rounded-3xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="सहयोगकर्ता या स्थान खोजें..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
          />
        </div>

        <select
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
        >
          <option value="ALL">सभी दिवस (All Days)</option>
          {SANSKRIT_PERFORMANCE_DAYS.map((d) => (
            <option key={d.day} value={d.day}>
              {d.day} ({d.ordinal})
            </option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
        >
          <option value="ALL">सभी श्रेणियाँ (Actor + Committee)</option>
          <option value="ACTOR">पात्र संग्रह (Actor-Side)</option>
          <option value="COMMITTEE">कमेटी संग्रह (Committee)</option>
        </select>

        <select
          value={filterCharId}
          onChange={(e) => setFilterCharId(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
        >
          <option value="ALL">सभी पात्र (All Characters)</option>
          {characters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.characterNameHi} ({c.actorNameHi || '-'})
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold"
          >
            <option value="DATE_DESC">नवीनतम (Newest)</option>
            <option value="AMOUNT_DESC">सर्वाधिक राशि (High-Low)</option>
            <option value="AMOUNT_ASC">न्यूनतम राशि (Low-High)</option>
          </select>
          <button
            type="button"
            onClick={() => setShowAuditModal(!showAuditModal)}
            title="Audit Trail"
            className="p-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
          >
            <History className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showAuditModal && (
        <div className="liquid-glass rounded-2xl p-4 max-h-48 overflow-y-auto text-xs space-y-1.5">
          <div className="font-bold text-slate-900 mb-1">
            ऑडिट लॉग (Audit Trail — {auditLogs.length})
          </div>
          {auditLogs.length === 0 ? (
            <p className="text-slate-500">कोई संशोधन इतिहास उपलब्ध नहीं है।</p>
          ) : (
            auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between py-1 border-b border-slate-200/70"
              >
                <span>
                  <strong className="text-orange-800">[{log.action}]</strong>{' '}
                  {log.summary}
                </span>
                <span className="text-slate-500">
                  {new Date(log.timestamp).toLocaleString('hi-IN')}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Transactions Table */}
      <div className="liquid-glass rounded-3xl p-4 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-bold text-slate-700">
              <th className="py-2.5 px-3">रसीद व दिनांक</th>
              <th className="py-2.5 px-3">सहयोगकर्ता एवं स्थान</th>
              <th className="py-2.5 px-3">श्रेणी</th>
              <th className="py-2.5 px-3">पात्र / मद विवरण</th>
              <th className="py-2.5 px-3 text-right">कुल राशि</th>
              <th className="py-2.5 px-3 text-center">कार्यवाही</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 text-xs">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                  कोई लेन-देन रिकॉर्ड नहीं मिला।
                </td>
              </tr>
            ) : (
              filteredList.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/60">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{tx.receiptNumber}</div>
                    <div className="text-[11px] text-slate-500">
                      {tx.performanceDate} • {tx.performanceDay} ({tx.dayOrdinal})
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">
                      {tx.contributor.fullName}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {tx.contributor.location}
                      {tx.contributor.shopOrBusinessName
                        ? ` • ${tx.contributor.shopOrBusinessName}`
                        : ''}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        tx.category === 'ACTOR'
                          ? 'bg-rose-100 text-rose-900'
                          : 'bg-sky-100 text-sky-900'
                      }`}
                    >
                      {tx.category === 'ACTOR' ? 'पात्र संग्रह' : 'कमेटी संग्रह'}
                    </span>
                  </td>
                  <td className="py-3 px-3 max-w-xs">
                    {tx.category === 'COMMITTEE' ? (
                      <span className="font-semibold text-sky-950">
                        {tx.committeeSubCategory} ({tx.paymentMode})
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {tx.lineItems.map((li) => (
                          <span
                            key={li.id}
                            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px]"
                          >
                            {li.characterNameHi}: {formatIndianCurrency(li.amountPaise)}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-slate-900 text-sm">
                    {formatIndianCurrency(tx.totalAmountPaise)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePrintReceipt(tx)}
                        title="Print Receipt"
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEditTransaction(tx)}
                        title="Edit Transaction"
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-orange-50 text-orange-700"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {confirmDeleteId === tx.id ? (
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(tx.id)}
                          className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold"
                        >
                          Confirm?
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(tx.id)}
                          title="Delete Transaction"
                          className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-rose-50 text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};