// 5 Facebook-Posts 4:5 „Kopenhagen 2027“ im ruhigen, hochwertigen Stil – Starshine Emotions
// Ausführen:              node render.cjs             (alle Posts)
// Nur ein Post:           node render.cjs post3_bis_ende_oktober
// Ergebnis je Post:       <name>.png (1080 x 1350) und <name>_vorschau25.png

// ===== GEMEINSAME TEXTE =====================================================
const CTA_VORSATZ = 'Per WhatsApp:';
const CTA_STICHWORT = '„Kopenhagen 2027“';
const VERTRAUEN = 'Starshine Emotions · Ihr Reisebüro in Erfurt';

// ===== FARBWELTEN ===========================================================
// flaeche = Textfeld, text = Haupttext, akzent = Gold für Preis und Linie, pille = Button
const FARBEN = {
  espresso: { flaeche: '#2E2016', text: '#F3E6CF', leise: 'rgba(243,230,207,.78)', akzent: '#C9A15A', pille: '#F3E6CF', pilleText: '#2E2016' },
  petrol:   { flaeche: '#123230', text: '#EEF1E6', leise: 'rgba(238,241,230,.78)', akzent: '#D9B26A', pille: '#EEF1E6', pilleText: '#123230' },
  hell:     { flaeche: '#F4EDE1', text: '#2A1E16', leise: 'rgba(42,30,22,.72)',   akzent: '#A9772F', pille: '#2A1E16', pilleText: '#F4EDE1' },
  nacht:    { flaeche: '#151E33', text: '#EEE8DA', leise: 'rgba(238,232,218,.78)', akzent: '#D8B46A', pille: '#EEE8DA', pilleText: '#151E33' },
  pflaume:  { flaeche: '#2C1828', text: '#F5E8E4', leise: 'rgba(245,232,228,.78)', akzent: '#D9A86C', pille: '#F5E8E4', pilleText: '#2C1828' },
};

// ===== DIE 5 POSTS ==========================================================
// headline: Teile in [eckigen Klammern] werden in Gold gesetzt, | erzwingt einen Zeilenumbruch
const POSTS = [
  {
    name: 'post1_maechtig_gewaltig', farben: 'espresso',
    foto: 'kopenhagen_auto.jpg', fotoPosition: '50% 96%',
    kicker: 'Für alle, die mit der Olsenbande groß geworden sind',
    headline: 'Mächtig gewaltig:|Kopenhagen für [965 €].', groesse: 84,
    unterzeile: 'Statt 999 € – nur für Frühbucher bis 31. Oktober.',
    fakten: '4 Tage · Hotel · Frühstück · Stadtprogramm · Bus ab Erfurt',
  },
  {
    name: 'post2_erinnern_sie_sich', farben: 'petrol',
    foto: 'nyhavn_17.jpg', fotoPosition: '50% 28%',
    kicker: 'Erinnern Sie sich?',
    headline: 'Früher im Fernsehen.|Jetzt für [965 €] erleben.', groesse: 80,
    unterzeile: '34 € gespart – nur bis 31. Oktober.',
    fakten: 'Kopenhagen 2027 · 4 Tage · Hotel · Frühstück',
  },
  {
    name: 'post3_bis_ende_oktober', farben: 'hell',
    foto: 'nyhavn_rotes_haus.jpg', fotoPosition: '50% 46%',
    kicker: 'Kopenhagen 2027 · 4 Tage',
    headline: '[965 €] bis Ende|Oktober.', groesse: 90,
    unterzeile: 'Danach 999 €.',
    fakten: 'Hotel · Frühstück · Stadtprogramm · Bus ab Erfurt',
  },
  {
    name: 'post4_einsteigen_ankommen', farben: 'nacht',
    foto: 'nyhavn_abend.jpg', fotoPosition: '50% 58%',
    kicker: 'Einsteigen in Erfurt.',
    headline: 'Ankommen in Kopenhagen.|Für [965 €].', groesse: 82,
    unterzeile: 'Statt 999 € – Frühbucherpreis bis 31. Oktober.',
    fakten: 'Hotel, Frühstück, Stadtprogramm – Sie lehnen sich zurück.',
  },
  {
    name: 'post5_zu_zweit', farben: 'pflaume',
    foto: 'nyhavn_abend.jpg', fotoPosition: '86% 56%', fotoZoom: 1.45,
    kicker: 'Die Reise, von der Sie schon so lange reden',
    headline: 'Zu zweit nach Kopenhagen.|[68 €] gespart.', groesse: 82,
    unterzeile: '965 € statt 999 € pro Person – nur bis 31. Oktober.',
    fakten: '4 Tage · Hotel · Frühstück · Stadtprogramm · Bus ab Erfurt',
  },
];

const FOTO_HOEHE = 760; // px, Rest ist das Textfeld
const RAND = 80;        // px linker Rand im Textfeld
const LOGO = 'logo.jpg';
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
const headlineHtml = (h) => h.split('|')
  .map((z) => `<span class="zeile" data-text>${esc(z).replace(/\[(.+?)\]/g, '<span class="gold">$1</span>')}</span>`)
  .join('');

function baueHtml(p) {
  const f = FARBEN[p.farben];
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<style>
  @font-face { font-family: 'Fraunces'; src: url('${url('fonts/Fraunces-latin.woff2')}') format('woff2'); font-weight: 100 900; }
  @font-face { font-family: 'Inter'; src: url('${url('fonts/Inter-latin.woff2')}') format('woff2'); font-weight: 100 900; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${BREITE}px; height: ${HOEHE}px; overflow: hidden; }
  body { position: relative; font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; background: ${f.flaeche}; color: ${f.text}; }

  /* Foto oben, unverändert, nur zugeschnitten */
  .foto-rahmen { position: absolute; left: 0; right: 0; top: 0; height: ${FOTO_HOEHE}px; overflow: hidden; }
  .foto { width: 100%; height: 100%; object-fit: cover; object-position: ${p.fotoPosition};
    transform: scale(${p.fotoZoom || 1}); transform-origin: ${p.fotoPosition}; }

  /* Ruhiges Textfeld */
  .feld > * { flex-shrink: 0; }
  .feld { position: absolute; left: 0; right: 0; top: ${FOTO_HOEHE}px; bottom: 0; padding: 50px ${RAND}px 58px; display: flex; flex-direction: column; }
  .bogen { position: absolute; right: -150px; bottom: -150px; width: 420px; height: 420px; border-radius: 50%;
    border: 34px solid ${f.akzent}; opacity: .9; }
  .kicker { font-size: 27px; font-weight: 600; letter-spacing: .02em; color: ${f.akzent}; white-space: nowrap; }
  .headline { margin-top: 14px; font-family: 'Fraunces', serif; font-weight: 700; font-size: ${p.groesse}px; line-height: 1.02;
    letter-spacing: -.02em; font-variation-settings: 'SOFT' 30, 'WONK' 0, 'opsz' 144; }
  .zeile { display: block; white-space: nowrap; }
  .gold { color: ${f.akzent}; }
  .linie { width: 340px; height: 3px; background: ${f.akzent}; margin-top: 30px; }
  .unterzeile { margin-top: 22px; font-size: 32px; font-weight: 500; white-space: nowrap; }
  .fakten { margin-top: 8px; font-size: 25px; font-weight: 400; color: ${f.leise}; white-space: nowrap; }
  .unten { margin-top: auto; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1; }
  .pille { display: inline-flex; align-items: baseline; gap: 12px; padding: 22px 40px; border-radius: 999px; background: ${f.pille}; color: ${f.pilleText};
    font-size: 34px; font-weight: 600; white-space: nowrap; }
  .pille b { font-weight: 800; color: ${p.farben === 'hell' ? f.pille === '#2A1E16' ? '#E7C27D' : f.akzent : f.akzent}; }
  .pille .klein { font-weight: 500; opacity: .8; }

  .vertrauen { position: absolute; left: ${RAND}px; bottom: 22px; font-size: 20px; font-weight: 500; color: ${f.leise}; white-space: nowrap; }
  .logo { position: absolute; right: 28px; top: ${FOTO_HOEHE - 114}px; width: 200px; height: 200px; border-radius: 50%;
    box-shadow: 0 6px 18px rgba(0,0,0,.25);
    object-fit: cover; border: 6px solid ${f.flaeche}; background: #fff; }
</style></head>
<body>
  <div class="foto-rahmen"><img class="foto" src="${url(p.foto)}" alt=""></div>
  <div class="feld">
    <div class="bogen"></div>
    <div class="kicker" data-text>${esc(p.kicker)}</div>
    <div class="headline">${headlineHtml(p.headline)}</div>
    <div class="linie"></div>
    <div class="unterzeile" data-text>${esc(p.unterzeile)}</div>
    <div class="fakten" data-text>${esc(p.fakten)}</div>
    <div class="unten">
      <div class="pille" data-text><span class="klein">${esc(CTA_VORSATZ)}</span> <b>${esc(CTA_STICHWORT)}</b></div>
    </div>
  </div>
  <div class="vertrauen" data-text>${esc(VERTRAUEN)}</div>
  <img class="logo" src="${url(LOGO)}" alt="">
</body></html>`;
}

function pruefen([W, H]) {
  const out = [];
  if (!document.fonts.check('700 80px Fraunces')) out.push('Fraunces nicht geladen');
  if (!document.fonts.check('500 30px Inter')) out.push('Inter nicht geladen');
  const tb = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
  const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const texte = [...document.querySelectorAll('[data-text]')];
  const boxen = texte.map((el) => ({ el, r: tb(el) }));
  boxen.forEach(({ el, r }) => {
    if (r.left < 40 || r.right > W - 40 || r.bottom > H - 12) out.push(`Text zu breit oder zu tief: "${el.textContent.trim()}"`);
  });
  // Texte dürfen sich nicht überlappen (ohne verschachtelte)
  boxen.forEach((a, i) => boxen.slice(i + 1).forEach((b) => {
    const beideHeadline = a.el.closest('.headline') && b.el.closest('.headline'); // Zeilen mit enger Zeilenhöhe dürfen sich berühren
    if (!beideHeadline && !a.el.contains(b.el) && !b.el.contains(a.el) && hit(a.r, b.r)) out.push(`"${a.el.textContent.trim()}" überlappt "${b.el.textContent.trim()}"`);
  }));
  const logo = document.querySelector('.logo').getBoundingClientRect();
  // Goldbogen unten rechts: Text muss links von seinem Innenkreis bleiben
  const bogen = document.querySelector('.bogen').getBoundingClientRect();
  const bx = bogen.left + bogen.width / 2, by = bogen.top + bogen.height / 2;
  boxen.forEach(({ el, r }) => {
    const nx = Math.max(r.left, Math.min(bx, r.right)), ny = Math.max(r.top, Math.min(by, r.bottom));
    if (Math.hypot(nx - bx, ny - by) < bogen.width / 2 + 16) out.push(`Text berührt den Goldbogen: "${el.textContent.trim()}"`);
  });
  boxen.forEach(({ el, r }) => { if (hit(r, logo)) out.push(`Logo berührt "${el.textContent.trim()}"`); });
  const fakten = document.querySelector('.fakten').getBoundingClientRect();
  const pille = document.querySelector('.pille').getBoundingClientRect();
  const luft = Math.round(pille.top - fakten.bottom);
  if (luft < 28) out.push(`Zu wenig Luft über dem Button (${luft}px)`);
  return { out, luft };
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
    const r = await page.evaluate(pruefen, [BREITE, HOEHE]);
    const ausgabe = path.join(dir, `${p.name}.png`);
    await page.screenshot({ path: ausgabe });
    await page.close();
    const b64 = fs.readFileSync(ausgabe).toString('base64');
    const prev = await browser.newPage({ viewport: { width: BREITE / 4, height: Math.round(HOEHE / 4) } });
    await prev.setContent(`<body style="margin:0"><img src="data:image/png;base64,${b64}" style="width:${BREITE / 4}px;height:${Math.round(HOEHE / 4)}px;display:block"></body>`);
    await prev.screenshot({ path: path.join(dir, `${p.name}_vorschau25.png`) });
    await prev.close();
    if (r.out.length) { fehler = true; console.error(`${p.name}: PROBLEME\n  - ${[...new Set(r.out)].join('\n  - ')}`); }
    else console.log(`${p.name}: OK (Luft über dem Button ${r.luft}px)`);
  }
  await browser.close();
  if (fehler) process.exitCode = 1;
})();
