const chatContainer = document.getElementById('chat-container');

// Function to generate a random position within the bounds of the container
function getRandomPosition() {
    const containerWidth = chatContainer.offsetWidth;
    const containerHeight = chatContainer.offsetHeight;

    const randomX = Math.floor(Math.random() * (containerWidth - 200)); // Random x position
    const randomY = Math.floor(Math.random() * (containerHeight - 50)); // Random y position

    return { x: randomX, y: randomY };
}

// Function to add a new chat message at a random location
function addChatMessage(message) {
    const { x, y } = getRandomPosition();

    const chatMessageElement = document.createElement('div');
    chatMessageElement.classList.add('chat-message');
    chatMessageElement.style.left = `${x}px`;
    chatMessageElement.style.top = `${y}px`;
    chatMessageElement.innerText = message;

    chatContainer.appendChild(chatMessageElement);

    // Remove message after the animation is done
    setTimeout(() => {
        chatMessageElement.remove();
    }, 5000); // Match this with the CSS animation duration
}

// Test chat message (for testing purposes)
addChatMessage("Test message");
