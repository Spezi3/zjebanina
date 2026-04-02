function initVisitCounter() {
    let visits = localStorage.getItem('visitCount') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visitCount', visits);
    updateVisitCounter();
}

function updateVisitCounter() {
    const counterEl = document.getElementById('visit-counter');
    if (!counterEl) return;
    const visits = localStorage.getItem('visitCount') || 0;
    const lang = document.documentElement.lang || 'pl';
    const prefix = counterEl.dataset[lang] || 'Odwiedzin: ';
    counterEl.textContent = `${prefix}${visits}`;
}

initVisitCounter();