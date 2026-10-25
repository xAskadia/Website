/**
 * ZENTRALE GESCHÄFTSDATEN
 * ------------------------------------------------------------------
 * Alle Angaben in [ECKIGEN KLAMMERN] sind Platzhalter und müssen vor
 * der Veröffentlichung durch echte Daten ersetzt werden.
 * Änderungen hier wirken sich automatisch auf Footer, Kontakt,
 * Impressum und Datenschutzerklärung aus.
 */
export const site = {
  name: 'Adelina Rrustolli',
  shortName: 'Adelina',
  monogram: 'ar',
  role: 'Webdesign & digitale Sichtbarkeit',
  claim: 'Deine Vision. Mein Design. Gemeinsam digital sichtbar.',
  url: import.meta.env.VITE_SITE_URL || 'https://www.example.de',

  contact: {
    email: 'hallo@example.de', // [PLATZHALTER] echte E-Mail-Adresse eintragen
    phone: '[+49 000 0000000]',
    phoneHref: '', // z. B. 'tel:+4917612345678' – leer = Telefon wird nicht verlinkt
    region: 'Deutschland · remote & vor Ort', // [PLATZHALTER] Region anpassen
    responseTime: 'Ich melde mich in der Regel innerhalb von zwei Werktagen.',
  },

  legal: {
    owner: 'Adelina Rrustolli',
    street: '[Straße und Hausnummer]',
    city: '[PLZ Ort]',
    country: 'Deutschland',
    vatId: '[USt-IdNr. gemäß § 27a UStG, falls vorhanden]',
    hosting: '[Name und Anschrift des Hosting-Anbieters]',
  },

  social: [
    { label: 'LinkedIn', href: '' }, // [PLATZHALTER] Profil-URL eintragen – leer = ausgeblendet
    { label: 'Instagram', href: '' },
    { label: 'Behance', href: '' },
  ],

  /**
   * PORTRÄT
   * Lege dein Foto unter /public/images/ ab (z. B. portrait.webp, ca. 1200×1500 px)
   * und trage den Pfad hier ein. Solange `src` leer ist, wird eine gestaltete
   * Platzhalter-Grafik angezeigt.
   */
  portrait: {
    src: '',
    alt: 'Porträt von Adelina Rrustolli',
  },
} as const

export const contactEndpoint: string = import.meta.env.VITE_CONTACT_ENDPOINT || ''
