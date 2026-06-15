import type { SLTime } from './slTime';

export interface Poya {
  month: number; // 0-indexed
  day: number;
  si: string;
  en: string;
}

// Official 2026 Poya days. Dates may shift per the Government gazette.
export const POYA_2026: Poya[] = [
  { month: 0, day: 3, si: 'දුරුතු', en: 'Duruthu' },
  { month: 1, day: 1, si: 'නවම්', en: 'Navam' },
  { month: 2, day: 2, si: 'මැදින්', en: 'Madin' },
  { month: 3, day: 1, si: 'බක්', en: 'Bak' },
  { month: 4, day: 1, si: 'වෙසක්', en: 'Vesak' },
  { month: 4, day: 31, si: 'අධි වෙසක්', en: 'Adhi Vesak' },
  { month: 5, day: 29, si: 'පොසොන්', en: 'Poson' },
  { month: 6, day: 29, si: 'ඇසළ', en: 'Esala' },
  { month: 7, day: 28, si: 'නිකිණි', en: 'Nikini' },
  { month: 8, day: 26, si: 'බිනර', en: 'Binara' },
  { month: 9, day: 26, si: 'වප්', en: 'Vap' },
  { month: 10, day: 24, si: 'ඉල්', en: 'Il' },
  { month: 11, day: 24, si: 'උඳුවප්', en: 'Unduvap' },
];

export interface PoyaInfo {
  next: Poya | null;
  daysUntil: number;
  isPoyaToday: boolean;
  today: Poya | null;
}

export function getPoyaInfo(sl: SLTime): PoyaInfo {
  const todayUTC = Date.UTC(sl.year, sl.month, sl.day);
  const today =
    sl.year === 2026
      ? (POYA_2026.find((p) => p.month === sl.month && p.day === sl.day) ?? null)
      : null;

  // The table covers 2026 only; before 2026 count down to Duruthu,
  // after Unduvap 2026 there is nothing to count to.
  let next: Poya | null = null;
  let daysUntil = 0;
  if (sl.year <= 2026) {
    for (const p of POYA_2026) {
      const poyaUTC = Date.UTC(2026, p.month, p.day);
      if (poyaUTC >= todayUTC) {
        next = p;
        daysUntil = Math.round((poyaUTC - todayUTC) / 86_400_000);
        break;
      }
    }
  }
  return { next, daysUntil, isPoyaToday: today !== null, today };
}

/**
 * Buddhist Era year increments at Vesak Poya (1 May in 2026).
 * For years outside the table, 1 May approximates the boundary.
 */
export function buddhistYear(sl: SLTime): number {
  const vesak = POYA_2026.find((p) => p.en === 'Vesak')!;
  const onOrAfterVesak =
    sl.month > vesak.month || (sl.month === vesak.month && sl.day >= vesak.day);
  return sl.year + (onOrAfterVesak ? 544 : 543);
}
