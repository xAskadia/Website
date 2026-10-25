import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { DeviceFrame } from '../components/mockups/DeviceFrame'
import { MiniSite } from '../components/mockups/MiniSite'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { Icon, type IconName } from '../components/ui/Icon'
import { PageHero } from '../components/ui/PageHero'
import { projects } from '../content/projects'
import { cn } from '../lib/cn'

const theme = projects[1].theme

const Artifact = {
  Briefing: () => (
    <div className="rotate-[-1.5deg] rounded-2xl bg-sand p-5 font-serif text-lg italic text-ink shadow-xl">
      <p className="font-sans text-[10px] font-semibold not-italic uppercase tracking-widest text-ink/50">Briefing-Notiz</p>
      <ul className="mt-3 space-y-1.5">
        <li>→ Ziel: mehr Terminanfragen</li>
        <li>→ Zielgruppe: Berufstätige, 30–60</li>
        <li>→ Wirkung: ruhig, vertrauensvoll</li>
        <li>→ Must-have: Online-Terminanfrage</li>
      </ul>
    </div>
  ),
  Sitemap: () => (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-xl">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">Seitenstruktur</p>
      <div className="mt-4 flex flex-col items-center gap-3 text-xs font-medium">
        <span className="rounded-lg bg-ink px-4 py-2 text-paper">Startseite</span>
        <span className="h-3 w-px bg-ink/30" />
        <div className="grid grid-cols-4 gap-2">
          {['Leistungen', 'Team', 'Praxis', 'Kontakt'].map((s) => <span key={s} className="rounded-lg bg-iris-soft px-2 py-1.5 text-center">{s}</span>)}
        </div>
      </div>
    </div>
  ),
  Moodboard: () => (
    <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-4 shadow-xl">
      {[theme.fg, theme.accent, theme.soft].map((c) => <div key={c} className="aspect-square rounded-xl" style={{ background: c }} />)}
      <div className="col-span-3 rounded-xl p-3" style={{ background: theme.bg, color: theme.fg }}>
        <p className="text-2xl font-bold tracking-tight">Aa — {theme.headline}</p>
      </div>
    </div>
  ),
  Build: () => (
    <div className="space-y-3">
      <pre className="overflow-hidden rounded-2xl bg-ink-2 p-4 text-[11px] leading-relaxed text-white/80 shadow-xl ring-1 ring-white/10"><code>{`<section class="hero">
  <h1>Wieder gut in Bewegung.</h1>
  <a href="/termin" class="btn">
    Termin anfragen
  </a>
</section>`}</code></pre>
      <DeviceFrame dark url="vorschau.praxis-lindenhof.de"><MiniSite theme={theme} name="Praxis Lindenhof" showSections={false} /></DeviceFrame>
    </div>
  ),
  Testing: () => (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-xl">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">Testprotokoll</p>
      <ul className="mt-3 space-y-2 text-sm">
        {['Smartphone, Tablet, Desktop', 'Gängige Browser', 'Kontaktformular & Validierung', 'Ladezeiten & Bildgrößen', 'Tastaturbedienung & Kontraste', 'Impressum & Datenschutz verlinkt'].map((t) => (
          <li key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#28c840] text-white"><Icon name="check" className="h-3 w-3" strokeWidth={3} /></span>{t}</li>
        ))}
      </ul>
    </div>
  ),
  Updates: () => (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-xl">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">Änderungsprotokoll (Beispiel)</p>
      <ul className="mt-3 space-y-3 text-sm">
        {[['Neu', 'Seite „Kurse“ ergänzt'], ['Update', 'Technische Aktualisierungen'], ['Optimiert', 'Texte auf der Startseite geschärft']].map(([k, v]) => (
          <li key={v} className="flex items-center gap-3"><span className="rounded-full bg-glut/10 px-2 py-0.5 text-[10px] font-semibold text-glut">{k}</span>{v}</li>
        ))}
      </ul>
    </div>
  ),
}

const phases: { t: string; icon: IconName; short: string; long: string; tasks: string[]; artifact: () => ReactNode; artifactLabel: string }[] = [
  { t: 'Kennenlernen', icon: 'handshake', short: 'Unternehmen, Ziele und Anforderungen verstehen.', long: 'In einem ersten, unverbindlichen Gespräch lerne ich dich und dein Unternehmen kennen. Was machst du, wen willst du erreichen, was soll deine Website leisten? Danach bekommst du ein transparentes Angebot.', tasks: ['Erstgespräch (Video, Telefon oder vor Ort)', 'Ziele & Wünsche festhalten', 'Transparentes Angebot'], artifact: Artifact.Briefing, artifactLabel: 'Briefing-Notiz' },
  { t: 'Strategie', icon: 'compass', short: 'Zielgruppe, Inhalte, Seitenstruktur und visuelle Richtung festlegen.', long: 'Bevor gestaltet wird, wird gedacht. Wir legen fest, welche Inhalte wohin gehören, wie Besucher geführt werden und welche Wirkung die Website haben soll.', tasks: ['Zielgruppen & Botschaften', 'Seitenstruktur (Sitemap)', 'Inhaltsplanung', 'Visuelle Richtung'], artifact: Artifact.Sitemap, artifactLabel: 'Sitemap' },
  { t: 'Design', icon: 'pen', short: 'Individuelle Gestaltung und erste Entwürfe.', long: 'Jetzt wird es sichtbar: Ich entwickle das Design für deine Website – für Desktop und Smartphone. Du gibst Feedback, wir verfeinern gemeinsam, bis es passt.', tasks: ['Moodboard & Stilrichtung', 'Entwürfe für wichtige Seiten', 'Feedbackrunden', 'Freigabe'], artifact: Artifact.Moodboard, artifactLabel: 'Moodboard' },
  { t: 'Entwicklung', icon: 'code', short: 'Technische Erstellung und interaktive Umsetzung.', long: 'Aus dem Design wird eine funktionierende Website: responsiv, schnell und barrierearm. Interaktive Details und Animationen bringen sie zum Leben.', tasks: ['Technische Umsetzung', 'Inhalte einpflegen', 'Interaktionen & Animationen', 'Vorschau-Link für dich'], artifact: Artifact.Build, artifactLabel: 'Vorschau-Version' },
  { t: 'Testing & Launch', icon: 'rocket', short: 'Optimierung, Tests und Veröffentlichung.', long: 'Alles wird gründlich geprüft – auf verschiedenen Geräten, in verschiedenen Browsern. Dann geht deine Website live, und du bekommst eine Einweisung.', tasks: ['Geräte- & Browsertests', 'Ladezeiten optimieren', 'Livegang', 'Einweisung & Übergabe'], artifact: Artifact.Testing, artifactLabel: 'Testprotokoll' },
  { t: 'Weiterentwicklung', icon: 'refresh', short: 'Optional: Anpassungen, Pflege und Verbesserungen.', long: 'Eine Website ist nie ganz fertig. Auf Wunsch kümmere ich mich um Pflege, Updates und neue Inhalte – damit dein Auftritt aktuell bleibt.', tasks: ['Technische Updates', 'Inhaltliche Änderungen', 'Neue Seiten & Funktionen', 'Optimierungen'], artifact: Artifact.Updates, artifactLabel: 'Änderungsprotokoll' },
]

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <PageHero dark eyebrow="Meine Arbeitsweise" title="Sechs Phasen." accent="Null Rätselraten." intro="Transparenz ist für mich kein Extra, sondern Grundlage. Hier siehst du genau, wie wir gemeinsam von der ersten Idee zur fertigen Website kommen – und was in jeder Phase entsteht.">
        <Button to="/kontakt">Mit Phase 1 starten</Button>
      </PageHero>

      {/* Phasen-Navigation */}
      <div className="sticky top-[76px] z-20 border-b border-ink/10 bg-paper/90 backdrop-blur-lg">
        <div className="container-x flex gap-1 overflow-x-auto py-3" role="tablist" aria-label="Phasen">
          {phases.map((p, i) => (
            <button key={p.t} type="button" role="tab" aria-selected={active === i} onClick={() => { setOpen(i); document.getElementById(`phase-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className={cn('relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition', active === i ? 'text-paper' : 'text-muted hover:text-ink')}>
              {active === i && <motion.span layoutId="phase-pill" className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{i + 1}. {p.t}</span>
            </button>
          ))}
        </div>
      </div>

      <section className="bg-paper py-20 sm:py-28">
        <div ref={ref} className="container-x relative">
          <div className="absolute bottom-0 left-[2.65rem] top-0 w-[2px] bg-ink/10 sm:left-[3.65rem]" aria-hidden="true">
            <motion.div className="w-full bg-glut" style={{ height: fill }} />
          </div>
          <ol className="space-y-10">
            {phases.map((p, i) => {
              const isOpen = open === i
              return (
                <motion.li key={p.t} id={`phase-${i}`} onViewportEnter={() => setActive(i)} viewport={{ amount: 0.5 }} className="relative grid grid-cols-[3.5rem_1fr] gap-5 sm:grid-cols-[5.5rem_1fr] sm:gap-8">
                  <div className="relative z-10 flex justify-center">
                    <motion.span animate={{ scale: active === i ? 1.1 : 1, backgroundColor: active >= i ? '#e4572e' : '#f5f1ea', color: active >= i ? '#ffffff' : '#16131d' }} className="grid h-14 w-14 place-items-center rounded-full border-4 border-paper font-display text-lg font-semibold shadow-[0_0_0_1px_rgba(22,19,29,0.12)] sm:h-[4.5rem] sm:w-[4.5rem] sm:text-xl">
                      0{i + 1}
                    </motion.span>
                  </div>
                  <div className={cn('rounded-[2rem] border bg-white p-6 transition-all duration-500 sm:p-9', active === i ? 'border-ink/20 shadow-[0_30px_60px_-40px_rgba(22,19,29,0.45)]' : 'border-ink/10')}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="max-w-2xl">
                        <span className="flex items-center gap-2 text-sm text-muted"><Icon name={p.icon} className="h-5 w-5 text-glut" /> Phase {i + 1}</span>
                        <h2 className="mt-3 text-4xl sm:text-5xl">{p.t}</h2>
                        <p className="mt-3 text-lg text-muted">{p.short}</p>
                      </div>
                      <button type="button" aria-expanded={isOpen} aria-controls={`phase-detail-${i}`} onClick={() => setOpen(isOpen ? null : i)} className={cn('chip', isOpen ? 'border-glut bg-glut text-white' : 'border-ink/15 hover:border-ink')}>
                        {isOpen ? 'Weniger anzeigen' : 'Details & Beispielergebnis'}
                        <span className={cn('transition-transform', isOpen && 'rotate-45')}>+</span>
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div id={`phase-detail-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                          <div className="grid gap-8 pt-8 lg:grid-cols-2">
                            <div>
                              <p className="leading-relaxed">{p.long}</p>
                              <ul className="mt-6 space-y-2.5">
                                {p.tasks.map((t) => <li key={t} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-glut" />{t}</li>)}
                              </ul>
                            </div>
                            <div className="rounded-3xl bg-paper-2 p-6">
                              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Beispielhaftes Ergebnis · {p.artifactLabel}</p>
                              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
                                <p.artifact />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </section>

      <CtaBand title="Bereit für" accent="Phase 1?" text="Das Kennenlernen ist unverbindlich. Erzähl mir von deinem Vorhaben – ich melde mich persönlich bei dir." primary={{ label: 'Erstgespräch anfragen', to: '/kontakt' }} />
    </>
  )
}
