# Icons (set di icone)

## Scopo

Un solo set di icone geometriche, **servito in locale** (la piattaforma gira in intranet, niente CDN),
per sostituire i caratteri Unicode e le emoji che oggi fanno da icona nel testo dei bottoni
(🔗 ✎ ⟳ ↓ ← → ✕ ✓ ⚑ ⚠ ⓘ). Un carattere cambia disegno a ogni font e a ogni sistema operativo, e le
emoji portano un colore proprio: nessuno dei due regge le regole del DS.

Il set è **disegno proprio RG** (v1.17.0) e non contiene codice di terzi: nessuna licenza esterna.
Le regole di disegno sono in [`icons/README.md`](../icons/README.md).

## Varianti

| Classe | Misura | Tratto reale | Quando |
| --- | --- | --- | --- |
| `rg-icon` | 16 px | 1 px | dentro un bottone col testo (14 px), in una voce di menu |
| `rg-icon--md` | 20 px | 1,25 px | bottone a sola icona (`rg-icon-button--full`), testo a 16 px |
| `rg-icon--lg` | 24 px | 1,5 px | stato vuoto, vetrina |

Dentro `rg-icon-button--full` e `rg-button--large` l'icona prende da sola i 20 px.

## Nomi disponibili

Il nome è l'**azione**, non la figura.

| Nome | Figura | Per (bottoni di oggi nella piattaforma) | Sostituisce |
| --- | --- | --- | --- |
| `modifica` | matita | Modifica, Compila scheda | ✎ |
| `elimina` | cestino | Elimina, Elimina fase / parte / proto, Rimuovi | |
| `apri` | chevron a destra | Apri, vai al dettaglio (stessa scheda) | › |
| `apri-esterno` | riquadro con freccia | Visualizza scheda, PDF caricato (nuova scheda) | |
| `aggiungi` | più | + Aggiungi parte / fase / materiale, + Nuovo prodotto | + |
| `chiudi` | croce | Chiudi, chiusura di modale | ✕ × |
| `salva` | dischetto | Salva | |
| `indietro` / `avanti` | frecce | ← Prec / Succ → | ← → |
| `scarica` | freccia sulla base | ↓ Scarica, ↓ Scarica PDF, ↓ Esporta Excel, ↓ PDF | ↓ |
| `carica` | freccia dalla base | Carica, Carica un altro…, Carica PDF scheda macchina… | |
| `stampa` | stampante | Stampa | |
| `documento` | foglio | Scheda | |
| `fascicolo` | fogli sovrapposti | Schede di reparto | |
| `etichetta` | cartellino | Etichette | |
| `costo` | euro | Costi | |
| `collega` / `scollega` | catena / catena aperta | Parti collegate, Collega, Scollega | 🔗 |
| `copia` | due riquadri | Copia parti | |
| `nuova-versione` | due riquadri con più | Nuovo proto | |
| `ruota` | freccia circolare oraria | Ruota taglio | ⟳ |
| `ricarica` | due frecce circolari | Ricarica e rileggi | |
| `ripristina` | freccia di ritorno | Torna alla prima lettura | ↺ |
| `filtro` / `togli-filtri` | imbuto / imbuto con croce | Filtra / × Rimuovi filtri, × Reset | × |
| `ordina` | frecce su e giù | Ordina | |
| `cerca` | lente | Cerca | |
| `avviso` | triangolo con punto esclamativo | avvisi, conteggi di anomalie | ⚠ |
| `errore` | cerchio con croce | errori | |
| `conferma` | spunta | conferma, completato | ✓ |
| `segnala` | bandiera | Segnala | ⚑ |
| `immagine` | cornice con monte | Scegli un'immagine…, Togli immagine | |
| `informazione` | cerchio con i | note informative | ⓘ |
| `altro` | tre punti | trigger del menu «Altre azioni» | ⋯ |

## Uso e limiti

- **Nessuna icona senza nome accessibile.** L'`<svg>` ha **sempre** `aria-hidden="true"` e
  `focusable="false"`; il nome sta sul controllo: il testo del bottone, oppure il suggerimento
  ([tooltip](tooltip.md)) collegato con `aria-labelledby`.
- **Quando sola icona, quando icona + testo, quando solo testo**: la regola è in
  [buttons](buttons.md#icona-testo-o-entrambi).
- **Il colore lo decide il contesto** (`currentColor`). Un'icona non ha un colore proprio, e non
  segnala uno stato da sola: `avviso` accanto a «3 anomalie», mai al posto del testo.
- **Niente caratteri al posto delle icone** nei bottoni. Restano ammessi i segni che il DS genera da
  sé (il `+`/`−` di disclosure e step, il chevron di `rg-list-row--link`) e il marcatore di campo
  `rg-field__mark` (€), che è un carattere di testo per scelta.
- **Servirla in locale.** Lo sprite è `icons/rg-icons.svg`. In FastAPI si aggiunge un mount accanto
  a quello degli stili (vedi [integration/fastapi.md](../integration/fastapi.md)):
  `app.mount("/ds/icons", StaticFiles(directory=DS_DIR / "icons"))`.
- `<use>` verso un file esterno funziona solo dalla **stessa origine** via http: la vetrina va aperta
  da un server (`npx serve` nella radice del DS), non con doppio clic sul file.

## Struttura

```html
<svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-scarica"></use></svg>
```

Dentro un bottone col testo:

```html
<a class="rg-button rg-button--secondary" href="/products/12/sheet.pdf">
  <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-scarica"></use></svg>
  Scarica PDF
</a>
```

Macro Jinja consigliata (vive nell'app, non nel DS):

```jinja
{% macro icona(nome, misura='') -%}
  {%- set classi = 'rg-icon rg-icon--' ~ misura if misura else 'rg-icon' -%}
  <svg class="{{ classi }}" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-{{ nome }}"></use></svg>
{%- endmacro %}
```
