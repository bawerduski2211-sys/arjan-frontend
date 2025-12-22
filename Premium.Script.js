// --- ١. Setup Supabase ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- ٢. پشکنینا بکارئینەری (بۆ دیارکرنا سندوقا سۆر) ---
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    const redBox = document.getElementById('red-box-btn');

    if (user) {
        if (redBox) redBox.style.display = 'inline-block';
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "Diamond-login.html";
    }
}
document.addEventListener('DOMContentLoaded', checkUserStatus);

// --- ٣. گۆڕینا فۆرمان (Toggle Forms) - ڕێکا ب هێز ---
function toggleForms(formId) {
    console.log("گۆڕین بۆ: " + formId); 
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (formId === 'signup-form') {
        // ڤەشارتنا لۆگینێ و نیشاندانا ساین ئەپێ ب فۆرس (!important)
        if (loginForm) loginForm.style.setProperty('display', 'none', 'important');
        if (signupForm) {
            signupForm.style.setProperty('display', 'flex', 'important');
            signupForm.classList.remove('hidden');
        }
    } else {
        // ڤەشارتنا ساین ئەپێ و نیشاندانا لۆگینێ ب فۆرس (!important)
        if (signupForm) signupForm.style.setProperty('display', 'none', 'important');
        if (loginForm) {
            loginForm.style.setProperty('display', 'flex', 'important');
            loginForm.classList.remove('hidden');
        }
    }
}

// --- ٤. تۆمارکردن (Sign Up) ---
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
        const { data, error: authError } = await supabase.auth.signUp({ email, password: pass });
        if (authError) throw authError;

        const { error: dbError } = await supabase.from('users').insert([{ full_name: name, phone: phone, email: email }]);
        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە دروستکرن ✅");
        window.location.href = "dashboard.html"; 
    } catch (e) { alert("ئیرۆر: " + e.message); }
}

// --- ٥. چوونەژۆر (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        window.location.href = "dashboard.html";
    } catch (e) { alert("ئیرۆر: ئیمێڵ یان پاسۆرد شاشە! ❌"); }
}

// --- ٦. پاسۆردێ ژبیرکری (Forgot Password) ---
async function handleForgotPassword() {
    const email = document.getElementById('log-email').value;
    if (!email) { 
        alert("ئیمەیڵێ خۆ بنڤێسە دا لینکێ تە بۆ بنێرین 📧"); 
        return; 
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message); else alert("لینک بۆ ئیمەیڵا تە هات 📩");
}

// --- ٧. دەرکەفتن (Logout) ---
async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "Diamond-login.html";
}
