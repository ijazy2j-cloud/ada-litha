import { afterEach, describe, expect, it } from 'vitest';
import { lahiriAyanamsa } from '../src/lib/ayanamsa';
import {
  computeChart,
  placementFromLongitude,
  getOrComputeChart,
  loadStoredChart,
  clearStoredChart,
  toUtcMs,
  type BirthInput,
} from '../src/lib/astrology';

// Longitude (deg) of a city for Local Mean Time before standard zones existed:
// LMT offset (hours) = longitude / 15.
const lmtOffset = (lonEast: number) => lonEast / 15;

describe('Lahiri ayanamsa', () => {
  // Independently citable: published Lahiri ayanamsa is ~22°27' (1900),
  // ~23°09' (1950) and ~23°51' (2000). JD here are 00:00 UT on Jan 1.
  it('matches published values for 1900 / 1950 / 2000', () => {
    expect(lahiriAyanamsa(2415020.5)).toBeCloseTo(22.456, 2); // 1900
    expect(lahiriAyanamsa(2433282.5)).toBeCloseTo(23.155, 2); // 1950
    expect(lahiriAyanamsa(2451544.5)).toBeCloseTo(23.853, 2); // 2000
  });
});

describe('placement derivation (pure)', () => {
  it('maps boundary longitudes to the right nakshatra / pada / rashi', () => {
    expect(placementFromLongitude(0.0)).toEqual({ nakshatraNum: 1, pada: 1, rashiNum: 1 }); // Ashwini / Mesha
    expect(placementFromLongitude(13.4)).toEqual({ nakshatraNum: 2, pada: 1, rashiNum: 1 }); // Bharani
    expect(placementFromLongitude(30.01)).toEqual({ nakshatraNum: 3, pada: 2, rashiNum: 2 }); // Krittika p2 / Vrishabha
    expect(placementFromLongitude(200.01)).toEqual({ nakshatraNum: 16, pada: 1, rashiNum: 7 }); // Vishakha / Tula
    expect(placementFromLongitude(359.99)).toEqual({ nakshatraNum: 27, pada: 4, rashiNum: 12 }); // Revati / Meena
  });

  it('wraps negative and >360 longitudes', () => {
    expect(placementFromLongitude(-0.01)).toEqual({ nakshatraNum: 27, pada: 4, rashiNum: 12 });
    expect(placementFromLongitude(360.0)).toEqual({ nakshatraNum: 1, pada: 1, rashiNum: 1 });
  });
});

// ── End-to-end against a documented birth ───────────────────────────────────
// Albert Einstein — 14 March 1879, 11:30 LMT, Ulm (lon 9.99° E). His birth data
// is Rodden-rated AA (accurate), and his Western (tropical) Moon is documented
// as SAGITTARIUS — which the engine must reproduce, validating the Moon
// position + timezone handling. Applying the (separately tested) Lahiri
// ayanamsa moves that to the sidereal sign SCORPIO / nakshatra JYESHTHA.
describe('Einstein 1879-03-14 11:30 LMT Ulm', () => {
  const input: BirthInput = {
    date: '1879-03-14',
    time: '11:30',
    place: { kind: 'manual', lat: 48.4, lon: 9.99, tzOffsetHours: lmtOffset(9.99), label: 'Ulm' },
  };
  const chart = computeChart(input);

  it('resolves to the documented UTC instant (~10:50 UT)', () => {
    // 11:30 LMT − (9.99°/15 = 0:39:57.6) = 10:50:02.4 UT.
    expect(chart.utc.slice(0, 16)).toBe('1879-03-14T10:50');
  });

  it('tropical Moon is in Sagittarius (the documented Western Moon sign)', () => {
    expect(chart.moon.tropical).toBeGreaterThan(240);
    expect(chart.moon.tropical).toBeLessThan(270);
    expect(chart.moon.tropical).toBeCloseTo(254.5, 0);
  });

  it('sidereal (Lahiri) Moon is Jyeshtha pada 2 in Vrischika (Scorpio)', () => {
    expect(chart.nakshatra.en).toBe('Jyeshtha');
    expect(chart.nakshatra.num).toBe(18);
    expect(chart.nakshatra.pada).toBe(2);
    expect(chart.rashi.en).toBe('Vrischika');
    expect(chart.rashi.num).toBe(8);
    // Jyeshtha's Vimshottari lord is Mercury → its lucky colour.
    expect(chart.nakshatra.lord.en).toBe('Mercury');
    expect(chart.nakshatra.luckyColour.en).toBe('green');
  });
});

// Mahatma Gandhi — 2 October 1869, 07:11:51 LMT, Porbandar (lon 69.60° E).
// A second independent cross-check.
describe('Gandhi 1869-10-02 07:11:51 LMT Porbandar', () => {
  const input: BirthInput = {
    date: '1869-10-02',
    time: '07:11:51',
    place: {
      kind: 'manual',
      lat: 21.64,
      lon: 69.6,
      tzOffsetHours: lmtOffset(69.6),
      label: 'Porbandar',
    },
  };
  const chart = computeChart(input);

  it('sidereal Moon is Ashlesha in Karka (Cancer)', () => {
    expect(chart.nakshatra.en).toBe('Ashlesha');
    expect(chart.rashi.en).toBe('Karka');
    expect(chart.rashi.num).toBe(4);
  });
});

// ── localStorage compute-once ───────────────────────────────────────────────
describe('localStorage persistence', () => {
  // Minimal in-memory localStorage shim for the node test environment.
  const store = new Map<string, string>();
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: () => null,
    length: 0,
  } as Storage;

  afterEach(() => clearStoredChart());

  const input: BirthInput = {
    date: '1990-05-15',
    time: '06:30',
    place: { kind: 'city', cityId: 'colombo' },
  };

  it('computes once, then serves the stored chart for the same input', () => {
    expect(loadStoredChart()).toBeNull();
    const first = getOrComputeChart(input);
    expect(loadStoredChart()).not.toBeNull();
    const second = getOrComputeChart(input);
    expect(second.moon.sidereal).toBe(first.moon.sidereal);
    expect(second.nakshatra.en).toBe(first.nakshatra.en);
  });

  it('recomputes when the input changes', () => {
    const a = getOrComputeChart(input);
    const b = getOrComputeChart({ ...input, time: '18:30' });
    // ~12h of Moon motion must change the sidereal longitude.
    expect(b.moon.sidereal).not.toBe(a.moon.sidereal);
  });
});

// Sanity: toUtcMs subtracts the offset correctly.
describe('timezone handling', () => {
  afterEach(() => clearStoredChart());
  it('subtracts the SL +5:30 offset from civil time', () => {
    const ms = toUtcMs({ date: '2000-01-01', time: '12:00', place: { kind: 'city', cityId: 'colombo' } });
    expect(new Date(ms).toISOString()).toBe('2000-01-01T06:30:00.000Z');
  });
});
