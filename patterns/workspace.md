# Workspace (app-shell a 2 pannelli)

## Scopo

Il guscio delle **tool** RG: un pannello parametri a sinistra e un'area di lavoro a destra con
canvas navigabile (pan/zoom), header e status bar. È il pattern condiviso da oblique,
pattern-grammar e dalle future tool delle due suite, così ogni strumento ha la stessa ergonomia.
Derivato da `pattern-grammar-engine`, generalizzato e reso token-based.

## Struttura

```
┌─ rg-topbar ─────────────────────────────────────────────┐
├───────────────┬─────────────────────────────────────────┤
│ __panel       │ __stage-header                          │
│ (parametri,   ├─────────────────────────────────────────┤
│  scroll)      │ __canvas  →  __layer (pan/zoom)          │
│               │                                         │
│               ├─────────────────────────────────────────┤
│               │ __statusbar                             │
└───────────────┴─────────────────────────────────────────┘
```

- `rg-workspace` — griglia `[panel] [stage]`. Riempie l'area sotto la topbar; l'app imposta
  l'altezza esterna (es. `height: calc(100vh - var(--rg-layout-header))`). Larghezza del pannello
  regolabile con `--rg-workspace-panel` (default 380px).
- `rg-workspace__panel` — parametri, scrollabile. Comporlo con `rg-param-section` +
  `rg-param-grid` + campi `rg-field` / `rg-field-with-unit`.
- `rg-workspace__stage` — righe `header / canvas / statusbar`.
- `rg-workspace__canvas` — viewport che ritaglia; `cursor: grab`, `is-dragging` durante il trascinamento.
- `rg-workspace__layer` — il livello trasformato che contiene l'anteprima (SVG/canvas).

## Pan / zoom che non si azzera (regola)

La vista vive **solo** su `__layer` tramite le variabili CSS `--rg-pan-x`, `--rg-pan-y`,
`--rg-zoom`. Sono stato **separato** dal contenuto: quando i parametri cambiano e l'app rigenera
l'anteprima dentro `__layer`, la trasformazione resta invariata → **il punto di vista e lo zoom
non tornano a zero**. Non ricalcolare pan/zoom dal contenuto a ogni render: aggiornali solo in
risposta a gesti dell'utente (drag, wheel) o a un "fit" esplicito.

```html
<div class="rg-workspace" style="height: calc(100vh - var(--rg-layout-header))">
  <aside class="rg-workspace__panel">
    <section class="rg-param-section">
      <div class="rg-param-section__header"><span class="section-index rg-mono">01</span><h3>Griglia</h3></div>
      <div class="rg-param-grid">
        <label class="rg-field"><span class="rg-field__label">Lato (mm)</span>
          <span class="rg-field-with-unit"><input class="rg-input rg-mono" value="6.0"><span>mm</span></span>
        </label>
      </div>
    </section>
  </aside>
  <div class="rg-workspace__stage">
    <header class="rg-workspace__stage-header"><h2 class="rg-h3">Anteprima</h2><span class="rg-mono">232 × 142 mm</span></header>
    <div class="rg-workspace__canvas">
      <div class="rg-workspace__layer" style="--rg-zoom:1;--rg-pan-x:0px;--rg-pan-y:0px"><!-- svg --></div>
    </div>
    <footer class="rg-workspace__statusbar"><span>Pronto</span><span class="rg-mono">zoom 100%</span></footer>
  </div>
</div>
```

## Comportamento (JS di riferimento, indipendente da librerie)

- **Pan**: al `pointerdown` sul canvas aggiungi `is-dragging`; sul `pointermove` accumula il delta
  in `--rg-pan-x/--rg-pan-y` del layer.
- **Zoom**: sul `wheel` moltiplica `--rg-zoom` (clamp min/max), centrando sul puntatore.
- **Fit**: un'azione esplicita reimposta pan a 0 e zoom al valore che inquadra il contenuto.
- Non toccare queste variabili quando rigeneri il contenuto: è ciò che preserva la vista.
