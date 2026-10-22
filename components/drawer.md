# Drawer — il pannello laterale (`rg-drawer`)

## Scopo

Un pannello che **entra da destra sopra la pagina** e ci resta finché non lo si chiude, mentre la
pagina sotto resta leggibile. Nasce per l'**assistenza** della piattaforma prodotti: si apre da un
bottone nella topbar, in qualunque pagina, e chi scrive deve poter guardare la cosa di cui sta
parlando («il costo dei materiali di questa parte è vuoto»).

Testa (titolo, sottotitolo facoltativo, chiudi) e piede restano **fermi**; il corpo **scorre da
solo**. Nel piede va ciò che si usa sempre — per l'assistenza, il compositore di
[rg-chat](chat.md).

## Perché non è un `rg-modal`

| | `rg-modal` | `rg-drawer` |
| --- | --- | --- |
| Cosa fa al flusso | lo **interrompe** per una decisione breve | lo **affianca**: la pagina resta lì |
| Scrim | sì, nero al 45% | **no** |
| Ruolo | `role="dialog"` + `aria-modal="true"` | `role="dialog"`, **senza** `aria-modal` |
| Quanto resta aperto | il tempo di una conferma | quanto serve, anche cambiando idea a metà |
| Telefono | finestra centrata | **a tutto schermo** |

Se il contenuto chiede una risposta sì/no o un valore, è un `rg-modal`. Se si consulta o si scrive
**accanto** alla pagina, è un `rg-drawer`.

**Perché non un `<dialog>` nativo.** Il DS ha già deprecato il `<dialog>` come pattern di modale
([modal.md](modal.md#pattern-canonico-e-convergenza-del-dialog-nativo)), e qui la ragione è
concreta: `showModal()` mette il pannello nel *top layer*, e una schermata allegata aperta in
`rg-lightbox` gli finirebbe **sotto**. Un elemento normale resta nella scala z del DS.

## Varianti

Una sola forma. La larghezza la decide il token, non il prodotto:

| Viewport | Larghezza | Bordo |
| --- | --- | --- |
| sopra i 680 px | `--rg-layout-drawer` (480 px, la misura del modale standard) | filetto nero a sinistra |
| fino a 680 px | tutto lo schermo | nessuno |

Il token è nuovo (1.46.0). Non riusa `--rg-layout-tool-panel` (380 px): quella è la colonna dei
parametri di uno strumento, e un pannello che cambiasse con lei sarebbe un legame finto. A 480 px un
messaggio di chat tiene ~48 caratteri per riga.

## Uso e limiti

### Stato: aperto o chiuso

**Una sola verità: l'attributo `hidden`** sul pannello, accompagnata da `aria-expanded` sul bottone
che lo apre. Niente classe di stato: `hidden` toglie il pannello dall'albero dell'accessibilità e
dall'ordine di tabulazione senza altro lavoro.

### Cosa fa il JavaScript della pagina

Il DS non serve JavaScript. Il contratto è questo, e il controller di riferimento (venti righe, senza
dipendenze) è in [examples/rg-assistenza.html](../examples/rg-assistenza.html):

1. **Aprire**: togliere `hidden`; `aria-expanded="true"` sul bottone; portare il corpo in fondo
   (`scrollTop = scrollHeight`) perché l'ultimo messaggio è quello che conta.
2. **Il fuoco all'apertura** va al **titolo** (`tabindex="-1"`) se c'è già una conversazione: il
   lettore di schermo dice dove si è e sul telefono **non si apre la tastiera** sopra la risposta che
   si voleva leggere. Va al **campo** del compositore se la conversazione è vuota: lì c'è solo da scrivere.
3. **Chiudere**: rimettere `hidden`; `aria-expanded="false"`; **il fuoco torna al bottone** che l'ha aperto.
4. **Chiudono**: il bottone `rg-drawer__close`, **Esc** con il fuoco dentro il pannello, e di nuovo
   il bottone della topbar (fa da interruttore). Un clic sulla pagina **non** chiude: il pannello non
   è modale, e chi copia un codice dalla pagina per incollarlo nel messaggio non deve perdere quello
   che ha scritto.
5. **Sul telefono** (`matchMedia('(max-width: 680px)')`) il pannello copre tutto: mentre è aperto il
   contenitore della pagina prende **`inert`**, altrimenti il Tab finisce dietro, in una pagina che
   non si vede. Per questo il pannello è **fratello** del contenitore della pagina, non figlio: un
   elemento inert non può contenere il pannello stesso. Sopra i 680 px niente `inert`.

### Dove sta nel markup

Figlio diretto di `<body>`, **dopo** il contenitore della pagina (`rg-appshell`). Il bottone che lo
apre sta in `rg-topbar__actions` ed è un `rg-button` normale (40 px), non `--small`. Sul telefono,
se la barra usa `rg-topbar__menu` ([navigation.md](navigation.md)), il bottone finisce nel menu: se
l'assistenza deve stare **a portata di pollice**, metterlo fuori dal menu, sulla barra.

### Scala z

`--rg-z-overlay` (300): sopra la topbar ancorata (`--rg-z-sticky`, 100), sotto un `rg-modal` aperto
dal pannello (400) e sotto `rg-lightbox` (450), che così ingrandisce una schermata allegata sopra il
pannello senza nessuno `z-index` locale.

### Movimento e stampa

Entra con una corsa breve da destra (`--rg-motion-normal`), tolta con `prefers-reduced-motion`. Esce
senza animazione: `hidden` è istantaneo, ed è una scelta (un'uscita animata chiederebbe uno stato in
più). In stampa **non esiste**, aperto o no (`rg-utilities.css`, `@media print`).

### Limiti dichiarati

- **Tastiera del telefono.** Su iOS la tastiera non accorcia la finestra: il piede fermo in basso
  può finire sotto la tastiera finché il browser non porta il campo in vista (lo fa da solo, al tocco).
  Su Android Chrome si può chiedere che la finestra si accorci con
  `<meta name="viewport" content="…, interactive-widget=resizes-content">`.
- **Un pannello alla volta.** Due drawer aperti si sovrappongono: il DS non li impila.
- Il bordo sinistro è un **filetto**, non un'ombra (regole §6): il pannello è sovrapposto, e il nero
  già lo dice.

## Struttura

```
rg-drawer                  role="dialog", aria-labelledby → il titolo, hidden quando chiuso
├─ rg-drawer__header       fermo, alto quanto la topbar (64 px)
│  ├─ rg-drawer__heading
│  │  ├─ rg-drawer__title     h2, tabindex="-1"
│  │  └─ rg-drawer__subtitle  facoltativo
│  └─ rg-drawer__close     rg-icon-button rg-icon-button--full (40×40, 44 al tocco)
├─ rg-drawer__body         scorre da solo
└─ rg-drawer__footer       fermo in basso (facoltativo)
```

```html
<!-- nella topbar -->
<div class="rg-topbar__actions">
  <button class="rg-button rg-button--secondary" type="button" id="apri-assistenza"
          aria-expanded="false" aria-controls="assistenza" aria-haspopup="dialog">Assistenza</button>
</div>

<!-- figlio di <body>, DOPO il contenitore della pagina -->
<div class="rg-drawer" id="assistenza" role="dialog" aria-labelledby="assistenza-titolo" hidden>
  <header class="rg-drawer__header">
    <div class="rg-drawer__heading">
      <h2 class="rg-drawer__title" id="assistenza-titolo" tabindex="-1">Assistenza</h2>
      <p class="rg-drawer__subtitle">Richiesta n. 12 · aperta da questa pagina</p>
    </div>
    <button class="rg-icon-button rg-icon-button--full rg-drawer__close" type="button" aria-label="Chiudi l'assistenza">
      <svg class="rg-icon" aria-hidden="true" focusable="false"><use href="/ds/icons/rg-icons.svg#rg-icon-chiudi"></use></svg>
    </button>
  </header>
  <div class="rg-drawer__body">
    <!-- il contenuto: per l'assistenza, il filo di rg-chat -->
  </div>
  <footer class="rg-drawer__footer">
    <!-- ciò che resta fermo: per l'assistenza, rg-chat__composer -->
  </footer>
</div>
```

Il pannello completo con la conversazione e il compositore è in [chat.md](chat.md#nel-pannello-dellassistenza).
