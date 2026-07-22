# Liste tecniche con azioni (`rg-list`)

Riga di lista per elenchi tecnici brevi (revisioni, override, operazioni, fasi di lavorazione)
con titolo identitario, metadati mono e — in alternativa fra loro — azioni inline **oppure**
navigazione al dettaglio. Aggiunta in v0.2.0 per gli editor di percorso; usa superfici aperte e
separatori sottili, non card.

## Varianti

| Variante | Quando |
| --- | --- |
| `rg-list-row` | Riga-record inerte: il contenuto sta tutto lì, eventuali azioni sono in `__actions`. |
| `rg-list-row--link` | Riga-record **navigabile**: la riga intera apre una pagina di dettaglio (v1.2.0). |
| `rg-list-row--danger` | Riga in stato irrisolto (es. override scollegato): filetto sinistro `danger`. |

Stati: `is-selected` / `[aria-selected="true"]`, `:hover`, `:focus-visible`.

## Struttura — riga con azioni inline

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

## Struttura — riga navigabile (`rg-list-row--link`)

Quando l'elenco è un indice e ogni riga apre il proprio dettaglio (elenco delle fasi di una
parte, revisioni di una scheda, operazioni di una lavorazione), la riga **è** il link: un solo
target, grande quanto la riga, con chevron di apertura sul lato destro.

```html
<ul class="rg-list">
  <li>
    <a class="rg-list-row rg-list-row--link" href="/products/24/parts/3/fasi/0">
      <span class="rg-list-row__head">
        <span class="rg-list-row__title">Ricamo piatto</span>
        <span class="rg-badge rg-badge--count">4 operazioni</span>
      </span>
      <span class="rg-list-row__meta">
        <span>Ricamo</span>
        <span>densità 4.2 pt/mm · altezza 2.0 mm</span>
      </span>
    </a>
  </li>
</ul>
```

- Il chevron è generato dal DS (`::after`): **non** aggiungere una freccia, un `›` o un'icona nel
  markup, come per il `+`/`−` della disclosure.
- La variante vale su `<a>` e su `<button>` (navigazione via JS): il reset del chrome nativo del
  bottone è nel DS e non va riscritto in locale. Non applicarla a un `<li>` inerte: senza elemento
  focusabile la riga non è raggiungibile da tastiera.
- Il `<li>` resta nudo e il link sta dentro: così la lista conserva la semantica e il target
  copre esattamente la riga.

## Uso e limiti

- **Una riga-link non contiene altri controlli interattivi**: niente `__actions`, niente bottoni,
  niente checkbox (annidare un controllo dentro un `<a>` è markup invalido e rompe la tastiera).
  Se servono azioni per riga, tieni la riga inerte e metti in `__actions` un
  `rg-button rg-button--small` "Apri" accanto alle altre.
- Badge e conteggi vanno in `__head` accanto al titolo, non in `__actions`: `__actions` è
  riservato ai controlli, non alle etichette di sola lettura.
- Per record confrontabili colonna per colonna serve `rg-table`; per un contenitore-sezione di
  una dashboard serve `rg-folder`. `rg-list-row--link` è per i **record** di un elenco.
- Elenco vuoto: `rg-empty` con testo esplicito, mai una lista senza righe.

## Regole

- Stato selezionato con bordo nero + filetto sinistro nero, mai solo colore; resta distinguibile
  dall'hover della riga navigabile, che agisce su sfondo, chevron e sottolineatura del titolo.
- `rg-list-row--danger` per righe in stato irrisolto: filetto sinistro `danger`.
- Ogni `rg-icon-button` richiede `aria-label`; le icone geometriche accompagnano un'azione non
  universale.
- Titolo in font identitario, metadati e quantità in mono con cifre tabulari; i valori tecnici
  portano l'unità accanto al numero.
- Target interattivo compatto 34×34 per le azioni inline; la riga navigabile ha altezza minima
  40 px, che è il target pieno.
