const socket = io();

const sendButton = document.querySelector('.message-submit');
const chatInput = document.getElementById('new-message');
const messageBox = document.querySelector('.message');


const userId = localStorage.getItem("DischatUserId");
const user = localStorage.getItem('DischatUserName');

sendButton.addEventListener('click', async e => {
    e.preventDefault();

    // Emits message to front end server
    socket.emit('message', {
        messageContent: chatInput.value,
        UserId: userId,
        ChatId: currentChannelId,
        username: user
    })

    try {
        const res = await fetch(`http://localhost:8080/channels/${currentChannelId}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                messageContent: chatInput.value,
                UserId: userId,
                ChatId: currentChannelId
            }),
            headers: {
                "Content-Type": 'application/json',
            }
        });
        console.log('Received response')
        if (!res.ok) {
            throw res;
        }
    } catch (e) {
        console.error(e);
    }

    chatInput.value = '';
})

// Receives messages from front end server
socket.on('message', async (msgObj) => {
    const messageDiv = document.createElement('div');
    messageDiv.id = msgObj.messageContent;
    messageDiv.innerHTML = `<p class="messages"> ${msgObj.username}: <br/> ${msgObj.messageContent} </p>`;
    if (msgObj.ChatId === currentChannelId) {
        messageBox.append(messageDiv);
    }

});




