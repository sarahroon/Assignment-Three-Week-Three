let cookies = 0;
let cps = 0;
let upgrade = null;
let clickPower = 1;

const cookieCount = document.getElementById("cookieCount");
const cookieButton = document.getElementById("cookieButton");
const upgradeButton = document.getElementById("upgradeButton");

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
        const res = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
        const data = await res.json();

        if (data.upgrades && data.upgrades.length > 0) {
            upgrade = data.upgrades[0];
            upgradeButton.textContent = `${upgrade.name} (${upgrade.cost}
            upgradeButton.disabled = false;
        }
    } catch (err) {
         console.error("Failed to load upgrade", err);
    }
}

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
       
