# Selettore di fase del gruppo (`rg-phase-switch` / `rg-phase-head`)

## Scopo

La pagina della **fase principale** di un gruppo di fasi collegate. Nella stessa pagina si compila la
principale e ognuna delle sue collegate («Pressatura iniziale», «Forno finale», «Sabbiatura e
soffiatura finale»). Quindi la pagina ha **due livelli**, e questo componente è il primo:

1. **Quale fase** del gruppo sto compilando: `rg-phase-switch`, una striscia con le fasi del gruppo
   nell'ordine della sequenza. La testa del pannello scelto, `rg-phase-head`, lo dice in chiaro.
2. **Quale sezione** di quella fase: le `rg-tabs` di sempre («Informazioni generali», «Parametri
   tecnici», «Macchina e tempi»), **dentro** il pannello della fase.

Aggiunto in v1.16.0. Nasce da un caso reale in `rg-product-platform`: le collegate erano tab nella
stessa barra `rg-tabs` delle sezioni, con lo stesso stile. Chi apriva una collegata dall'elenco
arrivava su una pagina intitolata «pressatura», con una tab accesa uguale alle altre, e non capiva
di essere dentro un'altra fase. Il giudizio del responsabile: *«tutto sembra una fase, poi entri e
sei in un'altra fase. Le tab interne sono tutte uguali»*.

### Perché due controlli e non una barra sola

Una sezione e una fase collegata **non sono sorelle**. La sezione è una parte della fase che si sta
compilando. La collegata è un'altra fase, con il suo numero, il suo reparto e il suo foglio stampato.
NN/g (*Tabs, Used Right*): le tab di un controllo devono avere lo stesso tipo di contenuto, e
«mescolare tab di contenuto e tab di navigazione nello stesso controllo disorienta». Da qui tre
conseguenze:

- **Due controlli**: uno sceglie la fase, uno sceglie la sezione.
- **Due forme diverse**: la fase è un segmento con numero in casella, ruolo, titolo e reparto; la
  sezione resta un testo sottolineato. Se avessero lo stesso aspetto, i controlli sarebbero due solo
  nel codice.
- **Stesso numero dell'elenco**: la casella di `rg-phase-switch__num` è quella di `rg-step__num`.
  «3» nell'elenco, «3» in pagina e «03» sul foglio sono lo stesso dato.

### Perché non `rg-segmented`, non `rg-tabs`, non `rg-folder`

- `rg-segmented` sceglie fra poche opzioni brevi (unità, modalità di vista): una riga di testo,
  target compatto da 34 px, `aria-pressed`. Una fase ha bisogno di numero, ruolo, titolo e reparto,
  e pilota un pannello: è un tablist, non un interruttore.
- `rg-tabs` è il secondo livello. Usarla anche per il primo è il difetto da correggere.
- `rg-folder` è una tessera di dashboard che porta a una destinazione, non un selettore dentro un
  form.

## Varianti

| Classe | Ruolo |
| --- | --- |
| `rg-phase-switch` | Striscia rigata delle fasi del gruppo (tablist). 2–4 segmenti, in ordine di sequenza. |
| `rg-phase-switch__item` | Segmento-fase: `<button role="tab">`. Attivo con `aria-selected="true"` (o `is-active`). |
| `rg-phase-switch__num` | Numero di posizione della fase nella sequenza della parte. |
| `rg-phase-switch__text` | Colonna testo del segmento. |
| `rg-phase-switch__role` | Ruolo nel gruppo: «Principale», «Collegata · prima della 2», «Collegata · dopo la 2». |
| `rg-phase-switch__title` | Titolo della fase. |
| `rg-phase-switch__meta` | Reparto e conteggi (`rg-badge--count` «7 da compilare», `rg-badge--unresolved` «1 errore»). |
| `rg-phase-head` | Testa del pannello di fase: «stai compilando questa fase». |
| `rg-phase-head__num` | Numero di posizione, sempre invertito: è la fase corrente. |
| `rg-phase-head__text` | Colonna testo. |
| `rg-phase-head__role` | «Stai compilando · principale» / «Stai compilando · collegata · dopo la 2». |
| `rg-phase-head__title` | Titolo della fase (`<h2>`, livello sezione: peso heading). |
| `rg-phase-head__meta` | Posizione e reparto in chiaro: `fase 3 di 4` · `reparto Pressatura e soffiatura` · `si lavora dopo la 2, Pressatura`. |

Stati del segmento: default, `:hover` (fondo rientrante e titolo sottolineato), `:focus-visible`
(contorno nero interno da 2 px), **attivo**. L'attivo ha tre segnali e nessuno è di colore: numero
invertito, barra nera spessa sul fondo del segmento, `aria-selected="true"`. Sotto i 680 px i segmenti
si impilano.

Stato **errore** in una fase non visibile: il form è unico, quindi un salvataggio può fallire su
una fase che non si sta guardando. Nel `__meta` del suo segmento va un `rg-badge--unresolved` con il
testo («1 errore»). Dopo il salvataggio il server riapre la prima fase e la prima sezione con
errori.

Stato **vuoto**: una collegata senza sezioni mostra `rg-empty` sotto la sua `rg-phase-head`. Non va
tolta dalla striscia: la fase esiste nella sequenza.

## Uso e limiti

- **Solo nella pagina di una fase principale con almeno una collegata.** Una fase senza collegate
  non ha la striscia: la pagina resta quella di sempre. La presenza della striscia è il segnale
  che il gruppo esiste.
- **Tutte le fasi del gruppo, compresa la principale**, nell'ordine della sequenza. La principale
  non è una fase «di default» fuori dalla striscia: se mancasse, la collegata sembrerebbe una
  sezione di qualcos'altro. Le collegate prima della principale stanno a sinistra, quelle dopo a
  destra: l'ordine della striscia è l'ordine del lavoro.
- **Un solo livello di gruppo.** Il modello non ammette gruppi nel gruppo, e la striscia non ha una
  forma per rappresentarli.
- **Non è una navigazione fra fasi della parte.** Per andare a un'altra fase non collegata si torna
  all'elenco (`rg-steps`) o si usa il breadcrumb. Nella striscia ci sono solo le fasi che si
  compilano da questa pagina.
- **Le sezioni stanno dentro il pannello della fase**, dopo la sua `rg-phase-head`. Ogni fase ha le
  sue `rg-tabs`, se ha più di una sezione, anche quando è una collegata: stessa forma, stesso
  posto. Con una sezione sola la tab è superflua: la section card sta direttamente sotto la testa.
- **Livelli di titolo**: H1 della pagina (la principale) → `rg-phase-head__title` in `<h2>` →
  `rg-section-card__title` delle sezioni in `<h3>`.
- **Il titolo di pagina resta quello della principale**: la pagina e l'URL sono i suoi. «Dove sono»
  lo dice la `rg-phase-head`, che cambia a ogni fase. Per questo `rg-phase-head` non è facoltativa.
- **Il reparto si scrive per esteso.** Il colore del reparto (`rg-dept-band`) non va nella striscia:
  a schermo la palette categoriale convive con i colori di stato dei badge, e `category-3` è
  `danger`. Se si vuole il segno di reparto in pagina, una `rg-dept-band` sotto la
  `rg-phase-head` è ammessa, con quella avvertenza.

## Struttura

```html
<form method="post" action="…">
  <div class="rg-phase-switch" role="tablist" aria-label="Fasi del gruppo: Pressatura con Sabbiatura e soffiatura finale">
    <button class="rg-phase-switch__item" type="button" role="tab" id="tab-fase-2"
            aria-controls="fase-2" aria-selected="false" tabindex="-1">
      <span class="rg-phase-switch__num">2</span>
      <span class="rg-phase-switch__text">
        <span class="rg-phase-switch__role">Principale</span>
        <span class="rg-phase-switch__title">Pressatura</span>
        <span class="rg-phase-switch__meta"><span>Pressatura e soffiatura</span><span class="rg-badge rg-badge--count">6 da compilare</span></span>
      </span>
    </button>
    <button class="rg-phase-switch__item" type="button" role="tab" id="tab-fase-3"
            aria-controls="fase-3" aria-selected="true" tabindex="0">
      <span class="rg-phase-switch__num">3</span>
      <span class="rg-phase-switch__text">
        <span class="rg-phase-switch__role">Collegata · dopo la 2</span>
        <span class="rg-phase-switch__title">Sabbiatura e soffiatura finale</span>
        <span class="rg-phase-switch__meta"><span>Pressatura e soffiatura</span><span class="rg-badge rg-badge--count">7 da compilare</span></span>
      </span>
    </button>
  </div>

  <!-- Pannello della principale -->
  <div class="rg-tabpanel" role="tabpanel" id="fase-2" aria-labelledby="tab-fase-2">
    <header class="rg-phase-head">
      <span class="rg-phase-head__num">2</span>
      <div class="rg-phase-head__text">
        <span class="rg-phase-head__role">Stai compilando · principale</span>
        <h2 class="rg-phase-head__title">Pressatura</h2>
        <p class="rg-phase-head__meta"><span>fase 2 di 4</span><span>reparto Pressatura e soffiatura</span><span>con la 3, Sabbiatura e soffiatura finale</span></p>
      </div>
    </header>
    <div class="rg-tabs rg-u-mb-6" role="tablist" aria-label="Sezioni della fase 2: Pressatura">
      <button class="rg-tab is-active" type="button" role="tab" id="tab-2-base" aria-controls="sez-2-base" aria-selected="true">Informazioni generali <span class="rg-badge rg-badge--count">2</span></button>
      <button class="rg-tab" type="button" role="tab" id="tab-2-tecnica" aria-controls="sez-2-tecnica" aria-selected="false" tabindex="-1">Parametri tecnici <span class="rg-badge rg-badge--count">4</span></button>
    </div>
    <div class="rg-tabpanel is-active" role="tabpanel" id="sez-2-base" aria-labelledby="tab-2-base"><!-- rg-section-card con <h3> --></div>
    <div class="rg-tabpanel" role="tabpanel" id="sez-2-tecnica" aria-labelledby="tab-2-tecnica"><!-- … --></div>
  </div>

  <!-- Pannello della collegata: attivo, perché ci si è arrivati da «Apri» sulla fase 3 -->
  <div class="rg-tabpanel is-active" role="tabpanel" id="fase-3" aria-labelledby="tab-fase-3">
    <header class="rg-phase-head">
      <span class="rg-phase-head__num">3</span>
      <div class="rg-phase-head__text">
        <span class="rg-phase-head__role">Stai compilando · collegata · dopo la 2</span>
        <h2 class="rg-phase-head__title">Sabbiatura e soffiatura finale</h2>
        <p class="rg-phase-head__meta"><span>fase 3 di 4</span><span>reparto Pressatura e soffiatura</span><span>si lavora dopo la 2, Pressatura</span></p>
      </div>
    </header>
    <!-- sue rg-tabs + rg-tabpanel di sezione, come sopra -->
  </div>

  <div class="rg-cluster rg-u-mt-6">
    <button class="rg-button rg-button--primary" type="submit">Salva</button>
  </div>
</form>
```

## Tastiera e accessibilità

Due tablist ARIA, uno dentro l'altro: quello delle sezioni sta nel `tabpanel` della fase. Il
pattern è ammesso dall'ARIA APG e ogni livello si usa come un tablist qualunque.

- **Tab** entra nella striscia sul segmento attivo (roving tabindex: `tabindex="0"` sull'attivo,
  `-1` sugli altri). **Tab** di nuovo porta dentro il pannello della fase: prima le tab di sezione
  (sull'attiva), poi i campi della sezione attiva.
- **Freccia destra / sinistra** (anche **giù / su**, perché su mobile la striscia è verticale)
  passano al segmento successivo o precedente e lo attivano; **Home / Fine** vanno al primo e
  all'ultimo. Attivazione automatica: i pannelli sono già nel DOM e la commutazione non costa nulla.
- **Il nome accessibile del segmento è il suo contenuto visibile**: «3 Collegata · dopo la 2
  Sabbiatura e soffiatura finale Pressatura e soffiatura 7 da compilare». Non accorciarlo con un
  `aria-label`, altrimenti chi non vede la striscia perde ruolo e reparto.
- Il `tablist` ha un `aria-label` che nomina il gruppo, e ogni tablist di sezione nomina la sua fase:
  due tablist anonimi nella stessa pagina non si distinguono.
- `aria-controls` → `id` del pannello; il pannello è `role="tabpanel"` con `aria-labelledby` al
  segmento.
- Target: segmento ≥ 40 px di altezza (in pratica 64 px, con ruolo, titolo e meta).

### Unico form, stato che sopravvive al salvataggio

Tutti i pannelli, delle fasi e delle sezioni, stanno nello **stesso `<form>`**: nascondere un pannello
non toglie i suoi campi dall'invio. Le regole dello stato:

- **Fonte di verità**: `aria-selected` sul segmento o sulla tab; il pannello lo segue con `is-active`.
  Niente classi locali.
- **Arrivo diretto su una collegata** (dall'elenco): lo stato lo rende il **server**. Segmento della
  collegata con `aria-selected="true"` e pannello con `is-active` già nell'HTML, non un click
  simulato in JavaScript dopo il caricamento, che mostrerebbe per un attimo la principale.
- **Dopo il salvataggio** si torna sul pannello attivo. Il controller scrive la coppia fase/sezione
  in un campo nascosto del form, il server la rilegge e rende lo stato. Il formato di quel campo
  lo decide l'app.

Controller di riferimento, valido per entrambi i livelli:

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

- Mettere fasi collegate e sezioni nella stessa `rg-tabs`: è il difetto da cui nasce il componente.
- Dare ai segmenti l'aspetto di `rg-tab`, o alle tab di sezione l'aspetto dei segmenti.
- Togliere `rg-phase-head` perché «la striscia dice già quale fase è attiva»: chi arriva
  direttamente su una collegata legge prima il titolo, e il titolo di pagina è quello della
  principale.
- Usare `<a href>` per i segmenti in una pagina a form unico: la navigazione perderebbe i valori
  non salvati. `<a>` con `aria-current="page"` solo se ogni fase ha davvero una pagina propria, e
  allora non serve questo componente.
- Mostrare il colore del reparto al posto del suo nome.
- Rinumerare le fasi nella striscia (1, 2 dentro il gruppo) o usare numeri secondari (2a, 2b): il
  numero è quello della sequenza della parte.

## Fonti

NN/g, *Tabs, Used Right* (tab sorelle dello stesso tipo, non mescolare contenuto e navigazione);
W3C ARIA APG, *Tabs Pattern* (roving tabindex, frecce, Home/Fine, attivazione automatica quando i
pannelli sono già presenti); GOV.UK Design System, *Complete multiple tasks* (compiti correlati
raccolti sotto un'intestazione di gruppo); Carbon, *Progress indicator* (la posizione nella sequenza
come dato visibile).
