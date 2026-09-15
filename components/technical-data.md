# Technical data

Componenti per esporre dati tecnici con unità, precisione, provenienza e stato. Mono per i valori,
cifre tabulari, niente riconoscimento affidato al solo colore. Vedi
[`design-rules.md`](../design-rules.md) §8 e §10.

## Key-value (`rg-key-value`)

Coppie etichetta→valore per parametri e metadati. Valore a destra in mono.

```html
<dl class="rg-key-value">
  <dt>Materiale</dt><dd>FIL-0281</dd>
  <dt>Consumo</dt><dd>184,42 m</dd>
</dl>
```

### Variante scheda tecnica (`rg-key-value--ruled`)

Per l'anagrafica completa di un'entità: colonna etichette a larghezza fissa, righe rigate, valore
allineato a sinistra e leggibile in colonna. La variante base resta per inspector, box stretti e
riepiloghi di poche righe; questa è per liste lunghe di attributi, dove l'occhio deve scendere.

Non è una tabella: se le righe sono record confrontabili fra loro serve `rg-table`, non questa.
Sotto i 680 px la colonna etichetta collassa sopra il valore.

```html
<dl class="rg-key-value rg-key-value--ruled">
  <dt>Codice</dt><dd>RG-AR-0248</dd>
  <dt>Cliente</dt><dd>—</dd>
  <dt>Stagione</dt><dd>PE 26</dd>
  <dt>Consumo</dt><dd>184,42 m</dd>
</dl>
```

### Variante in linea (`rg-key-value--inline`, dalla 1.17.0)

**Identificativi e classificazione** di un'entità, in testata: codice RG, codice prodotto, variante,
gamma, categorie, divisioni. Coppie etichetta-valore **che vanno a capo**, senza fondo e senza
pillola.

Non serviva un componente nuovo. Quelle etichette sono coppie termine-valore, cioè un `rg-key-value`
disposto in riga. `rg-chip` è una scelta selezionabile, e `rg-badge` è per stato e classificazione
breve, al massimo tre per riga.

- **Ogni valore ha il suo termine.** «Borse» da solo non dice se è una gamma o una categoria.
- **Identificativi in mono**: `<dd class="rg-mono">`. Classificazione nel corpo del testo.
- **Più valori per un termine**: un `<dd>` ciascuno, il separatore lo mette il DS.
- **La coppia che distingue questa entità dalle sorelle** (la variante di un proto) è
  `rg-key-value__pair--distinct`: contorno nero e peso medio, **non** un fondo nero. Una sola per
  elenco, e per prima. Il fondo nero usato finora su «VARIANTE» e sulle divisioni faceva del colore
  una gerarchia, e lo stesso nero era usato per due cose diverse.
- Per la **scheda completa** dell'entità (tutti gli attributi, da leggere in colonna) resta
  `--ruled`; per i **dati di una riga** resta `rg-page-header__meta`.

```html
<dl class="rg-key-value rg-key-value--inline">
  <div class="rg-key-value__pair rg-key-value__pair--distinct"><dt>Variante</dt><dd>Rosso</dd></div>
  <div class="rg-key-value__pair"><dt>RG</dt><dd class="rg-mono">RG20260140-P</dd></div>
  <div class="rg-key-value__pair"><dt>Cod.</dt><dd class="rg-mono">M1424EFI</dd></div>
  <div class="rg-key-value__pair"><dt>Gamma</dt><dd>Borse</dd></div>
  <div class="rg-key-value__pair"><dt>Categorie</dt><dd>Tote</dd><dd>Shopping</dd></div>
  <div class="rg-key-value__pair"><dt>Divisioni</dt><dd>Alta moda</dd></div>
</dl>
```

Il `<div>` che raggruppa `dt` e `dd` è HTML valido dentro un `<dl>` e tiene insieme la coppia quando
la riga va a capo. La data di assegnazione del codice, oggi in un `title`, va nella scheda completa
(`--ruled`), non in un suggerimento: non è il nome di un'azione.

## Debug, log, version (`rg-debug`, `rg-log-line`, `rg-version`)

Output tecnici selezionabili in mono. Il log è a colonne (ora · livello · messaggio); il blocco
debug è monospazio scuro; il tag versione è compatto.

```html
<div class="rg-log-line"><span class="rg-log-line__time">14:32:08</span><span>INFO</span><span>block_07 parsed</span></div>
<pre class="rg-debug">result_m 184.421
status   VALID</pre>
<span class="rg-version">v3.2.1</span>
```

## Progress (`rg-progress`)

Avanzamento di un calcolo o processo, con meta (etichetta + percentuale) e barra. La percentuale è
guidata dalla variabile `--progress`.

```html
<div class="rg-progress">
  <div class="rg-progress__meta"><span>Analisi file</span><span class="rg-mono">72%</span></div>
  <div class="rg-progress__track"><div class="rg-progress__value" style="--progress:72%"></div></div>
</div>
```

## Confidence (`rg-confidence`)

Grado di affidabilità di un dato stimato, come scala a 10 tacche più il valore numerico. Le tacche
attive hanno la classe `on`. Accompagnare sempre col valore: la scala non basta da sola.

```html
<div class="rg-confidence">
  <span class="rg-label">Confidence</span>
  <span class="rg-confidence__scale"><i class="on"></i><i class="on"></i><i class="on"></i><i></i></span>
  <strong class="rg-mono">0.91</strong>
</div>
```

## Consumption row (`rg-consumption-row`)

Riga di consumo materiale/filo con barra proporzionale (variabile `--consumption`), valore in mono
e stato. Vedi anche il pattern [`consumption`](../patterns/consumption.md).

```html
<div class="rg-consumption-row">
  <div><strong>Viscosa opaca 40</strong><div class="rg-small rg-mono">FIL-0281 · THREAD</div></div>
  <div class="rg-consumption-row__bar"><span style="--consumption:78%"></span></div>
  <strong class="rg-mono">184,42 m</strong>
  <span class="rg-badge rg-badge--validated">Validato</span>
</div>
```
