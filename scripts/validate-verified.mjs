import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const read = path => JSON.parse(fs.readFileSync(new URL('../'+path,import.meta.url),'utf8'));
const index=read('data/verified/index.json'), report=read('data/verified/report.json');
const catalog=read('data/catalog.json');
const molecules=new Map(catalog.molecules.map(m=>[m.id,m]));
assert.equal(index.schemaVersion,1);
assert.ok(index.counts.activityRecords>=500,'Missing real experimental data');
assert.ok(index.counts.productLabels>=35,'Missing product documents');
assert.ok(index.counts.aifaLinkedPackages>=100,'AIFA price import incomplete: inspect source schema');
let activityCount=0,labelCount=0,packageCount=0,bindingCount=0;
const activityIds=new Set(),packageIds=new Set();
for(const [mid,sections] of Object.entries(index.molecules)){
 assert.ok(molecules.has(mid),'Unmapped identity '+mid);
 if(sections.activity){
  const data=read('data/verified/'+sections.activity.file);
  assert.equal(data.molecule,mid);
  assert.equal(sections.activity.count,data.records.length);
  assert.equal(data.database.license,'CC BY-SA 3.0');
  assert.match(data.scope.request.sha256,/^[a-f0-9]{64}$/);
  for(const row of data.records){
   assert.equal(row.molecule,mid,'Do not assign an assay to another salt/identity');
   assert.ok(!activityIds.has(row.id),'Duplicate activity');activityIds.add(row.id);
   assert.ok(['Ki','Kd','IC50','EC50'].includes(row.type));
   assert.ok(['Ki','Kd','IC50','EC50'].includes(row.publishedType));
   assert.ok(['=','<','>','<=','>='].includes(row.relation));
   assert.ok(Number(row.value)>0&&Number.isFinite(Number(row.value)));
   assert.equal(row.units,'nM');
   assert.ok([7,9].includes(row.assayConfidence));
   assert.ok(['SINGLE PROTEIN','PROTEIN COMPLEX'].includes(row.targetType));
   assert.equal(row.targetOrganism,'Homo sapiens');
   assert.ok([null,'','Manually validated'].includes(row.validity));
   assert.ok(row.assayDescription&&row.assay&&row.document&&row.source);
   if(['Ki','Kd'].includes(row.type)){bindingCount++;assert.equal(row.assayType,'B');}
   activityCount++;
  }
 }
 if(sections.label){
  const data=read('data/verified/'+sections.label.file);
  assert.equal(data.moleculeFamily,mid);assert.equal(data.language,'en');assert.equal(data.jurisdiction,'US');
  assert.equal(data.setId,sections.label.setId);
  assert.ok(data.product.applications.some(a=>/^(NDA|ANDA|BLA)\d/.test(a)));
  assert.ok(Object.keys(data.sections).length>0);
  assert.match(data.request.sha256,/^[a-f0-9]{64}$/);
  assert.ok(data.source.includes(data.setId));
  const pk=(data.sections.pharmacokinetics||data.sections.clinical_pharmacology||[]).join(' ');
  for(const sentences of Object.values(data.pkSourceSentences))for(const sentence of sentences)assert.ok(pk.includes(sentence),'PK sentence not found verbatim in source');
  assert.ok(data.effectiveDate<=index.retrieved.slice(0,10).replaceAll('-',''));
  labelCount++;
 }
 if(sections.market){
  const data=read('data/verified/'+sections.market.file);
  assert.equal(data.parent,mid);assert.equal(data.packages.length,sections.market.packages);
  assert.ok(data.source.url.startsWith('https://www.aifa.gov.it/'));
  assert.match(data.source.sha256,/^[a-f0-9]{64}$/);
  for(const row of data.packages){
   assert.match(row.aic,/^\d{9}$/);assert.ok(!packageIds.has(row.aic),'Package assigned to different substance families');packageIds.add(row.aic);
   for(const key of ['publicPriceEUR','referencePriceEUR','differenceEUR'])assert.ok(row[key]===null||(Number.isFinite(row[key])&&row[key]>=0));
   assert.ok(Object.values(row.sourceFields).some(v=>String(v).replace(/\D/g,'').padStart(9,'0')===row.aic),'AIC not in source row');
   assert.ok(row.ingredient&&row.name&&row.match);
   packageCount++;
  }
 }
}
assert.equal(activityCount,index.counts.activityRecords);assert.equal(bindingCount,index.counts.bindingRecords);
assert.equal(labelCount,index.counts.productLabels);assert.equal(packageCount,index.counts.aifaLinkedPackages);
assert.deepEqual(report.counts,index.counts);
const savedFetch=globalThis.fetch;
globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))});
globalThis.location={hash:'#/molecule/test'};
globalThis.document={addEventListener(){}};
const mod=await import('../elix-verified.js');
await mod.loadVerifiedIndex(()=>{});
assert.ok(mod.verifiedOverview().includes(String(index.counts.productLabels)));
const candidate=Object.keys(index.molecules).find(id=>index.molecules[id].activity&&index.molecules[id].label&&index.molecules[id].market);
assert.ok(candidate,'No cross-source molecule is available');
const drug=molecules.get(candidate);
assert.ok(mod.hasVerifiedData(drug,'activity')&&mod.hasVerifiedData(drug,'label')&&mod.hasVerifiedData(drug,'market'));
let html=mod.renderVerifiedData(drug);
assert.match(html,/Misure, documenti e confezioni/);
await new Promise(resolve=>setTimeout(resolve,50));
html=mod.renderVerifiedData(drug);
assert.match(html,/Prezzi reali per confezione/);assert.match(html,/Record di misura/);assert.match(html,/DailyMed/);
assert.doesNotMatch(html,/<script/i,'Source content must remain escaped');
const unknown={id:'NOT_IMPORTED',parent:'NOT_IMPORTED'};
assert.equal(mod.verifiedPublicPrice(unknown),null);assert.equal(mod.hasVerifiedData(unknown),false);
const salt=catalog.molecules.find(m=>m.parent===candidate&&m.id!==candidate&&!index.molecules[m.id]?.activity);
if(salt)assert.equal(mod.verifiedRecord(salt).activity,undefined,'No automatic propagation of binding values across salts');
globalThis.fetch=savedFetch;
console.log('VERIFIED_DATA_PASS',JSON.stringify({activityCount,bindingCount,labelCount,packageCount,candidate}));
