# 🚀 QAVibe - Free Enterprise Testing Tools

QAVibe is a central platform showcasing free, enterprise-grade testing tools including TestFlux dashboard and StackHealth scorecard platform. Built for the software testing community with a mission to make quality tools accessible to everyone.

## ✨ Features

- **🎯 Product Showcase**: Interactive tabs displaying TestFlux and StackHealth capabilities
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices  
- **📝 Blog System**: Complete blog with admin management and SQLite database
- **🤝 Support Integration**: Professional support forms with Slack notifications
- **🚀 Demo Requests**: Modal-based demo scheduling with reCAPTCHA protection
- **🔐 Admin Panel**: Secure blog management with password authentication
- **📋 Changelog System**: Automated changelog generation from markdown files
- **💾 SQLite Database**: Persistent storage for blog posts and admin data
- **🔔 Announcement Banner**: Configurable promotional messages
- **⚡ PWA Ready**: Progressive Web App with service worker
- **🎨 Modern UI/UX**: Clean design with smooth animations
- **🔍 SEO Optimized**: Meta tags, structured data, performance optimized
- **🛡️ Security Features**: Rate limiting, CORS, input validation
- **⚡ Multi-Server Architecture**: Scalable backend with specialized servers

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern responsive design with flexbox/grid
- **JavaScript ES6+** - Interactive functionality and API integration
- **PWA** - Service worker for offline capabilities

### Backend  
- **Node.js** - Runtime environment
- **Express.js** - Multi-server architecture (Blog API + Forms API)
- **SQLite3** - Lightweight database for blog data
- **Slack Webhooks** - Real-time form notifications
- **Google reCAPTCHA** - Spam protection and security
- **CORS** - Cross-origin resource sharing support

### Development
- **npm** - Package management
- **Environment Variables** - Configuration management
- **Git** - Version control

## 📁 Project Structure

```
qavibeapp/
├── 📄 Frontend
│   └── public/                 # Main application files
│       ├── index.html          # Landing page
│       ├── blog.html           # Blog interface
│       ├── changelog.html      # Generated changelog
│       ├── support.html        # Support form
│       ├── about.html          # About page
│       ├── *.html              # Legal pages (privacy, terms, etc.)
│       ├── styles.css          # Main styles
│       ├── blog-styles.css     # Blog-specific styles
│       ├── script.js           # Main functionality
│       ├── blog.js             # Blog functionality
│       ├── changelog.js        # Changelog functionality
│       ├── config.js           # Configuration
│       ├── manifest.json       # PWA manifest
│       ├── sw.js               # Service worker
│       ├── robots.txt          # SEO directives
│       ├── sitemap.xml         # Site structure
│       └── components/         # Reusable components
│           ├── nav.js          # Navigation
│           └── footer.js       # Footer
│
├── 🔧 Backend
│   └── server/
│       ├── blog-server-db.js   # Blog API (port 3001)
│       └── api-server.js       # Forms API (port 3002)
│
├── 📋 Scripts & Automation
│   ├── scripts/
│   │   ├── generate-changelog.js  # Changelog generator
│   │   ├── build.js            # Build automation
│   │   └── config.js           # Build configuration
│   │
│   └── .github/workflows/
│       └── sync-docs.yml       # Auto-sync changelogs
│
├── 📊 Data & Configuration
│   ├── changelogs/             # Product changelog sources
│   │   ├── testflux-changelog.md
│   │   └── stackhealth-changelog.md
│   │
│   ├── config/                 # Deployment configs
│   │   ├── Dockerfile
│   │   ├── railway.json
│   │   └── render.yaml
│   │
│   ├── blog.db                 # SQLite database (auto-created)
│   ├── .env                    # Environment variables
│   └── .env.example            # Template
│
└── 🚀 Project Files
    ├── package.json            # Dependencies & scripts
    ├── start.sh                # Development startup
    ├── README.md               # Documentation
    ├── CHANGELOG.MD            # Version history
    ├── TODO.MD                 # Development roadmap
    └── LICENSE                 # MIT License
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Python 3 (for development server)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/apercallc/qavibeapp.git
   cd qavibeapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start all servers (Recommended)**
   ```bash
   ./start.sh
   ```

5. **Access the application**
   - **Main website**: http://localhost:8002
   - **Blog**: http://localhost:8002/blog.html
   - **Support**: http://localhost:8002/support.html
   - **Changelog**: http://localhost:8002/changelog.html

### Manual Server Management

If you prefer to start servers individually:

```bash
# Backend servers
npm run blog:start     # Blog API (port 3001)
npm run api:start      # Forms API (port 3002)

# Frontend server  
npm run serve          # Frontend (port 8002)

# Generate changelog
npm run changelog      # Creates changelog.html
```

### Development Commands

```bash
# Development with auto-restart
npm run blog:dev       # Blog server with nodemon
npm run api:dev        # API server with nodemon

# Build and optimization
npm run build          # Build optimized version
npm run lighthouse     # Performance audit
npm run validate       # HTML validation
```

### Production Deployment

The application is production-ready with multiple hosting options:

- **Railway** (Recommended): Easy deployment with persistent storage
- **Render**: Great performance with managed infrastructure  
- **Docker**: Containerized deployment for any platform
- **VPS**: Full control with custom server setup

See `docs/DEPLOY-GUIDE.md` for detailed deployment instructions and `docs/RATE-LIMITING.md` for security configuration.

## 🛠️ Tools Showcased

### TestFlux - Test Results Dashboard
🚧 **Status**: In Development - Coming Soon!

Enterprise-grade platform for aggregating and visualizing automated test results:

**Planned Features:**
- **Multi-Framework Support**: Playwright, Cypress, Jest integration
- **Real-time Analytics**: Live test execution monitoring
- **CI/CD Integration**: Seamless pipeline integration
- **Custom Reporting**: Flexible report generation
- **Trend Analysis**: Historical performance tracking
- **Team Collaboration**: Shared dashboards and insights

### StackHealth - Scorecard Platform  
🚧 **Status**: In Development - Coming Soon!

Enterprise software quality assessment and reporting tool:

**Planned Features:**
- **Security Assessment**: OWASP compliance scoring
- **Performance Metrics**: Detailed execution analysis
- **API Integration**: RESTful API for custom integrations
- **PDF Reporting**: Executive-ready scorecards
- **Dashboard Analytics**: Real-time quality metrics
- **Multi-Project Management**: Comprehensive oversight

## 📋 Changelog System

The automated changelog system combines individual product changelogs into a unified interface:

### Features
- **🤖 Automated Generation**: `npm run changelog` command
- **📅 Date Sorting**: Chronologically sorted entries (newest first)
- **🏷️ Product Tagging**: Color-coded TestFlux and StackHealth entries
- **🔍 Interactive Filtering**: Filter by product or view all
- **📱 Responsive Design**: Mobile-optimized interface
- **⚡ GitHub Actions**: Auto-sync from private repositories

### How It Works
1. **Source Files**: Individual markdown files in `changelogs/` directory
2. **JSON Generation**: Combined data exported to `changelog-data.json`
3. **HTML Output**: Beautiful changelog page at `/changelog.html`
4. **Auto-sync**: GitHub Actions pull latest changes from private repos

### Usage
```bash
# Generate changelog manually
npm run changelog

# View generated changelog
# Visit http://localhost:8002/changelog.html
```

## 📝 Blog System

### Features
- **✍️ Rich Text Editor**: Easy content creation with markdown support
- **🖼️ Image Support**: URL-based image embedding in posts  
- **🏷️ Tagging System**: Categorize posts with tags and labels
- **👨‍💼 Admin Only**: Secure posting with password protection
- **💾 Persistent Storage**: SQLite database for data retention
- **📱 Responsive Design**: Mobile-optimized blog interface
- **🔍 SEO Friendly**: Proper meta tags and structure

### Admin Functions
- Create new blog posts
- Edit existing posts
- Delete posts  
- Manage tags and categories
- Preview posts before publishing

### Database Schema
```sql
-- Blog posts table
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    tags TEXT,
    labels TEXT,
    author TEXT DEFAULT 'QAVibe Team',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin configuration table  
CREATE TABLE admin_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color
- **Accent Gold**: `#fbbf24` - Highlights and CTAs  
- **Success Green**: `#10b981` - Positive actions
- **Error Red**: `#ef4444` - Warnings and errors
- **Neutral Gray**: `#6b7280` - Text and backgrounds

### Typography
- **Font Family**: Inter (fallback: system fonts)
- **Heading Scale**: 2rem → 1.5rem → 1.25rem
- **Body Text**: 1rem with 1.5 line height
- **Mobile First**: Responsive typography scaling

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Site Configuration
SITE_URL=https://qavibeapp.com
NODE_ENV=production
PORT=3001
API_PORT=3002

# Blog Settings
BLOG_ADMIN_PASSWORD=your-secure-password
DATABASE_PATH=./blog.db

# Slack Integration
SLACK_SUPPORT_WEBHOOK=https://hooks.slack.com/services/YOUR/SUPPORT/WEBHOOK
SLACK_DEMO_WEBHOOK=https://hooks.slack.com/services/YOUR/DEMO/WEBHOOK

# Google reCAPTCHA
RECAPTCHA_SITE_KEY=your-recaptcha-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Announcement Banner
ANNOUNCEMENT_ENABLED=true
ANNOUNCEMENT_MESSAGE=Your announcement text
ANNOUNCEMENT_LINK=#products

# Analytics (optional)
GOOGLE_ANALYTICS_ID=GA-XXXX-XXXX
SENTRY_DSN=https://your-sentry-dsn

# Feature Flags
ENABLE_BLOG=true
ENABLE_PWA=true
ENABLE_ADMIN_PANEL=true
ENABLE_SUPPORT_FORMS=true
```

## 🚀 Deployment Options

### 1. Railway (Recommended)
- **Pros**: Easy setup, persistent storage, GitHub integration
- **Cost**: ~$5-10/month
- **Setup Time**: 5 minutes

### 2. Render  
- **Pros**: Great performance, managed infrastructure
- **Cost**: ~$7/month with persistent disk
- **Setup Time**: 10 minutes

### 3. Docker
- **Pros**: Works anywhere, full control
- **Cost**: Varies by hosting provider
- **Setup Time**: 15 minutes

### 4. VPS (DigitalOcean, Linode)
- **Pros**: Complete control, easy backups
- **Cost**: $5-20/month
- **Setup Time**: 30 minutes

## 📊 Performance & SEO

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### SEO Optimization
- ✅ Semantic HTML structure
- ✅ Meta tags and Open Graph  
- ✅ Proper heading hierarchy
- ✅ Alt text for all images
- ✅ Structured data ready
- ✅ Fast loading times
- ✅ Mobile-first indexing

### Accessibility (A11y)
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation
- ✅ Screen reader support  
- ✅ High contrast ratios
- ✅ Focus indicators
- ✅ Alt text for images

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`  
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple devices/browsers
- Update documentation as needed
- Keep commits atomic and descriptive

## 📧 Support & Contact

- **Website**: [qavibeapp.com](https://qavibeapp.com)
- **GitHub**: [github.com/apercallc/qavibeapp](https://github.com/apercallc/qavibeapp)
- **Creator**: [Tommy Hoang](https://thoangdev.github.io/)
- **LinkedIn**: [linkedin.com/in/tommyqhoang](https://www.linkedin.com/in/tommyqhoang/)

For support questions or feature requests, please open an issue on GitHub.

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🎯 Project Goals

### Mission Statement
**"Making enterprise-grade testing tools accessible to everyone at zero cost."**

### Core Values
1. **🆓 100% Free**: No hidden costs, subscriptions, or enterprise fees
2. **🏢 Enterprise Grade**: Professional features rivaling expensive tools  
3. **🔗 Easy Integration**: Works with existing CI/CD pipelines
4. **� Community Driven**: Open source with active development
5. **🎨 Modern UI/UX**: Intuitive, clean interface design
6. **📊 Data-Driven**: Analytics and insights for better decisions

---

**Built with ❤️ for the software testing community**

*Transforming software quality, one test at a time.*
**Built with ❤️ for the software testing community**

*Transforming software quality, one test at a time.*
