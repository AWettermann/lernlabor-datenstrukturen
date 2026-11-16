# Vollständige Aufgabenprüfung Q1.4

Stand: lokale Überarbeitung, 16.11.2026. Generiert mit `npm run audit`. Quellen: `tasks.js`, `assessment.js`, `functional-cases.js`, `diagnostic-model.js` und die unabhängigen Alternativen aus `tests/`.

**78 Aufgaben untersucht:** 64 Lernstationen (28 bisherige Hauptstationen und 36 Zusatzstationen), 7 Eingangs- und 7 Ausgangsdiagnosen. Keine Aufgabe wurde entfernt.

**64 Lernstationen automatisch geprüft:** 39 Java-Stationen mit 721 konkreten Funktionstestfällen je vollständigem Durchlauf der Referenzlösungen, 24 typisierte Kurzantworten und eine Operationsfolge mit acht geprüften Zwischenzuständen. Für alle Stationen sind Musterlösung, mindestens eine korrekte Alternative, eine falsche Eingabe und die leere Eingabe geprüft.

**Alle sieben früher ausgeschlossenen Stationen repariert:** Klassen, Konstruktoren, Feldinitialisierung, Casts, instanceof und Zeichenoperationen sind im dokumentierten Sprachumfang funktional prüfbar. Es gibt keine pauschal ausgeschlossene Aufgabe mehr. Unbekannte Java-Erweiterungen bleiben ausdrücklich unbewertet; die Auswertung ist weiterhin kein vollständiger Java-Compiler. Details: [Reparaturbericht](MANUELLE-PRUEFUNG-REPARATUR.md).

Die Anzahl der gefundenen Fehler ist als **24 dokumentierte Fehler- und Lückengruppen** definiert, nicht als Zahl jeder einzelnen betroffenen Eingabe. Siehe [Fehlerprotokoll](FEHLERPROTOKOLL.md).

## Übersicht aller Lernstationen

| ID | Kapitel | Aufgabe | Prüfmethode | Muster | Alternative | Falschversuch | Leer | Fälle |
|---|---|---|---|---|---|---|---|---|
| task-01 | list | Aufgabe 8 – Die Klasse Knoten entwickeln | functional | korrekt | korrekt | fachlich falsch | unvollständig | 6 |
| task-02 | list | Aufgabe 12 – Traversieren einer linearen Liste | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-03 | list | Aufgabe 13 – Einen Knoten einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 7 |
| task-04 | list | Aufgabe 14 – Am Anfang einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-05 | list | Aufgabe 16 – Das erste Element löschen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-06 | list | Aufgabe 17 – Algorithmus entwickeln | functional | korrekt | korrekt | fachlich falsch | unvollständig | 7 |
| task-07 | list | Aufgabe 19 – Aktualisieren | functional | korrekt | korrekt | fachlich falsch | unvollständig | 7 |
| task-08 | list | Aufgabe 26 – Sortiert einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-09 | list | Einfügen zwischen zwei Knoten | functional | korrekt | korrekt | fachlich falsch | unvollständig | 2 |
| task-10 | list | Am Listenanfang einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-11 | list | Ersten Knoten entfernen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 2 |
| task-12 | list | Laufzeit einer Listensuche | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-13 | stack | Aufgabe 3 – `push()` entwickeln | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-14 | stack | Aufgabe 4 – `pop()` entwickeln | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-15 | stack | Aufgabe 5 – Stack vervollständigen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 8 |
| task-16 | stack | Stack-Zustand vorhersagen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-17 | stack | push: Referenzen richtig setzen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-18 | stack | pop bei leerem Stapel | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-19 | queue | Aufgabe 11 – `enqueue()` entwickeln | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-20 | queue | Aufgabe 13 – Sonderfall analysieren | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-21 | queue | Aufgabe 14 – Klasse vervollständigen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 8 |
| task-22 | queue | Aufgabe 15 – Zustände nachvollziehen | operations | korrekt | korrekt | fachlich falsch | unvollständig | 8 |
| task-23 | queue | Aufgabe 16 – Fehleranalyse | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-24 | queue | Queue-Zustand vorhersagen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-25 | queue | Letztes Element entnehmen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 3 |
| task-26 | queue | Queue: Einfügen am Ende | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-27 | tree | Binärbaum – Knoten modellieren | functional | korrekt | korrekt | fachlich falsch | unvollständig | 5 |
| task-28 | tree | Binärbaum – Anzahl der Knoten | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-29 | tree | Blätter zählen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-30 | tree | Blätter rekursiv zählen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-31 | tree | Baumhöhe berechnen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-32 | tree | Gesamtgewicht berechnen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-33 | traversal | Inorder-Traversierung implementieren | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-34 | traversal | Traversierungsart erkennen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-35 | traversal | Preorder bestimmen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-36 | traversal | Inorder bestimmen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-37 | traversal | Postorder bestimmen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-38 | traversal | Postorder programmieren | functional | korrekt | korrekt | fachlich falsch | unvollständig | 52 |
| task-39 | bst | Im binären Suchbaum suchen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 44 |
| task-40 | bst | In den Suchbaum einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 6 |
| task-41 | bst | Suchweg 65 | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-42 | bst | Suchbaum prüfen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-43 | bst | Einfügeposition finden | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-44 | bst | Entarteter Suchbaum | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-45 | bst2 | Inorder-Nachfolger finden | functional | korrekt | korrekt | fachlich falsch | unvollständig | 4 |
| task-46 | bst2 | Löschalgorithmus ergänzen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 11 |
| task-47 | bst2 | Blatt löschen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-48 | bst2 | Knoten mit einem Kind löschen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-49 | bst2 | Inorder-Nachfolger bestimmen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-50 | bst2 | Schlüsseländerung beurteilen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-51 | bst2 | Laufzeit der Löschung | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-52 | trie | Im Trie suchen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 95 |
| task-53 | trie | Rekursiv in den Trie einfügen | functional | korrekt | korrekt | fachlich falsch | unvollständig | 13 |
| task-54 | trie | Präfixknoten finden | functional | korrekt | korrekt | fachlich falsch | unvollständig | 84 |
| task-55 | trie | Präfixe erkennen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-56 | trie | Trie-Suchweg | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-57 | trie | Anzahl möglicher Kinder | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-58 | trie | Laufzeit der exakten Trie-Suche | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-59 | trie | Präfixsuche bewerten | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-60 | review | Welche Datenstruktur für welches Problem? | functional | korrekt | korrekt | fachlich falsch | unvollständig | 7 |
| task-61 | review | FIFO auswählen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-62 | review | Undo auswählen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-63 | review | Ungeeigneten Suchschlüssel erkennen | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |
| task-64 | review | Trie oder Suchbaum | answer | korrekt | korrekt | fachlich falsch | unvollständig | 1 |

## Einzelprüfung: Erwartung, Eingabeformat, Hinweise und Beispiele

Die jeweiligen Funktionsfälle stehen zusätzlich vollständig im maschinenlesbaren Bericht. Bei freien Begründungen prüft das Labor nur die ausdrücklich verlangte Ja-/Nein-Entscheidung. Freie Umschreibungen außerhalb eines bekannten Antwortformats bleiben unbewertet.

### task-01 – Aufgabe 8 – Die Klasse Knoten entwickeln

Implementieren Sie die Klasse Knoten. Ein Knoten speichert ein Paket und eine Referenz auf den nächsten Knoten. Übernehmen Sie die öffentliche Schnittstelle (public) der Vorlage. Private Feldnamen und lokale Variablen dürfen anders heißen. Ein neuer Knoten hat keinen Nachfolger. Der Setter verändert nur die Nachfolgerreferenz; das übergebene Paketobjekt bleibt erhalten.

Eingabe: Vollständige Klasse Knoten mit der öffentlichen Schnittstelle aus der Vorlage. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public class Knoten {
    private Paket paket;
    private Knoten naechster;

    public Knoten(Paket paket) {
        this.paket = paket;
        this.naechster = null;
    }

    public Paket getPaket() {
        return paket;
    }

    public Knoten getNaechster() {
        return naechster;
    }

    public void setNaechster(Knoten naechster) {
        this.naechster = naechster;
    }
}
```

Geprüfte korrekte Alternative:

```java
public class Knoten {
    private Paket inhalt;
    private Knoten folge;
    public Knoten(Paket daten) { inhalt=daten; }
    public Paket getPaket() { Paket ergebnis=inhalt; return ergebnis; }
    public Knoten getNaechster() { return folge; }
    public void setNaechster(Knoten ziel) { if(folge!=ziel) folge=ziel; }
  }
```

Geprüfter Falschversuch:

```java
public class Knoten {
    private Paket paket;
    private Knoten naechster;

    public Knoten(Paket paket) {
        this.paket = paket;
        this.naechster = null;
    }

    public Paket getPaket() {
        return null;
    }

    public Knoten getNaechster() {
        return naechster;
    }

    public void setNaechster(Knoten naechster) {
        this.naechster = naechster;
    }
}
```

Hinweise: 1. Welche zwei Informationen muss ein Knoten speichern? · 2. Ein neuer Knoten hat zunächst noch keinen Nachfolger. · 3. Die Getter geben Nutzdaten bzw. Nachfolger zurück; der Setter verändert nur die Nachfolgerreferenz. · 4. this.paket = paket; this.naechster = null;

### task-02 – Aufgabe 12 – Traversieren einer linearen Liste

Implementieren Sie die Traversierungsmethoden anzahlPakete(), gesamtGewicht(), zaehlePaketeNach(String zielort) und suchePaket(String paketnummer).

Eingabe: Die vier vollständigen Methoden. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public int anzahlPakete() {
    int anzahl = 0;
    Knoten aktuell = erster;
    while (aktuell != null) {
        anzahl++;
        aktuell = aktuell.getNaechster();
    }
    return anzahl;
}

public double gesamtGewicht() {
    double summe = 0;
    Knoten aktuell = erster;
    while (aktuell != null) {
        summe += aktuell.getPaket().getGewicht();
        aktuell = aktuell.getNaechster();
    }
    return summe;
}

public int zaehlePaketeNach(String zielort) {
    int anzahl = 0;
    Knoten aktuell = erster;
    while (aktuell != null) {
        if (aktuell.getPaket().getZielort().equals(zielort)) anzahl++;
        aktuell = aktuell.getNaechster();
    }
    return anzahl;
}

public Paket suchePaket(String paketnummer) {
    Knoten aktuell = erster;
    while (aktuell != null) {
        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) return aktuell.getPaket();
        aktuell = aktuell.getNaechster();
    }
    return null;
}
```

Geprüfte korrekte Alternative:

```java
public int anzahlPakete() { int n=0; for (Knoten lauf=erster; lauf!=null; lauf=lauf.getNaechster()) n++; return n; }
    public double gesamtGewicht() { double total=0; for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) total=total+lauf.getPaket().getGewicht(); return total; }
    public int zaehlePaketeNach(String ort) { int n=0; for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) if(ort.equals(lauf.getPaket().getZielort())) n++; return n; }
    public Paket suchePaket(String nummer) { for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) if(nummer.equals(lauf.getPaket().getPaketnummer())) return lauf.getPaket(); return null; }
```

Geprüfter Falschversuch:

```java
int anzahlPakete() { return 0; }
double gesamtGewicht() { return 0; }
int zaehlePaketeNach(String zielort) { return 0; }
Paket suchePaket(String paketnummer) { return null; }
```

Hinweise: 1. Alle vier Methoden benötigen dasselbe Grundmuster: eine Laufreferenz vom ersten Knoten bis null. · 2. Start: Knoten aktuell = erster; Bedingung: while (aktuell != null). · 3. Vergessen Sie am Ende eines Schleifendurchlaufs nicht: aktuell = aktuell.getNaechster(); · 4. Bei der Suche kann sofort zurückgegeben werden, sobald die Paketnummer übereinstimmt.

### task-03 – Aufgabe 13 – Einen Knoten einfügen

Implementieren Sie public void einfuegenNach(Knoten aktuell, Paket paket). Der neue Knoten soll direkt hinter aktuell eingefügt werden. Ist aktuell null, bleibt die Liste unverändert.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void einfuegenNach(Knoten aktuell, Paket paket) {
    if (aktuell == null) return;
    Knoten neu = new Knoten(paket);
    neu.setNaechster(aktuell.getNaechster());
    aktuell.setNaechster(neu);
}
```

Geprüfte korrekte Alternative:

```java
if(aktuell!=null) { Knoten rest=aktuell.getNaechster(); aktuell.setNaechster(new Knoten(paket)); aktuell.getNaechster().setNaechster(rest); }
```

Geprüfter Falschversuch:

```java
void einfuegenNach(Knoten aktuell,Paket paket) {  }
```

Hinweise: 1. Die bisherige Verbindung hinter aktuell darf nicht verloren gehen. · 2. Der neue Knoten muss zuerst auf den bisherigen Nachfolger zeigen. · 3. Erst danach darf aktuell auf neu umgehängt werden. · 4. Knoten neu = new Knoten(paket); neu.setNaechster(aktuell.getNaechster()); aktuell.setNaechster(____);

### task-04 – Aufgabe 14 – Am Anfang einfügen

Implementieren Sie public void vorneEinfuegen(Paket paket). Das neue Paket soll zum ersten Element der Liste werden.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void vorneEinfuegen(Paket paket) {
    Knoten neu = new Knoten(paket);
    neu.setNaechster(erster);
    erster = neu;
}
```

Geprüfte korrekte Alternative:

```java
Knoten alt=erster; erster=new Knoten(paket); erster.setNaechster(alt);
```

Geprüfter Falschversuch:

```java
void vorneEinfuegen(Paket paket) {  }
```

Hinweise: 1. Welche Referenz bezeichnet den Anfang der Liste? · 2. Der neue Knoten muss auf den bisherigen ersten Knoten zeigen. · 3. Danach wird erster auf den neuen Knoten gesetzt. · 4. Knoten neu = new Knoten(paket); neu.setNaechster(____); ____ = neu;

### task-05 – Aufgabe 16 – Das erste Element löschen

Entwickeln Sie die Referenzänderung zum Löschen des ersten Elements. Die Methode soll bei einer leeren Liste sicher funktionieren.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public boolean erstesLoeschen() {
    if (erster == null) {
        return false;
    }
    erster = erster.getNaechster();
    return true;
}
```

Geprüfte korrekte Alternative:

```java
if(erster!=null) { erster=erster.getNaechster(); return true; } else { return false; }
```

Geprüfter Falschversuch:

```java
boolean erstesLoeschen() { return false; }
```

Hinweise: 1. Was muss bei einer leeren Liste passieren? · 2. Zum Löschen des ersten Knotens ist kein Durchlaufen nötig. · 3. erster muss auf den Nachfolger des bisherigen ersten Knotens zeigen. · 4. if (erster == null) return false; erster = __________; return true;

### task-06 – Aufgabe 17 – Algorithmus entwickeln

Implementieren Sie public boolean loeschePaket(String paketnummer). Berücksichtigen Sie leere Liste, erstes Element, Element innerhalb der Liste und „nicht gefunden“.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public boolean loeschePaket(String paketnummer) {
    Knoten vorher = null;
    Knoten aktuell = erster;

    while (aktuell != null) {
        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {
            if (vorher == null) {
                erster = aktuell.getNaechster();
            } else {
                vorher.setNaechster(aktuell.getNaechster());
            }
            return true;
        }
        vorher = aktuell;
        aktuell = aktuell.getNaechster();
    }
    return false;
}
```

Geprüfte korrekte Alternative:

```java
public boolean loeschePaket(String nummer) { if(erster==null) return false; if(nummer.equals(erster.getPaket().getPaketnummer())) { erster=erster.getNaechster(); return true; } Knoten vor=erster; while(vor.getNaechster()!=null) { Knoten kandidat=vor.getNaechster(); if(nummer.equals(kandidat.getPaket().getPaketnummer())) { vor.setNaechster(kandidat.getNaechster()); return true; } vor=kandidat; } return false; }
```

Geprüfter Falschversuch:

```java
boolean loeschePaket(String paketnummer) { return false; }
```

Hinweise: 1. Sie benötigen beim Durchlaufen zwei Referenzen: aktuell und vorher. · 2. vorher == null bedeutet: Das gefundene Paket ist das erste Element. · 3. Innerhalb der Liste muss vorher den Nachfolger von aktuell übernehmen. · 4. Nach jedem erfolglosen Vergleich: vorher = aktuell; aktuell = aktuell.getNaechster();

### task-07 – Aufgabe 19 – Aktualisieren

Implementieren Sie public boolean aktualisiereStatus(String paketnummer, String neuerStatus). Die Referenzstruktur der Liste soll dabei unverändert bleiben.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public boolean aktualisiereStatus(String paketnummer, String neuerStatus) {
    Knoten aktuell = erster;
    while (aktuell != null) {
        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {
            aktuell.getPaket().setStatus(neuerStatus);
            return true;
        }
        aktuell = aktuell.getNaechster();
    }
    return false;
}
```

Geprüfte korrekte Alternative:

```java
public boolean aktualisiereStatus(String nr,String status) { for(Knoten lauf=erster;lauf!=null;lauf=lauf.getNaechster()) { Paket p=lauf.getPaket(); if(nr.equals(p.getPaketnummer())) { p.setStatus(status); return true; } } return false; }
```

Geprüfter Falschversuch:

```java
boolean aktualisiereStatus(String paketnummer,String neuerStatus) { return false; }
```

Hinweise: 1. Gesucht wird ein Paket – nicht ein Knoten zum Umhängen. · 2. Durchlaufen Sie die Liste bis die Paketnummer übereinstimmt. · 3. Ändern Sie anschließend nur die Nutzdaten des Paket-Objekts. · 4. Kein setNaechster() ist nötig. Verwenden Sie setStatus(neuerStatus).

### task-08 – Aufgabe 26 – Sortiert einfügen

Implementieren Sie sortiertEinfuegen(Paket paket). Die Liste soll aufsteigend nach Paketgewicht geordnet bleiben. Bei gleichem Gewicht wird das neue Paket hinter den bereits vorhandenen Paketen dieses Gewichts eingefügt.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void sortiertEinfuegen(Paket paket) {
    Knoten neu = new Knoten(paket);

    if (erster == null || paket.getGewicht() < erster.getPaket().getGewicht()) {
        neu.setNaechster(erster);
        erster = neu;
        return;
    }

    Knoten aktuell = erster;
    while (aktuell.getNaechster() != null &&
           aktuell.getNaechster().getPaket().getGewicht() <= paket.getGewicht()) {
        aktuell = aktuell.getNaechster();
    }

    neu.setNaechster(aktuell.getNaechster());
    aktuell.setNaechster(neu);
}
```

Geprüfte korrekte Alternative:

```java
Knoten neuer=new Knoten(paket); Knoten vor=null; Knoten lauf=erster; while(lauf!=null && lauf.getPaket().getGewicht()<=paket.getGewicht()) { vor=lauf; lauf=lauf.getNaechster(); } neuer.setNaechster(lauf); if(vor==null) erster=neuer; else vor.setNaechster(neuer);
```

Geprüfter Falschversuch:

```java
void sortiertEinfuegen(Paket paket) {  }
```

Hinweise: 1. Zuerst muss die richtige Einfügeposition gefunden werden. · 2. Behandeln Sie die leere Liste und das Einfügen vor dem ersten Element als Sonderfall. · 3. Laufen Sie so lange weiter, wie der nächste Knoten noch vor das neue Paket gehört. · 4. Beim eigentlichen Einfügen gilt wieder: neu zuerst mit dem bisherigen Nachfolger verbinden, danach aktuell auf neu setzen.

### task-09 – Einfügen zwischen zwei Knoten

P1 → P2 → P3. PX soll zwischen P1 und P2 eingefügt werden. Ergänzen Sie die beiden Java-Anweisungen mit neu als PX-Knoten und aktuell als P1.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
neu.setNaechster(aktuell.getNaechster());
aktuell.setNaechster(neu);
```

Geprüfte korrekte Alternative:

```java
Knoten rest=aktuell.getNaechster(); aktuell.setNaechster(neu); neu.setNaechster(rest);
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Zuerst die alte Verbindung sichern, danach umhängen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-10 – Am Listenanfang einfügen

Ergänzen Sie den Code zum Einfügen des Knotens neu am Listenanfang.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
neu.setNaechster(erster);
erster = neu;
```

Geprüfte korrekte Alternative:

```java
Knoten alt=erster; erster=neu; neu.setNaechster(alt);
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Der neue Knoten verweist zunächst auf den bisherigen ersten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-11 – Ersten Knoten entfernen

Eine nicht leere Liste besitzt die Referenz erster. Schreiben Sie die Anweisung, mit der der erste Knoten aus der Liste entfernt wird.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
erster = erster.getNaechster();
```

Geprüfte korrekte Alternative:

```java
Knoten zweiter=erster.getNaechster(); erster=zweiter;
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Die Referenz erster muss auf den bisherigen Nachfolger zeigen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-12 – Laufzeit einer Listensuche

Eine unsortierte verkettete Liste enthält n Elemente. Geben Sie die Worst-Case-Laufzeit für die Suche nach einer Paketnummer an (Big-O).

Eingabe: Laufzeit in Big-O-Schreibweise, z. B. O(n). Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
O(n)
```

Geprüfte korrekte Alternative:

```text
o ( n )
```

Geprüfter Falschversuch:

```text
O(1)
```

Hinweise: 1. Im ungünstigsten Fall müssen alle Knoten betrachtet werden. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-13 – Aufgabe 3 – `push()` entwickeln

Das Paket P400 soll auf den Stack gelegt werden. d) Implementieren Sie anschließend public void push(Paket paket).

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void push(Paket paket) {
    Knoten neu = new Knoten(paket);
    neu.setNaechster(oben);
    oben = neu;
}
```

Geprüfte korrekte Alternative:

```java
Knoten alt=oben; oben=new Knoten(paket); oben.setNaechster(alt);
```

Geprüfter Falschversuch:

```java
void push(Paket paket) {  }
```

Hinweise: 1. Welche Referenz muss nach push() auf den neuen Knoten zeigen? · 2. Der neue Knoten muss zuerst auf das bisherige oberste Element zeigen. · 3. Pseudocode: Knoten erzeugen → Nachfolger auf oben setzen → oben auf neuen Knoten setzen. · 4. Knoten neu = new Knoten(paket); neu.setNaechster(________); ________ = neu;

### task-14 – Aufgabe 4 – `pop()` entwickeln

Das oberste Paket soll entnommen werden. d) Implementieren Sie public Paket pop(). Für einen leeren Stack soll null zurückgegeben werden.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public Paket pop() {
    if (oben == null) {
        return null;
    }
    Paket paket = oben.getPaket();
    oben = oben.getNaechster();
    return paket;
}
```

Geprüfte korrekte Alternative:

```java
Knoten alt=oben; if(alt==null) return null; oben=alt.getNaechster(); return alt.getPaket();
```

Geprüfter Falschversuch:

```java
Paket pop() { return null; }
```

Hinweise: 1. Was muss passieren, wenn oben == null ist? · 2. Speichern Sie das Paket des obersten Knotens, bevor Sie die Referenz verändern. · 3. Pseudocode: leer? → Paket merken → oben auf Nachfolger setzen → Paket zurückgeben. · 4. if (oben == null) return null; Paket paket = oben.getPaket(); oben = __________; return paket;

### task-15 – Aufgabe 5 – Stack vervollständigen

Implementieren Sie die gesamte Klasse PaketStapel. Berücksichtigen Sie insbesondere den leeren Stack. Übernehmen Sie die öffentliche Schnittstelle (public) der Vorlage. Private Feldnamen und lokale Variablen dürfen anders heißen. pop() und peek() liefern bei leerem Stack null. peek() verändert den Stack nicht; isEmpty() gibt den tatsächlichen Leerzustand zurück.

Eingabe: Vollständige Klasse PaketStapel mit der öffentlichen Schnittstelle aus der Vorlage. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public class PaketStapel {
    private Knoten oben;

    public PaketStapel() {
        oben = null;
    }

    public void push(Paket paket) {
        Knoten neu = new Knoten(paket);
        neu.setNaechster(oben);
        oben = neu;
    }

    public Paket pop() {
        if (oben == null) return null;
        Paket paket = oben.getPaket();
        oben = oben.getNaechster();
        return paket;
    }

    public Paket peek() {
        if (oben == null) return null;
        return oben.getPaket();
    }

    public boolean isEmpty() {
        return oben == null;
    }
}
```

Geprüfte korrekte Alternative:

```java
public class PaketStapel {
    private Knoten spitze;
    public void push(Paket daten) { Knoten alt=spitze; spitze=new Knoten(daten); spitze.setNaechster(alt); }
    public Paket pop() { Knoten alt=spitze; if(alt==null)return null; spitze=alt.getNaechster(); return alt.getPaket(); }
    public Paket peek() { return spitze==null ? null : spitze.getPaket(); }
    public boolean isEmpty() { return !(spitze!=null); }
  }
```

Geprüfter Falschversuch:

```java
public class PaketStapel {
    private Knoten oben;

    public PaketStapel() {
        oben = null;
    }

    public void push(Paket paket) {
        Knoten neu = new Knoten(paket);
        neu.setNaechster(oben);
        oben = neu;
    }

    public Paket pop() {
        if (oben == null) return null;
        Paket paket = oben.getPaket();
        oben = oben.getNaechster();
        return paket;
    }

    public Paket peek() {
        if (oben == null) return null;
        return oben.getPaket();
    }

    public boolean isEmpty() {
        return false;
    }
}
```

Hinweise: 1. Beginnen Sie mit push() und pop(). Beide verändern nur die Referenz oben. · 2. peek() darf den Stack nicht verändern. isEmpty() benötigt nur einen Vergleich. · 3. Prüfen Sie bei pop() und peek() jeweils den leeren Stack. · 4. Verwenden Sie bei push(): neu.setNaechster(oben); oben = neu; und behandeln Sie bei pop()/peek() oben == null.

### task-16 – Stack-Zustand vorhersagen

Anfangs leer. push(P1), push(P2), push(P3), pop(), push(P4). Geben Sie die Pakete von oben nach unten an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
P4,P2,P1
```

Geprüfte korrekte Alternative:

```text
[P4 ; P2 ; P1]
```

Geprüfter Falschversuch:

```text
P1,P2,P4
```

Hinweise: 1. Bei pop wird das zuletzt abgelegte Paket entfernt. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-17 – push: Referenzen richtig setzen

Der neue Knoten heißt neu, die Spitze oben. Schreiben Sie die zwei Referenzzuweisungen für push in der korrekten Reihenfolge.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
neu.setNaechster(oben);
oben = neu;
```

Geprüfte korrekte Alternative:

```java
Knoten alt=oben; oben=neu; neu.setNaechster(alt);
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Zuerst den bisherigen Stapel mit neu verbinden. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-18 – pop bei leerem Stapel

Ergänzen Sie einen geeigneten Basisfall für pop(), wenn bei leerem Stapel null zurückgegeben werden soll.

Eingabe: Java-Anweisungsfragment; danach folgt return oben.getPaket();. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
if (oben == null) return null;
```

Geprüfte korrekte Alternative:

```java
if(null == oben) { return null; }
```

Geprüfter Falschversuch:

```java
;
```

Hinweise: 1. Ein leerer Stapel hat keine Spitze. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-19 – Aufgabe 11 – `enqueue()` entwickeln

Ein neues Paket soll hinten eingefügt werden. d) Implementieren Sie unter Berücksichtigung der leeren und der nicht leeren Queue public void enqueue(Paket paket).

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void enqueue(Paket paket) {
    Knoten neu = new Knoten(paket);
    if (vorne == null) {
        vorne = neu;
        hinten = neu;
    } else {
        hinten.setNaechster(neu);
        hinten = neu;
    }
}
```

Geprüfte korrekte Alternative:

```java
Knoten neuer=new Knoten(paket); if(hinten!=null) hinten.setNaechster(neuer); else vorne=neuer; hinten=neuer;
```

Geprüfter Falschversuch:

```java
void enqueue(Paket paket) {  }
```

Hinweise: 1. Was ist bei einer leeren Queue besonders? · 2. Nach dem ersten enqueue() müssen vorne und hinten auf denselben Knoten zeigen. · 3. Nicht leer: hinten.setNaechster(neu), danach hinten = neu. Leer: vorne = neu und hinten = neu. · 4. Knoten neu = new Knoten(paket); if (vorne == null) {     vorne = neu;     ______ = neu; } else {     hinten.setNaechster(neu);     ______ = neu; }

### task-20 – Aufgabe 13 – Sonderfall analysieren

Entwickeln Sie eine vollständige Methode public Paket dequeue(). Berücksichtigen Sie: leere Queue, Queue mit genau einem Element und Queue mit mehreren Elementen.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public Paket dequeue() {
    if (vorne == null) {
        return null;
    }
    Paket paket = vorne.getPaket();
    vorne = vorne.getNaechster();
    if (vorne == null) {
        hinten = null;
    }
    return paket;
}
```

Geprüfte korrekte Alternative:

```java
Knoten alt=vorne; if(alt==null)return null; vorne=alt.getNaechster(); if(vorne==null)hinten=null; return alt.getPaket();
```

Geprüfter Falschversuch:

```java
Paket dequeue() { return null; }
```

Hinweise: 1. Was muss bei einer leeren Queue passieren? · 2. Nach dem Entfernen des letzten Elements ist vorne null. Welchen Wert muss dann hinten haben? · 3. Pseudocode: leer? → Paket merken → vorne weitersetzen → falls vorne null: hinten null → Paket zurückgeben. · 4. if (vorne == null) return null; Paket paket = vorne.getPaket(); vorne = vorne.getNaechster(); if (vorne == null) ______ = null; return paket;

### task-21 – Aufgabe 14 – Klasse vervollständigen

Implementieren Sie die vollständige Klasse PaketWarteschlange mit enqueue(), dequeue(), front() und isEmpty(). Übernehmen Sie die öffentliche Schnittstelle (public) der Vorlage. Private Feldnamen und lokale Variablen dürfen anders heißen. dequeue() und front() liefern bei leerer Queue null; front() verändert nichts. Nach dem Entfernen des letzten Pakets sind die Anfangs- und Endreferenz null.

Eingabe: Vollständige Klasse PaketWarteschlange mit der öffentlichen Schnittstelle aus der Vorlage. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public class PaketWarteschlange {
    private Knoten vorne;
    private Knoten hinten;

    public PaketWarteschlange() {
        vorne = null;
        hinten = null;
    }

    public void enqueue(Paket paket) {
        Knoten neu = new Knoten(paket);
        if (vorne == null) {
            vorne = neu;
            hinten = neu;
        } else {
            hinten.setNaechster(neu);
            hinten = neu;
        }
    }

    public Paket dequeue() {
        if (vorne == null) return null;
        Paket paket = vorne.getPaket();
        vorne = vorne.getNaechster();
        if (vorne == null) hinten = null;
        return paket;
    }

    public Paket front() {
        if (vorne == null) return null;
        return vorne.getPaket();
    }

    public boolean isEmpty() {
        return vorne == null;
    }
}
```

Geprüfte korrekte Alternative:

```java
public class PaketWarteschlange {
    private Knoten anfang, ende;
    public void enqueue(Paket daten) { Knoten n=new Knoten(daten); if(ende==null) anfang=n; else ende.setNaechster(n); ende=n; }
    public Paket dequeue() { if(anfang!=null) { Paket daten=anfang.getPaket(); anfang=anfang.getNaechster(); if(anfang==null) ende=null; return daten; } return null; }
    public Paket front() { return anfang==null ? null : anfang.getPaket(); }
    public boolean isEmpty() { return anfang==null; }
  }
```

Geprüfter Falschversuch:

```java
public class PaketWarteschlange {
    private Knoten vorne;
    private Knoten hinten;

    public PaketWarteschlange() {
        vorne = null;
        hinten = null;
    }

    public void enqueue(Paket paket) {
        Knoten neu = new Knoten(paket);
        if (vorne == null) {
            vorne = neu;
            hinten = neu;
        } else {
            hinten.setNaechster(neu);
            hinten = neu;
        }
    }

    public Paket dequeue() {
        if (vorne == null) return null;
        Paket paket = vorne.getPaket();
        vorne = vorne.getNaechster();

        return paket;
    }

    public Paket front() {
        if (vorne == null) return null;
        return vorne.getPaket();
    }

    public boolean isEmpty() {
        return vorne == null;
    }
}
```

Hinweise: 1. Implementieren Sie zuerst enqueue() und behandeln Sie die leere Queue gesondert. · 2. Bei dequeue() muss nach dem Entfernen des letzten Elements auch hinten = null gelten. · 3. front() liest nur das vorderste Paket; isEmpty() prüft, ob vorne null ist. · 4. Testen Sie gedanklich: erstes Element einfügen → letztes Element entfernen → erneut einfügen.

### task-22 – Aufgabe 15 – Zustände nachvollziehen

Testen Sie Ihre Warteschlange mit der Folge aus der Wiki-Seite. Das Labor führt die Operationen aus und kontrolliert die entstehenden Zustände von vorne und hinten.

Eingabe: Java-Operationsfolge: enqueue(P100); bzw. dequeue();. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: operations.

Erwartete Antwort bzw. Musterlösung:

```java
enqueue(P100);
enqueue(P200);
enqueue(P300);

dequeue();

enqueue(P400);

dequeue();
dequeue();
dequeue();

// Endzustand:
// vorne  → null
// hinten → null
```

Geprüfte korrekte Alternative:

```java
enqueue(P100) ; /* Aufruf */
enqueue(P200) ; /* Aufruf */
enqueue(P300) ; /* Aufruf */

dequeue() ; /* Aufruf */

enqueue(P400) ; /* Aufruf */

dequeue() ; /* Aufruf */
dequeue() ; /* Aufruf */
dequeue() ; /* Aufruf */

// Endzustand:
// vorne  → null
// hinten → null
```

Geprüfter Falschversuch:

```java
dequeue();
enqueue(P200);
enqueue(P300);

dequeue();

enqueue(P400);

dequeue();
dequeue();
dequeue();

// Endzustand:
// vorne  → null
// hinten → null
```

Hinweise: 1. Arbeiten Sie die Anweisungen von oben nach unten ab. · 2. Nach drei enqueue()-Aufrufen steht P100 vorne und P300 hinten. · 3. Nach dem ersten dequeue() beginnt die Queue mit P200. · 4. Nach dem letzten dequeue() müssen vorne und hinten null sein.

### task-23 – Aufgabe 16 – Fehleranalyse

Untersuchen und korrigieren Sie die vorgegebene dequeue()-Methode. Der kritische Fall ist eine Queue mit genau einem Element.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public Paket dequeue() {
    if (vorne == null) {
        return null;
    }

    Paket paket = vorne.getPaket();
    vorne = vorne.getNaechster();

    if (vorne == null) {
        hinten = null;
    }

    return paket;
}
```

Geprüfte korrekte Alternative:

```java
if(vorne!=null) { Paket daten=vorne.getPaket(); vorne=vorne.getNaechster(); if(vorne==null)hinten=null; return daten; } return null;
```

Geprüfter Falschversuch:

```java
Paket dequeue() { return null; }
```

Hinweise: 1. Beobachten Sie nach dequeue() nicht nur vorne, sondern auch hinten. · 2. Bei einem Element zeigen vorne und hinten vor dem Entfernen auf denselben Knoten. · 3. Wenn vorne nach dem Entfernen null ist, muss auch hinten zurückgesetzt werden. · 4. if (vorne == null) {     hinten = null; }

### task-24 – Queue-Zustand vorhersagen

Anfangs leer. enqueue(P1), enqueue(P2), enqueue(P3), dequeue(), enqueue(P4). Geben Sie die Pakete von vorne nach hinten an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
P2,P3,P4
```

Geprüfte korrekte Alternative:

```text
[P2 ; P3 ; P4]
```

Geprüfter Falschversuch:

```text
P4,P3,P2
```

Hinweise: 1. Das zuerst eingetroffene Paket wird zuerst entnommen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-25 – Letztes Element entnehmen

Nach dequeue() zeigt vorne auf null. Welche zusätzliche Java-Anweisung ist zwingend nötig?

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
hinten = null;
```

Geprüfte korrekte Alternative:

```java
if(vorne==null) { hinten=null; }
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Eine leere Queue darf keine Referenz auf das frühere Ende behalten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-26 – Queue: Einfügen am Ende

Eine verkettete Queue verwaltet vorne und hinten. Welche Laufzeit hat enqueue im üblichen Modell?

Eingabe: Laufzeit in Big-O-Schreibweise, z. B. O(n). Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
O(1)
```

Geprüfte korrekte Alternative:

```text
o ( 1 )
```

Geprüfter Falschversuch:

```text
O(n)
```

Hinweise: 1. Die Referenz hinten erspart das Durchlaufen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-27 – Binärbaum – Knoten modellieren

Ergänzen Sie einen Baumknoten mit Nutzdaten sowie Referenzen auf linken und rechten Teilbaum. Übernehmen Sie die öffentliche Schnittstelle (public) der Vorlage. Private Feldnamen und lokale Variablen dürfen anders heißen. getLinks() und getRechts() lesen die jeweilige Kindreferenz. Bei den Feldnamen der Vorlage bezeichnet links das linke und rechts das rechte Kind.

Eingabe: Vollständige Klasse BaumKnoten mit der öffentlichen Schnittstelle aus der Vorlage. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public class BaumKnoten {
    private Paket paket;
    private BaumKnoten links;
    private BaumKnoten rechts;

    public BaumKnoten(Paket paket) {
        this.paket = paket;
        this.links = null;
        this.rechts = null;
    }
    public BaumKnoten getLinks() { return links; }
    public BaumKnoten getRechts() { return rechts; }
}
```

Geprüfte korrekte Alternative:

```java
public class BaumKnoten {
    private Paket daten;
    private BaumKnoten l,r;
    public BaumKnoten(Paket wert) { daten=wert; }
    public BaumKnoten getLinks() { BaumKnoten kind=l; return kind; }
    public BaumKnoten getRechts() { return r; }
  }
```

Geprüfter Falschversuch:

```java
public class BaumKnoten {
    private Paket paket;
    private BaumKnoten links;
    private BaumKnoten rechts;

    public BaumKnoten(Paket paket) {
        this.paket = paket;
        this.links = null;
        this.rechts = null;
    }
    public BaumKnoten getLinks() { return links; }
    public BaumKnoten getRechts() { return links; }
}
```

Hinweise: 1. Welche drei Informationen benötigt ein Baumknoten? · 2. Ein neuer Knoten besitzt zunächst keine Kinder. · 3. Beide Kindreferenzen starten mit null. · 4. Setzen Sie this.paket = paket sowie links und rechts auf null.

### task-28 – Binärbaum – Anzahl der Knoten

Implementieren Sie rekursiv eine Methode, die alle Knoten eines Binärbaums zählt.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public int anzahlKnoten(BaumKnoten k) {
    if (k == null) return 0;
    return 1 + anzahlKnoten(k.getLinks())
             + anzahlKnoten(k.getRechts());
}
```

Geprüfte korrekte Alternative:

```java
if(k==null) return 0; int rechts=anzahlKnoten(k.getRechts()); int links=anzahlKnoten(k.getLinks()); return rechts+links+1;
```

Geprüfter Falschversuch:

```java
int anzahlKnoten(BaumKnoten k) { return 0; }
```

Hinweise: 1. Jede rekursive Baumfunktion braucht einen Basisfall. · 2. Ein leerer Teilbaum enthält 0 Knoten. · 3. Zählen Sie den aktuellen Knoten plus beide Teilbäume. · 4. return 1 + anzahlKnoten(k.getLinks()) + anzahlKnoten(k.getRechts());

### task-29 – Blätter zählen

Baum: 50 mit Kindern 30 und 70; 30 hat Kinder 20 und 40; 70 hat nur das linke Kind 60. Wie viele Blätter besitzt der Baum? Geben Sie nur die Zahl an.

Eingabe: Eine ganze Zahl. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
3
```

Geprüfte korrekte Alternative:

```text
03
```

Geprüfter Falschversuch:

```text
999
```

Hinweise: 1. Blätter haben weder linkes noch rechtes Kind. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-30 – Blätter rekursiv zählen

Implementieren Sie den Methodenrumpf für int anzahlBlaetter(BaumKnoten k). Verwenden Sie getLinks() und getRechts().

Eingabe: Methodenrumpf oder vollständige Methode. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
if (k == null) return 0;
if (k.getLinks() == null && k.getRechts() == null) return 1;
return anzahlBlaetter(k.getLinks()) + anzahlBlaetter(k.getRechts());
```

Geprüfte korrekte Alternative:

```java
if (k == null) {
    return 0;
  }
  if (k.getLinks() == null && k.getRechts() == null) {
    return 1;
  }
  return anzahlBlaetter(k.getLinks())
       + anzahlBlaetter(k.getRechts());
```

Geprüfter Falschversuch:

```java
int anzahlBlaetter(BaumKnoten k) { return 0; }
```

Hinweise: 1. Unterscheiden Sie leeren Teilbaum, Blatt und inneren Knoten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-31 – Baumhöhe berechnen

Implementieren Sie den Methodenrumpf für int hoehe(BaumKnoten k). Definieren Sie: leerer Baum Höhe 0, Blatt Höhe 1.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
if (k == null) return 0;
return 1 + Math.max(hoehe(k.getLinks()), hoehe(k.getRechts()));
```

Geprüfte korrekte Alternative:

```java
if (k == null) {
    return 0;
  }
  int links = hoehe(k.getLinks());
  int rechts = hoehe(k.getRechts());
  return 1 + Math.max(links, rechts);
```

Geprüfter Falschversuch:

```java
int hoehe(BaumKnoten k) { return 0; }
```

Hinweise: 1. Die Höhe ist 1 plus das Maximum der beiden Teilbaumhöhen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-32 – Gesamtgewicht berechnen

Implementieren Sie den Methodenrumpf für double gesamtgewicht(BaumKnoten k). Paketgewicht: k.getPaket().getGewicht().

Eingabe: Methodenrumpf oder vollständige Methode. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
if (k == null) return 0;
return k.getPaket().getGewicht() + gesamtgewicht(k.getLinks()) + gesamtgewicht(k.getRechts());
```

Geprüfte korrekte Alternative:

```java
if(k!=null) { double r=gesamtgewicht(k.getRechts()); double l=gesamtgewicht(k.getLinks()); return r+l+k.getPaket().getGewicht(); } return 0;
```

Geprüfter Falschversuch:

```java
double gesamtgewicht(BaumKnoten k) { return 0; }
```

Hinweise: 1. Addieren Sie Gewicht des aktuellen Knotens und beider Teilbäume. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-33 – Inorder-Traversierung implementieren

Vervollständigen Sie die rekursive Inorder-Traversierung. Reihenfolge: linker Teilbaum – Knoten – rechter Teilbaum.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void inorder(BaumKnoten k) {
    if (k == null) return;
    inorder(k.getLinks());
    verarbeiten(k);
    inorder(k.getRechts());
}
```

Geprüfte korrekte Alternative:

```java
if(k!=null) { inorder(k.getLinks()); verarbeiten(k); inorder(k.getRechts()); }
```

Geprüfter Falschversuch:

```java
void inorder(BaumKnoten k) {  }
```

Hinweise: 1. Inorder bedeutet L – K – R. · 2. Zuerst wird der linke Teilbaum rekursiv verarbeitet. · 3. Danach der aktuelle Knoten, zuletzt der rechte Teilbaum. · 4. inorder(k.getLinks()); verarbeiten(k); inorder(k.getRechts());

### task-34 – Traversierungsart erkennen

Der vorgegebene Code soll eine Preorder-Traversierung realisieren. Ordnen Sie die drei Anweisungen korrekt.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public void preorder(BaumKnoten k) {
    if (k == null) return;
    verarbeiten(k);
    preorder(k.getLinks());
    preorder(k.getRechts());
}
```

Geprüfte korrekte Alternative:

```java
if(k!=null) { verarbeiten(k); preorder(k.getLinks()); preorder(k.getRechts()); }
```

Geprüfter Falschversuch:

```java
void preorder(BaumKnoten k) {  }
```

Hinweise: 1. Preorder beginnt beim aktuellen Knoten. · 2. Danach folgt der linke Teilbaum. · 3. Zum Schluss folgt der rechte Teilbaum. · 4. Reihenfolge: K – L – R.

### task-35 – Preorder bestimmen

Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Preorder-Folge an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
50,30,20,40,70
```

Geprüfte korrekte Alternative:

```text
[50 ; 30 ; 20 ; 40 ; 70]
```

Geprüfter Falschversuch:

```text
70,40,20,30,50
```

Hinweise: 1. Preorder: Knoten – links – rechts. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-36 – Inorder bestimmen

Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Inorder-Folge an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
20,30,40,50,70
```

Geprüfte korrekte Alternative:

```text
[20 ; 30 ; 40 ; 50 ; 70]
```

Geprüfter Falschversuch:

```text
70,50,40,30,20
```

Hinweise: 1. Inorder: links – Knoten – rechts. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-37 – Postorder bestimmen

Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Postorder-Folge an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
20,40,30,70,50
```

Geprüfte korrekte Alternative:

```text
[20 ; 40 ; 30 ; 70 ; 50]
```

Geprüfter Falschversuch:

```text
50,70,30,40,20
```

Hinweise: 1. Postorder: links – rechts – Knoten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-38 – Postorder programmieren

Ergänzen Sie den Methodenrumpf für void postorder(BaumKnoten k). Verwenden Sie verarbeiten(k).

Eingabe: Methodenrumpf oder vollständige Methode. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
if (k == null) return;
postorder(k.getLinks());
postorder(k.getRechts());
verarbeiten(k);
```

Geprüfte korrekte Alternative:

```java
if(k!=null) { postorder(k.getLinks()); postorder(k.getRechts()); verarbeiten(k); }
```

Geprüfter Falschversuch:

```java
void postorder(BaumKnoten k) {  }
```

Hinweise: 1. Der aktuelle Knoten kommt bei Postorder zuletzt. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-39 – Im binären Suchbaum suchen

Implementieren Sie die rekursive Suche. Nutzen Sie die Suchbaumeigenschaft, damit jeweils nur ein Teilbaum untersucht wird.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public Paket suchen(BaumKnoten k, int nummer) {
    if (k == null) return null;
    if (nummer == k.getNummer()) return k.getPaket();
    if (nummer < k.getNummer()) {
        return suchen(k.getLinks(), nummer);
    }
    return suchen(k.getRechts(), nummer);
}
```

Geprüfte korrekte Alternative:

```java
while(k!=null) { if(k.getNummer()==nummer)return k.getPaket(); if(k.getNummer()>nummer) k=k.getLinks(); else k=k.getRechts(); } return null;
```

Geprüfter Falschversuch:

```java
Paket suchen(BaumKnoten k,int nummer) { return null; }
```

Hinweise: 1. Was ist der Basisfall eines erfolglosen Suchpfades? · 2. Vergleichen Sie nummer mit dem Schlüssel des aktuellen Knotens. · 3. Kleiner → links, größer → rechts. · 4. Es wird nur EIN rekursiver Teilbaumaufruf benötigt.

### task-40 – In den Suchbaum einfügen

Vervollständigen Sie das rekursive Einfügen. Die Methode gibt die möglicherweise neue Teilbaumwurzel zurück. Gleiche Paketnummern werden im rechten Teilbaum eingefügt.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public BaumKnoten einfuegen(BaumKnoten k, Paket paket) {
    if (k == null) return new BaumKnoten(paket);
    if (paket.getNummer() < k.getNummer()) {
        k.setLinks(einfuegen(k.getLinks(), paket));
    } else {
        k.setRechts(einfuegen(k.getRechts(), paket));
    }
    return k;
}
```

Geprüfte korrekte Alternative:

```java
if(k!=null) { if(paket.getNummer()>=k.getNummer()) k.setRechts(einfuegen(k.getRechts(),paket)); else k.setLinks(einfuegen(k.getLinks(),paket)); return k; } return new BaumKnoten(paket);
```

Geprüfter Falschversuch:

```java
BaumKnoten einfuegen(BaumKnoten k,Paket paket) { return null; }
```

Hinweise: 1. Ein leerer Teilbaum ist die Einfügeposition. · 2. Dort entsteht ein neuer BaumKnoten. · 3. Der rekursive Rückgabewert muss wieder als Kindreferenz gespeichert werden. · 4. links: k.setLinks(einfuegen(...)); rechts entsprechend.

### task-41 – Suchweg 65

Suchbaum: 50 als Wurzel, 30 links, 70 rechts; 70 hat 60 links und 80 rechts; 60 hat 65 rechts. Geben Sie den Suchpfad zu 65 an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
50,70,60,65
```

Geprüfte korrekte Alternative:

```text
[50 ; 70 ; 60 ; 65]
```

Geprüfter Falschversuch:

```text
65,60,70,50
```

Hinweise: 1. Nutzen Sie bei jedem Vergleich kleiner oder größer. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-42 – Suchbaum prüfen

Baum: Wurzel 50; links 30, rechts 70; der Knoten 30 besitzt als rechtes Kind 60. Ist dies ein gültiger binärer Suchbaum? Antworten Sie ja oder nein.

Eingabe: Ja oder nein; eine Begründung ist optional. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
nein
```

Geprüfte korrekte Alternative:

```text
NEIN. Die Teilbaumregel ist entscheidend.
```

Geprüfter Falschversuch:

```text
ja
```

Hinweise: 1. Die Ordnung muss für ganze Teilbäume gelten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-43 – Einfügeposition finden

Suchbaum: 50 als Wurzel, 30 links und 70 rechts; 30 hat Kinder 20 und 40. Wo wird 35 eingefügt? Antworten Sie mit: links von 40 / rechts von 40.

Eingabe: links von 40 / rechts von 40. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
links von 40
```

Geprüfte korrekte Alternative:

```text
Links vom Knoten 40.
```

Geprüfter Falschversuch:

```text
rechts von 40
```

Hinweise: 1. 35 < 50, 35 > 30, 35 < 40. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-44 – Entarteter Suchbaum

Die Zahlen 10, 20, 30, 40, 50 werden nacheinander in einen gewöhnlichen (nicht balancierten) Suchbaum eingefügt. Welche Worst-Case-Laufzeit hat die Suche in einem solchen Baum?

Eingabe: Laufzeit in Big-O-Schreibweise, z. B. O(n). Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
O(n)
```

Geprüfte korrekte Alternative:

```text
o ( n )
```

Geprüfter Falschversuch:

```text
O(1)
```

Hinweise: 1. Der Baum kann zu einer Kette entarten. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-45 – Inorder-Nachfolger finden

Implementieren Sie die Hilfsmethode, die den kleinsten Knoten eines nicht leeren Teilbaums findet.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
private BaumKnoten minimum(BaumKnoten k) {
    while (k.getLinks() != null) {
        k = k.getLinks();
    }
    return k;
}
```

Geprüfte korrekte Alternative:

```java
if(k.getLinks()==null) return k; else return minimum(k.getLinks());
```

Geprüfter Falschversuch:

```java
BaumKnoten minimum(BaumKnoten k) { return null; }
```

Hinweise: 1. Wo liegt der kleinste Schlüssel in einem Suchbaum? · 2. Folgen Sie immer der linken Referenz. · 3. Stoppen Sie, sobald kein linker Nachfolger mehr existiert. · 4. while (k.getLinks() != null) k = k.getLinks();

### task-46 – Löschalgorithmus ergänzen

Ergänzen Sie den rekursiven Kern des Löschens. Berücksichtigen Sie insbesondere die Fälle mit keinem, einem und zwei Kindern. Paketnummern sind hier eindeutig. Die Hilfsmethode minimum(BaumKnoten k) aus der vorherigen Station steht zur Verfügung.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public BaumKnoten loeschen(BaumKnoten k, int nummer) {
    if (k == null) return null;
    if (nummer < k.getNummer()) {
        k.setLinks(loeschen(k.getLinks(), nummer));
    } else if (nummer > k.getNummer()) {
        k.setRechts(loeschen(k.getRechts(), nummer));
    } else {
        if (k.getLinks() == null) return k.getRechts();
        if (k.getRechts() == null) return k.getLinks();
        BaumKnoten nachfolger = minimum(k.getRechts());
        k.setPaket(nachfolger.getPaket());
        k.setRechts(loeschen(k.getRechts(), nachfolger.getNummer()));
    }
    return k;
}
```

Geprüfte korrekte Alternative:

```java
public BaumKnoten loeschen(BaumKnoten knoten,int ziel) {
    if(knoten==null)return null;
    if(ziel>knoten.getNummer()) knoten.setRechts(loeschen(knoten.getRechts(),ziel));
    else if(ziel<knoten.getNummer()) knoten.setLinks(loeschen(knoten.getLinks(),ziel));
    else { if(knoten.getRechts()==null)return knoten.getLinks(); if(knoten.getLinks()==null)return knoten.getRechts(); BaumKnoten ersatz=maximum(knoten.getLinks()); knoten.setPaket(ersatz.getPaket()); knoten.setLinks(loeschen(knoten.getLinks(),ersatz.getNummer())); } return knoten;
  }
  private BaumKnoten maximum(BaumKnoten x) { if(x.getRechts()==null)return x; return maximum(x.getRechts()); }
```

Geprüfter Falschversuch:

```java
BaumKnoten loeschen(BaumKnoten k,int nummer) { return null; }
```

Hinweise: 1. Suchen Sie zunächst wie bei der normalen Suchbaum-Suche. · 2. Bei nur einem Kind kann dieses Kind direkt zurückgegeben werden. · 3. Bei zwei Kindern wird ein geeigneter Ersatzschlüssel benötigt. · 4. Verwenden Sie das Minimum des rechten Teilbaums und löschen Sie diesen Nachfolger anschließend dort.

### task-47 – Blatt löschen

Suchbaum: 50 als Wurzel, 30 links, 70 rechts, 30 mit Kindern 20 und 40. Der Knoten 20 wird gelöscht. Welche Referenz muss gesetzt werden? Verwenden Sie k30 als Variable für Knoten 30.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
k30.setLinks(null);
```

Geprüfte korrekte Alternative:

```java
BaumKnoten leer=null; k30.setLinks(leer);
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Das gelöschte Blatt wird von seinem Elternknoten abgehängt. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-48 – Knoten mit einem Kind löschen

Knoten 70 hat ausschließlich den linken Kindknoten 60. Beim Löschen von 70 muss dessen Elternknoten 50 seine rechte Referenz ändern. Schreiben Sie die Anweisung mit k50 und k70.

Eingabe: Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich. Früher: normalisierter Textvergleich. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
k50.setRechts(k70.getLinks());
```

Geprüfte korrekte Alternative:

```java
BaumKnoten kind=k70.getLinks(); k50.setRechts(kind);
```

Geprüfter Falschversuch:

```java
void loesung() {  }
```

Hinweise: 1. Das einzige Kind rückt an die Stelle des gelöschten Knotens. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-49 – Inorder-Nachfolger bestimmen

Suchbaum: Wurzel 50; rechter Teilbaum Wurzel 80 mit linkem Kind 60; 60 hat rechtes Kind 70. Welche Schlüsselnummer ist der Inorder-Nachfolger von 50?

Eingabe: Eine ganze Zahl. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
60
```

Geprüfte korrekte Alternative:

```text
060
```

Geprüfter Falschversuch:

```text
999
```

Hinweise: 1. Gesucht ist der kleinste Schlüssel im rechten Teilbaum. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-50 – Schlüsseländerung beurteilen

Ein Suchbaum ist nach Paketnummer geordnet. Darf die Paketnummer eines vorhandenen Knotens beliebig geändert werden, ohne die Baumstruktur zu überprüfen? Antworten Sie ja oder nein.

Eingabe: Ja oder nein; eine Begründung ist optional. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
nein
```

Geprüfte korrekte Alternative:

```text
NEIN. Die Teilbaumregel ist entscheidend.
```

Geprüfter Falschversuch:

```text
ja
```

Hinweise: 1. Nutzdaten und Suchschlüssel unterscheiden. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-51 – Laufzeit der Löschung

Die rekursive Löschung in einem gewöhnlichen binären Suchbaum folgt einem Suchpfad. Wie lautet die Worst-Case-Laufzeit bei n Knoten?

Eingabe: Laufzeit in Big-O-Schreibweise, z. B. O(n). Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
O(n)
```

Geprüfte korrekte Alternative:

```text
o ( n )
```

Geprüfter Falschversuch:

```text
O(1)
```

Hinweise: 1. Die Höhe kann im ungünstigsten Fall n betragen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-52 – Im Trie suchen

Vervollständigen Sie die Suche. Jede Ziffer bestimmt direkt den Index des nächsten Kindknotens. Das Modell verwendet gleich lange, nicht leere Paketnummern ausschließlich aus Dezimalziffern. Präfixe dürfen kürzer und auch leer sein; wurzel ist ein vorhandener InnererKnoten. Nur ein vollständig gelesener Schlüssel mit abschließendem Blatt gilt als gefunden; ein bloßes Präfix nicht. Die Suche verändert den Trie nicht.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public boolean suchen(String paketnummer) {
    Knoten aktuell = wurzel;
    for (int i = 0; i < paketnummer.length(); i++) {
        if (!(aktuell instanceof InnererKnoten)) return false;
        int ziffer = paketnummer.charAt(i) - '0';
        aktuell = ((InnererKnoten) aktuell).getKind(ziffer);
        if (aktuell == null) return false;
    }
    return aktuell instanceof Blatt;
}
```

Geprüfte korrekte Alternative:

```java
public boolean suchen(String nummer) {
    int stelle=0; Knoten lauf=wurzel;
    while(stelle<nummer.length()) {
      if(lauf instanceof InnererKnoten) { InnererKnoten innen=(InnererKnoten)lauf; lauf=innen.getKind(nummer.charAt(stelle)-'0'); }
      else return false;
      stelle++;
    }
    return lauf instanceof Blatt;
  }
```

Geprüfter Falschversuch:

```java
boolean suchen(String paketnummer) { return false; }
```

Hinweise: 1. Die aktuelle Ziffer wurde bereits in ziffer gespeichert. · 2. Diese Ziffer ist direkt der Arrayindex. · 3. Fehlt die Kindreferenz, ist der Schlüssel nicht vorhanden. · 4. getKind(ziffer) und bei null false zurückgeben.

### task-53 – Rekursiv in den Trie einfügen

Ergänzen Sie den rekursiven Einfügealgorithmus für gleich lange Paketnummern. Das Modell verwendet gleich lange, nicht leere Paketnummern ausschließlich aus Dezimalziffern. Präfixe dürfen kürzer und auch leer sein; wurzel ist ein vorhandener InnererKnoten. Der Rückgabewert ist die neue Teilbaumwurzel und muss beim Aufruf übernommen werden. Vorhandene Geschwisterpfade bleiben erhalten; erneutes Einfügen desselben Schlüssels erzeugt keinen zweiten Treffer.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
private Knoten einfuegen(Knoten k, String paketnummer, int position) {
    if (position == paketnummer.length()) {
        return new Blatt(paketnummer);
    }
    if (k == null) k = new InnererKnoten();
    int ziffer = paketnummer.charAt(position) - '0';
    InnererKnoten innen = (InnererKnoten) k;
    Knoten kind = innen.getKind(ziffer);
    kind = einfuegen(kind, paketnummer, position + 1);
    innen.setKind(ziffer, kind);
    return innen;
}
```

Geprüfte korrekte Alternative:

```java
private Knoten einfuegen(Knoten teil,String nummer,int index) {
    if(index<nummer.length()) {
      InnererKnoten ast=null;
      if(teil==null) ast=new InnererKnoten(); else ast=(InnererKnoten)teil;
      int z=nummer.charAt(index)-'0';
      ast.setKind(z,einfuegen(ast.getKind(z),nummer,index+1));
      return ast;
    }
    return new Blatt(nummer);
  }
```

Geprüfter Falschversuch:

```java
Knoten einfuegen(Knoten k,String paketnummer,int position) { return null; }
```

Hinweise: 1. Der Basisfall ist erreicht, wenn alle Ziffern verarbeitet wurden. · 2. Dann entsteht das Blatt für die vollständige Paketnummer. · 3. Der rekursive Aufruf arbeitet an position + 1. · 4. Speichern Sie den rekursiven Rückgabewert anschließend mit setKind(ziffer, kind).

### task-54 – Präfixknoten finden

Implementieren Sie Phase 1 der Präfixsuche: Folgen Sie nur dem Präfix und geben Sie den erreichten Knoten zurück. Das Modell verwendet gleich lange, nicht leere Paketnummern ausschließlich aus Dezimalziffern. Präfixe dürfen kürzer und auch leer sein; wurzel ist ein vorhandener InnererKnoten. Das leere Präfix liefert wurzel, ein vollständiger vorhandener Schlüssel sein Blatt und ein fehlender Pfad null. Die Methode verändert den Trie nicht.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: pauschal von der funktionalen Bewertung ausgenommen. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public Knoten findePraefix(String praefix) {
    Knoten aktuell = wurzel;
    for (int i = 0; i < praefix.length(); i++) {
        if (!(aktuell instanceof InnererKnoten)) return null;
        int ziffer = praefix.charAt(i) - '0';
        aktuell = ((InnererKnoten) aktuell).getKind(ziffer);
        if (aktuell == null) return null;
    }
    return aktuell;
}
```

Geprüfte korrekte Alternative:

```java
public Knoten findePraefix(String text) { return folge(wurzel,text,0); }
    private Knoten folge(Knoten k,String text,int i) {
      if(i==text.length()) return k;
      if(!(k instanceof InnererKnoten)) return null;
      return folge(((InnererKnoten)k).getKind(text.charAt(i)-'0'),text,i+1);
    }
```

Geprüfter Falschversuch:

```java
Knoten findePraefix(String praefix) { return null; }
```

Hinweise: 1. Phase 1 entspricht fast der normalen Trie-Suche. · 2. Die Schleife läuft nur über die Länge des Präfixes. · 3. Fehlt ein Kind, existiert kein Schlüssel mit diesem Präfix. · 4. Am Ende geben Sie den erreichten Knoten zurück; ab dort würde Phase 2 traversieren.

### task-55 – Präfixe erkennen

Gespeichert sind 1234, 1257, 1289, 4312, 4355. Geben Sie alle Nummern mit Präfix 12 an, getrennt durch Kommas.

Eingabe: Alle passenden Nummern; Reihenfolge beliebig. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
1234,1257,1289
```

Geprüfte korrekte Alternative:

```text
1289 1257 1234
```

Geprüfter Falschversuch:

```text
1234,1257,1289,4312
```

Hinweise: 1. Alle passenden Nummern teilen sich den Pfad 1 → 2. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-56 – Trie-Suchweg

Im Trie wird nach 1257 gesucht. Geben Sie die nacheinander verwendeten Arrayindizes an, getrennt durch Kommas.

Eingabe: Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
1,2,5,7
```

Geprüfte korrekte Alternative:

```text
[1 ; 2 ; 5 ; 7]
```

Geprüfter Falschversuch:

```text
7,5,2,1
```

Hinweise: 1. Jede Ziffer bestimmt direkt den Index des nächsten Kindknotens. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-57 – Anzahl möglicher Kinder

Ein innerer Trie-Knoten für Dezimalziffern speichert seine Kindreferenzen in Knoten[10]. Wie viele mögliche Kindreferenzen gibt es?

Eingabe: Eine ganze Zahl. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
10
```

Geprüfte korrekte Alternative:

```text
010
```

Geprüfter Falschversuch:

```text
999
```

Hinweise: 1. Die Indizes sind 0 bis 9. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-58 – Laufzeit der exakten Trie-Suche

Ein Schlüssel besitzt m Ziffern. Welche asymptotische Laufzeit besitzt die exakte Suche im Trie mit direktem Arrayzugriff?

Eingabe: Laufzeit in Big-O-Schreibweise, z. B. O(n). Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
O(m)
```

Geprüfte korrekte Alternative:

```text
o ( m )
```

Geprüfter Falschversuch:

```text
O(1)
```

Hinweise: 1. Die Suche folgt dem durch die m Ziffern festgelegten Pfad. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-59 – Präfixsuche bewerten

Muss nach dem Erreichen eines vorhandenen Präfixknotens möglicherweise ein ganzer Teilbaum traversiert werden, um alle passenden Nummern auszugeben? Antworten Sie ja oder nein.

Eingabe: Ja oder nein; eine Begründung ist optional. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
ja
```

Geprüfte korrekte Alternative:

```text
JA. Die Teilbaumregel ist entscheidend.
```

Geprüfter Falschversuch:

```text
nein
```

Hinweise: 1. Unterscheiden Sie Präfixknoten finden und Treffer sammeln. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-60 – Welche Datenstruktur für welches Problem?

Ergänzen Sie die Methode so, dass sie für typische Anforderungen eine passende Datenstruktur als Text zurückgibt. Nutzen Sie die Fachbegriffe Array, Stack, Queue, Suchbaum und Trie.

Eingabe: Methodenrumpf oder vollständige Methode. Früher: reguläre Struktur-/Schlüsselwortmuster. Jetzt: functional.

Erwartete Antwort bzw. Musterlösung:

```java
public String waehle(String anforderung) {
    if (anforderung.equals("UNDO")) return "Stack";
    if (anforderung.equals("FIFO")) return "Queue";
    if (anforderung.equals("PRAEFIX")) return "Trie";
    if (anforderung.equals("INDEXZUGRIFF")) return "Array";
    if (anforderung.equals("SCHLUESSELSUCHE")) return "Suchbaum";
    return "unbekannt";
}
```

Geprüfte korrekte Alternative:

```java
if(anforderung.equals("INDEXZUGRIFF"))return "Array"; else if(anforderung.equals("SCHLUESSELSUCHE"))return "Suchbaum"; else if(anforderung.equals("FIFO"))return "Queue"; else if(anforderung.equals("UNDO"))return "Stack"; else if(anforderung.equals("PRAEFIX"))return "Trie"; else return "unbekannt";
```

Geprüfter Falschversuch:

```java
String waehle(String anforderung) { return "falsch"; }
```

Hinweise: 1. Undo benötigt das zuletzt gespeicherte Element zuerst. · 2. FIFO ist das Zugriffsprinzip der Queue. · 3. Präfixsuchen sind eine besondere Stärke des Tries. · 4. Direkter Indexzugriff → Array; geordnete Schlüsselsuche → Suchbaum.

### task-61 – FIFO auswählen

Pakete müssen exakt in Ankunftsreihenfolge abgearbeitet werden. Nennen Sie die passende Datenstruktur.

Eingabe: Fachbegriff; gebräuchliche deutsche Bezeichnung ist möglich. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
Queue
```

Geprüfte korrekte Alternative:

```text
Warteschlange
```

Geprüfter Falschversuch:

```text
Stack
```

Hinweise: 1. FIFO. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-62 – Undo auswählen

Die zuletzt ausgeführte Aktion soll zuerst rückgängig gemacht werden. Nennen Sie die passende Datenstruktur.

Eingabe: Fachbegriff; gebräuchliche deutsche Bezeichnung ist möglich. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
Stack
```

Geprüfte korrekte Alternative:

```text
Stapel
```

Geprüfter Falschversuch:

```text
Queue
```

Hinweise: 1. LIFO. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-63 – Ungeeigneten Suchschlüssel erkennen

Ein Suchbaum ist nach Paketnummer sortiert. Kann man das schwerste Paket ohne zusätzliche Informationen durch einen einzigen Suchpfad bestimmen? Antworten Sie ja oder nein.

Eingabe: Ja oder nein; eine Begründung ist optional. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
nein
```

Geprüfte korrekte Alternative:

```text
NEIN. Die Teilbaumregel ist entscheidend.
```

Geprüfter Falschversuch:

```text
ja
```

Hinweise: 1. Die Ordnung muss zum Suchkriterium passen. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

### task-64 – Trie oder Suchbaum

Häufig werden alle Paketnummern mit gleichem Anfang gesucht. Welche Datenstruktur ist dafür besonders geeignet?

Eingabe: Fachbegriff; gebräuchliche deutsche Bezeichnung ist möglich. Früher: normalisierter Textvergleich. Jetzt: answer.

Erwartete Antwort bzw. Musterlösung:

```text
Trie
```

Geprüfte korrekte Alternative:

```text
Präfixbaum
```

Geprüfter Falschversuch:

```text
Queue
```

Hinweise: 1. Gemeinsame Präfixe werden durch gemeinsame Pfade repräsentiert. · 2. Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite. · 3. Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle. · 4. Sie können jetzt die Musterlösung anzeigen.

## Diagnose: alle 14 Aufgaben

| ID | Bereich | Situation | Erwartete Antwort | Prüfung |
|---|---|---|---|---|
| start-1 | Reihenfolgen | Wareneingang | P1 → P2 → P3 → P4 | korrekt |
| start-2 | Reihenfolgen | Rückgängig-Lager | D | korrekt |
| start-3 | Referenzen | Paketkette | P1-PX → PX-P2 | korrekt |
| start-4 | Baumstrukturen | Paketbaum | 50 → 70 → 60 | korrekt |
| start-5 | Strukturwahl | Schneller suchen | ordered | korrekt |
| start-6 | Präfixstrukturen | Gemeinsame Anfänge | 1234 → 1257 → 1289 | korrekt |
| start-7 | Effizienz | Suchaufwand einschätzen | exclude | korrekt |
| end-1 | Reihenfolgen | Pakete müssen in Eingangsreihenfolge bearbeitet werden. | Queue | korrekt |
| end-2 | Referenzen | Welches Prinzip ist beim Einfügen in eine verkettete Liste entscheidend? | Referenzen so umhängen, dass kein Rest der Liste verloren geht | korrekt |
| end-3 | Baumstrukturen | Warum kann ein Suchbaum Teilbäume ausschließen? | Wegen der Suchbaumeigenschaft | korrekt |
| end-4 | Algorithmen | Welche Traversierung hat die Reihenfolge L–K–R? | Inorder | korrekt |
| end-5 | Effizienz | Welche Laufzeit kann die Suche in einem entarteten binären Suchbaum besitzen? | O(n) | korrekt |
| end-6 | Strukturwahl | Für häufige Undo-Operationen eignet sich am besten … | Stack | korrekt |
| end-7 | Präfixstrukturen | Welche Struktur ist besonders für Präfixsuchen geeignet? | Trie | korrekt |

Startdiagnose: Mengen bei Verbindungen und Präfixen; exakte Reihenfolge bei Arbeitsplätzen und Suchpfad; exakte Einfachauswahl bei Entnahme, Strukturwahl und Effizienz. Leere Eingaben bleiben offen. Der Bereich Reihenfolgen mittelt beide Aufgaben symmetrisch. Algorithmen wird im Startcheck nicht eigenständig erhoben und ist mit „–“ markiert.

Ausgangsdiagnose: eindeutige Einfachauswahl, alle sieben Fragen vor der Auswertung erforderlich. Falsche Antworten erhalten keine erfundenen Kompetenzpunkte. Die Rückmeldung nennt die jeweilige richtige Entscheidung.
