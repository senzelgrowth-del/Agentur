// Rendert die Bilder für organische Facebook/Instagram-Posts (4:5, 1080x1350)
// zu Spartacus Gay Cruise und Danzig. Texte dazu: ../organische-posts.md
// Aufruf: node creatives/organisch/render.mjs
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
const cream = "#fffaf3";
const navy = "#14213d";
const rainbowCss = "linear-gradient(90deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6)";

const page = (css, body) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${cream}}
body{font-family:Montserrat,sans-serif;position:relative;color:${navy}}
${css}
</style></head><body>${body}</body></html>`;

// ---------- Spartacus (gleicher Look wie die „Endlich du“-Creatives) ----------
const spartacusKicker = `<div class="kicker"><i></i>Spartacus Gay Cruise 2027</div>`;
const spartacusCss = `
.kicker{display:flex;align-items:center;justify-content:center;gap:14px;font-weight:800;font-size:25px;letter-spacing:.2em;text-transform:uppercase}
.kicker i{display:block;width:64px;height:8px;border-radius:4px;background:${rainbowCss}}
.rb{background:${rainbowCss};-webkit-background-clip:text;color:transparent}`;

const spartacus1 = page(
  spartacusCss +
    `
.head{position:absolute;left:48px;right:48px;top:0;height:420px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
h1{font-weight:900;font-size:84px;line-height:1.05;letter-spacing:-.02em;margin-top:26px}
.photo{position:absolute;left:48px;right:48px;top:420px;bottom:48px;border-radius:24px;background:url(${img("promenade-night.jpg")}) 60% 50%/cover no-repeat}`,
  `<div class="head">${spartacusKicker}<h1>Die schönsten<br>Freundschaften<br>beginnen <span class="rb">an Deck.</span></h1></div>
<div class="photo"></div>`,
);

const day = [
  ["10:00", "Frühstück mit Meerblick"],
  ["13:00", "Pool, Sauna &amp; Sonne"],
  ["17:00", "Tea Dance an Deck"],
  ["21:00", "Show &amp; Drag-Entertainment"],
  ["23:30", "DJ-Nacht bis zum Morgen"],
];
const spartacus2 = page(
  spartacusCss +
    `
.photo{position:absolute;left:48px;right:48px;top:48px;height:600px;border-radius:24px;background:url(${img("pool-glasdach.jpg")}) 40% 50%/cover no-repeat}
.body{position:absolute;left:48px;right:48px;top:690px;bottom:48px;display:flex;flex-direction:column;align-items:center;text-align:center}
h1{font-weight:900;font-size:66px;line-height:1.05;letter-spacing:-.02em;margin-top:22px}
ul{list-style:none;width:100%;margin-top:30px}
li{display:flex;align-items:center;gap:28px;padding:14px 30px;border-top:2px solid rgba(20,33,61,.1);font-weight:700;font-size:31px;text-align:left}
li:last-child{border-bottom:2px solid rgba(20,33,61,.1)}
li b{font-weight:900;width:120px;flex:0 0 auto}`,
  `<div class="photo"></div>
<div class="body">${spartacusKicker}<h1>So könnte <span class="rb">dein Tag</span><br>an Bord aussehen</h1>
<ul>${day.map(([t, s]) => `<li><b class="rb">${t}</b>${s}</li>`).join("")}</ul></div>`,
);

// Reichweiten-Formate: Abstimmungen bringen Kommentare und damit Reichweite
const ports = [
  ["Barcelona", "🇪🇸", "#e53b3b"],
  ["Valencia", "🍊", "#f28c28"],
  ["Alicante", "🏖️", "#e9b824"],
  ["Marbella", "🌴", "#3cb371"],
  ["Tanger", "🇲🇦", "#3b82f6"],
  ["Seetag", "🌊", "#8b5cf6"],
];
const spartacus3 = page(
  spartacusCss +
    `
.head{position:absolute;left:60px;right:60px;top:80px;text-align:center}
h1{font-weight:900;font-size:82px;line-height:1.04;letter-spacing:-.02em;margin-top:24px}
.grid{position:absolute;left:60px;right:60px;top:370px;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.tile{height:250px;border-radius:24px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:26px 30px}
.tile .e{font-size:58px;line-height:1}
.tile .n{font-weight:900;font-size:44px}
.tile .k{font-weight:800;font-size:22px;letter-spacing:.14em;text-transform:uppercase;opacity:.9}
.foot{position:absolute;left:60px;right:60px;bottom:90px;text-align:center;font-weight:800;font-size:34px}`,
  `<div class="head">${spartacusKicker}<h1>Welcher Stopp ist<br><span class="rb">dein Highlight?</span></h1></div>
<div class="grid">${ports
    .map(([n, e, col], i) => `<div class="tile" style="background:${col}"><span class="e">${e}</span><div><div class="k">Kommentiere ${i + 1}</div><div class="n">${n}</div></div></div>`)
    .join("")}</div>
<div class="foot">Stimm ab in den Kommentaren 👇</div>`,
);

const spartacus4 = page(
  spartacusCss +
    `
.head{position:absolute;left:48px;right:48px;top:0;height:300px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
h1{font-weight:900;font-size:80px;line-height:1.04;letter-spacing:-.02em;margin-top:22px}
.half{position:absolute;left:48px;right:48px;height:470px;border-radius:24px;overflow:hidden}
.h1{top:300px;background:url(${img("pool-glasdach.jpg")}) 40% 60%/cover no-repeat}
.h2{top:794px;background:url(${img("sunset-deck.jpg")}) 50% 75%/cover no-repeat}
.lab{position:absolute;left:28px;bottom:28px;background:${cream};border-radius:60px;padding:16px 30px;font-weight:900;font-size:40px}
.or{position:absolute;left:50%;top:782px;transform:translate(-50%,-50%);width:132px;height:132px;border-radius:50%;
  background:${navy};color:${cream};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:27px;letter-spacing:.04em;z-index:2;border:8px solid ${cream}}`,
  `<div class="head">${spartacusKicker}<h1>Pool-Tag <span class="rb">oder</span> Partynacht?</h1></div>
<div class="half h1"><span class="lab">☀️ 1 · Pool-Tag</span></div>
<div class="half h2"><span class="lab">🪩 2 · Partynacht</span></div>
<div class="or">ODER</div>`,
);

// CTA-Abschlussfolie für die Karussell-Posts 3 und 4 (gleiche Folie für beide),
// angelehnt an die Starshine-Vorlage: Logo-Badge, kurze Frage, große Aufforderung.
const logo = `<img class="logo" src="${img("starshine-logo.jpg")}">`;
const spartacusCta = page(
  `
html,body{background:radial-gradient(circle at 50% 42%,#fff6ea 0%,#fde3cf 55%,#f3cfd9 100%)}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 90px}
.ring{width:262px;height:262px;border-radius:50%;padding:11px;background:conic-gradient(#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6,#e53b3b)}
.logo{width:100%;height:100%;border-radius:50%;object-fit:cover;border:8px solid #fff;display:block}
.q{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:54px;margin-top:64px;color:#e8553d}
h1{font-weight:900;font-size:112px;line-height:1.02;letter-spacing:-.02em;margin-top:18px;color:${navy}}
.sub{font-weight:600;font-size:36px;line-height:1.45;margin-top:36px;color:#4a5568}`,
  `<div class="wrap">
  <div class="ring">${logo}</div>
  <div class="q">Lust auf Meer?</div>
  <h1>Schreib uns<br>einfach!</h1>
  <div class="sub">Ganz unverbindlich – alle Infos<br>zur Cruise direkt per Nachricht.</div>
</div>`,
);

// ---------- Danzig (ohne Foto: gezeichnete Giebelhaus-Skyline als Bildmotiv) ----------
const brick = "#a63d2a";
const ochre = "#e0a43b";
const teal = "#2f7f7a";
const sea = "#1d3557";
const sandD = "#f4ead9";

// Stilisierte Danziger Giebelhäuser: [Breite, Höhe, Farbe, Giebel]
const houses = [
  [130, 430, brick, "step"],
  [110, 500, ochre, "round"],
  [140, 460, teal, "step"],
  [100, 540, "#f1d3b3", "point"],
  [130, 470, brick, "round"],
  [120, 520, "#e8c27a", "step"],
  [110, 450, teal, "point"],
  [140, 500, "#c96f4a", "round"],
];
const skyline = (height, scale = 1) => {
  let x = 0;
  const parts = houses.map(([w, h0, col, g]) => {
    const h = h0 * scale;
    const top = height - h;
    const gable =
      g === "step"
        ? `<path d="M${x} ${top} h${w * 0.2} v-30 h${w * 0.2} v-30 h${w * 0.2} v30 h${w * 0.2} v30 h${w * 0.2} Z" fill="${col}"/>`
        : g === "round"
          ? `<path d="M${x} ${top} C ${x} ${top - 70}, ${x + w} ${top - 70}, ${x + w} ${top} Z" fill="${col}"/>`
          : `<path d="M${x} ${top} L${x + w / 2} ${top - 80} L${x + w} ${top} Z" fill="${col}"/>`;
    let windows = "";
    for (let wy = top + 40; wy + 44 < height - 100; wy += 78) {
      windows += `<rect x="${x + w * 0.2}" y="${wy}" width="${w * 0.22}" height="44" rx="4" fill="${cream}" opacity=".9"/>`;
      windows += `<rect x="${x + w * 0.58}" y="${wy}" width="${w * 0.22}" height="44" rx="4" fill="${cream}" opacity=".9"/>`;
    }
    const door = `<rect x="${x + w * 0.36}" y="${height - 78}" width="${w * 0.28}" height="78" rx="${w * 0.14}" fill="${navy}" opacity=".85"/>`;
    const svg = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/>${gable}${windows}${door}`;
    x += w;
    return svg;
  });
  return `<svg viewBox="0 0 ${x} ${height}" width="${W}" preserveAspectRatio="none" style="display:block">${parts.join("")}</svg>`;
};

const danzigCss = `
html,body{background:${sandD}}
.kicker{font-weight:800;font-size:25px;letter-spacing:.3em;text-transform:uppercase;color:${brick};padding-left:.3em}
.sea{position:absolute;left:0;right:0;bottom:0;background:${sea}}
.waves{position:absolute;left:0;right:0;display:flex;flex-direction:column;gap:22px;padding:0 60px}
.waves i{display:block;height:6px;border-radius:3px;background:#457b9d}`;

const danzig1 = page(
  danzigCss +
    `
.head{position:absolute;left:60px;right:60px;top:110px;text-align:center}
h1{font-family:'Playfair Display',serif;font-weight:800;font-size:200px;line-height:1;margin-top:18px;color:${navy}}
.tag{font-weight:700;font-size:40px;line-height:1.3;margin-top:22px;color:${navy}}
.tag b{color:${brick};font-weight:800}
.sky{position:absolute;left:0;right:0;bottom:200px}
.sea{height:200px}
.waves{bottom:60px}`,
  `<div class="head"><div class="kicker">Ostsee · Polen</div><h1>Danzig</h1>
<div class="tag">Wo <b>Hanse-Charme</b><br>auf Ostseeluft trifft.</div></div>
<div class="sky">${skyline(560)}</div>
<div class="sea"></div><div class="waves"><i style="width:60%"></i><i style="width:40%;margin-left:30%"></i><i style="width:55%;margin-left:12%"></i></div>`,
);

const reasons = [
  ["Langer Markt", "bunte Giebelhäuser &amp; Neptunbrunnen"],
  ["Marienkirche", "eine der größten Backsteinkirchen der Welt"],
  ["Krantor", "Wahrzeichen an der Mottlau"],
  ["Sopot", "die längste Holzseebrücke Europas"],
  ["Pierogi", "polnische Küche zum Verlieben"],
];
const danzig2 = page(
  danzigCss +
    `
.head{position:absolute;left:70px;right:70px;top:80px}
h1{font-family:'Playfair Display',serif;font-weight:800;font-size:80px;line-height:1.05;margin-top:14px;color:${navy}}
h1 b{color:${brick}}
ol{list-style:none;position:absolute;left:70px;right:70px;top:360px}
li{display:flex;align-items:flex-start;gap:26px;padding:20px 0;border-top:2px solid rgba(20,33,61,.12)}
li:last-child{border-bottom:2px solid rgba(20,33,61,.12)}
li .n{flex:0 0 64px;height:64px;border-radius:50%;background:${brick};color:${cream};font-weight:900;font-size:32px;display:flex;align-items:center;justify-content:center}
li .t{font-weight:900;font-size:36px;line-height:1.15}
li .d{font-weight:600;font-size:28px;line-height:1.3;color:#4a5568;margin-top:4px}
.sky{position:absolute;left:0;right:0;bottom:70px}
.sea{height:70px}`,
  `<div class="head"><div class="kicker">Danzig</div><h1><b>5 Gründe</b>, warum<br>Sie Danzig lieben werden</h1></div>
<ol>${reasons.map(([t, d], i) => `<li><span class="n">${i + 1}</span><div><div class="t">${t}</div><div class="d">${d}</div></div></li>`).join("")}</ol>
<div class="sky">${skyline(260, 0.45)}</div><div class="sea"></div>`,
);

// Silvester in Danzig: Kundenfoto (Speicherstadt an der Mottlau bei Nacht), die im
// Original eingebrannte Schrift wurde aus dem Himmel entfernt. Oben wird der Himmel
// mit seiner eigenen Farbe (#281b2d) verlängert – dort steht der Titel.
const sky = "#281b2d";
const danzig3 = page(
  `
html,body{background:${sky}}
.photo{position:absolute;left:0;right:0;bottom:0;height:1080px;background:url(${img("danzig-mottlau-nacht.jpg")}) 50% 100%/cover no-repeat}
.head{position:absolute;left:40px;right:40px;top:56px;text-align:center;color:#fff7ea}
.kicker{font-weight:800;font-size:25px;letter-spacing:.32em;text-transform:uppercase;color:#f4c46a;padding-left:.32em}
h1{font-family:'Playfair Display',serif;font-weight:800;font-size:100px;line-height:1;margin-top:14px;white-space:nowrap}
h1 span{color:#f4c46a}
.sub{font-weight:700;font-size:32px;line-height:1.35;margin-top:16px;color:rgba(255,247,234,.92)}`,
  `<div class="photo"></div>
<div class="head"><div class="kicker">✨ Jahreswechsel an der Ostsee ✨</div>
<h1>Silvester in <span>Danzig</span></h1>
<div class="sub">Lichter über der Mottlau, Feuerwerk um Mitternacht.</div></div>`,
);

const posts = [
  ["spartacus-1-freundschaften-an-deck", spartacus1],
  ["spartacus-2-dein-tag-an-bord", spartacus2],
  ["spartacus-3-welcher-stopp", spartacus3],
  ["spartacus-4-pool-oder-party", spartacus4],
  ["spartacus-cta-abschluss", spartacusCta],
  ["danzig-1-hanse-charme", danzig1],
  ["danzig-2-fuenf-gruende", danzig2],
  ["danzig-3-silvester", danzig3],
];

const browser = await chromium.launch();
for (const [name, html] of posts) {
  const p = await browser.newPage({ viewport: { width: W, height: H } });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const png = join(out, `${name}.png`);
  await p.screenshot({ path: png });
  await p.close();
  // Ein-Seiten-PDF mit exakter Seitengröße für den Canva-Import
  execSync(
    `python3 -c "import sys; from PIL import Image; Image.open(sys.argv[1]).convert('RGB').save(sys.argv[2], resolution=96.0)" ` +
      `"${png}" "${join(out, `${name}.pdf`)}"`,
  );
  console.log("✓", name);
}
await browser.close();
