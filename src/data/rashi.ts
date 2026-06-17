import type { GrahaId } from './grahas';

// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// The 12 rashis (sidereal moon signs) with Sanskrit (romanised) and Sinhala
// names, and the ruling planet of each. Names are widely standard, but a human
// should confirm the Sinhala spellings before launch.
export const RASHIS_VERIFIED = false;

export interface Rashi {
  /** 1-based index, 1 = Mesha (Aries). */
  num: number;
  en: string;
  si: string;
  lord: GrahaId;
}

export const RASHIS: Rashi[] = [
  { num: 1, en: 'Mesha', si: 'මේෂ', lord: 'mars' },
  { num: 2, en: 'Vrishabha', si: 'වෘෂභ', lord: 'venus' },
  { num: 3, en: 'Mithuna', si: 'මිථුන', lord: 'mercury' },
  { num: 4, en: 'Karka', si: 'කටක', lord: 'moon' },
  { num: 5, en: 'Simha', si: 'සිංහ', lord: 'sun' },
  { num: 6, en: 'Kanya', si: 'කන්‍යා', lord: 'mercury' },
  { num: 7, en: 'Tula', si: 'තුලා', lord: 'venus' },
  { num: 8, en: 'Vrischika', si: 'වෘශ්චික', lord: 'mars' },
  { num: 9, en: 'Dhanu', si: 'ධනු', lord: 'jupiter' },
  { num: 10, en: 'Makara', si: 'මකර', lord: 'saturn' },
  { num: 11, en: 'Kumbha', si: 'කුම්භ', lord: 'saturn' },
  { num: 12, en: 'Meena', si: 'මීන', lord: 'jupiter' },
];
