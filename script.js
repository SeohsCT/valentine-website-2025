const config = window.VALENTINE_CONFIG;

function validateConfig() {
    if (!config.valentineName) config.valentineName = "Ally";
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();
    
    // Set initial page content
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, mahal kooooo...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;

    document.getElementById('yesBtn1').addEventListener('click', celebrate);
    document.getElementById('noBtn1').addEventListener('click', () => moveButton(document.getElementById('noBtn1')));

    createFloatingElements();
    setupMusicPlayer();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    config.floatingEmojis.hearts.forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });
    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
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
    // Hide the question and the "Mahal koo" title
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('valentineTitle').classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    
    const messageElement = document.getElementById('celebrationMessage');
    
    // Convert text links to actual clickable <a> tags
    const rawMessage = config.celebration.message;
    const linkedMessage = rawMessage.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #ff4757; text-decoration: underline;">$1</a>');
    
    messageElement.innerHTML = linkedMessage;
    
    // Styles to match your requested layout
    messageElement.style.fontSize = "1rem";
    messageElement.style.textAlign = "left"; // Matches the document look
    messageElement.style.display = "inline-block";
    messageElement.style.margin = "20px auto";
    messageElement.style.whiteSpace = "pre-line"; // Preserves the line breaks from config
    messageElement.style.animation = "none";
    
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const emojis = config.floatingEmojis.hearts;
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
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
