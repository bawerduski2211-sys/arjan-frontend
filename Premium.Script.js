// --- ١. گرێدانا داتابەیسێ (Supabase Setup) ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

let loginAttempts = 0;

// --- ٢. پاراستنا لاپەڕان ---
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "diamond-login.html";
    }
}
checkUser();

// --- ٣. فەنکشنا چوونەژۆرێ (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) {
            loginAttempts++;
            if (loginAttempts >= 5) { window.location.href = "blocked.html"; return; }
            throw error;
        }
        loginAttempts = 0;
        alert("ب خێر بێی! 💎");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert(`خەله‌تی! (هەوڵدانا ${loginAttempts} ژ ٥) ❌`);
    }
}

// --- ٤. تومارکرنا ئەکاونتی (Sign Up) ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;

    try {
        const { error: authError } = await supabase.auth.signUp({ email, password: pass });
        if (authError) throw authError;

        const { error: dbError } = await supabase.from('users').insert([{ full_name: name, phone, email }]);
        if (dbError) throw dbError;

        alert("ئەکاونت هاتە تومارکرن! ✅");
        showForm('login-form');
    } catch (error) { alert("ئیرۆر: " + error.message); }
}

// --- ٥. دەرکەفتن (Logout) ---
async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "diamond-login.html";
}

// --- ٦. گوهۆڕینا فۆڕمان ---
function showForm(id) {
    document.querySelectorAll('.auth-card').forEach(c => c.classList.add('hidden'));
    const target = document.getElementById(id);
    if (target) target.classList.remove('hidden');
}
