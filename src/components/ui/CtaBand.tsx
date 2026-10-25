import { motion } from 'framer-motion'
import { useGoToSection } from '../../lib/sections'
import { Button } from './Button'

interface Props {
  title?: string
  accent?: string
  text?: string
}

/** Heller Call-to-Action-Streifen mit Farbverlauf-Akzent. */
export function CtaBand({
  title = 'Bereit, digital',
  accent = 'sichtbar zu werden?',
  text = 'Erzähl mir von deinem Unternehmen und deinen Zielen. Im ersten Gespräch klären wir, was du brauchst – unverbindlich und ehrlich.',
}: Props) {
  const go = useGoToSection()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[2rem] bg-glut-soft px-7 py-14 sm:px-14 sm:py-16"
    >
      <div className="supergraphic absolute inset-x-0 top-0 h-1.5" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/70 blur-3xl" aria-hidden="true" />
      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="display-md">
            {title} <span className="serif-accent text-glut">{accent}</span>
          </h2>
          <p className="mt-4 text-lg text-ink/70">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => go('kontakt')} size="lg">Jetzt unverbindlich anfragen</Button>
        </div>
      </div>
    </motion.div>
  )
}
