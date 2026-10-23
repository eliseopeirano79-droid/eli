import {ABC_CONTINUATION_BATCH} from '../elix-abc-continuation.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {ELI_CLINICAL_BATCH as batch,supplementProductIdentities} from '../eli-clinical-batch.js';
import {ALPHABET_A_BATCH} from '../elix-alphabet-a.js';
import {ESSENTIAL_BATCH} from '../elix-essential-batch.js';
import {appendContentBatches} from '../elix-content-batches.js';
import {buildCatalogCoverage} from '../elix-coverage-audit.js';
import {renderEliHome} from '../eli-home.js';
import {reviewedProfiles,PK_FIELDS} from '../elix-pk-reviewed.js';
const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url)));
const editorial=read('data/editorial.json'),pk=read('data/pk-reviewed.json'),catalog=read('data/catalog.json'),index=read('data/verified/index.json');
appendContentBatches(editorial,pk);appendContentBatches(editorial,pk,ESSENTIAL_BATCH);appendContentBatches(editorial,pk,ALPHABET_A_BATCH);
appendContentBatches(editorial,pk,ABC_CONTINUATION_BATCH);
const baseline=structuredClone({editorial,pk});appendContentBatches(editorial,pk,batch);
assert.deepEqual(editorial.drugs.slice(0,71),baseline.editorial.drugs);assert.deepEqual(pk.profiles.slice(0,41),baseline.pk.profiles);
const report=buildCatalogCoverage({catalog,editorial,pk,index});
assert.deepEqual([report.counts.editorial,report.counts.profileContexts,report.counts.pkFields,report.counts.labelWithoutEditorial,report.counts.labelWithoutPK],[81,51,306,95,123]);
let fields=0,anchors=0,numeric=0;const statuses={};
for(const d of batch.drugs){
 assert.ok(!baseline.editorial.drugs.some(x=>x.chembl===d.chembl));assert.equal(d.quizAvailable,false);
 assert.ok(catalog.molecules.some(m=>m.id===d.chembl));for(const key of ['mechanism','clinical','critical','interactions','review'])assert.ok(d[key].length>30);
 const p=batch.profiles.find(p=>p.applicableMoleculeIds.includes(d.chembl)),s=batch.sources.find(s=>p.sourceIds.includes(s.id));
 const bytes=fs.readFileSync(new URL('../'+s.localFile,import.meta.url)),doc=JSON.parse(bytes);
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),s.sha256);assert.equal(doc.setId,s.setId);assert.equal(doc.effectiveDate,s.effectiveDate);assert.equal(s.currentVersionVerified,false);
 for(const [key] of PK_FIELDS){const m=p.metrics[key];fields++;statuses[m.dataStatus]=(statuses[m.dataStatus]||0)+1;assert.ok(m.context&&m.measurementType&&m.substance&&m.summary);assert.deepEqual(m.sourceIds,[s.id]);
  if(m.evidenceAnchor){assert.ok(doc.sections[m.sourceSection].join(' ').includes(m.evidenceAnchor),d.id+'/'+key);anchors++;}
  if(m.values.length)numeric++;if(m.dataStatus==='not-reported')assert.equal(m.values.length,0);
  for(const val of m.values){assert.ok(val.unit);if(val.value!==undefined)assert.ok(Number.isFinite(val.value));if(val.range)assert.ok(val.range.length===2&&val.range[0]<=val.range[1]);}
 }
 for(const salt of catalog.molecules.filter(m=>m.parent===d.chembl&&m.id!==m.parent))assert.ok(!reviewedProfiles(salt,pk).some(x=>x.id===p.id),'No inherited product context: '+salt.id);
}
const profile=id=>batch.profiles.find(p=>p.id==='eli-clinical-'+id);
assert.match(profile('fentanyl').metrics.halfLife.detail,/cerotto/);assert.match(profile('fentanyl').metrics.proteinBinding.summary,/libera/);
assert.match(profile('lidocaina').metrics.halfLife.detail,/non misura/);assert.match(profile('atropina').metrics.halfLife.summary,/iosciamina/);
assert.match(profile('ketamina').metrics.halfLife.detail,/non un valore universale/);assert.match(profile('semaglutide').formulation,/sottocutanea/);
assert.match(batch.drugs.find(d=>d.id==='tirzepatide').clinical,/Zepbound/);assert.match(batch.drugs.find(d=>d.id==='diazepam').clinical,/Non.*orale/);
const supplemented=supplementProductIdentities(catalog);
for(const d of batch.drugs.filter(d=>d.identity)){
 const m=supplemented.molecules.find(m=>m.id===d.chembl),original=catalog.molecules.find(m=>m.id===d.chembl),source=batch.sources.find(s=>s.id===d.identity.sourceId),doc=read(source.localFile);
 assert.equal(original.formula,null);assert.equal(original.mass,null);assert.equal(m.formula,d.identity.formula);assert.equal(m.mass,d.identity.mass);
 assert.ok(doc.sections.description.join(' ').includes(d.identity.formulaAnchor));assert.ok(doc.sections.description.join(' ').includes(d.identity.massAnchor));
}
assert.equal(supplemented.molecules.find(m=>m.name==='HEPARIN').formula,null,'Mixtures must not gain a unique formula');
const home=renderEliHome({counts:report.counts,news:read('data/news.json')});
for(const path of ['cinema/ADRB2','news','pk','dose','evidence','cases','compare','coverage'])assert.ok(home.includes('#/'+path));
assert.doesNotMatch(home,/undefined|NaN|\[object Object\]/);
assert.ok(renderEliHome({counts:report.counts,sourceIndexAvailable:false}).includes('n.d.'),'A failed source index is not zero missing sources');
const loading=renderEliHome(null);assert.ok(!loading.includes('>0<'),'Unknown coverage is not zero');
const corrupted=structuredClone({counts:report.counts,news:read('data/news.json')});corrupted.news.items[0].title='<script>alert(1)</script>';assert.ok(!renderEliHome(corrupted).includes('<script>'));
const sw=fs.readFileSync(new URL('../sw.js',import.meta.url),'utf8');for(const file of ['eli-home.js','eli-home.css','eli-clinical-batch.js'])assert.ok(sw.includes(file));
const dir=process.env.ELIX_AUDIT_OUTPUT||'/tmp/elix-audit';fs.mkdirSync(dir,{recursive:true});
const result={passed:true,checkedAt:batch.checkedAt,newDrugs:batch.drugs.map(d=>d.name),newFields:fields,numericFields:numeric,sourceAnchors:anchors,statuses,counts:report.counts,sourceSnapshots:10};
fs.writeFileSync(dir+'/eli-release-data.json',JSON.stringify(result,null,2));fs.writeFileSync(dir+'/eli-catalog-coverage.json',JSON.stringify(report,null,2));console.log('ELI_RELEASE_PASS',JSON.stringify(result));
