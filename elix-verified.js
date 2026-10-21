/* ELIX: source records, not generated pharmacological values. No patient-specific recommendations. */
const h = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eur = value => value === null || value === undefined ? 'Non disponibile' : Number(value).toLocaleString('it-IT',{style:'currency',currency:'EUR'});
const number = value => Number(value).toLocaleString('it-IT',{maximumSignificantDigits:6});
const date = value => /^\d{8}$/.test(value || '') ? `${value.slice(6,8)}/${value.slice(4,6)}/${value.slice(0,4)}` : String(value || '').slice(0,10);
const safeLink = value => /^https:\/\//.test(value || '') ? h(value) : '#';
const ext = (url,label) => `<a href="${safeLink(url)}" target="_blank" rel="noopener noreferrer">${h(label)} ↗</a>`;
let index = null;
const payloads = new Map(), pending = new Set(), selections = new Map(), pages = new Map();
let redraw = () => {};
const SECTIONS = {
 mechanism_of_action:'Meccanismo d’azione',pharmacodynamics:'Farmacodinamica',pharmacokinetics:'Farmacocinetica',clinical_pharmacology:'Farmacologia clinica',indications_and_usage:'Indicazioni del prodotto USA',dosage_and_administration:'Posologia nella fonte USA',dosage_forms_and_strengths:'Forme e dosaggi del prodotto',contraindications:'Controindicazioni',boxed_warning:'Avvertenze principali',warnings_and_cautions:'Avvertenze e precauzioni',warnings:'Avvertenze',adverse_reactions:'Reazioni avverse',drug_interactions:'Interazioni',use_in_specific_populations:'Popolazioni speciali',pregnancy:'Gravidanza',pediatric_use:'Età pediatrica',geriatric_use:'Geriatria',overdosage:'Sovradosaggio',clinical_studies:'Studi clinici nella label',description:'Descrizione della sostanza e del prodotto'
};

export async function loadVerifiedIndex(refresh) {
 redraw = refresh || (()=>{});
 try {
  const response = await fetch(new URL('./data/verified/index.json',import.meta.url),{cache:'no-cache'});
  if (!response.ok) throw Error('HTTP '+response.status);
  index = await response.json();
 } catch (error) { console.warn('ELIX verified dataset unavailable',error); index = null; }
 return index;
}
export function verifiedRecord(molecule) {
 if (!molecule || !index) return {};
 const own = index.molecules[molecule.id] || {};
 const family = index.molecules[molecule.parent || molecule.id] || {};
 return {activity:own.activity,label:own.label || family.label,market:own.market || family.market,parentActivity:!own.activity && molecule.parent !== molecule.id ? family.activity : null};
}
export function hasVerifiedData(molecule,kind='any') {
 const data = verifiedRecord(molecule);
 return kind === 'any' ? Boolean(data.activity || data.label || data.market) : Boolean(data[kind]);
}
export function verifiedPublicPrice(molecule) {
 return verifiedRecord(molecule).market?.minPublicPriceEUR ?? null;
}
export function verifiedBadges(molecule) {
 const data = verifiedRecord(molecule);
 return (data.activity?`<span class="ev-tag green">${data.activity.count} misure</span>`:'')+(data.label?'<span class="ev-tag">Documento PK</span>':'')+(data.market?'<span class="ev-tag">Prezzi AIFA</span>':'');
}
export function verifiedOverview() {
 if (!index) return '';
 const c = index.counts;
 return `<section class="vd-overview" aria-label="Dati realmente importati"><div><strong>${number(c.activityRecords || 0)}</strong><span>misure sperimentali ChEMBL</span></div><div><strong>${number(c.productLabels || 0)}</strong><span>documenti di prodotto USA</span></div><div><strong>${number(c.aifaLinkedPackages || 0)}</strong><span>confezioni con prezzo AIFA</span></div><p>Importazione ${h(date(index.retrieved))}. Copertura dichiarata, non monografie complete. I numeri descrivono record di fonte, non studi clinici aggiuntivi.</p></section>`;
}
function queueFile(file) {
 if (!file || payloads.has(file) || pending.has(file)) return;
 pending.add(file);
 const expectedHash = globalThis.location?.hash;
 fetch(new URL('./data/verified/'+file,import.meta.url)).then(async response=>{
  if (!response.ok) throw Error('HTTP '+response.status);
  payloads.set(file,await response.json());
 }).catch(error=>payloads.set(file,{error:String(error)})).finally(()=>{
  pending.delete(file);
  if (globalThis.location?.hash === expectedHash) redraw();
 });
}
function available(file,render) {
 const value = payloads.get(file);
 if (!value) { queueFile(file); return '<p class="vd-loading" role="status">Caricamento dei dati di fonte…</p>'; }
 if (value.error) return `<p role="alert">Dati non caricati. Il collegamento alla fonte resta disponibile.</p><button class="btn" data-vd="retry" data-file="${h(file)}">Riprova</button>`;
 return render(value);
}
function activityRows(file,data) {
 const selected = selections.get(file) || 'all';
 const rows = data.records.filter(r=>selected==='all' || r.type===selected);
 const count = Math.max(1,Math.ceil(rows.length/15));
 const page = Math.min(pages.get(file)||0,count-1);
 const slice = rows.slice(page*15,page*15+15);
 return `<div class="vd-controls"><label>Tipo di misura<select data-vd-filter="${h(file)}">${[['all','Tutte le misure'],['Ki','Ki · inibizione del legame'],['Kd','Kd · dissociazione'],['IC50','IC50 · inibizione al 50%'],['EC50','EC50 · risposta al 50%']].map(([v,label])=>`<option value="${v}" ${v===selected?'selected':''}>${label}</option>`).join('')}</select></label><span>${number(rows.length)} misure · ${h(data.database.version)}</span></div>
 <div class="vd-table-wrap" tabindex="0" aria-label="Misure sperimentali scorrevoli"><table class="vd-table"><thead><tr><th>Misura</th><th>Bersaglio</th><th>Sistema sperimentale e fonte</th></tr></thead><tbody>${slice.map(r=>`<tr><td><strong>${h(r.type)} ${h(r.relation)} ${number(r.value)} ${h(r.units)}</strong><small>${r.type==='Ki'||r.type==='Kd'?'Legame · non dose clinica':'Potenza nel test · non affinità'}</small></td><td>${ext('https://www.ebi.ac.uk/chembl/explore/target/'+r.target,r.targetName)}<small>${h(r.targetOrganism)} · ${h(r.targetType)}</small><small>Assegnazione al bersaglio: ${h(r.assayConfidence)}/9</small></td><td><p lang="en">${h(r.assayDescription)}</p><details><summary>Condizioni e riferimento</summary><dl><dt>Saggio</dt><dd>${ext('https://www.ebi.ac.uk/chembl/explore/assay/'+r.assay,r.assay)}</dd><dt>Specie del saggio</dt><dd>${h(r.assayOrganism || 'Non riportata; non dedotta dalla specie del bersaglio')}</dd><dt>Cellula / tessuto</dt><dd>${h([r.assayCell,r.assayTissue].filter(Boolean).join(' · ') || 'Non annotati')}</dd><dt>Variante</dt><dd>${h(r.variant || 'Non annotata')}</dd><dt>Dato originale</dt><dd>${h(r.publishedType)} ${h(r.publishedRelation)} ${h(r.publishedValue)} ${h(r.publishedUnits)}</dd><dt>Articolo</dt><dd>${h(r.documentTitle || r.document)}<br>${h(r.journal)} · ${h(r.year)}</dd></dl><div class="vd-links">${r.doi?ext('https://doi.org/'+r.doi,'DOI '+r.doi):''}${r.pubmedId?ext('https://pubmed.ncbi.nlm.nih.gov/'+r.pubmedId+'/','PubMed '+r.pubmedId):''}${ext('https://www.ebi.ac.uk/chembl/explore/document/'+r.document,'Riferimento ChEMBL')}${ext(r.source,'Record di misura '+r.id)}</div></details></td></tr>`).join('')}</tbody></table></div>${rows.length?'':'<p>Nessuna misura di questo tipo nella selezione importata.</p>'}
 <div class="vd-pager"><button class="btn" data-vd="page" data-file="${h(file)}" data-page="${page-1}" ${page===0?'disabled':''}>← Precedenti</button><span>${page+1} / ${count}</span><button class="btn" data-vd="page" data-file="${h(file)}" data-page="${page+1}" ${page+1>=count?'disabled':''}>Successive →</button></div>
 <p class="vd-note">${data.scope.truncated?`Selezione limitata: ${data.scope.retrievedRows} record acquisiti sui ${data.scope.sourceTotal} restituiti dalla query prima dei filtri di qualità.`:'Acquisiti tutti i record restituiti dalla query selezionata, prima dei filtri di qualità.'} Esclusi valori problematici, duplicati potenziali, endpoint trasformati e assegnazioni del bersaglio non dirette. Nessuna media fra esperimenti. ${ext(data.database.licenseUrl,'Dati derivati ChEMBL · '+data.database.license)}.</p>`;
}
function labelSections(data) {
 const p = data.product;
 const excerpts = Object.entries(data.pkSourceSentences||{}).filter(([,values])=>values.length);
 const names = {halfLife:'Emivita · testo di fonte',bioavailability:'Biodisponibilità · testo di fonte',proteinBinding:'Legame proteico · testo di fonte',elimination:'Metabolismo ed eliminazione · testo di fonte'};
 return `<div class="vd-product-context"><strong>${h(p.generic?.join(' / '))}</strong><p>${h(p.brand?.join(' / '))} · ${h(p.route?.join(' / '))}<br>${h(p.manufacturer?.join(' / '))}</p><small>Versione ${h(date(data.effectiveDate))} · ${h(p.applications?.join(' · '))} · USA</small></div>
 <div class="vd-notice">${h(data.match)} ${h(data.limitation)}</div>
 ${excerpts.length?`<h3>Farmacocinetica documentata</h3><p class="vd-note">Frasi selezionate automaticamente dalla sezione farmacocinetica: mantengono il contesto originale in inglese e non sono valori universali della molecola. Apri la sezione completa per interpretarle.</p><div class="vd-pk-grid">${excerpts.map(([key,values])=>`<article><h4>${h(names[key])}</h4>${values.map(value=>`<p lang="en">${h(value)}</p>`).join('')}</article>`).join('')}</div>`:''}
 <div class="vd-label-sections">${Object.entries(SECTIONS).filter(([key])=>data.sections[key]).map(([key,label])=>`<details><summary>${h(label)} <small>Fonte USA · EN</small></summary><div lang="en">${data.sections[key].map(text=>`<p>${h(text)}</p>`).join('')}</div></details>`).join('')}</div><div class="vd-links">${ext(data.source,'Apri il documento originale DailyMed')}${ext(data.request.url,'Record openFDA acquisito')}</div>`;
}
function marketRows(file,data) {
 const rows = data.packages;
 const max = Math.max(1,Math.ceil(rows.length/20));
 const page = Math.min(pages.get(file)||0,max-1);
 return `<p class="vd-note">${h(data.scope)}</p><div class="vd-table-wrap" tabindex="0" aria-label="Prezzi per confezione AIFA"><table class="vd-table"><thead><tr><th>Medicinale e confezione</th><th>Pubblico</th><th>Riferimento</th><th>Differenza</th></tr></thead><tbody>${rows.slice(page*20,page*20+20).map(p=>`<tr><td><strong>${h(p.name)}</strong><p>${h(p.form)}</p><small>AIC ${h(p.aic)} · ${h(p.ingredient)}</small><small>${h(p.status)} · ${h(p.supply)}</small>${p.rcp?ext(p.rcp,'RCP italiano'):''}<details><summary>Dati originali della riga AIFA</summary><dl>${Object.entries(p.sourceFields).map(([k,v])=>`<dt>${h(k)}</dt><dd>${h(v)}</dd>`).join('')}</dl></details></td><td>${eur(p.publicPriceEUR)}</td><td>${eur(p.referencePriceEUR)}</td><td>${eur(p.differenceEUR)}</td></tr>`).join('')}</tbody></table></div><div class="vd-pager"><button class="btn" data-vd="page" data-file="${h(file)}" data-page="${page-1}" ${page===0?'disabled':''}>← Precedenti</button><span>${page+1} / ${max} · ${rows.length} confezioni</span><button class="btn" data-vd="page" data-file="${h(file)}" data-page="${page+1}" ${page+1>=max?'disabled':''}>Successive →</button></div><p class="vd-note">Abbinamento tramite AIC, con famiglia del principio attivo esplicitata. Dosaggi e confezioni diversi non sono equivalenti: non confrontare questo elenco come costo di una terapia. Acquisizione ${h(date(data.source.retrieved))}${data.source.lastModified?' · data HTTP della fonte '+h(data.source.lastModified):''}.</p><div class="vd-links">${ext(data.source.url,'CSV ufficiale AIFA')}${ext('https://www.aifa.gov.it/liste-dei-farmaci','Descrizione e aggiornamento delle liste')}</div>`;
}
export function renderVerifiedData(molecule) {
 const data = verifiedRecord(molecule);
 if (!data.activity && !data.label && !data.market && !data.parentActivity) return '';
 return `<div class="vd-drug-data"><div class="vd-section-title"><span class="eyebrow">Dati di fonte · importazione ${h(date(index.retrieved))}</span><h2>Misure, documenti e confezioni</h2><p>Ogni dato mantiene la propria identità e provenienza. I valori sperimentali non sono dosaggi e i documenti USA non sostituiscono l’RCP italiano.</p></div>
 ${data.activity?`<section class="vd-panel"><header><h3>Ki, Kd, IC50 ed EC50 misurati</h3><span>${data.activity.count} record · ${data.activity.targets} bersagli</span></header>${available(data.activity.file,d=>activityRows(data.activity.file,d))}</section>`:data.parentActivity?`<section class="vd-panel"><h3>Misure disponibili per la molecola parent</h3><p>Non attribuiamo automaticamente al sale selezionato le misure di un’altra identità chimica.</p><a href="#/molecule/${h(molecule.parent)}">Apri il record con ${data.parentActivity.count} misure →</a></section>`:''}
 ${data.label?`<section class="vd-panel"><header><h3>Farmacocinetica, dosi e sicurezza nella fonte</h3><span>Prodotto specifico · USA · EN</span></header>${available(data.label.file,labelSections)}</section>`:''}
 ${data.market?`<section class="vd-panel"><header><h3>Prezzi reali per confezione · AIFA</h3><span>${data.market.packages} confezioni${data.market.minPublicPriceEUR!==null?' · da '+eur(data.market.minPublicPriceEUR):''}</span></header>${available(data.market.file,d=>marketRows(data.market.file,d))}</section>`:''}</div>`;
}
export function verifiedMarketSummary(molecule) {
 const data=verifiedRecord(molecule).market;
 if(!data)return '';
 return `<section class="ev-panel"><h2>Prezzi italiani documentati</h2><p>${data.packages} confezioni nella lista di trasparenza AIFA.${data.minPublicPriceEUR!==null?' Prezzi al pubblico da <strong>'+eur(data.minPublicPriceEUR)+'</strong> a <strong>'+eur(data.maxPublicPriceEUR)+'</strong>.':''}</p><p class="ev-note">Il dettaglio AIC, dosaggio, prezzo al pubblico e riferimento è riportato nel blocco «Misure, documenti e confezioni». L’intervallo comprende confezioni diverse: non misura il costo di trattamento.</p></section>`;
}
if (typeof document !== 'undefined') {
 document.addEventListener('click',event=>{
  const el=event.target?.closest?.('[data-vd]');if(!el)return;
  event.preventDefault();const file=el.dataset.file;
  if(el.dataset.vd==='page')pages.set(file,Math.max(0,Number(el.dataset.page)||0));
  if(el.dataset.vd==='retry')payloads.delete(file);
  redraw();
 });
 document.addEventListener('change',event=>{
  const file=event.target?.dataset?.vdFilter;if(!file)return;
  selections.set(file,event.target.value);pages.set(file,0);redraw();
 });
}
