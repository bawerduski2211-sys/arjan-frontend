function toggleAuth() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}

function sendOTP() {
    const email = document.getElementById('sign-email').value;
    if(email.includes("@") && email.length > 5) {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('otp-section').classList.remove('hidden');
    } else {
        alert("تکایە ئیمێڵەکێ درست بنڤیسە!");
    }
}

function backToSignUp() {
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('otp-section').classList.add('hidden');
}

function validateLogin() {
    alert("سیستەم نوکە دێ پشکنینێ کەت...");
}
