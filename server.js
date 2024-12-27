const express = require('express');
const path = require('path');
const ContactProcessor = require('./src/services/contactProcessor');
const TemplateService = require('./src/services/templateService');
const EmailService = require('./src/services/emailService');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const config = require('./src/config/config');
const emailService = new EmailService({
    email: config.email.user,
    appPassword: config.email.pass
});
const templateService = new TemplateService();

app.post('/process-contacts', async (req, res) => {
    try {
        console.clear();
        console.log('\x1b[1m%s\x1b[0m', '\n=== Starting Email Campaign ===\n');
        console.log('Received data:', req.body);

        const inputData = Array.isArray(req.body) ? req.body : [req.body];
        console.log('Input data:', inputData);

        const processedContacts = ContactProcessor.processContacts(inputData);
        console.log('Processed contacts:', processedContacts);

        if (processedContacts.length === 0) {
            console.log('\x1b[33m%s\x1b[0m', 'No valid contacts found to process');
            return res.json({
                success: true,
                results: [],
                message: 'No valid contacts found to process'
            });
        }

        console.log('\x1b[36m%s\x1b[0m', `Total contacts to process: ${processedContacts.length}\n`);
        const results = [];
        let successCount = 0;
        let failCount = 0;

        // Process each contact
        for (let i = 0; i < processedContacts.length; i++) {
            const contact = processedContacts[i];
            console.log('\x1b[36m%s\x1b[0m', `[${i + 1}/${processedContacts.length}] Processing contact:`);
            console.log(`Name: ${contact.name}`);
            console.log(`Type: ${contact.type}`);
            console.log(`Email: ${contact.email}`);

            try {
                // Get template and send email
                const personalizedTemplate = templateService.getTemplate(contact.name, contact.type);
                const enhancedContact = { ...contact, personalizedTemplate };
                
                console.log('\nSending email...');
                await emailService.sendEmail(enhancedContact);
                
                // Log success
                console.log('\x1b[32m%s\x1b[0m', '✓ Email sent successfully!\n');
                successCount++;
                
                results.push({
                    contact: contact.email,
                    status: 'success',
                    businessName: contact.name,
                    businessType: contact.type
                });

                // Cooldown period (except for last contact)
                if (i < processedContacts.length - 1) {
                    console.log('\x1b[33m%s\x1b[0m', 'Cooling down for 3 seconds...');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    console.log('\n' + '-'.repeat(50) + '\n');
                }

            } catch (error) {
                // Log failure
                console.log('\x1b[31m%s\x1b[0m', `✗ Failed: ${error.message}\n`);
                failCount++;
                
                results.push({
                    contact: contact.email,
                    status: 'failed',
                    businessName: contact.name,
                    businessType: contact.type,
                    error: error.message
                });

                // Cooldown period (except for last contact)
                if (i < processedContacts.length - 1) {
                    console.log('\x1b[33m%s\x1b[0m', 'Cooling down for 3 seconds...');
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    console.log('\n' + '-'.repeat(50) + '\n');
                }
            }
        }

        // Campaign summary
        console.log('\x1b[1m%s\x1b[0m', '\n=== Campaign Complete ===');
        console.log('\x1b[36m%s\x1b[0m', `Total Processed: ${results.length}`);
        console.log('\x1b[32m%s\x1b[0m', `Successful: ${successCount}`);
        console.log('\x1b[31m%s\x1b[0m', `Failed: ${failCount}\n`);

        return res.json({
            success: true,
            results,
            totalProcessed: results.length,
            successful: successCount
        });

    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Server error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; 