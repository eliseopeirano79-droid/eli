/* Reproducible UI screening. External services are not required for interaction tests.
   Separate SVG sanitizer tests use a labeled synthetic fixture, never a pharmaceutical claim. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const out='/tmp/elix-audit';fs.mkdirSync(out,{recursive:true});
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const page=await context.newPage(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 const base='http://127.0.0.1:8765/';
 await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await page.goto(base+'#/home');await page.waitForSelector('.topnav-link');
 await page.waitForTimeout(500);
 const go=async(route)=>{await page.goto(base+'#/'+route);await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));};
 const matrix=[];
 const routes=['home','atlas','molecule/CHEMBL13','molecule/CHEMBL1431','molecule/CHEMBL1201585','receptors','receptors/ADRB2','receptors/CYP2D6','receptors/CYP2C19','cinema/ADRA2A','textbook','textbook/first-pass-avanzato','quiz','cases','case/digossina-ipokaliemia','coverage','classes','compare','news','pk'];
 for(const width of [1440,768,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width<700?844:1000});
  if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
  for(const route of routes){
   await go(route);const text=await page.locator('.content').innerText();
   assert.ok(text.trim().length>30,'Empty route '+route);
   assert.ok(!/\$\{[^}]+\}/.test(text),'Unresolved template '+route);
   assert.ok(!/\bNaN\b/.test(text),'Invalid number '+route);
   const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(size.page<=size.viewport+2,'Overflow '+route+' '+width+' '+JSON.stringify(size));
   const navRects=await page.locator('.topnav-link').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right}}));
   assert.equal(navRects.length,5);assert.ok(navRects.every(r=>r.left>=0&&r.right<=width+1),'Hidden top-level navigation '+width);
   matrix.push({route,width,theme,overflow:false});
   if(theme==='light'&&[1440,390].includes(width)&&['home','atlas','molecule/CHEMBL13','quiz','textbook'].includes(route))await page.screenshot({path:path.join(out,route.replaceAll('/','-')+'-'+width+'.png')});
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 // True lazy fetch: opening a fresh identity must not request its payloads while all panels are closed.
 requests.length=0;await go('molecule/CHEMBL13');await page.waitForTimeout(60);
 assert.equal(await page.locator('details.ev-topic[open]').count(),0);
 assert.ok(!requests.some(x=>/\/data\/verified\/(labels|activities|market)\//.test(x)),'Collapsed content fetched eagerly');
 await page.locator('[data-ev="goto-topic"][data-topic="adme"]').first().click();
 await page.waitForSelector('.pk09-topic');await page.locator('.pk09-topic summary').first().click();
 await page.locator('[data-act="theme"]').click();
 assert.ok(await page.locator('details[data-ev-section="CHEMBL13:adme"]').evaluate(e=>e.open));
 assert.ok(await page.locator('.pk09-topic').first().evaluate(e=>e.open));
 await page.locator('[data-ev="collapse-all"]').click();
 assert.equal(await page.locator('details.ev-topic[open]').count(),0);
 await page.locator('[data-structure-zoom]').click();await page.waitForSelector('dialog[open]');await page.keyboard.press('Escape');
 await page.waitForSelector('dialog',{state:'detached'});
 assert.equal(await page.locator('dialog').count(),0);
 // Full product-specific safety, not just legacy editorial labels.
 await go('molecule/CHEMBL1431');await page.locator('details[data-ev-section$=":dosage"]>summary').click();
 await page.waitForSelector('[data-source-section$=":contraindications"]');
 assert.ok(await page.locator('[data-source-section$=":dosage_and_administration"]').count());
 await page.locator('[data-source-section$=":contraindications"]>summary').click();
 assert.match(await page.locator('[data-source-section$=":contraindications"]').innerText(),/METFORMIN|metformin|contraindicat/i);
 await go('textbook');await page.locator('#ex-book-search').pressSequentially('primo passaggio');
 assert.equal(await page.locator('#ex-book-search').inputValue(),'primo passaggio');
 const books=await page.locator('.ex-chapter-link').count();assert.ok(books>0&&books<54);
 await page.locator('[data-act="search-open"]').click();await page.locator('#global-search').fill('CYP2D6');
 assert.match(await page.locator('#global-results').innerText(),/Bersaglio|Capitolo/);await page.keyboard.press('Escape');
 assert.equal(await page.locator('.search-dialog').count(),0);
 // Answer permutation is stable per question and progress survives reload.
 await go('quiz');await page.locator('#ex-size').selectOption('10');await page.locator('[data-elix="quiz-start"]').click();
 assert.equal(await page.locator('.ex-options button').count(),4);
 assert.equal(await page.locator('.ex-filter-card').evaluate(e=>e.open),false);
 const choices=await page.locator('.ex-options button').evaluateAll(es=>es.map(e=>e.dataset.index));
 assert.equal(new Set(choices).size,4);await page.locator('.ex-options button').first().click();await page.waitForSelector('.ex-feedback');
 await page.reload();await page.waitForSelector('.ex-feedback');
 const resumed=await page.locator('.ex-options button').evaluateAll(es=>es.map(e=>e.dataset.index));assert.deepEqual(resumed,choices);
 await page.locator('[data-elix="quiz-next"]').click();assert.equal(await page.locator('.ex-options button').count(),4);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'quiz-active-mobile.png')});
 await go('cinema/ADRA2A');assert.equal(await page.locator('a[href="#/lab/ADRA2A"]').count(),0);
 await page.locator('[data-elix="cinema-mode"][data-mode="3d"]').click();assert.ok(await page.locator('[data-elix="cinema-play"]').isDisabled());
 await go('textbook/missing');assert.match(await page.locator('.content').innerText(),/Capitolo non trovato/);
 await go('%invalid');assert.match(await page.locator('.content').innerText(),/Pagina non trovata/);
 // Test sanitization and geometry preservation separately, without displaying fake pharmaceutical data.
 const svgTest=await page.evaluate(async()=>{
  const {safeChemicalSVG,fitChemicalSVG}=await import('./elix-usability.js');
  const fixture='<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><rect width="500" height="500" fill="#FFFFFF"/><script>alert(1)</script><foreignObject><iframe src="https://bad.invalid"/></foreignObject><path d="M210 225L250 245L290 220" stroke="#222" fill="none"/><text x="295" y="225" fill="red">O</text></svg>';
  const svg=safeChemicalSVG(fixture);svg.style.cssText='width:500px;height:500px;position:fixed;left:-1000px';document.body.append(svg);
  const before=svg.querySelector('path').getAttribute('d'),fitted=fitChemicalSVG(svg),box=svg.getAttribute('viewBox').split(' ').map(Number);
  const result={fitted,width:box[2],height:box[3],unchanged:before===svg.querySelector('path').getAttribute('d'),unsafe:!!svg.querySelector('script,iframe,foreignObject')};svg.remove();return result;
 });
 assert.ok(svgTest.fitted&&svgTest.width<200&&svgTest.height<100&&svgTest.unchanged&&!svgTest.unsafe);
 assert.deepEqual(errors,[],'Runtime JS failures');
 // Offline test on actual worker, not the fixture context.
 const offlineContext=await browser.newContext({viewport:{width:390,height:844}}),offlinePage=await offlineContext.newPage();
 await offlinePage.goto(base+'#/home');await offlinePage.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:20000});
 await offlinePage.evaluate(()=>navigator.serviceWorker.ready);await offlineContext.setOffline(true);
 await offlinePage.reload();await offlinePage.waitForSelector('.topnav-link');assert.equal(await offlinePage.locator('.topnav-link').count(),5);
 await offlinePage.waitForSelector('#elix-offline');await offlineContext.close();
 const report={passed:true,matrixChecks:matrix.length,viewports:[1440,768,390,320],themes:['light','dark'],routes:routes.length,lazyLoading:true,safetyRestored:true,answerShuffle:true,sessionResume:true,svgTest,offline:true,errors,matrix};
 fs.writeFileSync(path.join(out,'audit-report.json'),JSON.stringify(report,null,2));console.log('SYSTEMATIC_BROWSER_PASS',JSON.stringify({...report,matrix:undefined}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
