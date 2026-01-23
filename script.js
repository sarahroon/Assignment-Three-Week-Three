let cookies = 0;
let upgrades = [];

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");
const upgradesDiv = document.getElementById("upgrades");

cookieButton.addEventListener("click", () => {
    cookies+= clickPower;
    updateUI();
});

setInterval(() => {
    cookies+= cps;
    updateUI();
}, 1000);

async function fetchUpgrades() {
    try {
        const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
        const data = await response.json();

        if (Array.isArray(data.upgrades)) {
            upgrades = data.upgrades;
            renderUpgrade();
        }
    } catch (error) {
         console.error("Error fetching upgrades:", error);
    }
}

function renderUpgrade() {
    const upgrade = upgrades[0];
    const button = document.createElement("button");

    button.textContent = ${upgrade.name} (+${upgrade.value} cookies)

    button.addEventListener("click", () => {
        if (cookies >= upgrade.cost) {
            cookies += upgrade.value;
            updateUI();
        }
    });

    upgradesDiv.appendChild(button);
}

fetchUpgrades();

upgradeButton.addEventListener("click", () => {
   if (!upgrade) return;
   if (cookies < upgrade.cost) return;

   cookies -= upgrade.cost;
   cps += 1;
   updateUI();
});

function updateUI() {
     cookieCount.textContent = cookies;
}

fetchUpgrade();
       
