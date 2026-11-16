/* Deliberately bounded Java interpreter. No eval, Function, source translation or host access.
 * Unsupported language features produce "unverifiable", never a correctness verdict.
 * See docs/BEWERTUNG.md for the grammar and its limits. */
(function(root) {
  'use strict';
  class Unsupported extends Error {}
  class FormatError extends Error {}
  class Incomplete extends Error {}
  class Limit extends Error {}
  const objectTypes=new WeakMap();
  const tag=(object,type)=>{objectTypes.set(object,type);return object;};
  const baseTypes=['int','double','boolean','void','String','Paket','Knoten','BaumKnoten','char'];
  const types = new Set([...baseTypes,'InnererKnoten','Blatt','PaketStapel','PaketWarteschlange']);
  const reserved=new Set('abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try void volatile while true false null _'.split(' '));
  function tokenize(source) {
    if (source.length > 30000) throw new Unsupported('Die Eingabe ist für diesen Prüfer zu groß.');
    if(/\\u+/.test(source))throw new Unsupported('Java-Unicode-Escapes benötigen einen echten Compiler.');
    const out=[];
    let i=0;
    while(i<source.length) {
      const s=source.slice(i);
      if (/^[ \t\f\r\n]/.test(s)) { i++; continue; }
      if(s.startsWith('//')) { const n=s.search(/[\r\n]/); i+=n<0?s.length:n; continue; }
      if(s.startsWith('/*')) { const n=s.indexOf('*/',2); if(n<0) throw new Incomplete('Blockkommentar nicht abgeschlossen.'); i+=n+2; continue; }
      const str=/^"(?:[^"\\\r\n]|\\["\\nrt])*"/.exec(s);
      if(str) { out.push({v:str[0],kind:'string',value:JSON.parse(str[0])}); i+=str[0].length; continue; }
      if(s[0]==='"') throw new Incomplete('Zeichenkette nicht abgeschlossen oder nicht unterstützte Escape-Sequenz.');
      const character=/^'(?:[^'\\\r\n]|\\['"\\nrt])'/.exec(s);
      if(character){const raw=character[0].slice(1,-1),esc={n:'\n',r:'\r',t:'\t',"'":"'",'"':'"','\\':'\\'},value=raw[0]==='\\'?esc[raw[1]]:raw;if(value.length!==1)throw new Unsupported('Nur einzelne UTF-16-Zeichen werden ausgewertet.');out.push({v:character[0],kind:'number',value:value.charCodeAt(0),type:'char'});i+=character[0].length;continue;}
      if(s[0]==="'")throw new Incomplete('Zeichenliteral nicht abgeschlossen oder nicht unterstützte Escape-Sequenz.');
      const num=/^(?:\d+\.\d+|\d+)/.exec(s);
      if(num) {if(!num[0].includes('.')&&(/^0\d/.test(num[0])||Number(num[0])>2147483647))throw new Unsupported('Oktalzahlen und große Ganzzahlliterale werden nicht ausgewertet.');out.push({v:num[0],kind:'number',value:Number(num[0]),type:num[0].includes('.')?'double':'int'}); i+=num[0].length; continue; }
      const id=/^[A-Za-z_$][A-Za-z0-9_$]*/.exec(s);
      if(id) {out.push({v:id[0],kind:'id'}); i+=id[0].length; continue;}
      const op=/^(?:==|!=|<=|>=|&&|\|\||\+\+|--|\+=|-=|\*=|\/=|[{}();,.?:+\-*/%<>=!])/.exec(s);
      if(op) {out.push({v:op[0]}); i+=op[0].length; continue;}
      throw new Unsupported('Dieses Sprachelement wird im Browser nicht ausgewertet: '+s[0]);
    }
    out.push({v:'<EOF>'});
    return out;
  }
  const precedence={'=':1,'+=':1,'-=':1,'*=':1,'/=':1,'||':3,'&&':4,'==':5,'!=':5,'<':6,'>':6,'<=':6,'>=':6,'+':7,'-':7,'*':8,'/':8,'%':8};
  class Parser {
    constructor(source) {this.ts=tokenize(source);this.i=0;this.depth=0;}
    peek(n=0) {return this.ts[this.i+n]?.v;}
    take(v) {if(this.peek()===v) {this.i++;return true;} return false;}
    need(v) {if(!this.take(v)) {if(this.peek()==='<EOF>') throw new Incomplete('Es fehlt „'+v+'“.'); throw new Unsupported('Erwartet: „'+v+'“, gefunden: „'+this.peek()+'“.');}}
    id() {const t=this.ts[this.i++];if(t?.kind!=='id') throw new Unsupported('Bezeichner erwartet.');if(reserved.has(t.v))throw new Unsupported('Reserviertes Java-Wort anstelle eines Bezeichners: '+t.v);return t.v;}
    type() {const t=this.ts[this.i++]?.v;if(!types.has(t)) throw new Unsupported('Nicht unterstützter Typ: '+t);return t;}
    program() {
      const methods=Object.create(null);
      while(this.peek()!=='<EOF>') {
        // Class bodies use java-classes.js. This entry point parses method declarations.
        if(['public','private','protected'].includes(this.peek())) this.i++;
        const result=this.type(), name=this.id();this.need('(');
        const params=[];
        if(this.peek()!==')') {do {params.push({type:this.type(),name:this.id()});}while(this.take(','));}
        this.need(')');const body=this.block();
        if(methods[name]) throw new Unsupported('Überladene Methoden werden nicht ausgewertet.');
        methods[name]={result,name,params,body};
      }
      return methods;
    }
    block() {this.need('{');const body=[];while(this.peek()!=='}') {if(this.peek()==='<EOF>') throw new Incomplete('Eine schließende Klammer fehlt.');body.push(this.statement());}this.need('}');return {k:'block',body};}
    statement() {
      if(++this.depth>150) throw new Unsupported('Zu tief verschachtelte Eingabe.');
      const result=this.statementInner();this.depth--;return result;
    }
    statementInner() {
      if(this.peek()==='{') return this.block();
      if(this.take(';')) return {k:'empty'};
      if(this.take('if')) {this.need('(');const test=this.expr();this.need(')');const yes=this.statement();return {k:'if',test,yes,no:this.take('else')?this.statement():null};}
      if(this.take('while')) {this.need('(');const test=this.expr();this.need(')');return {k:'while',test,body:this.statement()};}
      if(this.take('for')) {
        this.need('(');const init=this.peek()===';'?{k:'empty'}:this.simple();this.need(';');
        const test=this.peek()===';'?{k:'literal',value:true,type:'boolean'}:this.expr();this.need(';');
        const update=this.peek()===')'?null:this.expr();this.need(')');return {k:'for',init,test,update,body:this.statement()};
      }
      if(this.take('return')) {const value=this.peek()===';'?null:this.expr();this.need(';');return {k:'return',value};}
      const s=this.simple();this.need(';');return s;
    }
    simple() {
      if(types.has(this.peek())) {
        const type=this.type(),name=this.id();
        const value=this.take('=')?this.expr():null;
        return {k:'decl',type,name,value};
      }
      return {k:'expr',value:this.expr()};
    }
    expr(min=0) {
      if(++this.depth>150) throw new Unsupported('Zu tief verschachtelter Ausdruck.');
      let left=this.atom();
      while(true) {
        const op=this.peek();
        if(op==='instanceof'&&min<=6){this.i++;left={k:'instanceof',value:left,target:this.type()};continue;}
        if(op==='?'&&min<=2) {this.i++;const yes=this.expr();this.need(':');left={k:'ternary',test:left,yes,no:this.expr(2)};continue;}
        const p=precedence[op];if(p===undefined||p<min) break;
        this.i++;left={k:p===1?'assign':'binary',op,left,right:this.expr(p===1?p:p+1)};
      }
      this.depth--;return left;
    }
    atom() {
      let a;
      if(['!','-','+'].includes(this.peek())) {const op=this.ts[this.i++].v;return {k:'unary',op,value:this.expr(9)};}
      if(this.take('(')) {
        if(types.has(this.peek())&&this.peek(1)===')'){const target=this.type();this.need(')');a={k:'cast',target,value:this.expr(9)};}
        else {a=this.expr();this.need(')');}
      }
      else if(this.take('new')) {const type=this.type();this.need('(');a={k:'new',type,args:this.args()};}
      else {
        const t=this.ts[this.i++];
        if(t.kind==='number'||t.kind==='string') a={k:'literal',value:t.value,type:t.type||'String'};
        else if(['null','true','false'].includes(t.v)) a={k:'literal',value:t.v==='null'?null:t.v==='true',type:t.v==='null'?'null':'boolean'};
        else if(t.kind==='id') a={k:'var',name:t.v};
        else if(['<EOF>','}',')',';'].includes(t.v)) throw new Incomplete('Ein Ausdruck fehlt.');
        else throw new Unsupported('Nicht unterstützter Ausdruck: '+t.v);
      }
      while(true) {
        if(this.take('.')) {const name=this.id();if(this.take('(')) a={k:'call',object:a,name,args:this.args()};else a={k:'field',object:a,name};}
        else if(this.take('(')) {if(a.k!=='var') throw new Unsupported('Nicht unterstützter Methodenaufruf.');a={k:'call',object:null,name:a.name,args:this.args()};}
        else if(['++','--'].includes(this.peek())) {a={k:'postfix',op:this.ts[this.i++].v,value:a};}
        else break;
      }
      return a;
    }
    args() {const a=[];if(this.peek()!==')') {do {a.push(this.expr());}while(this.take(','));}this.need(')');return a;}
  }
  const api={
    Knoten:{getPaket:['Paket'],getNaechster:['Knoten'],setNaechster:['void','Knoten']},
    BaumKnoten:{getPaket:['Paket'],getNummer:['int'],getLinks:['BaumKnoten'],getRechts:['BaumKnoten'],setLinks:['void','BaumKnoten'],setRechts:['void','BaumKnoten'],setPaket:['void','Paket']},
    Paket:{getNummer:['int'],getPaketnummer:['String'],getGewicht:['double'],getZielort:['String'],setStatus:['void','String']},
    String:{equals:['boolean','String'],length:['int'],charAt:['char','int']},
    Math:{max:['numeric','numeric','numeric'],min:['numeric','numeric','numeric'],abs:['numeric','numeric']}
  };
  const numeric=t=>['int','double','char'].includes(t);
  const reference=t=>['String','Paket','Knoten','BaumKnoten','InnererKnoten','Blatt','PaketStapel','PaketWarteschlange'].includes(t);
  const compatible=(a,b)=>a===b||(a==='double'&&['int','char'].includes(b))||(a==='int'&&b==='char')||(reference(a)&&b==='null')||(a==='Knoten'&&['InnererKnoten','Blatt'].includes(b));
  const charConstant=e=>{const v=constant(e);return Number.isInteger(v)&&v>=0&&v<=65535;};
  function numericCast(value,target){if(target==='double')return Number(value);const n=Number.isNaN(value)?0:Math.max(-2147483648,Math.min(2147483647,Math.trunc(value)));return target==='char'?n&65535:n;}
  function requireType(a,b) {if(!compatible(a,b)) throw new FormatError('Typen passen nicht: erwartet '+a+', erhalten '+b+'.');}
  class Scope {
    constructor(parent=null) {this.parent=parent;this.values=new Map();}
    declare(n,v) {if(this.hasLocal(n)) throw new FormatError('Bezeichner doppelt deklariert: '+n);this.values.set(n,v);}
    hasLocal(n) {return this.values.has(n);}
    get(n) {if(this.values.has(n))return this.values.get(n);if(this.parent)return this.parent.get(n);throw new Unsupported('Bezeichner außerhalb des bekannten Aufgabenkontexts: '+n);}
    set(n,v) {if(this.values.has(n))this.values.set(n,v);else if(this.parent)this.parent.set(n,v);else throw new FormatError('Unbekannter Bezeichner: '+n);}
  }
  function validate(methods,spec) {
    const allowedTypes=new Set(spec.types||baseTypes);
    const known=t=>{if(!allowedTypes.has(t))throw new Unsupported('Typ außerhalb des Aufgabenkontexts: '+t);};
    const constructors=spec.constructors||{Knoten:['Paket'],BaumKnoten:['Paket']};
    const fields=new Scope();for(const [n,t] of Object.entries(spec.fields||{}))fields.declare(n,t);
    // Field access is only supported through this; arbitrary host properties are inaccessible.
    function expr(e,s) {
      let t;
      switch(e.k) {
        case 'literal':t=e.type;break;
        case 'var': t=e.name==='Math'?'Math':e.name==='this'?(spec.selfType||'this'):s.get(e.name);break;
        case 'field':if(e.object.k!=='var'||e.object.name!=='this')throw new Unsupported('Direkte Objektattribute werden nur über this ausgewertet.');t=fields.get(e.name);break;
        case 'new': {
          known(e.type);const signature=Object.hasOwn(constructors,e.type)?constructors[e.type]:null;
          if(!signature)throw new Unsupported('Konstruktor außerhalb des Aufgabenkontexts: '+e.type);
          if(e.args.length!==signature.length)throw new FormatError('Falsche Argumentzahl beim Konstruktor '+e.type+'.');signature.forEach((type,i)=>requireType(type,expr(e.args[i],s)));t=e.type;break;
        }
        case 'call': {
          const obj=e.object?expr(e.object,s):'this';
          const m=obj==='this'||obj===spec.selfType?methods[e.name]:null;
          const natives=spec.natives||{},members=spec.api?.[obj]||api[obj]||{};
          let sig=m?[m.result,...m.params.map(p=>p.type)]:obj==='this'?(Object.hasOwn(natives,e.name)?natives[e.name]:null):(Object.hasOwn(members,e.name)?members[e.name]:null);
          if(!sig)throw new Unsupported('Nicht unterstützte Methode: '+e.name);
          if(e.args.length!==sig.length-1)throw new FormatError('Falsche Argumentzahl bei '+e.name+'.');
          const args=e.args.map(a=>expr(a,s));
          if(obj==='String'&&e.name==='equals'&&!['String','null'].includes(args[0]))throw new Unsupported('equals(Object) mit anderen Typen wird nicht ausgewertet.');
          args.forEach((a,i)=>{if(sig[i+1]==='numeric'){if(!numeric(a))throw new FormatError('Zahl erwartet.');}else requireType(sig[i+1],a);});
          t=sig[0]==='numeric'?(args.includes('double')?'double':'int'):sig[0];break;
        }
        case 'unary':t=expr(e.value,s);if(e.op==='!')requireType('boolean',t);else {if(!numeric(t))throw new FormatError('Zahl erwartet.');if(t==='char')t='int';}break;
        case 'cast': {
          known(e.target);const from=expr(e.value,s);
          if(numeric(e.target)&&numeric(from)){t=e.target;break;}
          if(!reference(e.target)||!(reference(from)||from==='null'))throw new Unsupported('Nur Referenzcasts im bekannten Klassenmodell werden ausgewertet.');
          if(from!=='null'&&!compatible(e.target,from)&&!compatible(from,e.target))throw new FormatError('Unvereinbare Typen im Cast.');
          t=e.target;break;
        }
        case 'instanceof': {
          known(e.target);const from=expr(e.value,s);
          if(!reference(e.target)||!(reference(from)||from==='null'))throw new FormatError('instanceof benötigt Referenztypen.');
          if(from!=='null'&&!compatible(e.target,from)&&!compatible(from,e.target))throw new FormatError('Unvereinbare Typen bei instanceof.');t='boolean';break;
        }
        case 'binary': {
          const l=expr(e.left,s),r=expr(e.right,s);
          if(['&&','||'].includes(e.op)) {requireType('boolean',l);requireType('boolean',r);t='boolean';}
          else if(['==','!='].includes(e.op)) {if(['Math','this','void'].includes(l)||['Math','this','void'].includes(r)||l==='String'&&r==='String')throw new Unsupported('String-Referenzvergleiche und Typvergleiche benötigen einen echten Java-Compiler; für Textinhalte equals verwenden.');if(!(numeric(l)&&numeric(r))&&!compatible(l,r)&&!compatible(r,l))throw new FormatError('Nicht vergleichbare Typen.');t='boolean';}
          else {if(!numeric(l)||!numeric(r))throw new Unsupported('Nur numerische Arithmetik wird ausgewertet.');t=['<','>','<=','>='].includes(e.op)?'boolean':l==='double'||r==='double'?'double':'int';}
          break;
        }
        case 'assign': {
          if(!['var','field'].includes(e.left.k)||e.left.k==='var'&&['Math','this'].includes(e.left.name))throw new FormatError('Zuweisung benötigt eine Variable.');
          t=expr(e.left,s);const r=expr(e.right,s);if(e.op!=='='&&['int','char'].includes(t)&&r==='double')throw new Unsupported('Diese implizite narrowing-Konvertierung benötigt einen echten Compiler.');
          if(!(t==='char'&&r==='int'&&(e.op!=='='||charConstant(e.right))))requireType(t,r);
          if(e.op!=='='&&(!numeric(t)||!numeric(r)))throw new Unsupported('Diese Zuweisung wird nicht ausgewertet.');break;
        }
        case 'postfix':t=expr(e.value,s);if(!['var','field'].includes(e.value.k)||!numeric(t))throw new FormatError('Inkrement benötigt eine numerische Variable.');break;
        case 'ternary':requireType('boolean',expr(e.test,s)); {
          const a=expr(e.yes,s),b=expr(e.no,s);
          t=a==='char'&&b==='int'&&charConstant(e.no)||b==='char'&&a==='int'&&charConstant(e.yes)?'char':compatible(a,b)?a:compatible(b,a)?b:['InnererKnoten','Blatt'].includes(a)&&['InnererKnoten','Blatt'].includes(b)?'Knoten':null;
          if(!t)throw new Unsupported('Diese Typvereinigung im bedingten Ausdruck liegt außerhalb des bekannten Klassenmodells.');
        }break;
        default:throw new Unsupported('Unbekannter Ausdruck.');
      }
      e.type=t;return t;
    }
    function assignment(type,value,scope){const from=expr(value,scope);if(type==='char'&&from==='int'&&charConstant(value))return;requireType(type,from);}
    function stmt(n,s,result) {
      switch(n.k) {
        case 'block': {const local=new Scope(s);let returns=false;for(const a of n.body){if(returns)throw new FormatError('Nicht erreichbarer Code nach return.');returns=stmt(a,local,result);}return returns;}
        case 'empty':return false;
        case 'decl':known(n.type);if(n.type==='void')throw new FormatError('Variable kann nicht void sein.');if(n.name==='Math')throw new Unsupported('Das Verdecken von Typnamen wird nicht ausgewertet.');if(!n.value)throw new Unsupported('Lokale Variablen bitte mit Startwert deklarieren.');if(mentions(n.value,n.name))throw new Unsupported('Selbstreferenz im Initialisierungsausdruck benötigt einen echten Compiler.');for(let scope=s;scope&&scope!==fields;scope=scope.parent){if(scope.hasLocal(n.name))throw new FormatError('Lokale Variable oder Parameter doppelt deklariert.');}assignment(n.type,n.value,s);s.declare(n.name,n.type);return false;
        case 'expr':if(!['assign','call','postfix','new'].includes(n.value.k))throw new FormatError('Kein gültiges Java-Statement.');expr(n.value,s);return false;
        case 'return':if(!n.value)requireType(result,'void');else {if(result==='void')throw new FormatError('void darf keinen Wert zurückgeben.');assignment(result,n.value,s);}return true;
        case 'if':requireType('boolean',expr(n.test,s));if(n.yes.k==='decl'||n.no?.k==='decl')throw new FormatError('Lokale Deklarationen in Zweigen benötigen einen Block.'); {const a=stmt(n.yes,new Scope(s),result),b=n.no?stmt(n.no,new Scope(s),result):false;return a&&b;}
        case 'while':requireType('boolean',expr(n.test,s));if(n.body.k==='decl')throw new FormatError('Lokale Deklaration benötigt einen Schleifenblock.');if(constant(n.test)===false)throw new FormatError('Schleifenrumpf bei konstant false ist in Java nicht erreichbar.');stmt(n.body,new Scope(s),result);return constant(n.test)===true;
        case 'for': {const local=new Scope(s);stmt(n.init,local,result);requireType('boolean',expr(n.test,local));if(n.update)expr(n.update,local);if(n.body.k==='decl')throw new FormatError('Lokale Deklaration benötigt einen Schleifenblock.');if(constant(n.test)===false)throw new FormatError('Schleifenrumpf bei konstant false ist in Java nicht erreichbar.');stmt(n.body,new Scope(local),result);return constant(n.test)===true;}
        default:throw new Unsupported('Nicht unterstützte Anweisung.');
      }
    }
    for(const [name,type] of Object.entries(spec.fields||{})){known(type);if(name==='Math')throw new Unsupported('Das Verdecken von Typnamen wird nicht ausgewertet.');if(type==='void')throw new FormatError('Feld kann nicht void sein.');const init=spec.initializers?.[name];if(init)assignment(type,init,fields);}
    for(const m of [...Object.values(methods),...(spec.extraBodies||[])]) {
      known(m.result);const s=new Scope(fields);m.params.forEach(p=>{known(p.type);if(p.type==='void')throw new FormatError('Parameter kann nicht void sein.');if(p.name==='Math')throw new Unsupported('Das Verdecken von Typnamen wird nicht ausgewertet.');s.declare(p.name,p.type);});
      const returns=stmt(m.body,s,m.result);if(m.result!=='void'&&!returns)throw new Incomplete('Es fehlt eine Rückgabe für mindestens einen Kontrollpfad.');
    }
    for(const wanted of spec.methods) {
      const got=methods[wanted.name];if(!got)throw new Incomplete('Die Methode '+wanted.name+' fehlt.');
      if(got.result!==wanted.result||got.params.map(p=>p.type).join(',')!==wanted.params.map(p=>p.type).join(','))throw new FormatError('Die Signatur von '+wanted.name+' passt nicht zur Aufgabe.');
    }
  }
  function mentions(e,name){if(!e||typeof e!=='object')return false;if(e.k==='var'&&e.name===name)return true;return Object.values(e).some(v=>Array.isArray(v)?v.some(x=>mentions(x,name)):typeof v==='object'&&mentions(v,name));}
  function constant(e){
    if(e.k==='literal')return e.value;
    if(e.k==='unary'){const a=constant(e.value);if(a===undefined)return undefined;return e.op==='!'?!a:e.op==='-'?-a:+a;}
    if(e.k==='cast'&&numeric(e.target)){const v=constant(e.value);return v===undefined?undefined:numericCast(v,e.target);}
    if(e.k==='ternary'){const a=constant(e.test),b=constant(e.yes),c=constant(e.no);return a===undefined||b===undefined||c===undefined?undefined:a?b:c;}
    if(e.k==='binary'){
      const a=constant(e.left),b=constant(e.right);if(a===undefined||b===undefined)return undefined;
      const int=v=>e.type==='int'?v|0:v;
      switch(e.op){case '+':return int(a+b);case '-':return int(a-b);case '*':return e.type==='int'?Math.imul(a,b):a*b;case '/':return b===0?undefined:int(a/b);case '%':return b===0?undefined:a%b;case '<':return a<b;case '>':return a>b;case '<=':return a<=b;case '>=':return a>=b;case '==':return a===b;case '!=':return a!==b;case '&&':return a&&b;case '||':return a||b;}
    }
    return undefined;
  }
  function compile(source,spec) {
    let p=new Parser(source),methods;
    // A single method body is wrapped with the task's explicit signature.
    const declaration= ['public','private','protected'].includes(p.peek()) || (types.has(p.peek())&&p.ts[1]?.kind==='id'&&p.peek(2)==='(');
    if(!declaration&&spec.methods.length===1) {
      const m=spec.methods[0];const sig=m.result+' '+m.name+'('+m.params.map(p=>p.type+' '+p.name).join(', ')+')';
      p=new Parser(sig+' {\n'+source+'\n'+(spec.suffix||'')+'\n}');
    }
    methods=p.program();validate(methods,spec);return methods;
  }
  function createRuntime(methods,spec,initial={}) {
    const fields=new Scope();for(const [name,type] of Object.entries(spec.fields||{}))fields.declare(name,Object.hasOwn(initial,name)?initial[name]:numeric(type)?0:type==='boolean'?false:null);
    const self=spec.self||fields,state=spec.execution||{budget:30000,depth:0};
    const tick=()=>{if(--state.budget<0)throw new Limit('Die Schrittgrenze wurde erreicht (mögliche Endlosschleife).');};
    const coerce=(v,t)=>t==='int'?v|0:t==='char'?v&65535:v;
    function assign(e,s,v) {if(e.k==='var')s.set(e.name,v);else if(e.k==='field')fields.set(e.name,v);else throw new Error('Ungültige Zuweisung.');return v;}
    function ex(e,s) {
      tick();
      switch(e.k) {
        case 'literal':return e.value;
        case 'var':return e.name==='this'?self:e.name==='Math'?Math:s.get(e.name);
        case 'field':return fields.get(e.name);
        case 'new': {const args=e.args.map(a=>ex(a,s));return spec.construct?spec.construct(e.type,args,state):construct(e.type,args);}
        case 'instanceof':return isInstance(ex(e.value,s),e.target);
        case 'cast':{const value=ex(e.value,s);if(numeric(e.target))return numericCast(value,e.target);if(value!==null&&!isInstance(value,e.target))throw new Error('Ungültiger Cast auf '+e.target+'.');return value;}
        case 'call': {
          const obj=e.object?ex(e.object,s):self,args=e.args.map(a=>ex(a,s));
          if(obj===self) {if(methods[e.name])return call(e.name,args);return spec.nativeImpl[e.name](...args);}
          if(obj==null)throw new Error('Zugriff auf null bei '+e.name+'.');
          if(typeof obj==='string'&&e.name==='equals')return obj===args[0];
          if(typeof obj==='string'&&e.name==='length')return obj.length;
          if(typeof obj==='string'&&e.name==='charAt'){if(args[0]<0||args[0]>=obj.length)throw new Error('Zeichenindex außerhalb der Zeichenkette.');return obj.charCodeAt(args[0]);}
          if(obj===Math) return coerce(Math[e.name](...args),e.type);
          const member=obj[e.name];if(typeof member!=='function')throw new Error('Methode nicht verfügbar: '+e.name);return member.apply(obj,args);
        }
        case 'unary': {const v=ex(e.value,s);return e.op==='!'?!v:coerce(e.op==='-'?-v:+v,e.type);}
        case 'binary': {
          const l=ex(e.left,s);if(e.op==='&&')return l&&ex(e.right,s);if(e.op==='||')return l||ex(e.right,s);const r=ex(e.right,s);
          switch(e.op) {
            case '==':return l===r;case '!=':return l!==r;case '<':return l<r;case '>':return l>r;case '<=':return l<=r;case '>=':return l>=r;
            case '+':return coerce(l+r,e.type);case '-':return coerce(l-r,e.type);case '*':return e.type==='int'?Math.imul(l,r):l*r;
            case '/':if(r===0&&e.type==='int')throw new Error('Ganzzahlige Division durch null.');return coerce(l/r,e.type);case '%':if(r===0&&e.type==='int')throw new Error('Rest durch null.');return l%r;
          } break;
        }
        case 'assign': {const l=e.op==='='?null:ex(e.left,s),r=ex(e.right,s);let v=r;if(e.op!=='='){if(e.op==='/='&&r===0&&['int','char'].includes(e.type))throw new Error('Ganzzahlige Division durch null.');v=e.op==='+='?l+r:e.op==='-='?l-r:e.op==='*='?(e.type==='int'?Math.imul(l,r):l*r):e.type==='double'?l/r:Math.trunc(l/r);}return assign(e.left,s,coerce(v,e.type));}
        case 'postfix': {const v=ex(e.value,s);assign(e.value,s,coerce(v+(e.op==='++'?1:-1),e.type));return v;}
        case 'ternary':return ex(e.test,s)?ex(e.yes,s):ex(e.no,s);
      }
      throw new Error('Unbekannter Ausdruck.');
    }
    function st(n,s) {
      tick();
      switch(n.k) {
        case 'block': {const local=new Scope(s);for(const a of n.body){const r=st(a,local);if(r)return r;}break;}
        case 'empty':break;
        case 'decl':s.declare(n.name,ex(n.value,s));break;
        case 'expr':ex(n.value,s);break;
        case 'return':return {value:n.value?ex(n.value,s):undefined};
        case 'if':return ex(n.test,s)?st(n.yes,new Scope(s)):n.no?st(n.no,new Scope(s)):null;
        case 'while':while(ex(n.test,s)){const r=st(n.body,new Scope(s));if(r)return r;}break;
        case 'for': {const local=new Scope(s);st(n.init,local);while(ex(n.test,local)){const r=st(n.body,new Scope(local));if(r)return r;if(n.update)ex(n.update,local);}break;}
      }
      return null;
    }
    function call(name,args) {
      return execute(methods[name],args);
    }
    function execute(m,args){
      tick();if(++state.depth>150)throw new Limit('Die Rekursionsgrenze wurde erreicht.');
      const s=new Scope(fields);m.params.forEach((p,i)=>s.declare(p.name,args[i]));
      try{return st(m.body,s)?.value;}finally{state.depth--;}
    }
    for(const [name,value] of Object.entries(spec.initializers||{}))fields.set(name,ex(value,fields));
    return {call,execute,get:n=>fields.get(n),set:(n,v)=>fields.set(n,v)};
  }
  function packet(num,weight=1,target='Bonn') {return tag({num,weight,target,status:'offen',getNummer(){return this.num;},getPaketnummer(){return 'P'+this.num;},getGewicht(){return this.weight;},getZielort(){return this.target;},setStatus(s){this.status=s;}},'Paket');}
  function node(type,p) {
    const o={type,p,next:null,left:null,right:null,getPaket(){return this.p;},getNaechster(){return this.next;},setNaechster(n){this.next=n;},getNummer(){return this.p.num;},getLinks(){return this.left;},getRechts(){return this.right;},setLinks(n){this.left=n;},setRechts(n){this.right=n;},setPaket(p){this.p=p;}};
    return tag(o,type);
  }
  function isInstance(value,target){if(value==null)return false;const type=typeof value==='string'?'String':objectTypes.get(value)||value.type;return type===target||target==='Knoten'&&['InnererKnoten','Blatt'].includes(type);}
  function trieInner(){const children=Array(10).fill(null);const index=i=>{if(!Number.isInteger(i)||i<0||i>9)throw new Error('Trie-Index muss zwischen 0 und 9 liegen.');};return {type:'InnererKnoten',children,getKind(i){index(i);return children[i];},setKind(i,k){index(i);children[i]=k;}};}
  function trieLeaf(key){return {type:'Blatt',key,getPaketnummer(){return key;}};}
  function construct(type,args){if(type==='InnererKnoten')return trieInner();if(type==='Blatt')return trieLeaf(args[0]);return node(type,args[0]);}
  root.JavaSubset={compile,createRuntime,tokenize,packet,node,trieInner,trieLeaf,construct,isInstance,tag,Parser,validate,baseTypes,compatible,Unsupported,FormatError,Incomplete,Limit};
})(typeof globalThis!=='undefined'?globalThis:this);
