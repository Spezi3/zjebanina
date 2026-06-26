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

// Initialize click-to-load YouTube thumbnail players.
function initYouTubePlayers() {
    document.querySelectorAll('.youtube-player').forEach(player => {
        const id = player.dataset.id;
        if (!id) return;

        const title = player.dataset.title || 'YouTube video';
        const thumbHigh = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        const thumbLow = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

        const img = document.createElement('img');
        img.alt = title;
        img.className = 'yt-thumb';
        img.src = thumbHigh;
        img.onerror = () => { if (img.src !== thumbLow) img.src = thumbLow; };
        player.appendChild(img);

        const play = document.createElement('div');
        play.className = 'play-button';
        player.appendChild(play);

        player.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
            iframe.width = '560';
            iframe.height = '315';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = '0';
            player.innerHTML = '';
            player.appendChild(iframe);
        });

        player.tabIndex = 0;
        player.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                player.click();
            }
        });
    });
}

initYouTubePlayers();