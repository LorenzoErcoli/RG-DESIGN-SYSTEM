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
- **Un pannello, niente card dentro.** Le sezioni sono tab dentro il pannello e il loro contenuto
  sta direttamente sotto. Una `rg-section-card` per sezione sarebbe una superficie sollevata dentro
  un'altra, vietata dalle regole §6, e ripeterebbe come titolo l'etichetta della tab accesa.

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
| `rg-phase-panel__head` | Riga di testa: meta a sinistra, stato e reparto a destra. |
| `rg-phase-panel__meta` | Posizione e relazione: `fase 3 di 4` · `si lavora dopo la 2, Pressatura`. Il dato forte in `<strong>`. |
| `rg-phase-panel__status` | Stato del costo (`rg-badge`) e timbro di reparto. |
| `rg-phase-panel__dept` | Sulla `rg-dept-band`, insieme a `rg-dept-band--quiet`: il timbro del reparto, stessa figura del foglio, in grigio. |
| `rg-phase-panel__body` | Tab di sezione e contenuto. |
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
- **Il titolo della fase sta sulla linguetta e non si ripete nel pannello.** Per chi naviga per
  intestazioni, il pannello ha un titolo nascosto alla vista (`<h2 class="rg-u-visually-hidden">`).
- **Fase senza gruppo:** `rg-phase-panel` senza linguette. Il titolo è l'H1 della pagina, e il
  pannello non ha titolo nascosto.
- **Nel pannello nessuna card.** Il sottotitolo di una sezione è un `rg-small` sotto le tab. Il menu
  delle operazioni sta **dentro la sezione che contiene le operazioni**, in coda alle righe, come
  `rg-disclosure--boxed`.
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
      <h2 class="rg-u-visually-hidden">Fase 3: Sabbiatura e soffiatura finale</h2>
      <p class="rg-phase-panel__meta"><span>fase 3 di 4</span><span>si lavora <strong>dopo la 2, Pressatura</strong></span></p>
      <div class="rg-phase-panel__status">
        <span class="rg-badge rg-badge--pending">costo non calcolato</span>
        <p class="rg-dept-band rg-dept-band--pressatura rg-dept-band--quiet rg-phase-panel__dept">
          <span class="rg-dept-band__name">Pressatura e soffiatura</span>
        </p>
      </div>
    </header>

    <div class="rg-phase-panel__body">
      <div class="rg-tabs rg-u-mb-6" role="tablist" aria-label="Sezioni della fase 3: Sabbiatura e soffiatura finale">
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

Pagina di una fase senza gruppo: lo stesso pannello, senza linguette e senza titolo nascosto.

```html
<form method="post" action="…">
  <div class="rg-phase-panel">
    <header class="rg-phase-panel__head">
      <p class="rg-phase-panel__meta"><span>fase 4 di 4</span></p>
      <div class="rg-phase-panel__status">
        <span class="rg-badge rg-badge--pending">costo non calcolato</span>
        <p class="rg-dept-band rg-dept-band--stampa rg-dept-band--quiet rg-phase-panel__dept"><span class="rg-dept-band__name">Stampa, Laser e HF</span></p>
      </div>
    </header>
    <div class="rg-phase-panel__body"><!-- rg-tabs di sezione + rg-tabpanel --></div>
    <footer class="rg-phase-panel__foot">
      <p class="rg-phase-panel__scope">Azioni sulla fase 4</p>
      <button class="rg-button rg-button--ghost rg-button--danger" type="submit" formaction="…/delete">Elimina fase</button>
    </footer>
  </div>
  <div class="rg-cluster rg-u-mt-6"><button class="rg-button rg-button--primary" type="submit">Salva i valori</button></div>
</form>
```

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
- **Il pannello ha un `<h2>` nascosto alla vista**, così chi naviga per intestazioni trova la fase:
  il titolo visibile è sulla linguetta.
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
- **Il numero o il titolo della fase ripetuti in testa al pannello.**
- **«Elimina fase» in testa alla pagina** quando la pagina mostra più fasi.
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
