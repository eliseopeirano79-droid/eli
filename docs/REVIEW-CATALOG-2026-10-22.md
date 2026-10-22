# ELIX Alpha 0.12.4 — ricognizione completa e dodici nuove sintesi

Controllo editoriale: 22 ottobre 2026. Base: `30b7ce5f45e2eaa7e6bc7726e5cc66b42538e305` (PR #11).

## Cosa significa «tutti»

La ricognizione attraversa **tutte le 4.225 identità** del catalogo: 2.945 record parent e 1.280 forme correlate. Per ciascuna controlla identità, sintesi propria, sintesi del parent, profili PK assegnati esplicitamente, documenti importati, misure, prezzi di famiglia, denominazione italiana revisionata e lacune. Controlla inoltre l'esistenza e la struttura dei 172 documenti importati e delle loro 2.862 sezioni. Non è una lettura clinica integrale di 4.225 monografie, né verifica di disponibilità corrente in Italia.

35 sezioni importate hanno meno di 80 caratteri: sono segnalate nel rapporto per revisione, non considerate automaticamente errori. Il controllo strutturale non sostituisce il documento originale. Nessun record è escluso dal censimento perché privo di ATC, veterinario o storicamente ritirato; tali flag non provano lo stato italiano attuale.

## Prima e dopo questo lotto

| Indicatore | Prima | Dopo |
|---|---:|---:|
| Identità di catalogo | 4.225 | 4.225 |
| Sintesi editoriali proprie | 41 | 53 |
| Profili PK per prodotto | 11 | 23 |
| Identità esatte coperte dalla PK | 14 | 26 |
| Campi nei profili PK | 66 | 138 |
| Documenti importati senza sintesi propria | 135 | 123 |
| Documenti importati senza profilo PK | 163 | 151 |

I 72 nuovi campi comprendono **60 dati documentati, 9 lacune esplicite della fonte selezionata e 3 definizioni legate alla via EV**. 36 campi contengono valori numerici; gli altri contengono descrizioni o limiti. Non sono 72 nuove misure sperimentali. I conteggi di identità, prodotti, campi e fonti non vanno sommati.

## Materiale aggiunto

Dodici identità già presenti, ma prive di sintesi editoriale, ora hanno meccanismo, impieghi del prodotto descritto, rischi, interazioni, una spiegazione originale di collegamento e sei campi PK contestuali:

- Metformina: soluzione orale di cloridrato, non rilascio prolungato.
- Omeprazolo: capsule gastroresistenti.
- Pantoprazolo: formulazione endovenosa, non trasferita alle compresse.
- Ibuprofene: compresse convenzionali.
- Paracetamolo: infusione endovenosa.
- Amoxicillina: capsule di triidrato.
- Ceftriaxone: preparazione iniettabile EV/IM.
- Metronidazolo: compresse.
- Fluconazolo: compresse.
- Aciclovir: compresse; indicazioni e valori quantitativi USA, integrazioni qualitative UK esplicite.
- Cetirizina: Quzyttir EV, distinguendo gli studi generali richiamati dalla label.
- Allopurinolo: compresse, parent e ossipurinolo distinti.

Le classificazioni editoriali di ibuprofene (M01AE01), paracetamolo singolo (N02BE01) e metronidazolo orale (P01AB01) sono distinte dai codici di combinazioni o altre vie. Riferimenti: indice WHO ATC/DDD [M01AE](https://atcddd.fhi.no/atc_ddd_index/?code=M01AE&showdescription=no), [N02BE](https://atcddd.fhi.no/atc_ddd_index/?code=N02BE&showdescription=no), [P01AB](https://atcddd.fhi.no/atc_ddd_index/?code=P01AB&showdescription=no). I codici multipli del catalogo originale restano conservati.

Non sono aggiunte identità chimiche duplicate, nuovi quiz, nuovi trial o nuove misure Ki/Kd. Sali e altre formulazioni non ricevono automaticamente questi profili.

## Provenienza e distinzioni controllate

Le dodici label sono **snapshot già importati nel progetto**, conservati senza modifiche. Le fonti dei nuovi campi riportano setId, percorso locale, sezione, effectiveDate del record e hash SHA-256. Il controllo editoriale del 22 ottobre non attesta che lo snapshot sia l'ultima revisione regolatoria disponibile. L'interfaccia lo dichiara. La tredicesima fonte è lo SmPC britannico [Aciclovir Milpharm](https://www.medicines.org.uk/emc/product/11674/smpc), consultato per integrazioni qualitative: non diventa un RCP italiano e non sostituisce i valori quantitativi USA.

Esempi: ceftriaxone 5,8–8,7 h nel plasma adulto non è il valore di 25 h nell'orecchio medio pediatrico; il 90% renale della metformina riguarda la quota assorbita, non la dose orale; il recupero urinario dell'omeprazolo proviene da uno studio con soluzione; il 90% assorbito dell'allopurinolo non è trattato come F assoluta; paracetamolo EV 2,4 ± 0,6 h conserva la definizione media ± deviazione standard. Per cetirizina non si attribuiscono tutti i dati della label al solo bolo EV.

Le indicazioni sintetizzate sono quelle dei documenti indicati, non raccomandazioni personali o autorizzazioni italiane. Le interazioni sono selettive, non un controllo clinico esaustivo.

## Navigazione e stile

In Farmaci, nei filtri esistenti, si possono isolare le sintesi presenti, le identità senza sintesi propria, le fonti importate da sintetizzare e le fonti senza PK contestuale. La pagina già esistente «Fonti e copertura» mostra la ricognizione per area ATC. Una molecola può appartenere a più aree: le righe non sono sommabili.

Nessun nuovo tab principale. Palette, CSS, asset, logo, firma, temi chiaro/scuro e sei sezioni espandibili restano nello stile Isoelettrica. Cache `elix-alpha-0.12.4`.

## Verifiche riproducibili

`npm test` include le dodici suite precedenti/aggiunte, il controllo delle 4.225 pagine, tutti i documenti importati, identità, hash delle fonti, regressioni scientifiche e ricerca bilingue. `npm run audit:catalog` produce `/tmp/elix-audit/catalog-material-report.json` e `catalog-coverage-all.json`, con una riga per ogni identità. `ELIX_AUDIT_OUTPUT` può cambiare la cartella di uscita.

L'audit browser aggiunge 48 configurazioni (12 farmaci × 2 temi × 2 larghezze), 288 verifiche dei campi, quattro filtri e dodici profili riaperti offline. Si aggiunge alle 160 configurazioni generali, alle 66 PK precedenti e alle 16 neuro. Le immagini esterne sono bloccate nei test di interazione: non viene attestata la disponibilità del servizio ChEMBL.

Il browser locale ha restituito `ERR_BLOCKED_BY_ADMINISTRATOR`; il blocco non è stato aggirato. Esiti CI, merge e pubblicazione vanno verificati nella PR: questo documento non li attesta da solo. La validazione software non è validazione clinica indipendente.

## Coda editoriale residua

Le 123 fonti già importate senza sintesi propria sono individuabili dal filtro dedicato e dal rapporto completo. Il lavoro successivo va scelto dalla ricognizione per area, non contando le forme correlate come nuovi farmaci. Molte identità non hanno ancora fonti importate e richiedono acquisizione e verifica; «non presente nel dataset» non significa «dato scientifico inesistente».
