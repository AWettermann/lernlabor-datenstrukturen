# Fehler- und Lückenprotokoll

Es werden **24 Fehler- und Lückengruppen** der ursprünglichen Prüfung gezählt. Jede Gruppe kann mehrere Stationen und viele verschiedene Eingaben betreffen. Die Zahl bezeichnet keine Anzahl einzelner falscher Antworten. Die sieben früheren technischen Ausnahmen sind inzwischen [korrigiert und funktional getestet](MANUELLE-PRUEFUNG-REPARATUR.md).

| Nr. | Ausgangsbefund | Korrektur und Nachweis |
|---|---|---|
| F01 | Java-Zusatzstationen verlangten Textgleichheit, darunter beide gemeldeten Rekursionen. | 12 Java-Zusatzstationen führen unterstützten Code funktional aus; konkrete gemeldete Eingaben als Regressionen. |
| F02 | Java-Hauptstationen prüften Struktur-/Schlüsselwortmuster ohne verlässliche Prüfung von Rückgaben und Kontrollfluss. | Funktionstests für alle 39 Java-Stationen. Die sieben zunächst ausgenommenen Klassen-/Trie-Stationen besitzen nun einen Klassenparser, Instanzzustand und funktionale Trie-Tests. |
| F03 | Kleinschreibung des gesamten Java-Codes veränderte auch Literale. | Bezeichner und Literale bleiben unverändert; `"stack"` statt `"Stack"` fällt durch. |
| F04 | Entfernte Trennzeichen ließen unterschiedliche Folgen kollidieren: `12,5,7` und `1,2,5,7`. | Typisierte Folgen mit Elementgrenzen; Kollisionsregression. |
| F05 | Ungeordnete Präfixtreffer wurden als geordneter Text geprüft. | Mengenvergleich ohne Reihenfolge, mit Duplikatprüfung. |
| F06 | Erläuterte Musterantworten und Synonyme wurden abgelehnt, etwa `3 (20, 40, 60)`, `Nein. ...` und `Queue (Warteschlange)`. | Alle automatisch prüfbaren Musterlösungen bestehen; gepflegte Synonyme. Unbekannte Freitexte bleiben neutral. |
| F07 | Methodenrumpf und vollständige Methode waren nicht klar unterschieden. | Eindeutiges Eingabeformat und Signaturrahmen; beide Eingaben bei Einzelmethoden möglich. |
| F08 | Die BaumKnoten-Musterlösung enthielt keine vollständige Klassendeklaration. | Vollständige Klasse mit Feldern und Klammern; Konstruktor, Nutzdatenspeicherung und beide Getter werden jetzt mit positiven und negativen Fällen ausgeführt. Ein javac-Durchlauf ist nicht bestätigt. |
| F09 | Sortierkriterium beim Prioritätslager war nicht konkret angegeben. | Gewicht aufsteigend, Einfügen hinter gleiche Gewichte; Tests verschiedener Positionen. |
| F10 | Verhalten bei `einfuegenNach(null, paket)` war nicht festgelegt, obwohl die Referenz diesen Fall behandelt. | Keine Änderung bei null ausdrücklich festgelegt und getestet. |
| F11 | Umgang mit gleichen Suchbaumschlüsseln war nicht beschrieben. | Duplikate rechts festgelegt und getestet; Löschaufgabe verwendet eindeutige Schlüssel. |
| F12 | Voraussetzungen des Trie-Modells und Eingabebereich waren unklar. | Gleich lange Dezimalnummern und vorhandene innere Wurzel; leeres Präfix erlaubt. |
| F13 | Methodenverzeichnis: falsche Klassennamen, `top()` statt `peek()`, falscher Suchrückgabetyp und fehlende Signaturen. | Kapitelverzeichnisse an Aufgaben angepasst, Paket-API ergänzt. |
| F14 | Festes Baumdiagramm widersprach Aufgaben: vier statt drei Blätter, falscher Traversierungsbaum, fehlender Knoten 65. | Aufgabenbezogene Modelle mit korrekten Kindbeziehungen; Trie zeigt vollständige Schlüssel. |
| F15 | Startcheck „Paketkette“ akzeptierte zusätzlich die falsche Verbindung PX → P3. | Exakte Menge der beiden Verbindungen; Extraauswahl verhindert volle Punkte. |
| F16 | Suchdiagnose ignorierte die Klickreihenfolge. | Tatsächlicher Pfad in Klickreihenfolge; Abwählen entfernt den Eintrag. |
| F17 | Einfachauswahlen erlaubten mehrere Markierungen, bewerteten aber nur die erste. | Eine aktive Auswahl in der Oberfläche und exakte Einfachauswahl im Prüfmodell. |
| F18 | Reihenfolgeaufgaben wurden asymmetrisch über Maximum und anschließende Mittelung verrechnet. | Separate Punkte und symmetrischer gerundeter Mittelwert; 0/3 und 3/0 ergeben denselben Wert. |
| F19 | Leere Diagnoseeingaben konnten gespeichert werden; teils erhielten fehlende/falsche Ideen pauschal einen Punkt. | Fehlende Eingaben bleiben offen; Teilpunkte nur für erkennbare Teilideen; Ausgangsfragen müssen vollständig sein. |
| F20 | Nicht erhobene Algorithmen-Kompetenz erschien im Startcheck als gemessene Null. | Fehlender Messwert „–“ und Erklärung im Profil. |
| F21 | Kapitelklicks schlossen eine Diagnose nicht zuverlässig; „Zur Gesamtsicherung“ führte zu Alle. | Diagnose schließen, vorheriges Kapitel bzw. gezielte Gesamtsicherung; Browsertests. |
| F22 | „Einzelschritt“ suggerierte eine Codeausführung, zeigte jedoch unveränderte Modelle. | Funktion als ausdrücklich illustrierender „Strukturhinweis“ erhalten; echte Operationszustände in der Prüfung. |
| F23 | Stationsentwürfe/-bestätigungen fehlten in der Speicherung; Diagnose war gegen Speicherfehler nur teilweise geschützt. | Entwürfe/Bestätigungen speichern, Sitzungskopie bei Sperre/Quota, beschädigte Daten abfangen; Unit- und Browsertests. |
| F24 | Erfolg, fachlicher Fehler, unvollständige Eingabe, Formatfehler und nicht prüfbarer Code waren nicht getrennt. | Fünf Zustände, konkrete Testfälle, neutrale Grenzen und keine falsche Fortschrittsbestätigung. |

Einzelprüfung: [AUFGABENPRUEFUNG.md](AUFGABENPRUEFUNG.md). Verbleibende Grenzen: [BEWERTUNG.md](BEWERTUNG.md).
