import puppeteer from 'puppeteer';

const url = process.argv[2] || 'http://localhost:5173';
const outPath = process.argv[3] || 'screenshot.png';

const browser = await puppeteer.launch({
  args: ['--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

page.on('console', (msg) => {
  console.log(`[${msg.type()}]`, msg.text());
});
page.on('pageerror', (err) => console.log('[pageerror]', String(err)));

await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise((r) => setTimeout(r, 2000));

const webglInfo = await page.evaluate(() => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'no webgl context';
  return gl.getParameter(gl.RENDERER);
});
console.log('WEBGL_RENDERER:', webglInfo);

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();
