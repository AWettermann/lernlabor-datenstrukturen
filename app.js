let index=0,hint=0,step=0,filter='all';
const $=id=>document.getElementById(id);
const saved=LabStorage.json('q14_lab_v2',{});
const drafts=saved.drafts&&typeof saved.drafts==='object'&&!Array.isArray(saved.drafts)?saved.drafts:{};
const completed=new Set(Array.isArray(saved.completed)?saved.completed.filter(id=>tasks.some(t=>t.id===id)):[]);
function persist(){LabStorage.set('q14_lab_v2',JSON.stringify({drafts,completed:[...completed]}));$('storageNotice').textContent=LabStorage.temporary?'Speicherung ist im Browser gesperrt; Fortschritt bleibt nur für diese Sitzung erhalten.':'';}
function current(){return tasks[index]}
function visible(){return filter==='all'?tasks:tasks.filter(t=>filter==='stackqueue'?['stack','queue'].includes(t.kind):t.kind===filter)}
function safe(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
const methodDirectory={
list:[['Knoten','Knoten(Paket paket)','Paket getPaket()','Knoten getNaechster()','void setNaechster(Knoten nachfolger)'],['LineareListe','Knoten erster','int anzahlPakete()','double gesamtGewicht()','int zaehlePaketeNach(String zielort)','Paket suchePaket(String paketnummer)','void einfuegenNach(Knoten aktuell, Paket paket)','void vorneEinfuegen(Paket paket)','boolean erstesLoeschen()','boolean loeschePaket(String paketnummer)','boolean aktualisiereStatus(String paketnummer, String neuerStatus)','void sortiertEinfuegen(Paket paket)']],
stack:[['Knoten','Knoten(Paket paket)','Paket getPaket()','Knoten getNaechster()','void setNaechster(Knoten k)'],['PaketStapel','Knoten oben','void push(Paket paket)','Paket pop()','Paket peek()','boolean isEmpty()']],
queue:[['Knoten','Knoten(Paket paket)','Paket getPaket()','Knoten getNaechster()','void setNaechster(Knoten k)'],['PaketWarteschlange','Knoten vorne','Knoten hinten','void enqueue(Paket paket)','Paket dequeue()','Paket front()','boolean isEmpty()']],
tree:[['BaumKnoten','BaumKnoten(Paket paket)','Paket getPaket()','BaumKnoten getLinks()','BaumKnoten getRechts()','void setLinks(BaumKnoten k)','void setRechts(BaumKnoten k)'],['Baumalgorithmen','int anzahlKnoten(BaumKnoten k)','int anzahlBlaetter(BaumKnoten k)','int hoehe(BaumKnoten k)','double gesamtgewicht(BaumKnoten k)']],
traversal:[['BaumKnoten','BaumKnoten getLinks()','BaumKnoten getRechts()'],['Traversierung','void preorder(BaumKnoten k)','void inorder(BaumKnoten k)','void postorder(BaumKnoten k)','void verarbeiten(BaumKnoten k)']],
bst:[['BaumKnoten','BaumKnoten(Paket paket)','int getNummer()','Paket getPaket()','BaumKnoten getLinks()','BaumKnoten getRechts()','void setLinks(BaumKnoten k)','void setRechts(BaumKnoten k)'],['Suchbaum','Paket suchen(BaumKnoten k, int nummer)','BaumKnoten einfuegen(BaumKnoten k, Paket paket)']],
bst2:[['BaumKnoten','int getNummer()','Paket getPaket()','void setPaket(Paket paket)','BaumKnoten getLinks()','BaumKnoten getRechts()','void setLinks(BaumKnoten k)','void setRechts(BaumKnoten k)'],['Suchbaum','BaumKnoten minimum(BaumKnoten k)','BaumKnoten loeschen(BaumKnoten k, int nummer)']],
trie:[['Knoten','Abstrakte Basisklasse (Trie; anderes Modell als Listenknoten)'],['InnererKnoten','InnererKnoten()','Knoten[] kinder','Knoten getKind(int ziffer)','void setKind(int ziffer, Knoten k)'],['Blatt','Blatt(String paketnummer)','String getPaketnummer()'],['PaketTrie','InnererKnoten wurzel','boolean suchen(String paketnummer)','Knoten einfuegen(Knoten k, String paketnummer, int position)','Knoten findePraefix(String praefix)']],
review:[['Überblick','Array: direkter Indexzugriff','Stack: push(), pop(), top()','Queue: enqueue(), dequeue(), front()','Liste: Referenzen durchlaufen und verändern','Suchbaum: suchen(), einfuegen(), loeschen()','Trie: getKind(int), Präfixpfade']]
};
const packetMethods=['Paket (in den Aufgaben vorausgesetzt)','int getNummer() — numerischer Baumschlüssel','String getPaketnummer() — Listenkennung, z. B. P100','double getGewicht()','String getZielort()','void setStatus(String status)'];
for(const kind of ['list','stack','queue','tree','bst','bst2'])methodDirectory[kind].push(packetMethods);
const chapterButtons=[...document.querySelectorAll('.tab[data-filter]')];
const chapterNames=new Map(chapterButtons.map(b=>[b.dataset.filter,b.textContent.trim()]));
const chapterOrder=['list','stackqueue','tree','traversal','bst','bst2','trie','review'];
const methodState=new Map();
const compactMethods=matchMedia('(max-width:1023px)');
const statusLabels={correct:'Korrekt',incorrect:'Fachlich falsch',incomplete:'Unvollständig',format:'Eingabeformat fehlerhaft',unverifiable:'Nicht automatisch bewertbar'};
const feedbackTitles={correct:'Gut gelöst.',incorrect:'Probier es weiter.',incomplete:'Hier fehlt noch etwas.',format:'Prüfe das Eingabeformat.',unverifiable:'Hier braucht es einen zweiten Blick.'};
function chapterFor(t){return ['stack','queue'].includes(t.kind)?'stackqueue':t.kind;}
function tasksIn(chapter){return chapter==='all'?tasks:tasks.filter(t=>chapterFor(t)===chapter);}
function taskState(t){return completed.has(t.id)?'complete':typeof drafts[t.id]==='string'&&drafts[t.id].trim()?'draft':'open';}
function taskStateLabel(t){return completed.has(t.id)?'✓ Bestätigt':taskState(t)==='draft'?'Entwurf':'Noch offen';}
function renderMethods(){
  const t=current(),groups=methodDirectory[t.kind]||[];
  $('methodsTopic').textContent=chapterNames.get(chapterFor(t)).split(' ')[0];
  $('methodsContent').innerHTML=groups.map(([heading,...methods],i)=>{
    const key=t.kind+':'+heading,open=methodState.has(key)?methodState.get(key):i<2;
    return `<details class="method-group" data-group="${safe(key)}" ${open?'open':''}><summary>${safe(heading)}</summary><div class="method-list">${methods.map(m=>`<code>${safe(m)}</code>`).join('')}</div></details>`;
  }).join('')+'<p class="methods-note">Nur zum Nachschlagen, ohne fertige Lösungen. Es gelten die Klassen und Bezeichner deiner Aufgabe.</p>';
  $('methodsContent').querySelectorAll('.method-group').forEach(group=>group.addEventListener('toggle',()=>methodState.set(group.dataset.group,group.open)));
}
function progress(){
  const t=current(),v=visible();
  $('progressText').textContent=`${completed.size} von ${tasks.length} bestätigt`;
  $('progressBar').style.width=(completed.size/tasks.length*100)+'%';
  $('progressTrack').setAttribute('aria-valuenow',completed.size);
  $('chapterLabel').textContent=chapterNames.get(filter);
  chapterButtons.forEach(b=>{
    const scope=tasksIn(b.dataset.filter),done=scope.filter(t=>completed.has(t.id)).length;
    b.innerHTML=`<span>${safe(chapterNames.get(b.dataset.filter))}</span><span class="chapter-count">${done} / ${scope.length}</span>`;
    if(b.dataset.filter===filter)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
  const selected=$('taskSelect');
  selected.innerHTML=v.map((task,i)=>`<option value="${task.id}" ${task===t?'selected':''}>${i+1} / ${v.length} · ${safe(task.title)} · ${taskStateLabel(task)}</option>`).join('');
  $('taskStatus').textContent=taskStateLabel(t);$('taskStatus').dataset.state=taskState(t);
  $('prev').disabled=v.indexOf(t)===0;
  $('next').innerHTML=v.indexOf(t)<v.length-1?'Weiter <span aria-hidden="true">→</span>':filter!=='all'&&chapterOrder.indexOf(filter)<chapterOrder.length-1?'Nächstes Kapitel <span aria-hidden="true">→</span>':'Zum Kompetenzcheck <span aria-hidden="true">→</span>';
}
function showFeedback(status,title,text){
  $('message').className='message';$('message').dataset.status=status;
  $('message').innerHTML=`<div>${title?`<strong>${safe(title)}</strong>`:''}<p>${safe(text)}</p></div>`;
}
function updateEditorLines(){
  $('lineNumbers').textContent=Array.from({length:$('code').value.split('\n').length},(_,i)=>i+1).join('\n');
  $('lineNumbers').scrollTop=$('code').scrollTop;
}
function render(){
  const t=current();renderMethods();
  $('topic').textContent=chapterNames.get(chapterFor(t))+' · '+t.wiki;
  $('topic').title=t.topic;
  $('title').textContent=t.title;$('description').innerHTML='<p>'+t.desc+'</p>';
  $('competencyText').textContent=t.topic.split('·').slice(1).map(x=>x.trim()).filter(x=>x!=='VERTIEFUNG').join(' · ')||t.topic;
  $('code').value=typeof drafts[t.id]==='string'?drafts[t.id]:t.code;
  document.querySelector('.editor').classList.toggle('is-answer',t.mode==='answer');
  document.querySelector('.editor .cardhead h2').textContent=t.format==='java'?'Deine Java-Lösung':t.mode==='operations'?'Deine Operationsfolge':'Deine Antwort';
  $('editorLanguage').textContent=t.format==='java'||t.mode==='operations'?'Java':'Kurzantwort';
  $('sourceLabel').textContent=t.code.trim()?'Vorlage ergänzen · hier kannst du schreiben':'Deine Eingabe';
  $('assessmentMode').textContent=t.mode==='functional'?'Funktionstests mit Beispieleingaben':'Automatische Antwortprüfung';
  $('inputFormat').textContent=t.inputLabel;
  $('code').placeholder=t.format==='java'?'Entwickle hier deine Lösung …':'Deine Antwort …';
  $('code').setAttribute('wrap',t.mode==='answer'?'soft':'off');
  const context=t.spec?.methods.length===1&&!t.fragment&&!t.code.trim();
  $('codeSignature').textContent=context?`public ${t.spec.methods[0].result} ${t.spec.methods[0].name}(${t.spec.methods[0].params.map(p=>p.type+' '+p.name).join(', ')}) {`:'';
  for(const id of ['codeSignature','signaturePanel','closingBrace'])$(id).classList.toggle('hidden',!context);
  $('assessmentNotice').textContent=t.mode==='functional'?'Der Browser unterstützt einen begrenzten Java-Sprachumfang einschließlich der Klassen- und Trie-Aufgaben. Unterstützte Lösungen werden an konkreten Eingaben ausgeführt. Nicht unterstützte gültige Java-Varianten erhalten keine Falschbewertung.':'';
  $('assessmentNotice').classList.toggle('hidden',!$('assessmentNotice').textContent);
  $('assessmentInfo').open=false;
  hint=0;step=0;$('hintLevel').textContent='0 / 4';
  $('helpText').innerHTML='<p>Nutze die Hilfen, wenn du einen Denkanstoß brauchst.</p>';
  $('tests').innerHTML='<p>Noch keine Prüfung für diese Eingabe ausgeführt.</p>';
  $('testDetails').open=false;
  $('score').textContent=completed.has(t.id)?'bereits bestätigt':'noch nicht geprüft';
  showFeedback('idle','',completed.has(t.id)?'Diese Aufgabe hast du bereits erfolgreich geprüft. Du kannst deinen Ansatz weiter erkunden.':'Entwickle deine Lösung und probiere sie mit „Lösung prüfen“ aus.');
  $('step').disabled=!['java','operations'].includes(t.format);progress();visual('Beispielmodell');updateEditorLines();
  $('storageNotice').textContent=LabStorage.temporary?'Speicherung ist im Browser gesperrt; Fortschritt bleibt nur für diese Sitzung erhalten.':'';
}
const specificTrees={
  'Blätter zählen':[50,[30,[20],[40]],[70,[60]]],
  'Preorder bestimmen':[50,[30,[20],[40]],[70]],
  'Inorder bestimmen':[50,[30,[20],[40]],[70]],
  'Postorder bestimmen':[50,[30,[20],[40]],[70]],
  'Suchweg 65':[50,[30],[70,[60,null,[65]],[80]]],
  'Suchbaum prüfen':[50,[30,null,[60]],[70]],
  'Einfügeposition finden':[50,[30,[20],[40]],[70]],
  'Entarteter Suchbaum':[10,null,[20,null,[30,null,[40,null,[50]]]]],
  'Blatt löschen':[50,[30,[20],[40]],[70]],
  'Knoten mit einem Kind löschen':[50,null,[70,[60]]],
  'Inorder-Nachfolger bestimmen':[50,null,[80,[60,null,[70]]]]
};
function treeHTML(n){
  if(!n)return '<div class="tree-empty">null</div>';
  return `<div class="tree-branch"><span class="tn">${n[0]}</span>${n[1]||n[2]?`<div class="tree-children"><div><small>links ↙</small>${treeHTML(n[1])}</div><div><small>rechts ↘</small>${treeHTML(n[2])}</div></div>`:''}</div>`;
}
function visual(label){
  const t=current();$('stepLabel').textContent=label;let html='';
  if(['tree','bst','bst2','traversal'].includes(t.visual))html='<div class="treeviz">'+treeHTML(specificTrees[t.title]||[50,[30,[20],[40]],[70,[60],[80]]])+'</div>';
  else if(t.visual==='trie')html='<div class="decision">Beispielschlüssel: 1234, 1257, 1289, 4312, 4355<br>Präfix 12 → 1234, 1257, 1289<br>Jede Ziffer steht für eine Kante; nach allen vier Ziffern folgt das Blatt.</div>';
  else if(t.visual==='review')html='<div class="decision">Anforderung → Struktur<br>Undo → ?<br>FIFO → ?<br>Präfix → ?<br>Indexzugriff → ?<br>Schlüsselsuche → ?</div>';
  else {const arr=t.start||[];html=(t.kind==='stack'?'<div class="refs">oben ↓</div>':t.kind==='list'?'<div class="refs">erster ↓</div>':'<div class="refs">vorne ↓ · hinten = letzter Knoten (bei leerer Queue null)</div>')+`<div class="chain">${arr.map(x=>`<span class="node">${safe(x)}</span>`).join('<span class="arrow">→</span>')}<span class="arrow">→ null</span></div>`;}
  $('visualization').innerHTML=html;
  const modelHints=['Das Modell illustriert die Aufgabe. Es ist keine Ausführung deines Codes.','Prüfe den Basisfall: Was geschieht bei einer leeren Struktur?','Verfolge die Reihenfolge der Zugriffe und erhalte benötigte Referenzen.','Vergleiche die Randfälle und die tatsächlichen Funktionstestergebnisse.'];
  $('explain').textContent=modelHints[step];
}
function evaluate(){
  const t=current(),r=Assessment.evaluate(t,$('code').value),ok=r.status==='correct';
  const rows=[...r.tests].sort((a,b)=>Number(a.ok)-Number(b.ok));
  $('tests').innerHTML=rows.length?rows.map(x=>`<div class="testrow"><span class="${x.ok?'pass':'fail'}">${x.ok?'✓':'↻'}</span><span>${safe(x.label)}</span></div>`).join(''):`<p>${safe(r.message)}</p>`;
  $('score').textContent=r.tests.length?`${r.tests.filter(x=>x.ok).length} / ${r.tests.length} · ${statusLabels[r.status]}`:statusLabels[r.status];
  showFeedback(r.status,feedbackTitles[r.status],r.message);
  $('testDetails').open=r.status==='incorrect'&&r.tests.length>0;
  if(ok)completed.add(t.id);else completed.delete(t.id);
  drafts[t.id]=$('code').value;persist();progress();
}
$('code').addEventListener('input',()=>{
  const t=current();drafts[t.id]=$('code').value;completed.delete(t.id);persist();progress();updateEditorLines();
  $('score').textContent='Eingabe geändert';$('tests').innerHTML='<p>Prüfe deine geänderte Lösung noch einmal.</p>';
  showFeedback('edited','','Deine Änderung ist gespeichert. Du kannst sie jetzt ausprobieren.');
});
$('code').addEventListener('scroll',()=>{$('lineNumbers').scrollTop=$('code').scrollTop;});
$('code').addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)){e.preventDefault();evaluate();}});
function openHelp(){if(!$('helpDialog').open)$('helpDialog').showModal();}
function showHint(){
  const t=current();if(hint<4)hint++;
  $('hintLevel').textContent=`HINWEIS ${hint} VON 4`;$('helpTitle').textContent='Ein Denkanstoß';
  $('helpText').innerHTML=`<pre>${safe(t.hints[hint-1])}</pre>`;
  $('nextHint').classList.remove('hidden');$('nextHint').textContent=hint<4?'Nächster Hinweis →':'Musterlösung öffnen';openHelp();
}
function showSolution(){
  const t=current();$('hintLevel').textContent='ZUM VERGLEICHEN';$('helpTitle').textContent='Musterlösung';
  $('helpText').innerHTML=`<p>Vergleiche die Lösung mit deinem Ansatz. Welche Strukturidee steckt dahinter?</p><pre>${safe(t.solution)}</pre>`;
  $('nextHint').classList.add('hidden');openHelp();$('closeHelp').focus({preventScroll:true});
}
$('hint').onclick=showHint;$('solution').onclick=showSolution;
$('nextHint').onclick=()=>hint<4?showHint():showSolution();
for(const id of ['closeHelp','closeHelpBottom'])$(id).onclick=()=>$('helpDialog').close();
$('helpDialog').addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const controls=[...$('helpDialog').querySelectorAll('button:not([disabled]),a[href],input,textarea,select,[tabindex="0"]')].filter(el=>el.getClientRects().length);
  if(!controls.length)return;
  e.preventDefault();
  const active=controls.indexOf(document.activeElement),target=active<0?(e.shiftKey?controls.length-1:0):(active+(e.shiftKey?-1:1)+controls.length)%controls.length;
  controls[target].focus();
});
$('run').onclick=evaluate;
$('reset').onclick=()=>{delete drafts[current().id];completed.delete(current().id);persist();render();$('code').focus();};
$('step').onclick=()=>{step=(step+1)%4;visual(['Beispielmodell','Strukturhinweis 1','Strukturhinweis 2','Strukturhinweis 3'][step]);};
function focusTask(){ $('title').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'}); }
function move(dir){
  const v=visible(),target=v.indexOf(current())+dir;
  if(target<0||target>=v.length)return;
  index=tasks.indexOf(v[target]);render();focusTask();
}
$('prev').onclick=()=>move(-1);
$('next').onclick=()=>{
  if(visible().indexOf(current())<visible().length-1){move(1);return;}
  const next=filter==='all'?null:chapterOrder[chapterOrder.indexOf(filter)+1];
  if(next)document.querySelector(`.tab[data-filter="${next}"]`).click();
  else document.querySelector('.diag-tab[data-diagnostic="end"]').click();
};
$('taskSelect').onchange=e=>{const selected=visible().find(t=>t.id===e.target.value);if(selected){index=tasks.indexOf(selected);render();}};
chapterButtons.forEach(b=>b.onclick=()=>{
  $('diagnostic').classList.add('hidden');$('labMain').classList.remove('hidden');
  document.querySelectorAll('.tab').forEach(x=>{x.classList.remove('active');x.removeAttribute('aria-current');});
  b.classList.add('active');filter=b.dataset.filter;
  const v=visible();if(v.length)index=tasks.indexOf(v[0]);
  $('chapterMenu').open=false;render();focusTask();
});
function placeChapterMenu(){
  const menu=$('chapterMenu').querySelector('.chapter-options');
  if(matchMedia('(max-width:699px)').matches){const top=$('chapterMenu').getBoundingClientRect().bottom+8;menu.style.top=top+'px';menu.style.maxHeight=Math.max(150,innerHeight-top-16)+'px';}
  else {menu.style.top='';menu.style.maxHeight='';}
}
$('chapterMenu').addEventListener('toggle',placeChapterMenu);
document.addEventListener('pointerdown',e=>{if(!$('chapterMenu').contains(e.target))$('chapterMenu').open=false;});
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape'||$('helpDialog').open)return;
  if($('chapterMenu').open){$('chapterMenu').open=false;$('chapterMenu').querySelector('summary').focus();}
  else if(compactMethods.matches&&$('methodsDetails').open){$('methodsDetails').open=false;$('methodsDetails').querySelector('summary').focus();}
});
function fitMethods(){ $('methodsDetails').open=!compactMethods.matches; }
compactMethods.addEventListener('change',fitMethods);window.addEventListener('resize',placeChapterMenu);fitMethods();render();
