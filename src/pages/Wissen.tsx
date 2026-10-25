import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Accordion } from '../components/ui/Accordion'
import { CtaBand } from '../components/ui/CtaBand'
import { PageHero } from '../components/ui/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { faqs, type FaqCategory } from '../content/faq'
import { cn } from '../lib/cn'

const glossary = [
  { t: 'Responsive Design', d: 'Die Website passt sich automatisch an jede Bildschirmgröße an – vom Smartphone bis zum großen Monitor.' },
  { t: 'SEO', d: 'Suchmaschinenoptimierung: Maßnahmen, die helfen, dass deine Website bei Google & Co. besser gefunden wird.' },
  { t: 'Call-to-Action', d: 'Eine klare Handlungsaufforderung, z. B. „Termin anfragen“. Sie zeigt Besuchern den nächsten Schritt.' },
  { t: 'Conversion', d: 'Wenn ein Besucher tut, was die Seite erreichen will – z. B. eine Anfrage senden.' },
  { t: 'Landingpage', d: 'Eine fokussierte Einzelseite mit genau einem Ziel, oft für Kampagnen genutzt.' },
  { t: 'Domain & Hosting', d: 'Die Domain ist deine Adresse (z. B. firma.de), das Hosting der Ort, an dem deine Website gespeichert ist.' },
  { t: 'Barrierearmut', d: 'Gestaltung und Technik, die möglichst vielen Menschen die Nutzung erlauben – auch mit Einschränkungen.' },
  { t: 'Wireframe', d: 'Ein schematischer Entwurf, der Aufbau und Struktur einer Seite zeigt – noch ohne Farben und Bilder.' },
]

function GlossaryCard({ t, d }: { t: string; d: string }) {
  const [flip, setFlip] = useState(false)
  return (
    <button type="button" onClick={() => setFlip((f) => !f)} aria-pressed={flip} aria-label={`${t} – Erklärung ${flip ? 'ausblenden' : 'anzeigen'}`} className="group relative h-48 w-full [perspective:1000px]">
      <motion.span className="relative block h-full w-full [transform-style:preserve-3d]" animate={{ rotateY: flip ? 180 : 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <span className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-ink/10 bg-white p-6 text-left [backface-visibility:hidden]">
          <span className="font-display text-2xl font-semibold tracking-tight">{t}</span>
          <span className="text-sm text-muted transition group-hover:text-glut">Antippen zum Erklären ↻</span>
        </span>
        <span className="absolute inset-0 flex items-center rounded-3xl bg-ink p-6 text-left text-paper [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="leading-relaxed">{d}</span>
        </span>
      </motion.span>
    </button>
  )
}

export default function Wissen() {
  const cats = Array.from(new Set(faqs.map((f) => f.cat)))
  const [cat, setCat] = useState<FaqCategory | 'Alle'>('Alle')
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return faqs.filter((f) => (cat === 'Alle' || f.cat === cat) && (!s || (f.q + f.a).toLowerCase().includes(s)))
  }, [cat, q])

  return (
    <>
      <PageHero eyebrow="Wissen & FAQ" kicker="Gut zu wissen" scene="studio" title="Gute Fragen" accent="verdienen klare Antworten." intro="Was kostet eine Website? Wie lange dauert das? Muss ich Texte selbst schreiben? Hier findest du Antworten – verständlich und ohne Fachchinesisch." />

      <section className="bg-paper pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[300px_1fr]">
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div>
              <label htmlFor="faq-search" className="label">Fragen durchsuchen</label>
              <input id="faq-search" type="search" className="field" placeholder="z. B. Kosten, Google, Texte …" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div role="group" aria-label="Themen" className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
              {(['Alle', ...cats] as const).map((c) => (
                <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn('flex items-center justify-between gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition lg:rounded-2xl', cat === c ? 'bg-ink text-paper' : 'bg-white text-ink/75 hover:text-ink')}>
                  {c}
                  <span className="text-xs opacity-60">{c === 'Alle' ? faqs.length : faqs.filter((f) => f.cat === c).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-sm text-muted" aria-live="polite">{list.length} {list.length === 1 ? 'Frage' : 'Fragen'}</p>
            <AnimatePresence mode="wait">
              <motion.div key={cat + q} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {list.length ? <Accordion items={list} /> : <p className="rounded-3xl bg-white p-8 text-muted">Dazu habe ich noch keine Antwort hinterlegt – frag mich einfach direkt über das Kontaktformular.</p>}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Kleines Website-Glossar" title="Begriffe," accent="einfach erklärt." intro="Tippe eine Karte an, um die Erklärung zu sehen." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {glossary.map((g, i) => (
              <Reveal key={g.t} delay={(i % 4) * 0.06}><GlossaryCard {...g} /></Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Deine Frage war" accent="nicht dabei?" text="Dann frag mich einfach direkt. Ich antworte persönlich – und ohne Verkaufsdruck." primary={{ label: 'Frage stellen', to: '/kontakt' }} />
    </>
  )
}
