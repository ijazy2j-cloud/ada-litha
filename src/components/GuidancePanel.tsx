import { useRef } from 'react';
import type { AlmanacData } from '../lib/almanac';
import { GUIDANCE } from '../data/guidance';
import { shareStoryCard } from '../lib/shareStory';
import { Collapsible } from './Collapsible';
import { ShareIconButton } from './ShareIconButton';
import { StoryCardGuidance } from './story/StoryCardGuidance';

/** Weekday guidance from the day's planetary ruler, per Sinhala tradition. */
export function GuidancePanel({ data }: { data: AlmanacData }) {
  const g = GUIDANCE[data.sl.weekday];
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Collapsible
        ariaId="guidance-heading"
        labelSi="සුබ අසුබ"
        labelEn="Today's Guidance"
        action={
          <ShareIconButton
            label="Share the guidance card"
            onShare={async () => {
              if (cardRef.current) await shareStoryCard(cardRef.current, 'guidance', data.sl);
            }}
          />
        }
        preview={(open) => (
          <>
            <p className="text-[9px] tracking-[0.18em] text-paper/60 uppercase">
              per Sinhala astrological tradition
            </p>
            <p
              className={`mt-2 text-[13px] leading-snug text-paper/80 ${open ? '' : 'line-clamp-1'}`}
            >
              <span className="text-paper">Good for</span> — {g.goodFor}
            </p>
            <p
              className={`mt-1 text-[13px] leading-snug text-paper/80 ${open ? '' : 'line-clamp-1'}`}
            >
              <span className="text-paper">Better avoided</span> — {g.avoid}
            </p>
          </>
        )}
        detail={
          <>
            <p className="mt-2.5 text-[13px] text-paper/80">
              Day of <span className="font-sinhala text-paper">{g.rulerSi}</span> ({g.rulerEn}) ·
              direction <span className="text-paper">{g.direction}</span> · colour{' '}
              <span className="text-paper">{g.colour}</span>
            </p>
            <p className="mt-2 text-[11px] leading-snug text-paper/60">
              Per Sinhala astrological tradition — offered in the spirit of the old litha, not as
              instruction.
            </p>
          </>
        }
      />
      <StoryCardGuidance ref={cardRef} data={data} />
    </>
  );
}
