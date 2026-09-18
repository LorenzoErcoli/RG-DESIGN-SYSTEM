# Cutout sheet (foglio dei tagliandi)

## Scopo

La **pagina** dei [riquadri da ritagliare](cutout.md). La legenda dei coni si ritaglia: se stesse in fondo al
foglio del ricamo, tagliandola si taglierebbe anche ciò che c'è sul retro. Quindi i tagliandi di un prodotto
(uno per fase di ricamo, anche 4–9) vanno insieme su una pagina loro, col retro bianco.

Nasce dalla seconda versione del fascicolo (proposta 1.25.0).

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-cutout-sheet` | **Due colonne**: il caso normale, legende da tre-sei righe. |
| `rg-cutout-sheet--single` | **Una colonna**: legende larghe o con molte colonne. |

| Elemento | Cosa porta |
| --- | --- |
| `rg-cutout-sheet__title` | Il titolo della pagina, sull'intera larghezza: «Tagliandi coni · M3641 COCOTTE · RG-26-DIO-0441-P». |

## Uso e limiti

**Apre e chiude la pagina** in stampa (non ne apre una vuota se è la prima cosa stampata). Se i tagliandi non
stanno in una pagina, la griglia continua sulla successiva; un tagliando non si spezza mai.

**Spazio per le forbici.** Fra un tagliando e l'altro 32 px (~8,5 mm) in verticale e 24 (~6,4 mm) in
orizzontale: si taglia lungo un tratteggio senza intaccare il vicino. «Ritaglia lungo il tratteggio» sporge sopra
il riquadro: il margine sopra ogni tagliando lo tiene nella sua cella, così quando una fila passa alla pagina
dopo la scritta va con il suo riquadro.

**Il retro bianco lo garantisce l'app**: nel fronte/retro, dopo il foglio dei tagliandi va una facciata vuota
([`rg-blank-page`](blank-page.md)) o il PDF la aggiunge.

**Ogni tagliando si identifica da solo**: nel titolo del tagliando parte e fase («Legenda coni · Parte 1 ·
FONDO BORDATO · Fase 1 Ricamo»), perché staccato non ha più la pagina intorno.

**La legenda dei coni** (dalla 1.25.0 comprende la spolina): Codice filo · Tipo (sopra / sotto) · Aghi ·
Metri · Colore, con la casella [`rg-fill-field--swatch`](fill-field.md) nella colonna Colore e
[`rg-table__grow`](tables.md) su Aghi.

## Struttura

```html
<section class="rg-cutout-sheet">
  <h2 class="rg-cutout-sheet__title">Tagliandi coni · M3641 COCOTTE · RG-26-DIO-0441-P</h2>
  <div class="rg-cutout">
    <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
    <div class="rg-cutout__head">
      <p class="rg-cutout__title">Legenda coni · Parte 1 · FONDO BORDATO · Fase 1 Ricamo</p>
    </div>
    <table class="rg-table rg-table--compact">
      <thead>
        <tr>
          <th scope="col">Codice filo</th>
          <th scope="col">Tipo</th>
          <th class="rg-table__grow" scope="col">Aghi</th>
          <th class="rg-table__numeric" scope="col">Metri</th>
          <th scope="col">Colore</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="rg-table__code">MAD-1800</td><td>sopra</td><td class="rg-table__numeric">1, 4</td><td class="rg-table__numeric">42,5</td><td><span class="rg-fill-field rg-fill-field--swatch"></span></td></tr>
        <tr><td class="rg-table__code">BOB-120</td><td>sotto</td><td class="rg-table__numeric">tutti</td><td class="rg-table__numeric">30,0</td><td><span class="rg-fill-field rg-fill-field--swatch"></span></td></tr>
      </tbody>
    </table>
  </div>
  <div class="rg-cutout">…un tagliando per ogni fase di ricamo…</div>
</section>
```
