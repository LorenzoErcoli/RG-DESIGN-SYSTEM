# Forms

## Scopo

Raccogliere dati affidabili riducendo ambiguità, errori e perdita di contesto tecnico.

## Varianti

- Input testuale/numerico, textarea, select, checkbox/radio, **toggle**, **segmented**, upload, ricerca, **autocomplete** (input con suggerimenti filtrati) e campo calcolato in sola lettura.
- **Inline** per filtri semplici; **stacked** per inserimenti complessi; **step** solo quando esistono fasi reali.

## Uso e limiti

Label sempre visibile sopra il campo. Placeholder solo come esempio, mai come label. Help text per formato, origine o conseguenze. Evitare select con molte opzioni: usare ricerca. Non usare toggle per azioni irreversibili.

## Struttura

Label → controllo → unità/azione accessoria → help → errore. I campi numerici usano mono, unità persistente e limiti dichiarati. Errori vicini al campo e riepilogo in testa per form lunghi.

```html
<label for="thread-length">Lunghezza filo</label>
<div class="rg-field-with-unit">
  <input id="thread-length" inputmode="decimal" value="18.42" /> <span>m</span>
</div>
<small>Valore stimato dal file macchina, revisione 04.</small>
```

Stati richiesti: default, hover, focus, filled, read-only, disabled, warning, error, success e loading dipendente.

## Campo con unità (`.rg-field-with-unit`) — larghezza minima

Il campo è `[input | unità]`: il suffisso unità è incomprimibile (min 42px), quindi tutto ciò che
si toglie alla colonna lo perde il numero. **Larghezza minima d'uso: 132px**
(`--rg-layout-param-col-min`) — sotto, un valore come `12.5` con il suffisso dell'unità
non è più leggibile e la label a due parole va a capo tre volte.

- In una griglia a due colonne (`rg-param-grid`) servono quindi ≥ 324px di contenitore. Non è una
  raccomandazione da rispettare a mano: `rg-param-grid` dentro `rg-workspace__panel` impila da sé
  a una colonna sotto quella soglia (vedi `patterns/workspace.md`).
- In un contenitore che non è il pannello di una tool, se la colonna può scendere sotto 132px usa
  una colonna sola: non esiste una variante compatta del campo con unità, perché comprimere un
  valore misurato è esattamente ciò che le regole tecniche vietano (§8 di `design-rules.md`).
- Se l'unità è la stessa per tutti i campi di un gruppo, dichiararla una volta nel titolo del
  gruppo e usare `rg-input` semplice è preferibile a ripetere un suffisso che ruba spazio.
- L'input non sborda mai il proprio contenitore: il DS gli impone `min-width: 0`, che annulla la
  dimensione minima automatica del controllo. Non aggiungere `width`/`min-width` locali.

## Campo numerico (`.rg-input--numeric`)

Un valore misurato è un dato tecnico: mono, cifre tabulari, allineato a destra e **largo quanto
serve**, non quanto il contenitore. `rg-input--numeric` è la forma da usare per tariffe, tempi,
quantità e soglie; sostituisce la composizione `rg-input rg-mono`, che resta valida per gli input
di testo tecnico (codici, ID) dove l'allineamento a destra non ha senso.

La larghezza è `--rg-input-numeric-width` (default `12ch`): si stringe o si allarga per caso d'uso
sul contenitore, senza toccare il componente. Dentro `rg-field-with-unit` il campo e il riquadro
dell'unità restano attaccati e non si stirano.

```html
<label class="rg-field">
  <span class="rg-field__label">Tariffa macchina</span>
  <span class="rg-field-with-unit">
    <input class="rg-input rg-input--numeric" type="text" inputmode="decimal" value="80"> <span>€/h</span>
  </span>
  <small class="rg-field__help">Costo orario della macchina da ricamo.</small>
</label>
```

## Larghezza dichiarata (`.rg-field--w4|w8|w16|w24|--grow`)

La larghezza di un campo è un'**affermazione su quanto contenuto ci si aspetta**, non una scelta
estetica. Un campo largo mezza pagina per contenere `2` chiede a chi compila di ricontrollare di
aver capito la domanda; una casella da tre caratteri per un percorso file lo costringe a scorrere
dentro l'input per rileggere ciò che ha scritto.

Il numero nel nome **è** il numero di caratteri attesi. La misura è `Nch` più il cromo del
controllo (padding e bordo, coperti da `--rg-space-8`).

| Classe | Contenuto atteso | Esempi |
| --- | --- | --- |
| `rg-field--w4` | 3–4 caratteri | passate, pezzi al piano, numero di teste |
| `rg-field--w8` | 6–8 caratteri | tempo, dpi, altezza, grammatura |
| `rg-field--w16` | 12–16 caratteri | codice, lotto, sigla inchiostri |
| `rg-field--w24` | ~24 caratteri | nome profilo, tipo supporto, descrizione breve |
| `rg-field--grow` | variabile e senza tetto | percorso file, note |

- **Senza modificatore il campo resta fluido** e riempie la colonna che lo ospita: è il default
  giusto per un form a una colonna dove tutti i campi hanno contenuto simile.
- `--grow` è un flex item che prende lo spazio che avanza sulla riga: si usa dentro un
  `rg-cluster`, non dentro una griglia a colonne fisse (lì c'è già `rg-param-grid__wide`).
- Il **valore misurato** aveva già la sua larghezza: `rg-input--numeric` si ferma a
  `--rg-input-numeric-width` (12ch). Questi modificatori servono al **testo**, che finora prendeva
  sempre tutta la colonna anche quando conteneva tre lettere.
- **La misura è del controllo, non dell'etichetta** (dalla 1.16.0). Input, select e
  `rg-field-with-unit` restano alla larghezza dichiarata. Il campo è largo quanto la sua etichetta,
  mai meno della misura, e l'etichetta non va a capo sopra i 680 px.
  Fino alla 1.15 il modificatore stringeva anche l'etichetta: «Pezzi per ciclo (n)» andava su due
  righe sopra una casella da quattro cifre, e la riga dei campi perdeva l'allineamento delle
  etichette. L'affermazione «qui ci vanno quattro caratteri» riguarda il contenuto, e il contenuto
  sta nel controllo. Sotto i 680 px l'etichetta torna a capo: sbordare dallo schermo è peggio.
- Un'etichetta **molto** più lunga del suo controllo resta un segnale. Di solito l'unità va tolta
  dall'etichetta e messa accanto al valore (`rg-field-with-unit`), oppure l'etichetta va accorciata.

```html
<div class="rg-cluster rg-cluster--end">
  <label class="rg-field rg-field--w8"><span class="rg-field__label">Tempo</span>
    <input class="rg-input rg-input--numeric" type="text" inputmode="decimal" value="12"></label>
  <label class="rg-field rg-field--w4"><span class="rg-field__label">Passate</span>
    <input class="rg-input rg-input--numeric" type="text" inputmode="numeric" value="2"></label>
  <label class="rg-field rg-field--grow"><span class="rg-field__label">File</span>
    <input class="rg-input rg-mono" value="RG-0481_p2_uv.prn"></label>
</div>
```

## Marcatore di campo (`.rg-field__mark`) — dichiara una volta, marca molte

«Questo campo entra nel costo» vale per cinque campi su dodici. Ripeterlo in un `rg-field__help`
sotto ognuno è **rumore, non informazione**: cinque volte la stessa frase, e in lettura assistita
cinque volte la stessa frase a ogni campo.

La forma corretta è l'opposta: l'istruzione che vale per il gruppo si scrive **una volta sola** in
testa al gruppo, e si lega ai singoli controlli con `aria-describedby`. Nell'etichetta resta solo
un **segno**, mono e secondario, il cui significato è quella frase.

- Il marcatore è un **carattere**, non un colore: sopravvive alla scala di grigi e alla fotocopia
  (regola 11 — nessuno stato affidato al solo colore).
- Va **sempre** in coppia con `aria-describedby` dall'input alla frase che lo spiega, e
  `aria-hidden="true"` sul segno: altrimenti in lettura assistita è muto, o peggio si sente
  «euro» senza contesto.
- Un solo marcatore per gruppo. Due assi diversi contemporaneamente (costo *e* provenienza) non si
  distinguono a colpo d'occhio: il secondo asse usa un `rg-badge`, che ha il testo dentro.
- Se il gruppo ha **più campi marcati che non marcati**, il marcatore è dalla parte sbagliata:
  marcare le eccezioni, non la regola.

```html
<p id="nota-costo" class="rg-small">
  I campi contrassegnati <span class="rg-field__mark">€</span> entrano nel costo della fase.
  Gli altri sono di scheda: servono a rifare il lavoro.
</p>

<label class="rg-field rg-field--w8">
  <span class="rg-field__label">Tempo <span class="rg-field__mark" aria-hidden="true">€</span></span>
  <input class="rg-input rg-input--numeric" type="text" inputmode="decimal"
         value="12" aria-describedby="nota-costo">
</label>
```

## Campi numerici: `inputmode`, non `type="number"`

Per un valore che si scrive a tastiera in sequenza, `type="number"` è la scelta sbagliata, e non
per gusto. La ricerca del team GOV.UK Design System, che ci si è basato per cambiare i propri
componenti, elenca quattro difetti:

1. **Accessibilità** — non è dettabile né selezionabile con Dragon NaturallySpeaking; NVDA lo
   annuncia come *spin button* con due bottoni senza etichetta, e in `nvda+tab` come campo non
   etichettato.
2. **Solo numeri incrementabili** — la specifica HTML dice che non è adatto a input «che si dà il
   caso siano composti di sole cifre ma non sono, propriamente, numeri». I browser arrotondano i
   valori grandi e li convertono in notazione esponenziale premendo su/giù, **senza possibilità di
   annullare**.
3. **Lettere scartate in silenzio** — Chrome elimina i caratteri non numerici senza dirlo a
   nessuno, tecnologie assistive comprese.
4. **Scroll** — la rotellina del mouse o il gesto del trackpad **cambiano il valore** di un campo
   che ha il focus.

Il quarto punto è quello che pesa in reparto: una scheda si compila scorrendo, e un tempo che
cambia da solo mentre si scorre è un dato sbagliato che sembra buono.

La forma da usare è `type="text"` con `inputmode`, che separa *come si digita* da *cosa contiene*:

```html
<!-- decimale: tempi, misure, tariffe -->
<input class="rg-input rg-input--numeric" type="text" inputmode="decimal" name="tempo" value="12.5">
<!-- intero: passate, pezzi, quantità -->
<input class="rg-input rg-input--numeric" type="text" inputmode="numeric" pattern="[0-9]*" name="passate" value="2">
```

`inputmode` fa comparire il tastierino grande sui browser mobili; `pattern="[0-9]*"` resta per
compatibilità con iOS più vecchi. La validazione è dell'applicazione, non del browser: la
validazione nativa è implementata in modo diverso da ogni vendor.

**Eccezione ammessa:** `type="number"` va bene per un valore *davvero* incrementabile dove le
frecce sono un servizio (uno stepper di quantità in una riga di carrello) e il campo non è
attraversato scorrendo una pagina lunga.

## Ordine di tabulazione in una scheda lunga

- **Nessun `tabindex` positivo.** L'ordine di focus è l'ordine del DOM, e il DOM deve essere
  l'ordine in cui si compila (WCAG 2.4.3 *Focus Order*: gli elementi ricevono il focus in un
  ordine che preserva significato e operabilità).
- **Niente controlli in mezzo ai campi.** Un pulsante o un link piazzato fra due campi rompe la
  sequenza attesa: chi tabula si aspetta il campo successivo. Le azioni di una riga stanno **in
  fondo** alla riga; le azioni tangenziali (un «vai al catalogo») stanno **sopra** il form.
- **Un solo pulsante primario per form.** Con più submit, chi preme Invio dentro un campo non sa
  quale azione partirà.
- **Il primario allineato al bordo sinistro dei campi**, subito sotto l'ultimo campo. Nel test
  eye-tracking di Luke Wroblewski il layout con le azioni fuori dall'asse verticale degli input
  (allineate a destra) ha prodotto le fissazioni più lunghe e più numerose: le persone si
  aspettavano il bottone sotto l'ultimo campo e hanno dovuto cercarlo.
- L'ordine visivo e l'ordine di tabulazione devono coincidere: una griglia a più colonne li fa
  divergere, ed è una ragione in più per non usarla in un form da compilare.

## Sola lettura (`[readonly]`)

`readonly` e `disabled` non sono lo stesso stato e non vanno scambiati. **Disabled** significa
"questo controllo non è attivo ora" (dipende da un'altra scelta, da un caricamento): il testo
sbiadisce e il valore non viene inviato. **Read-only** significa "il valore è valido e va letto,
ma tu non puoi cambiarlo": tipicamente perché l'utente non ha il permesso. Il valore resta a pieno
contrasto, selezionabile, copiabile e raggiungibile da tastiera; cambiano solo la superficie e
l'assenza di affordance in hover.

Regola non negoziabile: il grigio non è la spiegazione. Il motivo va scritto accanto al form con
un `rg-alert`, e l'azione primaria che non è più eseguibile va **omessa**, non lasciata inerte.

```html
<div class="rg-alert rg-alert--info" role="note">
  <p class="rg-alert__title">Sola lettura</p>
  <p class="rg-alert__message">Non hai i permessi per modificare questi valori. Richiedi l'abilitazione a un amministratore.</p>
</div>
<label class="rg-field">
  <span class="rg-field__label">Velocità</span>
  <span class="rg-field-with-unit">
    <input class="rg-input rg-input--numeric" value="500" readonly> <span>punti/min</span>
  </span>
</label>
```

`<select>` non ha `readonly`: usare `aria-readonly="true"` (il DS lo stila come i campi di testo) e,
se il valore deve comunque essere inviato, un `<input type="hidden">` gemello. Un `<fieldset>` non
può essere read-only: l'attributo va su ogni controllo.

## Gruppo di parametri (`.rg-parameter-group`)

La forma RG del **form di configurazione**: un `<fieldset>` con `<legend class="rg-label">` e una
griglia a due colonne di `rg-field`. Non è una card — è il raggruppamento nativo di un form, che
dichiara a quale insieme di parametri appartengono i campi. Per una sola sezione su una pagina già
intitolata si può usare direttamente `rg-parameter-group__grid` senza il riquadro.

Famiglia dei control group, tutti in `styles/rg-layout.css`:

| Classe | Ruolo |
| --- | --- |
| `rg-parameter-group` + `__grid` | parametri di calcolo o configurazione, in fieldset |
| `rg-filter-group` | filtri di un elenco: campi + azione allineati al piede |
| `rg-action-bar` | barra di conferma: stato a sinistra, azioni a destra |
| `rg-confirmation` | blocco di conferma con titolo, conseguenze e azioni |

```html
<fieldset class="rg-parameter-group">
  <legend class="rg-label">Parametri macchina</legend>
  <div class="rg-parameter-group__grid">
    <label class="rg-field"><span class="rg-field__label">Tariffa macchina</span><span class="rg-field-with-unit"><input class="rg-input rg-input--numeric" value="80"> <span>€/h</span></span></label>
    <label class="rg-field"><span class="rg-field__label">Velocità</span><span class="rg-field-with-unit"><input class="rg-input rg-input--numeric" value="500"> <span>punti/min</span></span></label>
  </div>
</fieldset>
```

Per una pagina intera di configurazione (testata, gruppi, tabella di valori per riga, salvataggio,
sola lettura, indisponibilità) la composizione completa è in [`patterns/settings.md`](../patterns/settings.md).

## Autocomplete (`.rg-autocomplete`)

Input di testo con suggerimenti filtrati mentre si digita. È la risposta alla regola
"evitare select con molte opzioni": si scrive liberamente e la lista si restringe. A differenza
di `<select>`/`.rg-select` accetta anche un **valore libero** (ciò che resta nell'input è il
valore inviato), utile quando la voce può non essere ancora in archivio.

Il controllo è la `.rg-input`; il wrapper aggiunge la lista attaccata al campo (bordo condiviso,
niente ombra). Le opzioni stanno nel markup come `<li>` — nessun dato lato JS richiesto.

```html
<div class="rg-autocomplete">
  <input class="rg-input rg-autocomplete__input" type="text" name="materiale"
         role="combobox" aria-autocomplete="list" aria-expanded="false" autocomplete="off"
         placeholder="Materiale (registro o nuovo)">
  <ul class="rg-autocomplete__list" role="listbox" hidden>
    <li class="rg-autocomplete__option" role="option">POLIBOND 45GR NERO</li>
    <li class="rg-autocomplete__option" role="option">CANVAS NERO</li>
  </ul>
</div>
```

Comportamento atteso (implementazione JS di riferimento, indipendente da librerie): al focus e a
ogni digitazione, filtra le `option` per sottostringa e mostra la lista; selezione con click o
tastiera (frecce su/giù, Invio); chiusura con Esc o click esterno; se nessuna corrispondenza,
mostra `.rg-autocomplete__empty`. Il valore libero digitato resta valido.

## Toggle (`.rg-toggle`)

Interruttore on/off per uno stato **non irreversibile** (es. attivare debug, autofill). Contiene un
`<input type="checkbox">` reale nascosto ma focusabile; lo stato è comunicato da posizione + pieno
nero, non dal solo colore. Non usare per azioni distruttive: quelle richiedono un pulsante e conferma.

```html
<label class="rg-toggle"><input type="checkbox" checked><span class="rg-toggle__track"></span><span>Debug attivo</span></label>
```

## Segmented control (`.rg-segmented`)

Scelta esclusiva tra poche opzioni sorelle (2–4), alternativa compatta ai radio quando le opzioni
sono brevi e mutuamente esclusive (es. unità mm/px/originali). L'opzione attiva è
`rg-segmented__item--active` (o `aria-pressed="true"`).

```html
<div class="rg-segmented">
  <button class="rg-segmented__item rg-segmented__item--active">Metrici</button>
  <button class="rg-segmented__item">Imperiali</button>
  <button class="rg-segmented__item">Originali</button>
</div>
```

## Upload (`.rg-upload`)

Area di caricamento file (DXF/SVG/PDF/macchina) con label esplicita e vincoli visibili. Fornire
sempre formati accettati e dimensione massima; gestire hover/dragover ed errore.

```html
<label class="rg-upload">
  <input type="file" hidden>
  <div><strong>Trascina un file macchina</strong>
    <div class="rg-small rg-mono">DST, EXP, PDF · MAX 50 MB</div>
  </div>
</label>
```

