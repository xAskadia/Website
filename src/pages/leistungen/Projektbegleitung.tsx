import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { StoryStatement } from '../../components/story/StoryStatement'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn, scrollToId } from '../../lib/cn'

const strengths: { icon: IconName; t: string; d: string }[] = [
  { icon: 'calendar', t: 'Strukturierte Planung', d: 'Klare Phasen, klare Meilensteine. Du weißt immer, was als Nächstes kommt.' },
  { icon: 'chat', t: 'Klare Kommunikation', d: 'Verständlich, regelmäßig und ohne Fachchinesisch. Fragen sind jederzeit willkommen.' },
  { icon: 'users', t: 'Zielgruppenverständnis', d: 'Ich frage nach, bis ich verstehe, für wen wir gestalten – und was diese Menschen brauchen.' },
  { icon: 'layers', t: 'Koordination der Phasen', d: 'Konzept, Design, Texte, Technik: Ich halte alle Fäden zusammen.' },
  { icon: 'spark', t: 'Kreativität mit Organisation', d: 'Ideen bekommen Raum – und einen Plan, wie sie Wirklichkeit werden.' },
  { icon: 'compass', t: 'Nachvollziehbare Entscheidungen', d: 'Ich erkläre, warum ich etwas vorschlage. So entscheidest du informiert.' },
  { icon: 'check', t: 'Termingerechte Steuerung', d: 'Realistische Zeitpläne, die wir gemeinsam festlegen – und einhalten.' },
]

const flow = [
  {
    t: 'Briefing',
    span: [0, 2],
    what: 'Wir sprechen über dein Unternehmen, deine Ziele, deine Zielgruppe und deine Wünsche. Ich stelle viele Fragen – das spart später Zeit.',
    you: 'Erzählen, was dir wichtig ist. Vorhandenes Material teilen.',
    get: ['Gesprächsnotizen', 'Zielübersicht', 'Erste Einschätzung'],
  },
  {
    t: 'Planung',
    span: [1, 4],
    what: 'Aus dem Briefing wird ein konkreter Plan: Umfang, Seitenstruktur, Meilensteine und Zuständigkeiten.',
    you: 'Plan prüfen und freigeben.',
    get: ['Projektplan mit Meilensteinen', 'Sitemap', 'Inhaltsliste'],
  },
  {
    t: 'Abstimmung',
    span: [3, 7],
    what: 'Entwürfe werden vorgestellt, besprochen und verfeinert. Feedbackrunden sind fest eingeplant – nicht nachträglich angehängt.',
    you: 'Feedback geben – ehrlich und gerne konkret.',
    get: ['Design-Entwürfe', 'Strukturierte Feedbackrunden', 'Entscheidungsprotokoll'],
  },
  {
    t: 'Umsetzung',
    span: [6, 10],
    what: 'Design wird zur funktionierenden Website. Ich halte dich mit kurzen Zwischenständen auf dem Laufenden.',
    you: 'Letzte Inhalte liefern, Zwischenstände ansehen.',
    get: ['Vorschau-Link', 'Regelmäßige Updates'],
  },
  {
    t: 'Qualitätssicherung',
    span: [9, 11],
    what: 'Tests auf verschiedenen Geräten und Browsern, Prüfung von Formularen, Ladezeiten und Barrierearmut.',
    you: 'Abschließende Durchsicht und Freigabe.',
    get: ['Testprotokoll', 'Korrekturen'],
  },
  {
    t: 'Übergabe',
    span: [11, 12],
    what: 'Livegang, Einweisung und alle wichtigen Zugänge. Auf Wunsch begleite ich dich auch danach weiter.',
    you: 'Feiern. Und deine neue Website teilen.',
    get: ['Live-Website', 'Zugangsdaten & Einweisung', 'Optionale Betreuung'],
  },
]

function ProjectFlow() {
  const [open, setOpen] = useState(0)
  const f = flow[open]
  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white">
      {/* Zeitachse */}
      <div className="border-b border-ink/10 p-6 sm:p-8">
        <div className="mb-3 hidden grid-cols-12 text-[10px] uppercase tracking-wider text-muted sm:grid" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => <span key={i}>{i % 2 === 0 ? `Abschnitt ${i / 2 + 1}` : ''}</span>)}
        </div>
        <div className="space-y-2" role="tablist" aria-label="Projektphasen">
          {flow.map((p, i) => (
            <div key={p.t} className="grid grid-cols-[7.5rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]">
              <button type="button" role="tab" id={`pf-tab-${i}`} aria-selected={open === i} aria-controls="pf-panel" onClick={() => setOpen(i)} className={cn('truncate text-left text-sm font-semibold transition', open === i ? 'text-glut' : 'text-ink/70 hover:text-ink')}>
                {i + 1}. {p.t}
              </button>
              <div className="relative h-8 rounded-full bg-paper-2/70">
                <motion.button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => setOpen(i)}
                  className={cn('absolute inset-y-1 rounded-full transition-colors', open === i ? 'bg-glut' : 'bg-ink/20 hover:bg-ink/35')}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${((p.span[1] - p.span[0]) / 12) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ left: `${(p.span[0] / 12) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">Schematische Darstellung – die tatsächliche Dauer richtet sich nach deinem Projekt.</p>
      </div>
      {/* Details */}
      <AnimatePresence mode="wait">
        <motion.div key={open} id="pf-panel" role="tabpanel" aria-labelledby={`pf-tab-${open}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="grid gap-8 p-6 sm:p-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <p className="font-display text-7xl font-semibold text-glut">0{open + 1}</p>
            <h3 className="mt-2 text-4xl">{f.t}</h3>
          </div>
          <div>
            <p className="eyebrow text-muted">Was passiert</p>
            <p className="mt-3 leading-relaxed">{f.what}</p>
            <p className="eyebrow mt-6 text-muted">Deine Rolle</p>
            <p className="mt-3 leading-relaxed">{f.you}</p>
          </div>
          <div className="rounded-3xl bg-paper p-6">
            <p className="eyebrow text-muted">Das bekommst du</p>
            <ul className="mt-4 space-y-3">
              {f.get.map((g) => (
                <li key={g} className="flex gap-2.5"><Icon name="check" className="h-5 w-5 shrink-0 text-glut" />{g}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              <button type="button" disabled={open === 0} onClick={() => setOpen(open - 1)} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium disabled:opacity-30">← Zurück</button>
              <button type="button" disabled={open === flow.length - 1} onClick={() => setOpen(open + 1)} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-30">Nächste Phase →</button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Projektbegleitung() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/projektbegleitung', label: 'Kommunikation & Projektbegleitung' }]}
        eyebrow="Leistung 06 · Unternehmenskommunikation & Projektbegleitung" kicker="Mit Plan & Herz" scene="dune"
        title="Kreativität braucht"
        accent="einen Plan."
        intro="Meine Erfahrung in Unternehmenskommunikation und digitalem Projektmanagement fließt in jedes Projekt ein. Du bekommst nicht nur ein gutes Ergebnis, sondern auch einen entspannten Weg dorthin."
      >
        <Button onClick={() => scrollToId('ablauf')}>Projektablauf entdecken</Button>
        <Button to="/kontakt" variant="ghost">Projekt besprechen</Button>
      </PageHero>

      <StoryStatement text="Gute Projekte fühlen sich *leicht* an – weil im Hintergrund jemand den *Überblick* behält." />

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Was du von mir erwarten kannst" title="Sieben Versprechen," accent="die ich halten kann." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <Reveal key={s.t} delay={(i % 4) * 0.06} className={cn('rounded-4xl bg-white p-7', i === 0 && 'lg:col-span-2 lg:row-span-1 bg-ink text-paper')}>
                <Icon name={s.icon} className="h-8 w-8 text-glut" />
                <h3 className="mt-8 text-2xl">{s.t}</h3>
                <p className={cn('mt-3 leading-relaxed', i === 0 ? 'text-white/65' : 'text-muted')}>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ablauf" tabIndex={-1} className="scroll-mt-24 bg-paper py-24 outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Klickbarer Projektablauf" title="Was in jeder Phase" accent="passiert." intro="Wähle eine Phase aus und sieh, was ich übernehme, was du beiträgst und welche Ergebnisse entstehen." />
          <Reveal className="mt-14"><ProjectFlow /></Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-paper">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="display-md">„Eine gute Website entsteht nicht nur am Bildschirm, sondern in <span className="serif-accent text-glut">guten Gesprächen.</span>“</p>
          </Reveal>
          <Reveal className="text-white/65">
            <p className="leading-relaxed">Kommunikation ist kein Nebenprodukt eines Projekts, sondern seine Grundlage. Deshalb lege ich Wert auf klare Absprachen, dokumentierte Entscheidungen und einen festen Rhythmus für Rückmeldungen.</p>
          </Reveal>
        </div>
      </section>

      <RelatedServices current="projektbegleitung" />
      <CtaBand title="Erzähl mir von" accent="deinem Projekt." />
    </>
  )
}
