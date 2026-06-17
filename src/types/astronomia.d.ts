// Minimal ambient declarations for the astronomia subpaths the astrology
// engine uses. astronomia ships no types of its own (v4.2.0).
declare module 'astronomia/moonposition' {
  interface MoonCoord {
    /** Geocentric apparent ecliptic longitude, radians, mean equinox of date. */
    lon: number;
    /** Geocentric ecliptic latitude, radians. */
    lat: number;
    /** Earth–Moon distance, km. */
    range: number;
  }
  const moonposition: {
    position(jde: number): MoonCoord;
  };
  export default moonposition;
}

declare module 'astronomia/nutation' {
  const nutation: {
    /** Returns [Δψ, Δε] in radians for the given JDE. */
    nutation(jde: number): [number, number];
  };
  export default nutation;
}
