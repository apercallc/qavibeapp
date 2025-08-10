const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the project root
app.use(express.static(path.join(__dirname, '..')));

// Database setup - handle production path  
const dbPath = NODE_ENV === 'production' 
    ? path.join(process.env.DATA_DIR || '/app/data', 'blog.db')
    : path.join(__dirname, '..', 'blog.db');

// Ensure directory exists in production
if (NODE_ENV === 'production') {
    const fs = require('fs');
    const dataDir = path.dirname(dbPath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
    // Create posts table
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        tags TEXT,
        labels TEXT,
        author TEXT DEFAULT 'Admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    
    // Create admin config table
    db.run(`CREATE TABLE IF NOT EXISTS admin_config (
        key TEXT PRIMARY KEY,
        value TEXT
    )`);
    
    // Insert default admin password if not exists
    db.get("SELECT value FROM admin_config WHERE key = 'password'", (err, row) => {
        if (!row) {
            db.run("INSERT INTO admin_config (key, value) VALUES ('password', 'admin123')");
        }
    });
    
    // Add sample posts if table is empty
    db.get("SELECT COUNT(*) as count FROM posts", (err, row) => {
        if (row.count === 0) {
            const samplePosts = [
                {
                    title: "Getting Started with Test Automation",
                    description: "Learn the fundamentals of test automation and how to build robust testing pipelines. ![Testing Image](https://via.placeholder.com/400x200/2563eb/ffffff?text=Test+Automation)",
                    content: `Test automation is essential for modern software development. In this comprehensive guide, we'll cover the basics of setting up automated tests, choosing the right tools, and implementing best practices.

## Why Test Automation?

Test automation provides numerous benefits:
- Faster feedback cycles
- Consistent test execution  
- Improved test coverage
- Cost reduction over time

## Getting Started

When beginning your automation journey, consider these key factors:

### Tool Selection
Choose tools that fit your technology stack and team expertise.

### Test Strategy
Define what to automate and what to test manually.

### Maintenance
Plan for ongoing test maintenance and updates.`,
                    tags: "automation,testing,beginners",
                    labels: "tutorial,guide"
                },
                {
                    title: "TestFlux Dashboard: New Features Released", 
                    description: "Discover the latest features in TestFlux including enhanced reporting and improved CI/CD integration. ![Dashboard](https://via.placeholder.com/400x200/10b981/ffffff?text=TestFlux+Dashboard)",
                    content: `We're excited to announce the latest update to TestFlux Dashboard! This release brings powerful new features that will streamline your testing workflow.

## What's New

### Enhanced Reporting
Our new reporting engine provides more detailed insights into your test results with:
- Advanced filtering options
- Custom report templates
- Real-time analytics

### Improved CI/CD Integration
Seamless integration with popular CI/CD platforms including:
- Jenkins
- GitHub Actions
- GitLab CI
- Azure DevOps

### Custom Dashboards
Create personalized dashboards that focus on the metrics that matter most to your team.`,
                    tags: "testflux,features,dashboard",
                    labels: "announcement,news"
                },
                {
                    title: "StackHealth Scorecard: Code Quality Metrics",
                    description: "Learn how to effectively use StackHealth to measure and improve your code quality. ![Code Quality](https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Code+Quality)",
                    content: `Code quality is crucial for maintainable software. StackHealth provides comprehensive scorecards that help you track and improve various aspects of your codebase.

## Key Metrics Tracked

### Security Score
- Vulnerability detection
- Security best practices
- Dependency scanning

### Performance Score  
- Code complexity analysis
- Performance bottlenecks
- Optimization suggestions

### Maintainability Score
- Code documentation
- Test coverage
- Technical debt assessment

## Implementation Guide

Getting started with StackHealth is straightforward:

1. **Connect Your Repository**
2. **Configure Quality Gates** 
3. **Set Up Notifications**
4. **Monitor Your Progress**`,
                    tags: "stackhealth,quality,metrics",
                    labels: "tutorial,guide"
                }
            ];
            
            const stmt = db.prepare(`INSERT INTO posts (title, description, content, tags, labels) VALUES (?, ?, ?, ?, ?)`);
            samplePosts.forEach(post => {
                stmt.run([post.title, post.description, post.content, post.tags, post.labels]);
            });
            stmt.finalize();
        }
    });
});

// Helper function to extract image URLs from description
const extractImageFromDescription = (description) => {
    const imgRegex = /!\[.*?\]\((.*?)\)/;
    const match = description.match(imgRegex);
    return match ? match[1] : null;
};

// Helper function to clean description (remove image markdown)
const cleanDescription = (description) => {
    return description.replace(/!\[.*?\]\(.*?\)\s*/g, '').trim();
};

// API Routes

// Get all posts (public)
app.get('/api/posts', (req, res) => {
    db.all("SELECT * FROM posts ORDER BY created_at DESC", (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        const posts = rows.map(row => ({
            id: row.id,
            title: row.title,
            description: cleanDescription(row.description),
            content: row.content,
            tags: row.tags ? row.tags.split(',') : [],
            labels: row.labels ? row.labels.split(',') : [],
            image: extractImageFromDescription(row.description),
            date: row.created_at,
            author: row.author
        }));
        
        res.json({ success: true, posts });
    });
});

// Get single post (public)
app.get('/api/posts/:id', (req, res) => {
    db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (!row) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        const post = {
            id: row.id,
            title: row.title,
            description: cleanDescription(row.description),
            content: row.content,
            tags: row.tags ? row.tags.split(',') : [],
            labels: row.labels ? row.labels.split(',') : [],
            image: extractImageFromDescription(row.description),
            date: row.created_at,
            author: row.author
        };
        
        res.json({ success: true, post });
    });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    db.get("SELECT value FROM admin_config WHERE key = 'password'", (err, row) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        if (password === row.value) {
            const sessionId = Date.now() + '-' + Math.random().toString(36);
            res.json({ success: true, sessionId, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, error: 'Invalid password' });
        }
    });
});

// Middleware to check admin auth
const requireAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Authentication required' });
    }
    next();
};

// Create new post (admin only)
app.post('/api/posts', requireAdmin, (req, res) => {
    const { title, description, content, tags, labels } = req.body;
    
    // Combine image URL with description if provided separately
    let finalDescription = description;
    if (req.body.imageUrl) {
        finalDescription = `![Featured Image](${req.body.imageUrl}) ${description}`;
    }
    
    const tagsStr = Array.isArray(tags) ? tags.join(',') : tags;
    const labelsStr = Array.isArray(labels) ? labels.join(',') : labels;
    
    db.run(
        "INSERT INTO posts (title, description, content, tags, labels) VALUES (?, ?, ?, ?, ?)",
        [title, finalDescription, content, tagsStr, labelsStr],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            
            // Get the created post
            db.get("SELECT * FROM posts WHERE id = ?", [this.lastID], (err, row) => {
                if (err) {
                    return res.status(500).json({ success: false, error: err.message });
                }
                
                const post = {
                    id: row.id,
                    title: row.title,
                    description: cleanDescription(row.description),
                    content: row.content,
                    tags: row.tags ? row.tags.split(',') : [],
                    labels: row.labels ? row.labels.split(',') : [],
                    image: extractImageFromDescription(row.description),
                    date: row.created_at,
                    author: row.author
                };
                
                res.json({ success: true, post });
            });
        }
    );
});

// Update post (admin only)
app.put('/api/posts/:id', requireAdmin, (req, res) => {
    const { title, description, content, tags, labels } = req.body;
    
    // Combine image URL with description if provided separately
    let finalDescription = description;
    if (req.body.imageUrl) {
        finalDescription = `![Featured Image](${req.body.imageUrl}) ${description}`;
    }
    
    const tagsStr = Array.isArray(tags) ? tags.join(',') : tags;
    const labelsStr = Array.isArray(labels) ? labels.join(',') : labels;
    
    db.run(
        "UPDATE posts SET title = ?, description = ?, content = ?, tags = ?, labels = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [title, finalDescription, content, tagsStr, labelsStr, req.params.id],
        function(err) {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            
            if (this.changes === 0) {
                return res.status(404).json({ success: false, error: 'Post not found' });
            }
            
            // Get the updated post
            db.get("SELECT * FROM posts WHERE id = ?", [req.params.id], (err, row) => {
                if (err) {
                    return res.status(500).json({ success: false, error: err.message });
                }
                
                const post = {
                    id: row.id,
                    title: row.title,
                    description: cleanDescription(row.description),
                    content: row.content,
                    tags: row.tags ? row.tags.split(',') : [],
                    labels: row.labels ? row.labels.split(',') : [],
                    image: extractImageFromDescription(row.description),
                    date: row.created_at,
                    author: row.author
                };
                
                res.json({ success: true, post });
            });
        }
    );
});

// Delete post (admin only)
app.delete('/api/posts/:id', requireAdmin, (req, res) => {
    db.run("DELETE FROM posts WHERE id = ?", [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }
        
        res.json({ success: true, message: 'Post deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎉 QAVibe Blog Server (SQLite) running on http://localhost:${PORT}`);
    console.log(`📁 Database file: ${dbPath}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔐 Default admin password: admin123`);
    console.log(`🖼️  Photo format: Add image URLs in description using: ![Alt Text](image_url)`);
    console.log('');
    console.log('🚀 Ready to accept blog posts with image links!');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🔄 Closing database connection...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed.');
        }
        process.exit(0);
    });
});

module.exports = app;
