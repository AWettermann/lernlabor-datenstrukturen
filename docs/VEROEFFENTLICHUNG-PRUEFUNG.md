# Veröffentlichung des Lernlabors Q1.4

## Erneuter Abgleich am 16.11.2026

Der Repository-Stand hat sich seit dem ersten Versuch geändert: `main` enthält mit Commit `03caf630343bca92199825f3a621d1b9a239aa73` bereits alle 15 lokalen Anwendungs-/Konfigurationsdateien **bytegenau**. Der beim ersten Versuch gemeldete Unterschied ist damit für den aktuellen Auftrag nicht mehr vorhanden.

Die Veröffentlichung wird auf einem frischen Checkout genau dieses bestehenden Repositories vorbereitet. Die vier zusätzlichen Repository-Dateien `abschluss-listen.js`, `extras.js`, `methods.js` und `simulation.js` werden vollständig erhalten. Keine dieser Dateien wird gelöscht oder überschrieben.

Ergänzt werden die im Repository bislang fehlenden Tests, Prüfberichte und Screenshots. `.gitignore` schließt macOS-Metadaten und `node_modules` aus. `.nojekyll` gewährleistet die statische Auslieferung ohne Jekyll-Verarbeitung. Die README erhält die Live-Adresse und einen wiederholbaren HTTP-Abgleich.

Prüfungen im vollständigen Repository-Checkout:

- `npm test`: 528 Tests bestanden, 0 fehlgeschlagen, 0 übersprungen.
- `npm run audit`: alle 64 Lernstationen und 14 Diagnoseaufgaben erfasst; 721 Java-Funktionstestfälle je Referenzdurchlauf.
- `Q14_SCREENSHOTS=0 node tests/browser-test.js`: 22 Prüfungen bestanden, 0 JavaScript-Ausnahmen. Nach einem lokalen Speicherplatzfehler wurde der Lauf ohne neue Screenshot-Dateien wiederholt; sämtliche Funktions- und Layoutprüfungen bleiben aktiv.
- Alle sieben früher ausgeschlossenen Aufgaben bestehen mit Referenz und Alternative; ihre Fehlprogramme werden erkannt.
- Der Checkout enthält die Layoutverbesserungen, Eingangs-/Ausgangsdiagnose, Speicherung und Tastaturbedienung.
- Das Stylesheet ist unverändert; die zusätzliche Browserprüfung deckt acht Bildschirmbreiten sowie den GitHub-Pages-Unterpfad ab.

GitHub Pages verwendet weiterhin `main` und den Pfad `/`. Vor dem erneuten Push meldete der bestehende Pages-Build bereits `built` für `03caf630343bca92199825f3a621d1b9a239aa73`.

Für die abschließende Prüfung wird nach dem Push der erfolgreiche Pages-Build dem erzeugten Commit zugeordnet. `tests/verify-pages.js` vergleicht die Live-Dateien mit diesem Checkout per SHA-256, einschließlich Skripten, Stylesheet, README, Prüfskript und diesem Bericht. Der konkrete Commit und der abschließende Status werden in der Rückmeldung zur Veröffentlichung genannt.

Die Anwendungsgrenze bleibt unverändert: Der Java-Prüfer unterstützt den dokumentierten Sprachumfang, keinen vollständigen Java-Compiler. Unbekannte Erweiterungen werden neutral behandelt. Der frühere Funktionsstand mit Export/Import ist unter dem Vorgänger-Commit im Git-Verlauf erhalten; die aktuelle Anwendung wurde bereits vom Repository-Inhaber mit `03caf63` übernommen.

## Historisch: erster Veröffentlichungsversuch

Die folgende Prüfung beschreibt ausschließlich den vorherigen Stand `fa932fc`, vor dem zwischenzeitlichen Upload auf `main`.

# Veröffentlichungsprüfung – Push wegen inhaltlichem Konflikt gestoppt

Prüfdatum: 16.11.2026. Ziel: bestehendes Repository `AWettermann/lernlabor-datenstrukturen`, GitHub Pages unter <https://awettermann.github.io/lernlabor-datenstrukturen/>.

## Ergebnis

**Es wurde nichts veröffentlicht. Es wurde kein Commit angelegt, kein Branch verändert und nichts gepusht.**

Der bestehende Repository-Stand enthält aktive Funktionen und Aufgaben, die in der lokalen Fassung nicht vorhanden sind. Ein Ersetzen der Hauptdateien würde diese Funktionen entfernen. Entsprechend der Vorgabe „Falls Konflikte auftreten … stoppe den Push und melde das Problem“ wurde vor jeder schreibenden GitHub-Aktion gestoppt.

Der lokale Projektordner enthält keine `.git`-Metadaten und ist kein Checkout des Zielrepositories. Deshalb besteht keine lokale gemeinsame Git-Basis für eine automatische Dreiwege-Zusammenführung. Der Konflikt wurde durch den Abgleich der konkreten Dateien und Funktionen festgestellt.

## Festgestellte Unterschiede

| Bereich | Bestehender Repository-/Live-Stand | Lokale Fassung / Risiko beim Ersetzen |
|---|---|---|
| Arbeitsstände | `app.js` speichert Code, Hilfestufe und Prüfstand in `q14_work_v5`; `index.html` und `app.js` bieten JSON-Export/-Import. | Lokale Speicherung in `q14_lab_v2`; Export/Import und Übernahme alter `q14_work_v5`-Daten fehlen. Bestehende Arbeitsstände wären in der neuen Oberfläche nicht verfügbar. |
| Modellabläufe | `simulation.js` ist aktiv eingebunden und zeigt mehrere konkrete Referenz-/Besuchszustände für Listen, Stack, Queue und Bäume. | Lokale Oberfläche zeigt Strukturmodelle und Strukturhinweise; die bestehenden dynamischen Abläufe würden entfallen. |
| Zusätzliche Aufgaben | `extras.js` ist aktiv eingebunden. Fünf zusätzliche Aufgaben stehen in einem eigenen optionalen Bereich. Darunter Grundlagenreflexion, Sammeln von Präfixtreffern und eine LK-Transferaufgabe mit 20 Punkten. | Lokale Fassung enthält 64 Stationen, aber keine Aufgaben mit den Prüfarten `reflection`, `prefixCollect` oder `transfer` und keinen entsprechenden optionalen Bereich. Mehr Aufgaben insgesamt bedeutet daher keine vollständige Übernahme des Bestands. |
| Aufgabenorganisation | Bestehende README beschreibt 28 Wiki-Stationen und fünf separat geführte Zusatzstationen. | Lokal stehen 28 Hauptstationen und 36 Zusatzstationen innerhalb der Kapitel zur Verfügung. Die Zuordnung zu vorhandenen Arbeitsständen und Wiki-Stationen muss vor der Veröffentlichung abgeglichen werden. |

Quellen am unveränderten Repository-Commit:

- [Bestehendes app.js mit Speicherung und Export/Import](https://github.com/AWettermann/lernlabor-datenstrukturen/blob/fa932fc6fe78d1b4b07680e2f34dbdd2eae85531/app.js)
- [Aktive Skripteinbindung und Export-/Import-Oberfläche](https://github.com/AWettermann/lernlabor-datenstrukturen/blob/fa932fc6fe78d1b4b07680e2f34dbdd2eae85531/index.html)
- [Dynamische Modellabläufe](https://github.com/AWettermann/lernlabor-datenstrukturen/blob/fa932fc6fe78d1b4b07680e2f34dbdd2eae85531/simulation.js)
- [Optionale Aufgaben](https://github.com/AWettermann/lernlabor-datenstrukturen/blob/fa932fc6fe78d1b4b07680e2f34dbdd2eae85531/extras.js)
- [Bestehende Versions-/Funktionsbeschreibung](https://github.com/AWettermann/lernlabor-datenstrukturen/blob/fa932fc6fe78d1b4b07680e2f34dbdd2eae85531/README.md)

## Erneute lokale Prüfungen

- `npm test`: **528 bestanden**, 0 fehlgeschlagen, 0 übersprungen. Ausgabe: [publish-unit-test-output.txt](../tests/artifacts/publish-unit-test-output.txt).
- `npm run audit`: abschließend erfolgreich; alle **64 Lernstationen** und **14 Diagnoseaufgaben** erfasst. Alle sieben früher ausgeschlossenen Aufgaben sind korrigiert, insgesamt **721 Java-Funktionstestfälle** je Referenzdurchlauf.
- `node tests/browser-test.js`: **22 Prüfungen bestanden**, **0 JavaScript-Ausnahmen**. Navigation, Eingaben, Hinweise, Diagnose, Speicherung, Bildschirmgrößen, Kontraste und GitHub-Pages-Unterpfad geprüft. Ausgabe: [Browserbericht](../tests/artifacts/manual-repair-browser-report.json).

Der Audit musste nach einem vorübergehenden Dateisystemfehler `ENOSPC` wiederholt werden. Die vorhandene Prüfübersicht blieb gültig; der erneute Audit war erfolgreich. Es wurden keine fremden Dateien zum Freigeben von Speicherplatz gelöscht.

Die vorhandene Testsuite bestätigt die lokale Fassung. Sie deckt die oben genannten, dort fehlenden Repository-Funktionen nicht ab und bestätigt deshalb keine verlustfreie Integration des Online-Bestands.

## GitHub-Pages-Status

- Konfiguration über GitHub API gelesen: klassischer Branch-Build (`legacy`), **Branch `main`, Pfad `/`**.
- Aktueller Repository-Head und letzter erfolgreicher Pages-Build: **`fa932fc6fe78d1b4b07680e2f34dbdd2eae85531`**.
- Pages-Build: **`built`**, ohne gemeldeten Fehler; letzter Build am 01.11.2026 um 14:44:05 Uhr MEZ.
- Öffentliche Adresse beim HTTP-Abruf: **HTTP 200**. Die Seite bindet weiterhin die bestehenden Skripte ein.
- Dies ist die **bisherige Veröffentlichung**, kein Deployment der lokal überarbeiteten Version.

## Vor einer Veröffentlichung erforderlich

Die beiden Funktionsstände müssen auf Basis eines Checkouts des bestehenden Repositories zusammengeführt werden. Dabei sind Export/Import, Arbeitsstand-Migration, die vorhandenen optionalen Aufgaben und Modellabläufe zu erhalten. Anschließend sind Integration und bestehende Funktionen gemeinsam zu testen. Erst danach kann ein Commit auf dem Pages-Branch veröffentlicht werden.

Die lokale Überarbeitung bleibt vollständig erhalten. Es wurde kein neues Repository erstellt und kein fremder Stand überschrieben.
