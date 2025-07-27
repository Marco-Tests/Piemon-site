/**
 * Component Loader
 * Handles loading of HTML components (navbar, footer, etc.)
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.loadingPromises = new Map();
    }

    /**
     * Load a component into a container
     * @param {string} containerId - The ID of the container element
     * @param {string} componentPath - The path to the component HTML file
     * @param {Function} callback - Optional callback after component loads
     * @returns {Promise} - Promise that resolves when component is loaded
     */
    async loadComponent(containerId, componentPath, callback) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID "${containerId}" not found`);
            return;
        }

        try {
            // Check if component is already being loaded
            if (this.loadingPromises.has(componentPath)) {
                await this.loadingPromises.get(componentPath);
            }

            // Check if component is already loaded in cache
            let componentHTML;
            if (this.loadedComponents.has(componentPath)) {
                componentHTML = this.loadedComponents.get(componentPath);
            } else {
                // Create loading promise
                const loadingPromise = this.fetchComponent(componentPath);
                this.loadingPromises.set(componentPath, loadingPromise);
                
                componentHTML = await loadingPromise;
                
                // Cache the component
                this.loadedComponents.set(componentPath, componentHTML);
                this.loadingPromises.delete(componentPath);
            }

            // Insert component HTML
            container.innerHTML = componentHTML;

            // Execute callback if provided
            if (typeof callback === 'function') {
                callback();
            }

            // Fix relative paths if needed
            if (containerId === 'navbar-container') {
                this.fixNavbarPaths();
            }

            // Dispatch custom event
            container.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { componentPath, containerId }
            }));

        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
            container.innerHTML = this.getErrorTemplate(containerId);
        }
    }

    /**
     * Fetch component HTML from server
     * @param {string} componentPath - The path to the component
     * @returns {Promise<string>} - Promise that resolves with HTML content
     */
    async fetchComponent(componentPath) {
        // Add slight delay in development for testing loading states
        if (SITE_CONFIG.dev.mockDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, SITE_CONFIG.dev.mockDelay));
        }

        const response = await fetch(componentPath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.text();
    }

    /**
     * Get error template for failed component loads
     * @param {string} componentId - The component that failed to load
     * @returns {string} - Error HTML template
     */
    getErrorTemplate(componentId) {
        return `
            <div style="padding: 20px; text-align: center; color: #666;">
                <p style="margin: 0;">Unable to load ${componentId}</p>
            </div>
        `;
    }

    /**
     * Preload components for better performance
     * @param {Array<string>} componentPaths - Array of component paths to preload
     */
    async preloadComponents(componentPaths) {
        const promises = componentPaths.map(path => this.fetchComponent(path));
        try {
            const results = await Promise.all(promises);
            results.forEach((html, index) => {
                this.loadedComponents.set(componentPaths[index], html);
            });
        } catch (error) {
            console.error('Error preloading components:', error);
        }
    }

    /**
     * Clear component cache
     */
    clearCache() {
        this.loadedComponents.clear();
    }

    /**
     * Fix navbar paths based on current page location
     */
    fixNavbarPaths() {
        const isInSubfolder = window.location.pathname.includes('/pages/');
        const pathPrefix = isInSubfolder ? '../' : '';
        
        // Fix home links
        document.querySelectorAll('.nav-home-link').forEach(link => {
            if (link.tagName === 'A') {
                link.href = pathPrefix + 'index.html';
            }
        });
        
        // Fix project link
        const projectLink = document.querySelector('.nav-project-link');
        if (projectLink) {
            projectLink.href = pathPrefix + 'pages/project.html';
        }
        
        // Fix logo image
        const logoImg = document.querySelector('.nav-logo-img');
        if (logoImg) {
            logoImg.src = pathPrefix + 'assets/images/logo.png';
        }
    }
}

// Create global instance
window.componentLoader = new ComponentLoader();