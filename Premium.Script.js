// --- ١. گرێدانا داتابەیسێ (Supabase Setup) ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

// بکارئینانا supabasejs بۆ دروستکرنا کلاینتی
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// --- ٢. پاراستنا لاپەڕان و دەرکەفتنا "سندوقا سور" ---
async function checkUserStatus() {
    const { data: { user } } = await supabase.auth.getUser();
    
    // ئەگەر بکارئینەر یێ داخل بیت، دۆکمه‌یا "سندوقا سور" نیشان بدە
    if (user) {
        const redBox = document.getElementById('red-box-btn');
        if (redBox) {
            redBox.style.display = 'inline-block';
        }
        
        // ئەگەر ل لاپەڕێ پڕۆفایلێ بیت، داتایێن سندوقان بار بکە
        if (window.location.pathname.includes("profile.html")) {
            loadUserVaults(user.email);
        }
    } else {
        // ئەگەر داخل نەبووبیت و ل داشبۆردێ بیت، بیبە بۆ لاپەڕێ Login
        if (window.location.pathname.includes("dashboard.html") || window.location.pathname.includes("profile.html")) {
            window.location.href = "diamond-login.html";
        }
    }
}
window.onload = checkUserStatus;

// --- ٣. فەنکشنا تومارکرنا ئەکاونتێ نوی (Sign Up) ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    if (!name || !email || !pass) {
        alert("تکایە هەمی خانان پڕ بکە! ⚠️");
        return;
    }

    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        // ١. تومارکرن د Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // ٢. سەیڤکرنا زانیارییان د خشتێ users دا
        const { error: dbError } = await supabase
            .from('users')
            .insert([{ 
                full_name: name, 
                phone: phone, 
                email: email,
                keys_collected: 0,
                coins: 0
            }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        window.location.href = "dashboard.html"; // ڕاستەوخۆ دچیتە داشبۆردێ دا کو سندوقا سور ببێنت

    } catch (error) {
        alert("ئیرۆر د تومارکرنێ دا: " + error.message);
    }
}

// --- ٤. فەنکشنا چوونەژۆرێ (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error) throw error;

        alert("ب خێر بێی! چوونەژۆر ب سەرکەفتی بوو 💎");
        window.location.href = "dashboard.html"; 

    } catch (error) {
        alert("ئیرۆر: ئیمێڵ یان پاسۆرد شاشە! ❌");
    }
}

// --- ٥. بارکرنا داتایێن سندوقا سور (Profile Data) ---
async function loadUserVaults(email) {
    const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (profile) {
        if(document.getElementById('user-fullname')) document.getElementById('user-fullname').innerText = profile.full_name;
        if(document.getElementById('user-email')) document.getElementById('user-email').innerText = profile.email;
        
        // نووکرنا ستاتێن یاریێ د سندوقێ دا
        const gameStats = document.getElementById('user-game-stats');
        if(gameStats) {
            gameStats.innerText = `🔑 ${profile.keys_collected || 0} | 💰 ${profile.coins || 0}`;
        }
    }
}

// --- ٦. فەنکشنا دەرکەفتنێ (Logout) ---
async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        window.location.href = "diamond-login.html";
    }
}

// --- ٧. گوهۆڕینا فۆڕمان د لاپەڕێ تومارکرنێ دا ---
function showForm(formId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (formId === 'signup-form') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
}
