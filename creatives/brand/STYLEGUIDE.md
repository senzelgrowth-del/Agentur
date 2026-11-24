# Starshine Emotions – Styleguide für Social-Creatives

Gilt für alle Posts und Anzeigen. Technische Basis: `brand/style/base.mjs`. Jedes neue Skript importiert `page`, `render`, `THEMES`, `TYPE` und `LOGO` von dort. Referenz-Umsetzung: `organisch/render-r3.mjs`.

## Grundhaltung
Seriös und hochwertig, wie ein Reisemagazin: Das Foto erzählt, die Typografie ist ruhig, es gibt viel Luft. Jeder Post hat **ein** Thema und **einen** Titel.

## Schriften (lokal eingebettet in `brand/style/fonts/`)
| Rolle | Schrift | Einsatz |
|---|---|---|
| Titel | Instrument Serif (normal + kursiv) | Danzig, Schlager, Spartacus. Ein Wort oder eine Zeile kursiv bzw. in der Akzentfarbe |
| Plakat-Titel | Big Shoulders Bold, Versalien | nur Karl May (Western-Plakat) |
| Label / Info | Instrument Sans Bold / Regular | Label in Versalien gesperrt, Infozeile normal |

Lizenz: Alle Schriften stehen unter der SIL Open Font License.

## Größen (px, Format 1080 × 1350)
- **Label:** 30
- **Info:** 36
- **Titel:** 96–150

Nichts unter 30 px. Rand: 72 px.

## Farbwelten
| Reise | Fläche | Akzent | Besonderheit |
|---|---|---|---|
| Spartacus | Navy #13203a / Papier #f6f1e8 | Sand-Gold #c9a66b | Regenbogen nur als dünne Linie, nie als Schrift-Verlauf |
| Karl May | Leder #2e1a10 / Sand #efe3cc | Rost #b5542a | Plakat-Schrift, einfarbige Blöcke |
| Schlager | Pflaume #1f1530 oder Meerblau #173a5e | Sonnengelb #e9b949 | warm, festlich |
| Danzig | Nacht #17121f oder Weiß | Champagner #d8b26e / Orange #c8631f | elegant, Jahreswechsel |

## Layout-Vorlagen (abwechselnd einsetzen)
1. **Gerahmt:** Das Foto hat Rand auf einer Farbfläche, der Text steht linksbündig darunter.
2. **Hell:** Freigestelltes Foto auf Weiß, der Text zentriert darunter.
3. **Block:** Das Foto füllt die ganze Fläche, unten links sitzt ein einfarbiger Titelblock.
4. **Himmel:** Das Foto füllt die ganze Fläche, der Titel steht im ruhigen Himmel, unten eine Infoleiste.
5. **Geteilt:** Oben das Foto, unten eine Farbfläche mit dem Titel.
6. **Papier:** Oben ein großer Titel auf hellem Grund, unten das Foto ohne Rand.

## Nicht verwenden
- Schatten und Farbverläufe auf Fotos
- Pillen-Buttons, Emojis im Bild, Sprechblasen
- Schwungschriften wie Pacifico oder Rye
- Regenbogen-Verlauf in Schrift
- mehr als eine Akzentfarbe pro Post
- Text auf unruhigen Bildstellen
- Mini-Schriften und Bildnachweise im Bild (die Nachweise gehören in den Post-Text)

## Logo
Das Starshine-Logo hat 104 px, ist rund und hat keinen Rahmen. Es sitzt in einer ruhigen Ecke im Abstand von 72 px zum Rand.

## Fotos
Bevorzugt die Fotos von den Landingpages auf starshine-emotions.com, abgelegt als `organisch/src/web-*.jpg`. Fotonachweise:
- Karl May: Robin Schart
- Schlager: Philipp Kumbier
- Danzig-Feuerwerk: Patryk Kosmider / stock.adobe.com

Die Nutzungsrechte für Social Media bitte vorher klären.
