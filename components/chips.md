# Chips

## Scopo

Selezione multipla o filtro rapido tramite pill **interattive**: ogni chip è una checkbox
travestita. Diverso dal badge, che è di sola lettura. Promosso da `rg-product-platform` (v0.3.0).

## Varianti

- **Chip** (`rg-chip`): pill selezionabile; lo stato attivo è pieno nero (`input:checked`).
- **Add** (`rg-chip--add`): chip tratteggiata che apre un modal o aggiunge una voce.

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
