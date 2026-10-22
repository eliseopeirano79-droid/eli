# ELIX — barra di aggiornamento e avvisi responsive

Richiesta di Eli del 23 ottobre 2026: barra troppo larga, contenuto sbilanciato e centratura da verificare. Base: PR #12, commit f23d34f0c223a2d326b3f8d73060b2d3d81d1676.

## Correzione

Il contenitore precedente aveva larghezza fissa fino a 600 px, con testo e pulsante allineati a sinistra: lo spazio inutilizzato a destra faceva apparire il contenuto fuori centro. La nuova barra ha larghezza intrinseca, limite pari allo spazio disponibile e un contenitore centrato rispetto al viewport con margini laterali simmetrici. I margini rispettano le safe area; negli schermi più stretti i controlli si dispongono in verticale. Il pulsante conserva un'altezza minima di 44 px.

Aggiornamento e stato offline condividono una pila verticale, senza sovrapporsi. Il contenitore è esterno al rendering delle pagine: cambio tema e navigazione non lo rimuovono. Il testo, i colori salvia/petrolio, il logo, la firma e le cinque sezioni principali restano invariati. Gli avvisi non rubano il focus e non compaiono nella stampa. La prima installazione resta silenziosa; un aggiornamento produce un solo avviso. Il pulsante ricarica la pagina corrente senza cambiarne la destinazione.

Cache della release: `elix-alpha-0.12.5`. Nessun cambiamento ai dati farmacologici rispetto al lotto già presente nella PR #12.

## Verifiche

- `npm test`: dodici suite superate localmente, inclusa la ricognizione delle 4.225 identità e dei 172 documenti. Non è una validazione clinica indipendente.
- Rendering locale dei fogli di stile: centratura e assenza di overflow verificate fra 320 e 1920 px, temi chiaro/scuro. Il browser locale non consente navigazioni HTTP (`ERR_BLOCKED_BY_ADMINISTRATOR`); nessun aggiramento del blocco.
- `scripts/browser-update-banner.cjs` esercita la vera app sotto `/PHARMA/`, con un server di prova e due revisioni del worker. La prova comprende 32 configurazioni (8 larghezze, 2 temi, densità 1 e 2), 6 ingrandimenti del testo, aggiornamento effettivo, assenza di avviso alla prima installazione, focus, duplicati, offline contemporaneo, navigazione, ricaricamento da tastiera e controllo ripetuto della medesima versione. Le immagini esterne sono escluse: non si attesta la disponibilità di ChEMBL.
- Il workflow esistente esegue il nuovo script dopo tutte le matrici precedenti e conserva `update-banner-report.json` e screenshot. Gli esiti effettivi, il merge e la pubblicazione sono registrati nella PR, non attestati dal solo elenco di test.
