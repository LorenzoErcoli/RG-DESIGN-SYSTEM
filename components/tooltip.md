# Tooltip (suggerimento)

## Scopo

Dare un **nome visibile** a un bottone a sola icona, quando lo si punta o lo si raggiunge da
tastiera. È il pezzo che rende ammissibile la sola icona: senza, l'icona è un indovinello.

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-tooltip` | contenitore: il bottone e il suo `__text` |
| `rg-tooltip__text` | il testo, `role="tooltip"`, con un `id` |
| `rg-tooltip--below` | sotto il bottone: prima riga di una tabella senza intestazione, barra in cima alla pagina |
| `rg-tooltip--start` / `--end` | allineato al bordo sinistro o destro del bottone: il primo o l'ultimo bottone vicino a un bordo dello schermo |

## Uso e limiti

- **Due modi, mai insieme.** Bottone a **sola icona**: il suggerimento è il suo **nome**,
  `aria-labelledby="id-del-testo"`, e il bottone non ha `aria-label`. Bottone **con testo**: il
  suggerimento è una **descrizione**, `aria-describedby`. Con tutti e due lo screen reader
  leggerebbe la stessa parola due volte.
- **Compare a hover e a focus da tastiera**, non al click col mouse. Resta visibile mentre il
  puntatore ci passa sopra, non copre il bottone e non blocca il click. Si chiude con Escape se c'è il
  controller di riferimento, sei righe qui sotto; senza JS tutto il resto funziona.
- **Solo testo, breve.** Il nome dell'azione in una-tre parole («Modifica», «Scarica PDF»). Niente
  link, bottoni o istruzioni: una spiegazione lunga va nella pagina, non nel suggerimento.
- **Non usare `title`.** Non compare da tastiera né sui touch, e il testo non si può stilizzare.
  Gli attuali `title="Etichette da stampare…"` diventano il suggerimento della sola parola
  «Etichette»; la frase va in una nota della pagina che le stampa.
- **Una nuova scheda si dichiara nel nome**: «Etichette (nuova scheda)».
- **Id unici.** In una riga di tabella l'`id` porta l'id del record: `tip-apri-{{ part.id }}`.
- Dentro `rg-table-wrap` (che taglia il contenuto che sborda) il suggerimento sopra funziona su
  tutte le righe del corpo, perché sopra c'è sempre l'intestazione. Su una tabella senza `thead`,
  prima riga con `--below`.
- Su touch non esiste l'hover: il nome resta per la lettura assistita, e le icone del set sono
  scelte per essere riconoscibili. Un'azione rara o ambigua non va a sola icona (vedi
  [buttons](buttons.md#icona-testo-o-entrambi)).

## Struttura

```html
<span class="rg-tooltip">
  <button class="rg-icon-button rg-icon-button--full" type="button" aria-labelledby="tip-modifica">
    <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>
  </button>
  <span class="rg-tooltip__text" role="tooltip" id="tip-modifica">Modifica</span>
</span>
```

Come descrizione di un bottone che ha già il testo:

```html
<span class="rg-tooltip">
  <button class="rg-button rg-button--secondary" type="button" aria-describedby="tip-proto">Nuovo proto</button>
  <span class="rg-tooltip__text" role="tooltip" id="tip-proto">Stesso articolo, versione successiva</span>
</span>
```

Controller di riferimento, facoltativo (Escape chiude il suggerimento aperto):

```js
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.rg-tooltip:hover, .rg-tooltip:focus-within').forEach(t => t.classList.add('is-dismissed'));
});
['focusout', 'mouseout'].forEach(tipo => document.addEventListener(tipo, e => {
  const t = e.target.closest && e.target.closest('.rg-tooltip');
  if (t && !t.contains(e.relatedTarget)) t.classList.remove('is-dismissed');
}));
```
