# Action group (gruppo di azioni, menu, azioni in riga)

## Scopo

Mettere in fila azioni **affini** senza farne una fila di parole uguali. Il caso reale è la testata
del prodotto: nove bottoni testuali della stessa forma e dello stesso peso (Modifica · Scheda ·
Etichette · Schede di reparto · Nuovo proto · Copia parti · Costi · Elimina). L'occhio non trova
quello che cerca, e «Elimina» sta a un bottone di distanza da «Costi».

## Varianti

| Classe | Ruolo |
| --- | --- |
| `rg-action-group` | fila di azioni affini, `role="group"` + `aria-label` |
| `rg-action-group + rg-action-group` | secondo gruppo: filetto e spazio doppio; è dove sta l'azione distruttiva |
| `rg-icon-button--full` | bottone a sola icona da 40×40, la forma dei gruppi e delle righe |
| `rg-action-menu` + `__trigger`, `__list`, `__item` | menu «Altre azioni» su `<details>`, solo azioni secondarie |
| `rg-table__actions` | la cella delle azioni di una riga di tabella |

## Uso e limiti

- **Un gruppo è di azioni affini** e di pari peso: le azioni sul documento (Modifica, Scheda,
  Etichette, Costi). L'azione primaria non entra in un gruppo di icone: resta icona + testo.
- **L'azione distruttiva sta in un gruppo suo**, l'ultimo, separato dal filetto (§2 delle regole).
  In testata ha il testo («Elimina»); in una riga di tabella può essere a sola icona, perché si
  ripete e porta sempre una conferma.
- **Menu «Altre azioni» solo per azioni secondarie e non distruttive**, di uso raro: Nuovo proto,
  Copia parti. Non ci vanno l'azione primaria, un'eliminazione o qualunque azione senza la quale la
  pagina non si usa (regola della disclosure: nessuna azione critica nascosta). Il trigger ha sempre
  icona + testo; le voci hanno icona + testo. Al massimo sei voci: oltre, le azioni non sono
  secondarie.
- **Azioni ripetute in riga**: a sola icona con suggerimento, in `rg-table__actions`, nell'ordine
  apri → modifica → … → elimina (ultima, in un gruppo suo). Il nome della riga resta un link al
  dettaglio, così l'«apri» a icona non è l'unica via.
- **Distanza dai bordi** (design-rules §5): la cella ha 12 px, la barra 16, il pannello del menu 16
  ai lati delle voci. Le voci del menu non hanno fondo di hover, perché arriverebbe al bordo del
  pannello: l'hover sottolinea.
- Tastiera: i bottoni restano nella sequenza di Tab nativa, nessun *roving tabindex*. Il menu è una
  **disclosure** (`<details>`), non un `role="menu"`: si apre con Invio o Spazio, le voci si
  raggiungono con Tab. Il controller di riferimento chiude il menu con Escape e al click fuori.

## Struttura

Testata del prodotto: quattro azioni a icona, una con testo, due nel menu, l'eliminazione a parte.

```html
<div class="rg-page-header__actions">
  <div class="rg-action-group" role="group" aria-label="Azioni sul prodotto">
    <span class="rg-tooltip">
      <button class="rg-icon-button rg-icon-button--full" type="button" aria-labelledby="tip-modifica">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>
      </button>
      <span class="rg-tooltip__text" role="tooltip" id="tip-modifica">Modifica</span>
    </span>
    <span class="rg-tooltip">
      <a class="rg-icon-button rg-icon-button--full" href="/products/12/sheet" aria-labelledby="tip-scheda">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>
      </a>
      <span class="rg-tooltip__text" role="tooltip" id="tip-scheda">Scheda</span>
    </span>
    <span class="rg-tooltip">
      <a class="rg-icon-button rg-icon-button--full" href="/products/12/etichette" target="_blank" rel="noopener" aria-labelledby="tip-etichette">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-etichetta"></use></svg>
      </a>
      <span class="rg-tooltip__text" role="tooltip" id="tip-etichette">Etichette (nuova scheda)</span>
    </span>
    <span class="rg-tooltip">
      <a class="rg-icon-button rg-icon-button--full" href="/products/12/costi" aria-labelledby="tip-costi">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-costo"></use></svg>
      </a>
      <span class="rg-tooltip__text" role="tooltip" id="tip-costi">Costi</span>
    </span>
  </div>
  <div class="rg-action-group">
    <a class="rg-button rg-button--secondary" href="/products/12/schede" target="_blank" rel="noopener">
      <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-fascicolo"></use></svg>
      Schede di reparto
    </a>
    <details class="rg-action-menu">
      <summary class="rg-button rg-button--ghost rg-action-menu__trigger">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-altro"></use></svg>
        Altre azioni
      </summary>
      <ul class="rg-action-menu__list">
        <li><button class="rg-action-menu__item" type="button" onclick="protoApri()">
          <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-nuova-versione"></use></svg>
          Nuovo proto</button></li>
        <li><button class="rg-action-menu__item" type="button" onclick="copiaApri()">
          <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-copia"></use></svg>
          Copia parti</button></li>
      </ul>
    </details>
  </div>
  <div class="rg-action-group">
    <button class="rg-button rg-button--ghost rg-button--danger" type="submit">
      <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg>
      Elimina
    </button>
  </div>
</div>
```

Riga delle parti (una per parte, `id` del record negli id dei suggerimenti):

```html
<td class="rg-table__actions">
  <div class="rg-action-group" role="group" aria-label="Azioni su DAVANTI">
    <span class="rg-tooltip">
      <a class="rg-icon-button rg-icon-button--full" href="/products/12/parts/3" aria-labelledby="tip-apri-3">
        <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-apri"></use></svg>
      </a>
      <span class="rg-tooltip__text" role="tooltip" id="tip-apri-3">Apri DAVANTI</span>
    </span>
  </div>
  <div class="rg-action-group">
    <form class="rg-u-inline" method="post" action="/products/12/parts/3/delete" data-conferma="Si elimina DAVANTI con le sue fasi.">
      <span class="rg-tooltip rg-tooltip--end">
        <button class="rg-icon-button rg-icon-button--full rg-icon-button--danger" type="submit" aria-labelledby="tip-elimina-3">
          <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg>
        </button>
        <span class="rg-tooltip__text" role="tooltip" id="tip-elimina-3">Elimina DAVANTI</span>
      </span>
    </form>
  </div>
</td>
```

Il nome nel suggerimento di riga porta il **nome del record** («Apri DAVANTI»): letti in fila da uno
screen reader, venti «Apri» uguali non dicono quale riga si apre.

Controller di riferimento del menu, facoltativo (senza JS il `<details>` si apre e chiude comunque):

```js
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.rg-action-menu[open]').forEach(m => { m.open = false; m.querySelector('summary').focus(); });
});
document.addEventListener('click', e => {
  document.querySelectorAll('.rg-action-menu[open]').forEach(m => { if (!m.contains(e.target)) m.open = false; });
});
```
