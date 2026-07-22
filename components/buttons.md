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
variante di `rg-button`.

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

