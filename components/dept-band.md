# Dept band (banda di reparto)

## Scopo

La banda che, sul bordo di un blocco di lavorazione, dice **a quale reparto appartiene questo
foglio**. Serve a trovarlo nel mucchio e a smistarlo, non a decorarlo.

Il vincolo che decide la forma: **il foglio viene quasi sempre fotocopiato in bianco e nero**, e il
colore si perde. Quindi la banda porta **tre segnali ridondanti**, sempre tutti e tre:

| Segnale | Cosa fa | Cosa gli succede in fotocopia |
| --- | --- | --- |
| **(a) Colore** | acceleratore: trovare il foglio a colpo d'occhio | si perde, o diventa un grigio ambiguo |
| **(b) Nome** in maiuscolo sulla banda | l'informazione, in chiaro | resta, ma va letto |
| **(c) Figura** (la trama) | riconoscimento immediato senza leggere | **resta intatta** |

Il colore è un acceleratore, **mai** l'unica informazione — è la regola generale del DS («nessuno
stato dipende dal solo colore», regole §4) applicata a un supporto che il colore lo perde davvero.

## Il criterio della figura: riconoscibile, non distinguibile

Questa è la parte che non si vede da dentro il design system, ed è arrivata dal reparto.

Sette trame geometriche qualsiasi sono **distinguibili**: messe in fila, si vede che sono sette
cose diverse. Ma una trama arbitraria va poi **imparata a memoria** — chi pesca il foglio dal
mucchio dovrebbe ricordarsi che il tratteggio a 45° era la stampa. Una trama che **evoca il lavoro
del reparto** si riconosce al primo colpo e non si impara: si capisce.

Da qui la regola: **la figura nomina il reparto**. I pois sono strass. Le croci sono il punto
croce. Le due linee appaiate sono due strati accoppiati. La bandiera a scacchi è il traguardo, e
il finissaggio è l'ultimo reparto.

E da qui la regola derivata, che è quella operativa: **due reparti non stanno mai nella stessa
famiglia di segno**. Le famiglie in uso sono croci, due registri, dorsi, pois, scacchiera,
diagonale, coppie. Il **verso** di una diagonale, dopo una fotocopia e a dimensione di banda, non è
una differenza — è l'errore della prima versione, dove stampa (45°, sottile) e pressatura (−45°,
spessa) si confondevano. E non lo è nemmeno il **tono**: il reticolo ortogonale del finissaggio era
fatto di barre verticali come gli accoppiaggi e si distingueva solo perché più scuro, che in
fotocopia spinta non è una differenza. Il tono non fonda una famiglia.

## Varianti

| Variante | Reparto | Figura | Perché quella |
| --- | --- | --- | --- |
| `rg-dept-band--ricamo` | Campionario Ricamo | fila di croci | è il **punto croce** |
| `rg-dept-band--stampa` | Stampa, Laser e HF | due registri: gocce e raggi alternati sopra, due linee sotto | in alto una **goccia d'inchiostro** e una **punta di laser**, in basso le **due linee** della stampa: i mestieri sono due e la figura li nomina entrambi |
| `rg-dept-band--pressatura` | Pressatura e soffiatura | dorsi pieni ai bordi, centro vuoto | sono le **due piastre** della pressa, col materiale in mezzo |
| `rg-dept-band--strass` | Strass e applicazioni | pois | **sono strass** |
| `rg-dept-band--finissaggio` | Finissaggio e Controllo Qualità | scacchiera | è la **bandiera a scacchi**: il traguardo, ed è l'ultimo reparto |
| `rg-dept-band--incollature` | Incollature | diagonali spesse | sono le **strisciate della spalmatura** |
| `rg-dept-band--accoppiaggi` | Accoppiaggi | coppie di linee verticali | accoppiare è **unire due strati** |

Senza variante la banda esiste comunque: filetto nero, nessuna campitura. È il caso «reparto non
assegnato», e si legge come tale.

Il nome della variante apre con il **lavoro prevalente** del reparto, non con la macchina più
vistosa: `--stampa`, non `--laser`. Il reparto «Stampa, Laser e HF» è quello dove stanno le
stampanti, e chi guardava una banda marcata `laser` diceva «manca stampa».

## Uso e limiti

**Il nome è contenuto, non CSS.** `rg-dept-band__name` è testo nel markup, non `content:` generato.
Se il CSS non arriva — mail, export, un PDF renderizzato male — la parola resta. La targhetta è
bianca opaca con filetto nero perché il nome deve restare leggibile **sopra qualsiasi figura**. E
va scritto il **nome del reparto**, non lo slug della variante: sono due cose diverse e solo una
delle due si legge in reparto.

**Il maiuscolo è ammesso qui** perché è una micro-label identitaria di due o tre parole, come
`rg-label`. Le regole vietano il maiuscolo in *paragrafi e tabelle dense* (§2), non su un'etichetta.

**La figura è una campitura, non un gradiente.** Tecnicamente è un `repeating-linear-gradient` (o un
`radial-gradient` per i pois) a stop netti, ma non è decorazione: porta informazione, ed è l'unico
segnale che sopravvive alla fotocopia. Eccezione dichiarata alle regole §2, ambito: documenti
stampati (regole §12).

**In stampa serve `print-color-adjust`.** I browser per default non stampano gli sfondi: senza la
riga in `rg-utilities.css` la banda arriverebbe sulla carta con due segnali su tre spenti. È già
gestito dal DS, l'app non deve fare nulla.

**Quanto inchiostro porta la figura.** Le sette non pesano uguale, e conviene sapere quali sono
gli estremi. La **scacchiera** del finissaggio è la più carica (metà della banda, in quadretti pieni
da 8&nbsp;px) ed è anche la più indistruttibile: un quadretto pieno non lo schiarisce nessuna
fotocopia. All'estremo opposto, **incollature e accoppiaggi** usano i valori più chiari della
palette: reggono perché il segno resta — diagonali spesse e coppie di linee sono forme, non toni —
ma sono le prime da guardare quando si prova la stampa su una macchina nuova.

**La stampa è la figura più stretta.** Due registri in una banda da 32&nbsp;px vogliono tutto lo
spazio che c'è: registro alto 0–16, registro basso 18–30 dell'area utile. **Ci stanno, senza
margine.** È il limite dichiarato di questa figura: se un giorno la banda si abbassa, o se il font
identitario rimpicciolisce la targhetta e con lei l'altezza della banda, questa è la prima che si
impasta — e va rifatta, non compressa. Per la stessa ragione la goccia è un cerchio da
8&nbsp;px e non di più, e il raggio un tratto da 2: sono le misure massime che lasciano respirare
i due registri.

In vetrina c'è la tavola apposta per verificarlo: *prova di sforzo*, grigio più contrasto
schiacciato.

**Come si aggiunge una figura.** La variante dichiara `--rg-dept-color` (il filetto) e
`--rg-dept-pattern` (la campitura); `--rg-dept-size`, `--rg-dept-position` e `--rg-dept-repeat`
servono solo quando la figura è un **segno unico** e non un motivo che si ripete — è il caso del
punto croce e dei pois (una tessera che si ripiastrella), o quando i registri sono più di uno
(stampa). Le misure
vengono dalla scala di spazio: nessun pixel arbitrario.

**Il colore riusa la palette categoriale** `--rg-color-category-1…7`, che a sua volta è un alias di
valori già in palette: nessun colore nuovo entra nel brand. **Conseguenza da conoscere**:
`category-3/4/5` valgono quanto `danger`, `warning` e `success`. Su una scheda di lavorazione
stampata non c'è nessun colore di stato accanto, e il nome del reparto è scritto sulla banda,
quindi una banda rossa non si legge come «errore». **Non** mettere `rg-dept-band` in una vista a
schermo dove convivono alert e badge di stato senza aver deciso cosa succede a quella lettura.

**Il legame con l'organigramma è dichiarato.** Le sette varianti hanno il nome dei sette reparti RG
perché sono sette e sono stabili, e perché in un template il nome parla mentre un numero no. Se
nasce un ottavo reparto si aggiunge un'ottava variante — con una figura di una famiglia di segno
non ancora usata. La mappa reparto → variante vive nell'app, non in un `if` sparso nel markup.

**Non è un badge.** `rg-badge` classifica un record dentro una lista a schermo; questa è
un'intestazione di appartenenza sul bordo di un documento. Non ha stati, non è interattiva.

## Struttura

```html
<p class="rg-dept-band rg-dept-band--strass">
  <span class="rg-dept-band__name">Strass e applicazioni</span>
  <span class="rg-dept-band__note">Fase 05 / 07</span>
</p>
```

Come primo figlio di un blocco di lavorazione, a filo dei suoi bordi:

```html
<section class="rg-worksheet-block">
  <p class="rg-dept-band rg-dept-band--stampa">
    <span class="rg-dept-band__name">Stampa, Laser e HF</span>
  </p>
  <header class="rg-worksheet-block__head">…</header>
</section>
```
