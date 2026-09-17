# Dept band (banda di reparto)

## Scopo

La banda che, sul bordo di un blocco di lavorazione, dice **a quale reparto appartiene questo
foglio**. Serve a trovarlo nel mucchio e a smistarlo, non a decorarlo.

Il vincolo che decide la forma: **il foglio viene quasi sempre fotocopiato in bianco e nero**, e il
colore si perde. Quindi la banda porta **tre segnali ridondanti**, sempre tutti e tre:

| Segnale | Cosa fa | Cosa gli succede in fotocopia |
| --- | --- | --- |
| **(a) Colore** | acceleratore: trovare il foglio a colpo d'occhio | si perde, o diventa un grigio ambiguo |
| **(b) Nome** in maiuscolo sulla banda | l'informazione, in chiaro | resta, ma va letto |
| **(c) Figura** (la trama) | riconoscimento immediato senza leggere | **resta intatta** |

Il colore è un acceleratore, **mai** l'unica informazione — è la regola generale del DS («nessuno
stato dipende dal solo colore», regole §4) applicata a un supporto che il colore lo perde davvero.

## Il criterio della figura: riconoscibile, non distinguibile

Questa è la parte che non si vede da dentro il design system, ed è arrivata dal reparto.

Sette trame geometriche qualsiasi sono **distinguibili**: messe in fila, si vede che sono sette
cose diverse. Ma una trama arbitraria va poi **imparata a memoria** — chi pesca il foglio dal
mucchio dovrebbe ricordarsi che il tratteggio a 45° era la stampa. Una trama che **evoca il lavoro
del reparto** si riconosce al primo colpo e non si impara: si capisce.

Da qui la regola: **la figura nomina il reparto**. I pois sono strass. Le croci sono il punto
croce. Le due linee appaiate sono due strati accoppiati. La bandiera a scacchi è il traguardo, e
il finissaggio è l'ultimo reparto.

E da qui la regola derivata, che è quella operativa: **due reparti non stanno mai nella stessa
famiglia di segno**. Le famiglie in uso sono croci, gocce-raggi e linee, piastre col filo, pois,
scacchiera, diagonale, coppie. Il **verso** di una diagonale, dopo una fotocopia e a dimensione di banda, non è
una differenza — è l'errore della prima versione, dove stampa (45°, sottile) e pressatura (−45°,
spessa) si confondevano. E non lo è nemmeno il **tono**: il reticolo ortogonale del finissaggio era
fatto di barre verticali come gli accoppiaggi e si distingueva solo perché più scuro, che in
fotocopia spinta non è una differenza. Il tono non fonda una famiglia.

## Varianti

| Variante | Reparto | Trama (la striscia della tessera) | Passo | Perché quella |
| --- | --- | --- | --- | --- |
| `rg-dept-band--ricamo` | Ricamo | croci da 6 in due file, luce 4 | 10 | è il **punto croce** |
| `rg-dept-band--stampa` | Stampa, Laser e HF | goccia da 4 e raggio 2×6 alternati, sotto due linee continue | 12 | una **goccia d'inchiostro** e una **punta di laser**, e le **due linee** della stampa: i mestieri sono due e la figura li nomina entrambi |
| `rg-dept-band--pressatura` | Pressatura e soffiatura | piastre 4×4 sopra e sotto, luce 2, filo continuo in mezzo | 6 | sono le **piastre** della pressa, col **materiale** stretto fra le due |
| `rg-dept-band--strass` | Strass e applicazioni | pois da 4 in tre file, la fila di mezzo sfalsata di 3 | 6 | **sono strass** |
| `rg-dept-band--finissaggio` | Finissaggio e Controllo Qualità | scacchiera da 4 | 8 | è la **bandiera a scacchi**: il traguardo, ed è l'ultimo reparto |
| `rg-dept-band--incollature` | Incollature | fasce diagonali a gradini di 2 | 8 | sono le **strisciate della spalmatura** |
| `rg-dept-band--accoppiaggi` | Accoppiaggi | coppie di linee da 2, luce 2, fra le coppie 4 | 10 | accoppiare è **unire due strati** |

| Modificatore | Quando |
| --- | --- |
| `rg-dept-band--quiet` | **A schermo** (v1.16.0), insieme a una delle sette: la stessa trama, in grigio (`neutral-400`). A schermo il colore del reparto convive con i colori di stato, e `category-3/4/5` sono `danger`, `warning` e `success`. Mai su carta, dove il colore serve. In linea, la stessa figura è la tessera [`rg-dept-mark--quiet`](dept-mark.md). |

Senza variante la banda esiste comunque: filetto nero, nessuna trama. È il caso «Reparto da
assegnare», e si legge come tale.

**Fascia del blocco della fase** (`rg-phase-panel__band`, 1.19.0; **a schermo superata dalla
1.20.0**: subito sotto le linguette si leggeva come il loro bordo). Resta nel CSS: la trama vi sta sulla
mezzeria con il margine laterale della testa (`--rg-dept-inset` a 24, 16 sotto i 680 px). **Sul foglio
stampato la banda resta**, ed è lì che si usa.

Il nome della variante apre con il **lavoro prevalente** del reparto, non con la macchina più
vistosa: `--stampa`, non `--laser`.

## La trama è la tessera (proposta 1.21.1)

Richiesta, dopo il rilascio della 1.21.0: *«allinea però i nuovi loghi per essere pattern da usare sulle
testate dei reparti nelle schede»*. Fino alla 1.21.0 la fascia aveva figure sue (croci a 45° a passo 24,
piastre 16×12, due registri da 30 px), mentre la tessera [`rg-dept-mark`](dept-mark.md) era disegnata
sui pixel: due segni per lo stesso reparto.

**La forma.** La fascia porta **la stessa striscia della tessera**:
- gli stessi elementi (croce da 6, tondo da 4, piastra 4×4, linea da 2), lo stesso tratto 2, la stessa
  luce;
- alta 16 come il campo della tessera, sulla mezzeria della fascia (a y intera: 10 px in una fascia da
  38);
- ripetuta in orizzontale col **passo del motivo** (tabella sopra).

Non la tessera intera ripetuta: fra due tessere ci sarebbero 4 px di luce in più, e la fascia si
leggerebbe come una fila di francobolli invece che come una trama. Accanto, tessera e fascia si
riconoscono come lo stesso segno (vetrina: *La fascia accanto alla sua tessera*).

**Le estremità.** La larghezza della striscia è **arrotondata al passo** (`round()`): la trama finisce
sempre con un elemento intero, qualunque sia la larghezza del foglio. La fila di mezzo degli strass ha un
passo in meno, così finisce intera anche lei. Senza `round()` (browser precedenti) la striscia resta larga
quanto la fascia: stesso disegno, ultimo elemento tagliato.

**Nome e nota restano sopra**, su targhetta bianca, con **4 px di bianco intorno** (`outline`, che non
cambia l'altezza): la trama passa sotto l'etichetta e si legge coperta, non tagliata. Limite: accanto al
margine bianco può restare visibile uno spicchio dell'elemento coperto, perché dove cade dipende dalla
larghezza del nome.

**Perché `repeating-linear-gradient` e non la maschera SVG della tessera.** La scheda si stampa dal
browser (`window.print`). Provato con `Page.printToPDF` di Chrome e rasterizzato con PDFium (il motore di
Chrome) a 600 dpi:
- la **maschera SVG** e un **gradiente a tessere ripetute** diventano bitmap: sulla carta la trama esce
  sfocata, con fili grigi ai bordi del bitmap;
- un **`repeating-linear-gradient` orizzontale** per fila di pixel, largo quanto la striscia, resta una
  sfumatura **vettoriale**: croci, gocce e linee nette a qualunque risoluzione. A schermo cade sui pixel lo
  stesso (verificato a DPR 1 e 2).

Stop in forma esplicita (colore-inizio, colore-fine). Le coordinate in px sono il disegno, non misure di
layout: eccezione dichiarata (regole §12). MuPDF, per inciso, campiona male queste sfumature (anche le
figure 1.21.0): per giudicare la stampa serve PDFium o la stampa vera.

**Altezza, fotocopia, stampa: invariate.** Fascia da 38 px sul foglio (targhetta 28, padding 4, filetto 2),
nome e nota come prima, `print-color-adjust: exact` in `rg-utilities.css`. In fotocopia con contrasto spinto
le trame tengono; **incollature e accoppiaggi** escono grigio medio, perché usano i valori più chiari della
palette: come con le figure precedenti, sono le prime da guardare su una macchina nuova.

**La trama pesa meno di prima.** Le figure 1.21.0 occupavano 24–32 px della fascia; la striscia ne occupa
16, con 10 px d'aria sopra e sotto. Il nome e il filetto non cambiano; la trama si riconosce per figura,
non per massa.

## Uso e limiti

**Il nome è contenuto, non CSS.** `rg-dept-band__name` è testo nel markup, non `content:` generato.
Se il CSS non arriva — mail, export, un PDF renderizzato male — la parola resta. La targhetta è
bianca opaca con filetto nero perché il nome deve restare leggibile **sopra qualsiasi figura**. Si
scrive «Reparto» e il **nome del reparto** («Reparto Pressatura e soffiatura»), mai lo slug della variante.
**Sempre in maiuscolo** (proposta 1.21.1, *«REPARTO e NOME REPARTO sempre scritto in maiuscolo ovunque,
schede che interfacce»*): `rg-dept-band__name` lo garantisce in CSS, «Reparto da assegnare» compreso. Nel
markup il testo resta in tondo. La stessa regola a schermo è in [dept-mark](dept-mark.md#uso-e-limiti).

**Il maiuscolo è ammesso qui** perché è una micro-label identitaria di due o tre parole, come
`rg-label`. Le regole vietano il maiuscolo in *paragrafi e tabelle dense* (§2), non su un'etichetta.

**La trama è una campitura, non decorazione.** Tecnicamente è un gradiente a stop netti, ma porta
informazione ed è l'unico segnale che sopravvive alla fotocopia. Eccezione dichiarata alle regole §2,
ambito: documenti stampati (regole §12).

**In stampa serve `print-color-adjust`.** I browser per default non stampano gli sfondi: senza la
riga in `rg-utilities.css` la banda arriverebbe sulla carta con due segnali su tre spenti. È già
gestito dal DS, l'app non deve fare nulla.

**Le coppie da tenere d'occhio.** Pressatura e finissaggio sono tutte e due a blocchi: si separano per
**disposizione** (piastre allineate attorno a un filo continuo, contro quadretti sfalsati senza filo).
Strass e ricamo sono tutti e due a elementi piccoli in file: tondi contro croci.

**Storico: mai una figura ancorata ai bordi** (revisione dopo la 1.19.0). La prima pressatura erano due
dorsi pieni in alto e in basso: nella fascia da 48 px del blocco della fase si leggeva come una cornice.
Un segno continuo da bordo a bordo è un bordo, non una figura. La striscia 1.21.1 sta sulla mezzeria e non
tocca né il bordo alto né il filetto.

**Come si aggiunge una figura.** Si disegna prima la **tessera** (campo 16×16, tratto 2, elementi interi:
[dept-mark](dept-mark.md)), poi la sua **striscia**: una fila di elementi interi alta 16, con la luce della
tessera e il suo passo. La variante dichiara `--rg-dept-color` (il filetto e la trama), `--rg-dept-passo`,
e gli strati `--rg-dept-trama`, `--rg-dept-trama-size`, `--rg-dept-trama-pos` (una fila di pixel = uno
strato `repeating-linear-gradient(90deg, …)` alto quanto la fila); `--rg-dept-trama-mezzo` (con `-size` e
`-pos`) solo se una fila è sfalsata di mezzo passo. Il generatore usato per le sette è descritto nel
CHANGELOG 1.21.1. `--rg-dept-pattern`, `-size`, `-position` e `-repeat` restano lette dalla regola base per
compatibilità, ma nessuna variante le usa più.

**Il colore riusa la palette categoriale** `--rg-color-category-1…7`, che a sua volta è un alias di
valori già in palette: nessun colore nuovo entra nel brand. **Conseguenza da conoscere**:
`category-3/4/5` valgono quanto `danger`, `warning` e `success`. Su una scheda di lavorazione
stampata non c'è nessun colore di stato accanto, e il nome del reparto è scritto sulla banda,
quindi una banda rossa non si legge come «errore». **Non** mettere `rg-dept-band` in una vista a
schermo dove convivono alert e badge di stato senza aver deciso cosa succede a quella lettura.

**Il legame con l'organigramma è dichiarato.** Le sette varianti hanno il nome dei sette reparti RG
perché sono sette e sono stabili, e perché in un template il nome parla mentre un numero no. Se
nasce un ottavo reparto si aggiunge un'ottava variante — con una figura di una famiglia di segno
non ancora usata. La mappa reparto → variante vive nell'app, non in un `if` sparso nel markup.

**Non è un badge.** `rg-badge` classifica un record dentro una lista a schermo; questa è
un'intestazione di appartenenza sul bordo di un documento. Non ha stati, non è interattiva.

## Struttura

```html
<p class="rg-dept-band rg-dept-band--strass">
  <span class="rg-dept-band__name">Reparto Strass e applicazioni</span>
  <span class="rg-dept-band__note">Foglio 5 / 7</span>
</p>
```

Come primo figlio di un blocco di lavorazione, a filo dei suoi bordi:

```html
<section class="rg-worksheet-block">
  <p class="rg-dept-band rg-dept-band--stampa">
    <span class="rg-dept-band__name">Reparto Stampa, Laser e HF</span>
    <span class="rg-dept-band__note">Foglio 2 / 6</span>
  </p>
  <header class="rg-worksheet-block__head">…</header>
</section>
```
