# අද ලිත · Ada Litha

A digital version of the traditional Sri Lankan daily tear-off almanac (litha).
One job: show what today is in Sri Lanka, at a glance, in a beautiful shareable
format — for Sri Lankans at home and the diaspora.

Everything is computed client-side **in Sri Lanka time (UTC+5:30)**, regardless
of the viewer's timezone. Installable as a PWA; works fully offline except the
news section.

## Features

- **Date sheet** — giant tear-off date numeral, weekday in Sinhala / Tamil /
  English, Buddhist Era year, one-line "today in one sentence" summary.
- **Real moon** — SVG moon with a correct terminator, phase name, illumination.
- **Poya** — next Poya countdown from the official 2026 table; Poya-day badge
  and observance reflection. Dates may shift per the gazette.
- **Rahu Kalaya & sun times** — NOAA solar equations for a selectable city
  (Colombo, Kandy, Galle, Jaffna, Batticaloa — stored in localStorage), live
  status without reload.
- **Dhamma layer** — daily Dhammapada gatha (60 bundled verses, Dhp 1–60),
  Sinhala proverb, weekday guidance per Sinhala astrological tradition.
- **Live from Lanka** — free Google News RSS via a Netlify function
  (`netlify/functions/news.ts`), cached 30 minutes, **no API key needed**.
- **Share** — three 1080×1920 story cards (full litha, gatha, guidance) via
  the Web Share API on mobile, download on desktop.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · vite-plugin-pwa · Netlify
(functions + edge functions). Fonts: Noto Serif Sinhala, Noto Sans Tamil,
Bricolage Grotesque, IBM Plex Mono.

## Develop

```sh
npm install
npm run dev          # /api/news served by Vite middleware, same code as prod
npm run build && npm run preview   # production build check
```

No `.env` is needed. (`.env.example` documents the optional future AI-glossing
key; `.env` is gitignored.)

## Deploy on Netlify

1. Push the repo to GitHub and "Import from Git" on Netlify — `netlify.toml`
   already sets the build command (`npm run build`), publish dir (`dist`),
   functions dir (`netlify/functions`) and the `/api/news` redirect.
2. **No environment variables are required.** News is free Google News RSS.
3. The edge function (`netlify/edge-functions/daily-og.ts`) rewrites the
   page title and OG tags daily ("Ada Litha · 18 days to Poson Poya") so
   WhatsApp link previews carry the day; static fallback title remains in
   `index.html`.

## Launch note

**English** — Ada Litha is a digital version of the traditional Sri Lankan
tear-off almanac. Open it any morning and see today at a glance: the Poya
countdown, the real moon phase, Rahu Kalaya and sunrise/sunset for your city,
a daily Dhammapada verse, and a quiet line of traditional guidance — all in
Sinhala, Tamil and English, computed live in Sri Lanka time wherever you are
in the world. Add it to your home screen and share the day as a beautiful card
to WhatsApp or Instagram. Free, no sign-up. 🌕 adalitha.lk

**සිංහල** — අද ලිත කියන්නේ සම්ප්‍රදායික ලංකා ලිතේ ඩිජිටල් ස්වරූපයයි. ඕනෑම
උදෑසනක විවෘත කර අද දවස එක බැල්මෙන් දැනගන්න: ඊළඟ පෝය, සැබෑ සඳ කලාව, ඔබේ නගරයට
රාහු කාලය සහ ඉර උදාව/බැසීම, දිනපතා ධම්මපද ගාථාවක්, සහ සුබ අසුබ — සිංහල, දෙමළ හා
ඉංග්‍රීසි තුනෙන්ම, ලෝකයේ ඕනෑ තැනක සිට ලංකා වේලාවෙන්. ඔබේ දුරකථනයේ මුල් තිරයට එක්
කරගන්න, ලස්සන කාඩ්පතක් ලෙස WhatsApp හෝ Instagram වෙත බෙදාගන්න. නොමිලේ, ලියාපදිංචියක්
අවශ්‍ය නැත. 🌕 adalitha.lk

## Notes

- Poya table is for 2026; after Unduvap the sheet asks for the new gazette.
  Update `src/lib/poya.ts` **and** `netlify/edge-functions/daily-og.ts` together.
- Moon phase uses the mean synodic month; Poya days always come from the table.
- The optional `USE_AI_POLISH` constant in `server/news.ts` (off, commented)
  is a hook for later Sinhala glossing of headlines via the Anthropic API —
  it would cost ~US$0.01–0.05 per cache refresh and needs `ANTHROPIC_API_KEY`.
