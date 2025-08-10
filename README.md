# 🚀 QAVibe - Free Enterprise Testing Tools

QAVibe is the central landing page and blog platform for a suite of free, enterprise-grade testing tools designed to transform software quality processes at zero cost.

## ✨ Features

- **🎯 Modern Landing Page**: Professional showcase of TestFlux and StackHealth products
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices  
- **📝 Integrated Blog System**: Admin-managed blog with full CRUD operations
- **🔐 Admin Panel**: Secure blog management with password protection
- **💾 SQLite Database**: Persistent data storage for blog posts
- **🔔 Announcement System**: Configurable top banner for important messages
- **⚡ PWA Ready**: Progressive Web App capabilities with service worker
- **🎨 Professional UI/UX**: Clean design with smooth animations
- **🔍 SEO Optimized**: Proper meta tags, structured data, and performance

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern responsive design with flexbox/grid
- **JavaScript ES6+** - Interactive functionality and API integration
- **PWA** - Service worker for offline capabilities

### Backend  
- **Node.js** - Runtime environment
- **Express.js** - Web framework for API endpoints
- **SQLite3** - Lightweight database for blog data
- **CORS** - Cross-origin resource sharing support

### Development
- **npm** - Package management
- **Environment Variables** - Configuration management
- **Git** - Version control

## 📁 Project Structure

```
qavibeapp/
├── 📄 Frontend (Public)
│   ├── public/
│   │   ├── index.html          # Main landing page
│   │   ├── blog.html           # Blog interface
│   │   ├── manifest.json       # PWA manifest
│   │   ├── sw.js               # Service worker
│   │   ├── robots.txt          # SEO directives
│   │   └── sitemap.xml         # Site structure
│   │
│   └── src/
│       ├── css/
│       │   ├── styles.css      # Main website styles
│       │   └── blog-styles.css # Blog-specific styles
│       │
│       └── js/
│           ├── script.js       # Main website functionality
│           └── blog.js         # Blog functionality
│
├── 🔧 Backend & Scripts
│   ├── server/
│   │   └── blog-server-db.js   # Express server with SQLite
│   │
│   └── scripts/
│       ├── config.js           # Configuration management
│       └── build.js            # Build automation
│
├── � Configuration & Deployment
│   ├── config/
│   │   ├── Dockerfile          # Docker containerization
│   │   ├── railway.json        # Railway platform config
│   │   └── render.yaml         # Render platform config
│   │
│   └── docs/
│       ├── DEPLOY-GUIDE.md     # Deployment instructions
│       └── HOSTING-OPTIONS.md  # Platform comparison
│
├── �️ Database & Environment
│   ├── blog.db                 # SQLite database (auto-created)
│   ├── .env.example            # Environment variables template
│   └── package.json            # Dependencies and scripts
│
└── 🚀 Quick Start
    ├── start.sh                # Development startup script
    ├── README.md               # This documentation
    └── LICENSE                 # Project license
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Local Development

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

4. **Start the development servers**

   **Option A: Quick Start (Recommended)**
   ```bash
   # Single command to start both servers
   ./start.sh
   ```

   **Option B: Manual Start**
   ```bash
   # Start the blog backend server (port 3001)
   npm run start:backend
   
   # In another terminal, start the frontend server (port 8002)
   npm run start:frontend
   ```

5. **Access the application**
   - Main website: http://localhost:8002
   - Blog: http://localhost:8002/blog.html
   - Admin login: Password is `admin123` (configurable in .env)

### Production Deployment

The application is production-ready with multiple hosting options:

- **Railway** (Recommended): Easy deployment with persistent storage
- **Render**: Great performance with managed infrastructure  
- **Docker**: Containerized deployment for any platform
- **VPS**: Full control with custom server setup

See `DEPLOY-GUIDE.md` for detailed deployment instructions.

## 🛠️ Tools Showcased

### TestFlux - Test Results Dashboard
Enterprise-grade platform for aggregating and visualizing automated test results:

**Key Features:**
- ✅ **Multi-Framework Support**: Playwright, ZAP, k6 integration
- ✅ **CI/CD Integration**: Seamless pipeline integration
- ✅ **Role-based Access**: Enterprise security controls
- ✅ **Real-time Analytics**: Live test result monitoring
- ✅ **ML-powered Insights**: Intelligent trend analysis
- ✅ **Alert System**: Automated failure notifications

### StackHealth - Scorecard Platform  
Enterprise software quality assessment and reporting tool:

**Key Features:**
- ✅ **Security Assessment**: OWASP compliance scoring
- ✅ **Automation Analytics**: CI/CD maturity evaluation  
- ✅ **Performance Metrics**: Load testing result analysis
- ✅ **PDF Reporting**: Executive-ready scorecards
- ✅ **Dashboard Analytics**: Real-time quality metrics
- ✅ **Product Management**: Multi-project oversight

## � Blog System

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

# Blog Settings
BLOG_ADMIN_PASSWORD=your-secure-password
DATABASE_PATH=./blog.db

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
