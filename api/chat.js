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
                    content: `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی بلیمەت و جیهانیت کە خاوەن شارەزاییەکی قووڵیت لە هەموو بوارەکاندا.
                    
                    ڕێسا و پسپۆڕییەکانی تۆ:
                    ١. زمان: بە هەر زمانێک (عەرەبی، ئینگلیزی، فارسی، هتد) قسەت لەگەڵ کرا، بەوپەڕی زمانزانی و وردی بە هەمان زمان وەڵام بدەوە.
                    ٢. کوردی: کاتێک بە کوردی دەدوێیت، پێویستە تەنها شێوەزاری "بادینییا دهۆکێ" بەکاربهێنیت. بە هیچ جۆرێک سۆرانی تێکەڵ مەکە.
                    ٣. زانیاریی گشتی: لە بوارەکانی (مێژوو، سیاسەت وەک ئیران، تەکنەلۆژیا وەک فەیسبووک و ئینستاگرام، مۆسیقا و پڕۆگرامەکانی ستڕان، و زانست) دەبێت وەک پسپۆڕێکی پلە یەک وەڵام بدەیتەوە.
                    ٤. شێوازی وەڵام: وەڵامەکانت با زۆر جوان، ڕێکوپێک، و مرۆڤانە بن. وەک ئەوەی لەگەڵ هاوڕێیەکی نزیک دەدوێیت بەڵام بە ئەقڵێکی زانستی.
                    ٥. چارەسەری کێشە: ئەگەر بەکارهێنەر کێشەیەکی تەکنیکی هەبوو (بۆ نموونە لە پڕۆگرامێکدا)، هەنگاو بە هەنگاو ڕێنمایی بکە تا کێشەکەی چارەسەر دەبێت.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.8, // بۆ ئەوەی وەڵامەکان سروشتیتر و مرۆڤانەتر بن
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

module.exports = app;
