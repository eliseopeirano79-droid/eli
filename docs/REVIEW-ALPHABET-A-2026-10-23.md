# ELIX — lettera A, primo gruppo · 23 ottobre 2026

Base: `c4a40bf7e0dcacebf209daa16dbcf9564eb12dcb`, tree `230a62c0036c929b4a91105a2d8235d957a52564`.

## Materiale aggiunto

Dieci identità già nel catalogo ricevono sintesi originali di meccanismo, impieghi del prodotto, rischi, interazioni e collegamento concettuale: abacavir, acebutololo, acetilcisteina, adenosina, alfuzosina, acido alendronico, amitriptilina, anastrozolo, aprepitant e aripiprazolo. Non sono nuove identità né monografie esaustive.

Dieci profili contestuali aggiungono 60 campi PK: 56 informazioni documentate, 2 definizioni della via EV e 2 lacune quantitative dichiarate. 36 campi includono valori numerici strutturati. Nessuna nuova posologia personalizzata, misura Ki/Kd, raccomandazione antibiotica, classificazione di rimborsabilità o efficacia clinica inventata.

Totali risultanti: 63 sintesi editoriali (prima 53), 33 profili di prodotto (prima 23), 198 campi PK (prima 138). I documenti importati privi di sintesi propria scendono da 123 a 113. Il catalogo resta di 4.225 identità, con 172 documenti sorgente; l'inventario completo è rigenerabile con `npm test` e non rappresenta una revisione clinica di tutte le identità.

## Identità e fonti

Nove documenti openFDA già acquisiti sono letti integralmente nelle sezioni pertinenti e mantenuti immutati, con setId, effectiveDate e SHA-256. Non sono dichiarati automaticamente le versioni regolatorie più recenti. Per l'amitriptilina il profilo usa lo SmPC delle compresse Brown & Burk UK, revisione del testo 26 marzo 2025, consultato online il 23 ottobre 2026. Il collegamento posologico segue questo prodotto UK e non viene sostituito dalla diversa label USA importata.

Le pagine DailyMed sono state consultate come riscontro aggiuntivo dove accessibili. Per alendronato e aripiprazolo il fetch web non ha restituito la pagina: le sintesi restano esplicitamente basate sugli snapshot disponibili, non su una presunta verifica della versione corrente. Tutti i riferimenti sono nelle fonti del modulo `elix-alphabet-a.js`, accessibili dalla scheda.

Distinzioni protette dai test:

- Abacavir: soluzione orale; il valore assoluto 83% della compressa non diventa la F della soluzione. Parent, carbovir trifosfato intracellulare e metaboliti di eliminazione restano distinti.
- Acebutololo: diacetololo attivo e sua emivita non sostituiscono il parent.
- Acetilcisteina: prodotto EV antidotico; clearance renale diversa dal recupero urinario di uno studio orale.
- Adenosina: prodotto per stress scintigrafico; non bolo per tachicardia. Emivita nel sangue intero.
- Alfuzosina: compressa ER, biodisponibilità con cibo.
- Alendronato: persistenza terminale scheletrica; recupero dopo dose EV separato dall'assorbimento orale.
- Amitriptilina: nortriptilina attiva; posologia documentale UK coerente con la fonte PK.
- Anastrozolo: quota renale della clearance, non della dose.
- Aprepitant: recupero da profarmaco EV non trasferito alle capsule; dose 40 mg non coperta dalla F 80–125 mg.
- Aripiprazolo: parent, deidro-aripiprazolo, fenotipo CYP2D6 e formulazione depot non confusi.

## Presentazione

Stile Isoelettrica e CSS/asset invariati, cinque sezioni principali e sei sezioni per scheda. Nessun quiz dedicato inesistente suggerito. La data di revisione editoriale segue la singola scheda, invece di essere fissa alla data del primo gruppo neuro. Nuovo modulo incluso nella cache `elix-alpha-0.12.6`; preservata la correzione della barra di aggiornamento.

## Verifiche e stato

Tredici suite `npm test` superate localmente. La nuova suite verifica identità, dati preesistenti invariati, 60 campi, 49 riscontri testuali nelle fonti, hash dei nove snapshot, ricerca IT/EN e renderer. Le regressioni storiche restano separate dai conteggi attuali.

Il browser locale ha restituito `ERR_BLOCKED_BY_ADMINISTRATOR` sulla navigazione HTTP e il blocco non è stato aggirato. Predisposto un controllo CI con 60 configurazioni (10 schede × 3 larghezze × 2 temi), 360 verifiche di campo, fonti, selezione del documento corretto, filtri e riapertura offline. L'esito effettivo del browser, l'integrazione e il deploy devono essere attestati separatamente nella PR: questo documento non costituisce prova di pubblicazione.

Le fonti USA/UK non sono RCP italiani. Verifica editoriale e test software non equivalgono a validazione clinica indipendente. Le altre schede della lettera A e del catalogo restano da ampliare con lo stesso metodo.
