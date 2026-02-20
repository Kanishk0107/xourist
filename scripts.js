// ========================================
// Xourist Website JavaScript
// Vanilla JS for interactions and animations
// ========================================

// ========== HERO SLIDER LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('#hero-slider');
    const slides = sliderContainer ? sliderContainer.querySelectorAll('.hero-slide') : [];
    const dotsContainer = document.getElementById('hero-dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.hero-dot') : [];
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Function to change slide
        function goToSlide(index) {
            // Remove active from current
            slides[currentSlide].classList.remove('active');
            if (dots.length > 0) dots[currentSlide].classList.remove('active');

            // Update index
            currentSlide = (index + slides.length) % slides.length;

            // Add active to new
            slides[currentSlide].classList.add('active');
            if (dots.length > 0) dots[currentSlide].classList.add('active');
        }

        // Auto slide function
        function startSlideTimer() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 2500);
        }

        // Initialize
        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
        startSlideTimer();

        // Dot Navigation Click Events
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval); // Stop auto timer on interaction
                    goToSlide(index);
                    startSlideTimer(); // Restart timer
                });
            });
        }
    }
});

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


