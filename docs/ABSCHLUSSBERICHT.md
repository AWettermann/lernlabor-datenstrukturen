# Abschlussbericht: Lernlabor Q1.4

> **Historischer Bericht der ersten Reparaturphase.** Die hier genannten sieben manuellen Ausnahmen sind inzwischen behoben. Aktueller Stand: [Reparaturbericht](MANUELLE-PRUEFUNG-REPARATUR.md) und [regenerierte Gesamtprüfung](AUFGABENPRUEFUNG.md). Die folgenden Zahlen dokumentieren die damalige Fassung.

Stand: 16.11.2026. Änderungen ausschließlich lokal; kein Push und kein Deployment.

## Umfang und Befunde

**78 Aufgaben untersucht:** 64 Lernstationen, 7 Eingangsdiagnosen und 7 Ausgangsdiagnosen. Die 64 Stationen enthalten weiterhin sämtliche 28 Hauptstationen und 36 Zusatzstationen in derselben Kapitelzuordnung.

**24 Fehler- und Lückengruppen** sind in [FEHLERPROTOKOLL.md](FEHLERPROTOKOLL.md) beschrieben. Die Zahl bezeichnet Gruppen von Ursachen und inkonsistenten Aufgabenverträgen, nicht jede einzelne betroffene Eingabe.

Die beiden konkret gemeldeten Java-Lösungen zum Blätterzählen und zur Höhe werden akzeptiert. Die Höhendefinition bleibt leer = 0 und Blatt = 1. Die Beispielblätter 20, 40 und 60 ergeben 3; die einseitige Viererkette ergibt Höhe 4.

## Korrigierte Prüfmechanismen

- Java-Textgleichheit und Schlüsselwortbewertungen vollständig entfernt. 32 Java-Stationen verwenden einen ausdrücklich begrenzten Parser/Interpreter mit Typprüfung und konkreten Funktionstests. Zusätzliche Hilfsmethoden und verschiedene unterstützte Kontrollstrukturen sind möglich.
- 24 Kurzantworten besitzen passende Formate: ganze Zahl, Big-O, geordnete Folge, ungeordnete Menge, Ja/Nein-Entscheidung, Position oder Fachbegriff mit gepflegten Synonymen.
- Die Queue-Operationsfolge prüft alle acht Operationen in ihrer Reihenfolge und zeigt die jeweiligen Endreferenzen.
- Alle 14 Diagnoseaufgaben sind einzeln erfasst. Die Startdiagnose berücksichtigt genaue Verbindungen und Klickreihenfolgen, verhindert missverständliche Mehrfachauswahl und mittelt die beiden Reihenfolgeaufgaben symmetrisch. Unbeantwortete Aufgaben bleiben offen.
- Fünf Rückmeldungen unterscheiden korrekt, fachlich falsch, unvollständig, Eingabeformat und nicht zuverlässig automatisch bewertbar.
- Methodenrümpfe, vollständige Methoden und Anweisungsfragmente sind in der Oberfläche unterschieden. Verzeichnis, Klassennamen und Signaturen sowie mehrere unklare Aufgabenbedingungen sind korrigiert.
- Modelle stimmen mit den konkreten Aufgaben überein. Die bisherige Modell-Schrittfunktion bleibt als ausdrücklich illustrierender Strukturhinweis erhalten.
- Entwürfe, bestätigter Fortschritt und Diagnoseprofile werden gespeichert. Gesperrter Speicher, volle Quote und beschädigte Daten verhindern die Nutzung nicht.

## Testergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npm test` | **427 Tests bestanden, 0 fehlgeschlagen, 0 übersprungen**; einschließlich untergeordneter Tests |
| `npm run audit` | Alle 78 Aufgaben erfasst; **57 Lernstationen** mit bestandener Musterlösung und korrekter Alternative, zurückgewiesenem Falschversuch und sinnvoller Leerbewertung |
| Java-Testdaten | **502 konkrete Funktionstestfälle** je vollständigem Durchlauf der 32 Referenzen; zusätzlich Alternativen, Falschversuche und Regressionen |
| `npm run test:browser` | **12 Browserprüfungen bestanden**, **0 JavaScript-Ausnahmen** |
| Erreichbarkeit | Alle 64 Stationen über die tatsächliche Weiter-Navigation geöffnet und über die Oberfläche geprüft; Zurück und alle Kapitel ebenfalls geprüft |
| Browser | Installierter Chrome 157, Headless-Modus |
| Bildschirmbreiten | 1440, 390 und 320 Pixel; kein horizontaler Seitenüberlauf in den getesteten Ansichten |
| Speicherung | Entwürfe und Fortschritt nach Neuladen vorhanden; beschädigte und gesperrte Speicherung geprüft |
| Statischer Unterpfad | Anwendung und Skripte unter `/github-pages/` erfolgreich geladen |

Nachweise: [Unit-Testausgabe](../tests/artifacts/unit-test-output.txt), [Browserbericht](../tests/artifacts/browser-report.json), [Desktop-Screenshot](../tests/artifacts/desktop.png), [mobiler Screenshot](../tests/artifacts/mobile.png). Die Screenshots wurden zusätzlich visuell kontrolliert.

Die Tests verwenden nur Node.js-Bordmittel und den installierten Chrome; keine npm-Pakete wurden heruntergeladen. Die sieben manuellen Stationen zählen in den Regressionstests nur hinsichtlich ihrer neutralen Rückmeldung und Eingabeprüfung, ausdrücklich nicht als bestandene Java-Funktionstests.

## Verbleibende Einschränkungen

**Sieben Stationen werden nicht funktional automatisch geprüft:** `task-01` Knotenklasse, `task-15` PaketStapel, `task-21` PaketWarteschlange, `task-27` BaumKnoten sowie `task-52` bis `task-54` Trie-Suche, Trie-Einfügen und Präfixknoten. Diese Aufgaben erhalten keine automatische Erfolgs- oder Falschbewertung. Ihre Musterlösungen sind fachlich gelesen, nicht kompiliert.

Der vorhandene Rechner hat eine Java-Laufzeit, aber keinen nutzbaren Compiler. Ein Compiler-Download wurde nicht freigegeben. Auch bei den 32 unterstützten Stationen ist die Prüfung eine Ausführung im dokumentierten Sprachumfang und keine vollständige Java-Kompilierung. Andere gültige Java-Schreibweisen außerhalb dieses Umfangs bleiben neutral. Endliche Funktionstests beweisen keine allgemeine Korrektheit, geforderte Rekursionsverwendung oder Laufzeitklasse. Freie Begründungen werden nicht semantisch bewertet.

Details: [BEWERTUNG.md](BEWERTUNG.md). Jede Aufgabe mit Erwartungen, Musterlösung, Alternativen, Falschversuchen und tatsächlichem Status: [AUFGABENPRUEFUNG.md](AUFGABENPRUEFUNG.md) und [pruefuebersicht.json](pruefuebersicht.json).

## Geänderte und neue Dateien

Bestehende Dateien geändert:

- `app.js` – Oberfläche, Auswertung, Fortschritt und Modelle; Aufgabendaten ausgelagert.
- `diagnose.js` – Diagnoseinteraktionen, Navigation, Rückmeldungen und Profil.
- `index.html` – Eingabeformat, Hinweise zur Prüfung und lokale Skripteinbindung.
- `style.css` – kleine Ergänzungen für Signaturrahmen, Modelle, mobile Darstellung und Tastaturfokus; bestehende Farben und Spalten erhalten.
- `README.md` – Verwendung, Tests und Grenzen.

Neue Anwendungs- und Konfigurationsdateien:

- `tasks.js`
- `assessment.js`
- `java-subset.js`
- `functional-cases.js`
- `diagnostic-model.js`
- `storage.js`
- `package.json`

Neue Tests:

- `tests/load.js`
- `tests/alternatives.js`
- `tests/answer-variants.js`
- `tests/assessment.test.js`
- `tests/diagnostic.test.js`
- `tests/storage.test.js`
- `tests/browser-test.js`
- `tests/audit.js`

Neue Dokumentation und Nachweise:

- `docs/ABSCHLUSSBERICHT.md`
- `docs/AUFGABENPRUEFUNG.md`
- `docs/pruefuebersicht.json`
- `docs/BEWERTUNG.md`
- `docs/FEHLERPROTOKOLL.md`
- `tests/artifacts/unit-test-output.txt`
- `tests/artifacts/browser-report.json`
- `tests/artifacts/desktop.png`
- `tests/artifacts/mobile.png`

## GitHub Pages

**Weiterhin kompatibel:** ausschließlich HTML, CSS und lokale klassische JavaScript-Dateien mit relativen Pfaden; kein Backend, kein Buildschritt, keine externen Laufzeitabhängigkeiten. Der lokale Unterpfadtest bestätigt das Laden wie in einem Projekt-Repository. Die Änderungen sind nicht veröffentlicht.
