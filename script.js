// script.js
const buttons = document.querySelectorAll('.language-switch button');
const elements = document.querySelectorAll('[data-pl][data-en]');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const lang = btn.id === 'lang-pl' ? 'pl' : 'en';
        elements.forEach(el => el.textContent = el.dataset[lang]);
    });
});
