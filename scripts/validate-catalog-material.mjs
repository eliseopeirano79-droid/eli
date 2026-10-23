import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {appendContentBatches,renderBatchPharmacology} from '../elix-content-batches.js';
import {ALPHABET_A_BATCH} from '../elix-alphabet-a.js';
import {ESSENTIAL_BATCH} from '../elix-essential-batch.js';
import {buildCatalogCoverage,coverageMatches,renderCoverageAudit} from '../elix-coverage-audit.js';
import {PK_FIELDS,reviewedProfiles,renderReviewedPK} from '../elix-pk-reviewed.js';
const root=fileURLToPath(new URL('../',import.meta.url));
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const catalog=read('data/catalog.json'),editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json'),index=read('data/verified/index.json');
appendContentBatches(editorial,pk);
const before=structuredClone({editorial,pk});
const baseline=buildCatalogCoverage({catalog,editorial,pk,index});
assert.deepEqual([baseline.counts.records,baseline.counts.editorial,baseline.counts.profileContexts,baseline.counts.labelWithoutEditorial],[4225,41,11,135]);
appendContentBatches(editorial,pk,ESSENTIAL_BATCH);
assert.deepEqual(editorial.drugs.slice(0,before.editorial.drugs.length),before.editorial.drugs);
assert.deepEqual(pk.profiles.slice(0,before.pk.profiles.length),before.pk.profiles);
assert.deepEqual(pk.sources.slice(0,before.pk.sources.length),before.pk.sources);
const frozen=JSON.stringify({editorial,pk});
assert.throws(()=>appendContentBatches(editorial,pk,ESSENTIAL_BATCH),/duplicata/);
assert.equal(JSON.stringify({editorial,pk}),frozen,'Repeated batch must not mutate anything');
const report=buildCatalogCoverage({catalog,editorial,pk,index});
assert.equal(report.rows.length,catalog.molecules.length);
assert.equal(new Set(report.rows.map(r=>r.id)).size,4225);
assert.equal(report.counts.records,report.counts.parents+report.counts.related);
assert.deepEqual([report.counts.editorial,report.counts.profileContexts,report.counts.pkFields,report.counts.reviewedIdentities],[53,23,138,26]);
assert.deepEqual([report.counts.labels,report.counts.labelWithoutEditorial,report.counts.labelWithoutPK],[172,123,151]);
assert.equal(report.rows.filter(r=>coverageMatches(r,'editorial')).length,53);
assert.equal(report.rows.filter(r=>coverageMatches(r,'source-to-review')).length,123);
assert.equal(report.rows.filter(r=>coverageMatches(r,'needs-editorial')).length,4172);
assert.equal(report.rows.filter(r=>coverageMatches(r,'needs-pk')).length,151);
assert.equal(coverageMatches(null,'label'),false);
const originalIds=new Set(catalog.molecules.map(m=>m.id));
const names=new Map(catalog.molecules.map(m=>[m.id,m.name]));
const sources=new Map(pk.sources.map(s=>[s.id,s]));
assert.equal(sources.size,pk.sources.length);
assert.equal(new Set(editorial.drugs.map(d=>d.chembl)).size,editorial.drugs.length);
let sourceFiles=0,sectionCount=0,shortSections=[];
for(const row of report.rows){
 assert.ok(originalIds.has(row.id));
 assert.equal(row.editorial,editorial.drugs.some(d=>d.chembl===row.id));
 assert.equal(row.pkProfiles.length,reviewedProfiles({id:row.id},pk).length);
 if(row.label){
  const file='data/verified/'+row.labelFile;assert.ok(fs.existsSync(path.join(root,file)),file);
  const doc=read(file);assert.ok(doc.setId&&doc.source&&doc.sections);
  for(const [section,parts] of Object.entries(doc.sections)){
   assert.ok(Array.isArray(parts)&&parts.every(t=>typeof t==='string'));
   sectionCount++;
   const text=parts.join(' ').trim();if(text.length<80)shortSections.push({id:row.id,section,characters:text.length});
  }
  sourceFiles++;
 }
}
assert.equal(sourceFiles,172);
let fields=0,numericFields=0,statusCounts={};
for(const d of ESSENTIAL_BATCH.drugs){
 assert.ok(!before.editorial.drugs.some(x=>x.chembl===d.chembl));
 assert.ok(originalIds.has(d.chembl));
 for(const k of ['mechanism','clinical','critical','interactions','review'])assert.ok(d[k]&&d[k].length>30,d.id+'/'+k);
 assert.ok(d.learning.title&&d.learning.body);
 assert.equal(d.quizAvailable,false);
 for(const r of d.references)assert.ok(sources.has(r.id));
 const own=ESSENTIAL_BATCH.profiles.find(p=>p.applicableMoleculeIds.includes(d.chembl));assert.ok(own);
 assert.equal(own.applicableMoleculeIds.length,1);
 assert.match(d.clinical,/USA/);
 const h=renderBatchPharmacology(d,pk.sources);assert.match(h,/Interazioni da comprendere/);
 for(const ref of d.references)assert.ok(h.includes(sources.get(ref.id).url.replaceAll('&','&amp;')));
}
for(const source of ESSENTIAL_BATCH.sources){
 assert.match(source.url,/^https:\/\//);
 assert.ok(source.section&&source.sourceVersion&&source.checkedAt&&source.jurisdiction);
 if(source.localFile){
  const bytes=fs.readFileSync(path.join(root,source.localFile));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sha256,'Source snapshot hash');
  const doc=JSON.parse(bytes);assert.equal(source.setId,doc.setId);assert.equal(source.effectiveDate,doc.effectiveDate);
  assert.equal(source.currentVersionVerified,false);
 }
}
for(const p of ESSENTIAL_BATCH.profiles){
 assert.equal(p.reviewStatus,'source-checked');
 for(const k of ['title','formulation','route','population','scopeNote','checkedAt'])assert.ok(p[k]);
 assert.equal(Object.keys(p.metrics).length,6);
 for(const [field] of PK_FIELDS){
  const m=p.metrics[field];fields++;
  for(const k of ['summary','detail','substance','measurementType','sourceSection','dataStatus'])assert.equal(typeof m[k],'string',p.id+'/'+field+'/'+k);
  assert.ok(m.summary&&m.substance&&m.measurementType);
  assert.ok(['documented','not-reported','route-definition'].includes(m.dataStatus));
  statusCounts[m.dataStatus]=(statusCounts[m.dataStatus]||0)+1;
  if(m.values.length)numericFields++;
  if(m.dataStatus==='not-reported')assert.equal(m.values.length,0);
  for(const id of m.sourceIds){
   const source=sources.get(id);assert.ok(source);
   if(source.localFile){const doc=read(source.localFile);assert.ok(doc.sections[m.sourceSection]?.join(' ').length>80,'Use the actual containing section: '+p.id+'/'+field);}
  }
  for(const v of m.values){assert.ok(v.unit);if(v.value!==undefined)assert.ok(Number.isFinite(v.value));if(v.range){assert.equal(v.range.length,2);assert.ok(v.range.every(Number.isFinite));assert.ok(v.range[0]<=v.range[1]);}}
 }
 const html=renderReviewedPK(p,pk);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);
 assert.doesNotMatch(html,/undefined|NaN|\[object Object\]/);
 for(const m of catalog.molecules.filter(m=>m.parent===p.applicableMoleculeIds[0]&&m.id!==m.parent))assert.equal(reviewedProfiles(m,pk).length,0,'No implicit salt profile: '+m.id);
}
assert.equal(fields,72);
const profile=id=>ESSENTIAL_BATCH.profiles.find(p=>p.applicableMoleculeIds.includes(id));
assert.match(profile('CHEMBL161').metrics.halfLife.summary,/5,8.*8,7/);
assert.doesNotMatch(profile('CHEMBL161').metrics.halfLife.summary,/25/);
assert.match(profile('CHEMBL161').metrics.halfLife.detail,/orecchio|tissutal/i);
assert.match(profile('CHEMBL1431').metrics.excretion.summary,/assorbita/);
assert.match(profile('CHEMBL1503').metrics.excretion.detail,/soluzione/i);
assert.equal(profile('CHEMBL112').metrics.halfLife.values[0].statistic,'mean');
assert.match(profile('CHEMBL112').metrics.halfLife.summary,/±/);
assert.match(profile('CHEMBL1467').metrics.bioavailability.summary,/non quantificata/);
assert.match(profile('CHEMBL1467').metrics.metabolites.summary,/ossipurinolo/i);
assert.match(profile('CHEMBL1000').metrics.halfLife.detail,/studi/i);
assert.match(renderCoverageAudit(report),/non revisione clinica completa/);
const withoutIndex=buildCatalogCoverage({catalog,editorial,pk,index:null});assert.equal(withoutIndex.sourceIndexAvailable,false);
// Add current batches only after the frozen essential-batch regression above.
const liveEditorial=structuredClone(editorial),livePK=structuredClone(pk);
appendContentBatches(liveEditorial,livePK,ALPHABET_A_BATCH);
const liveReport=buildCatalogCoverage({catalog,editorial:liveEditorial,pk:livePK,index});
// Actual renderer: all catalog identities, all new six-section pages, bilingual exact lookup and filters.
const hooks={};globalThis.document={addEventListener(n,fn){(hooks[n]??=[]).push(fn)},getElementById(){return null},querySelector(){return null},querySelectorAll(){return []}};
globalThis.location={hash:'#/coverage'};
globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))});
const {createEvidenceAtlas}=await import('../evidence-atlas.js');
let done;const ready=new Promise(r=>done=r);const atlas=createEvidenceAtlas({refresh(){done()},legacyDrugs:[]});await ready;
for(const row of report.rows){const html=atlas.route('molecule',row.id);assert.equal((html.match(/data-ev-section=/g)||[]).length,6);}
for(const d of ESSENTIAL_BATCH.drugs){
 for(const query of [d.name,names.get(d.chembl)])assert.equal(atlas.search(query)[0].link,'#/molecule/'+d.chembl);
 for(const section of ['mechanism','adme','dosage'])for(const fn of hooks.toggle||[])fn({target:{isConnected:true,open:true,dataset:{evSection:d.chembl+':'+section},matches:s=>s==='details[data-ev-section]',querySelector:()=>({dataset:{loaded:'true'}})}});
 const html=atlas.route('molecule',d.chembl);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);assert.ok(html.includes('data-batch-pharmacology="'+d.id+'"'));
 assert.doesNotMatch(html,/undefined|NaN|\[object Object\]/);assert.ok(!html.includes('#/quiz/'+d.id));
}
for(const [kind,total] of [['editorial',liveReport.counts.editorial],['needs-editorial',liveReport.counts.records-liveReport.counts.editorial],['source-to-review',liveReport.counts.labelWithoutEditorial],['needs-pk',liveReport.counts.labelWithoutPK]]){
 for(const fn of hooks.change||[])fn({target:{id:'vd-data-kind',value:kind}});
 assert.ok(atlas.route('atlas').includes(total.toLocaleString('it-IT')+' record'),kind);
}
const out=process.env.ELIX_AUDIT_OUTPUT||'/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
const summary={checkedAt:ESSENTIAL_BATCH.checkedAt,baselineCommit:'30b7ce5f45e2eaa7e6bc7726e5cc66b42538e305',scope:report.scope,before:baseline.counts,after:report.counts,addedDrugs:ESSENTIAL_BATCH.drugs.map(d=>({id:d.chembl,name:d.name})),newFields:fields,numericFields,statusCounts,sourceFilesInspected:sourceFiles,sourceSectionsInspected:sectionCount,shortSourceSections:shortSections,shortSectionNote:'Filtro strutturale (<80 caratteri): possibili titoli o estratti brevi, non diagnosi di errore o incompletezza clinica.',allRoutesChecked:report.rows.length,areas:report.areas,passed:true};
fs.writeFileSync(path.join(out,'catalog-material-report.json'),JSON.stringify(summary,null,2));
fs.writeFileSync(path.join(out,'catalog-coverage-all.json'),JSON.stringify({checkedAt:ALPHABET_A_BATCH.checkedAt,...liveReport},null,2));
console.log('CATALOG_MATERIAL_PASS',JSON.stringify({before:baseline.counts,after:report.counts,newFields:fields,numericFields,statusCounts,sourceFiles,sectionCount,allRoutes:4225}));
