<?php
/**
 * Kontaktformular – sendet Anfragen per E-Mail.
 * Benötigt ein Hosting mit PHP und aktivierter mail()-Funktion (bei den meisten Anbietern Standard).
 */

// ===== EINSTELLUNGEN =====
$empfaenger = 'hallo@ihre-domain.de';      // An diese Adresse gehen die Anfragen
$absender   = 'website@ihre-domain.de';    // Absender – sollte eine Adresse Ihrer eigenen Domain sein
// =========================

$sprache = (isset($_POST['sprache']) && $_POST['sprache'] === 'en') ? 'en' : 'de';
$zurueck = $sprache === 'en' ? 'en/contact.html' : 'kontakt.html';
$ok      = $sprache === 'en' ? '?sent=1' : '?gesendet=1';
$fehler  = $sprache === 'en' ? '?error=1' : '?fehler=1';

function feld($name, $max = 200) {
    $wert = isset($_POST[$name]) ? trim((string) $_POST[$name]) : '';
    return function_exists('mb_substr') ? mb_substr($wert, 0, $max) : substr($wert, 0, $max);
}
function einzeilig($wert) {
    // Zeilenumbrüche entfernen, damit keine zusätzlichen Mail-Header eingeschleust werden können
    return str_replace(["\r", "\n", "%0a", "%0d"], ' ', $wert);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ' . $zurueck);
    exit;
}

$name      = einzeilig(feld('name', 120));
$firma     = einzeilig(feld('firma', 160));
$email     = einzeilig(feld('email', 160));
$telefon   = einzeilig(feld('telefon', 60));
$paket     = einzeilig(feld('paket', 40));
$nachricht = feld('nachricht', 5000);

if ($name === '' || $nachricht === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: ' . $zurueck . $fehler);
    exit;
}

$betreff = '=?UTF-8?B?' . base64_encode('Neue Website-Anfrage von ' . $name) . '?=';
$text = "Neue Anfrage über die Website\n"
      . "==============================\n\n"
      . "Name:       $name\n"
      . "Unternehmen: $firma\n"
      . "E-Mail:     $email\n"
      . "Telefon:    $telefon\n"
      . "Paket:      $paket\n"
      . "Sprache:    $sprache\n\n"
      . "Nachricht:\n$nachricht\n";

$header  = "From: Website <$absender>\r\n";
$header .= "Reply-To: $email\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-Type: text/plain; charset=UTF-8\r\n";
$header .= "Content-Transfer-Encoding: 8bit\r\n";

$gesendet = mail($empfaenger, $betreff, $text, $header);

header('Location: ' . $zurueck . ($gesendet ? $ok : $fehler));
exit;
