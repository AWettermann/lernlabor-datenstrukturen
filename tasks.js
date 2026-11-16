const extraTasks=[
 {
  "kind": "list",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REFERENZEN · VERTIEFUNG",
  "title": "Einfügen zwischen zwei Knoten",
  "desc": "P1 → P2 → P3. PX soll zwischen P1 und P2 eingefügt werden. Ergänzen Sie die beiden Java-Anweisungen mit neu als PX-Knoten und aktuell als P1.",
  "visual": "list",
  "code": "",
  "expect": "exactanswer",
  "answer": "neu.setNaechster(aktuell.getNaechster());\naktuell.setNaechster(neu);",
  "solution": "neu.setNaechster(aktuell.getNaechster());\naktuell.setNaechster(neu);",
  "hints": [
   "Zuerst die alte Verbindung sichern, danach umhängen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "list",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SONDERFÄLLE · VERTIEFUNG",
  "title": "Am Listenanfang einfügen",
  "desc": "Ergänzen Sie den Code zum Einfügen des Knotens neu am Listenanfang.",
  "visual": "list",
  "code": "",
  "expect": "exactanswer",
  "answer": "neu.setNaechster(erster);\nerster = neu;",
  "solution": "neu.setNaechster(erster);\nerster = neu;",
  "hints": [
   "Der neue Knoten verweist zunächst auf den bisherigen ersten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "list",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LÖSCHEN · VERTIEFUNG",
  "title": "Ersten Knoten entfernen",
  "desc": "Eine nicht leere Liste besitzt die Referenz erster. Schreiben Sie die Anweisung, mit der der erste Knoten aus der Liste entfernt wird.",
  "visual": "list",
  "code": "",
  "expect": "exactanswer",
  "answer": "erster = erster.getNaechster();",
  "solution": "erster = erster.getNaechster();",
  "hints": [
   "Die Referenz erster muss auf den bisherigen Nachfolger zeigen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "list",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LAUFZEIT · VERTIEFUNG",
  "title": "Laufzeit einer Listensuche",
  "desc": "Eine unsortierte verkettete Liste enthält n Elemente. Geben Sie die Worst-Case-Laufzeit für die Suche nach einer Paketnummer an (Big-O).",
  "visual": "list",
  "code": "",
  "expect": "exactanswer",
  "answer": "O(n)",
  "solution": "O(n)",
  "hints": [
   "Im ungünstigsten Fall müssen alle Knoten betrachtet werden.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "stack",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · ZUGRIFFSPRINZIP · VERTIEFUNG",
  "title": "Stack-Zustand vorhersagen",
  "desc": "Anfangs leer. push(P1), push(P2), push(P3), pop(), push(P4). Geben Sie die Pakete von oben nach unten an, getrennt durch Kommas.",
  "visual": "stack",
  "code": "",
  "expect": "exactanswer",
  "answer": "P4,P2,P1",
  "solution": "P4, P2, P1",
  "hints": [
   "Bei pop wird das zuletzt abgelegte Paket entfernt.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "stack",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REFERENZEN · VERTIEFUNG",
  "title": "push: Referenzen richtig setzen",
  "desc": "Der neue Knoten heißt neu, die Spitze oben. Schreiben Sie die zwei Referenzzuweisungen für push in der korrekten Reihenfolge.",
  "visual": "stack",
  "code": "",
  "expect": "exactanswer",
  "answer": "neu.setNaechster(oben);\noben = neu;",
  "solution": "neu.setNaechster(oben);\noben = neu;",
  "hints": [
   "Zuerst den bisherigen Stapel mit neu verbinden.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "stack",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SONDERFÄLLE · VERTIEFUNG",
  "title": "pop bei leerem Stapel",
  "desc": "Ergänzen Sie einen geeigneten Basisfall für pop(), wenn bei leerem Stapel null zurückgegeben werden soll.",
  "visual": "stack",
  "code": "",
  "expect": "exactanswer",
  "answer": "if (oben == null) return null;",
  "solution": "if (oben == null) return null;",
  "hints": [
   "Ein leerer Stapel hat keine Spitze.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "queue",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · ZUGRIFFSPRINZIP · VERTIEFUNG",
  "title": "Queue-Zustand vorhersagen",
  "desc": "Anfangs leer. enqueue(P1), enqueue(P2), enqueue(P3), dequeue(), enqueue(P4). Geben Sie die Pakete von vorne nach hinten an, getrennt durch Kommas.",
  "visual": "queue",
  "code": "",
  "expect": "exactanswer",
  "answer": "P2,P3,P4",
  "solution": "P2, P3, P4",
  "hints": [
   "Das zuerst eingetroffene Paket wird zuerst entnommen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "queue",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SONDERFÄLLE · VERTIEFUNG",
  "title": "Letztes Element entnehmen",
  "desc": "Nach dequeue() zeigt vorne auf null. Welche zusätzliche Java-Anweisung ist zwingend nötig?",
  "visual": "queue",
  "code": "",
  "expect": "exactanswer",
  "answer": "hinten = null;",
  "solution": "hinten = null;",
  "hints": [
   "Eine leere Queue darf keine Referenz auf das frühere Ende behalten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "queue",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EFFIZIENZ · VERTIEFUNG",
  "title": "Queue: Einfügen am Ende",
  "desc": "Eine verkettete Queue verwaltet vorne und hinten. Welche Laufzeit hat enqueue im üblichen Modell?",
  "visual": "queue",
  "code": "",
  "expect": "exactanswer",
  "answer": "O(1)",
  "solution": "O(1)",
  "hints": [
   "Die Referenz hinten erspart das Durchlaufen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "tree",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · BAUM LESEN · VERTIEFUNG",
  "title": "Blätter zählen",
  "desc": "Baum: 50 mit Kindern 30 und 70; 30 hat Kinder 20 und 40; 70 hat nur das linke Kind 60. Wie viele Blätter besitzt der Baum? Geben Sie nur die Zahl an.",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "3",
  "solution": "3 (20, 40, 60)",
  "hints": [
   "Blätter haben weder linkes noch rechtes Kind.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "tree",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REKURSION · VERTIEFUNG",
  "title": "Blätter rekursiv zählen",
  "desc": "Implementieren Sie den Methodenrumpf für int anzahlBlaetter(BaumKnoten k). Verwenden Sie getLinks() und getRechts().",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "if (k == null) return 0;\nif (k.getLinks() == null && k.getRechts() == null) return 1;\nreturn anzahlBlaetter(k.getLinks()) + anzahlBlaetter(k.getRechts());",
  "solution": "if (k == null) return 0;\nif (k.getLinks() == null && k.getRechts() == null) return 1;\nreturn anzahlBlaetter(k.getLinks()) + anzahlBlaetter(k.getRechts());",
  "hints": [
   "Unterscheiden Sie leeren Teilbaum, Blatt und inneren Knoten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "tree",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REKURSION · VERTIEFUNG",
  "title": "Baumhöhe berechnen",
  "desc": "Implementieren Sie den Methodenrumpf für int hoehe(BaumKnoten k). Definieren Sie: leerer Baum Höhe 0, Blatt Höhe 1.",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "if (k == null) return 0;\nreturn 1 + Math.max(hoehe(k.getLinks()), hoehe(k.getRechts()));",
  "solution": "if (k == null) return 0;\nreturn 1 + Math.max(hoehe(k.getLinks()), hoehe(k.getRechts()));",
  "hints": [
   "Die Höhe ist 1 plus das Maximum der beiden Teilbaumhöhen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "tree",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REKURSION · VERTIEFUNG",
  "title": "Gesamtgewicht berechnen",
  "desc": "Implementieren Sie den Methodenrumpf für double gesamtgewicht(BaumKnoten k). Paketgewicht: k.getPaket().getGewicht().",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "if (k == null) return 0;\nreturn k.getPaket().getGewicht() + gesamtgewicht(k.getLinks()) + gesamtgewicht(k.getRechts());",
  "solution": "if (k == null) return 0;\nreturn k.getPaket().getGewicht() + gesamtgewicht(k.getLinks()) + gesamtgewicht(k.getRechts());",
  "hints": [
   "Addieren Sie Gewicht des aktuellen Knotens und beider Teilbäume.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "traversal",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REIHENFOLGEN · VERTIEFUNG",
  "title": "Preorder bestimmen",
  "desc": "Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Preorder-Folge an, getrennt durch Kommas.",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "50,30,20,40,70",
  "solution": "50, 30, 20, 40, 70",
  "hints": [
   "Preorder: Knoten – links – rechts.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "traversal",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REIHENFOLGEN · VERTIEFUNG",
  "title": "Inorder bestimmen",
  "desc": "Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Inorder-Folge an, getrennt durch Kommas.",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "20,30,40,50,70",
  "solution": "20, 30, 40, 50, 70",
  "hints": [
   "Inorder: links – Knoten – rechts.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "traversal",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · REIHENFOLGEN · VERTIEFUNG",
  "title": "Postorder bestimmen",
  "desc": "Baum: Wurzel 50, links 30 mit Kindern 20 und 40, rechts 70. Geben Sie die Postorder-Folge an, getrennt durch Kommas.",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "20,40,30,70,50",
  "solution": "20, 40, 30, 70, 50",
  "hints": [
   "Postorder: links – rechts – Knoten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "traversal",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · JAVA · VERTIEFUNG",
  "title": "Postorder programmieren",
  "desc": "Ergänzen Sie den Methodenrumpf für void postorder(BaumKnoten k). Verwenden Sie verarbeiten(k).",
  "visual": "tree",
  "code": "",
  "expect": "exactanswer",
  "answer": "if (k == null) return;\npostorder(k.getLinks());\npostorder(k.getRechts());\nverarbeiten(k);",
  "solution": "if (k == null) return;\npostorder(k.getLinks());\npostorder(k.getRechts());\nverarbeiten(k);",
  "hints": [
   "Der aktuelle Knoten kommt bei Postorder zuletzt.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SUCHPFAD · VERTIEFUNG",
  "title": "Suchweg 65",
  "desc": "Suchbaum: 50 als Wurzel, 30 links, 70 rechts; 70 hat 60 links und 80 rechts; 60 hat 65 rechts. Geben Sie den Suchpfad zu 65 an, getrennt durch Kommas.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "50,70,60,65",
  "solution": "50, 70, 60, 65",
  "hints": [
   "Nutzen Sie bei jedem Vergleich kleiner oder größer.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EIGENSCHAFT · VERTIEFUNG",
  "title": "Suchbaum prüfen",
  "desc": "Baum: Wurzel 50; links 30, rechts 70; der Knoten 30 besitzt als rechtes Kind 60. Ist dies ein gültiger binärer Suchbaum? Antworten Sie ja oder nein.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "nein",
  "solution": "Nein. 60 liegt im linken Teilbaum von 50 und ist größer als 50.",
  "hints": [
   "Die Ordnung muss für ganze Teilbäume gelten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EINFÜGEN · VERTIEFUNG",
  "title": "Einfügeposition finden",
  "desc": "Suchbaum: 50 als Wurzel, 30 links und 70 rechts; 30 hat Kinder 20 und 40. Wo wird 35 eingefügt? Antworten Sie mit: links von 40 / rechts von 40.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "links von 40",
  "solution": "links von 40",
  "hints": [
   "35 < 50, 35 > 30, 35 < 40.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EFFIZIENZ · VERTIEFUNG",
  "title": "Entarteter Suchbaum",
  "desc": "Die Zahlen 10, 20, 30, 40, 50 werden nacheinander in einen gewöhnlichen (nicht balancierten) Suchbaum eingefügt. Welche Worst-Case-Laufzeit hat die Suche in einem solchen Baum?",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "O(n)",
  "solution": "O(n)",
  "hints": [
   "Der Baum kann zu einer Kette entarten.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst2",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LÖSCHEN · VERTIEFUNG",
  "title": "Blatt löschen",
  "desc": "Suchbaum: 50 als Wurzel, 30 links, 70 rechts, 30 mit Kindern 20 und 40. Der Knoten 20 wird gelöscht. Welche Referenz muss gesetzt werden? Verwenden Sie k30 als Variable für Knoten 30.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "k30.setLinks(null);",
  "solution": "k30.setLinks(null);",
  "hints": [
   "Das gelöschte Blatt wird von seinem Elternknoten abgehängt.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst2",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LÖSCHEN · VERTIEFUNG",
  "title": "Knoten mit einem Kind löschen",
  "desc": "Knoten 70 hat ausschließlich den linken Kindknoten 60. Beim Löschen von 70 muss dessen Elternknoten 50 seine rechte Referenz ändern. Schreiben Sie die Anweisung mit k50 und k70.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "k50.setRechts(k70.getLinks());",
  "solution": "k50.setRechts(k70.getLinks());",
  "hints": [
   "Das einzige Kind rückt an die Stelle des gelöschten Knotens.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst2",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LÖSCHEN · VERTIEFUNG",
  "title": "Inorder-Nachfolger bestimmen",
  "desc": "Suchbaum: Wurzel 50; rechter Teilbaum Wurzel 80 mit linkem Kind 60; 60 hat rechtes Kind 70. Welche Schlüsselnummer ist der Inorder-Nachfolger von 50?",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "60",
  "solution": "60",
  "hints": [
   "Gesucht ist der kleinste Schlüssel im rechten Teilbaum.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst2",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SCHLÜSSEL · VERTIEFUNG",
  "title": "Schlüsseländerung beurteilen",
  "desc": "Ein Suchbaum ist nach Paketnummer geordnet. Darf die Paketnummer eines vorhandenen Knotens beliebig geändert werden, ohne die Baumstruktur zu überprüfen? Antworten Sie ja oder nein.",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "nein",
  "solution": "Nein. Eine Änderung des Suchschlüssels kann die Suchbaumeigenschaft verletzen.",
  "hints": [
   "Nutzdaten und Suchschlüssel unterscheiden.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "bst2",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EFFIZIENZ · VERTIEFUNG",
  "title": "Laufzeit der Löschung",
  "desc": "Die rekursive Löschung in einem gewöhnlichen binären Suchbaum folgt einem Suchpfad. Wie lautet die Worst-Case-Laufzeit bei n Knoten?",
  "visual": "bst",
  "code": "",
  "expect": "exactanswer",
  "answer": "O(n)",
  "solution": "O(n)",
  "hints": [
   "Die Höhe kann im ungünstigsten Fall n betragen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "trie",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · PFADE · VERTIEFUNG",
  "title": "Präfixe erkennen",
  "desc": "Gespeichert sind 1234, 1257, 1289, 4312, 4355. Geben Sie alle Nummern mit Präfix 12 an, getrennt durch Kommas.",
  "visual": "trie",
  "code": "",
  "expect": "exactanswer",
  "answer": "1234,1257,1289",
  "solution": "1234, 1257, 1289",
  "hints": [
   "Alle passenden Nummern teilen sich den Pfad 1 → 2.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "trie",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · SUCHE · VERTIEFUNG",
  "title": "Trie-Suchweg",
  "desc": "Im Trie wird nach 1257 gesucht. Geben Sie die nacheinander verwendeten Arrayindizes an, getrennt durch Kommas.",
  "visual": "trie",
  "code": "",
  "expect": "exactanswer",
  "answer": "1,2,5,7",
  "solution": "1, 2, 5, 7",
  "hints": [
   "Jede Ziffer bestimmt direkt den Index des nächsten Kindknotens.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "trie",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · MODELL · VERTIEFUNG",
  "title": "Anzahl möglicher Kinder",
  "desc": "Ein innerer Trie-Knoten für Dezimalziffern speichert seine Kindreferenzen in Knoten[10]. Wie viele mögliche Kindreferenzen gibt es?",
  "visual": "trie",
  "code": "",
  "expect": "exactanswer",
  "answer": "10",
  "solution": "10",
  "hints": [
   "Die Indizes sind 0 bis 9.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "trie",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · EFFIZIENZ · VERTIEFUNG",
  "title": "Laufzeit der exakten Trie-Suche",
  "desc": "Ein Schlüssel besitzt m Ziffern. Welche asymptotische Laufzeit besitzt die exakte Suche im Trie mit direktem Arrayzugriff?",
  "visual": "trie",
  "code": "",
  "expect": "exactanswer",
  "answer": "O(m)",
  "solution": "O(m)",
  "hints": [
   "Die Suche folgt dem durch die m Ziffern festgelegten Pfad.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "trie",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · TRANSFER · VERTIEFUNG",
  "title": "Präfixsuche bewerten",
  "desc": "Muss nach dem Erreichen eines vorhandenen Präfixknotens möglicherweise ein ganzer Teilbaum traversiert werden, um alle passenden Nummern auszugeben? Antworten Sie ja oder nein.",
  "visual": "trie",
  "code": "",
  "expect": "exactanswer",
  "answer": "ja",
  "solution": "Ja. Der Präfixpfad allein liefert noch nicht alle passenden Blätter.",
  "hints": [
   "Unterscheiden Sie Präfixknoten finden und Treffer sammeln.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "review",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · STRUKTURWAHL · VERTIEFUNG",
  "title": "FIFO auswählen",
  "desc": "Pakete müssen exakt in Ankunftsreihenfolge abgearbeitet werden. Nennen Sie die passende Datenstruktur.",
  "visual": "review",
  "code": "",
  "expect": "exactanswer",
  "answer": "Queue",
  "solution": "Queue (Warteschlange)",
  "hints": [
   "FIFO.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "review",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · STRUKTURWAHL · VERTIEFUNG",
  "title": "Undo auswählen",
  "desc": "Die zuletzt ausgeführte Aktion soll zuerst rückgängig gemacht werden. Nennen Sie die passende Datenstruktur.",
  "visual": "review",
  "code": "",
  "expect": "exactanswer",
  "answer": "Stack",
  "solution": "Stack (Stapel)",
  "hints": [
   "LIFO.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "review",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · LAUFZEITEN · VERTIEFUNG",
  "title": "Ungeeigneten Suchschlüssel erkennen",
  "desc": "Ein Suchbaum ist nach Paketnummer sortiert. Kann man das schwerste Paket ohne zusätzliche Informationen durch einen einzigen Suchpfad bestimmen? Antworten Sie ja oder nein.",
  "visual": "review",
  "code": "",
  "expect": "exactanswer",
  "answer": "nein",
  "solution": "Nein. Die Suchbaumeigenschaft bezieht sich auf Paketnummern, nicht auf Gewicht.",
  "hints": [
   "Die Ordnung muss zum Suchkriterium passen.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 },
 {
  "kind": "review",
  "wiki": "Zusatztraining",
  "topic": "Q1.4 · TRANSFER · VERTIEFUNG",
  "title": "Trie oder Suchbaum",
  "desc": "Häufig werden alle Paketnummern mit gleichem Anfang gesucht. Welche Datenstruktur ist dafür besonders geeignet?",
  "visual": "review",
  "code": "",
  "expect": "exactanswer",
  "answer": "Trie",
  "solution": "Trie",
  "hints": [
   "Gemeinsame Präfixe werden durch gemeinsame Pfade repräsentiert.",
   "Nutzen Sie die Strukturidee aus der zugehörigen Wiki-Seite.",
   "Vergleichen Sie Ihren Ansatz mit dem Beispiel und prüfen Sie Sonderfälle.",
   "Sie können jetzt die Musterlösung anzeigen."
  ]
 }
];
const tasks=[
{kind:'list',wiki:'Aufgabe 8',topic:'WIKI 4 · LINEARE LISTE · KNOTEN',title:'Aufgabe 8 – Die Klasse Knoten entwickeln',desc:'Implementieren Sie die Klasse <code>Knoten</code>. Ein Knoten speichert ein <code>Paket</code> und eine Referenz auf den nächsten Knoten.',start:['P100','P200','P300'],code:`public class Knoten {\n    private Paket paket;\n    private Knoten naechster;\n\n    public Knoten(Paket paket) {\n        // Ihr Code\n    }\n\n    public Paket getPaket() {\n        // Ihr Code\n    }\n\n    public Knoten getNaechster() {\n        // Ihr Code\n    }\n\n    public void setNaechster(Knoten naechster) {\n        // Ihr Code\n    }\n}`,expect:'nodeclass',solution:`public class Knoten {\n    private Paket paket;\n    private Knoten naechster;\n\n    public Knoten(Paket paket) {\n        this.paket = paket;\n        this.naechster = null;\n    }\n\n    public Paket getPaket() {\n        return paket;\n    }\n\n    public Knoten getNaechster() {\n        return naechster;\n    }\n\n    public void setNaechster(Knoten naechster) {\n        this.naechster = naechster;\n    }\n}`,hints:['Welche zwei Informationen muss ein Knoten speichern?','Ein neuer Knoten hat zunächst noch keinen Nachfolger.','Die Getter geben Nutzdaten bzw. Nachfolger zurück; der Setter verändert nur die Nachfolgerreferenz.',`this.paket = paket;\nthis.naechster = null;`]},
{kind:'list',wiki:'Aufgabe 12',topic:'WIKI 7 · LINEARE LISTE · TRAVERSIEREN',title:'Aufgabe 12 – Traversieren einer linearen Liste',desc:'Implementieren Sie die Traversierungsmethoden <code>anzahlPakete()</code>, <code>gesamtGewicht()</code>, <code>zaehlePaketeNach(String zielort)</code> und <code>suchePaket(String paketnummer)</code>.',start:['P100','P200','P300','P400'],code:`public int anzahlPakete() {\n    // Ihr Code\n}\n\npublic double gesamtGewicht() {\n    // Ihr Code\n}\n\npublic int zaehlePaketeNach(String zielort) {\n    // Ihr Code\n}\n\npublic Paket suchePaket(String paketnummer) {\n    // Ihr Code\n}`,expect:'traverse',solution:`public int anzahlPakete() {\n    int anzahl = 0;\n    Knoten aktuell = erster;\n    while (aktuell != null) {\n        anzahl++;\n        aktuell = aktuell.getNaechster();\n    }\n    return anzahl;\n}\n\npublic double gesamtGewicht() {\n    double summe = 0;\n    Knoten aktuell = erster;\n    while (aktuell != null) {\n        summe += aktuell.getPaket().getGewicht();\n        aktuell = aktuell.getNaechster();\n    }\n    return summe;\n}\n\npublic int zaehlePaketeNach(String zielort) {\n    int anzahl = 0;\n    Knoten aktuell = erster;\n    while (aktuell != null) {\n        if (aktuell.getPaket().getZielort().equals(zielort)) anzahl++;\n        aktuell = aktuell.getNaechster();\n    }\n    return anzahl;\n}\n\npublic Paket suchePaket(String paketnummer) {\n    Knoten aktuell = erster;\n    while (aktuell != null) {\n        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) return aktuell.getPaket();\n        aktuell = aktuell.getNaechster();\n    }\n    return null;\n}`,hints:['Alle vier Methoden benötigen dasselbe Grundmuster: eine Laufreferenz vom ersten Knoten bis null.','Start: Knoten aktuell = erster; Bedingung: while (aktuell != null).','Vergessen Sie am Ende eines Schleifendurchlaufs nicht: aktuell = aktuell.getNaechster();','Bei der Suche kann sofort zurückgegeben werden, sobald die Paketnummer übereinstimmt.']},
{kind:'list',wiki:'Aufgabe 13',topic:'WIKI 9 · LINEARE LISTE · EINFÜGEN',title:'Aufgabe 13 – Einen Knoten einfügen',desc:'Implementieren Sie <code>public void einfuegenNach(Knoten aktuell, Paket paket)</code>. Der neue Knoten soll direkt hinter <code>aktuell</code> eingefügt werden.',start:['P100','P200','P300'],code:`public void einfuegenNach(Knoten aktuell, Paket paket) {\n    // Ihr Code\n}`,expect:'insertAfter',solution:`public void einfuegenNach(Knoten aktuell, Paket paket) {\n    if (aktuell == null) return;\n    Knoten neu = new Knoten(paket);\n    neu.setNaechster(aktuell.getNaechster());\n    aktuell.setNaechster(neu);\n}`,hints:['Die bisherige Verbindung hinter aktuell darf nicht verloren gehen.','Der neue Knoten muss zuerst auf den bisherigen Nachfolger zeigen.','Erst danach darf aktuell auf neu umgehängt werden.',`Knoten neu = new Knoten(paket);\nneu.setNaechster(aktuell.getNaechster());\naktuell.setNaechster(____);`]},
{kind:'list',wiki:'Aufgabe 14',topic:'WIKI 9 · LINEARE LISTE · VORNE EINFÜGEN',title:'Aufgabe 14 – Am Anfang einfügen',desc:'Implementieren Sie <code>public void vorneEinfuegen(Paket paket)</code>. Das neue Paket soll zum ersten Element der Liste werden.',start:['P100','P200','P300'],code:`public void vorneEinfuegen(Paket paket) {\n    // Ihr Code\n}`,expect:'insertFront',solution:`public void vorneEinfuegen(Paket paket) {\n    Knoten neu = new Knoten(paket);\n    neu.setNaechster(erster);\n    erster = neu;\n}`,hints:['Welche Referenz bezeichnet den Anfang der Liste?','Der neue Knoten muss auf den bisherigen ersten Knoten zeigen.','Danach wird erster auf den neuen Knoten gesetzt.',`Knoten neu = new Knoten(paket);\nneu.setNaechster(____);\n____ = neu;`]},
{kind:'list',wiki:'Aufgabe 16',topic:'WIKI 10 · LINEARE LISTE · ERSTES ELEMENT LÖSCHEN',title:'Aufgabe 16 – Das erste Element löschen',desc:'Entwickeln Sie die Referenzänderung zum Löschen des ersten Elements. Die Methode soll bei einer leeren Liste sicher funktionieren.',start:['P100','P200','P300'],code:`public boolean erstesLoeschen() {\n    // Ihr Code\n}`,expect:'deleteFirst',solution:`public boolean erstesLoeschen() {\n    if (erster == null) {\n        return false;\n    }\n    erster = erster.getNaechster();\n    return true;\n}`,hints:['Was muss bei einer leeren Liste passieren?','Zum Löschen des ersten Knotens ist kein Durchlaufen nötig.','erster muss auf den Nachfolger des bisherigen ersten Knotens zeigen.',`if (erster == null) return false;\nerster = __________;\nreturn true;`]},
{kind:'list',wiki:'Aufgabe 17',topic:'WIKI 10 · LINEARE LISTE · LÖSCHALGORITHMUS',title:'Aufgabe 17 – Algorithmus entwickeln',desc:'Implementieren Sie <code>public boolean loeschePaket(String paketnummer)</code>. Berücksichtigen Sie leere Liste, erstes Element, Element innerhalb der Liste und „nicht gefunden“.',start:['P100','P200','P300','P400'],code:`public boolean loeschePaket(String paketnummer) {\n    // Ihr Code\n}`,expect:'deleteSearch',solution:`public boolean loeschePaket(String paketnummer) {\n    Knoten vorher = null;\n    Knoten aktuell = erster;\n\n    while (aktuell != null) {\n        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {\n            if (vorher == null) {\n                erster = aktuell.getNaechster();\n            } else {\n                vorher.setNaechster(aktuell.getNaechster());\n            }\n            return true;\n        }\n        vorher = aktuell;\n        aktuell = aktuell.getNaechster();\n    }\n    return false;\n}`,hints:['Sie benötigen beim Durchlaufen zwei Referenzen: aktuell und vorher.','vorher == null bedeutet: Das gefundene Paket ist das erste Element.','Innerhalb der Liste muss vorher den Nachfolger von aktuell übernehmen.','Nach jedem erfolglosen Vergleich: vorher = aktuell; aktuell = aktuell.getNaechster();']},
{kind:'list',wiki:'Aufgabe 19',topic:'WIKI 11 · LINEARE LISTE · AKTUALISIEREN',title:'Aufgabe 19 – Aktualisieren',desc:'Implementieren Sie <code>public boolean aktualisiereStatus(String paketnummer, String neuerStatus)</code>. Die Referenzstruktur der Liste soll dabei unverändert bleiben.',start:['P100','P200','P300'],code:`public boolean aktualisiereStatus(String paketnummer, String neuerStatus) {\n    // Ihr Code\n}`,expect:'updatePayload',solution:`public boolean aktualisiereStatus(String paketnummer, String neuerStatus) {\n    Knoten aktuell = erster;\n    while (aktuell != null) {\n        if (aktuell.getPaket().getPaketnummer().equals(paketnummer)) {\n            aktuell.getPaket().setStatus(neuerStatus);\n            return true;\n        }\n        aktuell = aktuell.getNaechster();\n    }\n    return false;\n}`,hints:['Gesucht wird ein Paket – nicht ein Knoten zum Umhängen.','Durchlaufen Sie die Liste bis die Paketnummer übereinstimmt.','Ändern Sie anschließend nur die Nutzdaten des Paket-Objekts.','Kein setNaechster() ist nötig. Verwenden Sie setStatus(neuerStatus).']},
{kind:'list',wiki:'Aufgabe 26',topic:'ABSCHLUSSAUFGABE · PRIORITÄTSLAGER',title:'Aufgabe 26 – Sortiert einfügen',desc:'Implementieren Sie <code>sortiertEinfuegen(Paket paket)</code> für das dynamische Prioritätslager. Die Liste soll nach dem vorgegebenen Sortierkriterium geordnet bleiben.',start:['P100','P200','P300'],code:`public void sortiertEinfuegen(Paket paket) {\n    // Ihr Code\n}`,expect:'sortedInsert',solution:`public void sortiertEinfuegen(Paket paket) {\n    Knoten neu = new Knoten(paket);\n\n    if (erster == null || paket.getGewicht() < erster.getPaket().getGewicht()) {\n        neu.setNaechster(erster);\n        erster = neu;\n        return;\n    }\n\n    Knoten aktuell = erster;\n    while (aktuell.getNaechster() != null &&\n           aktuell.getNaechster().getPaket().getGewicht() <= paket.getGewicht()) {\n        aktuell = aktuell.getNaechster();\n    }\n\n    neu.setNaechster(aktuell.getNaechster());\n    aktuell.setNaechster(neu);\n}`,hints:['Zuerst muss die richtige Einfügeposition gefunden werden.','Behandeln Sie die leere Liste und das Einfügen vor dem ersten Element als Sonderfall.','Laufen Sie so lange weiter, wie der nächste Knoten noch vor das neue Paket gehört.','Beim eigentlichen Einfügen gilt wieder: neu zuerst mit dem bisherigen Nachfolger verbinden, danach aktuell auf neu setzen.']},
{kind:'stack',wiki:'Aufgabe 3',topic:'WIKI 13 · STACK · PUSH',title:'Aufgabe 3 – `push()` entwickeln',desc:'Das Paket <code>P400</code> soll auf den Stack gelegt werden. <strong>d)</strong> Implementieren Sie anschließend <code>public void push(Paket paket)</code>.',start:['P300','P200','P100'],code:`public void push(Paket paket) {\n    // Ihr Code\n}`,expect:'push',solution:`public void push(Paket paket) {
    Knoten neu = new Knoten(paket);
    neu.setNaechster(oben);
    oben = neu;
}`,hints:['Welche Referenz muss nach push() auf den neuen Knoten zeigen?','Der neue Knoten muss zuerst auf das bisherige oberste Element zeigen.','Pseudocode: Knoten erzeugen → Nachfolger auf oben setzen → oben auf neuen Knoten setzen.',`Knoten neu = new Knoten(paket);\nneu.setNaechster(________);\n________ = neu;`]},
{kind:'stack',wiki:'Aufgabe 4',topic:'WIKI 13 · STACK · POP',title:'Aufgabe 4 – `pop()` entwickeln',desc:'Das oberste Paket soll entnommen werden. <strong>d)</strong> Implementieren Sie <code>public Paket pop()</code>. Für einen leeren Stack soll <code>null</code> zurückgegeben werden.',start:['P300','P200','P100'],code:`public Paket pop() {\n    // Ihr Code\n}`,expect:'pop',solution:`public Paket pop() {
    if (oben == null) {
        return null;
    }
    Paket paket = oben.getPaket();
    oben = oben.getNaechster();
    return paket;
}`,hints:['Was muss passieren, wenn oben == null ist?','Speichern Sie das Paket des obersten Knotens, bevor Sie die Referenz verändern.','Pseudocode: leer? → Paket merken → oben auf Nachfolger setzen → Paket zurückgeben.',`if (oben == null) return null;\nPaket paket = oben.getPaket();\noben = __________;\nreturn paket;`]},
{kind:'stack',wiki:'Aufgabe 5',topic:'WIKI 13 · STACK · KLASSE',title:'Aufgabe 5 – Stack vervollständigen',desc:'Implementieren Sie die gesamte Klasse <code>PaketStapel</code>. Berücksichtigen Sie insbesondere den leeren Stack.',start:['P300','P200'],code:`public class PaketStapel {\n\n    private Knoten oben;\n\n    public PaketStapel() {\n        oben = null;\n    }\n\n    public void push(Paket paket) {\n        // ...\n    }\n\n    public Paket pop() {\n        // ...\n    }\n\n    public Paket peek() {\n        // ...\n    }\n\n    public boolean isEmpty() {\n        // ...\n    }\n}`,expect:'stackclass',solution:`public class PaketStapel {
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
}`,hints:['Beginnen Sie mit push() und pop(). Beide verändern nur die Referenz oben.','peek() darf den Stack nicht verändern. isEmpty() benötigt nur einen Vergleich.','Prüfen Sie bei pop() und peek() jeweils den leeren Stack.','Verwenden Sie bei push(): neu.setNaechster(oben); oben = neu; und behandeln Sie bei pop()/peek() oben == null.']},
{kind:'queue',wiki:'Aufgabe 11',topic:'WIKI 18 · QUEUE · ENQUEUE',title:'Aufgabe 11 – `enqueue()` entwickeln',desc:'Ein neues Paket soll hinten eingefügt werden. <strong>d)</strong> Implementieren Sie unter Berücksichtigung der leeren und der nicht leeren Queue <code>public void enqueue(Paket paket)</code>.',start:['P100','P200','P300'],code:`public void enqueue(Paket paket) {\n    // Ihr Code\n}`,expect:'enqueue',solution:`public void enqueue(Paket paket) {
    Knoten neu = new Knoten(paket);
    if (vorne == null) {
        vorne = neu;
        hinten = neu;
    } else {
        hinten.setNaechster(neu);
        hinten = neu;
    }
}`,hints:['Was ist bei einer leeren Queue besonders?','Nach dem ersten enqueue() müssen vorne und hinten auf denselben Knoten zeigen.','Nicht leer: hinten.setNaechster(neu), danach hinten = neu. Leer: vorne = neu und hinten = neu.',`Knoten neu = new Knoten(paket);\nif (vorne == null) {\n    vorne = neu;\n    ______ = neu;\n} else {\n    hinten.setNaechster(neu);\n    ______ = neu;\n}`]},
{kind:'queue',wiki:'Aufgabe 13',topic:'WIKI 19 · QUEUE · DEQUEUE',title:'Aufgabe 13 – Sonderfall analysieren',desc:'Entwickeln Sie eine vollständige Methode <code>public Paket dequeue()</code>. Berücksichtigen Sie: leere Queue, Queue mit genau einem Element und Queue mit mehreren Elementen.',start:['P100','P200','P300'],code:`public Paket dequeue() {\n    // Ihr Code\n}`,expect:'dequeue',solution:`public Paket dequeue() {
    if (vorne == null) {
        return null;
    }
    Paket paket = vorne.getPaket();
    vorne = vorne.getNaechster();
    if (vorne == null) {
        hinten = null;
    }
    return paket;
}`,hints:['Was muss bei einer leeren Queue passieren?','Nach dem Entfernen des letzten Elements ist vorne null. Welchen Wert muss dann hinten haben?','Pseudocode: leer? → Paket merken → vorne weitersetzen → falls vorne null: hinten null → Paket zurückgeben.',`if (vorne == null) return null;\nPaket paket = vorne.getPaket();\nvorne = vorne.getNaechster();\nif (vorne == null) ______ = null;\nreturn paket;`]},
{kind:'queue',wiki:'Aufgabe 14',topic:'WIKI 20 · QUEUE · KLASSE',title:'Aufgabe 14 – Klasse vervollständigen',desc:'Implementieren Sie die vollständige Klasse <code>PaketWarteschlange</code> mit <code>enqueue()</code>, <code>dequeue()</code>, <code>front()</code> und <code>isEmpty()</code>.',start:['P100','P200'],code:`public class PaketWarteschlange {\n\n    private Knoten vorne;\n    private Knoten hinten;\n\n    public PaketWarteschlange() {\n        vorne = null;\n        hinten = null;\n    }\n\n    public void enqueue(Paket paket) {\n        // ...\n    }\n\n    public Paket dequeue() {\n        // ...\n    }\n\n    public Paket front() {\n        // ...\n    }\n\n    public boolean isEmpty() {\n        // ...\n    }\n}`,expect:'queueclass',solution:`public class PaketWarteschlange {
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
}`,hints:['Implementieren Sie zuerst enqueue() und behandeln Sie die leere Queue gesondert.','Bei dequeue() muss nach dem Entfernen des letzten Elements auch hinten = null gelten.','front() liest nur das vorderste Paket; isEmpty() prüft, ob vorne null ist.','Testen Sie gedanklich: erstes Element einfügen → letztes Element entfernen → erneut einfügen.']},
{kind:'queue',wiki:'Aufgabe 15',topic:'WIKI 20 · QUEUE · TESTEN',title:'Aufgabe 15 – Zustände nachvollziehen',desc:'Testen Sie Ihre Warteschlange mit der Folge aus der Wiki-Seite. Das Labor führt die Operationen aus und kontrolliert die entstehenden Zustände von <code>vorne</code> und <code>hinten</code>.',start:[],code:`enqueue(P100);\nenqueue(P200);\nenqueue(P300);\n\ndequeue();\n\nenqueue(P400);\n\ndequeue();\ndequeue();\ndequeue();`,expect:'sequence',solution:`enqueue(P100);
enqueue(P200);
enqueue(P300);

dequeue();

enqueue(P400);

dequeue();
dequeue();
dequeue();

// Endzustand:
// vorne  → null
// hinten → null`,hints:['Arbeiten Sie die Anweisungen von oben nach unten ab.','Nach drei enqueue()-Aufrufen steht P100 vorne und P300 hinten.','Nach dem ersten dequeue() beginnt die Queue mit P200.','Nach dem letzten dequeue() müssen vorne und hinten null sein.']},
{kind:'queue',wiki:'Aufgabe 16',topic:'WIKI 21 · QUEUE · FEHLERANALYSE',title:'Aufgabe 16 – Fehleranalyse',desc:'Untersuchen und korrigieren Sie die vorgegebene <code>dequeue()</code>-Methode. Der kritische Fall ist eine Queue mit genau einem Element.',start:['P100'],code:`public Paket dequeue() {\n\n    if (vorne == null) {\n        return null;\n    }\n\n    Paket paket = vorne.getPaket();\n    vorne = vorne.getNaechster();\n\n    return paket;\n}`,expect:'bug',solution:`public Paket dequeue() {
    if (vorne == null) {
        return null;
    }

    Paket paket = vorne.getPaket();
    vorne = vorne.getNaechster();

    if (vorne == null) {
        hinten = null;
    }

    return paket;
}`,hints:['Beobachten Sie nach dequeue() nicht nur vorne, sondern auch hinten.','Bei einem Element zeigen vorne und hinten vor dem Entfernen auf denselben Knoten.','Wenn vorne nach dem Entfernen null ist, muss auch hinten zurückgesetzt werden.',`if (vorne == null) {\n    hinten = null;\n}`]},
{kind:'tree',wiki:'Q1.4.3',topic:'WIKI 1.4.3 · BINÄRBÄUME · KNOTEN',title:'Binärbaum – Knoten modellieren',desc:'Ergänzen Sie einen Baumknoten mit Nutzdaten sowie Referenzen auf linken und rechten Teilbaum.',visual:'tree',code:`public class BaumKnoten {\n    private Paket paket;\n    private BaumKnoten links;\n    private BaumKnoten rechts;\n\n    public BaumKnoten(Paket paket) {\n        // Ihr Code\n    }\n\n    public BaumKnoten getLinks() {\n        // Ihr Code\n    }\n\n    public BaumKnoten getRechts() {\n        // Ihr Code\n    }\n}`,expect:'treenode',solution:`public BaumKnoten(Paket paket) {\n    this.paket = paket;\n    this.links = null;\n    this.rechts = null;\n}\n\npublic BaumKnoten getLinks() { return links; }\npublic BaumKnoten getRechts() { return rechts; }`,hints:['Welche drei Informationen benötigt ein Baumknoten?','Ein neuer Knoten besitzt zunächst keine Kinder.','Beide Kindreferenzen starten mit null.','Setzen Sie this.paket = paket sowie links und rechts auf null.']},
{kind:'tree',wiki:'Q1.4.3',topic:'WIKI 1.4.3 · BINÄRBÄUME · REKURSION',title:'Binärbaum – Anzahl der Knoten',desc:'Implementieren Sie rekursiv eine Methode, die alle Knoten eines Binärbaums zählt.',visual:'tree',code:`public int anzahlKnoten(BaumKnoten k) {\n    // Ihr Code\n}`,expect:'treecount',solution:`public int anzahlKnoten(BaumKnoten k) {\n    if (k == null) return 0;\n    return 1 + anzahlKnoten(k.getLinks())\n             + anzahlKnoten(k.getRechts());\n}`,hints:['Jede rekursive Baumfunktion braucht einen Basisfall.','Ein leerer Teilbaum enthält 0 Knoten.','Zählen Sie den aktuellen Knoten plus beide Teilbäume.','return 1 + anzahlKnoten(k.getLinks()) + anzahlKnoten(k.getRechts());']},
{kind:'traversal',wiki:'Q1.4.4',topic:'WIKI 1.4.4 · TRAVERSIERUNG · INORDER',title:'Inorder-Traversierung implementieren',desc:'Vervollständigen Sie die rekursive Inorder-Traversierung. Reihenfolge: linker Teilbaum – Knoten – rechter Teilbaum.',visual:'tree',code:`public void inorder(BaumKnoten k) {\n    if (k == null) return;\n\n    // Ihr Code\n}`,expect:'inorder',solution:`public void inorder(BaumKnoten k) {\n    if (k == null) return;\n    inorder(k.getLinks());\n    verarbeiten(k);\n    inorder(k.getRechts());\n}`,hints:['Inorder bedeutet L – K – R.','Zuerst wird der linke Teilbaum rekursiv verarbeitet.','Danach der aktuelle Knoten, zuletzt der rechte Teilbaum.','inorder(k.getLinks()); verarbeiten(k); inorder(k.getRechts());']},
{kind:'traversal',wiki:'Q1.4.4',topic:'WIKI 1.4.4 · TRAVERSIERUNG · ANALYSE',title:'Traversierungsart erkennen',desc:'Der vorgegebene Code soll eine Preorder-Traversierung realisieren. Ordnen Sie die drei Anweisungen korrekt.',visual:'tree',code:`public void preorder(BaumKnoten k) {\n    if (k == null) return;\n\n    // Ordnen:\n    // preorder(k.getLinks());\n    // preorder(k.getRechts());\n    // verarbeiten(k);\n}`,expect:'preorder',solution:`public void preorder(BaumKnoten k) {\n    if (k == null) return;\n    verarbeiten(k);\n    preorder(k.getLinks());\n    preorder(k.getRechts());\n}`,hints:['Preorder beginnt beim aktuellen Knoten.','Danach folgt der linke Teilbaum.','Zum Schluss folgt der rechte Teilbaum.','Reihenfolge: K – L – R.']},
{kind:'bst',wiki:'Q1.4.5 · 38',topic:'WIKI 38 · BINÄRER SUCHBAUM · SUCHEN',title:'Im binären Suchbaum suchen',desc:'Implementieren Sie die rekursive Suche. Nutzen Sie die Suchbaumeigenschaft, damit jeweils nur ein Teilbaum untersucht wird.',visual:'bst',code:`public Paket suchen(BaumKnoten k, int nummer) {\n    // Ihr Code\n}`,expect:'bstsearch',solution:`public Paket suchen(BaumKnoten k, int nummer) {\n    if (k == null) return null;\n    if (nummer == k.getNummer()) return k.getPaket();\n    if (nummer < k.getNummer()) {\n        return suchen(k.getLinks(), nummer);\n    }\n    return suchen(k.getRechts(), nummer);\n}`,hints:['Was ist der Basisfall eines erfolglosen Suchpfades?','Vergleichen Sie nummer mit dem Schlüssel des aktuellen Knotens.','Kleiner → links, größer → rechts.','Es wird nur EIN rekursiver Teilbaumaufruf benötigt.']},
{kind:'bst',wiki:'Q1.4.5 · 40',topic:'WIKI 40 · BINÄRER SUCHBAUM · EINFÜGEN',title:'In den Suchbaum einfügen',desc:'Vervollständigen Sie das rekursive Einfügen. Die Methode gibt die möglicherweise neue Teilbaumwurzel zurück.',visual:'bst',code:`public BaumKnoten einfuegen(BaumKnoten k, Paket paket) {\n    if (k == null) {\n        // ...\n    }\n\n    if (paket.getNummer() < k.getNummer()) {\n        // ...\n    } else {\n        // ...\n    }\n\n    return k;\n}`,expect:'bstinsert',solution:`public BaumKnoten einfuegen(BaumKnoten k, Paket paket) {\n    if (k == null) return new BaumKnoten(paket);\n    if (paket.getNummer() < k.getNummer()) {\n        k.setLinks(einfuegen(k.getLinks(), paket));\n    } else {\n        k.setRechts(einfuegen(k.getRechts(), paket));\n    }\n    return k;\n}`,hints:['Ein leerer Teilbaum ist die Einfügeposition.','Dort entsteht ein neuer BaumKnoten.','Der rekursive Rückgabewert muss wieder als Kindreferenz gespeichert werden.','links: k.setLinks(einfuegen(...)); rechts entsprechend.']},
{kind:'bst2',wiki:'Q1.4.6 · 47',topic:'WIKI 47 · SUCHBAUM VERÄNDERN · MINIMUM',title:'Inorder-Nachfolger finden',desc:'Implementieren Sie die Hilfsmethode, die den kleinsten Knoten eines nicht leeren Teilbaums findet.',visual:'bst',code:`private BaumKnoten minimum(BaumKnoten k) {\n    // Ihr Code\n}`,expect:'minimum',solution:`private BaumKnoten minimum(BaumKnoten k) {\n    while (k.getLinks() != null) {\n        k = k.getLinks();\n    }\n    return k;\n}`,hints:['Wo liegt der kleinste Schlüssel in einem Suchbaum?','Folgen Sie immer der linken Referenz.','Stoppen Sie, sobald kein linker Nachfolger mehr existiert.','while (k.getLinks() != null) k = k.getLinks();']},
{kind:'bst2',wiki:'Q1.4.6 · 48',topic:'WIKI 48 · SUCHBAUM VERÄNDERN · LÖSCHEN',title:'Löschalgorithmus ergänzen',desc:'Ergänzen Sie den rekursiven Kern des Löschens. Berücksichtigen Sie insbesondere die Fälle mit keinem, einem und zwei Kindern.',visual:'bst',code:`public BaumKnoten loeschen(BaumKnoten k, int nummer) {\n    if (k == null) return null;\n\n    if (nummer < k.getNummer()) {\n        // ...\n    } else if (nummer > k.getNummer()) {\n        // ...\n    } else {\n        // Knoten gefunden\n        // ...\n    }\n    return k;\n}`,expect:'bstdelete',solution:`public BaumKnoten loeschen(BaumKnoten k, int nummer) {\n    if (k == null) return null;\n    if (nummer < k.getNummer()) {\n        k.setLinks(loeschen(k.getLinks(), nummer));\n    } else if (nummer > k.getNummer()) {\n        k.setRechts(loeschen(k.getRechts(), nummer));\n    } else {\n        if (k.getLinks() == null) return k.getRechts();\n        if (k.getRechts() == null) return k.getLinks();\n        BaumKnoten nachfolger = minimum(k.getRechts());\n        k.setPaket(nachfolger.getPaket());\n        k.setRechts(loeschen(k.getRechts(), nachfolger.getNummer()));\n    }\n    return k;\n}`,hints:['Suchen Sie zunächst wie bei der normalen Suchbaum-Suche.','Bei nur einem Kind kann dieses Kind direkt zurückgegeben werden.','Bei zwei Kindern wird ein geeigneter Ersatzschlüssel benötigt.','Verwenden Sie das Minimum des rechten Teilbaums und löschen Sie diesen Nachfolger anschließend dort.']},
{kind:'trie',wiki:'Q1.4.7 · 57',topic:'WIKI 57 · TRIE · SUCHEN',title:'Im Trie suchen',desc:'Vervollständigen Sie die Suche. Jede Ziffer bestimmt direkt den Index des nächsten Kindknotens.',visual:'trie',code:`public boolean suchen(String paketnummer) {\n    Knoten aktuell = wurzel;\n\n    for (int i = 0; i < paketnummer.length(); i++) {\n        if (!(aktuell instanceof InnererKnoten)) return false;\n\n        int ziffer = paketnummer.charAt(i) - '0';\n        aktuell = ((InnererKnoten) aktuell).getKind(________);\n\n        if (aktuell == null) return ________;\n    }\n\n    return aktuell instanceof Blatt;\n}`,expect:'triesearch',solution:`public boolean suchen(String paketnummer) {\n    Knoten aktuell = wurzel;\n    for (int i = 0; i < paketnummer.length(); i++) {\n        if (!(aktuell instanceof InnererKnoten)) return false;\n        int ziffer = paketnummer.charAt(i) - '0';\n        aktuell = ((InnererKnoten) aktuell).getKind(ziffer);\n        if (aktuell == null) return false;\n    }\n    return aktuell instanceof Blatt;\n}`,hints:['Die aktuelle Ziffer wurde bereits in ziffer gespeichert.','Diese Ziffer ist direkt der Arrayindex.','Fehlt die Kindreferenz, ist der Schlüssel nicht vorhanden.','getKind(ziffer) und bei null false zurückgeben.']},
{kind:'trie',wiki:'Q1.4.7 · 58',topic:'WIKI 58 · TRIE · EINFÜGEN',title:'Rekursiv in den Trie einfügen',desc:'Ergänzen Sie den rekursiven Einfügealgorithmus für gleich lange Paketnummern.',visual:'trie',code:`private Knoten einfuegen(Knoten k, String paketnummer, int position) {\n    if (position == paketnummer.length()) {\n        // ...\n    }\n    if (k == null) {\n        // ...\n    }\n    int ziffer = paketnummer.charAt(position) - '0';\n    InnererKnoten innen = (InnererKnoten) k;\n    Knoten kind = innen.getKind(ziffer);\n    // rekursiver Aufruf + Referenz setzen\n    return innen;\n}`,expect:'trieinsert',solution:`private Knoten einfuegen(Knoten k, String paketnummer, int position) {\n    if (position == paketnummer.length()) {\n        return new Blatt(paketnummer);\n    }\n    if (k == null) k = new InnererKnoten();\n    int ziffer = paketnummer.charAt(position) - '0';\n    InnererKnoten innen = (InnererKnoten) k;\n    Knoten kind = innen.getKind(ziffer);\n    kind = einfuegen(kind, paketnummer, position + 1);\n    innen.setKind(ziffer, kind);\n    return innen;\n}`,hints:['Der Basisfall ist erreicht, wenn alle Ziffern verarbeitet wurden.','Dann entsteht das Blatt für die vollständige Paketnummer.','Der rekursive Aufruf arbeitet an position + 1.','Speichern Sie den rekursiven Rückgabewert anschließend mit setKind(ziffer, kind).']},
{kind:'trie',wiki:'Q1.4.7 · 59',topic:'WIKI 59 · TRIE · PRÄFIX',title:'Präfixknoten finden',desc:'Implementieren Sie Phase 1 der Präfixsuche: Folgen Sie nur dem Präfix und geben Sie den erreichten Knoten zurück.',visual:'trie',code:`public Knoten findePraefix(String praefix) {\n    Knoten aktuell = wurzel;\n    // Ihr Code\n}`,expect:'prefix',solution:`public Knoten findePraefix(String praefix) {\n    Knoten aktuell = wurzel;\n    for (int i = 0; i < praefix.length(); i++) {\n        if (!(aktuell instanceof InnererKnoten)) return null;\n        int ziffer = praefix.charAt(i) - '0';\n        aktuell = ((InnererKnoten) aktuell).getKind(ziffer);\n        if (aktuell == null) return null;\n    }\n    return aktuell;\n}`,hints:['Phase 1 entspricht fast der normalen Trie-Suche.','Die Schleife läuft nur über die Länge des Präfixes.','Fehlt ein Kind, existiert kein Schlüssel mit diesem Präfix.','Am Ende geben Sie den erreichten Knoten zurück; ab dort würde Phase 2 traversieren.']},
{kind:'review',wiki:'Gesamtsicherung Q1.4',topic:'KLAUSURTRAINING · DATENSTRUKTUR AUSWÄHLEN',title:'Welche Datenstruktur für welches Problem?',desc:'Ergänzen Sie die Methode so, dass sie für typische Anforderungen eine passende Datenstruktur als Text zurückgibt. Nutzen Sie die Fachbegriffe Array, Stack, Queue, Suchbaum und Trie.',visual:'review',code:`public String waehle(String anforderung) {\n    if (anforderung.equals("UNDO")) return "________";\n    if (anforderung.equals("FIFO")) return "________";\n    if (anforderung.equals("PRAEFIX")) return "________";\n    if (anforderung.equals("INDEXZUGRIFF")) return "________";\n    if (anforderung.equals("SCHLUESSELSUCHE")) return "________";\n    return "unbekannt";\n}`,expect:'choose',solution:`public String waehle(String anforderung) {\n    if (anforderung.equals("UNDO")) return "Stack";\n    if (anforderung.equals("FIFO")) return "Queue";\n    if (anforderung.equals("PRAEFIX")) return "Trie";\n    if (anforderung.equals("INDEXZUGRIFF")) return "Array";\n    if (anforderung.equals("SCHLUESSELSUCHE")) return "Suchbaum";\n    return "unbekannt";\n}`,hints:['Undo benötigt das zuletzt gespeicherte Element zuerst.','FIFO ist das Zugriffsprinzip der Queue.','Präfixsuchen sind eine besondere Stärke des Tries.','Direkter Indexzugriff → Array; geordnete Schlüsselsuche → Suchbaum.']}
,
...extraTasks
]
const kindOrder=['list','stack','queue','tree','traversal','bst','bst2','trie','review'];tasks.sort((a,b)=>kindOrder.indexOf(a.kind)-kindOrder.indexOf(b.kind));
// Correct task contracts without removing or renumbering any existing station.
const taskWith=expect=>tasks.find(t=>t.expect===expect);
taskWith('sortedInsert').desc='Implementieren Sie <code>sortiertEinfuegen(Paket paket)</code>. Die Liste soll aufsteigend nach Paketgewicht geordnet bleiben. Bei gleichem Gewicht wird das neue Paket hinter den bereits vorhandenen Paketen dieses Gewichts eingefügt.';
taskWith('insertAfter').desc+=' Ist aktuell null, bleibt die Liste unverändert.';
taskWith('bstinsert').desc+=' Gleiche Paketnummern werden im rechten Teilbaum eingefügt.';
taskWith('treenode').solution=`public class BaumKnoten {
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
}`;
taskWith('bstdelete').desc+=' Paketnummern sind hier eindeutig. Die Hilfsmethode <code>minimum(BaumKnoten k)</code> aus der vorherigen Station steht zur Verfügung.';
for(const expect of ['triesearch','trieinsert','prefix'])taskWith(expect).desc+=' Das Modell verwendet gleich lange, nicht leere Paketnummern ausschließlich aus Dezimalziffern. Präfixe dürfen kürzer und auch leer sein; wurzel ist ein vorhandener InnererKnoten.';
for(const expect of ['nodeclass','stackclass','queueclass','treenode'])taskWith(expect).desc+=' Übernehmen Sie die öffentliche Schnittstelle (public) der Vorlage. Private Feldnamen und lokale Variablen dürfen anders heißen.';
taskWith('nodeclass').desc+=' Ein neuer Knoten hat keinen Nachfolger. Der Setter verändert nur die Nachfolgerreferenz; das übergebene Paketobjekt bleibt erhalten.';
taskWith('stackclass').desc+=' pop() und peek() liefern bei leerem Stack null. peek() verändert den Stack nicht; isEmpty() gibt den tatsächlichen Leerzustand zurück.';
taskWith('queueclass').desc+=' dequeue() und front() liefern bei leerer Queue null; front() verändert nichts. Nach dem Entfernen des letzten Pakets sind die Anfangs- und Endreferenz null.';
taskWith('treenode').desc+=' getLinks() und getRechts() lesen die jeweilige Kindreferenz. Bei den Feldnamen der Vorlage bezeichnet links das linke und rechts das rechte Kind.';
taskWith('triesearch').desc+=' Nur ein vollständig gelesener Schlüssel mit abschließendem Blatt gilt als gefunden; ein bloßes Präfix nicht. Die Suche verändert den Trie nicht.';
taskWith('trieinsert').desc+=' Der Rückgabewert ist die neue Teilbaumwurzel und muss beim Aufruf übernommen werden. Vorhandene Geschwisterpfade bleiben erhalten; erneutes Einfügen desselben Schlüssels erzeugt keinen zweiten Treffer.';
taskWith('prefix').desc+=' Das leere Präfix liefert wurzel, ein vollständiger vorhandener Schlüssel sein Blatt und ein fehlender Pfad null. Die Methode verändert den Trie nicht.';
Assessment.configure(tasks);
if(typeof module!=='undefined')module.exports=tasks;
