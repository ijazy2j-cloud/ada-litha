import { forwardRef } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import { WEEKDAYS_EN, WEEKDAYS_SI } from '../../lib/slTime';
import { GUIDANCE } from '../../data/guidance';
import { StoryFrame, CornerDate, PoyaLine } from './StoryFrame';

/** Card 3 — the day's guidance in two quiet columns. */
export const StoryCardGuidance = forwardRef<HTMLDivElement, { data: AlmanacData }>(
  function StoryCardGuidance({ data }, ref) {
    const { sl, phase, poya, city } = data;
    const g = GUIDANCE[sl.weekday];
    const goodItems = g.goodFor.split(', ');
    const avoidItems = g.avoid.split(' and ');

    return (
      <StoryFrame ref={ref}>
        <CornerDate sl={sl} phase={phase} cityEn={city.en} />

        <div className="my-auto py-12">
          {poya.isPoyaToday && poya.today && (
            <div className="mb-14">
              <PoyaLine si={poya.today.si} en={poya.today.en} size={34} />
            </div>
          )}

          <p className="font-display text-[24px] font-semibold tracking-[0.4em] text-saffron uppercase">
            සුබ අසුබ · Today's Guidance
          </p>

          <p className="mt-14 font-sinhala text-[48px] leading-tight text-paper">
            {WEEKDAYS_SI[sl.weekday]}
          </p>
          <p className="mt-3 text-[31px] text-paper/75">
            <span className="font-display tracking-[0.2em] uppercase">
              {WEEKDAYS_EN[sl.weekday]}
            </span>{' '}
            · day of <span className="font-sinhala text-paper">{g.rulerSi}</span> — {g.rulerEn}
          </p>

          <div className="mx-auto mt-20 flex max-w-[900px] justify-center gap-14 text-left">
            <div className="flex-1">
              <p className="font-display text-[23px] font-semibold tracking-[0.26em] text-saffron uppercase">
                Good for
              </p>
              <ul className="mt-8 space-y-6">
                {goodItems.map((item) => (
                  <li key={item} className="text-[37px] leading-snug text-paper">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 self-stretch py-2">
              <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
              <span className="w-[2px] flex-1 bg-gold/50" />
              <span className="block h-2.5 w-2.5 rotate-45 bg-gold" />
            </div>
            <div className="flex-1">
              <p className="font-display text-[23px] font-semibold tracking-[0.26em] text-saffron uppercase">
                Better avoided
              </p>
              <ul className="mt-8 space-y-6">
                {avoidItems.map((item) => (
                  <li key={item} className="text-[37px] leading-snug text-paper">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-20 text-[34px] text-paper/80">
            direction <span className="text-paper">{g.direction}</span>
            <span className="mx-5 inline-block h-2.5 w-2.5 rotate-45 bg-gold align-middle" />
            colour <span className="text-paper">{g.colour}</span>
          </p>

          <p className="mt-12 text-[27px] tracking-[0.08em] text-paper/75">
            per Sinhala astrological tradition
          </p>
        </div>
      </StoryFrame>
    );
  },
);
