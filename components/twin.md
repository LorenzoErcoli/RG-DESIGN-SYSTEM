# Gemellaggio dei parametri (`rg-twin-band` / `rg-twin-mark`)

## Scopo

Dire che questa fase è **la stessa fase** che sta anche su altre parti, e dire **fin dove** arriva
l'uguaglianza: i **parametri** (righe, macchine, valori) sono tenuti uguali, i **tempi per pezzo**
no. Il taglio laser del davanti e quello del dietro hanno gli stessi parametri e perimetri diversi.

Aggiunto in 1.42.0. Dentro un prodotto una fase sta in uno di **tre** stati — e sono i tre valori di
**un solo asse**, non tre cose diverse:

| Stato | Cosa vuol dire | Segno |
| --- | --- | --- |
| **autonoma** | vale per questa parte e basta | **nessuno**, ed è voluto |
| **gemella** | stessa fase su più parti: **parametri** uguali, **tempi** no | `rg-twin-band` / `rg-twin-mark` (1.42.0) |
| **di tutto il prodotto** | una fase sola per l'oggetto, si conta una volta | [`rg-scope-band` / `rg-scope-mark`](scope.md) (1.31.0) |

> «In questo momento la concatenazione tra fasi rispetto alle parti è poco chiara. […] Per le fasi
> univoche usiamo una fascia con colore, ti chiedo di evidenziare in qualche modo anche le fasi con
> parametri concatenate, magari un colore verde esplicitando che solo i parametri sono uguali e non
> i tempi.» (Lorenzo)

Fino alla 1.41.0 dei tre se ne vedeva **uno**. Il gemellaggio lo diceva una riga di testo grigia
sopra il titolo del pannello, e nell'elenco delle fasi della parte non si vedeva affatto: chi
cambiava un parametro su una gemella non sapeva di starlo cambiando anche altrove.

**Il limite è metà del significato, non una postilla.** Un segno che dicesse solo «uguale in dietro»
farebbe danno: qualcuno dedurrebbe che anche i tempi sono uguali, e il tempo è ciò che entra nel
costo. Per questo la nota della fascia **non è facoltativa**, e la parola del timbro dice
«parametri», non «gemella».

## Il segno: uno, in due misure

Le stesse due misure dell'[ambito](scope.md), così i tre stati si leggono con la stessa grammatica.

| Classe | Misura | Dove |
| --- | --- | --- |
| `rg-twin-band` | **fascia**, da bordo a bordo | in testa al blocco della fase a schermo (`rg-phase-panel`) |
| `rg-twin-mark` | **timbro** in linea | sulla riga dell'elenco delle fasi (`rg-step__headline`), in una cella, in `rg-phase-panel__name` dove la fascia non ci sta |

| Elemento | Quando |
| --- | --- |
| `rg-twin-band__text` | La dichiarazione: «Parametri uguali in DIETRO, FONDO». Grassetto, maiuscolo dal CSS. |
| `rg-twin-band__note` | **Obbligatoria**: il limite. «Righe, macchine e valori restano uguali · i tempi per pezzo sono di questa parte». |

Non ci sono varianti, e non c'è un modificatore di riga tipo `rg-step--product`: vedi
[Uso e limiti](#uso-e-limiti). Nessuno stato: non è interattivo, non ha hover né focus. Cliccabile è
la riga, non il timbro.

## Il colore: `--rg-color-twin`, e perché non il verde che c'era già

La richiesta diceva «magari un colore verde». Verde è, ma **non uno dei due verdi del DS**, che sono
entrambi occupati — due volte ciascuno:

| Verde esistente | Primo significato | Secondo |
| --- | --- | --- |
| `--rg-color-success` `#365c45` | lo **stato** «conforme, validato» | `--rg-color-category-5`, il reparto **Finissaggio e Controllo Qualità** |
| `--rg-color-accent-sage` `#89958a` | `--rg-color-category-7`, le **Incollature** | l'identità della **quarta parte** in [part-mark](part-mark.md) |

È lo stesso argomento con cui l'ambito ha escluso `warning` e `danger` ([scope](scope.md#il-colore---rg-color-scope)):
lo stesso valore con tre significati a due metri di distanza è ciò che vietano le
[regole §4](../design-rules.md#4-colore). Qui però c'è un argomento **peggiore**, e vale da solo:
nel pannello della fase i parametri portano il **proprio stato di validazione** (stimato, rilevato,
validato). Una fascia verde in testa che dice «parametri uguali» verrebbe letta «parametri
**validati**» — il significato sbagliato sul fatto più delicato della pagina. Verde-uguale e
verde-fatto non possono stare nello stesso blocco.

Quindi un token di **ruolo** proprio, come `--rg-color-scope`:

```
--rg-color-twin: #58d6a0;  --rg-color-twin-text: var(--rg-color-black);
```

- **Tinta 154°**: 29° dalla salvia (125°) e 10° dal verde di `success` (144°) — il massimo di
  distanza che resta restando verde.
- **Saturazione 59% contro il 96% dell'ambra.** Non è un dettaglio di gusto: il gemellaggio è un
  fatto **più debole** dell'ambito (la fase è ancora di questa parte), e il colore lo dichiara. Se
  le due fasce urlassero uguale, il fatto più importante — «questa si conta una volta» — verrebbe
  appiattito da quello minore.
- **Testo nero obbligatorio, e i due token sono una coppia**: nero su `#58d6a0` = **11,54:1**
  (meglio dei 9,78:1 dell'ambra), bianco = 1,82:1. Chi cambia il primo ricalcola il secondo.
- Come `--rg-color-scope`: **mai** azione primaria, navigazione, focus, testo corrente, bordo di un
  campo, badge di stato. **Mai da solo.**

### I tre segnali, e uno solo è il colore

1. **La parola**, contenuto del markup: resta anche senza CSS, in una mail, in un export. La cassa
   la mette il CSS.
2. **Il segno di uguale**, generato dal DS: due filetti neri di 2 px con 4 px di luce, davanti alla
   parola. È la figura che **separa i due timbri** quando compaiono nello stesso elenco, e serve
   perché in fotocopia il verde sta al **75%** di grigio e l'ambra al **69%**: sei punti **non**
   bastano. È fatto di **bordi**, non di sfondo, perché un bordo si stampa anche quando il browser
   butta via le campiture.
3. **Il filetto sotto la fascia**, nero **hairline** dove l'ambito ha il nero **forte** (2 px): la
   gerarchia fra i due fatti è scritta anche nello spessore della linea.

### Perché classi proprie e non `rg-scope-band--twin`

I tre stati sono un asse solo, e la tentazione di farne una variante è giusta. Non si è fatto per
tre ragioni verificate:

- la parola «scope» nel markup direbbe **«tutto il prodotto»** in un caso che è l'opposto: chi legge
  `rg-scope-band rg-scope-band--twin` in un template legge la cosa sbagliata;
- `rg-utilities.css` applica `print-color-adjust: exact` a `.rg-scope-band` e `.rg-scope-mark`, e qui
  **non** lo vogliamo (vedi [Sul foglio stampato](#sul-foglio-stampato-no-ed-è-una-decisione));
- la fascia porta **una figura in più** (il segno di uguale) che la variante avrebbe dovuto
  aggiungere comunque.

L'asse resta uno nella **documentazione** e nelle parole, non nel nome delle classi.

## Convivenza con le altre fasce

Nel blocco della fase possono stare insieme la fascia d'ambito, questa, la banda del reparto e — nell'elenco —
la graffa del gruppo di fasi collegate. **Ordine dei figli di `rg-phase-panel`**:

1. `rg-scope-band` — *di chi è* la fase (se è di tutto il prodotto);
2. `rg-twin-band` — *come è tenuta* (se è gemella);
3. `rg-dept-band.rg-phase-panel__band` **oppure** `rg-phase-panel__department` — *chi la esegue*;
4. `rg-phase-panel__head`, poi `__body`, poi `__foot`.

Le due fasce sono **mutuamente esclusive nei fatti**: una fase di tutto il prodotto non ha altre
parti con cui essere gemella. Ma il CSS non si rompe se capitano insieme: gli **angoli alti** li
prende solo il primo figlio, e la banda del reparto che segue una fascia li perde (correzione che
valeva già per `rg-scope-band` da sola).

**Non va confusa con le fasi collegate** di [steps](steps.md#gruppo-di-fasi-collegate-rg-steps--grouped). La
parola «collegata» nel DS è già presa, e dice un'altra cosa: fasi **diverse** di **questa** parte
tenute in sequenza da una graffa (principale + collegate contigue). Il gemellaggio è la **stessa**
fase su **altre** parti. Per questo la classe non si chiama `--linked`: due significati sulla stessa
parola, a due righe di distanza, sono lo stesso errore che si evita sui colori. Una gemella può
essere anche dentro un gruppo: il timbro e la graffa non si toccano, perché la graffa occupa la
colonna a sinistra dei numeri.

## Uso e limiti

- **Si marca il legame, non la parte.** La fascia nomina le **altre** parti, non questa: «Parametri
  uguali in DIETRO, FONDO» letto dalla pagina del DAVANTI. Oltre le tre o quattro, il conteggio è
  più leggibile dell'elenco: «Parametri uguali in altre 5 parti», e i nomi stanno nel corpo.
- **Niente filetti forti sulla riga d'elenco**, a differenza di `rg-step--product`. Quelli staccano
  **l'eccezione** dalle vicine, e l'eccezione è una; le gemelle in una parte possono essere tre o
  quattro, e quattro righe listate di nero sono una griglia, non un segno. Il timbro basta.
- **Non si ripete.** Nella riga basta il timbro, nella testa del pannello basta la fascia. Con la
  fascia in testa, `rg-phase-panel__kind` **non** ripete «uguale in dietro».
- **Le parole sono contenuto, non `content:`.** Consigliate: «Parametri uguali in DIETRO, FONDO» per
  la fascia, «Parametri uguali» o «Parametri uguali · dietro, fondo» per il timbro. **Non** scrivere
  solo «Gemella», «Collegata» o «Uguale»: nessuna delle tre dice il limite.
- **La nota dice il limite, non ripete la dichiarazione.** «Righe, macchine e valori restano uguali ·
  i tempi per pezzo sono di questa parte». Dove serve, la conseguenza operativa: «Modificando un
  parametro qui cambia anche in DIETRO».
- **Non è uno stato.** Non dice «fatta», «da fare», «validata»: dice un legame. Come per l'ambito,
  non mettere la fascia a contatto con un `rg-alert`: una campitura piena e un avviso attaccati si
  leggono come un unico blocco. La fascia sta in testa al blocco, l'alert dentro il corpo.
- **Dove la fascia non ci sta** — un pannello in colonna stretta, un riepilogo — il timbro può stare
  in `rg-phase-panel__name`, sopra la riga «Fase N di M». O l'una o l'altro, mai tutti e due.
- **Accessibilità**: la fascia è un `<p>`, fra i primi figli del blocco, quindi è fra le prime cose
  lette. Il timbro dentro `rg-step__headline` entra nel nome accessibile del toggle («2 PARAMETRI
  UGUALI · DIETRO Taglio laser»): non aggiungere `aria-label` che lo nasconda, e niente
  `aria-hidden` sul timbro — è informazione, non decorazione. Il segno di uguale è un
  pseudo-elemento vuoto: non ha bisogno di essere nascosto.

## Sul foglio stampato: no, ed è una decisione

Il gemellaggio **non va** su `rg-worksheet-block`, e non per mancanza di spazio.

L'argomento a favore esiste: il reparto riceve due fogli quasi identici su due parti e non sa che
sono lo stesso lavoro scritto una volta. Ma **non è lo stesso lavoro**: i tempi sono diversi, i due
fogli vanno lavorati tutti e due. Sul foglio il segno d'ambito dice esattamente l'opposto — «questa
si fa una volta sola» — e mettere accanto al secondo un timbro che gli somiglia invita l'inferenza
sbagliata, che in reparto si paga una volta e basta: un pezzo non fatto. Il gemellaggio è un fatto
**d'ufficio** (chi cambia un parametro deve sapere dove arriva il cambio), non un'istruzione di
lavorazione.

Conseguenza tecnica, voluta: `rg-twin-band` e `rg-twin-mark` **non** sono nell'elenco
`print-color-adjust: exact` di `rg-utilities.css`. Se una pagina a schermo viene stampata, la
campitura cade e restano la parola e il segno di uguale — che lassù è il peso giusto. Non c'è una
variante per la carta, e non è una dimenticanza.

Se all'ufficio serve la lista dei gemellaggi su carta, è un **riepilogo**, non una fascia su ogni
foglio: una colonna in una tabella di prodotto, dove il timbro in linea è già pronto.

## Struttura

### 1. In testa al blocco della fase (a schermo)

```html
<article class="rg-phase-panel">
  <p class="rg-twin-band">
    <span class="rg-twin-band__text">Parametri uguali in dietro, fondo</span>
    <span class="rg-twin-band__note">Righe, macchine e valori restano uguali · i tempi per pezzo sono di questa parte</span>
  </p>
  <p class="rg-phase-panel__department">
    <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--stampa rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Stampa, Laser e HF</span>
  </p>
  <header class="rg-phase-panel__head">
    <div class="rg-phase-panel__heading">
      <span class="rg-phase-panel__num" aria-hidden="true">2</span>
      <div class="rg-phase-panel__name">
        <p class="rg-phase-panel__kind"><span>Fase 2 di 4</span></p>
        <h1 class="rg-phase-panel__title"><span class="rg-u-visually-hidden">Fase 2: </span>Taglio laser</h1>
      </div>
    </div>
  </header>
  <div class="rg-phase-panel__body">…</div>
</article>
```

### 2. Nella riga dell'elenco delle fasi

Il timbro sta in `rg-step__headline`, subito **prima** del titolo e **dopo** l'eventuale
`rg-step__role`: il ruolo dice dove sei nella sequenza di questa parte, il timbro dice cosa accade
fuori dalla parte, e il contesto locale si legge per primo.

```html
<li class="rg-step">
  <div class="rg-step__head">
    <button class="rg-step__toggle" type="button" id="fase-2-toggle" aria-controls="fase-2" aria-expanded="false">
      <span class="rg-step__num">2</span>
      <span class="rg-step__headline">
        <span class="rg-twin-mark">Parametri uguali · dietro, fondo</span>
        <span class="rg-step__title">Taglio laser</span>
      </span>
    </button>
  </div>
  <div class="rg-step__body" id="fase-2" role="region" aria-labelledby="fase-2-toggle" hidden></div>
</li>
```

Nello stesso elenco possono comparire il timbro d'ambito (ambra, senza segno di uguale) e questo
(verde, col segno di uguale): si distinguono in fotocopia e per chi non distingue le tinte perché a
separarli è la **figura**, non il tono.

## Cosa deve fare l'app

- **Decidere lo stato una volta per fase** — autonoma, gemella, di tutto il prodotto — e passarlo ai
  due posti. Non dedurlo dal reparto né dal nome della fase.
- **Nominare le altre parti**, non questa, e usare il conteggio quando l'elenco supera le tre o
  quattro.
- **Mantenere la promessa**: se il DS dice «parametri uguali», il salvataggio deve propagare i
  parametri. Il segno dichiara un legame che l'app deve far rispettare — e non deve propagare i
  tempi.
- **Il costo non cambia**: una gemella conta su **ogni** parte, con i tempi della parte. È la
  differenza da `rg-scope-band`, che conta una volta. Se qualcuno la scambia, il costo esce sbagliato
  per difetto.
