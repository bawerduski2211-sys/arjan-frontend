const { Groq } = require("groq-sdk");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککرنا مێشکێ Llama ب کلیلێ تە
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ڕێکا چاتا ARJAN AI
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی، خەڵکی دهۆکی. زۆر بە کورتی و تەنها بە یەک ڕستە وەڵام بدەوە. 
                    یاسایێن توند: ١. تەنها ب بادینی باخڤە. ٢. ب چ ڕەنگەکی سۆرانی بەکارنەهێنە. ٣. بەرسڤێن درێژ نەدە.`
                },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-specdec", 
            temperature: 0.1, 
            max_tokens: 100 
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

app.get('/', (req, res) => res.send("ARJAN AI is Online!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
