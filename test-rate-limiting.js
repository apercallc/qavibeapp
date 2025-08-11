#!/usr/bin/env node

const http = require('http');

// Test function to make HTTP requests
function makeRequest(port, path, method = 'GET') {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: port,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });

        req.on('error', reject);
        req.end();
    });
}

async function testRateLimiting() {
    console.log('🧪 Testing Rate Limiting...\n');
    
    try {
        // Test API server health endpoint (should work)
        console.log('1. Testing API server health endpoint...');
        const healthResponse = await makeRequest(3002, '/api/health');
        console.log(`   Status: ${healthResponse.statusCode}`);
        console.log(`   Body: ${healthResponse.body}`);
        console.log(`   Rate Limit Headers: ${healthResponse.headers['x-ratelimit-limit'] || 'None'}\n`);

        // Test multiple requests to trigger rate limiting
        console.log('2. Testing rate limiting (making multiple requests)...');
        for (let i = 1; i <= 12; i++) {
            try {
                const response = await makeRequest(3002, '/api/health');
                console.log(`   Request ${i}: Status ${response.statusCode} (Remaining: ${response.headers['x-ratelimit-remaining'] || 'N/A'})`);
                
                // If we get a 429, we've hit the rate limit
                if (response.statusCode === 429) {
                    console.log(`   ✅ Rate limiting triggered at request ${i}!`);
                    console.log(`   Response: ${response.body}`);
                    break;
                }
            } catch (error) {
                console.log(`   Request ${i}: Error - ${error.message}`);
            }
            
            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log('\n3. Testing blog server...');
        const blogResponse = await makeRequest(3001, '/api/posts');
        console.log(`   Blog Status: ${blogResponse.statusCode}`);
        console.log(`   Rate Limit Headers: ${blogResponse.headers['x-ratelimit-limit'] || 'None'}`);

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run tests
testRateLimiting();
