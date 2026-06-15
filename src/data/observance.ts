export interface Observance {
  /** Two-sentence reflection on what this Poya commemorates. */
  reflection: string;
  /** Sil observance reminder. */
  sil: string;
}

const SIL_LINE =
  'අද සිල් සමාදන් වීමට සුදුසු දිනයකි — a day for sil: the eight precepts, white dress, time at the temple.';

// Keyed by the English Poya name used in the 2026 table.
export const OBSERVANCES: Record<string, Observance> = {
  Duruthu: {
    reflection:
      "Marks the Buddha's first visit to Lanka, to Mahiyangana, nine months after enlightenment. The Duruthu perahera at Kelaniya honours that visit.",
    sil: SIL_LINE,
  },
  Navam: {
    reflection:
      'Marks the appointment of Sāriputta and Moggallāna as chief disciples, and the first great assembly of the Sangha.',
    sil: SIL_LINE,
  },
  Madin: {
    reflection:
      "Marks the Buddha's first return to Kapilavatthu, the city of his family. A day for honouring parents and home.",
    sil: SIL_LINE,
  },
  Bak: {
    reflection:
      "Marks the Buddha's second visit to Lanka, to Nāgadīpa, reconciling two Nāga kings at the point of war. A day for making peace.",
    sil: SIL_LINE,
  },
  Vesak: {
    reflection:
      'Marks the birth, enlightenment and parinibbāna of the Buddha. The island lights lanterns, and dansal offer food and drink to all.',
    sil: SIL_LINE,
  },
  'Adhi Vesak': {
    reflection:
      'The intercalary full moon of the leap month — a second, quieter Vesak. An extra day for reflection and merit.',
    sil: SIL_LINE,
  },
  Poson: {
    reflection:
      'Marks Arahant Mahinda meeting King Devanampiyatissa at Mihintale, bringing the Dhamma to Lanka. Pilgrims climb Mihintale in white.',
    sil: SIL_LINE,
  },
  Esala: {
    reflection:
      "Marks the Buddha's first sermon at Isipatana, setting the wheel of Dhamma in motion. The Kandy Esala perahera honours the Sacred Tooth Relic.",
    sil: SIL_LINE,
  },
  Nikini: {
    reflection:
      'Recalls the first Dhamma council at Rājagaha, and the late beginning of the Vas rains retreat. A day of discipline and retreat.',
    sil: SIL_LINE,
  },
  Binara: {
    reflection:
      'Marks the founding of the Bhikkhunī order of nuns. A day honouring the women of the Sangha.',
    sil: SIL_LINE,
  },
  Vap: {
    reflection:
      "Marks the close of the Vas retreat and the Buddha's return from the Tāvatiṁsa heaven. The Katina robe-offering season begins.",
    sil: SIL_LINE,
  },
  Il: {
    reflection:
      'Marks the sending forth of the first sixty arahants to carry the Dhamma in every direction. A day for spreading goodness outward.',
    sil: SIL_LINE,
  },
  Unduvap: {
    reflection:
      'Marks Saṅghamittā Therī arriving with the sacred Bo sapling, mother of the Sri Maha Bodhi at Anuradhapura. A day honouring the great tree.',
    sil: SIL_LINE,
  },
};
