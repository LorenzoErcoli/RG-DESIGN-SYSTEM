# Examples

Questa cartella ospiterà esempi minimi e framework-agnostic che mostrano l'applicazione congiunta di token, componenti e pattern.

Ogni esempio futuro dovrebbe includere:

- scopo e pattern di riferimento;
- viewport supportate;
- stati default, loading, empty, error e read-only;
- dati realistici ma non sensibili;
- nota sulle eccezioni;
- verifica accessibilità essenziale.

Ordine consigliato dei primi esempi:

1. Tabella consumi con filtri e unità.
2. Scheda archivio con materiali e revisioni.
3. Split view di revisione.
4. Pagina rulebook con condizioni e test case.

Non introdurre qui un framework o una dipendenza come requisito del design system. Gli esempi specifici di prodotto possono vivere nei rispettivi repository.

## RG Consumption Assistant — dashboard preview

[`rg-dashboard-preview.html`](rg-dashboard-preview.html) è il primo test visivo statico del sistema. Simula una dashboard operativa per la verifica dei consumi di una lavorazione tessile e mette alla prova:

- composizione editoriale a tre zone;
- gerarchia tipografica Identity, Body e Mono;
- cards riepilogative aperte e non decorative;
- tabella tecnica con unità, provenienza e stato;
- pannello laterale di dettaglio e debug;
- uso della palette Perugino limitato ad accenti secondari.

L'esempio **compone i componenti reali `.rg-*`** importando i moduli `styles/*.css` nello stesso ordine delle applicazioni; il CSS locale è ridotto al solo telaio di pagina (griglia a tre zone, header, summary, pannello dettaglio) e non ridefinisce componenti. Resta una prova di contesto, non la fonte dei componenti. Non richiede librerie, JavaScript o font inclusi.

## RG Components Library

[`rg-components-library.html`](rg-components-library.html) è la prima vera base visuale e componibile del design system RG. Non rappresenta un'applicazione: è una specimen page che raccoglie tipografia, colori, controlli, tabelle, superfici, navigazione, messaggi, dati tecnici, gruppi form e blocchi di layout.

Le classi seguono una convenzione sistematica (`.rg-button`, `.rg-card`, `.rg-table`, `.rg-badge`, `.rg-input`, `.rg-inspector`). Gli stili reali e riutilizzabili risiedono in `/styles`; il CSS locale della pagina serve esclusivamente al telaio espositivo `.specimen-*`.

`rg-dashboard-preview.html` è una prova di contesto: dimostra come i **componenti** RG si compongano in una schermata Consumption Assistant, ma non è la fonte primaria dei componenti (quella è la Components Library). Le interfacce applicative saranno progettate componendo e specializzando gli elementi presenti nella Components Library.

La specimen importa `tokens.css` e tutti i moduli `styles/*.css` nello stesso ordine richiesto alle applicazioni. Non copiare stili dalla pagina HTML: importare i moduli e usare le classi `.rg-*`.
