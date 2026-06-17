import type { SunTimes } from '../lib/solar';
import { getDayPeriods, periodStatus } from '../lib/auspicious';
import { formatCountdown, formatTime, formatTimeRange } from '../lib/format';

interface AuspiciousPanelProps {
  weekday: number;
  sun: SunTimes;
  minutesOfDay: number;
  cityEn: string;
}

export function AuspiciousPanel({ weekday, sun, minutesOfDay, cityEn }: AuspiciousPanelProps) {
  const periods = getDayPeriods(weekday, sun.sunrise, sun.sunset);
  const dayFrac = Math.min(1, Math.max(0, (minutesOfDay - sun.sunrise) / sun.dayLength));
  const sunIsUp = minutesOfDay >= sun.sunrise && minutesOfDay <= sun.sunset;
  const pct = (t: number) => ((t - sun.sunrise) / sun.dayLength) * 100;

  // Listed below the timeline; Rahu has its own panel above, so this list adds
  // the remaining three. The timeline shows all four for the full-day picture.
  const listed = periods.filter((p) => p.id !== 'rahu');

  return (
    <section aria-labelledby="auspicious-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="auspicious-heading" className="font-sinhala text-[15px] font-medium text-paper">
          දවසේ වේලාවන්
        </h2>
        <p className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
          Day periods · {cityEn}
        </p>
      </div>

      {/* unified daylight timeline: bands + live now-marker */}
      <div
        className="relative mt-4"
        role="img"
        aria-label={`Daylight timeline from ${formatTime(sun.sunrise)} to ${formatTime(sun.sunset)} marking Rahu, Yamaganda, Gulika (inauspicious) and Abhijit (auspicious).`}
      >
        <div className="relative h-3 overflow-hidden rounded-[1px] bg-paper/10">
          {periods.map((p) => (
            <span
              key={p.id}
              className={`absolute top-0 h-full ${p.kind === 'auspicious' ? 'bg-moss' : 'bg-rahu'}`}
              style={{ left: `${pct(p.start)}%`, width: `${pct(p.end) - pct(p.start)}%` }}
            />
          ))}
        </div>
        {sunIsUp && (
          <span
            className="absolute -top-1.5 h-6 w-px -translate-x-1/2 bg-paper"
            style={{ left: `${dayFrac * 100}%` }}
            aria-hidden="true"
          >
            <span className="absolute -top-[5px] left-1/2 block h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-paper" />
          </span>
        )}
      </div>
      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-paper/60">
        <span>{formatTime(sun.sunrise)}</span>
        <span>{formatTime(sun.sunset)}</span>
      </div>

      {/* compact list of the added periods, with live status */}
      <ul className="mt-4 space-y-2.5">
        {listed.map((p) => {
          const status = periodStatus(p.start, p.end, minutesOfDay);
          const accent = p.kind === 'auspicious' ? 'text-moss' : 'text-rahu';
          return (
            <li key={p.id} className="flex items-baseline justify-between gap-3">
              <span className="flex items-baseline gap-2">
                <span
                  className={`block h-1.5 w-1.5 shrink-0 self-center rounded-[1px] ${p.kind === 'auspicious' ? 'bg-moss' : 'bg-rahu'}`}
                  aria-hidden="true"
                />
                <span>
                  <span className="font-sinhala text-[14px] text-paper">{p.labelSi}</span>
                  <span className="ml-2 font-display text-[9px] tracking-[0.14em] text-paper/55 uppercase">
                    {p.labelEn}
                  </span>
                </span>
              </span>
              <span className="text-right">
                <span className="font-mono text-[13px] text-paper">
                  {formatTimeRange(p.start, p.end)}
                </span>
                {status.kind === 'running' && (
                  <span className={`ml-2 text-[10px] font-medium ${accent}`}>
                    now · {formatCountdown(status.minutesLeft)} left
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-[10px] leading-relaxed text-paper/55">
        Per Sinhala astrological tradition. Rahu, Yamaganda and Gulika are held inauspicious (red);
        Abhijit, around midday, auspicious (green). Periods are for interest — yours to weigh.
      </p>
    </section>
  );
}
