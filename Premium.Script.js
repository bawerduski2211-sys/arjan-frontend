// --- ١. Setup Supabase ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- ٢. پشکنینا بکارئینەری و دیارکرنا "سندوقا سۆر" ---
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    const redBox = document.getElementById('red-box-btn');

    if (user) {
        // ئەگەر بکارئینەر یێ چوویتە ژۆر، سندوقا سۆر نیشان بدە
        if (redBox) redBox.style.display = 'inline-block';
    } else {
        // ئەگەر یێ نەچوویتە ژۆر و ل سەر لاپەرێ Dashboard بیت، بیزە سەر لاپەرێ لۆگین
        if (window.location.pathname.includes("dashboard.html")) {
            window.location.href = "Diamond-login.html";
        }
    }
}
document.addEventListener('DOMContentLoaded', checkUserStatus);

// --- ٣. گۆڕینا فۆرمان (Toggle Forms) ---
function toggleForms(formId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (formId === 'signup-form') {
        if (loginForm) loginForm.classList.add('hidden');
        if (signupForm) signupForm.classList.remove('hidden');
    } else {
        if (signupForm) signupForm.classList.add('hidden');
        if (loginForm) loginForm.classList.remove('hidden');
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

        alert("پیرۆزە! ئەکاونت دروست بوو ✅");
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

// --- ٦. دەرکەفتن (Logout) ---
async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "Diamond-login.html";
}
