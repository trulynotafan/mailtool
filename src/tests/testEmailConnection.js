require('dotenv').config();
const EmailService = require('../services/emailService');

async function testEmailConnection() {
    console.log('Starting email service test...');
    console.log('Email:', process.env.GMAIL_USER);
    
    const emailService = new EmailService();

    try {
        // Test connection
        console.log('\nTesting SMTP connection...');
        await emailService.testConnection();

        // Try sending a test email
        console.log('\nSending test email...');
        await emailService.sendEmail({
            email: process.env.GMAIL_USER, // Send to self
            name: 'Test',
            personalizedTemplate: 'This is a test email.'
        });

        console.log('\nTest completed successfully!');
    } catch (error) {
        console.error('\nTest failed:', error);
    }
}

testEmailConnection(); 