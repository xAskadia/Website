import { motion, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'
import { ArchFrame } from '../story/ArchFrame'
import { Botanical } from '../story/Botanical'
import { RotatingBadge } from '../story/RotatingBadge'
import { Scene, type SceneKind } from '../story/Scene'
import { SplitText } from './Reveal'
import { useScrollProgress } from '../../lib/motion'

interface Props {
  eyebrow: string
  title: string
  accent?: string
  intro: ReactNode
  dark?: boolean
  children?: ReactNode
  aside?: ReactNode
  crumbs?: { to: string; label: string }[]
  /** Handgeschriebener Auftakt über der Headline, z. B. „willkommen“ */
  kicker?: string
  /** Aquarell-Szene im Bogen rechts (wenn kein eigenes `aside`) */
  scene?: SceneKind
  badge?: string
}

/** Einheitlicher, aber flexibler Kopfbereich für Unterseiten. */
export function PageHero({ eyebrow, title, accent, intro, dark, children, aside, crumbs, kicker, scene, badge = 'Design · Strategie · Sichtbarkeit · ' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const side = aside ?? (scene && (
    <div className="relative mx-auto w-full max-w-[420px]">
      <ArchFrame className="aspect-[4/5]">
        <Scene kind={scene} />
      </ArchFrame>
      <RotatingBadge text={badge.repeat(2)} className={cn('absolute -bottom-10 -left-10 w-32 sm:w-36', dark ? 'text-paper' : 'text-ink')}>
        <span className="script text-4xl text-glut">ar</span>
      </RotatingBadge>
    </div>
  ))

  return (
    <section ref={ref} className={cn('relative overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44', dark ? 'bg-ink text-paper' : 'bg-paper text-ink')}>
      <div className={cn('pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl', dark ? 'bg-moss/60' : 'bg-iris-soft/70')} aria-hidden="true" />
      <div className={cn('pointer-events-none absolute -bottom-32 left-1/4 h-[22rem] w-[22rem] rounded-full blur-3xl', dark ? 'bg-glut/10' : 'bg-sand/60')} aria-hidden="true" />
      <Botanical kind="branch" className={cn('pointer-events-none absolute -left-6 bottom-0 hidden h-[70%] w-auto lg:block', dark ? 'text-iris/50' : 'text-moss/40')} />

      <motion.div style={{ y, opacity: fade }} className="container-x relative">
        {crumbs && (
          <nav aria-label="Brotkrumen" className={cn('mb-10 text-xs uppercase tracking-[0.2em]', dark ? 'text-white/50' : 'text-muted')}>
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
        <div className={cn('grid gap-16', !!side && 'lg:grid-cols-[1.2fr_0.8fr] lg:items-center')}>
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('eyebrow', dark ? 'text-white/60' : 'text-muted')}>
              {eyebrow}
            </motion.p>
            {kicker && (
              <motion.p initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }} transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }} className="script mt-6 -mb-4 text-5xl text-glut sm:text-6xl">
                {kicker}
              </motion.p>
            )}
            <h1 className={cn('mt-6', side ? 'display-lg' : 'display-xl')}>
              <SplitText text={title} />
              {accent && (
                <>
                  {' '}
                  <SplitText text={accent} className="serif-accent text-glut" delay={0.25} />
                </>
              )}
            </h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }} className={cn('lead mt-8 max-w-2xl', dark ? 'text-white/70' : 'text-muted')}>
              {intro}
            </motion.div>
            {children && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-10 flex flex-wrap gap-3">
                {children}
              </motion.div>
            )}
          </div>
          {side && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              {side}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
