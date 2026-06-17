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
  /** Muted hex for a small swatch, tuned to sit on the dark maroon sheet. */
  colourHex: string;
}

export const GRAHAS: Record<GrahaId, Graha> = {
  sun: { id: 'sun', en: 'Sun', si: 'රවි', colourEn: 'copper red', colourSi: 'තඹ රතු', colourHex: '#C0552B' },
  moon: { id: 'moon', en: 'Moon', si: 'සඳු', colourEn: 'white', colourSi: 'සුදු', colourHex: '#ECE3CC' },
  mars: { id: 'mars', en: 'Mars', si: 'අඟහරු', colourEn: 'red', colourSi: 'රතු', colourHex: '#B23A2E' },
  mercury: { id: 'mercury', en: 'Mercury', si: 'බුධ', colourEn: 'green', colourSi: 'කොළ', colourHex: '#4E8A57' },
  jupiter: { id: 'jupiter', en: 'Jupiter', si: 'ගුරු', colourEn: 'yellow', colourSi: 'කහ', colourHex: '#D6A82E' },
  venus: { id: 'venus', en: 'Venus', si: 'සිකුරු', colourEn: 'white', colourSi: 'සුදු', colourHex: '#E6DCC4' },
  saturn: { id: 'saturn', en: 'Saturn', si: 'සෙනසුරු', colourEn: 'dark blue', colourSi: 'තද නිල්', colourHex: '#3A4670' },
  rahu: { id: 'rahu', en: 'Rahu', si: 'රාහු', colourEn: 'smoke grey', colourSi: 'දුම් අළු', colourHex: '#6E6A66' },
  ketu: { id: 'ketu', en: 'Ketu', si: 'කේතු', colourEn: 'brown', colourSi: 'දුඹුරු', colourHex: '#6E4A33' },
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
