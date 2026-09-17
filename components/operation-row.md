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

**La coda è una [`rg-form-row`](forms.md#riga-di-campi-rg-form-row--i-controlli-in-fila-laiuto-sotto)**
(dalla 1.17.0). Fino alla 1.16 era `rg-cluster rg-cluster--end`, che allinea i campi al piede:
bastava un aiuto o un errore sotto un campo per alzare il suo controllo rispetto ai vicini, e
abbassare le azioni della riga sotto gli input. Con `rg-form-row` i controlli restano in fila, e
le azioni si posano sulla loro linea. `rg-cluster--end` resta accettato, e senza aiuti il risultato
è lo stesso: la migrazione è un cambio di classe.

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
    <div class="rg-form-row">
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
    <div class="rg-form-row">
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
    <div class="rg-form-row">
      <!-- gli stessi campi della riga di cui è la ripetizione -->
    </div>
    <div class="rg-operation-row__actions">
      <button class="rg-button rg-button--ghost" type="submit" name="rimuovi" value="03-2">Rimuovi</button>
    </div>
  </li>
</ol>
```

> **Proposta non rilasciata — sequenza di operazioni.** Per le fasi non-ricamo la lista, il tempo e
> l'aggiunta stanno in `rg-operation-sequence` ([pattern](../patterns/operation-sequence.md)): aggiunta
> in basso a destra con `rg-button--secondary` + icona («Aggiungi in fondo»), gesti a quattro posti fissi
> a sola icona (su · giù · duplica | togli), «Nota» in coda ai campi, `rg-operation-row__slot` per il
> gesto che la riga non ha, `rg-operation-row--off` per la facoltativa non inclusa, `is-new` per la riga
> appena aggiunta, `rg-operation-sequence__total` per il tempo per pezzo. Il paragrafo che segue resta
> valido per le liste che non sono una sequenza di fase.

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

## Riordinare le righe: ↑ ↓ (1.20.0)

Decisione di prodotto (2026-09-16): **le righe della sequenza si riordinano con due bottoni, sposta in
su e sposta in giù, non con il trascinamento.** Il trascinamento non ha un equivalente da tastiera se
non lo si costruisce a parte, su una riga piena di campi si confonde con la selezione del testo, e a
schermo tattile si scontra con lo scorrimento. Due bottoni per riga funzionano con il mouse, con la
tastiera e senza JavaScript (un `submit` per mossa).

**Forma: sola icona con suggerimento**, come «Elimina» in riga e «Elimina la fase» nella testa del
blocco. È un'azione **ripetuta su ogni riga**, le frecce su e giù sono **universali**, e il gesto è
reversibile con un clic: la regola di [buttons](buttons.md#icona-testo-o-entrambi) dice sola icona.
Non `rg-button--ghost` con icona e testo: «Sposta su · Sposta giù · + Ripeti» su ogni riga fa una
colonna di parole uguali più larga dei campi.

- `rg-icon-button rg-icon-button--full` (40×40, il target minimo) con [`rg-tooltip`](tooltip.md): il
  suggerimento è il **nome** del bottone (`aria-labelledby`) e nomina la riga, perché venti bottoni
  «Sposta in su» uguali non dicono quale: «Sposta in su: 03 Stampa — bianco».
- Icone `sposta-su` e `sposta-giu`, sempre in quest'ordine: su prima di giù, nel DOM e a vista.
- Le due frecce stanno in un [`rg-action-group`](action-group.md) proprio, **prima** delle altre
  azioni della riga («+ Ripeti», «Rimuovi»), con `role="group"` e `aria-label` «Ordine di 03 Stampa —
  bianco». Il filetto del gruppo le separa da Ripeti/Rimuovi, che cambiano il **contenuto** della
  sequenza e non solo l'ordine.
- **Prima riga: «sposta in su» disabilitato; ultima riga: «sposta in giù» disabilitato.** Il bottone
  **resta al suo posto**, non si nasconde: le frecce restano in colonna su tutte le righe
  e la mano trova sempre lo stesso bottone nello stesso punto. Il motivo è a vista (non c'è una riga
  sopra, o sotto), e il suggerimento lo dice: «Già la prima: 01 Preparazione materiale». Con una sola
  riga, tutti e due spenti. Aspetto: icona grigia, niente bordo in hover, cursore «non consentito».
- **Spento con `aria-disabled="true"`, non con `disabled`** (dalla 1.22.0; nella 1.20.0 era `disabled`).
  Un bottone `disabled` esce dalla sequenza di Tab, e con lui il suo suggerimento: da tastiera il
  motivo non si leggeva mai. Con `aria-disabled` il bottone resta raggiungibile, il lettore di schermo
  lo annuncia «non disponibile» e il suggerimento compare al fuoco. **Il gesto non parte**: chi serve la
  pagina blocca il `submit` (il controller annulla il click su `[aria-disabled="true"]`) e il server
  rifiuta comunque la mossa impossibile. Vale per le frecce e per «Togli» spento
  ([sequenza di operazioni](../patterns/operation-sequence.md)).
- **Dopo lo spostamento il fuoco segue la riga.** Con il `submit` la pagina si ricarica: il server
  rimette il fuoco sulla stessa freccia della riga spostata (`autofocus`, o un'ancora per riga), e
  se quella freccia ora è spenta (la riga è diventata la prima o l'ultima) sull'altra. Senza
  questo, chi usa la tastiera ricomincia da capo a ogni mossa.
- **Le ripetizioni** (`--repeat`) si muovono con la riga di cui sono ripetizione, o solo dentro il suo
  gruppo: è una regola del dominio e la decide la piattaforma. Il DS dà solo i bottoni; se una
  ripetizione non può uscire dal suo gruppo, la freccia che la farebbe uscire è spenta (`aria-disabled`) con il
  motivo nel suggerimento.
- L'indice (`01`, `03·2`) si **rinumera** dopo la mossa: è la posizione nella sequenza, non un
  identificativo.

```html
<li class="rg-operation-row">
  <div class="rg-operation-row__head">
    <span class="rg-operation-row__index">01</span>
    <span class="rg-operation-row__name">Preparazione materiale</span>
  </div>
  <div class="rg-form-row"><!-- campi --></div>
  <div class="rg-operation-row__actions">
    <div class="rg-action-group" role="group" aria-label="Ordine di 01 Preparazione materiale">
      <span class="rg-tooltip">
        <button class="rg-icon-button rg-icon-button--full" type="submit" name="sposta_su" value="01" aria-disabled="true" aria-labelledby="tip-su-01"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-sposta-su"></use></svg></button>
        <span class="rg-tooltip__text" role="tooltip" id="tip-su-01">Già la prima: 01 Preparazione materiale</span>
      </span>
      <span class="rg-tooltip">
        <button class="rg-icon-button rg-icon-button--full" type="submit" name="sposta_giu" value="01" aria-labelledby="tip-giu-01"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-sposta-giu"></use></svg></button>
        <span class="rg-tooltip__text" role="tooltip" id="tip-giu-01">Sposta in giù: 01 Preparazione materiale</span>
      </span>
    </div>
    <div class="rg-action-group">
      <button class="rg-button rg-button--ghost" type="submit" name="ripeti" value="01">+ Ripeti</button>
    </div>
  </div>
</li>
```

## Stati

`default`, `hover` (superficie chiara), `focus` (sui controlli, dal DS), `repeat` (rientro +
filetto), `empty` (lista senza operazioni → `rg-empty` al posto della `<ol>`). La riga non ha uno
stato di errore proprio: l'errore appartiene al **campo** (`rg-field.is-error`), perché è il campo
che è sbagliato, non l'operazione.
