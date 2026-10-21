/* ELIX: capitoli originali + biblioteca di linee guida versionate, nessuna riproduzione di manuali protetti. */
export const CHAPTERS_09=[
  {
    "id": "first-pass-avanzato",
    "volume": 3,
    "title": "Metabolismo di primo passaggio: dall'intestino al fegato",
    "lead": "Perché biodisponibilità, dose e via non sono intercambiabili.",
    "sections": [
      {
        "title": "Passaggio presistemico",
        "text": "Dopo una somministrazione orale, la molecola può essere assorbita dall'intestino ma non raggiungere integralmente la circolazione sistemica immodificata. Metabolismo negli enterociti ed estrazione epatica portale possono ridurne l'esposizione. È essenziale distinguere assorbimento, biodisponibilità e metabolismo di primo passaggio: un farmaco può essere ben assorbito e avere comunque una F sistemica bassa."
      },
      {
        "title": "Frazione di estrazione e modello concettuale",
        "text": "La frazione rimossa dal fegato a ogni passaggio è descritta, in modelli appropriati, dal rapporto di estrazione epatica. La clearance epatica può dipendere da flusso sanguigno, legame proteico e capacità intrinseca dei sistemi enzimatici. Un rapporto di estrazione elevato rende talvolta la clearance più sensibile al flusso; uno basso può renderla più sensibile a metabolismo e legame, secondo le ipotesi adottate."
      },
      {
        "title": "Non linearità e saturazione",
        "text": "Alcuni enzimi e trasportatori hanno capacità finita. Un aumento della dose orale può produrre un incremento di AUC più che proporzionale quando una via presistemica si satura. Per questo l'uso di una semplice retta dose–concentrazione può risultare erroneo: serve conoscere farmaco, intervallo di esposizione e formulazione."
      },
      {
        "title": "Caso metoprololo",
        "text": "Nei documenti di prodotto metoprololo può mostrare un primo passaggio marcato, metabolismo soprattutto CYP2D6 ed esposizione variabile fra fenotipi metabolici. Il succinato a rilascio prolungato presenta inoltre dati di biodisponibilità relativa che non vanno scambiati per la F assoluta della molecola. L'informazione clinicamente utilizzabile deriva dalla formulazione e dall'indicazione riportate nella fonte specifica."
      }
    ],
    "drugs": [
      "metoprololo",
      "propranololo",
      "nitroglicerina"
    ],
    "targets": [
      "CYP2D6"
    ],
    "sources": [
      "ema-smPC"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "pro-farmaci-metaboliti-attivi",
    "volume": 3,
    "title": "Profarmaci e metaboliti farmacologicamente attivi",
    "lead": "Seguire ciascuna specie chimica nella catena effetto–eliminazione.",
    "sections": [
      {
        "title": "Parent, profarmaco, metabolita",
        "text": "Il composto somministrato non è necessariamente quello che lega il bersaglio responsabile dell'effetto. Un profarmaco richiede un passaggio metabolico per generare una specie attiva; altri farmaci attivi producono anche metaboliti che partecipano al beneficio o alla tossicità. Ogni specie deve essere registrata con un'identità distinta, senza trasferire automaticamente l'affinità o l'emivita del parent."
      },
      {
        "title": "Attivazione enzimatica",
        "text": "Ramipril ed enalapril vengono convertiti ai corrispondenti metaboliti attivi, mentre clopidogrel richiede bioattivazione metabolica complessa. In questi casi una minore attività dell'enzima responsabile può diminuire l'attivazione invece di aumentare semplicemente l'effetto del parent. È il motivo per cui farmacogenomica ed interazioni enzimatiche non possono essere interpretate con una regola unica."
      },
      {
        "title": "Metaboliti e finestra terapeutica",
        "text": "Metaboliti attivi possono accumularsi se la loro eliminazione è compromessa o se le vie metaboliche cambiano. La durata della risposta può perciò riflettere emivite diverse di parent e metaboliti, legame prolungato al bersaglio o ricambio dell'effettore. Una singola emivita sul foglietto non rappresenta necessariamente il tempo di cessazione dell'effetto."
      },
      {
        "title": "Metaboliti inattivi e prove",
        "text": "L'individuazione di un metabolita nel plasma non dimostra automaticamente che abbia un'attività terapeutica. Per qualificarlo come attivo servono evidenze di legame o risposta farmacologica, concentrazione rilevante e, dove necessario, dati clinici. ELIX non classificherà un metabolita come attivo solo perché è descritto nella sezione metabolismo."
      }
    ],
    "drugs": [
      "ramipril",
      "enalapril",
      "clopidogrel",
      "spironolattone"
    ],
    "targets": [
      "CYP2C19"
    ],
    "sources": [
      "cpic-clopidogrel"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "clearance-biliare-renale",
    "volume": 3,
    "title": "Escrezione renale, biliare e clearance totale",
    "lead": "Il destino del farmaco non coincide con una sola via metabolica.",
    "sections": [
      {
        "title": "Filtrazione, secrezione e riassorbimento",
        "text": "Nel rene la quota libera può essere filtrata, alcune molecole sono secrete attivamente attraverso trasportatori, e il riassorbimento dipende anche da pH, lipofilia e fisiologia tubulare. La clearance renale non coincide sempre con eGFR: il coinvolgimento della secrezione rende possibile una discrepanza sostanziale, soprattutto in presenza di inibitori dei trasportatori."
      },
      {
        "title": "Bile, intestino e circolo enteroepatico",
        "text": "L'escrezione biliare può trasferire farmaci o coniugati nell'intestino. Enzimi intestinali o microbici possono trasformare i metaboliti ed eventualmente permettere un riassorbimento della specie attiva. Quando rilevante, il circolo enteroepatico può contribuire a picchi tardivi, prolungamento dell'esposizione e variabilità tra pazienti."
      },
      {
        "title": "Clearance e semivita",
        "text": "In un modello lineare monocompartimentale vale t½ ≈ 0,693 × Vd / CL. Se Vd e CL cambiano contemporaneamente, prevedere la variazione dell'emivita dal solo calo della funzione renale è impreciso. Farmaci multicompartimentali, cinetiche non lineari e metaboliti attivi richiedono modelli più dettagliati e misure appropriate."
      },
      {
        "title": "Anziano, CKD e dialisi",
        "text": "La compromissione renale può modificare esposizione di farmaco e metaboliti, mentre dialisi e terapie sostitutive introducono nuove vie di rimozione dipendenti da massa molecolare, legame proteico e distribuzione. Uno stesso valore eGFR non determina un unico aggiustamento per tutti i farmaci. Le decisioni cliniche appartengono alle indicazioni aggiornate del prodotto e alle linee guida specifiche."
      }
    ],
    "drugs": [
      "digossina",
      "enoxaparina",
      "fondaparinux",
      "dapagliflozin"
    ],
    "targets": [
      "SLC5A2"
    ],
    "sources": [
      "kdigo-2024"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "vie-somministrazione-biopharm",
    "volume": 3,
    "title": "Vie di somministrazione e tecnologie farmaceutiche",
    "lead": "Lo stesso principio attivo non è lo stesso medicinale in tutte le forme.",
    "sections": [
      {
        "title": "Orale, sublinguale, parenterale",
        "text": "La via orale coinvolge dissoluzione, assorbimento e primo passaggio. La via sublinguale può in certi farmaci ridurre il metabolismo presistemico, mentre quella endovenosa porta il principio attivo direttamente nel compartimento sistemico. La biodisponibilità EV è per definizione completa per la quota somministrata, ma non significa che la concentrazione al bersaglio sia immediata o uguale in ogni tessuto."
      },
      {
        "title": "Inalazione e somministrazione locale",
        "text": "Un inalatore produce deposizione nelle vie respiratorie influenzata da dispositivo, tecnica, diametro delle particelle e anatomia. Una parte del farmaco può essere deglutita o assorbita sistemicamente: ciò spiega perché un trattamento locale possa produrre effetti extrapolmonari. Dose nominale, dose erogata e dose polmonare non sono sinonimi."
      },
      {
        "title": "Transdermica e deposito",
        "text": "Formulazioni transdermiche mirano a un rilascio prolungato attraversando la barriera cutanea; cerotti diversi non sono necessariamente intercambiabili. Le formulazioni depot intramuscolari o sottocutanee possono avere una fase lenta di assorbimento che domina la durata apparente dell'esposizione, creando una cosiddetta cinetica flip-flop in condizioni appropriate."
      },
      {
        "title": "Somministrazione e patologia",
        "text": "Una formulazione adatta alla broncodilatazione rapida non va sostituita automaticamente con la stessa dose nominale di una formulazione a rilascio prolungato. Per alcuni antianginosi, per esempio, la via di somministrazione modifica in modo essenziale rapidità d'azione, disponibilità e durata. Il RCP va interrogato per indicazione e prodotto, non per molecola astratta."
      }
    ],
    "drugs": [
      "salbutamolo",
      "nitroglicerina",
      "metoprololo"
    ],
    "targets": [
      "ADRB2"
    ],
    "sources": [
      "ema-smPC",
      "gina-2026"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "formulazioni-sali-bioequivalenza",
    "volume": 3,
    "title": "Sali, stereoisomeri, generici e bioequivalenza",
    "lead": "Separare identità chimica, potenza e tecnologia della confezione.",
    "sections": [
      {
        "title": "Sali e quantità equivalenti",
        "text": "Una dose espressa come sale può non corrispondere in massa alla quantità di base libera; diversi prodotti possono dichiarare il dosaggio secondo convenzioni regolatorie specifiche. Trasferire milligrammi fra forme chimiche senza interpretare la dichiarazione di etichetta può quindi essere scorretto. Nel database parent, sale, stereoisomero e formulazione devono avere collegamenti, non essere fusi."
      },
      {
        "title": "Rilascio immediato o modificato",
        "text": "Formulazioni a rilascio prolungato possono cambiare Tmax, Cmax, fluttuazioni e durata dell'esposizione, talvolta senza modificare proporzionalmente l'AUC. Non è rigoroso dedurre da una sola cifra di emivita che due preparazioni possano essere somministrate con lo stesso intervallo."
      },
      {
        "title": "Bioequivalenza versus identità",
        "text": "La valutazione di bioequivalenza confronta in condizioni definite misure di esposizione fra un prodotto e uno di riferimento. Non significa composizione identica né garantisce che si possano applicare tali risultati a qualunque combinazione di formulazioni o modalità di somministrazione."
      },
      {
        "title": "Biologici e biosimilari",
        "text": "Per proteine, anticorpi e altri medicinali complessi, la comparabilità considera struttura, funzione, impurità e parametri appropriati. L'analogia con sali e generici di piccole molecole non è completa. Non bisogna attribuire a un biologico una singola formula o curve PK tipiche delle piccole molecole quando le proprietà reali sono distribuzionali o multimodali."
      }
    ],
    "drugs": [
      "metoprololo",
      "eparina",
      "enoxaparina"
    ],
    "targets": [],
    "sources": [
      "ema-smPC"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "dose-effetto-finestra",
    "volume": 2,
    "title": "Concentrazione, occupazione recettoriale e dose–risposta",
    "lead": "Costruire curve senza spacciare un modello per un dato clinico.",
    "sections": [
      {
        "title": "Dose e concentrazione",
        "text": "La dose somministrata non è la concentrazione plasmatica, e quest'ultima non è necessariamente la concentrazione libera nel microambiente del bersaglio. Un modello PK descrive il ponte fra input ed esposizione, mentre un modello PD collega esposizione ed effetto. Confondere questi due livelli porta a previsioni ingannevoli anche quando il valore EC50 è reale."
      },
      {
        "title": "Saturazione e modello di Hill",
        "text": "In un modello ideale Emax, la frazione della risposta può essere rappresentata da C^n/(EC50^n + C^n). Il coefficiente n descrive la ripidità della curva nel sistema considerato; impostarlo uguale a uno è un'ipotesi didattica, non un parametro stimato. Un singolo EC50 sperimentale non definisce da solo n, Emax clinico o tossicità."
      },
      {
        "title": "Affinità e selettività",
        "text": "Kd descrive equilibrio di binding in condizioni appropriate; Ki deriva da un modello di inibizione/competizione, e IC50 dipende da substrato, tempo e saggio. Una misura su recettore umano in vitro non implica un effetto terapeutico nell'uomo alle medesime concentrazioni. Confrontare molecole richiede compatibilità di esperimenti e unità."
      },
      {
        "title": "Intervallo terapeutico e rischi",
        "text": "Gli effetti benefici e indesiderati possono coinvolgere bersagli diversi, comparire a esposizioni differenti o dipendere dal tempo. In alcuni farmaci l'efficacia si satura prima dell'incremento del rischio; in altri la finestra è stretta. Per dare informazioni cliniche una curva deve essere basata su dati specifici per popolazione e indicazione e sottoposta a validazione, non calcolata da un Ki isolato."
      }
    ],
    "drugs": [
      "salbutamolo",
      "propranololo",
      "digossina"
    ],
    "targets": [
      "ADRB2"
    ],
    "sources": [
      "ema-smPC"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "posologia-per-indicazione",
    "volume": 17,
    "title": "Come leggere la posologia per indicazione",
    "lead": "Dalla diagnosi al RCP: non esiste una dose universale per molecola.",
    "sections": [
      {
        "title": "Sezioni 4.1, 4.2 e 5.2 del RCP",
        "text": "La sezione 4.1 del riassunto delle caratteristiche del prodotto definisce indicazioni autorizzate e popolazioni pertinenti; 4.2 descrive dose, titolazione, via, intervallo, durata e aggiustamenti; 5.2 riguarda farmacocinetica. Il nome di un principio attivo non può sostituire il documento della specifica specialità medicinale."
      },
      {
        "title": "Prodotto e giurisdizione",
        "text": "Un medicinale può avere indicazioni o modalità di impiego differenti in Italia, nell'Unione europea e negli Stati Uniti. Una label FDA consultata da ELIX è utile per lo studio della farmacologia del prodotto, ma non è il RCP italiano e non autorizza a trasferire automaticamente dosi e popolazioni."
      },
      {
        "title": "Titolazione, monitoraggio e controindicazioni",
        "text": "Molti regimi richiedono variazioni successive guidate da efficacia, tollerabilità, parametri clinici o esami; altri prevedono dosi fisse per un determinato periodo. La logica della titolazione deve essere ricostruita dalla patologia, non soltanto dalla potenza recettoriale: sintomi, frequenza, organi emuntori e terapie concomitanti possono cambiare il rapporto beneficio-rischio."
      },
      {
        "title": "Lezioni dal metoprololo",
        "text": "Il metoprololo succinato a rilascio prolungato ha sezioni posologiche distinte, negli USA, per ipertensione, angina e scompenso. La singola cifratura di milligrammi senza indicazione né forma farmaceutica sarebbe fuorviante. Nel navigatore di ELIX è possibile leggere separatamente le voci originali della label, mantenendo visibile prodotto, via e versione."
      }
    ],
    "drugs": [
      "metoprololo",
      "bisoprololo",
      "dapagliflozin"
    ],
    "targets": [],
    "sources": [
      "ema-smPC",
      "esc-hypertension-2024"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "farmacocinetica-stato-stazionario",
    "volume": 3,
    "title": "Accumulo, steady state e monitoraggio",
    "lead": "I tempi della terapia raccontano storie diverse.",
    "sections": [
      {
        "title": "Tempo e stato stazionario",
        "text": "Nei modelli lineari con somministrazioni ripetute, l'avvicinamento allo steady state è governato soprattutto dall'emivita del sistema, con proporzioni note dopo un certo numero di emivite. Tale principio richiede cautela in presenza di multipli compartimenti, metaboliti attivi, cinetica saturabile e rilascio controllato."
      },
      {
        "title": "Dose di carico e mantenimento",
        "text": "La dose di carico mira a raggiungere una concentrazione iniziale secondo un volume di distribuzione appropriato, mentre il mantenimento deve compensare l'eliminazione in relazione a clearance e biodisponibilità. Le formule sono modelli; i valori di una persona reale richiedono parametro farmacocinetico misurato, via, indicazione e obiettivi clinici."
      },
      {
        "title": "Cmax, Cmin, AUC e concentrazione libera",
        "text": "Cmax e Cmin esprimono un picco e una valle osservati nel periodo, mentre AUC integra l'esposizione nel tempo. La quota libera può essere farmacologicamente rilevante e modificarsi in situazioni di ipoalbuminemia o cambiamento delle proteine plasmatiche. La relazione con efficacia o tossicità è farmaco-specifica."
      },
      {
        "title": "Monitoraggio terapeutico",
        "text": "Il therapeutic drug monitoring interpreta la concentrazione soltanto se si conoscono momento del campione, numero di dosi, via, formulazione, funzione emuntoria e clinica. Per digossina e altri farmaci una misurazione troppo precoce rispetto alla fase distributiva può essere fuorviante. Il numero in laboratorio non sostituisce sintomi, ECG o altri segnali di tossicità."
      }
    ],
    "drugs": [
      "digossina",
      "amiodarone",
      "metoprololo"
    ],
    "targets": [],
    "sources": [
      "ema-smPC"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "metabolismo-farmacogenetica",
    "volume": 17,
    "title": "Farmacogenetica applicata a profarmaci e sostanze attive",
    "lead": "Perché il medesimo allele può produrre conseguenze opposte.",
    "sections": [
      {
        "title": "CYP come elemento di variabilità",
        "text": "Varianti genetiche possono ridurre, mantenere o aumentare l'attività funzionale di specifici enzimi. I fenotipi non sono validi per qualunque sostanza che attraversa il fegato: bisogna conoscere la quota di clearance mediata da quell'enzima, altre vie e le condizioni di inibizione o induzione."
      },
      {
        "title": "Clopidogrel e CYP2C19",
        "text": "La bioattivazione di clopidogrel coinvolge CYP2C19 e ulteriori passaggi. Nei portatori di fenotipi a ridotta funzione può diminuire la quantità di metabolita attivo e la risposta antiaggregante. CPIC dispone di una linea guida gene–farmaco aggiornata al 2022 per interpretare risultati farmacogenetici in contesti clinici definiti."
      },
      {
        "title": "Metoprololo e CYP2D6",
        "text": "Metoprololo è un principio attivo direttamente farmacologico metabolizzato in larga parte da CYP2D6: una minore attività può aumentarne l'esposizione, con un effetto diverso rispetto alla bioattivazione di un profarmaco. Alcune interazioni con inibitori enzimatici possono produrre una fenomenologia simile a un fenotipo metabolico diverso."
      },
      {
        "title": "Interpretazione in pratica",
        "text": "Un risultato genetico non prescrive da solo una dose. Le indicazioni di una linea guida farmacogenetica hanno condizioni d'applicazione, forza dell'evidenza e alternative terapeutiche considerate. Gli altri determinanti includono funzione d'organo, comorbilità, interazioni e indicazione."
      }
    ],
    "drugs": [
      "clopidogrel",
      "metoprololo",
      "nebivololo"
    ],
    "targets": [
      "CYP2C19",
      "CYP2D6"
    ],
    "sources": [
      "cpic-clopidogrel"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "dosaggi-special-pop",
    "volume": 17,
    "title": "Aggiustamenti in pazienti particolari",
    "lead": "Funzione renale, fegato, età e interazioni prima di interpretare una dose.",
    "sections": [
      {
        "title": "Funzione renale e metaboliti attivi",
        "text": "Se l'eliminazione renale è importante, la diminuzione della funzione può aumentare AUC e prolungare l'emivita. Ma trasportatori, quota libera e formazione di metaboliti possono cambiare indipendentemente; non basta moltiplicare la dose per un rapporto di eGFR. La documentazione di prodotto può usare soglie e formule diverse da quelle impiegate per la stadiazione CKD."
      },
      {
        "title": "Funzione epatica e flusso",
        "text": "La malattia epatica può modificare flusso portale, frazione libera, metabolismo di primo passaggio e secrezione biliare. I test epatici isolati non predicono direttamente clearance di un composto. Le variazioni sono particolarmente rilevanti per farmaci con estrazione elevata o interazioni metaboliche significative."
      },
      {
        "title": "Età, gestazione e peso",
        "text": "In pediatria maturano enzimi e trasportatori; nell'anziano mutano frequentemente composizione corporea e comorbilità. La gravidanza altera distribuzione, perfusione e talune vie metaboliche. Il peso da solo non sostituisce criteri di dose basati su superficie corporea, massa magra o protocolli validati per il farmaco."
      },
      {
        "title": "Integrazione delle linee guida",
        "text": "La KDIGO 2024 fornisce raccomandazioni sulla nefropatia cronica e la gestione dei farmaci. Nel 2026 una revisione focalizzata del capitolo terapia è sottoposta a consultazione: una bozza non va trattata come linea guida definitiva. I passaggi della terapia richiedono consultazione del documento corrente, RCP autorizzato e valutazione specialistica."
      }
    ],
    "drugs": [
      "dapagliflozin",
      "empagliflozin",
      "digossina",
      "spironolattone"
    ],
    "targets": [
      "SLC5A2",
      "NR3C2"
    ],
    "sources": [
      "kdigo-2024"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "desensibilizzazione-tolleranza",
    "volume": 2,
    "title": "Desensibilizzazione e tolleranza farmacologica",
    "lead": "La stessa concentrazione può produrre una risposta diversa nel tempo.",
    "sections": [
      {
        "title": "Risposta acuta e adattamento",
        "text": "Una risposta recettoriale iniziale non è sempre stabile con esposizione ripetuta. Fosforilazioni, interazione con arrestine, internalizzazione, aumento o diminuzione dei recettori e regolazione dei secondi messaggeri possono modificare la relazione concentrazione-effetto, anche senza cambiamento dell'esposizione sistemica."
      },
      {
        "title": "Tolleranza farmacodinamica e farmacocinetica",
        "text": "La tolleranza può risultare da adattamenti del bersaglio, vie compensatorie o variazioni di metabolismo e distribuzione. Non tutte le forme sono equivalenti. La tachifilassi descrive riduzione relativamente rapida della risposta, mentre altri adattamenti compaiono lentamente e dipendono dalla specifica sostanza."
      },
      {
        "title": "Agonisti β e sistemi di feedback",
        "text": "Nei GPCR l'esposizione ripetuta può favorire desensibilizzazione e riassetto della cascata. Per gli agonisti β2 bisogna distinguere effetti sintomatici immediati dalla gestione dell'infiammazione nella malattia bronchiale: una maggiore frequenza d'uso non risolve da sola il controllo della patologia."
      },
      {
        "title": "Interruzione e rebound",
        "text": "Sospendere una terapia che ha provocato adattamenti può generare una risposta di rimbalzo o un aggravamento, a seconda della molecola e della situazione clinica. Il profilo non si desume da una regola unica sulla durata di trattamento: la modalità di sospensione appartiene al prodotto e alla specifica indicazione."
      }
    ],
    "drugs": [
      "salbutamolo",
      "propranololo",
      "metoprololo"
    ],
    "targets": [
      "ADRB2"
    ],
    "sources": [
      "gina-2026"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  },
  {
    "id": "fonti-regolazione-evidenza",
    "volume": 18,
    "title": "RCP, trial, linee guida: chi risponde a quale domanda?",
    "lead": "Tre livelli distinti per un atlante scientificamente attendibile.",
    "sections": [
      {
        "title": "RCP: condizioni autorizzate",
        "text": "Il RCP è riferito a un medicinale, una formulazione, una giurisdizione e una data. Descrive indicazioni, posologia, sicurezza, interazioni e farmacocinetica del prodotto; non equivale all'intera letteratura né garantisce che tutte le evidenze più recenti siano già riportate nella versione consultata."
      },
      {
        "title": "Trial: efficacia e rischi misurati",
        "text": "Un trial risponde a una domanda definita da popolazione, intervento, comparatore, endpoint e follow-up. HR, RR, ARR e NNT cambiano significato secondo disegno ed evento. La potenza in vitro non è una misura di rischio clinico, e un nuovo studio promettente non modifica automaticamente una indicazione approvata."
      },
      {
        "title": "Linee guida: sintesi e grado di prova",
        "text": "Una linea guida integra studi, certezza dell'evidenza, benefici, rischi e contesto assistenziale. Le raccomandazioni possono cambiare con gli aggiornamenti. In ELIX ogni collegamento deve mantenere ente, anno, area, status del documento e fonte ufficiale; una bozza in consultazione non ha lo stesso status della versione pubblicata."
      },
      {
        "title": "Manuali di farmacologia",
        "text": "Katzung e Goodman & Gilman aiutano a verificare la copertura degli argomenti: recettori, ADME, interazioni, farmacologia sistemica, sperimentazione e tossicologia. ELIX scrive un trattato originale con proprie spiegazioni e collegamenti, senza riprodurne capitoli o figure protette. I dati quantitativi vanno riconnessi alla fonte primaria, non alla citazione generica del manuale."
      }
    ],
    "drugs": [],
    "targets": [],
    "sources": [
      "ema-smPC",
      "kdigo-2024",
      "gina-2026",
      "esc-hypertension-2024",
      "cpic-clopidogrel"
    ],
    "review": "Testo originale per apprendimento; verificare regolamentazione e linee guida applicabili alla specifica indicazione."
  }
];
export const GUIDELINES_09=[
  {
    "id": "aifa-rcp",
    "name": "AIFA Medicinali · Banca dati farmaci",
    "year": 2026,
    "type": "Registro e RCP italiano",
    "status": "fonte ufficiale, consultazione prodotto",
    "url": "https://medicinali.aifa.gov.it/",
    "note": "Ricerca per prodotto, principio attivo o AIC. Consultare il RCP dello specifico medicinale per indicazioni e posologia in Italia.",
    "drugs": [
      "metoprololo",
      "bisoprololo",
      "ramipril",
      "dapagliflozin",
      "clopidogrel"
    ]
  },
  {
    "id": "ema-smPC",
    "name": "EMA · Summary of Product Characteristics",
    "year": 2024,
    "type": "Standard europeo della scheda prodotto",
    "status": "guida tecnica EMA",
    "url": "https://www.ema.europa.eu/it/human-regulatory-overview/marketing-authorisation/product-information-requirements/how-prepare-review-summary-product-characteristics",
    "note": "Il RCP distingue sezione 4.1 indicazioni, 4.2 posologia e modalità, 5.2 farmacocinetica. Il documento di prodotto va verificato nella versione corrente.",
    "drugs": []
  },
  {
    "id": "gina-2026",
    "name": "GINA · Global Strategy for Asthma Management and Prevention",
    "year": 2026,
    "type": "Linee guida per asma",
    "status": "versione 2026 pubblicata",
    "url": "https://ginasthma.org/2026-gina-strategy-report/",
    "note": "Indicazioni generali e aggiornamenti per controllo dell'asma e strategie farmacologiche; il farmaco specifico va confrontato con indicazioni autorizzate locali.",
    "drugs": [
      "salbutamolo",
      "propranololo"
    ]
  },
  {
    "id": "kdigo-2024",
    "name": "KDIGO · Clinical Practice Guideline for CKD",
    "year": 2024,
    "type": "Linee guida nefrologiche",
    "status": "versione pubblicata; aggiornamento 2027 in consultazione nel 2026",
    "url": "https://kdigo.org/guidelines/ckd-evaluation-and-management/",
    "note": "Il capitolo di gestione terapeutica comprende RASi, SGLT2-inibitori, GLP-1RA e gestione del rischio renale. La bozza 2027 non sostituisce la linea guida pubblicata.",
    "drugs": [
      "dapagliflozin",
      "empagliflozin",
      "ramipril",
      "losartan",
      "spironolattone"
    ]
  },
  {
    "id": "esc-hypertension-2024",
    "name": "ESC · Elevated Blood Pressure and Hypertension",
    "year": 2024,
    "type": "Linee guida cardiovascolari",
    "status": "versione 2024 pubblicata (corrigendum 2025)",
    "url": "https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/elevated-blood-pressure-and-hypertension/",
    "note": "Inquadra trattamento farmacologico dell'ipertensione, rischio e associazioni; la linea guida non sostituisce il RCP di una specifica specialità.",
    "drugs": [
      "bisoprololo",
      "amlodipina",
      "ramipril",
      "losartan",
      "valsartan",
      "idroclorotiazide"
    ]
  },
  {
    "id": "cpic-clopidogrel",
    "name": "CPIC · CYP2C19 and Clopidogrel Therapy",
    "year": 2022,
    "type": "Farmacogenetica",
    "status": "aggiornamento CPIC 2022",
    "url": "https://files.cpicpgx.org/data/guideline/publication/clopidogrel/2022/35034351.pdf",
    "note": "Interpreta il rapporto fra fenotipo CYP2C19 e bioattivazione del clopidogrel in contesti definiti; non è un semplice calcolatore posologico.",
    "drugs": [
      "clopidogrel"
    ]
  }
];
