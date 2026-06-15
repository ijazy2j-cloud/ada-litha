import { XMLParser } from 'fast-xml-parser';

export interface NewsItem {
  headline: string;
  source: string;
  link: string;
  publishedAt: string; // ISO 8601
}

// Google News RSS — free, no key, last 24h of Sri Lanka coverage.
const FEED_URL =
  'https://news.google.com/rss/search?q=Sri+Lanka+when:1d&hl=en-LK&gl=LK&ceid=LK:en';

const CACHE_MS = 30 * 60 * 1000; // repeated presses within 30 min reuse the last fetch
const MAX_ITEMS = 5;

// Optional future enhancement: pass the headlines through Claude once per
// cache window to add a one-line Sinhala gloss to each. Left OFF for launch —
// it would reintroduce an API key and cost roughly US$0.01–0.05 per refresh,
// while the RSS path is entirely free.
// const USE_AI_POLISH = false;

let cache: { items: NewsItem[]; at: number } | null = null;

export async function fetchNews(): Promise<{ items: NewsItem[]; cached: boolean }> {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return { items: cache.items, cached: true };
  }

  const res = await fetch(FEED_URL, { headers: { 'User-Agent': 'AdaLitha/1.0 (+adalitha.lk)' } });
  if (!res.ok) throw new Error(`News feed returned ${res.status}`);
  const xml = await res.text();

  const parsed = new XMLParser().parse(xml) as {
    rss?: { channel?: { item?: unknown } };
  };
  const rawItems = parsed.rss?.channel?.item ?? [];
  const list = (Array.isArray(rawItems) ? rawItems : [rawItems]) as Array<{
    title?: unknown;
    link?: unknown;
    pubDate?: unknown;
    source?: unknown;
  }>;

  const items: NewsItem[] = list.slice(0, MAX_ITEMS).map((item) => {
    // Google titles end in " - Source Name"; lift it into its own field.
    // Some outlets produce a double suffix ("… - news - Mongabay"), so strip
    // the known source first, then one more short trailing segment if left.
    const title = String(item.title ?? '').trim();
    const sourceFromTag = typeof item.source === 'string' ? item.source.trim() : '';
    let headline = title;
    let source = sourceFromTag;
    if (sourceFromTag && title.endsWith(` - ${sourceFromTag}`)) {
      headline = title.slice(0, -(sourceFromTag.length + 3)).trim();
    } else {
      const sep = title.lastIndexOf(' - ');
      if (sep > 0) {
        headline = title.slice(0, sep).trim();
        source = source || title.slice(sep + 3).trim();
      }
    }
    const residue = headline.match(/ - ([\w.]{1,20})$/);
    if (residue && headline.length - residue[0].length > 25) {
      headline = headline.slice(0, -residue[0].length).trim();
    }
    const pubDate = new Date(String(item.pubDate ?? ''));
    return {
      headline,
      source: source || 'Google News',
      link: String(item.link ?? ''),
      publishedAt: (Number.isNaN(pubDate.getTime()) ? new Date() : pubDate).toISOString(),
    };
  });

  if (items.length === 0) throw new Error('News feed had no items');
  cache = { items, at: Date.now() };
  return { items, cached: false };
}
