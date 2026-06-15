import { useState, type ReactNode } from 'react';

interface CollapsibleProps {
  ariaId: string;
  labelSi: string;
  labelEn: string;
  /** Small extra text in the header row (e.g. verse number). */
  meta?: ReactNode;
  /** Action rendered beside the header (outside the toggle button). */
  action?: ReactNode;
  /** Always-visible content; receives open state so it can unclamp. */
  preview: (open: boolean) => ReactNode;
  /** Revealed on expand with a smooth height transition. */
  detail: ReactNode;
}

/**
 * Section that shows a 2-line preview and expands on tap.
 * Height animates via grid-template-rows (no measuring); the global
 * prefers-reduced-motion rule collapses the transition to instant.
 */
export function Collapsible({
  ariaId,
  labelSi,
  labelEn,
  meta,
  action,
  preview,
  detail,
}: CollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <section aria-labelledby={ariaId}>
      <div className="flex items-baseline justify-between gap-2.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex flex-1 items-baseline justify-between gap-3 text-left"
        >
          <h2
            id={ariaId}
            className="font-sinhala text-[15px] font-medium whitespace-nowrap text-paper"
          >
            {labelSi}
          </h2>
          <span className="flex shrink-0 items-baseline gap-2.5">
            {meta}
            <span className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
              {labelEn}
            </span>
            <span
              aria-hidden="true"
              className={`inline-block text-[8px] text-paper/60 transition-transform duration-200 ease-out ${
                open ? 'rotate-180' : ''
              }`}
            >
              ▼
            </span>
          </span>
        </button>
        {action}
      </div>
      <div className="mt-3">{preview(open)}</div>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden" aria-hidden={!open}>
          {detail}
        </div>
      </div>
    </section>
  );
}
