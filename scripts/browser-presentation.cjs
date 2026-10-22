const assert=require('node:assert/strict'),fs=require('node:fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const page=await context.newPage(),errors=[],requested=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requested.push(r.url()));
 const base='http://127.0.0.1:8765/',out='/tmp/elix-presentation';fs.mkdirSync(out,{recursive:true});
 await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await page.goto(base+'#/molecule/CHEMBL13');await page.waitForSelector('.ep-summary');
 let text=await page.locator('.ep-summary').innerText();for(const x of ['3–7 h','77%','12%','METOPROLOL SUCCINATE'])assert.ok(text.includes(x),x);
 assert.ok(!requested.some(x=>x.includes('/data/verified/labels/')),'Summary must not eagerly fetch full product text');
 await page.screenshot({path:out+'/metoprololo-desktop.png'});
 await page.locator('.ep-summary [data-topic="adme"]').first().click();await page.waitForSelector('.ep-pk-field');
 await page.locator('.ep-pk-field details summary').first().click();assert.match(await page.locator('.ep-pk-field').first().innerText(),/half-life/);
 await page.waitForTimeout(100);assert.ok(await page.locator('details[data-ev-section="CHEMBL13:adme"]').evaluate(e=>e.open));
 await page.screenshot({path:out+'/adme-desktop.png'});
 await page.goto(base+'#/atlas');await page.waitForSelector('#ev-search');await page.fill('#ev-search','ciprofloxacina');
 assert.match(await page.locator('.ev-catalog-grid').innerText(),/Ciprofloxacina/);
 await page.screenshot({path:out+'/italian-names.png'});
 const cases=[['CHEMBL635','2–3 h','RAYOS'],['CHEMBL112','2,4 ± 0,6 h','ACETAMINOPHEN'],['CHEMBL161','5,8–8,7 h','CEFTRIAXONE SODIUM'],['CHEMBL20','≈4 h','Acetazolamide'],['CHEMBL54','≈24 h','HALDOL'],['CHEMBL384467','3,6 ± 0,9 h','Desametasone'],['CHEMBL13','3–7 h','METOPROLOL SUCCINATE']];
 const matrix=[];
 for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width<700?844:1000});
  if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
  for(const [id,value,product] of cases){
   await page.goto(base+'#/molecule/'+id);await page.waitForSelector('.ep-summary');
   await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
   const text=await page.locator('.ep-summary').innerText();assert.ok(text.includes(value)&&text.includes(product),id+' incorrect summary');
   const size=await page.evaluate(()=>({viewport:innerWidth,page:document.documentElement.scrollWidth}));
   assert.ok(size.page<=size.viewport+2,'Overflow '+id+' '+width+' '+JSON.stringify(size));
   assert.equal(await page.locator('.topnav-link').count(),5);matrix.push({id,width,theme,pass:true});
   if(theme==='light'&&width===390&&['CHEMBL635','CHEMBL13'].includes(id))await page.screenshot({path:out+'/'+id+'-mobile.png'});
  }
 }
 await page.goto(base+'#/molecule/CHEMBL635');await page.waitForSelector('.ep-summary');
 await page.locator('.ep-summary [data-topic="adme"]').first().click();await page.waitForSelector('[data-pk-summary-source]');
 const options=page.locator('[data-pk-summary-source] option');assert.equal(await options.count(),2);
 const original=await options.first().getAttribute('value'),supplement=await options.last().getAttribute('value');
 await page.selectOption('[data-pk-summary-source]',original);assert.ok(!(await page.locator('.ep-summary').innerText()).includes('2–3 h'),'Source change retained another product value');
 await page.selectOption('[data-pk-summary-source]',supplement);assert.match(await page.locator('.ep-summary').innerText(),/2–3 h/);
 assert.deepEqual(errors,[]);
 fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,matrixChecks:matrix.length,matrix,runtimeErrors:errors,lazyProductFetch:true,sourceSelection:true,translatedSearch:true},null,2));
 console.log('PRESENTATION_BROWSER_PASS',JSON.stringify({matrixChecks:matrix.length,errors,lazyProductFetch:true,sourceSelection:true}));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
