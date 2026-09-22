# Worksheet foot (piede del gruppo di fasi)

## Scopo

Il piede che si compila **alla fine del lavoro**: Operatore, Data e una nota. Sta **sotto** il
blocco della fase, fuori dal suo riquadro.

Fuori, e non dentro, per una ragione che non è di stile. Il riquadro del
[`rg-worksheet-block`](worksheet-block.md) dice *«questa è la fase, questi sono i suoi dati»*: sono
cose che il sistema sa e che ha stampato. Firma e nota dicono un'altra cosa — *«questo è ciò che è
successo quando l'ho fatta»* — e sono di chi lavora, non della scheda. Finché vivevano in
`rg-worksheet-block__foot` l'operatore scriveva **dentro la cornice dei dati stampati**, e la nota,
l'unico spazio davvero da riempire, era una riga schiacciata in fondo a una fila di campi.

Da qui la forma: **due colonne**. Operatore e Data sono due dati brevi e stanno affiancati; la nota
scavalca la fila intera, perché l'unica cosa che si scrive a mano per davvero, in frasi, è quella.

**Il piede non si compatta.** La densità compatta serve ai dati **già stampati**, non allo spazio
bianco che deve accogliere una grafia. Le righe restano quelle della base (32 px, ~8,5 mm) e la nota
è anzi **più alta** di una `rg-fill-field--tall` normale: 64 px, ~17 mm, cioè due righe scritte a
mano invece di una.

## Varianti

| Classe | Cosa fa |
| --- | --- |
| `rg-worksheet-foot` | **Base**: contenitore a due colonne, subito sotto il blocco. |
| `rg-worksheet-foot__note` | La nota che prende la fila intera e la riga alta 64 px. Si mette **insieme** a `rg-fill-field--tall`. |

Non ha varianti di densità: vedi sopra.

**Il piede è parte del foglio**, anche se sta fuori dal riquadro: dalla **1.34.0** dichiara
`text-transform: uppercase` come il blocco, così un testo stampato qui esce in maiuscolo come tutto
il resto del foglio. Vedi
[worksheet-block.md § Tutto in maiuscolo](worksheet-block.md#tutto-in-maiuscolo).

## Uso e limiti

**Uno per gruppo, non uno per fase.** Nel fascicolo compatto un gruppo di fasi collegate (stesso
reparto, una dopo l'altra) porta **una banda sola** e **un piede solo**, sotto l'ultimo blocco: si
firma il lavoro, non ogni riga del lavoro. Per una fase singola il piede sta sotto il suo blocco.

**Non sostituisce `rg-worksheet-block__foot`, lo affianca.** Il piede *dentro* il blocco resta
valido e non cambia: chi non migra non vede differenza. La scelta fra i due è di contenuto — dentro
se è un dato della fase (un'ora di ciclo rilevata), fuori se è la firma di chi l'ha fatta.

**In stampa non si spezza.** `break-inside: avoid`: Operatore, Data e la nota sono un'unica cosa da
compilare, e mezza nota in fondo a una pagina e metà in cima a quella dopo non è uno spazio dove si
scrive, è uno spazio che si salta. La regola sta in `styles/rg-utilities.css`, dentro `@media print`.

**Limite dichiarato, e misurato.** Il piede vorrebbe anche **non staccarsi** dal blocco che lo
precede (`break-before: avoid`), ma in Chrome — il motore che impagina il fascicolo — le due
richieste si escludono. Con `break-before: avoid` il fragmentatore tiene il piede attaccato al
blocco e, quando l'insieme non entra nella pagina, taglia **dentro** il piede: il riquadro della
nota esce diviso fra due fogli. Provato a riempimenti crescenti, da 860 a 980 px: con
`break-before: avoid` si spezza sempre, senza resta sempre intero. Fra *«il piede scende intero alla
pagina dopo»* e *«la nota esce tagliata a metà»* il reparto perde poco nel primo caso e tutto nel
secondo, quindi **`break-before` non si dichiara**. A rendere raro il caso ci pensa la
[compattazione di stampa](worksheet-block.md#compattazione-di-stampa-133), il cui obiettivo è
misurato proprio sul gruppo: due fasi collegate **e il loro piede** in una pagina.

Il `break-inside: avoid` è ripetuto anche sui singoli campi: se un motore ignora la regola sul
contenitore, almeno il singolo riquadro da riempire non esce diviso.

**Non è un controllo: è carta.** Vale parola per parola quanto detto per
[`rg-fill-field`](fill-field.md): niente `input`, niente focus, niente errore. A schermo lo stesso
dato si raccoglie con `rg-field`.

## Struttura

```html
<div class="rg-worksheet-foot">
  <div class="rg-fill-field">
    <span class="rg-fill-field__label">Operatore</span>
    <span class="rg-fill-field__line"></span>
  </div>
  <div class="rg-fill-field">
    <span class="rg-fill-field__label">Data</span>
    <span class="rg-fill-field__line"></span>
  </div>
  <div class="rg-fill-field rg-fill-field--tall rg-worksheet-foot__note">
    <span class="rg-fill-field__label">Note</span>
    <span class="rg-fill-field__line"></span>
  </div>
</div>
```

Sotto l'ultimo blocco di un gruppo di fasi collegate:

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">…fase 2…</section>
<section class="rg-worksheet-block rg-worksheet-block--compact rg-worksheet-block--continued">…fase 3…</section>
<div class="rg-worksheet-foot">…</div>
```
