#!/usr/bin/env node

/**
 * Build script for QAVibe website
 * Processes environment variables and injects them into the HTML
 */

const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnvFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return {};
    }
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const env = {};
    
    content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=');
            if (key && value !== undefined) {
                env[key.trim()] = value.trim();
            }
        }
    });
    
    return env;
}

// Process HTML template
function processHtml(htmlPath, outputPath, env) {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Inject configuration meta tags
    const metaTags = Object.keys(env)
        .filter(key => key.startsWith('ANNOUNCEMENT_') || key.includes('_URL') || key.includes('ANALYTICS'))
        .map(key => {
            const value = env[key];
            const metaName = key.toLowerCase();
            return `    <meta name="config:${metaName}" content="${value}">`;
        })
        .join('\n');
    
    // Find the existing config meta tags and replace them
    const configMetaRegex = /<!-- Configuration meta tags[\s\S]*?-->/;
    const configMetaSection = `<!-- Configuration meta tags (populated by server or build process) -->
${metaTags}`;
    
    html = html.replace(configMetaRegex, configMetaSection);
    
    // Inject analytics scripts if configured
    if (env.GOOGLE_ANALYTICS_ID) {
        const analyticsScript = `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${env.GOOGLE_ANALYTICS_ID}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${env.GOOGLE_ANALYTICS_ID}');
    </script>`;
        
        html = html.replace('</head>', `${analyticsScript}\n</head>`);
    }
    
    // Write processed HTML
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`✅ Processed HTML: ${outputPath}`);
}

// Process CSS for environment-specific features
function processCSS(cssPath, outputPath, env) {
    let css = fs.readFileSync(cssPath, 'utf-8');
    
    // Add environment-specific styles
    if (env.ENVIRONMENT === 'development') {
        css += `
/* Development styles */
.dev-indicator {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background: #ef4444;
    color: white;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 0.25rem;
    z-index: 9999;
}
`;
    }
    
    fs.writeFileSync(outputPath, css, 'utf-8');
    console.log(`✅ Processed CSS: ${outputPath}`);
}

// Generate service worker with environment config
function generateServiceWorker(env) {
    const cacheVersion = env.CACHE_VERSION || 'v1';
    const staticCacheMaxAge = env.STATIC_CACHE_MAX_AGE || '31536000';
    
    const swContent = `
const CACHE_NAME = 'qavibeapp-${cacheVersion}';
const STATIC_CACHE_MAX_AGE = ${staticCacheMaxAge};

const urlsToCache = [
  '/',
  '/public/index.html',
  '/src/css/styles.css',
  '/src/js/script.js',
  '/scripts/config.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }
    )
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
    
    fs.writeFileSync('sw.js', swContent.trim(), 'utf-8');
    console.log('✅ Generated service worker');
}

// Main build process
function build() {
    console.log('🔧 Building QAVibe website...\n');
    
    // Load environment variables
    const env = {
        ...loadEnvFile('.env'),
        ...loadEnvFile('.env.local'),
        ...process.env
    };
    
    console.log('📦 Environment variables loaded');
    
    // Create dist directory if it doesn't exist
    const distDir = 'dist';
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Process files
    processHtml(path.join('public', 'index.html'), path.join(distDir, 'index.html'), env);
    processCSS(path.join('src', 'css', 'styles.css'), path.join(distDir, 'styles.css'), env);
    
    // Copy static files
    const staticFiles = [
        { src: path.join('src', 'js', 'script.js'), dest: 'script.js' },
        { src: path.join('scripts', 'config.js'), dest: 'config.js' },
        { src: path.join('public', 'manifest.json'), dest: 'manifest.json' },
        { src: path.join('public', 'robots.txt'), dest: 'robots.txt' },
        { src: path.join('public', 'sitemap.xml'), dest: 'sitemap.xml' }
    ];
    staticFiles.forEach(file => {
        if (fs.existsSync(file.src)) {
            fs.copyFileSync(file.src, path.join(distDir, file.dest));
            console.log(`✅ Copied: ${file.src} -> ${file.dest}`);
        }
    });
    
    // Generate service worker
    generateServiceWorker(env);
    fs.copyFileSync('sw.js', path.join(distDir, 'sw.js'));
    
    console.log('\n✨ Build completed successfully!');
    console.log(`📁 Output directory: ${distDir}`);
    
    // Show environment summary
    console.log('\n📋 Configuration Summary:');
    console.log(`   Environment: ${env.ENVIRONMENT || 'production'}`);
    console.log(`   Site URL: ${env.SITE_URL || 'https://qavibeapp.com'}`);
    console.log(`   Announcement: ${env.ANNOUNCEMENT_ENABLED === 'true' ? '✅ Enabled' : '❌ Disabled'}`);
    console.log(`   Analytics: ${env.GOOGLE_ANALYTICS_ID ? '✅ Configured' : '❌ Not configured'}`);
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build };
