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
            
            // Initialize mobile menu - IMPORTANTE: questa chiamata mancava!
            initializeMobileMenu();
            
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
     * Initialize mobile menu toggle - VERSIONE MIGLIORATA
     */
    function initializeMobileMenu() {
        // Aspetta che il navbar sia caricato completamente
        setTimeout(() => {
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');
            const navbar = document.querySelector('.main-nav');
            
            if (!navToggle || !navLinks || !navbar) {
                // Se gli elementi non sono ancora pronti, riprova
                setTimeout(initializeMobileMenu, 100);
                return;
            }
            
            let menuOpen = false;
            
            // Funzione per aprire/chiudere il menu
            function toggleMenu(e) {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                menuOpen = !menuOpen;
                
                if (menuOpen) {
                    navLinks.style.display = 'flex';
                    navLinks.classList.add('nav-links-active');
                    navToggle.setAttribute('aria-expanded', 'true');
                } else {
                    navLinks.style.display = 'none';
                    navLinks.classList.remove('nav-links-active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
            
            // Gestione eventi per dispositivi touch e mouse
            let touchStarted = false;
            
            // Eventi touch
            navToggle.addEventListener('touchstart', function(e) {
                touchStarted = true;
                e.preventDefault();
            }, { passive: false });
            
            navToggle.addEventListener('touchend', function(e) {
                if (touchStarted) {
                    e.preventDefault();
                    toggleMenu(e);
                    touchStarted = false;
                }
            }, { passive: false });
            
            // Evento click per dispositivi non-touch
            navToggle.addEventListener('click', function(e) {
                if (!touchStarted) {
                    toggleMenu(e);
                }
            });
            
            // Chiudi il menu quando si clicca fuori
            document.addEventListener('touchstart', function(e) {
                if (menuOpen && !navbar.contains(e.target)) {
                    toggleMenu();
                }
            });
            
            document.addEventListener('click', function(e) {
                if (menuOpen && !navbar.contains(e.target)) {
                    toggleMenu();
                }
            });
            
            // Chiudi il menu quando si clicca su un link
            navLinks.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    if (menuOpen) {
                        toggleMenu();
                    }
                });
            });
            
            // Chiudi il menu durante lo scroll
            let lastScrollY = window.scrollY;
            window.addEventListener('scroll', function() {
                if (Math.abs(window.scrollY - lastScrollY) > 50 && menuOpen) {
                    toggleMenu();
                }
                lastScrollY = window.scrollY;
            });
            
        }, 200);
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
        hideLoadingOverlay,
        initMobileMenu: initializeMobileMenu
    };
    
    // Initialize application
    init();
});
