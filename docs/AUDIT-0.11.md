# ELIX 0.11 — screening funzionale, editoriale e grafico

Audit iniziato dal repository pubblico `PHARMA`, versione 0.10, commit `e35d454aded9a8b02f4ec243c519507fe4fc0b92`. Data di lavoro: 22 ottobre 2026. Il documento registra interventi verificabili; non dichiara una revisione clinica integrale di ogni contenuto.

## Problemi individuati e correzioni

| Area | Problema osservato nel codice/test | Intervento |
|---|---|---|
| Sicurezza e fonti | Il riordino delle schede aveva reso irraggiungibili varie sezioni delle label non coperte dal vecchio renderer editoriale | Riportate nelle categorie pertinenti tutte le sezioni disponibili: indicazioni, posologia originale, controindicazioni, avvertenze, interazioni, gravidanza, pediatria, geriatria, sovradosaggio e studi |
| Fonti PK | Nei titoli poteva risultare “da documentare” anche quando esisteva un testo PK originale non ancora normalizzato | Dicitura “Vedi fonte PK”, distinta da un valore quantitativo verificato; i riepiloghi aprono il pannello pertinente |
| Estrazione metaboliti | La ricerca di “active metabolite” intercettava anche “inactive metabolites” | Confini lessicali e test positivo/negativo. Restano estratti automatici, non interpretazioni cliniche |
| Caricamento schede | I pannelli chiusi avviavano comunque le richieste dei dati voluminosi | Corpo dei pannelli costruito solo all'apertura; dati di prodotto condivisi nella cache di sessione |
| Continuità lettura | I ridisegni della pagina potevano richiudere dettagli interni o spostare focus/posizione | Ripristino contestuale di dettagli interni, scroll, focus e cursore; stato delle sei sezioni gestito separatamente |
| Catalogo | Grandi contatori e filtri occupavano gran parte della prima schermata | Copertura e filtri avanzati richiudibili, ricerca in primo piano, area ATC visibile, pulsante azzeramento |
| Ordinamento | Stato visivo del selettore non sempre coerente dopo un ridisegno | Selezione coerente con l'ordinamento applicato e contatore dei filtri avanzati |
| Consultazione | Classi, confronto e copertura erano difficili da raggiungere | Collegamenti contestuali dentro Farmaci, senza ulteriori tab principali |
| Strutture 2D | Aumentare il riquadro non elimina i margini bianchi contenuti nel file SVG | Auto-inquadratura sui contorni del disegno SVG ChEMBL, quando recuperabile; cambiano solo viewport e margini, non le coordinate chimiche |
| Sicurezza SVG | Una sorgente SVG remota non può essere inserita senza controlli | Ricostruzione con tag/attributi ammessi, rimozione di script/foreignObject/URL e limite di dimensione; originale mantenuto se il ritaglio non riesce |
| Ispezione struttura | Mancava una visualizzazione dedicata ingrandita | Dialog nativo con Escape, chiusura esterna e ripristino del focus. Distingue fonte 2D e illustrazione concettuale |
| Immagini non disponibili | Un errore di caricamento poteva essere confuso con assenza della struttura | Stato esplicito “immagine di fonte non caricata”, senza inventare una struttura molecolare reale |
| Mobile | La quinta voce del menu poteva essere fuori dal viewport | Cinque voci visibili nello stesso spazio anche su schermi stretti |
| Quiz | 125 risposte corrette su 131 erano nella posizione A | Mescolamento delle alternative per domanda, stabile nella sessione; valutazione basata sull'identità della risposta, non sulla lettera |
| Ripasso | Gli errori rimanevano nella lista anche dopo una risposta corretta | Rimozione dell'errore pendente quando risolto, mantenendo le statistiche complessive |
| Sessioni quiz | Nessuna ripresa dopo ricaricamento; filtri troppo ingombranti durante lo studio | Persistenza validata, sessioni da 10/20/tutto il mazzo, configurazione richiusa durante l'allenamento |
| Corruzione stato | Valori locali malformati potevano produrre eccezioni o NaN | Validazione di progressi, sessione, array salvati e ordini delle alternative |
| Teoria | 54 capitoli senza ricerca nei concetti | Ricerca nel titolo, introduzione e sezioni, oltre al filtro per volume |
| Ricerca globale | Limitata soprattutto a farmaci e pochi recettori | Inclusi capitoli e tutti i bersagli curati, con collegamenti contestuali e risultati deduplicati |
| Navigazione scientifica | Sei collegamenti da capitoli verso CYP2D6/CYP2C19 senza schede | Due schede di metabolismo documentate da CPIC, distinte da recettori farmacodinamici; ora 24 bersagli curati |
| Cinema | Alcuni link portavano un recettore non supportato al laboratorio di un altro recettore | Collegamento alla scheda corretta; pagina esplicita per scenario non supportato |
| Cinema 3D | Play poteva ricaricare ripetutamente il viewer esterno | Riproduzione disabilitata nella vista strutturale 3D, mantenuta nella vista cellulare |
| Casi clinici | Conteggio visibile letteralmente come `${CASES.length}` | Interpolazione corretta dei 12 casi sintetici |
| Routing | Un frammento URL malformato poteva far fallire il decode | Gestione della pagina non trovata senza crash; nessun capitolo/scenario sostituito silenziosamente |
| Accessibilità | Focus poco chiaro, dialog ricerca senza semantica completa | Skip link, focus visibile, label del dialog, navigazione Tab contenuta, ritorno alla ricerca dopo Escape |
| Identificazione pagina | Titolo browser e breadcrumb rimanevano generici | Titolo e percorso coerenti con il contenuto attuale |
| PWA | Cache network-first capace di combinare asset di versioni diverse e crescita non limitata | Shell atomica per versione, cache runtime limitata a 120 risorse, fallback su HTTP errore, timeout rete e indicatore offline |
| Aggiornamenti | Nessuna indicazione controllata di un nuovo service worker | Un solo messaggio “Ricarica” al cambio effettivo di versione; niente ricaricamenti automatici o avvisi periodici |

## Copertura dei controlli

`npm test` include tutte le suite preesistenti e `scripts/validate-audit.mjs`. Verifica il rendering di tutte le **4.225 identità**, l'integrità delle fonti e dei collegamenti, i **54 capitoli**, le **131 domande**, i **24 bersagli**, e l'accessibilità dei testi di tutte le **172 label** e **2.862 sezioni**.

`scripts/browser-systematic-audit.cjs` percorre **20 destinazioni** in **4 larghezze (1440, 768, 390, 320 px)** e **2 temi**. Esegue inoltre prove di caricamento su richiesta, conservazione dei dettagli, dosi/sicurezza, ricerca, quiz e ripresa, dialog, sanitizzazione SVG e offline. Gli esiti effettivi e gli screenshot sono nell'artifact del workflow, non dedotti dall'esistenza dello script.

La prova SVG usa una figura geometrica sintetica chiaramente separata dal catalogo per controllare sanitizzazione e inquadratura. La suite non dipende dal tempo di risposta di ChEMBL/Mol*/RCSB; questo non certifica disponibilità continua o comportamento di tutti i viewer esterni.

## Integrità dei dati

Nessun valore posologico, di affinità o di prezzo è stato inventato per colmare un campo. I file importati ChEMBL/AIFA/DailyMed e i trial esistenti non sono riscritti da questa revisione. Le due schede CYP rinviano a:

- CPIC CYP2C19–clopidogrel, aggiornamento 2022: https://pmc.ncbi.nlm.nih.gov/articles/PMC9287492/
- CPIC beta-bloccanti, 2024: https://pubmed.ncbi.nlm.nih.gov/38951961/

Le rappresentazioni molecolari 2D restano attribuite a ChEMBL; la trasformazione dell'inquadratura segue la geometria SVG senza ridisegnare legami o stereochimica. Le immagini tridimensionali di categoria restano esplicitamente **illustrative**, non strutture atomiche.

## Limiti ancora aperti

Il catalogo non contiene 4.225 monografie complete. Restano da ampliare e revisionare la nomenclatura italiana, le trattazioni di molti principi attivi, i dati PK/PD clinicamente validati, le associazioni univoche ai RCP e alle indicazioni italiane e le strutture 3D sperimentali. Il testo di prodotto importato rimane in inglese; la ricerca per parola chiave non costituisce estrazione clinica validata. Le fonti regolatorie e i prezzi restano snapshot datati, non un controllo in tempo reale della disponibilità in farmacia.

Questo audit riguarda integrità del software, navigazione, presentazione e provenienza; non sostituisce la revisione medico-scientifica di ogni affermazione, né certifica l'app come strumento prescrittivo.

### Ulteriore controllo su viewport 320 px

La pagina Classi superava la larghezza del viewport (388 px su 320) per il minimo implicito delle schede di classe. Corretto con min-width:0 e wrapping dei titoli ATC; i contenuti non vengono tagliati o nascosti. Il controllo è incluso nella matrice browser.
