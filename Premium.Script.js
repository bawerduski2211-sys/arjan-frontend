// --- Bawerduski Frontend Core ---
let loginAttempts = 0;
let isLocked = false;

async function validateLogin() {
    if (isLocked) {
        alert("سیستم یا قوفڵکرییە! ⏳");
        return;
    }

    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-pass').value;

    // پاسۆردێ ئەدمینی
    const adminPass = "Bawerduski@2024"; 

    if (password !== adminPass) {
        loginAttempts++;
        if (loginAttempts >= 4) {
            isLocked = true;
            await logHackerToDatabase(email);
        } else {
            alert(`پاسۆرد خەلەتە! هەوڵدانا ${loginAttempts} ژ ٤. ⚠️`);
        }
    } else {
        alert("بخێر بێی!");
        window.location.href = "admin-panel.html";
    }
}

// ئەنیمەیشنا تیشکا زێڕین
function playFlash(type) {
    const overlay = document.querySelector('.gold-overlay');
    if (!overlay) return;
    overlay.style.animation = 'fadeOutGold 1.5s forwards';
}

function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
}
