import assert from "node:assert/strict";
import fs from "node:fs";
import {fileURLToPath} from "node:url";
import {ELIX_VOLUMES,ELIX_CHAPTERS,ELIX_QUESTIONS} from "../elix-content.js";
import {DEEP_DRUGS} from "../elix-deep-drugs.js";
import {VERIFIED_TRIALS,trialsForDrug,trialMetrics} from "../elix-research.js";
import {renderDeepDrug,renderTrialEvidence,firstTrialMetric} from "../elix-rich-reader.js";
import {ADDITIONAL_TARGETS} from "../elix-targets.js";
import {EXTRA_CASES} from "../elix-extra-cases.js";
import {createReceptorAtlas} from "../receptors.js";

const read=rel=>fs.readFileSync(fileURLToPath(new URL("../"+rel,import.meta.url)),"utf8");
const editorial=JSON.parse(read("data/editorial.json"));
assert.equal(ELIX_VOLUMES.length,18);
assert.equal(ELIX_CHAPTERS.length,54);
assert.equal(ELIX_QUESTIONS.length,131);
assert.equal(Object.keys(DEEP_DRUGS).length,37);
assert.equal(VERIFIED_TRIALS.length,7);
assert.equal(Object.keys(ADDITIONAL_TARGETS).length,19);
assert.equal(EXTRA_CASES.length,7);
const ids=arr=>new Set(arr).size===arr.length;
assert.ok(ids(ELIX_CHAPTERS.map(x=>x.id)),"Duplicated chapter ID");
assert.ok(ids(ELIX_QUESTIONS.map(x=>x.id)),"Duplicated quiz ID");
const volumeIds=new Set(ELIX_CHAPTERS.map(x=>x.volume));
for(const v of ELIX_VOLUMES)assert.ok(volumeIds.has(v.id),"Missing content in volume "+v.id);
for(const c of ELIX_CHAPTERS) {
 assert.ok(c.sections.length>=3,"Short chapter: "+c.id);
 for(const section of c.sections)assert.ok(section.text.length>=150,"Insufficient scientific explanation: "+c.id+"/"+section.title);
}
for(const q of ELIX_QUESTIONS) {
 assert.equal(q.answers.length,4);
 assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<q.answers.length);
 assert.ok(q.why.length>=35);
}
const curatedIds=new Set(editorial.drugs.map(x=>x.id));
assert.equal(curatedIds.size,37);
for(const id of curatedIds){
 const entry=DEEP_DRUGS[id];
 assert.ok(entry,"Missing drug-specific pharmacology "+id);
 for(const p of ["mechanism","risks","pk","application"])assert.ok(entry[p].length>110,id+" incomplete "+p);
 assert.ok(entry.chain.length>=2);
}
for(const t of VERIFIED_TRIALS){
 assert.ok(t.doi.startsWith("10."));
 assert.ok(t.source.startsWith("https://"));
 assert.ok(t.n>100);
 assert.ok(t.population.length>50&&t.endpoint.length>20&&t.limitations.length>50);
 assert.ok(t.results.length>=1);
 for(const id of t.drugIds)assert.ok(curatedIds.has(id),"Unmapped trial medicine: "+id);
 for(const o of t.results){
  const m=trialMetrics(o);
  assert.ok(m,"Invalid outcome in "+t.id);
  if(o.riskFormat==="annualized")assert.equal(m.nnt,null,"NNT improperly estimated from annual rates");
 }
}
assert.equal(firstTrialMetric("dapagliflozin").value,"NNT ≈ 21");
assert.equal(trialMetrics(VERIFIED_TRIALS.find(t=>t.id==="dapa-ckd-2020").results[0]).nnt,19);
const ascend=VERIFIED_TRIALS.find(t=>t.id==="ascend-2018");
assert.equal(trialMetrics(ascend.results[0]).nnt,91);
assert.equal(trialMetrics(ascend.results[1]).nnh,112);
const aristotle=VERIFIED_TRIALS.find(t=>t.id==="aristotle-2011");
assert.ok(aristotle.results.every(o=>trialMetrics(o).nnt===null));
assert.match(renderTrialEvidence("ramipril"),/HOPE/);
assert.match(renderTrialEvidence("apixaban"),/annualizzati/);
assert.match(renderDeepDrug(editorial.drugs.find(d=>d.id==="digossina")),/Ca²⁺/);
assert.equal(renderDeepDrug({id:"unknown"}),"");
for(const item of EXTRA_CASES){
 assert.ok(item.id&&item.history.length>120);
 assert.equal(item.options.filter(o=>o.correct).length,1);
 assert.ok(ADDITIONAL_TARGETS[item.target],"Case target lacks explanatory page: "+item.target);
 for(const option of item.options)assert.ok(curatedIds.has(option.id),"Case links unknown drug "+option.id);
}
for(const [id,item] of Object.entries(ADDITIONAL_TARGETS)){
 assert.equal(item.id,id);
 assert.ok(item.signal.length>=4&&item.mechanism.length>140&&item.insight.length>80);
 assert.ok(ELIX_CHAPTERS.some(c=>c.id===item.chapter),"Missing learning chapter for target "+id);
}
const hooks={};
globalThis.document={addEventListener(n,fn){(hooks[n]??=[]).push(fn);},getElementById(){return null}};
const receptors=createReceptorAtlas({drugs:[{id:"ramipril",name:"Ramipril",subgroup:"ACE-inibitore",targets:["ACE"]}],refresh(){}});
const index=receptors.route("receptors");
assert.match(index,/PDB 7BZ2/);
assert.match(index,/CaV1.2/);
assert.equal(receptors.all.length,24);
const ace=receptors.route("receptors","ACE");
assert.match(ace,/angiotensina/);
assert.match(ace,/#\/drug\/ramipril/);
assert.match(ace,/Modello atomico non ancora associato/);
assert.doesNotMatch(ace,/iframe/);
const src=read("evidence-atlas.js");
for(const text of ["renderDeepDrug(d)","renderTrialEvidence(info(m)?.id)","firstTrialMetric(d?.id)"])assert.ok(src.includes(text),"Reader not wired: "+text);
for(const asset of ["elix-deep.css","elix-expanded-chapters.js","elix-expanded-questions.js","elix-deep-drugs.js","elix-targets.js","elix-research.js","elix-rich-reader.js","elix-extra-cases.js"]){
 assert.ok(read("sw.js").includes("./"+asset),"Uncached app module "+asset);
}
assert.match(read("index.html"),/elix-deep\.css/);
const nav=read("app.js").split("\n").find(x=>x.startsWith("const nav="));
assert.equal((nav.match(/\['(?:home|atlas|receptors|cinema|news|textbook|quiz)'/g)||[]).length,7,"Seven visible primary tabs");
console.log("eli 0.7 scientific regression PASS: 54 chapters, 131 quiz, 37 deep drugs, 7 trials, 12 cases, 24 target profiles.");
