// Runde 5: 8 weitere organische Posts (4:5) mit neuen Fotos –
// lizenzfreie Pexels-Fotos (src/px-*.jpg) und bisher ungenutzte Landingpage-Fotos (src/web-*.jpg).
// Regeln: Reisename sofort sichtbar, eine Idee pro Post, keine Kommentar-Aufforderung im Bild.
// Aufruf: node creatives/organisch/render-r5.mjs
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, rainbowRule, RAINBOW_CSS, THEMES, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const { spartacus: SP, karlmay: KM, schlager: SL, danzig: DZ } = THEMES;
const logo = (css, size = 130) => `<img class="logo" src="${LOGO}" style="${css};width:${size}px;height:${size}px">`;
const outline = (px, stroke = 14) =>
  `font-family:Fredoka;font-weight:700;color:#fff;-webkit-text-stroke:${stroke}px ${SL.ink};paint-order:stroke fill;line-height:1.02;font-size:${px}px`;

const posts = [];
const add = (name, css, body) => posts.push({ name, html: page(css, body) });

// ---------- Spartacus ----------
// Hafen-Steckbrief Barcelona (Liegezeit laut Reiseablauf 08–19 Uhr)
add(
  "r5-sp-1-barcelona",
  `body{background:#fff;color:${SP.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:760px;background:url(${img("px-barcelona-strand.jpg")}) 60% 50%/cover}
.tag{position:absolute;left:60px;top:60px;background:#fff;border-radius:60px;padding:12px 30px;font-weight:800;font-size:32px}
.tx{position:absolute;left:72px;right:72px;top:820px}
.k{font-weight:800;font-size:30px;letter-spacing:.12em;color:#6b7690}
h1{font-weight:900;font-size:120px;line-height:1;letter-spacing:-.03em;margin-top:8px}
.facts{display:flex;gap:16px;margin-top:30px;flex-wrap:wrap}
.facts span{border:3px solid #e6e9f0;border-radius:60px;padding:12px 26px;font-weight:700;font-size:32px}`,
  `<div class="ph"></div><div class="tag">Stopp 1 von 5 · 16.10.</div>${rainbowRule("position:absolute;left:0;right:0;top:760px;height:10px")}
<div class="tx"><div class="k">SPARTACUS GAY CRUISE 2027</div><h1><span class="rb">Barcelona</span></h1>
<div class="facts"><span>08 – 19 Uhr an Land</span><span>Strand &amp; Altstadt</span><span>Sitges ganz nah</span></div></div>`,
);

// Dome-Lounge: Sundowner mit Rundumblick
add(
  "r5-sp-2-sundowner",
  `.ph{position:absolute;inset:0;background:url(${img("web-sp-dome-lounge.jpg")}) 50% 50%/cover}
.card{position:absolute;left:60px;right:60px;bottom:64px;background:${SP.ink};color:#fff;border-radius:28px;padding:46px 50px 50px}
.k{font-weight:800;font-size:30px;letter-spacing:.12em;color:#c9d4ea}
h1{font-weight:900;font-size:84px;line-height:1.02;letter-spacing:-.02em;margin-top:14px}
.sub{font-weight:700;font-size:36px;margin-top:20px;color:#c9d4ea}`,
  `<div class="ph"></div><div class="card"><div class="k">SPARTACUS GAY CRUISE 2027</div>
<h1>Sundowner mit<br><span class="rb">Meerblick rundum.</span></h1><div class="sub">Dome Observation Lounge · Vasco da Gama</div></div>
${logo("right:56px;top:56px")}`,
);

// ---------- Schlager ----------
// Reiseziel Montenegro (Pexels-Foto Perast)
add(
  "r5-sl-1-montenegro",
  `.ph{position:absolute;inset:0;background:url(${img("px-montenegro-perast.jpg")}) 50% 55%/cover}
.tx{position:absolute;left:60px;right:60px;top:70px}
h1{${outline(118)}}
h1 span{color:${SL.accent}}
.sub{${outline(52, 10)};margin-top:14px}
.b{position:absolute;left:60px;right:60px;bottom:64px;background:#fff;border-radius:28px;padding:30px 40px;font-family:Fredoka;font-weight:600;font-size:40px;color:${SL.ink};text-align:center}`,
  `<div class="ph"></div><div class="tx"><h1>Hallo,<br><span>Montenegro!</span></h1><div class="sub">Schlager-Seereise 2027 · Kotor, 04.10.</div></div>
<div class="b">Italien · Montenegro · Griechenland · Albanien</div>`,
);

// Das Schiff: Costa Deliziosa als Zuhause für eine Woche
add(
  "r5-sl-2-costa-deliziosa",
  `body{background:#fff7ef;color:${SL.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:720px;background:url(${img("web-sl-costa.jpg")}) 55% 60%/cover}
.tx{position:absolute;left:60px;right:60px;top:770px;text-align:center}
.k{font-family:Fredoka;font-weight:700;font-size:40px;color:${SL.accent}}
h1{font-family:Fredoka;font-weight:700;font-size:86px;line-height:1.02;margin-top:6px}
.row{display:flex;gap:18px;justify-content:center;margin-top:34px}
.row div{background:${SL.ink};color:#fff;border-radius:24px;padding:20px 22px;font-weight:800;font-size:32px;line-height:1.2;flex:1}
.row b{display:block;font-family:Fredoka;font-size:50px;color:#ffd166}`,
  `<div class="ph"></div><div class="tx"><div class="k">Schlager-Seereise 2027</div><h1>Ihr Zuhause für<br>eine Woche</h1>
<div class="row"><div><b>7</b>Nächte</div><div><b>30+</b>Stars</div><div><b>inkl.</b>Vollpension</div></div></div>`,
);

// ---------- Karl May ----------
add(
  "r5-km-1-einritt",
  `body{background:#000;color:${KM.paper}}
.ph{position:absolute;inset:0;background:url(${img("web-km-einritt.jpg")}) 50% 75%/cover}
.band{position:absolute;left:0;right:0;top:0;background:${KM.ink};padding:60px 64px 52px;text-align:center}
.label{color:${KM.accent};letter-spacing:.2em}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:88px;line-height:1.08;margin-top:16px}
.p{position:absolute;left:50%;bottom:64px;transform:translateX(-50%);background:${KM.paper};color:${KM.ink};font-family:Roboto;font-weight:700;font-size:38px;padding:18px 38px;border-radius:60px;white-space:nowrap}`,
  `<div class="ph"></div><div class="band"><div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>Gänsehaut, wenn<br>Winnetou einreitet.</h1></div>
<div class="p">Bus ab Erfurt · Hotel · Ticket · 399 € p. P.</div>`,
);

// ---------- Danzig Silvester ----------
// Anstoßen (Pexels): Emotion Galadinner
add(
  "r5-dz-1-anstossen",
  `.ph{position:absolute;inset:0;background:url(${img("px-anstossen.jpg")}) 50% 40%/cover}
.card{position:absolute;left:60px;right:60px;bottom:64px;background:${DZ.ink};color:${DZ.paper};border-radius:26px;padding:44px 48px 48px;text-align:center}
.k{font-weight:800;font-size:30px;letter-spacing:.14em;color:${DZ.accent}}
h1{font-family:'DM Serif Display';font-weight:400;font-size:96px;line-height:1;margin-top:14px}
h1 span{color:${DZ.accent}}
.sub{font-weight:700;font-size:36px;margin-top:18px}`,
  `<div class="ph"></div><div class="card"><div class="k">SILVESTER IN DANZIG</div><h1>Auf ein <span>neues Jahr!</span></h1>
<div class="sub">Galadinner mit Open Bar · 30.12.–02.01.</div></div>`,
);

// Rundum-sorglos: was alles organisiert ist
const care = [
  ["Abholung", "Haustür-Transfer (PLZ 01 &amp; 02)"],
  ["Hotel", "4 Sterne, direkt an der Ostsee"],
  ["Ausflüge", "geführt, inklusive"],
  ["Begleitung", "persönliche Reisebegleitung"],
];
add(
  "r5-dz-2-rundum-sorglos",
  `body{background:${DZ.paper};color:${DZ.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:470px;background:url(${img("px-danzig-nacht-kran.jpg")}) 40% 60%/cover}
.k{position:absolute;left:72px;top:520px;font-weight:800;font-size:30px;letter-spacing:.14em;color:#a8792a}
h1{position:absolute;left:72px;right:72px;top:566px;font-family:'DM Serif Display';font-weight:400;font-size:88px;line-height:1}
ul{list-style:none;position:absolute;left:72px;right:72px;top:770px}
li{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:20px 0;border-bottom:2px solid #e3d6c0}
li b{font-family:'DM Serif Display';font-weight:400;font-size:46px}
li span{font-weight:700;font-size:32px;text-align:right}`,
  `<div class="ph"></div><div class="k">SILVESTER IN DANZIG</div><h1>Sie feiern.<br>Wir kümmern uns.</h1>
<ul>${care.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join("")}</ul>`,
);

// Ausflug Marienburg (Pexels): größte Backsteinburg der Welt
add(
  "r5-dz-3-marienburg",
  `.ph{position:absolute;inset:0;background:url(${img("px-marienburg.jpg")}) 50% 30%/cover}
.band{position:absolute;left:0;right:0;bottom:0;background:${DZ.ink};color:${DZ.paper};padding:50px 72px 60px}
.k{font-weight:800;font-size:30px;letter-spacing:.14em;color:${DZ.accent}}
h1{font-family:'DM Serif Display';font-weight:400;font-size:92px;line-height:1;margin-top:12px}
.sub{font-weight:700;font-size:36px;margin-top:18px;line-height:1.3}`,
  `<div class="ph"></div><div class="band"><div class="k">SILVESTER IN DANZIG · AUSFLUG</div><h1>Die Marienburg</h1>
<div class="sub">Die größte Backsteinburg der Welt – geführt und inklusive.</div></div>`,
);

await render(posts, join(dir, "export"));
