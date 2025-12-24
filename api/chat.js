const express = require("express");
const router = express.Router(); // مه‌ ئه‌ڤه‌ گوهۆڕى بۆ Router دا دگه‌ل index.js بگونجیت
const { Groq } = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

// ل ڤێره‌ مه‌ ناڤێ ڕێكێ كورت كر بۆ '/' چونكى د index.js دا مه‌ پێشگرێ '/api/chat' یێ داناى
router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی، خەڵکی دهۆکی. زۆر بە کورتی و تەنها بە یەک ڕستە وەڵام بدەوە. 
                    یاسایێن توند: ١. تەنها ب بادینی باخڤە. ٢. ب چ ڕەنگەکی سۆرانی بەکارنەهێنە. ٣. بەرسڤێن درێژ نەدە.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: process.env.MODEL_NAME || "llama-3.3-70b-specdec",
            temperature: 0.1, // کێم کر بۆ هندێ بەرسڤ جێگیر و کورت بن
            max_tokens: 100 // سنوردار کر دا بەرسڤێن درێژ نەدەت
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

module.exports = router; // مه‌ ئه‌ڤه‌ گوهۆڕى دا index.js بشێت وێ بخوینیت
