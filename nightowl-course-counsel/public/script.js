if (typeof window !== 'undefined') {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const contactModal = document.getElementById('contact-info-modal');
    const contactLink = document.getElementById('contact-link');

    const userImageElement = document.createElement('img');
    userImageElement.src = 'user-avatar.jpg';
    userImageElement.alt = 'User Avatar';
    userImageElement.classList.add('avatar');
    userImageElement.style.width = '40px';
    userImageElement.style.height = '40px';
    userImageElement.style.borderRadius = '50%';

    const nightOwlImageElement = document.createElement('img');
    nightOwlImageElement.src = 'nightowl-avatar.jpg';
    nightOwlImageElement.alt = 'NightOwl Avatar';
    nightOwlImageElement.classList.add('avatar');
    nightOwlImageElement.style.width = '40px';
    nightOwlImageElement.style.height = '40px';
    nightOwlImageElement.style.borderRadius = '50%';

    window.addEventListener('DOMContentLoaded', (event) => {
        initNightOwl();
    });

    function initNightOwl() {
        const chatBox = document.getElementById('chat-box');

        const nightOwlMessageElement = createMessageElement('Night Owl', 'Hello, I am Night Owl. If you have any questions about the course, you can ask me.');

        const nightOwlAvatarElement = createAvatarElement('nightowl-avatar.jpg');

        nightOwlMessageElement.querySelector('.message-content').prepend(nightOwlAvatarElement);

        chatBox.appendChild(nightOwlMessageElement);
    }

    function createMessageElement(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const senderElement = document.createElement('p');
        senderElement.innerText = sender;

        messageContent.appendChild(senderElement);
        messageElement.appendChild(messageContent);

        const contentElement = document.createElement('p');
        contentElement.innerText = message;
        messageElement.appendChild(contentElement);

        return messageElement;
    }

    function createAvatarElement(avatarSrc) {
        const avatarElement = document.createElement('img');
        avatarElement.src = avatarSrc;
        avatarElement.alt = 'Avatar';
        avatarElement.classList.add('avatar');
        avatarElement.style.width = '40px';
        avatarElement.style.height = '40px';
        avatarElement.style.borderRadius = '50%';
        return avatarElement;
    }

    const homeLink = document.querySelector('.navbar ul li:nth-child(2) a');

    homeLink.addEventListener('click', () => {
        location.reload();
    });

    sendBtn.addEventListener('click', () => {
        const userMessage = userInput.value;
        showLoadingAnimation();
        appendMessage('You', userMessage, userImageElement);
        sendMessageToServer(userMessage);
        userInput.value = '';
    });

    function appendMessage(sender, message, avatar) {
        console.log('Appending message:', sender, message);
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        const imageElement = avatar.cloneNode(true);
        imageElement.classList.remove('avatar');

        const senderElement = document.createElement('p');
        senderElement.innerText = sender;

        messageContent.appendChild(imageElement);
        messageContent.appendChild(senderElement);

        messageElement.appendChild(messageContent);

        const contentElement = document.createElement('p');
        contentElement.innerText = message;

        messageElement.appendChild(contentElement);

        if (sender === 'You') {
            messageElement.classList.add('user-message');
        }

        chatBox.appendChild(messageElement);
    }

    const aboutUsLink = document.querySelector('.navbar ul li:nth-child(3) a');

    const aboutUsModal = document.getElementById('about-us-modal');

    aboutUsLink.addEventListener('click', () => {
        aboutUsModal.style.display = 'block';
        document.querySelector('.input-container').classList.add('hidden');
    });

    const closeAboutUsModalBtn = aboutUsModal.querySelector('.close');

    closeAboutUsModalBtn.addEventListener('click', () => {
        aboutUsModal.style.display = 'none';
        document.querySelector('.input-container').classList.remove('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target === aboutUsModal) {
            aboutUsModal.style.display = 'none';
        }
    });

    const closeContactModalBtn = document.querySelector('#contact-info-modal .close');

    closeContactModalBtn.addEventListener('click', () => {
        contactModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });

    aboutUsLink.addEventListener('click', () => {
        aboutUsModal.style.display = 'block';
        document.querySelector('.input-container').classList.add('hidden');
    });

    closeAboutUsModalBtn.addEventListener('click', () => {
        aboutUsModal.style.display = 'none';
        document.querySelector('.input-container').classList.remove('hidden');
    });

    function sendMessageToServer(message) {
        fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.reply;
                console.log('Received bot message:', botMessage);
                hideLoadingAnimation();
                appendMessage('NightOwl', botMessage, nightOwlImageElement);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    contactLink.addEventListener('click', () => {
        contactModal.style.display = 'block';
    });

    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        contactModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == contactModal) {
            contactModal.style.display = 'none';
        }
    });

    function showLoadingAnimation() {
        const loadingElement = document.createElement('div');
        loadingElement.classList.add('loading');
        loadingElement.innerHTML = `<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>`;
        chatBox.appendChild(loadingElement);
    }

    function hideLoadingAnimation() {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            const userMessage = userInput.value;
            showLoadingAnimation();
            appendMessage('You', userMessage, userImageElement);
            sendMessageToServer(userMessage);
            userInput.value = '';
        }
    });

    aboutUsLink.addEventListener('click', () => {
        aboutUsModal.style.display = 'block';
        document.querySelector('.chat-container').classList.add('hidden');
    });

    closeAboutUsModalBtn.addEventListener('click', () => {
        aboutUsModal.style.display = 'none';
        document.querySelector('.chat-container').classList.remove('hidden');
    });
}
