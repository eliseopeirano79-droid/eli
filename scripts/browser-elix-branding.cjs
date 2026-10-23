const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const root=path.resolve(__dirname,'..'),out=process.env.ELIX_BRAND_OUTPUT||'/tmp/elix-branding-audit';fs.mkdirSync(out,{recursive:true});
 let down=false,old=Boolean(process.env.ELIX_LEGACY_ROOT);const server=http.createServer((req,res)=>{
  const u=new URL(req.url,'http://localhost');
  if(down&&u.pathname.startsWith('/ELIX/')){res.writeHead(503);return res.end('unavailable');}
  const relative=u.pathname.replace(/^\/(ELIX|eli|PHARMA)\//,'/');
  const servedRoot=old&&u.pathname.startsWith('/eli/')?process.env.ELIX_LEGACY_ROOT:root;
  let file=path.join(servedRoot,relative.endsWith('/')?relative+'index.html':relative);
  if(!file.startsWith(servedRoot)||relative.includes('..')){res.writeHead(404);return res.end();}
  try{const b=fs.readFileSync(file),ext=path.extname(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'})[ext]||'text/plain','Cache-Control':'no-store'});res.end(b);}catch{res.writeHead(404);res.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const base=process.env.ELIX_BASE_URL||origin+'/ELIX/';
 const upgrade=Boolean(process.env.ELIX_LEGACY_ROOT);
 const browser=await chromium.launch({headless:true}),errors=[],matrix=[];
 try{
  if(upgrade){
   const upgraded=await browser.newContext(),p=await upgraded.newPage();await p.goto(origin+'/eli/#/home');await p.waitForFunction(()=>!!navigator.serviceWorker.controller);await p.reload();await p.waitForSelector('.eli-coverage dd');
   await p.evaluate(()=>{localStorage.setItem('pharma-favs','["verapamil"]');localStorage.setItem('pharma-quiz-completed','9')});old=false;
   await p.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update()});await p.waitForSelector('.elix-update-banner');
   await p.reload();await p.waitForURL(origin+'/ELIX/#/home');await p.waitForSelector('.eli-coverage dd');
   assert.equal(await p.evaluate(()=>localStorage.getItem('pharma-favs')),'["verapamil"]');assert.equal(await p.evaluate(()=>localStorage.getItem('pharma-quiz-completed')),'9');await upgraded.close();
  }
  const ctx=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'}),page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  for(const width of [1440,768,390,320])for(const theme of ['dark','light']){
   await page.setViewportSize({width,height:900});await page.goto(base+'#/home');await page.waitForSelector('.eli-coverage dd');
   if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
   assert.equal(await page.locator('.header-brand').getAttribute('aria-label'),'ELIX, torna alla panoramica');
   assert.match(await page.locator('.header-brand').innerText(),/ELIX\s+Farmacologia & Principi Attivi/);
   assert.doesNotMatch(await page.locator('body').innerText(),/\beli\b/i);
   assert.match(await page.title(),/ELIX/);
   assert.equal(await page.locator('.header-brand img').count(),0,'Brand uses native text and vector, never a raster crop');
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,logos:[...document.querySelectorAll('.header-brand .elix-pill')].map(x=>({loaded:!x.querySelector('image'),width:x.getBoundingClientRect().width})),brandBackground:getComputedStyle(document.querySelector('.header-brand .brand-mark')).backgroundColor,markColor:getComputedStyle(document.querySelector('.header-brand .brand-mark')).color,accent:getComputedStyle(document.querySelector('.eli-button')).backgroundColor,sub:(()=>{let e=document.querySelector('.header-brand .brand-sub'),r=e.getBoundingClientRect();return {left:r.left,right:r.right}})()}));
   assert.ok(dimensions.scroll<=width+2,JSON.stringify(dimensions));assert.equal(dimensions.logos.length,1);assert.ok(dimensions.logos.every(x=>x.loaded&&x.width>0));assert.equal(dimensions.brandBackground,'rgba(0, 0, 0, 0)');assert.equal(dimensions.markColor,dimensions.accent);assert.ok(dimensions.sub.right<=width);
   assert.deepEqual(await page.locator('.eli-coverage dd').allTextContents(),['4.225','81','51','95']);
   await page.screenshot({path:out+`/ELIX-${width}-${theme}.png`,fullPage:true});
   for(const route of ['atlas','receptors','textbook','quiz','pk','cinema/ADRB2']){await page.goto(base+'#/'+route);await page.waitForSelector('.content h1');assert.doesNotMatch(await page.locator('body').innerText(),/\beli\b/i);assert.match(await page.title(),/ELIX/);}
   matrix.push({width,theme});
  }
  // Hold bootstrap to inspect the actual startup screen.
  await page.route('**/elix-entry.js',r=>r.abort());await page.goto(base);await page.waitForSelector('.elix-boot-brand .elix-pill');assert.equal(await page.locator('.boot img').count(),0);for(const theme of ['dark','light']){await page.evaluate(t=>{localStorage.setItem('pharma-theme',JSON.stringify(t));},theme);await page.reload();assert.equal(await page.locator('body').getAttribute('data-theme'),theme);assert.equal(await page.locator('.boot').evaluate(x=>getComputedStyle(x).backgroundColor),await page.locator('body').evaluate(x=>getComputedStyle(x).backgroundColor));await page.screenshot({path:out+'/ELIX-splash-'+theme+'.png'});}await ctx.close();
  const context=await browser.newContext(),tab=await context.newPage();tab.on('pageerror',e=>errors.push(e.message));
  await tab.goto(origin+'/ELIX/');await tab.waitForSelector('.eli-coverage dd');await tab.waitForFunction(()=>!!navigator.serviceWorker.controller);
  const storage={'pharma-theme':'"light"','pharma-favs':'["verapamil"]','pharma-quiz-completed':'3','pharma-cases-done':'["asma-beta"]','elix-academy-progress':'{"sessions":2,"answered":10,"correct":8,"wrong":{}}'};
  await tab.evaluate(async entries=>{for(const[k,v]of Object.entries(entries))localStorage.setItem(k,v);const c=await caches.open('isoelettrica-preserve-test');await c.put('/unrelated',new Response('keep'));},storage);
  for(const alias of ['PHARMA','eli']){
   await tab.goto(origin+'/'+alias+'/?from=old#/cinema/ADRB2');await tab.waitForURL(origin+'/ELIX/?from=old#/cinema/ADRB2');await tab.waitForSelector('.ex-cell-canvas');
   assert.deepEqual(await tab.evaluate(keys=>Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)])),Object.keys(storage)),storage);
  }
  down=true;await tab.goto(origin+'/PHARMA/#/home');await tab.waitForSelector('.eli-coverage dd');assert.ok(tab.url().includes('/PHARMA/'),'Destination failure must keep local app');
  await tab.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes('/PHARMA/'));
  assert.ok(await tab.evaluate(async()=>!!await caches.match('/unrelated')),'Unrelated app cache preserved');
  await context.setOffline(true);await tab.reload();await tab.waitForSelector('.eli-coverage dd');assert.ok(tab.url().includes('/PHARMA/'));assert.match(await tab.locator('.header-brand').innerText(),/ELIX/);
  await context.setOffline(false);down=false;await tab.goto(origin+'/ELIX/#/home');await tab.waitForSelector('.eli-coverage dd');
  await context.setOffline(true);await tab.reload();await tab.waitForSelector('.eli-coverage dd');assert.deepEqual(await tab.locator('.eli-coverage dd').allTextContents(),['4.225','81','51','95']);
  assert.ok(await tab.evaluate(async()=>!!await caches.match('/unrelated')));
  await context.close();assert.deepEqual(errors,[]);
  const report={passed:true,base,matrix,upgradeFromPreviousRelease:upgrade,sourceImageSHA256:require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root,'assets/elix-reference.png'))).digest('hex'),routes:6,redirects:['PHARMA','eli'],queryAndHashPreserved:true,storagePreserved:true,failedTargetFallback:true,offlineCanonical:true,offlineLegacy:true,unrelatedCachePreserved:true,errors};
  fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
 }finally{await browser.close();await new Promise(r=>{server.close(r);server.closeAllConnections();});}
})().catch(e=>{console.error(e);process.exitCode=1});
