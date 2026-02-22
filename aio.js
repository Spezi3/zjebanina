const secretSound = document.getElementById("secret-sound");

function tryPlaySecretSound() {
    const chance = Math.random(); 

    if (chance <= 0.02) {
        secretSound.currentTime = 0;
        secretSound.play();
        console.log("🔥 SECRET SOUND!");
    } else {
        console.log("❌ Nic się nie stało");
    }
}

document.getElementById("secret-left")
    .addEventListener("click", tryPlaySecretSound);

document.getElementById("secret-right")
    .addEventListener("click", tryPlaySecretSound);