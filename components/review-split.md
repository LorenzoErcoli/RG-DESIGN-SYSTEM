# Lo split di revisione a tutta altezza (`rg-review-split`) — proposta 1.57.0

> «Compila col PDF»: a sinistra la scheda macchina, a destra il modulo della scheda di ricamo, e si
> compila guardando il documento. — RG Product Suite, 2026-11-18

## Scopo

Il **«Desktop split view»** di [patterns/review.md](../patterns/review.md), che fino alla 1.56.0 era
una frase senza classi. Due colonne **sotto la testata di pagina** (`rg-page-header`), alte quanto
la finestra, che **scorrono ognuna da sola**:

- **sinistra, il documento** (`__source`): una testa ferma (`__head`, su una `rg-toolbar`: stato e
  bottoni) e sotto le pagine che scorrono (`__pages`) — di solito le pagine di
  [`rg-hotspots`](hotspots.md);
- **destra, il modulo** (`__form`, sul `<form>`): scorre da solo, e in fondo ha la
  [`rg-action-bar--sticky`](forms.md#barra-dazioni-ferma-in-fondo-rg-action-bar--sticky--1470), che si
  incolla al piede **della sua colonna**.

Non è [`rg-workspace`](../patterns/workspace.md): lì la tela di destra è pan/zoom con
`overflow: hidden`, qui niente pan/zoom e le pagine scorrono. Non è `rg-split-panel`, che è un
confronto breve e non scorre.

## Varianti

Nessun modificatore: un solo componente, due forme decise dalla **sua larghezza**.

| Larghezza del contenitore | Forma |
| --- | --- |
| **da 1136 px** (1200 di finestra dentro `rg-appshell`) | due colonne alte quanto la finestra, ognuna col suo scorrimento |
| **sotto 1136 px** | una colonna: il documento si nasconde, compare lo slot `__notice` (con un `rg-alert--info` della pagina), il modulo torna nel flusso e scorre con la pagina |

| Elemento | Su | Ruolo |
| --- | --- | --- |
| `rg-review-split` | `<div>` | il contenitore (è un *container* `rg-review-split`) |
| `rg-review-split__source` | `<section aria-label="…">` | la colonna del documento |
| `rg-review-split__head` | insieme a `rg-toolbar` | la testa ferma: stato a sinistra, bottoni a destra |
| `rg-review-split__status` | `<p role="status">` | lo stato in parole («2 stop scelti · aperto Stop 3») |
| `rg-review-split__pages` | `<div>` | le pagine che scorrono, 24 px di respiro |
| `rg-review-split__notice` | `<div>` | lo slot dell'avviso sotto soglia; dentro, un `rg-alert rg-alert--info` |
| `rg-review-split__form` | `<form>` | la colonna del modulo; ultimo figlio la `rg-action-bar rg-action-bar--sticky` |

## Uso e limiti

**L'altezza: la finestra meno le due testate, mai meno di 60dvh.**
`max(60dvh, calc(100dvh - var(--rg-review-split-offset, …)))`. Quanto sono alte la testata dell'app e
quella di pagina lo sa la pagina, non il DS: `--rg-review-split-offset` è una **manopola del
componente** (non un token), letta con un ripiego, quindi la pagina la imposta **su qualsiasi
antenato, nel suo foglio di stile**, senza `style=`. Il default è `--rg-layout-header` + 192 px
(come `rg-pdf-frame`): testata dell'app, padding del guscio e una testata di pagina di due righe.

```css
/* nel CSS della pagina, non nel DS */
.app-compila-pdf { --rg-review-split-offset: calc(var(--rg-layout-header) + var(--rg-space-24) * 2 - var(--rg-space-6)); }
```

Se l'offset è giusto, la finestra non scorre: scorrono solo le due colonne. Se è troppo piccolo la
pagina scorre di qualche pixel sotto le colonne; se è troppo grande resta un margine sotto.

**Le larghezze.** Documento da 440 px in su, modulo fra 640 e 880. Lo spazio in più va **a metà**
fra i due finché il modulo arriva a 880, poi tutto al documento: a 1136 sono 468 + 668, a 1376 (il
guscio standard pieno) 588 + 788. Se la pagina vuole il documento più grande allarga il guscio
(`--rg-appshell-max`, come `app-pagina-larga` nella piattaforma).

**La soglia è un `@container`, non un `@media`.** Sotto 1136 px *di larghezza propria* — 1200 di
finestra nel guscio `rg-appshell`, meno se la pagina ha una sidebar — il documento si nasconde e
compare lo slot `__notice`. Il componente è il container (`container-name: rg-review-split`): un
`@container` senza nome dentro il modulo (es. `rg-param-grid`) lo vede come contenitore più vicino,
e a queste larghezze non cambia niente.

**Lo slot dell'avviso** sta fra le due colonne nel DOM (dopo `__source`, prima di `__form`): sopra
soglia è `display: none`, sotto si vede sopra il modulo. Il testo lo scrive la pagina: che cosa manca
(il documento) e che cosa si può fare lo stesso (compilare il modulo). A 375 px nessuno scorrimento di
lato: il modulo è largo quanto lo schermo, il resto è responsabilità dei suoi campi.

**La barra al piede della colonna.** Lo sticky vale per il contenitore che scorre più vicino: in due
colonne è la colonna, in una colonna è il documento. La barra va da bordo a bordo della colonna (il
DS annulla il padding), resta in fondo anche se il modulo è corto, e non ha il filetto di sotto
(lo fa il bordo). **Il fuoco non finisce sotto la barra** (WCAG 2.4.11): lo `scroll-padding` sta sulla
colonna e legge `--rg-action-bar-clearance` come la regola di `:root`; in una colonna vale quella di
`:root`, già nel DS dalla 1.47.0.

**La testa ferma non scorre** perché sta fuori da `__pages`: è la prima riga di una griglia
`auto / 1fr`. Lo stato è un `role="status"` scritto in parole («2 stop scelti · aperto Stop 3»): è lì
che la pagina annuncia i cambi di scelta e lo stato delle pagine, perché dentro il `listbox` di
`rg-hotspots` un `role="status"` non è ammesso.

**I figli del modulo non si stringono** (`flex-shrink: 0`). La colonna è una flex a colonna con
altezza fissa: senza questa regola un figlio con `overflow` diverso da `visible` — una
`rg-disclosure--boxed` aperta, per esempio — avrebbe un'altezza minima automatica di 0 e verrebbe
schiacciato a 2 px invece di far scorrere la colonna. Il contenuto eccede e scorre, non si riduce.

**`overscroll-behavior: contain`** su tutte e due le colonne: la rotella arrivata in fondo a una
colonna non fa scorrere la pagina sotto.

**Superfici.** Documento sul fondo (`--rg-color-background`), pagine sollevate sopra; modulo sul
bianco. Bordo e divisione con `--rg-color-border-medium`. Dentro il modulo niente `rg-section-card`
(sarebbe un sollevato dentro un sollevato): sezioni aperte, `rg-stack` e titoli `rg-h3`.

**In stampa** il documento e l'avviso spariscono, il modulo torna nel flusso senza colonne.

## Misure

Chrome headless, la pagina `examples/rg-review-split.html` (guscio `rg-appshell`, testata di pagina
di due righe, offset di default):

| Finestra | Split | Documento | Modulo | Note |
| --- | --- | --- | --- | --- |
| 1600 × 900 | 1376 × 644 | 588 | 788 | la finestra non scorre |
| 1264 × 800 | 1200 × 544 | 500 | 700 | barra al piede della colonna |
| 1200 × 800 | 1136 × 544 | 468 | 668 | soglia: ancora due colonne |
| 1199 × 800 | 1135 | nascosto | 1135 | avviso visibile, barra al piede della finestra |
| 375 × 800 | 343 | nascosto | 343 | `scrollWidth` = `clientWidth` = 375 |

## Struttura

```html
<header class="rg-page-header">…</header>

<div class="rg-review-split">
  <section class="rg-review-split__source" aria-label="Scheda macchina">
    <div class="rg-toolbar rg-review-split__head">
      <p class="rg-review-split__status" role="status"><strong>2 stop scelti</strong> · aperto Stop 3</p>
      <div class="rg-cluster">
        <button class="rg-button rg-button--secondary rg-button--small" type="button">Scegli i vuoti</button>
        <button class="rg-button rg-button--ghost rg-button--small" type="button">Togli la scelta</button>
      </div>
    </div>
    <div class="rg-review-split__pages">
      <!-- le pagine: rg-hotspots (components/hotspots.md) -->
    </div>
  </section>

  <div class="rg-review-split__notice">
    <div class="rg-alert rg-alert--info" role="note">
      <div>
        <p class="rg-alert__title">Il PDF si vede su uno schermo largo</p>
        <p class="rg-alert__message">Sotto i 1200 px la scheda macchina non sta accanto al modulo: qui si compila il modulo da solo.</p>
      </div>
    </div>
  </div>

  <form class="rg-review-split__form" method="post" action="…" aria-label="Compilazione degli stop">
    <section class="rg-stack">
      <h2 class="rg-h3">Stop 3 · ago 2</h2>
      <!-- campi -->
    </section>
    <div class="rg-action-bar rg-action-bar--sticky">
      <span class="rg-small">Si salvano i 2 stop scelti</span>
      <div class="rg-cluster">
        <a class="rg-button rg-button--secondary" href="…">Annulla</a>
        <button class="rg-button rg-button--primary" type="submit">Salva 2 stop</button>
      </div>
    </div>
  </form>
</div>
```

Esempio completo, con il controller di riferimento dei riquadri: `examples/rg-review-split.html`.
