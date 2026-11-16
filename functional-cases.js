/* Independent fixtures and behavioral assertions for the supported Java subset. */
(function(root) {
  'use strict';
  const J=root.JavaSubset, P=J.packet, N=J.node;
  function chain(packets) {let first=null;for(let i=packets.length-1;i>=0;i--){const n=N('Knoten',packets[i]);n.next=first;first=n;}return first;}
  function entries(n) {const seen=new Set(),a=[];while(n){if(seen.has(n)||seen.size>100)throw new Error('Die Liste enthält einen Zyklus.');seen.add(n);a.push(n.p);n=n.next;}return a;}
  function tree(v) {if(v==null)return null;const n=N('BaumKnoten',P(v[0],v[3]??(v[0]/10+.25)));n.left=tree(v[1]);n.right=tree(v[2]);return n;}
  function snapshot(n,seen=new Set()) {if(!n)return null;if(seen.has(n)||seen.size>100)throw new Error('Zyklus oder mehrfach verwendeter Baumknoten.');seen.add(n);return [n.p.num,n.p.weight,snapshot(n.left,seen),snapshot(n.right,seen)];}
  function inorder(n) {return n?[...inorder(n.left),n.p.num,...inorder(n.right)]:[];}
  function traverse(n,order) {if(!n)return [];const l=traverse(n.left,order),r=traverse(n.right,order);return order==='preorder'?[n,...l,...r]:order==='inorder'?[...l,n,...r]:[...l,...r,n];}
  function measure(n,kind) {if(!n)return 0;const l=measure(n.left,kind),r=measure(n.right,kind);return kind==='height'?1+Math.max(l,r):kind==='leaves'?!n.left&&!n.right?1:l+r:kind==='weight'?n.p.weight+l+r:1+l+r;}
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  function graphState(n){const states=[];const seen=new Set();function visit(x){if(!x)return;if(seen.has(x))throw new Error('Zyklus im Baum.');seen.add(x);states.push([x,x.p,x.left,x.right,x.p.num,x.p.weight,x.p.status]);visit(x.left);visit(x.right);}visit(n);return ()=>states.every(([x,p,l,r,num,w,status])=>x.p===p&&x.left===l&&x.right===r&&p.num===num&&p.weight===w&&p.status===status);}
  const shapes=[
    ['Leerer Baum',null],['Einzelner Knoten',[50]],['Nur linkes Kind',[50,[30]]],['Nur rechtes Kind',[50,null,[70]]],
    ['Zwei Ebenen',[50,[30],[70]]],['Drei Ebenen / Blätter 20, 40, 60',[50,[30,[20],[40]],[70,[60]]]],
    ['Vier Knoten als linke Kette',[50,[40,[30,[20]]]]],['Vier Knoten als rechte Kette',[20,null,[30,null,[40,null,[50]]]]],
    ['Vollständiger Baum',[50,[30,[20],[40]],[70,[60],[80]]]],['Unsymmetrischer Baum',[8,[3,null,[5,[4]]],[12,null,[15]]]],
    ['Negative und gleiche Nutzdaten',[0,[-4,[-4],[0]],[0,null,[5]]]],['Gewichte null und gebrochen',[7,[3,null,null,0],[9,null,null,2.75],.5]]
  ];
  let seed=41827;
  function random() {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}
  function generated(depth) {if(depth===0||random()<.25)return null;return [Math.floor(random()*200)-100,generated(depth-1),generated(depth-1),Math.floor(random()*100)/4];}
  for(let i=0;i<40;i++)shapes.push(['Zusatzbaum '+(i+1),generated(5)]);
  function run(t,methods) {
    const tests=[];
    function test(label,body) {
      try{body();tests.push({label,ok:true});}
      catch(e){if(e instanceof J.Limit)throw e;tests.push({label:label+': '+e.message,ok:false});}
    }
    function runtime(initial={},nativeImpl={}) {
      return J.createRuntime(methods,{...t.spec,nativeImpl:{minimum:k=>{while(k.left)k=k.left;return k;},verarbeiten:()=>{},...nativeImpl}},initial);
    }
    const key=t.checkKey;
    if(['treecount','leaves','height','weight','inorder','preorder','postorder'].includes(key)) {
      for(const [label,shape] of shapes) test(label,()=>{
        const k=tree(shape),before=snapshot(k),unchanged=graphState(k),out=[];
        const r=runtime({}, {verarbeiten:n=>out.push(n)});
        const value=r.call(t.spec.methods[0].name,[k]);
        if(['inorder','preorder','postorder'].includes(key)){const expected=traverse(k,key);assert(out.length===expected.length&&out.every((n,i)=>n===expected[i]),'Verarbeitungsreihenfolge oder Knotenidentität stimmt nicht.');}
        else {const expected=measure(k,key);assert(Math.abs(value-expected)<1e-9,`erwartet ${expected}, erhalten ${value}`);}
        assert(same(snapshot(k),before)&&unchanged(),'Die Methode verändert den Baum oder seine Nutzdaten.');
      });
    } else if(key==='minimum') {
      for(const [label,shape] of [['Einzelknoten',[50]],['Linke Kette',[50,[30,[20]]] ],['Mit rechtem Kind',[50,[30,null,[40]],[70]]],['Kein linkes Kind',[50,null,[70]]]])test(label,()=>{
        const k=tree(shape),before=snapshot(k),unchanged=graphState(k);let want=k;while(want.left)want=want.left;
        assert(runtime().call('minimum',[k])===want,'Falscher Minimumknoten.');assert(same(before,snapshot(k))&&unchanged(),'Baum wurde verändert.');
      });
    } else if(key==='bstsearch') {
      for(const shape of [null,[50],[50,[30,[20],[40]],[70,[60],[80]]],[10,null,[20,null,[30,null,[40]]]]]) {
        for(const num of [10,20,30,40,50,60,70,80,0,35,100])test('Suche '+num+' / '+JSON.stringify(shape),()=>{
          const k=tree(shape),before=snapshot(k),unchanged=graphState(k);let want=k;const path=new Set();
          while(want){path.add(want);if(want.p.num===num)break;want=num<want.p.num?want.left:want.right;}
          // Observe actual node accesses to enforce the requested search-path restriction.
          const touched=new Set();(function instrument(n){if(!n)return;for(const name of ['getNummer','getPaket','getLinks','getRechts']){const f=n[name];n[name]=function(...args){touched.add(this);return f.apply(this,args);};}instrument(n.left);instrument(n.right);})(k);
          const result=runtime().call('suchen',[k,num]);assert(result===(want?.p??null),'Falsches Suchergebnis.');
          assert([...touched].every(n=>path.has(n)),'Es wurde ein Teilbaum außerhalb des Suchpfades untersucht.');assert(same(snapshot(k),before)&&unchanged(),'Suche verändert den Baum.');
        });
      }
    } else if(key==='bstinsert') {
      for(const nums of [[50],[50,30,70,20,40,60,80],[10,20,30,40],[40,30,20,10],[50,50,30,70,50],[-10,0,-30,5]])test('Einfügefolge '+nums,()=>{
        const r=runtime();let k=null;const packets=[];
        for(const num of nums){const p=P(num);packets.push(p);k=r.call('einfuegen',[k,p]);snapshot(k);assert(same(inorder(k),packets.map(p=>p.num).sort((a,b)=>a-b)),'Inorder oder Knotenanzahl stimmt nicht.');}
        function ordered(n,low=-Infinity,high=Infinity){if(!n)return;assert(n.p.num>=low&&n.p.num<high,'Suchbaumordnung (Duplikate rechts) verletzt.');ordered(n.left,low,n.p.num);ordered(n.right,n.p.num,high);}ordered(k);
      });
    } else if(key==='bstdelete') {
      const cases=[['Leerer Baum',null,50],['Einziges Element',[50],50],['Nicht gefunden',[50,[30],[70]],99],['Blatt',[50,[30,[20],[40]],[70]],20],['Nur linkes Kind',[50,[30],[70,[60]]],70],['Nur rechtes Kind',[50,[30],[70,null,[80]]],70],['Wurzel mit linkem Kind',[50,[30]],50],['Wurzel mit rechtem Kind',[50,null,[70]],50],['Zwei Kinder / direkter Nachfolger',[50,[30],[70,null,[80]]],50],['Tiefer Nachfolger mit Kind',[50,[30],[80,[60,null,[70]],[90]]],50]];
      for(const [label,shape,num] of cases)test(label,()=>{
        const k=tree(shape),want=inorder(k),at=want.indexOf(num);if(at>=0)want.splice(at,1);
        const result=runtime().call('loeschen',[k,num]);snapshot(result);assert(same(inorder(result),want),'Gelöschte Schlüssel oder verbleibender Baum falsch.');
      });
      test('Alle Knoten nacheinander löschen',()=>{const r=runtime();let k=tree([50,[30,[20],[40]],[70,[60],[80]]]);for(const num of [50,30,80,70,20,60,40]){k=r.call('loeschen',[k,num]);snapshot(k);assert(!inorder(k).includes(num),'Schlüssel noch vorhanden.');}assert(k===null,'Baum am Ende nicht leer.');});
    } else if(key==='choose') {
      for(const [request,want] of [['UNDO','Stack'],['FIFO','Queue'],['PRAEFIX','Trie'],['INDEXZUGRIFF','Array'],['SCHLUESSELSUCHE','Suchbaum'],['ANDERES','unbekannt'],['','unbekannt']])test(request||'Leere Anforderung',()=>assert(runtime().call('waehle',[request])===want,'Falsche Strukturwahl.'));
    } else if(['insertAfter','insertFront','deleteFirst','deleteSearch','updatePayload','sortedInsert','traverse','insertBetween','frontFragment','removeFragment'].includes(key)) {
      for(const size of (['removeFragment','insertBetween'].includes(key)?[1,4]:[0,1,4])) {
        const positions=['insertAfter','deleteSearch','updatePayload'].includes(key)?[-1,0,size-1]:[0];
        for(const pos of [...new Set(positions)])test(`Liste: ${size} Elemente, Position ${pos}`,()=>{
          const packets=Array.from({length:size},(_,i)=>P(100+i*100,i+.5,i%2?'Köln':'Bonn')),first=chain(packets),neu=N('Knoten',P(999,1)),r=runtime({erster:first,neu,aktuell:first});
          const list=()=>entries(r.get('erster'));
          const originalNodes=[];for(let n=first;n;n=n.next)originalNodes.push([n,n.next,n.p,n.p.status]);
          const linksUnchanged=()=>originalNodes.every(([n,next,p])=>n.next===next&&n.p===p);
          if(key==='insertAfter'){let at=first;for(let i=0;i<pos&&at;i++)at=at.next;if(pos<0)at=null;const p=P(999);r.call('einfuegenNach',[at,p]);const expected=[...packets];if(at)expected.splice(pos+1,0,p);assert(same(list(),expected),'Restliste oder Einfügeposition falsch.');}
          if(key==='insertFront'){const p=P(999);r.call('vorneEinfuegen',[p]);assert(same(list(),[p,...packets]),'Neuer Anfang oder Restliste falsch.');}
          if(key==='deleteFirst'){const got=r.call('erstesLoeschen',[]);assert(got===(size>0),'Erfolgswert falsch.');assert(same(list(),packets.slice(1)),'Falsches erstes Element entfernt.');}
          if(key==='deleteSearch'){const found=pos>=0&&pos<size,num=found?'P'+packets[pos].num:'P999';const got=r.call('loeschePaket',[num]),want=[...packets];if(found)want.splice(pos,1);assert(got===found,'Erfolgswert falsch.');assert(same(list(),want),'Falsches Element entfernt oder Rest verloren.');}
          if(key==='updatePayload'){const found=pos>=0&&pos<size,num=found?'P'+packets[pos].num:'P999';const got=r.call('aktualisiereStatus',[num,'versandt']);assert(got===found,'Erfolgswert falsch.');assert(r.get('erster')===first&&linksUnchanged(),'Referenzstruktur verändert.');assert(list().every((p,i)=>p===packets[i]&&p.status===(found&&i===pos?'versandt':'offen')),'Nutzdaten oder Referenzstruktur falsch.');}
          if(key==='sortedInsert'){for(const w of [-1,.5,1,9]){const p=P(900+w,w);r.call('sortiertEinfuegen',[p]);packets.push(p);packets.sort((a,b)=>a.weight-b.weight);assert(same(list(),packets),'Nicht aufsteigend nach Gewicht oder Elemente verloren.');}}
          if(key==='traverse'){assert(r.call('anzahlPakete',[])===size,'Knotenzahl falsch.');assert(r.call('gesamtGewicht',[])===packets.reduce((a,p)=>a+p.weight,0),'Gesamtgewicht falsch.');assert(r.call('zaehlePaketeNach',['Bonn'])===Math.ceil(size/2),'Zielortanzahl falsch.');assert(r.call('zaehlePaketeNach',['Berlin'])===0,'Nicht vorhandener Zielort.');for(const p of packets)assert(r.call('suchePaket',['P'+p.num])===p,'Paket nicht gefunden.');assert(r.call('suchePaket',['P999'])===null,'Erfolglose Suche muss null liefern.');assert(same(list(),packets)&&linksUnchanged()&&originalNodes.every(([n,next,p,status])=>p.status===status),'Traversierung verändert Liste oder Nutzdaten.');}
          if(key==='insertBetween'){if(!first)return;const rest=first.next;r.call('loesung',[]);assert(first.next===neu&&neu.next===rest,'Die alte Verbindung geht verloren.');entries(first);}
          if(key==='frontFragment'){r.call('loesung',[]);assert(r.get('erster')===neu&&neu.next===first,'Falscher Anfang oder alter Anfang verloren.');entries(neu);}
          if(key==='removeFragment'){r.call('loesung',[]);assert(r.get('erster')===first.next,'Falsche Nachfolgerreferenz.');}
        });
      }
    } else if(['push','pop','pushFragment','popGuard'].includes(key)) {
      for(const size of [0,1,4])test('Stack mit '+size+' Elementen',()=>{
        const packets=Array.from({length:size},(_,i)=>P(i)),first=chain(packets),neu=N('Knoten',P(99)),r=runtime({oben:first,neu});
        if(key==='push'){const p=P(50);r.call('push',[p]);assert(same(entries(r.get('oben')),[p,...packets]),'push verliert den bisherigen Stack.');}
        if(key==='pop'){const got=r.call('pop',[]);assert(got===(packets[0]??null),'Falscher Rückgabewert.');assert(same(entries(r.get('oben')),packets.slice(1)),'Falscher Zustand nach pop.');if(size===1)assert(r.call('pop',[])===null,'Erneutes pop auf leerem Stack.');}
        if(key==='pushFragment'){r.call('loesung',[]);assert(r.get('oben')===neu&&neu.next===first,'Referenzfolge falsch.');entries(neu);}
        if(key==='popGuard'){assert(r.call('loesung',[])===(packets[0]??null),'Der Basisfall oder die Fortsetzung passt nicht.');assert(r.get('oben')===first,'Ein Basisfall verändert den Stack nicht.');}
      });
    } else if(['enqueue','dequeue','bug','queueTail'].includes(key)) {
      for(const size of [0,1,4])test('Queue mit '+size+' Elementen',()=>{
        const packets=Array.from({length:size},(_,i)=>P(i)),first=chain(packets);let tail=first;while(tail?.next)tail=tail.next;
        if(key==='queueTail') {const r=runtime({vorne:null,hinten:tail||N('Knoten',P(5))});r.call('loesung',[]);assert(r.get('hinten')===null&&r.get('vorne')===null,'Beide Referenzen müssen null sein.');return;}
        const r=runtime({vorne:first,hinten:tail}),queue=()=>entries(r.get('vorne'));
        const invariant=()=>{const vals=queue();let last=r.get('vorne');while(last?.next)last=last.next;assert(r.get('hinten')===last,'hinten ist nicht der letzte Knoten bzw. null.');assert(vals.length===0?r.get('vorne')===null:true,'Leerzustand falsch.');};
        if(key==='enqueue'){for(const num of [99,100]){const p=P(num);r.call('enqueue',[p]);packets.push(p);assert(same(queue(),packets),'FIFO-Reihenfolge oder Restqueue falsch.');invariant();}}
        else {while(packets.length){assert(r.call('dequeue',[])===packets.shift(),'Falsches Paket entnommen.');assert(same(queue(),packets),'Restqueue falsch.');invariant();}assert(r.call('dequeue',[])===null,'Leere Queue liefert nicht null.');invariant();}
      });
    } else if(['deleteLeaf','deleteChild'].includes(key))test('Kindreferenz ersetzen',()=>{
      const k=tree([50,[30,[20],[40]],[70,[60]]]),k30=k.left,k70=k.right,r=runtime({k30,k50:k,k70});
      r.call('loesung',[]);if(key==='deleteLeaf')assert(k30.left===null&&k30.right.p.num===40,'Falsches Kind abgehängt.');else assert(k.right===k70.left&&k.left===k30,'Kind rückt nicht korrekt nach.');snapshot(k);
    });
    if(!tests.length)throw new J.Unsupported('Für diese Aufgabe fehlt eine funktionale Testspezifikation.');
    return tests;
  }
  root.FunctionalCases={run,tree,measure,shapes,chain,entries};
})(globalThis);
