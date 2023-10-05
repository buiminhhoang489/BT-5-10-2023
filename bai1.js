let players = [];
let playerCounts = {}; // Changed noteCounts to playerCounts
let playerCount = 0;

function renderPlayer(players) {
  let tableDataEl = document.getElementById("tableBody");
  let dataString = ``;
  for (let i in players) {
    dataString += `
    <tr class="player-data">
    <td>
      <button onclick="deletePlayer(${players[i].id})" type="button" id="delete-${players[i].id}">Delete</button>
     
      ${players[i].name}</td>
      <td class="operator"><button onclick="decreaseCount(${players[i].id})" type="button"  id="decrease-${players[i].id}">-</button>
      <span id="count-${players[i].id}" >${playerCounts[players[i].id] || 0}</span>
      <button onclick="increaseCount(${players[i].id})" type="button"  id="increase-${players[i].id}">+</button>
    </td>
  </tr>
    `;
  }
  tableDataEl.innerHTML = dataString;
  playerCount = players.length;
  updatePlayerCount();
}

function createPlayer(event) {
  event.preventDefault();

  let newPlayer = {
    id: Date.now() * Math.random(),
    name: event.target.elements.name.value,
  };
  players.push(newPlayer);
  playerCounts[newPlayer.id] = 0; // Changed noteCounts to playerCounts

  playerCount = players.length;
  updatePlayerCount();

  renderPlayer(players);
  saveDataToLocalStorage();
}

function updatePlayerCount() {
  let playerText = document.getElementById("playerText");
  playerText.textContent = `Player: ${playerCount}`; // Changed player: to Player:
}

function deletePlayer(playerId) {
  for (let i in players) {
    if (players[i].id == playerId) {
      // Decrement the playerCounts for the deleted player, but make sure it doesn't go below 0
      let deletedPlayerId = players[i].id;
      if (playerCounts[deletedPlayerId] !== undefined && playerCounts[deletedPlayerId] > 0) {
        playerCounts[deletedPlayerId]--; // Only decrement if count is greater than 0
      }
      
      // Remove the player from the players array
      players.splice(i, 1);
      break;
    }
  }

  renderPlayer(players);
  updateTotalPoint();
}


function decreaseCount(playerId) {
  playerCounts[playerId] = (playerCounts[playerId] || 0) - 1; // Changed noteCounts to playerCounts
  const countSpan = document.getElementById(`count-${playerId}`);
  if (countSpan) {
    countSpan.textContent = playerCounts[playerId]; // Changed noteCounts to playerCounts
  }
 
  updateTotalPoint();
}

function increaseCount(playerId) {
  playerCounts[playerId] = (playerCounts[playerId] || 0) + 1; // Changed noteCounts to playerCounts
  let countSpan = document.getElementById(`count-${playerId}`);
  if (countSpan) {
    countSpan.textContent = playerCounts[playerId]; // Changed noteCounts to playerCounts
  }
  updateTotalPoint();
}

function updateTotalPoint() {
  let total = 0;
  for (let i in players) {
    const playerId = players[i].id;
    const countSpan = document.getElementById(`count-${playerId}`);
    if (countSpan) {
      total += parseInt(countSpan.textContent || 0);
    }
  }
  const totalPointSpan = document.getElementById("totalPoint");
  totalPointSpan.textContent = total;
}

function saveDataToLocalStorage() {
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("playerCounts", JSON.stringify(playerCounts));
}


function loadFromLocalStorage() {
  const savedPlayers = localStorage.getItem("players");
  const savedPlayerCounts = localStorage.getItem("playerCounts");

  console.log("Saved Players:", savedPlayers);
  console.log("Saved Player Counts:", savedPlayerCounts);
}






