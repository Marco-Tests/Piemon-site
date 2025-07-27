/**
 * Calendar Component
 * Handles calendar rendering and interactions
 */

class Calendar {
    constructor(config = {}) {
        // DOM Elements
        this.calendarGrid = document.getElementById('calendar-grid');
        this.monthYearHeader = document.getElementById('month-year-header');
        this.prevMonthBtn = document.getElementById('prev-month-btn');
        this.nextMonthBtn = document.getElementById('next-month-btn');
        
        // Configuration
        this.currentDate = new Date(); // Sempre il mese corrente!
        this.locale = config.locale || SITE_CONFIG.calendar.locale;
        this.firstDayOfWeek = config.firstDayOfWeek || SITE_CONFIG.calendar.firstDayOfWeek;
        this.updates = config.updates || SITE_CONFIG.updates;
        
        // State
        this.isTransitioning = false;
        
        // Initialize
        this.init();
    }
    
    /**
     * Initialize calendar
     */
    init() {
        if (!this.calendarGrid) {
            console.error('Calendar grid element not found');
            return;
        }
        
        // Bind events
        this.bindEvents();
        
        // Initial render
        this.render();
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Navigation buttons
        if (this.prevMonthBtn) {
            this.prevMonthBtn.addEventListener('click', () => this.navigateMonth(-1));
        }
        
        if (this.nextMonthBtn) {
            this.nextMonthBtn.addEventListener('click', () => this.navigateMonth(1));
        }
        
        // Calendar grid clicks (event delegation)
        if (this.calendarGrid) {
            this.calendarGrid.addEventListener('click', (e) => this.handleDayClick(e));
            
            // Hover effects for touch devices
            this.calendarGrid.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('has-update')) {
                    e.target.classList.add('hover');
                }
            });
            
            this.calendarGrid.addEventListener('touchend', (e) => {
                if (e.target.classList.contains('has-update')) {
                    e.target.classList.remove('hover');
                }
            });
        }
        
        // Keyboard navigation - simplified for month navigation
        document.addEventListener('keydown', (e) => {
            // Only work if no input is focused
            if (document.activeElement.tagName === 'INPUT' || 
                document.activeElement.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigateMonth(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigateMonth(1);
                    break;
                case 'Escape':
                    const modal = document.getElementById('update-modal');
                    if (modal && modal.classList.contains('is-visible')) {
                        const closeBtn = document.getElementById('close-modal-btn');
                        if (closeBtn) closeBtn.click();
                    }
                    break;
            }
        });
    }
    
    /**
     * Render the calendar
     */
    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update header
        this.updateHeader(year, month);
        
        // Clear grid with animation
        this.animateGridTransition(() => {
            this.calendarGrid.innerHTML = '';
            
            // Calculate calendar data
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();
            
            // Adjust for Monday as first day
            const dayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
            
            // Add previous month's trailing days
            for (let i = dayOffset - 1; i >= 0; i--) {
                const dayCell = this.createDayCell(daysInPrevMonth - i, false, year, month - 1);
                this.calendarGrid.appendChild(dayCell);
            }
            
            // Add current month's days
            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = this.createDayCell(day, true, year, month);
                this.calendarGrid.appendChild(dayCell);
            }
            
            // Add next month's leading days
            const totalCells = this.calendarGrid.children.length;
            const remainingCells = 42 - totalCells; // 6 weeks * 7 days
            
            for (let day = 1; day <= remainingCells; day++) {
                const dayCell = this.createDayCell(day, false, year, month + 1);
                this.calendarGrid.appendChild(dayCell);
            }
        });
    }
    
    /**
     * Create a day cell element
     */
    createDayCell(day, isCurrentMonth, year, month) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;
        dayCell.setAttribute('role', 'gridcell');
        dayCell.setAttribute('tabindex', '-1');
        
        if (!isCurrentMonth) {
            dayCell.classList.add('not-in-month');
        }
        
        // Check if today
        const today = new Date();
        const cellDate = new Date(year, month, day);
        
        if (this.isSameDay(cellDate, today)) {
            dayCell.classList.add('is-today');
            dayCell.setAttribute('aria-label', `Today, ${this.formatDate(cellDate)}`);
        }
        
        // Check for updates
        if (isCurrentMonth) {
            const dateString = this.formatDateString(year, month, day);
            if (this.updates[dateString]) {
                dayCell.classList.add('has-update');
                dayCell.dataset.date = dateString;
                dayCell.setAttribute('aria-label', `${this.formatDate(cellDate)}, has update`);
            }
        }
        
        return dayCell;
    }
    
    /**
     * Update month/year header
     */
    updateHeader(year, month) {
        if (!this.monthYearHeader) return;
        
        const date = new Date(year, month);
        const formatted = date.toLocaleString(this.locale, {
            month: 'long',
            year: 'numeric'
        });
        
        this.monthYearHeader.textContent = formatted;
        this.monthYearHeader.setAttribute('aria-live', 'polite');
        this.monthYearHeader.setAttribute('aria-atomic', 'true');
    }
    
    /**
     * Navigate to previous/next month
     */
    navigateMonth(direction) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        
        // Add transition class based on direction
        if (this.calendarGrid) {
            this.calendarGrid.classList.add(direction > 0 ? 'transitioning' : 'transitioning-reverse');
        }
        
        // Render after short delay
        setTimeout(() => {
            this.render();
            this.isTransitioning = false;
        }, 150);
    }
    
    /**
     * Handle day click
     */
    handleDayClick(e) {
        const dayCell = e.target.closest('.calendar-day');
        if (!dayCell || !dayCell.classList.contains('has-update')) return;
        
        const date = dayCell.dataset.date;
        if (date && this.updates[date]) {
            this.openUpdateModal(date);
        }
    }
    
    /**
     * Open update modal
     */
    openUpdateModal(date) {
        const modal = document.getElementById('update-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        if (!modal || !modalTitle || !modalBody) return;
        
        const update = this.updates[date];
        const formattedDate = this.formatDateLong(date);
        
        modalTitle.textContent = `Update: ${formattedDate}`;
        modalBody.innerHTML = update.content;
        
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus management
        const closeBtn = document.getElementById('close-modal-btn');
        if (closeBtn) {
            closeBtn.focus();
        }
        
        // Trap focus in modal
        this.trapFocus(modal);
    }
    
    /**
     * Animate grid transition
     */
    animateGridTransition(callback) {
        if (!this.calendarGrid) {
            callback();
            return;
        }
        
        // Remove transition classes
        this.calendarGrid.classList.remove('transitioning', 'transitioning-reverse');
        
        // Force reflow
        void this.calendarGrid.offsetWidth;
        
        // Execute callback
        callback();
    }
    
    /**
     * Utility: Format date string
     */
    formatDateString(year, month, day) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    
    /**
     * Utility: Format date for display
     */
    formatDate(date) {
        return date.toLocaleDateString(this.locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    
    /**
     * Utility: Format date long form
     */
    formatDateLong(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return this.formatDate(date);
    }
    
    /**
     * Utility: Check if same day
     */
    isSameDay(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }
    
    /**
     * Trap focus within element
     */
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }
}

// Export for use
window.Calendar = Calendar;