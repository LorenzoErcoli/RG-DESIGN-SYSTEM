# Chat — la conversazione di una richiesta (`rg-chat`)

## Scopo

Il filo dei messaggi di una **richiesta di assistenza**: chi l'ha aperta, l'assistente automatico, le
persone dell'assistenza, i fatti della richiesta («registrata come problema») e — solo per chi le
gestisce — le note interne. Più il **compositore**, che dispone il campo e le azioni.

Lo stesso filo vive in **due contenitori**, e deve reggere in tutti e due:

- nel corpo di [rg-drawer](drawer.md), una colonna da ~430 px, con il compositore fermo nel piede;
- a tutta larghezza nella pagina **«Le mie richieste»** (e «Tutte le richieste» per chi le gestisce),
  dentro una superficie sollevata come `rg-section-card`.

Per questo **nessuna misura dipende dal contenitore**: un messaggio prende al massimo l'**85%** della
colonna **e** al massimo **68 caratteri** (regole §9, colonna di lettura), e vince la più stretta. Nel
pannello decide l'85%, nella pagina larga decidono i 68 caratteri.

## Varianti — chi parla

Cinque voci, e **ognuna si riconosce senza il colore**: ha una posizione, una figura e una parola sue.

| Classe | Chi | Posizione | Figura | Parola (in `rg-chat__meta`) |
| --- | --- | --- | --- | --- |
| `rg-chat__msg--user` | chi ha aperto la richiesta | **destra** | campitura rientrante, nessun bordo | «Tu» (o il nome, nella vista di chi gestisce) |
| `rg-chat__msg--assistant` | l'assistente automatico | sinistra | filetto intermedio | etichetta **«Assistente automatico»** in contorno |
| `rg-chat__msg--staff` | una persona dell'assistenza | sinistra | filetto **nero**, lato d'attacco a 2 px | etichetta **«Assistenza»** piena (nero, testo bianco) + il nome |
| `rg-chat__msg--system` | la richiesta stessa | **centro**, tutta la colonna | nessuna bolla: una frase piccola fra due filetti | la frase dice il fatto |
| `rg-chat__msg--note` | chi gestisce, per sé | tutta la colonna (fino a 68 caratteri) | **tratteggio** nero, fondo neutro | etichetta **«Nota interna»** tratteggiata |

Tre regole che non si negoziano:

- **Si deve sempre sapere se ha risposto una persona o la macchina.** L'etichetta di ruolo
  (`rg-chat__role`) è **obbligatoria** su `--assistant` e su `--staff`, e le parole sono quelle della
  tabella: «Assistente automatico» e «Assistenza». La differenza la portano la parola, il pieno contro
  il contorno e il filetto nero contro quello grigio — in scala di grigi resta tutta.
- **La nota interna si legge «interna» prima di leggerla.** Tratteggio (lo stesso segno di
  `rg-badge--archived` e `rg-chip--add`: «non è come gli altri»), etichetta «Nota interna», tutta la
  colonna. **Mai** un colore di stato. Non la vede chi ha aperto la richiesta: filtrarla è compito del
  server, non del CSS — una nota nascosta con il CSS sarebbe comunque nella pagina.
- **Il richiedente sta sempre a destra, chiunque guardi.** Nella pagina «Tutte le richieste» la stessa
  conversazione si legge uguale: il lato dice il **ruolo nella richiesta**, non chi è davanti allo
  schermo. Cambia solo la parola (il nome al posto di «Tu»).

### Stati del messaggio

| Classe | Quando | Cosa si vede |
| --- | --- | --- |
| `rg-chat__msg--pending` (con `--assistant` o `--staff`) | la risposta è chiesta e non è arrivata | la frase **«Sta scrivendo…»** e un piccolo cerchio che gira (fermo con `prefers-reduced-motion`: la frase resta) |
| `rg-chat__msg--failed` (con `--user`) | il messaggio non è partito | in `rg-chat__meta` un `rg-chat__status` con l'icona errore e la parola **«Non inviato»**; sotto, un bottone **«Riprova»**. Il filetto rosso accompagna, non dice |
| `rg-chat__empty` (nel filo, al posto dei messaggi) | la conversazione non è cominciata | una frase che dice cosa scrivere: «Scrivi cosa ti serve o cosa non va. Se puoi, allega una schermata della pagina.» |

**La risposta in arrivo si SOSTITUISCE, non si riempie a pezzi.** Il messaggio `--pending` viene
rimpiazzato dal messaggio vero quando è completo (`replaceWith`). Se il prodotto riceve la risposta a
pezzi (streaming), la mostri pure crescere, ma inserisca nel filo il messaggio **finito**: un
`role="log"` che cambia a ogni parola fa ripetere al lettore di schermo la frase dieci volte.

## Uso e limiti

### Il testo

`rg-chat__text` è **testo corrente** (16 px, regole §3). Dentro ci vanno paragrafi `<p>`, liste
`<ul>`/`<ol>` semplici e `<code>` per i codici (mono). **Gli a capo si conservano dentro ogni `<p>` e
`<li>`** (`white-space: pre-line`), non sul contenitore: fra un blocco e l'altro l'HTML ha i suoi a
capo, e se il contenitore li tenesse ogni paragrafo si porterebbe dietro una riga vuota.

Conseguenze per chi scrive il template:

- il testo dell'utente va in **un `<p>`**, escapato (in Jinja `{{ testo }}`, mai `|safe`), e gli a capo
  che ha battuto restano;
- scrivere `<p>{{ testo }}</p>` **su una riga sola**: un a capo dopo `<p>` diventerebbe una riga vuota
  in testa al messaggio;
- dal JavaScript, `p.textContent = testo` — mai `innerHTML` con il testo di qualcun altro.

Codici lunghi e indirizzi vanno a capo dove serve (`overflow-wrap: anywhere`): la bolla non sborda mai.

### Il meta

`rg-chat__meta` sta **sopra** la bolla, fuori: chi scorre la colonna legge prima chi parla. Dentro,
nell'ordine: `rg-chat__role` (se c'è), `rg-chat__author` (se c'è), `rg-chat__time` (mono, un
`<time datetime>`), `rg-chat__status` (solo per `--failed`). Per `--user` il meta va a destra.

### Le schermate allegate

In `rg-chat__attachments`, sotto il testo, come miniature [`rg-lightbox__thumb`](modal.md#ingrandire-unimmagine-dentro-un-modal):
l'ingrandimento si apre **sopra** il pannello (`--rg-z-lightbox` 450 contro `--rg-z-overlay` 300)
senza nessuno `z-index` locale. La miniatura porta un nome accessibile («Ingrandisci: schermata
allegata»).

### La live region

Il filo è `role="log"` con `aria-live="polite"` (implicito nel ruolo, ripetuto perché non tutti i
lettori lo deducono). Così un messaggio **aggiunto in fondo** viene letto, e la storia già presente
quando il pannello si apre no. Il contratto:

- i messaggi nuovi si **aggiungono in fondo** (`append`), mai riscrivendo il filo intero;
- il filo **esiste già** quando arriva il primo messaggio (nel drawer è nel markup, nascosto con lui).

### Il compositore

`rg-chat__composer` **dispone e basta**: il campo è un `rg-textarea`, l'allegato un
[`rg-file-input__control`](file-input.md) con un `rg-button--ghost`, l'invio un `rg-button--primary`
a destra. Può stare **fuori** da `.rg-chat` — nel drawer sta nel piede, fermo, mentre il filo scorre
nel corpo — e nessuna sua regola dipende dal contenitore.

- **Il campo cresce col testo**: parte da due righe (64 px) e si ferma al 40% dell'altezza della
  finestra, poi scorre — sul telefono, con la tastiera aperta, il filo deve restare visibile sopra.
  Lo fa `field-sizing: content` dove esiste (Chromium); altrove il controller, con tre righe:
  `campo.style.height = 'auto'; campo.style.height = campo.scrollHeight + 'px'` a ogni `input`.
- **Invio va a capo, Ctrl+Invio (Cmd+Invio) invia.** Sul telefono si scrive su più righe, e un
  messaggio partito a metà è peggio di un tasto in più. Il bottone Invia è sempre lì.
- **Durante l'invio** il bottone porta `aria-busy="true"` (lo stato di caricamento di `rg-button`) e
  il campo si svuota: chi scrive può già cominciare il messaggio dopo.
- **Invia non si disabilita** a campo vuoto (un bottone spento chiede una spiegazione accanto): a
  campo vuoto non parte niente e il fuoco torna nel campo.
- **L'allegato scelto si vede scritto** prima di inviare: una `rg-chat__attachments` nel compositore,
  con `rg-file-input__status` («Allegato: schermata.png · 214 KB») e un bottone «Togli».
  Se il prodotto cattura la schermata da sé invece di farla scegliere, il bottone «Allega schermata»
  diventa un `<button class="rg-button rg-button--ghost">` e il resto non cambia.
- Il campo ha un'etichetta: visibile, o `rg-u-visually-hidden` quando il titolo del pannello già dice
  a chi si scrive. Il segnaposto non è un'etichetta.

### Lo scorrimento

Dopo aver aggiunto un messaggio, il controller porta in vista l'ultimo: nel drawer
`corpo.scrollTop = corpo.scrollHeight`, nella pagina `msg.scrollIntoView({ block: 'nearest' })`.
Il DS non lo fa da sé (non serve JS).

### Su che superficie

Su una superficie **sollevata** (regole §6): il corpo del drawer, una `rg-section-card`. La bolla di
`--user` è rientrante (neutral-100) e sul fondo di pagina sparirebbe.

## Struttura

```
rg-chat                    role="log" aria-live="polite" aria-label="…"
├─ rg-chat__empty          solo a conversazione vuota
└─ rg-chat__msg (--user | --assistant | --staff | --system | --note) [+ --pending | --failed]
   ├─ rg-chat__meta        <p>: rg-chat__role · rg-chat__author · rg-chat__time · rg-chat__status
   ├─ rg-chat__text        <div> con <p>, <ul>, <ol>, <code>; per --system un <p> diretto
   └─ rg-chat__attachments facoltativo: miniature rg-lightbox__thumb

rg-chat__composer          <form>, dentro o fuori da rg-chat
├─ <label> + rg-textarea
├─ rg-chat__attachments    facoltativo: rg-file-input__status + «Togli»
└─ rg-chat__actions        rg-file-input__control (Allega schermata) · rg-button--primary (Invia)
```

### Le cinque voci e i due stati

```html
<div class="rg-chat" role="log" aria-live="polite" aria-label="Conversazione della richiesta n. 12">

  <div class="rg-chat__msg rg-chat__msg--system">
    <p class="rg-chat__text">Richiesta n. 12 aperta · <time datetime="2026-10-22T10:41">22/10 10:41</time></p>
  </div>

  <div class="rg-chat__msg rg-chat__msg--user">
    <p class="rg-chat__meta"><span class="rg-chat__author">Tu</span><time class="rg-chat__time" datetime="2026-10-22T10:41">10:41</time></p>
    <div class="rg-chat__text"><p>Nella scheda costi di M3641 il costo dei materiali è vuoto.</p></div>
    <div class="rg-chat__attachments">
      <button class="rg-lightbox__thumb" type="button" aria-label="Ingrandisci: schermata allegata"><img src="…" alt="Schermata della scheda costi" width="120"></button>
    </div>
  </div>

  <div class="rg-chat__msg rg-chat__msg--assistant">
    <p class="rg-chat__meta"><span class="rg-chat__role">Assistente automatico</span><time class="rg-chat__time" datetime="2026-10-22T10:41">10:41</time></p>
    <div class="rg-chat__text"><p>In M3641 mancano due prezzi a listino:</p><ul><li><code>TOP-0042</code> TOPAZIO GOTS</li><li><code>FIL-0281</code> viscosa opaca 40</li></ul></div>
  </div>

  <div class="rg-chat__msg rg-chat__msg--system">
    <p class="rg-chat__text">Registrata come problema · passata all'assistenza</p>
  </div>

  <div class="rg-chat__msg rg-chat__msg--note">
    <p class="rg-chat__meta"><span class="rg-chat__role">Nota interna</span><span class="rg-chat__author">Lorenzo E.</span><time class="rg-chat__time" datetime="2026-10-22T10:58">10:58</time></p>
    <div class="rg-chat__text"><p>Listino FILTES non aggiornato da settembre: controllare anche le altre stoffe.</p></div>
  </div>

  <div class="rg-chat__msg rg-chat__msg--staff">
    <p class="rg-chat__meta"><span class="rg-chat__role">Assistenza</span><span class="rg-chat__author">Lorenzo E.</span><time class="rg-chat__time" datetime="2026-10-22T11:05">11:05</time></p>
    <div class="rg-chat__text"><p>Ho inserito i due prezzi. Ricarica la scheda: il totale ora c'è.</p></div>
  </div>

  <!-- non partito -->
  <div class="rg-chat__msg rg-chat__msg--user rg-chat__msg--failed">
    <p class="rg-chat__meta"><span class="rg-chat__author">Tu</span><time class="rg-chat__time" datetime="2026-10-22T11:07">11:07</time>
      <span class="rg-chat__status"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-errore"></use></svg>Non inviato</span></p>
    <div class="rg-chat__text"><p>Grazie, ora lo vedo.</p></div>
    <button class="rg-button rg-button--ghost" type="button">Riprova</button>
  </div>

  <!-- risposta in arrivo: viene SOSTITUITO dal messaggio vero -->
  <div class="rg-chat__msg rg-chat__msg--assistant rg-chat__msg--pending">
    <p class="rg-chat__meta"><span class="rg-chat__role">Assistente automatico</span></p>
    <div class="rg-chat__text"><p>Sta scrivendo…</p></div>
  </div>
</div>
```

### Il compositore

```html
<form class="rg-chat__composer" action="/assistenza/12/messaggi" method="post" enctype="multipart/form-data">
  <label class="rg-u-visually-hidden" for="assistenza-testo">Messaggio per l'assistenza</label>
  <textarea class="rg-textarea" id="assistenza-testo" name="testo" rows="2" placeholder="Scrivi cosa ti serve o cosa non va…"></textarea>
  <div class="rg-chat__attachments" hidden>
    <span class="rg-file-input__status">Allegato: schermata.png · 214 KB</span>
    <button class="rg-button rg-button--ghost" type="button">Togli</button>
  </div>
  <div class="rg-chat__actions">
    <label class="rg-file-input__control">
      <input type="file" name="schermata" accept="image/*">
      <span class="rg-button rg-button--ghost"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-immagine"></use></svg>Allega schermata</span>
    </label>
    <button class="rg-button rg-button--primary" type="submit">Invia</button>
  </div>
</form>
```

### Nel pannello dell'assistenza

Il filo nel corpo del [drawer](drawer.md), il compositore nel piede:

```html
<div class="rg-drawer" id="assistenza" role="dialog" aria-labelledby="assistenza-titolo" hidden>
  <header class="rg-drawer__header">
    <div class="rg-drawer__heading">
      <h2 class="rg-drawer__title" id="assistenza-titolo" tabindex="-1">Assistenza</h2>
      <p class="rg-drawer__subtitle">Richiesta n. 12 · aperta da questa pagina</p>
    </div>
    <button class="rg-icon-button rg-icon-button--full rg-drawer__close" type="button" aria-label="Chiudi l'assistenza"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg></button>
  </header>
  <div class="rg-drawer__body">
    <div class="rg-chat" role="log" aria-live="polite" aria-label="Conversazione con l'assistenza">
      <p class="rg-chat__empty">Scrivi cosa ti serve o cosa non va. Se puoi, allega una schermata della pagina.</p>
    </div>
  </div>
  <footer class="rg-drawer__footer">
    <form class="rg-chat__composer" action="/assistenza/messaggi" method="post" enctype="multipart/form-data">
      <!-- come sopra -->
    </form>
  </footer>
</div>
```

### Nella pagina «Le mie richieste»

Lo stesso filo, a tutta larghezza in una superficie sollevata; il compositore sotto, nella stessa card:

```html
<section class="rg-section-card">
  <header class="rg-section-card__header"><h2 class="rg-section-card__title">Richiesta n. 12 — costo materiali vuoto</h2></header>
  <div class="rg-section-card__body">
    <div class="rg-chat" role="log" aria-live="polite" aria-label="Conversazione della richiesta n. 12">…</div>
  </div>
  <div class="rg-section-card__body">
    <form class="rg-chat__composer" …>…</form>
  </div>
</section>
```

Il controller di riferimento (filo, compositore, allegato) è in
[examples/rg-assistenza.html](../examples/rg-assistenza.html), senza dipendenze.
