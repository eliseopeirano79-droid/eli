/* ELIX Textbook expansion: original chapters; not copied from proprietary textbooks.
   All sections educational; clinical recommendations require current official guidelines. */
export const EXPANDED_CHAPTERS=[
  {
    "id": "dalla-molecola-al-medicinale",
    "volume": 1,
    "title": "Dalla molecola al medicinale autorizzato",
    "lead": "Struttura, formulazione, dossier e vigilanza non sono sinonimi.",
    "sections": [
      {
        "title": "Identità a livelli distinti",
        "text": "La sostanza attiva è caratterizzata dalla propria identità chimica o biologica, ma sali, esteri e stereoisomeri possono avere proprietà differenti. Un medicinale contiene la sostanza in una formulazione con eccipienti, dosaggio, via e confezione definiti. La presenza di una molecola in ChEMBL, perciò, non prova che esista un prodotto autorizzato in Italia."
      },
      {
        "title": "Fase preclinica e farmacologia traslazionale",
        "text": "Il percorso inizia da un bersaglio o da un fenotipo: si cercano attività, selettività, esposizione e possibili rischi prima del passaggio agli studi clinici. I dati di cellule e animali costituiscono ipotesi importanti, ma non predicono automaticamente la risposta dei pazienti né l'equilibrio rischio-beneficio."
      },
      {
        "title": "Studi di fase e autorizzazione",
        "text": "Le fasi cliniche esplorano progressivamente sicurezza, dosi, efficacia e confronto con terapie disponibili, ma la loro struttura può variare per classe di prodotti. L'autorizzazione finale si riferisce a specifiche indicazioni, popolazioni e modalità di impiego, descritte nel riassunto delle caratteristiche del prodotto."
      },
      {
        "title": "Dopo l'immissione in commercio",
        "text": "Farmacovigilanza, studi osservazionali e aggiornamenti delle linee guida possono modificare la comprensione del profilo beneficio-rischio. Un'etichetta FDA non sostituisce il RCP AIFA: cambiano giurisdizione, prodotti e data di validità. ELIX deve conservare tutte queste versioni come fatti distinti."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "curve-recettoriali",
    "volume": 2,
    "title": "Curve concentrazione-risposta e riserva recettoriale",
    "lead": "Leggere EC50, Emax, pD2 e Schild senza confonderli.",
    "sections": [
      {
        "title": "Legame e risposta sono esperimenti diversi",
        "text": "Una costante Kd di legame descrive un equilibrio molecolare nel particolare esperimento, mentre EC50 misura una risposta biologica in un sistema che può amplificare il segnale. Una EC50 inferiore non dimostra necessariamente una maggiore affinità: anche l'espressione dei recettori e il tessuto influenzano la risposta."
      },
      {
        "title": "Agonista pieno, parziale e inverso",
        "text": "Un agonista pieno raggiunge l'effetto massimo del sistema di riferimento; un agonista parziale può avere efficacia massima minore. In un sistema con attività recettoriale costitutiva, un agonista inverso può ridurre il segnale basale, a differenza di un antagonista neutro."
      },
      {
        "title": "Antagonismo surmontabile e insurmontabile",
        "text": "Un antagonista competitivo reversibile può spostare a destra la curva dell'agonista senza ridurre necessariamente Emax, mentre antagonismo irreversibile o allosterico può limitarla. Serve considerare la riserva recettoriale: la perdita di alcuni recettori può non ridurre subito la risposta massima."
      },
      {
        "title": "Indice terapeutico e risposta quantale",
        "text": "Curve quantali di efficacia ed eventi avversi descrivono la proporzione di individui che raggiungono una soglia definita, e non equivalgono alle curve graduali di un singolo sistema. Il margine terapeutico dipende dal tipo di endpoint, dall'esposizione, dal paziente e dal contesto."
      }
    ],
    "drugs": [
      "salbutamolo",
      "propranololo"
    ],
    "targets": [
      "ADRB2"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "assorbimento-distribuzione",
    "volume": 3,
    "title": "Assorbimento, distribuzione e biodisponibilità",
    "lead": "Perché la dose ingerita non coincide con la dose al recettore.",
    "sections": [
      {
        "title": "Attraversamento delle membrane",
        "text": "La dissoluzione, la formulazione, la permeabilità e i trasportatori influenzano quanta sostanza raggiunge il compartimento sistemico. Il pH può modificare lo stato di ionizzazione, ma la semplice regola degli acidi e basi deboli non esaurisce la complessità dell'assorbimento."
      },
      {
        "title": "Biodisponibilità assoluta e relativa",
        "text": "La F assoluta confronta l'esposizione sistemica extravascolare con quella dopo somministrazione EV opportunamente normalizzata per dose. La biodisponibilità relativa confronta invece due formulazioni: non è corretto trasformare un rapporto fra formulazioni nella F assoluta del farmaco."
      },
      {
        "title": "Volume di distribuzione",
        "text": "Il Vd è un volume apparente che collega quantità nell'organismo e concentrazione plasmatica, non un volume anatomico. Legame tissutale, lipofilia e legame a proteine plasmatiche possono cambiarlo senza modificare in modo proporzionale il volume corporeo."
      },
      {
        "title": "Barriere, metabolismo presistemico e primo passaggio",
        "text": "Trasportatori, fegato e intestino possono limitare la concentrazione raggiunta dopo la via orale. Farmaci con marcato primo passaggio mostrano spesso differenze importanti fra vie sublinguale, orale e parenterale, perciò un numero di milligrammi non va trasferito automaticamente fra vie."
      }
    ],
    "drugs": [
      "nitroglicerina",
      "rivaroxaban",
      "amlodipina"
    ],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "metabolismo-trasportatori",
    "volume": 3,
    "title": "CYP, trasportatori e interazioni farmacocinetiche",
    "lead": "Dalle vie metaboliche alle differenze individuali.",
    "sections": [
      {
        "title": "Fase I e fase II",
        "text": "Le reazioni di ossidazione, riduzione e idrolisi possono trasformare la struttura della sostanza; le coniugazioni spesso ne facilitano l'eliminazione. Non tutte le molecole seguono entrambe le fasi, e un metabolita può essere inattivo, attivo o tossico."
      },
      {
        "title": "Inibizione e induzione enzimatica",
        "text": "Un inibitore può aumentare rapidamente l'esposizione a un substrato metabolico; un induttore può richiedere tempo per modificare la quantità degli enzimi. Le interazioni dipendono anche dalla via e dalla frazione metabolizzata: non basta conoscere un CYP per predire l'entità clinica."
      },
      {
        "title": "Trasportatori di membrana",
        "text": "P-gp e trasportatori di uptake/efflusso modulano assorbimento, distribuzione ed eliminazione. Un'interazione su P-gp può essere rilevante anche quando le vie di metabolismo non si sovrappongono. La stessa sostanza può essere substrato di più sistemi."
      },
      {
        "title": "Varianti genetiche e pro-farmaci",
        "text": "Un polimorfismo che riduce il metabolismo può aumentare l'esposizione al principio attivo, ma per i profarmaci talvolta riduce l'attivazione. Clopidogrel e metoprololo aiutano a distinguere le due situazioni: il segno dell'effetto cambia secondo la reazione interessata."
      }
    ],
    "drugs": [
      "clopidogrel",
      "metoprololo",
      "eplerenone"
    ],
    "targets": [
      "CYP2C19",
      "CYP2D6"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "canali-ionici",
    "volume": 4,
    "title": "Canali ionici e farmacologia dell'eccitabilità",
    "lead": "Canali Na⁺, K⁺, Ca²⁺ e HCN come bersagli.",
    "sections": [
      {
        "title": "Voltage-gated e ligand-gated",
        "text": "L'apertura di un canale può dipendere dal voltaggio, dal legame di un ligando o da altri segnali intracellulari. La distribuzione tissutale di isoforme diverse condiziona l'effetto farmacologico e il profilo di tossicità."
      },
      {
        "title": "Blocco stato- e frequenza-dipendente",
        "text": "Per alcuni farmaci il legame è favorito da particolari stati conformazionali del canale. Perciò l'attività può cambiare con frequenza di stimolazione e caratteristiche del potenziale d'azione, come accade con diversi antiaritmici."
      },
      {
        "title": "Canali L e nodi cardiaci",
        "text": "Il blocco di CaV1.2 nella muscolatura vascolare può produrre vasodilatazione, mentre l'inibizione della corrente del calcio in tessuti nodali può rallentare la conduzione. Diltiazem, verapamil e amlodipina mostrano questa differenza senza essere farmaci identici."
      },
      {
        "title": "HCN e automatismo sinusale",
        "text": "La corrente If contribuisce alla depolarizzazione diastolica del nodo senoatriale; ivabradina ne riduce l'attività. Non è un antagonista β1 e non controlla la frequenza ventricolare durante fibrillazione atriale secondo lo stesso meccanismo."
      }
    ],
    "drugs": [
      "ivabradina",
      "amlodipina",
      "verapamil",
      "amiodarone"
    ],
    "targets": [
      "HCN4",
      "CACNA1C",
      "KCNH2",
      "SCN5A"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "tirosinchinasi",
    "volume": 4,
    "title": "Recettori tirosin-chinasici e signaling proliferativo",
    "lead": "RAS, MAPK, PI3K–AKT–mTOR e terapia bersaglio.",
    "sections": [
      {
        "title": "Attivazione del recettore",
        "text": "Molti recettori tirosin-chinasici sono attivati da legame di fattori di crescita, dimerizzazione o riorganizzazione dei complessi e autofosforilazione. Le tirosine fosforilate diventano siti di reclutamento per adattatori e proteine effettrici."
      },
      {
        "title": "RAS–RAF–MEK–ERK",
        "text": "La cascata MAPK trasmette segnali verso proliferazione, differenziazione e altri programmi cellulari. Mutazioni in nodi della cascata possono renderla relativamente indipendente dallo stimolo iniziale e cambiare la sensibilità a specifiche terapie."
      },
      {
        "title": "PI3K–AKT–mTOR",
        "text": "Questa via integra segnalazioni di crescita, metabolismo e sopravvivenza. La risposta alle terapie dipende da feedback, ridondanza dei circuiti e meccanismi di resistenza, non soltanto dalla presenza di un singolo bersaglio."
      },
      {
        "title": "Terapie mirate e biomarcatori",
        "text": "Un farmaco molecolarmente mirato richiede spesso caratterizzazione del bersaglio nel tumore; i test possono riguardare mutazioni, amplificazioni o espressione proteica. Le strutture 3D aiutano a visualizzare il legame, ma non sostituiscono studi di efficacia clinica."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "parasimpatico-e-colinergici",
    "volume": 5,
    "title": "Farmacologia colinergica e parasimpatica",
    "lead": "Dalla sinapsi muscarinica alla placca neuromuscolare.",
    "sections": [
      {
        "title": "Acetilcolina e terminazione del segnale",
        "text": "L'acetilcolina viene sintetizzata nel neurone e rilasciata da vescicole; le colinesterasi ne regolano la permanenza nello spazio extracellulare. Le vie colinergiche coinvolgono sia recettori muscarinici GPCR sia recettori nicotinici ionotropici."
      },
      {
        "title": "Muscarinici per sottotipo",
        "text": "M1/M3/M5 sono prevalentemente associati a Gq/11, M2/M4 a Gi/o. Muscolo liscio, ghiandole e cuore rispondono in modo diverso perché cambiano sottotipi e segnali cellulari; 'colinergico' non equivale a una risposta univoca."
      },
      {
        "title": "Antimuscarinici e bronchi",
        "text": "Bloccando specifici recettori muscarinici, farmaci inalatori possono ridurre il tono broncocostrittore vagale. Questo effetto è diverso dalla stimolazione β2 e consente di capire l'associazione di classi in pneumologia."
      },
      {
        "title": "Giunzione neuromuscolare",
        "text": "La trasmissione nicotinica della placca è ionotropica: depolarizza la membrana muscolare tramite canali recettoriali. Farmaci bloccanti neuromuscolari non vanno confusi con antagonisti muscarinici o con inibitori delle colinesterasi."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "ipertensione",
    "volume": 6,
    "title": "Farmacologia dell'ipertensione arteriosa",
    "lead": "Perché la pressione è il risultato di molte vie.",
    "sections": [
      {
        "title": "Un sistema emodinamico integrato",
        "text": "Pressione arteriosa, gittata cardiaca, resistenze periferiche e volume extracellulare sono grandezze collegate. I farmaci possono agire in compartimenti differenti e produrre compensazioni endocrine o neurologiche."
      },
      {
        "title": "RAAS come bersaglio",
        "text": "ACE-inibitori e antagonisti AT1 riducono la segnalazione dell'angiotensina II con meccanismi diversi; gli antagonisti MR agiscono invece a valle dell'aldosterone. Le conseguenze su renina, potassio e filtrazione renale vanno comprese insieme."
      },
      {
        "title": "Canali del calcio e tono vascolare",
        "text": "Le diidropiridine sono particolarmente utili per il ruolo dei canali L nella contrazione vascolare. Edema periferico e ipotensione sono correlati all'emodinamica e non equivalgono automaticamente a semplice ritenzione idrica."
      },
      {
        "title": "Diuretici e variabilità",
        "text": "La disponibilità di sodio, l'eGFR e l'attività di altri segmenti tubolari condizionano gli effetti dei diuretici. La terapia deriva da indicazione e quadro clinico: uno schema posologico generale non può essere dedotto dal solo meccanismo."
      }
    ],
    "drugs": [
      "ramipril",
      "losartan",
      "amlodipina",
      "furosemide",
      "idroclorotiazide"
    ],
    "targets": [
      "ACE",
      "AGTR1",
      "CACNA1C",
      "SLC12A3"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "scompenso",
    "volume": 6,
    "title": "Farmaci dello scompenso cardiaco",
    "lead": "Ridurre il carico e modificare i processi di malattia.",
    "sections": [
      {
        "title": "Sintomi e prognosi non coincidono",
        "text": "Un diuretico può alleviare una congestione senza dimostrare necessariamente lo stesso effetto di altri farmaci sugli endpoint di mortalità. La farmacologia dello scompenso separa controllo del volume, neuro-ormoni e rimodellamento."
      },
      {
        "title": "Attivazione cronica dei neuro-ormoni",
        "text": "La stimolazione simpatica e RAAS può sostenere transitoriamente circolo e perfusione, ma nel lungo periodo contribuire a progressione e rimodellamento. Alcune terapie modulano proprio questi meccanismi adattativi diventati maladattativi."
      },
      {
        "title": "Beta-bloccanti e antagonisti MR",
        "text": "I beta-bloccanti appropriati limitano stimolazione adrenergica cronica; antagonisti MR riducono attività dell'aldosterone. Il beneficio clinico dimostrato è legato a molecola, formulazione, criteri di stabilità e popolazione, non a un generico effetto antipertensivo."
      },
      {
        "title": "SGLT2 oltre il diabete",
        "text": "DAPA-HF ha mostrato una riduzione del composito di peggioramento dello scompenso o morte cardiovascolare anche senza diabete. È essenziale identificare endpoint, follow-up e trattamento concomitante prima di generalizzare una cifra di beneficio."
      }
    ],
    "drugs": [
      "bisoprololo",
      "metoprololo",
      "spironolattone",
      "dapagliflozin",
      "empagliflozin"
    ],
    "targets": [
      "ADRB1",
      "NR3C2",
      "SLC5A2"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antiaritmici",
    "volume": 6,
    "title": "Antiaritmici, nodi e potenziale d'azione",
    "lead": "Dalla corrente ionica all'ECG senza scorciatoie.",
    "sections": [
      {
        "title": "Potenziale d'azione e tessuto",
        "text": "Miociti atriali, ventricolari e cellule nodali impiegano correnti differenti. Un farmaco che agisce su una corrente può quindi modificare conduzione, refrattarietà o automatismo con effetti diversi in ogni tessuto."
      },
      {
        "title": "Classificazione di Vaughan Williams",
        "text": "Le classi I–IV aiutano a organizzare i principali bersagli, ma molte molecole hanno effetti multicanale e non rientrano in un meccanismo unico. Per esempio amiodarone presenta attività su più correnti e vie."
      },
      {
        "title": "Rischio proaritmico",
        "text": "Bloccare alcuni canali del potassio può prolungare la ripolarizzazione, e in condizioni predisponenti favorire aritmie come torsione di punta. Non basta considerare la sola capacità di 'ridurre le aritmie' per valutarne il rischio."
      },
      {
        "title": "Automatismo del nodo senoatriale",
        "text": "Ivabradina agisce sulla corrente If; beta-bloccanti modulano invece il segnale autonomico. Le differenze spiegano perché avere la stessa riduzione di frequenza non implica identici effetti o indicazioni."
      }
    ],
    "drugs": [
      "amiodarone",
      "ivabradina",
      "verapamil",
      "diltiazem"
    ],
    "targets": [
      "KCNH2",
      "SCN5A",
      "HCN4"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "diuretici-elettroliti",
    "volume": 7,
    "title": "Diuretici: sodio, potassio e regolazione renale",
    "lead": "Tre segmenti del nefrone, tre profili di rischio.",
    "sections": [
      {
        "title": "Ansa di Henle e gradiente osmotico",
        "text": "I diuretici dell'ansa inibiscono NKCC2 nel tratto ascendente spesso, riducendo la capacità di costruire gradiente midollare. La quantità di farmaco che raggiunge il lume tubulare modifica la risposta."
      },
      {
        "title": "Distale e riassorbimento di NaCl",
        "text": "Le tiazidi agiscono su NCC nel tubulo distale; la modifica della consegna distale di sodio può favorire perdita di potassio. Il rene risponde con compensazioni che dipendono da funzione renale e stato volemico."
      },
      {
        "title": "MR, ENaC e potassio",
        "text": "Gli antagonisti di MR riducono parte degli effetti dell'aldosterone sul nefrone distale. Poiché ostacolano i meccanismi che favoriscono la secrezione di potassio, possono causare iperkaliemia, specialmente con altri farmaci sul RAAS."
      },
      {
        "title": "Monitoraggio ragionato",
        "text": "Ipovolemia, iponatriemia, iperkaliemia e ipokaliemia non derivano tutte dallo stesso meccanismo. Conoscere il segmento tubulare rende più facile interpretare associazioni di farmaci e alterazioni elettrolitiche."
      }
    ],
    "drugs": [
      "furosemide",
      "idroclorotiazide",
      "spironolattone",
      "eplerenone"
    ],
    "targets": [
      "SLC12A1",
      "SLC12A3",
      "NR3C2"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "anticoagulanti",
    "volume": 7,
    "title": "Coagulazione e anticoagulanti",
    "lead": "Antitrombina, fattore Xa, trombina e vitamina K.",
    "sections": [
      {
        "title": "Dalla cascata alla fibrina",
        "text": "La trombina trasforma fibrinogeno in fibrina ed è generata in un circuito di reazioni che include il fattore Xa. Ridurne la generazione o inibirla direttamente porta a effetti antitrombotici, ma attraverso bersagli e tempi diversi."
      },
      {
        "title": "Eparine e antitrombina",
        "text": "L'eparina non frazionata comprende catene diverse che facilitano l'azione dell'antitrombina su IIa e Xa. Le EBPM hanno un rapporto relativo differente fra attività anti-Xa e anti-IIa; fondaparinux è un pentasaccaride sintetico con profilo ancora diverso."
      },
      {
        "title": "Anticoagulanti orali diretti",
        "text": "Apixaban, rivaroxaban ed edoxaban inibiscono direttamente Xa, mentre dabigatran inibisce IIa dopo attivazione del profarmaco. Non condividono automaticamente regimi, interazioni o indicazioni."
      },
      {
        "title": "Warfarin e fattori vitamina K dipendenti",
        "text": "Inibendo VKORC1, warfarin ostacola la γ-carbossilazione dei fattori della coagulazione. Il ritardo d'azione è collegato al ricambio dei fattori attivi; l'INR è un monitoraggio di un effetto biologico, non una misura diretta della concentrazione plasmatica."
      }
    ],
    "drugs": [
      "eparina",
      "enoxaparina",
      "fondaparinux",
      "apixaban",
      "warfarin",
      "dabigatran"
    ],
    "targets": [
      "F10",
      "VKORC1"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antiaggreganti",
    "volume": 7,
    "title": "Antiaggreganti e piastrine",
    "lead": "COX-1, ADP–P2Y12 e aggregazione.",
    "sections": [
      {
        "title": "Emostasi primaria",
        "text": "Le piastrine aderiscono e si attivano in risposta a esposizione del subendotelio e agonisti solubili. La formazione del tappo piastrinico è collegata, ma distinta, dalla cascata plasmatica della coagulazione."
      },
      {
        "title": "Aspirina e trombossano",
        "text": "Acido acetilsalicilico acetila irreversibilmente COX-1 piastrinica a dosi antiaggreganti, riducendo trombossano A₂. L'effetto dura oltre la permanenza plasmatica del principio attivo, perché dipende dal ricambio piastrinico."
      },
      {
        "title": "P2Y12 e clopidogrel",
        "text": "P2Y12 è un recettore dell'ADP coinvolto nell'attivazione piastrinica. Clopidogrel è un profarmaco, e differenze nell'attivazione, anche CYP2C19-dipendenti, contribuiscono alla variabilità di risposta."
      },
      {
        "title": "Bilancio cardiovascolare-emorragico",
        "text": "In prevenzione primaria, diminuire gli eventi vascolari non garantisce beneficio netto quando aumentano i sanguinamenti maggiori. Lo studio ASCEND offre un esempio quantitativo dei due endpoint da interpretare separatamente."
      }
    ],
    "drugs": [
      "asa",
      "clopidogrel"
    ],
    "targets": [
      "PTGS1",
      "P2RY12"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "benzodiazepine",
    "volume": 8,
    "title": "GABA e farmaci sedativo-ipnotici",
    "lead": "Modulare l'inibizione senza confondere i recettori.",
    "sections": [
      {
        "title": "Recettore GABA-A",
        "text": "GABA-A è un canale del cloruro attivato dal ligando; la sua apertura modifica la conduttanza di membrana e la probabilità di generare potenziali d'azione. L'effetto dipende dal gradiente del cloruro e dalla maturità della cellula."
      },
      {
        "title": "Modulatori allosterici positivi",
        "text": "Le benzodiazepine potenziano in molti recettori GABA-A l'azione di GABA attraverso un sito distinto da quello ortosterico. Non producono l'identico effetto su tutte le composizioni di subunità recettoriali."
      },
      {
        "title": "Sedazione, amnesia e tolleranza",
        "text": "Gli effetti centrali variano secondo dose, tempo e sensibilità; la somministrazione cronica può produrre adattamenti e dipendenza. Interazioni con altri depressori del SNC possono aumentare il rischio respiratorio."
      },
      {
        "title": "Metabolismo e durata dell'effetto",
        "text": "Metaboliti attivi e lipofilia possono far differire durata clinica ed emivita del parent. La scelta della molecola non si basa semplicemente sul numero di ore riportato su una scheda."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antiepilettici",
    "volume": 8,
    "title": "Antiepilettici e reti neuronali",
    "lead": "Dai canali ionici al controllo delle scariche.",
    "sections": [
      {
        "title": "Eccitazione e inibizione",
        "text": "Una crisi epilettica coinvolge ipereccitabilità e sincronizzazione di circuiti neurali. I farmaci possono agire su canali ionici, trasmissione GABAergica, glutamatergica o rilascio vescicolare."
      },
      {
        "title": "Canali del sodio",
        "text": "Molte molecole modulano correnti del sodio voltaggio-dipendenti con preferenza per stati di attivazione/inattivazione. La frequenza dei potenziali d'azione può cambiare l'entità del blocco."
      },
      {
        "title": "SV2A e rilascio sinaptico",
        "text": "Levetiracetam si lega alla proteina vescicolare SV2A e modifica dinamiche di rilascio; non è un bloccante diretto dei recettori GABA-A. La distinzione chiarisce perché molecole diverse possano trattare convulsioni attraverso meccanismi non sovrapponibili."
      },
      {
        "title": "Fattori clinici",
        "text": "Tipo di crisi, età, gravidanza, co-terapie, organi emuntori e rischi di sospensione cambiano il profilo di utilizzo. Una sola classificazione per 'antiepilettici' nasconde differenze importanti."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "fansi-cox",
    "volume": 9,
    "title": "FANS, COX ed eicosanoidi",
    "lead": "Prostaglandine, dolore e rischi d'organo.",
    "sections": [
      {
        "title": "Dall'acido arachidonico ai mediatori",
        "text": "La via della cicloossigenasi genera prostanoidi che partecipano a infiammazione, dolore, febbre, emostasi e difesa della mucosa gastrica. COX-1 e COX-2 hanno distribuzioni e ruoli non riducibili a 'buona e cattiva'."
      },
      {
        "title": "Analgesia e antipiresi",
        "text": "La diminuzione di prostaglandine coinvolte nella sensibilizzazione nocicettiva e nel controllo termico centrale contribuisce all'effetto dei FANS. L'intensità dell'effetto è condizionata da patologia, dose ed esposizione."
      },
      {
        "title": "Tossicità gastro-renale e cardiovascolare",
        "text": "L'inibizione dei prostanoidi protettivi può favorire danno gastrointestinale e alterazioni dell'emodinamica renale, specie in condizioni predisponenti. L'equilibrio trombossano–prostaciclina contribuisce a spiegare alcuni rischi cardiovascolari."
      },
      {
        "title": "ASA non equivale agli altri FANS",
        "text": "L'antiaggregazione dell'aspirina è legata all'acetilazione irreversibile della COX-1 piastrinica: non va attribuita automaticamente agli altri FANS. Un effetto antinfiammatorio non dimostra equivalenza nella prevenzione trombotica."
      }
    ],
    "drugs": [
      "asa"
    ],
    "targets": [
      "PTGS1"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "oppioidi",
    "volume": 9,
    "title": "Recettori oppioidi e analgesia",
    "lead": "Gi/o, neuroni nocicettivi e tolleranza.",
    "sections": [
      {
        "title": "Recettori μ, κ e δ",
        "text": "I recettori oppioidi appartengono ai GPCR e sono prevalentemente associati a Gi/o. L'effetto può includere riduzione del rilascio di neurotrasmettitori e iperpolarizzazione attraverso correnti ioniche."
      },
      {
        "title": "Analgesia e circuiti",
        "text": "L'analgesia dipende dalla modulazione di sistemi spinali e sovraspinali, non solo da una misura di affinità recettoriale. Lo stesso recettore in circuiti diversi produce effetti clinici differenti."
      },
      {
        "title": "Depressione respiratoria e stipsi",
        "text": "Effetti su centri respiratori, motilità gastrointestinale e altri sistemi sono aspetti farmacodinamici del medesimo gruppo. Associare altri depressori del SNC può aumentare significativamente i rischi."
      },
      {
        "title": "Tolleranza, dipendenza e reversibilità",
        "text": "L'esposizione ripetuta porta ad adattamenti recettoriali e di circuito; dipendenza fisica e disturbo da uso non sono sinonimi. Antagonisti recettoriali hanno ruoli specifici, ma durata e recidiva degli effetti dipendono dalla molecola coinvolta."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "metabolismo-diabetico",
    "volume": 10,
    "title": "Farmaci antidiabetici: insulina, SGLT2 e incretine",
    "lead": "Glicemia ed esiti d'organo non sono la stessa cosa.",
    "sections": [
      {
        "title": "Insulina e segnalazione del recettore",
        "text": "Il recettore insulinico è una tirosin-chinasi che attiva vie come IRS–PI3K–AKT, modificando trasporto del glucosio e metabolismo. Analogi insulinici e formulazioni differiscono per cinetica, non per l'esistenza di recettori completamente diversi."
      },
      {
        "title": "Metformina",
        "text": "Metformina influenza il metabolismo epatico del glucosio tramite meccanismi complessi e dipendenti dalla concentrazione, non sempre riconducibili a una singola interazione recettoriale. Gli effetti gastrointestinali e la funzione renale condizionano la valutazione del farmaco."
      },
      {
        "title": "SGLT2 e nefroprotezione",
        "text": "Gli SGLT2-inibitori agiscono sul riassorbimento tubulare di glucosio e sodio. DAPA-CKD ed EMPA-KIDNEY dimostrano esiti renali e cardiovascolari in popolazioni definite, anche senza diabete; non è sufficiente la riduzione dell'HbA1c per descriverne il beneficio."
      },
      {
        "title": "Agonisti del recettore GLP-1",
        "text": "Il GLP-1R è un GPCR che modula secrezione insulinica glucosio-dipendente, sazietà e svuotamento gastrico in modo integrato. Molecole e formulazioni diverse devono essere confrontate per evidenze, indicazioni ed effetti collaterali documentati."
      }
    ],
    "drugs": [
      "dapagliflozin",
      "empagliflozin"
    ],
    "targets": [
      "SLC5A2"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "terapia-tiroidea",
    "volume": 10,
    "title": "Ormoni tiroidei e antitiroidei",
    "lead": "Asse ipotalamo–ipofisi–tiroide e controllo del metabolismo.",
    "sections": [
      {
        "title": "Ormoni tiroidei e recettori nucleari",
        "text": "T3 interagisce con recettori nucleari che regolano trascrizione e metabolismo. La risposta richiede tempo perché coinvolge cambiamenti nell'espressione di proteine: concentrazione plasmatica e effetto clinico possono essere sfasati."
      },
      {
        "title": "Levotiroxina e conversione periferica",
        "text": "T4 è convertito in parte a T3 nelle cellule. Assorbimento orale, interazioni alimentari e formulazione condizionano l'esposizione; il monitoraggio segue tempi di adattamento dell'asse ormonale."
      },
      {
        "title": "Sintesi tiroidea",
        "text": "Tireoperossidasi, captazione dello iodio e coniugazione dei residui tirosinici partecipano alla sintesi ormonale. Farmaci antitiroidei e iodio agiscono in fasi differenti, quindi i loro effetti temporali non coincidono."
      },
      {
        "title": "Sicurezza e interazioni",
        "text": "L'eccesso di ormone può favorire tachiaritmie e perdita ossea, mentre l'insufficienza di esposizione mantiene ipotiroidismo. Non si interpreta la terapia dalla sola dose nominale, senza quadro clinico e dati di laboratorio."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "asma-e-broncodilatatori",
    "volume": 11,
    "title": "Asma, β₂-agonisti e antimuscarinici",
    "lead": "Dalla muscolatura liscia al controllo dell'infiammazione.",
    "sections": [
      {
        "title": "Broncocostrizione e iperreattività",
        "text": "La riduzione del calibro bronchiale dipende da muscolatura liscia, edema, secrezioni e infiammazione. Una molecola che rilassa il muscolo può migliorare rapidamente il sintomo senza controllare tutti i meccanismi di malattia."
      },
      {
        "title": "Via β₂–Gs–cAMP",
        "text": "Gli agonisti β2 favoriscono rilassamento della muscolatura liscia bronchiale. Desensibilizzazione recettoriale e coinvolgimento di altri tessuti spiegano perché la risposta clinica e gli eventi avversi non seguano necessariamente una curva semplice."
      },
      {
        "title": "Muscarinici e tono vagale",
        "text": "Il tono parasimpatico broncocostrittore è mediato soprattutto da specifici recettori muscarinici. Antimuscarinici e agonisti β2 producono entrambi broncodilatazione ma agiscono su bersagli distinti."
      },
      {
        "title": "Infiammazione e terapia di fondo",
        "text": "Corticosteroidi inalatori e altri antiinfiammatori agiscono su processi diversi dalla contrazione bronchiale acuta. Una necessità crescente di farmaco di sollievo deve essere valutata come possibile segno di controllo insufficiente, non semplicemente compensata aumentando indiscriminatamente dosi."
      }
    ],
    "drugs": [
      "salbutamolo",
      "propranololo"
    ],
    "targets": [
      "ADRB2"
    ],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "acidita-gastrica",
    "volume": 11,
    "title": "Secrezione acida e protezione gastrointestinale",
    "lead": "Pompa protonica, istamina e prostaglandine.",
    "sections": [
      {
        "title": "Cellula parietale",
        "text": "La H⁺/K⁺-ATPasi nella membrana canalicolare della cellula parietale è l'effettore finale della secrezione di acido. Acetilcolina, istamina e gastrina modulano l'attività attraverso vie intracellulari differenti."
      },
      {
        "title": "Inibitori della pompa protonica",
        "text": "Molti IPP sono profarmaci che si attivano nell'ambiente acido dei canalicoli e inibiscono irreversibilmente la pompa. La durata della soppressione acida può superare l'emivita plasmatica perché dipende dal ricambio delle pompe."
      },
      {
        "title": "Antagonisti H2",
        "text": "L'antagonismo dei recettori H2 riduce una componente della stimolazione cAMP-dipendente della secrezione acida. È un bersaglio diverso dalla pompa terminale e differisce per intensità e tempistica della risposta."
      },
      {
        "title": "FANS, mucosa e rischio emorragico",
        "text": "Riducendo prostaglandine protettive, alcuni FANS aumentano il rischio di lesioni gastriche. La scelta di una gastroprotezione non cancella altre tossicità renali o cardiovascolari dei FANS."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antibiotici-beta-lattamici",
    "volume": 12,
    "title": "Antibatterici β-lattamici e parete cellulare",
    "lead": "PBP, tempo sopra MIC e resistenze.",
    "sections": [
      {
        "title": "Peptidoglicano come bersaglio",
        "text": "Le penicillin-binding proteins catalizzano reazioni nella sintesi della parete batterica. I β-lattamici possono inattivare queste proteine e ostacolare la reticolazione del peptidoglicano, con conseguenze importanti nei batteri in crescita."
      },
      {
        "title": "Selettività antibatterica",
        "text": "Le cellule umane non producono peptidoglicano, circostanza che contribuisce alla selettività dei farmaci. Ciò non significa assenza di tossicità: reazioni di ipersensibilità e altri eventi avversi sono possibili."
      },
      {
        "title": "PK/PD e concentrazioni",
        "text": "Per numerosi β-lattamici conta il tempo durante il quale la frazione libera rimane sopra MIC del patogeno (fT>MIC). Questo non è lo stesso indice PK/PD che guida tutte le classi di antibiotici."
      },
      {
        "title": "Resistenza",
        "text": "β-lattamasi, modifica delle PBP, variazioni di permeabilità ed efflusso possono ridurre sensibilità. La MIC ha significato solo in relazione a specie, metodo e breakpoint pertinenti; non equivale da sola a una dose prescrivibile."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antibiotico-resistenze",
    "volume": 12,
    "title": "Antibiotico-resistenza e stewardship",
    "lead": "Dal bersaglio alla pressione selettiva delle popolazioni.",
    "sections": [
      {
        "title": "Resistenza intrinseca e acquisita",
        "text": "Alcune specie sono naturalmente prive del bersaglio o impermeabili a un antibiotico, mentre altre acquisiscono mutazioni o geni di resistenza. La resistenza descrive interazioni fra patogeno e farmaco, non una proprietà assoluta del medicinale."
      },
      {
        "title": "Fenotipi e laboratorio",
        "text": "Antibiogramma, MIC e breakpoint clinici guidano l'interpretazione microbiologica. Un test in vitro deve essere tradotto nel contesto di sede dell'infezione, penetrazione del farmaco e caratteristiche dell'ospite."
      },
      {
        "title": "Selezione e uso razionale",
        "text": "L'esposizione agli antibiotici può selezionare popolazioni resistenti. La stewardship integra indicazione, spettro, durata, microbiologia e sicurezza, evitando l'idea che più ampio sia sempre migliore."
      },
      {
        "title": "Effetti sul microbiota",
        "text": "La terapia antibiotica modifica popolazioni microbiche anche al di fuori del sito infetto, contribuendo a effetti collaterali e selezione. I rischi sono diversi per classe e composto; non è corretto attribuirli indistintamente a tutti gli antibiotici."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antivirali",
    "volume": 13,
    "title": "Antivirali e replicazione virale",
    "lead": "Analoghi nucleosidici, polimerasi e mutazioni.",
    "sections": [
      {
        "title": "Virus e bersagli di replicazione",
        "text": "Le fasi del ciclo virale includono ingresso, uncoating, trascrizione, replicazione, assemblaggio e rilascio, ma la sequenza e gli enzimi dipendono dal virus. Gli antivirali devono essere descritti attraverso il bersaglio esatto e il patogeno sensibile."
      },
      {
        "title": "Analoghi nucleosidici/nucleotidici",
        "text": "Molte molecole richiedono fosforilazione o altre attivazioni prima di interferire con enzimi di sintesi degli acidi nucleici. Non tutte funzionano come terminatori obbligati di catena: alcune alterano fedeltà o cinetica della polimerasi."
      },
      {
        "title": "Selettività e tossicità",
        "text": "Differenze fra enzimi virali e cellulari contribuiscono alla selettività, ma alcuni metaboliti possono interagire con enzimi dell'ospite. Disponibilità nel tessuto e latenza virale modificano la risposta."
      },
      {
        "title": "Resistenza antivirale",
        "text": "Mutazioni negli enzimi bersaglio o nell'attivazione del profarmaco possono diminuire sensibilità. Il confronto fra farmaci richiede genotipo, esposizione e scenario clinico, non un generico effetto 'anti-virus'."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "antifungini",
    "volume": 13,
    "title": "Antifungini e membrana cellulare",
    "lead": "Ergosterolo, parete e selective toxicity.",
    "sections": [
      {
        "title": "Membrana fungina",
        "text": "I funghi sono eucarioti: i bersagli devono essere abbastanza diversi dalle cellule umane per avere una finestra terapeutica. L'ergosterolo e alcuni enzimi della sua biosintesi costituiscono punti di vulnerabilità."
      },
      {
        "title": "Azoli e lanosterolo demetilasi",
        "text": "Gli azoli inibiscono la 14α-demetilasi coinvolta nella sintesi di ergosterolo. Le interazioni su CYP umani variano fra farmaci e rendono importante il contesto delle terapie concomitanti."
      },
      {
        "title": "Polieni ed echinocandine",
        "text": "I polieni si legano a steroli della membrana mentre le echinocandine inibiscono la sintesi di β-1,3-glucano della parete; il bersaglio è differente e cambia lo spettro d'azione."
      },
      {
        "title": "Sito di infezione e farmacocinetica",
        "text": "Penetrazione nel SNC, escrezione renale, biodisponibilità orale e vie alternative possono determinare differenze cliniche importanti. Il termine 'antifungino' non predice da solo un profilo adatto a ogni infezione."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "oncologia-citotossici",
    "volume": 14,
    "title": "Chemioterapici citotossici e ciclo cellulare",
    "lead": "DNA, fuso mitotico e tossicità dei tessuti proliferanti.",
    "sections": [
      {
        "title": "Farmaci che danneggiano il DNA",
        "text": "Agenti alchilanti, derivati del platino e altri composti possono interferire con replicazione e integrità del DNA tramite meccanismi diversi. L'efficacia dipende da riparazione cellulare, ciclo e sensibilità del tumore."
      },
      {
        "title": "Antimetaboliti",
        "text": "Analoghi dei nucleosidi e antagonisti di vie metaboliche possono ostacolare sintesi di nucleotidi o replicazione. La modalità di attivazione, il trasportatore e l'enzima bersaglio definiscono la molecola, non la sola categoria 'antimetabolita'."
      },
      {
        "title": "Microtubuli",
        "text": "Farmaci che stabilizzano o destabilizzano i microtubuli interferiscono con la dinamica del fuso e altre funzioni cellulari. Le conseguenze dipendono anche da crescita tumorale e suscettibilità dei tessuti sani."
      },
      {
        "title": "Tossicità e finestra terapeutica",
        "text": "Midollo osseo, mucose, nervi e altri tessuti possono essere colpiti a seconda del farmaco. La combinazione di molecole richiede valutazione di efficacia e tossicità cumulativa, non semplicemente di meccanismi indipendenti."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "oncologia-immunoterapia",
    "volume": 14,
    "title": "Checkpoint immunitari, anticorpi e ADC",
    "lead": "Dalla sinapsi immunologica alla risposta oncologica.",
    "sections": [
      {
        "title": "Checkpoint PD-1/PD-L1 e CTLA-4",
        "text": "Vie immunoregolatorie limitano l'attivazione dei linfociti: l'antagonismo farmacologico può riattivare risposte antitumorali in sottogruppi definiti. Non tutti i tumori rispondono allo stesso modo e la presenza del bersaglio non garantisce efficacia."
      },
      {
        "title": "Tossicità immunomediata",
        "text": "Potenziare una risposta immunitaria può produrre infiammazione in tessuti sani. Questo tipo di evento non va letto come semplice citotossicità dose-dipendente tradizionale."
      },
      {
        "title": "Antibody-drug conjugates",
        "text": "Gli ADC combinano anticorpo diretto verso antigene, linker e payload, spesso citotossico. L'effetto dipende da internalizzazione, stabilità del linker, eterogeneità del bersaglio e rilascio del payload."
      },
      {
        "title": "Biomarcatori e resistenze",
        "text": "Espressione antigenica, microambiente, clonabilità e vie di fuga condizionano l'attività. Gli esiti clinici sono definiti dagli studi in una popolazione, non inferibili dalle sole strutture 3D dei complessi."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "anticorpi-biologici",
    "volume": 15,
    "title": "Farmaci biologici, anticorpi e biosimilari",
    "lead": "Produzione ricombinante, struttura ed evidenza.",
    "sections": [
      {
        "title": "Proteine come prodotti complessi",
        "text": "Molti biotecnologici sono macromolecole con strutture, modificazioni post-traduzionali e formulazioni delicate. La sequenza primaria non definisce da sola tutte le proprietà del prodotto finito."
      },
      {
        "title": "Anticorpi monoclonali",
        "text": "La porzione variabile conferisce riconoscimento dell'antigene, mentre la regione Fc può interagire con recettori immunitari e influenzare distribuzione ed emivita. Alcuni anticorpi non sono progettati per attivare citotossicità effettrice."
      },
      {
        "title": "Immunogenicità e farmacocinetica",
        "text": "Anticorpi anti-farmaco, riciclo FcRn ed eliminazione mediata dal bersaglio possono modificare la cinetica. L'assorbimento sottocutaneo e i tempi di distribuzione differiscono da quelli tipici di piccole molecole."
      },
      {
        "title": "Biosimilari",
        "text": "Un biosimilare richiede una valutazione comparativa strutturale, funzionale e clinica secondo i requisiti regolatori. Non è corretto applicare meccanicamente il paradigma chimico dei generici a una proteina complessa."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "oculistica-dermatologia",
    "volume": 16,
    "title": "Farmacologia degli organi speciali",
    "lead": "Perché sede, formulazione e barriera contano.",
    "sections": [
      {
        "title": "Occhio come compartimento",
        "text": "Barriere anatomiche e deflusso dell'umor acqueo influenzano distribuzione ed effetto dei farmaci oftalmici. La via topica è utile per agire localmente, ma può determinare assorbimento sistemico e reazioni avverse."
      },
      {
        "title": "Cute e formulazione",
        "text": "Strato corneo, infiammazione, idratazione e superficie trattata modificano l'assorbimento cutaneo. Una stessa molecola può avere potenza ed esposizione differenti a seconda di veicolo e formulazione."
      },
      {
        "title": "Farmaci inalatori, topici e sistemici",
        "text": "La somministrazione in sede non assicura assenza di effetti fuori bersaglio. È importante distinguere quantità nominale erogata, frazione realmente depositata e concentrazione al bersaglio."
      },
      {
        "title": "Indicazione specialistica",
        "text": "Le linee guida variano per patologia e organo. Un principio attivo usato in dermatologia o oculistica non porta con sé le stesse indicazioni per tutte le forme e concentrazioni del prodotto."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "farmacogenomica",
    "volume": 17,
    "title": "Farmacogenomica e variabilità della risposta",
    "lead": "CYP, trasportatori, bersagli e raccomandazioni contestuali.",
    "sections": [
      {
        "title": "Genotipo, fenotipo e attività enzimatica",
        "text": "Alleli di geni metabolici possono influenzare attività e produzione di metaboliti. La categorizzazione in fenotipi come metabolizzatore lento, intermedio o normale è specifica del gene e della combinazione allelica."
      },
      {
        "title": "Pro-farmaci e inversione dell'effetto",
        "text": "Per un farmaco attivo, attività metabolica ridotta può aumentare concentrazioni del parent; per un profarmaco può ridurre la formazione del metabolita efficace. Clopidogrel/CYP2C19 è un esempio didattico centrale."
      },
      {
        "title": "Trasportatori e farmacodinamica",
        "text": "Varianti dei trasportatori o dei bersagli possono modificare disponibilità o sensibilità al farmaco. Non tutte le associazioni genetiche hanno prova sufficiente per modificarne l'uso clinico."
      },
      {
        "title": "Interpretare una raccomandazione",
        "text": "Le linee guida farmacogenetiche considerano alleli, validità analitica, forza dell'evidenza e contesto regolatorio. Una correlazione osservazionale isolata non è una regola prescrittiva generale."
      }
    ],
    "drugs": [
      "clopidogrel",
      "metoprololo",
      "nebivololo"
    ],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "popolazioni-speciali",
    "volume": 17,
    "title": "Età, rene, fegato e gravidanza",
    "lead": "Quando cambiano esposizione e suscettibilità.",
    "sections": [
      {
        "title": "Funzione renale",
        "text": "Filtrazione, secrezione e riassorbimento tubulare contribuiscono all'eliminazione di molte sostanze. La misura di eGFR non equivale sempre alla clearance del singolo farmaco, specie quando contano secrezione o metaboliti attivi."
      },
      {
        "title": "Funzione epatica e primo passaggio",
        "text": "La riduzione della capacità metabolica può cambiare biodisponibilità ed eliminazione, ma i parametri non sono tutti predetti dal solo valore di una transaminasi. Le vie di metabolismo e il flusso epatico differiscono fra molecole."
      },
      {
        "title": "Pediatria e geriatria",
        "text": "Volume di distribuzione, composizione corporea, maturazione enzimatica e politerapia modificano la risposta. Le scelte sono sostanza- e indicazione-specifiche: ridurre o aumentare una dose per la sola età può essere scorretto."
      },
      {
        "title": "Gravidanza e allattamento",
        "text": "Trasferimento placentare, modifiche fisiologiche della gravidanza e secrezione nel latte richiedono fonti e valutazioni dedicate. Una raccomandazione terapeutica non può essere derivata automaticamente da un rischio strutturale osservato in vitro."
      }
    ],
    "drugs": [
      "digossina",
      "ramipril",
      "apixaban"
    ],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  },
  {
    "id": "evidence-bias",
    "volume": 18,
    "title": "Bias, intervalli di confidenza e trasparenza degli studi",
    "lead": "Non basta leggere che uno studio è statisticamente significativo.",
    "sections": [
      {
        "title": "Domanda PICO e comparatore",
        "text": "Popolazione, intervento, comparatore e outcome definiscono che cosa uno studio può rispondere. Un trial placebo-controllato e uno di non inferiorità rispetto a una terapia attiva non offrono lo stesso tipo di inferenza."
      },
      {
        "title": "Rischio relativo e differenza assoluta",
        "text": "Una riduzione relativa del 30% può significare differenze assolute molto diverse a seconda del rischio iniziale. Presentare sempre rischi di entrambi i gruppi, durata e outcome evita di trasformare una statistica in un messaggio promozionale."
      },
      {
        "title": "Hazard ratio e NNT",
        "text": "L'HR confronta hazard nel tempo in un'analisi di sopravvivenza; non coincide con RR cumulativo. Per derivare un NNT a un orizzonte specifico servono rischi assoluti appropriati o curve di sopravvivenza, non il solo HR."
      },
      {
        "title": "Randomizzazione, cecità e perdita al follow-up",
        "text": "La randomizzazione riduce confondimento atteso ma non elimina ogni rischio di bias. Aderenza, passaggi di trattamento, missing data e analisi multiple possono influenzare il risultato e la certezza delle conclusioni."
      },
      {
        "title": "Significatività e importanza clinica",
        "text": "Un p-value non misura la probabilità che un'ipotesi sia vera né quantifica l'importanza clinica. Intervalli di confidenza, riproducibilità, endpoint paziente-rilevanti e qualità dell'evidenza sono necessari per interpretare un beneficio."
      }
    ],
    "drugs": [],
    "targets": [],
    "review": "Sintesi originale a scopo didattico; indicazioni e dati quantitativi richiedono consultazione della fonte versionata."
  }
];
