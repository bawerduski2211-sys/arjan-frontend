// فۆنکشنا گوهۆڕینا فۆڕمان ب شێوەیەکێ پرۆفیشناڵ
function showForm(formId) {
    // 1. هەمی فۆڕمان بەرزە بکە
    document.querySelectorAll('.auth-card').forEach(card => {
        card.classList.add('hidden');
    });

    // 2. تنی ئەو فۆڕما هاتییە هەلبژارتن دیار بکە
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.classList.remove('hidden');
    }

    // 3. تیشکا زێڕین (Gold Flash) جارەکا دی لێ بدە
    playGoldFlash();
}

// فۆنکشنا تیشکا زێڕین یا خەفیف
function playGoldFlash() {
    const overlay = document.querySelector('.gold-overlay');
    if (overlay) {
        overlay.style.animation = 'none';
        overlay.offsetHeight; // Trigger reflow
        overlay.style.animation = 'fadeOutGold 1.5s forwards';
    }
}

// فۆنکشنا چوونەژۆرێ
function validateLogin() {
    // بکارئینەری دزڤڕینیتە لاپەرێ سەرەکی
    window.location.href = "index.html"; 
}

function sendOTP() {
    alert("کۆدێ پشتراستکرنێ بۆ مۆبایل و ئیمەیڵا تە هاتە ناردن! 📩");
}

function sendResetCode() {
    alert("لینکا ڤەگەراندنا پاسۆردێ بۆ ئیمەیڵا تە هاتە ناردن! 🔑");
}
