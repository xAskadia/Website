import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { MockTheme } from '../../content/projects'
import { cn } from '../../lib/cn'
import { DeviceFrame } from '../mockups/DeviceFrame'
import { MiniSite, type MockMode } from '../mockups/MiniSite'

const demoTheme: MockTheme = {
  bg: '#f5f1ea',
  fg: '#16131d',
  accent: '#e4572e',
  soft: '#e7d3b0',
  font: 'grotesk',
  layout: 'split',
  headline: 'Dein Unternehmen. Endlich sichtbar.',
  subline: 'So könnte deine neue Website aussehen – klar, modern und gemacht, um Anfragen zu gewinnen.',
  cta: 'Jetzt anfragen',
  nav: ['Leistungen', 'Über uns', 'Referenzen'],
  motif: 'arch',
}

const stages: { key: string; title: string; text: string; mode: MockMode }[] = [
  { key: 'Idee', title: 'Alles beginnt mit einer Idee.', text: 'Wir sammeln, was dein Unternehmen ausmacht: Ziele, Zielgruppe, Wünsche. Noch ist alles Skizze – und genau so soll es sein.', mode: 'sketch' },
  { key: 'Struktur', title: 'Dann bekommt sie Struktur.', text: 'Seitenaufbau, Inhalte und Nutzerführung werden geplant. Jeder Bereich hat eine Aufgabe – bis hin zur Kontaktanfrage.', mode: 'wire' },
  { key: 'Design', title: 'Daraus wird Design.', text: 'Farben, Typografie und Bildsprache geben deiner Marke ein Gesicht. Individuell, nicht von der Stange.', mode: 'final' },
  { key: 'Live', title: 'Und schließlich: sichtbar.', text: 'Technisch sauber umgesetzt, auf allen Geräten getestet und veröffentlicht. Ab jetzt arbeitet deine Website für dich.', mode: 'final' },
]

const notes = [
  { t: 'Mehr Anfragen!', c: 'bg-sand -rotate-6 left-[4%] top-[8%]' },
  { t: 'Moderner wirken', c: 'bg-iris-soft rotate-3 right-[6%] top-[18%]' },
  { t: 'Auch am Handy top', c: 'bg-glut-soft -rotate-2 left-[12%] bottom-[14%]' },
]

/** Scroll-Erzählung: Aus einer Idee entsteht Schritt für Schritt eine Website. */
export function IdeaToWebsite() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [stage, setStage] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (p) => setStage(Math.min(3, Math.max(0, Math.floor(p * 4.2)))))

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.82, 1])
  const rotateX = useTransform(scrollYProgress, [0, 0.55], [14, 0])
  const progress = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const s = stages[stage]

  return (
    <section ref={ref} className="relative h-[340vh] bg-paper" aria-label="Von der Idee zur Website">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="container-x grid flex-1 items-center gap-8 pt-24 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Erzählung */}
          <div className="relative z-10 order-2 lg:order-1">
            <p className="eyebrow text-muted">Von der Idee zur Website</p>
            <ol className="mt-6 flex gap-2" aria-label="Phasen">
              {stages.map((st, i) => (
                <li key={st.key} className={cn('rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-500', i === stage ? 'bg-ink text-paper' : i < stage ? 'bg-ink/10 text-ink' : 'bg-transparent text-muted ring-1 ring-ink/10')}>
                  <span aria-current={i === stage ? 'step' : undefined}>{st.key}</span>
                </li>
              ))}
            </ol>
            <div className="relative mt-8 min-h-[13rem] sm:min-h-[12rem]">
              <AnimatePresence mode="wait">
                <motion.div key={s.key} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                  <h2 className="display-md">{s.title}</h2>
                  <p className="mt-5 max-w-md leading-relaxed text-muted">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
              <motion.div className="h-full bg-glut" style={{ width: progress }} />
            </div>
          </div>

          {/* Bühne */}
          <div className="relative order-1 lg:order-2" style={{ perspective: 1600 }}>
            <AnimatePresence>
              {stage === 0 &&
                notes.map((n, i) => (
                  <motion.div
                    key={n.t}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.4, y: -30 }}
                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 18 }}
                    className={cn('absolute z-20 rounded-md px-3 py-2 font-serif text-lg italic text-ink shadow-lg sm:text-xl', n.c)}
                    aria-hidden="true"
                  >
                    {n.t}
                  </motion.div>
                ))}
            </AnimatePresence>

            <motion.div style={{ scale, rotateX, transformOrigin: 'center bottom' }} className="relative">
              <DeviceFrame url={stage === 3 ? 'www.dein-unternehmen.de' : 'entwurf.local'}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={s.mode + (stage === 3 ? '-live' : '')} className="absolute inset-0" initial={{ opacity: 0, filter: 'blur(8px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                    <MiniSite theme={demoTheme} name="Dein Logo" mode={s.mode} />
                  </motion.div>
                </AnimatePresence>
              </DeviceFrame>

              <AnimatePresence>
                {stage === 3 && (
                  <>
                    <motion.div initial={{ opacity: 0, x: 60, y: 40 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 60 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="absolute -bottom-6 -right-2 w-[17%] sm:-right-6" aria-hidden="true">
                      <DeviceFrame device="mobile">
                        <MiniSite theme={demoTheme} name="Dein Logo" device="mobile" showSections={false} />
                      </DeviceFrame>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.3, type: 'spring' }} className="absolute -top-4 left-6 flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper shadow-xl">
                      <span className="h-2 w-2 rounded-full bg-[#28c840]" /> Online · auf allen Geräten
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {stage === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute inset-0 rounded-[14px] ring-2 ring-iris/60" aria-hidden="true">
                  <span className="absolute -left-3 top-1/3 rounded bg-iris px-2 py-0.5 text-[10px] font-semibold text-ink">Hero</span>
                  <span className="absolute -left-3 bottom-[18%] rounded bg-iris px-2 py-0.5 text-[10px] font-semibold text-ink">Leistungen</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
