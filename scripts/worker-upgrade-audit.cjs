/* Synthetic release fixture: no pharmaceutical content and no external resources.
   Run with the audit's existing Playwright browser. Do not route requests here:
   Playwright interception disables the HTTP cache this regression must exercise. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {createHash}=require('node:crypto');

const FILES=['./','./index.html','./app.js','./data.json'];
const ASSET_PATHS=['/','/index.html','/app.js','/data.json'];
const CACHE_CONTROL='public, max-age=3600';
const TIMEOUT=20000;

function fixtureWorker(source,cacheName){
 let cacheDeclarations=0,fileDeclarations=0;
 const adapted=source
  .replace(/^const CACHE\s*=\s*[^\r\n]+;/m,()=>{cacheDeclarations++;return 'const CACHE = '+JSON.stringify(cacheName)+';';})
  .replace(/^const FILES\s*=\s*\[[\s\S]*?\];/m,()=>{fileDeclarations++;return 'const FILES = '+JSON.stringify(FILES)+';';});
 assert.equal(cacheDeclarations,1,'Fixture could not replace the actual worker CACHE declaration');
 assert.equal(fileDeclarations,1,'Fixture could not replace the actual worker FILES declaration');
 return adapted;
}

function previousInstaller(source){
 // This is the only deliberate behavioral mutation, confined to the negative
 // control. The positive scenario retains the actual install/activate/fetch code.
 const reloadInstaller=/cache\.addAll\(\s*FILES\.map\(\s*file\s*=>\s*new Request\(\s*file\s*,\s*\{\s*cache\s*:\s*(['"])reload\1\s*\}\s*\)\s*\)\s*\)/g;
 const matches=[...source.matchAll(reloadInstaller)];
 if(matches.length){
  assert.equal(matches.length,1,'Negative control must change exactly one installer call');
  return source.replace(reloadInstaller,'cache.addAll(FILES)');
 }
 // If the old installer itself returns, run it in both cases: the positive UI
 // assertion must then fail with revision 1 instead of silently skipping the test.
 assert.match(source,/cache\.addAll\(\s*FILES\s*\)/,'Review the negative fixture when the installer changes');
 return source;
}

function fixtureHTML(revision){
 return '<!doctype html><html lang="it"><head><meta charset="utf-8"><title>Synthetic worker upgrade fixture</title><link rel="icon" href="data:,"></head><body>'+
  '<h1>Fixture sintetica di aggiornamento — nessun dato clinico</h1>'+
  '<p>HTML: <output id="html-revision">revision-'+revision+'</output></p>'+
  '<p>JavaScript: <output id="javascript-revision"></output></p>'+
  '<p>JSON: <output id="json-revision"></output></p><p id="fixture-error"></p>'+
  '<script src="./app.js"></script></body></html>';
}

function fixtureJavaScript(revision){
 return "'use strict';\n"+
  "document.getElementById('javascript-revision').textContent='revision-"+revision+"';\n"+
  "fetch('./data.json').then(response=>{if(!response.ok)throw new Error('Fixture JSON '+response.status);return response.json();})"+
  ".then(data=>{document.getElementById('json-revision').textContent='revision-'+data.revision;})"+
  ".catch(error=>{document.getElementById('fixture-error').textContent=error.message;});\n";
}

async function readRevisionUI(page){
 await page.waitForFunction(()=>document.getElementById('fixture-error')?.textContent||
  ['html-revision','javascript-revision','json-revision'].every(id=>/^revision-[12]$/.test(document.getElementById(id)?.textContent||'')),null,{timeout:TIMEOUT});
 const result=await page.evaluate(()=>({
  html:document.getElementById('html-revision').textContent,
  javascript:document.getElementById('javascript-revision').textContent,
  json:document.getElementById('json-revision').textContent,
  error:document.getElementById('fixture-error').textContent
 }));
 assert.equal(result.error,'','Synthetic fixture could not read its JSON');
 delete result.error;
 return result;
}

function expectedUI(revision){
 return {html:'revision-'+revision,javascript:'revision-'+revision,json:'revision-'+revision};
}

async function runUpgradeScenario(browser,workerSource,scenario,expectedRevision){
 let revision=1,context,page,phase='server-start';
 const requests=[],pageErrors=[],responses=[];
 const cacheName=n=>'elix@/::upgrade-fixture-'+scenario+'-revision-'+n;
 const workers={1:fixtureWorker(workerSource,cacheName(1)),2:fixtureWorker(workerSource,cacheName(2))};
 const server=http.createServer((request,response)=>{
  const pathname=new URL(request.url,'http://fixture.invalid').pathname;
  let body,type,cacheControl=CACHE_CONTROL;
  if(request.method!=='GET'){
   response.writeHead(405,{'Cache-Control':'no-store'});response.end();return;
  }
  if(pathname==='/'||pathname==='/index.html'){
   body=fixtureHTML(revision);type='text/html; charset=utf-8';
  }else if(pathname==='/app.js'){
   body=fixtureJavaScript(revision);type='text/javascript; charset=utf-8';
  }else if(pathname==='/data.json'){
   body=JSON.stringify({fixture:'synthetic; no clinical data',revision});type='application/json; charset=utf-8';
  }else if(pathname==='/sw.js'){
   body=workers[revision];type='text/javascript; charset=utf-8';cacheControl='no-store';
  }else{
   response.writeHead(404,{'Cache-Control':'no-store'});response.end();return;
  }
  requests.push({path:pathname,revision,phase});
  response.writeHead(200,{'Content-Type':type,'Cache-Control':cacheControl,'Content-Length':Buffer.byteLength(body)});
  response.end(body);
 });
 const assetCounts=()=>Object.fromEntries(ASSET_PATHS.map(asset=>[asset,requests.filter(request=>request.path===asset).length]));
 try{
  await new Promise((resolve,reject)=>{
   server.once('error',reject);
   server.listen(0,'127.0.0.1',()=>{server.removeListener('error',reject);resolve();});
  });
  const origin='http://127.0.0.1:'+server.address().port;
  context=await browser.newContext({serviceWorkers:'allow'});
  page=await context.newPage();
  page.on('pageerror',error=>pageErrors.push(error.message));
  page.on('response',response=>{
   const url=new URL(response.url());
   if(url.origin===origin&&ASSET_PATHS.includes(url.pathname))responses.push({path:url.pathname,fromServiceWorker:response.fromServiceWorker()});
  });
  // No page.route/context.route, CDP cache override, or automatic SW registration.
  phase='warm-http-cache';
  await page.goto(origin+'/');
  assert.deepEqual(await readRevisionUI(page),expectedUI(1),scenario+': initial revision');
  assert.equal(await page.evaluate(()=>navigator.serviceWorker.controller),null,scenario+': cache must be warmed before any worker controls the page');
  assert.equal(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).length),0);
  await page.evaluate(async files=>{
   await Promise.all(files.map(async file=>{
    const response=await fetch(file,{cache:'reload'});
    if(!response.ok)throw new Error('Cannot warm '+file);
    await response.text();
   }));
  },FILES);
  const warmCounts=assetCounts();
  assert.ok(Object.values(warmCounts).every(count=>count>0),scenario+': every core asset must have reached the server before warming');
  await page.evaluate(async files=>{
   await Promise.all(files.map(async file=>{
    const response=await fetch(file);
    if(!response.ok)throw new Error('Cannot repeat '+file);
    await response.text();
   }));
  },FILES);
  assert.deepEqual(assetCounts(),warmCounts,scenario+': repeated requests did not use a warm HTTP cache');
  assert.equal(await page.evaluate(()=>navigator.serviceWorker.controller),null,scenario+': warm-cache proof must not be a CacheStorage hit');

  phase='initial-worker-activation';
  await page.evaluate(async()=>{
   await navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'});
  });
  await page.waitForFunction(()=>navigator.serviceWorker.controller?.state==='activated',null,{timeout:TIMEOUT});
  assert.ok((await page.evaluate(()=>caches.keys())).includes(cacheName(1)),scenario+': revision 1 was not installed');
  assert.deepEqual(await readRevisionUI(page),expectedUI(1));

  revision=2;
  phase='worker-upgrade';
  const upgradeRequestStart=requests.length;
  const controllerChange=await page.evaluate(timeout=>new Promise((resolve,reject)=>{
   const previous=navigator.serviceWorker.controller;
   const started=performance.now(),lifecycle=[];
   window.__workerUpgradeLifecycle=lifecycle;
   const record=(event,worker)=>lifecycle.push({event,elapsedMs:Math.round(performance.now()-started),state:worker?.state||null,isController:worker===navigator.serviceWorker.controller});
   let timer,nextController,stateAtControllerChange;
   const cleanup=()=>{
    clearTimeout(timer);
    navigator.serviceWorker.removeEventListener('controllerchange',onChange);
    nextController?.removeEventListener('statechange',onStateChange);
   };
   const fail=error=>{cleanup();reject(error);};
   const onStateChange=()=>{
    record('new-controller-state',nextController);
    if(navigator.serviceWorker.controller!==nextController)return fail(new Error('The captured revision 2 worker is no longer the controller'));
    if(nextController.state==='redundant')return fail(new Error('The revision 2 worker became redundant before activation completed'));
    if(nextController.state!=='activated')return;
    cleanup();resolve({changed:true,stateAtControllerChange,state:nextController.state,previousState:previous.state,lifecycle});
   };
   const onChange=()=>{
    const controller=navigator.serviceWorker.controller;
    record('controllerchange',controller);
    if(!controller||controller===previous)return;
    if(nextController&&controller!==nextController)return fail(new Error('Controller changed again during the revision 2 upgrade'));
    nextController=controller;
    stateAtControllerChange=controller.state;
    // controllerchange precedes activate's waitUntil completion. Wait for this
    // exact worker to be activated before inspecting its cache cleanup.
    nextController.addEventListener('statechange',onStateChange);
    onStateChange();
   };
   record('before-update',previous);
   if(previous?.state!=='activated')return fail(new Error('Revision 1 controller is not fully activated'));
   navigator.serviceWorker.addEventListener('controllerchange',onChange);
   timer=setTimeout(()=>fail(new Error('Timed out waiting for revision 2 controllerchange and activated state')),timeout);
   navigator.serviceWorker.getRegistration().then(registration=>{
    if(registration?.active!==previous)throw new Error('Revision 1 registration does not match the captured controller');
    return registration.update();
   }).catch(fail);
  }),TIMEOUT);
  assert.equal(controllerChange.changed,true,scenario+': worker did not take control after update()');
  phase='activated-cache-assertions';
  const installedCacheNames=await page.evaluate(()=>caches.keys());
  assert.ok(installedCacheNames.includes(cacheName(2)),scenario+': revision 2 cache is missing');
  assert.ok(!installedCacheNames.includes(cacheName(1)),scenario+': previous worker cache survived activation');
  const upgradeAssets=requests.slice(upgradeRequestStart).filter(request=>ASSET_PATHS.includes(request.path));
  if(expectedRevision===2){
   assert.deepEqual([...new Set(upgradeAssets.map(request=>request.path))].sort(),[...ASSET_PATHS].sort(),scenario+': new installer did not fetch every revision 2 asset');
   assert.ok(upgradeAssets.every(request=>request.revision===2),scenario+': server returned a mixed release');
  }else assert.deepEqual(upgradeAssets,[],scenario+': the old installer did not reproduce stale HTTP-cache reuse');

  const beforeReloadCounts=assetCounts(),reloadResponseStart=responses.length;
  phase='reload';
  await page.reload();
  const observed=await readRevisionUI(page);
  assert.deepEqual(observed,expectedUI(expectedRevision),scenario+': UI after worker update and reload');
  assert.deepEqual(assetCounts(),beforeReloadCounts,scenario+': reload bypassed the newly installed core snapshot');
  const reloadResponses=responses.slice(reloadResponseStart);
  for(const asset of ['/','/app.js','/data.json']){
   const matches=reloadResponses.filter(response=>response.path===asset);
   assert.ok(matches.length>0&&matches.every(response=>response.fromServiceWorker),scenario+': reload was not served by the worker for '+asset);
  }
  const cachedJSON=await page.evaluate(async name=>{
   const cache=await caches.open(name),response=await cache.match('./data.json');
   return response?response.json():null;
  },cacheName(2));
  assert.equal(cachedJSON?.revision,expectedRevision,scenario+': installed JSON differs from the rendered release');
  assert.deepEqual(pageErrors,[],scenario+': runtime JavaScript failures');
  // Returned only after the cache, controller, real UI, and provenance checks pass.
  return {scenario,expectedRevision,observed,httpCacheWarmBeforeRegistration:true,warmAssetRequests:warmCounts,controllerChange,installedCache:cacheName(2),previousCacheRemoved:true,upgradeAssetRequests:upgradeAssets,reloadServedByWorker:true,cachedJSONRevision:cachedJSON.revision};
 }catch(error){
  let browserState;
  try{
   browserState=page?await page.evaluate(async()=>{
    const registration=await navigator.serviceWorker.getRegistration();
    const describe=worker=>worker?{state:worker.state,scriptURL:worker.scriptURL}:null;
    return {controller:describe(navigator.serviceWorker.controller),active:describe(registration?.active),waiting:describe(registration?.waiting),installing:describe(registration?.installing),activeIsController:registration?.active===navigator.serviceWorker.controller,cacheNames:await caches.keys(),lifecycle:window.__workerUpgradeLifecycle||[]};
   }):{unavailable:'Page not created'};
  }catch(diagnosticError){browserState={unavailable:diagnosticError.message};}
  console.error('WORKER_UPGRADE_FAILURE',JSON.stringify({scenario,phase,serverRevision:revision,error:error.message,browserState,requests,responses,pageErrors}));
  throw error;
 }finally{
  try{if(context)await context.close();}
  finally{
   if(server.listening)await new Promise((resolve,reject)=>{
    server.close(error=>error?reject(error):resolve());
    server.closeAllConnections();
   });
  }
 }
}

async function verifyWorkerUpgrade(browser){
 const source=fs.readFileSync(path.join(__dirname,'../sw.js'),'utf8');
 const negativeControl=await runUpgradeScenario(browser,previousInstaller(source),'previous-installer',1);
 const actualWorker=await runUpgradeScenario(browser,source,'actual-worker',2);
 return {passed:true,fixture:'synthetic; no clinical data',source:'sw.js',sourceSHA256:createHash('sha256').update(source).digest('hex'),assetCacheControl:CACHE_CONTROL,workerCacheControl:'no-store',requestInterception:false,negativeControl,actualWorker};
}

module.exports={verifyWorkerUpgrade};
