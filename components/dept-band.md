# Dept band (banda di reparto)

## Scopo

La banda che, sul bordo di un blocco di lavorazione, dice **a quale reparto appartiene questo
foglio**. Serve a trovarlo nel mucchio e a smistarlo, non a decorarlo.

Il vincolo che decide la forma: **il foglio viene quasi sempre fotocopiato in bianco e nero**, e il
colore si perde. Quindi la banda porta **tre segnali ridondanti**, sempre tutti e tre:

| Segnale | Cosa fa | Cosa gli succede in fotocopia |
| --- | --- | --- |
| **(a) Colore** | acceleratore: trovare il foglio a colpo d'occhio | si perde, o diventa un grigio ambiguo |
| **(b) Nome** in maiuscolo sulla banda | l'informazione, in chiaro | resta, ma va letto |
| **(c) Trama** (direzione, spessore, passo del tratteggio) | riconoscimento a colpo d'occhio senza leggere | **resta intatta** |

Il colore è un acceleratore, **mai** l'unica informazione — è la regola generale del DS («nessuno
stato dipende dal solo colore», regole §4 e §2 dei vincoli non negoziabili) applicata a un supporto
che il colore lo perde per davvero.

## Varianti

Sette reparti, sette coppie **colore + trama**. La trama è scelta per restare distinguibile in scala
di grigi: direzione diversa, o spessore diverso, o passo diverso — mai due varianti che differiscono
per il solo colore.

| Variante | Reparto | Trama |
| --- | --- | --- |
| `rg-dept-band--ricamo` | Campionario Ricamo | verticale fitta |
| `rg-dept-band--laser` | Stampa Laser e HF | diagonale `/` sottile e rada |
| `rg-dept-band--pressatura` | Pressatura e soffiatura | diagonale `\` spessa |
| `rg-dept-band--strass` | Strass e applicazioni | orizzontale fitta |
| `rg-dept-band--finissaggio` | Finissaggio e Controllo Qualità | reticolo incrociato |
| `rg-dept-band--incollature` | Incollature | verticale larga e rada |
| `rg-dept-band--accoppiaggi` | Accoppiaggi | campo pieno (l'assenza di trama è la settima trama) |

Senza variante la banda esiste comunque: filetto nero, nessuna campitura. È il caso «reparto non
assegnato», e si legge come tale.

## Uso e limiti

**Il nome è contenuto, non CSS.** `rg-dept-band__name` è testo nel markup, non `content:` generato.
Se il CSS non arriva — mail, export, un PDF renderizzato male — la parola resta. La targhetta è
bianca opaca con filetto nero perché il nome deve restare leggibile **sopra qualsiasi trama**.

**Il maiuscolo è ammesso qui** perché è una micro-label identitaria di due o tre parole, come
`rg-label`. Le regole vietano il maiuscolo in *paragrafi e tabelle dense* (§2), non su un'etichetta.

**La trama è una campitura, non un gradiente.** Tecnicamente è un `repeating-linear-gradient` a stop
netti, ma non è decorazione: porta informazione, ed è l'unico segnale che sopravvive alla
fotocopia. Eccezione dichiarata alle regole §2, ambito: documenti stampati (regole §12).

**In stampa serve `print-color-adjust`.** I browser per default non stampano gli sfondi: senza la
riga in `rg-utilities.css` la banda arriverebbe sulla carta con due segnali su tre spenti. È già
gestito dal DS, l'app non deve fare nulla.

**Il colore riusa la palette categoriale** `--rg-color-category-1…7`, che a sua volta è un alias di
valori già in palette: nessun colore nuovo entra nel brand. **Conseguenza da conoscere**:
`category-3/4/5` valgono quanto `danger`, `warning` e `success`. Su una scheda di lavorazione
stampata non c'è nessun colore di stato accanto, e il nome del reparto è scritto sulla banda, quindi
una banda rossa non si legge come «errore». **Non** mettere `rg-dept-band` in una vista a schermo
dove convivono alert e badge di stato senza aver deciso cosa succede a quella lettura.

**Il legame con l'organigramma è dichiarato.** Le sette varianti hanno il nome dei sette reparti RG
perché sono sette e sono stabili, e perché in un template il nome parla mentre un numero no. Se
nasce un ottavo reparto si aggiunge un'ottava variante al DS: la mappa reparto → variante vive
nell'app, non in un `if` sparso nel markup.

**Non è un badge.** `rg-badge` classifica un record dentro una lista a schermo; questa è
un'intestazione di appartenenza sul bordo di un documento. Non ha stati, non è interattiva.

## Struttura

```html
<p class="rg-dept-band rg-dept-band--finissaggio">
  <span class="rg-dept-band__name">Finissaggio e Controllo Qualità</span>
  <span class="rg-dept-band__note">Fase 05 / 07</span>
</p>
```

Come primo figlio di un blocco di lavorazione, a filo dei suoi bordi:

```html
<section class="rg-worksheet-block">
  <p class="rg-dept-band rg-dept-band--strass">
    <span class="rg-dept-band__name">Strass e applicazioni</span>
  </p>
  <header class="rg-worksheet-block__head">…</header>
</section>
```
