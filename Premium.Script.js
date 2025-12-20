function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
    document.getElementById('forgot-form').classList.add('hidden');
}

function showForgotForm() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('forgot-form').classList.remove('hidden');
}

function validateLogin() {
    // بکارئینەری دزڤڕینیتە لاپەرێ سەرەکی
    window.location.href = "index.html"; 
}

function sendOTP() {
    alert("کۆدێ پشتراستکرنێ هاتە ناردن! 📩");
}

function sendResetCode() {
    alert("لینکا ڤەگەراندنێ بۆ ئیمەیڵا تە هاتە ناردن! 📩");
}
