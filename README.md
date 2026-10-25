# Website – Adelina Rrustolli · Webdesign

Statische, zweisprachige Website (DE/EN) aus reinem HTML, CSS und JavaScript.
Sie brauchen kein Build-Tool und kein CMS: Dateien bearbeiten und per FileZilla hochladen, fertig.

## Struktur

```
index.html            Startseite (mit Scroll-Storytelling)
leistungen.html       Leistungen, 3 Pakete, Betreuung, FAQ
referenzen.html       Referenzprojekte
ueber-mich.html       Über mich
kontakt.html          Kontaktformular
impressum.html        Impressum (Platzhalter)
datenschutz.html      Datenschutzerklärung (Platzhalter)
kontakt.php           Versendet das Kontaktformular per E-Mail
en/                   Englische Version (index, services, work, about, contact, legal-notice, privacy)
assets/css/style.css  Gesamtes Design (Farben ganz oben unter :root)
assets/js/main.js     Animationen, Menü, Formular-Meldungen
assets/img/           Logo, Favicon, Porträt-Platzhalter
assets/fonts/         Schriftdateien (optional)
robots.txt, sitemap.xml
```

## Platzhalter, die Sie ersetzen sollten

Am schnellsten geht es mit „Suchen & Ersetzen in Dateien“ (z. B. in VS Code oder Notepad++):

| Suchen | Ersetzen durch | Wo |
|---|---|---|
| `hallo@ihre-domain.de` | Ihre echte E-Mail | alle Seiten, `kontakt.php` |
| `website@ihre-domain.de` | Absenderadresse Ihrer Domain | `kontakt.php` |
| `+49 000 0000000` und `+490000000000` | Ihre Telefonnummer (Anzeige / Link) | alle Seiten |
| `ihre-domain.de` | Ihre Domain | `robots.txt`, `sitemap.xml` |
| `portrait-placeholder.svg` | Ihr Foto, z. B. `adelina.jpg` (Hochformat 4:5, ca. 1200×1500 px) | Start, Über mich (DE + EN) |
| Kundenstimmen „Platzhalter: …“ | Ihre 3 echten Referenzstimmen | `index.html`, `en/index.html` |
| Projekte „Projekt 01–04“ | Echte Projekte mit Screenshot und Link | `referenzen.html`, `en/work.html` |
| Gelb markierte Stellen | Echte Angaben | Impressum, Datenschutz |

**Preise:** Die Paketpreise (990 € / 1.990 € / 3.490 €, Betreuung ab 49 €) sind Vorschläge.
Bitte prüfen und auch klären, ob Sie Umsatzsteuer ausweisen oder die Kleinunternehmerregelung nutzen. Das gehört dann auch ins Impressum.

**Rechtstexte:** Impressum und Datenschutz bitte mit einem Generator (z. B. eRecht24 oder Dr. Schwenke) erstellen
und dort einfügen, passend zu Hosting-Anbieter, Kontaktformular und Statistik-Tool.

## Kontaktformular

`kontakt.php` braucht ein Hosting mit PHP. Bei fast allen klassischen Webhostern wie IONOS, Strato, all-inkl oder Hostinger ist das Standard.
Die Anfragen gehen an die Adresse in `$empfaenger`. Nach dem Senden sieht der Besucher eine Erfolgs- oder Fehlermeldung.
Wie gewünscht ist kein Spam-Schutz eingebaut. Falls später Spam ankommt, lässt sich ein unsichtbares Honeypot-Feld leicht ergänzen.

## Besucherstatistik (cookie-frei)

In jeder Seite steht im `<head>` ein Kommentar „Statistik: …“. Ersetzen Sie ihn durch das Snippet eines cookie-freien Tools,
z. B. **Plausible**, **Simple Analytics** oder **GoatCounter**. Dann ist kein Cookie-Banner nötig.

## Schriften (optional, für den vollen Look)

Das Design nutzt **Fraunces** (Überschriften) und **Manrope** (Text). Aus Datenschutzgründen werden sie lokal eingebunden, also nicht über Google-Server.
1. Auf https://gwfh.mranftl.com/fonts die Schriften „Fraunces“ (400, 400 italic, 600) und „Manrope“ (400, 600) als woff2 herunterladen.
2. Die Dateien so benennen und in `assets/fonts/` legen:
   `fraunces-latin-400-normal.woff2`, `fraunces-latin-400-italic.woff2`, `fraunces-latin-600-normal.woff2`,
   `manrope-latin-400-normal.woff2`, `manrope-latin-600-normal.woff2`
3. In `assets/css/style.css` ganz oben den `@font-face`-Block einkommentieren: die Zeichen `/*` und `*/` um den Block entfernen.

Ohne die Dateien greifen elegante System-Schriften, und die Seite funktioniert trotzdem einwandfrei.

## Hochladen mit FileZilla

1. Mit den FTP-Daten Ihres Hosters verbinden.
2. Alle Dateien und Ordner in den Web-Ordner hochladen (oft `htdocs`, `public_html` oder `/`).
   Den Ordner `.git` und die Datei `README.md` brauchen Sie dort nicht.
3. Nach dem Domain-Kauf: Website in der **Google Search Console** anmelden und `sitemap.xml` einreichen.
   Außerdem ein **Google-Unternehmensprofil** anlegen. Beides ist wichtig für die Sichtbarkeit.

## Texte ändern

Alle Texte stehen direkt in den HTML-Dateien. Wenn Sie etwas auf Deutsch ändern, denken Sie an die passende Seite in `en/`.
Kopfbereich und Fußzeile kommen auf jeder Seite vor. Änderungen dort (z. B. Menüpunkte) also auf allen Seiten machen.

## Animationen

- Scroll-Storytelling auf der Startseite: Abschnitt `.story` in `index.html`, Steuerung in `main.js`
- Elemente mit der Klasse `reveal` blenden beim Scrollen weich ein (`data-delay="1–3"` verzögert sie)
- Für Besucher, die in ihrem System „Bewegung reduzieren“ eingestellt haben, werden alle Animationen automatisch abgeschaltet.
