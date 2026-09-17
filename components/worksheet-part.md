# Worksheet part (testata di parte del fascicolo)

## Scopo

La testata che, nel **fascicolo stampato** di un prodotto, dice dove comincia una parte: una o due
righe — «Parte 1 di 4 · FONDO BORDATO», le sue lavorazioni in ordine, l'identità del prodotto — che
**aprono una pagina nuova** e lasciano scorrere sotto, sulla stessa pagina, i
[blocchi delle fasi](worksheet-block.md) di quella parte.

Nasce dal fascicolo compatto (proposta 1.23.0). Prima ogni parte apriva una pagina sua con l'indice
delle lavorazioni: una pagina quasi vuota per parte, quattro su COCOTTE. L'indice diventa una riga.

## Varianti

Nessuna. Il componente è uno.

| Elemento | Cosa porta |
| --- | --- |
| `rg-worksheet-part__title` | «Parte N di M · NOME», 20 px, peso di sezione. Davanti la pastiglia [`rg-part-mark`](part-mark.md) (`aria-hidden`), facoltativa. |
| `rg-worksheet-part__route` | Le lavorazioni della parte, in ordine: una `<ol>` vera, la freccia fra le voci è generata e muta. |
| `rg-worksheet-part__product` | Identità del prodotto: nome, codice, revisione. Mono, a destra. |

## Uso e limiti

**Apre la pagina, non la occupa.** In stampa (`rg-utilities.css`) ha `break-before: page` e
`break-after: avoid`: comincia sempre in cima a una facciata e non resta sola in fondo. Se è la prima cosa
che si stampa non apre una pagina vuota prima. Un `rg-worksheet-block--long` subito dopo **non** apre
un'altra pagina: la staccherebbe dalla sua parte.

**Livello di sezione, non di contenitore.** Il titolo ha il peso di sezione (700), il nome della fase nei
blocchi quello di contenitore (500) alla stessa misura: la parte ordina il fascicolo, la fase è ciò che
l'operatore cerca sul foglio. Il filetto nero spesso in alto separa la testata dai blocchi, che sono
riquadrati: la testata **non** è riquadrata, non è un foglio da staccare.

**L'identità prodotto c'è sempre.** Un foglio staccato dal fascicolo deve poter tornare al suo posto:
testata e `__meta` di ogni blocco la ripetono.

**Allineamento al recto.** Per il fronte/retro ogni parte dovrebbe cominciare su una facciata dispari.
Chrome non implementa `break-before: recto`: se serve, l'app inserisce prima della testata una
[`rg-blank-page`](blank-page.md).

**Limite.** `break-after: avoid` è un'indicazione, non un vincolo: se il primo blocco della parte non entra
nello spazio che resta, il motore può lasciare la testata sola. Con la testata che apre sempre la pagina
succede solo se il primo blocco è più alto di una pagina, cioè un `--long` da spezzare a monte.

**Non è a schermo.** A schermo la parte si legge con [`rg-page-header`](page-header.md) e la sua identità.

## Struttura

```html
<header class="rg-worksheet-part">
  <h2 class="rg-worksheet-part__title"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</h2>
  <ol class="rg-worksheet-part__route" aria-label="Lavorazioni della parte">
    <li>Ricamo</li>
    <li>Pressatura</li>
    <li>Sabbiatura</li>
  </ol>
  <p class="rg-worksheet-part__product">COCOTTE · RG-2026-0481 · rev. 04</p>
</header>
<section class="rg-worksheet-block rg-worksheet-block--compact">…</section>
<section class="rg-worksheet-block rg-worksheet-block--compact">…</section>
```
