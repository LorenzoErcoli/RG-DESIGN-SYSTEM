# Tables

## Scopo

Confrontare record strutturati: materiali, fili, operazioni, consumi, revisioni e risultati.

## Varianti

- **Standard**: densità media, intestazione persistente opzionale.
- **Compact**: grandi dataset, altezza riga minima 36 px.
- **Review**: colonna stato, differenze e azioni contestuali.
- **Matrix**: parametri incrociati; prima colonna e header bloccabili.
- **Espandibile** (`rg-table__row--expandable` + `rg-table__detail`): una riga-record che
  rivela in loco la propria scomposizione (i sotto-record che la compongono) senza lasciare
  la tabella. Variante, non componente a sé: preserva la semantica tabellare.
- **Griglia** (`rg-table--grid`): la tabella **di carta**, filetto nero su tutte le celle.
- **Da scrivere a penna** (`rg-table--hand`): sopra la griglia, per la tabella degli stop del foglio
  stampato — riga alta come la mano, intestazione un gradino più piccola del corpo.

## Uso e limiti

Usare quando colonne e confronto sono centrali. Evitare per liste narrative, mobile senza priorità definite o record con troppe azioni. Non usare zebra striping forte: preferire separatori sottili e hover neutro.

### Riga espandibile

Per una riga che si scompone (una voce di costo che mostra i costi che la compongono, un
consumo che mostra i suoi contributi) la scelta è questa variante di `rg-table`, non
`rg-disclosure` (aprirebbe una _sezione di pagina_ e romperebbe la semantica tabellare) né
`rg-step` (è una _sequenza numerata_, una riga-record non lo è).

Regole:

- La `<tr class="rg-table__row--expandable">` madre contiene un `<button class="rg-table__toggle">`
  con `aria-expanded` e `aria-controls` che punta all'`id` della riga di dettaglio. È il trigger:
  non rendere cliccabile l'intera riga (le celle numeriche non devono catturare il click).
- Il dettaglio è una **seconda `<tr class="rg-table__detail">`** con un unico `<td colspan="N">`
  su tutte le colonne, così le colonne della riga madre restano allineate. Dentro, la
  scomposizione è tipicamente una mini-tabella (`rg-table--compact`) o un `rg-key-value`.
- Stato = `aria-expanded` sul toggle + attributo `hidden` sulla riga di dettaglio. Il segno
  `+`/`−` è generato dal DS e segue `aria-expanded`: non aggiungere un secondo indicatore e non
  affidarti al solo colore. Il toggle è alto ≥ 40 px e ha focus visibile.
- La riga di dettaglio associa il proprio contenuto al trigger con `role="region"` +
  `aria-labelledby` sull'`id` del toggle.

```html
<div class="rg-table-wrap">
  <table class="rg-table">
    <thead>
      <tr><th>Voce di costo</th><th class="rg-table__numeric">Importo (€)</th><th>Metodo</th></tr>
    </thead>
    <tbody>
      <tr class="rg-table__row--expandable">
        <td>
          <button class="rg-table__toggle" type="button" id="costo-1-toggle"
                  aria-expanded="true" aria-controls="costo-1-detail">
            <span class="rg-table__toggle-label">Ricamo</span>
          </button>
        </td>
        <td class="rg-table__numeric">12,88</td>
        <td>calcolato</td>
      </tr>
      <tr class="rg-table__detail" id="costo-1-detail">
        <td colspan="3">
          <div class="rg-table__detail-inner" role="region" aria-labelledby="costo-1-toggle">
            <table class="rg-table rg-table--compact">
              <thead><tr><th>Contributo</th><th class="rg-table__numeric">€</th></tr></thead>
              <tbody>
                <tr><td>Tempo macchina</td><td class="rg-table__numeric">9,20</td></tr>
                <tr><td>Ammortamento telaio</td><td class="rg-table__numeric">3,68</td></tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

A riga chiusa la `<tr class="rg-table__detail">` porta l'attributo `hidden`; il JS che gestisce
il toggle inverte `aria-expanded` e aggiunge/toglie `hidden`, nient'altro.

## Azioni in riga (`rg-table__actions`, dalla 1.17.0)

Le azioni che si ripetono su ogni riga (Apri, Elimina) stanno nell'**ultima colonna**, in una cella
`rg-table__actions`: stretta quanto il contenuto, a destra, senza andare a capo. Sono **a sola icona
con suggerimento** (`rg-icon-button--full` dentro `rg-tooltip`), l'eliminazione in un gruppo suo e per
ultima. Il nome della riga resta un link al dettaglio. Markup completo in
[action-group](action-group.md#struttura).

- Intestazione della colonna: `<th><span class="rg-u-visually-hidden">Azioni</span></th>`.
- Il suggerimento porta il nome del record: «Elimina DAVANTI», non «Elimina».
- Distanza dal bordo: il padding della cella (12 px) basta anche dentro `rg-section-card--flush`.

## Colonna «Qtà»

La forma canonica del valore numerico esiste già (`rg-table__numeric`: destra, mono, cifre
tabulari). Mancava **una sola convenzione per la colonna «Qtà»**, che oggi differisce fra i tab.
Da 1.10.0 la regola è unica e vale in **ogni** tab:

- **Intestazione**: la colonna si chiama `Qtà`. Se **tutte** le righe condividono l'unità,
  questa sta nell'header fra parentesi — `Qtà (m)`, `Qtà (pz)` — e la cella porta il **solo
  numero**. È il caso normale.
- **Cella**: `<td class="rg-table__numeric">` — destra, mono, tabulare. Nessuna variante di
  allineamento nuova: `rg-table__numeric` è già la forma del valore.
- **Unità per riga**: quando l'unità **varia** riga per riga (m, pz, cm…), l'header resta `Qtà`
  senza unità e ogni cella porta il numero seguito da `<span class="rg-table__unit">`. L'unità è
  secondaria e **non sostituisce mai** il numero (regola §8: unità accanto al valore, non al suo
  posto).
- **Precisione**: si conserva la precisione originale; l'arrotondamento è solo di presentazione.
  Lo stato del dato (stimato/validato) resta in una colonna propria con `rg-badge`, non nel numero.

Unità uniforme (nell'header):

```html
<table class="rg-table">
  <thead><tr><th>Codice</th><th class="rg-table__numeric">Qtà (m)</th><th>Stato</th></tr></thead>
  <tbody>
    <tr><td class="rg-table__code">FIL-0281</td><td class="rg-table__numeric">184,42</td><td><span class="rg-badge rg-badge--validated">Validato</span></td></tr>
  </tbody>
</table>
```

Unità per riga (accanto al valore):

```html
<table class="rg-table">
  <thead><tr><th>Materiale</th><th class="rg-table__numeric">Qtà</th></tr></thead>
  <tbody>
    <tr><td>Filato viscosa</td><td class="rg-table__numeric">184,42<span class="rg-table__unit">m</span></td></tr>
    <tr><td>Paillettes</td><td class="rg-table__numeric">1 240<span class="rg-table__unit">pz</span></td></tr>
  </tbody>
</table>
```

## Colonna che prende il resto (`rg-table__grow`, proposta 1.23.0)

Nel layout automatico le colonne si spartiscono lo spazio in proporzione al contenuto, e una tabella
di numeri corti su un foglio largo finisce con sei colonne da 110 px l'una. Quando una colonna sola
chiede larghezza — Note, Descrizione, Colore — la si dichiara con `rg-table__grow` sulla `<th>`:
prende tutto lo spazio che avanza e le altre scendono alla larghezza del proprio contenuto.

- **Una per tabella.** Due colonne avide si dividono lo spazio a caso.
- Non è una larghezza fissa: se i contenuti delle altre colonne crescono, la colonna larga cede.
- **Non usarla per una tabella tutta da compilare**: con le celle vuote le altre colonne non hanno
  contenuto su cui misurarsi e collassano a una parola. Lì serve `rg-table--grid` (sotto), dove
  `rg-table__grow` vale il doppio.

```html
<table class="rg-table rg-table--compact">
  <thead>
    <tr>
      <th class="rg-table__numeric" scope="col">Stop</th>
      <th scope="col">Ago</th>
      <th class="rg-table__grow" scope="col">Note</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="rg-table__numeric">4</td><td class="rg-table__numeric">3</td><td>Rallentare sulla curva</td></tr>
  </tbody>
</table>
```

## Tabella da compilare a griglia (`rg-table--grid`, proposta 1.24.0)

La tabella **di carta** che si compila a penna riga per riga: eccezioni per stop, controlli per capo.
Nasce dalla prima stampa del [fascicolo compatto](worksheet-block.md#tabelle-eccezioni-per-stop): con la sola
`rg-table--compact` e le celle `td.rg-fill-field--cell`, le righe vuote avevano solo il filo in basso e si
leggevano come **righe da quaderno** — non si capiva in che colonna scrivere — e nel layout automatico le
colonne vuote prendevano larghezze a caso.

- **Griglia**: filetto nero hairline su **tutte** le celle, testata compresa. Nero e non neutro perché la
  tabella si fotocopia. È un'eccezione dichiarata al «niente griglie fitte» delle tabelle a schermo: su carta
  il divisore verticale dice dove si scrive.
- **Colonne uguali**: `table-layout: fixed`, la larghezza non dipende dal contenuto. Le intestazioni lunghe
  vanno a capo dentro la colonna.
- **Una colonna larga**, facoltativa: `rg-table__grow` sulla `<th>` vale **il doppio** delle altre. La
  tabella dichiara quante colonne ha con `style="--rg-table-cols: N"` (se manca vale 6); se le colonne larghe
  sono più di una, lo dice `--rg-table-wide` (1.25.0, se manca vale 1): `style="--rg-table-cols: 6; --rg-table-wide: 2"`.
- **Altezza**: le celle `--cell` sono da 32 px; dentro `rg-worksheet-block--compact` da 24 (~6,4 mm).
- Si combina con `rg-table--compact`. Non cambia nulla alle tabelle senza la variante.
- **Non è a schermo**: a schermo i dati si confrontano con `rg-table` e si inseriscono con `rg-field`.

```html
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
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
    </tr>
  </tbody>
</table>
```

## Tabella su cui si scrive a penna (`rg-table--hand`, proposta 1.37.0)

La tabella **degli stop** del foglio di lavorazione stampato: undici o tredici colonne, quasi tutte da
tre o quattro cifre (`STOP`, `AGO`, `AP`, `PMI`, `VEL`) e due o tre di parole (`OPERAZIONE`,
`MATERIALE`, `NOTE`), **diciotto righe su un A4**. Non è una tabella da leggere: è una tabella su cui
l'operatrice **scrive** tempi e note a penna, sopra la riga stampata.

Si mette **sopra** `rg-table--grid`, che resta quella che dice *in che colonna* si scrive.

- **La riga vale l'altezza della mano**, non del testo: 32 px (~8,5 mm), la stessa misura di
  `rg-fill-field`. Vince sulle righe da 24 di `rg-worksheet-block--compact`: lì la tabella si legge,
  qui ci si scrive sopra.
- **Corpo a 14 px** (`--rg-font-size-sm`): è la misura di quello che si legge mentre si scrive.
- **Intestazione a 12 px** (`--rg-font-size-xs`), un gradino sotto il corpo. In testata c'è una
  *parola* che si legge una volta sola, sopra una colonna larga quattro caratteri: col corpo del testo
  «OPERAZIONE» o va a capo — e un a capo in testata costa l'altezza di una riga su diciotto — o
  allarga una colonna che deve restare stretta. 12 px è **l'ultimo gradino della scala**: sotto non
  c'è niente e non si inventa un valore per un caso locale.
- **Aria fra la parola e il filetto**: `--rg-space-1` per lato in testata (4 px, 8 in tutto). Con la
  griglia «STOP» toccava la linea verticale e si leggeva male; gli 8 px per lato del corpo sarebbero
  16, metà di una colonna da quattro cifre. Il corpo tiene i suoi 8: la penna non deve toccare il
  filetto.
- **L'intestazione non va a capo**: `white-space: nowrap` è nel design system, non inline su ogni
  `<th>` del template. Se una parola non ci sta nemmeno a 12 px, **si accorcia la parola**: due righe
  di testata costano una riga di stop.
- **Limite**: con `table-layout: fixed` una testata che non ci sta *sborda* invece di andare a capo.
  È una scelta: sul foglio lo spazio verticale è finito e si vede in fondo alla pagina. Chi compone la
  tabella dichiara le larghezze (`--rg-table-cols`, `rg-table__grow`) e accorcia le parole.
- **Non è a schermo**: a schermo lo stesso dato si inserisce con `rg-field`, che ha focus, errore e
  sola lettura per davvero.

```html
<table class="rg-table rg-table--compact rg-table--grid rg-table--hand" style="--rg-table-cols: 7; --rg-table-wide: 2">
  <caption>Stop della macchina — tempi e note si scrivono a penna</caption>
  <thead>
    <tr>
      <th class="rg-table__numeric" scope="col">Stop</th>
      <th class="rg-table__grow" scope="col">Operazione</th>
      <th class="rg-table__numeric" scope="col">Ago</th>
      <th class="rg-table__numeric" scope="col">AP</th>
      <th class="rg-table__numeric" scope="col">PMI</th>
      <th class="rg-table__numeric" scope="col">Vel</th>
      <th class="rg-table__grow" scope="col">Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="rg-table__numeric">1</td>
      <td>Fermatura iniziale</td>
      <td class="rg-table__numeric">3</td>
      <td class="rg-table__numeric">1,5</td>
      <td class="rg-table__numeric">180</td>
      <td class="rg-table__numeric">650</td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
    </tr>
    <tr>
      <td class="rg-table__numeric">2</td>
      <td>Cambio filo</td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
      <td class="rg-fill-field rg-fill-field--cell"></td>
    </tr>
  </tbody>
</table>
```

## Struttura

Caption → toolbar filtri → header → righe → paginazione/riepilogo. Header descrittivi; unità nell'header e, se ambiguo, nel valore. Numeri allineati a destra in mono con cifre tabulari. Codici non vanno troncati senza accesso al valore completo.

```html
<div class="rg-table-wrap">
  <table class="rg-table">
    <caption>Consumo fili — revisione 04</caption>
    <thead><tr><th>Codice</th><th>Materiale</th><th class="rg-table__numeric">Consumo (m)</th><th>Stato</th></tr></thead>
    <tbody><tr><td class="rg-table__code">FIL-0281</td><td>Viscosa opaca</td><td class="rg-table__numeric">18.42</td><td>Validato</td></tr></tbody>
  </table>
</div>
```

