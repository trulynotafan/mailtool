const express = require('express');
const path = require('path');
const ContactProcessor = require('./services/contactProcessor');
const AIService = require('./services/aiService');
const EmailService = require('./services/emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Test connection route
app.post('/test-connection', async (req, res) => {
    console.log('Testing email connection...');
    const { email, appPassword } = req.body;

    if (!email || !appPassword) {
        return res.status(400).json({
            success: false,
            error: 'Email and app password are required'
        });
    }

    try {
        const emailService = new EmailService({ email, appPassword });
        const isConnected = await emailService.testConnection();

        if (isConnected) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                error: 'Could not establish connection with Gmail'
            });
        }
    } catch (error) {
        console.error('Connection test error:', error);
        res.json({
            success: false,
            error: error.message
        });
    }
});

// Process contacts route
app.post('/process-contacts', async (req, res) => {
    console.log('Processing new request...');
    
    try {
        const { contacts } = req.body;
        
        // Get credentials from config instead of request
        const config = require('./config/config');
        const credentials = {
            email: config.email.user,
            appPassword: config.email.pass
        };

        if (!credentials.email || !credentials.appPassword) {
            return res.status(400).json({
                success: false,
                error: 'Email credentials not configured in environment variables'
            });
        }

        // Initialize services with credentials from config
        const emailService = new EmailService(credentials);
        const aiService = new AIService();

        const inputData = Array.isArray(req.body) ? req.body : [req.body];
        const processedContacts = ContactProcessor.processContacts(inputData);
        
        if (processedContacts.length === 0) {
            return res.json({
                success: true,
                results: [],
                message: 'No valid contacts found to process'
            });
        }

        const results = [];
        
        // Process contacts one at a time
        for (const contact of processedContacts) {
            try {
                console.log(`\nProcessing contact: ${contact.name}`);
                
                // Generate AI template with cooldown
                console.log('Generating email template...');
                const enhancedContact = await aiService.enhanceContactData(contact);
                
                // Wait between AI generation and email sending
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Send email
                console.log('Sending email...');
                await emailService.sendEmail(enhancedContact);
                
                results.push({
                    contact: contact.email,
                    status: 'success',
                    businessName: contact.name,
                    businessType: contact.type
                });

                // Wait before processing next contact
                await new Promise(resolve => setTimeout(resolve, 3000));
                
            } catch (error) {
                console.error(`Error processing ${contact.email}:`, error);
                results.push({
                    contact: contact.email,
                    status: 'failed',
                    businessName: contact.name,
                    businessType: contact.type,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            results,
            totalProcessed: results.length,
            successful: results.filter(r => r.status === 'success').length
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 