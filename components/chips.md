# Chips

## Scopo

Selezione multipla o filtro rapido tramite pill **interattive**: ogni chip è una checkbox
travestita. Diverso dal badge, che è di sola lettura. Promosso da `rg-product-platform` (v0.3.0).

## Varianti

- **Chip** (`rg-chip`): pill selezionabile; lo stato attivo è pieno nero (`input:checked`).
- **Add** (`rg-chip--add`): chip tratteggiata che apre un modal o aggiunge una voce.
- **Remove** (`rg-chip--remove`, proposta 1.55.0): l'etichetta di un valore **già scelto** che si
  toglie con un clic. È un `<a>`, non una casella. Vedi sotto.

## Uso e limiti

Usare per categorie, divisioni, tag e filtri dove la scelta è multipla e le opzioni sono poche e
brevi. Per molte opzioni preferire l'autocomplete. Ogni chip contiene un `<input>` reale
(accessibile, focus visibile): non simulare la selezione col solo click sul contenitore. Lo stato
non dipende dal solo colore: il pieno nero + il segno di spunta comunicano la selezione.

## Struttura

Gruppo `rg-chip-select` → chip come `<label>` con input nascosto ma focusabile.

```html
<div class="rg-chip-select">
  <label class="rg-chip"><input type="checkbox" name="div" value="alta-moda"> Alta moda</label>
  <label class="rg-chip"><input type="checkbox" name="div" value="pronto"> Pronto moda</label>
  <button class="rg-chip rg-chip--add" type="button">+ Nuova</button>
</div>
```

## Chip che toglie (`rg-chip--remove`, proposta 1.55.0)

Sotto la [barra dei filtri](filter-bar.md), ogni valore scelto è un'etichetta con la ×: un **link**
all'indirizzo di adesso senza quel valore. Funziona senza JavaScript.

- In testa `<span class="rg-u-visually-hidden">Togli </span>`: il nome del link è «Togli Cliente
  DIOR», non «Cliente DIOR». La × è l'icona `chiudi`, `aria-hidden`.
- `rg-chip__key` è il nome del filtro, in grigio, prima del valore.
- Stessa pillola del chip (32 px, contorno intermedio, testo nero); il link **non si sottolinea**. In
  hover contorno nero, come ogni chip; il focus è l'anello nero del DS.
- **Bersaglio 40 px** senza alzare la pillola: un sovrapposto invisibile sporge 4 px sopra e sotto.
  Le righe di etichette stanno a 8 px una dall'altra (`rg-filter-bar__tags` lo fa già), e niente di
  cliccabile va più vicino. Al tocco la pillola sale a 44.
- In stampa la × sparisce: l'etichetta resta come dichiarazione di che cosa è filtrato.

```html
<ul class="rg-filter-bar__tags" aria-label="Filtri scelti">
  <li><a class="rg-chip rg-chip--remove" href="/products?categoria=BORSE"><span class="rg-u-visually-hidden">Togli </span><span class="rg-chip__key">Cliente</span> DIOR<svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg></a></li>
</ul>
```
