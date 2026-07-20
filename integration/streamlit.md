# RG DS in Streamlit

Meccanismo unico con cui le app Streamlit della suite caricano token e CSS del DS.
Consumatori: `rg-embroidery-knowledge-engine`, `rg-consumption-engine`, `rg-sheet-compiler`.

Il punto di questo documento è che le tre app **non inventino tre meccanismi diversi**: il
codice di caricamento vive nel DS (`integration/rg_ds_streamlit.py`), non nelle app. Le app
lo importano.

## 1. Posizione del submodule

Il submodule sta alla radice del progetto, accanto all'entry point:

```
rg-consumption-engine/
├── app.py                    <- entry point Streamlit
├── design-system/            <- submodule, pinnato a un tag
│   ├── tokens.css
│   ├── styles/
│   └── integration/rg_ds_streamlit.py
└── .streamlit/config.toml    <- copiato da design-system/integration/streamlit-config.toml
```

Se nella suite il submodule è unico e condiviso alla radice del monorepo, la sola cosa che
cambia è il numero di `parent` nel path: il codice sotto resta identico.

## 2. Codice esatto in ogni app

In testa a `app.py` / `streamlit_app.py`, **prima** di qualunque altra chiamata Streamlit
che renda output:

```python
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent / "design-system" / "integration"))

import streamlit as st
from rg_ds_streamlit import inject, DS_VERSION

st.set_page_config(
    page_title="Consumption Engine — RG",
    layout="wide",
    initial_sidebar_state="expanded",
)
inject()
```

Tre righe di sostanza, identiche nelle tre app. `inject()` legge i sei moduli nell'ordine
canonico più il raccordo `streamlit-bridge.css` e li inietta in un unico `<style>`.

`set_page_config()` deve precedere `inject()` perché Streamlit impone che sia la prima
chiamata della sessione. `inject()` è cache-ata (`lru_cache`): i file si leggono una volta
per processo, non a ogni rerun.

Copiare inoltre il tema nativo una volta sola:

```bash
mkdir -p .streamlit && cp design-system/integration/streamlit-config.toml .streamlit/config.toml
```

## 3. Cosa si stila con le classi `.rg-*`

Tutto il markup che l'app produce da sé. Rendere con `st.markdown(..., unsafe_allow_html=True)`
— o con l'helper `html()` del modulo:

```python
from rg_ds_streamlit import html

html("""
<header class="rg-topbar rg-topbar--app">
  <a class="rg-topbar__back" href="/">← RG Tools</a>
  <h1 class="rg-topbar__title">Consumption Engine</h1>
</header>
""")

html('<span class="rg-badge rg-badge--validated">validato</span>')
```

Per i dati tecnici valgono le regole di sempre: `rg-mono` sui valori, unità accanto al
numero, stato del dato distinguibile (stimato / rilevato / importato / validato).

## 4. Cosa Streamlit non permette di stilizzare — e come si gestisce

I widget nativi (`st.button`, `st.text_input`, `st.tabs`, `st.dataframe`…) generano un DOM
che non possiamo marcare con classi nostre. La risposta del contratto è a **due livelli**, e
oltre quei due livelli non si va:

1. **`.streamlit/config.toml`** — il tema nativo. Streamlit colora da JS alcuni elementi
   (spinner, slider, caret, selezione, accenti) prima e sotto il nostro CSS: senza il tema
   l'app resta rosso-Streamlit in quei punti. È l'unico posto del contratto dove compaiono
   valori HEX, ed è un mirror dichiarato di `tokens.css`.
2. **`integration/streamlit-bridge.css`** — riporta ai token RG il chrome ricorrente
   (superficie, sidebar, bottoni, campi, label, focus, tabs, expander, metric, dataframe)
   agganciandosi ai selettori stabili `data-testid` / `data-baseweb`. Rimuove anche
   `stDecoration`, la barra a gradiente in cima, che viola la regola RG sui gradienti.

**Limite dichiarato**: il bridge è un raccordo, non un reskin completo, e dipende da
selettori interni di Streamlit che possono cambiare tra versioni major. Se dopo un upgrade
un widget "torna colorato", si corregge nel bridge — in un punto solo, per tutte e tre le app.
È esattamente il beneficio del meccanismo condiviso.

**Quando un widget nativo non si piega**: non accanirsi con `!important` a cascata. Delle due
l'una — o si accetta il widget nativo com'è (scelta legittima per un tool interno), oppure
quel pezzo di UI si rende come markup DS e si usa il widget nativo solo per l'input, tenendolo
visivamente minimo. Non si introducono librerie di componenti terze per aggirare il problema.

## 5. Limiti noti

- **Iframe**: `st.components.v1.html()` rende in un iframe isolato, che **non eredita** il CSS
  iniettato. Se serve markup DS dentro un componente HTML, va passato il CSS esplicitamente
  (`bundle()` restituisce la stringa completa).
- **Multipage**: con `pages/`, ogni pagina è uno script a sé. `inject()` va chiamata in
  **ogni** pagina — o, meglio, in una funzione `bootstrap()` d'app che le pagine importano.
- **Font**: i file dei font RG non sono distribuiti col DS. Senza i file autorizzati caricati
  dal prodotto, valgono i fallback dei token. Non incorporare font nel DS.
- **`unsafe_allow_html`**: passare solo markup di cui si controlla la provenienza; fare
  l'escape dei dati utente a monte.
