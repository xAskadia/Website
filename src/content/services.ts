export type ServiceSlug =
  | 'webdesign'
  | 'landingpages'
  | 'relaunch'
  | 'corporate-design'
  | 'online-marketing'
  | 'projektbegleitung'

export interface Service {
  slug: ServiceSlug
  path: string
  title: string
  navTitle: string
  teaser: string
  tool: string
  number: string
  featured?: boolean
}

export const services: Service[] = [
  {
    slug: 'webdesign',
    path: '/leistungen/webdesign',
    title: 'Webdesign & Website-Erstellung',
    navTitle: 'Webdesign & Website-Erstellung',
    teaser: 'Von der ersten Idee bis zum Livegang: individuelle Websites, die dein Unternehmen klar zeigen und Anfragen leicht machen.',
    tool: 'Website-Konfigurator',
    number: '01',
    featured: true,
  },
  {
    slug: 'landingpages',
    path: '/leistungen/landingpages',
    title: 'Landingpages',
    navTitle: 'Landingpages',
    teaser: 'Eine Seite, ein Ziel. Für Kampagnen, einzelne Angebote und gezielte Kundenanfragen.',
    tool: 'Layout-Vorschau',
    number: '02',
  },
  {
    slug: 'relaunch',
    path: '/leistungen/relaunch',
    title: 'Website-Relaunch & Optimierung',
    navTitle: 'Relaunch & Optimierung',
    teaser: 'Deine Website ist in die Jahre gekommen? Ich mache aus ihr wieder ein Aushängeschild.',
    tool: 'Vorher-Nachher-Slider',
    number: '03',
  },
  {
    slug: 'corporate-design',
    path: '/leistungen/corporate-design',
    title: 'Grafikdesign & Corporate Design',
    navTitle: 'Grafik- & Corporate Design',
    teaser: 'Farben, Schriften, Formen: ein Markenauftritt, der überall gleich stark wirkt – online wie gedruckt.',
    tool: 'Brand-Style-Explorer',
    number: '04',
  },
  {
    slug: 'online-marketing',
    path: '/leistungen/online-marketing',
    title: 'Online-Marketing & digitale Sichtbarkeit',
    navTitle: 'Online-Marketing & Sichtbarkeit',
    teaser: 'Gefunden werden, verstanden werden, angefragt werden: Websites mit Strategie dahinter.',
    tool: 'Besucher-zu-Anfragen-Rechner',
    number: '05',
  },
  {
    slug: 'projektbegleitung',
    path: '/leistungen/projektbegleitung',
    title: 'Unternehmenskommunikation & digitale Projektbegleitung',
    navTitle: 'Kommunikation & Projektbegleitung',
    teaser: 'Klare Planung, klare Absprachen, klare Ergebnisse – Kreativität mit Struktur.',
    tool: 'Klickbarer Projektablauf',
    number: '06',
  },
]

export const serviceBySlug = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!
