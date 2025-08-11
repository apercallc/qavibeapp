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
                    <a href="./index.html#support" class="nav-link">Support</a>
                    <a href="./docs-portal.html" class="nav-link">Documentation</a>
                    <div class="nav-dropdown">
                        <a href="#" class="nav-link dropdown-trigger">
                            Quick Access
                            <i class="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <div class="dropdown-content">
                            <div class="dropdown-item" tabindex="0" onclick="window.open('http://localhost:3003/docs/testflux/intro', '_blank')">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>TestFlux Docs</h4>
                                    <p>Complete TestFlux documentation</p>
                                </div>
                                <div class="dropdown-item-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </div>
                            <div class="dropdown-item" tabindex="0" onclick="window.open('http://localhost:3003/docs/stackhealth/intro', '_blank')">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>StackHealth Docs</h4>
                                    <p>Complete StackHealth documentation</p>
                                </div>
                                <div class="dropdown-item-action">
                                    <i class="fas fa-external-link-alt"></i>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" tabindex="0" onclick="window.location.href='./changelog.html'">
                                <div class="dropdown-item-icon">
                                    <i class="fas fa-list"></i>
                                </div>
                                <div class="dropdown-item-content">
                                    <h4>Changelog</h4>
                                    <p>Latest updates and changes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="./blog.html" class="nav-link">Blog</a>
                    <button class="demo-btn" onclick="openDemoModal()">Get a Demo</button>
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

        // Handle support link specifically
        const supportLink = document.querySelector('.nav-link[href*="#support"]');
        if (supportLink) {
            supportLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSupportLink();
            });
        }

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

    // Handle support link to scroll to support section on index page
    handleSupportLink() {
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            // We're on index page, scroll to support section
            const supportSection = document.getElementById('support');
            if (supportSection) {
                supportSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
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
            new NavigationComponent();
            console.log('Navigation component initialized successfully');
        } catch (error) {
            console.error('Error initializing navigation:', error);
        }
    }
});
