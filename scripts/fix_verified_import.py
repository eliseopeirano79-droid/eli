"""Check live API capabilities before requesting all selected molecules."""
import json, re, urllib.request, urllib.parse, urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'scripts/import_verified_data.py'
code=source.read_text()
base={'molecule_chembl_id':'CHEMBL27','standard_type__in':'Ki,Kd,IC50,EC50','limit':2}
extras={'standard_units':'nM','standard_flag':1,'target_organism':'Homo sapiens','src_id':1,'order_by':'activity_id'}
accepted={}
audit={}
for key,value in extras.items():
    query=dict(base,**{key:value})
    url='https://www.ebi.ac.uk/chembl/api/data/activity.json?'+urllib.parse.urlencode(query)
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'ELIX API compatibility check'})
        with urllib.request.urlopen(req,timeout=40) as response:
            data=json.load(response)
        assert 'activities' in data
        accepted[key]=value
        audit[key]={'accepted':True,'records':data.get('page_meta',{}).get('total_count')}
    except urllib.error.HTTPError as exc:
        audit[key]={'accepted':False,'status':exc.code,'body':exc.read().decode('utf-8',errors='replace')[:1200]}
    print('PREFLIGHT',key,json.dumps(audit[key]),flush=True)
params={'standard_type__in':'Ki,Kd,IC50,EC50','limit':160,**accepted}
pattern=r"        params = \{'molecule_chembl_id': mid[^\n]+\}"
replacement='        params = dict('+repr(params)+', molecule_chembl_id=mid)'
code,count=re.subn(pattern,lambda _:replacement,code)
assert count==1, 'Activity request anchor moved'
code=code.replace("if exc.code == 404: raise", "if exc.code in (400, 404): raise")
code=code.replace("if row.get('data_validity_comment') not in", "if row.get('target_organism') != 'Homo sapiens' or row.get('src_id') != 1 or row.get('standard_units') != 'nM' or row.get('standard_flag') != 1: reason = 'sourceScopeMismatch'\n            elif row.get('data_validity_comment') not in")
code=code.replace("'substance': substance", "'substance': fda.get('substance_name', [])")
code=code.replace('Deterministic activity_id order; not ranked by affinity.', 'API result order; not ranked by affinity. Query capabilities checked before acquisition.')
code=code.replace("'activityTargets': len(set(r['target_chembl_id'] for r in kept))", "'activityTargets': len(set(r['target'] for rows in by_mol.values() for r in rows))")
code=code.replace("'activityDocuments': len(docs)", "'activityDocuments': len(set(r['document'] for rows in by_mol.values() for r in rows if r['document']))")
# Persist the checked query and method for reproducibility; imported files retain the resolved URLs.
source.write_text(code)
output=ROOT/'data/verified/query-capabilities.json';output.parent.mkdir(exist_ok=True,parents=True)
output.write_text(json.dumps(audit,ensure_ascii=False,indent=2))
exec(compile(code,str(source),'exec'),{'__file__':str(source),'__name__':'__main__'})
