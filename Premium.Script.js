// ARJAN SYSTEM - PREMIUM LOGIC

// 1. گوهۆڕین د ناڤبەرا Login و SignUp
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // ئەنیمەیشنا سادە بۆ گوهۆڕینێ
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// 2. ناردنا کۆدێ 6 ژمارەیی (OTP)
function sendOTP() {
    const email = document.getElementById('sign-email').value;
    const name = document.getElementById('sign-name').value;

    if (email.includes("@") && name.length > 2) {
        // نیشاندانا بارکرنێ (Loading)
        const btn = document.querySelector('#step-1 .btn-diamond');
        btn.innerText = "SENDING...";
        
        setTimeout(() => {
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('otp-section').classList.remove('hidden');
            console.log("OTP Sent to: " + email);
        }, 1500);
    } else {
        alert("تکایە ناڤ و ئیمێڵەکێ درست بنڤیسە!");
    }
}

// 3. زڤڕین بۆ پاش (Back Button)
function backToSignUp() {
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('otp-section').classList.add('hidden');
}

// 4. پشکنینا چوونەژۆرێ (Login Validation)
function validateLogin() {
    const user = document.getElementById('log-user').value;
    const pass = document.getElementById('log-pass').value;

    if(user && pass) {
        // ل ڤێرە تو دشێی بکارئینەری ببەی بۆ هەر لاپەرەکێ تە بڤێت
        alert("ب خێر بێی بۆ ARJAN DIAMOND! چوونەژۆر سەرکەفتی بوو.");
        window.location.href = "profile.html"; 
    } else {
        alert("تکایە هەمی خانەیان تژی بکە.");
    }
}

// 5. تمامکرنا تومارکرنێ (Verify & Register)
function handleSignUp() {
    const otp = document.getElementById('otp-input').value;
    if(otp.length === 6) {
        alert("ئەکاونت ب سەرکەفتی هاتە دروستکرن! 🚀");
        window.location.href = "profile.html";
    } else {
        alert("تکایە کۆدێ 6 ژمارەیی ب دروستی بنڤیسە.");
    }
}
