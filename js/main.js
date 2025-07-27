/**
 * Main JavaScript File
 * Handles core functionality for all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Initialize the application
     */
    async function init() {
        try {
            // Hide loading overlay after content loads
            hideLoadingOverlay();
            
            // Load components
            await loadPageComponents();
            
            // Initialize year in footer
            updateYear();
            
            // Set active navigation state
            setActiveNavLink();
            
            // Initialize theme (future feature)
            initializeTheme();
            
            // Add scroll behavior
            initializeScrollBehavior();
            
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
    
    /**
     * Load page components (navbar and footer)
     */
    async function loadPageComponents() {
        const componentPromises = [];
        
        // Load navbar
        if (document.getElementById('navbar-container')) {
            // Adjust path based on current page location
            const navbarPath = window.location.pathname.includes('/pages/') 
                ? '../components/navbar.html' 
                : 'components/navbar.html';
            
            componentPromises.push(
                window.componentLoader.loadComponent('navbar-container', navbarPath)
            );
        }
        
        // Load footer
        if (document.getElementById('footer-container')) {
            // Adjust path based on current page location
            const footerPath = window.location.pathname.includes('/pages/') 
                ? '../components/footer.html' 
                : 'components/footer.html';
            
            componentPromises.push(
                window.componentLoader.loadComponent('footer-container', footerPath)
            );
        }
        
        await Promise.all(componentPromises);
    }
    
    /**
     * Hide loading overlay with animation
     */
    function hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                // Remove from DOM after animation completes
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 350);
            }, 500);
        }
    }
    
    /**
     * Update current year in footer
     */
    function updateYear() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Set active state on current navigation link
     */
    function setActiveNavLink() {
        // Wait a bit for navbar to load
        setTimeout(() => {
            const navLinks = document.querySelectorAll('.nav-links a');
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (!linkHref) return;
                
                const linkPage = linkHref.split('/').pop() || 'index.html';
                
                if (linkPage === currentPage) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
                
                // Handle disabled links
                if (link.hasAttribute('disabled') || linkHref === '#') {
                    link.style.cursor = 'not-allowed';
                    link.style.opacity = '0.5';
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                    });
                }
            });
        }, 100);
    }
    
    /**
     * Initialize theme system (preparation for future dark mode)
     */
    function initializeTheme() {
        // Get saved theme or default
        const savedTheme = localStorage.getItem(SITE_CONFIG.theme.storageKey) || SITE_CONFIG.theme.default;
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Listen for theme changes (future implementation)
        window.addEventListener('themechange', (e) => {
            const newTheme = e.detail.theme;
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(SITE_CONFIG.theme.storageKey, newTheme);
        });
    }
    
    /**
     * Initialize scroll behavior
     */
    function initializeScrollBehavior() {
        let lastScroll = 0;
        const navbar = document.querySelector('.main-nav');
        
        if (!navbar) return;
        
        // Throttle scroll event
        let ticking = false;
        
        function updateNavbar() {
            const currentScroll = window.pageYOffset;
            
            // Hide/show navbar on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down & past threshold
                navbar.classList.add('nav-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('nav-hidden');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }
    
    /**
     * Global error handler
     */
    window.addEventListener('error', (e) => {
        if (SITE_CONFIG.dev.showLogs) {
            console.error('Global error:', e.error);
        }
    });
    
    /**
     * Handle browser back/forward navigation
     */
    window.addEventListener('popstate', () => {
        setActiveNavLink();
    });
    
    /**
     * Expose useful functions globally
     */
    window.piemon = {
        updateYear,
        setActiveNavLink,
        hideLoadingOverlay
    };
    
    // Initialize application
    init();
});