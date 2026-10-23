import {EXPANDED_CHAPTERS} from './elix-expanded-chapters.js';
import {EXPANDED_QUESTIONS} from './elix-expanded-questions.js';
import {CHAPTERS_09} from './elix-09-content.js';
/* ELIX · Contenuti didattici originali Alpha 0.5. Revisione specialistica ancora da completare. */

export const ELIX_VOLUMES = [
  {
    "id": 1,
    "title": "Fondamenti e scoperta dei farmaci"
  },
  {
    "id": 2,
    "title": "Farmacodinamica e teoria dei recettori"
  },
  {
    "id": 3,
    "title": "Farmacocinetica e modelli ADME"
  },
  {
    "id": 4,
    "title": "Bersagli molecolari e vie di segnalazione"
  },
  {
    "id": 5,
    "title": "Farmacologia del sistema nervoso autonomo"
  },
  {
    "id": 6,
    "title": "Farmaci cardiovascolari"
  },
  {
    "id": 7,
    "title": "Rene, emostasi e sangue"
  },
  {
    "id": 8,
    "title": "Sistema nervoso centrale e anestesia"
  },
  {
    "id": 9,
    "title": "Analgesia, infiammazione e immunologia"
  },
  {
    "id": 10,
    "title": "Endocrinologia e metabolismo"
  },
  {
    "id": 11,
    "title": "Farmacologia respiratoria e gastrointestinale"
  },
  {
    "id": 12,
    "title": "Antibatterici e resistenze"
  },
  {
    "id": 13,
    "title": "Antivirali, antifungini e antiparassitari"
  },
  {
    "id": 14,
    "title": "Oncologia e terapie bersaglio"
  },
  {
    "id": 15,
    "title": "Biotecnologie e terapie avanzate"
  },
  {
    "id": 16,
    "title": "Farmacologia degli apparati e specialità"
  },
  {
    "id": 17,
    "title": "Farmacologia clinica e popolazioni speciali"
  },
  {
    "id": 18,
    "title": "Tossicologia, farmacovigilanza, sperimentazione e farmacoeconomia"
  }
];

const BASE_CHAPTERS = [
  {
    "id": "identita-del-farmaco",
    "volume": 1,
    "title": "Che cos'è un farmaco?",
    "lead": "Dalla molecola al medicinale autorizzato.",
    "sections": [
      {
        "title": "Un sistema di identità, non un semplice nome",
        "text": "Principio attivo, sale, stereoisomero, molecola madre, medicinale, formulazione e confezione sono entità distinte. Un farmaco può avere più forme chimiche e numerosi prodotti con differenti indicazioni, vie di somministrazione e condizioni di fornitura. Le strutture e gli identificativi molecolari servono a stabilire quali record possono essere collegati senza confondere sinonimi e sostanze affini."
      },
      {
        "title": "Origine e tappe storiche",
        "text": "La storia di un farmaco comprende la prima sintesi o identificazione, la scoperta dell'attività biologica, l'ottimizzazione della molecola, le prime prove nell'uomo e le successive autorizzazioni. Sono date diverse. Anche un farmaco ritirato resta un oggetto di studio farmacologico, ma il suo stato commerciale non può essere ricavato dalla sola presenza in un database."
      },
      {
        "title": "Dalla scoperta al paziente",
        "text": "La caratterizzazione preclinica descrive bersagli, attività e potenziali tossicità. Gli studi clinici valutano sicurezza ed efficacia in popolazioni definite. L'autorizzazione si riferisce a prodotti e indicazioni specifici, mentre la farmacovigilanza prosegue dopo l'immissione sul mercato."
      }
    ]
  },
  {
    "id": "recettori-e-legame",
    "volume": 2,
    "title": "Recettori, affinità ed efficacia",
    "lead": "Capire i numeri che descrivono il legame.",
    "sections": [
      {
        "title": "Affinità non equivale a effetto",
        "text": "Kd descrive, in un sistema di legame appropriato, la concentrazione associata a metà occupazione all'equilibrio. Ki è una costante di inibizione ricavata secondo uno specifico modello sperimentale. EC50 indica la concentrazione che produce metà dell'effetto massimo nel saggio considerato: non misura direttamente l'affinità, perché dipende anche dall'accoppiamento del recettore e dalla riserva recettoriale."
      },
      {
        "title": "Potenza ed efficacia intrinseca",
        "text": "Un agonista può essere molto potente ma avere un effetto massimo inferiore a quello di un altro agonista. La potenza riguarda la concentrazione necessaria, l'efficacia l'ampiezza della risposta raggiungibile nello specifico sistema. Confrontare EC50 ottenute su tessuti diversi senza contesto è metodologicamente scorretto."
      },
      {
        "title": "Antagonismo competitivo",
        "text": "Un antagonista competitivo reversibile può spostare verso destra la curva concentrazione-risposta dell'agonista, senza ridurre necessariamente l'Emax se si possono raggiungere concentrazioni sufficienti di agonista. Antagonismo irreversibile e allosterico possono invece modificare l'Emax, secondo il sistema e la riserva recettoriale."
      }
    ]
  },
  {
    "id": "dose-risposta",
    "volume": 2,
    "title": "Dose, concentrazione e risposta",
    "lead": "Interpretare curve e finestre terapeutiche.",
    "sections": [
      {
        "title": "Tre scale da non confondere",
        "text": "La dose somministrata non coincide con la concentrazione nel sito d'azione, che non coincide con l'effetto osservato. Assorbimento, distribuzione, metabolismo ed eliminazione determinano l'esposizione; recettori, vie intracellulari e meccanismi di feedback determinano la risposta."
      },
      {
        "title": "Curve graduali e quantali",
        "text": "Una curva graduata descrive una risposta continua, per esempio la percentuale di un massimo misurato. Una curva quantale descrive la proporzione di soggetti che raggiungono un endpoint definito. Gli effetti terapeutici e quelli tossici possono avere curve differenti e sovrapposte."
      },
      {
        "title": "Perché uno slider non basta per prescrivere",
        "text": "Un modello Emax adimensionale può aiutare a comprendere saturazione, variabilità e aumento dell'esposizione. Non produce una posologia clinica. In ELIX le quantità arbitrarie devono essere sempre separate dai dosaggi del RCP e dalle stime realmente ottenute da studi."
      }
    ]
  },
  {
    "id": "modelli-pk",
    "volume": 3,
    "title": "ADME e farmacocinetica quantitativa",
    "lead": "Concentrazione, clearance, volume ed emivita.",
    "sections": [
      {
        "title": "Biodisponibilità e distribuzione",
        "text": "La biodisponibilità F rappresenta la frazione di dose che raggiunge la circolazione sistemica immodificata. Il volume apparente di distribuzione Vd mette in relazione quantità nell'organismo e concentrazione plasmatica; non corrisponde necessariamente a un volume anatomico."
      },
      {
        "title": "Clearance ed emivita",
        "text": "La clearance rappresenta l'efficienza complessiva di eliminazione rispetto alla concentrazione. In un modello lineare monocompartimentale t½ = 0,693 × Vd / CL. Questa relazione non si applica senza verifica a cinetiche non lineari o multicompartimentali."
      },
      {
        "title": "Accumulo e steady state",
        "text": "Con somministrazioni ripetute e cinetica lineare la concentrazione media si avvicina allo stato stazionario nell'arco di circa quattro-cinque emivite. La concentrazione di picco e quella minima dipendono anche dall'intervallo, dalla via e dalla formulazione."
      }
    ]
  },
  {
    "id": "gpcr",
    "volume": 4,
    "title": "GPCR e segnali intracellulari",
    "lead": "Dal legame al cambiamento fisiologico.",
    "sections": [
      {
        "title": "Un recettore dinamico",
        "text": "I recettori accoppiati a proteine G attraversano stati conformazionali differenti. Il legame di un ligando può modificare la probabilità di queste conformazioni, favorendo l'interazione con specifiche proteine G o altri effettori. Le strutture statiche sperimentali descrivono stati osservati: una loro interpolazione grafica non è una simulazione atomistica del moto."
      },
      {
        "title": "Gs, Gi/o e Gq/11",
        "text": "Gs stimola tipicamente l'adenilato ciclasi e aumenta cAMP. Gi/o può attenuare la produzione di cAMP e regolare canali tramite subunità βγ. Gq/11 attiva PLCβ, con formazione di IP₃ e DAG, aumento della segnalazione del calcio e attivazione di PKC."
      },
      {
        "title": "Amplificazione e arresto del segnale",
        "text": "Secondi messaggeri e chinasi amplificano lo stimolo, ma fosfodiesterasi, fosfatasi, desensibilizzazione, internalizzazione e feedback limitano la risposta. Recettori e vie non sono interruttori binari: contano tessuto, tempo, distribuzione e regolazione."
      }
    ]
  },
  {
    "id": "beta-adrenergici",
    "volume": 5,
    "title": "Farmaci β-adrenergici e selettività",
    "lead": "Quando lo stesso recettore cambia significato tra tessuti.",
    "sections": [
      {
        "title": "β1 nel cuore e β2 nei bronchi",
        "text": "β1 favorisce la risposta cardiaca alle catecolamine attraverso Gs–cAMP–PKA. β2 nella muscolatura liscia bronchiale sostiene meccanismi di rilassamento. La selettività di un beta-bloccante non è assoluta e può ridursi aumentando l'esposizione."
      },
      {
        "title": "Antagonista e agonista nello stesso atlante",
        "text": "Bisoprololo e metoprololo sono esempi di antagonisti relativamente β1-selettivi; propranololo è non selettivo. Salbutamolo agisce come agonista β2. Il confronto di meccanismi permette di comprendere perché il blocco β2 possa essere problematico in alcuni pazienti con malattia broncospastica."
      },
      {
        "title": "Tessuto e decisione clinica",
        "text": "La stessa interazione molecolare può portare a benefici o effetti indesiderati differenti secondo organo, dose, comorbilità e trattamenti concomitanti. Le indicazioni e controindicazioni autorizzate richiedono verifica nella scheda del prodotto specifico."
      }
    ]
  },
  {
    "id": "trasportatori-renali",
    "volume": 7,
    "title": "Nefrone come bersaglio farmacologico",
    "lead": "Dove agiscono i diuretici e perché cambiano gli elettroliti.",
    "sections": [
      {
        "title": "Ansa ascendente spessa",
        "text": "Il cotrasportatore NKCC2 (SLC12A1) viene inibito dai diuretici dell'ansa, come furosemide. La riduzione del riassorbimento di NaCl modifica il gradiente midollare e aumenta l'escrezione di acqua ed elettroliti."
      },
      {
        "title": "Tubulo distale e recettore mineralcorticoide",
        "text": "I tiazidici inibiscono NCC (SLC12A3). Gli antagonisti del recettore mineralcorticoide contrastano gli effetti dell'aldosterone nel nefrone distale; l'alterazione della secrezione di potassio spiega il rischio di iperkaliemia."
      },
      {
        "title": "Farmaco e funzione renale",
        "text": "La filtrazione, la secrezione tubulare e la possibilità del farmaco di raggiungere il sito d'azione possono variare nelle nefropatie. Non si possono inferire aggiustamenti di dose da una singola curva generalizzata."
      }
    ]
  },
  {
    "id": "interpretare-trial",
    "volume": 18,
    "title": "Da un trial al NNT",
    "lead": "Misurare beneficio e danno senza perdere il contesto.",
    "sections": [
      {
        "title": "Misure relative e assolute",
        "text": "Per un evento indesiderato l'ARR è la differenza tra rischio nel controllo e rischio nei trattati. La RRR rapporta la riduzione al rischio del controllo. Un rischio relativo può apparire notevole anche quando la differenza assoluta è piccola."
      },
      {
        "title": "NNT e NNH",
        "text": "Quando ARR è positiva, NNT = 1/ARR (rischi in frazioni, arrotondando per eccesso il numero di persone). Quando il trattamento aumenta un evento avverso, l'analogo NNH si calcola dalla differenza assoluta del rischio di danno. Endpoint, popolazione, comparatore e orizzonte temporale devono sempre accompagnare entrambi."
      },
      {
        "title": "Cosa non dice il p-value",
        "text": "La significatività statistica non equivale a importanza clinica. Intervalli di confidenza, rischio di bias, selezione dei pazienti e trasferibilità dei risultati contribuiscono all'interpretazione."
      }
    ]
  },
  {
    "id": "biotecnologici",
    "volume": 15,
    "title": "Biotecnologici e terapie avanzate",
    "lead": "Perché la classificazione deve avere più dimensioni.",
    "sections": [
      {
        "title": "Classi diverse che si sovrappongono",
        "text": "Anticorpo monoclonale descrive un tipo di molecola, farmaco ricombinante un metodo produttivo. Antineoplastico descrive l'uso terapeutico, antagonista recettoriale un meccanismo. Una stessa terapia può appartenere a più categorie contemporaneamente."
      },
      {
        "title": "Anticorpi, ADC e immunoterapia",
        "text": "Gli anticorpi possono bloccare ligandi o recettori, reclutare effettori immunitari o trasportare un payload citotossico quando coniugati. Nel valutare un ADC è essenziale distinguere anticorpo, linker, farmaco citotossico e bersaglio tumorale."
      },
      {
        "title": "Oligonucleotidi e analoghi dei nucleosidi",
        "text": "Gli oligonucleotidi terapeutici modulano RNA o geni mediante meccanismi specifici. Gli analoghi nucleosidici e nucleotidici possono interferire con polimerasi o altri enzimi dopo passaggi di attivazione; struttura e indicazione non bastano a predire uno stesso meccanismo per tutti."
      }
    ]
  },
  {
    "id": "sicurezza-farmaco",
    "volume": 17,
    "title": "Interazioni, tossicità e farmacovigilanza",
    "lead": "Riconoscere il rischio senza inventare causalità.",
    "sections": [
      {
        "title": "Interazioni farmacocinetiche e farmacodinamiche",
        "text": "Inibitori e induttori degli enzimi metabolici, trasportatori e variazioni del legame proteico possono alterare l'esposizione. Le interazioni farmacodinamiche possono invece sommare o opporre effetti, anche senza modificare le concentrazioni plasmatiche."
      },
      {
        "title": "Segnale non è incidenza",
        "text": "I database di segnalazioni spontanee aiutano a individuare sospetti di reazioni avverse, ma non permettono normalmente di calcolare la frequenza degli eventi o attribuire un nesso causale. Servono denominatori appropriati, studi e valutazioni ulteriori."
      },
      {
        "title": "Popolazioni speciali",
        "text": "Funzione renale ed epatica, età, gravidanza, genetica, composizione corporea e stato di malattia possono cambiare PK e PD. Le regole posologiche effettive rimangono specifiche di principio attivo, indicazione e prodotto."
      }
    ]
  }
];

const BASE_QUESTIONS = [
  {
    "id": "q01",
    "kind": "teoria",
    "group": "Generale",
    "drug": "",
    "difficulty": 1,
    "question": "Che cosa misura primariamente Kd in un modello di legame appropriato?",
    "answers": [
      "La concentrazione associata a metà occupazione recettoriale all'equilibrio",
      "La dose massima autorizzata",
      "Il tempo di eliminazione",
      "Il rischio assoluto"
    ],
    "correct": 0,
    "why": "Kd descrive l'equilibrio di legame, non la dose terapeutica o l'esito clinico."
  },
  {
    "id": "q02",
    "kind": "teoria",
    "group": "Generale",
    "drug": "",
    "difficulty": 2,
    "question": "EC50 e Kd sono sempre numericamente identici?",
    "answers": [
      "Sì, per definizione",
      "Solo se il farmaco è somministrato per via orale",
      "No: l'EC50 dipende anche da amplificazione e sistema sperimentale",
      "Solo negli antagonisti irreversibili"
    ],
    "correct": 2,
    "why": "EC50 quantifica metà dell'effetto massimo nel saggio; Kd riguarda il legame all'equilibrio."
  },
  {
    "id": "q03",
    "kind": "teoria",
    "group": "Generale",
    "drug": "",
    "difficulty": 2,
    "question": "Un agonista parziale rispetto a un agonista pieno nello stesso sistema:",
    "answers": [
      "Raggiunge sempre un Emax superiore",
      "Può presentare Emax inferiore anche a occupazione elevata",
      "È necessariamente un antagonista irreversibile",
      "Non lega recettori"
    ],
    "correct": 1,
    "why": "L'efficacia intrinseca può essere minore nonostante un'alta occupazione."
  },
  {
    "id": "q04",
    "kind": "teoria",
    "group": "Generale",
    "drug": "",
    "difficulty": 3,
    "question": "Che effetto ideale ha un antagonista competitivo reversibile su una curva concentrazione-risposta?",
    "answers": [
      "Spostamento a destra senza riduzione obbligata dell'Emax",
      "Annulla sempre l'Emax",
      "Sposta a sinistra",
      "Aumenta sempre l'affinità dell'agonista"
    ],
    "correct": 0,
    "why": "Nel modello classico la curva si sposta a destra ed Emax può essere recuperato con sufficiente agonista."
  },
  {
    "id": "q05",
    "kind": "teoria",
    "group": "Generale",
    "drug": "",
    "difficulty": 4,
    "question": "Perché l'inibizione irreversibile può ridurre l'Emax?",
    "answers": [
      "Aumenta il volume plasmatico",
      "Riduce recettori funzionali e può esaurire la riserva recettoriale",
      "Attiva sempre Gs",
      "Aumenta la biodisponibilità"
    ],
    "correct": 1,
    "why": "Quando la riserva recettoriale è insufficiente, meno recettori disponibili possono limitare la massima risposta."
  },
  {
    "id": "q06",
    "kind": "teoria",
    "group": "Molecolare",
    "drug": "salbutamolo",
    "difficulty": 1,
    "question": "Quale proteina G si associa frequentemente al recettore β2-adrenergico?",
    "answers": [
      "Gs",
      "Gq",
      "G12",
      "Una polimerasi virale"
    ],
    "correct": 0,
    "why": "La via canonica β2 → Gs → adenilato ciclasi aumenta cAMP."
  },
  {
    "id": "q07",
    "kind": "teoria",
    "group": "Molecolare",
    "drug": "salbutamolo",
    "difficulty": 2,
    "question": "Gs stimola direttamente quale effettore canonico?",
    "answers": [
      "Adenilato ciclasi",
      "DNA polimerasi",
      "NKCC2",
      "VKORC1"
    ],
    "correct": 0,
    "why": "La stimolazione dell'adenilato ciclasi aumenta la sintesi di cAMP."
  },
  {
    "id": "q08",
    "kind": "teoria",
    "group": "Molecolare",
    "drug": "",
    "difficulty": 3,
    "question": "La via Gq/11 attiva principalmente:",
    "answers": [
      "PLCβ con IP3 e DAG",
      "VKORC1",
      "La pompa Na/K",
      "Solo la guanilato ciclasi solubile"
    ],
    "correct": 0,
    "why": "PLCβ produce IP3 e DAG da PIP2 e può aumentare il segnale del calcio e di PKC."
  },
  {
    "id": "q09",
    "kind": "teoria",
    "group": "Farmacocinetica",
    "drug": "",
    "difficulty": 1,
    "question": "La biodisponibilità orale F indica:",
    "answers": [
      "Frazione della dose che raggiunge immodificata la circolazione sistemica",
      "Quota di dose escreta nelle feci",
      "Solo concentrazione libera",
      "Durata del trattamento"
    ],
    "correct": 0,
    "why": "F include i fattori che determinano quanta sostanza attiva immodificata entra nella circolazione sistemica."
  },
  {
    "id": "q10",
    "kind": "teoria",
    "group": "Farmacocinetica",
    "drug": "",
    "difficulty": 2,
    "question": "In un modello lineare monocompartimentale, t½ è proporzionale a:",
    "answers": [
      "Clearance / Vd",
      "Vd / clearance",
      "Dose / AUC per definizione",
      "Numero di compresse"
    ],
    "correct": 1,
    "why": "In questo modello t½ = 0,693 × Vd / CL."
  },
  {
    "id": "q11",
    "kind": "teoria",
    "group": "Farmacocinetica",
    "drug": "",
    "difficulty": 3,
    "question": "Con cinetica lineare, lo steady state si avvicina tipicamente dopo:",
    "answers": [
      "Una sola somministrazione in tutti i casi",
      "Circa 4–5 emivite",
      "Esattamente 30 giorni",
      "Una unità di volume"
    ],
    "correct": 1,
    "why": "Il tempo dipende soprattutto dall'emivita del sistema e dalle assunzioni del modello."
  },
  {
    "id": "q12",
    "kind": "teoria",
    "group": "Farmacocinetica",
    "drug": "",
    "difficulty": 3,
    "question": "AUC in farmacocinetica indica:",
    "answers": [
      "Esposizione sistemica integrata nel tempo",
      "Massima affinità recettoriale",
      "Numero di eventi clinici",
      "Percentuale di agonisti parziali"
    ],
    "correct": 0,
    "why": "L'area sotto la curva concentrazione-tempo misura l'esposizione nell'intervallo specificato."
  },
  {
    "id": "q13",
    "kind": "teoria",
    "group": "Cardiovascolare",
    "drug": "bisoprololo",
    "difficulty": 2,
    "question": "La selettività β1 di bisoprololo è:",
    "answers": [
      "Assoluta a qualunque esposizione",
      "Preferenziale, non assoluta",
      "Inesistente perché è un agonista β2",
      "Una proprietà del sistema renina-angiotensina"
    ],
    "correct": 1,
    "why": "La selettività relativa cambia con concentrazione e contesto."
  },
  {
    "id": "q14",
    "kind": "clinico",
    "group": "Respiratorio",
    "drug": "propranololo",
    "difficulty": 3,
    "question": "Caso sintetico: paziente con asma. Quale farmaco merita speciale cautela per il blocco β2?",
    "answers": [
      "Propranololo",
      "Amlodipina",
      "Losartan",
      "Atorvastatina"
    ],
    "correct": 0,
    "why": "Propranololo antagonizza β1 e β2 e può aggravare il broncospasmo nei soggetti suscettibili."
  },
  {
    "id": "q15",
    "kind": "teoria",
    "group": "Cardiovascolare",
    "drug": "nebivololo",
    "difficulty": 3,
    "question": "Quale caratteristica aggiuntiva viene associata a nebivololo?",
    "answers": [
      "Modulazione della vasodilatazione mediata da NO",
      "Inibizione diretta di Xa",
      "Antagonismo di P2Y12",
      "Blocco irreversibile di COX1"
    ],
    "correct": 0,
    "why": "Nebivololo presenta proprietà vasodilatatrici correlate alla via dell'ossido nitrico."
  },
  {
    "id": "q16",
    "kind": "teoria",
    "group": "Cardiovascolare",
    "drug": "ramipril",
    "difficulty": 2,
    "question": "Perché un ACE-inibitore può causare tosse secca?",
    "answers": [
      "Ridotta degradazione della bradichinina",
      "Inibizione della pompa protonica",
      "Deplezione diretta del glucosio",
      "Antagonismo recettore H1"
    ],
    "correct": 0,
    "why": "L'inibizione dell'ACE può aumentare bradichinina e altri mediatori coinvolti nella tosse."
  },
  {
    "id": "q17",
    "kind": "clinico",
    "group": "Cardiovascolare",
    "drug": "losartan",
    "difficulty": 3,
    "question": "Scenario didattico: ACE-inibitore e sartano. Quale rischio condiviso va considerato?",
    "answers": [
      "Iperkaliemia",
      "Ipocalcemia obbligatoria",
      "Ototossicità dose-indipendente",
      "Ipoglicemia immediata"
    ],
    "correct": 0,
    "why": "Entrambi riducono la segnalazione del sistema renina-angiotensina e possono favorire iperkaliemia."
  },
  {
    "id": "q18",
    "kind": "teoria",
    "group": "Cardiovascolare",
    "drug": "verapamil",
    "difficulty": 2,
    "question": "Rispetto ad amlodipina, verapamil ha tipicamente:",
    "answers": [
      "Effetti nodali AV più marcati",
      "Assenza totale di effetti cardiaci",
      "Inibizione specifica di NKCC2",
      "Agonismo β2"
    ],
    "correct": 0,
    "why": "Verapamil è un calcio-antagonista non diidropiridinico che rallenta la conduzione nodale."
  },
  {
    "id": "q19",
    "kind": "teoria",
    "group": "Cardiovascolare",
    "drug": "ivabradina",
    "difficulty": 2,
    "question": "Ivabradina modula prevalentemente:",
    "answers": [
      "Corrente If del nodo senoatriale",
      "Fattore Xa",
      "Recettore AT1",
      "Trasportatore SGLT2"
    ],
    "correct": 0,
    "why": "La corrente pacemaker If contribuisce all'automatismo del nodo senoatriale."
  },
  {
    "id": "q20",
    "kind": "teoria",
    "group": "Rene",
    "drug": "furosemide",
    "difficulty": 1,
    "question": "Quale trasportatore è bersaglio della furosemide?",
    "answers": [
      "NKCC2 nell'ansa ascendente spessa",
      "NCC nel tubulo distale",
      "SGLT1 intestinale",
      "P2Y12 piastrinico"
    ],
    "correct": 0,
    "why": "I diuretici dell'ansa inibiscono NKCC2 (SLC12A1)."
  },
  {
    "id": "q21",
    "kind": "teoria",
    "group": "Rene",
    "drug": "idroclorotiazide",
    "difficulty": 2,
    "question": "I tiazidici agiscono sul cotrasportatore:",
    "answers": [
      "NCC (NaCl) nel tubulo distale",
      "NKCC2 nell'ansa",
      "Na/K ATPasi cardiaca",
      "ATP sintasi mitocondriale"
    ],
    "correct": 0,
    "why": "NCC è il bersaglio classico del gruppo tiazidico."
  },
  {
    "id": "q22",
    "kind": "clinico",
    "group": "Rene",
    "drug": "spironolattone",
    "difficulty": 3,
    "question": "Caso sintetico: K 5,8 mmol/L, funzione renale ridotta e ACE-inibitore. Quale aggiunta richiede particolare rivalutazione?",
    "answers": [
      "Spironolattone",
      "Amlodipina",
      "Furosemide",
      "Salbutamolo"
    ],
    "correct": 0,
    "why": "Lo spironolattone riduce l'eliminazione del potassio e può accentuare una iperkaliemia."
  },
  {
    "id": "q23",
    "kind": "teoria",
    "group": "Rene",
    "drug": "dapagliflozin",
    "difficulty": 2,
    "question": "Dapagliflozin inibisce:",
    "answers": [
      "SGLT2 nel tubulo prossimale",
      "NCC nel tubulo distale",
      "Recettore β1",
      "COX-1 piastrinica"
    ],
    "correct": 0,
    "why": "Il bersaglio è il cotrasportatore sodio-glucosio SGLT2 nel tubulo prossimale."
  },
  {
    "id": "q24",
    "kind": "teoria",
    "group": "Emostasi",
    "drug": "apixaban",
    "difficulty": 1,
    "question": "Qual è il bersaglio dell'apixaban?",
    "answers": [
      "Fattore Xa",
      "VKORC1",
      "P2Y12",
      "COX-2"
    ],
    "correct": 0,
    "why": "Apixaban inibisce direttamente il fattore Xa."
  },
  {
    "id": "q25",
    "kind": "clinico",
    "group": "Emostasi",
    "drug": "warfarin",
    "difficulty": 3,
    "question": "Caso sintetico: valvola cardiaca meccanica. Quale classe è standard per l'anticoagulazione a lungo termine?",
    "answers": [
      "Antagonisti della vitamina K",
      "Inibitori diretti del fattore Xa senza verifica",
      "Solo FANS",
      "Solo antiaggreganti"
    ],
    "correct": 0,
    "why": "Le protesi valvolari meccaniche richiedono tipicamente antagonisti della vitamina K secondo indicazioni e monitoraggio appropriati."
  },
  {
    "id": "q26",
    "kind": "teoria",
    "group": "Emostasi",
    "drug": "clopidogrel",
    "difficulty": 3,
    "question": "La variabilità d'attivazione del clopidogrel è associata anche a:",
    "answers": [
      "CYP2C19",
      "SGLT2",
      "Recettore β2",
      "NCC"
    ],
    "correct": 0,
    "why": "Clopidogrel è un profarmaco con attivazione epatica, e CYP2C19 contribuisce in modo rilevante."
  },
  {
    "id": "q27",
    "kind": "teoria",
    "group": "Emostasi",
    "drug": "asa",
    "difficulty": 2,
    "question": "L'effetto antiaggregante dell'ASA deriva soprattutto da:",
    "answers": [
      "Inibizione irreversibile di COX-1 nelle piastrine",
      "Attivazione del fattore Xa",
      "Blocco di VKORC1",
      "Agonismo di P2Y12"
    ],
    "correct": 0,
    "why": "L'acetilazione irreversibile di COX-1 riduce la produzione piastrinica di trombossano A2."
  },
  {
    "id": "q28",
    "kind": "clinico",
    "group": "Cardiovascolare",
    "drug": "nitroglicerina",
    "difficulty": 3,
    "question": "Perché nitrati organici e inibitori PDE5 possono provocare ipotensione importante?",
    "answers": [
      "Potenziamento della via NO–cGMP",
      "Inibizione diretta di NCC",
      "Induzione di sintesi di aldosterone",
      "Antagonismo del recettore β1"
    ],
    "correct": 0,
    "why": "L'aumento della formazione e la ridotta degradazione di cGMP amplificano la vasodilatazione."
  },
  {
    "id": "q29",
    "kind": "statistica",
    "group": "Evidenze",
    "drug": "",
    "difficulty": 2,
    "question": "Evento a 1 anno nel controllo 10%, nel trattamento 6%. Quale ARR?",
    "answers": [
      "4 punti percentuali",
      "40 punti percentuali",
      "60 punti percentuali",
      "1,67 punti percentuali"
    ],
    "correct": 0,
    "why": "ARR = 0,10 − 0,06 = 0,04, cioè 4 punti percentuali."
  },
  {
    "id": "q30",
    "kind": "statistica",
    "group": "Evidenze",
    "drug": "",
    "difficulty": 3,
    "question": "ARR = 0,04 su un anno. Quale NNT arrotondato?",
    "answers": [
      "25",
      "4",
      "250",
      "0,04"
    ],
    "correct": 0,
    "why": "NNT = 1 / 0,04 = 25, per quello specifico endpoint e orizzonte."
  },
  {
    "id": "q31",
    "kind": "statistica",
    "group": "Evidenze",
    "drug": "",
    "difficulty": 4,
    "question": "Un NNT di 25 può essere riportato senza specificare durata o endpoint?",
    "answers": [
      "No, perde il suo significato clinico",
      "Sì, è intrinseco alla molecola",
      "Solo in Italia",
      "Solo per farmaci orali"
    ],
    "correct": 0,
    "why": "NNT dipende da rischio di base, endpoint, confronto e orizzonte temporale."
  },
  {
    "id": "q32",
    "kind": "statistica",
    "group": "Evidenze",
    "drug": "",
    "difficulty": 4,
    "question": "Perché HR e RR non sono automaticamente intercambiabili?",
    "answers": [
      "HR usa l'informazione temporale sui tassi istantanei; RR confronta rischi in un periodo",
      "HR indica sempre causalità",
      "RR è una concentrazione",
      "Sono la stessa definizione"
    ],
    "correct": 0,
    "why": "L'hazard ratio rappresenta un confronto fra hazard; il rischio relativo confronta probabilità cumulative in un periodo."
  },
  {
    "id": "q33",
    "kind": "teoria",
    "group": "Biotecnologici",
    "drug": "",
    "difficulty": 2,
    "question": "Quale classificazione descrive primariamente una tipologia molecolare?",
    "answers": [
      "Anticorpo monoclonale",
      "Antipertensivo",
      "Antineoplastico",
      "Diuretico"
    ],
    "correct": 0,
    "why": "Anticorpo monoclonale classifica la natura biologica; le altre etichette indicano usi o classi terapeutiche."
  },
  {
    "id": "q34",
    "kind": "teoria",
    "group": "Biotecnologici",
    "drug": "",
    "difficulty": 3,
    "question": "Un antibody-drug conjugate (ADC) contiene normalmente:",
    "answers": [
      "Anticorpo, linker e payload",
      "Solo una piccola molecola libera",
      "RNA polimerasi e coenzima A",
      "Solo un canale ionico"
    ],
    "correct": 0,
    "why": "Un ADC integra il targeting dell'anticorpo, un sistema di collegamento e un carico attivo."
  },
  {
    "id": "q35",
    "kind": "teoria",
    "group": "Antimicrobici",
    "drug": "",
    "difficulty": 3,
    "question": "Perché molti analoghi nucleosidici richiedono attivazione intracellulare?",
    "answers": [
      "La fosforilazione può generare la forma attiva per gli enzimi bersaglio",
      "Sono tutti proteine ricombinanti",
      "Agiscono solo fuori dalla cellula",
      "Sono antagonisti β1"
    ],
    "correct": 0,
    "why": "Per diversi analoghi nucleosidici la conversione ai metaboliti fosforilati è cruciale; non è un meccanismo unico universale."
  },
  {
    "id": "q36",
    "kind": "teoria",
    "group": "Farmacovigilanza",
    "drug": "",
    "difficulty": 3,
    "question": "Le segnalazioni spontanee di eventi avversi dimostrano di per sé causalità?",
    "answers": [
      "No, costituiscono segnali da approfondire",
      "Sì, sempre",
      "Solo se le segnalazioni sono numerose",
      "Solo per farmaci biologici"
    ],
    "correct": 0,
    "why": "La segnalazione spontanea non definisce da sola frequenza o causalità."
  },
  {
    "id": "q37",
    "kind": "teoria",
    "group": "Farmacocinetica",
    "drug": "metoprololo",
    "difficulty": 3,
    "question": "Quale enzima contribuisce significativamente al metabolismo del metoprololo?",
    "answers": [
      "CYP2D6",
      "SGLT2",
      "ACE",
      "Fattore Xa"
    ],
    "correct": 0,
    "why": "La variabilità di CYP2D6 può modificare l'esposizione a metoprololo."
  },
  {
    "id": "q38",
    "kind": "clinico",
    "group": "Respiratorio",
    "drug": "salbutamolo",
    "difficulty": 2,
    "question": "Caso sintetico: tremore e tachicardia dopo uso intenso di agonista β2. Quale collegamento meccanicistico è plausibile?",
    "answers": [
      "Stimolazione adrenergica dose-dipendente",
      "Blocco irreversibile della COX",
      "Antagonismo della vitamina K",
      "Inibizione del fattore Xa"
    ],
    "correct": 0,
    "why": "Gli agonisti β2 possono produrre effetti sistemici come tremore e tachicardia, secondo esposizione e contesto."
  },
  {
    "id": "q39",
    "kind": "clinico",
    "group": "Cardiovascolare",
    "drug": "digossina",
    "difficulty": 4,
    "question": "Scenario didattico: digossina, ipokaliemia e funzione renale ridotta. Perché serve prudenza?",
    "answers": [
      "Può aumentare il rischio di tossicità digitalica",
      "Disattiva tutti i recettori β2",
      "Impedisce la sintesi di P2Y12",
      "Aumenta sempre clearance della digossina"
    ],
    "correct": 0,
    "why": "L'ipokaliemia e la riduzione della funzione renale possono aumentare la suscettibilità a tossicità da digossina."
  },
  {
    "id": "q40",
    "kind": "statistica",
    "group": "Evidenze",
    "drug": "",
    "difficulty": 5,
    "question": "Un trial osserva RR 0,5 ma rischio nel controllo 2‰. Qual è il rischio trattato e l'ARR?",
    "answers": [
      "1‰ e 1‰",
      "1% e 1%",
      "0‰ e 2‰",
      "2‰ e 0‰"
    ],
    "correct": 0,
    "why": "Se RR = 0,5 e il rischio di base è 0,002, il rischio trattato è 0,001; ARR = 0,001 = 1‰ (NNT 1000 nello stesso orizzonte)."
  }
];

export const ELIX_CHAPTERS = Object.freeze([...BASE_CHAPTERS,...EXPANDED_CHAPTERS,...CHAPTERS_09]);
export const ELIX_QUESTIONS = Object.freeze([...BASE_QUESTIONS,...EXPANDED_QUESTIONS]);
