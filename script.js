// 1. Supabase Config - گرێدانا داتابەیسێ (کلیلێن تە یێن دروست)
const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Digital Clock - کارکرنا سەعەتێ ب کاتی دهۆک و هەولێر
function updateClock() {
    const saetElement = document.getElementById('saet');
    if (saetElement) {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false, 
            timeZone: 'Asia/Baghdad' 
        };
        saetElement.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    }
}
setInterval(updateClock, 1000);
updateClock();

// 3. Neon Mode Toggle - کارکرنا دوگمەیا نێئۆن (بێ دەستکاری د ستایلی دا)
function toggleNeonMode() {
    document.body.classList.toggle('neon-active');
}

// 4. Send Message & VIP AI Image - ناردنا نامەیێ و وێنەیێ AI
async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const message = document.getElementById('user-message').value;

    // پشکنینا خانێن فالە
    if(!name || !email || !message) {
        alert("تکایە خانێن سەرەکی پڕ بکە!");
        return;
    }

    // ناردن بۆ Supabase
    const { data, error } = await _supabase
        .from('messages')
        .insert([{ 
            full_name: name, 
            email: email, 
            phone: phone, 
            message_body: message 
        }]);

    if (error) {
        alert("ئاریشەک هەبوو: " + error.message);
    } else {
        // دروستکرنا وێنەیێ AI (بێی کو دیزاین تێک بچیت)
        const seed = Math.floor(Math.random() * 100000);
        const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(message)}?width=600&height=400&seed=${seed}&model=flux`;
        
        // نیشاندانا وێنەی ل شوونا فۆرمێ (تەنێ د ناڤ وێ چوارچۆڤێ دا)
        const formDiv = document.getElementById('arjan-secure-form');
        formDiv.innerHTML = `
            <div style="text-align:center; padding: 10px;">
                <h4 style="color:#D4AF37; font-family:'Orbitron';">MESSAGE SENT!</h4>
                <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37; box-shadow: 0 0 15px rgba(212,175,55,0.3); margin-top:10px;">
                <p style="color:#888; font-size:0.8rem; margin-top:8px;">VIP AI Generation System</p>
                <button onclick="location.reload()" style="margin-top:15px; background:#D4AF37; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer; font-weight:bold;">NEW MESSAGE</button>
            </div>
        `;
    }
}
