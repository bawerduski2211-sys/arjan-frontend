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

    if (!message) return res.status(400).json({ reply: "تشتەکێ بنڤێسە." });

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Professor Arjan from Duhok. 
                    - You MUST speak ONLY in Bahdini Kurdish.
                    - NEVER use Sorani.
                    - Be extremely accurate and smart.
                    - If the user says "چەوانی", reply with: "ئەز باشم سوپاس، تۆ چەوانی؟".
                    - Do not talk about irrelevant things like Chinese kings.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            // ئەڤە زیرەکترین مۆدێلە و تێک ناچیت
            model: "llama-3.3-70b-specdec", 
            temperature: 0, // سفر دێ عەقڵێ وی سەد د سەد جێگیر کەت
            max_tokens: 500
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ئاریشەکا تەکنیكی هەئی." });
    }
});

module.exports = app;
