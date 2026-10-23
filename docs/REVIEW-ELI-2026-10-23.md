# eli · Alpha 0.13 · 23 ottobre 2026

Nome del prodotto richiesto: **eli**. Collegamento canonico previsto: https://eliseopeirano79-droid.github.io/eli/ . Le chiavi di archiviazione e i nomi tecnici dei moduli precedenti restano stabili per conservare compatibilità e progressi.

## Correzioni funzionali

La home precedente tentava di inserire le schede dei laboratori cercando `stat-strip`, un elemento non più presente nel markup. L’inserimento non avveniva. La nuova home rende direttamente cinema dei recettori, tre laboratori, notizie reali e percorsi di studio. Cinema e Novità hanno voci principali. I conteggi provengono dai dati caricati, non da valori statici.

Il cinema aggiornava l’intero contenitore dell’app a ogni passaggio. Ora conserva scena e controlli, aggiorna lo stato e il testo della timeline e consente alle transizioni di interpolare. La riproduzione si arresta al sesto passaggio o quando la pagina è nascosta. Avanzamento manuale, reset e velocità restano disponibili. Movimento ridotto rispettato. Le strutture PDB restano separate dal movimento illustrativo e richiedono connessione a servizi esterni.

## Dati aggiunti

Dieci sintesi e dieci profili di prodotto: diazepam, lorazepam, midazolam, fentanyl, ketamina, lidocaina, atropina, adrenalina, semaglutide, tirzepatide. Fonte: dieci snapshot SPL/openFDA già importati; formulazioni e versioni sono dichiarate in `eli-clinical-batch.js`. Hash SHA-256 dei documenti conservati. Nessuna affermazione di consultazione dell’ultima revisione regolatoria o revisione clinica indipendente.

Integrate inoltre formula e massa di semaglutide e tirzepatide dalle sezioni Descrizione delle rispettive label, con provenienza esplicita. Il file ChEMBL originale resta immutato; nessuna formula viene attribuita alle miscele.

60 campi PK: 27 con dati numerici, 54 con ancoraggi testuali verificabili, 5 non riportati nel paragrafo selezionato e uno definito dalla via. Non si attribuiscono dati della via orale a prodotti nasali/iniettabili, dati EV alla quantità applicata sulla cute, o dati del parent ai sali. Il legame del fentanyl riporta esplicitamente la **frazione libera**; il parametro del cerotto descrive il calo del 50% dopo rimozione. L’emivita dell’atropina oculare specifica la specie misurata, l-iosciamina. Le fasi della ketamina mantengono la terminologia e i limiti della label.

Totali: 4.225 identità (2.945 parent e 1.280 forme correlate), 81 sintesi proprie, 51 profili di prodotto per 54 identità esatte, 306 campi PK, 172 documenti importati. Restano 95 documenti senza sintesi propria e 123 senza profilo PK contestuale. Questi conteggi descrivono la copertura strutturale; non attestano completezza del sapere farmacologico o validità clinica dell’atlante.

## Verifiche ripetibili

`npm test` esegue le regressioni esistenti e il controllo della nuova release. Copre identità, rendering di tutte le schede, fonti, formulazioni, nomi e ricerca IT/EN, quiz e limiti dei dati. Il nuovo test verifica hash, versioni, ancoraggi delle metriche e assenza di associazioni implicite ai sali.

`browser-eli-release.cjs` controlla home a quattro larghezze e due temi, 80 combinazioni di prodotto/tema/larghezza, cinque scenari cinematografici, conservazione della scena e pausa, link delle notizie e riapertura offline della home, di un profilo PK e del cinema. Le prove del viewer esterno verificano separatamente il collegamento all’iframe: l’esito delle prove locali non certifica disponibilità permanente di Mol* o RCSB.

La riuscita della pubblicazione è attestata dal workflow concluso e dal controllo della pagina ospitata; il salvataggio del codice non è prova di distribuzione.
