# Regole di design RG

## 1. Principi generali

L'interfaccia RG è uno strumento di laboratorio: precisa, leggibile e calma. Deve mostrare la complessità senza spettacolarizzarla. La struttura deriva da griglia, tipografia, spaziatura e linee. Ogni elemento deve avere una funzione verificabile.

Ordine delle priorità: comprensione → accuratezza → efficienza → identità → decorazione.

## 2. Cosa evitare

- Dashboard SaaS composte da card uniformi e KPI sovradimensionati.
- Colori vivaci usati come scorciatoia gerarchica.
- Gradienti, glow, ombre profonde, vetro, illustrazioni casuali.
- Pillole ovunque, radius eccessivi, icone senza label.
- Testi tutti maiuscoli in paragrafi o tabelle dense.
- Informazioni tecniche prive di unità, origine o precisione.
- Azioni distruttive vicine all'azione primaria senza separazione.

## 3. Tipografia

- **AGNext**: H1–H3, navigazione, label principali, numeri hero e firme identitarie. Usare con misura; non per lunghi paragrafi.
- **GT America Standard**: corpo, note, descrizioni, contenuto editoriale e help text.
- **GT America Mono**: codici articolo, ID, versioni, timestamp, consumi, quantità, misure, log, debug e dati tabellari.
- Applicare cifre tabulari ai valori confrontabili. Non simulare un font ufficiale con tracking estremo.
- Gerarchia consigliata: display 48/52, H1 36/40, H2 28/34, H3 20/26, body 16/24, small 14/20, technical 13/18.

### Il peso è una proprietà della classe, non dell'elemento

Ogni classe di titolo **dichiara il proprio peso**. Un titolo che non lo dichiara lo eredita dallo
user-agent: su `<h2>` esce 700, su `<p>` esce 400, e lo stesso ruolo si legge in due modi diversi.

Due livelli, e due soltanto:

| Livello | Chi | Peso |
| --- | --- | --- |
| **Pagina / sezione** — intesta una schermata o un blocco di primo ordine | `.rg-h1`, `.rg-h2`, `.rg-section-header__title` | `--rg-weight-heading` (700) |
| **Contenitore** — intesta una card, un tab, un gruppo dentro la pagina | `.rg-h3`, `.rg-card__title`, `.rg-section-card__title`, `.rg-param-section__title` | `--rg-weight-medium` (500) |

Il corpo del testo è 16 px (`--rg-font-size-md`); 14 px è lo *small*, non il corpo. Restano a 14,
per dichiarazione propria, tutto ciò che non è testo corrente: **controlli** (campi, bottoni,
toggle, trigger), **navigazione** (voci di sidebar e di topbar) e **dato denso** (celle di tabella,
righe-record, coppie chiave-valore).

Il peso non è mai l'unico segnale di gerarchia. Il livello 500 richiede un medium reale: senza i
font ufficiali caricati, il fallback (Arial) arrotonda 500 a 400 e la distinzione 700/500 si
assottiglia. Il corpo, la superficie e la linea devono reggere la gerarchia da soli.

## 4. Colore

Nero e bianco sono fondamento e contrasto. I grigi semantici derivano dalla scala neutra e servono per bordi, testo secondario e superfici tecniche.

Le palette stagionali:

- possono apparire in badge, grafici, highlight, stati secondari e contenuti editoriali;
- non definiscono bottoni primari, navigazione globale, focus o testo fondamentale;
- non devono essere l'unico segnale di stato;
- vanno referenziate tramite alias semantici, non HEX sparsi.

La palette Perugino in `tokens.json` è provvisoria fino alla campionatura della fonte ufficiale.

La palette **categoriale** (`--rg-color-category-1` … `-7`) distingue categorie *pari-ordinate* — i reparti di produzione, le serie di un grafico, i layer di un file importato — dove non esiste né gerarchia né significato. Prima della 1.14.0 non c'era: chi doveva distinguere sette cose trovava quattro stati, che un significato ce l'hanno, e tre accenti stagionali, e finiva per inventare HEX.

- Non definisce stato, azione primaria, navigazione o focus.
- Non è **mai** l'unico segnale: chi la usa affianca sempre un nome scritto e una trama o una figura. Vedi [dept-band](components/dept-band.md), che è l'applicazione di riferimento.
- Non introduce colori nuovi nel brand: sono alias di valori già in palette. L'alias serve a dichiarare che lì il valore vale come **categoria**, non come significato.

Conseguenza da conoscere prima di usarla: `category-3`, `-4` e `-5` **sono** `danger`, `warning` e `success`. Categorie e stati non si mescolano nella stessa vista senza una ragione dichiarata, altrimenti lo stesso rosso dice due cose diverse a due metri di distanza.

La palette si ferma a sette, e non è una svista: una categoria in più chiede **un segno in più** — una trama, una figura — non un colore in più. Oltre il settimo colore la distinzione non regge né in scala di grigi né in fotocopia, ed è lì che queste cose vengono lette davvero.

### Identità delle parti (dalla 1.17.0)

Le parti di un prodotto (DAVANTI, DIETRO, LATO, FONDO, MANICO…) sono oggetti pari-ordinati: la
seconda applicazione della palette categoriale, dopo i reparti. Vedi [part-mark](components/part-mark.md).

- **Il colore d'identità si assegna per posizione**, non per nome: la piattaforma passa l'indice
  della parte nel prodotto (1-based, ordine stabile), il DS decide colore e lettera.
- **Sempre accanto al nome scritto**, e sempre con un segno non cromatico: il **numero d'ordine**,
  leggibile in scala di grigi. Il numero della parte sta in una pastiglia **tonda** e colorata; il
  numero della fase in un **quadrato nero**. Figura, misura e colore diversi, più la parola «Parte»
  accanto dove c'è spazio: i due numeri convivono nella stessa pagina senza confondersi.
- **Mai gerarchia, mai stato.** La parte A non è più importante della B, e una pastiglia rossa non
  dice «errore». Le prime quattro parti usano i colori che **non** coincidono con uno stato (nero,
  blu, sabbia, salvia); `success`, `warning` e `danger` arrivano solo dalla quinta parte in poi.
- Dove la vista è governata dagli stati (revisione, anomalie), l'identità va in grigio
  (`rg-part--quiet`): restano lettera e nome.

## 5. Spazio e griglia

Usare la scala 4–8–12–16–24–32–48–64–96. Il ritmo ordinario è 8 px; 24–32 px separano gruppi, 48–96 px separano sezioni editoriali. Layout desktop su 12 colonne, tablet 8, mobile 4. Il contenuto tecnico può essere denso, ma non compresso sotto la soglia di scansione.

### Distanza delle azioni dal bordo

Un'azione non tocca mai il bordo del contenitore che la ospita. Vale per un bottone, un link-bottone,
un campo, un toggle, e anche per il fondo di hover di una riga cliccabile. È **bordo** ogni limite
visibile: un filetto, un contorno, oppure un cambio di superficie (il bianco sul fondo di pagina).

| Contenitore | Distanza minima fra bordo e controllo | Token |
| --- | --- | --- |
| riga densa: `rg-list-row`, riga di `rg-file-card`, cella di `rg-table` | 12 px | `--rg-space-3` |
| barra: `rg-toolbar`, `rg-action-bar`, piede di `rg-phase-panel` | 16 px ai lati | `--rg-space-4` |
| contenitore di contenuto: corpo di `rg-section-card`, `rg-parameter-group`, corpo di `rg-phase-panel` | 24 px | `--rg-space-6` |

- **Il minimo assoluto è 12 px**, su ogni lato. Sotto, il bottone si legge come parte del bordo.
- **Senza bordo laterale non c'è distanza da rispettare, c'è un allineamento.** Su una superficie
  aperta (la colonna di pagina, una `rg-toolbar--open`) le azioni stanno sul filo sinistro dei campi
  e del testo ([forms](components/forms.md)).
- **Un contenitore senza padding lo dichiara, e passa la regola al contenuto.** Il corpo di
  `rg-section-card--flush` porta le linee ai bordi, non le azioni: ciò che non è una tabella va in
  `rg-section-card__inset`.
- Una distanza non si ottiene con margini inline sul bottone: la dà il contenitore.

## 6. Linee, superfici, radius e ombre

- Separatore standard: 1 px neutro; **intermedio: 1 px `--rg-color-border-medium`**; forte: 1 px nero.
- Usare linee per mostrare struttura, non per incorniciare ogni elemento.
- Radius standard 4 px, compatto 2 px, ampio 8 px solo per contenitori speciali.
- Ombre assenti nelle superfici ordinarie; ombra minima solo per elementi sovrapposti.

### Quale superficie a quale profondità

La profondità è **dichiarata**, non lasciata all'abitudine di chi scrive la regola. Tre gradini:

| Gradino | Token | Cos'è | Chi la usa |
| --- | --- | --- | --- |
| **Fondo** | `--rg-color-background` (neutral-50) | Terreno della pagina. **Non è una superficie di lettura**: non ci si appoggia testo o dati direttamente. | `body`, `rg-appshell__main`, `rg-workspace__stage` |
| **Sollevata** | `--rg-color-surface-raised` (bianco) | Dove vive il contenuto e dove sta il chrome che governa la pagina. | `rg-card`, `rg-section-card`, `rg-list-row`, `rg-table`, corpo di `rg-modal`, `rg-topbar--app`, `rg-sidebar`, pannello e canvas di `rg-workspace` |
| **Rientrante** | `--rg-color-surface` (neutral-100) | Ciò che, **dentro** una superficie sollevata, deve leggersi come secondario o tecnico. | testa/piede di `rg-modal`, riga di dettaglio di `rg-table`, testa di `rg-disclosure--boxed`, `rg-filter-group`, `rg-code`, `rg-inspector` |

Conseguenze operative:

- Una superficie aperta e rigata (`rg-consumption-row`, `rg-materials-row`, `rg-steps`,
  `rg-disclosure`) si posa **su una superficie sollevata**, non sul fondo: i suoi hover chiari
  presuppongono il bianco sotto.
- Non si scavalcano gradini: nessuna superficie rientrante direttamente sul fondo, nessuna
  sollevata dentro un'altra sollevata senza un motivo dichiarato (annidare card resta vietato).
- La **linea** segue la stessa scala: filetto neutro per le divisioni interne, intermedio per il
  contorno di un contenitore generico, **nero solo per l'enfasi o per uno stato**.
- L'**enfasi** (`rg-card--emphasis`, `rg-section-card--emphasis`) dice quale contenitore è il
  soggetto della vista. **Una sola per vista**: se tutto è enfatizzato, niente lo è.

## 7. Tono visivo

Il tono è editoriale-tecnico: titoli netti, descrizioni concise, dettagli materiali visibili. Le fotografie o texture tessili, quando presenti, devono essere documentarie e non decorative. Le icone sono geometriche, coerenti e accompagnate da testo quando l'azione non è universale. Dalla 1.17.0 il set è uno solo, `icons/rg-icons.svg`, servito in locale ([icons](components/icons.md)): nessuna icona senza nome accessibile, e mai un carattere Unicode o un'emoji al posto di un'icona. Quando sola icona, quando icona + testo e quando solo testo è scritto in [buttons](components/buttons.md#icona-testo-o-entrambi).

## 8. Interfacce tecniche

- Separare input, risultato calcolato e dato validato.
- Mostrare unità accanto al valore e non solo nell'intestazione quando c'è rischio di ambiguità.
- Conservare precisione originale; arrotondamenti solo in presentazione.
- Esporre stato del calcolo, timestamp e provenienza.
- Log e debug sono mono, selezionabili e filtrabili; non dominano il task principale.
- Loading, vuoto, errore, warning e sola lettura devono avere testi espliciti.

## 9. Schermate editoriali

- Consentire maggiore respiro, immagini ampie e accenti stagionali controllati.
- Mantenere una colonna di lettura di circa 65–75 caratteri.
- Usare didascalie, metadati e crediti strutturati.
- Non sacrificare la navigabilità per una composizione da copertina.

## 10. Dati di ricamo e materiali

- **Materiali e fili**: nome leggibile + codice tecnico + lotto/variante quando disponibile.
- **Consumi**: valore, unità, metodo di stima, tolleranza e versione del calcolo.
- **Operazioni**: ordine, dipendenze, macchina/tecnica, parametri e stato.
- **Colori filo**: campione accompagnato da codice e descrizione; mai riconoscimento solo cromatico.
- **Revisioni**: autore, data, motivazione e differenza rispetto alla versione precedente.
- **Dati incerti**: distinguere `stimato`, `rilevato`, `importato`, `validato`.

## 11. Accessibilità e comportamento

Target interattivi minimi 40×40 px; **44×44 su dispositivi touch** (`pointer: coarse`), dove anche i campi di testo salgono a 16 px perché iOS non ingrandisca la pagina al tocco (1.30.0, [forms](components/forms.md#touch-campi-a-16-px-e-bersagli-da-44-130)). Focus visibile nero/bianco ad alto contrasto. Contrasto testo conforme almeno a WCAG AA. Ordine di tabulazione coerente con l'ordine visivo. Animazioni brevi e funzionali, disattivabili con `prefers-reduced-motion`.

## 12. Eccezioni

Ogni eccezione deve indicare problema, ambito, durata e responsabile. Se ricorre in almeno due prodotti, valutare un nuovo componente o pattern; non duplicare workaround.

