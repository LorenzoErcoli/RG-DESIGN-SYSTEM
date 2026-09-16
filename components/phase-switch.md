# Fasi del gruppo e pannello di fase (`rg-phase-switch` / `rg-phase-panel`)

## Scopo

La pagina di una **fase**. Se la fase è la **principale** di un gruppo di fasi collegate, da quella
pagina si compilano anche le collegate («Pressatura iniziale», «Forno finale», «Sabbiatura e
soffiatura finale»), e la pagina ha **due livelli**:

1. **Quale fase** del gruppo si compila: `rg-phase-switch`, linguette attaccate al pannello, sotto
   una graffa con la didascalia «Fasi del gruppo».
2. **Quale sezione** di quella fase: le `rg-tabs` di sempre, **dentro** il pannello `rg-phase-panel`.

Una fase **senza gruppo** usa lo stesso `rg-phase-panel`, senza linguette. La pagina di una fase ha
una forma sola; il gruppo aggiunge solo le linguette.

Dalla 1.17.0 il pannello è **il blocco della fase**. La sua testa porta il numero, la parola «Fase» e
il nome; le tab di sezione si attaccano sotto la testa, e il contorno chiude tutto. La testata della
pagina, sopra, si comprime e parla della parte. Vedi *La testa titolata (1.17.0)*.

Aggiunto in v1.16.0, rivisto prima del rilascio.

### Perché la prima forma è stata scartata

La prima proposta era una striscia di segmenti rigati sopra una testa «Stai compilando». Provata in
`rg-product-platform`, il responsabile l'ha giudicata così: *«questa testata con 2 cose strane che
non si capisce se sono fasi o altro non va bene»* e *«lo sfondo grigio è uguale al colore degli
hover, e quindi non si capisce niente»*. Due difetti veri:

- **I segmenti non dicevano che cosa erano, né che si potessero scegliere.** Erano due riquadri
  generici con dentro un numero.
- **Normale, hover e scelta si distinguevano di un grigio chiaro su un fondo grigio chiaro.**

La testa «Stai compilando» aggiungeva inoltre un livello di intestazione in una pagina che ne aveva
già troppi, e ripeteva il numero della fase.

### La forma attuale

- **Linguette attaccate al pannello.** La fase scelta è una linguetta bianca a bordo nero che si
  fonde con il pannello sotto, quindi il contenuto è evidentemente suo. Le altre fasi stanno
  dietro, solo contorno, sul fondo della pagina. È il raccoglitore: la forma dice da sola sia «si
  sceglie» sia «questo contenuto appartiene a quella».
- **Il fondo è il segno della scelta, e di nient'altro.** L'hover porta bordo e testo al nero e
  sottolinea il titolo; non cambia mai il fondo.
- **La graffa dell'elenco, ruotata.** Sopra le linguette c'è una quota da disegno tecnico: filo nero
  con i due capi, didascalia sul filo, dente che scende sulla principale. È lo stesso segno di
  [`rg-steps--grouped`](steps.md#gruppo-di-fasi-collegate-rg-steps--grouped), quindi chi arriva
  dall'elenco lo riconosce. La didascalia dice a parole che quelle linguette sono fasi.
- **Un pannello, niente section card dentro.** Le sezioni sono tab dentro il pannello e il loro
  contenuto sta direttamente sotto. Una `rg-section-card` per sezione sarebbe una superficie sollevata
  dentro un'altra, vietata dalle regole §6, e ripeterebbe come titolo l'etichetta della tab accesa.

### La testa titolata (1.17.0)

Provata la 1.16 nella pagina del ricamo, il giudizio è stato: *«la testata della fase non è chiara
per niente. […] Ricamo normale va sotto e va fatto capire che è una fase e deve avere qualche cosa
che mette insieme il titolo con quello che c'è sotto. E anche riferimento alla fase, il numero per
esempio di fase è scomparso»*. Il nome della fase stava nella testata della pagina, lontano dalle sue
tab, e il numero compariva solo se la parte aveva più fasi.

La forma:

1. **Testata della pagina compressa sulla parte** (`rg-page-header--compact`): percorso e una riga
   «Parte [pastiglia] DAVANTI · BOOK TOTE». Il filetto d'identità della parte sta qui.
2. **Blocco della fase** (`rg-phase-panel`), con la testa che fa da titolo:
   - `__num`: il numero, invertito, lo stesso segno di `rg-step__num` a fase aperta e della
     linguetta scelta, e lo stesso numero (la posizione nella sequenza della parte);
   - `__kind`: «Fase 2 di 4», più la relazione se c'è («Principale · con la 3»);
   - `__title`: il nome;
   - a destra lo stato e il reparto; sotto, su una riga intera, il riepilogo (`__meta`).
3. **Le tab di sezione attaccate sotto la testa** (`rg-phase-panel__sections` sulla `rg-tabs`):
   corrono da bordo a bordo, e la testa perde il suo filetto.
4. **Il contorno nero chiude** testa, tab, contenuto e piede. È la «cosa che mette insieme il titolo con
   quello che c'è sotto»: una regione comune, non un segno in più.
5. **Nel piede** i gesti sulla fase, «Elimina fase» compreso, anche per il ricamo.

**In un gruppo non cambia disegno:** stesso blocco, con le linguette sopra. Il titolo sta sia sulla
linguetta sia nella testa, ed è voluto: la linguetta è il comando per scegliere, la testa è il titolo
di ciò che si compila. Rivede la regola 1.16 «il titolo non si ripete nel pannello».

**Scartata: la linguetta unica.** Si era valutato di dare una linguetta anche alla fase da sola, come
titolo attaccato al pannello: nessuna ripetizione, e lo stesso segno del gruppo. Ma una linguetta sola
si legge come una scelta senza alternative, e il suo titolo a 14 px non regge da titolo della pagina.

**Intestazioni.** Un solo `<h1>` per pagina:
- **pagina di una fase**: il `__title` del blocco è `<h1>`, e la testata compressa non ha titoli;
- **pagina di un gruppo**: un `<h1 class="rg-u-visually-hidden">` nella testata compressa («Fasi del
  gruppo di Pressatura, parte DAVANTI»), e ogni `__title` è `<h2>`.

In entrambi i casi il titolo porta il numero in un prefisso nascosto alla vista («Fase 2: »), perché
`__num` e `__kind` stanno fuori dall'intestazione.

### Perché non `rg-tabs`, non `rg-segmented`

- `rg-tabs` è il secondo livello. Usarla anche per il primo è il difetto da cui il componente nasce.
- `rg-segmented` sceglie fra poche opzioni brevi con `aria-pressed` e un target compatto. Una fase
  ha numero, ruolo e titolo, e pilota un pannello: serve un tablist.

## Varianti

**Fasi del gruppo**

| Classe | Ruolo |
| --- | --- |
| `rg-phase-switch` | Contenitore: didascalia + linguette. Posa sul fondo di pagina. |
| `rg-phase-switch__caption` | Didascalia sul filo della graffa: «Fasi del gruppo · si salvano insieme». Etichetta il tablist (`id` + `aria-labelledby`). |
| `rg-phase-switch__tabs` | Il `role="tablist"`. Il DS ci disegna sopra la graffa. |
| `rg-phase-switch__item` | Linguetta-fase: `<button role="tab">`. Scelta con `aria-selected="true"` (o `is-active`). |
| `rg-phase-switch__item--principal` | Linguetta della principale: il DS disegna il dente dalla graffa al suo numero. |
| `rg-phase-switch__num` | Numero di posizione nella sequenza della parte. |
| `rg-phase-switch__text` | Colonna testo. |
| `rg-phase-switch__role` | «Principale», «Collegata · prima della 2», «Collegata · dopo la 2». |
| `rg-phase-switch__title` | Titolo della fase. |
| `rg-phase-switch__aside` | Un solo badge: `rg-badge--count` («6 da compilare») o `rg-badge--unresolved` («1 errore»). |

Variabile: `--rg-phase-switch-ground`, il fondo dietro la didascalia (default
`--rg-color-background`). Si imposta solo se la striscia posa su un'altra superficie.

**Pannello di fase**

| Classe | Ruolo |
| --- | --- |
| `rg-phase-panel` | La fase. Con le linguette è anche il `role="tabpanel"` (`rg-phase-panel rg-tabpanel`). |
| `rg-phase-panel__head` | Testa del blocco: titolo a sinistra, stato e reparto a destra, riepilogo sotto. |
| `rg-phase-panel__heading` | (1.17.0) Numero, etichetta e nome. |
| `rg-phase-panel__num` | (1.17.0) Il numero della fase, invertito come `rg-step__num` a fase aperta. `aria-hidden`: il numero lo dice il titolo. |
| `rg-phase-panel__name` | (1.17.0) Colonna di etichetta e nome. |
| `rg-phase-panel__kind` | (1.17.0) «Fase 2 di 4», poi la relazione: «Principale · con la 3», «Collegata · dopo la 2». Sempre, anche con una fase sola. |
| `rg-phase-panel__title` | (1.17.0) Il nome della fase: `<h1>` se la pagina mostra una fase, `<h2>` in un gruppo. |
| `rg-phase-panel__meta` | Riepilogo della fase: `12 materiali` · `48 stop` · `9 fili` · `dati dal PDF caricato su questa fase`. Senza testa titolata (forma 1.16) è posizione e relazione. |
| `rg-phase-panel__status` | Stato del costo (`rg-badge`) e timbro di reparto. |
| `rg-phase-panel__dept` | Sulla `rg-dept-band`, insieme a `rg-dept-band--quiet`: il timbro del reparto, stessa figura del foglio, in grigio. |
| `rg-phase-panel__body` | Tab di sezione e contenuto. |
| `rg-phase-panel__sections` | (1.17.0) Sulla `rg-tabs` delle sezioni, **primo figlio** di `__body`: le tab si attaccano sotto la testa, da bordo a bordo. |
| `rg-phase-panel__intro` | (1.17.0) Prima riga di una sezione: didascalia (`<p>`) a sinistra, azioni della sezione a destra. Prende il posto della testa di `rg-section-card`. |
| `rg-phase-panel__actions` | (1.17.0) Le azioni della sezione, dentro `__intro`: al massimo una primaria. |
| `rg-phase-panel__subsection` | (1.17.0) Un blocco dentro una sezione (per esempio «Materiali non riconosciuti» sopra la «Sequenza stop»): due consecutivi sono divisi da un filetto. |
| `rg-phase-panel__foot` | Gesti sulla fase: Scollega, Elimina fase. |
| `rg-phase-panel__scope` | A sinistra nel piede: «Azioni sulla fase 3», cioè a chi si applicano i bottoni. |

**Stati della linguetta.**

| Stato | Come si vede |
| --- | --- |
| default | Solo contorno intermedio, testo secondario, numero su casella chiara. |
| `:hover` | Contorno e testo neri, titolo sottolineato. |
| `:focus-visible` | Contorno di focus nero, interno. |
| scelta | Fondo bianco, contorno nero, numero invertito, attaccata al pannello. |

La scelta ha quindi quattro segnali, e nessuno è un colore.

**Errore su una fase non visibile.** Il form è unico, quindi un salvataggio può fallire su una fase
che non si sta guardando. Quella linguetta porta `rg-badge--unresolved` («1 errore») in `__aside`,
e il server riapre la prima fase con errori.

**Vuoto.** Una fase senza parametri a catalogo mostra `rg-empty` in `__body`. Non si toglie dalla
striscia.

## Uso e limiti

- **Linguette solo nella pagina di una principale con almeno una collegata.** La loro presenza è il
  segnale che il gruppo esiste. Ci vanno tutte le fasi del gruppo, principale compresa, nell'ordine
  della sequenza e coi suoi numeri.
- **Il titolo della fase sta nella testa del blocco, sempre** (dalla 1.17.0): numero, «Fase N di M»,
  nome. In un gruppo sta anche sulla linguetta: lì è il comando, qui il titolo.
- **La testata della pagina parla della parte** (`rg-page-header--compact`): percorso e riga «Parte ·
  prodotto». Niente titolo visibile, niente azioni sulla fase.
- **Il numero c'è sempre**, anche con una fase sola («Fase 1 di 1»). È la posizione nella sequenza
  della parte: lo stesso numero di `rg-step__num` nell'elenco e di `rg-phase-switch__num` sulla
  linguetta.
- **Il riepilogo della fase** (materiali · stop · fili · origine dei dati) sta in `__meta`, nella
  testa: testo, non una fila di badge. I badge restano per gli stati.
- **Nessuna `rg-section-card` nel blocco.** La testa di una sezione è la sua tab accesa: la sezione
  comincia con `__intro` (didascalia e azioni), e i blocchi interni sono `__subsection`.
  `rg-file-card`, `rg-table`, `rg-alert` e `rg-disclosure--boxed` restano ammessi: sono oggetti con un
  bordo, non superfici di sezione. Il menu delle operazioni sta **dentro la sezione che contiene le
  operazioni**, in coda alle righe, come `rg-disclosure--boxed`.
- **Il filetto della parte (`rg-part-edge`) sta sulla testata compressa, mai sul blocco.** Il blocco
  si riconosce dal contorno nero e dal numero; il colore d'identità è della parte, non della fase.
- **I due numeri della pagina non si confondono**: la parte è una pastiglia **tonda** colorata da 20 px
  nella testata, la fase un **quadrato nero** da 32 px nella testa del blocco, con «Fase N di M»
  accanto (vedi [part-mark](part-mark.md#numeri-non-lettere-dalla-quarta-tappa-1170)).
- **Le azioni sul documento della fase stanno nella barra della scheda**, uguale in ogni sezione che la
  mostra (vedi *La barra della scheda*).
- **Il conteggio «da compilare» sta in due posti, e ciascuno dice una cosa diversa:** sulla
  linguetta vale per la fase intera, sulla tab di sezione per la sezione. Non si ripete in testa al
  contenuto.
- **L'istruzione sul costo (`€`) sta nella sezione che ha campi marcati**, subito sotto le tab, e i
  campi la richiamano con `aria-describedby`. Non va in testa alla pagina fra due filetti, dove
  diventa un livello di intestazione.
- **I gesti sulla fase stanno nel piede del suo pannello.** «Elimina fase» in testa alla pagina, in
  una pagina che mostra tre fasi, non dice quale fase elimina.
- **Il salvataggio sta fuori dai pannelli:** salva tutte le fasi insieme, e dentro un pannello
  lascerebbe credere di salvare solo quello.
- **Timbro di reparto a schermo sempre `--quiet`.** La palette categoriale a schermo convive con i
  colori di stato, e `category-3` è `danger`.

## Struttura

Pagina di una principale con una collegata, aperta sulla collegata:

```html
<header class="rg-page-header rg-page-header--compact rg-part-edge rg-part--1">
  <nav class="rg-breadcrumb" aria-label="Percorso"><!-- … / parte / Pressatura --></nav>
  <p class="rg-page-header__context">Parte <span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><strong>DAVANTI</strong> · <strong>TEST — Ciclo completo</strong></p>
  <h1 class="rg-u-visually-hidden">Fasi del gruppo di Pressatura, parte DAVANTI</h1>
</header>

<form method="post" action="…">
  <div class="rg-phase-switch">
    <p class="rg-phase-switch__caption" id="fasi-gruppo">Fasi del gruppo · si salvano insieme</p>
    <div class="rg-phase-switch__tabs" role="tablist" aria-labelledby="fasi-gruppo">
      <button class="rg-phase-switch__item rg-phase-switch__item--principal" type="button" role="tab"
              id="tab-fase-2" aria-controls="fase-2" aria-selected="false" tabindex="-1">
        <span class="rg-phase-switch__num">2</span>
        <span class="rg-phase-switch__text">
          <span class="rg-phase-switch__role">Principale</span>
          <span class="rg-phase-switch__title">Pressatura</span>
        </span>
        <span class="rg-phase-switch__aside"><span class="rg-badge rg-badge--count">6 da compilare</span></span>
      </button>
      <button class="rg-phase-switch__item" type="button" role="tab"
              id="tab-fase-3" aria-controls="fase-3" aria-selected="true" tabindex="0">
        <span class="rg-phase-switch__num">3</span>
        <span class="rg-phase-switch__text">
          <span class="rg-phase-switch__role">Collegata · dopo la 2</span>
          <span class="rg-phase-switch__title">Sabbiatura e soffiatura finale</span>
        </span>
        <span class="rg-phase-switch__aside"><span class="rg-badge rg-badge--count">7 da compilare</span></span>
      </button>
    </div>
  </div>

  <div class="rg-phase-panel rg-tabpanel" role="tabpanel" id="fase-2" aria-labelledby="tab-fase-2">
    <!-- come sotto -->
  </div>

  <div class="rg-phase-panel rg-tabpanel is-active" role="tabpanel" id="fase-3" aria-labelledby="tab-fase-3">
    <header class="rg-phase-panel__head">
      <div class="rg-phase-panel__heading">
        <span class="rg-phase-panel__num" aria-hidden="true">3</span>
        <div class="rg-phase-panel__name">
          <p class="rg-phase-panel__kind"><span>Fase 3 di 4</span><span>Collegata · dopo la 2</span></p>
          <h2 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 3: </span>Sabbiatura e soffiatura finale</h2>
        </div>
      </div>
      <div class="rg-phase-panel__status">
        <span class="rg-badge rg-badge--pending">costo non calcolato</span>
        <p class="rg-dept-band rg-dept-band--pressatura rg-dept-band--quiet rg-phase-panel__dept">
          <span class="rg-dept-band__name">Pressatura e soffiatura</span>
        </p>
      </div>
    </header>

    <div class="rg-phase-panel__body">
      <div class="rg-tabs rg-phase-panel__sections" role="tablist" aria-label="Sezioni della fase 3: Sabbiatura e soffiatura finale">
        <button class="rg-tab is-active" type="button" role="tab" id="tab-3-base" aria-controls="sez-3-base" aria-selected="true">Informazioni generali <span class="rg-badge rg-badge--count">2</span></button>
        <button class="rg-tab" type="button" role="tab" id="tab-3-tecnica" aria-controls="sez-3-tecnica" aria-selected="false" tabindex="-1">Parametri tecnici <span class="rg-badge rg-badge--count">5</span></button>
      </div>

      <div class="rg-tabpanel is-active" role="tabpanel" id="sez-3-base" aria-labelledby="tab-3-base">
        <p class="rg-small rg-u-mb-4">Che lavoro è, e dove sta il file. Cambia a ogni commessa.</p>
        <div class="rg-cluster rg-cluster--end"><!-- rg-field --></div>
      </div>

      <div class="rg-tabpanel" role="tabpanel" id="sez-3-tecnica" aria-labelledby="tab-3-tecnica">
        <p class="rg-small rg-u-mb-4" id="nota-costo-3-tecnica">
          I campi <span class="rg-field__mark">€</span> entrano nel costo della fase.
          <span class="rg-field__mark">⇄</span> vale per tutte le passate insieme.
        </p>
        <ol class="rg-operation-list"><!-- rg-operation-row, campi con aria-describedby="nota-costo-3-tecnica" --></ol>
        <details class="rg-disclosure rg-disclosure--boxed rg-u-mt-6">
          <summary class="rg-disclosure__trigger">Operazioni della fase <span class="rg-small">2 di 3 scelte</span></summary>
          <div class="rg-disclosure__content"><!-- rg-choice --></div>
        </details>
      </div>
    </div>

    <footer class="rg-phase-panel__foot">
      <p class="rg-phase-panel__scope">Azioni sulla fase 3</p>
      <button class="rg-button rg-button--ghost" type="submit" formaction="…/scollega">Scollega</button>
      <button class="rg-button rg-button--ghost rg-button--danger" type="submit" formaction="…/delete">Elimina fase</button>
    </footer>
  </div>

  <div class="rg-cluster rg-u-mt-6">
    <button class="rg-button rg-button--primary" type="submit">Salva i valori</button>
    <span class="rg-small">Salva tutte le fasi del gruppo insieme. Un campo lasciato vuoto cancella il valore.</span>
  </div>
</form>
```

Pagina di una fase da sola, il ricamo: testata compressa, blocco con testa titolata, sezioni appiattite.

```html
<header class="rg-page-header rg-page-header--compact rg-part-edge rg-part--1">
  <nav class="rg-breadcrumb" aria-label="Percorso">
    <ol>
      <li><a href="/">Prodotti</a></li>
      <li><a href="/products/12">BOOK TOTE</a></li>
      <li><span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><a href="/products/12/parts/3">1296 DAV RIW OBLIQUE - GRIS</a></li>
      <li><span class="rg-breadcrumb__current" aria-current="page">Ricamo normale</span></li>
    </ol>
  </nav>
  <p class="rg-page-header__context">Parte <span class="rg-part-mark rg-part-mark--small" aria-hidden="true"></span><strong>1296 DAV RIW OBLIQUE - GRIS</strong> · <strong>BOOK TOTE</strong></p>
</header>

<section class="rg-phase-panel" aria-labelledby="titolo-fase">
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">1</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 1 di 1</span></p>
        <h1 class="rg-phase-panel__title" id="titolo-fase"><span class="rg-u-visually-hidden">Fase 1: </span>Ricamo normale</h1>
      </div>
    </div>
    <div class="rg-phase-panel__status">
      <p class="rg-dept-band rg-dept-band--ricamo rg-dept-band--quiet rg-phase-panel__dept"><span class="rg-dept-band__name">Campionario Ricamo</span></p>
    </div>
    <p class="rg-phase-panel__meta"><span>12 materiali</span><span>48 stop</span><span>9 fili</span><span>dati dal PDF caricato su questa fase</span></p>
  </header>

  <div class="rg-phase-panel__body">
    <div class="rg-tabs rg-phase-panel__sections" role="tablist" aria-label="Sezioni della fase 1: Ricamo normale">
      <button class="rg-tab" type="button" role="tab" id="t-macchina" aria-controls="tab-macchina" aria-selected="false" tabindex="-1">Scheda macchina</button>
      <button class="rg-tab is-active" type="button" role="tab" id="t-sequenza" aria-controls="tab-sequenza" aria-selected="true">Sequenza stop <span class="rg-badge rg-badge--count">48</span></button>
      <button class="rg-tab" type="button" role="tab" id="t-filati" aria-controls="tab-filati" aria-selected="false" tabindex="-1">Consumi fili</button>
      <button class="rg-tab" type="button" role="tab" id="t-consumi" aria-controls="tab-consumi" aria-selected="false" tabindex="-1">Consumi materiali</button>
      <button class="rg-tab" type="button" role="tab" id="t-impostazioni" aria-controls="tab-impostazioni" aria-selected="false" tabindex="-1">Impostazioni</button>
    </div>

    <div class="rg-tabpanel" role="tabpanel" id="tab-macchina" aria-labelledby="t-macchina">
      <div class="rg-phase-panel__intro">
        <p>Il PDF della scheda popola la fase; qui il file, i dati del programma e le note tecniche.</p>
      </div>
      <article class="rg-file-card rg-file-card--loaded"><!-- invariata --></article>
    </div>

    <div class="rg-tabpanel is-active" role="tabpanel" id="tab-sequenza" aria-labelledby="t-sequenza">
      <section class="rg-phase-panel__subsection" aria-labelledby="sub-materiali">
        <div class="rg-section-header rg-section-header--sub">
          <h2 class="rg-h3" id="sub-materiali">Materiali non riconosciuti <span class="rg-badge rg-badge--unresolved">2</span></h2>
        </div>
        <p class="rg-small rg-u-mb-4">La scheda li nomina, il catalogo non li ha. Assegnali a un materiale di catalogo.</p>
        <div class="rg-table-wrap"><table class="rg-table rg-table--compact"><!-- … --></table></div>
      </section>
      <section class="rg-phase-panel__subsection" aria-labelledby="sub-stop">
        <div class="rg-phase-panel__intro">
          <p id="sub-stop">Tutti gli stop reali della scheda; apri una riga per fili, attributi e materiali.</p>
          <div class="rg-phase-panel__actions">
            <a class="rg-button rg-button--secondary" href="…/gruppo"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-collega"></use></svg>Parti collegate</a>
            <a class="rg-button rg-button--primary" href="…/compila"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>Compila scheda</a>
          </div>
        </div>
        <div class="rg-table-wrap"><table class="rg-table"><!-- stop --></table></div>
      </section>
    </div>

    <div class="rg-tabpanel" role="tabpanel" id="tab-impostazioni" aria-labelledby="t-impostazioni">
      <form method="post" action="…/impostazioni">
        <div class="rg-phase-panel__intro"><p>Override dei valori di costo di questa fase, applicati al salvataggio.</p></div>
        <fieldset class="rg-parameter-group"><!-- campi --></fieldset>
        <div class="rg-cluster rg-u-mt-6"><button class="rg-button rg-button--primary" type="submit">Salva impostazioni</button></div>
      </form>
    </div>
  </div>

  <footer class="rg-phase-panel__foot">
    <p class="rg-phase-panel__scope">Azioni sulla fase 1</p>
    <form class="rg-u-inline" method="post" action="…/delete">
      <button class="rg-button rg-button--ghost rg-button--danger" type="submit"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg>Elimina fase</button>
    </form>
  </footer>
</section>
```

### Appiattire le sezioni (le tab del ricamo)

| Oggi | Nel blocco della fase |
| --- | --- |
| `<section class="rg-section-card">` intorno al contenuto della tab | niente: il contenuto sta diretto nel `rg-tabpanel` |
| `__header` + `__heading` + `__title` («Consumi fili») | niente: il titolo della sezione è la tab accesa |
| `__subtitle` | `<p>` dentro `rg-phase-panel__intro` |
| `__actions` (Parti collegate, Visualizza scheda, Scarica PDF, Compila scheda) | la **barra della scheda** (`rg-file-card--bar`), uguale in ogni sezione che la mostra; le azioni proprie della sola sezione restano in `rg-phase-panel__actions` dentro `__intro` |
| `__body` | niente: il suo contenuto va diretto |
| una seconda `rg-section-card` nella stessa tab («Materiali non riconosciuti») | `rg-phase-panel__subsection` con `rg-section-header rg-section-header--sub` e `<h2 class="rg-h3">` |
| `rg-section-card--flush` con una tabella | `rg-table-wrap` diretta |
| il bottone di salvataggio di un form nella testa (Impostazioni) | in fondo al form, in un `rg-cluster` (forms.md: il primario sotto l'ultimo campo) |
| `rg-file-card`, `rg-alert`, `rg-disclosure--boxed`, `rg-table` | invariati |

### La barra della scheda (1.17.0)

Le sezioni che lavorano sullo **stesso documento** (Scheda macchina, Sequenza stop) mostrano in cima
la stessa riga: [`rg-file-card--bar`](file-card.md#barra-della-scheda-rg-file-card--bar-dalla-1170).

- **Stessa riga, stessa posizione, stesse azioni**, con o senza PDF. Prima ogni sezione aveva la sua:
  *«la prima riga dei bottoni in scheda macchina deve essere uguale a quella di sequenza stop»*.
- **Sta sopra `__intro`**: prima le azioni sul documento, poi la didascalia della sezione, poi il
  contenuto.
- **Una sola primaria**: «Compila scheda» col PDF, «Carica la scheda» senza.
- **Le sezioni che non riguardano il documento** (Consumi fili, Consumi materiali, Impostazioni) **non
  la mostrano**: la barra dice «questa fase ha una scheda», non è una barra di pagina.
- **«Torna alla prima lettura» sta nel piede del blocco**, con gli altri gesti sulla fase: perde le
  modifiche, quindi non va in una riga che si ripete in più sezioni.
- La `rg-file-card` piena **sparisce** dalla sezione Scheda macchina: la barra porta nome, badge,
  azioni e la rivelazione delle opzioni di lettura.

## Tastiera e accessibilità


Due tablist ARIA, uno dentro l'altro: quello delle sezioni sta nel `tabpanel` della fase.

- **Tab** entra nelle linguette sulla scelta (roving tabindex: `tabindex="0"` sulla scelta, `-1`
  sulle altre). **Tab** di nuovo porta nel pannello: prima le tab di sezione, poi i campi.
- **Frecce destra / sinistra** (anche **giù / su**) passano alla linguetta vicina e la attivano;
  **Home / Fine** alla prima e all'ultima. L'attivazione è automatica, perché i pannelli sono già nel
  DOM.
- **Il tablist è `__tabs`**, etichettato dalla didascalia con `aria-labelledby`. La didascalia non sta
  dentro il tablist, perché un `role="tablist"` possiede solo tab.
- **Nome accessibile della linguetta = il suo contenuto**: «3 Collegata · dopo la 2 Sabbiatura e
  soffiatura finale 7 da compilare». Non accorciarlo con `aria-label`.
- **Il blocco ha un titolo visibile** (`__title`, dalla 1.17.0), con il numero in un prefisso nascosto
  alla vista («Fase 3: »): chi naviga per intestazioni trova la fase e il suo numero.
- **Target:** linguetta ≥ 40 px (in pratica 64). Nel piede i bottoni restano a 40 px, senza
  `--small`.

### Unico form

- **Fonte di verità:** `aria-selected` sulla linguetta o sulla tab; il pannello la segue con
  `is-active`.
- **Arrivo diretto su una collegata:** lo stato lo rende il server nell'HTML, non un click simulato
  al caricamento.
- **Dopo il salvataggio si torna sul pannello attivo:** il controller scrive fase e sezione in un
  campo nascosto, il server lo rilegge.

Controller di riferimento, valido per i due livelli:

```js
function rgSelectTab(tab) {
  tab.closest('[role="tablist"]').querySelectorAll(':scope > [role="tab"]').forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    t.classList.toggle('is-active', on);
    document.getElementById(t.getAttribute('aria-controls'))?.classList.toggle('is-active', on);
  });
}
document.addEventListener('click', (e) => {
  const tab = e.target.closest('[role="tab"]'); if (tab) rgSelectTab(tab);
});
document.addEventListener('keydown', (e) => {
  const tab = e.target.closest('[role="tab"]'); if (!tab) return;
  const tabs = [...tab.closest('[role="tablist"]').querySelectorAll(':scope > [role="tab"]')];
  const i = tabs.indexOf(tab);
  const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
  if (to === undefined) return;
  e.preventDefault();
  const next = tabs[(to + tabs.length) % tabs.length];
  rgSelectTab(next); next.focus();
});
```

## Da non fare

- **Fasi collegate e sezioni nella stessa `rg-tabs`**, o linguette con l'aspetto di una tab.
- **Un fondo diverso in hover:** il fondo è il segno della scelta.
- **`rg-section-card` dentro `rg-phase-panel`**, o un titolo di sezione che ripete la tab accesa.
- **La fase senza numero**, o il nome della fase come titolo della testata della pagina: dalla 1.17.0 la
  testata parla della parte, il blocco della fase.
- **`rg-part-edge` sul blocco della fase**: il filetto colorato è della parte, e sta sulla testata.
- **La riga di riepilogo come fila di badge** fuori dal blocco: va in `__meta`, nella testa.
- **«Elimina fase» in testa alla pagina**: sta nel piede del blocco, anche per il ricamo.
- **Il colore pieno del reparto a schermo** (`rg-dept-band` senza `--quiet`).
- **`<a href>` sulle linguette in un form unico:** la navigazione perderebbe i valori non salvati.
- **Rinumerare le fasi dentro il gruppo, o usare 2a/2b.**

## Fonti

- NN/g, *Tabs, Used Right*: le tab di un controllo sono sorelle; non si mescolano tab di contenuto e
  di navigazione; la tab scelta deve distinguersi a colpo d'occhio e connettersi al suo contenuto.
- W3C ARIA APG, *Tabs Pattern*: roving tabindex, frecce, Home/Fine.
- GOV.UK Design System, *Complete multiple tasks*: i compiti correlati si raccolgono sotto
  un'intestazione di gruppo.
- Gestalt, *common region* e *connectedness*: ciò che condivide un contorno, o vi è attaccato, si
  legge come una cosa sola.
