/* ELIX audit: preserve reading context, view real structural drawings safely, and expose failure states.
   Drawings are source depictions. Auto-fit changes only the viewport, never chemical coordinates. */
let lastRoute=null;
export function preserveReading(render){
 const same=lastRoute===globalThis.location?.hash;
 const root=globalThis.document?.querySelector?.('.content');
 const details=same&&root?[...root.querySelectorAll('details')].filter(e=>e.open&&!e.matches('.ev-topic,.ex-filter-card')).map(e=>detailKey(e)):[];
 const active=same?globalThis.document?.activeElement:null;
 const focus=active&&root?.contains(active)?focusKey(active):null;
 const caret=active&&typeof active.selectionStart==='number'?[active.selectionStart,active.selectionEnd]:null;
 const scroll=same?(globalThis.window?.scrollY||0):null;
 render();lastRoute=globalThis.location?.hash;
 const next=globalThis.document?.querySelector?.('.content');
 if(!next)return;
 if(same){for(const el of next.querySelectorAll('details'))if(details.includes(detailKey(el)))el.open=true;}
 if(focus){const el=[...next.querySelectorAll('button,input,select,summary,a')].find(x=>focusKey(x)===focus);el?.focus?.({preventScroll:true});if(caret&&el?.setSelectionRange){try{el.setSelectionRange(...caret);}catch{}}}
 if(scroll!==null)globalThis.window?.scrollTo?.({top:scroll,behavior:'instant'});
 const heading=next.querySelector('h1')?.innerText?.replace(/\s+/g,' ').trim()||next.querySelector('h1')?.textContent?.trim();
 if(heading){document.title=heading+' · ELIX';const crumb=document.querySelector('.crumb strong');if(crumb)crumb.textContent=heading;}
}
function detailKey(el){
 if(el.dataset.evSection)return el.dataset.evSection;
 if(el.dataset.pkSource)return 'pk:'+el.dataset.pkSource;
 if(el.dataset.pkOriginal)return 'pk-original:'+el.dataset.pkOriginal;
 if(el.dataset.sourceSection)return 'source:'+el.dataset.sourceSection;
 const parent=el.closest('[data-ev-section]')?.dataset.evSection||'';
 return parent+'|'+(el.querySelector(':scope>summary')?.textContent||'').trim();
}
function focusKey(el){return el.id||[el.tagName,...Object.entries(el.dataset||{}).sort().map(x=>x.join('=')),el.getAttribute?.('href')||'',el.tagName==='SUMMARY'?el.textContent:''].join('|');}

const SVG_NS='http://www.w3.org/2000/svg';
const TAGS=new Set(['svg','g','path','line','polyline','polygon','circle','ellipse','text','tspan','rect']);
const ATTRS=new Set(['d','points','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','width','height','transform','viewBox','fill','stroke','stroke-width','fill-rule','opacity','stroke-linecap','stroke-linejoin','stroke-dasharray','font-size','font-family','font-weight','font-style','text-anchor','dominant-baseline']);
const STYLES=['fill','stroke','stroke-width','fill-rule','opacity','stroke-linecap','stroke-linejoin','stroke-dasharray','font-size','font-family','font-weight','font-style','text-anchor'];
export function safeChemicalSVG(text,doc=globalThis.document){
 if(typeof text!=='string'||text.length>2000000)throw Error('SVG fuori limite');
 const parsed=new DOMParser().parseFromString(text,'image/svg+xml');
 if(parsed.querySelector('parsererror')||parsed.documentElement.localName!=='svg')throw Error('SVG non valido');
 let count=0;
 function copy(node){
  if(++count>20000)throw Error('SVG troppo complesso');
  if(node.nodeType===3)return doc.createTextNode(node.nodeValue);
  if(node.nodeType!==1||!TAGS.has(node.localName))return null;
  // Remove only the source canvas background; bonds and stereochemistry remain unchanged.
  if(node.localName==='rect'&&node.parentElement===parsed.documentElement){
   const root=parsed.documentElement,vb=(root.getAttribute('viewBox')||'').split(/[ ,]+/).map(Number);
   const w=vb[2]||Number(root.getAttribute('width')),hh=vb[3]||Number(root.getAttribute('height'));
   const fill=node.getAttribute('fill')||node.style?.fill||'';
   const fullW=node.getAttribute('width')==='100%'||Number(node.getAttribute('width'))>=w;
   const fullH=node.getAttribute('height')==='100%'||Number(node.getAttribute('height'))>=hh;
   if(fullW&&fullH&&/^(?:white|#fff(?:fff)?|rgb\(255,\s*255,\s*255\))$/i.test(fill)&&Number(node.getAttribute('x')||0)===0&&Number(node.getAttribute('y')||0)===0)return null;
  }
  const el=doc.createElementNS(SVG_NS,node.localName);
  for(const a of node.attributes)if(ATTRS.has(a.name)&&!/[<>]|url\s*\(|javascript|data:/i.test(a.value))el.setAttribute(a.name,a.value);
  for(const property of STYLES){const v=node.style?.getPropertyValue(property);if(v&&!/url\s*\(|expression|javascript|@/i.test(v))el.style.setProperty(property,v);}
  for(const child of node.childNodes){const c=copy(child);if(c)el.append(c);}
  return el;
 }
 const svg=copy(parsed.documentElement);if(!svg||!svg.querySelector('path,line,circle,polygon,text'))throw Error('SVG senza disegno');
 svg.removeAttribute('width');svg.removeAttribute('height');svg.classList.add('ev-fit-svg');
 svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('role','img');
 return svg;
}
export function fitChemicalSVG(svg){
 const group=document.createElementNS(SVG_NS,'g');while(svg.firstChild)group.append(svg.firstChild);svg.append(group);
 const box=group.getBBox();
 if(!Number.isFinite(box.width)||box.width<=0||box.height<=0){while(group.firstChild)svg.append(group.firstChild);group.remove();return false;}
 const pad=Math.max(10,Math.max(box.width,box.height)*.08);
 svg.setAttribute('viewBox',[box.x-pad,box.y-pad,box.width+2*pad,box.height+2*pad].map(n=>n.toFixed(3)).join(' '));
 svg.dataset.fitted='true';return true;
}
const imageJobs=new Map(),observed=new WeakSet();
async function fitImage(img){
 if(!img.isConnected)return;
 const id=img.dataset.evImage;
 if(!/^CHEMBL\d+$/.test(id||'')||!img.src.startsWith('https://www.ebi.ac.uk/chembl/api/data/image/'))return;
 try{
  let job=imageJobs.get(id);
  if(!job){job=fetch('https://www.ebi.ac.uk/chembl/api/data/image/'+id+'.svg',{signal:AbortSignal.timeout(7000)}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.text();});imageJobs.set(id,job);if(imageJobs.size>96)imageJobs.delete(imageJobs.keys().next().value);}
  const text=await job;if(!img.isConnected)return;
  const svg=safeChemicalSVG(text);svg.setAttribute('aria-label',img.alt||'Struttura chimica da ChEMBL');
  const stage=img.closest('.ev-chem-stage');if(!stage)return;
  stage.prepend(svg);if(fitChemicalSVG(svg)){img.remove();stage.dataset.structureState='verified-2d';}else svg.remove();
 }catch{/* Original source image remains usable. Never replace a failed crop with invented coordinates. */}
}
function installStructureObserver(){
 if(typeof IntersectionObserver==='undefined')return;
 const io=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){io.unobserve(e.target);fitImage(e.target);}}, {rootMargin:'180px'});
 const discover=()=>{for(const img of document.querySelectorAll('img[data-ev-image]'))if(!observed.has(img)){observed.add(img);io.observe(img);}};
 new MutationObserver(discover).observe(document.getElementById('app'),{childList:true,subtree:true});discover();
}
function openStructure(button){
 const source=button.closest('.ev-chem')?.querySelector('.ev-chem-stage');if(!source)return;
 const dialog=document.createElement('dialog');dialog.className='ev-structure-dialog';dialog.setAttribute('aria-label','Struttura ingrandita');
 const bar=document.createElement('div');bar.className='ev-dialog-bar';
 const title=document.createElement('strong');title.textContent=source.querySelector('.ev-concept-art')?'Illustrazione di categoria · non modello atomico':(source.querySelector('.ev-chem-source-badge')?.textContent||'Rappresentazione della fonte');
 const close=document.createElement('button');close.type='button';close.textContent='Chiudi ×';close.setAttribute('aria-label','Chiudi la struttura ingrandita');
 bar.append(title,close);const canvas=document.createElement('div');canvas.className='ev-dialog-canvas';canvas.append(source.cloneNode(true));
 dialog.append(bar,canvas);document.body.append(dialog);close.onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 dialog.addEventListener('close',()=>{dialog.remove();button.isConnected&&button.focus({preventScroll:true});},{once:true});
 dialog.showModal();close.focus();
}
// Notices share a stack so offline and update messages cannot cover one another.
// Keep the host outside #app: route/theme renders must not displace the notice.
function notificationStack(){
 let stack=document.getElementById('elix-notifications');
 if(!stack){stack=document.createElement('div');stack.id='elix-notifications';stack.className='elix-notifications';document.body.append(stack);}
 return stack;
}
function showUpdateBanner(){
 if(document.querySelector('.elix-update-banner'))return;
 const bar=document.createElement('div');bar.className='elix-update-banner';
 bar.setAttribute('role','status');bar.setAttribute('aria-live','polite');bar.setAttribute('aria-atomic','true');
 const text=document.createElement('span');text.className='elix-update-message';text.textContent='È pronta una nuova versione di eli.';
 const button=document.createElement('button');button.type='button';button.textContent='Ricarica';button.onclick=()=>location.reload();
 bar.append(text,button);notificationStack().append(bar);
}
export function installUsability(){
 if(typeof document==='undefined')return;
 installStructureObserver();
 if('serviceWorker' in navigator){
  const hadController=Boolean(navigator.serviceWorker.controller);let shown=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!hadController||shown)return;shown=true;showUpdateBanner();});
 }
 document.addEventListener('click',e=>{const b=e.target.closest?.('[data-structure-zoom]');if(b){e.preventDefault();openStructure(b);}});
 const update=()=>{let banner=document.getElementById('elix-offline');if(!navigator.onLine){if(!banner){banner=document.createElement('div');banner.id='elix-offline';banner.role='status';banner.textContent='Sei offline. Sono disponibili i contenuti già salvati; nuove fonti e modelli 3D richiedono la rete.';notificationStack().prepend(banner);}}else banner?.remove();};
 window.addEventListener('offline',update);window.addEventListener('online',update);update();
}
