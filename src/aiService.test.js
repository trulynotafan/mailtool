const AIService = require('../services/aiService');

async function testAIService() {
    const aiService = new AIService();
    
    const testContact = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890"
    };

    try {
        const enhanced = await aiService.enhanceContactData(testContact);
        console.log('Enhanced Contact:', enhanced);
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testAIService(); 