// Function to swap players and save to local storage
function swapPlayers() {
    // Get the list of player names from local storage, or use the default names if not present
    const storedNames = localStorage.getItem('shuffledPlayerNames');
    let playerNames = storedNames ? JSON.parse(storedNames) : [
        "Kaan", "Emre", "Umut", "Deniz", "Cengiz", "Mert",
        "Burak", "Efe", "Fatih", "Yağız", "Ferit", "Murat"
    ];

    // Shuffle the player names
    playerNames.sort(() => Math.random() - 0.5);

    // Save shuffled names to local storage
    localStorage.setItem('shuffledPlayerNames', JSON.stringify(playerNames));

    // Get all player elements and update their names
    const players = document.querySelectorAll('.player p');
    players.forEach((player, index) => {
        player.innerText = playerNames[index];
    });
}

function deletePlayers() {
    localStorage.removeItem('shuffledPlayerNames');

    const players = document.querySelectorAll('.player p');
    players.forEach(player => {
        player.innerText = "";
    });
}

function showAddPlayersModal() {
    const modal = document.getElementById('addPlayersModal');
    const playerInputs = document.getElementById('playerInputs');

    // Clear previous inputs
    playerInputs.innerHTML = '';

    // Create input fields for each player
    for (let i = 0; i < 12; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Oyuncunun adını girin ${i + 1}`;
        input.id = `playerInput${i + 1}`;
        playerInputs.appendChild(input);
    }

    modal.style.display = 'block';
}

function hideAddPlayersModal() {
    const modal = document.getElementById('addPlayersModal');
    modal.style.display = 'none';
}

function submitPlayerNames() {
    const playerNames = [];
    let allNamesEntered = true;

    for (let i = 0; i < 12; i++) {
        const input = document.getElementById(`playerInput${i + 1}`);
        const playerName = input.value.trim();
        if (playerName) {
            playerNames.push(playerName);
        } else {
            allNamesEntered = false;
            input.style.border = '2px solid red'; // Highlight the missing input
        }
    }

    if (!allNamesEntered) {
        alert("Tüm oyuncuların adını giriniz.");
        return;
    }

    // Save new names to local storage
    localStorage.setItem('shuffledPlayerNames', JSON.stringify(playerNames));

    // Update player elements with new names
    const players = document.querySelectorAll('.player p');
    players.forEach((player, index) => {
        player.innerText = playerNames[index];
    });

    hideAddPlayersModal();
}

// Function to load players from local storage
function loadPlayers() {
    const storedNames = localStorage.getItem('shuffledPlayerNames');
    if (storedNames) {
        const playerNames = JSON.parse(storedNames);
        const players = document.querySelectorAll('.player p');
        players.forEach((player, index) => {
            player.innerText = playerNames[index];
        });
    }
}



// Load players when the page loads
window.onload = loadPlayers;
