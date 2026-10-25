import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { faqs, type FaqCategory } from '../../content/faq'
import { cn } from '../../lib/cn'
import { Accordion } from '../ui/Accordion'
import { SectionHeading } from '../ui/SectionHeading'

/** Häufige Fragen mit Themenfilter und Suche. */
export function FaqSection() {
  const cats = Array.from(new Set(faqs.map((f) => f.cat)))
  const [cat, setCat] = useState<FaqCategory | 'Alle'>('Alle')
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return faqs.filter((f) => (cat === 'Alle' || f.cat === cat) && (!s || (f.q + f.a).toLowerCase().includes(s)))
  }, [cat, q])

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow="Häufige Fragen" title="Gute Fragen," accent="klare Antworten." />
        <div className="mt-8">
          <label htmlFor="faq-search" className="label">Fragen durchsuchen</label>
          <input id="faq-search" type="search" className="field" placeholder="z. B. Kosten, Google, Texte …" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div role="group" aria-label="Themen" className="mt-5 flex flex-wrap gap-2">
          {(['Alle', ...cats] as const).map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn('chip', cat === c ? 'border-glut bg-glut text-white' : 'border-ink/10 bg-white hover:border-ink/30')}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm text-muted" aria-live="polite">{list.length} {list.length === 1 ? 'Frage' : 'Fragen'}</p>
        <AnimatePresence mode="wait">
          <motion.div key={cat + q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {list.length ? <Accordion items={list} defaultOpen={0} /> : <p className="rounded-2xl bg-paper-2 p-8 text-muted">Dazu habe ich noch keine Antwort hinterlegt – frag mich einfach direkt über das Kontaktformular.</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
