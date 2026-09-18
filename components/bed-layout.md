# Bed layout (pezzi sul piano) — proposta 1.28.0

## Scopo

Un **mini-disegno** del piano di una macchina (stampa UV 250 × 130 cm, MuchColours 90 × 60 cm), con i pezzi
disposti a griglia. Dice quanti pezzi stanno sul piano al massimo e quanti ne ha scritti chi compila. Sta
**dentro la riga dei campi** come un campo: etichetta sopra e, sulla linea dei controlli (40 px), il disegno con
due righe corte accanto. È il posto del «ne stanno al massimo», che prima era un aiuto strizzato sotto «Pezzi
per ciclo».

Lo stile è quello dei mini-disegni dei consumi del ricamo (pantografo, appoggio):
- cornice sottile col raggio piccolo e fondo chiaro caldo;
- pezzi a tinta chiara con un filetto più scuro;
- nessun titolo grande.

Il DS non calcola niente: il server passa i numeri, le coordinate e la misura in px. Nessun JavaScript.

Storia: nasce con la 1.28.0 dalla testa della fase di stampa. La prima versione (disegno grande a destra, titolo
da 20 px, righe di dati) è stata scartata da Lorenzo: *«deve essere qualcosa di piccolo e non ingombrante»*.

## Varianti e stati

| Stato | Come si fa | Cosa si vede |
| --- | --- | --- |
| **ci stanno** | `rg-bed-layout` | i primi *n* posti pieni (tinta chiara + filetto), gli altri tratteggiati; «8 inseriti · 2 liberi» |
| **tutti pieni** | `rg-bed-layout` | tutti i posti `--used`; «10 inseriti · 0 liberi» |
| **troppi** | `rg-bed-layout rg-bed-layout--over` | tutti i posti pieni, cornice del piano nel colore di avviso, stato con icona `avviso`: «12: 3 di troppo» |
| **nessuno inserito** | `rg-bed-layout` | tutti i posti tratteggiati; «0 inseriti · 10 liberi» |
| **non calcolabile** (mancano le misure del pezzo) | `rg-bed-layout`, senza posti | solo il piano; «— al massimo», stato «manca la larghezza» |
| **il pezzo non entra** | `rg-bed-layout rg-bed-layout--over`, senza posti | «0 al massimo», stato con icona: «il pezzo non entra» |

Il colore non è mai l'unico segnale:
- **occupato** = pieno, con una tinta chiara e un filetto scuro;
- **libero** = vuoto, con il contorno tratteggiato grigio;
- **troppi** = la cornice cambia colore, ma lo stato lo dice anche a parole («di troppo») e con l'icona.

La tinta è l'accento blu stagionale schiarito col bianco, e il filetto usa `--info`. La palette stagionale è
ammessa nei grafici (regole §4). Il componente non aggiunge token globali: la tinta vive in due variabili sue,
`--rg-bed-layout-fill` e `--rg-bed-layout-ink`, derivate dai token.

## Uso e limiti

- **Dove**: nella riga di campi del gruppo «Resa», subito dopo «Pezzi per ciclo» e «Tempo totale stampa».
  Ha la stessa struttura di un `rg-field` (`rg-field rg-bed-layout`): l'etichetta «Sul piano» si allinea alle
  altre, il disegno alla linea degli input. L'altezza è quella dei campi.
- **Misura del disegno**: la calcola il server e la scrive come `width`/`height` dell'`<svg>`, così vale anche
  senza CSS. Alto 40 px, largo in proporzione, al massimo 88 px: se supera, largo 88 e alto in proporzione
  (250 × 130 → 77 × 40; 90 × 60 → 60 × 40).
- **Le misure non si scrivono in pagina**: piano, margine, pezzo e griglia stanno nell'`aria-label` e nel
  `<title>` dell'SVG, che il browser mostra come suggerimento al passaggio del puntatore.
- **Accessibilità**: l'`<svg>` ha `role="img"` + `aria-label` con la frase intera. Il campo «Pezzi per ciclo»
  cita titolo e stato con `aria-describedby="…-max …-stato"`. Con troppi pezzi il campo può essere `is-warning`.
- **Fuori scala**: il disegno ha l'altezza di un campo, quindi con più di circa 30 posti i pezzi scendono sotto
  i 3 px. Il disegno resta, ma fa fede la didascalia.

### Mai nero senza il CSS (ripiego)

Un `<rect>` senza `fill` si riempie di **nero**. Se il foglio di stile manca o è vecchio (cache del browser), il
disegno diventa un blocco nero. Per questo il markup porta **attributi di presentazione di ripiego**, e il CSS
del DS li **ridichiara tutti**. Una regola CSS vince sempre su un attributo di presentazione, che ha specificità
zero: col CSS giusto il ripiego sparisce; senza CSS resta un disegno a contorni, con i pieni in grigio leggero e
i liberi tratteggiati.

| Elemento | Attributi di ripiego nel markup | Proprietà ridichiarate dal CSS |
| --- | --- | --- |
| `<svg>` | `width`, `height` (px) | (la misura resta quella del server) |
| `__bed` | `fill="none"` | `fill`, `fill-opacity`, `stroke` |
| `__slot--used` | `fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"` | `fill`, `fill-opacity`, `stroke`, `stroke-width`, `stroke-dasharray`, `vector-effect` |
| `__slot` (libero) | `fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"` | come sopra |
| icona di avviso | `width="12" height="12"` | `--rg-icon-size` |

Verificato: la pagina senza foglio di stile mostra contorni e grigi leggeri, nessun nero; con il CSS del DS
compaiono tinta, filetto e tratteggio.

### Cosa calcola il server

Ingressi:
- piano: larghezza `W` e profondità `H` (cm), margine `m` (cm);
- pezzo **come disposto** (già ruotato se conviene): larghezza `pw` e altezza `ph` (cm);
- colonne `c`, righe `r`, pezzi inseriti `n`.

Il massimo è `max = c × r`.

| Elemento | Attributi |
| --- | --- |
| `<svg class="rg-bed-layout__plan">` | `viewBox="0 0 W H"`; `height="40"` e `width` = arrotondamento di 40·W/H; se la larghezza supera 88: `width="88"` e `height` = arrotondamento di 88·H/W; `role="img"`; `aria-label` con la frase intera |
| `<title>` (primo figlio) | «Piano {W} × {H} cm · margine {m} cm · pezzo {pw} × {ph} cm · {c} × {r}» |
| `<rect class="rg-bed-layout__bed">` | `x="0" y="0" width="W" height="H" fill="none"` |
| un `<rect class="rg-bed-layout__slot">` per posto | per ogni riga `j` (dall'alto) e colonna `i` (da sinistra): `x = m + i·pw`, `y = m + j·ph`, `width = pw`, `height = ph`, più gli attributi di ripiego. Indice `k = j·c + i`: aggiunge `rg-bed-layout__slot--used` se `k < min(n, max)` |
| `rg-bed-layout--over` sul contenitore | se `n > max`, oppure se `max = 0` con le misure presenti |
| `__title` | «{max} al massimo» |
| `__status` | normale: «{n} inseriti · {max − n} liberi»; troppi: icona `avviso` + «{n}: {n − max} di troppo» |

Nell'SVG i numeri vanno col **punto** (`46.9`), nel testo con la **virgola** (`46,9`).

## Struttura

Stampa UV, piano 250 × 130, pezzo 46,9 × 42,9, 5 × 2, 8 inseriti:

```html
<div class="rg-field rg-bed-layout">
  <span class="rg-field__label">Sul piano</span>
  <div class="rg-bed-layout__body">
    <svg class="rg-bed-layout__plan" viewBox="0 0 250 130" width="77" height="40" role="img" aria-label="Piano 250 × 130 cm, margine 2 cm: ne stanno al massimo 10 pezzi da 46,9 × 42,9 cm, 5 per 2. Inseriti 8, 2 liberi.">
      <title>Piano 250 × 130 cm · margine 2 cm · pezzo 46,9 × 42,9 cm · 5 × 2</title>
      <rect class="rg-bed-layout__bed" x="0" y="0" width="250" height="130" fill="none"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="2" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="48.9" y="2" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="95.8" y="2" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="142.7" y="2" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="189.6" y="2" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="44.9" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="48.9" y="44.9" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="95.8" y="44.9" width="46.9" height="42.9" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot" x="142.7" y="44.9" width="46.9" height="42.9" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot" x="189.6" y="44.9" width="46.9" height="42.9" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2" vector-effect="non-scaling-stroke"/>
    </svg>
    <div class="rg-bed-layout__caption">
      <p class="rg-bed-layout__title" id="resa-max">10 al massimo</p>
      <p class="rg-bed-layout__status" id="resa-stato">8 inseriti · 2 liberi</p>
    </div>
  </div>
</div>
```

MuchColours, piano 90 × 60, pezzo 25 × 18, 3 × 3, 12 inseriti (troppi):

```html
<div class="rg-field rg-bed-layout rg-bed-layout--over">
  <span class="rg-field__label">Sul piano</span>
  <div class="rg-bed-layout__body">
    <svg class="rg-bed-layout__plan" viewBox="0 0 90 60" width="60" height="40" role="img" aria-label="Piano 90 × 60 cm, margine 2 cm: ne stanno al massimo 9 pezzi da 25 × 18 cm, 3 per 3. Inseriti 12: 3 di troppo.">
      <title>Piano 90 × 60 cm · margine 2 cm · pezzo 25 × 18 cm · 3 × 3</title>
      <rect class="rg-bed-layout__bed" x="0" y="0" width="90" height="60" fill="none"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="2" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="27" y="2" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="52" y="2" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="20" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="27" y="20" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="52" y="20" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="2" y="38" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="27" y="38" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
      <rect class="rg-bed-layout__slot rg-bed-layout__slot--used" x="52" y="38" width="25" height="18" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="0.5" vector-effect="non-scaling-stroke"/>
    </svg>
    <div class="rg-bed-layout__caption">
      <p class="rg-bed-layout__title" id="resa-max">9 al massimo</p>
      <p class="rg-bed-layout__status" id="resa-stato"><svg class="rg-icon" width="12" height="12" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-avviso"></use></svg>12: 3 di troppo</p>
    </div>
  </div>
</div>
```

Nel gruppo «Resa» della testa della sequenza:

```html
<div class="rg-form-row rg-form-row--groups">
  <fieldset class="rg-form-row__group">
    <legend class="rg-form-row__legend">Misura del pezzo</legend>
    <div class="rg-form-row">…Larghezza (cm), Altezza (cm)…</div>
  </fieldset>
  <fieldset class="rg-form-row__group">
    <legend class="rg-form-row__legend">Resa</legend>
    <div class="rg-form-row">
      <label class="rg-field rg-field--w8"><span class="rg-field__label">Pezzi per ciclo (n)</span><input class="rg-input rg-input--numeric" type="text" inputmode="numeric" value="8" aria-describedby="resa-max resa-stato"></label>
      <label class="rg-field rg-field--w8"><span class="rg-field__label">Tempo totale stampa (min)</span><input class="rg-input rg-input--numeric" type="text" inputmode="decimal" value="12"></label>
      <div class="rg-field rg-bed-layout">…</div>
    </div>
  </fieldset>
</div>
```

| Classe | Ruolo |
| --- | --- |
| `rg-bed-layout` | il contenitore, sempre insieme a `rg-field` (etichetta sopra, stessa altezza dei campi) |
| `rg-bed-layout--over` | troppi pezzi (o il pezzo non entra): avviso su cornice e stato |
| `rg-bed-layout__body` | la linea dei controlli (40 px): disegno + didascalia |
| `rg-bed-layout__plan` | l'`<svg>` in cm, cornice 1 px `--rg-color-border`, raggio 2 px, fondo `neutral-50` |
| `rg-bed-layout__bed` | il piano (fondo chiaro) |
| `rg-bed-layout__slot` / `--used` | un posto: libero (tratteggiato) / occupato (tinta chiara + filetto) |
| `rg-bed-layout__caption` | le due righe accanto al disegno |
| `rg-bed-layout__title` | «10 al massimo», 12 px, peso medio |
| `rg-bed-layout__status` | «8 inseriti · 2 liberi» / «12: 3 di troppo», 12 px, grigio (avviso se troppi) |
