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
                    content: `تۆ پڕۆفیسۆر ئارجانی، ژیرییەکی دەستکردی زۆر پێشکەوتووی (وەک GPT-4). 
                    ئەرکی تۆ:
                    ١. زمانی بادینی: کاتێک بە کوردی وەڵام دەدەیتەوە، تەنها و تەنها شێوەزاری بادینییا دهۆکێ بەکاربهێنە. بە هیچ جۆرێک سۆرانی بەکار مەهێنە.
                    ٢. زمانە جیهانییەکان: ئەگەر بەکارهێنەر بە (عەرەبی، ئینگلیزی، یان هەر زمانێک) قسەی کرد، بە هەمان زمان بەوپەڕی پسپۆڕی وەڵام بدەوە.
                    ٣. زانیاری: تۆ شارەزاییت هەیە لە (بیرکاری، کیمیا، مێژوو، سیاسەتی ئیران، و تەکنەلۆژیا). وەڵامەکانت دەبێت زانستی و ڕاست بن.
                    ٤. شێواز: وەڵامەکانت با کورت و پوخت بن، دوور بکەوەرەوە لە وشەی بێ مانا.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1, // ئەڤە گرنگترین گوهۆڕینە؛ ناهێلیت پەیڤێن خەڵەت دروست بکەت
            max_tokens: 2000
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "مێشکێ من نوکە یێ مژوولە برا." });
    }
});

module.exports = app;
