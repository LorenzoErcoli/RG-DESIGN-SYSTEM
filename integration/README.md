# Contratto di consumo del RG Design System

Come un prodotto RG consuma il DS. Il DS è la **fonte**; i progetti sono **consumatori** e
non modificano mai i file del DS in loco: le modifiche si fanno qui, si rilascia un tag, il
consumatore sposta il pin.

## Distribuzione: submodule pinnato a un tag

Il DS viene incluso come git submodule **posizionato su un tag semver**, mai su un branch.
Un submodule registra sempre un commit: il tag serve a rendere leggibile e intenzionale
*quale* commit, e a dare un nome all'aggiornamento.

```bash
# nella radice del repo consumatore
git submodule add https://github.com/LorenzoErcoli/RG-DESIGN-SYSTEM.git design-system
cd design-system && git checkout v1.0.0 && cd ..
git add design-system && git commit -m "chore: DS pinnato a v1.0.0"
```

Clone e aggiornamento:

```bash
git clone --recurse-submodules <repo>          # clone iniziale
git submodule update --init --recursive        # se clonato senza --recurse-submodules
cd design-system && git fetch --tags && git checkout v1.2.0 && cd ..   # bump del pin
```

**Il pin si sposta solo con un commit esplicito nel consumatore.** Un `git pull` nel DS non
cambia nulla nei prodotti finché qualcuno non promuove il tag: è questa la proprietà per cui
il submodule è stato scelto.

## Superficie consumata

Del DS i prodotti caricano **soltanto** questi file:

| File | Ruolo |
| --- | --- |
| `tokens.css` | valori e alias — sempre per primo |
| `styles/rg-core.css` | reset, focus, superfici |
| `styles/rg-typography.css` | tipografia per ruolo |
| `styles/rg-components.css` | componenti `.rg-*` |
| `styles/rg-layout.css` | composizioni e shell |
| `styles/rg-utilities.css` | helper atomici (omissibile se inutilizzati) |

L'ordine non è negoziabile: è dichiarato in `components.json` → `importOrder` ed è replicato
in `rg_ds_streamlit.MODULES`. Chi cambia l'ordine rompe la cascata.

Tutto il resto del repo (`examples/`, `figma/`, `tools/`, `patterns/`, `components/`,
`agent/`) è **documentazione e strumenti di sviluppo**: sta nel working tree per la consultazione
e per l'agente, ma non va né servito né incluso in un'immagine di deploy. Vedi la nota sul
perimetro servito in [fastapi.md](fastapi.md#perimetro-servito).

## Pattern per runtime

- **Streamlit** → [streamlit.md](streamlit.md) — iniezione via `rg_ds_streamlit.inject()`.
  Vale per `rg-embroidery-knowledge-engine`, `rg-consumption-engine`, `rg-sheet-compiler`.
- **FastAPI + Jinja2** → [fastapi.md](fastapi.md) — mount statico + `<link>` nel template base.
  Vale per `rg-product-platform`.

## Componenti app-local

Un prodotto può avere componenti propri non promossi nel DS. Vanno tenuti **fisicamente
separati** dal submodule (es. `static/css/app-local.css`) e caricati **dopo** i moduli DS.

**Il prefisso `rg-` appartiene al DS e a nessun altro.** Un componente locale si chiama con un
prefisso proprio (`app-`, o il nome del dominio: `sheet-`, `ts-`). Da 1.1.0 non esiste più il
meccanismo delle eccezioni dichiarate in `appLocalExceptions`: una classe `.rg-*` definita fuori
dal DS è una violazione, punto. La regola vale quanto è verificabile, e questa lo è con un grep:

```bash
# dalla radice del prodotto — deve non stampare nulla
grep -rn "\.rg-[a-z-]*\s*{" --include=*.css --include=*.html . | grep -v design-system/
```

Perché non le eccezioni: un elenco di deroghe va tenuto sincronizzato a mano, invecchia in
silenzio e sposta il confine da "si vede dal nome" a "bisogna andare a leggere un JSON". Se una
classe merita il prefisso `rg-`, merita di stare nel DS — e allora si promuove.

### Quando promuovere invece di tenere in locale

Resta locale ciò che è **dominio di un solo prodotto** (una striscia della sua dashboard, una
riga della sua scheda). Si promuove ciò che è **struttura, stato o comportamento** che un secondo
prodotto RG riscriverebbe uguale: gusci, stati del ciclo di vita, overlay, tab, stampa. In dubbio:
si tiene locale con un nome proprio, e si promuove alla seconda occorrenza (regole §12).

### Blocchi `<style>` nei template

Non sono un posto dove tenere CSS d'applicazione: vincono sui `<link>` per posizione e
sovrascrivono silenziosamente il DS senza che nessuno se ne accorga. Il CSS locale sta in
`app-local.css`; nel template restano solo le variabili CSS per-istanza (`style="--rg-zoom:1"`).
