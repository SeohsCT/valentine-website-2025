const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
    if (!config.valentineName) config.valentineName = "Ally";
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Set Name and Question
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, mahal koooo...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;

    // "Yes" button leads straight to celebration
    document.getElementById('yesBtn1').addEventListener('click', celebrate);

    // "No" button ONLY moves when clicked
    const noBtn = document.getElementById('noBtn1');
    noBtn.addEventListener('click', () => moveButton(noBtn));

    // Create initial floating elements using the original logic
    createFloatingElements();
    setupMusicPlayer();
});

// Restored Original Floating Logic
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    
    // Create hearts
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart'; // Original class name
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears (and your dinosaurs/cats/dogs)
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear'; // Original class name
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Restored Original Random Position Logic
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    // This ensures they don't start in a straight line
    element.style.top = Math.random() * 100 + 'vh'; 
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
    document.getElementById('question1').classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    
    const messageElement = document.getElementById('celebrationMessage');
    messageElement.innerText = config.celebration.message;
    
    // Custom styling for the itinerary to keep it readable and static
    messageElement.style.fontSize = "1.1rem"; 
    messageElement.style.fontWeight = "normal";
    messageElement.style.animation = "none"; 
    messageElement.style.lineHeight = "1.5";
    messageElement.style.marginTop = "20px";

    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

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

function setupMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');
    const musicToggle = document.getElementById('musicToggle');

    if (!config.music.enabled) return;

    musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
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
