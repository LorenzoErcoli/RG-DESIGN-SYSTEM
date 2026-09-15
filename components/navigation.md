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

