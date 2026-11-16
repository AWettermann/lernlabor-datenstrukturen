# Lernlabor Datenstrukturen Q1.4

Statisches Lernlabor mit allen 64 Lernstationen, Startcheck (7 Aufgaben), Kompetenzcheck (7 Aufgaben), Methodenverzeichnis, gestuften Hilfen und gespeichertem Lernfortschritt. Die Oberfläche nutzt ein kompaktes, helles Layout in Blau und Türkis. Aufgaben und Kapitel bleiben vollständig erhalten.

Die Bewertung unterscheidet **korrekt**, **fachlich falsch**, **unvollständig**, **Eingabeformat fehlerhaft** und **nicht automatisch bewertbar**.

- **39 Java-Stationen:** Ausführung eines begrenzten Java-Sprachumfangs über Lexer, Syntaxbaum, Typprüfung und konkrete Funktionstests, einschließlich Klassen, Konstruktoren und Trie-Operationen. Kein Textvergleich, keine Schlüsselwortbewertung und keine Ausführung des Eingabetextes als JavaScript.
- **24 Kurzantworten:** eigene Prüfer für Zahlen, Big-O, geordnete Folgen, Mengen, Entscheidungen und Fachbegriffe.
- **Eine Operationsfolge:** Prüfung aller acht Schritte und der Queue-Zwischenzustände.
- **Alle sieben früher ausgeschlossenen Klassen-/Trie-Stationen sind funktional prüfbar.** Unbekannte Java-Erweiterungen bleiben neutral; keine pauschale manuelle Ausnahme mehr.

Die beiden gemeldeten Lösungen zum Blätterzählen und zur Baumhöhe bestehen die funktionale Prüfung. Methodenrümpfe, vollständige Methoden, Hilfsvariablen, andere Parameternamen und unterstützte alternative Kontrollstrukturen sind möglich. Java außerhalb des dokumentierten Sprachumfangs erhält eine neutrale Rückmeldung.

## Lokal verwenden

`index.html` im Browser öffnen oder den Ordner mit einem statischen Webserver bereitstellen. Entwürfe, bestätigte Lösungen und Diagnoseprofile werden im Browser gespeichert. Falls der Browser die Speicherung sperrt, bleibt die Anwendung nutzbar und zeigt einen Hinweis zur Speicherung nur innerhalb der Sitzung.

## Tests und Dokumentation

Die [UI/UX-Überarbeitung](docs/UI-UEBERARBEITUNG.md) dokumentiert die neue Bedienung, geprüfte Bildschirmgrößen und Screenshots. Kapitel werden über „Dein Lernweg“ gewählt; die Aufgabenwahl zeigt Position und Bearbeitungsstand. Das Methodenverzeichnis bleibt links und lässt sich auf Tablets und Handys bei Bedarf öffnen. Hinweise und Musterlösungen stehen im Dialog bereit. Im Editor prüft auch `⌘/Strg + Enter`; `Tab` verlässt das Eingabefeld.

Node.js ab Version 22 genügt; keine npm-Pakete müssen installiert werden.

```sh
npm test
npm run audit
npm run test:browser
```

Der Browsertest verwendet den installierten Chrome, startet einen lokalen HTTP-Server und legt Berichte/Screenshots in `tests/artifacts/` ab. Auf anderen Systemen kann `Q14_CHROME` auf die Chrome-/Chromium-Programmdatei gesetzt werden. Bei eingeschränkten Ausführungsrechten benötigt der Browserstart eine Freigabe.

- [Vollständige Prüfung aller 78 Aufgaben](docs/AUFGABENPRUEFUNG.md)
- [Maschinenlesbare Prüfübersicht](docs/pruefuebersicht.json)
- [24 Fehler- und Lückengruppen](docs/FEHLERPROTOKOLL.md)
- [Prüfstrategie, Sprachumfang und Einschränkungen](docs/BEWERTUNG.md)
- [Abschlussbericht und geänderte Dateien](docs/ABSCHLUSSBERICHT.md)
- [Aktueller Reparaturbericht: sieben bisher manuelle Aufgaben](docs/MANUELLE-PRUEFUNG-REPARATUR.md)

Alle 64 Lernstationen besitzen bestandene Funktionstests bzw. formatbezogene Tests mit Referenz, Alternative und Falschversuch. Die Java-Prüfung umfasst 721 konkrete Struktur-/Operationsfälle je Referenzdurchlauf. Sie ist kein vollständiger Java-Compiler: Java außerhalb des dokumentierten Sprachumfangs bleibt ausdrücklich unbewertet. Lokal ist weiterhin kein JDK verfügbar; eine Kompilierung mit javac ist nicht bestätigt.

## GitHub Pages

Die Anwendung besteht aus HTML, CSS und klassischen JavaScript-Dateien mit relativen Pfaden. Sie benötigt weder Backend noch Buildschritt, CDN oder externe Laufzeitabhängigkeiten. Alle Dateien im Projektstamm gehören zur Anwendung. `docs/`, `tests/` und `package.json` dienen der lokalen Prüfung und Dokumentation.

Live-Adresse: [Lernlabor Datenstrukturen Q1.4](https://awettermann.github.io/lernlabor-datenstrukturen/). Die Veröffentlichungsprüfung und den Abgleich mit dem Repository dokumentiert [VEROEFFENTLICHUNG-PRUEFUNG.md](docs/VEROEFFENTLICHUNG-PRUEFUNG.md).

Die Datei `.nojekyll` stellt die unveränderte statische Auslieferung von HTML, CSS, JavaScript und Prüfberichten sicher. Mit `node tests/verify-pages.js https://awettermann.github.io/lernlabor-datenstrukturen/ <commit-sha>` lassen sich die veröffentlichten Anwendungsdateien gegen diesen Checkout prüfen.

Für Umgebungen mit wenig freiem Speicher kann `Q14_SCREENSHOTS=0 npm run test:browser` verwendet werden. Alle Browserprüfungen bleiben aktiv; lediglich neue Screenshots werden nicht gespeichert.
