// ==========================================
// ARJAN AI - PREMIUM MASTER SCRIPT (V2.0)
// ==========================================

// 1. گرێدان ب داتابەیسا Supabase
const supabaseUrl = 'YOUR_SUPABASE_URL'; // URL لێرە دانێ
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Anon Key لێرە دانێ
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 2. متغیرێن سەکەیوریتی و سزادانێ
let loginAttempts = 0;
let isLocked = false;
const LOCK_TIME = 5 * 60 * 1000; // ٥ خۆلەک سزا

// 3. فۆنکشنا تومارکرنا زانیاریێن هاکەری (سیخوڕی)
async function reportHacker(email) {
    try {
        const { data, error } = await supabase
            .from('hack_attempts')
            .insert([
                { 
                    target_email: email, 
                    attempt_time: new Date(),
                    details: "هەوڵدانا توند: ٤ جاران پاسۆرد خەلەت لێدایە" 
                }
            ]);
        if (error) throw error;
        console.log("Hacker reported to Admin! ✅");
    } catch (err) {
        console.error("Error reporting hacker:", err.message);
    }
}

// 4. فۆنکشنا چوونەژۆرێ (Login) دگەل پاراستنا فوول
async function validateLogin() {
    if (isLocked) {
        alert("سیستم یا قوفڵکرییە! تکایە ٥ خۆلەکان ل هیڤیێ بە. ⏳");
        return;
    }

    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;

    if (!email || !password) {
        alert("تکایە هەمی خانەیان پر بکە! ⚠️");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        loginAttempts++;
        
        // ئەگەر گەهشتە ٤ جاران، هاکەری ئاشکەرا بکە و سزا بدە
        if (loginAttempts >= 4) {
            isLocked = true;
            await reportHacker(email); // ناردنا زانیارییان بۆ داتابەیسێ
            
            alert("سزا! ٤ جاران خەلەت بوو. زانیاریێن تە بۆ ئەدمینی هاتنە فرێکرن و سیستم بۆ ٥ خۆلەکان قوفڵ بوو. 🚫");
            
            setTimeout(() => {
                isLocked = false;
                loginAttempts = 0;
                console.log("System Unlocked");
            }, LOCK_TIME); 
            
        } else {
            alert(`پاسۆرد خەلەتە! هەوڵدانا ${loginAttempts} ژ ٤. ئاگاداربە! ⚠️`);
        }
    } else {
        // سەرکەفتن: لێدانا تیشکا سۆر و زێڕین
        loginAttempts = 0;
        playFlash('success');
        setTimeout(() => {
            showForm('dashboard-hub');
        }, 1500);
    }
}

// 5. سیستەمێ تومارکرنا بکارئینەرێن نوی (SignUp)
async function handleSignUp() {
    const email = document.getElementById('sign-email').value;
    const password = document.getElementById('sign-pass').value;
    const name = document.getElementById('sign-name').value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: { data: { full_name: name } }
    });

    if (error) {
        alert("خەلەتی: " + error.message);
    } else {
        alert("ئەکاونت ب سەرکەفتی دروست بوو! 🎉 نوکە دشێی بچی ژۆر.");
        showForm('login-form');
    }
}

// 6. ئەنیمەیشن و گوهۆڕینا لاپەرەیان
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
    playFlash('gold');
}

function playFlash(type) {
    const overlay = document.querySelector('.gold-overlay');
    if (!overlay) return;

    if (type === 'success') {
        overlay.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(212, 175, 55, 0.4) 100%)';
    } else {
        overlay.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)';
    }

    overlay.style.animation = 'none';
    overlay.offsetHeight; 
    overlay.style.animation = 'fadeOutGold 1.5s forwards';
}

// 7. دەرکەفتن (Logout)
async function handleLogout() {
    await supabase.auth.signOut();
    location.reload();
}
