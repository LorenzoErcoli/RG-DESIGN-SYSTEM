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
    <input class="rg-input rg-input--numeric" type="number" step="0.01" min="0" value="80"> <span>€/h</span>
  </span>
  <small class="rg-field__help">Costo orario della macchina da ricamo.</small>
</label>
```

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

