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
  `rg-key-value`), non un'altra sequenza: `rg-step` **non si annida**.
- Riordino drag & drop: fuori contratto in 1.3.0. Se serve, si aggiunge come variante con
  controlli espliciti "sposta su / sposta giù", non come solo trascinamento.
- Sequenza vuota: `rg-empty` con testo esplicito, mai un `<ol>` senza fasi.
