// 5 Facebook-Posts 4:5 „Kopenhagen 2027“ – Starshine Emotions
// Ausführen:              node render.cjs              (alle Posts)
// Nur ein Post:           node render.cjs post3_frist
// Ergebnis je Post:       <name>.png (1080 x 1350) und <name>_vorschau25.png

// ===== FESTE ANGEBOTSDATEN (gelten für alle Posts) ===========================
const PREIS = '965 €';
const PREIS_ALT = '999 €';
const ERSPARNIS = '34 €';
const ERSPARNIS_ZU_ZWEIT = '68 €';
const LEISTUNGEN = ['Hotel', 'Frühstück', 'Stadtprogramm'];
const FRIST = 'Frühbucherpreis bis 31. Oktober';
const CTA = 'WhatsApp: „Kopenhagen 2027“';

// ===== FARBEN ===============================================================
const CREME = '#F3E6C8';
const SENFGELB = '#E8A33D';
const ORANGE = '#D9702B';
const ROSTROT = '#B5432A';
const DUNKELBRAUN = '#3A2418';
const WHATSAPP_GRUEN = '#1DA851';

// stickerForm: 'welle' | 'rosette' | 'zacken'   ctaForm: 'ticket' | 'pille'   streifen: 3 Farben oder null
const THEMEN = {
  kino:   { fuss: DUNKELBRAUN, fussText: CREME, akzent: SENFGELB, streifen: [SENFGELB, ORANGE, ROSTROT],
            sticker: SENFGELB, stickerText: DUNKELBRAUN, preis: ROSTROT, ring: DUNKELBRAUN, stickerForm: 'welle',
            tag: DUNKELBRAUN, tagText: CREME, tagAkzent: SENFGELB, fristBg: SENFGELB, fristText: DUNKELBRAUN, ctaForm: 'ticket' },
  petrol: { fuss: '#0F3B3A', fussText: CREME, akzent: '#E2674A', streifen: ['#E2674A', SENFGELB, '#2E7D74'],
            sticker: '#E2674A', stickerText: '#FFF3E0', preis: '#FFF3E0', ring: '#FFF3E0', stickerForm: 'zacken',
            tag: '#0F3B3A', tagText: CREME, tagAkzent: '#F08A6E', fristBg: SENFGELB, fristText: '#0F3B3A', ctaForm: 'ticket' },
  creme:  { fuss: CREME, fussText: DUNKELBRAUN, akzent: ROSTROT, streifen: [ROSTROT, ORANGE, SENFGELB],
            sticker: ROSTROT, stickerText: CREME, preis: CREME, ring: CREME, stickerForm: 'welle',
            tag: CREME, tagText: DUNKELBRAUN, tagAkzent: ROSTROT, fristBg: ROSTROT, fristText: CREME, ctaForm: 'pille' },
  nacht:  { fuss: '#16233F', fussText: CREME, akzent: '#E8B04A', streifen: null,
            sticker: CREME, stickerText: '#16233F', preis: '#C2412D', ring: '#16233F', stickerForm: 'rosette',
            tag: '#16233F', tagText: CREME, tagAkzent: '#E8B04A', fristBg: '#E8B04A', fristText: '#16233F', ctaForm: 'pille' },
  beere:  { fuss: '#4A1F3D', fussText: '#FBE9E7', akzent: '#F2A0A8', streifen: ['#F2A0A8', SENFGELB, '#B03A5B'],
            sticker: SENFGELB, stickerText: '#4A1F3D', preis: '#4A1F3D', ring: '#4A1F3D', stickerForm: 'zacken',
            tag: '#4A1F3D', tagText: '#FBE9E7', tagAkzent: '#F2A0A8', fristBg: '#F2A0A8', fristText: '#4A1F3D', ctaForm: 'ticket' },
};

const LOGO = 'logo.jpg';

// ===== DIE 5 POSTS ==========================================================
// kopf.zeilen: große Headline (Titan One), kopf.kicker: kleine Zeile darüber
// kopf.tag: true = Headline auf Farbfläche (für unruhigen Himmel)
// sticker.art: 'sparen' (34 € sparen), 'preis' (965 € statt 999 €), 'zuzweit' (zu zweit 68 € sparen)
// info: Zeilen im Fuß über Frist und Button; haeuser: Flächen, die die Headline nicht berühren darf
const POSTS = [
  {
    name: 'post1_maechtig_gewaltig', thema: 'kino',
    foto: 'kopenhagen_auto.jpg', fotoPosition: '50% 50%', fotoUnten: 320, // Foto endet über dem Fuß, damit das Auto ganz sichtbar bleibt
    kopf: { x: 44, y: 40, tag: true, kicker: 'Für alle, die mit der Olsenbande groß geworden sind', zeilen: ['Mächtig gewaltig:', 'Kopenhagen 2027'], groesse: 68 },
    logo: { right: 12, top: 12 },
    sticker: { art: 'sparen', d: 330, x: 840, y: 470, drehung: 8 },
    info: ['4 Tage ab 965 € p. P. statt 999 €', 'Bus ab Erfurt · Mai 2027'],
  },
  {
    name: 'post2_erinnern_sie_sich', thema: 'petrol',
    foto: 'nyhavn_17.jpg', fotoPosition: '50% 8%',
    kopf: { x: 44, y: 34, kicker: 'Erinnern Sie sich?', zeilen: ['Früher im Fernsehen.', 'Jetzt live erleben.'], groesse: 58 },
    logo: { right: 12, top: 12 },
    haeuser: [{ left: 0, top: 330, right: 700, bottom: 1350 }, { left: 730, top: 80, right: 790, bottom: 1350 }],
    sticker: { art: 'preis', d: 380, x: 820, y: 760, drehung: 7 },
    info: ['Hotel • Frühstück • Stadtprogramm', `Frühbucher sparen ${ERSPARNIS} pro Person`],
  },
  {
    name: 'post3_frist', thema: 'creme',
    foto: 'nyhavn_rotes_haus.jpg', fotoPosition: '50% 50%',
    kopf: { x: 156, y: 22, kicker: 'Frühbucher aufgepasst', zeilen: ['Nur bis 31. Oktober'], groesse: 64, dunkel: true },
    logo: { left: 12, top: 12 },
    haeuser: [{ left: 846, top: 112, right: 1080, bottom: 1350 }, { left: 985, top: 70, right: 1030, bottom: 1350 }, { left: 190, top: 270, right: 880, bottom: 1350 }],
    sticker: { art: 'sparen', d: 360, x: 540, y: 740, drehung: -6 },
    info: ['Kopenhagen 2027 · 4 Tage ab 965 € p. P.', 'Hotel • Frühstück • Stadtprogramm'],
  },
  {
    name: 'post4_zuruecklehnen', thema: 'nacht',
    foto: 'nyhavn_abend.jpg', fotoPosition: '50% 50%',
    kopf: { x: 44, y: 40, tag: true, kicker: 'Einsteigen in Erfurt.', zeilen: ['Ankommen in', 'Kopenhagen.'], groesse: 70 },
    logo: { right: 12, top: 12 },
    sticker: { art: 'preis', d: 370, x: 290, y: 760, drehung: -7 },
    info: ['Hotel, Frühstück, Stadtprogramm – alles dabei.', 'Sie lehnen sich einfach zurück.'],
  },
  {
    name: 'post5_zu_zweit', thema: 'beere',
    foto: 'nyhavn_abend.jpg', fotoPosition: '88% 60%', fotoZoom: 1.45,
    kopf: { x: 44, y: 40, tag: true, kicker: 'Die Reise, von der Sie schon so lange reden', zeilen: ['Kopenhagen', 'zu zweit erleben'], groesse: 70 },
    logo: { right: 12, top: 12 },
    sticker: { art: 'zuzweit', d: 360, x: 790, y: 770, drehung: 8 },
    info: ['4 Tage ab 965 € p. P. statt 999 €', 'Hotel • Frühstück • Stadtprogramm'],
  },
];
// ============================================================================

const BREITE = 1080;
const HOEHE = 1350;

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

function stickerSvg(d, t) {
  const c = d / 2, R = c - 12, pts = [];
  let ring;
  if (t.stickerForm === 'zacken') {
    const N = 22;
    for (let i = 0; i < N * 2; i++) {
      const w = (i / (N * 2)) * Math.PI * 2, r = i % 2 ? R - 24 : R;
      pts.push(`${(c + r * Math.cos(w)).toFixed(1)},${(c + r * Math.sin(w)).toFixed(1)}`);
    }
    ring = `<circle cx="${c}" cy="${c}" r="${R - 42}" fill="none" stroke="${t.ring}" stroke-width="3" opacity=".8"/>`;
  } else {
    const wl = t.stickerForm === 'rosette' ? { A: 4, N: 44 } : { A: 9, N: 26 };
    for (let i = 0; i <= 720; i++) {
      const w = (i / 720) * Math.PI * 2, r = R + wl.A * Math.cos(wl.N * w);
      pts.push(`${(c + r * Math.cos(w)).toFixed(1)},${(c + r * Math.sin(w)).toFixed(1)}`);
    }
    ring = t.stickerForm === 'rosette'
      ? `<circle cx="${c}" cy="${c}" r="${R - 18}" fill="none" stroke="${t.ring}" stroke-width="5"/><circle cx="${c}" cy="${c}" r="${R - 28}" fill="none" stroke="${t.ring}" stroke-width="2"/>`
      : `<circle cx="${c}" cy="${c}" r="${R - 30}" fill="none" stroke="${t.ring}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>`;
  }
  return `<svg class="sticker-form" width="${d}" height="${d}" viewBox="0 0 ${d} ${d}"><polygon points="${pts.join(' ')}" fill="${t.sticker}"/>${ring}</svg>`;
}

function stickerInhalt(art, d) {
  const g = Math.round(d * 0.25); // Größe der großen Zahl
  if (art === 'sparen') return `
    <div class="st-klein" data-text>Jetzt</div>
    <div class="st-gross" style="font-size:${Math.round(g * 1.12)}px" data-text data-zahl>${esc(ERSPARNIS)}</div>
    <div class="st-mittel" data-text>sparen</div>`;
  if (art === 'zuzweit') return `
    <div class="st-klein" data-text>Zu zweit</div>
    <div class="st-gross" style="font-size:${Math.round(g * 1.12)}px" data-text data-zahl>${esc(ERSPARNIS_ZU_ZWEIT)}</div>
    <div class="st-mittel" data-text>sparen</div>`;
  return `
    <div class="st-klein" data-text>4 Tage ab</div>
    <div class="st-gross" style="font-size:${g}px" data-text data-zahl>${esc(PREIS)}</div>
    <div class="st-anker" data-text>p. P. <span class="anker">statt <s>${esc(PREIS_ALT)}</s></span></div>`;
}

function baueHtml(p) {
  const t = THEMEN[p.thema];
  const k = p.kopf, s = p.sticker;
  const logoPos = `${p.logo.left !== undefined ? `left: ${p.logo.left}px;` : `right: ${p.logo.right}px;`} top: ${p.logo.top}px;`;
  const center = k.align === 'center';
  const kopfFarbe = k.tag ? t.tagText : (k.dunkel ? DUNKELBRAUN : t.fuss);
  const kopfAkzent = k.tag ? t.tagAkzent : t.akzent;
  const streifen = t.streifen
    ? `linear-gradient(to bottom, ${t.streifen[0]} 0 12px, ${t.streifen[1]} 12px 24px, ${t.streifen[2]} 24px 36px)`
    : `linear-gradient(to bottom, transparent 0 14px, ${t.akzent} 14px 20px, ${t.fuss} 20px 28px, ${t.akzent} 28px 32px, ${t.fuss} 32px 36px)`;

  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<style>
  @font-face { font-family: 'Titan One'; src: url('${url('fonts/TitanOne-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Rubik'; src: url('${url('fonts/Rubik-latin.woff2')}') format('woff2'); font-weight: 300 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${BREITE}px; height: ${HOEHE}px; overflow: hidden; }
  body { position: relative; font-family: 'Rubik', sans-serif; -webkit-font-smoothing: antialiased; background: ${t.fuss}; }

  /* Foto unverändert, nur zugeschnitten */
  .foto-rahmen { position: absolute; left: 0; right: 0; top: 0; bottom: ${p.fotoUnten || 0}px; overflow: hidden; }
  .foto { width: 100%; height: 100%; object-fit: cover; object-position: ${p.fotoPosition};
    transform: scale(${p.fotoZoom || 1}); transform-origin: ${p.fotoPosition}; }

  /* Kopf: Kicker + Headline */
  .kopf { position: absolute; top: ${k.y}px; ${center ? 'left: 0; right: 0; text-align: center;' : `left: ${k.x}px;`} }
  .kopf-innen { display: inline-block; ${k.tag ? `background: ${t.tag}; padding: 18px 28px 22px; border-radius: 20px; margin-left: -28px;` : ''} }
  .kicker { font-size: ${Math.round(k.groesse * 0.42)}px; font-weight: 700; color: ${kopfAkzent}; margin-bottom: 8px; white-space: nowrap; }
  .zeile { font-family: 'Titan One', sans-serif; font-size: ${k.groesse}px; line-height: 1.02; color: ${kopfFarbe}; white-space: nowrap; }
  .zeile + .zeile { color: ${kopfAkzent}; }
  ${!k.tag ? `.kopf .zeile, .kopf .kicker { text-shadow: 0 0 18px rgba(255,255,255,.55); }` : ''}

  .logo-halo { position: absolute; ${logoPos} width: 120px; height: 120px; border-radius: 50%;
    background: radial-gradient(circle, rgba(243,230,200,.95) 0%, rgba(243,230,200,.88) 52%, rgba(243,230,200,0) 71%); display: grid; place-items: center; }
  .logo { width: 88px; height: 88px; border-radius: 50%; object-fit: cover; transform: scale(1.18);
    -webkit-mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%); mask-image: radial-gradient(circle, #000 58%, rgba(0,0,0,.6) 66%, transparent 71%); }

  /* Fuß mit Streifen, Höhe ergibt sich aus dem Inhalt */
  .fuss { position: absolute; left: 0; right: 0; bottom: 0; background: ${t.fuss}; padding: 34px 0 36px;
    display: flex; flex-direction: column; align-items: center; text-align: center; color: ${t.fussText}; }
  .fuss::before { content: ''; position: absolute; left: 0; right: 0; top: -36px; height: 36px; background: ${streifen}; }
  .info1 { font-size: 40px; font-weight: 800; white-space: nowrap; }
  .info2 { font-size: 32px; font-weight: 600; margin-top: 6px; white-space: nowrap; opacity: .92; }
  .frist { margin-top: 16px; padding: 4px 18px; border-radius: 8px; background: ${t.fristBg}; color: ${t.fristText}; font-size: 32px; font-weight: 700; white-space: nowrap; }
  .cta { margin-top: 20px; padding: 18px 60px; background: ${WHATSAPP_GRUEN}; color: #fff; font-size: 42px; font-weight: 800; white-space: nowrap;
    border-radius: ${t.ctaForm === 'pille' ? '999px' : '10px'};
    ${t.ctaForm === 'ticket' ? `-webkit-mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat;
            mask: radial-gradient(circle 16px at 0 50%, transparent 98%, #000) left / 51% 100% no-repeat, radial-gradient(circle 16px at 100% 50%, transparent 98%, #000) right / 51% 100% no-repeat;` : ''} }

  /* Rabatt-Sticker */
  .sticker { position: absolute; left: ${s.x}px; top: ${s.y}px; width: ${s.d}px; height: ${s.d}px;
    transform: translate(-50%, -50%) rotate(${s.drehung}deg); filter: drop-shadow(0 10px 16px rgba(20,10,5,.35)); }
  .sticker-form { position: absolute; inset: 0; }
  .sticker-inhalt { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: ${t.stickerText}; }
  .st-klein { font-size: ${Math.round(s.d * 0.085)}px; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; }
  .st-anker { font-size: ${Math.round(s.d * 0.072)}px; font-weight: 800; white-space: nowrap; margin-top: 4px; }
  .st-mittel { font-family: 'Titan One', sans-serif; font-size: ${Math.round(s.d * 0.12)}px; text-transform: uppercase; line-height: 1; white-space: nowrap; }
  .st-gross { font-family: 'Titan One', sans-serif; line-height: 1; color: ${t.preis}; white-space: nowrap; margin: 2px 0; }
  .anker { color: ${t.stickerForm === 'zacken' ? t.stickerText : t.preis}; }
  .anker s { text-decoration-thickness: 3px; }
</style></head>
<body>
  <div class="foto-rahmen"><img class="foto" src="${url(p.foto)}" alt=""></div>

  <div class="kopf" data-check="kopf"><div class="kopf-innen">
    ${k.kicker ? `<div class="kicker" data-text>${esc(k.kicker)}</div>` : ''}
    ${k.zeilen.map((z) => `<div class="zeile" data-text data-headline>${esc(z)}</div>`).join('')}
  </div></div>

  <div class="logo-halo" data-check="logo"><img class="logo" src="${url(LOGO)}" alt=""></div>

  <div class="fuss" data-check="fuss">
    <div class="info1" data-text>${esc(p.info[0])}</div>
    ${p.info[1] ? `<div class="info2" data-text>${esc(p.info[1])}</div>` : ''}
    <div class="frist" data-text>${esc(FRIST)}</div>
    <div class="cta" data-text>${esc(CTA)}</div>
  </div>

  <div class="sticker" data-check="sticker">
    ${stickerSvg(s.d, t)}
    <div class="sticker-inhalt">${stickerInhalt(s.art, s.d)}</div>
  </div>
</body></html>`;
}

function pruefen([W, H, D, haeuser]) {
  const out = [];
  if (!document.fonts.check('100px "Titan One"')) out.push('Titan One nicht geladen');
  if (!document.fonts.check('700 32px Rubik')) out.push('Rubik nicht geladen');
  const tb = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
  const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const pad = (r, n) => ({ left: r.left - n, right: r.right + n, top: r.top - n, bottom: r.bottom + n });
  const kopf = document.querySelector('.kopf-innen').getBoundingClientRect();
  const logo = document.querySelector('.logo-halo').getBoundingClientRect();
  const sticker = document.querySelector('.sticker').getBoundingClientRect();
  const fuss = document.querySelector('.fuss').getBoundingClientRect();
  const texte = [...document.querySelectorAll('[data-text]')];
  // alles im Bild
  [...texte.map(tb), logo, sticker, kopf].forEach((r) => {
    if (r.left < 8 || r.top < 8 || r.right > W - 8 || r.bottom > H - 8) out.push('Element ragt zu nah an/über den Rand');
  });
  texte.forEach((el) => { if (el.scrollWidth > el.clientWidth + 1) out.push(`Text abgeschnitten: "${el.textContent}"`); });
  if (hit(pad(kopf, 8), logo)) out.push('Kopf berührt das Logo');
  if (hit(kopf, fuss)) out.push('Kopf überlappt den Fuß');
  // Sticker darf keinen Text außerhalb berühren
  texte.filter((el) => !el.closest('.sticker')).forEach((el) => {
    if (hit(pad(sticker, 10), tb(el))) out.push(`Sticker berührt "${el.textContent.trim()}"`);
  });
  if (hit(sticker, kopf) || hit(sticker, logo)) out.push('Sticker überlappt Kopf oder Logo');
  // Sticker-Inhalt im inneren Kreis
  const c = { x: sticker.left + sticker.width / 2, y: sticker.top + sticker.height / 2 }, rInnen = D / 2 - 44;
  document.querySelectorAll('.sticker [data-text]').forEach((el) => {
    const r = tb(el);
    [[r.left, r.top], [r.right, r.top], [r.left, r.bottom], [r.right, r.bottom]].forEach(([x, y]) => {
      // Ecken der Textbox (leicht nach innen, da Glyphen die Box nicht ganz füllen)
      const dx = x - c.x, dy = (y - c.y) * 0.8;
      if (Math.hypot(dx, dy) > rInnen + 6) out.push(`Sticker-Text ragt an den Rand: "${el.textContent.trim()}"`);
    });
  });
  // Headline-Buchstaben gegen Häuser
  const ctx = document.createElement('canvas').getContext('2d');
  document.querySelectorAll('[data-headline]').forEach((el) => {
    ctx.font = `${getComputedStyle(el).fontSize} "Titan One"`;
    const m = ctx.measureText(el.textContent), line = tb(el);
    const base = line.top + (line.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent;
    const g = { left: line.left, right: line.right, top: base - m.actualBoundingBoxAscent, bottom: base + m.actualBoundingBoxDescent };
    (haeuser || []).forEach((h, i) => { if (hit(g, h)) out.push(`Headline "${el.textContent}" überlappt Hausfläche ${i + 1}`); });
  });
  return { out: [...new Set(out)], fussOben: Math.round(fuss.top), sticker: `y ${Math.round(sticker.top)}–${Math.round(sticker.bottom)}`, kopfUnten: Math.round(kopf.bottom) };
}

(async () => {
  const auswahl = process.argv[2];
  const liste = auswahl ? POSTS.filter((p) => p.name === auswahl) : POSTS;
  if (!liste.length) { console.error(`Unbekannter Post: ${auswahl}`); process.exit(1); }
  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const htmlPath = path.join(dir, 'post.html');
  process.on('exit', () => fs.rmSync(htmlPath, { force: true }));
  let fehler = false;
  for (const p of liste) {
    const page = await browser.newPage({ viewport: { width: BREITE, height: HOEHE } });
    fs.writeFileSync(htmlPath, baueHtml(p));
    await page.goto('file://' + htmlPath);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    const r = await page.evaluate(pruefen, [BREITE, HOEHE, p.sticker.d, p.haeuser]);
    const ausgabe = path.join(dir, `${p.name}.png`);
    await page.screenshot({ path: ausgabe });
    await page.close();
    const b64 = fs.readFileSync(ausgabe).toString('base64');
    const prev = await browser.newPage({ viewport: { width: BREITE / 4, height: Math.round(HOEHE / 4) } });
    await prev.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:${BREITE / 4}px;height:${Math.round(HOEHE / 4)}px;display:block"></body>`);
    await prev.screenshot({ path: path.join(dir, `${p.name}_vorschau25.png`) });
    await prev.close();
    if (r.out.length) { fehler = true; console.error(`${p.name}: PROBLEME\n  - ${r.out.join('\n  - ')}`); }
    else console.log(`${p.name}: OK (Kopf bis y ${r.kopfUnten}, Sticker ${r.sticker}, Fuß ab y ${r.fussOben})`);
  }
  await browser.close();
  if (fehler) process.exitCode = 1;
})();
