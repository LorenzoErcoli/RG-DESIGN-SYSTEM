# Workspace (app-shell a 2 pannelli)

## Scopo

Il guscio delle **tool** RG: un pannello parametri a sinistra e un'area di lavoro a destra con
canvas navigabile (pan/zoom), header e status bar. È il pattern condiviso da oblique,
pattern-grammar e dalle future tool delle due suite, così ogni strumento ha la stessa ergonomia.
Derivato da `pattern-grammar-engine`, generalizzato e reso token-based.

## Struttura

```
┌─ rg-topbar ─────────────────────────────────────────────┐
├───────────────┬─────────────────────────────────────────┤
│ __panel       │ __stage-header                          │
│ (parametri,   ├─────────────────────────────────────────┤
│  scroll)      │ __canvas  →  __layer (pan/zoom)          │
│               │                                         │
│               ├─────────────────────────────────────────┤
│               │ __statusbar                             │
└───────────────┴─────────────────────────────────────────┘
```

- `rg-workspace` — griglia `[panel] [stage]`. Riempie l'area sotto la topbar; l'app imposta
  l'altezza esterna (es. `height: calc(100vh - var(--rg-layout-header))`). Larghezza del pannello
  regolabile con `--rg-workspace-panel` (default `--rg-layout-tool-panel`, 380px).
- `rg-workspace__panel` — parametri, scrollabile. Comporlo con `rg-param-section` +
  `rg-param-grid` + campi `rg-field` / `rg-field-with-unit`, nell'**ordine canonico** descritto
  più sotto.
- `rg-workspace__stage` — righe `header / canvas / statusbar`.
- `rg-workspace__canvas` — viewport che ritaglia; `cursor: grab`, `is-dragging` durante il trascinamento.
- `rg-workspace__layer` — il livello trasformato che contiene l'anteprima (SVG/canvas).

## Larghezza del pannello (regola)

Il pannello di una tool **non è una sidebar di navigazione**: contiene campi con label, valore e
unità, non voci di menu. Per questo ha un token proprio, `--rg-layout-tool-panel` (380px), ed è
quello il default di `--rg-workspace-panel`.

- **Non stringere il pannello con `--rg-layout-sidebar` (280px)**: è il token della colonna di
  navigazione. A 280px restano ~110px per campo e un `rg-field-with-unit` scende a ~68px di
  input: il numero non è più leggibile. Se il pannello è quello dei parametri, l'override giusto
  è **nessun override**.
- Chi ha davvero bisogno di più spazio allarga, non stringe:
  `style="--rg-workspace-panel: 440px"` (o un multiplo dichiarato). Restringere si fa solo
  accettando la griglia a una colonna.
- **Soglia di densità**: due colonne di parametri richiedono almeno **324px** di pannello
  (2 × `--rg-layout-param-col-min` + gap + padding di `rg-param-section`). Sotto quella misura
  `rg-param-grid` **impila da sola** a una colonna: la regola è nel DS tramite `@container` sul
  pannello, quindi vale anche a finestra larga e non serve CSS locale. Il default 380px sta
  sopra la soglia e mostra due colonne.
- Un pannello ridimensionabile dall'utente non è nel DS: se serve, l'app scrive
  `--rg-workspace-panel` sull'elemento `rg-workspace` e il resto si adatta da sé. Mantenere un
  minimo di 324px (o accettare consapevolmente la colonna singola).

Quando i controlli sono molti (oltre ~20), la leva giusta non è la larghezza ma la
**segmentazione**: più `rg-param-section` con header numerato, l'ordine dei gruppi coerente con
l'ordine del calcolo, e i campi larghi (select, upload, azioni) su `rg-param-grid__wide`.

## Ordine canonico del pannello (regola, v1.5.0)

Chi usa due tool RG di seguito non deve reimparare dove si trovano le cose. La coerenza non si
ottiene imponendo a ogni tool gli stessi gruppi — i parametri di generazione sono l'identità dello
strumento e non si toccano — ma fissando **l'ordine e il titolo di ciò che ricorre**.

Il pannello ha una **testa canonica**, un **corpo libero** e una **coda canonica**:

| Pos. | Slot | Titolo | Contenuto | C'è quando |
| --- | --- | --- | --- | --- |
| testa | Sorgente | **Sagoma** (contorni) o **Sorgente** (altro input) | `rg-file-input`, sagoma demo, interpretazione della scala del file (modalità, larghezza/altezza reali) | il tool importa geometria o immagini |
| testa | Attribuzione | **Colori e ruoli** | `rg-color-map`: colore/layer → ruolo, oppure scelta del contorno da usare | c'è qualcosa di importato da interpretare |
| testa | Formato | **Formato e scala** | dimensioni del piano prodotto, ingrandimento globale | il risultato ha una misura propria, non derivata dalla sagoma |
| corpo | Gruppi del tool | liberi | i parametri di generazione, **nel loro ordine** | sempre |
| coda | Esportazione | **Esportazione** | opzioni (non azioni) che riguardano solo il file prodotto | esistono già come gruppo a sé |
| coda | Preset | **Preset** | nome, elenco, salva/carica/elimina | il tool memorizza configurazioni |

**Gli slot sono posizioni, non contenitori.** Un tool che non importa nulla non ha la sezione
Sagoma e non lascia un buco al suo posto: la numerazione resta contigua e parte da `01`. Il numero
dice *dove sei nel pannello*, non *quale slot è*: l'ancora fra tool è l'ordine più il titolo, non
la cifra. Numerare i buchi (`01`, `03`, `06`) trasformerebbe il pannello nell'inventario di ciò che
il tool non fa.

### A quale slot appartiene un controllo

L'ordine non è tematico, è quello del lavoro: **cosa entra → come lo interpreto → quanto è grande
ciò che produco → come lo genero → cosa mi porto via**. Da qui il test, che vale anche per i tool
futuri:

1. Cambia significato se cambio il file importato? → **testa** (Sagoma, oppure Colori e ruoli).
2. Descrive la misura di ciò che esce? → **Formato e scala**.
3. Sopravvive intatto a un cambio di file e descrive *come* si genera? → **gruppo del tool**.
4. Riguarda solo il file che esce? → **Esportazione**.
5. È una configurazione salvata? → **Preset**.

Il caso tipico di errore è la misura reale dell'oggetto importato («larghezza reale mm», «scala
dell'SVG importato»): sembra un parametro di generazione e finisce in mezzo agli altri, ma passa il
test 1 — senza file non vuole dire niente — quindi è nella sezione Sagoma, accanto al caricamento
che la produce. Simmetricamente, la larghezza del pannello generato non è della Sagoma: passa il
test 2.

### Cosa non sta nel pannello

Le **azioni** stanno in `rg-workspace__stage-header` — «Adatta» come `rg-button--ghost`, l'export
come `rg-button--primary` — perché agiscono sull'anteprima, non sui parametri, e devono restare
raggiungibili mentre il pannello scorre. Restano nel pannello solo le azioni che operano
sull'oggetto della loro sezione (sagoma demo, salva/carica/elimina preset): vanno in un
`rg-cluster` su `rg-param-grid__wide`, in fondo alla sezione.

Lo stato del lavoro sta in `rg-workspace__statusbar`: esito a sinistra, vista (zoom, pan) a destra.

### Sezione richiudibile

Una sezione lunga o secondaria può essere richiudibile. La composizione sancita è
`<details class="rg-param-section rg-disclosure">` con
`<summary class="rg-param-section__header rg-disclosure__trigger">`: il `+`/`−` è quello del DS,
il filetto di chiusura resta uno solo, la testata mantiene il target di 40 px. Le sezioni della
testa canonica non si richiudono: sono il punto di partenza della lettura.

```html
<aside class="rg-workspace__panel">
  <section class="rg-param-section">
    <div class="rg-param-section__header">
      <span class="rg-param-section__index">01</span><h3 class="rg-param-section__title">Sagoma</h3>
    </div>
    <div class="rg-param-grid">
      <div class="rg-file-input rg-param-grid__wide">
        <label class="rg-file-input__control">
          <input type="file" accept=".dxf,.svg">
          <span class="rg-button rg-button--outline">Carica DXF o SVG…</span>
        </label>
        <p class="rg-file-input__status" role="status">tomaia-42.dxf · 232 × 142 mm · 12 contorni</p>
      </div>
      <label class="rg-field rg-param-grid__wide"><span class="rg-field__label">Larghezza reale (0 = auto)</span>
        <span class="rg-field-with-unit"><input class="rg-input rg-mono" type="number" value="0"><span>mm</span></span>
      </label>
      <div class="rg-cluster rg-param-grid__wide"><button class="rg-button rg-button--ghost" type="button">Sagoma demo</button></div>
    </div>
  </section>

  <section class="rg-param-section">
    <div class="rg-param-section__header">
      <span class="rg-param-section__index">02</span><h3 class="rg-param-section__title">Colori e ruoli</h3>
    </div>
    <ul class="rg-color-map">
      <li class="rg-color-map__row">
        <span class="rg-color-map__swatch" style="--swatch:#1a1a1a"></span>
        <span class="rg-color-map__code">#1A1A1A <span class="rg-color-map__meta">12 path</span></span>
        <select class="rg-select rg-color-map__target" aria-label="Ruolo per #1A1A1A"><option>Perimetro</option></select>
      </li>
    </ul>
  </section>

  <details class="rg-param-section rg-disclosure">
    <summary class="rg-param-section__header rg-disclosure__trigger">
      <span class="rg-param-section__index">05</span><span class="rg-param-section__title">Deformazioni creative</span>
    </summary>
    <div class="rg-param-grid"><!-- campi del tool --></div>
  </details>
</aside>
```

## Pan / zoom che non si azzera (regola)

La vista vive **solo** su `__layer` tramite le variabili CSS `--rg-pan-x`, `--rg-pan-y`,
`--rg-zoom`. Sono stato **separato** dal contenuto: quando i parametri cambiano e l'app rigenera
l'anteprima dentro `__layer`, la trasformazione resta invariata → **il punto di vista e lo zoom
non tornano a zero**. Non ricalcolare pan/zoom dal contenuto a ogni render: aggiornali solo in
risposta a gesti dell'utente (drag, wheel) o a un "fit" esplicito.

```html
<div class="rg-workspace" style="height: calc(100vh - var(--rg-layout-header))">
  <aside class="rg-workspace__panel">
    <section class="rg-param-section">
      <div class="rg-param-section__header"><span class="rg-param-section__index">01</span><h3 class="rg-param-section__title">Griglia</h3></div>
      <div class="rg-param-grid">
        <label class="rg-field"><span class="rg-field__label">Lato (mm)</span>
          <span class="rg-field-with-unit"><input class="rg-input rg-mono" value="6.0"><span>mm</span></span>
        </label>
      </div>
    </section>
  </aside>
  <div class="rg-workspace__stage">
    <header class="rg-workspace__stage-header"><h2 class="rg-h3">Anteprima</h2><span class="rg-mono">232 × 142 mm</span></header>
    <div class="rg-workspace__canvas">
      <div class="rg-workspace__layer" style="--rg-zoom:1;--rg-pan-x:0px;--rg-pan-y:0px"><!-- svg --></div>
    </div>
    <footer class="rg-workspace__statusbar"><span>Pronto</span><span class="rg-mono">zoom 100%</span></footer>
  </div>
</div>
```

## Comportamento (JS di riferimento, indipendente da librerie)

- **Pan**: al `pointerdown` sul canvas aggiungi `is-dragging`; sul `pointermove` accumula il delta
  in `--rg-pan-x/--rg-pan-y` del layer.
- **Zoom**: sul `wheel` moltiplica `--rg-zoom` (clamp min/max), centrando sul puntatore.
- **Fit**: un'azione esplicita reimposta pan a 0 e zoom al valore che inquadra il contenuto.
- Non toccare queste variabili quando rigeneri il contenuto: è ciò che preserva la vista.
