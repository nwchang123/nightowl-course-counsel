// server.js
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// FastGPT API
const FASTGPT_API_KEY = 'fastgpt-Y1SjglZWm9aKJtipDuKWWmqzIlMG1IanCmm00VMq02lpRDvQiWcC7G1daXd';
const FASTGPT_API_URL = 'https://api.fastgpt.in/api/v1/chat/completions';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        // use FastGPT API
        const response = await axios.post(FASTGPT_API_URL, {
            chatId: '100',
            stream: false,
            detail: false,
            messages: [
                {
                    content: message,
                    role: 'user'
                }
            ]
        }, {
            headers: {
                Authorization: `Bearer ${FASTGPT_API_KEY}`
            }
        });

        const responseData = response.data;
        console.log('Response data received from FastGPT API:', responseData);

        let botMessage = '';

        if (responseData && Array.isArray(responseData.choices)) {
            const choices = responseData.choices;
            console.log('Choices:', choices);
        
            if (choices.length > 0) {
                botMessage = choices[0].message.content;
            } else {
                console.error('Response data does not contain any choices:', responseData);
            }
        } else {
            console.error('Response data is invalid:', responseData);
        }

        console.log('Extracted NightOwl reply:', botMessage);

        // Send the NightOwl reply to the client
        res.json({ reply: botMessage });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
