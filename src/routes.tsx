import { lazyPage } from './lib/lazyPage'

export const pages = {
  home: lazyPage(() => import('./pages/Home')),
  caseStudy: lazyPage(() => import('./pages/CaseStudy')),
  imprint: lazyPage(() => import('./pages/Impressum')),
  privacy: lazyPage(() => import('./pages/Datenschutz')),
  notFound: lazyPage(() => import('./pages/NotFound')),
}

export const routeTable: { path: string; page: keyof typeof pages }[] = [
  { path: '/', page: 'home' },
  { path: '/portfolio/:slug', page: 'caseStudy' },
  { path: '/impressum', page: 'imprint' },
  { path: '/datenschutz', page: 'privacy' },
  { path: '*', page: 'notFound' },
]

/** Frühere Unterseiten führen zum passenden Abschnitt der Onepage. */
export const redirects: Record<string, string> = {
  '/leistungen': 'leistungen',
  '/leistungen/webdesign': 'leistungen',
  '/leistungen/landingpages': 'leistungen',
  '/leistungen/relaunch': 'leistungen',
  '/portfolio': 'arbeiten',
  '/ueber-mich': 'ueber-mich',
  '/arbeitsweise': 'ablauf',
  '/wissen': 'faq',
  '/website-finder': 'konfigurator',
  '/kontakt': 'kontakt',
}
