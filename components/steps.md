# Sequenza di fasi (`rg-steps` / `rg-step`)

## Scopo

Elenco **ordinato** di fasi di un processo — le fasi di una lavorazione, i passi di un percorso
macchina, gli stadi di una revisione — dove ogni fase è un **contenitore**: ha un numero di
posizione, un titolo forte, parametri tecnici, un contenuto che si apre **in loco** (le sue
operazioni) e azioni proprie sempre visibili.

Aggiunto in v1.3.0. Nasce da un caso reale: l'elenco delle fasi nella scheda parte di
`rg-product-platform` era stato costruito con `rg-list-row--link` e risultava indistinguibile
da una tabella di dati — l'ordine non si leggeva, il titolo pesava quanto un metadato e la riga
navigabile, per contratto, non può portare azioni.

**Quando NON serve.** Se le voci non hanno un ordine significativo, se non contengono altro e se
non hanno azioni proprie, resta una lista: `rg-list-row` (inerte, con azioni inline) o
`rg-list-row--link` (naviga al dettaglio). Per una sezione collassabile di pagina — anagrafica,
allegati — c'è `rg-disclosure--boxed`, che non è un record e non ha azioni.

## Varianti e stati

| Classe | Quando |
| --- | --- |
| `rg-step` | Fase della sequenza. |
| `rg-step--danger` | Fase in stato irrisolto o incompleto: numero in `danger` con bordo forte. Va **sempre** accompagnata da un badge o da un testo che dica il problema: il colore non basta. |
| `rg-steps--grouped` | Sulla `<ol>`: la sequenza contiene almeno un gruppo di fasi collegate. Riserva la colonna della graffa su **tutte** le righe (v1.16.0). |
| `rg-step--group` | Fase che appartiene a un gruppo: il DS disegna la graffa a sinistra del numero. |
| `rg-step--group-start` / `rg-step--group-end` | Prima e ultima fase del gruppo: chiudono i capi della graffa. Si mettono sempre, anche su gruppi di due. |
| `rg-step--principal` | La fase principale del gruppo: il DS disegna il dente dalla graffa al suo numero. |
| `rg-step__role` | Ruolo nel gruppo, in testo, sopra il titolo: «Principale», «Collegata · prima della 2», «Collegata · dopo la 2». |

Stati: `aria-expanded="false|true"` sul toggle (collassata/espansa, con segno `+`/`−` e numero
invertito), `:hover`, `:focus-visible` sul toggle e su ogni azione. La fase senza contenuto mostra
`rg-empty` nel corpo; il caricamento del contenuto usa `rg-loading` nel corpo, non uno stato del
toggle.

## Struttura

```html
<ol class="rg-steps">
  <li class="rg-step">
    <div class="rg-step__head">
      <button class="rg-step__toggle" type="button" aria-expanded="true" aria-controls="fase-1-corpo" id="fase-1-toggle">
        <span class="rg-step__num">1</span>
        <span class="rg-step__headline">
          <span class="rg-step__title">Ricamo piatto</span>
          <span class="rg-step__meta"><span>Ricamo</span><span>densità 4.2 pt/mm</span><span>altezza 2.0 mm</span></span>
        </span>
        <span class="rg-step__aside"><span class="rg-badge rg-badge--count">4 operazioni</span></span>
      </button>
      <div class="rg-step__actions">
        <button class="rg-button rg-button--ghost" type="button">Modifica</button>
        <button class="rg-button rg-button--ghost rg-button--danger" type="button">Elimina</button>
      </div>
    </div>
    <div class="rg-step__body" id="fase-1-corpo" role="region" aria-labelledby="fase-1-toggle">
      <!-- operazioni della fase: rg-table, rg-list, rg-key-value… -->
    </div>
  </li>
</ol>
```

- `<ol>` non è decorativo: è l'ordine della sequenza per chi legge con la tastiera o con uno
  screen reader. Il numero visibile in `rg-step__num` resta nel markup perché è **un dato**
  (il numero di fase dell'archivio), non un contatore di presentazione: se la fase 3 viene
  eliminata, il numero mostrato è quello che dice il dominio.
- **Il blocco è rigato, non è un pannello.** Il DS mette un filetto forte nero sopra e sotto
  l'intera sequenza — così ha un inizio e una fine dichiarati — e un filetto neutro fra una fase
  e l'altra, da bordo a bordo: lo stesso idioma di `rg-table` (filetto forte in testa, filetti
  fra le righe). Niente bordo perimetrale e niente sfondo: sarebbe una card, e una sequenza non
  è una card. Non aggiungere `<hr>` né classi locali di separazione.
- Il filetto di separazione sta **in testa alla fase seguente**, non in coda alla precedente:
  è la stessa linea che chiude il corpo di una fase aperta. Senza, il contenuto espanso sfuma
  nella fase successiva proprio dove la struttura serve di più.
- Il **filo verticale** che unisce i numeri è generato dal DS (`::before` di `rg-step`): non
  disegnare linee, frecce o connettori nel markup. Attraversa il filetto di separazione, perché
  la sequenza continua da una fase all'altra.
- Il segno `+`/`−` è generato dal DS e segue `aria-expanded`, come nella disclosure: **non**
  aggiungere un chevron. Numero e segno non sono due indicatori della stessa cosa — il numero
  dice *dove sei nella sequenza*, il segno dice *se la fase è aperta* — e stanno ai due capi
  opposti del toggle proprio per non leggersi come un unico blocco.
- `rg-step__aside` è opzionale: contiene badge di sola lettura (conteggio operazioni, stato del
  dato). Mai controlli.
- I parametri tecnici stanno in `rg-step__meta`, in mono, **con l'unità accanto al valore**
  (`densità 4.2 pt/mm`, non `4.2`). I separatori `·` li mette il CSS: nel markup solo `<span>`.
- Numero a 1–2 cifre: la casella è larga `--rg-space-8` e non cresce. Oltre le 99 fasi il
  problema non è il componente.

## Perché non `<details>` / `<summary>`

Le azioni della fase stanno sulla riga di intestazione e devono essere sempre raggiungibili.
Dentro un `<summary>` sarebbero **controlli annidati in un controllo**: markup invalido,
attivazione ambigua col mouse, tastiera rotta. Fuori dal `<summary>` sarebbero contenuto
rivelabile, quindi nascoste a fase chiusa — cioè il contrario del requisito.

La struttura corretta non usa `<details>`: il toggle è un `<button>` e le azioni sono suoi
**fratelli** dentro `rg-step__head`. Il compromesso, dichiarato: lo stato non è più nativo, serve
un controller (tre righe, sotto) o il rendering lato server dei due attributi.

```js
document.addEventListener('click', (e) => {
  const t = e.target.closest('.rg-step__toggle'); if (!t) return;
  const open = t.getAttribute('aria-expanded') === 'true';
  t.setAttribute('aria-expanded', String(!open));
  document.getElementById(t.getAttribute('aria-controls')).hidden = open;
});
```

Server-side (Jinja, Streamlit, template Python): rendere `aria-expanded="true"` e omettere
`hidden` quando la fase è aperta, `aria-expanded="false"` e `hidden` quando è chiusa. Non
esistono altre fonti di verità dello stato: niente classe `is-open` locale.

## Tastiera e accessibilità

- Ordine di tabulazione per fase: **toggle → Modifica → Elimina → contenuto della fase** (solo se
  aperta, perché `hidden` toglie il corpo dal flusso e dalla tabulazione). Coincide con l'ordine
  visivo, da sinistra a destra e dall'alto in basso.
- `Invio` o `Spazio` sul toggle aprono e chiudono la fase; `Invio` o `Spazio` sulle azioni
  attivano solo l'azione. Nessuna sovrapposizione: sono tre controlli distinti e affiancati,
  non annidati.
- Il nome accessibile del toggle è il suo contenuto visibile: `"1 Ricamo piatto Ricamo densità
  4.2 pt/mm altezza 2.0 mm 4 operazioni"`. Verboso ma vero; non sostituirlo con un `aria-label`
  breve, che nasconderebbe i parametri a chi non vede la riga.
- Le azioni ripetono la fase nel proprio nome accessibile — `Modifica fase 1: Ricamo piatto` via
  `aria-label` — altrimenti una pagina con otto fasi ha sedici bottoni chiamati "Modifica" ed
  "Elimina". L'etichetta **visibile** resta il verbo.
- `aria-controls` sul toggle punta all'`id` del corpo; il corpo è un `role="region"` etichettato
  dal toggle (`aria-labelledby`), così chi naviga per regioni ritrova la fase.
- Target: toggle e azioni ≥ 40 px di altezza. Focus con contorno nero da 2 px, sul toggle in
  versione interna (`outline-offset` negativo) per non invadere le azioni accanto: la fase ha un
  padding verticale proprio, così il contorno di focus e lo sfondo di hover non vanno mai a
  filo del separatore e restano leggibili come segnali distinti dalla riga.
- Eliminare una fase è distruttivo: l'azione apre una conferma (`rg-modal`), non elimina al
  primo click.

## Uso e limiti

- Massimo una sequenza per schermata; se le sequenze sono due, il problema è la pagina.
- Nel corpo va il contenuto della fase (operazioni in `rg-table` o `rg-list`, parametri in
  `rg-key-value`), non un'altra sequenza: `rg-step` **non si annida**. Per dire che più fasi
  vanno insieme c'è il gruppo (sotto), che resta una lista piatta.

## Gruppo di fasi collegate (`rg-steps--grouped`)

Aggiunto in v1.16.0. Una fase **principale** (una stampa, una pressatura) con 1–3 fasi
**collegate** subito prima e/o subito dopo («Pressatura iniziale», «Forno finale»). Il gruppo è
sempre contiguo, ha una sola principale e un solo livello. Ogni fase del gruppo resta una fase vera,
con il suo numero, il suo reparto e il suo foglio.

Prima c'era solo un badge in `__aside` («principale», «collegata a 2»), e le righe del gruppo erano
identiche alle altre: *«fuori è difficile capire se ci sono davvero fasi collegate o no»*.

### La forma: graffa, dente, ruolo

Tre segnali. Nessuno è di colore, e tutti reggono la fotocopia:

1. **Graffa**: un filo nero spesso nella colonna a sinistra dei numeri, con i due capi chiusi. Dice
   che quelle righe vanno insieme, e dove il gruppo comincia e finisce. Attraversa il filetto fra
   le fasi del gruppo, come il filo della sequenza attraversa quello fra le fasi.
2. **Dente**: un tratto dalla graffa al numero della principale, perché il gruppo «pende» dalla
   principale. Le collegate sopra il dente stanno **prima**, quelle sotto stanno **dopo**. La
   posizione rispetto alla principale si legge dalla figura.
3. **Ruolo**: `rg-step__role`, in testo sopra il titolo. Entra nel nome accessibile del toggle ed è
   l'unico dei tre che resta se il CSS non arriva.

Il numero della principale **non** cambia bordo, perché il bordo forte è già il segno di
`rg-step--danger` e in fotocopia i due si confonderebbero.

### Perché non un'altra forma

- **Non un `<li>` di gruppo con dentro un `<ol>`.** Sarebbe l'annidamento che il contratto esclude,
  e romperebbe l'ordine per chi usa lo screen reader: la lista esterna annuncerebbe «voce 2 di 3»
  su una riga che mostra le fasi 2 e 3. Il filo della sequenza, poi, si spezzerebbe al confine del
  gruppo. Coinbase CDS e Backbase ammettono sotto-step, ma sconsigliano di andare oltre un livello.
  Qui il livello di annidamento è zero, e il livello del gruppo è uno per costruzione: la graffa non
  ha una forma per un gruppo nel gruppo.
- **Non una numerazione secondaria (2a, 2b).** In Katana MRP le operazioni legate stanno sotto lo
  stesso numero perché sono una sola operazione di routing. Qui ogni fase ha un numero di
  posizione che è **un dato**: il foglio stampato dice «fase 3 di 4». Chiamarla «2b» a schermo le
  darebbe due identificativi, e in reparto il foglio 3 non si ritroverebbe nell'elenco.
- **Non un'intestazione di gruppo come riga a sé.** Il raggruppamento di GOV.UK (*Complete multiple
  tasks*) mette un'intestazione sopra un gruppo di compiti. Ma in una `<ol>` ogni figlio è una
  voce, quindi una riga-intestazione diventerebbe una fase finta con un numero di posizione in più.
  L'intestazione c'è lo stesso: è il ruolo della principale, dove il dente la indica.
- **Non un fondo colorato sulle righe del gruppo.** Si perde in fotocopia, e l'hover chiaro della
  fase ci sparirebbe sopra.

### Struttura

Parte DAVANTI: 1 ricamo · 2 pressatura (principale) · 3 sabbiatura e soffiatura finale (collegata,
dopo la 2) · 4 stampa UV.

```html
<ol class="rg-steps rg-steps--grouped">
  <li class="rg-step">
    <div class="rg-step__head">
      <button class="rg-step__toggle" type="button" id="fase-1-toggle" aria-controls="fase-1" aria-expanded="false">
        <span class="rg-step__num">1</span>
        <span class="rg-step__headline">
          <span class="rg-step__title">Ricamo</span>
          <span class="rg-step__meta"><span>Campionario Ricamo</span><span>4 operazioni</span></span>
        </span>
      </button>
      <div class="rg-step__actions"><a class="rg-button rg-button--ghost" href="…/fasi/1" aria-label="Apri fase 1: Ricamo">Apri</a></div>
    </div>
    <div class="rg-step__body" id="fase-1" role="region" aria-labelledby="fase-1-toggle" hidden>…</div>
  </li>

  <li class="rg-step rg-step--group rg-step--group-start rg-step--principal">
    <div class="rg-step__head">
      <button class="rg-step__toggle" type="button" id="fase-2-toggle" aria-controls="fase-2" aria-expanded="false">
        <span class="rg-step__num">2</span>
        <span class="rg-step__headline">
          <span class="rg-step__role">Principale</span>
          <span class="rg-step__title">Pressatura</span>
          <span class="rg-step__meta"><span>Pressatura e soffiatura</span><span>5 operazioni</span></span>
        </span>
        <span class="rg-step__aside"><span class="rg-badge rg-badge--count">6 da compilare</span></span>
      </button>
      <div class="rg-step__actions"><a class="rg-button rg-button--ghost" href="…/fasi/2" aria-label="Apri fase 2: Pressatura">Apri</a></div>
    </div>
    <div class="rg-step__body" id="fase-2" role="region" aria-labelledby="fase-2-toggle" hidden>…</div>
  </li>

  <li class="rg-step rg-step--group rg-step--group-end">
    <div class="rg-step__head">
      <button class="rg-step__toggle" type="button" id="fase-3-toggle" aria-controls="fase-3" aria-expanded="false">
        <span class="rg-step__num">3</span>
        <span class="rg-step__headline">
          <span class="rg-step__role">Collegata · dopo la 2</span>
          <span class="rg-step__title">Sabbiatura e soffiatura finale</span>
          <span class="rg-step__meta"><span>Pressatura e soffiatura</span><span>2 operazioni</span></span>
        </span>
        <span class="rg-step__aside"><span class="rg-badge rg-badge--count">7 da compilare</span></span>
      </button>
      <div class="rg-step__actions"><a class="rg-button rg-button--ghost" href="…/fasi/2?fase=3" aria-label="Apri fase 3: Sabbiatura e soffiatura finale, nella pagina della fase 2">Apri nella 2</a></div>
    </div>
    <div class="rg-step__body" id="fase-3" role="region" aria-labelledby="fase-3-toggle" hidden>…</div>
  </li>

  <li class="rg-step"><!-- 4 Stampa UV, senza classi di gruppo --></li>
</ol>
```

In un gruppo di tre o quattro fasi, quelle **in mezzo** hanno solo `rg-step--group`.

### Regole del gruppo

- **`rg-steps--grouped` va sulla lista, non sulle righe.** Riserva la colonna della graffa anche
  sulle fasi fuori gruppo, altrimenti i numeri non stanno in colonna e il filo si spezza. Se due
  parti dello stesso prodotto si guardano una dopo l'altra, conviene metterlo sempre, così i numeri
  non si spostano da una parte all'altra.
- **Capi espliciti.** `--group-start` e `--group-end` li rende il template, non li deduce il CSS: due
  gruppi possono essere adiacenti (2–3 e 4–5) e vanno visti come due gruppi.
- **Una sola `rg-step--principal` per gruppo**, e sempre anche `rg-step--group`.
- **Il ruolo si scrive in `rg-step__role`**, non in un badge dell'`__aside` e non ripetuto nella
  meta. Il badge «principale» e la riga «si compila dalla fase 2» vanno tolti: la stessa relazione
  detta tre volte sulla stessa riga è rumore. `__aside` resta per i conteggi.
- **Parole del ruolo**, sempre queste: «Principale»; «Collegata · prima della N»; «Collegata · dopo
  la N». Brevi: sono maiuscole.
- **La collegata annuncia dove porta.** La sua azione dice che si compila altrove: etichetta
  visibile «Apri nella 2», e nome accessibile completo. Il salto alla pagina della principale non
  deve essere una sorpresa. Arrivando, la pagina è già sulla collegata: vedi
  [phase-switch](phase-switch.md).
- Graffa e dente sono generati dal DS (`::after` della fase e `::before` della testa): **non**
  disegnarli nel markup.
- Tastiera e nomi accessibili non cambiano. Il nome del toggle guadagna il ruolo: «3 Collegata ·
  dopo la 2 Sabbiatura e soffiatura finale Pressatura e soffiatura 2 operazioni 7 da compilare».
- Riordino drag & drop: fuori contratto in 1.3.0. Se serve, si aggiunge come variante con
  controlli espliciti "sposta su / sposta giù", non come solo trascinamento.
- Sequenza vuota: `rg-empty` con testo esplicito, mai un `<ol>` senza fasi.
