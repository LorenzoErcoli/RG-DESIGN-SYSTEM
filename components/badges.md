# Badges

## Scopo

Mostrare stato, classificazione o provenienza con ingombro ridotto.

## Varianti

| Classe | Asse | Significato |
| --- | --- | --- |
| `rg-badge--draft` | status | bozza, non ancora sottoposta |
| `rg-badge--review` | status | in revisione, in attesa di giudizio |
| `rg-badge--validated` | status | validato, riferimento buono |
| `rg-badge--archived` | status | archiviato, fuori dal flusso attivo (bordo tratteggiato) |
| `rg-badge--pending` | pipeline | in coda, non ancora elaborato (pallino vuoto) |
| `rg-badge--parsed` | pipeline | file interpretato, contenuto disponibile |
| `rg-badge--estimated` | source | valore stimato, non rilevato |
| `rg-badge--unresolved` | source | riferimento non risolto |
| `rg-badge--material` `--thread` `--operation` | category | tipo di record |
| `rg-badge--season-sage` `--season-blue` | category | accento stagionale, mai su stato primario |
| `rg-badge--count` | forma | quantità breve; si compone con una variante semantica |

Non esistono `--in-review` né `--success`: il ciclo di vita ha un solo nome per stato.
`--draft`, `--archived` e `--pending` sono neutri di proposito — sono assenze di giudizio,
non giudizi, e non devono competere con validato/errore nella stessa riga.

### Segnalino «N proposte» (1.30.0)

Accanto al nome di una parte in una tabella, o accanto a una fase nel percorso, il numero di
[proposte di modifica](proposal.md) da decidere è `rg-badge rg-badge--review rg-badge--count`: `--review` vuol
dire proprio «in attesa di giudizio», `--count` è la forma breve di una quantità. Nessuna classe nuova. Con la
parola, non il solo numero: «2 proposte».

```html
<span class="rg-badge rg-badge--review rg-badge--count">2 proposte</span>
```

## Uso e limiti

Usare solo per metadati brevi, non per azioni o frasi. Il testo resta sempre presente: il colore
non basta. Nessuna variante si distingue dalle altre **solo** per colore: `--pending` ha il
pallino vuoto, `--archived` il bordo tratteggiato, `--count` nessun pallino. Il badge resta
sempre su superficie bianca con hairline: niente riempimenti pastello, che appiattirebbero la
gerarchia e romperebbero il contrasto. Palette stagionale ammessa per categorie e stati
secondari; errori e warning usano token semantici stabili. Evitare più di tre badge per riga.

## Struttura

Testo compatto, bordo 1 px, radius pill (radius compatto per category e count).

```html
<span class="rg-badge rg-badge--validated">Validato</span>
<span class="rg-badge rg-badge--estimated">Dato stimato</span>
<span class="rg-badge rg-badge--draft">Bozza</span>
<span class="rg-badge rg-badge--archived">Archiviato</span>
<span class="rg-badge rg-badge--pending">In attesa</span>
<span class="rg-badge rg-badge--parsed">Interpretato</span>
<span class="rg-badge rg-badge--count rg-badge--estimated">3 anomalie</span>
```

Il badge `--count` porta sempre l'unità o il sostantivo accanto al numero: `3 anomalie`, non `3`.


### Quando il badge non basta: il timbro d'ambito (1.31.0)

Dire che una fase vale per **tutto il prodotto** e non per una parte non è classificare un record fra
i suoi pari: è dire che quella fase **non è come le altre** della pagina. Un `rg-badge` lì è troppo
timido — 20 px con filetto grigio, in una testa che ha già un numero nero da 32 e un titolo da 28 —
e soprattutto è ciò che il badge per contratto non può fare: riempirsi. Il segno è
[`rg-scope-mark` / `rg-scope-band`](scope.md): campitura piena nel colore d'ambito
(`--rg-color-scope`, ambra dalla 1.32.0, che non è il colore d'avviso), parola in **nero**, contorno
nero, quadro. Il timbro d'ambito e un `rg-badge--warning` non si confondono, ed è la ragione per cui
il badge non si riempie: il primo è una campitura, il secondo un filetto con le parole su bianco.
