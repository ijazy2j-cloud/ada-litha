export interface DayGuidance {
  /** Planetary ruler of the weekday. */
  rulerEn: string;
  rulerSi: string;
  goodFor: string;
  goodForSi: string;
  avoid: string;
  avoidSi: string;
  direction: string;
  colour: string;
  colourSi: string;
}

// Weekday planetary rulers per Sinhala astrological tradition. Gentle,
// activity-level guidance only — never medical, financial or relationship
// instruction.
export const GUIDANCE: DayGuidance[] = [
  {
    rulerEn: 'the Sun',
    rulerSi: 'රවි',
    goodFor: 'ceremonies, duties of leadership, beginnings made with care',
    goodForSi: 'උත්සව, නායකත්ව කටයුතු, පරෙස්සමින් ඇරඹුම්',
    avoid: 'pride and heated argument',
    avoidSi: 'අහංකාරය හා උණුසුම් වාද',
    direction: 'east',
    colour: 'copper red',
    colourSi: 'තඹ රතු',
  },
  {
    rulerEn: 'the Moon',
    rulerSi: 'සඳු',
    goodFor: 'family matters, planting, quiet beginnings',
    goodForSi: 'පවුලේ කටයුතු, වගා කිරීම, සන්සුන් ඇරඹුම්',
    avoid: 'restlessness and taking on too much',
    avoidSi: 'නොසන්සුන්කම හා වැඩි බර ගැනීම',
    direction: 'north-west',
    colour: 'white',
    colourSi: 'සුදු',
  },
  {
    rulerEn: 'Mars',
    rulerSi: 'අඟහරු',
    goodFor: 'physical work, exercise, tasks needing courage',
    goodForSi: 'ශාරීරික වැඩ, ව්‍යායාම, ධෛර්යය අවශ්‍ය කාර්ය',
    avoid: 'quarrels and harsh words',
    avoidSi: 'ආරවුල් හා රළු වචන',
    direction: 'south',
    colour: 'deep red',
    colourSi: 'තද රතු',
  },
  {
    rulerEn: 'Mercury',
    rulerSi: 'බුධ',
    goodFor: 'learning, agreements, communication',
    goodForSi: 'ඉගෙනීම, ගිවිසුම්, සන්නිවේදනය',
    avoid: 'rushed decisions',
    avoidSi: 'ඉක්මන් තීරණ',
    direction: 'north',
    colour: 'green',
    colourSi: 'කොළ',
  },
  {
    rulerEn: 'Jupiter',
    rulerSi: 'ගුරු',
    goodFor: 'teaching, merit-making, beginning studies',
    goodForSi: 'ඉගැන්වීම, පින්කම්, අධ්‍යයන ඇරඹුම',
    avoid: 'setting aside the counsel of elders',
    avoidSi: 'වැඩිහිටියන්ගේ උපදෙස් නොසලකා හැරීම',
    direction: 'north-east',
    colour: 'saffron yellow',
    colourSi: 'කහ',
  },
  {
    rulerEn: 'Venus',
    rulerSi: 'සිකුරු',
    goodFor: 'art, music, friendship, adornment',
    goodForSi: 'කලාව, සංගීතය, මිත්‍රත්වය, අලංකරණය',
    avoid: 'excess and extravagance',
    avoidSi: 'අධිකත්වය හා නාස්තිය',
    direction: 'south-east',
    colour: 'pale blue',
    colourSi: 'ලා නිල්',
  },
  {
    rulerEn: 'Saturn',
    rulerSi: 'සෙනසුරු',
    goodFor: 'quiet diligence, tidying, finishing what was begun',
    goodForSi: 'නිහඬ කැපවීම, පිළිවෙළ කිරීම, ඇරඹූ දේ අවසන් කිරීම',
    avoid: 'new ventures and long journeys',
    avoidSi: 'නව ව්‍යාපාර හා දිගු ගමන්',
    direction: 'west',
    colour: 'dark blue',
    colourSi: 'තද නිල්',
  },
];
