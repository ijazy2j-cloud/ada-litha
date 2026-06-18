import { useSLClock } from './hooks/useSLClock';
import { useCity } from './hooks/useCity';
import { useBirthChart } from './hooks/useBirthChart';
import { CITIES } from './data/cities';
import {
  MONTHS_EN,
  MONTHS_SI,
  WEEKDAYS_EN,
  WEEKDAYS_SI,
  WEEKDAYS_TA,
  SL_OFFSET_MS,
} from './lib/slTime';
import { getSunTimes } from './lib/solar';
import { getRahuKalaya } from './lib/rahu';
import { moonPhase, moonIllumination, moonPhaseName } from './lib/moon';
import { buddhistYear, getPoyaInfo } from './lib/poya';
import { proverbOfTheDay } from './data/proverbs';
import { gathaOfTheDay } from './data/gatha';
import { thisDayNote } from './data/thisDay';
import { formatDuration, formatTime, formatTimeRange } from './lib/format';
import type { AlmanacData } from './lib/almanac';
import { Divider } from './components/Divider';
import { Moon } from './components/Moon';
import { RahuPanel } from './components/RahuPanel';
import { AuspiciousPanel } from './components/AuspiciousPanel';
import { ShareBar } from './components/ShareBar';
import { GathaPanel } from './components/GathaPanel';
import { PoyaObservancePanel } from './components/PoyaObservancePanel';
import { AstrologyPanel } from './components/astrology/AstrologyPanel';
import { ForTodayPanel } from './components/ForTodayPanel';
import { DhammaWordPanel } from './components/DhammaWordPanel';
import { Tabs, type TabDef } from './components/Tabs';

export default function App() {
  const sl = useSLClock();
  const [city, setCity] = useCity();
  const birth = useBirthChart();
  const sun = getSunTimes(sl.dayOfYear, sl.year, city.lat, city.lon);
  const rahu = getRahuKalaya(sl.weekday, sun.sunrise, sun.sunset);
  // Phase is a property of the instant, not the calendar day — derive the
  // absolute time back from the SL wall clock.
  const phase = moonPhase(
    new Date(Date.UTC(sl.year, sl.month, sl.day, sl.hours, sl.minutes) - SL_OFFSET_MS),
  );
  const poya = getPoyaInfo(sl);
  const beYear = buddhistYear(sl);
  const proverb = proverbOfTheDay(sl.dayOfYear);
  const gatha = gathaOfTheDay(sl.dayOfYear);
  const note = thisDayNote(sl.dayOfYear);
  const data: AlmanacData = { sl, sun, rahu, phase, poya, beYear, proverb, gatha, city };

  const phaseName = moonPhaseName(phase);
  const illum = Math.round(moonIllumination(phase) * 100);

  const panelPad = 'px-6 pt-8 pb-9 sm:px-8';

  // ── අද · Today ───────────────────────────────────────────────────────
  const todayPanel = (
    <div className={panelPad}>
      <section aria-label="Today's date" className="text-center">
        <p className="text-[11px] tracking-[0.26em] text-paper/60 uppercase">
          <span className="font-sinhala text-[12px]">{MONTHS_SI[sl.month]}</span>
          <span className="font-display font-medium">
            {' '}
            · {MONTHS_EN[sl.month]} {sl.year}
          </span>
        </p>

        <div className="mt-2 flex items-center justify-center gap-7">
          <span className="font-display text-[120px] leading-[0.9] font-bold tracking-tight text-gold sm:text-[136px]">
            {sl.day}
          </span>
          <div className="flex flex-col items-center">
            <Moon phase={phase} size={96} />
            <p className="mt-2 font-sinhala text-[12px] leading-tight text-paper/80">
              {phaseName.si}
            </p>
            <p className="font-display text-[9px] tracking-[0.14em] text-paper/60 uppercase">
              {phaseName.en} · {illum}%
            </p>
          </div>
        </div>

        <p className="mt-4 font-sinhala text-[22px] font-medium text-paper">
          {WEEKDAYS_SI[sl.weekday]}
        </p>
        <p className="mt-1 text-[12px] text-paper/70">
          <span lang="ta" className="font-tamil">
            {WEEKDAYS_TA[sl.weekday]}
          </span>
          <span className="font-display tracking-[0.2em] uppercase">
            {' '}
            · {WEEKDAYS_EN[sl.weekday]}
          </span>
        </p>

        {/* today in one sentence — each persona's answer, above the fold */}
        <p
          className="mx-auto mt-4 flex max-w-[40ch] flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-paper/80"
          aria-label={`Summary: ${
            poya.isPoyaToday && poya.today
              ? `today is ${poya.today.en} Poya`
              : poya.next
                ? `${poya.next.en} Poya in ${poya.daysUntil} days`
                : 'Poya table complete'
          }; Rahu Kalaya ${formatTime(rahu.start)} to ${formatTime(rahu.end)}; sunset ${formatTime(sun.sunset)}`}
        >
          <span className="whitespace-nowrap">
            {poya.isPoyaToday && poya.today ? (
              <>
                Today is <span className="font-sinhala">{poya.today.si}</span>{' '}
                <span className="text-paper">Poya</span>
              </>
            ) : poya.next ? (
              poya.daysUntil === 1 ? (
                <span className="text-paper">{poya.next.en} Poya tomorrow</span>
              ) : (
                <>
                  <span className="text-paper">{poya.next.en} Poya</span> in {poya.daysUntil} days
                </>
              )
            ) : (
              'Poya table ends — see gazette'
            )}
          </span>
          <span className="block h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
          <span className="whitespace-nowrap">
            Rahu <span className="font-mono text-paper">{formatTimeRange(rahu.start, rahu.end)}</span>
          </span>
          <span className="block h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
          <span className="whitespace-nowrap">
            Sunset <span className="font-mono text-paper">{formatTime(sun.sunset)}</span>
          </span>
        </p>

        <p className="mt-4 font-mono text-[11px] text-paper/60">
          බුද්ධ වර්ෂ {beYear} · Buddhist Era
        </p>

        {/* poya day — the one gold moment */}
        {poya.isPoyaToday && poya.today && (
          <p className="mt-6 flex items-center justify-center gap-3 font-sinhala text-[17px] font-semibold text-paper">
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
            අද {poya.today.si} පෝය · Today is {poya.today.en} Poya
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
          </p>
        )}
      </section>

      <Divider className="my-9" />

      <RahuPanel window={rahu} sun={sun} minutesOfDay={sl.minutesOfDay} cityEn={city.en} />

      <Divider className="my-9" />

      <AuspiciousPanel
        weekday={sl.weekday}
        sun={sun}
        minutesOfDay={sl.minutesOfDay}
        cityEn={city.en}
      />

      <Divider className="my-9" />

      <ForTodayPanel weekday={sl.weekday} chart={birth.chart} />

      <Divider className="my-9" />

      {/* ── sun ── */}
      <section aria-label="Sun times">
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="font-sinhala text-[12px] text-paper/80">ඉර උදාව</p>
            <p className="font-display text-[9px] tracking-[0.18em] text-saffron uppercase">
              Sunrise
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-medium text-paper">
              {formatTime(sun.sunrise)}
            </p>
          </div>
          <div className="border-x border-paper/15">
            <p className="font-sinhala text-[12px] text-paper/80">ඉර බැසීම</p>
            <p className="font-display text-[9px] tracking-[0.18em] text-saffron uppercase">
              Sunset
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-medium text-paper">
              {formatTime(sun.sunset)}
            </p>
          </div>
          <div>
            <p className="font-sinhala text-[12px] text-paper/80">දවසේ දිග</p>
            <p className="font-display text-[9px] tracking-[0.18em] text-saffron uppercase">
              Day length
            </p>
            <p className="mt-1.5 font-mono text-[15px] font-medium text-paper">
              {formatDuration(sun.dayLength)}
            </p>
          </div>
        </div>
      </section>

      <Divider className="my-9" />

      {/* ── proverb ── */}
      <section aria-labelledby="proverb-heading" className="text-center">
        <h2
          id="proverb-heading"
          className="font-display text-[9px] font-semibold tracking-[0.28em] text-saffron uppercase"
        >
          අද කියමන · Proverb of the day
        </h2>
        <p className="mt-4 font-sinhala text-[19px] leading-relaxed font-medium text-paper">
          “{proverb.si}”
        </p>
        <p className="mt-1.5 text-xs text-paper/60 italic">{proverb.translit}</p>
        <p className="mx-auto mt-2.5 max-w-[36ch] text-[13px] leading-snug text-paper/70">
          {proverb.en}
        </p>
      </section>

      <Divider className="my-9" />

      {/* ── අද දිනය · This Day — a calm local note ── */}
      <section aria-labelledby="thisday-heading" className="text-center">
        <h2
          id="thisday-heading"
          className="font-display text-[9px] font-semibold tracking-[0.28em] text-saffron uppercase"
        >
          අද දිනය · This Day
        </h2>
        <p className="mx-auto mt-4 max-w-[34ch] font-sinhala text-[16px] leading-relaxed text-paper">
          {note.si}
        </p>
        <p className="mx-auto mt-1.5 max-w-[36ch] text-[12px] leading-snug text-paper/65">
          {note.en}
        </p>
      </section>

      <Divider className="my-9" />

      <ShareBar data={data} />

      {/* footnotes — spacing separates, no rule needed */}
      <footer className="mt-10 text-center">
        <p className="text-[10px] leading-relaxed text-paper/60">
          <span className="font-sinhala">පෝය දින රජයේ ගැසට් පත්‍රය අනුව වෙනස් විය හැක.</span>{' '}
          Poya dates may shift per the official gazette. Sun &amp; Rahu times computed for {city.en}{' '}
          ({city.lat.toFixed(2)}° N, {city.lon.toFixed(2)}° E) in Sri Lanka time, UTC+5:30.
        </p>
      </footer>
    </div>
  );

  // ── දහම් · Dhamma ─────────────────────────────────────────────────────
  const dhammaPanel = (
    <div className={panelPad}>
      <GathaPanel data={data} />

      <Divider className="my-9" />

      <DhammaWordPanel dayOfYear={sl.dayOfYear} />

      {poya.isPoyaToday && poya.today && (
        <>
          <Divider className="my-9" />
          <PoyaObservancePanel poya={poya.today} />
        </>
      )}
    </div>
  );

  // ── ජ්‍යෝතිෂ්‍ය · Astrology ───────────────────────────────────────────
  const astrologyPanel = (
    <div className={panelPad}>
      <AstrologyPanel data={data} chart={birth.chart} submit={birth.submit} />
    </div>
  );

  const tabs: TabDef[] = [
    { id: 'today', labelSi: 'අද', labelEn: 'Today', panel: todayPanel },
    { id: 'dhamma', labelSi: 'දහම්', labelEn: 'Dhamma', panel: dhammaPanel },
    { id: 'astrology', labelSi: 'ජ්‍යෝතිෂ්‍ය', labelEn: 'Astrology', panel: astrologyPanel },
  ];

  return (
    <div className="litha-backdrop min-h-screen px-3 py-8 sm:py-16">
      <main className="relative mx-auto w-full max-w-[430px]">
        <article className="litha-sheet relative rounded-b-[3px] text-paper shadow-[0_12px_28px_rgba(0,0,0,0.55),0_44px_88px_-12px_rgba(0,0,0,0.95)]">
          <div className="litha-perforation" />

          {/* masthead — quiet, no band */}
          <header className="pt-9 text-center">
            <h1 className="flex items-center justify-center gap-3.5 font-sinhala text-[26px] leading-none font-semibold text-paper">
              <span className="block h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
              අද ලිත
              <span className="block h-1 w-1 rotate-45 bg-gold" aria-hidden="true" />
            </h1>
            <p className="mt-2.5 font-display text-[9px] font-semibold tracking-[0.42em] text-saffron uppercase">
              Ada Litha · Today's Almanac
            </p>
            {/* island clock up top — the diaspora's first question */}
            <p className="mt-4 flex items-center justify-center gap-2.5 text-[13px]">
              <span
                className="litha-live-dot block h-1.5 w-1.5 rounded-full bg-moss"
                aria-hidden="true"
              />
              <span className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
                Sri Lanka now
              </span>
              <span className="font-mono font-medium text-paper">
                {formatTime(sl.hours * 60 + sl.minutes)}
              </span>
            </p>
          </header>

          <div className="mt-7 border-b border-paper/10">
            <Tabs tabs={tabs} storageKey="ada-litha-tab" />
          </div>
        </article>

        {/* settings — one quiet line under the sheet */}
        <p className="mt-7 flex items-center justify-center gap-2 text-center text-[12px] text-paper/70">
          <label htmlFor="city-select">
            <span className="font-sinhala">{city.si}</span> · Rahu &amp; sun times for
          </label>
          <select
            id="city-select"
            value={city.id}
            onChange={(e) => setCity(e.target.value)}
            className="cursor-pointer rounded-[1px] border-none bg-transparent font-display text-[12px] font-medium text-paper underline decoration-paper/30 underline-offset-3 transition-colors hover:decoration-paper/60"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-maroon-deep text-paper">
                {c.en}
              </option>
            ))}
          </select>
        </p>

        <p className="mt-6 text-center font-display text-[9px] tracking-[0.34em] text-paper/60 uppercase">
          Torn fresh every day
        </p>
      </main>
    </div>
  );
}
