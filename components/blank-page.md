# Blank page (pagina lasciata bianca)

## Scopo

Una facciata **bianca di proposito**, per la stampa fronte/retro: l'app la mette prima di una
[testata di parte](worksheet-part.md) che cadrebbe sul retro, così ogni parte del fascicolo comincia su una
facciata dispari e si può separare dalle altre senza tagliare un foglio a metà.

Porta una sola frase, in piccolo: «Pagina lasciata bianca per la stampa fronte/retro». Dice che il bianco
è voluto, non che è andato perso qualcosa.

Nasce dal fascicolo compatto (proposta 1.23.0).

## Varianti

| Classe | Quando |
| --- | --- |
| `rg-blank-page` | **Solo stampa.** A schermo non esiste (`display: none`); in stampa occupa una facciata intera. |
| `rg-blank-page--preview` | Insieme alla base: la mostra **anche a schermo** come segnaposto tratteggiato, per la vetrina o un'anteprima di stampa. In stampa è identica alla base. |
| `rg-blank-page__note` | La frase, piccola e secondaria, centrata in alto. |

## Uso e limiti

**Nessuna pagina in più.** In stampa ha `break-before: page` e `break-after: page`; la testata di parte che
la segue ha a sua volta `break-before: page`. Due salti forzati adiacenti valgono uno.

**Il recto lo conta l'app, non il CSS.** Chrome non implementa `break-before: recto`, e un browser non dice a
una pagina in quale facciata sta per finire. L'app decide dove serve la pagina bianca **sapendo quante
facciate occupa la parte precedente**: con un motore PDF che le conta (due passate), oppure con un
impaginato prevedibile. Se il conto è sbagliato la pagina bianca finisce sul recto sbagliato: non si rompe
niente, si spreca una facciata.

**Solo fronte/retro.** Se si stampa su una facciata sola, l'app non la mette: una pagina bianca in un
fascicolo solo fronte è carta buttata.

**Non è uno stato vuoto.** Lo stato vuoto di una vista a schermo è `rg-empty`, con un testo esplicito
([regole §8](../design-rules.md#8-interfacce-tecniche)): questa è una pagina di carta.

## Struttura

```html
<div class="rg-blank-page">
  <p class="rg-blank-page__note">Pagina lasciata bianca per la stampa fronte/retro</p>
</div>
<header class="rg-worksheet-part">…</header>
```

Anteprima a schermo:

```html
<div class="rg-blank-page rg-blank-page--preview">
  <p class="rg-blank-page__note">Pagina lasciata bianca per la stampa fronte/retro</p>
</div>
```
