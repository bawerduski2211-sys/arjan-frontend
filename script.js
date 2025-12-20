// 1. Digital Clock - سەعەتا دیجیتال ب کاتی هەولێر و دهۆک
function updateClock() {
    const saetElement = document.getElementById('saet');
    if (saetElement) {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false, 
            timeZone: 'Asia/Baghdad' 
        };
        const timeString = new Intl.DateTimeFormat('en-GB', options).format(now);
        saetElement.textContent = timeString;
    }
}

// 2. Neon Mode Toggle - گوهۆڕینا ڕەنگی بۆ مۆر و شین
function toggleNeonMode() {
    // گوهۆڕین ل سەر ئاستێ Body دا ستایل کارتێکرنێ لێ بکەت
    document.body.classList.toggle('neon-active');
    
    const button = document.querySelector('.js-test-button');
    if (document.body.classList.contains('neon-active')) {
        button.textContent = 'DEACTIVATE NEON';
    } else {
        button.textContent = 'ACTIVATE NEON MODE';
    }
}

// 3. Image Click Effect - ئەنیمەیشنا گەشبوونا وێنەی
function imageClickGlow() {
    const profileContainer = document.querySelector('.profile-container');
    if (profileContainer) {
        profileContainer.style.transition = "0.3s";
        profileContainer.style.boxShadow = "0 0 50px var(--color-primary)";
        
        setTimeout(() => {
            profileContainer.style.boxShadow = "0 0 20px var(--color-primary)";
        }, 300);
    }
}

// دەستپێکرنا سەعەتێ
updateClock(); 
setInterval(updateClock, 1000);
