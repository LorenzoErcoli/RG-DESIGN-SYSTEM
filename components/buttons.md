# Buttons

## Scopo

Avviare un'azione esplicita. La label usa un verbo breve e descrive il risultato.

## Varianti

- **Primary** (`rg-button--primary`): fondo nero, testo bianco; una sola azione dominante per area.
- **Secondary** (`rg-button--secondary`): fondo bianco, bordo nero; azione alternativa.
- **Ghost** (`rg-button--ghost`): testo nero senza contenitore, sottolineato all'hover; azione a bassa enfasi.
- **Outline** (`rg-button--outline`): bordo tenue neutro; azione secondaria in contesti densi.
- **Danger** (`rg-button--danger`): bordo/testo danger; fondo pieno solo nella conferma finale.
- **Dimensioni** (`rg-button--small`, `rg-button--large`): per densità diverse.

Per un'azione con la sola icona usa il componente `rg-icon-button` (vedi `lists.md`), non una
variante di `rg-button`. Fuori dalle liste dense la forma è `rg-icon-button--full` (40×40, v1.17.0),
sempre con un [suggerimento](tooltip.md) che ne è il nome.

## Icona, testo o entrambi

Dalla 1.17.0 il DS ha un [set di icone](icons.md). Regola:

| Forma | Quando | Esempi |
| --- | --- | --- |
| **Sola icona** + suggerimento | azioni **frequenti** e di pari peso raccolte in un [gruppo](action-group.md); azioni **ripetute su ogni riga** di una tabella o di un elenco; azioni **universali** | Modifica, Scheda, Etichette, Costi nella testata; Apri ed Elimina in riga; Chiudi di una modale |
| **Icona + testo** | l'azione **primaria** (una per area); azioni **rare**, **ambigue** o **con conseguenze**; il trigger di un menu; l'azione distruttiva in testata | + Nuovo prodotto, Schede di reparto, Ricarica e rileggi, Altre azioni, Elimina |
| **Solo testo** | i bottoni di un **form** e di una **conferma**; azioni per cui il set non ha un'icona univoca; i link nel testo | Salva i valori, Annulla, Elimina il proto |

- Nel dubbio fra sola icona e icona + testo: **icona + testo**. Un'icona che va spiegata non fa
  risparmiare spazio, lo fa perdere.
- Due icone quasi uguali nello stesso gruppo (Scheda e Schede di reparto) rendono **ambigua** la
  seconda: la seconda prende il testo.
- **Mai un carattere o un'emoji** al posto di un'icona (✎ 🔗 ⟳ ↓ ← → ✕ ✓ ⚑ ⚠ ⓘ): la tabella delle
  sostituzioni è in [icons](icons.md#nomi-disponibili).
- **Una sola primaria** per area, sempre con testo.

```html
<a class="rg-button rg-button--primary" href="/products/new">
  <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>
  Nuovo prodotto
</a>
```

L'icona sta **prima** del testo; dopo il testo solo per le frecce di direzione («Succ» + `avanti`).
Lo spazio fra icona e testo è il gap del bottone (8 px), e l'allineamento ottico sta già nella tavola
dell'icona: niente margini locali.

## Uso e limiti

Usare per comandi, non per navigazione testuale o stati. Evitare più primary affiancati, label generiche (`OK`, `Vai`) e accenti stagionali come fondo. Minimo 40 px di altezza; stato focus, disabled e loading obbligatori.

**"Non per navigazione testuale" riguarda i link nel testo corrente, non le azioni che aprono una
pagina.** Un'azione che porta altrove — *Apri scheda*, *Apri fase*, *Vai alla revisione* — è un
`<a href>` che indossa `rg-button`: deve restare un link vero (tasto centrale, apri in nuova
scheda, stato visitato, funziona senza JS). Non usare `<button onclick="location=…">`, e non
degradare un link a `<span>`: da 1.3.1 la classe azzera la sottolineatura nativa, quindi
l'aggiramento non serve più. Il criterio è l'effetto: se **cambia pagina** è `<a>`, se **cambia
stato** è `<button>`.

Dentro una riga o una fase (`rg-step__actions`) l'azione di apertura convive con gli altri
controlli perché è loro **sorella**, mai annidata: è quello che `rg-list-row--link` non poteva
fare. Lì non usare `rg-button--small`, che a 32 px sta sotto il target minimo.

## Struttura

`[icona opzionale] [label] [indicatore opzionale]`

```html
<button class="rg-button rg-button--primary" type="button">Calcola consumo</button>
<button class="rg-button rg-button--secondary" type="button">Esporta scheda</button>
<a class="rg-button rg-button--ghost" href="/parti/12/fasi/0">Apri fase</a>
```

Loading conserva la larghezza e usa `aria-busy="true"`; disabled spiega il motivo vicino al controllo quando non evidente.

