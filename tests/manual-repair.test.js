'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {tasks,Assessment:A,J}=require('./load'),alternatives=require('./alternatives');
const former=['nodeclass','stackclass','queueclass','treenode','triesearch','trieinsert','prefix'];
const task=key=>tasks.find(t=>t.checkKey===key);
const mutations={
  nodeclass:[['this.paket = paket;',''],['this.naechster = naechster;',''],['return naechster;','return null;'],['this.naechster = null;','this.naechster = this;'],['this.naechster = naechster;','this.naechster = naechster; this.paket = null;']],
  stackclass:[['neu.setNaechster(oben);','neu.setNaechster(null);'],['oben = oben.getNaechster();',''],['return oben.getPaket();','return pop();'],['return oben == null;','return oben != null;'],['return paket;','return null;']],
  queueclass:[['if (vorne == null) hinten = null;',''],['hinten.setNaechster(neu);',''],['vorne = vorne.getNaechster();',''],['return vorne.getPaket();','return dequeue();'],['return vorne == null;','return vorne != null;']],
  treenode:[['return links;','return null;'],['return rechts;','return null;'],['return links; }','return rechts; }'],['this.paket = paket;',''],['this.links = null;','this.links = this;']],
  triesearch:[['return aktuell instanceof Blatt;','return true;'],['return aktuell instanceof Blatt;','return aktuell instanceof InnererKnoten;'],['if (aktuell == null) return false;','if (aktuell == null) return true;'],['getKind(ziffer)','getKind(i)'],["charAt(i) - '0'","charAt(i) - '1'"]],
  trieinsert:[['innen.setKind(ziffer, kind);',''],['new Blatt(paketnummer)','new Blatt("falsch")'],['innen.setKind(ziffer, kind);','innen.setKind(0, kind);'],['position + 1','position + 2'],['position == paketnummer.length()','position + 1 == paketnummer.length()']],
  prefix:[['return aktuell;','return wurzel;'],['if (aktuell == null) return null;','if (aktuell == null) return wurzel;'],['i < praefix.length()','i + 1 < praefix.length()'],['getKind(ziffer)','getKind(i)'],['return aktuell;','return null;']]
};
for(const key of former){const t=task(key);
  test('Reparierte Aufgabe '+t.id+': '+t.title,async ctx=>{
    assert.equal(t.mode,'functional');
    await ctx.test('vollständige Musterlösung wird ausgeführt',()=>assert.equal(A.evaluate(t,t.solution).status,'correct'));
    await ctx.test('unabhängige Alternative mit anderen Namen/Kontrollstrukturen',()=>assert.equal(A.evaluate(t,alternatives[key]).status,'correct'));
    await ctx.test('Vorlage enthält noch offene Stellen',()=>assert.equal(A.evaluate(t,t.code).status,'incomplete'));
    for(const [i,[from,to]] of mutations[key].entries())await ctx.test('Verhaltensfehler '+(i+1)+' wird entdeckt',()=>{assert.ok(t.solution.includes(from),'Mutation greift nicht');const code=t.solution.replace(from,to),r=A.evaluate(t,code);assert.equal(r.status,'incorrect',JSON.stringify(r));assert.ok(r.tests.some(x=>!x.ok));});
    if(!t.spec.className)await ctx.test('Methodenrumpf und vollständige Methode gleichwertig',()=>assert.equal(A.evaluate(t,t.solution.slice(t.solution.indexOf('{')+1,t.solution.lastIndexOf('}'))).status,'correct'));
  });
}
test('Keine der ehemals ausgeschlossenen Aufgaben besitzt noch einen manuellen Bewertungszweig',()=>{
  assert.deepEqual(former.map(k=>task(k).id),['task-01','task-15','task-21','task-27','task-52','task-53','task-54']);
  assert.equal(tasks.filter(t=>t.mode==='manual').length,0);
});
test('Klassenname, öffentliche Schnittstelle und Konstruktor werden geprüft',()=>{
  assert.equal(A.evaluate(task('nodeclass'),task('nodeclass').solution.replace('class Knoten','class Falsch')).status,'format');
  assert.equal(A.evaluate(task('nodeclass'),task('nodeclass').solution.replace('public Paket getPaket','private Paket getPaket')).status,'format');
  assert.equal(A.evaluate(task('nodeclass'),'public class Knoten {}').status,'incomplete');
  assert.equal(A.evaluate(task('nodeclass'),task('nodeclass').solution.replace('public Knoten(Paket paket)','public Knoten()')).status,'format');
  assert.equal(A.evaluate(task('nodeclass'),task('nodeclass').solution.replace('public class','private class')).status,'format');
});
test('Implizite Nullinitialisierung und Standardkonstruktor sind gültige Java-Alternativen',()=>{
  for(const key of ['nodeclass','stackclass','queueclass','treenode'])assert.equal(A.evaluate(task(key),alternatives[key]).status,'correct');
});
test('Zeichenarithmetik, numerische Casts und UTF-16-Grenzen',()=>{
  const t=task('triesearch'),source=t.solution.replace("paketnummer.charAt(i) - '0'","((int)paketnummer.charAt(i)) - 48");assert.equal(A.evaluate(t,source).status,'correct');
  assert.equal(J.tokenize("'0'")[0].value,48);assert.equal(J.tokenize("'\\n'")[0].value,10);
  const height=task('height');assert.equal(A.evaluate(height,'if(k==null)return 0; return ((int)(char)1) + Math.max(hoehe(k.getLinks()),hoehe(k.getRechts()));').status,'correct');
});
test('instanceof null ist false; ein Downcast von null bleibt null',()=>{
  assert.equal(A.evaluate(task('triesearch'),'return ((Blatt)null) instanceof Blatt;').status,'incorrect');
  assert.equal(A.evaluate(task('prefix'),'return (Knoten)null;').status,'incorrect');
});
test('Ungültiger Laufzeitcast und Index werden als fehlgeschlagene Testfälle sichtbar',()=>{
  assert.equal(A.evaluate(task('triesearch'),'Blatt b=(Blatt)((Knoten)wurzel); return true;').status,'incorrect');
  assert.equal(A.evaluate(task('prefix'),'return wurzel.getKind(10);').status,'incorrect');
});
test('Eigene Hilfsmethoden und this-Aufrufe in Klassen',()=>{
  const t=task('stackclass'),code=alternatives.stackclass.replace('if(alt==null)return null;','if(this.leer())return null;').replace('return !(spitze!=null);','return this.leer();').replace(/\}\s*$/, 'private boolean leer() { return spitze==null; } }');assert.equal(A.evaluate(t,code).status,'correct');
});
test('Unbekannte Java-Erweiterungen bleiben ausdrücklich unbewertet',()=>{
  const t=task('stackclass');for(const code of ['import java.util.*; '+t.solution,t.solution.replace('private Knoten oben;','private static Knoten oben;'),t.solution.replace('private Knoten oben;','private java.util.ArrayList<Paket> oben;')])assert.equal(A.evaluate(t,code).status,'unverifiable');
});
test('Klassenkonstruktoren, Methoden und Trie-Rekursion teilen eine Schrittgrenze',()=>{
  const t=task('nodeclass'),recursive=t.solution.replace('this.naechster = null;','this.naechster = new Knoten(paket);');assert.equal(A.evaluate(t,recursive).status,'unverifiable');
  assert.equal(A.evaluate(task('trieinsert'),task('trieinsert').solution.replace('position + 1','position')).status,'unverifiable');
});
test('In einem Kommentar versteckte Referenz ist keine funktionale Lösung',()=>{
  for(const key of former){const t=task(key),[from,to]=mutations[key][0];assert.equal(A.evaluate(t,'/* '+t.solution+' */\n'+t.solution.replace(from,to)).status,'incorrect');}
});
test('Ternäre Knotenerzeugung berücksichtigt die gemeinsame Trie-Basisklasse',()=>{
  const t=task('trieinsert'),code=t.solution.replace('new Blatt(paketnummer)','neu(true,paketnummer)').replace('new InnererKnoten()','neu(false,paketnummer)')+'\nprivate Knoten neu(boolean ende,String nummer) { return ende ? new Blatt(nummer) : new InnererKnoten(); }';
  assert.equal(A.evaluate(t,code).status,'correct');
});
test('Java-konforme Zeichentypen im bedingten Ausdruck',()=>{
  const t=task('triesearch'),code=t.solution.replace("int ziffer = paketnummer.charAt(i) - '0';","char nullzeichen = i==0 ? '0' : 48; int ziffer = paketnummer.charAt(i) - nullzeichen;");
  assert.equal(A.evaluate(t,code).status,'correct');
});
test('Zeichenkonstanten in Zuweisungen und Rückgaben; Auswertungsreihenfolge von +=',()=>{
  const t=task('triesearch');assert.equal(A.evaluate(t,t.solution.replace("int ziffer = paketnummer.charAt(i) - '0';","char basis=48; basis+=0; int ziffer=paketnummer.charAt(i)-basis;")).status,'correct');
  assert.equal(A.evaluate(t,t.solution.replace("'0'",'basis()')+'\nprivate char basis() { return 48; }').status,'correct');
  const h=task('height');assert.equal(A.evaluate(h,'if(k==null)return 0; int n=0; n+=(n=1); return n+Math.max(hoehe(k.getLinks()),hoehe(k.getRechts()));').status,'correct');
  assert.equal(A.evaluate(t,'char basis=65536; return false;').status,'format');
});
test('Eine zusätzliche Hilfsreferenz wird nicht mit der eigentlichen Stackspitze verwechselt',()=>{
  const t=task('stackclass'),code=t.solution.replace('private Knoten oben;','private Knoten oben; private Knoten zuletzt;').replace('Paket paket = oben.getPaket();','zuletzt = oben; Paket paket = oben.getPaket();');
  assert.equal(A.evaluate(t,code).status,'correct');
});
