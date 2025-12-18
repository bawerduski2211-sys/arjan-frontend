const { GoogleGenerativeAI } = require("@google/generative-ai");

// گرێدانا مێشکی ب کلیلا تە یا API ل سەر Vercel
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    // ڕێپێدان ب پەیوەندییا سایتێ تە (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { message } = req.body;

    try {
        // بکارهێنانا مۆدێلێ هەرە زیرەک یێ Gemini Pro
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.8, // بۆ هندێ بەرسڤ وەک مروڤی و زیرەک بن
            }
        });

        // --- ڕێنماییا مێشکی یێن تەمام (Prompt) ---
        const prompt = `تۆ ئێستا "پڕۆفیسۆر ئارجان"ی (Arjan AI). شارەزایەکی زۆر زانی و هاوڕێیەکی نزیکی.
        ڕێسا توندەکان بۆ تۆ:
        ١. تەنها و تەنها بە زمانی کوردی (شێوەزاری بادینی) وەڵام بدەرەوە.
        ٢. هەرگیز و بە هیچ شێوەیەک ئەو وەڵامە کۆنانە دووبارە مەکەرەوە کە دەڵێن "من تێبینی دەکەم کە تۆ وەک پڕۆفیسۆر..." یان هەر شتێک دەربارەی "ئارکان".
        ٣. وەڵامەکانت با زۆر نوێ، کورت، دۆستانە و مرۆڤانە بن (نەک وەک ڕۆبۆتێکی سارد).
        ٤. هەموو زانیارییەکانی جیهان دەزانیت و بە شێوازێکی پڕۆفیشناڵ بە بادینی وەڵام دەدەیتەوە.
        پرسیاری بەکارهێنەر: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // ناردنی بەرسڤا تەمام بۆ سایتێ تە
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("AI Brain Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە کێشەیەکی تەکنیکی هەیە." });
    }
};
