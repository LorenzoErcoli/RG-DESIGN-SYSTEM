# File card (documento caricato)

## Scopo

Un oggetto **generico e riusabile** per il fatto «questa entità ha un file caricato»: un allegato,
un documento, una sorgente. Non è legato a un dominio (scheda macchina, compilatore, parte): il DS
fornisce contenitori, posizioni e stile, l'app riempie gli slot. Nasce per eliminare il documento
fatto a mano che accumulava i difetti classici — **doppio titolo, un paragrafo esplicativo di
troppo, controlli d'upload sciolti** che galleggiavano prima ancora che ci fosse un file.

Ha **due stati** e una **rivelazione progressiva**.

## Varianti

| Variante | Quando |
| --- | --- |
| `rg-file-card--loaded` | **CARICATO**: card compatta con un solo titolo = il nome del file, uno slot badge e uno slot azioni. |
| `rg-file-card--empty` | **VUOTO**: la superficie aperta di `rg-empty` con una sola azione primaria. |

Non è una variante di `rg-file-input`, di `rg-card` né di `rg-empty`: nessuno di quelli modella
«stato caricato/vuoto + rivelazione dopo la scelta». È un componente a sé che **compone** il picker
di `rg-file-input`, la superficie di `rg-empty`, il conteggio/stato di `rg-badge` e le azioni di
`rg-button`.

## Uso e limiti

**Un solo titolo.** Nello stato caricato il titolo è il **nome del file** (`rg-file-card__title`),
in mono, troncato con ellissi se lungo ma **leggibile per intero**: il testo completo resta nel nodo
(lo leggono i lettori di schermo) e si ripete in `title` per il puntatore. Nessun secondo titolo,
nessun paragrafo esplicativo: la provenienza è il nome, non una frase. Se serve dichiarare misura o
metodo di un file (una tool di import), quello è `rg-file-input` con la sua riga `__status`, non
questa card.

**Il picker non si rifà.** L'azione «Carica un altro» / «Carica un PDF» apre il selettore file con
il **meccanismo di `rg-file-input`**: `rg-file-input__control`, la `<label>` che copre un
`<input type="file">` a opacità zero (presente, focusabile, tabulabile) col bottone che lo veste.
Qui si prende **solo il `__control`**, non `__status`: quella riga sarebbe il paragrafo da
eliminare. Dentro la card il bottone del picker torna a **larghezza automatica** (in `rg-file-input`
è a piena larghezza perché lì è il bersaglio unico del pannello; qui è un'azione fra le altre).

**Gli slot sono dell'app.** Il DS non hardcoda i contenuti: `rg-file-card__badges`,
`rg-file-card__actions`, `rg-file-card__options` e `rg-file-card__confirm` sono **posizioni** che
l'app riempie. Esempi come «letta», «Apri/Ripristina/Carica un altro» o una percentuale di lettura
sono contenuti applicativi, non fanno parte del componente.

**Rivelazione progressiva (il cuore).** La zona «opzioni di lettura» (`rg-file-card__options`) e la
conferma (`rg-file-card__confirm`) vivono dentro `rg-file-card__reveal`, che **parte con `hidden`**.
Prima della scelta di un file quei controlli **non si vedono e non esistono per l'accessibilità**:
niente controlli che galleggiano. `[hidden]` è la fonte di verità (stato non nativo, pilotato
dall'app come `aria-expanded` altrove) e il CSS lo fa vincere sul `display` del contenitore, così la
zona è nascosta **davvero**, non solo alla vista.

### Contratto JS minimo

L'app osserva il `change` dell'`<input type="file">` del picker:

- **file scelto** → scrive il nome nel titolo (`rg-file-card__title`, e in `title`/testo completo) e
  rivela la zona: `reveal.hidden = false`;
- **conferma o Ripristina** → richiude: `reveal.hidden = true`.

Il DS non impone una libreria: cambia un attributo e riempie due nodi di testo. Nessuna classe di
stato locale, nessun secondo indicatore.

## Struttura

Stato **VUOTO** — una sola azione primaria:

```html
<article class="rg-file-card rg-file-card--empty">
  <div class="rg-empty rg-file-card__empty">
    <p>Nessun documento caricato.</p>
    <label class="rg-file-input__control">
      <input type="file" accept="application/pdf">
      <span class="rg-button rg-button--primary">Carica un PDF</span>
    </label>
  </div>
  <div class="rg-file-card__reveal" hidden>
    <div class="rg-file-card__options"><!-- slot app: opzioni di lettura --></div>
    <div class="rg-file-card__confirm"><!-- slot app: Conferma --></div>
  </div>
</article>
```

Stato **CARICATO** — un solo titolo + slot badge + slot azioni:

```html
<article class="rg-file-card rg-file-card--loaded">
  <div class="rg-file-card__row">
    <h3 class="rg-file-card__title" title="verbale-lettura-2026-07.pdf">verbale-lettura-2026-07.pdf</h3>
    <div class="rg-file-card__badges">
      <span class="rg-badge rg-badge--parsed">letta</span>
    </div>
    <div class="rg-file-card__actions">
      <a class="rg-button rg-button--ghost" href="/doc/42">Apri</a>
      <button class="rg-button rg-button--ghost" type="button">Ripristina</button>
      <label class="rg-file-input__control">
        <input type="file" accept="application/pdf">
        <span class="rg-button rg-button--outline">Carica un altro…</span>
      </label>
    </div>
  </div>
  <div class="rg-file-card__reveal" hidden>
    <div class="rg-file-card__options"><!-- slot app: opzioni di lettura --></div>
    <div class="rg-file-card__confirm">
      <button class="rg-button rg-button--primary" type="button">Conferma</button>
    </div>
  </div>
</article>
```

Stato **file scelto** — l'app ha tolto `hidden` dopo il `change`, opzioni e conferma sono rivelate:

```html
<div class="rg-file-card__reveal">
  <div class="rg-file-card__options"><!-- slot app: i controlli di lettura --></div>
  <div class="rg-file-card__confirm">
    <button class="rg-button rg-button--primary" type="button">Conferma</button>
  </div>
</div>
```
