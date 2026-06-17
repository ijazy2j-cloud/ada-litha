import { describe, expect, it } from 'vitest';
import { taraNumber, getTodayTara } from '../src/lib/tara';
import { TARAS } from '../src/data/tara';

describe('Tara Bala counting', () => {
  it('counts inclusively from the birth nakshatra (1 = Janma)', () => {
    expect(taraNumber(1, 1)).toBe(1); // Janma — same star
    expect(taraNumber(1, 2)).toBe(2); // Sampat
    expect(taraNumber(1, 9)).toBe(9); // Ati-Mitra
    expect(taraNumber(1, 10)).toBe(1); // 10th star → cycle repeats → Janma
    expect(taraNumber(5, 3)).toBe(8); // Mitra
  });

  it('wraps across the 27-nakshatra boundary', () => {
    expect(taraNumber(27, 1)).toBe(2); // next star after 27 is 1 → Sampat
    expect(taraNumber(25, 3)).toBe(6); // count 6 → Sadhaka
  });

  it('maps the standard qualities', () => {
    expect(TARAS[0].quality).toBe('mixed'); // Janma
    expect(TARAS[1].quality).toBe('favourable'); // Sampat
    expect(TARAS[2].quality).toBe('less-favourable'); // Vipat
    expect(TARAS.filter((t) => t.quality === 'favourable').map((t) => t.num)).toEqual([2, 4, 6, 8, 9]);
    expect(TARAS.filter((t) => t.quality === 'less-favourable').map((t) => t.num)).toEqual([3, 5, 7]);
  });

  it('getTodayTara returns a valid Tara for a fixed instant', () => {
    // 2026-06-17 00:00 UTC — deterministic; just assert structure + range.
    const r = getTodayTara(5, Date.UTC(2026, 5, 17));
    expect(r.dayNakshatraNum).toBeGreaterThanOrEqual(1);
    expect(r.dayNakshatraNum).toBeLessThanOrEqual(27);
    expect(r.tara.num).toBe(taraNumber(5, r.dayNakshatraNum));
    expect(['favourable', 'mixed', 'less-favourable']).toContain(r.tara.quality);
  });
});
