const addChannel = document.querySelector(".add-channel");
const channelList = document.querySelector(".display-channels");
const formChannel = document.querySelector(".create-channel");
// const buttonNewChannel = document.querySelector(".submit");
const channelInput = document.getElementById('newChannel');
// const serverList = document.querySelector("server-list");



addChannel.addEventListener("click", async (e) => {
    e.preventDefault();
    formChannel.classList.toggle("hidden");
})


formChannel.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formChannel);

    const channelName = formData.get("channelName");
    const userId = localStorage.getItem("DischatUserId");

    let channel = document.createElement("li");

    channel.classList.add("channels-li");
    channel.innerHTML = `<p class="select-channel" href=""> # ${channelName}</p>`;
    channelList.appendChild(channel);
    formChannel.classList.add("hidden");

    // channel.addEventListener('click', async (e) => {
    //     currentChannelId = e.currentTarget.dataset.channelId;
    //     const currentChannelName = e.currentTarget.dataset.channelName;
    //     channelTitle.innerHTML = currentChannelName;
    //     // fetch call with channelid to get messages
    //     const messageRes = await fetch(`http://localhost:8080/channels/${currentChannelId}/messages`);
    //     const parsedMessageRes = await messageRes.json();
    //     const messages = parsedMessageRes.messages;
    //     messageBox.innerHTML = '';
    //     messages.forEach(message => {
    //         messageBox.innerHTML += `<p class="messages">${message.User.userName}: <br/> ${message.messageContent}</p>`;
    //     });
    // });

    const body = { channelName };

    channelInput.value = '';
    console.log("hello");
    try {
        console.log("inside try");
        const res = await fetch(`http://localhost:8080/servers/${serverId}/channels`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": 'application/json',
            }
        });
        if (!res.ok) {
            throw res;
        }
        const parsedRes = await res.json();

        const newChannel = parsedRes.channel;
        channel.dataset.channelId = newChannel.id;
        channel.dataset.channelName = newChannel.channelName;
    } catch (e) {
        console.log(e)
    }


});
