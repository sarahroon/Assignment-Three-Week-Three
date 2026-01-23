let cookies = 0;
let upgrades = [];
let cps = 0;
let clickPower = 1;

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");

cookieButton.addEventListener("click", () => {
    cookies+= clickPower;
    updateUI();
});

setInterval(() => {
    cookies+= cps;
    updateUI();
}, 1000);

async function fetchData() {
    try {
        const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
        const data = await response.json();

        upgrades = [];

        if (data && Array.isArray(data.upgrades)) {
            upgrades = data.upgrades;
        } else {
           console.warn("Upgrade data is invalid: API response did not contain an array `upgrades`.", data);
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

    if (upgrade.type === "cps") {
        cps += upgrade.value;
    } else if (upgrade.type === "click") {
        clickPower += upgrade.value;
    }

    console.log("Applying upgrade:", upgrade.id);
    updateUI();
}

function updateUI() {
       cookieCount.textContent = cookies;
}

fetchData();
