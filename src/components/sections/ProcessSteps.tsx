import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { projects } from '../../content/projects'
import { cn } from '../../lib/cn'
import { DeviceFrame } from '../mockups/DeviceFrame'
import { MiniSite } from '../mockups/MiniSite'
import { Icon, type IconName } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

const theme = projects[1].theme

const Artifact = {
  Briefing: () => (
    <div className="rotate-[-1.5deg] rounded-2xl bg-sand p-5 text-lg text-ink shadow-xl">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">Briefing-Notiz</p>
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
      <DeviceFrame url="vorschau.praxis-lindenhof.de"><MiniSite theme={theme} name="Praxis Lindenhof" showSections={false} /></DeviceFrame>
    </div>
  ),
  Testing: () => (
    <div className="rounded-2xl bg-white p-5 text-ink shadow-xl">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-ink/50">Testprotokoll</p>
      <ul className="mt-3 space-y-2 text-sm">
        {['Smartphone, Tablet, Desktop', 'Gängige Browser', 'Kontaktformular & Validierung', 'Ladezeiten & Bildgrößen', 'Tastaturbedienung & Kontraste', 'Impressum & Datenschutz verlinkt'].map((t) => (
          <li key={t} className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-glut text-white"><Icon name="check" className="h-3 w-3" strokeWidth={3} /></span>{t}</li>
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

/** Klickbarer Projektablauf in sechs Phasen – mit beispielhaftem Arbeitsergebnis je Phase. */
export function ProcessSteps() {
  const [active, setActive] = useState(0)
  const p = phases[active]
  const A = p.artifact
  return (
    <div>
      <SectionHeading eyebrow="Zusammenarbeit" title="Sechs Phasen." accent="Null Rätselraten." intro="Klick dich durch die Phasen und sieh, was jeweils passiert, was du beiträgst und welches Ergebnis entsteht." />

      <div className="relative mt-14">
        <div className="absolute left-0 right-0 top-7 hidden h-1 rounded-full bg-ink/[0.06] md:block" aria-hidden="true">
          <motion.div className="supergraphic h-full rounded-full" animate={{ width: `${(active / (phases.length - 1)) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 22 }} />
        </div>
        <div role="tablist" aria-label="Projektphasen" className="relative grid grid-cols-3 gap-y-6 md:grid-cols-6">
          {phases.map((ph, i) => {
            const on = i === active
            const done = i < active
            return (
              <button
                key={ph.t}
                type="button"
                role="tab"
                id={`ph-tab-${i}`}
                aria-selected={on}
                aria-controls="ph-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') setActive((i + 1) % phases.length)
                  if (e.key === 'ArrowLeft') setActive((i - 1 + phases.length) % phases.length)
                }}
                className="group flex flex-col items-center text-center"
              >
                <motion.span animate={{ scale: on ? 1.12 : 1 }} className={cn('grid h-14 w-14 place-items-center rounded-full border-2 transition-colors duration-300', on ? 'border-glut bg-glut text-white shadow-[0_12px_30px_-10px_rgba(47,122,95,0.7)]' : done ? 'border-glut bg-white text-glut' : 'border-ink/10 bg-white text-ink/60 group-hover:border-ink/30')}>
                  <Icon name={ph.icon} className="h-6 w-6" />
                </motion.span>
                <span className={cn('mt-3 text-xs font-semibold tabular-nums', on ? 'text-glut' : 'text-muted')}>0{i + 1}</span>
                <span className={cn('text-sm font-medium', on ? 'text-ink' : 'text-ink/70')}>{ph.t}</span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} id="ph-panel" role="tabpanel" aria-labelledby={`ph-tab-${active}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mt-12 grid gap-10 rounded-[2rem] bg-paper-2 p-7 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-glut">Phase {active + 1} von 6</p>
            <h3 className="mt-2 text-4xl">{p.t}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{p.long}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {p.tasks.map((t) => <li key={t} className="flex gap-2.5"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-glut" />{t}</li>)}
            </ul>
            <div className="mt-8 flex gap-2">
              <button type="button" disabled={active === 0} onClick={() => setActive(active - 1)} className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-sm font-medium disabled:opacity-30">← Zurück</button>
              <button type="button" disabled={active === phases.length - 1} onClick={() => setActive(active + 1)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-glut disabled:opacity-30">Nächste Phase →</button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Beispielhaftes Ergebnis · {p.artifactLabel}</p>
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 }}>
              <A />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
