import { describe, expect, it } from 'vitest';
import { getDayPeriods, getAbhijit, periodStatus } from '../src/lib/auspicious';
import { getRahuKalaya } from '../src/lib/rahu';

// A clean daylight window: sunrise 06:00 (360), sunset 18:00 (1080).
const SUNRISE = 360;
const SUNSET = 1080;
const DAYLEN = SUNSET - SUNRISE; // 720
const SEG = DAYLEN / 8; // 90

describe('day periods divide the same daylight as Rahu Kalaya', () => {
  it('the panel Rahu period equals getRahuKalaya for every weekday', () => {
    for (let wd = 0; wd < 7; wd++) {
      const rahuRef = getRahuKalaya(wd, SUNRISE, SUNSET);
      const rahu = getDayPeriods(wd, SUNRISE, SUNSET).find((p) => p.id === 'rahu')!;
      expect(rahu.start).toBeCloseTo(rahuRef.start, 6);
      expect(rahu.end).toBeCloseTo(rahuRef.end, 6);
    }
  });

  it('Rahu / Yamaganda / Gulika each span exactly one eighth and sit on the grid', () => {
    for (let wd = 0; wd < 7; wd++) {
      const periods = getDayPeriods(wd, SUNRISE, SUNSET);
      for (const id of ['rahu', 'yamaganda', 'gulika'] as const) {
        const p = periods.find((x) => x.id === id)!;
        expect(p.end - p.start).toBeCloseTo(SEG, 6); // one eighth
        const segIndex = (p.start - SUNRISE) / SEG; // integer 0..7
        expect(segIndex).toBeCloseTo(Math.round(segIndex), 6);
        expect(Math.round(segIndex)).toBeGreaterThanOrEqual(0);
        expect(Math.round(segIndex)).toBeLessThan(8);
      }
    }
  });

  it('the three inauspicious segments are distinct each weekday', () => {
    for (let wd = 0; wd < 7; wd++) {
      const periods = getDayPeriods(wd, SUNRISE, SUNSET);
      const starts = ['rahu', 'yamaganda', 'gulika'].map(
        (id) => periods.find((p) => p.id === id)!.start,
      );
      expect(new Set(starts).size).toBe(3);
    }
  });
});

describe('Abhijit muhurta', () => {
  it('is centred on solar midday and one fifteenth of daylight wide', () => {
    const a = getAbhijit(SUNRISE, SUNSET);
    const midday = (SUNRISE + SUNSET) / 2;
    expect((a.start + a.end) / 2).toBeCloseTo(midday, 6);
    expect(a.end - a.start).toBeCloseTo(DAYLEN / 15, 6);
  });

  it('is marked auspicious; the other three inauspicious', () => {
    const periods = getDayPeriods(3, SUNRISE, SUNSET);
    expect(periods.find((p) => p.id === 'abhijit')!.kind).toBe('auspicious');
    expect(periods.filter((p) => p.kind === 'inauspicious').map((p) => p.id)).toEqual([
      'rahu',
      'yamaganda',
      'gulika',
    ]);
  });
});

describe('periodStatus', () => {
  it('reports upcoming / running / over relative to now', () => {
    expect(periodStatus(600, 690, 500)).toEqual({ kind: 'upcoming', minutesUntil: 100 });
    expect(periodStatus(600, 690, 650)).toEqual({ kind: 'running', minutesLeft: 40 });
    expect(periodStatus(600, 690, 700)).toEqual({ kind: 'over' });
  });
});
