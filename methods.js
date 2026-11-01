// Nachschlagehilfe; keine Musterlösungen und keine Abhängigkeit von Schülereingaben.
(()=>{
const catalog={
 getPaket:['Paket','Liefert die gespeicherten Nutzdaten.'],
 getNaechster:['Knoten','Liefert den Nachfolger; am Ende null.'],
 setNaechster:['void','Setzt die Nachfolgerreferenz.','Knoten naechster'],
 getGewicht:['double','Liefert das Gewicht eines Pakets.'],
 getZielort:['String','Liefert den Zielort eines Pakets.'],
 getPaketnummer:['String','Liefert die Paketnummer als Text.'],
 setStatus:['void','Ändert den Status eines Pakets.','String neuerStatus'],
 getLinks:['BaumKnoten','Liefert das linke Kind; ggf. null.'],
 getRechts:['BaumKnoten','Liefert das rechte Kind; ggf. null.'],
 setLinks:['void','Setzt die linke Kindreferenz.','BaumKnoten links'],
 setRechts:['void','Setzt die rechte Kindreferenz.','BaumKnoten rechts'],
 getNummer:['int','Liefert den numerischen Suchschlüssel.'],
 setPaket:['void','Ersetzt die Nutzdaten des Baumknotens.','Paket paket'],
 getKind:['Knoten','Liefert das Kind an Ziffernindex 0 bis 9; ggf. null.','int ziffer'],
 setKind:['void','Setzt das Kind an Ziffernindex 0 bis 9.','int ziffer, Knoten kind'],
 equals:['boolean','Vergleicht den Inhalt zweier Zeichenketten.','String text'],
 length:['int','Liefert die Anzahl der Zeichen.'],
 charAt:['char','Liefert das Zeichen am Index (ab 0).','int index'],
 verarbeiten:['void','Verarbeitet den aktuellen Baumknoten; vorgegebene Hilfsmethode.','BaumKnoten k'],
 minimum:['BaumKnoten','Liefert den kleinsten Knoten eines nicht leeren Teilbaums.','BaumKnoten k']
};
function entry(signature,description,example,cls=''){
 return `<div class="method-entry ${cls}"><code>${safe(signature)}</code><p>${safe(description)}</p>${example?'<small>Aufruf: <code>'+safe(example)+'</code></small>':''}</div>`;
}
function updateMethods(){
 const t=current(),kind=t.sourceKind||t.kind,src=t.code+'\n'+t.solution;
 const targets=[...t.code.matchAll(/(?:public|private|protected)\s+(?:(?:static|final)\s+)*(\w+(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)/g)];
 const targetNames=new Set(targets.map(m=>m[2]));
 let names=[...new Set([...src.matchAll(/\b(\w+)\s*\(/g)].map(m=>m[1]))].filter(n=>catalog[n]&&!targetNames.has(n));
 const contexts={list:'Startreferenz: Knoten erster',stack:'Startreferenz: Knoten oben',queue:'Referenzen: Knoten vorne, Knoten hinten',tree:'Parameter: BaumKnoten k',traversal:'Parameter: BaumKnoten k',bst:'Parameter: BaumKnoten k',bst2:'Parameter: BaumKnoten k',trie:'Startreferenz: Knoten wurzel; InnererKnoten enthält Kinder, Blatt speichert den Schlüssel.'};
 let html='<p class="method-note">Signaturen und Aufrufbeispiele – die Implementierung entwickeln Sie im Editor. Vor einem Zugriff muss die Referenz auf ein Objekt zeigen (≠ null).</p>';
 if(contexts[kind])html+='<div class="method-context">'+safe(contexts[kind])+'</div>';
 html+='<h3>Verfügbare Methoden / Hilfsmethoden</h3>';
 html+=names.map(n=>{let [ret,desc,args='']=catalog[n];let receiver=['getGewicht','getZielort','getPaketnummer','setStatus'].includes(n)?'paket.':['equals','length','charAt'].includes(n)?'text.':n==='minimum'||n==='verarbeiten'?'':['getLinks','getRechts','setLinks','setRechts','getNummer','setPaket'].includes(n)?'k.':kind==='trie'?'innen.':'aktuell.';let params=args.split(', ').filter(Boolean).map(x=>x.split(' ').at(-1)).join(', ');return entry(ret+' '+n+'('+args+')',desc,receiver+n+'('+params+')');}).join('');
 if(src.includes('Math.max'))html+=entry('int Math.max(int a, int b)','Liefert den größeren der beiden Werte.','Math.max(a, b)');
 const constructors=[...new Set([...src.matchAll(/new\s+(\w+)\(([^()]*)\)/g)].map(m=>m[1]+'('+m[2]+')'))];
 if(constructors.length)html+='<h3>Objekte erzeugen</h3>'+constructors.map(x=>entry('new '+x,'Erzeugt ein neues Objekt (Konstruktor).','')).join('');
 if(!names.length&&!constructors.length)html+='<p class="method-note">Diese Aufgabe benötigt keine vorgegebenen Objektmethoden.</p>';
 if(targets.length)html+='<h3>Hier zu entwickeln</h3>'+targets.map(m=>entry(m[1]+' '+m[2]+'('+m[3]+')','Auftrag dieser Station; noch selbst zu implementieren.','', 'method-target')).join('');
 $('methodContent').innerHTML=html;
}
const previousRender=render;render=function(){previousRender();updateMethods()};
updateMethods();
})();
