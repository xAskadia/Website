import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { Icon, type IconName } from '../components/ui/Icon'
import { Portrait } from '../components/ui/Portrait'
import { ArchFrame } from '../components/story/ArchFrame'
import { Botanical } from '../components/story/Botanical'
import { RotatingBadge } from '../components/story/RotatingBadge'
import { StoryStatement } from '../components/story/StoryStatement'
import { VelocityMarquee } from '../components/story/VelocityMarquee'
import { Reveal, SplitText } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { cn } from '../lib/cn'
import { useScrollProgress } from '../lib/motion'

type Pillar = 'Design' | 'Strategie' | 'Technik'

const skills: { icon: IconName; t: string; d: string; detail: string; links: Pillar[] }[] = [
  { icon: 'pen', t: 'Webdesign', d: 'Individuelle, moderne Websites mit klarer Nutzerführung.', detail: 'Von der Seitenstruktur bis zum letzten Hover-Effekt: Ich gestalte Websites, die gut aussehen, intuitiv funktionieren und technisch sauber umgesetzt sind.', links: ['Design', 'Technik'] },
  { icon: 'palette', t: 'Grafikdesign', d: 'Visuelle Identitäten, Layouts und Kommunikationsmittel.', detail: 'Farben, Schriften, Formen und Bildsprache – ich entwickle visuelle Systeme, die eine Marke wiedererkennbar machen, online wie offline.', links: ['Design'] },
  { icon: 'chat', t: 'Unternehmenskommunikation', d: 'Botschaften, die verstanden werden.', detail: 'Ich weiß, wie Unternehmen nach außen wirken wollen – und wie man Inhalte so formuliert und strukturiert, dass sie bei der Zielgruppe ankommen.', links: ['Strategie', 'Design'] },
  { icon: 'chart', t: 'Online-Marketing', d: 'Sichtbarkeit, Zielgruppen, Conversion.', detail: 'Eine Website ist Teil eines größeren Ganzen. Ich denke Suchmaschinen, Kampagnen und Nutzerverhalten von Anfang an mit.', links: ['Strategie', 'Technik'] },
  { icon: 'calendar', t: 'Digitales Projektmanagement', d: 'Struktur, Zeitpläne und klare Abläufe.', detail: 'Planung, Koordination und Steuerung digitaler Projekte – damit aus guten Ideen termingerecht gute Ergebnisse werden.', links: ['Strategie', 'Technik'] },
]

const nodes: Record<Pillar, { x: number; y: number }> = {
  Design: { x: 50, y: 12 },
  Strategie: { x: 12, y: 82 },
  Technik: { x: 88, y: 82 },
}

function CompetenceMap() {
  const [active, setActive] = useState<number | null>(null)
  const linked = active === null ? (['Design', 'Strategie', 'Technik'] as Pillar[]) : skills[active].links
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          {(['Design', 'Strategie', 'Technik'] as Pillar[]).map((a, i, arr) => {
            const b = arr[(i + 1) % 3]
            const on = linked.includes(a) && linked.includes(b)
            return <motion.line key={a + b} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke={on ? '#9a7443' : '#ffffff'} strokeOpacity={on ? 0.9 : 0.15} strokeWidth={on ? 0.8 : 0.4} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.2 }} />
          })}
          {(['Design', 'Strategie', 'Technik'] as Pillar[]).map((p) => (
            <motion.line key={p} x1="50" y1="58" x2={nodes[p].x} y2={nodes[p].y} stroke="#8f9e83" strokeDasharray="1 1.5" strokeWidth="0.4" animate={{ strokeOpacity: linked.includes(p) ? 0.9 : 0.15 }} />
          ))}
        </svg>
        {(Object.keys(nodes) as Pillar[]).map((p) => (
          <motion.div key={p} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${nodes[p].x}%`, top: `${nodes[p].y}%` }} animate={{ scale: linked.includes(p) ? 1.08 : 0.9, opacity: linked.includes(p) ? 1 : 0.4 }}>
            <span className={cn('grid h-24 w-24 place-items-center rounded-full font-display text-base font-semibold transition-colors sm:h-28 sm:w-28', linked.includes(p) ? 'bg-glut text-white shadow-[0_0_60px_-10px_rgba(154,116,67,0.8)]' : 'bg-ink-3 text-white/70')}>{p}</span>
          </motion.div>
        ))}
        <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 text-center">
          <AnimatePresence mode="wait">
            <motion.p key={active ?? -1} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="script max-w-[9rem] text-4xl leading-tight text-sand">
              {active === null ? 'Adelina' : skills[active].t}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <ul className="space-y-3">
        {skills.map((s, i) => {
          const on = active === i
          return (
            <li key={s.t}>
              <button type="button" aria-expanded={on} onClick={() => setActive(on ? null : i)} onMouseEnter={() => setActive(i)} className={cn('w-full rounded-3xl border p-5 text-left transition-all duration-300', on ? 'border-glut bg-white/[0.06]' : 'border-white/10 hover:border-white/30')}>
                <span className="flex items-center gap-4">
                  <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition-colors', on ? 'bg-glut text-white' : 'bg-white/5 text-white/70')}><Icon name={s.icon} className="h-5 w-5" /></span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-semibold">{s.t}</span>
                    <span className="block text-sm text-white/55">{s.d}</span>
                  </span>
                  <span className="hidden gap-1 sm:flex">{s.links.map((l) => <span key={l} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{l}</span>)}</span>
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                      <span className="block pt-4 leading-relaxed text-white/75">{s.detail}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const values = [
  { t: 'Individualität', d: 'Keine Vorlagen von der Stange. Jedes Unternehmen ist anders – und so soll sich das auch online zeigen.' },
  { t: 'Klare Kommunikation', d: 'Verständlich, ehrlich und erreichbar. Du weißt immer, woran du bist.' },
  { t: 'Moderne Gestaltung', d: 'Zeitgemäß, aber nicht kurzlebig. Design, das auch in ein paar Jahren noch überzeugt.' },
  { t: 'Nachvollziehbare Prozesse', d: 'Klare Phasen, klare Entscheidungen. Kein Rätselraten, keine Überraschungen.' },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <>
      <section ref={ref} className="relative overflow-hidden bg-paper pb-24 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-iris-soft blur-3xl" aria-hidden="true" />
        <Botanical kind="branch" className="pointer-events-none absolute -left-6 bottom-0 hidden h-[80%] text-moss/35 lg:block" fill />
        <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <p className="eyebrow text-muted">Über mich</p>
            <motion.p initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }} className="script mt-8 text-6xl text-glut sm:text-7xl">
              Hallo, ich bin
            </motion.p>
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] uppercase leading-[0.85] tracking-[-0.02em]">
              <SplitText text="Adelina" delay={0.4} />
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-4 text-[0.72rem] uppercase tracking-[0.42em] text-muted">
              Webdesign · Grafikdesign · Kommunikation · Marketing
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="lead mt-8 max-w-xl text-muted">
              Ich gestalte Websites und Markenauftritte für Unternehmen, die online so überzeugen wollen wie im persönlichen Gespräch. Dabei bin ich keine anonyme Agentur, sondern deine direkte Ansprechpartnerin – von der ersten Idee bis lange nach dem Launch.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-3">
              <Button to="/kontakt">Lass uns kennenlernen</Button>
              <Button to="/arbeitsweise" variant="ghost">So arbeite ich</Button>
            </motion.div>
          </div>
          <div className="relative mx-auto w-full max-w-[440px]">
            <motion.div style={{ y: imgY }}>
              <ArchFrame className="aspect-[4/5.3]">
                <motion.div style={{ scale: imgScale }} className="h-full w-full">
                  <Portrait eager />
                </motion.div>
              </ArchFrame>
            </motion.div>
            <RotatingBadge text="Design · Strategie · Technik · " className="absolute -bottom-8 -left-12 w-36 text-ink">
              <span className="script text-4xl text-glut">ar</span>
            </RotatingBadge>
            <Botanical kind="flower" className="absolute -right-12 bottom-6 h-56 text-moss/60" delay={0.8} fill />
          </div>
        </div>
      </section>

      <StoryStatement label="Meine Haltung" text="Ich gestalte nicht für Algorithmen, sondern für *Menschen* – für deine Kundinnen und Kunden. Und für *dich.*" />

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="Was mich ausmacht" title="Kreativ denken." accent="Strukturiert arbeiten." />
          <Reveal className="space-y-6 text-lg leading-relaxed text-ink/80">
            <p>Ich verbinde kreatives Design mit strategischem Denken und einer strukturierten, projektorientierten Arbeitsweise. Meine Erfahrung reicht von Webdesign und Grafikdesign über Unternehmenskommunikation und Online-Marketing bis hin zum digitalen Projektmanagement.</p>
            <p>Diese Kombination prägt meine Arbeit: Ich frage nicht nur, wie etwas aussehen soll, sondern auch, <strong className="text-ink">wen es erreichen soll, was es bewirken soll und wie wir sicher dort ankommen.</strong></p>
            <p>Ich möchte nicht einfach schöne Websites erstellen. Ich möchte Unternehmen verstehen, ihre Stärken sichtbar machen und digitale Lösungen entwickeln, die wirklich zu ihnen passen.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="container-x">
          <SectionHeading dark eyebrow="Kompetenzen" title="Wo Design, Strategie und Technik" accent="sich treffen." intro="Fahre über eine Kompetenz oder tippe sie an – und sieh, welche Bereiche sie verbindet." />
          <div className="mt-16"><CompetenceMap /></div>
        </div>
      </section>

      <section className="overflow-hidden bg-paper pt-24" aria-label="Meine Werte">
        <VelocityMarquee items={['Meine Werte', 'Meine Werte', 'Meine Werte']} baseVelocity={-2.5} className="text-[18vw] uppercase text-ink lg:text-[12rem]" />
      </section>
      <section className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
        <Botanical kind="fern" mode="scroll" className="pointer-events-none absolute -left-10 bottom-0 h-[90%] text-iris/25" />
        <div className="container-x relative">
        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08} className="group relative bg-ink p-8 transition-colors duration-700 hover:bg-moss sm:p-12">
              <span className="font-display text-6xl italic text-sand/80">{['I', 'II', 'III', 'IV'][i]}</span>
              <h3 className="mt-6 text-3xl uppercase tracking-[0.04em]">{v.t}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-white/65">{v.d}</p>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-paper-2/60 py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="font-display text-4xl italic leading-tight sm:text-6xl">„Eine gute Website zeigt nicht, was alles möglich ist – sondern, <span className="text-glut">was dich ausmacht.</span>“</p>
            <p className="script mt-8 text-5xl text-ink/70">Adelina</p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Lass uns herausfinden," accent="was dich ausmacht." text="Im ersten Gespräch lernen wir uns kennen – ganz unverbindlich. Erzähl mir von deinem Unternehmen, und ich erzähle dir, wie ich helfen kann." />
    </>
  )
}
