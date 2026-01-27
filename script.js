const gameState = {
  cookies: 0,
  cps: 0,
  clickPower: 1,
  upgrades: []
};

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");
const upgradesDiv = document.getElementById("upgrades");

function gameTick() {
  gameState.cookies += gameState.cps;
  updateUI();
  saveGame();
}

setInterval(gameTick, 1000);

function updateUI() {
  cookieCount.textContent = Math.floor(gameState.cookies);
}

function saveGame() {
  localStorage.setItem("cookieGameSave", JSON.stringify(gameState));
}

function loadGame() {
  const saved = localStorage.getItem("cookieGameSave");
  if (!saved) return;

  Object.assign(gameState, JSON.parse(saved));
}

cookieButton.addEventListener("click", () => {
  gameState.cookies += gameState.clickPower;
  updateUI();
  saveGame();
});

async function fetchUpgrades() {
  try {
    const response = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades"
    );
    const data = await response.json();

    gameState.upgrades = Array.isArray(data) ? data : data.upgrades;
    renderUpgrades();
  } catch (err) {
    console.error("Error fetching upgrades:", err);
  }
}

function renderUpgrades() {
  upgradesDiv.innerHTML = "";

  gameState.upgrades.forEach((upgrade) => {
    const button = document.createElement("button");
    button.textContent = `${upgrade.name} (${upgrade.cost} cookies)`;

    button.addEventListener("click", () => {
      if (gameState.cookies < upgrade.cost) return;

      gameState.cookies -= upgrade.cost;
      gameState.cps += upgrade.value;

      updateUI();
      saveGame();
    });

    upgradesDiv.appendChild(button);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadGame();
  updateUI();
  fetchUpgrades();
});
