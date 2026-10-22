import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {BATCH_DRUGS,BATCH_PROFILES,BATCH_SOURCES,appendContentBatches,renderBatchPharmacology} from '../elix-content-batches.js';
import {PK_FIELDS,reviewedProfiles,renderReviewedPK} from '../elix-pk-reviewed.js';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json'),catalog=read('data/catalog.json');
const before=structuredClone({editorial,pk});
const molecules=new Map(catalog.molecules.map(m=>[m.id,m]));
const expectedNames={CHEMBL1059:'PREGABALIN',CHEMBL940:'GABAPENTIN',CHEMBL1175:'DULOXETINE',CHEMBL809:'SERTRALINE'};
assert.equal(BATCH_DRUGS.length,4);assert.equal(BATCH_PROFILES.length,4);assert.equal(BATCH_SOURCES.length,8);
appendContentBatches(editorial,pk);
assert.deepEqual(editorial.drugs.slice(0,before.editorial.drugs.length),before.editorial.drugs);
assert.deepEqual(pk.profiles.slice(0,before.pk.profiles.length),before.pk.profiles);
assert.deepEqual(pk.sources.slice(0,before.pk.sources.length),before.pk.sources);
assert.equal(editorial.drugs.length,41);assert.equal(pk.profiles.length,11);
const snapshot=JSON.stringify({editorial,pk});
assert.throws(()=>appendContentBatches(editorial,pk),/duplicata/);
assert.equal(JSON.stringify({editorial,pk}),snapshot,'Collision must not partially mutate data');
const sources=new Map(pk.sources.map(s=>[s.id,s]));
assert.equal(sources.size,pk.sources.length);
assert.equal(new Set(editorial.drugs.map(d=>d.id)).size,editorial.drugs.length);
assert.equal(new Set(editorial.drugs.map(d=>d.chembl)).size,editorial.drugs.length);
for(const d of BATCH_DRUGS){
 assert.equal(molecules.get(d.chembl)?.name,expectedNames[d.chembl]);
 assert.ok(!before.editorial.drugs.some(old=>old.chembl===d.chembl),'This batch must add genuinely missing editorial content');
 for(const k of ['mechanism','clinical','critical','review'])assert.ok(d[k].trim());
 assert.equal(d.references.length,2);for(const r of d.references)assert.ok(sources.has(r.id));
 assert.match(renderBatchPharmacology(d),/Fonti della sintesi/);
}
for(const s of BATCH_SOURCES){
 const u=new URL(s.url);assert.equal(u.protocol,'https:');
 assert.ok(['labeling.pfizer.com','dailymed.nlm.nih.gov','www.medicines.org.uk','www.ema.europa.eu'].includes(u.hostname));
 assert.ok(s.section&&s.sourceVersion&&s.jurisdiction&&s.checkedAt);
 if(s.effectiveDate)assert.match(s.effectiveDate,/^\d{4}-\d{2}-\d{2}$/);
}
let fields=0;
for(const p of BATCH_PROFILES){
 assert.equal(p.applicableMoleculeIds.length,1);
 assert.equal(p.reviewStatus,'source-checked');
 for(const [key] of PK_FIELDS){const m=p.metrics[key];assert.ok(m.summary&&m.substance&&m.measurementType);assert.equal(m.sourceIds.length,1);assert.ok(sources.has(m.sourceIds[0]));for(const v of m.values){assert.ok(v.unit);if(v.value!==undefined)assert.ok(Number.isFinite(v.value));if(v.range)assert.ok(v.range.length===2&&v.range[0]<=v.range[1]);}fields++;}
 const html=renderReviewedPK(p,pk);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);assert.doesNotMatch(html,/undefined|NaN|\[object Object\]/);
 assert.equal(reviewedProfiles({id:'UNREVIEWED-SALT',parent:p.applicableMoleculeIds[0]},pk).length,0);
}
assert.equal(fields,24);
assert.match(BATCH_PROFILES[1].metrics.bioavailability.summary,/900.*2.400/);
assert.equal(BATCH_PROFILES[1].metrics.bioavailability.values[0].dividedDoses,3);
assert.match(BATCH_PROFILES[3].metrics.bioavailability.summary,/non quantificata/);
assert.equal(BATCH_PROFILES[3].metrics.bioavailability.values.length,0);
assert.match(BATCH_PROFILES[3].metrics.metabolites.detail,/meno attiva/);
assert.match(BATCH_PROFILES[3].metrics.excretion.summary,/radioattività/);
assert.equal(BATCH_PROFILES[2].metrics.proteinBinding.values[0].value,96);
const hostile=structuredClone(BATCH_DRUGS[0]);hostile.learning.body='<img src=x onerror=alert(1)>';
assert.doesNotMatch(renderBatchPharmacology(hostile),/<img/);

// Exercise the actual integration, lazy sections and bilingual search with the real catalog.
const hooks={};globalThis.document={addEventListener(n,fn){(hooks[n]??=[]).push(fn)},getElementById(){return null},querySelector(){return null},querySelectorAll(){return []}};
globalThis.location={hash:'#/molecule/CHEMBL1059'};
globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))});
const {createEvidenceAtlas}=await import('../evidence-atlas.js');
let done;const ready=new Promise(r=>done=r);const atlas=createEvidenceAtlas({refresh(){done()},legacyDrugs:[]});await ready;
for(const [i,d] of BATCH_DRUGS.entries()){
 const initial=atlas.route('molecule',d.chembl);
 assert.equal((initial.match(/data-ev-section=/g)||[]).length,6);
 assert.match(initial,new RegExp(d.name));assert.ok(initial.includes(BATCH_PROFILES[i].metrics.halfLife.summary));
 for(const query of [d.name,expectedNames[d.chembl]])assert.equal(atlas.search(query)[0].link,'#/molecule/'+d.chembl);
 for(const section of ['mechanism','adme','dosage']){
  const target={isConnected:true,open:true,dataset:{evSection:d.chembl+':'+section},matches:s=>s==='details[data-ev-section]',querySelector:()=>({dataset:{loaded:'true'}})};
  for(const hook of hooks.toggle||[])hook({target});
 }
 const html=atlas.route('molecule',d.chembl);
 assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);
 assert.ok(html.includes('data-batch-pharmacology="'+d.id+'"'));
 for(const r of d.references)assert.ok(html.includes(sources.get(r.id).url.replaceAll('&','&amp;')));
 assert.ok(html.includes('Apri posologia e sicurezza del prodotto'),'External-only sources must remain reachable');
 assert.doesNotMatch(html,/Documento di prodotto non collegato alla sintesi selezionata/);
 assert.doesNotMatch(html,/undefined|\[object Object\]/);
}
assert.match(atlas.route('atlas'),/41 sintesi originali/);
assert.match(atlas.route('coverage'),/>11<\/strong>/);assert.match(atlas.route('coverage'),/>66<\/strong>/);
assert.match(atlas.route('compare','Gabapentinoidi'),/Pregabalin/);assert.match(atlas.route('compare','Gabapentinoidi'),/Gabapentin/);
console.log('CONTENT_BATCH_PASS',JSON.stringify({newEditorial:4,newProfiles:4,newFields:fields,sources:8,totalEditorial:41,totalProfiles:11,totalFields:66,oldDataPreserved:true,exactIdentities:true,bilingualSearch:true,productLinks:true}));
