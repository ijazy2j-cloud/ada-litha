// Sunrise/sunset via the NOAA solar equations
// (https://gml.noaa.gov/grad/solcalc/solareqns.PDF) for any Sri Lankan city.
export const COLOMBO_LAT = 6.9271;
export const COLOMBO_LON = 79.8612;
const SL_OFFSET_MIN = 330;
const ZENITH_DEG = 90.833; // official sunrise/sunset, includes refraction

export interface SunTimes {
  /** Minutes since SL midnight. */
  sunrise: number;
  sunset: number;
  dayLength: number;
}

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

export function getSunTimes(
  dayOfYear: number,
  year: number,
  latitude: number = COLOMBO_LAT,
  longitude: number = COLOMBO_LON,
): SunTimes {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;

  // Fractional year at SL solar noon (12:00 SL = 06:30 UTC)
  const gamma = ((2 * Math.PI) / daysInYear) * (dayOfYear - 1 + (6.5 - 12) / 24);

  // Equation of time in minutes
  const eqTime =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  // Solar declination in radians
  const decl =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const lat = rad(latitude);
  const cosHa =
    Math.cos(rad(ZENITH_DEG)) / (Math.cos(lat) * Math.cos(decl)) - Math.tan(lat) * Math.tan(decl);
  const haDeg = deg(Math.acos(Math.min(1, Math.max(-1, cosHa))));

  const sunriseUTC = 720 - 4 * (longitude + haDeg) - eqTime;
  const sunsetUTC = 720 - 4 * (longitude - haDeg) - eqTime;

  const sunrise = sunriseUTC + SL_OFFSET_MIN;
  const sunset = sunsetUTC + SL_OFFSET_MIN;
  return { sunrise, sunset, dayLength: sunset - sunrise };
}
