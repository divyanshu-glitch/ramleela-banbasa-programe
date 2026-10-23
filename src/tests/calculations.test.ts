import { describe, expect, it } from 'vitest';
import {
  buildActorLineItems,
  computeCharacterMatrix,
  computeDayWiseSummaries,
  generateReferenceDemoTransactions,
  paiseToRupees,
  rupeesToPaise,
} from '../utils/calculations';
import { INITIAL_CHARACTERS, SANSKRIT_PERFORMANCE_DAYS } from '../data/seedCharacters';
import { DEFAULT_SETTINGS } from '../db/indexedDb';

describe('Ram Leela Banbasa Collection Management System — Acceptance Tests', () => {
  it('1. Selects Hindi (hi) by default when no language preference exists', () => {
    expect(DEFAULT_SETTINGS.language).toBe('hi');
  });

  it('2. Preserves exact Sanskrit performance day names irrespective of language', () => {
    const names = SANSKRIT_PERFORMANCE_DAYS.map((d) => d.day);
    expect(names).toEqual([
      'Pratham',
      'Dutiya',
      'Tritiya',
      'Chaturthi',
      'Panchami',
      'Shashthi',
      'Saptami',
      'Ashtami',
      'Navami',
      'Dashami',
    ]);
  });

  it('7. Individual amounts calculate exact total in integer paise', () => {
    const selected = INITIAL_CHARACTERS.slice(2, 5); // श्री राम, सीता, लक्ष्मण
    const individualMap = {
      [selected[0].id]: rupeesToPaise(500),
      [selected[1].id]: rupeesToPaise(300),
      [selected[2].id]: rupeesToPaise(200),
    };
    const res = buildActorLineItems('tx-1', selected, 'INDIVIDUAL', individualMap, 0);
    expect(res.lineItems).toHaveLength(3);
    expect(paiseToRupees(res.totalAmountPaise)).toBe(1000);
  });

  it('8. Common per-character amount multiplies across selected characters and NEVER divides', () => {
    const fiveChars = INITIAL_CHARACTERS.slice(0, 5);
    const res = buildActorLineItems('tx-2', fiveChars, 'COMMON', {}, rupeesToPaise(100));
    expect(res.lineItems).toHaveLength(5);
    expect(paiseToRupees(res.totalAmountPaise)).toBe(500);
  });

  it('10 & 11 & 17. Matches exact screenshot totals in Demo Mode (Actor ₹74,620 + Committee ₹1,47,022 = ₹2,21,642)', () => {
    const demoTxs = generateReferenceDemoTransactions();
    const matrix = computeCharacterMatrix(INITIAL_CHARACTERS, demoTxs);
    const daySummaries = computeDayWiseSummaries(demoTxs, []);

    expect(paiseToRupees(matrix.grandTotalPaise)).toBe(74620);
    expect(matrix.columnTotalsPaise.map(paiseToRupees)).toEqual([
      172, 626, 5452, 2349, 10353, 15954, 7792, 5966, 13672, 12284,
    ]);

    const commTotalRupees = paiseToRupees(
      daySummaries.reduce((s, d) => s + d.committeeTotalPaise, 0)
    );
    expect(commTotalRupees).toBe(147022);

    const combinedRupees = paiseToRupees(
      daySummaries.reduce((s, d) => s + d.combinedTotalPaise, 0)
    );
    expect(combinedRupees).toBe(221642);
  });
});