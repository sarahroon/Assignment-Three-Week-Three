let cookies = 0;
let upgrades = [];

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");

cookieButton.addEventListener("click", () => {
    cookies++;
    cookieCount.textContent = cookies;
});

setInterval(function() {
    cookieCount++;
    cookieCountDisplay.innerText = cookieCount
}, 1000)

async function fetchData() {
    try {
        const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
        const data = await response.json();
        upgrades = data.upgrades;
        renderUpgrades();
    } catch (err) {
      console.error("Failed to load upgrades", err);
    }
}

function renderUpgrades() {
    const container = document.getElementById("upgrades");
    container.innerHTML = "";

  upgrades.forEach(upgrade => {
    const button = document.createElement("button");
    button.textContent = `${upgrade.name} (${upgrade.cost} cookies)`;
    button.onclick = () => buyUpgrade(upgrade);
    container.appendChild(button);
   });
}
function buyUpgrade(upgrade) {
    console.log("Applying upgrade:", upgrade.id);

}

function updateUI() {
    document.getElementById("cookie-count").textContent = `${cookies} cookies`;
}

loadUpgrades();
