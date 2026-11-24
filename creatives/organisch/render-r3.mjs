// Runde 3: hochwertige Einzelposts (4:5) – je 2 pro Kampagne, gerendert mit dem Stilpaket
// (creatives/brand/style). Fotos von den Landingpages auf starshine-emotions.com (src/web-*.jpg).
// Jeder Post nutzt eine andere Layout-Vorlage aus dem Styleguide.
// Aufruf: node creatives/organisch/render-r3.mjs
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, rainbowRule, THEMES, TYPE, MARGIN as M, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const { spartacus: SP, karlmay: KM, schlager: SL, danzig: DZ } = THEMES;

const posts = [
  // Vorlage „Gerahmt“: Foto mit Rand auf Nachtblau, Text linksbündig darunter
  {
    name: "r3-danzig-silvester-feuerwerk",
    html: page(
      `body{background:${DZ.ink};color:${DZ.paper}}
.ph{position:absolute;left:${M}px;right:${M}px;top:${M}px;height:624px;background:url(${img("web-danzig-feuerwerk.jpg")}) 50% 50%/cover}
.tx{position:absolute;left:${M}px;right:${M}px;top:752px}
.label{color:${DZ.accent}}
h1{font-size:${TYPE.h1}px;line-height:.98;margin-top:22px}
h1 em{color:${DZ.accent}}
.info{margin-top:30px;opacity:.88}`,
      `<div class="ph"></div><div class="tx"><div class="label">Silvester an der Ostsee</div>
<h1 class="serif">Ins neue Jahr<br><em>in Danzig</em></h1>
<div class="info">30.12.2026 – 02.01.2027<br>Galadinner mit Open Bar</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;bottom:${M}px">`,
    ),
  },
  // Vorlage „Hell“: Pressefoto auf Weiß, zentrierte Typografie
  {
    name: "r3-danzig-heiko-andy",
    html: page(
      `body{background:#fff;color:${DZ.ink};text-align:center}
.ph{position:absolute;left:0;right:0;top:56px;height:700px;background:url(${img("web-danzig-heiko-andy.jpg")}) 50% 40%/contain no-repeat}
.tx{position:absolute;left:${M}px;right:${M}px;top:820px}
.label{color:#c8631f}
h1{font-size:124px;line-height:1;margin-top:26px}
h1 em{color:#c8631f}
.info{margin-top:34px}`,
      `<div class="ph"></div><div class="tx"><div class="label">Silvester-Schlagergala · Danzig</div>
<h1 class="serif">Mit <em>Heiko &amp; Andy</em><br>ins neue Jahr</h1>
<div class="info">30.12.2026 – 02.01.2027 · ab 789 € p. P.</div></div>
<img class="logo" src="${LOGO}" style="left:${M}px;top:${M}px">`,
    ),
  },
  // Vorlage „Block“: Foto randlos, einfarbiger Titelblock unten links
  {
    name: "r3-karlmay-finale-am-kalkberg",
    html: page(
      `.ph{position:absolute;inset:0;background:url(${img("web-karlmay-feuerwerk.jpg")}) 50% 40%/cover}
.box{position:absolute;left:${M}px;bottom:${M}px;background:${KM.ink};color:${KM.paper};padding:44px 52px 46px}
.label{color:#e0a15e}
h1{font-family:Poster;font-weight:700;font-size:${TYPE.poster}px;line-height:.9;letter-spacing:.01em;margin-top:18px;text-transform:uppercase}
.info{margin-top:22px}`,
      `<div class="ph"></div><div class="box"><div class="label">Karl-May-Spiele 2027</div>
<h1>Das große<br>Finale</h1><div class="info">19.07.2027 · mit Feuerwerk</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;top:${M}px">`,
    ),
  },
  // Vorlage „Himmel“: Foto randlos, Titel im ruhigen Himmel, Infoleiste unten
  {
    name: "r3-karlmay-sommer-im-wilden-westen",
    html: page(
      `.ph{position:absolute;left:0;right:0;top:0;bottom:220px;background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 70%/cover}
h1{position:absolute;left:${M}px;top:${M}px;font-family:Poster;font-weight:700;font-size:112px;line-height:.92;color:${KM.ink};white-space:nowrap;text-transform:uppercase}
.bar{position:absolute;left:0;right:0;bottom:0;height:220px;background:${KM.paper};color:${KM.ink};padding:0 ${M}px;display:flex;flex-direction:column;justify-content:center}
.label{color:${KM.accent}}
.info{margin-top:10px}`,
      `<div class="ph"></div><h1>Ein Sommertag<br>im Wilden Westen</h1>
<div class="bar"><div class="label">Karl-May-Spiele Bad Segeberg 2027</div><div class="info">Bus ab Erfurt · 2 Nächte HP · Ticket · 399 € p. P.</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;bottom:58px">`,
    ),
  },
  // Vorlage „Geteilt“: Foto oben, Meeresblau-Fläche mit Serif-Titel
  {
    name: "r3-schlager-eine-woche-auf-see",
    html: page(
      `body{background:#173a5e;color:${SL.paper}}
.ph{position:absolute;left:0;right:0;top:0;height:800px;background:url(${img("web-schlager-deck-party.jpg")}) 45% 60%/cover}
.tx{position:absolute;left:${M}px;right:${M}px;top:858px}
.label{color:${SL.accent}}
h1{font-size:112px;line-height:.98;margin-top:20px}
h1 em{color:${SL.accent}}
.info{margin-top:26px;opacity:.9}`,
      `<div class="ph"></div><div class="tx"><div class="label">Schlager Seereise 2027</div>
<h1 class="serif">Eine Woche<br>Schlager <em>auf See</em></h1>
<div class="info">Costa Deliziosa · Oktober 2027</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;bottom:${M}px">`,
    ),
  },
  // Vorlage „Bühne“: Konzertfoto oben, zentrierter Titel auf Pflaume
  {
    name: "r3-schlager-jeden-abend-live",
    html: page(
      `body{background:${SL.ink};color:${SL.paper};text-align:center}
.ph{position:absolute;left:0;right:0;top:0;height:880px;background:url(${img("web-schlager-konzert.jpg")}) 45% 50%/cover}
.tx{position:absolute;left:${M}px;right:${M}px;top:930px}
.label{color:${SL.accent}}
h1{font-size:${TYPE.h1}px;line-height:1;margin-top:18px;font-style:italic}
.info{margin-top:22px;opacity:.9}`,
      `<div class="ph"></div><div class="tx"><div class="label">Schlager Seereise 2027</div>
<h1 class="serif">Jeden Abend live.</h1><div class="info">Über 30 Schlagerstars an Bord</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;top:${M}px">`,
    ),
  },
  // Vorlage „Himmel“ (Variante zentriert): Luftbild, Titel im Himmel, Navy-Leiste
  {
    name: "r3-spartacus-zwischen-den-kontinenten",
    html: page(
      `.ph{position:absolute;left:0;right:0;top:0;bottom:200px;background:url(${img("web-spartacus-schiff-insel.jpg")}) 50% 55%/cover}
h1{position:absolute;left:0;right:0;top:84px;text-align:center;font-size:${TYPE.h1}px;line-height:.96;color:${SP.ink}}
h1 em{font-style:italic}
.bar{position:absolute;left:0;right:0;bottom:0;height:200px;background:${SP.ink};color:${SP.paper};padding:0 ${M}px;display:flex;flex-direction:column;justify-content:center}
.label{color:${SP.accent}}
.info{margin-top:8px}`,
      `<div class="ph"></div><h1 class="serif">Zwischen den<br><em>Kontinenten</em></h1>
${rainbowRule(`position:absolute;left:0;right:0;bottom:200px;height:8px`)}
<div class="bar"><div class="label">Spartacus Gay Cruise 2027</div><div class="info">15.–22.10.2027 · Mallorca – Spanien – Marokko</div></div>
<img class="logo" src="${LOGO}" style="right:${M}px;bottom:48px">`,
    ),
  },
  // Vorlage „Papier“: heller Grund, großer Serif-Titel, Foto randlos unten
  {
    name: "r3-spartacus-sonne-an-deck",
    html: page(
      `body{background:${SP.paper};color:${SP.ink}}
.tx{position:absolute;left:${M}px;right:${M}px;top:${M + 10}px}
.label{color:#9a7a45}
h1{font-size:${TYPE.h1}px;line-height:.96;margin-top:22px}
h1 em{font-style:italic}
.info{margin-top:26px}
.ph{position:absolute;left:0;right:0;bottom:0;height:720px;background:url(${img("web-spartacus-oasis-pool.jpg")}) 40% 62%/cover}`,
      `<div class="tx"><div class="label">Spartacus Gay Cruise 2027</div>
<h1 class="serif">Sonne tanken.<br><em>Du selbst sein.</em></h1>
<div class="info">Pool, Sauna &amp; Vollpension inklusive</div></div>
${rainbowRule(`position:absolute;left:0;right:0;bottom:720px;height:8px`)}
<div class="ph"></div><img class="logo" src="${LOGO}" style="right:${M}px;top:${M}px">`,
    ),
  },
];

await render(posts, join(dir, "export"));
