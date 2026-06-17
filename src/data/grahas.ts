// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// The nine grahas (planets) of Sri Lankan / Indian astrology, with their
// traditional Sinhala names and the lucky colour associated with each.
// Colours follow the common gem/planet tradition, but regional variation
// exists — a human astrologer should confirm the Sinhala names and colours
// before this is shown to users.
export const GRAHAS_VERIFIED = false;

export type GrahaId =
  | 'sun'
  | 'moon'
  | 'mars'
  | 'mercury'
  | 'jupiter'
  | 'venus'
  | 'saturn'
  | 'rahu'
  | 'ketu';

export interface Graha {
  id: GrahaId;
  en: string;
  si: string;
  colourEn: string;
  colourSi: string;
}

export const GRAHAS: Record<GrahaId, Graha> = {
  sun: { id: 'sun', en: 'Sun', si: 'රවි', colourEn: 'copper red', colourSi: 'තඹ රතු' },
  moon: { id: 'moon', en: 'Moon', si: 'සඳු', colourEn: 'white', colourSi: 'සුදු' },
  mars: { id: 'mars', en: 'Mars', si: 'අඟහරු', colourEn: 'red', colourSi: 'රතු' },
  mercury: { id: 'mercury', en: 'Mercury', si: 'බුධ', colourEn: 'green', colourSi: 'කොළ' },
  jupiter: { id: 'jupiter', en: 'Jupiter', si: 'ගුරු', colourEn: 'yellow', colourSi: 'කහ' },
  venus: { id: 'venus', en: 'Venus', si: 'සිකුරු', colourEn: 'white', colourSi: 'සුදු' },
  saturn: { id: 'saturn', en: 'Saturn', si: 'සෙනසුරු', colourEn: 'dark blue', colourSi: 'තද නිල්' },
  rahu: { id: 'rahu', en: 'Rahu', si: 'රාහු', colourEn: 'smoke grey', colourSi: 'දුම් අළු' },
  ketu: { id: 'ketu', en: 'Ketu', si: 'කේතු', colourEn: 'brown', colourSi: 'දුඹුරු' },
};

// Planetary ruler of each weekday (0 = Sunday). The "day colour" is this
// graha's colour — kept separate from a person's nakshatra colour so the two
// can be compared.
export const WEEKDAY_RULER: GrahaId[] = [
  'sun', // Sunday
  'moon', // Monday
  'mars', // Tuesday
  'mercury', // Wednesday
  'jupiter', // Thursday
  'venus', // Friday
  'saturn', // Saturday
];

export function weekdayColour(weekday: number): { en: string; si: string; graha: Graha } {
  const graha = GRAHAS[WEEKDAY_RULER[weekday]];
  return { en: graha.colourEn, si: graha.colourSi, graha };
}
