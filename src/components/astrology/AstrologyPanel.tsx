import { useRef, useState } from 'react';
import type { AlmanacData } from '../../lib/almanac';
import { shareStoryCard } from '../../lib/shareStory';
import type { AstroChart, BirthInput } from '../../lib/astrology';
import { AstrologyForm } from './AstrologyForm';
import { AstrologyResult } from './AstrologyResult';
import { StoryCardAstrology } from '../story/StoryCardAstrology';

interface AstrologyPanelProps {
  data: AlmanacData;
  chart: AstroChart | null;
  submit: (input: BirthInput) => void;
}

/** Astrology tab: a one-time birth form, then the stored star/colour card. */
export function AstrologyPanel({ data, chart, submit }: AstrologyPanelProps) {
  const [editing, setEditing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleSubmit(input: BirthInput) {
    submit(input);
    setEditing(false);
  }

  // No details yet, or actively editing → show only the inviting form.
  if (!chart || editing) {
    return (
      <AstrologyForm
        initial={chart?.input}
        onSubmit={handleSubmit}
        onCancel={chart ? () => setEditing(false) : undefined}
      />
    );
  }

  return (
    <>
      <AstrologyResult
        chart={chart}
        weekday={data.sl.weekday}
        onEdit={() => setEditing(true)}
        onShare={async () => {
          if (cardRef.current) await shareStoryCard(cardRef.current, 'star', data.sl);
        }}
      />
      <StoryCardAstrology ref={cardRef} data={data} chart={chart} />
    </>
  );
}
