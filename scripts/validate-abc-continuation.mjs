import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ABC_CONTINUATION_BATCH as batch} from '../elix-abc-continuation.js';
import {ADDITIONAL_CONTENT_BATCHES} from '../elix-batch-registry.js';
import {appendContentBatches,renderBatchPharmacology} from '../elix-content-batches.js';
import {buildCatalogCoverage} from '../elix-coverage-audit.js';
import {reviewedProfiles,renderReviewedPK,PK_FIELDS} from '../elix-pk-reviewed.js';
const root=new URL('../',import.meta.url),read=p=>JSON.parse(fs.readFileSync(new URL(p,root),'utf8'));
const catalog=read('data/catalog.json'),editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json'),index=read('data/verified/index.json');
appendContentBatches(editorial,pk);
for(const b of ADDITIONAL_CONTENT_BATCHES.slice(0,ADDITIONAL_CONTENT_BATCHES.indexOf(batch)))appendContentBatches(editorial,pk,b);
const before=buildCatalogCoverage({catalog,editorial,pk,index}),original=structuredClone({editorial,pk});
appendContentBatches(editorial,pk,batch);
const after=buildCatalogCoverage({catalog,editorial,pk,index});
assert.deepEqual([before.counts.editorial,before.counts.profileContexts,before.counts.pkFields],[63,33,198]);
assert.deepEqual([after.counts.editorial,after.counts.profileContexts,after.counts.pkFields],[71,41,246]);
assert.deepEqual([after.counts.labelWithoutEditorial,after.counts.labelWithoutPK],[105,133]);
assert.equal(batch.drugs.length,8);assert.equal(batch.profiles.length,8);assert.equal(batch.sources.length,8);
assert.deepEqual(editorial.drugs.slice(0,63),original.editorial.drugs);
assert.deepEqual(pk.profiles.slice(0,33),original.pk.profiles);
assert.deepEqual(pk.sources.slice(0,original.pk.sources.length),original.pk.sources);
const frozen=JSON.stringify({editorial,pk});assert.throws(()=>appendContentBatches(editorial,pk,batch),/duplicata/);assert.equal(JSON.stringify({editorial,pk}),frozen);
const sources=new Map(pk.sources.map(s=>[s.id,s])),compact=t=>String(t).replace(/\s+/gu,' ').trim();
let fields=0,anchors=0,numeric=0;const statuses={};
for(const source of batch.sources){
 const bytes=fs.readFileSync(new URL(source.localFile,root)),doc=JSON.parse(bytes);
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),source.sha256);
 assert.equal(doc.setId,source.setId);assert.equal(doc.effectiveDate,source.effectiveDate);
 assert.equal(source.currentVersionVerified,false);assert.match(source.url,/^https:\/\/dailymed\.nlm\.nih\.gov\//);
}
for(const d of batch.drugs){
 assert.ok(catalog.molecules.some(m=>m.id===d.chembl));assert.ok(!original.editorial.drugs.some(x=>x.chembl===d.chembl));
 for(const key of ['mechanism','clinical','critical','interactions','review'])assert.ok(d[key]?.length>40,d.id+'/'+key);
 assert.ok(d.learning.body.length>180);assert.equal(d.quizAvailable,false);
 assert.ok(renderBatchPharmacology(d,pk.sources).includes(d.learning.title));
 for(const ref of d.references)assert.ok(sources.has(ref.id));
}
for(const p of batch.profiles){
 assert.equal(p.applicableMoleculeIds.length,1);assert.equal(p.reviewStatus,'source-checked');
 for(const key of ['formulation','route','population','scopeNote','checkedAt'])assert.ok(p[key]);
 for(const [key] of PK_FIELDS){
  const m=p.metrics[key];assert.ok(m.summary&&m.detail&&m.substance&&m.measurementType&&m.context&&m.sourceSection);
  fields++;statuses[m.dataStatus]=(statuses[m.dataStatus]||0)+1;if(m.values.length)numeric++;
  if(m.dataStatus==='not-reported')assert.equal(m.values.length,0,'A missing value cannot be numeric');
  for(const v of m.values){assert.ok(v.unit);if(v.value!==undefined)assert.ok(Number.isFinite(v.value));if(v.range)assert.ok(v.range.length===2&&v.range.every(Number.isFinite)&&v.range[0]<=v.range[1]);}
  for(const sid of m.sourceIds){const s=sources.get(sid);assert.ok(s);if(m.evidenceAnchor){const doc=read(s.localFile);assert.ok(compact(doc.sections[m.sourceSection]?.join(' ')).includes(compact(m.evidenceAnchor)),p.id+'/'+key+' anchor '+m.evidenceAnchor);anchors++;}}
 }
 assert.equal((renderReviewedPK(p,pk).match(/data-pk-metric=/g)||[]).length,6);
 for(const related of catalog.molecules.filter(m=>m.parent===p.applicableMoleculeIds[0]&&m.id!==m.parent))assert.equal(reviewedProfiles(related,pk).filter(x=>x.id===p.id).length,0);
}
assert.equal(fields,48);
const p=id=>batch.profiles.find(p=>p.id==='abc-'+id);
assert.equal(p('azatioprina').metrics.halfLife.values.length,0);assert.match(p('azatioprina').metrics.halfLife.detail,/radioattività/);
assert.match(p('buspirone').metrics.bioavailability.measurementType,/relativa/);assert.match(p('buspirone').metrics.bioavailability.detail,/Non.*assoluta/);
assert.equal(p('bupropione').metrics.halfLife.values[0].sd,9);assert.ok(!p('bupropione').metrics.halfLife.values[0].range);
assert.match(p('bupropione').formulation,/non SR\/XL/);assert.equal(p('bupropione').metrics.bioavailability.values.length,0);
assert.match(p('carbamazepina').metrics.halfLife.summary,/25–65.*12–17/);assert.equal(p('carbamazepina').metrics.bioavailability.values.length,0);
assert.match(p('claritromicina').metrics.excretion.detail,/sospensione/);
assert.match(p('clonidina').metrics.excretion.values[0].denominator,/assorbita/);
assert.match(p('budesonide').route,/Inalatoria/);assert.match(p('budesonide').metrics.bioavailability.detail,/4–6/);
assert.match(p('budesonide').metrics.excretion.values[0].denominator,/endovenosa/);
assert.deepEqual(read('data/verified/labels/CHEMBL1370.json').product.route,['ORAL'],'Original source remains immutable');
// Exercise the real rendering boundary, not a duplicate template.
const hooks={};globalThis.document={addEventListener(n,f){(hooks[n]??=[]).push(f)},getElementById(){return null},querySelector(){return null},querySelectorAll(){return []}};
globalThis.location={hash:'#/atlas'};globalThis.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))});
const {createEvidenceAtlas}=await import('../evidence-atlas.js');let done;const ready=new Promise(resolve=>done=resolve);const atlas=createEvidenceAtlas({refresh(){done()},legacyDrugs:[]});await ready;
for(const d of batch.drugs){
 for(const q of [d.name,catalog.molecules.find(m=>m.id===d.chembl).name])assert.equal(atlas.search(q)[0].link,'#/molecule/'+d.chembl);
 for(const section of ['mechanism','adme','dosage'])for(const fn of hooks.toggle||[])fn({target:{isConnected:true,open:true,dataset:{evSection:d.chembl+':'+section},matches:s=>s==='details[data-ev-section]',querySelector:()=>({dataset:{loaded:'true'}})}});
 const html=atlas.route('molecule',d.chembl);assert.equal((html.match(/data-ev-section=/g)||[]).length,6);assert.equal((html.match(/data-pk-metric=/g)||[]).length,6);
 assert.ok(html.includes('data-batch-pharmacology="'+d.id+'"'));assert.ok(!html.includes('#/quiz/'+d.id));assert.doesNotMatch(html,/undefined|NaN|\[object Object\]/);
}
await new Promise(resolve=>setImmediate(resolve));
const {renderReviewedProductSource}=await import('../elix-verified.js');const source=batch.sources.find(s=>s.reviewedRoute);
const routeHTML=renderReviewedProductSource(source,'dosage');assert.match(routeHTML,/data-route-review/);assert.match(routeHTML,/Inalatoria tramite nebulizzatore/);assert.match(routeHTML,/metadato originale riporta ORAL/);
const hostile=renderReviewedProductSource({...source,reviewedRoute:'<img src=x onerror=alert(1)>',routeReview:'<script>bad</script>'},'dosage');assert.doesNotMatch(hostile,/<script>|<img src=x/);assert.match(hostile,/&lt;script&gt;/);
const out=process.env.ELIX_AUDIT_OUTPUT||'/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
const result={passed:true,checkedAt:batch.checkedAt,before:before.counts,after:after.counts,newDrugs:batch.drugs.map(d=>d.name),newFields:fields,numericFields:numeric,sourceAnchors:anchors,statuses,sourceSnapshots:8,sourceMetadataImmutable:true,routeQualification:true};
fs.writeFileSync(out+'/abc-continuation-report.json',JSON.stringify(result,null,2));
fs.writeFileSync(out+'/catalog-coverage-all.json',JSON.stringify({checkedAt:batch.checkedAt,...after},null,2));
console.log('ABC_CONTINUATION_PASS',JSON.stringify(result));
