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
  "r4-sp-1-packliste",
  `body{background:#fff;color:${SP.ink}}
.k{position:absolute;left:80px;top:80px;font-weight:800;font-size:32px;letter-spacing:.14em;color:#6b7690}
h1{position:absolute;left:80px;right:80px;top:130px;font-weight:900;font-size:100px;line-height:1;letter-spacing:-.02em}
ul{list-style:none;position:absolute;left:80px;right:80px;top:400px}
li{display:flex;align-items:center;gap:30px;height:140px;border-bottom:3px solid #eef0f5;font-weight:700;font-size:52px}
li i{width:56px;height:56px;border-radius:14px;border:5px solid ${SP.ink};position:relative;flex:0 0 auto}
li i::after{content:"";position:absolute;left:12px;top:-2px;width:18px;height:34px;border:solid;border-width:0 9px 9px 0;border-color:var(--c);transform:rotate(40deg)}
.f{position:absolute;left:80px;right:80px;bottom:72px;font-weight:700;font-size:38px;color:#6b7690}`,
  `<div class="k">SPARTACUS GAY CRUISE 2027</div><h1>Deine<br><span class="rb">Packliste.</span></h1>
<ul>${[["Sonnenbrille", "#e53b3b"], ["Badehose", "#f28c28"], ["Outfit für die Themenparty", "#e9b824"], ["Tanzschuhe für die DJ-Nächte", "#3cb371"], ["Lieblingsmensch", "#8b5cf6"]]
    .map(([t, c]) => `<li><i style="--c:${c}"></i>${t}</li>`)
    .join("")}</ul>
<div class="f">Abfahrt 15.10.2027 · Palma de Mallorca</div>${logo("right:72px;top:72px", 120)}`,
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
  `<div class="h"><h1>Erster Abend an Bord –<br><span class="rb">wohin zuerst?</span></h1><div class="sub">Spartacus Gay Cruise 2027</div></div>
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
h1{position:absolute;left:96px;right:60px;top:122px;font-weight:900;font-size:90px;line-height:1;letter-spacing:-.02em}
.list{position:absolute;left:96px;right:80px;top:350px}
.it{display:flex;align-items:center;height:98px;position:relative}
.it .d{width:150px;font-weight:700;font-size:34px;color:#c9d4ea}
.it .dot{width:30px;height:30px;border-radius:50%;background:#fff;border:7px solid ${SP.ink};box-shadow:0 0 0 4px #fff;margin-right:34px;position:relative;z-index:2}
.it .n{font-weight:800;font-size:46px;white-space:nowrap}
.it .x{font-weight:600;font-size:32px;color:#c9d4ea;margin-left:16px}
.line{position:absolute;left:261px;top:400px;width:8px;height:690px;background:linear-gradient(180deg,#e53b3b,#f28c28,#f7d23e,#3cb371,#3b82f6,#8b5cf6);border-radius:4px}`,
  `<div style="position:absolute;left:96px;top:70px;font-weight:800;font-size:32px;letter-spacing:.14em;color:#c9d4ea">SPARTACUS GAY CRUISE 2027</div><h1>8 Tage.<br><span class="rb">2 Kontinente.</span></h1><div class="line"></div>
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
  "r4-sl-2-so-schoen-wars",
  `body{background:#f4ead9;color:${SL.ink}}
.h{position:absolute;left:60px;right:60px;top:66px;text-align:center}
h1{font-family:Fredoka;font-weight:700;font-size:92px;line-height:1.02}
h1 span{color:${SL.accent}}
.sub{font-weight:700;font-size:36px;margin-top:14px}
.pol{position:absolute;background:#fff;padding:22px 22px 0;width:500px;box-shadow:0 2px 0 rgba(0,0,0,.06)}
.pol div{height:360px;background-size:cover;background-position:center}
.pol p{font-family:Fredoka;font-weight:600;font-size:38px;text-align:center;padding:16px 0 20px}`,
  `<div class="h"><h1>So schön war's <span>2025</span>!</h1><div class="sub">Schlager-Seereise · im Oktober 2027 dabei sein?</div></div>
<div class="pol" style="left:50px;top:300px;transform:rotate(-5deg)"><div style="background-image:url(${img("web-sl-208.jpg")})"></div><p>Oktoberfest auf See</p></div>
<div class="pol" style="right:50px;top:320px;transform:rotate(4deg)"><div style="background-image:url(${img("web-sl-250.jpg")});background-position:30% 40%"></div><p>Live-Konzerte</p></div>
<div class="pol" style="left:290px;top:830px;transform:rotate(-1.5deg)"><div style="height:300px;background-image:url(${img("web-sl-314.jpg")})"></div><p>Sonnendeck</p></div>`,
);

// 7 · Abstimmung: Lieblingsort an Bord (Tag oder Abend)
add(
  "r4-sl-3-tagsueber-abends",
  `body{background:${SL.ink}}
.a,.b{position:absolute;left:0;right:0;height:667px;background-size:cover}
.a{top:0;background-image:url(${img("web-sl-314.jpg")});background-position:50% 40%}
.b{bottom:0;background-image:url(${img("web-sl-63.jpg")});background-position:50% 45%}
.sep{position:absolute;left:0;right:0;top:667px;height:16px;background:${SL.accent}}
.l{position:absolute;left:60px;${outline(104, 14)}}
.l span{color:${SL.accent}}`,
  `<div class="a"></div><div class="sep"></div><div class="b"></div>
<div class="l" style="top:60px">Tagsüber Sonne.<div style="font-size:50px;-webkit-text-stroke-width:10px;margin-top:8px">Schlager-Seereise 2027</div></div><div class="l" style="bottom:70px"><span>Abends Gänsehaut.</span></div>
${logo("right:56px;top:470px", 130)}`,
);

// 8 · Entscheidungshilfe: Triest oder Bari
add(
  "r4-sl-4-triest-oder-bari",
  `body{background:#fff7ef;color:${SL.ink}}
.ph{position:absolute;left:0;right:0;top:0;height:560px;background:url(${img("web-sl-24.jpg")}) 50% 55%/cover}
h1{position:absolute;left:60px;right:60px;top:618px;font-family:Fredoka;font-weight:700;font-size:96px;line-height:1;text-align:center}
h1 span{color:${SL.accent}}
.cards{position:absolute;left:60px;right:60px;top:740px;display:flex;gap:28px}
.c{flex:1;border-radius:28px;padding:36px 34px;color:#fff;min-height:420px}
.c .t{font-family:Fredoka;font-weight:700;font-size:64px}
.c .d{font-weight:800;font-size:36px;margin-top:10px}
.c .x{font-weight:600;font-size:32px;line-height:1.3;margin-top:22px;opacity:.95}`,
  `<div class="ph"></div><div style="position:absolute;left:60px;top:470px;${outline(56, 10)}">Schlager-Seereise 2027</div><h1>Triest oder <span>Bari?</span></h1>
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
  "r4-km-2-winnetou-live",
  `.ph{position:absolute;left:0;right:0;top:0;bottom:430px;background:url(${img("web-km-reiter.jpg")}) 50% 80%/cover}
.band{position:absolute;left:0;right:0;bottom:0;height:430px;background:${KM.ink};color:${KM.paper};padding:54px 72px 0}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:76px;line-height:1.05;white-space:nowrap}
h1 span{color:${KM.accent}}
.sub{font-family:Roboto;font-weight:700;font-size:40px;color:#fff;margin-top:26px;line-height:1.35}
.p{position:absolute;left:56px;top:56px;background:${KM.accent};color:${KM.ink};font-family:'Alfa Slab One';font-size:56px;padding:16px 32px;border-radius:14px}`,
  `<div class="ph"></div><div class="band"><div class="label" style="color:${KM.accent};letter-spacing:.2em">Karl-May-Spiele Bad Segeberg 2027</div><h1 style="margin-top:14px">Winnetou <span>live erleben.</span></h1>
<div class="sub">Bus ab Erfurt · Hotel · Ticket – alles inklusive</div></div>
<div class="p">399 € p. P.</div>${logo("right:48px;top:48px", 140)}`,
);

// 11 · Nostalgie-Frage: zwei Winnetou-Generationen
add(
  "r4-km-3-zum-siebten-mal",
  `body{background:${KM.ink};color:${KM.paper}}
.ph{position:absolute;right:0;top:0;bottom:0;width:470px;background:url(${img("winnetou-reiter.jpg")}) 50% 60%/cover}
.tx{position:absolute;left:72px;top:80px;width:520px}
.label{color:${KM.accent};letter-spacing:.16em}
.n{font-family:'Alfa Slab One';font-size:420px;line-height:.9;color:${KM.accent};margin-top:30px}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:62px;line-height:1.12;margin-top:10px}
.sub{font-family:Roboto;font-weight:700;font-size:36px;color:#fff;margin-top:36px;line-height:1.35}`,
  `<div class="ph"></div><div class="tx"><div class="label">Karl-May-Spiele<br>Bad Segeberg 2027</div>
<div class="n">7.</div><h1>Mal reitet Alexander Klaws als Winnetou.</h1>
<div class="sub">Wir fahren im Juli mit dem Bus ab Erfurt hin – ab 399 € p. P.</div></div>`,
);

// 12 · Weihnachten: Erlebnis verschenken
add(
  "r4-km-4-geschenk",
  `body{background:${KM.paper};color:${KM.ink}}
.tx{position:absolute;left:72px;right:72px;top:76px}
.label{color:#b5542a;letter-spacing:.2em}
h1{font-family:'Alfa Slab One';font-weight:400;font-size:96px;line-height:1.05;margin-top:18px}
h1 span{color:#b5542a}
.sub{font-family:Roboto;font-weight:700;font-size:42px;margin-top:24px;line-height:1.3}
.ph{position:absolute;left:0;right:0;bottom:0;height:740px;background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 70%/cover}
.p{position:absolute;left:72px;bottom:56px;background:${KM.ink};color:${KM.paper};font-family:Roboto;font-weight:700;font-size:38px;padding:18px 32px;border-radius:14px}`,
  `<div class="tx"><div class="label">Karl-May-Spiele 2027 · Geschenkidee</div><h1>Verschenken Sie<br><span>Wilden Westen.</span></h1>
<div class="sub">Ein Tag bei den Karl-May-Spielen 2027 – mit Bus, Hotel &amp; Ticket.</div></div>
<div class="ph"></div><div class="p">399 € p. P. · Juli 2027</div>${logo("right:56px;bottom:48px", 140)}`,
);

// ================= DANZIG SILVESTER =================
// 13 · Hook-Frage kurz vor Silvester
add(
  "r4-dz-1-silvesterabend",
  `body{background:#241a30;color:${DZ.paper}}
.k{position:absolute;left:80px;top:80px;font-weight:800;font-size:32px;letter-spacing:.14em;color:${DZ.accent}}
h1{position:absolute;left:80px;right:80px;top:130px;font-family:'DM Serif Display';font-weight:400;font-size:104px;line-height:1}
.line{position:absolute;left:112px;top:470px;width:6px;height:590px;background:${DZ.accent}}
.st{position:absolute;left:80px;right:80px;display:flex;gap:44px;align-items:flex-start}
.st b{flex:0 0 70px;height:70px;border-radius:50%;background:${DZ.accent};color:#241a30;font-family:'DM Serif Display';font-weight:400;font-size:44px;display:flex;align-items:center;justify-content:center}
.st h2{font-family:'DM Serif Display';font-weight:400;font-size:66px;line-height:1}
.st p{font-weight:700;font-size:36px;margin-top:12px;opacity:.9}
.f{position:absolute;left:80px;bottom:72px;font-weight:700;font-size:36px}`,
  `<div class="k">SILVESTER IN DANZIG</div><h1>Ihr Silvesterabend<br>in drei Akten.</h1><div class="line"></div>
<div class="st" style="top:460px"><b>1</b><div><h2>Galadinner</h2><p>festlich, mit Open Bar</p></div></div>
<div class="st" style="top:700px"><b>2</b><div><h2>Schlagergala</h2><p>live mit Heiko &amp; Andy</p></div></div>
<div class="st" style="top:940px"><b>3</b><div><h2>Mitternacht</h2><p>Anstoßen an der Ostsee</p></div></div>
<div class="f">30.12.2026 – 02.01.2027 · ab 789 € p. P.</div>${logo("right:72px;bottom:56px", 120)}`,
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
  `<div class="ph"></div><h1>Silvester in Danzig:<br><span>4 Tage, alles drin.</span></h1>
<div class="g">${dz.map(([b, s]) => `<div class="t"><b>${b}</b><span>${s}</span></div>`).join("")}</div>
<div class="p">30.12.2026 – 02.01.2027 · ab 789 € p. P.</div>`,
);

// 15 · Fan-Frage zu Heiko & Andy
add(
  "r4-dz-3-postkarte",
  `body{background:#e9dfcf}
.card{position:absolute;left:56px;right:56px;top:150px;height:1060px;background:#fffdf8;transform:rotate(-2deg);padding:36px}
.ph{height:600px;background:url(${img("danzig-mottlau-nacht.jpg")}) 50% 70%/cover}
.stamp{position:absolute;right:60px;top:60px;width:170px;height:200px;background:#fff;border:4px dashed #c9b9a0;display:flex;align-items:center;justify-content:center}
.stamp img{width:130px;height:130px;border-radius:50%;object-fit:cover}
h1{font-family:'DM Serif Display';font-weight:400;font-size:100px;line-height:1;color:${DZ.ink};margin-top:42px}
h1 span{color:#b8862f}
.t{font-weight:700;font-size:36px;color:#4a3e58;margin-top:22px;line-height:1.4;max-width:680px}`,
  `<div class="card"><div class="ph"></div><div class="stamp"><img src="${LOGO}"></div>
<h1>Grüße aus <span>Danzig</span></h1><div class="t">Silvester 2026/27 mit Galadinner, Open Bar und Schlagergala mit Heiko &amp; Andy.</div></div>`,
);

await render(posts, join(dir, "export"));
