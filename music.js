// Pobranie elementów
const music = document.getElementById('bg-music');
const slider = document.getElementById('volume-slider');
const label = document.getElementById('volume-label');

let started = false;

// Funkcja start muzyki po interakcji
function startMusic() {
    if(!started){
        music.play().catch(() => console.log("Kliknij, aby uruchomić muzykę."));
        started = true;
    }
}

// Pierwszy klik anywhere albo przesunięcie suwaka uruchamia muzykę
document.body.addEventListener('click', startMusic, {once:true});
slider.addEventListener('input', startMusic, {once:true});

// Ustawienie głośności z localStorage
let savedVolume = localStorage.getItem('volumeLevel');
if(savedVolume !== null){
    slider.value = savedVolume;
    music.volume = savedVolume / 100;
    label.textContent = savedVolume == 0 ? '🔇 0%' : `🔊 ${savedVolume}%`;
} else {
    slider.value = 100;
    music.volume = 1;
    label.textContent = '🔊 100%';
}

// Nasłuchiwanie zmiany suwaka
slider.addEventListener('input', () => {
    const vol = slider.value;
    music.volume = vol / 100;
    label.textContent = vol == 0 ? '🔇 0%' : `🔊 ${vol}%`;
    localStorage.setItem('volumeLevel', vol);
});
