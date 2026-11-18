# Pattern: Review

## Scopo

Validare dati estratti o modifiche confrontandoli con la fonte e registrando una decisione verificabile.

## Layout e gerarchia

Contesto/versione → progresso → confronto fonte/dato → anomalie → decisione. Desktop split view 5/7 o 6/6; sorgente sempre sincronizzata con il record selezionato. Barra azioni sticky ma discreta.

**Dalla 1.57.0 lo split ha le sue classi**: [`rg-review-split`](../components/review-split.md). Due
colonne alte quanto la finestra sotto la testata di pagina, ognuna col suo scorrimento: a sinistra la
fonte (testa ferma + pagine), a destra il modulo con la `rg-action-bar--sticky` al piede della sua
colonna. Sotto 1136 px di contenitore (1200 di finestra nel guscio) resta il modulo e un avviso al
posto della fonte. Le proporzioni non sono più 5/7 o 6/6 ma misure: fonte da 440 px, modulo fra 640 e
880. Quando la fonte è un documento a pagine su cui si sceglie che cosa rivedere, le pagine sono
[`rg-hotspots`](../components/hotspots.md): riquadri cliccabili sul disegno, scelta multipla, uno
aperto.

## Componenti

Table review, badges, form fields, diff, note, primary/secondary/danger buttons, progress testuale.

## Sezioni esempio

- Documento o immagine sorgente
- Campo estratto, confidenza e provenienza
- Valore proposto e valore precedente
- Nota del revisore
- Approva, correggi, rimanda

## Errori da evitare

Approvazione bulk senza riepilogo, differenze affidate solo a rosso/verde, fonte lontana dal dato, shortcut non documentate, perdita delle correzioni al cambio record.

