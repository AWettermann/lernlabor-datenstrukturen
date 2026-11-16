/* Class grammar and isolated instances for the four class exercises.
 * Uses the same lexer, AST checker, interpreter and execution limits as method tasks. */
(function(root){
  'use strict';
  const J=root.JavaSubset;
  function compile(source,contract){
    const p=new J.Parser(source);
    const visibility=()=>['public','private','protected'].includes(p.peek())?p.ts[p.i++].v:'package';
    const classAccess=visibility();if(['private','protected'].includes(classAccess))throw new J.FormatError('Eine alleinstehende Klasse darf nicht private oder protected sein.');p.need('class');const name=p.id();
    if(name!==contract.className)throw new J.FormatError('Erwartet wird die Klasse '+contract.className+'.');
    p.need('{');const methods=Object.create(null),fields=Object.create(null),initializers=Object.create(null);let ctor=null;
    function parameters(){const params=[];p.need('(');if(p.peek()!==')'){do{params.push({type:p.type(),name:p.id()});}while(p.take(','));}p.need(')');return params;}
    function initializerSupported(e){return e.k==='literal'||['unary','cast'].includes(e.k)&&initializerSupported(e.value)||e.k==='binary'&&initializerSupported(e.left)&&initializerSupported(e.right)||e.k==='new'&&e.args.every(initializerSupported);}
    while(p.peek()!=='}'){
      if(p.peek()==='<EOF>')throw new J.Incomplete('Die Klasse ist noch nicht abgeschlossen.');
      const access=visibility();
      if(p.peek()===name&&p.peek(1)==='('){
        if(ctor)throw new J.Unsupported('Überladene Konstruktoren werden nicht ausgewertet.');
        p.i++;const params=parameters();ctor={name,result:'void',params,access,body:p.block()};continue;
      }
      const type=p.type(),member=p.id();
      if(p.peek()==='('){
        if(Object.hasOwn(methods,member))throw new J.Unsupported('Überladene Methoden werden nicht ausgewertet.');
        const params=parameters();methods[member]={name:member,result:type,params,access,body:p.block()};
      }else{
        let field=member;
        do{
          if(Object.hasOwn(fields,field))throw new J.FormatError('Feld doppelt deklariert: '+field);
          fields[field]=type;
          if(p.take('=')){const value=p.expr();if(!initializerSupported(value))throw new J.Unsupported('Dieser Feldinitialisierer benötigt einen echten Java-Compiler.');initializers[field]=value;}
          if(p.peek()!==',')break;p.i++;field=p.id();
        }while(true);
        p.need(';');
      }
    }
    p.need('}');p.need('<EOF>');
    if(!ctor){if(contract.constructorParams.length)throw new J.Incomplete('Der Konstruktor mit Paketparameter fehlt.');ctor={name,result:'void',params:[],access:'public',body:{k:'block',body:[]}};}
    if(ctor.access!=='public')throw new J.FormatError('Der Konstruktor muss wie in der Vorlage öffentlich (public) sein.');
    if(ctor.params.map(p=>p.type).join(',')!==contract.constructorParams.join(','))throw new J.FormatError('Die Konstruktorparameter passen nicht zur Aufgabe.');
    const ownApi=Object.fromEntries(Object.values(methods).map(m=>[m.name,[m.result,...m.params.map(p=>p.type)]]));
    const spec={...contract,fields,initializers,selfType:name,types:[...J.baseTypes,name],constructors:{Knoten:['Paket'],BaumKnoten:['Paket'],[name]:contract.constructorParams},api:{[name]:ownApi},extraBodies:[ctor]};
    for(const required of contract.methods){if(methods[required.name]&&methods[required.name].access!=='public')throw new J.FormatError('Die Schnittstellenmethode '+required.name+' muss public sein.');}
    J.validate(methods,spec);
    return {name,methods,spec,ctor};
  }
  function createFactory(definition){
    const execution={budget:60000,depth:0,constructDepth:0},instances=new WeakMap();
    function construct(type,args){
      if(type!==definition.name)return J.construct(type,args);
      if(--execution.budget<0||++execution.constructDepth>100)throw new J.Limit('Die Grenze für Objekterzeugung wurde erreicht.');
      try{
        const self=J.tag(Object.create(null),type);
        const runtime=J.createRuntime(definition.methods,{...definition.spec,self,execution,construct},{});
        instances.set(self,runtime);
        for(const name of Object.keys(definition.methods))self[name]=(...a)=>runtime.call(name,a);
        runtime.execute(definition.ctor,args);
        return self;
      }finally{execution.constructDepth--;}
    }
    return {
      create:(...args)=>construct(definition.name,args),
      get:(object,name)=>instances.get(object).get(name),
      set:(object,name,value)=>instances.get(object).set(name,value),
      fields:definition.spec.fields,
      contains(object,target){
        const seen=new Set();function visit(value){if(value===target)return true;if(value==null||typeof value!=='object'||seen.has(value))return false;if(seen.size>200)throw new J.Limit('Zu viele verknüpfte Objekte.');seen.add(value);if(instances.has(value))return Object.keys(definition.spec.fields).some(n=>visit(instances.get(value).get(n)));return ['Knoten','BaumKnoten'].includes(value.type)&&[value.p,value.next,value.left,value.right].some(visit);}
        return visit(object);
      }
    };
  }
  root.JavaClasses={compile,createFactory};
})(globalThis);
