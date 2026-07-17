# Tables

## Scopo

Confrontare record strutturati: materiali, fili, operazioni, consumi, revisioni e risultati.

## Varianti

- **Standard**: densità media, intestazione persistente opzionale.
- **Compact**: grandi dataset, altezza riga minima 36 px.
- **Review**: colonna stato, differenze e azioni contestuali.
- **Matrix**: parametri incrociati; prima colonna e header bloccabili.

## Uso e limiti

Usare quando colonne e confronto sono centrali. Evitare per liste narrative, mobile senza priorità definite o record con troppe azioni. Non usare zebra striping forte: preferire separatori sottili e hover neutro.

## Struttura

Caption → toolbar filtri → header → righe → paginazione/riepilogo. Header descrittivi; unità nell'header e, se ambiguo, nel valore. Numeri allineati a destra in mono con cifre tabulari. Codici non vanno troncati senza accesso al valore completo.

```html
<table class="rg-table">
  <caption>Consumo fili — revisione 04</caption>
  <thead><tr><th>Codice</th><th>Materiale</th><th class="numeric">Consumo (m)</th><th>Stato</th></tr></thead>
  <tbody><tr><td class="mono">FIL-0281</td><td>Viscosa opaca</td><td class="mono numeric">18.42</td><td>Validato</td></tr></tbody>
</table>
```

