# Riga materiali (materials row)

## Scopo

Rendere **evidente la presenza e il numero** dei materiali caricati di una fase (pantografo,
stop, supporti): finora una fase con materiali non mostrava nemmeno che ce ne fossero. La riga
porta un'**etichetta**, un **`rg-badge` di conteggio** e l'**elenco** dei materiali in mono, su
una superficie aperta rigata (non una card).

### Perché un componente nuovo e non uno esistente

- `rg-list-row` è **una riga per record**: qui invece serve **una riga sola** che riassume la
  presenza e il conteggio di più materiali, non un elenco di record navigabili o con azioni.
- `rg-table` serve a **confrontare** record su colonne: qui non si confronta nulla, si dichiara
  «ci sono N materiali, eccoli».
- I `rg-badge` (`--count`, `--material`) sono il **conteggio** dentro la riga, non la riga
  stessa.

È quindi un riepilogo di **presenza + conteggio**, un mattone proprio, che riusa `rg-badge` per
il numero.

## Varianti / stati

- **Con materiali**: etichetta + `rg-badge--count` (`rg-badge--material`) + `rg-materials-row__list`.
- **Stato vuoto**: la **stessa riga base** con etichetta + badge `0 caricati` +
  `rg-materials-row__empty` con la frase «Nessun materiale…». L'assenza è dichiarata dalla
  **struttura** (etichetta + conteggio zero + testo), mai dal solo colore: non serve un
  modificatore dedicato.

## Uso e limiti

- Il conteggio è sempre un `rg-badge`, non un numero sciolto: è il segnale non-cromatico della
  presenza. Componibile con una variante semantica (`rg-badge--material`).
- Ogni materiale porta nome leggibile **+ codice tecnico in mono** (`rg-materials-row__code`),
  come richiede §10 delle regole (materiali: nome + codice + lotto quando disponibile).
- È una **riga compatta**, non una sezione: per lo stato vuoto qui basta
  `rg-materials-row__empty` (inline). Quando i materiali hanno una sezione/pannello propri e
  grandi, lo stato vuoto è invece `rg-empty` (superficie centrata).
- Non è navigabile e non contiene form: se un materiale apre un dettaglio, quello è un
  `rg-list-row--link` o una tabella, non questa riga.

## Struttura

```html
<div class="rg-materials-row">
  <span class="rg-materials-row__label">Materiali</span>
  <span class="rg-badge rg-badge--count rg-badge--material">2 caricati</span>
  <ul class="rg-materials-row__list">
    <li class="rg-materials-row__item">Pantografo <span class="rg-materials-row__code">PGF-0112</span></li>
    <li class="rg-materials-row__item">Stop <span class="rg-materials-row__code">STP-0043</span></li>
  </ul>
</div>
```

Stato vuoto:

```html
<div class="rg-materials-row">
  <span class="rg-materials-row__label">Materiali</span>
  <span class="rg-badge rg-badge--count">0 caricati</span>
  <p class="rg-materials-row__empty">Nessun materiale caricato per questa fase.</p>
</div>
```
