'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const {Diagnostic:D}=require('./load');
const data={order:['P1','P2','P3','P4'],undo:['D'],links:['P1-PX','PX-P2'],tree:['50','70','60'],choose:['ordered'],prefix:['1234','1257','1289'],eff:['exclude']};
for(const stage of D.startStages)test('Startcheck: '+stage.title,()=>{
  const answer=data[stage.type];assert.equal(D.evaluateStart(stage.type,answer).status,'correct');assert.equal(D.evaluateStart(stage.type,answer).points,3);
  assert.equal(D.evaluateStart(stage.type,[]).status,'incomplete');
  const bad=stage.type==='order'?[...answer].reverse():stage.type==='undo'?['A']:stage.type==='tree'?['50','60','70']:[...answer,'falsch'];
  assert.equal(D.evaluateStart(stage.type,bad).status,'incorrect');assert.ok(D.evaluateStart(stage.type,bad).points<3);
  if(stage.type==='links'||stage.type==='prefix')assert.equal(D.evaluateStart(stage.type,[...answer].reverse()).status,'correct');
});
for(const [i,q] of D.endQs.entries())test('Kompetenzcheck: '+q[0],()=>{
  const answers=D.endQs.map(q=>q[5]);let r=D.evaluateEnd(answers);assert.equal(r.rows[i].ok,true);
  answers[i]=q.slice(2,5).find(x=>x!==q[5]);r=D.evaluateEnd(answers);assert.equal(r.rows[i].ok,false);assert.equal(r.profile[q[0]],0);
  answers[i]='';assert.equal(D.evaluateEnd(answers).status,'incomplete');
});
test('Zusätzlich falsche Listenverbindung verhindert volle Punkte',()=>assert.equal(D.evaluateStart('links',['P1-PX','PX-P2','PX-P3']).points,1));
test('Suchpfad muss tatsächlicher Klickreihenfolge entsprechen',()=>assert.equal(D.evaluateStart('tree',['60','50','70']).status,'incorrect'));
test('Einfachauswahl akzeptiert keine Mehrfachantwort',()=>assert.equal(D.evaluateStart('choose',['ordered','linear']).status,'incorrect'));
test('Reihenfolge-Kompetenz mittelt beide Aufgaben gleich',()=>{
  assert.equal(D.startProfile({0:0,1:3}).Reihenfolgen,2);assert.equal(D.startProfile({0:3,1:0}).Reihenfolgen,2);assert.equal(D.startProfile({0:3,1:3}).Reihenfolgen,3);
});
test('Nicht erhobene Kompetenz erhält keine erfundene Null',()=>assert.equal(Object.hasOwn(D.startProfile({0:3,1:3}),'Algorithmen'),false));
test('Ungültige gespeicherte Profilwerte werden entfernt',()=>assert.deepEqual(D.cleanProfile({a:4,b:-1,c:'3',d:3,e:NaN}),{d:3}));
