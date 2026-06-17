// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// Three fixed, classical temperament traits per nakshatra — Sinhala + English.
// These are traditional character descriptions only: no predictions, and
// nothing about health, money or relationships. Keyed by nakshatra number
// (1 = Ashwini). A human astrologer should confirm these before launch.
export const NAKSHATRA_TRAITS_VERIFIED = false;

export interface Trait {
  en: string;
  si: string;
}

export const NAKSHATRA_TRAITS: Record<number, Trait[]> = {
  1: [
    { en: 'swift', si: 'ක්‍ෂණික' },
    { en: 'energetic', si: 'ශක්තිමත්' },
    { en: 'healing', si: 'සුව කරන' },
  ],
  2: [
    { en: 'determined', si: 'අධිෂ්ඨානශීලී' },
    { en: 'creative', si: 'නිර්මාණශීලී' },
    { en: 'enduring', si: 'විඳදරාගන්නා' },
  ],
  3: [
    { en: 'sharp', si: 'තියුණු' },
    { en: 'courageous', si: 'නිර්භීත' },
    { en: 'focused', si: 'අවධානයෙන්' },
  ],
  4: [
    { en: 'graceful', si: 'සුහද' },
    { en: 'steady', si: 'ස්ථාවර' },
    { en: 'artistic', si: 'කලාත්මක' },
  ],
  5: [
    { en: 'curious', si: 'කුතුහලයෙන්' },
    { en: 'gentle', si: 'මෘදු' },
    { en: 'adaptable', si: 'අනුවර්තනශීලී' },
  ],
  6: [
    { en: 'keen', si: 'උද්‍යෝගී' },
    { en: 'thoughtful', si: 'කල්පනාශීලී' },
    { en: 'persevering', si: 'නොපසුබට' },
  ],
  7: [
    { en: 'patient', si: 'ඉවසිලිවන්ත' },
    { en: 'optimistic', si: 'ශුභවාදී' },
    { en: 'generous', si: 'ත්‍යාගශීලී' },
  ],
  8: [
    { en: 'caring', si: 'රැකබලා ගන්නා' },
    { en: 'calm', si: 'සන්සුන්' },
    { en: 'supportive', si: 'පිටුවහල්' },
  ],
  9: [
    { en: 'insightful', si: 'අවබෝධශීලී' },
    { en: 'intuitive', si: 'අන්තර්ඥානවන්ත' },
    { en: 'clever', si: 'දක්ෂ' },
  ],
  10: [
    { en: 'dignified', si: 'ගෞරවනීය' },
    { en: 'loyal', si: 'විශ්වාසවන්ත' },
    { en: 'noble', si: 'උතුම්' },
  ],
  11: [
    { en: 'warm', si: 'හෘදයාංගම' },
    { en: 'friendly', si: 'මිත්‍රශීලී' },
    { en: 'creative', si: 'නිර්මාණශීලී' },
  ],
  12: [
    { en: 'reliable', si: 'විශ්වාසනීය' },
    { en: 'kind', si: 'කරුණාවන්ත' },
    { en: 'steady', si: 'ස්ථාවර' },
  ],
  13: [
    { en: 'skilful', si: 'දක්ෂ' },
    { en: 'diligent', si: 'කඩිසර' },
    { en: 'resourceful', si: 'සූක්ෂ්ම' },
  ],
  14: [
    { en: 'artistic', si: 'කලාත්මක' },
    { en: 'charismatic', si: 'ආකර්ෂණීය' },
    { en: 'precise', si: 'නිරවද්‍ය' },
  ],
  15: [
    { en: 'independent', si: 'ස්වාධීන' },
    { en: 'balanced', si: 'සමබර' },
    { en: 'gentle', si: 'මෘදු' },
  ],
  16: [
    { en: 'determined', si: 'අධිෂ්ඨානශීලී' },
    { en: 'focused', si: 'ඉලක්කගත' },
    { en: 'energetic', si: 'ශක්තිමත්' },
  ],
  17: [
    { en: 'friendly', si: 'මිත්‍රශීලී' },
    { en: 'devoted', si: 'කැපවූ' },
    { en: 'cooperative', si: 'සහයෝගී' },
  ],
  18: [
    { en: 'responsible', si: 'වගකීම් සහිත' },
    { en: 'protective', si: 'ආරක්ෂාකාරී' },
    { en: 'resilient', si: 'ඔරොත්තු දෙන' },
  ],
  19: [
    { en: 'inquiring', si: 'විමර්ශනශීලී' },
    { en: 'direct', si: 'ඍජු' },
    { en: 'resolute', si: 'ස්ථිර' },
  ],
  20: [
    { en: 'spirited', si: 'උද්‍යෝගිමත්' },
    { en: 'persuasive', si: 'ඒත්තු ගන්වන' },
    { en: 'steadfast', si: 'නොසැලෙන' },
  ],
  21: [
    { en: 'principled', si: 'පත්තිවන්ත' },
    { en: 'patient', si: 'ඉවසිලිවන්ත' },
    { en: 'sincere', si: 'අවංක' },
  ],
  22: [
    { en: 'attentive', si: 'අවධානයෙන්' },
    { en: 'learned', si: 'උගත්' },
    { en: 'devoted', si: 'කැපවූ' },
  ],
  23: [
    { en: 'lively', si: 'ජීවගුණැති' },
    { en: 'generous', si: 'ත්‍යාගශීලී' },
    { en: 'capable', si: 'සමර්ථ' },
  ],
  24: [
    { en: 'independent', si: 'ස්වාධීන' },
    { en: 'reflective', si: 'මෙනෙහි කරන' },
    { en: 'healing', si: 'සුව කරන' },
  ],
  25: [
    { en: 'idealistic', si: 'පරමාදර්ශී' },
    { en: 'generous', si: 'ත්‍යාගශීලී' },
    { en: 'visionary', si: 'දූරදර්ශී' },
  ],
  26: [
    { en: 'calm', si: 'සන්සුන්' },
    { en: 'wise', si: 'ප්‍රඥාවන්ත' },
    { en: 'kind', si: 'කරුණාවන්ත' },
  ],
  27: [
    { en: 'gentle', si: 'මෘදු' },
    { en: 'nurturing', si: 'රැකබලා ගන්නා' },
    { en: 'imaginative', si: 'පරිකල්පනශීලී' },
  ],
};
