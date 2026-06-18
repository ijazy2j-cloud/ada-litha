import { FOR_TODAY } from '../data/forToday';
import { TARA_QUALITY_LABEL } from '../data/tara';
import { getTodayTara } from '../lib/tara';
import type { AstroChart } from '../lib/astrology';

interface ForTodayPanelProps {
  weekday: number;
  /** If a birth star is on file, the day's Tara adds a gentle overall tone. */
  chart?: AstroChart | null;
}

function ActivityList({
  items,
  accent,
}: {
  items: { si: string; en: string }[];
  accent: string;
}) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((a) => (
        <li key={a.en} className="flex items-baseline gap-2">
          <span
            className={`mt-1.5 block h-1 w-1 shrink-0 rotate-45 ${accent}`}
            aria-hidden="true"
          />
          <span className="leading-snug">
            <span className="font-sinhala text-[14px] text-paper">{a.si}</span>
            <span className="text-[12px] text-paper/60"> · {a.en}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * "අද දවසට · For Today" — day-level only. Lists what the day is *traditionally
 * considered* suited or less suited for, from a fixed weekday data file, with a
 * gentle Tara tone when a birth star is known. Never a personal instruction.
 */
export function ForTodayPanel({ weekday, chart }: ForTodayPanelProps) {
  const day = FOR_TODAY[weekday];

  // Optional, non-committal day tone from the day's Tara (needs a birth star).
  const taraTone = chart ? getTodayTara(chart.nakshatra.num).tara : null;
  const toneLabel = taraTone ? TARA_QUALITY_LABEL[taraTone.quality] : null;
  const toneEn =
    taraTone?.quality === 'favourable'
      ? 'leans favourable today'
      : taraTone?.quality === 'less-favourable'
        ? 'feels a little less favourable today'
        : 'feels mixed today';
  const toneSi =
    taraTone?.quality === 'favourable'
      ? 'අද පොදුවේ සුබ ලෙස දැනේ'
      : taraTone?.quality === 'less-favourable'
        ? 'අද තරමක් අඩු සුබ ලෙස දැනේ'
        : 'අද මිශ්‍ර ලෙස දැනේ';

  return (
    <section aria-labelledby="fortoday-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="fortoday-heading" className="font-sinhala text-[15px] font-medium text-paper">
          අද දවසට
        </h2>
        <p className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
          For Today · {day.rulerEn}
        </p>
      </div>

      <div className="mt-4">
        <p className="font-display text-[9px] font-semibold tracking-[0.16em] text-moss uppercase">
          <span className="font-sinhala normal-case tracking-normal">සම්ප්‍රදායෙන් සුදුසු යැයි සැලකේ</span>{' '}
          · Traditionally considered good for
        </p>
        <ActivityList items={day.suited} accent="bg-moss" />
      </div>

      {day.lessSuited.length > 0 && (
        <div className="mt-4">
          <p className="font-display text-[9px] font-semibold tracking-[0.16em] text-rahu uppercase">
            <span className="font-sinhala normal-case tracking-normal">අඩුවෙන් ගැළපේ</span> · Less
            suited for
          </p>
          <ActivityList items={day.lessSuited} accent="bg-rahu" />
        </div>
      )}

      {taraTone && toneLabel && (
        <p className="mt-4 flex items-center gap-2 text-[12px] text-paper/75">
          <span className="block h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
          <span>
            <span className="font-sinhala">අද තාරා බල {toneSi}</span>
            <span className="text-paper/60"> · Today's Tara {toneEn}</span>
          </span>
        </p>
      )}

      <p className="mt-4 text-[11px] leading-relaxed text-paper/55">
        <span className="font-sinhala">
          කාලයන් හා දවස්වල මේ සැලකිලි කුතුහලය සඳහා පමණි — තේරීම ඔබ සතුය.
        </span>{' '}
        Periods and days are for interest — the choice is yours.
      </p>
    </section>
  );
}
