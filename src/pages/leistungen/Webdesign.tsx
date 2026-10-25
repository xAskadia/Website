import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { DeviceFrame } from '../../components/mockups/DeviceFrame'
import { MiniSite } from '../../components/mockups/MiniSite'
import { Configurator } from '../../components/tools/Configurator'
import { StoryStatement } from '../../components/story/StoryStatement'
import { Button } from '../../components/ui/Button'
import { CtaBand } from '../../components/ui/CtaBand'
import { Icon, type IconName } from '../../components/ui/Icon'
import { PageHero } from '../../components/ui/PageHero'
import { RelatedServices } from '../../components/ui/RelatedServices'
import { Reveal } from '../../components/ui/Reveal'
import { SectionHeading } from '../../components/ui/SectionHeading'
import { projects } from '../../content/projects'
import { scrollToId } from '../../lib/cn'
import { useScrollProgress } from '../../lib/motion'

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'eye', title: 'Der erste Eindruck entsteht online.', text: 'Bevor dich jemand anruft oder besucht, schaut er nach. Deine Website ist oft der allererste Kontakt – und der entscheidet, ob es einen zweiten gibt.' },
  { icon: 'shield', title: 'Vertrauen braucht einen Ort.', text: 'Eine professionelle Website zeigt: Hier ist ein Unternehmen, das seine Arbeit ernst nimmt. Das schafft Glaubwürdigkeit, lange bevor ein Gespräch stattfindet.' },
  { icon: 'search', title: 'Du bist jederzeit auffindbar.', text: 'Auch sonntags um 23 Uhr. Wer nach deinen Leistungen sucht, findet dich – und nicht nur die Konkurrenz.' },
  { icon: 'layers', title: 'Deine Leistungen werden verständlich.', text: 'Was genau bietest du an, für wen und warum? Eine gute Website beantwortet diese Fragen klar – ohne dass du sie jedes Mal neu erklären musst.' },
  { icon: 'pointer', title: 'Anfragen werden leicht gemacht.', text: 'Gute Nutzerführung bringt Besucherinnen und Besucher ohne Umwege zum Kontakt. Jeder unnötige Klick weniger zählt.' },
  { icon: 'spark', title: 'Deine Marke wächst mit.', text: 'Ein stimmiger Auftritt prägt, wie man dich wahrnimmt – heute und langfristig. Deine Website ist das Zentrum deiner digitalen Sichtbarkeit.' },
]

const phases = [
  { icon: 'compass' as IconName, title: 'Konzeption', items: ['Ziele & Zielgruppe klären', 'Seitenstruktur & Navigation', 'Inhaltsplanung & Texte', 'Wireframes'] },
  { icon: 'pen' as IconName, title: 'Design', items: ['Individuelles Layout', 'Farb- & Typografiekonzept', 'Mobile & Desktop', 'Interaktive Details'] },
  { icon: 'code' as IconName, title: 'Technische Umsetzung', items: ['Sauberer, schneller Code', 'Responsives Verhalten', 'Barrierearme Bedienung', 'SEO-Grundlagen'] },
  { icon: 'rocket' as IconName, title: 'Veröffentlichung', items: ['Tests auf vielen Geräten', 'Domain & Hosting einrichten', 'Livegang', 'Übergabe & Einweisung'] },
]

const included = ['Responsives Design für alle Geräte', 'Schnelle Ladezeiten', 'Barrierearme Bedienbarkeit', 'Suchmaschinenfreundliche Struktur', 'Datenschutzfreundliche Technik', 'Persönliche Ansprechpartnerin']

function HeroMock() {
  const p = projects[0]
  return (
    <div className="relative">
      <DeviceFrame url="kornfeld-backstube.de">
        <MiniSite theme={p.theme} name={p.name} />
      </DeviceFrame>
      <div className="absolute -bottom-8 -left-4 w-[24%] sm:-left-8">
        <DeviceFrame device="mobile">
          <MiniSite theme={p.theme} name={p.name} device="mobile" showSections={false} />
        </DeviceFrame>
      </div>
      <span className="demo-badge absolute -top-3 right-4">Demo-Projekt</span>
    </div>
  )
}

export default function Webdesign() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const lineH = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  return (
    <>
      <PageHero
        crumbs={[{ to: '/leistungen', label: 'Leistungen' }, { to: '/leistungen/webdesign', label: 'Webdesign' }]}
        eyebrow="Leistung 01 · Mein Schwerpunkt" kicker="Websites mit Seele"
        title="Websites, die für dein Unternehmen"
        accent="arbeiten."
        intro="Ich konzipiere, gestalte und entwickle Websites, die zeigen, wer du bist, was du kannst – und die es deinen Kundinnen und Kunden leicht machen, dich zu kontaktieren."
        aside={<HeroMock />}
      >
        <Button onClick={() => scrollToId('konfigurator')}>Website konfigurieren</Button>
        <Button to="/kontakt" variant="ghost">Direkt anfragen</Button>
      </PageHero>

      <StoryStatement text="Deine Website ist oft der *erste* Eindruck, den Menschen von dir bekommen – und manchmal der *einzige.* Lass ihn uns so gestalten, dass er *bleibt.*" />

      {/* Warum */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Warum eine professionelle Website" title="Deine Website ist dein" accent="bester Vertriebsmitarbeiter." intro="Sie ist rund um die Uhr erreichbar, erklärt geduldig und hinterlässt Eindruck. Vorausgesetzt, sie ist gut gemacht." />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.08} className="group rounded-4xl border border-ink/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-glut/40 hover:shadow-[0_30px_60px_-35px_rgba(154,116,67,0.5)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper-2 text-ink transition-colors duration-500 group-hover:bg-glut group-hover:text-white">
                  <Icon name={r.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungsumfang */}
      <section className="bg-ink py-24 text-paper sm:py-32">
        <div className="container-x">
          <SectionHeading dark eyebrow="Was ich für dich übernehme" title="Von der ersten Idee bis zur" accent="Veröffentlichung." intro="Du bekommst alles aus einer Hand. Keine Abstimmung zwischen fünf Dienstleistern, sondern eine Ansprechpartnerin, die das große Ganze im Blick hat." />
          <div ref={ref} className="relative mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-white/10 lg:block" aria-hidden="true">
              <motion.div className="h-full bg-glut" style={{ width: lineH }} />
            </div>
            {phases.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="relative">
                <span className="relative z-10 grid h-[4.3rem] w-[4.3rem] place-items-center rounded-full border border-white/15 bg-ink-2 text-glut">
                  <Icon name={p.icon} className="h-7 w-7" />
                </span>
                <p className="mt-6 font-display text-sm text-white/40">Phase {i + 1}</p>
                <h3 className="mt-1 text-3xl">{p.title}</h3>
                <ul className="mt-5 space-y-2.5 text-white/70">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-glut" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20 flex flex-wrap gap-2.5">
            {included.map((t) => (
              <span key={t} className="chip border-white/15 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-glut" /> {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Konfigurator */}
      <section id="konfigurator" tabIndex={-1} className="outline-none scroll-mt-24 bg-paper py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Website-Konfigurator" title="Stell dir deine Website" accent="selbst zusammen." intro="In sieben kurzen Schritten zu deiner Projektskizze. Am Ende kannst du die Zusammenfassung direkt in deine unverbindliche Anfrage übernehmen." />
          <Reveal className="mt-14">
            <Configurator />
          </Reveal>
        </div>
      </section>

      <RelatedServices current="webdesign" />
      <CtaBand title="Lass uns deine" accent="Website gestalten." text="Du hast schon eine Vorstellung – oder noch gar keine? Beides ist ein guter Anfang. Erzähl mir von deinem Unternehmen." />
    </>
  )
}
