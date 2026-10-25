import type { MockTheme } from './projects'

/**
 * MEIN ANGEBOT: Websites – in vier Varianten.
 * Texte hier ändern, die Startseite übernimmt sie automatisch.
 */
export type WebsiteTypeId = 'onepager' | 'unternehmen' | 'landing' | 'relaunch'

export interface WebsiteType {
  id: WebsiteTypeId
  title: string
  short: string
  text: string
  idealFor: string[]
  includes: string[]
  theme: MockTheme
  name: string
}

export const websiteTypes: WebsiteType[] = [
  {
    id: 'onepager',
    title: 'Onepager',
    short: 'Alles Wichtige auf einer Seite.',
    text: 'Eine klar aufgebaute Seite, die man von oben nach unten entdeckt – mit Sprungmarken, die direkt zu jedem Thema führen. Ideal für einen professionellen, schnellen Start.',
    idealFor: ['Selbstständige & kleine Unternehmen', 'Ein überschaubares Angebot', 'Schneller, professioneller Start'],
    includes: ['Individuelles Design', 'Navigation mit Sprungmarken', 'Kontaktformular', 'Für Smartphone optimiert'],
    name: 'Studio Hain',
    theme: { bg: '#ffffff', fg: '#1b1f1d', accent: '#2f7a5f', soft: '#e2f1ea', font: 'grotesk', layout: 'split', headline: 'Alles, was du wissen musst.', subline: 'Leistungen, Über uns, Kontakt – auf einer Seite, mit einem Klick erreichbar.', cta: 'Kontakt aufnehmen', nav: ['Leistungen', 'Über uns', 'Kontakt'], motif: 'circle' },
  },
  {
    id: 'unternehmen',
    title: 'Unternehmenswebsite',
    short: 'Dein vollständiger Auftritt.',
    text: 'Mehrere Unterseiten geben jeder Leistung, deinem Team und deinen Referenzen eigenen Raum. Die solide Basis für Sichtbarkeit und Vertrauen – auch langfristig.',
    idealFor: ['Unternehmen mit mehreren Leistungen', 'Viel zu erklären und zu zeigen', 'Langfristiger Markenauftritt'],
    includes: ['Individuelles Design', 'Eigene Unterseiten', 'Suchmaschinenfreundliche Struktur', 'Auf Wunsch zum Selbstpflegen'],
    name: 'Holm & Söhne',
    theme: { bg: '#f5f6f3', fg: '#1b1f1d', accent: '#ec9a4a', soft: '#fbeedd', font: 'grotesk', layout: 'editorial', headline: 'Handwerk, das bleibt.', subline: 'Seit drei Generationen planen und bauen wir mit Sorgfalt.', cta: 'Projekt besprechen', nav: ['Leistungen', 'Projekte', 'Team', 'Kontakt'], motif: 'grid' },
  },
  {
    id: 'landing',
    title: 'Landingpage',
    short: 'Ein Angebot, ein Ziel.',
    text: 'Eine fokussierte Seite für eine Kampagne, ein neues Angebot oder ein Event. Ohne Ablenkung – mit einem klaren Call-to-Action, der zur Anfrage führt.',
    idealFor: ['Kampagnen & Anzeigen', 'Neue Produkte oder Kurse', 'Gezielte Anfragen'],
    includes: ['Aufbau mit einem Ziel', 'Klarer Call-to-Action', 'Schnelle Ladezeit', 'Für Smartphone optimiert'],
    name: 'Kurs Morgenrot',
    theme: { bg: '#ecf6f1', fg: '#163a30', accent: '#2f7a5f', soft: '#ffffff', font: 'grotesk', layout: 'centered', headline: 'Rückenkurs für Einsteiger.', subline: 'Acht Termine in kleiner Gruppe – jetzt Platz sichern.', cta: 'Platz sichern', nav: ['Kurs', 'Ablauf', 'Anmeldung'], motif: 'wave' },
  },
  {
    id: 'relaunch',
    title: 'Relaunch',
    short: 'Aus alt wird überzeugend.',
    text: 'Deine Website ist in die Jahre gekommen? Ich behalte, was funktioniert, und ersetze, was bremst: modernes Design, klare Struktur, mobile Darstellung und schnelle Ladezeiten.',
    idealFor: ['Veraltetes Design', 'Schlechte mobile Darstellung', 'Unübersichtliche Inhalte'],
    includes: ['Analyse der bestehenden Website', 'Neue Struktur & Design', 'Weiterleitungen alter Adressen', 'Technische Modernisierung'],
    name: 'Werkhaus Tischlerei',
    theme: { bg: '#ffffff', fg: '#1b1f1d', accent: '#2f7a5f', soft: '#e8ebe6', font: 'grotesk', layout: 'split', headline: 'Möbel, die bleiben.', subline: 'Maßanfertigungen aus Massivholz – geplant mit dir.', cta: 'Projekt besprechen', nav: ['Arbeiten', 'Werkstatt', 'Kontakt'], motif: 'stack' },
  },
]
