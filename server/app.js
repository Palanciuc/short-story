const express = require('express');
const cors = require('cors');
const app = express();
const { generateStory } = require('./openaiIntegration');

app.use(express.json());
app.use(cors());

app.post('/generate-story', async (req, res) => {
    const { genre, characterName, time, location, environment } = req.body;

    let prompt = `Create a short story in the ${genre} genre. `;
    prompt += `The story features a character named ${characterName}, `;
    prompt += `set in ${time} at ${location}. `;
    prompt += `The environment is described as ${environment}. `;
    prompt += '\n\nStory: ';

    try {
        const story = await generateStory(prompt);
        res.status(200).json({ story });
    } catch (error) {
        console.error('Error generating story:', error);
        res.status(500).json({ error: 'Error generating story' });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
