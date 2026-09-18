import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:5173';
const outPath = process.argv[3] || 'screenshot.png';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });

await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 1500));

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
