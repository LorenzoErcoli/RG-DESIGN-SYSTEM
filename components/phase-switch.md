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
| `rg-phase-switch__title` | Titolo della fase. **Proposta 1.21.0**: figlio diretto della linguetta (senza `__text`), senza tessera del reparto, con il ruolo nascosto alla vista in coda (`Pressatura<span class="rg-u-visually-hidden">, principale</span>`). |
| `rg-phase-switch__aside` | Un solo badge: `rg-badge--count` con il **numero nudo** e «da compilare» nascosto alla vista, o `rg-badge--unresolved` («1 errore», a parole). Fase completa: niente. |
| `rg-phase-switch__text` | **Superato sulla linguetta dalla proposta 1.21.0.** Colonna di ruolo e titolo. Resta nel CSS. |
| `rg-phase-switch__role` | **Superato sulla linguetta dalla proposta 1.21.0** (il ruolo sta nella testa del pannello, `__kind`). «Principale», «Collegata · dopo la 2». Resta nel CSS. |

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
| `rg-phase-panel__department` | **Proposta 1.21.0.** La **riga del reparto**: primo figlio del blocco, prima di `__head`. `rg-dept-label` con tessera e la parola «Reparto» (`rg-dept-label__kind`): «Reparto Ricamo», «Reparto da assegnare». Chiusa da un filetto neutro rientrato. Vedi *Il reparto in una riga sua*. |
| `rg-phase-panel__kind` | (1.17.0) «Fase 2 di 4», poi lo scopo e la relazione: «Principale · con la 3», «Collegata · dopo la 2». Sempre, anche con una fase sola. Nella 1.20.0 il primo elemento era il reparto (`rg-dept-label`): **superato dalla proposta 1.21.0**, il reparto va in `__department`. |
| `rg-phase-panel__title` | (1.17.0) Il nome della fase: `<h1>` se la pagina mostra una fase, `<h2>` in un gruppo. |
| `rg-phase-panel__meta` | Riepilogo della fase: `12 materiali` · `48 stop` · `9 fili` · `dati dal PDF caricato su questa fase`. Senza testa titolata (forma 1.16) è posizione e relazione. |
| `rg-phase-panel__status` | Stato del costo (`rg-badge`) e timbro di reparto. |
| `rg-phase-panel__band` | (1.19.0) Sulla `rg-dept-band`, con `--quiet`: la **fascia del reparto**, primo figlio del blocco, da bordo a bordo, alta 48 px, etichetta a sinistra sul filo del numero. **A schermo superata dalla 1.20.0**; dalla proposta 1.21.0 il reparto va in `__department`. |
| `rg-phase-panel__dept` | **Superato dalla 1.19.0** (usare `__band`). Il timbro del reparto dentro la testa. |
| `rg-phase-panel__body` | Tab di sezione e contenuto. |
| `rg-phase-panel__sections` | (1.17.0) Sulla `rg-tabs` delle sezioni, **primo figlio** di `__body`: le tab si attaccano sotto la testa, da bordo a bordo. |
| `rg-phase-panel__intro` | (1.17.0) Prima riga di una sezione: didascalia (`<p>`) a sinistra, azioni della sezione a destra. Prende il posto della testa di `rg-section-card`. |
| `rg-phase-panel__actions` | (1.17.0) Le azioni della sezione, dentro `__intro`: al massimo una primaria. |
| `rg-phase-panel__subsection` | (1.17.0) Un blocco dentro una sezione (per esempio «Materiali non riconosciuti» sopra la «Sequenza stop»): due consecutivi sono divisi da un filetto. |
| `rg-phase-panel__gestures` | (1.18.0) Gesti sulla fase, in alto a destra nella testa: Torna alla prima lettura, Scollega, Elimina fase. |
| `rg-phase-panel__summary` | (1.18.0) Riepilogo (`__meta`) a sinistra e stato (`__status`) a destra, su una riga. |
| `rg-phase-panel__document` | (1.18.0) La zona del documento della fase ([`rg-document`](document.md)), sotto il riepilogo e sopra le tab. |
| `rg-phase-panel__foot` | **Superato dalla 1.18.0** (usare `__gestures`). Gesti sulla fase in fondo al blocco. |
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
  contenuto. Dalla proposta 1.21.0 è un **numero nudo** in entrambi i posti, lo stesso segno: la cifra
  della linguetta è la somma di quelle delle sue tab. «da compilare» resta scritto per chi usa un
  lettore di schermo.
- **La linguetta porta numero, titolo e conteggio, e basta** (proposta 1.21.0). Il ruolo sta nella
  testa del pannello, il reparto nella riga `__department`.
- **Il reparto sta in una riga sua, in cima al blocco** (proposta 1.21.0), sempre con la parola
  «Reparto» davanti. Non nella riga «Fase N di M», non sulla linguetta.
- **L'istruzione sul costo (`€`) sta nella sezione che ha campi marcati**, subito sotto le tab, e i
  campi la richiamano con `aria-describedby`. Non va in testa alla pagina fra due filetti, dove
  diventa un livello di intestazione.
- **I gesti sulla fase stanno nella testa del suo blocco**, in alto a destra (`__gestures`, dalla
  1.18.0). Non nella testata della pagina: in una pagina che mostra tre fasi non direbbe quale fase
  elimina. Non nel piede: in fondo a una pagina lunga non si trovano.
- **Il salvataggio sta fuori dai pannelli:** salva tutte le fasi insieme, e dentro un pannello
  lascerebbe credere di salvare solo quello.
- **Timbro di reparto a schermo sempre `--quiet`.** La palette categoriale a schermo convive con i
  colori di stato, e `category-3` è `danger`.

## Struttura

> La forma di riferimento della testa del blocco e della linguetta è quella di
> [Il reparto in una riga sua e la linguetta essenziale (proposta 1.21.0)](#il-reparto-in-una-riga-sua-e-la-linguetta-essenziale-proposta-1210).
> Gli snippet qui sotto restano per il corpo del blocco e le sezioni appiattite; testa e linguette
> vanno lette con quella sezione.

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

### La barra della scheda (1.17.0) — superata dalla 1.18.0

> Questa forma è **superata**: il documento sta una volta sola nella testa del blocco
> ([`rg-document`](document.md)), e i gesti sulla fase in `__gestures`. Vedi *I gesti sulla fase e il
> documento, in testa (1.18.0)*.

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

### I gesti sulla fase e il documento, in testa (1.18.0)

Provata la 1.17.0 sul campo, il giudizio: *«l'hai portata in fondo con elimina, ma non va bene. […]
Sposta su le funzioni in fondo. Rimetti elimina fase, magari non con quelli ma in cima. E dove puoi
rimetti icone. In sequenza stop rimetti la possibilità di scrivere con il compilatore»*.

La testa del blocco ha ora quattro zone, in quest'ordine:

| Zona | Classe | Che cosa |
| --- | --- | --- |
| Titolo | `rg-phase-panel__heading` | numero, «Fase N di M», nome |
| **Gesti sulla fase** | `rg-phase-panel__gestures` | a destra del titolo: «Torna alla prima lettura», «Scollega» (nei gruppi), «Elimina fase» |
| Riepilogo | `rg-phase-panel__summary` | `__meta` a sinistra, `__status` (costo, reparto) a destra |
| **Documento** | `rg-phase-panel__document` | [`rg-document`](document.md): la scheda della fase, le sue azioni di lettura, il caricamento |

Regole:

- **I gesti sulla fase stanno in alto a destra, nella riga del titolo.** Sono i gesti che cambiano o
  tolgono i dati della fase: si trovano senza scorrere, e sono lontani dalle azioni sul documento,
  che stanno due righe sotto.
- **Icona + testo per «Torna alla prima lettura» e «Scollega»**: sono azioni rare e rischiose, senza
  un segno universale. **«Elimina fase» a sola icona** dalla 1.19.0 (vedi *La fascia del reparto e
  «Elimina fase» a icona*), in un gruppo suo dopo il filetto. Tutti hanno la conferma (`data-conferma`).
- **«Torna alla prima lettura» sta coi gesti sulla fase, non col documento.** Non tocca il PDF:
  riporta stop, fili e materiali a come erano stati letti, e perde le modifiche fatte a mano. È un
  gesto sui dati della fase, della stessa famiglia di «Elimina fase». Il rischio è scritto due volte:
  nel suggerimento (`aria-describedby`, «Si perdono le modifiche a stop, fili e materiali») e nella
  conferma.
- **Il documento sta una volta sola, nella testa** (`__document`), sotto il riepilogo e sopra le tab:
  si vede da ogni sezione, e i due stati (scheda presente, assente) hanno la stessa posizione. Le
  fasi senza documento non hanno la zona.
- **Il compilatore è l'azione primaria della sezione Sequenza stop**: «Apri il compilatore», icona e
  testo, nell'intro della sezione, con «Parti collegate» accanto come secondaria. È il gesto
  principale di quella sezione, e lì lo si cerca.
- **Il piede del blocco (`__foot`, `__scope`) è superato.** Non ha più contenuto: i suoi gesti sono
  saliti in testa. Resta nel CSS e non cambia aspetto, ma non va usato.
- **Nei gruppi** ogni blocco ha i suoi gesti nella sua testa («Scollega», «Elimina fase»): la testa è
  dentro il pannello della fase scelta, quindi il gesto dice da sé a quale fase si applica.

```html
<header class="rg-phase-panel__head">
  <div class="rg-phase-panel__heading"><!-- numero, «Fase 1 di 1», titolo --></div>

  <div class="rg-phase-panel__gestures" role="group" aria-label="Azioni sulla fase 1">
    <form class="rg-u-inline" method="post" action="…/ripristina" data-conferma="La fase torna a come il sistema aveva letto il PDF la prima volta: si perdono le modifiche a stop, fili, materiali e attributi. Il PDF caricato non cambia.">
      <span class="rg-tooltip rg-tooltip--below">
        <button class="rg-button rg-button--ghost" type="submit" aria-describedby="tip-prima-lettura"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-ripristina"></use></svg>Torna alla prima lettura</button>
        <span class="rg-tooltip__text" role="tooltip" id="tip-prima-lettura">Si perdono le modifiche a stop, fili e materiali</span>
      </span>
    </form>
    <form class="rg-u-inline" method="post" action="…/delete" data-conferma="Si elimina la fase con le sue operazioni e i valori scritti.">
      <button class="rg-button rg-button--ghost rg-button--danger" type="submit"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg>Elimina fase</button>
    </form>
  </div>

  <div class="rg-phase-panel__summary">
    <p class="rg-phase-panel__meta"><span>12 materiali</span><span>48 stop</span><span>9 fili</span><span>dati dal PDF caricato su questa fase</span></p>
    <div class="rg-phase-panel__status"><!-- badge di costo, timbro di reparto --></div>
  </div>

  <div class="rg-phase-panel__document">
    <div class="rg-document"><!-- vedi components/document.md --></div>
  </div>
</header>
```

Intro della sezione Sequenza stop:

```html
<div class="rg-phase-panel__intro">
  <p>Tutti gli stop reali della scheda; apri una riga per fili, attributi e materiali.</p>
  <div class="rg-phase-panel__actions">
    <a class="rg-button rg-button--secondary" href="…/gruppo"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-collega"></use></svg>Parti collegate</a>
    <span class="rg-tooltip">
      <a class="rg-button rg-button--primary" href="…/compila" aria-describedby="tip-compilatore"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>Apri il compilatore</a>
      <span class="rg-tooltip__text" role="tooltip" id="tip-compilatore">Compila la scheda stop per stop, a schermo intero</span>
    </span>
  </div>
</div>
```

**Perché «Apri il compilatore».** Chi usa la pagina lo chiama così (*«la possibilità di scrivere con
il compilatore»*, *«compilare la scheda con il compilatore»*). L'etichetta nomina lo strumento e dice
che si apre altrove: la pagina cambia, è un `<a>`. «Compila scheda» diceva lo scopo, ma non che si
apre un editor a schermo intero. Lo scopo resta scritto nel suggerimento.

### La fascia del reparto e «Elimina fase» a icona (1.19.0)

Richiesta di chi usa la pagina: *«questa componente tutta lunga da destra a sinistra in testa a questa
scheda, sopra proprio il tipo di fase e di eliminare. Ovviamente che sta dentro la scheda stondata. E
con il pattern che ha una altezza e la label centrata alto basso e allineata a sinistra, tutto con lo
stesso padding. Eliminare usa icona come in dash del prodotto»*.

**La fascia del reparto** (`rg-phase-panel__band`, sulla `rg-dept-band`). *A schermo superata dalla 1.20.0: sotto le linguette si leggeva come il loro bordo. Vedi [Il reparto senza fascia](#il-reparto-senza-fascia-1200).*

- **È il primo figlio del blocco**, prima di `__head`: da bordo a bordo, dentro il contorno, con gli
  angoli alti arrotondati come il blocco. Sotto una linguetta attaccata (`rg-phase-switch`) l'angolo
  alto sinistro resta vivo, come quello del blocco.
- **Altezza fissa: 48 px** (`--rg-space-12`), filetto del reparto compreso. La trama riempie la fascia;
  le sette figure reggono l'altezza, perché o riempiono la banda o stanno sulla mezzeria. Nessuna è
  ancorata ai bordi: a 48 px un segno sul bordo, col contorno del blocco, si legge come una cornice.
- **L'etichetta (`__name`) è centrata in verticale e allineata a sinistra**, con lo stesso padding
  orizzontale della testa (24 px, 16 sotto i 680 px): il suo bordo sinistro cade sul filo del numero
  della fase.
- **A schermo è sempre `--quiet`**: la figura resta, il colore diventa grigio. La pagina della fase
  mostra badge di stato («costo non calcolato», «2 non risolti»), e `category-3/4/5` sono
  `danger`, `warning` e `success`. Una fascia rossa a tutta larghezza sopra un badge d'errore
  direbbe due cose con lo stesso rosso. Il colore pieno resta per la carta (`rg-worksheet-block`).
- **Reparto non assegnato**: la fascia c'è lo stesso, senza variante di reparto (filetto grigio,
  nessuna trama) e con l'etichetta «Reparto da assegnare». La testa del blocco ha la stessa altezza in
  ogni caso, e il dato mancante si legge come tale.
- **Nei gruppi** ogni blocco ha la sua fascia: le fasi di un gruppo possono stare in reparti diversi.
- Sostituisce il timbro in `__status` o in `__name` (`rg-phase-panel__dept`), che resta nel CSS.

**«Elimina fase» a sola icona**, come le azioni di riga della tabella delle parti:
`rg-icon-button rg-icon-button--full rg-icon-button--danger` con `rg-tooltip`, suggerimento
«Elimina la fase N». Rivede la regola 1.18.0 «icona + testo, mai sola icona» per questo solo gesto:

- **si applica a un solo oggetto dichiarato**, il blocco in cui sta: numero e nome sono a pochi
  centimetri;
- **il cestino è universale**, ed è lo stesso segno dell'eliminazione nelle righe del prodotto;
- **ha sempre la conferma**, che nomina la fase;
- **sta in un gruppo suo**, l'ultimo, separato dal filetto (`rg-action-group` + `rg-action-group`).

**«Torna alla prima lettura» e «Scollega» restano icona + testo.** Non hanno un segno universale: una
freccia di ritorno si legge come «annulla» o «ricarica», una catena spezzata come «scollega un link».
E cambiano i dati in un modo che non si indovina dall'icona: il primo perde le modifiche fatte a mano,
il secondo cambia la struttura del gruppo. Per azioni rare e con conseguenze non ovvie vale la regola
generale: icona + testo.

```html
<section class="rg-phase-panel" aria-labelledby="titolo-fase">
  <p class="rg-dept-band rg-dept-band--ricamo rg-dept-band--quiet rg-phase-panel__band"><span class="rg-dept-band__name">Campionario Ricamo</span></p>
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading"><!-- numero, «Fase 1 di 6», titolo --></div>
    <div class="rg-phase-panel__gestures" role="group" aria-label="Azioni sulla fase 1">
      <div class="rg-action-group">
        <form class="rg-u-inline" method="post" action="…/ripristina" data-conferma="…">
          <span class="rg-tooltip rg-tooltip--below">
            <button class="rg-button rg-button--ghost" type="submit" aria-describedby="tip-prima-lettura"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-ripristina"></use></svg>Torna alla prima lettura</button>
            <span class="rg-tooltip__text" role="tooltip" id="tip-prima-lettura">Si perdono le modifiche a stop, fili e materiali</span>
          </span>
        </form>
      </div>
      <div class="rg-action-group">
        <form class="rg-u-inline" method="post" action="…/delete" data-conferma="Si elimina la fase 1, «Ricamo normale», con le sue operazioni e i valori scritti.">
          <span class="rg-tooltip rg-tooltip--below rg-tooltip--end">
            <button class="rg-icon-button rg-icon-button--full rg-icon-button--danger" type="submit" aria-labelledby="tip-elimina-fase-1"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg></button>
            <span class="rg-tooltip__text" role="tooltip" id="tip-elimina-fase-1">Elimina la fase 1</span>
          </span>
        </form>
      </div>
    </div>
    <!-- __summary, __document come nella 1.18.0 -->
  </header>
  <!-- __body -->
</section>
```

Reparto non assegnato:

```html
<p class="rg-dept-band rg-dept-band--quiet rg-phase-panel__band"><span class="rg-dept-band__name">Reparto da assegnare</span></p>
```

### Il reparto senza fascia (1.20.0)

Prova a schermo sulla 1.19.0: la fascia grigia `__band`, subito sotto le linguette, **si legge come
il bordo delle linguette, non come «reparto»**; e il nome del reparto è già sulla linguetta.
Decisione: **a schermo la fascia sopra il blocco della fase si toglie**. Il reparto passa in due segni
piccoli, con la tessera [`rg-dept-mark`](dept-mark.md) — la figura della banda ridotta a 20 px:

- **sulla linguetta**, la tessera `--quiet` davanti al titolo, dentro `__title`. È sola (il nome del
  reparto non c'è), quindi porta `role="img"` e `aria-label="Reparto: <nome>"`, più `title` per il
  puntatore. Prende il colore del testo della linguetta: grigio dietro, nero sulla scelta e in hover;
- **nel blocco**, `rg-dept-label` (tessera + nome) come **primo elemento** di `__kind`:
  «[tessera] PRESSATURA E SOFFIATURA · FASE 2 DI 6 · RIMOZIONE GARZE · CON LA 3». Il nome è scritto,
  la tessera è `aria-hidden`. Il nome è in nero, il resto della riga resta nel colore d'etichetta.
- **reparto non assegnato**: tessera senza variante (vuota, bordo tratteggiato) e «Reparto da
  assegnare» come primo elemento di `__kind`.

**Il blocco senza fascia non ha un modificatore**, e non serve. La testa `__head` torna primo figlio
del blocco, col suo padding (16 sopra, 24 ai lati; 16 sotto i 680 px), come fino alla 1.18.0; l'unica
regola che la fascia aveva introdotto (l'angolo vivo sotto la linguetta) sta sulla `__band` e se ne va
con lei. Misurato: sotto le linguette il bordo nero del blocco, poi 16 px, poi la riga `__kind`; la
tessera sporge di 2 px sopra e sotto senza alzare la riga, e il numero della fase resta sul filo del
titolo. Il marcatore `rg-phase-panel__band` resta nel CSS per chi non ha ancora tolto la fascia.

**Sul foglio stampato non cambia nulla**: `rg-worksheet-block` con `rg-dept-band` a colori, `__name`
e `__note`.

```html
<div class="rg-phase-switch">
  <p class="rg-phase-switch__caption" id="fasi-gruppo">Fasi del gruppo · si salvano insieme</p>
  <div class="rg-phase-switch__tabs" role="tablist" aria-labelledby="fasi-gruppo">
    <button class="rg-phase-switch__item rg-phase-switch__item--principal" type="button" role="tab" id="tab-fase-2" aria-controls="fase-2" aria-selected="true" tabindex="0">
      <span class="rg-phase-switch__num">2</span>
      <span class="rg-phase-switch__text">
        <span class="rg-phase-switch__role">Principale</span>
        <span class="rg-phase-switch__title"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" role="img" aria-label="Reparto: Pressatura e soffiatura" title="Pressatura e soffiatura"></span>Rimozione garze</span>
      </span>
      <span class="rg-phase-switch__aside"><span class="rg-badge rg-badge--count">6 da compilare</span></span>
    </button>
    <!-- le altre linguette, ciascuna con la tessera del suo reparto -->
  </div>
</div>

<section class="rg-phase-panel rg-tabpanel is-active" role="tabpanel" id="fase-2" aria-labelledby="tab-fase-2">
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">2</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind">
          <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span>Pressatura e soffiatura</span>
          <span>Fase 2 di 6</span>
          <span>Rimozione garze · con la 3</span>
        </p>
        <h2 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 2: </span>Rimozione garze</h2>
      </div>
    </div>
    <!-- __gestures, __summary, __document come nella 1.18.0 / 1.19.0 -->
  </header>
  <div class="rg-phase-panel__body"><!-- tab di sezione e contenuto --></div>
</section>
```

### Il reparto in una riga sua e la linguetta essenziale (proposta 1.21.0)

Giudizio sulla 1.20.0 a schermo: *«questa testata così non è chiara. hai tolto la fascia che metti
invece sulle schede. poi così è tutto attaccato reparto e fase. Per me va bene anche così non con la
fascia anche se forse mi sembrava più interessante, ma basta che non sia così attaccata una all'altra.
anche le tab sono un po' confusionarie così. troppe info. per il ricamo scriviamo Reparto Ricamo.
Forse lo metterei ovunque Reparto e quello che è»*.

Due difetti veri:

- **Il reparto era il primo pezzo della riga della fase.** «PRESSATURA E SOFFIATURA · FASE 2 DI 2 ·
  RIMOZIONE GARZE · CON LA 3»: quattro pezzi maiuscoli dello stesso corpo, divisi dallo stesso punto.
  Il reparto si leggeva come un attributo della fase, e il nome «Pressatura» della fase e quello del
  reparto si toccavano.
- **La linguetta diceva quattro cose**: numero, ruolo, tessera del reparto e titolo, più «10 da
  compilare». Due linguette, dieci informazioni, e tre ripetute nel pannello sotto.

**La testa: il reparto in una riga sua** (`rg-phase-panel__department`).

```
┌──────────────────────────────────────────────────────────────┐
│ [▦] REPARTO Pressatura e soffiatura                          │
│ ──────────────────────────────────────────────────────────── │  filetto neutro, rientrato
│ [2] FASE 2 DI 4 · RIMOZIONE GARZE · PRINCIPALE · CON LA 3    │
│     Pressatura                                   [gesti]     │
```

- **Primo figlio del blocco**, prima di `__head`. Una riga, alta 44 px (12 + 20 + 12).
- **Chiusa da un filetto neutro rientrato**, sul filo del contenuto (24 px dai bordi, 16 sotto i
  680 px). Non tocca il contorno del blocco: si legge come una divisione interna, non come il bordo
  delle linguette.
- **Tre differenze dalla riga della fase**, oltre al filetto: il nome è in tondo a 14 px (la riga della
  fase è maiuscola a 12), la parola «Reparto» è scritta davanti, e la tessera cade sul filo del numero
  della fase.
- **La parola «Reparto» sempre davanti** (`rg-dept-label__kind`): «Reparto Ricamo», «Reparto
  Pressatura e soffiatura», «Reparto da assegnare». Con uno spazio vero dopo la parola: si copia e si
  legge per intero. Il nome è quello che dà la piattaforma; per il ricamo, «Ricamo».
- **La tessera resta**, `--quiet`, in nero: è il ponte con la fascia del foglio stampato e con l'elenco.
  È `aria-hidden`, perché il nome è scritto. Dalla stessa proposta è un **ritaglio di trama** senza
  contorno, non un segno in un quadratino: la croce sola del ricamo si leggeva «chiudi» (vedi
  [dept-mark](dept-mark.md#le-sette-trame-proposta-1210)).
- **Nessun fondo, nessuna trama.** Sotto la linguetta scelta, che è bianca e si fonde col pannello, un
  fondo grigio si leggerebbe di nuovo come la base della linguetta.
- **Reparto non assegnato**: tessera senza variante (vuota, tratteggiata) e «Reparto da assegnare».
  La riga c'è sempre: la testa ha la stessa forma in ogni caso.
- **Nei gruppi** ogni pannello ha la sua riga: le fasi di un gruppo possono stare in reparti diversi.
- `__kind` torna a dire solo della fase: «Fase N di M», scopo, relazione.

Due forme scartate:

- **Etichetta a destra**, nella riga del titolo. Contende lo spazio ai gesti sulla fase («Scollega»,
  «Elimina»), e accanto a un bottone di eliminazione il nome del reparto sembra il bersaglio del gesto.
  Sotto i 680 px va a capo in un punto che non si decide.
- **Fascia bassa su fondo grigio**, 32 px in cima al blocco. È la forma che il giudizio trovava «forse più
  interessante», ma sotto la linguetta bianca il grigio si legge ancora come la sua base: lo stesso
  difetto della fascia 1.19, solo più basso. La riga col filetto rientrato tiene l'idea della fascia
  (una zona sua, da parte a parte) senza toccare il bordo.

**La linguetta essenziale.** Numero, titolo, conteggio.

| Prima (1.20.0) | Ora | Perché |
| --- | --- | --- |
| numero | numero | è il segno che lega linguetta, elenco e testa |
| ruolo «Principale», «Collegata · dopo la 2» | nascosto alla vista, in coda al titolo | il dente della graffa segna la principale; la relazione è scritta nella testa del pannello |
| tessera del reparto | niente | il reparto è nel pannello; principale e collegate sono spesso dello stesso reparto |
| titolo | titolo, centrato sul numero | |
| «10 da compilare» | `10`, con «da compilare» nascosto alla vista | lo stesso segno delle tab di sezione, e la somma delle loro cifre |
| «completa» | niente | nessun numero = niente da compilare |
| «1 errore» | «1 errore» | un errore resta a parole: non deve dipendere dal rosso |

Scartato: **il ruolo in piccolo solo sulla collegata.** Una linguetta con due righe accanto a una con
una sola ha altezze di testo diverse, e il ruolo sulla collegata ripete la relazione che il pannello
scrive per intero. Il dente basta a dire quale è la principale.

L'altezza della linguetta non cambia (12 + 32 + 12): graffa e dente restano dove sono.

Gruppo, pannello della principale:

```html
<div class="rg-phase-switch">
  <p class="rg-phase-switch__caption" id="fasi-gruppo">Fasi del gruppo · si salvano insieme</p>
  <div class="rg-phase-switch__tabs" role="tablist" aria-labelledby="fasi-gruppo">
    <button class="rg-phase-switch__item rg-phase-switch__item--principal" type="button" role="tab" id="tab-fase-2" aria-controls="fase-2" aria-selected="true" tabindex="0">
      <span class="rg-phase-switch__num">2</span>
      <span class="rg-phase-switch__title">Pressatura<span class="rg-u-visually-hidden">, principale</span></span>
      <span class="rg-phase-switch__aside"><span class="rg-badge rg-badge--count">6<span class="rg-u-visually-hidden"> da compilare</span></span></span>
    </button>
    <button class="rg-phase-switch__item" type="button" role="tab" id="tab-fase-3" aria-controls="fase-3" aria-selected="false" tabindex="-1">
      <span class="rg-phase-switch__num">3</span>
      <span class="rg-phase-switch__title">Sabbiatura<span class="rg-u-visually-hidden">, collegata</span></span>
      <span class="rg-phase-switch__aside"><span class="rg-badge rg-badge--count">7<span class="rg-u-visually-hidden"> da compilare</span></span></span>
    </button>
  </div>
</div>

<section class="rg-phase-panel rg-tabpanel is-active" role="tabpanel" id="fase-2" aria-labelledby="tab-fase-2">
  <p class="rg-phase-panel__department"><span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Pressatura e soffiatura</span></p>
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">2</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 2 di 4</span><span>rimozione garze</span><span>Principale · con la 3</span></p>
        <h2 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 2: </span>Pressatura</h2>
      </div>
    </div>
    <!-- __gestures, __summary, __document come nella 1.18.0 / 1.19.0 -->
  </header>
  <div class="rg-phase-panel__body"><!-- tab di sezione («Informazioni generali 2», «Parametri tecnici 4») e contenuto --></div>
</section>
```

Fase da sola, il ricamo:

```html
<section class="rg-phase-panel" aria-labelledby="titolo-fase">
  <p class="rg-phase-panel__department"><span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--ricamo rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Ricamo</span></p>
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">1</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 1 di 1</span></p>
        <h1 class="rg-phase-panel__title" id="titolo-fase"><span class="rg-u-visually-hidden">Fase 1: </span>Ricamo normale</h1>
      </div>
    </div>
    <!-- __gestures, __summary, __document -->
  </header>
  <div class="rg-phase-panel__body"><!-- … --></div>
</section>
```

Reparto non assegnato:

```html
<p class="rg-phase-panel__department"><span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> da assegnare</span></p>
```

**Che cosa è superato** (resta nel CSS, non cambia aspetto, non va usato nel markup nuovo):

- sulla linguetta: `__text`, `__role` visibile, la tessera `rg-dept-mark` dentro `__title`, le parole
  «da compilare» e «completa» nel badge;
- nel blocco: `rg-dept-label` come primo elemento di `__kind`.

**Migrazione in `rg-product-platform`**: nel pannello, spostare il `rg-dept-label` da `__kind` a un
`<p class="rg-phase-panel__department">` prima di `__head`, aggiungere
`<span class="rg-dept-label__kind">Reparto</span>` e uno spazio davanti al nome; sulla linguetta,
togliere `__text` e `__role`, portare `__title` diretto nella linguetta senza tessera, aggiungere il
ruolo nascosto, ridurre il badge al numero con «da compilare» nascosto, togliere «completa».

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
  soffiatura finale 7 da compilare»; dalla 1.20.0 con il reparto dalla tessera, «3 Collegata · dopo
  la 2 Reparto: Pressatura e soffiatura Sabbiatura e soffiatura finale 7 da compilare». Dalla
  proposta 1.21.0, con ruolo e «da compilare» nascosti alla vista, Chrome calcola «3 Sabbiatura e
  soffiatura finale, collegata 7 da compilare». Non accorciarlo con `aria-label` sulla linguetta.
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
- **«Elimina fase» nella testata della pagina, fra le azioni del documento, o nel piede del blocco**:
  sta nella testa del blocco, in `__gestures`.
- **Il compilatore fra sei bottoni uguali**: è la primaria della sezione Sequenza stop.
- **Il colore pieno del reparto a schermo** (`rg-dept-band` senza `--quiet`).
- **La fascia `__band` subito sotto le linguette** (dalla 1.20.0): si legge come il loro bordo. A schermo il reparto sta nella tessera.
- **La tessera del reparto sola e muta**: sulla linguetta ha `role="img"` e `aria-label`, nella riga `__kind` ha il nome accanto.
- **Il reparto attaccato alla fase** (dalla proposta 1.21.0): non va come primo pezzo di `__kind`, sta nella riga `__department`.
- **La riga del reparto con un fondo o con il filetto da bordo a bordo**: sotto la linguetta scelta si legge come la sua base.
- **Il ruolo, la tessera o «N da compilare» a parole sulla linguetta**: numero, titolo e un numero nudo bastano.
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
