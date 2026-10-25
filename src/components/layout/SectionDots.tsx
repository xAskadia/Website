import { motion } from 'framer-motion'
import { sections } from '../../content/sections'
import { cn } from '../../lib/cn'
import { useActiveSection, useGoToSection } from '../../lib/sections'

/** Seitliche Sprungmarken mit Beschriftung beim Überfahren (nur große Bildschirme). */
export function SectionDots() {
  const active = useActiveSection()
  const go = useGoToSection()
  if (!active) return null
  return (
    <nav aria-label="Abschnitts-Schnellnavigation" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-3">
        {sections.map((s) => {
          const on = active === s.id
          return (
            <li key={s.id}>
              <button type="button" onClick={() => go(s.id)} aria-label={`Zu „${s.label}“ springen`} aria-current={on ? 'true' : undefined} className="group flex items-center gap-3">
                <span className={cn('rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium shadow-sm transition-all duration-300', on ? 'text-glut opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100')}>{s.label}</span>
                <motion.span animate={{ height: on ? 26 : 8 }} className={cn('block w-2 rounded-full transition-colors', on ? 'bg-glut' : 'bg-ink/20 group-hover:bg-ink/50')} />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
