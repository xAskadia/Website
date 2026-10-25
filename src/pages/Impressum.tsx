import { LegalLayout } from '../components/ui/LegalLayout'
import { site } from '../content/site'

export default function Impressum() {
  const l = site.legal
  return (
    <LegalLayout title="Impressum">
      <div>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          {l.owner}<br />
          [Ggf. Firmen-/Geschäftsbezeichnung]<br />
          {l.street}<br />
          {l.city}<br />
          {l.country}
        </p>
      </div>
      <div>
        <h2>Kontakt</h2>
        <p>Telefon: {site.contact.phone}<br />E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
      </div>
      <div>
        <h2>Umsatzsteuer</h2>
        <p>{l.vatId}<br />[Alternativ: Hinweis auf Kleinunternehmerregelung gemäß § 19 UStG, falls zutreffend]</p>
      </div>
      <div>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>{l.owner}, Anschrift wie oben</p>
      </div>
      <div>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. [Bitte prüfen und ggf. anpassen]</p>
      </div>
      <div>
        <h2>Haftung für Inhalte und Links</h2>
        <p>Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Für Inhalte externer Links sind ausschließlich deren Betreiber verantwortlich.</p>
      </div>
      <div>
        <h2>Urheberrecht</h2>
        <p>Die durch die Seitenbetreiberin erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die gezeigten Portfolio-Projekte sind, sofern gekennzeichnet, fiktive Demo-Projekte.</p>
      </div>
    </LegalLayout>
  )
}
