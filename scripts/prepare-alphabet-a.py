# One-shot, deterministic integration; safe to repeat. No network or credential access.
from pathlib import Path
import json
r=Path(__file__).resolve().parents[1]
def change(path,old,new):
 p=r/path;s=p.read_text()
 if new in s:return
 assert old in s,(path,old)
 p.write_text(s.replace(old,new))
change('evidence-atlas.js',"import {ESSENTIAL_BATCH}","import {ALPHABET_A_BATCH} from './elix-alphabet-a.js';\nimport {ESSENTIAL_BATCH}")
change('evidence-atlas.js','appendContentBatches(ed,pkReviewed,ESSENTIAL_BATCH);','appendContentBatches(ed,pkReviewed,ESSENTIAL_BATCH);\n   appendContentBatches(ed,pkReviewed,ALPHABET_A_BATCH);')
change('elix-content-batches.js','Controllo editoriale ${CHECKED}.','Controllo editoriale ${esc(drug.checkedAt||CHECKED)}.')
change('sw.js','elix-alpha-0.12.5','elix-alpha-0.12.6')
p=r/'sw.js';s=p.read_text();s=s if './elix-alphabet-a.js' in s else s.replace("'./elix-essential-batch.js'","'./elix-essential-batch.js','./elix-alphabet-a.js'");assert './elix-alphabet-a.js' in s;p.write_text(s)
# Existing batch regression counts stay frozen; only live-renderer expectations move.
change('scripts/validate-content-batches.mjs',"import assert from 'node:assert/strict';","import assert from 'node:assert/strict';\nimport {ALPHABET_A_BATCH} from '../elix-alphabet-a.js';")
change('scripts/validate-content-batches.mjs',"assert.match(atlas.route('atlas'),/53 sintesi originali/);","assert.ok(atlas.route('atlas').includes((53+ALPHABET_A_BATCH.drugs.length)+' sintesi originali'));")
change('scripts/validate-content-batches.mjs',"assert.match(atlas.route('coverage'),/>23<\\/strong>/);assert.match(atlas.route('coverage'),/>138<\\/strong>/);","assert.ok(atlas.route('coverage').includes('>'+(23+ALPHABET_A_BATCH.profiles.length)+'</strong>'));assert.ok(atlas.route('coverage').includes('>'+(138+ALPHABET_A_BATCH.profiles.length*6)+'</strong>'));")
change('scripts/validate-catalog-material.mjs',"import {ESSENTIAL_BATCH}","import {ALPHABET_A_BATCH} from '../elix-alphabet-a.js';\nimport {ESSENTIAL_BATCH}")
marker='// Actual renderer: all catalog identities, all new six-section pages, bilingual exact lookup and filters.'
change('scripts/validate-catalog-material.mjs',marker,"// Add current batches only after the frozen essential-batch regression above.\nconst liveEditorial=structuredClone(editorial),livePK=structuredClone(pk);\nappendContentBatches(liveEditorial,livePK,ALPHABET_A_BATCH);\nconst liveReport=buildCatalogCoverage({catalog,editorial:liveEditorial,pk:livePK,index});\n"+marker)
change('scripts/validate-catalog-material.mjs',"[['editorial',53],['needs-editorial',4172],['source-to-review',123],['needs-pk',151]]","[['editorial',liveReport.counts.editorial],['needs-editorial',liveReport.counts.records-liveReport.counts.editorial],['source-to-review',liveReport.counts.labelWithoutEditorial],['needs-pk',liveReport.counts.labelWithoutPK]]")
change('scripts/validate-catalog-material.mjs','{checkedAt:ESSENTIAL_BATCH.checkedAt,...report}','{checkedAt:ALPHABET_A_BATCH.checkedAt,...liveReport}')
# Browser scripts now compare exact live totals, not stale release counters.
change('scripts/browser-content-batch.cjs',"assert.match(await page.locator('.ev-metrics').first().innerText(),/138/);","assert.ok((await page.locator('.ev-metrics').first().innerText()).includes(String(138+6*(await import('../elix-alphabet-a.js')).ALPHABET_A_BATCH.profiles.length)));")
change('scripts/browser-catalog-material.cjs',"const {ESSENTIAL_BATCH:batch}=await import('../elix-essential-batch.js');","const {ESSENTIAL_BATCH:batch}=await import('../elix-essential-batch.js');\n const {ALPHABET_A_BATCH:added}=await import('../elix-alphabet-a.js');\n const n=added.drugs.length,p=added.profiles.length;")
change('scripts/browser-catalog-material.cjs',"assert.match(await page.locator('[data-catalog-audit]').innerText(),/123/);","assert.ok((await page.locator('[data-catalog-audit]').innerText()).includes(String(123-n)));")
change('scripts/browser-catalog-material.cjs',"[['editorial',53],['needs-editorial',4172],['source-to-review',123],['needs-pk',151]]","[['editorial',53+n],['needs-editorial',4172-n],['source-to-review',123-n],['needs-pk',151-p]]")
p=r/'package.json';d=json.loads(p.read_text());d['scripts']['test']+=('' if 'validate-alphabet-a.mjs' in d['scripts']['test'] else ' && node scripts/validate-alphabet-a.mjs');p.write_text(json.dumps(d,indent=2)+'\n')
change('.github/workflows/elix-audit.yml',"      - uses: actions/upload-artifact@v4", "          PLAYWRIGHT_MODULE=/tmp/elix-audit-deps/node_modules/playwright node scripts/browser-alphabet-a.cjs\n          python3 -c 'import json; assert json.load(open(\"/tmp/elix-audit/alphabet-a-browser.json\"))[\"passed\"] is True'\n      - uses: actions/upload-artifact@v4")

p=r/'README.md';text=p.read_text()
heading='## Ampliamento del 23 ottobre 2026 — dieci schede della lettera A'
if heading not in text:
 i=text.index('## Alpha 0.12')
 addition="""## Ampliamento del 23 ottobre 2026 — dieci schede della lettera A

Dieci nuove sintesi originali e dieci profili PK contestuali: abacavir, acebutololo, acetilcisteina, adenosina, alfuzosina, acido alendronico, amitriptilina, anastrozolo, aprepitant e aripiprazolo. Totali: **63 sintesi, 33 profili di prodotto e 198 campi PK**. Nessun nuovo duplicato di catalogo. I dati mantengono formulazione, via, sostanza, provenienza e limiti.

Stile Isoelettrica e correzione della barra preservati; data editoriale per scheda e cache `elix-alpha-0.12.6`. Metodo, fonti e verifiche: [revisione del gruppo A](docs/REVIEW-ALPHABET-A-2026-10-23.md). Stato della distribuzione attestato nella PR, non dai soli conteggi.

"""
 p.write_text(text[:i]+addition+text[i:])
