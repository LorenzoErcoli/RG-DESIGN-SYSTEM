# Navigation

## Scopo

Rendere evidente posizione, ambito e passaggio tra strumenti RG senza competere con il contenuto.

## Varianti

- **Global header**: marchio RG, nome prodotto, strumenti principali e profilo.
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

AGNext per label. Header desktop 64 px. Su mobile preservare nome prodotto, azione primaria contestuale e accesso al menu. Breadcrumb non sostituisce il titolo pagina.

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

