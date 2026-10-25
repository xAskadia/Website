export type FaqCategory = 'Ablauf' | 'Kosten' | 'Inhalte' | 'Technik' | 'Sichtbarkeit' | 'Nach dem Launch'

export interface Faq {
  q: string
  a: string
  cat: FaqCategory
}

export const faqs: Faq[] = [
  {
    cat: 'Ablauf',
    q: 'Wie läuft ein Website-Projekt mit dir ab?',
    a: 'In sechs Phasen: Kennenlernen, Strategie, Design, Entwicklung, Testing & Launch und – wenn du möchtest – Weiterentwicklung. Du weißt jederzeit, wo wir stehen und was als Nächstes passiert. Den genauen Ablauf findest du oben im Abschnitt „Ablauf“.',
  },
  {
    cat: 'Kosten',
    q: 'Was kostet eine Website?',
    a: 'Das hängt vom Umfang ab: Anzahl der Seiten, Funktionen wie Buchungssystem oder Mehrsprachigkeit, ob Texte und Bilder vorhanden sind. Nach einem kurzen Gespräch bekommst du ein transparentes, individuelles Angebot – ohne versteckte Posten. Im Website-Konfigurator auf dieser Seite kannst du dir vorab einen Überblick verschaffen.',
  },
  {
    cat: 'Ablauf',
    q: 'Wie lange dauert es, bis meine Website online ist?',
    a: 'Ein Onepager ist oft in wenigen Wochen umsetzbar, eine umfangreichere Unternehmenswebsite braucht entsprechend länger. Entscheidend ist auch, wie schnell Inhalte und Feedback vorliegen. Einen realistischen Zeitplan legen wir gemeinsam zu Beginn fest.',
  },
  {
    cat: 'Inhalte',
    q: 'Ich habe noch keine Texte und Bilder. Ist das ein Problem?',
    a: 'Nein. Ich unterstütze dich bei Struktur und Formulierung deiner Inhalte und helfe dir, deine Leistungen verständlich auf den Punkt zu bringen. Für Fotos kann ich passende Lösungen vorschlagen – von Bildkonzepten bis zur Empfehlung für ein Fotoshooting.',
  },
  {
    cat: 'Technik',
    q: 'Funktioniert meine Website auch auf dem Smartphone?',
    a: 'Ja, immer. Jede Website wird für Smartphone, Tablet und Desktop gestaltet und auf verschiedenen Geräten getestet. Ein großer Teil der Besuche kommt heute mobil – das berücksichtige ich von Anfang an.',
  },
  {
    cat: 'Technik',
    q: 'Kann ich die Website später selbst bearbeiten?',
    a: 'Das legen wir gemeinsam fest. Wenn du Inhalte selbst pflegen möchtest, plane ich die Technik so, dass das einfach möglich ist. Alternativ übernehme ich Änderungen für dich.',
  },
  {
    cat: 'Sichtbarkeit',
    q: 'Wird meine Website bei Google gefunden?',
    a: 'Ich sorge für eine suchmaschinenfreundliche Grundlage: saubere Seitenstruktur, sprechende Titel und Beschreibungen, schnelle Ladezeiten und verständliche Inhalte. Feste Platzierungen kann seriös niemand garantieren – eine gute Basis erhöht aber deine Chancen deutlich.',
  },
  {
    cat: 'Sichtbarkeit',
    q: 'Was ist der Unterschied zwischen Website und Landingpage?',
    a: 'Eine Website stellt dein gesamtes Unternehmen vor – mit mehreren Bereichen und Themen. Eine Landingpage konzentriert sich auf genau ein Angebot und ein Ziel, zum Beispiel eine Anmeldung oder Anfrage. Sie eignet sich besonders für Kampagnen.',
  },
  {
    cat: 'Kosten',
    q: 'Gibt es versteckte Folgekosten?',
    a: 'Nein. Laufende Kosten wie Domain und Hosting sowie optionale Pflege besprechen wir offen vorab, damit du genau weißt, womit du rechnen kannst.',
  },
  {
    cat: 'Nach dem Launch',
    q: 'Was passiert nach dem Launch?',
    a: 'Deine Website gehört dir. Auf Wunsch begleite ich dich weiter – mit Pflege, Aktualisierungen, technischen Updates oder neuen Inhalten und Seiten. Ganz ohne Verpflichtung.',
  },
  {
    cat: 'Technik',
    q: 'Ist meine Website datenschutzkonform?',
    a: 'Ich achte auf datenschutzfreundliche Technik: keine unnötigen Tracking-Cookies, lokal eingebundene Schriften und sichere Verbindungen. Für Impressum und Datenschutzerklärung empfehle ich zusätzlich eine rechtliche Prüfung, da ich keine Rechtsberatung leiste.',
  },
  {
    cat: 'Ablauf',
    q: 'Arbeitest du auch remote?',
    a: 'Ja. Die meisten Abstimmungen funktionieren problemlos per Videocall, Telefon und E-Mail. Persönliche Termine sind je nach Region ebenfalls möglich.',
  },
]
