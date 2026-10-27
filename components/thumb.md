# Thumb — la miniatura di un record (1.51.0)

> «La foto del prodotto all'inizio della riga, negli elenchi.» — Lorenzo, 2026-10-26

## Scopo

L'immagine che dice **quale record è la riga**: la foto del prodotto in testa a una riga di
tabella o di elenco, alla misura della riga. A 64 px non si legge niente: si **riconosce**. Per
leggere c'è il [lightbox](lightbox.md), che la miniatura apre.

Prima della 1.51.0 il DS dava l'aspetto del bottone che apre l'ingrandimento
(`rg-lightbox__thumb`) ma nessuna misura e nessuna cella: «la larghezza della miniatura la decide
il contesto». Ogni elenco la decideva da sé, e una regola generale del DS (`img { max-width: 100% }`)
in una cella stretta la faceva sparire.

## Varianti

| Classe | Cosa |
| --- | --- |
| `rg-thumb` | **Miniatura**, 64 × 64 px (`--rg-space-16`), quadrata, ritagliata (`object-fit: cover`), radius 2 px. Su un `<img>`. |
| `rg-thumb--compact` | **48 × 48** (`--rg-space-12`): per le liste e le righe dense. Dentro `rg-table--compact` la miniatura è già a 48 senza la classe. |
| `rg-thumb--empty` | **Segnaposto** quando il record non ha immagine: uno `<span>` invisibile largo quanto la miniatura (alto zero), così la colonna resta della stessa larghezza. Si combina con `--compact`. |
| `rg-thumb--drawing` | **Disegno, non foto**: il disegno del ricamo estratto dalla scheda tecnica. Intero (non ritagliato) su un passe-partout bianco, con un filetto nero sottile rientrato dal bordo. Vedi [Foto o disegno](#foto-o-disegno). |

La cella di tabella che la ospita è [`rg-table__thumb`](tables.md#miniatura-in-testa-alla-riga-rg-table__thumb-1510).

## Uso e limiti

- **In testa alla riga**, una sola per riga. È l'identità del record, non un contenuto: se la riga
  ha più immagini da confrontare, il componente è una galleria, non questo.
- **Cliccabile = dentro `button.rg-lightbox__thumb`**, con `aria-label` che nomina il record
  («Ingrandisci la foto di 0432 BOOK TOTE»). L'`<img>` dentro il bottone ha `alt=""`: il nome lo dà il
  bottone, ripeterlo farebbe leggere due volte la stessa cosa. Il bottone le dà il fondo neutro (che
  si vede mentre l'immagine carica) e il filetto, nero al passaggio; il focus è quello globale.
- **Nuda**, senza bottone, dove la riga è già un link e un bottone non ci può stare dentro (una
  `rg-list-row--link`): in quel caso la miniatura sta **fuori** dal link, oppure dentro con
  `alt=""` se il link nomina già il record.
- **Senza immagine**: `<span class="rg-thumb rg-thumb--empty" aria-hidden="true">`. Invisibile per
  scelta: in un elenco in cui metà dei record non ha foto, un riquadro vuoto ripetuto è rumore, e
  l'assenza si legge già da sola (la colonna è intitolata). Se in quel contesto l'assenza è un
  **dato** (una foto che *dovrebbe* esserci), va detta a parole in un'altra colonna, non con un
  riquadro.
- **La riga non si alza per il segnaposto**: il segnaposto tiene la larghezza, non l'altezza. Le
  righe con la foto sono alte 83 px (il bottone, 66, più 8 sopra e 8 sotto e il filetto della riga; 67 in `--compact`), quelle senza tornano
  all'altezza del testo.
- **Misura del segnaposto**: è quella dell'immagine (64 / 48). Dentro un `rg-lightbox__thumb` la
  miniatura misura 2 px in più (il filetto del bottone): la differenza conta solo in una colonna
  in cui **nessuna** riga ha la foto, e lì non c'è niente da allineare.
- **Ritagliata, e lo è per scelta**: una foto di prodotto a 64 px quadrati si riconosce anche
  tagliata ai lati; lasciata intera e rimpicciolita no. Il disegno è l'eccezione, sotto.
- **Stati**: caricamento = fondo neutro del bottone (`loading="lazy"` consigliato in un elenco);
  immagine che non arriva = il riquadro del bottone resta vuoto, con `alt=""` nessun testo di
  ripiego. Hover e focus sono del bottone.

### Foto o disegno

Nella stessa colonna possono stare due cose diverse: la **foto** del prodotto e, se la foto non
c'è, il **disegno del ricamo** estratto dalla scheda tecnica. Non vanno confuse: una foto dice com'è
venuto il pezzo, un disegno com'era previsto.

`rg-thumb--drawing` le separa con **due segni di forma, nessun colore**:

1. **Intero e non ritagliato** (`object-fit: contain`) su un **passe-partout bianco** di 4 px: la
   foto arriva al bordo, il disegno no. Un disegno ritagliato perde proprio i contorni, che sono la
   sua informazione.
2. **Un filetto nero sottile rientrato** di 2 px dal bordo, come il riquadro di un foglio tecnico.
   È lo stesso idioma dell'immagine ingrandita (`rg-lightbox__image`: bianco e filetto nero), cioè
   «documento», e regge la fotocopia e la scala di grigi.

**Perché non tratteggiato.** Era la prima idea, ed è scartata: nel DS il tratteggio dice già *manca*,
*provvisorio* o *da tagliare* (`rg-badge--archived`, il reparto da assegnare, `rg-cutout`). Un disegno
tratteggiato verrebbe letto «foto mancante», che è vero a metà e dice la cosa sbagliata.

**Le parole restano il segno portante per chi non vede**: il bottone dice «Ingrandisci **il disegno
del ricamo** di …» e non «la foto»; se la colonna mescola foto e disegni l'intestazione è «Immagine»
e non «Foto». Il colore non entra: un fondo colorato su un disegno sarebbe la stagionale usata come
stato.

## Struttura

Foto che apre l'ingrandimento:

```html
<button class="rg-lightbox__thumb" type="button" data-foto="/products/12/immagine"
        aria-label="Ingrandisci la foto di 0432 BOOK TOTE">
  <img class="rg-thumb" src="/products/12/miniatura" alt="" loading="lazy">
</button>
```

Disegno del ricamo al posto della foto:

```html
<button class="rg-lightbox__thumb" type="button" data-foto="/products/14/disegno"
        aria-label="Ingrandisci il disegno del ricamo di 0434 OBLIQUE">
  <img class="rg-thumb rg-thumb--drawing" src="/products/14/disegno-miniatura" alt="" loading="lazy">
</button>
```

Nessuna immagine (compatta, in una lista):

```html
<span class="rg-thumb rg-thumb--empty rg-thumb--compact" aria-hidden="true"></span>
```

In tabella, con la cella `rg-table__thumb`, le righe con e senza foto, la riga espandibile e la
mini-tabella compatta: vedi [tables](tables.md#miniatura-in-testa-alla-riga-rg-table__thumb-1510).
