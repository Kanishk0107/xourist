// ========================================
// Xourist Website JavaScript
// Vanilla JS for interactions and animations
// ========================================

// ========== POPUP LEAD FORM ==========
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('popupClose');
    const form = document.getElementById('popupForm');

    if (overlay) {
        // Only show once per session
        if (!sessionStorage.getItem('popupShown')) {
            setTimeout(() => {
                overlay.classList.add('active');
            }, 900);
        }

        // Close on X button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                sessionStorage.setItem('popupShown', 'true');
            });
        }

        // Close on backdrop click (not on card)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                sessionStorage.setItem('popupShown', 'true');
            }
        });

        // Handle form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('popup-name').value.trim();
                const email = document.getElementById('popup-email').value.trim();
                const mobile = document.getElementById('popup-mobile').value.trim();
                // Store data (in a real app, send to server)
                console.log('Lead captured:', { name, email, mobile });
                // Show brief success then close
                const btn = form.querySelector('.popup-submit');
                btn.textContent = '✓ Thank You!';
                btn.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
                setTimeout(() => {
                    overlay.classList.remove('active');
                    sessionStorage.setItem('popupShown', 'true');
                }, 1500);
            });
        }
    }
});

// ========== CINEMATIC GALLERY SCROLL mapping ==========
document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.gallery-section');
    const stickyWrapper = document.getElementById('galleryStickyWrapper');
    const slider = document.getElementById('gallerySlider');

    if (!section || !slider || !stickyWrapper) return;

    let isMobile = window.innerWidth < 768;

    const calcHeight = () => {
        const sliderWidth = slider.offsetWidth;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // The vertical height of the section should be its content width 
        // minus the viewport width PLUS one full viewport height for pinning.
        // This ensures the user scrolls vertically the same distance 
        // the content moves horizontally.
        const totalHeight = sliderWidth - viewportWidth + viewportHeight;
        section.style.height = `${totalHeight}px`;
    };

    // Initialize height on load and resize
    window.addEventListener('load', calcHeight);
    window.addEventListener('resize', () => {
        isMobile = window.innerWidth < 768;
        calcHeight();
    });

    const updateGallery = () => {
        const sectionRect = section.getBoundingClientRect();
        const stickyRect = stickyWrapper.getBoundingClientRect();

        // Calculate how much we have scrolled into the section (0 to 1)
        const scrollStart = sectionRect.top;
        const totalScrollable = section.offsetHeight - window.innerHeight;

        if (scrollStart <= 0 && scrollStart >= -totalScrollable) {
            // We are inside the sticky range
            const percentage = Math.abs(scrollStart) / totalScrollable;
            const maxTranslate = slider.offsetWidth - window.innerWidth;
            const translate = percentage * maxTranslate;

            // GPU Accelerated translation
            slider.style.transform = `translate3d(-${translate}px, 0, 0)`;
        } else if (scrollStart > 0) {
            // Above section
            slider.style.transform = `translate3d(0, 0, 0)`;
        } else {
            // Below section
            const maxTranslate = slider.offsetWidth - window.innerWidth;
            slider.style.transform = `translate3d(-${maxTranslate}px, 0, 0)`;
        }

        requestAnimationFrame(updateGallery);
    };

    // Run the animation loop
    requestAnimationFrame(updateGallery);
});

// Gallery slider logic moved to CSS animation in styles.css (OBSELETE-REMOVED)





// ========== SMOOTH SCROLL NAVIGATION ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.getElementById('menuToggle');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');

            // Smooth scroll to target
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        // Toggle menu
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link, .btn-instagram');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========== PARALLAX EFFECT (LIGHT) ==========
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (hero && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.5;
    }
});

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Add fade-in effect
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.6s ease';

                // Load image
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }

                img.onload = () => {
                    img.style.opacity = '1';
                };

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
}



// ========== CONTACT FORM VALIDATION & SUBMISSION ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim(); // May be empty if not required in new design, but we kept it.

    // New fields
    const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
    const travelers = document.getElementById('travelers') ? document.getElementById('travelers').value : '';
    const date = document.getElementById('date') ? document.getElementById('date').value : '';

    // Basic validation
    if (!name || !email) {
        alert('Please fill in your name and email');
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', { name, email, phone, travelers, date, message });

    // Show success message if element exists
    if (formSuccess) {
        formSuccess.style.display = 'block';
        formSuccess.classList.add('show');

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
            formSuccess.style.display = 'none';
        }, 5000);
    } else {
        alert('Thank you! Your request has been sent.');
    }

    // Reset form
    contactForm.reset();
});

// ========== CONSOLIDATED SCROLL ANIMATIONS ==========
const observeElements = () => {
    const elements = document.querySelectorAll('.card, .journal-item, .village-img, .highlight-item, section, .trek-card, .spiritual-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

// ========== INSTAGRAM GRID INTERACTION ==========
// Add subtle hover effect enhancement
const instagramItems = document.querySelectorAll('.instagram-item');

instagramItems.forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(0.95)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ========== PERFORMANCE: DEBOUNCE SCROLL EVENTS ==========
// Optimize scroll performance with debounce
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to resize events if needed
const handleResize = debounce(() => {
    // Add any resize-specific logic here
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);



// ========== PRELOAD HERO IMAGE ==========
// Ensure hero image loads quickly
window.addEventListener('load', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '1';
    }
});


