# Folder (tessera contenitore)

## Scopo

Rappresentare un **contenitore navigabile** — una sezione, un archivio, un raggruppamento — in
una griglia di dashboard. È una famiglia della card, distinta dalle card-entità: fondo `surface`,
radius ampio e icona ambra piena per leggersi come "cartella" e non come record. Promosso da
`rg-product-platform` (v0.3.0).

## Varianti

| Classe | Dove | Misure |
| --- | --- | --- |
| `rg-folder-grid` + `rg-folder` | poche destinazioni di primo livello, sul fondo o in una pagina d'ingresso | tessera alta almeno 96, colonne da 260, 24 di luce, raggio 8, icona piena in sabbia |
| `rg-folder-grid--compact` (proposta 1.56.0) | le cartelle di un **elenco** (la pagina Prodotti: cartelle per cliente, per collezione…), dentro la section card con la barra dei filtri | tessera alta almeno 72, colonne da 200, 12 di luce, raggio 4, padding 12, icona del set `rg-icon-cartella` a 24 in grigio, nome a 14 |

La variante sta sulla **griglia**, non sulla tessera: le cartelle di una griglia sono tutte uguali, e
una classe sola nel template basta.

### Perché la compatta

Nella pagina Prodotti le cartelle stavano sotto la barra dei filtri e sopra la tabella, cioè fra due
cose a raggio 4, filetto neutro e corpo 14, ed erano tessere grigie alte 96 a raggio 8 con il nome a 16
in grassetto: la pagina sembrava fatta di due sistemi. La compatta prende le misure della barra e della
tabella, e le stesse della [fila di record](record-strip.md) che le sta sopra («Ultimi caricati»):

- **stesse misure, figure diverse.** La cartella è un **contenitore** (apre un gruppo), la tessera della
  fila un **record** (apre un prodotto). Hanno la stessa altezza minima, lo stesso raggio, lo stesso
  filetto, la stessa superficie e la stessa griglia di colonne, e si allineano in colonna. Le distingue
  la figura: l'icona della cartella col conteggio mono sotto, contro la miniatura col cliente sotto.
- **Superficie rientrante dentro la section card bianca** (§6: una tessera bianca sul bianco sarebbe
  una card nella card). Hover: bianco e contorno nero, come la cartella di sempre.
- **Icona in grigio, non in sabbia.** La cartella grande ha una figura piena; questa il tratto da 1,5
  del set, e un tratto sabbia sul grigio sta a ~2,3:1. Grigio secondario a riposo, nero all'hover.
- **Nome a 14 medium**, maiuscolo con la spaziatura da label: il corpo della cella di tabella.

## Uso e limiti

Usare per poche destinazioni di primo livello (aprire una sezione/archivio) o per i gruppi di un
elenco (variante compatta), non per elencare record: quelli vanno in tabella, in card-entità o nella
[fila di record](record-strip.md). Il nome è un `<a>` o `<button>`: l'intera tessera è il target
(≥ 96 px di altezza, ≥ 72 nella compatta). Non annidare folder dentro folder.

- **Il nome va a capo, non si tronca** (dalla 1.56.0, anche nella tessera grande). Fino alla 1.55.0
  stava su una riga coi puntini: «BRUNELLO CUCINE…». Un nome troncato è un'informazione persa
  ([archive](../patterns/archive.md), «codici troncati»), e qui il nome è l'unica cosa che dice quale
  cartella è. La tessera cresce, e le tessere della stessa riga crescono con lei.
- **L'icona**: nella compatta quella del set, `<svg class="rg-icon rg-folder__icon"><use
  href="…/rg-icons.svg#rg-icon-cartella">`, sempre `aria-hidden`. La tessera grande accetta ancora
  un disegno pieno proprio.
- Il conteggio dice **cosa** conta («172 prodotti»), in mono.

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

### Compatta (proposta 1.56.0)

```html
<div class="rg-folder-grid rg-folder-grid--compact">
  <a class="rg-folder" href="/?cliente=BRUNELLO%20CUCINELLI">
    <svg class="rg-icon rg-folder__icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-cartella"></use></svg>
    <span class="rg-folder__body">
      <span class="rg-folder__name">BRUNELLO CUCINELLI</span>
      <span class="rg-folder__count">48 prodotti</span>
    </span>
  </a>
</div>
```

Vetrina: tavola 64 `#list-page`; la pagina intera in
[examples/rg-pagina-elenco.html](../examples/rg-pagina-elenco.html).
