// Lahiri (Chitrapaksha) ayanamsa — the offset between the tropical and
// sidereal zodiacs used as standard in Sri Lankan and Indian astrology.
//
// Anchored to the published Lahiri value at J2000.0 (2000-01-01 12:00 TT) of
// 23.85296° (≈ 23°51'10.7"), then carried forward and back with the IAU 2006
// accumulated general precession in ecliptic longitude. Because Lahiri is
// fixed to the star Chitra (Spica), its drift tracks general precession to
// well within an arcsecond per century — far finer than a nakshatra pada
// (3°20'). Verified in test against published Lahiri values for 1900/1950/2000.
const LAHIRI_J2000_DEG = 23.85296;

export function lahiriAyanamsa(jde: number): number {
  const T = (jde - 2451545.0) / 36525; // Julian centuries TT from J2000
  // Accumulated general precession in longitude (arcseconds), IAU 2006.
  const precessionArcsec = 5028.796195 * T + 1.1054348 * T * T;
  return LAHIRI_J2000_DEG + precessionArcsec / 3600;
}
