// Traditional periods of the day, all derived from the same daylight division
// as Rahu Kalaya (sunrise→sunset split into 8 equal segments). Yamaganda and
// Gulika are single segments chosen by weekday; Abhijit is the middle of a
// 15-fold daytime division, centred on solar midday.
//
// All times are minutes since Sri Lanka midnight, matching the sun/Rahu math.

export interface DayPeriod {
  id: 'rahu' | 'yamaganda' | 'gulika' | 'abhijit';
  labelSi: string;
  labelEn: string;
  start: number;
  end: number;
  /** Traditional standing — for display only, not advice. */
  kind: 'inauspicious' | 'auspicious';
}

// 1-indexed daylight segment per weekday (0 = Sunday).
const RAHU_SEGMENT = [8, 2, 7, 5, 6, 4, 3];
const YAMAGANDA_SEGMENT = [5, 4, 3, 2, 1, 7, 6];
const GULIKA_SEGMENT = [7, 6, 5, 4, 3, 2, 1];

function nthSegment(sunrise: number, sunset: number, n: number) {
  const seg = (sunset - sunrise) / 8;
  return { start: sunrise + (n - 1) * seg, end: sunrise + n * seg };
}

/** Abhijit muhurta: the 8th of 15 equal daytime muhurtas, centred at midday. */
export function getAbhijit(sunrise: number, sunset: number) {
  const muhurta = (sunset - sunrise) / 15;
  return { start: sunrise + 7 * muhurta, end: sunrise + 8 * muhurta };
}

/** All four periods for a weekday and the city's sunrise/sunset. */
export function getDayPeriods(weekday: number, sunrise: number, sunset: number): DayPeriod[] {
  const rahu = nthSegment(sunrise, sunset, RAHU_SEGMENT[weekday]);
  const yama = nthSegment(sunrise, sunset, YAMAGANDA_SEGMENT[weekday]);
  const gulika = nthSegment(sunrise, sunset, GULIKA_SEGMENT[weekday]);
  const abhijit = getAbhijit(sunrise, sunset);
  return [
    { id: 'rahu', labelSi: 'රාහු කාලය', labelEn: 'Rahu Kalaya', ...rahu, kind: 'inauspicious' },
    {
      id: 'yamaganda',
      labelSi: 'යමගණ්ඩ කාලය',
      labelEn: 'Yamaganda',
      ...yama,
      kind: 'inauspicious',
    },
    { id: 'gulika', labelSi: 'ගුලික කාලය', labelEn: 'Gulika', ...gulika, kind: 'inauspicious' },
    { id: 'abhijit', labelSi: 'අභිජිත් මුහුර්තය', labelEn: 'Abhijit Muhurta', ...abhijit, kind: 'auspicious' },
  ];
}

export type PeriodStatus =
  | { kind: 'upcoming'; minutesUntil: number }
  | { kind: 'running'; minutesLeft: number }
  | { kind: 'over' };

export function periodStatus(start: number, end: number, minutesOfDay: number): PeriodStatus {
  if (minutesOfDay < start) return { kind: 'upcoming', minutesUntil: start - minutesOfDay };
  if (minutesOfDay < end) return { kind: 'running', minutesLeft: end - minutesOfDay };
  return { kind: 'over' };
}
