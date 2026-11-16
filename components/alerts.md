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

### Le uscite dello stato vuoto (`rg-empty__actions`, proposta 1.55.0)

Quando l'elenco è vuoto **per colpa dei filtri**, lo stato vuoto dice quale filtro lo svuota e offre
di toglierlo: è la regola qui sopra («spiegare perché è vuoto e cosa fare») resa precisa. Le azioni
stanno in `rg-empty__actions`, una fila centrata con 12 px fra un bottone e l'altro; prima due bottoni
nel testo centrato stavano a una spaziatura di parola.

- **Titolo**: che cosa è vuoto e perché — «Nessun prodotto con questi filtri».
- **Testo**: quale filtro lo svuota e che cosa succede togliendolo — «Li svuota Categoria = BORSE:
  senza quel filtro i prodotti sono 236.» Il filtro da nominare lo sceglie il server: quello che,
  tolto da solo, fa tornare più elementi.
- **Azioni**: prima `rg-button--secondary` che toglie **quel** filtro (un link all'indirizzo senza di
  lui), poi `rg-button--ghost` «Togli tutti i filtri». Bottoni a 40 px, non `--small`.
- La [barra dei filtri](filter-bar.md) resta sopra, con «**0** prodotti su 412».

```html
<div class="rg-empty">
  <h3>Nessun prodotto con questi filtri</h3>
  <p>Li svuota Categoria = BORSE: senza quel filtro i prodotti sono 236.</p>
  <div class="rg-empty__actions">
    <a class="rg-button rg-button--secondary" href="/products?cliente=DIOR&amp;cliente=FENDI">Togli Categoria = BORSE</a>
    <a class="rg-button rg-button--ghost" href="/products">Togli tutti i filtri</a>
  </div>
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
