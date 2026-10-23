/* eli expanded question bank — original prompts, synthetic vignettes, evidence checks. */
export const EXPANDED_QUESTIONS=[
  {
    "id": "e001",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 1,
    "question": "Una confezione autorizzata e una sostanza ChEMBL sono la stessa entità?",
    "answers": [
      "No, un prodotto ha autorizzazione, forma e confezione specifiche",
      "Sì, per definizione",
      "Solo per anticorpi",
      "Solo per farmaci generici"
    ],
    "correct": 0,
    "why": "L'identità molecolare è distinta da prodotto, formulazione, indicazione, AIC e confezione."
  },
  {
    "id": "e002",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Un sale di un principio attivo può avere un record chimico diverso dalla base libera?",
    "answers": [
      "Sì, l'identità chimica può essere distinta",
      "No, tutti i sali hanno identica formula",
      "Solo se biologico",
      "Solo per farmaci ritirati"
    ],
    "correct": 0,
    "why": "Base, sale ed eventuali stereoisomeri vanno collegati senza confonderne formule e proprietà."
  },
  {
    "id": "e003",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Quale informazione determina se una dose è autorizzata in Italia?",
    "answers": [
      "RCP aggiornato dello specifico medicinale",
      "SMILES della molecola",
      "RCSB PDB",
      "Un valore di Ki isolato"
    ],
    "correct": 0,
    "why": "La posologia autorizzata è una proprietà del prodotto, indicazione e contesto regolatorio."
  },
  {
    "id": "e004",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Un valore EC50 inferiore prova sempre affinità recettoriale maggiore?",
    "answers": [
      "No, dipende anche da trasduzione e riserva recettoriale",
      "Sì, EC50 è sempre Kd",
      "Solo per antiretrovirali",
      "Solo in vivo"
    ],
    "correct": 0,
    "why": "L'EC50 descrive una risposta nel sistema e non coincide per definizione con Kd."
  },
  {
    "id": "e005",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Che cosa descrive un agonista inverso su un recettore costitutivamente attivo?",
    "answers": [
      "Riduce l'attività basale del recettore",
      "Impedisce solo l'accesso a un agonista senza cambiare il basale",
      "Aumenta sempre Emax",
      "Trasforma il recettore in un enzima"
    ],
    "correct": 0,
    "why": "L'agonismo inverso modifica la probabilità degli stati costitutivamente attivi."
  },
  {
    "id": "e006",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Quando un antagonista competitivo reversibile non riduce obbligatoriamente Emax?",
    "answers": [
      "Quando l'agonista può raggiungere concentrazioni sufficienti nel sistema",
      "Sempre nell'antagonismo irreversibile",
      "Solo quando il recettore è assente",
      "Quando non avviene alcun legame"
    ],
    "correct": 0,
    "why": "In un modello idealizzato surmontabile si ha soprattutto uno spostamento della curva verso destra."
  },
  {
    "id": "e007",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Che ruolo ha una riserva recettoriale?",
    "answers": [
      "Consente risposta massima anche con occupazione non totale",
      "Rende identiche Ki ed EC50 in ogni tessuto",
      "Elimina la desensibilizzazione",
      "Riduce sempre la potenza"
    ],
    "correct": 0,
    "why": "Amplificazione del segnale e riserva recettoriale separano occupazione e massima risposta."
  },
  {
    "id": "e008",
    "group": "Generale",
    "drug": "",
    "kind": "teoria",
    "difficulty": 5,
    "question": "Un legame covalente al bersaglio implica sempre effetto clinico permanente?",
    "answers": [
      "No, recupero può dipendere dal turnover della proteina/cellula",
      "Sì, per definizione",
      "Solo se l'emivita plasmatica è lunga",
      "Dipende dal nome commerciale"
    ],
    "correct": 0,
    "why": "L'irreversibilità del legame non impedisce la sintesi o il ricambio del bersaglio."
  },
  {
    "id": "e009",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 1,
    "question": "Cosa distingue il volume apparente di distribuzione?",
    "answers": [
      "Non coincide necessariamente con un volume anatomico reale",
      "È sempre uguale al volume plasmatico",
      "Misura esclusivamente escrezione urinaria",
      "È costante tra specie e formulazioni"
    ],
    "correct": 0,
    "why": "Vd lega quantità nell'organismo e concentrazione nel compartimento di riferimento."
  },
  {
    "id": "e010",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Un aumento dell'emivita implica sempre una riduzione della clearance?",
    "answers": [
      "No: può cambiare anche il volume di distribuzione",
      "Sì, indipendentemente dal modello",
      "Solo per farmaci EV",
      "Solo se la proteina è un GPCR"
    ],
    "correct": 0,
    "why": "Nel modello lineare monocompartimentale t½ dipende da Vd e clearance."
  },
  {
    "id": "e011",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Quale è la differenza fra biodisponibilità assoluta e relativa?",
    "answers": [
      "La prima usa EV come riferimento, la seconda confronta formulazioni",
      "Sono sinonimi",
      "La relativa è sempre 100%",
      "La prima riguarda solo i biologici"
    ],
    "correct": 0,
    "why": "Un rapporto fra due formulazioni non dimostra la frazione assoluta arrivata nel sangue."
  },
  {
    "id": "e012",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Una sostanza con forte primo passaggio epatico può avere:",
    "answers": [
      "Esposizione orale minore di quella EV, a pari dose normalizzata",
      "Sempre assenza di metaboliti",
      "Stessa F per tutte le vie",
      "Nessuna interazione metabolica"
    ],
    "correct": 0,
    "why": "Metabolismo presistemico può ridurre la quota che raggiunge la circolazione."
  },
  {
    "id": "e013",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "L'induzione di un CYP spesso richiede tempo perché:",
    "answers": [
      "Dipende da cambiamenti nell'espressione e quantità di enzima",
      "È una reazione immediata sul farmaco",
      "La molecola perde la formula",
      "È esclusivamente genetica"
    ],
    "correct": 0,
    "why": "L'induzione e la scomparsa dell'effetto dipendono dal turnover delle proteine enzimatiche."
  },
  {
    "id": "e014",
    "group": "Farmacocinetica",
    "drug": "clopidogrel",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Un metabolizzatore CYP2C19 lento potrebbe avere, a parità di altre condizioni, quale effetto sul clopidogrel?",
    "answers": [
      "Minore formazione del metabolita attivo",
      "Sempre più effetto antiaggregante",
      "Inibizione diretta di Xa",
      "Più sali nella formulazione"
    ],
    "correct": 0,
    "why": "Per un profarmaco l'attivazione metabolica ridotta può ridurre la risposta."
  },
  {
    "id": "e015",
    "group": "Farmacocinetica",
    "drug": "metoprololo",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Un potente inibitore CYP2D6 può potenzialmente aumentare:",
    "answers": [
      "Esposizione a metoprololo",
      "Eliminazione di metoprololo in tutte le condizioni",
      "Attivazione di warfarin",
      "Sintesi di albumina"
    ],
    "correct": 0,
    "why": "Il metabolismo del parent può diminuire e l'esposizione aumentare, a seconda del contesto."
  },
  {
    "id": "e016",
    "group": "Farmacocinetica",
    "drug": "",
    "kind": "teoria",
    "difficulty": 5,
    "question": "Perché una emivita terminale non descrive sempre l'intero effetto clinico?",
    "answers": [
      "Metaboliti, legame al bersaglio e ricambio proteico possono differire",
      "Perché Vd è sempre nullo",
      "Perché farmacodinamica è uguale a farmacocinetica",
      "Perché esistono solo due vie di eliminazione"
    ],
    "correct": 0,
    "why": "Durata dell'effetto e durata della presenza plasmatica sono grandezze distinte."
  },
  {
    "id": "e017",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 1,
    "question": "Quale mediatore aumenta tipicamente dopo attivazione Gs?",
    "answers": [
      "cAMP",
      "IP3 esclusivamente",
      "Trombina",
      "Vitamina K ridotta"
    ],
    "correct": 0,
    "why": "Gs stimola adenilato ciclasi, che aumenta cAMP."
  },
  {
    "id": "e018",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Gq/11 si collega direttamente a:",
    "answers": [
      "PLCβ",
      "VKORC1",
      "Fattore Xa",
      "HMG-CoA reduttasi"
    ],
    "correct": 0,
    "why": "PLCβ scinde PIP2 in IP3 e DAG, con segnali di Ca²⁺ e PKC."
  },
  {
    "id": "e019",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Cosa descrive Gi/o in un diagramma GPCR?",
    "answers": [
      "Può inibire adenilato ciclasi e modulare canali con βγ",
      "Aumenta obbligatoriamente cAMP",
      "È una proteina della cascata della coagulazione",
      "È un recettore nucleare"
    ],
    "correct": 0,
    "why": "Gi/o comprende segnali attraverso subunità α e βγ, che modulano più effettori."
  },
  {
    "id": "e020",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "La fosfodiesterasi nei circuiti cAMP/cGMP contribuisce a:",
    "answers": [
      "Terminazione/modulazione del secondo messaggero",
      "Produzione diretta di adrenalina",
      "Sintesi delle piastrine",
      "Dissoluzione delle membrane"
    ],
    "correct": 0,
    "why": "PDE degrada nucleotidi ciclici limitandone intensità e durata."
  },
  {
    "id": "e021",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Una struttura PDB con ligando e recettore dimostra anche il tempo di associazione reale?",
    "answers": [
      "No, una struttura statica non è una traiettoria cinetica",
      "Sì, tutte le coordinate contengono la velocità",
      "Solo con immagini a colori",
      "Solo per β2"
    ],
    "correct": 0,
    "why": "Un complesso sperimentale mostra una conformazione osservata, non automaticamente il percorso del legame."
  },
  {
    "id": "e022",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "L'asse RAS–MAPK interviene soprattutto in:",
    "answers": [
      "Segnalazione di crescita e proliferazione in contesti cellulari specifici",
      "Fattore IIa della coagulazione",
      "Rimodellamento emoglobina nel plasma",
      "Assorbimento intestinale del calcio"
    ],
    "correct": 0,
    "why": "RTK e proteine adattatrici possono attivare RAS–RAF–MEK–ERK."
  },
  {
    "id": "e023",
    "group": "Molecolare",
    "drug": "",
    "kind": "teoria",
    "difficulty": 5,
    "question": "Perché un inibitore di chinasi può perdere efficacia nonostante la presenza del bersaglio?",
    "answers": [
      "Vie alternative, mutazioni e feedback possono bypassare il blocco",
      "Perché tutte le chinasi sono strutturalmente identiche",
      "Perché la neoplasia non evolve",
      "Perché il farmaco non entra mai nel sangue"
    ],
    "correct": 0,
    "why": "Reti biologiche e selezione clonale possono sostenere resistenza."
  },
  {
    "id": "e024",
    "group": "Cardiovascolare",
    "drug": "bisoprololo",
    "kind": "teoria",
    "difficulty": 2,
    "question": "La minore liberazione di renina con bisoprololo deriva anche da:",
    "answers": [
      "Blocco β1 sulle cellule iuxtaglomerulari",
      "Inibizione diretta NKCC2",
      "Stimolo AT1",
      "Attivazione della COX1"
    ],
    "correct": 0,
    "why": "La segnalazione adrenergica β1 stimola fisiologicamente il rilascio di renina."
  },
  {
    "id": "e025",
    "group": "Cardiovascolare",
    "drug": "carvedilolo",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Quale bersaglio distingue carvedilolo da un beta-bloccante β1 selettivo?",
    "answers": [
      "Anche recettore α1 e β2",
      "Fattore Xa",
      "VKORC1",
      "SGLT2"
    ],
    "correct": 0,
    "why": "Carvedilolo è un antagonista β1, β2 e α1."
  },
  {
    "id": "e026",
    "group": "Cardiovascolare",
    "drug": "propranololo",
    "kind": "clinico",
    "difficulty": 3,
    "question": "In un caso fittizio con broncospasmo, perché propranololo può essere problematico?",
    "answers": [
      "Antagonizza β2 oltre a β1",
      "Agisce come agonista β2",
      "Inibisce le fosfodiesterasi",
      "Stimola direttamente IP3"
    ],
    "correct": 0,
    "why": "Il blocco β2 può ostacolare la broncodilatazione."
  },
  {
    "id": "e027",
    "group": "Cardiovascolare",
    "drug": "amlodipina",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Qual è una spiegazione plausibile dell'edema periferico da amlodipina?",
    "answers": [
      "Alterazioni della pressione capillare da vasodilatazione arteriolare",
      "Blocca NKCC2 in modo potente",
      "Induce sempre iperaldosteronismo",
      "Riduce direttamente il numero di piastrine"
    ],
    "correct": 0,
    "why": "Un aumento della pressione idrostatica nei capillari può favorire trasudazione, non necessariamente ritenzione totale."
  },
  {
    "id": "e028",
    "group": "Cardiovascolare",
    "drug": "verapamil",
    "kind": "clinico",
    "difficulty": 3,
    "question": "Un caso sintetico assume verapamil e un beta-bloccante. Quale effetto combinato merita attenzione?",
    "answers": [
      "Rallentamento della conduzione AV",
      "Aumento diretto della filtrazione renale",
      "Degradazione aumentata della bradichinina",
      "Inibizione di fattore Xa"
    ],
    "correct": 0,
    "why": "I due farmaci possono sommarsi sul nodo AV e sulla frequenza."
  },
  {
    "id": "e029",
    "group": "Cardiovascolare",
    "drug": "ivabradina",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Quale differenza distingue ivabradina da bisoprololo?",
    "answers": [
      "Modula If/HCN, non antagonizza direttamente β1",
      "Agisce sul fattore Xa",
      "È una statina",
      "Riduce glucosuria"
    ],
    "correct": 0,
    "why": "Ivabradina agisce su HCN4 e automatismo sinusale."
  },
  {
    "id": "e030",
    "group": "Cardiovascolare",
    "drug": "amiodarone",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Perché classificare amiodarone semplicemente come 'bloccante K' è incompleto?",
    "answers": [
      "Ha effetti multipli su canali e segnali adrenergici",
      "Non interagisce con canali",
      "È un antagonista di vitamina K",
      "È un antibiotico"
    ],
    "correct": 0,
    "why": "È un antiaritmico multicanale con tossicità sistemiche importanti."
  },
  {
    "id": "e031",
    "group": "Cardiovascolare",
    "drug": "nitroglicerina",
    "kind": "clinico",
    "difficulty": 3,
    "question": "Un caso sintetico combina nitrato e inibitore PDE5. Quale via viene potenziata?",
    "answers": [
      "NO–cGMP",
      "ACE–angiotensina II",
      "NKCC2–NaCl",
      "COX–trombossano"
    ],
    "correct": 0,
    "why": "NO favorisce formazione di cGMP e l'inibizione PDE5 ne riduce la degradazione."
  },
  {
    "id": "e032",
    "group": "Cardiovascolare",
    "drug": "dobutamina",
    "kind": "teoria",
    "difficulty": 4,
    "question": "L'effetto inotropo positivo della dobutamina si collega a:",
    "answers": [
      "β1–Gs–cAMP/PKA e regolazione del calcio",
      "Inibizione diretta P2Y12",
      "Blocco della sintesi di ergosterolo",
      "Inibizione diretta di VKORC1"
    ],
    "correct": 0,
    "why": "La cascata adrenergica modula calcio intracellulare e contrattilità."
  },
  {
    "id": "e033",
    "group": "Cardiovascolare",
    "drug": "noradrenalina",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Nella vasocostrizione da noradrenalina quale componente recettoriale è centrale?",
    "answers": [
      "α1–Gq/11",
      "β2–Gi",
      "P2Y12–PKA",
      "SGLT2–ATP"
    ],
    "correct": 0,
    "why": "L'attivazione α1 favorisce PLC/IP3/Ca²⁺ nella muscolatura vascolare."
  },
  {
    "id": "e034",
    "group": "Cardiovascolare",
    "drug": "spironolattone",
    "kind": "statistica",
    "difficulty": 4,
    "question": "Nel RALES la mortalità riportata era 35% con spironolattone e 46% col placebo. Quale differenza assoluta approssimata?",
    "answers": [
      "11 punti percentuali",
      "35 punti percentuali",
      "46 punti percentuali",
      "81 punti percentuali"
    ],
    "correct": 0,
    "why": "La differenza assoluta approssimata è 46−35=11 punti percentuali su circa 24 mesi."
  },
  {
    "id": "e035",
    "group": "Rene",
    "drug": "furosemide",
    "kind": "teoria",
    "difficulty": 2,
    "question": "NKCC2 si trova fisiologicamente soprattutto:",
    "answers": [
      "Tratto ascendente spesso dell'ansa di Henle",
      "Tubulo contorto distale",
      "Piastrina",
      "Nodo del seno"
    ],
    "correct": 0,
    "why": "SLC12A1/NKCC2 sostiene il riassorbimento salino nel tratto ascendente spesso."
  },
  {
    "id": "e036",
    "group": "Rene",
    "drug": "idroclorotiazide",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Il bersaglio NCC dei tiazidici è in quale segmento?",
    "answers": [
      "Tubulo contorto distale",
      "Ansa discendente sottile",
      "Piastrina",
      "Giunzione neuromuscolare"
    ],
    "correct": 0,
    "why": "NCC (SLC12A3) è il cotrasportatore NaCl del tubulo distale."
  },
  {
    "id": "e037",
    "group": "Rene",
    "drug": "spironolattone",
    "kind": "clinico",
    "difficulty": 3,
    "question": "In un caso fittizio con iperkaliemia e ridotta funzione renale, un antagonista MR può:",
    "answers": [
      "Aumentare il rischio di ulteriore iperkaliemia",
      "Aumentare obbligatoriamente eliminazione di K",
      "Eliminare l'effetto dell'ACE-inibitore",
      "Agire direttamente su SGLT2"
    ],
    "correct": 0,
    "why": "MR antagonizzato riduce meccanismi che favoriscono la secrezione distale di K."
  },
  {
    "id": "e038",
    "group": "Rene",
    "drug": "dapagliflozin",
    "kind": "teoria",
    "difficulty": 3,
    "question": "SGLT2-inibitori possono avere effetti cardiorenali anche senza diabete perché:",
    "answers": [
      "Influenzano trasporto sodio-glucosio e feedback tubuloglomerulare",
      "Sono tutti insulinici",
      "Bloccano direttamente P2Y12",
      "Stimolano COX1"
    ],
    "correct": 0,
    "why": "Il trasporto tubulare e l'emodinamica renale sono coinvolti in effetti oltre HbA1c."
  },
  {
    "id": "e039",
    "group": "Rene",
    "drug": "empagliflozin",
    "kind": "statistica",
    "difficulty": 4,
    "question": "EMPA-KIDNEY: 13,1% vs 16,9% sull'endpoint primario. ARR approssimata?",
    "answers": [
      "3,8 punti percentuali",
      "28 punti percentuali",
      "13,1 punti percentuali",
      "30 punti percentuali"
    ],
    "correct": 0,
    "why": "Il confronto riguarda quel composito di progressione CKD/morte cardiovascolare su 2 anni mediani."
  },
  {
    "id": "e040",
    "group": "Rene",
    "drug": "dapagliflozin",
    "kind": "statistica",
    "difficulty": 5,
    "question": "DAPA-CKD riportava NNT 19 per l'endpoint composito durante il trial. Perché non vale universalmente?",
    "answers": [
      "Dipende da popolazione, endpoint e orizzonte temporale",
      "Perché è la dose prescritta",
      "Perché NNT misura l'affinità",
      "Perché tutti i pazienti hanno lo stesso rischio"
    ],
    "correct": 0,
    "why": "NNT è contestuale; l'endpoint composito non coincide con ogni singola componente."
  },
  {
    "id": "e041",
    "group": "Emostasi",
    "drug": "warfarin",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Perché l'effetto anticoagulante del warfarin ha latenza rispetto all'inibizione enzimatica?",
    "answers": [
      "Devono degradarsi i fattori già funzionalmente attivi",
      "Agisce come inibitore diretto Xa",
      "Attiva Gs",
      "Aumenta immediatamente P2Y12"
    ],
    "correct": 0,
    "why": "Il ricambio dei fattori vitamina K dipendenti è cruciale per l'effetto."
  },
  {
    "id": "e042",
    "group": "Emostasi",
    "drug": "apixaban",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Apixaban richiede antitrombina per inibire Xa?",
    "answers": [
      "No, è un inibitore diretto",
      "Sì, come l'eparina",
      "Sì, come il fondaparinux",
      "Agisce solo su IIa"
    ],
    "correct": 0,
    "why": "Apixaban si lega direttamente al fattore Xa."
  },
  {
    "id": "e043",
    "group": "Emostasi",
    "drug": "fondaparinux",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Perché fondaparinux non media il legame a ponte antitrombina–IIa come l'eparina non frazionata?",
    "answers": [
      "La catena pentasaccaridica è troppo corta",
      "Perché è un recettore GPCR",
      "Perché agisce su P2Y12",
      "Perché è un antibiotico"
    ],
    "correct": 0,
    "why": "Il ponte necessario all'inibizione di trombina richiede una catena più lunga."
  },
  {
    "id": "e044",
    "group": "Emostasi",
    "drug": "enoxaparina",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Un'emivita dell'attività anti-Xa è identica a un'emivita plasmatica?",
    "answers": [
      "No, misura un fenomeno farmacodinamico e va contestualizzata",
      "Sempre sì",
      "Solo nei biologici",
      "È una percentuale di assorbimento"
    ],
    "correct": 0,
    "why": "La misura di attività anti-Xa non è automaticamente uguale alla concentrazione di molecola."
  },
  {
    "id": "e045",
    "group": "Emostasi",
    "drug": "dabigatran",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Dabigatran etexilato è:",
    "answers": [
      "Un profarmaco che diventa inibitore diretto IIa",
      "Un antagonista VKORC1",
      "Un antiaggregante COX1",
      "Un modulatore HCN"
    ],
    "correct": 0,
    "why": "La forma attiva dabigatran inibisce la trombina."
  },
  {
    "id": "e046",
    "group": "Emostasi",
    "drug": "asa",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Perché un breve tempo nel plasma non annulla immediatamente l'azione dell'aspirina sulle piastrine?",
    "answers": [
      "COX-1 è modificata irreversibilmente e le piastrine devono essere rinnovate",
      "Il farmaco si lega a Gs per mesi",
      "Blocca CYP2C19",
      "È eliminato solo dalla bile"
    ],
    "correct": 0,
    "why": "La persistenza funzionale è legata alla vita delle piastrine esposte."
  },
  {
    "id": "e047",
    "group": "Emostasi",
    "drug": "clopidogrel",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Quale recettore viene antagonizzato dal metabolita attivo del clopidogrel?",
    "answers": [
      "P2Y12",
      "β2",
      "AT1",
      "MR"
    ],
    "correct": 0,
    "why": "P2Y12 è un GPCR piastrinico attivato dall'ADP."
  },
  {
    "id": "e048",
    "group": "Emostasi",
    "drug": "apixaban",
    "kind": "statistica",
    "difficulty": 5,
    "question": "ARISTOTLE riporta 1,27%/anno contro 1,60%/anno. È corretto derivare direttamente NNT a 1,8 anni?",
    "answers": [
      "No, sono tassi annualizzati e occorrono rischi cumulativi appropriati",
      "Sì, basta dividere 100 per 0,33",
      "Sì, sempre 3",
      "No, perché un HR non esiste"
    ],
    "correct": 0,
    "why": "I tassi annualizzati non coincidono con proporzioni cumulative; serve modello temporale adeguato."
  },
  {
    "id": "e049",
    "group": "Emostasi",
    "drug": "asa",
    "kind": "statistica",
    "difficulty": 5,
    "question": "ASCEND: 8,5% vs 9,6% eventi vascolari e 4,1% vs 3,2% sanguinamenti. Cosa insegna?",
    "answers": [
      "Beneficio e danno assoluto vanno valutati su endpoint distinti",
      "Solo il RR vascolare conta",
      "Il sanguinamento non è clinico",
      "Le due misure equivalgono a una dose"
    ],
    "correct": 0,
    "why": "La decisione informata richiede bilancio di eventi diversi senza semplici sottrazioni di NNT e NNH."
  },
  {
    "id": "e050",
    "group": "Respiratorio",
    "drug": "salbutamolo",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Che cosa distingue broncodilatazione β2 e antimuscarinici?",
    "answers": [
      "Bersagli diversi convergono sul tono del muscolo bronchiale",
      "Entrambi sono inibitori NKCC2",
      "Entrambi stimolano AT1",
      "Entrambi hanno lo stesso recettore"
    ],
    "correct": 0,
    "why": "β2 favorisce segnalazione Gs/cAMP mentre antimuscarinici riducono componente vagale."
  },
  {
    "id": "e051",
    "group": "Respiratorio",
    "drug": "salbutamolo",
    "kind": "clinico",
    "difficulty": 3,
    "question": "Caso simulato: maggiore frequenza d'uso di broncodilatatore al bisogno per asma. Quale interpretazione va considerata?",
    "answers": [
      "Possibile controllo insufficiente dell'infiammazione/asma",
      "Autorizza automaticamente dosi più alte",
      "Dimostra guarigione",
      "Dimostra assenza di rischio sistemico"
    ],
    "correct": 0,
    "why": "La broncodilatazione sintomatica non sostituisce necessariamente il controllo della malattia infiammatoria."
  },
  {
    "id": "e052",
    "group": "Respiratorio",
    "drug": "salbutamolo",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Tremore e ipokaliemia dopo maggiore esposizione a β2-agonista si collegano a:",
    "answers": [
      "Stimolazione adrenergica in tessuti diversi dai bronchi",
      "Blocco di VKORC1",
      "Assenza di farmacodinamica",
      "Riduzione della produzione di cAMP"
    ],
    "correct": 0,
    "why": "Gli effetti sistemici derivano dalla distribuzione dei recettori e dalla dose/esposizione."
  },
  {
    "id": "e053",
    "group": "SNC",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Un recettore GABA-A è principalmente:",
    "answers": [
      "Canale ionico attivato da ligando",
      "Recettore nucleare",
      "Inibitore diretto Xa",
      "Trasportatore SGLT2"
    ],
    "correct": 0,
    "why": "GABA-A è un canale ionotropico che regola conduttanza al cloruro."
  },
  {
    "id": "e054",
    "group": "SNC",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Le benzodiazepine tipicamente:",
    "answers": [
      "Potenziano allostericamente l'azione del GABA su molti GABA-A",
      "Sono agonisti diretti di P2Y12",
      "Inibiscono trombina",
      "Aumentano direttamente la produzione di ATP"
    ],
    "correct": 0,
    "why": "Si legano a siti allosterici in specifici assemblaggi GABA-A."
  },
  {
    "id": "e055",
    "group": "SNC",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "SV2A è principalmente una proteina:",
    "answers": [
      "Delle vescicole sinaptiche",
      "Di coagulazione",
      "Del tubulo prossimale",
      "Di membrana eritrocitaria"
    ],
    "correct": 0,
    "why": "Il legame a SV2A è associato all'attività del levetiracetam."
  },
  {
    "id": "e056",
    "group": "SNC",
    "drug": "",
    "kind": "clinico",
    "difficulty": 4,
    "question": "In un caso simulato con più depressori del SNC, il rischio respiratorio può:",
    "answers": [
      "Aumentare per sommazione farmacodinamica",
      "Essere sempre nullo",
      "Diminuire obbligatoriamente",
      "Dipendere solo dalla formula chimica"
    ],
    "correct": 0,
    "why": "Le interazioni farmacodinamiche possono sommarsi senza cambiare l'AUC dei singoli farmaci."
  },
  {
    "id": "e057",
    "group": "Dolore/Infiammazione",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "COX partecipa alla sintesi di:",
    "answers": [
      "Prostanoidi, da acido arachidonico",
      "Fattore Xa",
      "Angiotensina II",
      "SGLT2"
    ],
    "correct": 0,
    "why": "La via delle cicloossigenasi genera intermedi verso prostaglandine e trombossani."
  },
  {
    "id": "e058",
    "group": "Dolore/Infiammazione",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Perché un FANS può aggravare un rischio renale in condizioni predisponenti?",
    "answers": [
      "Inibizione di prostaglandine che sostengono emodinamica renale",
      "Aumento obbligatorio dell'eGFR",
      "Blocco dell'antitrombina",
      "Attivazione di P2Y12"
    ],
    "correct": 0,
    "why": "Le prostaglandine renali possono contribuire a preservare perfusione in alcune condizioni."
  },
  {
    "id": "e059",
    "group": "Dolore/Infiammazione",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "I recettori oppioidi μ sono frequentemente accoppiati a:",
    "answers": [
      "Gi/o",
      "Gs soltanto",
      "Recettori tirosin-chinasici",
      "Canali NMDA irreversibili"
    ],
    "correct": 0,
    "why": "La segnalazione Gi/o contribuisce all'inibizione di trasmissione nocicettiva."
  },
  {
    "id": "e060",
    "group": "Endocrinologia",
    "drug": "dapagliflozin",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Una riduzione di HbA1c e un beneficio sulla progressione renale sono:",
    "answers": [
      "Endpoint differenti, con interpretazioni diverse",
      "La stessa cosa",
      "Proprietà della formula molecolare",
      "Sempre un NNT"
    ],
    "correct": 0,
    "why": "Esiti glicemici e prognostici richiedono studi e popolazioni appropriati."
  },
  {
    "id": "e061",
    "group": "Endocrinologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Il recettore insulinico è principalmente:",
    "answers": [
      "Recettore tirosin-chinasico",
      "GPCR Gi/o",
      "Canale del calcio L",
      "Trombina"
    ],
    "correct": 0,
    "why": "L'attivazione del recettore insulinico coinvolge autofosforilazione e vie IRS/PI3K-AKT."
  },
  {
    "id": "e062",
    "group": "Endocrinologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Recettori nucleari degli ormoni tiroidei producono molti effetti attraverso:",
    "answers": [
      "Regolazione trascrizionale",
      "Inibizione diretta del fattore Xa",
      "Apertura immediata di NKCC2",
      "Distruzione del peptidoglicano"
    ],
    "correct": 0,
    "why": "L'effetto trascrizionale richiede tempo e differisce dai secondi messaggeri acuti."
  },
  {
    "id": "e063",
    "group": "Endocrinologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Un agonista GLP-1R agisce principalmente su:",
    "answers": [
      "Un recettore GPCR integrato nel controllo metabolico",
      "VKORC1",
      "COX-1 piastrinica",
      "Fattore IIa"
    ],
    "correct": 0,
    "why": "GLP-1R è un GPCR implicato in secrezione insulinica glucosio-dipendente e sazietà."
  },
  {
    "id": "e064",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Il bersaglio classico di molti β-lattamici è:",
    "answers": [
      "Penicillin-binding proteins e sintesi del peptidoglicano",
      "COX-1 piastrinica",
      "HCN4",
      "Recettore β2"
    ],
    "correct": 0,
    "why": "Le PBP sostengono reazioni del peptidoglicano della parete batterica."
  },
  {
    "id": "e065",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "L'indice PK/PD frequentemente rilevante per β-lattamici è:",
    "answers": [
      "Tempo della frazione libera sopra MIC (fT>MIC)",
      "Solo Emax recettoriale",
      "Solo legame proteico",
      "Numero di confezioni"
    ],
    "correct": 0,
    "why": "L'esposizione temporale rispetto alla MIC orienta spesso l'attività β-lattamica."
  },
  {
    "id": "e066",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Una β-lattamasi può contribuire alla resistenza perché:",
    "answers": [
      "Idrolizza l'anello β-lattamico di molecole sensibili",
      "Inibisce PKA del paziente",
      "Aumenta la filtrazione glomerulare",
      "Blocca P2Y12"
    ],
    "correct": 0,
    "why": "È uno dei diversi meccanismi di resistenza ai β-lattamici."
  },
  {
    "id": "e067",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "La MIC in vitro da sola determina esattamente la dose di un farmaco per ogni infezione?",
    "answers": [
      "No: occorrono sede, breakpoint, PK/PD e paziente",
      "Sì, sempre",
      "Solo se il farmaco è orale",
      "Solo in gravidanza"
    ],
    "correct": 0,
    "why": "MIC e breakpoint vanno contestualizzati con esposizione raggiungibile e sito di infezione."
  },
  {
    "id": "e068",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Gli analoghi nucleosidici antivirali possono richiedere:",
    "answers": [
      "Fosforilazione/attivazione intracellulare specifica",
      "Legame a MR",
      "Produzione di trombossano",
      "Attivazione di Gs bronchiale"
    ],
    "correct": 0,
    "why": "Molte molecole diventano attive dopo specifici passaggi intracellulari."
  },
  {
    "id": "e069",
    "group": "Antimicrobici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Quale è un bersaglio comune degli azoli antifungini?",
    "answers": [
      "Lanosterolo 14α-demetilasi (sintesi di ergosterolo)",
      "NKCC2",
      "P2Y12",
      "HCN4"
    ],
    "correct": 0,
    "why": "Gli azoli interferiscono con una tappa della biosintesi di steroli fungini."
  },
  {
    "id": "e070",
    "group": "Oncologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Un recettore tirosin-chinasico può attivare:",
    "answers": [
      "RAS–RAF–MEK–ERK",
      "Solo la vitamina K",
      "Solo P2Y12",
      "Solo canali HCN"
    ],
    "correct": 0,
    "why": "La fosforilazione recluta adattatori e avvia vie di crescita."
  },
  {
    "id": "e071",
    "group": "Oncologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "PD-1 e CTLA-4 sono esempi di:",
    "answers": [
      "Checkpoint regolatori della risposta immune",
      "Trasportatori renali",
      "Antibiotici β-lattamici",
      "Fattori vitamina K dipendenti"
    ],
    "correct": 0,
    "why": "La loro modulazione farmacologica può influenzare risposta antitumorale."
  },
  {
    "id": "e072",
    "group": "Oncologia",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "In un ADC il linker collega:",
    "answers": [
      "Anticorpo e payload",
      "Farmaco e guanilato ciclasi soltanto",
      "ATP e PKA",
      "Vitamina K e trombina"
    ],
    "correct": 0,
    "why": "Il linker condiziona stabilità e rilascio del carico attivo."
  },
  {
    "id": "e073",
    "group": "Oncologia",
    "drug": "",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Un paziente sintetico riceve un checkpoint inhibitor e sviluppa infiammazione d'organo. Perché è plausibile?",
    "answers": [
      "La modulazione immune può favorire tossicità immunomediata",
      "I checkpoint sono diuretici dell'ansa",
      "È sempre causato da VKORC1",
      "Un anticorpo non può modificare l'immunità"
    ],
    "correct": 0,
    "why": "Gli effetti avversi immunomediati riflettono l'attivazione di risposte immunitarie in tessuti sani."
  },
  {
    "id": "e074",
    "group": "Biotecnologici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Per un anticorpo terapeutico, la regione Fc può influenzare:",
    "answers": [
      "Interazioni con FcRn e cellule effettrici",
      "Soltanto la formula di un nucleotide",
      "Esclusivamente la pompa protonica",
      "Il peso dell'emoglobina"
    ],
    "correct": 0,
    "why": "FcRn contribuisce al riciclo e alla persistenza di diverse IgG."
  },
  {
    "id": "e075",
    "group": "Biotecnologici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Un biosimilare è semplicemente la stessa sostanza piccola molecola con diversa confezione?",
    "answers": [
      "No, richiede comparabilità di prodotto biologico complesso",
      "Sì, per definizione",
      "Solo per antibiotici",
      "Solo per pro-farmaci"
    ],
    "correct": 0,
    "why": "Per i biologici la valutazione di biosimilarità integra struttura, funzione e dati pertinenti."
  },
  {
    "id": "e076",
    "group": "Biotecnologici",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "La formazione di anticorpi anti-farmaco può:",
    "answers": [
      "Modificare clearance, efficacia e sicurezza di alcuni biologici",
      "Aumentare sempre biodisponibilità del principio attivo",
      "Eliminare qualsiasi interazione",
      "Trasformare il farmaco in sale"
    ],
    "correct": 0,
    "why": "Immunogenicità è un fattore farmaco-/paziente-specifico."
  },
  {
    "id": "e077",
    "group": "Farmacogenomica",
    "drug": "clopidogrel",
    "kind": "teoria",
    "difficulty": 2,
    "question": "Il CYP2C19 è rilevante per clopidogrel perché:",
    "answers": [
      "Partecipa all'attivazione del profarmaco",
      "È il recettore piastrinico",
      "È la sostanza attiva",
      "È un canale cardiaco"
    ],
    "correct": 0,
    "why": "Il fenotipo metabolico può condizionare la quantità del metabolita attivo."
  },
  {
    "id": "e078",
    "group": "Farmacogenomica",
    "drug": "nebivololo",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Differenze CYP2D6 possono influenzare:",
    "answers": [
      "L'esposizione e il metabolismo di nebivololo",
      "La presenza di renina nella formula",
      "La struttura del fattore Xa",
      "Solo la concentrazione di ossigeno"
    ],
    "correct": 0,
    "why": "La metabolizzazione di nebivololo varia fra fenotipi metabolici."
  },
  {
    "id": "e079",
    "group": "Farmacogenomica",
    "drug": "",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Perché un'indicazione farmacogenetica non è automaticamente trasferibile fra tutti i farmaci di classe?",
    "answers": [
      "Conta il substrato e l'evidenza gene-farmaco specifica",
      "Ogni CYP ha la stessa attività",
      "Un test genetico impone sempre una dose",
      "La classe ATC è un gene"
    ],
    "correct": 0,
    "why": "Le associazioni farmacogenetiche sono sostanza- e contesto-specifiche."
  },
  {
    "id": "e080",
    "group": "Farmacovigilanza",
    "drug": "",
    "kind": "teoria",
    "difficulty": 3,
    "question": "Perché FAERS e altre segnalazioni spontanee non forniscono direttamente incidenza?",
    "answers": [
      "Mancano denominatori adeguati e causalità definita",
      "Tutte le segnalazioni sono falsificate",
      "Tutti i pazienti sono seguiti attivamente",
      "Perché non riportano alcun evento"
    ],
    "correct": 0,
    "why": "Sono utili per segnali di sicurezza, ma la frequenza richiede studi con denominatore."
  },
  {
    "id": "e081",
    "group": "Farmacovigilanza",
    "drug": "",
    "kind": "clinico",
    "difficulty": 4,
    "question": "Una persona sintetica ha CKD e assume farmaci a eliminazione renale. Quale interpretazione è più rigorosa?",
    "answers": [
      "Valutare dati PK specifici di farmaco e metaboliti",
      "Adeguare tutti i farmaci della stessa percentuale",
      "Assumere nessuna variazione",
      "Basarsi soltanto sul peso"
    ],
    "correct": 0,
    "why": "eGFR e clearance del singolo composto non sono sempre equivalenti."
  },
  {
    "id": "e082",
    "group": "Evidenze",
    "drug": "",
    "kind": "statistica",
    "difficulty": 2,
    "question": "Rischio trattati 12%, controlli 20%. Quanto vale ARR?",
    "answers": [
      "8 punti percentuali",
      "12 punti percentuali",
      "32 punti percentuali",
      "60 punti percentuali"
    ],
    "correct": 0,
    "why": "ARR=20%-12%=8 punti percentuali, per endpoint e durata considerati."
  },
  {
    "id": "e083",
    "group": "Evidenze",
    "drug": "",
    "kind": "statistica",
    "difficulty": 3,
    "question": "ARR 8 punti percentuali: NNT approssimato?",
    "answers": [
      "13",
      "8",
      "12",
      "125"
    ],
    "correct": 0,
    "why": "1/0,08=12,5, arrotondato per eccesso a 13."
  },
  {
    "id": "e084",
    "group": "Evidenze",
    "drug": "",
    "kind": "statistica",
    "difficulty": 3,
    "question": "Rischio evento avverso 5% trattati, 2% controlli: NNH?",
    "answers": [
      "34",
      "3",
      "50",
      "20"
    ],
    "correct": 0,
    "why": "Aumento assoluto del rischio=3%, NNH=ceil(1/0,03)=34."
  },
  {
    "id": "e085",
    "group": "Evidenze",
    "drug": "",
    "kind": "statistica",
    "difficulty": 4,
    "question": "Nel trial HOPE, 14,0% vs 17,8% sul composito a circa 5 anni: differenza assoluta?",
    "answers": [
      "3,8 punti percentuali",
      "22 punti percentuali",
      "14 punti percentuali",
      "31,8 punti percentuali"
    ],
    "correct": 0,
    "why": "L'endpoint è composito (morte CV, infarto, ictus), non la sola mortalità."
  },
  {
    "id": "e086",
    "group": "Evidenze",
    "drug": "dapagliflozin",
    "kind": "statistica",
    "difficulty": 4,
    "question": "DAPA-HF: 16,3% vs 21,2% sull'endpoint primario. NNT derivato da rischi arrotondati?",
    "answers": [
      "21",
      "5",
      "74",
      "100"
    ],
    "correct": 0,
    "why": "ARR 4,9%; 1/0,049 ≈20,41, dunque NNT orientativo 21 nel follow-up indicato."
  },
  {
    "id": "e087",
    "group": "Evidenze",
    "drug": "dapagliflozin",
    "kind": "statistica",
    "difficulty": 5,
    "question": "DAPA-CKD riportava NNT 19 da dati completi. Quale affermazione è corretta?",
    "answers": [
      "Il valore si riferisce all'endpoint e alla durata dello studio",
      "È la stessa cosa dell'emivita",
      "Vale in tutte le indicazioni",
      "È il numero di eventi del gruppo placebo"
    ],
    "correct": 0,
    "why": "I rischi arrotondati possono dare una stima ma il NNT riportato dal trial è basato sui suoi dati."
  },
  {
    "id": "e088",
    "group": "Evidenze",
    "drug": "",
    "kind": "statistica",
    "difficulty": 5,
    "question": "Una riduzione relativa del rischio del 50% con rischio iniziale 2 per mille implica ARR di circa:",
    "answers": [
      "1 per mille",
      "50 punti percentuali",
      "25 per mille",
      "2%"
    ],
    "correct": 0,
    "why": "Rischio trattati 1‰, rischio controllo 2‰: ARR 1‰; un RR non basta per dedurre ARR senza rischio base."
  },
  {
    "id": "e089",
    "group": "Evidenze",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Un intervallo di confidenza al 95% rappresenta:",
    "answers": [
      "Un intervallo costruito con una procedura che copre il parametro nel 95% dei campioni ripetuti sotto le assunzioni",
      "Probabilità del 95% che l'ipotesi nulla sia falsa",
      "Il rischio assoluto del singolo paziente",
      "La probabilità del 95% di guarigione"
    ],
    "correct": 0,
    "why": "Interpretazione frequentista: riguarda la copertura della procedura, non una probabilità posteriore del parametro."
  },
  {
    "id": "e090",
    "group": "Evidenze",
    "drug": "",
    "kind": "teoria",
    "difficulty": 4,
    "question": "Quale differenza distingue HR da rischio relativo cumulativo?",
    "answers": [
      "HR riguarda hazard nel tempo; RR confronta probabilità in un intervallo",
      "Sono sinonimi per qualsiasi evento",
      "HR è una misura di concentrazione",
      "RR dipende solo da dose"
    ],
    "correct": 0,
    "why": "Un HR non è, in generale, il rischio relativo cumulativo al termine del follow-up."
  },
  {
    "id": "e091",
    "group": "Evidenze",
    "drug": "",
    "kind": "teoria",
    "difficulty": 5,
    "question": "Quale rischio introduce l'interruzione anticipata di un trial per beneficio?",
    "answers": [
      "Può contribuire a sovrastima dell'entità dell'effetto osservato",
      "Dimostra che il farmaco è sicuro in ogni popolazione",
      "Rende ogni endpoint equivalente",
      "Annulla il confronto randomizzato"
    ],
    "correct": 0,
    "why": "La decisione di stop e il numero di eventi devono entrare nella valutazione critica."
  }
];
