const buttons = document.querySelectorAll('.language-switch button');
const elements = document.querySelectorAll('[data-pl][data-en]');

function setLanguage(lang) {
    elements.forEach(el => {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    });

    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    localStorage.setItem('lang', lang);
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id === 'lang-pl' ? 'pl' : 'en';
        setLanguage(lang);
    });
});

const savedLang = localStorage.getItem('lang') || 'pl';
setLanguage(savedLang);