# ELIX · lotto neuropsicofarmacologia · 22 ottobre 2026

Base: commit `3474994e9192045bb6c8a8947616900f94fab0fa`. Cache della patch: `elix-alpha-0.12.3`; la famiglia visibile resta Alpha 0.12.

## Aggiunte effettive

Quattro identità già presenti nel catalogo ChEMBL, ma senza sintesi editoriale: pregabalin (`CHEMBL1059`), gabapentin (`CHEMBL940`), duloxetina (`CHEMBL1175`), sertralina (`CHEMBL809`). Non sono quattro nuove entità chimiche e non aumentano il catalogo di 4.225 record.

Il lotto aggiunge quattro sintesi originali (meccanismo, impieghi, rischi e un collegamento concettuale), quattro profili PK con sei campi ciascuno e otto riferimenti primari. Le sintesi diventano 41; i profili PK strutturati 11, con 66 campi. I 37 approfondimenti storici, i quiz e i trial restano invariati. Non sono monografie complete né 24 nuove misure sperimentali: i campi includono informazioni qualitative e lacune esplicite.

## Metodo e limiti

Il modulo `elix-content-batches.js` integra i dati in modo additivo prima della costruzione degli indici dell’atlante. Non riscrive i record precedenti, non assegna PK ai sali per eredità e non genera affinità o NNT. I nomi italiani curati entrano nella ricerca e i nuovi profili nel confronto, nei filtri e nei contatori. La validazione delle collisioni precede tutte le mutazioni.

Ogni profilo conserva prodotto, formulazione, via, popolazione, sostanza misurata, tipo di misura e fonte. La data di consultazione è distinta dalla versione del documento. Quando una revisione riporta soltanto mese/anno, il giorno non viene inventato e la versione testuale è mostrata nei dettagli. Le indicazioni UE sono basate sulle pagine EPAR; il lotto non afferma di avere acquisito i PDF dei RCP EMA. Per gabapentin e sertralina la sintesi clinica cita esplicitamente prodotti britannici, senza trasformarli in indicazioni italiane.

Il confronto gabapentin/pregabalin mantiene dosi e frazionamento del dato di assorbimento. La sertralina resta distinta dalla N-desmetilsertralina e la radioattività totale dalla quota immodificata. La PK della duloxetina riguarda il prodotto KRKA britannico, senza mescolare percentuali tratte da altre formulazioni.

Nessuna nuova posologia personale, indicazione italiana non verificata, struttura 3D, misura Ki/Kd o statistica di efficacia viene aggiunta. Il collegamento ai quiz non è esposto per i quattro nuovi profili, perché non esistono ancora quesiti specifici. Test software e controllo editoriale delle fonti non equivalgono a una validazione clinica indipendente.

## Interfaccia

CSS e asset grafici invariati: cinque sezioni principali, sei sezioni espandibili per scheda, temi chiaro/scuro, marchio e firma di Isoelettrica/ELIX. Le fonti sono espandibili dentro la scheda. Anche le fonti senza identificativo DailyMed restano raggiungibili dalla sezione della formulazione.

## Verifiche

`npm test` include ora `scripts/validate-content-batches.mjs`: identità esatte, conservazione dei dati, collisioni atomiche, tutte le metriche, provenienza, ricerca IT/EN, rendering e collegamenti ai documenti.

`node scripts/browser-content-batch.cjs` verifica quattro molecole, due temi e due larghezze (1440 e 320 px): 16 configurazioni, 96 controlli di campo, conservazione dei dettagli, confronto e reload offline. È eseguito dopo l’audit browser generale nel workflow esistente, con permessi di sola lettura. I log e i rapporti del workflow, non questa nota, attestano gli esiti effettivi.

Locale: undici suite dati/codice superate. Browser locale non eseguibile per blocco dell’ambiente (`ERR_BLOCKED_BY_ADMINISTRATOR`); verifica browser affidata alla CI del repository. Merge e distribuzione vanno verificati separatamente prima di dichiarare il lotto pubblicato.
