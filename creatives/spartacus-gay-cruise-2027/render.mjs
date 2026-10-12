// Rendert die Meta-Ads-Creatives (4:5, 1080x1350) aus den Fotos in ./src.
// Aufruf: node creatives/spartacus-gay-cruise-2027/render.mjs
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
  const globalRoot = execSync("npm root -g").toString().trim();
  ({ chromium } = require(join(globalRoot, "playwright")));
}

const dir = dirname(fileURLToPath(import.meta.url));
const out = join(dir, "export");
mkdirSync(out, { recursive: true });

const img = (f) =>
  `data:image/jpeg;base64,${readFileSync(join(dir, "src", f)).toString("base64")}`;

const creatives = [
  {
    file: "01-zwischen-den-kontinenten.png",
    photo: "sunset-deck.jpg",
    pos: "58% 50%",
    accent: "#f4b860",
    eyebrow: "Zwischen den Kontinenten",
    headline: "Europa & Marokko<br>in einer Woche",
    body: "Palma · Barcelona · Valencia · Alicante · Marbella · Tanger",
    chips: ["8 Tage", "Vollpension", "Shows & Partys"],
    price: true,
    cta: "Frühbucherpreis sichern",
  },
  {
    file: "02-shows-djs-drag.png",
    photo: "promenade-night.jpg",
    pos: "62% 50%",
    accent: "#7fc8ff",
    eyebrow: "Entertainment inklusive",
    headline: "Jede Nacht<br>eine neue Party",
    body: "Tante Gladice · Nelson Cerqueira · Abby OMG · Poppy Downes u.v.m.",
    chips: ["DJ-Nächte", "Drag-Shows", "Tea Dances"],
    price: false,
    cta: "Jetzt Kabine sichern",
  },
  {
    file: "03-alles-inklusive.png",
    photo: "pool-glasdach.jpg",
    pos: "40% 50%",
    accent: "#f4b860",
    eyebrow: "Vasco da Gama · Pool mit Glasdach",
    headline: "Pool, Sauna, Vollpension –<br>alles schon drin",
    body: "Inkl. Hafengebühren & deutschsprachigem Service",
    chips: ["−10 % bis 01.11.2026", "Single Match"],
    price: true,
    cta: "Frühbucherpreis sichern",
  },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600;1,700&family=Montserrat:wght@500;600;700;800&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;background:#0b1a33}
body{font-family:Montserrat,sans-serif;color:#fff;position:relative}
.photo{position:absolute;inset:0;background:url(${img(c.photo)}) ${c.pos}/cover no-repeat}
.top{position:absolute;left:0;right:0;top:0;height:560px;
  background:linear-gradient(180deg,rgba(6,16,36,.82) 0%,rgba(6,16,36,.55) 45%,rgba(6,16,36,0) 100%)}
.bottom{position:absolute;left:0;right:0;bottom:0;height:760px;
  background:linear-gradient(0deg,rgba(6,16,36,.94) 0%,rgba(6,16,36,.82) 42%,rgba(6,16,36,0) 100%)}
.title{position:absolute;top:64px;left:0;right:0;text-align:center}
.kicker{font-weight:700;font-size:22px;letter-spacing:.42em;text-transform:uppercase;color:${c.accent};padding-left:.42em}
.brand{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:132px;line-height:1;margin-top:14px;
  text-shadow:0 4px 30px rgba(0,0,0,.45)}
.sub{font-weight:800;font-size:40px;letter-spacing:.34em;text-transform:uppercase;margin-top:10px;padding-left:.34em;
  text-shadow:0 2px 18px rgba(0,0,0,.5)}
.rainbow{width:220px;height:5px;margin:26px auto 0;border-radius:3px;
  background:linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)}
.content{position:absolute;left:72px;right:72px;bottom:72px;text-align:center}
.eyebrow{font-weight:700;font-size:24px;letter-spacing:.24em;text-transform:uppercase;color:${c.accent}}
h2{font-family:'Playfair Display',serif;font-style:italic;font-weight:600;font-size:68px;line-height:1.08;margin-top:16px}
.body{font-weight:500;font-size:27px;line-height:1.4;margin-top:20px;color:rgba(255,255,255,.9)}
.chips{display:flex;justify-content:center;gap:14px;margin-top:28px;flex-wrap:wrap}
.chip{font-weight:600;font-size:23px;padding:11px 22px;border:1.5px solid rgba(255,255,255,.55);border-radius:40px;
  background:rgba(255,255,255,.08)}
.row{display:flex;justify-content:center;align-items:center;gap:30px;margin-top:36px}
.price{text-align:left;line-height:1.05}
.price small{display:block;font-weight:600;font-size:20px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.price b{font-weight:800;font-size:54px;color:${c.accent}}
.price s{font-weight:500;font-size:24px;color:rgba(255,255,255,.6);margin-left:10px}
.cta{font-weight:800;font-size:27px;letter-spacing:.03em;padding:24px 40px;border-radius:60px;
  background:${c.accent};color:#0b1a33;box-shadow:0 10px 30px rgba(0,0,0,.35)}
</style></head><body>
<div class="photo"></div><div class="top"></div><div class="bottom"></div>
<div class="title">
  <div class="kicker">15.–22. Oktober 2027</div>
  <div class="brand">Spartacus</div>
  <div class="sub">Gay Cruise 2027</div>
  <div class="rainbow"></div>
</div>
<div class="content">
  <div class="eyebrow">${c.eyebrow}</div>
  <h2>${c.headline}</h2>
  <div class="body">${c.body}</div>
  <div class="chips">${c.chips.map((t) => `<span class="chip">${t}</span>`).join("")}</div>
  <div class="row">
    ${c.price ? `<div class="price"><small>p.P. ab</small><b>1.214 €</b><s>1.349 €</s></div>` : ""}
    <div class="cta">${c.cta} →</div>
  </div>
</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const c of creatives) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, c.file) });
  console.log("✓", c.file);
}
await browser.close();
