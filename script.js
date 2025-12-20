// --- 1. Supabase Setup (کلیلێن تە یێن تایبەت) ---
const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- 2. Digital Clock (سەعەت ب کاتی دهۆک) ---
function updateClock() {
    const saetElement = document.getElementById('saet');
    if (saetElement) {
        // نیشاندانا دەمی ب شێوازێ ٢٤ سەعەتی
        saetElement.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Baghdad' });
    }
}
setInterval(updateClock, 1000);
updateClock();

// --- 3. Neon Mode (بازنەیا دزڤریت) ---
function toggleNeonMode() {
    // ئەڤە کلاسا neon-active زێدە دکەت دا ئەنیمەیشن کار بکەت
    document.body.classList.toggle('neon-active');
}

// --- 4. Send Message & VIP AI Image ---
async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;

    // پشکنینا خانان
    if(!name || !email || !message) {
        alert("تکایە خانان پڕ بکە!");
        return;
    }

    // پاشکەفتکرن د داتابەیسێ دا
    const { error } = await _supabase
        .from('messages')
        .insert([{ full_name: name, email: email, message_body: message }]);

    if (error) {
        alert("ئاریشە: " + error.message);
    } else {
        // دروستکرنا وێنەیێ AI ب شێوازەکێ جوان
        const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(message)}?width=600&height=400&model=flux`;
        
        // گۆهۆڕینا فۆرمی بۆ وێنەیێ AI
        const formDiv = document.getElementById('arjan-secure-form');
        formDiv.innerHTML = `
            <div style="text-align:center; animation: fadeIn 1s;">
                <h4 style="color:#D4AF37;">SUCCESSFULLY SENT!</h4>
                <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37; margin-top:15px;">
                <button onclick="location.reload()" style="margin-top:15px; background:#D4AF37; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">NEW MESSAGE</button>
            </div>
        `;
    }
}
