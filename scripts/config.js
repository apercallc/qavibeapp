// Configuration loader for environment variables
// This script loads configuration from environment variables or falls back to defaults

class ConfigLoader {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    // Load configuration from various sources
    loadConfig() {
        // Try to load from meta tags (set by server-side rendering)
        this.loadFromMetaTags();
        
        // Try to load from global config object (set in HTML)
        this.loadFromGlobal();
        
        // Apply defaults
        this.applyDefaults();
        
        // Validate required fields
        this.validateConfig();
    }

    // Load configuration from meta tags
    loadFromMetaTags() {
        const metaTags = document.querySelectorAll('meta[name^="config:"]');
        metaTags.forEach(tag => {
            const key = tag.getAttribute('name').replace('config:', '').toUpperCase();
            const value = tag.getAttribute('content');
            this.config[key] = this.parseValue(value);
        });
    }

    // Load from global window object
    loadFromGlobal() {
        if (typeof window !== 'undefined' && window.QAVIBEAPP_CONFIG) {
            Object.assign(this.config, window.QAVIBEAPP_CONFIG);
        }
    }

    // Apply default values
    applyDefaults() {
        const defaults = {
            // Site Configuration
            SITE_URL: window.location.origin,
            SITE_NAME: 'QAVibe',
            ENVIRONMENT: 'production',

            // Product URLs
            TESTFLUX_URL: 'https://testflux.qavibeapp.com',
            STACKHEALTH_URL: 'https://stackhealth.qavibeapp.com',

            // Announcement Configuration
            ANNOUNCEMENT_ENABLED: true,
            ANNOUNCEMENT_MESSAGE: '🎉 New Feature: StackHealth now includes automated security scanning! Learn more →',
            ANNOUNCEMENT_LINK: '#products',
            ANNOUNCEMENT_DISMISSIBLE: true,
            ANNOUNCEMENT_AUTO_HIDE: false,
            ANNOUNCEMENT_TYPE: 'info',

            // API Endpoints
            DEMO_FORM_ENDPOINT: '/api/demo-request',
            CONTACT_FORM_ENDPOINT: '/api/contact',

            // Form Handling
            USE_NETLIFY_FORMS: true,

            // Social Media
            GITHUB_URL: 'https://thoangdev.github.io/',

            // SEO
            SEO_TITLE: 'QAVibe - Free Enterprise Testing Tools',
            SEO_DESCRIPTION: 'Free enterprise-grade testing tools including TestFlux dashboard and StackHealth scorecard platform. Transform your software quality process at zero cost.',

            // Feature Flags
            ENABLE_DARK_MODE: true,
            ENABLE_PWA: true,
            ENABLE_OFFLINE_MODE: true,
            ENABLE_ANALYTICS: true,

            // Development
            DEV_PORT: 8000,
            DEV_HOST: 'localhost'
        };

        // Merge defaults with existing config
        Object.keys(defaults).forEach(key => {
            if (this.config[key] === undefined) {
                this.config[key] = defaults[key];
            }
        });
    }

    // Parse string values to appropriate types
    parseValue(value) {
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (value === 'null') return null;
        if (value === 'undefined') return undefined;
        
        // Try to parse as number
        const numValue = Number(value);
        if (!isNaN(numValue) && isFinite(numValue)) {
            return numValue;
        }
        
        return value;
    }

    // Validate required configuration
    validateConfig() {
        const required = ['SITE_URL', 'TESTFLUX_URL', 'STACKHEALTH_URL'];
        const missing = required.filter(key => !this.config[key]);
        
        if (missing.length > 0) {
            console.warn('Missing required configuration:', missing);
        }
    }

    // Get configuration value
    get(key, defaultValue = null) {
        return this.config[key] !== undefined ? this.config[key] : defaultValue;
    }

    // Set configuration value
    set(key, value) {
        this.config[key] = value;
    }

    // Get all configuration
    getAll() {
        return { ...this.config };
    }

    // Check if feature is enabled
    isFeatureEnabled(feature) {
        return this.get(`ENABLE_${feature.toUpperCase()}`, false);
    }

    // Get announcement configuration
    getAnnouncementConfig() {
        return {
            enabled: this.get('ANNOUNCEMENT_ENABLED', false),
            message: this.get('ANNOUNCEMENT_MESSAGE', ''),
            link: this.get('ANNOUNCEMENT_LINK', ''),
            dismissible: this.get('ANNOUNCEMENT_DISMISSIBLE', true),
            autoHide: this.get('ANNOUNCEMENT_AUTO_HIDE', false),
            type: this.get('ANNOUNCEMENT_TYPE', 'info')
        };
    }

    // Get analytics configuration
    getAnalyticsConfig() {
        return {
            googleAnalyticsId: this.get('GOOGLE_ANALYTICS_ID'),
            googleTagManagerId: this.get('GOOGLE_TAG_MANAGER_ID'),
            facebookPixelId: this.get('FACEBOOK_PIXEL_ID'),
            hotjarId: this.get('HOTJAR_ID'),
            enabled: this.get('ENABLE_ANALYTICS', true)
        };
    }

    // Get form configuration
    getFormConfig() {
        return {
            demoEndpoint: this.get('DEMO_FORM_ENDPOINT'),
            contactEndpoint: this.get('CONTACT_FORM_ENDPOINT'),
            useNetlifyForms: this.get('USE_NETLIFY_FORMS', false),
            formspreeEndpoint: this.get('FORMSPREE_ENDPOINT'),
            emailjsConfig: {
                serviceId: this.get('EMAILJS_SERVICE_ID'),
                templateId: this.get('EMAILJS_TEMPLATE_ID'),
                publicKey: this.get('EMAILJS_PUBLIC_KEY')
            }
        };
    }

    // Get product URLs
    getProductUrls() {
        return {
            testflux: this.get('TESTFLUX_URL'),
            stackhealth: this.get('STACKHEALTH_URL')
        };
    }

    // Get environment info
    getEnvironmentInfo() {
        return {
            environment: this.get('ENVIRONMENT'),
            isDevelopment: this.get('ENVIRONMENT') === 'development',
            isProduction: this.get('ENVIRONMENT') === 'production',
            siteUrl: this.get('SITE_URL'),
            siteName: this.get('SITE_NAME')
        };
    }
}

// Create global configuration instance
window.AppConfig = new ConfigLoader();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConfigLoader;
}
