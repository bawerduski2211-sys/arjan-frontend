const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    // ڕێکخستنا CORS بۆ هندێ سایتێ تە بشێت پەیوەندیێ ب مێشکی بکەت
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { message } = req.body;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // فەرمانا تەمام: دا وەک مروڤ و ب بادینی بەرسڤێ بدەت و بەرسڤێن کۆن دووبارە نەکەت
        const prompt = `تۆ ئێستا "ئارجان"ی، گەنجێکی ١٨ ساڵی زۆر زیرەک و هاوڕێیەکی نزیکی. 
        پێویستە تەنها بە زمانی کوردی (شێوەزاری بادینی) وەڵام بدەیتەوە. 
        وەڵامەکانت با زۆر کورت، دۆستانە و مرۆڤانە بن. 
        هەرگیز وەڵامە کۆنەکان دووبارە مەکەرەوە.
        ئەمە نامەی هاوڕێکەتە: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
};
