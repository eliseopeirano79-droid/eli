# ELIX — The Interactive Pharmacology Atlas · Alpha 0.5

**App made by Eliseo Peirano · 2026**

Sito: https://eliseopeirano79-droid.github.io/PHARMA/ (l'URL GitHub resta invariato; ELIX è il nuovo nome dell'app).

Estensione del progetto recuperato da `PHARMA-Alpha03-pronta-per-Dock-e-GitHub-Pages.zip`. I laboratori, il simulatore ADME, i casi e il quiz originali restano disponibili. ISOELETTRICA e la copia separata ELIX non sono coinvolte in questa pubblicazione.

## Novità ELIX Alpha 0.5 (21 ottobre 2026)

- Branding ELIX con logo vettoriale originale, favicon e manifest PWA aggiornati; il repository resta `PHARMA` per non interrompere i vecchi collegamenti Pages.
- **ELIX Textbook**: indice editoriale di 18 volumi e 10 capitoli originali iniziali, distinti dalla monografia di singola molecola.
- **ELIX Academy**: 40 quiz originali classificati per tema, tipo (teoria, caso sintetico, statistica), molecola e difficoltà, con sessioni casuali senza ripetizioni, spiegazioni e statistiche locali.
- **Molecular Cinema**: rappresentazione cellulare 2.5D con avanzamento, play/pausa, tessuti e cascate β1, β2, AT1; collegamento separato alla struttura sperimentale RCSB 7BZ2 (β2–formoterolo–Gs). Non è dinamica molecolare atomistica.
- **Dose Explorer**: slider matematico non clinico con curve astratte di effetto, esposizione e indice di danno. Non fornisce dosaggi farmacologici reali o probabilità di eventi.
- **Evidence Lab**: calcolo ARR, RRR, RR, NNT/NNH su rischi ipotetici inseriti dall'utente, da collegare a studi reali in futuro.

Queste funzioni sono prototipi iniziali con limiti espliciti; non completano ancora l'enciclopedia, né sostituiscono validazione medica o fonti aggiornate.

## Copertura al 20 ottobre 2026

- 4.225 identità ChEMBL_37 con max_phase=4: molecole, sali, biologici e record storici, inclusi ritiri e uso veterinario. Non sono 4.225 principi attivi unici attualmente autorizzati, né tutti i farmaci esistenti.
- Formule, SMILES, immagini 2D e meccanismi documentati dove presenti. Eparina: subunità rappresentative dalla label DailyMed; nessuna formula unica attribuita alla miscela.
- 37 sintesi didattiche, 36 label USA versionate consultabili per sezioni, 36 righe farmacocinetiche controllate sulla fonte e 3 approfondimenti di classe (anticoagulanti, beta-bloccanti, gliflozine).
- Indice ATC e confronti per tutte le classi presenti. Valori mancanti e capitoli editoriali incompleti sono indicati.
- AIFA, EMA e Drugs@FDA: abbinamenti per nomi/sinonimi esatti non ambigui, parent/sali secondo ChEMBL, prodotti monocomponente. Le traduzioni ATC servono alla ricerca, non provano identità chimica. Gli stati si riferiscono ai prodotti e alla data dello snapshot. Assenza di abbinamento non significa assenza di autorizzazione. EMA non copre tutte le autorizzazioni nazionali UE.
- Prima rassegna: 4 novità verificate (2 trial JAMA e 2 pareri CHMP), con risultati, limiti e fonti primarie. Non è una revisione sistematica.

Una sintesi, importazione o collegamento non equivale a revisione clinica integrale. Monografie italiane complete, revisione specialistica e copertura di ogni farmaco e formulazione restano da realizzare. Il simulatore ADME conserva parametri ipotetici, separati dalle tabelle.

## Provenienza

- ChEMBL: https://www.ebi.ac.uk/chembl/ — dati derivati, classificazioni e immagini, **CC BY-SA 3.0**, attribuzione EMBL-EBI/ChEMBL. https://creativecommons.org/licenses/by-sa/3.0/ . Selezione, compattazione e collegamenti editoriali sono modifiche; i dati derivati ChEMBL restano sotto la stessa licenza.
- AIFA: https://drive.aifa.gov.it/farmaci/confezioni_fornitura.csv e atc.csv. Dati provvisori descrittivi; URL degli RCP conservati, testo degli RCP italiani non importato.
- EMA: https://www.ema.europa.eu/en/medicines/download-medicine-data — snapshot JSON del 20 ottobre 2026.
- FDA: https://open.fda.gov/apis/drug/drugsfda/ — export del 16 ottobre 2026. Label per prodotto con query e versione in data/labels-index.json; non attestano lo stato italiano.
- Eparina: https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a120bdfd-21e1-4024-82a7-13cfeed290c1 — immagine assets/heparin-subunits.jpg.
- Sintesi JAMA originali, senza riproduzione degli articoli. DOI e registri in data/news.json. Fonti e date delle classi in data/editorial.json.

I materiali di terzi mantengono attribuzioni e condizioni delle rispettive fonti; la licenza ChEMBL non si estende automaticamente a tutti gli altri contenuti.

## Esecuzione e verifica

Sito statico, senza dipendenze runtime. Avvia `python3 -m http.server 8080` e apri http://localhost:8080. Richiede HTTP(S), non file://.

`node scripts/validate-data.mjs` controlla identità, provenienza, date, integrità delle label, fonti PK, notizie duplicate e rendering di tutte le molecole. I controlli software non attestano validazione clinica.

Gli importatori sono in scripts/. Le grandi fonti originali sono nella cartella adiacente evidence-cache/, fuori dal repository. Non aggiornare automaticamente i valori editoriali senza controllarli sulle nuove fonti.

## Rassegna settimanale

Attività desktop pharma-novit-farmacologiche-settimanali: lunedì alle 09:00 Europe/Rome. Comando in WEEKLY_NEWS_PROMPT.txt. Ricerca, verifica, aggiorna data/news.json, prova l'app e pubblica con controllo finale di GitHub Pages. Richiede Mac e app desktop attivi; la data nell'app indica l'ultima rassegna completata, non una garanzia di esecuzione futura.

## PWA e cronologia

Service worker network-first: conserva il catalogo e la rassegna; le label vengono memorizzate quando richieste. Le strutture ChEMBL esterne richiedono rete. Non è garantita la disponibilità offline di tutte le fonti. Tema e progressi didattici rimangono nel browser.

VERIFICA-INTERAZIONI.json e VERIFICA-PUBBLICAZIONE.json sono risultati storici del pacchetto Alpha 0.3, non della versione corrente. La pubblicazione corrente è attestata dal commit e dal workflow Pages concluso.
