import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router'
import { HeroStage } from '../components/home/HeroStage'
import { IdeaToWebsite } from '../components/home/IdeaToWebsite'
import { DeviceFrame } from '../components/mockups/DeviceFrame'
import { MiniSite } from '../components/mockups/MiniSite'
import { ArchFrame } from '../components/story/ArchFrame'
import { Botanical } from '../components/story/Botanical'
import { HorizontalTrack } from '../components/story/HorizontalTrack'
import { RotatingBadge } from '../components/story/RotatingBadge'
import { Scene, type SceneKind } from '../components/story/Scene'
import { ScrollWords } from '../components/story/ScrollWords'
import { StackCard } from '../components/story/StackCard'
import { VelocityMarquee } from '../components/story/VelocityMarquee'
import { Wave } from '../components/story/Wave'
import { Accordion } from '../components/ui/Accordion'
import { Arrow, Button } from '../components/ui/Button'
import { CtaBand } from '../components/ui/CtaBand'
import { Icon, type IconName } from '../components/ui/Icon'
import { Portrait } from '../components/ui/Portrait'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { faqs } from '../content/faq'
import { projects } from '../content/projects'
import { services } from '../content/services'
import { cn } from '../lib/cn'
import { useScrollProgress } from '../lib/motion'

function Manifest() {
  return (
    <section className="relative overflow-hidden bg-moss pb-10 pt-24 text-paper sm:pt-32">
      <Botanical kind="olive" mode="scroll" className="pointer-events-none absolute -right-20 top-20 w-[70%] max-w-3xl text-paper/20" />
      <div className="container-x relative">
        <p className="eyebrow text-white/50">Worum es mir geht</p>
        <ScrollWords
          className="mt-10 max-w-5xl font-display text-[clamp(1.9rem,4.2vw,4rem)] leading-[1.12] tracking-[-0.015em]"
          text="Ich glaube daran, dass jede gute Website mit einer *Geschichte* beginnt – mit deiner. Ich höre zu, ordne, gestalte und sorge dafür, dass Menschen dich *finden,* *verstehen* und dir *vertrauen.*"
        />
        <Reveal className="mt-14 flex items-center gap-5">
          <span className="script text-5xl text-sand">Adelina Rrustolli</span>
          <span className="h-px w-16 bg-paper/30" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">Webdesignerin</span>
        </Reveal>
      </div>
      <Wave color="var(--color-paper)" className="mt-24" />
    </section>
  )
}

const audiences: { tag: string; title: string; text: string; to: string; cta: string; scene: SceneKind }[] = [
  { tag: 'Noch keine Website', title: 'Du startest digital bei null?', text: 'Dann bauen wir deinen Auftritt von Grund auf – mit klarer Struktur, passenden Texten und einem Design, das zu dir passt.', to: '/leistungen/webdesign', cta: 'Website erstellen lassen', scene: 'meadow' },
  { tag: 'Veraltete Website', title: 'Deine Website ist in die Jahre gekommen?', text: 'Unübersichtlich, langsam oder am Handy kaum lesbar? Ein Relaunch macht aus ihr wieder ein Aushängeschild.', to: '/leistungen/relaunch', cta: 'Relaunch ansehen', scene: 'hills' },
  { tag: 'Professioneller werden', title: 'Du willst online mehr erreichen?', text: 'Mit Strategie, klarer Kommunikation und einem stimmigen Markenauftritt wird deine Website zum Werkzeug für neue Kunden.', to: '/leistungen/online-marketing', cta: 'Sichtbarkeit verbessern', scene: 'sea' },
]

function Audiences() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const shift = [useTransform(scrollYProgress, [0, 1], [60, -60]), useTransform(scrollYProgress, [0, 1], [140, -40]), useTransform(scrollYProgress, [0, 1], [30, -90])]
  return (
    <section ref={ref} className="relative bg-paper pb-28 pt-10 sm:pb-40">
      <div className="container-x">
        <SectionHeading eyebrow="Kapitel III · Für wen ich arbeite" kicker="Egal, wo du stehst" title="Wir finden" accent="deinen Weg." />
        <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8">
          {audiences.map((a, i) => (
            <motion.div key={a.tag} style={{ y: shift[i] }}>
              <Link to={a.to} className="group block" data-cursor="Ansehen">
                <ArchFrame className="aspect-[3/4]" delay={i * 0.15}>
                  <div className="h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105">
                    <Scene kind={a.scene} />
                  </div>
                </ArchFrame>
                <p className="mt-8 text-[0.66rem] font-medium uppercase tracking-[0.3em] text-glut">{a.tag}</p>
                <h3 className="mt-3 text-3xl">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{a.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors group-hover:border-glut group-hover:text-glut">
                  {a.cta} <Arrow className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const cardStyles = [
  { bg: 'bg-paper-2', fg: 'text-ink', sub: 'text-muted', scene: 'studio' as SceneKind },
  { bg: 'bg-moss', fg: 'text-paper', sub: 'text-white/65', scene: 'sea' as SceneKind },
  { bg: 'bg-sand', fg: 'text-ink', sub: 'text-ink/65', scene: 'dune' as SceneKind },
  { bg: 'bg-iris-soft', fg: 'text-ink', sub: 'text-ink/65', scene: 'meadow' as SceneKind },
  { bg: 'bg-ink', fg: 'text-paper', sub: 'text-white/60', scene: 'forest' as SceneKind },
  { bg: 'bg-glut-soft', fg: 'text-ink', sub: 'text-ink/65', scene: 'hills' as SceneKind },
]

function ServiceStack() {
  return (
    <section className="relative bg-paper pb-24">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 pb-14 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Kapitel IV · Leistungen" kicker="Alles aus einer Hand" title="Was dein Auftritt" accent="braucht." intro="Sechs Leistungen, ein Ziel: dass dein Unternehmen online so überzeugt wie im persönlichen Gespräch." />
          <Reveal>
            <Button to="/leistungen" variant="ghost">Alle Leistungen</Button>
          </Reveal>
        </div>
        <div className="relative">
          {services.map((s, i) => {
            const st = cardStyles[i]
            return (
              <StackCard key={s.slug} index={i} total={services.length}>
                <Link to={s.path} data-cursor="Entdecken" className={cn('group grid h-[72svh] min-h-[480px] overflow-hidden rounded-[2rem] shadow-[0_-20px_60px_-30px_rgba(34,42,33,0.35)] md:grid-cols-[1.15fr_0.85fr]', st.bg, st.fg)}>
                  <div className="flex flex-col p-7 sm:p-12">
                    <div className="flex items-center gap-5">
                      <span className="font-display text-6xl leading-none opacity-80 sm:text-7xl">{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</span>
                      <span className="h-px flex-1 bg-current opacity-20" />
                      {s.featured && <span className="rounded-full border border-current/30 px-3 py-1 text-[0.62rem] uppercase tracking-[0.25em]">Schwerpunkt</span>}
                    </div>
                    <h3 className="display-md mt-8">{s.title}</h3>
                    <p className={cn('mt-5 max-w-md text-lg leading-relaxed', st.sub)}>{s.teaser}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2 text-[0.66rem] uppercase tracking-[0.2em]">
                        <Icon name="spark" className="h-3.5 w-3.5" /> {s.tool}
                      </span>
                      <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.2em]">
                        Mehr erfahren <Arrow className="transition-transform group-hover:translate-x-1.5" />
                      </span>
                    </div>
                  </div>
                  <div className="relative hidden p-6 md:block">
                    <div className="arch h-full w-full overflow-hidden">
                      <div className="h-full w-full transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110">
                        <Scene kind={st.scene} />
                      </div>
                    </div>
                  </div>
                </Link>
              </StackCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AboutTeaser() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScrollProgress({ target: ref, offset: ['start end', 'end start'] })
  const nameX = useTransform(scrollYProgress, [0, 1], ['12%', '-18%'])
  const pillars = [
    { t: 'Design', d: 'Gestaltung, die auffällt und zu dir passt.' },
    { t: 'Strategie', d: 'Inhalte und Struktur mit Ziel.' },
    { t: 'Technik', d: 'Schnell, responsiv, barrierearm.' },
  ]
  return (
    <section ref={ref} className="relative overflow-hidden bg-paper-2 py-28 sm:py-40">
      <motion.p style={{ x: nameX }} className="pointer-events-none absolute top-16 whitespace-nowrap font-display text-[22vw] uppercase leading-none tracking-[-0.03em] text-ink/[0.05]" aria-hidden="true">
        Adelina Rrustolli
      </motion.p>
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <ArchFrame className="aspect-[4/5.2]">
            <Portrait />
          </ArchFrame>
          <Botanical kind="flower" className="absolute -bottom-10 -right-10 h-56 text-moss/60" fill />
        </div>
        <div>
          <p className="eyebrow text-muted">Kapitel V · Über mich</p>
          <p className="script mt-6 text-6xl text-glut">Hallo, ich bin</p>
          <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.9] tracking-[-0.01em]">Adelina</h2>
          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.4em] text-muted">Webdesign · Grafikdesign · Kommunikation</p>
          <Reveal className="lead mt-8 max-w-xl text-ink/75">
            Keine anonyme Agentur, sondern eine Ansprechpartnerin, die mitdenkt. Ich verbinde kreatives Design mit strategischem Denken und einer strukturierten Arbeitsweise – damit deine Website nicht nur gut aussieht, sondern ihre Aufgabe erfüllt.
          </Reveal>
          <div className="mt-10 grid grid-cols-3 divide-x divide-ink/15 border-y border-ink/15">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1} className="px-4 py-6 first:pl-0">
                <p className="font-display text-2xl italic">{p.t}</p>
                <p className="mt-2 text-sm text-muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-wrap items-center gap-6">
            <Button to="/ueber-mich" variant="secondary">Mehr über mich</Button>
            <span className="script text-4xl text-ink/70">Adelina</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function WorkTrack() {
  return (
    <HorizontalTrack
      className="relative bg-ink text-paper"
      header={
        <div className="container-x flex flex-col justify-between gap-6 pt-24 md:pt-0 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-white/50">Kapitel VI · Arbeiten</p>
            <h2 className="display-lg mt-5">
              Gestaltung, die man <span className="serif-accent text-sand">erleben kann.</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/60">Aktuell zeige ich fiktive Demo-Projekte – sie sind entsprechend gekennzeichnet.</p>
          </div>
          <Button to="/portfolio" variant="outline-light">Zum Portfolio</Button>
        </div>
      }
    >
      {projects.map((p, i) => (
        <Link key={p.slug} to={`/portfolio/${p.slug}`} data-cursor="Ansehen" className="group w-[84vw] shrink-0 snap-center md:w-[44vw] lg:w-[34vw]">
          <div className={cn('relative overflow-hidden p-6 transition-transform duration-700 group-hover:-translate-y-2', i % 2 ? 'arch pt-16' : 'rounded-[1.5rem]')} style={{ background: p.theme.soft }}>
            <DeviceFrame url={`${p.slug}.de`}>
              <MiniSite theme={p.theme} name={p.name} />
            </DeviceFrame>
          </div>
          <div className="mt-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-white/45">{String(i + 1).padStart(2, '0')} · {p.industry}</p>
              <p className="mt-2 font-display text-3xl">{p.name}</p>
            </div>
            {p.isDemo && <span className="demo-badge">Demo</span>}
          </div>
        </Link>
      ))}
    </HorizontalTrack>
  )
}

const process: { t: string; d: string; icon: IconName }[] = [
  { t: 'Kennenlernen', d: 'Unternehmen, Ziele und Wünsche verstehen.', icon: 'handshake' },
  { t: 'Strategie', d: 'Zielgruppe, Inhalte und Struktur festlegen.', icon: 'compass' },
  { t: 'Design', d: 'Individuelle Gestaltung, erste Entwürfe.', icon: 'pen' },
  { t: 'Entwicklung', d: 'Technische und interaktive Umsetzung.', icon: 'code' },
  { t: 'Launch', d: 'Tests, Feinschliff, Veröffentlichung.', icon: 'rocket' },
  { t: 'Weiterentwicklung', d: 'Pflege und Verbesserungen.', icon: 'refresh' },
]

function ProcessAndFinder() {
  return (
    <section className="relative overflow-hidden bg-paper py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading center eyebrow="Kapitel VII · So arbeiten wir" kicker="Schritt für Schritt" title="In sechs Phasen" accent="zur Website." />
        <ol className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {process.map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 0.08} className="relative px-4 text-center lg:border-l lg:border-ink/15 lg:first:border-l-0">
              <p className="font-display text-2xl italic text-glut">0{i + 1}</p>
              <span className="mx-auto mt-4 grid h-16 w-16 place-items-center rounded-full border border-ink/15 text-moss transition-colors duration-500 hover:bg-moss hover:text-paper">
                <Icon name={p.icon} className="h-6 w-6" />
              </span>
              <p className="mt-5 text-[0.7rem] font-medium uppercase tracking-[0.24em]">{p.t}</p>
              <p className="mx-auto mt-2 max-w-[12rem] text-sm text-muted">{p.d}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-12 text-center">
          <Link to="/arbeitsweise" className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] hover:border-glut hover:text-glut">
            Arbeitsweise im Detail <Arrow />
          </Link>
        </Reveal>

        <Reveal className="mt-28">
          <Link to="/website-finder" data-cursor="Starten" className="group relative grid overflow-hidden rounded-[2rem] bg-iris-soft md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 p-8 sm:p-14">
              <p className="eyebrow text-ink/60">Website-Finder</p>
              <p className="script mt-6 text-5xl text-glut">Welche Website</p>
              <h2 className="display-md mt-1 max-w-md">passt zu deinem Unternehmen?</h2>
              <p className="mt-5 max-w-sm text-ink/70">Sechs kurze Fragen, eine ehrliche Empfehlung – und auf Wunsch direkt die passende Anfrage.</p>
              <span className="mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-paper transition group-hover:bg-moss">
                Finder starten <Arrow className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
            <div className="relative min-h-[260px]">
              <Scene kind="hills" />
              <RotatingBadge text="Sechs Fragen · eine Empfehlung · " className="absolute bottom-8 left-8 w-32 text-ink/80">
                <Icon name="compass" className="h-8 w-8 text-glut" />
              </RotatingBadge>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroStage />
      <Manifest />
      <IdeaToWebsite />
      <section className="bg-paper py-16" aria-hidden="true">
        <VelocityMarquee items={['Design', 'Strategie', 'Sichtbarkeit', 'Vertrauen']} outline className="text-[17vw] text-moss lg:text-[11rem]" />
      </section>
      <Audiences />
      <ServiceStack />
      <AboutTeaser />
      <WorkTrack />
      <ProcessAndFinder />

      <section className="bg-paper pb-8">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Häufige Fragen" title="Kurz" accent="beantwortet." intro={<>Noch mehr Antworten findest du unter <Link to="/wissen" className="text-glut underline underline-offset-4">Wissen & FAQ</Link>.</>} />
          <Reveal>
            <Accordion items={faqs.slice(0, 4)} />
          </Reveal>
        </div>
      </section>

      <CtaBand kicker="Lass uns" title="deine Website" accent="gestalten." />
    </>
  )
}
