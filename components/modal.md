# Modal / Dialog

## Scopo

Interrompere il flusso per una decisione o un input breve che richiede contesto isolato:
conferme, modifica di un singolo valore, scelta da un elenco. Non per contenuto lungo o per
navigazione: quelli restano nella pagina. Promosso da `rg-product-platform` (v0.3.0).

## Varianti

- **Standard** (`rg-modal`): larghezza media (480px).
- **Small** (`rg-modal--sm`): conferme secche (360px).
- **Large** (`rg-modal--lg`): form con più righe (640px).

## Uso e limiti

Un solo modal alla volta. Chiusura con `Esc`, click sul backdrop e pulsante `×`. Focus trappola
dentro il dialog e ritorno al trigger alla chiusura. Il backdrop è uno scrim (nero al 45%), non
una superficie: non collocarci contenuto. Azione primaria del footer a destra; l'azione
distruttiva separata da quella di conferma.

## Struttura

Backdrop → dialog (header con titolo + close → body → footer). Bordo 1 px nero, radius 4 px,
ombra `--rg-shadow-overlay` (unico caso di ombra ammesso, elemento sovrapposto).

```html
<div class="rg-modal-backdrop is-open" role="presentation">
  <div class="rg-modal rg-modal--sm" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <header class="rg-modal__header">
      <h2 class="rg-modal__title" id="m-title">Cambia divisione</h2>
      <button class="rg-modal__close" type="button" aria-label="Chiudi">×</button>
    </header>
    <div class="rg-modal__body">
      <p class="rg-modal__meta">RG-PRD-0248</p>
      <div class="rg-modal__row">
        <span class="rg-modal__row-label">Attuale</span>
        <span class="rg-modal__current">Alta moda</span>
      </div>
    </div>
    <footer class="rg-modal__footer">
      <button class="rg-button rg-button--ghost" type="button">Annulla</button>
      <button class="rg-button rg-button--primary" type="button">Conferma</button>
    </footer>
  </div>
</div>
```

Il backdrop usa `z-index: var(--rg-z-modal)`. `is-open` sul backdrop lo mostra
(`display: flex`); di default è nascosto.
