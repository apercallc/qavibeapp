const express = require('express');
const multer = require('multer');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting configuration
const createLimiter = (windowMs, max, message) => rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        console.log(`Rate limit exceeded for ${req.ip} on ${req.path}`);
        res.status(429).json({ error: message });
    }
});

// Different rate limits for different endpoints
const generalLimiter = createLimiter(
    parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10, // 10 requests per window
    'Too many requests, please try again later'
);

const supportLimiter = createLimiter(
    parseInt(process.env.SUPPORT_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000, // 1 hour
    parseInt(process.env.SUPPORT_RATE_LIMIT_MAX_REQUESTS) || 3, // 3 support requests per hour
    'Too many support requests. Please wait before submitting another request'
);

const demoLimiter = createLimiter(
    parseInt(process.env.DEMO_RATE_LIMIT_WINDOW_MS) || 24 * 60 * 60 * 1000, // 24 hours
    parseInt(process.env.DEMO_RATE_LIMIT_MAX_REQUESTS) || 2, // 2 demo requests per day
    'Demo request limit reached. Please try again tomorrow'
);

// Apply general rate limiting to all API routes
app.use('/api', generalLimiter);

// Serve static files
app.use(express.static('public'));

// reCAPTCHA verification function
async function verifyRecaptcha(token) {
    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: token
            }
        });
        return response.data.success;
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
}

// Support request endpoint
app.post('/api/support-request', supportLimiter, upload.none(), async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            company,
            product,
            priority,
            subject,
            message,
            environment,
            recaptcha
        } = req.body;

        // Verify reCAPTCHA
        if (!recaptcha || !await verifyRecaptcha(recaptcha)) {
            return res.status(400).json({ error: 'Invalid CAPTCHA verification' });
        }

        // Validate required fields
        if (!firstName || !lastName || !email || !product || !priority || !subject || !message) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        // Create Slack message
        const slackMessage = {
            text: "🆘 New Support Request",
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🆘 New Support Request"
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Name:* ${firstName} ${lastName}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Email:* ${email}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Company:* ${company || 'Not provided'}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Product:* ${product}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Priority:* ${priority.toUpperCase()}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Subject:* ${subject}`
                        }
                    ]
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Message:*\n${message}`
                    }
                }
            ]
        };

        if (environment) {
            slackMessage.blocks.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*Environment:*\n${environment}`
                }
            });
        }

        slackMessage.blocks.push({
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `Submitted: ${new Date().toLocaleString()}`
                }
            ]
        });

        // Send to Slack
        await axios.post(process.env.SLACK_SUPPORT_WEBHOOK_URL, slackMessage);

        res.json({ success: true, message: 'Support request submitted successfully' });
    } catch (error) {
        console.error('Support request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Demo request endpoint
app.post('/api/demo-request', demoLimiter, upload.none(), async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            company,
            product,
            message,
            timeframe,
            recaptcha
        } = req.body;

        // Verify reCAPTCHA
        if (!recaptcha || !await verifyRecaptcha(recaptcha)) {
            return res.status(400).json({ error: 'Invalid CAPTCHA verification' });
        }

        // Validate required fields
        if (!firstName || !lastName || !email || !product || !message) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        // Create Slack message
        const slackMessage = {
            text: "🎯 New Demo Request",
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🎯 New Demo Request"
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*Name:* ${firstName} ${lastName}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Email:* ${email}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Company:* ${company || 'Not provided'}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Product Interest:* ${product}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*Timeframe:* ${timeframe || 'Not specified'}`
                        }
                    ]
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Testing Needs:*\n${message}`
                    }
                },
                {
                    type: "actions",
                    elements: [
                        {
                            type: "button",
                            text: {
                                type: "plain_text",
                                text: "Schedule Demo"
                            },
                            style: "primary",
                            url: `mailto:${email}?subject=QAVibe Demo - ${product}&body=Hi ${firstName},%0D%0A%0D%0AThank you for your interest in ${product}. Let's schedule a demo...`
                        }
                    ]
                },
                {
                    type: "context",
                    elements: [
                        {
                            type: "mrkdwn",
                            text: `Submitted: ${new Date().toLocaleString()}`
                        }
                    ]
                }
            ]
        };

        // Send to Slack
        await axios.post(process.env.SLACK_DEMO_WEBHOOK_URL, slackMessage);

        res.json({ success: true, message: 'Demo request submitted successfully' });
    } catch (error) {
        console.error('Demo request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.API_PORT || 3002;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
