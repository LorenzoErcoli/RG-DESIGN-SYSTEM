# Navigation

## Scopo

Rendere evidente posizione, ambito e passaggio tra strumenti RG senza competere con il contenuto.

## Varianti

- **Global header**: marchio RG, nome prodotto, strumenti principali e profilo.
- **App topbar (`rg-topbar--app`)**: barra superiore dell'applicazione su superficie chiara —
  ritorno/identita a sinistra, titolo dello strumento corrente, azioni o meta a destra.
- **Sidebar**: sezioni stabili di applicazioni complesse.
- **Local tabs**: viste sorelle della stessa entità.
- **Breadcrumb (percorso)**: la catena dei genitori di una pagina dal secondo livello in giù (v1.17.0,
  vedi la sezione *Breadcrumb* e la regola di navigazione in [page-header](page-header.md)).
- **Pagination**: dataset e risultati.

## Uso e limiti

Navigazione nera/bianca; mai palette stagionale come selezione principale. Lo stato attivo usa peso, linea o inversione, non solo colore. Evitare più di due livelli persistenti e menu hamburger su desktop senza necessità.

## Struttura

```text
[RG] [Nome strumento]  Archivio  Consumi  Regole                 [Ricerca] [Profilo]
                       ────────
```

AGNext per label. Header desktop 64 px (`--rg-layout-header`). Su mobile preservare nome prodotto, azione primaria contestuale e accesso al menu. Breadcrumb non sostituisce il titolo pagina.

### Breadcrumb

Il percorso dice **dove si trova la pagina nella gerarchia**: Prodotti → BOOK TOTE → 1296 DAV RIW
OBLIQUE - GRIS → Ricamo normale. Sta come primo figlio di [`rg-page-header`](page-header.md), che
contiene anche la regola su **quando** è obbligatorio (dal secondo livello in giù) e sul rapporto con
`rg-topbar__back` (mai entrambi).

```html
<nav class="rg-breadcrumb" aria-label="Percorso">
  <ol>
    <li><a href="/">Prodotti</a></li>
    <li><a href="/products/12">BOOK TOTE</a></li>
    <li><a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a></li>
    <li><span class="rg-breadcrumb__current" aria-current="page">Ricamo normale</span></li>
  </ol>
</nav>
```

- **Markup**: `nav` con `aria-label="Percorso"` → `ol` → un `li` per voce. L'ultima voce è la
  pagina corrente: un `span.rg-breadcrumb__current` con `aria-current="page"`, **non** un link.
- **Separatore**: lo genera il DS fra un `li` e il successivo, con testo alternativo vuoto. Non
  scriverlo nel markup. Lo screen reader annuncia «elenco, 4 voci», non «barra».
- **Voci**: le etichette sono i nomi delle entità come appaiono nei loro titoli. La prima voce ha la
  stessa etichetta della voce di topbar da cui si parte. Le tab non sono voci.
- **Area cliccabile**: ogni link è alto 40 px (regola §11) e sottolineato anche a riposo. La voce
  corrente si distingue per peso, colore e assenza di sottolineatura, non per il solo colore.
- **Nomi lunghi**: vanno a capo, non si troncano. Un codice di parte tagliato da un'ellissi è un dato
  perso proprio dove serve per orientarsi.
- **Tipografia**: AGNext a 14 px, come ogni navigazione (§3). Fino alla 1.16 era corpo a 12.

**Compatibilità.** La forma piatta usata finora da `rg-product-platform` resta valida, e non
richiede modifiche per continuare a funzionare:

```html
<nav class="rg-breadcrumb" aria-label="Percorso">
  <a href="/">Prodotti</a>
  <span class="rg-breadcrumb__sep" aria-hidden="true">/</span>
  <span class="rg-breadcrumb__current" aria-current="page">BOOK TOTE</span>
</nav>
```

`rg-breadcrumb__sep` esiste **solo** per questa forma. Dentro un `li` è nascosto: fino alla 1.16 un
`__sep` dentro la lista usciva doppio, perché il DS generava già il suo. Chi tocca il template passa
alla forma a lista, che dà all'assistenza il numero di livelli. La forma piatta non verrà rimossa
prima di una major.

### Topbar

`rg-topbar` e la barra superiore dell'applicazione: altezza `--rg-layout-header`, contenuto su
una riga sola. Elementi disponibili, tutti opzionali e componibili:

| Elemento | Ruolo |
| --- | --- |
| `rg-topbar__brand` | identita fissa (radice della suite/prodotto), quando non c'e ritorno |
| `rg-topbar__back` | link di ritorno al livello superiore; sostituisce `__brand` dentro un tool |
| `rg-topbar__title` | titolo della vista o dello strumento corrente |
| `rg-topbar__nav` | navigazione fra sezioni sorelle |
| `rg-topbar__actions` | azioni e meta a destra; si allinea da solo a fine barra |
| `rg-topbar__menu` | contenitore di nav e azioni che sotto i 680 px diventa un pannello (1.39.0) |
| `rg-topbar__menu-toggle` | il `<details>` che apre quel pannello sul telefono (1.39.0) |

Due superfici: base nera (header di prodotto, `rg-topbar`) e chiara (`rg-topbar--app`, chrome
di suite con hairline inferiore). Il titolo, se preceduto da `__back` o `__brand`, riceve un
separatore verticale: la gerarchia resta leggibile senza dipendere dal colore. Il titolo tronca
con ellissi invece di mandare la barra a capo. `__back` ha target 40 px e mantiene una label
testuale: la freccia da sola non basta. Non mettere piu di un'azione primaria in `__actions`;
le azioni della vista stanno nella `rg-action-bar`, non nella topbar.

```html
<header class="rg-topbar rg-topbar--app">
  <a class="rg-topbar__back" href="#/" aria-label="Torna a RG Tools">← RG Tools</a>
  <h1 class="rg-topbar__title">Rete 45°</h1>
  <div class="rg-topbar__actions">
    <span class="rg-mono rg-u-muted">v0.3.0</span>
    <button class="rg-button rg-button--primary rg-button--small" type="button">Esporta</button>
  </div>
</header>
```

Nella radice della suite, dove non c'e ritorno, si usa `<span class="rg-topbar__brand">RG Tools</span>`
al posto di `__back`.

Con `rg-topbar--sticky` la barra resta ancorata in cima mentre il contenuto scorre: e la
configurazione normale dentro `rg-appshell` (vedi `patterns/appshell.md`). Non renderla sticky
in pagine corte o in stampa — il modulo utilities la nasconde gia in `@media print`.

#### La barra sul telefono (1.39.0)

Fino alla 1.38.0 la barra non aveva una forma sotto i 680 px, e su un telefono non sbordava
soltanto lei: **si portava dietro tutta la pagina**. Misura su `rg-product-platform` a 375×812,
barra completa (marchio, sette voci, azione secondaria, nome utente, esci):

| | fino alla 1.38.0 | dalla 1.39.0 |
| --- | --- | --- |
| `documentElement.scrollWidth` a 375 px | **597** (la pagina slitta di 222 px) | **375** |
| `.rg-topbar` clientWidth / scrollWidth | 375 / 597 | 375 / 375 |
| altezza della barra | 64 px | 64 px, e il contenuto parte sempre da 64 |

La causa stava in due righe: `.rg-topbar` è un flex a riga unica e un figlio flex ha
`min-width: auto`, quindi `.rg-topbar__nav` — 428 px di sole voci — non si comprimeva e non
andava a capo. La barra è nel flusso, quindi il suo sbordo diventa lo sbordo del documento.

**Due risposte, una dentro l'altra.**

1. **Senza toccare il markup.** La nav **scorre dentro il proprio riquadro a qualunque
   larghezza**, e sotto i 680 px lo fanno anche le azioni: la barra torna larga quanto lo
   schermo. Vale per ogni app già in campo salendo il tag, senza modifiche al template. Che la
   nav ceda a **ogni** larghezza non è un eccesso di zelo: questa barra, tutta intera, chiede
   737 px, quindi fra i 681 — dove finisce la forma da telefono — e i 737 la pagina slitterebbe
   ancora, su un tablet in verticale o su una finestra stretta. Quello che sta nelle azioni, in
   compenso, non si accorcia mandando a capo la propria etichetta: «Compilatore schede» su due
   righe dentro una barra alta 64 px non è un adattamento, è un difetto. È una rete di sicurezza,
   non la forma giusta: a 375 px la nav diventa una striscia da ~170 px. **Limite della rete**:
   una striscia che scorre ritaglia ciò che esce dal suo riquadro, quindi un menu a discesa
   dentro `__actions` (`rg-action-menu`) sotto i 680 px verrebbe tagliato — ragione in più per
   adottare il pannello. Sopra i 680 px le azioni non scorrono, proprio per questo.
2. **Con il markup del menu** (sotto). Nav e azioni stanno dentro `rg-topbar__menu` e sotto i
   680 px scendono in un pannello che si apre con `rg-topbar__menu-toggle`. **Sopra i 680 px non
   cambia niente**: il pannello torna una riga della barra, il controllo sparisce, la geometria è
   identica a quella di oggi (verificata a 1280: nav e azioni allo stesso pixel).

```html
<header class="rg-topbar rg-topbar--app rg-topbar--sticky">
  <a class="rg-topbar__brand" href="/">RG</a>

  <details class="rg-topbar__menu-toggle">
    <summary>Menu</summary>
  </details>

  <div class="rg-topbar__menu">
    <nav class="rg-topbar__nav" aria-label="Navigazione principale">
      <a href="/" aria-current="page">Prodotti</a>
      <a href="/review">Revisione</a>
    </nav>
    <div class="rg-topbar__actions">
      <a class="rg-button rg-button--secondary rg-button--small" href="/compiler">Compilatore schede</a>
    </div>
  </div>
</header>
```

- **Il pannello va DOPO il controllo, e sono fratelli.** Il legame lo fa il selettore
  `[open] ~`, non il DOM: un pannello messo prima, o annidato dentro il `<details>`, non si apre.
- **`<details>`/`<summary>` e non un bottone**: nessun JavaScript da scrivere in ogni app, stato
  aperto/chiuso annunciato dal browser, Invio e Spazio già funzionanti. La navigazione resta
  raggiungibile da tastiera anche a menu chiuso: si tabula sul controllo, si apre, si tabula
  nelle voci. È la stessa scelta di [`rg-action-menu`](action-group.md) e di `rg-proposal`.
- **Il pannello non è figlio del `<details>`** perché un figlio di `<details>` chiuso lo nasconde
  lo user-agent, e per rimostrarlo su desktop servirebbe `::details-content`, che è recente
  (misurato: `display: contents` sul `<details>` **non** lo rimostra). Da fratello, il pannello è
  un elemento come un altro e su desktop lo mostra una media query normale: il chrome di ogni
  scrivania non dipende da una pseudo-classe nuova.
- **Cosa mettere dentro e cosa lasciare fuori.** Nel pannello va ciò che può aspettare: le
  sezioni e le azioni di servizio. Ciò che deve restare a portata di pollice — il marchio, il
  titolo, un'azione primaria contestuale — resta **fuori** dal pannello, sulla barra.
- **La voce corrente si dichiara con `aria-current="page"`** anche qui: nel pannello prende la
  barretta nera a sinistra, come `rg-sidebar-item`.
- **L'etichetta del controllo la scrive l'app** (`Menu`, `Sezioni`…): il DS non impone una
  parola e non usa un'icona senza nome. Il segno `+`/`−` lo genera il DS, ed è la stessa
  convenzione di [`rg-disclosure`](disclosure.md): non aggiungerne un secondo.
- **Misure**: barra ferma a `--rg-layout-header`, pannello in `position: absolute` **sopra** il
  contenuto (non ruba altezza: su uno schermo basso è la condizione), righe da 44 px, azioni a
  16 px dai bordi, altezza massima `100vh` meno la barra con scorrimento interno.
- **Limite dichiarato**: senza JavaScript il pannello **non si chiude toccando fuori né con Esc**.
  Si chiude ritoccando il controllo o, nella pratica, navigando. Un'app che voglia quei due
  comportamenti aggiunge il proprio JavaScript sull'attributo `open`, senza cambiare le classi.

### Local tabs

Viste sorelle della **stessa** entita: dettaglio, filati, consumi, anomalie. Non usare le tab
per navigare fra entita diverse (quella e la nav della topbar) ne per un wizard a passi.

Non mescolare nella stessa barra tab di tipo diverso. Il caso ricorrente è la pagina di una fase
principale che compila anche le sue fasi collegate. Le sezioni della fase restano `rg-tabs`; la
scelta di **quale fase** del gruppo si compila è un livello sopra, con una forma propria:
[`rg-phase-switch`](phase-switch.md) (v1.16.0).

`rg-tab` funziona indifferentemente su `<a>` (viste con URL proprio, preferibile) e su
`<button>` (commutazione client-side): il reset del chrome nativo del bottone e nel DS, non
serve riscriverlo in locale. Lo stato attivo si dichiara con `aria-selected="true"` o con
`is-active`; il pannello corrispondente e `rg-tabpanel`.

```html
<div class="rg-tabs" role="tablist">
  <button class="rg-tab is-active" role="tab" aria-selected="true" aria-controls="p-scheda" id="t-scheda">Scheda</button>
  <button class="rg-tab" role="tab" aria-selected="false" aria-controls="p-filati" id="t-filati">Filati</button>
</div>
<div class="rg-tabpanel is-active" role="tabpanel" id="p-scheda" aria-labelledby="t-scheda">…</div>
<div class="rg-tabpanel" role="tabpanel" id="p-filati" aria-labelledby="t-filati">…</div>
```

Se le tab pilotano contenuto caricato dal server, l'alternativa corretta e un link per vista con
`aria-current="page"`: lo stato sopravvive al refresh e alla condivisione dell'URL.

### Sidebar (shell)

La sidebar standard è un contenitore `rg-sidebar` (flex column, bordo destro) con: un'etichetta
`rg-label` in cima ("Workspace" o l'ambito), la navigazione `rg-sidebar__nav` con la lista
`rg-sidebar-list` di `rg-sidebar-item`, e un piede `rg-sidebar__foot` per dataset/versione/org.
Gli item usano font identitario; lo stato attivo è linea nera a sinistra + peso, mai solo colore.

```html
<aside class="rg-sidebar">
  <p class="rg-label">Workspace</p>
  <nav class="rg-sidebar__nav" aria-label="Navigazione">
    <ul class="rg-sidebar-list">
      <li><a class="rg-sidebar-item rg-sidebar-item--active" href="#" aria-current="page">Overview</a></li>
      <li><a class="rg-sidebar-item" href="#">Materiali</a></li>
    </ul>
  </nav>
  <div class="rg-sidebar__foot"><div class="rg-mono">DATASET / 26.06</div><div>ERREGI</div></div>
</aside>
```

