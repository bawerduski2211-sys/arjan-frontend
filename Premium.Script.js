// --- Bawerduski Updated Frontend Core ---
let loginAttempts = 0;
let isLocked = false;

// ١. فەنکشنا تومارکرنا ئەکاونتێ نوی (Sign Up)
async function handleSignup() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const pass1 = document.getElementById('reg-pass').value;
    const pass2 = document.getElementById('reg-pass-confirm').value;

    // مەرج: پێدڤییە هەمی خانە پڕ بن
    if (!name || !email || !phone || !pass1 || !pass2) {
        alert("تکایە هەمی خانەیان پڕ بکە! ⚠️");
        return;
    }

    // مەرج: پێدڤییە پاسۆرد و دووبارە پاسۆرد وەک ئێک بن
    if (pass1 !== pass2) {
        alert("پاسۆرد وەک ئێک نینن! ❌");
        return;
    }

    try {
        // لێرە داتایان د هنێرین بۆ Backend دا د خشتێ Users دا سەیڤ بن
        console.log("Sending to Database:", { name, email, phone, pass1 });
        
        // ئەگەر سەرکەفتی بوو:
        alert("ئەکاونت ب سەرکەفتی هاتە دروستکرن! ✅");
        showForm('login-form'); 
    } catch (error) {
        alert("خەلەتیەک چێبوو! دووبارە تاقی بکەڤە.");
    }
}

// ٢. فەنکشنا چوونە ژوورێ (Login)
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
            // تومارکرنا ناڤێ هاکەری د داتابەیسێ دا
            await logHackerToDatabase(email);
            alert("سیستم هاتە قوفڵکرن ژ بەر هەوڵدانێن زۆر! 🔒");
        } else {
            alert(`پاسۆرد خەلەتە! هەوڵدانا ${loginAttempts} ژ ٤. ⚠️`);
        }
    } else {
        alert("بخێر بێی بۆ Diamond System! ✨");
        window.location.href = "admin-panel.html";
    }
}

// --- فەنکشنێن هاریکار ---
function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}

function playFlash() {
    const overlay = document.querySelector('.gold-overlay');
    if (overlay) overlay.style.animation = 'fadeOutGold 1.5s forwards';
}
