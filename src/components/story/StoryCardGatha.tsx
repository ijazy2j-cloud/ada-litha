import { forwardRef } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import { StoryFrame, CornerDate, PoyaLine } from './StoryFrame';

/** Card 2 — the gatha as hero. Serene, devotional, fit for elders. */
export const StoryCardGatha = forwardRef<HTMLDivElement, { data: AlmanacData }>(
  function StoryCardGatha({ data }, ref) {
    const { sl, phase, poya, gatha, city } = data;

    return (
      <StoryFrame ref={ref}>
        <CornerDate sl={sl} phase={phase} cityEn={city.en} />

        <div className="my-auto py-16">
          {poya.isPoyaToday && poya.today && (
            <div className="mb-16">
              <PoyaLine si={poya.today.si} en={poya.today.en} size={34} />
            </div>
          )}

          <p className="font-display text-[24px] font-semibold tracking-[0.4em] text-saffron uppercase">
            අද ගාථාව · Today's Gatha
          </p>

          <p
            lang="pi"
            style={{ fontVariant: 'small-caps' }}
            className="mx-auto mt-20 max-w-[860px] text-[37px] leading-[1.7] tracking-[0.04em] text-paper/80"
          >
            {gatha.pali}
          </p>

          <p className="mx-auto mt-16 max-w-[880px] font-sinhala text-[52px] leading-[1.65] text-paper">
            {gatha.si}
          </p>

          <p className="mx-auto mt-14 max-w-[820px] text-[34px] leading-relaxed text-paper/75 italic">
            {gatha.en}
          </p>

          <p className="mt-16 font-mono text-[28px] text-paper/75">— Dhammapada {gatha.n} —</p>
        </div>
      </StoryFrame>
    );
  },
);
