"""Build source-bound Italian display names and product PK summaries.
No network I/O. Does not mutate ChEMBL identities, AIFA rows or original SPL labels.
Name labels require an explicit map or corroborated single-substance ATC terminology;
chemical forms and prodrugs are never inferred from the ATC code alone.
PK fields are an explicit editorial selection, not a 'first number' extractor.
"""
from pathlib import Path
import json,re,unicodedata,hashlib,difflib,collections
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'data/presentation'; OUT.mkdir(parents=True,exist_ok=True)
def load(p):return json.loads((ROOT/p).read_text())
def norm(s):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFD',str(s).lower()))
def sentence(s):return re.split(r'(?<=[.!?])\s+(?=[A-Z(\[])',s)
def pretty(s):
 s=re.sub(r'\s+',' ',s.strip()).lower()
 s=re.sub(r'\bvit\s+([a-z])(\d*)\b',lambda m:'vit. '+m[1].upper()+m[2],s)
 s=re.sub(r'\b(ig[agm]|dna|rna|hiv|hcv|fdg)\b',lambda m:m[0].upper(),s,flags=re.I)
 return s[:1].upper()+s[1:]
def hash_text(s):return hashlib.sha256(s.encode()).hexdigest()
cat=load('data/catalog.json'); mols=cat['molecules']; byid={m['id']:m for m in mols}
manual=json.loads((ROOT/'italian-names.js').read_text().split('Object.freeze(')[1].split(');')[0])
# These are separate chemical entities, not interchangeable ATC labels.
BLOCKED={'CHEMBL866','CHEMBL1164729','CHEMBL2108106','CHEMBL3545189','CHEMBL4802224','CHEMBL2109092','CHEMBL2108890','CHEMBL1200370','CHEMBL1626223','CHEMBL1482','CHEMBL1060','CHEMBL4650246','CHEMBL1201304','CHEMBL1525826'}
BAD_LABEL=re.compile(r'associaz|\bass\.|combination|\baltri?\b|\baltre?\b|preparati|derivati|estratti?|vaccin|immunoglobulin|enzimi |trigliceridi|\bcompless|\bsoluzion|^alcaloidi|\bcomposti|\+|\bed\b|\be\b',re.I)
MODIFIERS={'hydrochloride':'cloridrato','hydrobromide':'bromidrato','sulfate':'solfato','sulphate':'solfato','maleate':'maleato','fumarate':'fumarato','succinate':'succinato','tartrate':'tartrato','mesylate':'mesilato','besylate':'besilato','acetate':'acetato','sodium':'sodio','potassium':'potassio','calcium':'calcio','phosphate':'fosfato','nitrate':'nitrato','chloride':'cloruro','bromide':'bromuro','hydrate':'idrato','monohydrate':'monoidrato','dihydrate':'diidrato','trihydrate':'triidrato','anhydrous':'anidro','hydrogen':'idrogeno','isethionate':'isetionato','tosylate':'tosilato','embonate':'embonato','pamoate':'pamoato','farnesil':'farnesil','palmitate':'palmitato','decanoate':'decanoato','mofetil':'mofetile','etexilate':'etexilato','dimesylate':'dimesilato','medoxomil':'medoxomil'}
MODIFIERS.update({'propionate':'propionato','dipropionate':'dipropionato','diacetate':'diacetato','carbamate':'carbammato','furoate':'furoato','etabonate':'etabonato','dimeglumine':'dimeglumina','meglumine':'meglumina','valerate':'valerato','caproate':'caproato','cypionate':'cipionato','butyrate':'butirrato','acetonide':'acetonide','dipivoxil':'dipivoxil','pivoxil':'pivoxil'})
def mods(s):
 n=' '+s.lower()+' '
 return {it for en,it in MODIFIERS.items() if re.search(r'\b'+re.escape(en)+r'\b',n) or re.search(r'\b'+re.escape(it)+r'\b',n)}
rows={}; excluded=[]
for m in mols:
 raw=m['name']; label=m.get('atcItalianLabel','')
 if raw in manual:
  rows[m['id']]={'name':manual[raw],'method':'explicit','reference':'italian-names.js','original':raw};continue
 if m['parent']!=m['id'] or not label or m['id'] in BLOCKED or BAD_LABEL.search(label):continue
 # ATC nomenclature is not used to rename an acid as a prodrug, or a base as a salt.
 if mods(raw)!=mods(label):excluded.append(m['id']);continue
 ratio=difflib.SequenceMatcher(None,norm(raw),norm(label)).ratio()
 exactAlias=norm(label) in {norm(x) for x in [raw,*m['aliases']]}
 if not exactAlias and ratio<.70:continue
 # Keep radionuclides, ester names and category-wide biological labels conservative.
 if re.search(r'\b[FI] ?\d{2,3}|TECHNETIUM|RADIO|EXTRACT|IMMUN|VACCIN',raw,re.I):continue
 rows[m['id']]={'name':pretty(label),'method':'atc-correspondence','reference':'https://drive.aifa.gov.it/farmaci/atc.csv','atc':m['atc'],'original':raw,'sourceLabel':label}
# Named forms: only an exact parent + explicitly recognized modifier in the record name.
# Never strip stereochemical prefixes, merge prodrugs, or replace a counterion by a synonym.
for m in mols:
 if m['id'] in rows or m['parent']==m['id']:continue
 parent=byid.get(m['parent']);base=rows.get(m['parent'])
 if not parent or not base:continue
 raw=m['name'];p=parent['name'];suffix=None
 if raw.startswith(p+' '):suffix=raw[len(p):].strip()
 elif raw.endswith(' '+p):suffix=raw[:-len(p)].strip()
 if not suffix:continue
 tokens=suffix.lower().split()
 if not tokens or not all(t in MODIFIERS for t in tokens):continue
 # base itself must not already denote a different salt
 if mods(p):continue
 modifier=' '.join(MODIFIERS[t] for t in tokens)
 rows[m['id']]={'name':base['name']+' '+modifier,'method':'explicit-form-translation','reference':'https://www.ebi.ac.uk/chembl/explore/compound/'+m['id'],'parent':m['parent'],'original':raw,'modifier':suffix}
# A typographic fallback remains international, never labelled as a verified Italian name.
name_data={'version':'0.12','generated':'2026-10-22','scope':'Nomenclatura di visualizzazione; identità ChEMBL, sali, esteri e sorgenti inalterati. ATC usato solo con corrispondenza nominale e forma compatibile.','records':rows,'counts':dict(collections.Counter(r['method'] for r in rows.values()))}
(OUT/'names-it.json').write_text(json.dumps(name_data,ensure_ascii=False,separators=(',',':'))+'\n')
print('NAMES',len(rows),name_data['counts'])

# Product-level curated quantities: retain exact supporting original sentence and version.
SPEC=load('data/presentation/pk-review.json')
idx=load('data/verified/index.json'); dossiers={};numeric=collections.Counter()
for file in sorted(set(v['label']['file'] for v in idx['molecules'].values() if v.get('label'))):
 d=load('data/verified/'+file);texts={sec:' '.join(d['sections'].get(sec,[])) for sec in ['pharmacokinetics','clinical_pharmacology']}
 raw=' '.join(texts.values());fields={}
 for key,val in SPEC.get(d['moleculeFamily'],{}).items():
  if key.startswith('_'):continue
  evidence=val['evidence'];sec=evidence['section'];text=texts[sec]
  assert hash_text(text)==SPEC[d['moleculeFamily']]['_sourceHashes'][sec], (d['moleculeFamily'],'source section changed')
  assert 0<=evidence['start']<evidence['end']<=len(text),'invalid evidence range'
  quote=text[evidence['start']:evidence['end']]
  fields[key]={**val,'quote':quote,'section':sec,'quoteHash':hash_text(quote)}
  if re.search(r'\d',val['value']):numeric[key]+=1
 dossiers[file]={'family':d['moleculeFamily'],'file':file,'product':d['product'],'source':d['source'],'effectiveDate':d['effectiveDate'],'retrieved':d['retrieved'],'setId':d['setId'],'version':d.get('version'),'fields':fields,'clinicalPharmacologyPresent':bool(raw),'context':SPEC.get(d['moleculeFamily'],{}).get('_context','Valori del prodotto selezionato; non trasferibili automaticamente ad altre formulazioni.'),'reviewed':'2026-10-22'}
data={'version':'0.12','scope':'Riepiloghi di prodotto, non valori universali della molecola; quote originali per ogni campo.','products':dossiers,'counts':{'products':len(dossiers),'withQuantities':sum(bool(x['fields']) for x in dossiers.values()),'numericFields':dict(numeric)}}
(OUT/'pk-products.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
print('PK',data['counts'])

# Supplementary source dossiers stay whole and separately labelled: no cross-product numeric merge.
data['supplementary']=load('data/presentation/supplementary-pk.json')['products']
(OUT/'pk-products.json').write_text(json.dumps(data,ensure_ascii=False,separators=(',',':'))+'\n')
