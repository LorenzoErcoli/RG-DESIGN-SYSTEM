# Gradini di stampa (`rg-print-fit--1` … `--4`) — proposta 1.54.0

> «Non deve accadere» che per poche righe un pezzo di foglio finisca sul retro o su un foglio
> nuovo. — Lorenzo, 2026-11-16

## Scopo

Far stare **in una facciata** un foglio del fascicolo che la sfora **di poco**, togliendo spazio in
un ordine dichiarato: prima dove non si scrive, poi dalle righe da scrivere fino a un pavimento,
poi rimpicciolendo il dato stampato. Mai sotto il pavimento della mano, mai sotto il 90%.

Il CSS non sa misurare una pagina. La misura la fa l'**app**, sul PDF già impaginato: per il foglio
che sfora — un ricamo, oppure un gruppo di fasi collegate (il `rg-worksheet-block--long`, i
`--continued` che seguono, il `rg-worksheet-foot` dopo) — ristampa mettendo **lo stesso gradino su
ogni elemento di quel foglio**. Niente contenitore attorno: romperebbe `:first-child` e
`.rg-worksheet-part + .rg-worksheet-block--long`, le due regole che decidono dove comincia una pagina.

## Varianti

I gradini sono **cumulativi**: l'app ne mette **uno**, il primo che basta, e `--3` contiene già
`--2` e `--1`. Senza classe è il gradino 0, il foglio com'è.

| Classe | Cosa toglie, in più del gradino prima |
| --- | --- |
| `rg-print-fit--1` | **Aria dove non si scrive.** Testata, riga «Fase n di N», margini della banda, corpo e stacchi fra le file di campi al mezzo passo (2 px); piede del blocco a 4 px; riga del tempo per pezzo staccata di 2 invece di 8; spazio fra blocco e piede 2 invece di 8; piede autonomo senza margine sotto. Il dato stampato delle tabelle a interlinea stretta (1,1 invece di 1,4). |
| `rg-print-fit--2` | **Righe da scrivere più basse, fino al pavimento.** Riga di stop di `rg-table--hand` 40 → **32 px**; nota `--tall` del blocco 48 → **40**; nota del piede intero 80 → **48**. |
| `rg-print-fit--3` | **Scala 95%.** |
| `rg-print-fit--4` | **Scala 90%.** Sotto non si va. |

### Quanto fa guadagnare (misurato)

Chrome 157, `--print-to-pdf`, `@page rg-a4-head` (20 mm sopra, 12 sotto: facciata utile **265 mm**,
larga 186). Due fogli costruiti come quelli della piattaforma e misurati **su una pagina altissima**,
per avere l'altezza vera del foglio invece del punto dove cade il taglio. Guadagno **cumulato**:

| Foglio | Gradino 0 | `--1` | `--2` | `--3` | `--4` |
| --- | --- | --- | --- | --- | --- |
| Ricamo, 17 stop (2 con le pallette, i due fili uno sotto l'altro come nella piattaforma), riga «In magazzino», 4 campi + Cartella, piede a due file | 288,0 mm | **−10,3** | **−40,2** | **−48,2** | **−49,8** |
| … in % della facciata da 265 | — | 3,9% | 15,2% | 18,2% | 18,8% |
| Gruppo di due fasi: 4 campi + 3 operazioni con 4 campi e nota ciascuna, tempo per pezzo, piede su una riga | 294,9 mm | **−15,4** | **−28,1** | **−33,1** | **−36,8** |
| … in % della facciata da 265 | — | 5,8% | 10,6% | 12,5% | 13,9% |

Lo stesso ricamo su pagine vere: al gradino 0 i 17 stop stanno sulla prima facciata e il **piede scende
da solo** sulla seconda (~23 mm); al gradino 1 ancora (~20 mm); dal gradino 2 tutto sta in una
facciata, con il fondo a 266,5 mm su 285.

**I numeri dipendono dal foglio**, e non sono una regola (checklist §11). Il ricamo guadagna quasi
tutto al gradino 2, perché ha diciassette righe di stop da abbassare, e quasi niente al 4, perché
lì gli stop sono già al pavimento; il gruppo di due fasi guadagna meno in tutto perché gran parte
della sua altezza è fatta di campi da compilare, che la scala non tocca (sotto). Servono all'app per
**partire** dal gradino giusto, non per saltare la misura: dopo ogni ristampa si rimisura.

### Il passo di uno stop, gradino per gradino

| | `0` | `--1` | `--2` | `--3` | `--4` |
| --- | --- | --- | --- | --- | --- |
| riga di stop, due codici filo a interlinea 1,1 | 10,6 mm (40 px) | 10,6 (40) | 8,7–9,0 (33–34) | **8,5 (32)** | **8,5 (32)** |

Al gradino 2 la riga non arriva a 32: con due righe di filo e i 6 px d'aria sotto il dato, è il dato a
tenerla a 33–34. Ai gradini 3 e 4 il dato scala e la riga si ferma al **pavimento**, 32 px, a qualunque
scala. Un valore che va a capo (un materiale lungo) alza lo stop oltre la riga della mano: per questo
il gradino 1 porta il dato di tutte le tabelle del foglio a interlinea stretta — la seconda riga costa
13 px invece di 17. La cella dei fili della piattaforma lo fa già da sé.

## Uso e limiti

**La scala è `zoom`, non `transform`.** `transform: scale()` disegna più piccolo ma impagina alla
misura vera: il foglio occuperebbe la stessa altezza. `zoom` cambia l'impaginazione — in Chrome, il
motore che stampa il fascicolo.

**Il foglio non si stringe: resta largo 186 mm.** `zoom` moltiplica le misure **in px** — testo,
altezze, spessori, aria — e non le larghezze in `%` e in `fr`. Misurato: il riquadro del blocco è
largo 186,3 mm a tutti e cinque i gradini. Le quattro colonne dei campi, le colonne della tabella
degli stop e la banda restano dove sono, a filo dell'intestazione di pagina; il dato dentro è più
piccolo. Non c'è quindi un foglio da 167 mm da allineare a sinistra o da centrare: la domanda non si
pone, ed è la risposta migliore — un foglio al 90% si sovrappone a uno al 100% colonna per colonna.

**Fuori dalla scala, per costruzione:**

| Cosa | Come | Misura vera a ogni gradino |
| --- | --- | --- |
| ogni `rg-fill-field` (etichetta, riga, nota, firma, casella da spuntare, **Pezzi da fare**) | contro-zoom: `zoom: calc(1 / scala)` | etichetta **10 px**, casella di dato **24**, firma e nota del piede su una riga **32**, nota del blocco 40 (dal gradino 2), Pezzi da fare 48 |
| il QR (`rg-qr`) | contro-zoom | **64 px, modulo 0,41 mm** (misurato 0,413 a tutti i gradini; regola della 1.40.0) |
| righe di `rg-table--hand` e celle `td.rg-fill-field--cell` | altezza divisa per la scala (una cella con un altro zoom romperebbe la riga) | stop **≥ 32**, sottoriga **24**, cella da compilare delle tabelle compatte **24** |

La scala quindi rimpicciolisce **il dato stampato e l'aria** — titolo, banda, intestazioni di
tabella, valori nelle celle, riga del tempo — e mai lo spazio della mano. Un campo dentro un campo
(la casella da spuntare dentro la riga di «Tutto il prodotto») non prende il contro-zoom due volte.
La banda di reparto scala con la sua trama: al 90% è la stessa figura, più piccola, e il nome resta
leggibile (12 → 10,8 px).

**`--rg-print-fit-scale`** è la manopola del componente, non un token: la fissa il gradino (0.95,
0.9) e la usano le compensazioni. 95 e 90 sono la richiesta, rapporti senza unità.

**Il gradino 2 è un'eccezione dichiarata** alle regole ([design-rules §5](../design-rules.md#lo-spazio-in-cui-si-scrive-a-mano-dalla-1380),
forma §12), che vogliono 40 px per la riga di una tabella da compilare, 48 per la nota, e dicono «la
compattazione non arriva qui».

- *Problema*: un foglio che sfora di pochi millimetri manda la sua coda sul retro o su un foglio
  nuovo, dove in reparto non la legge nessuno.
- *Ambito*: **solo** il foglio che l'app ha misurato e trovato fuori di poco, **solo** in stampa,
  **solo** dal gradino 2.
- *Pavimenti*: riga di stop **32 px** (~8,5 mm, la grafia adulta della riga aperta), nota **40**
  (~10,6 mm). Non si abbassano mai: le caselle di dato da 24, le sottorighe da 24, firma e nota del
  piede su una riga (32), Pezzi da fare (48), le caselle da spuntare e da attaccare.
- *Durata*: finché il fascicolo è di carta. *Responsabile*: prodotto RG (Lorenzo, 2026-11-16).

Il prezzo va detto: nella nota da 40 px con l'etichetta dentro restano ~27 px sotto l'etichetta, meno
dei 32 di una grafia adulta. È la scelta fra una nota stretta sotto la sua fase e una nota comoda su
una facciata che nessuno gira.

**Solo `@media print`.** A schermo il foglio non cambia di un pixel, con o senza gradino: l'anteprima
HTML non mostra il gradino, lo mostra il PDF.

**Si usa sul fascicolo compatto.** Le regole del gradino 1 agganciano `rg-worksheet-block--compact`;
i gradini 2–4 valgono anche fuori, ma il caso per cui esistono è il foglio di reparto.

**Limiti dichiarati.**

- **Un foglio che sfora di tanto non si stringe**: se al gradino 4 non sta, sta su due facciate come
  prima (il foglio è fronte-retro). Il gradino 4 non è un'ultima spiaggia da usare sempre.
- `zoom` è entrato nello standard da poco (Chrome l'ha sempre avuto, Firefox dalla 126). Un motore
  che non lo conosce ignora la scala: i gradini 3 e 4 valgono quanto il 2, e niente si rompe.
- La riga del tempo per pezzo porta `rg-u-mt-2`, che ha `!important`: il gradino 1 la abbassa con lo
  stesso peso. Se l'app cambia utility, la regola va rivista.

## Struttura

Il gruppo di due fasi collegate al gradino 2: **la stessa classe su ogni elemento del foglio**.

```html
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--long rg-print-fit--2">…fase 2…</section>
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--continued rg-print-fit--2">…fase 3…</section>
<div class="rg-worksheet-foot rg-worksheet-foot--compact rg-print-fit--2">…Operatore · Data · Note…</div>
```

Il ricamo al gradino 3: un elemento solo, perché il piede con la firma sta dentro il blocco
([worksheet-block](worksheet-block.md#il-piede-con-la-firma-a-due-file-proposta-1540)).

```html
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--long rg-print-fit--3">
  …testata, campi, tabella degli stop…
  <footer class="rg-worksheet-block__foot rg-worksheet-block__foot--sign">…</footer>
</section>
```

**Come la sceglie l'app.** Stampa senza gradino; per ogni foglio con **una** pagina di coda prova
`--1`, ristampa, rimisura; se non basta `--2`, e così fino a `--4`. Può partire più in alto usando la
tabella del guadagno come stima, ma l'ultima parola è la misura. Un foglio con **due o più** pagine
di coda sfora di tanto: si lascia com'è.
