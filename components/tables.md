# Tables

## Scopo

Confrontare record strutturati: materiali, fili, operazioni, consumi, revisioni e risultati.

## Varianti

- **Standard**: densità media, intestazione persistente opzionale.
- **Compact**: grandi dataset, altezza riga minima 36 px.
- **Review**: colonna stato, differenze e azioni contestuali.
- **Matrix**: parametri incrociati; prima colonna e header bloccabili.
- **A griglia** (`rg-table--grid`): la tabella **di carta** da compilare a penna; filetto nero su
  tutte le celle e colonne uguali.
- **Da scrivere a mano** (`rg-table--hand`, 1.38.0): si aggiunge a `--grid` quando su quelle righe
  si scrive *davvero*; le porta a 40 px (~10,6 mm), l'altezza di una grafia.
- **Espandibile** (`rg-table__row--expandable` + `rg-table__detail`): una riga-record che
  rivela in loco la propria scomposizione (i sotto-record che la compongono) senza lasciare
  la tabella. Variante, non componente a sé: preserva la semantica tabellare.

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
  Se su quelle righe si scrive a mano, la griglia non basta e serve
  [`rg-table--hand`](#tabella-su-cui-si-scrive-a-penna-rg-table--hand-proposta-1380).
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

## Tabella su cui si scrive a penna (`rg-table--hand`, proposta 1.38.0)

`--grid` dice **dove** si scrive; `--hand` dice **quanto spazio c'è per farlo**. Si aggiunge alla
griglia quando la tabella non è un elenco da leggere ma un **modulo che qualcuno compila riga per
riga, mentre lavora**: la tabella degli stop del foglio del ricamo, dove il tempo e la nota di
quello stop si annotano a biro con la macchina in moto.

> «Righe più alte, 18 per pagina. Serve spazio per scrivere le note. E deve essere abbastanza per
> stop.» — Lorenzo, 2026-09-22

- **L'altezza è la mano, non il testo.** È la stessa frase di [fill-field](fill-field.md), e qui è la
  ragione dell'intera variante. Le righe di una tabella densa sono ~26 px (~7 mm): la misura di una
  riga **letta**. La punta della biro ci entra, la grafia no — e in reparto una riga in cui non si
  riesce a scrivere resta vuota, cioè il dato si perde.
- **La misura è 40 px (~10,6 mm).** I 32 px della grafia adulta dichiarati da `rg-fill-field`, più un
  passo: qui la mano scrive **dentro una griglia chiusa sui quattro lati**, non sopra una riga aperta,
  quindi non può sbordare. Sta sulla scala (32 + 8) ed è un **minimo**: una cella con un valore lungo
  che va a capo cresce, come già fa `rg-fill-field__line`.
- **Il dato stampato appoggia dove appoggia la scrittura**: le celle sono allineate **in basso**, così
  il numero dello stop già stampato e il tempo scritto a mano cadono sulla stessa linea invece di
  galleggiare uno a metà cella e l'altro sul filetto. Sopra resta il bianco, che è lo spazio della mano.
- **La testata non si alza**: su di lei non si scrive.
- **Opt-in, e per una ragione precisa.** Nello stesso fascicolo ci sono tabelle che si *leggono*
  soltanto — la legenda dei coni, le fasi della [pagina della parte](part-sheet.md) — e alzarle tutte
  vorrebbe dire pagare in carta uno spazio che nessuno usa. La classe la mette l'app **sulla tabella
  che si compila, e solo lì**.
- Vale a schermo come in stampa: l'altezza è una misura fisica della mano, non un fatto della carta.

### Quante righe per pagina

Diciotto, ed è un numero **misurato**, non una regola: il CSS non sa contare le righe. Su A4 con
intestazione di pagina (`rg-u-print-a4--head`, margini 30/12 mm) e la testata del foglio del ricamo
sopra la tabella, per il corpo restano ~194 mm: **18 righe da 10,6 mm ne occupano 190 e la
diciannovesima non entra**. Il resto passa alla pagina dopo con l'intestazione ripetuta (la regola è
di `rg-worksheet-block--long`, in `rg-utilities.css`) — il foglio si stampa fronte-retro e il
diciannovesimo stop sta dietro.

**Limite dichiarato**: quel 18 dipende da quanto c'è **sopra** la tabella. Una fase con una riga di
campi in meno ne fa entrare una in più, una con un titolo su due righe una in meno. Chi ha bisogno di
un numero esatto di righe per pagina non lo ottiene dal CSS: lo ottiene spezzando la tabella a monte.

```html
<table class="rg-table rg-table--compact rg-table--grid rg-table--hand" style="--rg-table-cols: 8">
  <caption>Stop — tempi e note si scrivono su qualunque riga</caption>
  <thead>
    <tr>
      <th class="rg-table__numeric" scope="col">Stop</th>
      <th class="rg-table__numeric" scope="col">Ago</th>
      <th class="rg-table__code" scope="col">Sopra</th>
      <th class="rg-table__code" scope="col">Sotto</th>
      <th scope="col">Operazione</th>
      <th class="rg-table__grow" scope="col">Materiale</th>
      <th class="rg-table__numeric" scope="col">Tempo</th>
      <th class="rg-table__grow" scope="col">Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="rg-table__numeric">1</td>
      <td class="rg-table__numeric">2</td>
      <td class="rg-table__code">850/70</td>
      <td class="rg-table__code">850/120</td>
      <td>Appoggio</td>
      <td>1 Tulle TML01012</td>
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

