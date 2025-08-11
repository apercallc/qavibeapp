// Blog JavaScript Functionality - API Version
class BlogManager {
    constructor() {
        this.posts = [];
        this.isAdminMode = false;
        this.isLoggedIn = false;
        this.sessionId = null;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.apiBase = 'http://localhost:3001/api';
        
        // Check admin status and load posts
        this.checkAdminStatus();
        this.loadPosts();
        this.updateAdminUI();
    }
    
    // API Communication
    async makeRequest(url, options = {}) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers
            };
            
            if (this.sessionId) {
                headers.Authorization = `Bearer ${this.sessionId}`;
            }
            
            const response = await fetch(url, {
                ...options,
                headers
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            this.showNotification('Error: ' + error.message, 'error');
            throw error;
        }
    }
    
    // Load posts from API
    async loadPosts() {
        try {
            const data = await this.makeRequest(`${this.apiBase}/posts`);
            this.posts = data.posts || [];
            this.renderPosts();
        } catch (error) {
            console.error('Failed to load posts:', error);
            // Fallback to localStorage if API fails
            this.loadPostsFromStorage();
        }
    }
    
    // Fallback to localStorage (for development)
    loadPostsFromStorage() {
        const saved = localStorage.getItem('qavibe_blog_posts');
        if (saved) {
            this.posts = JSON.parse(saved);
        } else {
            this.posts = this.getSamplePosts();
        }
        this.renderPosts();
    }
    
    checkAdminStatus() {
        this.sessionId = localStorage.getItem('qavibe_admin_session');
        this.isLoggedIn = !!this.sessionId;
    }
    
    // Admin login
    async adminLogin(password) {
        try {
            const data = await this.makeRequest(`${this.apiBase}/admin/login`, {
                method: 'POST',
                body: JSON.stringify({ password })
            });
            
            this.sessionId = data.sessionId;
            this.isLoggedIn = true;
            localStorage.setItem('qavibe_admin_session', this.sessionId);
            this.updateAdminUI();
            this.showNotification('Admin login successful!', 'success');
            return true;
        } catch (error) {
            this.showNotification('Invalid admin password', 'error');
            return false;
        }
    }
    
    // Admin logout
    adminLogout() {
        this.sessionId = null;
        this.isLoggedIn = false;
        this.isAdminMode = false;
        localStorage.removeItem('qavibe_admin_session');
        this.updateAdminUI();
        this.showNotification('Logged out successfully', 'success');
    }
    
    // Post Management
    async createPost(postData) {
        try {
            const data = await this.makeRequest(`${this.apiBase}/posts`, {
                method: 'POST',
                body: JSON.stringify(postData)
            });
            
            this.showNotification('Post created successfully!', 'success');
            await this.loadPosts(); // Reload posts
            return data.post;
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    }
    
    async updatePost(postId, postData) {
        try {
            const data = await this.makeRequest(`${this.apiBase}/posts/${postId}`, {
                method: 'PUT',
                body: JSON.stringify(postData)
            });
            
            this.showNotification('Post updated successfully!', 'success');
            await this.loadPosts(); // Reload posts
            return data.post;
        } catch (error) {
            console.error('Failed to update post:', error);
        }
    }
    
    async deletePost(postId) {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }
        
        try {
            await this.makeRequest(`${this.apiBase}/posts/${postId}`, {
                method: 'DELETE'
            });
            
            this.showNotification('Post deleted successfully!', 'success');
            await this.loadPosts(); // Reload posts
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    }
    
    // Notification system
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.blog-notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `blog-notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Sample Posts
    getSamplePosts() {
        return [
            {
                id: Date.now() + 1,
                title: "Getting Started with Test Automation",
                description: "Learn the fundamentals of test automation and how to build robust testing pipelines for your applications.",
                content: "Test automation is essential for modern software development. In this comprehensive guide, we'll cover the basics of setting up automated tests, choosing the right tools, and implementing best practices for your testing strategy.\n\n## Why Test Automation?\n\nTest automation provides numerous benefits:\n- Faster feedback cycles\n- Consistent test execution\n- Improved test coverage\n- Cost reduction over time\n\n## Getting Started\n\nWhen beginning your automation journey, consider these key factors...",
                tags: ["automation", "testing", "beginners"],
                labels: ["tutorial", "guide"],
                date: new Date(Date.now() - 86400000).toISOString(),
                author: "QAVibe Team"
            },
            {
                id: Date.now() + 2,
                title: "TestFlux Dashboard: New Features Released",
                description: "Discover the latest features in TestFlux including enhanced reporting, custom dashboards, and improved CI/CD integration.",
                content: "We're excited to announce the latest update to TestFlux Dashboard! This release brings powerful new features that will streamline your testing workflow and provide better insights into your test results.\n\n## What's New\n\n### Enhanced Reporting\nOur new reporting engine provides more detailed insights...\n\n### Custom Dashboards\nCreate personalized dashboards that focus on the metrics that matter most to your team...\n\n### Improved CI/CD Integration\nSeamless integration with popular CI/CD platforms...",
                tags: ["testflux", "features", "dashboard"],
                labels: ["announcement", "news"],
                date: new Date(Date.now() - 172800000).toISOString(),
                author: "Product Team"
            },
            {
                id: Date.now() + 3,
                title: "StackHealth Scorecard: Measuring Code Quality",
                description: "Learn how to effectively use StackHealth scorecard platform to measure and improve your code quality metrics.",
                content: "Code quality is crucial for maintainable software. StackHealth provides comprehensive scorecards that help you track and improve various aspects of your codebase quality.\n\n## Key Metrics\n\nStackHealth tracks several important metrics:\n\n### Security Score\nIdentifies potential security vulnerabilities and provides recommendations for fixes.\n\n### Performance Score\nAnalyzes code performance patterns and suggests optimizations.\n\n### Maintainability Score\nEvaluates code complexity, documentation, and structural quality.\n\n## Implementation Guide\n\nTo get started with StackHealth scorecards...",
                tags: ["stackhealth", "quality", "metrics"],
                labels: ["tutorial", "guide"],
                date: new Date(Date.now() - 259200000).toISOString(),
                author: "QA Team"
            }
        ];
    }
    
    // Post Management (continued)
    async createOrUpdatePost(postData, editingId = null) {
        if (editingId) {
            return await this.updatePost(editingId, postData);
        } else {
            return await this.createPost(postData);
        }
    }
    
    // Filtering and Search
    filterPosts() {
        let filtered = [...this.posts];
        
        // Apply tag filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(post => 
                post.tags.some(tag => 
                    tag.toLowerCase().includes(this.currentFilter.toLowerCase())
                )
            );
        }
        
        // Apply search filter
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(term) ||
                post.description.toLowerCase().includes(term) ||
                post.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }
        
        return filtered;
    }
    
    // Rendering
    renderPosts() {
        const postsGrid = document.getElementById('postsGrid');
        const emptyState = document.getElementById('emptyState');
        const filtered = this.filterPosts();
        
        if (filtered.length === 0) {
            postsGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }
        
        postsGrid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        postsGrid.innerHTML = filtered.map(post => this.renderPost(post)).join('');
    }
    
    renderPost(post) {
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };
        
        const tagsHTML = post.tags.map(tag => 
            `<span class="post-tag">${tag}</span>`
        ).join('');
        
        const labelsHTML = post.labels.map(label => 
            `<span class="post-label ${label}">${label}</span>`
        ).join('');
        
        const adminActions = this.isAdminMode && this.isLoggedIn ? `
            <div class="post-admin-actions">
                <button class="admin-action" onclick="event.stopPropagation(); blogManager.editPost(${post.id})" title="Edit Post">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="admin-action delete" onclick="event.stopPropagation(); blogManager.deletePost(${post.id})" title="Delete Post">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        ` : '';
        
        return `
            <article class="post-card" onclick="blogManager.openPost(${post.id})">
                <div class="post-content">
                    <div class="post-meta">
                        <div class="post-date">
                            <i class="fas fa-calendar"></i>
                            ${formatDate(post.date)}
                        </div>
                        <div class="post-author">
                            <i class="fas fa-user"></i>
                            ${post.author}
                        </div>
                    </div>
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-description">${post.description}</p>
                    ${post.tags.length > 0 ? `<div class="post-tags">${tagsHTML}</div>` : ''}
                    ${post.labels.length > 0 ? `<div class="post-labels">${labelsHTML}</div>` : ''}
                    <div class="post-actions">
                        <a href="#" class="read-more" onclick="event.stopPropagation(); blogManager.openPost(${post.id})">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                        ${adminActions}
                    </div>
                </div>
            </article>
        `;
    }
    
    // Post Interaction
    openPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            this.showPostModal(post);
        }
    }
    
    showPostModal(post) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content post-modal">
                <div class="modal-header">
                    <h2>${post.title}</h2>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="post-modal-body">
                    <div class="post-meta">
                        <div class="post-date">
                            <i class="fas fa-calendar"></i>
                            ${new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                        <div class="post-author">
                            <i class="fas fa-user"></i>
                            ${post.author}
                        </div>
                    </div>
                    <div class="post-modal-content">
                        ${post.content.split('\\n').map(line => 
                            line.startsWith('#') ? 
                                `<h${line.indexOf(' ')}>${line.replace(/^#+\s/, '')}</h${line.indexOf(' ')}>` :
                                line.trim() ? `<p>${line}</p>` : '<br>'
                        ).join('')}
                    </div>
                    ${post.tags.length > 0 ? `
                        <div class="post-modal-tags">
                            <h4>Tags:</h4>
                            <div class="post-tags">
                                ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${post.labels.length > 0 ? `
                        <div class="post-modal-labels">
                            <h4>Labels:</h4>
                            <div class="post-labels">
                                ${post.labels.map(label => `<span class="post-label ${label}">${label}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
                ${this.isAdminMode ? `
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="blogManager.editPost(${post.id}); this.closest('.modal').remove();">
                            <i class="fas fa-edit"></i> Edit Post
                        </button>
                        <button class="btn btn-danger" onclick="blogManager.deletePost(${post.id}); this.closest('.modal').remove();">
                            <i class="fas fa-trash"></i> Delete Post
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    editPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            // Populate the form with existing post data
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postDescription').value = post.description;
            document.getElementById('postContent').value = post.content;
            document.getElementById('postTags').value = post.tags.join(', ');
            
            // Set labels
            const labelsSelect = document.getElementById('postLabels');
            Array.from(labelsSelect.options).forEach(option => {
                option.selected = post.labels.includes(option.value);
            });
            
            // Show modal and mark as editing
            document.getElementById('newPostModal').style.display = 'block';
            document.getElementById('newPostModal').setAttribute('data-editing', postId);
        }
    }
    
    // Admin Management
    updateAdminUI() {
        const adminControls = document.getElementById('adminControls');
        const postsGrid = document.getElementById('postsGrid');
        
        if (this.isLoggedIn) {
            adminControls.style.display = 'flex';
            
            // Update admin mode button
            const adminModeBtn = document.querySelector('[onclick="toggleAdminMode()"]');
            if (adminModeBtn) {
                if (this.isAdminMode) {
                    postsGrid.classList.add('admin-mode');
                    adminModeBtn.innerHTML = '<i class="fas fa-eye"></i> View Mode';
                    adminModeBtn.classList.add('active-admin-mode');
                } else {
                    postsGrid.classList.remove('admin-mode');
                    adminModeBtn.innerHTML = '<i class="fas fa-cog"></i> Admin Mode';
                    adminModeBtn.classList.remove('active-admin-mode');
                }
            }
            
            // Add logout button if not exists
            if (!document.getElementById('logoutBtn')) {
                const logoutBtn = document.createElement('button');
                logoutBtn.id = 'logoutBtn';
                logoutBtn.className = 'btn btn-secondary';
                logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
                logoutBtn.onclick = () => this.adminLogout();
                adminControls.appendChild(logoutBtn);
            }
        } else {
            adminControls.style.display = 'none';
            postsGrid.classList.remove('admin-mode');
            this.isAdminMode = false;
            
            // Remove logout button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.remove();
            }
        }
        
        // Re-render posts to show/hide admin actions
        this.renderPosts();
    }
}

// Global functions for HTML event handlers
function showAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'block';
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

async function adminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    const success = await blogManager.adminLogin(password);
    if (success) {
        closeAdminLogin();
    }
}

function showNewPostModal() {
    if (!blogManager.isLoggedIn) {
        showAdminLogin();
        return;
    }
    
    document.getElementById('newPostModal').style.display = 'block';
    document.getElementById('newPostModal').removeAttribute('data-editing');
    document.getElementById('newPostForm').reset();
}

function closeNewPostModal() {
    document.getElementById('newPostModal').style.display = 'none';
}

function toggleAdminMode() {
    if (!blogManager.isLoggedIn) {
        blogManager.showNotification('Please login as admin first', 'error');
        return;
    }
    
    blogManager.isAdminMode = !blogManager.isAdminMode;
    blogManager.updateAdminUI();
}

async function createPost(event) {
    event.preventDefault();
    
    const form = event.target;
    const modal = form.closest('.modal');
    const editingId = modal.getAttribute('data-editing');
    
    const postData = {
        title: document.getElementById('postTitle').value,
        description: document.getElementById('postDescription').value,
        content: document.getElementById('postContent').value,
        tags: document.getElementById('postTags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag),
        labels: Array.from(document.getElementById('postLabels').selectedOptions)
            .map(option => option.value)
    };
    
    try {
        await blogManager.createOrUpdatePost(postData, editingId);
        closeNewPostModal();
    } catch (error) {
        console.error('Failed to save post:', error);
    }
}

function showNewPostModal() {
    if (!blogManager.isLoggedIn) {
        showAdminLogin();
        return;
    }
    
    document.getElementById('newPostModal').style.display = 'block';
    document.getElementById('newPostModal').removeAttribute('data-editing');
    document.getElementById('newPostForm').reset();
}

function filterByTag(tag) {
    // Update active filter button
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Apply filter
    blogManager.currentFilter = tag;
    blogManager.renderPosts();
}

function filterPosts() {
    const searchInput = document.getElementById('searchInput');
    blogManager.searchTerm = searchInput.value;
    blogManager.renderPosts();
}

// Initialize blog when page loads
let blogManager;
document.addEventListener('DOMContentLoaded', function() {
    blogManager = new BlogManager();
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

// Mobile navigation (reuse from main site)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});
