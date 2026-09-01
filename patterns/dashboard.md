# Pattern: Dashboard

## Scopo

Offrire orientamento operativo: lavoro recente, anomalie, attività in attesa e accesso ai flussi principali. Non è una parete di KPI.

## Layout e gerarchia

Header globale → titolo con periodo/ambito → coda operativa principale → riepilogo misurato → attività recenti. Griglia 12 colonne; la coda occupa 7–8 colonne, il contesto 4–5. Mobile in ordine di urgenza.

### Profondità delle zone (dal DS 1.13.0)

La dashboard è la schermata dove la gerarchia si perde più facilmente: molte zone, tutte allo
stesso livello. Dichiarare la profondità di ciascuna, secondo
[design-rules.md §6](../design-rules.md#quale-superficie-a-quale-profondità):

- **Chrome** (header globale, navigazione laterale) → superficie **sollevata**.
- **Colonna di lavoro** (coda operativa, tabelle, riepiloghi) → superficie **sollevata**: il dato
  non si legge sul fondo di pagina, e gli hover di riga presuppongono il bianco sotto.
- **Pannello di contesto/dettaglio** → superficie **rientrante**: è secondario, e si deve vedere
  che lo è.
- Se la vista ha un **soggetto** (la cosa da fare adesso), marcarlo con `rg-card--emphasis` o
  `rg-section-card--emphasis`. **Una sola volta**: la dashboard con tutto in evidenza è la
  dashboard senza gerarchia.

## Componenti

Navigation, table compact, pochi metric card, badge di stato, button primary per il task dominante.

## Sezioni esempio

- File da verificare
- Consumi con scostamento oltre tolleranza
- Ultime revisioni
- Collegamenti a Archivio, Rulebook e strumenti

## Errori da evitare

KPI senza decisione associata, grafici decorativi, card identiche per ogni informazione, accenti stagionali dominanti, feed senza filtri.

