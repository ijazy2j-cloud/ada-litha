// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// Plain, one-line explanations of the traditional terms shown in the app, for
// readers with no prior knowledge. Sinhala + English, kept calm and factual:
// each says what the term *is*, never what a person should do. The wording is
// cultural and educational, so a human (ideally an astrologer + a Sinhala
// editor) should confirm it before launch.
export const GLOSSARY_VERIFIED = false;

export interface GlossaryEntry {
  /** Short Sinhala explanation — one calm line. */
  si: string;
  /** Short English explanation — one calm line. */
  en: string;
}

export type GlossaryKey =
  | 'birthStar'
  | 'moonSign'
  | 'taraBala'
  | 'luckyColour'
  | 'rahu'
  | 'yamaganda'
  | 'gulika'
  | 'abhijit';

export const GLOSSARY: Record<GlossaryKey, GlossaryEntry> = {
  birthStar: {
    si: 'ඔබ උපන් මොහොතේ සඳ සිටි තරු මණ්ඩලය — සම්ප්‍රදායේ නැකත ලෙස සැලකේ.',
    en: "The star-group the Moon was in at your birth moment — your 'nakshatra' in the tradition.",
  },
  moonSign: {
    si: 'ඔබ උපන් මොහොතේ සඳ සිටි රාශිය — රාශි දොළහෙන් එකකි.',
    en: 'The zodiac sign the Moon occupied at your birth — one of the twelve rashis.',
  },
  taraBala: {
    si: 'අද සඳ සිටින නැකත ඔබේ උපන් නැකත සමඟ සසඳා, දවසට පොදුවේ සුබ/මිශ්‍ර/අඩු සුබ බවක් දෙන සරල ක්‍රමයකි.',
    en: "Compares today's moon-star to your birth star to give the day a general favourable, mixed or less-favourable feel.",
  },
  luckyColour: {
    si: 'ඔබේ නැකත පාලනය කරන ග්‍රහයාගෙන් සම්ප්‍රදායානුකූලව ලැබෙන වර්ණයයි.',
    en: "Comes, by tradition, from the planet that rules your birth star.",
  },
  rahu: {
    si: 'වැදගත් දේ අරඹන්නට සම්ප්‍රදායෙන් අඩු සුබ ලෙස සැලකෙන දිනපතා වේලාවකි.',
    en: 'A daily window traditionally considered inauspicious — best avoided for starting important things.',
  },
  yamaganda: {
    si: 'වැදගත් දේ අරඹන්නට සම්ප්‍රදායෙන් අඩු සුබ ලෙස සැලකෙන තවත් වේලාවකි.',
    en: 'Another window traditionally considered inauspicious for beginning important matters.',
  },
  gulika: {
    si: 'වැදගත් දේ අරඹන්නට සම්ප්‍රදායෙන් අඩු සුබ ලෙස සැලකෙන වේලාවකි.',
    en: 'A period traditionally held inauspicious for starting important undertakings.',
  },
  abhijit: {
    si: 'මධ්‍යාහ්නය වටා පවතින, සම්ප්‍රදායෙන් සුබ ලෙස සැලකෙන කෙටි වේලාවකි.',
    en: 'The short window around midday traditionally considered auspicious.',
  },
};
