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
    ScrollIndicator.init();
    IconAnimations.init();
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
                    const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar

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
        scrollToTopBtn.className = 'btn btn-primary scroll-to-top-btn';
        scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
        scrollToTopBtn.id = 'scrollToTopBtn';

        document.body.appendChild(scrollToTopBtn);

        let isVisible = false;

        // Show/hide scroll to top button with better logic
        const toggleButton = () => {
            const shouldShow = window.scrollY > 300;

            if (shouldShow && !isVisible) {
                scrollToTopBtn.classList.add('visible');
                isVisible = true;
            } else if (!shouldShow && isVisible) {
                scrollToTopBtn.classList.remove('visible');
                isVisible = false;
            }
        };

        // Use throttled scroll for better performance
        window.addEventListener('scroll', Utils.throttle(toggleButton, 100));

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initialize button state
        toggleButton();
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
 * Scroll Indicator Component
 * Handles the scroll indicator animation in hero section
 */
const ScrollIndicator = {
    init() {
        this.setupScrollIndicator();
    },

    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (scrollIndicator) {
            // Add click event to scroll to next section
            scrollIndicator.addEventListener('click', function() {
                const nextSection = document.querySelector('.hero-section').nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });

            // Hide/show scroll indicator based on scroll position
            window.addEventListener('scroll', Utils.throttle(() => {
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                    const scrolled = window.pageYOffset;

                    if (scrolled > heroBottom - 200) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.pointerEvents = 'none';
                    } else {
                        scrollIndicator.style.opacity = '0.8';
                        scrollIndicator.style.pointerEvents = 'auto';
                    }
                }
            }, 100));
        }
    }
};

/**
 * Icon Animations Component
 * Enhanced animations for icons with theme-based effects
 */
const IconAnimations = {
    init() {
        this.setupServiceCardIcons();
        this.setupHeroIcons();
        this.setupButtonIcons();
        this.setupCheckIcons();
    },

    setupServiceCardIcons() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon i');
            if (icon) {
                card.addEventListener('mouseenter', function() {
                    icon.style.animationDuration = '0.5s';
                });

                card.addEventListener('mouseleave', function() {
                    icon.style.animationDuration = '';
                });
            }
        });
    },

    setupHeroIcons() {
        const heroIcons = document.querySelectorAll('.hero-section h1 i');
        heroIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });

            icon.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = '';
            });
        });
    },

    setupButtonIcons() {
        const buttonsWithIcons = document.querySelectorAll('.btn i');
        buttonsWithIcons.forEach(icon => {
            icon.parentElement.addEventListener('click', function() {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 600);
            });
        });
    },

    setupCheckIcons() {
        const checkIcons = document.querySelectorAll('.bi-check-circle-fill');
        checkIcons.forEach(icon => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            icon.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                icon.style.transform = 'scale(1)';
                            }, 200);
                        }, Math.random() * 500);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(icon);
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
        ScrollIndicator,
        IconAnimations,
        FormUtils,
        Utils
    };
}

// Add CSS for scroll-to-top button and animations
const additionalStyles = `
    .scroll-to-top-btn {
        position: fixed !important;
        bottom: 2rem;
        right: 2rem;
        z-index: 1070 !important;
        width: 60px;
        height: 60px;
        border-radius: 50% !important;
        border: 2px solid var(--color-primary) !important;
        background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)) !important;
        color: var(--color-white) !important;
        display: flex !important;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 8px 25px rgba(46, 117, 182, 0.4);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: pointer;
        font-weight: bold;
    }

    .scroll-to-top-btn:hover {
        background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary)) !important;
        color: var(--color-white) !important;
        transform: translateY(-4px) scale(1.1);
        box-shadow: 0 12px 35px rgba(46, 117, 182, 0.6);
        border-color: var(--color-primary-dark) !important;
    }

    .scroll-to-top-btn:focus {
        outline: 3px solid var(--color-accent-light);
        outline-offset: 3px;
        box-shadow: 0 0 0 3px rgba(244, 197, 66, 0.3);
    }

    .scroll-to-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0) scale(1);
    }

    .scroll-to-top-btn i {
        transition: transform 0.3s ease;
    }

    .scroll-to-top-btn:hover i {
        transform: translateY(-2px);
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

    /* Media queries pour le bouton responsive */
    @media (max-width: 768px) {
        .scroll-to-top-btn {
            width: 50px;
            height: 50px;
            bottom: 1.5rem;
            right: 1.5rem;
            font-size: 1rem;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);