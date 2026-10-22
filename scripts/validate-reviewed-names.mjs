import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {italianDrugName, internationalDrugName, hasReviewedItalianName, ITALIAN_NAME_REVIEW_012} from '../italian-names.js';
import {createEvidenceAtlas} from '../evidence-atlas.js';

const readJSON = url => JSON.parse(readFileSync(fileURLToPath(url), 'utf8'));
const catalog = readJSON(new URL('../data/catalog.json', import.meta.url));
const byId = new Map(catalog.molecules.map(m => [m.id, m]));
const expected = [
  ['CHEMBL1200984', 'Amlodipina maleato'],
  ['CHEMBL6068333', 'Clopidogrel besilato'],
  ['CHEMBL6068338', 'Clopidogrel cloridrato'],
  ['CHEMBL8', 'Ciprofloxacina'],
  ['CHEMBL1202', 'Ciprofloxacina cloridrato'],
  ['CHEMBL4', 'Ofloxacina'],
  ['CHEMBL9', 'Norfloxacina'],
  ['CHEMBL32', 'Moxifloxacina'],
  ['CHEMBL6', 'Indometacina'],
  ['CHEMBL571', 'Ketoprofene'],
  ['CHEMBL563', 'Flurbiprofene'],
  ['CHEMBL154', 'Naproxene'],
  ['CHEMBL1200806', 'Naproxene sodico'],
  ['CHEMBL42', 'Clozapina'],
  ['CHEMBL445', 'Nortriptilina'],
  ['CHEMBL654', 'Mirtazapina'],
  ['CHEMBL59', 'Dopamina'],
  ['CHEMBL1557', 'Dopamina cloridrato'],
  ['CHEMBL472', 'Glibenclamide'],
  ['CHEMBL572', 'Nitrofurantoina'],
  ['CHEMBL704', 'Mesalazina'],
  ['CHEMBL650', 'Metilprednisolone'],
  ['CHEMBL433', 'Valproato di sodio'],
  ['CHEMBL16', 'Fenitoina'],
  ['CHEMBL11359', 'Cisplatino']
];

assert.equal(ITALIAN_NAME_REVIEW_012.records.length, expected.length);
assert.equal(new Set(ITALIAN_NAME_REVIEW_012.records.map(r => r.chembl)).size, expected.length);
for (const [id, name] of expected) {
  const molecule = byId.get(id);
  assert.ok(molecule, `Identità ${id} assente dal catalogo`);
  const original = JSON.stringify(molecule);
  assert.equal(italianDrugName(molecule), name, id);
  assert.ok(hasReviewedItalianName(molecule), id);
  assert.equal(internationalDrugName(molecule), molecule.name, id);
  assert.equal(JSON.stringify(molecule), original, 'La traduzione non deve mutare il record sorgente');
  const provenance = ITALIAN_NAME_REVIEW_012.records.find(r => r.chembl === id);
  assert.equal(provenance?.name, molecule.name, `Provenienza associata a un nome differente: ${id}`);
  assert.ok(ITALIAN_NAME_REVIEW_012.sources[provenance.source]?.url.startsWith('https://'));
  assert.ok(provenance.section, `Sezione della fonte mancante: ${id}`);
  if (provenance.identitySynonym) {
    assert.ok(molecule.aliases.some(a => a.toUpperCase() === provenance.identitySynonym.toUpperCase()), `Sinonimo non documentato: ${id}`);
  }
}

// Non estendere una corrispondenza del parent a sali o stereoisomeri non revisionati.
for (const id of ['CHEMBL2111097', 'CHEMBL4594288', 'CHEMBL4594262', 'CHEMBL6068343', 'CHEMBL3989566']) {
  const molecule = byId.get(id);
  assert.equal(italianDrugName(molecule), molecule.name, id);
  assert.equal(hasReviewedItalianName(molecule), false, id);
}
for (const [base, salt] of [['CHEMBL1491','CHEMBL1200984'], ['CHEMBL1771','CHEMBL6068333'], ['CHEMBL1771','CHEMBL6068338'], ['CHEMBL8','CHEMBL1202'], ['CHEMBL154','CHEMBL1200806'], ['CHEMBL59','CHEMBL1557'], ['CHEMBL109','CHEMBL433']]) {
  assert.notEqual(italianDrugName(byId.get(base)), italianDrugName(byId.get(salt)));
}

const nativeFetch = globalThis.fetch;
const nativeDocument = globalThis.document;
const nativeLocation = globalThis.location;
try {
  globalThis.document = {addEventListener(){}, getElementById(){return null;}};
  globalThis.location = {hash:'#/atlas'};
  globalThis.fetch = async url => ({ok:true, json:async()=>readJSON(url)});
  let ready;
  const loaded = new Promise(resolve => {ready = resolve;});
  const atlas = createEvidenceAtlas({refresh(){ready();},legacyDrugs:[]});
  await loaded;
  for (const [id, name] of expected) {
    const sourceName = byId.get(id).name;
    for (const query of [name, sourceName]) {
      assert.ok(atlas.search(query).some(r => r.link === '#/molecule/'+id && r.name === name), `Ricerca non risolta: ${query} → ${id}`);
    }
  }
  assert.ok(atlas.search('naprossene').some(r => r.link === '#/molecule/CHEMBL154'), 'La grafia italiana alternativa deve restare ricercabile');
  assert.match(atlas.route('molecule','CHEMBL6068333'), /Clopidogrel besilato/);
  assert.match(atlas.route('molecule','CHEMBL6068333'), /CLOPIDOGREL BESILATE/);
  assert.match(atlas.route('molecule','CHEMBL6068338'), /Clopidogrel cloridrato/);
} finally {
  globalThis.fetch = nativeFetch;
  globalThis.document = nativeDocument;
  globalThis.location = nativeLocation;
}
console.log('ELIX nomi 0.12: PASS · 25 corrispondenze documentate, ricerca IT/EN, sinonimi USA e identità di sali/stereoisomeri preservati');
