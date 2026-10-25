/** Absichtlich veraltete Beispiel-Website für Vorher-Nachher-Vergleiche (fiktiv). */
export function OldSite({ name = 'Werkhaus Tischlerei' }: { name?: string }) {
  const u = (n: number) => `${n}cqw`
  return (
    <div className="h-full w-full overflow-hidden" style={{ background: '#d8d8d8', fontFamily: '"Times New Roman", Times, serif', color: '#000' }}>
      <div style={{ background: 'linear-gradient(#3a5fa0,#1d3a73)', color: '#ffef9e', padding: `${u(1.2)} ${u(2)}`, fontSize: u(3), fontWeight: 700, textShadow: '2px 2px 0 #000', fontFamily: '"Comic Sans MS", "Times New Roman", serif' }}>
        ~ Willkommen bei {name} ~
      </div>
      <div style={{ background: '#ffff99', fontSize: u(1.1), padding: `${u(0.3)} ${u(1)}`, color: '#c00', whiteSpace: 'nowrap', overflow: 'hidden' }}>
        +++ NEU: Unsere Homepage ist online!!! +++ Besucherzähler: 000417 +++ Optimiert für 800×600 +++
      </div>
      <div className="grid" style={{ gridTemplateColumns: '24% 1fr', gap: u(1), padding: u(1) }}>
        <div style={{ background: '#efefef', border: '2px outset #fff', padding: u(0.8), fontSize: u(1.05) }}>
          {['Startseite', 'Über uns', 'Geschichte', 'Leistungen', 'Leistungen 2', 'Galerie', 'Galerie (alt)', 'Links', 'Gästebuch', 'Anfahrt', 'Impressum'].map((l) => (
            <div key={l} style={{ color: '#00e', textDecoration: 'underline', marginBottom: u(0.35) }}>» {l}</div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid #999', padding: u(1.2), fontSize: u(1.05), lineHeight: 1.3 }}>
          <div style={{ fontSize: u(1.9), fontWeight: 700, textAlign: 'center', color: '#800000' }}>Herzlich Willkommen auf unserer Homepage!</div>
          <div className="flex" style={{ gap: u(1), marginTop: u(1) }}>
            <div style={{ width: u(14), height: u(10), background: 'repeating-linear-gradient(45deg,#bbb 0 4px,#ccc 4px 8px)', border: '1px solid #666', flexShrink: 0 }} />
            <div>
              Wir sind ein Traditionsbetrieb und bieten Ihnen viele verschiedene Leistungen im Bereich Holz an. Bitte klicken Sie links im Menü auf die entsprechende Seite um mehr Informationen zu erhalten. Für Anfragen nutzen Sie bitte das Kontaktformular im Bereich Impressum. Diese Seite befindet sich noch im Aufbau.
            </div>
          </div>
          <div style={{ marginTop: u(1.2), textAlign: 'center', fontSize: u(0.9), color: '#666' }}>
            [Bild wird geladen…] · Letzte Aktualisierung: 14.03.2009
          </div>
        </div>
      </div>
    </div>
  )
}
