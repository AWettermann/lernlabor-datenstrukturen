/* Storage can be unavailable (private mode, file URLs, quota). Keep the lab usable. */
(function(root){
  'use strict';
  let warned=false;
  const memory=new Map();
  root.LabStorage={
    get(key,fallback=null){if(memory.has(key))return memory.get(key)??fallback;try{return root.localStorage.getItem(key)??fallback;}catch{warned=true;return fallback;}},
    set(key,value){memory.set(key,value);try{root.localStorage.setItem(key,value);}catch{warned=true;}},
    remove(key){memory.set(key,null);try{root.localStorage.removeItem(key);}catch{warned=true;}},
    json(key,fallback){try{const v=JSON.parse(this.get(key,'null'));return v&&typeof v==='object'&&!Array.isArray(v)?v:fallback;}catch{return fallback;}},
    get temporary(){return warned;}
  };
})(globalThis);
