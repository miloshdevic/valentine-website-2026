// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Global state
let wrongAnswerClicks = 0;

// Validate configuration
function validateConfig() {
    const warnings = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "My Love";
    }

    // Validate colors
    const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            config.colors[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    if (parseFloat(config.animations.floatDuration) < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate configuration first
    validateConfig();

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();

    // Setup generic text content
    document.getElementById('valentineTitle').textContent = `Moja malena...`;

    // Set first question texts
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;

    // Set second question texts
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('correctBtn').textContent = config.questions.second.startText;
    document.getElementById('wrongBtn').textContent = config.questions.second.nextBtn;

    // Set third question texts
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;

    // Set fourth question texts
    document.getElementById('question4Text').textContent = config.questions.fourth.text;
    document.getElementById('yesBtn4').textContent = config.questions.fourth.yesBtn;
    document.getElementById('noBtn4').textContent = config.questions.fourth.noBtn;

    // Set Candidate Images for Q4 Matchmaking
    if (config.questions.fourth.candidates) {
        const c1 = document.getElementById('candidate1');
        const c2 = document.getElementById('candidate2');
        if (c1 && c2) {
            c1.src = config.questions.fourth.candidates.img1;
            c2.src = config.questions.fourth.candidates.img2;
        }
    }

    // Initialize Overlay Button
    const startBtn = document.getElementById('startBtn');
    const overlay = document.getElementById('overlay');
    const mainContainer = document.getElementById('mainContainer');
    const bgMusic = document.getElementById('bgMusic');

    startBtn.addEventListener('click', () => {
        // 1. Play Music
        if (config.music.enabled) {
            bgMusic.play().then(() => {
                document.getElementById('musicToggle').textContent = config.music.stopText;
            }).catch(e => console.log("Audio play failed", e));
        }

        // 2. Hide Overlay
        overlay.classList.add('fade-out');

        // 3. Show Main Content Immediately
        mainContainer.classList.remove('hidden');

        // 4. Start Countdown
        startCountdown();

        // 5. Clean up overlay from DOM after transition
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 800);
    });
});

// Q1 Countdown
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    const yesBtn = document.getElementById('yesBtn1');
    let timeLeft = 5;

    // Ensure elements exist before trying to use them
    if (!countdownEl || !yesBtn) return;

    countdownEl.classList.remove('hidden');

    const timer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownEl.classList.add('hidden');
            yesBtn.classList.remove('hidden');
        }
    }, 1000);
}

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');

    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');

    // Hide header title after first question
    if (questionNumber > 1) {
        document.getElementById('valentineTitle').textContent = "";
    }

    // Attempt to start music on first user interaction if not playing
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic.paused && config.music.enabled) {
        bgMusic.play().catch(() => { });
        document.getElementById('musicToggle').textContent = config.music.stopText;
    }
}

// Handle Love Choice (Q2)
function handleLoveChoice(isCorrect) {
    if (isCorrect) {
        showNextQuestion(3);
    } else {
        wrongAnswerClicks++;
        const correctBtn = document.getElementById('correctBtn');
        const wrongBtn = document.getElementById('wrongBtn');
        const messageEl = document.getElementById('wrongAnswerMessage');
        const reactionContainer = document.getElementById('reactionContainer');
        const reactionImg = document.getElementById('reactionImage');
        const reactionMediaType = document.getElementById('reactionText');

        // Update Wrong Button Text
        if (config.questions.second.nextBtnLevels) {
            const levels = config.questions.second.nextBtnLevels;
            // wrongAnswerClicks is already incremented, so 1 means first change
            if (wrongAnswerClicks <= levels.length) {
                wrongBtn.textContent = levels[wrongAnswerClicks - 1];
            }
        }

        // Logic for reaction flow
        let reactionText = ""; // Text on the image
        let reactionImage = "";

        // Safely access config
        if (config.questions.second.reactions) {
            const reactions = config.questions.second.reactions;
            if (wrongAnswerClicks === 1 && reactions.bad1) {
                reactionText = reactions.bad1.text;
                reactionImage = reactions.bad1.image;
            } else if (wrongAnswerClicks === 2 && reactions.bad2) {
                reactionText = reactions.bad2.text;
                reactionImage = reactions.bad2.image;
            } else if (wrongAnswerClicks >= 3 && reactions.bad3) {
                reactionText = reactions.bad3.text;
                reactionImage = reactions.bad3.image;
            }
        }

        // Show main static error message always
        if (messageEl) {
            messageEl.textContent = "Bruh wrong answer, try again!";
            messageEl.classList.remove('hidden');
        }

        // Show reaction image/text if exists
        if (reactionImage && reactionContainer && reactionImg) {
            reactionImg.src = reactionImage;
            if (reactionMediaType) reactionMediaType.textContent = reactionText;
            reactionContainer.classList.remove('hidden');
        }

        // Make correct button bigger
        const currentScale = 1 + (wrongAnswerClicks * 0.5);
        correctBtn.style.transform = `scale(${currentScale})`;

        // Clear existing content to avoid duplicate arrows
        correctBtn.innerHTML = '';

        // Create arrow container
        const arrowContainer = document.createElement('div');
        arrowContainer.className = 'arrow-container';

        // Add left arrows (Points Right: ➤)
        const leftArrow = document.createElement('span');
        leftArrow.className = 'arrow';
        leftArrow.textContent = '➤';

        // Add text
        const textSpan = document.createElement('span');
        textSpan.textContent = config.questions.second.startText; // "Do neba i nazad!"

        // Add right arrows (Points Left: ◄)
        const rightArrow = document.createElement('span');
        rightArrow.className = 'arrow'; // No extra class needed for rotation
        rightArrow.textContent = '◄';

        // Increase gap to prevent overlap as button grows
        const loveChoices = document.querySelector('.love-choices');
        // Since transform:scale doesn't affect flow, we need a large gap to compensate for visual expansion
        const newGap = 20 + (wrongAnswerClicks * 70);
        loveChoices.style.gap = `${newGap}px`;

        // Append based on clicks
        for (let i = 0; i < wrongAnswerClicks; i++) {
            arrowContainer.appendChild(leftArrow.cloneNode(true));
        }

        arrowContainer.appendChild(textSpan);

        for (let i = 0; i < wrongAnswerClicks; i++) {
            arrowContainer.appendChild(rightArrow.cloneNode(true));
        }

        correctBtn.appendChild(arrowContainer);

        if (wrongAnswerClicks >= 3) {
            // Make it ALL CAPS and bold
            textSpan.textContent = "I SAID DO NEBA I NAZAD!!!!";
            textSpan.style.textTransform = 'uppercase';
            correctBtn.style.fontWeight = '900';

            // Hide wrong button
            wrongBtn.style.display = 'none';
        }
    }
}

// Celebration function
function celebrate() {
    // Hide header title for celebration
    document.getElementById('valentineTitle').textContent = "";

    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');

    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;

    // Set validation image
    const successImage = document.getElementById('celebrationImage');
    if (config.celebration.image) {
        successImage.src = config.celebration.image;
        successImage.classList.remove('hidden');
    }

    // Replace floating elements with photos
    startFloatingPhotos();

    // Play Celebration Music (DJ Khaled - All I Do Is Win)
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Use the config music URL
    if (config.music_win && config.music_win.musicUrl) {
        console.log("Playing celebration music:", config.music_win.musicUrl);
        musicSource.src = config.music_win.musicUrl;
        bgMusic.load();
        bgMusic.play()
            .then(() => {
                console.log("Celebration music playing successfully");
                document.getElementById('musicToggle').textContent = "🔇 Stop Music";
            })
            .catch(e => {
                console.error("Celebration audio play failed:", e);
                // Fallback: update the main play button to allow manual start
                const musicToggle = document.getElementById('musicToggle');
                musicToggle.textContent = "🎵 Click to Play Celebration Song!";
                musicToggle.onclick = () => {
                    bgMusic.play();
                    musicToggle.textContent = "🔇 Stop Music";
                };
            });
    }
}

// Create heart explosion animation
function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

// Create floating photos for celebration
function startFloatingPhotos() {
    const container = document.querySelector('.floating-elements');

    // Clear existing emojis
    container.innerHTML = '';

    // Create new floating photos
    // Create more of them to fill the screen
    const images = config.celebration.floatingImages || [];

    // Create 20 floating images randomly
    for (let i = 0; i < 20; i++) {
        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)];
        img.className = 'floating-photo';
        setRandomPosition(img);

        // Randomize size slightly
        const size = 120 + Math.random() * 60; // 120-180px
        img.style.width = `${size}px`;

        container.appendChild(img);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music.enabled) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}

function makeButtonRunAway(button) {
    if (!button) return;

    // Initially, let it sit in the natural flow (static) so it appears next to the Yes button
    button.style.transition = 'all 0.2s ease'; // Smooth movement

    const move = () => {
        // Switch to fixed positioning on first interaction to allow movement
        if (button.style.position !== 'fixed') {
            button.style.position = 'fixed';
        }

        const x = Math.random() * (window.innerWidth - button.offsetWidth);
        const y = Math.random() * (window.innerHeight - button.offsetHeight);
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    };

    // Run away when mouse gets close
    button.addEventListener('mouseenter', move);
    button.addEventListener('mousemove', move);
}

// Apply to No button once page loads
window.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noBtn4');
    if (noButton) makeButtonRunAway(noButton);
});
