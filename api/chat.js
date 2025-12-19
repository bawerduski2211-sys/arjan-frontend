const { Groq } = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async (req, res) => {
    // ڕێپێدان ب CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { message } = req.body;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی بلیمەت و جیهانیت.
                    ڕێسا و پسپۆڕییەکانی تۆ:
                    ١. زمان: بە هەر زمانێک قسەت لەگەڵ کرا، بە هەمان زمان وەڵام بدەوە.
                    ٢. کوردی: تەنها شێوەزاری "بادینییا دهۆکێ" بەکاربهێنیت. بە هیچ جۆرێک سۆرانی تێکەڵ مەکە.
                    ٣. زانیاری: لە هەموو بوارەکان (مێژوو، تەکنەلۆژیا، مۆسیقا) وەک پسپۆڕ وەڵام بدەوە.
                    ٤. شێواز: زۆر جوان، ڕێکوپێک، و وەک هاوڕێیەکی نزیک بە ئەقڵێکی زانستی بدوێ.`
                },
                { role: "user", content: message }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.8,
        });

        res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ ئارجانی نوکە یێ مژوولە." });
    }
};
