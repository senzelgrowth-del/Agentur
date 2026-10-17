// Rendert Spartacus-Gay-Cruise-Creatives im Look von render.mjs in 4:5 (1080x1350)
// und 1:1 (1080x1080) sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render-formats.mjs
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

const gold = "#f4b860";

// Gleicher Look wie 01–03 (render.mjs), hier in 4:5 und 1:1
const creatives = [
  { name: "04-sundowner-an-deck-4x5", width: 1080, height: 1350, pos: "58% 50%", body: true },
  { name: "05-sundowner-an-deck-1x1", width: 1080, height: 1080, pos: "60% 50%", body: false },
];

const html = (c) => {
  const sq = c.width === c.height;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Montserrat:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:#0b1a33}
body{font-family:Montserrat,sans-serif;color:#fff;position:relative}
.photo{position:absolute;inset:0;background:url(${img("sunset-deck.jpg")}) ${c.pos}/cover no-repeat}
.top{position:absolute;left:0;right:0;top:0;height:${sq ? 470 : 560}px;
  background:linear-gradient(180deg,rgba(6,16,36,.82) 0%,rgba(6,16,36,.55) 45%,rgba(6,16,36,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:${sq ? 600 : 760}px;
  background:linear-gradient(0deg,rgba(6,16,36,.94) 0%,rgba(6,16,36,.82) 42%,rgba(6,16,36,0) 100%)}
.title{position:absolute;top:${sq ? 50 : 64}px;left:0;right:0;text-align:center}
.kicker{font-weight:700;font-size:22px;letter-spacing:.42em;text-transform:uppercase;color:${gold};padding-left:.42em}
.brand{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:${sq ? 116 : 132}px;line-height:1;margin-top:14px;
  text-shadow:0 4px 30px rgba(0,0,0,.45)}
.sub{font-weight:800;font-size:${sq ? 36 : 40}px;letter-spacing:.34em;text-transform:uppercase;margin-top:10px;padding-left:.34em;
  text-shadow:0 2px 18px rgba(0,0,0,.5)}
.rainbow{width:220px;height:5px;margin:${sq ? 22 : 26}px auto 0;border-radius:3px;
  background:linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)}
.content{position:absolute;left:72px;right:72px;bottom:${sq ? 56 : 72}px;text-align:center}
.eyebrow{font-weight:700;font-size:24px;letter-spacing:.24em;text-transform:uppercase;color:${gold}}
h2{font-family:'Playfair Display',serif;font-style:italic;font-weight:600;font-size:${sq ? 62 : 68}px;line-height:1.08;margin-top:16px}
.body{font-weight:500;font-size:27px;line-height:1.4;margin-top:20px;color:rgba(255,255,255,.9)}
.chips{display:flex;justify-content:center;gap:14px;margin-top:${sq ? 24 : 28}px;flex-wrap:wrap}
.chip{font-weight:600;font-size:23px;padding:11px 22px;border:1.5px solid rgba(255,255,255,.55);border-radius:40px;
  background:rgba(255,255,255,.08)}
.row{display:flex;justify-content:center;align-items:center;gap:30px;margin-top:${sq ? 28 : 36}px}
.price{text-align:left;line-height:1.05}
.price small{display:block;font-weight:600;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.price b{font-weight:800;font-size:54px;color:${gold}}
.price s{font-weight:500;font-size:24px;color:rgba(255,255,255,.6);margin-left:10px}
.cta{font-weight:800;font-size:27px;letter-spacing:.03em;padding:24px 40px;border-radius:60px;
  background:${gold};color:#0b1a33;box-shadow:0 10px 30px rgba(0,0,0,.35)}
</style></head><body>
<div class="photo"></div><div class="top"></div><div class="bottom"></div>
<div class="title">
  <div class="kicker">15.–22. Oktober 2027</div>
  <div class="brand">Spartacus</div>
  <div class="sub">Gay Cruise 2027</div>
  <div class="rainbow"></div>
</div>
<div class="content">
  <div class="eyebrow">Sundowner an Deck</div>
  <h2>Sonnenuntergang, DJs<br>&amp; Drag unter freiem Himmel</h2>
  ${c.body ? `<div class="body">Palma · Barcelona · Valencia · Alicante · Marbella · Tanger</div>` : ""}
  <div class="chips"><span class="chip">8 Tage</span><span class="chip">Vollpension</span><span class="chip">Shows &amp; Partys</span></div>
  <div class="row">
    <div class="price"><small>p.P. ab</small><b>1.214 €</b><s>1.349 €</s></div>
    <div class="cta">Frühbucherpreis sichern →</div>
  </div>
</div>
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
