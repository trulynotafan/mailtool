const _ = require('lodash');

class ContactProcessor {
    static validateContact(contact) {
        // Detailed logging of incoming contact
        console.log('Raw contact data:', JSON.stringify(contact, null, 2));

        // Extract required fields
        const email = contact.email;
        const name = contact.name;
        const type = contact.type;

        console.log('Extracted values:', {
            email: email || 'NOT FOUND',
            name: name || 'NOT FOUND',
            type: type || 'NOT FOUND'
        });

        const isValid = Boolean(name && email);
        console.log('Is valid?:', isValid);

        const result = {
            isValid: isValid,
            contact: {
                name: name,
                email: email,
                type: type,
                phone: contact.phone || ''
            }
        };

        console.log('Final validation result:', JSON.stringify(result, null, 2));
        return result;
    }

    static processContacts(inputData) {
        try {
            console.log('========= START PROCESSING =========');
            console.log('Input data type:', typeof inputData);
            console.log('Is array?:', Array.isArray(inputData));
            console.log('Raw input:', JSON.stringify(inputData, null, 2));

            // Ensure we're working with an array and it's not empty
            if (!inputData) {
                console.error('No input data provided');
                return [];
            }

            const contacts = Array.isArray(inputData) ? inputData : [inputData];
            console.log('Number of contacts to process:', contacts.length);

            const processedContacts = contacts
                .map(contact => {
                    console.log('Processing contact:', contact.name);
                    return this.validateContact(contact);
                })
                .filter(result => {
                    console.log('Filtering contact:', result);
                    return result.isValid;
                })
                .map(result => {
                    console.log('Mapping validated contact:', result);
                    return result.contact;
                });

            console.log('Final processed contacts:', JSON.stringify(processedContacts, null, 2));
            console.log('========= END PROCESSING =========');
            
            return processedContacts;
        } catch (error) {
            console.error('Processing error:', error);
            throw new Error(`Error processing contacts: ${error.message}`);
        }
    }
}

module.exports = ContactProcessor; 