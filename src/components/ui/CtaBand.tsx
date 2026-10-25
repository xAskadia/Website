import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from './Button'

interface Props {
  title?: string
  accent?: string
  text?: string
  primary?: { label: string; to: string }
  secondary?: { label: string; to: string }
}

/** Wiederkehrender Call-to-Action-Block am Seitenende. */
export function CtaBand({
  title = 'Bereit, digital',
  accent = 'sichtbar zu werden?',
  text = 'Erzähl mir von deinem Unternehmen und deinen Zielen. Im ersten Gespräch klären wir, was du brauchst – unverbindlich und ehrlich.',
  primary = { label: 'Jetzt unverbindlich anfragen', to: '/kontakt' },
  secondary = { label: 'Website-Finder starten', to: '/website-finder' },
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 35])
  const x = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-glut px-6 py-16 text-white sm:px-14 sm:py-24">
          <motion.div style={{ rotate, x }} className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full border-[48px] border-white/10" aria-hidden="true" />
          <motion.div style={{ rotate }} className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-[3rem] bg-ink/10" aria-hidden="true" />
          <div className="relative max-w-3xl">
            <h2 className="display-lg">
              {title} <span className="serif-accent">{accent}</span>
            </h2>
            <p className="lead mt-6 max-w-xl text-white/85">{text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button to={primary.to} variant="secondary" size="lg">{primary.label}</Button>
              <Button to={secondary.to} variant="outline-light" size="lg">{secondary.label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
