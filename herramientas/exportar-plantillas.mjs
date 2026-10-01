// Exporta las hojas de sprites generadas a plantillas/<nombre>.png y plantillas/<nombre>.json
// Uso: (desde la raíz del repo, con un servidor local en marcha)
//   python3 -m http.server 8000 &
//   node herramientas/exportar-plantillas.mjs http://localhost:8000/
// Requiere Playwright (npm i -D playwright).
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
const base = process.argv[2] || 'http://localhost:8000/';
const browser = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
const page = await browser.newPage();
await page.goto(base + 'index.html?test');
await page.waitForFunction(() => window.KAGE && window.KAGE.sheet, null, { timeout: 60000 });
mkdirSync('plantillas', { recursive: true });
const names = await page.evaluate(() => KAGE.sets());
for (const n of names) {
  const s = await page.evaluate(n => KAGE.sheet(n), n);
  writeFileSync(`plantillas/${n}.png`, Buffer.from(s.url.split(',')[1], 'base64'));
  writeFileSync(`plantillas/${n}.json`, JSON.stringify({ celda: [s.w, s.h], columnas: s.cols, total: s.n, ancla: [s.ax, s.ay], animaciones: s.anims }, null, 1) + '\n');
  console.log(n, `${s.w}x${s.h}`, s.n, 'fotogramas');
}
await browser.close();
