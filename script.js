// 1. گرێدانا داتابەیسێ
const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. کاتژمێر ب کاتی دهۆکێ (7 سەعەت چاک بوون)
function updateClock() {
    const el = document.getElementById('saet');
    if (el) {
        el.textContent = new Date().toLocaleTimeString('en-GB', { 
            timeZone: 'Asia/Baghdad', 
            hour12: false 
        });
    }
}
setInterval(updateClock, 1000); 
updateClock();

// 3. سیستەمێ نیۆن
function toggleNeonMode() {
    document.body.classList.toggle('neon-active');
}

// 4. ناردنا نامەیێ و وێنەیێ AI
async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const message = document.getElementById('user-message').value;
    const formBox = document.getElementById('arjan-secure-form');

    if(!name || !email || !phone || !message) {
        alert("تکایە هەمی خانان پڕ بکە!");
        return;
    }

    // ناردن بۆ داتابەیسێ
    const { error } = await _supabase.from('messages').insert([{ 
        full_name: name, 
        email: email, 
        phone: phone, 
        message_body: message 
    }]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        // دروستکرنا وێنەیەکێ جودا هەر جارەکێ
        const seed = Math.floor(Math.random() * 99999);
        const aiUrl = `https://pollinations.ai/p/${encodeURIComponent(message)}?width=600&height=400&seed=${seed}`;
        
        formBox.innerHTML = `
            <div style="text-align:center; animation: fadeIn 1s;">
                <h3 style="color:#D4AF37; font-family:'Orbitron';">نامە گەهشت!</h3>
                <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37; margin-top:10px;">
                <button onclick="window.location.reload()" style="margin-top:15px; background:#D4AF37; color:white; border:none; padding:12px 20px; border-radius:30px; cursor:pointer; font-weight:bold; width:100%;">پەیامەکا دی</button>
            </div>`;
    }
}
