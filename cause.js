const loveNotes = [
    {
        image: "img2.jpeg",
        title: "The face I could never stop admiring",
        text: "Those soft eyes, that lovely little smile—you are breathtaking up close, and somehow even more beautiful in all the quiet details."
    },
    {
        image: "img1.jpeg",
        title: "You make every celebration glow",
        text: "With all those pink balloons around you, I still notice you first. You bring your own kind of light to every special day."
    },
    {
        image: "img3.jpeg",
        title: "Effortlessly lovely",
        text: "There is such a calm, graceful beauty in this moment. You never need to try too hard—being your beautiful self is more than enough."
    },
    {
        image: "img5.jpeg",
        title: "Your softness is your magic",
        text: "The gentle, thoughtful way you carry yourself is one of the things I treasure most. You make tenderness look beautiful."
    },
    {
        image: "img9.jpeg",
        title: "A little closer to my heart",
        text: "Your sweet expression and that soft pink look feel like a warm hug in a photo. I could keep this one close forever."
    },
    {
        image: "img8.jpeg",
        title: "My sunshine, even on an ordinary day",
        text: "Among all that lovely green, you look like the sunshine found its favorite person. Your gentle presence makes everything feel brighter."
    },
    {
        image: "img6.jpeg",
        title: "Beautiful in your own way",
        text: "That blue suits your quiet confidence so perfectly. I love how every side of you—bold, gentle, playful, thoughtful—is still unmistakably you."
    },
    {
        image: "img7.jpeg",
        title: "I’m proud of your strong heart",
        text: "This picture reminds me how much determination you have. I admire the strength behind your softness, and I’ll always be cheering for you."
    },
    {
        image: "img13.jpeg",
        title: "You’re the sparkle in every season",
        text: "All those festive lights are lovely, but you are still the brightest thing in the frame. You make even an ordinary evening feel special."
    },
    {
        image: "img4.jpeg",
        title: "I’d follow you to the edge of the world",
        text: "This mountain view is beautiful, but the feeling this photo gives me is even better: wherever the road leads, I’d be happiest sharing it with you."
    },
    {
        image: "img11.jpeg",
        title: "A whole world of memories ahead",
        text: "You, the mountains, and all that open sky—it makes me dream of every beautiful place and little adventure we still have ahead of us."
    },
    {
        image: "img12.jpeg",
        title: "You make the whole world feel magical",
        text: "In the snow and open sky, you look so peaceful and lovely. I hope life always gives you reasons to look up, laugh, and feel this happy."
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
