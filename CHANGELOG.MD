# Changelog - QAVibe App

All notable changes to QAVibe application will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.5.0] - 2025-08-11

### 🧹 Deep Repository Cleanup
- **Removed Duplicate Directories**: Eliminated outdated `src/` and `dist/` directories
- **Consolidated Active Files**: All active development files now in `public/` directory
- **Removed Obsolete Scripts**: Deleted `fix-pages.sh` and duplicate `sw.js` from root
- **Streamlined Structure**: Simplified project organization for better maintainability
- **Updated Documentation**: README, TODO, and CHANGELOG fully updated with current state

### 🐛 Critical Bug Fixes
- **Fixed Blog "Read More"**: Resolved modal popup functionality completely
  - Fixed `href="#"` causing page jumps to top
  - Added proper event handling with `preventDefault()`
  - Made `blogManager` globally accessible for onclick handlers
  - Added debugging and error handling for better reliability
- **Improved Modal Layout**: Made blog post modals more compact and readable
  - Reduced padding and margins throughout modal content
  - Optimized header layout and typography
  - Enhanced content spacing and line heights
  - Better mobile responsiveness

### 🎨 UI/UX Improvements
- **Banner Centering Fix**: Resolved left-alignment issues across all pages
  - Created new `.hero-center` CSS class for single-column pages
  - Fixed grid layout problems on legal pages (privacy, terms, etc.)
  - Maintained `.hero-container` for homepage two-column layout
  - All banners now properly centered and consistent
- **Changelog Compactness**: Enhanced changelog page text density
  - Reduced margins and line spacing for better readability
  - Improved content organization and visual hierarchy
  - Maintained readability while maximizing content per screen

### 🔧 Technical Improvements
- **Server Management**: Clarified HTTP 304 responses (not errors, but proper caching)
- **Event Handling**: Enhanced JavaScript event delegation and global function access
- **Modal System**: Improved modal display, positioning, and interaction handling
- **Development Workflow**: Streamlined startup process and debugging capabilities

### 📚 Documentation Overhaul
- **README Update**: Completely refreshed with accurate current information
  - Updated project structure to reflect actual organization
  - Clarified getting started instructions
  - Added realistic product status (in development)
  - Enhanced feature descriptions and technical details
- **TODO Refresh**: Updated with current priorities and completed items
  - Added comprehensive future roadmap
  - Organized by immediate, future, and long-term goals
  - Included technical debt and known issues sections
- **CHANGELOG Enhancement**: Improved formatting and detail level

### 🗑️ Removed Deprecated Items
- **Outdated Files**: Removed `src/css/`, `src/js/`, `dist/`, `fix-pages.sh`
- **Duplicate Assets**: Eliminated duplicate service worker and configuration files
- **Obsolete Scripts**: Cleaned up unused build artifacts and temporary files

## [2.4.0] - 2025-08-11

### 🧹 Repository Cleanup & Restructuring (Previous Version)
- **Removed Docusaurus**: Eliminated complex documentation system to simplify architecture
- **Streamlined Dependencies**: Removed all Docusaurus-related packages from package.json
- **Relocated Changelogs**: Moved from `documentation/docs/changelogs/` to `./changelogs/`
- **Updated Build Scripts**: Fixed changelog generation paths and GitHub Actions workflow
- **Enhanced .gitignore**: Added comprehensive file exclusion patterns
- **Cleaned Environment**: Simplified .env.example with current, relevant variables

### 📋 Enhanced Changelog System (Previous Version)
- **Automated Generation**: `npm run changelog` command for manual changelog building
- **GitHub Actions Integration**: Auto-sync changelogs from private TestFlux and StackHealth repos
- **Interactive Filtering**: Product-specific filtering with color-coded entries
- **Responsive Design**: Mobile-optimized changelog interface
- **JSON Export**: Changelog data available at `/changelog-data.json`
- **HTML Generation**: Beautiful combined changelog page at `/changelog.html`

### 🔧 Technical Improvements
- **Path Consistency**: All changelog-related paths now use `./changelogs/` directory
- **Workflow Updates**: GitHub Actions updated to sync to correct directory structure
- **Package Optimization**: Removed unused dependencies, added `concurrently` for development
- **npm Scripts**: Added changelog generation to package.json scripts
- **Documentation Updates**: README, TODO, and CHANGELOG updated to reflect new structure

### 🗑️ Removed Features
- **Documentation System**: Removed Docusaurus documentation portal and all related files
- **Complex Navigation**: Simplified to focus on core functionality
- **Documentation Server**: No longer running on port 3003
- **MDX Processing**: Eliminated complex documentation build pipeline

## [2.3.0] - 2025-08-11

### 🚀 Major Features (Deprecated - Removed in 2.4.0)
- **Comprehensive Documentation System**: Full Docusaurus-based documentation portal
- **Product-Specific Documentation**: Separate sections for TestFlux and StackHealth
- **Documentation Portal**: Beautiful card-based interface for accessing docs
- **Search Integration**: Built-in search functionality with Algolia support
- **Multi-Server Architecture**: Added documentation server on port 3003

*Note: Documentation system removed in v2.4.0 to simplify architecture*

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

### Version 2.4.0 Highlights

This release focuses on **repository cleanup and simplification**:

**🧹 Major Cleanup**
- Removed complex Docusaurus documentation system
- Simplified project structure and dependencies  
- Streamlined development workflow

**📋 Enhanced Changelog System**
- Automated changelog generation from markdown files
- GitHub Actions integration for auto-sync
- Interactive filtering and responsive design
- JSON export capabilities

**🔧 Technical Improvements**
- Path consistency across all changelog operations
- Updated GitHub Actions workflow
- Simplified environment configuration
- Cleaner package.json with relevant dependencies only

**� New Structure**
```
qavibeapp/
├── changelogs/              # Product changelog files
├── public/changelog.html    # Generated combined changelog  
├── scripts/generate-changelog.js # Automated generation
└── .github/workflows/sync-docs.yml # Auto-sync workflow
```

### Migration from v2.3.0

If upgrading from v2.3.0:

1. **Remove old documentation** (if manually installed):
   ```bash
   rm -rf documentation/
   ```

2. **Update dependencies**:
   ```bash
   npm install  # Will automatically remove Docusaurus packages
   ```

3. **Update environment variables**:
   ```bash
   cp .env.example .env
   # Review and update your .env file
   ```

4. **Test changelog generation**:
   ```bash
   npm run changelog
   ```

### Current Architecture

**Two-Server Setup**
- Frontend Server: Python HTTP (port 8002)
- Blog API Server: Node.js Express (port 3001) 
- Forms API Server: Node.js Express (port 3002)

**Key Features**
- ✅ Automated changelog generation
- ✅ GitHub Actions integration  
- ✅ Interactive blog system
- ✅ Professional support forms
- ✅ Progressive Web App capabilities
- ✅ Comprehensive rate limiting
- ✅ Security features (reCAPTCHA, CORS)

### Future Roadmap

**V2.5.0 (Planned)**
- Changelog search functionality
- RSS feed for changelogs
- Enhanced mobile experience
- Performance optimizations

**V3.0.0 (Planned)**
- User authentication system
- Product usage analytics
- Enhanced admin capabilities
- API rate limiting dashboard

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