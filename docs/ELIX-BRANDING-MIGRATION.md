# ELIX — branding e migrazione, 23 ottobre 2026

Il nome pubblico è **ELIX**, con sottotitolo **Farmacologia & Principi Attivi**. Il repository precedentemente chiamato PHARMA risolveva già a `eliseopeirano79-droid/eli`; al controllo iniziale `/eli/` rispondeva 200 e `/PHARMA/` e `/ELIX/` rispondevano 404.

## Correzione grafica integrata

Il ritaglio fotografico è sostituito da tipografia nativa dell’app e pillola SVG trasparente, condivisa tra header, menu, home e splash. Il colore segue il tema attivo e lo splash usa esattamente lo sfondo dell’app. Le icone installabili e l’anteprima social sono generate dallo stesso segno vettoriale. L’immagine iniziale resta soltanto come riferimento archiviato.

## Grafica e contenuti della prima migrazione

- Riferimento recuperato dalla copia di progetto `work/ELIX/assets/elix-logo.png`, conservato senza modifiche in `assets/elix-reference.png`. SHA-256: `476b3193923d8f6cb362edef39cb0d2e9cca5d72d128bf577b0c8583a1f221f2`.
- Header e menu mostrano la scritta dell'immagine attraverso una finestra CSS; splash e anteprime social usano lo stesso riferimento. La pillola vettoriale verde già ricavata dal riferimento resta il simbolo e produce le icone 192/512 e la variante maskable con margine di sicurezza. I vecchi asset del monogramma E sono sostituiti anche ai loro percorsi storici.
- Corrette tutte le diciture visibili, i titoli accessibili, i titoli dinamici, gli avvisi di aggiornamento, il manifest, i metadata Apple/Open Graph e il canonical.
- Il layout Isoelettrica e i contenuti farmacologici sono conservati. Nessun file in `data/` è modificato. Gli identificatori interni storici, i nomi dei moduli e le chiavi di salvataggio restano stabili.

## Distribuzione senza interruzione

Destinazione canonica: `https://eliseopeirano79-droid.github.io/ELIX/`.

1. Pubblicare ELIX con tutta la cronologia Git e verificarne il deploy e i file pubblici.
2. Solo dopo, pubblicare la stessa versione su `/eli/` e ripristinare `/PHARMA/` con un repository di compatibilità.
3. I vecchi percorsi controllano il marker di release e il vero HTML di ELIX. Solo quando entrambi rispondono correttamente effettuano `location.replace`, conservando query e hash della pagina.
4. Se ELIX non risponde o il dispositivo è offline, rimane disponibile l'app completa al vecchio indirizzo. Non vengono cancellati preferiti, progressi o cache di altre applicazioni.

I tre percorsi sono sullo stesso origin: conservando le chiavi `pharma-*` ed `elix-academy-*`, localStorage non richiede esportazione né trasferimento. Le cache nuove sono separate per percorso con prefisso `elix@<scope>::`; i vecchi service worker non possono cancellarle con le proprie regole storiche. Le cache storiche restano intatte. Gli aggiornamenti registrano il worker anche se il caricamento della pagina è già terminato.

Il repository storico `eli` conserva issue e PR; il nuovo repository ELIX conserva tutta la cronologia dei commit. Non è una semplice rinomina, perché GitHub non reindirizza automaticamente gli URL dei siti Pages. Il repository PHARMA di compatibilità interrompe il precedente alias GitHub PHARMA→eli: issue e PR storiche restano consultabili direttamente in `eli`.

## Verifiche ripetibili

- `npm test`: catalogo e suite esistenti; nome, integrità dell'immagine, metadata e dimensioni PNG.
- `scripts/browser-elix-branding.cjs`: desktop/mobile (1440, 768, 390, 320 px), entrambi i temi, sei sezioni, splash, assenza di overflow, redirect, hash/query e dati locali, fallback quando ELIX non risponde, riapertura offline e cache estranee preservate. Con `ELIX_LEGACY_ROOT` controlla anche l'upgrade dalla release precedente.
- `scripts/browser-update-banner.cjs`: 32 configurazioni, testo ingrandito, vero aggiornamento del service worker, avvisi offline e aggiornamento senza sovrapposizioni.
- Conteggi conservati: 4.225 identità, 81 sintesi e 51 profili PK. Le verifiche del branding non sono una nuova revisione scientifica dei contenuti.

Verificati localmente: tutti i controlli sopra, incluso upgrade dalla release `de951aa`, senza errori JavaScript. L'esito della pubblicazione si verifica nei workflow e con confronto dei file pubblici con il commit. Le icone e i nomi delle app già installate possono richiedere un aggiornamento da parte del sistema operativo; non viene attestata una reinstallazione nel Dock.
