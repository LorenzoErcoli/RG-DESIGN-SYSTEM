# Aggiornare il pin del DS

Il DS non si aggiorna da sé in nessun prodotto. Un rilascio nel DS non cambia nulla nei
consumatori finché qualcuno non sposta il pin con un commit esplicito: è la proprietà per cui il
submodule pinnato a un tag è stato scelto (vedi [integration/README.md](integration/README.md)).
Questo documento dice **come** spostarlo e **cosa verificare** dopo.

Il rovescio di quella proprietà è che un prodotto può restare indietro in silenzio, per mesi,
senza che nessuno se ne accorga. Aggiornare il pin è una decisione, non una manutenzione
automatica: va presa, non subita.

## Procedura

Dalla radice del repo consumatore, con `<path>` uguale al path del submodule dichiarato in
`.gitmodules`:

```bash
git -C <path> fetch --tags
git -C <path> checkout v1.14.0
git add <path>
git commit -m "chore: DS a v1.14.0"
```

Il commit registra il **commit** del submodule, non il nome del tag: il tag serve a rendere
leggibile e intenzionale quale commit. Per questo il messaggio di commit deve nominare la
versione — è l'unico posto in cui resta scritta.

Prima di iniziare, il working tree del consumatore deve essere pulito. Un bump del pin mescolato
ad altro lavoro non è più revisionabile: se qualcosa cambia aspetto, non si distingue la causa.

## Verifica dopo il bump

Nell'ordine. Fermarsi al primo che fallisce.

1. **L'ordine di caricamento è ancora quello.** `tokens.css` per primo, poi i moduli di `styles/`
   nell'ordine di `components.json` → `importOrder`. Chi cambia l'ordine rompe la cascata.
2. **Nessuna classe `.rg-*` definita fuori dal DS.** Dalla radice del prodotto, non deve stampare
   nulla:
   ```bash
   grep -rn "\.rg-[a-z-]*\s*{" --include=*.css --include=*.html . | grep -v <path>/
   ```
3. **I token che il prodotto usa in locale hanno ancora il significato di prima.** È il controllo
   che salta più spesso, perché non produce nessun errore: un token che cambia valore mantenendo
   il nome si vede solo a schermo. Le note di migrazione qui sotto dicono, per ogni versione,
   quali token hanno cambiato significato.
4. **Le schermate reali.** Almeno una vista densa (tabella o coda operativa) e una vista di
   lavoro (pannello + canvas) per ogni app.

## Recuperare più rilasci insieme

Un prodotto indietro di più versioni **non fa un salto solo**. Si sale una nota di migrazione per
volta, verificando in mezzo: se si accorpa tutto, quando qualcosa si rompe non è più possibile
dire quale rilascio l'ha rotto, e l'unica strada che resta è bisecare a mano.

La regola pratica: si separa sempre l'ultimo rilascio dagli altri. Prima si sale fino alla
versione precedente a quella nuova, si verifica, poi si sale all'ultima. Così il confronto è
fra due stati e non fra otto.

## Note di migrazione per versione

Solo le versioni che richiedono un'azione o un controllo nel consumatore. Le altre sono additive
e non hanno note: si sale e basta.

### 1.40.0 — il QR si legge

Nessuna classe rimossa o rinominata, nessun token toccato, **niente da cambiare nel markup**. Ma due
cose cambiano da sole appena sale il pin, e vanno **verificate su una stampa vera**.

**Il QR SVG non ha più `shape-rendering: crispEdges`.** Se il prodotto stampava QR inline e i codici
uscivano grigi o non si facevano leggere dal telefono, è questo: su un tracciato con `stroke-width` di
una unità di viewBox, `crispEdges` faceva evaporare il nero (pixel più scuro 217/255 sul PDF a 600 dpi;
ora 0). Se invece il prodotto usa QR **raster** in un `<img>`, non cambia niente: `image-rendering:
pixelated` è rimasto lì.

**Il QR della fase nel foglio compatto passa da 48 a 64 px** (~12,7 → ~16,9 mm), cioè da ~0,31 a
~0,41 mm per modulo. La testata non si alza per questo — è una griglia dalla 1.34.0 e l'altezza la
detta il titolo — ma il QR più grande **pesa lo stesso ~4 mm** sul foglio, e su una pagina già piena
quei millimetri si vedono: **ricontare le pagine**, come da regola della 1.34.0.

> **Corretto nella 1.40.1.** Qui c'era scritto che il foglio del ricamo teneva «i suoi 18 stop». Sono
> **17**. I 18 venivano da un render in cui il foglio sforava in larghezza e Chrome rimpiccioliva
> tutta la pagina del ~5%, in silenzio. Il QR grande costa ~4 mm dei ~7 che mancano al diciottesimo:
> non è il solo colpevole e **non va rimpicciolito** — fra un codice che si legge e uno stop in più, in
> reparto vale di più il codice, e il diciottesimo va sul retro (Lorenzo, 2026-09-23). Prima di contare
> righe per pagina, vedi la §11 di `agent/verify-checklist.md`.

**La regola da portarsi dietro**: la misura di un QR non è il lato del riquadro, è il **modulo**, e sotto
~0,4 mm in stampa il codice smette di farsi leggere. Una URL più lunga ha più moduli e vuole **più
spazio**: se si allunga l'indirizzo, si allarga il riquadro, non si stringe il modulo.

### 1.39.0 — la topbar non fa più slittare la pagina sul telefono

Nessuna classe rimossa o rinominata, nessun token toccato. **Salire il pin basta a togliere il
difetto**: sotto i 680 px nav e azioni scorrono dentro il proprio riquadro e la barra smette di
portarsi dietro la pagina. Ma quella è una rete di sicurezza, non una forma — a 375 px la nav
diventa una striscia da ~170 px. **La forma giusta chiede tre righe di HTML**, una volta sola, nel
template della shell.

**Cosa fare.** Avvolgere `rg-topbar__nav` e `rg-topbar__actions` in `rg-topbar__menu`, e mettere
**prima** del pannello il controllo che lo apre:

```html
<header class="rg-topbar rg-topbar--app rg-topbar--sticky">
  <a class="rg-topbar__brand" href="/">RG</a>

  <details class="rg-topbar__menu-toggle">
    <summary>Menu</summary>
  </details>

  <div class="rg-topbar__menu">
    <nav class="rg-topbar__nav" aria-label="Navigazione principale">…</nav>
    <div class="rg-topbar__actions">…</div>
  </div>
</header>
```

- **L'ordine non è libero.** Il legame fra controllo e pannello lo fa il selettore `[open] ~`: un
  pannello messo prima del `<details>`, o annidato dentro di lui, non si apre.
- **Il `<details>` è vuoto**, e va bene così: il suo `<summary>` è il controllo, il pannello gli sta
  accanto. Il perché sta in [navigation](components/navigation.md#la-barra-sul-telefono-1390).
- **L'etichetta la scrive l'app** (`Menu`, `Sezioni`…). Il segno `+`/`−` lo genera il DS.
- **Non mettere nel pannello quello che deve restare a portata di pollice**: marchio, titolo e
  un'eventuale azione primaria contestuale restano fuori, sulla barra.
- Niente JavaScript da aggiungere.

**Cosa verificare dopo.** Con il browser stretto a 375 px, in console:

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth   // true
```

Se è `false`, l'elemento che sborda non è più la topbar: cercarlo con
`[...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth)`.

**Sopra i 680 px non deve cambiare nulla.** Il controllo è `display: none` e il pannello torna una
riga della barra: nav a sinistra, azioni allineate a destra, barra alta 64 px. Se a schermo largo
qualcosa si è spostato, il markup non è quello qui sopra.

### 1.38.0 — la tabella degli stop si scrive a mano

Nessuna classe rimossa o rinominata, nessun token toccato. **Ma è l'unico rilascio recente in cui
salire il pin non basta: c'è una classe da aggiungere al markup**, altrimenti non cambia niente.

**Cosa fare.** Sulla tabella che il reparto **compila a penna riga per riga** — nel fascicolo RG è la
tabella degli stop del foglio del ricamo — aggiungere `rg-table--hand`:

```diff
- <table class="rg-table rg-table--compact rg-table--grid rg-u-mt-2" style="--rg-table-cols: 12">
+ <table class="rg-table rg-table--compact rg-table--grid rg-table--hand rg-u-mt-2" style="--rg-table-cols: 12">
```

**Dove non metterla.** Su nessun'altra tabella del fascicolo. La legenda dei coni e la tabella delle
fasi della pagina della parte si **leggono**: alzarne le righe è carta spesa per uno spazio che
nessuno usa. La regola per decidere è una domanda sola: *su questa tabella qualcuno scrive?*

**Cosa cambia dove la classe c'è.** Le righe del `tbody` passano da ~26 px (~7 mm) a **40 px
(~10,58 mm)** e i valori già stampati si allineano **in basso** invece che a metà cella. La **testata**
prende 4 px di aria per lato, che la staccano dai filetti verticali, e non va più a capo. Il **corpo
non cambia misura**: resta quella di `rg-table--compact`, e con essa restano valide le larghezze di
colonna e le abbreviazioni tarate su di lei. Ne entrano **17 per pagina A4** (la 1.38.0 diceva 18: era
un render scalato, vedi 1.40.1); dalla diciottesima si va alla pagina dopo con l'intestazione della
tabella ripetuta.

**Una parola di testata che sborda si accorcia.** Con `table-layout: fixed` e il `nowrap` non c'è a
capo: se un'intestazione esce dalla sua colonna, il rimedio è l'abbreviazione nel template («Tempo» →
«Tem»), non una riga in più di testata — che costerebbe uno stop.

**C'è anche una cosa da togliere.** Se il template metteva `style="white-space: nowrap"` sui `<th>` di
quella tabella — serviva a non far andare a capo `OPERAZIONE` e `MATERIALE` — adesso lo fa il DS in
`rg-table--hand thead th`: l'attributo inline si può rimuovere, **dopo** aver salito il pin.
Nell'ordine: tag, pin del submodule, classe sul markup, poi via l'inline. Toglierlo prima significa
una testata che va a capo sul prossimo fascicolo stampato.

**Da contare prima di mandare in reparto.** Un foglio con più di 17 stop prende **una facciata in
più** di prima. Sul fascicolo di prova RG (ricami da 3 stop) le pagine non cambiano — 18 prima e
dopo, 0 gruppi di fasi collegate spezzati — ma un prodotto con ricami lunghi va ristampato e contato.
Vale la regola della 1.34.0.

**Se il prodotto non ha tabelle da compilare a penna**, non c'è niente da fare: si sale e basta.

### 1.37.0 — la nota porta l'etichetta dentro il riquadro

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. **Ma il foglio
stampato cambia aspetto**, e due riquadri cambiano misura.

**Si vede.** Nei campi `rg-fill-field--tall` dentro `rg-worksheet-block--compact .rg-worksheet-block__fields`
e nella nota del piede (`rg-worksheet-foot__note`) l'etichetta non sta più *sopra* il riquadro ma
**dentro, in alto a sinistra**. Il riquadro del blocco resta 48 px; quello del piede **cresce da 64 a
80 px**. In stampa l'aria fra le sotto-operazioni passa da 8 a **12 px**. Tutto il resto dei campi —
righe da 24 px, celle di tabella, `rg-field` a schermo — non cambia.

**Va controllato solo in un caso.** Se un prodotto stampa dentro un `--tall` del foglio un valore
**già noto e lungo**, tanto da riempire tutto il riquadro: il testo scorre sotto l'etichetta grazie a
un `padding-top`, ma il riquadro cresce di quei ~20 px. Sul fascicolo RG non succede, perché i `--tall`
del foglio sono le note e le note escono vuote. Regola generale invariata: il valore che il sistema
conosce si **stampa come dato**, non dentro un campo da riempire.

**Se il prodotto stampa un fascicolo compatto:** sul fascicolo di prova RG le pagine non cambiano, i
gruppi di fasi collegate restano interi e il margine sulle pagine critiche sale da ~8 a ~33 px. Vale
comunque la regola della 1.34.0: ristampare e contare le pagine prima di mandare in reparto.

### 1.36.0 — i campi del foglio in quattro colonne

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. **Ma il foglio
stampato cambia aspetto**, e in un punto cambia anche il comportamento del layout.

**Va controllato.** Dentro `rg-worksheet-block--compact` la griglia `__fields` non ha più colonne
automatiche: sono **quattro, fisse**. Prima il numero dipendeva dalla larghezza disponibile, quindi un
prodotto che stampa su un formato diverso dall'A4 con margini da 12 mm — o che mette il blocco dentro
un contenitore più stretto — vedeva tre o cinque colonne e adesso ne vede sempre quattro. Se il
contenitore è stretto, le quattro colonne sono strette: sotto i **680 px** di viewport le colonne
tornano automatiche, ma è un `@media` sul viewport, non sul contenitore. Chi impagina un blocco
compatto in una colonna stretta su schermo largo lo verifichi.

**Si vede.** Sul foglio: i sottotitoli di operazione (`__op`) sono in **grassetto** e non hanno più il
filetto grigio sopra (solo dentro `--compact`; il blocco normale lo tiene); le **etichette** dei campi
sono un gradino più grigie (`--rg-color-text-secondary` invece di `--rg-color-text-label`) dentro
`rg-worksheet-block--compact` e `rg-worksheet-foot`; fra due fasi collegate
(`rg-worksheet-block--continued`) la linea di giunzione è **doppia** (2 px).

**Se il prodotto stampa un fascicolo compatto:** sul fascicolo di prova RG il conto non cambia (20
pagine prima e dopo, 0 gruppi spezzati) e il margine sulle pagine critiche migliora da ~5 a ~8 px.
Vale comunque la regola della 1.34.0: ristampare e contare le pagine prima di mandare in reparto.

### 1.35.0 — la trama della banda comincia dopo il nome

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. Cambiano due
cose che si vedono e una che non si vede.

**Si vede.** Sulla banda di reparto la striscia della figura non passa più dietro la targhetta col
nome: comincia dove il nome finisce. Sparisce anche il margine bianco (`outline`) attorno a nome e
nota, che serviva solo a coprire la trama sottostante. Chi stampa il fascicolo lo nota subito; chi usa
la banda a schermo (`rg-phase-panel__band`, testate di avanzamento) pure.

**Non si vede, ma va controllato.** La variabile CSS `--rg-dept-inset` **non viene più letta**. Serviva
a ridare alla striscia il margine laterale che la banda ha già come `padding`, e valeva sempre quanto
quel `padding`. Se un prodotto la imposta nel proprio CSS, la riga è morta e va tolta:

```bash
grep -rn "rg-dept-inset" --include=*.css --include=*.html .
```

Per cambiare oggi il margine laterale della striscia si cambia il `padding` della banda, che è la
stessa cosa scritta una volta sola.

**Se il prodotto stampa un fascicolo compatto:** sul fascicolo di prova RG il conto delle pagine non
cambia (20 prima, 20 dopo) e i gruppi di due fasi restano in una pagina sola — l'altezza della banda la
detta il nome, non la striscia. Vale comunque la regola della 1.34.0: ristampare e contare le pagine
prima di mandare in reparto.

### 1.34.0 — il foglio di lavorazione esce in maiuscolo

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. Ma **il foglio
stampato cambia aspetto**, e per una volta il consumatore se ne accorge subito.

`rg-worksheet-block` e `rg-worksheet-foot` dichiarano `text-transform: uppercase`. Tutto quello che
sta **dentro** il foglio esce in maiuscolo — i valori già stampati, i sottotitoli di operazione, le
righe di calcolo, le didascalie, le intestazioni di tabella. Non è un'opzione: è la forma del foglio.

Due cose da controllare nel prodotto:

```bash
# 1. C'è testo che dentro il foglio DEVE restare minuscolo?
grep -rn "rg-worksheet-block\|rg-worksheet-foot" --include=*.html .
```

Il candidato tipico è un **simbolo di unità** («s», «bar», «°C», «min», «cm»). Se sta in
`rg-fill-field__unit` è già al sicuro — quell'elemento dichiara `text-transform: none`. Se invece è
scritto *dentro* il valore («4 (26,1 × 29,3 cm)»), il CSS non sa distinguerlo dal testo ed esce in
maiuscolo: spostarlo nel suo elemento, oppure accettarlo.

```bash
# 2. Il prodotto forzava già il maiuscolo a monte (filtri |upper, .upper(), dati salvati in caps)?
grep -rn "|upper\||upper\b\|\.upper()" --include=*.html --include=*.py .
```

Non è un errore — il risultato è lo stesso — ma diventa **una regola scritta in due posti**. Meglio
toglierla da monte e lasciare che sia il foglio a decidere come si stampa: il dato resta com'è nel
database, che è dove serve com'è.

**Se il prodotto stampa un fascicolo compatto:** la testata del blocco si riorganizza (il ruolo
scende sotto il titolo, il QR ha una colonna sua) e fra le tre zone della testata torna un po' di
bianco. Il markup non cambia. Sul fascicolo di prova RG il conto delle pagine **non** cambia e i
gruppi di due fasi restano in una pagina sola, ma il margine è sottile: **ristampare e contare le
pagine** prima di mandare in reparto.

### 1.33.0 — il campo a penna cresce invece di sovrapporsi

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. Un solo punto
da **guardare**: `rg-fill-field__line` passa da `height` a `min-height`.

Prima l'altezza era fissa e un valore stampato troppo lungo usciva **da sopra** il riquadro,
finendo addosso all'etichetta. Ora il campo **si allunga** di una riga di testo. È il comportamento
corretto — su carta due scritte sovrapposte sono un dato perso — ma chi contava sull'altezza fissa
per allineare qualcosa **fuori** dal campo (una colonna accanto, un'altezza calcolata a mano) lo
vede cambiare.

```bash
# dalla radice del prodotto: dove il campo a penna porta un valore già stampato
grep -rn "rg-fill-field__line" --include=*.html --include=*.py . | grep -v <path>/
```

Per ogni occorrenza che **non** è vuota, la domanda è una sola: *se questo valore va a capo, qualcosa
si sposta dove non deve?* Dentro `rg-worksheet-block__fields` la risposta è no — i campi di una fila
restano allineati sul fondo e le basi nere cadono sulla stessa linea.

**Se il prodotto stampa un fascicolo compatto**, `rg-worksheet-block--compact` in `@media print`
diventa più denso (etichette a 10 px, testata su una riga sola, QR a 48 px, titolo più piccolo nel
blocco che continua). **Vale solo in stampa**: a schermo non cambia niente. Da ristampare e guardare:
il numero di pagine cala, e le fasi possono cambiare foglio. Le righe da scrivere **non** cambiano.

**Aggiunte:** `rg-worksheet-foot`, `rg-worksheet-foot__note` — il piede Operatore/Data/Note fuori dal
riquadro della fase. `rg-worksheet-block__foot` resta valido: è un'aggiunta, non una sostituzione.

### 1.13.0 — gerarchia visiva

Revisione di fondazioni: il DS produceva interfacce in cui contenitori e titoli si leggevano
tutti allo stesso livello. Nessun componente nuovo, nessuna classe rinominata, nessuna rimozione:
la superficie di consumo è invariata e **non serve toccare il markup**.

L'aspetto però cambia in modo visibile in ogni vista. È un rilascio da guardare, non solo da
installare.

**Due token cambiano significato mantenendo il nome.** È l'unico punto che può rompere qualcosa
in silenzio: un prodotto che li usa non vede un errore, vede un colore diverso.

| Token | Prima | Dopo | Ruolo nuovo |
| --- | --- | --- | --- |
| `--rg-color-background` | bianco | `neutral-50` | il **fondo della pagina**, non più una superficie |
| `--rg-color-surface` | `neutral-50` | `neutral-100` | la superficie **incassata** (hover, header di modale, righe di dettaglio) |

Il modello nuovo ha tre livelli invece di due: fondo pagina (`--rg-color-background`), contenitore
sollevato (`--rg-color-surface-raised`, bianco), superficie incassata (`--rg-color-surface`). È
lo stesso schema che `rg-workspace` usava già — pannello bianco, stage neutro, canvas bianco — e
che ora vale per tutto il sistema.

**Cosa controllare nel prodotto:**

```bash
# dalla radice del prodotto: ogni riga è un punto da guardare a schermo
grep -rn "rg-color-background\|rg-color-surface" --include=*.css --include=*.html . | grep -v <path>/
```

Per ogni occorrenza, la domanda è una sola: *questo elemento è il fondo della pagina, un
contenitore sollevato, o una superficie incassata?* Un contenitore che usava
`var(--rg-color-background)` per dire "bianco" ora prende un grigio: va spostato su
`--rg-color-surface-raised`.

**Altri cambiamenti visibili, che non richiedono azione:**

- Il corpo del testo passa da 14 a 16 px (`rg-core.css`), la misura che `design-rules.md` §3
  prescriveva già e che `.rg-body` usava già. Le viste dense diventano più alte.
- I titoli dichiarano il proprio peso: pagina 700, contenitore 500. Prima nessun titolo lo
  dichiarava e il peso arrivava dallo user-agent, che manda in grassetto ogni `<h1>`–`<h3>`:
  la gerarchia dipendeva dall'elemento scelto dal consumatore, non dal DS.
- `.rg-section` passa da 32 a 48 px di respiro (`design-rules.md` §5).
- I contenitori generici (`rg-card`, `rg-section-card`) passano al filetto intermedio
  `--rg-color-border-medium`.

**Se il prodotto è su Streamlit:** `integration/streamlit-config.toml` cambia
(`secondaryBackgroundColor` da `#f7f7f5` a `#efefec`) e va **ricopiato** nel `.streamlit/` del
prodotto — è un file che si copia, non che si include, quindi il bump del submodule da solo non
lo aggiorna. La colonna di contenuto Streamlit resta bianca: è una superficie sollevata, non il
fondo della pagina. Alla data di questo rilascio nessun prodotto RG consuma il DS via Streamlit,
quindi la nota vale per il primo che lo farà.

**Aggiunte:**

- `--rg-weight-heading`, `--rg-color-border-medium`, `--rg-color-surface-raised`.
- Modificatore `--emphasis` su `rg-card` e `rg-section-card`, per dichiarare quale contenitore è
  il soggetto della vista. **Una sola per vista**: se tutto è enfatizzato niente lo è, ed è
  esattamente il difetto che questa versione corregge.
