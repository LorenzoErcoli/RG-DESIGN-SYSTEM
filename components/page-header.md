# Page header (testata di pagina)

## Scopo

**Una sola forma** per la testa di ogni pagina di un'app a pagine (`rg-appshell`). Dice, nell'ordine
in cui lo si cerca: *dove sono* (percorso), *dentro cosa* (contesto), *che cosa è* (titolo e stato),
*che cosa posso fare* (azioni).

Nasce da un difetto misurato su `rg-product-platform` (v1.16.0): la stessa testa esisteva in
quattro forme. `rg-section-header` con `__title`, `rg-section-header` con `h1.rg-h2` e un `rg-label`
sopra, `h1.rg-h2` nudo con margini inline, e un link «← Indietro» al posto del percorso. Il percorso
c'era in 8 pagine su 21. Entrando in una fase il titolo era solo «Ricamo normale», e la parte e il
prodotto a cui apparteneva stavano in un sottotitolo piccolo.

### Perché un componente nuovo e non `rg-section-header`

`rg-section-header` è la testa di una **sezione** (un titolo e una meta, allineati al piede), e resta
tale, con `--sub` per i blocchi dentro la pagina. Non ha posto per il percorso né per il contesto,
e non dichiara gli slot di stato e azioni. Allargarlo avrebbe fatto portare a ogni testa di sezione
un contratto di pagina. La testata di pagina è una sola per vista; le teste di sezione sono molte.

## Varianti

Nessuna variante: gli slot sono opzionali e la pagina usa quelli del suo livello (vedi *Regola di
navigazione*).

| Slot | Classe | Contenuto | Obbligo |
| --- | --- | --- | --- |
| Percorso | `rg-breadcrumb` (primo figlio) | catena dei genitori, ultima voce = questa pagina | dal 2° livello in giù |
| Contesto | `rg-page-header__context` | «*Tipo* di **genitore** · **nonno**», testo | dal 3° livello in giù |
| Titolo | `rg-page-header__title` (`<h1>`) | il nome dell'entità o della vista | sempre |
| Stato | `rg-page-header__status` | `rg-badge`, al massimo tre | facoltativo |
| Sottotitolo | `rg-page-header__subtitle` | una riga di testo | facoltativo |
| Meta | `rg-page-header__meta` | dati in mono: conteggi, codici, revisione, data | facoltativo |
| Azioni | `rg-page-header__actions` | una sola `rg-button--primary` al massimo | facoltativo |

Contenitori di impaginazione: `rg-page-header__main` (blocco titolo + azioni), `__heading` (colonna
del titolo), `__headline` (titolo + stato sulla stessa linea di base).

## Uso e limiti

- **Un solo `rg-page-header` per pagina**, primo figlio di `rg-appshell__main`, con un solo `<h1>`.
  Le sezioni dentro la pagina usano `rg-section-card` o `rg-section-header--sub`, mai un secondo
  page header.
- **Titolo = il nome, non il tipo.** «Ricamo normale», non «Fase». Il tipo sta nel contesto. Non
  scrivere la stessa parola due volte («PRESSATURA / Pressatura»).
- **Contesto testuale.** I nomi dei genitori stanno in `<strong>`, non in `<a>`: i link sono nel
  percorso, e ripeterli raddoppierebbe le fermate di tabulazione. Al massimo due genitori: la voce
  di primo livello («Prodotti») non entra nel contesto. Codici tecnici in `rg-mono`.
- **Stato**: al massimo tre `rg-badge` (limite di [badges](badges.md)), uno per asse (ciclo di vita,
  provenienza, esito). Il testo resta dentro il badge; nessun colore da solo.
- **Azioni**: al massimo **una** primaria. Le secondarie sono `--secondary` o `--ghost`. Un'azione
  distruttiva **non sta accanto alla primaria** (§2 delle regole): va nel piede del contenitore a cui
  si applica (`rg-phase-panel__foot`, `rg-action-bar`). È ammessa in testata solo quando la pagina non
  ha una primaria e l'oggetto dell'azione è l'intera pagina.
- **Sottotitolo** e **meta** sono una riga ciascuno. Un paragrafo va nel contenuto, non in testata.
- **Schermi stretti** (≤ 680 px): le azioni vanno sotto il titolo, allineate a sinistra; percorso,
  contesto e meta vanno a capo, senza troncare. Un nome lungo come «1296 DAV RIW OBLIQUE - GRIS»
  si spezza, non sparisce dietro un'ellissi.
- Il `<title>` del documento ripete titolo e genitore diretto: `Ricamo normale — 1296 DAV RIW OBLIQUE - GRIS — RG Platform`.

## Regola di navigazione

Il livello di una pagina è **la sua distanza dalla topbar**.

| Livello | Come ci si arriva | Esempi (`rg-product-platform`) | Percorso | Contesto |
| --- | --- | --- | --- | --- |
| **1** | voce della topbar (`rg-topbar__nav`, con `aria-current="page"`) | Prodotti, Clienti, Materiali, Codici, Macchine, Costi, Compilatore, Revisione | **no** | no |
| **2** | da un elenco di 1° livello | Prodotto, Materiale, Macchina, Nuovo prodotto, Gruppo compilatore | **sì** | no (facoltativo: il solo tipo) |
| **3+** | da un'entità di 2° livello o più giù | Parte, Costi prodotto, Fase, Compila | **sì** | **sì** |

1. **Dal secondo livello in giù il percorso è obbligatorio.** Parte dalla voce di primo livello,
   con la stessa etichetta della topbar, e finisce con la pagina corrente (`aria-current="page"`, lo
   stesso testo del titolo, eventualmente abbreviato). Le pagine di primo livello hanno solo il
   titolo: la loro posizione la dice già la topbar.
2. **Il percorso segue la gerarchia, non la cronologia.** «← Indietro» e «Torna alla parte» dentro
   la pagina non esistono più: il ritorno a un genitore è una voce del percorso. Un «Annulla» di un
   form è un'azione, non navigazione, e resta.
3. **Le sezioni della pagina (tab) non entrano nel percorso.** La catena finisce sull'entità
   (Prodotto → Parte → Fase); la sezione attiva la dice `rg-tabs` con `aria-selected`. Una
   cartella dentro un archivio a cartelle, invece, è un livello vero ed entra nel percorso.
4. **Una sottopagina dichiara la propria entità nel contesto**: tipo e genitori, in parole. Il
   contesto si legge insieme al titolo («Fase della parte 1296 DAV… · BOOK TOTE → Ricamo normale»),
   il percorso si usa per spostarsi. Servono entrambi, e non sono la stessa cosa. Il percorso va a
   capo e si scorre di lato; il contesto sta attaccato al titolo e resta anche in stampa.
5. **Mai `rg-topbar__back` e percorso nella stessa vista.** `rg-topbar__back` appartiene alle tool
   (`rg-workspace`), che hanno un solo livello sopra e nessuna testata di pagina. In un'app a pagine
   il ritorno è il percorso; l'uscita verso la suite, se serve, è `a.rg-topbar__brand`.
6. **Al massimo due livelli di navigazione persistenti**: la topbar, più **uno** dentro la pagina
   (`rg-tabs`). Il percorso non conta: non è un menu di alternative, è l'indirizzo della pagina. La
   pagina di un gruppo di fasi (`rg-phase-switch` + `rg-tabs`, v1.16.0) è già al limite: non ci si
   aggiunge né una sidebar né una seconda barra di tab.

## Stati

- **Caricamento**: la testata non aspetta i dati del contenuto. Titolo e percorso sono noti dalla
  rotta; `rg-loading` sta nel contenuto, sotto.
- **Entità non trovata**: il titolo dice che cosa manca («Parte non trovata»), il percorso resta fino
  al genitore esistente, niente azioni.
- **Sola lettura**: la primaria si omette (non si disabilita), il motivo è un `rg-alert` sotto la testata.

## Struttura

Primo livello, raggiunto dalla topbar:

```html
<header class="rg-page-header">
  <div class="rg-page-header__main">
    <div class="rg-page-header__heading">
      <h1 class="rg-page-header__title">Prodotti</h1>
      <p class="rg-page-header__meta"><span>248 prodotti</span><span>ultimo import 18/07 14:32</span></p>
    </div>
    <div class="rg-page-header__actions">
      <a class="rg-button rg-button--primary" href="/products/new">Nuovo prodotto</a>
    </div>
  </div>
</header>
```

Secondo livello, un'entità da un elenco:

```html
<header class="rg-page-header">
  <nav class="rg-breadcrumb" aria-label="Percorso">
    <ol>
      <li><a href="/">Prodotti</a></li>
      <li><span class="rg-breadcrumb__current" aria-current="page">BOOK TOTE</span></li>
    </ol>
  </nav>
  <div class="rg-page-header__main">
    <div class="rg-page-header__heading">
      <div class="rg-page-header__headline">
        <h1 class="rg-page-header__title">BOOK TOTE</h1>
        <span class="rg-page-header__status"><span class="rg-badge rg-badge--draft">Bozza</span></span>
      </div>
      <p class="rg-page-header__meta"><span>RG-PRD-0248</span><span>3 parti</span></p>
    </div>
    <div class="rg-page-header__actions">
      <a class="rg-button rg-button--secondary" href="/products/12/costi">Costi</a>
    </div>
  </div>
</header>
```

Quarto livello, una fase dentro una parte dentro un prodotto:

```html
<header class="rg-page-header">
  <nav class="rg-breadcrumb" aria-label="Percorso">
    <ol>
      <li><a href="/">Prodotti</a></li>
      <li><a href="/products/12">BOOK TOTE</a></li>
      <li><a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a></li>
      <li><span class="rg-breadcrumb__current" aria-current="page">Ricamo normale</span></li>
    </ol>
  </nav>
  <div class="rg-page-header__main">
    <div class="rg-page-header__heading">
      <p class="rg-page-header__context">Fase della parte <strong>1296 DAV RIW OBLIQUE - GRIS</strong> · <strong>BOOK TOTE</strong></p>
      <div class="rg-page-header__headline">
        <h1 class="rg-page-header__title">Ricamo normale</h1>
        <span class="rg-page-header__status"><span class="rg-badge rg-badge--pending">costo non calcolato</span></span>
      </div>
      <p class="rg-page-header__meta"><span>fase 2 di 4</span><span>Ricamo</span></p>
    </div>
  </div>
</header>
```

## Migrazione (consumatore: rg-product-platform)

| Oggi | Diventa |
| --- | --- |
| `div.rg-section-header` > `h1.rg-section-header__title` + `p.rg-section-header__meta` | `rg-page-header` > `__main` > `__heading` > `h1.__title` + `p.__meta` |
| `div.rg-section-header` > `p.rg-label` + `h1.rg-h2` | come sopra; l'etichetta di tipo passa in `__context` (dal 3° livello) o sparisce (1°–2°) |
| `h1.rg-h2` nudo con `style="margin…"` | `rg-page-header`; i margini inline si tolgono, li dà il componente |
| link «← Indietro» / «Torna alla parte» | voce del percorso |
| `partials/_breadcrumb.html` fuori dalla testata, con `rg-u-mb-6` | dentro `rg-page-header` come primo figlio, **senza** `rg-u-mb-6` (lo spazio lo dà la griglia della testata) |

`rg-section-header` non viene rimosso né cambia: resta per le teste di sezione (`--sub`) e per chi
non migra subito.
