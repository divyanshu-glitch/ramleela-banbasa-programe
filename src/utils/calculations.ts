import {
  CharacterMaster,
  DaySummary,
  PerformanceSession,
  Transaction,
  TransactionLineItem,
} from '../types';
import {
  REFERENCE_COMMITTEE_DATA,
  SANSKRIT_PERFORMANCE_DAYS,
  SEED_CHARACTERS_WITH_REF,
} from '../data/seedCharacters';

/**
 * Converts a rupee input (number or string) to safe integer paise.
 */
export function rupeesToPaise(rupees: number | string): number {
  const parsed = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (Number.isNaN(parsed) || !Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }
  return Math.round(parsed * 100);
}

/**
 * Converts integer paise to rupees (number).
 */
export function paiseToRupees(paise: number): number {
  return Math.round(paise) / 100;
}

/**
 * Formats integer paise in Indian currency format (e.g., ₹1,47,022).
 */
export function formatIndianCurrency(paise: number): string {
  const rupees = paiseToRupees(paise);
  const hasFraction = rupees % 1 !== 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}

/**
 * Calculates line items and transaction total for Actor-Side Collection.
 * - Mode INDIVIDUAL: sums each selected character's explicit amount.
 * - Mode COMMON: applies commonPerCharacterPaise to EACH selected character (multiplies, NEVER divides).
 */
export function buildActorLineItems(
  transactionId: string,
  selectedCharacters: CharacterMaster[],
  mode: 'INDIVIDUAL' | 'COMMON',
  individualAmountsPaise: Record<string, number>,
  commonAmountPaise: number
): { lineItems: TransactionLineItem[]; totalAmountPaise: number } {
  const lineItems: TransactionLineItem[] = [];

  for (const char of selectedCharacters) {
    const rawAmount =
      mode === 'COMMON' ? commonAmountPaise : individualAmountsPaise[char.id] ?? 0;
    const safePaise = Math.max(0, Math.round(rawAmount));
    if (safePaise > 0) {
      lineItems.push({
        id: `${transactionId}-li-${char.id}`,
        transactionId,
        characterId: char.id,
        characterNameHi: char.characterNameHi,
        actorNameHi: char.actorNameHi,
        amountPaise: safePaise,
      });
    }
  }

  const totalAmountPaise = lineItems.reduce((acc, item) => acc + item.amountPaise, 0);
  return { lineItems, totalAmountPaise };
}

/**
 * Computes day-wise financial summaries across all 10 Ramleela performance days.
 */
export function computeDayWiseSummaries(
  transactions: Transaction[],
  sessions: PerformanceSession[]
): DaySummary[] {
  const sessionByIndex = new Map<number, PerformanceSession>();
  for (const s of sessions) {
    sessionByIndex.set(s.dayIndex, s);
  }

  return SANSKRIT_PERFORMANCE_DAYS.map((dayMeta) => {
    const dayTxs = transactions.filter((t) => t.dayIndex === dayMeta.index);
    let actorTotalPaise = 0;
    let committeeOfflinePaise = 0;
    let committeeOnlinePaise = 0;
    let committeeAartiPaise = 0;
    let committeeOtherPaise = 0;

    for (const tx of dayTxs) {
      if (tx.category === 'ACTOR') {
        const lineSum = tx.lineItems.reduce((sum, li) => sum + li.amountPaise, 0);
        actorTotalPaise += lineSum;
      } else if (tx.category === 'COMMITTEE') {
        if (tx.committeeSubCategory === 'धनराशि (Offline)') {
          committeeOfflinePaise += tx.totalAmountPaise;
        } else if (tx.committeeSubCategory === 'धनराशि (Online)') {
          committeeOnlinePaise += tx.totalAmountPaise;
        } else if (tx.committeeSubCategory === 'आरती') {
          committeeAartiPaise += tx.totalAmountPaise;
        } else {
          committeeOtherPaise += tx.totalAmountPaise;
        }
      }
    }

    const committeeTotalPaise =
      committeeOfflinePaise +
      committeeOnlinePaise +
      committeeAartiPaise +
      committeeOtherPaise;
    const combinedTotalPaise = actorTotalPaise + committeeTotalPaise;
    const matchedSession = sessionByIndex.get(dayMeta.index);

    const latestTxWithDate = dayTxs.find((t) => Boolean(t.performanceDate));

    return {
      dayIndex: dayMeta.index,
      dayOrdinal: dayMeta.ordinal,
      performanceDay: dayMeta.day,
      weekday: matchedSession?.weekday ?? latestTxWithDate?.weekday,
      performanceDate:
        matchedSession?.performanceDate ?? latestTxWithDate?.performanceDate,
      actorTotalPaise,
      committeeOfflinePaise,
      committeeOnlinePaise,
      committeeAartiPaise,
      committeeOtherPaise,
      committeeTotalPaise,
      combinedTotalPaise,
      transactionCount: dayTxs.length,
    };
  });
}

/**
 * Computes character-wise 10-day matrix (matching the attached Actor Excel screenshots).
 */
export interface CharacterMatrixRow {
  character: CharacterMaster;
  dayAmountsPaise: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  rowTotalPaise: number;
}

export function computeCharacterMatrix(
  characters: CharacterMaster[],
  transactions: Transaction[]
): {
  rows: CharacterMatrixRow[];
  columnTotalsPaise: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  grandTotalPaise: number;
} {
  const mapByCharAndDay = new Map<string, number[]>();
  for (const c of characters) {
    mapByCharAndDay.set(c.id, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  for (const tx of transactions) {
    if (tx.category !== 'ACTOR') continue;
    const dayIdx = tx.dayIndex - 1;
    if (dayIdx < 0 || dayIdx > 9) continue;

    for (const li of tx.lineItems) {
      const arr = mapByCharAndDay.get(li.characterId);
      if (arr) {
        arr[dayIdx] += li.amountPaise;
      }
    }
  }

  const columnTotalsPaise: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let grandTotalPaise = 0;

  const sortedChars = [...characters].sort((a, b) => a.orderIndex - b.orderIndex);
  const rows: CharacterMatrixRow[] = sortedChars.map((character) => {
    const rawArr = mapByCharAndDay.get(character.id) ?? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const dayAmountsPaise = [...rawArr] as CharacterMatrixRow['dayAmountsPaise'];
    const rowTotalPaise = dayAmountsPaise.reduce((a, b) => a + b, 0);

    for (let i = 0; i < 10; i++) {
      columnTotalsPaise[i] += dayAmountsPaise[i];
    }
    grandTotalPaise += rowTotalPaise;

    return {
      character,
      dayAmountsPaise,
      rowTotalPaise,
    };
  });

  return { rows, columnTotalsPaise, grandTotalPaise };
}

/**
 * Generates Demo Transactions from the exact attached Excel screenshot figures
 * (Actor Total = ₹74,620, Committee Total = ₹1,47,022, Combined = ₹2,21,642).
 * Only loaded when the user explicitly toggles Demo Mode.
 */
export function generateReferenceDemoTransactions(): Transaction[] {
  const demoTxs: Transaction[] = [];
  const baseDates = [
    '2026-10-14',
    '2026-10-15',
    '2026-10-16',
    '2026-10-17',
    '2026-10-18',
    '2026-10-19',
    '2026-10-20',
    '2026-10-21',
    '2026-10-22',
    '2026-10-23',
  ];
  const weekdays = [
    'Budhvar',
    'Guruvar',
    'Shukravar',
    'Shanivar',
    'Ravivar',
    'Somvar',
    'Mangalvar',
    'Budhvar',
    'Guruvar',
    'Shukravar',
  ] as const;

  // 1. Actor Demo Transactions (1 consolidated transaction per performance day)
  for (let d = 0; d < 10; d++) {
    const dayMeta = SANSKRIT_PERFORMANCE_DAYS[d];
    const txId = `demo-actor-day-${d + 1}`;
    const lineItems: TransactionLineItem[] = [];

    for (const charSeed of SEED_CHARACTERS_WITH_REF) {
      const rupees = charSeed.referenceDaysRupees[d];
      if (rupees > 0) {
        lineItems.push({
          id: `${txId}-${charSeed.id}`,
          transactionId: txId,
          characterId: charSeed.id,
          characterNameHi: charSeed.characterNameHi,
          actorNameHi: charSeed.actorNameHi,
          amountPaise: rupees * 100,
        });
      }
    }

    if (lineItems.length > 0) {
      const totalPaise = lineItems.reduce((s, li) => s + li.amountPaise, 0);
      demoTxs.push({
        id: txId,
        receiptNumber: `DEMO-ACT-0${d + 1}`,
        category: 'ACTOR',
        performanceDay: dayMeta.day,
        dayIndex: dayMeta.index,
        dayOrdinal: dayMeta.ordinal,
        weekday: weekdays[d],
        performanceDate: baseDates[d],
        contributor: {
          id: `contrib-actor-${d + 1}`,
          fullName: `समस्त श्रद्धालु सहयोगकर्ता (${dayMeta.ordinal} दिवस)`,
          location: 'बनबसा बाज़ार एवं ग्राम क्षेत्र',
          designation: 'संदर्भ रिकॉर्ड (Excel Screenshot)',
        },
        amountEntryMode: 'INDIVIDUAL',
        lineItems,
        paymentMode: 'Cash',
        totalAmountPaise: totalPaise,
        notes: 'अभिनेता संग्रह संदर्भ तालिका से स्वतः निर्मित डेमो प्रविष्टि',
        isDemo: true,
        createdAt: `${baseDates[d]}T21:30:00.000Z`,
        updatedAt: `${baseDates[d]}T21:30:00.000Z`,
      });
    }
  }

  // 2. Committee Demo Transactions (Offline, Online, Aarti for each day)
  for (const commRow of REFERENCE_COMMITTEE_DATA) {
    for (let d = 0; d < 10; d++) {
      const rupees = commRow.daysRupees[d];
      if (rupees <= 0) continue;
      const dayMeta = SANSKRIT_PERFORMANCE_DAYS[d];
      const txId = `demo-comm-${commRow.subCategory}-${d + 1}`;
      demoTxs.push({
        id: txId,
        receiptNumber: `DEMO-COM-${d + 1}-${commRow.subCategory.slice(0, 3)}`,
        category: 'COMMITTEE',
        performanceDay: dayMeta.day,
        dayIndex: dayMeta.index,
        dayOrdinal: dayMeta.ordinal,
        weekday: weekdays[d],
        performanceDate: baseDates[d],
        contributor: {
          id: `contrib-comm-${d + 1}`,
          fullName: `कमेटी सहयोग (${commRow.subCategory})`,
          location: 'बनबसा, चम्पावत',
        },
        lineItems: [],
        organizationName: 'Shri Ramleela Committee, Banbasa',
        committeeSubCategory: commRow.subCategory,
        paymentMode:
          commRow.subCategory === 'धनराशि (Online)'
            ? 'UPI / Online'
            : commRow.subCategory === 'आरती'
            ? 'Aarti Plate'
            : 'Cash',
        totalAmountPaise: rupees * 100,
        notes: 'कमेटी संग्रह संदर्भ तालिका से निर्मित डेमो प्रविष्टि',
        isDemo: true,
        createdAt: `${baseDates[d]}T22:00:00.000Z`,
        updatedAt: `${baseDates[d]}T22:00:00.000Z`,
      });
    }
  }

  return demoTxs;
}