# VERIFY — checklist di conformità di un componente RG

Da eseguire dopo aver implementato un componente nuovo o una variante, **prima** di
aggiornare `components.json` e la vetrina, e prima di proporre il merge. Fonte delle
regole: [`design-rules.md`](../design-rules.md) e i "vincoli non negoziabili" di
[`AI_CONTEXT.md`](../AI_CONTEXT.md). Ogni voce è PASS/FAIL: un solo FAIL blocca
l'integrazione — correggi o, se è un'eccezione legittima, documentala (vedi §12 delle regole).

## 1. Token, mai valori grezzi

- [ ] Nessun colore HEX/rgb() inline nel CSS del componente. Solo `var(--rg-color-*)`.
- [ ] Nessuna misura magica: spazi da `var(--rg-space-*)`, raggi da `var(--rg-radius-*)`,
      bordi da `var(--rg-border-*)`, font da `var(--rg-font-*)`, z-index da `var(--rg-z-*)`.
- [ ] Nessun token nuovo inventato per un caso locale. Se serve davvero un token globale,
      è una modifica separata a `tokens.json` + `tokens.css`, dichiarata esplicitamente.

## 2. Base cromatica

- [ ] Base permanente nera/bianca. Le palette stagionali (Perugino) NON definiscono
      azione primaria, navigazione, focus o testo fondamentale.
- [ ] Nessuno stato dipende dal solo colore: c'è sempre testo, icona+label, peso o linea.

## 3. Tipografia per ruolo

- [ ] `--rg-font-identity` (AGNext) per titoli/nav/label; `--rg-font-body` per testo;
      `--rg-font-mono` per codici, ID, misure, quantità, log, timestamp.
- [ ] Cifre tabulari sui valori confrontabili. Niente maiuscolo in paragrafi/tabelle dense.

## 4. Sobrietà visiva

- [ ] Nessun gradiente decorativo, glow, glassmorphism, ombra vistosa.
- [ ] Radius entro la scala (2 / 4 / 8 px; pill solo dove ha senso, es. badge).
- [ ] Il componente non trasforma in card contenuto che starebbe su superficie aperta.
- [ ] Bordi sottili (1 px neutro; 1 px nero se forte). Ombra solo per elementi sovrapposti.

## 5. Stati obbligatori

- [ ] Focus visibile ad alto contrasto (nero/bianco), non solo `outline: none`.
- [ ] Dove pertinente: default, hover, disabled, loading, empty, error/warning, read-only.
- [ ] Loading conserva la larghezza; disabled ha una ragione comprensibile vicino al controllo.

## 6. Accessibilità

- [ ] Target interattivo ≥ 40×40 px (compatto 34×34 solo per liste dense già ammesse).
- [ ] Ruoli/attributi ARIA corretti (es. `role`, `aria-label`, `aria-expanded`, `aria-busy`).
- [ ] Ordine di tabulazione coerente con l'ordine visivo.
- [ ] Contrasto testo ≥ WCAG AA. Animazioni rispettano `prefers-reduced-motion`.

## 7. Dati tecnici (se il componente mostra valori)

- [ ] Unità accanto al valore quando c'è rischio di ambiguità.
- [ ] Precisione originale conservata; arrotondamento solo in presentazione.
- [ ] Stato del dato distinguibile: stimato / rilevato / importato / validato.

## 8. Naming e struttura

- [ ] Classe base `rg-<nome>`; varianti `rg-<nome>--<variante>`; elementi `rg-<nome>__<parte>`.
- [ ] Nome per RUOLO, non per aspetto stagionale (es. `--danger`, non `--red`).
- [ ] Nessuna collisione con classi esistenti (verifica in `styles/rg-components.css`).

## 9. Non-duplicazione

- [ ] Ho cercato in `components.json` e nei `components/*.md`: nessun componente esistente
      copre già questo bisogno. Se ne estende uno, è una VARIANTE, non un doppione.
- [ ] Il CSS riusa mixin/pattern esistenti dove possibile invece di reimplementare.

## 10. Coerenza dell'integrazione

- [ ] Voce aggiunta a `components.json` (id univoco, keywords generose, snippet valido).
- [ ] Doc creato in `components/<nome>.md` col template: Scopo → Varianti → Uso e limiti → Struttura.
- [ ] Sezione aggiunta a `examples/rg-components-library.html` + voce nel nav.
- [ ] `since` = versione DS corrente; se introduce un token, versione bumpata.
- [ ] **`npm run lint` (o `node tools/ds-lint.mjs`) passa senza violazioni** — è il gate
      automatico di coerenza doc↔CSS: fallisce se un doc/manifest/esempio cita una classe non
      definita nel CSS, se un `doc` punta a un file inesistente, se un `specimenAnchor` manca in
      vetrina, o se un modulo contiene un HEX crudo.

## 11. Misure di stampa (se il componente finisce su carta)

- [ ] **Prima di contare righe o pagine, escludere che la pagina sfori in larghezza.** Chrome, in
      stampa, se il contenuto è più largo del foglio **rimpicciolisce tutto in silenzio**: nessun
      avviso, nessun errore, solo una pagina più piccola. Ogni conteggio fatto su quel render è
      sbagliato, e lo è **verso l'alto** — entra una riga in più di quante ne entreranno davvero.
- [ ] Il controllo costa niente: **misurare un elemento di larghezza nota** e vedere se torna. Il
      riquadro di un `rg-qr` va benissimo: se `rg-qr--small` nel foglio compatto misura ~16,9 mm la
      pagina è a grandezza vera, se ne misura ~16,0 è stata scalata del 5% e il conto non vale.
      In alternativa `documentElement.scrollWidth` contro `clientWidth`, come per la 1.39.0.
- [ ] Una misura di impaginazione si dichiara **con la configurazione in cui è stata presa** (quale
      documento, quale fase, quali colonne): quante righe stanno in una pagina non è una proprietà
      del CSS, è il risultato di quel foglio lì.

> **Storia vera, 1.38.0 → 1.40.1.** «Diciotto stop per pagina» è finito in tre versioni del DS: nel
> CHANGELOG, in due doc, in una tavola della vetrina e in un commento del CSS. Erano **diciassette**.
> Il foglio degli stop sforava in larghezza e Chrome lo stampava al ~95%; il difetto è saltato fuori
> solo confrontando due render con lo **stesso** CSS, dove lo stesso QR misurava 16,0 mm in uno e 16,9
> nell'altro. Il conto delle righe tornava, ma per il motivo sbagliato — ed era stato ripetuto tante
> volte da sembrare verificato.

---

**Esito atteso del passo VERIFY**: un elenco PASS/FAIL con, per ogni FAIL, la riga di CSS/HTML
incriminata e la correzione applicata. Se tutto PASS, procedere all'aggiornamento del manifest,
del doc e della vetrina, quindi alla proposta di merge sul branch `ds/<nome>`.
