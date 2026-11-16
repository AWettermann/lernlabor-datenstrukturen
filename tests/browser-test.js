'use strict';
// Uses the installed Chrome and Node's built-in CDP WebSocket; no npm dependencies.
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process');
const {tasks}=require('./load');
const root=path.resolve(__dirname,'..'),artifacts=path.join(__dirname,'artifacts');
fs.mkdirSync(artifacts,{recursive:true});
const captureScreenshots=process.env.Q14_SCREENSHOTS!=='0';
const chromePath=process.env.Q14_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const server=http.createServer((req,res)=>{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/github-pages\//,'/'),file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(name==='/favicon.ico'){res.writeHead(204);res.end();return;}
  try{res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css','.png':'image/png'})[path.extname(file)]||'text/plain');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end('not found');}
});
let chrome,ws,temp,session,passed=0;
const pending=new Map(),errors=[];let id=0;
function send(method,params={},withSession=true){return new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>{pending.delete(n);reject(new Error('CDP timeout: '+method));},15000);pending.set(n,{resolve,reject,timer});ws.send(JSON.stringify({id:n,method,params,...withSession&&session?{sessionId:session}:{}}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
async function ready(){for(let i=0;i<150;i++){if(await evaluate('document.readyState==="complete" && typeof Assessment!=="undefined" && !!document.getElementById("code")'))return;await pause(30);}throw new Error('Page not ready');}
async function check(label,fn){await fn();passed++;console.log('✓ '+label);}
async function chooseTask(key){
  await evaluate(`(()=>{document.querySelector('.tab[data-filter="all"]').click();const key=${JSON.stringify(key)},t=tasks.find(t=>key.startsWith('format:')?t.format===key.slice(7):t.checkKey===key);document.getElementById('taskSelect').value=t.id;document.getElementById('taskSelect').dispatchEvent(new Event('change'));})()`);
}
async function clickAt(selector){
  const p=await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(selector)}),r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()`);
  await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...p});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...p});
}
async function screenshot(name){if(!captureScreenshots)return;const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(artifacts,name),Buffer.from(shot.data,'base64'));}
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin='http://127.0.0.1:'+server.address().port;
  temp=fs.mkdtempSync(path.join(os.tmpdir(),'q14-browser-'));
  const endpoint=await new Promise((resolve,reject)=>{
    chrome=spawn(chromePath,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=0','--user-data-dir='+temp,'about:blank'],{stdio:['ignore','ignore','pipe']});
    let out='';const timer=setTimeout(()=>reject(new Error('Chrome did not start: '+out.slice(-1000))),15000);
    chrome.on('error',e=>{clearTimeout(timer);reject(e);});
    chrome.stderr.on('data',d=>{out+=d;const m=out.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(m){clearTimeout(timer);resolve(m[1]);}});
  });
  ws=new WebSocket(endpoint);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
  ws.onmessage=e=>{
    const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);if(p){clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result);}}
    else if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);
  };
  const target=await send('Target.createTarget',{url:'about:blank'},false);
  session=(await send('Target.attachToTarget',{targetId:target.targetId,flatten:true},false)).sessionId;
  await send('Runtime.enable');await send('Page.enable');await send('Network.enable');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:origin+'/'});await ready();
  await check('Anwendung startet ohne JavaScript-Ausnahme',async()=>{assert.equal(await evaluate('document.getElementById("title").textContent'),tasks[0].title);assert.equal(errors.length,0);});
  await check('Alle 64 Stationen über Weiter erreichbar; echte UI-Prüfung aller Musterlösungen',async()=>{
    for(let i=0;i<tasks.length;i++){
      assert.equal(await evaluate('current().id'),tasks[i].id);
      if(tasks[i].fragment)assert.equal(await evaluate('document.getElementById("codeSignature").classList.contains("hidden")'),true,'Anweisungsfragmente dürfen keine erfundene Methodensignatur zeigen.');
      const status=await evaluate(`(()=>{const e=document.getElementById('code');e.value=current().solution;e.dispatchEvent(new Event('input'));document.getElementById('run').click();return document.getElementById('score').textContent;})()`);
      assert.ok(status.includes('Korrekt'),tasks[i].id+': '+status);
      if(i<tasks.length-1)await evaluate('document.getElementById("next").click()');
    }
    assert.equal(await evaluate('current().id'),'task-64');
    assert.equal(await evaluate('completed.size'),64);
    await evaluate('document.getElementById("prev").click()');assert.equal(await evaluate('current().id'),'task-63');
    await evaluate('document.getElementById("next").click()');assert.equal(await evaluate('current().id'),'task-64');
  });
  await check('Kapitelwechsel, Methodenverzeichnis, Hinweise, Musterlösungen',async()=>{
    for(const filter of ['list','stackqueue','tree','traversal','bst','bst2','trie','review','all']){
      await evaluate(`document.querySelector('.tab[data-filter="${filter}"]').click()`);
      assert.equal(await evaluate('filter'),filter);assert.ok(await evaluate('document.getElementById("methodsContent").textContent.length>20'));
      await evaluate('document.getElementById("hint").click()');assert.equal(await evaluate('document.getElementById("hintLevel").textContent'),'HINWEIS 1 VON 4');
      await evaluate('document.getElementById("closeHelp").click()');
      await evaluate('document.getElementById("solution").click()');assert.match(await evaluate('document.getElementById("helpTitle").textContent'),/Musterlösung/);
      await evaluate('document.getElementById("closeHelp").click()');
    }
  });
  await check('Beide gemeldeten korrekten Lösungen werden im Browser akzeptiert',async()=>{
    const alternatives=require('./alternatives');
    for(const key of ['leaves','height']){
      const msg=await evaluate(`(()=>{index=tasks.findIndex(t=>t.checkKey===${JSON.stringify(key)});render();const e=document.getElementById('code');e.value=${JSON.stringify(alternatives[key])};e.dispatchEvent(new Event('input'));document.getElementById('run').click();return document.getElementById('message').dataset.status;})()`);
      assert.equal(msg,'correct');
    }
    assert.match(await evaluate('document.getElementById("codeSignature").textContent'),/int hoehe\(BaumKnoten k\)/);
  });
  await check('Alle sieben früher manuellen Aufgaben: Alternative akzeptiert, Fehlprogramm abgelehnt',async()=>{
    const variants=require('./answer-variants');
    for(const key of ['nodeclass','stackclass','queueclass','treenode','triesearch','trieinsert','prefix']){
      const t=tasks.find(t=>t.checkKey===key);await chooseTask(key);
      assert.equal(await evaluate('current().mode'),'functional');
      assert.doesNotMatch(await evaluate('document.getElementById("assessmentMode").textContent'),/manuell/i);
      for(const [code,status] of [[variants.alternative(t),'correct'],[variants.wrong(t),'incorrect']]){
        await evaluate(`document.getElementById('code').value=${JSON.stringify(code)};document.getElementById('code').dispatchEvent(new Event('input'));document.getElementById('run').click()`);
        assert.equal(await evaluate('document.getElementById("message").dataset.status'),status,t.id);
        assert.equal(await evaluate('completed.has(current().id)'),status==='correct',t.id);
      }
    }
    await chooseTask('height');
  });
  await check('Entwürfe und bestätigter Fortschritt überleben Neuladen',async()=>{
    const before=await evaluate('document.getElementById("code").value'),count=await evaluate('completed.size');
    await send('Page.reload');await ready();await evaluate('document.querySelector(\'.tab[data-filter="tree"]\').click();index=tasks.findIndex(t=>t.checkKey==="height");render()');
    assert.equal(await evaluate('document.getElementById("code").value'),before);assert.equal(await evaluate('completed.size'),count);
    await screenshot('repair-desktop.png');
  });
  await check('Bearbeitete Lösung verliert veraltete Erfolgsmeldung; Reset setzt Vorlage zurück',async()=>{
    await evaluate('document.getElementById("code").value="return 0;";document.getElementById("code").dispatchEvent(new Event("input"))');
    assert.equal(await evaluate('completed.has(current().id)'),false);assert.equal(await evaluate('document.getElementById("score").textContent'),'Eingabe geändert');
    await evaluate('document.getElementById("run").click()');assert.equal(await evaluate('document.getElementById("message").dataset.status'),'incorrect');
    await evaluate('document.getElementById("reset").click()');assert.equal(await evaluate('document.getElementById("code").value'),'');
  });
  await check('Startcheck: leere Eingabe bleibt offen; alle sieben Interaktionen funktionieren per Klick',async()=>{
    await evaluate('document.querySelector(\'.diag-tab[data-diagnostic="start"]\').click();document.getElementById("diagCheck").click()');
    assert.match(await evaluate('document.querySelector(".diag-head h2").textContent'),/^1\./);
    for(let i=1;i<=4;i++)await evaluate(`document.querySelector('[data-p="P${i}"]').click();document.querySelector('[data-slot="${i}"]').click()`);
    await evaluate('document.getElementById("diagCheck").click();document.querySelector(\'[data-p="D"]\').click();document.getElementById("take").click();document.getElementById("diagCheck").click()');
    await evaluate('document.querySelector(\'[data-v="P1-PX"]\').click();document.querySelector(\'[data-v="PX-P2"]\').click();document.getElementById("diagCheck").click()');
    await evaluate('["50","70","60"].forEach(n=>document.querySelector(`[data-n="${n}"]`).click());document.getElementById("diagCheck").click()');
    await evaluate('document.querySelector(\'[data-v="ordered"]\').click();document.getElementById("diagCheck").click()');
    await evaluate('["1234","1257","1289"].forEach(n=>document.querySelector(`[data-v="${n}"]`).click());document.getElementById("diagCheck").click()');
    await evaluate('document.querySelector(\'[data-v="exclude"]\').click();document.getElementById("diagCheck").click()');
    assert.match(await evaluate('document.querySelector(".diag-head h2").textContent'),/Startprofil/);
    assert.equal(await evaluate('JSON.parse(localStorage.getItem("q14_start_profile")).Reihenfolgen'),3);
    assert.equal(await evaluate('Object.hasOwn(JSON.parse(localStorage.getItem("q14_start_profile")),"Algorithmen")'),false);
  });
  await check('Kapitelnavigation schließt Diagnose; Kompetenzcheck verlangt vollständige Antworten und führt zur Gesamtsicherung',async()=>{
    await evaluate('document.querySelector(\'.tab[data-filter="trie"]\').click()');assert.equal(await evaluate('document.getElementById("labMain").classList.contains("hidden")'),false);
    await evaluate('document.querySelector(\'.diag-tab[data-diagnostic="end"]\').click();document.getElementById("endEval").click()');assert.match(await evaluate('document.getElementById("endFeedback").textContent'),/alle sieben/);
    await evaluate('Diagnostic.endQs.forEach((q,i)=>{[...document.querySelectorAll(`input[name="q${i}"]`)].find(x=>x.value===q[5]).click();});document.getElementById("endEval").click()');
    assert.equal(await evaluate('Object.values(JSON.parse(localStorage.getItem("q14_end_profile"))).every(x=>x===3)'),true);
    await evaluate('document.getElementById("finishDiag").click()');assert.equal(await evaluate('filter'),'review');
  });
  await check('Kapitelmenü per Maus; Aufgabenwahl und Fortschrittsmarkierungen',async()=>{
    await clickAt('#chapterMenu>summary');assert.equal(await evaluate('document.getElementById("chapterMenu").open'),true);
    await clickAt('.tab[data-filter="tree"]');assert.equal(await evaluate('filter'),'tree');
    assert.equal(await evaluate('document.getElementById("chapterMenu").open'),false);
    assert.equal(await evaluate('document.querySelector(\'.tab[data-filter="tree"]\').getAttribute("aria-current")'),'page');
    await chooseTask('height');assert.equal(await evaluate('current().checkKey'),'height');
    assert.match(await evaluate('document.getElementById("taskSelect").textContent'),/Bestätigt/);
    assert.equal(await evaluate('document.getElementById("progressTrack").getAttribute("aria-valuenow")'),String(await evaluate('completed.size')));
  });
  await check('Editor: echte Tastatureingabe, Prüfkürzel, Zeilennummern und gespeicherter Entwurf',async()=>{
    await chooseTask('height');const code=require('./alternatives').height;
    await evaluate('document.getElementById("code").focus()');
    await send('Input.insertText',{text:code});
    assert.equal(await evaluate('document.getElementById("code").value'),code);
    assert.equal(await evaluate('document.getElementById("lineNumbers").textContent.split("\\n").length'),code.split('\n').length);
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',modifiers:2,windowsVirtualKeyCode:13});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',modifiers:2,windowsVirtualKeyCode:13});
    assert.equal(await evaluate('document.getElementById("message").dataset.status'),'correct');
    assert.equal(await evaluate('document.getElementById("testDetails").open'),false);
    assert.equal(await evaluate('JSON.parse(localStorage.getItem("q14_lab_v2")).drafts[current().id]'),code);
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
    assert.equal(await evaluate('document.activeElement.id'),'hint','Tab muss den Editor verlassen können.');
    assert.ok(await evaluate('parseFloat(getComputedStyle(document.activeElement).outlineWidth)>=2'),'Tastaturfokus muss sichtbar sein.');
  });
  await check('Hinweisdialog: alle vier Stufen, Musterlösung, Escape und Fokus-Rückkehr',async()=>{
    await clickAt('#hint');assert.equal(await evaluate('document.getElementById("helpDialog").open'),true);
    for(let i=2;i<=4;i++){await clickAt('#nextHint');assert.equal(await evaluate('document.getElementById("hintLevel").textContent'),`HINWEIS ${i} VON 4`);}
    await screenshot('repair-hinweise.png');
    for(let i=0;i<4;i++){
      await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
      assert.ok(await evaluate('document.getElementById("helpDialog").contains(document.activeElement)'),'Fokus muss im offenen Dialog bleiben.');
    }
    await clickAt('#nextHint');assert.equal(await evaluate('document.getElementById("helpTitle").textContent'),'Musterlösung');
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    assert.equal(await evaluate('document.getElementById("helpDialog").open'),false);
    assert.equal(await evaluate('document.activeElement.id'),'hint');
  });
  await check('Lernfreundliche Rückmeldung unterscheidet alle fünf Ergebnisse',async()=>{
    await chooseTask('height');
    for(const [code,status] of [['','incomplete'],['return 0;','incorrect'],['return true;','format'],['throw new RuntimeException();','unverifiable'],[require('./alternatives').height,'correct']]){
      await evaluate(`document.getElementById('code').value=${JSON.stringify(code)};document.getElementById('code').dispatchEvent(new Event('input'));document.getElementById('run').click()`);
      assert.equal(await evaluate('document.getElementById("message").dataset.status'),status);
      assert.ok(await evaluate('document.getElementById("message").textContent.length>20'));
    }
  });
  await check('Kapitelende führt ausdrücklich zum nächsten Kapitel und zuletzt zum Kompetenzcheck',async()=>{
    await evaluate('document.querySelector(\'.tab[data-filter="list"]\').click();document.getElementById("taskSelect").value=visible().at(-1).id;document.getElementById("taskSelect").dispatchEvent(new Event("change"))');
    assert.match(await evaluate('document.getElementById("next").textContent'),/Nächstes Kapitel/);
    await evaluate('document.getElementById("next").click()');assert.equal(await evaluate('filter'),'stackqueue');
    await evaluate('document.querySelector(\'.tab[data-filter="review"]\').click();document.getElementById("taskSelect").value=visible().at(-1).id;document.getElementById("taskSelect").dispatchEvent(new Event("change"));document.getElementById("next").click()');
    assert.ok(await evaluate('!!document.getElementById("endForm")'));
  });
  await check('Kompetenzprofil und direkte Wiederholungsempfehlung',async()=>{
    await evaluate('Diagnostic.endQs.forEach((q,i)=>{[...document.querySelectorAll(`input[name="q${i}"]`)].find(x=>x.value===(i===0?q[2]:q[5])).click();});document.getElementById("endEval").click()');
    await screenshot('repair-kompetenzprofil.png');
    assert.ok(await evaluate('!!document.querySelector(\'[data-repeat="stackqueue"]\')'));
    await evaluate('document.querySelector(\'[data-repeat="stackqueue"]\').click()');assert.equal(await evaluate('filter'),'stackqueue');
    assert.equal(await evaluate('document.getElementById("diagnostic").classList.contains("hidden")'),true);
  });
  await check('Laptop-, Desktop- und Tabletansichten: alle Aufgabentypen passen ohne Seitenüberlauf',async()=>{
    const keys=['nodeclass','traverse','height','exactanswer','sequence','triesearch','choose','format:number','format:sequence','format:set','format:boolean','format:term'];
    const layoutIssues=[];
    for(const [width,height] of [[1280,800],[1440,900],[1920,1080],[1024,768],[834,1112],[768,1024]]){
      await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
      for(const key of keys){await chooseTask(key);assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),width+' / '+key);}
      await chooseTask('height');
      const bounds=await evaluate('(()=>{const r=id=>{const a=document.getElementById(id).getBoundingClientRect();return {left:a.left,right:a.right,top:a.top,bottom:a.bottom,width:a.width}};return {code:r("code"),run:r("run"),task:r("title"),methods:r("methodsDetails"),message:r("message"),open:document.getElementById("methodsDetails").open};})()');
      assert.ok(bounds.code.width>=width*.45,'Editor zu schmal: '+width);
      if(width>=1024){assert.ok(bounds.methods.right<bounds.task.left,'Methoden müssen links bleiben: '+width);assert.equal(bounds.open,true);}
      else assert.equal(bounds.open,false,'Methoden auf Tablet einklappen');
      if(width>=1280&&(bounds.run.bottom>height||bounds.message.top>=height-20))layoutIssues.push({width,height,bounds});
      await screenshot('repair-'+width+'.png');
    }
    assert.deepEqual(layoutIssues,[],'Aufgabe, Editor und Rückmeldung sollten gemeinsam sichtbar sein.');
  });
  await check('Methodenverzeichnis: Abschnitte einklappen, auf Tablet platzsparend öffnen',async()=>{
    await send('Emulation.setDeviceMetricsOverride',{width:834,height:1112,deviceScaleFactor:1,mobile:false});
    await chooseTask('height');assert.equal(await evaluate('document.getElementById("methodsDetails").open'),false);
    await clickAt('#methodsDetails>summary');assert.equal(await evaluate('document.getElementById("methodsDetails").open'),true);
    const previous=await evaluate('document.querySelector(".method-group").open');
    await clickAt('.method-group>summary');assert.equal(await evaluate('document.querySelector(".method-group").open'),!previous);
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
    assert.equal(await evaluate('document.getElementById("methodsDetails").open'),false);
  });
  await check('Textkontraste für Editor, Methoden, Hinweise und Hauptaktionen mindestens 4,5:1',async()=>{
    await chooseTask('height');
    const pairs=await evaluate(`(()=>{const bg=s=>getComputedStyle(document.querySelector(s)).backgroundColor;return [
      ['Fließtext','body','body'],['Code','#code','.code-frame'],['Zeilennummern','#lineNumbers','.code-frame'],
      ['Methoden','.method-group code','.method-group code'],['Kontext','.source-label','.signature-panel'],
      ['Editorinfo','.code-toolbar','.code-toolbar'],['Eingabeformat','#inputFormat','.workspace'],
      ['Prüfen','#run','#run'],['Weiter','#next','#next'],['Fußzeile','footer','body']
    ].map(([label,fg,b])=>({label,fg:getComputedStyle(document.querySelector(fg)).color,bg:bg(b)}));})()`);
    const luminance=rgb=>{const c=rgb.match(/[\d.]+/g).slice(0,3).map(Number).map(n=>n/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return c[0]*.2126+c[1]*.7152+c[2]*.0722;};
    for(const pair of pairs){const a=luminance(pair.fg),b=luminance(pair.bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,pair.label+': '+ratio);}
  });
  await check('Mobiles Layout (390 und 320 Pixel) ohne Seitenüberlauf',async()=>{
    for(const width of [390,320]){
      await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});
      await evaluate('document.querySelector(\'.tab[data-filter="tree"]\').click();index=tasks.findIndex(t=>t.checkKey==="height");render()');
      assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),String(width)+' Labor');
      if(width===390)await screenshot('repair-mobile.png');
      await evaluate('document.querySelector(\'.diag-tab[data-diagnostic="start"]\').click()');
      assert.ok(await evaluate('document.documentElement.scrollWidth<=innerWidth'),String(width)+' Diagnose');
    }
  });
  await check('Relative Dateien funktionieren unter einem GitHub-Pages-Unterpfad',async()=>{
    await send('Page.navigate',{url:origin+'/github-pages/'});await ready();
    assert.equal(await evaluate('current().id'),'task-01');
    assert.equal(await evaluate('document.styleSheets.length'),1);
    assert.ok(await evaluate('tasks.length===64 && typeof Diagnostic.evaluateEnd==="function"'));
  });
  await check('Beschädigte gespeicherte Daten verhindern Start nicht',async()=>{
    await evaluate('localStorage.setItem("q14_lab_v2","{kaputt");localStorage.setItem("q14_start_profile","[]")');await send('Page.reload');await ready();assert.equal(await evaluate('completed.size'),0);
  });
  await check('Gesperrter localStorage: Sitzung nutzbar, sichtbarer Speicherhinweis',async()=>{
    await send('Page.addScriptToEvaluateOnNewDocument',{source:'Object.defineProperty(window,"localStorage",{get(){throw new DOMException("blocked","SecurityError");}});'});
    await send('Page.reload');await ready();await evaluate('document.getElementById("code").value="test";document.getElementById("code").dispatchEvent(new Event("input"))');
    assert.match(await evaluate('document.getElementById("storageNotice").textContent'),/gesperrt/);
    await evaluate('document.querySelector(\'.diag-tab[data-diagnostic="end"]\').click()');assert.ok(await evaluate('!!document.getElementById("endForm")'));
  });
  assert.equal(errors.length,0,JSON.stringify(errors));
  const crypto=require('node:crypto');
  const before=JSON.parse(fs.readFileSync(path.join(artifacts,'ui-before-engine-sha256.json'),'utf8'));
  const unchanged=Object.fromEntries(Object.entries(before).map(([file,hash])=>[file,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')===hash]));
  const styleBaseline=JSON.parse(fs.readFileSync(path.join(artifacts,'manual-repair-layout-before.json'),'utf8'));
  const layoutUnchanged=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,styleBaseline.file))).digest('hex')===styleBaseline.sha256;
  assert.ok(layoutUnchanged,'Unnötige Layoutänderung');
  const report={passed,captureScreenshots,jsErrors:errors.length,stations:64,automaticallyConfirmed:64,manualStations:0,previousUiEngineUnchanged:unchanged,layoutUnchanged,browser:await send('Browser.getVersion',{},false),viewports:[1280,1440,1920,1024,834,768,390,320]};
  fs.writeFileSync(path.join(artifacts,'manual-repair-browser-report.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(async()=>{
  for(const p of pending.values())clearTimeout(p.timer);
  if(ws?.readyState===WebSocket.OPEN){try{await send('Browser.close',{},false);}catch{}ws.close();}
  chrome?.kill();server.close();
  if(chrome&&chrome.exitCode===null)await Promise.race([new Promise(r=>chrome.once('exit',r)),pause(2000)]);
  if(temp)await fs.promises.rm(temp,{recursive:true,force:true,maxRetries:6,retryDelay:200});
});
