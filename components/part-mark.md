# Part mark (identità delle parti)

## Scopo

Distinguere a colpo d'occhio le **parti sorelle** di un prodotto (DAVANTI, DIETRO, LATO, FONDO,
MANICO…) nelle viste dove compaiono insieme o si passa dall'una all'altra: la tabella delle parti,
la testata della pagina della parte e della fase, il percorso. Una parte ha un'identità fissa per
tutta la vita del prodotto: la stessa lettera e lo stesso colore in ogni pagina.

Seconda applicazione della palette categoriale (`--rg-color-category-1…7`) dopo
[`rg-dept-band`](dept-band.md). Regola generale in [design-rules §4](../design-rules.md#identità-delle-parti-dalla-1170).

## Varianti

| Classe | Forma | Dove |
| --- | --- | --- |
| `rg-part--1` … `rg-part--14` | **identità**: colore e lettera; su un elemento o su un antenato | ovunque |
| `rg-part--quiet` | la stessa identità in grigio (lettera invariata) | viste governate dagli stati; oltre la 14ª parte |
| `rg-part-mark` | **pastiglia** 20 px con la lettera | righe di tabella, elenchi, accanto al nome |
| `rg-part-mark--small` | pastiglia 16 px | dentro il percorso e la riga `__context` |
| `rg-part-label` | pastiglia + nome allineati | celle, voci di elenco |
| `rg-part-edge` | **filetto** a sinistra (4 px) | `rg-page-header` della parte o della fase, una card della parte |

### Assegnazione

La piattaforma passa **l'indice della parte nel prodotto**, 1-based, in ordine stabile
(`ORDER BY ordine, id`). Il DS decide colore e segno:

| Indice | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Lettera | A | B | C | D | E | F | G |
| Colore | nero | blu (`category-2`) | sabbia (`-6`) | salvia (`-7`) | verde (`-5`) | ocra (`-4`) | rosso (`-3`) |
| Forma | piena | piena | piena | piena | piena | piena | piena |

| Indice | 8–14 | 15 e oltre |
| --- | --- | --- |
| Lettera | H … N | O, P, … (`upper-alpha`) |
| Colore | ricomincia da nero | grigio |
| Forma | **vuota** (contorno colorato, fondo bianco), filetto **tratteggiato** | `rg-part--quiet` con `style="--rg-part: 15"` |

## Uso e limiti

- **Mai da sola.** La pastiglia è `aria-hidden="true"` e sta **accanto al nome scritto**, che è
  testo nel markup. Il filetto sta sempre in un blocco che contiene anche la pastiglia.
- **Il segno non cromatico è la lettera**, generata dal DS dall'indice. Regge la scala di grigi e la
  fotocopia. La lettera è **d'ordine**, non l'iniziale del nome: la A può essere il DIETRO, se il
  DIETRO è la prima parte. Si usano lettere e non numeri perché i numeri, in un quadratino, sono già
  le fasi (`rg-step__num`).
- **Più di 7 parti.** La palette si ferma a sette (§4): dall'ottava il colore si ripete e il segno in
  più è la **forma** (pastiglia vuota, filetto tratteggiato), oltre alla lettera, che resta unica.
  Dalla quindicesima il colore non distingue più niente e si passa al grigio, con la sola lettera.
- **Convivenza con gli stati.** `category-3/4/5` sono `danger`, `warning` e `success`. Tre difese:
  1. **l'ordine**: le prime quattro parti, cioè quasi tutti i prodotti, non usano mai quei tre
     colori;
  2. **la forma**: la pastiglia è un quadrato pieno con una lettera, il badge di stato una pillola
     bianca con un pallino e il testo dentro, l'alert un blocco con un titolo. Un rosso con la «G»
     non si scambia per «non risolto»;
  3. **il grigio dove gli stati governano**: nelle viste di revisione e di anomalie, o in una tabella
     dove i badge di stato sono il soggetto, si usa `rg-part--quiet`. Lettera e nome restano.
- **Non è un badge e non è uno stato.** Non si mette in `rg-page-header__status`, non cambia con il
  ciclo di vita della parte, non è cliccabile.
- **Stampa**: il colore esce (il DS forza `print-color-adjust`), la lettera regge da sola.

## Struttura

Cella della tabella delle parti (`loop.index` è l'indice 1-based):

```html
<td>
  <span class="rg-part-label">
    <span class="rg-part-mark rg-part--3" aria-hidden="true"></span>
    <a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a>
  </span>
</td>
```

```jinja
{% set identita = 'rg-part--' ~ loop.index if loop.index <= 14 else 'rg-part--quiet' %}
<span class="{{ 'rg-part-mark ' ~ identita }}" aria-hidden="true"{% if loop.index > 14 %} style="--rg-part: {{ loop.index }}"{% endif %}></span>
```

Testata della pagina della fase: filetto sulla testata, pastiglia piccola nel percorso e nel
contesto. L'identità sta sulla testata e le pastiglie la ereditano.

```html
<header class="rg-page-header rg-part-edge rg-part--3">
  <nav class="rg-breadcrumb" aria-label="Percorso">
    <ol>
      <li><a href="/">Prodotti</a></li>
      <li><a href="/products/12">BOOK TOTE</a></li>
      <li><span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a></li>
      <li><span class="rg-breadcrumb__current" aria-current="page">Ricamo normale</span></li>
    </ol>
  </nav>
  <div class="rg-page-header__main">
    <div class="rg-page-header__heading">
      <p class="rg-page-header__context">Fase della parte <span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><strong>1296 DAV RIW OBLIQUE - GRIS</strong> · <strong>BOOK TOTE</strong></p>
      <h1 class="rg-page-header__title">Ricamo normale</h1>
    </div>
  </div>
</header>
```

La pastiglia nel percorso sta **prima** del link e fuori da esso: dentro il link erediterebbe la
sottolineatura.
