# Prüfstrategie und Grenzen – aktueller Stand

Alle **64 Lernstationen** sind jetzt automatisch im jeweils dokumentierten Eingabeformat prüfbar: **39 Java-Stationen**, **24 Kurzantworten** und **eine Queue-Operationsfolge**. Die sieben früher pauschal ausgeschlossenen Klassen-/Trie-Aufgaben sind tatsächlich implementiert und getestet, siehe [Reparaturbericht](MANUELLE-PRUEFUNG-REPARATUR.md).

## Architektur

`tasks.js` enthält die Aufgaben, Vorlagen, Musterlösungen und Hilfen. `assessment.js` legt das jeweilige Eingabeformat und den Prüfvertrag fest. Java-Eingaben werden durch einen Lexer und Parser als Syntaxbaum verarbeitet, typgeprüft und in einer begrenzten Modelllaufzeit ausgeführt. Es gibt keine Java-Schlüsselwortbewertung, keine Whitelist bestimmter Musterlösungen und keine Umwandlung des Eingabetextes in ausführbares JavaScript. Reguläre Ausdrücke dienen der Tokenisierung und anderen Antwortformaten, nicht dem funktionalen Bewerten von Java-Code.

- `java-subset.js`: gemeinsame Tokenisierung, Methodengrammatik, Typprüfung und Interpreter.
- `java-classes.js`: zusätzliche Klassengrammatik und Instanzerzeugung, unter Wiederverwendung derselben Typprüfung und Auswertung.
- `functional-cases.js`: bisherige 32 Java-Stationen mit 502 konkreten Funktionstestfällen.
- `class-cases.js`: vier Klassenaufgaben mit 27 Fällen.
- `trie-cases.js`: drei Trie-Aufgaben mit 192 Fällen.

Zusammen ergeben die 39 Java-Referenzen **721 Funktionstestfälle**. Die Referenzen, unabhängige Alternativen und typische falsche Lösungen werden ausgeführt. Ein Erfolg bedeutet, dass diese endlichen Fälle bestanden sind; er beweist keine allgemeine Korrektheit, Rekursionsverwendung oder Laufzeitklasse.

## Unterstützter Java-Sprachumfang

Unterstützt sind Methoden mit den Modelltypen `Paket`, `Knoten`, `BaumKnoten`, `InnererKnoten`, `Blatt`, `PaketStapel`, `PaketWarteschlange`, `String` sowie `int`, `double`, `char`, `boolean` und `void`, soweit sie im jeweiligen Aufgabenmodell vorhanden sind. Dazu gehören Blöcke, initialisierte lokale Variablen, Zuweisungen, `if`/`else`, `while`, einfache `for`-Schleifen, `return`, Postfix-Inkremente, kurzschließende Boolesche Ausdrücke, numerische Operationen und ternäre Ausdrücke. Einzelmethoden können als vollständige Methode oder als Rumpf eingegeben werden. Eigene, nicht überladene Hilfsmethoden sind möglich.

Neu sind:

- vollständige Klassen für die vier konkreten Klassenaufgaben, Felder einschließlich kommagetrennter Deklarationen, einfache Feldinitialisierer, Konstruktoren und implizite Standardkonstruktoren;
- Java-Standardwerte für Instanzfelder, insbesondere `null` für Referenzen;
- verschiedene private Feldnamen, Parameter- und lokale Variablennamen;
- öffentliche Schnittstellen wie in den Vorlagen, private Hilfsmethoden sowie Aufrufe über `this` und andere Instanzen;
- getrennte Instanzzustände, echte Referenzidentität und Setterwirkungen;
- Referenzcasts und `instanceof` im bekannten Klassenmodell, einschließlich `null`-Semantik und Laufzeitfehler bei falschem Downcast;
- `String.length()`, `String.charAt(int)`, einfache Zeichenliterale wie `'0'`, Zeichenarithmetik und numerische Casts;
- das Trie-Modell mit abstraktem `Knoten`, `InnererKnoten` mit zehn Kindern und `Blatt` mit vollständigem Schlüssel. Dieses Modell ist vom gleichnamigen Listenknoten getrennt.

`int`-Arithmetik verwendet vorzeichenbehaftete 32-Bit-Werte. Numerische Casts behandeln Java-Ganzzahlgrenzen und Zeichentypen gesondert. String-Referenzvergleiche werden weiterhin nicht durch JavaScript-Inhaltsvergleiche ersetzt; Inhalte können über `equals` verglichen werden.

Die implementierten Konvertierungen und bedingten Ausdrücke wurden mit der Java Language Specification abgeglichen: [Zuweisungs- und Casting-Kontexte](https://docs.oracle.com/javase/specs/jls/se21/html/jls-5.html), [bedingte Ausdrücke und zusammengesetzte Zuweisungen](https://docs.oracle.com/javase/specs/jls/se21/html/jls-15.html). Dazu gehören passende ganzzahlige Zeichenkonstanten und die Auswertungsreihenfolge bei `+=`.

Nicht implementiert sind vollständiges Java, beliebige zusätzliche Klassen/Vererbung, Interfaces, Arrays im Eingabecode, Collections, Generics, Lambdas, Annotations, Imports, Exceptions, Überladungen, Konstruktorverkettung, `switch`, `break`, `continue`, `static`/`final`-Semantik sowie die vollständigen Regeln für implizite Konvertierungen. Komplexe Feldinitialisierung und bisher nicht implementierte lexikalische Varianten bleiben ebenfalls außerhalb des Sprachumfangs. Unicode-Escapes und besondere Zahlenliterale werden konservativ nicht ausgewertet.

**Code außerhalb dieses Sprachumfangs erhält eine neutrale Rückmeldung.** Er wird weder ungeprüft als korrekt noch allein wegen fehlender Interpreterunterstützung als fachlich falsch verbucht. Der Parser ersetzt keinen vollständigen Java-Compiler. Auf dem lokalen Rechner ist kein nutzbarer JDK-Compiler vorhanden; eine zusätzliche javac-Kompilierung ist daher nicht bestätigt.

## Verhaltenstests der sieben reparierten Aufgaben

| Aufgabe | Fälle je Referenz | Schwerpunkte |
|---|---:|---|
| Knotenklasse | 6 | Paketidentität, leerer Nachfolger, Null-Nutzdatum, Nachfolger setzen/ersetzen/löschen, andere Instanz unverändert |
| PaketStapel | 8 | leer, 1/2/5/12 Pakete, LIFO, nicht veränderndes peek, erneutes Befüllen, unabhängige Instanzen, gemischte Folge |
| PaketWarteschlange | 8 | FIFO, front ohne Entnahme, leere Struktur, Endreferenzen nach letzter Entnahme, Wiederbefüllen, unabhängige Instanzen |
| BaumKnoten | 5 | Paket speichern, Kinder starten null, beide Getter lesen getrennte Kindreferenzen |
| Trie-Suche | 95 | vorhanden/fehlend, Präfix ist kein Treffer, führende Nullen, unterschiedliche gemeinsame Schlüssellängen, keine Änderung |
| Trie-Einfügen | 13 | null-/innere Wurzel, neue Pfade, gemeinsame Präfixe, Geschwistererhaltung, Duplikate, rekursiver Einstieg, alle zehn Ziffern |
| Präfixknoten | 84 | leeres Präfix, innerer Knoten, vollständiger Schlüssel/Blatt, fehlender/zu langer Pfad, Referenzidentität, keine Änderung |

Die Tests verwenden konkrete Objekte. Feldnamen werden nicht mit Lösungstexten verglichen. Wo das Aufgabenmodell ausdrücklich `links` und `rechts` vorgibt, werden diese Referenzen im Test entsprechend gesetzt. Umbenannte Felder werden über ihre tatsächlich beobachteten Getterwirkungen geprüft. In Stack/Queue gelten die in der Aufgabe angegebenen Nullreferenzen bei leerer Struktur.

Zusätzliche Hilfsreferenzen werden nicht pauschal als Anfangs-/Endreferenz behandelt. Bei mehreren umbenannten Referenzen, deren Rollen nicht zuverlässig erkennbar sind, bleibt die Bewertung neutral. Die unterstützten Standardmodelle und die getesteten umbenannten Alternativen sind davon nicht betroffen.

## Rückmeldungen, Grenzen und Isolation

Die Zustände **korrekt**, **fachlich falsch**, **unvollständig**, **Eingabeformat fehlerhaft** und **nicht automatisch bewertbar** bleiben getrennt. Ein fehlgeschlagener ausgeführter Fall enthält seinen Kontext. Fehlende Methoden oder Konstruktorparameter werden anders behandelt als ein fachlich falsches Rückgabeergebnis. Kommentare mit korrektem Lösungstext können kein falsch arbeitendes Programm bestehen lassen.

Eingaben sind auf 30.000 Zeichen und 150 Ebenen Syntaxverschachtelung begrenzt. Methoden haben 30.000 Auswertungsschritte je Fall; Klassenfälle verwenden insgesamt 60.000 Schritte für alle zusammengehörigen Instanzen. Aufrufe sind auf 150 Rekursionsebenen begrenzt, ineinander verschachtelte Konstruktionen auf 100. Konstruktoren, Hilfsmethoden und Objektaufrufe teilen dasselbe Budget. Eine erreichte Grenze führt zu einer neutralen Meldung, nicht zu Erfolg. Es gibt keinen Zugriff aus Java-Eingaben auf DOM, Betriebssystem, Netzwerk, `eval`, `Function` oder geerbte JavaScript-Hostmethoden.

## Übrige Aufgaben und Betrieb

Kurzantworten behalten eigene Prüfer für ganze Zahlen, Big-O, geordnete Folgen, ungeordnete Mengen, Positionen und Fachbegriffe. Bei Ja/Nein wird die verlangte Entscheidung bewertet; freie Begründungen werden ausdrücklich nicht semantisch geprüft. Die Queue-Operationsfolge prüft alle acht Operationen und ihre Zwischenzustände.

Die Diagnoseauswertung und Speicherformate bleiben unverändert. Entwürfe und bestätigte Aufgaben werden weiter gespeichert; Hinweise oder das Anzeigen der Lösung bestätigen keine Aufgabe automatisch. Bestehende bestätigte Aufgaben bleiben erhalten. Die neu prüfbaren sieben Aufgaben zählen erst nach einer erfolgreichen tatsächlichen Prüfung zum Fortschritt.

Die gesamte Anwendung bleibt statisch und GitHub-Pages-kompatibel. Es wurden weder Backend noch externe Laufzeitabhängigkeiten hinzugefügt. Kein Push, kein Deployment.
