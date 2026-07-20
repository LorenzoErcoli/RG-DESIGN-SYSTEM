# RG DS in FastAPI + Jinja2

Consumatore: `rg-product-platform`, che serve già `static/` via `StaticFiles`.

## 1. Posizione del submodule

Il submodule sta alla radice del progetto, **fuori** da `static/`:

```
rg-product-platform/
├── app/
│   ├── main.py
│   ├── templates/base.html
│   └── static/            <- asset dell'app (compreso il CSS app-local)
└── design-system/         <- submodule, pinnato a un tag
    ├── tokens.css
    └── styles/
```

Il DS non va dentro `static/`: `static/` è roba dell'app, versionata dall'app. Il DS è un
riferimento esterno immutabile e si monta a parte.

## 2. Mount: perimetro servito

Del DS si serve **solo** ciò che il browser deve scaricare — i sei moduli CSS. `examples/`,
`figma/`, `tools/`, `agent/` e i `.md` restano nel working tree per la consultazione, ma non
finiscono sulla superficie HTTP:

```python
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

BASE_DIR = Path(__file__).resolve().parent.parent   # radice del progetto
DS_DIR = BASE_DIR / "design-system"

app.mount("/ds/styles", StaticFiles(directory=DS_DIR / "styles"), name="ds-styles")

@app.get("/ds/tokens.css", include_in_schema=False)
async def ds_tokens():
    return FileResponse(DS_DIR / "tokens.css", media_type="text/css")
```

`tokens.css` vive nella radice del DS e non in `styles/`, quindi ha una rotta esplicita
invece di un secondo mount sulla radice: montare `DS_DIR` intera esporrebbe anche esempi,
tooling e documentazione.

Per la cache-busting, leggere la versione dal manifest una volta all'avvio ed esporla ai
template:

```python
import json
DS_VERSION = json.loads((DS_DIR / "components.json").read_text(encoding="utf-8"))["dsVersion"]
templates.env.globals["ds_version"] = DS_VERSION
```

Se il submodule non è inizializzato, il mount fallisce all'avvio con un errore chiaro:
è il comportamento voluto — meglio del servire una pagina senza stili.

```python
if not (DS_DIR / "styles").is_dir():
    raise RuntimeError(
        "Design system non inizializzato. Esegui: git submodule update --init --recursive"
    )
```

## 3. Ordine di import nel template base

In `templates/base.html`, dentro `<head>`, **prima** di qualunque CSS dell'app:

```html
<link rel="stylesheet" href="/ds/tokens.css?v={{ ds_version }}">
<link rel="stylesheet" href="/ds/styles/rg-core.css?v={{ ds_version }}">
<link rel="stylesheet" href="/ds/styles/rg-typography.css?v={{ ds_version }}">
<link rel="stylesheet" href="/ds/styles/rg-components.css?v={{ ds_version }}">
<link rel="stylesheet" href="/ds/styles/rg-layout.css?v={{ ds_version }}">
<link rel="stylesheet" href="/ds/styles/rg-utilities.css?v={{ ds_version }}">

<!-- CSS app-local: sempre DOPO il DS, mai dentro il submodule -->
<link rel="stylesheet" href="{{ url_for('static', path='css/app-local.css') }}">
```

L'ordine è vincolante e coincide con `components.json` → `importOrder`: i token devono
esistere prima che i moduli li leggano, e `rg-components.css` precede `rg-layout.css` perché
le shell di layout sovrascrivono, non il contrario.

## 4. CSS app-local

Ciò che resta specifico dell'applicazione (vedi `appLocalExceptions` in `components.json`)
sta in `app/static/css/app-local.css`, caricato per ultimo. Regola: **non definire nuove
classi `.rg-*` fuori dal DS**. Se un componente locale si rivela ricorrente, si promuove nel
DS con il ciclo dell'agente e si rimuove da qui — non si duplica.
