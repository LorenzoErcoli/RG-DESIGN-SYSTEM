# File input (caricamento compatto)

## Scopo

Caricare un file **dentro un form o un pannello parametri**, dove il caricamento è il primo campo
di una sezione e non un'area a sé: un bottone a piena larghezza e una riga di stato che dichiara
cosa è entrato. Promosso da `net-45` e `pattern-grammar` (v1.5.0), che lo avevano riscritto
identico in locale.

## Varianti

Nessuna variante di forma. Due forme di caricamento coesistono nel DS e non si sostituiscono:

| Componente | Quando |
| --- | --- |
| `rg-file-input` | riga di form, pannello stretto, sagoma/sorgente di una tool |
| `rg-upload` | pagina o modal con spazio proprio, area di rilascio con drag & drop e vincoli visibili |

## Uso e limiti

Il controllo vero resta l'`<input type="file">`: è a opacità zero ma **presente**, quindi
focusabile, tabulabile e annunciato dai lettori di schermo. Non sostituirlo con un `<button>` che
chiama `click()` su un input nascosto con `display:none`.

Il testo del bottone dichiara i formati accettati (`Carica DXF o SVG…`) e l'attributo `accept` li
ripete alla macchina. Il bottone è a dimensione piena: nel pannello è un bersaglio primario, non
una voce di lista densa, quindi niente `rg-button--small`.

`__status` è obbligatorio e non è testo decorativo: è la **provenienza del dato**. A vuoto dice
che non c'è nulla; a caricamento avvenuto dice nome del file, misura rilevata, metodo e quantità
(regole §8 e §10). Se la misura è dedotta invece che letta, accompagnarla con
`rg-badge--estimated`; se è letta dal file, `rg-badge--parsed`.

L'errore di import vive nella stessa riga con `rg-file-input__status--error`, aperta dalla parola
«Errore»: il colore non è mai l'unico segnale. Usare `role="status"` per l'esito normale e
`role="alert"` per l'errore, così il cambiamento viene annunciato senza spostare il focus.

Se il caricamento non è possibile, la forma giusta è **omettere** il controllo. `disabled`
sull'input è ammesso solo quando la ragione è temporanea e scritta accanto (il DS spegne anche il
bottone via `:has()`).

## Struttura

Controllo → stato. Dentro una `rg-param-grid` occupa `rg-param-grid__wide`.

```html
<div class="rg-file-input rg-param-grid__wide">
  <label class="rg-file-input__control">
    <input type="file" accept=".dxf,.svg">
    <span class="rg-button rg-button--outline">Carica DXF o SVG…</span>
  </label>
  <p class="rg-file-input__status" role="status">Nessun file caricato.</p>
</div>
```

Con un file caricato:

```html
<p class="rg-file-input__status" role="status">tomaia-42.dxf · 232 × 142 mm · 12 contorni</p>
```

In errore:

```html
<p class="rg-file-input__status rg-file-input__status--error" role="alert">Errore import: entità DXF non supportata alla riga 418.</p>
```
