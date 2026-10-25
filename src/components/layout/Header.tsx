import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { sections } from '../../content/sections'
import { site } from '../../content/site'
import { cn } from '../../lib/cn'
import { useActiveSection, useGoToSection } from '../../lib/sections'
import { Arrow } from '../ui/Button'
import { Logo } from '../ui/Logo'

const navItems = sections.filter((s) => s.nav)

export function Header() {
  const { pathname } = useLocation()
  const active = useActiveSection()
  const go = useGoToSection()
  const [scrolled, setScrolled] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => setMobile(false), [pathname])
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMobile(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className={cn('transition-all duration-500', scrolled ? 'bg-white/85 shadow-[0_10px_30px_-20px_rgba(27,31,29,0.25)] backdrop-blur-xl' : 'bg-white/0')}>
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  go('start')
                }
              }}
              aria-label="Zum Seitenanfang"
              className="shrink-0"
            >
              <Logo />
            </Link>

            <nav aria-label="Abschnitte" className="hidden items-center gap-1 rounded-full border border-ink/[0.07] bg-white/70 p-1 backdrop-blur lg:flex">
              {navItems.map((n) => {
                const isActive = active === n.id
                return (
                  <a
                    key={n.id}
                    href={`/#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(n.id)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn('relative whitespace-nowrap rounded-full px-4 py-2 text-[0.88rem] font-medium transition-colors', isActive ? 'text-white' : 'text-ink/70 hover:text-ink')}
                  >
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-glut" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className="relative">{n.label}</span>
                  </a>
                )
              })}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="/#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  go('kontakt')
                }}
                className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-3 text-[0.88rem] font-medium text-white transition hover:bg-glut sm:inline-flex"
              >
                Projekt anfragen <Arrow className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <button type="button" onClick={() => setMobile(true)} aria-label="Menü öffnen" aria-expanded={mobile} aria-controls="mobilemenu" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 text-ink lg:hidden">
                <span className="flex w-5 flex-col gap-[5px]" aria-hidden="true">
                  <span className="h-[2px] w-full rounded bg-current" />
                  <span className="h-[2px] w-3/4 self-end rounded bg-current" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const go = useGoToSection()
  const active = useActiveSection()
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])
  const jump = (id: (typeof sections)[number]['id']) => {
    onClose()
    window.setTimeout(() => go(id), 250)
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div id="mobilemenu" role="dialog" aria-modal="true" aria-label="Menü" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] overflow-y-auto bg-white lg:hidden">
          <div className="supergraphic h-1 w-full" />
          <div className="container-x flex h-[72px] items-center justify-between">
            <Logo />
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Menü schließen" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav aria-label="Abschnitte" className="container-x pb-10 pt-4">
            <ul>
              {sections.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={`/#${s.id}`} onClick={(e) => { e.preventDefault(); jump(s.id) }} className="flex items-center justify-between border-b border-ink/[0.07] py-4 text-2xl font-medium">
                    <span className={cn(active === s.id && 'text-glut')}>{s.label}</span>
                    <Arrow className="text-ink/30" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={`mailto:${site.contact.email}`} className="mt-8 block text-muted">{site.contact.email}</a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
