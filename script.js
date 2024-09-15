const chatContainer = document.getElementById('chat-container');

// Replace with your own YouTube channel ID and API key
const channelId = 'UCYRn-QqUqTpOVo8DxeI6SwA';
const apiKey = 'AIzaSyDn3_OQqdSpsbdjvvKMIcABCJESpdnO1qw';

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

async function fetchChatMessages() {
    console.log('Fetching chat messages');
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/liveChat/messages?part=snippet,authorDetails&liveChatId=${channelId}&key=${apiKey}`);
        const data = await response.json();
        console.log(data); // Log the response
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const message = item.snippet.displayMessage;
                addChatMessage(message);
            });
        } else {
            console.log('No chat messages found.');
        }
    } catch (error) {
        console.error('Error fetching chat messages:', error);
    }
}


// Poll for new messages every 5 seconds
setInterval(fetchChatMessages, 5000);

// Initial call to display existing messages
fetchChatMessages();

console.log('Script loaded');
