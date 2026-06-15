// Moon phase from the mean synodic month, anchored to the new moon of
// 2000-01-06 18:14 UTC. Accurate to within a few hours — plenty for a
// visual phase; Poya days come from the official table, not this.
const SYNODIC_DAYS = 29.530588853;
const REF_NEW_MOON_MS = Date.UTC(2000, 0, 6, 18, 14);

/** Phase as a fraction of the lunation: 0 = new, 0.5 = full, →1 = new again. */
export function moonPhase(date: Date = new Date()): number {
  const days = (date.getTime() - REF_NEW_MOON_MS) / 86_400_000;
  const lunations = days / SYNODIC_DAYS;
  return lunations - Math.floor(lunations);
}

/** Illuminated fraction of the disc, 0..1. */
export function moonIllumination(phase: number): number {
  return (1 - Math.cos(2 * Math.PI * phase)) / 2;
}

export function isWaxing(phase: number): boolean {
  return phase <= 0.5;
}

export interface MoonPhaseName {
  en: string;
  si: string;
}

export function moonPhaseName(phase: number): MoonPhaseName {
  if (phase < 0.0185 || phase > 0.9815) return { en: 'New Moon', si: 'අමාවක' };
  if (phase < 0.2315) return { en: 'Waxing Crescent', si: 'පුර පක්ෂය' };
  if (phase < 0.2685) return { en: 'First Quarter', si: 'පුර අටවක' };
  if (phase < 0.4815) return { en: 'Waxing Gibbous', si: 'පුර පක්ෂය' };
  if (phase < 0.5185) return { en: 'Full Moon', si: 'පසළොස්වක' };
  if (phase < 0.7315) return { en: 'Waning Gibbous', si: 'අව පක්ෂය' };
  if (phase < 0.7685) return { en: 'Last Quarter', si: 'අව අටවක' };
  return { en: 'Waning Crescent', si: 'අව පක්ෂය' };
}

/**
 * SVG path for the lit portion of the moon with a correct terminator:
 * a lit semicircle (right when waxing, left when waning) closed by a
 * half-ellipse whose x-radius follows cos(2πp).
 */
export function moonLitPath(phase: number, cx: number, cy: number, r: number): string {
  const c = Math.cos(2 * Math.PI * phase);
  const waxing = phase <= 0.5;
  const rx = Math.abs(c) * r;
  // Outer lit edge: top→bottom through the right (sweep 1) or left (sweep 0).
  const semiSweep = waxing ? 1 : 0;
  // Terminator, bottom→top: sweep 0 bulges right, sweep 1 bulges left.
  const termSweep = waxing ? (c >= 0 ? 0 : 1) : c >= 0 ? 1 : 0;
  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${semiSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${termSweep} ${cx} ${cy - r}`,
    'Z',
  ].join(' ');
}
