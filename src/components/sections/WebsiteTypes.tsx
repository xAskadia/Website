import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { websiteTypes, type WebsiteTypeId } from '../../content/websiteTypes'
import { cn } from '../../lib/cn'
import { useGoToSection } from '../../lib/sections'
import { DeviceFrame } from '../mockups/DeviceFrame'
import { MiniSite } from '../mockups/MiniSite'
import { OldSite } from '../mockups/OldSite'
import { BeforeAfter } from '../ui/BeforeAfter'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

const DURATION = 8

/** Konfigurator vorbelegen (z. B. „Onepager“) – der Konfigurator hört auf dieses Ereignis. */
export const presetConfigurator = (type: WebsiteTypeId) => window.dispatchEvent(new CustomEvent('configurator:preset', { detail: { type } }))

function Preview({ id }: { id: WebsiteTypeId }) {
  const t = websiteTypes.find((w) => w.id === id)!
  if (id === 'relaunch') {
    return (
      <div className="overflow-hidden rounded-[14px] border border-ink/10 shadow-[0_40px_80px_-40px_rgba(27,31,29,0.45)]">
        <div className="flex items-center gap-2 border-b border-ink/10 bg-paper-2 px-3 py-2" aria-hidden="true">
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
          <span className="mx-auto rounded-md bg-white px-3 py-1 text-[10px] text-muted">werkhaus-tischlerei.de</span>
        </div>
        <BeforeAfter className="aspect-[16/10.5]" initial={50} before={<OldSite />} after={<div className="h-full" style={{ containerType: 'inline-size' }}><MiniSite theme={t.theme} name={t.name} /></div>} />
      </div>
    )
  }
  return (
    <div className="relative pb-8">
      <DeviceFrame url={`${t.name.toLowerCase().replace(/[^a-z]+/g, '-')}.de`}>
        <MiniSite theme={t.theme} name={t.name} />
      </DeviceFrame>
      <div className="absolute -bottom-2 -right-3 w-[22%] sm:-right-6">
        <DeviceFrame device="mobile">
          <MiniSite theme={t.theme} name={t.name} device="mobile" showSections={false} />
        </DeviceFrame>
      </div>
    </div>
  )
}

/** Mein Angebot als Tab-Showcase mit automatischem Wechsel (pausiert bei Interaktion). */
export function WebsiteTypes() {
  const go = useGoToSection()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)
  const progress = useMotionValue(0)
  const width = useTransform(progress, (v) => `${v * 100}%`)

  useEffect(() => {
    if (!auto || reduce || !inView || hover) return
    const ctrl = animate(progress, 1, {
      duration: DURATION * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => {
        progress.set(0)
        setActive((a) => (a + 1) % websiteTypes.length)
      },
    })
    return () => ctrl.stop()
  }, [active, auto, reduce, inView, hover, progress])

  const select = (i: number) => {
    setAuto(false)
    progress.set(1)
    setActive(i)
  }
  const t = websiteTypes[active]

  return (
    <div ref={ref}>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Mein Angebot" title="Websites, die für dein Unternehmen" accent="arbeiten." intro="Ich konzentriere mich auf eine Sache – und mache sie richtig: Websites. Von der Idee über das Design bis zum Livegang, alles aus einer Hand." />
      </div>

      <div role="tablist" aria-label="Website-Arten" className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {websiteTypes.map((w, i) => {
          const on = i === active
          return (
            <button
              key={w.id}
              type="button"
              role="tab"
              id={`wt-tab-${w.id}`}
              aria-selected={on}
              aria-controls="wt-panel"
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') select((i + 1) % websiteTypes.length)
                if (e.key === 'ArrowLeft') select((i - 1 + websiteTypes.length) % websiteTypes.length)
              }}
              tabIndex={on ? 0 : -1}
              className={cn('relative overflow-hidden rounded-2xl border px-5 pb-5 pt-4 text-left transition-all duration-300', on ? 'border-glut bg-glut-soft' : 'border-ink/10 bg-white hover:border-ink/30')}
            >
              <span className={cn('text-xs font-semibold tabular-nums', on ? 'text-glut' : 'text-muted')}>0{i + 1}</span>
              <span className="mt-1 block text-lg font-medium leading-tight">{w.title}</span>
              <span className="mt-1 hidden text-sm text-muted sm:block">{w.short}</span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-ink/[0.05]">
                {on && <motion.span className="block h-full bg-glut" style={{ width: auto && !reduce ? width : '100%' }} />}
              </span>
            </button>
          )
        })}
      </div>

      <div id="wt-panel" role="tabpanel" aria-labelledby={`wt-tab-${t.id}`} className="mt-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <AnimatePresence mode="wait">
          <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            <h3 className="text-4xl">{t.title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.text}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold">Ideal für</p>
                <ul className="mt-3 space-y-2">
                  {t.idealFor.map((x) => <li key={x} className="flex gap-2 text-ink/80"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-apri" />{x}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold">Enthalten</p>
                <ul className="mt-3 space-y-2">
                  {t.includes.map((x) => <li key={x} className="flex gap-2 text-ink/80"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-glut" />{x}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button onClick={() => { presetConfigurator(t.id); go('konfigurator') }}>Im Konfigurator zusammenstellen</Button>
              <Button onClick={() => go('kontakt')} variant="ghost">Direkt anfragen</Button>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={t.id} initial={{ opacity: 0, x: 40, rotate: 1 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <Preview id={t.id} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
