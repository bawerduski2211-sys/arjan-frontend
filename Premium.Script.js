// ARJAN AI - PREMIUM MASTER SCRIPT
// 1. گرێدان ب داتابەیسا Supabase (زانیاریێن خۆ لێرە دانێ)
const supabaseUrl = 'YOUR_SUPABASE_URL'; // URL یا پڕۆژەیێ خۆ لێرە دانێ
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // Anon Key لێرە دانێ
const supabase = supabasejs.createClient(supabaseUrl, supabaseKey);

// 2. فۆنکشنا گوهۆڕینا لاپەرەیان ب شێوەیەکێ سادە
function showForm(formId) {
    // هەمی کارتان بەرزە بکە
    document.querySelectorAll('.auth-card').forEach(card => {
        card.classList.add('hidden');
    });

    // ئەو کارتا تە دڤێت دیار بکە
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.classList.remove('hidden');
    }

    // لێدانا تیشکا زێڕین یا ئاسایی
    playFlash('gold');
}

// 3. فۆنکشنا تیشکا زێڕین و سۆر (Visual Effects)
function playFlash(type) {
    const overlay = document.querySelector('.gold-overlay');
    if (!overlay) return;

    // ئەگەر چوونەژۆر سەرکەفتی بیت تیشکا سۆر و زێڕین تێکەڵ دبن
    if (type === 'success') {
        overlay.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.4) 0%, rgba(212, 175, 55, 0.4) 100%)';
    } else {
        overlay.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)';
    }

    overlay.style.animation = 'none';
    overlay.offsetHeight; // Trigger reflow
    overlay.style.animation = 'fadeOutGold 1.5s forwards';
}

// 4. سیستەمێ دروستکرنا ئیمەیڵا نوی (SignUp)
async function handleSignUp() {
    const email = document.getElementById('sign-email').value;
    const password = document.getElementById('sign-pass').value;
    const name = document.getElementById('sign-name').value;

    if (!email || !password) {
        alert("تکایە ئیمەیڵ و پاسۆردی بنڤیسە! ⚠️");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: name }
        }
    });

    if (error) {
        alert("خەلەتی د دروستکرنێ دا: " + error.message);
    } else {
        alert("پیرۆزە برا! ئیمەیڵ ب سەرکەفتی دروست بوو 🎉");
        showForm('login-form'); // زڤڕین بۆ لاپەرێ چوونەژۆرێ
    }
}

// 5. سیستەمێ چوونەژۆرێ (Login) ب تیشکا سۆر و زێڕین
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;

    if (!email || !password) {
        alert("تکایە زانیارییان پر بکە! ⚠️");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("ئیمەیڵ یان پاسۆرد خەلەتە! ❌");
    } else {
        // لێدانا تیشکا سۆر و زێڕین وەک نیشانا سەرکەفتنێ
        playFlash('success');
        
        setTimeout(() => {
            // چوون بۆ ناڤ پڕۆژەی (Dashboard)
            showForm('dashboard-hub');
        }, 1500);
    }
}

// 6. فۆنکشنا دروستکرنا وێنەیێن کوردی (AI Preview)
function generateKurdishImage() {
    const prompt = document.getElementById('image-prompt').value;
    if (!prompt) return alert("تکایە وەسفەکێ بنڤیسە!");

    playFlash('gold');
    alert("تیشکا زێڕین یا کار دکەت... AI ARJAN یێ وێنەیێ تە ب جەلکێن کوردی دروست دکەت ✨");
    // لێرە دێ بەستن ب API یا وێنەیان هێتە کرن
}
