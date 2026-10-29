# Cutout sheet (foglio dei tagliandi)

## Scopo

La **pagina** dei [riquadri da ritagliare](cutout.md). La legenda dei coni si ritaglia: se stesse in fondo al
foglio del ricamo, tagliandola si taglierebbe anche ciò che c'è sul retro. Quindi i tagliandi di un prodotto
vanno insieme su una pagina loro, col retro bianco.

Due modi di riempirla:
- **un tagliando per il prodotto** (dal 29/10/2026 il caso dei «Fili da ordinare»): i fili di tutte le parti
  accorpati, una riga per codice, in `--single`;
- **un tagliando per fase di ricamo** (anche 4–9), a due colonne: resta possibile quando ogni pezzo va alla
  sua macchina, come la legenda dei coni.

Nasce dalla seconda versione del fascicolo (proposta 1.25.0).

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-cutout-sheet` | **Due colonne**: tagliandi stretti, uno per fase, legende da tre-sei righe. |
| `rg-cutout-sheet--single` | **Una colonna**: il tagliando unico di prodotto, o legende larghe o con molte colonne. |

| Elemento | Cosa porta |
| --- | --- |
| `rg-cutout-sheet__title` | Il titolo della pagina, sull'intera larghezza: «Fili da ordinare · M3641 COCOTTE · RG-26-DIO-0441-P». |

## Uso e limiti

**Apre e chiude la pagina** in stampa (non ne apre una vuota se è la prima cosa stampata). Se i tagliandi non
stanno in una pagina, la griglia continua sulla successiva; un tagliando non si spezza mai.

**Spazio per le forbici.** Fra un tagliando e l'altro 32 px (~8,5 mm) in verticale e 24 (~6,4 mm) in
orizzontale: si taglia lungo un tratteggio senza intaccare il vicino. «Ritaglia lungo il tratteggio» sporge sopra
il riquadro: il margine sopra ogni tagliando lo tiene nella sua cella, così quando una fila passa alla pagina
dopo la scritta va con il suo riquadro.

**Il retro bianco lo garantisce l'app**: nel fronte/retro, dopo il foglio dei tagliandi va una facciata vuota
([`rg-blank-page`](blank-page.md)) o il PDF la aggiunge.

**Ogni tagliando si identifica da solo**, perché staccato non ha più la pagina intorno:
- **tagliando di prodotto**: il titolo dice cosa copre («Fili da ordinare · tutte le parti», o «parti
  stampate» quando se ne stampano solo alcune), il **prodotto** sta in [`rg-cutout__meta`](cutout.md)
  («M3641 COCOTTE · RG-26-DIO-0441-P»). Le parti non vanno nel titolo: stanno su ogni riga;
- **tagliando per fase**: nel titolo parte e fase («Legenda coni · Parte 1 · FONDO BORDATO · Fase 1
  Ricamo»), il prodotto in `rg-cutout__meta`.

**Tagliando di prodotto: una riga per codice.** Un filo usato su cinque parti si legge una volta, con accanto,
in `rg-small`, le parti che lo usano: «parti 1, 2, 5» («parte 3» se è una sola). Il codice
in `rg-mono`. Filo sopra e spolina con lo stesso codice restano due righe, ↑ e ↓: si contano a parte.

**Continuazione «N di M».** Un tagliando non si spezza fra due pagine, quindi non può crescere oltre una
pagina: **oltre ~21 righe** l'app chiude il tagliando e continua in un altro, e il titolo lo dice
(«Fili da ordinare · tutte le parti · 2 di 3»). Ognuno sta sulla sua pagina, col retro bianco, ripete il
prodotto in `rg-cutout__meta` e si ritaglia da solo. Con un tagliando solo, niente «1 di 1». Il salto di
pagina fra un tagliando e l'altro lo decide l'app: il componente non lo forza.

**La legenda dei coni per fase** (dalla 1.25.0 comprende la spolina): Codice filo · Tipo (sopra / sotto) · Aghi ·
Metri · Colore, con la casella [`rg-fill-field--swatch`](fill-field.md) nella colonna Colore e
[`rg-table__grow`](tables.md) su Aghi.

## Struttura

Tagliando di prodotto (Fili da ordinare), qui il secondo di tre:

```html
<section class="rg-cutout-sheet rg-cutout-sheet--single">
  <h2 class="rg-cutout-sheet__title">Fili da ordinare · M3641 COCOTTE · RG-26-DIO-0441-P</h2>
  <div class="rg-cutout">
    <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
    <div class="rg-cutout__head">
      <p class="rg-cutout__title">Fili da ordinare · tutte le parti · 2 di 3</p>
      <p class="rg-cutout__meta">M3641 COCOTTE · RG-26-DIO-0441-P</p>
    </div>
    <table class="rg-table rg-table--compact">
      <thead>
        <tr>
          <th scope="col">Codice filo</th>
          <th class="rg-table__numeric" scope="col">Coni</th>
          <th scope="col">Ordinato</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><span class="rg-mono">↑766/40 CF</span> <span class="rg-small">parti 1, 2, 5</span></td><td class="rg-fill-field rg-fill-field--cell"></td><td><span class="rg-fill-field rg-fill-field--check"></span></td></tr>
        <tr><td><span class="rg-mono">↓766/40 CF</span> <span class="rg-small">parte 3</span></td><td class="rg-fill-field rg-fill-field--cell"></td><td><span class="rg-fill-field rg-fill-field--check"></span></td></tr>
      </tbody>
    </table>
  </div>
</section>
```

Un tagliando per fase, a due colonne:

```html
<section class="rg-cutout-sheet">
  <h2 class="rg-cutout-sheet__title">Tagliandi coni · M3641 COCOTTE · RG-26-DIO-0441-P</h2>
  <div class="rg-cutout">
    <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
    <div class="rg-cutout__head">
      <p class="rg-cutout__title">Legenda coni · Parte 1 · FONDO BORDATO · Fase 1 Ricamo</p>
      <p class="rg-cutout__meta">M3641 COCOTTE</p>
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
