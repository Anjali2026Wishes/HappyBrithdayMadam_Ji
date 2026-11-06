const loveNotes = [
    {
        image: "img1.png",
        title: "Grace that feels like home",
        text: "The warm lights, the green around you, and that beautiful saree make this photo glow—but your calm, lovely presence is what makes it unforgettable."
    },
    {
        image: "img2.jpeg",
        title: "That playful little smile",
        text: "Your bright eyes and that cheeky wink make me smile every time. I love how effortlessly you can turn an ordinary moment into my favorite one."
    },
    {
        image: "img3.jpeg",
        title: "A heart full of sweetness",
        text: "Even through a photo, your playful warmth shines through. You have a way of making my heart feel a little lighter and a lot more loved."
    },
    {
        image: "img4.png",
        title: "My favorite kind of glow",
        text: "The blue suits you beautifully, but it is your gentle smile that catches my eye. I could keep finding new reasons to admire you in every photo."
    },
    {
        image: "img5.png",
        title: "Pretty in every little detail",
        text: "The flowers, the soft colors, and your graceful pose feel like a scene from a dream. You make elegance look completely effortless, Anjali."
    },
    {
        image: "img6.png",
        title: "The sparkle in the evening",
        text: "The lights around you are lovely, but your confident, beautiful smile is the real sparkle. I adore this side of you."
    },
    {
        image: "img7.png",
        title: "A little collage of my favorite you",
        text: "Every frame has that sweet, familiar expression I adore. If I could keep a thousand little glimpses of you, I still would never have enough."
    },
    {
        image: "img8.png",
        title: "A dream in pink",
        text: "You look absolutely radiant in pink. The whole photo feels soft and magical, just like the happiness you bring into my life."
    },
    {
        image: "img9.png",
        title: "The smile I want to remember",
        text: "With roses and warm lights all around, this close-up feels like a little love note on its own. Your smile is still the prettiest thing here."
    },
    {
        image: "img5.png",
        title: "Beautiful in every little detail",
        text: "Your graceful smile and the soft pink flowers make this moment feel like a dream. I hope you see yourself through my eyes: wonderful in every way."
    },
    {
        image: "img11.png",
        title: "Every adventure is better with you",
        text: "You and those beautiful mountains make me dream of all the places we could explore together. Wherever we go, being beside you is my favorite view."
    },
    {
        image: "img12.png",
        title: "My sunshine in every season",
        text: "That bright saree and all the greenery make this picture feel full of joy. You bring that same warmth and color into my life every day."
    }
];

const container = document.querySelector("#reasons-container");
const fragment = document.createDocumentFragment();
const causeSong = document.querySelector("#cause-song");
const memoryDialog = document.querySelector(".memory-dialog");
const viewedNotes = new Set();
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector(".progress-fill");
const progressLabel = document.querySelector(".progress-label");

function retryCauseSongAfterInteraction() {
    window.removeEventListener("pointerdown", startCauseSong);
    window.removeEventListener("keydown", startCauseSong);
    startCauseSong();
}

function startCauseSong() {
    if (!causeSong.paused) return;

    causeSong.play().catch((error) => {
        if (error.name !== "NotAllowedError") {
            console.error("Could not play the cause page song:", error);
        }
        window.addEventListener("pointerdown", retryCauseSongAfterInteraction, { once: true });
        window.addEventListener("keydown", retryCauseSongAfterInteraction, { once: true });
    });
}

document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener("click", () => causeSong.pause());
});

window.addEventListener("pagehide", () => causeSong.pause());
window.addEventListener("pageshow", startCauseSong);
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) startCauseSong();
});

causeSong.addEventListener("error", () => {
    console.error("The cause page song could not be loaded.");
});

loveNotes.forEach((note, index) => {
    const card = document.createElement("article");
    card.className = `reason-card${index === 0 ? " featured-card" : ""}`;
    card.style.setProperty("--card-order", index);

    const imageFrame = document.createElement("div");
    imageFrame.className = "reason-image-frame";

    const image = document.createElement("img");
    image.className = "reason-image";
    image.src = `./Static/${note.image}`;
    image.alt = note.title;
    image.loading = index < 3 ? "eager" : "lazy";
    image.decoding = "async";

    const openPhoto = document.createElement("button");
    openPhoto.className = "photo-open";
    openPhoto.type = "button";
    openPhoto.setAttribute("aria-label", `Open photo: ${note.title}`);
    openPhoto.addEventListener("click", () => {
        const dialogImage = memoryDialog.querySelector(".dialog-image");
        dialogImage.src = image.src;
        dialogImage.alt = note.title;
        memoryDialog.querySelector(".dialog-title").textContent = note.title;
        memoryDialog.querySelector(".dialog-text").textContent = note.text;
        memoryDialog.showModal();
    });

    const copy = document.createElement("div");
    copy.className = "reason-copy";

    const title = document.createElement("h2");
    title.className = "reason-title";
    title.textContent = note.title;

    const text = document.createElement("p");
    text.className = "reason-text";
    text.textContent = note.text;

    openPhoto.append(image);
    imageFrame.append(openPhoto);
    copy.append(title, text);
    card.append(imageFrame, copy);
    fragment.appendChild(card);

    card.dataset.noteIndex = String(index);
});

container.appendChild(fragment);
startCauseSong();

document.querySelector(".dialog-close").addEventListener("click", () => memoryDialog.close());
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && memoryDialog.open) memoryDialog.close();
});
memoryDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    memoryDialog.close();
});
memoryDialog.addEventListener("click", (event) => {
    if (event.target === memoryDialog) memoryDialog.close();
});

function markNoteViewed(card) {
    const index = Number(card.dataset.noteIndex);
    viewedNotes.add(index);
    card.classList.add("is-visible");
    const count = viewedNotes.size;
    progressTrack.setAttribute("aria-valuenow", String(count));
    progressFill.style.width = `${(count / loveNotes.length) * 100}%`;
    progressLabel.textContent = count === loveNotes.length
        ? "You’ve seen every little love note ♡"
        : `${count} of ${loveNotes.length} little love notes`;
}

if ("IntersectionObserver" in window) {
    const noteObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            markNoteViewed(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.25 });

    container.querySelectorAll(".reason-card").forEach((card) => noteObserver.observe(card));
} else {
    container.querySelectorAll(".reason-card").forEach(markNoteViewed);
}

const scrollProgress = document.querySelector(".scroll-progress span");
let scrollUpdatePending = false;

function updateScrollProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
    scrollUpdatePending = false;
}

window.addEventListener("scroll", () => {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateScrollProgress);
}, { passive: true });

updateScrollProgress();
