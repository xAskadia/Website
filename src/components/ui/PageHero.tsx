import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'
import { SplitText } from './Reveal'

interface Props {
  eyebrow: string
  title: string
  accent?: string
  intro: ReactNode
  dark?: boolean
  children?: ReactNode
  aside?: ReactNode
  crumbs?: { to: string; label: string }[]
}

/** Einheitlicher, aber flexibler Kopfbereich für Unterseiten. */
export function PageHero({ eyebrow, title, accent, intro, dark, children, aside, crumbs }: Props) {
  return (
    <section className={cn('relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44', dark ? 'bg-ink text-paper' : 'bg-paper text-ink')}>
      <div className={cn('pointer-events-none absolute inset-0 dot-grid opacity-[0.07]', dark ? 'text-white' : 'text-ink')} aria-hidden="true" />
      <div className="container-x relative">
        {crumbs && (
          <nav aria-label="Brotkrumen" className={cn('mb-8 text-sm', dark ? 'text-white/50' : 'text-muted')}>
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-glut">Start</Link></li>
              {crumbs.map((c) => (
                <li key={c.to} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link to={c.to} className="hover:text-glut">{c.label}</Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={cn('grid gap-12', !!aside && 'lg:grid-cols-[1.2fr_0.8fr] lg:items-end')}>
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('eyebrow', dark ? 'text-white/60' : 'text-muted')}>
              {eyebrow}
            </motion.p>
            <h1 className={cn('mt-6', aside ? 'display-lg' : 'display-xl')}>
              <SplitText text={title} />
              {accent && (
                <>
                  {' '}
                  <SplitText text={accent} className="serif-accent text-glut" delay={0.25} />
                </>
              )}
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className={cn('lead mt-8 max-w-2xl', dark ? 'text-white/70' : 'text-muted')}
            >
              {intro}
            </motion.div>
            {children && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap gap-3">
                {children}
              </motion.div>
            )}
          </div>
          {aside && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
