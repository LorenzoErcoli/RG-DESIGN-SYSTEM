# Fila di record (`rg-record-strip`) — proposta 1.56.0

## Scopo

Pochi record **recenti** come scorciatoia, sopra un elenco: «Ultimi caricati» nella pagina Prodotti.
Una fila di tessere, **su una riga sola** e senza scorrimento di lato: ne restano in vista quante ne
stanno, le altre si nascondono. Chiesta dalla chat «Prodotti e varianti» della RG Product Suite
(Lorenzo, 2026-11-16: «mi sembra molto poco bello, non c'è modo per rendere tutto più esteticamente
coerente?»).

### Che cosa c'era e perché non bastava

| Esistente | Perché non copre |
| --- | --- |
| `rg-card` | la tessera-entità di una griglia: 24 di padding, `height: 100%`, superficie **sollevata**. Dentro la section card bianca della pagina sarebbe una card nella card (§6), e a 24 di padding sei card non stanno in una riga. |
| `rg-list-row` | una riga di un elenco verticale, a tutta larghezza; non una tessera in fila. |
| `rg-folder` | la stessa famiglia di misure, ma è un **contenitore**: un record non deve sembrare una cartella. |
| la striscia locale `app-recent-strip` | card bianche in scorrimento orizzontale con la barra di scorrimento visibile, misure proprie: è il difetto da togliere. |

## Varianti

Nessuna variante di classe: la fila cambia forma con la **larghezza della colonna** in cui sta (è un
contenitore, `container-type: inline-size`), non della finestra.

| Larghezza della fila | Colonne | Tessere in vista | Miniatura |
| --- | --- | --- | --- |
| da 1260 px | 6 (o più colonne, con le ultime vuote) | 6 | sì |
| 1048–1259 | 5 | 5 | sì |
| 836–1047 | 4 | 4 | sì |
| 624–835 | 3 | 3 | sì |
| 412–623 | 2 | 4, su due righe | sì |
| sotto 412 (il telefono) | 2 | 4, su due righe | no: a 140 px lascerebbe al nome 50 px |

Le soglie sono quelle in cui la griglia passa da *n* a *n* + 1 colonne da 200 px con 12 di luce: la
**stessa griglia** di [`rg-folder-grid--compact`](folders.md), quindi la fila e le cartelle sotto di
lei si allineano colonna per colonna. Nella pagina Prodotti con la barra laterale (colonna 1160, corpo
della card 1110) sono **cinque** tessere da 213; a 168 px di colonna ne stavano sei da 175, ma la
miniatura lasciava al nome 90 px e «Book Tote ricamo floreale» andava su tre righe.

## Uso e limiti

- **Stesse misure della cartella compatta, figura diversa.** Altezza minima 72 (la miniatura compatta da
  48 più 12 sopra e sotto), padding 12, raggio 4, filetto neutro, superficie **rientrante**, hover
  bianco con contorno nero, fuoco nero. Il record si riconosce dalla **miniatura** e dal cliente sotto
  il nome; la cartella dall'icona e dal conteggio.
- **Dove sta**: dentro una superficie sollevata — il corpo della section card con la barra dei filtri
  ([filter-bar](filter-bar.md#la-barra-in-testa-a-una-section-card-proposta-1560)). Non sul fondo di
  pagina.
- **Cosa mostra**: il nome (`__name`, identitario 14 medium), sotto `__meta` («DIOR · SS 2026», 12 in
  grigio); facoltativo `__code` in mono per il codice RG. **Niente si tronca**: nome e meta vanno a
  capo, e le tessere della stessa riga crescono insieme. Per tenere insieme «SS 2026» il server può
  scrivere lo spazio come `&nbsp;`.
- **La miniatura** è un [`rg-thumb rg-thumb--compact`](thumb.md) con in più `rg-record-strip__thumb`
  (è la classe che la nasconde sul telefono). Foto o disegno (`rg-thumb--drawing`) come in tabella;
  **senza immagine si omette**: la tessera tiene l'altezza, il nome parte dal bordo. `alt=""`: il nome
  del record è scritto accanto.
- **Quante darne**: il server ne manda sei. Le nascoste sono `display: none`, quindi fuori anche dal
  tab e dal lettore di schermo: non si raggiunge col tasto Tab una tessera che non si vede. Chi cerca
  un record non in vista lo trova nell'elenco.
- **Ordine**: il più recente per primo; è quello che resta in vista a ogni larghezza.
- Il titolo (`__title`) è un `<h2>` in stile label (maiuscolo, 12, colore label): intesta un blocco
  dentro la card, non la pagina. La fila è una `<section aria-labelledby>` verso il titolo.
- **Non è un carosello** e non scorre: se servisse vedere più record, è l'elenco.

## Struttura

```
section.rg-record-strip                     aria-labelledby → __title
├─ h2.rg-record-strip__title                «Ultimi caricati»
└─ ul.rg-record-strip__list
   └─ li > a.rg-record-strip__item          (ripetuto, il più recente per primo)
      ├─ img.rg-thumb.rg-thumb--compact.rg-record-strip__thumb   facoltativa, alt=""
      └─ span.rg-record-strip__body
         ├─ span.rg-record-strip__name
         ├─ span.rg-record-strip__meta      cliente · collezione anno
         └─ span.rg-record-strip__code      facoltativo, mono
```

```html
<section class="rg-record-strip" aria-labelledby="ultimi">
  <h2 class="rg-record-strip__title" id="ultimi">Ultimi caricati</h2>
  <ul class="rg-record-strip__list">
    <li>
      <a class="rg-record-strip__item" href="/products/449">
        <img class="rg-thumb rg-thumb--compact rg-record-strip__thumb" src="/products/449/miniatura" alt="" loading="lazy">
        <span class="rg-record-strip__body">
          <span class="rg-record-strip__name">Book Tote ricamo floreale</span>
          <span class="rg-record-strip__meta">DIOR · SS&nbsp;2026</span>
        </span>
      </a>
    </li>
    <li>
      <a class="rg-record-strip__item" href="/products/451">
        <span class="rg-record-strip__body">
          <span class="rg-record-strip__name">Cintura con fibbia ricamata</span>
          <span class="rg-record-strip__meta">BRUNELLO CUCINELLI · FW&nbsp;2026</span>
        </span>
      </a>
    </li>
    <!-- … fino a sei -->
  </ul>
</section>
```

Vetrina: tavola 64 `#list-page`; la pagina intera in
[examples/rg-pagina-elenco.html](../examples/rg-pagina-elenco.html).

### Verifiche fatte (Chrome, `examples/rg-pagina-elenco.html`)

- 1192 px (corpo della card 1110): cinque tessere da 212×80 in una riga, la sesta nascosta; sotto, le
  cartelle compatte sulle stesse cinque colonne.
- 900 px: tre tessere da 265. 700 px: due per riga, quattro tessere da 303, con miniatura.
- 375 px: due per riga, quattro tessere da 133, senza miniatura; le cartelle una per riga (278×72).
- `scrollWidth` = `clientWidth` a tutte le misure, nei tre stati della pagina: nessuno scorrimento di lato.
- Voci del segmented a link: alte 34 (gruppo 40), 14 px, non sottolineate.
