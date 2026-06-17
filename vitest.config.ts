import { defineConfig } from 'vitest/config';

// Standalone test config — deliberately does NOT load the app's Vite plugins
// (PWA, Tailwind); the engine and its tests are plain TS + astronomia.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
