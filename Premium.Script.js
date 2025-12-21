// --- ١. گرێدانا داتابەیسێ (Supabase Setup) ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// گۆڕاوەک بۆ هژمارکرنا هەوڵدانێن خەڵەت
let loginAttempts = 0;

// --- ٢. پاراستنا لاپەڕان (Security Check) ---
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    // ئەگەر بکارئینەر یێ چوونەژۆر نەبیت و ل داشبۆردێ بیت، بیبە بۆ لاپەڕێ Login
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
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error) {
            loginAttempts++;
            if (loginAttempts >= 5) {
                // تومارکرنا هاکەری و برن بۆ لاپەڕێ بلۆک
                window.location.href = "blocked.html";
                return;
            }
            throw error;
        }

        loginAttempts = 0;
        alert("ب خێر بێی! چوونەژۆر ب سەرکەفتی بوو 💎");
        window.location.href = "dashboard.html"; 

    } catch (error) {
        alert(`خەله‌تی: پاسۆرد یان ئیمێڵ شاشە! (هەوڵدانا ${loginAttempts} ژ ٥) ❌`);
    }
}

// --- ٤. تومارکرنا ئەکاونتێ نوی (Sign Up) ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        const { error: dbError } = await supabase
            .from('users')
            .insert([{ full_name: name, phone: phone, email: email }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        showForm('login-form');

    } catch (error) {
        alert("ئیرۆر: " + error.message);
    }
}

// --- ٥. فەنکشنا گرێدانا دگەل AI (Arjan AI) ---
async function askArjanAI(userMessage) {
    try {
        const response = await fetch('https://arjan-backend.vercel.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        return data.reply; 
    } catch (error) {
        console.error("ئیرۆر د پەیوەندیا AI دا:", error);
        return "ببوورە برا، مێشکێ من نوکە یێ مژوولە، کێمەکێ دی تاقی بکە.";
    }
}

// --- ٦. فەنکشنا دەرکەفتنێ (Logout) ---
async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert("ئیرۆر د دەرکەفتنێ دا: " + error.message);
    } else {
        alert("تۆ ب سەرکەفتی دەرکەفتی! 🔒");
        window.location.href = "diamond-login.html";
    }
}

// --- ٧. فەنکشنا گوهۆڕینا فۆڕمان (Toggle Forms) ---
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if (target) target.classList.remove('hidden');
}
