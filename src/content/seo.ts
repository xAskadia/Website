import { projects } from './projects'

export interface PageMeta {
  title: string
  description: string
}

const suffix = ' | Adelina Rrustolli – Webdesign'

/**
 * Seitentitel & Meta-Beschreibungen. Werden im Browser gesetzt und beim
 * Build (Prerendering) direkt in die HTML-Dateien geschrieben.
 */
export const pageMeta: Record<string, PageMeta> = {
  '/': {
    title: 'Adelina Rrustolli – Webdesign & digitale Sichtbarkeit für Unternehmen',
    description:
      'Individuelle Websites, Landingpages und Corporate Design für Unternehmen, die online überzeugen wollen. Design, Strategie und Technik aus einer Hand.',
  },
  '/leistungen': {
    title: 'Leistungen' + suffix,
    description:
      'Webdesign, Landingpages, Website-Relaunch, Corporate Design, Online-Marketing und Projektbegleitung – alle Leistungen im Überblick.',
  },
  '/leistungen/webdesign': {
    title: 'Webdesign & Website-Erstellung' + suffix,
    description:
      'Professionelle Websites von der Konzeption bis zum Livegang. Stell dir deine Website im Konfigurator selbst zusammen.',
  },
  '/leistungen/landingpages': {
    title: 'Landingpages' + suffix,
    description:
      'Landingpages für Kampagnen, Angebote und gezielte Anfragen. Erlebe in der Vorschau, wie Layout und Call-to-Action wirken.',
  },
  '/leistungen/relaunch': {
    title: 'Website-Relaunch & Optimierung' + suffix,
    description:
      'Veraltete Website? Ich mache sie modern, mobil, schnell und verständlich. Vergleiche Vorher und Nachher direkt im Slider.',
  },
  '/leistungen/corporate-design': {
    title: 'Grafikdesign & Corporate Design' + suffix,
    description:
      'Farb- und Typografiekonzepte, Markenauftritte und Social-Media-Grafiken. Probiere Designrichtungen im Brand-Style-Explorer aus.',
  },
  '/leistungen/online-marketing': {
    title: 'Online-Marketing & digitale Sichtbarkeit' + suffix,
    description:
      'Suchmaschinenfreundliche Struktur, klare Botschaften und Conversion-Optimierung. Mit interaktivem Besucher-zu-Anfragen-Rechner.',
  },
  '/leistungen/projektbegleitung': {
    title: 'Unternehmenskommunikation & Projektbegleitung' + suffix,
    description:
      'Strukturierte Planung, klare Kommunikation und termingerechte Steuerung deines Website-Projekts.',
  },
  '/portfolio': {
    title: 'Portfolio & Arbeiten' + suffix,
    description: 'Websites, Landingpages und Designprojekte – mit Desktop-, Tablet- und Mobilansicht.',
  },
  '/ueber-mich': {
    title: 'Über mich' + suffix,
    description:
      'Ich bin Adelina Rrustolli und verbinde Webdesign, Grafikdesign, Kommunikation und Online-Marketing mit einer strukturierten Arbeitsweise.',
  },
  '/arbeitsweise': {
    title: 'Meine Arbeitsweise' + suffix,
    description: 'In sechs klaren Phasen von der ersten Idee bis zur fertigen Website – transparent und nachvollziehbar.',
  },
  '/wissen': {
    title: 'Wissen & FAQ' + suffix,
    description: 'Antworten auf häufige Fragen rund um Websites, Kosten, Ablauf, Inhalte, SEO und Pflege.',
  },
  '/website-finder': {
    title: 'Website-Finder: Welche Website passt zu dir?' + suffix,
    description: 'Beantworte sechs kurze Fragen und erhalte eine Empfehlung, welche Website-Lösung zu deinem Unternehmen passt.',
  },
  '/kontakt': {
    title: 'Kontakt & Projektanfrage' + suffix,
    description: 'Erzähl mir von deinem Projekt. Unverbindlich anfragen – ich melde mich persönlich bei dir.',
  },
  '/impressum': { title: 'Impressum' + suffix, description: 'Impressum und Anbieterkennzeichnung.' },
  '/datenschutz': { title: 'Datenschutzerklärung' + suffix, description: 'Informationen zum Datenschutz auf dieser Website.' },
}

for (const p of projects) {
  pageMeta[`/portfolio/${p.slug}`] = {
    title: `${p.name}${p.isDemo ? ' (Demo-Projekt)' : ''}` + suffix,
    description: p.summary,
  }
}

export const notFoundMeta: PageMeta = {
  title: 'Seite nicht gefunden' + suffix,
  description: 'Diese Seite existiert leider nicht.',
}

export const getMeta = (path: string): PageMeta => {
  const clean = path !== '/' ? path.replace(/\/+$/, '') : path
  return pageMeta[clean] ?? notFoundMeta
}
