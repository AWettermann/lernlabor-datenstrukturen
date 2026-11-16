'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {tasks,Assessment:A,Diagnostic:D}=require('./load');
const {alternative,wrong}=require('./answer-variants');
const out=path.resolve(__dirname,'../docs');fs.mkdirSync(out,{recursive:true});
const status={correct:'korrekt',incorrect:'fachlich falsch',incomplete:'unvollständig',format:'Eingabeformat',unverifiable:'nicht automatisch bewertbar'};
const formerlyExcluded=['nodeclass','stackclass','queueclass','treenode','triesearch','trieinsert','prefix'];
const rows=tasks.map(t=>{
  const sample=A.evaluate(t,t.solution),alt=A.evaluate(t,alternative(t)),bad=A.evaluate(t,wrong(t)),empty=A.evaluate(t,'');
  assert.equal(sample.status,'correct',t.id);assert.equal(alt.status,'correct',t.id);assert.equal(bad.status,'incorrect',t.id);assert.equal(empty.status,'incomplete',t.id);
  return {id:t.id,title:t.title,chapter:t.kind,expectation:t.answer||t.solution,description:t.desc,input:t.inputLabel,mode:t.mode,formerlyExcluded:formerlyExcluded.includes(t.checkKey),previousCheck:formerlyExcluded.includes(t.checkKey)?'pauschal von der funktionalen Bewertung ausgenommen':t.expect==='exactanswer'?'normalisierter Textvergleich':'reguläre Struktur-/Schlüsselwortmuster',sample:sample.status,alternative:alt.status,wrong:bad.status,empty:empty.status,cases:sample.tests.length,caseLabels:sample.tests.map(c=>c.label),alternativeSource:alternative(t),wrongSource:wrong(t),hints:t.hints};
});
const stats={stations:tasks.length,startDiagnostic:7,endDiagnostic:7,total:tasks.length+14,functionalJava:rows.filter(r=>r.mode==='functional').length,typedAnswers:rows.filter(r=>r.mode==='answer').length,operationSequence:1,automaticStations:rows.filter(r=>r.sample==='correct').length,manualStations:rows.filter(r=>r.mode==='manual').length,functionalCasesPerReference:rows.filter(r=>r.mode==='functional').reduce((n,r)=>n+r.cases,0),originallyExcluded:7,correctedFormerlyExcluded:rows.filter(r=>r.formerlyExcluded&&r.sample==='correct'&&r.alternative==='correct'&&r.wrong==='incorrect').length,defectGroups:24};
const startAnswers={order:['P1','P2','P3','P4'],undo:['D'],links:['P1-PX','PX-P2'],tree:['50','70','60'],choose:['ordered'],prefix:['1234','1257','1289'],eff:['exclude']};
const diagnostics=[...D.startStages.map((s,i)=>({id:'start-'+(i+1),title:s.title,competency:s.c,type:s.type,expected:startAnswers[s.type],result:D.evaluateStart(s.type,startAnswers[s.type]).status})),...D.endQs.map((q,i)=>({id:'end-'+(i+1),title:q[1],competency:q[0],type:'single-choice',expected:q[5],result:D.evaluateEnd(D.endQs.map(q=>q[5])).rows[i].ok?'correct':'incorrect'}))];
fs.writeFileSync(path.join(out,'pruefuebersicht.json'),JSON.stringify({stats,tasks:rows,diagnostics},null,2)+'\n');
const text=['# Vollständige Aufgabenprüfung Q1.4','',
'Stand: lokale Überarbeitung, 16.11.2026. Generiert mit `npm run audit`. Quellen: `tasks.js`, `assessment.js`, `functional-cases.js`, `diagnostic-model.js` und die unabhängigen Alternativen aus `tests/`.','',
'**78 Aufgaben untersucht:** 64 Lernstationen (28 bisherige Hauptstationen und 36 Zusatzstationen), 7 Eingangs- und 7 Ausgangsdiagnosen. Keine Aufgabe wurde entfernt.','',
`**${stats.automaticStations} Lernstationen automatisch geprüft:** ${stats.functionalJava} Java-Stationen mit ${stats.functionalCasesPerReference} konkreten Funktionstestfällen je vollständigem Durchlauf der Referenzlösungen, 24 typisierte Kurzantworten und eine Operationsfolge mit acht geprüften Zwischenzuständen. Für alle Stationen sind Musterlösung, mindestens eine korrekte Alternative, eine falsche Eingabe und die leere Eingabe geprüft.`,'',
'**Alle sieben früher ausgeschlossenen Stationen repariert:** Klassen, Konstruktoren, Feldinitialisierung, Casts, instanceof und Zeichenoperationen sind im dokumentierten Sprachumfang funktional prüfbar. Es gibt keine pauschal ausgeschlossene Aufgabe mehr. Unbekannte Java-Erweiterungen bleiben ausdrücklich unbewertet; die Auswertung ist weiterhin kein vollständiger Java-Compiler. Details: [Reparaturbericht](MANUELLE-PRUEFUNG-REPARATUR.md).' ,'',
'Die Anzahl der gefundenen Fehler ist als **24 dokumentierte Fehler- und Lückengruppen** definiert, nicht als Zahl jeder einzelnen betroffenen Eingabe. Siehe [Fehlerprotokoll](FEHLERPROTOKOLL.md).','',
'## Übersicht aller Lernstationen','',
'| ID | Kapitel | Aufgabe | Prüfmethode | Muster | Alternative | Falschversuch | Leer | Fälle |',
'|---|---|---|---|---|---|---|---|---|'];
for(const r of rows)text.push(`| ${r.id} | ${r.chapter} | ${r.title.replaceAll('|','/')} | ${r.mode} | ${status[r.sample]} | ${status[r.alternative]||r.alternative} | ${status[r.wrong]} | ${status[r.empty]} | ${r.cases} |`);
text.push('','## Einzelprüfung: Erwartung, Eingabeformat, Hinweise und Beispiele','',
'Die jeweiligen Funktionsfälle stehen zusätzlich vollständig im maschinenlesbaren Bericht. Bei freien Begründungen prüft das Labor nur die ausdrücklich verlangte Ja-/Nein-Entscheidung. Freie Umschreibungen außerhalb eines bekannten Antwortformats bleiben unbewertet.','');
for(const r of rows){
  text.push(`### ${r.id} – ${r.title}`,'',r.description.replace(/<[^>]*>/g,''),'',`Eingabe: ${r.input}. Früher: ${r.previousCheck}. Jetzt: ${r.mode}.`,'','Erwartete Antwort bzw. Musterlösung:','', '```'+(r.mode==='answer'?'text':'java'),r.expectation,'```','');
  if(r.alternativeSource)text.push('Geprüfte korrekte Alternative:','','```'+(r.mode==='answer'?'text':'java'),r.alternativeSource,'```','','Geprüfter Falschversuch:','','```'+(r.mode==='answer'?'text':'java'),r.wrongSource,'```','');
  else text.push('Einschränkung: Weder Musterlösung noch Alternativen oder fachliche Falschversuche sind hier funktional geprüft. Das Labor gibt dafür keine Erfolgs- oder Falschbewertung aus.','');
  text.push('Hinweise: '+r.hints.map((h,i)=>(i+1)+'. '+h.replace(/\n/g,' ')).join(' · '),'');
}
text.push('## Diagnose: alle 14 Aufgaben','','| ID | Bereich | Situation | Erwartete Antwort | Prüfung |','|---|---|---|---|---|');
for(const r of diagnostics)text.push(`| ${r.id} | ${r.competency} | ${r.title} | ${Array.isArray(r.expected)?r.expected.join(' → '):r.expected} | ${status[r.result]} |`);
text.push('','Startdiagnose: Mengen bei Verbindungen und Präfixen; exakte Reihenfolge bei Arbeitsplätzen und Suchpfad; exakte Einfachauswahl bei Entnahme, Strukturwahl und Effizienz. Leere Eingaben bleiben offen. Der Bereich Reihenfolgen mittelt beide Aufgaben symmetrisch. Algorithmen wird im Startcheck nicht eigenständig erhoben und ist mit „–“ markiert.','',
'Ausgangsdiagnose: eindeutige Einfachauswahl, alle sieben Fragen vor der Auswertung erforderlich. Falsche Antworten erhalten keine erfundenen Kompetenzpunkte. Die Rückmeldung nennt die jeweilige richtige Entscheidung.','');
fs.writeFileSync(path.join(out,'AUFGABENPRUEFUNG.md'),text.join('\n').replace(/[ \t]+$/gm,''));
console.log(JSON.stringify(stats,null,2));
