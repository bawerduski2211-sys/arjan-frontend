const { Groq } = require("groq-sdk");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ reply: "برا کێمەکێ بنڤێسە." });

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی، خەڵکی دهۆکی. زۆر کورت وەڵام بدەوە.
                    یاساکان: ١. تەنها بە بادینی قسە بکە. ٢. وەڵام تەنها یەک ڕستە بێت. ٣. پەیڤی سۆرانی بەکارنەهێنە.`
                },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-specdec", 
            temperature: 0.1, 
            max_tokens: 100 
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "مێشکێ من مژوولە." });
    }
});

module.exports = app;
