// Runde 3: seriöse, hochwertige Einzelposts (4:5, 1080x1350) – je 2 pro Kampagne.
// Fotos stammen von den Landingpages auf starshine-emotions.com (src/web-*.jpg).
// Jeder Post mit eigenem Layout; Schrift mindestens 30 px, keine Schatten, Starshine-Logo.
// Aufruf: node creatives/organisch/render-r3.mjs
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

const W = 1080;
const H = 1350;
const RB = "linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)";
const logo = (css) => `<img src="${img("starshine-logo.jpg")}" style="position:absolute;width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #fff;${css}">`;
const page = (fonts, css, body) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=${fonts}&family=Montserrat:wght@600;700;800;900&display=block" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Montserrat,sans-serif;position:relative}${css}</style></head><body>${body}</body></html>`;

// Jeder Post hat ein eigenes Layout – gemeinsam sind nur Logo, Mindestschriftgröße (30 px) und die Reisefarben.
const posts = [
  // Danzig 1: Foto oben, darunter zentriert und festlich auf Nachtblau
  ["r3-danzig-silvester-feuerwerk", page("DM+Serif+Display:ital@0;1",
    `body{background:#1b1427;color:#fbf3e6;text-align:center}
.ph{position:absolute;left:0;right:0;top:0;height:760px;background:url(${img("web-danzig-feuerwerk.jpg")}) 50% 50%/cover}
.tx{position:absolute;left:60px;right:60px;top:820px}
h1{font-family:'DM Serif Display',serif;font-weight:400;font-size:128px;line-height:1}
h1 em{color:#f2c879}
.d{font-weight:700;font-size:42px;margin-top:36px;color:#f2c879;letter-spacing:.04em}
.s{font-weight:600;font-size:36px;margin-top:14px;opacity:.9}`,
    `<div class="ph"></div><div class="tx"><h1>Ins neue Jahr<br><em>in Danzig</em></h1>
<div class="d">30.12.2026 – 02.01.2027</div><div class="s">Galadinner mit Open Bar</div></div>${logo("right:40px;top:40px")}`)],

  // Danzig 2: heller, fröhlicher Look passend zum weißen Pressefoto
  ["r3-danzig-heiko-andy", page("DM+Serif+Display:ital@0;1",
    `body{background:#fff;color:#2a1a33;text-align:center}
.ph{position:absolute;left:0;right:0;top:40px;height:720px;background:url(${img("web-danzig-heiko-andy.jpg")}) 50% 30%/contain no-repeat}
.tx{position:absolute;left:60px;right:60px;top:800px}
.k{display:inline-block;background:#e8711c;color:#fff;font-weight:800;font-size:36px;padding:14px 34px;border-radius:60px}
h1{font-family:'DM Serif Display',serif;font-weight:400;font-size:116px;line-height:1.02;margin-top:32px}
h1 em{color:#e8711c}
.d{font-weight:700;font-size:40px;margin-top:30px}`,
    `<div class="ph"></div><div class="tx"><div class="k">Silvester-Schlagergala</div>
<h1>Mit <em>Heiko &amp; Andy</em><br>in Danzig</h1><div class="d">30.12. – 02.01. · ab 789 € p. P.</div></div>${logo("left:40px;top:40px;border-color:#f3e7d8")}`)],

  // Karl May 1: Foto randlos, Titelblock unten links (einfarbig, kein Verlauf)
  ["r3-karlmay-finale-am-kalkberg", page("Bebas+Neue",
    `.ph{position:absolute;inset:0;background:url(${img("web-karlmay-feuerwerk.jpg")}) 50% 40%/cover}
.box{position:absolute;left:56px;bottom:64px;background:#3b1d0e;color:#f5e4c3;padding:34px 44px 36px;border-radius:16px}
h1{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:120px;line-height:.95}
h1 span{color:#f2b544}
.d{font-weight:700;font-size:34px;margin-top:18px}`,
    `<div class="ph"></div><div class="box"><h1>Das große<br><span>Finale</span></h1>
<div class="d">19.07.2027 · mit Feuerwerk</div></div>${logo("right:48px;top:48px")}`)],

  // Karl May 2: Tagesfoto randlos, sandfarbene Karte oben, Preis-Etikett unten
  ["r3-karlmay-sommer-im-wilden-westen", page("Bebas+Neue",
    `.ph{position:absolute;inset:0;background:url(${img("web-karlmay-arena-tag.jpg")}) 55% 60%/cover}
.card{position:absolute;left:56px;right:56px;top:56px;background:#f5e4c3;color:#3b1d0e;border-radius:18px;padding:34px 40px 36px;text-align:center}
h1{font-family:'Bebas Neue',sans-serif;font-weight:400;font-size:104px;line-height:.98}
h1 span{color:#c4561f}
.d{font-weight:700;font-size:34px;margin-top:14px}
.p{position:absolute;left:56px;bottom:64px;background:#c4561f;color:#fff;border-radius:60px;padding:18px 36px;font-weight:900;font-size:40px}`,
    `<div class="ph"></div><div class="card"><h1>Ein Sommertag im<br><span>Wilden Westen</span></h1>
<div class="d">Karl-May-Spiele Bad Segeberg 2027</div></div><div class="p">399 € p. P.</div>${logo("right:48px;bottom:48px")}`)],

  // Schlager 1: Foto randlos, kräftiges Korallen-Band unten mit Schwungschrift
  ["r3-schlager-eine-woche-auf-see", page("Pacifico",
    `.ph{position:absolute;left:0;right:0;top:0;height:960px;background:url(${img("web-schlager-deck-party.jpg")}) 40% 60%/cover}
.band{position:absolute;left:0;right:0;bottom:0;height:390px;background:#ff6b6b;color:#fff;text-align:center;padding-top:44px}
h1{font-family:Pacifico,cursive;font-weight:400;font-size:84px;line-height:1.3}
.d{font-weight:800;font-size:36px;margin-top:10px;color:#2b0f33}`,
    `<div class="ph"></div><div class="band"><h1>Eine Woche<br>Schlager auf See</h1><div class="d">Costa Deliziosa · Oktober 2027</div></div>${logo("right:40px;top:40px")}`)],

  // Schlager 2: Konzertfoto im Rahmen auf Pflaume, Titel darunter in Sonnengelb
  ["r3-schlager-jeden-abend-live", page("Pacifico",
    `body{background:#2b0f33;color:#fff;text-align:center}
.ph{position:absolute;left:48px;right:48px;top:48px;height:840px;border-radius:28px;background:url(${img("web-schlager-konzert.jpg")}) 45% 50%/cover}
.tx{position:absolute;left:60px;right:60px;top:920px}
h1{font-family:Pacifico,cursive;font-weight:400;font-size:100px;line-height:1.3;color:#ffd166}
.d{font-weight:700;font-size:36px;margin-top:14px}`,
    `<div class="ph"></div><div class="tx"><h1>Jeden Abend live</h1><div class="d">Über 30 Schlagerstars an Bord</div></div>${logo("right:72px;top:72px")}`)],

  // Spartacus 1: Luftbild randlos, Text direkt im klaren Himmel
  ["r3-spartacus-zwischen-den-kontinenten", page("DM+Serif+Display",
    `.ph{position:absolute;inset:0;background:url(${img("web-spartacus-schiff-insel.jpg")}) 50% 70%/cover}
.tx{position:absolute;left:0;right:0;top:80px;text-align:center;color:#14213d}
h1{font-weight:900;font-size:92px;line-height:1.02;letter-spacing:-.02em}
h1 span{background:${RB};-webkit-background-clip:text;color:transparent}
.d{display:inline-block;margin-top:26px;background:#14213d;color:#fff;border-radius:60px;padding:14px 34px;font-weight:800;font-size:34px}`,
    `<div class="ph"></div><div class="tx"><h1>Zwischen den<br><span>Kontinenten</span></h1>
<div class="d">Spartacus Gay Cruise · 15.–22.10.2027</div></div>${logo("right:48px;bottom:48px")}`)],

  // Spartacus 2: heller Grund, großer Titel links, Foto abgerundet unten
  ["r3-spartacus-sonne-an-deck", page("DM+Serif+Display",
    `body{background:#fffaf3;color:#14213d}
.tx{position:absolute;left:64px;right:64px;top:70px}
h1{font-weight:900;font-size:96px;line-height:1.02;letter-spacing:-.02em}
h1 span{background:${RB};-webkit-background-clip:text;color:transparent}
.bar{width:140px;height:10px;border-radius:5px;background:${RB};margin-top:30px}
.d{font-weight:700;font-size:34px;margin-top:24px}
.ph{position:absolute;left:48px;right:48px;top:480px;bottom:48px;border-radius:28px;background:url(${img("web-spartacus-oasis-pool.jpg")}) 40% 60%/cover}`,
    `<div class="tx"><h1>Sonne tanken.<br><span>Du selbst sein.</span></h1><div class="bar"></div>
<div class="d">Spartacus Gay Cruise 2027 · Vasco da Gama</div></div><div class="ph"></div>${logo("right:72px;bottom:72px")}`)],
];

const browser = await chromium.launch();
for (const [name, html] of posts) {
  const p = { name };
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const png = join(out, `${p.name}.png`);
  await page.screenshot({ path: png });
  await page.close();
  console.log("✓", p.name);
}
await browser.close();
