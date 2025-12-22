const supabaseUrl = 'https://cepuvipasminpjcpgvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ١. فرمان بۆ گۆڕینا فۆرمان (Toggle Forms)
function toggleForms(formId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    if (formId === 'signup-form') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'flex';
        signupForm.classList.remove('hidden');
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.classList.remove('hidden');
    }
}

// ٢. فرمان بۆ پاسۆردێ ژبیرکری (Forgot Password)
async function handleForgotPassword() {
    const email = document.getElementById('log-email').value;
    if (!email) { 
        alert("ئیمەیڵێ خۆ ل خانەیا لۆگینێ بنڤێسە دا لینکێ تە بۆ بنێرین 📧"); 
        return; 
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) alert("ئیرۆر: " + error.message); 
    else alert("لینک بۆ ئیمەیڵا تە هات 📩");
}

// ٣. تۆمارکردن (Sign Up)
async function handleSignUp() {
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    if (pass !== passConfirm) { alert("پاسۆرد وەک ئێک نینن! ❌"); return; }

    try {
        const { data, error: authError } = await supabase.auth.signUp({ email, password: pass });
        if (authError) throw authError;
        await supabase.from('users').insert([{ full_name: name, phone: phone, email: email }]);
        alert("ئەکاونت دروست بوو ✅");
        window.location.href = "dashboard.html";
    } catch (e) { alert(e.message); }
}

// ٤. چوونەژۆر (Login)
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const pass = document.getElementById('log-pass').value;
    try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        window.location.href = "dashboard.html";
    } catch (e) { alert("ئیمێڵ یان پاسۆرد شاشە! ❌"); }
}
