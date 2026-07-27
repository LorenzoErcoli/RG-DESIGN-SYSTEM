# Color map (colori e ruoli)

## Scopo

Attribuire un **ruolo di lavorazione** a ciò che è stato importato: ogni colore o layer del file di
partenza riceve un compito (perimetro, area rete, area raso, confine, ignorato). È il controllo che
risponde alla domanda «di questo DXF, cosa uso e come». Promosso da `net-45` e `pattern-grammar`
(v1.5.0).

## Varianti

Nessuna variante di forma: cambia solo il numero di righe e l'insieme dei bersagli.

- **Mappa completa** — molte righe, un ruolo per ciascuna (`net-45`: perimetro, rete, raso,
  quadratini, bordo, area vuota).
- **Scelta singola** — le righe sono i contorni disponibili e il bersaglio ha due valori
  (`— (ignora)` / `Confine`): è il caso di un tool che usa un solo contorno importato.

## Uso e limiti

Regola non negoziabile (§10): **il campione non basta mai da solo**. Accanto al colore sta sempre
il codice esadecimale, o il nome del layer, in mono. Un utente che non distingue due colori vicini
deve poter lavorare lo stesso, e un colore va potuto citare a voce e in una mail.

Il bersaglio è un `<select>` reale con un'etichetta accessibile che nomina il colore
(`aria-label="Ruolo per #1A1A1A"`): in una lista di righe simili, «Ruolo» da solo non dice quale.
La prima opzione è sempre l'esclusione esplicita (`— (ignora)`), non un vuoto.

Sta su una lista rigata, non su card e non in tabella: ogni riga contiene una **decisione**, quindi
è un form, non un record. Per confrontare fra loro dati importati (quanti punti, quanta lunghezza)
il componente resta `rg-table`; per un elenco di record navigabili, `rg-list-row--link`.

Quando non c'è nulla di importato la lista **non sparisce**: al suo posto va
`rg-color-map__empty`, che dice perché è vuota. È lo stesso principio di `rg-empty`, in forma
compatta da pannello: `rg-empty` occuperebbe mezza colonna di parametri.

`--swatch` è un dato letto dal file, non una scelta di stile: si scrive inline sull'elemento, come
per `rg-swatch__color`. Per un contorno senza riempimento si usa `rg-color-map__swatch--none`, che
mostra la barra del «nessun colore» invece di un campione bianco indistinguibile dal bianco vero.

## Slot accessorio per-riga (`rg-color-map__aside`)

Quando ogni colore porta con sé un **controllo compatto proprio** — non un ruolo su riga a sé,
ma un piccolo campo che appartiene a quel colore (la densità per-colore di `interlace`, un
override numerico, un'azione di riga) — va in `rg-color-map__aside`: uno slot in coda alla riga,
allineato a destra. La terza colonna della griglia nasce solo se lo slot è presente, quindi le
mappe che non lo usano restano identiche.

Per un campo numerico inline usa `rg-field-with-unit--compact` con `rg-input--numeric`: è la
forma compatta del campo con unità (valore stretto, mono, tabulare, allineato a destra), pensata
per una riga densa dove il campo è un accessorio e non il soggetto di un form a colonna. La
`rg-field-with-unit` piena resterebbe troppo larga (soglia minima 132 px).

L'etichetta **non è visibile** ma resta accessibile: `aria-label` sull'input nomina il colore e
dichiara sia l'unità sia il comportamento del vuoto — in una lista di righe simili «mm» da solo
non dice a quale colore appartiene. Se il campo eredita un valore globale quando è vuoto, il
`placeholder` mostra quel valore di riferimento (stato «vuoto = usa il globale») e la regola va
scritta nell'`aria-label`, mai affidata al solo placeholder grigio.

```html
<li class="rg-color-map__row">
  <span class="rg-color-map__swatch" style="--swatch:#1a1a1a"></span>
  <span class="rg-color-map__code">#1A1A1A <span class="rg-color-map__meta">12 path</span></span>
  <span class="rg-color-map__aside rg-cluster">
    <span class="rg-field-with-unit rg-field-with-unit--compact">
      <input class="rg-input rg-input--numeric" type="number" inputmode="decimal"
             min="0.8" max="3.2" step="0.1" placeholder="1.6"
             aria-label="Densità per #1A1A1A in mm (vuoto: usa la densità globale)">
      <span>mm</span>
    </span>
    <button class="rg-icon-button rg-icon-button--danger" type="button" aria-label="Rimuovi #1A1A1A">×</button>
  </span>
</li>
```

## Struttura

Lista → riga (campione + codice/meta + bersaglio a piena larghezza).

```html
<ul class="rg-color-map">
  <li class="rg-color-map__row">
    <span class="rg-color-map__swatch" style="--swatch:#1a1a1a"></span>
    <span class="rg-color-map__code">#1A1A1A <span class="rg-color-map__meta">12 path</span></span>
    <select class="rg-select rg-color-map__target" aria-label="Ruolo per #1A1A1A">
      <option value="">— (ignora)</option>
      <option value="MASTER_OUTLINE" selected>Perimetro</option>
      <option value="NET_AREA">Area rete</option>
    </select>
  </li>
  <li class="rg-color-map__row">
    <span class="rg-color-map__swatch rg-color-map__swatch--none"></span>
    <span class="rg-color-map__code">nessun colore <span class="rg-color-map__meta">3 path</span></span>
    <select class="rg-select rg-color-map__target" aria-label="Ruolo per i path senza colore">
      <option value="" selected>— (ignora)</option>
      <option value="EXCLUSION">Area vuota</option>
    </select>
  </li>
</ul>
```

Senza sorgente importata:

```html
<p class="rg-color-map__empty">Nessuna sagoma importata: carica un DXF o un SVG.</p>
```
