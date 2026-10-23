import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
import {ELIX_VOLUMES, ELIX_CHAPTERS, ELIX_QUESTIONS} from "../elix-content.js";
import {createElixStudio} from "../elix-studio.js";
import {createReceptorAtlas} from "../receptors.js";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=name=>readFileSync(path.join(root,name),"utf8");
const unique=values=>new Set(values).size===values.length;

assert.equal(ELIX_VOLUMES.length,18,"L'indice di avvio deve contenere 18 volumi");
assert.ok(ELIX_CHAPTERS.length>=10);
assert.ok(ELIX_QUESTIONS.length>=40);
assert.ok(unique(ELIX_CHAPTERS.map(x=>x.id)),"ID dei capitoli duplicati");
assert.ok(unique(ELIX_QUESTIONS.map(x=>x.id)),"ID delle domande duplicati");
const volumes=new Set(ELIX_VOLUMES.map(x=>x.id));
for(const c of ELIX_CHAPTERS){
  assert.ok(c.id&&c.title&&c.lead&&volumes.has(c.volume));
  assert.ok(Array.isArray(c.sections)&&c.sections.length>=2);
  for(const section of c.sections)assert.ok(section.title&&section.text.length>100);
}
const kinds=new Set(["teoria","clinico","statistica"]);
for(const q of ELIX_QUESTIONS){
  assert.ok(kinds.has(q.kind));
  assert.ok(q.id&&q.question&&q.group&&q.why);
  assert.equal(q.answers.length,4);
  assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<4);
  assert.ok(Number.isInteger(q.difficulty)&&q.difficulty>=1&&q.difficulty<=5);
}

const callbacks={};
globalThis.document={
  addEventListener(name,fn){(callbacks[name]??=[]).push(fn);},
  getElementById(){return null;},
  querySelector(){return null;}
};
globalThis.window={addEventListener(){}};
globalThis.location={hash:"#/quiz"};
const local=new Map();
globalThis.localStorage={
 getItem(key){return local.get(key)??null;},
 setItem(key,value){local.set(key,value);}
};
let refreshes=0;
const studio=createElixStudio({refresh(){refreshes++;}});
const click=(act,details={})=>{
 const control={dataset:{elix:act,...details}};
 for(const cb of callbacks.click??[])cb({target:{closest:selector=>selector==="[data-elix]"?control:null},preventDefault(){}});
};
const change=(id,value)=>{
 for(const cb of callbacks.change??[])cb({target:{id,value}});
};
const input=(id,value)=>{
 for(const cb of callbacks.input??[])cb({target:{id,value}});
};
for(const route of ["textbook","cinema","dose","evidence","quiz"]){
  location.hash="#/"+route;
  const html=studio.route(route);
  assert.ok(html&&html.includes("ex-page-head"),"Route vuota: "+route);
}
assert.match(studio.route("evidence"),/25/,"NNT 25 dell'esempio iniziale");
change("ex-control","6");
change("ex-treated","10");
assert.match(studio.route("evidence"),/NNH/);
assert.match(studio.route("evidence"),/25/,"NNH 25 con rischi invertiti");

location.hash="#/dose";
input("ex-dose","100");
assert.match(studio.route("dose"),/100\/100/);
location.hash="#/textbook/gpcr";
assert.match(studio.route("textbook","gpcr"),/Accoppiamento|GPCR/);
location.hash="#/cinema";
click("cinema-next");
assert.match(studio.route("cinema"),/Passaggio 2/);
click("cinema-reset");
assert.match(studio.route("cinema"),/Passaggio 1/);

location.hash="#/quiz";
click("quiz-start");
assert.match(studio.route("quiz"),/ex-options/);
click("quiz-answer",{index:"0"});
assert.match(studio.route("quiz"),/ex-feedback/);
click("quiz-next");
assert.match(studio.route("quiz"),/ex-options/);
assert.ok(refreshes>=4,"La navigazione interattiva deve aggiornare la vista");
assert.ok(local.has("elix-academy-progress"),"Progresso academy non salvato");

for(const name of ["index.html","manifest.webmanifest","elix-content.js","elix-studio.js","elix-studio.css","assets/elix-pill-original.svg","assets/elix-pill-192.png","receptors.js","elix-focus.css"]){
 assert.ok(existsSync(path.join(root,name)),"Asset mancante: "+name);
}
assert.match(read("index.html"),/eli — Farmacologia & Principi Attivi/);
assert.match(read("app.js"),/createElixStudio/);
assert.match(read("sw.js"),/elix-pill-192\.png/);
const manifest=JSON.parse(read("manifest.webmanifest"));
assert.equal(manifest.short_name,"eli");
console.log("eli: PASS · 18 volumi · "+ELIX_CHAPTERS.length+" capitoli · "+ELIX_QUESTIONS.length+" quiz · 5 route + interazioni + asset");

const rxAtlas=createReceptorAtlas({
  drugs:[{id:"salbutamolo",name:"Salbutamolo",subgroup:"Agonista β₂",targets:["ADRB2"]}],
  refresh(){refreshes++;}
});
const indexRX=rxAtlas.route("receptors");
assert.match(indexRX,/Recettori/);
for(const pdb of ["7BZ2","7BU6","7F6G","7EJ8","8THL"])assert.match(indexRX,new RegExp(pdb));
const adr=rxAtlas.route("receptors","ADRB2");
assert.match(adr,/#\/cinema\/ADRB2/);
assert.match(adr,/#\/drug\/salbutamolo/);
const rxControl={dataset:{rx:"viewer",id:"ADRB2"}};
for(const cb of callbacks.click??[])cb({target:{closest:selector=>selector==="[data-rx]"?rxControl:null},preventDefault(){}});
assert.match(rxAtlas.route("receptors","ADRB2"),/molstar\.org\/viewer\/\?pdb=7BZ2/);
location.hash="#/cinema/AGTR1";
assert.match(studio.route("cinema","AGTR1"),/7F6G/);
click("cinema-mode",{mode:"3d"});
assert.match(studio.route("cinema","AGTR1"),/molstar\.org\/viewer\/\?pdb=7F6G/);
const appSource=read("app.js");
const navLine=appSource.split("\n").find(x=>x.startsWith("const nav="));
assert.ok(navLine,"Main navigation not found");
assert.equal((navLine.match(/\['(?:home|atlas|receptors|cinema|news|textbook|quiz)'/g)||[]).length,7);
assert.ok(navLine.includes("cinema"),"Cinema must be directly reachable");
assert.ok(navLine.includes("news"),"News must be directly reachable");
assert.ok(!navLine.includes("'dose'"),"Dose Explorer must be contextual to drug pages");
assert.ok(!navLine.includes("'evidence'"),"Evidence Lab must be contextual to drug pages");
assert.match(read("evidence-atlas.js"),/drugSummary\(m,d,l\)/);
assert.match(read("evidence-atlas.js"),/drugPosology\(m,d,l\)/);
assert.match(read("evidence-atlas.js"),/drugEvidence\(m,relatedNews\)/);
console.log("eli 0.6: PASS · 7 primary tabs, sourced drug data, 5 receptor structures and contextual Cinema");
