# App-shell documentale

## Scopo

Il guscio delle applicazioni RG **a pagine**: topbar ancorata, colonna di contenuto centrata e
limitata, piede opzionale. È lo scheletro di product-platform e di ogni futura app con rotte,
elenchi e schede.

## Rapporto con Workspace

Il DS ha due gusci e non sono intercambiabili.

| | `rg-appshell` | `rg-workspace` |
| --- | --- | --- |
| Contesto | applicazione a pagine e rotte | tool a manipolazione diretta |
| Struttura | topbar + colonna di lettura | pannello parametri + canvas + status bar |
| Scroll | la pagina scorre | i pannelli scorrono, il guscio no |
| Esempi | product-platform, archivi, schede | pattern-grammar-engine, generatori |

Un tool dentro un'app può stare in `rg-appshell__main`, ma allora deve dichiarare un'altezza:
`rg-workspace` riempie il contenitore, non lo dimensiona.

## Uso e limiti

La topbar è `rg-topbar rg-topbar--app rg-topbar--sticky`: la navigazione globale è nera/bianca e
non usa mai la palette stagionale. La vista attiva si dichiara con `aria-current="page"`, non con
una classe di stato: l'informazione serve anche a chi non vede la sottolineatura.

`rg-appshell__main` centra il contenuto e lo limita a `--rg-layout-content-max`. Per stringerlo,
si sovrascrive `--rg-appshell-max` **con un token di layout** (`--rg-layout-reading-max` per le
schermate editoriali), non con un pixel arbitrario: una larghezza di colonna è una decisione di
sistema. In stampa il modulo utilities toglie la topbar e libera i margini: nessuna app deve
riscrivere il proprio `@media print`.

Un solo `rg-appshell` per documento. Non annidarlo e non usarlo per una sezione: `min-height:100vh`
su un blocco interno produce solo pagine vuote.

## Struttura

```html
<div class="rg-appshell">
  <header class="rg-topbar rg-topbar--app rg-topbar--sticky">
    <a class="rg-topbar__brand" href="/">RG</a>
    <nav class="rg-topbar__nav" aria-label="Navigazione principale">
      <a href="/" aria-current="page">Prodotti</a>
      <a href="/review">Revisione</a>
      <a href="/knowledge">Knowledge</a>
    </nav>
    <div class="rg-topbar__actions">
      <a class="rg-button rg-button--secondary rg-button--small" href="/compiler">Compilatore schede</a>
    </div>
  </header>

  <main class="rg-appshell__main">
    <header class="rg-section-header">
      <div><p class="rg-label">Archivio</p><h1 class="rg-section-header__title">Prodotti</h1></div>
      <span class="rg-section-header__meta">248 RECORD</span>
    </header>
    <!-- contenuto della vista -->
  </main>

  <footer class="rg-footer-note rg-u-no-print">RG Product Platform · dati interni</footer>
</div>
```

## Stati

- **Vuoto**: `rg-empty` dentro `__main`, con testo esplicito e azione di uscita.
- **Caricamento**: `rg-loading` al posto del blocco in arrivo, mai al posto dell'intera pagina.
- **Errore**: `rg-alert--error` in testa al contenuto, sotto l'intestazione di sezione.
- **Stampa**: topbar e `rg-u-no-print` spariscono, `__main` occupa la pagina.
