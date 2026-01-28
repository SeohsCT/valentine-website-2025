const config = window.VALENTINE_CONFIG;

function validateConfig() {
    if (!config.valentineName) config.valentineName = "Ally";
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Set Name and Question 1
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, mahal kooo...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;

    // "Yes" button leads straight to celebration
    document.getElementById('yesBtn1').addEventListener('click', celebrate);

    // "No" button ONLY moves when clicked
    const noBtn = document.getElementById('noBtn1');
    noBtn.addEventListener('click', () => moveButton(noBtn));

    createFloatingElements();
    setupMusicPlayer();
});

// Create the background floating emojis
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Combine hearts and bears for the background
    const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
    
    allEmojis.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'floating-emoji'; 
        div.innerHTML = emoji;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh'; // Random start height
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

function celebrate() {
    // Hide the question
    document.getElementById('question1').classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    // Set titles
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    
    // Handle itinerary text
    const messageElement = document.getElementById('celebrationMessage');
    messageElement.innerText = config.celebration.message;
    
    // Apply specific styles for the itinerary to make it smaller and static
    messageElement.style.fontSize = "1.2rem"; 
    messageElement.style.fontWeight = "normal";
    messageElement.style.lineHeight = "1.6";
    messageElement.style.animation = "none"; // Stop the bouncing/animation
    messageElement.style.marginTop = "20px";

    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        const emojis = config.floatingEmojis.hearts;
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.className = 'floating-emoji';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');

    if (!config.music || !config.music.enabled) return;

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume;
    bgMusic.load();

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
