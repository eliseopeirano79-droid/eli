/* ELIX Clinical Evidence · brief original summaries of verified primary publications.
   Numerical results remain attached to study, population, endpoint and timeframe.
   Abstracted fields are not clinical prescribing guidance. */
export const VERIFIED_TRIALS = Object.freeze([
  {
    "id": "hope-2000",
    "drugIds": [
      "ramipril"
    ],
    "title": "HOPE — Ramipril nella prevenzione cardiovascolare",
    "journal": "New England Journal of Medicine",
    "year": 2000,
    "doi": "10.1056/NEJM200001203420301",
    "source": "https://www.nejm.org/doi/full/10.1056/NEJM200001203420301",
    "n": 9297,
    "population": "Persone ≥55 anni ad alto rischio cardiovascolare, senza scompenso cardiaco o frazione di eiezione nota come ridotta",
    "comparator": "Ramipril contro placebo, aggiunti alla terapia concomitante",
    "followup": "Follow-up medio di 5 anni",
    "endpoint": "Morte cardiovascolare, infarto miocardico oppure ictus (endpoint composito)",
    "results": [
      {
        "type": "benefit",
        "label": "Endpoint cardiovascolare primario",
        "treated": 14,
        "control": 17.8,
        "metric": "RR 0,78 (IC 95% 0,70–0,86)",
        "riskFormat": "cumulative"
      }
    ],
    "insight": "Il beneficio è stato documentato in una popolazione ad alto rischio, non in tutti i soggetti ipertesi indistintamente. L'effetto osservato non si riduce alla sola differenza di pressione arteriosa.",
    "limitations": "Valutare i criteri di inclusione: risultato non trasferibile automaticamente a persone a basso rischio o a ogni regime di trattamento.",
    "checked": "2026-10-21"
  },
  {
    "id": "dapa-hf-2019",
    "drugIds": [
      "dapagliflozin"
    ],
    "title": "DAPA-HF — Dapagliflozin nello scompenso a frazione ridotta",
    "journal": "New England Journal of Medicine",
    "year": 2019,
    "doi": "10.1056/NEJMoa1911303",
    "source": "https://www.nejm.org/doi/full/10.1056/NEJMoa1911303",
    "n": 4744,
    "population": "Scompenso cardiaco sintomatico NYHA II–IV con LVEF ≤40%, con o senza diabete tipo 2",
    "comparator": "Dapagliflozin contro placebo in aggiunta alla terapia indicata nello studio",
    "followup": "Follow-up mediano di 18,2 mesi",
    "endpoint": "Peggioramento dello scompenso oppure morte cardiovascolare (endpoint composito)",
    "results": [
      {
        "type": "benefit",
        "label": "Endpoint primario composito",
        "treated": 16.3,
        "control": 21.2,
        "metric": "HR 0,74 (IC 95% 0,65–0,85)",
        "riskFormat": "cumulative"
      }
    ],
    "insight": "Il beneficio sull'endpoint primario era osservato anche nei partecipanti senza diabete: la farmacologia degli SGLT2-inibitori va oltre il controllo glicemico.",
    "limitations": "La differenza assoluta e l'NNT si riferiscono all'endpoint composito e a questa durata, non alla sola mortalità né a ogni popolazione cardiologica.",
    "checked": "2026-10-21"
  },
  {
    "id": "dapa-ckd-2020",
    "drugIds": [
      "dapagliflozin"
    ],
    "title": "DAPA-CKD — Dapagliflozin nella malattia renale cronica",
    "journal": "New England Journal of Medicine",
    "year": 2020,
    "doi": "10.1056/NEJMoa2024816",
    "source": "https://www.nejm.org/doi/full/10.1056/NEJMoa2024816",
    "n": 4304,
    "population": "Malattia renale cronica, eGFR 25–75 mL/min/1,73 m², albuminuria 200–5000 mg/g; con o senza diabete tipo 2",
    "comparator": "Dapagliflozin contro placebo",
    "followup": "Follow-up mediano di 2,4 anni",
    "endpoint": "Declino sostenuto di eGFR ≥50%, insufficienza renale terminale oppure morte renale o cardiovascolare",
    "results": [
      {
        "type": "benefit",
        "label": "Endpoint primario renale/cardiovascolare",
        "treated": 9.2,
        "control": 14.5,
        "metric": "HR 0,61 (IC 95% 0,51–0,72); NNT dello studio 19 (IC 95% 15–27)",
        "riskFormat": "cumulative",
        "reportedNNT": 19
      }
    ],
    "insight": "Lo studio ha collegato un meccanismo tubulare (inibizione SGLT2) a esiti clinici renali e cardiovascolari nella popolazione definita dal protocollo.",
    "limitations": "Terminato anticipatamente per beneficio; i rischi arrotondati producono un NNT orientativo da non confondere con quello calcolato con i dati completi dello studio.",
    "checked": "2026-10-21"
  },
  {
    "id": "empa-kidney-2023",
    "drugIds": [
      "empagliflozin"
    ],
    "title": "EMPA-KIDNEY — Empagliflozin e progressione della CKD",
    "journal": "New England Journal of Medicine",
    "year": 2023,
    "doi": "10.1056/NEJMoa2204233",
    "source": "https://www.nejm.org/doi/full/10.1056/NEJMoa2204233",
    "n": 6609,
    "population": "Malattia renale cronica a rischio di progressione, anche senza diabete; inclusi soggetti con eGFR a partire da 20 mL/min/1,73 m²",
    "comparator": "Empagliflozin contro placebo",
    "followup": "Follow-up mediano di 2,0 anni",
    "endpoint": "Progressione della malattia renale oppure morte cardiovascolare (endpoint composito)",
    "results": [
      {
        "type": "benefit",
        "label": "Endpoint primario",
        "treated": 13.1,
        "control": 16.9,
        "metric": "HR 0,72 (IC 95% 0,64–0,82)",
        "riskFormat": "cumulative"
      }
    ],
    "insight": "Il trial dimostra perché una stessa classe farmacologica sia studiata in nefrologia anche in assenza di diabete: il bersaglio SGLT2 influenza il bilancio tubulare e l'emodinamica renale.",
    "limitations": "Il risultato è relativo a criteri di selezione e endpoint specifici; la traduzione in indicazioni autorizzate richiede la scheda tecnica nazionale.",
    "checked": "2026-10-21"
  },
  {
    "id": "aristotle-2011",
    "drugIds": [
      "apixaban",
      "warfarin"
    ],
    "title": "ARISTOTLE — Apixaban rispetto a warfarin nella fibrillazione atriale",
    "journal": "New England Journal of Medicine",
    "year": 2011,
    "doi": "10.1056/NEJMoa1107039",
    "source": "https://www.nejm.org/doi/abs/10.1056/NEJMoa1107039",
    "n": 18201,
    "population": "Fibrillazione atriale con almeno un fattore aggiuntivo di rischio di ictus, criteri specifici del trial",
    "comparator": "Apixaban contro warfarin con monitoraggio INR",
    "followup": "Follow-up mediano di 1,8 anni",
    "endpoint": "Ictus ischemico o emorragico oppure embolia sistemica",
    "results": [
      {
        "type": "benefit",
        "label": "Ictus o embolia sistemica (tasso per anno)",
        "treated": 1.27,
        "control": 1.6,
        "metric": "HR 0,79 (IC 95% 0,66–0,95)",
        "riskFormat": "annualized"
      },
      {
        "type": "benefit",
        "label": "Sanguinamento maggiore (tasso per anno)",
        "treated": 2.13,
        "control": 3.09,
        "metric": "HR 0,69 (IC 95% 0,60–0,80)",
        "riskFormat": "annualized"
      }
    ],
    "insight": "La riduzione dell'endpoint tromboembolico e dei sanguinamenti maggiori va distinta dalle differenze fra tutte le possibili indicazioni degli anticoagulanti.",
    "limitations": "I valori sono tassi annualizzati, NON rischi cumulativi: sarebbe scorretto calcolare un NNT per 1,8 anni semplicemente sottraendoli. Non estendere lo studio alle protesi valvolari meccaniche.",
    "checked": "2026-10-21"
  },
  {
    "id": "rales-1999",
    "drugIds": [
      "spironolattone"
    ],
    "title": "RALES — Spironolattone nello scompenso grave",
    "journal": "New England Journal of Medicine",
    "year": 1999,
    "doi": "10.1056/NEJM199909023411001",
    "source": "https://www.nejm.org/doi/abs/10.1056/NEJM199909023411001",
    "n": 1663,
    "population": "Scompenso cardiaco grave, LVEF ≤35%, già in terapia convenzionale definita nel protocollo",
    "comparator": "Spironolattone contro placebo",
    "followup": "Follow-up medio di 24 mesi; studio interrotto anticipatamente per beneficio",
    "endpoint": "Mortalità per tutte le cause",
    "results": [
      {
        "type": "benefit",
        "label": "Mortalità complessiva",
        "treated": 35,
        "control": 46,
        "metric": "RR 0,70 (IC 95% 0,60–0,82)",
        "riskFormat": "cumulative"
      }
    ],
    "insight": "Il blocco del recettore mineralcorticoide può produrre benefici clinici importanti che non dipendono soltanto dalla diuresi; richiede però attenzione al potassio e alla funzione renale.",
    "limitations": "Percentuali arrotondate e interruzione anticipata: NNT derivato dai valori arrotondati è approssimativo, non una proprietà del farmaco.",
    "checked": "2026-10-21"
  },
  {
    "id": "ascend-2018",
    "drugIds": [
      "asa"
    ],
    "title": "ASCEND — Aspirina nella prevenzione primaria nel diabete",
    "journal": "New England Journal of Medicine",
    "year": 2018,
    "doi": "10.1056/NEJMoa1804988",
    "source": "https://www.nejm.org/doi/full/10.1056/NEJMoa1804988",
    "n": 15480,
    "population": "Persone con diabete senza malattia cardiovascolare evidente all'arruolamento",
    "comparator": "Acido acetilsalicilico contro placebo",
    "followup": "Follow-up medio di 7,4 anni",
    "endpoint": "Beneficio vascolare e sanguinamento maggiore: endpoint distinti",
    "results": [
      {
        "type": "benefit",
        "label": "Eventi vascolari gravi",
        "treated": 8.5,
        "control": 9.6,
        "metric": "Rate ratio 0,88 (IC 95% 0,79–0,97)",
        "riskFormat": "cumulative"
      },
      {
        "type": "harm",
        "label": "Sanguinamenti maggiori",
        "treated": 4.1,
        "control": 3.2,
        "metric": "Rate ratio 1,29 (IC 95% 1,09–1,52)",
        "riskFormat": "cumulative"
      }
    ],
    "insight": "La prevenzione primaria richiede confronto beneficio-rischio: la riduzione di eventi vascolari non può essere discussa senza considerare l'aumento del sanguinamento maggiore.",
    "limitations": "Due endpoint diversi: l'NNT per eventi prevenuti e l'NNH per sanguinamenti non devono essere sottratti come se tutti gli eventi avessero gravità identica.",
    "checked": "2026-10-21"
  }
]);

export function trialMetrics(outcome){
 const a=Number(outcome.treated),b=Number(outcome.control);
 if(!Number.isFinite(a)||!Number.isFinite(b)||a<0||b<0||a>100||b>100)return null;
 const diff=(b-a)/100;
 const base={differencePctPoints:Math.round((b-a)*100)/100,relativeRisk:b?Math.round((a/b)*1000)/1000:null};
 if(outcome.riskFormat!=="cumulative")return {...base,nnt:null,nnh:null,note:"Tassi annualizzati: NNT/NNH non derivabili senza una curva di rischio nel tempo."};
 if(outcome.type==="benefit"&&diff>0)return {...base,nnt:Math.ceil(1/diff-1e-10),nnh:null,note:"Stima da percentuali pubblicate arrotondate, valida solo per endpoint e follow-up del trial."};
 if(outcome.type==="harm"&&diff<0)return {...base,nnt:null,nnh:Math.ceil(1/Math.abs(diff)-1e-10),note:"Stima da percentuali pubblicate arrotondate, valida solo per endpoint e follow-up del trial."};
 return {...base,nnt:null,nnh:null,note:"Differenza assoluta non positiva nella direzione richiesta."};
}
export function trialsForDrug(id){return VERIFIED_TRIALS.filter(t=>t.drugIds.includes(id));}
