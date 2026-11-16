/* Task contracts and typed answer formats, shared by the browser and Node tests. */
(function(root) {
  'use strict';
  const J=root.JavaSubset;
  const method=(result,name,params=[])=>({result,name,params:params.map(([type,name])=>({type,name}))});
  const specs={
    traverse:[method('int','anzahlPakete'),method('double','gesamtGewicht'),method('int','zaehlePaketeNach',[['String','zielort']]),method('Paket','suchePaket',[['String','paketnummer']])],
    insertAfter:[method('void','einfuegenNach',[['Knoten','aktuell'],['Paket','paket']])],
    insertFront:[method('void','vorneEinfuegen',[['Paket','paket']])],
    deleteFirst:[method('boolean','erstesLoeschen')],deleteSearch:[method('boolean','loeschePaket',[['String','paketnummer']])],
    updatePayload:[method('boolean','aktualisiereStatus',[['String','paketnummer'],['String','neuerStatus']])],
    sortedInsert:[method('void','sortiertEinfuegen',[['Paket','paket']])],
    push:[method('void','push',[['Paket','paket']])],pop:[method('Paket','pop')],
    enqueue:[method('void','enqueue',[['Paket','paket']])],dequeue:[method('Paket','dequeue')],bug:[method('Paket','dequeue')],
    treecount:[method('int','anzahlKnoten',[['BaumKnoten','k']])],inorder:[method('void','inorder',[['BaumKnoten','k']])],preorder:[method('void','preorder',[['BaumKnoten','k']])],
    bstsearch:[method('Paket','suchen',[['BaumKnoten','k'],['int','nummer']])],bstinsert:[method('BaumKnoten','einfuegen',[['BaumKnoten','k'],['Paket','paket']])],
    minimum:[method('BaumKnoten','minimum',[['BaumKnoten','k']])],bstdelete:[method('BaumKnoten','loeschen',[['BaumKnoten','k'],['int','nummer']])],
    choose:[method('String','waehle',[['String','anforderung']])]
  };
  Object.assign(specs,{
    nodeclass:[method('Paket','getPaket'),method('Knoten','getNaechster'),method('void','setNaechster',[['Knoten','nachfolger']])],
    stackclass:[method('void','push',[['Paket','paket']]),method('Paket','pop'),method('Paket','peek'),method('boolean','isEmpty')],
    queueclass:[method('void','enqueue',[['Paket','paket']]),method('Paket','dequeue'),method('Paket','front'),method('boolean','isEmpty')],
    treenode:[method('BaumKnoten','getLinks'),method('BaumKnoten','getRechts')],
    triesearch:[method('boolean','suchen',[['String','paketnummer']])],
    trieinsert:[method('Knoten','einfuegen',[['Knoten','k'],['String','paketnummer'],['int','position']])],
    prefix:[method('Knoten','findePraefix',[['String','praefix']])]
  });
  const classNames={nodeclass:'Knoten',stackclass:'PaketStapel',queueclass:'PaketWarteschlange',treenode:'BaumKnoten'};
  const extras={
    'Einfügen zwischen zwei Knoten':['insertBetween',method('void','loesung')],
    'Am Listenanfang einfügen':['frontFragment',method('void','loesung')],
    'Ersten Knoten entfernen':['removeFragment',method('void','loesung')],
    'push: Referenzen richtig setzen':['pushFragment',method('void','loesung')],
    'pop bei leerem Stapel':['popGuard',method('Paket','loesung')],
    'Letztes Element entnehmen':['queueTail',method('void','loesung')],
    'Blätter rekursiv zählen':['leaves',method('int','anzahlBlaetter',[['BaumKnoten','k']])],
    'Baumhöhe berechnen':['height',method('int','hoehe',[['BaumKnoten','k']])],
    'Gesamtgewicht berechnen':['weight',method('double','gesamtgewicht',[['BaumKnoten','k']])],
    'Postorder programmieren':['postorder',method('void','postorder',[['BaumKnoten','k']])],
    'Blatt löschen':['deleteLeaf',method('void','loesung')],
    'Knoten mit einem Kind löschen':['deleteChild',method('void','loesung')]
  };
  const sequences=new Set(['Stack-Zustand vorhersagen','Queue-Zustand vorhersagen','Preorder bestimmen','Inorder bestimmen','Postorder bestimmen','Suchweg 65','Präfixe erkennen','Trie-Suchweg']);
  const aliases={Queue:['queue','warteschlange','queue (warteschlange)'],Stack:['stack','stapel','stack (stapel)'],Trie:['trie','präfixbaum','praefixbaum','präfixbaum (trie)','trie (präfixbaum)']};
  const norm=s=>s.normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('de');
  function configure(tasks) {
    tasks.forEach((t,i)=>{
      t.id='task-'+String(i+1).padStart(2,'0');
      const x=extras[t.title];t.checkKey=x?x[0]:t.expect;
      if(t.expect==='sequence') {t.format='operations';t.mode='operations';}
      else if(specs[t.expect]||x) {
        t.format='java';t.mode='functional';
        const fields={};
        if(t.kind==='list')Object.assign(fields,{erster:'Knoten'});
        if(t.kind==='stack')Object.assign(fields,{oben:'Knoten'});
        if(t.kind==='queue')Object.assign(fields,{vorne:'Knoten',hinten:'Knoten'});
        if(x&&['insertBetween','frontFragment','pushFragment'].includes(x[0])) fields.neu='Knoten';
        if(x&&x[0]==='insertBetween')fields.aktuell='Knoten';
        if(x&&x[0]==='deleteLeaf')fields.k30='BaumKnoten';
        if(x&&x[0]==='deleteChild')Object.assign(fields,{k50:'BaumKnoten',k70:'BaumKnoten'});
        const natives={};
        if(['inorder','preorder','postorder'].includes(t.checkKey))natives.verarbeiten=['void','BaumKnoten'];
        if(t.checkKey==='bstdelete')natives.minimum=['BaumKnoten','BaumKnoten'];
        t.spec={methods:x?[x[1]]:specs[t.expect],fields,natives};
        if(classNames[t.expect]){
          t.spec.className=classNames[t.expect];
          t.spec.constructorParams=['nodeclass','treenode'].includes(t.expect)?['Paket']:[];
        }
        if(['triesearch','trieinsert','prefix'].includes(t.expect)){
          t.spec.fields={wurzel:'InnererKnoten'};
          t.spec.types=[...J.baseTypes,'InnererKnoten','Blatt'];
          t.spec.constructors={InnererKnoten:[],Blatt:['String']};
          t.spec.api={Knoten:{},InnererKnoten:{getKind:['Knoten','int'],setKind:['void','int','Knoten']},Blatt:{getPaketnummer:['String']}};
        }
        if(t.checkKey==='popGuard')t.spec.suffix='return oben.getPaket();';
      }
      else {
        t.mode='answer';
        t.format=sequences.has(t.title)?(t.title==='Präfixe erkennen'?'set':'sequence'):/^\d+$/.test(t.answer)?'number':/^O\(/.test(t.answer)?'complexity':/^(ja|nein)$/.test(t.answer)?'boolean':t.title==='Einfügeposition finden'?'position':'term';
      }
      t.fragment=t.spec?.methods[0].name==='loesung';
      t.inputLabel=t.mode==='answer'?({number:'Eine ganze Zahl',complexity:'Laufzeit in Big-O-Schreibweise, z. B. O(n)',boolean:'Ja oder nein; eine Begründung ist optional',sequence:'Geordnete Folge; Kommas, Semikolons oder Leerzeichen als Trenner',set:'Alle passenden Nummern; Reihenfolge beliebig',position:'links von 40 / rechts von 40',term:'Fachbegriff; gebräuchliche deutsche Bezeichnung ist möglich'})[t.format]:t.mode==='operations'?'Java-Operationsfolge: enqueue(P100); bzw. dequeue();':t.spec?.className?'Vollständige Klasse '+t.spec.className+' mit der öffentlichen Schnittstelle aus der Vorlage':t.spec?.suffix?'Java-Anweisungsfragment; danach folgt return oben.getPaket();':t.fragment?'Java-Anweisungen im gegebenen Kontext; keine Methodensignatur erforderlich':t.spec?.methods.length===1?'Methodenrumpf oder vollständige Methode':'Die vier vollständigen Methoden';
    });return tasks;
  }
  const result=(status,message,tests=[])=>({status,message,tests});
  function answer(t,input) {
    const a=norm(input),expected=norm(t.answer);
    let ok=false;
    if(t.format==='number') {
      // A numeric solution may include its reference explanation, never arbitrary prose.
      const reference=norm(t.solution);
      if(a===reference)ok=true;
      else {if(!/^\+?\d+$/.test(a))return result('format','Geben Sie eine nicht negative ganze Zahl ein.');ok=Number(a)===Number(expected);}
    }
    if(t.format==='complexity') {const v=a.replace(/\s/g,'').replace(/ο/g,'o');if(!/^o\((1|n|m|n\^2|logn|nlogn)\)$/.test(v))return result('format','Erwartet wird Big-O-Schreibweise, z. B. O(n).');ok=v===expected.replace(/\s/g,'');}
    if(t.format==='boolean') {
      const m=/^(ja|nein)(?=[\s.,!:]|$)/.exec(a);
      if(!m)return result('format','Beginnen Sie mit Ja oder Nein. Eine anschließende Begründung wird nicht automatisch bewertet.');
      if(/\b(ja|nein)\b/.test(a.slice(m[1].length)))return result('unverifiable','Die Antwort enthält widersprüchliche Ja-/Nein-Angaben. Bitte eindeutiger formulieren.');
      // The requested decision is graded; explanatory prose is explicitly not assessed.
      ok=m[1]===expected;
    }
    if(t.format==='sequence'||t.format==='set') {
      let text=a;if(text.startsWith('[')&&text.endsWith(']'))text=text.slice(1,-1).trim();
      if(!/^(?:p?\d+)(?:(?:\s*[,;→]\s*|\s+)p?\d+)*$/.test(text))return result('format','Trennen Sie vollständige Werte durch Kommas, Semikolons oder Leerzeichen.');
      const values=text.split(/\s*[,;→]\s*|\s+/),wanted=expected.split(',');
      if(t.format==='set') {if(new Set(values).size!==values.length)return result('incorrect','Jede passende Nummer soll genau einmal vorkommen.');values.sort();wanted.sort();}
      if(values.length<wanted.length&&values.every((v,i)=>v===wanted[i]))return result('incomplete','Die Folge ist noch nicht vollständig.');
      ok=JSON.stringify(values)===JSON.stringify(wanted);
    }
    if(t.format==='position') {if(!/^(links|rechts)\s+(von|vom knoten)\s+40\.?$/.test(a))return result('unverifiable','Diese Formulierung lässt sich nicht eindeutig zuordnen. Verwenden Sie „links von 40“ oder „rechts von 40“.');ok=a.startsWith('links');}
    if(t.format==='term') {
      const options=aliases[t.answer]||[expected];
      if(!options.includes(a))return result(['array','liste','stack','queue','trie','suchbaum','stapel','warteschlange','binärer suchbaum'].includes(a)?'incorrect':'unverifiable','Prüfen Sie das Zugriffsprinzip. Freie Erklärungen können hier nicht zuverlässig bewertet werden.');ok=true;
    }
    return result(ok?'correct':'incorrect',ok?(t.format==='boolean'?'Die Entscheidung ist korrekt. Eine Begründung wird nicht automatisch bewertet.':'Die Antwort ist korrekt.'):'Das Ergebnis passt noch nicht zur Aufgabe. Prüfen Sie die Definition und den ersten abweichenden Schritt.',[{label:'Ergebnis gemäß Aufgabenstellung',ok}]);
  }
  function operations(t,input) {
    let tokens;try{tokens=J.tokenize(input);}catch(e){return result(e instanceof J.Incomplete?'incomplete':'unverifiable',e.message);}
    const calls=[];let i=0;
    while(tokens[i].v!=='<EOF>') {
      const name=tokens[i++]?.v;
      if(!['enqueue','dequeue'].includes(name))return result('unverifiable','Hier werden ausschließlich enqueue(P100) bis enqueue(P400) und dequeue() ausgewertet.');
      if(tokens[i++]?.v!=='(')return result('format','Nach dem Operationsnamen muss eine öffnende Klammer folgen.');
      let arg=null;if(name==='enqueue') {arg=tokens[i++]?.v;if(!['P100','P200','P300','P400'].includes(arg))return result('format','Verwenden Sie eines der Pakete P100, P200, P300, P400.');}
      if(tokens[i++]?.v!==')'||tokens[i++]?.v!==';')return result('incomplete','Jede Operation benötigt schließende Klammer und Semikolon.');
      calls.push([name,arg]);
    }
    const wanted=[['enqueue','P100'],['enqueue','P200'],['enqueue','P300'],['dequeue',null],['enqueue','P400'],['dequeue',null],['dequeue',null],['dequeue',null]];
    const q=[],tests=[];
    calls.forEach(([name,arg],i)=>{if(name==='enqueue')q.push(arg);else q.shift();tests.push({label:`Schritt ${i+1}: vorne = ${q[0]||'null'}, hinten = ${q.at(-1)||'null'}`,ok:JSON.stringify(calls[i])===JSON.stringify(wanted[i])});});
    const equal=calls.length===wanted.length&&tests.every(t=>t.ok);
    return result(equal?'correct':calls.length<wanted.length&&tests.every(t=>t.ok)?'incomplete':'incorrect',equal?'Alle acht Operationen und Zwischenzustände stimmen.':'Die Operationsfolge stimmt noch nicht vollständig mit der vorgegebenen Folge überein.',tests);
  }
  function evaluate(t,input) {
    if(!input.trim())return result('incomplete','Die Eingabe ist leer. Ergänzen Sie Ihre Lösung.');
    if(t.mode==='answer')return answer(t,input);
    if(t.mode==='operations')return operations(t,input);
    try {
      if(input.trim()===t.code.trim()&&/\/\/\s*(Ihr Code|\.\.\.)|_{3,}/.test(t.code))return result('incomplete','Die Vorlage enthält noch offene Stellen.');
      const tokens=J.tokenize(input);
      if(tokens.length===1||tokens.some(x=>x.kind==='id'&&/^_{3,}$/.test(x.v)))return result('incomplete','Die Eingabe enthält noch keine Lösung oder offene Platzhalter.');
      const methods=t.spec.className?root.JavaClasses.compile(input,t.spec):J.compile(input,t.spec);
      const tests=t.spec.className?root.ClassCases.run(t,methods):['triesearch','trieinsert','prefix'].includes(t.checkKey)?root.TrieCases.run(t,methods):root.FunctionalCases.run(t,methods);
      const ok=tests.every(c=>c.ok);
      return result(ok?'correct':'incorrect',ok?'Alle Funktionstests im unterstützten Java-Sprachumfang bestanden. Das ist kein Beweis für sämtliche Eingaben.':'Mindestens ein Funktionstest liefert ein falsches Ergebnis. Prüfen Sie den angegebenen Fall.',tests);
    } catch(e) {
      if(e instanceof J.Incomplete)return result('incomplete',e.message);
      if(e instanceof J.FormatError)return result('format',e.message);
      if(e instanceof J.Unsupported||e instanceof J.Limit)return result('unverifiable','Automatische Bewertung nicht zuverlässig möglich: '+e.message);
      return result('unverifiable','Die Prüfung konnte nicht zuverlässig abgeschlossen werden. Bitte in einer Java-Umgebung prüfen.');
    }
  }
  root.Assessment={configure,evaluate,result,specs};
})(globalThis);
