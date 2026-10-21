/* Original educational explanations for the 37 curated ELIX active ingredients. */
export const DEEP_DRUGS = Object.freeze({
  "bisoprololo": {
    "mechanism": "Il blocco β1 riduce la risposta cardiaca alle catecolamine e la liberazione di renina; la minore stimolazione Gs/cAMP spiega parte del rallentamento della frequenza. La β1-selettività è relativa, non una garanzia di assenza di effetti bronchiali.",
    "risks": "Bradicardia e rallentamento della conduzione AV diventano più importanti in presenza di altri farmaci cronotropi negativi. Una sospensione improvvisa può favorire un ritorno della stimolazione adrenergica.",
    "pk": "L'emivita e l'esposizione dipendono anche dall'eliminazione renale. Non confondere un diverso numero di somministrazioni con la potenza recettoriale del principio attivo.",
    "application": "Ragionare sempre sullo stato emodinamico, sulla frequenza e sulle patologie bronchiali; gli obiettivi differiscono tra ipertensione, angina e scompenso. Il trattamento di quest'ultimo segue titolazioni cliniche specifiche.",
    "chain": [
      "β1",
      "Gs ↓",
      "cAMP/PKA ↓",
      "frequenza/renina ↓"
    ]
  },
  "metoprololo": {
    "mechanism": "Antagonizza prevalentemente β1, riducendo effetto cronotropo e, secondo il contesto, inotropo delle catecolamine. Il beneficio a lungo termine nello scompenso riguarda formulazioni e popolazioni studiate, non qualsiasi preparazione intercambiabile.",
    "risks": "L'associazione con verapamil o diltiazem può sommare effetti su nodo AV e contrattilità. L'effetto cronotropo non riflette da solo il beneficio sul rimodellamento cardiaco.",
    "pk": "CYP2D6 contribuisce in modo sostanziale alla biotrasformazione: fenotipo genetico e interazioni metaboliche possono cambiare esposizione. Tartrato e succinato a rilascio prolungato non vanno trattati come formulazioni identiche.",
    "application": "Distinguere indicazione, formulazione, frequenza cardiaca e pressione. Per interpretare la farmacocinetica serve sapere quale prodotto e popolazione siano stati misurati.",
    "chain": [
      "β1 bloccato",
      "Gs/cAMP ↓",
      "impulso cronotropo ↓"
    ]
  },
  "nebivololo": {
    "mechanism": "Combina antagonismo preferenziale β1 con proprietà vasodilatatrici che coinvolgono la via dell'ossido nitrico. La vasodilatazione non rende automaticamente il farmaco equivalente a un nitrato organico.",
    "risks": "Condivide i rischi di bradicardia e ipotensione con altri beta-bloccanti. La selettività dipende anche dall'esposizione individuale e non annulla ogni possibile azione su β2.",
    "pk": "Il metabolismo attraverso CYP2D6 produce differenze fra metabolizzatori estensivi e lenti. Un'emivita unica non descrive tutte le possibili curve dei metaboliti.",
    "application": "Collegare farmacodinamica recettoriale e vascolare: non basta vedere che abbassa la pressione per identificarne gli effetti su cuore e vasi.",
    "chain": [
      "β1 antagonismo + modulazione NO",
      "frequenza ↓ / tono vasale ↓"
    ]
  },
  "carvedilolo": {
    "mechanism": "Blocca β1, β2 e α1: la componente α1 contribuisce a ridurre la resistenza vascolare, mentre il blocco β riduce la stimolazione adrenergica cardiaca. È un esempio utile di farmacologia multibersaglio.",
    "risks": "β2 non selettivo significa possibile antagonismo della broncodilatazione endogena o farmacologica. Il blocco α1 può favorire ipotensione posturale, specie in contesti vulnerabili.",
    "pk": "Ha metabolismo epatico importante; l'effetto è determinato dalle caratteristiche del paziente e dalla formulazione, non soltanto dall'emivita del principio attivo.",
    "application": "Confrontarlo con bisoprololo: stesso gruppo clinico ampio, ma bersagli recettoriali differenti e quindi profili di effetti non sovrapponibili.",
    "chain": [
      "β1/β2 e α1 bloccati",
      "stimolo cardiaco ↓ + vasocostrizione α1 ↓"
    ]
  },
  "propranololo": {
    "mechanism": "Antagonista β non selettivo e lipofilo: agisce su β1 cardiaco e β2 bronchiale, oltre a influenzare altri tessuti che esprimono i recettori. Il modello β2 spiega bene perché l'asma cambi il ragionamento farmacologico.",
    "risks": "Il blocco β2 può favorire broncospasmo e interferire con il recupero adrenergico da ipoglicemia. L'interazione con altri depressori della conduzione richiede attenzione.",
    "pk": "Soggetto a marcato primo passaggio epatico; formulazioni a rilascio immediato e prolungato hanno curve concentrazione-tempo differenti.",
    "application": "Studiare separatamente indicazioni come tremore, profilassi dell'emicrania e aritmie; un unico meccanismo recettoriale può produrre effetti clinici diversi.",
    "chain": [
      "β2 bloccato",
      "segnale Gs bronchiale ↓",
      "broncodilatazione ostacolata"
    ]
  },
  "atenololo": {
    "mechanism": "Antagonista β1 relativamente selettivo, con riduzione di frequenza e stimolo reninico. È utile per confrontare una molecola prevalentemente idrofila con beta-bloccanti più lipofili.",
    "risks": "Bradicardia, blocchi di conduzione e ridotta tolleranza a situazioni che richiedono risposta simpatica sono conseguenze prevedibili del meccanismo.",
    "pk": "L'eliminazione renale ha un ruolo rilevante: una funzione renale ridotta può prolungare l'esposizione. L'effetto non si deduce soltanto dal peso corporeo.",
    "application": "Confrontare atenololo con metoprololo e nebivololo per metabolismo, eliminazione, selettività e indicazioni realmente autorizzate.",
    "chain": [
      "β1 antagonismo",
      "cronotropismo ↓ + renina ↓"
    ]
  },
  "ramipril": {
    "mechanism": "È un profarmaco convertito nel metabolita attivo ramiprilato, che inibisce ACE: ne derivano minore formazione di angiotensina II e ridotta degradazione della bradichinina. Il collegamento spiega vasodilatazione, tosse e parte del rischio di angioedema.",
    "risks": "Monitorare concettualmente potassio, creatinina e pressione; iperkaliemia e riduzione della pressione intraglomerulare sono importanti in condizioni predisponenti. L'uso in gravidanza è controindicato.",
    "pk": "Distinguere emivita del profarmaco, del metabolita e durata del legame con ACE: non sono necessariamente la stessa misura.",
    "application": "HOPE fornisce un esempio classico di outcome clinici: il risultato non è una semplice misura di pressione e non va esteso a popolazioni non studiate.",
    "chain": [
      "ACE ↓",
      "Ang II ↓ + bradichinina ↑",
      "vasodilatazione / tosse possibile"
    ]
  },
  "enalapril": {
    "mechanism": "Profarmaco convertito in enalaprilato. Inibendo ACE, modifica il sistema renina–angiotensina–aldosterone e riduce la degradazione della bradichinina.",
    "risks": "Tosse, angioedema, iperkaliemia e variazioni della funzione renale discendono da modifiche diverse ma collegate della stessa via. La combinazione indiscriminata con altri bloccanti del RAAS può aumentare il rischio di eventi avversi.",
    "pk": "La concentrazione e l'emivita del metabolita attivo non sono le stesse del farmaco assunto. Eliminazione renale ed esposizione possono variare in insufficienza d'organo.",
    "application": "Contrapporlo a losartan: entrambi riducono la segnalazione AT1 finale, ma il sartano non inibisce direttamente la degradazione della bradichinina.",
    "chain": [
      "ACE inibito",
      "Ang II ↓ + degradazione bradichinina ↓"
    ]
  },
  "losartan": {
    "mechanism": "Antagonizza AT1, impedendo ad angiotensina II di esercitare diversi effetti vasocostrittori e pro-aldosterone sul bersaglio. Non blocca la formazione stessa di angiotensina II.",
    "risks": "Iperkaliemia, ipotensione e alterazioni della funzione renale richiedono valutazione nel contesto. Gli antagonisti AT1 sono controindicati in gravidanza.",
    "pk": "Un metabolita attivo contribuisce all'effetto farmacologico: la durata dell'azione non coincide con la sola emivita del farmaco parent.",
    "application": "La minore frequenza di tosse rispetto agli ACE-inibitori è spiegabile dal fatto che AT1 viene antagonizzato senza bloccare direttamente ACE/bradichinina.",
    "chain": [
      "AT1 bloccato",
      "segnalazione Ang II ↓",
      "tono vascolare e aldosterone ↓"
    ]
  },
  "valsartan": {
    "mechanism": "Bloccando AT1 riduce gli effetti dell'angiotensina II su muscolo liscio, surrene e rene. Gli esiti clinici dipendono dall'indicazione e dalla popolazione.",
    "risks": "Iperkaliemia, ipotensione e peggioramento della funzione renale in contesti predisponenti restano possibili. Non è appropriato considerarne l'efficacia indipendente dalla funzionalità renale.",
    "pk": "La biodisponibilità orale può variare con la formulazione e l'alimentazione; valori riferiti alla compressa non vanno trasferiti automaticamente alla sospensione.",
    "application": "Distinguere valsartan da una combinazione che lo contiene: i dati di studi su associazioni non rappresentano l'efficacia del singolo ingrediente.",
    "chain": [
      "AT1 antagonizzato",
      "PLC/IP₃-Ca²⁺ indotto da Ang II ↓"
    ]
  },
  "amlodipina": {
    "mechanism": "È una diidropiridina che blocca il canale del calcio di tipo L, con prevalenza di effetto sulla muscolatura liscia vascolare. La vasodilatazione spiega la riduzione delle resistenze periferiche.",
    "risks": "L'edema declive può derivare da alterazioni emodinamiche capillari, non necessariamente da ritenzione idrosalina generalizzata; diuretici e calcio-antagonisti non sono equivalenti.",
    "pk": "L'emivita lunga sostiene un profilo di concentrazioni relativamente persistente. Il metabolismo epatico e la variabilità individuale sono rilevanti per l'esposizione.",
    "application": "Confrontarla con verapamil: condividono il canale L, ma sono differenti per selettività tissutale ed effetti su nodo AV e contrattilità.",
    "chain": [
      "Canali Ca²⁺ L vascolari ↓",
      "ingresso Ca²⁺ ↓",
      "rilassamento arteriolare"
    ]
  },
  "verapamil": {
    "mechanism": "Calcio-antagonista non diidropiridinico: riduce corrente Ca²⁺ L in tessuti vascolari e cardiaci, con effetti su automatismo, conduzione AV e contrattilità.",
    "risks": "L'associazione con beta-bloccanti può sommarsi nel rallentamento AV. Alcune forme di insufficienza cardiaca sistolica richiedono particolare attenzione per l'effetto inotropo negativo.",
    "pk": "Formulazioni e vie di somministrazione variano: emivita misurata dopo iniezione non rappresenta automaticamente quella di compresse a rilascio prolungato.",
    "application": "La possibilità di trattare specifiche tachicardie sopraventricolari deriva dai tessuti nodali: non tutti i calcio-antagonisti hanno lo stesso profilo elettrico.",
    "chain": [
      "Ca²⁺ L nodale ↓",
      "conduzione AV ↓"
    ]
  },
  "diltiazem": {
    "mechanism": "Calcio-antagonista non diidropiridinico con effetti vascolari e nodali. Aiuta a capire lo spettro farmacodinamico fra amlodipina e verapamil senza ridurre tutto alla classe 'calcio-antagonisti'.",
    "risks": "Bradicardia e blocchi AV sono più probabili nel contesto di farmaci concomitanti cronotropi negativi. Sono possibili interazioni metaboliche e di trasporto.",
    "pk": "Gli studi PK dipendono dalla formulazione: per farmaci a rilascio modificato Cmax e Tmax non coincidono con quelli del rilascio immediato.",
    "application": "Valutare la differenza fra controllo della frequenza e trattamento dell'ipertensione: bersaglio condiviso, endpoint terapeutico diverso.",
    "chain": [
      "Ca²⁺ L nodale/vascolare ↓",
      "conduzione ↓ + vasodilatazione"
    ]
  },
  "furosemide": {
    "mechanism": "Inibisce NKCC2 (SLC12A1) nel tratto ascendente spesso dell'ansa; aumenta il sodio che raggiunge segmenti distali e interrompe parte del gradiente osmotico midollare.",
    "risks": "Ipokaliemia, alcalosi metabolica, iponatriemia, disidratazione e ipotensione possono seguire l'intensa natriuresi. La risposta dipende dalla consegna tubulare del farmaco.",
    "pk": "La biodisponibilità orale varia significativamente e non corrisponde necessariamente all'efficacia della stessa dose EV. La funzione renale altera l'accesso al bersaglio luminale.",
    "application": "La scelta nel paziente congesto deve essere distinta da una semplice cifra di pressione: il parametro clinico è il bilancio di acqua e sodio con monitoraggio appropriato.",
    "chain": [
      "NKCC2 ↓",
      "riassorbimento NaCl ↓",
      "natriuresi/diuresi ↑"
    ]
  },
  "idroclorotiazide": {
    "mechanism": "Inibisce NCC (SLC12A3) nel tubulo contorto distale. L'effetto diuretico e alcune conseguenze sul trasporto degli ioni dipendono dall'adattamento dei segmenti renali a valle.",
    "risks": "Ipokaliemia, iponatriemia e iperuricemia sono eventi da collegare alla fisiologia tubulare. Possono comparire alterazioni metaboliche.",
    "pk": "L'eliminazione è in larga misura renale: il valore di emivita non basta a stabilire la risposta con eGFR basso.",
    "application": "Confronto fondamentale con diuretici dell'ansa e antagonisti mineralcorticoidi: bersaglio anatomico differente, rischi elettrolitici differenti.",
    "chain": [
      "NCC distale ↓",
      "riassorbimento NaCl ↓",
      "natriuresi ↑"
    ]
  },
  "spironolattone": {
    "mechanism": "Antagonista del recettore mineralcorticoide MR (NR3C2): riduce l'espressione di proteine che sostengono il riassorbimento di sodio e la secrezione di potassio. I benefici nello scompenso includono effetti di rimodellamento.",
    "risks": "L'iperkaliemia è coerente con il meccanismo, specie insieme a ACE-inibitori/ARB e insufficienza renale. Sono possibili effetti endocrini come ginecomastia, legati alla minore selettività recettoriale.",
    "pk": "Metaboliti attivi contribuiscono alla durata dell'effetto; non valutare la farmacocinetica usando soltanto l'emivita del parent.",
    "application": "RALES dimostra esiti clinici nello scompenso grave in una popolazione selezionata; valutare il rapporto con funzione renale e potassio è parte della comprensione del farmaco.",
    "chain": [
      "MR bloccato",
      "ENaC/Na⁺K⁺ ATPasi ↓",
      "Na⁺ riassorbito ↓ + K⁺ trattenuto ↑"
    ]
  },
  "eplerenone": {
    "mechanism": "Antagonizza MR in modo più selettivo rispetto a spironolattone per altri recettori steroidei. Il bersaglio rimane lo stesso: cambia la probabilità di effetti off-target endocrini.",
    "risks": "Iperkaliemia e necessità di considerare funzionalità renale persistono: maggiore selettività non vuol dire assenza di rischio renale.",
    "pk": "È metabolizzato prevalentemente tramite CYP3A4, per cui inibitori potenti possono aumentare significativamente l'esposizione.",
    "application": "Va confrontato con spironolattone su selettività, metaboliti e interazioni, non assumendo che siano intercambiabili nelle diverse indicazioni.",
    "chain": [
      "MR antagonizzato",
      "azione aldosterone ↓",
      "escrezione K⁺ ↓"
    ]
  },
  "atorvastatina": {
    "mechanism": "Inibisce HMG-CoA reduttasi epatica, riducendo sintesi del colesterolo intracellulare. La risposta adattativa del fegato aumenta l'espressione di recettori LDL e la rimozione delle LDL plasmatiche.",
    "risks": "Possibili sintomi muscolari e rare lesioni muscolari gravi; alcune interazioni farmacocinetiche aumentano l'esposizione e il rischio di tossicità. Non tutte le alterazioni transaminasiche indicano la stessa patologia.",
    "pk": "Il CYP3A4 ha un ruolo metabolico; emivita del parent e durata dell'attività inibitoria possono differire per il contributo dei metaboliti.",
    "application": "Confronto utile con statine con diversa eliminazione: la scelta clinica dipende anche dalla potenza di riduzione LDL, dal rischio del paziente e dalle interazioni.",
    "chain": [
      "HMGCR ↓",
      "colesterolo epatico ↓",
      "recettori LDL ↑",
      "LDL plasmatica ↓"
    ]
  },
  "asa": {
    "mechanism": "Acetila irreversibilmente la COX-1 piastrinica a dosaggi antiaggreganti, riducendo sintesi di trombossano A₂. Poiché le piastrine non sintetizzano nuova COX in modo efficace, l'effetto persiste oltre la presenza plasmatica del farmaco.",
    "risks": "Sanguinamento e danno gastrointestinale sono rischi importanti. In prevenzione primaria il beneficio va valutato separatamente dal rischio emorragico: non è la stessa popolazione della prevenzione secondaria.",
    "pk": "Una breve emivita del principio attivo non significa durata breve dell'antiaggregazione, che dipende dal turnover piastrinico.",
    "application": "ASCEND è un esempio fondamentale: riduzione modesta di eventi vascolari e aumento di sanguinamenti maggiori devono essere discussi insieme.",
    "chain": [
      "COX-1 piastrinica irreversibilmente ↓",
      "TXA₂ ↓",
      "aggregazione ↓"
    ]
  },
  "clopidogrel": {
    "mechanism": "Profarmaco trasformato in un metabolita che antagonizza irreversibilmente P2Y12. Il blocco della via ADP diminuisce l'attivazione di GPIIb/IIIa e la risposta aggregante.",
    "risks": "Sanguinamento, variabilità di risposta e interazioni che interferiscono con l'attivazione metabolica sono rilevanti. CYP2C19 è una delle principali fonti di variabilità farmacogenetica.",
    "pk": "L'emivita del metabolita attivo è breve, ma l'effetto sulla piastrina persiste fino al rinnovo del pool funzionale.",
    "application": "Non confondere l'antiaggregazione con l'anticoagulazione: P2Y12 è un recettore piastrinico, non un fattore della coagulazione.",
    "chain": [
      "Profarmaco",
      "metabolita attivo",
      "P2Y12 bloccato",
      "aggregazione ↓"
    ]
  },
  "apixaban": {
    "mechanism": "Inibitore diretto del fattore Xa: limita la generazione di trombina, riducendo la formazione di fibrina. Non richiede antitrombina per il legame al bersaglio.",
    "risks": "Il sanguinamento è il rischio principale. Interazioni che coinvolgono P-gp e CYP3A4 possono alterare l'esposizione; attenzione alla specifica funzione renale e alle condizioni del paziente.",
    "pk": "Eliminazione multimodale e semivita apparente non equivalgono a effetto costante in tutte le condizioni. Le formulazioni e indicazioni autorizzate richiedono dati del prodotto.",
    "application": "ARISTOTLE confronta apixaban con warfarin nella FA selezionata; quei risultati non sono trasferibili alle protesi valvolari meccaniche.",
    "chain": [
      "Fattore Xa ↓",
      "trombina generata ↓",
      "fibrina ↓"
    ]
  },
  "warfarin": {
    "mechanism": "Inibisce VKORC1, ostacolando la rigenerazione della vitamina K necessaria alla γ-carbossilazione dei fattori II, VII, IX, X e delle proteine C e S. L'effetto dipende dal tempo di ricambio dei fattori già prodotti.",
    "risks": "L'ampia finestra di interazioni e variabilità farmacogenetica spiega l'importanza del monitoraggio INR. In gravidanza esistono rischi specifici; non basta considerare la quantità della dose.",
    "pk": "La cinetica di diversi enantiomeri e fattori della coagulazione è differente: la cessazione dell'effetto anticoagulante non segue semplicemente la scomparsa plasmatica del farmaco.",
    "application": "Confronto con apixaban: la stessa finalità antitrombotica è raggiunta con bersagli diversi, monitoraggio diverso e popolazioni cliniche non sovrapponibili.",
    "chain": [
      "VKORC1 ↓",
      "vitamina K ridotta ↓",
      "fattori attivi II/VII/IX/X ↓"
    ]
  },
  "digossina": {
    "mechanism": "Inibisce la Na⁺/K⁺-ATPasi; l'aumento di Na⁺ intracellulare riduce la capacità dello scambiatore Na⁺/Ca²⁺ di eliminare Ca²⁺, incrementando disponibilità del calcio contrattile. Interagisce anche con la regolazione vagale.",
    "risks": "Ipokaliemia, insufficienza renale e interazioni possono favorire tossicità digitalica, con manifestazioni gastrointestinali, visive ed elettriche. È fondamentale distinguere concentrazione e interpretazione clinica.",
    "pk": "Eliminazione prevalentemente renale, con finestra terapeutica ristretta: funzione renale e distribuzione tissutale influenzano l'esposizione.",
    "application": "Confrontarla con beta-bloccanti: entrambe possono rallentare la frequenza in certi contesti, ma meccanismo e profilo di sicurezza sono molto differenti.",
    "chain": [
      "Na⁺/K⁺-ATPasi ↓",
      "Na⁺ intracellulare ↑",
      "NCX ↓",
      "Ca²⁺ ↑"
    ]
  },
  "amiodarone": {
    "mechanism": "Antiaritmico a bersagli multipli: modula canali K⁺, Na⁺ e Ca²⁺ e può avere attività antiadrenergica. L'azione non si riassume in un singolo recettore o in una sola classe Vaughan Williams.",
    "risks": "Tossicità tiroidea, polmonare, epatica e oculare e numerose interazioni richiedono sorveglianza appropriata. L'accumulo tissutale spiega eventi anche a distanza dalle variazioni di dose.",
    "pk": "Altamente lipofila e multicompartimentale, con emivita terminale molto lunga e metaboliti attivi. Il tempo al nuovo equilibrio non si calcola come per una molecola semplice a un compartimento.",
    "application": "Distinguere il controllo delle aritmie dalla riduzione di mortalità: benefici e rischi dipendono da specifico tipo di aritmia e scenario.",
    "chain": [
      "Canali cardiaci multipli modulati",
      "eccitabilità e ripolarizzazione modificate"
    ]
  },
  "noradrenalina": {
    "mechanism": "Agonista soprattutto α1 e anche β1: la stimolazione α1–Gq favorisce tono vascolare, mentre β1 agisce su risposta cardiaca. Gli effetti dipendono da recettori, risposta dei tessuti e stato circolatorio.",
    "risks": "Vasocostrizione intensa può ridurre perfusione periferica; extravasazione e aritmie sono rischi in contesti critici. L'uso terapeutico richiede monitoraggio e gestione specialistica.",
    "pk": "Emivita molto breve per rapida ricaptazione e degradazione; tale caratteristica è coerente con l'uso mediante infusioni controllate.",
    "application": "La pressione arteriosa è l'esito di gittata e resistenze periferiche: recettori singoli non bastano per predire la risposta di un paziente in shock.",
    "chain": [
      "α1/Gq ↑",
      "Ca²⁺ vasale ↑",
      "vasocostrizione ↑"
    ]
  },
  "dobutamina": {
    "mechanism": "Agonismo β prevalentemente β1 aumenta la segnalazione cAMP/PKA nei cardiomiociti e la risposta inotropa. La componente β2 e α variabile condiziona gli effetti vascolari.",
    "risks": "Tachiaritmie, aumento del consumo miocardico di ossigeno e ischemia sono rischi coerenti con maggiore stimolazione cardiaca. Sono necessari contesti monitorati.",
    "pk": "L'emivita breve consente un rapido cambiamento dell'esposizione durante l'infusione, ma non rende prevedibile da sola il risultato emodinamico.",
    "application": "Mettere in relazione con noradrenalina: entrambe sono catecolamine, ma l'obiettivo emodinamico e il profilo recettoriale non sono identici.",
    "chain": [
      "β1–Gs ↑",
      "cAMP/PKA ↑",
      "Ca²⁺ funzionale ↑",
      "inotropismo ↑"
    ]
  },
  "nitroglicerina": {
    "mechanism": "I nitrati organici possono liberare bioattività NO, che attiva guanilato ciclasi solubile e aumenta cGMP. La riduzione del tono della muscolatura liscia vascolare riguarda in modo rilevante il distretto venoso.",
    "risks": "Associati a inibitori PDE5 possono amplificare eccessivamente la via cGMP con ipotensione anche grave. Cefalea e tolleranza possono essere comprese attraverso vasodilatazione e regolazione dei segnali.",
    "pk": "Biodisponibilità orale limitata dal metabolismo di primo passaggio; vie sublinguali e transdermiche producono esposizioni e tempi molto differenti.",
    "application": "Separare sollievo sintomatico da dimostrazione di beneficio sugli endpoint duri. Il regime e la via del prodotto influenzano il ragionamento.",
    "chain": [
      "Nitrato",
      "NO–sGC ↑",
      "cGMP ↑",
      "rilassamento muscolare"
    ]
  },
  "ivabradina": {
    "mechanism": "Inibisce la corrente pacemaker If, mediata da canali HCN del nodo senoatriale. Riduce la frequenza in ritmo sinusale senza agire come antagonista β1.",
    "risks": "Bradicardia e fenomeni luminosi (fosfeni) hanno basi farmacologiche riconducibili a canali del sistema cardiaco/visivo. Non è un mezzo di controllo della frequenza nella fibrillazione atriale.",
    "pk": "Il metabolismo avviene soprattutto attraverso CYP3A4; inibitori potenti possono aumentare l'esposizione e modificare la frequenza cardiaca. L'emivita effettiva può differire dalla fase distributiva iniziale: entrambi i valori richiedono la fonte del prodotto per essere interpretati.",
    "application": "La riduzione della frequenza non implica automaticamente miglioramento degli stessi endpoint in tutte le cardiopatie; la selezione dei pazienti è specifica.",
    "chain": [
      "If/HCN nel nodo SA ↓",
      "depolarizzazione spontanea più lenta",
      "FC ↓"
    ]
  },
  "dapagliflozin": {
    "mechanism": "Blocca il cotrasportatore SGLT2 nel tubulo prossimale riducendo il riassorbimento di glucosio e sodio. La natriuresi influenza il feedback tubuloglomerulare e molti effetti cardiorenali sono indipendenti dalla riduzione glicemica.",
    "risks": "Chetoacidosi anche con glicemia non marcata, deplezione di volume e infezioni genitali sono eventi da riconoscere. L'effetto sulla eGFR nelle prime fasi può essere emodinamico e non equivale automaticamente a danno renale acuto.",
    "pk": "L'efficacia glicosurica dipende anche dal glucosio filtrato, mentre esiti cardio-renali e aggiustamenti farmacologici seguono considerazioni distinte.",
    "application": "DAPA-HF e DAPA-CKD mostrano endpoint diversi: peggioramento dello scompenso da un lato, progressione della malattia renale dall'altro. Confrontare sempre popolazione e follow-up.",
    "chain": [
      "SGLT2 tubulare ↓",
      "riassorbimento glucosio/Na⁺ ↓",
      "feedback tubuloglomerulare"
    ]
  },
  "salbutamolo": {
    "mechanism": "Agonista β2 che attiva Gs, adenilato ciclasi e cAMP; a livello della muscolatura liscia bronchiale ciò contribuisce al rilassamento. Il pathway non coincide con un effetto solo PKA: sono presenti più regolatori.",
    "risks": "Tremore, tachicardia e ipokaliemia a esposizioni sistemiche maggiori sono coerenti con la stimolazione adrenergica. Uso frequente al bisogno può segnalare scarso controllo della malattia.",
    "pk": "La via inalatoria ricerca un effetto bronchiale locale, ma parte del farmaco può essere assorbita e avere effetti sistemici. Dose polmonare ed erogata non coincidono sempre.",
    "application": "Un confronto con propranololo sul recettore β2 chiarisce come agonista e antagonista possano avere conseguenze opposte nella muscolatura liscia bronchiale.",
    "chain": [
      "β2",
      "Gs ↑",
      "adenilato ciclasi ↑",
      "cAMP/PKA ↑",
      "broncodilatazione"
    ]
  },
  "eparina": {
    "mechanism": "Miscela eterogenea di polisaccaridi che potenziano l'azione dell'antitrombina su trombina e fattore Xa. La lunghezza della catena condiziona la capacità di facilitare l'inibizione della trombina: non esiste un'unica formula molecolare dell'eparina non frazionata.",
    "risks": "Sanguinamento e trombocitopenia indotta da eparina (HIT) sono rischi da distinguere nei meccanismi e nella tempistica. L'effetto richiede monitoraggio secondo situazione clinica e prodotto.",
    "pk": "La clearance dell'eparina non frazionata può variare con dose, legame a proteine e cellule e vie di eliminazione. Le unità di attività non sono milligrammi intercambiabili.",
    "application": "Confrontare eparina non frazionata, EBPM e fondaparinux per struttura, rapporto anti-Xa/anti-IIa e dipendenza dall'antitrombina.",
    "chain": [
      "Eparina + antitrombina",
      "inibizione IIa/Xa potenziata",
      "trombina/fibrina ↓"
    ]
  },
  "enoxaparina": {
    "mechanism": "Eparina a basso peso molecolare: miscela di frammenti con attività mediata dall'antitrombina, relativamente più importante su Xa rispetto a IIa. Non è un singolo composto identico in tutte le formulazioni.",
    "risks": "Sanguinamento, possibile HIT e accumulo nell'insufficienza renale sono temi distinti. Non trasformare valori anti-Xa in concentrazioni o dosi universali.",
    "pk": "L'emivita di attività anti-Xa è una misura farmacodinamica, non sempre comparabile all'emivita plasmatica di altri anticoagulanti.",
    "application": "Confronto con eparina non frazionata: catene più corte e comportamento PK/PD differente pur condividendo la famiglia della molecola.",
    "chain": [
      "Enoxaparina–antitrombina",
      "attività Xa ↓ (e IIa in misura relativa minore)"
    ]
  },
  "fondaparinux": {
    "mechanism": "Pentasaccaride sintetico capace di legare l'antitrombina e favorire l'inattivazione di Xa. Non ha la lunghezza necessaria al ponte antitrombina–trombina tipico dell'eparina per l'inibizione IIa.",
    "risks": "Il sanguinamento e l'accumulo nelle riduzioni importanti della funzione renale sono questioni primarie per la sicurezza.",
    "pk": "Eliminazione renale con emivita relativamente lunga: la durata dell'effetto deve essere interpretata nel contesto della funzione renale.",
    "application": "È utile per capire che 'anticoagulante iniettabile' non identifica un bersaglio o una struttura chimica univoci.",
    "chain": [
      "Fondaparinux",
      "antitrombina attivata contro Xa",
      "trombina ↓"
    ]
  },
  "rivaroxaban": {
    "mechanism": "Inibitore diretto di Xa senza necessità di antitrombina. La riduzione della generazione di trombina modifica la coagulazione senza antagonizzare direttamente la vitamina K.",
    "risks": "Sanguinamento e interazioni P-gp/CYP3A4 sono centrali. La biodisponibilità può dipendere dalla dose e dal pasto per alcune formulazioni: non è lecito generalizzare.",
    "pk": "Emivita dipendente anche da età e caratteristiche del paziente; assorbimento e farmacocinetica differiscono per prodotto e regime.",
    "application": "Confrontare con warfarin per bersaglio, velocità d'azione, monitoraggio e indicazioni specifiche, senza supporre intercambiabilità.",
    "chain": [
      "Xa diretto ↓",
      "generazione trombina ↓",
      "fibrina ↓"
    ]
  },
  "edoxaban": {
    "mechanism": "Inibitore diretto del fattore Xa: non richiede conversione metabolica a un antagonista della vitamina K per esplicare l'azione.",
    "risks": "Sanguinamento e interazioni con trasportatori P-gp restano rilevanti. Gli avvisi di efficacia/sicurezza possono differire fra contesti regolatori.",
    "pk": "L'eliminazione renale contribuisce in modo significativo; in determinate popolazioni clearance molto elevata o ridotta può influenzare esposizione ed efficacia.",
    "application": "Non dedurre un unico schema dalle caratteristiche di classe: le specifiche condizioni di autorizzazione devono essere verificate nel prodotto nazionale.",
    "chain": [
      "Xa ↓",
      "generazione di trombina ↓"
    ]
  },
  "dabigatran": {
    "mechanism": "Dabigatran etexilato è un profarmaco che viene convertito a dabigatran, inibitore diretto della trombina (IIa). Il bersaglio è quindi diverso da quello degli anti-Xa diretti.",
    "risks": "Sanguinamento e dipendenza dalla funzione renale sono rilevanti. La manipolazione non prevista della capsula può modificare esposizione e va distinta dalle altre formulazioni.",
    "pk": "La biodisponibilità del profarmaco è bassa, mentre la molecola attiva ha caratteristiche di eliminazione differenti. Non assegnare al dabigatran attivo la formula del profarmaco.",
    "application": "Confrontare inibitori IIa vs Xa: entrambi riducono la formazione di fibrina, ma bersagli e proprietà di trasporto/metabolismo non coincidono.",
    "chain": [
      "Profarmaco",
      "dabigatran attivo",
      "trombina IIa ↓",
      "fibrina ↓"
    ]
  },
  "empagliflozin": {
    "mechanism": "Inibisce SGLT2 nel tubulo prossimale causando glucosuria e natriuresi. Il feedback tubuloglomerulare e le modifiche emodinamiche si collegano ai benefici cardiorenali osservati in popolazioni definite.",
    "risks": "Possibile chetoacidosi con glicemia non marcatamente aumentata, infezioni genitali e deplezione di volume. Il cambiamento iniziale dell'eGFR non va interpretato isolatamente.",
    "pk": "L'emivita plasmatica da sola non predice glucosuria, efficacia glicemica o protezione renale. La quantità di glucosio filtrato e la funzione renale influenzano l'effetto tubulare; gli endpoint clinici richiedono invece studi longitudinali dedicati, come EMPA-KIDNEY.",
    "application": "EMPA-KIDNEY associa il farmaco a riduzione di un endpoint renale/cardiovascolare; il dato va discusso con inclusione dei pazienti e durata del trial.",
    "chain": [
      "SGLT2 ↓",
      "glucosio/Na⁺ riassorbiti ↓",
      "feedback renale e glucosuria"
    ]
  }
});
export function deepDrug(id){return DEEP_DRUGS[id]||null;}
