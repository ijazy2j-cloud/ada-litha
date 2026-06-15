// All almanac data is computed for Sri Lanka time (UTC+5:30), a fixed offset
// with no DST, regardless of the viewer's timezone.
export const SL_OFFSET_MS = 5.5 * 3_600_000;

export interface SLTime {
  year: number;
  month: number; // 0-indexed
  day: number;
  weekday: number; // 0 = Sunday
  hours: number;
  minutes: number;
  seconds: number;
  /** Minutes elapsed since SL midnight, fractional. */
  minutesOfDay: number;
  dayOfYear: number; // 1-indexed
}

export function getSLTime(now: Date = new Date()): SLTime {
  const t = new Date(now.getTime() + SL_OFFSET_MS);
  const year = t.getUTCFullYear();
  const month = t.getUTCMonth();
  const day = t.getUTCDate();
  const dayOfYear =
    Math.floor((Date.UTC(year, month, day) - Date.UTC(year, 0, 1)) / 86_400_000) + 1;
  return {
    year,
    month,
    day,
    weekday: t.getUTCDay(),
    hours: t.getUTCHours(),
    minutes: t.getUTCMinutes(),
    seconds: t.getUTCSeconds(),
    minutesOfDay: t.getUTCHours() * 60 + t.getUTCMinutes() + t.getUTCSeconds() / 60,
    dayOfYear,
  };
}

export const WEEKDAYS_SI = [
  'ඉරිදා',
  'සඳුදා',
  'අඟහරුවාදා',
  'බදාදා',
  'බ්‍රහස්පතින්දා',
  'සිකුරාදා',
  'සෙනසුරාදා',
];

export const WEEKDAYS_TA = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];

export const WEEKDAYS_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const MONTHS_SI = [
  'ජනවාරි',
  'පෙබරවාරි',
  'මාර්තු',
  'අප්‍රේල්',
  'මැයි',
  'ජූනි',
  'ජූලි',
  'අගෝස්තු',
  'සැප්තැම්බර්',
  'ඔක්තෝබර්',
  'නොවැම්බර්',
  'දෙසැම්බර්',
];

export const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
