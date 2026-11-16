# Schülerfreundliche Oberfläche für das Lernlabor Q1.4

> **Historischer Bericht der Layoutphase.** Die damals unveränderte Bewertung wurde im nachfolgenden Auftrag ausdrücklich erweitert: Alle sieben früher manuellen Aufgaben sind jetzt funktional prüfbar. Aktuelle Ergebnisse: [Reparaturbericht](MANUELLE-PRUEFUNG-REPARATUR.md). Das Layout dieser UI-Phase bleibt erhalten.

Die UI/UX-Überarbeitung ist ausschließlich lokal umgesetzt. Kein Push, kein Deployment und keine zusätzlichen Abhängigkeiten.

## Was sich für Lernende verbessert

- **Die Aufgabe steht im Mittelpunkt.** Kapitel, trainierter Bereich, Aufgabenstellung und Eingabe bilden einen zusammenhängenden Arbeitsbereich. Der Kopf ist kompakt; übergroße Überschriften und dauerhaft leere Hilfekarten entfallen.
- **Ein klarer Lernweg.** Ein Kapitelmenü zeigt bestätigte Aufgaben je Kapitel. Die direkte Aufgabenwahl nennt Position, Titel und Status: offen, Entwurf, bestätigt bzw. manuell zu prüfen. Eine gemeinsame Aktionszeile bietet Zurück, Lösung prüfen und Weiter. Am Kapitelende führt die entsprechend beschriftete Schaltfläche zum nächsten Kapitel bzw. Kompetenzcheck.
- **Methoden bleiben links.** Die passende Klassenübersicht ist auf Laptops und Desktops sichtbar und bleibt beim Scrollen erreichbar. Klassenabschnitte sind einzeln einklappbar, längere Signaturen umbrechbar. Auf Tablets und Handys startet das Verzeichnis als kompakte aufklappbare Leiste.
- **Ein ruhiger Editor.** Heller Codebereich, Zeilennummern, passende Zeilenabstände, klar markierte bearbeitbare Vorlagen und ein schreibgeschützter Methodenrahmen bei entsprechenden Rumpfaufgaben. `⌘/Strg + Enter` prüft; die normale Tab-Taste führt zum nächsten Bedienelement.
- **Rückmeldung direkt an der Lösung.** Fünf Zustände haben erkennbare Farben, Symbole und sachliche Texte. Prüffälle sind aufklappbar, bei fachlichen Fehlern werden fehlgeschlagene Fälle zuerst gezeigt. Die Auswertung selbst ist unverändert.
- **Hilfe bei Bedarf.** Alle vier Hinweise und sämtliche Musterlösungen bleiben erhalten und öffnen einen Dialog. Dieser ist per Tastatur bedienbar, hält den Fokus und schließt mit Escape; der Fokus kehrt zur auslösenden Schaltfläche zurück.
- **Ein übersichtliches Kompetenzprofil.** Dezente Balken und Werte bleiben sichtbar; ausführliche Einzelergebnisse lassen sich aufklappen. Empfehlungen führen direkt zum passenden Kapitel.

Die Gestaltung verwendet helle Flächen, gedämpftes Blau und Türkis, einen warmen Akzent für das Ausprobieren, zurückhaltende Rahmen und Schatten. Es gibt keine extern geladenen Schriften, Bilder oder UI-Pakete und keine dekorativen Animationen.

## Erhaltene Inhalte und Logik

Alle **64 Lernstationen, sieben Eingangs- und sieben Ausgangsdiagnosen** bleiben vorhanden. Java-Aufgaben werden unverändert bewertet; auch die bestehenden sieben manuell zu prüfenden Aufgaben bleiben als solche gekennzeichnet. Die Aufgabenmodelle, Hinweise, Musterlösungen, Diagnoseauswertung und Speicherformate bleiben erhalten.

Ein SHA-256-Vergleich vor und nach der Überarbeitung bestätigt, dass diese Dateien **bytegleich** geblieben sind:

- `tasks.js`
- `assessment.js`
- `java-subset.js`
- `functional-cases.js`
- `diagnostic-model.js`
- `storage.js`

Die Reihenfolge der Prüffälle und die Texte der Oberfläche werden nur in der Darstellung angepasst. Gespeicherte Entwürfe, Bestätigungen und Diagnoseprofile werden über dieselben Schlüssel weiterverwendet.

## Lokale Qualitätskontrolle

- **427 automatisierte Regressionstests bestanden.** Die vorhandenen Tests für Aufgaben, Diagnose und Speicherung laufen unverändert.
- **21 Browserprüfungen bestanden, keine JavaScript-Ausnahmen.** Alle 64 Aufgaben wurden über die Oberfläche aufgerufen und geprüft. Die Einschränkungen der sieben manuellen Stationen werden dabei weiterhin ausdrücklich berücksichtigt.
- Kapitelmenü mit tatsächlichen Mausklicks, direkter Aufgabenwechsel, Kapitelübergänge und Kompetenzcheck geprüft.
- Native Texteingabe, Zeilennummern, Prüfkürzel, Verlassen des Editors per Tab, sichtbarer Tastaturfokus, Dialog-Fokusbegrenzung und Escape geprüft.
- Alle fünf Rückmeldungszustände, vier Hilfestufen, Musterlösungen, Methodenabschnitte, Kompetenzprofil und klickbare Wiederholungsempfehlung geprüft.
- Haupttexte, Code, Methodensignaturen, Editorinformationen und primäre Aktionen auf mindestens **4,5:1 Textkontrast** geprüft. Dies ist eine gezielte Kontrastprüfung, keine vollständige Barrierefreiheitszertifizierung.
- Entwürfe und Fortschritt nach Neuladen sowie gesperrter und beschädigter Browser-Speicher geprüft.
- Aufgabentypen bei **1280×800, 1440×900, 1920×1080, 1024×768, 834×1112 und 768×1024** geprüft. Zusätzlich **390×844 und 320×844** ohne horizontalen Seitenüberlauf. Auf den großen drei Ansichten bleiben bei der geprüften Rumpfaufgabe Editor, Prüfschaltfläche und Beginn der Rückmeldung zusammen sichtbar.
- Relative Skripte und CSS unter einem GitHub-Pages-Unterpfad erfolgreich geladen. Der Betrieb bleibt vollständig statisch und ohne Buildschritt möglich.

Erneut ausführen:

```sh
npm test
npm run test:browser
```

Der Browsertest benötigt den bereits installierten Chrome oder einen über `Q14_CHROME` angegebenen Chrome-/Chromium-Pfad. Er lädt keine zusätzliche Testsoftware herunter.

## Dateien und Nachweise

Geändert: `index.html`, `style.css`, `app.js`, `diagnose.js`, `README.md` und `tests/browser-test.js`. Neu: diese Dokumentation sowie die folgenden UI-Berichte und Screenshots in `tests/artifacts/`.

- [Unit-Testausgabe](../tests/artifacts/ui-unit-test-output.txt)
- [Browserbericht mit Prüfsummenvergleich](../tests/artifacts/ui-browser-report.json)
- [Ausgangsprüfsummen](../tests/artifacts/ui-before-engine-sha256.json)
- [Laptop, 1280 Pixel](../tests/artifacts/ui-1280.png)
- [Laptop, 1440 Pixel](../tests/artifacts/ui-1440.png)
- [Desktop, 1920 Pixel](../tests/artifacts/ui-1920.png)
- [1024 Pixel](../tests/artifacts/ui-1024.png)
- [Tablet, 834 Pixel](../tests/artifacts/ui-834.png)
- [Tablet, 768 Pixel](../tests/artifacts/ui-768.png)
- [Mobile Ansicht](../tests/artifacts/ui-mobile.png)
- [Hinweisdialog](../tests/artifacts/ui-hinweise.png)
- [Kompetenzprofil](../tests/artifacts/ui-kompetenzprofil.png)

Zusätzlich legt der Test `ui-desktop.png` ab. Die Gestaltung wurde anhand der Browseraufnahmen auch visuell kontrolliert.
