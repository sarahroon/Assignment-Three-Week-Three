let cookies = 0;
let upgrades = [];

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");

cookieButton.addEventListener("click", () => {
    cookies++;
    updateUI();
});

setInterval(() => {
    cookies++;
    updateUI();
}, 1000)

async function fetchData() {
    try {
        const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
        const data = await response.json();

        upgrades = [];

        if (data && Array.isArray(data.upgrades)) {
            upgrades = data.upgrades;
        } else {
           console.warn("Upgrade data is invalid: API response did not contain an array 'upgrades'.", data);");
         }

     renderUpgrades();
        
 } catch (err) {
    console.error("Failed to load upgrades", err);

    upgrades = [];
    renderUpgrades();
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
    if (cookies < upgrade.cost) return;

    cookies -= upgrade.cost;
    console.log("Applying upgrade:", upgrade.id);
    updateUI();
}

function updateUI() {
    cookieCountDisplay.textContent = cookies;
}

fetchData();
