# Print anchor (ancora di stampa)

## Scopo

Un **segno invisibile** nel PDF stampato dal browser. L'app che ricompone il fascicolo legge dal PDF i
collegamenti (`<a href="https://rg.segno/…">`) per sapere dove comincia un blocco, una parte, un tagliando, e poi
li toglie. Serve un collegamento che:

- **non abbia testo**: il testo nascosto Chrome non lo porta nel PDF, e un collegamento su un testo si
  sottolinea in stampa;
- **abbia un'area**: Chrome emette l'annotazione di collegamento sul riquadro dell'elemento, e un riquadro vuoto
  non ne emette;
- **non si veda e non sposti niente**, a schermo e su carta.

Nasce con la 1.27.0, dal fascicolo compatto.

## Varianti

Nessuna. `rg-print-anchor` è un quadrato di 4 × 4 px (~1 mm, 3 × 3 pt nel PDF), trasparente, fuori dal flusso,
nell'**angolo in alto a sinistra** del contenitore.

## Uso e limiti

**Dove si mette**: come **primo figlio** di uno di questi contenitori. Il contenitore diventa posizionato solo
quando contiene un'ancora (`:has`), quindi chi non la usa non vede nessun cambiamento.

| Contenitore | Segna |
| --- | --- |
| `rg-worksheet-block` | il blocco di una fase (anche `--continued`) |
| `rg-part-sheet` o `rg-part-sheet__head` | la pagina della parte |
| `rg-cutout` | un tagliando (già posizionato di suo) |
| `rg-cutout-sheet` | il foglio dei tagliandi |

**Verificato**: con `--print-to-pdf` di Chrome, due ancore (in un blocco e in un tagliando) producono due
annotazioni `/URI` con `/Rect` di 3 × 3 pt nell'angolo interno del contenitore, dentro il filetto.

**Non è un controllo.** Nel markup `aria-hidden="true"` e `tabindex="-1"`; nel CSS `pointer-events: none`.
Non si raggiunge da tastiera, non si annuncia, non si clicca.

**Non spegnerla.** Niente `display: none`, `visibility: hidden` né `opacity: 0` sull'ancora o su un antenato:
spengono anche l'annotazione.

**L'app la toglie.** Nel PDF finale le annotazioni `rg.segno` vanno rimosse: sono istruzioni per l'impaginazione,
non collegamenti per chi legge.

## Struttura

```html
<section class="rg-worksheet-block rg-worksheet-block--compact">
  <a class="rg-print-anchor" href="https://rg.segno/blocco/7" aria-hidden="true" tabindex="-1"></a>
  <p class="rg-worksheet-block__step">Fase 1 di 3</p>
  …
</section>
```

Nel tagliando:

```html
<div class="rg-cutout">
  <a class="rg-print-anchor" href="https://rg.segno/tagliando/3" aria-hidden="true" tabindex="-1"></a>
  <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
  …
</div>
```
