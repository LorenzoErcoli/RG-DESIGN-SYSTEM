# Ambito della fase (`rg-scope-band` / `rg-scope-mark`)

## Scopo

Dire, senza che nessuno debba leggere il resto, **di chi è questa fase**: di **una parte** (tomaia,
spoiler, linguetta) o di **tutto il prodotto**.

Aggiunto in 1.31.0. Fino alla 1.30.0 una fase apparteneva sempre a una parte, e non c'era niente da
dichiarare. Da oggi una fase può valere per l'oggetto intero — il **controllo qualità finale** è il
caso che l'ha chiesto: si compila **una volta sola**, si vede dalla pagina di **ogni** parte, conta
**una volta** nel costo, e sul fascicolo stampato esce **una volta sola**, in fondo a tutti i fogli
delle parti.

> «È importante identificare se è al paio o se è al pezzo […] a livello di interfaccia e anche di
> scheda è una cosa che va evidenziata parecchio.»

Sbagliarlo non è un fastidio estetico: in reparto vuol dire **fare tre volte** un controllo che va
fatto una, o farlo su una parte sola quando andava fatto sull'oggetto finito.

## Il segno: uno, in due misure

| Classe | Misura | Dove |
| --- | --- | --- |
| `rg-scope-band` | **fascia**, da bordo a bordo | in testa al blocco della fase a schermo (`rg-phase-panel`), in testa al foglio stampato (`rg-worksheet-block`) |
| `rg-scope-mark` | **timbro** in linea | su una riga di elenco (`rg-step`), su una linguetta, in una cella |

| Elemento / variante | Quando |
| --- | --- |
| `rg-scope-band__text` | La dichiarazione: «FASE DI TUTTO IL PRODOTTO». Grassetto, maiuscolo dal CSS. |
| `rg-scope-band__note` | La conseguenza operativa, in tondo: «Si compila una volta sola e vale per tutte e 3 le parti». |
| `rg-scope-mark` | Timbro **forte**: l'eccezione, cioè «tutto il prodotto». |
| `rg-scope-mark--part` | Timbro **quieto** (bianco con filetto): «solo questa parte». Si usa **solo** dove i due ambiti convivono nella stessa vista e la differenza va dichiarata riga per riga. Marcare tutte le righe equivale a non marcarne nessuna. |
| `rg-worksheet-block--product` | Il foglio della fase di tutto il prodotto: contorno forte, il secondo segnale per chi lo cerca nel mucchio. |
| `rg-step--product` | La riga di una fase di tutto il prodotto **dentro** l'elenco di una parte. Vedi [steps](steps.md#la-fase-di-tutto-il-prodotto-dentro-lelenco-della-parte-1310). |
| `rg-steps__break` (+ `-title`, `-note`) | **Opzionale**: lo stacco intitolato, se un'app mette le fasi di prodotto tutte in coda invece che in sequenza. La piattaforma prodotti non lo usa. |

Nessuno stato: non è interattivo, non ha hover né focus. Chi deve essere cliccabile è la riga, non
il timbro.

## Il colore: `--rg-color-scope`

Tre stesure. La prima era **nera**. Giudizio dal campo: *«rendila più evidente, magari in rosso? o
comunque un colore bello evidente»*, e la 1.31.0 uscì con un rosso proprio, `#b3261e`, testo bianco.
Vista montata in pagina, la richiesta è cambiata: *«proviamo un giallo/arancione di allerta»*. Fra
quattro candidati a confronto — il rosso di partenza, un giallo, l'ambra, un arancione — ha vinto
l'**ambra `#f59e0b`, con il testo nero** (1.32.0).

Il **nome del token non cambia**, e non cambierà per un colore: `--rg-color-scope` dice il **ruolo**.
Chi consuma il DS non ha toccato una classe né una riga di markup.

**Il testo nero non è una preferenza.** Nero su ambra = **9,78:1**; bianco su ambra = **2,15:1**,
cioè illeggibile. `--rg-color-scope` e `--rg-color-scope-text` sono una **coppia**: chi cambia il
primo ricalcola il secondo, non lo eredita.

**Perché un token proprio e non `--rg-color-warning`.** L'ambra ha un vicino a 3° di tinta, ed è
esattamente quello da non riusare: `--rg-color-warning` nella stessa pagina è già due cose, lo stato
d'avviso dei moduli **e** `--rg-color-category-4`, cioè il reparto **Strass**. Un terzo significato
sullo stesso valore è precisamente ciò che vietano le [regole §4](../design-rules.md#il-colore-dambito-dalla-1310)
— ed è lo stesso argomento che nella 1.31.0 escludeva `--rg-color-danger` (errore **e**
`category-3`, la Pressatura): il motivo non è cambiato, si è spostato di tinta. Anzi qui è **più
forte**, perché `warning` è già uno stato *e* una categoria.

E il significato sarebbe comunque sbagliato. La parola usata per chiedere il colore è stata
«allerta», ma **questa non è un'allerta**: non dice «qualcosa non va», dice «questa fase non è come
le altre», cioè un'**appartenenza**. Un giallo d'avviso che significa appartenenza è un rischio di
lettura che si paga una volta sola, quando qualcuno prende la fascia per un problema da risolvere: la
parola scritta a caratteri pieni («FASE DI TUTTO IL PRODOTTO») è ciò che lo impedisce, ed è la
ragione per cui la parola non è mai facoltativa.

**Tre segnali, e uno solo è il colore** — perché nessuna appartenenza, come nessuno stato, può
dipendere dal solo colore. Con l'ambra reggono tutti e tre, ma cambia **quale porta il peso sulla
carta**:

1. **Campitura piena.** Nessuno stato del DS riempie una superficie: alert, badge e campi in errore
   sono filetti e parole su bianco. La campitura è il segno dell'ambito, e solo suo. Identica a
   prima — e in grigio diventa il discrimine principale.
2. **Filetto nero forte** sotto la fascia, contorno nero attorno al timbro. Non è colore: resta in
   fotocopia, in stampa monocromatica e per chi non distingue l'ambra dal giallo. Identico a prima,
   ma ora **pesa di più**: sul foglio è il segnale che resta.
3. **Maiuscoletto nero** (era bianco): la parola, che è contenuto del markup e resta anche senza CSS.
   Su fondo chiaro il nero è **più solido** del bianco in negativo — e in fotocopia il negativo è
   proprio ciò che si chiude per primo, perché le lettere bianche su fondo scuro si riempiono già
   alla seconda copia. Il segnale che porta il significato è diventato il più robusto dei tre.

**Contrasto.** Nero su `--rg-color-scope` = **9,78:1**, contro il 5,98:1 del bianco sul rosso: il
contrasto **sale**, e la nota a 12 px resta AA con margine. La nota è nera come il testo (un grigio
scenderebbe verso la soglia senza guadagnare nulla) e si distingue per misura e peso.

**In fotocopia — lo scarto vero di questa scelta, dichiarato.** In scala di grigi l'ambra sta al
**~65% di luminanza**: un blocco **chiaro**, dove il rosso stava al ~26% e con il contrasto spinto di
una fotocopia andava al nero. Sul foglio la fascia **non è più l'unico blocco pieno scuro**. Questo
si perde, ed è stato messo sul tavolo prima della scelta.

Quello che **non** si perde: la fascia resta l'unica **campitura uniforme** del foglio, e non per
fortuna. Tutte e sette le trame dei reparti sono righe su bianco (`repeating-linear-gradient`),
nessuna è una tinta piatta — l'unica che lo era, gli Accoppiaggi, fu scartata già nella 1.14.0. Una
tinta piatta e un reticolo di righe non si leggono uguali a nessuna distanza, qualunque sia il tono.
In vetrina c'è il confronto affiancato in simulazione fotocopia (`#scope-sheet-photocopy`).

**Perché in stampa non è stato aggiunto nessun rinforzo.** Quello che l'ambra indebolisce non è la
*lettura* della fascia (che migliora) ma il *colpo d'occhio da un metro* su un mucchio di fogli — e
quel compito ha già il suo segnale, `rg-worksheet-block--product`, che raddoppia il contorno su tutti
e quattro i lati e corre per l'altezza del blocco invece che in una striscia alta 20 px. Un secondo
filetto forte **sopra** la fascia cadrebbe a distanza zero dal bordo del blocco (la fascia è il primo
figlio, a filo) e si leggerebbe come una sbavatura di stampa, non come struttura. Due linee nere
attaccate non sono una linea più importante: sono un difetto.

**La coppia da tenere d'occhio.** `--rg-color-accent-sand` (cioè `--rg-color-category-6`, il reparto
**Accoppiaggi**, ed è anche il colore della terza parte in [part-mark](part-mark.md)) sta a **2° di
tinta** dall'ambra e quasi allo **stesso grigio**: 61% contro 65%. In fotocopia i due toni **non si
distinguono**. Non si confondono lo stesso perché la sabbia compare come trama di righe o come
pastiglia **tonda** numerata, e l'ambra come rettangolo **pieno** col contorno nero: la distanza la
fanno figura e misura, non la tinta. È la stessa disciplina che tiene separate pressatura e
finissaggio fra le trame — e va ricordata prima di introdurre un terzo caldo pieno nella stessa vista.

## Perché non un badge

`rg-badge` classifica un record **fra i suoi pari**, e per contratto sta sempre su superficie bianca
con filetto: «niente riempimenti pastello» ([badges](badges.md#uso-e-limiti)). Qui non si classifica
una fase fra le altre: si dice che quella fase **non è come le altre** della pagina. Il timbro è
esattamente ciò che un badge non può essere — pieno, colorato, quadro (radius compatto). Un
`rg-badge` in testa al blocco della fase era la prima ipotesi ed è stata scartata come **troppo
timida**: alto 20 px, filetto grigio, in una testa che ha già un numero nero da 32, un titolo da 28 e
una tessera di reparto.

## Perché non compete con il reparto

Sullo stesso foglio convivono due fasce, e dicono due cose diverse: **l'ambito** (di chi è questa
fase) e il **reparto** (chi la esegue). Si separano su quattro assi, non su uno:

| | Ambito (`rg-scope-band`) | Reparto ([`rg-dept-band`](dept-band.md)) |
| --- | --- | --- |
| Figura | campitura **piena** | **trama** di righe sottili che nomina il reparto |
| Colore | il colore d'ambito, sempre lo stesso | categoriale, uno per reparto |
| Testo | nero su pieno | nero su targhetta bianca |
| Posizione | a filo del bordo alto | staccata dai bordi, sotto |
| Peso in fotocopia | blocco chiaro **uniforme** | striscia di **righe** su bianco |

La campitura piena **pesa** più di una trama a parità di altezza: per questo la fascia d'ambito è la
più bassa delle due. Se fossero alte uguali, la prima coprirebbe la seconda.

## Uso e limiti

- **Si marca l'eccezione, non la regola.** La fase di una parte non porta nessun segno: la pagina è
  già quella della parte, il foglio ha già la sua testata di parte. Il timbro `--part` esiste per le
  viste **miste** (un elenco di costi, una ricerca, un riepilogo di prodotto) dove le due specie
  stanno nella stessa colonna.
- **Non si ripete.** Nella riga dell'elenco basta il timbro; nella testa del pannello basta la
  fascia; sul foglio basta la fascia. La stessa frase detta tre volte nella stessa vista è rumore —
  e in una lista di quattro fasi diventa una colonna di «di tutto il prodotto».
- **Le parole sono contenuto, non `content:`.** Se il CSS non arriva — una mail, un export, un PDF
  renderizzato male — la frase resta. La **cassa** la mette il CSS, come in `rg-label`: nel markup si
  scrive in tondo.
- **Il DS non impone le parole.** Consigliate: «Fase di tutto il prodotto» per la fascia, «Tutto il
  prodotto» per il timbro, «Solo questa parte» per `--part`. Dove il gergo del prodotto lo chiede, si
  aggiunge dopo il punto mediano: «Tutto il prodotto · al paio». Non scrivere **solo** «al paio»: chi
  arriva da fuori reparto non lo conosce.
- **La nota dice la conseguenza, non ripete la dichiarazione.** «Si compila una volta sola e vale per
  tutte e 3 le parti», «Nel costo conta una volta», «Da fare sull'oggetto finito». È lì che si evita
  il lavoro fatto tre volte.
- **Una fascia per blocco, e non si ripete a parole.** Con la fascia in testa, `rg-phase-panel__kind`
  **non** aggiunge «di tutto il prodotto».
- **Dove la fascia non ci sta** — un pannello in una colonna stretta, un riepilogo — il timbro può
  stare in `rg-phase-panel__name`, sopra la riga «Fase N di M». O l'una o l'altro, mai tutti e due.
- **Non è uno stato.** Non dice «fatta», «da fare», «in revisione»: dice a chi appartiene. Convive
  con i badge di stato senza toccarli — ma non mettere una `rg-scope-band` e un `rg-alert--warning` a
  contatto: una fascia ambra piena e un avviso ocra attaccati si leggono come un unico blocco
  d'allarme. È il rischio che l'ambra porta al posto di quello che il rosso correva accanto a
  `--danger`: lo stesso vincolo, spostato di tinta. La fascia sta in testa al blocco, l'alert dentro il corpo.
- **Non è l'identità della parte.** [`rg-part-mark`](part-mark.md) è una pastiglia **tonda** che
  contiene un numero, il timbro d'ambito è un rettangolo **pieno** col contorno nero che contiene una
  parola: figura, misura e contenuto diversi, possono stare sulla stessa riga. Dalla 1.32.0 **il
  colore non è più un asse di separazione** contro la terza parte, che è sabbia (`category-6`) e in
  grigio vale quanto l'ambra: se le due finiscono nella stessa colonna, ciò che le distingue sono la
  forma e la parola. È un limite dichiarato, non un difetto da correggere con un'altra tinta.
- **In stampa il colore va stampato.** `print-color-adjust: exact` è già in `rg-utilities.css` per
  `rg-scope-band` e `rg-scope-mark`: l'app non deve fare nulla. Senza, il browser butterebbe via la
  campitura: dalla 1.32.0 il testo nero resterebbe comunque leggibile (prima spariva, bianco su
  bianco), ma il foglio perderebbe il segno dell'ambito — che è peggio, perché nessuno se ne accorge.
- **Accessibilità**: la fascia è un `<p>`, primo figlio del blocco, quindi è la prima cosa letta.
  Il timbro dentro `rg-step__headline` entra nel nome accessibile del toggle («3 TUTTO IL PRODOTTO
  Controllo qualità…»): non aggiungere `aria-label` che lo nasconda. Niente `aria-hidden` sul timbro:
  è informazione, non decorazione.

## Struttura

### 1. In testa al blocco della fase (a schermo)

Primo figlio di `rg-phase-panel`, **sopra** la riga del reparto: prima di chi la esegue viene di chi
è. Gli angoli alti, i margini laterali e il filetto nero sotto li fa il DS.

```html
<article class="rg-phase-panel">
  <p class="rg-scope-band">
    <span class="rg-scope-band__text">Fase di tutto il prodotto</span>
    <span class="rg-scope-band__note">Si compila una volta sola e vale per tutte e 3 le parti · nel costo conta una volta</span>
  </p>
  <p class="rg-phase-panel__department">
    <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--finissaggio rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Finissaggio e Controllo Qualità</span>
  </p>
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">3</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 3 di 3</span></p>
        <h1 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 3: </span>Controllo qualità</h1>
      </div>
    </div>
  </header>
  <div class="rg-phase-panel__body">…</div>
</article>
```

### 2. Nell'elenco delle fasi di una parte

La fase di prodotto sta **al suo posto nella sequenza**, in mezzo alle altre, e si riconosce dal
timbro e dai filetti forti sopra e sotto. Markup e regole in
[steps](steps.md#la-fase-di-tutto-il-prodotto-dentro-lelenco-della-parte-1310).

```html
<li class="rg-step rg-step--product">
  <div class="rg-step__head">
    <button class="rg-step__toggle" type="button" id="fase-3-toggle" aria-controls="fase-3" aria-expanded="false">
      <span class="rg-step__num">3</span>
      <span class="rg-step__headline">
        <span class="rg-scope-mark">Tutto il prodotto</span>
        <span class="rg-step__title">Controllo qualità</span>
      </span>
    </button>
  </div>
  <div class="rg-step__body" id="fase-3" role="region" aria-labelledby="fase-3-toggle" hidden></div>
</li>
```

### 3. Sul foglio stampato

Primo figlio del blocco, a filo dei bordi, **prima** di `__step` e della banda del reparto.

```html
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--product">
  <p class="rg-scope-band">
    <span class="rg-scope-band__text">Fase di tutto il prodotto</span>
    <span class="rg-scope-band__note">Non di una parte sola: si fa una volta, sull'oggetto finito e montato.</span>
  </p>
  <p class="rg-worksheet-block__step">Fase unica · dopo tutte le parti</p>
  <p class="rg-dept-band rg-dept-band--finissaggio">
    <span class="rg-dept-band__name">Reparto Finissaggio e Controllo Qualità</span>
    <span class="rg-dept-band__note">Foglio 12 / 12</span>
  </p>
  <header class="rg-worksheet-block__head">
    <h3 class="rg-worksheet-block__work">Controllo qualità</h3>
    <p class="rg-worksheet-block__part">Tutte e 3 le parti · oggetto finito</p>
  </header>
  <div class="rg-worksheet-block__body">…</div>
  <footer class="rg-worksheet-block__foot">…</footer>
</section>
```

In `rg-worksheet-block__part` non va nessuna [`rg-part-mark`](part-mark.md): non c'è una parte da
identificare, e una pastiglia colorata lì direbbe il contrario di quello che dice la fascia.

## Cosa deve fare l'app

- **Decidere l'ambito, una volta per fase**, e passarlo ai tre posti: non dedurlo dal reparto (il
  controllo qualità *di una parte* esiste, ed è una fase di parte come le altre).
- **Nell'elenco della parte, al suo posto nella sequenza**: la fase di prodotto non si sposta in
  fondo e non si separa, si riconosce dal segno. Bastano `rg-step--product` e un `rg-scope-mark`:
  niente stacchi, niente note che ripetono la stessa frase riga per riga.
- **Numerazione**: la fase di prodotto porta il numero che le dà il dominio. Se quel numero è quello
  della sequenza di prodotto e rischia di leggersi come un numero della parte, si spiega nella pagina
  della fase, non su ogni riga.
- **Costo e fascicolo**: contare una volta, stampare una volta, in fondo a tutte le parti. Il DS
  dichiara l'ambito, non lo calcola.
