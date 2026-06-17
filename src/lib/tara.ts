import { TARAS, type Tara } from '../data/tara';
import { siderealMoonLongitude, placementFromLongitude } from './astrology';

/**
 * Tara number (1–9) counting from the birth nakshatra to the day's nakshatra.
 * Count is inclusive (same star = 1 = Janma), taken modulo 9.
 */
export function taraNumber(birthNakshatraNum: number, dayNakshatraNum: number): number {
  const count = ((dayNakshatraNum - birthNakshatraNum + 27) % 27) + 1; // 1..27
  return ((count - 1) % 9) + 1; // 1..9
}

export interface TaraResult {
  dayNakshatraNum: number;
  /** Inclusive count from birth star to today's star, 1–27. */
  count: number;
  tara: Tara;
}

/** Today's Tara for a given birth nakshatra, from the Moon's current position. */
export function getTodayTara(birthNakshatraNum: number, atMs: number = Date.now()): TaraResult {
  const sidereal = siderealMoonLongitude(atMs).sidereal;
  const dayNakshatraNum = placementFromLongitude(sidereal).nakshatraNum;
  const count = ((dayNakshatraNum - birthNakshatraNum + 27) % 27) + 1;
  return { dayNakshatraNum, count, tara: TARAS[taraNumber(birthNakshatraNum, dayNakshatraNum) - 1] };
}
