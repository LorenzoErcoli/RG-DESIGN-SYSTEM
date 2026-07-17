# Buttons

## Scopo

Avviare un'azione esplicita. La label usa un verbo breve e descrive il risultato.

## Varianti

- **Primary**: fondo nero, testo bianco; una sola azione dominante per area.
- **Secondary**: fondo bianco, bordo nero; azione alternativa.
- **Tertiary**: testo nero, senza contenitore; azione a bassa enfasi.
- **Danger**: bordo/testo danger; fondo pieno solo nella conferma finale.
- **Icon**: solo per azioni universalmente riconoscibili, con nome accessibile.

## Uso e limiti

Usare per comandi, non per navigazione testuale o stati. Evitare più primary affiancati, label generiche (`OK`, `Vai`) e accenti stagionali come fondo. Minimo 40 px di altezza; stato focus, disabled e loading obbligatori.

## Struttura

`[icona opzionale] [label] [indicatore opzionale]`

```html
<button class="rg-button rg-button--primary" type="button">Calcola consumo</button>
<button class="rg-button rg-button--secondary" type="button">Esporta scheda</button>
```

Loading conserva la larghezza e usa `aria-busy="true"`; disabled spiega il motivo vicino al controllo quando non evidente.

