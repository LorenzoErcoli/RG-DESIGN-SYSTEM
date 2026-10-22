# Il foglio a schermo (`rg-u-screen-a4`)

## Scopo

Dire che **questo documento, a schermo, si vede come un foglio A4**: una colonna bianca centrata,
larga quanto il foglio, con il respiro laterale dei margini di stampa. È l'utility speculare a
[`rg-u-print-a4`](worksheet-block.md#intestazione-di-pagina): quella dichiara la geometria della
carta, questa la mostra sul monitor.

**La giustezza è la stessa.** Una pagina `rg-a4` stampa su una colonna di testo larga 186 mm
(210 meno i 12 mm di margine per lato). A schermo la stessa colonna misura 186 mm di CSS, cioè
703 px a 96 dpi: il testo va a capo negli stessi punti, un `rg-fill-field` è lungo quanto sarà in
carta, e l'etichetta sta accanto al suo valore invece che a mezzo monitor di distanza.

### Perché serviva

Il fascicolo di lavorazione e i moduli in bianco sono **fogli di carta resi in HTML**. In stampa
escono giusti; a schermo non avevano nessuna larghezza e andavano da bordo a bordo del monitor.

> «Non è ben leggibile perché si apre su tutto lo schermo. Possiamo renderla simile a pagine di
> A4?» — Lorenzo, 2026-10-22

Misurato su 1920 px: la riga di un campo era lunga quasi il triplo di quella stampata, «CLIENTE»
stava a sinistra e il suo valore a ~400 px, e non si capiva dove finisse un foglio.

## Varianti

| Classe | Geometria | Si accoppia a |
| --- | --- | --- |
| `rg-u-screen-a4` | foglio 210 mm, margine **12 mm** sui quattro lati | `@page rg-a4` / `rg-u-print-a4` |
| `rg-u-screen-a4--head` | foglio 210 mm, margine **20 mm in alto**, 12 ai lati e in basso | `@page rg-a4-head` / `rg-u-print-a4--head` |
| `rg-u-screen-a4-bar` | **la stessa colonna, senza carta**: per la barra `rg-u-no-print` sopra il foglio | — |

Il modificatore si usa **da solo**, come `rg-u-print-a4--head`: non va aggiunto alla classe base.

I 20 mm in alto restano **vuoti anche a schermo**, ed è corretto così: è il posto riservato
all'intestazione che l'app stampa sul PDF dopo l'impaginazione. Vederlo vuoto dice dove finirà.

## Uso e limiti

**La stampa non cambia di un millimetro.** Tutto sta dentro `@media screen`, che in stampa non si
applica: niente `max-width`, niente padding aggiunto, niente sfondo sul foglio stampato. Le
posizioni che un generatore di PDF misura dopo l'impaginazione (in RG, l'aggancio delle schede
macchina al fascicolo) restano quelle di prima. Chi tocca questo blocco **non esce da `@media
screen`**.

**Non va sul `<body>`.** Lo sfondo del `body` si propaga alla tela della finestra: un `body` bianco
non si stacca da niente, perché il bianco diventa tutto lo schermo. Il foglio va su un contenitore
**dentro** il body — che resta libero di portare `rg-u-print-a4--head` per la stampa. Le due classi
stanno su due elementi diversi, e non è una scomodità: una parla alla stampante, l'altra al monitor.

**Niente finti salti pagina.** A schermo il browser non sa dove cadrà il taglio — è lo stesso
motivo per cui [`rg-blank-page`](blank-page.md) dichiara che «il recto lo conta l'app, non il CSS».
Una riga ogni 297 mm direbbe una bugia e, su una lista di fogli già separati (un
`rg-worksheet-block` per fase), direbbe anche la bugia sbagliata: i tagli veri cadono dove li mette
il fragmentatore. Il foglio a schermo è **una colonna continua** della larghezza giusta; dove cade
il taglio lo mostra il PDF, che è lì accanto.

**Il filetto, non l'ombra.** La carta si stacca perché il fondo è `--rg-color-background` e il
foglio è `--rg-color-surface-raised`, più un filetto `--rg-color-border-medium`. Le regole (§6)
ammettono l'ombra solo per elementi **sovrapposti**, e un foglio non è sovrapposto a niente.

**La barra sopra il foglio.** La barra delle azioni (`rg-u-no-print`: «Apri il PDF per la stampa»,
«Stampa questa pagina», la scelta delle parti) prende `rg-u-screen-a4-bar`: stessa colonna, stesso
filo sinistro dei campi, nessuna carta sotto. È chrome e si deve vedere che non è il documento.

**Sul tablet non si scrolla in orizzontale.** Sotto la larghezza del foglio la colonna si restringe
e basta (`width: 100%` più `box-sizing: border-box`). Il tablet del reparto (768–1024 px) resta
sopra la soglia dei 680 px e tiene i margini veri; sotto i 680 px i 24 mm di margine laterale
sarebbero un quarto della pagina e scendono alla scala di spazio — lì la fedeltà alla carta
costerebbe più di quanto rende.

**Le misure sono in millimetri, ed è un'eccezione dichiarata** (regole §12, la stessa di `@page`):
qui la misura **è** fisica e deve coincidere con quella della pagina nominata. La scala di spazio
del DS è in px e non descrive un foglio di carta. **Chi cambia una `@page` cambia anche la sua riga
qui**: `@page rg-a4-head` e `rg-u-screen-a4--head` sono una coppia, come il margine superiore e
l'intestazione del PDF.

**Non è un'anteprima di stampa.** Dice la **giustezza**, non l'impaginazione: non conta le pagine,
non mostra l'intestazione, non sa quante facciate verranno. Per quello c'è il PDF.

## Misure

A 96 dpi, zoom 100 % (1 mm = 3,7795 px):

| Cosa | mm | px |
| --- | --- | --- |
| Foglio A4, larghezza | 210 | 793,7 |
| Margine laterale (entrambe le varianti) | 12 | 45,4 |
| **Giustezza — la colonna di testo** | **186** | **703,0** |
| Margine superiore, `--head` | 20 | 75,6 |
| Altezza di una facciata (non disegnata) | 297 | 1122,5 |

Il filetto del foglio sta **fuori** dai 210 mm (`max-width: calc(210mm + hairline * 2)`): con
`box-sizing: border-box` starebbe dentro e la giustezza scenderebbe di 2 px rispetto alla carta.
Sono due pixel, ma la coincidenza con la carta è l'unica cosa che questo utility promette.

### Misurato in Chrome

Documento di prova: sei `rg-worksheet-block--compact` su `@page rg-a4-head`, Chrome headless, lo
stesso motore che genera il PDF del fascicolo. «Prima» è lo stesso documento senza l'utility.

| Finestra (`clientWidth`) | Foglio | Colonna di testo | Primo campo, prima → dopo | Scroll orizzontale |
| --- | --- | --- | --- | --- |
| 1889 px | 795,69 | **703,00** | 456,75 → 160,25 | no (`scrollWidth` = `clientWidth`) |
| 993 px | 795,69 | **703,00** | 232,75 → 160,25 | no |
| 737 px | 737,00 | 644,31 | 168,75 → 145,58 | no |
| 485 px | 485,00 | 451,00 | 145,00 → 133,66 | no |

703,00 px è 186 mm esatti; 795,69 è 210 mm più i due filetti. Sotto i 768 px il foglio si restringe
e basta, e sotto i 680 px i margini scendono a 16 px. **Il campo che Lorenzo vedeva lungo il
triplo**: 456,75 px prima, 160,25 dopo, cioè 2,85 volte.

La barra con `rg-u-screen-a4-bar` misura 793,69 px e il suo contenuto comincia a 593,01 px, dove
comincia il blocco dentro il foglio (593,00): **stesso filo sinistro**, come dichiarato.

**La stampa, prima e dopo, è la stessa pagina.** `--print-to-pdf` sullo stesso documento con e
senza il contenitore: **3 pagine** in tutti e due, **222 parole alle stesse coordinate** (differenze
0, tolleranza 0,01 pt), stessi disegni su ogni pagina. La giustezza stampata misura 186,27 mm (186
più il filetto del blocco) e comincia a 20,11 mm dal bordo: la pagina **non è scalata** — il
controllo di [verify-checklist §11](../agent/verify-checklist.md), che va fatto prima di fidarsi di
qualunque misura presa su un render.

## Struttura

Un documento che si stampa su `@page rg-a4-head` e a schermo si legge come un foglio:

```html
<body class="rg-u-print-a4--head">
  <form class="rg-u-no-print rg-u-screen-a4-bar rg-u-mb-4" method="get" action="…">
    <div class="rg-cluster">
      <button class="rg-button rg-button--primary" type="submit">Apri il PDF per la stampa</button>
      <button class="rg-button rg-button--ghost" type="button">Stampa questa pagina</button>
    </div>
  </form>

  <div class="rg-u-screen-a4--head">
    <!-- i fogli: rg-worksheet-part, rg-worksheet-block, rg-part-sheet… -->
  </div>
</body>
```

Senza intestazione di pagina, margini uniformi:

```html
<body class="rg-u-print-a4">
  <div class="rg-u-screen-a4">
    <!-- il documento -->
  </div>
</body>
```

La `<div>` in mezzo non cambia la stampa: a schermo porta le regole di `@media screen`, in stampa è
un blocco senza stile. I `break-before`/`break-after` dei fogli continuano a valere, `:first-child`
compreso — dentro il contenitore il primo figlio è lo stesso di prima.
