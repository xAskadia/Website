import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/layout/Footer'
import { Botanical } from './components/story/Botanical'
import { CustomCursor } from './components/story/CustomCursor'
import { getLenis, SmoothScroll } from './components/story/SmoothScroll'
import { Header } from './components/layout/Header'
import { useRouteMeta } from './lib/useMeta'
import { pages, routeTable } from './routes'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-glut" aria-hidden="true" />
}

/** Marken-Intro beim ersten Besuch pro Sitzung: ein Zweig wächst, die Signatur schreibt sich. */
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
    const t = window.setTimeout(() => setShow(false), 2300)
    return () => window.clearTimeout(t)
  }, [reduce])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-moss text-paper"
          exit={{ clipPath: 'ellipse(0% 0% at 50% 50%)' }}
          initial={{ clipPath: 'ellipse(150% 150% at 50% 50%)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <Botanical kind="branch" className="absolute -bottom-10 left-[8%] h-[70vh] text-paper/30" />
          <Botanical kind="fern" className="absolute -bottom-10 right-[6%] h-[60vh] text-paper/20" delay={0.2} />
          <div className="relative text-center">
            <motion.p
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="script px-6 text-7xl text-sand sm:text-8xl"
            >
              Adelina Rrustolli
            </motion.p>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mx-auto mt-6 h-px w-40 origin-left bg-paper/40" />
            <div className="mt-6 flex justify-center gap-3 text-[0.68rem] uppercase tracking-[0.4em] text-white/70">
              {['Idee', 'Design', 'Sichtbar'].map((w, i) => (
                <motion.span key={w} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.15 }}>
                  {w}
                  {i < 2 && <span className="ml-3 text-glut">·</span>}
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
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => {
        const l = getLenis()
        if (l) l.scrollTo(0, { immediate: true, force: true })
        else window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 0.25 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0.1 : 0.35, delay: reduce ? 0 : 0.15 } }}
      >
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-moss"
            initial={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
            animate={{ clipPath: 'inset(0% 0% 100% 0% round 0px 0px 50% 50%)', transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ clipPath: ['inset(100% 0% 0% 0% round 50% 50% 0px 0px)', 'inset(0% 0% 0% 0% round 0px)'], transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
            style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          >
            <span className="script text-6xl text-sand/80">Adelina</span>
          </motion.div>
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
