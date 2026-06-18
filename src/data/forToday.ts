// ⚠️ NEEDS HUMAN VERIFICATION BEFORE LAUNCH ⚠️
// Day-level associations: for each weekday, a short list of activities the day
// is *traditionally considered* suited or less suited for. These blend common
// Sinhala custom with broader Indian Vedic weekday (vāra) associations, kept
// ONLY where the two broadly agree; where traditions differ, the milder,
// non-committal wording is chosen and the activity is simply omitted rather
// than asserted. Nothing here is a personal instruction — it describes the day,
// not the reader. A human astrologer must confirm before launch.
export const FOR_TODAY_VERIFIED = false;

export interface DayActivities {
  /** Planetary ruler, for the reader's context (Sinhala + English). */
  rulerSi: string;
  rulerEn: string;
  /** Traditionally considered good to engage. */
  suited: { si: string; en: string }[];
  /** Traditionally considered less suited. */
  lessSuited: { si: string; en: string }[];
}

// Indexed 0 = Sunday … 6 = Saturday, matching slTime weekday.
export const FOR_TODAY: DayActivities[] = [
  // Sunday — Sun / රවි
  {
    rulerSi: 'රවි',
    rulerEn: 'Sun',
    suited: [
      { si: 'නායකත්වය හා වැඩවලට ඉදිරිපත් වීම', en: 'leadership and taking initiative' },
      { si: 'වැඩිහිටියන් හා නිලධාරීන් හමුවීම', en: 'meeting elders or officials' },
      { si: 'සෞඛ්‍යය ගැන සැලකිලිමත් වීම', en: 'tending to health' },
    ],
    lessSuited: [{ si: 'නව ණය ගැනීම හෝ දීම', en: 'taking on or giving new loans' }],
  },
  // Monday — Moon / සඳු
  {
    rulerSi: 'සඳු',
    rulerEn: 'Moon',
    suited: [
      { si: 'ගමන් හා සංචාර', en: 'travel and journeys' },
      { si: 'පවුල හා නිවසේ කටයුතු', en: 'family and home matters' },
      { si: 'ශාක සිටුවීම, ජලය ආශ්‍රිත වැඩ', en: 'planting and water-related work' },
    ],
    lessSuited: [{ si: 'මහත් තීරණ ඉක්මනින් ගැනීම', en: 'rushing big decisions' }],
  },
  // Tuesday — Mars / අඟහරු
  {
    rulerSi: 'අඟහරු',
    rulerEn: 'Mars',
    suited: [
      { si: 'ශක්තිය හා නිර්භීතභාවය අවශ්‍ය වැඩ', en: 'tasks needing energy and courage' },
      { si: 'ව්‍යායාම හා ශාරීරික වෙහෙස', en: 'exercise and physical effort' },
    ],
    lessSuited: [
      { si: 'මංගල්‍ය වැනි සුබ උත්සව ඇරඹීම', en: 'beginning auspicious ceremonies' },
      { si: 'ගිවිසුම් අත්සන් කිරීම', en: 'signing agreements' },
    ],
  },
  // Wednesday — Mercury / බුධ
  {
    rulerSi: 'බුධ',
    rulerEn: 'Mercury',
    suited: [
      { si: 'ඉගෙනීම, ලිවීම, කථනය', en: 'study, writing and speaking' },
      { si: 'වෙළඳාම හා ගිණුම් කටයුතු', en: 'trade and accounts' },
      { si: 'සන්නිවේදනය හා සාකච්ඡා', en: 'communication and discussion' },
    ],
    lessSuited: [],
  },
  // Thursday — Jupiter / ගුරු
  {
    rulerSi: 'ගුරු',
    rulerEn: 'Jupiter',
    suited: [
      { si: 'අධ්‍යාපනය හා දැනුම', en: 'education and learning' },
      { si: 'ආගමික හා පුණ්‍ය කටයුතු', en: 'religious and meritorious acts' },
      { si: 'නව ආරම්භ හා වැදගත් කටයුතු', en: 'new beginnings and important matters' },
    ],
    lessSuited: [],
  },
  // Friday — Venus / සිකුරු
  {
    rulerSi: 'සිකුරු',
    rulerEn: 'Venus',
    suited: [
      { si: 'කලා, සංගීත හා නිර්මාණ වැඩ', en: 'arts, music and creative work' },
      { si: 'සබඳතා හා එක්වීම්', en: 'relationships and gatherings' },
      { si: 'සැප සංග්‍රහ හා සැරසීම', en: 'comfort, beauty and celebration' },
    ],
    lessSuited: [],
  },
  // Saturday — Saturn / සෙනසුරු
  {
    rulerSi: 'සෙනසුරු',
    rulerEn: 'Saturn',
    suited: [
      { si: 'දිගුකාලීන, ඉවසීම අවශ්‍ය වැඩ', en: 'long-term, patient work' },
      { si: 'අලුත්වැඩියා හා පිළිවෙළ කිරීම', en: 'repairs and putting things in order' },
    ],
    lessSuited: [
      { si: 'සුබ උත්සව අලුතින් ඇරඹීම', en: 'starting new auspicious events' },
      { si: 'දුර ගමන් ඇරඹීම', en: 'beginning long journeys' },
    ],
  },
];
