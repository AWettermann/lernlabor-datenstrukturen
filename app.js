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
}`,hints:['Beobachten Sie nach dequeue() nicht nur vorne, sondern auch hinten.','Bei einem Element zeigen vorne und hinten vor dem Entfernen auf denselben Knoten.','Wenn vorne nach dem Entfernen null ist, muss auch hinten zurückgesetzt werden.',`if (vorne == null) {\n    hinten = null;\n}`]}
]
let index=0,hint=0,step=0,filter='all';
const $=id=>document.getElementById(id);
function current(){return tasks[index]}
function render(){let t=current();$('topic').textContent=t.topic;$('title').textContent=t.title;$('description').innerHTML='<p>'+t.desc+'</p>';$('code').value=t.code;hint=0;step=0;$('hintLevel').textContent='0 / 4';$('helpText').innerHTML='<p>Nutze die Hilfen nur, wenn du nicht weiterkommst. Die erste Hilfe ist nur ein Denkimpuls.</p>';$('tests').innerHTML='<p class="muted">Noch keine Tests ausgeführt.</p>';$('score').textContent='noch nicht getestet';$('message').className='message muted';$('message').textContent='Schreibe deinen Code und starte die Tests.';$('progressText').textContent=`${t.wiki} · Station ${index+1} von ${tasks.length}`;$('progressBar').style.width=((index+1)/tasks.length*100)+'%';visual(t.start,'Ausgangszustand');}
function visual(arr,label,added){$('stepLabel').textContent=label;let nodes=arr.map((x,i)=>`<span class="node ${added===i?'current':''}">${x}</span>`).join('<span class="arrow">→</span>');let refs=current().kind==='stack'?`<div class="refs">oben ↓</div>`:current().kind==='list'?`<div class="refs">erster ↓</div>`:`<div class="refs">vorne ↓ ${' '.repeat(18)} ↓ hinten</div>`;$('visualization').innerHTML=refs+`<div class="chain">${nodes}<span class="arrow">→ null</span></div>`;$('explain').textContent='';}
function normalize(s){return s.replace(/\s+/g,' ').toLowerCase()}
function evaluate(){let c=normalize($('code').value),e=current().expect,tests=[];const has=(r)=>r.test(c);if(e==='push'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Neuer Knoten zeigt auf bisherigen Stack',has(/neu\.setnaechster\s*\(\s*oben\s*\)/)],['oben wird auf neuen Knoten gesetzt',has(/oben\s*=\s*neu/)]]}
if(e==='pop'){tests=[['Leeren Stack behandelt',has(/oben\s*==\s*null/)],['Paket vor Referenzänderung gelesen',has(/oben\.getpaket\s*\(\s*\)/)],['oben auf Nachfolger gesetzt',has(/oben\s*=\s*oben\.getnaechster\s*\(\s*\)/)],['Paket zurückgegeben',has(/return\s+paket/)]]}
if(e==='peek'){tests=[['peek behandelt leeren Stack',has(/oben\s*==\s*null/)],['peek liest oberstes Paket',has(/oben\.getpaket\s*\(\s*\)/)],['isEmpty prüft oben',has(/return\s+oben\s*==\s*null/)]]}
if(e==='stackclass'){tests=[['push: Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['push: Nachfolger auf oben',has(/setnaechster\s*\(\s*oben\s*\)/)],['push: oben = neu',has(/oben\s*=\s*neu/)],['pop: leerer Stack',has(/oben\s*==\s*null/)],['pop: oben weitergesetzt',has(/oben\s*=\s*oben\.getnaechster/)],['peek: Paket gelesen',has(/oben\.getpaket\s*\(\s*\)/)],['isEmpty vorhanden',has(/boolean\s+isempty/)]]}
if(e==='nodeclass'){tests=[['Paket-Attribut vorhanden',has(/private paket paket/)],['Nachfolger-Attribut vorhanden',has(/private knoten naechster/)],['Konstruktor speichert Paket',has(/this\.paket\s*=\s*paket/)],['Neuer Knoten endet mit null',has(/this\.naechster\s*=\s*null/)],['Getter und Setter implementiert',has(/return paket/)&&has(/return naechster/)&&has(/this\.naechster\s*=\s*naechster/)]]}
if(e==='traverse'){tests=[['Laufreferenz startet bei erster',has(/knoten aktuell\s*=\s*erster/)],['Liste wird bis null durchlaufen',has(/while\s*\(\s*aktuell\s*!=\s*null\s*\)/)],['Laufreferenz wird weitergesetzt',has(/aktuell\s*=\s*aktuell\.getnaechster\s*\(\s*\)/)],['Gewicht wird gelesen',has(/getgewicht\s*\(\s*\)/)],['Zielort wird verglichen',has(/getzielort\s*\(\s*\).*equals/)],['Paketnummer wird gesucht',has(/getpaketnummer\s*\(\s*\).*equals/)]]}
if(e==='insertAfter'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Bisherigen Nachfolger gesichert',has(/neu\.setnaechster\s*\(\s*aktuell\.getnaechster\s*\(\s*\)\s*\)/)],['aktuell zeigt danach auf neu',has(/aktuell\.setnaechster\s*\(\s*neu\s*\)/)]]}
if(e==='insertFront'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['neu zeigt auf bisherigen ersten',has(/neu\.setnaechster\s*\(\s*erster\s*\)/)],['erster wird auf neu gesetzt',has(/erster\s*=\s*neu/)]]}
if(e==='deleteFirst'){tests=[['Leere Liste behandelt',has(/erster\s*==\s*null/)],['erster auf Nachfolger gesetzt',has(/erster\s*=\s*erster\.getnaechster\s*\(\s*\)/)],['Erfolg zurückgegeben',has(/return\s+true/)]]}
if(e==='deleteSearch'){tests=[['Laufreferenzen aktuell und vorher',has(/knoten vorher\s*=\s*null/)&&has(/knoten aktuell\s*=\s*erster/)],['Suche bis Listenende',has(/while\s*\(\s*aktuell\s*!=\s*null\s*\)/)],['Paketnummer verglichen',has(/getpaketnummer\s*\(\s*\).*equals/)],['Erstes Element korrekt gelöscht',has(/vorher\s*==\s*null/)&&has(/erster\s*=\s*aktuell\.getnaechster/)],['Inneres Element umgehängt',has(/vorher\.setnaechster\s*\(\s*aktuell\.getnaechster/)],['Laufreferenzen weitergesetzt',has(/vorher\s*=\s*aktuell/)&&has(/aktuell\s*=\s*aktuell\.getnaechster/)]]}
if(e==='updatePayload'){tests=[['Liste wird traversiert',has(/knoten aktuell\s*=\s*erster/)&&has(/while\s*\(\s*aktuell\s*!=\s*null/)],['Paketnummer verglichen',has(/getpaketnummer\s*\(\s*\).*equals/)],['Status als Nutzdatum geändert',has(/setstatus\s*\(\s*neuerstatus\s*\)/)],['Keine Strukturänderung',!has(/setnaechster\s*\(/)],['Erfolg / nicht gefunden unterschieden',has(/return\s+true/)&&has(/return\s+false/)]]}
if(e==='sortedInsert'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Leere Liste / Einfügen vorne behandelt',has(/erster\s*==\s*null/)&&has(/erster\s*=\s*neu/)],['Sortierkriterium Gewicht verwendet',has(/getgewicht\s*\(\s*\)/)],['Einfügeposition wird gesucht',has(/while\s*\(/)&&has(/getnaechster\s*\(\s*\)/)],['Neue Referenzen korrekt umgehängt',has(/neu\.setnaechster\s*\(/)&&has(/aktuell\.setnaechster\s*\(\s*neu\s*\)/)]]}
if(e==='queueclass'){tests=[['enqueue: Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['enqueue: leere Queue',has(/vorne\s*==\s*null|hinten\s*==\s*null/)],['enqueue: hinten verknüpft',has(/hinten\.setnaechster\s*\(\s*neu\s*\)/)],['dequeue: vorne weitergesetzt',has(/vorne\s*=\s*vorne\.getnaechster/)],['dequeue: hinten wird null',has(/hinten\s*=\s*null/)],['front vorhanden',has(/paket\s+front\s*\(/)],['isEmpty vorhanden',has(/boolean\s+isempty\s*\(/)]]}
if(e==='sequence'){tests=[['P100, P200 und P300 werden eingefügt',has(/enqueue\s*\(\s*p100\s*\).*enqueue\s*\(\s*p200\s*\).*enqueue\s*\(\s*p300\s*\)/)],['P400 wird nach dem ersten dequeue eingefügt',has(/dequeue\s*\(\s*\)\s*;.*enqueue\s*\(\s*p400\s*\)/)],['Insgesamt vier dequeue-Aufrufe',((c.match(/dequeue\s*\(\s*\)/g)||[]).length===4)]]}
if(e==='enqueue'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Leere Queue erkannt',has(/vorne\s*==\s*null|hinten\s*==\s*null/)],['vorne für erstes Element gesetzt',has(/vorne\s*=\s*neu/)],['hinten korrekt weitergesetzt',has(/hinten\.setnaechster\s*\(\s*neu\s*\)/)&&has(/hinten\s*=\s*neu/)]]}
if(e==='dequeue'||e==='bug'){tests=[['Leere Queue behandelt',has(/vorne\s*==\s*null/)],['Vorderstes Paket gelesen',has(/vorne\.getpaket\s*\(\s*\)/)],['vorne weitergesetzt',has(/vorne\s*=\s*vorne\.getnaechster\s*\(\s*\)/)],['Letztes Element: hinten wird null',has(/if\s*\(\s*vorne\s*==\s*null\s*\)[^{;]*(\{|)\s*hinten\s*=\s*null/)],['Paket zurückgegeben',has(/return\s+paket/)]]}
let ok=tests.filter(x=>x[1]).length;$('tests').innerHTML=tests.map(x=>`<div class="testrow"><span class="${x[1]?'pass':'fail'}">${x[1]?'✓':'✗'}</span><span>${x[0]}</span></div>`).join('');$('score').textContent=`${ok} / ${tests.length} bestanden`;$('message').className='message '+(ok===tests.length?'ok':'bad');$('message').textContent=ok===tests.length?'Sehr gut. Alle vorgesehenen Tests sind bestanden.':'Noch nicht ganz. Nutze die Testergebnisse und bei Bedarf einen gestuften Hinweis.';if(ok===tests.length) showResult();}
function showResult(){let t=current(),a=[...t.start];if(t.expect==='insertFront')a.unshift('NEU');if(t.expect==='insertAfter')a.splice(Math.min(2,a.length),0,'NEU');if(t.expect==='deleteFirst')a.shift();if(t.expect==='deleteSearch'&&a.length>2)a.splice(2,1);if(t.expect==='sortedInsert')a.splice(Math.min(2,a.length),0,'NEU');if(t.expect==='push')a.unshift('P400');if(t.expect==='pop')a.shift();if(t.expect==='enqueue')a.push('P400');if(t.expect==='dequeue'||t.expect==='bug')a.shift();if(t.expect==='sequence')a=[];visual(a,'Ergebnis',t.expect==='push'||t.expect==='insertFront'?0:t.expect==='enqueue'?a.length-1:t.expect==='insertAfter'||t.expect==='sortedInsert'?Math.min(2,a.length-1):-1);$('explain').textContent='Die Referenzstruktur entspricht nach der Operation dem erwarteten Zustand.'}
$('hint').onclick=()=>{let t=current();if(hint<4)hint++;$('hintLevel').textContent=`${hint} / 4`;$('helpText').innerHTML=`<p><strong>Hilfe ${hint}</strong></p><pre>${t.hints[hint-1].replace(/</g,'&lt;')}</pre>`};
$('solution').onclick=()=>{let t=current();$('helpText').innerHTML=`<p><strong>Musterlösung</strong></p><p class="muted">Vergleiche sie mit deinem eigenen Ansatz und prüfe besonders die Referenzänderungen.</p><pre>${t.solution.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;$('hintLevel').textContent='Lösung';};
$('run').onclick=evaluate;$('reset').onclick=render;$('step').onclick=()=>{let t=current();step=(step+1)%4;let labels=['Ausgangszustand','Knoten / Wert ermitteln','Referenz vorbereiten','Referenz aktualisieren'];visual(t.start,labels[step]);$('explain').textContent=step===0?'':labels[step]+': Verfolge im Editor, welche Referenz durch die nächste Anweisung gelesen oder verändert wird.'};
$('prev').onclick=()=>{index=(index-1+tasks.length)%tasks.length;render()};$('next').onclick=()=>{index=(index+1)%tasks.length;render()};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;if(filter==='all'){index=0}else{index=tasks.findIndex(t=>t.kind===filter)}render()});render();
