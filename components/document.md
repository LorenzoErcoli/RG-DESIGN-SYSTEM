# Document (il documento della fase)

## Scopo

Dire **che documento ha questa entità** e dare le azioni su quel documento, in **una riga sola** che
non va a capo alle larghezze d'uso. Il caso d'origine è la scheda macchina (PDF) di una fase di
ricamo; il componente vale per ogni entità che ha **un** documento di lavoro.

### Perché sostituisce `rg-file-card--bar` (1.17.0)

Misurata sul server vero, la barra della 1.17.0 era alta 99 px a 1440 e a 1280 px. Il nome del file
stava da solo sulla prima riga, e sei bottoni dello stesso aspetto andavano sulla seconda: Visualizza
scheda · Scarica PDF · PDF caricato · Parti collegate · Carica un'altra scheda… · Compila scheda,
circa 960 px in tutto. «Compila scheda» c'era, ma chi la cercava non la trovava: era l'ultima di sei
bottoni uguali. Il giudizio: *«quell'oggetto in cima con il pdf si rompe subito con i bottoni e non è
chiaro per niente. Fai una componente più elegante»*.

Tre difetti, tre correzioni:

| Difetto della barra | `rg-document` |
| --- | --- |
| sei azioni con lo stesso peso | **gerarchia**: tre azioni di lettura a sola icona, una azione rara con icona e testo dopo un filetto |
| azioni che non sono sul documento (Parti collegate, Compila scheda) | **solo il documento**: il compilatore e le parti collegate stanno nella sezione Sequenza stop |
| ripetuta in cima a due sezioni | **una volta sola**, nella testa del blocco della fase: si vede da ogni sezione |

## Varianti

| Classe | Stato |
| --- | --- |
| `rg-document` | documento presente: tipo, nome, stato, azioni di lettura, «Carica un'altra scheda…» |
| `rg-document--empty` | documento assente: tipo, «Nessuna scheda su questa fase.», primaria «Carica la scheda» |

| Elemento | Ruolo |
| --- | --- |
| `rg-document__bar` | la riga, alta 67 px (controlli da 41, 12 di respiro sopra e sotto, filetto) |
| `rg-document__file` | icona, tipo, nome e stato; si stringe per primo |
| `rg-document__icon` | l'icona del documento (`rg-icon--md`) |
| `rg-document__kind` | il tipo di documento, per esteso: «Scheda macchina» |
| `rg-document__name` | il nome del file, in mono; tronco coi puntini quando lo spazio manca, per intero in `title` e nel DOM |
| `rg-document__reveal` | la zona che compare dopo la scelta di un file: opzioni di lettura e conferma |
| `rg-document__options`, `rg-document__confirm` | i due contenuti della zona |

Le azioni stanno in due `rg-action-group` dentro `__bar`: il filetto fra i due gruppi lo mette il DS.

## Uso e limiti

- **Una riga, sempre.** Sopra i 680 px non va a capo: il nome si accorcia coi puntini. Sotto i
  680 px il file va su una riga e le azioni sulla successiva.
- **Gerarchia delle azioni** (regole di [buttons](buttons.md#icona-testo-o-entrambi)):
  1. **Leggere il documento**: Visualizza scheda compilata · Scarica PDF · PDF caricato così com'è.
     Frequenti e di pari peso, quindi **sola icona** con suggerimento (`rg-icon-button--full` +
     `rg-tooltip`). Il suggerimento dice il nome intero e «nuova scheda» dove serve.
  2. **Cambiare il documento**: «Carica un'altra scheda…». Rara, quindi **icona + testo**, dopo il
     filetto.
- **Nessuna primaria quando il documento c'è.** La primaria della pagina è il compilatore, e sta
  nella sua sezione. Quando il documento manca, la primaria è «Carica la scheda»: è l'unica cosa da
  fare.
- **Solo azioni sul documento.** «Parti collegate» e «Apri il compilatore» stanno nell'intro della
  sezione Sequenza stop. «Torna alla prima lettura» ed «Elimina fase» sono gesti sulla fase: non
  toccano il PDF, cambiano i dati della fase, e stanno in `rg-phase-panel__gestures`.
- **Stessa posizione nei due stati**: nella testa del blocco, sotto il riepilogo e sopra le tab.
- **Il nome non è un'intestazione** (`<span>`): il titolo della pagina è la fase.
- **Superficie rientrante** (`--rg-color-surface`) dentro la testa bianca del blocco: la riga si
  legge come un oggetto, senza diventare una card.
- **Rivelazione progressiva**: scelto un file, `__reveal` perde `hidden` e mostra opzioni e conferma.
  Stesso contratto JS di `rg-file-card`: al `change` dell'input, `reveal.hidden = !file`.

## Misure (vetrina e pagina di prova, scheda «1296 DAV RIW OBLIQUE - GRIS.pdf»)

Blocco della fase dentro `rg-appshell__main` (32 px di padding per lato):

| Finestra | Riga del documento | Nome | Gesti sulla fase | Azioni della sezione |
| --- | --- | --- | --- | --- |
| 1024 px | una riga, 67 px | intero | sulla riga del titolo | una riga |
| 1280 px | una riga, 67 px | intero | sulla riga del titolo | una riga |
| 1440 px | una riga, 67 px | intero | sulla riga del titolo | una riga |

## Struttura

Documento presente:

```html
<div class="rg-document">
  <div class="rg-document__bar">
    <div class="rg-document__file">
      <svg class="rg-icon rg-icon--md rg-document__icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>
      <span class="rg-document__kind">Scheda macchina</span>
      <span class="rg-document__name" title="1296 DAV RIW OBLIQUE - GRIS.pdf">1296 DAV RIW OBLIQUE - GRIS.pdf</span>
      <span class="rg-badge rg-badge--parsed">letta</span>
    </div>
    <div class="rg-action-group" role="group" aria-label="Leggi la scheda">
      <span class="rg-tooltip">
        <a class="rg-icon-button rg-icon-button--full" href="…/scheda-compilata?inline=1" target="_blank" rel="noopener" aria-labelledby="tip-doc-vedi"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-apri-esterno"></use></svg></a>
        <span class="rg-tooltip__text" role="tooltip" id="tip-doc-vedi">Visualizza la scheda compilata (nuova scheda)</span>
      </span>
      <span class="rg-tooltip">
        <button class="rg-icon-button rg-icon-button--full" type="button" data-scarica="…/scheda-compilata" aria-labelledby="tip-doc-scarica"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-scarica"></use></svg></button>
        <span class="rg-tooltip__text" role="tooltip" id="tip-doc-scarica">Scarica il PDF compilato</span>
      </span>
      <span class="rg-tooltip">
        <a class="rg-icon-button rg-icon-button--full" href="…/source-pdf" target="_blank" rel="noopener" aria-labelledby="tip-doc-originale"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg></a>
        <span class="rg-tooltip__text" role="tooltip" id="tip-doc-originale">PDF caricato, così com'è (nuova scheda)</span>
      </span>
    </div>
    <div class="rg-action-group">
      <label class="rg-file-input__control">
        <input type="file" name="pdf_file" accept=".pdf" form="carica-scheda" required>
        <span class="rg-button rg-button--ghost"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-carica"></use></svg>Carica un'altra scheda…</span>
      </label>
    </div>
  </div>
  <div class="rg-document__reveal" hidden>
    <div class="rg-document__options"><!-- opzioni di lettura --></div>
    <div class="rg-document__confirm"><button class="rg-button rg-button--primary" type="submit" form="carica-scheda">Ricarica e rileggi</button></div>
  </div>
</div>
```

Documento assente, stessa riga:

```html
<div class="rg-document rg-document--empty">
  <div class="rg-document__bar">
    <div class="rg-document__file">
      <svg class="rg-icon rg-icon--md rg-document__icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-documento"></use></svg>
      <span class="rg-document__kind">Scheda macchina</span>
      <span class="rg-document__name">Nessuna scheda su questa fase.</span>
    </div>
    <div class="rg-action-group">
      <label class="rg-file-input__control">
        <input type="file" name="pdf_file" accept=".pdf" form="carica-scheda" required>
        <span class="rg-button rg-button--primary"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-carica"></use></svg>Carica la scheda</span>
      </label>
    </div>
  </div>
  <div class="rg-document__reveal" hidden>
    <div class="rg-document__options"><!-- opzioni di lettura --></div>
    <div class="rg-document__confirm"><button class="rg-button rg-button--primary" type="submit" form="carica-scheda">Carica e leggi</button></div>
  </div>
</div>
```

Il form di caricamento (`<form id="carica-scheda" method="post" enctype="multipart/form-data" action="…/pdf"></form>`)
sta fuori dal documento, e i controlli lo raggiungono con `form=`: la testa del blocco non annida form.

## Migrazione da `rg-file-card--bar`

| 1.17.0 | 1.18.0 |
| --- | --- |
| barra in cima a Scheda macchina **e** a Sequenza stop | `rg-document` **una volta**, in `rg-phase-panel__document`, nella testa del blocco |
| Visualizza scheda · Scarica PDF · PDF caricato, bottoni con testo | tre `rg-icon-button--full` con `rg-tooltip` |
| «Carica un'altra scheda…» `--outline` | stesso picker, `--ghost` con icona, nel secondo gruppo |
| «Parti collegate» | intro di Sequenza stop, `--secondary` con icona |
| «Compila scheda», primaria ultima | intro di Sequenza stop, **«Apri il compilatore»**, primaria |
| «Compila a mano» (stato vuoto) | tolto dal documento: il compilatore sta nella sua sezione |
| `__reveal` / `__options` / `__confirm` | `rg-document__reveal` / `__options` / `__confirm`, stesso contratto JS |

`rg-file-card--bar` resta nel CSS e non cambia aspetto: è **superata**, non rimossa. Sparirà solo in
una major.
