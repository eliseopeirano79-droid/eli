import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {
  PK_FIELDS, reviewedProfiles, reviewedProfile, isMissingPK,
  renderReviewedPK, renderPKContext,
} from '../elix-pk-reviewed.js';

const read = path => JSON.parse(fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const dataset = read('data/pk-reviewed.json');
const catalog = read('data/catalog.json');
const molecules = new Map(catalog.molecules.map(molecule => [molecule.id, molecule]));
const sources = new Map(dataset.sources.map(source => [source.id, source]));
const compact = text => String(text ?? '').replace(/\s+/gu, ' ').trim();
const metricText = metric => [metric.summary, metric.detail, metric.substance, metric.measurementType].join(' ');
const escapeText = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const profileForName = name => {
  const molecule = catalog.molecules.find(item => item.name === name);
  assert.ok(molecule, 'Missing catalog identity: ' + name);
  const profile = reviewedProfile(molecule, dataset);
  assert.ok(profile, 'Missing reviewed profile: ' + name);
  return profile;
};

assert.equal(dataset.schemaVersion, 1);
assert.match(dataset.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
assert.ok(dataset.profiles.length >= 7, 'The initial reviewed batch requires seven product contexts');
assert.equal(sources.size, dataset.sources.length, 'Source identifiers must be unique');
assert.equal(new Set(dataset.profiles.map(profile => profile.id)).size, dataset.profiles.length, 'Profile identifiers must be unique');

const sourceDocuments = new Map();
for (const source of dataset.sources) {
  assert.match(source.url, /^https:\/\//, 'Each source must retain its official HTTPS URL: ' + source.id);
  for (const key of ['id', 'section', 'checkedAt', 'product']) {
    assert.ok(source[key], 'Missing source ' + key + ': ' + source.id);
  }
  if (source.effectiveDate) assert.match(source.effectiveDate, /^\d{4}-?\d{2}-?\d{2}$/, 'A source version date must be unambiguous');
  else assert.ok(source.sourceVersion && source.sourceVersion.length > 20, 'An unavailable source version date needs an explicit explanation, never a fabricated date');
  if (source.localFile) {
    assert.match(source.localFile, /^data\//, 'Local provenance must point into the tracked data directory');
    assert.ok(!source.localFile.split('/').includes('..'), 'Local provenance may not traverse paths');
    const document = read(source.localFile);
    sourceDocuments.set(source.id, document);
    if (source.setId) assert.equal(source.setId, document.setId, 'Source must identify the same product document: ' + source.id);
    if (document.effectiveDate) assert.equal(source.effectiveDate.replaceAll('-', ''), document.effectiveDate.replaceAll('-', ''), 'A reviewed source may not silently use a different document version: ' + source.id);
  }
}

let metricsChecked = 0;
let excerptsChecked = 0;
const boundIds = new Set();
for (const profile of dataset.profiles) {
  assert.equal(profile.reviewStatus, 'source-checked', 'Unreviewed profiles may not enter the reviewed batch');
  for (const key of ['id', 'title', 'formulation', 'route', 'population', 'checkedAt']) {
    assert.ok(typeof profile[key] === 'string' && profile[key].trim(), 'Missing profile context ' + key + ': ' + profile.id);
  }
  assert.ok(profile.applicableMoleculeIds.length, 'A profile needs an explicit chemical identity binding');
  assert.equal(new Set(profile.applicableMoleculeIds).size, profile.applicableMoleculeIds.length);
  for (const id of profile.applicableMoleculeIds) {
    assert.ok(molecules.has(id), 'Unknown chemical identity in PK binding: ' + id);
    boundIds.add(id);
  }
  for (const [key] of PK_FIELDS) {
    const metric = profile.metrics[key];
    assert.ok(metric, 'Missing PK field ' + profile.id + '/' + key);
    assert.ok(typeof metric.summary === 'string' && metric.summary.trim(), 'Missing readable PK summary');
    assert.equal(isMissingPK(metric.summary), false, 'Reviewed metrics must be values or explicit scientific limitations, not placeholders');
    assert.ok(typeof metric.detail === 'string', 'Metric context must have an explicit detail field');
    assert.ok(metric.substance && metric.measurementType, 'Metric identity and measurement type are required: ' + profile.id + '/' + key);
    assert.ok(Array.isArray(metric.sourceIds) && metric.sourceIds.length, 'Each metric needs its own provenance: ' + profile.id + '/' + key);
    for (const sourceId of metric.sourceIds) {
      assert.ok(sources.has(sourceId), 'Dangling metric source: ' + sourceId);
      const local = sourceDocuments.get(sourceId);
      if (local && metric.supportingExcerpt) {
        const text = compact(Object.values(local.sections || {}).flat().join(' '));
        assert.ok(text.includes(compact(metric.supportingExcerpt)), 'Supporting excerpt must occur in the actual imported source: ' + profile.id + '/' + key);
        excerptsChecked++;
      }
    }
    for (const value of metric.values || []) {
      if (value.value !== undefined) assert.ok(Number.isFinite(value.value), 'Structured PK value must be finite');
      if (value.range !== undefined) {
        assert.equal(value.range.length, 2, 'A PK interval needs two bounds');
        assert.ok(value.range.every(Number.isFinite) && value.range[0] <= value.range[1], 'PK interval bounds must be ordered');
      }
      assert.ok(value.unit, 'Numeric PK measurements must include a unit');
    }
    metricsChecked++;
  }
  const html = renderReviewedPK(profile, dataset);
  assert.equal((html.match(/data-pk-metric=/g) || []).length, PK_FIELDS.length, 'All six PK fields must remain reachable');
  assert.equal((html.match(/data-pk-source=/g) || []).length, PK_FIELDS.length, 'Every metric must expose context and provenance');
  assert.doesNotMatch(html, /\[object Object\]|undefined|NaN/, 'Provenance must render as readable text');
}

// A chemically related record is not permission to transfer product-specific PK.
const parent = molecules.get('CHEMBL13');
const tartrate = molecules.get('CHEMBL2062335');
const succinate = molecules.get('CHEMBL2356097');
const fumarate = molecules.get('CHEMBL3989566');
assert.equal(reviewedProfiles(parent, dataset).length, 2);
assert.equal(reviewedProfiles(tartrate, dataset).length, 1);
assert.equal(reviewedProfiles(succinate, dataset).length, 1);
assert.equal(reviewedProfiles(fumarate, dataset).length, 0, 'Fumarate must not inherit succinate data');
assert.equal(reviewedProfile({id:'UNKNOWN', parent:'CHEMBL13'}, dataset), null, 'Unknown related identities must remain unmapped');
const immediate = reviewedProfile(tartrate, dataset);
const extended = reviewedProfile(succinate, dataset);
assert.notEqual(immediate.id, extended.id);
assert.match(immediate.formulation, /tartrato.*immediato/i);
assert.match(extended.formulation, /succinato.*prolungato/i);
assert.match(extended.metrics.bioavailability.measurementType, /relativa/i);
assert.match(extended.metrics.bioavailability.summary, /77.*relativa/i);
assert.equal(reviewedProfile(tartrate, dataset, extended.id).id, immediate.id, 'A stale or forged selector value cannot cross the exact substance binding');
assert.equal(reviewedProfiles(parent, {...dataset, profiles:[{...extended, reviewStatus:'draft'}]}).length, 0, 'Draft records may not render as reviewed');

// These regressions protect distinctions that were hidden by the previous single-value summary.
const ramipril = profileForName('RAMIPRIL');
assert.match(ramipril.metrics.halfLife.summary, /ramiprilato.*13\s*[–-]\s*17/i, 'The effective half-life must explicitly name the active metabolite');
assert.match(ramipril.metrics.halfLife.detail, /(?:>\s*50|superiore a 50)/i);
assert.match(ramipril.metrics.halfLife.detail, /terminale/i);
assert.match(ramipril.metrics.halfLife.substance, /ramiprilato/i);
assert.match(metricText(ramipril.metrics.bioavailability), /28/);
assert.match(metricText(ramipril.metrics.bioavailability), /44/);
assert.match(metricText(ramipril.metrics.bioavailability), /(?:endovenos|EV)/i, 'The metabolite exposure must retain the oral-versus-IV parent comparison');
const clopidogrel = profileForName('CLOPIDOGREL');
assert.match(metricText(clopidogrel.metrics.bioavailability), /assorbimento|assorbita/i);
assert.match(clopidogrel.metrics.bioavailability.summary, /non quantificat|non riportat|non determinat/i, 'Absorption must not become absolute bioavailability');
assert.ok(!(clopidogrel.metrics.bioavailability.values || []).some(value => /assolut/i.test(value.measurementType || '') && value.value === 50), 'The absorbed fraction is not an absolute F measurement');
const digoxin = profileForName('DIGOXIN');
assert.match(digoxin.metrics.excretion.summary, /50\s*[–-]\s*70/);
assert.match(digoxin.metrics.excretion.summary, /EV|endovenos/i, 'The excretion fraction measured after IV administration must be labeled even in the compact value');
assert.match(metricText(digoxin.metrics.excretion), /immodificat/i);
const levetiracetam = profileForName('LEVETIRACETAM');
assert.ok(!read('data/editorial.json').drugs.some(drug => drug.chembl === molecules.get('CHEMBL1286')?.id), 'The batch must demonstrate a reviewed PK profile beyond the original editorial monographs');
assert.match(levetiracetam.metrics.halfLife.summary, /7/);

for (const placeholder of ['', ' Non sintetizzato ', 'Non sintetizzata', 'DA DOCUMENTARE', 'Non inserita']) assert.equal(isMissingPK(placeholder), true);
for (const actual of ['0%', '77% relativa', 'Non determinata nella label', 'Assoluta non quantificata nella fonte']) assert.equal(isMissingPK(actual), false);

// Escape data and source metadata at the rendering boundary; citations cannot inject markup or links.
const hostile = structuredClone(extended);
hostile.title = '<img src=x onerror="alert(1)">';
hostile.metrics.halfLife.summary = '<script>alert(2)</script>';
hostile.metrics.halfLife.substance = '<svg onload="alert(3)">';
const unsafeDataset = {...dataset, profiles:[hostile], sources:dataset.sources.map(source => ({...source, url:'javascript:alert(4)', product:'<script>alert(5)</script>'}))};
const escaped = renderReviewedPK(hostile, unsafeDataset) + renderPKContext(parent, unsafeDataset, hostile.id);
assert.doesNotMatch(escaped, /<script|<img|<svg|href="javascript:/i);
assert.match(escaped, /&lt;script&gt;/);

// Exercise the real atlas without network. Source fetch failure must not erase a reviewed summary.
const original = {fetch:globalThis.fetch, document:globalThis.document, location:globalThis.location};
const hooks = {};
const failedSourcePaths = new Set();
globalThis.document = {
  addEventListener(name, callback) {(hooks[name] ??= []).push(callback);},
  getElementById() {return null;},
  querySelector() {return null;},
  querySelectorAll() {return [];},
};
globalThis.location = {hash:'#/molecule/CHEMBL13'};
globalThis.fetch = async url => {
  const path = fileURLToPath(url);
  if (failedSourcePaths.has(path)) return {ok:false, status:503};
  return {ok:true, json:async () => JSON.parse(fs.readFileSync(path, 'utf8'))};
};
try {
  const {createEvidenceAtlas} = await import('../evidence-atlas.js');
  const {renderVerifiedByArea} = await import('../elix-verified.js');
  let loaded;
  const ready = new Promise(resolve => {loaded = resolve;});
  const atlas = createEvidenceAtlas({refresh() {loaded();}, legacyDrugs:[]});
  await ready;
  const facts = html => {
    const match = html.match(/class="ev-facts">([\s\S]*?)<\/div>/);
    assert.ok(match, 'A drug sheet must keep its compact summary');
    return match[1];
  };
  const change = target => {
    for (const callback of hooks.change || []) callback({target});
  };
  const input = target => {
    for (const callback of hooks.input || []) callback({target});
  };
  const openSection = (id, section) => {
    const target = {
      isConnected:true, open:true, dataset:{evSection:id + ':' + section},
      matches:selector => selector === 'details[data-ev-section]',
      querySelector:() => ({dataset:{loaded:'true'}}),
    };
    for (const callback of hooks.toggle || []) callback({target});
  };
  const sectionHTML = (html, id, section) => {
    const start = html.indexOf('data-ev-section="' + id + ':' + section + '"');
    assert.ok(start >= 0, 'Missing sheet section: ' + id + '/' + section);
    const next = html.indexOf('<details class="ev-topic"', start + 1);
    return html.slice(start, next < 0 ? undefined : next);
  };

  // Exact, reviewed salt profiles must remain discoverable after parent-label inheritance is disabled.
  const reviewedSaltIds = ['CHEMBL2062335', 'CHEMBL2356097', 'CHEMBL1200402', 'CHEMBL1083385'];
  change({id:'vd-data-kind', value:'label'});
  for (const id of reviewedSaltIds) {
    input({id:'ev-search', value:id});
    const html = atlas.route('atlas');
    const card = html.match(new RegExp('<a class="ev-molecule-card" href="#/molecule/' + id + '">([\\s\\S]*?)</a>'));
    assert.ok(card, 'The product/PK filter must include an explicitly reviewed salt: ' + id);
    const badges = [...card[1].matchAll(/<span class="ev-tag[^\"]*">([^<]*)<\/span>/g)].map(match => match[1]);
    assert.ok(badges.some(text => /\bPK\b/i.test(text)), 'The salt card must signal its own reviewed PK data: ' + id);
    const parentNotice = renderVerifiedByArea(molecules.get(id), 'mechanism');
    assert.match(parentNotice, /documento|sezion/i, 'The parent-label notice must describe the document or sections, not negate the reviewed profile');
    assert.doesNotMatch(parentNotice, /formulazione di questo record non è stata verificata/i, 'A reviewed salt must not be described as an unverified formulation');
  }
  input({id:'ev-search', value:''});
  change({id:'vd-data-kind', value:''});

  for (const id of boundIds) {
    const html = atlas.route('molecule', id);
    assert.equal((html.match(/data-ev-section=/g) || []).length, 6, 'PK work must preserve the six primary sections for ' + id);
    const expected = reviewedProfile(molecules.get(id), dataset);
    assert.ok(facts(html).includes(escapeText(expected.metrics.halfLife.summary)), 'The reviewed half-life must appear directly in the compact summary for ' + id);
  }
  const before = atlas.route('molecule', parent.id);
  assert.match(before, /id="ev-pk-formulation"/, 'Multiple formulations must have a visible contextual selector');
  change({id:'ev-pk-formulation', value:immediate.id, dataset:{pkMolecule:parent.id}});
  const switched = atlas.route('molecule', parent.id);
  assert.ok(switched.includes('data-pk-context="' + immediate.id + '"'));
  assert.ok(facts(switched).includes(escapeText(immediate.metrics.bioavailability.summary)), 'Changing formulation must change the displayed value');
  assert.ok(!facts(switched).includes('77%'), 'The ER value must disappear from an IR summary');
  assert.equal(reviewedProfile(tartrate, dataset).id, immediate.id, 'Changing the parent selector cannot change the tartrate identity');
  assert.doesNotMatch(atlas.route('molecule', tartrate.id), /id="ev-pk-formulation"/, 'A single applicable product must not offer incompatible formulations');
  assert.doesNotMatch(facts(atlas.route('molecule', fumarate.id)), /77%/, 'The old parent editorial fallback must not reintroduce an ER value for fumarate');

  // A comparison row must lead to the formulation it describes, independent of the parent selector.
  const metoprololFamily = read('data/editorial.json').drugs.find(drug => drug.chembl === parent.id).family;
  const comparisonRows = [...atlas.route('compare', metoprololFamily).matchAll(/<tr>[\s\S]*?<\/tr>/g)].map(match => match[0]);
  for (const [profile, molecule] of [[immediate, tartrate], [extended, succinate]]) {
    const rows = comparisonRows.filter(row => row.includes(escapeText(profile.formulation)));
    assert.equal(rows.length, 1, 'Each reviewed formulation must have exactly one comparison row: ' + profile.id);
    assert.ok(rows[0].includes('href="#/molecule/' + molecule.id + '"'), 'The comparison must open the exact salt it describes: ' + profile.id);
    assert.ok(atlas.route('molecule', molecule.id).includes('data-pk-context="' + profile.id + '"'), 'Following the comparison link must retain its PK context');
  }

  const labelPath = 'data/verified/' + read('data/verified/index.json').molecules.CHEMBL13.label.file;
  failedSourcePaths.add(fileURLToPath(new URL('../' + labelPath, import.meta.url)));
  change({id:'ev-pk-formulation', value:extended.id, dataset:{pkMolecule:parent.id}});
  openSection(parent.id, 'adme');
  atlas.route('molecule', parent.id);
  await new Promise(resolve => setTimeout(resolve, 15));
  const unavailableSource = atlas.route('molecule', parent.id);
  assert.ok(facts(unavailableSource).includes(escapeText(extended.metrics.halfLife.summary)), 'Network failure must retain the reviewed, sourced PK value');
  assert.doesNotMatch(facts(unavailableSource), /Vedi fonte PK|Dato non normalizzato/, 'A source download failure is not an unreviewed or absent value');
  assert.match(unavailableSource, /Dati non caricati|Fonte non caricata/, 'The failed source request must remain explicit');

  // Levetiracetam has no legacy editorial label that could accidentally supply the missing link.
  const levetiracetamSource = levetiracetam.sourceIds.map(id => sources.get(id)).find(source => source.localFile);
  assert.ok(levetiracetamSource, 'The source-link regression needs the reviewed levetiracetam product document');
  failedSourcePaths.add(fileURLToPath(new URL('../' + levetiracetamSource.localFile, import.meta.url)));
  openSection('CHEMBL1286', 'dosage');
  atlas.route('molecule', 'CHEMBL1286');
  await new Promise(resolve => setTimeout(resolve, 15));
  const unavailableDosage = sectionHTML(atlas.route('molecule', 'CHEMBL1286'), 'CHEMBL1286', 'dosage');
  assert.match(unavailableDosage, /Dati non caricati|Fonte non caricata/, 'The dosage-source failure must remain explicit');
  assert.ok(unavailableDosage.includes('href="' + escapeText(levetiracetamSource.url) + '"'), 'The selected official source link must survive a failed local source download');

  // Failure of the optional PK enrichment must not hide the catalog or existing molecule sheets.
  failedSourcePaths.add(fileURLToPath(new URL('../data/pk-reviewed.json', import.meta.url)));
  let fallbackLoaded;
  const fallbackReady = new Promise(resolve => {fallbackLoaded = resolve;});
  const fallbackAtlas = createEvidenceAtlas({refresh() {fallbackLoaded();}, legacyDrugs:[]});
  await fallbackReady;
  const fallbackCatalog = fallbackAtlas.route('atlas');
  const fallbackSheet = fallbackAtlas.route('molecule', 'CHEMBL1286');
  assert.match(fallbackCatalog, /id="ev-search"/, 'A failed PK enrichment must retain the usable catalog');
  assert.doesNotMatch(fallbackCatalog + fallbackSheet, /Catalogo non disponibile/, 'A PK-only fetch failure must not become a catalog failure');
  assert.equal((fallbackSheet.match(/data-ev-section=/g) || []).length, 6, 'A PK-only fetch failure must preserve the existing sheet sections');
  assert.ok(facts(fallbackSheet), 'A PK-only fetch failure must retain the compact sheet summary');
  for (const [view, html] of [['catalog', fallbackCatalog], ['molecule', fallbackSheet]]) {
    const notices = [...html.matchAll(/<([a-z][\w-]*)\b[^>]*\brole="(?:status|alert)"[^>]*>([\s\S]*?)<\/\1>/gi)].map(match => compact(match[2].replace(/<[^>]*>/g, ' ')));
    assert.ok(notices.some(text => /\bPK\b|farmacocinetic/i.test(text) && /non.{0,80}(?:caric|disponibil|riuscit)|indisponibil|errore|fallit/i.test(text)), 'The unavailable PK enrichment must be disclosed in the ' + view + ' view');
  }
} finally {
  globalThis.fetch = original.fetch;
  globalThis.document = original.document;
  globalThis.location = original.location;
}

console.log('REVIEWED_PK_PASS', JSON.stringify({profiles:dataset.profiles.length, boundIdentities:boundIds.size, metrics:metricsChecked, localExcerpts:excerptsChecked, exactFormulationBindings:true, atlasSelector:true, reviewedSaltFilter:true, specificPKBadges:true, comparisonSaltNavigation:true, sourceFailureRetainsSummary:true, sourceFailureRetainsLink:true, pkDatasetFailureRetainsAtlas:true}));
