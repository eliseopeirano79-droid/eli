# ELIX — Master roadmap (21 ottobre 2026)

**Visione:** un unico atlante originale e navigabile che collega principio attivo, formulazioni, bersagli, segnali cellulari, fisiologia, patologie, evidence-based medicine, regolamentazione italiana, spiegazioni didattiche, esercitazioni e casi clinici. Materiale per **formazione e ricerca**, non strumento autonomo di prescrizione.

## Stato reale

**Già esistente in PHARMA Alpha 0.4:** catalogo ChEMBL di 4.225 identità, meccanismi/strutture dove disponibili, import registri AIFA/EMA/FDA, 37 sintesi, 36 label USA, 3 approfondimenti di classe, laboratori di base, simulatore ADME, casi e rassegna. I 4.225 record non rappresentano altrettanti farmaci unici autorizzati in Italia.

**Aggiunto in ELIX Alpha 0.5:** rebranding, 18 volumi indicizzati, 10 capitoli originali introduttivi, 40 nuovi quiz filtrati, Dose Explorer matematico, Evidence Lab ARR/RRR/RR/NNT/NNH e Molecular Cinema 2.5D a stadi, con link alla struttura PDB 7BZ2.

**Non realizzato:** manuale completo, dati quantitativi molecola per molecola, posologie autentiche nello slider, renderer molecolare atomistico in-app, fonti evidenza automatizzate, motore clinico predittivo, metriche storiche di prezzo/DDD, casi reali deidentificati e validazione specialistica sistematica.

## Regole scientifiche non negoziabili

1. Ogni numero deve portare **fonte, data, unità, condizioni di misurazione e popolazione o campione** quando pertinenti.
2. Distinguere **struttura sperimentale, ricostruzione didattica e simulazione predittiva**. PDB fornisce coordinate sperimentali: l'interpolazione di due strutture non è automaticamente dinamica molecolare verificata.
3. Un principio attivo non è una specialità, e una specialità non coincide con una confezione: autorizzazioni, RCP, prezzi e rimborsabilità si collegano al prodotto pertinente.
4. **Ki, Kd, EC50, IC50, Emax** sono riferiti a esperimento, specie, isoforma, matrice e condizioni; non esiste un valore universale per molecola.
5. **NNT/NNH** hanno senso soltanto con endpoint, comparatore, rischio iniziale, follow-up, popolazione e intervalli di confidenza. Evitare calcoli ingenui su hazard ratio o meta-analisi senza rischi assoluti.
6. RCP italiano ufficiale e documenti versionati per la posologia; no dosi personalizzate ricavate da slider illustrativi.
7. I farmaci possono essere molecole, peptidi, proteine ricombinanti, anticorpi, oligonucleotidi, terapia cellulare o genica. La classificazione deve essere multidimensionale.
8. Testi originali; niente riproduzione sistematica dei libri Katzung, Goodman & Gilman o contenuti di terzi senza licenza.
9. Ogni caso è marcato **sintetico** o **documentato e deidentificato**, con fonti e uso consentito. Mai presentare un esito simulato come un evento osservato.
10. Aggiornamenti: mantenere uno storico, non sovrascrivere silenziosamente una posizione regolatoria o un dato clinico.

## Ontologia di base (relazioni bidirezionali)

- `substance`: id stabile, nomi DCI/IUPAC, sinonimi, InChIKey, ChEMBL/PubChem, stereochimica, sale/parent, natura molecolare.
- `substance_class`: ATC e classificazioni multiple (chimica, terapeutica, meccanistica, origine produttiva).
- `target`: gene UniProt, recettore/enzima/canale/trasportatore, proteina e isoforme; supporto PDB/AlphaFold quando appropriato.
- `interaction`: composto↔bersaglio, agonista/antagonista/allosterico/inibitore, specie, Ki/Kd/IC50/EC50, unità, assay, provenienza.
- `pathway`, `pathway_step`: sequenza causale ragionata, reazioni, tessuti, effettori e qualità delle prove.
- `indication` e `condition`: indicazione autorizzata versus uso studiato versus impiego off-label (da distinguere).
- `product`, `package`, `authorization`, `smPC_version`, `reimbursement_rule`: dimensione nazionale e temporale.
- `trial`, `trial_arm`, `outcome`, `outcome_statistic`: protocollo, numero partecipanti, evento/tasso, follow-up, RR/HR/CI, NNT/NNH derivato con formula e assunzioni documentate.
- `price_observation` e `utilization_observation`: paese, canale, indicatore (DDD, confezioni, persone esposte, spesa), definizione e tempo. Non definire «farmaco più venduto» con dati DDD senza cautela.
- `textbook_volume`, `chapter`, `learning_objective`, `question`, `case`, `case_decision`: grafo di apprendimento con prerequisiti, fonti e revisione.
- `visual_asset`: PDB ID, frame sorgente, animazione, licenza, grado di verosimiglianza e controllo scientifico.
- `source` e `review`: DOI/PMID/URL, versione, autore, data di accesso, licenza, responsabile editoriale, stato verificato/bozza.

## Filtri: due assi, non un unico menù

**Natura molecolare:** small molecule, anticorpo monoclonale, ADC, peptidi, proteine ricombinanti, RNA, analoghi nucleosidici e nucleotidici, cell/gene therapy.

**Classe terapeutica/meccanismo:** ATC (5 livelli), famiglia di farmaci, organo bersaglio, recettore, via biologica, indicazione, sottotipo, modalità di antagonismo, fase di sviluppo o stato autorizzativo.

**Mercato:** Italia/UE/USA, prezzo pubblico, costo terapia, DDD, confezioni dispensate, spesa, andamento storico. Mostrare indisponibilità anziché inventare dati.

## Sequenza di sviluppo

**P0 — stabile ora:** conservare catalogo, editoriale, ricerca, registri e i moduli ELIX 0.5; test di regressione e sicurezza; feedback su iOS/macOS e controllo layout.

**P1 — successivo:** scheda «Bibbia del Farmaco» strutturata, filtri per classe multidimensionale, indice textbook→farmaco→target→studio, import di review open con provenienza, question bank per classe e difficoltà, pagine di copertura.

**P2 — molecular & signaling:** renderer 3D browser (Mol*/RCSB) per strutture autorizzate, membrane e recettori, stati conformazionali con etichetta di modellazione, timeline interattiva Gs/Gi/Gq e vie tirosin-chinasiche, linking a ISOELETTRICA per correnti/ECG.

**P3 — prove cliniche:** trial strutturati con endpoint e campioni verificati, forest/CI, NNT/NNH condizionati da tempo e rischio base, ricerca per domanda PICO, dati di sicurezza con avvertenze di causalità.

**P4 — mercato e posologia:** prezzi nazionali versionati e consumo OsMed storico, filtri economici; regimi posologici di RCP per singola indicazione/prodotto (informativi), PK/PD esemplificata da modelli pubblicati e validati, **senza trasformare un modello didattico in un consiglio clinico**.

**P5 — pazienti virtuali:** casi clinici reali con riuso permesso e anonimizzazione e casi fittizi marcati, decisioni ramificate, spiegazioni, monitoraggio, feedback sulle alternative secondo linee guida versionate.

**P6 — ampliamento editoriale:** costruzione progressiva di tutti i 18 volumi, copertura per apparato/classificazione, figure originali, confronto con i programmi di Katzung/Goodman & Gilman senza copiarne il testo, revisione scientifica e completezza visibile.

## Criteri di accettazione

- Prossima release: ricercare una molecola e passare dal suo record a bersaglio, capitolo, quiz, caso e studio; tornare indietro su ogni collegamento.
- Visualizzazioni che includono dati numerici devono avere citazione e dichiarazione «sperimentale / teorico / clinico» per singolo dataset.
- Test automatici per integrità del dataset e operazioni NNT/NNH; test manuale in browser mobile e desktop.
- Stato di completezza esposto per capitolo/scheda, sempre separato dal numero di record indicizzati.
- Niente fetch indiscriminato di contenuti sotto licenza; registrare attribuzioni e licenze per ciascuna integrazione.
