// Changelog Page JavaScript
class ChangelogManager {
    constructor() {
        this.currentProduct = 'testflux';
        this.cache = new Map();
        this.allEntries = [];
        this.init();
    }

    async init() {
        // Load changelog data first
        await this.loadChangelogData();
        // Set up event listeners
        this.setupEventListeners();
        // Then load TestFlux changelog by default
        this.displayChangelog('testflux');
    }

    setupEventListeners() {
        // Use event delegation for expand buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.expand-btn')) {
                e.preventDefault();
                const button = e.target.closest('.expand-btn');
                this.toggleEntry(button);
            }
        });
    }

    async loadChangelogData() {
        try {
            const response = await fetch('./changelog-data.json');
            if (!response.ok) {
                throw new Error(`Failed to load changelog data: ${response.statusText}`);
            }
            this.allEntries = await response.json();
            console.log('Loaded changelog data:', this.allEntries);
        } catch (error) {
            console.error('Error loading changelog data:', error);
            this.allEntries = [];
        }
    }

    displayChangelog(product) {
        const contentDiv = document.getElementById('changelogContent');
        
        if (!contentDiv) {
            console.error('changelogContent div not found');
            return;
        }
        
        // Show loading state
        contentDiv.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading ${product === 'testflux' ? 'TestFlux' : 'StackHealth'} changelog...</p>
            </div>
        `;

        // Filter entries for the selected product
        const productName = product === 'testflux' ? 'TestFlux' : 'StackHealth';
        const productEntries = this.allEntries.filter(entry => 
            entry.product && entry.product.toLowerCase() === productName.toLowerCase()
        );

        console.log(`Found ${productEntries.length} entries for ${productName}`);

        if (productEntries.length === 0) {
            contentDiv.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-info-circle"></i>
                    <h3>No Changelog Available</h3>
                    <p>No changelog entries found for ${productName}.</p>
                    <p><small>Available products: ${this.allEntries.map(e => e.product).join(', ')}</small></p>
                </div>
            `;
            return;
        }

        // Generate HTML for entries
        const entriesHTML = productEntries.map(entry => this.renderChangelogEntry(entry)).join('');
        
        contentDiv.innerHTML = `
            <div class="changelog-entries">
                ${entriesHTML}
            </div>
        `;
        
        console.log('Changelog entries rendered successfully');
    }

    renderChangelogEntry(entry) {
        const productClass = entry.product.toLowerCase().replace(/\s+/g, '');
        const date = entry.date ? new Date(entry.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : '';
        
        // Convert content array to HTML
        const content = Array.isArray(entry.content) ? entry.content.join('\n') : entry.content;
        const formattedContent = this.formatContent(content);

        return `
            <div class="changelog-entry ${productClass}" data-product="${entry.product}">
                <div class="entry-header">
                    <div class="entry-info">
                        <span class="product-tag ${productClass}">${entry.product}</span>
                        <h3 class="entry-version">${entry.version}</h3>
                    </div>
                    <div class="entry-date">${date}</div>
                </div>
                <div class="entry-content">
                    <div class="content-preview">
                        <p>Click to expand and view full changelog...</p>
                    </div>
                    <div class="content-full" style="display: none;">
                        ${formattedContent}
                    </div>
                    <button class="expand-btn">
                        <i class="fas fa-chevron-down"></i>
                        <span>Expand</span>
                    </button>
                </div>
            </div>
        `;
    }

    formatContent(content) {
        if (!content) return '';
        
        return content
            .replace(/### (.*?)(\n|$)/g, '<h4>$1</h4>')
            .replace(/## (.*?)(\n|$)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```([^```]+)```/g, '<pre><code>$1</code></pre>')
            .replace(/^- (.*?)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
            .replace(/<\/ul>\s*<ul>/g, '')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/^(.*)/, '<p>$1')
            .replace(/(.*?)$/, '$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>');
    }

    toggleEntry(button) {
        const entry = button.closest('.changelog-entry');
        const preview = entry.querySelector('.content-preview');
        const full = entry.querySelector('.content-full');
        const icon = button.querySelector('i');
        const text = button.querySelector('span');

        if (full.style.display === 'none') {
            // Expand
            preview.style.display = 'none';
            full.style.display = 'block';
            icon.className = 'fas fa-chevron-up';
            text.textContent = 'Collapse';
            entry.classList.add('expanded');
        } else {
            // Collapse
            preview.style.display = 'block';
            full.style.display = 'none';
            icon.className = 'fas fa-chevron-down';
            text.textContent = 'Expand';
            entry.classList.remove('expanded');
        }
    }

    selectProduct(product) {
        // Update active button
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-product="${product}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Update current product
        this.currentProduct = product;
        
        // Load changelog
        this.displayChangelog(product);
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
    // Make it globally accessible
    window.changelogManager = changelogManager;
});

// Global function for button clicks
function selectProduct(product) {
    if (changelogManager) {
        changelogManager.selectProduct(product);
    }
}

// Global function for expand/collapse (backup)
function toggleEntry(button) {
    if (changelogManager) {
        changelogManager.toggleEntry(button);
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
