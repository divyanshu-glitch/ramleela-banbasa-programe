import ExcelJS from 'exceljs';
import {
  CharacterMaster,
  PerformanceSession,
  Transaction,
} from '../types';
import {
  computeCharacterMatrix,
  computeDayWiseSummaries,
  paiseToRupees,
} from './calculations';

function triggerWorkbookDownload(buffer: ExcelJS.Buffer, filename: string) {
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const THIN_BORDER: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: 'FF1E293B' } },
  left: { style: 'thin', color: { argb: 'FF1E293B' } },
  bottom: { style: 'thin', color: { argb: 'FF1E293B' } },
  right: { style: 'thin', color: { argb: 'FF1E293B' } },
};

/**
 * Adds the Actor-Side Summary Worksheet matching the 3 attached Actor screenshots:
 * Columns: पात्र का नाम | अभिनयकर्ता का नाम | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th | 10th | Total
 */
function buildActorSummaryWorksheet(
  workbook: ExcelJS.Workbook,
  characters: CharacterMaster[],
  transactions: Transaction[]
) {
  const sheet = workbook.addWorksheet('पात्र संग्रह (Actor Summary)', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  const headers = [
    'पात्र का नाम',
    'अभिनयकर्ता का नाम',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    'Total',
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.height = 24;
  headerRow.eachCell((cell, colNumber) => {
    cell.font = {
      name: 'Noto Sans Devanagari',
      size: 11,
      bold: true,
      color: { argb: 'FF0F172A' },
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8FAFC' },
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: colNumber <= 2 ? 'left' : 'center',
    };
    cell.border = THIN_BORDER;
  });

  const { rows } = computeCharacterMatrix(characters, transactions);

  rows.forEach((r, idx) => {
    const excelRowIdx = idx + 2;
    const dayRupees = r.dayAmountsPaise.map((p) => paiseToRupees(p));
    const row = sheet.addRow([
      r.character.characterNameHi,
      r.character.actorNameHi || '',
      ...dayRupees,
      {
        formula: `SUM(C${excelRowIdx}:L${excelRowIdx})`,
        result: paiseToRupees(r.rowTotalPaise),
      },
    ]);

    row.height = 20;
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = THIN_BORDER;
      if (colNumber <= 2) {
        cell.font = { name: 'Noto Sans Devanagari', size: 11, bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
      } else {
        cell.font = { name: 'Calibri', size: 11, bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.numFmt = '#,##0';
      }
    });
  });

  // Bottom Totals Row matching green total bar in screenshot 2
  const lastDataRow = rows.length + 1;
  const totalRowIdx = lastDataRow + 1;
  const colLetters = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const totalFormulaCells = colLetters.map((col, i) => {
    const colSumPaise = rows.reduce((s, r) => s + r.dayAmountsPaise[i], 0);
    return {
      formula: `SUM(${col}2:${col}${lastDataRow})`,
      result: paiseToRupees(colSumPaise),
    };
  });

  const grandTotalPaise = rows.reduce((s, r) => s + r.rowTotalPaise, 0);

  const totalRow = sheet.addRow([
    'Total',
    '',
    ...totalFormulaCells,
    {
      formula: `SUM(C${totalRowIdx}:L${totalRowIdx})`,
      result: paiseToRupees(grandTotalPaise),
    },
  ]);
  totalRow.height = 23;

  totalRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    cell.border = THIN_BORDER;
    if (colNumber >= 3 && colNumber <= 12) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF70AD47' }, // Exact green highlight from reference screenshot
      };
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.numFmt = '#,##0';
    } else {
      cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0F172A' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.numFmt = '#,##0';
    }
  });

  sheet.columns = [
    { width: 22 },
    { width: 26 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 14 },
  ];
}

/**
 * Adds the Committee Summary Worksheet matching `image_9f9f9a.png`:
 * Columns: कमेटी | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th | 10th | Total
 */
function buildCommitteeSummaryWorksheet(
  workbook: ExcelJS.Workbook,
  transactions: Transaction[],
  sessions: PerformanceSession[],
  committeeCategories: string[]
) {
  const sheet = workbook.addWorksheet('कमेटी संग्रह (Committee)', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  const headers = [
    'कमेटी',
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    'Total',
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.height = 24;
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Noto Sans Devanagari', size: 11, bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = THIN_BORDER;
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8FAFC' },
    };
  });

  const baseCategories = Array.from(
    new Set(['धनराशि (Offline)', 'धनराशि (Online)', 'आरती', ...committeeCategories])
  );

  const dayColumns = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  baseCategories.forEach((cat, idx) => {
    const excelRowIdx = idx + 2;
    const dayValuesRupees: number[] = [];
    for (let d = 1; d <= 10; d++) {
      const sumPaise = transactions
        .filter(
          (t) =>
            t.category === 'COMMITTEE' &&
            t.dayIndex === d &&
            (t.committeeSubCategory || 'धनराशि (Offline)') === cat
        )
        .reduce((s, t) => s + t.totalAmountPaise, 0);
      dayValuesRupees.push(paiseToRupees(sumPaise));
    }
    const rowSum = dayValuesRupees.reduce((a, b) => a + b, 0);

    const row = sheet.addRow([
      cat,
      ...dayValuesRupees,
      {
        formula: `SUM(B${excelRowIdx}:K${excelRowIdx})`,
        result: rowSum,
      },
    ]);
    row.height = 22;
    row.eachCell((cell, colNumber) => {
      cell.border = THIN_BORDER;
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.font = {
        name: colNumber === 1 ? 'Noto Sans Devanagari' : 'Calibri',
        size: 11,
        bold: colNumber === 12,
      };
      if (colNumber > 1) {
        cell.numFmt = '#,##0';
      }
    });
  });

  const lastCatRow = baseCategories.length + 1;
  const totalRowIdx = lastCatRow + 1;
  const daySummaries = computeDayWiseSummaries(transactions, sessions);

  const dayTotalCells = dayColumns.map((col, idx) => ({
    formula: `SUM(${col}2:${col}${lastCatRow})`,
    result: paiseToRupees(daySummaries[idx].committeeTotalPaise),
  }));

  const grandCommTotal = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);

  const totalRow = sheet.addRow([
    'Total',
    ...dayTotalCells,
    {
      formula: `SUM(B${totalRowIdx}:K${totalRowIdx})`,
      result: paiseToRupees(grandCommTotal),
    },
  ]);
  totalRow.height = 24;
  totalRow.eachCell((cell, colNumber) => {
    cell.border = THIN_BORDER;
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.font = {
      name: 'Calibri',
      size: 11,
      bold: colNumber === 12 || colNumber === 1,
    };
    if (colNumber > 1) {
      cell.numFmt = '#,##0';
    }
  });

  sheet.columns = [
    { width: 22 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 14 },
  ];
}

/**
 * Adds Detailed Transaction Ledger with Actual Performance Dates
 */
function buildDetailedTransactionsWorksheet(
  workbook: ExcelJS.Workbook,
  transactions: Transaction[]
) {
  const sheet = workbook.addWorksheet('विस्तृत लेन-देन (Detailed Records)', {
    views: [{ state: 'frozen', ySplit: 1 }],
  });

  const headers = [
    'रसीद क्र. (Receipt ID)',
    'मंचन दिनांक (Performance Date)',
    'दिवस (Sanskrit Day)',
    'वार (Weekday)',
    'दिवस क्र. (Day)',
    'श्रेणी (Category)',
    'सहयोगकर्ता का नाम (Contributor)',
    'स्थान / गाँव (Location)',
    'पद / प्रतिष्ठान (Designation/Shop)',
    'पात्र / कमेटी मद (Allocation Detail)',
    'अभिनयकर्ता (Actor Name)',
    'भुगतान माध्यम (Payment Mode)',
    'राशि (₹ Amount)',
    'टिप्पणी (Notes)',
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.height = 24;
  headerRow.eachCell((cell) => {
    cell.font = { name: 'Noto Sans Devanagari', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEA580C' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = THIN_BORDER;
  });

  const sortedTxs = [...transactions].sort((a, b) =>
    a.performanceDate.localeCompare(b.performanceDate)
  );

  for (const tx of sortedTxs) {
    const desigShop = [tx.contributor.designation, tx.contributor.shopOrBusinessName]
      .filter(Boolean)
      .join(' | ');

    if (tx.category === 'COMMITTEE') {
      const r = sheet.addRow([
        tx.receiptNumber,
        tx.performanceDate,
        tx.performanceDay,
        tx.weekday,
        tx.dayOrdinal,
        'कमेटी (Committee)',
        tx.contributor.fullName,
        tx.contributor.location,
        desigShop,
        tx.committeeSubCategory || 'धनराशि (Offline)',
        'श्री रामलीला कमेटी, बनबसा',
        tx.paymentMode,
        paiseToRupees(tx.totalAmountPaise),
        tx.notes || '',
      ]);
      r.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = THIN_BORDER;
        if (colNumber === 13) cell.numFmt = '#,##0.00';
      });
    } else {
      for (const li of tx.lineItems) {
        const r = sheet.addRow([
          tx.receiptNumber,
          tx.performanceDate,
          tx.performanceDay,
          tx.weekday,
          tx.dayOrdinal,
          'पात्र (Actor-Side)',
          tx.contributor.fullName,
          tx.contributor.location,
          desigShop,
          li.characterNameHi,
          li.actorNameHi || '-',
          tx.paymentMode,
          paiseToRupees(li.amountPaise),
          tx.notes || '',
        ]);
        r.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.border = THIN_BORDER;
          if (colNumber === 13) cell.numFmt = '#,##0.00';
        });
      }
    }
  }

  sheet.columns = [
    { width: 18 },
    { width: 16 },
    { width: 14 },
    { width: 14 },
    { width: 10 },
    { width: 18 },
    { width: 26 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
    { width: 16 },
    { width: 15 },
    { width: 25 },
  ];
}

export async function exportActorCollectionWorkbook(
  characters: CharacterMaster[],
  transactions: Transaction[]
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  wb.created = new Date();
  const actorOnly = transactions.filter((t) => t.category === 'ACTOR');
  buildActorSummaryWorksheet(wb, characters, actorOnly);
  buildDetailedTransactionsWorksheet(wb, actorOnly);
  const buffer = await wb.xlsx.writeBuffer();
  triggerWorkbookDownload(
    buffer,
    `Ramleela_Banbasa_Actor_Collection_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

export async function exportCommitteeCollectionWorkbook(
  transactions: Transaction[],
  sessions: PerformanceSession[],
  committeeCategories: string[]
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  wb.created = new Date();
  const commOnly = transactions.filter((t) => t.category === 'COMMITTEE');
  buildCommitteeSummaryWorksheet(wb, commOnly, sessions, committeeCategories);
  buildDetailedTransactionsWorksheet(wb, commOnly);
  const buffer = await wb.xlsx.writeBuffer();
  triggerWorkbookDownload(
    buffer,
    `Ramleela_Banbasa_Committee_Collection_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

export async function exportCombinedCollectionWorkbook(
  characters: CharacterMaster[],
  transactions: Transaction[],
  sessions: PerformanceSession[],
  committeeCategories: string[]
) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  wb.created = new Date();

  buildActorSummaryWorksheet(wb, characters, transactions);
  buildCommitteeSummaryWorksheet(wb, transactions, sessions, committeeCategories);

  // Combined Overview Sheet
  const overview = wb.addWorksheet('संयुक्त सारांश (Combined Summary)');
  overview.addRow([
    'श्री रामलीला कमेटी, बनबसा — संयुक्त संग्रह सारांश रिपोर्ट',
  ]).font = { size: 14, bold: true };
  overview.addRow([`निर्यात तिथि (Export Date): ${new Date().toLocaleString('hi-IN')}`]);
  overview.addRow([]);

  const header = overview.addRow([
    'दिवस क्र. (Day)',
    'रामलीला दिवस (Sanskrit Day)',
    'दिनांक (Date)',
    'पात्र संग्रह (Actor ₹)',
    'कमेटी संग्रह (Committee ₹)',
    'संयुक्त योग (Combined ₹)',
  ]);
  header.eachCell((c) => {
    c.font = { bold: true };
    c.border = THIN_BORDER;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
  });

  const daySummaries = computeDayWiseSummaries(transactions, sessions);
  daySummaries.forEach((d) => {
    const r = overview.addRow([
      d.dayOrdinal,
      d.performanceDay,
      d.performanceDate || '-',
      paiseToRupees(d.actorTotalPaise),
      paiseToRupees(d.committeeTotalPaise),
      paiseToRupees(d.combinedTotalPaise),
    ]);
    r.eachCell((c, col) => {
      c.border = THIN_BORDER;
      if (col >= 4) c.numFmt = '#,##0';
    });
  });

  const totalActor = daySummaries.reduce((s, d) => s + d.actorTotalPaise, 0);
  const totalComm = daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0);
  const totalCombined = totalActor + totalComm;

  const grandRow = overview.addRow([
    'Grand Total',
    '',
    '',
    paiseToRupees(totalActor),
    paiseToRupees(totalComm),
    paiseToRupees(totalCombined),
  ]);
  grandRow.eachCell((c, col) => {
    c.font = { bold: true };
    c.border = THIN_BORDER;
    if (col >= 4) c.numFmt = '#,##0';
  });

  overview.columns = [
    { width: 15 },
    { width: 22 },
    { width: 16 },
    { width: 22 },
    { width: 22 },
    { width: 22 },
  ];

  buildDetailedTransactionsWorksheet(wb, transactions);

  const buffer = await wb.xlsx.writeBuffer();
  triggerWorkbookDownload(
    buffer,
    `Ramleela_Banbasa_Combined_Report_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}

export async function exportDetailedTransactionsWorkbook(transactions: Transaction[]) {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Shri Ramleela Committee, Banbasa';
  wb.created = new Date();
  buildDetailedTransactionsWorksheet(wb, transactions);
  const buffer = await wb.xlsx.writeBuffer();
  triggerWorkbookDownload(
    buffer,
    `Ramleela_Banbasa_Detailed_Transactions_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
}