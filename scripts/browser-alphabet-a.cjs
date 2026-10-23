/* All ten product contexts, real renderer, both themes, compact mobile and offline. */
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const {ALPHABET_A_BATCH:batch}=await import('../elix-alphabet-a.js');
 const base=process.env.ELIX_BASE_URL||'http://127.0.0.1:8765/',out='/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const errors=[],matrix=[];
 try{
  const ctx=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'}),page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  for(const width of [1440,390,320])for(const theme of ['light','dark'])for(const drug of batch.drugs){
   const profile=batch.profiles.find(p=>p.applicableMoleculeIds.includes(drug.chembl));
   await page.setViewportSize({width,height:1000});await page.goto(base+'#/molecule/'+drug.chembl);await page.waitForSelector('[data-pk-context="'+profile.id+'"]');
   if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
   assert.equal(await page.locator('.topnav-link').count(),5);assert.equal(await page.locator('details[data-ev-section]').count(),6);
   assert.equal(await page.locator('.ev-heading h1').innerText(),drug.name);await page.locator('[data-ev="expand-all"]').click();
   await page.waitForSelector('[data-reviewed-pk="'+profile.id+'"]');assert.equal(await page.locator('[data-pk-metric]').count(),6);
   assert.equal(await page.locator('[data-batch-pharmacology="'+drug.id+'"]').count(),1);
   for(const [field,value] of Object.entries(profile.metrics)){
    assert.equal(await page.locator('[data-pk-metric="'+field+'"] .ev-pk-value').innerText(),value.summary);
    const d=page.locator('[data-pk-metric="'+field+'"] details');if(!await d.evaluate(e=>e.open))await d.locator('summary').click();
    const links=await d.locator('a').evaluateAll(es=>es.map(e=>e.href));for(const sid of value.sourceIds)assert.ok(links.includes(batch.sources.find(s=>s.id===sid).url));
   }
   const dose=page.locator('details[data-ev-section$=":dosage"]');
   if(drug.id==='amitriptilina'){
    assert.ok(await dose.locator('a[href="https://www.medicines.org.uk/emc/product/10849/smpc"]').count());
    assert.equal(await dose.locator('a[href*="61b29703"]').count(),0,'UK profile must not show unrelated US product dosage');
   }else await page.waitForSelector('[data-source-section$=":indications_and_usage"]');
   await page.locator('[data-act="theme"]').click();assert.equal(await page.locator('[data-pk-source][open]').count(),6);await page.locator('[data-act="theme"]').click();
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(dimensions.scroll<=dimensions.width+2,'Overflow '+drug.id+'/'+width);
   assert.doesNotMatch(await page.locator('.content').innerText(),/undefined|NaN|\[object Object\]/);
   if(drug.id==='abacavir'&&theme==='dark'&&width>=390){await page.locator('[data-reviewed-pk]').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/alphabet-a-abacavir-'+width+'-dark.png'});}
   matrix.push({drug:drug.id,width,theme,fields:6,sourceLinks:true,overflow:false});await page.locator('[data-ev="collapse-all"]').click();
  }
  await page.goto(base+'#/atlas');await page.waitForSelector('#ev-search');await page.locator('.ev-advanced>summary').click();
  for(const [kind,total] of [['editorial',63],['needs-editorial',4162],['source-to-review',113],['needs-pk',141]]){
   await page.locator('#vd-data-kind').selectOption(kind);const text=await page.locator('.ev-results-head').innerText();assert.equal(Number(text.match(/^([\d.\s\u00a0\u202f]+)\s+record/)[1].replace(/\D/g,'')),total);
  }
  await page.locator('#vd-data-kind').selectOption('editorial');
  for(const d of batch.drugs){await page.locator('#ev-search').fill(d.name);assert.equal(await page.locator('.ev-molecule-card').first().getAttribute('href'),'#/molecule/'+d.chembl);}
  await ctx.close();
  const offline=await browser.newContext(),tab=await offline.newPage();tab.on('pageerror',e=>errors.push(e.message));
  await tab.goto(base+'#/molecule/'+batch.drugs[0].chembl);await tab.waitForFunction(()=>!!navigator.serviceWorker.controller);await offline.setOffline(true);await tab.reload();await tab.waitForSelector('[data-pk-context]');
  for(const d of batch.drugs){await tab.goto(base+'#/molecule/'+d.chembl);await tab.waitForSelector('[data-pk-context="alphabet-a-'+d.id+'"]');await tab.locator('details[data-ev-section$=":adme"]>summary').click();await tab.waitForSelector('[data-reviewed-pk="alphabet-a-'+d.id+'"]');assert.equal(await tab.locator('[data-pk-metric]').count(),6);}
  await offline.close();assert.deepEqual(errors,[]);
  const report={passed:true,configurations:matrix.length,fieldsChecked:matrix.length*6,offlineProfiles:batch.profiles.length,filters:4,errors,matrix};fs.writeFileSync(out+'/alphabet-a-browser.json',JSON.stringify(report,null,2));console.log('ALPHABET_A_BROWSER_PASS',JSON.stringify({...report,matrix:undefined}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
