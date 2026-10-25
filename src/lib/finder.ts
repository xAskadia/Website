/**
 * Logik des Website-Finders. Jede Antwort vergibt Punkte an mögliche
 * Lösungen; die Lösung mit den meisten Punkten wird empfohlen.
 * Gewichtungen können hier nachvollziehbar angepasst werden.
 */
export type Solution = 'onepager' | 'unternehmen' | 'landing' | 'relaunch'

export interface Option {
  id: string
  label: string
  points?: Partial<Record<Solution, number>>
  reason?: string
}

export interface Question {
  id: string
  title: string
  hint?: string
  multi?: boolean
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 'branche',
    title: 'In welcher Branche bist du tätig?',
    options: [
      { id: 'handwerk', label: 'Handwerk' },
      { id: 'gesundheit', label: 'Gesundheit & Pflege', reason: 'Im Gesundheitsbereich zählen Vertrauen und einfache Terminwege besonders.' },
      { id: 'gastro', label: 'Gastronomie & Hotellerie', reason: 'In der Gastronomie entscheiden Atmosphäre und schnelle Reservierung.' },
      { id: 'beratung', label: 'Beratung & Dienstleistung', reason: 'Bei Beratungsleistungen ist eine klare Darstellung deiner Expertise entscheidend.' },
      { id: 'handel', label: 'Einzelhandel' },
      { id: 'kreativ', label: 'Kreativbranche', reason: 'In der Kreativbranche ist dein Auftritt selbst schon Teil deiner Arbeitsprobe.' },
      { id: 'andere', label: 'Andere Branche' },
    ],
  },
  {
    id: 'bestand',
    title: 'Besitzt du bereits eine Website?',
    options: [
      { id: 'nein', label: 'Nein, noch gar nicht', points: { onepager: 2, unternehmen: 2 }, reason: 'Du startest ohne bestehende Website – wir können frei und sauber von Grund auf planen.' },
      { id: 'social', label: 'Nur Social-Media-Profile', points: { onepager: 3, unternehmen: 1 }, reason: 'Bisher bist du nur auf Social Media präsent – eine eigene Website gibt dir eine Plattform, die dir gehört.' },
      { id: 'alt', label: 'Ja, aber sie ist veraltet', points: { relaunch: 6 }, reason: 'Deine bestehende Website ist in die Jahre gekommen – ein Relaunch nutzt, was schon da ist, und macht es zeitgemäß.' },
      { id: 'gut', label: 'Ja, und sie ist eigentlich in Ordnung', points: { landing: 3, relaunch: 1 }, reason: 'Deine Website ist solide – oft lohnt es sich dann, gezielt zu ergänzen statt neu zu bauen.' },
    ],
  },
  {
    id: 'ziel',
    title: 'Was möchtest du hauptsächlich erreichen?',
    options: [
      { id: 'sichtbar', label: 'Online gefunden werden', points: { unternehmen: 2, onepager: 1, relaunch: 1 }, reason: 'Du willst gefunden werden – dafür brauchst du eine suchmaschinenfreundliche Struktur mit klaren Inhalten.' },
      { id: 'anfragen', label: 'Mehr Anfragen gewinnen', points: { landing: 2, unternehmen: 1, relaunch: 1 }, reason: 'Dein Fokus liegt auf Anfragen – also braucht es klare Nutzerführung und sichtbare Kontaktwege.' },
      { id: 'kampagne', label: 'Ein bestimmtes Angebot bewerben', points: { landing: 5 }, reason: 'Du willst ein konkretes Angebot bewerben – dafür ist eine fokussierte Seite mit einem Ziel ideal.' },
      { id: 'image', label: 'Professioneller wirken', points: { unternehmen: 2, relaunch: 2, onepager: 1 }, reason: 'Du möchtest professioneller wirken – Design und Markenauftritt stehen deshalb im Mittelpunkt.' },
      { id: 'erklaeren', label: 'Meine Leistungen ausführlich erklären', points: { unternehmen: 4 }, reason: 'Du hast viel zu erklären – eigene Unterseiten geben jeder Leistung den Raum, den sie braucht.' },
    ],
  },
  {
    id: 'funktionen',
    title: 'Welche Funktionen benötigst du?',
    hint: 'Mehrfachauswahl möglich',
    multi: true,
    options: [
      { id: 'kontakt', label: 'Kontaktformular' },
      { id: 'buchung', label: 'Online-Buchung / Termine', points: { unternehmen: 1 } },
      { id: 'sprachen', label: 'Mehrere Sprachen', points: { unternehmen: 2 } },
      { id: 'news', label: 'News / Blog', points: { unternehmen: 2 } },
      { id: 'galerie', label: 'Galerie / Referenzen', points: { unternehmen: 1, onepager: 1 } },
      { id: 'keine', label: 'Weiß ich noch nicht', points: { onepager: 1 } },
    ],
  },
  {
    id: 'umfang',
    title: 'Wie umfangreich soll dein Internetauftritt werden?',
    options: [
      { id: 'kompakt', label: 'Kompakt – das Wichtigste auf einen Blick', points: { onepager: 4, landing: 2 }, reason: 'Du willst es kompakt – alles Wichtige auf einen Blick, ohne lange Wege.' },
      { id: 'mittel', label: 'Mittel – einige eigene Unterseiten', points: { unternehmen: 3, relaunch: 1 }, reason: 'Ein paar eigene Unterseiten schaffen Ordnung und Raum für deine Themen.' },
      { id: 'gross', label: 'Umfangreich – viele Inhalte und Bereiche', points: { unternehmen: 4, relaunch: 1 }, reason: 'Viele Inhalte brauchen eine durchdachte Struktur und Navigation.' },
      { id: 'unsicher', label: 'Weiß ich noch nicht' },
    ],
  },
  {
    id: 'start',
    title: 'Wie schnell möchtest du starten?',
    options: [
      { id: 'sofort', label: 'So schnell wie möglich', points: { onepager: 2, landing: 2 }, reason: 'Du willst schnell starten – eine schlanke Lösung ist zügig umsetzbar und lässt sich später erweitern.' },
      { id: 'monate', label: 'In den nächsten Monaten', points: { unternehmen: 1, relaunch: 1 } },
      { id: 'flexibel', label: 'Zeitlich flexibel' },
    ],
  },
]

export const solutions: Record<Solution, { title: string; tagline: string; text: string; path: string; service: string }> = {
  onepager: {
    title: 'Ein Onepager',
    tagline: 'Kompakt, klar und schnell online.',
    text: 'Eine einzige, gut strukturierte Seite, die dein Unternehmen, deine Leistungen und den Weg zu dir übersichtlich zeigt. Ideal für einen professionellen Start – und später jederzeit erweiterbar.',
    path: '/leistungen/webdesign',
    service: 'Webdesign & Website-Erstellung',
  },
  unternehmen: {
    title: 'Eine Unternehmenswebsite',
    tagline: 'Dein vollständiger Auftritt mit eigenen Unterseiten.',
    text: 'Eine mehrseitige Website, die jeder Leistung, deinem Team und deinen Referenzen Raum gibt. Die Basis für langfristige Sichtbarkeit und einen starken Markenauftritt.',
    path: '/leistungen/webdesign',
    service: 'Webdesign & Website-Erstellung',
  },
  landing: {
    title: 'Eine Landingpage',
    tagline: 'Ein Angebot, ein Ziel, maximaler Fokus.',
    text: 'Eine fokussierte Seite, die genau ein Angebot vorstellt und zu einer Handlung führt – perfekt für Kampagnen, neue Angebote oder gezielte Anfragen.',
    path: '/leistungen/landingpages',
    service: 'Landingpages',
  },
  relaunch: {
    title: 'Ein Website-Relaunch',
    tagline: 'Aus deiner bestehenden Website wird wieder ein Aushängeschild.',
    text: 'Wir analysieren, was funktioniert und was bremst, und machen daraus einen modernen, schnellen und mobilen Auftritt – ohne bewährte Inhalte zu verlieren.',
    path: '/leistungen/relaunch',
    service: 'Website-Relaunch & Optimierung',
  },
}

export type Answers = Record<string, string[]>

export function evaluate(answers: Answers) {
  const score: Record<Solution, number> = { onepager: 0, unternehmen: 0, landing: 0, relaunch: 0 }
  const reasons: string[] = []
  for (const q of questions) {
    for (const id of answers[q.id] ?? []) {
      const opt = q.options.find((o) => o.id === id)
      if (!opt) continue
      for (const [k, v] of Object.entries(opt.points ?? {})) score[k as Solution] += v
      if (opt.reason) reasons.push(opt.reason)
    }
  }
  const order: Solution[] = ['relaunch', 'landing', 'unternehmen', 'onepager'] // Tie-Break
  const ranked = [...order].sort((a, b) => score[b] - score[a])
  const total = Object.values(score).reduce((a, b) => a + b, 0) || 1
  const features = (answers.funktionen ?? []).filter((f) => f !== 'keine').map((f) => questions[3].options.find((o) => o.id === f)!.label)
  return { primary: ranked[0], secondary: ranked[1], score, total, reasons, features }
}

export function answerSummary(answers: Answers) {
  return questions.map((q) => {
    const labels = (answers[q.id] ?? []).map((id) => q.options.find((o) => o.id === id)?.label).filter(Boolean)
    return `${q.title} ${labels.length ? labels.join(', ') : '–'}`
  })
}
