import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await page.goto('http://localhost:5180', { waitUntil: 'load' });
await page.waitForTimeout(1500);
// expand gatha and guidance
await page.getByRole('button', { name: /අද ගාථාව/ }).click();
await page.getByRole('button', { name: /සුබ අසුබ/ }).click();
await page.waitForTimeout(500);
const gatha = await page.$('section[aria-labelledby="gatha-heading"]');
await gatha.screenshot({ path: 'dh-gatha-open.png' });
const guidance = await page.$('section[aria-labelledby="guidance-heading"]');
await guidance.screenshot({ path: 'dh-guidance-open.png' });
// axe
await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js' });
const r = await page.evaluate(async () => await window.axe.run());
console.log('AXE VIOLATIONS:', r.violations.length);
for (const v of r.violations) console.log(`- [${v.impact}] ${v.id}:`, v.nodes.slice(0,3).map(n => n.target.join(' ')).join(' ; '));
await browser.close();
