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
