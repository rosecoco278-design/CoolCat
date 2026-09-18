import puppeteer from 'puppeteer';

const url = process.argv[2];
const outPath = process.argv[3];
const scrollY = Number(process.argv[4] || 0);
const clickText = process.argv[5];

const browser = await puppeteer.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1200));
if (scrollY) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise((r) => setTimeout(r, 500));
}
if (clickText) {
  const clicked = await page.evaluate((text) => {
    const els = Array.from(document.querySelectorAll('button'));
    const el = els.find((e) => e.textContent?.trim().startsWith(text));
    if (el) {
      el.click();
      return true;
    }
    return false;
  }, clickText);
  console.log('CLICKED:', clicked);
  await new Promise((r) => setTimeout(r, 600));
}
await page.screenshot({ path: outPath });
await browser.close();
