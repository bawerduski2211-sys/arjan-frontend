// --- Diamond System Core Script ---

async function handleSignUp() {
    // ١. وەرگرتنا زانیارییان ژ خانەیێن سایتێ
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    // پشکنینا پاسۆردی
    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        // ٢. دروستکرنا ئەکاونتی د بەشێ Auth دا
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: pass
        });

        if (authError) throw authError;

        // ٣. سەیڤکرنا ناڤ و موبایلێ د خشتێ 'users' دا ب پیتا بچووک
        const { error: dbError } = await supabase
            .from('users')
            .insert([
                { 
                    full_name: name, 
                    phone: phone, 
                    email: email 
                }
            ]);

        if (dbError) throw dbError;

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە تومارکرن ✅");
        showForm('login-form');

    } catch (error) {
        alert("ئیرۆر: " + error.message);
    }
}

function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}
