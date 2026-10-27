# Il PDF incorporato (`rg-pdf-frame`) — proposta 1.52.0

> La pagina «Schede di reparto» diventa una pagina di stampa: in cima la barra, sotto il PDF vero
> del fascicolo. — Lorenzo, 2026-10-27

## Scopo

Il contenitore di un **PDF vero incorporato** in una pagina di stampa, dentro un `<iframe>` dello
stesso sito. Il documento che si vede è il documento che si stampa: il bottone primario della barra
chiama `iframe.contentWindow.print()` e stampa il PDF, non la pagina che lo contiene.

È la controparte di [`rg-u-screen-a4`](screen-a4.md) quando il documento non è HTML ma un PDF già
impaginato: stessa colonna, stesso fondo, stesso filetto. La barra sopra resta
`rg-u-no-print rg-u-screen-a4-bar`.

## Varianti

| Classe | Cosa |
| --- | --- |
| `rg-pdf-frame` | **Il PDF è pronto**: si vede l'iframe, attesa ed errore sono nascosti. |
| `rg-pdf-frame--loading` | **Attesa**: si vede `__wait` al centro del riquadro; l'iframe resta impaginato ma invisibile. |
| `rg-pdf-frame--error` | **Errore**: si vede `__error`; l'iframe esce dall'impaginazione e il riquadro si stringe sull'avviso. |

| Elemento | Su | Ruolo |
| --- | --- | --- |
| `rg-pdf-frame__doc` | `<iframe>` con `title` | il PDF |
| `rg-pdf-frame__wait` | `rg-empty`, `role="status"`, `aria-busy="true"` | «Sto preparando le schede» |
| `rg-pdf-frame__error` | `rg-alert rg-alert--error`, `role="alert"` | cosa è andato storto e cosa fare |

**Tre stati, una classe.** I tre figli stanno sempre nel DOM; la pagina cambia soltanto il
modificatore del contenitore: parte con `--loading`, al `load` dell'iframe lo toglie, se qualcosa
va storto lo sostituisce con `--error`.

## Uso e limiti

**Larghezza: quella del foglio a schermo.** `max-width: calc(210mm + 2 × hairline)`, centrato, come
`rg-u-screen-a4`: il filetto sta fuori dai 210 mm e il bordo sinistro del riquadro cade un filetto
prima del filo della barra, esattamente come quello del foglio. Sotto quella larghezza si restringe e
basta (`width: 100%`, `border-box`): **a 375 px il riquadro è largo 375, nessuno scorrimento
orizzontale**.

**Altezza: la finestra meno la barra, mai meno di 60vh.**
`height: max(60dvh, calc(100dvh - var(--rg-pdf-frame-offset)))`, con il ripiego in `vh` per chi
non conosce `dvh`. Quanto è alta la barra lo sa la pagina, non il DS: `--rg-pdf-frame-offset` è una
**manopola del componente**, non un token. Il default è `--rg-layout-header` + 192 px (testata
dell'app e una barra con bottoni e una fila di caselle). Se la barra della pagina è più alta o più
bassa, la pagina lo dice **in un suo foglio di stile**, su un selettore suo:

```css
.app-schede .rg-pdf-frame { --rg-pdf-frame-offset: calc(var(--rg-layout-header) + var(--rg-space-24) * 2 + var(--rg-space-12)); }
```

**In attesa l'iframe resta impaginato, solo invisibile** (`visibility: hidden`, non
`display: none`): il visore PDF del browser si inizializza e l'evento `load` arriva anche mentre a
schermo si legge «Sto preparando le schede». I figli stanno tutti nella stessa cella della griglia:
l'attesa sta **sopra** l'iframe e il riquadro non cambia misura quando il PDF arriva. Un iframe
invisibile non prende il fuoco.

**L'attesa può durare 20–30 secondi**: per questo `__wait` porta un cerchio sottile che gira (lo
stesso del messaggio in attesa della conversazione, `rg-chat-spin`). Trenta secondi di testo fermo
sembrano una pagina bloccata. Con `prefers-reduced-motion` il cerchio sta fermo e resta la frase,
che è il segnale vero. Il bottone «Stampa le schede», finché il PDF non c'è, è `disabled` e la
ragione è scritta lì accanto, nel riquadro.

**In errore il riquadro si stringe** sull'avviso (`height: auto`, 24 px di respiro, 16 sotto i
680 px): un 80% di finestra vuoto attorno a tre righe direbbe «manca qualcosa». L'avviso dice
**che cosa** non è riuscito e **che cosa fare** (riprovare, avvisare): «Errore» da solo non basta.
`role="alert"` fa leggere l'avviso quando compare; perché sia letto con certezza in tutti gli
screen reader la pagina **scrive il messaggio** nel momento in cui passa a `--error`, invece di
lasciarlo scritto da prima.

**In stampa non esiste** (`display: none`): si stampa il PDF dall'iframe, e la pagina che lo
contiene non ha niente da dare alla carta. Con la barra `rg-u-no-print`, un Ctrl+P sulla pagina
esce bianco; il bottone primario è l'unica via giusta, ed è quella che la pagina mostra.

**Sul telefono il PDF incorporato può non vedersi.** Chrome per Android non disegna un PDF dentro un
iframe e Safari su iOS ne mostra solo la prima pagina: è il browser, non il CSS. Il riquadro resta
largo quanto lo schermo e non scorre di lato, ma se la pagina deve servire anche lì, la barra porta
un collegamento «Apri il PDF» all'indirizzo dello stesso documento.

**Lo stesso sito, sempre.** `contentWindow.print()` su un iframe di un altro dominio è bloccato dal
browser. Se il PDF arriva da un `fetch` (per sapere davvero se è un PDF prima di mostrarlo), l'iframe
può puntare a un `blob:` della stessa pagina.

**Non è un visore.** Niente barra di pagine, niente zoom del DS: quelli sono del browser, dentro
l'iframe. Il riquadro dice solo dove sta il documento e in che stato è.

## Misure

Misurate in Chrome (headless, gli stessi CSS del DS), barra con due bottoni e una fila di tre
caselle (alta 133 px a 1920, 167 a 375):

| Finestra | Riquadro | Iframe | Note |
| --- | --- | --- | --- |
| 1904 × 985 | 795,69 × 729 | 793,69 × 727 | 985 − 256; barra a x 555,16, riquadro a 554,16 (un filetto prima, come il foglio) |
| 375 × 667 | 375 × 411 | 373 × 409 | `scrollWidth` = `clientWidth` = 375 |
| 375 × 667, `--error` | 375 × 144 | — | avviso 341 px, 16 di respiro |
| 500 × 572 | 500 × 343 | — | 60vh: la regola minima vince |

## Struttura

La pagina di stampa completa: barra, riquadro nei suoi tre figli.

```html
<form class="rg-u-no-print rg-u-screen-a4-bar rg-u-mb-4" method="get" action="…">
  <div class="rg-cluster">
    <button class="rg-button rg-button--primary" type="button" id="stampa" disabled>Stampa le schede</button>
    <a class="rg-button rg-button--ghost" href="…">Torna al prodotto</a>
  </div>
  <fieldset class="rg-form-row__group rg-u-mt-4">
    <legend class="rg-form-row__legend">Schede da stampare</legend>
    <div class="rg-cluster">
      <label class="rg-choice"><input type="checkbox" name="reparto" value="ricamo" checked> Ricamo</label>
      <label class="rg-choice"><input type="checkbox" name="reparto" value="pressatura" checked> Pressatura e soffiatura</label>
      <label class="rg-choice"><input type="checkbox" name="reparto" value="laser" checked> Taglio laser</label>
    </div>
  </fieldset>
</form>

<div class="rg-pdf-frame rg-pdf-frame--loading" id="schede">
  <iframe class="rg-pdf-frame__doc" src="…/schede.pdf" title="Schede di reparto (PDF)"></iframe>
  <div class="rg-pdf-frame__wait rg-empty" role="status" aria-busy="true">
    <h3>Sto preparando le schede</h3>
    <p>Può volerci mezzo minuto.</p>
  </div>
  <div class="rg-pdf-frame__error rg-alert rg-alert--error" role="alert">
    <div>
      <p class="rg-alert__title">Le schede non si sono preparate</p>
      <p class="rg-alert__message">Riprova fra un momento; se si ripete, avvisa l’amministratore.</p>
    </div>
  </div>
</div>
```

Il controller minimo: una classe sul contenitore, e il bottone che si accende col PDF.

```js
const riquadro = document.getElementById('schede');
const pdf = riquadro.querySelector('.rg-pdf-frame__doc');
const stampa = document.getElementById('stampa');
pdf.addEventListener('load', () => {
  riquadro.classList.remove('rg-pdf-frame--loading');
  stampa.disabled = false;
});
// in caso di errore (fetch fallito, risposta che non è un PDF):
// riquadro.classList.replace('rg-pdf-frame--loading', 'rg-pdf-frame--error');
stampa.addEventListener('click', () => pdf.contentWindow.print());
```

Non usare `loading="lazy"` sull'iframe: il PDF deve partire subito, anche se è sotto la piega.
