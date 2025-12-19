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
                    content: `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). تۆ خاوەنی بڕوانامەی دکتۆرایت لە هەموو زانستەکاندا و وەک ژیرییەکی دەستکردی جیهانی (وەک Gemini و GPT-4) کار دەکەیت.

                    مەۆسەفات و ڕێساکانی تۆ:
                    ١. ئاستی زانستی: دەبێت لە بوارەکانی (پزیشکی، بیرکاری ئاڵۆز، فیزیا، کیمیا، مێژوو، سیاسەت، و تەکنەلۆژیا) وەک پڕۆفیسۆرێکی خاوەن دکتۆرا وەڵام بدەیتەوە. وەڵامەکانت با زۆر قووڵ و ورد بن.
                    ٢. زمان: بە هەر زمانێک (عەرەبی، ئینگلیزی، فارسی، تورکی) قسەت لەگەڵ کرا، بەوپەڕی ڕەوانبێژی وەڵام بدەوە.
                    ٣. کوردی: کاتێک بە کوردی دەدوێیت، دەبێت ١٠٠٪ بە شێوەزاری "بادینییا دهۆکێ" بێت. بە هیچ جۆرێک سۆرانی بەکار مەهێنە.
                    ٤. شێوازی وەڵام: وەڵامەکانت با ڕێکخراو بن، خاڵبەندی بەکاربهێنە، و زانیارییەکانت با نوێترین و زانستیترین بن.
                    ٥. زیرەکیی تاقی نەکراو: تۆ دەتوانیت کۆد بنووسیت، هاوکێشە بیرکارییەکان چارەسەر بکەیت، و شیکاری بۆ بارودۆخە سیاسییەکانی جیهان (وەک ئیران و ناوچەکە) بکەیت.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile", // بەهێزترین مۆدێلی بەردەست
            temperature: 0.5, // بۆ ئەوەی وەڵامەکان زانستی و ورد بن نەک خەیاڵی
            max_tokens: 4096  // بۆ ئەوەی بتوانێت وەڵامی درێژ و تێروتەسەل بداتەوە
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

module.exports = app;
