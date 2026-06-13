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


//part-2 starts from here
// Function to store a joke in the liked history
function storeLikedJoke(joke) {
    likedJokes.push(joke);

    // Update the heart symbol to display the number of liked jokes
    const heartSymbol = document.querySelector(".fa-heart");
    heartSymbol.innerText = likedJokes.length;
}

// Function to store a joke in the unliked history
function storeUnlikedJoke(joke) {
    unlikedJokes.push(joke);
}

// Function to display the current joke
function displayJoke() {
    const currentJoke = likedJokes.length > 0 ? likedJokes[likedJokes.length - 1] : "No liked jokes yet.";
    jokeEl.innerHTML = `<h2>Current Joke:</h2><p>${currentJoke}</p>`;
}

// Function to display the liked history
function displayLikedHistory() {
    jokeEl.innerHTML = ''; // Clear existing content
    jokeEl.className = 'joke-list';

    if (likedJokes.length === 0) {
        jokeEl.innerText = "No liked jokes yet.";
    } else {
        jokeEl.innerHTML = "<h2>Liked Jokes:</h2>";

        likedJokes.forEach((joke, index) => {
            jokeEl.innerHTML += `
                <div class="joke-entry">
                    <p><strong>Joke ${index + 1}:</strong> ${joke}</p>
                    <button class="copy-btn" onclick="copyTextToClipboard('${joke}')">Copy Joke</button>
                </div>
            `;
        });
    }
}

// Function to display the unliked history
function displayUnlikedHistory() {
    jokeEl.innerHTML = ''; // Clear existing content
    jokeEl.className = 'joke-list';

    if (unlikedJokes.length === 0) {
        jokeEl.innerText = "No unliked jokes yet.";
    } else {
        jokeEl.innerHTML = "<h2>Unliked Jokes:</h2>";

        unlikedJokes.forEach((joke, index) => {
            jokeEl.innerHTML += `
                <div class="joke-entry">
                    <p><strong>Joke ${index + 1}:</strong> ${joke}</p>
                    <button class="copy-btn" onclick="copyTextToClipboard('${joke}')">Copy Joke</button>
                </div>
            `;
        });
    }
}

// Function to toggle the opacity of the container
function toggleContainerOpacity() {
    const container = document.querySelector(".container");

    if (container.style.opacity === "0") {
        container.style.opacity = "1";
    } else {
        container.style.opacity = "0";
    }
}

// Event listeners
const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const thumbUpBtn = document.getElementById("thumbUp");
const thumbDownBtn = document.getElementById("thumbDown");
const clearBtn = document.getElementById("clearBtn");
const likedContainer = document.querySelector(".liked-container");
const unlikedContainer = document.querySelector(".unliked-container");
const unlikedBtn = document.getElementById("unLikedBtn"); // Unliked button

btnEl.addEventListener("click", getJoke);

thumbUpBtn.addEventListener("click", () => {
    const currentJoke = jokeEl.innerText;
    storeLikedJoke(currentJoke);
    displayJoke();
});

thumbDownBtn.addEventListener("click", () => {
    const currentJoke = jokeEl.innerText;
    storeUnlikedJoke(currentJoke);
});

clearBtn.addEventListener("click", () => {
    likedJokes.length = 0;
    unlikedJokes.length = 0;
    displayLikedHistory();
    // Close the liked and unliked history when clearing
    likedContainer.classList.remove("show");
    unlikedContainer.classList.remove("show");
});

// Function to copy the joke text to the clipboard using Clipboard API
function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Unable to copy text: ", error);
        });
}

// Event listener for the copy button
copyJoke.addEventListener("click", () => {
    const currentJoke = jokeEl.innerText;
    copyTextToClipboard(currentJoke);
});

// Initialize the joke generator
getJoke();

    // Function to toggle the display of liked jokes history
function toggleLikedHistory() {
    if (isLikedHistoryOpen) {
        // Close the liked history
        displayJoke(); // Display the current joke
        likedContainer.classList.remove("show");
    } else {
        // Open the liked history
        displayLikedHistory();
        likedContainer.classList.add("show");
        // Close the unliked history
        unlikedContainer.classList.remove("show");
    }

    // Toggle the variable
    isLikedHistoryOpen = !isLikedHistoryOpen;
}

// Function to toggle the display of unliked jokes history
function toggleUnlikedHistory() {
    if (isUnlikedHistoryOpen) {
        // Close the unliked history
        displayJoke(); // Display the current joke
        unlikedContainer.classList.remove("show");
    } else {
        // Open the unliked history
        displayUnlikedHistory();
        unlikedContainer.classList.add("show");
        // Close the liked history
        likedContainer.classList.remove("show");
    }

    // Toggle the variable
    isUnlikedHistoryOpen = !isUnlikedHistoryOpen;
}

// Event listener for clicking the heart symbol (Liked Jokes)
likedContainer.addEventListener("click", toggleLikedHistory);

// Event listener for clicking the thumb-down symbol (Unliked Jokes)
unlikedBtn.addEventListener("click", () => {
    toggleUnlikedHistory();
    isUnlikedHistoryOpen = !isUnlikedHistoryOpen; // Toggle the variable
});
});