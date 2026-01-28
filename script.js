const config = window.VALENTINE_CONFIG;

// --- RESPONSIVE CSS ---
const style = document.createElement('style');
style.textContent = `
    #celebration {
        width: 90% !important;
        max-width: 500px !important;
        margin: 0 auto !important;
        padding: 20px !important;
        box-sizing: border-box !important;
    }
    #celebrationMessage {
        word-wrap: break-word !important;
        overflow-wrap: break-word !important;
        font-size: 0.9rem !important;
        line-height: 1.8 !important;
        text-align: left !important;
        padding-left: 10px !important;
    }
    .celebration-gif {
        display: block;
        margin: 15px auto;
        width: 140px;
        height: auto;
        border-radius: 10px;
    }
    #musicControls { display: none !important; }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, mahal kooooo...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;

    document.getElementById('yesBtn1').addEventListener('click', celebrate);
    document.getElementById('noBtn1').addEventListener('click', () => moveButton(document.getElementById('noBtn1')));

    createFloatingElements();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears].forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'heart'; 
        div.innerHTML = emoji;
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
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('valentineTitle').classList.add('hidden');
    
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    
    const messageElement = document.getElementById('celebrationMessage');
    const rawMessage = config.celebration.message;
    // Fixes the long TikTok links so they stay inside the box
    const linkedMessage = rawMessage.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #ff4757; text-decoration: underline; word-break: break-all;">$1</a>');
    
    messageElement.innerHTML = linkedMessage;
    messageElement.style.whiteSpace = "pre-line";

    // --- LOCAL GIF LOADING ---
    const emojiContainer = document.getElementById('celebrationEmojis');
    emojiContainer.innerHTML = '<img src=""C:/Users/Carl Tolentino/Downloads/hands-double-five.gif (200×200)/imgi_1_hands-double-five.gif"" class="celebration-gif" alt="Celebration GIF">';
    
    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 35; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = config.floatingEmojis.hearts[0];
        heart.className = 'heart';
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}
