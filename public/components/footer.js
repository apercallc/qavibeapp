// Centralized Footer Component
class FooterComponent {
    constructor() {
        this.init();
    }

    init() {
        this.createFooter();
    }

    createFooter() {
        // Check if footer already exists to avoid duplicates
        const existingFooter = document.querySelector('.footer');
        if (existingFooter) {
            console.log('Footer already exists, skipping creation');
            return;
        }

        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = this.getFooterHTML();
        
        // Append to the end of body
        document.body.appendChild(footer);
    }

    getFooterHTML() {
        return `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>QAVibe</h3>
                        <p>Free enterprise testing tools for modern development teams.</p>
                        <div class="social-links">
                            <a href="https://thoangdev.github.io/" target="_blank" class="social-link" rel="noopener noreferrer">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/tommyqhoang/" target="_blank" class="social-link" rel="noopener noreferrer">
                                <i class="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="./blog.html">Blog</a></li>
                            <li><a href="./changelog.html">Changelog</a></li>
                            <li><a href="./index.html#support">Support</a></li>
                            <li><a href="#" onclick="openDemoModal(); return false;">Get Demo</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="./privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="./terms-of-service.html">Terms of Service</a></li>
                            <li><a href="./acceptable-use.html">Acceptable Use</a></li>
                            <li><a href="./legal-center.html">Legal Center</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Support the Project</h4>
                        <p>Help us keep these tools free for everyone.</p>
                        <button class="donate-btn" onclick="window.open('https://paypal.me/tommyqhoang/', '_blank')">
                            <i class="fas fa-heart"></i>
                            Donate
                        </button>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 QAVibe. All rights reserved. Made with ❤️ by <a href="https://thoangdev.github.io/" target="_blank" rel="noopener noreferrer">thoangdev</a></p>
                </div>
            </div>
        `;
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

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if footer doesn't already exist
    if (!document.querySelector('.footer')) {
        try {
            new FooterComponent();
            console.log('Footer component initialized successfully');
        } catch (error) {
            console.error('Error initializing footer:', error);
        }
    }
});
