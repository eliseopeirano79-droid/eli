# ELIX — prosecuzione A–C, 23 ottobre 2026

Base verificata: main `32d5a9efa74824ea5159b77f4eaa36812e2016a5`, tree `74843ccdd3a9980a6ee28c3bd0eac15e07a5170a`. Questo documento descrive il lotto; pubblicazione e audit browser devono essere confermati separatamente nella PR.

## Materiale

Otto identità già presenti, prive di sintesi propria: **azatioprina, baclofene, budesonide, bupropione, buspirone, carbamazepina, claritromicina e clonidina**. Nessuna duplicazione del catalogo. Ogni scheda contiene meccanismo, impieghi del prodotto, rischi, interazioni, una spiegazione concettuale originale e sei campi PK contestuali.

Totali dopo il lotto: **71 sintesi, 41 contesti PK, 246 campi**. Le otto nuove schede aggiungono 48 campi: **37 dati documentati e 11 lacune dichiarate**; 25 campi contengono misure numeriche. Un campo qualitativo non è una nuova misura. Documenti già importati senza sintesi propria: **113 → 105**; senza profilo PK esplicito: **141 → 133**. I 4.225 record restano identità chimiche, non monografie cliniche complete. Questo lotto non completa tutte le lettere A–C.

## Provenienza

Otto snapshot openFDA preesistenti e immutabili in `data/verified/labels/`, con setId, effectiveDate e SHA-256 conservati nel modulo. I 42 ancoraggi brevi sono confrontati con le sezioni effettive. La data editoriale non sostituisce la versione del documento. Le pagine DailyMed di azatioprina, baclofene, budesonide, buspirone, carbamazepina e claritromicina sono state aperte durante il controllo; il recupero web delle specifiche pagine di bupropione e QLONILIK non è riuscito. Per tutte le schede la base dichiarata rimane lo snapshot importato: **nessuna attestazione di ultima versione regolatoria**.

Il confronto didattico del baclofene con i gabapentinoidi cita anche le fonti di pregabalin e gabapentin già presenti. Le annotazioni ChEMBL sono separate dalle sintesi dei documenti di prodotto. Le indicazioni USA non diventano autorizzazioni italiane; non sono aggiunte dosi personali, nuovi trial, NNT, quiz o misure Ki/Kd.

## Distinzioni protette

- **Azatioprina:** 5 h di decadimento della radioattività non diventano l'emivita del parent. TPMT/NUDT15 e interazioni con inibitori della xantina ossidasi sono spiegati senza proporre aggiustamenti individuali.
- **Baclofene:** soluzione orale distinta da via intratecale; comparabilità con compresse distinta da F assoluta. Tre lacune della fonte non vengono colmate per analogia.
- **Budesonide:** F sistemica totale del 6% nei bambini di 4–6 anni, non deposizione polmonare; escrezione da studio EV adulto distinta dal prodotto inalato. Il metadato importato ORAL è conservato ma qualificato: il documento descrive sospensione per nebulizzazione. La nota è visibile anche nel pannello della fonte selezionata.
- **Bupropione:** compresse convenzionali, non SR/XL; 21 ± 9 h conservate come media e deviazione standard, non intervallo. La F animale non diventa un dato umano; radioattività urinaria distinta dal parent.
- **Buspirone:** 90% relativo alla soluzione, non F assoluta; dato preclinico su 1-PP non convertito in equivalenza terapeutica.
- **Carbamazepina:** fase iniziale e autoinduzione separate; 89% ER/sospensione non assegnato come F assoluta alle compresse convenzionali.
- **Claritromicina:** condizioni del regime di studio conservate, parent e 14-OH distinti; non si attribuisce alle compresse la quota urinaria della sospensione.
- **Clonidina:** soluzione per ipertensione, non cerotto né formulazione ER per ADHD; recupero urinario riferito alla dose assorbita.

## Manutenzione e interfaccia

Un registro esplicito dei lotti (`elix-batch-registry.js`) alimenta l'app e i controlli dei conteggi correnti. Le regressioni storiche restano congelate: non sono cancellate o indebolite per adattare i numeri. Un test separato verifica i conteggi del nuovo lotto e l'integrità dei dati precedenti. La cache passa a `elix-alpha-0.12.7` e include i nuovi moduli.

Stile Isoelettrica invariato: nessuna modifica CSS, logo, firma, navigazione a cinque sezioni, sei sezioni espandibili per scheda e barra di aggiornamento. Nomi italiani e ricerca bilingue conservati.

## Verifiche

`npm test` comprende 14 suite; il nuovo test confronta hash, ancoraggi, identità, campi e distinzioni farmacologiche, cerca IT/EN nel renderer reale e controlla l'escape della nuova nota di via. Il censimento strutturale continua ad attraversare tutti i 4.225 record.

Il browser test previsto aggiunge **48 configurazioni** (8 farmaci × 3 larghezze × 2 temi), **288 controlli di campo**, link di fonte, nota sulla via, conservazione dei dettagli al cambio tema, quattro filtri e **8 profili offline**. Le suite precedenti e il test della barra sono mantenuti. Le immagini esterne sono escluse dalla matrice; non è una verifica dell'uptime ChEMBL.

Risultati effettivi, commit, audit browser e deploy sono riportati nella PR solo dopo il controllo. Queste prove software non costituiscono validazione clinica indipendente.
