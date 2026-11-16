# Pattern: Archive

## Scopo

Cercare, confrontare e aprire campioni, ricami, materiali e documenti preservando provenienza e relazioni.

## Layout e gerarchia

Ricerca dominante → filtri persistenti → conteggio/ordinamento → risultati list/grid → dettaglio. Desktop con pannello filtri 3 colonne e risultati 9; il dettaglio può aprirsi in pagina dedicata per record complessi.

## Componenti

Search form, filtri, cards entity/editorial, table, badges source/status, pagination, breadcrumb.

Dalla 1.55.0 i filtri di un elenco della piattaforma stanno **sopra** l'elenco, in una barra sola
([`rg-filter-bar`](../components/filter-bar.md)), e non in un pannello laterale: ricerca, filtri a
scelta multipla con i conteggi, etichette dei valori scelti, «Raggruppa per» con la
[riga di gruppo](../components/tables.md#riga-di-gruppo-rg-table__group-proposta-1550), e lo stato
vuoto che dice quale filtro lo svuota. Il pannello laterale resta la forma per un archivio con
molti filtri da tenere tutti in vista.

## Sezioni esempio

- Identità: titolo, codice, stagione, cliente/progetto secondo permessi
- Anteprima tessile e dettagli macro
- Materiali e fili
- Operazioni e file associati
- Cronologia revisioni e relazioni con altri campioni

## Errori da evitare

Ricerca nascosta, immagini senza metadati, filtri non reversibili, codici troncati, infinite scroll senza posizione recuperabile, colore come unico criterio di ricerca.

