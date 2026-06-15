// Netlify Edge Function: injects the day's flavour into <title> and the
// OG/Twitter title of the HTML response, so WhatsApp/Facebook link previews
// read "Ada Litha · 18 days to Poson Poya" instead of the static fallback.
// WhatsApp never runs client JS, so this must happen at the edge.

// Keep in sync with src/lib/poya.ts (POYA_2026).
const POYA_2026: Array<{ month: number; day: number; en: string }> = [
  { month: 0, day: 3, en: 'Duruthu' },
  { month: 1, day: 1, en: 'Navam' },
  { month: 2, day: 2, en: 'Madin' },
  { month: 3, day: 1, en: 'Bak' },
  { month: 4, day: 1, en: 'Vesak' },
  { month: 4, day: 31, en: 'Adhi Vesak' },
  { month: 5, day: 29, en: 'Poson' },
  { month: 6, day: 29, en: 'Esala' },
  { month: 7, day: 28, en: 'Nikini' },
  { month: 8, day: 26, en: 'Binara' },
  { month: 9, day: 26, en: 'Vap' },
  { month: 10, day: 24, en: 'Il' },
  { month: 11, day: 24, en: 'Unduvap' },
];

export function dailyTitle(now: Date = new Date()): string {
  // Sri Lanka time, UTC+5:30
  const sl = new Date(now.getTime() + 5.5 * 3_600_000);
  const year = sl.getUTCFullYear();
  if (year !== 2026) return 'අද ලිත · Ada Litha — Today’s Sri Lankan Almanac';

  const todayUTC = Date.UTC(year, sl.getUTCMonth(), sl.getUTCDate());
  for (const p of POYA_2026) {
    const poyaUTC = Date.UTC(2026, p.month, p.day);
    if (poyaUTC === todayUTC) return `Ada Litha · Today is ${p.en} Poya 🌕`;
    if (poyaUTC > todayUTC) {
      const days = Math.round((poyaUTC - todayUTC) / 86_400_000);
      return days === 1
        ? `Ada Litha · ${p.en} Poya tomorrow`
        : `Ada Litha · ${days} days to ${p.en} Poya`;
    }
  }
  return 'අද ලිත · Ada Litha — Today’s Sri Lankan Almanac';
}

export default async (
  _request: Request,
  context: { next: () => Promise<Response> },
): Promise<Response> => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) return response;

  const title = dailyTitle();
  const html = (await response.text())
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      (_m, a: string, b: string) => a + title + b,
    )
    .replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      (_m, a: string, b: string) => a + title + b,
    );

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};

export const config = { path: '/' };
