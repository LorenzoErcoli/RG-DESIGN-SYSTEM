# Folder (tessera contenitore)

## Scopo

Rappresentare un **contenitore navigabile** — una sezione, un archivio, un raggruppamento — in
una griglia di dashboard. È una famiglia della card, distinta dalle card-entità: fondo `surface`,
radius ampio e icona ambra piena per leggersi come "cartella" e non come record. Promosso da
`rg-product-platform` (v0.3.0).

## Uso e limiti

Usare per poche destinazioni di primo livello (aprire una sezione/archivio), non per elencare
record: quelli vanno in tabella o card-entità. Il nome è un `<a>` o `<button>`: l'intera tessera è
il target (≥ 96px di altezza). Non annidare folder dentro folder.

## Struttura

Griglia `rg-folder-grid` → tessera con icona + corpo (nome + conteggio).

```html
<div class="rg-folder-grid">
  <a class="rg-folder" href="/archivio/pe26">
    <svg class="rg-folder__icon" width="28" height="28" aria-hidden="true"><!-- icona --></svg>
    <span class="rg-folder__body">
      <span class="rg-folder__name">Archivio PE 26</span>
      <span class="rg-folder__count">248 campioni</span>
    </span>
  </a>
</div>
```
