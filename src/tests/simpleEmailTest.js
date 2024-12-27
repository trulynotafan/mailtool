require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    console.log('Starting email test...');
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    console.log('Testing connection...');
    try {
        await transporter.verify();
        console.log('Connection successful!');

        // Try sending a test email
        const info = await transporter.sendMail({
            from: `"Test" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to yourself
            subject: "Test Email",
            text: "If you see this, the email service is working!"
        });

        console.log('Test email sent:', info.messageId);
    } catch (error) {
        console.error('Error:', error);
        console.log('Environment variables:');
        console.log('GMAIL_USER:', process.env.GMAIL_USER ? 'Set' : 'Not set');
        console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'Set' : 'Not set');
    }
}

testEmail(); 