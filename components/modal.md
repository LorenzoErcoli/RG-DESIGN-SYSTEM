# Modal / Dialog

## Scopo

Interrompere il flusso per una decisione o un input breve che richiede contesto isolato:
conferme, modifica di un singolo valore, scelta da un elenco. Non per contenuto lungo o per
navigazione: quelli restano nella pagina. Promosso da `rg-product-platform` (v0.3.0).

## Varianti

- **Standard** (`rg-modal`): larghezza media (480px).
- **Small** (`rg-modal--sm`): conferme secche (360px).
- **Large** (`rg-modal--lg`): form con più righe (640px).
- **Extra large** (`rg-modal--xl`): contenuti larghi da leggere a griglia (960px) — una
  tabella, un confronto affiancato di due colonne. È il tetto: 960px stanno sotto
  `--rg-layout-content-max` e, con il padding dello scrim, restano una finestra e non un
  takeover a schermo pieno anche su un laptop da 1024px. Oltre questa densità il contenuto
  non appartiene a un modal ma a una pagina.

## Uso e limiti

Un solo modal alla volta. Chiusura con `Esc`, click sul backdrop e pulsante `×`. Focus trappola
dentro il dialog e ritorno al trigger alla chiusura. Il backdrop è uno scrim (nero al 45%), non
una superficie: non collocarci contenuto. Azione primaria del footer a destra; l'azione
distruttiva separata da quella di conferma.

## Struttura

Backdrop → dialog (header con titolo + close → body → footer). Bordo 1 px nero, radius 4 px,
ombra `--rg-shadow-overlay` (unico caso di ombra ammesso, elemento sovrapposto).

```html
<div class="rg-modal-backdrop is-open" role="presentation">
  <div class="rg-modal rg-modal--sm" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <header class="rg-modal__header">
      <h2 class="rg-modal__title" id="m-title">Cambia divisione</h2>
      <button class="rg-modal__close" type="button" aria-label="Chiudi">×</button>
    </header>
    <div class="rg-modal__body">
      <p class="rg-modal__meta">RG-PRD-0248</p>
      <div class="rg-modal__row">
        <span class="rg-modal__row-label">Attuale</span>
        <span class="rg-modal__current">Alta moda</span>
      </div>
    </div>
    <footer class="rg-modal__footer">
      <button class="rg-button rg-button--ghost" type="button">Annulla</button>
      <button class="rg-button rg-button--primary" type="button">Conferma</button>
    </footer>
  </div>
</div>
```

Il backdrop usa `z-index: var(--rg-z-modal)`. `is-open` sul backdrop lo mostra
(`display: flex`); di default è nascosto.

## Ingrandire un'immagine dentro un modal

Un `rg-lightbox` aperto _dentro_ un modal gli sta **sopra**: da 1.8.0 il lightbox è su
`--rg-z-lightbox` (450), sopra il `--rg-z-modal` (400) e sotto i toast (`--rg-z-toast`, 500).
Non serve alcun `z-index` locale: la miniatura vive nel `rg-modal__body`, l'overlay unico
resta a fine pagina come sempre.

```html
<div class="rg-modal-backdrop is-open" role="presentation">
  <div class="rg-modal rg-modal--xl" role="dialog" aria-modal="true" aria-labelledby="m2-title">
    <header class="rg-modal__header">
      <h2 class="rg-modal__title" id="m2-title">Confronto costi — RG-PRD-0248</h2>
      <button class="rg-modal__close" type="button" aria-label="Chiudi">×</button>
    </header>
    <div class="rg-modal__body">
      <!-- contenuto largo: una tabella, un confronto affiancato -->
      <button class="rg-lightbox__thumb" type="button" aria-label="Ingrandisci: campione ricamo">
        <img src="campione.jpg" alt="Campione ricamo, rev. 04" width="96">
      </button>
    </div>
    <footer class="rg-modal__footer">
      <button class="rg-button rg-button--ghost" type="button">Chiudi</button>
      <button class="rg-button rg-button--primary" type="button">Applica</button>
    </footer>
  </div>
</div>

<!-- overlay unico, riusato: si apre SOPRA il modal, nessun z-index locale -->
<div class="rg-lightbox" role="dialog" aria-modal="true" aria-label="Immagine ingrandita" hidden>
  <img class="rg-lightbox__image" src="" alt="">
</div>
```

## Pattern canonico e convergenza del `<dialog>` nativo

`rg-modal-*` (backdrop scrim + dialog) è **il pattern unico** della modale RG. Convive nei
prodotti con qualche `<dialog>` nativo di prima data: quello è **deprecato come pattern** e va
fatto convergere su `rg-modal-*`. La ragione non è estetica ma di coerenza — focus-trap,
chiusura (`Esc` + scrim + `×`), z-layering con il lightbox, larghezze (`--sm`/`--lg`/`--xl`) e
tono visivo sono definiti una volta sola qui; un `<dialog>` nativo li reimplementa a mano e
diverge.

### Guida di migrazione (per il consumatore)

Chi ha un `<dialog>` nativo o un `<style>` locale che tampona il layering lo sostituisce così:

| Prima (app-local) | Dopo (DS) |
| --- | --- |
| `<dialog>` nativo + `::backdrop` | `<div class="rg-modal-backdrop is-open" role="presentation">` con dentro `<div class="rg-modal" role="dialog" aria-modal="true" aria-labelledby="…">` |
| `dialog[open]` / `showModal()` per aprire | classe `is-open` sul backdrop (`display:flex`); apertura/chiusura da JS che aggiunge/toglie `is-open` e sposta il focus |
| `::backdrop { background: … }` | lo scrim è già nel DS (nero 45%): rimuovere |
| larghezza a mano (`width`, `max-width` in `<style>` locale) | `rg-modal--sm` (360) · standard (480) · `rg-modal--lg` (640) · `rg-modal--xl` (960) |
| `<style>` locale che alza il lightbox sopra il dialog (`z-index` magico) | **rimuovere**: il lightbox è già su `--rg-z-lightbox` (450), sopra il modal |
| chiusura gestita solo con `Esc` nativo del `<dialog>` | mantenere `Esc` **e** click sullo scrim **e** `×` (`rg-modal__close`); focus-trap nel dialog e ritorno al trigger |

Il markup interno (`rg-modal__header/__title/__close/__body/__footer`) resta invariato tra le
larghezze: cambia solo la classe di variante sul `.rg-modal`.

### Contrasto delle label (v1.10.0)

Le micro-label della modale in corpo piccolo — `rg-modal__meta` (10px) e `rg-modal__row-label`
(12px) — usavano `--rg-color-text-secondary` (neutral-600). Su bianco quel grigio misura
**6,1:1** e supera tecnicamente WCAG AA, ma a 10px risultava esile («non si vede»). Ora usano il
token dedicato **`--rg-color-text-label`** (neutral-800, **~14,8:1**): stessa sobrietà, nessun
grassetto nuovo, solo un colore leggibile. Il titolo (`rg-modal__title`) e `rg-modal__current`
restano invariati. Il consumatore non deve più correggere questi colori in locale.
