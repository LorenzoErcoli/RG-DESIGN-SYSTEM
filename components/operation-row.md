# Operation row (sequenza di lavoro compilabile)

## Scopo

La **sequenza di operazioni di una lavorazione, compilata a schermo**: righe in ordine di
esecuzione, ognuna con un tempo e da zero a tre campi propri, alcune ripetibili. È la forma
*editabile* di ciò che [`rg-steps`](steps.md) mostra in sola lettura e
[`rg-worksheet-block`](worksheet-block.md) stampa su carta.

Il caso che l'ha generata: la scheda di stampa UV — preparazione materiale, piazzamento, stampa,
cambio piano, pulizia stampante; la stampa in composito è **due righe** (prima bianco, poi colore).
Chi compila lo fa decine di volte, riscrive i tempi a ogni commessa e legge tutto il resto.

### Perché non una tabella, e perché non una card per operazione

**Non una `rg-table`.** Le operazioni non hanno le stesse colonne: la preparazione ha solo il
tempo, la stampa ha inchiostri, passate e file. Una tabella dovrebbe portare l'**unione** dei campi
di tutte le operazioni — una matrice quasi vuota, dove ogni riga usa due celle su sei e le altre
quattro sono buchi che si leggono come dati mancanti. La tabella è la forma delle righe
**omogenee**; qui il vuoto mentirebbe. (La regola resta: se un giorno tutte le operazioni avessero
gli stessi campi, la tabella tornerebbe a essere la forma giusta.)

**Non una card per operazione.** Cinque riquadri sono cinque cornici: più cromo e più scroll per lo
stesso contenuto, contro §2 e §6 delle regole (non trasformare ogni contenuto in una card; usare
linee per mostrare struttura).

**Quindi righe su superficie aperta**, separate da un filetto, con la **testa in colonna** —
indice e nome incolonnati a sinistra, così l'occhio scorre la sequenza in verticale senza
rileggerla — e la **coda che scorre**: i campi prendono la larghezza del proprio contenuto
(`rg-field--w*`) e vanno a capo solo quando non entrano. Un'operazione da tre campi occupa **una
riga sola** invece delle due righe di una griglia `1fr 1fr`.

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-operation-row` | L'operazione ordinaria della sequenza. |
| `rg-operation-row--repeat` | La **ripetizione** della riga precedente (seconda passata della stessa operazione): rientro + filetto verticale che la lega alla riga sopra. |

## Uso e limiti

**L'ordine di tabulazione è il lavoro.** Nessun `role="grid"`, nessun *roving tabindex*: i campi
sono controlli di form che si compilano in sequenza, e restano tutti nella sequenza di Tab nativa.
L'[ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) prescrive il pattern `grid` — dove
**una sola** cella è nella tab sequence e le frecce navigano — quando serve *accorciare* la
sequenza per non intrappolare l'utente in una lista lunga. Qui è il contrario: cinque righe per
quattro campi sono venti stop, e sono esattamente i venti gesti del compilatore.

**Le azioni della riga stanno in fondo alla riga, anche nel DOM.** Chi tabula attraversa i campi e
trova «Ripeti» alla fine, non prima di aver compilato: un controllo in mezzo al form rompe la
sequenza attesa dal tasto Tab.

**La testa si allinea alle etichette, non ai controlli.** Il nome dell'operazione è una *label di
riga* e sta sulla stessa linea ottica delle label che ha accanto. La larghezza della colonna-testa
è `--rg-operation-head`, una misura **derivata dal contenuto** e non un numero: `28ch` di default,
cioè l'indice più circa ventiquattro caratteri di nome («Preparazione materiale» ne ha 22). Stessa
logica di `--rg-input-numeric-width`: si stringe o si allarga sul contenitore, non sul componente.

**Si posa su una superficie sollevata.** L'hover chiaro presuppone il bianco sotto: la lista va nel
corpo di una `rg-section-card`, non sul fondo di pagina (§6 delle regole).

**Ripetizione = struttura + testo.** Il rientro dice *che* è una ripetizione, l'indice scritto
(`01·2`) dice *di chi*. Il rientro da solo non basta e il colore non è ammesso come unico segnale.

**Limite noto — sotto i 680 px** la testa passa a riga propria sopra i campi: la colonna dei nomi
sparisce e la sequenza si legge come un elenco. È il compromesso accettato; sotto quella larghezza
una colonna fissa da 28ch lascerebbe ai campi meno dello spazio minimo.

**Non è la lista delle fasi.** Le operazioni stanno *dentro* una fase. Per l'elenco delle fasi di
una parte si usa `rg-list-row` o `rg-steps`.

## Struttura

Contenitore `<ol>` → riga → `[testa | campi | azioni]`. La frase che spiega il marcatore sta
**una volta** sopra la lista, e i campi marcati la puntano con `aria-describedby`.

```html
<p id="nota-costo" class="rg-small">
  I campi contrassegnati <span class="rg-field__mark">€</span> entrano nel costo della fase.
  Gli altri sono di scheda: servono a rifare il lavoro.
</p>

<ol class="rg-operation-list">
  <li class="rg-operation-row">
    <div class="rg-operation-row__head">
      <span class="rg-operation-row__index">01</span>
      <span class="rg-operation-row__name">Preparazione materiale</span>
    </div>
    <div class="rg-cluster rg-cluster--end">
      <label class="rg-field rg-field--w8">
        <span class="rg-field__label">Tempo <span class="rg-field__mark" aria-hidden="true">€</span></span>
        <input class="rg-input rg-input--numeric" type="text" inputmode="decimal"
               name="op__01__tempo" value="4.5" aria-describedby="nota-costo">
      </label>
    </div>
    <div class="rg-operation-row__actions">
      <button class="rg-button rg-button--ghost" type="submit"
              name="ripeti" value="01">+ Ripeti</button>
    </div>
  </li>

  <li class="rg-operation-row">
    <div class="rg-operation-row__head">
      <span class="rg-operation-row__index">03</span>
      <span class="rg-operation-row__name">Stampa</span>
    </div>
    <div class="rg-cluster rg-cluster--end">
      <label class="rg-field rg-field--w8">
        <span class="rg-field__label">Tempo <span class="rg-field__mark" aria-hidden="true">€</span></span>
        <input class="rg-input rg-input--numeric" type="text" inputmode="decimal"
               name="op__03__tempo" value="12" aria-describedby="nota-costo">
      </label>
      <label class="rg-field rg-field--w4">
        <span class="rg-field__label">Passate</span>
        <input class="rg-input rg-input--numeric" type="text" inputmode="numeric" name="op__03__passate" value="2">
      </label>
      <label class="rg-field rg-field--w16">
        <span class="rg-field__label">Inchiostri</span>
        <input class="rg-input" name="op__03__inchiostri" value="CMYK + W">
      </label>
      <label class="rg-field rg-field--grow">
        <span class="rg-field__label">File</span>
        <input class="rg-input rg-mono" name="op__03__file" value="RG-0481_p2_uv.prn">
      </label>
    </div>
    <div class="rg-operation-row__actions">
      <button class="rg-button rg-button--ghost" type="submit" name="ripeti" value="03">+ Ripeti</button>
    </div>
  </li>

  <li class="rg-operation-row rg-operation-row--repeat">
    <div class="rg-operation-row__head">
      <span class="rg-operation-row__index">03·2</span>
      <span class="rg-operation-row__name">Stampa — colore</span>
    </div>
    <div class="rg-cluster rg-cluster--end">
      <!-- gli stessi campi della riga di cui è la ripetizione -->
    </div>
    <div class="rg-operation-row__actions">
      <button class="rg-button rg-button--ghost" type="submit" name="rimuovi" value="03-2">Rimuovi</button>
    </div>
  </li>
</ol>
```

L'azione «aggiungi un'operazione» — quando è la *lista* a crescere, non la singola riga — sta in un
`rg-cluster` sotto la lista e **sopra** il pulsante primario del form: si arriva prima
all'aggiunta che al salvataggio, e il primario resta l'ultima cosa che si incontra.

```html
<div class="rg-cluster rg-u-mt-4">
  <button class="rg-button rg-button--secondary" type="submit" name="aggiungi">+ Aggiungi operazione</button>
</div>
<div class="rg-cluster rg-u-mt-4">
  <button class="rg-button rg-button--primary" type="submit">Salva i valori</button>
  <span class="rg-small">Un campo lasciato vuoto cancella il valore.</span>
</div>
```

## Stati

`default`, `hover` (superficie chiara), `focus` (sui controlli, dal DS), `repeat` (rientro +
filetto), `empty` (lista senza operazioni → `rg-empty` al posto della `<ol>`). La riga non ha uno
stato di errore proprio: l'errore appartiene al **campo** (`rg-field.is-error`), perché è il campo
che è sbagliato, non l'operazione.
