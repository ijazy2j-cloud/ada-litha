import { forwardRef } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import type { AstroChart } from '../../lib/astrology';
import { weekdayColour } from '../../data/grahas';
import { NAKSHATRA_TRAITS } from '../../data/nakshatraTraits';
import { StoryFrame, CornerDate } from './StoryFrame';

function CardSwatch({ hex, en, si }: { hex: string; en: string; si: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="block h-16 w-16 rounded-[6px]"
        style={{ backgroundColor: hex, boxShadow: '0 0 0 3px rgba(245,233,208,0.25)' }}
      />
      <p className="mt-4 font-sinhala text-[34px] leading-none text-paper">{si}</p>
      <p className="mt-2 text-[24px] text-paper/70 capitalize">{en}</p>
    </div>
  );
}

/** Card 4 — the personal star and colour of the day. */
export const StoryCardAstrology = forwardRef<
  HTMLDivElement,
  { data: AlmanacData; chart: AstroChart }
>(function StoryCardAstrology({ data, chart }, ref) {
  const { sl, phase, city } = data;
  const day = weekdayColour(sl.weekday);
  const star = chart.nakshatra;
  const matches = star.luckyColour.en === day.en;
  const traits = (NAKSHATRA_TRAITS[star.num] ?? []).map((t) => t.en).join(' · ');

  return (
    <StoryFrame ref={ref}>
      <CornerDate sl={sl} phase={phase} cityEn={city.en} />

      <div className="my-auto py-10">
        <p className="font-display text-[22px] font-semibold tracking-[0.36em] text-saffron uppercase">
          Per Sinhala astrological tradition
        </p>

        {/* star + rashi */}
        <div className="mt-16 flex items-start justify-center gap-20">
          <div>
            <p className="font-display text-[20px] font-semibold tracking-[0.22em] text-saffron uppercase">
              නැකත · Birth star
            </p>
            <p className="mt-5 font-sinhala text-[58px] leading-none text-paper">{star.si}</p>
            <p className="mt-4 text-[28px] text-paper/70">
              {star.en} · pada {star.pada}
            </p>
          </div>
          <div>
            <p className="font-display text-[20px] font-semibold tracking-[0.22em] text-saffron uppercase">
              රාශිය · Moon sign
            </p>
            <p className="mt-5 font-sinhala text-[58px] leading-none text-paper">{chart.rashi.si}</p>
            <p className="mt-4 text-[28px] text-paper/70">{chart.rashi.en}</p>
          </div>
        </div>

        <p className="mt-12 text-[26px] text-paper/70 italic">{traits}</p>

        {/* gold rule */}
        <div className="mx-auto mt-14 flex max-w-[620px] items-center gap-6" aria-hidden="true">
          <span className="h-[2px] flex-1 bg-gold/55" />
          <span className="block h-3 w-3 rotate-45 bg-gold" />
          <span className="h-[2px] flex-1 bg-gold/55" />
        </div>

        {/* colours */}
        <div className="mt-14 flex items-start justify-center gap-24">
          <div>
            <p className="mb-6 font-display text-[19px] font-semibold tracking-[0.2em] text-saffron uppercase">
              Your colour
            </p>
            <CardSwatch hex={star.lord.colourHex} en={star.luckyColour.en} si={star.luckyColour.si} />
          </div>
          <div>
            <p className="mb-6 font-display text-[19px] font-semibold tracking-[0.2em] text-saffron uppercase">
              Day's colour
            </p>
            <CardSwatch hex={day.graha.colourHex} en={day.en} si={day.si} />
          </div>
        </div>

        {matches && (
          <p className="mt-14 flex items-center justify-center gap-6 font-sinhala text-[32px] font-medium text-paper">
            <span className="block h-3 w-3 rotate-45 bg-gold" />
            අද ඔබේ නැකතේ වර්ණයයි · today aligns with your star
            <span className="block h-3 w-3 rotate-45 bg-gold" />
          </p>
        )}
      </div>
    </StoryFrame>
  );
});
