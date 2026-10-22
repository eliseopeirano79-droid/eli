"""Temporary exact-source patch applicator; removed after validation.
No network, credentials, external execution or main-branch writes.
"""
from pathlib import Path
import base64,hashlib,json,lzma,os
ROOT=Path(__file__).resolve().parent.parent
assert os.environ.get('GITHUB_REF_NAME')=='feature/elix-12-italian-names-pk-summary'
assert os.environ.get('GITHUB_REPOSITORY')=='eliseopeirano79-droid/PHARMA'
encoded=''.join((ROOT/'scripts'/('.presentation-payload-%02d'%i)).read_text().strip() for i in range(6))
raw=lzma.decompress(base64.b64decode(encoded,validate=True))
assert hashlib.sha256(raw).hexdigest()=='f6a8d44d05fbddb1edd01bd7d5868353f9798f0acb3433c17f455272570125ce','Payload checksum mismatch'
changes=json.loads(raw);assert len(changes)==15
checked=[]
for item in changes:
 path=(ROOT/item['path']).resolve()
 assert path.is_relative_to(ROOT) and not any(x in path.relative_to(ROOT).parts for x in ['.git','.github']),'Unsafe target'
 old=path.read_text() if path.exists() else ''
 if item['old'] is None:assert not path.exists(),'New path already exists: '+item['path']
 else:assert hashlib.sha256(old.encode()).hexdigest()==item['old'],'Baseline changed: '+item['path']
 last=0
 for start,end,value in item['edits']:
  assert 0<=last<=start<=end<=len(old),'Unsafe offset'
  last=end
 new=old
 for start,end,value in reversed(item['edits']):new=new[:start]+value+new[end:]
 assert hashlib.sha256(new.encode()).hexdigest()==item['new'],'New source checksum mismatch: '+item['path']
 checked.append((path,new))
for path,new in checked:
 path.parent.mkdir(parents=True,exist_ok=True);path.write_text(new)
print('PRESENTATION_PATCH_APPLIED',json.dumps([str(p.relative_to(ROOT)) for p,_ in checked]))
