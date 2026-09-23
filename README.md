# RG Design System

RG Design System è la base visiva e operativa condivisa per gli strumenti interni ERREGI: applicazioni di analisi del ricamo, consumi, archivio, regole, generazione pattern e ricerca tessile.

Il sistema traduce l'identità RG in regole leggibili sia da persone sia da assistenti AI. Privilegia precisione tecnica, ritmo editoriale, manifattura e sobrietà. Non è una libreria applicativa e non impone un framework.

## Principi essenziali

- Nero e bianco costituiscono l'interfaccia permanente.
- Le palette annuali sono accenti contestuali, mai il colore principale di navigazione o azioni primarie.
- AGNext dà identità; GT America Standard sostiene la lettura; GT America Mono rappresenta dati e codici.
- Griglie, spazio bianco e linee sottili definiscono la gerarchia più di ombre o decorazioni.
- La gerarchia è **dichiarata**: peso per livello di titolo, tre gradini di superficie (fondo, sollevata, rientrante) e tre gradini di linea (neutro, intermedio, nero). Nessuno di questi arriva dallo user-agent o dall'abitudine.
- Ogni vista deve distinguere chiaramente contenuto editoriale, dati tecnici e azioni.

## Come usarlo

1. Leggere [design-rules.md](design-rules.md).
2. Importare o tradurre i token da [tokens.json](tokens.json) o [tokens.css](tokens.css).
3. Consultare la documentazione dei componenti necessari in `components/`.
4. Scegliere il pattern di schermata più vicino in `patterns/`.
5. Verificare contrasto, stati, densità e leggibilità prima di introdurre eccezioni.

Per una generazione assistita da AI, fornire anche [AI_CONTEXT.md](AI_CONTEXT.md) come contesto iniziale.

## Accesso locale

[`index.html`](index.html) è il punto di accesso locale al design system. Apre una home documentale con collegamenti diretti a fondazioni, component library, pattern, esempi, token e contesto AI. Non richiede build, librerie o JavaScript: può essere aperta direttamente in un browser oppure servita come sito statico.

## Struttura

- `tokens.*`: valori primitivi e semantici.
- `index.html`: indice locale e home della documentazione.
- `styles/`: CSS riutilizzabile, modulare e framework-agnostic.
- `components/`: contratti visivi dei singoli elementi ([buttons](components/buttons.md), [forms](components/forms.md), [cards](components/cards.md), [badges](components/badges.md), [tables](components/tables.md), [navigation](components/navigation.md), [lists](components/lists.md)).
- `patterns/`: composizione di schermate ricorrenti.
- `integration/`: contratto di consumo — come i prodotti caricano il DS ([Streamlit](integration/streamlit.md), [FastAPI](integration/fastapi.md)).
- `examples/`: future implementazioni di riferimento.
- `figma/`: indicazioni per collegare la libreria Figma.
- `agent/`, `tools/`: checklist di verifica e lint di coerenza. Non fanno parte della superficie servita.

## Using RG CSS

Ogni interfaccia RG deve caricare prima i token e poi i moduli CSS nell'ordine seguente:

```html
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/tokens.css">
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/styles/rg-core.css">
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/styles/rg-typography.css">
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/styles/rg-components.css">
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/styles/rg-layout.css">
<link rel="stylesheet" href="/RG-DESIGN-SYSTEM/styles/rg-utilities.css">
```

`tokens.css` contiene esclusivamente valori e alias. I file in `styles/` implementano reset, tipografia, componenti, composizioni e utility. Le applicazioni possono omettere `rg-utilities.css` se non usano helper atomici — ma non chi produce documenti stampabili: da 1.14.0 la paginazione delle schede di lavorazione e la geometria di pagina opt-in vivono lì, nell’unico `@media print` del sistema. In nessun caso si copiano gli stili dalla specimen page.

I percorsi sopra sono illustrativi. Per il modo concreto in cui un prodotto risolve questi percorsi dal submodule — mount FastAPI, iniezione Streamlit, ordine vincolante — vedi [integration/](integration/README.md).

Le classi di stato condivise sono `is-selected`, `is-loading`, `is-error`, `is-warning`, `is-success`, `is-expanded`, `is-collapsed` e `is-disabled`. Quando esiste un equivalente semantico HTML/ARIA (`disabled`, `aria-selected`, `aria-expanded`, `aria-invalid`, `aria-busy`), usare entrambi in modo coerente.

## Font

I font ufficiali sono AGNext, GT-America-Standard e GT-America-Mono. I file font non sono inclusi: ogni prodotto deve caricarli tramite i canali autorizzati ERREGI. I fallback presenti nei token servono solo a mantenere leggibile l'interfaccia durante lo sviluppo.

## Stato e governance

Versione corrente `1.40.0`: il contratto di consumo è stabile. Le modifiche ai token permanenti richiedono revisione trasversale; le palette stagionali possono evolvere senza modificare i ruoli semantici. Eccezioni specifiche di prodotto vanno documentate vicino al relativo pattern, non incorporate silenziosamente nei token globali.

Il prefisso `rg-` appartiene al DS: nessun prodotto definisce classi `.rg-*` in locale. Un componente d'applicazione usa un prefisso proprio.

I prodotti consumano il DS come **git submodule pinnato a un tag** semver, mai a un branch: il pin si sposta solo con un commit esplicito nel repo consumatore. Vedi [integration/README.md](integration/README.md). Per spostare il pin e sapere cosa verificare dopo, [UPGRADING.md](UPGRADING.md).

Prima di proporre un merge, `npm run lint` deve uscire con 0: è il gate di coerenza fra documentazione, manifest e CSS.

### Changelog

Storico completo e politica di versionamento in [CHANGELOG.md](CHANGELOG.md).

> TODO — Fonti: collegare qui il PDF istituzionale esistente e il file/libreria Figma quando saranno disponibili.
