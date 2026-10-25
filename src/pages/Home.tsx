import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SectionDots } from '../components/layout/SectionDots'
import { AboutSection } from '../components/sections/AboutSection'
import { ContactSection } from '../components/sections/ContactSection'
import { FaqSection } from '../components/sections/FaqSection'
import { FinderSection } from '../components/sections/FinderSection'
import { Hero } from '../components/sections/Hero'
import { IdeaToWebsite } from '../components/sections/IdeaToWebsite'
import { ProcessSteps } from '../components/sections/ProcessSteps'
import { Reasons } from '../components/sections/Reasons'
import { WebsiteTypes } from '../components/sections/WebsiteTypes'
import { Work } from '../components/sections/Work'
import { ScrollWords } from '../components/story/ScrollWords'
import { Configurator } from '../components/tools/Configurator'
import { CtaBand } from '../components/ui/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { sections, type SectionId } from '../content/sections'
import { scrollToId } from '../lib/cn'

export default function Home() {
  const location = useLocation()

  // Sprungmarke aus Link (/#kontakt) oder von einer Unterseite anspringen
  useEffect(() => {
    const target = (location.state as { scrollTo?: SectionId } | null)?.scrollTo ?? (location.hash.slice(1) as SectionId)
    if (target && sections.some((s) => s.id === target)) {
      const t = window.setTimeout(() => scrollToId(target), 350)
      return () => window.clearTimeout(t)
    }
  }, [location])

  return (
    <>
      <SectionDots />
      <Hero />

      <section id="leistungen" tabIndex={-1} className="scroll-mt-20 bg-white py-24 outline-none sm:py-32">
        <div className="container-x">
          <WebsiteTypes />
          <Reasons />
        </div>
      </section>

      <section className="bg-white pb-16" aria-label="Leitgedanke">
        <div className="container-x">
          <ScrollWords
            className="max-w-5xl text-[clamp(1.9rem,4vw,3.8rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            text="Deine Website ist oft der *erste* Eindruck, den Menschen von dir bekommen – und manchmal der *einzige.* Lass ihn uns so gestalten, dass er *bleibt.*"
          />
        </div>
      </section>

      <div id="ablauf" tabIndex={-1} className="scroll-mt-20 outline-none">
        <IdeaToWebsite />
        <section className="bg-white pb-24 pt-8 sm:pb-32">
          <div className="container-x">
            <ProcessSteps />
          </div>
        </section>
      </div>

      <section id="konfigurator" tabIndex={-1} className="scroll-mt-20 bg-paper-2 py-24 outline-none sm:py-32">
        <div className="container-x">
          <SectionHeading center eyebrow="Website-Konfigurator" title="Stell dir deine Website" accent="selbst zusammen." intro="In sieben kurzen Schritten zu deiner Projektskizze. Am Ende kannst du die Zusammenfassung direkt in deine unverbindliche Anfrage übernehmen." />
          <Reveal className="mt-14">
            <Configurator />
          </Reveal>
        </div>
      </section>

      <section id="arbeiten" tabIndex={-1} className="scroll-mt-20 bg-white py-24 outline-none sm:py-32">
        <div className="container-x">
          <Work />
          <div className="mt-24">
            <CtaBand />
          </div>
        </div>
      </section>

      <section id="ueber-mich" tabIndex={-1} className="scroll-mt-20 bg-paper-2 py-24 outline-none sm:py-32">
        <div className="container-x">
          <AboutSection />
        </div>
      </section>

      <section id="finder" className="scroll-mt-20 bg-white pt-24 sm:pt-32" aria-label="Website-Finder">
        <div className="container-x">
          <FinderSection />
        </div>
      </section>

      <section id="faq" tabIndex={-1} className="scroll-mt-20 bg-white py-24 outline-none sm:py-32">
        <div className="container-x">
          <FaqSection />
        </div>
      </section>

      <section id="kontakt" tabIndex={-1} className="scroll-mt-20 bg-paper-2 py-24 outline-none sm:py-32">
        <div className="container-x">
          <ContactSection />
        </div>
      </section>
    </>
  )
}
