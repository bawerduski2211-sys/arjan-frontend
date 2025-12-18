const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
    // ڕێپێدان ب CORS بۆ ئەوەی Frontend بشێت پەیوەندیێ پێ بکەت
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ reply: "تەنێ POST قبوولە" });

    const { message } = req.body;
    const API_KEY = "AIzaSyDPTihtZN9L2ltSmwEZ0i-Wrt9HWXw9N-k"; 

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "تۆ ئارجان دۆسکی یی، برایێ ئارکانی یی. ب زمانێ بادینی بەرسڤێ بدە. هەر پسیارەکا هاتە کرن ب شێوەیەکێ زانستی و پڕۆفیسۆرانە بەرسڤێ بدە: " + message }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            const aiReply = data.candidates[0].content.parts[0].text;
            res.status(200).json({ reply: aiReply });
        } else {
            res.status(200).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە، کێمەکا دی تاقی بکەڤە." });
        }
    } catch (error) {
        res.status(500).json({ reply: "کێشە د پەیوەندییا مێشکی دا هەیە." });
    }
};
