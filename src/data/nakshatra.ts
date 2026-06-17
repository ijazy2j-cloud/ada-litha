import type { GrahaId } from './grahas';

// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// The 27 nakshatras with Sanskrit (romanised) and traditional Sinhala names,
// and the Vimshottari ruling planet (graha) of each. The Vimshottari lords
// follow the fixed cycle Ketu→Venus→Sun→Moon→Mars→Rahu→Jupiter→Saturn→Mercury,
// repeated three times — that part is standard and not in doubt. The Sinhala
// (nækæත) names vary by source and must be checked by a human before launch.
export const NAKSHATRAS_VERIFIED = false;

export interface Nakshatra {
  /** 1-based index, 1 = Ashwini. */
  num: number;
  en: string;
  si: string;
  /** Vimshottari ruling planet. */
  lord: GrahaId;
}

export const NAKSHATRAS: Nakshatra[] = [
  { num: 1, en: 'Ashwini', si: 'අස්විද', lord: 'ketu' },
  { num: 2, en: 'Bharani', si: 'බෙරණ', lord: 'venus' },
  { num: 3, en: 'Krittika', si: 'කැති', lord: 'sun' },
  { num: 4, en: 'Rohini', si: 'රෙහෙණ', lord: 'moon' },
  { num: 5, en: 'Mrigashira', si: 'මුවසිරස', lord: 'mars' },
  { num: 6, en: 'Ardra', si: 'අද', lord: 'rahu' },
  { num: 7, en: 'Punarvasu', si: 'පුනාවස', lord: 'jupiter' },
  { num: 8, en: 'Pushya', si: 'පුස', lord: 'saturn' },
  { num: 9, en: 'Ashlesha', si: 'අස්ලිස', lord: 'mercury' },
  { num: 10, en: 'Magha', si: 'මඝ', lord: 'ketu' },
  { num: 11, en: 'Purva Phalguni', si: 'පුවපල්', lord: 'venus' },
  { num: 12, en: 'Uttara Phalguni', si: 'උතුරුපල්', lord: 'sun' },
  { num: 13, en: 'Hasta', si: 'හත', lord: 'moon' },
  { num: 14, en: 'Chitra', si: 'සිත', lord: 'mars' },
  { num: 15, en: 'Swati', si: 'සා', lord: 'rahu' },
  { num: 16, en: 'Vishakha', si: 'විසා', lord: 'jupiter' },
  { num: 17, en: 'Anuradha', si: 'අනුර', lord: 'saturn' },
  { num: 18, en: 'Jyeshtha', si: 'දෙට', lord: 'mercury' },
  { num: 19, en: 'Mula', si: 'මුල', lord: 'ketu' },
  { num: 20, en: 'Purva Ashadha', si: 'පුවසල', lord: 'venus' },
  { num: 21, en: 'Uttara Ashadha', si: 'උතුරුසල', lord: 'sun' },
  { num: 22, en: 'Shravana', si: 'සුවණ', lord: 'moon' },
  { num: 23, en: 'Dhanishta', si: 'දෙනට', lord: 'mars' },
  { num: 24, en: 'Shatabhisha', si: 'සියාවස', lord: 'rahu' },
  { num: 25, en: 'Purva Bhadrapada', si: 'පුවපුටුප', lord: 'jupiter' },
  { num: 26, en: 'Uttara Bhadrapada', si: 'උතුරුපුටුප', lord: 'saturn' },
  { num: 27, en: 'Revati', si: 'රේවතී', lord: 'mercury' },
];
