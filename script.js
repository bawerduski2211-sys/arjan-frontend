const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function updateClock() {
    const el = document.getElementById('saet');
    if (el) {
        // ئەڤە کێشەیا دەمی چارەسەر دکەت
        el.textContent = new Date().toLocaleTimeString('en-GB', { 
            timeZone: 'Asia/Baghdad', 
            hour12: false 
        });
    }
}
setInterval(updateClock, 1000); updateClock();

function toggleNeonMode() { document.body.classList.toggle('neon-active'); }

async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const message = document.getElementById('user-message').value;

    if(!name || !email || !phone || !message) { alert("تکایە هەمی خانان پڕ بکە!"); return; }

    const { error } = await _supabase.from('messages').insert([{ 
        full_name: name, email: email, phone: phone, message_body: message 
    }]);

    if (error) { alert("Error: " + error.message); } 
    else {
        const aiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(message)}?width=600&height=400&model=flux`;
        document.getElementById('arjan-secure-form').innerHTML = `
            <div style="text-align:center;">
                <h4 style="color:#D4AF37;">SUCCESS!</h4>
                <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37; margin-top:10px;">
                <br>
                <button onclick="window.location.href=window.location.href" style="margin-top:15px; background:#D4AF37; color:white; border:none; padding:12px 24px; border-radius:30px; cursor:pointer; font-weight:bold;">RELOAD PAGE</button>
            </div>`;
    }
}
