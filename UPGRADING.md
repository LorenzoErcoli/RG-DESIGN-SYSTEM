# Aggiornare il pin del DS

Il DS non si aggiorna da sé in nessun prodotto. Un rilascio nel DS non cambia nulla nei
consumatori finché qualcuno non sposta il pin con un commit esplicito: è la proprietà per cui il
submodule pinnato a un tag è stato scelto (vedi [integration/README.md](integration/README.md)).
Questo documento dice **come** spostarlo e **cosa verificare** dopo.

Il rovescio di quella proprietà è che un prodotto può restare indietro in silenzio, per mesi,
senza che nessuno se ne accorga. Aggiornare il pin è una decisione, non una manutenzione
automatica: va presa, non subita.

## Procedura

Dalla radice del repo consumatore, con `<path>` uguale al path del submodule dichiarato in
`.gitmodules`:

```bash
git -C <path> fetch --tags
git -C <path> checkout v1.14.0
git add <path>
git commit -m "chore: DS a v1.14.0"
```

Il commit registra il **commit** del submodule, non il nome del tag: il tag serve a rendere
leggibile e intenzionale quale commit. Per questo il messaggio di commit deve nominare la
versione — è l'unico posto in cui resta scritta.

Prima di iniziare, il working tree del consumatore deve essere pulito. Un bump del pin mescolato
ad altro lavoro non è più revisionabile: se qualcosa cambia aspetto, non si distingue la causa.

## Verifica dopo il bump

Nell'ordine. Fermarsi al primo che fallisce.

1. **L'ordine di caricamento è ancora quello.** `tokens.css` per primo, poi i moduli di `styles/`
   nell'ordine di `components.json` → `importOrder`. Chi cambia l'ordine rompe la cascata.
2. **Nessuna classe `.rg-*` definita fuori dal DS.** Dalla radice del prodotto, non deve stampare
   nulla:
   ```bash
   grep -rn "\.rg-[a-z-]*\s*{" --include=*.css --include=*.html . | grep -v <path>/
   ```
3. **I token che il prodotto usa in locale hanno ancora il significato di prima.** È il controllo
   che salta più spesso, perché non produce nessun errore: un token che cambia valore mantenendo
   il nome si vede solo a schermo. Le note di migrazione qui sotto dicono, per ogni versione,
   quali token hanno cambiato significato.
4. **Le schermate reali.** Almeno una vista densa (tabella o coda operativa) e una vista di
   lavoro (pannello + canvas) per ogni app.

## Recuperare più rilasci insieme

Un prodotto indietro di più versioni **non fa un salto solo**. Si sale una nota di migrazione per
volta, verificando in mezzo: se si accorpa tutto, quando qualcosa si rompe non è più possibile
dire quale rilascio l'ha rotto, e l'unica strada che resta è bisecare a mano.

La regola pratica: si separa sempre l'ultimo rilascio dagli altri. Prima si sale fino alla
versione precedente a quella nuova, si verifica, poi si sale all'ultima. Così il confronto è
fra due stati e non fra otto.

## Note di migrazione per versione

Solo le versioni che richiedono un'azione o un controllo nel consumatore. Le altre sono additive
e non hanno note: si sale e basta.

### 1.33.0 — il campo a penna cresce invece di sovrapporsi

Nessuna classe rimossa o rinominata, nessun token toccato, nessun markup da cambiare. Un solo punto
da **guardare**: `rg-fill-field__line` passa da `height` a `min-height`.

Prima l'altezza era fissa e un valore stampato troppo lungo usciva **da sopra** il riquadro,
finendo addosso all'etichetta. Ora il campo **si allunga** di una riga di testo. È il comportamento
corretto — su carta due scritte sovrapposte sono un dato perso — ma chi contava sull'altezza fissa
per allineare qualcosa **fuori** dal campo (una colonna accanto, un'altezza calcolata a mano) lo
vede cambiare.

```bash
# dalla radice del prodotto: dove il campo a penna porta un valore già stampato
grep -rn "rg-fill-field__line" --include=*.html --include=*.py . | grep -v <path>/
```

Per ogni occorrenza che **non** è vuota, la domanda è una sola: *se questo valore va a capo, qualcosa
si sposta dove non deve?* Dentro `rg-worksheet-block__fields` la risposta è no — i campi di una fila
restano allineati sul fondo e le basi nere cadono sulla stessa linea.

**Se il prodotto stampa un fascicolo compatto**, `rg-worksheet-block--compact` in `@media print`
diventa più denso (etichette a 10 px, testata su una riga sola, QR a 48 px, titolo più piccolo nel
blocco che continua). **Vale solo in stampa**: a schermo non cambia niente. Da ristampare e guardare:
il numero di pagine cala, e le fasi possono cambiare foglio. Le righe da scrivere **non** cambiano.

**Aggiunte:** `rg-worksheet-foot`, `rg-worksheet-foot__note` — il piede Operatore/Data/Note fuori dal
riquadro della fase. `rg-worksheet-block__foot` resta valido: è un'aggiunta, non una sostituzione.

### 1.13.0 — gerarchia visiva

Revisione di fondazioni: il DS produceva interfacce in cui contenitori e titoli si leggevano
tutti allo stesso livello. Nessun componente nuovo, nessuna classe rinominata, nessuna rimozione:
la superficie di consumo è invariata e **non serve toccare il markup**.

L'aspetto però cambia in modo visibile in ogni vista. È un rilascio da guardare, non solo da
installare.

**Due token cambiano significato mantenendo il nome.** È l'unico punto che può rompere qualcosa
in silenzio: un prodotto che li usa non vede un errore, vede un colore diverso.

| Token | Prima | Dopo | Ruolo nuovo |
| --- | --- | --- | --- |
| `--rg-color-background` | bianco | `neutral-50` | il **fondo della pagina**, non più una superficie |
| `--rg-color-surface` | `neutral-50` | `neutral-100` | la superficie **incassata** (hover, header di modale, righe di dettaglio) |

Il modello nuovo ha tre livelli invece di due: fondo pagina (`--rg-color-background`), contenitore
sollevato (`--rg-color-surface-raised`, bianco), superficie incassata (`--rg-color-surface`). È
lo stesso schema che `rg-workspace` usava già — pannello bianco, stage neutro, canvas bianco — e
che ora vale per tutto il sistema.

**Cosa controllare nel prodotto:**

```bash
# dalla radice del prodotto: ogni riga è un punto da guardare a schermo
grep -rn "rg-color-background\|rg-color-surface" --include=*.css --include=*.html . | grep -v <path>/
```

Per ogni occorrenza, la domanda è una sola: *questo elemento è il fondo della pagina, un
contenitore sollevato, o una superficie incassata?* Un contenitore che usava
`var(--rg-color-background)` per dire "bianco" ora prende un grigio: va spostato su
`--rg-color-surface-raised`.

**Altri cambiamenti visibili, che non richiedono azione:**

- Il corpo del testo passa da 14 a 16 px (`rg-core.css`), la misura che `design-rules.md` §3
  prescriveva già e che `.rg-body` usava già. Le viste dense diventano più alte.
- I titoli dichiarano il proprio peso: pagina 700, contenitore 500. Prima nessun titolo lo
  dichiarava e il peso arrivava dallo user-agent, che manda in grassetto ogni `<h1>`–`<h3>`:
  la gerarchia dipendeva dall'elemento scelto dal consumatore, non dal DS.
- `.rg-section` passa da 32 a 48 px di respiro (`design-rules.md` §5).
- I contenitori generici (`rg-card`, `rg-section-card`) passano al filetto intermedio
  `--rg-color-border-medium`.

**Se il prodotto è su Streamlit:** `integration/streamlit-config.toml` cambia
(`secondaryBackgroundColor` da `#f7f7f5` a `#efefec`) e va **ricopiato** nel `.streamlit/` del
prodotto — è un file che si copia, non che si include, quindi il bump del submodule da solo non
lo aggiorna. La colonna di contenuto Streamlit resta bianca: è una superficie sollevata, non il
fondo della pagina. Alla data di questo rilascio nessun prodotto RG consuma il DS via Streamlit,
quindi la nota vale per il primo che lo farà.

**Aggiunte:**

- `--rg-weight-heading`, `--rg-color-border-medium`, `--rg-color-surface-raised`.
- Modificatore `--emphasis` su `rg-card` e `rg-section-card`, per dichiarare quale contenitore è
  il soggetto della vista. **Una sola per vista**: se tutto è enfatizzato niente lo è, ed è
  esattamente il difetto che questa versione corregge.
