import type { AstroChart } from '../../lib/astrology';
import { getTodayTara } from '../../lib/tara';
import { TARA_QUALITY_LABEL } from '../../data/tara';
import { weekdayColour } from '../../data/grahas';
import { NAKSHATRA_TRAITS } from '../../data/nakshatraTraits';
import { GLOSSARY } from '../../data/glossary';
import { Divider } from '../Divider';
import { ShareIconButton } from '../ShareIconButton';
import { InfoHint } from '../InfoHint';

function ColourChip({ hex, en, si }: { hex: string; en: string; si: string }) {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="block h-4 w-4 rounded-[2px] ring-1 ring-paper/25"
        style={{ backgroundColor: hex }}
      />
      <span>
        <span className="block font-sinhala text-[15px] leading-none text-paper">{si}</span>
        <span className="block text-[10px] tracking-[0.04em] text-paper/60 capitalize">{en}</span>
      </span>
    </span>
  );
}

interface AstrologyResultProps {
  chart: AstroChart;
  weekday: number;
  onEdit: () => void;
  onShare: () => Promise<void>;
}

export function AstrologyResult({ chart, weekday, onEdit, onShare }: AstrologyResultProps) {
  const day = weekdayColour(weekday);
  const star = chart.nakshatra;
  const matches = star.luckyColour.en === day.en;
  const traits = NAKSHATRA_TRAITS[star.num] ?? [];

  const { tara } = getTodayTara(star.num);
  const quality = TARA_QUALITY_LABEL[tara.quality];
  const qualityClass =
    tara.quality === 'favourable'
      ? 'text-moss'
      : tara.quality === 'less-favourable'
        ? 'text-rahu'
        : 'text-paper/75';

  return (
    <section aria-labelledby="astro-result-heading">
      <div className="flex items-baseline justify-between">
        <p
          id="astro-result-heading"
          className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase"
        >
          Per Sinhala astrological tradition
        </p>
        <ShareIconButton label="Share your star card" onShare={onShare} />
      </div>

      {/* nakshatra + rashi */}
      <div className="mt-5 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="flex items-center justify-center gap-1.5 font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
            නැකත · Birth star
            <InfoHint entry={GLOSSARY.birthStar} label="birth star" align="left" />
          </p>
          <p className="mt-2 font-sinhala text-[22px] leading-tight font-medium text-paper">
            {star.si}
          </p>
          <p className="mt-0.5 text-[12px] text-paper/70">
            <span className="font-display tracking-[0.06em]">{star.en}</span> · pada {star.pada}
          </p>
        </div>
        <div>
          <p className="flex items-center justify-center gap-1.5 font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
            රාශිය · Moon sign
            <InfoHint entry={GLOSSARY.moonSign} label="moon sign" align="right" />
          </p>
          <p className="mt-2 font-sinhala text-[22px] leading-tight font-medium text-paper">
            {chart.rashi.si}
          </p>
          <p className="mt-0.5 text-[12px] text-paper/70">
            <span className="font-display tracking-[0.06em]">{chart.rashi.en}</span>
          </p>
        </div>
      </div>

      <Divider className="my-7" />

      {/* colours */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="flex items-center gap-1.5 font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
            ඔබේ වර්ණය අද · Your colour
            <InfoHint entry={GLOSSARY.luckyColour} label="lucky colour" align="left" />
          </p>
          <div className="mt-2.5">
            <ColourChip
              hex={star.lord.colourHex}
              en={star.luckyColour.en}
              si={star.luckyColour.si}
            />
          </div>
        </div>
        <div>
          <p className="font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
            අද දිනයේ වර්ණය · Day's colour
          </p>
          <div className="mt-2.5">
            <ColourChip hex={day.graha.colourHex} en={day.en} si={day.si} />
          </div>
        </div>
      </div>

      {matches && (
        <p className="mt-4 flex items-center justify-center gap-2.5 text-[12px] text-paper">
          <span className="block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
          <span className="font-sinhala">අද ඔබේ නැකතේ වර්ණයයි</span>
          <span className="text-paper/70">· today aligns with your star</span>
          <span className="block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
        </p>
      )}

      <Divider className="my-7" />

      {/* today's Tara Bala — standing only, no instructions */}
      <div className="text-center">
        <p className="flex items-center justify-center gap-1.5 font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
          අද තාරා බල · Today's Tara Bala
          <InfoHint entry={GLOSSARY.taraBala} label="Tara Bala" align="center" />
        </p>
        <p className="mt-2.5 font-sinhala text-[20px] leading-tight font-medium text-paper">
          {tara.si}
        </p>
        <p className="mt-0.5 text-[12px] text-paper/70">
          <span className="font-display tracking-[0.06em]">{tara.en}</span> ·{' '}
          <span className={qualityClass}>
            <span className="font-sinhala">{quality.si}</span> · {quality.en}
          </span>
        </p>
        <p className="mx-auto mt-2 max-w-[34ch] text-[12px] leading-snug text-paper/65">
          <span className="font-sinhala">{tara.meaningSi}</span> · {tara.meaningEn}
        </p>
        <p className="mt-2 text-[10px] text-paper/50">
          Traditional standing for today — for interest, not advice.
        </p>
      </div>

      <Divider className="my-7" />

      {/* traits */}
      <div className="text-center">
        <p className="font-display text-[9px] font-semibold tracking-[0.2em] text-saffron uppercase">
          නැකතේ ගුණ · Star traits
        </p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {traits.map((t) => (
            <li key={t.en} className="text-center">
              <span className="block font-sinhala text-[16px] leading-tight text-paper">{t.si}</span>
              <span className="block text-[11px] text-paper/60 capitalize">{t.en}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 text-center">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-[1px] border border-paper/30 px-4 py-2 font-display text-[12px] font-medium tracking-wide text-paper/80 transition duration-150 ease-out hover:bg-paper/10 active:scale-[0.98]"
        >
          Edit details
        </button>
      </div>

      <p className="mt-5 text-center text-[10px] leading-relaxed text-paper/55">
        Computed once from your birth moment using the Lahiri ayanamsa. Sinhala astrological
        tradition, shared for interest — not prediction, and not advice.
      </p>
    </section>
  );
}
