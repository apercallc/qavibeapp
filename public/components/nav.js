// Centralized Navigation Component
class NavigationComponent {
    constructor() {
        this.init();
    }

    init() {
        this.createNavigation();
        this.bindEvents();
    }

    createNavigation() {
        // Check if navigation already exists to avoid duplicates
        const existingNav = document.querySelector('.navbar');
        if (existingNav) {
            console.log('Navigation already exists, skipping creation');
            return;
        }

        const nav = document.createElement('nav');
        nav.className = 'navbar';
        nav.innerHTML = this.getNavigationHTML();
        
        // Insert at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);
    }

    getNavigationHTML() {
        return `
            <div class="nav-container">
                <div class="nav-brand">
                    <a href="./index.html" style="text-decoration: none; color: inherit;">
                        <h2>QAVibe</h2>
                    </a>
                </div>
                <div class="nav-menu" id="nav-menu">
                    <a href="./index.html" class="nav-link">Home</a>
                    <div class="nav-dropdown">
                        <a href="./index.html#products" class="nav-link dropdown-trigger">
                            Products
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <div class="dropdown-content">
                            <div class="dropdown-item" tabindex="0" onclick="window.open('https://testflux.qavibeapp.com', '_blank')">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-tachometer-alt"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>TestFlux</h4>
                                    <p>Test Results Dashboard</p>
                                </div>
                                <div class="dropdown-item-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </div>
                            <div class="dropdown-item" tabindex="0" onclick="window.open('https://stackhealth.qavibeapp.com', '_blank')">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-chart-bar"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>StackHealth</h4>
                                    <p>Scorecard Platform</p>
                                </div>
                                <div class="dropdown-item-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" tabindex="0" onclick="window.location.href='./index.html#products'">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-info-circle"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>Learn More</h4>
                                    <p>View detailed information</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="nav-link" onclick="navigationComponent.handleSupportLink(); return false;">Support</a>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-trigger">
                            Quick Access
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <div class="dropdown-content">
                            <div class="dropdown-item" tabindex="0" onclick="window.location.href='./blog.html'">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-blog"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>Blog</h4>
                                    <p>Latest insights and updates</p>
                                </div>
                            </div>
                            <div class="dropdown-item" tabindex="0" onclick="window.location.href='./changelog.html'">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-list"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>Changelog</h4>
                                    <p>Latest updates and changes</p>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" tabindex="0" onclick="window.location.href='./security.html'">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-shield-alt"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>Security</h4>
                                    <p>Security practices and policies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });

        // Handle support link specifically - removed since we now use direct support.html

        // Set active nav link based on current page
        this.setActiveNavLink();
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href) {
                // Check if it's the current page
                if (currentPath.endsWith(href.replace('./', '')) || 
                    (href === './index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
                    (href.includes('#') && currentHash === href.split('#')[1])) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Handle support link to scroll to support section on current page or redirect to index
    handleSupportLink() {
        // First check if there's a support section on the current page
        const supportSection = document.getElementById('support');
        
        if (supportSection) {
            // We have a support section on current page, scroll to it
            supportSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            // We're on index page but no support section found
            console.warn('Support section not found on index page');
        } else {
            // We're on another page, redirect to index with support hash
            window.location.href = './index.html#support';
        }
    }

    openDemoModal() {
        // This function should be available globally or imported
        if (typeof openDemoModal === 'function') {
            openDemoModal();
        } else {
            console.warn('openDemoModal function not found');
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if navigation doesn't already exist
    if (!document.querySelector('.navbar')) {
        try {
            window.navigationComponent = new NavigationComponent();
            console.log('Navigation component initialized successfully');
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }
});
