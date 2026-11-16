(function(root){
'use strict';
const startStages=[
 {c:'Reihenfolgen',title:'Wareneingang',text:'Die Pakete P1, P2, P3 und P4 sind in dieser Reihenfolge angekommen. Ziehe sie in die Bearbeitungsplätze – so, wie sie abgearbeitet werden sollen.',type:'order'},
 {c:'Reihenfolgen',title:'Rückgängig-Lager',text:'Die Pakete wurden nacheinander A, B, C, D abgelegt. Welches muss zuerst wieder entnommen werden? Ziehe es in „Entnehmen“.',type:'undo'},
 {c:'Referenzen',title:'Paketkette',text:'PX soll zwischen P1 und P2 eingefügt werden. Wähle die beiden Verbindungen, die danach gelten müssen.',type:'links'},
 {c:'Baumstrukturen',title:'Paketbaum',text:'Finde Paket 60. Klicke nur die Pakete an, die du bei einer gezielten Suche prüfen würdest.',type:'tree'},
 {c:'Strukturwahl',title:'Schneller suchen',text:'Sehr viele Paketnummern sollen häufig gesucht werden. Welche Organisation erscheint dir am sinnvollsten?',type:'choose'},
 {c:'Präfixstrukturen',title:'Gemeinsame Anfänge',text:'Welche Nummern gehören zur Anfrage „beginnt mit 12“? Wähle alle passenden Pakete.',type:'prefix'},
 {c:'Effizienz',title:'Suchaufwand einschätzen',text:'Welche Suche wirkt bei sehr vielen Daten günstiger?',type:'eff'}
];
const endQs=[
 ['Reihenfolgen','Pakete müssen in Eingangsreihenfolge bearbeitet werden.','Stack','Queue','Liste','Queue'],
 ['Referenzen','Welches Prinzip ist beim Einfügen in eine verkettete Liste entscheidend?','Zuerst alte Verbindung verlieren','Referenzen so umhängen, dass kein Rest der Liste verloren geht','Alle Knoten neu erzeugen','Referenzen so umhängen, dass kein Rest der Liste verloren geht'],
 ['Baumstrukturen','Warum kann ein Suchbaum Teilbäume ausschließen?','Wegen der Suchbaumeigenschaft','Weil jeder Baum sortiert ist','Wegen Rekursion allein','Wegen der Suchbaumeigenschaft'],
 ['Algorithmen','Welche Traversierung hat die Reihenfolge L–K–R?','Preorder','Inorder','Postorder','Inorder'],
 ['Effizienz','Welche Laufzeit kann die Suche in einem entarteten binären Suchbaum besitzen?','O(1)','O(log n)','O(n)','O(n)'],
 ['Strukturwahl','Für häufige Undo-Operationen eignet sich am besten …','Queue','Stack','Trie','Stack'],
 ['Präfixstrukturen','Welche Struktur ist besonders für Präfixsuchen geeignet?','Stack','binärer Suchbaum','Trie','Trie']
];

function evaluateStart(type,data){
  const exact=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  const setExact=(a,b)=>a.length===b.length&&new Set(a).size===a.length&&b.every(x=>a.includes(x));
  let ok=false,partial=false;
  if(type==='order'){
    if(!Array.isArray(data)||data.length!==4||data.some(x=>!x)||new Set(data).size!==4)return {status:'incomplete',points:0,message:'Legen Sie genau ein Paket in jeden der vier Plätze.'};
    ok=exact(data,['P1','P2','P3','P4']);partial=!ok;
  }else if(type==='undo'){
    if(!Array.isArray(data)||data.length!==1)return {status:'incomplete',points:0,message:'Wählen Sie genau ein Paket zum Entnehmen.'};ok=data[0]==='D';
  }else{
    if(!Array.isArray(data)||!data.length)return {status:'incomplete',points:0,message:'Treffen Sie zuerst eine Auswahl.'};
    if(type==='links'){ok=setExact(data,['P1-PX','PX-P2']);partial=!ok&&data.some(x=>['P1-PX','PX-P2'].includes(x));}
    if(type==='tree'){ok=exact(data,['50','70','60']);partial=!ok&&data.includes('60');}
    if(type==='choose'){ok=exact(data,['ordered']);}
    if(type==='prefix'){ok=setExact(data,['1234','1257','1289']);partial=!ok&&data.some(x=>['1234','1257','1289'].includes(x));}
    if(type==='eff'){ok=exact(data,['exclude']);}
  }
  return {status:ok?'correct':'incorrect',points:ok?3:partial?1:0,message:ok?'Die Lösung ist korrekt.':'Die Lösung ist noch nicht vollständig richtig.'};
}
function startProfile(results){
  const grouped={};startStages.forEach((s,i)=>{if(results[i]!==undefined)(grouped[s.c]??=[]).push(results[i]);});
  return Object.fromEntries(Object.entries(grouped).map(([c,a])=>[c,Math.round(a.reduce((x,y)=>x+y,0)/a.length)]));
}
function cleanProfile(profile){return Object.fromEntries(Object.entries(profile).filter(([,v])=>Number.isFinite(v)&&v>=0&&v<=3));}
function evaluateEnd(answers){
  const unanswered=endQs.map((q,i)=>i).filter(i=>!answers[i]);
  if(unanswered.length)return {status:'incomplete',unanswered,message:'Beantworten Sie vor der Auswertung alle sieben Fragen.'};
  const rows=endQs.map((q,i)=>({competency:q[0],ok:answers[i]===q[5],answer:answers[i],expected:q[5]}));
  return {status:'complete',rows,profile:Object.fromEntries(rows.map(r=>[r.competency,r.ok?3:0]))};
}
root.Diagnostic={startStages,endQs,evaluateStart,startProfile,cleanProfile,evaluateEnd};
})(globalThis);
