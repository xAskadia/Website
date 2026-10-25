import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { DeviceFrame } from '../../components/mockups/DeviceFrame'
import { MiniSite } from '../../components/mockups/MiniSite'
import { OldSite } from '../../components/mockups/OldSite'
import { BeforeAfter } from '../../components/ui/BeforeAfter'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projectBySlug } from '../../content/projects'
import { cn, scrollToId } from '../../lib/cn'

const problems: { icon: IconName; title: string; text: string; fix: string }[] = [
  { icon: 'eye', title: 'Überholtes Design', text: 'Wirkt die Website älter als dein Unternehmen, überträgt sich dieser Eindruck schnell auf deine Leistungen.', fix: 'Ein zeitgemäßes Design, das zu deiner heutigen Marke passt.' },
  { icon: 'phone', title: 'Schlechte mobile Darstellung', text: 'Winzige Schrift, verrutschte Bilder, Zoomen und Wischen: Viele Besucher geben auf dem Handy schnell auf.', fix: 'Mobile-first gestaltet und auf echten Geräten getestet.' },
  { icon: 'map', title: 'Unübersichtliche Navigation', text: 'Zu viele Menüpunkte, unklare Begriffe, Inhalte an unerwarteten Stellen – wer suchen muss, geht.', fix: 'Eine klare Struktur mit verständlichen Bezeichnungen.' },
  { icon: 'chat', title: 'Unklare Botschaften', text: 'Was genau bietest du an? Wenn das nicht in wenigen Sekunden klar wird, bleibt die Anfrage aus.', fix: 'Klare Texte, die deinen Nutzen auf den Punkt bringen.' },
  { icon: 'bolt', title: 'Langsame Ladezeiten', text: 'Jede Sekunde Wartezeit kostet Geduld. Große Bilder und veraltete Technik bremsen unnötig.', fix: 'Optimierte Bilder, schlanker Code, schnelles Hosting.' },
  { icon: 'handshake', title: 'Fehlende Kontaktmöglichkeiten', text: 'Kontakt nur im Impressum versteckt? Dann entgehen dir Anfragen von Menschen, die eigentlich interessiert sind.', fix: 'Sichtbare, einfache Kontaktwege auf jeder Seite.' },
]

function SelfCheck() {
  const [checked, setChecked] = useState<number[]>([])
  const toggle = (i: number) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
  const n = checked.length
  const level = n === 0 ? null : n <= 2 ? { t: 'Feinschliff', d: 'Deine Website hat eine gute Basis. Gezielte Optimierungen können schon viel bewirken.', c: 'bg-sand' } : n <= 4 ? { t: 'Optimierung lohnt sich', d: 'Mehrere Punkte bremsen deine Website aus. Eine Überarbeitung von Struktur und Design ist sinnvoll.', c: 'bg-glut-soft' } : { t: 'Zeit für einen Relaunch', d: 'Viele Grundlagen passen nicht mehr. Ein Neuanfang ist meist effizienter als Flickwerk.', c: 'bg-glut text-white' }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <ul className="grid gap-3 sm:grid-cols-2">
        {problems.map((p, i) => {
          const on = checked.includes(i)
          return (
            <li key={p.title}>
              <button type="button" role="checkbox" aria-checked={on} onClick={() => toggle(i)} className={cn('group relative flex h-full w-full flex-col overflow-hidden rounded-4xl border p-6 text-left transition-all duration-300', on ? 'border-glut bg-white shadow-[0_20px_50px_-30px_rgba(228,87,46,0.6)]' : 'border-ink/10 bg-white hover:border-ink/30')}>
                <span className="flex items-center justify-between">
                  <Icon name={p.icon} className={cn('h-7 w-7 transition-colors', on ? 'text-glut' : 'text-ink/50')} />
                  <span className={cn('grid h-7 w-7 place-items-center rounded-lg border-2 transition', on ? 'border-glut bg-glut text-white' : 'border-ink/20')}>{on && <Icon name="check" className="h-4 w-4" />}</span>
                </span>
                <span className="mt-5 font-display text-xl font-semibold">{p.title}</span>
                <span className="mt-2 text-sm leading-relaxed text-muted">{p.text}</span>
                <AnimatePresence>
                  {on && (
                    <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                      <span className="mt-4 flex gap-2 rounded-2xl bg-paper p-3 text-sm font-medium">
                        <span className="text-glut">→</span> {p.fix}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          )
        })}
      </ul>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-4xl bg-ink p-7 text-paper">
          <p className="eyebrow text-white/50">Dein Schnell-Check</p>
          <p className="mt-6 font-display text-7xl font-semibold tabular-nums">
            {n}
            <span className="text-3xl text-white/40">/6</span>
          </p>
          <p className="mt-1 text-sm text-white/60">Punkte treffen auf deine Website zu</p>
          <div className="mt-6 flex gap-1.5" aria-hidden="true">
            {problems.map((_, i) => (
              <motion.span key={i} className="h-2 flex-1 rounded-full" animate={{ backgroundColor: i < n ? '#e4572e' : 'rgba(255,255,255,0.12)' }} />
            ))}
          </div>
          <div aria-live="polite" className="mt-6 min-h-[7.5rem]">
            {level ? (
              <motion.div key={level.t} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <span className={cn('inline-block rounded-full px-3 py-1 text-sm font-semibold text-ink', level.c)}>{level.t}</span>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{level.d}</p>
              </motion.div>
            ) : (
              <p className="text-sm leading-relaxed text-white/60">Wähle links aus, was auf deine aktuelle Website zutrifft.</p>
            )}
          </div>
          <p className="mt-4 text-xs text-white/40">Eine erste Orientierung – keine fachliche Analyse.</p>
          <Button to="/kontakt" className="mt-6 w-full">Website prüfen lassen</Button>
        </div>
      </div>
    </div>
  )
}

const relaunchSteps = [
  { t: 'Analyse', d: 'Was funktioniert, was nicht? Ich schaue mir Inhalte, Struktur, Technik und Nutzerführung genau an.' },
  { t: 'Neue Struktur', d: 'Inhalte werden sortiert, verdichtet und so angeordnet, dass Besucher finden, was sie suchen.' },
  { t: 'Neues Design', d: 'Ein frischer Auftritt, der deine Marke von heute zeigt – nicht die von vor zehn Jahren.' },
  { t: 'Saubere Technik', d: 'Schnell, sicher, mobil optimiert und barrierearm umgesetzt.' },
  { t: 'Sanfter Umzug', d: 'Weiterleitungen von alten Adressen sorgen dafür, dass Besucher und Suchmaschinen den Weg finden.' },
]

export default function Relaunch() {
  const werkhaus = projectBySlug('werkhaus-tischlerei')!
  return (
    <>
      <PageHero
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/relaunch', label: 'Relaunch & Optimierung' }]}
        eyebrow="Leistung 03 · Relaunch & Optimierung"
        title="Aus alt wird"
        accent="überzeugend."
        intro="Deine Website ist in die Jahre gekommen? Dann verschenkt sie vermutlich Potenzial. Ich analysiere, was sie ausbremst, und mache aus ihr wieder ein Aushängeschild."
      >
        <Button onClick={() => scrollToId('vergleich')}>Vorher-Nachher ansehen</Button>
        <Button to="/kontakt" variant="ghost">Relaunch anfragen</Button>
      </PageHero>

      <section id="vergleich" tabIndex={-1} className="scroll-mt-24 bg-ink py-24 text-paper outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading dark eyebrow="Vorher · Nachher" title="Zieh den Regler –" accent="und sieh den Unterschied." intro="Ein fiktives Beispiel: dieselbe Tischlerei, einmal mit einer Website von gestern, einmal mit einem modernen Auftritt." />
          <Reveal className="mt-14">
            <div className="overflow-hidden rounded-[14px] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-ink-2 px-3 py-2" aria-hidden="true">
                {['#ff5f57', '#febc2e', '#28c840'].map((c) => <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
                <span className="mx-auto rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/50">werkhaus-tischlerei.de</span>
              </div>
              <BeforeAfter
                className="aspect-[16/11] sm:aspect-[16/9.5]"
                initial={55}
                before={<OldSite />}
                after={<div className="h-full" style={{ containerType: 'inline-size' }}><MiniSite theme={werkhaus.theme} name={werkhaus.name} /></div>}
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/50">Fiktives Demo-Beispiel · Ziehen, klicken oder mit den Pfeiltasten bedienen</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Warum veraltete Websites Kunden kosten" title="Sechs Warnsignale." accent="Wie viele kennst du?" intro="Klick an, was auf deine aktuelle Website zutrifft – und sieh, wie ich das Problem lösen würde." />
          <div className="mt-14">
            <SelfCheck />
          </div>
        </div>
      </section>

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="So läuft ein Relaunch" title="Mehr als ein" accent="neuer Anstrich." intro="Ein guter Relaunch bewahrt, was funktioniert, und ersetzt, was bremst. Damit nichts verloren geht, gehe ich strukturiert vor." />
          <ol className="relative space-y-4 border-l border-ink/15 pl-8">
            {relaunchSteps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.06} className="relative">
                <span className="absolute -left-[2.6rem] top-1 grid h-5 w-5 place-items-center rounded-full border-4 border-paper bg-glut" aria-hidden="true" />
                <h3 className="text-2xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="display-md max-w-3xl">Auch ohne kompletten Relaunch lässt sich oft viel verbessern – <span className="serif-accent text-glut">gezielt und Schritt für Schritt.</span></p>
          </Reveal>
          <Reveal>
            <DeviceFrame device="mobile" className="mx-auto w-40">
              <MiniSite theme={werkhaus.theme} name={werkhaus.name} device="mobile" showSections={false} />
            </DeviceFrame>
          </Reveal>
        </div>
      </section>

      <RelatedServices current="relaunch" />
      <CtaBand title="Zeit für einen" accent="frischen Auftritt?" text="Schick mir den Link zu deiner aktuellen Website. Ich schaue sie mir an und sage dir ehrlich, wo das größte Potenzial liegt." primary={{ label: 'Website einschätzen lassen', to: '/kontakt' }} />
    </>
  )
}
