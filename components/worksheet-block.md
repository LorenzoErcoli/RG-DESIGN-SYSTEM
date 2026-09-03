# Worksheet block (blocco di lavorazione stampabile)

## Scopo

L'unità **stampabile** di una fase di lavorazione: quello che oggi è un foglio cartaceo che esce
dalla stampante, va in reparto, viene compilato a penna dall'operatore e torna in ufficio prodotto.
Un prodotto ha più parti, ogni parte ha più fasi, ogni fase appartiene a un reparto: **un blocco =
una fase**.

Due decisioni portano tutto il resto:

1. **Non occupa una pagina intera.** La maggior parte delle fasi ha poco da dire. I blocchi si
   impaginano uno dopo l'altro finché entrano, così la carta non si spreca. Il blocco non dichiara
   nessuna altezza: è alto quanto il suo contenuto.
2. **Non si spezza mai fra due pagine.** In reparto il retro del foglio non lo gira nessuno, e
   mezzo blocco è peggio di mezza pagina bianca. Il blocco che non entra scende **intero** alla
   pagina successiva.

La paginazione vive in `styles/rg-utilities.css`, dentro l'unico `@media print` del DS: nessuna app
riscrive il proprio.

## Varianti

| Variante | Quando |
| --- | --- |
| `rg-worksheet-block` | **Normale**: la fase ordinaria, alta quanto il suo contenuto, mai spezzata. |
| `rg-worksheet-block--long` | **Lunga**: la fase con una tabella di trenta righe, che una pagina se la prende tutta. Apre una pagina nuova invece di lasciarsi dietro un buco; se è il primo blocco del documento non apre una pagina vuota prima. |

`--long` non cambia nulla a schermo: è **solo** una regola di paginazione. Non usarla per "dare
importanza" a una fase — l'importanza non è una proprietà della carta.

## Uso e limiti

**È riquadrato, ed è un'eccezione dichiarata.** Le regole (§6) dicono di non incorniciare tutto e
di non trasformare ogni contenuto in una card. Su carta il riquadro fa un lavoro che a schermo fa
l'hover: rende il blocco *separabile* dal blocco che gli sta sotto, quando entrambi sono sulla
stessa facciata e la fotocopia ha appiattito tutto. Eccezione motivata, ambito: documenti stampati.

**La banda è obbligatoria.** Il primo figlio del blocco è una [`rg-dept-band`](dept-band.md): il
foglio che arriva in reparto deve dire a quale reparto appartiene senza che nessuno lo legga per
intero. Un blocco senza banda è un foglio anonimo nel mucchio.

**I buchi sono voluti.** I valori che l'operatore rileva (temperatura, tempo, tensioni) **non** si
stampano vuoti come celle vuote: si stampano come [`rg-fill-field`](fill-field.md), che dichiara
dove si scrive. Un vuoto senza etichetta e senza riga sembra un errore di rendering.

**Formato pagina.** Il blocco non decide la geometria del foglio: la decide il documento. Se serve
A4 verticale con margini uniformi, l'opt-in è `rg-u-print-a4` sul contenitore che stampa (di norma
il `<body>`); dove le *named pages* non sono supportate restano i margini di default e non si rompe
niente.

**Limite noto — `--long` che sfora.** Se la tabella supera comunque il foglio, il blocco si spezza
fra righe con l'intestazione della tabella ripetuta, ma **la banda di reparto non si ripete**: la
pagina di continuazione perde il suo segnale di reparto. Non è un difetto che il CSS possa
risolvere. Se una fase produce più di una pagina di tabella, va spezzata a monte in **due blocchi**,
ciascuno con la sua banda.

**Non è a schermo.** Il blocco è la vista di stampa. La stessa fase, a schermo, si legge con
`rg-section-card` o `rg-steps` e si compila con `rg-field`: lì i controlli esistono davvero.

## Struttura

```html
<section class="rg-worksheet-block">
  <p class="rg-dept-band rg-dept-band--pressatura">
    <span class="rg-dept-band__name">Pressatura e soffiatura</span>
    <span class="rg-dept-band__note">Fase 03 / 07</span>
  </p>
  <header class="rg-worksheet-block__head">
    <span class="rg-worksheet-block__index">03</span>
    <h3 class="rg-worksheet-block__title">Pressatura fondo</h3>
    <p class="rg-worksheet-block__meta">RG-2026-0481 · parte 2 di 5 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
    <div class="rg-worksheet-block__fields">
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Temperatura <span class="rg-fill-field__unit">°C</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Tempo <span class="rg-fill-field__unit">s</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
      <div class="rg-fill-field">
        <span class="rg-fill-field__label">Pressione <span class="rg-fill-field__unit">bar</span></span>
        <span class="rg-fill-field__line"></span>
      </div>
    </div>
  </div>
  <footer class="rg-worksheet-block__foot">
    <div class="rg-fill-field rg-fill-field--inline">
      <span class="rg-fill-field__label">Operatore</span>
      <span class="rg-fill-field__line"></span>
    </div>
    <div class="rg-fill-field rg-fill-field--inline">
      <span class="rg-fill-field__label">Ora</span>
      <span class="rg-fill-field__line"></span>
    </div>
  </footer>
</section>
```

Variante **lunga** — la fase con la tabella da compilare riga per riga:

```html
<section class="rg-worksheet-block rg-worksheet-block--long">
  <p class="rg-dept-band rg-dept-band--ricamo">
    <span class="rg-dept-band__name">Campionario Ricamo</span>
  </p>
  <header class="rg-worksheet-block__head">
    <span class="rg-worksheet-block__index">01</span>
    <h3 class="rg-worksheet-block__title">Controllo tensioni per capo</h3>
    <p class="rg-worksheet-block__meta">RG-2026-0481 · rev. 04</p>
  </header>
  <div class="rg-worksheet-block__body">
    <table class="rg-table rg-table--compact">
      <thead>
        <tr><th scope="col">#</th><th scope="col">Capo</th><th scope="col">Tensione (cN)</th><th scope="col">Esito</th></tr>
      </thead>
      <tbody>
        <tr>
          <td class="rg-table__code">01</td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
          <td class="rg-fill-field rg-fill-field--cell"></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

Documento stampabile, geometria opt-in:

```html
<body class="rg-u-print-a4">
```
