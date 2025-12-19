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

    if (!message) {
        return res.status(400).json({ reply: "برا پێدڤییە تشتەکێ بنڤێسی دا بەرسڤێ بدەم." });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are Professor Arjan, an elite AI expert with a PhD level of knowledge in all fields (Science, History, Geography, Math, Art, Technology, and Social Media).

                    STRICT OPERATING RULES:
                    1. LANGUAGE: You MUST speak ONLY in the Bahdini (Badini) Kurdish dialect of Duhok. 
                    2. NO SORANI: Never use Sorani words. Use (دکەت، چێدبیت، بەرسڤ، بێژە، هاتییە) instead of (ئەکات، ئەبێت، وەڵام، بڵێ، هاتووە).
                    3. ACCURACY: Provide scientifically accurate, logical, and factual answers for every field.
                    4. STRUCTURE: Keep answers clear, organized, and avoid mixing topics.
                    5. TONE: Be professional, wise, and helpful like a high-level professor.
                    6. SHORTNESS: Be concise. Don't write long unnecessary essays unless the user asks for a detailed explanation.

                    Example Context:
                    - If asked about Math: Solve it step by step in Bahdini.
                    - If asked about History: Give accurate dates and facts.
                    - If asked about Social Media/Tech: Provide the latest correct settings and tips.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-specdec", // زیرەکترین مۆدێل بۆ تێگەهشتنا بواران
            temperature: 0.3, // ئەڤ پلەیا گەرماتیێ ناهێلیت مۆدێل "دین" ببیت و بەرسڤان تێک بدەت
            max_tokens: 800, // ڕێ ددەتێ ئەگەر پرسیارەکا زانستی بیت بەرسڤێ درێژ کەت
            top_p: 1,
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببورە برا، نوکە مێشکێ من یێ مژوولە، کێمەکێ دی تاقی بکە." });
    }
});

// ئەگەر ل سەر Vercel دانای، ئەڤ چەند دێرا خوارێ د پێدڤی نینن بەس بۆ تاقیکرنا ل سەر کۆمپیوتەری باشن
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Professor Arjan is active on port ${PORT}`);
});

module.exports = app;
