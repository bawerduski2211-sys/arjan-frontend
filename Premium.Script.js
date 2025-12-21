// --- ١. گرێدانا داتابه‌یسێ (Supabase Setup) ---
// ئه‌ڤ به‌شه یێ گرنگه بۆ هندێ دۆکمه كار بكهت
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- ٢. فه‌نكشنا توماركرنا ئه‌كاونتێ نوی ---
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    if (pass !== passConfirm) {
        alert("خه‌له‌تی: پاسۆرد وه‌ك ئێك نینن! ❌");
        return;
    }

    try {
        // دروستكرنا ئه‌كاونتی د به‌شێ Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // سه‌یڤكرنا زانیارییان د خشتێ users دا
        const { error: dbError } = await supabase
            .from('users')
            .insert([
                { 
                    full_name: name, 
                    phone: phone, 
                    email: email 
                }
            ]);

        if (dbError) throw dbError;

        alert("پیرۆزه! ئه‌كاونت ب سه‌ركه‌فتی هاته‌ توماركرن ✅");
        showForm('login-form');

    } catch (error) {
        alert("ئیرۆر: " + error.message);
    }
}

// فه‌نكشنا گوهۆڕینا فۆرمان
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if (target) target.classList.remove('hidden');
}
