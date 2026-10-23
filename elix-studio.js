import { ELIX_VOLUMES, ELIX_CHAPTERS, ELIX_QUESTIONS } from "./elix-content.js";
import {GUIDELINES_09} from "./elix-09-content.js";

/* eli Alpha 0.5: didactic UI, no medical dosing or real patient prediction. */
export function createElixStudio({refresh}) {
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const load = (key, fallback) => {try {return JSON.parse(localStorage.getItem(key)) ?? fallback;} catch {return fallback;}};
  const store = (key, value) => {try {localStorage.setItem(key,JSON.stringify(value));} catch {}};
  const state = {
    volume:"all", bookQuery:"", quizSize:"20", dose:45, elimination:"standard", trialControl:10, trialTreatment:6,
    kind:"all", group:"all", drug:"all", maxDifficulty:"all",
    quiz:null, progress:load("elix-academy-progress",{sessions:0,answered:0,correct:0,wrong:{}}),
    cinemaTarget:"ADRB2",cinemaStep:0,cinemaPlaying:false,cinemaSpeed:1,cinemaMode:"cell"
  };
  const ids=new Set(ELIX_QUESTIONS.map(q=>q.id));
  if(!state.progress||typeof state.progress!=='object')state.progress={};
  for(const key of ['sessions','answered','correct'])state.progress[key]=Number.isFinite(state.progress[key])?Math.max(0,Math.floor(state.progress[key])):0;
  state.progress.wrong=Object.fromEntries(Object.entries(state.progress.wrong||{}).filter(([id,n])=>ids.has(id)&&Number(n)>0));
  const saved=load('elix-academy-session',null);
  if(saved&&Array.isArray(saved.deck)&&saved.deck.length&&saved.deck.every(id=>ids.has(id))&&new Set(saved.deck).size===saved.deck.length&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<saved.deck.length&&Number.isInteger(saved.score)&&saved.score>=0&&saved.score<=saved.index+1&&(saved.selection===null||Number.isInteger(saved.selection)&&saved.selection>=0&&saved.selection<4))state.quiz=saved;
  const persistQuiz=()=>store('elix-academy-session',state.quiz);
  function orderFor(session,q){
    session.orders??={};const order=session.orders[q.id];
    if(!Array.isArray(order)||order.length!==q.answers.length||new Set(order).size!==q.answers.length||!order.every(i=>Number.isInteger(i)&&i>=0&&i<q.answers.length)){session.orders[q.id]=shuffle(q.answers.map((_,i)=>i));persistQuiz();}
    return session.orders[q.id];
  }
  function launchQuiz(deck){const size=state.quizSize==='all'?deck.length:Number(state.quizSize);state.quiz={deck:deck.slice(0,size),index:0,selection:null,score:0,orders:{}};persistQuiz();refresh();document.querySelector?.('.ex-question')?.scrollIntoView?.({block:'start'});}
  let cinemaTimer = null;
  const stages = [
    {name:"Diffusione del ligando",zone:"Spazio extracellulare"},
    {name:"Riconoscimento del sito di legame",zone:"Interfaccia recettore-ligando"},
    {name:"Cambiamento conformazionale",zone:"Membrana plasmatica"},
    {name:"Accoppiamento alla proteina G",zone:"Faccia citosolica"},
    {name:"Secondi messaggeri e chinasi",zone:"Citoplasma"},
    {name:"Risposta del tessuto",zone:"Effetto fisiologico"}
  ];
  const cinemaModels = {
  "ADRB2": {
    "name": "Recettore β₂-adrenergico",
    "ligand": "Formoterolo (PDB 7BZ2)",
    "protein": "Gs",
    "messenger": "cAMP → PKA",
    "result": "Rilassamento bronchiale",
    "organ": "Muscolatura liscia bronchiale",
    "pdb": "7BZ2",
    "note": "Complesso β₂–formoterolo–Gs (crio-EM). Il modello strutturale è sperimentale, mentre l'animazione del movimento è illustrativa.",
    "structure": "https://www.rcsb.org/structure/7BZ2",
    "viewer": "https://www.rcsb.org/3d-view/7BZ2"
  },
  "ADRB1": {
    "name": "Recettore β₁-adrenergico",
    "ligand": "Noradrenalina (PDB 7BU6)",
    "protein": "Gs",
    "messenger": "cAMP → PKA",
    "result": "Modulazione cardiaca",
    "organ": "Cardiomiocita",
    "pdb": "7BU6",
    "note": "Recettore β₁ con noradrenalina e nanobody 6B9 (raggi X), costrutto modificato. Il movimento è illustrativo.",
    "structure": "https://www.rcsb.org/structure/7BU6",
    "viewer": "https://www.rcsb.org/3d-view/7BU6"
  },
  "AGTR1": {
    "name": "Recettore AT₁ dell'angiotensina II",
    "ligand": "Sar¹-AngII (PDB 7F6G)",
    "protein": "Gq/11",
    "messenger": "PLCβ → IP₃/DAG → Ca²⁺",
    "result": "Aumento del tono vascolare",
    "organ": "Muscolatura liscia vascolare",
    "pdb": "7F6G",
    "note": "Struttura AT₁ con analogo Sar¹-AngII e Gq (crio-EM). La via animata mostra soltanto il ramo canonico.",
    "structure": "https://www.rcsb.org/structure/7F6G",
    "viewer": "https://www.rcsb.org/3d-view/7F6G"
  },
  "ADRA2A": {
    "name": "Recettore α₂A-adrenergico",
    "ligand": "Brimonidina (PDB 7EJ8)",
    "protein": "Gi/o",
    "messenger": "Adenilato ciclasi ↓ · cAMP ↓",
    "result": "Modulazione del rilascio sinaptico",
    "organ": "Terminale noradrenergico (schematico)",
    "pdb": "7EJ8",
    "note": "Complesso α₂A–brimonidina–GoA (crio-EM). L'animazione non rappresenta la traiettoria sperimentale.",
    "structure": "https://www.rcsb.org/structure/7EJ8",
    "viewer": "https://www.rcsb.org/3d-view/7EJ8"
  },
  "ADRA1A": {
    "name": "Recettore α₁A-adrenergico",
    "ligand": "Adrenalina (PDB 8THL)",
    "protein": "Gq/11",
    "messenger": "PLCβ → IP₃/DAG → Ca²⁺",
    "result": "Contrazione muscolare",
    "organ": "Muscolatura liscia",
    "pdb": "8THL",
    "note": "Complesso α₁A con adrenalina, crio-EM. È uno stato strutturale, non un film atomistico.",
    "structure": "https://www.rcsb.org/structure/8THL",
    "viewer": "https://www.rcsb.org/3d-view/8THL"
  }
};

  const badge = (text,kind="") => "<span class='ex-badge "+esc(kind)+"'>"+esc(text)+"</span>";
  const card = (title,body,cls="") => "<section class='ex-card "+cls+"'><h2>"+title+"</h2>"+body+"</section>";
  const heading = (eyebrow,title,lead,action="") => "<div class='ex-page-head'><div><span class='ex-kicker'>"+esc(eyebrow)+"</span><h1>"+esc(title)+"</h1><p>"+esc(lead)+"</p></div>"+action+"</div>";
  // Labs are reached contextually from Farmaci or Recettori, not via a second navigation bar.
  const tabs = () => "";

  function textbook(id) {
    const chapter = ELIX_CHAPTERS.find(c=>c.id===id);
    if(id&&!chapter)return heading("eli TEXTBOOK","Capitolo non trovato","Il collegamento non corrisponde a un capitolo disponibile.")+"<a href='#/textbook'>Torna alla teoria →</a>";
    const volumes = ELIX_VOLUMES.filter(v=>state.volume==="all"||String(v.id)===state.volume);
    const chapterList = volumes.map(v=>{
      const query=state.bookQuery.trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
      const list=ELIX_CHAPTERS.filter(c=>c.volume===v.id&&(!query||[c.title,c.lead,...c.sections.map(x=>x.title+" "+x.text)].join(" ").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(query)));
      if(query&&!list.length)return "";
      return "<article class='ex-volume'><div class='ex-volume-meta'>VOLUME "+String(v.id).padStart(2,"0")+"</div><h3>"+esc(v.title)+"</h3><p>"+(list.length?list.length+" capitoli originali disponibili":"Indice programmato; stesura ancora da avviare")+"</p>"+list.map(c=>"<a href='#/textbook/"+esc(c.id)+"' class='ex-chapter-link'>"+esc(c.title)+" <span aria-hidden='true'>↗</span></a>").join("")+"</article>";
    }).join("");
    const intro=heading("eli TEXTBOOK","La Bibbia dei Farmaci","Biblioteca originale strutturata in 18 volumi: testo, recettori, molecole, studi, casi e quiz collegati.",
      badge(ELIX_CHAPTERS.length+" capitoli disponibili","accent"));
    if(chapter) {
      const bibliography=(chapter.sources||[]).map(id=>GUIDELINES_09.find(g=>g.id===id)).filter(Boolean);
      return tabs()+intro+"<div class='ex-book-layout'><aside class='ex-chapter-index'><a class='ex-back' href='#/textbook'>← Tutti i capitoli</a><p class='ex-mini'>VOLUME "+chapter.volume+"</p><h3>"+esc(chapter.title)+"</h3><p>"+esc(chapter.lead)+"</p><div class='ex-index-list'>"+chapter.sections.map((section,i)=>"<button type='button' data-elix='chapter-jump' data-index='"+i+"'>"+String(i+1).padStart(2,"0")+" · "+esc(section.title)+"</button>").join("")+"</div></aside><article class='ex-reading'><div class='ex-reading-meta'>Contenuto didattico originale • revisione specialistica in corso</div><h2>"+esc(chapter.title)+"</h2><p class='ex-intro'>"+esc(chapter.lead)+"</p>"+chapter.sections.map((section,i)=>"<section id='part-"+i+"'><h3>"+esc(section.title)+"</h3><p>"+esc(section.text)+"</p></section>").join("")+"<div class='ex-related'>"+(chapter.drugs?.length?"<div><strong>Farmaci collegati</strong><div>"+chapter.drugs.map(id=>"<a href='#/drug/"+encodeURIComponent(id)+"'>"+esc(id)+" ↗</a>").join("")+"</div></div>":"")+(chapter.targets?.length?"<div><strong>Bersagli da esplorare</strong><div>"+chapter.targets.map(id=>"<a href='#/receptors/"+encodeURIComponent(id)+"'>"+esc(id)+" ↗</a>").join("")+"</div></div>":"")+"</div>"+(bibliography.length?"<section class='ex-guides'><h3>Fonti e linee guida collegate</h3>"+bibliography.map(g=>"<a href='"+esc(g.url)+"' target='_blank' rel='noopener noreferrer'><strong>"+esc(g.name)+" · "+g.year+"</strong><small>"+esc(g.status)+"</small><span>"+esc(g.note)+"</span></a>").join("")+"</section>":"")+"<div class='ex-footer-links'><a href='#/quiz'>Verifica la comprensione →</a><a href='#/receptors'>Esplora recettori e bersagli →</a></div><p class='ex-disclaimer'>Questi capitoli non riproducono manuali commerciali. Sono prime unità editoriali originali e non costituiscono ancora un trattato completo, né raccomandazioni cliniche.</p></article></div>";
    }
    return tabs()+intro+"<label class='ex-book-search'>Cerca nei titoli e nei concetti<input id='ex-book-search' type='search' value='"+esc(state.bookQuery)+"' placeholder='Primo passaggio, agonista, CYP, anticoagulanti…'></label><div class='ex-toolbar'><label>Volume da esplorare<select id='ex-volume'><option value='all'>Tutti i 18 volumi</option>"+ELIX_VOLUMES.map(v=>"<option value='"+v.id+"' "+(state.volume===String(v.id)?"selected":"")+">"+v.id+" · "+esc(v.title)+"</option>").join("")+"</select></label><span class='ex-muted'>"+ELIX_CHAPTERS.length+" capitoli scritti · "+ELIX_VOLUMES.length+" volumi in indice</span></div><div class='ex-volume-grid'>"+(chapterList||"<div class='ex-card'><h2>Nessun capitolo trovato</h2><p>Prova un sinonimo o rimuovi il filtro del volume.</p></div>")+"</div>";
  }

  function modelValues(dose=state.dose) {
    // Arbitrary adimensional Emax/Hill toy curves, NEVER real drug PK/PD values.
    const exposure=dose*(state.elimination==="reduced"?1.65:1);
    const effect=Math.round(100*exposure/(exposure+35));
    const safety=Math.round(100*Math.pow(exposure,3)/(Math.pow(exposure,3)+Math.pow(90,3)));
    return {exposure,effect,safety};
  }
  function doseChart() {
    const width=640,height=245,pad=36,h=height-2*pad;
    const build=mode=>Array.from({length:101},(_,i)=>{
      const x=pad+i/100*(width-2*pad),v=modelValues(i);
      const y=pad+h*(1-(mode==="effect"?v.effect:v.safety)/100);
      return (i?"L":"M")+x.toFixed(1)+","+y.toFixed(1);
    }).join(" ");
    return "<svg class='ex-graph' viewBox='0 0 640 245' role='img' aria-label='Curve teoriche di effetto e indice di danno, in unità arbitrarie'>"+
      [0,25,50,75,100].map(v=>"<line x1='36' x2='604' y1='"+(209-1.73*v)+"' y2='"+(209-1.73*v)+"' class='ex-grid-line'/>").join("")+
      "<path d='"+build("effect")+"' class='ex-curve-effect'/><path d='"+build("safety")+"' class='ex-curve-safety'/>"+
      "<text x='36' y='232'>Bassa</text><text x='604' y='232' text-anchor='end'>Dose relativa alta</text></svg>";
  }
  function doseResults() {
    const v=modelValues();
    const meter=(name,value,color) => "<div class='ex-meter'><div class='ex-meter-head'><strong>"+name+"</strong><span>"+value+" / 100</span></div><div class='ex-track'><span class='"+color+"' style='width:"+value+"%'></span></div></div>";
    return "<div class='ex-results-grid'>"+
      "<div><span>Esposizione simulata</span><strong>"+v.exposure.toFixed(1)+"</strong><small>Unità arbitrarie</small></div>"+
      "<div><span>Effetto relativo</span><strong>"+v.effect+"/100</strong><small>Indice matematico, non efficacia clinica</small></div>"+
      "<div><span>Indice di danno</span><strong>"+v.safety+"/100</strong><small>Non equivale a probabilità di tossicità</small></div>"+
      "</div>"+meter("Risposta Emax simulata",v.effect,"good")+meter("Indice teorico di danno",v.safety,"warn");
  }
  function dose() {
    return tabs()+heading("eli DOSE EXPLORER","La dose cambia tutto. Il contesto anche.","Manipola concentrazione e capacità di eliminazione in un esperimento matematico. Nessun numero rappresenta la posologia o il rischio reale di un medicinale.",badge("Modello non clinico","warn"))+
      "<div class='ex-two'><section class='ex-card'><h2>Imposta lo scenario</h2><div class='ex-control'><label for='ex-dose'>Dose relativa <output id='ex-dose-label'>"+state.dose+"/100</output></label><input id='ex-dose' type='range' min='0' max='100' step='1' value='"+state.dose+"'><div class='ex-range-help'><span>0</span><span>100 · scala arbitraria</span></div></div>"+
      "<div class='ex-control'><label for='ex-clearance'>Capacità di eliminazione</label><select id='ex-clearance'><option value='standard' "+(state.elimination==="standard"?"selected":"")+">Eliminazione di riferimento (teorica)</option><option value='reduced' "+(state.elimination==="reduced"?"selected":"")+">Eliminazione ridotta (scenario fittizio)</option></select></div>"+
      "<div class='ex-alert'>Questo non è uno strumento per stabilire a chi somministrare più o meno farmaco. Il fattore di esposizione è arbitrario: per dosi effettive occorrono RCP e modelli specifici, indicazione, funzione d'organo e dati di validazione.</div></section>"+
      "<section class='ex-card'><h2>Risposta ed esposizione</h2><div id='ex-dose-results'>"+doseResults()+"</div></section></div>"+card("Curva dose-risposta",doseChart()+"<div class='ex-legend'><span><i class='good'></i> Effetto teorico</span><span><i class='warn'></i> Indice teorico di danno</span></div><p class='ex-muted'>Due funzioni convenzionali: Emax per la risposta e funzione di Hill per l'indice di danno. Nessuna deriva da studi o parametri di un farmaco reale.</p>")+
      "<div class='ex-next-card'><strong>Vuoi capire i meccanismi?</strong><p>Studia le differenze tra dose, concentrazione, EC50, Kd e risposta.</p><a href='#/textbook/dose-risposta'>Apri il capitolo →</a></div>";
  }

  function evidenceMath() {
    const base=state.trialControl/100,treated=state.trialTreatment/100;
    const arr=base-treated;
    const rrr=base>0?arr/base:null;
    const rr=base>0?treated/base:null;
    const benefit=arr>0.0000001, harm=arr<(-0.0000001);
    return {arr,rrr,rr,benefit,harm,nnt:benefit?Math.ceil(1/arr-1e-10):null,nnh:harm?Math.ceil(1/Math.abs(arr)-1e-10):null};
  }
  function evidenceStats() {
    const m=evidenceMath();
    const num=v=>Number.isFinite(v)?v.toLocaleString("it-IT",{maximumFractionDigits:2}):"non definito";
    return "<div class='ex-stats'>"+
      "<div><span>Differenza assoluta dei rischi</span><strong>"+num(m.arr*100)+" pp</strong><small>Controllo − trattamento</small></div>"+
      "<div><span>Rischio relativo (RR)</span><strong>"+(m.rr===null?"n.d.":num(m.rr))+"</strong><small>Trattamento / controllo</small></div>"+
      "<div><span>Riduzione relativa del rischio</span><strong>"+(m.rrr===null?"n.d.":num(m.rrr*100)+"%")+"</strong><small>Con rischio iniziale positivo</small></div>"+
      "<div><span>"+(m.harm?"NNH":"NNT")+"</span><strong>"+(m.nnt??m.nnh??"n.d.")+"</strong><small>"+(m.benefit?"Per un evento evitato":m.harm?"Per un danno aggiuntivo":"Nessuna differenza assoluta")+" · stesso follow-up</small></div></div>";
  }
  function evidence() {
    return tabs()+heading("eli EVIDENCE LAB","NNT, NNH e numeri che contano.","Inserisci due rischi di uno stesso endpoint, nella stessa popolazione e nel medesimo orizzonte temporale.",badge("Calcolo aritmetico, non metanalisi"))+
    "<div class='ex-two'><section class='ex-card'><h2>Rischi osservati in uno studio ipotetico</h2>"+
    "<div class='ex-control'><label for='ex-control'>Eventi nel gruppo controllo (%)</label><input type='number' inputmode='decimal' id='ex-control' min='0' max='100' step='0.1' value='"+state.trialControl+"'></div>"+
    "<div class='ex-control'><label for='ex-treated'>Eventi nel gruppo trattato (%)</label><input type='number' inputmode='decimal' id='ex-treated' min='0' max='100' step='0.1' value='"+state.trialTreatment+"'></div>"+
    "<p class='ex-muted'>Esempio iniziale: 10% vs 6%, stesso endpoint a 1 anno, NNT = 25. Cambia i rischi per vedere come cambia il risultato.</p></section>"+
    "<section class='ex-card'><h2>Risultati</h2>"+evidenceStats()+"</section></div>"+
    "<div class='ex-next-card'><strong>Che cosa manca per interpretare un trial vero?</strong><p>Popolazione, randomizzazione, comparatore, definizione dell'endpoint, durata, numerosità, intervalli di confidenza, bias e significatività clinica. Il calcolo isolato non sostituisce questi elementi.</p><a href='#/textbook/interpretare-trial'>Studia ARR, NNT, NNH e RR →</a></div>";
  }

  function stopCinema() {
    if(cinemaTimer!==null){clearInterval(cinemaTimer);cinemaTimer=null;}
    state.cinemaPlaying=false;
  }
  function playCinema() {
    stopCinema();
    if(state.cinemaStep===stages.length-1)state.cinemaStep=0;
    state.cinemaPlaying=true;updateCinema();
    cinemaTimer=setInterval(()=>{
      if(!location.hash.startsWith("#/cinema")||state.cinemaStep>=stages.length-1){stopCinema();updateCinema();return;}
      state.cinemaStep++;if(state.cinemaStep===stages.length-1)stopCinema();updateCinema();
    },Math.round(2400/state.cinemaSpeed));
  }
  // Preserve the scene and controls so CSS transitions can actually interpolate.
  // Replacing #app on every frame used to reset animation, focus and loaded viewers.
  function updateCinema(){
    const canvas=document.querySelector?.('.ex-cell-canvas');
    if(!canvas){refresh();return;}
    const step=state.cinemaStep;
    canvas.className='ex-cell-canvas ex-stage-'+step+(state.cinemaPlaying?' is-playing':' is-paused');
    const text=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};
    const button=(action,disabled)=>{const b=document.querySelector('[data-elix="'+action+'"]');if(b)b.disabled=disabled;};
    text('.ex-cinema-count',(step+1)+' / '+stages.length);
    text('.ex-cinema-narrative h2','Passaggio '+(step+1)+' — '+stages[step].name);
    text('.ex-cinema-narrative .ex-large',stages[step].zone);
    text('.ex-cinema-explanation',cinemaExplanations[step]);
    text('[data-elix="cinema-play"]',state.cinemaPlaying?'Pausa':'▶ Play');
    const play=document.querySelector('[data-elix="cinema-play"]');play?.setAttribute('aria-pressed',String(state.cinemaPlaying));
    button('cinema-back',step===0);button('cinema-next',step===stages.length-1);
    for(const b of document.querySelectorAll?.('[data-elix="cinema-jump"]')||[]){const i=Number(b.dataset.index);b.className=i===step?'current':i<step?'passed':'';if(i===step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');}
  }
  const cinemaExplanations=[
    "Il ligando diffonde nello spazio extracellulare. Il moto mostrato è illustrativo: non misura velocità o collisioni reali.",
    "Il sito di legame riconosce proprietà chimiche del ligando. Affinità e selettività dipendono dalla molecola: la scena non calcola Kd o Ki.",
    "Il ligando agonista può stabilizzare conformazioni attive del GPCR. Le sette eliche rappresentano l’architettura di membrana; il movimento non è una traiettoria atomistica.",
    "Il recettore favorisce lo scambio GDP–GTP sulla proteina G. La famiglia Gs, Gi/o o Gq/11 determina quale via viene modulata, con dipendenza dal tessuto.",
    "Gs favorisce cAMP–PKA; Gi/o può ridurre l’attività dell’adenilato ciclasi; Gq/11 attiva PLCβ e la via IP₃/DAG–Ca²⁺. Lo schema segue il ramo selezionato.",
    "La stessa famiglia di messaggeri può produrre risposte diverse nei tessuti. Il risultato mostrato è un collegamento farmacologico qualitativo, non una previsione sul paziente."
  ];
  function cinema() {
    const model=cinemaModels[state.cinemaTarget],step=state.cinemaStep;
    const stage=stages[step];
    const helix=Array.from({length:7},(_,i)=>"<i class='ex-helix h"+(i+1)+"'></i>").join("");
    const chain=[model.protein,model.messenger,model.result];
    const stageView="<div class='ex-cell-canvas ex-stage-"+step+(state.cinemaPlaying?" is-playing":" is-paused")+"' aria-label='Schema cellulare animato'>"+
      "<div class='ex-extra-label'>SPAZIO EXTRACELLULARE</div><div class='ex-ligand' aria-hidden='true'><span class='ex-orbit-dot d1'></span><span class='ex-orbit-dot d2'></span><span class='ex-orbit-dot d3'></span><span class='ex-orbit-dot d4'></span></div>"+
      "<div class='ex-ligand-label'>"+esc(model.ligand)+"</div>"+
      "<div class='ex-membrane'><div class='ex-lipid-layer layer-top'></div><div class='ex-receptor'>"+helix+"</div><div class='ex-lipid-layer layer-bottom'></div></div>"+
      "<div class='ex-intra-label'>CITOPLASMA</div><div class='ex-protein-g'><span>"+esc(model.protein)+"</span></div>"+
      "<div class='ex-signal'><strong>"+esc(model.messenger)+"</strong></div>"+
      "<div class='ex-tissue'><strong>"+esc(model.result)+"</strong></div></div>";
    return "<a href='#/receptors/"+esc(state.cinemaTarget)+"' class='rx-back'>← Scheda recettore</a>"+tabs()+heading("eli MOLECULAR CINEMA","Dentro una cellula.","Dalla diffusione del ligando alla risposta del tessuto: una sequenza didattica tridimensionale stilizzata, con accesso alle strutture sperimentali quando identificate.",badge("Animazione illustrativa","warn"))+
      "<div class='ex-cinema-layout'><div class='ex-cinema-main'><section class='ex-card ex-visual-card'><div class='ex-visual-head'><div><span class='ex-kicker'>"+esc(model.organ)+"</span><h2>"+esc(model.name)+"</h2></div>"+"<span class='ex-badge accent ex-cinema-count'>"+(step+1)+" / "+stages.length+"</span>"+"</div><div class='ex-cinema-modes' role='group' aria-label='Modalità del cinema'><button type='button' data-elix='cinema-mode' data-mode='cell' "+(state.cinemaMode==="cell"?"aria-pressed='true'":"aria-pressed='false'")+">Cellula illustrata</button><button type='button' data-elix='cinema-mode' data-mode='3d' "+(state.cinemaMode==="3d"?"aria-pressed='true'":"aria-pressed='false'")+">Recettore 3D sperimentale</button></div>"+(state.cinemaMode==="cell"?stageView:"<iframe class='ex-cinema-atom-viewer' loading='lazy' src='https://molstar.org/viewer/?pdb="+encodeURIComponent(model.pdb)+"&amp;hide-controls=1' title='Struttura molecolare 3D "+esc(model.name)+"' allowfullscreen></iframe>")+
      "<div class='ex-cinema-controls'><button data-elix='cinema-back' "+(step===0?"disabled":"")+" aria-label='Passaggio precedente'>←</button><button class='ex-btn primary' data-elix='cinema-play' aria-pressed='"+state.cinemaPlaying+"' "+(state.cinemaMode==="3d"?"disabled aria-label='Disponibile nella vista cellulare'":"")+">"+(state.cinemaPlaying?"Pausa":"▶ Play")+"</button><button data-elix='cinema-next' "+(step===stages.length-1?"disabled":"")+" aria-label='Passaggio successivo'>→</button><button data-elix='cinema-reset' aria-label='Ricomincia'>↻</button><label>Velocità <select id='ex-speed'><option value='0.5' "+(state.cinemaSpeed===0.5?"selected":"")+">0,5×</option><option value='1' "+(state.cinemaSpeed===1?"selected":"")+">1×</option><option value='2' "+(state.cinemaSpeed===2?"selected":"")+">2×</option></select></label></div></section>"+
      "<section class='ex-card ex-cinema-narrative' aria-live='polite' aria-atomic='true'><h2>Passaggio "+(step+1)+" — "+esc(stage.name)+"</h2><p class='ex-large'>"+esc(stage.zone)+"</p><p class='ex-cinema-explanation'>"+esc(cinemaExplanations[step])+"</p></section></div>"+
      "<aside class='ex-cinema-side'><section class='ex-card'><h2>Recettore e scenario</h2><label class='ex-control'>Recettore<select id='ex-cinema-target'>"+Object.entries(cinemaModels).map(([id,x])=>"<option value='"+id+"' "+(id===state.cinemaTarget?"selected":"")+">"+esc(x.name)+"</option>").join("")+"</select></label><p>"+esc(model.note)+"</p>"+
      (model.structure?"<a class='ex-btn outline' href='"+esc(model.structure)+"' target='_blank' rel='noopener noreferrer'>Apri struttura sperimentale ↗</a><a class='ex-external' href='"+esc(model.viewer)+"' target='_blank' rel='noopener noreferrer'>Visualizzatore 3D RCSB ↗</a>":"<p class='ex-muted'>Struttura sperimentale specifica non collegata in questa demo.</p>")+"</section>"+
      "<section class='ex-card'><h2>Timeline del meccanismo</h2><div class='ex-stage-list'>"+stages.map((x,i)=>"<button data-elix='cinema-jump' data-index='"+i+"' class='"+(i===step?"current":i<step?"passed":"")+"'><span>"+String(i+1).padStart(2,"0")+"</span>"+esc(x.name)+"</button>").join("")+"</div></section>"+
      "<section class='ex-card'><h2>Approfondisci</h2><a class='ex-external' href='#/textbook/gpcr'>Teoria: GPCR e signaling →</a><a class='ex-external' href='#/receptors/"+esc(state.cinemaTarget)+"'>Scheda e bersagli verificati →</a><a class='ex-external' href='#/quiz'>Quiz molecolari →</a></section></aside></div>"+
      "<div class='ex-alert'>La cellula, il ligando in movimento e la deformazione del recettore sono illustrazioni didattiche originali. Le coordinate atomiche di una struttura PDB sono dati sperimentali separati. Non presentiamo l'animazione come traiettoria molecolare misurata.</div>";
  }

  const unique=(field)=>[...new Set(ELIX_QUESTIONS.map(q=>q[field]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"it"));
  function filteredQuestions(){
    return ELIX_QUESTIONS.filter(q=>
      (state.kind==="all"||q.kind===state.kind)&&
      (state.group==="all"||q.group===state.group)&&
      (state.drug==="all"||q.drug===state.drug)&&
      (state.maxDifficulty==="all"||q.difficulty<=Number(state.maxDifficulty)));
  }
  function shuffle(array) {
    for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}
    return array;
  }
  function quizFilters() {
    const sel=(id,label,value,items)=>"<label>"+esc(label)+"<select id='"+id+"'>"+items.map(([v,name])=>"<option value='"+esc(v)+"' "+(String(v)===value?"selected":"")+">"+esc(name)+"</option>").join("")+"</select></label>";
    return "<div class='ex-quiz-filters'>"+
      sel("ex-kind","Tipologia",state.kind,[["all","Teoria + casi + statistica"],["teoria","Teoria"],["clinico","Casi clinici sintetici"],["statistica","Biostatistica"]])+
      sel("ex-group","Area",state.group,[["all","Tutte le aree"],...unique("group").map(x=>[x,x])])+
      sel("ex-drug","Principio attivo",state.drug,[["all","Tutti i farmaci"],...unique("drug").map(x=>[x,x.charAt(0).toUpperCase()+x.slice(1)])])+
      sel("ex-max","Difficoltà massima",state.maxDifficulty,[["all","Tutti i livelli"],...[1,2,3,4,5].map(i=>[String(i),"Fino a "+i+" / 5"])])+sel("ex-size","Lunghezza sessione",state.quizSize,[["10","10 domande"],["20","20 domande"],["all","Tutto il mazzo"]])+"</div>";
  }
  function quiz() {
    const total=filteredQuestions().length,session=state.quiz;
    const intro=tabs()+heading("eli ACADEMY","Impara. Ragiona. Dimostra.","Quiz originali per teoria, casi clinici, molecola, classe e difficoltà. Le domande vengono mescolate senza ripetersi nella sessione.",badge(ELIX_QUESTIONS.length+" domande originali","accent"))+
      "<details class='ex-card ex-filter-card' "+(!session?"open":"")+"><summary>Configura il tuo allenamento</summary><p class='ex-muted'>Vuoi esercitarti sulle decisioni? <a href='#/cases' class='rx-primary'>Apri i casi clinici interattivi →</a></p>"+quizFilters()+"<div class='ex-filter-footer'><span class='ex-muted'>"+total+" quesiti compatibili con i filtri</span><button class='ex-btn primary' data-elix='quiz-start' "+(total===0?"disabled":"")+">Inizia nuovo mazzo →</button>"+(Object.keys(state.progress.wrong||{}).some(id=>filteredQuestions().some(q=>q.id===id))?"<button class='ex-btn' data-elix='quiz-errors'>Ripassa errori precedenti</button>":"")+"</div></details>";
    if(!session) return intro+"<div class='ex-stats ex-overview'><div><span>Risposte complessive</span><strong>"+state.progress.answered+"</strong></div><div><span>Corrette</span><strong>"+state.progress.correct+"</strong></div><div><span>Sessioni concluse</span><strong>"+state.progress.sessions+"</strong></div></div><div class='ex-next-card'><strong>Una risposta, una spiegazione.</strong><p>Ogni quiz collega il quesito al principio farmacologico, non solo alla soluzione. Le statistiche sono conservate localmente nel tuo browser.</p></div>";
    const count=session.deck.length;
    if(session.index>=count){
      const pct=count?Math.round(session.score/count*100):0;
      return intro+"<section class='ex-card ex-quiz-done'><span class='ex-kicker'>SESSIONE COMPLETATA</span><strong class='ex-big-number'>"+pct+"%</strong><h2>"+session.score+" risposte corrette su "+count+"</h2><p>Hai completato il mazzo senza ripetizioni. Cambia i filtri oppure ripeti con un nuovo ordine.</p><button class='ex-btn primary' data-elix='quiz-start'>Crea un nuovo mazzo →</button></section>";
    }
    const q=ELIX_QUESTIONS.find(x=>x.id===session.deck[session.index]);
    const chosen=session.selection,answerOrder=orderFor(session,q);
    const grade=chosen!==null?(chosen===q.correct?"Corretto":"Da approfondire"):"";
    return intro+"<section class='ex-card ex-question'><div class='ex-question-meta'><span>"+badge("Domanda "+(session.index+1)+" / "+count,"accent")+" "+badge(q.kind)+"</span>"+badge("Difficoltà "+q.difficulty+"/5")+"</div><div class='ex-progress'><span style='width:"+Math.round(session.index/count*100)+"%'></span></div>"+
      "<h2>"+esc(q.question)+"</h2><div class='ex-options'>"+answerOrder.map((i,displayIndex)=>"<button class='"+(chosen!==null?(i===q.correct?"correct":i===chosen?"incorrect":""):"")+"' data-elix='quiz-answer' data-index='"+i+"' "+(chosen!==null?"disabled":"")+"><span class='ex-choice'>"+String.fromCharCode(65+displayIndex)+"</span>"+esc(q.answers[i])+"</button>").join("")+"</div>"+
      (chosen!==null?"<div class='ex-feedback "+(chosen===q.correct?"correct":"incorrect")+"'><strong>"+grade+"</strong><p>"+esc(q.why)+"</p>"+(q.drug?"<a href='#/drug/"+encodeURIComponent(q.drug)+"'>Esplora il farmaco →</a>":"<a href='#/textbook'>Collega la teoria →</a>")+"</div><button class='ex-btn primary ex-next' data-elix='quiz-next'>"+(session.index===count-1?"Risultato finale":"Prossima domanda")+" →</button>":"")+"</section><p class='ex-disclaimer'>Casi interamente sintetici e semplificati. Non sono domande di esami ufficiali né indicazioni terapeutiche.</p>";
  }

  function route(p,id) {
    if(p==="textbook")return textbook(id);
    if(p==="dose")return dose();
    if(p==="evidence")return evidence();
    if(p==="cinema"){if(id&&!cinemaModels[id])return heading("eli","Scenario non disponibile","Questo bersaglio non ha ancora una sequenza animata verificata.")+"<a href='#/receptors'>Torna ai recettori →</a>";if(id&&cinemaModels[id]&&id!==state.cinemaTarget){stopCinema();state.cinemaTarget=id;state.cinemaStep=0;state.cinemaMode="cell";}return cinema();}
    if(p==="quiz"){if(id&&state.lastQuizFilterId!==id){state.lastQuizFilterId=id;state.group="all";state.kind="all";state.maxDifficulty="all";state.drug=ELIX_QUESTIONS.some(q=>q.drug===id)?id:"all";state.quiz=null;persistQuiz();}return quiz();}
    return null;
  }

  document.addEventListener("click",event=>{
    const el=event.target.closest("[data-elix]");if(!el)return;
    event.preventDefault();
    const a=el.dataset.elix;
    if(a==="chapter-jump"){const target=document.getElementById('part-'+el.dataset.index);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});return;}
    if(a==="quiz-errors"){const candidate=new Set(filteredQuestions().map(q=>q.id));const deck=shuffle(Object.keys(state.progress.wrong||{}).filter(id=>candidate.has(id)));if(!deck.length)return;launchQuiz(deck);return;}
    if(a==="quiz-start"){
      const deck=shuffle(filteredQuestions().map(q=>q.id));
      if(!deck.length)return;
      launchQuiz(deck);return;
    }
    if(a==="quiz-answer"){
      const s=state.quiz;if(!s||s.selection!==null||s.index>=s.deck.length)return;
      const q=ELIX_QUESTIONS.find(q=>q.id===s.deck[s.index]),choice=Number(el.dataset.index);
      if(!q||!Number.isInteger(choice)||choice<0||choice>=q.answers.length)return;
      s.selection=choice;
      const correct=choice===q.correct;if(correct){s.score++;delete state.progress.wrong[q.id];}
      state.progress.answered++;if(correct)state.progress.correct++;
      else state.progress.wrong[q.id]=(state.progress.wrong[q.id]||0)+1;
      store("elix-academy-progress",state.progress);persistQuiz();refresh();return;
    }
    if(a==="quiz-next"){
      const s=state.quiz;if(!s||s.selection===null)return;
      s.index++;s.selection=null;persistQuiz();
      if(s.index===s.deck.length){state.progress.sessions++;store("elix-academy-progress",state.progress);}
      refresh();return;
    }
    if(a==="cinema-mode"){stopCinema();state.cinemaMode=el.dataset.mode==="3d"?"3d":"cell";refresh();return;}
    if(a==="cinema-play"){if(state.cinemaMode==="3d")return;if(state.cinemaPlaying){stopCinema();updateCinema();}else playCinema();return;}
    if(a==="cinema-reset"){stopCinema();state.cinemaStep=0;updateCinema();return;}
    if(a==="cinema-next"||a==="cinema-back"||a==="cinema-jump"){
      stopCinema();
      const requested=Number(el.dataset.index);if(a==="cinema-jump"&&(!Number.isInteger(requested)||requested<0||requested>=stages.length))return;
      state.cinemaStep=a==="cinema-jump"?requested:Math.max(0,Math.min(stages.length-1,state.cinemaStep+(a==="cinema-next"?1:-1)));
      updateCinema();return;
    }
  });
  document.addEventListener("change",event=>{
    const el=event.target;
    if(el.id==="ex-volume"){state.volume=el.value;refresh();}
    if(el.id==="ex-clearance"){state.elimination=el.value;refresh();}
    if(el.id==="ex-control"||el.id==="ex-treated"){
      const value=Number(el.value);if(!Number.isFinite(value)||value<0||value>100)return;
      if(el.id==="ex-control")state.trialControl=value;else state.trialTreatment=value;refresh();
    }
    const key={"ex-kind":"kind","ex-group":"group","ex-drug":"drug","ex-max":"maxDifficulty"}[el.id];
    if(key){state[key]=el.value;state.quiz=null;persistQuiz();refresh();}
    if(el.id==="ex-size"){state.quizSize=["10","20","all"].includes(el.value)?el.value:"20";state.quiz=null;persistQuiz();refresh();}
    if(el.id==="ex-cinema-target"&&cinemaModels[el.value]){
      stopCinema();state.cinemaTarget=el.value;state.cinemaStep=0;state.cinemaMode="cell";location.hash="#/cinema/"+encodeURIComponent(el.value);refresh();
    }
    if(el.id==="ex-speed"){
      state.cinemaSpeed=Number(el.value);
      if(state.cinemaPlaying)playCinema();else updateCinema();
    }
  });
  document.addEventListener("input",event=>{
    if(event.target.id==="ex-book-search"){state.bookQuery=event.target.value;refresh();return;}
    if(event.target.id==="ex-dose"){
      state.dose=Math.max(0,Math.min(100,Number(event.target.value)));
      const label=document.getElementById("ex-dose-label");if(label)label.textContent=state.dose+"/100";
      const result=document.getElementById("ex-dose-results");if(result)result.innerHTML=doseResults();
      const graph=document.querySelector(".ex-graph");
      if(graph)graph.outerHTML=doseChart();
    }
  });
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&state.cinemaPlaying){stopCinema();updateCinema();}});
  window.addEventListener("hashchange",()=>{
    if(!location.hash.startsWith("#/cinema"))stopCinema();
  });
  return {route,search(query){const q=String(query||'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();if(!q)return [];return ELIX_CHAPTERS.filter(c=>[c.title,c.lead,...c.sections.map(x=>x.title)].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q)).slice(0,5).map(c=>({type:'Capitolo',name:c.title,sub:'Teoria · Volume '+c.volume,link:'#/textbook/'+c.id,ic:'books'}));},stats:()=>({chapters:ELIX_CHAPTERS.length,questions:ELIX_QUESTIONS.length,volumes:ELIX_VOLUMES.length})};
}
