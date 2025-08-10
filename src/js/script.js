// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const demoModal = document.getElementById('demoModal');
const donationModal = document.getElementById('donationModal');
const demoForm = document.getElementById('demoForm');
const announcementBanner = document.getElementById('announcementBanner');

// Configuration - Load from AppConfig when available
function getConfig() {
    if (typeof window !== 'undefined' && window.AppConfig) {
        return {
            // Announcement settings
            ANNOUNCEMENT_ENABLED: window.AppConfig.get('ANNOUNCEMENT_ENABLED', true),
            ANNOUNCEMENT_MESSAGE: window.AppConfig.get('ANNOUNCEMENT_MESSAGE', '🎉 New Feature: StackHealth now includes automated security scanning! Learn more →'),
            ANNOUNCEMENT_LINK: window.AppConfig.get('ANNOUNCEMENT_LINK', '#products'),
            ANNOUNCEMENT_DISMISSIBLE: window.AppConfig.get('ANNOUNCEMENT_DISMISSIBLE', true),
            ANNOUNCEMENT_AUTO_HIDE: window.AppConfig.get('ANNOUNCEMENT_AUTO_HIDE', false),
            
            // API endpoints
            DEMO_FORM_ENDPOINT: window.AppConfig.get('DEMO_FORM_ENDPOINT', '/api/demo-request'),
            ANALYTICS_ID: window.AppConfig.get('GOOGLE_ANALYTICS_ID', null),
            
            // Product URLs
            TESTFLUX_URL: window.AppConfig.get('TESTFLUX_URL', 'https://testflux.qavibeapp.com'),
            STACKHEALTH_URL: window.AppConfig.get('STACKHEALTH_URL', 'https://stackhealth.qavibeapp.com')
        };
    }
    
    // Fallback configuration if AppConfig is not available
    return {
        ANNOUNCEMENT_ENABLED: true,
        ANNOUNCEMENT_MESSAGE: "🎉 New Feature: StackHealth now includes automated security scanning! Learn more →",
        ANNOUNCEMENT_LINK: "#products",
        ANNOUNCEMENT_DISMISSIBLE: true,
        ANNOUNCEMENT_AUTO_HIDE: false,
        DEMO_FORM_ENDPOINT: '/api/demo-request',
        ANALYTICS_ID: null,
        TESTFLUX_URL: 'https://testflux.qavibeapp.com',
        STACKHEALTH_URL: 'https://stackhealth.qavibeapp.com'
    };
}

// Get configuration instance
const CONFIG = getConfig();

// Initialize announcement banner
function initAnnouncement() {
    if (!CONFIG.ANNOUNCEMENT_ENABLED || !CONFIG.ANNOUNCEMENT_MESSAGE) {
        return;
    }
    
    // Check if announcement was dismissed
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed && CONFIG.ANNOUNCEMENT_DISMISSIBLE) {
        return;
    }
    
    // Set announcement message
    const messageElement = document.getElementById('announcementMessage');
    if (messageElement) {
        messageElement.textContent = CONFIG.ANNOUNCEMENT_MESSAGE;
        
        // Add link if specified
        if (CONFIG.ANNOUNCEMENT_LINK) {
            messageElement.innerHTML = `<a href="${CONFIG.ANNOUNCEMENT_LINK}" style="color: inherit; text-decoration: underline;">${CONFIG.ANNOUNCEMENT_MESSAGE}</a>`;
        }
    }
    
    // Show announcement
    if (announcementBanner) {
        announcementBanner.style.display = 'block';
        document.body.classList.add('has-announcement');
        
        // Auto-hide if configured
        if (CONFIG.ANNOUNCEMENT_AUTO_HIDE && typeof CONFIG.ANNOUNCEMENT_AUTO_HIDE === 'number') {
            setTimeout(() => {
                closeAnnouncement();
            }, CONFIG.ANNOUNCEMENT_AUTO_HIDE * 1000);
        }
    }
}

// Close announcement
function closeAnnouncement() {
    if (announcementBanner) {
        announcementBanner.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            announcementBanner.style.display = 'none';
            document.body.classList.remove('has-announcement');
        }, 300);
        
        // Remember dismissal
        if (CONFIG.ANNOUNCEMENT_DISMISSIBLE) {
            localStorage.setItem('announcement-dismissed', 'true');
        }
    }
}

// Navigation functionality
hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Handle dropdown toggle on mobile
        if (window.innerWidth <= 768 && link.classList.contains('dropdown-trigger')) {
            e.preventDefault();
            const dropdown = link.closest('.nav-dropdown');
            dropdown.classList.toggle('mobile-expanded');
            return;
        }
        
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Product launch function
function launchProduct(productType) {
    const CONFIG = getConfig();
    let productUrl = '';
    let productName = '';
    
    if (productType === 'testflux') {
        productUrl = CONFIG.TESTFLUX_URL;
        productName = 'TestFlux';
    } else if (productType === 'stackhealth') {
        productUrl = CONFIG.STACKHEALTH_URL;
        productName = 'StackHealth';
    }
    
    if (productUrl) {
        // Track product launch from dropdown
        trackEvent('product_launch', 'navigation_dropdown', productName.toLowerCase());
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Launch product
        if (productUrl.includes('qavibeapp.com')) {
            window.open(productUrl, '_blank');
        } else {
            // Development placeholder
            showNotification(`${productName} would launch at ${productUrl}`, 'info');
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('mobile-expanded');
        }
    });
    
    // Existing modal close logic
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Handle touch events for better mobile interaction
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe up to close announcement (if near top of page)
    if (swipeDistance > swipeThreshold && window.scrollY < 100 && announcementBanner && announcementBanner.style.display !== 'none') {
        closeAnnouncement();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to products function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const offsetTop = productsSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal functions
function openDemoModal(productType = 'both') {
    if (demoModal) {
        demoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set product selection based on parameter
        const productSelect = document.getElementById('product');
        if (productSelect && productType !== 'both') {
            productSelect.value = productType;
        }
    }
}

function closeDemoModal() {
    if (demoModal) {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset form
        if (demoForm) {
            demoForm.reset();
        }
    }
}

function openDonationModal() {
    if (donationModal) {
        donationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeDonationModal() {
    if (donationModal) {
        donationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        closeDemoModal();
    }
    if (e.target === donationModal) {
        closeDonationModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDemoModal();
        closeDonationModal();
    }
});

// Demo form submission
if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            company: formData.get('company') || document.getElementById('company').value,
            product: formData.get('product') || document.getElementById('product').value,
            message: formData.get('message') || document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Scheduling...';
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual implementation)
        setTimeout(() => {
            alert('Thank you! We\'ll contact you within 24 hours to schedule your demo.');
            closeDemoModal();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log form data for now (replace with actual API call)
            console.log('Demo request submitted:', data);
        }, 2000);
    });
}

// Donation function
function donate(amount) {
    // In a real implementation, this would integrate with a payment processor
    // like Stripe, PayPal, or similar
    alert(`Thank you for your interest in donating $${amount}! This would redirect to a secure payment processor.`);
    
    // Example implementation:
    // window.open(`https://your-payment-processor.com/donate?amount=${amount}`, '_blank');
    
    closeDonationModal();
}

// Enhanced scroll behavior with mobile optimization
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
        // Adjust navbar position based on announcement
        const hasAnnouncement = document.body.classList.contains('has-announcement');
        const announcementOffset = hasAnnouncement ? 50 : 0;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - hide navbar
            navbar.style.transform = `translateY(-${70 + announcementOffset}px)`;
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = hasAnnouncement ? 'translateY(50px)' : 'translateY(0)';
        }
        
        // Add background when scrolled
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

// Optimized scroll handler
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Enhanced modal functions with mobile optimization
function openDemoModal(productType = 'both') {
    if (demoModal) {
        demoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Set product selection based on parameter
        const productSelect = document.getElementById('product');
        if (productSelect && productType !== 'both') {
            productSelect.value = productType;
        }
        
        // Focus on first input for better accessibility
        setTimeout(() => {
            const firstInput = demoModal.querySelector('input');
            if (firstInput && window.innerWidth > 768) {
                firstInput.focus();
            }
        }, 100);
        
        // Track modal open event
        trackEvent('modal_open', 'engagement', 'demo_request');
    }
}

function closeDemoModal() {
    if (demoModal) {
        demoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset form
        if (demoForm) {
            demoForm.reset();
        }
        
        // Track modal close event
        trackEvent('modal_close', 'engagement', 'demo_request');
    }
}

function openDonationModal() {
    if (donationModal) {
        donationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Track modal open event
        trackEvent('modal_open', 'engagement', 'donation');
    }
}

function closeDonationModal() {
    if (donationModal) {
        donationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Track modal close event
        trackEvent('modal_close', 'engagement', 'donation');
    }
}

// Enhanced modal event handlers
window.addEventListener('click', (e) => {
    if (e.target === demoModal) {
        closeDemoModal();
    }
    if (e.target === donationModal) {
        closeDonationModal();
    }
});

// Keyboard event handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDemoModal();
        closeDonationModal();
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        // Close mobile dropdown
        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('mobile-expanded');
        });
    }
    
    // Handle dropdown keyboard navigation
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeDropdown = document.querySelector('.nav-dropdown:hover');
        if (activeDropdown) {
            e.preventDefault();
            const items = activeDropdown.querySelectorAll('.dropdown-item');
            const currentIndex = Array.from(items).findIndex(item => item.matches(':focus'));
            
            if (e.key === 'ArrowDown') {
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items[nextIndex].focus();
            } else {
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items[prevIndex].focus();
            }
        }
    }
    
    // Handle Enter key on dropdown items
    if (e.key === 'Enter') {
        const focusedItem = document.querySelector('.dropdown-item:focus');
        if (focusedItem) {
            focusedItem.click();
        }
    }
});

// Enhanced form submission with loading states and validation
if (demoForm) {
    demoForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(this)) {
            return false;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name') || document.getElementById('name').value,
            email: formData.get('email') || document.getElementById('email').value,
            company: formData.get('company') || document.getElementById('company').value,
            product: formData.get('product') || document.getElementById('product').value,
            message: formData.get('message') || document.getElementById('message').value,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
        submitBtn.disabled = true;
        
        try {
            // In production, replace with actual API call
            const response = await submitDemoRequest(data);
            
            if (response.success) {
                showSuccessMessage('Thank you! We\'ll contact you within 24 hours to schedule your demo.');
                trackEvent('demo_request_success', 'conversion', data.product);
                closeDemoModal();
            } else {
                throw new Error(response.message || 'Failed to submit request');
            }
        } catch (error) {
            console.error('Demo request failed:', error);
            showErrorMessage('Sorry, there was an error submitting your request. Please try again.');
            trackEvent('demo_request_error', 'error', error.message);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Mock API function - replace with actual implementation
async function submitDemoRequest(data) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Demo request submitted:', data);
            resolve({ success: true });
        }, 2000);
    });
}

// Success/Error message functions
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                z-index: 1002;
                animation: slideInRight 0.3s ease;
            }
            
            .notification-content {
                background: white;
                border-radius: 0.5rem;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-left: 4px solid;
            }
            
            .notification-success .notification-content {
                border-left-color: #22c55e;
                color: #15803d;
            }
            
            .notification-error .notification-content {
                border-left-color: #ef4444;
                color: #dc2626;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.7;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Enhanced donation function with better mobile support
function donate(amount) {
    // Track donation click
    trackEvent('donation_click', 'engagement', amount.toString());
    
    // In production, integrate with payment processor
    const paymentUrl = `https://your-payment-processor.com/donate?amount=${amount}&product=qavibeapp`;
    
    if (window.innerWidth <= 768) {
        // On mobile, show confirmation before redirecting
        if (confirm(`You're about to donate $${amount}. This will open a secure payment page. Continue?`)) {
            window.open(paymentUrl, '_blank');
        }
    } else {
        // On desktop, show more detailed confirmation
        showNotification(`Thank you for your interest in donating $${amount}! This would redirect to a secure payment processor.`, 'success');
        // window.open(paymentUrl, '_blank');
    }
    
    closeDonationModal();
}

// Intersection Observer for animations with mobile optimization
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1 // Lower threshold for mobile
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.benefit-card',
        '.product-card',
        '.support-card',
        '.impact-card',
        '.company-logo'
    ].join(', '));
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced dashboard preview animation
function animateDashboard() {
    const bars = document.querySelectorAll('.bar');
    if (bars.length === 0) return;
    
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.setProperty('--target-height', height);
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.animation = 'barGrow 0.8s ease forwards';
        }, index * 200);
    });
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    
    if (!name || !name.value.trim()) {
        showFieldError(name, 'Please enter your name.');
        name.focus();
        return false;
    }
    
    if (!email || !email.value.trim()) {
        showFieldError(email, 'Please enter your email.');
        email.focus();
        return false;
    }
    
    if (!validateEmail(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email address.');
        email.focus();
        return false;
    }
    
    return true;
}

// Enhanced scroll to section function
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const announcementHeight = document.body.classList.contains('has-announcement') ? 50 : 0;
        const offsetTop = productsSection.offsetTop - navbarHeight - announcementHeight - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        trackEvent('scroll_to_section', 'navigation', 'products');
    }
}

// Enhanced smooth scrolling for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const announcementHeight = document.body.classList.contains('has-announcement') ? 50 : 0;
            const offsetTop = target.offsetTop - navbarHeight - announcementHeight - 20;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Product launch handlers with environment config
document.addEventListener('click', (e) => {
    // Debug logging (remove in production)
    if (e.target.textContent && e.target.textContent.includes('Demo')) {
        console.log('Clicked element with Demo text:', e.target, e.target.tagName, e.target.className);
    }
    
    // Only handle specific button clicks
    if (e.target.classList.contains('btn-product-primary')) {
        e.preventDefault();
        
        let productUrl = '';
        let productName = '';
        
        if (e.target.textContent.includes('TestFlux')) {
            productUrl = CONFIG.TESTFLUX_URL;
            productName = 'TestFlux';
        } else if (e.target.textContent.includes('StackHealth')) {
            productUrl = CONFIG.STACKHEALTH_URL;
            productName = 'StackHealth';
        }
        
        if (productUrl) {
            // Track product launch
            trackEvent('product_launch', 'products', productName.toLowerCase());
            
            // Open product (replace with actual URLs when available)
            if (productUrl.includes('qavibeapp.com')) {
                window.open(productUrl, '_blank');
            } else {
                // Development placeholder
                showNotification(`${productName} would launch at ${productUrl}`, 'info');
            }
        }
        return; // Exit early to prevent other handlers
    }
    
    // Demo button handlers - only for actual demo buttons
    if (e.target.tagName === 'BUTTON' && 
        e.target.classList.contains('demo-btn')) {
        e.preventDefault();
        console.log('Opening demo modal from demo-btn');
        openDemoModal();
        return; // Exit early
    }
    
    // Hero demo button specifically
    if (e.target.tagName === 'BUTTON' && 
        e.target.classList.contains('btn-primary') && 
        e.target.closest('.hero-actions')) {
        e.preventDefault();
        console.log('Opening demo modal from hero button');
        openDemoModal();
        return; // Exit early
    }
});

// Analytics tracking with enhanced mobile support
function trackEvent(action, category, label, value) {
    const eventData = {
        action,
        category,
        label,
        value,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        isMobile: window.innerWidth <= 768
    };
    
    // Console log for development
    console.log('Analytics Event:', eventData);
    
    // Google Analytics 4 (replace with your measurement ID)
    if (typeof gtag !== 'undefined' && CONFIG.ANALYTICS_ID) {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
            custom_map: {
                viewport: 'custom_viewport',
                is_mobile: 'custom_is_mobile'
            }
        });
    }
    
    // Alternative analytics services can be added here
}

// Performance optimization: Lazy load images with mobile optimization
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: window.innerWidth <= 768 ? '50px' : '100px' // Smaller margin on mobile
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Add necessary CSS animations and mobile styles
const additionalStyles = document.createElement('style');
additionalStyles.id = 'mobile-enhancements';
additionalStyles.textContent = `
    /* Animation keyframes */
    @keyframes slideUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    @keyframes barGrow {
        from {
            height: 0%;
        }
        to {
            height: var(--target-height);
        }
    }
    
    /* Enhanced navbar styles */
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Enhanced hamburger animation */
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Mobile touch feedback */
    .btn-primary:active,
    .btn-secondary:active,
    .demo-btn:active,
    .btn-product-primary:active,
    .btn-product-secondary:active {
        transform: scale(0.98);
    }
    
    /* Enhanced mobile menu */
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
            animation: slideDown 0.3s ease;
        }
        
        /* Prevent content jump on mobile menu open */
        body.menu-open {
            position: fixed;
            width: 100%;
        }
        
        /* Better touch targets */
        .nav-link,
        .btn-primary,
        .btn-secondary,
        .demo-btn,
        .announcement-close {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Optimized form inputs for mobile */
        input[type="text"],
        input[type="email"],
        select,
        textarea {
            font-size: 16px; /* Prevent zoom on iOS */
            -webkit-appearance: none;
            appearance: none;
        }
        
        /* Better modal sizing on mobile */
        .modal-content {
            max-height: 90vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
    }
    
    /* Very small screens */
    @media (max-width: 320px) {
        .hero-content h1 {
            font-size: 1.75rem;
        }
        
        .btn-primary,
        .btn-secondary {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
        }
        
        .announcement-text {
            font-size: 0.75rem;
        }
    }
`;
document.head.appendChild(additionalStyles);

// Service Worker registration with enhanced error handling
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, refresh page
                                if (confirm('New content is available! Would you like to refresh?')) {
                                    window.location.reload();
                                }
                            }
                        });
                    });
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Core initializations
    initAnnouncement();
    initAnimations();
    initMobileEnhancements();
    initFormEnhancements();
    initLazyLoading();
    
    // Register service worker
    registerServiceWorker();
    
    // Start dashboard animation after a delay
    setTimeout(() => {
        animateDashboard();
    }, 1000);
    
    // Track page load with device info
    trackEvent('page_load', 'engagement', 'homepage');
});

// Handle orientation changes on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        // Recalculate layouts after orientation change
        window.dispatchEvent(new Event('resize'));
    }, 100);
});

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update mobile-specific behaviors
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('is-mobile', isMobile);
        
        // Close mobile menu if switching to desktop
        if (!isMobile && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }, 250);
});

// Export functions for global access
window.QAVibeApp = {
    openDemoModal,
    closeDemoModal,
    openDonationModal,
    closeDonationModal,
    closeAnnouncement,
    donate,
    scrollToProducts,
    trackEvent,
    launchProduct
};

// Mobile-specific enhancements
function initMobileEnhancements() {
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768 && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
                // Temporarily increase font size to prevent zoom
                input.style.fontSize = '16px';
            }
        });
        
        input.addEventListener('blur', () => {
            if (window.innerWidth <= 768) {
                input.style.fontSize = '';
            }
        });
    });
    
    // Enhanced touch handling for buttons
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = '';
        });
    });
    
    // Optimize scroll performance on mobile
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Additional mobile scroll optimizations can go here
        }, 100);
    });
}

// Form enhancements
function initFormEnhancements() {
    // Add real-time validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#ef4444';
                showFieldError(input, 'Please enter a valid email address');
            } else {
                input.style.borderColor = '';
                hideFieldError(input);
            }
        });
    });
    
    // Add character counter for textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500;
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #64748b; margin-top: 0.25rem;';
        
        textarea.parentNode.appendChild(counter);
        
        textarea.addEventListener('input', () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            counter.style.color = remaining < 50 ? '#ef4444' : '#64748b';
        });
        
        // Initialize counter
        textarea.dispatchEvent(new Event('input'));
    });
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.style.cssText = 'color: #ef4444; font-size: 0.8rem; margin-top: 0.25rem;';
    error.textContent = message;
    
    field.parentNode.appendChild(error);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}
