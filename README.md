# ELIX — Farmacologia & Principi Attivi · Alpha 0.8

**App made by Eliseo Peirano · 2026**

Sito: https://eliseopeirano79-droid.github.io/PHARMA/ (l'URL GitHub resta invariato; ELIX è il nuovo nome dell'app).

Estensione del progetto recuperato da `PHARMA-Alpha03-pronta-per-Dock-e-GitHub-Pages.zip`. I laboratori, il simulatore ADME, i casi e il quiz originali restano disponibili. ISOELETTRICA e la copia separata ELIX non sono coinvolte in questa pubblicazione.

## Alpha 0.8 — dati pubblici acquisiti, non generati

Importazione: 2026-10-21T21:05:39.576837+00:00.

- 1904 misure ChEMBL per 138 molecole; 680 record Ki/Kd. Identità, bersaglio, specie, condizioni, unità, relazioni, DOI/PMID quando presenti e record di fonte. Non è una revisione clinica di ogni articolo.
- 172 documenti di prodotto USA, 2862 sezioni, 977 frasi PK nel contesto originale. Nessuna traduzione automatica delle dosi o trasferimento a un RCP italiano.
- 4887 confezioni con prezzo AIFA, raggruppate in 222 famiglie. Prezzo pubblico, riferimento e differenza distinti; non costo di trattamento.
- Dati dentro Farmaci con filtri, paginazione e caricamento progressivo. Restano cinque sezioni principali.
- Metodo e scarti: data/verified/report.json. Dati derivati ChEMBL: CC BY-SA 3.0, attribuzione EMBL-EBI. Le altre fonti mantengono provenienza distinta.


## Alpha 0.7 — Densità scientifica e collegamenti (21 ottobre 2026)

**L'app mantiene soltanto Panoramica, Farmaci, Recettori, Teoria, Quiz** come sezioni principali, senza nuove tab nella navigazione.

- **42 capitoli originali** (32 nuovi, con 129 sezioni scientifiche e connessioni), distribuiti su tutti i 18 volumi editoriali. Ogni capitolo ampliato collega i farmaci e i bersagli pertinenti.
- **37 approfondimenti monografici originali** per tutti i principi attivi già curati: meccanismo causale, effetti indesiderati spiegati, farmacocinetica ragionata, confronto clinico e schemi causa→effetto. Questi testi affiancano e non sostituiscono i valori documentati della fonte.
- **7 trial primari** sintetizzati e collegati al principio attivo: HOPE, DAPA-HF, DAPA-CKD, EMPA-KIDNEY, ARISTOTLE, RALES, ASCEND. Ogni card conserva popolazione, campione, comparatore, endpoint, follow-up, misure statistiche, DOI e limiti. NNT/NNH calcolati solo da rischi cumulativi appropriati, mai dai tassi annualizzati.
- **131 quesiti Academy** (91 nuovi con ragionamento clinico e biostatistica), filtrabili per gruppo, molecola e difficoltà; introdotto il ripasso degli errori salvati localmente e il collegamento contestuale da capitoli e farmaci.
- **12 casi clinici sintetici** (7 nuovi su tossicità digitalica, SGLT2, CYP2C19, cGMP/nitrati, amiodarone, ASCEND e bradichinina). Restano scenari didattici, non pazienti reali.
- **22 bersagli di farmacologia** con scheda di meccanismo, fisiologia e farmaci collegati: 5 recettori PDB già curati e altri 17 canali, enzimi e trasportatori; per questi 17 la struttura atomica è esplicitamente non associata.
- Bibliografia originale e data del controllo nelle card trial. Le pubblicazioni vengono citate tramite link DOI; nessuna riproduzione di testo editoriale protetto.
- Implementazione modulare in `elix-expanded-chapters.js`, `elix-expanded-questions.js`, `elix-deep-drugs.js`, `elix-research.js`, `elix-rich-reader.js`, `elix-targets.js`, `elix-extra-cases.js`; nuovi stili in `elix-deep.css`.

### Confini scientifici
I **4.225 record ChEMBL non sono 4.225 schede farmacologiche complete**. Il prezzo reale, le posologie autorizzate, le affinità sperimentali e tutte le strutture 3D richiedono acquisizione per fonte/indicazione/prodotto. Non vengono simulati dati clinici mancanti e non si deducono NNT da HR isolati.

## Affinamento italiano e logo piatto (21 ottobre 2026)

- Il catalogo usa l'italiano come lingua principale per le denominazioni **espressamente curate**. Le denominazioni ChEMBL originali rimangono visibili in piccolo (EN), fra i sinonimi e nella ricerca.
- Nuovo dizionario `italian-names.js` con 216 nomi esatti verificati o editorialmente revisionati, indipendente dalle molecole e dai codici ChEMBL. Le denominazioni più difficili/non verificate rimangono internazionali, senza traduzioni automatiche di sali, isomeri o biologici.
- Ricerca, ordinamento alfabetico, scheda del farmaco e tipologia molecolare condividono la localizzazione; il catalogo sorgente non è modificato, rendendo futura una lingua inglese indipendente.
- Il marchio è rigorosamente la pillola verde centrata su sfondo blu scuro uniforme: nessuna ombra o sfumatura; corretti anche favicon, icona Apple, schermata di caricamento e cache offline.

## Correzioni ELIX Alpha 0.6 (21 ottobre 2026)

- Logo a pillola verde ricavato dall'immagine di riferimento già scelta; scala cromatica verde menta e blu notte, nome e sottotitolo esatti. SVG per la UI e icona PNG PWA.
- **Navigazione essenziale:** Panoramica, Farmaci, Recettori, Teoria, Quiz. I laboratori non compaiono più come sezioni principali, ma sono accessibili nel contesto pertinente.
- **Farmaci:** schede estese con sei campi riassuntivi (emivita, F, legame proteico, dosi, NNT, prezzo), meccanismi, teoria, farmacocinetica verificata, documenti posologici, studi/novità e riferimenti. I campi mancanti restano marcati; non si fabbricano prezzi, studi o dosi.
- **Recettori:** cinque monografie iniziali con struttura PDB reale (β₁ 7BU6, β₂ 7BZ2, AT₁ 7F6G, α₂A 7EJ8, α₁A 8THL), visualizzatore Mol* incorporato su richiesta, teoria, vie e farmaci collegati. Sono dati verificati per questi cinque bersagli, non la totalità dei recettori.
- **Molecular Cinema:** è ora contestuale a Recettori, supporta i cinque recettori e permette di passare fra illustrazione cellulare e visualizzazione 3D sperimentale. Non confonde conformazioni statiche con simulazioni atomistiche.
- Gli URL preesistenti dei laboratori sono mantenuti per non interrompere collegamenti e preferiti.

### Stato di completezza dichiarato
Il catalogo contiene 4.225 identità ChEMBL, non 4.225 monografie complete. I campi scientifici, le posologie e i prezzi vengono compilati soltanto quando sono presenti fonti sufficienti; per gli altri record sono esposte lacune. I 18 volumi della teoria rappresentano un indice editoriale con 10 capitoli iniziali.

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
