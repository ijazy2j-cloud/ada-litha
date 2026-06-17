import moonposition from 'astronomia/moonposition';
import nutation from 'astronomia/nutation';
import { BIRTH_CITIES } from '../data/birthCities';
import { NAKSHATRAS } from '../data/nakshatra';
import { RASHIS } from '../data/rashi';
import { GRAHAS, weekdayColour, type Graha } from '../data/grahas';
import { lahiriAyanamsa } from './ayanamsa';
import { deltaTSeconds } from './deltaT';

const R2D = 180 / Math.PI;
const NAK_LEN = 360 / 27; // 13°20'
const PADA_LEN = NAK_LEN / 4; // 3°20'

const norm360 = (x: number) => ((x % 360) + 360) % 360;

// ── Inputs ────────────────────────────────────────────────────────────────
export interface CityPlace {
  kind: 'city';
  cityId: string;
}
export interface ManualPlace {
  kind: 'manual';
  lat: number;
  lon: number;
  /** UTC offset in hours applied to the civil birth time, e.g. 5.5 for SL. */
  tzOffsetHours: number;
  label?: string;
}
export type BirthPlace = CityPlace | ManualPlace;

export interface BirthInput {
  /** Civil birth date, 'YYYY-MM-DD'. */
  date: string;
  /** Civil birth time, 'HH:MM' or 'HH:MM:SS' (24-hour). */
  time: string;
  place: BirthPlace;
}

interface ResolvedPlace {
  lat: number;
  lon: number;
  tzOffsetHours: number;
  label: string;
}

export function resolvePlace(place: BirthPlace): ResolvedPlace {
  if (place.kind === 'manual') {
    return {
      lat: place.lat,
      lon: place.lon,
      tzOffsetHours: place.tzOffsetHours,
      label: place.label ?? `${place.lat.toFixed(2)}, ${place.lon.toFixed(2)}`,
    };
  }
  const city = BIRTH_CITIES.find((c) => c.id === place.cityId);
  if (!city) throw new Error(`Unknown birth city: ${place.cityId}`);
  return { lat: city.lat, lon: city.lon, tzOffsetHours: city.tzOffsetHours, label: city.en };
}

/** Civil birth date/time + offset → the true UTC instant, in epoch ms. */
export function toUtcMs(input: BirthInput): number {
  const m = input.date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) throw new Error(`Bad date: ${input.date} (expected YYYY-MM-DD)`);
  const t = input.time.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!t) throw new Error(`Bad time: ${input.time} (expected HH:MM)`);
  const [, y, mo, d] = m;
  const [, hh, mi, ss] = t;
  const { tzOffsetHours } = resolvePlace(input.place);
  const civilMs = Date.UTC(+y, +mo - 1, +d, +hh, +mi, ss ? +ss : 0);
  return civilMs - tzOffsetHours * 3_600_000;
}

// ── Astronomy ───────────────────────────────────────────────────────────────
export interface MoonLongitude {
  /** Tropical apparent ecliptic longitude (deg, 0–360). */
  tropical: number;
  /** Lahiri sidereal ecliptic longitude (deg, 0–360). */
  sidereal: number;
  /** Ecliptic latitude (deg). */
  latitude: number;
  ayanamsa: number;
  jde: number;
}

/** Lahiri sidereal Moon longitude for a UTC instant (epoch ms). */
export function siderealMoonLongitude(utcMs: number): MoonLongitude {
  const jdUT = 2440587.5 + utcMs / 86_400_000;
  const date = new Date(utcMs);
  const decimalYear = date.getUTCFullYear() + (date.getUTCMonth() + 0.5) / 12;
  const jde = jdUT + deltaTSeconds(decimalYear) / 86_400; // UT → TT

  const pos = moonposition.position(jde);
  const dPsiDeg = nutation.nutation(jde)[0] * R2D; // nutation in longitude → apparent
  const tropical = norm360(pos.lon * R2D + dPsiDeg);
  const ayanamsa = lahiriAyanamsa(jde);
  return {
    tropical,
    sidereal: norm360(tropical - ayanamsa),
    latitude: pos.lat * R2D,
    ayanamsa,
    jde,
  };
}

// ── Derivation (pure) ───────────────────────────────────────────────────────
export interface PlacementParts {
  nakshatraNum: number; // 1–27
  pada: number; // 1–4
  rashiNum: number; // 1–12
}

/** Sidereal longitude (deg) → nakshatra number, pada and rashi number. */
export function placementFromLongitude(siderealDeg: number): PlacementParts {
  const sid = norm360(siderealDeg);
  const nakIdx = Math.floor(sid / NAK_LEN); // 0–26
  const pada = Math.floor((sid - nakIdx * NAK_LEN) / PADA_LEN) + 1; // 1–4
  const rashiIdx = Math.floor(sid / 30); // 0–11
  return { nakshatraNum: nakIdx + 1, pada, rashiNum: rashiIdx + 1 };
}

// ── Full chart ──────────────────────────────────────────────────────────────
export interface AstroChart {
  input: BirthInput;
  place: ResolvedPlace;
  utc: string; // ISO 8601
  jde: number;
  ayanamsa: number;
  moon: { tropical: number; sidereal: number; latitude: number };
  nakshatra: {
    num: number;
    en: string;
    si: string;
    pada: number;
    lord: Graha;
    luckyColour: { en: string; si: string };
  };
  rashi: { num: number; en: string; si: string; lord: Graha };
}

export function computeChart(input: BirthInput): AstroChart {
  const place = resolvePlace(input.place);
  const utcMs = toUtcMs(input);
  const moon = siderealMoonLongitude(utcMs);
  const { nakshatraNum, pada, rashiNum } = placementFromLongitude(moon.sidereal);

  const nak = NAKSHATRAS[nakshatraNum - 1];
  const nakLord = GRAHAS[nak.lord];
  const rashi = RASHIS[rashiNum - 1];

  return {
    input,
    place,
    utc: new Date(utcMs).toISOString(),
    jde: moon.jde,
    ayanamsa: moon.ayanamsa,
    moon: { tropical: moon.tropical, sidereal: moon.sidereal, latitude: moon.latitude },
    nakshatra: {
      num: nak.num,
      en: nak.en,
      si: nak.si,
      pada,
      lord: nakLord,
      luckyColour: { en: nakLord.colourEn, si: nakLord.colourSi },
    },
    rashi: { num: rashi.num, en: rashi.en, si: rashi.si, lord: GRAHAS[rashi.lord] },
  };
}

/**
 * The person's nakshatra lucky colour beside a given weekday's ruler colour,
 * so the two can be compared. `weekday` is 0 = Sunday (defaults to today in SL).
 */
export function compareColours(chart: AstroChart, weekday: number) {
  return {
    nakshatra: { ...chart.nakshatra.luckyColour, graha: chart.nakshatra.lord },
    day: weekdayColour(weekday),
  };
}

// ── localStorage: compute once ──────────────────────────────────────────────
const STORAGE_KEY = 'ada-litha-chart';

interface StoredChart {
  input: BirthInput;
  chart: AstroChart;
}

function hasStorage(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function loadStoredChart(): AstroChart | null {
  if (!hasStorage()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return (JSON.parse(raw) as StoredChart).chart;
  } catch {
    return null;
  }
}

export function saveChart(chart: AstroChart): void {
  if (!hasStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ input: chart.input, chart }));
  } catch {
    /* private mode / quota — silently skip */
  }
}

export function clearStoredChart(): void {
  if (!hasStorage()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Return the stored chart when the inputs are unchanged, otherwise compute it
 * once and persist it. Keeps the ephemeris work to a single run per birth.
 */
export function getOrComputeChart(input: BirthInput): AstroChart {
  if (hasStorage()) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredChart;
        if (JSON.stringify(stored.input) === JSON.stringify(input)) return stored.chart;
      }
    } catch {
      /* fall through to recompute */
    }
  }
  const chart = computeChart(input);
  saveChart(chart);
  return chart;
}
