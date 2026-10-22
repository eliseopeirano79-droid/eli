import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {loadPresentation,pkDossier,pkOptions,pkSummaryField,renderStructuredPK,selectPKSource} from '../elix-presentation.js';
import {italianDrugName,registerItalianNames} from '../italian-names.js';
import {createEvidenceAtlas} from '../evidence-atlas.js';
const read=f=>JSON.parse(fs.readFileSync(new URL('../'+f,import.meta.url),'utf8'));
const catalogue=read('data/catalog.json'), byid=new Map(catalogue.molecules.map(x=>[x.id,x]));
const terms=read('data/presentation/names-it.json'), pk=read('data/presentation/pk-products.json'),idx=read('data/verified/index.json');
assert.ok(Object.keys(terms.records).length>2700);
assert.equal(Object.keys(pk.products).length,172);
assert.equal(Object.keys(pk.supplementary).length,7);
let quotes=0,numeric=0;
for(const d of Object.values(pk.products)){
 const original=read('data/verified/'+d.file);assert.equal(d.source,original.source);
 assert.equal(d.effectiveDate,original.effectiveDate);
 for(const f of Object.values(d.fields)){
  const text=(original.sections[f.section]||[]).join(' ');
  assert.ok(text.includes(f.quote),d.family+' quote must exist verbatim');
  assert.equal(crypto.createHash('sha256').update(f.quote).digest('hex'),f.quoteHash);
  assert.ok(f.note.length>10&&f.value.length>0);quotes++;if(/\d/.test(f.value))numeric++;
 }
}
registerItalianNames(terms.records);
assert.equal(italianDrugName(byid.get('CHEMBL8')),'Ciprofloxacina');
assert.equal(italianDrugName(byid.get('CHEMBL112')),'Paracetamolo');
assert.ok(!/mofetil/i.test(italianDrugName(byid.get('CHEMBL866'))),'Do not rename mycophenolic acid as its prodrug');
assert.ok(!/Acido gadopentetico$/.test(italianDrugName(byid.get('CHEMBL1200431'))),'Preserve dimeglumine chemical form');
assert.ok(/PROPIONATE|propionato/i.test(italianDrugName(byid.get('CHEMBL1159650'))),'Do not drop the clobetasol ester');
assert.ok(!terms.records.CHEMBL4650246,'Do not replace triterpenes by bark source');
assert.equal(italianDrugName({id:'CHEMBL8',name:'UNRELATED'}),'UNRELATED','Never reuse a name on mismatched source identity');
// Browser-like loader: lightweight summaries only. No PK document is required for the cards.
const nativeFetch=globalThis.fetch;
const requested=[];
globalThis.fetch=async url=>{requested.push(String(url));return {ok:true,json:async()=>JSON.parse(fs.readFileSync(fileURLToPath(url),'utf8'))};};
const loaded=await loadPresentation();assert.ok(loaded.names>2700);
function dossier(id){return pkDossier(byid.get(id),idx.molecules[id]?.label?.file);}
const metoprolol=dossier('CHEMBL13');
assert.match(metoprolol.fields.halfLife.value,/3–7 h/);
assert.match(metoprolol.fields.bioavailability.note,/relativa/i);
assert.match(metoprolol.fields.binding.value,/12%/);
assert.equal(dossier('CHEMBL635').fields.halfLife.value,'2–3 h');
assert.equal(dossier('CHEMBL112').fields.halfLife.value,'2,4 ± 0,6 h');
assert.match(dossier('CHEMBL112').fields.halfLife.note,/EV/);
assert.equal(dossier('CHEMBL161').fields.halfLife.value,'5,8–8,7 h');
assert.match(dossier('CHEMBL1542').fields.halfLife.value,/Non stimabile/);
assert.ok(!dossier('CHEMBL42')?.fields?.bioavailability?.value?.includes('80%'),'Do not assign citalopram bioavailability to escitalopram');
const bupropion=byid.get('CHEMBL894');assert.ok(!dossier(bupropion.id)?.fields?.bioavailability?.value?.includes('5–20'),'Do not report animal oral F as human');
const pred=dossier('CHEMBL635');assert.equal(pred.supplementary,true);assert.match(pred.product.generic.join(' '),/RAYOS/);
assert.equal(pkSummaryField(pred,'bioavailability','100%').status,'not-normalized','Do not fill absent F from a different product');
const opts=pkOptions(byid.get('CHEMBL635'),idx.molecules.CHEMBL635.label.file);assert.equal(opts.length,2);
selectPKSource('CHEMBL635',opts[0].file);assert.equal(dossier('CHEMBL635').file,opts[0].file);
selectPKSource('CHEMBL635',opts[1].file);
assert.match(renderStructuredPK(byid.get('CHEMBL635'),idx.molecules.CHEMBL635.label.file),/data-pk-summary-source/);
const hooks={};globalThis.document={addEventListener(n,f){(hooks[n]??=[]).push(f);},getElementById(){return null},querySelector(){return null}};
globalThis.location={hash:'#/atlas'};let done;const ready=new Promise(r=>done=r);
const atlas=createEvidenceAtlas({refresh(){done();},legacyDrugs:[]});await ready;
const card=atlas.route('molecule','CHEMBL13');
assert.match(card,/3–7 h/);assert.match(card,/77%/);assert.match(card,/12%/);assert.match(card,/METOPROLOL SUCCINATE/);
assert.doesNotMatch(card,/Vedi fonte PK|Da documentare|Non sintetizzato/);
const prednisone=atlas.route('molecule','CHEMBL635');assert.match(prednisone,/2–3 h/);assert.match(prednisone,/RAYOS/);
assert.ok(atlas.search('ciprofloxacina').some(x=>x.name==='Ciprofloxacina'));
assert.ok(atlas.search('ciprofloxacin').some(x=>x.name==='Ciprofloxacina'));
assert.ok(!requested.some(x=>/data\/verified\/labels\//.test(x)),'Summary cards must not fetch full product documents eagerly');
assert.equal((card.match(/class="ev-topic"/g)||[]).length,6);
globalThis.fetch=nativeFetch;
console.log('PRESENTATION_PASS',JSON.stringify({italianRecords:loaded.names,originalProducts:172,curatedOriginalFields:quotes,numericOriginalFields:numeric,supplementaryProducts:7,verbatimEvidence:true,chemicalFormsPreserved:true}));
