"""ELIX 0.8: reproducible acquisition, not generated pharmacological numbers.
Public sources: EMBL-EBI ChEMBL, AIFA open CSVs, FDA SPL API.
Never infer a price, dose, binding affinity, identity or clinical outcome.
"""
import csv, io, json, re, time, hashlib, math, unicodedata, urllib.request, urllib.parse, urllib.error
from collections import defaultdict, Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'verified'
CACHE = Path('/tmp/elix-verified-cache')
OUT.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)
NOW = datetime.now(timezone.utc).isoformat()
DAY = NOW[:10]
BASE = 'https://www.ebi.ac.uk/chembl/api/data/'
PRICE_URL = 'https://www.aifa.gov.it/documents/20142/825643/Lista_farmaci_equivalenti.csv'
PRODUCT_URL = 'https://drive.aifa.gov.it/farmaci/confezioni_fornitura.csv'
report = {'retrieved': NOW, 'sources': {}, 'errors': [], 'selection': {}, 'counts': {}}


def norm(value):
    # Preserve punctuation and stereochemical signs. Do not remove salts.
    return re.sub(r'\s+', ' ', unicodedata.normalize('NFKC', str(value or '')).strip()).upper()


def save(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')


def download(url):
    key = hashlib.sha256(url.encode()).hexdigest()
    body_path, meta_path = CACHE / key, CACHE / (key + '.json')
    if body_path.exists() and meta_path.exists():
        return body_path.read_bytes(), json.loads(meta_path.read_text())
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'ELIX source-aware educational pharmacology/0.8', 'Accept': 'application/json,text/csv,*/*'})
            with urllib.request.urlopen(req, timeout=70) as response:
                raw = response.read()
                meta = {'url': url, 'resolvedUrl': response.url, 'sha256': hashlib.sha256(raw).hexdigest(), 'bytes': len(raw), 'lastModified': response.headers.get('Last-Modified'), 'contentType': response.headers.get('Content-Type'), 'retrieved': NOW}
            body_path.write_bytes(raw)
            meta_path.write_text(json.dumps(meta))
            return raw, meta
        except urllib.error.HTTPError as exc:
            if exc.code == 404: raise
            if attempt == 3: raise
            time.sleep(3 * (attempt + 1))
        except Exception:
            if attempt == 3: raise
            time.sleep(2 * (attempt + 1))
    raise RuntimeError('Download exhausted retries')


def get_json(url):
    raw, meta = download(url)
    return json.loads(raw), meta


def decode(raw):
    for encoding in ('utf-8-sig', 'cp1252', 'latin1'):
        try:
            value = raw.decode(encoding)
            if '\x00' not in value: return value
        except UnicodeError: pass
    raise ValueError('Unsupported CSV encoding')


def csv_source(url):
    raw, meta = download(url)
    text = decode(raw)
    lines = text.splitlines()
    # AIFA CSVs can contain preamble rows. Identify an actual AIC header.
    candidates = []
    for i, line in enumerate(lines[:50]):
        if 'AIC' in line.upper():
            for sep in (';', '|', '\t', ','):
                if line.count(sep) >= 3: candidates.append((line.count(sep), -i, sep, i))
    if not candidates:
        report['errors'].append({'source': url, 'error': 'CSV AIC header not recognized', 'contentType': meta['contentType'], 'firstBytes': text[:2500]})
        return [], meta
    _, _, sep, start = max(candidates)
    rows = list(csv.DictReader(io.StringIO('\n'.join(lines[start:])), delimiter=sep))
    clean = [{str(k).strip().lstrip('\ufeff'): (v or '').strip() for k, v in row.items() if k is not None} for row in rows]
    meta.update({'headers': list(clean[0]) if clean else [], 'rows': len(clean), 'delimiter': sep})
    return clean, meta


def error(scope, exc):
    report['errors'].append({'source': scope, 'error': str(exc)[:350]})
    print('SOURCE_ERROR', scope, str(exc)[:250], flush=True)


def parallel(items, worker, workers=4):
    out = []
    with ThreadPoolExecutor(max_workers=workers) as pool:
        tasks = {pool.submit(worker, x): x for x in items}
        for i, future in enumerate(as_completed(tasks)):
            try:
                result = future.result()
                if result is not None: out.append(result)
            except Exception as exc: error(str(tasks[future]), exc)
            if (i + 1) % 25 == 0: print('progress', i + 1, '/', len(tasks), flush=True)
    return out


def lookup_batch(endpoint, ids, field, key):
    ids = sorted(set(ids))
    chunks = [ids[i:i+35] for i in range(0, len(ids), 35)]
    def worker(chunk):
        params = {field + '__in': ','.join(chunk), 'limit': 1000}
        url = BASE + endpoint + '.json?' + urllib.parse.urlencode(params)
        data, _ = get_json(url)
        return data.get(key, [])
    rows = parallel(chunks, worker)
    return {row[field]: row for chunk in rows for row in chunk}


catalog = json.loads((ROOT / 'data/catalog.json').read_text())
editorial = json.loads((ROOT / 'data/editorial.json').read_text())
registry = json.loads((ROOT / 'data/registry.json').read_text())
molecules = catalog['molecules']
by_id = {m['id']: m for m in molecules}
families = defaultdict(list)
name_to_parents = defaultdict(set)
for m in molecules:
    parent = m.get('parent') or m['id']
    families[parent].append(m)
    for name in [m['name']] + m.get('aliases', []): name_to_parents[norm(name)].add(parent)
it_text = (ROOT / 'italian-names.js').read_text()
match = re.search(r'Object\.freeze\((\{[\s\S]*?\})\);', it_text)
italian = json.loads(match.group(1)) if match else {}
for en, it in italian.items():
    if len(name_to_parents.get(norm(en), set())) == 1:
        name_to_parents[norm(it)].update(name_to_parents[norm(en)])
# Previously curated Italian names are additional explicit aliases, not ATC inference.
for d in editorial['drugs']:
    if d.get('chembl') in by_id:
        name_to_parents[norm(d['name'])].add(by_id[d['chembl']].get('parent') or d['chembl'])
for parent, reg in registry['records'].items():
    for row in reg.get('IT', []):
        if row.get('ingredient'): name_to_parents[norm(row['ingredient'])].add(parent)

index = {'schemaVersion': 1, 'retrieved': NOW, 'molecules': {}, 'sources': {}, 'counts': {}}

def entry(mid):
    return index['molecules'].setdefault(mid, {})

# ---------------- AIFA prices and exact package data ----------------
try:
    price_rows, price_meta = csv_source(PRICE_URL)
    report['sources']['aifaPrices'] = price_meta
    report['priceSample'] = price_rows[:2]
    products, product_meta = csv_source(PRODUCT_URL)
    report['sources']['aifaProducts'] = product_meta
    def col(row, *patterns):
        for pattern in patterns:
            for key, value in row.items():
                if re.search(pattern, key, re.I): return value
        return None
    def aic(value):
        digits = re.sub(r'\D', '', value or '')
        return digits.zfill(9) if 5 <= len(digits) <= 9 else None
    def euros(value):
        if value is None or not str(value).strip(): return None
        text = str(value).replace('€', '').replace('\u00a0', '').replace(' ', '').strip()
        if ',' in text: text = text.replace('.', '').replace(',', '.')
        try:
            number = float(text)
            return round(number, 2) if math.isfinite(number) and number >= 0 else None
        except ValueError: return None
    price_by_aic = {}
    for row in price_rows:
        code = aic(col(row, r'^AIC$', r'CODICE.*AIC', r'COD.*AIC'))
        if not code: continue
        public = euros(col(row, r'PREZZO.*PUBB', r'PREZZO.*VEND', r'^PREZZO$'))
        reference = euros(col(row, r'PREZZO.*RIF', r'PREZZO.*SSN', r'RIMBORS', r'PREZZO.*MASSIMO'))
        difference = euros(col(row, r'DIFFEREN'))
        if public is None and reference is None: continue
        price_by_aic[code] = {'aic': code, 'publicPriceEUR': public, 'referencePriceEUR': reference, 'differenceEUR': difference, 'sourceFields': row}
    market = defaultdict(list)
    seen = set()
    for row in products:
        code = aic(row.get('CODICE_AIC'))
        if code not in price_by_aic or code in seen: continue
        ingredient = row.get('PA_ASSOCIATI', '')
        # Exact, unambiguous family match; no splitting of combination medicines.
        candidates = name_to_parents.get(norm(ingredient), set())
        if len(candidates) != 1: continue
        parent = next(iter(candidates))
        if parent not in families: continue
        seen.add(code)
        p = dict(price_by_aic[code])
        p.update({'name': row.get('DENOMINAZIONE'), 'ingredient': ingredient, 'form': row.get('DESCRIZIONE'), 'supply': row.get('FORNITURA'), 'status': row.get('STATO_AMMINISTRATIVO'), 'atc': row.get('CODICE_ATC'), 'rcp': row.get('LINK_RCP'), 'match': 'AIC esatto; sostanza italiana associata univocamente alla famiglia ChEMBL, non al singolo sale.'})
        market[parent].append(p)
    for parent, rows in market.items():
        rows.sort(key=lambda p: (p['publicPriceEUR'] is None, p['publicPriceEUR'] or 0, p['name'] or '', p['aic']))
        payload = {'parent': parent, 'source': price_meta, 'scope': 'Lista di trasparenza AIFA. Non tutti i medicinali; importo per confezione, non costo per dose o trattamento. Il prezzo di riferimento non è necessariamente il prezzo pagato dal paziente.', 'packages': rows}
        file = 'market/' + parent + '.json'
        save(OUT / file, payload)
        vals = [r['publicPriceEUR'] for r in rows if r['publicPriceEUR'] is not None]
        entry(parent)['market'] = {'file': file, 'packages': len(rows), 'minPublicPriceEUR': min(vals) if vals else None, 'maxPublicPriceEUR': max(vals) if vals else None, 'matchLevel': 'parent-family'}
    report['counts'].update({'aifaSourcePackages': len(price_rows), 'aifaPricedPackages': len(price_by_aic), 'aifaLinkedPackages': len(seen), 'aifaLinkedFamilies': len(market)})
    print('AIFA', json.dumps(report['counts']), 'headers', price_meta.get('headers'), flush=True)
except Exception as exc: error('AIFA', exc)

# ----------- Representative, explicit selection: no claim of exhaustive coverage -----------
preferred = []
for d in editorial['drugs']:
    mid = d.get('chembl')
    if mid in by_id: preferred.append(by_id[mid].get('parent') or mid)
for en in italian:
    matches = name_to_parents.get(norm(en), set())
    if len(matches) == 1: preferred.append(next(iter(matches)))
# Broaden across therapeutic areas only using catalogue records with mechanisms.
for m in sorted(molecules, key=lambda m: (m.get('atc') or ['Z'])[0] + m['name']):
    if m['id'] == (m.get('parent') or m['id']) and m.get('mechanisms') and not m.get('veterinary') and registry['records'].get(m['id'], {}).get('IT'):
        preferred.append(m['id'])
selected = list(dict.fromkeys(mid for mid in preferred if mid in by_id))[:200]
report['selection'] = {'moleculesRequested': len(selected), 'maximumRawActivitiesPerMolecule': 160, 'method': '37 curated profiles, explicit Italian nomenclature, then additional marketed single-ingredient families with mechanisms. Deterministic activity_id order; not ranked by affinity. All truncation is declared.', 'ids': selected}
print('SELECTED', len(selected), flush=True)

# ---------------- Measured activities ----------------
try:
    status, status_meta = get_json(BASE + 'status.json')
    report['sources']['chembl'] = {'url': BASE, 'version': status.get('chembl_db_version'), 'release': status.get('chembl_release_date'), 'retrieved': NOW, 'license': 'CC BY-SA 3.0', 'licenseUrl': 'https://creativecommons.org/licenses/by-sa/3.0/'}
    def activity_worker(mid):
        params = {'molecule_chembl_id': mid, 'standard_type__in': 'Ki,Kd,IC50,EC50', 'standard_units': 'nM', 'standard_flag': 1, 'target_organism': 'Homo sapiens', 'src_id': 1, 'limit': 160, 'order_by': 'activity_id'}
        url = BASE + 'activity.json?' + urllib.parse.urlencode(params)
        data, meta = get_json(url)
        return mid, data.get('activities', []), data.get('page_meta', {}).get('total_count', 0), meta
    datasets = parallel(selected, activity_worker)
    quality_rejected = Counter()
    candidates = []
    source_by_molecule = {}
    for mid, rows, total, meta in datasets:
        source_by_molecule[mid] = {'request': meta, 'sourceTotal': total, 'retrievedRows': len(rows), 'truncated': total > len(rows)}
        for row in rows:
            reason = None
            if row.get('data_validity_comment') not in (None, '', 'Manually validated'): reason = 'validityFlag'
            elif row.get('potential_duplicate'): reason = 'potentialDuplicate'
            elif row.get('standard_relation') not in ('=', '<', '>', '<=', '>='): reason = 'unsupportedRelation'
            elif row.get('type') not in ('Ki', 'Kd', 'IC50', 'EC50'): reason = 'transformedOriginalEndpoint'
            elif row.get('standard_type') in ('Ki', 'Kd') and row.get('assay_type') != 'B': reason = 'notDirectBindingAssay'
            else:
                try:
                    if not math.isfinite(float(row['standard_value'])) or float(row['standard_value']) <= 0: reason = 'nonpositiveValue'
                except (ValueError, TypeError, KeyError): reason = 'missingValue'
            if reason: quality_rejected[reason] += 1
            else: candidates.append(row)
    print('CANDIDATES', len(candidates), 'initial rejects', dict(quality_rejected), flush=True)
    assays = lookup_batch('assay', [r['assay_chembl_id'] for r in candidates], 'assay_chembl_id', 'assays')
    kept = []
    for row in candidates:
        assay = assays.get(row['assay_chembl_id'])
        if not assay or assay.get('confidence_score') not in (7, 9):
            quality_rejected['notDirectTargetConfidence7or9'] += 1
            continue
        kept.append(row)
    docs = lookup_batch('document', [r['document_chembl_id'] for r in kept if r.get('document_chembl_id')], 'document_chembl_id', 'documents')
    targets = lookup_batch('target', [r['target_chembl_id'] for r in kept], 'target_chembl_id', 'targets')
    by_mol = defaultdict(list)
    for r in kept:
        a = assays[r['assay_chembl_id']]
        t = targets.get(r['target_chembl_id'], {})
        if t.get('target_type') not in ('SINGLE PROTEIN', 'PROTEIN COMPLEX'):
            quality_rejected['notSpecificProteinOrComplex'] += 1
            continue
        doc = docs.get(r.get('document_chembl_id'), {})
        record = {'id': r['activity_id'], 'molecule': r['molecule_chembl_id'], 'type': r['standard_type'], 'relation': r['standard_relation'], 'value': r['standard_value'], 'units': r['standard_units'], 'publishedType': r.get('type'), 'publishedValue': r.get('value'), 'publishedUnits': r.get('units'), 'publishedRelation': r.get('relation'), 'target': r['target_chembl_id'], 'targetName': r['target_pref_name'], 'targetType': t.get('target_type'), 'targetOrganism': r.get('target_organism'), 'assay': r['assay_chembl_id'], 'assayType': r['assay_type'], 'assayDescription': r.get('assay_description'), 'assayOrganism': a.get('assay_organism'), 'assayCell': a.get('assay_cell_type'), 'assayTissue': a.get('assay_tissue'), 'assayConfidence': a['confidence_score'], 'variant': r.get('assay_variant_mutation'), 'document': r.get('document_chembl_id'), 'journal': r.get('document_journal'), 'year': r.get('document_year'), 'doi': doc.get('doi'), 'pubmedId': doc.get('pubmed_id'), 'documentTitle': doc.get('title'), 'validity': r.get('data_validity_comment'), 'source': BASE + 'activity/' + str(r['activity_id']) + '.json'}
        by_mol[r['molecule_chembl_id']].append(record)
    for mid, rows in by_mol.items():
        rows.sort(key=lambda x: (x['targetName'], x['type'], x['id']))
        file = 'activities/' + mid + '.json'
        save(OUT / file, {'molecule': mid, 'retrieved': NOW, 'database': report['sources']['chembl'], 'scope': source_by_molecule[mid], 'records': rows})
        entry(mid)['activity'] = {'file': file, 'count': len(rows), 'binding': sum(x['type'] in ('Ki', 'Kd') for x in rows), 'functionalPotency': sum(x['type'] in ('IC50', 'EC50') for x in rows), 'targets': len(set(x['target'] for x in rows)), 'sourceTotal': source_by_molecule[mid]['sourceTotal'], 'truncated': source_by_molecule[mid]['truncated']}
    compact_targets = {}
    for tid, t in targets.items():
        compact_targets[tid] = {'id': tid, 'name': t.get('pref_name'), 'type': t.get('target_type'), 'organism': t.get('organism'), 'components': [{'accession': c.get('accession'), 'name': c.get('component_description'), 'genes': [s['component_synonym'] for s in c.get('target_component_synonyms', []) if s.get('syn_type') == 'GENE_SYMBOL']} for c in t.get('target_components', [])]}
    save(OUT / 'targets.json', {'source': report['sources']['chembl'], 'targets': compact_targets})
    report['counts'].update({'activityMolecules': len(by_mol), 'activityRecords': sum(len(x) for x in by_mol.values()), 'bindingRecords': sum(v['activity']['binding'] for v in index['molecules'].values() if v.get('activity')), 'activityTargets': len(set(r['target_chembl_id'] for r in kept)), 'activityDocuments': len(docs), 'activitiesRejected': dict(quality_rejected)})
    report['activitySamples'] = [r for rows in by_mol.values() for r in rows][:3]
    print('CHEMBL_COUNTS', json.dumps(report['counts']), flush=True)
except Exception as exc: error('ChEMBL import', exc)

# ---------------- Official submitted product labels ----------------
FIELDS = ['mechanism_of_action', 'pharmacodynamics', 'pharmacokinetics', 'clinical_pharmacology', 'indications_and_usage', 'dosage_and_administration', 'dosage_forms_and_strengths', 'contraindications', 'boxed_warning', 'warnings_and_cautions', 'warnings', 'adverse_reactions', 'drug_interactions', 'use_in_specific_populations', 'pregnancy', 'pediatric_use', 'geriatric_use', 'overdosage', 'clinical_studies', 'description']

def label_worker(mid):
    family = families[mid]
    names = list(dict.fromkeys([m['name'] for m in family]))[:8]
    allowed = set(norm(n) for m in family for n in [m['name']] + m.get('aliases', []))
    query = ' OR '.join('openfda.substance_name.exact:' + json.dumps(n) for n in names)
    url = 'https://api.fda.gov/drug/label.json?' + urllib.parse.urlencode({'search': '(' + query + ') AND openfda.product_type.exact:"HUMAN PRESCRIPTION DRUG"', 'limit': 8, 'sort': 'effective_time:desc'})
    try: data, meta = get_json(url)
    except urllib.error.HTTPError as exc:
        if exc.code == 404: return None
        raise
    valid = []
    for r in data.get('results', []):
        fda = r.get('openfda', {})
        substance = fda.get('substance_name', [])
        if len(substance) != 1 or norm(substance[0]) not in allowed: continue
        if not any(re.match(r'^(ANDA|NDA|BLA)\d', a) for a in fda.get('application_number', [])): continue
        if r.get('effective_time', '') > DAY.replace('-', ''): continue
        if not any(r.get(k) for k in ('pharmacokinetics', 'clinical_pharmacology', 'mechanism_of_action')): continue
        valid.append(r)
    if not valid: return None
    selected_label = max(valid, key=lambda r: (bool(r.get('pharmacokinetics')), bool(r.get('mechanism_of_action')), sum(bool(r.get(k)) for k in FIELDS), r.get('effective_time', '')))
    r, fda = selected_label, selected_label.get('openfda', {})
    sections = {k: r[k] for k in FIELDS if r.get(k)}
    # Preserve source sentences instead of guessing universal PK numbers from prose.
    paragraphs = sections.get('pharmacokinetics') or sections.get('clinical_pharmacology') or []
    sentences = [s.strip() for p in paragraphs for s in re.split(r'(?<=[.!?])\s+(?=[A-Z])', p)]
    expressions = {'halfLife': r'half[- ]life', 'bioavailability': r'bioavailab', 'proteinBinding': r'(protein.{0,25}bound|bound.{0,25}protein|protein.binding)', 'elimination': r'(excret|clearance|metaboliz|metabolis)'}
    excerpts = {key: [s for s in sentences if re.search(pattern, s, re.I) and 35 < len(s) < 1500][:3] for key, pattern in expressions.items()}
    result = {'moleculeFamily': mid, 'language': 'en', 'jurisdiction': 'US', 'setId': r['set_id'], 'splId': r.get('id'), 'version': r.get('version'), 'effectiveDate': r.get('effective_time'), 'retrieved': NOW, 'apiUpdated': data.get('meta', {}).get('last_updated'), 'source': 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=' + r['set_id'], 'request': meta, 'product': {'generic': fda.get('generic_name'), 'brand': fda.get('brand_name'), 'substance': substance, 'manufacturer': fda.get('manufacturer_name'), 'route': fda.get('route'), 'applications': fda.get('application_number')}, 'match': 'Famiglia di sostanza esatta; prodotto USA monocomponente. Non trasferire dati e dosi ad altri sali, vie o formulazioni.', 'sections': sections, 'pkSourceSentences': excerpts, 'limitation': 'Testo SPL fornito dal titolare e pubblicato tramite openFDA; non equivale a un RCP italiano né garantisce la versione presente nella confezione attuale. Tabelle e immagini non riprodotte.'}
    file = 'labels/' + mid + '.json'
    save(OUT / file, result)
    return mid, {'file': file, 'setId': r['set_id'], 'effectiveDate': r.get('effective_time'), 'source': result['source'], 'product': result['product'], 'sections': list(sections), 'pkExcerptCount': sum(len(x) for x in excerpts.values())}

labels = parallel(selected, label_worker, workers=3)
for mid, data in labels: entry(mid)['label'] = data
report['counts'].update({'productLabels': len(labels), 'labelSections': sum(len(x['sections']) for _, x in labels), 'pkSourceSentences': sum(x['pkExcerptCount'] for _, x in labels), 'moleculesWithData': len(index['molecules'])})
report['sources']['fda'] = {'url': 'https://open.fda.gov/apis/drug/label/', 'retrieved': NOW, 'language': 'en', 'note': 'SPL submitted product labeling; no automatic clinical validation, no cross-product dose inference.'}
index['sources'] = report['sources']
index['counts'] = report['counts']
index['limits'] = {'notExhaustive': True, 'activitiesPerMoleculeRequestCap': 160, 'selectedMolecules': len(selected), 'priceScope': 'AIFA transparency list only; package level', 'clinicalInterpretation': 'No Ki/Kd/IC50/EC50 averaging across assays. No conversion of these measurements to dose or clinical NNT.', 'identity': 'Activities stay on exact molecule IDs; prices and product labels are grouped at parent-family level with explicit qualifiers.'}
save(OUT / 'index.json', index)
save(OUT / 'report.json', report)
print('FINAL_REPORT', json.dumps(report['counts'], ensure_ascii=False), flush=True)
print('IMPORT_ERRORS', len(report['errors']), flush=True)
assert report['counts'].get('activityRecords', 0) >= 500, 'Insufficient ChEMBL activity coverage: inspect report'
assert report['counts'].get('productLabels', 0) >= 35, 'Insufficient FDA label coverage: inspect report'
