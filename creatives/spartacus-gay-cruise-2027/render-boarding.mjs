// Rendert das Spartacus-Banner im Konzept „Boarding Pass“ in 4:5 (1080x1350) und 1:1 (1080x1080)
// sowie je ein PDF für den Canva-Import.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render-boarding.mjs
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

// Konzept „Boarding Pass“: Foto randlos, darauf eine Bordkarte als einfarbige Karte
const navy = "#14213d";
const cream = "#fffaf3";
const rainbow = ["#e53b3b", "#f28c28", "#f7d23e", "#3cb371", "#3b82f6", "#8b5cf6"];
const creatives = [
  { name: "10-boarding-pass-4x5", width: 1080, height: 1350, pos: "55% 40%" },
  { name: "11-boarding-pass-1x1", width: 1080, height: 1080, pos: "55% 30%" },
];

// Barcode aus festen Strichbreiten (reproduzierbar, kein Zufall)
const bars = "3121412131421213114213121412"
  .split("")
  .map((w, i) => `<i style="width:${w * 3}px;background:${i % 2 ? "transparent" : navy}"></i>`)
  .join("");

const html = (c) => {
  const sq = c.width === c.height;
  const m = sq ? 40 : 48;
  const field = (k, v) => `<div class="f"><div class="k">${k}</div><div class="v">${v}</div></div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${c.width}px;height:${c.height}px;overflow:hidden;background:${navy}}
body{font-family:Montserrat,sans-serif;position:relative;color:${navy}}
.photo{position:absolute;inset:0;background:url(${img("sunset-deck.jpg")}) ${c.pos}/cover no-repeat}
.pass{position:absolute;left:${m}px;right:${m}px;bottom:${m}px;background:${cream};border-radius:22px;overflow:hidden;display:flex}
.stripe{display:flex;flex-direction:column;width:16px}
.stripe i{flex:1}
.main{flex:1;padding:${sq ? "28px 34px 30px" : "36px 40px 38px"}}
.top{display:flex;justify-content:space-between;align-items:center;font-weight:800;font-size:${sq ? 20 : 22}px;letter-spacing:.2em;text-transform:uppercase}
.top span:last-child{color:#c98a2b}
h1{font-weight:900;font-size:${sq ? 60 : 72}px;line-height:1.04;letter-spacing:-.02em;margin-top:${sq ? 14 : 18}px}
h1 span{background:linear-gradient(90deg,${rainbow.join(",")});-webkit-background-clip:text;color:transparent}
.route{display:flex;align-items:center;gap:20px;margin-top:${sq ? 18 : 26}px}
.route .code{font-weight:900;font-size:${sq ? 54 : 62}px;line-height:1}
.route .city{font-weight:700;font-size:${sq ? 20 : 22}px;color:#4a5568;margin-top:4px}
.route .line{flex:1;height:0;border-top:4px dotted rgba(20,33,61,.35);position:relative}
.route .line b{position:absolute;left:50%;top:-26px;transform:translateX(-50%);font-size:40px}
.fields{display:grid;grid-template-columns:.7fr 1fr 1.3fr;gap:12px;margin-top:${sq ? 18 : 26}px;padding-top:${sq ? 16 : 22}px;border-top:2px solid rgba(20,33,61,.12)}
.k{font-weight:800;font-size:${sq ? 16 : 18}px;letter-spacing:.16em;text-transform:uppercase;color:#8a94a6}
.v{font-weight:800;font-size:${sq ? 26 : 29}px;margin-top:4px}
.stub{width:${sq ? 210 : 230}px;border-left:4px dashed rgba(20,33,61,.25);display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:${sq ? "26px 18px" : "34px 20px"}}
.logo{width:${sq ? 130 : 150}px;height:${sq ? 130 : 150}px;border-radius:50%;object-fit:cover}
.bars{display:flex;height:${sq ? 86 : 110}px}
.bars i{display:block}
.seat{font-weight:900;font-size:${sq ? 22 : 24}px;text-align:center;letter-spacing:.06em}
</style></head><body>
<div class="photo"></div>
<div class="pass">
  <div class="stripe">${rainbow.map((col) => `<i style="background:${col}"></i>`).join("")}</div>
  <div class="main">
    <div class="top"><span>Boarding Pass</span><span>Spartacus Gay Cruise</span></div>
    <h1>Dein Ticket<br>in die <span>Freiheit.</span></h1>
    <div class="route">
      <div><div class="code">PMI</div><div class="city">Palma de Mallorca</div></div>
      <div class="line"><b>🚢</b></div>
      <div style="text-align:right"><div class="code">TNG</div><div class="city">Tanger, Marokko</div></div>
    </div>
    <div class="fields">${field("Passagier", "Du")}${field("Abfahrt", "15.10.2027")}${field("Schiff", "Vasco da Gama")}</div>
  </div>
  <div class="stub"><img class="logo" src="${img("starshine-logo.jpg")}"><div class="bars">${bars}</div><div class="seat">7 NÄCHTE</div></div>
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
