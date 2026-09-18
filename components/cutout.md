# Cutout (riquadro da ritagliare)

## Scopo

Un pezzo di foglio stampato **fatto per essere ritagliato** e usato da solo: la legenda dei coni in fondo
al foglio del ricamo, che si taglia e si attacca alla macchina. Deve dire due cose sulla carta, anche in
fotocopia bianco e nero: **dove si taglia** e **da dove viene** il pezzo, una volta staccato.

Nasce dal fascicolo compatto (proposta 1.23.0).

## Varianti

Nessuna.

| Elemento | Cosa porta |
| --- | --- |
| `rg-cutout` | Il riquadro: contorno **tratteggiato nero** su quattro lati, che è la linea di taglio. |
| `rg-cutout__cue` | L'indicazione scritta **sulla** linea, in alto a sinistra: «Ritaglia lungo il tratteggio». |
| `rg-cutout__head` | La testa del pezzo: titolo e identità. |
| `rg-cutout__title` | Cosa è: «Legenda coni · Fase 1 di 3 · Ricamo». |
| `rg-cutout__meta` | Da dove viene: prodotto, parte. Mono, a destra. |

## Uso e limiti

**Il tratteggio è la linea di taglio, ed è l'unica.** Nero, 1 px, su quattro lati: si ritaglia un rettangolo
pulito senza misurare. Una sola linea orizzontale lascerebbe il pezzo largo quanto il foglio, margini
compresi.

**L'indicazione è testo, non icona.** Il set di icone RG non ha una forbice e un carattere Unicode al posto di
un'icona è vietato (regole §7): la parola «Ritaglia» si legge in fotocopia e non ha bisogno di legenda. Il
fondo bianco sotto la parola interrompe il tratteggio: in stampa arriva con `print-color-adjust`
(`rg-utilities.css`); dove il browser lo ignora la linea passa sotto la parola, che resta leggibile.

**Il pezzo staccato si identifica da solo.** La testa ripete fase e prodotto: attaccata alla macchina, la
legenda deve ancora dire di quale lavoro è.

**Dove sta.** Come **ultimo figlio di un [`rg-worksheet-block`](worksheet-block.md)**, dopo il piede: resta
dentro il riquadro della fase, con i margini laterali del blocco, e non si separa dal suo foglio. Non si
spezza mai fra due pagine.

**Il contenuto è libero**, di norma una `rg-table rg-table--compact`. Per la legenda dei coni: Ago · Codice
filo · Colore · Metri · Cono, con la casella quadrata [`rg-fill-field--swatch`](fill-field.md) nella colonna
Cono e [`rg-table__grow`](tables.md) sulla colonna Colore.

**Su una pagina sua** (proposta 1.25.0). Tagliare il fondo di un foglio taglia anche il retro: i tagliandi di
un prodotto vanno insieme nel [foglio dei tagliandi](cutout-sheet.md), col retro bianco. Dentro un blocco resta
solo per un foglio stampato su una facciata. La legenda dei coni ha ora anche la spolina: Codice filo · Tipo
(sopra/sotto) · Aghi · Metri · Colore.

**Non è a schermo.** A schermo non si ritaglia niente: la stessa legenda è una tabella normale.

## Struttura

```html
<div class="rg-cutout">
  <span class="rg-cutout__cue">Ritaglia lungo il tratteggio</span>
  <div class="rg-cutout__head">
    <p class="rg-cutout__title">Legenda coni · Fase 1 di 3 · Ricamo</p>
    <p class="rg-cutout__meta">COCOTTE · Parte 1 · FONDO BORDATO</p>
  </div>
  <table class="rg-table rg-table--compact">
    <thead>
      <tr>
        <th class="rg-table__numeric" scope="col">Ago</th>
        <th scope="col">Codice filo</th>
        <th class="rg-table__grow" scope="col">Colore</th>
        <th class="rg-table__numeric" scope="col">Metri</th>
        <th scope="col">Cono</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="rg-table__numeric">1</td>
        <td class="rg-table__code">MAD-1800</td>
        <td>Bianco ottico</td>
        <td class="rg-table__numeric">42,5</td>
        <td><span class="rg-fill-field rg-fill-field--swatch"></span></td>
      </tr>
    </tbody>
  </table>
</div>
```
