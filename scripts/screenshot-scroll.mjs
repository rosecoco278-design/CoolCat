import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:5173';
const outPath = process.argv[3] || 'screenshot.png';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1000));

// Scroll through the whole page in steps so viewport-triggered animations fire.
const height = await page.evaluate(() => document.body.scrollHeight);
const step = 700;
for (let y = 0; y < height; y += step) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await new Promise((r) => setTimeout(r, 150));
}
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 500));

await page.screenshot({ path: outPath, fullPage: true });

console.log('ERRORS:', JSON.stringify(errors));
await browser.close();
