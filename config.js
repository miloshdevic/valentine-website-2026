// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Emilija",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Are you ready?",                                    // First interaction
            yesBtn: "Let's get into it!",                              // Text for "Yes" button
            noBtn: "",                                                 // Text for "No" button (empty to hide)
            secretAnswer: ""                                           // Secret hover message (empty to hide)
        },
        second: {
            text: "First things first, we have to establish something very important...how much do you love me?", // The hard hitting question
            startText: "Do neba i nazad!",               // Correct button text (starts small)
            nextBtn: "I don't know...",                    // Wrong button text (Initial)
            nextBtnLevels: [
                "I still don't know...",                   // After 1 click
                "Still not convinced..."                   // After 2 clicks
            ],
            reactions: {
                bad1: { text: "Hey that's mean", image: "./not_funny_1.JPG" },
                bad2: { text: "Nisi smešna", image: "./not_funny_3.PNG" },
                bad3: { text: "Okay...this is your final chance", image: "./not_funny_2.JPG" }
            }
        },
        third: {
            text: "WOAH that much??? Well in that case...I have something to ask you...ready?", // Pre-question
            yesBtn: "Omg yes this is so exciting!!",                   // Transition button
            noBtn: ""                                                  // No No button
        },
        fourth: {
            text: "Emilija, will you bestow upon me the honor of being my valentine? 😔🥀", // The big question!
            yesBtn: "YES, A MILLION TIMES YES!!!",                     // Text for "Yes" button
            noBtn: "No",                                                // Runaway button
            candidates: {
                img1: "./dj_emila.JPG",
                img2: "./cowboy_milos.JPG"
            }
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "To infinity and beyond! 🚀💝",              // Shows when they go past 1000%
        normal: "And beyond! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
        message: "Now come get your big warm hug and a huge kiss!",
        emojis: "🎁💖🤗💝💋❤️💕",  // These will bounce around
        image: "thug_milos.jpg", // DJ Khaled "Another One" / Win gif placeholder
        floatingImages: [
            "./together_1.JPEG", "./together_2.JPEG", "./together_3.JPG",
            "./together_5.JPG", "./together_6.jpg", "./together_7.jpg",
            "./together_8.JPG", "./together_9.JPG", "./together_10.JPG",
            "./together_13.JPG"
        ] // Photos to float during celebration
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffc2f1",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#b587f7",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#a367e7",     // Button color (should stand out against the background)
        buttonHover: "#8b45d6",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#6a1b9a"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dncywqfpb/video/upload/v1738399057/music_qrhjvy.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    },

    music_win: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dzbe5ssn0/video/upload/v1769976779/DJ_Khaled_-_All_I_Do_Is_Win_Official_Video_ft._T-Pain_Ludacris_Rick_Ross_Snoop_Dogg_i1k7xb.mp3",
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
