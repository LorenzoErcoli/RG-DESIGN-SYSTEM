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
| `rg-hotspots__preview` | `<div aria-hidden="true">` | lo strato del testo stampato (sotto, *L'anteprima del testo stampato*) |
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

## L'anteprima del testo stampato (`__preview`) — proposta 1.57.0

> Vedere già sulla pagina il testo che la scheda compilata scriverà, mentre lo si scrive a destra.
> — Lorenzo, 2026-11-18

Uno strato **separato dai riquadri**, fra l'immagine e `__layer`: non prende clic
(`pointer-events: none`), e i riquadri coi loro stati gli restano sopra. È `aria-hidden`: lo stesso
testo sta nel modulo.

| Elemento | Su | Variabili | Ruolo |
| --- | --- | --- | --- |
| `rg-hotspots__preview` | `<div aria-hidden="true">`, fra `__image` e `__layer` | — | lo strato |
| `rg-hotspots__block` | `<div>` | `--x --y --w --h` in % della pagina, come i riquadri | il fondo **bianco pieno** che copre ciò che è stampato lì sotto (come la pulizia dell'export) |
| `rg-hotspots__line` | `<span>` dentro il blocco | `--left` (% della **larghezza** della pagina), `--base` (% dell'**altezza**: la **linea di base**, non la cima), `--size` (**numero**: corpo in % della larghezza), `--colore` (dai dati) | una riga di testo |

| Attributo sul blocco | Segno |
| --- | --- |
| *(nessuno)* | fondo bianco, testo |
| `data-stato="aggiorna"` | il testo si sta ricalcolando: righe sbiadite e un contorno puntinato grigio, discreto |
| `data-segue="…"` | non ci sta tutto: contorno **tratteggiato nero spesso** con l'alone bianco, e sotto l'angolo destro un segno mono nero col testo dell'attributo («segue in legenda»); con `data-segue=""` scrive «segue» |

**Coordinate di pagina, anche dentro il blocco.** La scatola del blocco è tutta la pagina
(`inset: 0`) e il fondo bianco è il suo `::before` nel rettangolo `--x/--y/--w/--h`: così `--left` e
`--base` delle righe sono percentuali della **pagina**, come le manda il server, e non del blocco.

**Il corpo segue l'immagine.** La pagina è un contenitore (`container-type: inline-size`) e la riga ha
`font-size: calc(var(--size) * 1cqw)`: `--size: 2.1` vuol dire 2,1% della larghezza della pagina. Per
questo `--size` è un numero senza unità, mentre `--left` e `--base` vogliono il `%`.

**La linea di base cade su `--base`.** La riga parte con la cima su `--base` e risale di
`--rg-hotspots-ascent` em (default 0,85: con `line-height: 1` su Arial, che è l'Helvetica di Windows, la
base sta a 0,846 em dalla cima). Misurato in Chrome: base a 0,6 px da quella chiesta, cioè
l'arrotondamento del pixel. Se il carattere disponibile è un altro, la pagina cambia la manopola nel
suo CSS.

**Il carattere imita il PDF**: `Helvetica, Arial, sans-serif`, peso normale, `line-height: 1`,
`white-space: pre` (gli a capo li ha già fatti il server; niente a capo del browser). È un'**eccezione
dichiarata** ai font del DS (§3): qui si mostra un documento, non l'interfaccia. Lo stesso per
`--colore`: i colori delle teste T1/T2/T3 del PDF (#111111, #0C447C, #993C1D, #3B6D11) sono **dati del
foglio**, arrivano nello `style` come le coordinate, e non sono colori del DS. Senza `--colore` il
testo è nero.

**In stampa** lo strato non c'è; in una pagina in preparazione o in errore è nascosto con l'immagine.
**forced-colors**: il testo resta nero su bianco.

```html
<div class="rg-hotspots__page" style="--ratio: 1240 / 1754">
  <img class="rg-hotspots__image" src="…" alt="" width="1240" height="1754">
  <div class="rg-hotspots__preview" aria-hidden="true">
    <div class="rg-hotspots__block" style="--x:6.45%;--y:59.86%;--w:50%;--h:2.85%">
      <span class="rg-hotspots__line" style="--left:6.45%;--base:61.57%;--size:2.1;--colore:#0C447C">3     2    MADEIRA 1147  4.120</span>
    </div>
    <div class="rg-hotspots__block" data-stato="aggiorna" data-segue="segue in legenda" style="--x:6.45%;--y:73.55%;--w:87.1%;--h:7.2%">
      <span class="rg-hotspots__line" style="--left:8.5%;--base:76.4%;--size:2.1;--colore:#993C1D">NOTE: telaio 30 x 30, rinforzo in tela sotto il ricamo,</span>
      <span class="rg-hotspots__line" style="--left:8.5%;--base:79.6%;--size:2.1;--colore:#993C1D">filo di bobina bianco su tutti gli stop chiari, tensione</span>
    </div>
  </div>
  <div class="rg-hotspots__layer" role="group" aria-label="Pagina 1">…riquadri…</div>
</div>
```

## La larghezza della pagina (`--rg-hotspots-page-width`) — 1.57.1

> «Ridurre un po' la grandezza del PDF a sinistra, per vedere un po' più di aghi e non solo una fila.»
> — Lorenzo, 2026-11-18

La pagina è larga quanto la colonna (`100%`). Con **`--rg-hotspots-page-width`** si stringe, **centrata**
nella colonna: il rapporto resta, e riquadri, etichette e anteprima del testo seguono da soli, perché
sono in percentuale e in `cqw`. È una **manopola del componente**, non un token, letta con un ripiego:
la pagina la imposta su qualsiasi antenato (`rg-hotspots`, `rg-review-split__pages`, lo split), nel suo
CSS o da un attributo `style` che cambia col comando.

| Valore | Pagina nella colonna del documento a 1600 px (540 utili) |
| --- | --- |
| `100%` (default) | 538 × 761 |
| `75%` | 404 × 571 |
| `55%` | 296 × 419 |
| `40%` | 288 × 407 — è il pavimento |

**Il pavimento è 288 px** (3 × 96), e il DS lo impone da solo:
`width: min(100%, max(288px, var(--rg-hotspots-page-width, 100%)))`. Le etichette restano a **12 px**
— il corpo non scende con la pagina, quindi restano leggibili — e stanno dentro la pagina finché sono
larghe meno di metà pagina: «Stop 3 · ago 2» ne misura ~124, «5» ~17. Sotto i 288 px un'etichetta lunga
uscirebbe dalla pagina e coprirebbe il disegno. Con molti stop vicini, sotto il 75% conviene
l'etichetta corta («3») al posto di «Stop 3 · ago 2». Mai oltre il 100%: la pagina non sborda dalla
colonna.

**L'anteprima del testo si rimpicciolisce con la pagina** (2,1 cqw: 11,3 px al 100%, 6,2 al 55%): a quelle
misure dice *dove* e *quanto* testo, non si legge. Il testo da leggere è nel modulo.

**Il comando** che la sceglie sta nella testa ferma, `rg-review-split__head`: un `rg-segmented` con
bottoni `aria-pressed` («Grande · Media · Piccola»). È la forma giusta: una scelta fra pochi valori
di come si guarda, che non è un indirizzo (quello sarebbe `a.rg-segmented__item[aria-current]`).

```html
<div class="rg-segmented" role="group" aria-label="Grandezza della pagina">
  <button class="rg-segmented__item" type="button" aria-pressed="true" data-larghezza="100%">Grande</button>
  <button class="rg-segmented__item" type="button" aria-pressed="false" data-larghezza="75%">Media</button>
  <button class="rg-segmented__item" type="button" aria-pressed="false" data-larghezza="55%">Piccola</button>
</div>
```

```js
// nella pagina: un solo posto dove scrivere la misura
document.querySelector('.rg-hotspots').style.setProperty('--rg-hotspots-page-width', bottone.dataset.larghezza);
```

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
