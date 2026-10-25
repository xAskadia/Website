import { animate, motion, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

const reasons: { icon: IconName; title: string; text: string; tone: string }[] = [
  { icon: 'eye', title: 'Der erste Eindruck entsteht online.', text: 'Bevor dich jemand anruft oder besucht, schaut er nach. Deine Website ist oft der allererste Kontakt – und der entscheidet, ob es einen zweiten gibt.', tone: 'bg-glut-soft text-glut' },
  { icon: 'shield', title: 'Vertrauen braucht einen Ort.', text: 'Ein professioneller Auftritt zeigt: Hier arbeitet jemand mit Sorgfalt. Das schafft Glaubwürdigkeit, lange bevor ein Gespräch stattfindet.', tone: 'bg-apri-soft text-apri' },
  { icon: 'search', title: 'Du bist jederzeit auffindbar.', text: 'Auch sonntags um 23 Uhr. Wer nach deinen Leistungen sucht, findet dich – und nicht nur die Konkurrenz.', tone: 'bg-iris-soft text-glut' },
  { icon: 'layers', title: 'Deine Leistungen werden verständlich.', text: 'Was bietest du an, für wen und warum? Eine gute Website beantwortet diese Fragen klar – ohne dass du sie jedes Mal neu erklären musst.', tone: 'bg-glut-soft text-glut' },
  { icon: 'pointer', title: 'Anfragen werden leicht gemacht.', text: 'Gute Nutzerführung bringt Besucherinnen und Besucher ohne Umwege zum Kontakt. Jeder unnötige Klick weniger zählt.', tone: 'bg-apri-soft text-apri' },
  { icon: 'spark', title: 'Deine Marke wächst mit.', text: 'Ein stimmiger Auftritt prägt, wie man dich wahrnimmt – heute und langfristig. Deine Website ist das Zentrum deiner Sichtbarkeit.', tone: 'bg-iris-soft text-glut' },
]

/** Ziehbares Karussell (Maus, Touch, Pfeiltasten) mit Fortschrittsanzeige. */
export function Reasons() {
  const viewport = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [max, setMax] = useState(0)
  const [step, setStep] = useState(360)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return
      setMax(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth))
      const card = track.current.firstElementChild as HTMLElement | null
      if (card) setStep(card.offsetWidth + 20)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])
  useMotionValueEvent(x, 'change', (v) => setPos(max ? Math.min(1, Math.max(0, -v / max)) : 0))

  const move = (dir: 1 | -1) => {
    const target = Math.min(0, Math.max(-max, Math.round((x.get() - dir * step) / step) * step))
    animate(x, target, { type: 'spring', stiffness: 260, damping: 32 })
  }

  return (
    <div className="mt-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow="Warum eine professionelle Website?" title="Sechs Gründe, die für sich" accent="sprechen." />
        <div className="flex gap-2">
          <button type="button" onClick={() => move(-1)} disabled={pos <= 0.001} aria-label="Vorherige Karte" className="grid h-12 w-12 place-items-center rounded-full border border-ink/15 bg-white transition hover:border-ink disabled:opacity-30">
            <svg viewBox="0 0 20 20" className="h-4 w-4 rotate-180" fill="none" aria-hidden="true"><path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
          <button type="button" onClick={() => move(1)} disabled={pos >= 0.999} aria-label="Nächste Karte" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:bg-glut disabled:opacity-30">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true"><path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      <div
        ref={viewport}
        className="-mx-5 mt-10 overflow-hidden px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
        tabIndex={0}
        role="region"
        aria-label="Gründe für eine professionelle Website, mit Pfeiltasten blättern"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') move(1)
          if (e.key === 'ArrowLeft') move(-1)
        }}
      >
        <motion.div ref={track} drag="x" dragConstraints={{ left: -max, right: 0 }} dragElastic={0.08} style={{ x }} className="flex w-max cursor-grab gap-5 active:cursor-grabbing" data-cursor="Ziehen">
          {reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex min-h-[22rem] w-[78vw] max-w-[340px] select-none flex-col rounded-[1.75rem] border border-ink/[0.07] bg-white p-7 shadow-[0_30px_60px_-45px_rgba(27,31,29,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-40px_rgba(27,31,29,0.5)]"
            >
              <div className="flex items-center justify-between">
                <span className={cn('grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110', r.tone)}><Icon name={r.icon} className="h-6 w-6" /></span>
                <span className="text-5xl font-light tabular-nums text-ink/10">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-2xl leading-tight">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <div className="mt-8 h-1 overflow-hidden rounded-full bg-ink/[0.06]" aria-hidden="true">
        <motion.div className="supergraphic h-full rounded-full" style={{ width: `${Math.max(12, pos * 100)}%` }} />
      </div>
    </div>
  )
}
