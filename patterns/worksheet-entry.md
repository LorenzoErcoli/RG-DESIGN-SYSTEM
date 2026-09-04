# Scheda di lavorazione da compilare

## Scopo

La pagina dove si **compila la scheda tecnica di una fase**: alcuni parametri di impostazione del
lavoro, e la sequenza delle operazioni con i loro tempi. Chi la usa sta in ufficio prodotto o in
reparto, compila decine di schede simili, riscrive i tempi a ogni commessa e rilegge tutto il
resto.

Non è un pannello di configurazione ([settings.md](settings.md)): lì si decidono i default per
tutti, qui si dichiara **questo** lavoro. Non è la scheda stampata
([worksheet-block](../components/worksheet-block.md)): quella la compila l'operatore a penna,
questa la compila l'ufficio a tastiera.

## Il difetto che questo pattern corregge

Una sequenza piatta di `rg-field` dentro una griglia `1fr 1fr` — che è la forma in cui queste
schede nascono — produce tre problemi insieme:

1. **Tutti i campi larghi uguale.** Un tempo da tre cifre occupa metà pagina; un percorso file
   occupa lo stesso spazio e non ci sta. La larghezza smette di dire qualcosa e chi compila deve
   leggere ogni etichetta per capire cosa ci va.
2. **Spazi indistinguibili.** Se la distanza fra due campi e la distanza fra due gruppi sono la
   stessa, non ci sono gruppi: c'è un elenco. È la *legge di prossimità* della Gestalt applicata al
   contrario — «gli elementi vicini appaiono correlati», quindi elementi equidistanti da tutto non
   appaiono correlati a niente.
3. **Scroll inutile.** Un'operazione con tre campi occupa due righe di griglia invece di una.
   Moltiplicato per cinque operazioni, è mezza schermata di scroll che non porta informazione.

## Le cinque decisioni

### 1. Una colonna di compilazione, campi larghi quanto il contenuto

Il form è **a una colonna** nel senso che conta: un solo asse verticale di lettura, un solo asse di
tabulazione. Colonne multiple interrompono lo slancio verticale e costringono a riorientarsi.

Dentro quella colonna, i campi **non** sono larghi uguale: la larghezza è la dichiarazione di
quanto contenuto ci si aspetta (`rg-field--w4` … `--w24`, `--grow`). Un tempo è `--w8`, le passate
sono `--w4`, il percorso file è `--grow`.

Le **etichette stanno sopra** il campo: si leggono etichetta e campo con una sola fissazione,
mentre con le etichette a sinistra allineate a sinistra la distanza variabile costringe a un
movimento oculare per ogni riga. E restano di **peso normale**: il grassetto sulle etichette sopra
il campo peggiora, non migliora.

Non serve accorciare la pagina piegando i campi su due colonne per «guadagnare spazio»: si
guadagna molto di più dando a ogni campo la sua misura, perché più campi stanno sulla stessa riga.

### 2. Due gruppi, non dodici campi

Il contenuto si divide per **quando si compila**, non per come è fatto il catalogo:

- **Impostazione del lavoro** — percorso file, profilo materiale, dpi e passi, altezza testa, tipo
  supporto, pezzi al piano. Si compilano una volta e poi si rileggono.
- **Operazioni** — quello che si riscrive a ogni commessa.

Le operazioni vanno **prima**: sono il lavoro. L'impostazione va dopo, in una
`rg-disclosure--boxed`, **aperta quando è da compilare e chiusa quando è già piena** — lo stato
iniziale lo decide il dato, non il componente.

Il ritmo verticale segue la scala: **8 px** dentro un campo, **16 px** fra campi, **24–32 px** fra
gruppi, **48 px** fra sezioni. Se due di queste distanze coincidono, il livello corrispondente
sparisce.

### 3. Quando la disclosure aiuta e quando fa danno

Nascondere **aiuta** quando: chi apre la pagina ha bisogno solo di una parte del contenuto; il
compito è una sequenza logica; le sezioni sono indipendenti e non si confrontano fra loro.

Nascondere **fa danno** quando: chi apre la pagina ha bisogno di quasi tutto — allora l'accesso
immediato vale più della pagina corta, e ogni apertura è un costo di interazione che si accumula;
il contenuto nascosto è poco — una disclosure su tre campi fa sembrare la pagina vuota; la
gerarchia è profonda — disclosure annidate fanno perdere il segno; il contenuto va **stampato** —
i pannelli chiusi non si stampano, e questa scheda finisce in stampa.

Applicato qui: **una sola** disclosure, sull'impostazione del lavoro, che è l'unica parte che si
rilegge invece di riscriverla. Le operazioni **non** vanno chiuse: sono il motivo per cui la pagina
è aperta. Regola pratica del DS: più di cinque sezioni riquadrate in pagina non è un problema del
componente, è un problema della pagina.

Il trigger deve **dire cosa contiene** e quanto ne manca: `Impostazione del lavoro` +
`rg-badge--count` con «3 da compilare» oppure `rg-badge--validated` «completa». Un trigger che non
dà indizio non viene aperto, e il contenuto dietro non viene visto.

### 4. La sequenza di operazioni è una lista di righe, non una tabella

Vedi [operation-row](../components/operation-row.md) per la motivazione completa. In breve: le
operazioni non hanno le stesse colonne (da zero a tre campi propri, diversi fra loro), quindi una
tabella porterebbe l'unione dei campi e una matrice quasi vuota; cinque card sono cinque cornici e
più scroll. La forma giusta è **righe rigate con la testa in colonna e la coda che scorre**.

La **ripetizione** (la stampa in composito: prima bianco, poi colore) è una riga in più con
`rg-operation-row--repeat`, e il pulsante che la crea sta **in fondo alla riga che clona** — dove
produce l'effetto, e dove chi tabula lo incontra dopo aver compilato, non prima.

### 5. Il costo si dichiara una volta

«Questo campo entra nel costo» vale per alcuni campi. Scritto sotto ognuno diventa rumore: cinque
volte la stessa frase, e in lettura assistita cinque volte a ogni campo. Le istruzioni che valgono
per un gruppo si danno **una volta in testa al gruppo** e si legano ai controlli con
`aria-describedby`; nell'etichetta resta un `rg-field__mark`, un carattere e non un colore.

Si marcano le **eccezioni**, non la regola: se i campi marcati sono più di quelli non marcati, si
inverte il marcatore e si cambia la frase.

## Tastiera

- **Ordine del DOM = ordine di compilazione.** Nessun `tabindex` positivo. Le celle della sequenza
  restano tutte nella tab sequence nativa: non è un `role="grid"` da navigare con le frecce, è un
  form da percorrere con Tab.
- **Niente controlli in mezzo ai campi.** «Ripeti» in fondo alla riga, «aggiungi operazione» sotto
  la lista, «vai al catalogo» sopra il form.
- **Numerici con `inputmode`, non `type="number"`**: la rotellina del mouse cambia il valore di un
  campo `number` che ha il focus, e una scheda si compila scorrendo.
- **Un solo pulsante primario**, allineato al bordo sinistro dei campi, subito sotto l'ultimo. Non
  serve una barra fissa in basso: la barra costa spazio permanente e qui basta arrivare in fondo.
  Se la pagina cresce oltre due schermate, prima si divide la pagina, poi si valuta la barra.

## Struttura

```html
<section class="rg-section-card">
  <header class="rg-section-card__header">
    <div class="rg-section-card__heading">
      <h2 class="rg-section-card__title">Stampa UV — parametri della fase</h2>
      <p class="rg-section-card__subtitle">I tempi sono in minuti. Un campo vuoto cancella il valore.</p>
    </div>
  </header>
  <div class="rg-section-card__body">
    <form method="post" action="…">

      <div class="rg-section-header rg-section-header--sub">
        <span class="rg-label">Operazioni</span>
        <span class="rg-section-header__meta">5 in sequenza</span>
      </div>
      <p id="nota-costo" class="rg-small">
        I campi contrassegnati <span class="rg-field__mark">€</span> entrano nel costo della fase.
        Gli altri sono di scheda: servono a rifare il lavoro.
      </p>

      <ol class="rg-operation-list rg-u-mt-4">
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
        <!-- … le altre operazioni … -->
      </ol>

      <details class="rg-disclosure rg-disclosure--boxed rg-u-mt-6">
        <summary class="rg-disclosure__trigger">
          Impostazione del lavoro
          <span class="rg-badge rg-badge--count rg-badge--estimated">3 da compilare</span>
        </summary>
        <div class="rg-disclosure__content">
          <div class="rg-param-grid">
            <label class="rg-field rg-param-grid__wide">
              <span class="rg-field__label">Percorso file</span>
              <input class="rg-input rg-mono" name="par__percorso" value="\\\\NAS\\UV\\2026\\RG-0481">
            </label>
            <label class="rg-field">
              <span class="rg-field__label">Profilo materiale</span>
              <input class="rg-input" name="par__profilo" value="Polibond 45 gr">
            </label>
            <label class="rg-field">
              <span class="rg-field__label">Tipo supporto</span>
              <input class="rg-input" name="par__supporto" value="Rigido">
            </label>
            <label class="rg-field">
              <span class="rg-field__label">DPI</span>
              <input class="rg-input rg-input--numeric" type="text" inputmode="numeric" name="par__dpi" value="720">
            </label>
            <label class="rg-field">
              <span class="rg-field__label">Passi</span>
              <input class="rg-input rg-input--numeric" type="text" inputmode="numeric" name="par__passi" value="8">
            </label>
            <label class="rg-field">
              <span class="rg-field__label">Altezza testa</span>
              <span class="rg-field-with-unit">
                <input class="rg-input rg-input--numeric" type="text" inputmode="decimal" name="par__altezza" value="1.6">
                <span>mm</span>
              </span>
            </label>
            <label class="rg-field">
              <span class="rg-field__label">Pezzi al piano <span class="rg-field__mark" aria-hidden="true">€</span></span>
              <input class="rg-input rg-input--numeric" type="text" inputmode="numeric"
                     name="par__pezzi" value="12" aria-describedby="nota-costo">
            </label>
          </div>
        </div>
      </details>

      <div class="rg-cluster rg-u-mt-4">
        <button class="rg-button rg-button--primary" type="submit">Salva i valori</button>
        <span class="rg-small">Un campo lasciato vuoto cancella il valore.</span>
      </div>
    </form>
  </div>
</section>
```

## Stati da prevedere

`vuoto` (nessuna operazione a catalogo → `rg-empty`, non una lista vuota), `sola lettura` (motivo
in un `rg-alert` accanto al form e primario **omesso**, non disabilitato), `errore di campo`
(`rg-field.is-error` più riepilogo in testa quando gli errori sono più d'uno), `override`
(`rg-field.is-warning` con il default dichiarato — vedi [settings.md](settings.md)).

## Fonti

Le scelte sopra derivano da: NN/g, *Website Forms Usability: Top 10 Recommendations* e *Form
Design: Use White Space Effectively* (colonna singola, prossimità, etichette sopra); Matteo Penzo,
*Label Placement in Forms*, UXmatters (eye-tracking: etichetta sopra = una sola fissazione;
grassetto peggiora); Baymard Institute, *Form Field Usability: Matching User Expectations*
(larghezza = lunghezza attesa, tre casi); Adam Silver, *Form design: from zero to hero* e *Where to
put buttons on forms*; Luke Wroblewski / Etre, *Primary & Secondary Actions in Web Forms*
(eye-tracking sulla posizione dei bottoni); NN/g, *Accordions on Desktop: When and When Not to Use
Them* e *Progressive Disclosure*; W3C WAI Forms Tutorial, *Grouping Controls* e *Form
Instructions*; WCAG 2.1 SC 2.4.3 *Focus Order*; ARIA APG, *Grid Pattern*; GOV.UK Design System,
*Text input* e *Why the GOV.UK Design System team changed the input type for numbers*.
