# Navigation

## Scopo

Rendere evidente posizione, ambito e passaggio tra strumenti RG senza competere con il contenuto.

## Varianti

- **Global header**: marchio RG, nome prodotto, strumenti principali e profilo.
- **App topbar (`rg-topbar--app`)**: barra superiore dell'applicazione su superficie chiara —
  ritorno/identita a sinistra, titolo dello strumento corrente, azioni o meta a destra.
- **Sidebar**: sezioni stabili di applicazioni complesse.
- **Local tabs**: viste sorelle della stessa entità.
- **Breadcrumb**: gerarchie profonde di archivio e rulebook.
- **Pagination**: dataset e risultati.

## Uso e limiti

Navigazione nera/bianca; mai palette stagionale come selezione principale. Lo stato attivo usa peso, linea o inversione, non solo colore. Evitare più di due livelli persistenti e menu hamburger su desktop senza necessità.

## Struttura

```text
[RG] [Nome strumento]  Archivio  Consumi  Regole                 [Ricerca] [Profilo]
                       ────────
```

AGNext per label. Header desktop 64 px (`--rg-layout-header`). Su mobile preservare nome prodotto, azione primaria contestuale e accesso al menu. Breadcrumb non sostituisce il titolo pagina.

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

