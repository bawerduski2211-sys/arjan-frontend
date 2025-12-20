// گوهۆڕین د ناڤبەرا Login و SignUp
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// ناردنا کۆدێ ٦ ژمارەیی
function sendOTP() {
    const email = document.getElementById('sign-email').value;
    if (email === "" || !email.includes("@")) {
        alert("تکایە ئیمێڵەکێ درست بنڤیسە!");
        return;
    }
    // ڤەشارطنا بەشێ ئێکێ و نیشاندانا خانەیا کۆدی
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('otp-section').classList.remove('hidden');
    console.log("OTP Sent to: " + email);
}

// زڤڕین بۆ پاش
function backToSignUp() {
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('otp-section').classList.add('hidden');
}

// پشکنینا چوونەژۆرێ
function validateLogin() {
    const user = document.getElementById('log-user').value;
    const pass = document.getElementById('log-pass').value;
    if(user && pass) {
        alert("خۆش هاتى! نوکە دێ چییە ناڤ سیستەمی.");
        window.location.href = "profile.html"; // یان هەر لاپەرەکێ تە بڤێت
    } else {
        alert("تکایە هەمی خانەیان تژی بکە.");
    }
}
