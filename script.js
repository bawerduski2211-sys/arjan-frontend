// 1. Digital Clock - ئەڤ بەشە سەعەتێ کار دکەت
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

// 2. Neon Mode - ئەڤە وێنەی دزڤڕینیت و گەش دکەت
function toggleNeonMode() {
    document.body.classList.toggle('neon-active');
}

// 3. Supabase Configuration - بۆ ناردنا نامەیان
const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 4. Send Message & AI - ناردنا نامەیێ و دروستکرنا وێنەیێ AI
async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const message = document.getElementById('user-message').value;

    if(!name || !email || !message) {
        alert("تکایە خانێن سەرەکی پڕ بکە!");
        return;
    }

    const { error } = await _supabase
        .from('messages')
        .insert([{ full_name: name, email: email, phone: phone, message_body: message }]);

    if (error) {
        alert("Error: " + error.message);
    } else {
        const seed = Math.floor(Math.random() * 100000);
        const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(message)}?width=600&height=400&seed=${seed}&model=flux`;
        
        const formDiv = document.getElementById('arjan-secure-form');
        formDiv.innerHTML = `
            <div style="text-align:center;">
                <h4 style="color:#D4AF37;">SUCCESS!</h4>
                <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37; margin-top:10px;">
                <button onclick="location.reload()" style="margin-top:15px; background:#D4AF37; color:white; border:none; padding:10px 20px; border-radius:30px; cursor:pointer;">NEW</button>
            </div>
        `;
    }
}
