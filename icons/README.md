# Icone RG

`rg-icons.svg` è lo sprite delle icone del design system: un `<symbol>` per icona, id
`rg-icon-<nome>`. Regole d'uso, elenco dei nomi e sostituzioni dei caratteri Unicode:
[`components/icons.md`](../components/icons.md).

## Provenienza e licenza

Disegno proprio RG (v1.17.0), fatto per questo sistema. Non contiene codice né tracciati di
terzi, quindi non porta licenze esterne: vale la licenza del repository.

## Regole di disegno (per aggiungere un'icona)

- Tavola `viewBox="0 0 24 24"`, area viva 3–21: il margine di 3 fa l'allineamento ottico col
  testo, e non va compensato con margini sul bottone.
- Tratto `1.5`, `stroke-linecap="square"`, `stroke-linejoin="miter"`, `fill="none"`. A 16 px il
  tratto è 1 px pieno; a 20 px 1,25; a 24 px 1,5.
- Solo linee rette, archi di cerchio e cerchi. Niente riempimenti, salvo punti sotto i 3 px di
  diametro («altro»).
- Colore dal contesto (`currentColor`), mai un colore nel file.
- Un'icona nuova entra solo se un'azione reale della piattaforma la chiede e nessuna icona
  esistente la dice già. Il nome è l'azione in italiano, non la figura (`elimina`, non `cestino`).
- Dopo l'aggiunta: voce nella tabella di `components/icons.md`, tessera nella vetrina,
  `npm run lint`. Il lint fallisce se un doc o un esempio cita un id che nello sprite non c'è.
