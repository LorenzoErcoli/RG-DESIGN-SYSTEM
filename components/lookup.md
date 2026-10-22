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

## Gli stati sono del componente, non di chi lo usa

Le frasi sono **qui**, non nel codice del prodotto: due prodotti che scrivono «nessun risultato»
in due modi diversi sono due interfacce diverse. La riga di stato è `rg-lookup__status`, sta in
cima al pannello e porta un modificatore per volta.

| Quando | Classe | Frase |
| --- | --- | --- |
| si è battuto meno della soglia | `rg-lookup__status--hint` | «Batti almeno 2 caratteri» (il numero è la soglia dichiarata) |
| la richiesta è partita e non è tornata | `rg-lookup__status--busy` | «Cerco…» — e la lista porta `aria-busy="true"` |
| l'archivio ha risposto zero righe | `rg-lookup__status--empty` | «Nessun codice somigliante. Quello che hai scritto resta valido.» |
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
| in ricerca | `aria-busy="true"` sulla lista, testo in `rg-lookup__status--busy` |
| posizione | `--rg-lookup-left` / `--rg-lookup-top` / `--rg-lookup-width`, in px, sul pannello |
| valore scelto | nel `value` dell'input, poi un evento `change` (non `input`: rilancerebbe la ricerca) |

Tastiera, come l'autocomplete: **↓/↑** scorrono (↓ a pannello chiuso rilancia la ricerca),
**Invio** sceglie la riga attiva — e se non c'è riga attiva non fa nulla, **Esc** chiude
lasciando il testo, il **clic** sceglie. Il fuoco **non lascia mai il campo**: le opzioni non
sono raggiungibili con Tab, si annunciano via `aria-activedescendant`.

Due dettagli che si pagano se si saltano: la richiesta va **attesa** (debounce, `data-debounce`,
160 ms di suo) e le risposte **vecchie si buttano** — con 35.000 articoli l'ordine di arrivo non
è l'ordine di partenza, e una risposta in ritardo riscrive la lista con la ricerca di due tasti
fa.

### Controller di riferimento

Indipendente da librerie, nessuna dipendenza. `cerca(q)` restituisce una Promise con le righe
del server; `riga` è facoltativo e serve solo se il server parla un'altra lingua.

```js
function rgLookup(root, { cerca, riga }) {
  const input = root.querySelector('.rg-lookup__input');
  const panel = root.querySelector('.rg-lookup__panel');
  const stato = root.querySelector('.rg-lookup__status');
  const lista = root.querySelector('.rg-lookup__list');
  const soglia = Number(root.dataset.min || 2);
  const attesa = Number(root.dataset.debounce || 160);
  const MARGINE = 12;
  const mappa = riga || (r => ({
    valore: r.codice, codice: r.codice,
    spec: r.titolo ? 'Tit. ' + r.titolo : '', spalla: r.spalla || ''
  }));
  let timer = null, corsa = 0, attiva = -1;
  const righe = () => Array.from(lista.children);

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

  function disegna(dati) {
    attiva = -1;
    lista.textContent = '';
    dati.forEach((d, i) => {
      const v = mappa(d);
      const li = document.createElement('li');
      li.className = 'rg-lookup__option';
      li.id = lista.id + '-o' + i;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.dataset.valore = v.valore;
      [['code', v.codice], ['spec', v.spec], ['aside', v.spalla]].forEach(([parte, testo]) => {
        if (!testo) return;
        const s = document.createElement('span');
        s.className = 'rg-lookup__' + parte;
        s.textContent = testo;
        li.appendChild(s);
      });
      lista.appendChild(li);
    });
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
      disegna(dati || []);
      if (dati && dati.length) dimmi('', '');
      else dimmi('Nessun codice somigliante. Quello che hai scritto resta valido.', 'empty');
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

## Accessibilità

- Combobox ARIA 1.2: `role="combobox"` + `aria-expanded` + `aria-controls` sull'input,
  `role="listbox"` con nome sulla lista, `role="option"` sulle righe. Il fuoco resta sul campo.
- La **lista contiene solo opzioni**: la riga di stato le sta fuori, come `role="status"`, e
  l'annuncio arriva da lì. Un `<li>` che non è un'opzione dentro un listbox non è ARIA valido —
  è lo stesso difetto corretto nella 1.44.0 per `rg-list-row`.
- La riga attiva da tastiera si distingue **anche in scala di grigi**: oltre al fondo, un filetto
  nero a sinistra (l'hover ha solo il fondo).
- Bersaglio: 40 px per riga, 44 su `pointer: coarse`.
- Nessuna animazione, quindi niente da disattivare con `prefers-reduced-motion`.

**Il componente non va sulla carta.** È un controllo di compilazione, e il pannello esiste solo
mentre si batte; non ha regole di stampa e non ne servono. Se un giorno una pagina che lo
contiene dovesse stamparsi, il pannello va chiuso prima — un elemento `fixed` aperto in stampa
si ripete su ogni pagina.
