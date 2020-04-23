let serverId;
let serverName;
let currentChannelId;


window.addEventListener("DOMContentLoaded", async (e) => {
    const serverList = document.querySelector("#server-list");
    const userList = document.querySelector('#users-list');
    // const channelList = document.querySelector('.display-channels')
    const userId = localStorage.getItem("DischatUserId");
    const addServer = document.querySelector("#add-button");
    const serverTitle = document.querySelector(".server-name");
    const channelTitle = document.getElementById('channel-name');
    const userName = document.querySelector('.username');

    userName.innerHTML = localStorage.getItem('DischatUserName');

    try {
        const res = await fetch(`http://localhost:8080/${userId}/servers`);
        const parsedRes = await res.json();
        const serverArray = parsedRes.servers;
        const initialServer = serverArray[0];
        serverId = initialServer.id;
        serverName = initialServer.serverName;
        serverTitle.innerHTML = serverName;

        // console.log(serverArray);

        serverArray.forEach(server => {
            let newServer = document.createElement("li");
            newServer.dataset.serverId = server.id;
            newServer.dataset.serverName = server.serverName;
            newServer.classList.add("servers-li");
            newServer.innerHTML = '<img src="/images/sign-in-background.png" class="server-display">';
            serverList.insertBefore(newServer, addServer);
        })

        const listServers = document.querySelectorAll(".servers-li");

        for (let i = 0; i < listServers.length; i++) {
            // console.log(listServers[i]);
            listServers[i].addEventListener('click', async (e) => {
                serverId = e.currentTarget.dataset.serverId;
                serverName = e.currentTarget.dataset.serverName;
                serverTitle.innerHTML = serverName;
                channelList.innerHTML = '';
                userList.innerHTML = '';
                const response = await fetch(`http://localhost:8080/servers/${serverId}/channels`);
                const parsedResponse = await response.json();
                const channels = parsedResponse.channels;
                if (channels.length === 0) {
                    channelTitle.innerHTML = "";
                }
                channels.forEach(channel => {
                    let newChannel = document.createElement("li");
                    newChannel.dataset.channelId = channel.id;
                    newChannel.dataset.channelName = channel.channelName;
                    newChannel.classList.add("channels-li");
                    newChannel.innerHTML = `<p class="select-channel"> # ${channel.channelName}</p>`;
                    channelList.appendChild(newChannel);
                    channelTitle.innerHTML = channels[0].channelName;
                })


                const displayedChannels = document.querySelectorAll('.channels-li');
                // console.log(displayedChannels);
                displayedChannels.forEach(channel => {
                    channel.addEventListener('click', async (e) => {
                        currentChannelId = e.currentTarget.dataset.channelId;
                        const currentChannelName = e.currentTarget.dataset.channelName;
                        channelTitle.innerHTML = currentChannelName;
                        // fetch call with channelid to get messages

                    })
                })

                const userResponse = await fetch(`http://localhost:8080/servers/${serverId}/users`);
                const parsedUserResponse = await userResponse.json();
                const userArray = parsedUserResponse.users;
                userArray.forEach(user => {
                    let newUser = document.createElement('li');
                    newUser.classList.add('users-li');
                    newUser.innerHTML = `<p class="select-user"> # ${user.userName}</p>`;
                    userList.appendChild(newUser);
                })
            })
        }




    } catch {

    }
})
