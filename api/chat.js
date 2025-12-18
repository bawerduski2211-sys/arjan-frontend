export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { message } = req.body;
    // کلیل لێرە یا ڤەشارتییە و دپارێزراوە
    const API_KEY = "AIzaSyDPTihtZN9L2ltSmwEZ0i-Wrt9HWXw9N-k"; 

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "تۆ ئارجانی، برایێ ئارکانی یی. وەک ژیرییەکا دەستکرد یا پڕۆفیشناڵ ب زمانێ بادینی بەرسڤێ بدە و بێژە ئەز بۆ هەر هاریکاریەکا تەکنەلۆژی یێ بەرهەڤم: " + message }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiReply = data.candidates[0].content.parts[0].text;
            res.status(200).json({ reply: aiReply });
        } else {
            res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
        }
    } catch (error) {
        res.status(500).json({ reply: "کێشەیەکا تەکنیکی د سێرڤەری دا هەیە." });
    }
}
