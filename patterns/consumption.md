# Pattern: Consumption

## Scopo

Inserire parametri, calcolare consumi e confrontare stime con rilevazioni mantenendo metodo, unità e tolleranze.

## Layout e gerarchia

Contesto articolo/file → parametri → azione di calcolo → risultati → scostamenti → dettaglio metodo. Desktop: input 4 colonne, risultati 8; mobile: input prima dei risultati con riepilogo sticky minimo.

## Componenti

Forms numerici, table standard/matrix, badges source/status, buttons, metric card limitate, log tecnico collassabile.

## Sezioni esempio

- File macchina e revisione
- Quantità, punti, lunghezza, materiali e coefficienti
- Consumo per filo/materiale e totale
- Tolleranza e confronto con dato reale
- Versione algoritmo, timestamp, esportazione

## Errori da evitare

Risultati senza unità, precisione arbitraria, calcolo automatico non segnalato, metodo nascosto, colori stagionali per esito primario, log mescolato ai risultati.

