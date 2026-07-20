# Changelog — RG Design System

Versionamento semver. I consumatori si agganciano a un **tag**, mai a un branch.

- **major** — rimozione o rinomina di classi/token, cambio dell'ordine di import, modifica
  di un token permanente: richiede intervento nei prodotti.
- **minor** — nuovi componenti, nuove varianti, nuovi token additivi: aggiornamento sicuro.
- **patch** — correzioni che non cambiano il contratto.

## 1.0.0 — 2026-07-20

Prima release stabile e **primo contratto di consumo pubblico**. Da qui i prodotti della
suite RG si agganciano a un tag invece che a una copia.

### Aggiunto
- `integration/` — contratto di consumo del DS:
  - `README.md`: distribuzione via submodule pinnato a tag, superficie consumata.
  - `streamlit.md` + `rg_ds_streamlit.py` + `streamlit-bridge.css` + `streamlit-config.toml`:
    meccanismo unico di iniezione per le app Streamlit. Il codice di caricamento vive nel DS,
    non nelle app.
  - `fastapi.md`: mount statico a perimetro ristretto e ordine di import nel template base.
- `tools/ds-lint.mjs` — due controlli nuovi: le classi `rg-*` citate in `integration/*.md`
  devono esistere nel CSS; `MODULES` nell'helper Streamlit deve coincidere con
  `components.json` → `importOrder` (l'ordine di import non può divergere in silenzio).
- `CHANGELOG.md` (questo file) e politica di versionamento esplicita.

### Consolidato
- `master`/`main` allineato: la proposta `ds/topbar-app` (`fdb69c6`, variante `rg-topbar--app`
  con `__back` / `__title` / `__actions`) è **accettata** e non è più marcata come proposta.
- `ds/workspace` (`e271895`) **scartato**: superato da `85f56c9`, che implementa `rg-workspace`
  in forma più completa (panel / stage / canvas / layer / statusbar, pan-zoom che non si
  azzera). Mergiarlo avrebbe introdotto una seconda definizione conflittuale di `.rg-workspace`.
  Nessun contenuto perso: il commit resta raggiungibile via SHA.

### Corretto
- Intestazione di `tokens.css`, ferma a `v0.1.0`, riallineata alla versione reale.

Nessun token permanente modificato rispetto a 0.3.0. Nessuna classe rimossa o rinominata:
per i consumatori l'aggiornamento da 0.3.0 è additivo. Il salto a 1.0.0 segna la stabilità
del contratto, non una rottura.

## 0.3.0

- Promossi nel DS da `rg-product-platform`: `modal`, `chip`, `folder` e le parti estese del
  breadcrumb (`rg-breadcrumb__sep`, `rg-breadcrumb__current`).
- `recent-card` dichiarato **app-local** (resta in `rg-product-platform`).
- Pattern `rg-workspace` (shell strumento a due pannelli con pan/zoom).
- Componente `rg-autocomplete`.
- Documentati gli 11 componenti fino ad allora solo-CSS; introdotto `tools/ds-lint.mjs`.

## 0.2.0

- Componenti `rg-list` / `rg-list-row` (liste tecniche con azioni inline) e `rg-icon-button`.

## 0.1.0

- Base iniziale: token, moduli CSS, componenti e pattern fondativi.
