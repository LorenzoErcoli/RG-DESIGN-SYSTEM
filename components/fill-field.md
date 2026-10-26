# Fill field (campo da compilare a penna)

## Scopo

Il campo che si compila **a penna**: un'etichetta e una riga su cui scrivere, alta abbastanza per
una grafia a mano.

È il caso centrale della scheda di lavorazione. La scheda esce dalla stampante con dei buchi
**apposta**: sono i valori che solo il reparto conosce (temperatura, tempo, tensioni, esito). Il
buco deve **invitare a scrivere**, non sembrare un errore di rendering o un dato che il sistema non
è riuscito a caricare.

Tre scelte, e sono tutte a servizio di quella frase:

- **La riga è una staffa a L.** La **base è nera**: è la riga su cui si scrive, deve sopravvivere
  alla fotocopia — che i grigi chiari li perde — e come oggetto grafico essenziale vuole almeno
  3:1 di contrasto, mentre `--rg-color-border-medium` su bianco si ferma a circa 2,8:1. Il tratto
  verticale sinistro resta *intermedio*, perché dice solo dove comincia. Insieme dichiarano **dove
  inizia** e **dove appoggia** la scrittura: uno spazio vuoto non lo dice, un rettangolo pieno
  sembra un campo disabilitato.
- **L'altezza è la mano, non il testo.** 32 px (~8,5 mm) è la misura di una grafia adulta; la
  variante alta porta a 48 px (~12,7 mm) per una nota di più parole. Non è l'altezza di una riga
  di testo, ed è giusto che non lo sia. Ed è un **minimo**, non una misura fissa: vedi sotto.
- **L'etichetta c'è sempre.** Un vuoto senza etichetta non è un campo: è un vuoto.

## Varianti

| Variante | Quando |
| --- | --- |
| `rg-fill-field` | **Base**: etichetta sopra, riga sotto. Il caso ordinario dentro `rg-worksheet-block__fields`. |
| `rg-fill-field--tall` | Riga alta: nota, motivazione, descrizione di una difformità. |
| `rg-fill-field--inline` | Etichetta e riga sulla stessa linea, per i campi brevi in fondo al blocco (operatore, ora). |
| `rg-fill-field--cell` | **Forma tabella**: si mette su una `<td>` di `rg-table`, dove l'etichetta sta già nella `<th>`. Trenta righe da riempire sono una tabella, non trenta campi. L'altezza la decide la tabella: se su quelle righe si scrive davvero, è [`rg-table--hand`](tables.md#tabella-su-cui-si-scrive-a-penna-rg-table--hand-proposta-1380). |
| `rg-fill-field--check` | **Casella da spuntare** (proposta 1.25.0), 20 px (~5,3 mm; 24 nella 1.25), contorno nero: «Fatta» nella tabella delle fasi della [pagina della parte](part-sheet.md). Ci va un segno di penna. Su uno `<span>` dentro una `<td>`, etichetta nella `<th>`. |
| `rg-fill-field--swatch` | **Casella quadrata** (proposta 1.23.0), ~10,6 mm di lato (40 px), contorno nero su quattro lati: il posto dove **attaccare un pezzo di filo** o segnare il colore del cono. Su uno `<span>` dentro una `<td>`, con l'etichetta nella `<th>` («Cono»). |
| `rg-fill-field--key` | **Campo chiave** (1.49.0): il numero che il foglio esiste per dire — «Pezzi da fare». Casella nera da 2 px sui quattro lati, alta 48 px e larga almeno 128, etichetta nera in grassetto **accanto**; il valore stampato (quando c'è) è mono grassetto 28 px. Uno per blocco, in testa: vedi [Il campo chiave](#il-campo-chiave-proposta-1490). |
| `rg-fill-field--wide` | **Campo largo** (proposta 1.50.0): un **valore lungo già stampato** — la cartella del programma, il nome di un file. Prende **tutta la fila** della griglia, resta **alto come un campo normale** con l'etichetta sopra, il valore è mono **12 px nero** e va a capo **fra le cartelle**. Non è `--tall`: vedi [Il campo largo](#il-campo-largo-proposta-1500). |

**Densità compatta** (proposta 1.23.0). Dentro un [`rg-worksheet-block--compact`](worksheet-block.md#fascicolo-compatto-proposta-1230)
la riga scende a **24 px** (~6,4 mm) e la cella `--cell` a 24 px; `--tall` resta 48. Nessuna classe da
aggiungere sul campo: la densità la decide il blocco. In **stampa** (1.33.0) lo stesso blocco stringe
l'**etichetta** — 10 px, senza stacco sotto — ma non tocca le righe: vedi
[Compattazione di stampa](worksheet-block.md#compattazione-di-stampa-133).

**Sul foglio l'etichetta è grigia, e i campi di una fila sono alti uguale** (1.36.0). Dentro
`rg-worksheet-block--compact` e `rg-worksheet-foot`, `rg-fill-field__label` passa a
`--rg-color-text-secondary` (6,1:1 su bianco): l'etichetta *dice* cosa scrivere, il nero è del
valore. E nella griglia dei campi la riga si prende tutta l'altezza che avanza, così una fila resta
una fila anche quando un valore va a capo. Sempre deciso dal blocco, mai dal campo: vedi
[I campi in quattro colonne](worksheet-block.md#i-campi-in-quattro-colonne-e-la-sotto-operazione-che-si-vede-1360).

**Sul foglio la nota porta l'etichetta dentro il riquadro** (1.37.0). Solo `--tall`, e solo dentro
`rg-worksheet-block__fields` o come `rg-worksheet-foot__note`: l'etichetta va in **alto a sinistra**,
dentro. La fascia sopra il riquadro non è spazio da scrivere e sul foglio era l'ultimo serbatoio
rimasto (~12 px per riquadro, quattro riquadri per pagina). Il riquadro alto è l'unico che può
ospitare la propria etichetta senza perdere niente, e per una ragione di forma: **la scrittura
appoggia sulla base nera**, quindi l'angolo in alto a sinistra è la zona morta del campo. Il riquadro
resta 48 px e sotto l'etichetta ne restano 35, cioè più dei 32 di una grafia adulta — la riga che il
campo prometteva resta intera. In un campo da 24 px l'etichetta dentro mangerebbe la scrittura, e lì
**resta sopra**. Lo decide sempre il contenitore, mai il campo: nei moduli a schermo non cambia
niente. Vedi [worksheet-block.md § La nota con l'etichetta dentro](worksheet-block.md#la-nota-con-letichetta-dentro-il-riquadro-1370).

**Nel piede del gruppo il campo non si compatta.** Sotto il blocco, dentro
[`rg-worksheet-foot`](worksheet-foot.md), le righe restano quelle della base e la nota sale a 80 px
(64 fino alla 1.36.0, più la fascia dell'etichetta che ora le sta dentro): è l'unico posto in cui si
scrive davvero a mano, e le due righe che promette restano due.

### Il campo chiave (1.49.0)

> «Quanti pezzi è un'indicazione da scrivere in fase di ricamo per indicare quanti pezzi devono
> essere realizzati. Va in testa e molto evidente.» — Lorenzo, 2026-10-23

Un campo come gli altri — etichetta più spazio da scrivere — che però **non è uno fra tanti**: è il
numero che chi prende in mano il foglio deve vedere per primo, dopo il nome della lavorazione.
`rg-fill-field--key` lo dice con la forma, non con il colore:

- **Una casella, non una riga.** La staffa a L della base dice «qui si scrive»; il contorno nero da
  **2 px sui quattro lati** dice «questo è *il* numero del foglio». Nero pieno: deve sopravvivere alla
  fotocopia, che i grigi chiari li perde.
- **Alta 48 px (~12,7 mm), larga almeno 128 (~34 mm).** La misura di `--tall`: una cifra scritta
  *grande*, non una sigla; quattro cifre a mano ci stanno senza stringerle.
- **Il valore stampato** (quando l'app lo sa) è **mono, grassetto, 28 px**, centrato, cifre tabulari:
  la stessa misura di `rg-worksheet-block__work`, non di più — è il secondo della testata, non il primo.
- **L'etichetta è forte**: nera, grassetto, 14 px, maiuscola, **accanto** alla casella e non sopra.
  Accanto perché così la testata del blocco **non si alza** (la sua altezza la detta il QR, 64 px in
  stampa): misurato in Chrome su A4, testata alta 73 px con il campo e 73 senza.
- **Vuoto è un campo, non un errore**: la casella tiene la sua misura anche senza niente dentro.
- **Dove sta**: in [`rg-worksheet-block__head`](worksheet-block.md#il-campo-chiave-in-testa-proposta-1490),
  fra titolo e QR. Fuori dalla testata è un campo in fila come gli altri (`inline-flex`).
- **Dentro il blocco compatto non si compatta**: i selettori portano `.rg-fill-field` davanti e
  battono le regole del foglio (etichetta grigia da 10 px in stampa, riga da 24).
- **Uno per blocco.** Due campi chiave sono zero campi chiave: se un secondo valore sembra altrettanto
  importante, va nei campi del corpo.

### Il campo largo (proposta 1.50.0)

> La cartella del programma: «intera, più piccola». — Lorenzo, 2026-10-26

Alcuni valori che l'app stampa sul foglio sono **lunghi per natura** e non si possono accorciare: il
percorso di rete della cartella del programma (100–150 caratteri,
`\\SRV01\CONDIVISA\_2026\CAMPIONARIO\DIOR\RIVIERA 27\DONNA\PELLETTERIA\OBLIQUE BRODERIE ANGLAISE\S2504\OTLAS`)
o il nome del file. In un quarto di griglia un percorso così va a capo su sette righe e alza la fila
intera; tagliato non serve, perché chi lo legge lo deve ritrovare. `rg-fill-field--wide`:

- **Prende tutta la fila**: `grid-column: 1 / -1` in qualunque griglia di campi
  (`rg-worksheet-block__fields`, compatta o no). Fuori da una griglia non fa niente.
- **Resta alto come un campo normale**: nessuna altezza propria, vale quella del contenitore (24 px nel
  blocco compatto, 32 fuori). **Non è `--tall`**, che è la riga da penna della nota: qui non si scrive
  una frase, si legge un dato. L'etichetta sta **sopra**, come per gli altri campi.
- **Il valore è più piccolo e nero**: mono **12 px** (`--rg-font-size-xs`, contro i 14 dei valori
  accanto), `--rg-color-text-primary`. Niente grigi: deve reggere la fotocopia.
- **Va a capo fra le cartelle, non dentro i nomi.** L'app mette `<wbr>` dopo ogni barra rovesciata; il
  CSS non lo impedisce (white-space normale, nessun `word-break: break-all`, nessuna sillabazione — un
  trattino inventato dentro un percorso è un percorso sbagliato). Un nome viene spezzato solo se **da
  solo** è più largo dell'intera fila (`overflow-wrap: anywhere` della base).
- **Una riga sta dove stanno le altre**: nel blocco compatto il valore è allineato in basso come
  quello dei campi accanto. Misurato in Chrome, A4, blocco compatto, stampa: con una riga il campo è
  **24 px** come gli altri, con due **33 px**; il percorso di 150 caratteri sta in **due righe** (~100
  caratteri per riga a 12 px sulla giustezza di 186 mm, misurato con il mono di ripiego).
- **Vuoto** (modulo in bianco) è una riga da scrivere larga tutta la fila, alta 24.
- **Maiuscolo, come tutto il foglio**: il valore esce in maiuscolo (`text-transform` del foglio,
  1.33.0). Per un percorso di rete Windows non cambia niente, i nomi non distinguono maiuscole e
  minuscole.

**Perché `display: block` e non flex.** Nel blocco compatto la riga è un flex che allinea il valore in
basso. Ma in un flex **ogni elemento figlio diventa un pezzo a sé** e gli spazi accanto spariscono
(misurato in Chrome: «PRIMA `<b>`parte`</b>` DOPO» esce PRIMAPARTEDOPO); il `<wbr>` Chrome lo tratta
come testo, la specifica come un elemento. Un valore lungo è **testo** e deve scorrere come testo: in
blocco lo fa, e `align-content: end` (allineamento dei blocchi, Chrome 123+: il motore che stampa il fascicolo) lo
tiene in basso. Un motore che non lo sa mette il valore in alto dentro la stessa riga: niente si
sovrappone e niente si perde.

**Per quali campi.** Cartella e File, su tutti i fogli. Non per un valore che è lungo *per caso*
(«SABBIATRICE MANUALE · BANCO SOFFIATURA» va a capo nel suo quarto e va bene così): il campo largo
costa una fila intera, e si spende solo dove il valore non può essere accorciato.

## Uso e limiti

**Non è un controllo: è carta.** Non ha `input`, non ha focus, non ha stato di errore, non ha sola
lettura — e non deve averli. Se lo stesso dato si raccoglie **a schermo**, il componente è
`rg-field`, che ha tutto questo per davvero. Un `rg-fill-field` in una pagina interattiva è quasi
sempre un errore: sta chiedendo a qualcuno di scrivere dove non si può scrivere.

**Conseguenza sull'accessibilità.** Il componente descrive un artefatto stampato, quindi in lettura
assistita porta la sola etichetta: non c'è un campo da annunciare perché non c'è un campo. È
coerente col supporto — ma è anche la ragione per cui la versione a schermo della stessa scheda
**deve** usare `rg-field`, non questo.

**L'unità sta con l'etichetta.** `rg-fill-field__unit` è mono e minuscolo dentro l'etichetta
maiuscola: chi scrive «180» deve vedere accanto «°C» senza risalire all'intestazione (regole §8).
L'unità è del DS solo come posizione e stile; quale unità sia lo dice l'app.

**La cella da riempire si distingue dalla cella piena.** Dentro una `rg-table`, `--cell` alza la
riga all'altezza della scrittura e le mette la stessa **base nera**: a colpo d'occhio si vede quali
colonne sono già stampate (filetto neutro della tabella) e quali aspettano la penna. Il
modificatore ripristina `display: table-cell` (la base è `block`): non funziona su un `<div>`
dentro la cella, va sulla `<td>` stessa. Il selettore è qualificato `td.rg-fill-field--cell` di
proposito — `.rg-table td` pesa (0,1,1) e con la sola classe il filetto della tabella vincerebbe.

**Ma l'altezza di una cella non la decide il campo: la decide la tabella** (1.38.0). Dentro un blocco
compatto `--cell` vale 24 px, che è la misura del *dato denso* e non della mano: bastano per una
sigla, non per una nota scritta mentre la macchina lavora. Quando la tabella è un **modulo da
compilare riga per riga** — la tabella degli stop del foglio del ricamo — le righe salgono a 40 px
(~10,6 mm) e a dirlo è [`rg-table--hand`](tables.md#tabella-su-cui-si-scrive-a-penna-rg-table--hand-proposta-1380)
sulla `<table>`, non una classe in più su ogni cella. È lo stesso principio della densità compatta,
al contrario: **lo decide il contenitore**, e per una ragione pratica — in una riga da riempire
metà celle sono `--cell` e metà portano un dato stampato, e devono essere alte uguale.

**La casella non è una riga.** `--swatch` non si scrive: ci si appoggia qualcosa (un capo di filo con
il nastro, un segno di pennarello). Per questo è chiusa su quattro lati, mentre la riga è una staffa
aperta. Da sola non dice niente: l'etichetta sta nella colonna, e accanto restano **codice e nome del
colore** stampati (regole §10: mai riconoscimento solo cromatico).

**Il valore lungo va a capo, e non finisce sopra l'etichetta** (1.33.0). La riga porta spesso un
valore **già stampato dall'app**, e un valore lungo — «SABBIATRICE MANUALE · BANCO SOFFIATURA» — va a
capo dentro il riquadro. Con un'altezza *fissa* la seconda riga di testo usciva **da sopra** il
riquadro e finiva stampata addosso all'etichetta: due scritte sovrapposte, illeggibili sulla carta.
L'altezza è quindi un `min-height` e non un `height`. La misura dichiarata resta un **minimo** —
l'altezza della scrittura a mano, che è la ragione per cui il componente esiste — e il campo
**cresce** quando il testo chiede una riga in più: costa qualche millimetro di pagina solo dove
serve, e solo per non perdere un'informazione. Vale per la base, per `--tall` e per la densità
compatta. Completano la cosa `overflow-wrap: anywhere`, per il codice lungo che non ha spazi dove
andare a capo, e — nel blocco compatto, dove il valore è allineato in basso — l'interlinea stretta
invece di 1, altrimenti le due righe di testo si toccano. Nella stessa fila i campi restano
allineati **sul fondo**: le basi nere su cui si scrive cadono tutte sulla stessa linea anche quando
un valore ne occupa tre.

**Il valore stampato ha aria** (proposta 1.25.0). Dentro un blocco compatto, il valore già noto scritto nella
riga («150», «ZSK 12 teste») sta a 8 px (~2 mm) dal filo sinistro e 6 px (~1,6 mm) sopra la base, mono a 14,
senza alzare la riga.

**Quanti buchi.** Un blocco tutto buchi non è una scheda, è un modulo in bianco: quello che il
sistema sa già va **stampato**, non lasciato all'operatore. La regola pratica è che il valore noto
si stampa come dato (`rg-key-value`, `rg-table`) e solo il valore rilevabile in reparto diventa un
`rg-fill-field`.

## Struttura

Base — etichetta con unità e riga:

```html
<div class="rg-fill-field">
  <span class="rg-fill-field__label">Temperatura <span class="rg-fill-field__unit">°C</span></span>
  <span class="rg-fill-field__line"></span>
</div>
```

Alta — una nota scritta a mano:

```html
<div class="rg-fill-field rg-fill-field--tall">
  <span class="rg-fill-field__label">Difformità rilevate</span>
  <span class="rg-fill-field__line"></span>
</div>
```

In linea — firma e ora nel piede del blocco:

```html
<div class="rg-fill-field rg-fill-field--inline">
  <span class="rg-fill-field__label">Operatore</span>
  <span class="rg-fill-field__line"></span>
</div>
```

Forma tabella — righe da riempire, intestazione già stampata:

```html
<table class="rg-table rg-table--compact">
  <thead>
    <tr><th scope="col">#</th><th scope="col">Capo</th><th scope="col">Tensione (cN)</th><th scope="col">Esito</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="rg-table__code">01</td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
    </tr>
    <tr>
      <td class="rg-table__code">02</td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
    </tr>
  </tbody>
</table>
```

Campo chiave — in testa al blocco, vuoto da scrivere o con il valore stampato:

```html
<div class="rg-fill-field rg-fill-field--key">
  <span class="rg-fill-field__label">Pezzi da fare</span>
  <span class="rg-fill-field__line"></span>
</div>
<div class="rg-fill-field rg-fill-field--key">
  <span class="rg-fill-field__label">Pezzi da fare</span>
  <span class="rg-fill-field__line">1200</span>
</div>
```

Campo largo — la cartella del programma e il file, nella griglia dei campi; `<wbr>` dopo ogni barra
rovesciata, lo mette l'app. Vuoto, è la riga da scrivere larga tutta la fila:

```html
<div class="rg-worksheet-block__fields">
  <div class="rg-fill-field rg-fill-field--wide">
    <span class="rg-fill-field__label">Cartella</span>
    <span class="rg-fill-field__line">\<wbr>\<wbr>SRV01\<wbr>CONDIVISA\<wbr>_2026\<wbr>CAMPIONARIO\<wbr>DIOR\<wbr>RIVIERA 27\<wbr>DONNA\<wbr>PELLETTERIA\<wbr>OBLIQUE BRODERIE ANGLAISE\<wbr>S2504\<wbr>OTLAS</span>
  </div>
  <div class="rg-fill-field rg-fill-field--wide">
    <span class="rg-fill-field__label">File</span>
    <span class="rg-fill-field__line"></span>
  </div>
</div>
```

Casella quadrata — il cono della legenda, con codice e colore stampati accanto:

```html
<table class="rg-table rg-table--compact">
  <thead>
    <tr><th class="rg-table__numeric" scope="col">Ago</th><th scope="col">Codice filo</th><th class="rg-table__grow" scope="col">Colore</th><th scope="col">Cono</th></tr>
  </thead>
  <tbody>
    <tr>
      <td class="rg-table__numeric">1</td>
      <td class="rg-table__code">MAD-1800</td>
      <td>Bianco ottico</td>
      <td><span class="rg-fill-field rg-fill-field--swatch"></span></td>
    </tr>
  </tbody>
</table>
```
