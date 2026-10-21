"""ELIX: inspect public primary-source schemas. No inferred clinical values."""
import csv, io, json, time, urllib.request, urllib.parse
from datetime import datetime, timezone
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'data' / 'verified'
OUT.mkdir(parents=True, exist_ok=True)

def get(url):
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'ELIX educational pharmacology data import', 'Accept': '*/*'})
            with urllib.request.urlopen(request, timeout=70) as response:
                return response.read(), dict(response.headers)
        except Exception:
            if attempt == 2: raise
            time.sleep(2 + attempt * 3)

def text(raw):
    for encoding in ['utf-8-sig', 'utf-16', 'cp1252', 'latin1']:
        try:
            s = raw.decode(encoding)
            if '\x00' not in s: return s, encoding
        except (UnicodeError, LookupError): pass
    raise ValueError('Unsupported text encoding')

sources = {
 'aifa_prices': 'https://www.aifa.gov.it/documents/20142/825643/Lista_farmaci_equivalenti.csv',
 'aifa_ingredients': 'https://drive.aifa.gov.it/farmaci/PA_confezioni.csv',
 'chembl_activity': 'https://www.ebi.ac.uk/chembl/api/data/activity.json?molecule_chembl_id=CHEMBL27&standard_type__in=Ki,Kd,IC50,EC50&limit=2',
 'chembl_status': 'https://www.ebi.ac.uk/chembl/api/data/status.json',
 'fda_label': 'https://api.fda.gov/drug/label.json?search=openfda.generic_name.exact:%22METFORMIN%20HYDROCHLORIDE%22&limit=1'
}
probe = {'retrieved': datetime.now(timezone.utc).isoformat(), 'sources': {}}
for key, url in sources.items():
    try:
        raw, headers = get(url)
        if key.startswith('aifa'):
            value, encoding = text(raw)
            dialect = csv.Sniffer().sniff(value[:6000], delimiters=';|,\t')
            rows = list(csv.DictReader(io.StringIO(value), dialect=dialect))
            result = {'url': url, 'rows': len(rows), 'encoding': encoding, 'separator': dialect.delimiter, 'headers': list(rows[0]) if rows else [], 'sample': rows[:3], 'modified': headers.get('Last-Modified')}
        else:
            data = json.loads(raw)
            if key == 'fda_label':
                label = data['results'][0]
                result = {'url': url, 'meta': data.get('meta'), 'keys': list(label), 'openfda': label.get('openfda'), 'effective_time': label.get('effective_time'), 'set_id': label.get('set_id')}
            else: result = {'url': url, 'data': data}
        probe['sources'][key] = result
        print(key, json.dumps(result, ensure_ascii=False)[:1600], flush=True)
    except Exception as exc:
        probe['sources'][key] = {'url': url, 'error': str(exc)}
        print('SOURCE_ERROR', key, str(exc), flush=True)
(OUT / 'source-probe.json').write_text(json.dumps(probe, ensure_ascii=False, indent=2), encoding='utf-8')
