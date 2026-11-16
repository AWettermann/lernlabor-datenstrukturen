'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {tasks,Assessment:A,J}=require('./load');
const alternatives=require('./alternatives');
const {alternative,wrong}=require('./answer-variants');
for(const t of tasks){
  test(`${t.id}: ${t.title}`,async ctx=>{
    await ctx.test('leere Eingabe ist unvollständig',()=>assert.equal(A.evaluate(t,' \n ').status,'incomplete'));
    await ctx.test('Musterlösung besteht',()=>{const r=A.evaluate(t,t.solution);assert.equal(r.status,'correct',JSON.stringify(r));assert.ok(r.tests.length);});
    await ctx.test('fachlich korrekte Alternative besteht',()=>{const code=alternative(t);assert.ok(code,'Alternative fehlt');const r=A.evaluate(t,code);assert.equal(r.status,'correct',JSON.stringify(r));});
    await ctx.test('fachlich falsche Lösung wird abgelehnt',()=>{const r=A.evaluate(t,wrong(t));assert.equal(r.status,'incorrect',JSON.stringify(r));});
    if(t.mode==='functional'){
      await ctx.test('Kommentare und Formatierung ändern das Ergebnis nicht',()=>assert.equal(A.evaluate(t,'/* Anfang */\n'+t.solution+'\n// Ende').status,'correct'));
      await ctx.test('offene Vorlage wird als unvollständig erkannt',()=>assert.equal(A.evaluate(t,'// Ihr Code\n________').status,'incomplete'));
    }
  });
}
const byKey=key=>tasks.find(t=>t.checkKey===key);
test('Explizit geforderte Baum-Randfälle und Beispielergebnisse',()=>{
  const {tree,measure}=globalThis.FunctionalCases;
  const cases=[[null,0,0],[[50],1,1],[[50,[30]],1,2],[[50,[30,[20],[40]],[70,[60]]],3,3],[[50,[40,[30,[20]]]],1,4]];
  for(const [shape,leaves,height] of cases){const k=tree(shape);for(const [key,want] of [['leaves',leaves],['height',height]]){const t=byKey(key);const methods=J.compile(alternatives[key],t.spec);assert.equal(J.createRuntime(methods,t.spec).call(t.spec.methods[0].name,[k]),want);assert.equal(measure(k,key),want);}}
});
test('Math.max als Schlüsselwort genügt nicht',()=>assert.equal(A.evaluate(byKey('height'),'if(k==null)return 0; return Math.max(0,1);').status,'incorrect'));
test('Math.max mit falscher Höhenformel fällt durch',()=>assert.equal(A.evaluate(byKey('height'),'if(k==null)return 0; return Math.max(hoehe(k.getLinks()),hoehe(k.getRechts()));').status,'incorrect'));
test('Blattprüfung mit ODER statt UND fällt durch',()=>assert.equal(A.evaluate(byKey('leaves'),alternatives.leaves.replace('&&','||')).status,'incorrect'));
test('Auskommentierte Musterlösung bewirkt keine Annahme',()=>assert.equal(A.evaluate(byKey('height'),'/* '+alternatives.height+' */ return 0;').status,'incorrect'));
test('Falsche Traversierungsreihenfolge fällt durch',()=>assert.equal(A.evaluate(byKey('inorder'),alternatives.preorder.replaceAll('preorder','inorder')).status,'incorrect'));
test('Fehlendes Zurücksetzen von hinten fällt durch',()=>assert.equal(A.evaluate(byKey('dequeue'),alternatives.dequeue.replace('if(vorne==null)hinten=null;','')).status,'incorrect'));
test('Referenzverlust beim Einfügen fällt durch',()=>assert.equal(A.evaluate(byKey('insertBetween'),'aktuell.setNaechster(neu); neu.setNaechster(aktuell.getNaechster());').status,'incorrect'));
test('Ganzzahltyp und Rückgabetyp werden geprüft',()=>{
  const t=byKey('height');for(const code of ['int x=1.5; return x;','return true;','if(5)return 0; return 1;','return "1";','int k=0; return k;','return 1; return 2;'])assert.equal(A.evaluate(t,code).status,'format',code);
});
test('Fallunterscheidung mit Hilfsvariablen und ohne Math.max',()=>assert.equal(A.evaluate(byKey('height'),'if(k!=null) { int l=hoehe(k.getLinks()); int r=hoehe(k.getRechts()); if(l>r)return l+1; else return r+1; } else return 0;').status,'correct'));
test('Umbenannter Parameter und ternäre Rückgabe',()=>assert.equal(A.evaluate(byKey('height'),'public int hoehe(BaumKnoten wurzel) { return wurzel==null ? 0 : 1+Math.max(hoehe(wurzel.getRechts()),hoehe(wurzel.getLinks())); }').status,'correct'));
test('Unbekannte Sprachmittel werden neutral behandelt',()=>{
  const t=byKey('height');for(const code of ['java.util.ArrayDeque<BaumKnoten> q = new java.util.ArrayDeque<>(); return 0;','throw new RuntimeException();','System.exit(0);','return window.location;','int return=1; return 1;'])assert.equal(A.evaluate(t,code).status,'unverifiable',code);
});
test('Endlosschleifen und tiefe Rekursion blockieren nicht',()=>{
  for(const code of ['while(k!=null){} return 0;','return hoehe(k);'])assert.equal(A.evaluate(byKey('height'),code).status,'unverifiable');
});
test('Fehlende Rückgabe und offene Klammern',()=>{
  for(const code of ['if(k==null)return 0;','if(k==null){return 0;','return 1+'])assert.equal(A.evaluate(byKey('height'),code).status,'incomplete');
});
test('Vorher kollidierende Sequenzen werden unterschieden',()=>{
  const t=tasks.find(t=>t.title==='Trie-Suchweg');assert.equal(A.evaluate(t,'12,5,7').status,'incorrect');assert.equal(A.evaluate(t,'1257').status,'incorrect');assert.equal(A.evaluate(t,'1,2,5').status,'incomplete');assert.equal(A.evaluate(t,'1,,2,5,7').status,'format');
});
test('Mengen sind ungeordnet, aber ohne Duplikate',()=>{
  const t=tasks.find(t=>t.format==='set');assert.equal(A.evaluate(t,'1289,1234,1257').status,'correct');assert.equal(A.evaluate(t,'1234,1257,1289,1289').status,'incorrect');
});
test('Unbekannte Freitexte werden nicht fälschlich abgelehnt',()=>assert.equal(A.evaluate(tasks.find(t=>t.answer==='Queue'),'Ich würde eine Warteschlange verwenden.').status,'unverifiable'));
test('Alle 64 Stationen haben explizite Bewertung und Eingabeformat',()=>{
  assert.equal(tasks.length,64);assert.equal(new Set(tasks.map(t=>t.id)).size,64);assert.equal(tasks.filter(t=>t.mode==='manual').length,0);for(const t of tasks){assert.ok(t.inputLabel);assert.equal(t.hints.length,4);assert.ok(t.solution);}
});
test('Platzhaltertexte in Kommentaren oder Zeichenketten sind keine offenen Aufgabenstellen',()=>{
  assert.equal(A.evaluate(byKey('height'),'// Ihr Code\n'+alternatives.height).status,'correct');
  assert.equal(A.evaluate(byKey('height'),'String hinweis="________";\n'+alternatives.height).status,'correct');
});
test('Java-Referenzvergleich von Strings erhält kein falsches Erfolgsergebnis',()=>assert.equal(A.evaluate(byKey('choose'),alternatives.choose.replaceAll('.equals("INDEXZUGRIFF")',' == "INDEXZUGRIFF"')).status,'unverifiable'));
test('In Java unzulässige Deklarationen und unerreichbare Schleifen werden erkannt',()=>{
  for(const code of ['if(k==null) int x=1; return 0;','while(1>2){} return 0;','while(true){} return 0;'])assert.equal(A.evaluate(byKey('height'),code).status,'format');
});
test('Groß-/Kleinschreibung innerhalb von Java-Zeichenketten bleibt erhalten',()=>assert.equal(A.evaluate(byKey('choose'),alternatives.choose.replace('"Stack"','"stack"')).status,'incorrect'));
test('Unicode-Escapes und abweichende Java-Zahlenliteral-Semantik werden neutral behandelt',()=>{
  for(const code of ['return 010;','return 2147483648;','// \\u000a System.exit(0);\n'+alternatives.height])assert.equal(A.evaluate(byKey('height'),code).status,'unverifiable');
});
test('Native API erlaubt keinen Zugriff auf geerbte JavaScript-Eigenschaften',()=>{
  for(const code of ['Math.constructor();\n'+alternatives.height,'constructor();\n'+alternatives.height,'verarbeiten(k);\n'+alternatives.height,'minimum(k);\n'+alternatives.height])assert.equal(A.evaluate(byKey('height'),code).status,'unverifiable');
});
test('Java-Kommentarenden, Schlüsselwörter und Leerzeichen werden konservativ behandelt',()=>{
  assert.equal(A.evaluate(byKey('height'),'// Kommentar\r'+alternatives.height).status,'correct');
  assert.equal(A.evaluate(byKey('height'),'int assert=0;\n'+alternatives.height).status,'unverifiable');
  assert.equal(A.evaluate(byKey('height'),alternatives.height.replace('if (','if\u00a0(')).status,'unverifiable');
});
module.exports={alternative,wrong};
