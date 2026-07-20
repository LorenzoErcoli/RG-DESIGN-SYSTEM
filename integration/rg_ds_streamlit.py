"""RG Design System — iniezione in Streamlit.

Unico meccanismo autorizzato con cui un'app Streamlit carica token e CSS del DS.
Le app NON devono reimplementare la lettura dei file ne' incollare CSS: importano
questo modulo dal submodule e chiamano `inject()` una volta, subito dopo
`st.set_page_config()`.

Zero dipendenze oltre a Streamlit. Nessun file viene copiato: si legge dal DS.

Uso tipico (app.py alla radice del progetto, submodule in ./design-system):

    import sys
    from pathlib import Path
    sys.path.append(str(Path(__file__).parent / "design-system" / "integration"))

    import streamlit as st
    from rg_ds_streamlit import inject, DS_VERSION

    st.set_page_config(page_title="...", layout="wide")
    inject()

Vedi `integration/streamlit.md` per il contratto completo e i limiti noti.
"""

from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path

# Radice del DS: questo file vive in <DS>/integration/.
DS_ROOT = Path(__file__).resolve().parent.parent

# Ordine di import obbligatorio. Deve restare allineato a components.json -> importOrder.
MODULES: tuple[str, ...] = (
    "tokens.css",
    "styles/rg-core.css",
    "styles/rg-typography.css",
    "styles/rg-components.css",
    "styles/rg-layout.css",
    "styles/rg-utilities.css",
)

# Livello di raccordo: applica i token DS al chrome nativo di Streamlit,
# che non e' raggiungibile con le classi .rg-*.
BRIDGE = "integration/streamlit-bridge.css"


def _read(rel: str) -> str:
    path = DS_ROOT / rel
    if not path.is_file():
        raise FileNotFoundError(
            f"RG DS: modulo mancante: {path}. "
            "Il submodule design-system non e' inizializzato? "
            "Esegui: git submodule update --init --recursive"
        )
    return path.read_text(encoding="utf-8")


@lru_cache(maxsize=1)
def ds_version() -> str:
    """Versione del DS dichiarata nel manifest (utile per header/footer e cache-busting)."""
    try:
        return json.loads(_read("components.json"))["dsVersion"]
    except Exception:
        return "unknown"


@lru_cache(maxsize=2)
def bundle(with_bridge: bool = True) -> str:
    """Concatena i moduli CSS nell'ordine canonico. Cache: letti una volta per processo."""
    parts = [f"/* --- {m} --- */\n{_read(m)}" for m in MODULES]
    if with_bridge:
        parts.append(f"/* --- {BRIDGE} --- */\n{_read(BRIDGE)}")
    return "\n".join(parts)


def inject(with_bridge: bool = True) -> None:
    """Inietta il DS nella pagina Streamlit corrente.

    Va chiamata una sola volta per run, subito dopo st.set_page_config().
    Streamlit ri-esegue lo script a ogni interazione: la chiamata e' idempotente
    a livello di resa (il browser applica lo stesso <style>), e il costo di lettura
    dei file e' azzerato dalla cache.

    with_bridge=False disattiva il raccordo sul chrome nativo di Streamlit:
    usalo solo se l'app rende il proprio markup e non usa widget nativi.
    """
    import streamlit as st

    st.markdown(f"<style>\n{bundle(with_bridge)}\n</style>", unsafe_allow_html=True)


def html(markup: str) -> None:
    """Rende markup DS-conforme. Zucchero su st.markdown(unsafe_allow_html=True).

    Nota: passa solo markup di cui controlli la provenienza. Per dati utente,
    fai l'escape a monte.
    """
    import streamlit as st

    st.markdown(markup, unsafe_allow_html=True)


DS_VERSION = ds_version()
