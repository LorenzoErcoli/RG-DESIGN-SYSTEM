# Changelog — RG Design System

Versionamento semver. I consumatori si agganciano a un **tag**, mai a un branch.

- **major** — rimozione o rinomina di classi/token, cambio dell'ordine di import, modifica
  di un token permanente: richiede intervento nei prodotti.
- **minor** — nuovi componenti, nuove varianti, nuovi token additivi: aggiornamento sicuro.
- **patch** — correzioni che non cambiano il contratto.

## 1.4.0 — 2026-07-22

Densità del pannello parametri delle tool. `pattern-grammar` mostrava numeri illeggibili nei campi
con unità: il pannello era stato stretto a `--rg-layout-sidebar` (280px, il token della
*navigazione*) e la griglia a due colonne lasciava ~68px all'input. Il difetto non era dell'app: il
DS non diceva quale fosse la larghezza giusta di un pannello di parametri, e `rg-param-grid`
collassava a una colonna solo su **media query di finestra** — quindi mai, con finestra larga e
pannello stretto. Token additivi, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi token

- **`--rg-layout-tool-panel`** (380px) — larghezza del pannello di una tool. È ora il default di
  `--rg-workspace-panel`, al posto del 380px letterale che stava nel CSS. Le tool hanno un token
  proprio perché un pannello di parametri non è una colonna di navigazione.
- **`--rg-layout-param-col-min`** (132px) — larghezza minima di una colonna di parametri, cioè la
  misura sotto la quale un `rg-field-with-unit` smette di mostrare il valore.

### Correzioni

- **`rg-param-grid` impila per larghezza del contenitore, non della finestra.**
  `rg-workspace__panel` è ora un contenitore di query (`container-type: inline-size`) e la griglia
  passa a una colonna sotto 324px di pannello (2 × 132 + gap + padding di sezione). Vale a
  qualsiasi larghezza di finestra: nessuna app deve più scrivere media query locali per i propri
  parametri. La vecchia media query a 760px resta per lo stack mobile.
- **`rg-field-with-unit .rg-input` ha `min-width: 0`** — annulla la dimensione minima automatica
  del controllo, che in un pannello stretto faceva sbordare l'input dalla propria traccia invece
  di comprimerlo.

### Documentazione

- `patterns/workspace.md`: nuova regola "Larghezza del pannello" — quale token usare, perché non
  restringere con `--rg-layout-sidebar`, la soglia dei 324px, e la segmentazione in
  `rg-param-section` come leva giusta quando i controlli sono molti.
- `components/forms.md`: larghezza minima d'uso del campo con unità e motivo per cui non esiste
  una variante compatta.
- Vetrina, sezione 16: il workspace è mostrato alla larghezza di default e affiancato dal
  confronto 380 / 280 che rende visibile il collasso a una colonna.

## 1.3.1 — 2026-07-22

Il **bottone-link non esce più sottolineato**. Segnalata da `rg-product-platform` applicando il
contratto `rg-step` di 1.3.0: l'azione "Apri" di una fase è per forza un `<a class="rg-button">`
— naviga — e usciva con la sottolineatura dello user-agent. `rg-core.css` dichiara solo
`a { color: inherit }` e `.rg-button` non azzerava `text-decoration`, quindi la regola
`.rg-button--ghost:hover { text-decoration: underline }` non distingueva più nulla: era già
sottolineato a riposo. Correzione di foglio, nessuna classe nuova, nessun token, nessun cambio di
contratto: **patch, si aggiorna il pin e basta**.

### Correzioni

- **`.rg-button` — `text-decoration: none`.** La stessa riga che `rg-tab`, `rg-folder`,
  `rg-sidebar-item`, `rg-list-row--link` e `rg-topbar__back` portavano già: una classe di
  componente indossabile da un `<a>` neutralizza la decorazione nativa. L'affordance di hover di
  `--ghost` torna a essere un segnale. Il focus resta quello globale di `rg-core`
  (`:focus-visible`), che non distingue fra `<a>` e `<button>`.
- **`.rg-topbar__brand` — `text-decoration: none` + `color: inherit`,** con l'affordance di hover
  qualificata su `a.rg-topbar__brand:hover` così un marchio inerte (`<span>`) non finge di essere
  cliccabile. Stesso difetto, stessa riga: non serviva un trattamento separato. I prodotti stavano
  degradando il marchio a `<span>` — rinunciando al ritorno alla home — pur di non vedere la
  sottolineatura; quell'aggiramento ora si può rimuovere.

**Niente reset globale su `a`.** Sarebbe la correzione sbagliata: un link nel testo corrente deve
restare sottolineato, è la sua unica affordance non cromatica (regola: nessuno stato affidato al
solo colore). La sottolineatura si azzera **per classe di componente**, mai per elemento.

### Vetrina

- Sezione **03 — Buttons**: nuova tavola "Azione che naviga — la classe su un `<a>`". La vetrina
  rendeva i bottoni solo come `<button>`: per questo il difetto è sopravvissuto a tre release.
  Ora una regressione si vede.

## 1.3.0 — 2026-07-22

La **sequenza di fasi** diventa un componente. In `rg-product-platform` l'elenco delle fasi di una
parte era stato costruito con `rg-list-row--link` (1.2.0) e il difetto era del DS, non dell'app:
una sequenza ordinata di contenitori non è un elenco di record. Il titolo pesava quanto un
metadato, l'ordine non si leggeva, la fase risultava indistinguibile da una tabella dati e le
azioni della fase erano vietate dal contratto della riga navigabile. Nessun token nuovo, nessuna
rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-steps` / `rg-step`** — fase di una sequenza ordinata: **blocco rigato** (filetto forte
  nero sopra e sotto, filetto neutro fra le fasi, come `rg-table`; nessun riquadro a pannello),
  numero di posizione in mono dentro una casella, filo verticale generato dal DS che unisce i
  numeri (il segno che distingue una sequenza da un elenco piatto), titolo identitario a
  `--rg-font-size-lg`, parametri tecnici con unità in `rg-step__meta`, corpo espandibile **in
  loco** e azioni proprie sempre visibili. Il separatore sta in testa alla fase seguente, quindi
  chiude anche il corpo di una fase aperta invece di lasciarlo sfumare in quella dopo.
  Varianti: `rg-step--danger` per la fase irrisolta. Parti: `__head`, `__toggle`, `__num`,
  `__headline`, `__title`, `__meta`, `__aside`, `__actions`, `__body`.
- **`rg-button--ghost` + `rg-button--danger` componibili** — `--ghost` significa "senza chrome a
  riposo", quindi l'azione distruttiva secondaria è testo in colore `danger` e non un riquadro
  rosso ripetuto su ogni riga. Una riga di CSS, nessuna classe nuova.

### Decisione strutturale: niente `<details>`

Le azioni di una fase stanno sulla sua riga di intestazione. Dentro un `<summary>` sarebbero
controlli annidati in un controllo (markup invalido, tastiera rotta); fuori dal `<summary>`
sarebbero contenuto rivelabile, quindi invisibili a fase chiusa. Il toggle è perciò un `<button>`
e le azioni sono suoi **fratelli**: tab order toggle → Modifica → Elimina → contenuto. Il
compromesso, dichiarato nel doc: lo stato non è nativo e richiede due attributi
(`aria-expanded` sul toggle, `hidden` sul corpo) resi dal server o da tre righe di controller.

### Documentazione

- Nuovo `components/steps.md`: scopo, quando **non** serve, tastiera e accessibilità, controller
  di riferimento, limiti (non si annida, niente drag & drop in 1.3.0).
- `components/lists.md`: rimando esplicito a `rg-step` nel paragrafo "Uso e limiti", dove il
  divieto di controlli in una riga-link diventava un vicolo cieco.
- Vetrina: nuova sezione **20 — Sequenza di fasi** (aperta, chiusa, irrisolta con stato vuoto).

## 1.2.0 — 2026-07-22

Formalizzata la **riga-record navigabile**: l'elenco che è un indice (le fasi di una parte, le
revisioni di una scheda) aveva la riga giusta ma nessuna affordance che dicesse "questa riga si
apre", e i prodotti la stavano improvvisando componendo un `<a class="rg-list-row">` senza
contratto. Nessun token nuovo, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-list-row--link`** — la riga-record è essa stessa il link al proprio dettaglio: target
  pieno (min 40 px), chevron di apertura generato dal DS, hover che sottolinea il titolo (non
  solo colore), `:focus-visible` nero. Vale su `<a>` e su `<button>`; il reset del chrome nativo
  del bottone sta nel DS. Limite documentato: una riga-link non può contenere altri controlli
  interattivi, quindi niente `__actions` — se servono azioni per riga, la riga resta inerte.

### Documentazione

- `components/lists.md` riscritto con varianti, riga navigabile, uso e limiti (badge in `__head`
  e non in `__actions`; quando serve `rg-table` o `rg-folder` invece di una riga).
- Vetrina: nuova sezione **19 — Elenchi tecnici**. `rg-list` aveva un doc e un manifest ma nessun
  esemplare in `examples/`: `specimenAnchor` passa da `layout` a `lists`.

## 1.1.0 — 2026-07-21

Assorbimento del CSS residuo di `rg-product-platform`. Nessun token nuovo, nessuna rimozione:
**aggiornamento sicuro**, il pin si sposta senza interventi obbligati. Origine: triage delle
~196 righe di CSS rimaste nei blocchi `<style>` dei template Jinja dopo l'adozione del DS.

### Nuovi

- **App-shell documentale** (`rg-appshell`, `rg-appshell__main`, var `--rg-appshell-max`) —
  guscio delle applicazioni a pagine, complemento di `rg-workspace`. Doc `patterns/appshell.md`.
- **Lightbox** (`rg-lightbox`, `__image`, `__thumb`) — ingrandimento di un'immagine documentaria
  su `--rg-z-overlay`, sotto i dialog. Doc `components/lightbox.md`.
- **Badge, ciclo di vita e pipeline** — `--draft`, `--archived`, `--pending`, `--parsed` e la
  variante di forma `--count`, che `badges.md` prometteva dalla 0.1.0 senza implementarla.
  Distinguibili senza colore: pallino vuoto, bordo tratteggiato, assenza di pallino.
- **`rg-tabpanel`** — le tab avevano il controllo ma non il pannello.
- **`rg-topbar--sticky`**, **`rg-disclosure--boxed`**, **`rg-key-value--ruled`**,
  **`rg-cluster--end`**, **`rg-section-header--sub`**, **`rg-u-inline`**, **`rg-u-no-print`**.
- **Regole di stampa** in `rg-utilities.css`: le schede tecniche RG si stampano, il chrome
  sparisce e il contenuto occupa la pagina senza che ogni app riscriva il proprio `@media print`.

### Correzioni

- `.rg-tab` non funzionava su `<button>`: mancava il reset del chrome nativo, e ogni app se lo
  riscriveva in locale sovrascrivendo la versione DS. Ora ha anche il font identitario e il
  target minimo di 40 px, e riconosce `is-active`.
- `.rg-disclosure` documenta `<summary>` come trigger ma non ne sopprimeva il marker nativo
  (marker + segno `+`/`−` insieme) e non seguiva `[open]`.

### Contratto

- `appLocalExceptions` è **vuota e non va ripopolata**. Il prefisso `rg-` appartiene al DS: una
  classe `.rg-*` definita fuori dal DS è una violazione, verificabile con un grep invece che
  leggendo un elenco di deroghe. Vedi `integration/README.md`.

## 1.0.0 — 2026-07-20

Prima release stabile e **primo contratto di consumo pubblico**. Da qui i prodotti della
suite RG si agganciano a un tag invece che a una copia.

### Aggiunto
- `integration/` — contratto di consumo del DS:
  - `README.md`: distribuzione via submodule pinnato a tag, superficie consumata.
  - `streamlit.md` + `rg_ds_streamlit.py` + `streamlit-bridge.css` + `streamlit-config.toml`:
    meccanismo unico di iniezione per le app Streamlit. Il codice di caricamento vive nel DS,
    non nelle app.
  - `fastapi.md`: mount statico a perimetro ristretto e ordine di import nel template base.
- `tools/ds-lint.mjs` — due controlli nuovi: le classi `rg-*` citate in `integration/*.md`
  devono esistere nel CSS; `MODULES` nell'helper Streamlit deve coincidere con
  `components.json` → `importOrder` (l'ordine di import non può divergere in silenzio).
- `CHANGELOG.md` (questo file) e politica di versionamento esplicita.

### Consolidato
- `master`/`main` allineato: la proposta `ds/topbar-app` (`fdb69c6`, variante `rg-topbar--app`
  con `__back` / `__title` / `__actions`) è **accettata** e non è più marcata come proposta.
- `ds/workspace` (`e271895`) **scartato**: superato da `85f56c9`, che implementa `rg-workspace`
  in forma più completa (panel / stage / canvas / layer / statusbar, pan-zoom che non si
  azzera). Mergiarlo avrebbe introdotto una seconda definizione conflittuale di `.rg-workspace`.
  Nessun contenuto perso: il commit resta raggiungibile via SHA.

### Corretto
- Intestazione di `tokens.css`, ferma a `v0.1.0`, riallineata alla versione reale.

Nessun token permanente modificato rispetto a 0.3.0. Nessuna classe rimossa o rinominata:
per i consumatori l'aggiornamento da 0.3.0 è additivo. Il salto a 1.0.0 segna la stabilità
del contratto, non una rottura.

## 0.3.0

- Promossi nel DS da `rg-product-platform`: `modal`, `chip`, `folder` e le parti estese del
  breadcrumb (`rg-breadcrumb__sep`, `rg-breadcrumb__current`).
- `recent-card` dichiarato **app-local** (resta in `rg-product-platform`).
- Pattern `rg-workspace` (shell strumento a due pannelli con pan/zoom).
- Componente `rg-autocomplete`.
- Documentati gli 11 componenti fino ad allora solo-CSS; introdotto `tools/ds-lint.mjs`.

## 0.2.0

- Componenti `rg-list` / `rg-list-row` (liste tecniche con azioni inline) e `rg-icon-button`.

## 0.1.0

- Base iniziale: token, moduli CSS, componenti e pattern fondativi.
