(function(root){
  'use strict';
  const J=root.JavaSubset;
  const assert=(ok,message)=>{if(!ok)throw new Error(message);};
  function build(keys){const root=J.trieInner();for(const key of keys){let at=root;for(let i=0;i<key.length;i++){const digit=Number(key[i]);if(i===key.length-1)at.children[digit]=J.trieLeaf(key);else {if(!at.children[digit])at.children[digit]=J.trieInner();at=at.children[digit];}}}return root;}
  function follow(node,key){for(const digit of key){if(node?.type!=='InnererKnoten')return null;node=node.children[Number(digit)];}return node;}
  function words(node){const found=[],seen=new Set();function walk(n){if(!n)return;if(seen.has(n)||seen.size>2000)throw new Error('Zyklus oder ungültig geteilter Trie-Knoten.');seen.add(n);if(n.type==='Blatt'){found.push(n.key);return;}assert(n.type==='InnererKnoten','Innerer Knoten oder Blatt erwartet.');for(const child of n.children)walk(child);}walk(node);return found.sort();}
  function unchanged(node){const states=[],seen=new Set();function walk(n){if(!n||seen.has(n))return;seen.add(n);if(n.type==='InnererKnoten'){states.push([n,n.children.slice()]);n.children.forEach(walk);}else states.push([n,n.key]);}walk(node);return ()=>states.every(([n,v])=>Array.isArray(v)?n.type==='InnererKnoten'&&v.every((x,i)=>n.children[i]===x):n.type==='Blatt'&&n.key===v);}
  const sets=[[],['0','3','9'],['00','01','10','19','99'],['1234','1257','1289','4312','4355'],['000000','000009','019999','123456','999999']];
  function run(t,methods){
    const tests=[];
    function test(label,body){try{body();tests.push({label,ok:true});}catch(e){if(e instanceof J.Limit||e instanceof J.Unsupported)throw e;tests.push({label:label+': '+e.message,ok:false});}}
    const runtime=tree=>J.createRuntime(methods,t.spec,{wurzel:tree});
    if(t.checkKey==='triesearch'){
      for(const keys of sets){const queries=new Set([...keys,'','2','12','123','1234','12345','0000','9999','9999999','111111']);for(const key of keys){queries.add(key.slice(0,-1));queries.add(key+'0');}for(const key of queries)test(`Suche „${key}“ bei ${keys.join(',')||'leerem Trie'}`,()=>{const tree=build(keys),same=unchanged(tree);assert(runtime(tree).call('suchen',[key])===keys.includes(key),'Exakte Suche muss zwischen vollständigem Schlüssel, Präfix und fehlendem Pfad unterscheiden.');assert(same(),'Suche verändert den Trie.');});}
    }else if(t.checkKey==='prefix'){
      for(const keys of sets){const prefixes=new Set(['','0','1','2','12','123','1234','12345','99','9999999']);for(const key of keys)for(let i=0;i<=key.length;i++)prefixes.add(key.slice(0,i));for(const prefix of prefixes)test(`Präfix „${prefix}“ bei ${keys.join(',')||'leerem Trie'}`,()=>{const tree=build(keys),same=unchanged(tree),expected=follow(tree,prefix);assert(runtime(tree).call('findePraefix',[prefix])===expected,'Falscher Präfixknoten oder fehlender Nullfall.');assert(same(),'Präfixsuche verändert den Trie.');});}
    }else if(t.checkKey==='trieinsert'){
      for(const keys of sets.filter(a=>a.length))for(const emptyRoot of [true,false])test(`Einfügen ${keys.join(',')} / ${emptyRoot?'null-Wurzel':'innere Wurzel'}`,()=>{
        const r=runtime(J.trieInner());let tree=emptyRoot?null:J.trieInner();const expected=new Set();
        for(const key of [...keys,keys[0],...keys].reverse()){tree=r.call('einfuegen',[tree,key,0]);expected.add(key);assert(JSON.stringify(words(tree))===JSON.stringify([...expected].sort()),'Schlüssel fehlt, Geschwisterpfad verloren oder Duplikat falsch.');for(const want of expected){const leaf=follow(tree,want);assert(leaf?.type==='Blatt'&&leaf.getPaketnummer()===want,'Ziffernpfad oder vollständige Paketnummer im Blatt falsch.');}}
      });
      for(const pos of [1,2,3,4])test('Rekursiver Einstieg an Position '+pos,()=>{const key='1234',r=runtime(J.trieInner()),subtree=r.call('einfuegen',[null,key,pos]);assert(follow(subtree,key.slice(pos))?.key===key,'position + 1, Blattbasisfall oder gespeicherter vollständiger Schlüssel falsch.');assert(JSON.stringify(words(subtree))===JSON.stringify([key]),'Unerwartete Blätter.');});
      test('Alle zehn Ziffern als Geschwister',()=>{const r=runtime(J.trieInner());let tree=J.trieInner();for(let d=0;d<10;d++)tree=r.call('einfuegen',[tree,'12'+d+'7',0]);assert(words(tree).length===10,'Kindindex oder Geschwistererhaltung falsch.');});
    }
    if(!tests.length)throw new J.Unsupported('Trie-Tests fehlen.');return tests;
  }
  root.TrieCases={run,build,follow,words};
})(globalThis);
