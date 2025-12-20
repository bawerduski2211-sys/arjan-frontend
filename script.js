const SUPABASE_URL = 'https://cepuvipasminpjcpgvrq.supabase.co';
const SUPABASE_KEY = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function updateClock() {
    const el = document.getElementById('saet');
    if (el) el.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Baghdad', hour12: false });
}
setInterval(updateClock, 1000); updateClock();

async function sendToArjanDB() {
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;
    const message = document.getElementById('user-message').value;
    const formBox = document.getElementById('arjan-secure-form');

    if(!name || !email || !phone || !message) { alert("هەمی خانان پڕ بکە!"); return; }

    const { error } = await _supabase.from('messages').insert([{ full_name: name, email: email, phone: phone, message_body: message }]);

    if (error) { alert("Error: " + error.message); } 
    else {
        const seed = Math.floor(Math.random() * 99999);
        const aiUrl = `https://pollinations.ai/p/${encodeURIComponent(message)}?width=600&height=400&seed=${seed}`;
        formBox.innerHTML = `
            <h3 style="color:#D4AF37;">نامە گەهشت!</h3>
            <img src="${aiUrl}" style="width:100%; border-radius:15px; border:2px solid #D4AF37;">
            <button onclick="window.location.reload()" style="margin-top:10px;">پەیامەکا دی</button>`;
    }
}
