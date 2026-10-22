# ELIX 0.12 — nomi e riepiloghi farmacocinetici

## Difetti risolti

I riepiloghi di emivita/F/legame proteico leggevano quasi esclusivamente le 37 sintesi editoriali, ignorando gran parte dei documenti di prodotto importati. La traduzione dei titoli dipendeva da 216 stringhe manuali (196 identità effettivamente corrispondenti).

## Modifiche

- 2.783 identità hanno ora un nome italiano di visualizzazione: 196 corrispondenze esplicite, 1.932 denominazioni ATC già nel catalogo con controlli su nome e forma, 655 sali/formule nominalmente collegati a un parent. Identificatori, struttura chimica e nomi internazionali non vengono modificati. Le altre identità mantengono il nome internazionale, non tradotto per supposizione.
- Il semplice codice ATC non autorizza la sostituzione di una sostanza con profarmaco/sale diverso: micofenolico/mofetile, esteri corticosteroidei, dimeglumina e categorie botaniche sono protetti da controlli dedicati.
- 311 campi PK da 154 dei 172 prodotti importati (308 quantitativi: 148 emivite, 90 legami proteici, 70 biodisponibilità). Ogni campo conserva passaggio originale, sezione, hash, prodotto e data. Restano espliciti parent/metabolita, via, dose sperimentale e popolazione.
- 7 fonti di prodotto supplementari, con 14 valori, per prednisone, prednisolone, desametasone, acetazolamide, amitriptilina, aloperidolo e idroclorotiazide. Sono sintesi verificate su fonti primarie USA/UK, non nuovi RCP italiani né importazioni di testi integrali. Le brevi citazioni esterne non superano 25 parole per fonte.
- La pagina mostra subito i valori nel riepilogo e la fonte di prodotto. Premendo un dato si apre ADME con le prove originali. Nessun caricamento anticipato dei testi voluminosi per i pannelli chiusi.
- Dove ci sono due documenti, la scelta del prodotto cambia l'intero riepilogo: non vengono combinati numeri provenienti da formulazioni diverse. I campi mancanti rimangono distinti da quelli documentati.

## Esempi e controlli negativi

- Metoprololo succinato ER: circa 3–7 h; 77% di F RELATIVA alla forma convenzionale; circa 12% di legame all'albumina.
- Paracetamolo EV: 2,4 ± 0,6 h nella coorte adulta della tabella fonte, non attribuito genericamente alle compresse orali.
- Ceftriaxone: 5,8–8,7 h plasmatiche negli adulti sani, non 25 h nel fluido dell'orecchio medio pediatrico.
- Azatioprina: il dato di 5 h riguarda radioattività e metaboliti, non una misura appropriata dell'emivita del parent: non viene presentato come tale.
- Le biodisponibilità animali del bupropione o della sostanza diversa citata in una label non vengono attribuite al farmaco umano in scheda.
- Il dato 36–54 h del desametasone è biologico e non sostituisce 3,6 ± 0,9 h plasmatiche del prodotto documentato.

## Riproducibilità e limiti

`python scripts/build_presentation.py` rigenera le proiezioni esclusivamente da identità originali e dalle scelte editoriali conservate. `npm test` include il controllo letterale di tutti i passaggi PK, l'identità delle forme, numeri e ricerca in italiano/inglese. `scripts/browser-presentation.cjs` controlla riepiloghi, fonte selezionata e layout desktop/mobile; un esito va dichiarato soltanto quando il workflow è riuscito.

Le fonti originali ChEMBL/AIFA/DailyMed non sono sovrascritte. L'atlante non ha 4.225 monografie complete e questi numeri non costituiscono algoritmi di prescrizione. La denominazione ATC è nomenclatura di visualizzazione, non autorizzazione del singolo prodotto né prova di bioequivalenza.
