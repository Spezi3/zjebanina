const buttons = document.querySelectorAll('.language-switch button');
const elements = document.querySelectorAll('[data-pl][data-en]');

function getStoredLanguage() {
    try {
        return localStorage.getItem('lang');
    } catch {
        return null;
    }
}

function storeLanguage(lang) {
    try {
        localStorage.setItem('lang', lang);
    } catch {
        // Ignore storage failures and keep the current in-memory language.
    }
}

function setLanguage(lang) {
    const normalizedLang = lang === 'en' ? 'en' : 'pl';

    elements.forEach(el => {
        if (el.dataset[normalizedLang]) {
            el.textContent = el.dataset[normalizedLang];
        }
    });

    document.documentElement.lang = normalizedLang;
    document.body.classList.toggle('lang-en', normalizedLang === 'en');

    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${normalizedLang}`);
    if (activeBtn) activeBtn.classList.add('active');

    storeLanguage(normalizedLang);
    updateVisitCounter();
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id === 'lang-pl' ? 'pl' : 'en';
        setLanguage(lang);
    });
});

const savedLang = getStoredLanguage() || 'pl';
setLanguage(savedLang);

function updateGalleryCount(galleryId, countId) {
    const gallery = document.getElementById(galleryId);
    const count = document.getElementById(countId);

    if (!gallery || !count) {
        return;
    }

    const imagesCount = gallery.querySelectorAll('img').length;
    count.textContent = `(${imagesCount})`;
}

updateGalleryCount('my-arts-gallery', 'my-arts-count');
updateGalleryCount('fanarts-gallery', 'fanarts-count');