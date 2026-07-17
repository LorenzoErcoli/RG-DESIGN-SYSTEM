# Badges

## Scopo

Mostrare stato, classificazione o provenienza con ingombro ridotto.

## Varianti

- **Status**: bozza, in revisione, validato, bloccato.
- **Source**: importato, rilevato, stimato, manuale.
- **Category**: tecnica, materiale, stagione.
- **Count**: quantità breve associata a una label.

## Uso e limiti

Usare solo per metadati brevi, non per azioni o frasi. Il testo resta sempre presente: il colore non basta. Palette stagionale ammessa per categorie e stati secondari; errori e warning usano token semantici stabili. Evitare più di tre badge per riga.

## Struttura

Testo 12–14 px, padding compatto, bordo 1 px, radius pill solo qui quando utile.

```html
<span class="rg-badge rg-badge--validated">Validato</span>
<span class="rg-badge rg-badge--source">Dato stimato</span>
```

