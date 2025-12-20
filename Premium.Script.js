function showForm(formId) {
    document.querySelectorAll('.auth-card').forEach(card => card.classList.add('hidden'));
    document.getElementById(formId).classList.remove('hidden');
    playGoldFlash();
}

function playGoldFlash() {
    const overlay = document.querySelector('.gold-overlay');
    overlay.style.animation = 'none';
    overlay.offsetHeight; 
    overlay.style.animation = 'fadeOutGold 1.5s forwards';
}

function validateLogin() {
    window.location.href = "index.html"; 
}
