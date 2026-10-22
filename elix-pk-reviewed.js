/* Product-specific editorial extraction. Never infer a profile from a parent/salt relation. */
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date=value=>/^\d{8}$/.test(value||'')?`${value.slice(6,8)}/${value.slice(4,6)}/${value.slice(0,4)}`:/^\d{4}-\d{2}-\d{2}$/.test(value||'')?value.split('-').reverse().join('/'):String(value||'');
const link=(url,label)=>/^https:\/\//.test(url||'')?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`:esc(label);
export const PK_FIELDS=[['halfLife','Emivita'],['bioavailability','Biodisponibilità'],['proteinBinding','Legame proteico'],['metabolism','Metabolismo'],['metabolites','Metaboliti'],['excretion','Escrezione']];

export function reviewedProfiles(molecule,dataset){
 return (dataset?.profiles||[]).filter(profile=>profile.reviewStatus==='source-checked'&&profile.applicableMoleculeIds?.includes(molecule?.id));
}
export function reviewedProfile(molecule,dataset,selectedId){
 const profiles=reviewedProfiles(molecule,dataset);
 return profiles.find(profile=>profile.id===selectedId)||profiles[0]||null;
}
export function profileSource(dataset,id){return (dataset?.sources||[]).find(source=>source.id===id);}
export function profileContext(profile){return profile?[profile.formulation,profile.route].filter(Boolean).join(' · '):'';}
export function isMissingPK(value){return !String(value||'').trim()||/^(?:non sintetizzat[oa]|da (?:documentare|integrare)|non (?:disponibile|inserit[oa]))\.?$/i.test(String(value).trim());}

export function renderPKContext(molecule,dataset,selectedId){
 const profiles=reviewedProfiles(molecule,dataset),selected=reviewedProfile(molecule,dataset,selectedId);
 if(!selected)return '';
 return `<div class="ev-pk-context" data-pk-context="${esc(selected.id)}"><div>${profiles.length>1?`<label for="ev-pk-formulation">Formulazione dei dati PK<select id="ev-pk-formulation" data-pk-molecule="${esc(molecule.id)}">${profiles.map(profile=>`<option value="${esc(profile.id)}" ${profile.id===selected.id?'selected':''}>${esc(profile.title)}</option>`).join('')}</select></label>`:`<span class="ev-pk-context-label">Dati PK riferiti a</span><strong>${esc(selected.title)}</strong>`}<p>${esc(profileContext(selected))}</p></div><span class="ev-tag green">Fonte controllata · ${esc(date(selected.checkedAt||dataset.checkedAt))}</span></div>`;
}

function renderSources(dataset,metric,profile){
 const ids=metric.sourceIds||profile.sourceIds||[];
 return ids.map(id=>{
  const source=profileSource(dataset,id);
  if(!source)return '';
  return `<div class="ev-pk-source">${link(source.url,source.product||source.title||'Documento ufficiale')}<small>${esc(source.jurisdiction||'USA')} · ${esc(source.section)} · ${source.effectiveDate?'versione '+esc(date(source.effectiveDate)):'data di revisione non dichiarata; consultato il '+esc(date(source.checkedAt))}</small>${metric.supportingExcerpt&&(!metric.excerptSourceId||metric.excerptSourceId===id)?`<blockquote lang="${source.language==='it'?'it':'en'}">${esc(metric.supportingExcerpt)}</blockquote>`:''}</div>`;
 }).join('');
}

export function renderReviewedPK(profile,dataset){
 if(!profile)return '';
 return `<section class="ev-pk-reviewed" data-reviewed-pk="${esc(profile.id)}"><header><span class="eyebrow">Farmacocinetica · sintesi italiana</span><h2>${esc(profile.title)}</h2><p>${esc(profileContext(profile))}</p><p class="ev-note">${esc(profile.population)}${profile.scopeNote?' · '+esc(profile.scopeNote):''}</p></header><div class="ev-pk-grid">${PK_FIELDS.map(([key,title])=>{
  const metric=profile.metrics?.[key];
  if(!metric)return '';
  return `<article class="ev-pk-metric" data-pk-metric="${esc(key)}"><h3>${esc(title)}</h3><p class="ev-pk-value">${esc(metric.summary)}</p>${metric.detail?`<p>${esc(metric.detail)}</p>`:''}<details data-pk-source="${esc(profile.id)}:${esc(key)}"><summary>Contesto e fonte</summary><dl>${metric.substance?`<dt>Sostanza misurata</dt><dd>${esc(metric.substance)}</dd>`:''}${metric.measurementType?`<dt>Tipo di dato</dt><dd>${esc(metric.measurementType)}</dd>`:''}${metric.context?`<dt>Condizioni</dt><dd>${esc(metric.context)}</dd>`:''}</dl>${renderSources(dataset,metric,profile)}</details></article>`;
 }).join('')}</div>${profile.teaching?`<aside class="ev-pk-teaching"><h3>${esc(profile.teaching.title||'Collega i concetti')}</h3>${(Array.isArray(profile.teaching.paragraphs)?profile.teaching.paragraphs:[profile.teaching.body||profile.teaching]).map(p=>`<p>${esc(p)}</p>`).join('')}<a href="#/textbook/first-pass-avanzato">Ripassa assorbimento e primo passaggio →</a></aside>`:''}<p class="ev-note">Sintesi controllata sui documenti indicati il ${esc(date(profile.checkedAt||dataset.checkedAt))}. Il contesto del prodotto resta parte del dato.</p></section>`;
}
