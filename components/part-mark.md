# Part mark (identità delle parti)

## Scopo

Distinguere a colpo d'occhio le **parti sorelle** di un prodotto (DAVANTI, DIETRO, LATO, FONDO,
MANICO…) nelle viste dove compaiono insieme o si passa dall'una all'altra: la tabella delle parti, la
testata della pagina della parte e della fase, il percorso. Una parte ha un'identità fissa per tutta
la vita del prodotto: lo stesso numero e lo stesso colore in ogni pagina.

Seconda applicazione della palette categoriale (`--rg-color-category-1…7`) dopo
[`rg-dept-band`](dept-band.md). Regola generale in [design-rules §4](../design-rules.md#identità-delle-parti-dalla-1170).

### Numeri, non lettere (dalla quarta tappa 1.17.0)

La prima forma usava le lettere (A, B, C…) per non confondersi col numero di fase. Il giudizio di chi
la usa: *«non sono convinto delle lettere per le parti, preferirei i numeri anche se so che poi vanno
in conflitto con i numeri delle fasi»*. La lettera era arbitraria due volte — non è l'iniziale del
nome, e in reparto nessuno dice «la parte B» — quindi il conflitto si risolve **sulla forma**, non
rinunciando al numero:

| | Parte | Fase |
| --- | --- | --- |
| Figura | **tonda** | **quadrata** |
| Misura | 20 px (16 nel percorso) | 32 px |
| Colore | categoriale, uno per parte | nero pieno, sempre |
| Parola accanto | «Parte», dove c'è spazio | «Fase N di M» |
| Classi | `rg-part-mark` | `rg-step__num`, `rg-phase-panel__num`, `rg-phase-switch__num` |

Tre differenze insieme, più la parola scritta. È il caso peggiore a decidere: nella pagina della fase
la pastiglia della parte sta nel percorso e nella riga d'identità, e il quadrato della fase sta nella
testa del blocco, pochi centimetri sotto.

## Varianti

| Classe | Forma | Dove |
| --- | --- | --- |
| `rg-part--1` … `rg-part--14` | **identità**: colore e numero; su un elemento o su un antenato | ovunque |
| `rg-part--quiet` | la stessa identità in grigio (numero invariato) | viste governate dagli stati; oltre la 14ª parte |
| `rg-part-mark` | **pastiglia tonda** 20 px col numero | righe di tabella, elenchi, riga d'identità della testata |
| `rg-part-mark--small` | pastiglia 16 px | dentro il percorso |
| `rg-part-label` | pastiglia + nome allineati | celle, voci di elenco |
| `rg-part-edge` | **filetto** a sinistra (4 px) | `rg-page-header` della parte o della fase, una card della parte |

### Assegnazione

La piattaforma passa **l'indice della parte nel prodotto**, 1-based, in ordine stabile
(`ORDER BY ordine, id`). Il DS decide colore e forma:

| Indice | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Numero | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| Colore | nero | blu (`category-2`) | sabbia (`-6`) | salvia (`-7`) | verde (`-5`) | ocra (`-4`) | rosso (`-3`) |
| Forma | piena | piena | piena | piena | piena | piena | piena |

| Indice | 8–14 | 15 e oltre |
| --- | --- | --- |
| Numero | 8 … 14 | 15, 16, … |
| Colore | ricomincia da nero | grigio |
| Forma | **vuota** (contorno colorato, fondo bianco), filetto **tratteggiato** | `rg-part--quiet` con `style="--rg-part: 15"` |

## Uso e limiti

- **Mai da sola.** La pastiglia è `aria-hidden="true"` e sta **accanto al nome scritto**, che è testo
  nel markup. Il filetto sta sempre in un blocco che contiene anche la pastiglia.
- **Il segno non cromatico è il numero**, generato dal DS dall'indice: regge la scala di grigi e la
  fotocopia. È un numero **d'ordine**, non un codice: la parte 1 è la prima della sequenza.
- **La parola «Parte» accanto al numero** dove c'è spazio (riga d'identità della testata, legenda).
  Nelle righe di tabella basta la colonna, che si chiama «Parte».
- **Più di 7 parti.** La palette si ferma a sette (§4): dall'ottava il colore si ripete e il segno in
  più è la **forma** (pastiglia vuota, filetto tratteggiato). Dalla quindicesima il colore non
  distingue più niente e si passa al grigio, col solo numero.
- **Convivenza col numero di fase**: figura, misura e colore diversi (tabella sopra). Una pastiglia
  tonda colorata e un quadrato nero non si scambiano; il quadrato è sempre nella testa di un blocco
  che dice «Fase N di M».
- **Convivenza con gli stati.** `category-3/4/5` sono `danger`, `warning` e `success`. Tre difese:
  1. **l'ordine**: le prime quattro parti, cioè quasi tutti i prodotti, non usano mai quei tre colori;
  2. **la forma**: la pastiglia è tonda e piena col numero, il badge di stato è una pillola bianca con
     un pallino e il testo dentro, l'alert è un blocco con un titolo;
  3. **il grigio dove gli stati governano** (`rg-part--quiet`): nelle viste di revisione e di anomalie.
- **Non è un badge e non è uno stato.** Non si mette in `rg-page-header__status`, non cambia con il
  ciclo di vita della parte, non è cliccabile.
- **Stampa**: il colore esce (il DS forza `print-color-adjust`), il numero regge da solo.

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

Testata della pagina della fase: filetto sulla testata, pastiglia piccola nel percorso e pastiglia
piena nella riga d'identità. L'identità sta sulla testata e le pastiglie la ereditano.

```html
<header class="rg-page-header rg-page-header--compact rg-part-edge rg-part--3">
  <nav class="rg-breadcrumb" aria-label="Percorso">
    <ol>
      <li><a href="/">Prodotti</a></li>
      <li><a href="/products/12">BOOK TOTE</a></li>
      <li><span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a></li>
      <li><span class="rg-breadcrumb__current" aria-current="page">Ricamo normale</span></li>
    </ol>
  </nav>
  <div class="rg-page-header__identity">
    <p class="rg-page-header__subject">
      <span class="rg-part-mark" aria-hidden="true"></span>
      <span class="rg-page-header__subject-kind">Parte</span>
      <strong>1296 DAV RIW OBLIQUE - GRIS</strong>
    </p>
    <dl class="rg-key-value rg-key-value--inline">
      <div class="rg-key-value__pair"><dt>RG</dt><dd class="rg-mono">RG20260140-P</dd></div>
      <div class="rg-key-value__pair"><dt>Cod.</dt><dd class="rg-mono">M1424EFI</dd></div>
    </dl>
  </div>
</header>
```

La pastiglia nel percorso sta **prima** del link e fuori da esso: dentro il link erediterebbe la
sottolineatura.

## Migrazione dalle lettere (terza → quarta tappa)

Nessun cambio di markup: le stesse classi `rg-part--N` producono ora il numero al posto della
lettera, e la pastiglia è tonda invece che quadrata. Chi aveva scritto «parte A» in un testo fisso lo
aggiorna a mano.
