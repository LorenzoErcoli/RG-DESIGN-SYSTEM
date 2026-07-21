# Disclosure

## Scopo

Mostrare/nascondere un blocco secondario (dettagli, opzioni avanzate, output) senza cambiare pagina.
Riduce il rumore mantenendo il contenuto raggiungibile.

## Uso e limiti

Usare per contenuto realmente secondario; non nascondere azioni o dati critici dietro un click.
Il trigger è un controllo reale (`<summary>` o `<button>`) con stato espanso comunicato ad ARIA
(`aria-expanded`) e dal segno `+`/`−`, non dal solo colore.

## Struttura

Trigger a piena larghezza → contenuto. Bordi sopra/sotto sottili; nessuna card.

```html
<details class="rg-disclosure">
  <summary class="rg-disclosure__trigger">Parametri avanzati</summary>
  <div class="rg-disclosure__content">
    <!-- campi opzionali -->
  </div>
</details>
```

In alternativa a `<details>`, applicare `is-expanded` / `is-collapsed` sul contenitore e
`aria-expanded` sul trigger per pilotare lo stato via JS.

## Variante riquadrata (`rg-disclosure--boxed`)

Sezione collassabile di una pagina lunga: intestazione su superficie chiara, corpo riquadrato.
Serve quando una scheda contiene blocchi eterogenei (anagrafica, materiali, operazioni, allegati)
e le sole linee non bastano più a separarli.

**Non è una card**: non usarla per un record, un'entità o un elemento di una griglia — per quelli
c'è `rg-card`. Se in pagina servono più di cinque sezioni riquadrate, il problema è la pagina,
non il componente: valutare le tab (`rg-tabs`) o una rotta separata.

```html
<details class="rg-disclosure rg-disclosure--boxed" open>
  <summary class="rg-disclosure__trigger">Materiali e consumi</summary>
  <div class="rg-disclosure__content">
    <!-- tabella, lista, campi -->
  </div>
</details>
```

Il segno `+`/`−` è generato dal DS e segue `[open]`, `is-expanded` o `aria-expanded`: non
aggiungere un secondo indicatore (chevron, freccia) accanto, sarebbe ridondante e desincronizzabile.
