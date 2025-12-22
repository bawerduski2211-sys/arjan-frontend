// --- ١. Setup Supabase ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

// دڵنیا ببە کو ناڤێ لایبرەریێ درستە
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// --- ٢. فەنکشنا تومارکرنێ (Sign Up) ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const pass = document.getElementById('sign-pass').value;

    if (!name || !email || !pass) {
        alert("تکایە هەمی خانان پڕ بکە! ⚠️");
        return;
    }

    try {
        // ١. دروستکرنا ئەکاونتی د بەشێ Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass,
            options: {
                data: { full_name: name }
            }
        });

        if (authError) throw authError;

        // ٢. زێدەکرنا زانیارییان بۆ خشتێ 'users' د داتابەیسێ دا
        const { error: dbError } = await supabase
            .from('users')
            .insert([{ 
                full_name: name, 
                email: email,
                created_at: new Date()
            }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        window.location.href = "dashboard.html"; 

    } catch (error) {
        alert("ئیرۆر: " + error.message);
    }
}

// --- ٣. فەنکشنا چوونەژۆرێ (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    if (!email || !pass) {
        alert("ئیمێڵ و پاسۆردی بنڤێسە! ⚠️");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
    });

    if (error) {
        alert("ئیمێڵ یان پاسۆرد شاشە! ❌");
    } else {
        alert("ب خێر بێی! 💎");
        window.location.href = "dashboard.html";
    }
}

// --- ٤. گوهۆڕینا فۆڕمان (Toggle) ---
function toggleForms(formId) {
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

// --- ٥. ژبیرکرنا پاسۆردێ (Forgot Password) ---
async function handleForgotPassword() {
    const email = document.getElementById('log-email').value;
    if (!email) {
        alert("ئیمێڵێ خۆ بنڤێسە دا لینکێ بۆ فرێکەین 📧");
        return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert(error.message); else alert("لینک بۆ ئیمێڵا تە هاتە فرێکرن 📩");
}
