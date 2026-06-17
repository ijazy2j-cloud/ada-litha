// Birth-place options for the astrology engine: major Sri Lankan cities, each
// with coordinates and a fixed UTC offset. Sri Lanka has observed UTC+5:30
// since 1996 (with brief +6:00 / +6:30 spells in 1996–2006); for birth charts
// the standard +5:30 is used. A manual lat / lon / offset option (see
// BirthInput in lib/astrology.ts) covers births outside this list.
export interface BirthCity {
  id: string;
  en: string;
  si: string;
  lat: number;
  lon: number;
  /** UTC offset in hours applied to the civil birth time. */
  tzOffsetHours: number;
}

export const SL_OFFSET = 5.5;

export const BIRTH_CITIES: BirthCity[] = [
  { id: 'colombo', en: 'Colombo', si: 'කොළඹ', lat: 6.9271, lon: 79.8612, tzOffsetHours: SL_OFFSET },
  { id: 'kandy', en: 'Kandy', si: 'මහනුවර', lat: 7.2906, lon: 80.6337, tzOffsetHours: SL_OFFSET },
  { id: 'galle', en: 'Galle', si: 'ගාල්ල', lat: 6.0535, lon: 80.221, tzOffsetHours: SL_OFFSET },
  { id: 'jaffna', en: 'Jaffna', si: 'යාපනය', lat: 9.6615, lon: 80.0255, tzOffsetHours: SL_OFFSET },
  {
    id: 'batticaloa',
    en: 'Batticaloa',
    si: 'මඩකලපුව',
    lat: 7.731,
    lon: 81.6747,
    tzOffsetHours: SL_OFFSET,
  },
  {
    id: 'anuradhapura',
    en: 'Anuradhapura',
    si: 'අනුරාධපුර',
    lat: 8.3114,
    lon: 80.4037,
    tzOffsetHours: SL_OFFSET,
  },
  { id: 'kurunegala', en: 'Kurunegala', si: 'කුරුණෑගල', lat: 7.4863, lon: 80.3647, tzOffsetHours: SL_OFFSET },
  { id: 'ratnapura', en: 'Ratnapura', si: 'රත්නපුර', lat: 6.6828, lon: 80.3992, tzOffsetHours: SL_OFFSET },
];
