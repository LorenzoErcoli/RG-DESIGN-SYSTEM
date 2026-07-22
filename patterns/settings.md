# Pannello di configurazione

## Scopo

La pagina che **modifica i valori di default** su cui poi gira un calcolo: tariffe, velocità,
tempi di setup, minuti per operazione. Non è una scheda dati e non è un tool: è un form di
configurazione, raggiunto da una voce di menu, letto da molti e scrivibile da pochi.

Vale per ogni schermata che risponda a "quali numeri usa il motore quando nessuno li ha
sovrascritti": default di costificazione, soglie di validazione, parametri di importazione.

## Cosa deve dichiarare

Un pannello di configurazione senza provenienza è una bugia gentile. Tre informazioni sono
obbligatorie in testa, prima dei campi (regole §8):

1. **Che cosa si sta configurando** — titolo e sotto-tipo, non solo "Impostazioni".
2. **Da dove vengono i valori mostrati** — catalogo, database, valori di fabbrica: è la differenza
   fra "qualcuno ha deciso questo" e "nessuno l'ha ancora deciso". Va in un `rg-badge`, che si
   distingue anche in scala di grigi, non in un colore.
3. **Se sono modificabili** — vedi *Sola lettura*.

Ogni valore porta la propria **unità** accanto al campo (`rg-field-with-unit`), non solo
nell'intestazione: "1" e "1 min per cambio spolina, per testa" non sono lo stesso dato.

## Struttura

Guscio `rg-appshell` (vedi [appshell.md](appshell.md)), testata `rg-section-header`, gruppi
`rg-parameter-group`, valori per riga in `rg-table`, salvataggio in fondo.

```html
<main class="rg-appshell__main">
  <header class="rg-section-header">
    <div>
      <h1 class="rg-section-header__title">Default costo ricamo</h1>
      <p class="rg-small">Sotto-tipo: ricamo normale</p>
    </div>
    <span class="rg-section-header__meta">
      <span class="rg-badge rg-badge--validated">Da catalogo</span>
    </span>
  </header>

  <form method="post" action="/costi/default" class="rg-stack">
    <fieldset class="rg-parameter-group">
      <legend class="rg-label">Parametri macchina</legend>
      <div class="rg-parameter-group__grid">
        <label class="rg-field">
          <span class="rg-field__label">Tariffa macchina</span>
          <span class="rg-field-with-unit">
            <input class="rg-input rg-input--numeric" name="tariffa" type="number" step="0.01" min="0" value="80"> <span>€/h</span>
          </span>
        </label>
        <label class="rg-field">
          <span class="rg-field__label">Velocità</span>
          <span class="rg-field-with-unit">
            <input class="rg-input rg-input--numeric" name="velocita" type="number" step="1" min="1" value="500"> <span>punti/min</span>
          </span>
        </label>
      </div>
    </fieldset>

    <div class="rg-table-wrap">
      <table class="rg-table">
        <caption>Operazioni manuali</caption>
        <thead><tr><th>Operazione</th><th class="rg-table__numeric">Minuti per testa (min)</th></tr></thead>
        <tbody>
          <tr>
            <td>Appoggio</td>
            <td class="rg-table__numeric">
              <input class="rg-input rg-input--numeric" name="op_appoggio" type="number" step="0.1" min="0" value="0.5"
                     aria-label="Minuti per testa — appoggio">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="rg-action-bar">
      <span class="rg-small">I valori valgono per tutte le schede che non hanno un override.</span>
      <button class="rg-button rg-button--primary" type="submit">Salva</button>
    </div>
  </form>
</main>
```

La cella numerica non ha una label visibile: la porta l'intestazione di colonna. Perché il campo
resti nominato anche fuori dalla tabella, l'input ha `aria-label` con **operazione + grandezza**,
non solo "minuti".

**Separatore decimale**: `type="number"` accetta solo il punto, qualunque sia la lingua della
pagina, e con la virgola il browser invia una stringa vuota senza dirlo. O si scrive `0.5` nel
campo e si mostra la virgola solo in lettura, oppure il campo è
`type="text" inputmode="decimal"` e la virgola la normalizza il server. Non esiste una terza via:
un `type="number"` con dentro `0,5` è un valore perso al salvataggio.

## Esito del salvataggio

Un `rg-alert` in testa al form, non un toast: la conferma di una configurazione deve restare
leggibile mentre si rileggono i valori salvati.

```html
<div class="rg-alert rg-alert--success" role="status">
  <p class="rg-alert__title">Valori salvati</p>
  <p class="rg-alert__message">Default aggiornati per il sotto-tipo "ricamo normale".</p>
</div>
<div class="rg-alert rg-alert--error" role="alert">
  <p class="rg-alert__title">Salvataggio non riuscito</p>
  <p class="rg-alert__message">La velocità deve essere maggiore di zero. Nessun valore è stato modificato.</p>
</div>
```

`role="status"` per il successo (annuncio gentile), `role="alert"` per l'errore (interrompe).
L'errore dice sempre **che cosa non è stato scritto**: dopo un salvataggio fallito l'utente deve
sapere se sta guardando i valori vecchi o un misto.

## Stati

- **Sola lettura** — l'utente vede i valori ma non può cambiarli: ogni controllo prende `readonly`
  (vedi [components/forms.md](../components/forms.md#sola-lettura-readonly)), il bottone di
  salvataggio **si omette** e un `rg-alert rg-alert--info` con `role="note"` spiega il perché e
  come ottenere il permesso. Un bottone disabilitato che nessuno potrà mai premere è arredamento.
- **Non disponibile** — la sorgente dei valori non è attiva (catalogo spento, database assente):
  al posto del form va un `rg-empty` che dice quale sorgente manca e che cosa succede intanto,
  non "nessun dato".
- **Valori di fabbrica** — i default mostrati non vengono da una decisione ma dal codice: badge
  `rg-badge--estimated` e nota esplicita. Salvando, diventano valori di catalogo.
- **Caricamento** — `rg-loading` al posto dei gruppi, mai al posto della testata.

```html
<div class="rg-empty">
  <h3>Catalogo costi non attivo</h3>
  <p>I default non sono leggibili né modificabili finché il catalogo SQLite non è disponibile.
     Il motore di costificazione sta usando i valori di fabbrica.</p>
</div>
```

## Limiti

Questo pattern configura **un insieme di valori omogeneo**. Se le sezioni diventano molte, il
contenitore non è una pagina più lunga: sono viste separate con navigazione locale (`rg-tabs`) o
sezioni collassabili (`rg-disclosure--boxed`), una per volta salvabile.

Un pannello di configurazione non mostra lo storico delle modifiche: se serve sapere chi ha
cambiato che cosa, quello è un elenco di revisioni (`rg-list-row`), affiancato, non fuso nel form.
