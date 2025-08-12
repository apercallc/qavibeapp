const fs = require('fs').promises;
const path = require('path');

async function generateCombinedChangelog() {
    try {
        const changelogDir = './documentation/docs/changelogs';
        const outputPath = './public/changelog.html';
        
        // Read individual changelogs
        const testfluxChangelog = await readChangelog(`${changelogDir}/testflux-changelog.md`);
        const stackhealthChangelog = await readChangelog(`${changelogDir}/stackhealth-changelog.md`);
        
        // Parse and combine entries
        const allEntries = [
            ...parseChangelogEntries(testfluxChangelog, 'TestFlux'),
            ...parseChangelogEntries(stackhealthChangelog, 'StackHealth')
        ];
        
        // Sort by date (newest first)
        allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Generate HTML
        const html = generateChangelogHTML(allEntries);
        
        // Write to public directory
        await fs.writeFile(outputPath, html);
        
        // Also generate JSON for frontend filtering
        const jsonPath = './public/changelog-data.json';
        await fs.writeFile(jsonPath, JSON.stringify(allEntries, null, 2));
        
        console.log('✅ Combined changelog generated successfully');
        console.log(`📝 Total entries: ${allEntries.length}`);
        console.log(`📅 Latest entry: ${allEntries[0]?.date || 'None'}`);
        
    } catch (error) {
        console.error('❌ Error generating changelog:', error);
        process.exit(1);
    }
}

async function readChangelog(filePath) {
    try {
        return await fs.readFile(filePath, 'utf8');
    } catch (error) {
        console.warn(`⚠️  Could not read ${filePath}: ${error.message}`);
        return '';
    }
}

function parseChangelogEntries(content, product) {
    const entries = [];
    const lines = content.split('\n');
    let currentEntry = null;
    
    for (const line of lines) {
        // Match version headers like ## [1.2.3] - 2025-08-10 or ## Unreleased - 2025-08-10
        const versionMatch = line.match(/^##\s*\[?([^\]]+)\]?\s*-\s*(\d{4}-\d{2}-\d{2})/);
        
        if (versionMatch) {
            if (currentEntry) {
                entries.push(currentEntry);
            }
            
            currentEntry = {
                product,
                version: versionMatch[1],
                date: versionMatch[2],
                content: [],
                raw: line
            };
        } else if (currentEntry && line.trim()) {
            currentEntry.content.push(line);
        }
    }
    
    if (currentEntry) {
        entries.push(currentEntry);
    }
    
    return entries;
}

function generateChangelogHTML(entries) {
    const productColors = {
        'TestFlux': '#007acc',
        'StackHealth': '#28a745'
    };
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QAVibe - Product Changelog</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .changelog-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .filter-controls {
            margin: 20px 0;
            text-align: center;
        }
        .filter-btn {
            padding: 8px 16px;
            margin: 0 5px;
            border: 2px solid #ddd;
            background: white;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        .filter-btn.active {
            background: #007acc;
            color: white;
            border-color: #007acc;
        }
        .changelog-entry {
            margin: 20px 0;
            border-left: 4px solid #ddd;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 0 5px 5px 0;
        }
        .changelog-entry.testflux {
            border-left-color: ${productColors.TestFlux};
        }
        .changelog-entry.stackhealth {
            border-left-color: ${productColors.StackHealth};
        }
        .entry-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .product-tag {
            padding: 4px 8px;
            border-radius: 3px;
            color: white;
            font-size: 0.8em;
            font-weight: bold;
        }
        .product-tag.testflux {
            background: ${productColors.TestFlux};
        }
        .product-tag.stackhealth {
            background: ${productColors.StackHealth};
        }
        .entry-date {
            color: #666;
            font-size: 0.9em;
        }
        .entry-version {
            font-size: 1.1em;
            font-weight: bold;
            color: #333;
        }
        .entry-content {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <!-- Navigation will be injected here -->
    <div class="changelog-container">
        <h1>Product Changelog</h1>
        <p>Latest updates and releases for TestFlux and StackHealth</p>
        
        <div class="filter-controls">
            <button class="filter-btn active" data-filter="all">All Products</button>
            <button class="filter-btn" data-filter="testflux">TestFlux</button>
            <button class="filter-btn" data-filter="stackhealth">StackHealth</button>
        </div>
        
        <div class="changelog-entries">
            ${entries.map(entry => `
                <div class="changelog-entry ${entry.product.toLowerCase()}" data-product="${entry.product.toLowerCase()}">
                    <div class="entry-header">
                        <div>
                            <span class="product-tag ${entry.product.toLowerCase()}">${entry.product}</span>
                            <span class="entry-version">${entry.version}</span>
                        </div>
                        <div class="entry-date">${formatDate(entry.date)}</div>
                    </div>
                    <div class="entry-content">
                        ${entry.content.map(line => `<p>${line}</p>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <script>
        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter entries
                document.querySelectorAll('.changelog-entry').forEach(entry => {
                    if (filter === 'all' || entry.dataset.product === filter) {
                        entry.style.display = 'block';
                    } else {
                        entry.style.display = 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Run the script
generateCombinedChangelog();
