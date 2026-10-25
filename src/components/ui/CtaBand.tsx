import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import { Botanical } from '../story/Botanical'
import { RotatingBadge } from '../story/RotatingBadge'
import { Wave } from '../story/Wave'
import { Arrow, Button } from './Button'
import { SplitText } from './Reveal'
import { useScrollProgress } from '../../lib/motion'

interface Props {
  title?: string
  accent?: string
  text?: string
  kicker?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}

/** Wiederkehrender Call-to-Action am Seitenende – das „Kapitelende“ jeder Seite. */
export function CtaBand({
  title = 'Bereit, digital',
  accent = 'sichtbar zu werden?',
  text = 'Erzähl mir von deinem Unternehmen und deinen Zielen. Im ersten Gespräch klären wir, was du brauchst – unverbindlich und ehrlich.',
  kicker = 'Lass uns starten',
  primary = { label: 'Jetzt unverbindlich anfragen', to: '/kontakt' },
  secondary = { label: 'Website-Finder starten', to: '/website-finder' },
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const radius = useTransform(scrollYProgress, [0, 1], ['6rem', '0rem'])
  return (
    <section ref={ref} className="relative bg-paper pt-24">
      <motion.div style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }} className="relative overflow-hidden bg-moss text-paper">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-iris/30 blur-3xl" aria-hidden="true" />
        <Botanical kind="olive" mode="scroll" className="pointer-events-none absolute -left-10 top-10 w-[60%] max-w-2xl text-paper/30" />
        <div className="container-x relative grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="script text-5xl text-sand sm:text-6xl">{kicker}</p>
            <h2 className="display-lg mt-2">
              <SplitText text={title} /> <SplitText text={accent} className="serif-accent text-sand" delay={0.2} />
            </h2>
            <p className="lead mt-6 max-w-xl text-white/75">{text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to={primary.to} variant="light" size="lg">{primary.label}</Button>
              <Button to={secondary.to} variant="outline-light" size="lg">{secondary.label}</Button>
            </div>
          </div>
          <Link to={primary.to} className="group mx-auto hidden w-48 lg:block" data-cursor="Los" aria-label={primary.label}>
            <RotatingBadge text="Projekt starten · Projekt starten · " className="w-48 text-paper/80">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-glut text-white transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-45">
                <Arrow className="h-6 w-6" />
              </span>
            </RotatingBadge>
          </Link>
        </div>
        <Wave color="var(--color-ink)" variant={2} className="h-[4vw] min-h-8" />
      </motion.div>
    </section>
  )
}
