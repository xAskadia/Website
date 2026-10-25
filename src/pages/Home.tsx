import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import { HeroStage } from '../components/home/HeroStage'
import { IdeaToWebsite } from '../components/home/IdeaToWebsite'
import { DeviceFrame } from '../components/mockups/DeviceFrame'
import { MiniSite } from '../components/mockups/MiniSite'
import { Accordion } from '../components/ui/Accordion'
import { Arrow, Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { Portrait } from '../components/ui/Portrait'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { faqs } from '../content/faq'
import { projects } from '../content/projects'
import { services } from '../content/services'

const disciplines = ['Webdesign', 'Landingpages', 'Relaunch', 'Corporate Design', 'Online-Marketing', 'Unternehmenskommunikation', 'Projektmanagement']

function Marquee() {
  const row = [...disciplines, ...disciplines]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-6 text-paper" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((d, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium tracking-tight sm:text-3xl">
            {d}
            <span className="h-2 w-2 rounded-full bg-glut" />
          </span>
        ))}
      </div>
    </div>
  )
}

const audiences = [
  {
    tag: 'Noch keine Website',
    title: 'Du startest digital bei null?',
    text: 'Dann bauen wir deinen Auftritt von Grund auf – mit klarer Struktur, passenden Texten und einem Design, das zu dir passt.',
    to: '/leistungen/webdesign',
    cta: 'Website erstellen lassen',
  },
  {
    tag: 'Veraltete Website',
    title: 'Deine Website ist in die Jahre gekommen?',
    text: 'Unübersichtlich, langsam oder am Handy kaum lesbar? Ein Relaunch macht aus ihr wieder ein Aushängeschild.',
    to: '/leistungen/relaunch',
    cta: 'Relaunch ansehen',
  },
  {
    tag: 'Professioneller werden',
    title: 'Du willst online mehr erreichen?',
    text: 'Mit Strategie, klarer Kommunikation und einem stimmigen Markenauftritt wird deine Website zum Kundengewinnungs-Werkzeug.',
    to: '/leistungen/online-marketing',
    cta: 'Sichtbarkeit verbessern',
  },
]

function ServiceList() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Leistungen" title="Alles, was dein Auftritt" accent="braucht." intro="Sechs Leistungen, ein Ziel: dass dein Unternehmen online so überzeugt wie im persönlichen Gespräch." />
          <Reveal>
            <Button to="/leistungen" variant="ghost">Alle Leistungen</Button>
          </Reveal>
        </div>
        <ul className="mt-16 border-t border-ink/10">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.04}>
              <Link to={s.path} className="group relative grid grid-cols-[3rem_1fr_auto] items-center gap-4 overflow-hidden border-b border-ink/10 py-7 sm:grid-cols-[5rem_1.3fr_1fr_auto] sm:gap-8 sm:py-9">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" aria-hidden="true" />
                <span className="relative font-display text-sm font-semibold text-glut">{s.number}</span>
                <span className="relative font-display text-2xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-paper sm:text-4xl">
                  {s.title}
                  {s.featured && <span className="ml-3 inline-block -translate-y-1 rounded-full bg-glut px-2.5 py-1 align-middle font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-white">Schwerpunkt</span>}
                </span>
                <span className="relative hidden text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/65 sm:block">{s.teaser}</span>
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-glut group-hover:bg-glut group-hover:text-white">
                  <Arrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function AboutTeaser() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const pillars = [
    { t: 'Design', d: 'Gestaltung, die auffällt und zu dir passt.' },
    { t: 'Strategie', d: 'Inhalte und Struktur mit Ziel.' },
    { t: 'Technik', d: 'Schnell, responsiv, barrierearm.' },
  ]
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper-2 py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-md">
          <motion.div style={{ y }} className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-tl-[10rem]">
            <Portrait />
          </motion.div>
          <div className="absolute -bottom-6 -right-4 rounded-3xl bg-ink px-6 py-5 text-paper shadow-2xl sm:-right-10">
            <p className="font-serif text-3xl italic leading-none">Hallo, ich bin Adelina.</p>
            <p className="mt-2 text-sm text-white/60">Deine Ansprechpartnerin – von Anfang bis Ende.</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading
            eyebrow="Über mich"
            title="Keine anonyme Agentur. Eine Ansprechpartnerin, die"
            accent="mitdenkt."
            intro="Ich verbinde kreatives Design mit strategischem Denken und einer strukturierten, projektorientierten Arbeitsweise. Mein Hintergrund in Grafikdesign, Unternehmenskommunikation und Online-Marketing sorgt dafür, dass deine Website nicht nur gut aussieht – sondern ihre Aufgabe erfüllt."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.08} className="card p-5">
                <p className="font-display text-xl font-semibold">{p.t}</p>
                <p className="mt-2 text-sm text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Button to="/ueber-mich" variant="secondary">Mehr über mich</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function WorkTeaser() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-22%'])
  const items = projects.slice(0, 4)
  return (
    <section ref={ref} className="overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div className="container-x flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading dark eyebrow="Arbeiten" title="Gestaltung, die man" accent="erleben kann." intro="Ein Einblick in Konzepte und Designs. Aktuell zeige ich hier fiktive Demo-Projekte – sie sind entsprechend gekennzeichnet." />
        <Reveal>
          <Button to="/portfolio" variant="outline-light">Zum Portfolio</Button>
        </Reveal>
      </div>
      <motion.div style={{ x }} className="mt-16 flex gap-6 pl-5 sm:pl-12">
        {items.map((p) => (
          <Link key={p.slug} to={`/portfolio/${p.slug}`} className="group w-[82vw] shrink-0 sm:w-[46vw] lg:w-[36vw]">
            <div className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 group-hover:rotate-[-0.6deg]">
              <DeviceFrame dark url={`${p.slug}.de`}>
                <MiniSite theme={p.theme} name={p.name} />
              </DeviceFrame>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight">{p.name}</p>
                <p className="mt-1 text-sm text-white/55">{p.industry}</p>
              </div>
              {p.isDemo && <span className="demo-badge">Demo</span>}
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroStage />
      <Marquee />
      <IdeaToWebsite />

      <section className="bg-paper pb-24 pt-10 sm:pb-32">
        <div className="container-x">
          <SectionHeading eyebrow="Für wen ich arbeite" title="Egal, wo du gerade stehst –" accent="wir finden den Weg." />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.tag} delay={i * 0.1}>
                <Link to={a.to} className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(22,19,29,0.35)]">
                  <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-glut/10 transition-transform duration-700 group-hover:scale-[3]" aria-hidden="true" />
                  <span className="relative w-fit rounded-full bg-paper-2 px-3 py-1 text-xs font-semibold">{a.tag}</span>
                  <h3 className="relative mt-8 text-3xl">{a.title}</h3>
                  <p className="relative mt-4 flex-1 leading-relaxed text-muted">{a.text}</p>
                  <span className="relative mt-8 inline-flex items-center gap-2 font-semibold text-glut">
                    {a.cta} <Arrow className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServiceList />
      <AboutTeaser />
      <WorkTeaser />

      {/* Finder + Prozess */}
      <section className="bg-paper py-24 sm:py-32">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Link to="/website-finder" className="group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-iris-soft p-8 sm:p-12">
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-iris transition-transform duration-700 group-hover:scale-125" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow text-ink/60">Website-Finder</p>
                <h2 className="display-md mt-5 max-w-md">Welche Website passt zu deinem Unternehmen?</h2>
                <p className="mt-5 max-w-sm text-ink/70">Sechs kurze Fragen, eine ehrliche Empfehlung – und auf Wunsch direkt die passende Anfrage.</p>
              </div>
              <span className="relative mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper">
                Finder starten <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/arbeitsweise" className="group flex h-full flex-col justify-between rounded-[2.5rem] border border-ink/10 bg-white p-8 sm:p-12">
              <div>
                <p className="eyebrow text-muted">Arbeitsweise</p>
                <h2 className="display-md mt-5">In sechs Schritten zur Website.</h2>
              </div>
              <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {['Kennenlernen', 'Strategie', 'Design', 'Entwicklung', 'Testing & Launch', 'Weiterentwicklung'].map((s, i) => (
                  <li key={s} className="border-t border-ink/10 pt-3">
                    <span className="font-display text-sm font-semibold text-glut">0{i + 1}</span>
                    <p className="mt-1 font-medium">{s}</p>
                  </li>
                ))}
              </ol>
              <span className="mt-10 inline-flex items-center gap-2 font-semibold text-glut">
                Prozess entdecken <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper pb-8">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Häufige Fragen" title="Kurz" accent="beantwortet." intro={<>Noch mehr Antworten findest du unter <Link to="/wissen" className="text-glut underline underline-offset-4">Wissen & FAQ</Link>.</>} />
          <Reveal>
            <Accordion items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <CtaBand title="Lass uns deine" accent="Website gestalten." />
    </>
  )
}
