import { useState } from 'react';
import { formatRelative } from '../lib/format';

interface Headline {
  headline: string;
  source: string;
  link: string;
  publishedAt: string;
}

type NewsState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'offline' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; headlines: Headline[] };

export function NewsPanel() {
  const [state, setState] = useState<NewsState>({ kind: 'idle' });

  async function load() {
    // Always attempt the fetch — navigator.onLine === false is unreliable
    // (VPNs, some network adapters and webviews misreport it), so we never
    // gate on it up front. Offline is inferred only when the request fails.
    setState({ kind: 'loading' });
    try {
      const res = await fetch('/api/news');
      const body = (await res.json()) as { headlines?: Headline[]; error?: string };
      if (!res.ok || !body.headlines) {
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      setState({ kind: 'loaded', headlines: body.headlines });
    } catch (err) {
      // A network-level failure with the browser reporting offline → offline
      // state; anything else is a genuine error worth surfacing.
      const networkFailure = err instanceof TypeError;
      if (networkFailure && !navigator.onLine) {
        setState({ kind: 'offline' });
        return;
      }
      setState({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong',
      });
    }
  }

  return (
    <section aria-labelledby="news-heading">
      <div className="flex items-baseline justify-between">
        <h2 id="news-heading" className="font-sinhala text-[15px] font-medium text-paper">
          ලංකාවෙන් අලුත් තොරතුරු
        </h2>
        <p className="font-display text-[9px] font-semibold tracking-[0.24em] text-saffron uppercase">
          Live from Lanka
        </p>
      </div>

      {state.kind === 'idle' && (
        <>
          <button
            type="button"
            onClick={load}
            className="mt-4 w-full rounded-[1px] border border-paper/30 px-4 py-2.5 font-display text-[13px] font-medium tracking-wide text-paper transition duration-150 ease-out hover:border-paper/50 hover:bg-paper/10 active:scale-[0.98]"
          >
            Fetch today's headlines
          </button>
          <p className="mt-2 text-center text-[10px] text-paper/60">
            Top stories from the last 24 hours, via Google News.
          </p>
        </>
      )}

      {state.kind === 'loading' && (
        <div className="mt-4" role="status" aria-live="polite">
          <ul className="space-y-4" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="space-y-1.5">
                <div className="litha-live-dot h-3.5 w-4/5 rounded-[1px] bg-paper/10" />
                <div className="litha-live-dot h-2.5 w-2/5 rounded-[1px] bg-paper/[0.06]" />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[10px] text-paper/60">Fetching the island's headlines…</p>
        </div>
      )}

      {state.kind === 'offline' && (
        <div className="mt-4" role="status">
          <p className="flex items-center gap-2 text-[13px] text-paper">
            <span className="block h-2 w-2 rounded-full border border-paper/50" aria-hidden="true" />
            You're offline — the litha above works without a connection.
          </p>
          <p className="mt-1 pl-[18px] text-xs text-paper/60">
            Headlines will load when you're back online.
          </p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-[1px] border border-paper/30 px-3.5 py-1.5 font-display text-xs font-medium tracking-wide text-paper transition duration-150 ease-out hover:border-paper/50 hover:bg-paper/10 active:scale-[0.98]"
          >
            Check again
          </button>
        </div>
      )}

      {state.kind === 'error' && (
        <div className="mt-4" role="alert">
          <p className="flex items-center gap-2 text-[13px] text-paper">
            <span className="block h-2 w-2 rounded-full bg-rahu" aria-hidden="true" />
            Headlines didn't load — check your connection, then try again.
          </p>
          <p className="mt-1 pl-[18px] text-xs text-paper/60">{state.message}</p>
          <button
            type="button"
            onClick={load}
            className="mt-3 rounded-[1px] border border-paper/30 px-3.5 py-1.5 font-display text-xs font-medium tracking-wide text-paper transition duration-150 ease-out hover:border-paper/50 hover:bg-paper/10 active:scale-[0.98]"
          >
            Try again
          </button>
        </div>
      )}

      {state.kind === 'loaded' && (
        <>
          <ol className="mt-4 space-y-4">
            {state.headlines.map((h) => (
              <li key={h.link} className="flex gap-3">
                <span
                  className="mt-[7px] block h-1 w-1 shrink-0 rotate-45 bg-gold"
                  aria-hidden="true"
                />
                <div>
                  <a
                    href={h.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm leading-snug font-medium text-paper underline decoration-paper/25 underline-offset-2 transition-colors hover:decoration-paper/60"
                  >
                    {h.headline}
                  </a>
                  <p className="mt-1 text-[11px] text-paper/60">
                    {h.source} · {formatRelative(h.publishedAt)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-3.5 text-right text-[9px] tracking-[0.16em] text-paper/60 uppercase">
            via Google News · refreshed every 30 min
          </p>
        </>
      )}
    </section>
  );
}
