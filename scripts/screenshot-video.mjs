import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:5173';
const outPath = process.argv[3] || 'screenshot.png';
const scrollY = Number(process.argv[4] || 0);

const browser = await puppeteer.launch({
  args: [
    '--enable-unsafe-swiftshader',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--ignore-gpu-blocklist',
    '--autoplay-policy=no-user-gesture-required',
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));
if (scrollY) {
  await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  await new Promise((r) => setTimeout(r, 500));
}
await new Promise((r) => setTimeout(r, 2000));

await page.screenshot({ path: outPath, fullPage: false });
console.log('ERRORS:', JSON.stringify(errors));
await browser.close();
