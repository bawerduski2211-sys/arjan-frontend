// --- ١. Setup Supabase ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

// ل ڤێرێ مە "supabasejs" کرە "supabase" دا کار بکەت
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- ٢. پشکنینا بکارئینەری ---
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const redBox = document.getElementById('red-box-btn');
        if (redBox) redBox.style.display = 'inline-block';
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "Diamond-login.html";
    }
}
// بکارئینانا ئاڤێنتێDOMContentLoaded باشترە ژ window.onload
document.addEventListener('DOMContentLoaded', checkUserStatus);

// --- ٣. تومارکرن (Sign Up) ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    if (!name || !email || !phone || !pass) {
        alert("هیڤییە هەمی خانەیان پڕ بکە! ⚠️");
        return;
    }

    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        // ١. دروستکرنا ئەکاونتی د سیستەمێ Supabase Auth دا
        const { data, error: authError } = await supabase.auth.signUp({ email, password: pass });
        if (authError) throw authError;

        // ٢. خەزنکرنا پێزانینان د مێزا users دا (ئەوا تە ستوونێن وێ درستکرین)
        const { error: dbError } = await supabase
            .from('users') 
            .insert([{ full_name: name, phone: phone, email: email }]);
            
        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە دروستکرن ✅");
        window.location.href = "dashboard.html"; 
    } catch (e) { 
        alert("ئیرۆر: " + e.message); 
    }
}

// --- ٤. چوونەژۆر (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    if (!email || !pass) {
        alert("ئیمەیڵ و پاسۆردی بنڤێسە! 🔑");
        return;
    }

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        window.location.href = "dashboard.html";
    } catch (e) { 
        alert("ئیرۆر: ئیمێڵ یان پاسۆرد شاشە! ❌"); 
    }
}

// --- ٥. Forgot Password ---
async function handleForgotPassword() {
    const email = document.getElementById('log-email').value;
    if (!email) { 
        alert("ئیمەیڵێ خۆ بنڤێسە دا لینکێ تە بۆ بنێرین 📧"); 
        return; 
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message); else alert("لینک بۆ ئیمەیڵا تە هات 📩");
}

// --- ٦. Toggle Forms ---
function toggleForms(formId) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById(formId).classList.remove('hidden');
}
