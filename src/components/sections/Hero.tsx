import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import { useScrollProgress } from '../../lib/motion'
import { useGoToSection } from '../../lib/sections'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Portrait } from '../ui/Portrait'

function usePointer() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 60, damping: 18 })
  const sy = useSpring(y, { stiffness: 60, damping: 18 })
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reduce, x, y])
  return { sx, sy }
}

function Float({ sx, sy, depth, drift, progress, className, children, delay = 0 }: { sx: MotionValue<number>; sy: MotionValue<number>; depth: number; drift: number; progress: MotionValue<number>; className: string; children: ReactNode; delay?: number }) {
  const x = useTransform(sx, (v) => v * depth * 14)
  const my = useTransform(sy, (v) => v * depth * 10)
  const dy = useTransform(progress, [0, 1], [0, drift])
  const y = useTransform([my, dy] as MotionValue<number>[], ([a, b]) => (a as number) + (b as number))
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${className}`} aria-hidden="true">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.8 + delay, ease: [0.16, 1, 0.3, 1] }}>
        <div className="animate-float" style={{ animationDelay: `${delay * -4}s` }}>{children}</div>
      </motion.div>
    </motion.div>
  )
}

const quick = [
  { icon: 'phone' as const, t: 'Für jedes Gerät' },
  { icon: 'bolt' as const, t: 'Schnell geladen' },
  { icon: 'search' as const, t: 'Gut auffindbar' },
  { icon: 'handshake' as const, t: 'Persönlich betreut' },
]

/** Einstieg: klar, hell, persönlich – mit leicht schwebender Arbeitswelt. */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const go = useGoToSection()
  const { sx, sy } = usePointer()
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} id="start" className="relative overflow-hidden bg-white pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-iris-soft blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full bg-apri-soft blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div style={{ y: textY }}>
          <motion.p initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }} className="script text-5xl text-glut sm:text-6xl">
            Hallo, ich bin Adelina
          </motion.p>
          <h1 className="mt-4 text-[clamp(2.6rem,6vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            {[
              { t: 'Deine Vision.', c: '' },
              { t: 'Mein Design.', c: 'serif-accent text-glut' },
              { t: 'Gemeinsam digital sichtbar.', c: '' },
            ].map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.08em]">
                <motion.span className={`block ${l.c}`} initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                  {l.t}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="lead mt-7 max-w-xl text-muted">
            Ich entwickle Websites, die nicht nur gut aussehen, sondern deine Marke stärken, Vertrauen schaffen und Kunden überzeugen.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }} className="mt-9 flex flex-wrap gap-3">
            <Button onClick={() => go('kontakt')} size="lg">Website-Projekt starten</Button>
            <Button onClick={() => go('arbeiten')} variant="ghost" size="lg">Meine Arbeiten entdecken</Button>
          </motion.div>
          <motion.ul initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.1 } } }} className="mt-12 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {quick.map((q) => (
              <motion.li key={q.t} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex items-center gap-2.5 text-sm text-ink/80">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-glut-soft text-glut"><Icon name={q.icon} className="h-4 w-4" /></span>
                {q.t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div style={{ scale: imgScale, y: imgY }} className="relative">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0% round 2rem)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
              transition={{ duration: 1.3, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-paper-2 shadow-[0_40px_80px_-40px_rgba(27,31,29,0.45)]"
            >
              <Portrait eager />
              <div className="supergraphic absolute inset-x-0 bottom-0 h-1.5" />
            </motion.div>
          </motion.div>

          <Float sx={sx} sy={sy} depth={1.4} drift={-60} progress={scrollYProgress} className="-left-[18%] top-[10%] w-[52%] sm:-left-[28%]">
            <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-[0_24px_50px_-24px_rgba(27,31,29,0.4)]">
              <div className="flex gap-1 border-b border-ink/[0.06] bg-paper-2 px-3 py-2">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />)}
              </div>
              <div className="space-y-1.5 p-3.5">
                <p className="text-sm font-semibold leading-tight">Dein Unternehmen.</p>
                <div className="h-1.5 w-4/5 rounded bg-ink/10" />
                <div className="h-1.5 w-3/5 rounded bg-ink/10" />
                <div className="mt-2 h-5 w-2/5 rounded-full bg-glut" />
              </div>
            </div>
          </Float>

          <Float sx={sx} sy={sy} depth={2} drift={-110} progress={scrollYProgress} delay={0.15} className="-right-[6%] top-[4%] sm:-right-[12%]">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_24px_50px_-24px_rgba(27,31,29,0.4)]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-apri-soft text-apri"><Icon name="chat" className="h-4 w-4" /></span>
              <span className="text-sm">
                <span className="block font-semibold">Neue Anfrage</span>
                <span className="text-xs text-muted">über dein Kontaktformular</span>
              </span>
            </div>
          </Float>

          <Float sx={sx} sy={sy} depth={1.7} drift={-40} progress={scrollYProgress} delay={0.3} className="-right-[4%] bottom-[16%] sm:-right-[10%]">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium shadow-[0_24px_50px_-24px_rgba(27,31,29,0.4)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glut opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-glut" />
              </span>
              Website ist live
            </div>
          </Float>

          <Float sx={sx} sy={sy} depth={2.4} drift={-90} progress={scrollYProgress} delay={0.45} className="-left-[6%] bottom-[6%] w-[22%] sm:-left-[14%]">
            <div className="rounded-[18px] bg-ink p-1 shadow-2xl">
              <div className="aspect-[9/17] overflow-hidden rounded-[14px] bg-white p-2">
                <div className="mx-auto mb-2 h-1 w-1/3 rounded-full bg-ink/20" />
                <div className="h-1.5 w-4/5 rounded bg-ink" />
                <div className="mt-1 h-1.5 w-3/5 rounded bg-ink/30" />
                <div className="mt-3 h-10 rounded-lg bg-glut-soft" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-glut" />
              </div>
            </div>
          </Float>
        </div>
      </div>
    </section>
  )
}
