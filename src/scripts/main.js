/**
 * Main JavaScript Entry Point
 * Les Enfants des Mousquetaires Website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('LEDM Website Initialized');

    // Initialize all components
    Navigation.init();
    ScrollEffects.init();
    AnimationObserver.init();
});

/**
 * Navigation Component
 * Handles responsive navigation, dropdown menus, and scroll effects
 */
const Navigation = {
    init() {
        this.handleScrollEffects();
        this.handleMobileMenu();
        this.handleDropdowns();
        this.handleActiveStates();
    },

    handleScrollEffects() {
        const navbar = document.querySelector('.custom-navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add scrolled class for styling
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = currentScrollY;
        });
    },

    handleMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        const dropdownItems = document.querySelectorAll('.dropdown-item');

        // Close mobile menu when clicking on nav links (excluding dropdown toggles)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        hide: true
                    });
                }
            });
        });

        // Close mobile menu when clicking on dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        hide: true
                    });
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 992 &&
                !navbarToggler.contains(e.target) &&
                !navbarCollapse.contains(e.target) &&
                navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    hide: true
                });
            }
        });
    },

    handleDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

        dropdownToggles.forEach(toggle => {
            // Add keyboard navigation support
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle.click();
                }
            });
        });
    },

    handleActiveStates() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;

            // Remove active class from all links
            link.classList.remove('active');

            // Add active class to current page link
            if (linkPath === currentPath ||
                (currentPath === '/' && linkPath.includes('index.html')) ||
                (currentPath.includes(linkPath.split('/').pop()) && linkPath !== '/')) {
                link.classList.add('active');
            }
        });
    }
};

/**
 * Scroll Effects Component
 * Handles smooth scrolling and scroll-based animations
 */
const ScrollEffects = {
    init() {
        this.handleSmoothScrolling();
        this.handleScrollToTop();
    },

    handleSmoothScrolling() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    handleScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollToTopBtn.className = 'btn btn-primary scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
        scrollToTopBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: none;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        document.body.appendChild(scrollToTopBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
                scrollToTopBtn.style.alignItems = 'center';
                scrollToTopBtn.style.justifyContent = 'center';
                setTimeout(() => {
                    scrollToTopBtn.style.opacity = '1';
                }, 10);
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};

/**
 * Animation Observer Component
 * Handles scroll-based animations using Intersection Observer
 */
const AnimationObserver = {
    init() {
        this.setupIntersectionObserver();
        this.setupCardAnimations();
    },

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe service cards for staggered animation
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
            observer.observe(card);
        });
    },

    setupCardAnimations() {
        // Add hover effects to cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
};

/**
 * Form Utilities
 * Utilities for form handling and validation
 */
const FormUtils = {
    // Email validation
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Phone validation (French format)
    validatePhone(phone) {
        const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Generic form validation
    validateForm(form) {
        const errors = [];
        const formData = new FormData(form);

        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                errors.push(`Le champ "${field.name}" est requis.`);
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !this.validateEmail(field.value)) {
                errors.push('Format d\'email invalide.');
                field.classList.add('is-invalid');
            }
        });

        // Validate phone fields
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !this.validatePhone(field.value)) {
                errors.push('Format de téléphone invalide.');
                field.classList.add('is-invalid');
            }
        });

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    // Show form feedback
    showFeedback(form, message, isSuccess = true) {
        let feedback = form.querySelector('.form-feedback');

        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback mt-3';
            form.appendChild(feedback);
        }

        feedback.className = `form-feedback mt-3 alert ${isSuccess ? 'alert-success' : 'alert-danger'}`;
        feedback.textContent = message;
        feedback.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }
};

/**
 * Utility Functions
 */
const Utils = {
    // Debounce function
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get responsive breakpoint
    getBreakpoint() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    },

    // Format phone number for display
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
        if (match) {
            return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
        }
        return phone;
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollEffects,
        AnimationObserver,
        FormUtils,
        Utils
    };
}

// Add CSS for scroll-to-top button and animations
const additionalStyles = `
    .scroll-to-top {
        animation: fadeInUp 0.3s ease;
    }

    .scroll-to-top:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .form-feedback {
        display: none;
        padding: 0.75rem 1rem;
        margin-bottom: 0;
        border-radius: 0.375rem;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);