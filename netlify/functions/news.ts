// Netlify Function: GET /api/news (redirected from netlify.toml)
// Free Google News RSS — no API key required. The module-level cache in
// server/news.ts persists across warm invocations; the s-maxage header lets
// Netlify's CDN absorb repeats too.
import { fetchNews } from '../../server/news';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }
  try {
    const { items, cached } = await fetchNews();
    return Response.json(
      { headlines: items, cached },
      { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=1800' } },
    );
  } catch (err) {
    console.error('news error:', err);
    return Response.json({ error: 'Could not fetch headlines right now' }, { status: 502 });
  }
};
