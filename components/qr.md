# QR (contenitore del codice QR)

## Scopo

Il **posto** di un codice QR su un documento stampato: lo dimensiona, lo tiene quadrato e nitido, gli mette
sotto una didascalia che dice dove porta. L'immagine **non** è del DS: la genera l'app, di norma come SVG
inline. Nasce con la [pagina della parte](part-sheet.md) (proposta 1.25.0), per riaprire la parte nel
sistema dal foglio in reparto.

## Varianti

| Classe | Misura | Quando |
| --- | --- | --- |
| `rg-qr` | 104 px (~27,5 mm) di lato | Pagina della parte: si legge da un telefono a braccio teso. |
| `rg-qr--small` | 60 px (~15,9 mm) di lato | Intestazione di altre pagine, la testata della [pagina della parte](part-sheet.md). |
| `rg-qr--inline` | (si combina) | Didascalia **a sinistra** del codice, allineata in basso, invece che sotto: il QR non aggiunge altezza a una testata bassa (1.26.0). Nel markup la didascalia resta dopo l'immagine. |

| Elemento | Cosa porta |
| --- | --- |
| `rg-qr__img` | Il riquadro quadrato; dentro l'`<svg>` (o `<img>`) generato dall'app, stirato al 100%. |
| `rg-qr__caption` | Didascalia piccola sotto, centrata: «Apri la parte in RG». |

## Uso e limiti

**Nitido.** Sull'SVG il DS mette `shape-rendering: crispEdges` (e `image-rendering: pixelated` su un
`<img>`): i moduli restano quadrati pieni, senza bordi sfumati, a schermo e in stampa. Generare l'SVG con un
`viewBox` in moduli (per esempio 29 × 29 per un QR da 21 con la zona di rispetto) e nessuna `width`/`height`
fissa: la misura la dà il contenitore.

**La zona di rispetto sta nell'SVG.** Un QR vuole 4 moduli bianchi intorno. Il contenitore non ha bordo né
padding proprio, perché un filetto attaccato al codice ne disturba la lettura: la zona di rispetto la genera
l'app dentro l'immagine (`border=4` nelle librerie comuni). Un QR da 21 moduli + 8 di rispetto su 27,5 mm dà
moduli da ~0,95 mm; in `--small` ~0,55 mm, ancora leggibile da telefono se l'URL è corto (versione 1–3).

**Nero su bianco, sempre.** Nessun colore di stagione, nessun logo al centro: in fotocopia deve leggersi lo
stesso. I riempimenti dell'SVG sono contenuto, non sfondi CSS: si stampano senza `print-color-adjust`.

**Ha un nome.** L'SVG porta `role="img"` e `aria-label` con dove porta; la didascalia lo ripete per chi legge
la carta. In `--small` la didascalia si può omettere se accanto c'è già scritto cosa identifica.

**Nell'intestazione di pagina** stampata sul PDF il QR lo mette l'app direttamente sul PDF, a 16 mm: vedi le
[misure](worksheet-block.md#intestazione-di-pagina). `rg-qr--small` serve quando il QR sta nell'HTML.

## Struttura

```html
<figure class="rg-qr">
  <div class="rg-qr__img">
    <svg viewBox="0 0 29 29" role="img" aria-label="QR: apri la parte in RG"><!-- moduli --></svg>
  </div>
  <figcaption class="rg-qr__caption">Apri la parte in RG</figcaption>
</figure>
```

Piccolo, in linea (la testata della pagina della parte):

```html
<figure class="rg-qr rg-qr--small rg-qr--inline">
  <div class="rg-qr__img"><svg viewBox="0 0 29 29" role="img" aria-label="QR: apri la parte in RG"><!-- moduli --></svg></div>
  <figcaption class="rg-qr__caption">Apri la parte in RG</figcaption>
</figure>
```

Piccolo:

```html
<figure class="rg-qr rg-qr--small">
  <div class="rg-qr__img"><svg viewBox="0 0 29 29" role="img" aria-label="QR: apri la parte in RG"><!-- moduli --></svg></div>
</figure>
```
