// Runde 4: 15 organische Posts (4:5) für Instagram & Facebook – Hausstil als Inspiration,
// aber jeder Post mit eigener Idee und eigenem Format (Abstimmung, Save-Post, Info-Karte, Emotion).
// Wichtiges Material bleibt in der mittleren 3:4-Zone (Instagram-Rasteransicht schneidet links/rechts ab).
// Aufruf: node creatives/organisch/render-r4.mjs
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, rainbowRule, RAINBOW_CSS, THEMES, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const { spartacus: SP, karlmay: KM, schlager: SL, danzig: DZ } = THEMES;
const logo = (css, size = 130) =>
  `<img class="logo" src="${LOGO}" style="${css};width:${size}px;height:${size}px">`;

// ---------- Bausteine ----------
const rainbowPill = (html, size = 36) =>
  `<span style="display:inline-block;padding:4px;border-radius:80px;background:${RAINBOW_CSS}"><span style="display:block;background:#fff;border-radius:80px;padding:14px 38px;font-weight:700;font-size:${size}px;color:${SP.ink};white-space:nowrap">${html}</span></span>`;
const outline = (px, stroke = 14) =>
  `font-family:Fredoka;font-weight:700;color:#fff;-webkit-text-stroke:${stroke}px ${SL.ink};paint-order:stroke fill;line-height:1.02;font-size:${px}px`;
const vinyl = (css) =>
  `<div style="position:absolute;${css};width:320px;height:320px;border-radius:50%;background:#141414;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 24px #1f1f1f,inset 0 0 0 28px #141414,inset 0 0 0 52px #1f1f1f,inset 0 0 0 56px #141414">
<div style="width:190px;height:190px;border-radius:50%;background:${SL.accent};color:#fff;font-family:Fredoka;font-weight:700;text-align:center;display:flex;flex-direction:column;justify-content:center;line-height:1.05">
<span style="font-size:30px">ab</span><span style="font-size:50px">1.299 €</span><span style="font-size:20px;font-family:Montserrat;margin-top:6px">inkl. Vollpension</span></div></div>`;
const badge = (n, bg, fg = "#fff", size = 64) =>
  `<span style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:50%;background:${bg};color:${fg};font-weight:900;font-size:${size * 0.55}px;flex:0 0 auto">${n}</span>`;

const posts = [];
const add = (name, css, body) => posts.push({ name, html: page(css, body) });

// ================= SPARTACUS =================
// 1 · Emotion: ein ruhiger Ort, der „du“ sagt
add(
  "r4-sp-1-dein-platz-an-deck",
  `body{background:#fff;color:${SP.ink};text-align:center}
.ph{position:absolute;left:0;right:0;top:0;height:930px;background:url(${img("web-sp-lido-bar.jpg")}) 50% 55%/cover}
.tx{position:absolute;left:60px;right:60px;top:992px}
h1{font-weight:900;font-size:92px;line-height:1.02;letter-spacing:-.02em}
.sub{font-weight:700;font-size:38px;color:${SP.sub};margin-top:22px}`,
  `<div class="ph"></div>${rainbowRule("position:absolute;left:0;right:0;top:930px;height:10px")}
<div class="tx"><h1>Dein Platz an Deck <span class="rb">wartet.</span></h1><div class="sub">Spartacus Gay Cruise · 15.–22.10.2027</div></div>
${logo("right:56px;top:56px")}`,
);

// 2 · Save-Post: großes Datum, wird gespeichert und geteilt
add(
  "r4-sp-2-save-the-date",
  `body{background:${SP.ink};color:#fff;text-align:center}
.k{position:absolute;left:0;right:0;top:96px;font-weight:800;font-size:34px;letter-spacing:.3em;padding-left:.3em}
.d{position:absolute;left:0;right:0;top:150px;font-weight:900;font-size:290px;line-height:1;letter-spacing:-.04em}
.s{position:absolute;left:0;right:0;top:470px;font-weight:700;font-size:46px}
.s span{color:#c9d4ea}
.row{position:absolute;left:0;right:0;bottom:0;height:610px;display:flex;gap:8px;background:${SP.ink}}
.row i{flex:1;background-size:cover;background-position:center}`,
  `<div class="k">SAVE THE DATE</div><div class="d"><span class="rb">15.10.</span></div>
<div class="s">Spartacus Gay Cruise 2027<br><span>Leinen los ab Palma de Mallorca</span></div>
${rainbowRule("position:absolute;left:0;right:0;bottom:610px;height:10px")}
<div class="row"><i style="background-image:url(${img("sunset-deck.jpg")})"></i><i style="background-image:url(${img("web-sp-lido-pool.jpg")})"></i><i style="background-image:url(${img("web-sp-dome.jpg")})"></i></div>`,
);

// 3 · Abstimmung mit drei Orten an Bord
const spots = [
  ["web-sp-lido-pool.jpg", "Pool", "50% 60%"],
  ["web-sp-ocean-bar.jpg", "Bar", "50% 50%"],
  ["web-sp-dome.jpg", "Club", "50% 50%"],
];
add(
  "r4-sp-3-pool-bar-club",
  `body{background:#fff;color:${SP.ink}}
.h{position:absolute;left:60px;right:60px;top:0;height:300px;display:flex;flex-direction:column;justify-content:center;text-align:center}
h1{font-weight:900;font-size:72px;line-height:1.05;letter-spacing:-.02em}
.sub{font-weight:700;font-size:34px;color:${SP.sub};margin-top:14px}
.r{position:absolute;left:0;right:0;height:340px;background-size:cover}
.lab{position:absolute;left:60px;bottom:32px;display:flex;align-items:center;gap:18px;background:#fff;border-radius:80px;padding:10px 34px 10px 10px;font-weight:900;font-size:44px}`,
  `<div class="h"><h1>Erster Abend an Bord –<br><span class="rb">wohin zuerst?</span></h1><div class="sub">Kommentiere 1, 2 oder 3</div></div>
${spots
  .map(
    ([f, t, pos], i) =>
      `<div class="r" style="top:${310 + i * 348}px;background-image:url(${img(f)});background-position:${pos}"><div class="lab">${badge(i + 1, SP.ink)}${t}</div></div>`,
  )
  .join("")}`,
);

// 4 · Info-Post zum Speichern: die Route als Fahrplan
const route = [
  ["15.10.", "Palma de Mallorca", ""],
  ["16.10.", "Barcelona", ""],
  ["17.10.", "Valencia", ""],
  ["18.10.", "Alicante", ""],
  ["19.10.", "Marbella", ""],
  ["20.10.", "Tanger", "Marokko"],
  ["21.10.", "Seetag", ""],
  ["22.10.", "Palma de Mallorca", ""],
];
add(
  "r4-sp-4-route",
  `body{background:${SP.ink};color:#fff}
h1{position:absolute;left:96px;right:60px;top:80px;font-weight:900;font-size:96px;line-height:1;letter-spacing:-.02em}
.list{position:absolute;left:96px;right:80px;top:330px}
.it{display:flex;align-items:center;height:110px;position:relative}
.it .d{width:150px;font-weight:700;font-size:34px;color:#c9d4ea}
.it .dot{width:30px;height:30px;border-radius:50%;background:#fff;border:7px solid ${SP.ink};box-shadow:0 0 0 4px #fff;margin-right:34px;position:relative;z-index:2}
.it .n{font-weight:800;font-size:46px;white-space:nowrap}
.it .x{font-weight:600;font-size:32px;color:#c9d4ea;margin-left:16px}
.line{position:absolute;left:261px;top:385px;width:8px;height:770px;background:linear-gradient(180deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6);border-radius:4px}`,
  `<h1>8 Tage.<br><span class="rb">2 Kontinente.</span></h1><div class="line"></div>
<div class="list">${route
    .map(([d, n, x]) => `<div class="it"><span class="d">${d}</span><span class="dot"></span><span class="n">${n}</span>${x ? `<span class="x">${x}</span>` : ""}</div>`)
    .join("")}</div>
<div style="position:absolute;left:96px;bottom:84px">${rainbowPill("Vasco da Gama · ab 1.349 € p. P.", 34)}</div>`,
);

// ================= SCHLAGER =================
// 5 · Emotion: Sänger nah dran, Mitsingen
add(
  "r4-sl-1-mitsingen",
  `.ph{position:absolute;inset:0;background:url(${img("web-sl-250.jpg")}) 30% 40%/cover}
.tx{position:absolute;left:60px;right:60px;bottom:80px}
h1{${outline(116)}}
h1 span{color:${SL.accent}}
.sub{${outline(50, 10)};margin-top:14px}`,
  `<div class="ph"></div><div class="tx"><h1>Mitsingen<br><span>erwünscht!</span></h1><div class="sub">Schlager-Seereise · Oktober 2027</div></div>
${logo("right:56px;top:56px")}`,
);

// 6 · Highlight-Event: Oktoberfest auf See
add(
  "r4-sl-2-oktoberfest",
  `.ph{position:absolute;inset:0;background:url(${img("web-sl-208.jpg")}) 50% 40%/cover}
.tx{position:absolute;left:60px;right:60px;top:64px}
h1{${outline(110)}}
h1 span{color:${SL.accent}}
.sub{${outline(50, 10)};margin-top:12px}`,
  `<div class="ph"></div><div class="tx"><h1>O'zapft is –<br><span>auf hoher See!</span></h1><div class="sub">Oktoberfest an Bord der Costa Deliziosa</div></div>
${vinyl("right:48px;bottom:56px")}`,
);

// 7 · Abstimmung: Lieblingsort an Bord (Tag oder Abend)
add(
  "r4-sl-3-deck-oder-saal",
  `body{background:${SL.ink}}
.a,.b{position:absolute;left:0;right:0;height:671px;background-size:cover}
.a{top:0;background-image:url(${img("web-sl-314.jpg")});background-position:50% 40%}
.b{bottom:0;background-image:url(${img("web-sl-63.jpg")});background-position:50% 45%}
.l{position:absolute;left:60px;${outline(70, 12)}}
.or{position:absolute;left:50%;top:675px;transform:translate(-50%,-50%);width:150px;height:150px;border-radius:50%;background:${SL.accent};color:#fff;font-family:Fredoka;font-weight:700;font-size:44px;display:flex;align-items:center;justify-content:center;border:8px solid #fff}`,
  `<div class="a"></div><div class="b"></div>
<div class="l" style="top:56px">1 · Sonnendeck</div><div class="l" style="bottom:64px">2 · Konzertsaal</div><div class="or">oder?</div>`,
);

// 8 · Entscheidungshilfe: Triest oder Bari
add(
  "r4-sl-4-triest-oder-bari",
  `body{background:#fff7ef;color:${SL.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:560px;background:url(${img("web-sl-24.jpg")}) 50% 55%/cover}
h1{position:absolute;left:60px;right:60px;top:608px;font-family:Fredoka;font-weight:700;font-size:96px;line-height:1;text-align:center}
h1 span{color:${SL.accent}}
.cards{position:absolute;left:60px;right:60px;top:740px;display:flex;gap:28px}
.c{flex:1;border-radius:28px;padding:36px 34px;color:#fff;min-height:420px}
.c .t{font-family:Fredoka;font-weight:700;font-size:64px}
.c .d{font-weight:800;font-size:36px;margin-top:10px}
.c .x{font-weight:600;font-size:32px;line-height:1.3;margin-top:22px;opacity:.95}`,
  `<div class="ph"></div><h1>Triest oder <span>Bari?</span></h1>
<div class="cards"><div class="c" style="background:${SL.ink}"><div class="t">Triest</div><div class="d">02.–09.10.2027</div><div class="x">Die klassische Schlager-Seereise</div></div>
<div class="c" style="background:${SL.accent}"><div class="t">Bari</div><div class="d">03.–10.10.2027</div><div class="x">Plus Rock'n'Roll-Party mit The Firebirds</div></div></div>`,
);

// ================= KARL MAY =================
// 9 · Stimmung: Nachtkulisse
add(
  "r4-km-1-wenn-es-dunkel-wird",
  `body{background:#000;color:${KM.paper}}
.ph{position:absolute;inset:0;background:url(${img("web-km-nacht.jpg")}) 50% 80%/cover}
.tx{position:absolute;left:60px;right:60px;top:90px;text-align:center}
.label{color:${KM.accent};letter-spacing:.3em}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:86px;line-height:1.1;margin-top:22px;white-space:nowrap}
.band{position:absolute;left:0;right:0;bottom:0;height:170px;background:${KM.ink};display:flex;align-items:center;justify-content:center;font-family:Roboto;font-weight:700;font-size:40px;color:#fff}`,
  `<div class="ph"></div><div class="tx"><div class="label">Karl-May-Spiele 2027</div><h1>Wenn es dunkel wird<br>am Kalkberg …</h1></div>
<div class="band">19.07.2027 · Abendvorstellung mit Feuerwerk</div>`,
);

// 10 · Reibung nehmen: alles schon geplant (Checkliste)
const checks = ["Busreise ab Erfurt", "2 Nächte im Hotel", "Halbpension", "Eintrittskarte"];
add(
  "r4-km-2-alles-geplant",
  `body{background:${KM.paper};color:${KM.ink}}
h1{position:absolute;left:72px;right:60px;top:80px;font-family:'Alfa Slab One';font-weight:400;font-size:88px;line-height:1.06}
ul{list-style:none;position:absolute;left:72px;right:60px;top:330px}
li{display:flex;align-items:center;gap:26px;font-family:Roboto;font-weight:700;font-size:46px;height:92px}
.ph{position:absolute;left:0;right:0;bottom:0;height:540px;background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 70%/cover}
.p{position:absolute;right:56px;bottom:56px;background:${KM.ink};color:${KM.paper};font-family:'Alfa Slab One';font-size:54px;padding:18px 34px;border-radius:14px}`,
  `<h1>Ihr Ausflug ist<br>schon geplant.</h1>
<ul>${checks.map((c) => `<li>${badge("✓", "#b5542a", "#fff", 60)}${c}</li>`).join("")}</ul>
<div class="ph"></div><div class="p">399 € p. P.</div>`,
);

// 11 · Nostalgie-Frage: zwei Winnetou-Generationen
add(
  "r4-km-3-pierre-brice-oder-klaws",
  `.ph{position:absolute;inset:0;background:url(${img("web-km-reiter.jpg")}) 50% 85%/cover}
.band{position:absolute;left:0;right:0;top:0;background:${KM.ink};color:${KM.paper};padding:62px 64px 56px;text-align:center}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:84px;line-height:1.08}
h1 span{color:${KM.accent}}
.sub{font-family:Roboto;font-weight:700;font-size:40px;color:#fff;margin-top:22px}`,
  `<div class="ph"></div><div class="band"><h1>Pierre Brice oder<br><span>Alexander Klaws?</span></h1><div class="sub">Ihr Lieblings-Winnetou? Ab in die Kommentare!</div></div>
${logo("right:48px;bottom:48px", 140)}`,
);

// 12 · Weihnachten: Erlebnis verschenken
add(
  "r4-km-4-geschenk",
  `.ph{position:absolute;inset:0;background:url(${img("web-karlmay-feuerwerk.jpg")}) 50% 40%/cover}
.card{position:absolute;left:60px;right:60px;bottom:64px;background:${KM.paper};color:${KM.ink};border-radius:22px;padding:48px 52px 50px;text-align:center}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:74px;line-height:1.1}
.sub{font-family:Roboto;font-weight:700;font-size:38px;margin-top:22px;color:#6b4a35}`,
  `<div class="ph"></div><div class="card"><h1>Das schönste Geschenk<br>passt in keinen Karton.</h1><div class="sub">Karl-May-Spiele 2027 verschenken · 399 € p. P.</div></div>
${logo("right:56px;top:56px")}`,
);

// ================= DANZIG SILVESTER =================
// 13 · Hook-Frage kurz vor Silvester
add(
  "r4-dz-1-noch-keine-plaene",
  `body{background:${DZ.ink};text-align:center}
.ph{position:absolute;left:0;right:0;bottom:0;height:1000px;background:url(${img("danzig-mottlau-nacht.jpg")}) 50% 100%/cover}
.tx{position:absolute;left:50px;right:50px;top:70px}
h1{font-family:'DM Serif Display';font-weight:400;font-size:112px;line-height:1;color:${DZ.paper}}
h1 span{color:${DZ.accent}}
.pill{display:inline-block;margin-top:30px;background:${DZ.accent};color:${DZ.ink};border-radius:60px;padding:16px 40px;font-weight:700;font-size:38px}`,
  `<div class="ph"></div><div class="tx"><h1>Noch keine Pläne<br>für <span>Silvester?</span></h1><div class="pill">Mit uns nach Danzig · 30.12.–02.01.</div></div>`,
);

// 14 · Alles drin: vier Highlights als Kacheln
const dz = [
  ["Galadinner", "mit Open Bar"],
  ["Schlagergala", "mit Heiko &amp; Andy"],
  ["Marienburg", "geführter Ausflug"],
  ["Dreistadt", "Danzig · Gdynia · Sopot"],
];
add(
  "r4-dz-2-vier-tage",
  `body{background:${DZ.ink};color:${DZ.paper}}
.ph{position:absolute;left:0;right:0;top:0;height:440px;background:url(${img("web-danzig-feuerwerk.jpg")}) 50% 50%/cover}
h1{position:absolute;left:40px;right:40px;top:480px;font-family:'DM Serif Display';font-weight:400;font-size:92px;line-height:1;text-align:center}
h1 span{color:${DZ.accent}}
.g{position:absolute;left:60px;right:60px;top:700px;display:grid;grid-template-columns:1fr 1fr;gap:22px}
.t{background:#2a2236;border:2px solid #4a3e58;border-radius:22px;padding:28px 30px;min-height:170px}
.t b{display:block;font-family:'DM Serif Display';font-weight:400;font-size:52px;color:${DZ.accent}}
.t span{display:block;font-weight:700;font-size:32px;margin-top:8px}
.p{position:absolute;left:0;right:0;bottom:56px;text-align:center;font-weight:800;font-size:40px}`,
  `<div class="ph"></div><h1>4 Tage.<br><span>1 Jahreswechsel.</span></h1>
<div class="g">${dz.map(([b, s]) => `<div class="t"><b>${b}</b><span>${s}</span></div>`).join("")}</div>
<div class="p">30.12.2026 – 02.01.2027 · ab 789 € p. P.</div>`,
);

// 15 · Fan-Frage zu Heiko & Andy
add(
  "r4-dz-3-heiko-andy",
  `body{background:#fff;color:${DZ.ink};text-align:center}
.ph{position:absolute;left:0;right:0;top:60px;height:660px;background:url(${img("web-danzig-heiko-andy.jpg")}) 50% 40%/contain no-repeat}
.tx{position:absolute;left:50px;right:50px;top:760px}
h1{font-family:'DM Serif Display';font-weight:400;font-size:100px;line-height:1.02}
h1 span{color:#e8711c}
.sub{font-weight:700;font-size:38px;margin-top:26px}
.k{display:inline-block;margin-top:26px;background:#e8711c;color:#fff;font-weight:800;font-size:34px;padding:12px 34px;border-radius:60px}`,
  `<div class="ph"></div><div class="tx"><h1>Mit <span>Heiko &amp; Andy</span><br>ins neue Jahr feiern?</h1>
<div class="k">Silvester-Schlagergala in Danzig</div></div>`,
);

await render(posts, join(dir, "export"));
