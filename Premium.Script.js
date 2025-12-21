// --- ١. گرێدانا داتابەیسێ (Supabase Setup) ---
// ئەڤ بەشە ڕێگریێ ل ئیرۆرا signUp دکەت
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// گۆڕاوەک بۆ هژمارکرنا هەوڵدانێن خەڵەت
let loginAttempts = 0;

// --- ٢. فەنکشنا چوونەژۆرێ (Login) دگەل پاراستنێ ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: pass
        });

        if (error) {
            loginAttempts++; // زێدەکرنا هەوڵدانان ل سەر هەر خەلەتییەکێ
            
            if (loginAttempts >= 5) {
                // ئەگەر ٥ جاران خەڵەت بوو، دێ چیتە لاپەڕێ بلۆککرنێ
                window.location.href = "blocked.html";
                return;
            }
            
            throw error;
        }

        // ئەگەر ڕاست بوو، هەوڵدانان دکەینە صفر
        loginAttempts = 0;
        alert("ب خێر بێی! چوونەژۆر ب سەرکەفتی بوو 💎");
        showForm('dashboard-hub');

    } catch (error) {
        alert(`خەله‌تی: پاسۆرد یان ئیمێڵ شاشە! (هەوڵدانا ${loginAttempts} ژ ٥) ❌`);
    }
}

// --- ٣. فەنکشنا گوهۆڕینا فۆڕمان ---
// ئەڤە دۆکمەیا "دروست بکە" کارا دکەت
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if (target) target.classList.remove('hidden');
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
        // ١. دروستکرنا ئەکاونتی د بەشێ Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // ٢. سەیڤکرنا زانیارییان د خشتێ users دا
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
