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

Nero pieno, parola in bianco maiuscolo. È l'unico segno del DS che **inverte una superficie** per
dire un'appartenenza, quindi non si confonde con nient'altro, e regge la fotocopia: una campitura
piena resta piena a qualunque contrasto, mentre una trama può impastarsi e un grigio può sparire.

| Classe | Misura | Dove |
| --- | --- | --- |
| `rg-scope-band` | **fascia**, da bordo a bordo | in testa al blocco della fase a schermo (`rg-phase-panel`), in testa al foglio stampato (`rg-worksheet-block`) |
| `rg-scope-mark` | **timbro** in linea | su una riga di elenco (`rg-step`), su una linguetta, in una cella |

| Elemento / variante | Quando |
| --- | --- |
| `rg-scope-band__text` | La dichiarazione: «FASE DI TUTTO IL PRODOTTO». Grassetto, maiuscolo dal CSS. |
| `rg-scope-band__note` | La conseguenza operativa, in tondo: «Si compila una volta sola e vale per tutte e 3 le parti». |
| `rg-scope-mark` | Timbro **forte** (nero pieno): l'eccezione, cioè «tutto il prodotto». |
| `rg-scope-mark--part` | Timbro **quieto** (bianco con filetto): «solo questa parte». Si usa **solo** dove i due ambiti convivono nella stessa vista e la differenza va dichiarata riga per riga. Marcare tutte le righe equivale a non marcarne nessuna. |
| `rg-worksheet-block--product` | Il foglio della fase di tutto il prodotto: contorno forte, il secondo segnale per chi lo cerca nel mucchio. |
| `rg-steps__break` (+ `-title`, `-note`) | Lo stacco in coda all'elenco delle fasi di una parte: da qui in giù si parla del prodotto. Vedi [steps](steps.md#le-fasi-di-tutto-il-prodotto-in-coda-131). |
| `rg-step--product` | La riga di una fase di tutto il prodotto dentro l'elenco di una parte. |

Nessuno stato: non è interattivo, non ha hover né focus. Chi deve essere cliccabile è la riga, non
il timbro.

## Perché non un badge

`rg-badge` classifica un record **fra i suoi pari**, e per contratto sta sempre su superficie bianca
con filetto: «niente riempimenti pastello» ([badges](badges.md#uso-e-limiti)). Qui non si classifica
una fase fra le altre: si dice che quella fase **non è come le altre** della pagina. Il timbro è
esattamente ciò che un badge non può essere — pieno, quadro (radius compatto), invertito. Un
`rg-badge` in testa al blocco della fase era la prima ipotesi ed è stata scartata come **troppo
timida**: alto 20 px, filetto grigio, in una testa che ha già un numero nero da 32, un titolo da 28 e
una tessera di reparto.

## Perché non compete con il reparto

Sullo stesso foglio convivono due fasce, e dicono due cose diverse: **l'ambito** (di chi è questa
fase) e il **reparto** (chi la esegue). Si separano su tre assi, non su uno:

| | Ambito (`rg-scope-band`) | Reparto ([`rg-dept-band`](dept-band.md)) |
| --- | --- | --- |
| Figura | nessuna: campo pieno | trama che nomina il reparto |
| Colore | nero, sempre | categoriale, uno per reparto |
| Testo | bianco su nero | nero su targhetta bianca |
| Posizione | a filo del bordo alto | staccata dai bordi, sotto |
| Altezza | più bassa | più alta |

Il nero pieno **pesa** più del colore a parità di altezza: per questo la fascia d'ambito è la più
bassa delle due. Se fossero alte uguali, la prima coprirebbe la seconda.

## Uso e limiti

- **Si marca l'eccezione, non la regola.** La fase di una parte non porta nessun segno: la pagina è
  già quella della parte, il foglio ha già la sua testata di parte. Il timbro `--part` esiste per le
  viste **miste** (un elenco di costi, una ricerca, un riepilogo di prodotto) dove le due specie
  stanno nella stessa colonna.
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
  **non** aggiunge «di tutto il prodotto»: la stessa cosa detta due volte sulla stessa testa è rumore,
  come il badge «principale» tolto nella 1.16.0.
- **Dove la fascia non ci sta** — un pannello in una colonna stretta, un riepilogo — il timbro può
  stare in `rg-phase-panel__name`, sopra la riga «Fase N di M». O l'una o l'altro, mai tutti e due.
- **Non è uno stato.** Non dice «fatta», «da fare», «in revisione»: dice a chi appartiene. Convive
  con i badge di stato senza toccarli.
- **Non è l'identità della parte.** [`rg-part-mark`](part-mark.md) è una pastiglia **tonda** e
  colorata, il timbro d'ambito è un rettangolo **nero**: figura, misura e colore diversi, possono
  stare sulla stessa riga.
- **In stampa il nero va stampato.** `print-color-adjust: exact` è già in `rg-utilities.css` per
  `rg-scope-band` e `rg-scope-mark`: l'app non deve fare nulla. Senza, il browser butterebbe via la
  campitura e resterebbe testo bianco su bianco.
- **Accessibilità**: la fascia è un `<p>`, primo figlio del blocco, quindi è la prima cosa letta.
  Il timbro dentro `rg-step__headline` entra nel nome accessibile del toggle («4 TUTTO IL PRODOTTO
  Controllo qualità…»): non aggiungere `aria-label` che lo nasconda. Niente `aria-hidden` sul timbro:
  è informazione, non decorazione.

## Struttura

### 1. In testa al blocco della fase (a schermo)

Primo figlio di `rg-phase-panel`, **sopra** la riga del reparto: prima di chi la esegue viene di chi
è. Gli angoli alti e i margini laterali sono quelli del blocco, li fa il DS.

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
      <span class="rg-phase-panel__num" aria-hidden="true">4</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 4 di 4</span></p>
        <h1 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 4: </span>Controllo qualità</h1>
      </div>
    </div>
  </header>
  <div class="rg-phase-panel__body">…</div>
</article>
```

### 2. Nell'elenco delle fasi di una parte

Le fasi di tutto il prodotto stanno **in coda** all'elenco di ogni parte, dopo lo stacco. Markup e
regole in [steps](steps.md#le-fasi-di-tutto-il-prodotto-in-coda-131).

```html
<li class="rg-steps__break">
  <h3 class="rg-steps__break-title">Di tutto il prodotto</h3>
  <p class="rg-steps__break-note">Non sono fasi di questa parte: si compilano una volta sola e si vedono da ogni parte.</p>
</li>
<li class="rg-step rg-step--product">…<span class="rg-scope-mark">Tutto il prodotto</span>…</li>
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
- **In coda, mai in mezzo**: le fasi di prodotto si mostrano dopo tutte le fasi della parte.
- **Numerazione**: la fase di prodotto ha il numero della **sequenza di prodotto**, non della parte.
  Se nella pagina della parte il numero rischia di leggersi come un numero della parte, si scrive nel
  timbro o nella nota dello stacco quanti ce ne sono («1 fase, uguale per tutte le parti»).
- **Costo e fascicolo**: contare una volta, stampare una volta. Il DS dichiara l'ambito, non lo
  calcola.
