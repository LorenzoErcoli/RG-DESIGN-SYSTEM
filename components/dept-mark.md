# Dept mark (segno del reparto)

## Scopo

La tessera da 20&nbsp;px che **nomina un reparto in linea**: davanti al titolo di una linguetta di
fase, in testa alla riga «Fase N di M» del blocco della fase, in un elenco, in una legenda. È la
[banda di reparto](dept-band.md) ridotta a un segno: stessa famiglia di figura, stessa palette, stessa
regola «mai il solo colore».

Nasce da una prova a schermo sulla pagina di una fase. La fascia `rg-phase-panel__band`, grigia e alta
48&nbsp;px, stava subito sotto le linguette `rg-phase-switch`: **si leggeva come il bordo delle
linguette, non come «reparto»**, e il nome del reparto era già scritto sulla linguetta. Decisione:

- **a schermo** la fascia sopra il blocco della fase si toglie; il nome del reparto va nella riga
  `__kind` come primo elemento, con la tessera davanti, e sulla linguetta resta la sola tessera;
- **sul foglio stampato** (`rg-worksheet-block`) la banda resta com'è: lì il colore e la trama a
  tutta larghezza servono a pescare il foglio dal mucchio.

**Proposta 1.21.0.** Provata la 1.20.0, il reparto in testa a `__kind` era *«tutto attaccato reparto e
fase»*, e le linguette avevano *«troppe info»*. Il reparto passa in **una riga sua** in cima al blocco
della fase ([`rg-phase-panel__department`](phase-switch.md#il-reparto-in-una-riga-sua-e-la-linguetta-essenziale-proposta-1210)),
sempre con la parola **«Reparto»** davanti; **la linguetta non porta più la tessera**. Le due forme
1.20.0 (tessera sola sulla linguetta, `rg-dept-label` in `__kind`) sono superate; la tessera resta per
la riga del reparto, gli elenchi e le legende.

## Varianti

### Le sette trame (proposta 1.21.0)

**Trama tagliata, non glifo centrato.** Giudizio sulla prima forma (1.20.0): *«la x del ricamo messa lì
sembra una x per chiudere. non va bene usata così»*. Una X sola in un quadratino col bordo è il segno
universale di «chiudi»; e la tessera aveva la forma di `rg-icon-button`: contorno da 1, angoli da 2, un
segno isolato al centro. Ricontrollate tutte e sette contro lo sprite ([icons](icons.md)) e contro i
comandi comuni:

| Variante | Prima (1.20.0) | Si leggeva come | Ora |
| --- | --- | --- | --- |
| `--ricamo` | una croce da 12 in cornice | **chiudi**, errore, casella spuntata | **crocette** da 5 in tre file sfalsate (passo 8), tagliate dal bordo: punto croce |
| `--stampa` | goccia e raggio attaccati, due linee, in cornice | **registra · pausa**, scheda con immagine | **gocce** da 4 e **raggi** 2×6 alternati a passo 10, tagliati dal bordo; **due linee** sotto |
| `--pressatura` | due piastre sopra, due sotto, filo, in cornice | **tabella**, layout | **due file di piastre** 6×4 a passo 8, tagliate dal bordo, **filo** in mezzo |
| `--strass` | quattro pois in cornice | **dado**, griglia di app | **pois** da 4 sfalsati a passo 8: tessuto a pois |
| `--finissaggio` | scacchiera | nessun comando | figura invariata, senza cornice |
| `--incollature` | diagonali spesse | nessun comando | figura invariata, senza cornice |
| `--accoppiaggi` | una coppia di barre al centro | **pausa** | **coppie di linee** da 2, luce 1, passo 10, alte quanto la tessera e tagliate dal bordo |
| *(nessuna)* | vuota, tratteggiata | segnaposto, non un comando | invariata: vuota, **bordo tratteggiato**, nessun fondo |

**La tessera, per tutte e sette:** nessun contorno, angoli vivi, fondo `--rg-color-surface`, e un motivo
che **continua oltre il taglio** (sempre più di una ripetizione, e almeno un elemento tagliato dal bordo).
Un'icona è un segno isolato con margine attorno; un campione di stoffa è una trama che il bordo
interrompe. Nessuna tessera ha più la forma di un bottone: `rg-icon-button` ha contorno e angoli tondi,
la tessera no.

Scartate per il ricamo: **una griglia 3×3 intera** di crocette (una fila di «chiudi»), **due crocette
2×2** (ancora un glifo), **punto filza** (trattini in fila: la famiglia di stampa e pressatura),
**zigzag** (esce dalla famiglia della banda, che è a croci).

La trama della banda **scalata** a 20&nbsp;px non regge (le croci a passo 24 non ci stanno), quindi ogni
tessera resta una **riduzione** nella stessa famiglia di segno, a passo più fitto.

| Variante | Reparto | Figura nella banda |
| --- | --- | --- |
| `rg-dept-mark--ricamo` | Ricamo | fila di croci |
| `rg-dept-mark--stampa` | Stampa, Laser e HF | gocce e raggi alternati sopra, due linee sotto |
| `rg-dept-mark--pressatura` | Pressatura e soffiatura | fila di piastre sopra e sotto, filo in mezzo |
| `rg-dept-mark--strass` | Strass e applicazioni | pois da 8, passo 16 |
| `rg-dept-mark--finissaggio` | Finissaggio e Controllo Qualità | scacchiera da 8 |
| `rg-dept-mark--incollature` | Incollature | diagonali da 8, passo 16 |
| `rg-dept-mark--accoppiaggi` | Accoppiaggi | coppie di linee verticali |
| *(nessuna variante)* | **Reparto da assegnare** | banda senza trama |

| Modificatore | Quando |
| --- | --- |
| `rg-dept-mark--quiet` | **A schermo, sempre.** La trama (e il tratteggio di «da assegnare») prende il colore del **testo intorno** (`currentColor`); il fondo resta `--rg-color-surface`. |

**Perché `--quiet` usa il colore del testo e non il grigio della banda.** La banda sobria usa
`neutral-400`: su 48&nbsp;px di trama basta. Su una tessera da 20&nbsp;px con segni da 2&nbsp;px quel
grigio (~2,8:1 sul bianco) non regge. Il colore del testo regge quanto il testo che la tessera
accompagna: grigio secondario sulla linguetta non scelta, nero sulla scelta e in hover, grigio scuro
d'etichetta nella riga `__kind`. Nessun colore di reparto accanto ai badge di stato, per la stessa
ragione della banda: `category-3/4/5` sono `danger`, `warning` e `success`.

**I colori pieni** (le sette varianti senza `--quiet`) servono dove non convivono stati: una legenda
stampata, un documento. Sul `sabbia` e sul `salvia` (accoppiaggi, incollature) il segno è chiaro:
reggono la forma, non il tono.

### Le coppie da tenere d'occhio a questa misura

- **Pois e scacchiera**: tondi staccati e sfalsati contro quadretti che si toccano agli angoli. Si
  separano per forma e disposizione, non per tono.
- **Ricamo e incollature**: due famiglie diagonali. Il ricamo è fatto di **crocette staccate** e sottili,
  le incollature di **diagonali continue e spesse**.
- **Stampa e pressatura**: entrambe con righe orizzontali. La stampa ha tondi e tratti verticali sopra e
  due linee sotto; la pressatura due file di rettangoli attorno a un filo.

## Uso e limiti

**La tessera non porta il nome: lo porta il markup.** Due forme soltanto:

- **tessera + nome scritto** (`rg-dept-label`): la tessera è `aria-hidden="true"`, il nome è testo;
- **tessera sola**, dove il nome è già vicino in altra forma (la linguetta): la tessera ha
  `role="img"` e `aria-label="Reparto: <nome>"`, più `title` per chi usa il puntatore.

Mai tessera sola e muta. Il nome è quello del reparto («Pressatura e soffiatura»), non lo slug della
variante.

**La parola «Reparto» davanti al nome** (proposta 1.21.0): `rg-dept-label__kind`, etichetta maiuscola
a 12&nbsp;px nel colore d'etichetta, seguita da uno spazio vero. Si legge «Reparto Ricamo», «Reparto
Pressatura e soffiatura», «Reparto da assegnare», e si usa **ovunque** il reparto sia nominato in linea.
Non va nel `aria-label` della tessera sola (che dice già «Reparto: …»). Sulla banda stampata il testo
è quello che passa l'applicazione in `rg-dept-band__name`: per coerenza, lo stesso «Reparto …».

**Non alza la riga.** La tessera è 20&nbsp;px e le righe da 12 e 14&nbsp;px del DS sono alte ~17: dentro
`rg-dept-label` e dentro `rg-phase-switch__title` sporge di 2&nbsp;px sopra e sotto con un margine
negativo. Il numero della fase resta sul filo del titolo.

**Non è una banda e non la sostituisce su carta.** Sul foglio stampato resta `rg-dept-band` a colori:
la tessera è troppo piccola per essere trovata in un mucchio di fogli. In stampa, se c'è, arriva con
le sue campiture (`print-color-adjust` in `rg-utilities.css`).

**Non è un badge, non è un'icona, non è interattiva.** Non ha stati propri: cambia colore solo perché
cambia il testo intorno. Non va dentro `rg-icon-button`, e non si usa per filtrare.

**Non è la pastiglia della parte.** La parte è un **tondo** colorato col numero
([part-mark](part-mark.md)), la fase un **quadrato nero** col numero, il reparto una **tessera
quadrata con una figura e nessun numero**. Tre forme, tre contenuti.

**Una figura nuova** (un ottavo reparto) si disegna due volte: la trama della banda e la sua
riduzione. Le misure vengono dalla scala (4, 8, 12, 16, e i filetti 1 e 2). Dalla proposta 1.21.0 la
riduzione è una **trama tagliata dal bordo**, mai un segno isolato al centro: prima di aggiungerla si
mette accanto alle icone dello sprite (tavola «Accanto alle icone» in vetrina) e non deve ricordarne
nessuna, né un comando comune (chiudi, pausa, menu, griglia). Le variabili sono `--rg-dept-mark-color`,
`-pattern`, `-size`, `-position`, `-repeat`, `-edge`, `-fill` (e `-cross` per il ricamo): non
`--rg-dept-*`, perché le variabili si ereditano e una tessera dentro una banda ne prenderebbe la trama.

**Non ha la forma di un bottone** (proposta 1.21.0): nessun contorno e angoli vivi, a differenza di
`rg-icon-button`. Solo «da assegnare» ha un bordo, tratteggiato.

## Struttura

Tessera, «Reparto» e nome, ovunque serva nominare un reparto in linea (proposta 1.21.0):

```html
<span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Pressatura e soffiatura</span>
```

Reparto da assegnare:

```html
<span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> da assegnare</span>
```

**Nel blocco della fase**, la riga sua (proposta 1.21.0), primo figlio del blocco:

```html
<p class="rg-phase-panel__department"><span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--ricamo rg-dept-mark--quiet" aria-hidden="true"></span><span class="rg-dept-label__kind">Reparto</span> Ricamo</span></p>
```

**Superato dalla proposta 1.21.0 — sulla linguetta di una fase**, davanti al titolo (tessera sola, col
nome per le tecnologie assistive). La linguetta ora porta solo numero, titolo e conteggio:

```html
<button class="rg-phase-switch__item rg-phase-switch__item--principal" type="button" role="tab" aria-selected="true" …>
  <span class="rg-phase-switch__num">2</span>
  <span class="rg-phase-switch__text">
    <span class="rg-phase-switch__role">Principale</span>
    <span class="rg-phase-switch__title"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" role="img" aria-label="Reparto: Pressatura e soffiatura" title="Pressatura e soffiatura"></span>Pressatura</span>
  </span>
  <span class="rg-phase-switch__aside">…</span>
</button>
```

**Superato dalla proposta 1.21.0 — in testa alla riga `__kind`** del blocco della fase: *«tutto
attaccato reparto e fase»*. Il reparto va in `rg-phase-panel__department`, sopra. Vedi
[phase-switch](phase-switch.md#il-reparto-senza-fascia-1200).

```html
<p class="rg-phase-panel__kind">
  <span class="rg-dept-label"><span class="rg-dept-mark rg-dept-mark--pressatura rg-dept-mark--quiet" aria-hidden="true"></span>Pressatura e soffiatura</span>
  <span>Fase 2 di 6</span>
  <span>Rimozione garze · con la 3</span>
</p>
```
