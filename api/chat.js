const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).json({ reply: "تەنێ POST قبوولە" });

    const { message } = req.body;
    const API_KEY = "AIzaSyDPTihtZN9L2ltSmwEZ0i-Wrt9HWXw9N-k"; 

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "تۆ ئارجان دۆسکی یی، برایێ ئارکانی یی. ب زمانێ بادینی بەرسڤێ بدە: " + message }] }]
            })
        });

        const data = await response.json();
        const aiReply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: aiReply });
    } catch (error) {
        res.status(500).json({ reply: "کێشە د پەیوەندییا مێشکی دا هەیە." });
    }
};
