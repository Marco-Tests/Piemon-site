document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Funzione per caricare componenti HTML esterni (es. navbar, footer)
     * @param {string} componentId - L'ID dell'elemento contenitore nel file principale.
     * @param {string} filePath - Il percorso del file HTML da caricare.
     */
    const loadComponent = (componentId, filePath) => {
        const container = document.getElementById(componentId);
        if (container) {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Errore nel caricamento di ${filePath}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    container.innerHTML = data;
                    // Dopo aver caricato il footer, aggiorna l'anno
                    if (componentId === 'footer-container') {
                        updateYear();
                    }
                })
                .catch(error => {
                    console.error('Errore:', error);
                    container.innerHTML = `<p style="color: red; text-align: center;">Impossibile caricare il componente ${componentId}.</p>`;
                });
        }
    };

    /**
     * Funzione per aggiornare l'anno corrente nel footer.
     */
    const updateYear = () => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };
    
    // Carica i componenti
    loadComponent('navbar-container', 'navbar.html');
    loadComponent('footer-container', 'footer.html');

});