// --- ١. گرێدانا داتابەیسێ (Supabase Setup) ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

// چاکسازی: لێرە ل شوینا (supabase.createClient) پێدڤییە بنڤێسی (supabasejs.createClient)
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

let loginAttempts = 0;

// --- ٢. پاراستنا لاپەڕان و دەرکەفتنا "سندوقا سور" ---
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    // ئەگەر بکارئینەر یێ چوونەژۆر نەبیت و ل داشبۆردێ بیت، بیبە بۆ لاپەڕێ Login
    if (!user && window.location.pathname.includes("dashboard.html")) {
        window.location.href = "diamond-login.html";
    }

    // ئەگەر یێ داخل بیت، دۆکمه‌یا "سندوقا سور" نیشان بدە
    if (user) {
        const redBox = document.getElementById('red-box-btn');
        if (redBox) redBox.style.display = 'inline-block';
        
        // ئەگەر ل لاپەڕێ پڕۆفایلێ بیت، داتایێن سندوقان بار بکە
        if (window.location.pathname.includes("profile.html")) {
            loadUserVaults(user.email);
        }
    }
}
window.onload = checkUser;

// --- ٣. فەنکشنا تومارکرنا ئەکاونتێ نوی (Sign Up) ---
async function handleSignUp() {
    // ئاگاداری: دڵنیا ببە ناڤێن (ID) د HTML دا درست وەک ڤان خوارێ بن
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;

    try {
        // ١. دروستکرن د Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // ٢. سەیڤکرن د خشتێ users دا
        const { error: dbError } = await supabase
            .from('users')
            .insert([{ full_name: name, phone: phone, email: email }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        window.location.href = "dashboard.html"; // ڕاستەوخۆ دچیتە داشبۆردێ و سندوقا سور دبینیت

    } catch (error) {
        alert("ئیرۆر: " + error.message);
    }
}

// --- ٤. بارکرنا داتایێن سندوقان د لاپەڕێ پڕۆفایلێ دا ---
async function loadUserVaults(email) {
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (profile) {
        // نیشاندانا زانیاریێن کەسی
        if(document.getElementById('user-fullname')) document.getElementById('user-fullname').innerText = profile.full_name;
        if(document.getElementById('user-email')) document.getElementById('user-email').innerText = profile.email;
        
        // نیشاندانا یاریێ
        if(document.getElementById('user-game-stats')) {
            document.getElementById('user-game-stats').innerText = `🔑 ${profile.keys_collected || 0} | 💰 ${profile.coins || 0}`;
        }
    }
}

// --- ٥. فەنکشنا چوونەژۆرێ (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;

        alert("ب خێر بێی! 💎");
        window.location.href = "dashboard.html"; 
    } catch (error) {
        alert("ئیرۆر: ئیمەیل یان پاسۆرد خەلەتە! ❌");
    }
}

// --- ٦. فەنکشنا دەرکەفتنێ (Logout) ---
async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "diamond-login.html";
}
