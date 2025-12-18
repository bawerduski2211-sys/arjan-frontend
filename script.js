// 1. Digital Clock - کارکرنا سەعەتێ ب کاتی دهۆک و هەولێر
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
        // نیشاندانا دەمی ب شێوازێ ستاندارد
        saetElement.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);
    }
}

// 2. Neon Mode Toggle - کارکرنا دوگمەیا گۆهۆڕینا ڕەنگی (نێئۆن)
function toggleNeonMode() {
    // چالاککرنا کلاسا نێئۆن ل سەر Body دا هەمی سایت ڕەنگ بگۆهۆڕیت
    document.body.classList.toggle('neon-active');
    
    const button = document.querySelector('.js-test-button');
    if (button) {
        if (document.body.classList.contains('neon-active')) {
            button.textContent = 'DEACTIVATE NEON';
        } else {
            button.textContent = 'ACTIVATE NEON MODE';
        }
    }
}

// 3. Image Click Effect - ئەنیمەیشنا گەشبوونا وێنەی دەمێ کلیک لێ دهێتە کرن
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

// دەستپێکرنا سەعەتێ هەما ل دەسپێکێ
updateClock(); 
setInterval(updateClock, 1000);
