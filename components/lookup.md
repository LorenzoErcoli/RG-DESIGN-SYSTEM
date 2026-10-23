# Lookup — il campo che chiede all'archivio (`rg-lookup`)

## Scopo

Scrivere un **codice** in un campo di testo mentre l'archivio, interrogato a ogni battuta,
mostra le righe che gli somigliano. La lista **non sta in pagina**: arriva dal server, e al
caricamento non esiste.

Il valore è **ciò che resta nell'input**, anche quando non è fra i suggerimenti: la scheda di
carta ha ragione lei, e se dice un codice che a magazzino non c'è, si scrive quel codice.

## Perché non è una variante di `rg-autocomplete`

Sono due componenti perché sono due **dati**, non due estetiche.

| | `rg-autocomplete` | `rg-lookup` |
| --- | --- | --- |
| Dove stanno le voci | nel markup, un `<li>` per voce | **sul server**, nessuna in pagina |
| Chi filtra | il JS della pagina, per sottostringa | **l'archivio**, a ogni battuta |
| Quante | decine (i materiali: venti) | **181 codici di filato oggi**, ~35.000 articoli quando sarà il magazzino |
| Stati | aperta, chiusa, nessun risultato | **sotto soglia, in ricerca, nessun risultato, archivio muto** |
| La riga | una stringa | **codice + spec + spalla** |
| Il pannello | `position: absolute` sotto il campo | `position: fixed`, perché i suoi contenitori lo taglierebbero |

C'è poi una ragione pratica che da sola basterebbe: nella stessa pagina (l'editor delle schede
della piattaforma) i due campi **convivono**. Un controller delegato su
`.rg-autocomplete__input` prenderebbe anche il campo remoto e proverebbe a filtrare opzioni che
non esistono. Due namespace, nessuna interferenza.

**Quando usare l'altro**: se le voci stanno già nella pagina e sono poche, `rg-autocomplete`
resta la risposta giusta e non va sostituito ([forms.md](forms.md#autocomplete-rg-autocomplete)).

## Varianti

| Classe | Cosa cambia |
| --- | --- |
| `rg-lookup` | base: ciò che si batte è testo |
| `rg-lookup--code` | ciò che si batte è un **codice**: l'input passa a mono e cifre tabulari (regole §3) |

Per i filati si usa `rg-lookup--code`: `621/30` è un dato, e in mono le cifre stanno in colonna
con quelle dei suggerimenti sotto.

Due estensioni della **lista**, indipendenti dalla variante del campo (1.48.0):

| Cosa | Classi | Quando |
| --- | --- | --- |
| **gruppi con titolo** | `rg-lookup__group`, `rg-lookup__group-title`, `rg-lookup__group-list` | le proposte vengono da posti diversi e chi sceglie deve sapere da dove ([sotto](#gruppi-con-titolo)) |
| **riga a nome** | `rg-lookup__name` al posto di `rg-lookup__code`, più `rg-lookup__figure` a destra | la voce è un nome («CANVAS GREGGIO»), non un codice, e porta una cifra da confrontare (un prezzo) |

Per i materiali dell'editor ricamo si usa `rg-lookup` **senza** `--code` (si batte un nome), con i
gruppi e con la riga a nome.

## Gli stati sono del componente, non di chi lo usa

Le frasi sono **qui**, non nel codice del prodotto: due prodotti che scrivono «nessun risultato»
in due modi diversi sono due interfacce diverse. La riga di stato è `rg-lookup__status`, sta in
cima al pannello e porta un modificatore per volta.

| Quando | Classe | Frase |
| --- | --- | --- |
| si è battuto meno della soglia | `rg-lookup__status--hint` | «Batti almeno 2 caratteri» (il numero è la soglia dichiarata) |
| la richiesta è partita e non è tornata | `rg-lookup__status--busy` | «Cerco…» — e la lista porta `aria-busy="true"` |
| l'archivio ha risposto zero righe | `rg-lookup__status--empty` | con `--code`: «Nessun codice somigliante. Quello che hai scritto resta valido.» — senza: «Nessuna voce somigliante. Quello che hai scritto resta valido.» (1.48.0: chi batte «canvas» non ha scritto un codice) |
| l'archivio non ha risposto | `rg-lookup__status--offline` | «Archivio non raggiungibile. Quello che hai scritto resta valido.» |
| ci sono righe | la riga di stato è `hidden` | — |

Tre cose da non perdere:

- **Il testo libero non è un errore, e nessuno stato lo dice.** `--empty` e `--offline`
  dichiarano per esteso che il valore battuto vale. Il campo **non si tinge mai**: niente
  `is-error`, niente `aria-invalid`, niente bordo rosso. Il messaggio dell'autocomplete dei
  materiali («Non nel registro — verrà salvato come extra») qui **non c'entra**: là esiste un
  registro che accoglie l'extra, qui l'archivio è solo una comodità di scrittura.
- **`--offline` è il giallo d'avviso, non il rosso.** Il guasto è dell'archivio, non del valore.
- **Durante «Cerco…» i suggerimenti di prima restano sotto.** La riga di stato sta in cima
  proprio per questo: la lista non si svuota a ogni tasto, e chi legge non vede lampeggiare il
  pannello.

## La riga del suggerimento: tre pezzi, tutti informazione

```
621/30        Tit. 30                              189 volte
└ __code      └ __spec                             └ __aside
```

| Parte | Cos'è | Forma |
| --- | --- | --- |
| `rg-lookup__code` | il **codice**, cioè il valore che finirà nel campo | mono, nero, cifre tabulari, non va a capo |
| `rg-lookup__spec` | il dato **che si controlla** — per i filati il titolo, la grossezza del filo | mono piccolo, `--rg-color-text-label` |
| `rg-lookup__aside` | la **spalla**: informazione secondaria, a destra | corpo piccolo, secondario, **può mancare** |

- La spalla è **facoltativa per contratto**: la riga si compone in flex e senza spalla il codice
  e la spec restano dove sono. Oggi la spalla dice quante volte quel filo compare nelle nostre
  schede («189 volte»), domani la marca e il codice del magazzino («CF · GUT»). Se contiene un
  codice, quel pezzo va in `rg-mono` dentro la spalla.
- **Il titolo si scrive con la sua etichetta**: `Tit. 30`, non `30`. Un numero nudo accanto a un
  altro numero non si legge (regole §8: l'unità sta accanto al valore).
- **La spec non è una ripetizione inutile** anche quando è già dentro il codice: `621/30` la
  contiene, ma è il pezzo che chi compila sta controllando, e va letto senza doverlo estrarre.
- In colonna stretta la riga **va a capo** e la spalla scende sotto, allineata a destra: non si
  schiaccia e non si taglia il codice.

### La riga a nome (proposta 1.48.0)

```
CANVAS GREGGIO        h150 · h160                      3,20 €/m
└ __name              └ __spec                         └ __figure
```

| Parte | Cos'è | Forma |
| --- | --- | --- |
| `rg-lookup__name` | il **nome** della voce, quando non è un codice: un materiale, un articolo per descrizione | corpo (GT America Standard), nero, `sm`; **va a capo** se è lungo, non si taglia |
| `rg-lookup__spec` | come sopra: il dato che si controlla — per un materiale **le altezze dei rotoli** | mono piccolo, label |
| `rg-lookup__figure` | una **cifra con la sua unità** che si confronta riga per riga: il prezzo | mono, cifre tabulari, **testo primario**, a destra; può mancare |

- `__name` e `__code` sono **alternativi**: il nome non va in mono (regole §3 — il mono è per
  codici, misure e quantità), il codice non va nel corpo. Se una voce ha entrambi, il codice
  viene prima e il nome dopo.
- **La cifra non è la spalla.** La spalla è un commento secondario in corpo grigio («189 volte»);
  la cifra è un dato che si confronta, e sta in mono perché i prezzi di righe diverse vanno in
  colonna. Si possono avere entrambe: la spalla spinge a destra, la cifra le sta accanto.
- **La cifra arriva composta, unità compresa**: «3,20 €/m», non `3.2`. Come per la spalla, la
  formattazione è del dominio (virgola, euro, al metro), non del DS. Regole §8: l'unità sta
  accanto al valore.
- Le altezze si scrivono **con la loro sigla** («h150 · h160»), mai numeri nudi — stessa ragione
  di «Tit. 30».

## Gruppi con titolo

Proposta 1.48.0. Quando le proposte vengono da **posti diversi** — i materiali già usati in questo
prodotto, le basi, il magazzino — la lista si divide, e ogni parte porta un titolo che dice **da
dove viene** quella riga. È la stessa voce che può comparire in due gruppi («CANVAS GREGGIO» sta
nel prodotto *e* a magazzino): il titolo è l'informazione che le distingue.

```
Materiale  [ canvas            ]
  DI QUESTO PRODOTTO
    CANVAS GREGGIO
  BASI
    CANVAS NERO
  DAL MAGAZZINO
    CANVAS GREGGIO        h150 · h160      3,20 €/m
    PANAMA VIADANA BIANCO h150             4,10 €/m
```

```html
<ul class="rg-lookup__list" id="materiale-lista" role="listbox" aria-label="Materiali somiglianti">
  <li class="rg-lookup__group" role="group" aria-labelledby="materiale-lista-g0">
    <span class="rg-lookup__group-title" id="materiale-lista-g0" role="presentation">Di questo prodotto</span>
    <ul class="rg-lookup__group-list" role="none">
      <li class="rg-lookup__option" role="option" id="materiale-lista-o0" aria-selected="false" data-valore="CANVAS GREGGIO">
        <span class="rg-lookup__name">CANVAS GREGGIO</span>
      </li>
    </ul>
  </li>
  <li class="rg-lookup__group" role="group" aria-labelledby="materiale-lista-g2">
    <span class="rg-lookup__group-title" id="materiale-lista-g2" role="presentation">Dal magazzino</span>
    <ul class="rg-lookup__group-list" role="none">
      <li class="rg-lookup__option" role="option" id="materiale-lista-o2" aria-selected="false" data-valore="CANVAS GREGGIO">
        <span class="rg-lookup__name">CANVAS GREGGIO</span>
        <span class="rg-lookup__spec">h150 · h160</span>
        <span class="rg-lookup__figure">3,20 €/m</span>
      </li>
    </ul>
  </li>
</ul>
```

Regole del gruppo:

- **Il titolo non è un'opzione.** Non si sceglie, il clic non fa nulla, e **le frecce lo
  saltano**: il controller scorre `.rg-lookup__option` ovunque siano, non i figli della lista.
  Da tastiera si passa dall'ultima riga di un gruppo alla prima del successivo.
- **Il titolo resta fermo in cima** mentre il pannello scorre (`position: sticky`): a metà di
  venti righe di magazzino si sa ancora in che gruppo si è. Le opzioni raggruppate portano uno
  `scroll-margin-top` alto quanto il titolo, così la riga raggiunta da tastiera non gli finisce
  sotto.
- **Il titolo si scrive normale** («Di questo prodotto»): il maiuscolo è del CSS, come per tutte
  le etichette (AGNext, `xs`, spaziatura `--rg-letter-label`). Chi legge l'HTML o lo screen reader
  ha la frase, non un grido.
- **Un gruppo vuoto non si mostra.** Il server può mandarli sempre tutti e tre; il controller
  salta quelli senza righe. Se tutti sono vuoti lo stato è `--empty`, come per una lista piatta.
- **L'ordine dei gruppi e delle righe è del server**, come per la lista piatta.
- **Gruppi e lista piatta non si escludono**: un gruppo senza titolo disegna le sue righe
  direttamente nella lista. Ma in un pannello o tutti hanno il titolo o nessuno: righe orfane
  accanto a righe raggruppate non si sa a quale gruppo appartengano.
- **Il tetto delle 20 righe vale per il totale**, non per gruppo (per esempio 3 + 3 + 14).

## Uso e limiti

**Non è un `<select>`.** Nessuna chiusura della lista sul valore, nessun ripristino del testo
all'uscita, nessuna selezione obbligatoria. Invio senza una riga attiva **non viene
intercettato**: il testo battuto è già il valore.

**La soglia si dichiara, non si indovina**: `data-min` sulla radice (2 se assente). Sotto la
soglia non parte nessuna richiesta — con 35.000 articoli, una ricerca su un carattere è una
risposta inutile pagata da tutti.

**Il pannello è `position: fixed`, e non per gusto.** Il campo vive in due posti che lo
taglierebbero: una griglia di quattro colonne (Filo sopra · Colore sopra · Filo sotto · Colore
sotto), dove una colonna è larga ~150 px, e dentro `rg-modal`, che ha `overflow: hidden` e un
corpo con `overflow-y: auto`. Un pannello in `absolute` lì dentro viene mangiato. Conseguenze
che chi scrive il controller deve accettare:

- le tre misure le scrive **lui**, sul pannello: `--rg-lookup-left`, `--rg-lookup-top`,
  `--rg-lookup-width`, in px;
- il pannello **non segue** il campo da solo: va ricollocato allo `scroll` (in cattura, perché a
  scorrere è il corpo del modale, non la finestra) e al `resize`;
- il pannello è **più largo del campo quando serve**: `min-width` di 24 caratteri, perché in
  colonna stretta tre pezzi in 150 px non ci stanno. Il controller lo riporta dentro la finestra
  se sborda a destra;
- sopra il campo si ribalta da sé quando sotto non c'è spazio.

**Z-index**: `--rg-z-dropdown`. Dentro `rg-modal-backdrop` (che è `--rg-z-modal`) il pannello
resta sopra il contenuto del modale e sotto i toast, perché eredita quel contesto di
impilamento.

**Disabilitato e sola lettura** vengono da `rg-input`, e il pannello non si apre.

**Un campo, un controller.** Il DS **non serve JavaScript**: il controller qui sotto è di
riferimento e va copiato una volta sola nel prodotto, non per ogni campo.

## Struttura

Label → campo → pannello (stato + lista) → aiuto. L'etichetta è un `<label for>` vero e **non
avvolge** il componente: dentro un `<label>` il clic su un'opzione verrebbe rimandato al campo.

```html
<div class="rg-field">
  <label class="rg-field__label" for="filo-sopra">Filo sopra</label>
  <div class="rg-lookup rg-lookup--code" data-min="2">
    <input class="rg-input rg-lookup__input" id="filo-sopra" name="filo_sopra" type="text"
           role="combobox" aria-expanded="false" aria-controls="filo-sopra-lista"
           aria-autocomplete="list" autocomplete="off" spellcheck="false"
           placeholder="Codice filato">
    <div class="rg-lookup__panel" hidden>
      <p class="rg-lookup__status" role="status" hidden></p>
      <ul class="rg-lookup__list" id="filo-sopra-lista" role="listbox" aria-label="Filati somiglianti"></ul>
    </div>
  </div>
  <span class="rg-field__help">Se il codice non è in archivio, scrivilo lo stesso: vale quello.</span>
</div>
```

Una riga, quando il controller la disegna:

```html
<li class="rg-lookup__option" role="option" id="filo-sopra-lista-o0" aria-selected="false" data-valore="621/30">
  <span class="rg-lookup__code">621/30</span>
  <span class="rg-lookup__spec">Tit. 30</span>
  <span class="rg-lookup__aside">189 volte</span>
</li>
```

## Contratto JS

Chi scrive il controller deve rispettare questo, e tanto basta perché il componente sia
conforme.

| Cosa | Dove si scrive |
| --- | --- |
| aperto / chiuso | `aria-expanded` sull'input **e** `hidden` sul pannello — scritti insieme, una sola verità |
| riga raggiunta da tastiera | `aria-selected="true"` + classe `is-active` sull'opzione, `aria-activedescendant` sull'input con l'**id** dell'opzione |
| quali righe scorrono le frecce | **solo** `.rg-lookup__option`, cercate in tutta la lista (`querySelectorAll`), non `lista.children`: con i gruppi i figli della lista sono gruppi, e i titoli non si raggiungono |
| in ricerca | `aria-busy="true"` sulla lista, testo in `rg-lookup__status--busy` |
| posizione | `--rg-lookup-left` / `--rg-lookup-top` / `--rg-lookup-width`, in px, sul pannello |
| valore scelto | nel `value` dell'input, poi un evento `change` (non `input`: rilancerebbe la ricerca) |

Tastiera, come l'autocomplete: **↓/↑** scorrono le opzioni saltando i titoli dei gruppi (↓ a
pannello chiuso rilancia la ricerca),
**Invio** sceglie la riga attiva — e se non c'è riga attiva non fa nulla, **Esc** chiude
lasciando il testo, il **clic** sceglie. Il fuoco **non lascia mai il campo**: le opzioni non
sono raggiungibili con Tab, si annunciano via `aria-activedescendant`.

Due dettagli che si pagano se si saltano: la richiesta va **attesa** (debounce, `data-debounce`,
160 ms di suo) e le risposte **vecchie si buttano** — con 35.000 articoli l'ordine di arrivo non
è l'ordine di partenza, e una risposta in ritardo riscrive la lista con la ricerca di due tasti
fa.

### Controller di riferimento

Indipendente da librerie, nessuna dipendenza. `cerca(q)` restituisce una Promise con le righe
del server — **una lista di righe**, oppure **`{gruppi: [{titolo, righe}]}`** (1.48.0); `riga` è
facoltativo e serve solo se il server parla un'altra lingua. Una riga, dopo `riga`, è
`{valore, codice, nome, spec, spalla, cifra}`: tutti facoltativi tranne `valore`, i vuoti non si
disegnano.

Cosa cambia dalla 1.45.0 (le parti segnate `1.48.0` nel codice): `righe()` cerca le opzioni in
tutta la lista invece di prendere i figli, `disegna()` accetta i gruppi e restituisce quante
opzioni ha disegnato, la riga ha due pezzi in più (`nome`, `cifra`), e la frase di «nessun
risultato» dipende da `--code`. Con le risposte dei filati di oggi il comportamento è identico.

```js
function rgLookup(root, { cerca, riga }) {
  const input = root.querySelector('.rg-lookup__input');
  const panel = root.querySelector('.rg-lookup__panel');
  const stato = root.querySelector('.rg-lookup__status');
  const lista = root.querySelector('.rg-lookup__list');
  const soglia = Number(root.dataset.min || 2);
  const attesa = Number(root.dataset.debounce || 160);
  const MARGINE = 12;
  // 1.48.0: si batte un codice o una parola, e la frase lo rispetta.
  const VUOTO = (root.classList.contains('rg-lookup--code') ? 'Nessun codice' : 'Nessuna voce')
    + ' somigliante. Quello che hai scritto resta valido.';
  const mappa = riga || (r => ({
    valore: r.valore || r.codice || r.nome, codice: r.codice || '', nome: r.nome || '',
    spec: r.spec || (r.titolo ? 'Tit. ' + r.titolo : ''), spalla: r.spalla || '', cifra: r.cifra || ''
  }));
  let timer = null, corsa = 0, attiva = -1;
  // 1.48.0: solo le opzioni, ovunque siano — i titoli dei gruppi le frecce li saltano.
  const righe = () => Array.from(lista.querySelectorAll('.rg-lookup__option'));

  function dimmi(testo, modo) {
    stato.textContent = testo;
    stato.hidden = !testo;
    stato.className = 'rg-lookup__status' + (modo ? ' rg-lookup__status--' + modo : '');
  }

  function colloca() {
    const r = input.getBoundingClientRect();
    panel.style.setProperty('--rg-lookup-width', Math.round(r.width) + 'px');
    panel.style.setProperty('--rg-lookup-left', Math.round(r.left) + 'px');
    const largo = panel.offsetWidth, alto = panel.offsetHeight;
    const sotto = window.innerHeight - r.bottom;
    const giu = sotto >= alto || sotto >= r.top;
    panel.style.setProperty('--rg-lookup-top', Math.round(giu ? r.bottom : Math.max(MARGINE, r.top - alto)) + 'px');
    panel.style.setProperty('--rg-lookup-left', Math.round(Math.max(MARGINE, Math.min(r.left, window.innerWidth - largo - MARGINE))) + 'px');
  }

  function apri(aperto) {
    panel.hidden = !aperto;
    input.setAttribute('aria-expanded', String(aperto));
    if (aperto) colloca();
    else { input.removeAttribute('aria-activedescendant'); attiva = -1; }
  }

  function segna(i) {
    const o = righe();
    if (o[attiva]) { o[attiva].classList.remove('is-active'); o[attiva].setAttribute('aria-selected', 'false'); }
    attiva = i;
    if (!o[i]) { input.removeAttribute('aria-activedescendant'); return; }
    o[i].classList.add('is-active');
    o[i].setAttribute('aria-selected', 'true');
    input.setAttribute('aria-activedescendant', o[i].id);
    o[i].scrollIntoView({ block: 'nearest' });
  }

  function opzione(d, n) {
    const v = mappa(d);
    const li = document.createElement('li');
    li.className = 'rg-lookup__option';
    li.id = lista.id + '-o' + n;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', 'false');
    li.dataset.valore = v.valore;
    [['code', v.codice], ['name', v.nome], ['spec', v.spec],
     ['aside', v.spalla], ['figure', v.cifra]].forEach(([parte, testo]) => {
      if (!testo) return;
      const s = document.createElement('span');
      s.className = 'rg-lookup__' + parte;
      s.textContent = testo;
      li.appendChild(s);
    });
    return li;
  }

  // 1.48.0: `dati` e una lista di righe oppure {gruppi: [{titolo, righe}]}.
  // Un gruppo vuoto non si disegna; uno senza titolo mette le righe nella lista.
  // Restituisce quante opzioni ha disegnato.
  function disegna(dati) {
    attiva = -1;
    lista.textContent = '';
    const gruppi = Array.isArray(dati) ? [{ righe: dati }] : ((dati && dati.gruppi) || []);
    let n = 0;
    gruppi.forEach((g, gi) => {
      const rr = g.righe || [];
      if (!rr.length) return;
      let dove = lista;
      if (g.titolo) {
        const gruppo = document.createElement('li');
        gruppo.className = 'rg-lookup__group';
        gruppo.setAttribute('role', 'group');
        const titolo = document.createElement('span');
        titolo.className = 'rg-lookup__group-title';
        titolo.id = lista.id + '-g' + gi;
        titolo.setAttribute('role', 'presentation');
        titolo.textContent = g.titolo;
        gruppo.setAttribute('aria-labelledby', titolo.id);
        dove = document.createElement('ul');
        dove.className = 'rg-lookup__group-list';
        dove.setAttribute('role', 'none');
        gruppo.append(titolo, dove);
        lista.appendChild(gruppo);
      }
      rr.forEach(d => dove.appendChild(opzione(d, n++)));
    });
    return n;
  }

  function chiedi() {
    const q = input.value.trim();
    if (q.length < soglia) {
      disegna([]); dimmi('Batti almeno ' + soglia + ' caratteri', 'hint'); apri(true); return;
    }
    const mia = ++corsa;
    dimmi('Cerco…', 'busy');
    lista.setAttribute('aria-busy', 'true');
    apri(true);
    Promise.resolve(cerca(q)).then(dati => {
      if (mia !== corsa) return;                  // risposta vecchia: si butta
      lista.removeAttribute('aria-busy');
      if (disegna(dati || [])) dimmi('', '');     // 1.48.0: conta le opzioni, non i gruppi
      else dimmi(VUOTO, 'empty');
      colloca();
    }).catch(() => {
      if (mia !== corsa) return;
      lista.removeAttribute('aria-busy');
      disegna([]);
      dimmi('Archivio non raggiungibile. Quello che hai scritto resta valido.', 'offline');
      colloca();
    });
  }

  function scegli(li) {
    input.value = li.dataset.valore;
    apri(false);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(chiedi, attesa); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { apri(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (panel.hidden) { chiedi(); return; }
      const o = righe(); if (!o.length) return;
      e.preventDefault();
      segna(e.key === 'ArrowDown' ? Math.min(attiva + 1, o.length - 1) : Math.max(attiva - 1, 0));
      return;
    }
    // Invio senza riga attiva non si intercetta: il testo battuto e gia il valore.
    if (e.key === 'Enter' && !panel.hidden && attiva >= 0) { e.preventDefault(); scegli(righe()[attiva]); }
  });
  panel.addEventListener('mousedown', e => {
    e.preventDefault();                           // il campo non perde il fuoco
    const li = e.target.closest('.rg-lookup__option');
    if (li) scegli(li);
  });
  input.addEventListener('blur', () => apri(false));
  const segui = () => { if (!panel.hidden) colloca(); };
  window.addEventListener('scroll', segui, true); // in cattura: a scorrere e il corpo del modale
  window.addEventListener('resize', segui);
}
```

## Il contratto col server

```json
{"codice": "621/30", "numero": "621", "titolo": "30", "spalla": "189 volte"}
```

Va bene così. Il componente legge **`codice`**, **`titolo`** e **`spalla`**; `numero` non lo usa
(resta utile all'applicazione). Tre richieste al server, non al JSON:

1. **`spalla` è testo già composto**, non un numero: «189 volte» oggi, «CF · GUT» domani. La
   frase è dominio, non presentazione — il DS non sa quale sia l'unità di una spalla.
2. **L'ordine delle righe è quello del server**, e il componente non riordina: se «più usato
   prima» è la regola, la applica chi risponde.
3. **Un tetto alle righe** (20 bastano): il pannello ne mostra ~6 e scorre; mandarne 500 è banda
   sprecata e una lista che non si legge.

### Con i gruppi (proposta 1.48.0)

La forma più semplice che il controller di riferimento capisce così com'è, senza `riga`:

```json
{"gruppi": [
  {"titolo": "Di questo prodotto", "righe": [{"nome": "CANVAS GREGGIO"}]},
  {"titolo": "Basi",               "righe": [{"nome": "CANVAS NERO"}]},
  {"titolo": "Dal magazzino",      "righe": [
    {"nome": "CANVAS GREGGIO",        "spec": "h150 · h160", "cifra": "3,20 €/m"},
    {"nome": "PANAMA VIADANA BIANCO", "spec": "h150",        "cifra": "4,10 €/m"}
  ]}
]}
```

- **`valore`** è ciò che finisce nel campo; se manca vale `codice`, se manca anche quello `nome`.
  Serve scriverlo solo quando il valore da salvare non è il testo mostrato (un id, un codice
  articolo dietro un nome).
- **`spec` e `cifra` arrivano composte**: «h150 · h160», «3,20 €/m». Il DS non sa che le altezze
  si scrivono con la h né che i prezzi sono al metro.
- **Il titolo arriva in minuscolo normale**; il maiuscolo lo mette il CSS.
- Un gruppo senza righe si può mandare: non si vede.

## Accessibilità

- Combobox ARIA 1.2: `role="combobox"` + `aria-expanded` + `aria-controls` sull'input,
  `role="listbox"` con nome sulla lista, `role="option"` sulle righe. Il fuoco resta sul campo.
- La **lista contiene solo opzioni**: la riga di stato le sta fuori, come `role="status"`, e
  l'annuncio arriva da lì. Un `<li>` che non è un'opzione dentro un listbox non è ARIA valido —
  è lo stesso difetto corretto nella 1.44.0 per `rg-list-row`.
- **Con i gruppi** (1.48.0) è il listbox raggruppato di ARIA: `listbox > group > option`. Il
  `<li class="rg-lookup__group">` è `role="group"` con `aria-labelledby` sull'id del titolo; il
  titolo è `role="presentation"` (non è un'opzione e non è un'intestazione di pagina) e la
  sottolista `<ul>` è `role="none"`, così nell'albero di accessibilità restano solo gruppi e
  opzioni. Quando la riga attiva entra in un gruppo nuovo, lo screen reader ne annuncia il nome.
- La riga attiva da tastiera si distingue **anche in scala di grigi**: oltre al fondo, un filetto
  nero a sinistra (l'hover ha solo il fondo).
- Bersaglio: 40 px per riga, 44 su `pointer: coarse`.
- Nessuna animazione, quindi niente da disattivare con `prefers-reduced-motion`.

**Il componente non va sulla carta.** È un controllo di compilazione, e il pannello esiste solo
mentre si batte; non ha regole di stampa e non ne servono. Se un giorno una pagina che lo
contiene dovesse stamparsi, il pannello va chiuso prima — un elemento `fixed` aperto in stampa
si ripete su ogni pagina.
