// Runde 3: Einzelposts (4:5) – je 2 pro Kampagne, im Hausstil der erfolgreichen Bestandsposts
// (siehe creatives/brand/STYLEGUIDE.md). Fotos von den Landingpages (src/web-*.jpg).
// Aufruf: node creatives/organisch/render-r3.mjs
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, rainbowRule, RAINBOW_CSS, THEMES, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const { spartacus: SP, karlmay: KM, schlager: SL, danzig: DZ } = THEMES;

// Wiederkehrende Bausteine der Bestandsposts
const rainbowPill = (html, size = 40) =>
  `<div style="display:inline-block;padding:4px;border-radius:80px;background:${RAINBOW_CSS}">
<div style="background:#fff;border-radius:80px;padding:14px 40px;font-weight:700;font-size:${size}px;color:${SP.ink};white-space:nowrap">${html}</div></div>`;
// Preis als Schallplatte (Schlager)
const vinyl = (css) =>
  `<div style="position:absolute;${css};width:340px;height:340px;border-radius:50%;background:#141414;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 26px #1d1d1d,inset 0 0 0 30px #141414,inset 0 0 0 56px #1d1d1d,inset 0 0 0 60px #141414">
<div style="width:200px;height:200px;border-radius:50%;background:${SL.accent};color:#fff;font-family:Fredoka;font-weight:700;text-align:center;display:flex;flex-direction:column;justify-content:center;line-height:1.05">
<span style="font-size:32px">ab</span><span style="font-size:52px">1.299 €</span><span style="font-size:22px;font-family:Montserrat;font-weight:700;margin-top:6px">inkl. Vollpension</span></div></div>`;
// Fredoka mit dunkler Kontur (Schlager-Titel)
const outline = `font-family:Fredoka;font-weight:700;color:#fff;-webkit-text-stroke:14px ${SL.ink};paint-order:stroke fill;line-height:1.02`;

const posts = [
  // ---------- Spartacus ----------
  {
    name: "r3-spartacus-zwischen-den-kontinenten",
    html: page(
      `body{background:#fff;color:${SP.ink};text-align:center}
.ph{position:absolute;left:0;right:0;top:0;height:920px;background:url(${img("web-spartacus-schiff-insel.jpg")}) 50% 62%/cover}
.tx{position:absolute;left:30px;right:30px;top:982px}
h1{font-weight:800;font-size:70px;letter-spacing:-.01em;line-height:1.05;white-space:nowrap}
.sub{font-weight:600;font-size:46px;color:${SP.sub};margin:14px 0 30px}`,
      `<div class="ph"></div>${rainbowRule("position:absolute;left:0;right:0;top:920px;height:10px")}
<div class="tx"><h1>Spartacus Gay Cruise <span class="rb">2027</span></h1><div class="sub">Zwischen den Kontinenten.</div>
${rainbowPill("15.–22.10.2027 · Mallorca – Marokko", 34)}</div>`,
    ),
  },
  {
    name: "r3-spartacus-sonne-an-deck",
    html: page(
      `body{background:#fff;color:${SP.ink}}
.tx{position:absolute;left:64px;right:64px;top:70px}
h1{font-weight:900;font-size:112px;line-height:1;letter-spacing:-.02em}
.sub{font-weight:700;font-size:38px;margin-top:22px;color:${SP.sub}}
.ph{position:absolute;left:0;right:0;bottom:0;height:880px;background:url(${img("web-spartacus-oasis-pool.jpg")}) 40% 62%/cover}
.pill{position:absolute;left:0;right:0;bottom:64px;text-align:center}`,
      `<div class="tx"><h1>Sonne tanken.<br><span class="rb">Du selbst sein.</span></h1><div class="sub">Spartacus Gay Cruise 2027</div></div>
${rainbowRule("position:absolute;left:0;right:0;bottom:880px;height:10px")}<div class="ph"></div>
<div class="pill">${rainbowPill("ab <b style='font-size:52px;font-weight:800'>1.349 €</b> · inkl. Vollpension", 36)}</div>`,
    ),
  },
  // ---------- Schlager ----------
  {
    name: "r3-schlager-eine-woche-auf-see",
    html: page(
      `.ph{position:absolute;inset:0;background:url(${img("web-schlager-deck-party.jpg")}) 45% 70%/cover}
.tx{position:absolute;left:56px;top:56px}
h1{${outline};font-size:118px}
h1 span{color:${SL.accent}}
.sub{${outline};-webkit-text-stroke-width:10px;font-size:54px;margin-top:10px}`,
      `<div class="ph"></div><div class="tx"><h1>Eine Woche<br><span>Schlager pur!</span></h1><div class="sub">Schlager-Seereise 2027</div></div>
${vinyl("right:48px;bottom:56px")}`,
    ),
  },
  {
    name: "r3-schlager-jeden-abend-live",
    html: page(
      `.ph{position:absolute;inset:0;background:url(${img("web-schlager-konzert.jpg")}) 45% 50%/cover}
.tx{position:absolute;left:56px;right:56px;bottom:64px}
h1{${outline};font-size:124px}
h1 span{color:${SL.accent}}
.sub{${outline};-webkit-text-stroke-width:10px;font-size:52px;margin-top:12px}`,
      `<div class="ph"></div>${vinyl("right:48px;top:56px")}
<div class="tx"><h1>Jeden Abend<br><span>live dabei!</span></h1><div class="sub">Über 30 Schlagerstars an Bord</div></div>`,
    ),
  },
  // ---------- Karl May ----------
  {
    name: "r3-karlmay-sommer-im-wilden-westen",
    html: page(
      `.ph{position:absolute;left:0;right:0;top:0;height:910px;background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 70%/cover}
.band{position:absolute;left:0;right:0;bottom:0;height:440px;background:${KM.ink};color:${KM.paper};padding:60px 72px 0}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:82px;line-height:1.08;white-space:nowrap}
.sub{font-family:Roboto;font-weight:700;font-size:42px;margin-top:36px;color:#fff}`,
      `<div class="ph"></div><div class="band"><h1>Ein Sommertag im<br>Wilden Westen.</h1>
<div class="sub">Karl-May-Spiele 2027 · ab 399 € p. P.</div></div>
<img class="logo" src="${LOGO}" style="right:40px;top:36px;width:160px;height:160px">`,
    ),
  },
  {
    name: "r3-karlmay-finale-am-kalkberg",
    html: page(
      `body{background:${KM.ink};color:${KM.paper};text-align:center}
.tx{position:absolute;left:40px;right:40px;top:70px}
.label{color:${KM.accent};letter-spacing:.3em}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:104px;line-height:1.05;margin-top:20px}
.sub{font-family:Roboto;font-weight:700;font-size:40px;margin-top:22px;color:#fff}
.ph{position:absolute;left:0;right:0;bottom:0;height:880px;background:url(${img("web-karlmay-feuerwerk.jpg")}) 50% 40%/cover}`,
      `<div class="tx"><div class="label">Bad Segeberg 2027</div><h1>Das große Finale</h1>
<div class="sub">19.07.2027 · Abendvorstellung mit Feuerwerk</div></div><div class="ph"></div>`,
    ),
  },
  // ---------- Danzig ----------
  {
    name: "r3-danzig-silvester-feuerwerk",
    html: page(
      `body{background:${DZ.ink};text-align:center}
.tx{position:absolute;left:40px;right:40px;top:64px}
h1{font-family:'DM Serif Display';font-weight:400;font-size:130px;line-height:.95;color:${DZ.paper}}
h1 span{color:${DZ.accent}}
.pill{display:inline-block;margin-top:30px;background:${DZ.accent};color:${DZ.ink};border-radius:60px;padding:16px 40px;font-weight:700;font-size:38px}
.ph{position:absolute;left:0;right:0;bottom:0;height:840px;background:url(${img("web-danzig-feuerwerk.jpg")}) 50% 50%/cover}`,
      `<div class="tx"><h1>Silvester<br><span>in Danzig</span></h1><div class="pill">30.12. – 02.01. · Schlagergala</div></div><div class="ph"></div>`,
    ),
  },
  {
    name: "r3-danzig-heiko-andy",
    html: page(
      `body{background:#fff;color:${DZ.ink};text-align:center}
.ph{position:absolute;left:0;right:0;top:40px;height:700px;background:url(${img("web-danzig-heiko-andy.jpg")}) 50% 40%/contain no-repeat}
.tx{position:absolute;left:40px;right:40px;top:770px}
.k{display:inline-block;background:#e8711c;color:#fff;font-weight:800;font-size:36px;padding:14px 36px;border-radius:60px}
h1{font-family:'DM Serif Display';font-weight:400;font-size:118px;line-height:1;margin-top:26px}
h1 span{color:#e8711c}
.info{margin-top:26px;font-size:40px}`,
      `<div class="ph"></div><div class="tx"><div class="k">Silvester-Schlagergala</div>
<h1>Mit <span>Heiko &amp; Andy</span><br>in Danzig</h1><div class="info">30.12. – 02.01. · ab 789 € p. P.</div></div>
<img class="logo" src="${LOGO}" style="left:40px;top:40px;width:130px;height:130px">`,
    ),
  },
];

await render(posts, join(dir, "export"));
