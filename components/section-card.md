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
  della card. Arrivano ai bordi **le linee, non le azioni**: vedi *Corpo a filo e distanza dai bordi*.
- **`rg-section-card--emphasis`** (v1.13.0): il blocco che è il **soggetto della vista**. Contorno
  nero al posto del gradino intermedio e testa su superficie rientrante
  (`--rg-color-surface`), così testa e corpo si distinguono anche a colpo d'occhio.

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

### Enfasi (`--emphasis`) — una sola per vista

`--emphasis` non è uno stato e non significa nulla sul contenuto: dice soltanto *«questo è il
soggetto, il resto è contorno»*. Serve alla pagina che mostra più blocchi allo stesso livello — il
tab attivo accanto ai riepiloghi laterali, il form in modifica accanto ai dati di sola lettura.

- **Una sola section card enfatizzata per vista.** Se tutte lo sono, nessuna lo è: è il difetto di
  partenza che la revisione 1.13.0 corregge, non la sua soluzione.
- L'enfasi **non sostituisce l'azione primaria**: la regola «al più una `rg-button--primary`
  nell'header» resta valida e indipendente.
- Non usarla per segnalare un errore o un avviso: quello è un `rg-alert` dentro il corpo, con testo
  esplicito. L'enfasi non è leggibile come stato e non deve fingersi tale.

### Corpo a filo e distanza dai bordi (dalla 1.17.0)

Regola: un'azione non tocca mai il bordo del proprio contenitore ([design-rules §5](../design-rules.md#distanza-delle-azioni-dal-bordo)).
`--flush` toglie il padding al corpo, quindi a rispettarla deve essere il contenuto.

| Contenuto del corpo `--flush` | Distanza dal bordo | Cosa fare |
| --- | --- | --- |
| `rg-table-wrap` > `rg-table` | 12 px, dal padding delle celle | niente |
| `rg-steps` | 16 px, dati dal DS dalla 1.17.0 | niente. Il numero di fase, o la graffa di un gruppo, si allinea al titolo della testa |
| qualsiasi altro blocco (nota, vuoto, riga di azioni sotto la tabella, `rg-file-card`) | nessuna | avvolgerlo in `rg-section-card__inset` |

`rg-section-card__inset` è il blocco che, dentro un corpo a filo, **riprende la distanza ordinaria**
(16 px sopra e sotto, 24 ai lati, come la testa). Non è una card e non ha bordo. Se il corpo è quasi
tutto inset, `--flush` è la variante sbagliata: si usa il corpo standard.

Cosa cambia per chi usa già `--flush` con `rg-steps` (la lista delle fasi della parte): il blocco
rientra di 16 px per lato. Il filetto nero sopra e sotto la sequenza resta da bordo a bordo; i filetti
fra una fase e l'altra, l'hover del toggle e le azioni della fase si staccano dal contorno della card.

```html
<section class="rg-section-card rg-section-card--flush">
  <header class="rg-section-card__header">…</header>
  <div class="rg-section-card__body">
    <div class="rg-table-wrap"><table class="rg-table"><!-- … --></table></div>
    <div class="rg-section-card__inset">
      <button class="rg-button rg-button--secondary" type="button">Aggiungi riga</button>
    </div>
  </div>
</section>
```

### Superficie e contorno (dalla 1.13.0)

La section card è una superficie **sollevata** (`--rg-color-surface-raised`) sul fondo di pagina, con
contorno al gradino **intermedio** (`--rg-color-border-medium`); il nero resta riservato all'enfasi.
Il titolo (`rg-section-card__title`) è a peso **medium** dichiarato dal DS: è una label identitaria
di tab, non un titolo di pagina, e non cambia peso a seconda dell'elemento che lo ospita. Vedi
[design-rules.md §6](../design-rules.md#quale-superficie-a-quale-profondità).

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

Il blocco soggetto della vista:

```html
<section class="rg-section-card rg-section-card--emphasis">
  <header class="rg-section-card__header">
    <div class="rg-section-card__heading">
      <h2 class="rg-section-card__title">Consumi</h2>
      <p class="rg-section-card__subtitle">Il blocco in revisione: gli altri tab restano di contorno.</p>
    </div>
    <div class="rg-section-card__actions">
      <button class="rg-button rg-button--primary" type="button">Ricalcola</button>
    </div>
  </header>
  <div class="rg-section-card__body">
    <!-- … -->
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
