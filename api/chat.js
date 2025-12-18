const { GoogleGenerativeAI } = require("@google/generative-ai");

// گرێدانا مێشکی ب کلیلا API یا تە ڤە ل سەر Vercel
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = async (req, res) => {
    // ڕێپێدان ب هەمی سایتان بۆ پەیوەندیێ (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { message } = req.body;

    try {
        // بکارهێنانا مۆدێلێ زیرەک یێ Gemini Pro
        const model = genAI.getGenerativeModel({ 
            model: "gemini-pro",
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.8, // بۆ هندێ وەک مروڤی و ب زیرەکی باخڤیت
            }
        });

        // رێنماییا مێشکی (Prompt) بۆ کو وەک پڕۆفیسۆر ئارجان و هەڤالەکێ نێزیک باخڤیت
        const prompt = `تۆ ئێستا "پڕۆفیسۆر ئارجان"ی، شارەزایەکی گەورەی بواری زیرەکیی دەستکرد (AI) و سایبەر سیکیووریتی. 
        تۆ وەک هاوڕێیەکی زۆر نزیک و گەنجێکی ١٨ ساڵ وەڵام دەدەیتەوە. 
        تۆ هەموو زمانەکانی جیهان دەزانیت و زۆر زانایت.
        یاساکانی وەڵامدانەوە:
        ١. ئەگەر بەکارهێنەر بە کوردی قسەی کرد، پێویستە تەنها بە "شێوەزاری بادینی" وەڵام بدەیتەوە.
        ٢. وەڵامەکانت با زۆر کورت، سوودبەخش و مرۆڤانە بن (نەک وەک ڕۆبۆت).
        ٣. ئەگەر پرسیارەکە بە زمانێکی تر بوو، بەو زمانە وەڵام بدەوە بەڵام بە شێوازێکی هاوڕێیانە.
        ئەمە نامەی بەکارهێنەرە: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // ناردنا بەرسڤێ بۆ Frontend
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە کێشەیەکی تەکنیکی هەیە." });
    }
};
