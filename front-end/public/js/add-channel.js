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
