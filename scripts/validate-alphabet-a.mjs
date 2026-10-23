import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ALPHABET_A_BATCH as batch} from '../elix-alphabet-a.js';
import {ESSENTIAL_BATCH} from '../elix-essential-batch.js';
import {appendContentBatches,renderBatchPharmacology} from '../elix-content-batches.js';
import {buildCatalogCoverage} from '../elix-coverage-audit.js';
import {reviewedProfiles,renderReviewedPK,PK_FIELDS} from '../elix-pk-reviewed.js';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const catalog=read('data/catalog.json'),editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json'),index=read('data/verified/index.json');
appendContentBatches(editorial,pk);appendContentBatches(editorial,pk,ESSENTIAL_BATCH);
const before=buildCatalogCoverage({catalog,editorial,pk,index});
const original=structuredClone({editorial,pk});
appendContentBatches(editorial,pk,batch);
const after=buildCatalogCoverage({catalog,editorial,pk,index});
assert.equal(batch.drugs.length,10);assert.equal(batch.profiles.length,10);assert.equal(batch.sources.length,10);
assert.deepEqual(editorial.drugs.slice(0,53),original.editorial.drugs);assert.deepEqual(pk.profiles.slice(0,23),original.pk.profiles);
assert.deepEqual([before.counts.editorial,before.counts.profileContexts,before.counts.pkFields],[53,23,138]);
assert.deepEqual([after.counts.editorial,after.counts.profileContexts,after.counts.pkFields],[63,33,198]);
assert.deepEqual([after.counts.labelWithoutEditorial,after.counts.labelWithoutPK],[113,141]);
const frozen=JSON.stringify({editorial,pk});assert.throws(()=>appendContentBatches(editorial,pk,batch),/duplicata/);assert.equal(JSON.stringify({editorial,pk}),frozen);
const sources=new Map(batch.sources.map(s=>[s.id,s]));
const compact=t=>String(t).replace(/\s+/gu,' ').trim();
let fields=0,anchors=0,numeric=0,statuses={};
for(const d of batch.drugs){
 assert.ok(catalog.molecules.some(m=>m.id===d.chembl));assert.ok(!original.editorial.drugs.some(x=>x.chembl===d.chembl));
 for(const key of ['mechanism','clinical','critical','interactions','review'])assert.ok(d[key]?.length>30,d.id+'/'+key);
 assert.ok(d.learning.title&&d.learning.body);assert.equal(d.quizAvailable,false);
 assert.ok(renderBatchPharmacology(d,pk.sources).includes('2026-10-23'));
 for(const ref of d.references)assert.ok(sources.has(ref.id));
}
for(const s of batch.sources){
 assert.match(s.url,/^https:\/\//);assert.ok(s.jurisdiction&&s.section&&s.checkedAt&&s.sourceVersion);
 if(s.localFile){const bytes=fs.readFileSync(new URL(s.localFile,root));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),s.sha256);const doc=JSON.parse(bytes);assert.equal(doc.setId,s.setId);assert.equal(doc.effectiveDate,s.effectiveDate);assert.equal(s.currentVersionVerified,false);}
}
for(const p of batch.profiles){
 assert.equal(p.reviewStatus,'source-checked');assert.equal(p.applicableMoleculeIds.length,1);
 for(const key of ['formulation','route','population','scopeNote','checkedAt'])assert.ok(p[key]);
 for(const [key] of PK_FIELDS){
  const m=p.metrics[key];assert.ok(m.summary&&m.substance&&m.measurementType&&m.sourceSection);assert.ok(m.sourceIds.length);
  fields++;statuses[m.dataStatus]=(statuses[m.dataStatus]||0)+1;if(m.values.length)numeric++;
  if(m.dataStatus==='not-reported')assert.equal(m.values.length,0);
  for(const val of m.values){assert.ok(val.unit);if(val.value!==undefined)assert.ok(Number.isFinite(val.value));if(val.range)assert.ok(val.range.length===2&&val.range.every(Number.isFinite)&&val.range[0]<=val.range[1]);}
  for(const sid of m.sourceIds){const s=sources.get(sid);assert.ok(s);if(s.localFile&&m.evidenceAnchor){const doc=read(s.localFile);assert.ok(compact(doc.sections[m.sourceSection]?.join(' ')).includes(compact(m.evidenceAnchor)),p.id+'/'+key+' anchor '+m.evidenceAnchor);anchors++;}}
 }
 const html=renderReviewedPK(p,pk);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);assert.doesNotMatch(html,/undefined|NaN|\[object Object\]/);
 for(const related of catalog.molecules.filter(m=>m.parent===p.applicableMoleculeIds[0]&&m.id!==m.parent))assert.equal(reviewedProfiles(related,pk).filter(x=>x.id===p.id).length,0);
}
assert.equal(fields,60);
const p=id=>batch.profiles.find(p=>p.id==='alphabet-a-'+id);
assert.match(p('abacavir').metrics.bioavailability.summary,/Soluzione.*simile/);assert.equal(p('abacavir').metrics.bioavailability.values.length,0);
assert.match(p('abacavir').metrics.halfLife.substance,/^Abacavir$/);assert.equal(p('abacavir').metrics.halfLife.values[0].sd,0.63);
assert.match(p('acido-alendronico').metrics.excretion.summary,/EV/);assert.equal(p('acido-alendronico').metrics.halfLife.values[0].unit,'anni');
assert.match(p('acetilcisteina').metrics.excretion.summary,/clearance/i);assert.match(p('adenosina').metrics.halfLife.measurementType,/sangue intero/);
assert.match(batch.drugs.find(d=>d.id==='adenosina').clinical,/Non.*bolo/);
assert.match(p('alfuzosina').metrics.bioavailability.summary,/con cibo/);
assert.match(p('aprepitant').metrics.excretion.detail,/profarmaco EV/);
assert.match(p('aripiprazolo').metrics.metabolites.detail,/non il 40% della dose/);
assert.equal(p('amitriptilina').sourceIds[0],'alphabet-a-amitriptilina-uk');
const hooks={};globalThis.document={addEventListener(n,f){(hooks[n]??=[]).push(f)},getElementById(){return null},querySelector(){return null},querySelectorAll(){return []}};
globalThis.location={hash:'#/atlas'};globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))});
const {createEvidenceAtlas}=await import('../evidence-atlas.js');let done;const ready=new Promise(resolve=>done=resolve);const atlas=createEvidenceAtlas({refresh(){done()},legacyDrugs:[]});await ready;
for(const d of batch.drugs){
 const intl=catalog.molecules.find(m=>m.id===d.chembl).name;
 for(const q of [d.name,intl])assert.equal(atlas.search(q)[0].link,'#/molecule/'+d.chembl);
 for(const section of ['mechanism','adme','dosage'])for(const fn of hooks.toggle||[])fn({target:{isConnected:true,open:true,dataset:{evSection:d.chembl+':'+section},matches:s=>s==='details[data-ev-section]',querySelector:()=>({dataset:{loaded:'true'}})}});
 const html=atlas.route('molecule',d.chembl);assert.equal((html.match(/data-ev-section=/g)||[]).length,6);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);assert.ok(html.includes('data-batch-pharmacology="'+d.id+'"'));assert.ok(!html.includes('#/quiz/'+d.id));
}
// Complete, current inventory is a content roadmap, not a declaration of clinical review.
const out=process.env.ELIX_AUDIT_OUTPUT||'/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
const result={passed:true,checkedAt:batch.checkedAt,before:before.counts,after:after.counts,newDrugs:batch.drugs.map(d=>d.name),newFields:fields,numericFields:numeric,sourceAnchors:anchors,statuses,sourceSnapshots:9,onlineProductDocuments:1};
fs.writeFileSync(out+'/alphabet-a-report.json',JSON.stringify(result,null,2));
fs.writeFileSync(out+'/catalog-coverage-all.json',JSON.stringify({checkedAt:batch.checkedAt,...after},null,2));
console.log('ALPHABET_A_PASS',JSON.stringify(result));
