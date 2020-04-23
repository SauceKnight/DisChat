const addServer = document.querySelector("#add-button");
const serverList = document.querySelector("#server-list");
const formServer = document.querySelector(".create-box");
const buttonNewServer = document.querySelector(".submit");
const serverInput = document.getElementById('newServer');
const serverTitle = document.querySelector('.server-name');

addServer.addEventListener("click", async (e) => {
    e.preventDefault();
    formServer.classList.toggle("hidden");
})


formServer.addEventListener("submit", async (e) => {
    e.preventDefault();

    const channelTitle = document.getElementById('channel-name');
    let newServer = document.createElement("li");
    newServer.classList.add("servers-li");

    newServer.innerHTML = '<img src="/images/sign-in-background.png" class="server-display">';
    serverList.insertBefore(newServer, addServer);
    formServer.classList.add("hidden");

    const formData = new FormData(formServer);

    let serverName = formData.get("serverName");
    // console.log(serverName);
    const userId = localStorage.getItem("DischatUserId");

    const body = { serverName };

    serverInput.value = '';
    try {
        const res = await fetch(`http://localhost:8080/${userId}/servers`, {
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
        // console.log(parsedRes)
        const server = parsedRes.server;
        newServer.setAttribute('id', server.id)
        newServer.dataset.serverId = server.id;
        newServer.dataset.serverName = server.serverName;
        serverTitle.innerHTML = server.serverName;

    } catch {

    }

    newServer.addEventListener('click', async (e) => {
        serverId = e.currentTarget.dataset.serverId;
        serverName = e.currentTarget.dataset.serverName;
        serverTitle.innerHTML = serverName;
        channelList.innerHTML = '';
        const response = await fetch(`http://localhost:8080/servers/${serverId}/channels`);
        const parsedResponse = await response.json();
        const channels = parsedResponse.channels;
        if (channels.length === 0) {
            channelTitle.innerHTML = "";
        }
        channels.forEach(channel => {
            let newChannel = document.createElement("li");
            newChannel.dataset.channelId = channel.id;
            newServer.dataset.channelName = channel.channelName;
            newChannel.classList.add("channels-li");
            newChannel.innerHTML = `<p class="select-channel"> # ${channel.channelName}</p>`;
            channelList.appendChild(newChannel);
            channelTitle.innerHTML = channels[0].channelName;
        })
        const userResponse = await fetch(`http://localhost:8080/servers/${serverId}/users`);
        const parsedUserResponse = await userResponse.json();
        const userArray = parsedUserResponse.users;
    })


});
