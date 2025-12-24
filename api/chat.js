// فایلێ: api/chat.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'تنێ داخوازیا POST قبوولە' });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-flash-1.5", 
        "messages": [
          {
            "role": "system", 
            "content": "تە وەک شارەزایەکێ زمانێ کوردی بادینی بەرسڤێ بدە. بەرسڤێن تە کورت و ب مفابن."
          },
          {
            "role": "user", 
            "content": prompt
          }
        ]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "کێشەیەک د پەیوەندیێ دا هەبوو" });
  }
}
