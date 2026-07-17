# RG Design System — contesto per AI

Questo repository è la fonte di verità visiva per ogni UI RG. Prima di generare, modificare o revisionare un'interfaccia, leggere nell'ordine:

1. `design-rules.md` integralmente.
2. `tokens.json` e usare i token esistenti invece di inventare valori.
3. `tokens.css` e i moduli in `styles/` per l'implementazione visuale.
4. I file in `components/` relativi agli elementi presenti.
5. Il file in `patterns/` più vicino alla schermata richiesta.

## Import CSS obbligatorio

Le future UI RG devono importare, in quest'ordine: `tokens.css`, `styles/rg-core.css`, `styles/rg-typography.css`, `styles/rg-components.css`, `styles/rg-layout.css` e `styles/rg-utilities.css`. Non copiare CSS da `examples/`: le pagine in quella cartella sono dimostrative e il loro CSS locale riguarda soltanto la presentazione della specimen.

Riutilizzare le classi `.rg-*` e gli stati documentati prima di creare selettori locali. Se manca una variante ricorrente, estendere il modulo appropriato e documentarla; per un'eccezione strettamente applicativa usare CSS locale limitato.

Se le istruzioni del prodotto confliggono con il design system, segnalare il conflitto e proporre l'estensione minima. Non alterare i token globali per risolvere un caso locale.

## Vincoli non negoziabili

- Base permanente esclusivamente nera e bianca.
- Azioni primarie, navigazione e selezioni principali non usano colori stagionali.
- AGNext per titoli, navigazione e label identitarie; GT America Standard per testo; GT America Mono per dati, codici, misure, log e versioni.
- Niente gradienti decorativi, glassmorphism, ombre vistose o radius da interfaccia giocosa.
- Preferire bordi sottili, griglie, allineamenti e spazio bianco.
- Non trasformare ogni contenuto in una card: usare superfici aperte e separatori quando bastano.
- Ogni stato deve essere comprensibile anche senza dipendere dal colore.

## Procedura di generazione

1. Identificare tipo di schermata, utente, compito principale e densità dei dati.
2. Scegliere un pattern esistente; dichiarare eventuali scostamenti.
3. Importare la base CSS RG e comporre con componenti documentati.
4. Applicare token semantici (`--rg-color-action-primary`, non un HEX diretto).
5. Verificare responsive, focus, empty/loading/error state e leggibilità dei dati.
6. Per valori tecnici, preservare unità, precisione, provenienza e stato di validazione.

## Output atteso dagli assistenti

- Codice semplice, accessibile e indipendente da librerie quando non richieste.
- Nomi che descrivono il ruolo, non l'aspetto stagionale.
- Eccezioni motivate in commenti brevi o documentazione.
- Nessun font file incorporato.

## Priorità delle fonti

In caso di ambiguità: regole RG → token semantici → componente → pattern → necessità locale. Il PDF e Figma, quando collegati e approvati, completeranno questa gerarchia; eventuali divergenze devono essere risolte esplicitamente.

> TODO — Aggiungere URL/versione del PDF e chiave del file Figma ufficiale.
