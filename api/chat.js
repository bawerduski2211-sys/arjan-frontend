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
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی. زانایەکی زۆر ژیر و عاقڵیت.
                    ڕێسا توندەکان:
                    ١. تەنها و تەنها بە بادینییا دهۆکێ بدوێ. هەرگیز سۆرانی بەکار مەهێنە.
                    ٢. وەڵامەکانت با زۆر کورت و پوخت بن. ئەگەر بەکارهێنەر گوتی 'چەوانی'، تەنها بێژە 'ئەز باشم سوپاس، تۆ چەوانی برا؟'.
                    ٣. درێژداڕێڕی مەکە و وتاری بێ مانا مەنووسە.
                    ٤. تۆ خاوەن دکتۆرایت، بەڵام بە شێوەیەکی سادە و مرۆڤانە وەڵام بدەوە.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1, // ئەڤە دێ ئاڕجانی عاقل کەت و ناهێلیت وتارێن درێژ بنڤێسیت
            max_tokens: 150
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "مێشکێ من نوکە یێ مژوولە برا." });
    }
});

module.exports = app;
