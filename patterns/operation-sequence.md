# Sequenza di operazioni (proposta, non rilasciata)

## Scopo

Uno schema solo per le **operazioni incrementali delle fasi non-ricamo**: pressatura, forno, stampa UV,
stampa MuchColours, sabbiatura. In tutte, dentro una sezione della fase, c'è una lista di righe dove
alcune operazioni si **ripetono** (pressate, passate, infornate), qualcuna **non si ripete** (cambio
piano), qualcuna è **obbligatoria** (soffiatura), qualcuna **facoltativa** (preparazione materiale), e
sotto la lista si legge un **tempo per pezzo**. Il ricamo è escluso: ha il suo compilatore.

Nasce da un giudizio di Lorenzo (2026-09-17): *«il + piazzamento + pressatura hanno bisogno di
un'altra gerarchia, non sembra un bottone e lo metterei a destra in basso invece che a sinistra […]
questa cosa delle operazioni incrementali va studiata bene di interfaccia perché è presente in varie
fasi»*.

**Estensione, non componente nuovo.** La riga resta [`rg-operation-row`](../components/operation-row.md)
e la lista resta `rg-operation-list`. Si aggiunge il **contenitore** `rg-operation-sequence`, che tiene
insieme lista, totale e aggiunta e dà le regole che la riga da sola non poteva dare: la colonna dei gesti
a posti fissi (le righe sono griglie separate, quindi senza un contenitore non si allineano), la riga
spenta, la riga appena aggiunta. Un componente parallelo avrebbe duplicato testa, coda di campi, `hover`,
comportamento sotto i 680 px e regole di tabulazione già scritte e già in uso nella piattaforma.

## Anatomia

```
[ campi della sezione: rg-form-row ]                          (Scopo · Tipo di pressa · Pezzi per ciclo)
┌ rg-operation-list ───────────────────────────────────────────────────────────────────────────┐
│ nome (24ch)          │ campi … «Nota»                         │ ↑ ↓ ⧉ │ 🗑 │  (193 px, fissi) │
│ nome — scelta        │ scelta · Tempo € · resto · «Nota»      │ ↑ ↓ ⧉ │ 🗑 │                  │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
━ Tempo per pezzo      │ piazzamento 1'20" + pressature 45" ÷ 1  │           = 2'05" ━
                                        Aggiungi in fondo  [+ Piazzamento] [+ Pressatura]
```

| Classe | Ruolo |
| --- | --- |
| `rg-operation-sequence` | contenitore; fissa la griglia delle righe (nome 24ch · campi · gesti 193 px) |
| `rg-operation-row__slot` | posto vuoto 40×40 nella colonna dei gesti, `aria-hidden` |
| `rg-operation-row--off` | facoltativa non inclusa: riga bassa, nome in grigio, `__status` a parole, «Includi» |
| `rg-operation-row__status` | la frase di stato della riga spenta («Non inclusa in questa scheda.») |
| `rg-operation-row.is-new` + `rg-operation-row__new` | riga appena aggiunta o duplicata: filetto nero a sinistra + badge «nuova» |
| `rg-operation-sequence__total` (+ `-label`, `-formula`, `-value`) | riga del tempo, stessa griglia delle righe |
| `rg-operation-sequence__total--incomplete` | «non calcolabile: manca …», risultato «—» |
| `rg-operation-sequence__add` (+ `-label`) | comando di aggiunta, in basso a destra |

## Le decisioni

### a) Aggiungere: bottoni con bordo, in basso a destra, «Aggiungi in fondo»

- **Forma**: `rg-button--secondary` con icona `aggiungi` + nome dell'operazione («Pressatura»). Il bordo
  nero lo fa leggere come comando; l'icona è quella del set, non un «+» scritto.
- **Posto**: ultima cosa della sequenza, **allineato a destra**, sotto la riga del totale. A destra sta
  anche la colonna dei gesti: dove si agisce. A sinistra c'è la colonna dei nomi, dove si legge.
- **Etichetta** «Aggiungi in fondo» prima dei bottoni, che fa anche da nome del gruppo
  (`role="group"` + `aria-labelledby`): dice **dove** va la riga, così «si aggiunge in fondo e si
  sposta con le frecce» non va spiegato. Il lettore di schermo legge «Aggiungi in fondo, gruppo,
  Pressatura, pulsante».
- **Un bottone per tipo fino a tre.** L'aggiunta più frequente (tre pressate in M1296) resta a un gesto.
  **Da quattro tipi in su** un menu unico: `rg-action-menu` con trigger `rg-button--secondary`
  «Aggiungi», voci icona + nome. Oltre i tre la fila va a capo e smette di essere una fila.
- **Le facoltative non stanno qui**: non aggiungono una riga in fondo, accendono un'operazione al suo
  posto. Vedi (c).
- **Tastiera**: i bottoni vengono dopo l'ultima riga nella sequenza di Tab (il totale non è un
  controllo). **Mobile**: la fila resta a destra; sotto i 680 px l'etichetta va a capo sopra i bottoni.
- **Senza JS**: `type="submit"` con `formaction`, come oggi.

**Scartate** (in vetrina):

1. *Parole «+ piazzamento» a sinistra* (oggi): senza bordo si leggono come testo, stanno sotto la
   colonna dei nomi, e mescolano aggiunte e facoltative con lo stesso «+».
2. *Un solo «Aggiungi ▾» con menu*: due gesti per l'aggiunta più frequente, tipi invisibili finché non
   si apre. Resta la forma giusta da quattro tipi in su.
3. *Riga-segnaposto in fondo alla lista*: dice bene dove va la riga, ma una fascia tratteggiata larga
   quanto la lista si legge come area di rilascio (il trascinamento è escluso dal 2026-09-16) o come
   stato vuoto; con due tipi serve comunque un menu; e un bersaglio largo tutta la pagina si prende per
   sbaglio passando verso il salvataggio.

### b) I gesti sulla riga: quattro posti fissi a sola icona

**Sposta su · sposta giù · duplica | togli.** Quattro `rg-icon-button--full` (40×40) con
`rg-tooltip`, in due `rg-action-group`: l'ordine e la copia nel primo, l'eliminazione nel secondo, dopo
il filetto. La colonna è larga **193 px** su ogni riga (prima circa 350).

- **Sola icona** perché sono azioni ripetute su ogni riga e con un segno univoco (regola di
  [buttons](../components/buttons.md#icona-testo-o-entrambi)): `sposta-su`, `sposta-giu`, `copia`,
  `elimina`. Il suggerimento è il nome e nomina la riga: «Duplica sotto, con i valori: Pressatura —
  controllo».
- **Togli** è `rg-icon-button--danger`, in un gruppo suo, con la conferma di sempre
  (`data-conferma`). Il rosso compare solo al passaggio: a riposo è un'icona grigia come le altre, e il
  filetto la separa.
- **Duplica** copia i valori e mette la copia **subito sotto** l'originale (non in fondo): le pressate
  consecutive hanno quasi sempre la stessa temperatura e pressione.
- **«Nota» non è un gesto sulla riga: è un campo.** Esce dalla colonna dei gesti e sta **in coda ai
  campi** (`rg-form-row__actions`), ghost con icona `aggiungi` + «Nota», lati stretti (8 px). Premuto,
  apre la casella al suo posto, le passa il fuoco e sparisce. Sulla riga che ha già una nota la casella
  è visibile e il bottone non c'è.
- **Ordine di Tab**: campi della riga → Nota → su → giù → duplica → togli → riga dopo. Nessun tasto
  rapido nuovo, nessun *roving tabindex* (come in operation-row).
- **Sotto i 680 px** i gesti scendono su una linea loro, sotto i campi, allineati a destra.

**Scartate** (in vetrina):

1. *Frecce + tre parole* (oggi): cinque controlli, tre parole dello stesso peso; circa 350 px per riga
   che spingono i campi a capo; «Togli» accanto a «+ Nota» senza separazione.
2. *Frecce + menu «Altro» (Duplica, Nota, Togli)*: nasconde Duplica, che in pressatura si usa quasi a
   ogni riga, e mette un'eliminazione in un menu, che [action-group](../components/action-group.md)
   vieta.
3. *Gesti visibili solo al passaggio o al fuoco* (non in vetrina): non si scoprono, non esistono a
   schermo tattile, e la colonna che compare e scompare fa ballare la riga.

### c) Ripetibili, non ripetibili, obbligatorie, facoltative

Una regola sola: **la natura toglie il posto, lo stato spegne il bottone.**

| Caso | Duplica | Togli | Segno |
| --- | --- | --- | --- |
| ripetibile (pressatura, stampa, infornata, soffiatura) | sì | sì | il suo tipo è fra i bottoni di aggiunta |
| **non ripetibile** (cambio piano, pulizia, tipo di sabbiatura) | **posto vuoto** (`__slot`) | sì o posto vuoto | niente copia; il tipo non è fra i bottoni di aggiunta |
| **obbligatoria, ultima rimasta** (l'unica soffiatura) | come sopra | **spento**, motivo nel suggerimento: «Resta almeno una soffiatura: è obbligatoria» | — |
| alternativa scelta da menu (sabbiatura manuale/automatica) | posto vuoto | spento: «Obbligatoria: per cambiare tipo scegli dal menu Tipo» | il **tipo è il primo campo** e dà il titolo alla riga |
| **facoltativa non inclusa** | — | — | riga `--off` al suo posto: nome in grigio + badge «facoltativa» + «Non inclusa in questa scheda.» + `rg-button--secondary` «Includi» |
| facoltativa inclusa | secondo il tipo | sì: la riga torna spenta | badge «facoltativa» accanto al nome |

- Il posto vuoto tiene le colonne: su · giù · togli restano **nello stesso punto su tutte le righe**,
  e la mano li trova senza guardare. È la stessa ragione per cui la freccia al bordo è spenta e non
  nascosta (1.20.0).
- Il disabilitato ha il motivo **vicino al controllo** (il suggerimento compare anche al fuoco).
- **Il titolo segue la prima scelta.** Dove una scelta dice che cosa è la riga (momento della
  pressatura, metodo della stampa, tipo di sabbiatura) è il **primo campo**, e la testa scrive
  «Pressatura — controllo», «Stampa — BIANCO», «Sabbiatura manuale». Prima della scelta: «Pressatura
  — da scegliere», con la seconda parte in grigio. Così le quattro pressate si distinguono senza
  numeri («non mettiamo i numeri, perché mi confondono»).
- I campi che valgono **solo da una certa riga** (composizione composito|velocità dalla seconda
  stampa) li decide la piattaforma: il DS non ha una classe per questo, la riga ha semplicemente un
  campo in più.
- Le operazioni con il tempo **dichiarato dalla macchina** hanno «Durata» a sola lettura con la
  provenienza (come oggi), niente casella del tempo.

### d) Il totale: stessa griglia, riga della somma

- `rg-operation-sequence__total` usa **la griglia delle righe**: l'etichetta («Tempo per pezzo») cade
  nella colonna dei nomi, la **formula** sotto i campi, il **risultato** sul filo destro della colonna
  dei gesti.
- Sta **subito sotto la lista**, prima dell'aggiunta: una somma si legge sotto la colonna che somma.
  Il filetto sopra è **nero**, sovrapposto al bordo basso della lista: è la riga della somma, l'unico
  nero della sequenza (enfasi, design-rules §6).
- Pesi: etichetta 14 medium identity; formula mono 14 grigia, cifre tabulari («piazzamento 1'20" +
  pressature 45" ÷ 1 pezzo per ciclo»); risultato mono 16 medium nero («= 2'05"»).
- **Non calcolabile**: `--incomplete`. La formula lascia il posto a icona `avviso` + «**Non
  calcolabile:** manca il tempo di «Pressatura — da scegliere».» + link «Vai al campo» (`href` all'`id`
  del campo). Il risultato è «—», **mai 0**. Lo stato si legge senza colore: icona, parole, trattino.
- Un campo della sezione che entra nel calcolo (Pezzi per ciclo) compare nella formula; se manca, la
  frase lo nomina: «manca Pezzi per ciclo».
- Il DS non calcola: la formula e le parole le scrive la piattaforma. Se il totale si ricalcola a
  schermo, lo si fa al `change` (non a ogni tasto) e senza `aria-live`: chi ci arriva lo legge.
- Nessun totale quando non c'è un tempo da sommare, o quando la regola del calcolo non è decisa
  (sezione macchina della stampa UV: vedi domande).

### e) La riga appena aggiunta

- Dopo «Aggiungi», «Duplica» o «Includi» la pagina si ricarica (`submit`). Il server:
  1. mette `is-new` sulla riga e il badge `rg-operation-row__new` «nuova» nella testa;
  2. mette `autofocus` sul **primo campo** della riga (la scelta, se c'è; altrimenti il Tempo): il
     browser porta la riga in vista;
  3. scrive una frase in un `role="status"` nascosto: «Aggiunta Pressatura in fondo alla sequenza.»
     (o «Duplicata … sotto l'originale»).
- **Segno**: filetto nero di 2 px a sinistra della riga + «nuova». **Nessun fondo**: il fondo chiaro è
  dell'hover, e un fondo che sparisce sotto il puntatore non si legge (è lo stesso difetto scartato per
  le linguette delle fasi).
- **Durata**: finché il fuoco non esce dalla riga (controller di riferimento, una riga di JS); senza JS
  fino al caricamento dopo. Nessuna animazione a tempo: una dissolvenza di due secondi si perde se in
  quel momento si guarda la tastiera.
- Il totale, se manca il tempo della riga nuova, passa a «non calcolabile» e porta al campo: la riga
  nuova e il totale dicono la stessa cosa.

## Uso e limiti

- Si posa su una superficie **sollevata** (il corpo del blocco della fase), come operation-row.
- La colonna dei nomi è **24ch** dentro la sequenza (28 nella riga da sola): con 193 px di gesti, a
  1400 px la riga di una pressata (momento, tempo, temperatura, pressione, Nota) sta su una linea. Un
  nome più lungo va a capo nella sua colonna. `--rg-operation-head` resta il comando del contenitore.
- **Righe lunghe** (stampa UV: sette campi) vanno a capo come ogni `rg-form-row`: accettato.
- Il badge di cadenza («per pezzo») si ripete su ogni riga: se tutte le righe della sezione hanno la
  stessa cadenza, si può scrivere una volta nel sottotitolo della sezione (domanda aperta).
- Il pattern non decide la **regola di dominio** (quali operazioni sono ripetibili, obbligatorie,
  facoltative, alternative, quale formula ha il totale): la legge la piattaforma dal catalogo e la
  traduce in posti vuoti, bottoni spenti e righe spente.

## Struttura

```html
<div class="rg-operation-sequence">
  <p class="rg-u-visually-hidden" role="status"><!-- «Aggiunta Pressatura in fondo alla sequenza.» dopo un'aggiunta --></p>
  <ol class="rg-operation-list">
    <li class="rg-operation-row is-new">
      <div class="rg-operation-row__head">
        <span class="rg-operation-row__name">Pressatura <span class="rg-u-muted">— da scegliere</span></span>
        <span class="rg-badge">per pezzo</span>
        <span class="rg-badge rg-operation-row__new">nuova</span>
      </div>
      <div class="rg-form-row">
        <label class="rg-field rg-field--w16"><span class="rg-field__label">Momento</span>
          <select class="rg-select" name="op__61__momento" autofocus><option value="" selected>— da scegliere</option><option>posizionamento</option><option>controllo</option></select></label>
        <label class="rg-field rg-field--w8"><span class="rg-field__label">Tempo (s) <span class="rg-field__mark" aria-hidden="true">€</span></span>
          <input class="rg-input rg-input--numeric" type="text" inputmode="decimal" id="op-61-tempo" name="op__61__tempo" value=""></label>
        <label class="rg-field rg-field--w24" data-nota hidden><span class="rg-field__label">Nota</span><input class="rg-input" name="op__61__note"></label>
        <div class="rg-form-row__actions">
          <button class="rg-button rg-button--ghost" type="button" data-apri-nota aria-label="Nota per Pressatura — da scegliere"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>Nota</button>
        </div>
      </div>
      <div class="rg-operation-row__actions">
        <div class="rg-action-group" role="group" aria-label="Riga Pressatura — da scegliere">
          <span class="rg-tooltip"><button class="rg-icon-button rg-icon-button--full" type="submit" formaction="…/sposta" name="sposta" value="61:su" aria-labelledby="tip-su-61"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-sposta-su"></use></svg></button><span class="rg-tooltip__text" role="tooltip" id="tip-su-61">Sposta in su: Pressatura — da scegliere</span></span>
          <span class="rg-tooltip"><button class="rg-icon-button rg-icon-button--full" type="submit" formaction="…/sposta" name="sposta" value="61:giu" disabled aria-labelledby="tip-giu-61"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-sposta-giu"></use></svg></button><span class="rg-tooltip__text" role="tooltip" id="tip-giu-61">Già l'ultima: Pressatura — da scegliere</span></span>
          <span class="rg-tooltip"><button class="rg-icon-button rg-icon-button--full" type="submit" formaction="…/duplica" name="istanza" value="61" aria-labelledby="tip-dup-61"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-copia"></use></svg></button><span class="rg-tooltip__text" role="tooltip" id="tip-dup-61">Duplica sotto, con i valori: Pressatura — da scegliere</span></span>
          <!-- non ripetibile: <span class="rg-operation-row__slot" aria-hidden="true"></span> al posto di Duplica -->
        </div>
        <div class="rg-action-group">
          <span class="rg-tooltip rg-tooltip--end"><button class="rg-icon-button rg-icon-button--full rg-icon-button--danger" type="submit" formaction="…/togli" name="istanza" value="61" data-conferma="Si toglie «Pressatura» e con lei i valori scritti su questa riga." aria-labelledby="tip-togli-61"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-elimina"></use></svg></button><span class="rg-tooltip__text" role="tooltip" id="tip-togli-61">Togli: Pressatura — da scegliere</span></span>
        </div>
      </div>
    </li>
  </ol>

  <p class="rg-operation-sequence__total rg-operation-sequence__total--incomplete">
    <span class="rg-operation-sequence__total-label">Tempo per pezzo</span>
    <span class="rg-operation-sequence__total-formula"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-avviso"></use></svg><span><strong>Non calcolabile:</strong> manca il tempo di «Pressatura — da scegliere».</span> <a href="#op-61-tempo">Vai al campo</a></span>
    <span class="rg-operation-sequence__total-value">—</span>
  </p>
  <!-- calcolabile: <span class="rg-operation-sequence__total-formula">piazzamento 1'20" + pressature 45" ÷ 1 pezzo per ciclo</span><span class="rg-operation-sequence__total-value">= 2'05"</span> -->

  <div class="rg-operation-sequence__add" role="group" aria-labelledby="aggiungi-pressatura">
    <span class="rg-operation-sequence__add-label" id="aggiungi-pressatura">Aggiungi in fondo</span>
    <button class="rg-button rg-button--secondary" type="submit" formaction="…/ripeti" name="operazione_def" value="piazzamento"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>Piazzamento</button>
    <button class="rg-button rg-button--secondary" type="submit" formaction="…/ripeti" name="operazione_def" value="pressatura"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>Pressatura</button>
  </div>
</div>
```

Facoltativa non inclusa, al suo posto nella lista:

```html
<li class="rg-operation-row rg-operation-row--off">
  <div class="rg-operation-row__head">
    <span class="rg-operation-row__name">Preparazione materiale</span>
    <span class="rg-badge">facoltativa</span>
  </div>
  <p class="rg-operation-row__status">Non inclusa in questa scheda.</p>
  <div class="rg-operation-row__actions">
    <button class="rg-button rg-button--secondary" type="submit" formaction="…/ripeti" name="operazione_def" value="preparazione" aria-label="Includi la preparazione materiale"><svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-aggiungi"></use></svg>Includi</button>
  </div>
</li>
```

Controller di riferimento, facoltativo:

```js
document.addEventListener('click', e => {
  const b = e.target.closest('.rg-operation-row [data-apri-nota]'); if (!b) return;
  const nota = b.closest('.rg-operation-row').querySelector('[data-nota]');
  nota.hidden = false; b.closest('.rg-form-row__actions').hidden = true; nota.querySelector('input').focus();
});
document.addEventListener('focusout', e => {
  const r = e.target.closest && e.target.closest('.rg-operation-row.is-new');
  if (r && e.relatedTarget && !r.contains(e.relatedTarget)) r.classList.remove('is-new');
});
```

## Stati

`default`, `hover` (della riga), `focus` (dei controlli), `is-new` (appena aggiunta), `--off`
(facoltativa non inclusa), gesto spento con motivo (bordo, ultima obbligatoria), posto vuoto (natura),
totale calcolato, totale `--incomplete`, `empty` (nessuna riga: `rg-empty` con i bottoni di aggiunta
come unica azione). L'errore resta del campo (`rg-field.is-error`).

## Da migrare in piattaforma (`_fase_generica.html`)

1. Avvolgere lista, tempo e aggiunte in `rg-operation-sequence`; spostare il tempo **prima**
   dell'aggiunta e scriverlo come `__total`.
2. Duplica e Togli a icona (`copia`, `elimina --danger` in gruppo suo); `__slot` dove non c'è
   `tempo_su_scheda` o dove l'operazione non è ripetibile; Togli `disabled` col motivo invece di
   sparire sull'ultima obbligatoria.
3. «+ Nota» in `rg-form-row__actions` in coda ai campi.
4. `rg-cluster` delle aggiunte → `__add` con `rg-button--secondary` e icona; le facoltative
   (`s.aggiungibili`) diventano righe `--off` al loro posto.
5. Dopo aggiungi/duplica/includi: `is-new`, `autofocus` sul primo campo, frase in `role="status"`.
