/**
 * Site Configuration
 * Central configuration file for Piemon website
 */

const SITE_CONFIG = {
    // Site Information
    name: 'Piemon',
    tagline: 'UniTo come non l\'hai mai giocata',
    description: 'Un videogioco gratuito in stile Pokémon ambientato nell\'Università di Torino',
    language: 'it',
    url: 'https://piemon.it',
    
    // Navigation Items
    navItems: [
        { 
            label: 'Home', 
            href: 'index.html',
            active: true 
        },
        { 
            label: 'Il Progetto', 
            href: 'pages/project.html',
            active: true 
        },
        { 
            label: 'Contatti', 
            href: '#',
            active: false,
            disabled: true,
            title: 'In arrivo!' 
        }
    ],
    
    // Component Paths
    components: {
        navbar: 'components/navbar.html',
        footer: 'components/footer.html'
    },
    
    // Theme Settings (for future use)
    theme: {
        default: 'light',
        storageKey: 'piemon-theme',
        options: ['light', 'dark']
    },
    
    // Social Links (for future use)
    social: {
        github: 'https://github.com/piemon-game',
        twitter: 'https://twitter.com/piemon_game',
        discord: 'https://discord.gg/piemon'
    },
    
    // Development Settings
    dev: {
        showLogs: false,
        mockDelay: 0
    },
    
    // Calendar Settings
    calendar: {
        startDate: '2025-06-01',
        locale: 'it-IT',
        firstDayOfWeek: 1 // Monday
    },
    
    // Update Data for Calendar
    updates: {
        // GIUGNO 2025
        '2025-06-29': {
            title: 'Sviluppo versioni pre-alpha e alpha iniziali',
            content: `
                <h3>Pre-Alpha</h3>
                
                <h4>[pre-alpha-1.0] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Creazione prima finestra con SDL3</li>
                    <li>Gestione evento di chiusura finestra</li>
                    <li>Loop principale con delay per ridurre il carico CPU</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li>Prima versione di test, senza rendering né asset grafici</li>
                </ul>
                
                <h4>[pre-alpha-2.0] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Caricamento e visualizzazione di un file BMP come tileset</li>
                    <li>Rendering di una griglia di tile con scaling</li>
                    <li>Creazione texture da superficie BMP</li>
                    <li>Prima gestione di una "tilemap" fittizia con cicli per righe e colonne</li>
                </ul>
                <h5>Modificato</h5>
                <ul>
                    <li>Finestra rinominata in "Tilemap Griglia"</li>
                    <li>Aggiunto renderer per il disegno</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li>Continuazione del test tecnico di base: non sono presenti dati dinamici o lettura da file esterni per la tilemap</li>
                    <li>I file asset vengono cercati in <code>assets/test-assets/</code></li>
                </ul>
                
                <h3>Alpha</h3>
                
                <h4>[alpha-0.1] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Caricamento e visualizzazione di una mappa da file TMX con due layer: "Grass base" e "Details"</li>
                    <li>Caricamento tileset da file TSX con parsing del path dell'immagine PNG e della larghezza</li>
                    <li>Supporto per tileset PNG tramite SDL3_image</li>
                    <li>Disegno della tilemap con scaling e posizione configurabile</li>
                    <li>Visualizzazione delle collisioni (objectgroup "Collision") come rettangoli semitrasparenti</li>
                </ul>
                <h5>Modificato</h5>
                <ul>
                    <li>Funzione <code>get_tileset_png</code> aggiornata: se nel TSX il source non contiene path, aggiunge automaticamente <code>assets/test-assets/</code> al nome dell'immagine</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li>Versione con asset di test e mappe provvisorie</li>
                    <li>Prima versione con gestione di file esterni (TMX, TSX, PNG)</li>
                </ul>
                
                <h4>[alpha-0.2] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Implementazione del player rappresentato come un quadrato blu con dimensione e velocità configurabili</li>
                    <li>Movimento del player con controlli WASD</li>
                    <li>Sistema di collisione contro gli oggetti del <code>objectgroup</code> "Collision" caricati dal TMX</li>
                    <li>Adattamento della dimensione della finestra alla mappa in scala</li>
                    <li>Funzione di check collisioni rettangolo-rettangolo contro i collision rect della mappa</li>
                </ul>
                <h5>Modificato</h5>
                <ul>
                    <li>Il rendering delle tilemap ora disegna il player sopra i layer della mappa</li>
                </ul>
                <h5>Rimosso</h5>
                <ul>
                    <li>Rendering dei rettangoli di collisione per debug (rimane nel codice come riferimento, ma commentato)</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li>Asset ancora di test</li>
                    <li>Versione finalizzata al test dei controlli base e delle collisioni</li>
                </ul>
                
                <h4>[alpha-0.3] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Implementazione del player con sprite animato caricato da texture PNG</li>
                    <li>Rendering del player con flip orizzontale per il movimento a destra (D)</li>
                    <li>Sistema di animazione del player basato su frame e direzione (WASD)</li>
                    <li>Funzione custom <code>SDL_RenderTexture_FlipX</code> per flip orizzontale dei frame del player</li>
                </ul>
                <h5>Modificato</h5>
                <ul>
                    <li>Il player ora utilizza una texture suddivisa in frame per le animazioni</li>
                </ul>
                <h5>Rimosso</h5>
                <ul>
                    <li>Quadrato blu statico usato come player nella versione precedente</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li><strong>Bug noto:</strong> la texture del player non segue correttamente i movimenti WASD; quando dovrebbe girare a destra (D) la texture appare glitchata dal flip orizzontale</li>
                    <li>Versione finalizzata al test delle animazioni e flip del player</li>
                    <li>Asset ancora di test</li>
                </ul>
                
                <h4>[alpha-0.4] - 2025-06-29</h4>
                <h5>Aggiunto</h5>
                <ul>
                    <li>Implementazione del rendering del player con gestione corretta del flip orizzontale per il movimento a destra (D)</li>
                    <li>Mappatura direzioni del player alle righe corrette dello sprite sheet (DOWN, UP, LEFT + flip per RIGHT)</li>
                    <li>Sistema di animazione del player con frame rate stabilizzato (150ms per frame)</li>
                </ul>
                <h5>Risolto</h5>
                <ul>
                    <li><strong>Bug risolto:</strong> il player ora segue correttamente i movimenti WASD e il flip orizzontale funziona senza glitch quando si muove a destra</li>
                </ul>
                <h5>Note</h5>
                <ul>
                    <li><strong>Bug noto:</strong> i bordi degli oggetti di collisione risultano più grandi di quanto dovrebbero essere in realtà; richiede revisione dei dati nel file TMX o nel calcolo del rendering</li>
                    <li>Asset ancora di test</li>
                </ul>
            `
        },
        '2025-06-30': {
            title: '[alpha-1.0] - Prima versione alpha strutturata',
            content: `
                <h4>[alpha-1.0] - 2025-06-30</h4>
                
                <h5>Aggiunto</h5>
                <ul>
                    <li><strong>Strutturazione del progetto in moduli e sottocartelle:</strong>
                        <ul>
                            <li>Suddivisione del codice sorgente in più file organizzati per responsabilità (<code>core</code>, <code>graphics</code>, <code>gameplay</code>, <code>systems</code>), rendendo il progetto più scalabile e manutenibile.</li>
                            <li>Introduzione di header dedicati per ogni modulo.</li>
                            <li>Aggiunta di un file di configurazione centrale (<code>config.h</code>) per costanti, percorsi asset e dimensioni di gioco.</li>
                        </ul>
                    </li>
                    <li><strong>Implementazione di un primo menu di gioco</strong> accessibile con il tasto ESC:
                        <ul>
                            <li>Il menu consente di <strong>salvare la partita</strong>, <strong>caricare l'ultimo salvataggio</strong> dalla cartella preposta, oppure <strong>uscire dal gioco</strong> senza dover chiudere la finestra.</li>
                            <li>Il menu è disegnato con font custom tramite SDL_ttf e supporta navigazione tramite tastiera.</li>
                        </ul>
                    </li>
                    <li><strong>Sistema di salvataggio e caricamento persistente</strong>:
                        <ul>
                            <li>I salvataggi vengono scritti e letti da una cartella dedicata (<code>saves/</code>), restando disponibili anche tra sessioni diverse del gioco.</li>
                            <li>Ogni salvataggio contiene posizione e stato del player, tilemap e timestamp.</li>
                            <li>Il caricamento ripristina l'ultimo salvataggio disponibile.</li>
                        </ul>
                    </li>
                    <li><strong>Aggiunto un Makefile</strong> per facilitare la compilazione multipiattaforma e la gestione dei target di build.</li>
                </ul>
                
                <h5>Modificato</h5>
                <ul>
                    <li>Tutte le funzionalità principali (gestione asset, rendering tilemap, player, collisioni, input, menu, salvataggi) sono ora incapsulate in moduli separati.</li>
                    <li>Migliorata la chiarezza del main loop, che ora si limita a coordinare i sottosistemi.</li>
                </ul>
                
                <h5>Note</h5>
                <ul>
                    <li>Prima versione "alpha" strutturata.</li>
                    <li>La gestione dei salvataggi supporta il caricamento dopo riavvio del gioco.</li>
                    <li>Il Makefile permette una compilazione più semplice e veloce.</li>
                    <li>Il menu è progettato per essere estendibile e supporta facilmente nuove opzioni.</li>
                    <li>Asset, mappe e salvataggi sono ancora di test e soggetti a modifiche.</li>
                    <li><strong>Bug noto:</strong> persistono alcune imprecisioni nei bordi delle collisioni all'interno della mappa (vedi alpha-0.4).</li>
                </ul>
            `
        },
        // LUGLIO 2025
        '2025-07-01': {
            title: '[alpha-1.1] - Telecamera dinamica e incontri casuali',
            content: `
                <h4>[alpha-1.1] - 2025-07-01</h4>
                
                <h5>Aggiunto</h5>
                <ul>
                    <li><strong>Nuova tilemap espansa con contenuti migliorati:</strong>
                        <ul>
                            <li>Introduzione di una mappa più grande (da 20x15 a 48x36 tile) con nuovo tileset (<code>tileset-2.0.tsx</code> e relativo asset PNG).</li>
                            <li>Aggiunto un terzo layer dedicato all'<strong>erba alta</strong> (<code>Tall grass</code>) per supportare il sistema di incontri casuali.</li>
                            <li>Inseriti nuovi aspetti nella mappa come barriere saltabili e aree di erba alta in vista di implementazioni di future feature.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di telecamera dinamica:</strong>
                        <ul>
                            <li>Implementata una <strong>telecamera che segue il player</strong> con movimento fluido e interpolato, sostituendo la vista fissa precedente.</li>
                            <li>La telecamera si centra automaticamente sul player e rispetta i limiti della mappa.</li>
                            <li>Aggiunto supporto per offset di rendering in tutti i sistemi di disegno (tilemap, player, UI).</li>
                            <li>Configurazione del livello di smoothing della telecamera tramite costante <code>CAMERA_SMOOTH</code>.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Primo sistema di incontri casuali con Piemon selvatici:</strong>
                        <ul>
                            <li>Implementato meccanismo di <strong>incontri random nell'erba alta</strong> con probabilità configurabile (10% per default).</li>
                            <li>Il sistema rileva quando il player entra in un nuovo tile contenente erba alta e calcola la probabilità di incontro.</li>
                            <li>Visualizzazione di un messaggio temporaneo "Piemon selvatico!" al centro dello schermo durante gli incontri.</li>
                            <li>Base solida per future implementazioni di sistema di battaglia e cattura.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema audio con musica di sottofondo:</strong>
                        <ul>
                            <li>Integrazione completa del sistema audio SDL3 con supporto per file MP3 tramite libreria minimp3.</li>
                            <li>Aggiunta di <strong>musica di sottofondo in loop continuo</strong> durante il gameplay (<code>ost1.mp3</code>).</li>
                            <li>Struttura modulare del sistema audio pronta per effetti sonori e gestione di più tracce.</li>
                            <li>Gestione automatica del loop della musica e controlli per play/pause.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                <ul>
                    <li><strong>Migliorato significativamente il sistema di collisioni:</strong>
                        <ul>
                            <li>Risolto il bug delle "collisioni non corrette" implementando una <strong>collision box ridotta e più precisa</strong>.</li>
                            <li>La collision box ora copre solo la parte inferiore del player (40% dell'altezza) e uno spazio laterale ridotto (90% della larghezza).</li>
                            <li>Il player ora può avvicinarsi molto di più agli oggetti e muoversi in spazi più stretti in modo naturale.</li>
                            <li>Posizionamento della collision box al centro-bottom del player per un feeling di movimento più realistico.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Aggiornato il sistema di salvataggio:</strong>
                        <ul>
                            <li>Esteso il formato di salvataggio per includere i dati della telecamera (posizione corrente e target).</li>
                            <li>Aggiunto tracking della posizione precedente del player per supportare il sistema di incontri.</li>
                            <li>Incrementata la versione del formato di salvataggio per retrocompatibilità con i vecchi save.</li>
                            <li>I salvataggi vengono ora salvati nella cartella <code>alpha-1.1/saves/</code> per organizzazione delle versioni.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Ottimizzato il rendering della tilemap:</strong>
                        <ul>
                            <li>Implementato <strong>culling intelligente</strong> per renderizzare solo i tile visibili sullo schermo.</li>
                            <li>Significativo miglioramento delle performance, specialmente importante con la mappa espansa.</li>
                            <li>Calcolo dinamico dell'area di rendering basato sulla posizione della telecamera.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                <ul>
                    <li>Il sistema di incontri è attualmente in versione dimostrativa ma utilizza la stessa logica di randomicità dei giochi Pokémon originali.</li>
                    <li>La nuova telecamera e collision box migliorano drasticamente l'esperienza di gioco e la sensazione di movimento.</li>
                    <li>La mappa espansa fornisce molto più spazio per esplorare e serve da base per future feature come città, percorsi e dungeon.</li>
                    <li>Il sistema audio è completamente modulare e pronto per l'espansione con effetti sonori specifici per azioni e battaglie.</li>
                </ul>
            `
        },
        '2025-07-02': {
            title: '[alpha-1.2] - Sistema di inventario e interazioni',
            content: `
                <h4>[alpha-1.2] - 2025-07-02</h4>
                
                <h5>Aggiunto</h5>
                <ul>
                    <li><strong>Sistema di interazione con oggetti e ambiente:</strong>
                        <ul>
                            <li>Implementato il <strong>tasto E per interagire</strong> con elementi della mappa.</li>
                            <li>Aggiunto sistema di rilevamento automatico degli oggetti/cartelli di fronte al player basato sulla direzione di movimento.</li>
                            <li>Sistema modulare di interazione pronto per espansioni future con NPCs e altri elementi interattivi.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Nuovi layer della tilemap per contenuti interattivi:</strong>
                        <ul>
                            <li>Aggiunto layer <strong>"Items"</strong> (layer 3) per oggetti raccoglibili dalla mappa.</li>
                            <li>Aggiunto layer <strong>"Signs"</strong> (layer 4) per cartelli e segnali informativi.</li>
                            <li>La tilemap ora supporta <strong>5 layer totali</strong> per una maggiore varietà di contenuti.</li>
                            <li>Aggiornata la mappa con nuovi tileset (<code>tileset-2.1.tsx</code> e <code>tilemap-2.1.tmx</code>) che includono oggetti e cartelli.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di inventario completo:</strong>
                        <ul>
                            <li>Implementato <strong>inventario grafico</strong> accessibile tramite menu principale.</li>
                            <li>Sistema robusto di rendering con texture separate per nomi oggetti e quantità.</li>
                            <li>Gestione automatica dell'aggiunta di oggetti con accumulo delle quantità.</li>
                            <li>Supporto per diversi tipi di oggetti (attualmente: Pozioni).</li>
                            <li>Sistema di texture dinamiche con ricostruzione intelligente per evitare problemi di rendering.</li>
                            <li>Layout con allineamento a sinistra per i nomi e a destra per le quantità.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Message Box stile Pokemon:</strong>
                        <ul>
                            <li>Implementato <strong>message box in basso</strong> per tutti i messaggi di gioco.</li>
                            <li>Supporto per messaggi lunghi con paginazione automatica (50 caratteri per pagina).</li>
                            <li>Sistema di gestione degli input per navigare tra le pagine dei messaggi.</li>
                            <li>Design coerente con lo stile grafico del resto del gioco.</li>
                            <li>Priorità di rendering che blocca altre interazioni quando attivo.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Display FPS toggle:</strong>
                        <ul>
                            <li>Aggiunto <strong>display FPS in tempo reale</strong> attivabile con <strong>F1</strong>.</li>
                            <li>Contatore preciso che si aggiorna ogni 500ms per letture stabili.</li>
                            <li>Rendering discreto in alto a sinistra senza interferire con il gameplay.</li>
                            <li>Font coerente con il resto dell'interfaccia.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Primo oggetto di gioco: Pozioni:</strong>
                        <ul>
                            <li>Implementazione delle <strong>Pozioni</strong> come primo oggetto raccoglibile.</li>
                            <li>Sistema di raccolta che rimuove automaticamente l'oggetto dalla mappa.</li>
                            <li>Feedback immediato tramite message box alla raccolta.</li>
                            <li>Base per l'implementazione di altri oggetti e del sistema di utilizzo.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                <ul>
                    <li><strong>Espansione del sistema di menu:</strong>
                        <ul>
                            <li>Aggiunta voce <strong>"Inventario"</strong> nel menu principale.</li>
                            <li>Riorganizzazione delle opzioni del menu per includere la nuova funzionalità.</li>
                            <li>Navigazione migliorata tra menu, inventario e gioco.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Miglioramento del sistema di input:</strong>
                        <ul>
                            <li>Aggiunto supporto per <strong>tasto E</strong> (interazione) e <strong>F1</strong> (toggle FPS).</li>
                            <li>Sistema di gestione degli stati di input più robusto per evitare conflitti.</li>
                            <li>Gestione delle priorità di input tra diversi sistemi (menu, inventario, message box).</li>
                        </ul>
                    </li>
                    
                    <li><strong>Ottimizzazione del sistema di salvataggio:</strong>
                        <ul>
                            <li>Esteso il formato di salvataggio per includere <strong>i dati dell'inventario</strong>.</li>
                            <li>Versione del salvataggio incrementata a <strong>v3</strong> per supportare l'inventario.</li>
                            <li>Retrocompatibilità mantenuta con i salvataggi delle versioni precedenti.</li>
                            <li>Salvataggi ora nella cartella <code>alpha-1.2/saves/</code> per organizzazione delle versioni.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Miglioramento del movimento del player:</strong>
                        <ul>
                            <li>Implementato <strong>movimento frame-rate independent</strong> con delta time.</li>
                            <li>Movimento più fluido e consistente indipendentemente dagli FPS.</li>
                            <li>Limitazione del delta time per evitare salti di posizione durante lag.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Cambio di font per migliore leggibilità:</strong>
                        <ul>
                            <li>Sostituito il font preesistente per un aspetto più gaming.</li>
                            <li>Dimensioni dei font ottimizzate per tutti i sistemi (inventario, message box, FPS).</li>
                            <li>Migliorata la leggibilità generale dell'interfaccia.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                <ul>
                    <li>Il sistema di inventario è ora completamente funzionale per la raccolta e visualizzazione di oggetti.</li>
                    <li>Il message box fornisce un'interfaccia unificata per tutti i messaggi di gioco.</li>
                    <li>Il sistema di interazione è progettato per supportare facilmente NPCs, negozi, etc...</li>
                    <li>L'architettura modulare permette espansioni rapide per nuovi tipi di oggetti e interazioni.</li>
                    <li>Tutti i sistemi UI mantengono coerenza visiva e di comportamento con lo stile Pokemon-like.</li>
                </ul>
            `
        },
        '2025-07-23': {
            title: '[alpha-2.0] - Sistema di battaglie completo',
            content: `
                <h4>[alpha-2.0] - 2025-07-23</h4>
                
                <h5>Aggiunto</h5>
                
                <ul>
                    <li><strong>Sistema di battaglie completo in stile Pokémon:</strong>
                        <ul>
                            <li>Implementato un <strong>sistema di combattimento a turni</strong> con UI dedicata che mostra HP, livelli e statistiche dei Piemon.</li>
                            <li>Menu di battaglia con 4 azioni principali: <strong>LOTTA</strong> (selezione mosse), <strong>ZAINO</strong> (uso oggetti), <strong>PIEMON</strong> (cambio), <strong>FUGA</strong>.</li>
                            <li>Sistema di <strong>mosse con PP</strong> (Power Points) che si consumano ad ogni utilizzo.</li>
                            <li><strong>Categorie delle mosse</strong> (Fisica/Speciale) che determinano quali statistiche vengono usate nel calcolo del danno.</li>
                            <li><strong>Ordine dei turni basato sulla velocità</strong>: il Piemon più veloce attacca per primo.</li>
                            <li>Feedback visivo dei danni inflitti.</li>
                            <li><strong>Musica di battaglia dedicata</strong> che si attiva durante i combattimenti.</li>
                            <li>Transizioni fluide tra overworld e battaglia con effetto a barre orizzontali.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema completo di statistiche dei Piemon:</strong>
                        <ul>
                            <li>Implementate <strong>6 statistiche principali</strong>: HP, Attacco, Difesa, Velocità, Attacco Speciale, Difesa Speciale.</li>
                            <li><strong>Statistiche base</strong> uniche per ogni specie di Piemon che determinano la crescita.</li>
                            <li><strong>Sistema di livelli ed esperienza</strong> con calcolo automatico delle statistiche in base al livello.</li>
                            <li><strong>Level up con incremento statistiche</strong> visualizzato dopo la battaglia.</li>
                            <li>Distribuzione dell'esperienza a tutti i Piemon usati in battaglia (solo quelli con HP > 0).</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di cattura con Bala:</strong>
                        <ul>
                            <li>Implementazione della <strong>Bala</strong> (Pokéball) come oggetto per catture disponibile nell'inventario.</li>
                            <li><strong>Animazione della Bala</strong> con sprite sheet dedicato: lancio, shake multipli e apertura.</li>
                            <li><strong>Calcolo probabilità di cattura</strong> basato su HP attuali, capture rate e bonus della Bala.</li>
                            <li>Sistema di shake della Bala (1-3 shake prima della cattura) con rotazione animata.</li>
                            <li><strong>Vista dettagli del Piemon catturato</strong> con statistiche complete e mosse.</li>
                            <li>Aggiunta automatica del Piemon catturato al team se c'è spazio.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di squadra (Team) espanso:</strong>
                        <ul>
                            <li>Gestione completa di una <strong>squadra fino a 6 Piemon</strong>.</li>
                            <li><strong>Vista lista</strong> con nome, livello, tipo e HP di ogni Piemon.</li>
                            <li><strong>Vista dettagli</strong> con tutte le statistiche, mosse con PP e categorie.</li>
                            <li><strong>Sistema di swap</strong> per riordinare i Piemon nella squadra (tasto E nell'overworld).</li>
                            <li>Integrazione con l'inventario per <strong>usare oggetti sui Piemon</strong> (es. Pozioni per curare).</li>
                            <li><strong>Cambio Piemon durante la battaglia</strong> con conferma e gestione dei Piemon KO.</li>
                            <li>Selezione automatica del prossimo Piemon disponibile quando uno viene sconfitto.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di Texture Cache per ottimizzazione:</strong>
                        <ul>
                            <li>Implementato un <strong>sistema di cache LRU</strong> per le texture di testo renderizzate.</li>
                            <li>Riduzione drastica delle chiamate a <code>TTF_RenderText</code> riutilizzando texture esistenti.</li>
                            <li>Sistema di chiavi univoche per identificare ogni texture nella cache.</li>
                            <li>Funzioni di invalidazione selettiva per texture che cambiano frequentemente (HP, PP).</li>
                            <li>Supporto fino a 256 texture in cache con sostituzione automatica delle meno usate.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Fixed Timestep per gameplay consistente:</strong>
                        <ul>
                            <li>Implementato <strong>update logico a 62.5 Hz fissi</strong> indipendente dal framerate.</li>
                            <li><strong>Movimento frame-independent</strong> del player basato su pixel per secondo.</li>
                            <li><strong>Interpolazione del rendering</strong> per movimento fluido anche con timestep fisso.</li>
                            <li>Sistema di accumulator per gestire correttamente il tempo residuo.</li>
                            <li>Limite di frame skip per evitare "spiral of death" su sistemi lenti.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Spatial Hash Grid per collisioni ottimizzate:</strong>
                        <ul>
                            <li>Implementata una <strong>griglia spaziale</strong> per partizionare lo spazio di collisione.</li>
                            <li>Query efficienti che controllano solo le collision rect nelle celle vicine.</li>
                            <li>Riduzione della complessità da O(n) a ~O(1) per i check di collisione.</li>
                            <li>Celle di dimensione configurabile (64x64 pixel di default).</li>
                            <li>Fallback automatico al sistema lineare se la griglia non è disponibile.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di impostazioni (Settings):</strong>
                        <ul>
                            <li>Nuovo menu <strong>Impostazioni</strong> accessibile dal menu principale.</li>
                            <li><strong>Controllo del volume</strong> audio da 0% a 100% con barra visiva.</li>
                            <li>Controlli con A (sinistra)/D (destra) con key repeat per regolazione fine.</li>
                            <li>Applicazione immediata del volume a tutte le tracce audio.</li>
                            <li>Salvataggio persistente delle impostazioni (predisposto per future espansioni).</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                
                <ul>
                    <li><strong>Sistema audio significativamente espanso:</strong>
                        <ul>
                            <li>Refactoring completo per supportare <strong>multiple tracce audio</strong> simultanee.</li>
                            <li>Gestione separata per musica di sottofondo e musica di battaglia.</li>
                            <li><strong>Sistema di volume dinamico</strong> applicabile a tutte le tracce.</li>
                            <li><strong>Gestione del focus finestra</strong>: pausa automatica audio quando la finestra perde il focus.</li>
                            <li>Streaming ottimizzato con buffer multipli per evitare interruzioni.</li>
                            <li>Mutex per thread-safety nelle operazioni audio.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Camera migliorata per fixed timestep:</strong>
                        <ul>
                            <li>Nuovo algoritmo di <strong>smoothing esponenziale</strong> compatibile con timestep fisso.</li>
                            <li><strong>Interpolazione tra frame</strong> per rendering fluido della posizione.</li>
                            <li>Salvataggio dello stato precedente per interpolazione accurata.</li>
                            <li>Snap automatico quando molto vicini alla posizione target.</li>
                            <li>Formula matematicamente corretta che mantiene lo stesso comportamento indipendentemente dagli FPS.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di salvataggio esteso per nuove feature:</strong>
                        <ul>
                            <li><strong>Versione 13</strong> del formato di salvataggio con supporto completo per le nuove feature.</li>
                            <li>Salvataggio di tutti i Piemon del team con statistiche complete.</li>
                            <li>Persistenza di <strong>mosse con PP attuali e categoria</strong> (fisica/speciale).</li>
                            <li>Salvataggio del <strong>sistema exp</strong> con esperienza attuale e prossimo livello.</li>
                            <li>Retrocompatibilità mantenuta solo con versione precedente del formato (versione 12, senza impostazione audio).</li>
                            <li>Nuova cartella salvataggi: <code>alpha-2/alpha-2.0/saves/</code>.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Rendering ottimizzato e bug fix:</strong>
                        <ul>
                            <li><strong>Reset completo del renderer</strong> ad ogni frame per evitare stati corrotti.</li>
                            <li>Gestione corretta del clipping rect per evitare artefatti visivi.</li>
                            <li>Fix del rendering con <strong>overlay trasparenti</strong> che non interferiscono più.</li>
                            <li>Ottimizzazione del culling nella tilemap usando solo tile visibili.</li>
                            <li>Pulizia degli stati di blending dopo ogni sistema UI.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Menu principale espanso:</strong>
                        <ul>
                            <li>Aggiunta voce <strong>"Impostazioni"</strong> portando il totale a 6 opzioni.</li>
                            <li>Integrazione con il nuovo sistema di settings.</li>
                            <li>Navigazione migliorata tra i vari sottosistemi.</li>
                        </ul>
                    </li>
                    
                    <li><strong>FPS Display migliorato:</strong>
                        <ul>
                            <li>Utilizzo di <strong>nanosecondi</strong> per calcoli più precisi del framerate.</li>
                            <li>Integrazione con il sistema di texture cache.</li>
                            <li>Update del valore visualizzato solo quando cambia significativamente.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                
                <ul>
                    <li>Il <strong>sistema di battaglie</strong> è ora completamente funzionante con meccaniche fedeli ai giochi Pokémon classici.</li>
                    <li>La <strong>texture cache</strong> migliora significativamente le performance, specialmente con molti elementi UI dinamici.</li>
                    <li>Il <strong>fixed timestep</strong> garantisce gameplay consistente su hardware diversi mantenendo fluidità visiva.</li>
                    <li>Le <strong>impostazioni audio</strong> permettono ora un controllo migliore dell'esperienza sonora.</li>
                    <li>Tutti i sistemi mantengono modularità e sono pronti per l'aggiunta di nuovi Piemon, mosse e meccaniche.</li>
                </ul>
            `
        },
        '2025-07-27': {
            title: '[alpha-2.5] - Centro Piemon e mappe multiple',
            content: `
                <h4>[alpha-2.5] - 2025-07-27</h4>
                
                <h5>Aggiunto</h5>
                
                <ul>
                    <li><strong>Sistema di portali e mappe multiple:</strong>
                        <ul>
                            <li>Implementato un <strong>Map Manager</strong> per gestire fino a 3 mappe caricate simultaneamente.</li>
                            <li><strong>Sistema di portali</strong> definiti nei file TMX per viaggiare tra le mappe.</li>
                            <li><strong>Transizioni fluide</strong> con fade out/in durante il cambio mappa (durata 300ms).</li>
                            <li>Supporto per <strong>tileset custom per mappa</strong> (tilemap3 usa propri tileset).</li>
                            <li><strong>Cooldown di 1 secondo</strong> dopo ogni transizione per evitare loop accidentali.</li>
                            <li>Posizionamento automatico del player al portale di destinazione specificato.</li>
                            <li>Gestione intelligente del caricamento assets per ogni mappa.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Nuove tilemap e contenuti:</strong>
                        <ul>
                            <li><strong>tilemap2-1.0.tmx</strong>: Nuova mappa interna (36x24 tiles) collegata alla mappa principale.</li>
                            <li><strong>tilemap3-1.0.tmx</strong>: Centro Piemon (14x12 tiles) con infermiera, market e PC.</li>
                            <li>Aggiornata la mappa principale a <strong>tilemap-2.2.tmx</strong> con nuovo portale di collegamento.</li>
                            <li>Nuovi layer dedicati per interazioni specifiche: "Nurse", "Clerk", "Pc".</li>
                            <li>Layer "Statue" nella mappa 2 con messaggio personalizzato per la statua di Piemon.</li>
                            <li>Configurazione delle dimensioni di ogni mappa nel config.h.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Infermiera Joy per curare i Piemon:</strong>
                        <ul>
                            <li>Implementata l'<strong>infermiera del centro Piemon</strong> con dialoghi e animazioni.</li>
                            <li><strong>Sequenza di cura completa</strong>: messaggio iniziale → animazione rotazione → cura → messaggio finale.</li>
                            <li><strong>Animazione della nurse</strong>: si gira di spalle durante la cura (durata 2 secondi).</li>
                            <li>Ripristino automatico degli <strong>HP e PP</strong> di tutti i Piemon del team.</li>
                            <li>Sistema di stati per gestire la progressione della sequenza di cura.</li>
                            <li>Sprite alternativi per l'animazione di rotazione (tiles +2 orizzontalmente).</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema Market (negozio) completo:</strong>
                        <ul>
                            <li>Implementato un <strong>negozio interattivo</strong> accessibile interagendo con il commesso (layer "Clerk").</li>
                            <li>Menu di acquisto con <strong>lista oggetti e prezzi</strong> (Bala: 5€, Pozioni: 3€).</li>
                            <li><strong>Selezione quantità dinamica</strong> con key repeat per regolazione rapida (tasti W/S).</li>
                            <li>Sistema di <strong>valuta in-game</strong> con visualizzazione del saldo del giocatore (inizializzato a 100€).</li>
                            <li><strong>Conferma acquisto</strong> con verifica automatica dei fondi disponibili.</li>
                            <li>Messaggi di feedback per acquisti riusciti o fondi insufficienti.</li>
                            <li>Integrazione completa con il sistema inventario per aggiungere gli oggetti acquistati.</li>
                            <li>UI dedicata con overlay e texture cache per performance ottimali.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema PC (deposito Piemon):</strong>
                        <ul>
                            <li>Implementato un <strong>sistema di deposito</strong> stile Pokémon per gestire fino a <strong>300 Piemon</strong>.</li>
                            <li><strong>Griglia visuale 6x5</strong> con scrolling verticale per navigare tra tutti i Piemon depositati.</li>
                            <li>Navigazione con WASD nella griglia.</li>
                            <li><strong>Vista dettagli</strong> completa con statistiche, mosse e PP dei Piemon nel PC.</li>
                            <li><strong>Vista team integrata</strong> che riutilizza il sistema UI del team per coerenza.</li>
                            <li><strong>Sistema di swap</strong> bidirezionale tra PC e team con conferme visive.</li>
                            <li>Indicatori visivi per modalità swap con highlight giallo del Piemon selezionato.</li>
                            <li>Protezione contro il deposito dell'ultimo Piemon del team con messaggio di errore.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                
                <ul>
                    <li><strong>Sistema di salvataggio significativamente espanso:</strong>
                        <ul>
                            <li><strong>Versione 20</strong> del formato di salvataggio con supporto per tutte le nuove feature.</li>
                            <li>Salvataggio completo del <strong>contenuto del PC</strong> con tutti i Piemon depositati.</li>
                            <li>Salvataggio dei <strong>layer modificati</strong> (items raccolti) per ogni mappa.</li>
                            <li>Supporto per il salvataggio dei <strong>soldi del giocatore</strong>.</li>
                            <li>Nuova cartella salvataggi: <code>alpha-2/alpha-2.5/saves/</code>.</li>
                            <li>Retrocompatibilità limitata solo alla versione precedente del formato.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di interazione espanso:</strong>
                        <ul>
                            <li>Refactoring per supportare <strong>callback per apertura UI</strong> (market e PC).</li>
                            <li>Gestione di <strong>messaggi sequenziali</strong> per interazioni complesse (infermiera).</li>
                            <li>Sistema di <strong>stati per NPCs</strong> che permette animazioni e sequenze.</li>
                            <li>Priorità di controllo layer per verificare interazioni nell'ordine corretto.</li>
                            <li>Supporto per <strong>layer con nomi custom</strong> invece di indici hardcoded.</li>
                            <li>Gestione migliorata dell'input per evitare aperture multiple accidentali.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Tilemap system aggiornato:</strong>
                        <ul>
                            <li>Nuovo metodo <code>tilemap_find_layer_by_name()</code> per trovare layer per nome.</li>
                            <li>Supporto per <strong>tilemap di dimensioni diverse</strong> (48x36, 36x24, 14x12).</li>
                            <li>Inizializzazione con dimensioni specifiche tramite <code>tilemap_init_with_size()</code>.</li>
                            <li>Gestione di <strong>tileset multipli per mappa</strong> con caricamento dinamico.</li>
                            <li>Rendering ottimizzato che supporta assets custom per mappa.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Battle system migliorato:</strong>
                        <ul>
                            <li>Aggiunto supporto per <strong>inviare Piemon catturati al PC</strong> quando il team è pieno.</li>
                            <li>Messaggio specifico "è stato inviato al PC." quando non c'è spazio nel team.</li>
                            <li>Integrazione completa con il sistema PC per gestione automatica.</li>
                            <li>Flag <code>sent_to_pc</code> per tracciare dove è finito il Piemon catturato.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Config.h riorganizzato:</strong>
                        <ul>
                            <li>Aggiunte costanti per le <strong>dimensioni delle tre mappe</strong> (MAP1_W/H, MAP2_W/H, MAP3_W/H).</li>
                            <li>Nuove costanti per <strong>portali</strong> (MAX_PORTALS, PORTAL_TRANSITION_DURATION).</li>
                            <li>Percorsi per le nuove tilemap (TILEMAP2_TMX, TILEMAP3_TMX).</li>
                            <li>Aggiornato SAVES_PATH per la nuova versione.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                
                <ul>
                    <li>Il <strong>sistema Market</strong> fornisce la prima implementazione di economia nel gioco, preparando il terreno per futuri negozi e venditori.</li>
                    <li>Il <strong>sistema PC</strong> è completamente funzionante e fedele ai giochi Pokémon classici, con capacità di gestire grandi collezioni di Piemon.</li>
                    <li>Le <strong>mappe multiple</strong> aprono possibilità per un mondo di gioco espanso con città, percorsi e edifici interni.</li>
                    <li>L'<strong>infermiera Joy</strong> implementa il primo NPC con animazioni e sequenze complesse, servendo da base per futuri NPCs interattivi.</li>
                    <li>Il formato di salvataggio versione 20 è significativamente più complesso ma necessario per supportare tutte le nuove funzionalità.</li>
                    <li>Le performance rimangono ottime grazie all'uso estensivo della texture cache e rendering ottimizzato.</li>
                </ul>
            `
        },
        '2025-08-03': {
            title: '[alpha-3.0] - Restyling grafico completo e menu principale',
            content: `
                <h4>[alpha-3.0] - 2025-08-03</h4>
                
                <h5>Aggiunto</h5>
                
                <ul>
                    <li><strong>Main Menu completamente nuovo come schermata iniziale:</strong>
                        <ul>
                            <li>Implementato un <strong>menu principale stile Pokémon</strong> che appare all'avvio del gioco.</li>
                            <li>Menu posizionato a sinistra dello schermo con tre opzioni: "Nuova partita", "Carica salvataggio", "Chiudi Piemon".</li>
                            <li><strong>Titolo "PIEMON" in grande</strong> centrato nella parte superiore dello schermo.</li>
                            <li>Sistema di <strong>key repeat</strong> per navigazione fluida con i tasti W/S (delay 300ms, intervallo 80ms).</li>
                            <li>Background con <strong>noise statico procedurale</strong> generato dinamicamente per effetto retrò.</li>
                            <li>Transizioni fluide tra menu principale e gioco con gestione stati dedicata.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema UI completamente ridisegnato con stile grafico unificato:</strong>
                        <ul>
                            <li><strong>Palette colori centralizzata</strong> nel config.h con costanti UI_COLOR per tutto il gioco:
                                <ul>
                                    <li>Background: rosso scuro (#300610)</li>
                                    <li>Testo dual-color: dorato chiaro (#daa93b) per metà superiore, dorato scuro (#c27517) per metà inferiore</li>
                                    <li>Bordi: dorato (#daa93b)</li>
                                    <li>Selezioni: rosso scuro (#830b19) con bordo dorato scuro</li>
                                </ul>
                            </li>
                            <li><strong>Testi con effetto dual-color</strong> che divide ogni testo in due colori diversi.</li>
                            <li><strong>Background con texture noise procedurale</strong> per tutti i menu e finestre UI.</li>
                            <li><strong>Doppio bordo colorato</strong> per le selezioni (bordo esterno dorato scuro, interno rosso scuro).</li>
                        </ul>
                    </li>
                    
                    <li><strong>Texture Cache significativamente espansa:</strong>
                        <ul>
                            <li>Nuova funzione <code>texture_cache_get_dual_color_text()</code> per creare testi bicolore con caching efficiente.</li>
                            <li>Nuova funzione <code>texture_cache_generate_ui_background()</code> per generare sfondi con noise statico.</li>
                            <li><strong>Algoritmo di noise procedurale a tre passate:</strong>
                                <ul>
                                    <li>Prima passata: noise fine scuro (pixel 2x2) con bassa intensità</li>
                                    <li>Seconda passata: noise medio scuro (3-4 pixel) con pattern irregolare</li>
                                    <li>Terza passata: noise fine chiaro per aggiungere variazione</li>
                                </ul>
                            </li>
                            <li>Supporto per seed randomici per generare pattern unici ma deterministici.</li>
                            <li>Cache key robuste per evitare collisioni e ottimizzare il riutilizzo.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Key repeat system per tutti i menu:</strong>
                        <ul>
                            <li>Implementato un <strong>sistema di key repeat unificato</strong> per navigazione più fluida.</li>
                            <li>Configurabile con delay iniziale (300ms) e intervallo di ripetizione (80ms).</li>
                            <li>Applicato a: menu principale, menu di pausa, inventario, team, PC, market, impostazioni.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                
                <ul>
                    <li><strong>Tutti i sistemi UI aggiornati al nuovo stile grafico:</strong>
                        <ul>
                            <li><strong>Menu di pausa</strong>: ora con background noise, testi dual-color e nuovi bordi di selezione.</li>
                            <li><strong>Inventario</strong>: ridisegnato con nuovo stile, titoli e oggetti con testo dual-color.</li>
                            <li><strong>Team UI</strong>: lista Piemon e vista dettagli con nuovo design coerente.</li>
                            <li><strong>PC Storage</strong>: griglia e dettagli Piemon con nuovo stile visivo.</li>
                            <li><strong>Market</strong>: interfaccia negozio completamente ridisegnata.</li>
                            <li><strong>Settings</strong>: menu impostazioni con nuovo look, barra volume stilizzata.</li>
                            <li><strong>Battle UI</strong>: pannelli informativi e menu azioni aggiornati al nuovo stile.</li>
                            <li><strong>Message Box</strong>: ora con background noise e testo dual-color.</li>
                            <li><strong>FPS Display</strong>: piccolo box con noise in alto a sinistra quando attivo.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di stati di gioco espanso:</strong>
                        <ul>
                            <li>Aggiunto nuovo stato <code>GAME_STATE_MAIN_MENU</code> per gestire il menu principale.</li>
                            <li>Il gioco ora <strong>inizia sempre dal menu principale</strong> invece che direttamente nel mondo.</li>
                            <li>Migliorata la gestione delle transizioni tra stati con supporto per il menu.</li>
                            <li>L'opzione "Esci" nel menu di pausa ora riporta al <strong>menu principale</strong> invece di chiudere il gioco.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Aggiornamenti asset e configurazione:</strong>
                        <ul>
                            <li><strong>Nuovo player sprite</strong>: aggiornato a <code>player-2.0.png</code> con grafica migliorata.</li>
                            <li><strong>Nuovo Bala sprite</strong>: <code>bala-sprite-2.0.png</code> con dimensioni ridotte (30px invece di 40px).</li>
                            <li>Frame della Bala aggiornati: 256x320 per frame (da 341x512).</li>
                            <li><strong>Nuovo font</strong>: cambiato in <code>GNF.ttf</code> per migliore leggibilità.</li>
                            <li>Percorso salvataggi aggiornato a <code>alpha-3/alpha-3.0/saves/</code> per la nuova versione.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Miglioramenti rendering e performance:</strong>
                        <ul>
                            <li>Tutti i sistemi UI ora pre-generano le texture di background per evitare calcoli ripetuti.</li>
                            <li>Utilizzo estensivo della texture cache per testi e background riduce allocazioni.</li>
                            <li>Rendering del noise ottimizzato con pattern algoritmici invece di randomizzazione vera.</li>
                            <li>Blending mode gestito correttamente per overlay e trasparenze.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Ottimizzazioni codice e pulizia:</strong>
                        <ul>
                            <li>Rimosso codice legacy per rendering senza texture cache in tutti i moduli UI.</li>
                            <li>Standardizzazione delle costanti di colore con prefisso <code>UI_COLOR_</code>.</li>
                            <li>Gestione memoria migliorata con texture cache che evita leak.</li>
                            <li>Codice più modulare e manutenibile con funzioni dedicate per elementi UI comuni.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                
                <ul>
                    <li>Il <strong>nuovo stile grafico unificato</strong> dona al gioco un aspetto molto più professionale e coerente, ispirato ai giochi Pokémon classici ma con tocchi moderni.</li>
                    <li>Il <strong>main menu</strong> fornisce un punto di ingresso chiaro e permette gestione salvataggi più intuitiva.</li>
                    <li>Il <strong>sistema di texture cache espanso</strong> migliora significativamente le performance con UI complesse.</li>
                    <li>Il <strong>key repeat</strong> risolve il problema della navigazione lenta in liste lunghe (inventario pieno, PC con molti Piemon).</li>
                </ul>
            `
        },
        '2025-08-07': {
            title: '[alpha-3.1] - Primi contenuti di gioco ufficiali: ambientazione treno e cutscene iniziale',
            content: `
                <h4>[alpha-3.1] - 2025-08-07</h4>
                
                <h5>Aggiunto</h5>
                
                <ul>
                    <li><strong>Prime tilemap ufficiali del gioco - Ambientazione treno:</strong>
                        <ul>
                            <li>Implementate <strong>tre mappe del treno</strong> che sostituiscono le vecchie tilemap di test, mantenendo però tutte le meccaniche sviluppate.</li>
                            <li><strong>train-tilemap-1-1.0.tmx</strong>: Primo vagone del treno (34x8 tiles) con sedili, corridoio e area del player.</li>
                            <li><strong>train-tilemap-2-1.0.tmx</strong>: Connessione tra vagoni (7x7 tiles) e punto di discesa.</li>
                            <li><strong>train-tilemap-3-1.0.tmx</strong>: Secondo vagone (34x8 tiles), identico al primo.</li>
                            <li><strong>Nuovo tileset dedicato</strong> <code>train-tileset-1.0.tsx</code> con grafica specifica.</li>
                            <li>Layer specializzati: "Lying-Player" per il player sdraiato iniziale, "Lying-NPC" per NPC addormentato, "Sits" per i sedili interattivi.</li>
                            <li>Organizzazione strutturata in <code>assets/tilemaps/train/</code> per separare gli asset di gioco da quelli di test.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di cutscene completo ed estensibile:</strong>
                        <ul>
                            <li>Implementato un <strong>framework di cutscene modulare</strong> con gestione stati e ID univoci per future espansioni.</li>
                            <li><strong>Prima cutscene del gioco</strong>: introduzione sul treno con sequenza cinematica completa.</li>
                            <li><strong>Fasi della cutscene del treno</strong>:
                                <ul>
                                    <li>Schermo nero iniziale di 26 secondi sincronizzato con audio di apertura</li>
                                    <li>Effetto "blink" di apertura occhi (1 secondo)</li>
                                    <li>Seconda schermata nera di transizione (1.5 secondi)</li>
                                    <li>Visualizzazione della mappa con messaggio "Devo essermi addormentato."</li>
                                    <li>Terza schermata nera (1 secondo)</li>
                                    <li>Spawn del player con rimozione automatica del layer "Lying-Player"</li>
                                    <li>Messaggio finale "Mi devo sbrigare a scendere dal treno."</li>
                                </ul>
                            </li>
                            <li><strong>Gestione focus finestra</strong>: pausa/ripresa automatica della cutscene quando la finestra perde/riprende il focus.</li>
                            <li><strong>Skip della cutscene</strong> con tasto ESC che posiziona immediatamente il player e avvia il gameplay.</li>
                            <li>Timer con compensazione del tempo di pausa per mantenere sincronizzazione perfetta.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema audio espanso con effetti sonori:</strong>
                        <ul>
                            <li>Aggiunta <strong>terza traccia audio dedicata</strong> (<code>AUDIO_TRACK_SOUND_EFFECT</code>) per riproduzione simultanea di effetti.</li>
                            <li><strong>Nuove funzioni API</strong>:
                                <ul>
                                    <li><code>audio_play_sound_effect()</code>: riproduce un effetto sonoro mettendo in pausa la musica</li>
                                    <li><code>audio_stop_sound_effect()</code>: ferma l'effetto e riprende la musica precedente</li>
                                    <li><code>audio_is_sound_effect_playing()</code>: verifica se un effetto è in riproduzione</li>
                                </ul>
                            </li>
                            <li><strong>Effetti sonori implementati</strong>:
                                <ul>
                                    <li><code>train-cutscene.mp3</code>: audio di 26 secondi per la cutscene iniziale</li>
                                    <li><code>portal-transition.mp3</code>: suono di transizione quando si attraversa un portale</li>
                                </ul>
                            </li>
                            <li><strong>Sistema di salvataggio/ripristino tracce</strong>: memorizza automaticamente la musica corrente durante gli effetti.</li>
                            <li>Gestione intelligente che evita riprese indesiderate della musica dopo effetti sonori.</li>
                            <li>Threshold ridotti (da 1024 a 256 bytes) per transizioni audio più rapide.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di tile rimovibili dinamicamente:</strong>
                        <ul>
                            <li>Implementato <strong>tracking dei tile rimossi</strong> per modifiche permanenti alle mappe durante il gameplay.</li>
                            <li>Struttura <code>RemovedTile</code> per memorizzare coordinate e layer dei tile rimossi.</li>
                            <li><strong>Funzioni di gestione</strong>:
                                <ul>
                                    <li><code>tilemap_add_removed_tile()</code>: marca un tile come rimosso</li>
                                    <li><code>tilemap_is_tile_removed()</code>: verifica se un tile è stato rimosso</li>
                                </ul>
                            </li>
                            <li>Array di 100 tile rimovibili per mappa con controllo duplicati automatico.</li>
                            <li>Utilizzato per rimuovere permanentemente il layer "Lying-Player" dopo la cutscene.</li>
                            <li>I tile rimossi vengono saltati durante il rendering per performance ottimali.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Nuovo layer di rendering "Details-2":</strong>
                        <ul>
                            <li>Implementato <strong>layer speciale che viene renderizzato SOPRA il player</strong> per effetti di profondità.</li>
                            <li>Sistema di rendering a due passate: prima tutti i layer tranne Details-2, poi player, infine Details-2.</li>
                            <li>Funzione helper <code>render_details2_layer()</code> dedicata per gestione separata.</li>
                            <li>Supporto completo nel sistema di cutscene con culling ottimizzato.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Interazioni contestuali espanse:</strong>
                        <ul>
                            <li><strong>Interazione con NPC sdraiato</strong>: mostra "Zzz... Zzz... Zzz...".</li>
                            <li><strong>Interazione con sedili del treno</strong>: messaggio "Non ho tempo, devo scendere dal treno.".</li>
                            <li><strong>Sistema di priorità</strong>: l'NPC ha priorità sui sedili sottostanti per evitare conflitti.</li>
                            <li>Controllo direzionale: i sedili rispondono solo se guardati da destra o sinistra.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Modificato</h5>
                
                <ul>
                    <li><strong>Map Manager significativamente migliorato:</strong>
                        <ul>
                            <li>Nuova funzione <code>map_manager_init_with_map()</code> per inizializzare con una mappa specifica.</li>
                            <li><strong>Durata transizione portali aumentata a 1750ms</strong> (da 300ms) per effetto più cinematico.</li>
                            <li><strong>Cooldown portali ridotto a 500ms</strong> (da 1000ms) per navigazione più fluida.</li>
                            <li>Gestione speciale del portale "portal-out-train" con messaggio "Coming soon", blocco transizione e flag <code>player_in_exit_portal</code> per evitare spam del messaggio quando si resta nel portale.</li>
                            <li>Riproduzione automatica del suono di transizione quando si attraversa un portale normale.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Sistema di salvataggio esteso (versione 21):</strong>
                        <ul>
                            <li>Aggiunto <strong>salvataggio completo dei tile rimossi</strong> per ogni mappa caricata.</li>
                            <li>Struttura estesa per memorizzare nome mappa, numero e dettagli di ogni tile rimosso.</li>
                            <li>Gestione robusta del caricamento con skip automatico per mappe non caricate.</li>
                            <li>Percorso salvataggi aggiornato a <code>alpha-3/alpha-3.1/saves/</code>.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Audio system ottimizzato:</strong>
                        <ul>
                            <li><strong>Delay drasticamente ridotti</strong> per transizioni più fluide:
                                <ul>
                                    <li>Pausa stream: da 100ms/50ms a 10ms</li>
                                    <li>Clear stream: da 50ms a 5ms</li>
                                    <li>Cleanup: da 50ms a 10ms per traccia</li>
                                </ul>
                            </li>
                            <li>Mutex lock migliorato con controlli aggiuntivi per evitare deadlock.</li>
                            <li>Gestione <code>saved_track</code> con valore invalido (<code>AUDIO_TRACK_COUNT</code>) quando non c'è musica da ripristinare.</li>
                        </ul>
                    </li>
                    
                    <li><strong>Config.h riorganizzato per le nuove mappe:</strong>
                        <ul>
                            <li>Aggiunte costanti per <strong>dimensioni mappe del treno</strong>: TRAIN_MAP1_W/H, TRAIN_MAP2_W/H, TRAIN_MAP3_W/H.</li>
                            <li>Nuovi percorsi: <code>TRAIN_TILEMAPS_PATH</code>, <code>TRAIN_TILEMAP1_TMX</code>, <code>TRAIN_TILEMAP2_TMX</code>, <code>TRAIN_TILEMAP3_TMX</code>.</li>
                            <li>Percorsi audio separati: <code>SOUNDS_PATH</code> per effetti sonori, <code>SONGS_PATH</code> per musica.</li>
                            <li><strong>Enum CutsceneID</strong> per identificazione univoca delle cutscene.</li>
                            <li>Costanti temporali per la cutscene del treno con durate precise per ogni fase.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Rimosso</h5>
                
                <ul>
                    <li><strong>Tilemap di test eliminate:</strong>
                        <ul>
                            <li>Rimossa <code>tilemap-2.2.tmx</code> (mappa principale di test 48x36).</li>
                            <li>Rimossa <code>tilemap2-1.0.tmx</code> (mappa interna di test 36x24).</li>
                            <li>Rimossa <code>tilemap3-1.0.tmx</code> (centro Piemon di test 14x12).</li>
                            <li>Asset di test mantenuti in <code>assets/test-assets/</code> per retrocompatibilità ma non più utilizzati nel gameplay principale.</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>Note</h5>
                
                <ul>
                    <li><strong>Prima versione con contenuti di gioco ufficiali</strong>: le tilemap del treno rappresentano l'inizio della narrativa vera e propria del gioco.</li>
                    <li>Il <strong>sistema di cutscene</strong> è progettato per essere facilmente estendibile con nuove sequenze cinematiche.</li>
                    <li>Il <strong>sistema di tile rimovibili</strong> apre possibilità per modifiche permanenti del mondo di gioco.</li>
                    <li>Le <strong>ottimizzazioni audio</strong> migliorano la reattività del gioco durante le transizioni.</li>
                </ul>
            `
        }
    }
};

// Freeze the configuration to prevent accidental modifications
Object.freeze(SITE_CONFIG);