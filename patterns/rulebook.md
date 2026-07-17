# Pattern: Rulebook

## Scopo

Creare, consultare e versionare regole operative applicabili a materiali, tecniche, macchine e controlli.

## Layout e gerarchia

Ricerca/ambito → elenco regole → dettaglio → condizioni → effetti → esempi → cronologia. Desktop master-detail 4/8; editing in pagina per regole complesse.

## Componenti

Search, table/list, badges status/scope, forms, code/condition block mono, version history, buttons.

## Sezioni esempio

- ID, titolo, stato e proprietario
- Ambito di applicazione
- Condizioni `se` e risultato `allora`
- Priorità, conflitti e dipendenze
- Test case, eccezioni e note
- Versione, approvazione ed efficacia

## Errori da evitare

Regole in solo linguaggio libero, condizioni senza esempi, modifica senza audit trail, stati ambigui, priorità implicite, cancellazione definitiva di versioni utilizzate.

