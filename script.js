// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================

(function() {
    'use strict';
    
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!navToggle || !mainNav) {
        console.warn('Navigation elements not found');
        return;
    }
    
    /**
     * Toggles the mobile navigation menu
     * Updates ARIA attributes for accessibility
     */
    function toggleNavigation() {
        const isOpen = mainNav.classList.contains('is-open');
        const newState = !isOpen;
        
        mainNav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', newState.toString());
        
        // Trap focus within nav when open, remove trap when closed
        if (newState) {
            trapFocus();
        } else {
            removeFocusTrap();
        }
    }
    
    /**
     * Manages focus within the navigation menu
     * Ensures keyboard users stay within the menu when open
     */
    let currentTabHandler = null;
    
    function trapFocus() {
        const focusableElements = mainNav.querySelectorAll(
            'a[href], button:not([disabled])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Remove previous handler if it exists
        if (currentTabHandler) {
            mainNav.removeEventListener('keydown', currentTabHandler);
        }
        
        currentTabHandler = function handleTabKey(e) {
            if (e.key !== 'Tab') return;
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };
        
        mainNav.addEventListener('keydown', currentTabHandler);
    }
    
    /**
     * Removes focus trap when navigation closes
     */
    function removeFocusTrap() {
        if (currentTabHandler) {
            mainNav.removeEventListener('keydown', currentTabHandler);
            currentTabHandler = null;
        }
    }
    
    /**
     * Closes navigation when clicking outside
     */
    function handleClickOutside(event) {
        if (!mainNav.contains(event.target) && 
            !navToggle.contains(event.target) && 
            mainNav.classList.contains('is-open')) {
            toggleNavigation();
        }
    }
    
    /**
     * Closes navigation on Escape key press
     */
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
            toggleNavigation();
            navToggle.focus();
        }
    }
    
    // Event Listeners
    navToggle.addEventListener('click', toggleNavigation);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Close nav when window is resized to desktop size
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('is-open')) {
                toggleNavigation();
            }
        }, 250);
    });
    
    console.log('Navigation initialized successfully');
})();

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

(function() {
    'use strict';
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash or just "#"
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Close mobile nav if open (reuse the toggle function to ensure cleanup)
                const mainNav = document.querySelector('.main-nav');
                const navToggle = document.querySelector('.nav-toggle');
                if (mainNav && mainNav.classList.contains('is-open') && navToggle) {
                    navToggle.click();
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus for accessibility
                target.focus({ preventScroll: true });
            }
        });
    });
})();

// ============================================
// ACCESSIBILITY: Skip to main content
// ============================================

(function() {
    'use strict';
    
    // Add skip link dynamically
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-accent);
        color: var(--color-bg-primary);
        padding: 8px 16px;
        text-decoration: none;
        z-index: 1000;
        transition: top var(--transition-fast);
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ID to main if not present
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
})();
