# Regole di design RG

## 1. Principi generali

L'interfaccia RG è uno strumento di laboratorio: precisa, leggibile e calma. Deve mostrare la complessità senza spettacolarizzarla. La struttura deriva da griglia, tipografia, spaziatura e linee. Ogni elemento deve avere una funzione verificabile.

Ordine delle priorità: comprensione → accuratezza → efficienza → identità → decorazione.

## 2. Cosa evitare

- Dashboard SaaS composte da card uniformi e KPI sovradimensionati.
- Colori vivaci usati come scorciatoia gerarchica.
- Gradienti, glow, ombre profonde, vetro, illustrazioni casuali.
- Pillole ovunque, radius eccessivi, icone senza label.
- Testi tutti maiuscoli in paragrafi o tabelle dense.
- Informazioni tecniche prive di unità, origine o precisione.
- Azioni distruttive vicine all'azione primaria senza separazione.

## 3. Tipografia

- **AGNext**: H1–H3, navigazione, label principali, numeri hero e firme identitarie. Usare con misura; non per lunghi paragrafi.
- **GT America Standard**: corpo, note, descrizioni, contenuto editoriale e help text.
- **GT America Mono**: codici articolo, ID, versioni, timestamp, consumi, quantità, misure, log, debug e dati tabellari.
- Applicare cifre tabulari ai valori confrontabili. Non simulare un font ufficiale con tracking estremo.
- Gerarchia consigliata: display 48/52, H1 36/40, H2 28/34, H3 20/26, body 16/24, small 14/20, technical 13/18.

## 4. Colore

Nero e bianco sono fondamento e contrasto. I grigi semantici derivano dalla scala neutra e servono per bordi, testo secondario e superfici tecniche.

Le palette stagionali:

- possono apparire in badge, grafici, highlight, stati secondari e contenuti editoriali;
- non definiscono bottoni primari, navigazione globale, focus o testo fondamentale;
- non devono essere l'unico segnale di stato;
- vanno referenziate tramite alias semantici, non HEX sparsi.

La palette Perugino in `tokens.json` è provvisoria fino alla campionatura della fonte ufficiale.

## 5. Spazio e griglia

Usare la scala 4–8–12–16–24–32–48–64–96. Il ritmo ordinario è 8 px; 24–32 px separano gruppi, 48–96 px separano sezioni editoriali. Layout desktop su 12 colonne, tablet 8, mobile 4. Il contenuto tecnico può essere denso, ma non compresso sotto la soglia di scansione.

## 6. Linee, superfici, radius e ombre

- Separatore standard: 1 px neutro; forte: 1 px nero.
- Usare linee per mostrare struttura, non per incorniciare ogni elemento.
- Radius standard 4 px, compatto 2 px, ampio 8 px solo per contenitori speciali.
- Ombre assenti nelle superfici ordinarie; ombra minima solo per elementi sovrapposti.

## 7. Tono visivo

Il tono è editoriale-tecnico: titoli netti, descrizioni concise, dettagli materiali visibili. Le fotografie o texture tessili, quando presenti, devono essere documentarie e non decorative. Le icone sono geometriche, coerenti e accompagnate da testo quando l'azione non è universale.

## 8. Interfacce tecniche

- Separare input, risultato calcolato e dato validato.
- Mostrare unità accanto al valore e non solo nell'intestazione quando c'è rischio di ambiguità.
- Conservare precisione originale; arrotondamenti solo in presentazione.
- Esporre stato del calcolo, timestamp e provenienza.
- Log e debug sono mono, selezionabili e filtrabili; non dominano il task principale.
- Loading, vuoto, errore, warning e sola lettura devono avere testi espliciti.

## 9. Schermate editoriali

- Consentire maggiore respiro, immagini ampie e accenti stagionali controllati.
- Mantenere una colonna di lettura di circa 65–75 caratteri.
- Usare didascalie, metadati e crediti strutturati.
- Non sacrificare la navigabilità per una composizione da copertina.

## 10. Dati di ricamo e materiali

- **Materiali e fili**: nome leggibile + codice tecnico + lotto/variante quando disponibile.
- **Consumi**: valore, unità, metodo di stima, tolleranza e versione del calcolo.
- **Operazioni**: ordine, dipendenze, macchina/tecnica, parametri e stato.
- **Colori filo**: campione accompagnato da codice e descrizione; mai riconoscimento solo cromatico.
- **Revisioni**: autore, data, motivazione e differenza rispetto alla versione precedente.
- **Dati incerti**: distinguere `stimato`, `rilevato`, `importato`, `validato`.

## 11. Accessibilità e comportamento

Target interattivi minimi 40×40 px. Focus visibile nero/bianco ad alto contrasto. Contrasto testo conforme almeno a WCAG AA. Ordine di tabulazione coerente con l'ordine visivo. Animazioni brevi e funzionali, disattivabili con `prefers-reduced-motion`.

## 12. Eccezioni

Ogni eccezione deve indicare problema, ambito, durata e responsabile. Se ricorre in almeno due prodotti, valutare un nuovo componente o pattern; non duplicare workaround.

