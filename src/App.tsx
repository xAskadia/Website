import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { CustomCursor } from './components/story/CustomCursor'
import { getLenis, SmoothScroll } from './components/story/SmoothScroll'
import { useRouteMeta } from './lib/useMeta'
import { pages, redirects, routeTable } from './routes'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="supergraphic fixed inset-x-0 top-0 z-[70] h-[3px] origin-left" aria-hidden="true" />
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
    const t = window.setTimeout(() => setShow(false), 1500)
    return () => window.clearTimeout(t)
  }, [reduce])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-white" exit={{ opacity: 0, transition: { duration: 0.6 } }} aria-hidden="true">
          <div className="text-center">
            <motion.p initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }} className="script px-6 text-6xl text-ink sm:text-7xl">
              Adelina Rrustolli
            </motion.p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.65, 0, 0.35, 1] }} className="supergraphic mx-auto mt-6 h-1 w-48 origin-left rounded-full" />
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
    <AnimatePresence
      initial={false}
      mode="wait"
      onExitComplete={() => {
        if ((location.state as { scrollTo?: string } | null)?.scrollTo) return
        const l = getLenis()
        if (l) l.scrollTo(0, { immediate: true, force: true })
        else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }}
    >
      <motion.div key={location.pathname} initial={{ opacity: 0, y: reduce ? 0 : 16 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
        <main id="inhalt" tabIndex={-1} className="outline-none">
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes location={location}>
              {Object.entries(redirects).map(([from, id]) => (
                <Route key={from} path={from} element={<Navigate to="/" replace state={{ scrollTo: id }} />} />
              ))}
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
        className="sr-only z-[200] rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Zum Inhalt springen
      </a>
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <IntroLoader />
      <Header />
      <PageShell />
      <Footer />
    </MotionConfig>
  )
}
