import { useRef } from 'react';
import type { AlmanacData } from '../lib/almanac';
import { shareStoryCard } from '../lib/shareStory';
import { Collapsible } from './Collapsible';
import { ShareIconButton } from './ShareIconButton';
import { StoryCardGatha } from './story/StoryCardGatha';

/** Daily Dhammapada verse: Pali small caps over Sinhala; English on tap. */
export function GathaPanel({ data }: { data: AlmanacData }) {
  const { gatha } = data;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Collapsible
        ariaId="gatha-heading"
        labelSi="අද ගාථාව"
        labelEn="Today's Gatha"
        meta={<span className="font-mono text-[10px] text-paper/60">Dhp {gatha.n}</span>}
        action={
          <ShareIconButton
            label="Share the gatha card"
            onShare={async () => {
              if (cardRef.current) await shareStoryCard(cardRef.current, 'gatha', data.sl);
            }}
          />
        }
        preview={(open) => (
          <>
            <p
              lang="pi"
              style={{ fontVariant: 'small-caps' }}
              className={`text-[11px] leading-relaxed tracking-[0.04em] text-paper/70 ${
                open ? '' : 'line-clamp-1'
              }`}
            >
              {gatha.pali}
            </p>
            <p
              className={`mt-1.5 font-sinhala text-[15px] leading-relaxed text-paper ${
                open ? '' : 'line-clamp-1'
              }`}
            >
              {gatha.si}
            </p>
          </>
        )}
        detail={
          <p className="mt-2.5 text-[13px] leading-snug text-paper/70 italic">
            {gatha.en}
            <span className="not-italic text-paper/60"> — Dhammapada {gatha.n}</span>
          </p>
        }
      />
      <StoryCardGatha ref={cardRef} data={data} />
    </>
  );
}
