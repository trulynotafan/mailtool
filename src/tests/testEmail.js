require('dotenv').config();
const EmailService = require('../services/emailService');

async function testEmailService() {
    const emailService = new EmailService();
    
    try {
        console.log('Testing email connection...');
        await emailService.testConnection();
        
        console.log('Sending test email...');
        await emailService.sendEmail({
            email: 'your-test-email@example.com',
            name: 'Test Business',
            personalizedTemplate: 'This is a test email.'
        });
        
        console.log('Test completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testEmailService(); 