// 1. گرێدانا داتابەیسێ ب کلیلێن تە
const supabaseUrl = 'https://bawerduski2211-sys-s-project.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhd2VyZHVza2kyMjExLXN5cy1zLXByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDgxNDI4MCwiZXhwIjoyMDUwMzkwMjgwfQ.qR5q8z_1Xq3Xm-yN-4N9yN-yN-yN-yN-yN-yN-yN';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. فەنکشنا گوهۆڕینا فۆڕمان (Toggle Forms)
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if(target) target.classList.remove('hidden');
}

// 3. دروستکرنا ئەکاونتێ نوو (Signup)
async function handleSignUp() {
    const inputs = document.querySelectorAll('#signup-form input');
    const fullName = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const password = inputs[3].value;

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: fullName, phone_number: phone }
        }
    });

    if (error) alert("خەلەتی: " + error.message);
    else alert("ئەکاونت ب سەرکەفتیی هاتە دروستکرن! سەیری ئیمەیڵا خۆ بکە.");
}

// 4. چوونەژۆر (Login)
async function validateLogin() {
    const inputs = document.querySelectorAll('#login-form input');
    const email = inputs[0].value;
    const password = inputs[1].value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) alert("ئیمەیڵ یان پاسۆرد خەلەتە!");
    else {
        alert("بخێر بێی بۆ ARJAN SYSTEM!");
        window.location.href = "home.html"; // یان ناڤێ پەیجێ سەرەکی یێ تە
    }
}

// 5. ریستکرنا پاسۆردی (Reset Password)
async function handleReset() {
    const email = document.querySelector('#forgot-form input').value;
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) alert("خەلەتی: " + error.message);
    else alert("لینکا گوهۆڕینا پاسۆردی بۆ ئیمەیڵا تە هاتە فرێکرن.");
}

// گرێدانا دوگمەیان ب فەنکشنان ڤە پشتی لاپەرە "Load" دبیت
document.addEventListener('DOMContentLoaded', () => {
    // دوگمەیا Signup (SEND CODE)
    const signupBtn = document.querySelector('#signup-form .btn-diamond');
    if (signupBtn) signupBtn.onclick = handleSignUp;

    // دوگمەیا Reset Password (SEND RESET LINK)
    const resetBtn = document.querySelector('#forgot-form .btn-diamond');
    if (resetBtn) resetBtn.onclick = handleReset;
});
