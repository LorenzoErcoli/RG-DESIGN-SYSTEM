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
| `rg-worksheet-block--compact` | **Compatta** (proposta 1.23.0): la densità del **fascicolo** che va in reparto. Righe da scrivere più basse, spaziature ridotte, colonne strette, piede su una riga, banda più bassa. Si combina con `--long`. Vedi [Fascicolo compatto](#fascicolo-compatto-proposta-1230). |

`--long` non cambia nulla a schermo: è **solo** una regola di paginazione. Non usarla per "dare
importanza" a una fase — l'importanza non è una proprietà della carta.

| Elemento | Quando |
| --- | --- |
| `rg-worksheet-block__role` | **Fase di un gruppo di fasi collegate** (v1.16.0). Nella testa, dopo il titolo: «Principale · con la 03», «Collegata · dopo la 02». |
| `rg-worksheet-block__phase` | **La fase in primo piano** (proposta 1.23.0): «Fase 2 di 3 · Pressatura», 20 px. Il titolo del blocco. Prende il posto di `__index` + `__title`. |
| `rg-worksheet-block__part` | **La parte**, sotto la fase per misura (14 px): «Parte 1 di 4 · FONDO BORDATO», con la pastiglia [`rg-part-mark`](part-mark.md) davanti se c'è. |

### Ruolo nel gruppo (`__role`)

Il foglio di una fase collegata va in reparto da solo, a volte in un altro reparto rispetto alla sua
principale. Deve dire a chi lo prende in mano che quella fase ne segue un'altra, o ne precede
un'altra.

- **Stesse parole dell'elenco** ([`rg-step__role`](steps.md#gruppo-di-fasi-collegate-rg-steps--grouped)),
  con i numeri scritti come sul foglio (`02`).
- **Il blocco porta il suo pezzo di graffa**: un filo nero spesso a sinistra dell'etichetta. Nell'elenco
  la graffa unisce le righe; sul foglio i blocchi di un gruppo possono finire su due pagine, quindi
  ogni blocco dice il gruppo per conto suo.
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
| Griglia `__fields` | colonne ≥ 132 px, *auto-fit* (tre campi riempiono la pagina) | colonne ≥ **128 px** (~34 mm), *auto-fill*: tre campi restano stretti a sinistra |
| Banda di reparto | 38 px | **30 px**: la striscia della trama resta 16 px, il margine bianco del nome scende da 4 a 2 |
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

- Nella griglia i campi si allineano **sul fondo**: un'etichetta che va a capo non sposta la riga.
- Un `rg-fill-field--tall` nella griglia prende **la fila intera**.
- Il **piede** sta su una riga dove ci sta: Tempo, Operatore, Data in `--inline` (etichetta + almeno 64 px di
  riga), la Nota in `--inline --tall` per ultima, che prende il resto. Se l'etichetta della nota è lunga
  («Note e proposte per l'ufficio prodotto») il piede va a capo: scrivere «Note».
- Le utility di margine hanno `!important` e non si comprimono: dentro un blocco compatto usare
  `rg-u-mt-2`, non `rg-u-mt-4`.

### Tabelle: eccezioni per stop

Non serve un componente: basta **`rg-table rg-table--compact`** con **`td.rg-fill-field--cell`** dentro un
blocco `--compact`, che porta tutte le celle a 24 px e le intestazioni su una riga. Due regole:

- **La colonna larga dichiara di esserlo**: `rg-table__grow` sulla `<th>` di Note. Le altre (Stop, Piedino,
  Velocità, Ago, PMI) scendono alla larghezza della propria intestazione.
- **Righe già scritte e righe vuote nella stessa tabella.** Il valore noto è una `<td>` normale
  (`rg-table__numeric` per i numeri); il valore da rilevare è una `td.rg-fill-field--cell`, anche dentro una
  riga scritta. Le righe vuote in fondo sono tutte `--cell`: nessun trattino, nessuno zero finto.

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
    <table class="rg-table rg-table--compact">
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
