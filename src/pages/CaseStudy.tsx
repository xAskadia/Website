import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { DeviceFrame } from '../components/mockups/DeviceFrame'
import { MiniSite, type Device } from '../components/mockups/MiniSite'
import { OldSite } from '../components/mockups/OldSite'
import { BeforeAfter } from '../components/ui/BeforeAfter'
import { Arrow } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { categoryLabels, projectBySlug, projects } from '../content/projects'
import { cn } from '../lib/cn'
import NotFound from './NotFound'
import { DeviceSwitch, ProjectMock } from '../components/mockups/ProjectMock'

const chapters = [
  { key: 'ausgangssituation', label: 'Ausgangssituation' },
  { key: 'zielsetzung', label: 'Zielsetzung' },
  { key: 'konzeption', label: 'Konzeption' },
  { key: 'design', label: 'Design' },
  { key: 'ergebnis', label: 'Ergebnis' },
] as const

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const p = projectBySlug(slug)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const [device, setDevice] = useState<Device>('desktop')
  const [chapter, setChapter] = useState(0)

  if (!p) return <NotFound />
  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]
  const t = p.theme

  return (
    <>
      <section ref={ref} className="relative overflow-hidden pb-20 pt-36 sm:pt-44" style={{ background: t.soft }}>
        <div className="container-x relative">
          <nav aria-label="Brotkrumen" className="mb-8 text-sm text-ink/60">
            <Link to="/portfolio" className="hover:text-glut">← Alle Arbeiten</Link>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            {p.isDemo && <span className="demo-badge">Fiktives Demo-Projekt</span>}
            {p.categories.map((c) => <span key={c} className="rounded-full bg-white/60 px-3 py-1 text-xs font-medium">{categoryLabels[c]}</span>)}
          </div>
          <h1 className="display-xl mt-6" style={{ color: t.fg }}>{p.name}</h1>
          <p className="lead mt-6 max-w-2xl" style={{ color: t.fg, opacity: 0.75 }}>{p.summary}</p>
          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
            <div><dt className="text-xs uppercase tracking-wider opacity-60">Branche</dt><dd className="mt-1 font-semibold">{p.industry}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider opacity-60">Leistungen</dt><dd className="mt-1 font-semibold">{p.services.join(', ')}</dd></div>
            <div><dt className="text-xs uppercase tracking-wider opacity-60">Status</dt><dd className="mt-1 font-semibold">{p.isDemo ? 'Konzept / Demo' : 'Live'}</dd></div>
          </dl>
        </div>
        <motion.div style={{ y }} className="container-x relative mt-16">
          <div className="relative mx-auto max-w-5xl">
            <DeviceFrame url={`${p.slug}.de`}><MiniSite theme={t} name={p.name} /></DeviceFrame>
            <div className="absolute -bottom-10 -right-2 w-[16%] sm:-right-8"><DeviceFrame device="mobile"><MiniSite theme={t} name={p.name} device="mobile" showSections={false} /></DeviceFrame></div>
            <div className="absolute -bottom-14 -left-2 hidden w-[26%] sm:-left-10 sm:block"><DeviceFrame device="tablet"><MiniSite theme={t} name={p.name} device="tablet" /></DeviceFrame></div>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Kapitel der Case Study" className="lg:sticky lg:top-28 lg:self-start">
            <ol className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
              {chapters.map((c, i) => (
                <li key={c.key}>
                  <a href={`#${c.key}`} onClick={(e) => { e.preventDefault(); document.getElementById(c.key)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }} className={cn('flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full px-4 py-2 text-sm transition lg:rounded-xl', chapter === i ? 'bg-ink text-paper' : 'text-muted hover:text-ink')}>
                    <span className="font-display text-xs">0{i + 1}</span>{c.label}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-4 hidden text-xs text-muted lg:block">Ausgangssituation → Zielsetzung → Konzeption → Design → Ergebnis</p>
          </nav>
          <div className="space-y-20">
            {chapters.map((c, i) => (
              <motion.article key={c.key} id={c.key} onViewportEnter={() => setChapter(i)} viewport={{ amount: 0.6 }} className="scroll-mt-32">
                <Reveal>
                  <p className="font-display text-sm font-semibold text-glut">0{i + 1} — {c.label}</p>
                  <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl">{p.case[c.key]}</p>
                </Reveal>
                {c.key === 'design' && (
                  <Reveal className="mt-10 grid gap-4 sm:grid-cols-[1fr_1fr]">
                    <div className="grid grid-cols-4 gap-2">
                      {[t.fg, t.accent, t.soft, t.bg].map((col) => (
                        <div key={col} className="flex aspect-[3/4] items-end rounded-2xl p-2 text-[10px] font-medium ring-1 ring-ink/10" style={{ background: col, color: col === t.fg || col === t.accent ? '#fff' : t.fg }}>{col.toUpperCase()}</div>
                      ))}
                    </div>
                    <div className="rounded-2xl p-6 ring-1 ring-ink/10" style={{ background: t.bg, color: t.fg }}>
                      <p className="text-xs uppercase tracking-wider opacity-60">Typografie</p>
                      <p className="mt-3 text-4xl leading-none" style={{ fontFamily: t.font === 'serif' ? 'var(--font-serif)' : t.font === 'rounded' ? 'ui-rounded, var(--font-sans)' : 'var(--font-display)', fontWeight: t.font === 'serif' ? 400 : 650 }}>{t.headline}</p>
                    </div>
                  </Reveal>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Geräte */}
      <section className="bg-ink py-24 text-paper">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md">Auf jedem Gerät <span className="serif-accent text-glut">zu Hause.</span></h2>
            <DeviceSwitch value={device} onChange={setDevice} dark />
          </div>
          <div className="mt-12 rounded-[2rem] p-6 sm:p-12" style={{ background: t.soft }}>
            <motion.div key={device} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><ProjectMock p={p} device={device} /></motion.div>
          </div>
        </div>
      </section>

      {p.hasBeforeAfter && (
        <section className="bg-paper py-24">
          <div className="container-x">
            <h2 className="display-md">Vorher <span className="serif-accent text-glut">/ Nachher</span></h2>
            <p className="mt-4 max-w-xl text-muted">Fiktiver Vergleich: so könnte ein veralteter Auftritt aussehen – und so das neue Konzept.</p>
            <div className="mt-10 overflow-hidden rounded-[14px] border border-ink/10 shadow-2xl">
              <BeforeAfter className="aspect-[16/11] sm:aspect-[16/9.5]" before={<OldSite name={p.name} />} after={<div className="h-full" style={{ containerType: 'inline-size' }}><MiniSite theme={t} name={p.name} /></div>} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper py-16">
        <div className="container-x">
          <Link to={`/portfolio/${next.slug}`} className="group flex flex-col justify-between gap-6 rounded-[2.5rem] p-8 transition-all sm:flex-row sm:items-center sm:p-12" style={{ background: next.theme.soft, color: next.theme.fg }}>
            <span>
              <span className="text-sm opacity-60">Nächstes Projekt</span>
              <span className="mt-2 block font-display text-4xl font-semibold tracking-tight sm:text-6xl">{next.name}</span>
            </span>
            <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-paper transition-transform group-hover:translate-x-2"><Arrow className="h-6 w-6" /></span>
          </Link>
        </div>
      </section>
      <CtaBand title="Lust auf ein" accent="eigenes Projekt?" />
    </>
  )
}
