# Changelog - QAVibe App

All notable changes to QAVibe application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2025-08-11

### 🚀 Major Features
- **Comprehensive Documentation System**: Full Docusaurus-based documentation portal
- **Product-Specific Documentation**: Separate sections for TestFlux and StackHealth
- **Documentation Portal**: Beautiful card-based interface for accessing docs
- **Search Integration**: Built-in search functionality with Algolia support
- **Multi-Server Architecture**: Added documentation server on port 3003

### 📚 Documentation Features
- **Professional Documentation**: Docusaurus 3.8.1 with modern theming
- **Left-Hand Navigation**: Categorized sidebar navigation for each product
- **Mobile Responsive**: Fully optimized for mobile and tablet devices  
- **Search Functionality**: Integrated search across all documentation
- **QAVibe Branding**: Custom styling matching main site design
- **Direct Links**: Quick access from main site navigation

### 🎯 Content Organization
- **TestFlux Documentation**: Setup, Architecture, Deployment, Enterprise Tools, Monitoring
- **StackHealth Documentation**: User Guide, Development, V2 Features, Troubleshooting, Community
- **Intro Pages**: Welcoming introduction pages for each product
- **Markdown Conversion**: Converted existing docs with proper Docusaurus frontmatter

### 🔧 Technical Improvements
- **Updated Start Script**: Enhanced ./start.sh for documentation server
- **Docker Support**: Updated Dockerfile for multi-service deployment
- **Navigation System**: Centralized nav.js and footer.js components
- **Link Integration**: Documentation links throughout main site
- **Error Resolution**: Fixed MDX compilation issues and broken markdown links

### 🌐 Integration Points
- **Main Site Links**: Documentation accessible from all main pages
- **Quick Access Dropdown**: Fast navigation to specific product docs
- **Portal Landing Page**: Dedicated documentation overview page
- **Consistent UX**: Seamless experience between main site and docs

## [2.2.0] - 2025-08-10

### 🛡️ Security Enhancements
- **Comprehensive Rate Limiting**: Added rate limiting to all API endpoints and blog login
- **API Protection**: Implemented different rate limits for support (3/hour), demo (2/day), and general API (10/15min)
- **Login Security**: Added brute force protection with 5 attempts per 15 minutes
- **Environment Configuration**: Added configurable rate limiting through environment variables
- **Documentation**: Created comprehensive rate limiting guide (`docs/RATE-LIMITING.md`)

### 🔧 Technical Improvements
- **express-rate-limit Integration**: Professional rate limiting middleware implementation
- **Configurable Limits**: All rate limits configurable via environment variables
- **Logging**: Added rate limit event logging for monitoring
- **Headers**: Standard rate limit headers in all API responses

## [2.1.0] - 2024-12-26

### 🎯 Added
- **Interactive Dashboard**: Clickable product showcase with smooth tab switching between TestFlux and StackHealth
- **Support System**: Professional support form with comprehensive field collection
- **Demo Request System**: Modal-based demo scheduling with detailed environment capture
- **Multi-Server Architecture**: Separated API server (port 3002) for form handling
- **Security Integration**: Google reCAPTCHA v2 protection for all forms
- **Slack Integration**: Real-time webhook notifications for support and demo requests
- **Legal Pages**: Complete legal framework with Privacy Policy, Terms of Service, AUP, Security, Legal Center, and About pages
- **Enhanced Navigation**: Standardized menu structure across all pages
- **Smooth Animations**: CSS transitions and hover effects throughout the application

### 🛠️ Changed
- Updated footer design with PayPal donation integration
- Improved text contrast and readability across all pages
- Centralized content layout on legal pages
- Enhanced form validation and error handling
- Implemented dynamic API URL configuration for development/production

### 🔧 Fixed
- Resolved console errors and port conflicts between servers
- Fixed CSS reference issues across all pages
- Added safety checks for reCAPTCHA initialization
- Implemented proper error boundaries for form submissions
- Corrected navigation links and routing

### 🗑️ Removed
- Dark theme functionality (improved contrast instead)
- "About Us" navigation links (consolidated into single About page)
- Integrations section from footer
- Hardcoded localhost URLs

## [2.0.0] - 2024-12-25

### 🎯 Added
- **Blog System**: Full CRUD blog functionality with SQLite database
- **Admin Panel**: Secure blog management with password authentication
- **SEO Optimization**: Meta tags, structured data, and performance improvements
- **Progressive Web App**: PWA capabilities with service worker
- **Responsive Design**: Mobile-first responsive layout
- **Professional UI/UX**: Modern design system with consistent branding

### 🛠️ Changed
- Migrated to Node.js backend architecture
- Implemented Express.js API endpoints
- Added SQLite database integration
- Enhanced project structure and organization

### 🔧 Technical
- **Database Schema**: Created posts and admin_config tables
- **API Endpoints**: Blog management APIs with CORS support
- **Build System**: Automated build and deployment scripts
- **Environment Config**: Comprehensive .env configuration

## [1.0.0] - 2024-12-20

### 🎯 Initial Release
- **Landing Page**: Professional showcase for TestFlux and StackHealth products
- **Product Information**: Detailed feature descriptions and benefits
- **Contact Forms**: Basic contact functionality
- **Static Content**: Initial HTML/CSS/JavaScript foundation
- **Deployment Ready**: Multiple hosting platform configurations

### 📁 Project Foundation
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Hosting Configs**: Railway, Render, Docker configurations
- **Documentation**: Comprehensive setup and deployment guides
- **License**: Open source licensing

---

## Release Notes

### Version 2.1.0 Highlights

This major update transforms QAVibe from a static landing page into a fully interactive platform with professional support capabilities:

**🎯 Interactive Dashboard**
- Click between TestFlux and StackHealth views
- Smooth animations and transitions
- Enhanced product visualization

**🤝 Professional Support**
- Comprehensive support form with priority levels
- Environment and system information capture
- Real-time Slack notifications for support team

**🚀 Demo System**
- Streamlined demo request process
- Detailed requirements collection
- Automated scheduling workflow

**🛡️ Security & Validation**
- Google reCAPTCHA integration
- Form validation and sanitization
- Rate limiting and spam protection

**📱 Enhanced UX**
- Standardized navigation across all pages
- Improved accessibility and contrast
- Mobile-optimized forms and interactions

### Technical Architecture

**Multi-Server Setup**
- Frontend Server: Python HTTP (port 8002)
- Blog API Server: Node.js Express (port 3001) 
- Forms API Server: Node.js Express (port 3002)

**Integration Points**
- Slack webhooks for real-time notifications
- Google reCAPTCHA for security
- SQLite database for blog persistence
- Environment-based configuration

### Migration Guide

For existing deployments, ensure to:

1. Update environment variables with new Slack and reCAPTCHA keys
2. Deploy the new API server on port 3002
3. Configure Slack webhooks for support and demo notifications
4. Test form submissions end-to-end

### Future Roadmap

**V2.2.0 (Planned)**
- Form submission analytics
- Enhanced demo scheduling calendar
- User dashboard for support tickets
- Advanced spam protection

**V3.0.0 (Planned)**
- User authentication system
- Product usage analytics
- Enhanced admin capabilities
- API rate limiting and monitoring

---

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## Support

For questions or issues, please:
- Open an issue on GitHub
- Contact us through the support form
- Join our community discussions

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.