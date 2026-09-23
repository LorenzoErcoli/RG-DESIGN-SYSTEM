# Changelog — RG Design System

Versionamento semver. I consumatori si agganciano a un **tag**, mai a un branch.

- **major** — rimozione o rinomina di classi/token, cambio dell'ordine di import, modifica
  di un token permanente: richiede intervento nei prodotti.
- **minor** — nuovi componenti, nuove varianti, nuovi token additivi: aggiornamento sicuro.
- **patch** — correzioni che non cambiano il contratto.

## 1.40.1 — diciassette, non diciotto

**Patch di sola documentazione: non cambia una riga di CSS.** Corregge un numero che il DS ripeteva da
tre versioni.

### Il numero

«Diciotto stop per pagina» era **diciassette**. Il numero compariva nel CHANGELOG della 1.38.0 e della
1.40.0, in `components/tables.md`, in `components/qr.md`, in `UPGRADING.md`, in un commento di
`rg-components.css` e in uno di `rg-utilities.css`, nel manifest e in una tavola della vetrina: è
corretto in tutti.

Su A4, a grandezza vera, per il corpo della tabella degli stop restano **~184 mm** — non i ~194
dichiarati fin qui. 17 righe da 10,58 mm ne occupano ~180; alla diciottesima mancano **~6 mm**.

### Perché nessuno se n'era accorto

Il foglio degli stop **sforava in larghezza**, e Chrome, in stampa, quando il contenuto è più largo del
foglio **rimpicciolisce tutta la pagina in silenzio** — qui di circa il 5%. Nessun avviso, nessun errore:
una pagina più piccola, e con lei tutti i millimetri su cui si stava facendo il conto. Il risultato
tornava, ed era per giunta **il numero che era stato chiesto**: due ottime ragioni per non metterlo in
dubbio.

Il difetto è venuto fuori solo confrontando **due render con lo stesso identico CSS**, dove lo stesso
riquadro di QR misurava **16,0 mm** in uno e **16,9** nell'altro: il 5,5% su tutto, testata compresa.
Tolto lo sforamento — intestazione «TEM» invece di «TEMPO», e l'aria laterale presa dalla regola del DS
invece che da un `nowrap` scritto a mano — il foglio è tornato a grandezza vera, e con lui il conto.

### La regola che resta

**Una prova di impaginazione fatta con Chrome non vale se prima non si è escluso che la pagina sfori in
larghezza.** Il controllo costa niente: si misura un elemento di **larghezza nota** e si guarda se torna.
Il riquadro di un `rg-qr` va benissimo — se `rg-qr--small` nel foglio compatto misura ~16,0 mm invece di
~16,9, quella pagina è al 95% e ogni conteggio fatto sopra è da rifare. In alternativa,
`documentElement.scrollWidth` contro `clientWidth`.

Sta nella **§11 di [`agent/verify-checklist.md`](agent/verify-checklist.md)**, che da oggi ha una sezione
per le misure di stampa: è il posto dove si passa *prima* di dichiarare un numero.

### Il QR grande resta grande

Il codice a 64 px pesa **~4 mm** dei ~7 che mancano al diciottesimo stop: non è il solo colpevole, e non
si rimpicciolisce. La scelta è stata fatta guardando in faccia i due esiti (Lorenzo, 2026-09-23): un QR
che si legge in reparto e la riga del magazzino in testata valgono più del diciottesimo stop, che va sul
retro — dove il foglio si stampa comunque fronte-retro.

## 1.40.0 — 2026-09-23

**Minor.** Nessuna classe nuova, nessuna rimossa o rinominata, nessun token toccato. Ma **il QR stampato
cambia**: chi aggiorna il pin e ristampa il fascicolo trova un codice che si legge e un QR di fase più grande
(vedi [UPGRADING](UPGRADING.md#1400--il-qr-si-legge)).

### Il QR della fase, sulla carta, non c'era

Non era sbiadito: **non c'era**. Misurato in Chrome headless sul PDF del fascicolo vero, renderizzato a
600 dpi e ritagliato sul riquadro del solo QR: il pixel **più scuro** di tutto il codice era **217 su 255**, e
nessun pixel scendeva sotto 128. Al posto di un codice, una velatura grigia. Un telefono lì sopra non aggancia
niente.

La causa era una riga del DS: `shape-rendering: crispEdges` su `.rg-qr__img > svg`.

**Un QR inline non è un'immagine a pixel, è un tracciato.** Le librerie comuni lo disegnano come linee
orizzontali con `stroke-width` di **una unità del viewBox**: sul QR della fase — viewBox da 41 moduli reso in
~13 mm — quel tratto è **più sottile del passo della griglia del dispositivo**. `crispEdges` aggancia i bordi
del tratto a quella griglia, e su un tratto così fine il nero non si arrotonda: **evapora**. Su un `<img>`
raster `crispEdges` aiuta; su un tracciato di questa finezza lo distrugge.

Ora l'SVG dichiara `shape-rendering: geometricPrecision` — stesso riquadro, stessa misura: pixel più scuro
**0**, copertura scura **29%**, codice nitido e quadrato. `image-rendering: pixelated` resta, ma sull'`<img>`,
dove un raster c'è davvero. È la **stessa lezione già imparata** con `rg-dept-mark`, dove `crispEdges`
trasformava i tondi in trifogli e le croci si storcevano: sui tracciati fini si dichiara la precisione
geometrica e il bordo lo fa l'antialiasing. Al QR non era stata applicata.

Il QR della **parte** si salvava per un soffio, ed è il motivo per cui il problema poteva sembrare un
capriccio del telefono: è più grande e la sua URL è più corta.

### E il QR della fase era anche troppo piccolo

Seconda causa, indipendente dalla prima. Nella 1.26.0 il QR del foglio compatto era sceso da 60 a **48 px**
per risparmiare 12 px di pagina per blocco. Ma 48 px per 41 moduli fanno **~0,31 mm per modulo**, mentre il QR
della parte — quello che in reparto funziona — sta a **~0,43 mm**. E la URL della fase è **più lunga** di
quella della parte, perché ci aggiunge l'id della fase: **più moduli da far stare in meno spazio**, doppia
penalità.

Il QR della fase passa a **64 px** (`--rg-space-16`, ~16,9 mm): **~0,41 mm per modulo**, la stessa misura di
quello della parte.

**E non costa pagina.** Il risparmio della 1.26.0 non serve più: dalla **1.34.0** la testata del blocco
compatto è una *griglia*, il QR ha una colonna sua e l'altezza la detta il **titolo**. Misurato sul fascicolo,
il foglio del ricamo tiene i suoi stop in una pagina.

> **Corretto nella 1.40.1**: gli stop in una pagina sono **17**, non 18, e il QR grande **pesa ~4 mm** —
> non è gratis. Vedi la nota della [1.40.1](#1401--diciassette-non-diciotto)
> qui sopra: il QR resta grande lo stesso, ed è una scelta, non una svista.

**La regola d'ora in poi è il modulo, non il lato**: ~0,4 mm, e da lì si ricava il lato quando cambia la
lunghezza della URL. Una URL più lunga vuole **più spazio**, non lo stesso riquadro con moduli più piccoli.
## 1.39.0 — 2026-09-22

**Minor.** Due classi **nuove** e additive, `rg-topbar__menu` e `rg-topbar__menu-toggle`; nessuna
rimossa o rinominata, nessun token toccato. A differenza della 1.38.0, qui **salire il pin fa già
metà del lavoro**: la barra smette di far slittare la pagina anche senza toccare il markup. L'altra
metà, la forma giusta sotto i 680 px, chiede tre righe di HTML (vedi
[UPGRADING](UPGRADING.md#1390--la-topbar-non-fa-più-slittare-la-pagina-sul-telefono)).

### Il difetto, misurato

`rg-product-platform` su un telefono, viewport 375×812, barra completa — marchio, sette voci di
navigazione, azione secondaria, nome utente, esci:

| | fino alla 1.38.0 | dalla 1.39.0 |
| --- | --- | --- |
| `documentElement.scrollWidth` a 375 px | **597** | **375** |
| `.rg-topbar` clientWidth / scrollWidth | 375 / 597 | 375 / 375 |
| `.rg-appshell__main` | 375 / 375, già a posto | invariato |

La pagina slittava di **222 px sotto il dito**, in ogni vista dell'applicazione, e il contenuto non
c'entrava: stava dentro i 375 esatti. Sbordava **solo la barra** e, stando nel flusso, si portava
dietro il documento intero. La causa sta in due righe di CSS: `.rg-topbar` è un flex a riga unica e
un figlio flex ha `min-width: auto`, quindi `.rg-topbar__nav` — 428 px di sole voci — non si
comprimeva e non andava a capo. Fino a ieri il DS scriveva «su mobile preservare nome prodotto,
azione primaria contestuale e accesso al menu» senza dare il pezzo per farlo.

### Due risposte, una dentro l'altra

**1. Senza toccare il markup — la rete di sicurezza.** La nav scorre dentro il proprio riquadro a
qualunque larghezza, e sotto i 680 px lo fanno anche le azioni: la barra torna larga quanto lo
schermo. Vale per ogni app già in campo, solo salendo il tag. **A qualunque larghezza** perché
questa barra, tutta intera, chiede 737 px: fermarsi ai 680 avrebbe lasciato la pagina che slitta fra
681 e 737, cioè su un tablet in verticale o su una finestra stretta — misurato. Non è la forma
giusta — a 375 px la nav si riduce a una striscia da ~170 px — ed è esattamente quello che deve
essere: una rete.

**2. Con `rg-topbar__menu` — la forma giusta.** Nav e azioni entrano in un pannello che si apre con
`rg-topbar__menu-toggle`. La barra resta alta `--rg-layout-header` e il pannello **si posa sopra il
contenuto**: `rg-appshell__main` comincia a 64 px anche a menu aperto. Su uno schermo basso non era
un dettaglio ma la condizione. Le righe sono da 44 px, come ogni bersaglio da dito dalla 1.30.0.

**Sopra i 680 px il markup in più non cambia niente**: il controllo sparisce, il pannello torna una
riga della barra. Verificato a 1280 px — nav e azioni cadono allo stesso pixel di prima.

### `<details>` senza JavaScript, e il pannello che gli sta accanto

Il controllo è un `<details>`/`<summary>` nativo: nessuna app deve scrivere JavaScript, lo stato
aperto/chiuso lo annuncia il browser, Invio e Spazio funzionano già. La navigazione resta
raggiungibile da tastiera anche a menu chiuso: si tabula sul controllo, si apre, si tabula nelle
voci. È la stessa scelta di `rg-action-menu` (1.17.0).

**Il pannello è fratello del `<details>`, non suo figlio**, e la ragione è la scrivania, non il
telefono: un figlio di `<details>` chiuso lo nasconde lo user-agent, e per rimostrarlo su desktop
servirebbe `::details-content`, che è recente — misurato in Chrome, `display: contents` sul
`<details>` **non** lo rimostra. Il chrome di ogni scrivania RG non può dipendere da una
pseudo-classe nuova: da fratello, il pannello è un elemento come un altro e su desktop lo mostra una
media query normale. Il prezzo è dichiarato: il legame lo fa il selettore `[open] ~`, quindi **il
pannello deve stare dopo il controllo**.

**Limite dichiarato**: senza JavaScript il pannello non si chiude toccando fuori né con Esc. Si
chiude ritoccando il controllo o, nella pratica, navigando — ogni voce porta a un'altra pagina. Chi
vuole quei due comportamenti aggiunge il proprio JavaScript sull'attributo `open`, senza cambiare
classi.

### Cosa entra nel pannello

Ciò che può aspettare: le sezioni e le azioni di servizio. Ciò che deve restare a portata di
pollice — il marchio, il titolo, un'azione primaria contestuale — resta **fuori**, sulla barra. La
voce corrente si dichiara con `aria-current="page"` come prima e prende la barretta nera a sinistra
di `rg-sidebar-item`, in `currentColor`, così la stessa riga vale su barra chiara e su barra nera.

Vetrina: `examples/rg-components-library.html#topbar-mobile`, con due riquadri da 375 px veri (la
soglia dipende dal viewport e dentro una tavola larga non si vedrebbe) e la pagina
`examples/rg-topbar-mobile.html` da aprire stretta.

## 1.38.0 — 2026-09-22

**Minor.** Una classe **nuova** e additiva, `rg-table--hand`; nessuna rimossa o rinominata, nessun
token toccato. È opt-in: **finché l'app non la mette sul markup non cambia niente**, e questa volta
la richiesta si soddisfa solo se qualcuno la mette (vedi
[UPGRADING](UPGRADING.md#1380--la-tabella-degli-stop-si-scrive-a-mano)).

Sul foglio del ricamo c'è una riga per stop, e su quella tabella si **scrive mentre la macchina
lavora**: tempi e note, stop per stop, a biro. Lorenzo, sullo stesso foglio: *«Righe più alte, 18 per
pagina. Serve spazio per scrivere le note. E deve essere abbastanza per stop.»*

### `rg-table--hand`: l'altezza è la mano, non il testo

Le righe erano ~26 px (~7 mm), cioè **la misura del testo stampato**. Sette millimetri sono la misura
di una riga *letta*: la punta della biro ci entra, la grafia no — e una riga in cui non si riesce a
scrivere, in reparto, resta vuota, cioè il dato si perde. È la stessa frase su cui è costruito
`rg-fill-field`, applicata dove non era ancora arrivata.

| | prima | con `rg-table--hand` |
| --- | --- | --- |
| riga della tabella degli stop | ~26 px (~7 mm) | **40 px (~10,6 mm)** |
| righe per pagina A4 | ~28 | **18** |
| dato già stampato nella cella | a metà altezza | **appoggiato in basso**, dove appoggia la scrittura |
| testata della tabella | — | invariata: su di lei non si scrive |

I 40 px sono i 32 px della grafia adulta dichiarati da `rg-fill-field` più un passo, perché qui la
mano scrive **dentro una griglia chiusa sui quattro lati** e non sopra una riga aperta: non può
sbordare. Stanno sulla scala (32 + 8) e sono un **minimo**, non un'altezza fissa.

**`--grid` dice *dove* si scrive, `--hand` dice *quanto spazio c'è per farlo*.** Sono due decisioni
diverse e stanno in due classi diverse: si usano insieme.

### Perché opt-in e non per tutte le tabelle

Nello stesso fascicolo ci sono tabelle che si **leggono** soltanto — la legenda dei coni, le fasi
della pagina della parte — e alzarle tutte vorrebbe dire pagare in carta uno spazio che nessuno usa.
La classe la mette l'app sulla tabella che si compila, e solo lì.

### Diciotto, e da dove viene il numero

> **Erano diciassette** (corretto nella 1.40.1). Tutto il conto qui sotto è stato fatto su un render in
> cui il foglio **sforava in larghezza** e Chrome, stampando, rimpiccioliva in silenzio l'intera pagina
> del ~5%: i «~194 mm» erano ~184. Il numero tornava, ed era anche quello chiesto — due buoni motivi per
> non metterlo in dubbio. Il testo resta com'era scritto allora; la misura giusta e il metodo per non
> ricascarci stanno nella 1.40.1 e nella §11 della checklist di verifica.

È **misurato**, non imposto: il CSS non sa contare le righe. Su A4 con intestazione di pagina
(`rg-u-print-a4--head`, margini 30/12 mm), sotto la testata del foglio e la fila di campi del ricamo,
per il corpo della tabella restano ~194 mm: 18 righe da 10,6 mm ne occupano 190, la diciannovesima ne
chiederebbe 201. Il seguito va alla pagina dopo con l'intestazione ripetuta — regola di `--long`, che
non cambia — e il foglio si stampa fronte-retro.

**Limiti dichiarati.** Quel 18 dipende da quanto c'è *sopra* la tabella, e il margine è ~3 mm: una
fase con una fila di campi in meno ne fa entrare una in più, un titolo su due righe una in meno. Chi
ha bisogno di un numero *esatto* di righe per pagina non lo ottiene dal CSS: spezza la tabella a
monte. E un ricamo con più di 18 stop **prende una facciata in più di prima**: è il prezzo esplicito
della richiesta, perché prima le righe c'erano tutte e non ci si poteva scrivere — il che vuol dire
che non c'erano.

**Misura** sul fascicolo di prova (3 parti, 11 fasi, 15 fogli, Chrome): **18 pagine prima e dopo**,
**0 gruppi di fasi collegate spezzati prima e dopo**. Sullo stress test del solo foglio del ricamo:
con 18 stop la tabella finisce dentro la pagina, con 19 e con 20 il seguito passa alla pagina dopo.

### La testata prende aria, e non va più a capo

Stessa tabella, seconda osservazione dallo stesso foglio (Lorenzo, 2026-09-22): quelle intestazioni
sono **parole** — `OPERAZIONE`, `MATERIALE`, `TEMPO` — sopra colonne larghe **quattro caratteri**.

**Aria fra la parola e il filetto.** Con `rg-table--grid` ogni cella ha il suo filetto nero, testata
compresa, e «STOP» finiva **attaccato alla linea verticale**: due segni neri a contatto, e la parola
si legge peggio di quanto sia scritta. La testata prende `--rg-space-1` per lato (4 px, 8 in tutto).
Gli 8 px per lato del corpo sarebbero 16, **metà** di una colonna da quattro cifre; nel corpo restano,
perché lì è la penna a non dover toccare il filetto.

**Il `nowrap` torna a casa.** `white-space: nowrap` sulle intestazioni di questa tabella stava
*inline su ogni `<th>`* del template che stampa il foglio; adesso è in `rg-table--hand thead th` e
l'attributo si può togliere (vedi UPGRADING). Limite dichiarato: con `table-layout: fixed` una testata
che non ci sta **sborda** invece di andare a capo. È la scelta: un a capo in testata costa l'altezza
di una riga di stop, mentre una parola che sborda **si accorcia** — «Tempo» è diventato «Tem».

**Il corpo non si tocca, e la testata non scende.** Era la richiesta gemella — *«possiamo anche farle
con un font un po' più piccolo»* — ed è stata **provata e scartata sulla misura**. `.rg-table th` è
già a `--rg-font-size-xs`, l'ultimo gradino della scala: per fare un gradino bisognava **alzare il
corpo** a `--rg-font-size-sm`. Ma su quei 12 px è tarato tutto il foglio — larghezze delle colonne in
`ch`, nomi dei materiali accorciati a 18 caratteri, i due codici filo uno sotto l'altro dentro la
riga — e in Chrome su A4, sulla pagina vera del ricamo, il passo di riga passava da **10,58 a
10,85 mm**: **diciassette stop invece di diciotto**, col diciottesimo da solo sul retro. Uno stop per
pagina vale più di un gradino tipografico. Un token più piccolo di `xs` non si inventa per un caso
locale, e la richiesta era una possibilità; i diciotto stop erano una richiesta fatta due volte.

**L'altezza di riga finale resta 10,58 mm** (40 px): nessuna delle due regole della testata la tocca.

### Due stesure, una variante

`rg-table--hand` è stata scritta **due volte**, in parallelo e in due cloni diversi che non si
vedevano: una prima stesura con l'altezza e l'allineamento (la ragione del componente, misurata su
carta) e una seconda con le regole della testata, il confronto in vetrina e il manifest. Questa
versione è la riconciliazione delle due, e **entrambi i commit restano nella storia** del ramo
`ds/righe-stop-da-scrivere`.

## 1.37.0 — 2026-09-22

**Minor.** Nessuna classe nuova, nessuna rimossa o rinominata, nessun token toccato. Cambia **come si
compila** il foglio di lavorazione: chi aggiorna il tag e ristampa il fascicolo vede il foglio diverso,
e va saputo prima (vedi [UPGRADING](UPGRADING.md#1370--la-nota-porta-letichetta-dentro-il-riquadro)).

Nella 1.36.0 restava dichiarato, nero su bianco, l'ultimo serbatoio di spazio del foglio: la parola
**NOTE** sopra il riquadro, *«si potrebbe portare dentro il riquadro, in alto a sinistra»*, ~11 px per
campo e quattro campi per pagina. Lorenzo, sullo stesso foglio: **fallo**.

### L'etichetta della nota entra nel riquadro

Una fascia sopra il riquadro **non è spazio da scrivere**: è spazio speso per *dire* di scrivere. Il
riquadro alto (`rg-fill-field--tall`) è l'unico che può ospitare la propria etichetta senza perdere
niente, e la ragione è di forma, non di misura: in `rg-fill-field` la scrittura **appoggia sulla base
nera** — è la riga su cui si scrive — quindi l'angolo **in alto a sinistra** è la zona morta del campo.

| | fino alla 1.36.0 | 1.37.0 |
| --- | --- | --- |
| nota del blocco (`--tall` dentro `__fields`) | ~12 px di fascia + riquadro 48 | riquadro **48**, etichetta dentro |
| libero sotto l'etichetta | 48 | **35** — una grafia adulta ne chiede 32 |
| nota del piede (`rg-worksheet-foot__note`) | ~17 px di fascia + riquadro 64 | riquadro **80**, etichetta dentro |
| libero sotto l'etichetta | 64 | **~65** — le due righe a mano restano due |

**Il riquadro non si stringe mai.** Nel blocco resta 48 e nel piede **cresce**, perché lì la promessa
non è una riga ma due e l'etichetta dentro non può mangiarne mezza; sulla pagina il conto del piede
resta in pari (80 contro 64 + 17). Nei campi da 24 px l'etichetta **resta sopra**: lì dentro
mangerebbe la scrittura. Fuori dal foglio, nei moduli a schermo, non cambia niente.

**Continua a leggersi come un'etichetta**, e non come qualcosa di già scritto a penna. Era l'unica cosa
che poteva andare storta, e non succede perché i due segni non si somigliano in niente: l'etichetta è
grigia (`--rg-color-text-secondary`), piccola (10 px in stampa nel blocco, 12 nel piede, che non si
compatta), maiuscola e spaziata, ferma nell'angolo; la mano scrive nero, grande, corsivo, e appoggia
sulla base. Il **filetto sinistro** del riquadro le passa accanto e dice che sta dentro, e il rientro è
lo stesso dei valori già stampati (8 px): etichetta e valore partono dalla stessa colonna.

**Limite dichiarato.** Un valore già stampato tanto lungo da riempire tutto il riquadro finirebbe sotto
l'etichetta: un `padding-top` sulla riga lo tiene distante e, finché il campo è vuoto — cioè sempre,
sul foglio — non costa un pixel, perché la riga allinea il contenuto in basso.

### E l'aria fra le sotto-operazioni diventa 12 px

Quella che serviva. Nella 1.36.0 si erano dovuti tenere **8 px** invece di 12 perché a 12 il fascicolo
di prova andava da 20 a **23 pagine** e si spezzavano **tutti e tre** i gruppi di fasi collegate: su una
pagina ci sono quattro sotto-operazioni e ogni passo in più si moltiplica per quattro. Adesso li paga
l'etichetta entrata nel riquadro.

**Dove sono finiti i ~49 px per pagina critica:** **16** all'aria fra le sotto-operazioni (8 → 12), **8**
al riquadro della nota del piede (64 → 80), **~25 restano di margine**. Di margine, non di aria: un
titolo di fase più lungo o un valore che va a capo se li prendono tutti, e il vincolo del gruppo su una
pagina sola non si rimette in gioco per quattro pixel.

### Misura

Stesso fascicolo di prova (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso motore (Chrome),
stesso identico documento prima e dopo: **pagine invariate, 0 gruppi di fasi collegate spezzati prima e
dopo**. Sulle tre pagine critiche — due fasi collegate più il loro piede — il contenuto finisce a
**1044 px** invece di 1069, con il fondo utile a 1077: **33 px di margine invece di 8**. Tavola nuova in
vetrina (*La nota con l'etichetta dentro il riquadro*).

*Nota sul numero di pagine:* nel checkout di prova di oggi il fascicolo esce in **17** pagine e non
nelle 20 citate dalla 1.36.0. A cambiare è stata l'applicazione che compone il documento, non il DS: il
confronto qui è prima/dopo sullo **stesso** documento, e il vincolo verificato è quello che conta —
nessun gruppo di due fasi collegate si spezza, e le pagine non aumentano.

## 1.36.0 — 2026-09-22

**Minor.** Nessuna classe nuova, nessuna rimossa o rinominata, nessun token toccato. Cambia **come si
compila** il foglio di lavorazione: chi aggiorna il tag e ristampa il fascicolo vede il foglio diverso,
e va saputo prima. Cambia anche un comportamento di layout: dentro `rg-worksheet-block--compact` le
colonne dei campi non sono più automatiche (vedi [UPGRADING](UPGRADING.md#1360--i-campi-del-foglio-in-quattro-colonne)).

Cinque osservazioni dallo stesso foglio stampato (Lorenzo, 2026-09-22), tutte sugli **spazi da
compilare a penna** e sulla loro gerarchia.

### Quattro colonne fisse, e i campi di una fila alti uguale

> «Farei una divisione della larghezza per 4, così le label vanno su una riga e non su due e lo stesso
> per il testo dentro che non va su due righe. Eviterei questo continuo alto-basso dei box perché
> l'altezza è diversa.»

`rg-worksheet-block__fields`, dentro `--compact`, aveva colonne **automatiche** (`auto-fill`, minimo
128 px): numero e larghezza li decideva lo spazio disponibile. Su un A4 con margini da 12 mm cadeva su
quattro colonne, **ma per un pelo**: dieci pixel di larghezza in più e sarebbero diventate cinque,
strette, con ogni etichetta a capo. Una griglia che cambia da un documento all'altro non è una griglia.

Adesso sono **quattro, fisse, uguali**. Il quarto di foglio è ~160 px (~42 mm) e tiene su una riga sola
l'etichetta più lunga del reparto («PUNTO MORTO INFERIORE») e un valore di diciotto caratteri. La nota
(`rg-fill-field--tall`) continua a prendere **la fila intera**. Sotto i 680 px — a schermo, su un
telefono — le colonne tornano automatiche: un quarto di quella larghezza non è un campo, è un taglio.

E il campo diventa una colonna vera: **etichetta in alto, riga da scrivere che si prende tutto quello
che resta**. Se un valore già stampato va a capo e alza il suo riquadro, si alzano **insieme** anche i
riquadri accanto. Prima le righe erano allineate sul solo *fondo*, e una che cresceva sfalsava la fila:
era l'«alto-basso dei box».

**Limite dichiarato:** un'etichetta che non ci sta in un quarto di foglio va a capo lo stesso, e in
quella fila il suo riquadro comincia una riga più in basso degli altri — chiudono comunque tutti sulla
stessa linea, che è dove si scrive. Allineare anche l'alto vorrebbe `subgrid`, che porterebbe il
proprio `row-gap` fra etichetta e riga: ~4 px per fila, ~40 px per pagina, cioè più di quanto un gruppo
di due fasi ha da spendere. Misurato, scartato.

### La sotto-operazione si vede, l'etichetta si fa da parte

> «Renderei più differente la sotto operazione, magari facendola in bold.»
> «Le label le farei un po' più grigie del testo, che va bene così.»

`rg-worksheet-block__op` era a peso regolare, e sotto ci sono le etichette dei campi — maiuscole e
spaziate: a 14 px contro 10 la differenza di corpo non bastava, e il titolo si leggeva come la prima di
quelle etichette invece che come la cosa che le apre. Passa al **grassetto**, la stessa eccezione già
dichiarata per `__work` (regole §3 vorrebbero 500): su carta il titolo di una sezione si cerca da
lontano. Una chiosa in `rg-small` dentro `__op` resta a peso regolare.

E `rg-fill-field__label`, **dentro `rg-worksheet-block--compact` e `rg-worksheet-foot`**, scende da
`--rg-color-text-label` (neutral-800, 14,8:1) a **`--rg-color-text-secondary`** (neutral-600, **6,1:1**
su bianco, AA superato). Su un foglio da compilare le cose stampate sono due: l'etichetta *dice* cosa
scrivere, il valore *è* quello che c'è scritto, e pesavano uguale. Il nero resta del dato — stampato o
a penna che sia. Fuori dal foglio, nei moduli a schermo, l'etichetta non cambia: lì è l'unica cosa che
c'è. *Nota:* `rg-fill-field__unit` era già `--rg-color-text-secondary`, quindi sul foglio unità ed
etichetta hanno ora lo stesso grigio; a distinguerle restano il mono e la spaziatura.

### Più aria fra le sotto-operazioni — e quanta ce n'era

> «Lasciamo se possibile poco più spazio tra le varie sotto operazioni.»

Lo spazio da dare non c'era: il fascicolo sta in **20 pagine** e ogni gruppo di due fasi collegate in
**una pagina**, e la 1.34.0 aveva già speso l'ultimo margine. Allora lo si compra dove era sprecato.
Sul foglio ogni sezione finisce con la **riga nera** di un campo — la nota, che prende la fila intera —
e 4 px più sotto arrivava un **secondo filetto**, grigio, sopra la sotto-operazione. Due linee quasi
attaccate non separano meglio di una: fanno rumore e spezzano in due lo stacco.

Il filetto sparisce (solo dentro `--compact`; il blocco normale lo tiene, perché lì le sezioni non
finiscono per forza con una riga nera) e il suo posto lo prende il bianco:

| | 1.35.0 | 1.36.0 |
| --- | --- | --- |
| sopra la sotto-operazione | 4 px + filetto + 4 px | **8 px di bianco** |
| sotto il titolo | 0 | **2 px** |
| costo per operazione | — | **+1 px**, e un filetto in meno |

**Perché non di più, con il numero.** Su una pagina ci sono quattro sotto-operazioni e ogni passo in
più si moltiplica per quattro: a **12 px** sopra invece di 8 il fascicolo di prova va a **23 pagine** e
si spezzano **tutti e tre** i gruppi. Gli 8 px si pagano dove non si scrive: l'interlinea della riga di
chiusura del corpo («tempo per pezzo: piazzamento 5" + pressatura 3' ÷ 4 pezzi per ciclo = 50"»), che è
un conto già fatto, passa da tecnica a stretta — ~7 px per gruppo. **Alle note non si tocca niente.**

### Fra due fasi collegate, una linea doppia

Sullo stesso foglio stanno due fasi e si faceva fatica a vedere dove finisce la prima. La linea di
giunzione era un filetto come tutti gli altri: stesso peso del contorno del blocco e dei filetti
interni, cioè nessuna gerarchia. `rg-worksheet-block--continued` porta il bordo superiore a
**`--rg-border-strong`** (2 px) e diventa **l'unica linea doppia del foglio**. Costa 1 px: il margine
negativo sovrappone già il filetto inferiore del blocco sopra alla metà alta di questo.

### Misura

Stesso fascicolo di prova (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso motore (Chrome):
**20 pagine prima, 20 dopo; 0 gruppi spezzati prima, 0 dopo.** Sulle tre pagine critiche — due fasi
collegate più il loro piede — il contenuto finisce a **1069 px** invece di 1072, con il fondo utile a
1077: **8 px di margine invece di 5**. Tavola nuova in vetrina (*I campi del foglio*).

## 1.35.0 — 2026-09-22

**Minor.** Nessuna classe nuova, nessuna rimossa o rinominata, nessun token toccato. Cambia **come si
legge** la banda di reparto: chi aggiorna il tag e stampa il fascicolo vede il foglio diverso, e va saputo
prima. Sparisce una variabile CSS interna, `--rg-dept-inset`: nessuna variante la dichiarava e nessun
prodotto la imposta, ma chi l'avesse scritta nel proprio CSS non la vedrà più avere effetto.

### Il reparto non è più attaccato alla trama

Dal foglio stampato: «sistemiamo anche il reparto attaccato alla trama» (Lorenzo, 2026-09-22). Il riquadro
col nome — «REPARTO PRESSATURA E SOFFIATURA» — e la striscia della figura si leggevano **come una macchia
sola**. Era il limite dichiarato nella 1.34.0.

**La causa non era la distanza, era la sovrapposizione.** La striscia era in posizione **assoluta**, larga
quanto tutta la banda, e passava **dietro** la targhetta: a tenerle separate restavano il fondo bianco del
nome e 4 px di `outline` bianco, 2 sul foglio compatto — ~0,5 mm sulla carta, cioè niente. Allargare
l'`outline` non era la strada: cresce verso l'esterno, e avrebbe mangiato il filetto sotto la banda e la
riga della fase sopra, cioè proprio l'aria che la 1.34.0 aveva appena rimesso fra le tre zone della
testata.

**La striscia diventa un elemento di flusso.** Uno pseudo-elemento può essere un **flex item**: `::after`
non è più posizionato, è un figlio della banda con `flex: 1 1 0`. Parte da solo dove finisce il nome,
staccato dal `gap` della banda — **8 px, un passo intero** — e arriva al margine destro del contenuto. Non
c'è più niente che passa sotto niente:

    ┌──────────────────────┐
    │ REPARTO PRESSATURA   │ ▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭▭   Foglio 2 / 15
    └──────────────────────┘

E quindi **l'`outline` bianco sparisce**, con il limite che la 1.21.1 dichiarava («accanto al margine
bianco può restare visibile uno spicchio dell'elemento coperto»): non c'è più niente da coprire.

**Una striscia sola, due file.** Le due file sfalsate degli strass stavano su `::before` e `::after`: ora
stanno sullo stesso elemento, in due gruppi di strati (`--rg-dept-trama` e, sotto, `--rg-dept-trama-mezzo`),
e lo scarto di mezzo passo lo porta il `-pos` della seconda invece della posizione dello pseudo-elemento.

**La fine della striscia resta un elemento intero.** La larghezza di un flex item non si può arrotondare
con `round()`, che vuole una lunghezza; il taglio lo fa `clip-path: inset(…)` con dentro lo stesso
`round(down, 100%, passo)`. Dove `round()` non c'è la dichiarazione cade e la striscia resta piena: stesso
disegno, ultimo elemento tagliato — esattamente il ripiego di prima.

**Il pavimento di 32 px.** La figura è uno dei tre segnali ridondanti e **non può sparire perché il posto è
poco**: con un nome lungo e una nota lunga la striscia arriverebbe a zero, e la banda resterebbe con due
segnali su tre. `min-width` la tiene larga almeno tre o quattro elementi; a cedere è il nome, che va a
capo. In vetrina c'è la tavola *Quando il posto è poco*.

**`--rg-dept-inset` non c'è più.** Serviva a ridare alla striscia assoluta il margine laterale che la banda
aveva già come `padding`, e valeva **sempre** quanto quel `padding` (8 sul foglio, 24 nella fascia da 48
px, 16 sotto i 680). Una striscia in flusso sta dentro il padding da sé: la variabile era una ripetizione —
e una ripetizione che qualcuno può cambiare per metà.

### Dove la banda si usa, e cosa non cambia

La banda non sta solo sul foglio: è anche l'intestazione del pannello della fase (`rg-phase-panel__band`,
48 px, sempre `--quiet`) e la testata della pagina di avanzamento, dove `rg-dept-band__note` porta il
numero della fase. La nota **resta a destra**: prima ce la portava `margin-left: auto`, ora è la striscia
che cresce e la spinge là (`order: 1`, perché uno `::after` è l'ultimo dei figli). Altezza della banda
invariata in tutti e tre i posti: la detta il nome (28 px), non la striscia (16), e l'`outline` non
occupava spazio.

### Misura

Stesso fascicolo di prova della 1.33.0 e della 1.34.0 (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso
motore (Chrome): **20 pagine prima, 20 dopo**; **0 gruppi di fasi collegate spezzati prima, 0 dopo**. Il
vincolo della 1.33.0 — due fasi collegate e il loro piede in una pagina A4 — non è stato toccato.

**Limite dichiarato.** La striscia comincia dove finisce il nome, e il nome è largo quanto il testo che
contiene: il suo bordo sinistro non cade più su una coordinata dichiarata dal CSS. In stampa non cambia
niente (il PDF di Chrome resta vettoriale) e a schermo, provato a DPR 1, Chrome aggancia comunque la
figura ai pixel; su un motore che non lo facesse, i bordi della figura potrebbero uscire sfumati di mezzo
pixel.

## 1.34.0 — 2026-09-22

**Minor.** Nessuna classe nuova, nessuna rimossa o rinominata, nessun token toccato: cambia **come si
stampa** un componente che c'era già. Non è una patch perché chi aggiorna il tag e stampa il fascicolo
**vede il foglio diverso** — in maiuscolo — e questo va saputo prima, non scoperto dopo. Tutto quello
che sta fuori dal foglio resta identico.

### Le testate si leggono come tre cose, perché tre cose sono

Dal foglio stampato: «nelle testate ci sono un sacco di scritte vicine che creano confusione, le
scritte sono forse un po' troppo attaccate» (Lorenzo, 2026-09-22). In testa a un blocco ci sono tre
informazioni che rispondono a tre domande diverse — **a che punto sono** (`__step`, «FASE 2 DI 5»),
**che foglio ho in mano** (banda di reparto e «Foglio 2 / 15»), **cosa devo fare** (`__work` col suo
`__role`, e il QR). Stavano a mezzo passo l'una dall'altra, 2 px, ~0,5 mm: sulla carta è *niente*, e
le tre zone si leggevano come un blocco unico di scritte. Il ruolo, poi, stava **di fianco** al
titolo staccato da una sola barretta, e con un titolo lungo («SABBIATURA E SOFFIATURA FINALE») il
titolo andava a capo e finiva addosso al ruolo e al QR.

**La testata diventa una griglia.** Due colonne — testo e QR — e due righe:

    ┌─────────────────────────────┬──────┐
    │ PRESSATURA                  │      │
    ├─────────────────────────────┤  QR  │
    │ PRINCIPALE · CON LA 03      │      │
    └─────────────────────────────┴──────┘

Il **ruolo scende sotto il titolo** e si legge come sottotitolo, che è quello che è; la **barretta
sparisce**, perché serviva a staccarlo dal titolo su una riga sola e fra due righe non separerebbe
niente. Il **titolo si prende tutta la larghezza** che gli resta e smette di spezzarsi. Il **QR ha
una colonna sua**, alta quanto le due righe: non può andare a capo per costruzione, e la regola
`nowrap` della 1.33.0 che gli faceva da guardia qui non serve più (resta per la testa 1.23). Si
aggancia con `:has(> __work)`, cioè alla testa 1.25: chi usa `__phase` / `__part` / `__meta` non vede
niente cambiare.

**E non costa un millimetro**, che è la ragione per cui si poteva fare senza disfare la 1.33.0:
l'altezza della testata **la detta il QR** (48 px), non il testo, e titolo più ruolo impilati ci
stanno dentro. A pagare è solo il bianco fra le zone, che torna a un passo intero: **4 px** sopra la
riga della fase, **6 px** sopra e sotto la banda. Fanno ~12 px per gruppo di due fasi, ed è
**esattamente quello che il gruppo aveva libero** dopo la 1.33.0. Chi tocca ancora le spaziature del
blocco compatto misuri prima di proporre.

### Il foglio è tutto in maiuscolo

«Mi raccomando tutte le scritte devono essere in maiuscolo, anche il lato (davanti e dietro)». Le
etichette lo erano già; i **valori** no («davanti e dietro», «medio»), e nemmeno i sottotitoli di
operazione, la riga del tempo per pezzo, le didascalie, le intestazioni di tabella. Un foglio metà
maiuscolo e metà minuscolo si legge come due fogli diversi.

`rg-worksheet-block` e `rg-worksheet-foot` dichiarano `text-transform: uppercase`, quindi vale per
**qualunque testo ci finisca**, oggi e domani, senza che chi scrive il markup se ne debba ricordare.

**Nel CSS e non nel database.** I dati arrivano dal gestionale in minuscolo perché lì ci stanno bene:
urlarli alla fonte vorrebbe dire perdere l'originale e portarsi il maiuscolo dentro ogni altra
schermata. `text-transform` è presentazione — cambia come si stampa, non cosa è scritto, e chi copia
il testo dal PDF ritrova le parole com'erano.

**Vale solo dentro il foglio**: il blocco della fase e il suo piede (che è parte del foglio anche se
sta fuori dal riquadro). La pagina della fase a schermo usa altri componenti e non cambia.

**Unica eccezione, i simboli di unità** (`rg-fill-field__unit`), che dichiaravano già
`text-transform: none`: «s», «bar», «°C», «min» sono simboli e il maiuscolo li cambierebbe di
significato (regole §8). **Limite dichiarato:** un'unità scritta *dentro* il valore («4 (26,1 × 29,3
cm)») il CSS non sa distinguerla dal testo, ed esce in maiuscolo. Dove il simbolo conta, va messo nel
suo elemento.

### Didascalia del QR in linea su una riga sola

`rg-qr--inline` esiste per non aggiungere altezza a una testata bassa. Con il posto stretto la sua
didascalia di due parole andava a capo — «Questa» / «fase» — e si riprendeva l'altezza che la
variante serve a risparmiare. Ora sta su una riga: se non ci sta, a cedere è l'elemento accanto.

### Misura

Stesso fascicolo di prova della 1.33.0 (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stesso motore
(Chrome): **20 pagine prima, 20 dopo**; **0 gruppi spezzati prima, 0 dopo**. Il vincolo della 1.33.0
— due fasi collegate e il loro piede in una pagina A4, e le note alte — non è stato toccato.

## 1.33.0 — 2026-09-21

**Minor.** Una classe nuova (`rg-worksheet-foot`), nessuna rimossa o rinominata, nessun token toccato. Chi
aggiorna il tag e non usa il fascicolo non vede niente cambiare a schermo; chi **stampa** un
`rg-worksheet-block--compact` vede il foglio farsi più denso, ed è il punto.

### Il piede esce dal riquadro della fase

Chi firma e chi scrive le note **non sta dentro il riquadro della fase**. Il riquadro del blocco dice
*«questa è la fase, questi sono i suoi dati»*: cose che il sistema sa e che ha stampato. Firma e nota dicono
un'altra cosa — *«questo è ciò che è successo quando l'ho fatta»* — e sono di chi lavora, non della scheda.
Finché vivevano in `rg-worksheet-block__foot` l'operatore scriveva **dentro la cornice dei dati stampati**, e
la nota, l'unico spazio davvero da riempire, era una riga schiacciata in fondo a una fila di campi.

    <div class="rg-worksheet-foot">
      <div class="rg-fill-field">…Operatore…</div>
      <div class="rg-fill-field">…Data…</div>
      <div class="rg-fill-field rg-fill-field--tall rg-worksheet-foot__note">…Note…</div>
    </div>

Due colonne: **Operatore e Data affiancati**, la **nota a tutta la fila** e alta **64 px (~17 mm)**, più di
una `rg-fill-field--tall`. Il piede **non si compatta**: la densità compatta serve ai dati già stampati, non
allo spazio bianco che deve accogliere una grafia. `rg-worksheet-block__foot` resta valido e non cambia: chi
non migra non vede differenza.

**Limite dichiarato, e misurato.** Il piede vorrebbe due cose insieme: non spezzarsi e non staccarsi dal
blocco che lo precede. In Chrome — il motore che impagina il fascicolo — le due si escludono: con
`break-before: avoid` il fragmentatore tiene il piede attaccato al blocco e, quando l'insieme non entra,
taglia **dentro** il piede, e il riquadro della nota esce diviso fra due fogli. Provato a riempimenti
crescenti, da 860 a 980 px: con `break-before` si spezza **sempre**, senza resta **sempre** intero. Fra «il
piede scende intero alla pagina dopo» e «la nota esce tagliata a metà» il reparto perde poco nel primo caso e
tutto nel secondo: resta solo `break-inside: avoid`, ripetuto anche sui singoli campi.

### Due fasi collegate in una sola pagina A4

L'obiettivo della compattazione di stampa di `rg-worksheet-block--compact` **è misurabile e non estetico**.
Un gruppo di fasi collegate è una cosa sola per chi lavora — la 03 si fa subito dopo la 02, stesso reparto,
stesso banco — e spaccarlo su due fogli vuol dire girare pagina a metà lavoro, che è esattamente ciò che il
reparto non fa. Mancava circa **un quarto** di altezza, e il quarto si toglie **dove non si scrive**:

- **l'aria attorno al testo già stampato**: etichetta del campo a **10 px senza stacco sotto** (era 12 più 4),
  metà del distacco fra le file, interlinea stretta sui sottotitoli di operazione, respiro dimezzato su
  testata, riga «Fase n di N» e banda del reparto;
- **la testata su una riga sola**: era la perdita più grossa e la meno visibile. Con un titolo lungo la riga
  di flex si riempiva e il **QR andava a capo da solo**, prendendosi una seconda riga alta quanto lui — ~48 px
  di pagina per dire una cosa che stava già lì accanto. Con `nowrap` il QR resta al suo posto e a cedere è il
  titolo, che va a capo fra le sue parole: due righe di titolo costano meno di una riga di QR. Il QR scende da
  60 a **48 px**; a 12,7 mm per 41 moduli il modulo resta a ~0,31 mm, e **sotto questa misura non si va**;
- **il titolo del blocco che continua**: 20 invece di 28. È il secondo di una coppia, chi legge è già dentro
  al gruppo e non ha bisogno che il secondo titolo gridi quanto il primo.

**Mai le note.** La riga da scrivere resta 24 px, la `--tall` resta 48, la nota del piede **sale** a 64. Su
carta un campo troppo corto non è un difetto di stile: è un dato che non viene scritto.

**L'etichetta a 10 px è un'eccezione dichiarata** (regole §12), `calc(var(--rg-font-size-xs) - var(--rg-space-1) / 2)`.
Il DS non ha un gradino sotto `--rg-font-size-xs` perché **a schermo** 12 px è il minimo leggibile; su
**carta** la misura è fisica e 2,6 mm di maiuscoletto spaziato di due parole si leggono senza sforzo. Vale
**solo** in `@media print` e **solo** dentro `--compact`: a schermo non cambia nulla.

**Misura sul fascicolo di prova** (SNEACKERS NICLA, 3 parti, 11 fasi, 15 fogli), stampato con Chrome headless:

| | pagine totali | gruppi spezzati su due pagine |
| --- | --- | --- |
| prima | 23 | 3 su 3 |
| dopo | **20** | **0** |

### Un valore lungo non si stampa più sopra l'etichetta

`rg-fill-field__line` porta spesso un valore **già stampato dall'app**, e un valore lungo — «SABBIATRICE
MANUALE · BANCO SOFFIATURA» — va a capo dentro il riquadro. Con `height` fissa la seconda riga di testo usciva
**da sopra** il riquadro e finiva addosso all'etichetta: due scritte sovrapposte, illeggibili sulla carta.

L'altezza diventa `min-height`. La misura dichiarata resta un **minimo** — l'altezza della scrittura a mano,
che è la ragione per cui il componente esiste — e il campo **cresce** quando il testo chiede una riga in più:
costa qualche millimetro di pagina solo dove serve. Vale per la base, per `--tall`, per la densità compatta.
Con `overflow-wrap: anywhere` per il codice lungo senza spazi, e — nel blocco compatto, dove il valore è
allineato in basso — interlinea `tight` invece di `1`, altrimenti le due righe di testo si toccano. Nella
stessa fila i campi restano allineati **sul fondo**: le basi nere cadono tutte sulla stessa linea anche quando
un valore ne occupa tre.

**Effetto collaterale, voluto:** una tabella o un pannello che usava `rg-fill-field` con valori lunghi e li
vedeva sbordare ora si allunga invece di sovrapporre. È il comportamento corretto; chi contava sull'altezza
fissa per allineare qualcosa **fuori** dal campo deve verificarlo.

## 1.32.0 — 2026-09-21

**Minor.** Nessuna classe e nessun token aggiunto, rimosso o rinominato, nessun markup da toccare: cambia il
**valore** di due token esistenti, `--rg-color-scope` e `--rg-color-scope-text`. È una minor e non una patch
perché cambia l'aspetto di un componente già in produzione, e chi si aggancia al tag deve poterlo vedere nel
numero: un prodotto che aggiorna si ritrova la fascia d'ambito di un altro colore.

### Il colore d'ambito diventa ambra

La 1.31.0 aveva introdotto un rosso proprio, `#b3261e`, con il testo bianco. Visto montato in pagina, il
giudizio è cambiato: *«proviamo un giallo/arancione di allerta»*. Fra quattro candidati messi a confronto con
il contrasto e la resa in fotocopia di ciascuno (il rosso di partenza, un giallo, un'ambra, un arancione) la
scelta è caduta sull'**ambra `#f59e0b` con il testo nero**.

    --rg-color-scope: #f59e0b;
    --rg-color-scope-text: var(--rg-color-black);

Il **nome del token non cambia**: `--rg-color-scope` è semantico, dice il ruolo e non la tinta. Cambiano le
parole del DS che lo chiamavano «il rosso d'ambito».

**Il testo nero non è una scelta di gusto.** Nero su ambra = **9,78:1**; bianco su ambra = **2,15:1**, cioè
illeggibile. Rispetto al bianco sul rosso (5,98:1) il contrasto **sale**, quindi la nota a 12 px resta AA con
margine. I due token sono una coppia: chi cambia il primo ricalcola il secondo.

**Perché non `--rg-color-warning`** (nella 1.31.0 la domanda era su `--rg-color-danger`). Il vicino più
prossimo in tinta, a 3°, è `warning`, che nella stessa pagina è già due cose: lo stato d'avviso dei moduli
**e** `--rg-color-category-4`, cioè il reparto **Strass**. Un terzo significato sullo stesso valore è ciò che
le regole §4 vietano, e qui l'argomento è **più forte** che con `danger`, perché `warning` è già uno stato *e*
una categoria. In più il significato sarebbe sbagliato: la parola usata per chiedere il colore è stata
«allerta», ma questa **non è un'allerta**, è un'**appartenenza** — ed è la ragione per cui la parola scritta
sulla fascia non è mai facoltativa.

**Lo scarto della scelta, dichiarato prima e accettato.** In fotocopia l'ambra sta al **~65% di luminanza**
(grigio chiaro) dove il rosso stava al ~26% (blocco scuro che col contrasto spinto andava al nero). Sul foglio
la fascia **non è più l'unico blocco pieno scuro**. Regge lo stesso per due ragioni:

- resta l'unica campitura **uniforme** del foglio, e non per caso: tutte e sette le trame dei reparti sono
  `repeating-linear-gradient`, righe su bianco, nessuna è una tinta piatta (l'unica che lo era, gli
  Accoppiaggi, fu scartata nella 1.14.0). Una tinta piatta e un reticolo di righe non si leggono uguali a
  nessuna distanza, qualunque sia il tono;
- dei tre segnali cambia **quale porta il peso**: (a) la campitura regge identica, (b) il filetto nero forte
  regge identico e ora pesa di più, (c) il maiuscoletto diventa **nero** e su fondo chiaro è più solido del
  bianco in negativo — il negativo è la prima cosa che una fotocopia chiude. Il segnale che porta il
  significato è diventato il più robusto dei tre.

**Nessun rinforzo aggiunto in stampa**, e la ragione è che il posto è già occupato. Ciò che l'ambra indebolisce
non è la lettura della fascia ma il colpo d'occhio da un metro sul mucchio dei fogli, e quel compito lo fa già
`rg-worksheet-block--product`, che raddoppia il contorno sui quattro lati e corre per l'altezza del blocco
invece che in una striscia alta 20 px. Un secondo filetto forte **sopra** la fascia cadrebbe a distanza zero
dal bordo del blocco (la fascia è il primo figlio, a filo) e si leggerebbe come una sbavatura di stampa.

**Vicini caldi, verificati.** `--rg-color-warning` (`#7a5a16`, `category-4`) sta a 3° di tinta ma a metà della
luce (L 28% contro 50%, grigio 36% contro 65%): non si confonde. `--rg-color-accent-sand` (`#b79a62`,
`category-6`, reparto **Accoppiaggi**, e colore della terza parte in `rg-part-mark`) sta a **2° di tinta e allo
stesso grigio**, 61% contro 65%: **in fotocopia i due toni non si distinguono**. Non si confondono lo stesso
perché la sabbia compare come trama di righe o come pastiglia tonda numerata e l'ambra come rettangolo pieno
col contorno nero — la distanza la fanno figura e misura, non la tinta. È un limite dichiarato, ed è la coppia
da tenere d'occhio prima di introdurre un terzo caldo pieno nella stessa vista. Nuova tavola in vetrina:
`#scope-vs-sand`.

Aggiornati con il ragionamento nuovo: `tokens.css`, `tokens.json`, il blocco di commento sopra `.rg-scope-band`
in `styles/rg-components.css`, la nota di stampa in `styles/rg-utilities.css`, `components/scope.md`, i rimandi
in `badges.md`, `phase-switch.md`, `worksheet-block.md` e `steps.md`, le regole §4 (il capitolo si chiama ora
*Il colore d'ambito*), `components.json` e la vetrina, dove `#scope-sheet-photocopy` mostra la resa vera
dell'ambra.

## 1.31.0 — 2026-09-21

**Minor.** Classi nuove e additive e **due token nuovi** (`--rg-color-scope`, `--rg-color-scope-text`): nessuna
classe o token rimosso o rinominato. Un solo cambio su una classe esistente, e solo per chi usa le classi nuove:
in `rg-steps` la riga `--product` porta filetti forti al posto del filetto neutro.

### La fase che vale per tutto il prodotto, non per una parte

Dalla piattaforma prodotti: una fase appartiene di norma a una **parte** (tomaia, spoiler, linguetta); da oggi
può valere per **tutto il prodotto** — il controllo qualità finale. Si compila una volta sola, si vede dalla
pagina di ogni parte, conta una volta nel costo e sul fascicolo esce una volta sola, in fondo a tutti i fogli
delle parti. Lorenzo: *«è importante identificare se è al paio o se è al pezzo […] a livello di interfaccia e
anche di scheda è una cosa che va evidenziata parecchio»*. Sbagliarlo vuol dire fare tre volte un controllo che
va fatto una.

**Un segno solo, in due misure**, nei posti dove la cosa si decide.

- **`rg-scope-band`** (`__text`, `__note`): la **fascia**, da bordo a bordo. A schermo è il primo figlio di
  `rg-phase-panel`, **sopra** la riga del reparto (`__department`): prima di chi la esegue viene di chi è. Sul
  foglio stampato è il primo figlio di `rg-worksheet-block`, a filo dei bordi, **prima** di `__step` e della
  banda del reparto. La nota dice la conseguenza («si compila una volta sola», «nel costo conta una volta»),
  non ripete la dichiarazione.
- **`rg-scope-mark`** (`--part`): il **timbro** in linea, misura da etichetta, per una riga di elenco. Forte
  per l'eccezione, quieto per «solo questa parte» — e il quieto si usa **solo** dove i due ambiti convivono
  nella stessa vista: marcare tutte le righe equivale a non marcarne nessuna.
- **`rg-worksheet-block--product`**: contorno forte sul foglio della fase di prodotto, il secondo segnale per
  chi lo cerca nel mucchio.
- **`rg-step--product`**: nell'elenco della parte la fase di prodotto sta **al suo posto nella sequenza**, in
  mezzo alle altre, e si riconosce da due segni: il timbro sopra il titolo e i **filetti forti** sopra e sotto
  la riga, al posto del filetto neutro. Il filo della sequenza la attraversa come tutte.
- **`rg-steps__break`** (`-title`, `-note`): lo stacco intitolato, **opzionale**, per l'elenco che raggruppa le
  fasi di prodotto in coda. La piattaforma non lo usa.
- `print-color-adjust: exact` esteso a fascia e timbro in `rg-utilities.css`: senza, il browser butterebbe via
  la campitura e resterebbe testo bianco su bianco.
- Doc nuovo: `components/scope.md`. Sezioni aggiunte a `steps.md`, `worksheet-block.md`, `phase-switch.md`,
  `badges.md`; regole §4 aggiornate. Vetrina: `#scope` (testa del blocco, elenco della parte, foglio stampato,
  e tutti e due in simulazione fotocopia).

### Il colore dell'ambito: `--rg-color-scope`

La prima stesura era **nera**. Dal campo: *«rendila più evidente, magari in rosso? o comunque un colore bello
evidente»*. Quindi campitura piena in un rosso che nel DS non esisteva, `#b3261e`, con `--rg-color-scope-text`
(bianco) come coppia dichiarata.

**Perché non `--rg-color-danger`.** Quel rosso, nella stessa pagina, è già due cose: l'errore dei moduli **e**
`--rg-color-category-3`, cioè il reparto **Pressatura**. Un terzo significato sullo stesso valore è ciò che le
regole §4 vietano — e sarebbe il significato sbagliato: qui non c'è nessun errore, c'è un'appartenenza. Il
rosso d'ambito è più acceso del mattone dell'errore: a colpo d'occhio non sono lo stesso rosso. Le regole §4
hanno ora un capitolo che lo dichiara: un ruolo solo, mai azione, navigazione, focus, testo o stato, mai da
solo.

**Tre segnali, e uno solo è il colore.** (a) **Campitura piena**: nessuno stato del DS riempie una superficie —
alert, badge e campi in errore sono filetti e parole su bianco. (b) **Filetto nero forte** sotto la fascia e
contorno nero attorno al timbro. (c) **Maiuscoletto bianco**, che è contenuto del markup.

**In fotocopia.** Il rosso d'ambito in scala di grigi cade a ~26% di luminanza e col contrasto spinto va al
nero: sul foglio resta l'unico blocco pieno scuro, mentre le trame dei reparti — righe sottili su bianco —
restano chiare. Vale anche contro la trama della Pressatura, che a colori usa lo stesso rosso dell'errore. Il
confronto affiancato è in vetrina (`#scope-sheet-photocopy`, `#scope-steps-photocopy`). Contrasto del testo:
bianco su scope = 5,98:1, AA anche a 12 px.

**Non è un badge, ed è il punto.** `rg-badge` per contratto sta su superficie bianca con filetto: classifica un
record fra i suoi pari. Qui non si classifica una fase, si dice che quella fase **non è come le altre**. Il
badge era la prima ipotesi ed è stato scartato come troppo timido.

**Non compete con il reparto.** `rg-dept-band` ha trama, colore categoriale e targhetta bianca; la fascia
d'ambito è piena, senza trama, sta più in alto ed è **più bassa** — una campitura piena pesa più di una trama a
parità di altezza.

### Seconda stesura dell'elenco: dentro, non in coda

La prima versione metteva le fasi di prodotto **in coda**, dopo uno stacco intitolato. Dal campo: *«qui mi
scrivi troppe volte "di tutto il prodotto"; in più non va bene che sia separato: la fase è dentro le altre ma è
visibilmente diversa dalle altre»*. Ora la riga sta al suo posto nella sequenza, il filo la attraversa e il
segno regge da solo. Lo stacco resta documentato come opzionale.

## 1.30.0 — 2026-09-18

**Minor.** Classi nuove e additive, nessuna classe o token rimosso o rinominato, nessun token nuovo. Un cambio di
comportamento **solo su dispositivi touch**: campi a 16 px e bersagli a 44 px (desktop e stampa invariati).
Chiesta come 1.29.0: il numero era già preso dalla release «icona materiali» (su `origin/main`).

### Telefono e iPad: il campo non ingrandisce più la pagina, le proposte di modifica

Dall'uso su telefono e iPad della piattaforma prodotti: il campionario apre dal QR del fascicolo la scheda di una
fase, preme «Fatta» e **propone** modifiche ai valori; l'ufficio, da PC o iPad, le **accetta** o le **rifiuta**.

- **Bug iOS: toccando un campo la pagina si ingrandiva.** Safari su iOS/iPadOS ingrandisce quando il testo del
  campo è sotto i 16 px, e i controlli RG sono a 14. Su touch (`@media (pointer: coarse)`) e sempre su iOS/iPadOS
  (`@supports (-webkit-touch-callout: none)`, che copre l'iPad con trackpad) `rg-input`, `rg-select`,
  `rg-textarea`, `rg-search` e i campi nativi salgono a **16 px**. Il viewport non si tocca, lo zoom a due dita
  resta libero. `html` con `text-size-adjust: 100%`.
- **Bersagli da 44 px su touch** (`pointer: coarse`): campi, bottoni anche `--small`, bottoni a icona, chip,
  pagine, schede, voci di menu, caselle di scelta, disclosure; la colonna dei gesti di `rg-operation-sequence` si
  allarga. Regole §11 aggiornate: 40 col mouse, 44 col dito.
- **`rg-proposal`** (`--pending`, `--accepted`, `--rejected`; `__head`, `__context`, `__field`, `__change`,
  `__from`, `__arrow`, `__to`, `__why`, `__label`, `__meta`, `__outcome`, `__flag`, `__actions`, `__reject`,
  `__reason`): la card di una proposta, mobile-first. Il cambio attuale barrato e grigio → proposto a 28 px;
  «—» se l'attuale manca; la rifiutata inverte. Stato con filetto e parola (badge). «Da riportare a mano» per
  l'accettata che non si applica da sola. Accetta (primaria) e Rifiuta in due tempi col motivo facoltativo,
  senza JavaScript, bottoni da 48.
- **`rg-proposal-list`** (`__group`, `__title`, `__items`): le proposte a gruppi per stop, una colonna sul telefono,
  colonne da 320 px su iPad e PC. L'ordine (prima le da decidere) lo decide l'app.
- **`rg-proposal-notice`** (`__head`, `__count`, `__title`, `__lead`, `__list`, `__row`, `__part`, `__phase`,
  `__go`): l'avviso nella pagina del prodotto, numero grande e una riga-link da almeno 56 px per fase (parte con
  la pastiglia, fase, reparto col segno, conteggio, freccia). Sostituisce `rg-alert` con un elenco puntato.
- **Segnalino «N proposte»**: `rg-badge rg-badge--review rg-badge--count` («2 proposte»). Nessuna classe nuova.
- Documenti: `proposal.md`, `proposal-notice.md` (nuovi), `forms.md` (touch), `badges.md` (segnalino),
  `design-rules.md` §11; manifest (`proposal`, `proposal-notice` in beta; note su badge e campi); vetrina
  `#proposal`.
- Verificato in Chrome headless: a 375 px (contenitore) nessuno sforamento, bottoni 48, righe dell'avviso 89 px
  (su due righe); a 1024 px elenco su due colonne, righe 56 px; con il puntatore coarse simulato
  (`--blink-settings=primaryPointerType=2`) campi a 16 px, `rg-input` e `rg-button--small` alti 44. Non provato su
  un iPhone vero: da confermare sul dispositivo.

## 1.29.0 — 2026-09-18

**Minor.** Un'icona nuova e additiva, nessuna classe o token toccato, rimosso o rinominato.

### Icona `rg-icon-materiali`

Chiesta dalla piattaforma per il bottone secondario «Consumi materiali» nella testata della pagina prodotto,
accanto a «Schede di reparto» (`fascicolo`): porta alla pagina di filati, materiali consumati ed esploso per
ordinare i materiali (rotoli di tessuto, garza, termogarza; coni di filo per il ricamo). Nessuna icona del set
diceva «materiali».

- **`rg-icon-materiali`**: un rotolo visto di testa che si svolge (cerchio, anima, lembo in basso) e un cono di
  filo in diagonale (tronco di cono col tubo in cima e una spira). Stessa griglia delle altre: 24×24, area viva
  3–21, tratto 1,5 a capi quadri, nessun riempimento, `currentColor`. Provata a 16, 20 e 24 px.
- Uso: icona + testo dentro `rg-button rg-button--secondary`, come «Schede di reparto».
- Documenti: `components/icons.md` (tabella dei nomi), manifest (`icons`, note, parole chiave), vetrina `#icons`
  (37 icone).

## 1.28.0 — 2026-09-18

**Minor.** Classi nuove e additive, nessuna classe o token rimosso o rinominato, nessun token nuovo. Chiesta come
«1.23.0»: `main` era già a 1.27.0, quindi è la 1.28.0. Un solo cambio visivo a chi usa già `rg-form-row`: input
e select nella riga sono alti 40 px esatti (l'input era 41).

### La testa della sequenza: gruppi di campi e pezzi sul piano

Da Lorenzo, per la testa della fase di stampa: *«una piccola label sopra le misure altezza e larghezza e poi un
separatore e affianco pezzi per ciclo e tempo totale. Con magari un visualizzatore pezzi su piano… e "ne stanno al
massimo" gli diamo più spazio.»*

- **`rg-form-row--groups`** (variante di `rg-form-row`): la riga di campi si divide in gruppi,
  **`rg-form-row__group`** (`<fieldset>`) con **`rg-form-row__legend`** (maiuscoletto piccolo grigio) e un
  filetto verticale dal secondo gruppo in poi (`gruppo + gruppo`). Nessun margine negativo: la riga non tocca il
  contenitore (una prima versione lasciava il filetto sul bordo di `rg-phase-panel`); dopo un a capo il gruppo
  che apre la seconda linea porta il suo filetto. Sotto i 680 px i gruppi vanno in colonna e il filetto
  diventa orizzontale. Funziona con un gruppo solo e con un select.
- **Altezze omogenee** dei gruppi: un gruppo senza legenda ne riserva lo spazio, input e select alti 40 px, gruppi
  stesi all'altezza del più alto (filetti uguali), un aiuto sotto un campo non sposta i controlli.
- **`rg-bed-layout`** (nuovo): il **mini-disegno** dei pezzi sul piano, nello stile dei consumi del ricamo, dentro
  la riga dei campi (`rg-field rg-bed-layout`, etichetta «Sul piano»), alto quanto i campi. SVG con `viewBox` in cm e
  misura in px dal server (alto 40, largo al più 88); cornice 1 px col raggio 2, fondo chiaro, posti occupati a
  tinta chiara con filetto (`__slot--used`), liberi tratteggiati. Accanto `__title` («10 al massimo») e `__status`
  («8 inseriti · 2 liberi»). **`--over`**: cornice e stato nel colore di avviso, icona e «12: 3 di troppo». Le
  misure stanno in `aria-label` e `<title>`. **Mai nero senza CSS**: il markup porta attributi di presentazione di
  ripiego, che il CSS ridichiara tutti.
- Una prima versione (disegno grande a destra in `rg-operation-sequence__head`, titolo da 20 px, righe di dati) è
  stata scartata da Lorenzo e tolta prima del rilascio.
- Documenti: `bed-layout.md` (nuovo, con ripiego e cosa calcola il server), `forms.md` (gruppi, altezze),
  `patterns/operation-sequence.md` (anatomia); manifest (`bed-layout` in beta, `form-row`); vetrina `#bed-layout`
  (Stampa UV 8 su 10, MuchColours 12 su 9, altezze omogenee, gruppo solo con select, fotocopia).

## 1.27.0 — 2026-09-18

**Minor.** Classi nuove e additive, nessun token nuovo. `rg-part-sheet__title` cambia forma (la 1.26.0 non è
pubblicata). Chiesta come 1.26.1 «o 1.27.0 se aggiungi classi»: aggiunge classi.

### Il nome della parte, il blocco che continua, l'ancora di stampa

- **Testata della pagina della parte con la gerarchia dei blocchi** (*«la testata faccia capire che è proprio
  quel pezzo»*): `rg-part-sheet__ident` con **`rg-part-sheet__step`** («PARTE 1 DI 4», piccolo) e
  `rg-part-sheet__title` col **nome della parte** a 28 px, grassetto, maiuscolo, pastiglia davanti. Il QR in
  linea resta l'elemento più alto: la testata non cresce (70 px), 14 parti / 8 fasi restano 609 px (64%).
- `rg-part-sheet__parts` a **quattro colonne fisse** (prima auto-fill: su una pagina larga ne faceva sette e
  troncava il nome in grassetto).
- **`rg-worksheet-block--continued`**: la fase successiva di un gruppo nello stesso reparto, senza banda e senza
  piede. Margine negativo, un solo filetto fra i due blocchi, `break-before: avoid` in stampa. Verificato: la
  testa `__step` + `__work` (+ `__role`) regge senza banda.
- **`rg-print-anchor`**: collegamento senza testo, 4 × 4 px, trasparente, fuori dal flusso, primo figlio di
  `rg-worksheet-block`, `rg-part-sheet` (o `__head`), `rg-cutout`, `rg-cutout-sheet`; il contenitore diventa
  posizionato solo se lo contiene (`:has`). Verificato: Chrome `--print-to-pdf` emette `/URI` con `/Rect` 3 × 3 pt.
- Documenti: `print-anchor.md` (nuovo), `part-sheet.md`, `worksheet-block.md`; manifest (`print-anchor` in beta,
  `part-sheet`, `worksheet-block`); vetrina `#part-sheet`, `#print-anchor`.

## 1.26.0 — 2026-09-18

**Minor.** Classi nuove e additive; `rg-part-sheet` e `rg-fill-field--check` cambiano forma, ma la 1.25.0 non è
mai stata pubblicata: nessun consumatore le usa. Nessun token nuovo.

### La pagina della parte compatta per costruzione

Dalla seconda anteprima: *«la testata prende davvero troppo spazio: immagina un oggetto che ha 7 parti e la parte
ha 6 fasi, deve comunque rientrare in un foglio»*. Con 4 parti e 3 fasi la 1.25 occupava il 91% dell'A4.

- **Testata su una riga** (~70 px): titolo a 16 px (peso di pagina) e QR piccolo in linea.
- **`rg-qr--inline`**: didascalia a sinistra del codice, allineata in basso.
- **Anagrafica in tre colonne**: `rg-part-sheet__facts` / `__fact` (etichetta sopra, valore sotto) al posto
  di `rg-key-value--ruled`.
- **Parti in quattro colonne da 20 px**: pastiglia piccola, `__name` (con i puntini se non ci sta), `__code`; la
  corrente con filetto nero spesso e grassetto; `__here` facoltativo.
- **Fasi a griglia da 24 px, testo 12, larghezze dichiarate** sulle `<th>`: `__n` 32, `__dept` 256 (reparto
  piccolo, maiuscolo, su una riga: ci sta «FINISSAGGIO E CONTROLLO QUALITÀ»), `__done` 48, `__date` 96, `__sign`
  96; la Lavorazione prende il resto.
- **`rg-fill-field--check`** a 20 px (~5,3 mm).
- **`rg-part-sheet--no-head`**: in stampa la pagina della parte passa a `rg-a4` (margine 12 mm) e si riprende lo
  spazio dell'intestazione, quando l'app non ce la stampa.
- Misurate in Chrome a 703 px (larghezza utile A4): **4 parti / 3 fasi 412 px (109 mm, 43%)**, **14 parti / 8
  fasi 609 px (161 mm, 64%)** della pagina con `rg-u-print-a4--head` (255 mm utili). PDF di prova: una pagina per
  caso, `--no-head` a 12 mm.
- Documenti: `part-sheet.md` riscritto, `qr.md`, `fill-field.md`; manifest (`part-sheet`, `qr`, `fill-field`);
  vetrina `#part-sheet` e `#qr`.

## 1.25.0 — 2026-09-18

**Minor.** Classi nuove e additive, nessuna classe o token rimosso o rinominato, nessun token nuovo. Un solo
cambio visivo a chi usa già `rg-worksheet-block--compact` (1.23–1.24, non ancora pubblicate): il valore
stampato dentro la riga ha aria.

### Il fascicolo, seconda versione

Dall'anteprima di Lorenzo sulla 1.24 (COCOTTE era sceso da 25 a 18 facciate).

- **Testa nuova del blocco**, opt-in con `__step`: **`rg-worksheet-block__step`** («FASE 1 DI 3», piccolo, sopra
  la banda); la banda che segue si stacca dai bordi e sale a 38 px (targhetta e margine bianco del nome a 4);
  **`rg-worksheet-block__work`** nella testa, la lavorazione a 28 px in grassetto maiuscolo («RICAMO»),
  eccezione dichiarata al peso 500 dei contenitori. Niente parte e prodotto nel blocco.
- **`rg-worksheet-block__op`**: sottotitolo di operazione nel corpo («Piazzamento»), 14 regolare con filetto sopra.
- **Il valore stampato non tocca la riga**: nel compatto 8 px a sinistra e 6 sotto, mono 14, riga sempre 24;
  nelle celle di tabella 6 px sotto.
- **`rg-part-sheet`** (`__head`, `__title`, `__section`, `__parts`, `__part`, `__part--current`, `__here`,
  `__code`): la pagina della parte, con identità del prodotto, tutte le parti con questa segnata, fasi da
  spuntare a griglia e QR. Apre e chiude la pagina.
- **`rg-qr`** (`__img`, `__caption`, `--small`): contenitore del QR generato dall'app, 104 px (~27,5 mm) o 60
  (~15,9 mm), moduli netti.
- **`rg-fill-field--check`**: casella da spuntare da 24 px (~6,4 mm).
- **`rg-cutout-sheet`** (`__title`, `--single`): il foglio dei tagliandi, due colonne, 32/24 px fra i
  tagliandi; apre e chiude la pagina. La legenda dei coni comprende la spolina: Codice filo · Tipo · Aghi ·
  Metri · Colore.
- **`rg-u-print-a4--head`** (`@page rg-a4-head`, margine superiore 30 mm): lo spazio per l'intestazione di
  pagina stampata dall'app sul PDF; misure in `worksheet-block.md` (fascia 8–24 mm, Helvetica-Bold 11 pt,
  Courier 8 pt, filetto 0,5 pt a 25 mm, QR 16 mm a destra).
- **`--rg-table-wide`** nella griglia: più colonne larghe (`__grow`), se manca vale 1.
- Documenti: `part-sheet.md`, `qr.md`, `cutout-sheet.md` (nuovi); `worksheet-block.md` (sezione *Fascicolo,
  seconda versione* e markup), `fill-field.md`, `cutout.md`, `tables.md`; manifest (tre voci nuove in beta,
  `worksheet-block`, `fill-field`, `table` estese); vetrina `#worksheet-compact-v2`.
- Verificato con `--print-to-pdf` di Chrome in scala di grigi a contrasto spinto su `rg-u-print-a4--head`:
  contenuto a 30 mm, pagina della parte da sola, blocchi con la testa nuova, foglio dei tagliandi su due pagine
  con ogni «Ritaglia» insieme al suo riquadro (primo tentativo: la scritta restava sulla pagina precedente,
  corretto col margine sopra ogni tagliando). Valore a 6 px dalla base e 9 dal filo.

## 1.24.0 — 2026-09-17

**Minor.** Una variante nuova e additiva (`rg-table--grid`), nessuna classe o token rimosso o rinominato,
nessun token nuovo, nessun cambio alle tabelle esistenti. Richiesta come patch 1.23.1: è una variante nuova,
quindi per le regole di questo file è una minor.

### La tabella da compilare a griglia

Prima stampa del fascicolo compatto sulla piattaforma (COCOTTE da 25 a 18 facciate con le schede macchina
dentro). La tabella delle eccezioni per stop, come la indicava la 1.23.0 (`rg-table--compact` +
`td.rg-fill-field--cell`), su carta non funzionava: le righe vuote avevano solo il filo in basso, **nessun
divisore verticale**, e si leggevano come righe da quaderno; le colonne vuote prendevano larghezze diverse
(Stop e Piedino strette, Velocità larghissima) e con `rg-table__grow` sulla Note le altre collassavano a una
parola.

- **`rg-table--grid`**: filetto nero hairline su tutte le celle, testata compresa; `table-layout: fixed`,
  colonne uguali; intestazioni che vanno a capo dentro la colonna. Celle `--cell` da 32 px, 24 (~6,4 mm)
  dentro `rg-worksheet-block--compact`.
- **`rg-table__grow` nella griglia vale il doppio** delle altre colonne; la tabella dichiara quante colonne ha
  con `style="--rg-table-cols: N"` (se manca vale 6). Fuori dalla griglia non cambia.
- Correzione dei documenti: la ricetta delle eccezioni per stop in `worksheet-block.md` passa a `--grid`;
  `tables.md` ha la sezione della griglia e sconsiglia `__grow` da solo su una tabella tutta vuota; manifest
  (`table`, note di `worksheet-block`); vetrina `#cutout` con la tabella a griglia.
- Verificato con `--print-to-pdf` di Chrome in scala di grigi a contrasto spinto: 6 colonne a 703 px da
  103 px e Note da 206, righe da 24 px nel blocco compatto e 33 fuori, divisori su tutte le celle.

## 1.23.0 — 2026-09-17

**Minor.** Classi nuove e additive, nessuna classe o token rimosso o rinominato, nessun token nuovo.
Nessun cambio di comportamento per chi non usa le classi nuove: `rg-worksheet-block` senza `--compact`
resta identico.

### Fascicolo compatto: meno carta, la fase in primo piano

Richiesta dalla piattaforma (fascicolo stampato che va in reparto): COCOTTE (4 parti, 12 fasi) usciva in
17 pagine A4 quasi tutte piene per metà. Lorenzo: *meno carta, la FASE sempre chiara e più evidente del
reparto, spazi da scrivere più piccoli*. Stampa fronte/retro su A4.

- **`rg-worksheet-block--compact`**: righe da scrivere a 24 px (~6,4 mm, erano 32), `--tall` invariata a 48,
  celle `td.rg-fill-field--cell` a 24 px con 2 px sopra e sotto; testa, corpo e piede a 8/12; griglia
  `__fields` a colonne ≥ 128 px in *auto-fill* (i campi non si allargano a tutta la pagina), allineati sul
  fondo, `--tall` sulla fila intera; piede su una riga dove ci sta (Tempo, Operatore, Data `--inline` con
  riga ≥ 64 px, Nota `--inline --tall` per ultima che prende il resto); banda di reparto a 30 px (erano 38:
  trama 16 invariata, margine bianco del nome da 4 a 2); intestazioni di tabella su una riga.
- **`rg-worksheet-block__phase`** e **`__part`**: la testa con la gerarchia fase (20 px, «Fase 2 di 3 ·
  Pressatura») › parte (14 px, «Parte 1 di 4 · FONDO BORDATO») › reparto (12 px sulla banda). Prendono il
  posto di `__index` + `__title`, che restano.
- **`rg-worksheet-part`** (`__title`, `__route`, `__product`): testata di parte in linea che apre una pagina
  nuova e lascia scorrere i blocchi sotto. Sostituisce la pagina-indice per parte. In stampa non apre una
  pagina vuota se è la prima, e un `--long` subito dopo non la stacca dalla sua parte.
- **`rg-cutout`** (`__cue`, `__head`, `__title`, `__meta`): riquadro da ritagliare, tratteggio nero su quattro
  lati, «Ritaglia lungo il tratteggio» scritto sulla linea, mai spezzato fra due pagine. Per la legenda dei
  coni, ultimo figlio del blocco del ricamo.
- **`rg-fill-field--swatch`**: casella quadrata da 40 px (~10,6 mm), contorno nero, per attaccare o segnare
  il colore del cono.
- **`rg-table__grow`**: la colonna che prende il resto (Note, Colore); le altre scendono alla larghezza del
  contenuto.
- **`rg-blank-page`** (`__note`, `--preview`): pagina lasciata bianca per il fronte/retro, solo stampa.
  Chrome non implementa `break-before: recto`: il conto delle facciate lo fa l'app.
- **Eccezioni per stop**: nessun componente nuovo, `rg-table--compact` + `td.rg-fill-field--cell` dentro il
  blocco compatto + `rg-table__grow` su Note. Documentato in `worksheet-block.md`.
- Documenti: `worksheet-block.md` (sezione *Fascicolo compatto*, markup canonico), `worksheet-part.md`,
  `cutout.md`, `blank-page.md` (nuovi), `fill-field.md`, `tables.md`; manifest (voci `worksheet-part`,
  `cutout`, `blank-page` in beta; `worksheet-block`, `fill-field`, `table` estese); vetrina
  `#worksheet-compact` con prima/dopo e fotocopia simulata.
- Verificato con `--print-to-pdf` di Chrome headless su A4 con `rg-u-print-a4`, a colori e in scala di grigi a
  contrasto spinto: la testata apre la pagina, i blocchi scorrono, la pagina bianca porta la parte 2 sul
  recto, basi nere e trame leggibili. Misure a 703 px: riga 24, cella 24, casella 40, piede su una riga,
  colonne Stop · Piedino · Velocità · Ago · PMI da 37–61 px, blocco di pressatura 247 px (~65 mm).
- Limiti: la testa va a capo se fase, parte e prodotto non stanno su una riga; con un'etichetta lunga della
  nota il piede va a capo.

## 1.22.0 — 2026-09-17

**Minor.** Classi nuove e additive, nessuna classe o token rimosso o rinominato, nessun token nuovo.
Un cambio di markup consigliato ma non obbligatorio: le frecce spente passano da `disabled` ad
`aria-disabled="true"` (chi resta su `disabled` continua a funzionare, senza motivo leggibile da tastiera).

### Sequenza di operazioni: aggiunta in basso a destra, gesti a posti fissi, totale

Richiesta: *«il + piazzamento + pressatura hanno bisogno di un'altra gerarchia, non sembra un bottone e
lo metterei a destra in basso invece che a sinistra […] questa cosa delle operazioni incrementali va
studiata bene di interfaccia perché è presente in varie fasi»*. Uno schema per pressatura, forno, stampa
UV, MuchColours e sabbiatura; il ricamo è escluso. Direzione approvata da Lorenzo con le correzioni che
seguono.

- **`rg-operation-sequence`**: contenitore di lista, totale e aggiunta. Estende `rg-operation-row`, non la
  sostituisce: fissa la griglia delle righe (nome 24ch · campi · gesti 193 px, variabile
  `--rg-operation-actions`).
- **Aggiunta** `__add` + `__add-label`: ultima cosa della sequenza, a destra, «Aggiungi in fondo» +
  `rg-button--secondary` con icona per tipo; da quattro tipi un `rg-action-menu`. Scartate: parole a
  sinistra (oggi), menu unico sempre, riga-segnaposto.
- **Gesti sulla riga**: sposta su · sposta giù · duplica | togli, a sola icona con suggerimento, in due
  gruppi; «Nota» esce dai gesti e va in coda ai campi. Scartate: frecce + tre parole (oggi), frecce + menu
  «Altro», gesti solo al passaggio.
- **`rg-operation-row__slot`**: posto vuoto per il gesto che la riga non ha per natura (un'operazione che
  non si ripete). Lo stato invece spegne il bottone col motivo (freccia al bordo, unica obbligatoria).
- **Bottoni spenti con `aria-disabled="true"`**, non `disabled`: restano raggiungibili con Tab e il
  suggerimento col motivo si legge anche da tastiera. `rg-icon-button[aria-disabled="true"]` ha l'aspetto
  di `:disabled` e non reagisce all'hover (neanche `--danger`). Il gesto non parte: il controller annulla il
  click in fase di cattura, il server rifiuta la mossa. Aggiornata anche la regola delle frecce della
  1.20.0 (`operation-row.md`, vetrina `#operation-row`).
- **Senza cadenza e senza costo**: nessun badge «per pezzo»/«per ciclo» sulle righe, nessun marcatore di
  costo né frase sui campi di costo. Le righe col tempo **dichiarato dalla macchina** (cambio piano, pulizia
  della stampa UV) restano fuori dal pattern, nella loro tab.
- **Varianti che convivono sono tipi**: sabbiatura automatica (tempo, pressione, velocità rullo) e manuale
  (tempo, pressione) stanno nella stessa fase, entrambe ripetibili, con tre bottoni di aggiunta insieme
  alla soffiatura. Duplica confermato subito sotto l'originale.
- **`rg-operation-row--off`** + **`__status`**: facoltativa non inclusa, al suo posto, con «Includi».
- **`is-new`** + **`rg-operation-row__new`**: riga appena aggiunta o duplicata, filetto nero a sinistra
  e «nuova»; fuoco sul primo campo, frase in `role="status"`.
- **`__total`** (`-label`, `-formula`, `-value`) e **`__total--incomplete`**: tempo per pezzo sulla
  griglia delle righe, filetto nero della somma; «Non calcolabile: manca …» con «Vai al campo», «—» e
  mai 0.
- Documenti: `patterns/operation-sequence.md` (nuovo), rimando in `operation-row.md`, manifest (voce
  `operation-sequence`, status beta), vetrina `#operation-sequence` (Pressatura M1296, dopo «+
  Pressatura», Stampa UV sezione tecnica con due passate, Sabbiatura automatica + manuale + soffiatura,
  alternative scartate) con il controller di riferimento per `aria-disabled`, «Nota» e `is-new`.
- Verificato in Chrome headless via server locale a 1400 e 600 px: colonna dei gesti 193 px e allineata
  su tutte le righe; a 1400 la riga di una pressata sta su una linea. Limiti: le righe della stampa UV
  vanno a capo; sotto i 680 px i gesti prendono una linea in più per riga.

## 1.21.1 — 2026-09-17

**Patch.** Nessuna classe o token aggiunto, rimosso o rinominato; markup e altezza della fascia invariati.
Cambia il disegno della trama dentro le classi esistenti: sulla scheda stampata allinea la fascia a ciò
che la 1.21.0 ha già rilasciato per la tessera. Chi aggiorna non tocca nulla. Sarebbe una 1.22.0 se si
considerasse la figura della fascia parte del contratto (la riconoscono gli operatori sui fogli): se
Lorenzo la vuole annunciare come novità, il contenuto non cambia, cambia solo il numero.

### Il reparto si scrive in maiuscolo

Richiesta: *«REPARTO e NOME REPARTO sempre scritto in maiuscolo ovunque, schede che interfacce»*. Resta una
patch: nessuna classe o token nuovo, il testo nel markup non cambia (la cassa la dà il CSS).

- **`rg-dept-label`** tutta maiuscola, con spaziatura da etichetta e font identitario: «REPARTO PRESSATURA E
  SOFFIATURA». «REPARTO» (`__kind`) resta a 12 px in grigio etichetta; il nome prende corpo e colore della
  riga (14 nero nella riga del reparto). La riga del reparto resta distinta da «FASE N DI M» per nome a 14 in
  nero, tessera, riga e filetto propri.
- **`rg-dept-band__name`** era già maiuscolo: ora è dichiarato come regola, «Reparto da assegnare» compreso.
- **Regola** in `dept-mark.md` e `dept-band.md`: il reparto si scrive sempre in maiuscolo, preceduto da
  REPARTO dove sta da solo.
- **Elenco fasi** (`steps.md`, vetrina): il reparto nella meta è `rg-dept-label` («REPARTO …»); lì il nome
  sale al grigio etichetta e «REPARTO» scende al secondario, altrimenti la parola pesava più del nome. Vetrina: le
  fasce dei blocchi stampabili scrivono «Reparto …».

### La trama della fascia è la striscia della tessera

Richiesta: *«allinea però i nuovi loghi per essere pattern da usare sulle testate dei reparti nelle
schede»*. Fino alla 1.21.0 la fascia (`rg-dept-band`) aveva figure sue, la tessera (`rg-dept-mark`) un
disegno sui pixel diverso.

- **Le sette trame** sono la striscia della tessera: croce da 6, tondo da 4, piastra 4×4, linea da 2,
  tratto 2, stessa luce; alta 16 sulla mezzeria (y intera), ripetuta col passo del motivo: ricamo 10,
  stampa 12, pressatura 6, strass 6 (fila di mezzo sfalsata di 3), finissaggio 8, incollature 8,
  accoppiaggi 10. «Da assegnare»: nessuna trama.
- **Estremità pulite**: la larghezza della striscia è arrotondata al passo con `round()`; la trama finisce
  sempre con un elemento intero.
- **Vettoriale in stampa**: una fila di pixel = uno strato `repeating-linear-gradient(90deg)` a stop netti.
  Scartate, dopo la prova con `Page.printToPDF` e PDFium a 600 dpi, la maschera SVG e il gradiente a
  tessere ripetute: nel PDF di Chrome diventano bitmap sfocati.
- **Nome e nota** con 4 px di bianco intorno (`outline`): la trama passa sotto e si legge coperta.
- Nuove variabili interne: `--rg-dept-passo`, `--rg-dept-trama` (con `-size`, `-pos`), `--rg-dept-trama-mezzo`
  (con `-size`, `-pos`), `--rg-dept-inset`. `--rg-dept-pattern`/`-size`/`-position`/`-repeat` restano lette.
- Documenti: `dept-band.md` (*La trama è la tessera*); manifest; vetrina (nomi «Reparto …», note
  «Foglio N / M», tavola *La fascia accanto alla sua tessera*).
- Verificato in Chrome headless: sette fasce e «da assegnare» a colori e in fotocopia simulata, DPR 1 e 2
  con zoom nearest-neighbor, estremità su larghezza dispari senza nota, PDF di Chrome rasterizzato con
  PDFium a 150 e 600 dpi. Limiti: la trama pesa meno (16 px su 38); accanto al margine bianco del nome può
  restare visibile uno spicchio di un elemento; incollature e accoppiaggi restano i più chiari in fotocopia.

## 1.21.0 — 2026-09-17

**Minor**: due elementi nuovi (`rg-phase-panel__department`, `rg-dept-label__kind`) e una regola
additiva sulla linguetta (`__title` figlio diretto). Niente di rimosso o rinominato, nessun token. Il
markup 1.20.0 continua a funzionare con lo stesso aspetto; cambia la forma raccomandata.

### Il reparto in una riga sua, e la linguetta essenziale

Giudizio sulla 1.20.0 a schermo: *«così è tutto attaccato reparto e fase […] basta che non sia così
attaccata una all'altra. anche le tab sono un po' confusionarie così. troppe info. per il ricamo
scriviamo Reparto Ricamo. Forse lo metterei ovunque Reparto e quello che è»*.

- **`rg-phase-panel__department`**: la riga del reparto, primo figlio del blocco della fase, prima di
  `__head`. `rg-dept-label` con tessera `--quiet` e «Reparto …», in tondo a 14 px, chiusa da un
  filetto neutro **rientrato** (24 px, 16 sotto i 680 px) che non tocca il contorno del blocco.
  Nessun fondo. La tessera cade sul filo del numero della fase; 16 px fra il filetto e la riga
  «Fase N di M». Scartate l'etichetta a destra (contende la riga ai gesti) e la fascia bassa grigia
  (sotto la linguetta bianca torna a leggersi come la sua base).
- **`rg-dept-label__kind`**: la parola «Reparto» davanti al nome, maiuscola a 12 nel colore
  d'etichetta, con uno spazio vero dopo. «Reparto Ricamo», «Reparto da assegnare».
- **Linguetta essenziale**: numero, titolo, conteggio. `__title` diretto nella linguetta (nuova regola:
  si centra sul numero); ruolo nascosto alla vista in coda al titolo; conteggio come numero nudo in
  `rg-badge--count` con «da compilare» nascosto (lo stesso segno delle tab di sezione); «completa» non
  si scrive; «1 errore» resta a parole. Altezza invariata, graffa e dente fermi.
- **Superati** (restano nel CSS): sulla linguetta `__text`, `__role` visibile, la tessera in `__title`;
  nel blocco `rg-dept-label` come primo elemento di `__kind`.
- Documenti: `phase-switch.md` (*Il reparto in una riga sua e la linguetta essenziale*, con markup e
  migrazione), `dept-mark.md`; manifest; vetrina (gruppo Pressatura + Sabbiatura, tre fasi in
  fotocopia, fase senza gruppo con reparto da assegnare, Ricamo da solo, tavola del segno del reparto).
- Verificato in Chrome headless a 1400 e 600 px: geometria, e nomi accessibili dall'albero di
  accessibilità («3 Sabbiatura e soffiatura finale, collegata 7 da compilare»).

### Le tessere del reparto: trama tagliata, non glifo centrato

Giudizio sulla proposta: *«la x del ricamo messa lì sembra una x per chiudere. non va bene usata
così»*. La tessera 1.20.0 aveva la forma di `rg-icon-button` (contorno da 1, angoli da 2, un segno solo
al centro). Ricontrollate tutte e sette contro lo sprite e i comandi comuni. Nessuna classe cambia; il
markup è lo stesso.

- **Tutte**: niente contorno, angoli vivi, fondo `--rg-color-surface` (nuova variabile
  `--rg-dept-mark-fill`), motivo ripetuto e tagliato dal bordo. «Da assegnare» resta vuota e tratteggiata.
- **`--ricamo`** (era «chiudi»): crocette da 5 in tre file sfalsate a passo 8, tagliate dal bordo.
  Scartate la griglia 3×3 intera, le 2×2, il punto filza e lo zigzag.
- **`--accoppiaggi`** (era «pausa»): coppie di linee da 2, luce 1, passo 10, da bordo a bordo.
- **`--pressatura`** (era una tabella): due file di piastre 6×4 a passo 8 tagliate dal bordo, filo in mezzo.
- **`--strass`** (era un dado): pois da 4 sfalsati a passo 8.
- **`--stampa`** (era «registra · pausa»): gocce e raggi staccati e alternati a passo 10, due linee sotto.
- **`--finissaggio`**, **`--incollature`**: figura invariata, senza cornice.
- Documenti: `dept-mark.md` (*Le sette trame*, tabella prima/si leggeva come/ora). Vetrina: tavola
  «Accanto alle icone», tessere e comandi dello sprite a 1x e 3x.

### Le tessere disegnate sui pixel

Giudizio sulla trama tagliata: *«meglio, ma non mi sembrano così precisi i loghi, vorrei qualcosa di più
pulito»*. Cause a 20 px: gradienti CSS fuori dai pixel, elementi tagliati a metà dal bordo, spessori diversi. La
direzione resta (nessun contorno, trama e non glifo). Classi e markup invariati.

- **Un disegno SVG 20×20 a coordinate intere** per reparto, maschera su `::after`; il colore resta
  `--rg-dept-mark-color` (categoria o `currentColor`). Variabili: `--rg-dept-mark-color`, `-fill`, `-shape`;
  tolte `-pattern`, `-size`, `-position`, `-repeat`, `-edge`, `-cross` (mai rilasciate).
- **Una griglia per tutte**: margine 2 sui quattro lati, campo 16×16, tratto 2, elementi interi e ripetuti.
- Ricamo: quattro croci da 6. Stampa: goccia, raggio, goccia; due linee. Pressatura: tre piastre sopra e
  tre sotto, filo. Strass: otto pois sfalsati. Finissaggio: scacchiera 4×4. Incollature: tre fasce
  diagonali. Accoppiaggi: due coppie di linee. Da assegnare: campo tratteggiato.
- Senza `crispEdges`: a DPR 1 e 2 identico e netto; a 1,25 e 1,5 un filo di sfumatura uniforme, mentre
  `crispEdges` deformava tondi e croci.
- Verificato in Chrome headless a DPR 1, 1,25, 1,5 e 2, con zoom nearest-neighbor dei pixel reali.

## 1.20.0 — 2026-09-16

**Minor**: una classe nuova con le sue varianti (`rg-dept-mark`), un elemento in linea
(`rg-dept-label`), due icone. Niente di rimosso o rinominato, nessun token. Il ramo `ds/dept-mark`
parte da `ds/dept-band-figure` e lo contiene.

### Il segno del reparto, e il blocco della fase senza fascia (ramo `ds/dept-mark`)

Prova a schermo sulla 1.19.0: la fascia grigia `rg-phase-panel__band`, subito sotto le linguette,
**si legge come il bordo delle linguette, non come «reparto»**; e il nome del reparto è già sulla
linguetta. Decisione: a schermo la fascia si toglie, il reparto passa in un segno piccolo. Sul foglio
stampato la banda resta com'è.

- **`rg-dept-mark`** (beta): tessera da 20 px con la figura del reparto **ridotta**, non scalata (a
  20 px la trama della banda si impasta). Sette riduzioni nella stessa famiglia di segno: una croce
  (ricamo); goccia e raggio sopra, due linee sotto (stampa); due piastre sopra e due sotto col filo
  (pressatura); quattro pois (strass); scacchiera 3×3 (finissaggio); diagonali spesse (incollature);
  una coppia di linee sottili (accoppiaggi). **Senza variante** = reparto da assegnare: tessera vuota a
  bordo tratteggiato.
- **`rg-dept-mark--quiet`**: a schermo, sempre. Prende il colore del **testo intorno**
  (`currentColor`), non il `neutral-400` della banda sobria, che a 20 px non regge un segno da 2 px.
- **`rg-dept-label`**: tessera + nome del reparto in linea; la tessera è `aria-hidden`, il nome è testo.
  In linea e non `inline-flex`, così il nome sta sulla linea di base del testo accanto. La tessera
  sporge di 2 px sopra e sotto senza alzare righe da 12/14 px.
- **Linguetta**: la tessera davanti al titolo, dentro `rg-phase-switch__title`, con `role="img"` e
  `aria-label="Reparto: <nome>"`.
- **Blocco della fase**: `rg-dept-label` come primo elemento di `rg-phase-panel__kind`, in nero.
  **Il blocco senza `__band` non ha un modificatore**: la testa torna primo figlio col suo padding
  (16 sopra, 24 ai lati), com'era fino alla 1.18.0. `rg-phase-panel__band` resta nel CSS.
- Stampa: `rg-dept-mark` in `print-color-adjust: exact`.
- Documenti: nuovo `components/dept-mark.md`; `phase-switch.md` (*Il reparto senza fascia*),
  `dept-band.md`. Vetrina: sezione «Segno del reparto» (le sezioni seguenti scalano di un numero), e
  gli esempi del pannello di fase senza fascia, con le tessere.

### Riordinare le operazioni con su e giù (ramo `ds/dept-mark`)

Decisione di prodotto (2026-09-16): le righe della sequenza delle operazioni si riordinano con ↑ ↓,
non con il trascinamento.

- **Icone `rg-icon-sposta-su` e `rg-icon-sposta-giu`**: le frecce di `indietro`/`avanti` ruotate, senza
  base (la base è di `scarica`/`carica`). Il set passa a 36.
- **Forma in `rg-operation-row__actions`**: `rg-icon-button rg-icon-button--full` con `rg-tooltip`
  (sola icona: azione ripetuta su ogni riga, frecce universali, gesto reversibile), in un
  `rg-action-group` proprio prima di Ripeti/Rimuovi. Il suggerimento nomina la riga.
- **Prima e ultima riga**: la freccia che non può muovere è `disabled` e resta al suo posto; il
  suggerimento dice «Già la prima» / «Già l'ultima». Dopo la mossa il fuoco torna sulla stessa freccia.
- Documenti: `operation-row.md` (*Riordinare le righe*), `icons.md`. Vetrina: tavola «Riordinare».

### Le figure del reparto a 48 px (ramo `ds/dept-band-figure`)

**Le figure del reparto a 48 px: niente più cornici.** Sulla pagina di una fase di Pressatura la
fascia `rg-phase-panel__band` «ha l'etichetta ma non il disegno di sfondo che ha il Ricamo»: i due
dorsi pieni della pressatura, ancorati ai bordi, con il contorno del blocco si leggevano come una
cornice.

Da sola sarebbe una patch: nessuna classe nuova o rimossa, nessun token, nessun cambio di markup.

- **`rg-dept-band--pressatura`**: nuova figura, stessa idea. Una fila di piastre (blocchi 16×12,
  luce 8) sopra e una sotto, allineate in colonna, con il filo del materiale da 2 px in mezzo. Alta
  32 px, centrata come il punto croce. Scartate due file di trattini 16×8 (linea tratteggiata doppia).
- **`rg-dept-band--stampa`**: i due registri, prima ancorati al bordo alto e al bordo basso, stanno
  sulla mezzeria. A 32 px non cambia quasi nulla; a 48 px non si aprono più in un bordo sopra e uno sotto.
- **`rg-dept-band--quiet`**: la regola stava prima di `--accoppiaggi`, e la fascia sobria degli
  accoppiaggi usciva a colori pieni. Ora segue le sette varianti.
- Ricamo, strass, finissaggio, incollature: invariati (riempiono la banda o stanno già al centro).
- Regola scritta in `dept-band.md`: mai una figura ancorata ai bordi. Coppia da tenere d'occhio:
  pressatura e finissaggio, entrambe a blocchi, separate per disposizione e non per tono.
- Vetrina: nuova tavola con le sette fasce da 48 px `--quiet`.

## 1.19.1 — 2026-09-16

**Il valore torna attaccato alla sua unità.** Nel campo `rg-field-with-unit` con
`rg-input--numeric`, fra il numero e il riquadro dell'unità restava un buco — `100      mm` — in
ogni campo e sempre della stessa misura. La documentazione prometteva il contrario: *«il campo e il
riquadro dell'unità restano attaccati e non si stirano»*. Trovato nella suite RG Embroidery Tools,
dove era in tutti i 106 campi numerici dei 12 tool.

Nessuna classe, nessun token, nessun cambio di markup: **patch, si aggiorna il pin e basta.**

### Corretto

- **`.rg-field-with-unit .rg-input--numeric { max-width: none; }`** — La causa è un'unità relativa
  risolta due volte in due font. `--rg-input-numeric-width` vale `12ch`, e `ch` è la larghezza
  dello «0» *nel font di chi la usa*: la traccia della griglia (`:has(.rg-input--numeric)`) la
  calcolava nel font del contenitore, il `max-width` dell'input nel suo mono a 14px. Misurato con
  GT America: **traccia 106,8px, input 92,4px, buco 14px**. Ora dentro il campo con unità la
  larghezza la decide la traccia, e l'input — che è un elemento di griglia — la riempie da sé.
  Fuori dal campo con unità il `max-width` resta com'era.
- Vale anche per `rg-field-with-unit--compact`, che usa la stessa variabile.

### Documentazione

- **`components/forms.md`** — il perché scritto accanto alla promessa, così la prossima modifica
  alla larghezza del campo numerico non riapre il buco.

## 1.19.0 — 2026-09-16

**La fascia del reparto in testa al blocco della fase, e «Elimina fase» a icona.** Richiesta di chi
usa la pagina: *«questa componente tutta lunga da destra a sinistra in testa a questa scheda, sopra
proprio il tipo di fase e di eliminare. Ovviamente che sta dentro la scheda stondata. E con il pattern
che ha una altezza e la label centrata alto basso e allineata a sinistra, tutto con lo stesso padding.
Eliminare usa icona come in dash del prodotto»*.

**Minor**: un elemento nuovo e una regola rivista, niente di rimosso, nessun token nuovo.

### Varianti

- **`rg-phase-panel__band`**: la `rg-dept-band` diventa la fascia d'intestazione del blocco della
  fase.
  - Primo figlio del blocco, da bordo a bordo, dentro il contorno arrotondato.
  - Altezza fissa 48 px, trama che la riempie, etichetta centrata in verticale e allineata a sinistra.
  - Stesso padding orizzontale della testa (24 px, 16 sotto i 680 px): l'etichetta cade sul filo del
    numero della fase.
  - Sotto una linguetta del gruppo, angolo alto sinistro vivo.

### Regole riviste (`components/phase-switch.md`, `buttons.md`, `action-group.md`, `dept-band.md`)

- **La fascia a schermo è sempre `--quiet`**: nella pagina della fase convivono badge di stato, e
  `category-3/4/5` sono `danger`, `warning` e `success`.
- **Reparto non assegnato**: la fascia c'è, senza trama, con «Reparto da assegnare».
- **«Elimina fase» a sola icona**, con suggerimento «Elimina la fase N»: si applica a un solo blocco,
  il cestino è universale, c'è sempre la conferma, e sta in un gruppo suo dopo il filetto. Rivede
  «l'azione distruttiva in testata ha il testo» per i gesti nella testa di un blocco.
- **«Torna alla prima lettura» e «Scollega» restano icona + testo**: non hanno un segno universale,
  e le loro conseguenze (perdere le modifiche, cambiare il gruppo) non si indovinano dall'icona.

### Superati

- **`rg-phase-panel__dept`** (il timbro nella testa del blocco) → `rg-phase-panel__band`. Resta nel
  CSS invariato.

### Aggiornamento

1. **Timbro del reparto**: togliere la `rg-dept-band … rg-phase-panel__dept` da `__status` o da
   `__name`, e metterla come primo figlio del blocco con `rg-phase-panel__band`. Sempre, anche
   con «Reparto da assegnare».
2. **«Elimina fase»**: il bottone con testo diventa `rg-icon-button rg-icon-button--full
   rg-icon-button--danger` in `rg-tooltip rg-tooltip--below rg-tooltip--end`, in un `rg-action-group`
   suo; gli altri gesti in un `rg-action-group` prima.
3. **`rg-dept-band`** fuori dal blocco della fase (foglio stampato, legenda) non cambia.

## 1.18.0 — 2026-09-16

**Il documento della fase, e i gesti sulla fase in alto.** Giudizio sulla 1.17.0 provata sul campo:
*«l'hai portata in fondo con elimina, ma non va bene. In realtà non va bene nemmeno quell'oggetto in
cima con il pdf: si rompe subito con i bottoni e non è chiaro per niente. Fai una componente più
elegante e sposta su le funzioni in fondo. Rimetti elimina fase, magari non con quelli ma in cima. E
dove puoi rimetti icone. In sequenza stop rimetti la possibilità di scrivere con il compilatore»*.

**Minor.** Un componente e tre zone nuove, niente di rimosso, nessun token nuovo. Due forme della
1.17.0 sono dichiarate **superate** (restano nel CSS, invariate): `rg-file-card--bar` e
`rg-phase-panel__foot` / `__scope`.

### Componenti

- **`rg-document`** (beta), con `--empty`, `__bar`, `__file`, `__icon`, `__kind`, `__name`, `__reveal`,
  `__options`, `__confirm`: il documento di lavoro di un'entità, in una riga sola.
  - A sinistra tipo («Scheda macchina»), nome del file, tronco coi puntini se manca spazio, e stato.
  - Poi le tre azioni di lettura a sola icona con suggerimento: Visualizza scheda compilata, Scarica
    PDF, PDF caricato così com'è.
  - Dopo un filetto, «Carica un'altra scheda…» con icona e testo.
  - Senza documento, stessa riga, con la primaria «Carica la scheda».
  - Misurata a 1024, 1280 e 1440 px: una riga da 67 px, nome intero.

### Varianti

- **`rg-phase-panel__gestures`**: i gesti sulla fase in alto a destra, nella riga del titolo.
  «Torna alla prima lettura», «Scollega», «Elimina fase», con icona e testo e la conferma.
- **`rg-phase-panel__summary`**: riepilogo a sinistra e stato a destra, su una riga.
- **`rg-phase-panel__document`**: la zona del documento nella testa del blocco, sotto il riepilogo e
  sopra le tab. Una volta sola per blocco.

### Regole riviste (`components/phase-switch.md`, `components/document.md`)

- **«Elimina fase» torna in alto**, nella testa del blocco, separata dalle azioni sul documento.
- **«Torna alla prima lettura» sta coi gesti sulla fase**: non tocca il PDF, cambia i dati della fase.
  Il rischio è scritto nel suggerimento e nella conferma.
- **Il compilatore è la primaria della sezione Sequenza stop**, «Apri il compilatore», con «Parti
  collegate» accanto. Prima era l'ultimo di sei bottoni uguali nella barra.
- **Il documento sta una volta sola**, nella testa del blocco: non si ripete in cima alle sezioni.

### Superati

- **`rg-file-card--bar`** → `rg-document` nella testa del blocco. Misura d'origine: 99 px su due
  righe a 1440 e a 1280 px, con sei bottoni dello stesso peso.
- **`rg-phase-panel__foot`** e **`__scope`** → `rg-phase-panel__gestures`. In fondo a una pagina
  lunga i gesti sulla fase non si trovavano.

### Aggiornamento

1. **Blocco della fase.** Nella testa:
   - aggiungere `__gestures` dopo `__heading`, con i bottoni che oggi stanno nel piede;
   - racchiudere `__meta` e `__status` in `__summary`;
   - togliere il `<footer class="rg-phase-panel__foot">`.
2. **Ricamo.**
   - Togliere l'include della barra da «Scheda macchina» e da «Sequenza stop».
   - Mettere `rg-document` una volta in `rg-phase-panel__document`.
   - In «Sequenza stop» l'intro prende «Parti collegate» e «Apri il compilatore».
3. **Chi non tocca niente** vede la 1.17.0 com'era: le classi superate non cambiano aspetto.

## 1.17.0 — 2026-09-16

**La struttura della pagina, le azioni, l'identità delle parti.** Due tappe di armonizzazione. La
prima riguarda la sola struttura, qui sotto. La seconda, più in basso, porta icone, suggerimenti,
gruppi di azioni, l'identità delle parti e le etichette di sola lettura. Il DS era a v1.16.0 e i
difetti della prima tappa sono stati misurati su `rg-product-platform`:
- la testata di pagina esisteva in quattro forme;
- il percorso c'era in 8 pagine su 21;
- entrando in una fase non si capiva di quale parte e di quale prodotto fosse;
- un aiuto sotto un campo alzava il controllo rispetto ai vicini;
- i bottoni toccavano il bordo del contenitore.

Rilascio **additivo**: nessuna classe rinominata o rimossa, nessun token nuovo o cambiato. Tre
correzioni cambiano l'aspetto di classi esistenti, elencate in *Aggiornamento*.

### Componenti

- **`rg-page-header`** (con `__main`, `__heading`, `__context`, `__headline`, `__title`, `__status`,
  `__subtitle`, `__meta`, `__actions`): una sola testata per ogni pagina di un'app a pagine. Gli slot
  sono, in ordine: percorso, riga di contesto («Fase della parte **1296 DAV…** · **BOOK TOTE**»), H1
  con al massimo tre badge di stato, sottotitolo, meta in mono, zona azioni con al massimo una
  primaria. Sotto i 680 px le azioni vanno sotto il titolo.
  **Regola di navigazione**: il percorso è obbligatorio dal secondo livello in giù, e le pagine di
  primo livello raggiunte dalla topbar hanno solo il titolo. Il contesto è obbligatorio dal terzo
  livello. Mai `rg-topbar__back` e percorso nella stessa vista, e le tab non entrano nel percorso.
- **`rg-form-row`** con **`rg-form-row__actions`**: la riga di campi allineata sulla linea dei
  controlli. Aiuto ed errore stanno sotto il loro campo senza spostare i vicini e senza allargare il
  campo. I bottoni e le scelte della riga stanno sulla linea dei controlli.

### Varianti

- **`rg-toolbar--open`**: la barra senza fondo, sul filo della colonna. È la forma di chi voleva la
  toolbar allineata al testo.
- **`rg-section-card__inset`**: dentro un corpo `--flush`, il blocco che riprende la distanza
  ordinaria dai bordi.

### Correzioni

- **`rg-breadcrumb`**:
  - separatore mai doppio: dentro un `li` il `__sep` è nascosto, e il separatore generato ha testo
    alternativo vuoto;
  - forma canonica `nav` > `ol` > `li` con `aria-current="page"`;
  - link alti 40 px e sottolineati a riposo;
  - AGNext a 14 px al posto del corpo a 12, come ogni navigazione.

  La forma piatta `nav` > `a` + `span.__sep` + `span.__current` resta valida.
- **`rg-toolbar`**: padding orizzontale 16 px. Il fondo bianco sul fondo di pagina è un bordo, e il
  primo e l'ultimo bottone lo toccavano.
- **`rg-section-card--flush` con `rg-steps`**: la sequenza rientra di 16 px per lato, mentre il
  filetto nero sopra e sotto resta da bordo a bordo. Il numero di fase, o la graffa di un
  gruppo, si allinea al titolo della testa.

### Regole

- `design-rules.md` §5: **Distanza delle azioni dal bordo**. Un'azione non tocca mai il bordo del
  suo contenitore:
  - minimo 12 px nelle righe dense, 16 px ai lati delle barre, 24 px nei contenitori di contenuto;
  - su una superficie aperta vale l'allineamento, non la distanza.

### Documentazione

- `components/page-header.md`: nuovo, con la regola di navigazione e la migrazione delle quattro
  testate.
- `components/navigation.md`: sezione *Breadcrumb* vera, con markup, separatore, area cliccabile e
  compatibilità.
- `components/forms.md`: *Riga di campi* (dove va l'aiuto in una riga orizzontale) e *Barra di
  strumenti*.
- `components/section-card.md`: *Corpo a filo e distanza dai bordi*.
- `components/file-card.md`: perché la radice non ha padding, e dove metterla.
- `patterns/appshell.md`, `patterns/settings.md`: la testata è `rg-page-header`.

### Aggiornamento

Sicuro, con tre cambi d'aspetto su classi esistenti:

1. **`rg-breadcrumb`** passa da 12 a 14 px in AGNext, con link sottolineati e riga alta 40 px. Il
   markup attuale non va toccato. Dentro `rg-page-header` si toglie `rg-u-mb-6`.
2. **`rg-toolbar`** rientra di 16 px ai lati. Chi la voleva a filo della colonna usa `rg-toolbar--open`.
3. **`rg-steps` dentro `rg-section-card--flush`** rientra di 16 px ai lati.

`rg-section-header` e `rg-cluster--end` non cambiano.

### Seconda tappa — azioni, icone, identità delle parti

Decisioni dell'utente, entrambe dentro le regole:
1. **Icone**: icona + suggerimento per le azioni frequenti o secondarie; la primaria resta icona +
   testo; nessuna icona senza nome accessibile.
2. **Colore**: un colore d'identità per le **parti** di un prodotto, sempre accanto al nome e con un
   segno non cromatico. Gli stati restano sui colori semantici, e nessun colore fa gerarchia.

Nessun token nuovo. Nuovo file servito: `icons/rg-icons.svg`, che richiede un mount in più nell'app.

#### Componenti

- **Set di icone `rg-icon`** (beta), con `--md` e `--lg`: 34 icone disegnate per RG, nessun codice di
  terzi. Griglia 24, area viva 3–21, tratto 1,5 a capi quadri, colore da `currentColor`. Sostituiscono
  i caratteri e le emoji nei bottoni (🔗 ✎ ⟳ ↓ ← → ✕ ✓ ⚑ ⚠ ⓘ). Nomi per azione: `modifica`,
  `elimina`, `apri`, `apri-esterno`, `aggiungi`, `chiudi`, `salva`, `indietro`, `avanti`, `scarica`,
  `carica`, `stampa`, `documento`, `fascicolo`, `etichetta`, `costo`, `collega`, `scollega`,
  `copia`, `nuova-versione`, `ruota`, `ricarica`, `ripristina`, `filtro`, `togli-filtri`, `ordina`,
  `cerca`, `avviso`, `errore`, `conferma`, `segnala`, `immagine`, `informazione`, `altro`.
- **`rg-tooltip`** (con `__text`, `--below`, `--start`, `--end`): è il nome visibile di un bottone a
  sola icona (`aria-labelledby`), oppure la descrizione di un bottone col testo (`aria-describedby`).
  Senza JS compare a hover e a focus da tastiera, e si può percorrere col puntatore. Escape lo chiude
  con un controller di sei righe, facoltativo.
- **`rg-action-group`**: una fila di azioni affini. Due gruppi consecutivi sono separati da un
  filetto, ed è lì che sta l'azione distruttiva.
- **`rg-action-menu`** (con `__trigger`, `__list`, `__item`): il menu «Altre azioni» su `<details>`,
  solo per azioni secondarie e non distruttive.
- **`rg-part-mark`** (con `--small`), **`rg-part--1…14`**, **`rg-part--quiet`**, **`rg-part-label`**,
  **`rg-part-edge`**: l'identità delle parti di un prodotto.
  - L'app passa l'indice, il DS mette colore e lettera d'ordine.
  - Le prime quattro parti non usano mai i colori che coincidono con uno stato.
  - Dall'ottava parte il colore ricomincia, e la pastiglia vuota e il filetto tratteggiato fanno da
    segno in più. Dalla quindicesima si passa al grigio.

#### Varianti

- **`rg-icon-button--full`**: il bottone a sola icona da 40×40. La base da 34 resta per le liste
  dense.
- **`rg-table__actions`**: la cella delle azioni di riga, a sola icona con suggerimento.
- **`rg-key-value--inline`**, con **`rg-key-value__pair`** e **`__pair--distinct`**: identificativi e
  classificazione in testata. Sostituiscono le etichette fatte a mano con stili inline. La variante
  del proto si distingue con contorno e peso, non col fondo nero. Qui non serviva un componente
  nuovo: sono coppie termine-valore.

#### Correzioni

- **`rg-operation-row`**: le azioni della riga si posano sulla linea dei controlli e non più sul
  piede della riga. La coda della riga diventa `rg-form-row`, e un aiuto o un errore sotto un campo
  non sposta più né i vicini né le azioni.

#### Regole

- `design-rules.md` §4, *Identità delle parti*: assegnazione per posizione, sempre col nome e con la
  lettera, mai gerarchia né stato, grigio dove governano gli stati.
- `design-rules.md` §7: un solo set di icone, nessuna icona senza nome, nessun carattere al posto di
  un'icona.
- `components/buttons.md`, *Icona, testo o entrambi*: quando sola icona, quando icona + testo, quando
  solo testo.

#### Documentazione

- Nuovi: `components/icons.md`, `components/tooltip.md`, `components/action-group.md`,
  `components/part-mark.md` e `icons/README.md` (regole di disegno, provenienza).
- Aggiornati:
  - `components/buttons.md`, `components/lists.md`, `components/tables.md` (azioni in riga);
  - `components/technical-data.md` (variante in linea);
  - `components/operation-row.md`;
  - `integration/fastapi.md` (mount `/ds/icons`).
- `tools/ds-lint.mjs`: fallisce se un doc, un esempio o uno snippet cita un'icona che non c'è nello
  sprite.

#### Aggiornamento (seconda tappa)

1. **Nell'app** aggiungere il mount delle icone:
   `app.mount("/ds/icons", StaticFiles(directory=DS_DIR / "icons"))`.
2. **`rg-operation-row__actions`** si allinea alla linea dei controlli. Senza aiuti né errori non
   cambia niente. Se i campi della riga vanno a capo su più righe, le azioni restano sulla prima.
   Nella coda, `rg-cluster rg-cluster--end` → `rg-form-row`.
3. Tutto il resto è additivo: `rg-icon-button` a 34 px, `rg-key-value` e `rg-key-value--ruled` non
   cambiano.

### Terza tappa — la pagina della fase

Il giudizio sulla pagina del ricamo con le tappe 1 e 2: *«la testata della fase, in questo caso Ricamo
Normale, non è chiara per niente. […] La testata possiamo lasciarla simile e comprimerla, ma poi
ricamo normale va sotto e va fatto capire che è una fase e deve avere qualche cosa che mette insieme il
titolo con quello che c'è sotto. E anche riferimento alla fase: il numero di fase è scomparso»*.

Nessun token nuovo. Due alternative valutate:
- **la testa titolata**, implementata;
- **una linguetta anche per la fase da sola**, scartata: una linguetta sola si legge come una scelta
  senza alternative, e il titolo a 14 px non regge da titolo della pagina.

#### Varianti

- **`rg-page-header--compact`**: testata compressa per le pagine il cui soggetto sta in un blocco sotto.
  Contiene percorso e riga di contesto sul contenitore («Parte · prodotto»), senza titolo visibile e
  senza azioni sul soggetto.
- **`rg-phase-panel`, testa titolata**. È il blocco della fase, lo stesso per il ricamo, per la fase
  generica e per la principale di un gruppo:
  - **`__heading`**, **`__num`**: il numero invertito, lo stesso segno e lo stesso numero di
    `rg-step__num`;
  - **`__name`**, **`__kind`**: «Fase N di M», con la relazione se c'è;
  - **`__title`**: il nome della fase;
  - **`__meta`**, a riga intera: il riepilogo (materiali · stop · fili · origine dei dati).
- **`rg-phase-panel__sections`**: le tab di sezione attaccate sotto la testa, da bordo a bordo.
- **`rg-phase-panel__intro`**, **`__actions`**, **`__subsection`**: le sezioni appiattite, al posto
  delle `rg-section-card` dentro il blocco.

#### Regole riviste (`components/phase-switch.md`)

- **Titolo della fase.** Sta sempre nella testa del blocco. In un gruppo sta anche sulla linguetta,
  che è il comando per sceglierla. Prima: «il titolo non si ripete nel pannello», e per la fase senza
  gruppo «il titolo è l'H1 della pagina».
- **Numero.** C'è sempre, anche con una fase sola.
- **Intestazioni.** Un solo H1: il titolo del blocco se la pagina mostra una fase. In un gruppo l'H1
  sta nascosto nella testata compressa, e ogni blocco ha il suo H2.
- **Section card.** Nessuna nel blocco. La sezione comincia con `__intro`, i blocchi interni sono
  `__subsection`. `rg-file-card`, `rg-table`, `rg-alert` e `rg-disclosure--boxed` sono ammessi.
- **Posizioni fisse.**
  - «Elimina fase» sta sempre nel piede del blocco, anche per il ricamo.
  - `rg-part-edge` sta sulla testata compressa, mai sul blocco.

#### Documentazione

- `components/phase-switch.md`:
  - *La testa titolata (1.17.0)*;
  - l'esempio completo della pagina del ricamo;
  - *Appiattire le sezioni*, la tabella «oggi → nel blocco» per i partial delle tab.
- `components/page-header.md`: *Testata compressa*.
- Vetrina `#phase-switch`: testata compressa e testa titolata negli esempi del gruppo, più il ricamo
  completo.

#### Aggiornamento (terza tappa)

1. **`rg-phase-panel` con la markup della 1.16** (meta nella testa, senza `__heading`) si vede come
   prima. Le classi nuove sono additive.
2. **`rg-phase-panel__meta`** ha ora il separatore con testo alternativo vuoto: nessun cambio a vista.
3. **Pagina della fase nell'app**:
   - la testata passa a `rg-page-header--compact`;
   - il titolo va nel blocco;
   - le `rg-section-card` delle cinque tab del ricamo si appiattiscono secondo la tabella del doc.

### Quarta tappa — numeri delle parti, testata della fase, barra della scheda

Tre cose, dal giudizio di chi usa la piattaforma con le tappe 1–3.

#### Identità delle parti: numeri al posto delle lettere

*«Non sono convinto delle lettere per le parti, preferirei i numeri anche se so che poi vanno in
conflitto con i numeri delle fasi.»* La lettera era arbitraria due volte: non è l'iniziale del nome, e
in reparto nessuno dice «la parte B». Il conflitto col numero di fase si risolve sulla **forma**:

| | Parte | Fase |
| --- | --- | --- |
| Figura | tonda | quadrata |
| Misura | 20 px (16 nel percorso) | 32 px |
| Colore | categoriale | nero |
| Parola | «Parte» | «Fase N di M» |

Nessun cambio di markup: le stesse classi `rg-part--N` producono ora il numero.

#### Testata della pagina della fase, rivista

*«Schiacciata […] vedo due volte dei dati come il nome […] non vedo mai però il codice dell'articolo
[…] tutto troppo attaccato e gerarchie non chiare.»*

- **Respiro**: 12 px fra percorso e identità, 32 px sotto la testata.
- **Niente ripetizione**: il percorso naviga e tiene i nomi; la nuova riga `rg-page-header__identity`
  dichiara il soggetto (la parte) e non ripete il prodotto.
- **I codici dell'articolo** (codice RG, codice prodotto) in `rg-key-value--inline`: in reparto
  l'articolo si chiama così, e prima non comparivano.
- **Gerarchia dichiarata**: percorso 14 px → identità della parte 20 px → titolo della fase 28 px.
- Nuovi elementi: `rg-page-header__identity`, `rg-page-header__subject`, `rg-page-header__subject-kind`
  (la parola «Parte»).

#### Barra della scheda

*«In Sequenza stop […] vedo solo compila scheda. Poi dove invece le schede ci sono, la prima riga dei
bottoni in scheda macchina deve essere uguale a quella di sequenza stop.»*

- **`rg-file-card--bar`**: lo stesso documento richiamato in più sezioni diventa una riga identica, in
  cima a ogni sezione che lo usa, in entrambi gli stati.
  - Con il PDF: nome, badge, Visualizza scheda · Scarica PDF · PDF caricato · Parti collegate · Carica
    un'altra scheda… e la primaria **Compila scheda**.
  - Senza PDF: «Nessuna scheda su questa fase.», Compila a mano e la primaria **Carica la scheda**. Le
    azioni che non esistono si omettono.
- **`rg-file-card__icon`**: l'icona del documento nella riga.
- «Torna alla prima lettura» passa **nel piede del blocco della fase**, con gli altri gesti sulla fase.
- Nella sezione «Scheda macchina» la `rg-file-card` piena sparisce: la barra porta nome, badge, azioni
  e la rivelazione delle opzioni di lettura.

#### Aggiornamento (quarta tappa)

1. **Parti**: nessun intervento, cambiano segno e forma da sé. Solo i testi fissi che dicono «parte A»
   vanno riscritti.
2. **Testata della fase**: la riga `rg-page-header__context` va sostituita da `__identity` con
   `__subject` e i codici; `--compact` da sola dà già il respiro nuovo.
3. **Sezioni della fase**: la barra della scheda va messa in cima alle sezioni che lavorano sul
   documento, e le stesse azioni vanno tolte dall'intro e dalla vecchia `rg-file-card`.

## 1.16.0 — 2026-09-15

**Le fasi collegate.** Una fase principale (una stampa, una pressatura) ha ora 1–3 fasi collegate
subito prima o subito dopo, che si compilano dalla sua pagina. Il giudizio di chi le usa: *«tutto
sembra una fase, poi entri e sei in un'altra fase. Le tab interne sono tutte uguali. E fuori è
difficile capire se ci sono davvero fasi collegate o no»*. Rilascio **additivo**: nessuna classe
rinominata, nessuna rimozione, nessun token nuovo o cambiato.

### Varianti

- **`rg-steps--grouped`, `rg-step--group`, `--group-start`, `--group-end`, `--principal`,
  `rg-step__role`**: il gruppo nella sequenza, **senza annidare `rg-step`**. Tre segnali senza
  colore:
  - una **graffa** nera coi capi chiusi a sinistra dei numeri;
  - un **dente** dalla graffa al numero della principale: le collegate sopra stanno prima, quelle
    sotto stanno dopo;
  - il **ruolo** in testo sopra il titolo.

  Scartate con motivazione: il `<li>` di gruppo con un `<ol>` interno (annidamento, e l'ordine
  letto dallo screen reader non torna); la numerazione 2a/2b (il numero di posizione è un dato, e il
  foglio dice «fase 3 di 4»); la riga-intestazione di gruppo (in una `<ol>` sarebbe una fase finta).
- **`rg-worksheet-block__role`**: lo stesso ruolo sul foglio stampato, con il suo pezzo di graffa. Su
  carta i blocchi di un gruppo possono finire su due pagine, quindi ogni blocco dice il gruppo per
  conto suo.

### Componenti

- **`rg-phase-switch` / `rg-phase-panel`** (beta): la pagina di una fase è un pannello, con testa
  (posizione, relazione, stato del costo, timbro di reparto), sezioni in `rg-tabs` e gesti sulla
  fase nel piede. Se la fase è la principale di un gruppo, sopra il pannello ci sono le linguette
  delle fasi del gruppo: la scelta è bianca e attaccata al pannello, sotto la graffa dell'elenco
  ruotata, con la didascalia «Fasi del gruppo» e il dente sulla principale. Il fondo è il segno della
  scelta e di nient'altro; l'hover cambia bordo e sottolinea. Nel pannello non ci sono card, e il
  titolo della fase non si ripete. Le tab di un controllo sono sorelle dello stesso tipo (NN/g,
  *Tabs, Used Right*). Tablist ARIA con roving tabindex, commutazione client-side in un solo form.

  **Rivisto prima del rilascio.** La prima forma, striscia di segmenti più testa «Stai compilando»
  (`rg-phase-head`), è stata provata in `rg-product-platform` e scartata: *«due cose strane che non
  si capisce se sono fasi o altro»*, *«lo sfondo grigio è uguale al colore degli hover»*.
  `rg-phase-head` non esiste più.

### Correzioni

- **`rg-choice`**: la misura 16×16 vale solo per `input[type=checkbox]` e `input[type=radio]`. Il
  selettore era `input` nudo, e un campo di testo dentro una scelta usciva largo 16 px.
- **Larghezza dichiarata (`rg-field--w4…w24`)**: la misura è del **controllo**. Il campo è largo
  quanto la sua etichetta, mai meno della misura, e l'etichetta non va più a capo sopra i 680 px.
  Fino alla 1.15 «Pezzi per ciclo (n)» andava su due righe sopra una casella da quattro cifre, e la
  riga dei campi perdeva l'allineamento.
- **`rg-dept-band--quiet`**: la figura del reparto in grigio, per lo schermo. Il colore del reparto
  a schermo convive con i colori di stato, e `category-3` è `danger`.

### Documentazione

- `components/steps.md`: sezione *Gruppo di fasi collegate*.
- `components/phase-switch.md`: nuovo.
- `components/worksheet-block.md`: *Ruolo nel gruppo*.
- `components/navigation.md`: *Local tabs* rimanda a `rg-phase-switch` per il livello sopra le
  sezioni.

### Aggiornamento

Sicuro. Chi non usa le classi nuove vede tutto come prima.

## 1.15.0 — 2026-09-04

**La scheda da compilare.** Il giudizio di chi la usa era netto: *«spazi messi a caso, non è una
bella scheda da compilare, ci vuole troppo scroll»*. Il difetto non era estetico. Una sequenza
piatta di `rg-field` dentro una griglia `1fr 1fr` produce tre problemi insieme — tutti i campi
larghi uguale (un tempo da tre cifre occupa mezza pagina), le distanze fra campi e fra gruppi
identiche (e allora non ci sono gruppi, c'è un elenco), e un'operazione da tre campi che occupa due
righe invece di una. Rilascio **additivo**: nessuna classe rinominata, nessuna rimozione, nessun
token cambia valore.

### Perché

Il DS aveva la forma **stampata** della scheda di lavorazione (`rg-worksheet-block`,
`rg-fill-field`, dalla 1.14.0) e la forma in **sola lettura** della sequenza (`rg-steps`). Non
aveva la forma **compilabile**: quella la ricostruivano le app con `rg-parameter-group__grid`, che
è il gruppo di parametri di configurazione — un'altra cosa, con un'altra densità e un altro ritmo.

### Componenti

- **`rg-operation-row` / `rg-operation-list`** — la sequenza di lavoro compilabile. Righe rigate
  su superficie aperta, **testa in colonna** (indice e nome incolonnati, l'occhio scorre la
  sequenza in verticale) e **coda che scorre** (i campi larghi quanto il contenuto, a capo solo
  quando non entrano). Variante `--repeat` per la ripetizione della riga precedente — la stampa in
  composito è due passate, bianco e poi colore.
  Le due decisioni motivate: **non è una `rg-table`**, perché le operazioni non hanno le stesse
  colonne e una tabella porterebbe l'unione dei campi, cioè una matrice quasi vuota dove i buchi si
  leggono come dati mancanti; **non è una card per operazione**, perché cinque riquadri sono cinque
  cornici, più cromo e più scroll per lo stesso contenuto.

### Varianti

- **`rg-field--w4 | --w8 | --w16 | --w24 | --grow`** — la **larghezza dichiarata**. Il numero nel
  nome è il numero di caratteri attesi. La larghezza di un campo è un'affermazione su quanto
  contenuto ci si aspetta, non una scelta estetica: un campo largo mezza pagina per contenere `2`
  chiede a chi compila di ricontrollare di aver capito la domanda. Senza modificatore il campo
  resta fluido, come prima.
- **`rg-field__mark`** — **dichiara una volta, marca molte**. «Questo campo entra nel costo» vale
  per cinque campi su dodici: ripeterlo in un `rg-field__help` sotto ognuno è rumore, e in lettura
  assistita è la stessa frase riletta a ogni campo. L'istruzione di gruppo si dà una volta in testa
  al gruppo e si lega ai controlli con `aria-describedby`; nell'etichetta resta un carattere, non
  un colore.

### Pattern

- **`patterns/worksheet-entry.md`** — la scheda di lavorazione da compilare: le cinque decisioni di
  layout (una colonna di compilazione con campi larghi quanto il contenuto; due gruppi divisi per
  *quando* si compila, non per com'è fatto il catalogo; quando la disclosure aiuta e quando fa
  danno; la sequenza come lista di righe; il costo dichiarato una volta), il comportamento da
  tastiera, e le fonti da cui derivano.

### Documentazione

- **`components/forms.md`** — tre sezioni nuove: *Larghezza dichiarata*, *Marcatore di campo*,
  *Campi numerici: `inputmode`, non `type="number"`*, più *Ordine di tabulazione in una scheda
  lunga*.
- **`type="number"` non è più la forma raccomandata** per un valore che si scrive a tastiera in una
  pagina lunga, e gli snippet sono stati aggiornati a `type="text" inputmode="decimal|numeric"`.
  Quattro difetti documentati dalla ricerca del team GOV.UK Design System: non dettabile con
  Dragon; annunciato da NVDA come *spin button* con due bottoni senza etichetta; arrotondamento ed
  esponenziale sui valori grandi premendo le frecce, **senza annullamento possibile**; lettere
  scartate in silenzio. E il quarto, che è quello che pesa in reparto: **la rotellina del mouse
  cambia il valore** di un campo che ha il focus, mentre una scheda si compila scorrendo.
  `type="number"` resta ammesso per un valore davvero incrementabile con uno stepper.

### Aggiornamento

Sicuro. Nessun consumatore deve cambiare markup: chi non usa le classi nuove vede la pagina
identica a prima. Chi vuole la scheda corretta sostituisce `rg-parameter-group__grid` con
`rg-operation-list` sulle operazioni e aggiunge i modificatori di larghezza ai campi.

## 1.14.1 — 2026-09-03

**La palette categoriale entra nelle regole di design.** La 1.14.0 ha introdotto
`--rg-color-category-1..7` documentandola in `tokens.css`, `components.json` e
`components/dept-band.md` — cioè nei token e in un componente, ma **non in `design-rules.md`**,
che è la Costituzione visiva e il primo documento che il README dice di leggere. Una palette è
un concetto di sistema, non un dettaglio di `rg-dept-band`: chi domani deve colorare sette serie
di un grafico legge §4, ci trova solo permanente e stagionale, e reinventa gli HEX — esattamente
il problema per cui la palette è nata.

Nessun CSS, nessun token, nessuna classe: **patch, si aggiorna il pin e basta.**

### Documentazione

- **`design-rules.md` §4** — la palette categoriale, i suoi tre vincoli (mai stato/azione/
  navigazione/focus; mai unico segnale; nessun colore nuovo nel brand, solo alias) e il rimando a
  `dept-band` come applicazione di riferimento.
- **La sovrapposizione con gli stati, scritta dove si legge.** `category-3/4/5` *sono*
  `danger/warning/success`: categorie e stati non si mescolano nella stessa vista senza una
  ragione dichiarata. Il vincolo esisteva già nel commento di `tokens.css`, dove però lo trova
  solo chi apre i token.
- **Il tetto di sette, e perché.** Una categoria in più chiede un segno in più — una trama, una
  figura — non un colore in più: oltre il settimo la distinzione non regge in scala di grigi né
  in fotocopia, che è come queste schede vengono lette davvero. Generalizza a regola di sistema
  il terzo limite dichiarato in `dept-band`.

## 1.14.0 — 2026-09-03

**La carta entra nel design system.** Tre componenti nuovi e una palette nuova per un caso che il
DS non copriva: le **schede di lavorazione** che oggi sono cartacee. Un prodotto ha più parti, ogni
parte ha più fasi, ogni fase appartiene a uno dei sette reparti; i fogli escono dalla stampante,
vanno in reparto, l'operatore ci scrive sopra a penna i valori mancanti, e tornano all'ufficio
prodotto. Rilascio **additivo**: nessuna classe rinominata, nessuna rimozione, nessun token
esistente cambia valore. Si sale e basta.

### Perché

Nei 36 componenti della 1.13.0 non c'era niente per un documento stampato. C'erano `.rg-u-no-print`
e un `@media print` che toglieva topbar e sidebar — cioè il minimo per non stampare il chrome — e
nient'altro. Tutto quello che riguarda la carta mancava, e mancava in un modo che ogni prodotto
avrebbe risolto in locale, ognuno a modo suo:

1. **Nessuna unità di stampa.** Un elenco di fasi stampato senza regole di paginazione si spezza
   dove capita. In reparto il retro del foglio non lo gira nessuno: **mezzo blocco è peggio di
   mezza pagina bianca**. E l'altro errore era simmetrico — dare una pagina intera a ogni fase,
   quando la maggior parte delle fasi ha poco da dire, vuol dire sprecare carta.
2. **Nessun modo di dire "questo foglio è di quel reparto"** che sopravviva alla fotocopia. Il
   foglio viene quasi sempre copiato in bianco e nero: qualunque codifica affidata al solo colore
   arriva in reparto già persa.
3. **Nessun campo da compilare a mano.** È il caso centrale: la scheda esce con dei buchi
   **apposta**, e in tutto il DS non c'era niente che facesse sembrare un buco *voluto* invece che
   un errore di rendering o un dato non caricato. `rg-field` non serve: ha input, focus ed errore,
   cose che su un foglio di carta non esistono.
4. **Nessuna palette per distinguere sette cose pari-ordinate.** C'erano quattro colori di *stato*
   (che hanno un significato) e quattro accenti stagionali (di cui tre usabili). Chi doveva
   distinguere sette reparti — o sette serie di un grafico, o sette layer — finiva per inventare
   HEX in locale.

### Aggiunto

**`rg-worksheet-block` — blocco di lavorazione stampabile** ([doc](components/worksheet-block.md)).
Un blocco = una fase. Due decisioni portano tutto il resto: **non occupa una pagina intera** (i
blocchi si impaginano uno dopo l'altro, il blocco non dichiara nessuna altezza) e **non si spezza
mai fra due pagine** (quello che non entra scende intero alla pagina dopo). Variante
`--long` per la fase con la tabella di trenta righe, che una pagina se la prende tutta: apre una
pagina nuova invece di lasciarsi dietro un buco, e se è il primo blocco non lascia una pagina vuota
prima. Il riquadro è un'eccezione dichiarata a §6: su carta fa il lavoro che a schermo fa l'hover.

**`rg-dept-band` — banda di reparto** ([doc](components/dept-band.md)). **Tre segnali ridondanti**,
sempre tutti e tre, perché il colore è quello che si perde per primo: **(a)** il colore del
reparto, acceleratore per trovare il foglio nel mucchio; **(b)** il nome in maiuscolo sulla banda,
che è *contenuto del markup* e non `content:` generato; **(c)** la **figura**, l'unico dei tre che
sopravvive intatto alla scala di grigi.

Il criterio della figura è arrivato dal reparto e ha cambiato il componente: non
**distinguibile**, ma **riconoscibile**. Sette trame geometriche qualsiasi si distinguono — e poi
vanno imparate a memoria. Una trama che evoca il lavoro del reparto si riconosce al primo colpo, e
chi pesca il foglio dal mucchio non deve ricordarsi che il tratteggio a 45° era la stampa. Quindi:
**pois** per gli strass (sono strass), **punto croce** per il ricamo, **due registri** per Stampa,
Laser e HF (in alto gocce d'inchiostro e punte di laser alternate, in basso due linee: i mestieri
sono due e la figura li nomina entrambi), **le due piastre** per la pressatura, **bandiera a
scacchi** per il finissaggio (il traguardo: è l'ultimo reparto), **strisciate di spalmatura** per le
incollature, **due linee appaiate** per gli accoppiaggi.

Regola derivata: due reparti non stanno mai nella stessa **famiglia di segno** — croci, due
registri, dorsi, pois, scacchiera, diagonale, coppie. E una famiglia non la fondano né il **verso**
(una diagonale a 45° contro una a −45°, dopo una fotocopia e a dimensione di banda, è la stessa
cosa) né il **tono** (due figure fatte di barre verticali si somigliano anche se una è scura e
l'altra chiara).

**`rg-fill-field` — campo da compilare a penna** ([doc](components/fill-field.md)). La riga è una
**staffa a L**: dice dove inizia e dove appoggia la scrittura, cosa che uno spazio vuoto non fa e
che un rettangolo pieno direbbe male. La base è **nera** — è la riga su cui si scrive, deve
sopravvivere alla fotocopia e come oggetto grafico essenziale vuole almeno 3:1, mentre
`--rg-color-border-medium` su bianco si ferma a ~2,8:1; il tratto verticale sinistro resta
intermedio. L'altezza è quella della **mano**, non quella di una riga di testo: 32 px (~8,5 mm),
48 px con `--tall`. Varianti `--tall`, `--inline` e `--cell` per la forma «riga di tabella con
celle vuote da riempire»: trenta righe da riempire sono una tabella, non trenta campi.

**Palette categoriale `--rg-color-category-1…7`.** Sette valori pari-ordinati per distinguere
categorie fra cui non esiste gerarchia. **Nessun colore nuovo entra nel brand**: sono alias di
valori già in palette, e l'alias serve a dichiarare che lì il valore vale come *categoria* e non
come *significato*. Vincoli scritti nel token: mai per stato, azione, navigazione o focus; mai
unico segnale.

**Stampa, in `rg-utilities.css`** — l'unico `@media print` del DS, **esteso e non duplicato**:
regole di paginazione dei blocchi (con le proprietà legacy `page-break-*` accanto a quelle moderne,
perché i motori PDF server-side non le implementano tutte), `print-color-adjust: exact` sulla banda
(senza, il browser butta via gli sfondi e la banda perde due segnali su tre), e la geometria di
pagina **opt-in** `@page rg-a4` + `.rg-u-print-a4`. Il formato è un fatto del documento, non di un
componente: imporlo a tutti i prodotti vorrebbe dire decidere al posto di chi stampa una tabella in
orizzontale.

### Eccezioni dichiarate (regole §12)

- **Il riquadro del blocco** — §6 dice di non incorniciare tutto. Ambito: documenti stampati; su
  carta il riquadro è ciò che rende il blocco separabile dal successivo.
- **La trama della banda** — è un `repeating-linear-gradient` a stop netti, e §2 vieta i gradienti
  *decorativi*. Qui la campitura **porta informazione**, ed è l'unica delle tre che sopravvive alla
  fotocopia.
- **I millimetri di `@page`** — la scala di spazio del DS è in px e non descrive un foglio di
  carta. La misura è fisica solo lì, e solo lì è in mm.

### Limiti noti

- Un `rg-worksheet-block--long` che **sfora comunque** il foglio si spezza fra righe con
  l'intestazione della tabella ripetuta, ma **la banda di reparto non si ripete**: la pagina di
  continuazione perde il segnale di reparto. Non è risolvibile in CSS. Una fase che produce più di
  una pagina di tabella va spezzata a monte in due blocchi, ciascuno con la sua banda.
- `--rg-color-category-3/4/5` valgono quanto `danger`, `warning` e `success`. Su una scheda
  stampata non c'è nessun colore di stato accanto e il nome è scritto sulla banda, quindi una banda
  rossa non si legge come «errore». In una vista **a schermo** dove convivono alert e badge di
  stato, quella lettura va decisa prima.
- Le sette varianti di `rg-dept-band` portano il nome dei sette reparti RG: è un accoppiamento
  all'organigramma, dichiarato. Un ottavo reparto è un'ottava variante nel DS — con una figura di
  una **famiglia di segno non ancora usata**, altrimenti il criterio decade; la mappa reparto →
  variante vive nell'app.
- `rg-dept-band--stampa` è la figura più stretta: i due registri stanno in ~30 px di area utile
  **senza margine**. Se la banda si abbassa è la prima che si impasta, e va rifatta, non compressa.
- Le figure valgono per **questi** sette mestieri. Un prodotto RG che dovesse usare la banda per
  categorie non-manifatturiere non erediterebbe nessuna evocazione: lì la palette categoriale resta
  valida, il repertorio di figure no.
- `rg-fill-field` non è un controllo: in lettura assistita porta la sola etichetta, perché non c'è
  nessun campo da annunciare. È coerente col supporto, ed è la ragione per cui la versione a
  schermo della stessa scheda **deve** usare `rg-field`.

### Migrazione

Nessuna. Additivo puro: nessun markup esistente cambia. L'unica nota per chi stampa è che
`rg-utilities.css` non è più omettibile in un prodotto che produce documenti: la paginazione vive lì.

## 1.13.0 — 2026-09-01

**Revisione di fondazioni: gerarchia.** Solo token e tipografia — nessun componente nuovo, nessuna
classe rinominata, nessuna rimozione. La superficie di consumo resta invariata: **i prodotti non
devono toccare una riga di markup**.

### Perché

Il DS produceva interfacce piatte: in una vista tipica tutti i contenitori e tutti i titoli si
leggevano allo stesso livello. Non era una questione di gusto, erano sei strumenti mancanti,
misurati sugli stili calcolati del CSS 1.12.0.

1. **Nessun titolo dichiarava il proprio peso.** `.rg-h1/.rg-h2/.rg-h3`, `.rg-card__title`,
   `.rg-section-card__title` non avevano `font-weight`: arrivava dallo user-agent. Poiché nella
   documentazione le classi stanno sempre su `<h1>`–`<h3>` (14 occorrenze su 14), uscivano
   **tutte a 700** — titolo di pagina 28/700, titolo di section card 20/700, sotto-sezione 20/700.
   Il peso non portava informazione, e la stessa classe su un `<p>` sarebbe uscita a 400.
2. **Scala compressa.** `rg-h3`, `rg-card__title`, `rg-section-card__title` e `rg-step__title`
   erano tutti a 20 px: i gradini realmente in uso erano 28 → 20 → 14.
3. **Corpo sotto le regole.** `rg-core.css` fissava `body { font-size: 14px }` mentre
   `design-rules.md` §3 prescrive body 16/24 e `.rg-body` usava già 16: il corpo coincideva con
   lo *small*.
4. **Due sole superfici, usate senza regola.** Bianco e neutral-50, 21 dichiarazioni di fondo
   bianco contro 14 neutre in `rg-components.css`. Una card bianca su pagina bianca era separata
   dal solo `--rg-color-border` (#dededa, **1,35:1** di contrasto): il contenitore non si vedeva.
5. **Nessun gradino di linea intermedio.** Fra il filetto neutro e il nero pieno non c'era nulla:
   per `rg-card`/`rg-section-card` il bordo forte esisteva solo legato a un *significato*
   (`--technical`, `--selected`), mai alla sola prominenza.
6. **Ritmo sotto le regole.** `.rg-section` aveva 32 px di padding, la stessa misura che §5
   assegna alla separazione fra *gruppi*; per le *sezioni* prescrive 48–96 px.

La revisione non inventa un idioma nuovo: **`rg-workspace` aveva già tre livelli di superficie**
(pannello bianco, stage neutro, canvas bianco con filetto nero) quando il resto del sistema ne
usava due a caso. Qui si generalizza al resto del sistema ciò che il workspace faceva già bene —
e infatti il workspace ne esce senza un pixel cambiato, a parte il titolo di gruppo.

### Nuovi token

- **`--rg-weight-heading`** (= `--rg-weight-bold`, 700) — il peso del livello di pagina/sezione,
  dichiarato dal DS invece che ereditato dall'elemento ospite.
- **`--rg-color-surface-raised`** (= bianco) — la superficie **sollevata**: è lì che vive il
  contenuto.
- **`--rg-color-border-medium`** (= neutral-400) — il gradino di linea **intermedio**: porta il
  contorno di un contenitore generico a ~2,8:1 su bianco senza spendere il nero, che resta
  riservato all'enfasi e agli stati.

### Token modificati

- **`--rg-color-background`**: bianco → **neutral-50**. La pagina diventa fondo, non superficie di
  lettura. `body` ora legge questo token (prima usava `--rg-color-white` letterale, quindi il
  token semantico non governava nulla).
- **`--rg-color-surface`**: neutral-50 → **neutral-100**. È la superficie **rientrante** dentro una
  sollevata, non un secondo fondo pagina.

### Nuove varianti

- **`rg-card--emphasis`** e **`rg-section-card--emphasis`** — dicono quale contenitore è il
  **soggetto della vista**: contorno nero, e per la section card anche la testa su superficie
  rientrante. Non sono stati e non hanno significato semantico. **Una sola per vista**: se tutto
  è enfatizzato niente lo è, ed è esattamente il difetto di partenza.

### Cosa cambia a video

- Titoli: `rg-h1`/`rg-h2`/`rg-section-header__title` restano a 700 ma ora **per dichiarazione**;
  `rg-h3`, `rg-card__title`, `rg-section-card__title` scendono a **500**. La differenza fra
  livello di pagina e livello di contenitore diventa visibile.
- Corpo del testo da 14 a **16 px**. Restano a 14 **per dichiarazione propria** i controlli
  (nativi via `rg-core.css`, più `rg-button`, `rg-toggle`, `rg-choice`, `rg-disclosure__trigger`),
  la navigazione (`rg-sidebar-item`, `rg-topbar__nav`, `rg-topbar__back`) e il dato denso
  (`rg-table`, `rg-list-row`, `rg-key-value`): chrome e dato non sono testo corrente, e senza
  queste righe sarebbero cresciuti insieme al paragrafo. È il 16 a essere «nuovo»: a video crescono
  solo il testo di lettura (corpo di card, di section card, di modale, alert, stati vuoti) e il
  titolo di gruppo del pannello.
- `rg-card`, `rg-section-card`, `rg-list-row`, `rg-table` e i gruppi di form salgono a superficie
  sollevata; `rg-topbar--app` e `rg-sidebar` la dichiarano esplicitamente in quanto **chrome**.
- `.rg-section` passa a 48 px di ritmo, `.rg-section-header` a 32 px di stacco;
  `rg-param-section__title` da 14 a 16 px.

### Note di migrazione

- **Nessuna azione richiesta nei prodotti**: nessuna classe o token è rimosso o rinominato,
  l'ordine di import non cambia, il markup non si tocca. Da qui il **minor**. Ma il valore di due
  alias semantici cambia: prima di spostare il pin, **rileggere una vista** — in particolare le
  superfici che un prodotto avesse dipinto in locale con `neutral-50`, che ora coincidono con il
  fondo di pagina.
- Una superficie aperta e rigata (`rg-consumption-row`, `rg-materials-row`, `rg-steps`,
  `rg-disclosure`) va posata **su una superficie sollevata**, non direttamente sul fondo: i suoi
  hover chiari presuppongono il bianco sotto. Regola scritta in `design-rules.md` §6.
- **Limite noto**: il livello di peso 500 richiede un medium reale. Senza i font ufficiali
  caricati, il fallback Arial non ha un medium e il browser arrotonda 500 a 400: sulle macchine
  senza i font RG la distinzione 700/500 si assottiglia. Non è una regressione introdotta qui
  (vale già per `rg-step__title`, `rg-list-row__title`, `rg-modal__title`), ma la gerarchia non è
  mai affidata al solo peso: reggono anche corpo, superficie e linea.

### Documentazione

- `design-rules.md` §3: la tabella dei **pesi per livello**. §6: la regola **«quale superficie a
  quale profondità»** — è la regola che mancava e che aveva prodotto i 21 fondi bianchi contro
  14 neutri.
- `components/cards.md` e `components/section-card.md`: la variante `--emphasis` con il limite
  d'uso; `patterns/dashboard.md` e `patterns/workspace.md`: la profondità delle zone.
- Intestazione di `tokens.css` riallineata (era ferma a `v1.10.0`) e `meta.version` di
  `tokens.json` allineato alla versione del DS.
- `integration/streamlit-bridge.css` e `integration/streamlit-config.toml`: la colonna di
  contenuto Streamlit è dichiarata **sollevata** (resta bianca come prima) e la sidebar scende a
  neutral-100. Senza questa riga la pagina sarebbe diventata neutra con il contenuto posato
  direttamente sul fondo — il contrario della regola. `secondaryBackgroundColor` del tema nativo
  passa da `#f7f7f5` a `#efefec`: i progetti che hanno copiato `config.toml` devono **ricopiarlo**.

## 1.12.0 — 2026-07-29

Componente **`rg-file-card`** (documento caricato): oggetto **generico e riusabile** per «questa
entità ha un file caricato», additivo — **aggiornamento sicuro**. Nasce nel monorepo RG-PRODUCT-SUITE
per sostituire il documento fatto a mano (doppio titolo, paragrafo di troppo, controlli d'upload
sciolti), ma non è legato a un dominio: gli slot sono dell'app.

### Nuovi

- **`rg-file-card`** (componente) — due stati e una rivelazione progressiva.
  - **`rg-file-card--loaded`** (CARICATO): card compatta con **un solo titolo** = il nome del file
    (`rg-file-card__title`, mono, troncato con ellissi ma leggibile per intero via `title`/testo),
    uno slot badge (`rg-file-card__badges`) e uno slot azioni (`rg-file-card__actions`). Nessun
    secondo titolo, nessun paragrafo esplicativo.
  - **`rg-file-card--empty`** (VUOTO): la superficie aperta di `rg-empty` con **una sola azione
    primaria**.
  - **Rivelazione progressiva**: `rg-file-card__reveal` parte con `hidden` e contiene
    `rg-file-card__options` (opzioni di lettura, slot app) + `rg-file-card__confirm` (conferma, slot
    app); compaiono **solo dopo** che un file è stato scelto — nascosti davvero, non solo alla vista.
    Fonte di verità = `[hidden]` su `__reveal`, pilotato dall'app (al `change` del picker: nome nel
    titolo + `reveal.hidden = false`; su conferma/Ripristina torna a `true`).
- Il picker **non è rifatto**: è il meccanismo di `rg-file-input` (solo `rg-file-input__control`),
  con il bottone riportato a larghezza automatica dentro la card. Composto anche con `rg-badge` e
  `rg-button`. Nessun token nuovo.

## 1.11.0 — 2026-07-29

Utility **opt-in** per applicare il colore-label leggibile a micro-label «libere» (fuori da un
componente), senza `color` inline. Una classe, additiva — **aggiornamento sicuro**.

### Nuovi

- **`rg-u-text-label`** (utility) — applica `--rg-color-text-label` (neutral-800, ~14,8:1) a una
  micro-label libera, es. «MATERIALI IN APPOGGIO». **Opt-in**: NON è legata a `.rg-label`, che
  eredita il colore dal contesto e deve restare adattiva alle superfici scure (legare il token la
  renderebbe invisibile su fondo scuro). Da usare su superficie chiara.

## 1.10.0 — 2026-07-29

Mattoni per il **layout canonico della fase**: il contenitore-sezione di ogni tab, la convenzione
della colonna «Qtà», la riga dei materiali e la leggibilità delle micro-label. Additivo, tranne il
fix di contrasto (colore, non struttura) — **aggiornamento sicuro**.

### Nuovi

- **`rg-section-card`** — contenitore-sezione keystone di ogni tab: card con **header rigato**
  (titolo + didascalia opzionale + al più UNA `rg-button--primary` a destra) e corpo. Variante
  `--flush` per un corpo-tabella a filo dei bordi. MATCH: non `rg-card` (tessera di griglia), non
  `rg-section-header` (layout di pagina), non `rg-disclosure--boxed` (sezione richiudibile).
- **`rg-materials-row`** — riga che rende evidenti **presenza e numero** dei materiali di una fase
  (badge di conteggio + elenco con codice mono), con stato vuoto esplicito.

### Convenzioni

- **Colonna «Qtà»** (`components/tables.md`): regola unica — unità nell'header quando uniforme
  (`Qtà (m)`), per riga con `rg-table__unit`; il valore resta `rg-table__numeric`. Le tabelle
  smettono di divergere fra tab.

### Fix

- **Contrasto delle micro-label**: nuovo token `--rg-color-text-label` (neutral-800, ~14,8:1)
  applicato a `rg-modal__meta`, `rg-modal__row-label`, `rg-param-section__index`, `rg-card__eyebrow`
  — prima a neutral-600 (~6:1, tecnicamente AA ma deboli a ≤10px). Solo colore, nessun peso nuovo.

### Migrazione (consumatore)

- `fase`/`_tab_consumi` adottano `rg-section-card`, applicano la convenzione «Qtà» e i `<style>`
  residui spariscono; il `<dialog>` nativo converge su `rg-modal`. Edit lato product-platform.

## 1.9.0 — 2026-07-29

Modale canonica e riga di tabella espandibile — i due gap dell'audit «revisione-percorso». Additivo:
un token z-index, una variante di larghezza, una variante di riga; nessuna rimozione — **aggiornamento
sicuro**.

### Nuovi

- **`rg-modal--xl`** (960px) — modale larga per un confronto affiancato o una tabella. Tetto
  dichiarato: oltre, il contenuto è una pagina, non un modal.
- **`rg-table__row--expandable` + `rg-table__detail`** — riga-record che rivela in loco la propria
  scomposizione (una `<tr>` di dettaglio con `<td colspan>` su tutte le colonne), preservando la
  semantica tabellare. MATCH motivato: non `rg-step` (sequenza numerata) né `rg-disclosure` (sezione
  di pagina).
- **`--rg-z-lightbox`** (450) — nuovo livello z fra `--rg-z-modal` (400) e `--rg-z-toast` (500): un
  lightbox aperto dentro una modale ora ci sta **sopra** invece che dietro. `rg-lightbox` aggiornato
  (prima era a `--rg-z-overlay`, 300). Mezzo-passo additivo: nessun altro overlay si sposta.

### Canonizzazione

- `rg-modal-*` dichiarato **pattern unico** per le modali; il `<dialog>` nativo è deprecato come
  pattern, con **guida di migrazione** in `components/modal.md` per il consumatore.

## 1.8.0 — 2026-07-27

La mappa colore→ruolo impara a portare un **controllo per-riga** e nasce la forma **compatta** del
campo con unità. Additivo: due classi nuove, nessun token, nessuna rimozione — **aggiornamento sicuro**.

### Nuovi

- **`rg-color-map__aside`** — slot in coda a una riga di `rg-color-map`, allineato a destra, per un
  controllo che appartiene a quel colore (densità per-colore, override numerico, azione di riga). La
  terza colonna nasce solo se lo slot c'è: le mappe che non lo usano restano identiche.
- **`rg-field-with-unit--compact`** — forma compatta del campo con unità (~6.5ch, box unità ridotto),
  per una riga densa dove il campo è un accessorio. Da usare con `rg-input--numeric`; etichetta non
  visibile ma in `aria-label` (nomina il colore, dichiara unità e comportamento del vuoto).

## 1.7.0 — 2026-07-23

Il pannello di una tool impara **due archetipi di testa** e una regola d'accordion, così tool diverse
restano leggibili allo stesso modo. Solo regole e documentazione: nessun token, nessuna classe nuova,
nessuna rimozione — **aggiornamento sicuro**.

### Regole (`patterns/workspace.md`)

- **Ordine canonico, testa A vs B** (aggiorna la regola 1.5.0). La testa si apre con la *radice della
  catena di dipendenze*, scelta da una domanda: la misura del prodotto nasce dalla sorgente importata o
  è una decisione indipendente del tool? **Testa A** (sorgente-guidata, es. net-45): `Sagoma` con scala
  e misura reale → `Colori e ruoli`, senza un `Formato` separato. **Testa B** (formato-guidata, es.
  oblique/pattern-grammar): `Formato e scala` in cima → `Sagoma` (ritaglio opzionale) → `Colori e
  ruoli`. In entrambe: i gruppi del tool nel loro ordine, poi la coda fissa `Esportazione` e `Preset`.
- **Accordion.** La testa non si richiude mai (è l'ancora che non sparisce); corpo e coda sì. Default
  senza memoria: testa aperta, corpo tutto aperto se ≤ 5 sezioni, altrimenti solo il primo gruppo del
  corpo; coda chiusa. Lo stato aperto/chiuso si ricorda per tool.

### Vetrina

- Sezione 21 «Pannello di una tool — ordine canonico e accordion»: esempio di tool formato-guidata
  (testa B) con le sezioni richiudibili.

## 1.6.0 — 2026-07-22

Il **pannello di configurazione** diventa un pattern e il campo di un form impara due cose che il
DS dichiarava e non implementava. `rg-product-platform` doveva costruire i "Default costo ricamo"
(tariffa, velocità, tempi per operazione) e ha trovato tre buchi: `forms.md` elencava `read-only`
fra gli stati obbligatori ma nessuna riga di CSS lo rendeva, un campo numerico si stirava per tutta
la cella anche quando conteneva `1`, e il gruppo di parametri esisteva nel CSS e in vetrina dal
seed ma non nel registro — quindi per l'agente non esisteva. Nessun token nuovo, nessuna rimozione:
**aggiornamento sicuro**.

### Nuovi

- **`[readonly]` come stato reale dei campi** — `rg-input`, `rg-textarea`, `rg-search` e
  `rg-select[aria-readonly="true"]` hanno una superficie propria: fondo tecnico, bordo neutro,
  nessuna affordance in hover, **testo a pieno contrasto**. Read-only e disabled smettono di essere
  sinonimi: *disabled* = "non attivo ora, non inviato"; *read-only* = "valido, ma non modificabile
  da te", leggibile, selezionabile e nel tab order. Corollario documentato: il motivo si scrive
  accanto al form con `rg-alert`, e l'azione primaria che l'utente non potrà mai eseguire **si
  omette**, non si disabilita.
- **`rg-input--numeric`** — la forma del valore misurato: mono, cifre tabulari, allineato a destra
  e largo `--rg-input-numeric-width` (default `12ch`) invece che quanto il contenitore. Dentro
  `rg-field-with-unit` il riquadro dell'unità resta attaccato al campo. Sostituisce la composizione
  `rg-input rg-mono` nei campi numerici; quella resta valida per il testo tecnico (codici, ID).

### Registro

- **`control-group`** entra in `components.json`: `rg-parameter-group` + `__grid`,
  `rg-filter-group`, `rg-action-bar`, `rg-confirmation`. Il CSS c'era dal seed, il MATCH no.
  È la risposta a "form di configurazione a coppie etichetta/valore" quando i valori sono
  **editabili**; se sono di sola lettura il componente resta `rg-key-value--ruled`.

### Documentazione

- Nuovo `patterns/settings.md`: pagina di configurazione completa — provenienza dei valori
  dichiarata in testata (catalogo / valori di fabbrica), unità accanto a ogni campo, valori per
  riga in `rg-table`, esito con `role="status"` / `role="alert"`, stati sola lettura e sorgente
  non disponibile, e la trappola del `type="number"` con la virgola decimale.
- `components/forms.md`: sezioni "Campo numerico", "Sola lettura" e "Gruppo di parametri".
- Vetrina: sezione 04 con numerico e read-only affiancato a disabled; sezione 11 con il pannello
  di configurazione completo, la sua variante in sola lettura e lo stato di indisponibilità.

## 1.5.0 — 2026-07-22

Il **pannello di una tool** smette di essere composizione libera e prende un ordine. Con due tool
live nella suite `rg-embroidery-commons` (`net-45`, `pattern-grammar`) è emerso che gli stessi
argomenti stavano in posti diversi: il caricamento della sagoma era la sezione `01` in uno e stava
sepolto dentro il gruppo `05` nell'altro; la selezione per colore era `02` in uno e una riga persa
in fondo nell'altro. Difetto del DS, non delle app: il pattern `workspace` descriveva il guscio e
non diceva nulla su cosa mettere dentro il pannello, né in che ordine. Nello stesso vuoto le due
app avevano riscritto in locale, identici, il caricamento file e la mappa colore→ruolo. Nessun
token nuovo, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-file-input`** — caricamento file nella forma **compatta**, da riga di form: bottone a
  piena larghezza e riga di stato obbligatoria che dichiara nome, misura rilevata e metodo
  (`__status`, con `__status--error` per l'import fallito). Non sostituisce `rg-upload`, che resta
  l'area di rilascio grande di una pagina: le due forme convivono. Il controllo vero resta
  l'`<input type="file">` — opacità zero ma presente, quindi focusabile e tabulabile — e hover e
  focus raggiungono il bottone via `:has()`.
- **`rg-color-map`** — attribuzione di ciò che è stato importato: ogni colore o layer del file
  riceve un ruolo di lavorazione. Rende obbligatoria la regola §10 che entrambe le app violavano:
  **il campione non basta mai da solo**, accanto sta sempre il codice colore o il nome del layer
  in mono. Il colore è un dato letto dal file e arriva inline via `--swatch`, come in
  `rg-swatch__color`. Parti: `__row`, `__swatch` (+ `--none`), `__code`, `__meta`, `__target`,
  `__empty`.
- **`rg-param-section__index` / `__title`** — indice e titolo di una sezione del pannello, che le
  app rifacevano con stili inline. Il numero è mono, tabulare e secondario; il titolo è una label
  identitaria, non un H3 di pagina.
- **Sezione richiudibile del pannello** — composizione sancita
  `details.rg-param-section.rg-disclosure` + `summary.rg-param-section__header.rg-disclosure__trigger`:
  un solo filetto di chiusura, `+`/`−` del DS spinto a destra, testata con target di 40 px e focus
  visibile.

### Regola: ordine canonico del pannello

In `patterns/workspace.md`. Il pannello ha una **testa canonica** (`Sagoma` → `Colori e ruoli` →
`Formato e scala`), un **corpo libero** con i gruppi propri del tool **nel loro ordine**, e una
**coda canonica** (`Esportazione` → `Preset`). La coerenza fra tool non si ottiene imponendo gli
stessi gruppi — i parametri di generazione sono l'identità dello strumento — ma fissando l'ordine
e il titolo di ciò che ricorre.

Gli slot sono **posizioni, non contenitori**: uno slot assente non lascia buchi e la numerazione
resta contigua, perché il numero dice dove sei nel pannello, non quale slot è. Il test di
appartenenza segue l'ordine del lavoro (cosa entra → come lo interpreto → quanto è grande ciò che
produco → come lo genero → cosa mi porto via) e risolve il caso tipico di errore: «larghezza reale
mm» sembra un parametro di generazione ma senza file non vuole dire niente, quindi sta nella
sezione Sagoma. Codificato anche ciò che **non** sta nel pannello: le azioni vivono in
`rg-workspace__stage-header`.

### Documentazione

- Nuovi `components/file-input.md` e `components/color-map.md`.
- `patterns/workspace.md`: nuova sezione "Ordine canonico del pannello".
- `components.json`: `workspace` porta la regola nelle `notes`; `upload` dichiara il confine con
  `rg-file-input`.
- Vetrina: nuova sezione **21 — Pannello di una tool** (pannello completo nell'ordine canonico,
  più gli stati di `rg-file-input` e lo stato vuoto di `rg-color-map`).

## 1.4.0 — 2026-07-22

Densità del pannello parametri delle tool. `pattern-grammar` mostrava numeri illeggibili nei campi
con unità: il pannello era stato stretto a `--rg-layout-sidebar` (280px, il token della
*navigazione*) e la griglia a due colonne lasciava ~68px all'input. Il difetto non era dell'app: il
DS non diceva quale fosse la larghezza giusta di un pannello di parametri, e `rg-param-grid`
collassava a una colonna solo su **media query di finestra** — quindi mai, con finestra larga e
pannello stretto. Token additivi, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi token

- **`--rg-layout-tool-panel`** (380px) — larghezza del pannello di una tool. È ora il default di
  `--rg-workspace-panel`, al posto del 380px letterale che stava nel CSS. Le tool hanno un token
  proprio perché un pannello di parametri non è una colonna di navigazione.
- **`--rg-layout-param-col-min`** (132px) — larghezza minima di una colonna di parametri, cioè la
  misura sotto la quale un `rg-field-with-unit` smette di mostrare il valore.

### Correzioni

- **`rg-param-grid` impila per larghezza del contenitore, non della finestra.**
  `rg-workspace__panel` è ora un contenitore di query (`container-type: inline-size`) e la griglia
  passa a una colonna sotto 324px di pannello (2 × 132 + gap + padding di sezione). Vale a
  qualsiasi larghezza di finestra: nessuna app deve più scrivere media query locali per i propri
  parametri. La vecchia media query a 760px resta per lo stack mobile.
- **`rg-field-with-unit .rg-input` ha `min-width: 0`** — annulla la dimensione minima automatica
  del controllo, che in un pannello stretto faceva sbordare l'input dalla propria traccia invece
  di comprimerlo.

### Documentazione

- `patterns/workspace.md`: nuova regola "Larghezza del pannello" — quale token usare, perché non
  restringere con `--rg-layout-sidebar`, la soglia dei 324px, e la segmentazione in
  `rg-param-section` come leva giusta quando i controlli sono molti.
- `components/forms.md`: larghezza minima d'uso del campo con unità e motivo per cui non esiste
  una variante compatta.
- Vetrina, sezione 16: il workspace è mostrato alla larghezza di default e affiancato dal
  confronto 380 / 280 che rende visibile il collasso a una colonna.

## 1.3.1 — 2026-07-22

Il **bottone-link non esce più sottolineato**. Segnalata da `rg-product-platform` applicando il
contratto `rg-step` di 1.3.0: l'azione "Apri" di una fase è per forza un `<a class="rg-button">`
— naviga — e usciva con la sottolineatura dello user-agent. `rg-core.css` dichiara solo
`a { color: inherit }` e `.rg-button` non azzerava `text-decoration`, quindi la regola
`.rg-button--ghost:hover { text-decoration: underline }` non distingueva più nulla: era già
sottolineato a riposo. Correzione di foglio, nessuna classe nuova, nessun token, nessun cambio di
contratto: **patch, si aggiorna il pin e basta**.

### Correzioni

- **`.rg-button` — `text-decoration: none`.** La stessa riga che `rg-tab`, `rg-folder`,
  `rg-sidebar-item`, `rg-list-row--link` e `rg-topbar__back` portavano già: una classe di
  componente indossabile da un `<a>` neutralizza la decorazione nativa. L'affordance di hover di
  `--ghost` torna a essere un segnale. Il focus resta quello globale di `rg-core`
  (`:focus-visible`), che non distingue fra `<a>` e `<button>`.
- **`.rg-topbar__brand` — `text-decoration: none` + `color: inherit`,** con l'affordance di hover
  qualificata su `a.rg-topbar__brand:hover` così un marchio inerte (`<span>`) non finge di essere
  cliccabile. Stesso difetto, stessa riga: non serviva un trattamento separato. I prodotti stavano
  degradando il marchio a `<span>` — rinunciando al ritorno alla home — pur di non vedere la
  sottolineatura; quell'aggiramento ora si può rimuovere.

**Niente reset globale su `a`.** Sarebbe la correzione sbagliata: un link nel testo corrente deve
restare sottolineato, è la sua unica affordance non cromatica (regola: nessuno stato affidato al
solo colore). La sottolineatura si azzera **per classe di componente**, mai per elemento.

### Vetrina

- Sezione **03 — Buttons**: nuova tavola "Azione che naviga — la classe su un `<a>`". La vetrina
  rendeva i bottoni solo come `<button>`: per questo il difetto è sopravvissuto a tre release.
  Ora una regressione si vede.

## 1.3.0 — 2026-07-22

La **sequenza di fasi** diventa un componente. In `rg-product-platform` l'elenco delle fasi di una
parte era stato costruito con `rg-list-row--link` (1.2.0) e il difetto era del DS, non dell'app:
una sequenza ordinata di contenitori non è un elenco di record. Il titolo pesava quanto un
metadato, l'ordine non si leggeva, la fase risultava indistinguibile da una tabella dati e le
azioni della fase erano vietate dal contratto della riga navigabile. Nessun token nuovo, nessuna
rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-steps` / `rg-step`** — fase di una sequenza ordinata: **blocco rigato** (filetto forte
  nero sopra e sotto, filetto neutro fra le fasi, come `rg-table`; nessun riquadro a pannello),
  numero di posizione in mono dentro una casella, filo verticale generato dal DS che unisce i
  numeri (il segno che distingue una sequenza da un elenco piatto), titolo identitario a
  `--rg-font-size-lg`, parametri tecnici con unità in `rg-step__meta`, corpo espandibile **in
  loco** e azioni proprie sempre visibili. Il separatore sta in testa alla fase seguente, quindi
  chiude anche il corpo di una fase aperta invece di lasciarlo sfumare in quella dopo.
  Varianti: `rg-step--danger` per la fase irrisolta. Parti: `__head`, `__toggle`, `__num`,
  `__headline`, `__title`, `__meta`, `__aside`, `__actions`, `__body`.
- **`rg-button--ghost` + `rg-button--danger` componibili** — `--ghost` significa "senza chrome a
  riposo", quindi l'azione distruttiva secondaria è testo in colore `danger` e non un riquadro
  rosso ripetuto su ogni riga. Una riga di CSS, nessuna classe nuova.

### Decisione strutturale: niente `<details>`

Le azioni di una fase stanno sulla sua riga di intestazione. Dentro un `<summary>` sarebbero
controlli annidati in un controllo (markup invalido, tastiera rotta); fuori dal `<summary>`
sarebbero contenuto rivelabile, quindi invisibili a fase chiusa. Il toggle è perciò un `<button>`
e le azioni sono suoi **fratelli**: tab order toggle → Modifica → Elimina → contenuto. Il
compromesso, dichiarato nel doc: lo stato non è nativo e richiede due attributi
(`aria-expanded` sul toggle, `hidden` sul corpo) resi dal server o da tre righe di controller.

### Documentazione

- Nuovo `components/steps.md`: scopo, quando **non** serve, tastiera e accessibilità, controller
  di riferimento, limiti (non si annida, niente drag & drop in 1.3.0).
- `components/lists.md`: rimando esplicito a `rg-step` nel paragrafo "Uso e limiti", dove il
  divieto di controlli in una riga-link diventava un vicolo cieco.
- Vetrina: nuova sezione **20 — Sequenza di fasi** (aperta, chiusa, irrisolta con stato vuoto).

## 1.2.0 — 2026-07-22

Formalizzata la **riga-record navigabile**: l'elenco che è un indice (le fasi di una parte, le
revisioni di una scheda) aveva la riga giusta ma nessuna affordance che dicesse "questa riga si
apre", e i prodotti la stavano improvvisando componendo un `<a class="rg-list-row">` senza
contratto. Nessun token nuovo, nessuna rimozione: **aggiornamento sicuro**.

### Nuovi

- **`rg-list-row--link`** — la riga-record è essa stessa il link al proprio dettaglio: target
  pieno (min 40 px), chevron di apertura generato dal DS, hover che sottolinea il titolo (non
  solo colore), `:focus-visible` nero. Vale su `<a>` e su `<button>`; il reset del chrome nativo
  del bottone sta nel DS. Limite documentato: una riga-link non può contenere altri controlli
  interattivi, quindi niente `__actions` — se servono azioni per riga, la riga resta inerte.

### Documentazione

- `components/lists.md` riscritto con varianti, riga navigabile, uso e limiti (badge in `__head`
  e non in `__actions`; quando serve `rg-table` o `rg-folder` invece di una riga).
- Vetrina: nuova sezione **19 — Elenchi tecnici**. `rg-list` aveva un doc e un manifest ma nessun
  esemplare in `examples/`: `specimenAnchor` passa da `layout` a `lists`.

## 1.1.0 — 2026-07-21

Assorbimento del CSS residuo di `rg-product-platform`. Nessun token nuovo, nessuna rimozione:
**aggiornamento sicuro**, il pin si sposta senza interventi obbligati. Origine: triage delle
~196 righe di CSS rimaste nei blocchi `<style>` dei template Jinja dopo l'adozione del DS.

### Nuovi

- **App-shell documentale** (`rg-appshell`, `rg-appshell__main`, var `--rg-appshell-max`) —
  guscio delle applicazioni a pagine, complemento di `rg-workspace`. Doc `patterns/appshell.md`.
- **Lightbox** (`rg-lightbox`, `__image`, `__thumb`) — ingrandimento di un'immagine documentaria
  su `--rg-z-overlay`, sotto i dialog. Doc `components/lightbox.md`.
- **Badge, ciclo di vita e pipeline** — `--draft`, `--archived`, `--pending`, `--parsed` e la
  variante di forma `--count`, che `badges.md` prometteva dalla 0.1.0 senza implementarla.
  Distinguibili senza colore: pallino vuoto, bordo tratteggiato, assenza di pallino.
- **`rg-tabpanel`** — le tab avevano il controllo ma non il pannello.
- **`rg-topbar--sticky`**, **`rg-disclosure--boxed`**, **`rg-key-value--ruled`**,
  **`rg-cluster--end`**, **`rg-section-header--sub`**, **`rg-u-inline`**, **`rg-u-no-print`**.
- **Regole di stampa** in `rg-utilities.css`: le schede tecniche RG si stampano, il chrome
  sparisce e il contenuto occupa la pagina senza che ogni app riscriva il proprio `@media print`.

### Correzioni

- `.rg-tab` non funzionava su `<button>`: mancava il reset del chrome nativo, e ogni app se lo
  riscriveva in locale sovrascrivendo la versione DS. Ora ha anche il font identitario e il
  target minimo di 40 px, e riconosce `is-active`.
- `.rg-disclosure` documenta `<summary>` come trigger ma non ne sopprimeva il marker nativo
  (marker + segno `+`/`−` insieme) e non seguiva `[open]`.

### Contratto

- `appLocalExceptions` è **vuota e non va ripopolata**. Il prefisso `rg-` appartiene al DS: una
  classe `.rg-*` definita fuori dal DS è una violazione, verificabile con un grep invece che
  leggendo un elenco di deroghe. Vedi `integration/README.md`.

## 1.0.0 — 2026-07-20

Prima release stabile e **primo contratto di consumo pubblico**. Da qui i prodotti della
suite RG si agganciano a un tag invece che a una copia.

### Aggiunto
- `integration/` — contratto di consumo del DS:
  - `README.md`: distribuzione via submodule pinnato a tag, superficie consumata.
  - `streamlit.md` + `rg_ds_streamlit.py` + `streamlit-bridge.css` + `streamlit-config.toml`:
    meccanismo unico di iniezione per le app Streamlit. Il codice di caricamento vive nel DS,
    non nelle app.
  - `fastapi.md`: mount statico a perimetro ristretto e ordine di import nel template base.
- `tools/ds-lint.mjs` — due controlli nuovi: le classi `rg-*` citate in `integration/*.md`
  devono esistere nel CSS; `MODULES` nell'helper Streamlit deve coincidere con
  `components.json` → `importOrder` (l'ordine di import non può divergere in silenzio).
- `CHANGELOG.md` (questo file) e politica di versionamento esplicita.

### Consolidato
- `master`/`main` allineato: la proposta `ds/topbar-app` (`fdb69c6`, variante `rg-topbar--app`
  con `__back` / `__title` / `__actions`) è **accettata** e non è più marcata come proposta.
- `ds/workspace` (`e271895`) **scartato**: superato da `85f56c9`, che implementa `rg-workspace`
  in forma più completa (panel / stage / canvas / layer / statusbar, pan-zoom che non si
  azzera). Mergiarlo avrebbe introdotto una seconda definizione conflittuale di `.rg-workspace`.
  Nessun contenuto perso: il commit resta raggiungibile via SHA.

### Corretto
- Intestazione di `tokens.css`, ferma a `v0.1.0`, riallineata alla versione reale.

Nessun token permanente modificato rispetto a 0.3.0. Nessuna classe rimossa o rinominata:
per i consumatori l'aggiornamento da 0.3.0 è additivo. Il salto a 1.0.0 segna la stabilità
del contratto, non una rottura.

## 0.3.0

- Promossi nel DS da `rg-product-platform`: `modal`, `chip`, `folder` e le parti estese del
  breadcrumb (`rg-breadcrumb__sep`, `rg-breadcrumb__current`).
- `recent-card` dichiarato **app-local** (resta in `rg-product-platform`).
- Pattern `rg-workspace` (shell strumento a due pannelli con pan/zoom).
- Componente `rg-autocomplete`.
- Documentati gli 11 componenti fino ad allora solo-CSS; introdotto `tools/ds-lint.mjs`.

## 0.2.0

- Componenti `rg-list` / `rg-list-row` (liste tecniche con azioni inline) e `rg-icon-button`.

## 0.1.0

- Base iniziale: token, moduli CSS, componenti e pattern fondativi.
