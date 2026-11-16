(function(root){
  'use strict';
  const J=root.JavaSubset,P=J.packet;
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  function run(task,definition){
    const tests=[];
    function test(label,body){try{body(root.JavaClasses.createFactory(definition));tests.push({label,ok:true});}catch(e){if(e instanceof J.Limit||e instanceof J.Unsupported)throw e;tests.push({label:label+': '+e.message,ok:false});}}
    const nodeFields=Object.entries(definition.spec.fields).filter(([,type])=>type==='Knoten').map(([n])=>n);
    const emptyRefs=(factory,object)=>{
      const roles=task.checkKey==='stackclass'?['oben']:['vorne','hinten'],given=roles.filter(n=>factory.fields[n]==='Knoten');
      if(given.length!==roles.length&&nodeFields.length>roles.length)throw new J.Unsupported('Zusätzliche umbenannte Knotenfelder lassen sich den Anfangs-/Endreferenzen nicht zuverlässig zuordnen.');
      const relevant=given.length===roles.length?given:nodeFields;
      assert(relevant.every(n=>factory.get(object,n)===null),'Bei leerer Struktur müssen die Anfangs-/Endreferenzen null sein.');
    };
    if(task.checkKey==='nodeclass'){
      for(const number of [0,1,100,999])test('Konstruktor und Paketidentität '+number,f=>{const p=P(number),a=f.create(p);assert(a.getPaket()===p,'Der Konstruktor speichert nicht das übergebene Paket.');assert(a.getNaechster()===null,'Ein neuer Knoten muss ohne Nachfolger starten.');});
      test('Null als Nutzdatum',f=>{const a=f.create(null);assert(a.getPaket()===null&&a.getNaechster()===null,'Null-Nutzdatum oder Nachfolger falsch.');});
      test('Nachfolger setzen, ersetzen und entfernen',f=>{const p=P(100),a=f.create(p),b=f.create(P(200)),c=f.create(P(300));for(const next of [b,c,null,a,b]){a.setNaechster(next);assert(a.getNaechster()===next,'Setter/Getter verändern nicht dieselbe Nachfolgerreferenz.');assert(a.getPaket()===p,'Setter verändert die Nutzdaten.');assert(b.getNaechster()===null,'Andere Instanz verändert.');}});
    }else if(task.checkKey==='treenode'){
      for(const number of [0,20,50,99])test('Neue Baumknoten '+number,f=>{const p=P(number),a=f.create(p);assert(f.contains(a,p),'Das übergebene Paket wird nicht im Knoten gespeichert.');assert(a.getLinks()===null&&a.getRechts()===null,'Neue Knoten dürfen keine Kinder haben.');});
      test('Getrennte linke und rechte Referenzen',f=>{
        const a=f.create(P(50)),left=f.create(P(30)),right=f.create(P(70));
        const names=Object.entries(f.fields).filter(([,t])=>t==='BaumKnoten').map(([n])=>n),leftFields=[],rightFields=[];
        for(const name of names){const old=f.get(a,name);f.set(a,name,left);if(a.getLinks()===left)leftFields.push(name);if(a.getRechts()===left)rightFields.push(name);f.set(a,name,old);}
        assert(leftFields.length===1&&rightFields.length===1&&leftFields[0]!==rightFields[0],'Getter müssen zwei unterschiedliche Kindreferenzen lesen.');
        const leftName=f.fields.links==='BaumKnoten'?'links':leftFields[0],rightName=f.fields.rechts==='BaumKnoten'?'rechts':rightFields[0];
        f.set(a,leftName,left);f.set(a,rightName,right);assert(a.getLinks()===left&&a.getRechts()===right,'Linkes und rechtes Kind verwechselt.');assert(left.getLinks()===null&&right.getRechts()===null,'Andere Instanz verändert.');
      });
    }else if(['stackclass','queueclass'].includes(task.checkKey)){
      const stack=task.checkKey==='stackclass',put=stack?'push':'enqueue',take=stack?'pop':'dequeue',peek=stack?'peek':'front';
      test('Leere Struktur und wiederholte Entnahme',f=>{const a=f.create();assert(a.isEmpty()===true,'isEmpty meldet einen neuen Behälter nicht leer.');for(let i=0;i<3;i++)assert(a[take]()===null&&a[peek]()===null,'Leere Struktur muss null liefern.');emptyRefs(f,a);});
      for(const count of [1,2,5,12])test((stack?'LIFO':'FIFO')+' mit '+count+' Paketen',f=>{
        const a=f.create(),packets=Array.from({length:count},(_,i)=>P(100+i)),expected=[];
        for(const p of packets){a[put](p);if(stack)expected.unshift(p);else expected.push(p);assert(a.isEmpty()===false,'isEmpty nach Einfügen falsch.');assert(a[peek]()===expected[0]&&a[peek]()===expected[0],'Lesen darf nicht entfernen.');}
        while(expected.length){assert(a[peek]()===expected[0],'Falsches vorderstes/oberstes Paket.');assert(a[take]()===expected.shift(),'Falsche Entnahmereihenfolge oder falsche Paketidentität.');assert(a.isEmpty()===(expected.length===0),'Leerstatus falsch.');}
        assert(a[take]()===null&&a[peek]()===null,'Endzustand falsch.');emptyRefs(f,a);
      });
      test('Leeren und erneut befüllen',f=>{const a=f.create();for(let i=0;i<8;i++){const p=P(i);a[put](p);assert(a[take]()===p,'Erneutes Befüllen funktioniert nicht.');emptyRefs(f,a);assert(a.isEmpty()===true,'Leerstatus nach Entnahme falsch.');}});
      test('Zwei Behälter sind unabhängig',f=>{const a=f.create(),b=f.create(),p=P(1),q=P(2);a[put](p);b[put](q);assert(a[take]()===p&&b[peek]()===q,'Objekte teilen versehentlich Zustand.');assert(b[take]()===q,'Zweite Instanz falsch.');});
      test('Gemischte Operationsfolge',f=>{const a=f.create(),expected=[];for(let i=0;i<45;i++){if(i%3!==2||!expected.length){const p=P(i);a[put](p);if(stack)expected.unshift(p);else expected.push(p);}else assert(a[take]()===expected.shift(),'Gemischte Folge falsch.');assert(a[peek]()===expected[0],'peek/front verändert oder liefert falsches Paket.');}while(expected.length)assert(a[take]()===expected.shift(),'Restfolge falsch.');emptyRefs(f,a);});
    }
    if(!tests.length)throw new J.Unsupported('Klassentests fehlen.');return tests;
  }
  root.ClassCases={run};
})(globalThis);
