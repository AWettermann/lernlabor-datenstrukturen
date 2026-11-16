'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync(require('node:path').join(__dirname,'../storage.js'),'utf8');
function load(localStorage){const ctx={localStorage};vm.runInNewContext(source,ctx);return ctx.LabStorage;}
test('Speicher: normale Lese-, Schreib- und Löschzugriffe',()=>{
  const data=new Map(),s=load({getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)});
  s.set('x','1');assert.equal(s.get('x'),'1');assert.equal(data.get('x'),'1');s.remove('x');assert.equal(s.get('x'),null);assert.equal(s.temporary,false);
});
test('Speicher: gesperrte API erlaubt Arbeit in derselben Sitzung',()=>{
  const s=load({getItem(){throw Error('denied');},setItem(){throw Error('denied');},removeItem(){throw Error('denied');}});
  assert.equal(s.get('x'),null);s.set('x','neu');assert.equal(s.get('x'),'neu');s.remove('x');assert.equal(s.get('x'),null);assert.equal(s.temporary,true);
});
test('Speicher: volle Quote darf den aktuellen Entwurf nicht durch alte Daten ersetzen',()=>{
  const s=load({getItem:()=> 'alt',setItem(){throw Error('quota');},removeItem(){throw Error('denied');}});
  s.set('x','neu');assert.equal(s.get('x'),'neu');s.remove('x');assert.equal(s.get('x'),null);
});
test('Speicher: beschädigtes JSON und falsche Grundtypen werden abgefangen',()=>{
  for(const value of ['{','null','[]','3','"text"']){const s=load({getItem:()=>value});assert.deepEqual(s.json('x',{fallback:true}),{fallback:true});}
});
test('Speicher: fehlende Browser-API erzeugt keinen Startfehler',()=>{
  const s=load(undefined);s.set('x','1');assert.equal(s.get('x'),'1');assert.equal(s.temporary,true);
});
