/* Real app + real service-worker upgrade, served below /PHARMA/ like GitHub Pages.
   Only the worker cache revision is replaced by the fixture. No pharmaceutical data
   are changed. External depictions are not a prerequisite for notice-layout tests. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(__dirname,'..');
const out=process.env.ELIX_AUDIT_OUTPUT||'/tmp/elix-audit';
const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webmanifest':'application/manifest+json'};
let revision=1;
const server=http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://fixture.invalid').pathname;
 if(!pathname.startsWith('/PHARMA/')){res.writeHead(404).end();return;}
 const relative=decodeURIComponent(pathname.slice('/PHARMA/'.length))||'index.html';
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
 let body=fs.readFileSync(file);
 if(relative==='sw.js'){
  const original=body.toString();
  assert.equal([...original.matchAll(/^const CACHE\s*=\s*(['"])[^'"\r\n]+\1\s*;/gm)].length,1);
  body=Buffer.from(original.replace(/^const CACHE\s*=\s*(['"])[^'"\r\n]+\1\s*;/m,`const CACHE = 'elix-banner-fixture-${revision}';`));
 }
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':relative==='sw.js'?'no-store':'public, max-age=3600','Content-Length':body.length});res.end(body);
});
async function geometry(page){
 return page.evaluate(()=>{
  const bar=document.querySelector('.elix-update-banner');
  const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
  return {bar:box(bar),text:box(bar.querySelector('span')),button:box(bar.querySelector('button')),viewport:document.documentElement.clientWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,dir:getComputedStyle(bar).flexDirection,textOverflow:bar.querySelector('span').scrollWidth>bar.querySelector('span').clientWidth+1};
 });
}
function valid(g,label,largeText=false){
 assert.ok(Math.abs((g.bar.x+g.bar.right)/2-g.viewport/2)<=1,`Off-centre notice ${label}: ${JSON.stringify(g)}`);
 assert.ok(g.bar.x>=11&&g.bar.right<=g.viewport-11,`Missing side margins ${label}`);
 assert.ok(g.bar.y>=0&&g.bar.bottom<=g.height-10,`Vertical clipping ${label}`);
 assert.ok(g.scrollWidth<=g.viewport+1,`Horizontal page overflow ${label}`);
 for(const key of ['text','button']){
  const b=g[key];assert.ok(b.x>=g.bar.x+8&&b.right<=g.bar.right-8&&b.y>=g.bar.y+8&&b.bottom<=g.bar.bottom-8,`Clipped ${key} ${label}`);
 }
 assert.ok(g.button.height>=44,`Touch target too small ${label}`);
 assert.equal(g.textOverflow,false,`Clipped message ${label}`);
 if(g.dir==='row'){
  assert.ok(g.button.x-g.text.right>=9,`Text/button overlap ${label}`);
  assert.ok(Math.abs(g.button.y+g.button.height/2-g.text.y-g.text.height/2)<=1,`Vertical alignment ${label}`);
 }else assert.ok(g.button.y>=g.text.bottom+7,`Stacked controls overlap ${label}`);
 if(!largeText&&g.viewport>=768){assert.ok(g.bar.width<520,`Unnecessary fixed-width space ${label}`);assert.ok(g.bar.height<=72,`Oversized desktop notice ${label}`);}
}
(async()=>{
 fs.mkdirSync(out,{recursive:true});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
 const base=`http://127.0.0.1:${server.address().port}/PHARMA/`;
 const browser=await chromium.launch({headless:true,...(process.env.ELIX_CHROMIUM?{executablePath:process.env.ELIX_CHROMIUM}:{} )});
 const errors=[],matrix=[],lifecycle=[];
 try{
  for(const scale of [1,2]){
   revision=1;
   const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:scale,reducedMotion:'reduce'});
   const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
   await page.route('https://**/*',route=>route.abort());
   try{
    await page.goto(base+'#/atlas');await page.waitForSelector('#ev-search');
    await page.waitForFunction(()=>navigator.serviceWorker.controller?.state==='activated',null,{timeout:30000});
    assert.equal(await page.locator('.elix-update-banner').count(),0,'First install is not an update');
    await page.reload();await page.waitForSelector('#ev-search');
    await page.locator('#ev-search').focus();
    revision=2;
    await page.evaluate(async()=>{const registration=await navigator.serviceWorker.ready;await registration.update();});
    await page.waitForSelector('.elix-update-banner');
    await page.waitForFunction(()=>navigator.serviceWorker.controller?.state==='activated');
    assert.equal(await page.evaluate(()=>document.activeElement.id),'ev-search','Notice must not steal keyboard focus');
    assert.equal(await page.locator('.elix-update-banner').count(),1);
    assert.equal(await page.locator('.elix-update-banner').getAttribute('role'),'status');
    assert.equal(await page.locator('.elix-update-banner').getAttribute('aria-live'),'polite');
    assert.equal(await page.locator('.elix-update-banner button').getAttribute('type'),'button');
    for(const width of [320,360,390,420,768,1024,1440,1920])for(const theme of ['light','dark']){
     await page.setViewportSize({width,height:width<768?844:1000});
     if(await page.locator('body').getAttribute('data-theme')!==theme)await page.locator('[data-act="theme"]').click();
     const g=await geometry(page);valid(g,`${width}/${theme}/dpr${scale}`);
     assert.equal(await page.locator('.topnav-link').count(),5);
     matrix.push({width,theme,deviceScaleFactor:scale,...g});
     if(scale===1&&[320,390,1440].includes(width))await page.screenshot({path:path.join(out,`update-banner-${width}-${theme}.png`)});
    }
    // Text enlargement, independent of device pixels and browser viewport size.
    for(const width of [320,390,768]){
     await page.setViewportSize({width,height:844});
     await page.locator('.elix-update-banner').evaluate(el=>el.style.fontSize='26px');
     valid(await geometry(page),`text200/${width}/dpr${scale}`,true);
    }
    await page.locator('.elix-update-banner').evaluate(el=>el.style.removeProperty('font-size'));
    // A repeated lifecycle event cannot duplicate the notice. A route render cannot remove it.
    await page.evaluate(()=>navigator.serviceWorker.dispatchEvent(new Event('controllerchange')));
    assert.equal(await page.locator('.elix-update-banner').count(),1);
    await page.locator('a.topnav-link[href="#/textbook"]').click();await page.waitForSelector('#ex-book-search');
    assert.equal(await page.locator('.elix-update-banner').count(),1);
    await page.setViewportSize({width:390,height:844});
    await context.setOffline(true);await page.waitForSelector('#elix-offline');
    const notices=await page.locator('#elix-notifications>div').evaluateAll(es=>es.map(el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right};}));
    assert.equal(notices.length,2);assert.ok(notices[0].bottom+7<=notices[1].top,'Offline and update overlap');
    valid(await geometry(page),'offline overlap');
    if(scale===1)await page.screenshot({path:path.join(out,'update-banner-with-offline.png')});
    await context.setOffline(false);await page.waitForSelector('#elix-offline',{state:'detached'});
    await page.locator('.elix-update-banner button').focus();
    await Promise.all([page.waitForNavigation({waitUntil:'load'}),page.locator('.elix-update-banner button').press('Enter')]);
    await page.waitForSelector('#ex-book-search');
    assert.equal(await page.locator('.elix-update-banner').count(),0,'Ricarica must clear the notice');
    assert.equal(await page.evaluate(()=>location.hash),'#/textbook','Reload must preserve the current route');
    await page.evaluate(async()=>{await (await navigator.serviceWorker.ready).update();});
    assert.equal(await page.locator('.elix-update-banner').count(),0,'Same worker revision must not prompt again');
    lifecycle.push({deviceScaleFactor:scale,firstInstallSilent:true,realUpgradeNotice:true,noFocusSteal:true,noDuplicates:true,routeAndThemePreserved:true,offlineStack:true,keyboardReload:true,sameRevisionSilent:true});
   }finally{await context.close();}
  }
  assert.deepEqual(errors,[]);
  const report={passed:true,configurations:matrix.length,textEnlargementChecks:6,lifecycle,errors,matrix};
  fs.writeFileSync(path.join(out,'update-banner-report.json'),JSON.stringify(report,null,2));
  console.log('UPDATE_BANNER_PASS',JSON.stringify({...report,matrix:undefined}));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);server.close();process.exit(1)});
