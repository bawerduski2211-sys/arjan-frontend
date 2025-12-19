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

    if (!message) return res.status(400).json({ reply: "تشتەکێ بنڤێسە برا." });

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Professor Arjan, a wise expert from Duhok.
                    
                    CRITICAL INSTRUCTION:
                    1. ALWAYS respond in Bahdini Kurdish (Duhok dialect).
                    2. Be logical and stay on topic. If the user says "چەوانی", just say "ئەز باشم سوپاس، تۆ چەوانی؟".
                    3. Do NOT talk about Chinese kings or irrelevant history unless asked.
                    4. Use simple, clear, and professional Badini.
                    5. You are an expert in Science, Math, History, and Tech.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            // ل ڤێرێ ئەڤی مۆدێلی بکاربینە، زۆر ژ یێ تە زیرەکترە
            model: "llama-3.3-70b-specdec", 
            temperature: 0.1, // ئەڤە زۆر گرنگە! وێ نزم بکە دا "دین" نەبیت
            max_tokens: 500
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ئاریشەیەکا تەکنیكی هەئی برا." });
    }
});

module.exports = app;
