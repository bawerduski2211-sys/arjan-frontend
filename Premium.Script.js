// --- Diamond System - Premium Script ---

let loginAttempts = 0;
let isLocked = false;

// ١. فەنکشنا دروستکرنا ئەکاونتی (Sign Up) ب هەمی مەرجان ڤە
async function handleSignUp() {
    const name = document.getElementById('sign-name').value.trim();
    const email = document.getElementById('sign-email').value.trim();
    const phone = document.getElementById('sign-phone').value.trim();
    const pass = document.getElementById('sign-pass').value;
    const passConfirm = document.getElementById('sign-pass-confirm').value;

    // مەرجێ ئێکێ: پێدڤییە هەمی خانە پڕ بن
    if (!name || !email || !phone || !pass || !passConfirm) {
        alert("تکایە هەمی خانەیان پڕ بکە! (ناڤ، ئیمێڵ، موبایل، پاسۆرد) ⚠️");
        return;
    }

    // مەرجێ دویێ: پێدڤییە پاسۆرد و دووبارە پاسۆرد وەک ئێک بن
    if (pass !== passConfirm) {
        alert("خەلەتی: پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    // مەرجێ سێیێ: درێژیا پاسۆردی (پێشنیار: کێمتر ژ ٦ پیت نەبیت)
    if (pass.length < 6) {
        alert("پێدڤییە پاسۆرد کێمتر ژ ٦ نیشانان نەبیت! 🔑");
        return;
    }

    try {
        // هنارتنا داتایان بۆ Supabase
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

        alert("پیرۆزە! ئەکاونت ب سەرکەفتی هاتە دروستکرن. ✅");
        showForm('login-form'); // زڤڕین بۆ لاپەرێ چوونەژۆرێ

    } catch (error) {
        alert("خەلەتیەک چێبوو: " + error.message);
    }
}

// ٢. فەنکشنا چوونەژۆرێ (Login)
async function validateLogin() {
    if (isLocked) {
        alert("سیستم یا قوفڵکرییە! ⏳");
        return;
    }

    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;
    const adminPass = "Bawerduski@2024"; 

    if (password !== adminPass) {
        loginAttempts++;
        if (loginAttempts >= 4) {
            isLocked = true;
            alert("سیستم هاتە قوفڵکرن ژ بەر هەوڵدانێن زۆر! 🔒");
        } else {
            alert(`پاسۆرد خەلەتە! هەوڵدانا ${loginAttempts} ژ ٤. ⚠️`);
        }
    } else {
        alert("بخێر بێی بۆ Diamond System! ✨");
        showForm('dashboard-hub');
    }
}

// ٣. فەنکشنێن نیشادانا فۆڕمان
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}
