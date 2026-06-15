import { defineConfig, type Connect } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// Mirrors the Netlify function for local dev and `vite preview`.
const newsMiddleware: Connect.NextHandleFunction = async (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { fetchNews } = await import('./server/news');
    const { items, cached } = await fetchNews();
    res.end(JSON.stringify({ headlines: items, cached }));
  } catch (err) {
    res.statusCode = 502;
    res.end(
      JSON.stringify({
        error: err instanceof Error ? err.message : 'Could not fetch headlines',
      }),
    );
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png', 'og.png'],
      manifest: {
        name: 'අද ලිත · Ada Litha',
        short_name: 'Ada Litha',
        description:
          "Today's Sri Lankan almanac: Poya, moon phase, Rahu Kalaya, sunrise and sunset — computed live for Sri Lanka time.",
        lang: 'si',
        theme_color: '#3a0d0d',
        background_color: '#3a0d0d',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Google Fonts stylesheet — revalidates quietly, serves from cache offline
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-css' },
          },
          {
            // The font files themselves: Sinhala/Tamil woff2 are the heaviest
            // assets — cache-first for a year so a revisit renders offline.
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // News must never be served stale from the SW — the function caches.
            urlPattern: /\/api\/news/,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
    {
      name: 'dev-news-api',
      configureServer(server) {
        server.middlewares.use('/api/news', newsMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/news', newsMiddleware);
      },
    },
  ],
});
