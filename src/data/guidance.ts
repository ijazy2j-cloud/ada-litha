export interface DayGuidance {
  /** Planetary ruler of the weekday. */
  rulerEn: string;
  rulerSi: string;
  goodFor: string;
  avoid: string;
  direction: string;
  colour: string;
}

// Weekday planetary rulers per Sinhala astrological tradition. Gentle,
// activity-level guidance only — never medical, financial or relationship
// instruction.
export const GUIDANCE: DayGuidance[] = [
  {
    rulerEn: 'the Sun',
    rulerSi: 'රවි',
    goodFor: 'ceremonies, duties of leadership, beginnings made with care',
    avoid: 'pride and heated argument',
    direction: 'east',
    colour: 'copper red',
  },
  {
    rulerEn: 'the Moon',
    rulerSi: 'සඳු',
    goodFor: 'family matters, planting, quiet beginnings',
    avoid: 'restlessness and taking on too much',
    direction: 'north-west',
    colour: 'white',
  },
  {
    rulerEn: 'Mars',
    rulerSi: 'අඟහරු',
    goodFor: 'physical work, exercise, tasks needing courage',
    avoid: 'quarrels and harsh words',
    direction: 'south',
    colour: 'deep red',
  },
  {
    rulerEn: 'Mercury',
    rulerSi: 'බුධ',
    goodFor: 'learning, agreements, communication',
    avoid: 'rushed decisions',
    direction: 'north',
    colour: 'green',
  },
  {
    rulerEn: 'Jupiter',
    rulerSi: 'ගුරු',
    goodFor: 'teaching, merit-making, beginning studies',
    avoid: 'setting aside the counsel of elders',
    direction: 'north-east',
    colour: 'saffron yellow',
  },
  {
    rulerEn: 'Venus',
    rulerSi: 'සිකුරු',
    goodFor: 'art, music, friendship, adornment',
    avoid: 'excess and extravagance',
    direction: 'south-east',
    colour: 'pale blue',
  },
  {
    rulerEn: 'Saturn',
    rulerSi: 'සෙනසුරු',
    goodFor: 'quiet diligence, tidying, finishing what was begun',
    avoid: 'new ventures and long journeys',
    direction: 'west',
    colour: 'dark blue',
  },
];
