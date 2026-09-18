# Part sheet (pagina della parte)

## Scopo

La **pagina** che apre un pezzo nel fascicolo stampato. Chi la prende in mano deve capire in pochi secondi:
quale parte è, di quale prodotto, dove si colloca fra le altre parti, quali fasi deve fare e quali sono già
fatte. Il QR riporta alla parte nel sistema.

Nasce dalla seconda versione del fascicolo (1.25.0) ed è **compatta per costruzione** dalla 1.26.0, dopo la
seconda anteprima: *«la testata prende davvero troppo spazio: immagina un oggetto che ha 7 parti e la parte ha
6 fasi, deve comunque rientrare in un foglio»*. Con 4 parti e 3 fasi la 1.25 occupava il 91% dell'A4.

Non sostituisce la [testata di parte in linea](worksheet-part.md): la testata è una riga che apre la pagina e
lascia scorrere i blocchi; questa è una pagina che sta da sola. Un fascicolo usa l'una o l'altra.

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-part-sheet` | La pagina, in un documento `rg-u-print-a4--head`: resta sotto i 30 mm riservati all'intestazione. |
| `rg-part-sheet--no-head` | La pagina **senza** intestazione stampata: in stampa passa alla pagina `rg-a4` (margine 12 mm) e si riprende i 18 mm. L'app non deve stamparci sopra l'intestazione. |

| Elemento | Cosa porta |
| --- | --- |
| `rg-part-sheet__head` | Una riga bassa: titolo a sinistra, QR piccolo in linea a destra, filetto nero spesso sotto. ~70 px (18,5 mm). |
| `rg-part-sheet__title` | «Parte 1 di 4 · FONDO BORDATO» con la pastiglia [`rg-part-mark`](part-mark.md), 16 px, peso di pagina. |
| `rg-part-sheet__facts` / `__fact` | L'anagrafica in **tre colonne**: `<dl>` con un `<div class="rg-part-sheet__fact">` per coppia, etichetta piccola sopra, valore sotto. |
| `rg-part-sheet__section` | Un blocco della pagina con la sua etichetta (`rg-label`). |
| `rg-part-sheet__parts` | Tutte le parti del prodotto, in ordine, in **quattro colonne** su A4: `<ol>`. |
| `rg-part-sheet__part` | Una parte, riga da 20 px: pastiglia piccola, `__name`, `__code`. |
| `rg-part-sheet__part--current` | Questa parte: filetto nero spesso, grassetto, `aria-current="true"`. |
| `rg-part-sheet__name` | Il nome della parte; se non ci sta nella colonna finisce con i puntini, il codice resta intero. |
| `rg-part-sheet__code` | Il codice della parte, mono, a destra. |
| `rg-part-sheet__here` | «questa parte», facoltativo: dove la colonna lo lascia stare. |
| `rg-part-sheet__n`, `__dept`, `__done`, `__date`, `__sign` | Le **colonne** della tabella delle fasi, sulle `<th>`: larghezze dichiarate. `__dept` anche sulle `<td>` (reparto piccolo, maiuscolo, su una riga); `__done` anche sulle `<td>` (casella centrata). |

## Uso e limiti

**Cosa contiene, in quest'ordine.**

1. La **testata**: titolo e, a destra, il [QR](qr.md) `rg-qr--small rg-qr--inline` (16 mm, didascalia a sinistra).
2. L'**anagrafica**: cliente, prodotto, variante, codice RG, codice prodotto, quantità della parte nel prodotto.
   I codici in `dd.rg-mono`.
3. **Le parti del prodotto**, tutte, con questa segnata: dice quante sono e dove sta questa.
4. **Le fasi della parte** in [`rg-table--grid`](tables.md#tabella-da-compilare-a-griglia-rg-table--grid-proposta-1240):
   N · Lavorazione · Reparto · **Fatta** ([`rg-fill-field--check`](fill-field.md), 20 px ~5,3 mm) · Data · Firma
   (`td.rg-fill-field--cell`). Righe da 24 px, testo 12.

**Le colonne delle fasi hanno una misura**, non sono uguali: N 32 px, Reparto 256, Fatta 48, Data 96, Firma 96 (una
sigla), la Lavorazione prende il resto (~175 px su A4). Con colonne uguali il reparto più lungo,
«FINISSAGGIO E CONTROLLO QUALITÀ», andava a capo. Qui `--rg-table-cols` e `__grow` non servono.

**Sta in una pagina.** Misurato in Chrome, a 703 px (la larghezza utile dell'A4):

| Caso | Altezza | Della pagina con `rg-u-print-a4--head` (255 mm) |
| --- | --- | --- |
| 4 parti, 3 fasi | 412 px (109 mm) | 43% |
| 14 parti, 8 fasi | 609 px (161 mm) | 64% |

Ogni fila di quattro parti in più aggiunge ~24 px, ogni fase ~25. Oltre le 14 parti la pastiglia passa al grigio
([part-mark](part-mark.md)): la pagina ci sta ancora, fino a circa 40 parti e 15 fasi.

**In stampa** apre una pagina (non se è la prima cosa stampata), la chiude e non si spezza.

**Non è a schermo.** A schermo la parte è la sua pagina con [`rg-page-header`](page-header.md).

## Struttura

```html
<section class="rg-part-sheet">
  <header class="rg-part-sheet__head">
    <h2 class="rg-part-sheet__title"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</h2>
    <figure class="rg-qr rg-qr--small rg-qr--inline">
      <div class="rg-qr__img"><svg viewBox="0 0 29 29" role="img" aria-label="QR: apri la parte in RG"><!-- moduli generati dall'app --></svg></div>
      <figcaption class="rg-qr__caption">Apri la parte in RG</figcaption>
    </figure>
  </header>
  <dl class="rg-part-sheet__facts">
    <div class="rg-part-sheet__fact"><dt>Cliente</dt><dd>DIOR</dd></div>
    <div class="rg-part-sheet__fact"><dt>Prodotto</dt><dd>M3641 COCOTTE</dd></div>
    <div class="rg-part-sheet__fact"><dt>Variante</dt><dd>Nero / oro</dd></div>
    <div class="rg-part-sheet__fact"><dt>Codice RG</dt><dd class="rg-mono">RG-26-DIO-0441-P</dd></div>
    <div class="rg-part-sheet__fact"><dt>Codice prodotto</dt><dd class="rg-mono">M3641UBWN</dd></div>
    <div class="rg-part-sheet__fact"><dt>Quantità nel prodotto</dt><dd class="rg-mono">2 pz</dd></div>
  </dl>
  <section class="rg-part-sheet__section">
    <h3 class="rg-label">Le parti del prodotto</h3>
    <ol class="rg-part-sheet__parts">
      <li class="rg-part-sheet__part rg-part-sheet__part--current" aria-current="true"><span class="rg-part-mark rg-part-mark--small rg-part--1" aria-hidden="true"></span><span class="rg-part-sheet__name">FONDO BORDATO</span><span class="rg-part-sheet__code">P01</span></li>
      <li class="rg-part-sheet__part"><span class="rg-part-mark rg-part-mark--small rg-part--2" aria-hidden="true"></span><span class="rg-part-sheet__name">DAVANTI</span><span class="rg-part-sheet__code">P02</span></li>
      <li class="rg-part-sheet__part"><span class="rg-part-mark rg-part-mark--small rg-part--3" aria-hidden="true"></span><span class="rg-part-sheet__name">DIETRO</span><span class="rg-part-sheet__code">P03</span></li>
      <li class="rg-part-sheet__part"><span class="rg-part-mark rg-part-mark--small rg-part--4" aria-hidden="true"></span><span class="rg-part-sheet__name">MANICO</span><span class="rg-part-sheet__code">P04</span></li>
    </ol>
  </section>
  <section class="rg-part-sheet__section">
    <h3 class="rg-label">Fasi della parte</h3>
    <table class="rg-table rg-table--compact rg-table--grid">
      <thead>
        <tr><th class="rg-table__numeric rg-part-sheet__n" scope="col">N</th><th scope="col">Lavorazione</th><th class="rg-part-sheet__dept" scope="col">Reparto</th><th class="rg-part-sheet__done" scope="col">Fatta</th><th class="rg-part-sheet__date" scope="col">Data</th><th class="rg-part-sheet__sign" scope="col">Firma</th></tr>
      </thead>
      <tbody>
        <tr><td class="rg-table__numeric">1</td><td>Ricamo</td><td class="rg-part-sheet__dept">Ricamo</td><td class="rg-part-sheet__done"><span class="rg-fill-field rg-fill-field--check"></span></td><td class="rg-fill-field rg-fill-field--cell"></td><td class="rg-fill-field rg-fill-field--cell"></td></tr>
        <tr><td class="rg-table__numeric">2</td><td>Pressatura</td><td class="rg-part-sheet__dept">Pressatura e soffiatura</td><td class="rg-part-sheet__done"><span class="rg-fill-field rg-fill-field--check"></span></td><td class="rg-fill-field rg-fill-field--cell"></td><td class="rg-fill-field rg-fill-field--cell"></td></tr>
        <tr><td class="rg-table__numeric">3</td><td>Sabbiatura</td><td class="rg-part-sheet__dept">Pressatura e soffiatura</td><td class="rg-part-sheet__done"><span class="rg-fill-field rg-fill-field--check"></span></td><td class="rg-fill-field rg-fill-field--cell"></td><td class="rg-fill-field rg-fill-field--cell"></td></tr>
      </tbody>
    </table>
  </section>
</section>
```

Senza intestazione stampata (l'app non ci mette la sua fascia): stessa struttura con

```html
<section class="rg-part-sheet rg-part-sheet--no-head">
```
