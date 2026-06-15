export interface Proverb {
  si: string;
  translit: string;
  en: string;
}

// Curated traditional Sinhala proverbs, rotated by day of year.
export const PROVERBS: Proverb[] = [
  {
    si: 'පිරුණු කළේ දිය නොසැලේ',
    translit: 'Piruṇu kaḷē diya nosælē',
    en: 'A full pot makes no splash — the truly wise never boast.',
  },
  {
    si: 'උගුරට හොරා බෙහෙත් කන්න බැහැ',
    translit: 'Uguraṭa horā behet kanna bæhæ',
    en: 'You cannot swallow medicine hiding it from your own throat — there is no deceiving yourself.',
  },
  {
    si: 'වඳුරාට දැලිපිහිය දුන්නා වගේ',
    translit: 'Vaňdurāṭa dælipihiya dunnā vagē',
    en: 'Like handing a razor to a monkey — entrusting power to one who cannot wield it.',
  },
  {
    si: 'හොරාගේ අම්මාගෙන් පේන අහනවා වගේ',
    translit: 'Horāgē ammāgen pēna ahanavā vagē',
    en: 'Like asking the thief’s mother for the oracle — seeking truth from a biased source.',
  },
  {
    si: 'බළලුන් ලවා කොස් ඇට බාවනවා',
    translit: 'Baḷalun lavā kos æṭa bāvanavā',
    en: 'Getting the cat to pull jak seeds from the fire — making others do your risky work.',
  },
  {
    si: 'ගඟේ ඉඳගෙන කිඹුලාට හතුරු නොවන්න',
    translit: 'Gaňgē iňdagena kim̆bulāṭa haturu novanna',
    en: 'While you live in the river, do not make an enemy of the crocodile.',
  },
  {
    si: 'ඉන්න ගහේ අත්ත කපනවා වගේ',
    translit: 'Inna gahē atta kapanavā vagē',
    en: 'Like sawing off the branch you sit on — destroying what supports you.',
  },
  {
    si: 'ළිං මැඩියා වගේ',
    translit: 'Ḷiṁ mæḍiyā vagē',
    en: 'Like the frog in the well — mistaking your small world for the whole world.',
  },
  {
    si: 'කොළඹට කිරි, අපට කැකිරි',
    translit: 'Koḷam̆baṭa kiri, apaṭa kækiri',
    en: 'Milk for Colombo, melons for us — the favoured get the cream.',
  },
  {
    si: 'පුහුල් හොරා කරෙන් දැනේ',
    translit: 'Puhul horā karen dænē',
    en: 'The pumpkin thief is known by his shoulder — guilt betrays itself.',
  },
  {
    si: 'හිසරදයට කොට්ටා මාරු කළා වගේ',
    translit: 'Hisaradayaṭa koṭṭā māru kaḷā vagē',
    en: 'Like changing the pillow to cure a headache — treating the symptom, not the cause.',
  },
  {
    si: 'ඉබ්බාගෙන් පිහාටු ඉල්ලනවා වගේ',
    translit: 'Ibbāgen pihāṭu illanavā vagē',
    en: 'Like asking a turtle for feathers — demanding the impossible.',
  },
  {
    si: 'අන්ධයාට මාණික්‍යය කුමටද?',
    translit: 'Andhayāṭa māṇikya kumaṭada?',
    en: 'What use is a gem to the blind? Value is wasted on those who cannot see it.',
  },
  {
    si: 'ගහට පොත්ත වගේ',
    translit: 'Gahaṭa potta vagē',
    en: 'Like bark to the tree — two things that cannot be parted.',
  },
  {
    si: 'කර උඩින් වතුර ගියාම අඩියක් ගියත් රියනක් ගියත් එකයි',
    translit: 'Kara uḍin vatura giyāma aḍiyak giyat riyanak giyat ekayi',
    en: 'Once the water is over your head, a foot or a fathom is all the same.',
  },
];

export function proverbOfTheDay(dayOfYear: number): Proverb {
  return PROVERBS[dayOfYear % PROVERBS.length];
}
