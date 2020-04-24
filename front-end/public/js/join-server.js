const joinButton = document.querySelector(".server-join-confirm");
const cancelButton = document.querySelector(".server-join-deny");

const joinServerForm = document.querySelector(".confirm-join-server");

cancelButton.addEventListener("click", async (e) => {
    e.preventDefault();
    joinServerForm.classList.add("hidden");
});

joinButton.addEventListener('click', async (e) => {
    e.preventDefault();

    joinServerForm.classList.toggle("hidden");

    const UserId = localStorage.getItem("DischatUserId");


    try {
        console.log(joinServerId);
        console.log(UserId);
        const res = await fetch(`http://localhost:8080/userservers`, {
            method: 'POST',
            body: JSON.stringify({ joinServerId, UserId }),
            headers: {
                "Content-Type": 'application/json',
            }
        });
        console.log(res);
        if (!res.ok) {
            throw res;
        }

    } catch {

    }

})
