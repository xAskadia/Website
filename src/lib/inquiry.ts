/**
 * Übergabe von Ergebnissen (Konfigurator, Website-Finder) an das
 * Kontaktformular. Gespeichert nur im sessionStorage des Browsers –
 * nichts verlässt das Gerät, bis das Formular abgeschickt wird.
 */
export interface InquiryDraft {
  source: 'Website-Konfigurator' | 'Website-Finder' | 'Landingpage-Vorschau' | 'Brand-Style-Explorer'
  service?: string
  summary: string
}

const KEY = 'ar-inquiry-draft'

export function saveInquiryDraft(draft: InquiryDraft) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft))
  } catch {
    /* Speicher nicht verfügbar – Übergabe läuft nur über das Ereignis */
  }
  window.dispatchEvent(new CustomEvent('inquiry:draft', { detail: draft }))
}

export function readInquiryDraft(): InquiryDraft | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as InquiryDraft) : null
  } catch {
    return null
  }
}

export function clearInquiryDraft() {
  try {
    sessionStorage.removeItem(KEY)
  } catch {
    /* ignorieren */
  }
}
