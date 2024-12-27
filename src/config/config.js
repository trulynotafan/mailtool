require('dotenv').config();

// Debug log to check environment variables
console.log('Loading environment variables:', {
    hasGmailUser: !!process.env.GMAIL_USER,
    hasGmailPass: !!process.env.GMAIL_APP_PASSWORD
});

const config = {
    email: {
        user: 'contactforgeweb@gmail.com',
        pass: 'xgscvifxulbsidzv'
    },
    gemini: {
        apiKey: 'AIzaSyCMazkYW6pBzgiMH-iqUwyz1lmz8FQSpXY'
    }
};

// Validate config
if (!config.email.user || !config.email.pass) {
    console.error('Missing email credentials in config');
}

module.exports = config; 