# Proposal notice (avviso: proposte da decidere)

## Scopo

In cima alla **pagina del prodotto**, dice all'ufficio che il campionario ha proposto delle modifiche e **dove**:
un **numero grande** («3 proposte del campionario da decidere») e, per ogni fase con proposte, una **riga-link
grande** che ci porta dentro. Si usa col dito su iPad e telefono.

Nasce con la 1.30.0, al posto di un `rg-alert` col testo piccolo e un elenco puntato di collegamenti
(«TOMAIA-TG37 · fase 1 RICAMO — 1 proposta»).

## Varianti

Nessuna.

| Elemento | Cosa porta |
| --- | --- |
| `rg-proposal-notice__head` | Il numero e la frase. |
| `rg-proposal-notice__count` | Il **numero** delle proposte da decidere, 36 px, grassetto. `aria-hidden`: lo ripete il titolo, in testo nascosto. |
| `rg-proposal-notice__title` | «proposte del campionario da decidere» (`<h2>`). |
| `rg-proposal-notice__lead` | Dove: «In 2 fasi di 2 parti. Tocca una fase per decidere.» |
| `rg-proposal-notice__list` | Le righe (`<ul>`). |
| `rg-proposal-notice__row` | Una **riga-link** (`<a>`) per fase: alta almeno 56 px, bordo, freccia. |
| `rg-proposal-notice__part` | La **parte** con la sua pastiglia [`rg-part-mark`](part-mark.md). |
| `rg-proposal-notice__phase` | La **fase** («Fase 1 · Ricamo») e il **reparto** con il suo segno ([`rg-dept-label`](dept-mark.md), `--quiet`). |
| `rg-proposal-notice__go` | La freccia (`rg-icon-avanti`), a destra. |

Il conteggio della riga è `rg-badge rg-badge--review rg-badge--count` («2 proposte»).

## Uso e limiti

- **Solo se ci sono proposte da decidere.** Senza, l'avviso non c'è: niente «0 proposte».
- **Sul telefono** la riga va su due righe (parte sopra, fase e reparto sotto, conteggio e freccia a destra); **da
  681 px** in su, su una sola: parte · fase e reparto · conteggio · freccia.
- **L'intera riga è il collegamento**, con il focus visibile nero. Porta alla fase, all'ancora delle proposte
  (`#proposte`).
- **Il filetto sinistro è info**, come la proposta da decidere e `rg-badge--review`: è lo stesso stato. Il
  reparto è in grigio (`rg-dept-mark--quiet`) perché qui convive con i colori di stato (regole §4).
- **Il numero e le parole**: 1 proposta / 2 proposte, 1 fase / 2 fasi, li concorda l'app.
- Non è un `rg-alert`: non è un errore né un avviso di sistema, è un lavoro da fare.

## Struttura

```html
<section class="rg-proposal-notice" aria-labelledby="proposte-titolo">
  <header class="rg-proposal-notice__head">
    <span class="rg-proposal-notice__count" aria-hidden="true">3</span>
    <div>
      <h2 class="rg-proposal-notice__title" id="proposte-titolo"><span class="rg-u-visually-hidden">3 </span>proposte del campionario da decidere</h2>
      <p class="rg-proposal-notice__lead">In 2 fasi di 2 parti. Tocca una fase per decidere.</p>
    </div>
  </header>
  <ul class="rg-proposal-notice__list">
    <li>
      <a class="rg-proposal-notice__row" href="/prodotti/441/parti/1/fasi/1#proposte">
        <span class="rg-proposal-notice__part"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>TOMAIA-TG37</span>
        <span class="rg-proposal-notice__phase">Fase 1 · Ricamo <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--ricamo rg-dept-mark--quiet" aria-hidden="true"></span>Ricamo</span></span>
        <span class="rg-badge rg-badge--review rg-badge--count">2 proposte</span>
        <svg class="rg-icon rg-proposal-notice__go" aria-hidden="true" focusable="false"><use href="../icons/rg-icons.svg#rg-icon-avanti"></use></svg>
      </a>
    </li>
    <li>
      <a class="rg-proposal-notice__row" href="/prodotti/441/parti/2/fasi/2#proposte">
        <span class="rg-proposal-notice__part"><span class="rg-part-mark rg-part--2" aria-hidden="true"></span>DAVANTI</span>
        <span class="rg-proposal-notice__phase">Fase 2 · Pressatura <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span>Pressatura e soffiatura</span></span>
        <span class="rg-badge rg-badge--review rg-badge--count">1 proposta</span>
        <svg class="rg-icon rg-proposal-notice__go" aria-hidden="true" focusable="false"><use href="../icons/rg-icons.svg#rg-icon-avanti"></use></svg>
      </a>
    </li>
  </ul>
</section>
```
