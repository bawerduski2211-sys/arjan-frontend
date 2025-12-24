// فایلێ api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('تنێ POST');

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
          {"role": "system", "content": "بەرسڤێ ب زمانێ کوردی بادینی بدە و گەلەک یێ هاریکار بە."},
          {"role": "user", "content": prompt}
        ]
      })
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "کێشەیەک هەبوو، کلیلێ بپشکنە" });
  }
}
