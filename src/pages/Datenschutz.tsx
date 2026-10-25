import { LegalLayout } from '../components/ui/LegalLayout'
import { contactEndpoint, site } from '../content/site'

export default function Datenschutz() {
  const l = site.legal
  return (
    <LegalLayout title="Datenschutzerklärung">
      <div>
        <h2>1. Verantwortliche Stelle</h2>
        <p>{l.owner}, {l.street}, {l.city}, {l.country}<br />E-Mail: <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
      </div>
      <div>
        <h2>2. Grundsätzliches</h2>
        <p>Der Schutz deiner Daten ist mir wichtig. Diese Website ist bewusst datensparsam aufgebaut: Es werden <strong>keine Tracking- oder Marketing-Cookies</strong> eingesetzt, keine Analyse-Dienste eingebunden und keine Schriftarten von Drittanbietern geladen – alle Schriften werden lokal von diesem Server ausgeliefert.</p>
      </div>
      <div>
        <h2>3. Hosting und Server-Logfiles</h2>
        <p>Diese Website wird gehostet bei: {l.hosting}. Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige Daten (z. B. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browsertyp) in Server-Logfiles. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website). [Speicherdauer und Auftragsverarbeitungsvertrag ergänzen]</p>
      </div>
      <div>
        <h2>4. Lokale Speicherung im Browser</h2>
        <p>Um Ergebnisse aus dem Website-Konfigurator oder dem Website-Finder in das Kontaktformular zu übernehmen und das kurze Intro nur einmal anzuzeigen, wird der sogenannte Session Storage deines Browsers genutzt. Diese Daten verlassen dein Gerät nicht und werden beim Schließen des Browser-Tabs automatisch gelöscht. Rechtsgrundlage ist § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für den von dir gewünschten Dienst).</p>
      </div>
      <div>
        <h2>5. Kontaktformular und E-Mail</h2>
        <p>Wenn du mir über das Kontaktformular oder per E-Mail eine Anfrage sendest, verarbeite ich deine Angaben (Name, Unternehmen, E-Mail, Projektangaben, optional Budget und Zeitraum) ausschließlich zur Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. lit. f DSGVO. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten bestehen.</p>
        <p>{contactEndpoint ? 'Für den Versand des Formulars wird folgender Dienst genutzt: [Name, Anschrift und Datenschutzhinweise des Formular-Dienstleisters ergänzen].' : '[Sobald ein Formular-Dienst angebunden ist, hier Anbieter, Zweck und ggf. Auftragsverarbeitung ergänzen.]'}</p>
      </div>
      <div>
        <h2>6. Deine Rechte</h2>
        <ul>
          <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          <li>Beschwerde bei einer Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
        </ul>
      </div>
      <div>
        <h2>7. Aktualität</h2>
        <p>Stand: [Datum einfügen]. Ich passe diese Datenschutzerklärung an, sobald sich die Website oder die rechtlichen Anforderungen ändern.</p>
      </div>
    </LegalLayout>
  )
}
