"""Temporary release helper: applies the locally tested, exact-source audit delta.
This helper and its payload are removed before the reviewed implementation is committed.
No fetched code is executed, no secrets read, no network calls, no branch rewrite.
"""
from pathlib import Path
import base64
import hashlib
import json
import lzma
import os

ROOT = Path(__file__).resolve().parent.parent
EXPECTED = '238132d74f6a498e42e31f11ee04255650d313a55451519887044b93bad9bf77'
assert os.environ.get('GITHUB_REF_NAME') == 'feature/elix-11-systematic-audit', 'Wrong branch'
assert os.environ.get('GITHUB_REPOSITORY') == 'eliseopeirano79-droid/PHARMA', 'Wrong repository'
parts = [ROOT / 'scripts' / ('.audit-payload-%02d' % n) for n in range(4)]
encoded = ''.join(p.read_text(encoding='utf-8').strip() for p in parts)
raw = lzma.decompress(base64.b64decode(encoded, validate=True))
assert hashlib.sha256(raw).hexdigest() == EXPECTED, 'Payload checksum mismatch'
changes = json.loads(raw)
assert len(changes) == 19, 'Unexpected file count'
checked = []
for change in changes:
    file = (ROOT / change['path']).resolve()
    assert file.is_relative_to(ROOT) and '.git' not in file.relative_to(ROOT).parts, 'Unsafe path'
    original = file.read_text(encoding='utf-8') if file.exists() else ''
    if change['old'] is None:
        assert not file.exists(), 'New file unexpectedly exists: ' + change['path']
    else:
        assert hashlib.sha256(original.encode()).hexdigest() == change['old'], 'Baseline changed: ' + change['path']
    last_end = 0
    for start, end, value in change['edits']:
        assert 0 <= last_end <= start <= end <= len(original), 'Invalid edit offsets'
        last_end = end
    updated = original
    for start, end, value in reversed(change['edits']):
        updated = updated[:start] + value + updated[end:]
    assert hashlib.sha256(updated.encode()).hexdigest() == change['new'], 'Result checksum mismatch: ' + change['path']
    checked.append((file, updated))
for file, updated in checked:
    file.parent.mkdir(parents=True, exist_ok=True)
    file.write_text(updated, encoding='utf-8')
print('AUDIT_DELTA_APPLIED', json.dumps([str(f.relative_to(ROOT)) for f, _ in checked]))
