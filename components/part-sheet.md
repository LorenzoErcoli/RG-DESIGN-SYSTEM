# Part sheet (pagina della parte)

## Scopo

La **pagina intera** che apre un pezzo nel fascicolo stampato. Chi la prende in mano deve capire in pochi
secondi: quale parte è, di quale prodotto, dove si colloca fra le altre parti, quali fasi deve fare e quali
sono già fatte. Il QR riporta alla parte nel sistema.

Nasce dalla seconda versione del fascicolo (proposta 1.25.0). Non sostituisce la
[testata di parte in linea](worksheet-part.md): la testata è una riga che apre la pagina e lascia scorrere i
blocchi; questa è una pagina che sta da sola. Un fascicolo usa l'una o l'altra.

## Varianti

Nessuna.

| Elemento | Cosa porta |
| --- | --- |
| `rg-part-sheet__head` | Titolo a sinistra, QR a destra, filetto nero spesso sotto. |
| `rg-part-sheet__title` | «Parte 1 di 4 · FONDO BORDATO» con la pastiglia [`rg-part-mark`](part-mark.md), 28 px, peso di pagina. |
| `rg-part-sheet__section` | Un blocco della pagina con la sua etichetta (`rg-label`). |
| `rg-part-sheet__parts` | Tutte le parti del prodotto, in ordine: `<ol>`. |
| `rg-part-sheet__part` | Una parte: pastiglia, nome, codice. |
| `rg-part-sheet__part--current` | Questa parte: filetto nero spesso, grassetto, `aria-current="true"` e la scritta `__here`. |
| `rg-part-sheet__here` | «questa parte», scritto: la parte corrente non si riconosce dal solo colore. |
| `rg-part-sheet__code` | Il codice della parte, mono, a destra. |

## Uso e limiti

**Cosa contiene, in quest'ordine.**

1. Il **titolo** con la pastiglia e, a destra, il [QR](qr.md) con la didascalia «Apri la parte in RG».
2. L'**identità del prodotto per esteso** in una [`rg-key-value rg-key-value--ruled`](technical-data.md):
   cliente, prodotto, codice RG, codice prodotto, variante, quantità della parte nel prodotto. I codici in
   `dd.rg-mono`.
3. **Le parti del prodotto**, tutte, con questa segnata: dice quante sono e dove sta questa.
4. **Le fasi della parte**, in ordine, in una tabella da compilare a griglia
   ([`rg-table--grid`](tables.md#tabella-da-compilare-a-griglia-rg-table--grid-proposta-1240)): N · Lavorazione
   · Reparto · **Fatta** (casella [`rg-fill-field--check`](fill-field.md), ~6 mm, da spuntare a penna) · Data ·
   Firma (`td.rg-fill-field--cell`). Lavorazione e Reparto larghe: `--rg-table-cols: 6; --rg-table-wide: 2`.

**Sta da sola.** In stampa apre una pagina (non se è la prima cosa stampata), la chiude e non si spezza.
Se le fasi sono tante da non starci, vanno ridotte a monte: la pagina della parte è un indice, non una scheda.

**L'identità è anche fuori.** Con `rg-u-print-a4--head` ogni pagina porta l'intestazione stampata dall'app
([misure](worksheet-block.md#intestazione-di-pagina)): la pagina della parte la ripete per esteso, perché è
quella che si consulta.

**Non è a schermo.** A schermo la parte è la sua pagina con [`rg-page-header`](page-header.md).

## Struttura

```html
<section class="rg-part-sheet">
  <header class="rg-part-sheet__head">
    <h2 class="rg-part-sheet__title"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</h2>
    <figure class="rg-qr">
      <div class="rg-qr__img"><!-- SVG del QR generato dall'app --></div>
      <figcaption class="rg-qr__caption">Apri la parte in RG</figcaption>
    </figure>
  </header>
  <dl class="rg-key-value rg-key-value--ruled">
    <dt>Cliente</dt><dd>DIOR</dd>
    <dt>Prodotto</dt><dd>M3641 COCOTTE</dd>
    <dt>Codice RG</dt><dd class="rg-mono">RG-26-DIO-0441-P</dd>
    <dt>Codice prodotto</dt><dd class="rg-mono">M3641UBWN</dd>
    <dt>Variante</dt><dd>Nero / oro</dd>
    <dt>Quantità nel prodotto</dt><dd class="rg-mono">2 pz</dd>
  </dl>
  <section class="rg-part-sheet__section">
    <h3 class="rg-label">Le parti del prodotto</h3>
    <ol class="rg-part-sheet__parts">
      <li class="rg-part-sheet__part rg-part-sheet__part--current" aria-current="true"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>FONDO BORDATO <span class="rg-part-sheet__here">questa parte</span><span class="rg-part-sheet__code">P01</span></li>
      <li class="rg-part-sheet__part"><span class="rg-part-mark rg-part--2" aria-hidden="true"></span>DAVANTI<span class="rg-part-sheet__code">P02</span></li>
    </ol>
  </section>
  <section class="rg-part-sheet__section">
    <h3 class="rg-label">Fasi della parte</h3>
    <table class="rg-table rg-table--compact rg-table--grid" style="--rg-table-cols: 6; --rg-table-wide: 2">
      <thead>
        <tr>
          <th class="rg-table__numeric" scope="col">N</th>
          <th class="rg-table__grow" scope="col">Lavorazione</th>
          <th class="rg-table__grow" scope="col">Reparto</th>
          <th scope="col">Fatta</th>
          <th scope="col">Data</th>
          <th scope="col">Firma</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rg-table__numeric">1</td>
          <td>Ricamo</td>
          <td>Ricamo</td>
          <td><span class="rg-fill-field rg-fill-field--check"></span></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
      </tbody>
    </table>
  </section>
</section>
```
