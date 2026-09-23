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
| `rg-qr--inline` | (si combina) | Didascalia **a sinistra** del codice, allineata in basso, invece che sotto: il QR non aggiunge altezza a una testata bassa (1.26.0). Nel markup la didascalia resta dopo l'immagine. Dalla **1.34.0** la didascalia sta su **una riga sola**: una didascalia di due parole che va a capo perché il posto è stretto si riprende l'altezza che `--inline` esiste per risparmiare. Se non ci sta, a cedere è l'elemento accanto. |

| Elemento | Cosa porta |
| --- | --- |
| `rg-qr__img` | Il riquadro quadrato; dentro l'`<svg>` (o `<img>`) generato dall'app, stirato al 100%. |
| `rg-qr__caption` | Didascalia piccola sotto, centrata: «Apri la parte in RG». |

## Uso e limiti

**Nitido, e senza `crispEdges` (1.40.0).** Sull'SVG il DS dichiara `shape-rendering: geometricPrecision`;
`image-rendering: pixelated` resta, ma solo sull'`<img>`, dove un QR raster ce l'ha davvero. Generare l'SVG
con un `viewBox` in moduli (per esempio 29 × 29 per un QR da 21 con la zona di rispetto) e nessuna
`width`/`height` fissa: la misura la dà il contenitore.

> **Perché `crispEdges` faceva sparire il codice.** Un QR inline non è un'immagine a pixel, è un
> **tracciato**: le librerie comuni lo disegnano come linee orizzontali con `stroke-width` di **una unità del
> viewBox**. Su un QR da 41 moduli in ~13 mm quel tratto è più sottile del passo della griglia del
> dispositivo, e `crispEdges` — che aggancia i bordi del tratto a quella griglia — invece di tenere il nero
> netto lo fa **evaporare**. Misurato sul PDF del fascicolo a 600 dpi, sul riquadro del solo QR: con
> `crispEdges` il pixel più scuro di tutto il codice era **217 su 255** e nessuno scendeva sotto 128 — non un
> QR sbiadito, una velatura grigia. Con `geometricPrecision`: pixel più scuro **0**, copertura scura **29%**,
> codice nitido. È la stessa lezione di [dept-mark](dept-mark.md), dove `crispEdges` storceva tondi e croci.

**La misura che conta è il modulo, non il lato.** Sotto **~0,4 mm per modulo** un QR stampato smette di farsi
leggere comodamente da un telefono in reparto. Il lato si ricava da lì — `moduli × 0,4 mm`, dove i moduli sono
quelli dei dati **più gli 8 della zona di rispetto** — e una URL più lunga vuole **più spazio**, non lo stesso
riquadro con moduli più piccoli.

| Dove | Lato | Moduli | Modulo |
| --- | --- | --- | --- |
| `rg-qr` (pagina della parte) | 104 px (~27,5 mm) | 29 | ~0,95 mm |
| `rg-qr--small` (testata della pagina della parte) | 60 px (~15,9 mm) | 37 | ~0,43 mm |
| `rg-qr--small` nel foglio compatto, **dalla 1.40.0** | 64 px (~16,9 mm) | 41 | ~0,41 mm |
| ~~`rg-qr--small` nel foglio compatto, 1.26.0 → 1.39.0~~ | ~~48 px (~12,7 mm)~~ | 41 | ~~~0,31 mm~~ |

**Quanto costa il QR grande, e perché si tiene (1.40.1).** Sul foglio del ricamo il codice a 64 px pesa
**~4 mm**. La 1.40.0 diceva che non costava niente e che il foglio teneva «18 stop»: era falso in tutte e
due le parti. Gli stop in una pagina, a grandezza vera, sono **17**; i 18 venivano da un render in cui il
foglio sforava in larghezza e Chrome rimpiccioliva tutta la pagina del ~5% — un errore di misura, non di
CSS (vedi [la checklist di verifica, §11](../agent/verify-checklist.md)). Mancano ~7 mm al diciottesimo
stop e il QR ne spiega 4: **non è il solo colpevole, e non si rimpicciolisce**. Fra un codice che si legge
e uno stop in più sulla stessa facciata, in reparto vale di più il codice — il diciottesimo va sul retro,
dove il foglio si stampa comunque fronte-retro.

> **Il QR come strumento di misura.** Proprio perché il suo lato è dichiarato qui, un `rg-qr` è il modo
> più veloce per accorgersi che una pagina è stata scalata: se `rg-qr--small` nel foglio compatto misura
> ~16,0 mm invece di ~16,9, quella pagina è al 95% e ogni conteggio di righe fatto sopra non vale.

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
