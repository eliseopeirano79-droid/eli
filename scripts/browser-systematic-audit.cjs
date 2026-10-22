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
 await page.waitForSelector('.ev-pk-metric details');
 assert.equal(await page.locator('.ev-pk-metric details').count(),6);
 assert.equal(await page.locator('.ev-pk-metric details[open]').count(),0);
 await page.locator('.ev-pk-metric details>summary').first().click();
 const pkDetailsBefore=await page.locator('.ev-pk-metric details[open]').evaluateAll(es=>es.map(e=>e.dataset.pkSource));
 assert.equal(pkDetailsBefore.length,1,'Only the chosen PK source detail should open');
 await page.locator('[data-act="theme"]').click();
 assert.ok(await page.locator('details[data-ev-section="CHEMBL13:adme"]').evaluate(e=>e.open));
 const pkDetailsAfter=await page.locator('.ev-pk-metric details[open]').evaluateAll(es=>es.map(e=>e.dataset.pkSource));
 assert.deepEqual(pkDetailsAfter,pkDetailsBefore,'Theme changes must retain this PK detail without opening the other five identical summaries');
 assert.equal(await page.locator('.ev-pk-metric details:not([open])').count(),5);
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
 // Review the actual product-bound dataset, including both contexts of the metoprolol parent.
 // These rows are added to the report only after their UI and provenance assertions succeed.
 const pkDataset=JSON.parse(fs.readFileSync(path.join(__dirname,'../data/pk-reviewed.json'),'utf8'));
 const pkProfiles=pkDataset.profiles.filter(p=>p.reviewStatus==='source-checked');
 const pkSourceById=new Map(pkDataset.sources.map(s=>[s.id,s]));
 const pkFields=['halfLife','bioavailability','proteinBinding','metabolism','metabolites','excretion'];
 const reviewedPKMatrix=[],reviewedPKExclusions=[];
 let reviewedPKDosageChecks=0;
 const openTopic=async(id,topic)=>{
  const selector='details[data-ev-section="'+id+':'+topic+'"]';
  if(!await page.locator(selector).evaluate(e=>e.open))await page.locator(selector+'>summary').click();
  await page.waitForFunction(s=>document.querySelector(s+' > .ev-topic-body')?.dataset.loaded==='true',selector);
  return page.locator(selector);
 };
 const checkOverflow=async(label)=>{
  const size=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.ok(size.page<=size.viewport+2,'Reviewed PK overflow '+label+' '+JSON.stringify(size));
 };
 for(const width of [1440,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:width<700?844:1000});
  if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
  for(const profile of pkProfiles)for(const moleculeId of profile.applicableMoleculeIds){
   const label=profile.id+' / '+moleculeId+' / '+width+' / '+theme;
   await go('molecule/'+moleculeId);
   await page.waitForSelector('.ev-facts [data-molecule="'+moleculeId+'"]');
   await page.locator('[data-ev="collapse-all"]').click();
   const available=pkProfiles.filter(p=>p.applicableMoleculeIds.includes(moleculeId));
   if(available.length>1){
    const selector=page.locator('#ev-pk-formulation');
    assert.deepEqual((await selector.locator('option').evaluateAll(es=>es.map(e=>e.value))).sort(),available.map(p=>p.id).sort(),'Selector contains a product from a different identity: '+label);
    await selector.selectOption(profile.id);
    assert.equal(await page.locator('#ev-pk-formulation').inputValue(),profile.id,'Selector value is stale: '+label);
   }else assert.equal(await page.locator('#ev-pk-formulation').count(),0,'A salt-specific sheet must not offer unrelated formulations: '+label);
   await page.waitForSelector('[data-pk-context="'+profile.id+'"]');
   const summary=await page.locator('.ev-facts .ev-fact').evaluateAll(es=>Object.fromEntries(es.map(e=>[e.querySelector('span')?.textContent.trim(),e.querySelector('strong')?.textContent.trim()])));
   for(const [key,title] of [['halfLife','Emivita'],['bioavailability','Biodisponibilità'],['proteinBinding','Legame proteico']])assert.equal(summary[title],profile.metrics[key].summary,'Wrong compact PK value '+key+': '+label);
   assert.equal(await page.locator('details.ev-topic').count(),6,'Primary sections changed: '+label);
   await checkOverflow(label+' collapsed');
   const adme=await openTopic(moleculeId,'adme');
   await page.waitForSelector('[data-reviewed-pk="'+profile.id+'"]');
   const metricCount=await adme.locator('.ev-pk-metric').count();
   assert.equal(metricCount,6,'Missing reviewed PK metrics: '+label);
   for(const key of pkFields)assert.equal((await adme.locator('[data-pk-metric="'+key+'"] .ev-pk-value').innerText()).trim(),profile.metrics[key].summary,'Wrong expanded PK value '+key+': '+label);
   assert.equal(await adme.locator('.ev-pk-metric details[data-pk-source]').count(),6,'Missing per-metric provenance: '+label);
   const original=adme.locator('[data-pk-original="'+profile.id+'"]');
   if(!await original.evaluate(e=>e.open))await original.locator(':scope>summary').click();
   const source=pkSourceById.get(profile.sourceIds[0]);
   assert.ok(source,'Missing primary product source: '+label);
   await original.locator('a[href="'+source.url+'"]').first().waitFor({state:'visible'});
   if(source.localFile){
    await original.locator('[data-source-section]').first().waitFor({state:'attached'});
    assert.ok(await original.locator('[data-source-section]').count(),'Imported original PK sections unavailable: '+label);
   }else{
    assert.match(await original.innerText(),/consultato online|non è importato/i,'A live-only source must retain its import limitation: '+label);
   }
   await checkOverflow(label+' expanded');
   if(profile.id==='metoprolol-tartrate-ir'){
    assert.doesNotMatch(await original.innerText(),/succinat/i,'IR original source shows ER product: '+label);
    const doses=await openTopic(moleculeId,'dosage');
    await doses.locator('a[href="'+source.url+'"]').first().waitFor({state:'visible'});
    assert.match(await doses.innerText(),/tartrate|tartrato/i,'IR dosage section lost the selected product: '+label);
    assert.doesNotMatch(await doses.innerText(),/succinat/i,'IR dosage section inherited ER data: '+label);
    assert.equal(await doses.locator('a[href*="a46cbf09-20e3-4f0d-ab41-221f60fde068"]').count(),0,'IR dosage linked the wrong ER label: '+label);
    await checkOverflow(label+' dosage');
    reviewedPKDosageChecks++;
   }
   reviewedPKMatrix.push({profile:profile.id,molecule:moleculeId,width,theme,metricChecks:metricCount,summaryChecks:3,source:source.id,overflow:false});
   if(moleculeId==='CHEMBL13'&&theme==='light'&&[1440,390].includes(width))await page.screenshot({path:path.join(out,'reviewed-pk-'+profile.id+'-'+width+'.png')});
   await page.locator('[data-ev="collapse-all"]').click();
  }
  // A related but unreviewed salt can link to its parent without acquiring the parent's ER values.
  await go('molecule/CHEMBL3989566');
  await page.waitForSelector('.ev-facts [data-molecule="CHEMBL3989566"]');
  assert.doesNotMatch(await page.locator('.ev-facts').innerText(),/77\s*%/,'Fumarate inherited ER bioavailability');
  assert.equal(await page.locator('[data-pk-context]').count(),0,'Fumarate acquired an unreviewed context');
  const fumarateADME=await openTopic('CHEMBL3989566','adme');
  assert.equal(await fumarateADME.locator('.ev-pk-metric').count(),0);
  await fumarateADME.locator('.ev-pk-inheritance a[href="#/molecule/CHEMBL13"]').waitFor({state:'visible'});
  assert.doesNotMatch(await fumarateADME.innerText(),/77\s*%/);
  await checkOverflow('fumarate exclusion '+width+' '+theme);
  reviewedPKExclusions.push({molecule:'CHEMBL3989566',width,theme,parentLink:true,inheritedValue:false});
  await page.locator('[data-ev="collapse-all"]').click();
 }
 const reviewedPK={matrixChecks:reviewedPKMatrix.length,profiles:new Set(reviewedPKMatrix.map(row=>row.profile)).size,identities:new Set(reviewedPKMatrix.map(row=>row.molecule)).size,summaryChecks:reviewedPKMatrix.reduce((n,row)=>n+row.summaryChecks,0),metricChecks:reviewedPKMatrix.reduce((n,row)=>n+row.metricChecks,0),sourceChecks:reviewedPKMatrix.length,dosageChecks:reviewedPKDosageChecks,excludedSaltChecks:reviewedPKExclusions.length,viewports:[1440,390,320],themes:['light','dark'],detailRetention:{before:pkDetailsBefore,after:pkDetailsAfter},matrix:reviewedPKMatrix,exclusions:reviewedPKExclusions};
 assert.equal(reviewedPK.profiles,pkProfiles.length,'Not all reviewed PK contexts were exercised');
 assert.equal(reviewedPK.identities,new Set(pkProfiles.flatMap(profile=>profile.applicableMoleculeIds)).size,'Not all exact identity bindings were exercised');
 await page.setViewportSize({width:1440,height:1000});
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
 const report={passed:true,matrixChecks:matrix.length,viewports:[1440,768,390,320],themes:['light','dark'],routes:routes.length,lazyLoading:true,safetyRestored:true,answerShuffle:true,sessionResume:true,svgTest,offline:true,reviewedPK,errors,matrix};
 fs.writeFileSync(path.join(out,'audit-report.json'),JSON.stringify(report,null,2));console.log('SYSTEMATIC_BROWSER_PASS',JSON.stringify({...report,matrix:undefined,reviewedPK:{...reviewedPK,matrix:undefined,exclusions:undefined}}));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
