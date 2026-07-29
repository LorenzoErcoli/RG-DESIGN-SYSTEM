# Lightbox

## Scopo

Ingrandire una singola immagine documentaria — campione ricamato, foto di lavorazione, scansione
di una scheda — senza lasciare la pagina e senza costruire un visualizzatore.

## Varianti

Una sola. Il lightbox non ha misure, temi né modalità: mostra un'immagine al massimo dello spazio
disponibile su uno scrim, e si chiude.

## Uso e limiti

È un overlay di **sola lettura**. Se dentro serve una decisione, un form, una navigazione fra
elementi o dei metadati editabili, il componente giusto è `rg-modal`, non questo.

Sta sul livello `--rg-z-lightbox` (450), **sopra** il dialog (`--rg-z-modal`, 400) e sotto i
toast (`--rg-z-toast`, 500). Il caso reale è l'ingrandimento aperto _dentro_ un modal — una foto
di lavorazione in una scheda che si apre in dialog: deve poter salire sopra il modal, non finirci
dietro. Resta però sotto i toast, che sono il canale di notifica di sistema e non devono mai
essere coperti da uno zoom. Fino a 1.7.0 il lightbox stava su `--rg-z-overlay` (300), sotto il
modal: era il gap, e i prodotti lo tamponavano con un `z-index` locale. Si chiude con click sullo
scrim e con `Esc`: sono entrambi obbligatori, il click da solo non è raggiungibile da tastiera.

La miniatura che lo apre è un `<button>` reale (`rg-lightbox__thumb`) con `aria-label` che nomina
l'immagine: il cursore `zoom-in` è un indizio, non un'affordance accessibile. L'immagine ingrandita
conserva il suo `alt`; se l'immagine è puramente decorativa non merita un lightbox.

Le fotografie RG sono documentarie: nessun effetto di apertura, nessuna ombra, nessuna cornice
decorativa. Lo scrim scurisce, il bordo nero delimita, basta così.

## Struttura

Miniatura (trigger) nel flusso + overlay unico a fine pagina, riutilizzato da tutte le miniature.

```html
<button class="rg-lightbox__thumb" aria-label="Ingrandisci: fermata 03, dettaglio ricamo">
  <img src="stop-03.jpg" alt="Fermata 03, dettaglio ricamo" width="132">
</button>

<div class="rg-lightbox" role="dialog" aria-modal="true" aria-label="Immagine ingrandita" hidden>
  <img class="rg-lightbox__image" src="" alt="">
</div>
```

Lo stato aperto è la classe `is-open` sull'overlay (e la rimozione di `hidden`). La larghezza della
miniatura la decide il contesto che la ospita, non il componente.
