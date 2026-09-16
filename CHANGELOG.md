# Changelog — RG Design System

Versionamento semver. I consumatori si agganciano a un **tag**, mai a un branch.

- **major** — rimozione o rinomina di classi/token, cambio dell'ordine di import, modifica
  di un token permanente: richiede intervento nei prodotti.
- **minor** — nuovi componenti, nuove varianti, nuovi token additivi: aggiornamento sicuro.
- **patch** — correzioni che non cambiano il contratto.

## 1.17.0 — 2026-09-16

**La struttura della pagina, le azioni, l'identità delle parti.** Due tappe di armonizzazione. La
prima riguarda la sola struttura, qui sotto. La seconda, più in basso, porta icone, suggerimenti,
gruppi di azioni, l'identità delle parti e le etichette di sola lettura. Il DS era a v1.16.0 e i
difetti della prima tappa sono stati misurati su `rg-product-platform`:
- la testata di pagina esisteva in quattro forme;
- il percorso c'era in 8 pagine su 21;
- entrando in una fase non si capiva di quale parte e di quale prodotto fosse;
- un aiuto sotto un campo alzava il controllo rispetto ai vicini;
- i bottoni toccavano il bordo del contenitore.

Rilascio **additivo**: nessuna classe rinominata o rimossa, nessun token nuovo o cambiato. Tre
correzioni cambiano l'aspetto di classi esistenti, elencate in *Aggiornamento*.

### Componenti

- **`rg-page-header`** (con `__main`, `__heading`, `__context`, `__headline`, `__title`, `__status`,
  `__subtitle`, `__meta`, `__actions`): una sola testata per ogni pagina di un'app a pagine. Gli slot
  sono, in ordine: percorso, riga di contesto («Fase della parte **1296 DAV…** · **BOOK TOTE**»), H1
  con al massimo tre badge di stato, sottotitolo, meta in mono, zona azioni con al massimo una
  primaria. Sotto i 680 px le azioni vanno sotto il titolo.
  **Regola di navigazione**: il percorso è obbligatorio dal secondo livello in giù, e le pagine di
  primo livello raggiunte dalla topbar hanno solo il titolo. Il contesto è obbligatorio dal terzo
  livello. Mai `rg-topbar__back` e percorso nella stessa vista, e le tab non entrano nel percorso.
- **`rg-form-row`** con **`rg-form-row__actions`**: la riga di campi allineata sulla linea dei
  controlli. Aiuto ed errore stanno sotto il loro campo senza spostare i vicini e senza allargare il
  campo. I bottoni e le scelte della riga stanno sulla linea dei controlli.

### Varianti

- **`rg-toolbar--open`**: la barra senza fondo, sul filo della colonna. È la forma di chi voleva la
  toolbar allineata al testo.
- **`rg-section-card__inset`**: dentro un corpo `--flush`, il blocco che riprende la distanza
  ordinaria dai bordi.

### Correzioni

- **`rg-breadcrumb`**:
  - separatore mai doppio: dentro un `li` il `__sep` è nascosto, e il separatore generato ha testo
    alternativo vuoto;
  - forma canonica `nav` > `ol` > `li` con `aria-current="page"`;
  - link alti 40 px e sottolineati a riposo;
  - AGNext a 14 px al posto del corpo a 12, come ogni navigazione.

  La forma piatta `nav` > `a` + `span.__sep` + `span.__current` resta valida.
- **`rg-toolbar`**: padding orizzontale 16 px. Il fondo bianco sul fondo di pagina è un bordo, e il
  primo e l'ultimo bottone lo toccavano.
- **`rg-section-card--flush` con `rg-steps`**: la sequenza rientra di 16 px per lato, mentre il
  filetto nero sopra e sotto resta da bordo a bordo. Il numero di fase, o la graffa di un
  gruppo, si allinea al titolo della testa.

### Regole

- `design-rules.md` §5: **Distanza delle azioni dal bordo**. Un'azione non tocca mai il bordo del
  suo contenitore:
  - minimo 12 px nelle righe dense, 16 px ai lati delle barre, 24 px nei contenitori di contenuto;
  - su una superficie aperta vale l'allineamento, non la distanza.

### Documentazione

- `components/page-header.md`: nuovo, con la regola di navigazione e la migrazione delle quattro
  testate.
- `components/navigation.md`: sezione *Breadcrumb* vera, con markup, separatore, area cliccabile e
  compatibilità.
- `components/forms.md`: *Riga di campi* (dove va l'aiuto in una riga orizzontale) e *Barra di
  strumenti*.
- `components/section-card.md`: *Corpo a filo e distanza dai bordi*.
- `components/file-card.md`: perché la radice non ha padding, e dove metterla.
- `patterns/appshell.md`, `patterns/settings.md`: la testata è `rg-page-header`.

### Aggiornamento

Sicuro, con tre cambi d'aspetto su classi esistenti:

1. **`rg-breadcrumb`** passa da 12 a 14 px in AGNext, con link sottolineati e riga alta 40 px. Il
   markup attuale non va toccato. Dentro `rg-page-header` si toglie `rg-u-mb-6`.
2. **`rg-toolbar`** rientra di 16 px ai lati. Chi la voleva a filo della colonna usa `rg-toolbar--open`.
3. **`rg-steps` dentro `rg-section-card--flush`** rientra di 16 px ai lati.

`rg-section-header` e `rg-cluster--end` non cambiano.

### Seconda tappa — azioni, icone, identità delle parti

Decisioni dell'utente, entrambe dentro le regole:
1. **Icone**: icona + suggerimento per le azioni frequenti o secondarie; la primaria resta icona +
   testo; nessuna icona senza nome accessibile.
2. **Colore**: un colore d'identità per le **parti** di un prodotto, sempre accanto al nome e con un
   segno non cromatico. Gli stati restano sui colori semantici, e nessun colore fa gerarchia.

Nessun token nuovo. Nuovo file servito: `icons/rg-icons.svg`, che richiede un mount in più nell'app.

#### Componenti

- **Set di icone `rg-icon`** (beta), con `--md` e `--lg`: 34 icone disegnate per RG, nessun codice di
  terzi. Griglia 24, area viva 3–21, tratto 1,5 a capi quadri, colore da `currentColor`. Sostituiscono
  i caratteri e le emoji nei bottoni (🔗 ✎ ⟳ ↓ ← → ✕ ✓ ⚑ ⚠ ⓘ). Nomi per azione: `modifica`,
  `elimina`, `apri`, `apri-esterno`, `aggiungi`, `chiudi`, `salva`, `indietro`, `avanti`, `scarica`,
  `carica`, `stampa`, `documento`, `fascicolo`, `etichetta`, `costo`, `collega`, `scollega`,
  `copia`, `nuova-versione`, `ruota`, `ricarica`, `ripristina`, `filtro`, `togli-filtri`, `ordina`,
  `cerca`, `avviso`, `errore`, `conferma`, `segnala`, `immagine`, `informazione`, `altro`.
- **`rg-tooltip`** (con `__text`, `--below`, `--start`, `--end`): è il nome visibile di un bottone a
  sola icona (`aria-labelledby`), oppure la descrizione di un bottone col testo (`aria-describedby`).
  Senza JS compare a hover e a focus da tastiera, e si può percorrere col puntatore. Escape lo chiude
  con un controller di sei righe, facoltativo.
- **`rg-action-group`**: una fila di azioni affini. Due gruppi consecutivi sono separati da un
  filetto, ed è lì che sta l'azione distruttiva.
- **`rg-action-menu`** (con `__trigger`, `__list`, `__item`): il menu «Altre azioni» su `<details>`,
  solo per azioni secondarie e non distruttive.
- **`rg-part-mark`** (con `--small`), **`rg-part--1…14`**, **`rg-part--quiet`**, **`rg-part-label`**,
  **`rg-part-edge`**: l'identità delle parti di un prodotto.
  - L'app passa l'indice, il DS mette colore e lettera d'ordine.
  - Le prime quattro parti non usano mai i colori che coincidono con uno stato.
  - Dall'ottava parte il colore ricomincia, e la pastiglia vuota e il filetto tratteggiato fanno da
    segno in più. Dalla quindicesima si passa al grigio.

#### Varianti

- **`rg-icon-button--full`**: il bottone a sola icona da 40×40. La base da 34 resta per le liste
  dense.
- **`rg-table__actions`**: la cella delle azioni di riga, a sola icona con suggerimento.
- **`rg-key-value--inline`**, con **`rg-key-value__pair`** e **`__pair--distinct`**: identificativi e
  classificazione in testata. Sostituiscono le etichette fatte a mano con stili inline. La variante
  del proto si distingue con contorno e peso, non col fondo nero. Qui non serviva un componente
  nuovo: sono coppie termine-valore.

#### Correzioni

- **`rg-operation-row`**: le azioni della riga si posano sulla linea dei controlli e non più sul
  piede della riga. La coda della riga diventa `rg-form-row`, e un aiuto o un errore sotto un campo
  non sposta più né i vicini né le azioni.

#### Regole

- `design-rules.md` §4, *Identità delle parti*: assegnazione per posizione, sempre col nome e con la
  lettera, mai gerarchia né stato, grigio dove governano gli stati.
- `design-rules.md` §7: un solo set di icone, nessuna icona senza nome, nessun carattere al posto di
  un'icona.
- `components/buttons.md`, *Icona, testo o entrambi*: quando sola icona, quando icona + testo, quando
  solo testo.

#### Documentazione

- Nuovi: `components/icons.md`, `components/tooltip.md`, `components/action-group.md`,
  `components/part-mark.md` e `icons/README.md` (regole di disegno, provenienza).
- Aggiornati:
  - `components/buttons.md`, `components/lists.md`, `components/tables.md` (azioni in riga);
  - `components/technical-data.md` (variante in linea);
  - `components/operation-row.md`;
  - `integration/fastapi.md` (mount `/ds/icons`).
- `tools/ds-lint.mjs`: fallisce se un doc, un esempio o uno snippet cita un'icona che non c'è nello
  sprite.

#### Aggiornamento (seconda tappa)

1. **Nell'app** aggiungere il mount delle icone:
   `app.mount("/ds/icons", StaticFiles(directory=DS_DIR / "icons"))`.
2. **`rg-operation-row__actions`** si allinea alla linea dei controlli. Senza aiuti né errori non
   cambia niente. Se i campi della riga vanno a capo su più righe, le azioni restano sulla prima.
   Nella coda, `rg-cluster rg-cluster--end` → `rg-form-row`.
3. Tutto il resto è additivo: `rg-icon-button` a 34 px, `rg-key-value` e `rg-key-value--ruled` non
   cambiano.

### Terza tappa — la pagina della fase

Il giudizio sulla pagina del ricamo con le tappe 1 e 2: *«la testata della fase, in questo caso Ricamo
Normale, non è chiara per niente. […] La testata possiamo lasciarla simile e comprimerla, ma poi
ricamo normale va sotto e va fatto capire che è una fase e deve avere qualche cosa che mette insieme il
titolo con quello che c'è sotto. E anche riferimento alla fase: il numero di fase è scomparso»*.

Nessun token nuovo. Due alternative valutate:
- **la testa titolata**, implementata;
- **una linguetta anche per la fase da sola**, scartata: una linguetta sola si legge come una scelta
  senza alternative, e il titolo a 14 px non regge da titolo della pagina.

#### Varianti

- **`rg-page-header--compact`**: testata compressa per le pagine il cui soggetto sta in un blocco sotto.
  Contiene percorso e riga di contesto sul contenitore («Parte · prodotto»), senza titolo visibile e
  senza azioni sul soggetto.
- **`rg-phase-panel`, testa titolata**. È il blocco della fase, lo stesso per il ricamo, per la fase
  generica e per la principale di un gruppo:
  - **`__heading`**, **`__num`**: il numero invertito, lo stesso segno e lo stesso numero di
    `rg-step__num`;
  - **`__name`**, **`__kind`**: «Fase N di M», con la relazione se c'è;
  - **`__title`**: il nome della fase;
  - **`__meta`**, a riga intera: il riepilogo (materiali · stop · fili · origine dei dati).
- **`rg-phase-panel__sections`**: le tab di sezione attaccate sotto la testa, da bordo a bordo.
- **`rg-phase-panel__intro`**, **`__actions`**, **`__subsection`**: le sezioni appiattite, al posto
  delle `rg-section-card` dentro il blocco.

#### Regole riviste (`components/phase-switch.md`)

- **Titolo della fase.** Sta sempre nella testa del blocco. In un gruppo sta anche sulla linguetta,
  che è il comando per sceglierla. Prima: «il titolo non si ripete nel pannello», e per la fase senza
  gruppo «il titolo è l'H1 della pagina».
- **Numero.** C'è sempre, anche con una fase sola.
- **Intestazioni.** Un solo H1: il titolo del blocco se la pagina mostra una fase. In un gruppo l'H1
  sta nascosto nella testata compressa, e ogni blocco ha il suo H2.
- **Section card.** Nessuna nel blocco. La sezione comincia con `__intro`, i blocchi interni sono
  `__subsection`. `rg-file-card`, `rg-table`, `rg-alert` e `rg-disclosure--boxed` sono ammessi.
- **Posizioni fisse.**
  - «Elimina fase» sta sempre nel piede del blocco, anche per il ricamo.
  - `rg-part-edge` sta sulla testata compressa, mai sul blocco.

#### Documentazione

- `components/phase-switch.md`:
  - *La testa titolata (1.17.0)*;
  - l'esempio completo della pagina del ricamo;
  - *Appiattire le sezioni*, la tabella «oggi → nel blocco» per i partial delle tab.
- `components/page-header.md`: *Testata compressa*.
- Vetrina `#phase-switch`: testata compressa e testa titolata negli esempi del gruppo, più il ricamo
  completo.

#### Aggiornamento (terza tappa)

1. **`rg-phase-panel` con la markup della 1.16** (meta nella testa, senza `__heading`) si vede come
   prima. Le classi nuove sono additive.
2. **`rg-phase-panel__meta`** ha ora il separatore con testo alternativo vuoto: nessun cambio a vista.
3. **Pagina della fase nell'app**:
   - la testata passa a `rg-page-header--compact`;
   - il titolo va nel blocco;
   - le `rg-section-card` delle cinque tab del ricamo si appiattiscono secondo la tabella del doc.

### Quarta tappa — numeri delle parti, testata della fase, barra della scheda

Tre cose, dal giudizio di chi usa la piattaforma con le tappe 1–3.

#### Identità delle parti: numeri al posto delle lettere

*«Non sono convinto delle lettere per le parti, preferirei i numeri anche se so che poi vanno in
conflitto con i numeri delle fasi.»* La lettera era arbitraria due volte: non è l'iniziale del nome, e
in reparto nessuno dice «la parte B». Il conflitto col numero di fase si risolve sulla **forma**:

| | Parte | Fase |
| --- | --- | --- |
| Figura | tonda | quadrata |
| Misura | 20 px (16 nel percorso) | 32 px |
| Colore | categoriale | nero |
| Parola | «Parte» | «Fase N di M» |

Nessun cambio di markup: le stesse classi `rg-part--N` producono ora il numero.

#### Testata della pagina della fase, rivista

*«Schiacciata […] vedo due volte dei dati come il nome […] non vedo mai però il codice dell'articolo
[…] tutto troppo attaccato e gerarchie non chiare.»*

- **Respiro**: 12 px fra percorso e identità, 32 px sotto la testata.
- **Niente ripetizione**: il percorso naviga e tiene i nomi; la nuova riga `rg-page-header__identity`
  dichiara il soggetto (la parte) e non ripete il prodotto.
- **I codici dell'articolo** (codice RG, codice prodotto) in `rg-key-value--inline`: in reparto
  l'articolo si chiama così, e prima non comparivano.
- **Gerarchia dichiarata**: percorso 14 px → identità della parte 20 px → titolo della fase 28 px.
- Nuovi elementi: `rg-page-header__identity`, `rg-page-header__subject`, `rg-page-header__subject-kind`
  (la parola «Parte»).

#### Barra della scheda

*«In Sequenza stop […] vedo solo compila scheda. Poi dove invece le schede ci sono, la prima riga dei
bottoni in scheda macchina deve essere uguale a quella di sequenza stop.»*

- **`rg-file-card--bar`**: lo stesso documento richiamato in più sezioni diventa una riga identica, in
  cima a ogni sezione che lo usa, in entrambi gli stati.
  - Con il PDF: nome, badge, Visualizza scheda · Scarica PDF · PDF caricato · Parti collegate · Carica
    un'altra scheda… e la primaria **Compila scheda**.
  - Senza PDF: «Nessuna scheda su questa fase.», Compila a mano e la primaria **Carica la scheda**. Le
    azioni che non esistono si omettono.
- **`rg-file-card__icon`**: l'icona del documento nella riga.
- «Torna alla prima lettura» passa **nel piede del blocco della fase**, con gli altri gesti sulla fase.
- Nella sezione «Scheda macchina» la `rg-file-card` piena sparisce: la barra porta nome, badge, azioni
  e la rivelazione delle opzioni di lettura.

#### Aggiornamento (quarta tappa)

1. **Parti**: nessun intervento, cambiano segno e forma da sé. Solo i testi fissi che dicono «parte A»
   vanno riscritti.
2. **Testata della fase**: la riga `rg-page-header__context` va sostituita da `__identity` con
   `__subject` e i codici; `--compact` da sola dà già il respiro nuovo.
3. **Sezioni della fase**: la barra della scheda va messa in cima alle sezioni che lavorano sul
   documento, e le stesse azioni vanno tolte dall'intro e dalla vecchia `rg-file-card`.

## 1.16.0 — 2026-09-15

**Le fasi collegate.** Una fase principale (una stampa, una pressatura) ha ora 1–3 fasi collegate
subito prima o subito dopo, che si compilano dalla sua pagina. Il giudizio di chi le usa: *«tutto
sembra una fase, poi entri e sei in un'altra fase. Le tab interne sono tutte uguali. E fuori è
difficile capire se ci sono davvero fasi collegate o no»*. Rilascio **additivo**: nessuna classe
rinominata, nessuna rimozione, nessun token nuovo o cambiato.

### Varianti

- **`rg-steps--grouped`, `rg-step--group`, `--group-start`, `--group-end`, `--principal`,
  `rg-step__role`**: il gruppo nella sequenza, **senza annidare `rg-step`**. Tre segnali senza
  colore:
  - una **graffa** nera coi capi chiusi a sinistra dei numeri;
  - un **dente** dalla graffa al numero della principale: le collegate sopra stanno prima, quelle
    sotto stanno dopo;
  - il **ruolo** in testo sopra il titolo.

  Scartate con motivazione: il `<li>` di gruppo con un `<ol>` interno (annidamento, e l'ordine
  letto dallo screen reader non torna); la numerazione 2a/2b (il numero di posizione è un dato, e il
  foglio dice «fase 3 di 4»); la riga-intestazione di gruppo (in una `<ol>` sarebbe una fase finta).
- **`rg-worksheet-block__role`**: lo stesso ruolo sul foglio stampato, con il suo pezzo di graffa. Su
  carta i blocchi di un gruppo possono finire su due pagine, quindi ogni blocco dice il gruppo per
  conto suo.

### Componenti

- **`rg-phase-switch` / `rg-phase-panel`** (beta): la pagina di una fase è un pannello, con testa
  (posizione, relazione, stato del costo, timbro di reparto), sezioni in `rg-tabs` e gesti sulla
  fase nel piede. Se la fase è la principale di un gruppo, sopra il pannello ci sono le linguette
  delle fasi del gruppo: la scelta è bianca e attaccata al pannello, sotto la graffa dell'elenco
  ruotata, con la didascalia «Fasi del gruppo» e il dente sulla principale. Il fondo è il segno della
  scelta e di nient'altro; l'hover cambia bordo e sottolinea. Nel pannello non ci sono card, e il
  titolo della fase non si ripete. Le tab di un controllo sono sorelle dello stesso tipo (NN/g,
  *Tabs, Used Right*). Tablist ARIA con roving tabindex, commutazione client-side in un solo form.

  **Rivisto prima del rilascio.** La prima forma, striscia di segmenti più testa «Stai compilando»
  (`rg-phase-head`), è stata provata in `rg-product-platform` e scartata: *«due cose strane che non
  si capisce se sono fasi o altro»*, *«lo sfondo grigio è uguale al colore degli hover»*.
  `rg-phase-head` non esiste più.

### Correzioni

- **`rg-choice`**: la misura 16×16 vale solo per `input[type=checkbox]` e `input[type=radio]`. Il
  selettore era `input` nudo, e un campo di testo dentro una scelta usciva largo 16 px.
- **Larghezza dichiarata (`rg-field--w4…w24`)**: la misura è del **controllo**. Il campo è largo
  quanto la sua etichetta, mai meno della misura, e l'etichetta non va più a capo sopra i 680 px.
  Fino alla 1.15 «Pezzi per ciclo (n)» andava su due righe sopra una casella da quattro cifre, e la
  riga dei campi perdeva l'allineamento.
- **`rg-dept-band--quiet`**: la figura del reparto in grigio, per lo schermo. Il colore del reparto
  a schermo convive con i colori di stato, e `category-3` è `danger`.

### Documentazione

- `components/steps.md`: sezione *Gruppo di fasi collegate*.
- `components/phase-switch.md`: nuovo.
- `components/worksheet-block.md`: *Ruolo nel gruppo*.
- `components/navigation.md`: *Local tabs* rimanda a `rg-phase-switch` per il livello sopra le
  sezioni.

### Aggiornamento

Sicuro. Chi non usa le classi nuove vede tutto come prima.

## 1.15.0 — 2026-09-04

**La scheda da compilare.** Il giudizio di chi la usa era netto: *«spazi messi a caso, non è una
bella scheda da compilare, ci vuole troppo scroll»*. Il difetto non era estetico. Una sequenza
piatta di `rg-field` dentro una griglia `1fr 1fr` produce tre problemi insieme — tutti i campi
larghi uguale (un tempo da tre cifre occupa mezza pagina), le distanze fra campi e fra gruppi
identiche (e allora non ci sono gruppi, c'è un elenco), e un'operazione da tre campi che occupa due
righe invece di una. Rilascio **additivo**: nessuna classe rinominata, nessuna rimozione, nessun
token cambia valore.

### Perché

Il DS aveva la forma **stampata** della scheda di lavorazione (`rg-worksheet-block`,
`rg-fill-field`, dalla 1.14.0) e la forma in **sola lettura** della sequenza (`rg-steps`). Non
aveva la forma **compilabile**: quella la ricostruivano le app con `rg-parameter-group__grid`, che
è il gruppo di parametri di configurazione — un'altra cosa, con un'altra densità e un altro ritmo.

### Componenti

- **`rg-operation-row` / `rg-operation-list`** — la sequenza di lavoro compilabile. Righe rigate
  su superficie aperta, **testa in colonna** (indice e nome incolonnati, l'occhio scorre la
  sequenza in verticale) e **coda che scorre** (i campi larghi quanto il contenuto, a capo solo
  quando non entrano). Variante `--repeat` per la ripetizione della riga precedente — la stampa in
  composito è due passate, bianco e poi colore.
  Le due decisioni motivate: **non è una `rg-table`**, perché le operazioni non hanno le stesse
  colonne e una tabella porterebbe l'unione dei campi, cioè una matrice quasi vuota dove i buchi si
  leggono come dati mancanti; **non è una card per operazione**, perché cinque riquadri sono cinque
  cornici, più cromo e più scroll per lo stesso contenuto.

### Varianti

- **`rg-field--w4 | --w8 | --w16 | --w24 | --grow`** — la **larghezza dichiarata**. Il numero nel
  nome è il numero di caratteri attesi. La larghezza di un campo è un'affermazione su quanto
  contenuto ci si aspetta, non una scelta estetica: un campo largo mezza pagina per contenere `2`
  chiede a chi compila di ricontrollare di aver capito la domanda. Senza modificatore il campo
  resta fluido, come prima.
- **`rg-field__mark`** — **dichiara una volta, marca molte**. «Questo campo entra nel costo» vale
  per cinque campi su dodici: ripeterlo in un `rg-field__help` sotto ognuno è rumore, e in lettura
  assistita è la stessa frase riletta a ogni campo. L'istruzione di gruppo si dà una volta in testa
  al gruppo e si lega ai controlli con `aria-describedby`; nell'etichetta resta un carattere, non
  un colore.

### Pattern

- **`patterns/worksheet-entry.md`** — la scheda di lavorazione da compilare: le cinque decisioni di
  layout (una colonna di compilazione con campi larghi quanto il contenuto; due gruppi divisi per
  *quando* si compila, non per com'è fatto il catalogo; quando la disclosure aiuta e quando fa
  danno; la sequenza come lista di righe; il costo dichiarato una volta), il comportamento da
  tastiera, e le fonti da cui derivano.

### Documentazione

- **`components/forms.md`** — tre sezioni nuove: *Larghezza dichiarata*, *Marcatore di campo*,
  *Campi numerici: `inputmode`, non `type="number"`*, più *Ordine di tabulazione in una scheda
  lunga*.
- **`type="number"` non è più la forma raccomandata** per un valore che si scrive a tastiera in una
  pagina lunga, e gli snippet sono stati aggiornati a `type="text" inputmode="decimal|numeric"`.
  Quattro difetti documentati dalla ricerca del team GOV.UK Design System: non dettabile con
  Dragon; annunciato da NVDA come *spin button* con due bottoni senza etichetta; arrotondamento ed
  esponenziale sui valori grandi premendo le frecce, **senza annullamento possibile**; lettere
  scartate in silenzio. E il quarto, che è quello che pesa in reparto: **la rotellina del mouse
  cambia il valore** di un campo che ha il focus, mentre una scheda si compila scorrendo.
  `type="number"` resta ammesso per un valore davvero incrementabile con uno stepper.

### Aggiornamento

Sicuro. Nessun consumatore deve cambiare markup: chi non usa le classi nuove vede la pagina
identica a prima. Chi vuole la scheda corretta sostituisce `rg-parameter-group__grid` con
`rg-operation-list` sulle operazioni e aggiunge i modificatori di larghezza ai campi.

## 1.14.1 — 2026-09-03

**La palette categoriale entra nelle regole di design.** La 1.14.0 ha introdotto
`--rg-color-category-1..7` documentandola in `tokens.css`, `components.json` e
`components/dept-band.md` — cioè nei token e in un componente, ma **non in `design-rules.md`**,
che è la Costituzione visiva e il primo documento che il README dice di leggere. Una palette è
un concetto di sistema, non un dettaglio di `rg-dept-band`: chi domani deve colorare sette serie
di un grafico legge §4, ci trova solo permanente e stagionale, e reinventa gli HEX — esattamente
il problema per cui la palette è nata.

Nessun CSS, nessun token, nessuna classe: **patch, si aggiorna il pin e basta.**

### Documentazione

- **`design-rules.md` §4** — la palette categoriale, i suoi tre vincoli (mai stato/azione/
  navigazione/focus; mai unico segnale; nessun colore nuovo nel brand, solo alias) e il rimando a
  `dept-band` come applicazione di riferimento.
- **La sovrapposizione con gli stati, scritta dove si legge.** `category-3/4/5` *sono*
  `danger/warning/success`: categorie e stati non si mescolano nella stessa vista senza una
  ragione dichiarata. Il vincolo esisteva già nel commento di `tokens.css`, dove però lo trova
  solo chi apre i token.
- **Il tetto di sette, e perché.** Una categoria in più chiede un segno in più — una trama, una
  figura — non un colore in più: oltre il settimo la distinzione non regge in scala di grigi né
  in fotocopia, che è come queste schede vengono lette davvero. Generalizza a regola di sistema
  il terzo limite dichiarato in `dept-band`.

## 1.14.0 — 2026-09-03

**La carta entra nel design system.** Tre componenti nuovi e una palette nuova per un caso che il
DS non copriva: le **schede di lavorazione** che oggi sono cartacee. Un prodotto ha più parti, ogni
parte ha più fasi, ogni fase appartiene a uno dei sette reparti; i fogli escono dalla stampante,
vanno in reparto, l'operatore ci scrive sopra a penna i valori mancanti, e tornano all'ufficio
prodotto. Rilascio **additivo**: nessuna classe rinominata, nessuna rimozione, nessun token
esistente cambia valore. Si sale e basta.

### Perché

Nei 36 componenti della 1.13.0 non c'era niente per un documento stampato. C'erano `.rg-u-no-print`
e un `@media print` che toglieva topbar e sidebar — cioè il minimo per non stampare il chrome — e
nient'altro. Tutto quello che riguarda la carta mancava, e mancava in un modo che ogni prodotto
avrebbe risolto in locale, ognuno a modo suo:

1. **Nessuna unità di stampa.** Un elenco di fasi stampato senza regole di paginazione si spezza
   dove capita. In reparto il retro del foglio non lo gira nessuno: **mezzo blocco è peggio di
   mezza pagina bianca**. E l'altro errore era simmetrico — dare una pagina intera a ogni fase,
   quando la maggior parte delle fasi ha poco da dire, vuol dire sprecare carta.
2. **Nessun modo di dire "questo foglio è di quel reparto"** che sopravviva alla fotocopia. Il
   foglio viene quasi sempre copiato in bianco e nero: qualunque codifica affidata al solo colore
   arriva in reparto già persa.
3. **Nessun campo da compilare a mano.** È il caso centrale: la scheda esce con dei buchi
   **apposta**, e in tutto il DS non c'era niente che facesse sembrare un buco *voluto* invece che
   un errore di rendering o un dato non caricato. `rg-field` non serve: ha input, focus ed errore,
   cose che su un foglio di carta non esistono.
4. **Nessuna palette per distinguere sette cose pari-ordinate.** C'erano quattro colori di *stato*
   (che hanno un significato) e quattro accenti stagionali (di cui tre usabili). Chi doveva
   distinguere sette reparti — o sette serie di un grafico, o sette layer — finiva per inventare
   HEX in locale.

### Aggiunto

**`rg-worksheet-block` — blocco di lavorazione stampabile** ([doc](components/worksheet-block.md)).
Un blocco = una fase. Due decisioni portano tutto il resto: **non occupa una pagina intera** (i
blocchi si impaginano uno dopo l'altro, il blocco non dichiara nessuna altezza) e **non si spezza
mai fra due pagine** (quello che non entra scende intero alla pagina dopo). Variante
`--long` per la fase con la tabella di trenta righe, che una pagina se la prende tutta: apre una
pagina nuova invece di lasciarsi dietro un buco, e se è il primo blocco non lascia una pagina vuota
prima. Il riquadro è un'eccezione dichiarata a §6: su carta fa il lavoro che a schermo fa l'hover.

**`rg-dept-band` — banda di reparto** ([doc](components/dept-band.md)). **Tre segnali ridondanti**,
sempre tutti e tre, perché il colore è quello che si perde per primo: **(a)** il colore del
reparto, acceleratore per trovare il foglio nel mucchio; **(b)** il nome in maiuscolo sulla banda,
che è *contenuto del markup* e non `content:` generato; **(c)** la **figura**, l'unico dei tre che
sopravvive intatto alla scala di grigi.

Il criterio della figura è arrivato dal reparto e ha cambiato il componente: non
**distinguibile**, ma **riconoscibile**. Sette trame geometriche qualsiasi si distinguono — e poi
vanno imparate a memoria. Una trama che evoca il lavoro del reparto si riconosce al primo colpo, e
chi pesca il foglio dal mucchio non deve ricordarsi che il tratteggio a 45° era la stampa. Quindi:
**pois** per gli strass (sono strass), **punto croce** per il ricamo, **due registri** per Stampa,
Laser e HF (in alto gocce d'inchiostro e punte di laser alternate, in basso due linee: i mestieri
sono due e la figura li nomina entrambi), **le due piastre** per la pressatura, **bandiera a
scacchi** per il finissaggio (il traguardo: è l'ultimo reparto), **strisciate di spalmatura** per le
incollature, **due linee appaiate** per gli accoppiaggi.

Regola derivata: due reparti non stanno mai nella stessa **famiglia di segno** — croci, due
registri, dorsi, pois, scacchiera, diagonale, coppie. E una famiglia non la fondano né il **verso**
(una diagonale a 45° contro una a −45°, dopo una fotocopia e a dimensione di banda, è la stessa
cosa) né il **tono** (due figure fatte di barre verticali si somigliano anche se una è scura e
l'altra chiara).

**`rg-fill-field` — campo da compilare a penna** ([doc](components/fill-field.md)). La riga è una
**staffa a L**: dice dove inizia e dove appoggia la scrittura, cosa che uno spazio vuoto non fa e
che un rettangolo pieno direbbe male. La base è **nera** — è la riga su cui si scrive, deve
sopravvivere alla fotocopia e come oggetto grafico essenziale vuole almeno 3:1, mentre
`--rg-color-border-medium` su bianco si ferma a ~2,8:1; il tratto verticale sinistro resta
intermedio. L'altezza è quella della **mano**, non quella di una riga di testo: 32 px (~8,5 mm),
48 px con `--tall`. Varianti `--tall`, `--inline` e `--cell` per la forma «riga di tabella con
celle vuote da riempire»: trenta righe da riempire sono una tabella, non trenta campi.

**Palette categoriale `--rg-color-category-1…7`.** Sette valori pari-ordinati per distinguere
categorie fra cui non esiste gerarchia. **Nessun colore nuovo entra nel brand**: sono alias di
valori già in palette, e l'alias serve a dichiarare che lì il valore vale come *categoria* e non
come *significato*. Vincoli scritti nel token: mai per stato, azione, navigazione o focus; mai
unico segnale.

**Stampa, in `rg-utilities.css`** — l'unico `@media print` del DS, **esteso e non duplicato**:
regole di paginazione dei blocchi (con le proprietà legacy `page-break-*` accanto a quelle moderne,
perché i motori PDF server-side non le implementano tutte), `print-color-adjust: exact` sulla banda
(senza, il browser butta via gli sfondi e la banda perde due segnali su tre), e la geometria di
pagina **opt-in** `@page rg-a4` + `.rg-u-print-a4`. Il formato è un fatto del documento, non di un
componente: imporlo a tutti i prodotti vorrebbe dire decidere al posto di chi stampa una tabella in
orizzontale.

### Eccezioni dichiarate (regole §12)

- **Il riquadro del blocco** — §6 dice di non incorniciare tutto. Ambito: documenti stampati; su
  carta il riquadro è ciò che rende il blocco separabile dal successivo.
- **La trama della banda** — è un `repeating-linear-gradient` a stop netti, e §2 vieta i gradienti
  *decorativi*. Qui la campitura **porta informazione**, ed è l'unica delle tre che sopravvive alla
  fotocopia.
- **I millimetri di `@page`** — la scala di spazio del DS è in px e non descrive un foglio di
  carta. La misura è fisica solo lì, e solo lì è in mm.

### Limiti noti

- Un `rg-worksheet-block--long` che **sfora comunque** il foglio si spezza fra righe con
  l'intestazione della tabella ripetuta, ma **la banda di reparto non si ripete**: la pagina di
  continuazione perde il segnale di reparto. Non è risolvibile in CSS. Una fase che produce più di
  una pagina di tabella va spezzata a monte in due blocchi, ciascuno con la sua banda.
- `--rg-color-category-3/4/5` valgono quanto `danger`, `warning` e `success`. Su una scheda
  stampata non c'è nessun colore di stato accanto e il nome è scritto sulla banda, quindi una banda
  rossa non si legge come «errore». In una vista **a schermo** dove convivono alert e badge di
  stato, quella lettura va decisa prima.
- Le sette varianti di `rg-dept-band` portano il nome dei sette reparti RG: è un accoppiamento
  all'organigramma, dichiarato. Un ottavo reparto è un'ottava variante nel DS — con una figura di
  una **famiglia di segno non ancora usata**, altrimenti il criterio decade; la mappa reparto →
  variante vive nell'app.
- `rg-dept-band--stampa` è la figura più stretta: i due registri stanno in ~30 px di area utile
  **senza margine**. Se la banda si abbassa è la prima che si impasta, e va rifatta, non compressa.
- Le figure valgono per **questi** sette mestieri. Un prodotto RG che dovesse usare la banda per
  categorie non-manifatturiere non erediterebbe nessuna evocazione: lì la palette categoriale resta
  valida, il repertorio di figure no.
- `rg-fill-field` non è un controllo: in lettura assistita porta la sola etichetta, perché non c'è
  nessun campo da annunciare. È coerente col supporto, ed è la ragione per cui la versione a
  schermo della stessa scheda **deve** usare `rg-field`.

### Migrazione

Nessuna. Additivo puro: nessun markup esistente cambia. L'unica nota per chi stampa è che
`rg-utilities.css` non è più omettibile in un prodotto che produce documenti: la paginazione vive lì.

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
