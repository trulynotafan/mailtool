require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');

async function verifyConfigurations() {
    console.log('\n=== Configuration Verification ===\n');

    // Check Gemini API Key
    console.log('Checking Gemini API Key...');
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyA0W2JKh4h2waj-5tIz0wIyRuTKZTl_ALo');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        console.log('✅ Gemini API Key is valid');
    } catch (error) {
        console.error('❌ Gemini API Key error:', error.message);
    }

    // Check Email Configuration
    console.log('\nChecking Email Configuration...');
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                 user: 'contactforgeweb@gmail.com',
                 pass: 'mcmidwnpiimgsjve'
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000, // 10 seconds
            greetingTimeout: 5000,    // 5 seconds
            socketTimeout: 10000      // 10 seconds
        });

        await transporter.verify();
        console.log('✅ Email configuration is valid');
    } catch (error) {
        console.error('❌ Email configuration error:', error.message);
    }

    console.log('\n=== Verification Complete ===\n');
}

verifyConfigurations().catch(console.error); 