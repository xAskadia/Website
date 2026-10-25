import { motion } from 'framer-motion'
import { useState } from 'react'
import { LandingPreview } from '../../components/tools/LandingPreview'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { cn, scrollToId } from '../../lib/cn'

const useCases: { icon: IconName; title: string; text: string }[] = [
  { icon: 'target', title: 'Kampagnen', text: 'Du schaltest Anzeigen oder planst eine Social-Media-Aktion? Dann brauchen die Klicks ein Ziel, das genau zur Botschaft passt.' },
  { icon: 'layers', title: 'Einzelne Dienstleistungen', text: 'Ein Angebot, das besondere Aufmerksamkeit verdient – mit eigener Seite statt versteckt im Menü.' },
  { icon: 'spark', title: 'Produktvorstellungen', text: 'Neues Produkt, neuer Kurs, neues Event: eine Seite, die neugierig macht und alle Fragen beantwortet.' },
  { icon: 'chat', title: 'Gezielte Anfragen', text: 'Wenn du mehr Anfragen für ein bestimmtes Thema willst, führt eine Landingpage Interessierte ohne Umwege dorthin.' },
]

const anatomy = [
  { k: 'Headline', t: 'Sagt in Sekunden, worum es geht – und für wen.' },
  { k: 'Nutzen', t: 'Zeigt, was sich für Besucherinnen und Besucher verbessert.' },
  { k: 'Vertrauen', t: 'Gibt Sicherheit: wer du bist, wie du arbeitest, was dich ausmacht.' },
  { k: 'Antworten', t: 'Räumt Einwände und offene Fragen aus dem Weg.' },
  { k: 'Handlung', t: 'Ein klarer Call-to-Action. Nicht drei. Einer.' },
]

function Compare() {
  const [mode, setMode] = useState<'website' | 'landing'>('website')
  const isWeb = mode === 'website'
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <div className="inline-flex rounded-full border border-ink/10 bg-white p-1" role="group" aria-label="Vergleich wählen">
          {(['website', 'landing'] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={cn('rounded-full px-5 py-2.5 text-sm font-semibold transition', mode === m ? 'bg-ink text-paper' : 'text-muted hover:text-ink')}>
              {m === 'website' ? 'Website' : 'Landingpage'}
            </button>
          ))}
        </div>
        <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <h3 className="display-md">{isWeb ? 'Das Zuhause deiner Marke.' : 'Der direkte Weg zum Ziel.'}</h3>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {isWeb
              ? 'Eine Website stellt dein gesamtes Unternehmen vor. Mehrere Seiten, mehrere Themen, eine Navigation – Besucherinnen und Besucher entdecken in ihrem eigenen Tempo.'
              : 'Eine Landingpage konzentriert sich auf genau ein Angebot und eine Handlung. Keine Ablenkung, kein Menü voller Optionen – nur das, was zur Entscheidung führt.'}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4">
            {(isWeb
              ? [['Ziel', 'Überblick & Vertrauen'], ['Umfang', 'Mehrere Seiten'], ['Navigation', 'Vollständig'], ['Lebensdauer', 'Langfristig']]
              : [['Ziel', 'Eine Handlung'], ['Umfang', 'Eine Seite'], ['Navigation', 'Minimal'], ['Lebensdauer', 'Oft kampagnenbezogen']]
            ).map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-4">
                <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
      <div className="relative grid aspect-square place-items-center rounded-[2.5rem] bg-ink p-10" aria-hidden="true">
        <svg viewBox="0 0 300 300" className="h-full w-full">
          {isWeb ? (
            <g>
              <motion.rect initial={{ scale: 0 }} animate={{ scale: 1 }} x="115" y="30" width="70" height="50" rx="10" fill="#e4572e" />
              {[40, 115, 190].map((x, i) => (
                <g key={x}>
                  <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + i * 0.1 }} d={`M150 80 V110 H${x + 35} V135`} stroke="#f5f1ea" strokeOpacity=".35" fill="none" strokeWidth="2" />
                  <motion.rect initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.1 }} x={x} y="135" width="70" height="44" rx="8" fill="#f5f1ea" />
                  {[0, 1].map((j) => (
                    <g key={j}>
                      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 + i * 0.1 }} d={`M${x + 35} 179 V200 H${x + 15 + j * 40} V215`} stroke="#f5f1ea" strokeOpacity=".25" fill="none" strokeWidth="1.5" />
                      <motion.rect initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 + i * 0.1 }} x={x + 2 + j * 40} y="215" width="28" height="22" rx="5" fill="#a99cf0" />
                    </g>
                  ))}
                </g>
              ))}
            </g>
          ) : (
            <g>
              {[0, 1, 2, 3].map((i) => (
                <motion.rect key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} x={60 + i * 12} y={40 + i * 48} width={180 - i * 24} height="36" rx="10" fill={i === 3 ? '#e4572e' : '#f5f1ea'} fillOpacity={i === 3 ? 1 : 0.9 - i * 0.2} />
              ))}
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.8 }} d="M150 20 V250" stroke="#e4572e" strokeWidth="2" strokeDasharray="4 6" fill="none" />
              <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} cx="150" cy="262" r="12" fill="#e4572e" />
            </g>
          )}
        </svg>
      </div>
    </div>
  )
}

export default function Landingpages() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/landingpages', label: 'Landingpages' }]}
        eyebrow="Leistung 02 · Landingpages"
        title="Eine Seite. Ein Ziel."
        accent="Mehr Anfragen."
        intro="Landingpages sind fokussierte Einzelseiten, die genau eine Aufgabe haben: Menschen von einem Angebot überzeugen und zur nächsten Handlung führen."
      >
        <Button onClick={() => scrollToId('vorschau')}>Vorschau ausprobieren</Button>
        <Button to="/kontakt" variant="ghost">Landingpage anfragen</Button>
      </PageHero>

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Website oder Landingpage?" title="Zwei Werkzeuge," accent="zwei Aufgaben." />
          <div className="mt-14">
            <Compare />
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Wann sich eine Landingpage lohnt" title="Immer dann, wenn du etwas" accent="Bestimmtes erreichen willst." intro="Und deine Besucherinnen und Besucher nicht erst lange suchen sollen." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.08} className="rounded-4xl border border-ink/10 bg-white p-7">
                <Icon name={u.icon} className="h-8 w-8 text-glut" />
                <h3 className="mt-8 text-2xl">{u.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{u.text}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading eyebrow="Aufbau" title="Was eine gute Landingpage" accent="ausmacht." intro="Fünf Bausteine, sorgfältig aufeinander abgestimmt. Ich plane sie so, dass jeder Abschnitt zum nächsten führt." />
            <ol className="space-y-3">
              {anatomy.map((a, i) => (
                <Reveal as="li" key={a.k} delay={i * 0.06} className="flex items-center gap-6 rounded-3xl border border-ink/10 bg-white p-5" >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink font-display font-semibold text-paper">{i + 1}</span>
                  <span>
                    <span className="block font-display text-xl font-semibold">{a.k}</span>
                    <span className="text-muted">{a.t}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="vorschau" tabIndex={-1} className="scroll-mt-24 bg-paper-2/60 py-24 outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Interaktive Vorschau" title="Gleiche Inhalte," accent="andere Wirkung." intro="Wähle Branche, Layout und Call-to-Action – und sieh, wie sehr Gestaltung beeinflusst, was eine Seite ausstrahlt. Alle Beispiele sind fiktiv." />
          <Reveal className="mt-14">
            <LandingPreview />
          </Reveal>
        </div>
      </section>

      <RelatedServices current="landingpages" />
      <CtaBand title="Du planst eine Kampagne?" accent="Lass uns sprechen." text="Erzähl mir, was du bewerben möchtest und wen du erreichen willst. Gemeinsam entwickeln wir eine Seite, die genau darauf ausgerichtet ist." />
    </>
  )
}
