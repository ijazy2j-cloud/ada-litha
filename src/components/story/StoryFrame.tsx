import { forwardRef, type ReactNode } from 'react';
import type { SLTime } from '../../lib/slTime';
import { MONTHS_EN } from '../../lib/slTime';
import { Moon } from '../Moon';

/**
 * Shared 1080×1920 scaffold for the story cards: backdrop, sheet,
 * perforation, gold foot divider and the adalitha.lk wordmark.
 * Rendered off-screen; shareStoryCard() resets position on the clone.
 * No hairlines below 2px anywhere — they vanish under WhatsApp compression.
 */
export const StoryFrame = forwardRef<HTMLDivElement, { children: ReactNode }>(
  function StoryFrame({ children }, ref) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="litha-backdrop"
        style={{
          position: 'fixed',
          left: '-3000px',
          top: 0,
          width: 1080,
          height: 1920,
          padding: 44,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <div
          className="litha-sheet-flat flex h-full w-full flex-col px-16 pb-16 text-center text-paper"
          style={{ borderRadius: 6 }}
        >
          <div className="litha-perforation -mx-16" style={{ transform: 'scaleY(1.6)' }} />
          {children}
          <footer className="mt-auto pt-10">
            <div className="mx-auto mb-9 flex max-w-[420px] items-center gap-6">
              <span className="h-[2px] flex-1 bg-gold/60" />
              <span className="block h-3.5 w-3.5 rotate-45 bg-gold" />
              <span className="h-[2px] flex-1 bg-gold/60" />
            </div>
            <p className="font-display text-[27px] font-semibold tracking-[0.42em] text-paper/75 uppercase">
              adalitha.lk
            </p>
          </footer>
        </div>
      </div>
    );
  },
);

/** Quiet date-and-moon corner row for the gatha and guidance cards. */
export function CornerDate({ sl, phase, cityEn }: { sl: SLTime; phase: number; cityEn: string }) {
  return (
    <div className="mt-12 flex items-start justify-between">
      <div className="text-left">
        <p className="font-sinhala text-[34px] leading-none text-paper/75">අද ලිත</p>
        <p className="mt-3 font-display text-[20px] font-semibold tracking-[0.34em] text-saffron uppercase">
          Ada Litha
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Moon phase={phase} size={120} />
        <p className="mt-3 font-mono text-[28px] text-paper/75">
          {sl.day} {MONTHS_EN[sl.month].slice(0, 3).toUpperCase()} ·{' '}
          {cityEn.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

/** Gold-diamond Poya line, shared by all cards on Poya days. */
export function PoyaLine({ si, en, size = 36 }: { si: string; en: string; size?: number }) {
  return (
    <p
      className="flex items-center justify-center gap-6 font-sinhala font-semibold whitespace-nowrap text-paper"
      style={{ fontSize: size }}
    >
      <span className="block h-3 w-3 rotate-45 bg-gold" />
      අද {si} පෝය · {en} Poya
      <span className="block h-3 w-3 rotate-45 bg-gold" />
    </p>
  );
}
