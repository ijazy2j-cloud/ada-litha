// A small, rotating "word of the day" from Buddhist practice — one calm term
// with a one-line meaning, Sinhala + English. These are widely-known Pali/
// Sinhala terms with settled meanings, kept gentle and non-prescriptive.
export interface PracticeWord {
  /** Romanised Pali term. */
  pali: string;
  /** Sinhala script form. */
  si: string;
  /** One-line meaning. */
  meaningSi: string;
  meaningEn: string;
}

export const PRACTICE_WORDS: PracticeWord[] = [
  {
    pali: 'Mettā',
    si: 'මෙත්තා',
    meaningSi: 'සියලු සත්වයන් කෙරෙහි මෛත්‍රිය — හිතවත්කම.',
    meaningEn: 'Loving-kindness toward all beings.',
  },
  {
    pali: 'Karuṇā',
    si: 'කරුණා',
    meaningSi: 'අනුන්ගේ දුක දැක ඇතිවන දයාව.',
    meaningEn: 'Compassion that responds to another’s suffering.',
  },
  {
    pali: 'Muditā',
    si: 'මුදිතා',
    meaningSi: 'අනුන්ගේ සතුට ගැන සතුටුවීම.',
    meaningEn: 'Sympathetic joy in others’ happiness.',
  },
  {
    pali: 'Upekkhā',
    si: 'උපේක්ෂා',
    meaningSi: 'සැප දුක දෙකෙහිම සමබර, සන්සුන් සිත.',
    meaningEn: 'Equanimity — a balanced, steady mind.',
  },
  {
    pali: 'Dāna',
    si: 'දාන',
    meaningSi: 'කැමැත්තෙන් දීම, බෙදාහදා ගැනීම.',
    meaningEn: 'Generosity — open-handed giving.',
  },
  {
    pali: 'Sīla',
    si: 'සීල',
    meaningSi: 'සදාචාරය — හොඳ පැවැත්ම.',
    meaningEn: 'Virtue — wholesome, ethical conduct.',
  },
  {
    pali: 'Sati',
    si: 'සති',
    meaningSi: 'සිහිය — මේ මොහොතේ පැවතීම.',
    meaningEn: 'Mindfulness — present-moment awareness.',
  },
  {
    pali: 'Samādhi',
    si: 'සමාධි',
    meaningSi: 'සිතේ එකඟකම, සන්සුන් බව.',
    meaningEn: 'Collectedness — a calm, unified mind.',
  },
  {
    pali: 'Paññā',
    si: 'ප්‍රඥා',
    meaningSi: 'තතු දැකීමේ නුවණ.',
    meaningEn: 'Wisdom — seeing things as they are.',
  },
  {
    pali: 'Khanti',
    si: 'ඛන්ති',
    meaningSi: 'ඉවසීම, විඳදරාගැනීම.',
    meaningEn: 'Patience and forbearance.',
  },
  {
    pali: 'Vīriya',
    si: 'වීර්ය',
    meaningSi: 'දැහැමි දේ සඳහා නොපසුබට වෑයම.',
    meaningEn: 'Energy — steady, wholesome effort.',
  },
  {
    pali: 'Saddhā',
    si: 'ශ්‍රද්ධා',
    meaningSi: 'තේරුම්ගත් විශ්වාසය, පැහැදීම.',
    meaningEn: 'Confidence rooted in understanding.',
  },
  {
    pali: 'Sacca',
    si: 'සත්‍ය',
    meaningSi: 'සත්‍යවාදීත්වය — ඇත්ත.',
    meaningEn: 'Truthfulness.',
  },
  {
    pali: 'Nekkhamma',
    si: 'නෙක්ඛම්ම',
    meaningSi: 'අල්ලාගැනීමෙන් මිදීම, සරලබව.',
    meaningEn: 'Letting go — contentment with little.',
  },
];

/** A calm, day-rotating practice word. */
export function practiceWordOfTheDay(dayOfYear: number): PracticeWord {
  return PRACTICE_WORDS[dayOfYear % PRACTICE_WORDS.length];
}
