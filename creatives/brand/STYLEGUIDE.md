# Starshine Emotions – Styleguide für Social-Creatives

> Zuerst `LEARNINGS.md` lesen: Dort steht alles, was der Kunde gelobt oder abgelehnt hat.

Gilt für alle Posts und Anzeigen. Technische Basis: `brand/style/base.mjs`. Jedes neue Skript importiert `page`, `render`, `THEMES`, `TYPE` und `LOGO` von dort. Referenz-Umsetzung: `organisch/render-r3.mjs`.

## Grundhaltung
Seriös und hochwertig, wie ein Reisemagazin: Das Foto erzählt, die Typografie ist ruhig, es gibt viel Luft. Jeder Post hat **ein** Thema und **einen** Titel.

## Hausstil je Reise (abgeleitet aus den erfolgreichen Bestandsposts)
Kräftige, gut lesbare Schriften – **keine dünnen Serifen**. Lokal in `brand/style/fonts/`.

| Reise | Titelschrift | Look |
|---|---|---|
| Spartacus | Montserrat ExtraBold/Black, Navy #14213d | Jahreszahl oder Akzentzeile im Regenbogen, weißes Textfeld, Preis in weißer Pille mit Regenbogenrand, Regenbogenlinie als Trenner |
| Schlager | Fredoka Bold, weiß mit dunkler Kontur (#1b1640) | Akzentwort in Pink #e8508f, Preis als Schallplatte, Foto über die ganze Fläche |
| Karl May | Alfa Slab One in Creme | dunkles Lederbraun-Band #2b1a12, Unterzeile in Roboto Bold, Logo groß oben rechts |
| Danzig Silvester | DM Serif Display, Creme und Champagner-Gold | Nachtblau #1b1427, goldene Pille mit Termin |

**Größen (1080 × 1350):**
- Titel: 80–130 px
- Unterzeilen: 36–54 px
- Nichts unter 30 px

**Wiederkehrende Bausteine** stehen in `organisch/render-r3.mjs`: Regenbogen-Pille, Schallplatte, Kontur-Titel.

**Layout:** pro Post unterschiedlich. Mal steht das Foto oben und der Text unten, mal umgekehrt, mal geht das Foto über die ganze Fläche und der Text liegt darauf.

## Pflicht in jedem Post
- **Reise sofort erkennbar:** Der Name der Reise (z. B. „Spartacus Gay Cruise 2027“, „Schlager-Seereise 2027“, „Karl-May-Spiele Bad Segeberg 2027“, „Silvester in Danzig“) steht gut sichtbar im Bild, als Titel, Label über dem Titel oder Unterzeile.
- Eine Idee und eine Handlung pro Post (kommentieren, speichern, markieren oder Nachricht).

## Nicht verwenden
- dünne, filigrane Schriften
- Emojis im Bild
- Mini-Schriften
- Bildnachweise im Bild (die gehören in den Post-Text)
- Text auf unruhigen Bildstellen ohne Kontur oder Farbfläche

## Logo
Das Starshine-Logo hat 104 px, ist rund und hat keinen Rahmen. Es sitzt in einer ruhigen Ecke im Abstand von 72 px zum Rand.

## Fotos
Bevorzugt die Fotos von den Landingpages auf starshine-emotions.com, abgelegt als `organisch/src/web-*.jpg`. Fotonachweise:
- Karl May: Robin Schart
- Schlager: Philipp Kumbier
- Danzig-Feuerwerk: Patryk Kosmider / stock.adobe.com

Die Nutzungsrechte für Social Media bitte vorher klären.
