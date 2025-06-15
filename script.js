// Virginia Tech Architecture Portfolio - JavaScript Functionality

// Portfolio Application Class
class VTArchitecturePortfolio {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.slides = document.querySelectorAll('.slide');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.contactForm = document.querySelector('.form');
        
        this.init();
    }

    init() {
        this.setupLoading();
        this.setupNavigation();
        this.setupSlideshow();
        this.setupPortfolioFilter();
        this.setupStatsAnimation();
        this.setupScrollAnimations();
        this.setupContactForm();
        this.setupSmoothScrolling();
    }    // Loading Screen
    setupLoading() {
        // Hide loading screen after a short delay
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }

    // Navigation
    setupNavigation() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.hamburger.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    if (this.navMenu?.classList.contains('active')) {
                        this.navMenu.classList.remove('active');
                        this.hamburger.classList.remove('active');
                    }
                });
            });
        }
    }

    // Slideshow
    setupSlideshow() {
        if (this.slides.length > 0) {
            this.showSlide(0);
            this.startSlideshow();
        }
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    startSlideshow() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // Portfolio Filter
    setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter items
                this.filterPortfolioItems(portfolioItems, filterValue);
            });
        });
    }

    filterPortfolioItems(items, filter) {
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filter === 'all' || itemCategory === filter) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.add('hidden');
                item.classList.remove('visible');
            }
        });
    }

    // Stats Animation
    setupStatsAnimation() {
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const statNumbers = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    this.animateStats(statNumbers);
                    hasAnimated = true;
                }
            });
        });

        observer.observe(statsSection);
    }

    animateStats(statNumbers) {
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }, 40);
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.project-card, .timeline-item, .skill-item, .achievement-item'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Contact Form
    setupContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission();
            });
        }
    }    handleFormSubmission() {
        // Show success message
        this.showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.contactForm.reset();
    }

    showFormMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 10px;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animate in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 5000);
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Cursor Trail Effect for Desktop
class CursorTrail {
    constructor() {
        if (window.innerWidth > 768) {
            this.init();
        }
    }

    init() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-trail';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #861f41, #e87722);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(this.cursor);

        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            this.cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '0.7';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// Parallax Effect for Hero Section
class HeroParallax {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.heroSection) {
                this.heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Main portfolio functionality
    new VTArchitecturePortfolio();
    
    // Additional effects
    new CursorTrail();
    new NavbarScrollEffect();
    new HeroParallax();
    
    console.log('Virginia Tech Architecture Portfolio loaded successfully! 🎓');
});
