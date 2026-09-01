# Changelog — RG Design System

Versionamento semver. I consumatori si agganciano a un **tag**, mai a un branch.

- **major** — rimozione o rinomina di classi/token, cambio dell'ordine di import, modifica
  di un token permanente: richiede intervento nei prodotti.
- **minor** — nuovi componenti, nuove varianti, nuovi token additivi: aggiornamento sicuro.
- **patch** — correzioni che non cambiano il contratto.

## 1.13.0 — 2026-09-01

**Revisione di fondazioni: gerarchia.** Solo token e tipografia — nessun componente nuovo, nessuna
classe rinominata, nessuna rimozione. La superficie di consumo resta invariata: **i prodotti non
devono toccare una riga di markup**.

### Perché

Il DS produceva interfacce piatte: in una vista tipica tutti i contenitori e tutti i titoli si
leggevano allo stesso livello. Non era una questione di gusto, erano sei strumenti mancanti,
misurati sugli stili calcolati del CSS 1.12.0.

1. **Nessun titolo dichiarava il proprio peso.** `.rg-h1/.rg-h2/.rg-h3`, `.rg-card__title`,
   `.rg-section-card__title` non avevano `font-weight`: arrivava dallo user-agent. Poiché nella
   documentazione le classi stanno sempre su `<h1>`–`<h3>` (14 occorrenze su 14), uscivano
   **tutte a 700** — titolo di pagina 28/700, titolo di section card 20/700, sotto-sezione 20/700.
   Il peso non portava informazione, e la stessa classe su un `<p>` sarebbe uscita a 400.
2. **Scala compressa.** `rg-h3`, `rg-card__title`, `rg-section-card__title` e `rg-step__title`
   erano tutti a 20 px: i gradini realmente in uso erano 28 → 20 → 14.
3. **Corpo sotto le regole.** `rg-core.css` fissava `body { font-size: 14px }` mentre
   `design-rules.md` §3 prescrive body 16/24 e `.rg-body` usava già 16: il corpo coincideva con
   lo *small*.
4. **Due sole superfici, usate senza regola.** Bianco e neutral-50, 21 dichiarazioni di fondo
   bianco contro 14 neutre in `rg-components.css`. Una card bianca su pagina bianca era separata
   dal solo `--rg-color-border` (#dededa, **1,35:1** di contrasto): il contenitore non si vedeva.
5. **Nessun gradino di linea intermedio.** Fra il filetto neutro e il nero pieno non c'era nulla:
   per `rg-card`/`rg-section-card` il bordo forte esisteva solo legato a un *significato*
   (`--technical`, `--selected`), mai alla sola prominenza.
6. **Ritmo sotto le regole.** `.rg-section` aveva 32 px di padding, la stessa misura che §5
   assegna alla separazione fra *gruppi*; per le *sezioni* prescrive 48–96 px.

La revisione non inventa un idioma nuovo: **`rg-workspace` aveva già tre livelli di superficie**
(pannello bianco, stage neutro, canvas bianco con filetto nero) quando il resto del sistema ne
usava due a caso. Qui si generalizza al resto del sistema ciò che il workspace faceva già bene —
e infatti il workspace ne esce senza un pixel cambiato, a parte il titolo di gruppo.

### Nuovi token

- **`--rg-weight-heading`** (= `--rg-weight-bold`, 700) — il peso del livello di pagina/sezione,
  dichiarato dal DS invece che ereditato dall'elemento ospite.
- **`--rg-color-surface-raised`** (= bianco) — la superficie **sollevata**: è lì che vive il
  contenuto.
- **`--rg-color-border-medium`** (= neutral-400) — il gradino di linea **intermedio**: porta il
  contorno di un contenitore generico a ~2,8:1 su bianco senza spendere il nero, che resta
  riservato all'enfasi e agli stati.

### Token modificati

- **`--rg-color-background`**: bianco → **neutral-50**. La pagina diventa fondo, non superficie di
  lettura. `body` ora legge questo token (prima usava `--rg-color-white` letterale, quindi il
  token semantico non governava nulla).
- **`--rg-color-surface`**: neutral-50 → **neutral-100**. È la superficie **rientrante** dentro una
  sollevata, non un secondo fondo pagina.

### Nuove varianti

- **`rg-card--emphasis`** e **`rg-section-card--emphasis`** — dicono quale contenitore è il
  **soggetto della vista**: contorno nero, e per la section card anche la testa su superficie
  rientrante. Non sono stati e non hanno significato semantico. **Una sola per vista**: se tutto
  è enfatizzato niente lo è, ed è esattamente il difetto di partenza.

### Cosa cambia a video

- Titoli: `rg-h1`/`rg-h2`/`rg-section-header__title` restano a 700 ma ora **per dichiarazione**;
  `rg-h3`, `rg-card__title`, `rg-section-card__title` scendono a **500**. La differenza fra
  livello di pagina e livello di contenitore diventa visibile.
- Corpo del testo da 14 a **16 px**. Restano a 14 **per dichiarazione propria** i controlli
  (nativi via `rg-core.css`, più `rg-button`, `rg-toggle`, `rg-choice`, `rg-disclosure__trigger`),
  la navigazione (`rg-sidebar-item`, `rg-topbar__nav`, `rg-topbar__back`) e il dato denso
  (`rg-table`, `rg-list-row`, `rg-key-value`): chrome e dato non sono testo corrente, e senza
  queste righe sarebbero cresciuti insieme al paragrafo. È il 16 a essere «nuovo»: a video crescono
  solo il testo di lettura (corpo di card, di section card, di modale, alert, stati vuoti) e il
  titolo di gruppo del pannello.
- `rg-card`, `rg-section-card`, `rg-list-row`, `rg-table` e i gruppi di form salgono a superficie
  sollevata; `rg-topbar--app` e `rg-sidebar` la dichiarano esplicitamente in quanto **chrome**.
- `.rg-section` passa a 48 px di ritmo, `.rg-section-header` a 32 px di stacco;
  `rg-param-section__title` da 14 a 16 px.

### Note di migrazione

- **Nessuna azione richiesta nei prodotti**: nessuna classe o token è rimosso o rinominato,
  l'ordine di import non cambia, il markup non si tocca. Da qui il **minor**. Ma il valore di due
  alias semantici cambia: prima di spostare il pin, **rileggere una vista** — in particolare le
  superfici che un prodotto avesse dipinto in locale con `neutral-50`, che ora coincidono con il
  fondo di pagina.
- Una superficie aperta e rigata (`rg-consumption-row`, `rg-materials-row`, `rg-steps`,
  `rg-disclosure`) va posata **su una superficie sollevata**, non direttamente sul fondo: i suoi
  hover chiari presuppongono il bianco sotto. Regola scritta in `design-rules.md` §6.
- **Limite noto**: il livello di peso 500 richiede un medium reale. Senza i font ufficiali
  caricati, il fallback Arial non ha un medium e il browser arrotonda 500 a 400: sulle macchine
  senza i font RG la distinzione 700/500 si assottiglia. Non è una regressione introdotta qui
  (vale già per `rg-step__title`, `rg-list-row__title`, `rg-modal__title`), ma la gerarchia non è
  mai affidata al solo peso: reggono anche corpo, superficie e linea.

### Documentazione

- `design-rules.md` §3: la tabella dei **pesi per livello**. §6: la regola **«quale superficie a
  quale profondità»** — è la regola che mancava e che aveva prodotto i 21 fondi bianchi contro
  14 neutri.
- `components/cards.md` e `components/section-card.md`: la variante `--emphasis` con il limite
  d'uso; `patterns/dashboard.md` e `patterns/workspace.md`: la profondità delle zone.
- Intestazione di `tokens.css` riallineata (era ferma a `v1.10.0`) e `meta.version` di
  `tokens.json` allineato alla versione del DS.
- `integration/streamlit-bridge.css` e `integration/streamlit-config.toml`: la colonna di
  contenuto Streamlit è dichiarata **sollevata** (resta bianca come prima) e la sidebar scende a
  neutral-100. Senza questa riga la pagina sarebbe diventata neutra con il contenuto posato
  direttamente sul fondo — il contrario della regola. `secondaryBackgroundColor` del tema nativo
  passa da `#f7f7f5` a `#efefec`: i progetti che hanno copiato `config.toml` devono **ricopiarlo**.

## 1.12.0 — 2026-07-29

Componente **`rg-file-card`** (documento caricato): oggetto **generico e riusabile** per «questa
entità ha un file caricato», additivo — **aggiornamento sicuro**. Nasce nel monorepo RG-PRODUCT-SUITE
per sostituire il documento fatto a mano (doppio titolo, paragrafo di troppo, controlli d'upload
sciolti), ma non è legato a un dominio: gli slot sono dell'app.

### Nuovi

- **`rg-file-card`** (componente) — due stati e una rivelazione progressiva.
  - **`rg-file-card--loaded`** (CARICATO): card compatta con **un solo titolo** = il nome del file
    (`rg-file-card__title`, mono, troncato con ellissi ma leggibile per intero via `title`/testo),
    uno slot badge (`rg-file-card__badges`) e uno slot azioni (`rg-file-card__actions`). Nessun
    secondo titolo, nessun paragrafo esplicativo.
  - **`rg-file-card--empty`** (VUOTO): la superficie aperta di `rg-empty` con **una sola azione
    primaria**.
  - **Rivelazione progressiva**: `rg-file-card__reveal` parte con `hidden` e contiene
    `rg-file-card__options` (opzioni di lettura, slot app) + `rg-file-card__confirm` (conferma, slot
    app); compaiono **solo dopo** che un file è stato scelto — nascosti davvero, non solo alla vista.
    Fonte di verità = `[hidden]` su `__reveal`, pilotato dall'app (al `change` del picker: nome nel
    titolo + `reveal.hidden = false`; su conferma/Ripristina torna a `true`).
- Il picker **non è rifatto**: è il meccanismo di `rg-file-input` (solo `rg-file-input__control`),
  con il bottone riportato a larghezza automatica dentro la card. Composto anche con `rg-badge` e
  `rg-button`. Nessun token nuovo.

## 1.11.0 — 2026-07-29

Utility **opt-in** per applicare il colore-label leggibile a micro-label «libere» (fuori da un
componente), senza `color` inline. Una classe, additiva — **aggiornamento sicuro**.

### Nuovi

- **`rg-u-text-label`** (utility) — applica `--rg-color-text-label` (neutral-800, ~14,8:1) a una
  micro-label libera, es. «MATERIALI IN APPOGGIO». **Opt-in**: NON è legata a `.rg-label`, che
  eredita il colore dal contesto e deve restare adattiva alle superfici scure (legare il token la
  renderebbe invisibile su fondo scuro). Da usare su superficie chiara.

## 1.10.0 — 2026-07-29

Mattoni per il **layout canonico della fase**: il contenitore-sezione di ogni tab, la convenzione
della colonna «Qtà», la riga dei materiali e la leggibilità delle micro-label. Additivo, tranne il
fix di contrasto (colore, non struttura) — **aggiornamento sicuro**.

### Nuovi

- **`rg-section-card`** — contenitore-sezione keystone di ogni tab: card con **header rigato**
  (titolo + didascalia opzionale + al più UNA `rg-button--primary` a destra) e corpo. Variante
  `--flush` per un corpo-tabella a filo dei bordi. MATCH: non `rg-card` (tessera di griglia), non
  `rg-section-header` (layout di pagina), non `rg-disclosure--boxed` (sezione richiudibile).
- **`rg-materials-row`** — riga che rende evidenti **presenza e numero** dei materiali di una fase
  (badge di conteggio + elenco con codice mono), con stato vuoto esplicito.

### Convenzioni

- **Colonna «Qtà»** (`components/tables.md`): regola unica — unità nell'header quando uniforme
  (`Qtà (m)`), per riga con `rg-table__unit`; il valore resta `rg-table__numeric`. Le tabelle
  smettono di divergere fra tab.

### Fix

- **Contrasto delle micro-label**: nuovo token `--rg-color-text-label` (neutral-800, ~14,8:1)
  applicato a `rg-modal__meta`, `rg-modal__row-label`, `rg-param-section__index`, `rg-card__eyebrow`
  — prima a neutral-600 (~6:1, tecnicamente AA ma deboli a ≤10px). Solo colore, nessun peso nuovo.

### Migrazione (consumatore)

- `fase`/`_tab_consumi` adottano `rg-section-card`, applicano la convenzione «Qtà» e i `<style>`
  residui spariscono; il `<dialog>` nativo converge su `rg-modal`. Edit lato product-platform.

## 1.9.0 — 2026-07-29

Modale canonica e riga di tabella espandibile — i due gap dell'audit «revisione-percorso». Additivo:
un token z-index, una variante di larghezza, una variante di riga; nessuna rimozione — **aggiornamento
sicuro**.

### Nuovi

- **`rg-modal--xl`** (960px) — modale larga per un confronto affiancato o una tabella. Tetto
  dichiarato: oltre, il contenuto è una pagina, non un modal.
- **`rg-table__row--expandable` + `rg-table__detail`** — riga-record che rivela in loco la propria
  scomposizione (una `<tr>` di dettaglio con `<td colspan>` su tutte le colonne), preservando la
  semantica tabellare. MATCH motivato: non `rg-step` (sequenza numerata) né `rg-disclosure` (sezione
  di pagina).
- **`--rg-z-lightbox`** (450) — nuovo livello z fra `--rg-z-modal` (400) e `--rg-z-toast` (500): un
  lightbox aperto dentro una modale ora ci sta **sopra** invece che dietro. `rg-lightbox` aggiornato
  (prima era a `--rg-z-overlay`, 300). Mezzo-passo additivo: nessun altro overlay si sposta.

### Canonizzazione

- `rg-modal-*` dichiarato **pattern unico** per le modali; il `<dialog>` nativo è deprecato come
  pattern, con **guida di migrazione** in `components/modal.md` per il consumatore.

## 1.8.0 — 2026-07-27

La mappa colore→ruolo impara a portare un **controllo per-riga** e nasce la forma **compatta** del
campo con unità. Additivo: due classi nuove, nessun token, nessuna rimozione — **aggiornamento sicuro**.

### Nuovi

- **`rg-color-map__aside`** — slot in coda a una riga di `rg-color-map`, allineato a destra, per un
  controllo che appartiene a quel colore (densità per-colore, override numerico, azione di riga). La
  terza colonna nasce solo se lo slot c'è: le mappe che non lo usano restano identiche.
- **`rg-field-with-unit--compact`** — forma compatta del campo con unità (~6.5ch, box unità ridotto),
  per una riga densa dove il campo è un accessorio. Da usare con `rg-input--numeric`; etichetta non
  visibile ma in `aria-label` (nomina il colore, dichiara unità e comportamento del vuoto).

## 1.7.0 — 2026-07-23

Il pannello di una tool impara **due archetipi di testa** e una regola d'accordion, così tool diverse
restano leggibili allo stesso modo. Solo regole e documentazione: nessun token, nessuna classe nuova,
nessuna rimozione — **aggiornamento sicuro**.

### Regole (`patterns/workspace.md`)

- **Ordine canonico, testa A vs B** (aggiorna la regola 1.5.0). La testa si apre con la *radice della
  catena di dipendenze*, scelta da una domanda: la misura del prodotto nasce dalla sorgente importata o
  è una decisione indipendente del tool? **Testa A** (sorgente-guidata, es. net-45): `Sagoma` con scala
  e misura reale → `Colori e ruoli`, senza un `Formato` separato. **Testa B** (formato-guidata, es.
  oblique/pattern-grammar): `Formato e scala` in cima → `Sagoma` (ritaglio opzionale) → `Colori e
  ruoli`. In entrambe: i gruppi del tool nel loro ordine, poi la coda fissa `Esportazione` e `Preset`.
- **Accordion.** La testa non si richiude mai (è l'ancora che non sparisce); corpo e coda sì. Default
  senza memoria: testa aperta, corpo tutto aperto se ≤ 5 sezioni, altrimenti solo il primo gruppo del
  corpo; coda chiusa. Lo stato aperto/chiuso si ricorda per tool.

### Vetrina

- Sezione 21 «Pannello di una tool — ordine canonico e accordion»: esempio di tool formato-guidata
  (testa B) con le sezioni richiudibili.

## 1.6.0 — 2026-07-22

Il **pannello di configurazione** diventa un pattern e il campo di un form impara due cose che il
DS dichiarava e non implementava. `rg-product-platform` doveva costruire i "Default costo ricamo"
(tariffa, velocità, tempi per operazione) e ha trovato tre buchi: `forms.md` elencava `read-only`
fra gli stati obbligatori ma nessuna riga di CSS lo rendeva, un campo numerico si stirava per tutta
la cella anche quando conteneva `1`, e il gruppo di parametri esisteva nel CSS e in vetrina dal
seed ma non nel registro — quindi per l'agente non esisteva. Nessun token nuovo, nessuna rimozione:
**aggiornamento sicuro**.

### Nuovi

- **`[readonly]` come stato reale dei campi** — `rg-input`, `rg-textarea`, `rg-search` e
  `rg-select[aria-readonly="true"]` hanno una superficie propria: fondo tecnico, bordo neutro,
  nessuna affordance in hover, **testo a pieno contrasto**. Read-only e disabled smettono di essere
  sinonimi: *disabled* = "non attivo ora, non inviato"; *read-only* = "valido, ma non modificabile
  da te", leggibile, selezionabile e nel tab order. Corollario documentato: il motivo si scrive
  accanto al form con `rg-alert`, e l'azione primaria che l'utente non potrà mai eseguire **si
  omette**, non si disabilita.
- **`rg-input--numeric`** — la forma del valore misurato: mono, cifre tabulari, allineato a destra
  e largo `--rg-input-numeric-width` (default `12ch`) invece che quanto il contenitore. Dentro
  `rg-field-with-unit` il riquadro dell'unità resta attaccato al campo. Sostituisce la composizione
  `rg-input rg-mono` nei campi numerici; quella resta valida per il testo tecnico (codici, ID).

### Registro

- **`control-group`** entra in `components.json`: `rg-parameter-group` + `__grid`,
  `rg-filter-group`, `rg-action-bar`, `rg-confirmation`. Il CSS c'era dal seed, il MATCH no.
  È la risposta a "form di configurazione a coppie etichetta/valore" quando i valori sono
  **editabili**; se sono di sola lettura il componente resta `rg-key-value--ruled`.

### Documentazione

- Nuovo `patterns/settings.md`: pagina di configurazione completa — provenienza dei valori
  dichiarata in testata (catalogo / valori di fabbrica), unità accanto a ogni campo, valori per
  riga in `rg-table`, esito con `role="status"` / `role="alert"`, stati sola lettura e sorgente
  non disponibile, e la trappola del `type="number"` con la virgola decimale.
- `components/forms.md`: sezioni "Campo numerico", "Sola lettura" e "Gruppo di parametri".
- Vetrina: sezione 04 con numerico e read-only affiancato a disabled; sezione 11 con il pannello
  di configurazione completo, la sua variante in sola lettura e lo stato di indisponibilità.

## 1.5.0 — 2026-07-22

Il **pannello di una tool** smette di essere composizione libera e prende un ordine. Con due tool
live nella suite `rg-embroidery-commons` (`net-45`, `pattern-grammar`) è emerso che gli stessi
argomenti stavano in posti diversi: il caricamento della sagoma era la sezione `01` in uno e stava
sepolto dentro il gruppo `05` nell'altro; la selezione per colore era `02` in uno e una riga persa
in fondo nell'altro. Difetto del DS, non delle app: il pattern `workspace` descriveva il guscio e
non diceva nulla su cosa mettere dentro il pannello, né in che ordine. Nello stesso vuoto le due
app avevano riscritto in locale, identici, il caricamento file e la mappa colore→ruolo. Nessun
token nuovo, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-file-input`** — caricamento file nella forma **compatta**, da riga di form: bottone a
  piena larghezza e riga di stato obbligatoria che dichiara nome, misura rilevata e metodo
  (`__status`, con `__status--error` per l'import fallito). Non sostituisce `rg-upload`, che resta
  l'area di rilascio grande di una pagina: le due forme convivono. Il controllo vero resta
  l'`<input type="file">` — opacità zero ma presente, quindi focusabile e tabulabile — e hover e
  focus raggiungono il bottone via `:has()`.
- **`rg-color-map`** — attribuzione di ciò che è stato importato: ogni colore o layer del file
  riceve un ruolo di lavorazione. Rende obbligatoria la regola §10 che entrambe le app violavano:
  **il campione non basta mai da solo**, accanto sta sempre il codice colore o il nome del layer
  in mono. Il colore è un dato letto dal file e arriva inline via `--swatch`, come in
  `rg-swatch__color`. Parti: `__row`, `__swatch` (+ `--none`), `__code`, `__meta`, `__target`,
  `__empty`.
- **`rg-param-section__index` / `__title`** — indice e titolo di una sezione del pannello, che le
  app rifacevano con stili inline. Il numero è mono, tabulare e secondario; il titolo è una label
  identitaria, non un H3 di pagina.
- **Sezione richiudibile del pannello** — composizione sancita
  `details.rg-param-section.rg-disclosure` + `summary.rg-param-section__header.rg-disclosure__trigger`:
  un solo filetto di chiusura, `+`/`−` del DS spinto a destra, testata con target di 40 px e focus
  visibile.

### Regola: ordine canonico del pannello

In `patterns/workspace.md`. Il pannello ha una **testa canonica** (`Sagoma` → `Colori e ruoli` →
`Formato e scala`), un **corpo libero** con i gruppi propri del tool **nel loro ordine**, e una
**coda canonica** (`Esportazione` → `Preset`). La coerenza fra tool non si ottiene imponendo gli
stessi gruppi — i parametri di generazione sono l'identità dello strumento — ma fissando l'ordine
e il titolo di ciò che ricorre.

Gli slot sono **posizioni, non contenitori**: uno slot assente non lascia buchi e la numerazione
resta contigua, perché il numero dice dove sei nel pannello, non quale slot è. Il test di
appartenenza segue l'ordine del lavoro (cosa entra → come lo interpreto → quanto è grande ciò che
produco → come lo genero → cosa mi porto via) e risolve il caso tipico di errore: «larghezza reale
mm» sembra un parametro di generazione ma senza file non vuole dire niente, quindi sta nella
sezione Sagoma. Codificato anche ciò che **non** sta nel pannello: le azioni vivono in
`rg-workspace__stage-header`.

### Documentazione

- Nuovi `components/file-input.md` e `components/color-map.md`.
- `patterns/workspace.md`: nuova sezione "Ordine canonico del pannello".
- `components.json`: `workspace` porta la regola nelle `notes`; `upload` dichiara il confine con
  `rg-file-input`.
- Vetrina: nuova sezione **21 — Pannello di una tool** (pannello completo nell'ordine canonico,
  più gli stati di `rg-file-input` e lo stato vuoto di `rg-color-map`).

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
