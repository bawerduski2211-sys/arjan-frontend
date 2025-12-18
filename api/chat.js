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
        
        // رێنماییا تایبەت تەنێ بۆ پڕۆژێ ئارجان
        const prompt = `تۆ ئێستا "ئارجان"ی (ARJAN AI). پڕۆفیسۆرێکی زۆر زانا و هاوڕێیەکی نزیکی. 
        تەنها بە زمانی کوردی (شێوەزاری بادینی) وەڵام بدەرەوە. 
        تکایە بە هیچ شێوەیەک باسی "ئارکان" مەکە، چونکە ئەمە پڕۆژەیەکی ترە. 
        وەڵامەکانت با کورت و زیرەک و مرۆڤانە بن. 
        نامەی بەکارهێنەر: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.status(200).json({ reply: response.text() });
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من (ئارجان) نوکە یێ مژوولە." });
    }
};
