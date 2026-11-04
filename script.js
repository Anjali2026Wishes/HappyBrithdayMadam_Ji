
// ==========================================
// 1. TYPING GREETING ANIMATION
// ==========================================

const greeting = document.querySelector(".greeting");

const greetingText =
    "If I could choose one beautiful view to keep forever, it would always be you.";

if (greeting) {
    let character = 0;

    function typeGreeting() {
        if (character >= greetingText.length) return;

        greeting.textContent += greetingText[character];
        character++;

        window.setTimeout(typeGreeting, 36);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        greeting.textContent = greetingText;
    } else {
        typeGreeting();
    }
}


// ==========================================
// 2. FLOATING SPARKLES
// ==========================================

const sparkleChoices = ["♡", "✦", "✧"];

function createSparkle() {
    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.setAttribute("aria-hidden", "true");

    sparkle.textContent =
        sparkleChoices[Math.floor(Math.random() * sparkleChoices.length)];

    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${75 + Math.random() * 25}vh`;

    sparkle.style.color =
        Math.random() > 0.5 ? "#f3d09a" : "#f0a3ae";

    sparkle.style.fontSize = `${14 + Math.random() * 14}px`;

    document.body.appendChild(sparkle);

    sparkle.addEventListener(
        "animationend",
        () => sparkle.remove(),
        { once: true }
    );
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(createSparkle, 850);
}


// ==========================================
// 3. BIRTHDAY SONG AUTOPLAY
// ==========================================

const birthdaySong = document.querySelector("#birthday-song");
const autoplayHint = document.querySelector("#autoplay-hint");
const nextPageLink = document.querySelector(".cta-button");

if (birthdaySong) {

    // Try automatic playback
    async function startBirthdaySong() {

        if (!birthdaySong.paused) return;

        try {

            await birthdaySong.play();

            console.log("Raabta started playing!");

            if (autoplayHint) {
                autoplayHint.hidden = true;
            }

        } catch (error) {

            if (error.name === "NotAllowedError") {

                // Browser blocked autoplay
                if (autoplayHint) {
                    autoplayHint.hidden = false;
                }

                console.log(
                    "Autoplay blocked. Waiting for user interaction."
                );

            } else {

                console.error("Song playback error:", error);

            }
        }
    }


    // Try autoplay when page loads
    window.addEventListener("load", startBirthdaySong);

    // Try again when page becomes visible
    document.addEventListener("visibilitychange", () => {

        if (!document.hidden) {
            startBirthdaySong();
        }

    });


    // Start song on first user interaction if autoplay was blocked
    function handleFirstInteraction() {

        if (birthdaySong.paused) {
            startBirthdaySong();
        }

        document.removeEventListener("pointerdown", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
    }

    document.addEventListener("pointerdown", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);


    // Hide hint when song starts
    birthdaySong.addEventListener("playing", () => {

        if (autoplayHint) {
            autoplayHint.hidden = true;
        }

    });


    // Song loading error
    birthdaySong.addEventListener("error", () => {

        console.error("Raabta40.mp3 could not be loaded.");

    });


    // Pause song before navigating to next page
    if (nextPageLink) {

        nextPageLink.addEventListener("click", () => {
            birthdaySong.pause();
        });

    }


    // Pause when leaving the page
    window.addEventListener("pagehide", () => {
        birthdaySong.pause();
    });


    // Initial autoplay attempt
    startBirthdaySong();
}
