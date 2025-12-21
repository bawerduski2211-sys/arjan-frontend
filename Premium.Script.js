// --- ١. گرێدانا داتابەیسێ ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';

// ئاگاداری: لێرە دێ (supabasejs) ب کار ئینین وەک تە د وێنەیێ کۆدی دا هەی
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// --- ٢. فەنکشنا گوهۆڕینا فۆڕمان (Toggle) ---
function toggleForms(formId) {
    console.log("گوهۆڕین بۆ: " + formId);
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById(formId).classList.remove('hidden');
}

// --- ٣. تومارکرنا ئەکاونتێ نوی (Sign Up) ---
async function handleSignUp() {
    console.log("دەست ب تومارکرنێ هاتە کرن...");
    
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
        // ١. دروستکرنا ئەکاونتی د Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // ٢. سەیڤکرن د خشتێ 'users' دا
        const { error: dbError } = await supabase
            .from('users')
            .insert([{ 
                full_name: name, 
                phone: phone, 
                email: email 
            }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        window.location.href = "dashboard.html"; // برن بۆ داشبۆردێ

    } catch (error) {
        console.error("Error details:", error);
        alert("ئیرۆر د تومارکرنێ دا: " + error.message);
    }
}

// --- ٤. چوونەژۆر (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;

        alert("ب خێر بێی! 💎");
        window.location.href = "dashboard.html"; 
    } catch (error) {
        alert("ئیرۆر: ئیمێڵ یان پاسۆرد شاشە! ❌");
    }
}
