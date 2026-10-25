import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { useRouteMeta } from './lib/useMeta'
import { pages, routeTable } from './routes'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-glut" aria-hidden="true" />
}

/** Kurzes Marken-Intro beim ersten Besuch pro Sitzung. */
function IntroLoader() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(false)
  useEffect(() => {
    try {
      if (reduce || sessionStorage.getItem('ar-intro')) return
      sessionStorage.setItem('ar-intro', '1')
    } catch {
      return
    }
    setShow(true)
    const t = window.setTimeout(() => setShow(false), 1250)
    return () => window.clearTimeout(t)
  }, [reduce])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink text-paper"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="text-center">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-paper font-display text-3xl font-bold text-ink">
              ar
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.35, type: 'spring' }} className="absolute right-3 top-3 h-3 w-3 rounded-full bg-glut" />
            </motion.div>
            <div className="mt-6 flex justify-center gap-3 font-display text-sm uppercase tracking-[0.3em] text-white/60">
              {['Idee', 'Design', 'Sichtbar'].map((w, i) => (
                <motion.span key={w} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.18 }}>
                  {w}
                  {i < 2 && <span className="ml-3 text-glut">→</span>}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PageShell() {
  const location = useLocation()
  const reduce = useReducedMotion()
  useRouteMeta()
  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 0.25 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0.1 : 0.35, delay: reduce ? 0 : 0.15 } }}
      >
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] bg-ink"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ scaleY: 1, originY: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
            style={{ scaleY: 0 }}
          />
        )}
        <main id="inhalt" tabIndex={-1} className="outline-none">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes location={location}>
              {routeTable.map((r) => {
                const P = pages[r.page].Component
                return <Route key={r.path} path={r.path} element={<P />} />
              })}
            </Routes>
          </Suspense>
        </main>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#inhalt"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('inhalt')?.focus()
        }}
        className="sr-only z-[200] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Zum Inhalt springen
      </a>
      <ScrollProgress />
      <IntroLoader />
      <Header />
      <PageShell />
      <Footer />
    </MotionConfig>
  )
}
