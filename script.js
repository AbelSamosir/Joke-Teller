document.addEventListener("DOMContentLoaded", function () {
    // Declare the likedNotes and unlikedNotes arrays in the global scope
    const likedJokes = [];
    const unlikedJokes = [];
    // Initialize variables to track whether the liked and unliked history is currently open or closed
    let dislikedHistoryOpen = false;
    let likedHistoryOpen = false;

    // Function to generate a joke
    async function getJoke() {
        try {
            const apiKey = "xai-2mciA16M6MwaQ9NMMU0P-zmYzMxzYIUbFDF";

            const options = {
                method: "GET",
                headers: {
                    "X-Api-Key": apiKey,
                },
            };

            const apiURL = "https://api.api-ninjas.com/v1/jokes?limit=1";

            const response = await fetch(apiURL, options);
            const data = await response.json();

            jokeEl.innerText = data[0].joke;
        } catch (error) {
            jokeEl.innerText = "An error happened, try again later";
            console.error(error);
        }
    };
});