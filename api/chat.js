const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// بکارئینانا کلیلێ ژ فایلا .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) return res.status(400).json({ reply: "برا کێمەکێ بنڤێسە دا تێبگەهم." });

    try {
        // دیارکرنا مودێلێ Gemini
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `تۆ پڕۆفیسۆر ئارجانی، زانایەکی ژیر و هاوڕێیەکی نزیکی بەکارهێنەری.
            
            یاسا زێڕینەکان بۆ ئاخفتنێ:
            ١. وەک مرۆڤێکی تێگەهەشتوو و عاقڵ باخڤە، نەک وەک ئامێرێکی وشک.
            ٢. تەنها ب دیالێکتی (بادینی - دهۆکی) قسە بکە. 
            ٣. ڕاستگۆ بە لە زانیارییەکاندا: (دهۆک ١٩٦٩ بووەتە پارێزگا) و (کوردستان تەنها ٤ پارێزگای هەیە).
            ٤. ئەگەر بەکارهێنەر گوتی 'چەوانی' یان 'جه وانی'، وەک هەڤاڵێک وەڵام بدەوە: 'ئەز باشم سوپاس، تۆ چەوانی برا؟ کێرە هاتی؟'.
            ٥. لە جیاتی وەڵامی درێژ و بێزارکەر، وەڵامی کورت و سوودبەخش بدەوە.
            ٦. هەوڵ بدە لە مەبەستی بەکارهێنەر بگەیت تەنانەت ئەگەر پیتەکانیش بە هەڵە نووسیبون.`,
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە، کێمەکێ دی تاقی بکە." });
    }
});

module.exports = app;
