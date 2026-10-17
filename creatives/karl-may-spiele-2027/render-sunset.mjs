// Rendert die „Western-Sonnenuntergang“-Creatives für die Karl-May-Spiele-Reise
// in 1:1 (1080x1080) und 4:5 (1080x1350) – randloses Foto, Text auf einfarbigen Blöcken, ohne Verläufe/Schatten/Preis – sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/karl-may-spiele-2027/render-sunset.mjs
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

// Playwright aus dem Projekt oder (Fallback) aus der globalen Installation laden
const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execSync("npm root -g").toString().trim(), "playwright")));
}

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "export");
mkdirSync(out, { recursive: true });

const img = (f) =>
  `data:image/jpeg;base64,${readFileSync(join(dir, "src", f)).toString("base64")}`;

// Farbwelt: Rost-Orange, Sandbeige, Leder-Braun, Gold
const rust = "#c4561f";
const sand = "#f5e4c3";
const leather = "#3b1d0e";
const gold = "#f2b544";

const creatives = [
  {
    name: "07-winnetou-reitet-wieder-4x5",
    width: 1080,
    height: 1350,
    photo: "reiter-buehne.jpg",
    pos: "50% 100%",
    lines: ["Winnetou", "reitet wieder"],
    sub: "Mit Alexander Klaws als Winnetou",
  },
  {
    name: "08-auf-in-den-wilden-westen-1x1",
    width: 1080,
    height: 1080,
    photo: "buehne-daemmerung.jpg",
    pos: "100% 60%",
    lines: ["Auf in den", "Wilden Westen"],
    sub: "Mit Alexander Klaws als Winnetou",
  },
];

// Foto randlos und unbearbeitet; Texte stehen auf einfarbigen Blöcken
// (keine Verläufe, keine Schatten, kein Preis).
const html = (c) => {
  const square = c.height === c.width;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${leather}}
body{font-family:Montserrat,sans-serif;position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
.head{position:absolute;left:${square ? 56 : 64}px;top:${square ? 56 : 72}px;display:flex;flex-direction:column;align-items:flex-start}
.blk{display:inline-block}
.kicker{font-weight:800;font-size:${square ? 24 : 27}px;letter-spacing:.14em;text-transform:uppercase;
  background:${rust};color:${sand};padding:12px 20px 11px}
.t{font-family:'Bebas Neue',sans-serif;font-size:${square ? 124 : 150}px;line-height:1;color:${sand};background:${leather};
  padding:${square ? "10px 22px 0" : "12px 26px 0"}}
.sub{font-weight:800;font-size:${square ? 29 : 33}px;background:${sand};color:${leather};padding:14px 22px 13px}
.info{position:absolute;right:${square ? 56 : 64}px;bottom:${square ? 56 : 72}px;background:${leather};color:${sand};
  border-left:10px solid ${gold};padding:18px 26px 17px 24px;text-align:left}
.info div{font-weight:800;font-size:${square ? 28 : 31}px;line-height:1.35}
.info div + div{color:${gold}}
.info div:first-child{margin-bottom:4px}
</style></head><body>
<div class="photo"></div>
<div class="head">
  <span class="blk kicker">Karl-May-Spiele Bad Segeberg</span>
  ${c.lines.map((l) => `<span class="blk t">${l}</span>`).join("")}
  <span class="blk sub">${c.sub}</span>
</div>
<div class="info"><div>Busreise ab Erfurt</div><div>07.–09.07.2027</div><div>18.–20.07.2027</div></div>
</body></html>`;
};

const browser = await chromium.launch();
for (const c of creatives) {
  const page = await browser.newPage({ viewport: { width: c.width, height: c.height } });
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = join(out, `${c.name}.png`);
  await page.screenshot({ path: png });
  await page.close();

  // Ein-Seiten-PDF für den Canva-Import. Pillow schreibt die Seitengröße exakt
  // (1350 px = 1012,5 pt) – Chromium rundet auf ganze Punkt, Canva macht daraus 1351 px.
  execSync(
    `python3 -c "import sys; from PIL import Image; Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2], resolution=96.0)" ` +
      `"${png}" "${join(out, `${c.name}.pdf`)}"`,
  );
  console.log("✓", c.name);
}
await browser.close();
