// Runde 6: 3 weitere Karl-May-Posts (4:5). Fakten laut Landingpage
// (Busreise ab Erfurt, 2 Nächte Good Morning Hotel Bad Oldesloe mit HP, Eintritt, 399 €,
// Vorstellungen 08.07. 15 Uhr und 19.07. 20 Uhr mit Feuerwerk, ideal für Gruppen & Vereine).
// Aufruf: node creatives/organisch/render-r6.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { page, render, imgFrom, THEMES, LOGO } from "../brand/style/base.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const img = imgFrom(join(dir, "src"));
const png = (f) => `data:image/png;base64,${readFileSync(join(dir, "src", f)).toString("base64")}`;
const { karlmay: KM } = THEMES;
const RUST = "#b5542a";
const logo = (css, size = 130) => `<img class="logo" src="${LOGO}" style="${css};width:${size}px;height:${size}px">`;

const posts = [];
const add = (name, css, body) => posts.push({ name, html: page(css, body) });

// 1 · Drei Tage im Überblick
const days = [
  ["Tag 1", "Mit dem Bus ab Erfurt nach Bad Oldesloe", "web-km-tag1", "50% 50%"],
  ["Tag 2", "Karl-May-Spiele am Kalkberg", "web-karlmay-arena-tag.jpg", "30% 70%"],
  ["Tag 3", "Frühstück &amp; entspannte Heimreise", "px-fruehstueck.jpg", "50% 50%"],
];
add(
  "r6-km-1-drei-tage",
  `body{background:${KM.paper};color:${KM.ink}}
.label{position:absolute;left:72px;top:70px;color:${RUST};letter-spacing:.14em}
h1{position:absolute;left:72px;right:72px;top:118px;font-family:'Alfa Slab One';font-weight:400;font-size:92px;line-height:1.04}
.row{position:absolute;left:72px;right:72px;height:270px;display:flex;gap:34px;align-items:center}
.pic{flex:0 0 330px;height:250px;border-radius:20px;background-size:cover}
.bus{background:#e8d7b6 url(${png("web-starshine-bus.png")}) 50% 55%/92% auto no-repeat}
.d{font-family:'Alfa Slab One';font-size:50px;color:${RUST}}
.t{font-family:Roboto;font-weight:700;font-size:42px;line-height:1.2;margin-top:8px}`,
  `<div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>3 Tage<br>Wilder Westen.</h1>
${days
  .map(
    ([d, t, f, pos], i) =>
      `<div class="row" style="top:${380 + i * 300}px"><div class="pic ${f === "web-km-tag1" ? "bus" : ""}" style="${f === "web-km-tag1" ? "" : `background-image:url(${img(f)});background-position:${pos}`}"></div><div><div class="d">${d}</div><div class="t">${t}</div></div></div>`,
  )
  .join("")}`,
);

// 2 · Zwei Termine – Tag und Abend als Karten
add(
  "r6-km-2-zwei-termine",
  `body{background:${KM.ink};color:${KM.paper}}
.label{position:absolute;left:0;right:0;top:70px;text-align:center;color:${KM.accent};letter-spacing:.14em}
h1{position:absolute;left:0;right:0;top:118px;text-align:center;font-family:'Alfa Slab One';font-weight:400;font-size:84px;line-height:1;white-space:nowrap}
.cards{position:absolute;left:56px;right:56px;top:280px;bottom:64px;display:flex;gap:26px}
.c{flex:1;background:${KM.paper};color:${KM.ink};border-radius:24px;overflow:hidden;display:flex;flex-direction:column}
.c .ph{height:640px;background-size:cover}
.c .b{padding:30px 30px 0}
.c .dt{font-family:'Alfa Slab One';font-size:58px;line-height:1}
.c .s{font-family:Roboto;font-weight:700;font-size:40px;margin-top:18px;line-height:1.25}
.c .s em{font-style:normal;color:${RUST}}`,
  `<div class="label">Karl-May-Spiele Bad Segeberg 2027</div><h1>Zwei Termine im Juli</h1>
<div class="cards">
<div class="c"><div class="ph" style="background-image:url(${img("web-karlmay-arena-tag.jpg")});background-position:30% 60%"></div><div class="b"><div class="dt">07.–09.07.</div><div class="s">Vorstellung<br>08.07. · 15 Uhr<br><em>bei Tageslicht</em></div></div></div>
<div class="c"><div class="ph" style="background-image:url(${img("web-karlmay-feuerwerk.jpg")});background-position:50% 40%"></div><div class="b"><div class="dt">18.–20.07.</div><div class="s">Vorstellung<br>19.07. · 20 Uhr<br><em>mit Feuerwerk</em></div></div></div>
</div>`,
);

// 3 · Gruppen & Vereine – mit dem Starshine-Bus
// 3 · Vereinsausflug als klassisches Western-Plakat (Rahmen, Zacken, Sterne, Banner)
const burst = (n = 24, r1 = 50, r2 = 43) =>
  `polygon(${Array.from({ length: n * 2 }, (_, k) => {
    const a = (Math.PI * k) / n, r = k % 2 ? r2 : r1;
    return `${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`;
  }).join(",")})`;
const zigzag = (c) =>
  `background:linear-gradient(135deg,${c} 25%,transparent 25%) -18px 0/36px 36px,linear-gradient(225deg,${c} 25%,transparent 25%) -18px 0/36px 36px;`;
const star = (css) => `<span style="position:absolute;${css};color:${RUST};font-size:46px;line-height:1">★</span>`;
add(
  "r6-km-3-vereinsausflug",
  `body{background:#efdfbd;color:${KM.ink}}
.paper{position:absolute;inset:0;background:repeating-radial-gradient(circle at 30% 20%,rgba(120,80,40,.035) 0 2px,transparent 2px 7px)}
.frame{position:absolute;inset:26px;border:6px solid ${KM.ink}}
.frame2{position:absolute;inset:40px;border:2px solid ${KM.ink}}
.ribbon{position:absolute;left:110px;right:110px;top:82px;height:74px;white-space:nowrap;background:${KM.ink};color:${KM.paper};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:27px;letter-spacing:.1em;
  clip-path:polygon(0 0,100% 0,96% 50%,100% 100%,0 100%,4% 50%)}
.h1{position:absolute;left:0;right:0;top:186px;text-align:center;font-family:'Alfa Slab One';font-size:116px;line-height:1;color:${RUST};letter-spacing:.02em}
.h2{position:absolute;left:0;right:0;top:322px;text-align:center;font-family:'Alfa Slab One';font-size:68px;line-height:1}
.zz{position:absolute;left:80px;right:80px;height:18px}
.ph{position:absolute;left:80px;right:80px;top:462px;height:500px;border:8px solid ${KM.ink};background:url(${img("web-karlmay-arena-tag.jpg")}) 30% 68%/cover}
.burst{position:absolute;right:70px;top:410px;width:250px;height:250px;background:${RUST};clip-path:${burst()};transform:rotate(-10deg);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;text-align:center}
.burst b{font-family:'Alfa Slab One';font-weight:400;font-size:64px;line-height:1}
.burst span{font-family:Roboto;font-weight:700;font-size:30px}
.bus{position:absolute;left:110px;top:820px;width:470px}
.sub{position:absolute;left:0;right:0;top:1022px;text-align:center;font-family:'Alfa Slab One';font-size:56px}
.rule{position:absolute;left:250px;right:250px;top:1104px;height:4px;background:${KM.ink}}
.facts{position:absolute;left:0;right:0;top:1128px;text-align:center;font-family:Roboto;font-weight:700;font-size:40px;line-height:1.4}`,
  `<div class="paper"></div><div class="frame"></div><div class="frame2"></div>
${star("left:58px;top:56px")}${star("right:58px;top:56px")}${star("left:58px;bottom:56px")}${star("right:58px;bottom:56px")}
<div class="ribbon">★ KARL-MAY-SPIELE BAD SEGEBERG 2027 ★</div>
<div class="h1">GEMEINSAM</div><div class="h2">in den Wilden Westen!</div>
<div class="zz" style="top:440px;${zigzag(KM.ink)}transform:scaleY(-1)"></div>
<div class="ph"></div>
<div class="zz" style="top:970px;${zigzag(KM.ink)}"></div>
<img class="bus" src="${png("web-starshine-bus.png")}">
<div class="burst"><span>nur</span><b>399 €</b><span>p. P.</span></div>
<div class="sub">Der Vereinsausflug 2027</div><div class="rule"></div>
<div class="facts">Bus ab Erfurt · Hotel mit HP · Ticket<br>07.–09.07. &amp; 18.–20.07.2027</div>`,
);

await render(posts, join(dir, "export"));
