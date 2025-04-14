/**
 * Cyberpunk Ethical Hacking Portfolio Website
 * Main JavaScript functionality
 */

// Audio objects for sound effects
const clickSound = new Audio('sounds/click.mp3');
const hoverSound = new Audio('sounds/hover.mp3');

// Set volume for sounds
clickSound.volume = 0.3;
hoverSound.volume = 0.15;

// Preload sounds
clickSound.load();
hoverSound.load();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypewriter();
    initMobileMenu();
    initScrollEffects();
    initProjectFilters();
    initFormValidation();
    initGlitchEffects();
    initSoundEffects();
    updateYear();
});

/**
 * Terminal Typewriter Effect
 */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const phrases = [
        "Specializing in penetration testing and vulnerability assessment.",
        "Securing networks and applications from malicious actors.",
        "Identifying security gaps before they can be exploited.",
        "Providing comprehensive security solutions for organizations.",
        "Ethical hacking for a safer digital world."
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // If completed typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at the end
        } 
        // If completed deleting the phrase
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length; // Move to next phrase
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing effect
    setTimeout(type, 1000);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        // Toggle active class for navigation
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = menuToggle.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
        
        // Toggle menu button appearance
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
        
        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play();
    });
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Reset hamburger icon
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                bars.forEach(bar => bar.classList.remove('active'));
            }
        });
    });
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!header || !backToTopButton) return;
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        // Header style change on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Reveal elements on scroll
        revealElements();
    });
    
    // Back to top button click event
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Play click sound
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
}

/**
 * Reveal Elements on Scroll
 */
function revealElements() {
    const revealElements = document.querySelectorAll('.section-header, .skill-bar, .project-card, .timeline-item, .blog-card');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

/**
 * Project Filters
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Play click sound
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Simple validation
        let isValid = true;
        
        if (nameField.value.trim() === '') {
            showError(nameField, 'Name is required');
            isValid = false;
        } else {
            removeError(nameField);
        }
        
        if (emailField.value.trim() === '') {
            showError(emailField, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(emailField.value)) {
            showError(emailField, 'Please enter a valid email');
            isValid = false;
        } else {
            removeError(emailField);
        }
        
        if (subjectField.value.trim() === '') {
            showError(subjectField, 'Subject is required');
            isValid = false;
        } else {
            removeError(subjectField);
        }
        
        if (messageField.value.trim() === '') {
            showError(messageField, 'Message is required');
            isValid = false;
        } else {
            removeError(messageField);
        }
        
        // If form is valid, simulate form submission
        if (isValid) {
            // Play click sound
            clickSound.currentTime = 0;
            clickSound.play();
            
            // Show success message
            const formButton = contactForm.querySelector('button[type="submit"]');
            const originalText = formButton.textContent;
            
            formButton.disabled = true;
            formButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                
                contactForm.appendChild(successMessage);
                
                // Reset button
                formButton.disabled = false;
                formButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        }
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(field, message) {
        // Remove any existing error
        removeError(field);
        
        // Add error class
        field.classList.add('error');
        
        // Create error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        
        // Insert error message after field
        field.parentNode.insertBefore(errorMessage, field.nextSibling);
    }
    
    // Remove error message
    function removeError(field) {
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
}

/**
 * Glitch Effects
 */
function initGlitchEffects() {
    // Add glitch effect to elements with glitch-text class
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        // Set data-text attribute if not already set
        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
        
        // Random glitch effect
        setInterval(() => {
            // Only apply effect occasionally
            if (Math.random() > 0.95) {
                element.classList.add('active-glitch');
                
                setTimeout(() => {
                    element.classList.remove('active-glitch');
                }, 200);
            }
        }, 500);
    });
}

/**
 * Sound Effects
 */
function initSoundEffects() {
    // Add sound effects to buttons and interactive elements
    const buttons = document.querySelectorAll('.btn, .filter-btn, .project-link, .blog-link, .social-link, .nav-link');
    
    buttons.forEach(button => {
        // Add click sound
        button.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.play();
        });
        
        // Add hover sound
        button.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    
    // Add sound to form inputs
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
    
    // Add sound to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            clickSound.currentTime = 0;
            clickSound.play();
        });
        
        logo.addEventListener('mouseenter', function() {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    }
}

/**
 * Update Copyright Year
 */
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Add CSS class for scroll reveal animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .section-header, .skill-bar, .project-card, .timeline-item, .blog-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-header.revealed, .skill-bar.revealed, .project-card.revealed, .timeline-item.revealed, .blog-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-bar:nth-child(1) { transition-delay: 0.1s; }
        .skill-bar:nth-child(2) { transition-delay: 0.2s; }
        .skill-bar:nth-child(3) { transition-delay: 0.3s; }
        
        .project-card:nth-child(1) { transition-delay: 0.1s; }
        .project-card:nth-child(2) { transition-delay: 0.2s; }
        .project-card:nth-child(3) { transition-delay: 0.3s; }
        .project-card:nth-child(4) { transition-delay: 0.4s; }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        
        .blog-card:nth-child(1) { transition-delay: 0.1s; }
        .blog-card:nth-child(2) { transition-delay: 0.2s; }
        .blog-card:nth-child(3) { transition-delay: 0.3s; }
        
        .active-glitch {
            animation: intense-glitch 0.2s linear;
        }
        
        @keyframes intense-glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(-5px, -5px); }
            60% { transform: translate(5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0); }
        }
        
        .error {
            border-color: #ff3860 !important;
        }
        
        .error-message {
            color: #ff3860;
            font-size: 1.2rem;
            margin-top: 0.5rem;
        }
        
        .success-message {
            color: var(--color-accent);
            background-color: rgba(0, 255, 65, 0.1);
            border: 1px solid var(--color-accent);
            border-radius: var(--border-radius-sm);
            padding: 1rem;
            margin-top: 1rem;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial reveal check
    setTimeout(revealElements, 300);
});
