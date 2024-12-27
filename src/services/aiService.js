const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
    constructor() {
        const config = require('../config/config');
        this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    }

    async enhanceContactData(contact) {
        try {
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            
            const prompt = `Write a professional outreach email:
            FROM: Afaan at ForgeWeb
            TO: ${contact.name} (${contact.type})
            
            Key points to include:
            - Introduce yourself as Afaan from ForgeWeb (forgeweb.uk)
            - Express interest in their ${contact.type} business
            - Offer web development and digital solutions to enhance their online presence
            - Keep it personal and specific to their business type
            - Include forgeweb.uk as the website reference
            - Keep it concise (2-3 short paragraphs)
            - End with a clear call to action to visit forgeweb.uk

            Make it sound natural and conversational, not like a template.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const template = response.text();

            return {
                ...contact,
                emailTemplate: template
            };
        } catch (error) {
            console.error('AI Template Generation Error:', error);
            throw new Error('Failed to generate email template');
        }
    }
}

module.exports = AIService; 