import {ESSENTIAL_BATCH} from './elix-essential-batch.js';
import {buildCatalogCoverage,coverageMatches,renderCoverageAudit} from './elix-coverage-audit.js';
import {appendContentBatches,renderBatchPharmacology} from './elix-content-batches.js';
import {loadVerifiedIndex,verifiedRecord,verifiedBadges,verifiedOverview,renderVerifiedData,renderVerifiedByArea,renderReviewedProductSource,verifiedMarketSummary,verifiedPublicPrice,hasVerifiedData} from './elix-verified.js';
import {reviewedProfiles,reviewedProfile,profileSource,profileContext,isMissingPK,renderPKContext,renderReviewedPK} from './elix-pk-reviewed.js';
import {italianDrugName, hasReviewedItalianName, internationalDrugName} from './italian-names.js';
import {renderDeepDrug,renderTrialEvidence,firstTrialMetric} from './elix-rich-reader.js';
import {schematicStructure} from './elix-structure-visuals.js';
import {GUIDELINES_09} from './elix-09-content.js';
/* Source-aware expansion of the recovered Alpha 0.3. No patient-specific decisions. */
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeUrl=u=>/^https?:\/\//i.test(u||'')?esc(u):'#';
const external=(url,title)=>`<a class="ev-link" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${esc(title)} ↗</a>`;
const date=x=>/^\d{8}$/.test(x||'')?`${x.slice(6,8)}/${x.slice(4,6)}/${x.slice(0,4)}`:/^\d{4}-\d{2}-\d{2}$/.test(x||'')?x.split('-').reverse().join('/'):esc(x);
const num=x=>Number(x).toLocaleString('it-IT');
const pill=(s,c='')=>`<span class="ev-tag ${c}">${esc(s)}</span>`;
const card=(title,body)=>`<section class="ev-panel"><h2>${esc(title)}</h2>${body}</section>`;
const formula=s=>esc(s).replace(/(\d+)/g,'<sub>$1</sub>');
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const italianType=type=>({"small molecule":"Piccola molecola","protein":"Proteina","antibody":"Anticorpo","oligonucleotide":"Oligonucleotide","gene":"Gene","unknown":"Tipologia non definita"})[String(type||'').toLowerCase()]||String(type||'');
const formatUntranslatedName=value=>{
 const raw=String(value||'');
 return /^[A-Z0-9\s().,'+\-/]+$/.test(raw)&&/[A-Z]{5}/.test(raw)
   ?raw.toLocaleLowerCase('it-IT').replace(/^([^a-zà-ÿ]*)([a-zà-ÿ])/u,(_all,prefix,initial)=>prefix+initial.toLocaleUpperCase('it-IT'))
   :raw;
};
const sectionNames={description:'Composizione e descrizione',mechanism_of_action:'Meccanismo d’azione',pharmacodynamics:'Farmacodinamica',pharmacokinetics:'Farmacocinetica',clinical_pharmacology:'Farmacologia clinica',indications_and_usage:'Indicazioni autorizzate per questo prodotto USA',contraindications:'Controindicazioni',boxed_warning:'Avvertenza in evidenza',warnings_and_cautions:'Avvertenze e precauzioni',warnings:'Avvertenze',adverse_reactions:'Reazioni avverse',drug_interactions:'Interazioni',use_in_specific_populations:'Popolazioni speciali',pregnancy:'Gravidanza',pediatric_use:'Età pediatrica',geriatric_use:'Età geriatrica',clinical_studies:'Studi clinici del prodotto',dosage_and_administration:'Posologia del prodotto USA — fonte originale'};

export function createEvidenceAtlas({refresh,legacyDrugs}){
 let db=null,error='',loading=false,pkWarning='';
 const state={query:'',group:'',type:'',country:'',page:0,news:'',classesQuery:'',dataKind:'',order:'name'};
 const expandedSections=new Set();
 const pkSelections=new Map();
 const labels=new Map();
 const byId=new Map(),byLegacy=new Map(),editorial=new Map();
 let searchable=[];
 async function json(path){const r=await fetch(new URL(path,import.meta.url),{cache:'no-cache'});if(!r.ok)throw new Error(`${path}: ${r.status}`);return r.json();}
 async function load(){
  if(loading)return;loading=true;error='';pkWarning='';
  try{
   const [catalog,registry,ed,labelIndex,news,pkReviewed]=await Promise.all([...['catalog','registry','editorial','labels-index','news'].map(n=>json(`data/${n}.json`)),json('data/pk-reviewed.json').catch(e=>{pkWarning='Sintesi PK revisionate non caricate. Restano consultabili il catalogo e i documenti già disponibili.';console.warn('ELIX reviewed PK unavailable',e);return {profiles:[],sources:[]};})]);
   const verifiedIndex=await loadVerifiedIndex(refresh);
   appendContentBatches(ed,pkReviewed);
   appendContentBatches(ed,pkReviewed,ESSENTIAL_BATCH);
   db={catalog,registry,ed,labelIndex,news,pkReviewed,verifiedIndex};
   db.coverage=buildCatalogCoverage({catalog,editorial:ed,pk:pkReviewed,index:verifiedIndex});
   db.coverageById=new Map(db.coverage.rows.map(row=>[row.id,row]));
   for(const d of ed.drugs){byLegacy.set(d.id,d);editorial.set(d.chembl,d);}
   for(const m of catalog.molecules)byId.set(m.id,m);
   searchable=catalog.molecules.map(m=>({m,text:normalize([name(m),m.name,m.id,m.atcItalianLabel,...m.aliases,...m.atc,...m.atc.map(a=>catalog.classes[a.slice(0,5)]||''),...m.mechanisms.map(a=>a.text),editorial.get(m.id)?.name].join(' '))}));
   searchable.sort((a,b)=>name(a.m).localeCompare(name(b.m),'it'));
  }catch(e){error='Non riesco a caricare il catalogo. I laboratori originali restano disponibili. Controlla la connessione e riprova.';console.warn('PHARMA catalog',e);}
  loading=false;refresh();
 }
 const name=m=>{const it=italianDrugName(m,editorial.get(m.id)?.name);return hasReviewedItalianName(m,editorial.get(m.id)?.name)?it:formatUntranslatedName(it);};
 const english=m=>internationalDrugName(m);
 const info=m=>editorial.get(m.id)||editorial.get(m.parent);
 const selectedPK=m=>reviewedProfile(m,db?.pkReviewed,pkSelections.get(m.id));
 const primaryPKSource=profile=>{const sources=(profile?.sourceIds||[]).map(id=>profileSource(db.pkReviewed,id)).filter(Boolean);return sources.find(source=>source.setId)||sources[0];};
 const registry=m=>db.registry.records[m.parent||m.id]||{};
 function nav(){return '';}

 function title(kicker,t,lead){return `<div class="ev-heading"><span class="eyebrow">${esc(kicker)}</span><h1>${esc(t)}</h1><p>${esc(lead)}</p></div>`;}
 function loadingPage(){return `${nav()}${card(error?'Catalogo non disponibile':'Caricamento del catalogo',`<p role="status">${esc(error||'Sto aprendo molecole, fonti e registri ufficiali…')}</p>${error?'<button class="btn" data-ev="retry">Riprova</button>':''}`)}`;}
 function chemistry(m,mini=false){
 const heparin=m.id==="CHEMBL4650299"||/^HEPARIN( |$)/.test(m.name);
 const source=heparin?"https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a120bdfd-21e1-4024-82a7-13cfeed290c1":`https://www.ebi.ac.uk/chembl/explore/compound/${m.id}`;
 const image=heparin?"./assets/heparin-subunits.jpg":m.smiles?`https://www.ebi.ac.uk/chembl/api/data/image/${m.id}.svg`:null;
 const note=heparin?"Eparina: miscela di catene. Le subunità sono rappresentative, non una molecola unica.":
   m.name.includes("ENOXAPARIN")?"Miscela di catene a massa diversa: nessuna formula unica della preparazione.":
   !m.smiles?"Non è disponibile una rappresentazione 2D univoca in questo record. Il modello mostrato è un'illustrazione tridimensionale di categoria, non la struttura reale del farmaco.":
   "Rappresentazione 2D dal record chimico ChEMBL; forma parent, sale e stereoisomero possono essere differenti.";
 const content=image?
 `<div class="ev-chem-stage ev-chem-stage-source"><img src="${esc(image)}" data-ev-image="${esc(m.id)}" alt="${heparin?"Frammenti rappresentativi dell'eparina":`Rappresentazione 2D di ${esc(name(m))}`}" loading="lazy" referrerpolicy="no-referrer"/><span class="ev-chem-source-badge">${heparin?"Frammento illustrativo":"Struttura 2D · ChEMBL"}</span></div>`:
 `<div class="ev-chem-stage ev-chem-stage-concept">${schematicStructure(m,mini)}</div>`;
 return `<figure class="ev-chem ${mini?"mini":""} ${image?"has-depiction":"has-concept"}">${content}${mini?'':'<button type="button" class="ev-zoom-button" data-structure-zoom aria-haspopup="dialog">Ingrandisci struttura ↗</button>'}<figcaption>${m.formula?`<span class="ev-formula">${formula(m.formula)}</span>`:mini?'<span class="ev-formula-missing">Formula non univoca</span>':'<strong>Formula unica non disponibile</strong>'}${mini?'':`<p>${esc(note)}</p>${m.mass?`<p>Massa del record: ${esc(m.mass)} g/mol</p>`:""}${external(source,heparin?"Documento DailyMed":"Identità e struttura · ChEMBL")}<small>${esc(m.id)}${m.inchiKey?" · "+esc(m.inchiKey):""}</small>`}</figcaption></figure>`;
}
 function status(m,c){
  const r=registry(m),rows=r[c]||[];
  if(!rows.length)return 'Non verificato';
  const ss=Object.keys(r[c+'statuses']||{});
  if(c==='IT')return ss.includes('Autorizzata')?'Confezioni autorizzate':ss.join(' · ');
  if(c==='EU')return ss.includes('Authorised')?'Prodotti autorizzati':ss.join(' · ');
  return ss.some(x=>['Prescription','Over-the-counter'].includes(x))?'Prodotti Rx/OTC nel registro':ss.join(' · ');
 }
 function filters(){
  const rows=searchable.filter(({m,text})=>(!state.query||text.includes(normalize(state.query)))&&(!state.group||m.atc.some(a=>a.startsWith(state.group)))&&(!state.type||m.type===state.type)&&(!state.country||(registry(m)[state.country]||[]).length)&&(!state.dataKind||coverageMatches(db.coverageById.get(m.id),state.dataKind)||hasVerifiedData(m,state.dataKind)||(state.dataKind==='label'&&Boolean(selectedPK(m)))));
  if(state.order==='price')rows.sort((a,b)=>(verifiedPublicPrice(a.m)??Infinity)-(verifiedPublicPrice(b.m)??Infinity)||name(a.m).localeCompare(name(b.m),'it'));
  else if(state.query){const q=normalize(state.query);rows.sort((a,b)=>searchScore(b.m,q)-searchScore(a.m,q)||name(a.m).localeCompare(name(b.m),'it'));}
  return rows;
 }
 function results(){
  const list=filters();state.page=Math.min(state.page,Math.max(0,Math.ceil(list.length/36)-1));const start=state.page*36;
  return `<div class="ev-results-head"><span role="status">${num(list.length)} record · ${list.length?start+1:0}–${Math.min(start+36,list.length)}</span><span>Identità chimiche, non confezioni</span></div><div class="ev-catalog-grid">${list.slice(start,start+36).map(({m})=>`<a class="ev-molecule-card" href="#/molecule/${m.id}">${chemistry(m,true)}<div><span class="eyebrow">${esc(m.atc.join(' · ')||italianType(m.type))}</span><h2 lang="it">${esc(name(m))}</h2><p class="ev-card-alias"><span class="ev-language-code">EN</span> <span lang="en">${esc(english(m))}</span></p><div class="ev-tags">${verifiedBadges(m,Boolean(selectedPK(m)))}${info(m)?pill('Scheda didattica','green'):pill('Scheda di fonte')}${m.withdrawn?pill('Segnalato ritirato in ChEMBL','amber'):''}${m.veterinary?pill('Uso veterinario registrato'):''}${m.parent!==m.id?pill('Sale / forma correlata'):''}</div></div></a>`).join('')}</div>${list.length?'':`<div class="ev-panel"><h2>Nessun risultato</h2><p>Prova un sinonimo internazionale o un codice ATC. Il catalogo ha una copertura dichiarata, non include ogni sostanza esistente.</p></div>`}<div class="ev-pagination"><button class="btn" data-ev="previous" ${state.page===0?'disabled':''}>← Precedenti</button><span>Pagina ${state.page+1} di ${Math.max(1,Math.ceil(list.length/36))}</span><button class="btn" data-ev="next" ${start+36>=list.length?'disabled':''}>Successivi →</button></div>`;
 }
 function atlas(){
  const advancedCount=[state.type,state.country,state.dataKind,state.order==='price'?'price':''].filter(Boolean).length;
  return `${nav()}${title('Atlante farmacologico','Farmaci e principi attivi','Cerca in italiano o in inglese. Apri una scheda per esplorare meccanismi, dati, studi e documenti del prodotto.')}
  <div class="ev-catalog-links"><a href="#/classes">Classi farmacologiche</a><a href="#/compare">Confronta farmaci</a><a href="#/coverage">Fonti e copertura</a></div>
  <details class="ev-data-drawer"><summary>Copertura dei dati · ${num(db.catalog.molecules.length)} identità chimiche · ${db.ed.drugs.length} sintesi originali</summary><p class="ev-note">Il catalogo comprende identità chimiche correlate, non altrettante monografie complete. Le fonti acquisite e le lacune sono dichiarate per ciascuna scheda.</p>${verifiedOverview()}</details>
  <div class="ev-search-line"><label>Cerca nel catalogo<input id="ev-search" type="search" value="${esc(state.query)}" placeholder="Metoprololo, paracetamolo, anticorpo, B01…" autocomplete="off"></label><label>Area farmacologica<select id="ev-group"><option value="">Tutte le aree ATC</option>${Object.entries(db.catalog.classes).filter(([k])=>k.length===1).sort().map(([k,v])=>`<option value="${k}" ${state.group===k?'selected':''}>${k} · ${esc(v)}</option>`).join('')}</select></label></div>
  <details class="ev-advanced" ${advancedCount?'open':''}><summary><span class="ev-filter-summary">Filtri e ordinamento${advancedCount?' · '+advancedCount+' attivi':''}</span></summary><div class="ev-filter"><label>Tipo di sostanza<select id="ev-type"><option value="">Tutti i tipi</option>${[...new Set(db.catalog.molecules.map(m=>m.type))].sort().map(t=>`<option value="${esc(t)}" ${state.type===t?'selected':''}>${esc(italianType(t))}</option>`).join('')}</select></label><label>Registro collegato<select id="ev-country"><option value="">Tutti, inclusi non verificati</option>${[['IT','Italia · AIFA'],['EU','UE · EMA centralizzata'],['US','USA · Drugs@FDA']].map(([k,v])=>`<option value="${k}" ${state.country===k?'selected':''}>${v}</option>`).join('')}</select></label><label>Dati disponibili<select id="vd-data-kind"><option value="">Tutte le schede</option><option value="editorial" ${state.dataKind==='editorial'?'selected':''}>Sintesi didattica presente</option><option value="needs-editorial" ${state.dataKind==='needs-editorial'?'selected':''}>Sintesi propria da aggiungere</option><option value="source-to-review" ${state.dataKind==='source-to-review'?'selected':''}>Fonte già importata da sintetizzare</option><option value="needs-pk" ${state.dataKind==='needs-pk'?'selected':''}>Fonte disponibile, PK da estrarre</option><option value="activity" ${state.dataKind==='activity'?'selected':''}>Misure sperimentali ChEMBL</option><option value="label" ${state.dataKind==='label'?'selected':''}>Documenti di prodotto e PK</option><option value="market" ${state.dataKind==='market'?'selected':''}>Prezzi italiani AIFA</option></select></label><label>Ordina<select id="vd-order"><option value="name" ${state.order==='name'?'selected':''}>Nome italiano</option><option value="price" ${state.order==='price'?'selected':''}>Minimo prezzo per confezione</option></select></label></div><p class="vd-note">Prezzi riferiti a confezioni, dosi e formati diversi: non costituiscono un confronto del costo di trattamento.</p></details>
  <div class="ev-filter-reset"><button type="button" data-ev="reset">Azzera i filtri</button><span>Nomi, sinonimi e codici ATC sono ricercabili.</span></div>
  <div id="ev-results">${results()}</div><p class="ev-note">Fonte: ${esc(db.catalog.meta.version)}, max_phase=4. Comprende forme correlate e ritiri storici. ${external(db.catalog.meta.licenseUrl,'Dati derivati ChEMBL · CC BY-SA 3.0')} · <a href="#/coverage">Copertura e limiti</a>.</p>`;
 }

 function regulator(m){
  const r=registry(m);
  return card('Stato Italia / UE / USA',`<p>Associazioni per nome e sinonimi, raggruppate per base e sali ChEMBL. Verifica il principio attivo riportato nel prodotto. Autorizzazione, commercializzazione e rimborso sono informazioni distinte.</p><div class="ev-registry">${[['IT','Italia · AIFA'],['EU','Unione europea · EMA'],['US','USA · Drugs@FDA']].map(([c,label])=>`<details><summary><strong>${label}</strong>${pill(status(m,c),(r[c]||[]).length?'green':'amber')}</summary>${(r[c]||[]).length?`<p>${c==='IT'?Object.entries(r.ITcounts||{}).map(([k,n])=>`${num(n)} ${esc(k)}`).join(' · '):Object.entries(r[c+'statuses']||{}).map(([k,n])=>`${num(n)} ${esc(k)}`).join(' · ')}. Mostrati fino a 12 prodotti rappresentativi.</p>${r[c].map(x=>`<article class="ev-product"><h3>${esc(x.name)}</h3><p><strong>${esc(x.status)}</strong> · ${esc(x.id)}${x.updated?' · '+date(x.updated):''}</p><p>${esc(x.ingredient)}${x.form?' · '+esc(x.form):''}${x.route?' · '+esc(x.route):''}</p>${x.supply?`<p>${esc(x.supply)}</p>`:''}${x.opinion?`<p>Parere: ${esc(x.opinion)}</p>`:''}${external(x.url,c==='IT'?'RCP ufficiale del prodotto':c==='EU'?'EPAR e informazioni del prodotto':'Record ufficiale Drugs@FDA')}${x.indication?`<details><summary>Indicazione dal registro EMA (EN)</summary><p lang="en">${esc(x.indication)}</p></details>`:''}</article>`).join('')}`:`<p>Nessun abbinamento univoco in questa importazione. Non significa «non autorizzato».</p>`}${c==='EU'?'<p class="ev-note">EMA: procedure centralizzate; le autorizzazioni nazionali UE non sono tutte incluse.</p>':''}</details>`).join('')}</div><p class="ev-note">Dati acquisiti il ${date(db.registry.meta.retrieved)}. AIFA: dati provvisori descrittivi; FDA: snapshot ${date(db.registry.meta.fdaUpdated)}. <a href="#/coverage">Metodo di abbinamento</a>.</p>`);
 }
 function labelContent(id){
  const data=labels.get(id);if(!data)return `<button class="btn" data-ev="label" data-id="${esc(id)}">Apri farmacologia, sicurezza e studi nella fonte</button>`;
  if(data.error)return `<p role="alert">Fonte non caricata. Puoi aprire il documento ufficiale dal collegamento sopra.</p><button class="btn" data-ev="label" data-id="${esc(id)}">Riprova</button>`;
  return `<div class="ev-label-sections">${Object.entries(sectionNames).filter(([k])=>data.sections[k]).map(([k,v])=>`<details><summary>${esc(v)}</summary><div class="ev-source-text" lang="en">${[...new Set(data.sections[k])].map(p=>`<p>${esc(p)}</p>`).join('')}</div></details>`).join('')}</div><p class="ev-note">Testo della fonte in inglese, mantenuto senza traduzioni automatiche non revisionate. Figure e impaginazione del documento non sono riprodotte; per tabelle e dettagli apri il documento ufficiale. Le sezioni assenti nel record non vengono ricostruite.</p>`;
 }
 function labelPanel(d){
  const l=db.labelIndex[d?.id];if(!l)return card('Approfondimento della molecola','<p>Monografia integrale e revisione clinica ancora da completare. Sono disponibili sotto i meccanismi documentati e, dove abbinati, i documenti ufficiali dei prodotti.</p>');
  return card('Teoria e studi nella fonte del prodotto',`<div class="ev-tags">${pill('Fonte regolatoria USA','green')}${pill('Versione '+date(l.effectiveDate))}</div><p><strong>${esc(l.generic?.join(' / '))}</strong> · ${esc(l.brand?.join(' / '))} · ${esc(l.route?.join(' / '))}<br>${esc(l.manufacturer?.join(' / '))}</p><p>Sezioni consultabili: meccanismo, farmacocinetica, indicazioni, sicurezza, interazioni, popolazioni speciali e studi clinici, quando presenti. La fonte riguarda questo prodotto e questa formulazione.</p>${external(l.url,'Apri la scheda ufficiale DailyMed')}<div id="ev-label-${esc(d.id)}" class="ev-label-box">${labelContent(d.id)}</div>`);
 }
 function pkTable(drugs){
  const rows=drugs.flatMap(d=>{
   const profiles=reviewedProfiles(byId.get(d.chembl),db.pkReviewed);
   if(profiles.length)return profiles.map(profile=>({d,targetId:profile.applicableMoleculeIds.find(id=>id!==profile.moleculeId)||d.chembl,p:{halfLife:profile.metrics.halfLife.summary,bioavailability:profile.metrics.bioavailability.summary,binding:profile.metrics.proteinBinding.summary,context:profileContext(profile)+' · '+profile.population},sources:profile.sourceIds.map(id=>profileSource(db.pkReviewed,id)).filter(Boolean),checked:profile.checkedAt}));
   return [{d,p:d.comparison,sources:db.labelIndex[d.id]?[{url:db.labelIndex[d.id].url,product:'Label',effectiveDate:db.labelIndex[d.id].effectiveDate}]:[],checked:d.comparison?.checked||db.ed.checked}];
  });
  return `<div class="ev-table-scroll" tabindex="0" aria-label="Confronto farmacocinetico scorrevole"><table class="ev-table"><thead><tr><th>Principio attivo</th><th>Emivita</th><th>Biodisponibilità</th><th>Legame proteico</th><th>Formulazione, popolazione e limiti</th><th>Fonte</th></tr></thead><tbody>${rows.map(({d,targetId,p,sources,checked})=>`<tr><th scope="row"><a href="#/molecule/${targetId||d.chembl}">${esc(targetId?name(byId.get(targetId)):d.name)}</a><small>${esc(d.subgroup)}</small></th><td>${esc(p?.halfLife||'Non sintetizzata')}</td><td>${esc(p?.bioavailability||'Non sintetizzata')}</td><td>${esc(p?.binding||'Non sintetizzato')}</td><td>${esc(p?.context||'Consultare la fonte del prodotto; nessun valore attribuito automaticamente alla classe.')}</td><td>${sources.map(source=>external(source.url,(source.product||'Fonte')+(source.effectiveDate?' · '+date(source.effectiveDate):''))).join('<br>')}<small>Controllo: ${date(checked)}</small></td></tr>`).join('')}</tbody></table></div><p class="ev-note">Ogni riga mantiene fonte e formulazione. Le definizioni di emivita non sono tutte comparabili; nessuna equivalenza terapeutica è dedotta da questi valori.</p>`;
 }

 function drugSummary(m,d,l){
 const profile=selectedPK(m),comparison=d?.chembl===m.id?(d.comparison||{}):{};
 const actualPrice=verifiedPublicPrice(m),verified=verifiedRecord(m);
 const fact=(label,value,note)=>{
  const target=label==='Dosi'?'dosage':label==='Prezzo'?'market':label==='NNT / NNH'?'evidence':'adme';
  const sourcePK=verified.label?.sections?.some(x=>['pharmacokinetics','clinical_pharmacology'].includes(x));
  const missing=isMissingPK(value),related=Boolean(verified.parentLabel);
  const title=missing&&target==='adme'?(sourcePK?'Vedi fonte PK':related?'Vedi molecola parent':'Da documentare'):(value||'Da documentare');
  const detail=missing&&target==='adme'?(sourcePK?'Sintesi ancora da estrarre dalla fonte':related?'Formulazione non verificata per questa identità':note):note;
  return `<button type="button" class="ev-fact" data-ev="goto-topic" data-topic="${target}" data-molecule="${esc(m.id)}" aria-label="${esc(label)}: apri i dati e le fonti"><span>${esc(label)}</span><strong>${esc(title)}</strong><small>${esc(detail)}</small></button>`;
 };
 const metric=firstTrialMetric(d?.id);
 const pkValue=(key,legacy)=>profile?.metrics?.[key]?.summary||legacy;
 const pkNote=(key,fallback)=>profile?profile.metrics[key].substance+' · '+profile.metrics[key].measurementType:fallback;
 return `<div class="ev-card-group"><h2>La scheda in breve</h2>${renderPKContext(m,db.pkReviewed,pkSelections.get(m.id))}<div class="ev-facts">${fact('Emivita',pkValue('halfLife',comparison.halfLife),pkNote('halfLife','Valore contestuale, se verificato'))}${fact('Biodisponibilità',pkValue('bioavailability',comparison.bioavailability),pkNote('bioavailability','Dipende dalla formulazione'))}${fact('Legame proteico',pkValue('proteinBinding',comparison.binding),pkNote('proteinBinding','Dato sperimentale'))}${fact('Dosi',profile?'Fonte del prodotto':'Vedi RCP','Indicazione e prodotto specifici')}${fact('NNT / NNH',metric?.value||'Non sintetizzato',metric?.context||'Mai universale')}${fact('Prezzo',actualPrice===null?'Non disponibile':'da '+actualPrice.toLocaleString('it-IT',{style:'currency',currency:'EUR'}),'AIFA · confezioni e dosaggi diversi')}</div><p class="ev-note">${profile?'Apri un dato per leggere metabolismo, metaboliti, escrezione e riferimenti del prodotto selezionato.':'La sintesi riporta solo i dati associati a questa identità; la fonte originale può contenere informazioni ancora da estrarre.'}</p><div class="ev-inline-dots">${d?.targets?.length?d.targets.map(t=>`<a class="ev-tag" href="#/receptors/${encodeURIComponent(t)}">${esc(t)} · bersaglio →</a>`).join(''):'<span class="ev-note">Bersagli editoriali non ancora collegati.</span>'}</div></div>`;
}
 function drugPosology(m,d,l){
 const r=registry(m);
 return card("Come leggere la dose e il RCP",`<div class="ev-dosing-note"><strong>La posologia non è un valore unico per principio attivo.</strong><p>Dipende dall'indicazione, dalla formulazione, dalle comorbilità e da altri fattori. ELIX non propone una dose personale: per ciascun medicinale si deve consultare l'RCP aggiornato.</p>${r.IT?.length?"<p>Gli RCP italiani dei prodotti abbinati sono consultabili nella sezione «Medicinali, confezioni e prezzi».</p>":"<p>RCP italiano non collegato univocamente nello snapshot corrente. Questo non dimostra assenza di autorizzazione.</p>"}${l?`<p>È inoltre disponibile la label USA selezionata: ${external(l.url,"Sezioni posologiche e avvertenze DailyMed")}.</p>`:""}<div class="ev-source-actions"><a href="#/textbook/posologia-per-indicazione">Leggi come si interpreta la dose per patologia →</a></div></div>`);
}
 function drugEvidence(m,news){
 const related=news||[],trialHTML=renderTrialEvidence(info(m)?.id);
 const query="https://pubmed.ncbi.nlm.nih.gov/?term="+encodeURIComponent(m.name);
 const journal="https://pubmed.ncbi.nlm.nih.gov/?term="+encodeURIComponent(m.name+" AND (\"JAMA\"[Journal] OR \"Lancet\"[Journal] OR \"Nature\"[Journal])");
 return `<section class="ev-card-group"><h2>Studi e dati statistici</h2>${trialHTML}${related.length?card("Studi e novità verificati",`<p>Rassegna mirata delle fonti verificate: non è esaustiva, né dimostra di per sé una nuova indicazione.</p>${related.map(newsCard).join("")}`):card("Novità della rassegna recente","<p>Nessuna nuova scheda di rassegna recente per la molecola in questo aggiornamento. I trial storici principali, quando presenti, sono riportati sopra.</p>")}
 ${card("NNT, NNH ed efficacia quantitativa",`<p>Un NNT o NNH richiede endpoint, comparatore, rischio assoluto, popolazione e orizzonte temporale. Non inseriamo valori generalizzati o inventati dove manca uno studio strutturato.</p><div class="ev-source-actions"><a href="#/evidence">Laboratorio NNT/NNH →</a><a href="${esc(query)}" target="_blank" rel="noopener noreferrer">PubMed ↗</a><a href="${esc(journal)}" target="_blank" rel="noopener noreferrer">JAMA, Lancet, Nature ↗</a></div>`)}</section>`;
}
 function guidelineLinks09(m,d){
  if(!d)return '';
  const sources=GUIDELINES_09.filter(g=>g.id==='aifa-rcp'||g.drugs?.includes(d.id));
  return card('RCP e linee guida · contesto della terapia',`<p>Il RCP descrive le condizioni <strong>autorizzate per il prodotto</strong>. Le linee guida interpretano le evidenze per una patologia e una popolazione; non sono equivalenti a una autorizzazione. Controlla anno e versione prima di usarle per interpretare la terapia.</p><div class="pk09-guideline-list">${sources.map(g=>`<article><span>${esc(g.type)} · ${g.year}</span><a href="${esc(g.url)}" target="_blank" rel="noopener noreferrer"><strong>${esc(g.name)}</strong> ↗</a><p>${esc(g.note)}</p><small>${esc(g.status)}</small></article>`).join('')}</div>`);
 }
 function drugMarket(m){
 const realMarket=verifiedMarketSummary(m);if(realMarket)return realMarket;
 return card("Prezzo, disponibilità e consumi",`<p><strong>Prezzo italiano:</strong> non presente come dato verificato nello snapshot importato. Non possiamo ricavarlo dal solo principio attivo, perché dipende da confezione, modalità di acquisto e periodo.</p><p><strong>Stato dei registri:</strong> Italia · ${esc(status(m,"IT"))}; UE · ${esc(status(m,"EU"))}; USA · ${esc(status(m,"US"))}.</p><p>Costi di terapia, DDD, volumi di prescrizione e serie storiche OsMed verranno collegati dopo importazione e verifica dei dati pertinenti.</p>`);
}
 function molecule(id){
 const m=byId.get(id);
 if(!m)return `${nav()}${card("Molecola non trovata",'<a href="#/atlas">Torna al catalogo</a>')}`;
 const d=info(m),own=d?.chembl===m.id,profile=selectedPK(m),pkSource=primaryPKSource(profile);
 const legacyLabel=own?db.labelIndex[d?.id]:null;
 const l=legacyLabel&&(!profile||pkSource?.setId&&legacyLabel.url.includes(pkSource.setId))?legacyLabel:null;
 const refs=m.mechanisms.length?m.mechanisms:(byId.get(m.parent)?.mechanisms||[]);
 const verified=verifiedRecord(m);
 const relatedNames=new Set([m.name,byId.get(m.parent)?.name,d?.name,...m.aliases].filter(Boolean).map(normalize));
 const relatedNews=db.news.items.filter(n=>n.molecules.some(nm=>relatedNames.has(normalize(nm))));
 const qualityNote=profile?(d?"Sintesi didattica e dati PK controllati sulle fonti":"Dati PK controllati sulle fonti · monografia da sviluppare"):d?"Sintesi didattica disponibile":"Dati scientifici non ancora sintetizzati";
 const maybeParent=!own&&d?'<p class="ev-identity-note">La sintesi didattica riguarda la molecola parent; il record chimico selezionato può rappresentare una forma o un sale differente.</p>':"";
 const targets=d?.targets?.length?`<div class="ev-inline-dots">${d.targets.map(t=>`<a class="ev-tag" href="#/receptors/${encodeURIComponent(t)}">${esc(t)} · bersaglio →</a>`).join("")}</div>`:"";
 const directTheory=()=>d?card("Teoria farmacologica",`${maybeParent}<div class="ev-theory"><article><h3>Meccanismo</h3><p>${esc(d.mechanism)}</p></article><article><h3>Impieghi descritti</h3><p>${esc(d.clinical)}</p></article><article><h3>Rischi</h3><p>${esc(d.critical)}</p></article></div><p class="ev-note">${esc(d.review)}</p>${db.ed.classes.some(c=>c.family===d.family)?`<a class="ev-link" href="#/class/${db.ed.classes.find(c=>c.family===d.family).id}">Approfondisci la classe →</a>`:""}`):
 card("Meccanismo da approfondire",'<p>Non è ancora disponibile una monografia editoriale per questa identità. Non deduciamo indicazioni o rischi dal solo nome della sostanza.</p>');
 const theory=()=>directTheory()+renderDeepDrug(d)+renderBatchPharmacology(d,db.pkReviewed.sources)+renderVerifiedByArea(m,"mechanism");
 const kinetic=()=>profile?renderReviewedPK(profile,db.pkReviewed)+`<details class="ev-more ev-pk-source-drawer" data-pk-original="${esc(profile.id)}"><summary>Leggi la farmacocinetica nel documento originale</summary>${renderReviewedProductSource(pkSource,'adme')}</details>`:(own&&d?.comparison?card("Dati PK della sintesi verificata",pkTable([d])):"")+renderVerifiedByArea(m,"adme");
 const doses=()=>(profile?renderReviewedProductSource(pkSource,"dosage"):renderVerifiedByArea(m,"dosage"))+drugPosology(m,d,l)+guidelineLinks09(m,d)+(l?`<details class="ev-more"><summary>Consulta le altre sezioni complete della label USA</summary>${labelPanel(d)}</details>`:"");
 const annotated=()=>refs.length?card("Meccanismi annotati in ChEMBL",`<p>Testo sperimentale in lingua originale, con bersaglio e riferimenti. Non è necessariamente una indicazione clinica.</p>${refs.map(r=>`<article class="ev-mechanism"><h3 lang="en">${esc(r.text)}</h3><p>${esc(r.action)}${r.target?" · "+external("https://www.ebi.ac.uk/chembl/explore/target/"+r.target,r.target):""}</p><div class="ev-ref-list">${(r.references||[]).map(x=>external(x.url,x.title)).join("")}</div></article>`).join("")}`):"";
 const experiments=()=>targets+renderVerifiedByArea(m,"activity")+annotated();
 const studies=()=>drugEvidence(m,relatedNews)+renderVerifiedByArea(m,"studies");
 const market=()=>renderVerifiedByArea(m,"market")+(verified.market?"":drugMarket(m))+regulator(m);
 const sections=[
  {id:"mechanism",title:"Come agisce e quali effetti produce",description:"Farmacodinamica, fisiologia, effetti avversi spiegati",status:d?"Teoria presente":"Da completare",body:theory},
  {id:"adme",title:"Assorbimento, metabolismo ed eliminazione",description:"Biodisponibilità, emivita, primo passaggio, metaboliti attivi",status:profile?"Sintesi italiana e fonti":verified.label?"Fonte originale disponibile":own&&d?.comparison?"Sintesi disponibile":verified.parentLabel?"Fonte della molecola parent":"Da documentare",body:kinetic},
  {id:"dosage",title:"Dosi, indicazioni e sicurezza",description:"Posologia per prodotto, modalità di somministrazione, RCP",status:profile||verified.label?"Documento di prodotto":verified.parentLabel?"Fonte della molecola parent":"RCP da verificare",body:doses},
  {id:"targets",title:"Recettori, bersagli e misure sperimentali",description:"Target molecolari, Ki/Kd, EC50, IC50 e curve",status:verified.activity?`${verified.activity.count} misure`:refs.length?`${refs.length} meccanismi`:"Da integrare",body:experiments},
  {id:"evidence",title:"Studi clinici ed evidenze",description:"Trial, endpoint, NNT/NNH e pubblicazioni",status:relatedNews.length?`${relatedNews.length} aggiornamenti`:d?"Sintesi e fonti":"Da integrare",body:studies},
  {id:"market",title:"Medicinali, confezioni e prezzi",description:"AIC, prezzo SSN, rimborsabilità, documenti regolatori",status:verified.market?`${verified.market.packages} confezioni`:"Prezzi non importati",body:market}
 ];
 const accordion=sections.map((sec,i)=>{
  const key=m.id+":"+sec.id,opened=expandedSections.has(key);
  return `<details class="ev-topic" data-ev-section="${esc(key)}" ${opened?"open":""}>
   <summary><span class="ev-topic-number">${String(i+1).padStart(2,"0")}</span><span class="ev-topic-title"><strong>${esc(sec.title)}</strong><small>${esc(sec.description)}</small></span><span class="ev-topic-status">${esc(sec.status)}</span><span class="ev-topic-chevron" aria-hidden="true">⌄</span></summary>
   <div class="ev-topic-body" data-loaded="${opened?'true':'false'}">${opened?sec.body():'<p class="ev-topic-placeholder">Apri la sezione per caricare le informazioni e le fonti.</p>'}</div></details>`;
 }).join("");
 const identityDetail=`<details class="ev-identity-disclosure"><summary>Identità chimica e sinonimi</summary><p><strong>Nome internazionale (EN):</strong> <span lang="en">${esc(english(m))}</span></p><p><strong>Altri sinonimi:</strong> ${esc(m.aliases.join(" · ")||"Non presenti nel record")}</p>${m.parent!==m.id?`<p><a href="#/molecule/${encodeURIComponent(m.parent)}">Apri la molecola parent →</a></p>`:""}${m.smiles?`<p class="ev-smiles">SMILES: ${esc(m.smiles)}</p>`:""}</details>`;
 return `${nav()}<div class="ev-drug-sheet"><a class="rx-back" href="#/atlas">← Torna ai farmaci</a>
 <header class="ev-drug-hero"><div class="ev-drug-intro">${title(italianType(m.type),name(m),"Nome internazionale (EN): "+english(m))}
  <div class="ev-tags">${m.atc.map(a=>pill(a)).join("")}${m.withdrawn?pill("Ritiro storico segnalato · verificare il Paese","amber"):""}${m.veterinary?pill("Uso veterinario"):""}${m.parent!==m.id?pill("Forma chimica correlata"):""}</div>
  <div class="ev-intro-state"><span class="ev-intro-dot" aria-hidden="true"></span>${esc(qualityNote)}</div>
  ${identityDetail}
  </div>${chemistry(m)}</header>
 ${drugSummary(m,d,l)}<div class="ev-sheet-actions"><button type="button" data-ev="expand-all">Apri tutte le sezioni</button><button type="button" data-ev="collapse-all">Richiudi tutto</button>${d&&d.quizAvailable!==false?`<a href="#/quiz/${encodeURIComponent(d.id)}">Allenati su questo farmaco →</a>`:""}</div>
 <div class="ev-reading-head"><div><span class="eyebrow">ATLANTE FARMACOLOGICO</span><h2>Esplora la scheda</h2><p>Le informazioni sono organizzate per argomento. Apri quello che ti interessa, senza dover scorrere tutte le fonti.</p></div><span class="ev-reading-count">${sections.length} sezioni</span></div>
 <div class="ev-topics">${accordion}</div>
 <p class="ev-sheet-foot">Contenuti per studio e ricerca, non decisioni terapeutiche individuali. Fonte, prodotto, specie e contesto determinano la validità di ogni valore.</p></div>`;
}
 function classCards(){
  const counts={};for(const m of db.catalog.molecules)for(const a of new Set(m.atc.map(a=>a.slice(0,5))))counts[a]=(counts[a]||0)+1;
  return Object.entries(counts).filter(([k])=>normalize(k+' '+db.catalog.classes[k]).includes(normalize(state.classesQuery))).sort((a,b)=>a[0].localeCompare(b[0])).map(([k,n])=>`<a class="ev-class-card" href="#/class/${k}"><span class="eyebrow">${k}</span><h3>${esc(db.catalog.classes[k]||k)}</h3><p>${n} record · meccanismi e fonti disponibili</p></a>`).join('');
 }
 function classes(){return `${nav()}${title('Studia per famiglie','Classi farmacologiche','Dai meccanismi comuni alle differenze tra principi attivi. Le classi ATC possono comprendere sottogruppi con proprietà diverse.')}<h2 class="ev-section-title">Approfondimenti di classe</h2><div class="ev-class-grid">${db.ed.classes.map(c=>`<a class="ev-class-card accent" href="#/class/${c.id}"><span class="eyebrow">Teoria · confronto · fonti</span><h2>${esc(c.name)}</h2><p>${c.labels.length} principi attivi nel confronto</p></a>`).join('')}</div><h2 class="ev-section-title">Indice internazionale ATC</h2><p>Indice e meccanismi documentati; la trattazione editoriale completa di ciascuna classe è ancora in sviluppo.</p><label class="ev-search-label">Cerca una classe<input id="ev-class-search" type="search" value="${esc(state.classesQuery)}" placeholder="Antibatterici, antineoplastici, C07…"></label><div id="ev-class-results" class="ev-class-grid">${classCards()}</div>`;}
 function classPage(id){
  const c=db.ed.classes.find(x=>x.id===id);
  if(c)return `${nav()}${title('Teoria di classe',c.name,'Sintesi originale delle fonti collegate. La trattazione è introduttiva e non sostituisce tutti i capitoli delle monografie.')}<div class="ev-theory-sections">${c.sections.map(([h,p])=>card(h,`<p>${esc(p)}</p>`)).join('')}</div>${card('Principi attivi a confronto',pkTable(db.ed.drugs.filter(d=>c.labels.includes(d.id))))}${card('Fonti della trattazione',`<div class="ev-ref-list">${c.references.map(r=>external(r.url,r.title)).join('')}${c.labels.map(id=>db.labelIndex[id]?external(db.labelIndex[id].url,`${byLegacy.get(id).name} · label ${date(db.labelIndex[id].effectiveDate)}`):'').join('')}</div>`)}`;
  const drugs=db.catalog.molecules.filter(m=>m.atc.some(a=>a.startsWith(id)));
  if(!drugs.length)return `${nav()}${card('Classe non trovata','<a href="#/classes">Torna alle classi</a>')}`;
  const mechanisms=[...new Set(drugs.flatMap(m=>m.mechanisms.map(x=>x.text)))];
  return `${nav()}${title(id,db.catalog.classes[id]||id,`${drugs.length} record classificati. La scheda raccoglie annotazioni delle singole molecole: non presume che ogni meccanismo sia condiviso dall’intera classe.`)}${card('Teoria e meccanismi disponibili',`<p>Capitolo editoriale completo ancora da integrare. Meccanismi annotati nelle fonti (EN):</p>${mechanisms.length?`<ul>${mechanisms.map(x=>`<li lang="en">${esc(x)}</li>`).join('')}</ul>`:'<p>Nessuna annotazione disponibile nel dataset importato.</p>'}`)}${card('Confronto delle molecole',`<div class="ev-table-scroll" tabindex="0"><table class="ev-table"><thead><tr><th>Molecola</th><th>Formula del record</th><th>Meccanismo documentato</th><th>Emivita verificata</th><th>Italia / UE / USA</th></tr></thead><tbody>${drugs.map(m=>`<tr><th><a href="#/molecule/${m.id}">${esc(name(m))}</a></th><td>${m.formula?formula(m.formula):'Non univoca / non disponibile'}</td><td>${esc(m.mechanisms.map(x=>x.text).join('; ')||'Non annotato')}</td><td>${esc(selectedPK(m)?.metrics.halfLife.summary||(editorial.get(m.id)?.comparison?.halfLife)||'Da integrare')}</td><td>${['IT','EU','US'].map(c=>`${c}: ${esc(status(m,c))}`).join('<br>')}</td></tr>`).join('')}</tbody></table></div><p class="ev-note">Apri la molecola per fonte, formulazione e popolazione di ogni valore. Nessun valore mancante è stimato per analogia.</p>`)}`;
 }
 function compare(id){const groups=[...new Set(db.ed.drugs.map(d=>d.family))];const selected=groups.includes(id)?id:'Anticoagulanti';return `${nav()}${title('Differenze che contano','Confronta i principi attivi','Emivita, biodisponibilità, legame proteico e contesto della misurazione, con accesso alla fonte di ogni riga.')}<label class="ev-search-label">Classe farmacologica<select id="ev-compare">${groups.map(g=>`<option ${g===selected?'selected':''}>${esc(g)}</option>`).join('')}</select></label>${card(selected,pkTable(db.ed.drugs.filter(d=>d.family===selected)))}<p>Per le altre famiglie usa l’<a href="#/classes">indice delle classi ATC</a>. I valori farmacocinetici sono ancora da integrare dove indicato.</p>`;}
 function newsCard(n){return `<article class="ev-news-card"><div class="ev-tags">${pill(n.kind,n.kind==='Trial randomizzato'?'green':'amber')}<span>${esc(n.publisher)} · ${date(n.date)}</span></div><h2>${esc(n.title)}</h2><p>${esc(n.summary)}</p><div class="ev-result">${esc(n.result)}</div><details><summary>Limiti e interpretazione</summary><p>${esc(n.limitations)}</p><p class="ev-note">${esc(n.access)} · verificato ${date(n.reviewed)}</p></details><div class="ev-ref-list">${external(n.url,'Articolo ufficiale')}${n.doi?external('https://doi.org/'+n.doi,'DOI '+n.doi):''}${n.trial?external('https://clinicaltrials.gov/study/'+n.trial,n.trial):''}${n.molecules.map(x=>db.catalog.molecules.find(m=>m.name===x)).filter(Boolean).map(m=>`<a href="#/molecule/${m.id}">${esc(name(m))} →</a>`).join('')}</div></article>`;}
 function newsResults(){return db.news.items.filter(n=>!state.news||n.kind===state.news).sort((a,b)=>b.date.localeCompare(a.date)).map(newsCard).join('');}
 function news(){const n=db.news;return `${nav()}${title('Osservatorio farmacologico','Novità e studi clinici','Una rassegna ragionata: che cosa è cambiato, quanto è solida l’evidenza e dove leggere la fonte originale.')}<div class="ev-news-status"><div><strong>Ultima rassegna verificata: ${date(n.lastReviewed)}</strong><p>Periodo ${date(n.windowStart)}–${date(n.windowEnd)} · ${n.items.length} aggiornamenti</p></div><div>${pill(n.schedule.status==='active'?'Attività settimanale configurata':'Attività settimanale da attivare',n.schedule.status==='active'?'green':'amber')}<p>${esc(n.schedule.description)}</p></div></div><label class="ev-search-label">Tipo di aggiornamento<select id="ev-news-kind"><option value="">Tutti</option><option ${state.news==='Trial randomizzato'?'selected':''}>Trial randomizzato</option><option ${state.news==='Parere regolatorio'?'selected':''}>Parere regolatorio</option></select></label><div class="ev-news-grid" id="ev-news-results">${newsResults()}</div>${card('Come viene aggiornata la rassegna',`<p>${esc(n.method)}</p><p>L’attività ChatGPT ricerca nuove evidenze, controlla fonte e data, prepara le sintesi e pubblica solo dopo verifiche dell’app. L’esecuzione locale richiede il Mac acceso e l’app desktop in esecuzione. La data sopra indica l’ultima rassegna effettivamente completata.</p><details><summary>Fonti vagliate in questa rassegna</summary>${n.screened.map(s=>`<p>${external(s.url,s.name)}<br>${esc(s.outcome)}</p>`).join('')}</details>`)}`;}
 function coverage(){const m=db.catalog.molecules,rows=Object.values(db.registry.records);return `${nav()}${title('Trasparenza scientifica','Copertura, provenienza e lacune','Un record presente non equivale a una teoria completa. Questi numeri descrivono ciò che è realmente importato in questa versione.')}<div class="ev-metrics"><div><strong>${num(m.length)}</strong><span>identità internazionali ChEMBL</span></div><div><strong>${num(m.filter(m=>m.smiles).length)}</strong><span>record con struttura chimica</span></div><div><strong>${num(m.filter(m=>m.mechanisms.length).length)}</strong><span>record con meccanismi annotati</span></div><div><strong>${Object.keys(db.labelIndex).length}</strong><span>label USA consultabili per sezioni</span></div><div><strong>${db.ed.drugs.filter(d=>d.comparison).length}</strong><span>sintesi PK editoriali di base</span></div><div><strong>${db.pkReviewed.profiles.length}</strong><span>contesti PK con sei campi e fonte puntuale</span></div><div><strong>${db.pkReviewed.profiles.reduce((n,p)=>n+Object.keys(p.metrics).length,0)}</strong><span>campi PK controllati per formulazione</span></div><div><strong>${db.ed.classes.length}</strong><span>classi con sintesi editoriale ampliata</span></div></div>${renderCoverageAudit(db.coverage)}${card('Italia, Unione europea e Stati Uniti',`<p>Famiglie parent/sali con almeno un abbinamento: Italia ${num(rows.filter(r=>r.IT.length).length)} · UE ${num(rows.filter(r=>r.EU.length).length)} · USA ${num(rows.filter(r=>r.US.length).length)}.</p><p>${esc(db.registry.meta.matching)}</p><p>Le liste mostrate nelle schede sono campioni fino a 12 prodotti; i conteggi derivano dai record abbinati. Il dato italiano conta confezioni, FDA pratiche e stati di commercializzazione, EMA prodotti. Questi numeri non vanno sommati.</p><div class="ev-ref-list">${external(db.registry.meta.aifaUrl,'AIFA · confezioni e RCP')}${external(db.registry.meta.emaUrl,'EMA · medicinali e stato')}${external(db.registry.meta.fdaUrl,'Drugs@FDA · registro')}</div>`)}${card('Strutture e licenze',`<p>ChEMBL ${esc(db.catalog.meta.version)}, acquisito ${date(db.catalog.meta.retrieved)}. Dataset derivato con nomi, sinonimi, formule, SMILES, classificazione e meccanismi. ${external(db.catalog.meta.licenseUrl,'Attribuzione e licenza CC BY-SA 3.0')} applicata ai dati derivati ChEMBL.</p><p>Le immagini 2D sono fornite dal servizio ChEMBL e richiedono rete; la struttura rappresentativa dell’eparina è conservata con la sua fonte DailyMed. Biologici e miscele non ricevono formule inventate.</p>`)}${card('Cosa manca ancora',`<ul><li>Copertura di tutti i farmaci esistenti: il dataset ChEMBL max_phase=4 non comprende ogni sostanza sperimentale, prodotto storico, combinazione o autorizzazione nazionale.</li><li>Monografie editoriali integrali per ogni molecola e classe, con revisione scientifica specialistica.</li><li>Estrazione e verifica puntuale di tutti gli RCP italiani, linee guida e studi; un collegamento non significa che l’intero documento sia già stato revisionato.</li><li>Farmacocinetica completa per tutte le molecole, comprese popolazioni speciali, formulazioni e metaboliti.</li><li>Conferma di disponibilità commerciale e rimborsabilità per ogni confezione.</li></ul><p>I laboratori e casi clinici Alpha restano simulazioni didattiche. Le novità hanno una data di controllo autonoma dai registri e dalle monografie.</p>`)}`;}
 function route(p,id){if(!['atlas','classes','class','compare','molecule','news','coverage','sources','drug'].includes(p))return null;if(!db)return loadingPage();const content=p==='drug'?molecule(byLegacy.get(id)?.chembl):({atlas,classes,news,coverage,sources:coverage})[p]?.()||(p==='class'?classPage(id):p==='compare'?compare(id):molecule(id));return (pkWarning?`<div class="vd-notice" role="status">${esc(pkWarning)} <button class="btn" data-ev="retry">Riprova le sintesi PK</button></div>`:'')+content;}
 function updateResults(){const el=document.getElementById('ev-results');if(el)el.innerHTML=results();const summary=document.querySelector?.('.ev-filter-summary');const count=[state.type,state.country,state.dataKind,state.order==='price'?'price':''].filter(Boolean).length;if(summary)summary.textContent='Filtri e ordinamento'+(count?' · '+count+' attivi':'');}
 document.addEventListener('input',e=>{if(e.target.id==='ev-search'){state.query=e.target.value.trim();state.page=0;updateResults();}if(e.target.id==='ev-class-search'){state.classesQuery=e.target.value;document.getElementById('ev-class-results').innerHTML=classCards();}});
 document.addEventListener('change',e=>{const x=e.target;if(x.id==='ev-pk-formulation'){const m=byId.get(x.dataset.pkMolecule);if(m&&reviewedProfiles(m,db.pkReviewed).some(p=>p.id===x.value)){pkSelections.set(m.id,x.value);refresh();}return;}if(['ev-group','ev-type','ev-country'].includes(x.id)){state[x.id.replace('ev-','')]=x.value;state.page=0;updateResults();}if(x.id==='ev-compare')location.hash='#/compare/'+encodeURIComponent(x.value);if(x.id==='ev-news-kind'){state.news=x.value;document.getElementById('ev-news-results').innerHTML=newsResults();}});
 document.addEventListener('click',async e=>{const el=e.target.closest('[data-ev]');if(!el)return;const act=el.dataset.ev;if(act==='goto-topic'){const key=el.dataset.molecule+':'+el.dataset.topic;expandedSections.add(key);refresh();[...document.querySelectorAll('details[data-ev-section]')].find(x=>x.dataset.evSection===key)?.scrollIntoView({block:'start',behavior:'instant'});return;}if(act==='reset'){Object.assign(state,{query:'',group:'',type:'',country:'',dataKind:'',order:'name',page:0});refresh();return;}if(act==='expand-all'||act==='collapse-all'){document.querySelectorAll('details[data-ev-section]').forEach(e=>{if(act==='expand-all')expandedSections.add(e.dataset.evSection);else expandedSections.delete(e.dataset.evSection);});refresh();return;}if(act==='jump'){document.getElementById(el.dataset.target)?.scrollIntoView({block:'start',behavior:'smooth'});return;}if(act==='retry'){load();refresh();}if(act==='next'||act==='previous'){state.page+=act==='next'?1:-1;updateResults();document.getElementById('ev-results')?.scrollIntoView({block:'start'});}if(act==='label'){const id=el.dataset.id,box=document.getElementById('ev-label-'+id);if(!db.labelIndex[id])return;el.disabled=true;el.textContent='Caricamento della fonte…';try{labels.set(id,await json('data/labels/'+id+'.json'));}catch{labels.set(id,{error:true});}if(box?.isConnected)box.innerHTML=labelContent(id);}});
 // Failed remote depictions leave an explicit, accessible fallback, never a fabricated image.
 document.addEventListener('error',e=>{
  const img=e.target;
  if(img?.tagName!=='IMG'||!img.dataset?.evImage)return;
  const record=byId.get(img.dataset.evImage),container=img.closest('.ev-chem-stage');
  if(!record||!container)return;
  const compact=Boolean(img.closest('.ev-chem.mini'));
  container.classList.remove('ev-chem-stage-source');
  container.classList.add('ev-chem-stage-concept');
  container.innerHTML=schematicStructure(record,compact);
  const note=container.querySelector('.ev-concept-meta span');if(note)note.textContent='Aperto il segnaposto: immagine di fonte non caricata';
  container.dataset.structureState='source-unavailable';
 },true);
 document.addEventListener('toggle',e=>{
  const el=e.target;
  if(!el?.isConnected||!el?.matches?.('details[data-ev-section]'))return;
  const key=el.dataset.evSection;
  if(el.open)expandedSections.add(key);else expandedSections.delete(key);
  if(el.open&&el.querySelector('.ev-topic-body')?.dataset.loaded!=='true')refresh();
 },true);
 document.addEventListener("change",e=>{if(e.target.id==="vd-data-kind"){state.dataKind=e.target.value;state.page=0;updateResults();}if(e.target.id==="vd-order"){state.order=e.target.value;state.page=0;updateResults();}});
 function searchScore(m,q){
  const primary=[name(m),m.name,m.id].map(normalize),aliases=(m.aliases||[]).map(normalize);
  if(primary.includes(q))return 4;
  if(aliases.includes(q))return 3;
  if(primary.some(value=>value.startsWith(q)))return 2;
  if(aliases.some(value=>value.startsWith(q)))return 1;
  return 0;
 }
 load();
 return {route, search(query){if(!db||!query.trim())return [];const q=normalize(query);return searchable.filter(x=>x.text.includes(q)).sort((a,b)=>searchScore(b.m,q)-searchScore(a.m,q)||name(a.m).localeCompare(name(b.m),'it')).slice(0,12).map(({m})=>({type:'Molecola',name:name(m),sub:m.atc.join(' · ')||m.type,link:'#/molecule/'+m.id,ic:'pill'}));}};
}
