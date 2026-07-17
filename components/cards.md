# Cards

## Scopo

Raggruppare un'entità autonoma o un contenuto con una destinazione chiara. La card non è il contenitore predefinito di ogni sezione.

## Varianti

- **Entity**: titolo, codice, metadati e stato.
- **Editorial**: immagine/texture, titolo, testo e didascalia; può usare un accento stagionale.
- **Metric**: valore, unità, contesto e trend; solo per metriche davvero prioritarie.
- **Selectable**: selezione esplicita con checkbox/radio, non intera area ambigua.

## Uso e limiti

Usare per collezioni di elementi confrontabili o contenuti autonomi. Evitare card annidate e dashboard interamente frammentate in riquadri. Per sezioni consecutive preferire griglia aperta e linee.

## Struttura

Eyebrow/stato → titolo → contenuto → metadati → azione. Bordo 1 px, radius 4 px, nessuna ombra ordinaria.

```html
<article class="rg-card">
  <p class="rg-card__eyebrow">RG-AR-0248</p>
  <h3 class="rg-card__title">Ricamo floreale su organza</h3>
  <p class="rg-card__body">Campione archivio · PE 2026</p>
</article>
```

