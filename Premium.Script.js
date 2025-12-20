function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
}

function showForgotForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.remove('hidden');
}

function sendOTP() {
    alert("کۆد هاتە ناردن! 📩");
}

function validateLogin() {
    // بۆ تاقی کرنێ بکارئینەر دچیتە لاپەرێ پرۆفایلێ
    window.location.href = "profile.html";
}

function sendResetCode() {
    alert("لینکا ڤەگەراندنێ بۆ ئیمەیڵا تە هاتە ناردن! 📩");
}
