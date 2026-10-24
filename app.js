const tasks=[
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
function visual(arr,label,added){$('stepLabel').textContent=label;let nodes=arr.map((x,i)=>`<span class="node ${added===i?'current':''}">${x}</span>`).join('<span class="arrow">→</span>');let refs=current().kind==='stack'?`<div class="refs">oben ↓</div>`:`<div class="refs">vorne ↓ ${' '.repeat(18)} ↓ hinten</div>`;$('visualization').innerHTML=refs+`<div class="chain">${nodes}<span class="arrow">→ null</span></div>`;$('explain').textContent='';}
function normalize(s){return s.replace(/\s+/g,' ').toLowerCase()}
function evaluate(){let c=normalize($('code').value),e=current().expect,tests=[];const has=(r)=>r.test(c);if(e==='push'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Neuer Knoten zeigt auf bisherigen Stack',has(/neu\.setnaechster\s*\(\s*oben\s*\)/)],['oben wird auf neuen Knoten gesetzt',has(/oben\s*=\s*neu/)]]}
if(e==='pop'){tests=[['Leeren Stack behandelt',has(/oben\s*==\s*null/)],['Paket vor Referenzänderung gelesen',has(/oben\.getpaket\s*\(\s*\)/)],['oben auf Nachfolger gesetzt',has(/oben\s*=\s*oben\.getnaechster\s*\(\s*\)/)],['Paket zurückgegeben',has(/return\s+paket/)]]}
if(e==='peek'){tests=[['peek behandelt leeren Stack',has(/oben\s*==\s*null/)],['peek liest oberstes Paket',has(/oben\.getpaket\s*\(\s*\)/)],['isEmpty prüft oben',has(/return\s+oben\s*==\s*null/)]]}
if(e==='stackclass'){tests=[['push: Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['push: Nachfolger auf oben',has(/setnaechster\s*\(\s*oben\s*\)/)],['push: oben = neu',has(/oben\s*=\s*neu/)],['pop: leerer Stack',has(/oben\s*==\s*null/)],['pop: oben weitergesetzt',has(/oben\s*=\s*oben\.getnaechster/)],['peek: Paket gelesen',has(/oben\.getpaket\s*\(\s*\)/)],['isEmpty vorhanden',has(/boolean\s+isempty/)]]}
if(e==='queueclass'){tests=[['enqueue: Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['enqueue: leere Queue',has(/vorne\s*==\s*null|hinten\s*==\s*null/)],['enqueue: hinten verknüpft',has(/hinten\.setnaechster\s*\(\s*neu\s*\)/)],['dequeue: vorne weitergesetzt',has(/vorne\s*=\s*vorne\.getnaechster/)],['dequeue: hinten wird null',has(/hinten\s*=\s*null/)],['front vorhanden',has(/paket\s+front\s*\(/)],['isEmpty vorhanden',has(/boolean\s+isempty\s*\(/)]]}
if(e==='sequence'){tests=[['P100, P200 und P300 werden eingefügt',has(/enqueue\s*\(\s*p100\s*\).*enqueue\s*\(\s*p200\s*\).*enqueue\s*\(\s*p300\s*\)/)],['P400 wird nach dem ersten dequeue eingefügt',has(/dequeue\s*\(\s*\)\s*;.*enqueue\s*\(\s*p400\s*\)/)],['Insgesamt vier dequeue-Aufrufe',((c.match(/dequeue\s*\(\s*\)/g)||[]).length===4)]]}
if(e==='enqueue'){tests=[['Neuen Knoten erzeugt',has(/new knoten\s*\(\s*paket\s*\)/)],['Leere Queue erkannt',has(/vorne\s*==\s*null|hinten\s*==\s*null/)],['vorne für erstes Element gesetzt',has(/vorne\s*=\s*neu/)],['hinten korrekt weitergesetzt',has(/hinten\.setnaechster\s*\(\s*neu\s*\)/)&&has(/hinten\s*=\s*neu/)]]}
if(e==='dequeue'||e==='bug'){tests=[['Leere Queue behandelt',has(/vorne\s*==\s*null/)],['Vorderstes Paket gelesen',has(/vorne\.getpaket\s*\(\s*\)/)],['vorne weitergesetzt',has(/vorne\s*=\s*vorne\.getnaechster\s*\(\s*\)/)],['Letztes Element: hinten wird null',has(/if\s*\(\s*vorne\s*==\s*null\s*\)[^{;]*(\{|)\s*hinten\s*=\s*null/)],['Paket zurückgegeben',has(/return\s+paket/)]]}
let ok=tests.filter(x=>x[1]).length;$('tests').innerHTML=tests.map(x=>`<div class="testrow"><span class="${x[1]?'pass':'fail'}">${x[1]?'✓':'✗'}</span><span>${x[0]}</span></div>`).join('');$('score').textContent=`${ok} / ${tests.length} bestanden`;$('message').className='message '+(ok===tests.length?'ok':'bad');$('message').textContent=ok===tests.length?'Sehr gut. Alle vorgesehenen Tests sind bestanden.':'Noch nicht ganz. Nutze die Testergebnisse und bei Bedarf einen gestuften Hinweis.';if(ok===tests.length) showResult();}
function showResult(){let t=current(),a=[...t.start];if(t.expect==='push')a.unshift('P400');if(t.expect==='pop')a.shift();if(t.expect==='enqueue')a.push('P400');if(t.expect==='dequeue'||t.expect==='bug')a.shift();if(t.expect==='sequence')a=[];visual(a,'Ergebnis',t.expect==='push'?0:t.expect==='enqueue'?a.length-1:-1);$('explain').textContent='Die Referenzstruktur entspricht nach der Operation dem erwarteten Zustand.'}
$('hint').onclick=()=>{let t=current();if(hint<4)hint++;$('hintLevel').textContent=`${hint} / 4`;$('helpText').innerHTML=`<p><strong>Hilfe ${hint}</strong></p><pre>${t.hints[hint-1].replace(/</g,'&lt;')}</pre>`};
$('solution').onclick=()=>{let t=current();$('helpText').innerHTML=`<p><strong>Musterlösung</strong></p><p class="muted">Vergleiche sie mit deinem eigenen Ansatz und prüfe besonders die Referenzänderungen.</p><pre>${t.solution.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;$('hintLevel').textContent='Lösung';};
$('run').onclick=evaluate;$('reset').onclick=render;$('step').onclick=()=>{let t=current();step=(step+1)%4;let labels=['Ausgangszustand','Knoten / Wert ermitteln','Referenz vorbereiten','Referenz aktualisieren'];visual(t.start,labels[step]);$('explain').textContent=step===0?'':labels[step]+': Verfolge im Editor, welche Referenz durch die nächste Anweisung gelesen oder verändert wird.'};
$('prev').onclick=()=>{index=(index-1+tasks.length)%tasks.length;render()};$('next').onclick=()=>{index=(index+1)%tasks.length;render()};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;if(filter==='all'){index=0}else{index=tasks.findIndex(t=>t.kind===filter)}render()});render();
