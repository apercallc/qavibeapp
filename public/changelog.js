// Changelog Page JavaScript
class ChangelogManager {
    constructor() {
        this.currentProduct = 'testflux';
        this.cache = new Map();
        this.init();
    }

    init() {
        // Load TestFlux changelog by default
        this.loadChangelog('testflux');
    }

    async loadChangelog(product) {
        const contentDiv = document.getElementById('changelogContent');
        
        // Show loading state
        contentDiv.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading ${product === 'testflux' ? 'TestFlux' : 'StackHealth'} changelog...</p>
            </div>
        `;

        try {
            // Check cache first
            if (this.cache.has(product)) {
                contentDiv.innerHTML = this.cache.get(product);
                return;
            }

            // Determine API URL based on environment
            const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBaseUrl = isDevelopment ? 'http://localhost:3001' : '';
            
            // Fetch markdown content from server
            const response = await fetch(`${apiBaseUrl}/api/changelog/${product}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load changelog: ${response.statusText}`);
            }

            const htmlContent = await response.text();
            
            // Cache the content
            this.cache.set(product, htmlContent);
            
            // Display the content
            contentDiv.innerHTML = htmlContent;
            
        } catch (error) {
            console.error('Error loading changelog:', error);
            contentDiv.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Failed to Load Changelog</h3>
                    <p>Sorry, we couldn't load the changelog at this time. Please try again later.</p>
                    <button class="btn btn-primary" onclick="changelogManager.loadChangelog('${product}')">
                        <i class="fas fa-retry"></i> Retry
                    </button>
                </div>
            `;
        }
    }

    selectProduct(product) {
        // Update active button
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-product="${product}"]`).classList.add('active');
        
        // Update current product
        this.currentProduct = product;
        
        // Load changelog
        this.loadChangelog(product);
    }

    // Clear cache if needed
    clearCache() {
        this.cache.clear();
    }
}

// Initialize changelog manager
let changelogManager;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    changelogManager = new ChangelogManager();
});

// Global function for button clicks
function selectProduct(product) {
    if (changelogManager) {
        changelogManager.selectProduct(product);
    }
}

// Add navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Dropdown functionality
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    if (dropdownTrigger) {
        dropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = dropdownTrigger.parentElement;
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownTrigger.parentElement.contains(e.target)) {
                dropdownTrigger.parentElement.classList.remove('active');
            }
        });
    }
});
