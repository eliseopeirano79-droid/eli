const assert=require('node:assert/strict');
async function verifyContentBatch(browser,base='http://127.0.0.1:8765/'){
 const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage(),errors=[],matrix=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const drugs=[['CHEMBL1059','Pregabalin','pregabalin'],['CHEMBL940','Gabapentin','gabapentin'],['CHEMBL1175','Duloxetina','duloxetina'],['CHEMBL809','Sertralina','sertralina']];
 for(const width of [1440,320])for(const theme of ['light','dark'])for(const [id,name,slug] of drugs){
  await page.setViewportSize({width,height:1000});await page.goto(base+'#/molecule/'+id);
  await page.waitForSelector('details[data-ev-section="'+id+':adme"]');
  if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
  assert.equal(await page.locator('.topnav-link').count(),7);
  if(width===1440&&theme==='dark'&&id==='CHEMBL1059')await page.screenshot({path:'/tmp/elix-audit/neuro-pregabalin-dark.png'});
  assert.equal(await page.locator('details[data-ev-section]').count(),6);
  assert.equal(await page.locator('.ev-heading h1').innerText(),name);
  await page.locator('[data-ev="expand-all"]').click();
  await page.waitForSelector('[data-reviewed-pk]');
  assert.equal(await page.locator('[data-pk-metric]').count(),6);
  assert.equal(await page.locator('[data-batch-pharmacology="'+slug+'"]').count(),1);
  assert.ok(await page.getByRole('link',{name:'Apri posologia e sicurezza del prodotto'}).isVisible());
  const detail=page.locator('[data-pk-source]').first();if(!await detail.evaluate(el=>el.open))await detail.locator('summary').click();
  assert.ok(await detail.locator('a').first().isVisible());
  await page.locator('[data-act="theme"]').click();assert.ok(await page.locator('[data-pk-source]').first().evaluate(el=>el.open));await page.locator('[data-act="theme"]').click();
  const dim=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(dim.page<=dim.viewport+2,'Batch overflow '+id+' '+width+' '+JSON.stringify(dim));
  assert.doesNotMatch(await page.locator('.content').innerText(),/undefined|NaN|\[object Object\]/);
  matrix.push({id,width,theme,fields:6,sourceLink:true,overflow:false});
  await page.locator('[data-ev="collapse-all"]').click();
 }
 await page.goto(base+'#/compare/Gabapentinoidi');await page.waitForSelector('.ev-table');
 assert.match(await page.locator('.ev-table').innerText(),/Pregabalin/);assert.match(await page.locator('.ev-table').innerText(),/Gabapentin/);
 await page.goto(base+'#/coverage');await page.waitForSelector('.ev-metrics');assert.ok((await page.locator('.ev-metrics').first().innerText()).includes(String((await require('./current-coverage.cjs')()).counts.pkFields)));
 assert.deepEqual(errors,[]);await context.close();
 // Verify embedded additions survive a real offline reload, not a mock fetch.
 const offline=await browser.newContext(),offlinePage=await offline.newPage();
 await offlinePage.goto(base+'#/molecule/CHEMBL1059');await offlinePage.waitForFunction(()=>!!navigator.serviceWorker.controller);
 await offline.setOffline(true);await offlinePage.reload();await offlinePage.waitForSelector('.ev-drug-sheet');
 await offlinePage.locator('details[data-ev-section$=":adme"]>summary').click();await offlinePage.waitForSelector('[data-reviewed-pk="pregabalin-capsule-us"]');
 assert.equal(await offlinePage.locator('[data-pk-metric]').count(),6);await offline.close();
 const result={passed:true,configurations:matrix.length,fieldsChecked:matrix.length*6,offline:true,errors,matrix};
 require('node:fs').writeFileSync('/tmp/elix-audit/content-batch-report.json',JSON.stringify(result,null,2));
 console.log('CONTENT_BATCH_BROWSER_PASS',JSON.stringify({...result,matrix:undefined}));return result;
}
module.exports={verifyContentBatch};
if(require.main===module){(async()=>{const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});try{await verifyContentBatch(browser)}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});}
