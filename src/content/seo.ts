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
    title: 'Adelina Rrustolli – Websites für Unternehmen | Webdesign',
    description:
      'Individuelle Websites für Unternehmen: Onepager, Unternehmenswebsites, Landingpages und Relaunches. Persönlich, klar strukturiert und für jedes Gerät optimiert.',
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
