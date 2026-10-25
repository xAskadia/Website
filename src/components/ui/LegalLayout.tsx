import type { ReactNode } from 'react'

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-paper pb-24 pt-36 sm:pt-44">
      <div className="container-x max-w-3xl">
        <h1 className="display-lg">{title}</h1>
        <div className="mt-8 rounded-3xl border border-sand bg-sand/40 p-5 text-sm leading-relaxed">
          <strong>Hinweis:</strong> Diese Seite enthält Platzhalter in [eckigen Klammern] und eine allgemeine Vorlage. Bitte vor Veröffentlichung vervollständigen und rechtlich prüfen lassen (z. B. durch eine Anwältin/einen Anwalt oder einen Generator wie den der IT-Recht Kanzlei oder e-recht24). Dies ist keine Rechtsberatung.
        </div>
        <div className="legal mt-12 space-y-8 leading-relaxed text-ink/85 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_a]:text-glut [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </section>
  )
}
