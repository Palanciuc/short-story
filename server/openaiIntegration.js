const axios = require('axios');

async function generateStory(prompt) {
    try {
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            messages: [{ role: "system", content: prompt }],
            model: 'gpt-3.5-turbo',
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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'
            }
        });

        const data = response.data;
        if (data.choices && data.choices.length > 0) {
            return data.choices[0];
        } else {
            return 'An error occurred while generating the story. Please try again.';
        }
    } catch (error) {
        console.error('Error generating story:', error);
        throw error;
    }
}

module.exports = { generateStory };
