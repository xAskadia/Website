import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { services } from '../../content/services'
import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { Arrow, Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

export const mainNav = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/ueber-mich', label: 'Über mich' },
  { to: '/arbeitsweise', label: 'Arbeitsweise' },
  { to: '/wissen', label: 'Wissen & FAQ' },
]

/** Seiten, deren oberer Bereich dunkel ist – Header startet dort mit heller Schrift. */
const darkTop = ['/', '/leistungen/online-marketing', '/arbeitsweise', '/website-finder']

export function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const lastY = useRef(0)
  const closeTimer = useRef<number | undefined>(undefined)
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 400 && y > lastY.current + 4)
      if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMega(false)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMega(false)
        setMobile(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const light = darkTop.includes(pathname) && !scrolled && !mega
  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMegaSoon = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 160)
  }
  const leistungenActive = pathname.startsWith('/leistungen')

  const linkCls = (active: boolean) =>
    cn(
      'relative rounded-full px-4 py-2 text-[0.93rem] font-medium transition-colors',
      light ? 'text-white/80 hover:text-white' : 'text-ink/75 hover:text-ink',
      active && (light ? 'text-white' : 'text-ink'),
    )

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !mega && !mobile ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className={cn('transition-all duration-500', scrolled || mega ? 'border-b border-ink/[0.07] bg-paper/85 backdrop-blur-xl' : 'bg-transparent')}>
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Link to="/" aria-label="Zur Startseite" className={cn('shrink-0 transition-colors', light ? 'text-paper' : 'text-ink')}>
              <Logo light={light} />
            </Link>

            <nav aria-label="Hauptnavigation" className="hidden items-center lg:flex">
              <NavLink to="/" end className={({ isActive }) => linkCls(isActive)}>
                Start
              </NavLink>
              <div onMouseEnter={openMega} onMouseLeave={closeMegaSoon} className="relative">
                <button
                  type="button"
                  aria-expanded={mega}
                  aria-controls="megamenu"
                  onClick={() => setMega((m) => !m)}
                  className={cn(linkCls(leistungenActive), 'inline-flex items-center gap-1.5')}
                >
                  Leistungen
                  <svg viewBox="0 0 12 12" className={cn('h-3 w-3 transition-transform duration-300', mega && 'rotate-180')} aria-hidden="true">
                    <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {mainNav.map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => linkCls(isActive)}>
                  {({ isActive }) => (
                    <>
                      {n.label}
                      {isActive && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-glut" />}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden sm:block">
                <Button to="/kontakt" variant={light ? 'light' : 'secondary'} className="!px-5 !py-3 text-sm">
                  Projekt anfragen
                </Button>
              </span>
              <button
                type="button"
                onClick={() => setMobile(true)}
                aria-label="Menü öffnen"
                aria-expanded={mobile}
                aria-controls="mobilemenu"
                className={cn('grid h-12 w-12 place-items-center rounded-full border transition lg:hidden', light ? 'border-white/25 text-paper' : 'border-ink/15 text-ink')}
              >
                <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
                  <span className="h-[2px] w-full rounded bg-current" />
                  <span className="h-[2px] w-3/4 self-end rounded bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Megamenü (Desktop) */}
        <AnimatePresence>
          {mega && (
            <motion.div
              id="megamenu"
              ref={megaRef}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-ink/10 bg-paper/95 shadow-[0_40px_60px_-40px_rgba(22,19,29,0.35)] backdrop-blur-xl lg:block"
            >
              <div className="container-x grid grid-cols-[1fr_340px] gap-10 py-10">
                <div>
                  <div className="mb-5 flex items-baseline justify-between">
                    <p className="eyebrow text-muted">Leistungen</p>
                    <Link to="/leistungen" className="text-sm font-medium text-ink/70 underline-offset-4 hover:text-glut hover:underline">
                      Alle Leistungen im Überblick
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                    {services.map((s, i) => (
                      <motion.li key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i + 0.05 }}>
                        <Link
                          to={s.path}
                          className={cn(
                            'group flex h-full flex-col rounded-3xl border border-transparent p-5 transition-all duration-300 hover:border-ink/10 hover:bg-white',
                            pathname === s.path && 'border-ink/10 bg-white',
                          )}
                        >
                          <span className="flex items-center justify-between">
                            <span className="font-display text-sm font-semibold text-glut">{s.number}</span>
                            <Arrow className="-translate-x-2 text-glut opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </span>
                          <span className="mt-3 font-display text-lg font-semibold leading-tight tracking-tight">{s.navTitle}</span>
                          <span className="mt-2 line-clamp-2 text-sm leading-snug text-muted">{s.teaser}</span>
                          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-iris-soft/70 px-2.5 py-1 text-[0.7rem] font-medium text-ink/80">
                            <span aria-hidden="true">◆</span> {s.tool}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <Link to="/website-finder" className="group relative flex flex-col justify-between overflow-hidden rounded-4xl bg-ink p-7 text-paper">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-glut/80 blur-2xl transition-transform duration-700 group-hover:scale-125" aria-hidden="true" />
                  <div className="relative">
                    <p className="eyebrow text-white/60">Interaktiv</p>
                    <p className="mt-4 font-display text-[1.7rem] font-semibold leading-[1.05] tracking-tight">Welche Website passt zu deinem Unternehmen?</p>
                  </div>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Website-Finder starten <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sub, setSub] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])
  const items = [{ to: '/', label: 'Start' }, ...mainNav, { to: '/website-finder', label: 'Website-Finder' }]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobilemenu"
          role="dialog"
          aria-modal="true"
          aria-label="Menü"
          initial={{ clipPath: 'circle(0% at 92% 4%)' }}
          animate={{ clipPath: 'circle(150% at 92% 4%)' }}
          exit={{ clipPath: 'circle(0% at 92% 4%)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-paper lg:hidden"
        >
          <div className="container-x flex h-[76px] items-center justify-between">
            <Link to="/" onClick={onClose} aria-label="Zur Startseite">
              <Logo light />
            </Link>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Menü schließen" className="grid h-12 w-12 place-items-center rounded-full border border-white/20">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile Navigation" className="container-x pb-10 pt-6">
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setSub((s) => !s)}
                  aria-expanded={sub}
                  className="flex w-full items-center justify-between py-3 font-display text-4xl font-semibold tracking-tight"
                >
                  Leistungen
                  <span className={cn('grid h-10 w-10 place-items-center rounded-full border border-white/20 text-base transition-transform', sub && 'rotate-45 bg-glut border-glut')} aria-hidden="true">
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {sub && (
                    <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <li>
                        <Link to="/leistungen" className="block py-2 pl-1 text-white/60">
                          Alle Leistungen
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link to={s.path} className="flex gap-3 py-2.5 pl-1 text-lg text-white/85">
                            <span className="font-display text-sm text-glut">{s.number}</span>
                            {s.navTitle}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
              {items.map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <NavLink to={n.to} end className={({ isActive }) => cn('block py-3 font-display text-4xl font-semibold tracking-tight', isActive && 'text-glut')}>
                    {n.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
              <Button to="/kontakt" className="w-full">
                Projekt anfragen
              </Button>
              <a href={`mailto:${site.contact.email}`} className="block text-center text-white/60">
                {site.contact.email}
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
