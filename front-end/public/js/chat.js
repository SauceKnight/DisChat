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
        // ChatId: 1,
        username: user
    })

    chatInput.value = '';
})

// Receives messages from front end server
socket.on('message', msgObj => {
    const messageDiv = document.createElement('div');
    messageDiv.id = msgObj.messageContent;
    messageDiv.innerHTML = `<div><div>${msgObj.username}:</div>${msgObj.messageContent}</div>`;
    messageBox.append(messageDiv);

});




