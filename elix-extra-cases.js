/* ELIX: original synthetic vignettes; questions are deliberately narrow, not prescribing algorithms. */
export const EXTRA_CASES = [
  {
    "id": "digossina-ipokaliemia",
    "label": "Caso 06",
    "title": "Digossina, potassio e sintomi sospetti",
    "area": "Cardiologia × Nefrologia",
    "difficulty": "Avanzato",
    "time": "7 min",
    "patient": "Uomo, 74 anni",
    "history": "Caso sintetico: terapia con digossina per un problema cardiaco. Da una settimana assume anche un diuretico dell'ansa. Riferisce nausea, visione alterata e palpitazioni; un controllo evidenzia K⁺ 2,9 mmol/L ed eGFR 34 mL/min/1,73 m². Non sono disponibili ECG o concentrazione di digossina.",
    "vitals": [
      {
        "label": "K⁺",
        "value": "2,9",
        "unit": "mmol/L"
      },
      {
        "label": "eGFR",
        "value": "34",
        "unit": "mL/min/1,73m²"
      },
      {
        "label": "FC",
        "value": "56",
        "unit": "bpm"
      }
    ],
    "question": "Quale principio attivo deve far considerare una possibile tossicità favorita da ipokaliemia e ridotta funzione renale?",
    "options": [
      {
        "drug": "Digossina",
        "id": "digossina",
        "correct": true,
        "effect": "Rischio digitalico ↑",
        "response": "Il quadro fittizio contiene fattori di rischio compatibili; non permette una diagnosi certa. Servono valutazione clinica, ECG e misure pertinenti.",
        "why": "La digossina inibisce Na⁺/K⁺-ATPasi. Ipokaliemia e ridotta eliminazione renale possono favorire tossicità."
      },
      {
        "drug": "Amlodipina",
        "id": "amlodipina",
        "correct": false,
        "effect": "Non spiega il meccanismo specifico",
        "response": "Il calcio-antagonismo vascolare non coincide con la tossicità tipica da digitalici in questo scenario.",
        "why": "Amlodipina agisce sui canali del calcio L, non sulla pompa Na⁺/K⁺-ATPasi."
      },
      {
        "drug": "Losartan",
        "id": "losartan",
        "correct": false,
        "effect": "Meccanismo differente",
        "response": "Losartan modula RAAS ma non spiega direttamente il pattern di tossicità digitalica proposto.",
        "why": "Losartan antagonizza AT₁."
      }
    ],
    "learn": "La tossicità farmacologica è una relazione fra bersaglio, potassio, eliminazione renale e sintomi: l'emivita da sola non spiega il quadro.",
    "target": "ATP1A1"
  },
  {
    "id": "sglt2-digiuno",
    "label": "Caso 07",
    "title": "SGLT2 e chetosi con glicemia non elevata",
    "area": "Endocrinologia × Emergenze",
    "difficulty": "Avanzato",
    "time": "7 min",
    "patient": "Donna, 58 anni",
    "history": "Caso sintetico: diabete tipo 2, trattamento cronico con un inibitore SGLT2. Durante una malattia acuta ha assunto pochi carboidrati. Ora presenta nausea, respiro profondo, chetonemia elevata, acidosi metabolica ma glicemia di 172 mg/dL.",
    "vitals": [
      {
        "label": "Glicemia",
        "value": "172",
        "unit": "mg/dL"
      },
      {
        "label": "pH",
        "value": "7,23",
        "unit": "arterioso"
      },
      {
        "label": "Chetoni",
        "value": "Alti",
        "unit": "sangue"
      }
    ],
    "question": "Quale classe spiega la possibilità di chetoacidosi senza marcata iperglicemia?",
    "options": [
      {
        "drug": "Dapagliflozin",
        "id": "dapagliflozin",
        "correct": true,
        "effect": "Possibile DKA euglicemica",
        "response": "Il rischio è compatibile con un inibitore SGLT2; lo scenario richiederebbe valutazione urgente nella pratica clinica, non autogestione.",
        "why": "La glucosuria indotta da SGLT2 può attenuare l'iperglicemia pur in presenza di acidosi e chetosi."
      },
      {
        "drug": "Atorvastatina",
        "id": "atorvastatina",
        "correct": false,
        "effect": "Non è il nesso cercato",
        "response": "L'inibizione di HMGCR non è il meccanismo descritto.",
        "why": "La statina modula la sintesi di colesterolo e non induce tipicamente glucosuria."
      },
      {
        "drug": "Bisoprololo",
        "id": "bisoprololo",
        "correct": false,
        "effect": "Altro bersaglio",
        "response": "I beta-bloccanti hanno altri rischi e meccanismi; non è la risposta del quesito.",
        "why": "Bisoprololo antagonizza β1, non SGLT2."
      }
    ],
    "learn": "Il beneficio cardiorenale degli SGLT2-inibitori convive con rischi metabolici specifici: non confondere glicemia normale con assenza di acidosi.",
    "target": "SLC5A2"
  },
  {
    "id": "clopidogrel-gene",
    "label": "Caso 08",
    "title": "L'attivazione del profarmaco",
    "area": "Farmacogenomica × Emostasi",
    "difficulty": "Intermedio",
    "time": "6 min",
    "patient": "Uomo, 63 anni",
    "history": "Caso sintetico: dopo una procedura coronarica è in trattamento antiaggregante. Un'analisi farmacogenetica documenta attività CYP2C19 ridotta. L'esercizio richiede di identificare il farmaco la cui attivazione dipende in parte da questo enzima, non di cambiare la prescrizione.",
    "vitals": [
      {
        "label": "CYP2C19",
        "value": "Ridotto",
        "unit": "fenotipo"
      },
      {
        "label": "FC",
        "value": "73",
        "unit": "bpm"
      },
      {
        "label": "PA",
        "value": "126/78",
        "unit": "mmHg"
      }
    ],
    "question": "Quale farmaco richiede bioattivazione metabolica in cui CYP2C19 è rilevante?",
    "options": [
      {
        "drug": "Clopidogrel",
        "id": "clopidogrel",
        "correct": true,
        "effect": "Metabolita attivo ↓ possibile",
        "response": "Il profarmaco può produrre meno metabolita attivo nel fenotipo descritto. L'interpretazione clinica dipende da linee guida e contesto.",
        "why": "CYP2C19 contribuisce alla formazione del metabolita irreversibilmente antagonista di P2Y₁₂."
      },
      {
        "drug": "Apixaban",
        "id": "apixaban",
        "correct": false,
        "effect": "Non richiede la stessa attivazione",
        "response": "Apixaban è un anti-Xa diretto e non un profarmaco attivato tramite CYP2C19.",
        "why": "Apixaban lega direttamente il fattore Xa."
      },
      {
        "drug": "Acido acetilsalicilico",
        "id": "asa",
        "correct": false,
        "effect": "Meccanismo COX-1",
        "response": "L'effetto antiaggregante dell'ASA non dipende dall'attivazione CYP2C19.",
        "why": "ASA acetila COX-1 piastrinica."
      }
    ],
    "learn": "Un CYP meno attivo aumenta l'esposizione di alcuni farmaci attivi ma può ridurre l'efficacia di un profarmaco: il segno dell'effetto non è universale.",
    "target": "P2RY12"
  },
  {
    "id": "nitrati-pde5",
    "label": "Caso 09",
    "title": "Una via del cGMP troppo stimolata",
    "area": "Cardiologia × Interazioni",
    "difficulty": "Intermedio",
    "time": "6 min",
    "patient": "Uomo, 66 anni",
    "history": "Caso sintetico: paziente in trattamento con un nitrato organico per sintomi anginosi. Riferisce assunzione recente di un inibitore della fosfodiesterasi 5, senza informarne il curante. L'esercizio valuta il meccanismo dell'interazione, non un piano d'azione.",
    "vitals": [
      {
        "label": "PA",
        "value": "92/56",
        "unit": "mmHg"
      },
      {
        "label": "FC",
        "value": "104",
        "unit": "bpm"
      },
      {
        "label": "SpO₂",
        "value": "97",
        "unit": "%"
      }
    ],
    "question": "Quale farmaco utilizza la via NO–guanilato ciclasi–cGMP, creando l'interazione descritta?",
    "options": [
      {
        "drug": "Nitroglicerina",
        "id": "nitroglicerina",
        "correct": true,
        "effect": "Segnale cGMP potenziato",
        "response": "La combinazione aumenta il rischio di marcata ipotensione. Nel paziente reale sarebbe una situazione da valutare clinicamente.",
        "why": "I nitrati favoriscono segnalazione NO–cGMP; PDE5 ne limita la degradazione."
      },
      {
        "drug": "Furosemide",
        "id": "furosemide",
        "correct": false,
        "effect": "Via renale distinta",
        "response": "Furosemide inibisce NKCC2, non la guanilato ciclasi.",
        "why": "La sua diuresi segue un trasportatore nel nefrone."
      },
      {
        "drug": "Clopidogrel",
        "id": "clopidogrel",
        "correct": false,
        "effect": "Via piastrinica distinta",
        "response": "P2Y12 non è la via centrale dell'interazione del quesito.",
        "why": "Il metabolita attivo di clopidogrel antagonizza P2Y12."
      }
    ],
    "learn": "Due molecole possono convergere sullo stesso secondo messaggero pur agendo in passaggi diversi: sintesi di cGMP e degradazione di cGMP.",
    "target": "GUCY1A1"
  },
  {
    "id": "amiodarone-tiroide",
    "label": "Caso 10",
    "title": "L'antiaritmico e la tiroide",
    "area": "Cardiologia × Endocrinologia",
    "difficulty": "Intermedio",
    "time": "6 min",
    "patient": "Donna, 68 anni",
    "history": "Caso sintetico: terapia cronica con antiaritmico, alterazione recente dei parametri tiroidei e sintomi aspecifici. Non si dispone ancora dei dati necessari per distinguere le diverse forme di disfunzione tiroidea indotta dal trattamento.",
    "vitals": [
      {
        "label": "TSH",
        "value": "Alterato",
        "unit": "laboratorio"
      },
      {
        "label": "FC",
        "value": "83",
        "unit": "bpm"
      },
      {
        "label": "SpO₂",
        "value": "97",
        "unit": "%"
      }
    ],
    "question": "Quale farmaco è noto per il legame con disfunzioni tiroidee e lunga persistenza tissutale?",
    "options": [
      {
        "drug": "Amiodarone",
        "id": "amiodarone",
        "correct": true,
        "effect": "Possibile tossicità tiroidea",
        "response": "Amiodarone richiede sorveglianza tiroidea e altri controlli; una TSH alterata non identifica da sola il tipo di disfunzione.",
        "why": "La molecola contiene iodio e può alterare funzione e metabolismo tiroidei attraverso meccanismi differenti."
      },
      {
        "drug": "Ivabradina",
        "id": "ivabradina",
        "correct": false,
        "effect": "Bersaglio If",
        "response": "Ivabradina può produrre bradicardia e fosfeni, ma non è la tossicità caratteristica cercata.",
        "why": "Modula HCN4/If nel nodo senoatriale."
      },
      {
        "drug": "Amlodipina",
        "id": "amlodipina",
        "correct": false,
        "effect": "Altro meccanismo",
        "response": "Il blocco dei canali Ca²⁺ L non spiega il pattern associato all'antiaritmico descritto.",
        "why": "Amlodipina agisce prevalentemente sulla muscolatura vascolare."
      }
    ],
    "learn": "La tossicità cronica può riflettere distribuzione, accumulo e metaboliti, non soltanto una concentrazione istantanea.",
    "target": "KCNH2"
  },
  {
    "id": "asa-prevenzione",
    "label": "Caso 11",
    "title": "Beneficio e danno nello stesso trial",
    "area": "Farmacologia clinica × Evidenze",
    "difficulty": "Avanzato",
    "time": "7 min",
    "patient": "Donna, 60 anni",
    "history": "Esercizio ispirato ai risultati pubblicati di ASCEND, non basato su una paziente reale. Confronto aspirina contro placebo in persone con diabete senza malattia cardiovascolare evidente: eventi vascolari 8,5% vs 9,6%; sanguinamento maggiore 4,1% vs 3,2%. Follow-up medio 7,4 anni.",
    "vitals": [
      {
        "label": "Beneficio",
        "value": "1,1 pp",
        "unit": "ARR"
      },
      {
        "label": "Danno",
        "value": "0,9 pp",
        "unit": "ARI"
      },
      {
        "label": "Follow-up",
        "value": "7,4",
        "unit": "anni"
      }
    ],
    "question": "Quale farmaco comporta questo particolare bilancio tra effetto antiaggregante e rischio emorragico nello studio?",
    "options": [
      {
        "drug": "Acido acetilsalicilico",
        "id": "asa",
        "correct": true,
        "effect": "Vascolare ↓ / sanguinamento ↑",
        "response": "Hai identificato il trattamento dello studio. Occorre tenere separati endpoint beneficio e danno, popolazione e follow-up.",
        "why": "L'ASA inibisce irreversibilmente COX-1 piastrinica; il trial ASCEND documenta sia beneficio sia aumento di sanguinamento."
      },
      {
        "drug": "Atorvastatina",
        "id": "atorvastatina",
        "correct": false,
        "effect": "Effetto lipidico distinto",
        "response": "Atorvastatina non è il trattamento randomizzato del confronto riportato.",
        "why": "Agisce su HMGCR, con endpoint e studi differenti."
      },
      {
        "drug": "Apixaban",
        "id": "apixaban",
        "correct": false,
        "effect": "Altro anticoagulante",
        "response": "Apixaban è un inibitore diretto Xa e non è la molecola valutata in ASCEND.",
        "why": "Il confronto ASCEND riguarda antiaggregazione con aspirina, non anti-Xa."
      }
    ],
    "learn": "NNT e NNH appartengono a endpoint diversi: da soli non dicono se un trattamento abbia beneficio netto per ogni persona.",
    "target": "PTGS1"
  },
  {
    "id": "raas-bradichinina",
    "label": "Caso 12",
    "title": "La tosse e la bradichinina",
    "area": "Cardiovascolare × Meccanismi",
    "difficulty": "Fondamentale",
    "time": "5 min",
    "patient": "Uomo, 56 anni",
    "history": "Caso sintetico: compare tosse secca persistente dopo l'introduzione di un farmaco per ipertensione. Non ci sono dati per stabilire la causa reale, ma il quesito confronta i meccanismi farmacologici che coinvolgono le chinine.",
    "vitals": [
      {
        "label": "PA",
        "value": "124/76",
        "unit": "mmHg"
      },
      {
        "label": "FC",
        "value": "70",
        "unit": "bpm"
      },
      {
        "label": "SpO₂",
        "value": "99",
        "unit": "%"
      }
    ],
    "question": "Quale farmaco riduce la degradazione della bradichinina attraverso l'inibizione dell'ACE?",
    "options": [
      {
        "drug": "Ramipril",
        "id": "ramipril",
        "correct": true,
        "effect": "Bradichinina ↑ possibile",
        "response": "L'inibizione ACE è un possibile nesso farmacologico della tosse, ma la vignetta non determina una diagnosi.",
        "why": "ACE contribuisce alla degradazione della bradichinina, oltre che alla produzione di angiotensina II."
      },
      {
        "drug": "Losartan",
        "id": "losartan",
        "correct": false,
        "effect": "AT1 antagonizzato",
        "response": "Il sartano antagonizza AT₁ senza inibire direttamente la degradazione delle chinine.",
        "why": "Losartan agisce sul recettore AT1, non sull'enzima ACE."
      },
      {
        "drug": "Amlodipina",
        "id": "amlodipina",
        "correct": false,
        "effect": "Canali Ca²⁺ L",
        "response": "La vasodilatazione da diidropiridina non segue la via bradichinina–ACE.",
        "why": "Amlodipina riduce ingresso di calcio nella muscolatura liscia vascolare."
      }
    ],
    "learn": "ACE-inibitori e sartani convergono sull'asse AngII/AT1, ma differiscono per la degradazione della bradichinina.",
    "target": "ACE"
  }
];
