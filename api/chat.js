const { Groq } = require("groq-sdk");
require('dotenv').config();

// چالاککرنا Groq ب وێ کلیلێ تە ل سەر Vercel دانیای
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async (req, res) => {
    // ڕێکخستنێن CORS بۆ هندێ چات کار بکەت
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // بکارئینانا مۆدێلێ Llama یێ تە ل سەر Vercel جێگیرکری
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "تۆ ئێستا 'ئارجان'ی (ARJAN AI). پڕۆفیسۆرێکی زۆر زانا و هاوڕێیەکی نزیکی. تەنها بە زمانی کوردی (بادینی) وەڵام بدەرەوە. وەڵامەکانت با کورت و زیرەک و مرۆڤانە بن."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: process.env.MODEL_NAME || "llama-3.3-70b-versatile",
        });

        const text = completion.choices[0].message.content;
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من (ئارجان) نوکە یێ مژوولە." });
    }
};
