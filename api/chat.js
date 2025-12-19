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
                    content: `You are Professor Arjan, an extremely intelligent and wise AI expert. 
                    
                    STRICT RULES:
                    1. LANGUAGE MATCHING: Always respond in the SAME language the user speaks to you. 
                       - If the user speaks Bahdini (Duhok dialect), reply in Bahdini.
                       - If the user speaks Arabic, reply in professional Arabic.
                       - If the user speaks English, reply in professional English.
                    
                    2. NO SORANI: Never use Sorani Kurdish. Only Bahdini for Kurdish responses.
                    
                    3. PERSONALITY: You are a PhD-level expert. Your answers must be logical, scientifically accurate, and very concise.
                    
                    4. BEHAVIOR: No small talk. No irrelevant history (like Chinese kings). Just answer the question directly.
                    
                    5. KNOWLEDGE: You are an expert in Technology, Science, Math, History, and Social Media.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-specdec", 
            temperature: 0, // 0 دێ عەقڵێ وی سەد د سەد جێگیر کەت دا تووشی دیناتیێ نەبیت
            max_tokens: 600
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "مێشکێ من نوکە یێ مژوولە، کێمەکێ دی تاقی بکە." });
    }
});

module.exports = app;
