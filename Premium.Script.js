// 1. فەنکشنا گوهۆڕینا فۆڕمان (Toggle Forms)
// ئەڤە دیزاینێ تێک نادەت چونکە تەنێ کلاسێ hidden زێدە دکەت یان لادەت
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if(target) target.classList.remove('hidden');
}

// 2. چوونەژۆر (Login) - ب شێوازەکێ سادە و بێ کێشە
function validateLogin() {
    const inputs = document.querySelectorAll('#login-form input');
    
    // دڵنیابوون ژ هەبوونا ئینپوتان دا دیزاین تێک نەچیت
    if (inputs.length < 2) return; 

    const email = inputs[0].value.trim();
    const password = inputs[1].value.trim();

    // ئەگەر خانە یێن پڕ بن، دێ چیتە ژۆر
    if (email !== "" && password !== "") {
        alert("بخێر بێی بۆ ARJAN SYSTEM!");
        // لێرە ناڤێ لاپەڕێ سەرەکی دابنێ (بۆ نموونە index.html یان ai-index.html)
        window.location.href = "index.html"; 
    } else {
        alert("تکایە ئیمەیڵ و پاسۆردی بنڤێسە!");
    }
}

// 3. دروستکرنا ئەکاونتی و ڕیستکرن (تەنێ وەک نیشاندان چونکە داتابەیس نینە)
function handleSignUp() {
    alert("ببورە! دروستکرنا ئەکاونتی نوکە یا ڕاوەستیایە.");
}

function handleReset() {
    alert("تکایە پەیوەندیێ ب ئەدمینی بکە بۆ گوهۆڕینا پاسۆردی.");
}

// 4. گرێدانا هەمی دوگمەیان ب ئاڕێزەکێ پرۆفیشناڵ
document.addEventListener('DOMContentLoaded', () => {
    
    // گرێدانا دوگمەیا Login (ئەگەر یا هەی د ناڤ فۆڕمێ دا)
    const loginBtn = document.querySelector('#login-form .btn-diamond');
    if (loginBtn) {
        loginBtn.onclick = (e) => {
            e.preventDefault(); // ناهێلیت لاپەڕە Refresh ببیت
            validateLogin();
        };
    }

    // گرێدانا دوگمەیا Signup
    const signupBtn = document.querySelector('#signup-form .btn-diamond');
    if (signupBtn) {
        signupBtn.onclick = (e) => {
            e.preventDefault();
            handleSignUp();
        };
    }

    // گرێدانا دوگمەیا Reset (Forgot Password)
    const resetBtn = document.querySelector('#forgot-form .btn-diamond');
    if (resetBtn) {
        resetBtn.onclick = (e) => {
            e.preventDefault();
            handleReset();
        };
    }

    // پشت ڕاستبە کلاسێ hidden د CSS دا یێ هەی
    // .hidden { display: none !important; }
});
