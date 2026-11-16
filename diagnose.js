(()=>{
'use strict';
const D=document.getElementById('diagnostic'),M=document.getElementById('labMain');
const {startStages,endQs}=Diagnostic;
const competencies=['Reihenfolgen','Referenzen','Baumstrukturen','Algorithmen','Effizienz','Strukturwahl','Präfixstrukturen'];
let stage=0,score={},stageScores={},treeClicks=[],selectedPackage=null,labFilter='all';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const getStart=()=>Diagnostic.cleanProfile(LabStorage.json('q14_start_profile',{}));
function saveStart(){LabStorage.set('q14_start_profile',JSON.stringify(score));LabStorage.set('q14_start_done','1');}
function pkg(x){return `<div class="package" role="button" tabindex="0" aria-label="Paket ${esc(x)} auswählen" draggable="true" data-p="${esc(x)}">📦 ${esc(x)}</div>`;}
function keyboardClick(node){node.addEventListener('keydown',e=>{if(e.target===node&&(e.key===' '||e.key==='Enter')){e.preventDefault();node.click();}});}
function wireDrag(){
  const packages=[...D.querySelectorAll('.package[draggable=true]')],row=D.querySelector('.package-row');
  function place(zone,p){
    const el=packages.find(x=>x.dataset.p===p);if(!el)return;
    const previous=zone.querySelector('.package');if(previous&&previous!==el)row.appendChild(previous);
    zone.appendChild(el);packages.forEach(x=>x.classList.remove('selected'));selectedPackage=null;
  }
  packages.forEach(x=>{
    x.ondragstart=e=>e.dataTransfer.setData('text/plain',x.dataset.p);
    x.onclick=e=>{e.stopPropagation();selectedPackage=selectedPackage===x.dataset.p?null:x.dataset.p;packages.forEach(p=>p.classList.toggle('selected',p.dataset.p===selectedPackage));};keyboardClick(x);
  });
  D.querySelectorAll('.dropzone').forEach(z=>{
    z.ondragover=e=>e.preventDefault();z.ondrop=e=>{e.preventDefault();place(z,e.dataTransfer.getData('text/plain'));};
    z.onclick=()=>{if(selectedPackage)place(z,selectedPackage);};keyboardClick(z);
  });
}
function choices(values){return `<div class="choice-grid">${values.map(([v,label])=>`<div class="choice-card" role="checkbox" tabindex="0" aria-checked="false" data-v="${esc(v)}">${label}</div>`).join('')}</div>`;}
function startContent(s){
  if(s.type==='order')return `<p class="muted">Ziehen oder Paket anklicken und anschließend einen Zielplatz wählen. Auf jedem Platz liegt genau ein Paket.</p><div class="package-row">${['P1','P2','P3','P4'].map(pkg).join('')}</div><div class="drop-row">${[1,2,3,4].map(i=>`<div class="dropzone" role="button" tabindex="0" aria-label="Bearbeitungsplatz ${i}" data-slot="${i}">${i}</div>`).join('')}</div>`;
  if(s.type==='undo')return `<p class="muted">Paket ziehen oder anklicken und anschließend „Entnehmen“ wählen.</p><div class="package-row">${['A','B','C','D'].map(pkg).join('')}</div><div class="dropzone" role="button" tabindex="0" aria-label="Entnehmen" id="take">Entnehmen</div>`;
  if(s.type==='links')return '<div class="link-lab">P1 → P2 → P3 · neuer Knoten: PX</div>'+choices([['P1-PX','P1 → PX'],['PX-P2','PX → P2'],['P1-P2','P1 → P2 bleibt unverändert'],['PX-P3','PX → P3']]);
  if(s.type==='tree')return `<div class="tree-click"><div><button data-n="50">50</button></div><div class="tree-line"><button data-n="30">30</button><button data-n="70">70</button></div><div class="tree-line">${['20','40','60','80'].map(n=>`<button data-n="${n}">${n}</button>`).join('')}</div></div><p id="clickPath" class="muted">Klickreihenfolge: noch leer. Erneut anklicken entfernt einen Knoten aus dem Pfad.</p>`;
  if(s.type==='choose')return choices([['linear','Alle Pakete ungeordnet hintereinander prüfen'],['ordered','Nummern nach einer Ordnungsregel strukturieren und Suchbereiche ausschließen'],['random','Pakete zufällig verteilen']]);
  if(s.type==='prefix')return choices(['1234','1257','1289','4312','4355'].map(n=>[n,'📦 '+n]));
  return choices([['all','Jedes Element nacheinander prüfen'],['exclude','Nach jedem Schritt einen großen Bereich ausschließen'],['same','Beides ist immer gleich schnell']]);
}
function renderStart(){
  const s=startStages[stage];treeClicks=[];selectedPackage=null;
  D.innerHTML=`<div class="diag-shell"><div class="diag-head"><span class="eyebrow">EINGANGSDIAGNOSE · NICHT BENOTET</span><h2>${stage+1}. ${s.title}</h2><p>Hier geht es um deine Idee – Fachbegriffe brauchst du noch nicht.</p><div class="diag-progress"><i style="width:${stage/startStages.length*100}%"></i></div></div><div class="diag-body"><p class="diag-instruction">${s.text}</p>${startContent(s)}<div id="df" class="diag-feedback" role="status">Bearbeite die Situation und klicke anschließend auf „Übernehmen“.</div><div class="diag-actions"><button id="diagExit">Zum Lernlabor</button><button class="primary" id="diagCheck">Übernehmen →</button></div></div></div>`;
  wireDrag();
  D.querySelectorAll('.choice-card').forEach(x=>{x.onclick=()=>{
    if(['choose','eff'].includes(s.type))D.querySelectorAll('.choice-card').forEach(y=>{if(y!==x){y.classList.remove('selected');y.setAttribute('aria-checked','false');}});
    x.classList.toggle('selected');x.setAttribute('aria-checked',String(x.classList.contains('selected')));
  };keyboardClick(x);});
  D.querySelectorAll('.tree-click button').forEach(x=>{x.setAttribute('aria-pressed','false');x.onclick=()=>{
    x.classList.toggle('hit');treeClicks=x.classList.contains('hit')?[...treeClicks,x.dataset.n]:treeClicks.filter(n=>n!==x.dataset.n);
    x.setAttribute('aria-pressed',String(x.classList.contains('hit')));
    D.querySelector('#clickPath').textContent='Klickreihenfolge: '+(treeClicks.join(' → ')||'noch leer');
  };});
  D.querySelector('#diagExit').onclick=()=>showLab();D.querySelector('#diagCheck').onclick=checkStart;
}
function checkStart(){
  const s=startStages[stage];let data;
  if(s.type==='order')data=[...D.querySelectorAll('.dropzone')].map(z=>z.querySelector('.package')?.dataset.p||'');
  else if(s.type==='undo')data=[...D.querySelectorAll('#take .package')].map(x=>x.dataset.p);
  else if(s.type==='tree')data=treeClicks;
  else data=[...D.querySelectorAll('.choice-card.selected')].map(x=>x.dataset.v);
  const r=Diagnostic.evaluateStart(s.type,data);
  if(r.status==='incomplete'){D.querySelector('#df').textContent=r.message;D.querySelector('#df').className='diag-feedback warn';return;}
  stageScores[stage]=r.points;score=Diagnostic.startProfile(stageScores);
  if(stage<startStages.length-1){stage++;renderStart();}else{saveStart();renderStartResult();}
}
function profileHTML(start,now){
  start=Diagnostic.cleanProfile(start);now=now?Diagnostic.cleanProfile(now):null;
  return `<div class="profile">${competencies.map(c=>{const a=start[c],b=now?.[c];return `<div class="profile-row"><strong>${c}</strong><div class="profile-bars"><div class="bar" aria-hidden="true"><i style="width:${(a??0)/3*100}%"></i></div>${now?`<div class="bar now" aria-hidden="true"><i style="width:${(b??0)/3*100}%"></i></div>`:''}</div><span>${now?`${a??'–'} → ${b??'–'}`:`${a??'–'} / 3`}</span></div>`;}).join('')}</div><p class="muted">– = nicht erhoben. Der Startcheck enthält keine eigene Aufgabe zum Kompetenzbereich Algorithmen. 3 = korrekt, 1 = teilweise passende Idee, 0 = noch nicht gezeigt.</p>`;
}
function renderStartResult(){
  D.innerHTML=`<div class="diag-shell"><div class="diag-head"><span class="eyebrow">STARTPUNKT GESPEICHERT</span><h2>Dein Startprofil Q1.4</h2><p>Das ist keine Note. Es zeigt, welche Denkideen du bereits mitbringst.</p></div><div class="diag-body">${profileHTML(score,null)}<div class="recommend">Arbeite jetzt durch das Lernlabor. Am Ende wartet der Kompetenzcheck.</div><div class="diag-actions"><span></span><button id="toLab" class="primary">Lernlabor starten →</button></div></div></div>`;
  D.querySelector('#toLab').onclick=()=>showLab();
}
function renderEnd(){
  const previous=Diagnostic.cleanProfile(LabStorage.json('q14_end_profile',{}));
  D.innerHTML=`<div class="diag-shell"><div class="diag-head"><span class="eyebrow">KOMPETENZCHECK · Q1.4</span><h2>Was kannst du jetzt?</h2><p>Wähle jeweils die fachlich beste Antwort.</p></div><div class="diag-body"><form id="endForm">${endQs.map((q,i)=>`<fieldset class="competence-question"><legend>${i+1}. ${q[1]}</legend>${q.slice(2,5).map(a=>`<label><input type="radio" name="q${i}" value="${esc(a)}"> ${esc(a)}</label>`).join('')}</fieldset>`).join('')}</form><div id="endFeedback" role="status"></div><div class="diag-actions"><button id="endExit">Zum Lernlabor</button><button class="primary" id="endEval">Auswerten</button></div>${Object.keys(previous).length?'<details><summary>Zuletzt gespeichertes Kompetenzprofil</summary>'+profileHTML(getStart(),previous)+'</details>':''}</div></div>`;
  D.querySelector('#endExit').onclick=()=>showLab();D.querySelector('#endEval').onclick=evalEnd;
}
function evalEnd(){
  const answers=endQs.map((q,i)=>D.querySelector(`input[name=q${i}]:checked`)?.value),r=Diagnostic.evaluateEnd(answers);
  if(r.status==='incomplete'){D.querySelector('#endFeedback').textContent=r.message;return;}
  LabStorage.set('q14_end_profile',JSON.stringify(r.profile));renderEndResult(r);
}
function renderEndResult(r){
  const weak=competencies.filter(c=>(r.profile[c]||0)<3),map={'Reihenfolgen':'1.4.2 Stack & Queue','Referenzen':'1.4.1 Listen','Baumstrukturen':'1.4.3 Binärbäume','Algorithmen':'1.4.4 Traversierung','Effizienz':'1.4.6 Verändern & Effizienz','Strukturwahl':'Gesamtsicherung','Präfixstrukturen':'1.4.7 Trie'};
  D.innerHTML=`<div class="diag-shell"><div class="diag-head"><span class="eyebrow">KOMPETENZZUWACHS</span><h2>Start → Jetzt</h2><p>Obere Leiste = Startcheck, untere Leiste = Kompetenzcheck.</p></div><div class="diag-body">${profileHTML(getStart(),r.profile)}<details class="answer-review"><summary>Deine Antworten im Überblick · ${r.rows.filter(row=>row.ok).length} von ${r.rows.length} korrekt</summary>${r.rows.map((row,i)=>`<p class="diag-result-row" data-correct="${row.ok}">${row.ok?'✓':'↻'} ${i+1}. ${esc(row.competency)}: ${row.ok?'korrekt':'noch nicht korrekt; passende Antwort: '+esc(row.expected)}</p>`).join('')}</details><div class="recommend"><strong>Empfohlene Wiederholung:</strong><br>${weak.length?weak.map(c=>`<button class="recommend-link" data-repeat="${({'Reihenfolgen':'stackqueue','Referenzen':'list','Baumstrukturen':'tree','Algorithmen':'traversal','Effizienz':'bst2','Strukturwahl':'review','Präfixstrukturen':'trie'})[c]}">${map[c]} – ${c} →</button>`).join(''):'Alle sieben Antworten sind korrekt. Vertiefe die Kompetenzen im Lernlabor.'}</div><div class="diag-actions"><button id="resetDiag">Diagnosedaten zurücksetzen</button><button id="retryEnd">Kompetenzcheck wiederholen</button><button class="primary" id="finishDiag">Zur Gesamtsicherung →</button></div></div></div>`;
  D.querySelector('#resetDiag').onclick=()=>{if(confirm('Start- und Kompetenzcheck wirklich zurücksetzen?')){['q14_start_profile','q14_start_done','q14_end_profile'].forEach(k=>LabStorage.remove(k));showDiag('start');}};
  D.querySelectorAll('[data-repeat]').forEach(b=>b.onclick=()=>showLab(b.dataset.repeat));
  D.querySelector('#retryEnd').onclick=renderEnd;D.querySelector('#finishDiag').onclick=()=>showLab('review');
}
function showDiag(which){
  if(!M.classList.contains('hidden'))labFilter=document.querySelector('.tab[data-filter].active')?.dataset.filter||'all';
  D.classList.remove('hidden');M.classList.add('hidden');document.querySelectorAll('.tab').forEach(x=>{x.classList.remove('active');x.removeAttribute('aria-current');});
  document.querySelector(`.diag-tab[data-diagnostic="${which}"]`).classList.add('active');
  document.querySelector(`.diag-tab[data-diagnostic="${which}"]`).setAttribute('aria-current','page');
  document.getElementById('chapterLabel').textContent=which==='start'?'Startcheck':'Kompetenzcheck';
  document.getElementById('chapterMenu').open=false;
  document.querySelector('.skip-link').href='#diagnostic';D.tabIndex=-1;
  if(which==='start'){stage=0;score={};stageScores={};renderStart();}else renderEnd();
}
function showLab(target=labFilter){D.classList.add('hidden');M.classList.remove('hidden');document.querySelector(`.tab[data-filter="${target}"]`).click();}
// Regular chapter tabs must also close an open diagnostic view.
 document.querySelectorAll('.tab[data-filter]').forEach(b=>b.addEventListener('click',()=>{D.classList.add('hidden');M.classList.remove('hidden');document.querySelector('.skip-link').href='#title';}));
 document.querySelectorAll('.diag-tab').forEach(b=>b.onclick=e=>{e.preventDefault();showDiag(b.dataset.diagnostic);});
})();
