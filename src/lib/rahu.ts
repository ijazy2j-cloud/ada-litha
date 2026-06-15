// Rahu Kalaya: daylight split into 8 equal segments, the inauspicious
// segment chosen by weekday (traditional ordering).
const SEGMENT_BY_WEEKDAY = [8, 2, 7, 5, 6, 4, 3]; // Sun..Sat, 1-indexed segment

export interface RahuWindow {
  /** Minutes since SL midnight. */
  start: number;
  end: number;
  segment: number; // 1..8
}

export function getRahuKalaya(weekday: number, sunrise: number, sunset: number): RahuWindow {
  const segLen = (sunset - sunrise) / 8;
  const segment = SEGMENT_BY_WEEKDAY[weekday];
  return {
    start: sunrise + (segment - 1) * segLen,
    end: sunrise + segment * segLen,
    segment,
  };
}

export type RahuStatus =
  | { kind: 'upcoming'; minutesUntil: number }
  | { kind: 'running'; minutesLeft: number }
  | { kind: 'over' };

export function getRahuStatus(window: RahuWindow, minutesOfDay: number): RahuStatus {
  if (minutesOfDay < window.start)
    return { kind: 'upcoming', minutesUntil: window.start - minutesOfDay };
  if (minutesOfDay < window.end) return { kind: 'running', minutesLeft: window.end - minutesOfDay };
  return { kind: 'over' };
}
