var music = document.getElementById('bg-music');
var slider = document.getElementById('volume-slider');
var label = document.getElementById('volume-label');

if (music && slider && label) {
    var started = false;

    function showVolume(v) {
        label.textContent = v == 0 ? '🔇 0%' : '🔊 ' + v + '%';
    }

    function startMusic() {
        if (started) return;
        started = true;
        music.play().catch(function () {});
    }

    var vol = 100;
    try {
        var s = localStorage.getItem('volumeLevel');
        if (s !== null) vol = Number(s);
    } catch (e) {}

    slider.value = vol;
    music.volume = vol / 100;
    showVolume(vol);

    slider.addEventListener('input', function () {
        var v = Number(slider.value);
        music.volume = v / 100;
        showVolume(v);
        try { localStorage.setItem('volumeLevel', v); } catch (e) {}
        startMusic();
    });

    document.body.addEventListener('click', startMusic, { once: true });
}
