/**
 * Project Page Specific JavaScript
 * Handles project page functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize calendar
    const calendar = new Calendar({
        locale: SITE_CONFIG.calendar.locale,
        firstDayOfWeek: SITE_CONFIG.calendar.firstDayOfWeek,
        updates: SITE_CONFIG.updates
    });
    
    // Modal functionality
    const modal = document.getElementById('update-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    /**
     * Close modal
     */
    function closeModal() {
        if (!modal) return;
        
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        
        // Return focus to calendar
        const focusTarget = document.querySelector('.calendar-day.has-update');
        if (focusTarget) {
            focusTarget.focus();
        }
    }
    
    /**
     * Open modal from calendar
     */
    window.openUpdateModal = function(date) {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const update = SITE_CONFIG.updates[date];
        if (!update) return;
        
        // Format date
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('it-IT', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Set content
        modalTitle.textContent = update.title || `Aggiornamento del ${formattedDate}`;
        modalBody.innerHTML = update.content;
        
        // Show modal
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus close button
        if (closeModalBtn) {
            closeModalBtn.focus();
        }
        
        // Add entry animation to content
        modalBody.style.opacity = '0';
        setTimeout(() => {
            modalBody.style.opacity = '1';
        }, 100);
    };
    
    // Event listeners
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeModal();
            }
        });
    }
    
    // Calendar day clicks (alternative method)
    const calendarGrid = document.getElementById('calendar-grid');
    if (calendarGrid) {
        calendarGrid.addEventListener('click', (e) => {
            const dayCell = e.target.closest('.calendar-day.has-update');
            if (dayCell) {
                const date = dayCell.dataset.date;
                if (date) {
                    window.openUpdateModal(date);
                }
            }
        });
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Log calendar initialization
    if (SITE_CONFIG.dev.showLogs) {
        console.log('Project page initialized with calendar');
    }
});