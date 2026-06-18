import { useId, useState } from 'react';
import type { GlossaryEntry } from '../data/glossary';

interface InfoHintProps {
  /** The plain explanation to reveal (Sinhala + English). */
  entry: GlossaryEntry;
  /** Plain-text term name, for the button's accessible label. */
  label: string;
  /** Which side to anchor the popover, to stay inside the sheet. */
  align?: 'center' | 'left' | 'right';
}

/**
 * A small "?" toggle that reveals a one-line plain explanation of a term, in
 * Sinhala and English. For interest only — it never tells the reader to act.
 */
export function InfoHint({ entry, label, align = 'center' }: InfoHintProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const pos =
    align === 'left'
      ? 'left-0'
      : align === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <span className="relative inline-block align-middle leading-none">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={open ? `Hide explanation of ${label}` : `Explain ${label}`}
        className="inline-flex h-[15px] w-[15px] items-center justify-center rounded-full border border-paper/30 text-[9px] font-semibold text-paper/60 transition-colors hover:border-paper/60 hover:text-paper/90"
      >
        ?
      </button>
      {open && (
        <span
          id={id}
          role="note"
          className={`absolute top-[calc(100%+6px)] z-20 block w-[210px] rounded-[2px] border border-paper/20 bg-maroon-deep px-3 py-2 text-left shadow-[0_8px_22px_rgba(0,0,0,0.55)] ${pos}`}
        >
          <span className="block font-sinhala text-[12px] leading-snug text-paper">{entry.si}</span>
          <span className="mt-1 block text-[11px] leading-snug text-paper/70">{entry.en}</span>
        </span>
      )}
    </span>
  );
}
