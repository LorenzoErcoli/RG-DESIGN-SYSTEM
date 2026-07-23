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

## Ordine canonico del pannello (regola, v1.7.0)

Chi usa due tool RG di seguito non deve reimparare dove si trovano le cose. La coerenza non si
ottiene imponendo a ogni tool gli stessi gruppi — i parametri di generazione sono l'identità dello
strumento e non si toccano — ma fissando **l'ordine e il titolo di ciò che ricorre**.

Il pannello ha una **testa canonica**, un **corpo libero** e una **coda canonica**. Corpo e coda
non cambiano mai; la **testa ha due forme**, scelte da una sola domanda:

> **La misura del prodotto nasce dalla sorgente importata, o è una decisione indipendente del tool?**

La testa si apre sempre con la **radice della catena di dipendenze**: ciò da cui tutto il resto
prende misura. È questo, non un ordine tematico fisso, a decidere se in cima c'è la Sagoma o il
Formato.

### Testa A — sorgente-guidata («importo e ne ricavo la misura»)

La cosa importata *è* il soggetto e la sua misura reale definisce l'output. La sagoma comanda e
**non esiste una sezione Formato separata**: la misura del prodotto vive dentro la Sagoma (la
classica «larghezza reale mm», che sembra un parametro ma non lo è).

| Pos. | Slot | Titolo | Contenuto |
| --- | --- | --- | --- |
| 01 | Sorgente | **Sagoma** | `rg-file-input`, sagoma demo, interpretazione della scala **e misura reale** (larghezza/altezza reali) |
| 02 | Attribuzione | **Colori e ruoli** | `rg-color-map`: colore/layer → ruolo |

Esempi: **net-45**, bitmap→stitch, cross-stitch da immagine.

### Testa B — formato-guidata («dimensiono il piano e poi lo popolo»)

Il tool produce un piano che si dimensiona da sé; la sorgente, se c'è, è un **ritaglio/maschera
opzionale**. Il formato è la prima decisione — il foglio su cui si lavora — quindi sta **in cima**,
e sotto vengono Sagoma e Colori (è l'ordine chiesto da chi dirige il prodotto: prima le
larghezze/altezze del piano, poi la sagoma coi colori).

| Pos. | Slot | Titolo | Contenuto |
| --- | --- | --- | --- |
| 01 | Formato | **Formato e scala** | dimensioni del piano prodotto, ingrandimento globale |
| 02 | Sorgente | **Sagoma** | `rg-file-input` come ritaglio opzionale (+ scala del file) |
| 03 | Attribuzione | **Colori e ruoli** | `rg-color-map`, quando c'è un import da interpretare |

Esempi: **pattern-grammar**, oblique, 45-grid.

### Corpo e coda (identici nelle due teste)

| Pos. | Slot | Titolo | Contenuto | C'è quando |
| --- | --- | --- | --- | --- |
| corpo | Gruppi del tool | liberi | i parametri di generazione, **nel loro ordine** | sempre |
| coda | Esportazione | **Esportazione** | opzioni (non azioni) che riguardano solo il file prodotto | esistono già come gruppo a sé |
| coda | Preset | **Preset** | nome, elenco, salva/carica/elimina | il tool memorizza configurazioni |

**Gli slot sono posizioni, non contenitori.** Un tool che non importa nulla non ha la sezione
Sagoma e non lascia un buco al suo posto: la numerazione resta contigua e parte da `01`. Il numero
dice *dove sei nel pannello*, non *quale slot è*: l'ancora fra tool è l'ordine più il titolo, non
la cifra. Numerare i buchi (`01`, `03`, `06`) trasformerebbe il pannello nell'inventario di ciò che
il tool non fa.

### A quale slot appartiene un controllo

L'ordine è quello del lavoro: **cosa comanda la misura → cosa entra → come lo interpreto → come lo
genero → cosa mi porto via**. Il test (invariato rispetto a v1.5.0, vale per entrambe le teste e
per i tool futuri):

1. Cambia significato se cambio il file importato? → **testa** (Sagoma, oppure Colori e ruoli).
2. Descrive la misura di ciò che esce **ed è una decisione indipendente**? → **Formato e scala**,
   in cima (testa B). Se invece quella misura *esce dalla sorgente*, il controllo è dentro
   **Sagoma** (testa A) e non c'è un Formato separato.
3. Sopravvive intatto a un cambio di file e descrive *come* si genera? → **gruppo del tool**.
4. Riguarda solo il file che esce? → **Esportazione**.
5. È una configurazione salvata? → **Preset**.

Il caso tipico di errore è la misura reale dell'oggetto importato («larghezza reale mm», «scala
dell'SVG importato»): sembra un parametro di generazione e finisce in mezzo agli altri, ma passa il
test 1 — senza file non vuole dire niente — quindi è nella sezione Sagoma. La domanda-radice
risolve anche il caso ibrido, un tool che importa una sagoma **e** fissa un formato proprio in cui
la sagoma viene inscritta: è testa B (Formato in cima, indipendente), mentre la «larghezza reale»
dell'import resta in Sagoma perché interpreta la *sorgente* (test 1), non l'output.

### Cosa non sta nel pannello

Le **azioni** stanno in `rg-workspace__stage-header` — «Adatta» come `rg-button--ghost`, l'export
come `rg-button--primary` — perché agiscono sull'anteprima, non sui parametri, e devono restare
raggiungibili mentre il pannello scorre. Restano nel pannello solo le azioni che operano
sull'oggetto della loro sezione (sagoma demo, salva/carica/elimina preset): vanno in un
`rg-cluster` su `rg-param-grid__wide`, in fondo alla sezione.

Lo stato del lavoro sta in `rg-workspace__statusbar`: esito a sinistra, vista (zoom, pan) a destra.

### Sezioni richiudibili (accordion) — regola v1.7.0

Un pannello lungo (pattern-grammar arriverà a ~8 sezioni) non può essere né un muro tutto aperto né
un mistero tutto chiuso. Una regola sola, valida per ogni tool presente e futuro:

- **La testa non si richiude mai.** Sagoma, Formato e Colori e ruoli sono il punto di partenza
  della lettura e l'ancora fra tool: restano sempre aperte, sono `<section>`, non `<details>`. È
  l'unica parte del pannello che *non* si può chiudere — la garanzia che il lavoro non sparisce.
- **Corpo e coda sono richiudibili, tutti o nessuno.** Un pannello con metà sezioni collassabili e
  metà no fa esitare su *perché questa sì e questa no*: se una sezione del corpo è un accordion, lo
  sono tutte le sezioni del corpo e della coda. Niente misto.
- **Stati di default (alla prima apertura, senza memoria):**
  - Testa → aperta, non collassabile.
  - Corpo → se il pannello ha **≤ 5 sezioni** in tutto, **tutte aperte** (vedi il lavoro senza un
    click). Se ha **≥ 6 sezioni**, resta aperto **solo il primo gruppo del corpo** — i controlli di
    generazione principali, quelli che si toccano per primi — e i gruppi successivi partono chiusi.
  - Coda (Esportazione, Preset) → **sempre chiusa di default**: sono opzioni di fine flusso, non il
    lavoro.
- **Lo stato aperto/chiuso si ricorda per tool.** L'app persiste l'apertura di ogni sezione
  richiudibile (es. `localStorage`, chiave *tool + id sezione*). I default qui sopra valgono solo
  quando non c'è memoria; dalla seconda sessione vince la scelta dell'utente. La testa non ha stato
  da ricordare.

Composizione sancita (invariata): `<details class="rg-param-section rg-disclosure">` con
`<summary class="rg-param-section__header rg-disclosure__trigger">`. Il `+`/`−` è quello del DS, il
filetto di chiusura resta uno solo, la testata mantiene il target di 40 px. Una sezione aperta di
default porta l'attributo `open`; una chiusa lo omette.

```html
<!-- corpo: primo gruppo aperto di default -->
<details class="rg-param-section rg-disclosure" open>
  <summary class="rg-param-section__header rg-disclosure__trigger">
    <span class="rg-param-section__index">04</span><span class="rg-param-section__title">Zig-zag orizzontale</span>
  </summary>
  <div class="rg-param-grid"><!-- campi del gruppo --></div>
</details>

<!-- coda: chiusa di default (nessun attributo open) -->
<details class="rg-param-section rg-disclosure">
  <summary class="rg-param-section__header rg-disclosure__trigger">
    <span class="rg-param-section__index">07</span><span class="rg-param-section__title">Preset</span>
  </summary>
  <div class="rg-param-grid"><!-- salva / carica / elimina --></div>
</details>
```

Esempio di testa (qui **testa A**, sorgente-guidata: la Sagoma comanda la misura) con un gruppo del
corpo richiudibile e chiuso:

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
