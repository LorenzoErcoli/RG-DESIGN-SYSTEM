# I riquadri sulla pagina (`rg-hotspots`) — proposta 1.57.0

> Sulla scheda macchina si sceglie lo stop col dito sul disegno, e a destra si compila. — RG Product
> Suite, «Compila col PDF», 2026-11-18

## Scopo

Una **pagina di documento come immagine** (il PNG di una pagina della scheda macchina), a tutta
larghezza della colonna, con sopra **N riquadri cliccabili**, uno per stop (o per ago), posizionati in
percentuale. Si scelgono uno o più riquadri; quello **aperto** è quello che il modulo accanto mostra.
Vive di solito in `rg-review-split__pages` ([review-split](review-split.md)). **Senza pan/zoom.**

È un **listbox a scelta multipla**: il gruppo intero è `role="listbox" aria-multiselectable="true"`,
ogni pagina è un `role="group"`, ogni riquadro un `role="option"` focalizzabile. Lo stato sta negli
**attributi**, non nelle classi: il JavaScript della pagina cambia attributi e il DS disegna.

## Varianti

Nessun modificatore di classe. Stati del **riquadro** (`rg-hotspots__spot`):

| Attributo | Significato | Segno (mai il solo colore) |
| --- | --- | --- |
| *(nessuno)* | normale | filetto nero sopra un filetto bianco, alone bianco fuori: si vede su un disegno nero e su uno bianco |
| `:hover` | sotto il puntatore | contorno a 2 px + leggera tinta (nero all'8%) |
| `:focus-visible` | fuoco da tastiera | anello `--rg-color-focus` a 2 px staccato di 4, con bianco sotto e intorno |
| `aria-selected="true"` | scelto | contorno nero a 3 px + **etichetta piena** (nero, testo bianco) |
| `data-aperto` | quello aperto a destra, fra gli scelti | in più un **secondo contorno** sottile staccato e un **triangolo** nell'etichetta, che punta verso il modulo |
| `data-stato="compilato"` | ha i suoi valori | **segno di conferma** nell'etichetta (il tracciato di `rg-icon-conferma`) |
| `data-stato="vuoto"` | senza valori | **contorno tratteggiato** (bianco fra i trattini: si legge anche su un nero pieno) |
| `data-stato="incollato"` | valori presi da un altro stop, da rivedere | **cerchietto vuoto** nell'etichetta, la «bozza» di `rg-badge--draft` |

`aria-selected` e `data-stato` si combinano: un vuoto scelto è tratteggiato a 3 px con l'etichetta
piena. `data-aperto` va su **un solo** riquadro, e si **toglie** (non si mette a `false`).

Stati della **pagina** (`rg-hotspots__page`):

| Attributo | Si vede | Note |
| --- | --- | --- |
| *(nessuno)* | l'immagine e i riquadri | |
| `data-stato="preparazione"` | `__wait` al centro, col cerchio che gira | immagine e riquadri nascosti; la scatola resta della sua misura |
| `data-stato="errore"` | `__error` (dentro, un `rg-alert--error`) | immagine e riquadri nascosti; la scatola resta della sua misura |

| Elemento | Su | Ruolo |
| --- | --- | --- |
| `rg-hotspots` | `role="listbox" aria-multiselectable="true" aria-label` | tutte le pagine; 24 px fra una e l'altra |
| `rg-hotspots__page` | `<div style="--ratio: L / A">` | una pagina, col suo rapporto |
| `rg-hotspots__image` | `<img alt="" width height>` | il PNG, a tutta scatola |
| `rg-hotspots__wait` | `<p aria-hidden="true">` | «Sto preparando la pagina 2» |
| `rg-hotspots__error` | `<div aria-hidden="true">` con un `rg-alert--error` | che cosa non è riuscito e che cosa fare |
| `rg-hotspots__layer` | `role="group" aria-label="Pagina N"` | lo strato dei riquadri, grande quanto la pagina |
| `rg-hotspots__spot` | `<div role="option" aria-selected tabindex aria-label style="--x;--y;--w;--h">` | un riquadro |
| `rg-hotspots__label` | `<span aria-hidden="true">` | l'etichetta col numero dello stop |

## Uso e limiti

**Il rapporto prima dell'immagine.** La pagina ha `aspect-ratio: var(--ratio)`, passato dal server
(`style="--ratio: 1240 / 1754"`; senza, A4 verticale). Immagine e riquadri sono assoluti nella stessa
scatola: quando il PNG arriva **niente si sposta**. Il contorno della pagina è un `outline`, non un
bordo: un bordo entrerebbe nella scatola e sposterebbe i riquadri di un filetto. L'immagine è stirata
sulla scatola (niente `object-fit`): se il PNG avesse un rapporto diverso da `--ratio`, i riquadri
resterebbero comunque sul disegno, perché le percentuali sono della stessa scatola.

**La posizione: `--x`, `--y`, `--w`, `--h` in percentuale della pagina**, dal server, nell'attributo
`style` del riquadro (`style="--x:12.5%;--y:8%;--w:20%;--h:6%"`). È l'eccezione «posizione su un
disegno» (R41 della piattaforma): una coordinata, non uno stile. Le unità sono **obbligatorie**
(`12.5%`, non `12.5`).

**L'etichetta** è mono a 12 px con cifre tabulari, e sta **fuori** dal riquadro, appoggiata sul filo di
sopra: il disegno dello stop non è mai coperto. Sta sull'**angolo sinistro** se il centro del riquadro
è nella metà sinistra della pagina, sull'**angolo destro** se è nella metà destra, così non esce mai
dalla pagina; lo decide il CSS da `--x` e `--w` (con `round()`; dove manca resta a sinistra). In cima
alla pagina finisce nei 24 px di respiro fra le pagine. Il testo è breve: «3», «Stop 3», «Stop 3 · ago 2».
È `aria-hidden`: il nome accessibile del riquadro lo dà `aria-label`.

**Il nome accessibile dice anche lo stato**, perché tratteggi e icone non si sentono:
`aria-label="Stop 3, ago 2, incollato, aperto"`. «Scelto» lo dice già `aria-selected`.

**Area minima 24 × 24** anche se il riquadro è più piccolo: un `::before` trasparente centrato che
cresce solo quando serve. È il minimo WCAG 2.5.8, non i 40 del DS (§11): un riquadro è una posizione
sul disegno, e ingrandirlo mentirebbe sull'area. **Eccezione dichiarata** (§12): ambito, i riquadri su
un disegno; percorso alternativo, il modulo accanto e la tastiera.

**Sopra gli altri se si sovrappongono:** scelto, poi aperto, poi sotto il puntatore, poi col fuoco. La
pagina è `isolation: isolate`: i gradini restano locali.

**Tastiera e tabindex sono della pagina.** Il DS non ha un controller: il riquadro col fuoco ha
`tabindex="0"`, tutti gli altri `-1` (tabindex mobile), e la pagina gestisce le frecce. Il modello
consigliato (quello del controller di riferimento in `examples/rg-review-split.html`): frecce = sposta
il fuoco; Spazio = aggiunge/toglie dalla scelta; Invio = sceglie e apre; Home/Fine; clic = sceglie solo
quello e lo apre; Ctrl/Cmd+clic = aggiunge/toglie. I riquadri delle pagine in preparazione o in errore
sono nascosti (`visibility: hidden`) e non prendono il fuoco: il controller li salta.

**Lo stato si annuncia fuori dal listbox.** Dentro un `listbox` stanno solo gruppi e opzioni: per
questo `__wait` ed `__error` sono `aria-hidden` (si vedono soltanto) e la pagina scrive lo stesso fatto
nello stato della testa ferma (`rg-review-split__status`, `role="status"`): «Pagina 2 in
preparazione», «La pagina 3 non si è preparata». Lo stesso per i cambi di scelta.

**Il colore non cambia mai**: tutto è nero e bianco, perché sotto c'è un disegno qualsiasi. Gli stati si
leggono da spessore, tratteggio, secondo contorno, etichetta piena e figure. L'alone bianco è una
`box-shadow` **senza sfocatura**: una linea, non un'ombra.

**`forced-colors`**: riquadri ed etichette restano in nero e bianco (`forced-color-adjust: none`),
perché stanno sopra un'immagine che il sistema non ricolora: contro un'immagine qualsiasi il nero col
bianco è il contrasto massimo, mentre i colori di sistema potrebbero confondersi col disegno.

**In stampa** lo strato dei riquadri non esiste: si stampa il documento, non la scelta.

**Non è un visore.** Niente zoom, niente pan: la pagina è larga quanto la colonna. Se un riquadro è
troppo piccolo per essere letto, la soluzione è allargare la colonna, non ingrandire il disegno.

## Misure

Chrome headless, `examples/rg-review-split.html`:

| Cosa | Misura |
| --- | --- |
| riquadro di 4,8 × 4,9 px (stop 5) | si prende fino a ±11 px dal centro, a 14 no: 24 × 24 |
| etichetta | alta 18 px, 12 px di corpo; sempre dentro la pagina (minimo 36 px dal bordo destro) |
| pagine | 24 px fra l'una e l'altra; l'etichetta di un riquadro in cima alla pagina ci sta |

## Struttura

```html
<div class="rg-hotspots" role="listbox" aria-multiselectable="true" aria-label="Stop della scheda macchina">

  <div class="rg-hotspots__page" style="--ratio: 1240 / 1754">
    <img class="rg-hotspots__image" src="…/pagina-1.png" alt="" width="1240" height="1754">
    <div class="rg-hotspots__layer" role="group" aria-label="Pagina 1">
      <div class="rg-hotspots__spot" role="option" tabindex="0" aria-selected="true" data-stato="compilato"
           aria-label="Stop 1, ago 2, compilato" style="--x:11.3%;--y:13.7%;--w:38.7%;--h:11.4%">
        <span class="rg-hotspots__label" aria-hidden="true">Stop 1 · ago 2</span>
      </div>
      <div class="rg-hotspots__spot" role="option" tabindex="-1" aria-selected="true" data-aperto data-stato="incollato"
           aria-label="Stop 3, ago 2, incollato, aperto" style="--x:44.35%;--y:19.95%;--w:11.29%;--h:7.98%">
        <span class="rg-hotspots__label" aria-hidden="true">Stop 3 · ago 2</span>
      </div>
      <div class="rg-hotspots__spot" role="option" tabindex="-1" aria-selected="false" data-stato="vuoto"
           aria-label="Stop 2, ago 5, vuoto" style="--x:11.29%;--y:31.93%;--w:24.19%;--h:12.54%">
        <span class="rg-hotspots__label" aria-hidden="true">Stop 2 · ago 5</span>
      </div>
    </div>
  </div>

  <div class="rg-hotspots__page" style="--ratio: 1240 / 1754" data-stato="preparazione">
    <p class="rg-hotspots__wait" aria-hidden="true">Sto preparando la pagina 2</p>
    <div class="rg-hotspots__layer" role="group" aria-label="Pagina 2"></div>
  </div>

  <div class="rg-hotspots__page" style="--ratio: 1240 / 1754" data-stato="errore">
    <div class="rg-hotspots__error" aria-hidden="true">
      <div class="rg-alert rg-alert--error"><div>
        <p class="rg-alert__title">La pagina 3 non si è preparata</p>
        <p class="rg-alert__message">Ricarica la pagina; se si ripete, avvisa l’amministratore.</p>
      </div></div>
    </div>
    <div class="rg-hotspots__layer" role="group" aria-label="Pagina 3"></div>
  </div>

</div>
```

Il controller minimo: solo attributi.

```js
// scegli solo questo e aprilo
box.querySelectorAll('[role="option"]').forEach(o => o.setAttribute('aria-selected', String(o === spot)));
box.querySelectorAll('[data-aperto]').forEach(o => o.removeAttribute('data-aperto'));
spot.setAttribute('data-aperto', '');
// lo stato del riquadro dopo il salvataggio
spot.dataset.stato = 'compilato';
// la pagina pronta
pagina.removeAttribute('data-stato');
```
