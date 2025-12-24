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
    if (inputs.length < 2) return; // دڵنیابوون ژ هەبوونا ئینپوتان دا دیزاین تێک نەچیت

    const email = inputs[0].value.trim();
    const password = inputs[1].value.trim();

    if (email !== "" && password !== "") {
        alert("بخێر بێی بۆ ARJAN SYSTEM!");
        window.location.href = "home.html"; 
    } else {
        alert("تکایە ئیمەیڵ و پاسۆردی بنڤێسە!");
    }
}

// 3. دروستکرنا ئەکاونتی و ڕیستکرن (تەنێ وەک نیشاندان)
function handleSignUp() {
    alert("ببورە! دروستکرنا ئەکاونتی یا ڕاوەستیایە چونکە داتابەیس نینە.");
}

function handleReset() {
    alert("تکایە پەیوەندیێ ب ئەدمینی بکە بۆ گوهۆڕینا پاسۆردی.");
}

// 4. گرێدانا دوگمەیان ب شێوەیەکێ سادە
document.addEventListener('DOMContentLoaded', () => {
    // دوگمەیا Signup
    const signupBtn = document.querySelector('#signup-form .btn-diamond');
    if (signupBtn) signupBtn.onclick = (e) => { e.preventDefault(); handleSignUp(); };

    // دوگمەیا Reset
    const resetBtn = document.querySelector('#forgot-form .btn-diamond');
    if (resetBtn) resetBtn.onclick = (e) => { e.preventDefault(); handleReset(); };
});
