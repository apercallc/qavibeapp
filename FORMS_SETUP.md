# QAVibe Support & Demo Forms Setup

## Overview
This implementation adds professional support and demo request forms with Slack integration and CAPTCHA protection.

## Features ✨

### 🆘 Support Form (`/support.html`)
- **Professional form** with all necessary fields
- **Priority levels** (Low, Medium, High, Urgent)
- **Product selection** (TestFlux, StackHealth, Both, General)
- **Environment details** for troubleshooting
- **Real-time form validation**
- **Slack webhook integration**

### 🎯 Demo Request Form (Modal)
- **Enhanced demo modal** with structured fields
- **Timeframe selection** for scheduling
- **Detailed needs assessment**
- **Product interest tracking**
- **Slack webhook integration**

### 🛡️ Security Features
- **Google reCAPTCHA v2** integration
- **Server-side validation**
- **Form data sanitization**
- **Rate limiting ready**

## Quick Setup 🚀

### 1. Install Dependencies
```bash
npm install axios dotenv
```

### 2. Configure Environment Variables
Update your `.env` file with:

```bash
# Slack Webhooks
SLACK_SUPPORT_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SUPPORT/WEBHOOK
SLACK_DEMO_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/DEMO/WEBHOOK

# Google reCAPTCHA
RECAPTCHA_SITE_KEY=your-site-key-here
RECAPTCHA_SECRET_KEY=your-secret-key-here
```

### 3. Set Up Slack Webhooks

#### For Support Requests:
1. Go to your Slack workspace
2. Navigate to Apps > Incoming Webhooks
3. Create a new webhook for your support channel
4. Copy the webhook URL to `SLACK_SUPPORT_WEBHOOK_URL`

#### For Demo Requests:
1. Create another webhook for your sales/demo channel
2. Copy the webhook URL to `SLACK_DEMO_WEBHOOK_URL`

### 4. Set Up Google reCAPTCHA
1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Create a new site (reCAPTCHA v2)
3. Add your domains (localhost for dev, your domain for prod)
4. Copy Site Key to `RECAPTCHA_SITE_KEY`
5. Copy Secret Key to `RECAPTCHA_SECRET_KEY`

### 5. Update reCAPTCHA Site Keys
Replace `your-site-key-here` in these files with your actual site key:
- `/public/index.html` (line with `data-sitekey`)
- `/public/support.html` (line with `data-sitekey`)

### 6. Start the Servers
```bash
# Start all services (API, Blog, Frontend)
./start.sh

# OR start individually:
npm run api:start    # API server on port 3001
npm run blog:start   # Blog server on port 3001
npm run serve        # Frontend on port 8002
```

## Usage 📋

### Support Form
- Visit: `http://localhost:8002/support.html`
- Fill out the form with issue details
- Complete CAPTCHA verification
- Submit to receive Slack notification

### Demo Request
- Click "Get a Demo" button on any page
- Fill out the modal form
- Complete CAPTCHA verification  
- Submit to receive Slack notification

## Slack Message Format 💬

### Support Request Notification:
```
🆘 New Support Request

Name: John Doe
Email: john@company.com
Company: ABC Corp
Product: TestFlux - Test Results Dashboard
Priority: HIGH
Subject: Dashboard not loading

Message:
The TestFlux dashboard shows a blank page when I try to access it...

Environment:
Chrome 118, Windows 11, TestFlux v2.1

Submitted: 8/10/2025, 10:30:15 PM
```

### Demo Request Notification:
```
🎯 New Demo Request

Name: Jane Smith  
Email: jane@startup.com
Company: XYZ Startup
Product Interest: Both Products
Timeframe: This week

Testing Needs:
We're looking to implement automated testing for our CI/CD pipeline...

[Schedule Demo] (button with pre-filled email)

Submitted: 8/10/2025, 10:45:22 PM
```

## API Endpoints 🔌

### POST `/api/support-request`
**Purpose:** Handle support form submissions
**Fields:** firstName, lastName, email, company, product, priority, subject, message, environment, recaptcha

### POST `/api/demo-request`  
**Purpose:** Handle demo request submissions
**Fields:** firstName, lastName, email, company, product, message, timeframe, recaptcha

### GET `/api/health`
**Purpose:** Health check endpoint
**Response:** `{"status": "OK", "timestamp": "..."}`

## File Structure 📁

```
/server/
  └── api-server.js          # Express server for form handling

/public/
  ├── support.html           # Support form page
  ├── index.html             # Updated with demo modal
  ├── styles.css             # Form styling
  └── script.js              # Form handlers

/.env                        # Environment configuration
/package.json               # Updated dependencies
/start.sh                   # Updated startup script
```

## Customization 🎨

### Form Fields
- Add/remove fields in HTML forms
- Update validation in JavaScript
- Modify Slack message format in `api-server.js`

### Styling
- Form styles in `/public/styles.css` 
- Look for `.support-form-section` and `.form-group` classes
- Responsive design included

### Error Handling
- Client-side validation with visual feedback
- Server-side validation with proper error responses
- CAPTCHA verification with user-friendly messages

## Production Deployment 🚀

### Environment Setup
1. Set production Slack webhook URLs
2. Set production reCAPTCHA keys for your domain
3. Update CSP headers for reCAPTCHA domains
4. Configure reverse proxy for API endpoints

### Security Considerations
- Rate limiting on form endpoints
- Input sanitization (already implemented)
- HTTPS enforcement for production
- Environment variable protection

## Troubleshooting 🔧

### Common Issues
- **CAPTCHA not loading:** Check site key and CSP headers
- **Form not submitting:** Check API server is running on port 3001
- **Slack not receiving:** Verify webhook URLs and test manually
- **CORS errors:** Ensure API server has proper CORS configuration

### Testing
```bash
# Test API health
curl http://localhost:3001/api/health

# Test support endpoint (without CAPTCHA)
curl -X POST http://localhost:3001/api/support-request \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","product":"testflux","priority":"low","subject":"Test","message":"Test message"}'
```

## Next Steps 🎯

1. **Set up your Slack webhooks**
2. **Configure reCAPTCHA keys**
3. **Update site keys in HTML files**
4. **Test the forms locally**
5. **Deploy to production**

The forms are now ready to receive support requests and demo inquiries with professional Slack notifications! 🎉
