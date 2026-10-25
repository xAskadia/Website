/**
 * PORTFOLIO
 * ------------------------------------------------------------------
 * Alle hier aufgeführten Projekte sind FIKTIVE DEMO-PROJEKTE (isDemo: true).
 * Sie zeigen, wie Arbeiten präsentiert werden – es handelt sich nicht um
 * echte Kundinnen und Kunden.
 *
 * Eigene Projekte hinzufügen: Objekt kopieren, Texte ersetzen, isDemo auf
 * false setzen. Optional `images` mit Screenshots (desktop/tablet/mobile)
 * füllen – dann werden diese statt der generierten Mockups angezeigt.
 */

export type ProjectCategory =
  | 'unternehmenswebsite'
  | 'landingpage'
  | 'konzept'
  | 'grafikdesign'
  | 'corporate-design'

export const categoryLabels: Record<ProjectCategory, string> = {
  unternehmenswebsite: 'Unternehmenswebsites',
  landingpage: 'Landingpages',
  konzept: 'Webdesign-Konzepte',
  grafikdesign: 'Grafikdesign',
  'corporate-design': 'Corporate Design',
}

export interface MockTheme {
  bg: string
  fg: string
  accent: string
  soft: string
  font: 'serif' | 'grotesk' | 'rounded'
  layout: 'split' | 'centered' | 'editorial'
  headline: string
  subline: string
  cta: string
  nav: string[]
  motif: 'circle' | 'arch' | 'grid' | 'wave' | 'stack'
}

export interface Project {
  slug: string
  name: string
  isDemo: boolean
  categories: ProjectCategory[]
  industry: string
  summary: string
  services: string[]
  theme: MockTheme
  /** Optional: echte Screenshots – überschreiben die generierten Mockups */
  images?: { desktop?: string; tablet?: string; mobile?: string }
  hasBeforeAfter?: boolean
  case: {
    ausgangssituation: string
    zielsetzung: string
    konzeption: string
    design: string
    ergebnis: string
  }
}

export const projects: Project[] = [
  {
    slug: 'kornfeld-backstube',
    name: 'Kornfeld Backstube',
    isDemo: true,
    categories: ['unternehmenswebsite', 'corporate-design'],
    industry: 'Handwerk & Lebensmittel',
    summary: 'Eine warme, mehrseitige Website für eine fiktive Familienbäckerei mit Filialfinder und Vorbestellung.',
    services: ['Webdesign', 'Seitenstruktur', 'Texte', 'Bildkonzept'],
    theme: {
      bg: '#f6eddc',
      fg: '#3b2412',
      accent: '#c8742b',
      soft: '#ead7b7',
      font: 'serif',
      layout: 'split',
      headline: 'Ehrliches Brot. Jeden Morgen.',
      subline: 'Seit drei Generationen backen wir mit Zeit, Ruhe und regionalem Korn.',
      cta: 'Jetzt vorbestellen',
      nav: ['Sortiment', 'Filialen', 'Über uns'],
      motif: 'arch',
    },
    hasBeforeAfter: true,
    case: {
      ausgangssituation:
        'Die fiktive Bäckerei hatte nur einen veralteten Eintrag mit Öffnungszeiten. Viele Fragen – Filialen, Sortiment, Vorbestellungen – liefen ausschließlich über das Telefon.',
      zielsetzung:
        'Eine Website, die Wärme und Handwerk vermittelt, die häufigsten Fragen sofort beantwortet und Vorbestellungen einfacher macht.',
      konzeption:
        'Klare Hauptnavigation mit drei Bereichen, Filialfinder auf der Startseite, Vorbestellung als durchgehender Call-to-Action. Mobile-first, weil die meisten Besuche unterwegs passieren.',
      design:
        'Warme Erdtöne, eine charaktervolle Serifenschrift und rundbogige Bildausschnitte, die an Ofenöffnungen erinnern. Viel Weißraum für Ruhe.',
      ergebnis:
        'Demo-Ergebnis: ein vollständiges Gestaltungskonzept mit Startseite, Sortiment und Filialseite – als Beispiel, wie ein lokaler Handwerksbetrieb online auftreten kann.',
    },
  },
  {
    slug: 'praxis-lindenhof',
    name: 'Physiopraxis Lindenhof',
    isDemo: true,
    categories: ['unternehmenswebsite'],
    industry: 'Gesundheit',
    summary: 'Ruhige, vertrauensvolle Praxis-Website mit Leistungsübersicht, Team-Vorstellung und Terminanfrage.',
    services: ['Webdesign', 'UX-Konzept', 'Terminanfrage'],
    theme: {
      bg: '#eef3f0',
      fg: '#163a33',
      accent: '#2f8f7a',
      soft: '#cfe3dc',
      font: 'rounded',
      layout: 'centered',
      headline: 'Wieder gut in Bewegung.',
      subline: 'Physiotherapie mit Zeit für dich – persönlich, modern, in deiner Nähe.',
      cta: 'Termin anfragen',
      nav: ['Leistungen', 'Team', 'Kontakt'],
      motif: 'circle',
    },
    case: {
      ausgangssituation:
        'Fiktives Szenario: Eine neue Praxis braucht einen Auftritt, der Vertrauen schafft, bevor Patientinnen und Patienten die Räume je betreten haben.',
      zielsetzung:
        'Leistungen verständlich erklären, das Team nahbar zeigen und den Weg zur Terminanfrage so kurz wie möglich halten.',
      konzeption:
        'Leistungen als kompakte Karten mit Alltagssprache statt Fachbegriffen. Terminanfrage auf jeder Seite in maximal einem Klick erreichbar.',
      design:
        'Beruhigende Grüntöne, runde Formen und eine freundliche, gut lesbare Schrift. Hohe Kontraste für Barrierearmut.',
      ergebnis:
        'Demo-Ergebnis: ein Konzept mit klarer Nutzerführung, das zeigt, wie Gesundheitsanbieter Vertrauen digital aufbauen können.',
    },
  },
  {
    slug: 'nordlicht-retreat',
    name: 'Nordlicht Retreat',
    isDemo: true,
    categories: ['landingpage'],
    industry: 'Tourismus & Freizeit',
    summary: 'Kampagnen-Landingpage für ein fiktives Yoga-Wochenende – mit einem einzigen Ziel: Anmeldungen.',
    services: ['Landingpage', 'Conversion-Konzept', 'Texte'],
    theme: {
      bg: '#14213d',
      fg: '#f1f0ea',
      accent: '#f2a65a',
      soft: '#2b3a5c',
      font: 'grotesk',
      layout: 'centered',
      headline: 'Drei Tage. Ein Atemzug.',
      subline: 'Ein Wochenende an der Küste – für alle, die wieder bei sich ankommen möchten.',
      cta: 'Platz sichern',
      nav: ['Programm', 'Ort', 'Anmeldung'],
      motif: 'wave',
    },
    case: {
      ausgangssituation:
        'Fiktives Szenario: Ein Retreat wird über Social Media beworben, die Interessierten landen aber auf einer allgemeinen Startseite und finden die Anmeldung nicht.',
      zielsetzung:
        'Eine fokussierte Seite, die Stimmung transportiert, alle Fragen beantwortet und genau eine Handlung anbietet: die Anmeldung.',
      konzeption:
        'Aufbau nach dem Prinzip Aufmerksamkeit → Vorstellung → Vertrauen → Handlung. Keine Ablenkung durch zusätzliche Navigation.',
      design:
        'Dunkles Nachtblau mit warmem Akzent, große Typografie und ruhige Wellenformen.',
      ergebnis:
        'Demo-Ergebnis: eine Landingpage-Vorlage, die zeigt, wie Kampagnen durch Fokus deutlich klarer werden.',
    },
  },
  {
    slug: 'werkhaus-tischlerei',
    name: 'Werkhaus Tischlerei',
    isDemo: true,
    categories: ['konzept', 'unternehmenswebsite'],
    industry: 'Handwerk',
    summary: 'Relaunch-Konzept: aus einer überladenen Website von gestern wird ein klarer, moderner Auftritt.',
    services: ['Relaunch', 'Informationsarchitektur', 'Webdesign'],
    theme: {
      bg: '#efe9e1',
      fg: '#1e1b18',
      accent: '#8a5a3b',
      soft: '#d9cdbd',
      font: 'grotesk',
      layout: 'editorial',
      headline: 'Möbel, die bleiben.',
      subline: 'Maßanfertigungen aus Massivholz – geplant mit dir, gebaut in unserer Werkstatt.',
      cta: 'Projekt besprechen',
      nav: ['Arbeiten', 'Werkstatt', 'Kontakt'],
      motif: 'grid',
    },
    hasBeforeAfter: true,
    case: {
      ausgangssituation:
        'Fiktives Szenario: Die bisherige Website stammt aus einer anderen Zeit – kleine Schrift, viele Unterseiten, keine mobile Ansicht, Kontakt nur im Impressum.',
      zielsetzung:
        'Die Qualität der Arbeit sichtbar machen, die Struktur entrümpeln und Anfragen für Maßanfertigungen erleichtern.',
      konzeption:
        'Von 14 Menüpunkten auf drei. Referenzen rücken in den Mittelpunkt, ein kurzer Anfrageweg ersetzt das versteckte Kontaktformular.',
      design:
        'Editoriales Layout mit großen Bildflächen, Holztönen und einer sachlichen Groteskschrift.',
      ergebnis:
        'Demo-Ergebnis: ein Vorher-Nachher-Konzept, das zeigt, wie viel Wirkung durch Reduktion entsteht.',
    },
  },
  {
    slug: 'mohnblau-floristik',
    name: 'Mohnblau Floristik',
    isDemo: true,
    categories: ['corporate-design', 'grafikdesign'],
    industry: 'Einzelhandel',
    summary: 'Corporate-Design-Konzept für ein fiktives Blumenatelier: Logo-Idee, Farben, Typografie und Social-Media-Vorlagen.',
    services: ['Corporate Design', 'Farbkonzept', 'Social-Media-Grafiken'],
    theme: {
      bg: '#fbefe9',
      fg: '#2c1d3a',
      accent: '#d1495b',
      soft: '#f1cfc7',
      font: 'serif',
      layout: 'editorial',
      headline: 'Blumen mit Haltung.',
      subline: 'Saisonale Sträuße, Hochzeitsfloristik und Workshops im Atelier.',
      cta: 'Strauß anfragen',
      nav: ['Atelier', 'Anlässe', 'Workshops'],
      motif: 'circle',
    },
    case: {
      ausgangssituation:
        'Fiktives Szenario: Ein junges Atelier tritt auf Instagram, Flyern und Schaufenster jeweils anders auf – die Marke ist nicht wiedererkennbar.',
      zielsetzung:
        'Ein einheitliches visuelles System, das sich leicht im Alltag anwenden lässt.',
      konzeption:
        'Wenige, klare Regeln: zwei Schriften, vier Farben, ein Formelement. Dazu Vorlagen für die häufigsten Anlässe.',
      design:
        'Kräftiges Mohnrot trifft tiefes Violett. Eine elegante Serifenschrift für Headlines, kombiniert mit einer klaren Grotesk.',
      ergebnis:
        'Demo-Ergebnis: ein kompaktes Markenhandbuch mit Anwendungsbeispielen für Website, Social Media und Print.',
    },
  },
  {
    slug: 'velo-atelier',
    name: 'Velo Atelier',
    isDemo: true,
    categories: ['landingpage', 'konzept'],
    industry: 'Mobilität',
    summary: 'Landingpage-Konzept für ein fiktives Fahrrad-Service-Abo – mit klarer Preisstruktur und Buchungs-CTA.',
    services: ['Landingpage', 'Webdesign-Konzept'],
    theme: {
      bg: '#e9f0d8',
      fg: '#1a2a12',
      accent: '#3d6b2a',
      soft: '#cfdcb1',
      font: 'grotesk',
      layout: 'split',
      headline: 'Dein Rad. Immer startklar.',
      subline: 'Inspektion, Reparatur und Abholservice – ein Abo, keine Sorgen.',
      cta: 'Service buchen',
      nav: ['Abo', 'Werkstatt', 'FAQ'],
      motif: 'stack',
    },
    case: {
      ausgangssituation:
        'Fiktives Szenario: Ein neues Serviceangebot soll gezielt beworben werden, ohne die bestehende Website umzubauen.',
      zielsetzung: 'Das Angebot in Sekunden verständlich machen und direkt zur Buchung führen.',
      konzeption:
        'Nutzen zuerst, dann Ablauf in drei Schritten, dann häufige Fragen. Der Buchungsbutton begleitet die gesamte Seite.',
      design: 'Frisches Grün, kräftige Typografie und reduzierte Illustrationen.',
      ergebnis: 'Demo-Ergebnis: eine fokussierte Angebotsseite als Vorlage für Kampagnen.',
    },
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
