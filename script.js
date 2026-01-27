let cookies = 0;
let cps = 0;
let clickPower = 1;
let upgrades = [];

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");
const upgradesDiv = document.getElementById("upgrades");

cookieButton.addEventListener("click", () => {
  cookies += clickPower;
  updateUI();
});

setInterval(() => {
  cookies += cps;
  updateUI();
}, 1000);

async function fetchUpgrades() {
  try {
    const response = await fetch(
      "https://cookie-upgrade-api.vercel.app/api/upgrades",
    );
    const data = await response.json();

    upgrades = Array.isArray(data) ? data : data.upgrades;

    renderUpgrades();
  } catch (error) {
    console.error("Error fetching upgrades:", error);
  }
}

function renderUpgrades() {
  upgradesDiv.innerHTML = "";

  upgrades.forEach((upgrade) => {
    const button = document.createElement("button");
    button.textContent = `${upgrade.name} (${upgrade.cost} cookies)`;

    button.addEventListener("click", () => {
      if (cookies < upgrade.cost) return;

      cookies -= upgrade.cost;

      cps += upgrade.value;

      updateUI();
    });

    upgradesDiv.appendChild(button);
  });
}

function updateUI() {
  cookieCount.textContent = Math.floor(cookies);
}

fetchUpgrades();

function saveGame() {
  const gameState = {
    cookies,
    cps,
    clickPower,
  };

  localStorage.setItem("cookieGameSave", JSON.stringify(gameState));
}

function loadGame() {
  const savedGame = localStorage.getItem("cookieGameSave");

  if (!savedGame) return;

  const gameState = JSON.parse(savedGame);

  cookies = gameState.cookies ?? 0;
  cps = gameState.cps ?? 0;
  clickPower = gameState.clickPower ?? 1;
}

cookieButton.addEventListener("click", () => {
  cookies += clickPower;
  updateUI();
  saveGame();
});

button.addEventListener("click", () => {
  if (cookies < upgrade.cost) return;

  cookies -= upgrade.cost;
  cps += upgrade.value;

  updateUI();
  saveGame();
});

document.addEventListener("DOMContentLoaded", () => {
  loadGame();
  updateUI();
});
