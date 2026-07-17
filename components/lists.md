# Liste tecniche con azioni (`rg-list`)

Riga di lista per elenchi tecnici brevi (revisioni, override, operazioni) con titolo identitario, metadati mono e azioni inline. Aggiunta in v0.2.0 per gli editor di percorso; usa superfici aperte e separatori sottili, non card.

## Struttura

```html
<ul class="rg-list">
  <li class="rg-list-row is-selected" aria-selected="true">
    <div class="rg-list-row__head">
      <span class="rg-list-row__title">Riga 3 → Riga 4</span>
      <span class="rg-badge rg-badge--thread">manuale</span>
    </div>
    <div class="rg-list-row__meta">
      <span>4 punti · 46 mm</span>
      <span class="rg-list-row__actions">
        <button class="rg-icon-button" aria-label="Centra sul connettore">◎</button>
        <button class="rg-icon-button" aria-label="Attiva retrace" aria-pressed="false">↺</button>
        <button class="rg-icon-button rg-icon-button--danger" aria-label="Elimina ritocco">×</button>
      </span>
    </div>
  </li>
</ul>
```

## Regole

- Stato selezionato con bordo nero + `box-shadow` a sinistra, mai solo colore.
- `rg-list-row--danger` per righe in stato irrisolto (es. override scollegati): bordo sinistro `danger`.
- Ogni `rg-icon-button` richiede `aria-label`; le icone geometriche accompagnano un'azione non universale.
- Titolo in font identitario, metadati e quantità in mono con cifre tabulari.
- Target interattivo compatto 34×34; per densità standard preferire `rg-button--small`.
