/* ELIX 0.12: source-bound display terminology and PK summaries.
 * No patient dosing, class interpolation, or merger of numerical fields from different products.
 */
import {registerItalianNames,italianNameProvenance} from './italian-names.js';
const escape = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = url => /^https:\/\//i.test(url||'')?escape(url):'#';
const fields = [['halfLife','Emivita plasmatica / del parametro specificato'],['bioavailability','Biodisponibilità'],['binding','Legame proteico']];
let dataset={products:{},supplementary:{}},names={},loading=null;
const selections=new Map();
export async function loadPresentation(){
 if(loading)return loading;
 loading=(async()=>{
  const get=async path=>{const res=await fetch(new URL(path,import.meta.url));if(!res.ok)throw Error('HTTP '+res.status);return res.json();};
  const results=await Promise.allSettled([get('./data/presentation/names-it.json'),get('./data/presentation/pk-products.json')]);
  if(results[0].status==='fulfilled'){
   names=results[0].value.records||{};registerItalianNames(names);
  }else console.warn('ELIX terminology: using original names',results[0].reason);
  if(results[1].status==='fulfilled'){
   const val=results[1].value;dataset={products:val.products||{},supplementary:val.supplementary||{}};
  }else console.warn('ELIX product summaries: using existing editorial sources',results[1].reason);
  return {names:Object.keys(names).length,products:Object.keys(dataset.products).length};
 })();
 return loading;
}
export function pkOptions(molecule,labelFile){
 const result=[];const primary=dataset.products[labelFile];if(primary)result.push(primary);
 const secondary=dataset.supplementary[molecule?.parent||molecule?.id];
 if(secondary)result.push(secondary);
 return result;
}
export function selectPKSource(moleculeId,file){selections.set(String(moleculeId),String(file));}
export function pkDossier(molecule,labelFile){
 const options=pkOptions(molecule,labelFile);
 const selected=options.find(x=>x.file===selections.get(molecule?.id));if(selected)return selected;
 // Choose one complete product dossier, never mix its individual values with another product.
 const score=x=>(/\d/.test(x.fields?.halfLife?.value||'')?3:0)+Object.keys(x.fields||{}).length;
 return [...options].sort((a,b)=>score(b)-score(a))[0]||null;
}
export function productName(pk){return pk?.product?.generic?.join(' / ')||pk?.product?.brand?.join(' / ')||'Prodotto della fonte';}
export function productRoute(pk){return (pk?.product?.route||[]).map(x=>({ORAL:'orale',ORALE:'orale',INTRAVENOUS:'endovenosa',SUBCUTANEOUS:'sottocutanea',INHALATION:'inalatoria',OPHTHALMIC:'oftalmica',TOPICAL:'topica',TRANSDERMAL:'transdermica',INTRAMUSCULAR:'intramuscolare',NASAL:'nasale'})[x]||x).join(' / ');}
export function pkSummaryField(pk,key,legacyValue){
 const value=pk?.fields?.[key];if(value)return {value:value.value,note:value.note,status:'source',source:pk.source};
 // Do not fill a missing field with a number from an unrelated legacy product.
 if(pk)return {value:'Vedi dettaglio della fonte',note:'Nessun valore univoco selezionato per questo prodotto. Non indica assenza di dati farmacologici.',status:'not-normalized',source:pk.source};
 if(legacyValue&&!/^Non sintetizzat|Da documentare/i.test(legacyValue))return {value:legacyValue,note:'Dalla sintesi editoriale già presente: apri ADME per prodotto e fonte.',status:'legacy'};
 return {value:'Fonte PK da abbinare',note:'Nessun numero attribuito automaticamente da altre molecole o formulazioni.',status:'no-source'};
}
export function renderPKContext(pk,molecule){
 if(!pk)return '';
 const related=molecule?.parent&&molecule.parent!==molecule.id;
 return `<div class="ep-product-context"><div><span>Fonte dei valori farmacocinetici</span><strong>${escape(productName(pk))}</strong><small>${escape(productRoute(pk))} · ${escape(pk.jurisdiction||'USA')} · versione ${escape(pk.effectiveDate||'vedi documento')}</small></div><a href="${link(pk.source)}" target="_blank" rel="noopener noreferrer">Fonte originale ↗</a></div><p class="ep-context-note">${escape(pk.context)}${related?' Il record selezionato è una forma chimica correlata: i valori descrivono il prodotto nominato, non una misura del sale isolato.':''}</p>`;
}
export function renderStructuredPK(molecule,labelFile){
 const options=pkOptions(molecule,labelFile),pk=pkDossier(molecule,labelFile);if(!pk)return '';
 return `<section class="ev-panel ep-pk-panel"><h2>Farmacocinetica in numeri · lettura della fonte</h2>${options.length>1?`<label class="ep-source-select">Documento da usare per il riepilogo<select data-pk-summary-source="${escape(molecule.id)}">${options.map(d=>`<option value="${escape(d.file)}" ${d.file===pk.file?'selected':''}>${escape(productName(d))} · ${escape(d.jurisdiction||'USA')}</option>`).join('')}</select></label>`:''}${renderPKContext(pk,molecule)}<div class="ep-pk-fields">${fields.map(([key,title])=>{const f=pk.fields?.[key];return `<article class="ep-pk-field"><h3>${escape(title)}</h3>${f?`<strong class="ep-pk-value">${escape(f.value)}</strong><p>${escape(f.note)}</p><details><summary>Passaggio originale che sostiene il dato</summary><blockquote lang="en">${escape(f.quote)}</blockquote><p class="ev-note">${escape(f.section)} · lettura della fonte ${escape(pk.reviewed)}. L'estratto non sostituisce l'intero documento.</p></details>`:'<p>Nessun valore numerico univoco è stato selezionato da questo documento. Consulta la farmacocinetica originale: non sostituiamo il dato con quello di un altro prodotto.</p>'}</article>`;}).join('')}</div><p class="ev-note">Emivita plasmatica, durata dell’effetto, emivita di un metabolita e attività anti-Xa sono misure diverse. Biodisponibilità relativa e assoluta restano distinte nelle note.</p></section>`;
}
export function renderNameProvenance(molecule){
 const item=italianNameProvenance(molecule);if(!item)return '<p class="ev-note">Denominazione internazionale mantenuta: traduzione italiana non ancora associata in modo univoco.</p>';
 const method={'explicit':'Denominazione della mappa editoriale italiana','atc-correspondence':'Denominazione del repertorio ATC AIFA, con controllo del nome e della forma chimica','explicit-form-translation':'Nome italiano del parent + traduzione del modificatore chimico presente nel record'}[item.method]||'Denominazione italiana di visualizzazione';
 return `<p class="ev-note">${escape(method)}. Identità ChEMBL e nome internazionale invariati.${item.reference?.startsWith('https://')?` <a href="${link(item.reference)}" target="_blank" rel="noopener noreferrer">Fonte della denominazione ↗</a>`:''}</p>`;
}
