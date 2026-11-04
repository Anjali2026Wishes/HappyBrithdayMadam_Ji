const greeting = document.querySelector(".greeting");
const greetingText = "If I could choose one beautiful view to keep forever, it would always be you.";

if (greeting) {
    let character = 0;

    function typeGreeting() {
        if (character >= greetingText.length) return;
        greeting.textContent += greetingText[character];
        character += 1;
        window.setTimeout(typeGreeting, 36);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        greeting.textContent = greetingText;
    } else {
        typeGreeting();
    }
}

const sparkleChoices = ["♡", "✦", "✧"];

function createSparkle() {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.setAttribute("aria-hidden", "true");
    sparkle.textContent = sparkleChoices[Math.floor(Math.random() * sparkleChoices.length)];
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${75 + Math.random() * 25}vh`;
    sparkle.style.color = Math.random() > 0.5 ? "#f3d09a" : "#f0a3ae";
    sparkle.style.fontSize = `${14 + Math.random() * 14}px`;
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove(), { once: true });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(createSparkle, 850);
}

const birthdaySong = document.querySelector("#birthday-song");
const nextPageLink = document.querySelector(".cta-button");
let playbackFallbackInstalled = false;

function removePlaybackFallback() {
    if (!playbackFallbackInstalled) return;
    document.removeEventListener("pointerdown", startBirthdaySong, true);
    document.removeEventListener("touchend", startBirthdaySong, true);
    document.removeEventListener("keydown", startBirthdaySong, true);
    playbackFallbackInstalled = false;
}

function startBirthdaySong() {
    if (!birthdaySong.paused) return;

    birthdaySong.play().catch((error) => {
        if (error.name === "NotAllowedError") {
            if (playbackFallbackInstalled) return;
            playbackFallbackInstalled = true;
            document.addEventListener("pointerdown", startBirthdaySong, true);
            document.addEventListener("touchend", startBirthdaySong, true);
            document.addEventListener("keydown", startBirthdaySong, true);
            return;
        }

        console.error("Could not play the birthday song:", error);
    });
}

birthdaySong.addEventListener("playing", removePlaybackFallback);

birthdaySong.addEventListener("error", () => {
    console.error("The birthday song could not be loaded.");
});

nextPageLink.addEventListener("click", () => {
    birthdaySong.pause();
});

window.addEventListener("pagehide", () => {
    birthdaySong.pause();
});

window.addEventListener("pageshow", startBirthdaySong);
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startBirthdaySong();
});

startBirthdaySong();
