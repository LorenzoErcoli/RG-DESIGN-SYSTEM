# Proposal (proposta di modifica)

## Scopo

La **proposta di cambiare un valore** di una fase di lavorazione, e la sua decisione. Il campionario apre col
telefono, dal QR del fascicolo, la scheda di una fase; vede che un valore non va (l'altezza del piedino di uno
stop, la velocità di tutta la fase, un filo, la temperatura della pressa) e **propone** il valore giusto con una
nota «perché». L'ufficio, da PC o iPad, apre il prodotto, entra nella fase e **accetta** o **rifiuta**.

Due oggetti:

- **`rg-proposal`**: la card di **una** proposta. Si legge a colpo d'occhio: *dove* (stop 9), *cosa* (altezza
  piedino), *il cambio* (1,5 mm → **2,0 mm**), *perché*, *chi e quando*, *lo stato*, e per chi decide *le azioni*.
- **`rg-proposal-list`**: l'elenco, a **gruppi** (uno per stop, uno per «Tutta la fase»).

L'avviso nella pagina del prodotto è [`rg-proposal-notice`](proposal-notice.md). Il segnalino «N proposte»
accanto a una parte o a una fase è `rg-badge rg-badge--review rg-badge--count` ([badges](badges.md)).

Nasce con la 1.30.0, **mobile-first**: una colonna sul telefono, due o più su iPad e PC, bottoni da 48 px, niente
che dipenda dall'hover. Prima era fatto con `rg-alert` e `rg-list-row` con un badge: pezzi generici che non
dicevano il cambio.

## Varianti

| Classe | Stato | Filetto sinistro | Badge |
| --- | --- | --- | --- |
| `rg-proposal--pending` | **da decidere** | info | `rg-badge--review` «Da decidere» |
| `rg-proposal--accepted` | **accettata** | success | `rg-badge--validated` «Accettata» |
| `rg-proposal--rejected` | **rifiutata** | grigio | `rg-badge--archived` «Rifiutata» |

Lo stato **non è mai il solo colore**: il filetto ha il colore dello stato, il badge dice la parola, e la
rifiutata **inverte il cambio** (l'attuale resta in nero, il proposto si barra).

| Elemento | Cosa porta |
| --- | --- |
| `rg-proposal__head` | Contesto a sinistra, badge di stato a destra. |
| `rg-proposal__context` | **Dove vale**: «Stop 9», «Tutta la fase». Micro-label maiuscola. |
| `rg-proposal__field` | **Il campo**: «Altezza piedino». Titolo della card (`<h3>`). |
| `rg-proposal__change` | **Il cambio**: `__from` → `__to`, mono, sulla stessa riga (va a capo se lungo). |
| `rg-proposal__from` | Il valore **attuale**: piccolo, grigio, in `<del>` (barrato). Se manca: «—», senza `<del>`. |
| `rg-proposal__arrow` | La freccia, generata e muta. |
| `rg-proposal__to` | Il valore **proposto**: 28 px, nero, in `<ins>` (non sottolineato). |
| `rg-proposal__why` | Il «perché» di chi propone, con `__label` «Perché». Facoltativo. |
| `rg-proposal__meta` | Chi e quando: «Campionario · M. Rossi · 18/09/2026 10:42». |
| `rg-proposal__outcome` | L'**esito** di una proposta decisa: chi, quando, «prima era X», o il motivo del rifiuto. |
| `rg-proposal__flag` | **«Da riportare a mano»**: accettata, ma il valore non si applica da solo. Filetto nero spesso e icona. |
| `rg-proposal__label` | Etichetta piccola dentro un paragrafo: «Perché», «Motivo». |
| `rg-proposal__actions` | La barra delle azioni per chi decide: Accetta \| Rifiuta, a tutta cella. |
| `rg-proposal__reject` | Il `<details>` del rifiuto: il `<summary>` è il bottone «Rifiuta…». |
| `rg-proposal__reason` | Il `<form>` del rifiuto: motivo facoltativo e «Conferma il rifiuto». |
| `rg-proposal-list` | L'elenco. |
| `rg-proposal-list__group` | Un gruppo (`<section>`): uno stop, «Tutta la fase», «Decise». |
| `rg-proposal-list__title` | Il titolo del gruppo, con il conteggio (`rg-badge--review rg-badge--count` «2 da decidere»). |
| `rg-proposal-list__items` | Le card del gruppo (`<ul>`): una colonna fino a ~660 px, poi colonne da 320. |

## Uso e limiti

**Il cambio è il contenuto.** Chi decide deve leggere *da cosa a cosa* senza leggere il resto: il proposto è il
testo più grande della card (28 px), l'attuale è barrato e grigio accanto. Sono **valori**: mono, con l'unità.
«Attuale:» e «Proposto:» ci sono per chi usa un lettore di schermo (`rg-u-visually-hidden`): il barrato non si
sente.

**Il valore attuale può mancare** (un filo mai impostato): si scrive «—» senza `<del>` e, nascosto, «Attuale:
nessun valore».

**Rifiutata: il cambio si inverte.** L'attuale resta valido e si scrive in testo semplice, in nero; il proposto
va in `<del>`, piccolo e grigio. L'esito porta il motivo, se c'è.

**Accettata: l'esito dice «prima era X»**, perché dopo l'accettazione il valore attuale è cambiato e la card deve
ancora raccontare da dove veniva.

**«Da riportare a mano»** (`__flag`) quando il sistema non può applicare da solo il valore accettato (va rifatto
sulla macchina o nel programma di ricamo). È un compito aperto: filetto nero spesso e icona `rg-icon-avviso`, si
vede anche in B/N. L'app lo toglie quando il compito è fatto.

**Le azioni.** Solo per chi può decidere, solo sulle proposte da decidere.

- **Accetta** è la primaria (`rg-button--primary rg-button--large`), un `<form>` suo.
- **Rifiuta** è in due tempi e **senza JavaScript**: il `<summary>` «Rifiuta…» apre il motivo facoltativo
  e «Conferma il rifiuto». Aperto, la barra passa a una colonna.
- I bottoni sono a tutta cella e alti 48 px: si toccano col pollice. La barra ha 16 px di margine dal bordo
  della card (regole §5, barra).
- Accetta e Rifiuta non sono distruttivi: sono una decisione, e Rifiuta non cancella la proposta (resta, rifiutata).

**L'elenco.** Un gruppo per stop («Stop 9») e uno per «Tutta la fase»; il titolo porta il conteggio delle proposte
da decidere. **L'ordine lo decide l'app**: prima i gruppi con proposte da decidere, dentro ogni gruppo prima le
da decidere; le decise in un gruppo «Decise» in fondo, eventualmente chiuso in un [`rg-disclosure`](disclosure.md).
Il DS non riordina con CSS: l'ordine visivo resta quello di tabulazione.

**Su telefono** la card è a una colonna e larga quanto lo schermo; **su iPad** l'elenco va su due colonne. I campi
del rifiuto sono a 16 px sui dispositivi touch: toccarli **non ingrandisce la pagina** su iOS (1.30.0,
[forms](forms.md#touch-campi-a-16-px-e-bersagli-da-44-130)).

**Non è un modulo di modifica.** La proposta *si propone* altrove (nella scheda della fase, con `rg-field`): qui
si legge e si decide.

## Struttura

Da decidere:

```html
<article class="rg-proposal rg-proposal--pending" aria-labelledby="pr-12-campo">
  <header class="rg-proposal__head">
    <p class="rg-proposal__context">Stop 9</p>
    <span class="rg-badge rg-badge--review">Da decidere</span>
  </header>
  <h3 class="rg-proposal__field" id="pr-12-campo">Altezza piedino</h3>
  <p class="rg-proposal__change">
    <span class="rg-proposal__from"><span class="rg-u-visually-hidden">Attuale: </span><del>1,5 mm</del></span>
    <span class="rg-proposal__arrow"></span>
    <span class="rg-proposal__to"><span class="rg-u-visually-hidden">Proposto: </span><ins>2,0 mm</ins></span>
  </p>
  <p class="rg-proposal__why"><span class="rg-proposal__label">Perché</span>Sulla curva il piedino schiaccia il bordo e il filo si spezza.</p>
  <p class="rg-proposal__meta">Campionario · M. Rossi · 18/09/2026 10:42</p>
  <div class="rg-proposal__actions">
    <form method="post" action="/proposte/12/accetta">
      <button class="rg-button rg-button--primary rg-button--large" type="submit">Accetta</button>
    </form>
    <details class="rg-proposal__reject">
      <summary class="rg-button rg-button--secondary rg-button--large">Rifiuta…</summary>
      <form class="rg-proposal__reason" method="post" action="/proposte/12/rifiuta">
        <label class="rg-field">
          <span class="rg-field__label">Motivo (facoltativo)</span>
          <textarea class="rg-textarea" name="motivo" rows="2"></textarea>
        </label>
        <button class="rg-button rg-button--secondary rg-button--large" type="submit">Conferma il rifiuto</button>
      </form>
    </details>
  </div>
</article>
```

Senza valore attuale:

```html
<article class="rg-proposal rg-proposal--pending" aria-labelledby="pr-13-campo">
  <header class="rg-proposal__head">
    <p class="rg-proposal__context">Stop 9</p>
    <span class="rg-badge rg-badge--review">Da decidere</span>
  </header>
  <h3 class="rg-proposal__field" id="pr-13-campo">Filo sotto</h3>
  <p class="rg-proposal__change">
    <span class="rg-proposal__from"><span class="rg-u-visually-hidden">Attuale: nessun valore</span><span aria-hidden="true">—</span></span>
    <span class="rg-proposal__arrow"></span>
    <span class="rg-proposal__to"><span class="rg-u-visually-hidden">Proposto: </span><ins>BOB-120</ins></span>
  </p>
  <p class="rg-proposal__meta">Campionario · M. Rossi · 18/09/2026 10:44</p>
  …
</article>
```

Accettata, da riportare a mano:

```html
<article class="rg-proposal rg-proposal--accepted" aria-labelledby="pr-9-campo">
  <header class="rg-proposal__head">
    <p class="rg-proposal__context">Tutta la fase</p>
    <span class="rg-badge rg-badge--validated">Accettata</span>
  </header>
  <h3 class="rg-proposal__field" id="pr-9-campo">Velocità</h3>
  <p class="rg-proposal__change">
    <span class="rg-proposal__from"><span class="rg-u-visually-hidden">Attuale: </span><del>650 punti/min</del></span>
    <span class="rg-proposal__arrow"></span>
    <span class="rg-proposal__to"><span class="rg-u-visually-hidden">Proposto: </span><ins>550 punti/min</ins></span>
  </p>
  <p class="rg-proposal__meta">Campionario · M. Rossi · 17/09/2026 16:05</p>
  <p class="rg-proposal__outcome">Accettata da L. Ercoli il 18/09/2026 · prima era 650 punti/min</p>
  <p class="rg-proposal__flag"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="../icons/rg-icons.svg#rg-icon-avviso"></use></svg>Da riportare a mano nel programma della macchina: non si applica da solo.</p>
</article>
```

Rifiutata, con motivo:

```html
<article class="rg-proposal rg-proposal--rejected" aria-labelledby="pr-8-campo">
  <header class="rg-proposal__head">
    <p class="rg-proposal__context">Stop 4</p>
    <span class="rg-badge rg-badge--archived">Rifiutata</span>
  </header>
  <h3 class="rg-proposal__field" id="pr-8-campo">Tensione filo sopra</h3>
  <p class="rg-proposal__change">
    <span class="rg-proposal__from"><span class="rg-u-visually-hidden">Attuale, resta: </span>120 cN</span>
    <span class="rg-proposal__arrow"></span>
    <span class="rg-proposal__to"><span class="rg-u-visually-hidden">Proposto, rifiutato: </span><del>90 cN</del></span>
  </p>
  <p class="rg-proposal__meta">Campionario · M. Rossi · 17/09/2026 15:40</p>
  <p class="rg-proposal__outcome"><span class="rg-proposal__label">Motivo</span>Con 90 cN il punto pieno si allenta: si prova prima col piedino.</p>
</article>
```

Elenco a gruppi:

```html
<div class="rg-proposal-list">
  <section class="rg-proposal-list__group" aria-labelledby="gr-stop-9">
    <h3 class="rg-proposal-list__title" id="gr-stop-9">Stop 9 <span class="rg-badge rg-badge--review rg-badge--count">2 da decidere</span></h3>
    <ul class="rg-proposal-list__items">
      <li><article class="rg-proposal rg-proposal--pending">…</article></li>
      <li><article class="rg-proposal rg-proposal--pending">…</article></li>
    </ul>
  </section>
  <section class="rg-proposal-list__group" aria-labelledby="gr-decise">
    <h3 class="rg-proposal-list__title" id="gr-decise">Decise</h3>
    <ul class="rg-proposal-list__items">
      <li><article class="rg-proposal rg-proposal--accepted">…</article></li>
    </ul>
  </section>
</div>
```
