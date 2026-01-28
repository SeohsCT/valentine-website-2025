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

    // Remove music controls from the UI
    const musicControls = document.getElementById('musicControls');
    if (musicControls) musicControls.style.display = 'none';

    document.getElementById('yesBtn1').addEventListener('click', celebrate);
    document.getElementById('noBtn1').addEventListener('click', () => moveButton(document.getElementById('noBtn1')));

    createFloatingElements();
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
    // Hide original elements
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('valentineTitle').classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    
    const messageElement = document.getElementById('celebrationMessage');
    
    // Link replacement logic
    const rawMessage = config.celebration.message;
    const linkedMessage = rawMessage.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #ff4757; text-decoration: underline;">$1</a>');
    
    messageElement.innerHTML = linkedMessage;
    
    // --- Success Page Text Styling ---
    messageElement.style.fontSize = "0.95rem";
    messageElement.style.textAlign = "left";
    messageElement.style.display = "block";
    messageElement.style.margin = "20px auto";
    messageElement.style.paddingLeft = "30px"; // Added indentation
    messageElement.style.whiteSpace = "pre-line"; 
    messageElement.style.lineHeight = "2.0"; // Increased spacing for readability
    messageElement.style.animation = "none";
    messageElement.style.color = "#444"; // Softer color for the body text

    // --- GIF Fix ---
    const emojiContainer = document.getElementById('celebrationEmojis');
    // Using a direct gif link that works in browsers
    emojiContainer.innerHTML = '<img src="https://media.tenor.com/sz6dVMsylTaAAAAC/mochi-mochi-peach-cat-cat.gif" alt="Celebration GIF" style="width: 140px; height: auto; border-radius: 10px; margin-top: 10px;">';
    
    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        const emojis = config.floatingEmojis.hearts;
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}
