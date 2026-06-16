import { useRef, useState } from 'react';
import type { AlmanacData } from '../lib/almanac';
import { MONTHS_EN, WEEKDAYS_EN } from '../lib/slTime';
import { moonIllumination, moonPhaseName } from '../lib/moon';
import { formatDuration, formatTime } from '../lib/format';
import { shareStoryCard } from '../lib/shareStory';
import { StoryCardFull } from './story/StoryCardFull';

function buildSummary(data: AlmanacData): string {
  const { sl, sun, rahu, phase, poya, beYear, proverb, city } = data;
  const phaseName = moonPhaseName(phase);
  const illum = Math.round(moonIllumination(phase) * 100);
  const lines = [
    `අද ලිත · Ada Litha — ${WEEKDAYS_EN[sl.weekday]}, ${sl.day} ${MONTHS_EN[sl.month]} ${sl.year} (BE ${beYear})`,
    `🌙 ${phaseName.en} · ${illum}% lit`,
  ];
  if (poya.isPoyaToday && poya.today) {
    lines.push(`✨ Today is ${poya.today.en} Poya (${poya.today.si})`);
  } else if (poya.next) {
    lines.push(
      `Next Poya: ${poya.next.en} (${poya.next.si}) — ${MONTHS_EN[poya.next.month].slice(0, 3)} ${poya.next.day}, in ${poya.daysUntil} ${poya.daysUntil === 1 ? 'day' : 'days'}`,
    );
  }
  lines.push(
    `Rahu Kalaya (${city.en}): ${formatTime(rahu.start)} – ${formatTime(rahu.end)}`,
    `Sunrise ${formatTime(sun.sunrise)} · Sunset ${formatTime(sun.sunset)} · Day ${formatDuration(sun.dayLength)}`,
    `“${proverb.si}” — ${proverb.en}`,
    'adalitha.lk',
  );
  return lines.join('\n');
}

export function ShareBar({ data }: { data: AlmanacData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function copySummary() {
    setError(null);
    try {
      await navigator.clipboard.writeText(buildSummary(data));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Could not copy — your browser blocked clipboard access.');
    }
  }

  async function shareCard() {
    if (!cardRef.current || saving) return;
    setError(null);
    setSaving(true);
    try {
      await shareStoryCard(cardRef.current, 'full', data.sl);
    } catch {
      setError('Could not generate the image. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section aria-label="Share today's litha">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={copySummary}
          className="rounded-[1px] border border-paper/30 px-3 py-2.5 font-display text-[13px] font-medium tracking-wide text-paper transition duration-150 ease-out hover:border-paper/50 hover:bg-paper/10 active:scale-[0.98]"
        >
          {copied ? '✓ Copied' : 'Copy summary'}
        </button>
        <button
          type="button"
          onClick={shareCard}
          disabled={saving}
          className="rounded-[1px] border border-paper/30 px-3 py-2.5 font-display text-[13px] font-medium tracking-wide text-paper transition duration-150 ease-out hover:border-paper/50 hover:bg-paper/10 active:scale-[0.98] disabled:opacity-60"
        >
          {saving ? 'Rendering…' : 'Share story card'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-center text-xs text-paper/80" role="alert">
          {error}
        </p>
      )}
      <StoryCardFull ref={cardRef} data={data} />
    </section>
  );
}
