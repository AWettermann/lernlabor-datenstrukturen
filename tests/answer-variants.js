'use strict';
const alternatives=require('./alternatives');
function alternative(t){
  if(t.mode==='functional')return alternatives[t.checkKey];
  if(t.mode==='operations')return t.solution.replace(/;/g,' ; /* Aufruf */');
  if(t.format==='number')return '0'+t.answer;
  if(t.format==='complexity')return t.answer.toLowerCase().replace('(',' ( ' ).replace(')',' )');
  if(t.format==='boolean')return t.answer.toUpperCase()+'. Die Teilbaumregel ist entscheidend.';
  if(t.format==='sequence')return '['+t.answer.replace(/,/g,' ; ')+']';
  if(t.format==='set')return t.answer.split(',').reverse().join(' ');
  if(t.format==='position')return 'Links vom Knoten 40.';
  return ({Queue:'Warteschlange',Stack:'Stapel',Trie:'Präfixbaum'})[t.answer];
}
function wrong(t){
  if(t.mode==='functional'){
    if(t.spec.className){const mutations={nodeclass:['return paket;','return null;'],stackclass:['return oben == null;','return false;'],queueclass:['if (vorne == null) hinten = null;',''],treenode:['return rechts;','return links;']};const [from,to]=mutations[t.checkKey];return t.solution.replace(from,to);}
    if(t.spec.suffix)return ';';
    return t.spec.methods.map(m=>`${m.result} ${m.name}(${m.params.map(p=>p.type+' '+p.name).join(',')}) { ${m.result==='void'?'':`return ${{int:'0',double:'0',boolean:'false',String:'"falsch"'}[m.result]||'null'};`} }`).join('\n');
  }
  if(t.mode==='operations')return t.solution.replace('enqueue(P100);','dequeue();');
  if(t.format==='number')return '999';
  if(t.format==='complexity')return t.answer==='O(1)'?'O(n)':'O(1)';
  if(t.format==='boolean')return t.answer==='ja'?'nein':'ja';
  if(t.format==='sequence')return t.answer.split(',').reverse().join(',');
  if(t.format==='set')return t.answer+',4312';
  if(t.format==='position')return 'rechts von 40';
  return t.answer==='Queue'?'Stack':'Queue';
}
module.exports={alternative,wrong};
