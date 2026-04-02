const secretSound = document.getElementById("secret-sound");
const secretLeft = document.getElementById("secret-left");
const secretRight = document.getElementById("secret-right");

if (!secretSound || !secretLeft || !secretRight) {
    console.warn("Brak elementow secret audio/buttons na stronie.");
} else {

function tryPlaySecretSound() {
    const chance = Math.random(); 

    if (chance <= 0.02) {
        secretSound.currentTime = 0;
        secretSound.play();
    }
}

secretLeft.addEventListener("click", tryPlaySecretSound);

secretRight.addEventListener("click", tryPlaySecretSound);
}