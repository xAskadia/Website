import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface AccordionItem {
  q: string
  a: ReactNode
}

export function Accordion({ items, dark, defaultOpen = -1 }: { items: AccordionItem[]; dark?: boolean; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen)
  const base = useId()
  return (
    <div className={cn('divide-y border-y', dark ? 'divide-white/10 border-white/10' : 'divide-ink/10 border-ink/10')}>
      {items.map((it, i) => {
        const isOpen = open === i
        const id = `${base}-${i}`
        return (
          <div key={it.q}>
            <h3 className="m-0 font-sans text-base font-medium tracking-normal">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg leading-snug sm:text-xl"
              >
                <span className={cn('transition-colors', isOpen ? 'text-glut' : '', !isOpen && 'group-hover:text-glut')}>{it.q}</span>
                <span className={cn('relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500', isOpen ? 'rotate-45 border-glut bg-glut text-white' : dark ? 'border-white/20' : 'border-ink/15')} aria-hidden="true">
                  <svg viewBox="0 0 16 16" className="h-4 w-4"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn('max-w-3xl pb-7 pr-14 leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{it.a}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
