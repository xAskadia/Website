import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Botanical } from '../story/Botanical'
import { RotatingBadge } from '../story/RotatingBadge'
import { Button } from '../ui/Button'
import { Portrait } from '../ui/Portrait'
import { useScrollProgress } from '../../lib/motion'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/** Maus-Parallax: normierte, gefederte Werte (-1 … 1). */
function usePointer() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 50, damping: 16 })
  const sy = useSpring(y, { stiffness: 50, damping: 16 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])
  return { sx, sy }
}

function Floating({ sx, sy, depth, className, children, rotate = 0, delay = 0, drift, progress }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; className: string; children: ReactNode; rotate?: number; delay?: number; drift: [number, number]; progress: MotionValue<number> }) {
  const mx = useTransform(sx, (v) => v * depth * 16)
  const my = useTransform(sy, (v) => v * depth * 12)
  const dx = useTransform(progress, [0, 0.4], [0, drift[0]])
  const dy = useTransform(progress, [0, 0.4], [0, drift[1]])
  const x = useTransform([mx, dx] as MotionValue<number>[], ([a, b]) => (a as number) + (b as number))
  const y = useTransform([my, dy] as MotionValue<number>[], ([a, b]) => (a as number) + (b as number))
  const opacity = useTransform(progress, [0.15, 0.38], [1, 0])
  const rot = useTransform(progress, [0, 0.4], [rotate, rotate * 3])
  return (
    <motion.div className={`absolute z-20 ${className}`} style={{ x, y, opacity, rotate: rot }} aria-hidden="true">
      <motion.div initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2, delay: 1 + delay, ease: [0.16, 1, 0.3, 1] }}>
        <div className="animate-float" style={{ animationDelay: `${delay * -3}s` }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Startbühne: Porträt im Bogen, umgeben von einer schwebenden Arbeitswelt.
 * Beim Scrollen öffnet sich der Bogen zu einem Portal und füllt den Bildschirm –
 * Übergang ins erste Kapitel der Geschichte.
 */
export function HeroStage() {
  const reduce = useReducedMotion()
  const { sx, sy } = usePointer()
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const cell = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState({ dx: 0, dy: 0, s: 6 })

  useIsoLayoutEffect(() => {
    const measure = () => {
      if (!stage.current || !cell.current) return
      const st = stage.current.getBoundingClientRect()
      const c = cell.current.getBoundingClientRect()
      if (!c.width) return
      const cx = c.left - st.left + c.width / 2
      const cy = c.top - st.top + c.height / 2
      const s = Math.max(st.width / c.width, st.height / c.height) * 1.25
      setGeo({ dx: st.width / 2 - cx, dy: st.height / 2 - cy, s })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress: raw } = useScrollProgress({ target: section, offset: ['start start', 'end end'] })
  // Funktions-Transform verhindert die (hier fehlerhafte) native Scroll-Timeline-Beschleunigung
  const p = useTransform(raw, (v) => v)
  const textY = useTransform(p, [0, 0.35], [0, -140])
  const textO = useTransform(p, [0.05, 0.3], [1, 0])
  const archX = useTransform(p, [0.12, 0.62], [0, geo.dx])
  const archY = useTransform(p, [0.12, 0.62], [0, geo.dy])
  const archS = useTransform(p, [0.12, 0.7], [1, geo.s])
  const archR = useTransform(p, [0.45, 0.66], ['999px', '0px'])
  const portraitO = useTransform(p, [0.22, 0.48], [1, 0])
  const outlineO = useTransform(p, [0.05, 0.2], [1, 0])
  const chapterO = useTransform(p, [0.66, 0.8], [0, 1])
  const chapterY = useTransform(p, [0.66, 0.85], [40, 0])
  const badgeO = useTransform(p, [0.05, 0.2], [1, 0])
  const hintO = useTransform(p, [0, 0.06], [1, 0])
  const mobileFill = useTransform(p, [0.2, 0.6], ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'])

  return (
    <section ref={section} className={reduce ? 'relative' : 'relative h-[260svh]'} aria-label="Einstieg">
      <div ref={stage} className={reduce ? 'relative min-h-[100svh] overflow-hidden bg-paper' : 'sticky top-0 h-[100svh] overflow-hidden bg-paper'}>
        {/* Atmosphäre */}
        <div className="pointer-events-none absolute -right-48 -top-48 h-[44rem] w-[44rem] rounded-full bg-iris-soft blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-sand/70 blur-3xl" aria-hidden="true" />
        <Botanical kind="branch" className="pointer-events-none absolute -left-4 bottom-0 h-[78%] text-moss/35" delay={0.6} fill />
        <Botanical kind="grass" className="pointer-events-none absolute bottom-0 right-[38%] hidden w-64 text-moss/25 lg:block" delay={1.2} />

        <div className="container-x relative grid h-full items-center gap-8 pb-10 pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:pt-20">
          {/* Text */}
          <motion.div style={{ y: textY, opacity: textO }} className="relative z-30">
            <motion.div initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] }} className="arch absolute -top-12 right-0 h-32 w-24 overflow-hidden sm:hidden" aria-hidden="true">
              <Portrait label={false} />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="eyebrow max-w-[62%] text-muted sm:max-w-none">
              Webdesign · Grafikdesign · Online-Marketing
            </motion.p>
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.6, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
              className="script mt-6 text-5xl text-glut sm:text-6xl"
            >
              Hallo, ich bin Adelina
            </motion.p>
            <h1 className="mt-2 font-display text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[0.98] tracking-[-0.025em]">
              {[
                { t: 'Deine Vision.', c: '' },
                { t: 'Mein Design.', c: 'serif-accent text-glut' },
                { t: 'Gemeinsam digital sichtbar.', c: '' },
              ].map((l, i) => (
                <span key={l.t} className="block overflow-hidden pb-[0.06em]">
                  <motion.span className={`block ${l.c}`} initial={{ y: '110%', rotate: 3 }} animate={{ y: '0%', rotate: 0 }} transition={{ duration: 1.3, delay: 0.7 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}>
                    {l.t}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="lead mt-7 max-w-lg text-muted">
              Ich entwickle digitale Auftritte, die nicht nur gut aussehen, sondern deine Marke stärken, Vertrauen schaffen und Kunden überzeugen.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.8 }} className="mt-9 flex flex-wrap gap-3">
              <Button to="/kontakt" size="lg">Website-Projekt starten</Button>
              <Button to="/portfolio" variant="ghost" size="lg">Meine Arbeiten entdecken</Button>
            </motion.div>
          </motion.div>

          {/* Bühne: Bogen-Portal */}
          <div ref={cell} className="relative mx-auto hidden aspect-[4/5.2] w-full max-w-[400px] sm:block lg:max-w-[440px]">
            <motion.div style={{ opacity: outlineO }} className="arch pointer-events-none absolute inset-0 translate-x-5 -translate-y-5 border border-glut/60" aria-hidden="true" />
            <motion.div
              style={reduce ? undefined : { x: archX, y: archY, scale: archS, borderTopLeftRadius: archR, borderTopRightRadius: archR }}
              initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="arch absolute inset-0 z-10 overflow-hidden bg-moss will-change-transform"
            >
              <motion.div style={{ opacity: portraitO }} className="h-full w-full">
                <Portrait eager />
              </motion.div>
            </motion.div>

            <motion.div style={{ opacity: badgeO }} className="absolute -bottom-8 -left-14 z-30 w-36">
              <RotatingBadge text="Webdesign · Branding · Marketing · " className="w-36 text-ink">
                <span className="script text-4xl text-glut">ar</span>
              </RotatingBadge>
            </motion.div>

            <Floating progress={p} sx={sx} sy={sy} depth={1.4} rotate={-6} drift={[-260, -120]} className="-left-[38%] top-[12%] w-[58%]">
              <div className="overflow-hidden rounded-xl border border-ink/10 bg-white/90 shadow-[0_30px_60px_-30px_rgba(34,42,33,0.5)] backdrop-blur">
                <div className="flex gap-1 border-b border-ink/10 bg-paper px-2.5 py-1.5">
                  {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/20" />)}
                </div>
                <div className="space-y-1.5 p-3">
                  <div className="font-display text-[0.95rem] leading-tight text-ink">Dein Unternehmen.</div>
                  <div className="h-1.5 w-4/5 rounded bg-ink/15" />
                  <div className="h-1.5 w-2/3 rounded bg-ink/15" />
                  <div className="mt-2 h-4 w-2/5 rounded-full bg-glut" />
                </div>
              </div>
            </Floating>

            <Floating progress={p} sx={sx} sy={sy} depth={2} rotate={8} delay={0.15} drift={[220, -160]} className="-right-[16%] top-[6%]">
              <div className="rounded-2xl border border-ink/10 bg-white/90 p-3 shadow-[0_30px_60px_-30px_rgba(34,42,33,0.5)] backdrop-blur">
                <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-muted">Palette</p>
                <div className="flex gap-1.5">
                  {['#4a5743', '#8f9e83', '#e5d6bd', '#9a7443'].map((c) => <span key={c} className="h-7 w-7 rounded-full ring-1 ring-black/5" style={{ background: c }} />)}
                </div>
              </div>
            </Floating>

            <Floating progress={p} sx={sx} sy={sy} depth={1.1} rotate={5} delay={0.3} drift={[260, 40]} className="-right-[18%] top-[46%]">
              <div className="rounded-2xl bg-ink px-4 py-3 text-paper shadow-2xl">
                <p className="font-display text-4xl italic leading-none">Aa</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/60">Bodoni · Jost</p>
              </div>
            </Floating>

            <Floating progress={p} sx={sx} sy={sy} depth={2.2} delay={0.5} drift={[160, 140]} className="-right-[10%] bottom-[10%]">
              <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/90 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ink shadow-xl backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5c9a5a] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5c9a5a]" />
                </span>
                Website ist live
              </div>
            </Floating>
          </div>
        </div>

        {/* Smartphone: Fläche wächst von unten statt Portal-Zoom */}
        {!reduce && <motion.div style={{ clipPath: mobileFill }} className="absolute inset-0 z-[35] bg-moss sm:hidden" aria-hidden="true" />}

        {/* Kapitel I – erscheint im geöffneten Portal */}
        {!reduce && (
          <motion.div style={{ opacity: chapterO, y: chapterY }} className="pointer-events-none absolute inset-0 z-40 grid place-items-center px-6 text-center text-paper">
            <div>
              <p className="eyebrow justify-center text-white/60">Kapitel I</p>
              <p className="script mt-6 text-6xl text-sand sm:text-7xl">Jede Marke</p>
              <p className="display-lg mx-auto mt-1 max-w-4xl">hat eine Geschichte. <span className="serif-accent text-sand">Lass sie uns erzählen.</span></p>
            </div>
          </motion.div>
        )}

        <motion.div style={{ opacity: hintO }} className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.3em] text-muted sm:flex" aria-hidden="true">
          Scrollen
          <span className="relative h-10 w-px overflow-hidden bg-ink/15">
            <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-glut" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
