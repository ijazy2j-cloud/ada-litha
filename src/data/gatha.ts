import verses from './gatha.json';

export interface Gatha {
  /** Dhammapada verse number, e.g. 25 → "Dhp 25". */
  n: number;
  pali: string;
  si: string;
  en: string;
}

// Dhp 1–59 (Yamaka, Appamāda, Citta, Pupphavagga) plus Dhp 60 (Bālavagga)
// to round out sixty. Public-domain text, romanised Pali.
export const GATHAS: Gatha[] = verses;

export function gathaOfTheDay(dayOfYear: number): Gatha {
  return GATHAS[dayOfYear % GATHAS.length];
}
