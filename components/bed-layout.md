# Bed layout (pezzi sul piano) — proposta 1.28.0

## Scopo

Un **disegno piccolo** del piano di una macchina (stampa UV 250 × 130 cm, MuchColours 90 × 60 cm) in
**proporzione reale**, con il margine sul bordo e i pezzi disposti a griglia. Mostra quanti pezzi stanno sul
piano al massimo e quanti ne ha scritti chi compila. Sotto il disegno c'è una **didascalia ariosa**: è il posto
del «ne stanno al massimo», che prima era un aiuto strizzato sotto «Pezzi per ciclo».

Il DS non calcola niente. Il server passa i numeri e le coordinate già calcolati; nessun JavaScript.

Nasce con la 1.28.0, dalla testa della fase di stampa (piattaforma, chat «reparti»). Sostituisce il disegno
fatto a mano dei consumi materiali, che aveva i colori scritti nel codice.

## Varianti e stati

| Stato | Come si fa | Cosa si vede |
| --- | --- | --- |
| **ci stanno** (normale) | `rg-bed-layout` | i primi *n* posti pieni, gli altri vuoti; «8 inseriti · 2 posti liberi» con la chiave |
| **tutti pieni** | `rg-bed-layout` | tutti i posti `--used`; stato «10 inseriti, nessun posto libero» |
| **troppi** | `rg-bed-layout rg-bed-layout--over` | tutti i posti pieni, contorno del piano a 2 px nel colore di avviso, stato con icona `avviso` e le parole: «12 inseriti: 2 più di quanti ne stanno» |
| **nessuno inserito** | `rg-bed-layout` | tutti i posti vuoti; stato «Nessun pezzo inserito, 10 posti liberi» |
| **non calcolabile** (mancano le misure del pezzo) | `rg-bed-layout`, senza posti | solo piano e margine; titolo «Resa non calcolabile», stato «Manca la larghezza del pezzo.» |
| **il pezzo non entra** (0 al massimo) | `rg-bed-layout rg-bed-layout--over`, senza posti | titolo «0 al massimo», stato con icona: «Il pezzo non entra nell'area utile (246 × 126 cm).» |

I posti si distinguono **senza colore**: occupato = **pieno** (grigio scuro, bordo bianco fra un pezzo e
l'altro), libero = **vuoto** (solo contorno). Pieno/vuoto regge in scala di grigi, in fotocopia e stampato in
bianco e nero. La chiave nella riga di stato ripete i due segni, fatti di bordi (si stampano anche senza
«grafica di sfondo»). Il colore di avviso non è mai da solo: ci sono sempre l'icona e la frase.

## Uso e limiti

- **Dove**: nella testa di una sequenza di operazioni (`rg-operation-sequence__head`), a destra dei gruppi di
  campi (`rg-form-row--groups`); va a capo sotto i campi quando non ci sta. Può stare anche da solo.
- **Misura**: larghezza massima 256 px (`--rg-bed-layout-width`), altezza del disegno al più 160 px
  (`--rg-bed-layout-max-height`): un piano quasi quadrato si ferma all'altezza e resta sul filo sinistro.
  Tutte e due si possono cambiare dal contenitore.
- **SVG e non griglia CSS**: la proporzione e il margine sono misure in cm. Con `viewBox` in centimetri il
  server scrive le misure vere e il browser scala; i colori vengono dal CSS con i token (`fill`/`stroke`), mai
  dal markup. Le linee restano a 1 px a ogni scala (`vector-effect: non-scaling-stroke`).
- **Accessibilità**: l'`<svg>` ha `role="img"` e un `aria-label` con la frase intera (piano, margine,
  massimo, griglia, inseriti, liberi o in più). Il campo «Pezzi per ciclo» cita il titolo (e, se troppi, lo
  stato) con `aria-describedby`; con troppi pezzi il campo può essere `is-warning`.
- **Non è un grafico**: nessuna interazione, nessun hover, nessun tooltip sui posti.
- **Fuori scala**: con molti pezzi piccoli (più di ~60 posti) i posti scendono sotto i 4 px e il disegno non si
  legge più. In quel caso il server disegna la griglia comunque, ma la didascalia resta la fonte: il titolo dice
  il numero.

### Cosa calcola il server

Ingressi: larghezza `W` e profondità `H` del piano (cm), margine `m` (cm), larghezza `pw` e altezza `ph` del
pezzo **come disposto** (cm, già ruotato se conviene), colonne `c`, righe `r`, pezzi inseriti `n`.
Massimo `max = c × r`.

| Elemento | Attributi |
| --- | --- |
| `<svg class="rg-bed-layout__plan">` | `viewBox="0 0 W H"`, `preserveAspectRatio="xMinYMin meet"`, `role="img"`, `aria-label="…"` |
| `<rect class="rg-bed-layout__bed">` | `x="0" y="0" width="W" height="H"` — il piano |
| `<rect class="rg-bed-layout__area">` | `x="m" y="m" width="W − 2m" height="H − 2m"` — l'area utile; la fascia fra i due è il margine |
| un `<rect class="rg-bed-layout__slot">` per posto | per `j` in `0…r−1` (righe, dall'alto) e `i` in `0…c−1` (colonne, da sinistra): `x = m + i·pw`, `y = m + j·ph`, `width = pw`, `height = ph`. Indice `k = j·c + i`: classe in più `rg-bed-layout__slot--used` se `k < min(n, max)` |
| `rg-bed-layout--over` sul `<figure>` | se `n > max`, oppure se `max = 0` con le misure presenti |

Numeri nell'SVG col **punto** decimale (`46.9`), nel testo con la **virgola** (`46,9`). Arrotondare solo la
presentazione (una cifra decimale basta); le coordinate si possono passare piene.

Didascalia (testo, tutto dal server):

- `__title`: «{max} al massimo» (o «Resa non calcolabile»);
- `__spec` (una o due righe): «{c} × {r} da {pw} × {ph} cm» e «piano {W} × {H} cm · margine {m} cm»;
- `__status`: normale → chiave piena + «{n} inseriti», chiave vuota + «{max − n} posti liberi» (1 → «posto
  libero»); troppi → icona `avviso` + «{n} inseriti: {n − max} più di quanti ne stanno».

## Struttura

```html
<figure class="rg-bed-layout">
  <svg class="rg-bed-layout__plan" viewBox="0 0 250 130" preserveAspectRatio="xMinYMin meet" role="img"
       aria-label="Piano 250 × 130 cm, margine 2 cm: ne stanno al massimo 10 pezzi da 46,9 × 42,9 cm, 5 per 2. Inseriti 8, 2 posti liberi.">
    <rect class="rg-bed-layout__bed" x="0" y="0" width="250" height="130"/>
    <rect class="rg-bed-layout__area" x="2" y="2" width="246" height="126"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="2" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="48.9" y="2" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="95.8" y="2" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="142.7" y="2" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="189.6" y="2" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="44.9" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="48.9" y="44.9" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="95.8" y="44.9" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot" x="142.7" y="44.9" width="46.9" height="42.9"/>
    <rect class="rg-bed-layout__slot" x="189.6" y="44.9" width="46.9" height="42.9"/>
  </svg>
  <figcaption class="rg-bed-layout__caption">
    <p class="rg-bed-layout__title" id="resa-max">10 al massimo</p>
    <p class="rg-bed-layout__spec">5 × 2 da 46,9 × 42,9 cm</p>
    <p class="rg-bed-layout__spec">piano 250 × 130 cm · margine 2 cm</p>
    <p class="rg-bed-layout__status">
      <span><span class="rg-bed-layout__key rg-bed-layout__key--used" aria-hidden="true"></span>8 inseriti</span>
      <span><span class="rg-bed-layout__key" aria-hidden="true"></span>2 posti liberi</span>
    </p>
  </figcaption>
</figure>
```

Troppi pezzi (MuchColours 90 × 60, 3 × 3 = 9, 12 inseriti):

```html
<figure class="rg-bed-layout rg-bed-layout--over">
  <svg class="rg-bed-layout__plan" viewBox="0 0 90 60" preserveAspectRatio="xMinYMin meet" role="img"
       aria-label="Piano 90 × 60 cm, margine 2 cm: ne stanno al massimo 9 pezzi da 25 × 18 cm, 3 per 3. Inseriti 12: 3 più di quanti ne stanno.">
    <rect class="rg-bed-layout__bed" x="0" y="0" width="90" height="60"/>
    <rect class="rg-bed-layout__area" x="2" y="2" width="86" height="56"/>
    <!-- 9 posti, tutti rg-bed-layout__slot--used: x = 2, 27, 52; y = 2, 20, 38 -->
  </svg>
  <figcaption class="rg-bed-layout__caption">
    <p class="rg-bed-layout__title" id="resa-max">9 al massimo</p>
    <p class="rg-bed-layout__spec">3 × 3 da 25 × 18 cm</p>
    <p class="rg-bed-layout__spec">piano 90 × 60 cm · margine 2 cm</p>
    <p class="rg-bed-layout__status" id="resa-stato"><span><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-avviso"></use></svg>12 inseriti: 3 più di quanti ne stanno</span></p>
  </figcaption>
</figure>
```

Nella testa di una sequenza, a destra dei gruppi di campi:

```html
<div class="rg-operation-sequence">
  <div class="rg-operation-sequence__head">
    <div class="rg-form-row rg-form-row--groups">…Misura del pezzo | Resa…</div>
    <figure class="rg-bed-layout">…</figure>
  </div>
  <ol class="rg-operation-list">…</ol>
</div>
```

| Classe | Ruolo |
| --- | --- |
| `rg-bed-layout` | `<figure>`: disegno sopra, didascalia sotto; larghezza massima 256 px |
| `rg-bed-layout--over` | troppi pezzi (o il pezzo non entra): avviso su contorno e stato |
| `rg-bed-layout__plan` | l'`<svg>` in cm, `role="img"` + `aria-label` |
| `rg-bed-layout__bed` | il piano intero; la sua campitura fra bordo e area utile è il margine |
| `rg-bed-layout__area` | l'area utile, tratteggiata |
| `rg-bed-layout__slot` / `--used` | un posto: vuoto (libero) / pieno (occupato) |
| `rg-bed-layout__caption` | `<figcaption>` |
| `rg-bed-layout__title` | «10 al massimo», identity 20 |
| `rg-bed-layout__spec` | griglia, pezzo, piano e margine, mono 12 grigio |
| `rg-bed-layout__status` | inseriti / liberi / in più, sotto un filetto |
| `rg-bed-layout__key` / `--used` | quadratino di chiave: vuoto / pieno |
| `rg-operation-sequence__head` | testa della sequenza: campi a sinistra, disegno a destra |
