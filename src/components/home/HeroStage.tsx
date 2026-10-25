import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { Button } from '../ui/Button'
import { Portrait } from '../ui/Portrait'

/** Maus-Parallax: liefert normierte Werte (-1 … 1), gefedert. */
function usePointer() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 18 })
  const sy = useSpring(y, { stiffness: 60, damping: 18 })
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

function Floating({
  sx,
  sy,
  depth,
  className,
  children,
  rotate = 0,
  delay = 0,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  depth: number
  className: string
  children: ReactNode
  rotate?: number
  delay?: number
}) {
  const tx = useTransform(sx, (v) => v * depth * 18)
  const ty = useTransform(sy, (v) => v * depth * 14)
  const ry = useTransform(sx, (v) => v * depth * 6 + rotate)
  const rx = useTransform(sy, (v) => -v * depth * 5)
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x: tx, y: ty, rotateY: ry, rotateX: rx, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, scale: 0.85, z: -120 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      transition={{ duration: 1.2, delay: 0.5 + delay, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="animate-float" style={{ animationDelay: `${delay * -3}s` }}>
        {children}
      </div>
    </motion.div>
  )
}

/** Dunkle, dreidimensional wirkende Arbeitswelt rund um das Porträt. */
export function HeroStage() {
  const { sx, sy } = usePointer()
  const ref = useRef<HTMLElement>(null)
  const portraitX = useTransform(sx, (v) => v * -10)
  const portraitY = useTransform(sy, (v) => v * -8)
  const glowX = useTransform(sx, (v) => `${50 + v * 12}%`)
  const glowY = useTransform(sy, (v) => `${45 + v * 10}%`)
  const glow = useTransform([glowX, glowY] as MotionValue[], ([gx, gy]) => `radial-gradient(600px circle at ${gx} ${gy}, rgba(228,87,46,0.28), transparent 60%)`)

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper">
      <motion.div className="absolute inset-0 -z-10" style={{ background: glow }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 text-white opacity-[0.06] dot-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[38rem] w-[38rem] rounded-full bg-iris/10 blur-3xl" aria-hidden="true" />

      <div className="container-x grid min-h-[100svh] items-center gap-10 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
        {/* Text */}
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="eyebrow text-white/60">
            Webdesign · Grafikdesign · Online-Marketing
          </motion.p>
          <h1 className="mt-7 font-display text-[clamp(2.7rem,7vw,6.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {[
              { t: 'Deine Vision.', c: '' },
              { t: 'Mein Design.', c: 'serif-accent text-glut' },
              { t: 'Gemeinsam digital sichtbar.', c: '' },
            ].map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`block ${l.c}`}
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {l.t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }} className="lead mt-8 max-w-xl text-white/70">
            Ich entwickle digitale Auftritte, die nicht nur gut aussehen, sondern deine Marke stärken, Vertrauen schaffen und Kunden überzeugen.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-10 flex flex-wrap gap-3">
            <Button to="/kontakt" size="lg">Website-Projekt starten</Button>
            <Button to="/portfolio" variant="outline-light" size="lg">Meine Arbeiten entdecken</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-14 hidden items-center gap-4 text-sm text-white/45 sm:flex">
            <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/25" aria-hidden="true">
              <motion.span animate={{ y: [6, 18, 6] }} transition={{ repeat: Infinity, duration: 2.2 }} className="mt-0 h-2 w-1 rounded-full bg-glut" />
            </span>
            Scroll und erlebe, wie aus einer Idee eine Website wird
          </motion.div>
        </div>

        {/* Bühne */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]" style={{ perspective: 1400 }}>
          {/* Porträt */}
          <motion.div
            style={{ x: portraitX, y: portraitY }}
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0 round 240px 240px 32px 32px)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0 round 240px 240px 32px 32px)' }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-[12%] bottom-[4%] top-[6%] overflow-hidden rounded-t-[240px] rounded-b-[32px] ring-1 ring-white/10"
          >
            <Portrait eager />
          </motion.div>

          {/* Browserfenster */}
          <Floating sx={sx} sy={sy} depth={1.4} rotate={-8} className="-left-[6%] top-[10%] w-[46%] sm:-left-[12%]">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-paper shadow-2xl">
              <div className="flex gap-1 border-b border-ink/10 bg-paper-2 px-2 py-1.5">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />)}
              </div>
              <div className="space-y-1.5 p-2.5">
                <div className="h-2 w-3/5 rounded bg-ink" />
                <div className="h-1.5 w-4/5 rounded bg-ink/20" />
                <div className="h-1.5 w-2/3 rounded bg-ink/20" />
                <div className="mt-2 h-3.5 w-1/3 rounded-full bg-glut" />
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <div className="h-6 rounded bg-sand" />
                  <div className="h-6 rounded bg-iris-soft" />
                  <div className="h-6 rounded bg-glut-soft" />
                </div>
              </div>
            </div>
          </Floating>

          {/* Farbpalette */}
          <Floating sx={sx} sy={sy} depth={2} rotate={10} delay={0.15} className="-right-[2%] top-[4%] sm:-right-[8%]">
            <div className="rounded-2xl border border-white/10 bg-ink-2/90 p-3 shadow-2xl backdrop-blur">
              <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/50">Palette</p>
              <div className="flex gap-1.5">
                {['#e4572e', '#a99cf0', '#e7d3b0', '#f5f1ea'].map((c) => <span key={c} className="h-7 w-7 rounded-full ring-1 ring-white/10" style={{ background: c }} />)}
              </div>
            </div>
          </Floating>

          {/* Typo-Karte */}
          <Floating sx={sx} sy={sy} depth={1.1} rotate={6} delay={0.3} className="-right-[4%] top-[42%] sm:-right-[10%]">
            <div className="rounded-2xl bg-paper px-4 py-3 text-ink shadow-2xl">
              <p className="font-serif text-4xl italic leading-none">Aa</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted">Typografie</p>
            </div>
          </Floating>

          {/* Smartphone */}
          <Floating sx={sx} sy={sy} depth={1.8} rotate={-6} delay={0.45} className="bottom-[2%] left-[0%] w-[24%] sm:-left-[4%]">
            <div className="rounded-[18px] bg-ink-3 p-1 shadow-2xl ring-1 ring-white/15">
              <div className="aspect-[9/17] overflow-hidden rounded-[14px] bg-glut p-2">
                <div className="mx-auto mb-2 h-1 w-1/3 rounded-full bg-ink/30" />
                <div className="h-1.5 w-4/5 rounded bg-white" />
                <div className="mt-1 h-1.5 w-3/5 rounded bg-white" />
                <div className="mt-3 h-10 rounded-lg bg-white/25" />
                <div className="mt-2 h-2.5 w-1/2 rounded-full bg-ink" />
              </div>
            </div>
          </Floating>

          {/* Statuschip */}
          <Floating sx={sx} sy={sy} depth={2.4} delay={0.6} className="bottom-[14%] right-[0%] sm:-right-[6%]">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#28c840] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#28c840]" />
              </span>
              Website ist live
            </div>
          </Floating>

          {/* Cursor */}
          <Floating sx={sx} sy={sy} depth={3} delay={0.75} className="left-[42%] top-[30%]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 drop-shadow-lg" aria-hidden="true">
              <path d="M4 3l7 17 2.5-7L21 10.5z" fill="#f5f1ea" stroke="#16131d" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </Floating>
        </div>
      </div>
    </section>
  )
}
