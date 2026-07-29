# Section card (keystone del tab)

## Scopo

Il **blocco base di ogni tab**: un contenitore-card che avvolge il corpo del tab con un
**header rigato** (etichetta + didascalia opzionale) e confini netti. È la _keystone_ del
layout canonico della fase: ogni tab (Impostazioni, Consumi, Materiali…) è una
`rg-section-card`, così tutte le teste dei tab sono **un solo canone** e non tante teste
diverse.

L'**header di tab** è la testa di questo keystone (`rg-section-card__header`): **titolo + una
riga di didascalia + al più UNA azione primaria a destra** (`rg-button--primary`). Il filetto
sotto l'header separa testa e corpo — idioma a linee, non ombre.

### Perché un componente nuovo e non uno esistente

- `rg-card` è la **tessera-entità** di una griglia (ha `height: 100%`, hover che cambia bordo,
  eyebrow mono, nessun filetto sotto l'header): riusarla come keystone di tab significherebbe
  combattere i suoi default. Non è questo.
- `rg-section` + `rg-section-header` sono **layout di pagina** (un separatore a filetto in cima
  e una testa flessibile), non un contenitore-card che avvolge il corpo di un tab.
- `rg-disclosure--boxed` è una **sezione riquadrata richiudibile**: la testa di un tab è invece
  **fissa e sempre presente**, non un trigger che apre/chiude.

Nessuno dei tre offre "contenitore-card + header con filetto sotto + una sola azione". Poiché il
blocco ricorre in ogni tab di più prodotti (§12 delle regole), è un componente proprio.

## Varianti

- **Standard**: corpo con padding proprio (`rg-section-card__body`), per form e contenuto
  editoriale.
- **`rg-section-card--flush`**: corpo senza padding, per un tab il cui corpo **è** una tabella
  o una lista rigata che deve arrivare ai bordi della card; i filetti interni proseguono quelli
  della card.

## Uso e limiti

- **Una sola azione primaria** nell'header (`rg-button--primary`). Le azioni secondarie/di
  supporto vanno nel corpo o in una `rg-action-bar` a piè del form, non affiancate come seconda
  primaria. La regola è di composizione: il CSS non la impone, la doc e la vetrina sì.
- La didascalia (`__subtitle`) è **opzionale** e resta una riga: descrive cosa fa il tab o
  quando le modifiche hanno effetto, non è un paragrafo.
- Il titolo è una **label identitaria** di tab (font identity, size `lg`), non un H1 di pagina:
  la pagina ha già la sua testata sopra i tab.
- Non annidare una `rg-section-card` dentro un'altra: per sotto-sezioni interne usare
  `rg-disclosure--boxed` o separatori.

## Struttura

```html
<section class="rg-section-card">
  <header class="rg-section-card__header">
    <div class="rg-section-card__heading">
      <h2 class="rg-section-card__title">Impostazioni</h2>
      <p class="rg-section-card__subtitle">Parametri della fase, applicati al salvataggio.</p>
    </div>
    <div class="rg-section-card__actions">
      <button class="rg-button rg-button--primary" type="button">Salva</button>
    </div>
  </header>
  <div class="rg-section-card__body">
    <!-- corpo del tab: form, testo, key-value… -->
  </div>
</section>
```

Corpo a filo con una tabella (tab «Consumi»):

```html
<section class="rg-section-card rg-section-card--flush">
  <header class="rg-section-card__header">
    <div class="rg-section-card__heading">
      <h2 class="rg-section-card__title">Consumi</h2>
      <p class="rg-section-card__subtitle">Stimati dal file macchina, revisione 04.</p>
    </div>
    <div class="rg-section-card__actions">
      <button class="rg-button rg-button--primary" type="button">Ricalcola</button>
    </div>
  </header>
  <div class="rg-section-card__body">
    <div class="rg-table-wrap"><table class="rg-table"><!-- … --></table></div>
  </div>
</section>
```

## Migrazione (consumatore: rg-product-platform)

Quando questi mattoni esistono nel DS, in `rg-product-platform`:

- I tab della **pagina fase** (`fase`, `_tab_consumi`, …) adottano `rg-section-card` come
  contenitore e `rg-section-card__header` come unica testa di tab: **spariscono i `<style>`
  residui** che ricostruivano bordo/header/filetto in locale.
- Le tabelle dei tab applicano la **convenzione «Qtà»** documentata in
  [`tables.md`](tables.md#colonna-qtà): stessa colonna, stesso allineamento, stessa unità in
  ogni tab.
- Il **`<dialog>` nativo converge su `rg-modal`** (già canonico dal DS): niente dialog
  applicativo con stili propri.
- Le etichette di sezione e di modale ereditano il **fix di contrasto** (token
  `--rg-color-text-label`, vedi sotto): non serve più correggere il colore in locale.

Gli edit di questi file li fa la chat di `rg-product-platform`; il DS fornisce i mattoni e la
consegna di migrazione, non tocca il codice del consumatore.
