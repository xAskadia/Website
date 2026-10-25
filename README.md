# Adelina Rrustolli – Webdesign & digitale Sichtbarkeit

Persönliche Agentur-Website: React 19, Vite, Tailwind CSS 4 und Framer Motion. Jede Seite wird beim Build statisch vorgerendert (gut für SEO und Ladezeit) und läuft danach als interaktive App weiter.

## Schnellstart

```bash
npm install
npm run dev        # Entwicklungsserver auf http://localhost:5173
npm run build      # Produktions-Build inkl. Prerendering → /dist
npm run preview    # Build lokal ansehen
```

`/dist` ist eine rein statische Website und läuft auf jedem Hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages, klassischer Webspace mit Apache/nginx). Jede Route liegt als eigene `index.html` vor, eine `404.html`, `sitemap.xml` und `robots.txt` werden mit erzeugt.

`npm run build:preview` baut eine Variante mit Hash-Routing (`/#/kontakt`) und relativen Pfaden in `/dist-preview`. Sie funktioniert aus jedem Unterordner, ohne Server-Konfiguration.

## Inhalte austauschen

| Was | Wo |
| --- | --- |
| Name, E-Mail, Telefon, Region, Social Links, Impressumsdaten | `src/content/site.ts` |
| **Porträt** | Bild nach `public/images/` legen, Pfad in `site.ts` → `portrait.src` eintragen |
| Leistungen (Titel, Teaser, Menü) | `src/content/services.ts` |
| Portfolio & Case Studies | `src/content/projects.ts`; eigene Screenshots über `images: { desktop, tablet, mobile }` |
| FAQ | `src/content/faq.ts` |
| Seitentitel & Meta-Beschreibungen | `src/content/seo.ts` |
| Beispielpreise im Konfigurator | `src/content/pricing.ts`; `showExamplePrices: false` blendet alle Preise aus |
| Logik des Website-Finders | `src/lib/finder.ts` (Punkte pro Antwort, nachvollziehbar kommentiert) |
| Farben & Schriften (Corporate Design: Moos, Leinen, Messing, Salbei · Bodoni Moda, Jost, Mrs Saint Delafield) | `src/styles/index.css` → `@theme` |

Alle Platzhalter stehen in `[eckigen Klammern]`. Alle Portfolio-Projekte sind als **fiktive Demo-Projekte** gekennzeichnet (`isDemo: true`).

## Kontaktformular anschließen

Das Formular prüft alle Eingaben, verschickt aber **nichts**, solange kein Endpunkt eingetragen ist. Stattdessen bietet es an, die Anfrage als vorausgefüllte E-Mail zu senden.

1. `.env.example` nach `.env.local` kopieren.
2. `VITE_CONTACT_ENDPOINT` setzen, z. B. auf einen Formspree-Endpunkt, eine Netlify/Vercel-Function oder ein eigenes PHP-Skript.
3. Der Endpunkt erhält einen `POST` mit JSON (`name`, `company`, `email`, `service`, `details`, `budget`, `timeframe`, `privacy`, `_subject`) und muss mit Status 2xx antworten. Erst dann zeigt die Website die Erfolgsmeldung.
4. Den Dienst in der Datenschutzerklärung ergänzen.

`VITE_SITE_URL` setzt die Domain für Canonical-Links und die Sitemap.

## Struktur

```
src/
  content/       Texte & Daten (zum Bearbeiten gedacht)
  components/
    layout/      Header mit Megamenü, mobiles Menü, Footer
    home/        Hero-Bühne, Scroll-Erzählung „Von der Idee zur Website“
    mockups/     Generierte Website-Mockups, Geräterahmen, Vorher-Website
    tools/       Konfigurator, Landingpage-Vorschau, Brand-Explorer, Anfragen-Rechner
    ui/          Buttons, Akkordeon, Vorher-Nachher-Slider, Seitenköpfe …
  pages/         Eine Datei pro Seite (per Code-Splitting geladen)
  lib/           Hilfsfunktionen (Finder-Logik, Anfrage-Übergabe, Meta-Tags)
scripts/prerender.mjs   Statisches Prerendering aller Routen
```

## Barrierearmut & Datenschutz

- Tastaturbedienung für Menüs, Slider, Akkordeons und alle Tools. Ein Skip-Link führt zum Inhalt, Fokus ist sichtbar.
- Mit `prefers-reduced-motion` werden Bewegungen reduziert, Seitenübergänge und Intro entfallen.
- Keine Cookies, kein Tracking, keine externen Schriften, alles lokal eingebunden. Der Session Storage dient nur zur Übergabe von Tool-Ergebnissen an das Formular.
- Impressum und Datenschutzerklärung sind Vorlagen und müssen rechtlich geprüft werden.
