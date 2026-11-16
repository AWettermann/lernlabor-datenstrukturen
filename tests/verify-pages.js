'use strict';
// Read-only deployment verification using Node's built-in fetch and SHA-256.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const base=new URL(process.argv[2]||'https://awettermann.github.io/lernlabor-datenstrukturen/');
const commit=process.argv[3]||null;
if(!['https:','http:'].includes(base.protocol)||commit&&!/^[a-f0-9]{40}$/i.test(commit))throw new Error('Erwartet werden eine HTTP(S)-Adresse und optional ein vollständiger Commit-SHA.');
if(!base.pathname.endsWith('/'))base.pathname+='/';
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
if(!fs.existsSync(path.join(root,'.nojekyll')))throw new Error('Statische Pages-Konfiguration fehlt.');
const files=[...new Set(['index.html','style.css',...scripts,'README.md','docs/VEROEFFENTLICHUNG-PRUEFUNG.md','tests/verify-pages.js'])];
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
(async()=>{
  const matched=[],errors=[];
  for(let start=0;start<files.length;start+=4){
    const batch=files.slice(start,start+4);
    const results=await Promise.allSettled(batch.map(async file=>{
      if(file.startsWith('/')||file.includes('..')||file.includes(':'))throw new Error('Ungültiger Dateipfad.');
      const expected=fs.readFileSync(path.join(root,file)),url=new URL(file,base);
      url.searchParams.set('release',commit||hash(expected).slice(0,12));
      const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
      if(response.status!==200)throw new Error('HTTP '+response.status);
      const actual=Buffer.from(await response.arrayBuffer()),expectedSha256=hash(expected),actualSha256=hash(actual);
      if(actualSha256!==expectedSha256)throw new Error('Live-Datei stimmt nicht mit dem geprüften Checkout überein.');
      return {file,status:response.status,sha256:actualSha256};
    }));
    results.forEach((result,i)=>{if(result.status==='fulfilled')matched.push(result.value);else errors.push({file:batch[i],error:String(result.reason.message||result.reason)});});
  }
  console.log(JSON.stringify({success:errors.length===0,base:base.href,commit,matched:matched.length,expected:files.length,files:matched,errors},null,2));
  if(errors.length)process.exitCode=1;
})().catch(error=>{console.error(error.message);process.exitCode=1;});
