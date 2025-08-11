# Rate Limiting Implementation - QAVibe

## Overview

QAVibe now includes comprehensive rate limiting to protect against abuse and ensure fair usage of our API endpoints and blog system.

## Implementation Details

### API Server Rate Limiting (server/api-server.js)

#### General API Rate Limiting
- **Window**: 15 minutes (configurable via `RATE_LIMIT_WINDOW_MS`)
- **Max Requests**: 10 per window (configurable via `RATE_LIMIT_MAX_REQUESTS`)
- **Applied to**: All `/api/*` endpoints

#### Support Form Rate Limiting
- **Window**: 1 hour (configurable via `SUPPORT_RATE_LIMIT_WINDOW_MS`)
- **Max Requests**: 3 per window (configurable via `SUPPORT_RATE_LIMIT_MAX_REQUESTS`)
- **Applied to**: `/api/support-request` endpoint
- **Reason**: Prevents spam support requests

#### Demo Request Rate Limiting
- **Window**: 24 hours (configurable via `DEMO_RATE_LIMIT_WINDOW_MS`)
- **Max Requests**: 2 per window (configurable via `DEMO_RATE_LIMIT_MAX_REQUESTS`)
- **Applied to**: `/api/demo-request` endpoint
- **Reason**: Limits demo requests to genuine prospects

### Blog Server Rate Limiting (server/blog-server-db.js)

#### Login Rate Limiting
- **Window**: 15 minutes (configurable via `LOGIN_RATE_LIMIT_WINDOW_MS`)
- **Max Attempts**: 5 per window (configurable via `LOGIN_RATE_LIMIT_MAX_ATTEMPTS`)
- **Applied to**: `/api/admin/login` endpoint
- **Reason**: Prevents brute force login attacks

#### Blog API Rate Limiting
- **Window**: 5 minutes (configurable via `BLOG_RATE_LIMIT_WINDOW_MS`)
- **Max Requests**: 30 per window (configurable via `BLOG_RATE_LIMIT_MAX_REQUESTS`)
- **Applied to**: All blog `/api/*` endpoints
- **Reason**: Prevents excessive API usage

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# General API rate limiting (all endpoints)
RATE_LIMIT_WINDOW_MS=900000              # 15 minutes in ms
RATE_LIMIT_MAX_REQUESTS=10               # 10 requests per window

# Support form rate limiting (stricter)
SUPPORT_RATE_LIMIT_WINDOW_MS=3600000     # 1 hour in ms
SUPPORT_RATE_LIMIT_MAX_REQUESTS=3        # 3 requests per window

# Demo request rate limiting (strictest)
DEMO_RATE_LIMIT_WINDOW_MS=86400000       # 24 hours in ms
DEMO_RATE_LIMIT_MAX_REQUESTS=2           # 2 requests per window

# Blog login rate limiting (security focused)
LOGIN_RATE_LIMIT_WINDOW_MS=900000        # 15 minutes in ms
LOGIN_RATE_LIMIT_MAX_ATTEMPTS=5          # 5 attempts per window

# Blog API rate limiting (moderate)
BLOG_RATE_LIMIT_WINDOW_MS=300000         # 5 minutes in ms
BLOG_RATE_LIMIT_MAX_REQUESTS=30          # 30 requests per window
```

## HTTP Headers

When rate limiting is active, the following headers are included in responses:

- `X-RateLimit-Limit`: Maximum requests allowed in the window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit window resets

## Rate Limit Responses

### Success Response (within limits)
```json
{
  "success": true,
  "data": "..."
}
```

### Rate Limit Exceeded (429 status)
```json
{
  "error": "Too many requests, please try again later"
}
```

## Production Recommendations

### Recommended Limits by Environment

#### Development
- More lenient limits for testing
- Shorter windows for faster testing

#### Production
- Stricter limits for security
- Longer windows to accommodate real usage patterns

### Monitoring

Monitor these metrics in production:
1. Rate limit hit rates by endpoint
2. Number of requests blocked
3. Geographic distribution of rate-limited requests
4. Time patterns of rate limit triggers

### Customization by Use Case

#### High-Traffic Sites
Increase limits but maintain security:
```bash
RATE_LIMIT_MAX_REQUESTS=50
BLOG_RATE_LIMIT_MAX_REQUESTS=100
```

#### Security-Focused Deployments
Decrease limits for tighter security:
```bash
LOGIN_RATE_LIMIT_MAX_ATTEMPTS=3
SUPPORT_RATE_LIMIT_MAX_REQUESTS=1
```

## Testing Rate Limits

Use the included test script:
```bash
node test-rate-limiting.js
```

Or test manually with curl:
```bash
# Test multiple requests to trigger limit
for i in {1..12}; do
  curl -s -w "Status: %{http_code}\\n" http://localhost:3002/api/health
  sleep 1
done
```

## Security Benefits

1. **DDoS Protection**: Prevents overwhelming the server with requests
2. **Brute Force Prevention**: Limits login attempts to prevent password attacks
3. **Resource Conservation**: Ensures fair usage among all users
4. **Spam Prevention**: Reduces spam support requests and demo requests
5. **Cost Control**: Limits potential abuse that could increase hosting costs

## Troubleshooting

### Rate Limits Too Strict
If legitimate users are being blocked:
1. Increase the `MAX_REQUESTS` values
2. Decrease the `WINDOW_MS` values for faster reset
3. Monitor usage patterns and adjust accordingly

### Rate Limits Too Lenient
If you're still seeing abuse:
1. Decrease the `MAX_REQUESTS` values
2. Increase the `WINDOW_MS` values for longer penalties
3. Consider implementing IP-based blocking for repeat offenders

### Testing Issues
If tests fail:
1. Ensure servers are running on correct ports
2. Check that environment variables are loaded
3. Verify express-rate-limit package is installed
4. Review server logs for error messages

## Logging

Rate limit events are logged to console:
```
Rate limit exceeded for 192.168.1.100 on /api/support-request
```

In production, configure proper logging to capture these events for analysis.
