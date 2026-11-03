// jezyk
var langButtons = document.querySelectorAll('.lang button');
var texts = document.querySelectorAll('[data-pl][data-en]');

function setLang(lang) {
    if (lang !== 'en') lang = 'pl';
    texts.forEach(function (el) {
        el.textContent = el.getAttribute('data-' + lang);
    });
    document.documentElement.lang = lang;
    langButtons.forEach(function (b) {
        b.classList.toggle('active', b.id === 'lang-' + lang);
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
}

langButtons.forEach(function (b) {
    b.addEventListener('click', function () {
        setLang(b.id === 'lang-en' ? 'en' : 'pl');
    });
});

var saved = null;
try { saved = localStorage.getItem('lang'); } catch (e) {}
setLang(saved);
