export interface ThisDayNote {
  si: string;
  en: string;
}

// "අද දිනය · This Day" — a short, calm cultural or Dhamma-flavoured line,
// rotated by day of year. Two lines: Sinhala hero, small English beneath.
// No API calls; entirely local. Notes stay gentle and non-prescriptive.
export const THIS_DAY_NOTES: ThisDayNote[] = [
  {
    si: 'අලුත් දවසක් — සිහියෙන් හා කරුණාවෙන් පටන් ගනිමු.',
    en: 'A new day — let it begin with mindfulness and kindness.',
  },
  {
    si: 'සඳ වෙනස් වෙනවා වගේ, හැම දෙයක්ම අනිත්‍යයි.',
    en: 'As the moon changes, so all things pass — nothing stays.',
  },
  {
    si: 'පෝය එනතුරු සිත සන්සුන්ව තබා ගනිමු.',
    en: 'As the Poya nears, keep the mind quiet and unhurried.',
  },
  {
    si: 'කුඩා යහපතක් වුවද අද කරමු — පින් රැස් වෙයි.',
    en: 'Do one small good today; merit gathers like raindrops.',
  },
  {
    si: 'උදෑසන ඉර එළියට වඳිමින් දවස පටන් ගනිමු.',
    en: 'Greet the morning sun and let the day begin gently.',
  },
  {
    si: 'වචනයෙන් සිතින් ක්‍රියාවෙන් කිසිවෙකුට හිංසා නොකරමු.',
    en: 'Harm no one today — in word, in thought, in deed.',
  },
  {
    si: 'තිසරණ සරණ ගිය අයට බියක් නැත.',
    en: 'For those who take refuge in the Triple Gem, there is calm.',
  },
  {
    si: 'අද දවසේ එක් අයෙකුට හෝ උදව්වක් කරමු.',
    en: 'Lend a hand to at least one person today.',
  },
  {
    si: 'ඉවසීම උතුම් තපසකි — අද එය පුරුදු කරමු.',
    en: 'Patience is the highest practice; cultivate it today.',
  },
  {
    si: 'අම්මට තාත්තට වැඳ දවස පටන් ගැනීම සිරිතකි.',
    en: 'Begin the day with respect for mother and father.',
  },
  {
    si: 'සතුට පිටතින් නොව, සන්සුන් සිතකින් උපදී.',
    en: 'Contentment rises not from outside, but from a settled mind.',
  },
  {
    si: 'අද ලද දෙයට කෘතඥ වෙමු.',
    en: 'Be grateful for what this day has given.',
  },
  {
    si: 'සිල් රැකීම සැමට සැනසීම ගෙන දෙයි.',
    en: 'Keeping the precepts brings ease to all around us.',
  },
  {
    si: 'කෝපය උපන් විට, හුස්මක් ගෙන මොහොතක් නවතිමු.',
    en: 'When anger stirs, take a breath and pause a moment.',
  },
  {
    si: 'දන් දීම සිත පුළුල් කරයි.',
    en: 'Generosity widens the heart.',
  },
  {
    si: 'අද වැඩ පටන් ගැනීමට පෙර මොහොතක් භාවනා කරමු.',
    en: 'Before the day’s work, sit quietly for a moment.',
  },
  {
    si: 'හැම සතෙකුටම සුවය වේවා යැයි මෙත් කරමු.',
    en: 'May every being be well — radiate loving-kindness.',
  },
  {
    si: 'වැඩිහිටියන්ගේ වචනයට ඇහුම්කන් දීම ගුණයකි.',
    en: 'To heed the words of elders is a quiet virtue.',
  },
  {
    si: 'අද සිතූ යහපත් සිතුවිල්ල ක්‍රියාවට නඟමු.',
    en: 'Turn today’s good intention into a good act.',
  },
  {
    si: 'ලෝභය අඩු කළ විට සිත සැහැල්ලු වෙයි.',
    en: 'As wanting lessens, the mind grows light.',
  },
  {
    si: 'සඳ පායන රෑ බුදුගුණ සිහි කරමු.',
    en: 'On a moonlit night, recall the virtues of the Buddha.',
  },
  {
    si: 'සත්‍ය වචනය කතා කිරීම අභයදානයකි.',
    en: 'To speak the truth is itself a gift of fearlessness.',
  },
  {
    si: 'අද කරන කුඩා පුරුද්දක් හෙට ශක්තියක් වෙයි.',
    en: 'A small habit kept today becomes tomorrow’s strength.',
  },
  {
    si: 'සැහැල්ලු සිතින්, මුහුණේ සිනාවකින් දවස ගෙවමු.',
    en: 'Move through the day with a light mind and a soft smile.',
  },
  {
    si: 'අන් අයගේ වැරදි නොව, තම සිත බලමු.',
    en: 'Look not at others’ faults, but at your own mind.',
  },
  {
    si: 'සොබාදහමට ගරු කරමු — ගසක් සිටුවීම පිනකි.',
    en: 'Honour nature — even planting one tree is merit.',
  },
  {
    si: 'අද හමුවන සැමට මෛත්‍රියෙන් කතා කරමු.',
    en: 'Speak with friendliness to everyone you meet today.',
  },
  {
    si: 'නිදහසේ හුස්ම ගනිමින් මේ මොහොතේ රැඳෙමු.',
    en: 'Breathe easy and rest a while in this present moment.',
  },
];

export function thisDayNote(dayOfYear: number): ThisDayNote {
  return THIS_DAY_NOTES[dayOfYear % THIS_DAY_NOTES.length];
}
