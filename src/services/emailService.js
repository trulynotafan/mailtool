const nodemailer = require('nodemailer');

class EmailService {
    constructor(credentials) {
        this.credentials = credentials;
        this.portIndex = 0;
        this.ports = [587, 465, 25];
        this.emailCount = 0;
        this.maxEmailsPerPort = 15;
        this.createTransporter();
    }

    createTransporter() {
        const port = this.ports[this.portIndex];
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: port,
            secure: port === 465,
            auth: {
                user: this.credentials.email,
                pass: this.credentials.appPassword
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000
        });
    }

    rotateConnection() {
        this.portIndex = (this.portIndex + 1) % this.ports.length;
        this.emailCount = 0;
        this.createTransporter();
        console.log(`Rotating to port ${this.ports[this.portIndex]}`);
    }

    async sendEmail(contact) {
        if (!contact.emailTemplate && !contact.personalizedTemplate) {
            throw new Error('Email template is missing');
        }

        const template = contact.emailTemplate || contact.personalizedTemplate;
        const emailContent = {
            from: this.transporter.options.auth.user,
            to: contact.email,
            subject: `Partnership Opportunity with ${contact.name}`,
            text: template,
            html: template.replace(/\n/g, '<br>')
        };

        let retries = 3;
        while (retries > 0) {
            try {
                // Check if we need to rotate
                if (this.emailCount >= this.maxEmailsPerPort) {
                    this.rotateConnection();
                }

                const result = await this.transporter.sendMail(emailContent);
                this.emailCount++;
                
                // Add random delay between emails (2-5 seconds)
                const delay = 30000;
                await new Promise(resolve => setTimeout(resolve, delay));
                
                return result;
            } catch (error) {
                console.error(`Attempt ${4 - retries} failed:`, error.message);
                retries--;

                if (retries > 0) {
                    // Rotate connection on failure
                    this.rotateConnection();
                    // Wait 5 seconds before retry
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } else {
                    throw error;
                }
            }
        }
    }

    async testConnection() {
        try {
            await this.transporter.verify();
            return true;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    }
}

module.exports = EmailService; 
