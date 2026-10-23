/* Covers all twelve additions; external image availability is not asserted. */
const assert=require('node:assert/strict'),fs=require('node:fs');
// Node and Chromium can ship different ICU grouping rules. Compare the count,
// not the thousands separator, while still requiring the visible record label.
const recordCount=text=>{
 const match=String(text).match(/^([\d.\s\u00a0\u202f]+)\s+record\b/);
 assert.ok(match,'Missing visible record count: '+text);
 return Number(match[1].replace(/\D/g,''));
};
for(const text of ['4172 record','4.172 record · 1–36','4 172 record'])assert.equal(recordCount(text),4172);
assert.throws(()=>recordCount('Nessun risultato'));
(async()=>{
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const {ESSENTIAL_BATCH:batch}=await import('../elix-essential-batch.js');
 const live=(await require('./current-coverage.cjs')()).counts;
 const n=live.editorial-53,p=live.profileContexts-23;
 const base=process.env.ELIX_BASE_URL||'http://127.0.0.1:8765/';
 const out='/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
 const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage(),errors=[],matrix=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
 try{
  for(const width of [1440,320])for(const theme of ['light','dark'])for(const drug of batch.drugs){
   await page.setViewportSize({width,height:1000});await page.goto(base+'#/molecule/'+drug.chembl);
   await page.waitForSelector('[data-pk-context="essential-'+drug.id+'"]');
   if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
   assert.equal(await page.locator('.topnav-link').count(),7);
   assert.equal(await page.locator('details[data-ev-section]').count(),6);
   assert.equal(await page.locator('.ev-heading h1').innerText(),drug.name);
   await page.locator('[data-ev="expand-all"]').click();await page.waitForSelector('[data-reviewed-pk]');
   assert.equal(await page.locator('[data-pk-metric]').count(),6);
   assert.equal(await page.locator('[data-batch-pharmacology="'+drug.id+'"]').count(),1);
   assert.ok(await page.getByRole('heading',{name:'Interazioni da comprendere'}).isVisible());
   const profile=batch.profiles.find(p=>p.applicableMoleculeIds.includes(drug.chembl));
   for(const [key,metric] of Object.entries(profile.metrics)){
    assert.equal(await page.locator('[data-pk-metric="'+key+'"] .ev-pk-value').innerText(),metric.summary);
    const detail=page.locator('[data-pk-metric="'+key+'"] details');if(!await detail.evaluate(e=>e.open))await detail.locator('summary').click();
    const links=await detail.locator('a').evaluateAll(es=>es.map(e=>e.href));
    for(const sourceId of metric.sourceIds)assert.ok(links.includes(batch.sources.find(s=>s.id===sourceId).url));
   }
   await page.waitForSelector('[data-source-section$=":indications_and_usage"]');
   assert.ok(await page.locator('details[data-ev-section$=":dosage"] a').filter({hasText:'Documento originale DailyMed'}).first().isVisible());
   await page.locator('[data-act="theme"]').click();assert.equal(await page.locator('[data-pk-source][open]').count(),6);await page.locator('[data-act="theme"]').click();
   const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(size.page<=size.viewport+2,'Overflow '+drug.id+' '+width);
   assert.doesNotMatch(await page.locator('.content').innerText(),/undefined|NaN|\[object Object\]/);
   if(drug.id==='metformina'&&theme==='dark'&&width===1440){await page.locator('[data-reviewed-pk]').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/essential-metformina-pk-dark.png'});}
   matrix.push({id:drug.chembl,width,theme,metrics:6,sources:true,overflow:false});
   await page.locator('[data-ev="collapse-all"]').click();
  }
  await page.goto(base+'#/coverage');await page.waitForSelector('[data-catalog-audit]');
  assert.match(await page.locator('[data-catalog-audit]').innerText(),/4.225/);
  assert.ok((await page.locator('[data-catalog-audit]').innerText()).includes(String(123-n)));
  await page.locator('[data-catalog-audit] summary').click();assert.equal(await page.locator('[data-catalog-audit] tbody tr').count(),15);
  await page.setViewportSize({width:1440,height:1000});await page.locator('[data-catalog-audit]').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/catalog-coverage-dark.png'});
  await page.goto(base+'#/atlas');await page.waitForSelector('#ev-search');await page.locator('.ev-advanced>summary').click();
  for(const [kind,total] of [['editorial',53+n],['needs-editorial',4172-n],['source-to-review',123-n],['needs-pk',151-p]]){
   await page.locator('#vd-data-kind').selectOption(kind);assert.equal(recordCount(await page.locator('.ev-results-head').innerText()),total,kind);
  }
  await page.locator('#vd-data-kind').selectOption('editorial');await page.locator('#ev-search').fill('paracetamolo');assert.equal(await page.locator('.ev-molecule-card').count(),1);
  await page.locator('.ev-molecule-card').click();await page.waitForSelector('[data-pk-context="essential-paracetamolo"]');
  await context.close();
  const offline=await browser.newContext(),offlinePage=await offline.newPage();
  await offlinePage.goto(base+'#/molecule/CHEMBL1431');await offlinePage.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await offline.setOffline(true);await offlinePage.reload();await offlinePage.waitForSelector('[data-pk-context="essential-metformina"]');
  for(const d of batch.drugs){await offlinePage.goto(base+'#/molecule/'+d.chembl);await offlinePage.waitForSelector('[data-pk-context="essential-'+d.id+'"]');await offlinePage.locator('details[data-ev-section$=":adme"]>summary').click();await offlinePage.waitForSelector('[data-reviewed-pk="essential-'+d.id+'"]');assert.equal(await offlinePage.locator('[data-pk-metric]').count(),6);}
  await offline.close();assert.deepEqual(errors,[]);
  const result={passed:true,configurations:matrix.length,fieldsChecked:matrix.length*6,offlineProfiles:batch.profiles.length,filters:4,errors,matrix};
  fs.writeFileSync(out+'/catalog-browser-report.json',JSON.stringify(result,null,2));console.log('CATALOG_BROWSER_PASS',JSON.stringify({...result,matrix:undefined}));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
