# Pattern: Review

## Scopo

Validare dati estratti o modifiche confrontandoli con la fonte e registrando una decisione verificabile.

## Layout e gerarchia

Contesto/versione → progresso → confronto fonte/dato → anomalie → decisione. Desktop split view 5/7 o 6/6; sorgente sempre sincronizzata con il record selezionato. Barra azioni sticky ma discreta.

## Componenti

Table review, badges, form fields, diff, note, primary/secondary/danger buttons, progress testuale.

## Sezioni esempio

- Documento o immagine sorgente
- Campo estratto, confidenza e provenienza
- Valore proposto e valore precedente
- Nota del revisore
- Approva, correggi, rimanda

## Errori da evitare

Approvazione bulk senza riepilogo, differenze affidate solo a rosso/verde, fonte lontana dal dato, shortcut non documentate, perdita delle correzioni al cambio record.

