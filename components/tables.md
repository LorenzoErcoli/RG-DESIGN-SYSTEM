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
- Nasce per le tabelle da compilare a penna del [fascicolo compatto](worksheet-block.md#tabelle-eccezioni-per-stop),
  ma vale ovunque.

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

