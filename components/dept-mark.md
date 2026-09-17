# Dept mark (segno del reparto)

## Scopo

La tessera da 20&nbsp;px che **nomina un reparto in linea**: davanti al titolo di una linguetta di
fase, in testa alla riga «Fase N di M» del blocco della fase, in un elenco, in una legenda. È la
[banda di reparto](dept-band.md) ridotta a un segno: stessa famiglia di figura, stessa palette, stessa
regola «mai il solo colore».

Nasce da una prova a schermo sulla pagina di una fase. La fascia `rg-phase-panel__band`, grigia e alta
48&nbsp;px, stava subito sotto le linguette `rg-phase-switch`: **si leggeva come il bordo delle
linguette, non come «reparto»**, e il nome del reparto era già scritto sulla linguetta. Decisione:

- **a schermo** la fascia sopra il blocco della fase si toglie; il nome del reparto va nella riga
  `__kind` come primo elemento, con la tessera davanti, e sulla linguetta resta la sola tessera;
- **sul foglio stampato** (`rg-worksheet-block`) la banda resta com'è: lì il colore e la trama a
  tutta larghezza servono a pescare il foglio dal mucchio.

**Proposta 1.21.0.** Provata la 1.20.0, il reparto in testa a `__kind` era *«tutto attaccato reparto e
fase»*, e le linguette avevano *«troppe info»*. Il reparto passa in **una riga sua** in cima al blocco
della fase ([`rg-phase-panel__department`](phase-switch.md#il-reparto-in-una-riga-sua-e-la-linguetta-essenziale-proposta-1210)),
sempre con la parola **«Reparto»** davanti; **la linguetta non porta più la tessera**. Le due forme
1.20.0 (tessera sola sulla linguetta, `rg-dept-label` in `__kind`) sono superate; la tessera resta per
la riga del reparto, gli elenchi e le legende.

## Varianti

### Le sette riduzioni

La trama della banda **scalata** a 20&nbsp;px non regge: le croci del ricamo hanno passo 24 e non ci
stanno nemmeno una volta, la fila di piastre della pressatura diventa una riga grigia, i due registri
della stampa si impastano. Ogni reparto ha quindi la sua **riduzione**: il segno della banda preso una
volta, o nel numero minimo che ne dice ancora la famiglia. Le famiglie restano sette e restano diverse.

| Variante | Reparto | Figura nella banda | Riduzione nella tessera |
| --- | --- | --- | --- |
| `rg-dept-mark--ricamo` | Campionario Ricamo | fila di croci | **una croce** da 12, tratto 2 |
| `rg-dept-mark--stampa` | Stampa, Laser e HF | gocce e raggi alternati sopra, due linee sotto | **una goccia** da 8 e **un raggio** 2×8 sopra, **due linee** sotto |
| `rg-dept-mark--pressatura` | Pressatura e soffiatura | fila di piastre sopra e sotto, filo in mezzo | **due piastre** 6×4 sopra e due sotto, in colonna, **filo** da bordo a bordo |
| `rg-dept-mark--strass` | Strass e applicazioni | pois da 8, passo 16 | **quattro pois** da 6, uno per quadrante |
| `rg-dept-mark--finissaggio` | Finissaggio e Controllo Qualità | scacchiera da 8 | **scacchiera 3×3** da 6 |
| `rg-dept-mark--incollature` | Incollature | diagonali da 8, passo 16 | **diagonali** da 4, passo 8 |
| `rg-dept-mark--accoppiaggi` | Accoppiaggi | coppie di linee verticali | **una coppia** di linee 2×12, luce 2, staccata dal bordo |
| *(nessuna variante)* | **Reparto da assegnare** | banda senza trama | **tessera vuota, bordo tratteggiato** |

| Modificatore | Quando |
| --- | --- |
| `rg-dept-mark--quiet` | **A schermo, sempre.** La figura e il bordo prendono il colore del **testo intorno** (`currentColor`). Vale anche per «da assegnare». |

**Perché `--quiet` usa il colore del testo e non il grigio della banda.** La banda sobria usa
`neutral-400`: su 48&nbsp;px di trama basta. Su una tessera da 20&nbsp;px con segni da 2&nbsp;px quel
grigio (~2,8:1 sul bianco) non regge. Il colore del testo regge quanto il testo che la tessera
accompagna: grigio secondario sulla linguetta non scelta, nero sulla scelta e in hover, grigio scuro
d'etichetta nella riga `__kind`. Nessun colore di reparto accanto ai badge di stato, per la stessa
ragione della banda: `category-3/4/5` sono `danger`, `warning` e `success`.

**I colori pieni** (le sette varianti senza `--quiet`) servono dove non convivono stati: una legenda
stampata, un documento. Sul `sabbia` e sul `salvia` (accoppiaggi, incollature) il segno è chiaro:
reggono la forma, non il tono.

### Le coppie da tenere d'occhio a questa misura

- **Pois e scacchiera**: a 20&nbsp;px tondi e quadretti si avvicinano. Si separano per **numero e
  disposizione**: quattro tondi staccati su bianco contro nove quadretti sfalsati che si toccano agli
  angoli.
- **Ricamo e incollature**: due diagonali. La croce è **una**, sottile e isolata al centro; le
  incollature sono **diagonali parallele spesse** che riempiono la tessera.
- **Accoppiaggi**: la prima riduzione erano due barre piene da 4 alte quanto la tessera. Saldate al
  bordo si leggevano quattro barre; staccate e piene sono il simbolo «pausa». Due linee sottili e
  vicine sono i due strati uniti.

## Uso e limiti

**La tessera non porta il nome: lo porta il markup.** Due forme soltanto:

- **tessera + nome scritto** (`rg-dept-label`): la tessera è `aria-hidden="true"`, il nome è testo;
- **tessera sola**, dove il nome è già vicino in altra forma (la linguetta): la tessera ha
  `role="img"` e `aria-label="Reparto: <nome>"`, più `title` per chi usa il puntatore.

Mai tessera sola e muta. Il nome è quello del reparto («Pressatura e soffiatura»), non lo slug della
variante.

**La parola «Reparto» davanti al nome** (proposta 1.21.0): `rg-dept-label__kind`, etichetta maiuscola
a 12&nbsp;px nel colore d'etichetta, seguita da uno spazio vero. Si legge «Reparto Ricamo», «Reparto
Pressatura e soffiatura», «Reparto da assegnare», e si usa **ovunque** il reparto sia nominato in linea.
Non va nel `aria-label` della tessera sola (che dice già «Reparto: …»). Sulla banda stampata il testo
è quello che passa l'applicazione in `rg-dept-band__name`: per coerenza, lo stesso «Reparto …».

**Non alza la riga.** La tessera è 20&nbsp;px e le righe da 12 e 14&nbsp;px del DS sono alte ~17: dentro
`rg-dept-label` e dentro `rg-phase-switch__title` sporge di 2&nbsp;px sopra e sotto con un margine
negativo. Il numero della fase resta sul filo del titolo.

**Non è una banda e non la sostituisce su carta.** Sul foglio stampato resta `rg-dept-band` a colori:
la tessera è troppo piccola per essere trovata in un mucchio di fogli. In stampa, se c'è, arriva con
le sue campiture (`print-color-adjust` in `rg-utilities.css`).

**Non è un badge, non è un'icona, non è interattiva.** Non ha stati propri: cambia colore solo perché
cambia il testo intorno. Non va dentro `rg-icon-button`, e non si usa per filtrare.

**Non è la pastiglia della parte.** La parte è un **tondo** colorato col numero
([part-mark](part-mark.md)), la fase un **quadrato nero** col numero, il reparto una **tessera
quadrata con una figura e nessun numero**. Tre forme, tre contenuti.

**Una figura nuova** (un ottavo reparto) si disegna due volte: la trama della banda e la sua
riduzione. Le misure vengono dalla scala (4, 8, 12, 16, e i filetti 1 e 2), la figura sta nell'area
interna da 18&nbsp;px e non tocca il bordo, salvo un segno continuo per disegno (il filo della
pressatura). Le variabili sono `--rg-dept-mark-color`, `-pattern`, `-size`, `-position`, `-repeat`,
`-edge`: non `--rg-dept-*`, perché le variabili si ereditano e una tessera dentro una banda ne
prenderebbe la trama.

## Struttura

Tessera, «Reparto» e nome, ovunque serva nominare un reparto in linea (proposta 1.21.0):

```html
<span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Pressatura e soffiatura</span>
```

Reparto da assegnare:

```html
<span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> da assegnare</span>
```

**Nel blocco della fase**, la riga sua (proposta 1.21.0), primo figlio del blocco:

```html
<p class="rg-phase-panel__department"><span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--ricamo rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Ricamo</span></p>
```

**Superato dalla proposta 1.21.0 — sulla linguetta di una fase**, davanti al titolo (tessera sola, col
nome per le tecnologie assistive). La linguetta ora porta solo numero, titolo e conteggio:

```html
<button class="rg-phase-switch__item rg-phase-switch__item--principal" type="button" role="tab" aria-selected="true" …>
  <span class="rg-phase-switch__num">2</span>
  <span class="rg-phase-switch__text">
    <span class="rg-phase-switch__role">Principale</span>
    <span class="rg-phase-switch__title"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" role="img" aria-label="Reparto: Pressatura e soffiatura" title="Pressatura e soffiatura"></span>Pressatura</span>
  </span>
  <span class="rg-phase-switch__aside">…</span>
</button>
```

**Superato dalla proposta 1.21.0 — in testa alla riga `__kind`** del blocco della fase: *«tutto
attaccato reparto e fase»*. Il reparto va in `rg-phase-panel__department`, sopra. Vedi
[phase-switch](phase-switch.md#il-reparto-senza-fascia-1200).

```html
<p class="rg-phase-panel__kind">
  <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span>Pressatura e soffiatura</span>
  <span>Fase 2 di 6</span>
  <span>Rimozione garze · con la 3</span>
</p>
```
