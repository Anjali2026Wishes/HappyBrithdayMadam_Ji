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

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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
        sparkleChoices[
            Math.floor(Math.random() * sparkleChoices.length)
        ];

    sparkle.style.left =
        `${Math.random() * 100}vw`;

    sparkle.style.top =
        `${75 + Math.random() * 25}vh`;

    sparkle.style.color =
        Math.random() > 0.5
            ? "#f3d09a"
            : "#f0a3ae";

    sparkle.style.fontSize =
        `${14 + Math.random() * 14}px`;

    document.body.appendChild(sparkle);

    sparkle.addEventListener(
        "animationend",
        () => sparkle.remove(),
        { once: true }
    );
}


if (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    window.setInterval(createSparkle, 850);
}


// ==========================================
// 3. BIRTHDAY SONG
// ==========================================

const birthdaySong =
    document.querySelector("#birthday-song");

const autoplayHint =
    document.querySelector("#autoplay-hint");


if (birthdaySong) {

    let songStarted = false;


    // --------------------------------------
    // PLAY SONG
    // --------------------------------------

    async function playBirthdaySong() {

        // Already playing
        if (!birthdaySong.paused) {
            return;
        }


        try {

            await birthdaySong.play();

            songStarted = true;

            console.log("🎵 Raabta started playing");


            if (autoplayHint) {
                autoplayHint.hidden = true;
            }


        } catch (error) {

            console.log(
                "Audio could not start:",
                error.name
            );


            if (autoplayHint) {
                autoplayHint.hidden = false;
            }

        }

    }


    // ======================================
    // 4. TRY AUTOPLAY WHEN PAGE LOADS
    // ======================================

    window.addEventListener(
        "load",
        () => {

            playBirthdaySong();

        }
    );


    // Also try immediately
    playBirthdaySong();



    // ======================================
    // 5. REAL USER INTERACTION
    // ======================================

    /*
       These events are important because
       Chrome / Edge / Safari may block
       autoplay until the user interacts
       with the page.
    */


    // Mouse click
    document.addEventListener(
        "click",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        }
    );


    // Pointer interaction
    document.addEventListener(
        "pointerdown",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        }
    );


    // Mouse down
    document.addEventListener(
        "mousedown",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        }
    );


    // Mobile touch
    document.addEventListener(
        "touchstart",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        },
        {
            passive: true
        }
    );


    // Mobile swipe
    document.addEventListener(
        "touchmove",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        },
        {
            passive: true
        }
    );


    // Keyboard
    document.addEventListener(
        "keydown",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        }
    );



    // ======================================
    // 6. SCROLL
    // ======================================

    window.addEventListener(
        "scroll",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        },
        {
            passive: true
        }
    );



    // ======================================
    // 7. MOUSE WHEEL
    // ======================================

    window.addEventListener(
        "wheel",
        () => {

            if (!songStarted) {
                playBirthdaySong();
            }

        },
        {
            passive: true
        }
    );



    // ======================================
    // 8. SONG STARTED SUCCESSFULLY
    // ======================================

    birthdaySong.addEventListener(
        "playing",
        () => {

            songStarted = true;

            console.log("❤️ Raabta is playing");

            if (autoplayHint) {
                autoplayHint.hidden = true;
            }

        }
    );



    // ======================================
    // 9. SONG LOADING ERROR
    // ======================================

    birthdaySong.addEventListener(
        "error",
        () => {

            console.error(
                "❌ Raabta40.mp3 could not be loaded."
            );

            console.error(
                "Check the path:"
            );

            console.error(
                "./Static/Raabta40.mp3"
            );

        }
    );



    // ======================================
    // 10. CHECK AUDIO WHEN PAGE BECOMES
    //     VISIBLE AGAIN
    // ======================================

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                !document.hidden &&
                birthdaySong.paused
            ) {

                playBirthdaySong();

            }

        }
    );

}