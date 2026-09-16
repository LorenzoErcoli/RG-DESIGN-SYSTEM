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
| `rg-file-card--bar` | **BARRA DELLA SCHEDA** (1.17.0): una riga sola, ripetuta identica in più sezioni della stessa pagina. Si compone con `--loaded` o con `--empty`. |

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

**Distanza dai bordi (dalla 1.17.0).** La radice `rg-file-card` è **trasparente e senza bordo**, e
per questo non ha padding: le superfici con un bordo sono le sue parti. La riga caricata ha 12 px
sopra e sotto e 16 ai lati; la zona rivelata ne ha 16; il vuoto ha il padding di `rg-empty`. Con
queste distanze nessun bottone tocca un contorno ([design-rules §5](../design-rules.md#distanza-delle-azioni-dal-bordo)).
Dare padding alla radice raddoppierebbe quella delle parti. Due indicazioni:

- **Non dare bordo o fondo alla radice** in locale: la card comparirebbe con i bottoni a filo di un
  contorno che il DS non conosce. Se serve una cornice, la card sta nel corpo **standard** di una
  `rg-section-card`.
- **Dentro un corpo `rg-section-card--flush`** la card si avvolge in `rg-section-card__inset`: il
  bordo della riga caricata non deve incollarsi al contorno della section card.

### Barra della scheda (`rg-file-card--bar`, dalla 1.17.0) — superata dalla 1.18.0

> **Superata da [`rg-document`](document.md).** Sul server vero la barra era alta 99 px su due righe
> a 1440 e a 1280 px, con sei bottoni dello stesso peso, e il compilatore, ultimo, non si trovava. La
> classe resta nel CSS e non cambia aspetto fino a una major. La migrazione è in `document.md`.

Quando **lo stesso documento serve in più sezioni** della stessa pagina — la scheda macchina di una
fase, richiamata da «Scheda macchina» e da «Sequenza stop» — la card diventa una **riga**, identica in
ogni sezione e sempre nella stessa posizione: in cima alla sezione.

Nasce da un difetto misurato: *«in Sequenza stop vedo gli stop […] e vedo solo compila scheda. Poi
dove invece le schede ci sono, la prima riga dei bottoni in scheda macchina deve essere uguale a
quella di sequenza stop»*. Due sezioni della stessa fase mostravano azioni diverse, e senza PDF una
delle due non offriva niente.

- **La riga c'è sempre**, nei due stati. Cambiano il testo e l'azione primaria, non la posizione:
  - **documento presente** (`--bar --loaded`): icona, nome del file, badge, azioni; primaria
    «Compila scheda»;
  - **documento assente** (`--bar --empty`): «Nessuna scheda su questa fase.» e primaria «Carica la
    scheda». Le azioni che non esistono **si omettono**, non si disabilitano.
- **Una sola primaria**, e sempre la stessa per stato.
- **Nella barra il nome del file non è un'intestazione** (`<p class="rg-file-card__title">`): la barra
  si ripete in più sezioni, e sarebbe un titolo ripetuto.
- **Icona + testo** su ogni azione ([icons](icons.md)). L'ordine è fisso: leggere → portare via →
  cambiare → compilare.
- **Le azioni distruttive non stanno nella barra**: «Torna alla prima lettura» perde le modifiche, e va
  nel piede del blocco della fase, con le altre azioni sulla fase.
- **La rivelazione progressiva resta**: scelto un file, `__reveal` mostra opzioni di lettura e
  conferma, con lo stesso contratto JS.
- Dove il documento è il **soggetto unico** di una vista (una scheda, un'entità con un allegato) resta
  la card piena: `--loaded` / `--empty` senza `--bar`.

```html
<article class="rg-file-card rg-file-card--bar rg-file-card--loaded">
  <div class="rg-file-card__row">
    <svg class="rg-icon rg-file-card__icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>
    <p class="rg-file-card__title" title="1296-DAV-ricamo.pdf">1296-DAV-ricamo.pdf</p>
    <div class="rg-file-card__badges"><span class="rg-badge rg-badge--parsed">letta</span></div>
    <div class="rg-file-card__actions">
      <a class="rg-button rg-button--ghost" href="…/scheda-compilata?inline=1" target="_blank" rel="noopener"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-apri-esterno"></use></svg>Visualizza scheda</a>
      <button class="rg-button rg-button--ghost" type="button" data-scarica="…/scheda-compilata"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-scarica"></use></svg>Scarica PDF</button>
      <a class="rg-button rg-button--ghost" href="…/source-pdf" target="_blank" rel="noopener"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>PDF caricato</a>
      <a class="rg-button rg-button--ghost" href="…/gruppo"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-collega"></use></svg>Parti collegate</a>
      <label class="rg-file-input__control">
        <input type="file" accept=".pdf" form="fase-upload-form">
        <span class="rg-button rg-button--outline"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-carica"></use></svg>Carica un'altra scheda…</span>
      </label>
      <a class="rg-button rg-button--primary" href="…/compila"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>Compila scheda</a>
    </div>
  </div>
  <div class="rg-file-card__reveal" hidden>
    <div class="rg-file-card__options"><!-- opzioni di lettura --></div>
    <div class="rg-file-card__confirm"><button class="rg-button rg-button--primary" type="submit" form="fase-upload-form">Ricarica e rileggi</button></div>
  </div>
</article>
```

Senza documento, stessa riga e stessa posizione:

```html
<article class="rg-file-card rg-file-card--bar rg-file-card--empty">
  <div class="rg-file-card__empty">
    <svg class="rg-icon rg-file-card__icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>
    <p>Nessuna scheda su questa fase.</p>
    <div class="rg-file-card__actions">
      <a class="rg-button rg-button--ghost" href="…/compila"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-modifica"></use></svg>Compila a mano</a>
      <label class="rg-file-input__control">
        <input type="file" accept=".pdf" form="fase-upload-form">
        <span class="rg-button rg-button--primary"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-carica"></use></svg>Carica la scheda</span>
      </label>
    </div>
  </div>
  <div class="rg-file-card__reveal" hidden><!-- opzioni + conferma --></div>
</article>
```

Nello stato vuoto **non** si usa `rg-empty`: la superficie aperta è la forma della card piena, non
della riga.

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
