// Rendert Spartacus-Creatives im Look der Kundenvorlage (Postkarten-Look: Headline oben, Foto darunter)
// in 4:5 (1080x1350) und 1:1 (1080x1080) sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render-white.mjs
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

// Variante „Postkarte“: heller Grund, emotionale Headline oben, Foto als großes,
// abgerundetes Bild darunter – angelehnt an die Kundenvorlage (Navy + Regenbogen)
const navy = "#14213d";
const rainbowCss = "linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)";
const creatives = [
  { name: "06-einfach-du-4x5", width: 1080, height: 1350, pos: "55% 50%" },
  { name: "07-einfach-du-1x1", width: 1080, height: 1080, pos: "55% 45%" },
];

const html = (c) => {
  const sq = c.width === c.height;
  const m = sq ? 44 : 52;
  const head = sq ? 300 : 340;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:#fffaf3}
body{font-family:Montserrat,sans-serif;position:relative;color:${navy}}
.head{position:absolute;left:${m}px;right:${m}px;top:0;height:${head}px;display:flex;flex-direction:column;justify-content:center}
.kicker{display:flex;align-items:center;gap:14px;font-weight:800;font-size:${sq ? 23 : 25}px;letter-spacing:.2em;text-transform:uppercase}
.kicker i{display:block;width:72px;height:8px;border-radius:4px;background:${rainbowCss}}
h1{font-weight:800;font-size:${sq ? 70 : 78}px;line-height:1.08;margin-top:${sq ? 16 : 20}px;letter-spacing:-.01em}
h1 span{background:${rainbowCss};-webkit-background-clip:text;color:transparent}
.photo{position:absolute;left:${m}px;right:${m}px;top:${head}px;bottom:${m}px;border-radius:28px;
  background:url(${img("sunset-deck.jpg")}) ${c.pos}/cover no-repeat}
.label{position:absolute;left:${m + 28}px;bottom:${m + 28}px;background:#fffaf3;border-radius:60px;
  padding:16px 28px;font-weight:800;font-size:${sq ? 26 : 28}px}
.label b{color:#c98a2b}
</style></head><body>
<div class="head">
  <div class="kicker"><i></i>Spartacus Gay Cruise 2027</div>
  <h1>Eine Woche, in der<br>du einfach <span>du bist.</span></h1>
</div>
<div class="photo"></div>
<div class="label"><b>15.–22.10.2027</b> · Mallorca, Spanien &amp; Marokko</div>
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
