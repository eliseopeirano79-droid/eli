/* ELIX curated secondary targets: mechanisms with source-independent original explanations. No invented PDB structures. */
export const ADDITIONAL_TARGETS={
  "ACE": {
    "id": "ACE",
    "name": "Enzima di conversione dell'angiotensina",
    "kind": "Enzima",
    "tissue": "Endotelio e altri tessuti",
    "signal": [
      "Angiotensina I",
      "ACE",
      "Angiotensina II",
      "AT₁",
      "Gq/11 · tono vasale"
    ],
    "mechanism": "ACE converte angiotensina I in angiotensina II e contribuisce alla degradazione di bradichinina. Gli ACE-inibitori agiscono a monte dei recettori AT₁, riducendo vasocostrizione e secrezione di aldosterone ma anche modificando i sistemi delle chinine.",
    "insight": "Tosse e angioedema possono essere collegati alla ridotta degradazione di bradichinina; iperkaliemia e cambiamenti di filtrazione dipendono invece dalla modulazione del RAAS.",
    "chapter": "ipertensione"
  },
  "ADRA1": {
    "id": "ADRA1",
    "name": "Recettori α₁-adrenergici (famiglia)",
    "kind": "GPCR · Gq/11",
    "tissue": "Muscolatura liscia vascolare e altri distretti",
    "signal": [
      "Catecolamina",
      "α₁ (famiglia)",
      "Gq/11",
      "PLCβ → IP₃/DAG",
      "Ca²⁺ ↑ · contrazione"
    ],
    "mechanism": "La famiglia α₁ comprende sottotipi α₁A, α₁B e α₁D. L'attivazione favorisce segnalazione Gq/11–PLCβ e contrazione nei tessuti sensibili. Un'annotazione generica ADRA1 non autorizza ad assegnare il legame a uno specifico sottotipo senza dati.",
    "insight": "La distribuzione dei sottotipi modifica effetti vascolari e altri effetti; per comparare selettività servono esperimenti sull'isoforma corretta.",
    "chapter": "beta-adrenergici"
  },
  "CACNA1C": {
    "id": "CACNA1C",
    "name": "CaV1.2 · canale del calcio L",
    "kind": "Canale ionico",
    "tissue": "Vasi, cuore e altri tessuti",
    "signal": [
      "Depolarizzazione",
      "CaV1.2 aperto",
      "Ca²⁺ entra",
      "Contrazione e conduzione",
      "Blocco farmacologico → Ca²⁺ ↓"
    ],
    "mechanism": "CACNA1C codifica la subunità α1C del canale del calcio L. Farmaci diidropiridinici e non diidropiridinici ne modulano la funzione con differenze di selettività tissutale e di effetti su conduzione nodale e muscolatura vascolare.",
    "insight": "Una molecola vasoselettiva come amlodipina non si comporta nello stesso modo di verapamil sul nodo AV.",
    "chapter": "canali-ionici"
  },
  "SLC12A1": {
    "id": "SLC12A1",
    "name": "NKCC2 · cotrasportatore Na⁺/K⁺/2Cl⁻",
    "kind": "Trasportatore renale",
    "tissue": "Ansa di Henle, tratto ascendente spesso",
    "signal": [
      "Lume tubulare",
      "NKCC2",
      "Riassorbimento NaCl",
      "Gradiente midollare",
      "Blocco → natriuresi"
    ],
    "mechanism": "NKCC2 contribuisce al riassorbimento di sodio, potassio e cloro nel tratto ascendente spesso dell'ansa, impermeabile all'acqua. L'inibizione farmacologica riduce il gradiente osmotico midollare e aumenta l'escrezione di elettroliti.",
    "insight": "La maggiore disponibilità distale di sodio contribuisce a perdite di potassio e possibile alcalosi con diuretici dell'ansa.",
    "chapter": "diuretici-elettroliti"
  },
  "SLC12A3": {
    "id": "SLC12A3",
    "name": "NCC · cotrasportatore Na⁺/Cl⁻",
    "kind": "Trasportatore renale",
    "tissue": "Tubulo contorto distale",
    "signal": [
      "NaCl luminale",
      "NCC",
      "Riassorbimento distale",
      "Blocco tiazidico",
      "Natriuresi"
    ],
    "mechanism": "NCC recupera sodio e cloro nel tubulo contorto distale. La sua inibizione con tiazidici modifica la consegna di sodio ai segmenti più distali, con possibili effetti sulla secrezione di potassio e sull'equilibrio elettrolitico.",
    "insight": "Non confondere NCC con NKCC2: cambiano segmento nefronico e profilo farmacologico.",
    "chapter": "diuretici-elettroliti"
  },
  "NR3C2": {
    "id": "NR3C2",
    "name": "MR · recettore mineralcorticoide",
    "kind": "Recettore nucleare",
    "tissue": "Nefrone distale, cuore, vasi",
    "signal": [
      "Aldosterone",
      "MR",
      "Trascrizione di proteine di trasporto",
      "Riassorbimento Na⁺",
      "Escrezione K⁺"
    ],
    "mechanism": "Il recettore mineralcorticoide è un regolatore trascrizionale attivato da ligandi steroidei. Nel nefrone contribuisce all'espressione di proteine che favoriscono riassorbimento di sodio e secrezione di potassio; sono documentati effetti extra-renali di rimodellamento.",
    "insight": "L'iperkaliemia con antagonisti MR non è un effetto inatteso: segue il loro meccanismo tubulare.",
    "chapter": "scompenso"
  },
  "HMGCR": {
    "id": "HMGCR",
    "name": "HMG-CoA reduttasi",
    "kind": "Enzima metabolico",
    "tissue": "Reticolo endoplasmatico, soprattutto epatociti",
    "signal": [
      "HMG-CoA",
      "HMGCR",
      "Mevalonato",
      "Colesterolo epatico",
      "Recettori LDL ↑ quando HMGCR è inibita"
    ],
    "mechanism": "HMGCR catalizza un passaggio limitante nella sintesi del mevalonato. La sua inibizione con statine riduce sintesi epatica di colesterolo e aumenta il riciclo delle LDL plasmatiche attraverso up-regulation di recettori LDL.",
    "insight": "Il beneficio lipidico non deriva da legame alle LDL nel sangue, ma da una risposta epatica al blocco biosintetico.",
    "chapter": "metabolismo-diabetico"
  },
  "PTGS1": {
    "id": "PTGS1",
    "name": "COX-1 · prostaglandina-endoperossido sintasi 1",
    "kind": "Enzima",
    "tissue": "Piastrine, mucose e altri tessuti",
    "signal": [
      "Acido arachidonico",
      "COX-1",
      "Prostanoidi",
      "TXA₂ piastrinico",
      "Aggregazione"
    ],
    "mechanism": "COX-1 è coinvolta nella biosintesi di prostanoidi. Nelle piastrine l'acetilazione irreversibile indotta da aspirina limita la produzione di trombossano A₂, spiegando un effetto antiaggregante persistente oltre l'emivita plasmatica.",
    "insight": "Gli stessi mediatori hanno funzioni protettive in mucose ed emodinamica renale: la selettività del bersaglio non elimina rischi d'organo.",
    "chapter": "antiaggreganti"
  },
  "P2RY12": {
    "id": "P2RY12",
    "name": "P2Y₁₂ · recettore dell'ADP piastrinico",
    "kind": "GPCR · Gi",
    "tissue": "Piastrine",
    "signal": [
      "ADP",
      "P2Y₁₂",
      "Gi",
      "cAMP ↓",
      "Attivazione piastrinica"
    ],
    "mechanism": "P2Y₁₂ è un GPCR Gi-dipendente che contribuisce all'attivazione piastrinica in risposta all'ADP. Il metabolita attivo del clopidogrel inibisce irreversibilmente questo recettore.",
    "insight": "L'emivita del metabolita attivo è breve ma la conseguenza piastrinica persiste fino al ricambio delle cellule interessate.",
    "chapter": "antiaggreganti"
  },
  "F10": {
    "id": "F10",
    "name": "Fattore X attivato · Xa",
    "kind": "Proteasi della coagulazione",
    "tissue": "Plasma e superfici fosfolipidiche",
    "signal": [
      "Fattore X",
      "Fattore Xa",
      "Complesso protrombinasi",
      "Trombina",
      "Fibrina"
    ],
    "mechanism": "Il fattore Xa partecipa, con cofattori appropriati, al complesso protrombinasi che converte protrombina in trombina. Anticoagulanti diretti anti-Xa e farmaci mediati dall'antitrombina possono ridurne l'attività con meccanismi differenti.",
    "insight": "Eparina, fondaparinux e apixaban convergono su Xa ma non sono farmacologicamente equivalenti.",
    "chapter": "anticoagulanti"
  },
  "VKORC1": {
    "id": "VKORC1",
    "name": "Vitamina K epossido reduttasi",
    "kind": "Enzima",
    "tissue": "Fegato e altri tessuti",
    "signal": [
      "Vitamina K ossidata",
      "VKORC1",
      "Vitamina K ridotta",
      "γ-carbossilazione",
      "Fattori II, VII, IX e X"
    ],
    "mechanism": "VKORC1 rigenera forme ridotte della vitamina K necessarie alla maturazione di diversi fattori della coagulazione. Warfarin ne riduce l'attività, ma l'effetto anticoagulante richiede il ricambio dei fattori già presenti.",
    "insight": "INR riflette modifiche dell'emostasi e non equivale direttamente alla concentrazione plasmatica di warfarin.",
    "chapter": "anticoagulanti"
  },
  "ATP1A1": {
    "id": "ATP1A1",
    "name": "Na⁺/K⁺-ATPasi α1",
    "kind": "Pompa ionica",
    "tissue": "Molti tessuti, incluso muscolo cardiaco",
    "signal": [
      "Na⁺/K⁺-ATPasi",
      "Gradiente Na⁺",
      "Scambiatore Na⁺/Ca²⁺",
      "Ca²⁺ intracellulare",
      "Contrattilità"
    ],
    "mechanism": "La pompa Na⁺/K⁺ mantiene gradienti elettrochimici cellulari. L'inibizione da parte di glicosidi cardiaci può modificare il funzionamento dello scambiatore Na⁺/Ca²⁺ e aumentare calcio disponibile per la contrazione.",
    "insight": "L'ipokaliemia può aumentare suscettibilità agli effetti tossici della digossina: il rischio nasce da interazioni fra trasporto ionico e farmaco.",
    "chapter": "scompenso"
  },
  "KCNH2": {
    "id": "KCNH2",
    "name": "hERG · canale potassio Kv11.1",
    "kind": "Canale ionico",
    "tissue": "Cardiomiociti e altri tessuti",
    "signal": [
      "Depolarizzazione",
      "IKr (hERG)",
      "Ripolarizzazione",
      "Durata potenziale d'azione",
      "QT"
    ],
    "mechanism": "KCNH2 codifica il canale responsabile di una componente importante della corrente IKr. La sua inibizione può prolungare la ripolarizzazione e, in situazioni predisponenti, favorire aritmie specifiche.",
    "insight": "Non si può descrivere un antiaritmico soltanto in base alla riduzione di una corrente: alcuni blocchi ionici sono anche proaritmici.",
    "chapter": "antiaritmici"
  },
  "SCN5A": {
    "id": "SCN5A",
    "name": "NaV1.5 · canale sodio cardiaco",
    "kind": "Canale ionico",
    "tissue": "Miocardio atriale, ventricolare e sistema di conduzione",
    "signal": [
      "Soglia elettrica",
      "NaV1.5",
      "INa rapida",
      "Fase 0 miocardica",
      "Velocità conduzione"
    ],
    "mechanism": "SCN5A codifica la subunità principale di NaV1.5, responsabile di una componente della rapida depolarizzazione nei miociti a risposta veloce. Alcuni antiaritmici modificano l'attività del canale con dipendenza dallo stato.",
    "insight": "Canali del sodio e canali del calcio sostengono fasi differenti del potenziale d'azione secondo tipo di tessuto cardiaco.",
    "chapter": "canali-ionici"
  },
  "GUCY1A1": {
    "id": "GUCY1A1",
    "name": "Guanilato ciclasi solubile · subunità α1",
    "kind": "Enzima di segnalazione",
    "tissue": "Muscolatura liscia vascolare e altri tessuti",
    "signal": [
      "NO",
      "Guanilato ciclasi solubile",
      "cGMP ↑",
      "PKG",
      "Rilassamento"
    ],
    "mechanism": "La guanilato ciclasi solubile risponde a ossido nitrico e sintetizza cGMP, che promuove risposte di rilassamento nella muscolatura liscia. I nitrati organici influenzano questa via attraverso il segnale NO.",
    "insight": "Inibitori PDE5 riducono la degradazione di cGMP: con nitrati possono amplificare pericolosamente la vasodilatazione.",
    "chapter": "ipertensione"
  },
  "HCN4": {
    "id": "HCN4",
    "name": "HCN4 · canale pacemaker",
    "kind": "Canale ionico",
    "tissue": "Nodo senoatriale",
    "signal": [
      "Iperpolarizzazione",
      "HCN4 · corrente If",
      "Depolarizzazione diastolica",
      "Soglia",
      "Frequenza sinusale"
    ],
    "mechanism": "HCN4 contribuisce alla corrente If coinvolta nella depolarizzazione spontanea del nodo sinusale. Ivabradina ne modifica l'attività, differenziandosi dai farmaci che antagonizzano direttamente i recettori β.",
    "insight": "Un farmaco che rallenta il nodo senoatriale non controlla necessariamente la frequenza ventricolare nella fibrillazione atriale.",
    "chapter": "antiaritmici"
  },
  "SLC5A2": {
    "id": "SLC5A2",
    "name": "SGLT2 · cotrasportatore sodio-glucosio",
    "kind": "Trasportatore renale",
    "tissue": "Tubulo prossimale",
    "signal": [
      "Filtrato glomerulare",
      "SGLT2",
      "Riassorbimento glucosio/Na⁺",
      "Inibizione",
      "Glucosuria e natriuresi"
    ],
    "mechanism": "SGLT2 recupera glucosio e sodio nel tubulo prossimale. Gli inibitori riducono questo processo, modificando anche segnali emodinamici renali che contribuiscono agli effetti cardiometabolici documentati.",
    "insight": "DAPA-CKD ed EMPA-KIDNEY collegano un trasportatore tubulare a esiti clinici renali in popolazioni selezionate, anche senza diabete.",
    "chapter": "metabolismo-diabetico"
  }
};
