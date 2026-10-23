/* Release checks for visible discovery, stable cinematic playback and ten exact product contexts. */
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
 const {ELI_CLINICAL_BATCH:batch}=await import('../eli-clinical-batch.js');
 const base=process.env.ELIX_BASE_URL||'http://127.0.0.1:8765/',out='/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true});const errors=[],matrix=[];
 try{
  const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const noOverflow=async label=>{const d=await page.evaluate(()=>({viewport:innerWidth,page:document.documentElement.scrollWidth}));assert.ok(d.page<=d.viewport+2,label+' '+JSON.stringify(d));};
  for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:1000});await page.goto(base+'#/home');await page.waitForSelector('.eli-coverage dd');
   if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
   assert.equal(await page.locator('.topnav-link').count(),7);const nav=await page.locator('.topnav-link').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right};}));assert.ok(nav.every(r=>r.left>=0&&r.right<=width+1));
   for(const path of ['#/cinema/ADRB2','#/news','#/pk','#/dose','#/evidence'])assert.ok(await page.locator('.eli-home a[href="'+path+'"]').count());
   assert.deepEqual(await page.locator('.eli-coverage dd').allTextContents(),['4.225','81','51','95']);
   assert.equal(await page.locator('.eli-news-preview article').count(),3);await noOverflow('home '+width+'/'+theme);
   await page.screenshot({path:out+'/eli-home-'+width+'-'+theme+'.png',fullPage:true});
   for(const drug of batch.drugs){
    const p=batch.profiles.find(p=>p.applicableMoleculeIds.includes(drug.chembl));
    await page.goto(base+'#/molecule/'+drug.chembl);await page.waitForSelector('[data-pk-context="'+p.id+'"]');
    assert.equal(await page.locator('.ev-heading h1').innerText(),drug.name);await page.locator('[data-ev="expand-all"]').click();await page.waitForSelector('[data-reviewed-pk="'+p.id+'"]');
    assert.equal(await page.locator('[data-pk-metric]').count(),6);assert.equal(await page.locator('[data-batch-pharmacology="'+drug.id+'"]').count(),1);
    for(const [field,m] of Object.entries(p.metrics))assert.equal(await page.locator('[data-pk-metric="'+field+'"] .ev-pk-value').innerText(),m.summary);
    assert.doesNotMatch(await page.locator('.content').innerText(),/undefined|NaN|\[object Object\]/);await noOverflow(drug.id+'/'+width+'/'+theme);
    matrix.push({drug:drug.id,width,theme,fields:6});
   }
  }
  await page.setViewportSize({width:1440,height:1000});
  for(const target of ['ADRB2','ADRB1','AGTR1','ADRA2A','ADRA1A']){
   await page.goto(base+'#/cinema/'+target);await page.waitForSelector('.ex-cell-canvas');const scene=await page.locator('.ex-cell-canvas').elementHandle();
   for(let i=1;i<6;i++){await page.locator('[data-elix="cinema-next"]').click();assert.equal(await page.locator('.ex-cinema-count').innerText(),(i+1)+' / 6');assert.ok(await scene.evaluate(el=>el.isConnected),'Scene must stay mounted');}
   assert.ok(await page.locator('[data-elix="cinema-next"]').isDisabled());await page.locator('[data-elix="cinema-reset"]').click();assert.equal(await page.locator('.ex-cinema-count').innerText(),'1 / 6');
   await page.locator('[data-elix="cinema-play"]').click();await page.waitForSelector('.ex-stage-1');await page.locator('[data-elix="cinema-play"]').click();const count=await page.locator('.ex-cinema-count').innerText();await page.waitForTimeout(2700);assert.equal(await page.locator('.ex-cinema-count').innerText(),count,'Pause must stop progression');
   assert.ok(await scene.evaluate(el=>el.isConnected),'Playback must not replace scene');
   if(target==='ADRB2')await page.screenshot({path:out+'/eli-cinema-desktop.png',fullPage:true});
   await page.locator('[data-elix="cinema-mode"][data-mode="3d"]').click();assert.match(await page.locator('.ex-cinema-atom-viewer').getAttribute('src'),/^https:\/\/molstar.org\/viewer\//);
  }
  await page.goto(base+'#/news');await page.waitForSelector('.ev-news-card');assert.equal(await page.locator('.ev-news-card').count(),4);
  await page.goto(base+'#/home');await page.waitForSelector('.eli-news-preview article');await page.locator('.eli-news-preview h3 a').first().click();await page.waitForSelector('.ev-news-card');assert.equal(await page.locator('.ev-news-card').count(),1,'A story link must show that story');
  await page.setViewportSize({width:390,height:1000});await page.goto(base+'#/cinema/ADRA2A');await page.waitForSelector('.ex-cell-canvas');await noOverflow('mobile cinema');await page.screenshot({path:out+'/eli-cinema-mobile.png',fullPage:true});
  await context.close();
  const online=await browser.newContext(),tab=await online.newPage();tab.on('pageerror',e=>errors.push(e.message));await tab.goto(base+'#/home');await tab.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await online.setOffline(true);await tab.reload();await tab.waitForSelector('.eli-coverage dd');assert.equal(await tab.locator('.eli-coverage dd').nth(1).innerText(),'81');
  await tab.goto(base+'#/molecule/CHEMBL4297839');await tab.waitForSelector('[data-pk-context="eli-clinical-tirzepatide"]');await tab.locator('details[data-ev-section$=":adme"]>summary').click();await tab.waitForSelector('[data-reviewed-pk="eli-clinical-tirzepatide"]');assert.equal(await tab.locator('[data-pk-metric]').count(),6);
  await tab.goto(base+'#/cinema/ADRB2');await tab.waitForSelector('.ex-cell-canvas');await tab.locator('[data-elix="cinema-next"]').click();assert.equal(await tab.locator('.ex-cinema-count').innerText(),'2 / 6');await online.close();
  assert.deepEqual(errors,[]);const result={passed:true,productMatrix:matrix,homes:8,scenarios:5,scenePreserved:true,pause:true,storyDeepLinks:true,offlineHome:true,offlinePK:true,offlineCinema:true,errors};fs.writeFileSync(out+'/eli-release-browser.json',JSON.stringify(result,null,2));console.log('ELI_BROWSER_PASS',JSON.stringify(result));
 }catch(e){fs.writeFileSync(out+'/eli-release-browser.json',JSON.stringify({passed:false,error:e.stack,errors},null,2));throw e;}finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
