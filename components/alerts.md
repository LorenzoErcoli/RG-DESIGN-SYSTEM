# Alerts, empty & loading

Messaggi contestuali e stati di una vista. Il segnale è sempre testuale: il colore accompagna,
non sostituisce.

## Alert (`rg-alert`)

### Scopo
Comunicare un esito o una condizione (info, successo, avviso, errore) senza interrompere il flusso
come farebbe un modal.

### Varianti
- `rg-alert--info` · `rg-alert--success` · `rg-alert--warning` · `rg-alert--error`.

### Uso e limiti
Titolo breve + messaggio. La barra colorata a sinistra è ridondante col testo, mai l'unico segnale.
Per una decisione bloccante usare il modal; per uno stato persistente di un campo usare gli stati del form.

```html
<div class="rg-alert rg-alert--warning">
  <div>
    <p class="rg-alert__title">Controllo richiesto</p>
    <p class="rg-alert__message">Un materiale supera la soglia configurata.</p>
  </div>
</div>
```

## Empty state (`rg-empty`)

### Scopo
Comunicare l'assenza di dati con un testo esplicito e, quando utile, un'azione di uscita.

### Uso e limiti
Spiegare *perché* è vuoto e *cosa fare* (azzera filtri, cambia ricerca). Non lasciare aree vuote mute.

```html
<div class="rg-empty">
  <h3>Nessun risultato</h3>
  <p>Modifica i filtri oppure cerca un codice differente.</p>
  <button class="rg-button rg-button--secondary rg-button--small">Azzera filtri</button>
</div>
```

## Loading (`rg-loading`)

### Scopo
Segnalare un caricamento in corso con uno scheletro a righe, conservando l'ingombro del contenuto atteso.

### Uso e limiti
Preferire lo scheletro allo spinner quando si conosce la forma del contenuto. Fornire sempre
un'etichetta accessibile (`aria-label`/`aria-busy`).

```html
<div class="rg-loading" aria-label="Caricamento" aria-busy="true">
  <div class="rg-loading__line"></div>
  <div class="rg-loading__line"></div>
  <div class="rg-loading__line"></div>
</div>
```
