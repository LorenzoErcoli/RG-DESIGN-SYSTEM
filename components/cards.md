# Cards

## Scopo

Raggruppare un'entità autonoma o un contenuto con una destinazione chiara. La card non è il contenitore predefinito di ogni sezione.

## Varianti

- **Entity**: titolo, codice, metadati e stato.
- **Editorial**: immagine/texture, titolo, testo e didascalia; può usare un accento stagionale.
- **Metric**: valore, unità, contesto e trend; solo per metriche davvero prioritarie.
- **Selectable**: selezione esplicita con checkbox/radio, non intera area ambigua.
- **`rg-card--emphasis`** (v1.13.0): la card che è il **soggetto della vista**. Contorno nero al
  posto del gradino intermedio, nient'altro.

## Uso e limiti

Usare per collezioni di elementi confrontabili o contenuti autonomi. Evitare card annidate e dashboard interamente frammentate in riquadri. Per sezioni consecutive preferire griglia aperta e linee.

### Enfasi (`--emphasis`) — una sola per vista

`--emphasis` **non è uno stato e non ha significato semantico**: non dice cosa la card contiene,
dice soltanto *«guarda prima qui»*. Serve quando una vista ha un soggetto e degli accessori — la
parte in lavorazione fra le sue revisioni, l'ordine aperto fra quelli archiviati — e senza un
segnale tutti i contenitori si leggono allo stesso livello.

- **Una sola card enfatizzata per vista.** Se tutto è enfatizzato niente lo è: è esattamente il
  difetto che la revisione 1.13.0 corregge. La regola è di composizione, il CSS non la impone.
- Non confonderla con le varianti che *significano* qualcosa: `--technical` dice «questo è un
  calcolo», `--selected` dice «l'hai scelta tu», `--warning`/`is-error` dicono uno stato del dato.
  Quelle restano leggibili anche combinate con l'enfasi, e mantengono il proprio filetto laterale.
- Se il soggetto della vista è un blocco con una testa (un tab, una sezione), l'oggetto giusto è
  [`rg-section-card--emphasis`](section-card.md), non una card.

### Superficie e contorno (dalla 1.13.0)

La card è una superficie **sollevata** (`--rg-color-surface-raised`, bianca) posata sul fondo di
pagina (`--rg-color-background`, neutral-50), con contorno al gradino **intermedio**
(`--rg-color-border-medium`). Prima della 1.13.0 era bianca su pagina bianca, separata dal solo
filetto neutro (1,35:1 di contrasto): il contenitore, di fatto, non si vedeva. Vedi
[design-rules.md §6](../design-rules.md#quale-superficie-a-quale-profondità).

Il titolo (`rg-card__title`) è a peso **medium**: è un titolo di livello *contenitore*, non di
pagina. Il peso lo dichiara il DS, quindi non cambia se il titolo sta su un `<h3>` o su un `<p>`.

## Struttura

Eyebrow/stato → titolo → contenuto → metadati → azione. Bordo 1 px, radius 4 px, nessuna ombra ordinaria.

```html
<article class="rg-card">
  <p class="rg-card__eyebrow">RG-AR-0248</p>
  <h3 class="rg-card__title">Ricamo floreale su organza</h3>
  <p class="rg-card__body">Campione archivio · PE 2026</p>
</article>
```

La card soggetto della vista, accanto alle altre:

```html
<article class="rg-card rg-card--emphasis">
  <p class="rg-card__eyebrow">IN LAVORAZIONE</p>
  <h3 class="rg-card__title">Revisione 04</h3>
  <p class="rg-card__body">Consumi ricalcolati il 12/07 · in attesa di validazione</p>
</article>
```

