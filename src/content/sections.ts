/** Abschnitte der Onepage – Reihenfolge = Reihenfolge auf der Seite und im Menü. */
export const sections = [
  { id: 'start', label: 'Start', nav: false },
  { id: 'leistungen', label: 'Websites', nav: true },
  { id: 'ablauf', label: 'Ablauf', nav: true },
  { id: 'konfigurator', label: 'Konfigurator', nav: true },
  { id: 'arbeiten', label: 'Arbeiten', nav: true },
  { id: 'ueber-mich', label: 'Über mich', nav: true },
  { id: 'faq', label: 'FAQ', nav: true },
  { id: 'kontakt', label: 'Kontakt', nav: false },
] as const

export type SectionId = (typeof sections)[number]['id']
