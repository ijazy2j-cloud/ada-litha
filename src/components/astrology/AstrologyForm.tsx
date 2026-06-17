import { useState } from 'react';
import { BIRTH_CITIES, SL_OFFSET } from '../../data/birthCities';
import type { BirthInput } from '../../lib/astrology';

interface AstrologyFormProps {
  initial?: BirthInput;
  onSubmit: (input: BirthInput) => void;
  onCancel?: () => void;
}

const inputClass =
  'mt-1.5 w-full rounded-[1px] border border-paper/30 bg-transparent px-3 py-2 font-mono text-[14px] text-paper transition-colors focus:border-paper/60';

export function AstrologyForm({ initial, onSubmit, onCancel }: AstrologyFormProps) {
  const initManual = initial?.place.kind === 'manual' ? initial.place : null;
  const [date, setDate] = useState(initial?.date ?? '');
  const [time, setTime] = useState(initial?.time ?? '');
  const [mode, setMode] = useState<'city' | 'manual'>(initial?.place.kind ?? 'city');
  const [cityId, setCityId] = useState(
    initial?.place.kind === 'city' ? initial.place.cityId : BIRTH_CITIES[0].id,
  );
  const [lat, setLat] = useState(initManual ? String(initManual.lat) : '');
  const [lon, setLon] = useState(initManual ? String(initManual.lon) : '');
  const [offset, setOffset] = useState(initManual ? String(initManual.tzOffsetHours) : String(SL_OFFSET));
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) {
      setError('Please enter both a birth date and time.');
      return;
    }
    if (mode === 'manual') {
      const la = Number(lat),
        lo = Number(lon),
        off = Number(offset);
      if (Number.isNaN(la) || Number.isNaN(lo) || Number.isNaN(off)) {
        setError('Please enter valid latitude, longitude and UTC offset.');
        return;
      }
      onSubmit({ date, time, place: { kind: 'manual', lat: la, lon: lo, tzOffsetHours: off } });
    } else {
      onSubmit({ date, time, place: { kind: 'city', cityId } });
    }
  }

  return (
    <section aria-labelledby="astro-form-heading">
      <div className="text-center">
        <h2
          id="astro-form-heading"
          className="font-sinhala text-[19px] font-medium text-paper"
        >
          ඔබේ නැකත සොයමු
        </h2>
        <p className="mt-1 font-display text-[9px] font-semibold tracking-[0.28em] text-saffron uppercase">
          Find your birth star
        </p>
        <p className="mx-auto mt-4 max-w-[34ch] text-[12px] leading-relaxed text-paper/65">
          Per Sinhala astrological tradition, your birth moment gives your{' '}
          <span className="font-sinhala">නැකත</span> (star) and{' '}
          <span className="font-sinhala">රාශිය</span> (moon sign). Shared here for interest, not
          prediction.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="flex gap-3">
          <label className="flex-1 text-[11px] tracking-[0.14em] text-paper/70 uppercase">
            Birth date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={{ colorScheme: 'dark' }}
              className={inputClass}
            />
          </label>
          <label className="flex-1 text-[11px] tracking-[0.14em] text-paper/70 uppercase">
            Birth time
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              style={{ colorScheme: 'dark' }}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block text-[11px] tracking-[0.14em] text-paper/70 uppercase">
          Birth place
          <select
            value={mode === 'manual' ? '__manual' : cityId}
            onChange={(e) => {
              if (e.target.value === '__manual') setMode('manual');
              else {
                setMode('city');
                setCityId(e.target.value);
              }
            }}
            style={{ colorScheme: 'dark' }}
            className={`${inputClass} cursor-pointer`}
          >
            {BIRTH_CITIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-maroon-deep text-paper">
                {c.en} · {c.si}
              </option>
            ))}
            <option value="__manual" className="bg-maroon-deep text-paper">
              Other — enter coordinates
            </option>
          </select>
        </label>

        {mode === 'manual' && (
          <div className="flex gap-3">
            <label className="flex-1 text-[10px] tracking-[0.12em] text-paper/70 uppercase">
              Latitude
              <input
                type="number"
                step="0.0001"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="6.93"
                style={{ colorScheme: 'dark' }}
                className={inputClass}
              />
            </label>
            <label className="flex-1 text-[10px] tracking-[0.12em] text-paper/70 uppercase">
              Longitude
              <input
                type="number"
                step="0.0001"
                value={lon}
                onChange={(e) => setLon(e.target.value)}
                placeholder="79.86"
                style={{ colorScheme: 'dark' }}
                className={inputClass}
              />
            </label>
            <label className="flex-1 text-[10px] tracking-[0.12em] text-paper/70 uppercase">
              UTC ±h
              <input
                type="number"
                step="0.25"
                value={offset}
                onChange={(e) => setOffset(e.target.value)}
                placeholder="5.5"
                style={{ colorScheme: 'dark' }}
                className={inputClass}
              />
            </label>
          </div>
        )}

        {error && (
          <p className="text-[12px] text-paper/80" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 rounded-[1px] border border-gold/70 bg-gold/10 px-4 py-2.5 font-display text-[13px] font-semibold tracking-wide text-paper transition duration-150 ease-out hover:bg-gold/20 active:scale-[0.98]"
          >
            Show my star
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-[1px] border border-paper/30 px-4 py-2.5 font-display text-[13px] font-medium tracking-wide text-paper/80 transition duration-150 ease-out hover:bg-paper/10 active:scale-[0.98]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
