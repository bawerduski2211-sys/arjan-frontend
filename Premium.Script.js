// --- ١. Setup Supabase ---
const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// --- ٢. تومارکرن (Sign Up) ---
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
        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        const { error: dbError } = await supabase
            .from('users')
            .insert([{ full_name: name, phone: phone, email: email }]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        window.location.href = "dashboard.html"; 
    } catch (e) {
        alert("ئیرۆر: " + e.message);
    }
}

// --- ٣. چوونەژۆر (Login) ---
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;

    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;

        alert("ب خێر بێی! 💎");
        window.location.href = "dashboard.html";
    } catch (e) {
        alert("ئیرۆر: ئیمێڵ یان پاسۆرد شاشە! ❌");
    }
}

// --- ٤. گوهۆڕینا فۆڕمان ---
function toggleForms(formId) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.add('hidden');
    document.getElementById(formId).classList.remove('hidden');
}
