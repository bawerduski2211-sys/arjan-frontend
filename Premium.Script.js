// --- Diamond System Core Script ---

// فەنکشنا تومارکرنێ
async function handleSignUp() {
    const name = document.getElementById('sign-name').value.trim();
    const email = document.getElementById('sign-email').value.trim();
    const phone = document.getElementById('sign-phone').value.trim();
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    // مەرج: نابیت چ خانە ڤالا بن
    if (!name || !email || !phone || !pass || !passConfirm) {
        alert("تکایە هەمی خانەیان پڕ بکە! ⚠️");
        return;
    }

    // مەرج: پێدڤییە پاسۆرد وەک ئێک بن
    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: pass,
            options: {
                data: {
                    full_name: name,
                    phone: phone
                }
            }
        });

        if (error) throw error;
        alert("ئەکاونت ب سەرکەفتی هاتە دروستکرن! ✅");
        showForm('login-form');
    } catch (error) {
        alert("خەلەتی: " + error.message);
    }
}

// فەنکشنا چوونەژۆرێ
async function validateLogin() {
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;
    const adminPass = "Bawerduski@2024"; 

    if (password === adminPass) {
        alert("بخێر بێی! ✨");
        showForm('dashboard-hub');
    } else {
        alert("پاسۆرد یان ئیمێڵ خەلەتە! ⚠️");
    }
}

// فەنکشنا گوهۆڕینا شاشەیان
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    const target = document.getElementById(formId);
    if (target) target.classList.remove('hidden');
}
