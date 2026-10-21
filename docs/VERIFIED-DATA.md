# ELIX — Dati acquisiti dalle fonti

Questa release aggiunge record delle fonti, non nuovi valori farmacologici generati da un modello. Il conteggio effettivo si trova in `data/verified/report.json`; i file delle singole molecole sono caricati quando si apre la scheda.

## ChEMBL: misure sperimentali

Fonte: https://www.ebi.ac.uk/chembl/ e API pubblica EMBL-EBI. Riferimento metodologico: https://chembl.gitbook.io/chembl-interface-documentation/frequently-asked-questions/chembl-data-questions .

La selezione usa identità ChEMBL esatte, bersagli annotati come umani, valori standardizzati in nM e endpoint Ki, Kd, IC50, EC50. Sono conservati anche tipo, valore, unità e relazione della pubblicazione originale. Il nome del farmaco non è usato per trasferire il risultato a un sale, stereoisomero o metabolita diverso.

Sono esclusi flag di validità problematici, duplicati potenziali, valori non positivi e misure derivate da endpoint originali diversi (ad esempio pA2 non viene ripresentato come Kd misurato direttamente). Ki/Kd sono accettati soltanto da saggi classificati come binding. Le assegnazioni di bersaglio accettate sono dirette: score 9 per proteina singola e 7 per complesso proteico. Il punteggio esprime confidenza nell'assegnazione saggio-bersaglio, NON qualità clinica o certezza di efficacia.

La specie del bersaglio e quella del saggio sono campi distinti. Il sistema cellulare, il tessuto e le varianti sono mostrati quando annotati. L'assenza di una condizione non viene colmata per analogia. I record mantengono identificativi di saggio, documento, attività, rivista, anno e DOI/PMID disponibili.

Non si calcola una media fra saggi diversi. IC50 ed EC50 descrivono l'attività nel sistema sperimentale, non automaticamente affinità. Nessuna di queste misure viene convertita in una dose per il paziente o in NNT.

L'importazione è una selezione limitata e riproducibile: prima le schede curate, poi la nomenclatura italiana esplicita, poi altre famiglie commerciali con meccanismi. Il limite per query e il totale disponibile sono dichiarati: un cap non significa letteratura completa. L'ordine è per identificativo di attività, non per il valore più favorevole.

Dati derivati ChEMBL e relativi file di attività/target: **CC BY-SA 3.0**. Attribuzione: EMBL-EBI ChEMBL; versione e data della release sono registrate. Riferimento: Zdrazil et al., Nucleic Acids Research 2024;52(D1):D1180-D1192, DOI 10.1093/nar/gkad1004. https://creativecommons.org/licenses/by-sa/3.0/ .

## Documenti di prodotto FDA / DailyMed

Fonte: https://open.fda.gov/apis/drug/label/ . Le label sono Structured Product Labeling depositate da produttori/distributori, pubblicate tramite openFDA. Non sono presentate come validazione clinica indipendente dell'app né come equivalente di un RCP italiano. Sono selezionati prodotti umani con una sola sostanza e identificativi NDA, ANDA o BLA; l'identità deve appartenere alla famiglia esatta già registrata.

Il documento mantiene set ID, versione, data effettiva, titolare, nome generico/commerciale, via e sezione originaria. Le sezioni includono, quando presenti, meccanismo, farmacocinetica, indicazioni, posologia, avvertenze, controindicazioni, interazioni e studi. Sono testi originali in inglese: le dosi non sono tradotte o adattate automaticamente. Tabelle e figure non riprodotte vanno consultate nell'originale.

Le frasi su emivita, biodisponibilità, legame proteico ed eliminazione sono selezionate dal testo della fonte e mantenute testualmente. Non sono convertite in un unico valore universale: possono riguardare formulazioni, metaboliti o popolazioni diverse. L'esistenza della frase non equivale alla revisione specialistica dell'intera scheda.

Licenza generale dei dati openFDA: CC0 salvo eccezioni, senza implicare endorsement FDA. https://open.fda.gov/license/ . Le avvertenze della fonte e gli eventuali diritti di terzi rimangono applicabili.

## AIFA: prezzo della confezione

Fonte: https://www.aifa.gov.it/liste-dei-farmaci e CSV della lista di trasparenza. La lista copre un insieme definito di medicinali equivalenti, non tutto il mercato italiano. L'anagrafica delle confezioni è usata per collegare AIC, descrizione, sostanza, stato, regime di fornitura e RCP.

La chiave di abbinamento fra prezzo e confezione è l'AIC completo, con zeri iniziali conservati. Per il collegamento alla famiglia ChEMBL si usano nomi/sinonimi esatti e non ambigui; l'ATC non è usato da solo come prova di identità chimica. I prodotti combinati non sono divisi artificialmente fra singole molecole.

Prezzo pubblico, riferimento SSN e differenza sono campi separati. Non si inferisce il prezzo da un principio attivo, non si sostituisce un dato mancante con zero e non si calcola un costo per dose da una confezione di forza sconosciuta. Un intervallo di prezzo include confezioni/dosaggi diversi: non dimostra equivalenza terapeutica o convenienza del trattamento.

Le righe originali, l'URL di acquisizione, data HTTP della fonte quando disponibile, timestamp di acquisizione e hash SHA-256 sono conservati. La disponibilità fisica in farmacia e il costo effettivo sostenuto dal singolo paziente non sono dedotti dalla presenza nella lista.

## Controlli

I test verificano conteggi dai file reali, identità, unità, segni delle relazioni, score di assegnazione, presenza di riferimenti, corrispondenza testuale degli estratti PK, AIC, prezzi non inventati, date e rendering delle schede. Test in browser separati controllano filtri, numero delle sezioni principali, assenza di errori JavaScript e impaginazione mobile. Questi controlli software NON costituiscono validazione medica specialistica.
