// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// The nine Taras of the Tara Bala cycle, counted from one's birth nakshatra to
// the day's nakshatra. Names (Sinhala + English), the traditional general
// standing, and one short classical signification each — no instructions, no
// per-activity advice. A human astrologer should confirm before launch.
export const TARA_VERIFIED = false;

export type TaraQuality = 'favourable' | 'mixed' | 'less-favourable';

export interface Tara {
  /** 1–9 within the cycle. */
  num: number;
  en: string;
  si: string;
  quality: TaraQuality;
  /** A short, factual classical signification — not advice. */
  meaningEn: string;
  meaningSi: string;
}

export const TARAS: Tara[] = [
  {
    num: 1,
    en: 'Janma',
    si: 'ජන්ම',
    quality: 'mixed',
    meaningEn: 'the birth star itself',
    meaningSi: 'උපන් නැකතම',
  },
  {
    num: 2,
    en: 'Sampat',
    si: 'සම්පත්',
    quality: 'favourable',
    meaningEn: 'prosperity and gain',
    meaningSi: 'සමෘද්ධිය හා වාසනාව',
  },
  {
    num: 3,
    en: 'Vipat',
    si: 'විපත්',
    quality: 'less-favourable',
    meaningEn: 'classically a star of difficulty',
    meaningSi: 'අභියෝග ගෙන දෙන බව සැලකේ',
  },
  {
    num: 4,
    en: 'Kshema',
    si: 'ක්ෂේම',
    quality: 'favourable',
    meaningEn: 'well-being and safety',
    meaningSi: 'සුවය හා සුරක්ෂිතභාවය',
  },
  {
    num: 5,
    en: 'Pratyari',
    si: 'ප්‍රත්‍යරී',
    quality: 'less-favourable',
    meaningEn: 'opposition or hindrance',
    meaningSi: 'විරෝධය හා බාධා',
  },
  {
    num: 6,
    en: 'Sadhaka',
    si: 'සාධක',
    quality: 'favourable',
    meaningEn: 'accomplishment of aims',
    meaningSi: 'අරමුණු ඉටුවීම',
  },
  {
    num: 7,
    en: 'Vadha',
    si: 'වධ',
    quality: 'less-favourable',
    meaningEn: 'obstruction',
    meaningSi: 'බාධාව',
  },
  {
    num: 8,
    en: 'Mitra',
    si: 'මිත්‍ර',
    quality: 'favourable',
    meaningEn: 'a friend',
    meaningSi: 'මිතුරු බව',
  },
  {
    num: 9,
    en: 'Ati-Mitra',
    si: 'අති මිත්‍ර',
    quality: 'favourable',
    meaningEn: 'a close friend',
    meaningSi: 'ඉතා කිට්ටු මිතුරු බව',
  },
];

export const TARA_QUALITY_LABEL: Record<TaraQuality, { en: string; si: string }> = {
  favourable: { en: 'favourable', si: 'සුබ' },
  mixed: { en: 'mixed', si: 'මිශ්‍ර' },
  'less-favourable': { en: 'less favourable', si: 'අඩු සුබ' },
};
