/* ELIX 0.6 · verified structural atlas; animated pathways are schematic. */
const RECEPTORS=[
  {
    "id": "ADRB2",
    "name": "Recettore β₂-adrenergico",
    "coupling": "Gs",
    "ligand": "Adrenalina e noradrenalina",
    "organ": "Muscolatura liscia bronchiale e vascolare",
    "theory": "β₂ è un GPCR che favorisce l’attivazione di Gs. La via adenilato ciclasi–cAMP–PKA contribuisce al rilassamento bronchiale, con molteplici bersagli intracellulari e meccanismi di desensibilizzazione.",
    "cascade": [
      "Agonista β₂",
      "β₂-AR",
      "Gs",
      "Adenilato ciclasi",
      "cAMP",
      "PKA",
      "Rilassamento"
    ],
    "pdb": "7BZ2",
    "pdbDesc": "Complesso sperimentale β₂–formoterolo–Gs, crio-EM.",
    "pdbCaution": "La struttura contiene formoterolo, non salbutamolo. Non è una traiettoria dinamica.",
    "paper": "https://doi.org/10.1038/s41421-020-0176-9",
    "citation": "Zhang et al., Cell Discovery (2020)"
  },
  {
    "id": "ADRB1",
    "name": "Recettore β₁-adrenergico",
    "coupling": "Gs",
    "ligand": "Noradrenalina e adrenalina",
    "organ": "Cardiomiociti e cellule iuxtaglomerulari",
    "theory": "La stimolazione β₁ favorisce Gs–cAMP–PKA. Nel cuore modula il ciclo del Ca²⁺, frequenza e contrattilità; nelle cellule iuxtaglomerulari contribuisce al rilascio di renina. Gli effetti effettivi dipendono dal tessuto.",
    "cascade": [
      "Catecolamina",
      "β₁-AR",
      "Gs",
      "Adenilato ciclasi",
      "cAMP",
      "PKA",
      "Risposta cardiaca / renina"
    ],
    "pdb": "7BU6",
    "pdbDesc": "Recettore β₁ umano con noradrenalina e nanobody 6B9; raggi X.",
    "pdbCaution": "La struttura usa un costrutto sperimentale modificato; non rappresenta il cardiomiocita.",
    "paper": "https://doi.org/10.1038/s41422-020-00424-2",
    "citation": "Xu et al., Cell Research (2021)"
  },
  {
    "id": "AGTR1",
    "name": "Recettore AT₁ dell’angiotensina II",
    "coupling": "Gq/11 · β-arrestina",
    "ligand": "Angiotensina II",
    "organ": "Vasi, surrene e rene",
    "theory": "AT₁ attiva Gq/11–PLCβ, producendo IP₃ e DAG; Ca²⁺ e PKC contribuiscono a contrazione vasale e secrezione di aldosterone. Esistono anche altri rami di segnalazione, inclusa β-arrestina.",
    "cascade": [
      "Angiotensina II",
      "AT₁",
      "Gq/11",
      "PLCβ",
      "IP₃ / DAG",
      "Ca²⁺ / PKC",
      "Tono vasale"
    ],
    "pdb": "7F6G",
    "pdbDesc": "AT₁ umano con l’analogo Sar¹-AngII e Gq; crio-EM.",
    "pdbCaution": "Il ligando sperimentale è Sar¹-AngII: non va confuso con l’angiotensina II naturale.",
    "paper": "https://doi.org/10.15252/embj.2022112940",
    "citation": "Zhang et al., EMBO Journal (2023)"
  },
  {
    "id": "ADRA2A",
    "name": "Recettore α₂A-adrenergico",
    "coupling": "Gi/o",
    "ligand": "Noradrenalina",
    "organ": "SNC, terminazioni presinaptiche e altri tessuti",
    "theory": "α₂A si accoppia prevalentemente a Gi/o, può attenuare la produzione di cAMP e modulare canali ionici. In numerose terminazioni nervose contribuisce alla regolazione del rilascio di noradrenalina.",
    "cascade": [
      "Agonista α₂A",
      "α₂A-AR",
      "Gi/o",
      "Adenilato ciclasi ↓",
      "cAMP ↓",
      "Canali modulati",
      "Trasmissione regolata"
    ],
    "pdb": "7EJ8",
    "pdbDesc": "Complesso α₂A–brimonidina–GoA; crio-EM.",
    "pdbCaution": "Questo complesso contiene brimonidina e GoA. Il diagramma fisiologico è semplificato.",
    "paper": "https://doi.org/10.1126/sciadv.abj5347",
    "citation": "Xu et al., Science Advances (2022)"
  },
  {
    "id": "ADRA1A",
    "name": "Recettore α₁A-adrenergico",
    "coupling": "Gq/11",
    "ligand": "Noradrenalina e adrenalina",
    "organ": "Muscolatura liscia vascolare e altri tessuti",
    "theory": "Il recettore α₁A si accoppia principalmente a Gq/11, stimolando PLCβ, IP₃/DAG e segnalazione del calcio, che contribuisce alla contrazione in determinati tessuti.",
    "cascade": [
      "Catecolamina",
      "α₁A-AR",
      "Gq/11",
      "PLCβ",
      "IP₃ / DAG",
      "Ca²⁺",
      "Contrazione"
    ],
    "pdb": "8THL",
    "pdbDesc": "Recettore α₁A con adrenalina e complesso G; crio-EM.",
    "pdbCaution": "Uno stato sperimentale stabilizzato per la determinazione strutturale; non dinamica continua.",
    "paper": "https://doi.org/10.1038/s41467-023-40524-2",
    "citation": "Su et al., Nature Communications (2023)"
  }
];
export function createReceptorAtlas({drugs,refresh}){
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const state={query:"",viewer:null};
  const known=new Map(RECEPTORS.map(x=>[x.id,x]));
  const targets=[...new Set(drugs.flatMap(d=>d.targets||[]))];
  const matches=id=>drugs.filter(d=>(d.targets||[]).includes(id));
  const drugLinks=id=> {
    const list=matches(id);
    return list.length?list.map(d=>`<a href="#/drug/${encodeURIComponent(d.id)}" class="rx-drug"><strong>${esc(d.name)}</strong><small>${esc(d.subgroup)}</small><span>↗</span></a>`).join(""):"<p class='rx-muted'>Non sono ancora disponibili collegamenti revisionati con farmaci nella selezione didattica attuale.</p>";
  };
  function listHTML(){
    const q=state.query.toLocaleLowerCase("it").trim();
    const xs=RECEPTORS.filter(x=>(x.id+" "+x.name+" "+x.coupling+" "+x.organ).toLocaleLowerCase("it").includes(q));
    return xs.length?xs.map(x=>`<a class="rx-result" href="#/receptors/${x.id}"><span class="rx-gene">${esc(x.id)}</span><span><strong>${esc(x.name)}</strong><small>GPCR · ${esc(x.coupling)}</small></span><span class="rx-pdb">PDB ${x.pdb} ↗</span></a>`).join(""):"<p class='rx-muted'>Nessun risultato nel primo nucleo di recettori verificati.</p>";
  }
  function index(){
    return `<div class="rx-wrap"><header class="rx-heading"><span class="eyebrow">ELIX · Strutture e fisiologia</span><h1>Recettori</h1><p>Un'unica scheda per struttura atomica 3D, fisiologia, segnalazione e farmaci che interagiscono con il bersaglio.</p></header>
      <p class="rx-summary"><strong>${RECEPTORS.length} recettori con modello PDB verificato</strong><span>Primo nucleo editoriale. Il catalogo dei recettori non è ancora esaustivo.</span></p>
      <label class="rx-search">Cerca per nome, gene o via di segnalazione<input id="rx-search" type="search" value="${esc(state.query)}" placeholder="β₂, ADRB1, Gq, muscolatura…" autocomplete="off"></label>
      <div class="rx-results" id="rx-results">${listHTML()}</div>
      <section class="rx-secondary"><h2>Altri bersagli del catalogo didattico</h2><p>Non tutti i bersagli sono recettori: qui compaiono anche enzimi, canali e trasportatori. Le schede incomplete non mostrano modelli 3D attribuiti per analogia.</p><div class="rx-cloud">${targets.filter(id=>!known.has(id)).map(id=>`<a href="#/receptors/${encodeURIComponent(id)}">${esc(id)}</a>`).join("")}</div></section>
      </div>`;
  }
  function detail(id){
    const x=known.get(id);
    if(!x){
      if(!targets.includes(id))return `<div class="rx-wrap"><a href="#/receptors" class="rx-back">← Recettori</a><h1>Bersaglio non catalogato</h1></div>`;
      return `<div class="rx-wrap"><a href="#/receptors" class="rx-back">← Recettori</a><h1>${esc(id)}</h1><p>Questo bersaglio compare tra le annotazioni farmacologiche, ma non ha ancora una monografia scientifica e una struttura PDB collegata e verificata.</p><section class="rx-panel"><h2>Farmaci collegati</h2><div class="rx-drugs">${drugLinks(id)}</div></section></div>`;
    }
    const open=state.viewer===id;
    return `<div class="rx-wrap"><a href="#/receptors" class="rx-back">← Tutti i recettori</a>
      <header class="rx-heading"><span class="eyebrow">${esc(x.id)} · GPCR</span><h1>${esc(x.name)}</h1><p>${esc(x.organ)}</p><div class="rx-tags"><span>${esc(x.coupling)}</span><span>PDB ${x.pdb} verificato</span></div></header>
      <div class="rx-two">
      <section class="rx-panel"><div class="rx-panel-head"><h2>Struttura sperimentale 3D</h2><span>PDB ${x.pdb}</span></div>
      ${open?`<iframe class="rx-molstar" loading="lazy" title="Viewer 3D del recettore ${esc(x.id)}" src="https://molstar.org/viewer/?pdb=${x.pdb}&amp;hide-controls=1" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`:`<div class="rx-viewer-poster"><span>3D</span><strong>${esc(x.name)}</strong><p>Il modello viene caricato solo quando lo apri.</p><button type="button" data-rx="viewer" data-id="${x.id}">Carica struttura 3D ↗</button></div>`}
      <p>${esc(x.pdbDesc)}</p><p class="rx-muted">${esc(x.pdbCaution)}</p><div class="rx-actions"><a href="https://www.rcsb.org/structure/${x.pdb}" target="_blank" rel="noopener noreferrer">Scheda PDB ↗</a><a href="https://www.rcsb.org/3d-view/${x.pdb}" target="_blank" rel="noopener noreferrer">Viewer alternativo ↗</a>${open?`<button type="button" data-rx="viewer" data-id="${x.id}">Chiudi viewer</button>`:""}</div><p class="rx-source">Fonte primaria: <a href="${esc(x.paper)}" target="_blank" rel="noopener noreferrer">${esc(x.citation)} ↗</a></p></section>
      <section class="rx-panel"><h2>Fisiologia e farmacodinamica</h2><p class="rx-theory">${esc(x.theory)}</p><dl><dt>Ligando endogeno</dt><dd>${esc(x.ligand)}</dd><dt>Accoppiamento</dt><dd>${esc(x.coupling)}</dd><dt>Tessuti</dt><dd>${esc(x.organ)}</dd></dl></section>
      </div>
      <section class="rx-panel"><div class="rx-panel-head"><h2>Via di segnalazione</h2><a class="rx-primary" href="#/cinema/${x.id}">Apri Cinema cellulare →</a></div><div class="rx-cascade">${x.cascade.map((step,i)=>`<span><small>${String(i+1).padStart(2,"0")}</small>${esc(step)}</span>`).join("<b aria-hidden='true'>→</b>")}</div><p class="rx-muted">Percorso canonico semplificato. Le strutture PDB sono dati sperimentali; il movimento illustrato nel Cinema non è una dinamica molecolare misurata.</p></section>
      <section class="rx-panel"><div class="rx-panel-head"><h2>Farmaci che agiscono sul bersaglio</h2><a href="#/atlas">Catalogo Farmaci ↗</a></div><p class="rx-muted">${matches(id).length} collegamenti nel sottoinsieme di schede didattiche curate. L'elenco non è completo.</p><div class="rx-drugs">${drugLinks(id)}</div></section></div>`;
  }
  document.addEventListener("click",e=>{
    const el=e.target.closest("[data-rx]");if(!el)return;
    if(el.dataset.rx==="viewer"){e.preventDefault();state.viewer=state.viewer===el.dataset.id?null:el.dataset.id;refresh();}
  });
  document.addEventListener("input",e=>{
    if(e.target?.id!=="rx-search")return;
    state.query=e.target.value;const el=document.getElementById("rx-results");if(el)el.innerHTML=listHTML();
  });
  return {route:(p,id)=>p!=="receptors"?null:id?detail(id):index(),all:RECEPTORS};
}
