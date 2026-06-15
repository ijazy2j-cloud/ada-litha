import { toPng } from 'html-to-image';
import type { SLTime } from './slTime';

export type ShareOutcome = 'shared' | 'downloaded' | 'cancelled';

/**
 * Rasterise a 1080×1920 story card and hand it to the native share sheet
 * (mobile) or download it (desktop).
 *
 * Capture rules learned the hard way: the live node hides off-screen with
 * position:fixed, which Chrome refuses to paint inside the capture SVG —
 * the clone must be static at 0,0. Cards use the noise-free sheet surface
 * because feTurbulence rasterises black. Fonts are awaited first.
 */
export async function shareStoryCard(
  node: HTMLElement,
  slug: string,
  sl: SLTime,
): Promise<ShareOutcome> {
  await document.fonts.ready;
  const dataUrl = await toPng(node, {
    width: 1080,
    height: 1920,
    pixelRatio: 1,
    cacheBust: true,
    style: { position: 'static', left: '0px', top: '0px', zIndex: '0' },
  });

  const filename = `ada-litha-${slug}-${sl.year}-${String(sl.month + 1).padStart(2, '0')}-${String(
    sl.day,
  ).padStart(2, '0')}.png`;

  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], filename, { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'අද ලිත · Ada Litha' });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
      // fall through to download on any other share failure
    }
  }

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.click();
  return 'downloaded';
}
