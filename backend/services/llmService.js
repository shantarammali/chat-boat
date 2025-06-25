const axios = require('axios');
const { OpenAI } = require('openai');
//const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Set your API key in environment variables
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Make sure your API key is set in your environment
});

async function chatWithOpenAI(messages, model = 'gpt-3.5-turbo') {
    try {
        // const response = await axios.post(
        //     OPENAI_API_URL,
        //     {
        //         model,
        //         messages, // [{role: 'user', content: 'Hello!'}]
        //     },
        //     {
        //         headers: {
        //             'Authorization': `Bearer ${OPENAI_API_KEY}`,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,///[{ role: 'user', content: prompt }],
            max_tokens: 100,
        });
         if (response && response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
        } else {
            throw new Error('No choices returned from OpenAI API');
        }
    } catch (error) {
        console.error('OpenAI API error:', error.response?.data || error.message);
        throw new Error('Failed to communicate with OpenAI API');
    }
}

module.exports = { chatWithOpenAI };