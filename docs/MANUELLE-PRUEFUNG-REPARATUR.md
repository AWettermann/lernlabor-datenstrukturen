# Reparatur der bisher manuell zu prüfenden Aufgaben

## Kompakte Abnahmeübersicht

| Kennzahl | Ergebnis |
|---|---:|
| Ursprünglich pauschal ausgenommene Aufgaben | **7** |
| Tatsächlich funktional korrigiert und getestet | **7** |
| Weiterhin pauschal ausgenommene Aufgaben | **0** |
| Lernstationen insgesamt | **64, unverändert vollständig vorhanden** |
| Eingang-/Ausgangsdiagnose | **7 + 7, erhalten** |
| Automatisch prüfbare Java-Stationen | **39** |
| Funktionstestfälle je Java-Referenzdurchlauf | **721**, davon **219 neu** |
| Vollständige Regressionstests | **528 bestanden**, 0 fehlgeschlagen, 0 übersprungen |
| Browserprüfungen | **22 bestanden**, 0 JavaScript-Ausnahmen |

Die sieben Referenzlösungen waren fachlich stimmig. Ihre Auswertung war durch einen pauschalen `manual`-Zweig abgeschaltet. Für diese Stationen fehlten Klassen-/Konstruktorunterstützung sowie die benötigten Trie-Sprachkonstrukte. Diese Ursachen sind jetzt im Parser, Typprüfer und Interpreter korrigiert. Es wurde keine reine Textmuster- oder Schlüsselwortannahme eingeführt.

## Einzelkorrekturen und Nachweise

| ID / Aufgabe | Ursache | Konkrete Korrektur | Fälle je Referenz |
|---|---|---|---:|
| task-01 / Klasse Knoten | Ganze Klasse wurde grundsätzlich nicht ausgeführt. | Klassengrammatik, Paketkonstruktor, Instanzfelder, Getter und Setter; Paketidentität und tatsächliche Nachfolgeränderung geprüft. | 6 |
| task-15 / PaketStapel | Klassen, Konstruktoren und getrennter Instanzzustand fehlten. | Öffentliche Schnittstelle, Feldstandardwerte, impliziter Standardkonstruktor, LIFO, nicht veränderndes peek und unabhängige Instanzen geprüft. | 8 |
| task-21 / PaketWarteschlange | Klassenprüfung und Kontrolle des Endreferenzzustands fehlten. | FIFO, front ohne Entnahme, Nullfälle, wiederholtes Leeren und erneutes Einfügen; fehlendes Zurücksetzen des Queue-Endes fällt durch. | 8 |
| task-27 / BaumKnoten | Ganze Klasse und konkrete Getterwirkungen wurden nicht bewertet. | Nutzdatenspeicherung, zwei anfangs leere Kinder, getrennte Getter und Kindreferenzidentität geprüft; umbenannte private Felder unterstützt. | 5 |
| task-52 / Trie-Suche | Casts, instanceof, Zeichenliterale und String-Zugriffe wurden nicht ausgeführt. | Getrenntes Trie-Klassenmodell, echte Kindzugriffe und Blattprüfung; vollständige Schlüssel von bloßen Präfixen und fehlenden Pfaden unterschieden. | 95 |
| task-53 / Trie-Einfügen | Erzeugung innerer Knoten/Blätter, rekursive Kindzuweisung und Rückgabewurzel fehlten in der Prüfung. | Null-/innere Wurzel, Geschwistererhaltung, Duplikate, richtige Position und vollständiger Blattinhalt geprüft. | 13 |
| task-54 / Präfixknoten | Typprüfungen/Casts und Rückgabe der konkreten Knotenreferenz fehlten. | Leeres Präfix, innere Präfixknoten, komplette Schlüssel, fehlende/zu lange Pfade und unveränderter Trie geprüft; rekursive Alternative akzeptiert. | 84 |

In den Aufgabenstellungen sind die bereits aus Vorlagen und Hilfen folgenden Verträge ausdrücklich ergänzt: öffentliche Schnittstelle, leere Strukturen, nicht veränderndes Lesen, linke/rechte Referenz, vollständiger Schlüssel bzw. Präfix und Übernahme der neuen Teilbaumwurzel. Die korrekten Musterlösungen bleiben erhalten.

Für jede der sieben Stationen bestehen Musterlösung und unabhängig geschriebene Alternative. Dazu kommen **fünf gezielte Fehlprogramme pro Aufgabe**, zusammen 35, etwa ignorierte Nutzdaten, konstante Getter, verlorene Nachfolger, veränderndes peek/front, falsche Leerprüfung, nicht zurückgesetztes Queue-Ende, falsche Ziffernindizes und verlorene Geschwisterpfade. Die leere Eingabe, unveränderte Vorlage und geeignete unvollständige Eingaben werden getrennt behandelt. Bei den Trie-Methoden sind sowohl Rumpf als auch vollständige Methode getestet.

Die Alternativen verwenden unter anderem andere Feld-/Parameter-/Variablennamen, implizite Nullinitialisierung, Standardkonstruktoren, ternäre Ausdrücke, while statt for, zusätzliche Hilfsmethoden, direkte verschachtelte Kindzuweisung und Rekursion statt iterativer Präfixsuche. Sie stehen ausschließlich in Testdateien und sind keine Whitelist des Produktprüfers.

## Bekannte Rekursionsfehler

Die konkret gemeldeten Lösungen für **„Blätter rekursiv zählen“** und **„Baumhöhe berechnen“** bestehen weiterhin. Insbesondere sind leerer Baum, Blatt, ein Kind, der Baum mit Blättern 20/40/60 und die Viererkette abgedeckt. Die Höhendefinition bleibt leer = 0 und Blatt = 1. Falsches `||` in der Blattprüfung und eine falsche Formel trotz enthaltenem `Math.max` werden zurückgewiesen. Jede dieser Baumfunktionen wird außerdem auf 52 verschiedenen Baumformen ausgeführt.

## Vollständige lokale Kontrolle

Ausgeführt:

```sh
npm test
npm run audit
npm run test:browser
```

- Alle 64 Referenzen, korrekten Alternativen, Falschversuche und Leerfälle bestehen die jeweils erwartete Bewertung im Gesamt-Audit.
- Der Browser prüft alle 64 Stationen über die tatsächliche Oberfläche. Zusätzlich werden bei allen sieben reparierten Stationen korrekte Alternativen angenommen und Fehlprogramme abgelehnt; der Fortschritt wird entsprechend gesetzt bzw. zurückgenommen.
- Navigation, Methodenverzeichnis, Hinweise/Musterlösungen, Tastaturbedienung, Diagnose, Kompetenzprofil, Speicherung und unterschiedliche Bildschirmgrößen bleiben getestet.
- Das unveränderte Stylesheet wird über eine Prüfsumme bestätigt. Die vorherige UI-Schutzprüfung wird als historischer Vergleich ausgewiesen: Änderungen an Aufgaben und Java-Bewertung sind in diesem Auftrag ausdrücklich beabsichtigt.
- Die Anwendung startet auch unter einem GitHub-Pages-Unterpfad. Keine neuen Laufzeitabhängigkeiten, kein Backend, kein Buildschritt.

Nachweise:

- [Vollständige Unit-Testausgabe](../tests/artifacts/manual-repair-unit-test-output.txt)
- [Browserbericht](../tests/artifacts/manual-repair-browser-report.json)
- [Gesamtprüfung aller 78 Aufgaben](AUFGABENPRUEFUNG.md)
- [Maschinenlesbare Prüfübersicht](pruefuebersicht.json)
- [Stylesheet-Ausgangsprüfsumme](../tests/artifacts/manual-repair-layout-before.json)

## Verbleibende Grenzen

**Keine der sieben Aufgaben ist weiterhin pauschal offen.** Musterlösungen, dokumentierte Eingaben und getestete korrekte Alternativen sind jetzt funktional bewertbar.

Die vorhandene Architektur bleibt ein begrenzter Java-Interpreter im Browser, kein vollständiger Java-Compiler. Nicht unterstützte Erweiterungen wie Collections, Generics, beliebige Vererbung, überladene Konstruktoren und komplexe, nicht eindeutig zuordenbare zusätzliche Referenzmodelle erhalten eine neutrale Rückmeldung. Sie sind weder als bestanden noch als fachlich falsch verbucht. Endliche Tests beweisen keine allgemeine Programmäquivalenz oder Laufzeitklasse. Auf dem Rechner ist weiterhin kein JDK verfügbar; ein separater javac-Lauf ist nicht bestätigt. Diese Grenzen werden nicht als gelöste vollständige Java-Unterstützung ausgegeben.

Der aktuelle Sprachumfang und die Sicherheits-/Ressourcengrenzen stehen in [BEWERTUNG.md](BEWERTUNG.md).

## Geänderte Dateien

Produktdateien geändert: `java-subset.js`, `assessment.js`, `tasks.js`, `app.js`, `index.html`. Neue Produktdateien: `java-classes.js`, `class-cases.js`, `trie-cases.js`.

Tests/Konfiguration geändert: `package.json`, `tests/load.js`, `tests/alternatives.js`, `tests/answer-variants.js`, `tests/assessment.test.js`, `tests/audit.js`, `tests/browser-test.js`. Neue Tests: `tests/manual-repair.test.js`.

Dokumentation aktualisiert: `README.md`, `docs/BEWERTUNG.md`, `docs/FEHLERPROTOKOLL.md`, `docs/AUFGABENPRUEFUNG.md`, `docs/pruefuebersicht.json`. Die früheren Abschluss-/UI-Berichte sind als historisch gekennzeichnet und verweisen auf diesen aktuellen Bericht. Neue Nachweise liegen in `tests/artifacts/manual-repair-*` und `tests/artifacts/repair-*.png`.

**Ausschließlich lokal umgesetzt. Kein Push und kein Deployment.**
