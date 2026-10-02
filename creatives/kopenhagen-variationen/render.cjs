// Meta-Ads-Creative-Variationen „Kopenhagen 2027“ – Starshine Emotions
// Ausführen:              node render.cjs            (alle Variationen)
// Nur eine Variation:     node render.cjs v2_nyhavn17_4x5
// Ergebnis je Variation:  <name>.png und <name>_vorschau25.png

// ===== TEXTE (gelten für alle Variationen) ==================================
const HEADLINE_1 = 'KOPENHAGEN';
const HEADLINE_2 = '2027';
const PREIS_VORSATZ = '4 Tage ab';
const PREIS = '965 €';
const PREIS_ZUSATZ = 'p. P.';
const PREIS_ALT = '999 €';        // regulärer Preis als Preisanker (nur in Variationen mit preisAnker: true)
const LEISTUNGEN = ['Hotel', 'Frühstück', 'Stadtprogramm'];
const FRIST = 'Frühbucherpreis bis 31. Oktober';
const CTA = 'WhatsApp: „Kopenhagen 2027“';

// ===== FARBEN (70er Palette) ================================================
const CREME = '#F3E6C8';
const SENFGELB = '#E8A33D';
const ORANGE = '#D9702B';
const ROSTROT = '#B5432A';
const DUNKELBRAUN = '#3A2418';
const WHATSAPP_GRUEN = '#1DA851';

const LOGO = 'logo.jpg';

// ===== FARBTHEMEN (je Variation wählbar über thema: '...') ==================
// stickerForm: 'welle' (gewellter Preisaufkleber), 'rosette' (Plakette mit Doppelring), 'zacken' (Stern)
// streifenStil: 'band' (drei breite Streifen), 'linien' (zwei feine Linien)
// ctaForm: 'ticket' (Eintrittskarte mit Einkerbungen), 'pille' (runder Button)
const THEMEN = {
  kino: { // 70er Kino: Braun, Senf, Rost
    fuss: DUNKELBRAUN, streifen: [SENFGELB, ORANGE, ROSTROT], streifenStil: 'band',
    sticker: SENFGELB, stickerText: DUNKELBRAUN, preis: ROSTROT, ring: DUNKELBRAUN, stickerForm: 'welle',
    headline1: DUNKELBRAUN, headline2: ROSTROT, headlineTag: null,
    leistungen: CREME, punkt: SENFGELB, fristBg: SENFGELB, fristText: DUNKELBRAUN, ctaForm: 'ticket',
  },
  nacht: { // Abend am Hafen: Nachtblau, Creme, Gold
    fuss: '#16233F', streifen: ['#E8B04A', '#16233F', '#E8B04A'], streifenStil: 'linien',
    sticker: CREME, stickerText: '#16233F', preis: '#C2412D', ring: '#16233F', stickerForm: 'rosette',
    headline1: CREME, headline2: '#E8B04A', headlineTag: '#16233F',
    leistungen: CREME, punkt: '#E8B04A', fristBg: '#E8B04A', fristText: '#16233F', ctaForm: 'pille',
  },
  petrol: { // Sonnenuntergang: Petrol, Koralle, Senf
    fuss: '#0F3B3A', streifen: ['#E2674A', SENFGELB, '#2E7D74'], streifenStil: 'band',
    sticker: '#E2674A', stickerText: '#FFF3E0', preis: '#FFF3E0', ring: '#FFF3E0', stickerForm: 'zacken',
    headline1: '#0F3B3A', headline2: '#E2674A', headlineTag: null,
    leistungen: CREME, punkt: '#E2674A', fristBg: SENFGELB, fristText: '#0F3B3A', ctaForm: 'ticket',
  },
};

// ===== VARIATIONEN ==========================================================
// layout 'himmel':   Headline direkt im hellen Himmel des Fotos
// layout 'kopfband': Headline in einem dunklen Kopfband (für unruhigen oder dunklen Himmel)
// haeuser: Flächen im fertigen Bild, die die Headline nicht berühren darf
const VARIATIONEN = [
  {
    name: 'v1_abendstimmung_4x5',
    foto: 'nyhavn_abend.jpg', breite: 1080, hoehe: 1350, fotoPosition: '50% 50%',
    layout: 'kopfband', kopfHoehe: 268, headlineAlign: 'center', headlineGroesse: 96, headlineOben: 30,
    logo: { left: 14, top: 14 },
    sticker: { d: 400, x: 300, y: 800, drehung: -8, preis: 104 },
    fussOben: 1010, fussUnten: 42,
  },
  {
    name: 'v2_nyhavn17_4x5',
    foto: 'nyhavn_17.jpg', breite: 1080, hoehe: 1350, fotoPosition: '50% 0%',
    layout: 'himmel', headlineAlign: 'left', headlineGroesse: 88, headlineOben: 26, headlineLinks: 52,
    logo: { right: 14, top: 14 },
    haeuser: [
      { left: 700, top: 100, right: 790, bottom: 1350 }, // Masten
      { left: 0, top: 330, right: 700, bottom: 1350 },   // Häuserzeile links
    ],
    sticker: { d: 400, x: 800, y: 790, drehung: 7, preis: 104 },
    fussOben: 1010, fussUnten: 42,
  },
  {
    name: 'v3_rotes_haus_story_9x16',
    foto: 'nyhavn_rotes_haus.jpg', breite: 1080, hoehe: 1920, fotoPosition: '50% 52%',
    // Story: Leistungen stehen oben im Kopfband, unten nur der CTA; oben und unten Platz für die Story-Bedienelemente
    layout: 'kopfband', story: true, kopfHoehe: 760, headlineAlign: 'center', headlineGroesse: 100, headlineOben: 352,
    fotoBereich: { top: 760, bottom: 1500 },
    logo: { center: true, top: 200 },
    sticker: { d: 420, x: 540, y: 1200, drehung: -7, preis: 110 },
    fussOben: 1500, fussUnten: 270,
  },
  // ----- 1:1 (1080 x 1080): Foto als Held, kompakter Fuß ------------------
  {
    name: 'q1_rotes_haus_1x1',
    foto: 'nyhavn_rotes_haus.jpg', breite: 1080, hoehe: 1080, fotoPosition: '50% 50%',
    layout: 'himmel', headlineAlign: 'center', headlineGroesse: 68, headlineOben: 16,
    logo: { left: 10, top: 10 }, logoGroesse: 112,
    haeuser: [
      { left: 750, top: 84, right: 1080, bottom: 1080 }, // rechtes Haus mit Dach
      { left: 862, top: 54, right: 890, bottom: 1080 },  // Schornstein
      { left: 240, top: 206, right: 790, bottom: 1080 }, // rotes Haus mit Dach
      { left: 0, top: 262, right: 250, bottom: 1080 },   // gelbes Haus links
    ],
    sticker: { d: 356, x: 540, y: 640, drehung: -7, preis: 84 },
    fussOben: 846, fussUnten: 22, kompakt: true, preisAnker: true, fristFeld: true,
  },
  {
    name: 'q2_abendstimmung_1x1', thema: 'nacht',
    foto: 'nyhavn_abend.jpg', breite: 1080, hoehe: 1080, fotoPosition: '50% 50%',
    layout: 'himmel', headlineAlign: 'left', headlineGroesse: 74, headlineOben: 18, headlineLinks: 40,
    logo: { right: 10, top: 10 }, logoGroesse: 112,
    haeuser: [
      { left: 560, top: 250, right: 1080, bottom: 1080 }, // Häuserzeile
      { left: 0, top: 470, right: 560, bottom: 1080 },   // Häuser hinten links
    ],
    sticker: { d: 356, x: 250, y: 650, drehung: -8, preis: 84 },
    fussOben: 846, fussUnten: 22, kompakt: true, preisAnker: true, fristFeld: true,
  },
  {
    name: 'q3_nyhavn17_1x1', thema: 'petrol',
    foto: 'nyhavn_17.jpg', breite: 1080, hoehe: 1080, fotoPosition: '50% 30%',
    layout: 'himmel', headlineAlign: 'left', headlineGroesse: 70, headlineOben: 18, headlineLinks: 40,
    logo: { right: 10, top: 10 }, logoGroesse: 112,
    haeuser: [
      { left: 700, top: 0, right: 790, bottom: 1080 },  // Masten
      { left: 0, top: 160, right: 700, bottom: 1080 },  // Häuserzeile mit Antennen
    ],
    sticker: { d: 356, x: 830, y: 630, drehung: 7, preis: 84 },
    fussOben: 846, fussUnten: 22, kompakt: true, preisAnker: true, fristFeld: true,
  },
];
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function loadPlaywright() {
  try {
    return require('playwright');
  } catch {
    return require(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
  }
}

const dir = __dirname;
const url = (p) => 'file://' + path.resolve(dir, p);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Form des Preis-Stickers
function stickerSvg(d, t) {
  const c = d / 2, R = c - 12, pts = [];
  let ring = '';
  if (t.stickerForm === 'zacken') {
    const N = 22;
    for (let i = 0; i < N * 2; i++) {
      const w = (i / (N * 2)) * Math.PI * 2, r = i % 2 ? R - 24 : R;
      pts.push(`${(c + r * Math.cos(w)).toFixed(1)},${(c + r * Math.sin(w)).toFixed(1)}`);
    }
    ring = `<circle cx="${c}" cy="${c}" r="${R - 42}" fill="none" stroke="${t.ring}" stroke-width="3" opacity=".8"/>`;
  } else {
    const welle = t.stickerForm === 'rosette' ? { A: 4, N: 44 } : { A: 9, N: 26 };
    for (let i = 0; i <= 720; i++) {
      const w = (i / 720) * Math.PI * 2, r = R + welle.A * Math.cos(welle.N * w);
      pts.push(`${(c + r * Math.cos(w)).toFixed(1)},${(c + r * Math.sin(w)).toFixed(1)}`);
    }
    ring = t.stickerForm === 'rosette'
      ? `<circle cx="${c}" cy="${c}" r="${R - 18}" fill="none" stroke="${t.ring}" stroke-width="5"/>
         <circle cx="${c}" cy="${c}" r="${R - 28}" fill="none" stroke="${t.ring}" stroke-width="2"/>`
      : `<circle cx="${c}" cy="${c}" r="${R - 30}" fill="none" stroke="${t.ring}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>`;
  }
  return `<svg class="sticker-form" width="${d}" height="${d}" viewBox="0 0 ${d} ${d}">
    <polygon points="${pts.join(' ')}" fill="${t.sticker}"/>
    ${ring}
  </svg>`;
}

function baueHtml(v) {
  const kopfband = v.layout === 'kopfband';
  const t = THEMEN[v.thema || 'kino'];
  const s = v.sticker;
  const logoPos = v.logo.center
    ? `left: 50%; top: ${v.logo.top}px; transform: translateX(-50%);`
    : `${v.logo.left !== undefined ? `left: ${v.logo.left}px;` : `right: ${v.logo.right}px;`} top: ${v.logo.top}px;`;
  const headlinePos = v.headlineAlign === 'left'
    ? `left: ${v.headlineLinks}px; text-align: left;`
    : 'left: 0; right: 0; text-align: center;';
  const [s1, s2, s3] = t.streifen;
  const streifen = (top, umgekehrt) => {
    const [a, b, c] = umgekehrt ? [s3, s2, s1] : [s1, s2, s3];
    const verlauf = t.streifenStil === 'linien'
      ? `transparent 0 14px, ${a} 14px 20px, ${t.fuss} 20px 28px, ${c} 28px 32px, ${t.fuss} 32px 36px`
      : `${a} 0 12px, ${b} 12px 24px, ${c} 24px 36px`;
    return `position: absolute; left: 0; right: 0; top: ${top}px; height: 36px; background: linear-gradient(to bottom, ${verlauf});`;
  };

  const infoHtml = `<div class="leistungen" data-text>${LEISTUNGEN.map(esc).join('<span class="punkt">•</span>')}</div>
    <div class="frist" data-text>${esc(FRIST)}</div>`;

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<style>
  /* Titan One und Rubik von Google Fonts, lokal abgelegt */
  @font-face { font-family: 'Titan One'; src: url('${url('fonts/TitanOne-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Rubik'; src: url('${url('fonts/Rubik-latin.woff2')}') format('woff2'); font-weight: 300 900; }

  :root { --creme: ${CREME}; --senf: ${SENFGELB}; --orange: ${ORANGE}; --rost: ${ROSTROT}; --braun: ${DUNKELBRAUN}; --wa: ${WHATSAPP_GRUEN}; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${v.breite}px; height: ${v.hoehe}px; overflow: hidden; }
  body { position: relative; font-family: 'Rubik', sans-serif; -webkit-font-smoothing: antialiased; background: var(--braun); color: var(--braun); }

  /* Foto unverändert, nur auf das Format zugeschnitten */
  .foto { position: absolute; left: 0; width: 100%; top: ${v.fotoBereich ? v.fotoBereich.top : 0}px; height: ${v.fotoBereich ? v.fotoBereich.bottom - v.fotoBereich.top : v.hoehe}px;
    object-fit: cover; object-position: ${v.fotoPosition}; }
  .kopf-inhalt { position: absolute; left: 0; right: 0; top: ${v.headlineOben + v.headlineGroesse * 2 + 30}px; display: flex; flex-direction: column; align-items: center; text-align: center; }

  .kopf { position: absolute; left: 0; right: 0; top: 0; height: ${v.kopfHoehe || 0}px; background: var(--braun); }
  .kopf-streifen { ${streifen(v.kopfHoehe || 0, true)} }

  .headline { position: absolute; ${headlinePos} top: ${v.headlineOben}px;
    font-family: 'Titan One', sans-serif; font-size: ${v.headlineGroesse}px; line-height: .98; letter-spacing: .01em;
    color: ${kopfband ? 'var(--creme)' : t.headline1}; }
  .headline .jahr { color: ${kopfband ? 'var(--senf)' : t.headline2}; }
  ${t.headlineTag && !kopfband ? `.headline { background: ${t.headlineTag}; padding: 14px 26px 18px; border-radius: 18px; margin-left: -26px; }` : ''}

  /* Logo rund mit weichem Übergang */
  .logo-halo { position: absolute; ${logoPos} width: ${v.logoGroesse || 132}px; height: ${v.logoGroesse || 132}px; border-radius: 50%;
    background: radial-gradient(circle, rgba(243,230,200,.95) 0%, rgba(243,230,200,.88) 52%, rgba(243,230,200,0) 71%);
    display: grid; place-items: center; }
  .logo { width: ${Math.round((v.logoGroesse || 132) * 0.727)}px; height: ${Math.round((v.logoGroesse || 132) * 0.727)}px; border-radius: 50%; object-fit: cover; transform: scale(1.18);
    -webkit-mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%);
            mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%); }

  /* Dunkler Kino-Fuß mit 70er-Streifen */
  .fuss { position: absolute; left: 0; right: 0; top: ${v.fussOben}px; bottom: 0; background: ${t.fuss}; }
  .fuss-streifen { ${streifen(v.fussOben - 36, false)} }

  /* Preis-Sticker */
  .sticker { position: absolute; left: ${s.x}px; top: ${s.y}px; width: ${s.d}px; height: ${s.d}px;
    transform: translate(-50%, -50%) rotate(${s.drehung}deg);
    filter: drop-shadow(0 10px 16px rgba(30,15,5,.35)); }
  .sticker-form { position: absolute; inset: 0; }
  .sticker-inhalt { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
  .sticker-inhalt { color: ${t.stickerText}; }
  .vorsatz { font-size: ${Math.round(s.preis * 0.32)}px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
  .preis { font-family: 'Titan One', sans-serif; font-size: ${s.preis}px; line-height: 1; color: ${t.preis}; margin-top: 2px; white-space: nowrap; }
  .zusatz { font-size: ${Math.round(s.preis * 0.3)}px; font-weight: 800; white-space: nowrap; }
  .anker { color: ${t.stickerForm === 'zacken' ? t.stickerText : t.preis}; margin-left: .25em; opacity: ${t.stickerForm === 'zacken' ? .85 : 1}; }
  .anker s { text-decoration-thickness: 3px; }

  /* Inhalt im Fuß, mittig */
  .fuss-inhalt { position: absolute; left: 0; right: 0; bottom: ${v.fussUnten}px; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .leistungen { font-size: ${v.kompakt ? 38 : 46}px; font-weight: 700; color: ${t.leistungen}; white-space: nowrap; }
  .leistungen .punkt { color: ${t.punkt}; margin: 0 .4em; }
  .frist { margin-top: ${v.kompakt ? 6 : 14}px; font-size: ${v.kompakt ? 31 : 38}px; font-weight: 600; color: var(--senf); }
  .cta.pille { border-radius: 999px; }
  .frist-feld .frist { margin-top: 10px; padding: 3px 16px; border-radius: 8px; background: ${t.fristBg}; color: ${t.fristText}; font-weight: 700; }

  /* CTA als Eintrittskarte mit Einkerbungen */
  .cta { margin-top: ${v.kompakt ? 16 : 30}px; padding: ${v.kompakt ? '15px 56px' : '22px 64px'}; background: var(--wa); color: #fff; border-radius: 10px;
    font-size: ${v.kompakt ? 38 : 46}px; font-weight: 800; white-space: nowrap; }
  .cta.ticket {
    -webkit-mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat;
            mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat,
                  radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat; }
</style>
</head>
<body>
  <img class="foto" src="${url(v.foto)}" alt="">
  ${kopfband ? '<div class="kopf"></div><div class="kopf-streifen"></div>' : ''}

  <div class="headline" data-check="headline">
    <div data-text>${esc(HEADLINE_1)}</div>
    <div class="jahr" data-text>${esc(HEADLINE_2)}</div>
  </div>

  <div class="logo-halo" data-check="logo"><img class="logo" src="${url(LOGO)}" alt=""></div>

  <div class="fuss-streifen"></div>
  <div class="fuss"></div>

  <div class="sticker" data-check="sticker">
    ${stickerSvg(s.d, t)}
    <div class="sticker-inhalt">
      <div class="vorsatz" data-text>${esc(PREIS_VORSATZ)}</div>
      <div class="preis" data-text data-im-sticker>${esc(PREIS)}</div>
      <div class="zusatz" data-text>${esc(PREIS_ZUSATZ)}${v.preisAnker ? ` <span class="anker">statt <s>${esc(PREIS_ALT)}</s></span>` : ''}</div>
    </div>
  </div>

  ${v.story ? `<div class="kopf-inhalt" data-check="info">${infoHtml}</div>` : ''}
  <div class="fuss-inhalt ${v.fristFeld ? 'frist-feld' : ''}" data-check="fuss">
    ${v.story ? '' : infoHtml}
    <div class="cta ${t.ctaForm === 'pille' ? 'pille' : 'ticket'}" data-text>${esc(CTA)}</div>
  </div>
</body>
</html>`;
}

// Prüfung im Browser: Ränder, Überlappungen, Headline gegen Häuser, Preis im Sticker
function pruefen([W, H, D, haeuser, kopfHoehe]) {
  const out = [];
  if (!document.fonts.check('100px "Titan One"')) out.push('Titan One nicht geladen');
  if (!document.fonts.check('700 32px Rubik')) out.push('Rubik nicht geladen');
  const textBox = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
  const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const box = {};
  document.querySelectorAll('[data-check]').forEach((el) => {
    if (['headline', 'fuss', 'info'].includes(el.dataset.check)) {
      const rs = [...el.querySelectorAll('[data-text]')].map(textBox);
      box[el.dataset.check] = { left: Math.min(...rs.map((r) => r.left)), right: Math.max(...rs.map((r) => r.right)),
        top: Math.min(...rs.map((r) => r.top)), bottom: Math.max(...rs.map((r) => r.bottom)) };
    } else box[el.dataset.check] = el.getBoundingClientRect();
  });
  Object.entries(box).forEach(([k, r]) => {
    if (r.left < 8 || r.top < 8 || r.right > W - 8 || r.bottom > H - 8) out.push(`${k} ragt zu nah an/über den Rand`);
  });
  const n = Object.keys(box);
  n.forEach((a, i) => n.slice(i + 1).forEach((b) => {
    if (a !== 'sticker' && b !== 'sticker' && hit(box[a], box[b])) out.push(`${a} überlappt ${b}`);
  }));
  if (hit(box.sticker, box.headline) || hit(box.sticker, box.logo)) out.push('Sticker überlappt Headline oder Logo');
  const ctx = document.createElement('canvas').getContext('2d');
  document.querySelectorAll('.headline [data-text]').forEach((el) => {
    ctx.font = `${getComputedStyle(el).fontSize} "Titan One"`;
    const m = ctx.measureText(el.textContent);
    const line = textBox(el);
    const baseline = line.top + (line.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
    const g = { left: line.left, right: line.right, top: baseline - m.actualBoundingBoxAscent, bottom: baseline + m.actualBoundingBoxDescent };
    (haeuser || []).forEach((h, i) => { if (hit(g, h)) out.push(`Headline "${el.textContent}" überlappt Hausfläche ${i + 1}`); });
    if (kopfHoehe && g.bottom > kopfHoehe - 24) out.push(`Headline "${el.textContent}" ragt aus dem Kopfband`);
    if (g.left < 40 || g.right > W - 40) out.push(`Headline "${el.textContent}" zu breit`);
  });
  // Sticker darf keinen anderen Text berühren (12 px Luft)
  const st = box.sticker, luft = { left: st.left - 12, right: st.right + 12, top: st.top - 12, bottom: st.bottom + 12 };
  document.querySelectorAll('[data-text]').forEach((el) => {
    if (!el.closest('.sticker') && hit(luft, textBox(el))) out.push(`Sticker berührt Text "${el.textContent}"`);
  });
  const leist = textBox(document.querySelector('.leistungen'));
  const p = textBox(document.querySelector('[data-im-sticker]'));
  if (p.width > D - 2 * 46) out.push(`Preis zu breit für den Sticker (${Math.round(p.width)}px)`);
  document.querySelectorAll('.fuss-inhalt [data-text], .kopf-inhalt [data-text]').forEach((el) => {
    const t = textBox(el);
    if (t.left < 24 || t.right > W - 24) out.push(`Text zu breit: "${el.textContent}"`);
  });
  return { out, sticker: `y ${Math.round(box.sticker.top)}–${Math.round(box.sticker.bottom)}`, leist: Math.round(leist.top) };
}

(async () => {
  const auswahl = process.argv[2];
  const liste = auswahl ? VARIATIONEN.filter((v) => v.name === auswahl) : VARIATIONEN;
  if (!liste.length) { console.error(`Unbekannte Variation: ${auswahl}`); process.exit(1); }

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const htmlPath = path.join(dir, 'creative.html');
  process.on('exit', () => fs.rmSync(htmlPath, { force: true }));
  let fehler = false;

  for (const v of liste) {
    if (!fs.existsSync(path.resolve(dir, v.foto))) { console.error(`${v.name}: Foto fehlt (${v.foto})`); fehler = true; continue; }
    const page = await browser.newPage({ viewport: { width: v.breite, height: v.hoehe } });
    fs.writeFileSync(htmlPath, baueHtml(v));
    await page.goto('file://' + htmlPath);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    const r = await page.evaluate(pruefen, [v.breite, v.hoehe, v.sticker.d, v.haeuser, v.layout === 'kopfband' ? v.kopfHoehe : 0]);
    const ausgabe = path.join(dir, `${v.name}.png`);
    await page.screenshot({ path: ausgabe });
    await page.close();

    const b64 = fs.readFileSync(ausgabe).toString('base64');
    const vw = Math.round(v.breite / 4), vh = Math.round(v.hoehe / 4);
    const prev = await browser.newPage({ viewport: { width: vw, height: vh } });
    await prev.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:${vw}px;height:${vh}px;display:block"></body>`);
    await prev.screenshot({ path: path.join(dir, `${v.name}_vorschau25.png`) });
    await prev.close();

    if (r.out.length) { fehler = true; console.error(`${v.name}: PROBLEME\n  - ${r.out.join('\n  - ')}`); }
    else console.log(`${v.name}: OK (Sticker ${r.sticker}, Leistungszeile ab y ${r.leist})`);
  }
  await browser.close();
  if (fehler) process.exitCode = 1;
})();
