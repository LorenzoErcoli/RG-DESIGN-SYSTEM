# Worksheet block (blocco di lavorazione stampabile)

## Scopo

L'unità **stampabile** di una fase di lavorazione: quello che oggi è un foglio cartaceo che esce
dalla stampante, va in reparto, viene compilato a penna dall'operatore e torna in ufficio prodotto.
Un prodotto ha più parti, ogni parte ha più fasi, ogni fase appartiene a un reparto: **un blocco =
una fase**.

Due decisioni portano tutto il resto:

1. **Non occupa una pagina intera.** La maggior parte delle fasi ha poco da dire. I blocchi si
   impaginano uno dopo l'altro finché entrano, così la carta non si spreca. Il blocco non dichiara
   nessuna altezza: è alto quanto il suo contenuto.
2. **Non si spezza mai fra due pagine.** In reparto il retro del foglio non lo gira nessuno, e
   mezzo blocco è peggio di mezza pagina bianca. Il blocco che non entra scende **intero** alla
   pagina successiva.

La paginazione vive in `styles/rg-utilities.css`, dentro l'unico `@media print` del DS: nessuna app
riscrive il proprio.

## Varianti

| Variante | Quando |
| --- | --- |
| `rg-worksheet-block` | **Normale**: la fase ordinaria, alta quanto il suo contenuto, mai spezzata. |
| `rg-worksheet-block--long` | **Lunga**: la fase con una tabella di trenta righe, che una pagina se la prende tutta. Apre una pagina nuova invece di lasciarsi dietro un buco; se è il primo blocco del documento non apre una pagina vuota prima. |
| `rg-worksheet-block--continued` | **Continua il precedente** (1.27.0): la fase successiva di un gruppo di fasi collegate, nello stesso reparto, senza banda e senza piede. Si attacca al blocco sopra con un solo filetto. Vedi [Blocco che continua](#blocco-che-continua-il-precedente-1270). |
| `rg-worksheet-block--compact` | **Compatta** (proposta 1.23.0): la densità del **fascicolo** che va in reparto. Righe da scrivere più basse, spaziature ridotte, colonne strette, piede su una riga, banda più bassa. Si combina con `--long`. Vedi [Fascicolo compatto](#fascicolo-compatto-proposta-1230) e [Compattazione di stampa](#compattazione-di-stampa-133). |

`--long` non cambia nulla a schermo: è **solo** una regola di paginazione. Non usarla per "dare
importanza" a una fase — l'importanza non è una proprietà della carta.

| Elemento | Quando |
| --- | --- |
| `rg-worksheet-block__role` | **Fase di un gruppo di fasi collegate** (v1.16.0). Nella testa, dopo il titolo: «Principale · con la 03», «Collegata · dopo la 02». |
| `rg-worksheet-block__phase` | **La fase in primo piano** (proposta 1.23.0): «Fase 2 di 3 · Pressatura», 20 px. Il titolo del blocco. Prende il posto di `__index` + `__title`. |
| `rg-worksheet-block__part` | **La parte**, sotto la fase per misura (14 px): «Parte 1 di 4 · FONDO BORDATO», con la pastiglia [`rg-part-mark`](part-mark.md) davanti se c'è. |
| `rg-worksheet-block__step` | **Testa 1.25.0**: «FASE 1 DI 3» piccolo, in cima, **sopra** la banda, che così si stacca dai bordi e cresce. |
| `rg-worksheet-block__work` | **Testa 1.25.0**: la lavorazione, 28 px, grassetto, maiuscolo («RICAMO»). Titolo del blocco. |
| `rg-worksheet-block__op` | Sottotitolo di un'**operazione** nel corpo («Piazzamento»): 14 px, grassetto (1.36.0), filetto sopra — non dentro `--compact`. |

### Ruolo nel gruppo (`__role`)

Il foglio di una fase collegata va in reparto da solo, a volte in un altro reparto rispetto alla sua
principale. Deve dire a chi lo prende in mano che quella fase ne segue un'altra, o ne precede
un'altra.

- **Stesse parole dell'elenco** ([`rg-step__role`](steps.md#gruppo-di-fasi-collegate-rg-steps--grouped)),
  con i numeri scritti come sul foglio (`02`).
- **Il blocco porta il suo pezzo di graffa**: un filo nero spesso a sinistra dell'etichetta. Nell'elenco
  la graffa unisce le righe; sul foglio i blocchi di un gruppo possono finire su due pagine, quindi
  ogni blocco dice il gruppo per conto suo. **Dalla 1.34.0** questo vale per il ruolo *in fila*
  (testa 1.23): nella testa 1.25 il ruolo sta **sotto** il titolo e la graffa sparisce, perché fra
  due righe non separerebbe niente — vedi [Testata a tre zone](#testata-a-tre-zone-e-il-foglio-in-maiuscolo-1340).
- **Niente fondo pieno**: il browser non stampa gli sfondi per default, e un'etichetta invertita
  uscirebbe bianca su bianco. **Niente riquadro**: il riquadro è il segno di `rg-dept-band__name`, e il
  ruolo non deve leggersi come un reparto.
- La relazione completa (titolo della principale) resta in `__meta`: «fase 3 di 4 · dopo
  Pressatura (fase 2)».

## Fascicolo compatto (proposta 1.23.0)

Richiesta dal reparto, via piattaforma: COCOTTE (4 parti, 12 fasi) usciva in **17 pagine A4**, quasi
tutte piene per metà. Lorenzo: *meno carta, la FASE sempre chiara e più evidente del reparto, spazi da
scrivere più piccoli*. Si stampa fronte/retro. Tutto **opt-in**: senza `--compact` il blocco resta com'era.

Il fascicolo compatto è fatto di quattro pezzi, che si usano insieme:

| Pezzo | Classe | Doc |
| --- | --- | --- |
| La testata di parte, in linea: apre la pagina, i blocchi scorrono sotto | `rg-worksheet-part` | [worksheet-part](worksheet-part.md) |
| Il blocco della fase, in densità compatta | `rg-worksheet-block--compact` | qui |
| Il riquadro da ritagliare (legenda coni) | `rg-cutout` | [cutout](cutout.md) |
| La pagina bianca per allineare le parti al recto | `rg-blank-page` | [blank-page](blank-page.md) |

### Le misure

| Cosa | Normale | Compatto |
| --- | --- | --- |
| Riga da scrivere `rg-fill-field__line` | 32 px (~8,5 mm) | **24 px (~6,4 mm)** |
| Riga alta `--tall` | 48 px (~12,7 mm) | 48 px, invariata: una nota di più parole non si comprime |
| Cella da compilare `td.rg-fill-field--cell` | 32 px + 8 sopra e sotto | **24 px**, 2 sopra e sotto |
| Testa · corpo · piede | 12/16 · 16 · 12/16 | **8/12** tutti e tre |
| Griglia `__fields` | colonne ≥ 132 px, *auto-fit* (tre campi riempiono la pagina) | **quattro colonne fisse** (1.36.0; fino alla 1.35.0 colonne ≥ 128 px in *auto-fill*): tre campi restano stretti a sinistra |
| Banda di reparto | 38 px | **30 px**: la striscia della trama resta 16 px e comincia dopo il nome (1.35.0) |
| Distanza fra blocchi | 16 | 8 |

Le basi delle righe restano **nere** e la trama resta intera: il fascicolo si fotocopia in bianco e nero,
ed è lì che si legge (verificato con PDF di Chrome, anche in scala di grigi a contrasto spinto).

### Testa: la fase in primo piano

Gerarchia per **misura**, non per colore né per posizione: **fase** (`__phase`, 20 px) › **parte**
(`__part`, 14 px) › **reparto** (nome sulla banda, 12 px maiuscolo). Sulla stessa riga dove ci sta, con
l'identità del prodotto (`__meta`) a destra; se non ci sta, va a capo il `__meta`.

- «Fase **N di M**» si conta **dentro la parte** («Fase 2 di 3»), perché il foglio si legge con la parte in
  mano. Il contatore dei fogli del fascicolo va nella nota della banda: «Foglio 5 / 12».
- In `__phase` il **nome della lavorazione** («Pressatura»), non la parte: prima il titolo portava la parte e
  la lavorazione stava in un'etichetta sopra, e la parola più grande del foglio era la stessa su tutti i
  fogli della parte.
- `__part` porta la pastiglia `rg-part-mark` (facoltativa, `aria-hidden`) accanto al nome scritto.
- `__role` resta valido, dopo `__part`.

### Campi e piede

- Nella griglia i campi sono **alti uguale**: le righe da scrivere chiudono tutte sulla stessa linea
  (dalla 1.36.0 si alzano anche insieme; prima erano solo allineate sul fondo).
- Un `rg-fill-field--tall` nella griglia prende **la fila intera**.
- Il **piede** sta su una riga dove ci sta: Tempo, Operatore, Data in `--inline` (etichetta + almeno 64 px di
  riga), la Nota in `--inline --tall` per ultima, che prende il resto. Se l'etichetta della nota è lunga
  («Note e proposte per l'ufficio prodotto») il piede va a capo: scrivere «Note».
- Le utility di margine hanno `!important` e non si comprimono: dentro un blocco compatto usare
  `rg-u-mt-2`, non `rg-u-mt-4`.

### Tabelle: eccezioni per stop

**A griglia** (proposta 1.24.0): **`rg-table rg-table--compact rg-table--grid`** con
**`td.rg-fill-field--cell`** dentro un blocco `--compact`. La 1.23.0 indicava la sola `rg-table--compact`:
stampata, le righe vuote avevano solo il filo in basso e si leggevano come **righe da quaderno**, senza dire in
che colonna scrivere, e le colonne vuote prendevano larghezze a caso. Regole:

- **`--grid`**: filetto nero su tutte le celle, testata compresa, e colonne **uguali** (`table-layout: fixed`)
  che non dipendono da cosa c'è scritto. Righe da 24 px nel blocco compatto. Vedi
  [tables](tables.md#tabella-da-compilare-a-griglia-rg-table--grid-proposta-1240).
- **La colonna larga dichiara di esserlo**: `rg-table__grow` sulla `<th>` di Note, che nella griglia vale
  **il doppio** delle altre. La tabella dice quante colonne ha: `style="--rg-table-cols: 6"`.
- **Righe già scritte e righe vuote nella stessa tabella.** Il valore noto è una `<td>` normale
  (`rg-table__numeric` per i numeri); il valore da rilevare è una `td.rg-fill-field--cell`, anche dentro una
  riga scritta. Le righe vuote in fondo sono tutte `--cell`: nessun trattino, nessuno zero finto.
- **Se su quelle righe si scrive a mano, si aggiunge `rg-table--hand`** (1.38.0): le porta a 40 px
  (~10,6 mm), l'altezza di una grafia, e ne fa entrare **18 in una pagina**. Vedi
  [La tabella degli stop, riga per riga](#la-tabella-degli-stop-riga-per-riga-1380).

### Legenda dei coni

Un [`rg-cutout`](cutout.md) come **ultimo figlio del blocco**, dopo il piede: resta dentro il riquadro della
fase (non si separa dal suo foglio in stampa) e si ritaglia lungo il tratteggio. Dentro, una `rg-table
rg-table--compact` Ago · Codice filo · Colore · Metri · Cono, con la casella quadrata
[`rg-fill-field--swatch`](fill-field.md) nella colonna Cono.

### Limiti

- **La testa va a capo** quando fase, parte e prodotto non stanno su una riga (nomi lunghi): costa una riga
  per blocco, non rompe niente.
- **Il recto non lo sa il CSS.** Chrome non implementa `break-before: recto`: l'allineamento delle parti alla
  facciata dispari lo fa l'app, contando le pagine, con [`rg-blank-page`](blank-page.md).

## Fascicolo, seconda versione (proposta 1.25.0)

Dall'anteprima di Lorenzo sulla 1.24. Tutto **opt-in**: la testa 1.23.0 (`__phase`, `__part`, `__meta`)
continua a funzionare; la nuova si attiva usando `__step`.

| Pezzo | Classe | Doc |
| --- | --- | --- |
| Testa con il reparto in evidenza e la lavorazione come titolo | `rg-worksheet-block__step`, `__work` | qui |
| Sottotitolo di operazione nel corpo | `rg-worksheet-block__op` | qui |
| Pagina della parte (apre il pezzo, con QR) | `rg-part-sheet` | [part-sheet](part-sheet.md) |
| QR code | `rg-qr`, `rg-qr--small` | [qr](qr.md) |
| Foglio dei tagliandi | `rg-cutout-sheet` | [cutout-sheet](cutout-sheet.md) |
| Casella da spuntare «Fatta» | `rg-fill-field--check` | [fill-field](fill-field.md) |
| A4 con intestazione di pagina | `rg-u-print-a4--head` | qui, sotto |

### La testa: fase, reparto, lavorazione

Dentro la scheda riquadrata, dall'alto:

1. **`__step`**, piccolo: «FASE 1 DI 3» (maiuscolo dal CSS, nel markup in tondo);
2. **la banda del reparto**, subito dopo: staccata dai bordi con un margine bianco intorno, alta 38 px
   (30 nel compatto 1.23). Trama e nome come sempre, con la trama che **comincia dove finisce il nome**
   (1.35.0). La banda si stacca solo se è preceduta da `__step`: è il selettore, non una classe in più;
3. nella testa, **`__work`**: il nome della **lavorazione**, 28 px, **grassetto e maiuscolo** («RICAMO»,
   «PRESSATURA»). È il titolo del blocco.

**Niente parte e niente identità prodotto nel blocco**: stanno nell'intestazione di pagina, fuori dalla
scheda (sotto). Quindi `__part` e `__meta` non si usano nella testa nuova; `__role` sì, dopo `__work`.

Dalla **1.34.0** queste tre voci sono **tre zone staccate**, e `__role` si impagina **sotto**
`__work` invece che di fianco (il markup non cambia): vedi
[Testata a tre zone](#testata-a-tre-zone-e-il-foglio-in-maiuscolo-1340).

**Grassetto a livello di contenitore**: le regole (§3) vorrebbero 500 per il titolo di un contenitore. Qui è
700 per richiesta del reparto: la lavorazione è ciò che si cerca sul foglio da un metro. Eccezione dichiarata,
ambito: il blocco stampato.

### Il corpo: operazioni e valori

- **`__op`** è il sottotitolo di un'operazione dentro il blocco («Piazzamento», «Pressatura», «Sabbiatura
  automatica»): 14 px, **in grassetto dalla 1.36.0**, con un filetto neutro sopra che la separa dalla
  precedente (non sul primo; **dentro `--compact` il filetto non c'è**, vedi *I campi in quattro colonne*).
  Una chiosa dentro `__op` («— due passate, il tempo scritto conta doppio») va in `rg-small rg-u-muted` e
  resta a peso regolare: è una precisazione, non il titolo.
- **L'etichetta di sezione** («PARAMETRI TECNICI») si stampa solo se le sezioni sono più di una. È una
  scelta del template: il DS non ha niente da togliere.
- **Il valore stampato non tocca la riga.** Nel blocco compatto il valore già noto dentro
  `rg-fill-field__line` ha 8 px (~2 mm) d'aria a sinistra e 6 px (~1,6 mm) sotto, in mono tabulare a 14. La
  riga resta alta 24. Nelle celle di tabella lo stesso respiro sotto (righe da 26 px, ~6,9 mm).

### Intestazione di pagina

Chrome non ripete un elemento su ogni pagina: l'intestazione la stampa l'app **sul PDF**, dopo
l'impaginazione (PyMuPDF). Il DS riserva lo spazio: **`rg-u-print-a4--head`** sul contenitore che stampa (al
posto di `rg-u-print-a4`) dà una pagina A4 con **margine superiore di 30 mm** (12 ai lati e in basso).

| Cosa | Misura (dal bordo del foglio) | In punti PDF (1 mm = 2,835 pt) |
| --- | --- | --- |
| Pagina | A4, 210 × 297 mm | 595,3 × 841,9 |
| Fascia dell'intestazione | y da 8 a 24 mm, x da 12 a 198 mm | y 22,7–68,0 · x 34,0–561,3 |
| Riga 1: «Parte 1 di 4 · FONDO BORDATO» | Helvetica-Bold (`hebo`) **11 pt**, nero, linea di base a y = 14 mm, x = 12 mm | base y 39,7 · x 34,0 |
| Riga 2: «RG-26-DIO-0441-P · DIOR · M3641 COCOTTE» | Courier (`cour`) **8 pt**, nero, linea di base a y = 19,5 mm, x = 12 mm | base y 55,3 · x 34,0 |
| Filetto sotto l'intestazione | 0,5 pt nero, a y = 25 mm, da x 12 a 198 mm | y 70,9 |
| QR piccolo (facoltativo) | 16 × 16 mm, allineato a destra: x 182–198, y 8–24 mm | rect (515,9, 22,7, 561,3, 68,0) |
| Testo, larghezza massima | fino a x = 178 mm se c'è il QR, altrimenti 198 | 504,6 / 561,3 |
| Inizio del contenuto HTML | y = 30 mm | 85,0 |

Helvetica e Courier sono i font base del PDF (niente font da incorporare) e sono i fallback dichiarati del DS
per identità e mono. Il QR sul PDF va generato con la sua zona di rispetto dentro i 16 mm (vedi [qr](qr.md)).

### Blocco che continua il precedente (1.27.0)

Nel gruppo di fasi collegate dello stesso reparto l'app stampa **una banda sola** (sul primo blocco) e **un
piede solo** (sull'ultimo). Dalla 1.33.0 quel piede è un oggetto suo, fuori dal riquadro:
[`rg-worksheet-foot`](worksheet-foot.md). I blocchi dopo il primo portano `rg-worksheet-block--continued`:

- **la testa regge senza banda**: `__step` («FASE 3 DI 3») e `__work` («SABBIATURA») bastano, con `__role`
  («Collegata · dopo la 02») accanto al titolo. La banda sopra, sul primo blocco, dice il reparto per tutti;
- **niente spazio e niente filetto doppio**: un margine negativo annulla lo spazio fra i blocchi e sovrappone i
  filetti, resta una linea. Il bordo superiore resta dichiarato: se il blocco finisce in cima a una pagina, ce l'ha;
- **in stampa** chiede di restare sulla pagina del blocco sopra (`break-before: avoid`). È un'indicazione: se non
  ci sta, scende, e sulla pagina nuova non ha la banda. In quel caso l'app può rimetterla: una banda dopo
  `__step` funziona anche in un `--continued`.

```html
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--continued">
  <p class="rg-worksheet-block__step">Fase 3 di 3</p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__work">Sabbiatura</h3>
    <span class="rg-worksheet-block__role">Collegata · dopo la 02</span>
  </header>
  <div class="rg-worksheet-block__body">…</div>
</section>
<!-- il piede del gruppo, fuori dal riquadro, solo dopo l'ultimo blocco (1.33.0) -->
<div class="rg-worksheet-foot">…</div>
```

### Segni per il PDF

Per i segni che l'app legge nel PDF c'è [`rg-print-anchor`](print-anchor.md): un collegamento senza testo, 4 × 4 px,
trasparente, primo figlio del blocco.

### Limiti della seconda versione

- La **pagina della parte** e il **foglio dei tagliandi** aprono e chiudono la pagina; il retro bianco del foglio
  dei tagliandi lo garantisce l'app (una [`rg-blank-page`](blank-page.md), o il PDF).
- Le named pages (`rg-a4-head`) richiedono un Chrome recente; dove non sono supportate restano i margini di
  default e l'intestazione stampata può sovrapporsi al contenuto: verificare sul motore che produce il PDF.

## Compattazione di stampa (1.33)

**Obiettivo misurabile, non estetico: due fasi collegate e il loro piede devono entrare in una sola
pagina A4.** Un gruppo di fasi collegate è una cosa sola per chi lavora — la 03 si fa subito dopo la
02, stesso reparto, stesso banco — e spaccarlo su due fogli significa girare pagina a metà lavoro,
che è esattamente ciò che il reparto non fa. Mancava circa un quarto di altezza.

Il criterio è **togliere dove non si scrive**, in quest'ordine:

1. **l'aria attorno al testo già stampato** — etichetta del campo a 10 px senza stacco sotto (era 12
   px più 4 px), metà del distacco fra le file di campi, interlinea stretta sui sottotitoli di
   operazione, respiro dimezzato su testata, riga «Fase n di N» e banda del reparto;
2. **la testata su una riga sola** — era la perdita più grossa e la meno visibile: con un titolo
   lungo la riga di flex si riempiva e il **QR andava a capo da solo**, prendendosi una seconda riga
   alta quanto lui, ~48 px di pagina per dire una cosa che stava già lì accanto. Con `nowrap` il QR
   resta al suo posto e a cedere è il titolo, che va a capo fra le sue parole: due righe di titolo
   costano meno di una riga di QR. Il QR scende da 60 a 48 px — a 12,7 mm per 41 moduli il modulo
   resta a ~0,31 mm, leggibile da un telefono a distanza di lettura; **sotto questa misura non si va**;
3. **il titolo del blocco che continua** — 20 px invece di 28. È il secondo di una coppia: chi legge
   è già dentro al gruppo e non ha bisogno che il secondo titolo gridi quanto il primo.

**Mai le note.** La riga da scrivere resta 24 px, la `--tall` resta 48 e la nota del
[piede](worksheet-foot.md) è anzi salita a 64 (80 dalla 1.37.0). Su carta un campo troppo corto non
è un difetto di stile: è un dato che non viene scritto.

**L'etichetta a 10 px è un'eccezione dichiarata** (regole §12). Il DS non ha un gradino sotto
`--rg-font-size-xs` perché **a schermo** 12 px è il minimo leggibile; su **carta** la misura è
fisica, e 2,6 mm di maiuscoletto spaziato di due parole si leggono senza sforzo. La misura non è
inventata: è il gradino più piccolo della scala meno mezzo passo di spazio, lo stesso mezzo passo
già in uso per le densità di stampa. Vale **solo** in `@media print` e **solo** dentro `--compact`.

Tutte queste regole stanno in `styles/rg-utilities.css`, dentro `@media print`: a schermo il
fascicolo si legge, non si stampa, e le misure restano quelle della 1.23.0.

**Misura sul fascicolo di prova** (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli): da **23 pagine a
20**, e da **3 gruppi spezzati su due pagine a nessuno**.


## Testata a tre zone, e il foglio in maiuscolo (1.34.0)

Dal foglio stampato: «nelle testate ci sono un sacco di scritte vicine che creano confusione, le
scritte sono forse un po' troppo attaccate» e «mi raccomando tutte le scritte devono essere in
maiuscolo, anche il lato (davanti e dietro)» (Lorenzo, 2026-09-22).

### Le tre zone

In testa a un blocco ci sono **tre informazioni diverse**, e rispondono a tre domande diverse:

| Zona | Cosa dice | Chi la porta |
| --- | --- | --- |
| 1 · **numero della fase** | a che punto del percorso sono | `__step` |
| 2 · **identità del foglio** | che foglio ho in mano | `rg-dept-band` + `__note` («Foglio 2 / 15») |
| 3 · **titolo e ruolo** | cosa devo fare, e come si lega alle altre | `__work` + `__role` + QR |

Erano una sopra l'altra a mezzo passo di distanza (2 px, ~0,5 mm), e il ruolo stava **di fianco** al
titolo staccato da una sola barretta: con un titolo lungo il titolo andava a capo e finiva addosso
al ruolo e al QR. Due cambi:

1. **La testata è una griglia**, non più una fila: due colonne (testo | QR) e due righe (titolo |
   ruolo). Il **ruolo scende sotto il titolo** e si legge come sottotitolo — che è quello che è — e
   il titolo si prende tutta la larghezza che gli resta, quindi smette di spezzarsi. Il **QR sta
   nella sua colonna** e occupa tutte e due le righe: non può andare a capo per costruzione.
   La barretta a sinistra del ruolo **sparisce**: serviva a staccarlo dal titolo su una riga sola,
   sotto sarebbe un segno che non separa niente. L'aggancio è `:has(> __work)`, cioè la testa 1.25:
   la testa 1.23 (`__phase` / `__part` / `__meta`) resta la fila di flex che era.
2. **Fra una zona e l'altra torna un passo intero di bianco**: 4 px sopra la riga della fase, 6 px
   (passo e mezzo) sopra e sotto la banda. Sono ~1,6 mm: poco per l'occhio, molto per la carta.

**La griglia non costa altezza**, ed è la ragione per cui si poteva fare senza toccare la
compattazione: l'altezza della testata **la detta il QR** (48 px), non il testo, e titolo più ruolo
impilati ci stanno dentro. A pagare è solo il bianco fra le zone, ~12 px per gruppo di due fasi: è
quanto il gruppo aveva ancora da spendere, e il vincolo della 1.33.0 regge (vedi *Misura*, sotto).

### Tutto in maiuscolo

`rg-worksheet-block` e `rg-worksheet-foot` dichiarano `text-transform: uppercase`. Vale per
**qualunque testo ci finisca**: i valori già stampati («davanti e dietro», «medio»), i sottotitoli
di operazione, la riga del tempo per pezzo, le didascalie, le intestazioni di tabella. Le etichette
lo erano già, e un foglio metà maiuscolo e metà minuscolo si legge come due fogli diversi.

**Nel CSS e non nel database.** I dati arrivano dal gestionale in minuscolo perché lì ci stanno bene:
urlarli alla fonte vorrebbe dire perdere l'originale e portarsi il maiuscolo dentro ogni altra
schermata. `text-transform` è presentazione — cambia come si stampa, non cosa è scritto, e chi copia
il testo dal PDF ritrova le parole com'erano.

**Vale solo dentro il foglio**: il blocco della fase e il suo piede (che è parte del foglio anche se
sta fuori dal riquadro). Fuori — pagina della fase a schermo, anagrafica, liste — i componenti sono
altri e non cambiano.

**Unica eccezione: i simboli di unità** (`rg-fill-field__unit`), che dichiarano già
`text-transform: none`. «s», «bar», «°C», «min» sono simboli, e il maiuscolo li cambierebbe di
significato (regole §8).

**È un'eccezione dichiarata alle regole** (§2: «testi tutti maiuscoli in paragrafi o tabelle
dense»; §12 per la forma). *Problema*: il foglio si legge in reparto, in piedi, spesso fotocopiato,
e i valori in minuscolo dentro una pagina di etichette maiuscole si perdevano — chiesto da Lorenzo,
2026-09-22, guardando il foglio stampato. *Ambito*: **solo** `rg-worksheet-block` e
`rg-worksheet-foot`, cioè la carta; nessuna schermata. *Durata*: finché il foglio resta di carta.
*Responsabile*: prodotto RG. Il costo è reale e va conosciuto: le frasi lunghe del foglio — la riga
del tempo per pezzo, la nota della fascia d'ambito — in maiuscolo si leggono più lentamente. Sul
foglio è un prezzo che si paga volentieri perché quelle frasi sono due; **non** è un motivo per
portare il maiuscolo dove le frasi sono molte.

**Limite dichiarato:** un'unità scritta *dentro* il valore («4 (26,1 × 29,3 cm)») il CSS non sa
distinguerla dal testo, ed esce in maiuscolo. Dove il simbolo conta, l'unità va messa nel suo
elemento.

### Misura

Stesso fascicolo di prova (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso motore (Chrome):
**20 pagine prima, 20 dopo; 0 gruppi spezzati prima, 0 dopo**. Il margine è però **sottile**: dalla
1.33.0 il gruppo aveva ~12 px di pagina liberi e la testata li ha presi tutti. Chi tocca ancora le
spaziature del blocco compatto **misuri** prima di proporre.


## I campi in quattro colonne, e la sotto-operazione che si vede (1.36.0)

Dal foglio stampato, cinque osservazioni sugli spazi da compilare a penna (Lorenzo, 2026-09-22).
Valgono tutte dentro **`rg-worksheet-block--compact`**, cioè sul foglio: il blocco normale non cambia.

### 1 · Quattro colonne fisse

> «Farei una divisione della larghezza per 4, così le label vanno su una riga e non su due e lo
> stesso per il testo dentro che non va su due righe.»

`__fields` aveva colonne **automatiche** (`auto-fill`, minimo 128 px): numero e larghezza li decideva
lo spazio disponibile. Su un A4 con margini da 12 mm cadeva su quattro colonne, ma **per un pelo** —
dieci pixel in più di larghezza e sarebbero diventate cinque, strette, con ogni etichetta a capo.
E una griglia che cambia da un documento all'altro non è una griglia.

Adesso sono **quattro, fisse, uguali**: `repeat(4, minmax(0, 1fr))`. Il quarto di foglio è ~160 px
(~42 mm) e tiene su una riga sola l'etichetta più lunga del reparto («PUNTO MORTO INFERIORE») e un
valore di diciotto caratteri. La **nota** (`rg-fill-field--tall`) continua a prendere **la fila intera**.

**Sotto i 680 px le colonne tornano automatiche**: a schermo, su un telefono, un quarto di larghezza
non è un campo, è un taglio. Sulla carta il `@media` non entra mai in gioco.

### 2 · I campi di una fila sono alti uguale

> «Eviterei questo continuo alto-basso dei box perché l'altezza è diversa.»

Il campo è una colonna: **etichetta in alto**, riga da scrivere che si prende **tutto quello che
resta** (`flex: 1 1 auto`). Se un valore già stampato va a capo e alza il suo riquadro, si alzano
**insieme** anche i riquadri accanto. Prima le righe erano allineate sul solo *fondo*: una che
cresceva sfalsava la fila, ed è il «continuo alto-basso».

**Limite dichiarato:** se un'etichetta non ci sta in un quarto di foglio va a capo lo stesso, e in
quella fila il suo riquadro comincia una riga più in basso degli altri. Chiudono comunque tutti
sulla stessa linea, che è dove si scrive. Allineare anche l'alto vorrebbe `subgrid`, che qui
porterebbe il proprio `row-gap` fra etichetta e riga: ~4 px per fila, ~40 px per pagina, cioè più di
quanto il gruppo di due fasi ha da spendere. Misurato, scartato.

### 3 · La sotto-operazione si distingue

> «Renderei più differente la sotto operazione, magari facendola in bold.»

`__op` era a peso regolare e sotto ci sono le etichette dei campi, maiuscole e spaziate: a 14 px
contro 10 la differenza di corpo non bastava, e il titolo si leggeva come la prima di quelle
etichette invece che come la cosa che le apre. Passa al **grassetto** — la stessa eccezione già
dichiarata per `__work` (regole §3 vorrebbero 500): su carta il titolo di una sezione si cerca da
lontano. La chiosa in `rg-small` resta a peso regolare.

### 4 · L'etichetta è più grigia del testo

> «Le label le farei un po' più grigie del testo, che va bene così.»

Su un foglio da compilare le cose stampate sono **due**: l'etichetta *dice* cosa scrivere, il valore
*è* quello che c'è scritto. A `--rg-color-text-label` (neutral-800, 14,8:1) pesavano uguale.
`rg-fill-field__label` dentro `rg-worksheet-block--compact` e `rg-worksheet-foot` passa a
**`--rg-color-text-secondary`** (neutral-600, **6,1:1** su bianco: AA superato), e il nero resta del
dato — stampato o a penna che sia. Fuori dal foglio, nei moduli a schermo, l'etichetta non cambia:
lì è l'unica cosa che c'è.

**Nota:** `rg-fill-field__unit` era già `--rg-color-text-secondary`, quindi sul foglio unità ed
etichetta hanno ora **lo stesso grigio**; a distinguerle restano il mono e la spaziatura.

### 5 · Più aria fra le sotto-operazioni, e quanta

> «Lasciamo se possibile poco più spazio tra le varie sotto operazioni.»

Sul foglio ogni sezione finisce con la **riga nera** di un campo — la nota, che prende la fila
intera — e 4 px più sotto arrivava un **secondo filetto**, grigio, sopra la sotto-operazione. Due
linee quasi attaccate non separano meglio di una: fanno rumore e spezzano in due lo stacco. **Il
filetto sparisce** (solo dentro `--compact`) e il suo posto lo prende il bianco:

| | 1.35.0 | 1.36.0 |
| --- | --- | --- |
| sopra la sotto-operazione | 4 px + filetto + 4 px | **8 px di bianco** |
| sotto il titolo | 0 | **2 px** |
| costo per operazione | — | **+1 px**, e un filetto in meno |

**Perché non di più.** Il vincolo è misurato: il fascicolo di prova sta in **20 pagine** e ogni
gruppo di due fasi collegate in **una pagina**. Su una pagina ci sono quattro sotto-operazioni, e
ogni passo in più si moltiplica per quattro: a 12 px sopra invece di 8 il fascicolo va a **23 pagine**
e si spezzano **tutti e tre** i gruppi. Gli 8 px si pagano dove non si scrive: l'interlinea della
riga di chiusura del corpo («tempo per pezzo…»), che è un conto già fatto, passa da tecnica a stretta
(~7 px per gruppo). **Alle note non si tocca niente.**

> **Dalla 1.37.0 sono 12**, cioè quelli che servivano: li paga l'etichetta della nota, entrata dentro
> il riquadro. Vedi [La nota con l'etichetta dentro il riquadro](#la-nota-con-letichetta-dentro-il-riquadro-1370).

### 6 · Fra due fasi collegate la linea è doppia

Sullo stesso foglio stanno due fasi e «si fa fatica a vedere dove finisce la prima». La linea di
giunzione era un filetto come tutti gli altri — stesso peso del contorno del blocco e dei filetti
interni, cioè nessuna gerarchia. `rg-worksheet-block--continued` porta il bordo superiore a
**`--rg-border-strong`** (2 px) e diventa **l'unica linea doppia del foglio**. Costa 1 px: il margine
negativo sovrappone già il filetto inferiore del blocco sopra alla metà alta di questo.

### Misura

Stesso fascicolo di prova (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso motore (Chrome):
**20 pagine prima, 20 dopo; 0 gruppi spezzati prima, 0 dopo**. Sulle tre pagine critiche — quelle
con due fasi collegate e il loro piede — il contenuto finisce a 1069 px invece di 1072, con il fondo
utile a 1077: **8 px di margine invece di 5**. Chi tocca ancora le spaziature del blocco compatto
**misuri** prima di proporre.


## La nota con l'etichetta dentro il riquadro (1.37.0)

Nella 1.36.0 restava dichiarato un ultimo serbatoio di spazio: la parola **NOTE** sopra il riquadro,
~12 px per campo e quattro campi per pagina. *«Si potrebbe portare dentro il riquadro, in alto a
sinistra.»* Fatto.

### Perché proprio la nota, e proprio in alto a sinistra

Una fascia sopra il riquadro **non è spazio da scrivere**: è spazio speso per dire di scrivere. Il
riquadro alto è l'unico che può ospitare la propria etichetta senza perdere niente, e la ragione è di
forma, non di misura: in `rg-fill-field` la scrittura **appoggia sulla base nera** — è la riga su cui
si scrive — quindi l'angolo **in alto a sinistra** è la zona morta del campo. L'etichetta ci si mette
dentro e il riquadro resta quello che era.

| | fino alla 1.36.0 | dalla 1.37.0 |
| --- | --- | --- |
| nota del blocco (`--tall` in `__fields`) | ~12 px di fascia + riquadro 48 | riquadro **48**, etichetta dentro |
| spazio libero sotto l'etichetta | 48 | **35** (una grafia adulta ne chiede 32) |
| nota del piede (`rg-worksheet-foot__note`) | ~17 px di fascia + riquadro 64 | riquadro **80**, etichetta dentro |
| spazio libero sotto l'etichetta | 64 | **~65** (due righe scritte a mano) |

Il riquadro **non si stringe mai**: nel blocco resta 48 e nel piede **cresce**, perché lì la promessa
non è una riga ma due, e l'etichetta dentro non può mangiarne mezza. Nei campi da 24 px l'etichetta
**resta sopra**: lì dentro mangerebbe la scrittura.

### Si legge ancora come etichetta

È la sola cosa che poteva andare storta: una scritta dentro un riquadro vuoto può sembrare *qualcosa
di già scritto a penna*. Non succede, perché i due segni non si somigliano in niente — l'etichetta è
**grigia** (`--rg-color-text-secondary`), **piccola** (10 px in stampa nel blocco, 12 nel piede),
**maiuscola e spaziata**, ferma nell'angolo; la mano scrive nero, grande, corsivo, e appoggia sulla
base. Il **filetto sinistro** del riquadro le passa accanto e dice che sta dentro. Il rientro è lo
stesso dei valori già stampati (8 px): etichetta e valore partono dalla stessa colonna.

Sulla riga c'è anche un `padding-top`, perché un valore lungo che andasse a capo fino a riempire il
campo non finisca stampato addosso all'etichetta. Finché il campo è vuoto — cioè sempre, sul foglio —
non costa un pixel: la riga allinea il contenuto in basso.

### Dove sono finiti i pixel

~49 px per pagina critica. **16** vanno all'aria fra le sotto-operazioni, che passa da 8 a **12 px**,
cioè quelli che servivano e che nella 1.36.0 la pagina non poteva pagare. **8** al riquadro della nota
del piede, che cresce da 64 a 80. I restanti **~25 px per pagina restano di margine**, non di aria: un
titolo di fase più lungo o un valore che va a capo se li prendono tutti, e il vincolo del gruppo su
una pagina sola non si rimette in gioco per quattro pixel.

### Misura

Stesso fascicolo di prova, stesso motore (Chrome): **pagine invariate, 0 gruppi spezzati prima e
dopo**. Sulle tre pagine con due fasi collegate e il loro piede il contenuto finisce a **1044 px**
invece di 1069, con il fondo utile a 1077: **33 px di margine invece di 8**. Chi tocca ancora le
spaziature del blocco compatto **misuri** prima di proporre.


## La tabella degli stop, riga per riga (1.38.0)

> «Righe più alte, 18 per pagina. Serve spazio per scrivere le note. E deve essere abbastanza per
> stop.» — Lorenzo, 2026-09-22

Sul foglio del ricamo c'è **una riga per stop**: numero, ago, filo sopra e sotto, le sigle delle
regolazioni, l'operazione, il materiale, il tempo e le note. È l'unica tabella del fascicolo su cui
si **scrive mentre la macchina lavora**: tempi e note si annotano stop per stop, a biro, in piedi.

Le righe erano quelle di un dato denso — ~26 px, ~7 mm — cioè **la misura del testo stampato**. Ma
qui vale la frase di [fill-field](fill-field.md): *l'altezza è la mano, non il testo*. Sette
millimetri sono la misura di una riga **letta**: la punta della biro ci entra, la grafia no. E una
riga in cui non si riesce a scrivere, in reparto, resta vuota — cioè il dato si perde.

### Il gancio, e perché serve un gancio

La tabella degli stop diventa
**`rg-table rg-table--compact rg-table--grid rg-table--hand`**. La classe in più la mette l'app,
e **solo su quella tabella**: nello stesso fascicolo ci sono tabelle che si *leggono* soltanto — la
legenda dei coni, le fasi della [pagina della parte](part-sheet.md) — e alzarle tutte vorrebbe dire
pagare in carta uno spazio che nessuno usa. `--grid` dice *dove* si scrive, `--hand` dice *quanto
spazio c'è per farlo*: sono due decisioni diverse e stanno in due classi diverse.

| | fino alla 1.37.0 | dalla 1.38.0 con `--hand` |
| --- | --- | --- |
| riga della tabella degli stop | ~26 px (~7 mm) | **40 px (~10,6 mm)** |
| righe per pagina A4 | ~28 | **18** |
| dato stampato nella cella | a metà altezza | **appoggiato in basso**, dove appoggia la scrittura |
| testata della tabella | invariata | invariata: su di lei non si scrive |
| altre tabelle del fascicolo | — | **invariate** |

I 40 px sono i 32 della grafia adulta dichiarati da `rg-fill-field` più un passo, perché qui la mano
scrive **dentro una griglia chiusa sui quattro lati** e non sopra una riga aperta: non può sbordare.
Stanno sulla scala (32 + 8) e sono un **minimo**, non un'altezza fissa: una cella con un valore lungo
che va a capo cresce.

### Diciotto, e da dove viene il numero

È **misurato**, non imposto: il CSS non sa contare le righe. Su A4 con intestazione di pagina
(`rg-u-print-a4--head`, margini 30/12 mm), sotto la testata del foglio e la fila di campi del ricamo,
per il corpo della tabella restano **~194 mm**. Diciotto righe da 10,6 mm ne occupano 190; la
diciannovesima chiederebbe 201 e non entra.

Il diciannovesimo stop va alla pagina dopo, con l'intestazione della tabella ripetuta — è la regola
di `--long`, che non cambia. **Il foglio si stampa fronte-retro**, quindi il seguito sta dietro e non
in un altro punto del fascicolo.

**Limite dichiarato.** Quel 18 dipende da quanto c'è **sopra** la tabella, e il margine è sottile:
~3 mm. Una fase con una fila di campi in meno ne fa entrare una in più; un titolo su due righe una in
meno. Chi ha bisogno di un numero **esatto** di righe per pagina non lo ottiene dal CSS: lo ottiene
spezzando la tabella a monte, in due blocchi.

**Costo in carta, dichiarato.** Un ricamo con più di 17 stop prende una facciata in più di prima (la 1.38.0 diceva 18: era un render scalato, vedi la 1.40.1). È
il prezzo esplicito della richiesta: prima le righe c'erano tutte e non ci si poteva scrivere, il che
vuol dire che non c'erano. Sul fascicolo di prova (3 parti, 11 fasi, 15 fogli — ricami da 3 stop) le
pagine restano **18** e i gruppi di due fasi collegate spezzati restano **0**.


## Uso e limiti

**È riquadrato, ed è un'eccezione dichiarata.** Le regole (§6) dicono di non incorniciare tutto e
di non trasformare ogni contenuto in una card. Su carta il riquadro fa un lavoro che a schermo fa
l'hover: rende il blocco *separabile* dal blocco che gli sta sotto, quando entrambi sono sulla
stessa facciata e la fotocopia ha appiattito tutto. Eccezione motivata, ambito: documenti stampati.

**La banda è obbligatoria.** Il primo figlio del blocco è una [`rg-dept-band`](dept-band.md): il
foglio che arriva in reparto deve dire a quale reparto appartiene senza che nessuno lo legga per
intero. Un blocco senza banda è un foglio anonimo nel mucchio.

**I buchi sono voluti.** I valori che l'operatore rileva (temperatura, tempo, tensioni) **non** si
stampano vuoti come celle vuote: si stampano come [`rg-fill-field`](fill-field.md), che dichiara
dove si scrive. Un vuoto senza etichetta e senza riga sembra un errore di rendering.

**Formato pagina.** Il blocco non decide la geometria del foglio: la decide il documento. Se serve
A4 verticale con margini uniformi, l'opt-in è `rg-u-print-a4` sul contenitore che stampa (di norma
il `<body>`); dove le *named pages* non sono supportate restano i margini di default e non si rompe
niente.

**Limite noto — `--long` che sfora.** Se la tabella supera comunque il foglio, il blocco si spezza
fra righe con l'intestazione della tabella ripetuta, ma **la banda di reparto non si ripete**: la
pagina di continuazione perde il suo segnale di reparto. Non è un difetto che il CSS possa
risolvere. Se una fase produce più di una pagina di tabella, va spezzata a monte in **due blocchi**,
ciascuno con la sua banda.

**Non è a schermo.** Il blocco è la vista di stampa. La stessa fase, a schermo, si legge con
`rg-section-card` o `rg-steps` e si compila con `rg-field`: lì i controlli esistono davvero.

## Struttura

```html
<section class="rg-worksheet-block">
  <p class="rg-dept-band rg-dept-band--pressatura">
    <span class="rg-dept-band__name">Pressatura e soffiatura</span>
    <span class="rg-dept-band__note">Fase 03 / 07</span>
  </p>
  <header class="rg-worksheet-block__head">
    <span class="rg-worksheet-block__index">03</span>
    <h3 class="rg-worksheet-block__title">Pressatura fondo</h3>
    <p class="rg-worksheet-block__meta">RG-2026-0481 · parte 2 di 5 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Temperatura <span class="rg-fill-field__unit">°C</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">s</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Pressione <span class="rg-fill-field__unit">bar</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
    </div>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline">
      <span class="rg-fill-field__label">Operatore</span>
      <span class="rg-fill-field__line"></span>
    </div>
    <div class="rg-fill-field rg-fill-field--inline">
      <span class="rg-fill-field__label">Ora</span>
      <span class="rg-fill-field__line"></span>
    </div>
  </footer>
</section>
```

Variante **lunga** — la fase con la tabella da compilare riga per riga:

```html
<section class="rg-worksheet-block rg-worksheet-block--long">
  <p class="rg-dept-band rg-dept-band--ricamo">
    <span class="rg-dept-band__name">Campionario Ricamo</span>
  </p>
  <header class="rg-worksheet-block__head">
    <span class="rg-worksheet-block__index">01</span>
    <h3 class="rg-worksheet-block__title">Controllo tensioni per capo</h3>
    <p class="rg-worksheet-block__meta">RG-2026-0481 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
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
      </tbody>
    </table>
  </div>
</section>
```

Documento stampabile, geometria opt-in:

```html
<body class="rg-u-print-a4">
```


### Markup del fascicolo compatto

Testata di parte, poi i blocchi della parte, sulla stessa pagina:

```html
<header class="rg-worksheet-part">
  <h2 class="rg-worksheet-part__title"><span class="rg-part-mark rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</h2>
  <ol class="rg-worksheet-part__route" aria-label="Lavorazioni della parte">
    <li>Ricamo</li>
    <li>Pressatura</li>
    <li>Sabbiatura</li>
  </ol>
  <p class="rg-worksheet-part__product">COCOTTE · RG-2026-0481 · rev. 04</p>
</header>
```

Blocco compatto — **pressatura**: fase in primo piano, campi stretti, piede su una riga.

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">
  <p class="rg-dept-band rg-dept-band--pressatura">
    <span class="rg-dept-band__name">Reparto Pressatura e soffiatura</span>
    <span class="rg-dept-band__note">Foglio 2 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__phase">Fase 2 di 3 · Pressatura</h3>
    <p class="rg-worksheet-block__part"><span class="rg-part-mark rg-part-mark--small rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</p>
    <p class="rg-worksheet-block__meta">COCOTTE · RG-2026-0481 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field"><span class="rg-fill-field__label">Temperatura <span class="rg-fill-field__unit">°C</span></span><span class="rg-fill-field__line"></span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">s</span></span><span class="rg-fill-field__line"></span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Pressione <span class="rg-fill-field__unit">bar</span></span><span class="rg-fill-field__line"></span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Pezzi per ciclo</span><span class="rg-fill-field__line"></span></div>
    </div>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">min</span></span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Operatore</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Data</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline rg-fill-field--tall"><span class="rg-fill-field__label">Note</span><span class="rg-fill-field__line"></span></div>
  </footer>
</section>
```

Blocco compatto — **ricamo**: tabella delle eccezioni per stop (righe scritte e righe vuote) e legenda dei
coni da ritagliare in fondo.

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">
  <p class="rg-dept-band rg-dept-band--ricamo">
    <span class="rg-dept-band__name">Reparto Ricamo</span>
    <span class="rg-dept-band__note">Foglio 1 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__phase">Fase 1 di 3 · Ricamo</h3>
    <p class="rg-worksheet-block__part"><span class="rg-part-mark rg-part-mark--small rg-part--1" aria-hidden="true"></span>Parte 1 di 4 · FONDO BORDATO</p>
    <p class="rg-worksheet-block__meta">COCOTTE · RG-2026-0481 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
    <table class="rg-table rg-table--compact rg-table--grid" style="--rg-table-cols: 6">
      <caption>Eccezioni per stop</caption>
      <thead>
        <tr>
          <th class="rg-table__numeric" scope="col">Stop</th>
          <th scope="col">Piedino</th>
          <th scope="col">Velocità</th>
          <th scope="col">Ago</th>
          <th scope="col">PMI</th>
          <th class="rg-table__grow" scope="col">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rg-table__numeric">4</td>
          <td class="rg-table__numeric">1,5</td>
          <td class="rg-table__numeric">650</td>
          <td class="rg-table__numeric">3</td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td>Rallentare sulla curva</td>
        </tr>
        <tr>
          <td class="rg-table__numeric">9</td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-table__numeric">500</td>
          <td class="rg-table__numeric">6</td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
        <tr>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
        <tr>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">min</span></span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Operatore</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Data</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline rg-fill-field--tall"><span class="rg-fill-field__label">Note</span><span class="rg-fill-field__line"></span></div>
  </footer>
  <div class="rg-cutout">
    <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
    <div class="rg-cutout__head">
      <p class="rg-cutout__title">Legenda coni · Fase 1 di 3 · Ricamo</p>
      <p class="rg-cutout__meta">COCOTTE · Parte 1 · FONDO BORDATO</p>
    </div>
    <table class="rg-table rg-table--compact">
      <thead>
        <tr>
          <th class="rg-table__numeric" scope="col">Ago</th>
          <th scope="col">Codice filo</th>
          <th class="rg-table__grow" scope="col">Colore</th>
          <th class="rg-table__numeric" scope="col">Metri</th>
          <th scope="col">Cono</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rg-table__numeric">1</td>
          <td class="rg-table__code">MAD-1800</td>
          <td>Bianco ottico</td>
          <td class="rg-table__numeric">42,5</td>
          <td><span class="rg-fill-field rg-fill-field--swatch"></span></td>
        </tr>
        <tr>
          <td class="rg-table__numeric">3</td>
          <td class="rg-table__code">MAD-1747</td>
          <td>Blu notte</td>
          <td class="rg-table__numeric">18,0</td>
          <td><span class="rg-fill-field rg-fill-field--swatch"></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

Pagina bianca per il fronte/retro, messa dall'app prima di una testata di parte che cadrebbe sul retro:

```html
<div class="rg-blank-page">
  <p class="rg-blank-page__note">Pagina lasciata bianca per la stampa fronte/retro</p>
</div>
```


### Markup della seconda versione (proposta 1.25.0)

Ricamo — testa nuova, valori stampati con aria, eccezioni per stop a griglia:

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">
  <p class="rg-worksheet-block__step">Fase 1 di 3</p>
  <p class="rg-dept-band rg-dept-band--ricamo">
    <span class="rg-dept-band__name">Reparto Ricamo</span>
    <span class="rg-dept-band__note">Foglio 1 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__work">Ricamo</h3>
  </header>
  <div class="rg-worksheet-block__body">
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field"><span class="rg-fill-field__label">Macchina</span><span class="rg-fill-field__line">ZSK 12 teste</span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Telaio</span><span class="rg-fill-field__line">T-40</span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Velocità <span class="rg-fill-field__unit">punti/min</span></span><span class="rg-fill-field__line"></span></div>
    </div>
    <table class="rg-table rg-table--compact rg-table--grid rg-u-mt-2" style="--rg-table-cols: 6">
      <caption>Eccezioni per stop</caption>
      <thead>
        <tr>
          <th class="rg-table__numeric" scope="col">Stop</th>
          <th scope="col">Piedino</th>
          <th scope="col">Velocità</th>
          <th scope="col">Ago</th>
          <th scope="col">PMI</th>
          <th class="rg-table__grow" scope="col">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="rg-table__numeric">4</td>
          <td class="rg-table__numeric">1,5</td>
          <td class="rg-table__numeric">650</td>
          <td class="rg-table__numeric">3</td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td>Rallentare sulla curva</td>
        </tr>
        <tr>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">min</span></span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Operatore</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Data</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline rg-fill-field--tall"><span class="rg-fill-field__label">Note</span><span class="rg-fill-field__line"></span></div>
  </footer>
</section>
```

Pressatura — testa nuova e sottotitoli di operazione:

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">
  <p class="rg-worksheet-block__step">Fase 2 di 3</p>
  <p class="rg-dept-band rg-dept-band--pressatura">
    <span class="rg-dept-band__name">Reparto Pressatura e soffiatura</span>
    <span class="rg-dept-band__note">Foglio 2 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__work">Pressatura</h3>
  </header>
  <div class="rg-worksheet-block__body">
    <p class="rg-worksheet-block__op">Piazzamento</p>
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">s</span></span><span class="rg-fill-field__line">80</span></div>
    </div>
    <p class="rg-worksheet-block__op">Pressatura</p>
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field"><span class="rg-fill-field__label">Temperatura <span class="rg-fill-field__unit">°C</span></span><span class="rg-fill-field__line">150</span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">s</span></span><span class="rg-fill-field__line">10</span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Pressione <span class="rg-fill-field__unit">bar</span></span><span class="rg-fill-field__line"></span></div>
    </div>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">min</span></span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Operatore</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Data</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline rg-fill-field--tall"><span class="rg-fill-field__label">Note</span><span class="rg-fill-field__line"></span></div>
  </footer>
</section>
```

Documento con intestazione di pagina stampata dall'app:

```html
<body class="rg-u-print-a4--head">
```

## Il foglio della fase di tutto il prodotto (1.31.0)

Una fase può valere per **tutto il prodotto** invece che per una parte — il controllo qualità finale.
Il suo foglio esce **una volta sola** nel fascicolo, in fondo a tutti i fogli delle parti, e in
reparto **non va seguito su una parte sola**: sbagliarlo vuol dire farlo tre volte invece di una.

| Classe | Cosa fa |
| --- | --- |
| `rg-scope-band` | La **fascia d'ambito**: primo figlio del blocco, a filo dei bordi, campitura piena nel colore d'ambito (ambra dalla 1.32.0) con la parola in **nero** e un filetto nero forte sotto. Vedi [scope](scope.md). |
| `rg-worksheet-block--product` | Contorno **forte**: il secondo segnale, per trovare il foglio nel mucchio. |

### Dove sta, e perché non copre il reparto

Dall'alto: **fascia d'ambito** (a filo dei bordi) → `__step` → **banda del reparto** (staccata dai
bordi) → `__work`. Due fasce in fila, e si leggono come due risposte diverse: *di chi è questa fase*
e *chi la esegue*.

- La fascia d'ambito è **piena e senza trama**: è l'unica campitura piena del foglio. La banda del
  reparto tiene la sua trama e il suo colore di categoria, su targhetta bianca.
- È **più bassa** della banda: una campitura piena pesa più di una trama a parità di altezza. Se
  fossero alte uguali, la prima coprirebbe la seconda.
- In **fotocopia** (dalla 1.32.0, con l'ambra) la fascia diventa un blocco **chiaro** — ~65% di
  luminanza in scala di grigi, dove il rosso della 1.31.0 stava al ~26% e andava al nero. Sul foglio
  non è più il blocco più scuro, ma resta **l'unica campitura uniforme**: le trame dei reparti sono
  righe sottili su bianco, nessuna è una tinta piatta. Quello che regge la lettura sulla carta sono
  il **filetto nero forte** sotto la fascia e il **maiuscoletto nero**, che su fondo chiaro tiene la
  fotocopia meglio di quanto tenesse il bianco in negativo.
- Per trovare il foglio **nel mucchio** il segnale è `rg-worksheet-block--product`, il contorno
  raddoppiato: corre per l'altezza del blocco, non in una striscia in testa, e non dipende dal
  colore. Dalla 1.32.0 è lui a portare il colpo d'occhio da lontano, e per questo **non** è stato
  aggiunto un secondo filetto sopra la fascia: cadrebbe a filo del bordo del blocco e si leggerebbe
  come una sbavatura di stampa.
- `print-color-adjust: exact` è già in `rg-utilities.css`: senza, il browser butterebbe via la
  campitura e il foglio perderebbe il segno dell'ambito.

### Cosa cambia nella testa

- **Niente parte, niente pastiglia.** `rg-worksheet-block__part` può restare per dire *a cosa* si
  applica («Tutte e 3 le parti · oggetto finito»), ma senza [`rg-part-mark`](part-mark.md): una
  pastiglia di parte direbbe il contrario di quello che dice la fascia.
- **`__step` dice la posizione nel fascicolo**, non nella parte: «Fase unica · dopo tutte le parti».
  «Fase 2 di 3» lì sarebbe falso, perché il 3 è il conto di una parte.
- Il contatore dei fogli resta nella nota della banda di reparto: «Foglio 12 / 12».

### Struttura

```html
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--product">
  <p class="rg-scope-band">
    <span class="rg-scope-band__text">Fase di tutto il prodotto</span>
    <span class="rg-scope-band__note">Non di una parte sola: si fa una volta, sull'oggetto finito e montato.</span>
  </p>
  <p class="rg-worksheet-block__step">Fase unica · dopo tutte le parti</p>
  <p class="rg-dept-band rg-dept-band--finissaggio">
    <span class="rg-dept-band__name">Reparto Finissaggio e Controllo Qualità</span>
    <span class="rg-dept-band__note">Foglio 12 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__work">Controllo qualità</h3>
    <p class="rg-worksheet-block__part">Tutte e 3 le parti · oggetto finito</p>
  </header>
  <div class="rg-worksheet-block__body">
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field"><span class="rg-fill-field__label">Pezzi controllati</span><span class="rg-fill-field__line"></span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Scarti</span><span class="rg-fill-field__line"></span></div>
      <div class="rg-fill-field"><span class="rg-fill-field__label">Esito</span><span class="rg-fill-field__line"></span></div>
    </div>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Operatore</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline"><span class="rg-fill-field__label">Data</span><span class="rg-fill-field__line"></span></div>
    <div class="rg-fill-field rg-fill-field--inline rg-fill-field--tall"><span class="rg-fill-field__label">Note</span><span class="rg-fill-field__line"></span></div>
  </footer>
</section>
```

### Limiti

- **Il posto nel fascicolo lo decide l'app**: il DS non sa cosa viene prima. La regola è in fondo,
  dopo l'ultima parte, e mai dentro la sequenza di una parte.
- Se la fase di prodotto ha una tabella lunga, vale `--long` come per le altre, con lo stesso limite
  noto: sulla pagina di continuazione **né la banda né la fascia si ripetono**. Una fase che produce
  più di una pagina va spezzata in due blocchi, ciascuno con le sue fasce.
