import { motion } from 'framer-motion'
import { useState } from 'react'
import { InquiryCalculator } from '../../components/tools/InquiryCalculator'
import { StoryStatement } from '../../components/story/StoryStatement'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn, scrollToId } from '../../lib/cn'

const topics: { icon: IconName; title: string; text: string }[] = [
  { icon: 'search', title: 'Suchmaschinenfreundliche Struktur', text: 'Klare Seitenhierarchie, sprechende Titel und Beschreibungen, saubere Überschriften – damit Suchmaschinen verstehen, worum es geht.' },
  { icon: 'pointer', title: 'Nutzerführung', text: 'Besucherinnen und Besucher werden Schritt für Schritt zu den Informationen geführt, die sie brauchen – und dann zur Anfrage.' },
  { icon: 'users', title: 'Zielgruppenansprache', text: 'Wer soll sich angesprochen fühlen? Tonalität, Bilder und Argumente richten sich nach den Menschen, die du erreichen willst.' },
  { icon: 'chat', title: 'Verständliche Inhalte', text: 'Keine Fachsprache-Wände. Texte, die in Sekunden klarmachen, was du anbietest und warum es sich lohnt.' },
  { icon: 'target', title: 'Conversion-Optimierung', text: 'Sichtbare Call-to-Actions, kurze Formulare, Vertrauenselemente: kleine Details, die über eine Anfrage entscheiden.' },
  { icon: 'spark', title: 'Digitale Markenkommunikation', text: 'Eine Stimme, ein Auftritt – auf der Website, in Social Media und im Newsletter.' },
]

const funnel = [
  { k: 'Gefunden werden', d: 'Suchmaschinen, Social Media, Empfehlungen, Anzeigen', w: 100 },
  { k: 'Verstanden werden', d: 'Klare Botschaft, verständliches Angebot', w: 78 },
  { k: 'Vertrauen gewinnen', d: 'Professioneller Auftritt, nachvollziehbare Informationen', w: 58 },
  { k: 'Angefragt werden', d: 'Einfache, sichtbare Kontaktwege', w: 40 },
]

function Funnel() {
  const [active, setActive] = useState(0)
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="space-y-2.5">
        {funnel.map((f, i) => (
          <button key={f.k} type="button" onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-pressed={active === i} className="mx-auto block w-full" style={{ maxWidth: `${f.w}%` }}>
            <motion.span layout className={cn('flex items-center justify-between rounded-2xl px-5 py-4 text-left font-semibold transition-colors', active === i ? 'bg-glut text-white' : 'bg-white text-ink hover:bg-paper-3')}>
              <span>{f.k}</span>
              <span className="font-display text-sm opacity-60">0{i + 1}</span>
            </motion.span>
          </button>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-4xl bg-white p-8">
        <p className="eyebrow text-muted">Stufe {active + 1}</p>
        <h3 className="mt-4 text-3xl">{funnel[active].k}</h3>
        <p className="mt-3 text-lg leading-relaxed text-muted">{funnel[active].d}.</p>
        <p className="mt-6 leading-relaxed">
          {[
            'Die beste Website bringt wenig, wenn niemand sie findet. Ich lege die technische und inhaltliche Grundlage für Sichtbarkeit.',
            'Wer auf deiner Website landet, entscheidet in Sekunden, ob er bleibt. Deshalb steht dein Nutzen ganz vorne.',
            'Vertrauen entsteht durch Klarheit, Qualität und Persönlichkeit – nicht durch übertriebene Versprechen.',
            'Am Ende zählt, dass der nächste Schritt leicht ist. Jede Hürde weniger ist eine Chance mehr.',
          ][active]}
        </p>
      </motion.div>
    </div>
  )
}

export default function OnlineMarketing() {
  return (
    <>
      <PageHero
        dark
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/online-marketing', label: 'Online-Marketing' }]}
        eyebrow="Leistung 05 · Online-Marketing & digitale Sichtbarkeit" kicker="Gesehen werden" scene="forest"
        title="Gefunden. Verstanden."
        accent="Angefragt."
        intro="Die beste Website bringt wenig, wenn Menschen sie nicht finden – oder nicht verstehen, was du anbietest. Ich betrachte Websites deshalb nicht nur gestalterisch, sondern auch strategisch und kommunikativ."
      >
        <Button onClick={() => scrollToId('rechner')}>Zum Anfragen-Rechner</Button>
        <Button to="/kontakt" variant="outline-light">Strategie besprechen</Button>
      </PageHero>

      <StoryStatement text="Sichtbarkeit entsteht, wenn *Gestaltung,* *Inhalt* und *Strategie* in dieselbe Richtung zeigen." />

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <SectionHeading eyebrow="Mein Vorteil für dich" title="Design und Marketing" accent="aus einer Hand." />
          <Reveal className="lead space-y-5 text-muted">
            <p>Durch meinen Hintergrund im Online-Marketing denke ich bei jeder Gestaltungsentscheidung mit: <strong className="text-ink">Wen wollen wir erreichen? Was soll diese Person tun? Was hält sie davon ab?</strong></p>
            <p>Das Ergebnis sind Websites, bei denen Gestaltung, Inhalte und Struktur zusammenarbeiten – statt nebeneinander her.</p>
          </Reveal>
        </div>
        <div className="container-x mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.07} className="rounded-4xl border border-ink/10 bg-white p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-iris-soft text-ink"><Icon name={t.icon} className="h-6 w-6" /></span>
              <h3 className="mt-6 text-2xl">{t.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Zusammenspiel von Website & Marketing" title="Vom ersten Klick" accent="zur Anfrage." intro="Jede Stufe hat ihre eigene Aufgabe. Fahre über die Stufen oder klicke sie an." />
          <div className="mt-14"><Funnel /></div>
        </div>
      </section>

      <section id="rechner" tabIndex={-1} className="scroll-mt-24 bg-ink py-24 text-paper outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading dark eyebrow="Besucher-zu-Anfragen-Rechner" title="Was kleine Veränderungen" accent="rechnerisch bewirken." intro="Verändere Besuche und Anfragequote und sieh, wie sich die rechnerische Zahl möglicher Anfragen entwickelt. Ein Gedankenspiel – kein Versprechen." />
          <Reveal className="mt-14"><InquiryCalculator /></Reveal>
        </div>
      </section>

      <RelatedServices current="online-marketing" />
      <CtaBand title="Mehr Sichtbarkeit," accent="mit Strategie." text="Lass uns gemeinsam ansehen, wie deine Website gefunden, verstanden und angefragt wird – und wo die größten Hebel liegen." />
    </>
  )
}
