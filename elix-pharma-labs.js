/* ELIX 0.9: original source-reader, not a clinical dosing decision tool. */

const SCIENCE_TOPICS=[{"id":"firstpass","title":"Metabolismo di primo passaggio","pattern":"first.pass|presystemic|pre.systemic"},{"id":"metabolites","title":"Metaboliti attivi","pattern":"\\bactive metabolites?\\b|\\bpharmacologically active\\b|\\bmetabolites? (?:are|is) active\\b"},{"id":"metabolism","title":"Metabolismo, CYP e coniugazione","pattern":"metaboli[sz]|cytochrome|CYP[0-9]|glucuronid|hydrolys"},{"id":"elimination","title":"Escrezione, eliminazione e clearance","pattern":"excret|eliminat|clearance|urine|feces|faeces"},{"id":"bioavailability","title":"Assorbimento e biodisponibilità","pattern":"bioavailab|absorp|food effect|peak plasma|Tmax|Cmax"},{"id":"halfLife","title":"Emivita plasmatica","pattern":"half.life|half life|terminal t1/2"},{"id":"binding","title":"Distribuzione e legame proteico","pattern":"protein binding|bound to plasma proteins|serum albumin|volume of distribution"},{"id":"special","title":"Cinetica in popolazioni speciali","pattern":"poor metaboli[sz]er|renal impairment|hepatic impairment|geriatric|pediatric"}];

const INDICATIONS09=["Hypertension","Angina Pectoris","Heart Failure","Myocardial Infarction","Deep Vein Thrombosis","Pulmonary Embolism","Atrial Fibrillation","Chronic Kidney Disease","Type 2 Diabetes Mellitus","Diabetes Mellitus","Edema","Cirrhosis","Primary Hyperaldosteronism","Adult Patients","Pediatric Patients","Treatment of","Prevention of","Prophylaxis","Renal Impairment","Hepatic Impairment"];

export const indicationState09=new Map(),assayState09=new Map(),exponentState09=new Map(),sourceState09=new Map();

function esc09(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function safe09(v){return /^https:\/\//.test(v||"")?esc09(v):"#";}

function format09(v){return Number(v).toLocaleString("it-IT",{maximumSignificantDigits:4});}

export function extractConcepts09(label){
 const raw=(label?.sections?.pharmacokinetics||label?.sections?.clinical_pharmacology||[]).join(" ");
 if(!raw)return [];
 return SCIENCE_TOPICS.map(({id,title,pattern})=>{
   const quotes=[],rx=new RegExp(pattern,"ig");
   for(const match of raw.matchAll(rx)){
     const from=Math.max(0,match.index-95),to=Math.min(raw.length,match.index+340);
     const q=(from?"…":"")+raw.slice(from,to).replace(/\s+/g," ").trim()+(to<raw.length?"…":"");
     if(!quotes.some(previous=>Math.abs(previous.length-q.length)<8&&previous.slice(-90)===q.slice(-90)))quotes.push(q);
     if(quotes.length===2)break;
   }
   return {id,title,quotes};
 });
}

export function splitIndications09(label){
 const raw=(label?.sections?.dosage_and_administration||[]).join(" ").replace(/\s+/g," ");
 if(!raw)return [];
 const pattern=new RegExp("\\b2\\.(\\d{1,2})\\s+("+INDICATIONS09.join("|")+")\\b","ig");
 const matches=[...raw.matchAll(pattern)],sections=[],seen=new Set();
 for(let i=0;i<matches.length;i++){
  const m=matches[i],key=m[1]+"-"+m[2].toLowerCase();
  if(seen.has(key))continue;seen.add(key);
  const text=raw.slice(m.index,matches[i+1]?.index??raw.length).trim();
  if(text.length>=38)sections.push({id:"sec"+m[1],title:m[2],text});
 }
 return sections.slice(0,20);
}

export function renderPK09(label){
 const topics=extractConcepts09(label);
 if(!topics.length)return "<p class='pk09-note'>Nessuna sezione farmacocinetica strutturata in questa label importata. Non significa che il dato non esista.</p>";
 return `<section class="pk09-surface"><h3>ADME, primo passaggio e metaboliti</h3><p class="pk09-note">Estratti autentici dalla farmacocinetica del prodotto selezionato, in lingua originale. Le frasi sono selezionate automaticamente per parole chiave: apri sempre il documento completo per interpretarle.</p><div class="pk09-topic-grid">${topics.map(t=>`<details class="pk09-topic"><summary>${esc09(t.title)} <small>${t.quotes.length? t.quotes.length+" estratti":"Non individuato"}</small></summary>${t.quotes.length?t.quotes.map(q=>`<p lang="en">${esc09(q)}</p>`).join(""):'<p class="pk09-note">Non individuato nel testo selezionato; non equivale a «dato assente».</p>'}</details>`).join("")}</div></section>`;
}

export function renderIndications09(label,file){
 const items=splitIndications09(label),selected=items.find(x=>x.id===indicationState09.get(file))||items[0];
 if(!label?.sections?.dosage_and_administration)return '';
 if(!selected)return `<section class="pk09-surface"><h3>Posologia del prodotto USA</h3><p>Le intestazioni non sono state riconosciute con sufficiente sicurezza. Il testo originale resta consultabile nel riquadro «Posologia».</p></section>`;
 const route=label.product?.route?.join(", ")||"non indicata",drug=label.product?.generic?.join(" / ")||"prodotto USA";
 return `<section class="pk09-surface"><h3>Posologia per indicazione · testo ufficiale</h3><p class="pk09-note">Solo per il prodotto <strong>${esc09(drug)}</strong>, via <strong>${esc09(route)}</strong>, giurisdizione USA e versione ${esc09(label.effectiveDate)}. Non è un algoritmo di prescrizione e non è automaticamente il dosaggio italiano autorizzato.</p><label class="pk09-field">Voce presente nella label<select data-pk09-indication="${esc09(file)}">${items.map(i=>`<option value="${esc09(i.id)}" ${i.id===selected.id?"selected":""}>${esc09(i.title)} · sez. 2.${esc09(i.id.slice(3))}</option>`).join("")}</select></label><div class="pk09-source"><strong>${esc09(selected.title)} · trascrizione EN</strong><p lang="en">${esc09(selected.text.slice(0,3200)+(selected.text.length>3200?" …":""))}</p></div><p class="pk09-note">La voce è estratta automaticamente e può comprendere note di titolazione, monitoraggio e sottopopolazioni. Per verificare indicazioni e dose usabili in Italia consulta il RCP italiano dello specifico medicinale.</p><a href="${safe09(label.source)}" target="_blank" rel="noopener noreferrer">Leggi il documento del prodotto originale ↗</a></section>`;
}

export function validAssays09(data){
 return (data?.records||[]).filter(r=>["Kd","IC50","EC50"].includes(r.type)&&r.relation==="="&&r.units==="nM"&&Number(r.value)>0&&Number.isFinite(Number(r.value))&&r.assay&&r.source).slice(0,80);
}

export function modelStats09(record,position=0){
 const ref=Number(record.value),ratio=Math.pow(10,Number(position)),normalized=100*ratio/(1+ratio);
 return {concentration:ref*ratio,reference:ref,ratio,normalized,remaining:100-normalized};
}

function modelValue09(file,record){
 const exp=exponentState09.get(file)??0,m=modelStats09(record,exp),label=record.type==="Kd"?"Occupazione teorica":record.type==="IC50"?"Inibizione normalizzata teorica":"Risposta normalizzata teorica";
 const path=Array.from({length:101},(_,i)=>{const ratio=Math.pow(10,-2+i*.04),percent=100*ratio/(1+ratio);return (i?"L":"M")+(32+i*4.75).toFixed(2)+","+(165-percent*1.22).toFixed(2);}).join(" ");
 const x=32+(exp+2)*118.75,y=165-m.normalized*1.22;
 return `<div class="pk09-numbers"><div><small>Concentrazione nel saggio</small><strong>${format09(m.concentration)} nM</strong><span>${format09(m.ratio)}× ${esc09(record.type)} misurato</span></div><div><small>${esc09(label)}</small><strong>${format09(m.normalized)}%</strong><span>${record.type==="IC50"?"Attività residua teorica: "+format09(m.remaining)+"%":"Assunzione illustrativa Hill=1"}</span></div></div><svg class="pk09-chart" viewBox="0 0 540 200" role="img" aria-label="Curva teorica basata sul valore sperimentale indicato"><path class="pk09-axis" d="M32 24V165H507"/><path class="pk09-line" d="${path}"/><path class="pk09-guide" d="M269.5 24V165"/><path class="pk09-guide" d="M${x.toFixed(1)} ${y.toFixed(1)}V165"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="pk09-dot"/><text x="32" y="188">0,01×</text><text x="269.5" y="188" text-anchor="middle">1×</text><text x="507" y="188" text-anchor="end">100×</text></svg>`;
}

export function renderAssay09(data,file){
 const assays=validAssays09(data);
 if(!assays.length)return `<p class="pk09-note">Non sono state importate misure Kd/EC50/IC50 idonee per questa molecola. Ki da solo non consente di predire la risposta clinica.</p>`;
 sourceState09.set(file,data);
 const chosen=assays.find(x=>String(x.id)===assayState09.get(file))||assays[0];
 const exp=exponentState09.get(file)??0;
 return `<section class="pk09-surface"><h3>Concentrazione–risposta: misura autentica, curva ipotetica</h3><p class="pk09-note">La misura ChEMBL è reale e riguarda un saggio specifico. La curva usa un modello ideale di Hill con coefficiente 1 e <strong>NON descrive la dose somministrata, la risposta clinica o la tossicità del paziente</strong>. IC50 ed EC50 non equivalgono automaticamente a Kd.</p><label class="pk09-field">Misura e bersaglio<select data-pk09-assay="${esc09(file)}">${assays.map(x=>`<option value="${esc09(x.id)}" ${String(x.id)===String(chosen.id)?"selected":""}>${esc09(x.type)} ${format09(x.value)} nM · ${esc09(x.targetName)} · ${esc09(x.year||"anno n.d.")}</option>`).join("")}</select></label><label class="pk09-field">Concentrazione relativa alla misura<input type="range" min="-2" max="2" step="0.05" value="${exp}" data-pk09-slider="${esc09(file)}"/></label><div id="pk09-${esc09(file.replace(/[^a-z0-9_-]/gi,"_"))}">${modelValue09(file,chosen)}</div><p class="pk09-note">Saggio originale: <span lang="en">${esc09(chosen.assayDescription)}</span> · bersaglio ${esc09(chosen.targetOrganism)}.</p><a href="${safe09(chosen.source)}" target="_blank" rel="noopener noreferrer">Apri la misura sperimentale ChEMBL ↗</a></section>`;
}

export function currentValue09(file){
 const data=sourceState09.get(file),assay=validAssays09(data).find(x=>String(x.id)===assayState09.get(file))||validAssays09(data)[0];
 return assay?modelValue09(file,assay):"";
}
