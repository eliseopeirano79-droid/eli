/* Additive, source-scoped content. Existing records are never overwritten by a batch. */
const CHECKED='2026-10-22';
const source=(id,product,url,section,jurisdiction,sourceVersion,effectiveDate=null)=>({id,product,url,section,jurisdiction,sourceVersion,effectiveDate,checkedAt:CHECKED,language:'en'});
export const BATCH_SOURCES=[
 source('pregabalin-us-2020','Lyrica · capsule convenzionali · Pfizer','https://labeling.pfizer.com/ShowLabeling.aspx?id=561','§§ 5, 12.1, 12.3','USA','Label revisionata 06/2020; giorno non dichiarato nella versione consultata.'),
 source('pregabalin-eu-2026','Lyrica · EPAR EMA','https://www.ema.europa.eu/it/medicines/human/EPAR/lyrica','Therapeutic indication / Overview','UE','Pagina EPAR, revisione 73; stato consultato il 22/10/2026, non data di revisione del RCP.'),
 source('gabapentin-us-2022','Neurontin · capsule/compresse convenzionali','https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee9ad9ed-6d9f-4ee1-9d7f-cfad438df388','§§ 12.1, 12.3','USA','Label revisionata 07/2022; DailyMed aggiornato 12/07/2022, giorno di revisione non specificato.'),
 source('gabapentin-uk-2026','Gabapentin Tillomed · capsule 300 mg','https://www.medicines.org.uk/emc/product/11964/smpc','§§ 4.1, 4.4, 4.5, 4.8','Regno Unito','SmPC: revisione del testo 03/03/2026; pubblicazione eMC 08/03/2026.','2026-03-03'),
 source('duloxetine-uk-2023','Duloxetine KRKA · capsule gastroresistenti 60 mg','https://www.medicines.org.uk/emc/product/15023/smpc','§§ 4.4, 4.5, 5.1, 5.2','Regno Unito','SmPC: revisione del testo 16/03/2023.','2023-03-16'),
 source('duloxetine-eu-2026','Cymbalta · EPAR EMA','https://www.ema.europa.eu/it/medicines/human/EPAR/cymbalta','Therapeutic indication / Overview','UE','Pagina EPAR, revisione 33; consultata il 22/10/2026. Non equivale a una nuova revisione del RCP.'),
 source('sertraline-us-2023','Zoloft · compresse di sertralina cloridrato','https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fda754f6-d0f3-4dce-a17a-927d64f912f7','§§ 12.1, 12.2, 12.3','USA','Label revisionata 08/2023; DailyMed aggiornato 08/08/2023, giorno di revisione non specificato.'),
 source('sertraline-uk-2025','Lustral · compresse rivestite 50 mg','https://www.medicines.org.uk/emc/product/1070/smpc','§§ 4.1, 4.3, 4.4, 4.5, 4.8','Regno Unito','SmPC revisionato 12/2025; pubblicazione eMC 28/01/2026. Giorno di revisione non dichiarato.')
];
const reference=id=>BATCH_SOURCES.find(s=>s.id===id);
const metric=(summary,detail,substance,measurementType,sourceId,values=[])=>({summary,detail,substance,measurementType,sourceIds:[sourceId],values});
const measure=(value,unit,extra={})=>({value,unit,...extra});
const range=(min,max,unit,extra={})=>({range:[min,max],unit,...extra});
const profile=(id,title,chembl,formulation,population,sourceId,metrics)=>({id,title,applicableMoleculeIds:[chembl],formulation,route:'Orale',population,sourceIds:[sourceId],reviewStatus:'source-checked',checkedAt:CHECKED,scopeNote:'Profilo del prodotto indicato, non esteso automaticamente a sali, altre formulazioni o popolazioni speciali.',metrics});
export const BATCH_PROFILES=[
 profile('pregabalin-capsule-us','Pregabalin · capsule convenzionali','CHEMBL1059','Lyrica capsule; escluso rilascio prolungato','Adulti; funzione renale normale per il dato di emivita.','pregabalin-us-2020',{
  halfLife:metric('6,3 h','Media di eliminazione; la clearance dipende dalla funzione renale.','Pregabalin','Emivita di eliminazione','pregabalin-us-2020',[measure(6.3,'h',{statistic:'mean'})]),
  bioavailability:metric('≥90%','Biodisponibilità orale indipendente dalla dose nell’intervallo studiato.','Pregabalin','Biodisponibilità orale','pregabalin-us-2020',[measure(90,'%',{relation:'>='})]),
  proteinBinding:metric('Non legato alle proteine plasmatiche','','Pregabalin','Legame plasmatico','pregabalin-us-2020'),
  metabolism:metric('Trascurabile nell’uomo','','Pregabalin','Biotrasformazione','pregabalin-us-2020'),
  metabolites:metric('N-metil-pregabalin: 0,9% della dose nelle urine','Quota escreta del metabolita, non percentuale di attività.','N-metil-pregabalin','Recupero urinario del metabolita','pregabalin-us-2020',[measure(0.9,'%',{denominator:'dose somministrata'})]),
  excretion:metric('≈90% della dose nelle urine immodificato','Studio con pregabalin radiomarcato.','Pregabalin immodificato','Recupero urinario della dose','pregabalin-us-2020',[measure(90,'%',{relation:'~',denominator:'dose somministrata'})])
 }),
 profile('gabapentin-conventional-us','Gabapentin · formulazione convenzionale','CHEMBL940','Neurontin capsule/compresse; esclusi rilascio prolungato e gabapentin enacarbil','Adulti; dati di base non trasferibili all’insufficienza renale.','gabapentin-us-2022',{
  halfLife:metric('5–7 h','La riduzione della funzione renale può prolungarla.','Gabapentin','Emivita di eliminazione','gabapentin-us-2022',[range(5,7,'h')]),
  bioavailability:metric('≈60% a 900 mg/die; ≈34% a 2.400 mg/die','Regimi sperimentali in tre somministrazioni: non dosi consigliate. F diminuisce all’aumentare della dose.','Gabapentin','Biodisponibilità orale dose-dipendente','gabapentin-us-2022',[measure(60,'%',{dailyDoseMg:900,dividedDoses:3,relation:'~'}),measure(34,'%',{dailyDoseMg:2400,dividedDoses:3,relation:'~'})]),
  proteinBinding:metric('<3%','','Gabapentin','Legame plasmatico','gabapentin-us-2022',[measure(3,'%',{relation:'<'})]),
  metabolism:metric('Non apprezzabile nell’uomo','','Gabapentin','Biotrasformazione','gabapentin-us-2022'),
  metabolites:metric('Attività attribuita al composto parent','Non è un profarmaco nella formulazione selezionata.','Gabapentin','Contributo farmacologico del parent','gabapentin-us-2022'),
  excretion:metric('Renale, come farmaco immodificato','Non equivale al 100% della dose orale: l’assorbimento è incompleto.','Gabapentin immodificato','Via di eliminazione sistemica','gabapentin-us-2022')
 }),
 profile('duloxetine-gastroresistant-uk','Duloxetina · capsule gastroresistenti','CHEMBL1175','Duloxetine KRKA 60 mg; duloxetina cloridrato espressa come duloxetina','Adulti; valori generali dello SmPC britannico, non stime per singoli pazienti.','duloxetine-uk-2023',{
  halfLife:metric('8–17 h; media 12 h','','Duloxetina','Emivita di eliminazione','duloxetine-uk-2023',[range(8,17,'h'),measure(12,'h',{statistic:'mean'})]),
  bioavailability:metric('32–80%; media 50%','','Duloxetina','Biodisponibilità orale assoluta','duloxetine-uk-2023',[range(32,80,'%'),measure(50,'%',{statistic:'mean'})]),
  proteinBinding:metric('≈96%','Albumina e glicoproteina acida α1.','Duloxetina','Legame plasmatico','duloxetine-uk-2023',[measure(96,'%',{relation:'~'})]),
  metabolism:metric('CYP1A2 e CYP2D6, poi coniugazione','','Duloxetina','Biotrasformazione ossidativa','duloxetine-uk-2023'),
  metabolites:metric('Metaboliti circolanti considerati inattivi in vitro','Coniugati di 4-idrossi-duloxetina e 5-idrossi-6-metossi-duloxetina.','Metaboliti della duloxetina','Attività farmacologica in vitro','duloxetine-uk-2023'),
  excretion:metric('Metaboliti principalmente nelle urine','La quota di dose non è quantificata in questo paragrafo dello SmPC.','Metaboliti della duloxetina','Via di escrezione dei metaboliti','duloxetine-uk-2023')
 }),
 profile('sertraline-tablets-us','Sertralina · compresse','CHEMBL809','Zoloft compresse; cloridrato espresso come sertralina; non soluzione concentrata','Adulti; i dati di recupero radioattivo provengono da due uomini sani seguiti per 9 giorni.','sertraline-us-2023',{
  halfLife:metric('≈26 h (sertralina)','Il dato del metabolita è distinto qui sotto.','Sertralina','Emivita terminale plasmatica','sertraline-us-2023',[measure(26,'h',{relation:'~'})]),
  bioavailability:metric('Assoluta non quantificata nella fonte','La comparabilità compressa/soluzione non dimostra F assoluta del 100%.','Sertralina','Confronto relativo tra formulazioni','sertraline-us-2023'),
  proteinBinding:metric('98%','In vitro, concentrazioni 20–500 ng/mL.','Sertralina','Legame alle proteine sieriche','sertraline-us-2023',[measure(98,'%')]),
  metabolism:metric('Primo passaggio; N-demetilazione','Seguono altre trasformazioni e coniugazione.','Sertralina','Biotrasformazione','sertraline-us-2023'),
  metabolites:metric('N-desmetilsertralina: 62–104 h','Sostanzialmente meno attiva del parent, non equivalente clinico.','N-desmetilsertralina','Emivita terminale del metabolita','sertraline-us-2023',[range(62,104,'h')]),
  excretion:metric('40–45% della radioattività nelle urine; 40–45% nelle feci','In 9 giorni: parent non rilevabile nelle urine; quota fecale immodificata 12–14%.','Radioattività totale; sertralina immodificata distinta','Recupero dopo dose radiomarcata','sertraline-us-2023',[range(40,45,'%',{route:'urine',denominator:'radioattività somministrata'}),range(40,45,'%',{route:'feci',denominator:'radioattività somministrata'})])
 })
];
const drug=(id,name,chembl,family,subgroup,mechanism,clinical,critical,references,learning)=>({id,name,chembl,family,subgroup,targets:[],quizAvailable:false,tag:'Neuropsicofarmacologia',mechanism,clinical,critical,review:'Sintesi originale controllata sulle fonti il 22/10/2026; non monografia esaustiva né validazione clinica indipendente. Giurisdizioni e formulazioni restano distinte.',references,learning});
export const BATCH_DRUGS=[
 drug('pregabalin','Pregabalin','CHEMBL1059','Gabapentinoidi','Ligando α2δ',
  'Si lega alla subunità ausiliaria α2δ dei canali del calcio voltaggio-dipendenti. Non è un agonista GABA-A/GABA-B; il meccanismo terapeutico non è completamente chiarito.',
  'UE, Lyrica negli adulti: dolore neuropatico periferico e centrale, terapia aggiuntiva delle crisi focali e disturbo d’ansia generalizzata.',
  'Capogiri, sonnolenza, edema e angioedema. Possibile depressione respiratoria con depressori del SNC; sospensione brusca associata a sintomi da interruzione.',
  [{id:'pregabalin-us-2020',supports:'Meccanismo, rischi e profilo PK USA'},{id:'pregabalin-eu-2026',supports:'Indicazioni UE; non posologia italiana'}],
  {title:'Somiglianza chimica non significa stesso bersaglio',body:'Il nome e la parentela strutturale non bastano per assegnare un recettore: qui il dato α2δ va tenuto distinto dalla trasmissione GABAergica.'}),
 drug('gabapentin','Gabapentin','CHEMBL940','Gabapentinoidi','Ligando α2δ',
  'Lega α2δ in vitro; non modifica legame, ricaptazione o degradazione del GABA. La label distingue questo risultato dalla spiegazione non definitiva dell’effetto terapeutico.',
  'Regno Unito, Gabapentin Tillomed: dolore neuropatico periferico negli adulti; crisi focali in aggiunta o monoterapia con requisiti d’età diversi. Non è una conferma delle indicazioni italiane.',
  'Sonnolenza, capogiri e atassia; rischio respiratorio con oppioidi o altri depressori del SNC. Possibili reazioni cutanee gravi, dipendenza e sintomi da interruzione.',
  [{id:'gabapentin-us-2022',supports:'Meccanismo e PK della formulazione convenzionale USA'},{id:'gabapentin-uk-2026',supports:'Indicazioni e sicurezza del prodotto UK'}],
  {title:'Più dose non significa stessa frazione assorbita',body:'Confronta le due percentuali insieme alle rispettive dosi e al frazionamento. Una percentuale isolata nasconderebbe la non proporzionalità; non ricavarne conversioni tra farmaci.'}),
 drug('duloxetina','Duloxetina','CHEMBL1175','Antidepressivi SNRI','Inibitore della ricaptazione 5-HT/NA',
  'Inibisce la ricaptazione di serotonina e noradrenalina: il bersaglio funzionale è il trasporto delle monoamine, non un agonismo diretto dei loro recettori.',
  'UE, Cymbalta negli adulti: depressione maggiore, disturbo d’ansia generalizzata e dolore neuropatico periferico diabetico.',
  'Nausea, aumento pressorio, rischio serotoninergico e danno epatico. Nella fonte UE sono rilevanti epatopatia, insufficienza renale grave, ipertensione non controllata e associazioni con IMAO o potenti inibitori CYP1A2.',
  [{id:'duloxetine-eu-2026',supports:'Meccanismo, indicazioni e principali limiti UE'},{id:'duloxetine-uk-2023',supports:'PK del prodotto KRKA UK; interazioni'}],
  {title:'Metabolismo epatico ed escrezione renale non si escludono',body:'La trasformazione del parent e l’uscita dei metaboliti sono passaggi diversi. Scrivere soltanto “eliminazione renale” cancellerebbe una parte essenziale del percorso.'}),
 drug('sertralina','Sertralina','CHEMBL809','Antidepressivi SSRI','Inibitore della ricaptazione 5-HT',
  'Inibisce selettivamente la ricaptazione della serotonina; non inibisce le monoamino-ossidasi.',
  'Regno Unito, Lustral: depressione, disturbo di panico, DOC, ansia sociale e PTSD; l’indicazione pediatrica riguarda il DOC a 6–17 anni. Verificare separatamente il RCP italiano.',
  'Disturbi gastrointestinali e sessuali; attenzione a sindrome serotoninergica, sanguinamento, iponatriemia e attivazione maniacale. Sorveglianza dell’ideazione suicidaria, soprattutto nei giovani e nelle fasi iniziali; possibili sintomi da interruzione.',
  [{id:'sertraline-us-2023',supports:'Meccanismo e PK delle compresse USA'},{id:'sertraline-uk-2025',supports:'Indicazioni, sicurezza e interazioni del prodotto UK'}],
  {title:'Un metabolita più persistente non è necessariamente più attivo',body:'Confronta separatamente durata e attività. L’emivita della N-desmetilsertralina non deve sostituire quella della sertralina nel riepilogo, né diventare una previsione della risposta clinica.'})
];

// Atomic validation precedes mutation, including on retry. Collisions are errors, not silent overwrites.
export function appendContentBatches(editorial,pk,batch={drugs:BATCH_DRUGS,sources:BATCH_SOURCES,profiles:BATCH_PROFILES}){
 const additions=[[editorial.drugs,batch.drugs,'id'],[pk.sources,batch.sources,'id'],[pk.profiles,batch.profiles,'id']];
 for(const [existing,incoming,key] of additions){
  if(!Array.isArray(existing)||!Array.isArray(incoming))throw new TypeError('eli: dataset incompleto');
  const seen=new Set(existing.map(item=>item[key]));
  for(const item of incoming){if(seen.has(item[key]))throw new Error('eli: identità duplicata '+item[key]);seen.add(item[key]);}
 }
 const chemicalIds=new Set(editorial.drugs.map(d=>d.chembl));
 for(const d of batch.drugs){if(chemicalIds.has(d.chembl))throw new Error('eli: identità chimica duplicata '+d.chembl);chemicalIds.add(d.chembl);}
 for(const [existing,incoming] of additions)existing.push(...structuredClone(incoming));
}
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderBatchPharmacology(drug,sources=BATCH_SOURCES){
 if(!drug?.references?.length)return '';
 const refs=drug.references.map(ref=>{const s=sources.find(s=>s.id===ref.id);if(!s)return '';return `<p><strong>${esc(ref.supports)}</strong><br><a class="ev-link" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.product)} ↗</a><br><small>${esc(s.jurisdiction)} · ${esc(s.section)} · ${esc(s.sourceVersion)}</small></p>`;}).join('');
 return `<section class="ev-panel" data-batch-pharmacology="${esc(drug.id)}"><h2>${esc(drug.learning.title)}</h2><p>${esc(drug.learning.body)}</p>${drug.interactions?`<h3>Interazioni da comprendere</h3><p>${esc(drug.interactions)}</p>`:""}<details class="ev-more"><summary>Fonti della sintesi e limiti</summary>${refs}<p class="ev-note">Controllo editoriale ${esc(drug.checkedAt||CHECKED)}. Sintesi selettiva: non comprende tutte le controindicazioni, le interazioni o le popolazioni speciali. Il documento originale resta necessario; USA e Regno Unito non equivalgono a un RCP italiano.</p></details></section>`;
}
