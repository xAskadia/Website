import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { type Device } from '../components/mockups/MiniSite'
import { DeviceSwitch, ProjectMock } from '../components/mockups/ProjectMock'
import { Arrow, Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { categoryLabels, projects, type Project, type ProjectCategory } from '../content/projects'
import { cn } from '../lib/cn'

function QuickView({ p, onClose }: { p: Project; onClose: () => void }) {
  const [device, setDevice] = useState<Device>('desktop')
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    ref.current?.focus()
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.documentElement.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div role="dialog" aria-modal="true" aria-label={`Vorschau ${p.name}`} className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }} transition={{ type: 'spring', stiffness: 260, damping: 28 }} className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] bg-paper p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-semibold">{p.name} {p.isDemo && <span className="demo-badge ml-2 align-middle">Demo</span>}</p>
            <p className="text-sm text-muted">{p.industry}</p>
          </div>
          <div className="flex items-center gap-3">
            <DeviceSwitch value={device} onChange={setDevice} />
            <button ref={ref} type="button" onClick={onClose} aria-label="Vorschau schließen" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper">✕</button>
          </div>
        </div>
        <div className="mt-6 rounded-3xl bg-paper-2 p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={device} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <ProjectMock p={p} device={device} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-muted">{p.summary}</p>
          <Button to={`/portfolio/${p.slug}`}>Case Study lesen</Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory | 'alle'>('alle')
  const [device, setDevice] = useState<Device>('desktop')
  const [quick, setQuick] = useState<Project | null>(null)
  const list = filter === 'alle' ? projects : projects.filter((p) => p.categories.includes(filter))
  const cats = Object.keys(categoryLabels) as ProjectCategory[]
  const demoCount = projects.filter((p) => p.isDemo).length

  return (
    <>
      <PageHero
        eyebrow="Portfolio · Meine Arbeiten"
        title="Arbeiten, die man"
        accent="anklicken kann."
        intro="Websites, Landingpages und Designkonzepte – mit Desktop-, Tablet- und Mobilansicht. Jedes Projekt erzählt in einer Case Study, wie es entstanden ist."
      />

      <section className="bg-paper pb-24">
        <div className="container-x">
          {demoCount > 0 && (
            <div className="mb-10 flex items-start gap-3 rounded-3xl border border-sand bg-sand/30 p-5 text-sm leading-relaxed">
              <span className="demo-badge shrink-0">Hinweis</span>
              <p>Die hier gezeigten Projekte sind <strong>fiktive Demo-Projekte</strong>. Sie zeigen Gestaltungsansätze und Arbeitsweise – es handelt sich nicht um echte Kundinnen und Kunden. Eigene Referenzen folgen.</p>
            </div>
          )}

          <div className="sticky top-[76px] z-20 -mx-5 flex flex-col gap-4 bg-paper/90 px-5 py-4 backdrop-blur-lg sm:-mx-8 sm:px-8 lg:-mx-12 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div className="-mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Projekte filtern">
              {(['alle', ...cats] as const).map((c) => {
                const count = c === 'alle' ? projects.length : projects.filter((p) => p.categories.includes(c)).length
                return (
                  <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={cn('chip shrink-0', filter === c ? 'border-ink bg-ink text-paper' : 'border-ink/15 bg-white hover:border-ink/40')}>
                    {c === 'alle' ? 'Alle Projekte' : categoryLabels[c]}
                    <span className={cn('rounded-full px-1.5 text-xs', filter === c ? 'bg-white/15' : 'bg-ink/5')}>{count}</span>
                  </button>
                )
              })}
            </div>
            <DeviceSwitch value={device} onChange={setDevice} />
          </div>

          <p className="sr-only" aria-live="polite">{list.length} Projekte angezeigt</p>
          <motion.ul layout className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li key={p.slug} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }} className={cn(i % 3 === 0 && 'md:col-span-2')}>
                  <div className="group relative">
                    <div className={cn('relative overflow-hidden rounded-[2rem] p-6 transition-colors duration-500 sm:p-10', i % 3 === 0 ? 'sm:px-20 sm:py-14' : '')} style={{ background: p.theme.soft }}>
                      <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.02]">
                        <ProjectMock p={p} device={device} />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-5 opacity-100 transition-all duration-500 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                        <button type="button" onClick={() => setQuick(p)} className="rounded-full bg-paper px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:bg-white">Schnellvorschau</button>
                        <Link to={`/portfolio/${p.slug}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper shadow-lg">Case Study</Link>
                      </div>
                      {p.isDemo && <span className="demo-badge absolute left-5 top-5">Demo-Projekt</span>}
                    </div>
                    <Link to={`/portfolio/${p.slug}`} className="mt-5 flex items-start justify-between gap-4">
                      <span>
                        <span className="block font-display text-3xl font-semibold tracking-tight">{p.name}</span>
                        <span className="mt-1 block text-muted">{p.categories.map((c) => categoryLabels[c]).join(' · ')} — {p.industry}</span>
                      </span>
                      <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 transition group-hover:border-glut group-hover:bg-glut group-hover:text-white"><Arrow /></span>
                    </Link>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
          {list.length === 0 && <p className="py-20 text-center text-muted">In dieser Kategorie gibt es noch keine Projekte.</p>}
        </div>
      </section>

      <AnimatePresence>{quick && <QuickView p={quick} onClose={() => setQuick(null)} />}</AnimatePresence>
      <CtaBand title="Dein Projekt könnte" accent="das nächste sein." text="Ich freue mich darauf, dein Unternehmen kennenzulernen und gemeinsam einen Auftritt zu entwickeln, der dich zeigt, wie du bist." />
    </>
  )
}
