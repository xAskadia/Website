import { AnimatePresence, motion, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'
import { useGoToSection } from '../../lib/sections'
import { Button } from '../ui/Button'
import { Icon, type IconName } from '../ui/Icon'
import { Portrait } from '../ui/Portrait'
import { Reveal } from '../ui/Reveal'

const background: { icon: IconName; skill: string; benefit: string; text: string }[] = [
  { icon: 'pen', skill: 'Grafikdesign', benefit: 'Deine Website wirkt stimmig und hochwertig.', text: 'Farben, Schriften und Bildsprache greifen ineinander. Deine Website sieht nicht nach Baukasten aus, sondern nach dir.' },
  { icon: 'chat', skill: 'Unternehmenskommunikation', benefit: 'Deine Botschaft kommt an.', text: 'Ich helfe dir, deine Leistungen klar und verständlich zu formulieren – damit Besucher in Sekunden wissen, was du anbietest.' },
  { icon: 'chart', skill: 'Online-Marketing', benefit: 'Deine Website wird gefunden und angefragt.', text: 'Suchmaschinenfreundliche Struktur, klare Nutzerführung und sichtbare Kontaktwege denke ich von Anfang an mit.' },
  { icon: 'calendar', skill: 'Digitales Projektmanagement', benefit: 'Du weißt immer, woran du bist.', text: 'Klare Phasen, verlässliche Absprachen und realistische Zeitpläne – Kreativität mit Struktur.' },
]

const values = ['Individualität', 'Klare Kommunikation', 'Moderne Gestaltung', 'Nachvollziehbare Prozesse']

/** Über mich: Persönlichkeit, Hintergrund als Vorteil für deine Website. */
export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const go = useGoToSection()
  const [open, setOpen] = useState(0)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <div ref={ref} className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
        <motion.div style={{ y }} className="relative">
          <motion.div
            initial={{ clipPath: 'inset(100% 0% 0% 0% round 2rem)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-2"
          >
            <Portrait />
            <div className="supergraphic absolute inset-x-0 bottom-0 h-1.5" />
          </motion.div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white px-5 py-4 shadow-[0_24px_50px_-24px_rgba(27,31,29,0.4)] sm:-right-8">
            <p className="text-sm text-muted">Deine Ansprechpartnerin</p>
            <p className="font-medium">Von der Idee bis zum Livegang</p>
          </div>
        </motion.div>
      </div>

      <div>
        <Reveal>
          <p className="eyebrow text-muted">Über mich</p>
          <h2 className="display-lg mt-5">
            Hallo, ich bin <span className="serif-accent text-glut">Adelina.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lead mt-6 space-y-4 text-ink/75">
          <p>Ich gestalte und entwickle Websites für Unternehmen, die online so überzeugen wollen wie im persönlichen Gespräch. Dabei bin ich keine anonyme Agentur, sondern deine direkte Ansprechpartnerin.</p>
          <p>Mein Fokus ist klar: Websites. Mein Hintergrund ist breiter – und genau davon profitiert dein Projekt.</p>
        </Reveal>

        <p className="mt-10 text-sm font-semibold">Mein Hintergrund – dein Vorteil</p>
        <ul className="mt-4 space-y-3">
          {background.map((b, i) => {
            const on = open === i
            return (
              <li key={b.skill}>
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)} onMouseEnter={() => setOpen(i)} className={cn('w-full rounded-2xl border p-5 text-left transition-all duration-300', on ? 'border-glut/40 bg-glut-soft' : 'border-ink/10 bg-white hover:border-ink/25')}>
                  <span className="flex items-center gap-4">
                    <span className={cn('grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors', on ? 'bg-glut text-white' : 'bg-paper-2 text-ink/70')}><Icon name={b.icon} className="h-5 w-5" /></span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{b.skill}</span>
                      <span className="block text-lg font-medium">{b.benefit}</span>
                    </span>
                    <span className={cn('text-xl text-glut transition-transform', on && 'rotate-45')} aria-hidden="true">+</span>
                  </span>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                        <span className="block pl-[3.75rem] pt-3 leading-relaxed text-ink/70">{b.text}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            )
          })}
        </ul>

        <Reveal className="mt-10">
          <p className="text-sm font-semibold">Worauf ich Wert lege</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {values.map((v) => <span key={v} className="chip border-ink/10 bg-paper-2">{v}</span>)}
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center gap-6">
          <Button onClick={() => go('kontakt')}>Lass uns kennenlernen</Button>
          <span className="script text-5xl text-ink/70">Adelina</span>
        </Reveal>
      </div>
    </div>
  )
}
