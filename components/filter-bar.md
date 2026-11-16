# Barra dei filtri di un elenco (`rg-filter-bar`, `rg-filter`) — proposta 1.55.0

## Scopo

Restringere un elenco lungo (Prodotti, Registro codici RG) **sopra l'elenco stesso**, in una barra
sola: la ricerca, i filtri che si usano sempre, quelli rari dietro «Aggiungi filtro», e sotto quello
che si è scelto, togliendolo con un clic. Forma decisa da Lorenzo (2026-11-16) per **tutte** le
pagine elenco della piattaforma, chiesta dalla chat «Prodotti e varianti» della RG Product Suite.

Cosa fa, punto per punto:

1. Una barra: ricerca + filtri fissi (Cliente, Categoria, Collezione + Anno, Divisione). I filtri
   rari (Gamma, 76 valori) dietro **Aggiungi filtro**.
2. Ogni filtro si apre e mostra i valori con **caselle di spunta**: più valori insieme, e accanto a
   ogni valore **quanti elementi** ha («DIOR 172»). Nei filtri con molti valori, un campo per
   **cercare dentro la lista**.
3. Il bottone del filtro dice se è attivo e quanti valori: «Cliente · 2».
4. Sotto la barra, ogni valore scelto è un'**etichetta con la ×** (un link che lo toglie), più
   **Togli tutti**.
5. È un **`<form method="get">`**: i valori vanno nell'indirizzo come parametri ripetuti
   (`?cliente=DIOR&cliente=FENDI`) e **funziona senza JavaScript**. Il JS invia da solo, non serve.
6. Sul telefono (fino a 680 px) i filtri stanno in un pannello che si apre con **Filtri · N**.

Insieme alla barra, la stessa proposta aggiunge due pezzi che l'elenco filtrato usa:

- la **riga di gruppo** della tabella, per «Raggruppa per» — [tables](tables.md#riga-di-gruppo-rg-table__group-proposta-1550);
- le **uscite dello stato vuoto**, per «Nessun prodotto con questi filtri» —
  [alerts](alerts.md#le-uscite-dello-stato-vuoto-rg-empty__actions-proposta-1550).

## Che cosa c'era e perché non bastava

| Esistente | Perché non copre |
| --- | --- |
| `rg-filter-group` | campi di un form in griglia con un'azione al piede: un `<select>` per filtro, **un valore** per filtro, niente conteggi. |
| `rg-toolbar` | il contenitore giusto (una barra sopra l'elenco), ma vuoto: non dice come è fatto un filtro. La barra dei filtri ne prende le misure (16 px ai lati, 12 sopra e sotto, filetti sopra e sotto). |
| `rg-chip` | la casella-pillola: scelta multipla fra **poche** opzioni brevi, tutte in vista. 76 gamme non stanno in vista. Il chip resta: l'etichetta che toglie è una sua variante, `rg-chip--remove`. |
| `rg-action-menu` | il pannello sospeso giusto (un `<details>`, filetto nero, ombra minima), ma per **azioni**, non per caselle che si inviano con un form. |
| `rg-autocomplete` | scrive **un** valore in un campo. Qui si restringe una lista di caselle e il campo non manda niente: è `rg-filter__find` (vedi sotto). |

## Varianti e forme

Una sola barra, due misure dello stesso markup:

| Larghezza | Forma |
| --- | --- |
| sopra i 680 px | **una riga**: ricerca, filtri, «Aggiungi filtro». Ogni filtro apre un **pannello sospeso** sotto il suo bottone (`--rg-z-dropdown`). Sotto, la **riga del risultato**: quanti elementi, le etichette, «Togli tutti» e a destra «Raggruppa per». |
| fino a 680 px | la ricerca e il bottone **Filtri · N**; il resto in un **pannello che si apre sotto la barra, nel flusso**, con i filtri come voci a tutta larghezza che si aprono in loco, e **Applica** in fondo. La riga del risultato resta fuori dal pannello. |

Modificatori e stati:

- `rg-filter-bar--live` — lo mette il **controller**, non il template: dice che il form si invia da
  solo, e sopra i 680 px «Applica» esce.
- `rg-filter--end` — lo mette il controller quando il pannello non ci sta a destra: si apre verso
  sinistra.
- Filtro **attivo**: lo dice il DS da solo, con `:has()` sulle caselle spuntate — contorno nero
  invece che grigio. Il **numero** sul bottone lo scrive il server (`rg-filter__count`). Il colore non
  è mai l'unico segno: c'è il numero.
- Filtro **aperto**: `[open]` del `<details>`, segno `+`/`−` come [rg-disclosure](disclosure.md) e
  la topbar del telefono.

## Uso e limiti

### Il form

- `method="get"`, `role="search"`, `aria-label` che nomina l'elenco. **Ogni casella ha `name` e
  `value`**: il browser manda un parametro per ogni casella spuntata, e i parametri ripetuti sono la
  forma dell'indirizzo. Il server legge le liste (`request.query_params.getlist("cliente")`).
- La ricerca `rg-filter__find` **non ha `name`**: non finisce nell'indirizzo.
- Il campo di ricerca generale manda `q=` anche vuoto: il server lo ignora se è vuoto.
- Ordine dei figli di `rg-filter-bar__row` **obbligatorio**: `__search`, `__toggle`, `__panel`. Il
  pannello è **fratello** del `<details>` del telefono e sta **dopo** di lui: lo mostra il selettore
  `[open] ~`, come [rg-topbar__menu](navigation.md). Stessa regola per `__more` e `__extra`.

### I filtri

- Ogni filtro è un `<details class="rg-filter">` con **lo stesso `name`** degli altri della barra
  (es. `name="filtri-prodotti"`): il browser ne tiene aperto **uno alla volta**. Dove l'attributo
  non è supportato, lo fa il controller.
- Il bottone è `<summary class="rg-button rg-button--outline rg-filter__trigger">`: 40 px, 44 al
  tocco.
- **Il numero sul bottone**: `<span class="rg-filter__count"><span class="rg-u-visually-hidden">,
  scelti </span>2</span>`. Il punto mediano lo genera il DS ed è muto per il lettore di schermo, che
  legge «Cliente, scelti 2». Senza valori scelti lo `span` non c'è.
- Le caselle stanno in un `<fieldset class="rg-filter__set">` con la sua `<legend>`:
  `rg-u-visually-hidden` se l'insieme è uno solo (il nome lo dice già il bottone), **visibile**
  (`rg-filter__legend`) se nello stesso pannello ce ne sono due — Collezione e Anno.
- Ogni valore: `<label class="rg-filter__option">` con la casella, `rg-filter__value` e
  `rg-filter__n`. Il numero è mono, tabulare, e porta la parola in `rg-u-visually-hidden`
  («172 prodotti»): a schermo la parola si ripeterebbe su ogni riga, ma chi ascolta deve sapere che
  cosa conta.
- **Cosa contano i numeri** (lo decide il server, il DS non lo sa, ma la regola è una): quanti
  elementi avrebbe l'elenco **con quel valore e con gli altri filtri come sono**. Un valore che
  darebbe 0 e non è scelto **non si mostra**; un valore scelto resta anche a 0, perché lo si possa
  togliere.
- **Ordine dei valori**: prima gli scelti, poi gli altri per numero decrescente (o alfabetico, se il
  filtro è una scala come l'anno). Un elemento senza quel dato **non sparisce in silenzio**: se serve,
  c'è il valore «Senza cliente» in fondo.
- La lista scorre dentro il pannello (sei righe e mezza in vista): il pannello non cresce oltre.
- **Piè del pannello** `rg-filter__foot`: **Applica** (submit) sempre, per ultimo, a destra; **Togli**
  (un link all'indirizzo senza quel filtro) solo se il filtro è attivo, a sinistra.

### La ricerca dentro la lista

- `<input class="rg-search rg-filter__find" type="search" aria-label="Cerca fra i clienti" hidden>`
  in testa al pannello, **solo nei filtri con molti valori** (indicativo: più di 10). Nasce `hidden`:
  senza JavaScript non farebbe niente, e un campo che non risponde è peggio di un campo che non c'è.
  Il controller la rivela.
- **Non è rg-autocomplete** e non va riusato: il controller di quello è delegato su
  `.rg-autocomplete__input` e scrive il valore scelto nel campo, mentre qui si **spunta**. Non è
  neanche [rg-lookup](lookup.md): i valori ci sono già tutti nella pagina, non si chiede al server.
- Restringe mentre si scrive, senza badare a maiuscole e accenti; **i valori già scelti restano in
  vista** anche se non corrispondono. Se nessun altro valore corrisponde compare `rg-filter__empty`
  («Nessun cliente con questo testo.»). Invio non manda il form.

### I filtri rari

- **Aggiungi filtro** è `<details class="rg-filter-bar__more">` vuoto, con il bottone
  `rg-button--ghost` e l'icona `aggiungi`. Il suo fratello `rg-filter-bar__extra` contiene i filtri
  rari, già fatti come gli altri: quando «Aggiungi filtro» è aperto, compaiono **nella riga**,
  accanto ai fissi.
- **Un filtro raro con valori scelti non sta lì**: il server lo mette fra i fissi, così «Gamma · 1»
  si vede sempre. Le sue caselle, anche nascoste, sono comunque nel form e si inviano.

### Il risultato e le etichette

- `rg-filter-bar__active` è **la riga del risultato**, sotto i filtri: `rg-filter-bar__result`
  («**37** prodotti su 412»), le etichette, **Togli tutti**, e in fondo a destra **Raggruppa per**.
- **Ogni etichetta** è `<a class="rg-chip rg-chip--remove">` con in testa `<span
  class="rg-u-visually-hidden">Togli </span>`, poi `<span class="rg-chip__key">Cliente</span>`, il
  valore e l'icona `chiudi`. L'`href` è l'indirizzo di adesso **senza quel valore**: lo costruisce il
  server. Anche la ricerca generale ha la sua etichetta («Ricerca tote»).
- La pillola resta alta 32 px; il bersaglio è **40** grazie a un sovrapposto invisibile che sporge
  4 px sopra e sotto (misurato: a 3 px sopra il bordo si è sul link, a 5 no). Per questo le righe di
  etichette stanno a 8 px una dall'altra e niente di cliccabile va più vicino. Al tocco la pillola
  sale a 44 e il sovrapposto non serve.
- **Togli tutti**: `rg-button rg-button--ghost`, link all'indirizzo senza filtri (tiene il
  raggruppamento). Senza filtri attivi non c'è, e la riga mostra solo il risultato.

### Raggruppa per

- `<label class="rg-filter-bar__setting">Raggruppa per <select class="rg-select"
  name="raggruppa">`: un `<select>` va bene, le scelte sono cinque e brevi. Sta nella riga del
  risultato perché **non filtra**: dice come si legge l'elenco. Misurato: nella prima riga, a 1280 px
  la barra andava a capo.
- L'elenco raggruppato usa la **riga di gruppo** di [rg-table](tables.md#riga-di-gruppo-rg-table__group-proposta-1550).
- Non diventa un'etichetta da togliere: non è un filtro.

### Più comandi di «come si guarda»: `rg-filter-bar__settings` (proposta 1.56.0)

La pagina Prodotti ne ha due: la **Vista** «Cartelle | Tutti» (due indirizzi) e, accanto, «**Cartelle
per**» (fra le cartelle: Cliente · Collezione + Anno · Anno · Categoria, anche questi indirizzi) oppure
«**Raggruppa per**» (nell'elenco, il `<select>`). Nessuno dei due filtra, quindi stanno nella riga del
risultato, a destra.

- Con due `__setting` il `margin-inline-start: auto` di ognuno li staccherebbe l'uno dall'altro.
  **`rg-filter-bar__settings`** li tiene **insieme**, a destra, a 16 px l'uno dall'altro, e va a capo
  come un blocco solo. Dentro, ogni `__setting` perde l'auto.
- Un comando con l'etichetta visibile è un `__setting` («Cartelle per» + il segmented, «Raggruppa per» +
  il select). Un comando che si spiega da sé — la Vista: «Cartelle | Tutti» — è il suo
  [`rg-segmented` a link](forms.md#segmented-a-link-proposta-1560), figlio diretto di `__settings`, con
  `aria-label="Vista"`.
- I segmented a link: `<a class="rg-segmented__item">`, la voce scelta con `aria-current`. Dentro
  `__settings` il gruppo può andare a capo: «Cliente · Collezione + Anno · Anno · Categoria» a 375 px
  non sta su una riga.
- **Sul telefono restano in vista**: la riga del risultato non sta nel pannello «Filtri». Sotto i 680 px
  `__settings` va a capo **sotto le etichette**, a tutta larghezza, un comando per riga; l'etichetta a
  sinistra e il comando a destra, o sotto se non c'è posto.
- Un solo comando? Resta valido il `__setting` da solo, come nella 1.55.0.

```html
<div class="rg-filter-bar__active">
  <p class="rg-filter-bar__result"><strong>14</strong> cartelle · <strong>238</strong> articoli · 412 prodotti</p>
  <div class="rg-filter-bar__settings">
    <div class="rg-segmented" role="group" aria-label="Vista">
      <a class="rg-segmented__item" href="/?view=folders" aria-current="page">Cartelle</a>
      <a class="rg-segmented__item" href="/?view=all">Tutti</a>
    </div>
    <div class="rg-filter-bar__setting"><span id="cartelle-per">Cartelle per</span>
      <div class="rg-segmented" role="group" aria-labelledby="cartelle-per">
        <a class="rg-segmented__item" href="/?group=client" aria-current="true">Cliente</a>
        <a class="rg-segmented__item" href="/?group=collection">Collezione + Anno</a>
        <a class="rg-segmented__item" href="/?group=year">Anno</a>
        <a class="rg-segmented__item" href="/?group=category">Categoria</a>
      </div>
    </div>
  </div>
</div>
```

Nella vista elenco, al posto del secondo `__setting`, il `<label class="rg-filter-bar__setting">Raggruppa
per <select class="rg-select" name="raggruppa">…</select></label>` di sempre.

### La barra in testa a una section card (proposta 1.56.0)

Da sola la barra è una fascia bianca con un filetto sopra e uno sotto, e quello che viene dopo
(percorso, cartelle, tabella) sta sul **fondo** grigio, che non è una superficie di lettura
([design-rules §6](../design-rules.md#quale-superficie-a-quale-profondità)). Per avere barra e contenuto
**su un solo bianco** la barra va **dentro** una [`rg-section-card`](section-card.md), come **primo
figlio, al posto di `__header`**:

- il filetto di sopra esce (lo fa il contorno della card), i lati salgono a **24**, il filo della testa
  e del corpo della card;
- il filetto di sotto **resta** e fa da linea fra testa e corpo — tranne quando il corpo comincia con
  una tabella (`rg-section-card--flush` > `__body` > `rg-table-wrap` per primo): l'intestazione della
  tabella porta già il suo filetto nero, e la barra toglie il suo da sola (`:has()`), senza classi;
- nessuna classe nuova: la regola è contestuale (`.rg-section-card > .rg-filter-bar`). Una section card
  **senza `__header` è ammessa solo così**.

Il corpo: **standard** (24 di padding) quando il contenuto sono percorso, fila di record e cartelle;
**`--flush`** quando è la tabella. Il modificatore lo sceglie il template a seconda della vista.

```html
<section class="rg-section-card" aria-label="Prodotti per cliente">
  <form class="rg-filter-bar" method="get" action="/" role="search" aria-label="Filtri dell'elenco prodotti">
    <div class="rg-filter-bar__row">…</div>
    <div class="rg-filter-bar__active">…</div>
  </form>
  <div class="rg-section-card__body rg-stack">
    <nav class="rg-breadcrumb" aria-label="Percorso nelle cartelle">…</nav>
    <section class="rg-record-strip" aria-labelledby="ultimi">…</section>
    <div class="rg-folder-grid rg-folder-grid--compact">…</div>
  </div>
</section>

<section class="rg-section-card rg-section-card--flush" aria-label="Tutti i prodotti">
  <form class="rg-filter-bar" …>…</form>
  <div class="rg-section-card__body">
    <div class="rg-table-wrap"><table class="rg-table">…</table></div>
  </div>
</section>
```

La pagina intera, nei tre stati (cartelle alla radice, dentro una cartella, elenco), è in
[examples/rg-pagina-elenco.html](../examples/rg-pagina-elenco.html).

### Lo stato vuoto

Quando i filtri non lasciano niente, al posto della tabella un [rg-empty](alerts.md) con le sue
uscite (`rg-empty__actions`): il titolo dice che cosa è vuoto, il testo dice **quale filtro lo
svuota** e quanti elementi tornerebbero togliendolo, il primo bottone toglie **quel** filtro, il
secondo li toglie tutti. Il filtro da nominare lo sceglie il server: quello che, tolto da solo, fa
tornare più elementi. La barra resta sopra, con «**0** prodotti su 412».

### Sul telefono

- Il bottone **Filtri · N** (N = tutti i valori scelti) ha il contorno nero quando c'è almeno un
  filtro attivo. Apre il pannello sotto la barra: nel flusso, non sospeso, quindi **non copre** la
  pagina e non ha bisogno di Esc.
- Dentro, i filtri sono voci a tutta larghezza separate da filetti; il pannello di ognuno si apre
  **in loco**. In fondo **Applica**: sul telefono si sceglie in più filtri e si applica una volta.
- La riga del risultato resta **fuori** dal pannello: le etichette si vedono sempre.

### Cosa fa il JavaScript (facoltativo)

Il DS non serve JavaScript. Il controller di riferimento è qui sotto e in
[examples/rg-filter-bar.html](../examples/rg-filter-bar.html), dove gira; nella piattaforma va in un
file suo (`static/js/rg-filter-bar.js`), caricato con `defer`. Fa sei cose:

1. mette `rg-filter-bar--live` sul form e **rivela** le ricerche dentro le liste;
2. **restringe la lista** mentre si scrive;
3. tiene aperto **un filtro alla volta** anche dove `name` sui `<details>` non è supportato;
4. sopra i 680 px: **invia il form quando un filtro si chiude**, se le caselle sono cambiate — non a
   ogni casella, perché a ogni casella la pagina si ricaricherebbe e il pannello si chiuderebbe a metà
   scelta. Si chiude ritoccando il bottone, aprendo un altro filtro, cliccando fuori o con **Applica**.
   Se il pannello non ci sta a destra lo gira (`rg-filter--end`). «Raggruppa per» invia appena cambia,
   a ogni misura;
5. **Esc** chiude il filtro e **rimette le caselle com'erano**: Esc annulla, non applica. Il fuoco
   torna al bottone;
6. aggiorna il **numero sul bottone** mentre si spunta.

Sul telefono non invia da solo alla chiusura: c'è «Applica» in fondo al pannello.

### Limiti dichiarati

- **Senza JavaScript** il pannello sospeso non si chiude cliccando fuori né con Esc (si chiude
  ritoccando il bottone, o con Applica), due filtri possono restare aperti insieme nei browser che
  non conoscono `name` sui `<details>`, e il pannello dell'ultimo filtro a destra può uscire dalla
  finestra se la finestra è stretta.
- Senza JavaScript, sul telefono, «Raggruppa per» si applica con «Applica» dentro il pannello Filtri.
- Il DS non calcola i conteggi né gli indirizzi delle etichette: sono del server.
- La barra non si tiene ferma in alto mentre si scorre l'elenco. Se servirà, è una variante a parte.
- **In stampa** spariscono i comandi; restano il risultato e le etichette (senza la ×), che dicono
  quale parte dell'elenco è sul foglio.

## Struttura

```
form.rg-filter-bar                          method="get", role="search", aria-label
├─ .rg-filter-bar__row
│  ├─ .rg-filter-bar__search                label (rg-u-visually-hidden) + input.rg-search name="q"
│  ├─ details.rg-filter-bar__toggle         solo telefono: summary «Filtri · N»
│  └─ .rg-filter-bar__panel                 FRATELLO del toggle, DOPO di lui
│     ├─ details.rg-filter name="…"         un filtro (ripetuto)
│     │  ├─ summary.rg-button.rg-button--outline.rg-filter__trigger   nome + .rg-filter__count
│     │  └─ .rg-filter__panel
│     │     ├─ input.rg-search.rg-filter__find hidden   (solo filtri con molti valori; senza name)
│     │     ├─ fieldset.rg-filter__set > legend + ul.rg-filter__options > li > label.rg-filter__option
│     │     │                                          input[type=checkbox][name][value] + .rg-filter__value + .rg-filter__n
│     │     ├─ p.rg-filter__empty hidden
│     │     └─ .rg-filter__foot             [Togli] + Applica (submit, ultimo)
│     ├─ details.rg-filter-bar__more        «Aggiungi filtro», vuoto
│     ├─ .rg-filter-bar__extra              FRATELLO di __more, DOPO di lui: i filtri rari
│     └─ button.rg-filter-bar__apply        «Applica» (senza JS; sul telefono sempre)
└─ .rg-filter-bar__active                   la riga del risultato
   ├─ p.rg-filter-bar__result
   ├─ ul.rg-filter-bar__tags > li > a.rg-chip.rg-chip--remove
   ├─ a.rg-button.rg-button--ghost          «Togli tutti»
   ├─ label.rg-filter-bar__setting          «Raggruppa per» + select.rg-select   (un comando solo)
   └─ .rg-filter-bar__settings              (1.56.0, piu comandi) al posto del __setting singolo
      ├─ .rg-segmented[role=group][aria-label]  la Vista, a link (a.rg-segmented__item[aria-current])
      └─ .rg-filter-bar__setting            «Cartelle per» + .rg-segmented a link, oppure «Raggruppa per» + select
```

### La barra

Le icone stanno sotto `/ds/icons/` come nel resto della piattaforma ([icons](icons.md)).

```html
<form class="rg-filter-bar" method="get" action="/products" role="search" aria-label="Filtri dell'elenco prodotti">
  <div class="rg-filter-bar__row">
    <div class="rg-filter-bar__search">
      <label class="rg-u-visually-hidden" for="f-q">Cerca nei prodotti</label>
      <input class="rg-search" type="search" id="f-q" name="q" value="" placeholder="Codice RG, nome, articolo">
    </div>

    <details class="rg-filter-bar__toggle">
      <summary class="rg-button rg-button--outline">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-filtro"></use></svg>
        Filtri<span class="rg-filter__count"><span class="rg-u-visually-hidden">, scelti </span>3</span>
      </summary>
    </details>

    <div class="rg-filter-bar__panel">
      <!-- un rg-filter per ogni filtro fisso: Cliente, Categoria, Collezione + Anno, Divisione -->
      <details class="rg-filter" name="filtri-prodotti">…</details>

      <details class="rg-filter-bar__more">
        <summary class="rg-button rg-button--ghost">
          <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>
          Aggiungi filtro
        </summary>
      </details>
      <div class="rg-filter-bar__extra">
        <!-- i filtri rari SENZA valori scelti: Gamma -->
        <details class="rg-filter" name="filtri-prodotti">…</details>
      </div>

      <button class="rg-button rg-button--secondary rg-filter-bar__apply" type="submit">Applica</button>
    </div>
  </div>

  <div class="rg-filter-bar__active">
    <p class="rg-filter-bar__result"><strong>37</strong> prodotti su 412</p>
    <ul class="rg-filter-bar__tags" aria-label="Filtri scelti">
      <li><a class="rg-chip rg-chip--remove" href="/products?cliente=FENDI&amp;categoria=BORSE"><span class="rg-u-visually-hidden">Togli </span><span class="rg-chip__key">Cliente</span> DIOR<svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg></a></li>
      <li><a class="rg-chip rg-chip--remove" href="/products?cliente=DIOR&amp;categoria=BORSE"><span class="rg-u-visually-hidden">Togli </span><span class="rg-chip__key">Cliente</span> FENDI<svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg></a></li>
      <li><a class="rg-chip rg-chip--remove" href="/products?cliente=DIOR&amp;cliente=FENDI"><span class="rg-u-visually-hidden">Togli </span><span class="rg-chip__key">Categoria</span> BORSE<svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg></a></li>
    </ul>
    <a class="rg-button rg-button--ghost" href="/products">Togli tutti</a>
    <label class="rg-filter-bar__setting">Raggruppa per
      <select class="rg-select" name="raggruppa">
        <option value="">Nessuno</option>
        <option value="cliente" selected>Cliente</option>
        <option value="collezione">Collezione + Anno</option>
        <option value="anno">Anno</option>
        <option value="categoria">Categoria</option>
      </select>
    </label>
  </div>
</form>
```

### Un filtro attivo, con la ricerca dentro la lista

```html
<details class="rg-filter" name="filtri-prodotti">
  <summary class="rg-button rg-button--outline rg-filter__trigger">Cliente<span class="rg-filter__count"><span class="rg-u-visually-hidden">, scelti </span>2</span></summary>
  <div class="rg-filter__panel">
    <input class="rg-search rg-filter__find" type="search" aria-label="Cerca fra i clienti" placeholder="Cerca fra i clienti" autocomplete="off" hidden>
    <fieldset class="rg-filter__set">
      <legend class="rg-u-visually-hidden">Cliente</legend>
      <ul class="rg-filter__options">
        <li><label class="rg-filter__option"><input type="checkbox" name="cliente" value="DIOR" checked><span class="rg-filter__value">DIOR</span><span class="rg-filter__n">172<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
        <li><label class="rg-filter__option"><input type="checkbox" name="cliente" value="FENDI" checked><span class="rg-filter__value">FENDI</span><span class="rg-filter__n">64<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
        <li><label class="rg-filter__option"><input type="checkbox" name="cliente" value="BOTTEGA VENETA"><span class="rg-filter__value">BOTTEGA VENETA</span><span class="rg-filter__n">41<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
      </ul>
    </fieldset>
    <p class="rg-filter__empty" hidden>Nessun cliente con questo testo.</p>
    <div class="rg-filter__foot">
      <a class="rg-button rg-button--ghost" href="/products?categoria=BORSE">Togli</a>
      <button class="rg-button rg-button--secondary" type="submit">Applica</button>
    </div>
  </div>
</details>
```

### Un filtro con due insiemi (Collezione e Anno), non attivo

```html
<details class="rg-filter" name="filtri-prodotti">
  <summary class="rg-button rg-button--outline rg-filter__trigger">Collezione</summary>
  <div class="rg-filter__panel">
    <fieldset class="rg-filter__set">
      <legend class="rg-filter__legend">Collezione</legend>
      <ul class="rg-filter__options">
        <li><label class="rg-filter__option"><input type="checkbox" name="collezione" value="SS"><span class="rg-filter__value">SS</span><span class="rg-filter__n">21<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
        <li><label class="rg-filter__option"><input type="checkbox" name="collezione" value="FW"><span class="rg-filter__value">FW</span><span class="rg-filter__n">14<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
      </ul>
    </fieldset>
    <fieldset class="rg-filter__set">
      <legend class="rg-filter__legend">Anno</legend>
      <ul class="rg-filter__options">
        <li><label class="rg-filter__option"><input type="checkbox" name="anno" value="2026"><span class="rg-filter__value">2026</span><span class="rg-filter__n">31<span class="rg-u-visually-hidden"> prodotti</span></span></label></li>
      </ul>
    </fieldset>
    <div class="rg-filter__foot">
      <button class="rg-button rg-button--secondary" type="submit">Applica</button>
    </div>
  </div>
</details>
```

Se Collezione e Anno sono invece **un valore solo** («SS 2026»), è un insieme solo con un parametro
solo: il DS non cambia.

### Il controller di riferimento

Identico a quello di [examples/rg-filter-bar.html](../examples/rg-filter-bar.html), tolta la prima
riga del corpo (`?senzajs`), che serve solo alle tavole.

```js
(function () {
  var STRETTO = window.matchMedia('(max-width: 680px)');
  function caselle(f) { return Array.prototype.slice.call(f.querySelectorAll('.rg-filter__option input')); }
  function stato(f) { return caselle(f).map(function (c) { return c.checked; }); }
  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
  function invia(form) { if (form.requestSubmit) form.requestSubmit(); else form.submit(); }
  function conta(f) {
    var n = caselle(f).filter(function (c) { return c.checked; }).length;
    var bottone = f.querySelector('.rg-filter__trigger');
    var cnt = bottone.querySelector('.rg-filter__count');
    if (!n) { if (cnt) cnt.remove(); return; }
    if (!cnt) {
      cnt = document.createElement('span'); cnt.className = 'rg-filter__count';
      cnt.innerHTML = '<span class="rg-u-visually-hidden">, scelti </span>';
      cnt.appendChild(document.createTextNode('')); bottone.appendChild(cnt);
    }
    cnt.lastChild.nodeValue = String(n);
  }

  document.querySelectorAll('.rg-filter-bar').forEach(function (bar) {
    bar.classList.add('rg-filter-bar--live');
    bar.querySelectorAll('.rg-filter__find[hidden]').forEach(function (c) { c.hidden = false; });
    bar.querySelectorAll('.rg-filter').forEach(function (f) { f._prima = stato(f); });
  });

  // toggle non risale: si ascolta in cattura.
  document.addEventListener('toggle', function (e) {
    var f = e.target;
    if (!f.classList || !f.classList.contains('rg-filter')) return;
    var bar = f.closest('.rg-filter-bar');
    if (f.open) {
      bar.querySelectorAll('.rg-filter[open]').forEach(function (o) { if (o !== f) o.open = false; });
      f.classList.remove('rg-filter--end');
      if (STRETTO.matches) return;
      var p = f.querySelector('.rg-filter__panel');
      if (p && p.getBoundingClientRect().right > document.documentElement.clientWidth - 16) f.classList.add('rg-filter--end');
      var cerca = f.querySelector('.rg-filter__find:not([hidden])');
      if (cerca) cerca.focus();
    } else if (!STRETTO.matches && stato(f).join() !== f._prima.join()) {
      invia(bar);
    }
  }, true);

  document.addEventListener('input', function (e) {
    var campo = e.target.closest && e.target.closest('.rg-filter__find');
    if (!campo) return;
    var f = campo.closest('.rg-filter'), q = norm(campo.value), trovati = 0;
    f.querySelectorAll('.rg-filter__options > li').forEach(function (li) {
      var c = li.querySelector('input');
      var trovato = !q || norm(li.querySelector('.rg-filter__value').textContent).indexOf(q) !== -1;
      li.hidden = !(trovato || c.checked); // i valori scelti restano sempre in vista
      if (trovato && !c.checked) trovati++;
    });
    var vuoto = f.querySelector('.rg-filter__empty');
    if (vuoto) vuoto.hidden = !q || trovati > 0;
  });

  document.addEventListener('change', function (e) {
    var c = e.target.closest && e.target.closest('.rg-filter__option input');
    if (c) { conta(c.closest('.rg-filter')); return; }
    var s = e.target.closest && e.target.closest('.rg-filter-bar__setting select');
    if (s) invia(s.form);
  });

  document.addEventListener('keydown', function (e) {
    // Invio nella ricerca della lista non manda il form: restringe e basta.
    if (e.key === 'Enter' && e.target.closest && e.target.closest('.rg-filter__find')) { e.preventDefault(); return; }
    if (e.key !== 'Escape') return;
    var f = e.target.closest && e.target.closest('.rg-filter[open]');
    if (!f) return;
    caselle(f).forEach(function (c, i) { c.checked = f._prima[i]; });
    conta(f);
    f.open = false;
    f.querySelector('summary').focus();
  });

  document.addEventListener('click', function (e) {
    if (STRETTO.matches) return;
    document.querySelectorAll('.rg-filter-bar .rg-filter[open]').forEach(function (f) { if (!f.contains(e.target)) f.open = false; });
  });
})();
```

### Verifiche fatte (Chrome, `examples/rg-filter-bar.html`)

- 1280, 1100, 900 e 700 px: ogni pannello sta nella finestra (a 1100 Gamma e a 900 Divisione si
  girano a sinistra), `scrollWidth` = `clientWidth`. A 375 px nessuno scorrimento di lato.
- Bottone del filtro 40 px, voce della lista 40, etichetta 32 con bersaglio 40.
- Nome del bottone letto: «Cliente, scelti 2».
- Ricerca «bottéga» → DIOR, FENDI (scelti) e BOTTEGA VENETA; «zzz» → solo gli scelti e il messaggio.
- Spunta → il bottone dice 3; Esc → caselle com'erano, bottone 2, fuoco sul bottone, niente invio.
- Aprire Categoria chiude Cliente. Chiudere senza cambi non invia; chiudere con un cambio invia
  `?q=&cliente=DIOR&cliente=FENDI&categoria=BORSE&categoria=SCARPE&raggruppa=cliente`. A 375 px
  chiudere non invia. «Raggruppa per» invia anche a 375.
- Con `?senzajs`: ricerca nella lista nascosta, «Applica» in vista.
