/* ====================================
   PREMIUM PHOTOGRAPHY PORTFOLIO
   ALEXANDER NOIR - MAIN.JS
   ==================================== */

// ====================================
// INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initLenisScroll();
    initNavigation();
    initCursor();
    initGSAPAnimations();
    initLightbox();
    initContactForm();
});

// ====================================
// PRELOADER
// ====================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            
            // Trigger hero animations after preloader
            if (document.querySelector('.hero')) {
                animateHero();
            }
        }, 1000);
    });
}

// ====================================
// LENIS SMOOTH SCROLL
// ====================================
function initLenisScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Store lenis instance globally
    window.lenis = lenis;
}

// ====================================
// NAVIGATION
// ====================================
function initNavigation() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ====================================
// CUSTOM CURSOR
// ====================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
    });

    // Smooth cursor follow
    function updateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .featured-item, [data-cursor]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            
            // Show custom cursor text if available
            const cursorText = el.getAttribute('data-cursor');
            if (cursorText) {
                cursor.innerHTML = `<div class="cursor-text">${cursorText}</div>`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.innerHTML = '<div class="cursor-dot"></div>';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
}

// ====================================
// HERO ANIMATIONS
// ====================================
function animateHero() {
    const titleLines = document.querySelectorAll('.title-line');
    const subtitle = document.querySelector('.hero-subtitle');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (titleLines.length > 0) {
        gsap.to(titleLines, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.3
        });
    }

    if (subtitle) {
        gsap.to(subtitle, {
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: 'power2.out'
        });
    }

    if (scrollIndicator) {
        gsap.to(scrollIndicator, {
            opacity: 1,
            duration: 1,
            delay: 1.5,
            ease: 'power2.out'
        });
    }

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        gsap.to(heroBg, {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }
}

// ====================================
// GSAP SCROLL ANIMATIONS
// ====================================
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Fade in sections
    const fadeElements = document.querySelectorAll('.featured-item, .gallery-item, .service-item, .client-name, .about-content, .contact-form-wrapper');
    
    fadeElements.forEach((el, index) => {
        gsap.from(el, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Page title animation
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const titleLines = pageTitle.querySelectorAll('.title-line');
        gsap.from(titleLines, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.5
        });
    }

    // Philosophy section animation
    const philosophyContent = document.querySelector('.philosophy-content');
    if (philosophyContent) {
        gsap.from(philosophyContent.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: philosophyContent,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }

    // About image parallax
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        gsap.to(aboutImage, {
            y: '15%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        gsap.from(stat, {
            textContent: 0,
            duration: 2,
            ease: 'power1.out',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            onUpdate: function() {
                stat.textContent = Math.ceil(this.targets()[0].textContent) + '+';
            }
        });
    });

    // Form inputs animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        gsap.from(group, {
            opacity: 0,
            x: -30,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: group,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ====================================
// LIGHTBOX
// ====================================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    
    if (!lightbox || galleryItems.length === 0) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxYear = lightbox.querySelector('.lightbox-year');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const currentIndexEl = lightbox.querySelector('.current-index');
    const totalImagesEl = lightbox.querySelector('.total-images');

    let currentIndex = 0;
    const images = [];

    // Collect all images data
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay ? overlay.querySelector('h3').textContent : '';
        const year = overlay ? overlay.querySelector('span').textContent : '';

        images.push({
            src: img.src,
            alt: img.alt,
            title: title,
            year: year
        });

        // Click handler
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    totalImagesEl.textContent = images.length;

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
        
        // Disable Lenis while lightbox is open
        if (window.lenis) {
            window.lenis.stop();
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.classList.remove('no-scroll');
        
        // Re-enable Lenis
        if (window.lenis) {
            window.lenis.start();
        }
    }

    function updateLightbox() {
        const imageData = images[currentIndex];
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
        lightboxYear.textContent = imageData.year;
        currentIndexEl.textContent = currentIndex + 1;

        // Fade in animation
        gsap.from(lightboxImage, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ====================================
// CONTACT FORM
// ====================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    const formMessage = form.querySelector('.form-message');

    // Input focus animations
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const label = formGroup.querySelector('.form-label');

        input.addEventListener('focus', () => {
            gsap.to(label, {
                color: '#ffffff',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(label, {
                    color: '#a0a0a0',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderBottomColor = '#f44336';
            } else {
                input.style.borderBottomColor = '';
            }
        });

        if (!isValid) {
            showMessage('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailInput = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showMessage('Please enter a valid email address', 'error');
            emailInput.style.borderBottomColor = '#f44336';
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.submit-button');
        const originalText = submitBtn.querySelector('.button-text').textContent;
        submitBtn.querySelector('.button-text').textContent = 'SENDING...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.querySelector('.button-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        
        gsap.from(formMessage, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Auto-hide after 5 seconds
        setTimeout(() => {
            gsap.to(formMessage, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    formMessage.style.display = 'none';
                }
            });
        }, 5000);
    }
}

// ====================================
// IMAGE LAZY LOADING
// ====================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ====================================
// PAGE TRANSITIONS
// ====================================
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]:not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's an anchor link or external
            if (href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) {
                return;
            }

            e.preventDefault();

            // Fade out animation
            gsap.to('body', {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    window.location.href = href;
                }
            });
        });
    });

    // Fade in on page load
    gsap.from('body', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2
    });
}

// Initialize page transitions
initPageTransitions();

// ====================================
// UTILITIES
// ====================================

// Smooth scroll to element
function scrollToElement(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element && window.lenis) {
        window.lenis.scrollTo(element, {
            offset: offset,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====================================
// PERFORMANCE OPTIMIZATION
// ====================================

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
    if (window.lenis) {
        window.lenis.options.duration = 0.1;
    }
}

// Log initialization complete
console.log('🎨 Portfolio initialized successfully');
