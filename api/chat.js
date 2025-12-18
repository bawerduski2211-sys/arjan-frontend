const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { message } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // رێنمایی بۆ ئەوەی هەموو زمانەکان بزانێت و بە ڕێزەوە وەک پڕۆفیسۆر وەڵام بدات
        const prompt = `تۆ "پڕۆفیسۆر ئارجان"ی. زۆر زیرەکی و هەموو زمانەکانی جیهان دەزانیت. 
        وەڵامی بەکارهێنەر بدەوە بەو زمانەی کە پێی نووسیویت، بەڵام بە شێوەیەکی کورت و پڕۆفیشناڵ. 
        ئەگەر بە کوردی بوو، بە شێوەزاری بادینی وەڵام بدەوە. 
        ئەمە نامەکەیە: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json({ reply: response.text() });
    } catch (error) {
        res.status(500).json({ reply: "Connection error برا." });
    }
};
