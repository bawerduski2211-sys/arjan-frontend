const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // ڕێکخستنا CORS بۆ ئەوەی ڕووکار بشێت نامان بنێریت
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [{ "role": "user", "content": prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json({ text: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: "کێشەیەک د سێرڤەری دا هەیە" });
    }
};
