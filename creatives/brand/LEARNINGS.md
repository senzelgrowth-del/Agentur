# Starshine Emotions – Gelerntes aus dem Kunden-Feedback

Verbindlich für alle künftigen Creatives und Posts. Ergänzt `STYLEGUIDE.md`. Stand: 24.11.2026.

## 1. Arbeitsablauf
1. **Landingpage zuerst lesen** (starshine-emotions.com, freigeschaltet in der Umgebung „Agentur“) und jede Aussage im Bild und im Text dagegen prüfen. Nichts erfinden: keine Uhrzeiten, keine Knappheit („Plätze begrenzt“), keine unbestätigten Leistungen (z. B. „Bühnenplätze“ bei Karl May).
2. **Erst das Konzept, dann die Gestaltung:** Pro Post festlegen, welche Idee er hat, welche Handlung er auslöst und warum er auf Instagram und Facebook funktioniert. Nicht einfach ein Banner mit Text belegen.
3. **Vor der Ausgabe jedes Bild ansehen:** keine Überschneidungen, keine abgeschnittenen Wörter, keine verdeckten Hauptmotive (der Bus darf z. B. Winnetou nicht verdecken).
4. **Ausgabe direkt im Chat als PNG**, nicht über Canva. Erst nach Freigabe ins **Starshine Kampagnen-Board** (claude.ai Artifact) unter „Creatives“ eintragen, mit Text und Download-Button.
5. Alles nach `creatives/` committen und pushen. Die Post-Texte stehen in `organische-posts.md`.

## 2. Was gut ankommt
- **Kräftige, gut lesbare Schriften** wie in den erfolgreichen Bestandsposts (siehe STYLEGUIDE): Montserrat ExtraBold, Fredoka mit Kontur, Alfa Slab One, DM Serif Display.
- **Reisename sofort sichtbar** in jedem Bild, als Titel, Label oder Unterzeile.
- **Das Foto bekommt viel Platz.** Wenig Text, nichts unter 30 px.
- **Emotion und klare Aussage:** z. B. „Endlich frei. Endlich du.“, „Tagsüber Sonne. Abends Gänsehaut.“, „GEMEINSAM in den Wilden Westen!“.
- **Jeder Post mit eigenem Format,** z. B. Packliste, Save the Date, Route als Fahrplan, Hafen-Steckbrief, Polaroid-Rückblick, „7. Mal“-Fakt, Ablauf in drei Akten, Postkarte, Tagesplan, Termin-Karten.
- **Klassischer Prospekt-Stil auf Weiß** (Karl May, Favorit des Kunden): weißer Hintergrund, die Starshine-Bus-Grafik als Overlay, verspielte Farben (Rost #c8532a, Senf #f2b632, Türkis #2a9d8f, Himmelblau #7cc4e8), bewusst leicht unperfekt: unregelmäßig ausgeschnittenes Foto auf einem farbigen Fleck, gewellte Linie, leicht schiefe Elemente, Preis-Stern mit Zacken, Titel mit Farbversatz. Referenz: `organisch/render-r6.mjs` (Posts 3 und 4).
- **Post-Texte mittellang:** erste Zeile als Aufhänger, dann ein Satz Gefühl, dann die Fakten mit Emojis, am Ende eine klare Aufforderung zur Nachricht. **Ohne Hashtags.** Spartacus wird geduzt, alle anderen Reisen gesiezt.

## 3. Was der Kunde abgelehnt hat
- dünne, filigrane oder kursive Schriften (Instrument Serif u. ä.), Schwungschriften für Karl May
- zu billig oder KI-artig: zu viele Elemente, Pillen-Buttons überall, Emojis im Bild, Sprechblasen
- überladene Bilder, Mini-Schriften, schwere Schatten, Farbverläufe über Fotos
- immer derselbe Aufbau bei allen Posts
- **alte Posts nahezu 1:1 kopieren.** Die alten Posts dienen nur als Inspiration.
- **Oder-Fragen bei Karl May** (z. B. „Brice oder Klaws?“, „Tag oder Nacht?“)
- **Kommentar-Aufrufe im Bild** („kommentiere 1, 2 oder 3“). Wenn überhaupt, gehören sie in den Text.
- unklare Botschaften, bei denen man nicht sofort sieht, worum es geht

## 4. Bilder
- Bevorzugt die Fotos von den Landingpages (`organisch/src/web-*.jpg`).
- Ergänzend lizenzfreie Fotos von **Pexels** (`organisch/src/px-*.jpg`). Freigeschaltet ist nur images.pexels.com; die Suche läuft per Websuche, der Download über `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`.
- Fotonachweise in den Post-Text, nicht ins Bild:
  - Karl May: Robin Schart
  - Schlager: Philipp Kumbier
  - Danzig-Feuerwerk: Patryk Kosmider/stock.adobe.com
  - Costa Deliziosa: Costa Crociere
- Den Karl-May-Flyer mit „2026 / Im Tal des Todes“ nicht verwenden.

## 5. Offene Punkte auf den Landingpages (beim Kunden melden)
- **Spartacus:**
  - Der Einleitungstext nennt Málaga, die Tabelle Alicante und Marbella.
  - Die Tabelle ist mit „2026“ überschrieben.
  - Die Frühbucherfrist ist abgelaufen, aktueller Preis ab 1.349 €.
- **Schlager:** In der Kopfzeile steht „02.09.–09.09.2027“, der Rest der Seite nennt Oktober.
- **Karl May:** Bühnenplätze sind noch nicht bestätigt.
