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
