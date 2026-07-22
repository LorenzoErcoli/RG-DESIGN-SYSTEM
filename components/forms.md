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
(`--rg-layout-param-col-min`) — sotto, un valore come `12.5` con gli spinner del `type="number"`
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

