import { forwardRef } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import { MONTHS_EN, WEEKDAYS_EN, WEEKDAYS_SI, WEEKDAYS_TA } from '../../lib/slTime';
import { moonIllumination, moonPhaseName } from '../../lib/moon';
import { GUIDANCE } from '../../data/guidance';
import { formatDuration, formatTime, formatTimeRange } from '../../lib/format';
import { StoryFrame, CornerDate, PoyaLine } from './StoryFrame';

/**
 * Card 1 — the complete bilingual litha of the day.
 * Sinhala is the hero line of every item; small English sits beneath.
 * The proverb is compressed to a single italic footer line.
 */
export const StoryCardFull = forwardRef<HTMLDivElement, { data: AlmanacData }>(
  function StoryCardFull({ data }, ref) {
    const { sl, sun, rahu, phase, poya, beYear, proverb, gatha, city } = data;
    const phaseName = moonPhaseName(phase);
    const illum = Math.round(moonIllumination(phase) * 100);
    const g = GUIDANCE[sl.weekday];

    const sun3 = [
      { si: 'ඉර උදාව', en: 'Sunrise', t: formatTime(sun.sunrise) },
      { si: 'ඉර බැසීම', en: 'Sunset', t: formatTime(sun.sunset) },
      { si: 'දවසේ දිග', en: 'Day length', t: formatDuration(sun.dayLength) },
    ];

    return (
      <StoryFrame ref={ref}>
        <CornerDate sl={sl} phase={phase} cityEn={city.en} />

        {/* date — weekday is the Sinhala hero */}
        <div className="mt-12">
          <p className="font-sinhala text-[42px] leading-tight font-medium text-paper">
            {WEEKDAYS_SI[sl.weekday]}
          </p>
          <p className="mt-2 text-[21px] text-paper/70">
            <span className="font-display tracking-[0.16em] uppercase">
              {WEEKDAYS_EN[sl.weekday]}
            </span>{' '}
            · <span className="font-tamil">{WEEKDAYS_TA[sl.weekday]}</span> · {sl.day}{' '}
            {MONTHS_EN[sl.month]} {sl.year} · බුද්ධ වර්ෂ {beYear}
          </p>
        </div>

        {/* moon phase */}
        <div className="mt-9">
          <p className="font-sinhala text-[34px] leading-tight text-paper">{phaseName.si}</p>
          <p className="mt-1.5 text-[20px] text-paper/70">
            <span className="font-display tracking-[0.12em] uppercase">{phaseName.en}</span> ·{' '}
            {illum}% illuminated
          </p>
        </div>

        {/* next Poya */}
        <div className="mt-9">
          {poya.isPoyaToday && poya.today ? (
            <PoyaLine si={poya.today.si} en={poya.today.en} size={34} />
          ) : poya.next ? (
            <>
              <p className="font-sinhala text-[34px] leading-tight text-paper">
                {poya.daysUntil === 1
                  ? `හෙට ${poya.next.si} පෝය`
                  : `${poya.next.si} පෝයට තව දින ${poya.daysUntil}`}
              </p>
              <p className="mt-1.5 text-[20px] text-paper/70">
                <span className="font-display font-semibold tracking-[0.1em] uppercase">
                  {poya.next.en} Poya
                </span>{' '}
                · {poya.daysUntil === 1 ? 'tomorrow' : `in ${poya.daysUntil} days`}
              </p>
            </>
          ) : null}
        </div>

        {/* Rahu Kalaya — solid blocks only, nothing that melts in compression */}
        <div className="mx-auto mt-10 w-full max-w-[840px]">
          <div className="flex items-end justify-between">
            <div className="text-left">
              <p className="font-sinhala text-[32px] leading-none text-paper">රාහු කාලය</p>
              <p className="mt-2 font-display text-[18px] font-semibold tracking-[0.14em] text-paper/70 uppercase">
                Rahu Kalaya · {city.en}
              </p>
            </div>
            <p className="font-mono text-[40px] leading-none font-medium text-paper">
              {formatTimeRange(rahu.start, rahu.end)}
            </p>
          </div>
          <div className="mt-5 flex h-4 gap-2.5">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className={`flex-1 rounded-[3px] ${
                  i + 1 === rahu.segment ? 'bg-rahu' : 'bg-paper/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* sun */}
        <div className="mx-auto mt-9 grid w-full max-w-[840px] grid-cols-3">
          {sun3.map((s) => (
            <div key={s.en}>
              <p className="font-sinhala text-[22px] leading-none text-paper/80">{s.si}</p>
              <p className="mt-1.5 font-display text-[15px] tracking-[0.12em] text-paper/60 uppercase">
                {s.en}
              </p>
              <p className="mt-2 font-mono text-[30px] font-medium text-paper">{s.t}</p>
            </div>
          ))}
        </div>

        {/* gold rule — almanac above, Dhamma & guidance below */}
        <div className="mx-auto mt-11 flex max-w-[560px] items-center gap-6" aria-hidden="true">
          <span className="h-[2px] flex-1 bg-gold/55" />
          <span className="block h-3 w-3 rotate-45 bg-gold" />
          <span className="h-[2px] flex-1 bg-gold/55" />
        </div>

        {/* gatha */}
        <div className="mx-auto mt-10 max-w-[860px]">
          <p className="font-display text-[19px] font-semibold tracking-[0.3em] text-saffron uppercase">
            අද ගාථාව · Today's Gatha
          </p>
          <p className="mt-5 font-sinhala text-[30px] leading-snug text-paper">{gatha.si}</p>
          <p className="mt-3.5 text-[19px] leading-snug text-paper/70 italic">
            {gatha.en}
            <span className="not-italic"> — Dhp {gatha.n}</span>
          </p>
        </div>

        {/* guidance */}
        <div className="mx-auto mt-10 max-w-[860px]">
          <p className="font-display text-[19px] font-semibold tracking-[0.3em] text-saffron uppercase">
            සුබ අසුබ · Today's Guidance
          </p>
          <div className="mt-5">
            <p className="font-sinhala text-[27px] leading-snug text-paper">{g.goodForSi}</p>
            <p className="mt-1.5 text-[17px] leading-snug text-paper/65">Good for — {g.goodFor}</p>
          </div>
          <div className="mt-5">
            <p className="font-sinhala text-[27px] leading-snug text-paper">{g.avoidSi}</p>
            <p className="mt-1.5 text-[17px] leading-snug text-paper/65">
              Better avoided — {g.avoid}
            </p>
          </div>
          <p className="mt-5 text-[22px] text-paper/80">
            <span className="font-sinhala">අද වර්ණය — {g.colourSi}</span>
            <span className="text-[17px] text-paper/60"> · Day colour — {g.colour}</span>
          </p>
        </div>

        {/* proverb — a single italic footer line, not a block */}
        <p className="mx-auto mt-10 max-w-[820px] text-[22px] leading-snug text-paper/70 italic">
          “{proverb.en}”
        </p>
      </StoryFrame>
    );
  },
);
