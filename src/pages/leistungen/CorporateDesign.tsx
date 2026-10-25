import { motion } from 'framer-motion'
import { BrandExplorer } from '../../components/tools/BrandExplorer'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { scrollToId } from '../../lib/cn'

const offers: { icon: IconName; title: string; text: string }[] = [
  { icon: 'eye', title: 'Visuelle Markenauftritte', text: 'Ein Erscheinungsbild, das zeigt, wofür du stehst – und dich von anderen unterscheidet.' },
  { icon: 'palette', title: 'Farb- & Typografiekonzepte', text: 'Farben und Schriften mit System: abgestimmt, zugänglich und einfach anzuwenden.' },
  { icon: 'layers', title: 'Digitale Kommunikationsmittel', text: 'Präsentationen, Newsletter-Vorlagen, E-Mail-Signaturen – alles aus einem Guss.' },
  { icon: 'users', title: 'Social-Media-Grafiken', text: 'Vorlagen für Posts und Stories, die sofort als deine erkennbar sind.' },
  { icon: 'pen', title: 'Layouts & Werbematerialien', text: 'Flyer, Plakate, Anzeigen und Broschüren, die deine Botschaft klar transportieren.' },
  { icon: 'compass', title: 'Corporate-Design-Konzepte', text: 'Ein kompaktes Regelwerk, damit dein Auftritt auch langfristig einheitlich bleibt.' },
]

const touchpoints = ['Website', 'Visitenkarte', 'Instagram', 'Flyer', 'Präsentation', 'E-Mail', 'Schaufenster', 'Rechnung']

export default function CorporateDesign() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/corporate-design', label: 'Grafik- & Corporate Design' }]}
        eyebrow="Leistung 04 · Grafikdesign & Corporate Design"
        title="Eine starke Marke ist mehr als"
        accent="eine schöne Website."
        intro="Deine Kundinnen und Kunden begegnen dir an vielen Orten – online und offline. Ich sorge dafür, dass du überall erkennbar bist und überall gleich überzeugend wirkst."
        aside={
          <div className="relative mx-auto aspect-square max-w-sm" aria-hidden="true">
            {touchpoints.map((t, i) => {
              const a = (i / touchpoints.length) * Math.PI * 2
              return (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, type: 'spring' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium shadow-sm"
                  style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%` }}
                >
                  {t}
                </motion.span>
              )
            })}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120 }} className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-glut font-display text-xl font-semibold text-white shadow-[0_20px_60px_-15px_rgba(228,87,46,0.7)]">
              Deine Marke
            </motion.div>
            <svg viewBox="0 0 100 100" className="absolute inset-0 -z-10 h-full w-full">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#16131d" strokeOpacity=".12" strokeDasharray="1.5 2" />
              <circle cx="50" cy="50" r="24" fill="none" stroke="#e4572e" strokeOpacity=".25" />
            </svg>
          </div>
        }
      >
        <Button onClick={() => scrollToId('explorer')}>Brand-Style-Explorer</Button>
        <Button to="/kontakt" variant="ghost">Design anfragen</Button>
      </PageHero>

      <section className="bg-paper-2/60 py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Was ich gestalte" title="Gestaltung mit" accent="System." intro="Mein Hintergrund in Grafikdesign und Unternehmenskommunikation bedeutet: Ich denke Gestaltung nicht nur schön, sondern auch nachvollziehbar und alltagstauglich." />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 0.07} className="group rounded-4xl bg-white p-7 transition-all duration-500 hover:bg-ink hover:text-paper">
                <Icon name={o.icon} className="h-8 w-8 text-glut" />
                <h3 className="mt-8 text-2xl">{o.title}</h3>
                <p className="mt-3 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/65">{o.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="explorer" tabIndex={-1} className="scroll-mt-24 bg-white py-24 outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Brand-Style-Explorer" title="Spiel mit deiner" accent="Markenwirkung." intro="Gib einen Namen ein, kombiniere Farben, Schriften und Designrichtungen – und sieh live, wie sich der Charakter einer Marke verändert." />
          <Reveal className="mt-14">
            <BrandExplorer />
          </Reveal>
          <p className="mt-6 text-sm text-muted">Der Explorer zeigt Möglichkeiten – ein echtes Corporate Design entsteht natürlich aus deiner Geschichte, deinen Zielen und deiner Zielgruppe.</p>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {[
            ['Wiedererkennbar', 'Wer dich einmal gesehen hat, erkennt dich wieder – auf Instagram, im Briefkasten, auf deiner Website.'],
            ['Professionell', 'Ein durchdachter Auftritt signalisiert Sorgfalt. Das überträgt sich auf das Vertrauen in deine Arbeit.'],
            ['Effizient', 'Mit klaren Regeln und Vorlagen gestaltest du neue Materialien schneller – und trotzdem einheitlich.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <p className="font-display text-sm font-semibold text-glut">0{i + 1}</p>
              <h3 className="mt-3 text-3xl">{t}</h3>
              <p className="mt-3 leading-relaxed text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <RelatedServices current="corporate-design" />
      <CtaBand title="Deine Marke verdient" accent="einen starken Auftritt." text="Ob neues Erscheinungsbild oder Auffrischung des bestehenden: Lass uns herausfinden, was deine Marke ausmacht." />
    </>
  )
}
