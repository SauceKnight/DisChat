const searchForm = document.querySelector(".join-server");
const searchIcon = document.getElementById("join-button");

searchIcon.addEventListener("click", (e) => {
    searchForm.classList.remove('hidden');
})



searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);

    let joinServerName = formData.get("joinServerName");

    try {

        const res = await fetch(`http://localhost:8080/servers/find/${joinServerName}`);
        if (!res.ok) {
            throw res;
        }
        searchForm.classList.add('hidden');

        const parsedRes = await res.json();
        console.log(parsedRes);
        const server = parsedRes.foundServer;

        joinServerId = server.id;
        joinServerForm.classList.remove("hidden");


    } catch (e) {
        console.log(e)
    }
})
