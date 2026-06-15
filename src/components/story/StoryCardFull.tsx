import { forwardRef } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import { MONTHS_EN, MONTHS_SI, WEEKDAYS_EN, WEEKDAYS_SI, WEEKDAYS_TA } from '../../lib/slTime';
import { moonIllumination, moonPhaseName } from '../../lib/moon';
import { formatDuration, formatTime, formatTimeRange } from '../../lib/format';
import { Moon } from '../Moon';
import { StoryFrame, PoyaLine } from './StoryFrame';

/** Card 1 — the full litha of the day. */
export const StoryCardFull = forwardRef<HTMLDivElement, { data: AlmanacData }>(
  function StoryCardFull({ data }, ref) {
    const { sl, sun, rahu, phase, poya, beYear, proverb, gatha, city } = data;
    const phaseName = moonPhaseName(phase);
    const illum = Math.round(moonIllumination(phase) * 100);
    // Gatha or proverb, whichever card form is shorter — never both.
    const useGatha = gatha.si.length <= proverb.si.length + proverb.en.length;

    return (
      <StoryFrame ref={ref}>
        <header className="mt-12">
          <h1 className="flex items-center justify-center gap-7 font-sinhala text-[54px] leading-none font-semibold text-paper">
            <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
            අද ලිත
            <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
          </h1>
          <p className="mt-5 font-display text-[21px] font-semibold tracking-[0.5em] text-saffron uppercase">
            Today's Almanac
          </p>
        </header>

        <p className="mt-12 text-[30px] tracking-[0.24em] text-paper/75 uppercase">
          <span className="font-sinhala">{MONTHS_SI[sl.month]}</span>
          <span className="font-display font-medium"> · {MONTHS_EN[sl.month]} {sl.year}</span>
        </p>
        <div className="mt-1 flex items-center justify-center gap-14">
          <span className="font-display text-[300px] leading-[0.9] font-bold text-gold">
            {sl.day}
          </span>
          <div className="flex flex-col items-center">
            <Moon phase={phase} size={260} />
            <p className="mt-4 font-sinhala text-[30px] text-paper/80">{phaseName.si}</p>
            <p className="font-display text-[22px] tracking-[0.14em] text-paper/75 uppercase">
              {phaseName.en} · {illum}%
            </p>
          </div>
        </div>
        <p className="mt-6 font-sinhala text-[50px] leading-tight font-medium text-paper">
          {WEEKDAYS_SI[sl.weekday]}
        </p>
        <p className="mt-2 text-[29px] text-paper/75">
          <span className="font-tamil">{WEEKDAYS_TA[sl.weekday]}</span>
          <span className="font-display tracking-[0.22em] uppercase">
            {' '}· {WEEKDAYS_EN[sl.weekday]}
          </span>
        </p>
        <p className="mt-5 font-mono text-[26px] text-paper/75">බුද්ධ වර්ෂ {beYear}</p>

        <div className="mt-10">
          {poya.isPoyaToday && poya.today ? (
            <PoyaLine si={poya.today.si} en={poya.today.en} />
          ) : poya.next ? (
            <p className="text-[30px] text-paper/80">
              <span className="font-sinhala">ඊළඟ පෝය</span>
              <span className="mx-4 inline-block h-2.5 w-2.5 rotate-45 bg-gold align-middle" />
              <span className="font-sinhala font-semibold text-paper">{poya.next.si}</span>{' '}
              <span className="font-display font-semibold text-paper">{poya.next.en}</span> · in{' '}
              {poya.daysUntil} {poya.daysUntil === 1 ? 'day' : 'days'}
            </p>
          ) : null}
        </div>

        {/* rahu + sun — solid blocks only, nothing that melts in compression */}
        <div className="mx-auto mt-12 w-full max-w-[840px]">
          <div className="flex items-baseline justify-between">
            <p className="font-display text-[22px] font-semibold tracking-[0.22em] text-saffron uppercase">
              <span className="font-sinhala normal-case tracking-normal">රාහු කාලය</span> ·{' '}
              {city.en}
            </p>
            <p className="font-mono text-[42px] font-medium text-paper">
              {formatTimeRange(rahu.start, rahu.end)}
            </p>
          </div>
          <div className="mt-6 flex h-6 gap-2.5">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className={`flex-1 rounded-[3px] ${
                  i + 1 === rahu.segment ? 'bg-rahu' : 'bg-paper/15'
                }`}
              />
            ))}
          </div>
          <div className="mt-9 flex justify-between text-[29px]">
            <p>
              <span className="text-paper/75">Sunrise </span>
              <span className="font-mono font-medium text-paper">{formatTime(sun.sunrise)}</span>
            </p>
            <p>
              <span className="text-paper/75">Sunset </span>
              <span className="font-mono font-medium text-paper">{formatTime(sun.sunset)}</span>
            </p>
            <p>
              <span className="text-paper/75">Day </span>
              <span className="font-mono font-medium text-paper">
                {formatDuration(sun.dayLength)}
              </span>
            </p>
          </div>
        </div>

        {/* verse */}
        <div className="mx-auto mt-14 max-w-[860px]">
          {useGatha ? (
            <>
              <p className="font-display text-[21px] font-semibold tracking-[0.3em] text-saffron uppercase">
                අද ගාථාව · Today's Gatha
              </p>
              <p className="mt-7 font-sinhala text-[40px] leading-snug text-paper">{gatha.si}</p>
              <p className="mt-6 font-mono text-[26px] text-paper/75">— Dhammapada {gatha.n} —</p>
            </>
          ) : (
            <>
              <p className="font-display text-[21px] font-semibold tracking-[0.3em] text-saffron uppercase">
                අද කියමන · Proverb of the day
              </p>
              <p className="mt-7 font-sinhala text-[40px] leading-snug text-paper">
                “{proverb.si}”
              </p>
              <p className="mt-6 text-[28px] leading-snug text-paper/75 italic">{proverb.en}</p>
            </>
          )}
        </div>
      </StoryFrame>
    );
  },
);
