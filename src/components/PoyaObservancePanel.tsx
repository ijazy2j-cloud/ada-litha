import type { Poya } from '../lib/poya';
import { OBSERVANCES } from '../data/observance';
import { Collapsible } from './Collapsible';

/** Poya-day reflection and sil reminder. Rendered on Poya days only. */
export function PoyaObservancePanel({ poya }: { poya: Poya }) {
  const observance = OBSERVANCES[poya.en];
  if (!observance) return null;

  return (
    <Collapsible
      ariaId="observance-heading"
      labelSi="පෝය වැඩසටහන"
      labelEn="Poya Observance"
      meta={<span className="font-sinhala text-[11px] text-paper/60">{poya.si} පෝය</span>}
      preview={(open) => (
        <p className={`text-[13px] leading-snug text-paper/80 ${open ? '' : 'line-clamp-2'}`}>
          {observance.reflection}
        </p>
      )}
      detail={
        <p className="mt-2.5 text-[13px] leading-snug text-paper">
          <span className="font-sinhala">{observance.sil.split(' — ')[0]}</span>
          <span className="text-paper/70"> — {observance.sil.split(' — ')[1]}</span>
        </p>
      }
    />
  );
}
