import type { SunTimes } from '../lib/solar';
import { getRahuStatus, type RahuWindow } from '../lib/rahu';
import { formatCountdown, formatTime } from '../lib/format';
import { GLOSSARY } from '../data/glossary';
import { InfoHint } from './InfoHint';

interface RahuPanelProps {
  window: RahuWindow;
  sun: SunTimes;
  minutesOfDay: number;
  cityEn: string;
}

export function RahuPanel({ window, sun, minutesOfDay, cityEn }: RahuPanelProps) {
  const status = getRahuStatus(window, minutesOfDay);
  const dayFrac = Math.min(1, Math.max(0, (minutesOfDay - sun.sunrise) / sun.dayLength));
  const sunIsUp = minutesOfDay >= sun.sunrise && minutesOfDay <= sun.sunset;

  return (
    <section aria-labelledby="rahu-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="rahu-heading" className="flex items-center gap-1.5 font-sinhala text-[15px] font-medium text-paper">
          රාහු කාලය
          <InfoHint entry={GLOSSARY.rahu} label="Rahu Kalaya" align="left" />
        </h2>
        <p className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
          Rahu Kalaya · {cityEn}
        </p>
      </div>

      <p className="mt-2.5 font-mono text-xl font-medium text-paper">
        <time>{formatTime(window.start)}</time>
        <span className="mx-2 text-paper/50">–</span>
        <time>{formatTime(window.end)}</time>
      </p>

      {/* daylight split into 8 equal segments */}
      <div
        className="relative mt-4"
        role="img"
        aria-label={`Daylight timeline: Rahu Kalaya is segment ${window.segment} of 8, from ${formatTime(window.start)} to ${formatTime(window.end)}`}
      >
        <div className="flex h-2 gap-[3px]">
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className={`flex-1 rounded-[1px] ${
                i + 1 === window.segment
                  ? 'bg-rahu shadow-[0_0_0_1px_rgba(245,233,208,0.35)]'
                  : 'bg-paper/12'
              }`}
            />
          ))}
        </div>
        {sunIsUp && (
          <span
            className="absolute -top-1.5 h-5 w-px -translate-x-1/2 bg-paper"
            style={{ left: `${dayFrac * 100}%` }}
            aria-hidden="true"
          >
            <span className="absolute -top-[5px] left-1/2 block h-[5px] w-[5px] -translate-x-1/2 rotate-45 bg-paper" />
          </span>
        )}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] text-paper/60">
        <span>{formatTime(sun.sunrise)}</span>
        <span>{formatTime(sun.sunset)}</span>
      </div>

      <p className="mt-3 flex items-center gap-2.5 text-[13px] text-paper" role="status">
        {status.kind === 'running' && (
          <>
            <span className="litha-live-dot block h-2 w-2 rounded-full bg-rahu" aria-hidden="true" />
            <span className="font-medium">
              Running now · ends in {formatCountdown(status.minutesLeft)}
            </span>
          </>
        )}
        {status.kind === 'upcoming' && (
          <>
            <span className="block h-2 w-2 rounded-full border border-paper/50" aria-hidden="true" />
            <span className="text-paper/80">
              Starts at <span className="font-mono text-paper">{formatTime(window.start)}</span> ·
              in {formatCountdown(status.minutesUntil)}
            </span>
          </>
        )}
        {status.kind === 'over' && (
          <>
            <span className="block h-2 w-2 rounded-full bg-moss" aria-hidden="true" />
            <span className="text-paper/80">Over for today</span>
          </>
        )}
      </p>
    </section>
  );
}
