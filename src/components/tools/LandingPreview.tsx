import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import type { MockTheme } from '../../content/projects'
import { cn } from '../../lib/cn'
import { DeviceFrame } from '../mockups/DeviceFrame'
import { MiniSite, type Device } from '../mockups/MiniSite'

interface IndustryPreset {
  label: string
  name: string
  theme: Omit<MockTheme, 'layout' | 'cta'>
  ctas: { soft: string; direct: string; urgent: string }
}

const presets: Record<string, IndustryPreset> = {
  handwerk: {
    label: 'Handwerk',
    name: 'Meisterbetrieb Holm',
    theme: { bg: '#efe9e1', fg: '#1e1b18', accent: '#b85c2c', soft: '#dccfbd', font: 'grotesk', headline: 'Dein neues Bad in 3 Wochen.', subline: 'Planung, Umsetzung und Reinigung aus einer Hand – mit Festpreis-Angebot nach dem Vor-Ort-Termin.', nav: ['Ablauf', 'Projekte', 'FAQ'], motif: 'grid' },
    ctas: { soft: 'Beispiele ansehen', direct: 'Vor-Ort-Termin anfragen', urgent: 'Nur noch 2 Termine im Mai' },
  },
  gesundheit: {
    label: 'Gesundheit',
    name: 'Praxis Morgenrot',
    theme: { bg: '#eef3f0', fg: '#163a33', accent: '#2f8f7a', soft: '#cfe3dc', font: 'rounded', headline: 'Rückenkurs für Einsteiger.', subline: 'Acht Termine in kleiner Gruppe – von Krankenkassen bezuschussbar.', nav: ['Kurs', 'Team', 'Anmeldung'], motif: 'circle' },
    ctas: { soft: 'Mehr zum Kurs', direct: 'Platz reservieren', urgent: 'Kursstart: 3. Juni' },
  },
  gastro: {
    label: 'Gastronomie',
    name: 'Trattoria Sole',
    theme: { bg: '#fbf1e4', fg: '#3a1d14', accent: '#c0392b', soft: '#f1d6b8', font: 'serif', headline: 'Sommerabende auf der Terrasse.', subline: 'Unser neues Saisonmenü – frisch, regional und mit Blick ins Grüne.', nav: ['Menü', 'Terrasse', 'Reservierung'], motif: 'arch' },
    ctas: { soft: 'Menü entdecken', direct: 'Tisch reservieren', urgent: 'Freitag fast ausgebucht' },
  },
  beratung: {
    label: 'Beratung',
    name: 'Klarsicht Coaching',
    theme: { bg: '#f1f0f7', fg: '#1d1a3a', accent: '#5b4bd1', soft: '#dcd8f2', font: 'grotesk', headline: 'Klarheit für deine nächste Karrierestufe.', subline: 'Ein kostenfreies Erstgespräch, 30 Minuten, ohne Verpflichtung.', nav: ['Angebot', 'Über mich', 'Termine'], motif: 'stack' },
    ctas: { soft: 'Ansatz kennenlernen', direct: 'Erstgespräch buchen', urgent: 'Diese Woche noch 3 Slots' },
  },
}

const layouts: { key: MockTheme['layout']; label: string; text: string }[] = [
  { key: 'split', label: 'Geteilt', text: 'Text links, Bild rechts – klassisch und klar.' },
  { key: 'centered', label: 'Zentriert', text: 'Alles im Fokus – ideal für eine starke Botschaft.' },
  { key: 'editorial', label: 'Editorial', text: 'Große Typo, Magazin-Look – wirkt hochwertig.' },
]

const ctaStyles: { key: keyof IndustryPreset['ctas']; label: string; text: string }[] = [
  { key: 'soft', label: 'Neugierig machen', text: 'Niedrige Hürde, lädt zum Weiterlesen ein.' },
  { key: 'direct', label: 'Direkt handeln', text: 'Klare Handlung, klarer Nutzen.' },
  { key: 'urgent', label: 'Dringlichkeit', text: 'Nur ehrlich einsetzen – wenn es wirklich stimmt.' },
]

/** Landingpage-Vorschau: gleiche Inhalte, unterschiedliche Layouts und Call-to-Actions. */
export function LandingPreview() {
  const [industry, setIndustry] = useState<keyof typeof presets>('handwerk')
  const [layout, setLayout] = useState<MockTheme['layout']>('split')
  const [cta, setCta] = useState<keyof IndustryPreset['ctas']>('direct')
  const [device, setDevice] = useState<Device>('desktop')
  const p = presets[industry]
  const theme: MockTheme = { ...p.theme, layout, cta: p.ctas[cta] }

  const group = (label: string, children: ReactNode) => (
    <div role="group" aria-label={label}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
      {children}
    </div>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
      <div className="space-y-8 rounded-4xl border border-ink/10 bg-white p-6 sm:p-7">
        {group(
          'Branche',
          <div className="flex flex-wrap gap-2">
            {Object.entries(presets).map(([k, v]) => (
              <button key={k} type="button" aria-pressed={industry === k} onClick={() => setIndustry(k)} className={cn('chip', industry === k ? 'border-ink bg-ink text-paper' : 'border-ink/15 hover:border-ink/40')}>
                {v.label}
              </button>
            ))}
          </div>,
        )}
        {group(
          'Layout',
          <div className="space-y-2">
            {layouts.map((l) => (
              <button key={l.key} type="button" aria-pressed={layout === l.key} onClick={() => setLayout(l.key)} className={cn('flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition', layout === l.key ? 'border-glut bg-glut/[0.06]' : 'border-ink/10 hover:border-ink/30')}>
                <span className={cn('mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2', layout === l.key ? 'border-glut bg-glut' : 'border-ink/25')} />
                <span>
                  <span className="block font-semibold">{l.label}</span>
                  <span className="block text-sm text-muted">{l.text}</span>
                </span>
              </button>
            ))}
          </div>,
        )}
        {group(
          'Call-to-Action',
          <div className="space-y-2">
            {ctaStyles.map((c) => (
              <button key={c.key} type="button" aria-pressed={cta === c.key} onClick={() => setCta(c.key)} className={cn('flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left transition', cta === c.key ? 'border-glut bg-glut/[0.06]' : 'border-ink/10 hover:border-ink/30')}>
                <span className={cn('mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2', cta === c.key ? 'border-glut bg-glut' : 'border-ink/25')} />
                <span>
                  <span className="block font-semibold">„{p.ctas[c.key]}“</span>
                  <span className="block text-sm text-muted">{c.label} – {c.text}</span>
                </span>
              </button>
            ))}
          </div>,
        )}
      </div>

      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-muted" aria-live="polite">
            Vorschau: <strong className="text-ink">{p.name}</strong> · {layouts.find((l) => l.key === layout)?.label} · fiktives Beispiel
          </p>
          <div className="flex rounded-full border border-ink/10 bg-white p-1" role="group" aria-label="Geräteansicht">
            {(['desktop', 'mobile'] as Device[]).map((d) => (
              <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition', device === d ? 'bg-ink text-paper' : 'text-muted hover:text-ink')}>
                {d === 'desktop' ? 'Desktop' : 'Mobil'}
              </button>
            ))}
          </div>
        </div>
        <div className={cn('mx-auto transition-all duration-700', device === 'mobile' ? 'max-w-[300px]' : 'max-w-none')}>
          <DeviceFrame device={device} url={`${p.name.toLowerCase().replace(/\s+/g, '-')}.de/aktion`}>
            <AnimatePresence mode="wait">
              <motion.div key={industry + layout + device} className="absolute inset-0 h-full" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <MiniSite theme={theme} name={p.name} device={device} />
              </motion.div>
            </AnimatePresence>
          </DeviceFrame>
        </div>
      </div>
    </div>
  )
}
